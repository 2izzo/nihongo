#!/usr/bin/env node
// regen-flagged.mjs — re-generate kana audio for entries listed in audio-flags.md
//
// Companion to generate-audio.mjs (which does the bulk first-time generation).
// This one is for the iterative quality loop: when a particular kana sounds off,
// add it to audio-flags.md under "## Flagged", then run this script to overwrite
// just that MP3 with a re-generated version.
//
// Differences from generate-audio.mjs:
//   - Reads from audio-flags.md instead of all of KANA_DATA
//   - FORCES OVERWRITE (not skip-if-exists) — we're trying to fix the file
//   - Appends "。" to the text → helps the TTS finalize cleanly on bare kana
//   - Lower stability (0.4 vs 0.5) → more natural prosody on short utterances
//   - Higher similarity_boost (0.85 vs 0.75) → sticks closer to the Kana voice
//
// USAGE:
//   1. Edit audio-flags.md, add entries under "## Flagged" like:
//        - a — muddled, sounds clipped (Squibs, 2026-04-29)
//   2. From the nihongo/ root:
//        node scripts/regen-flagged.mjs
//   3. Listen. If better, move the entry to "## Resolved" in audio-flags.md.
//   4. Commit + push the regenerated MP3s.

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

// ─── CONFIG ──────────────────────────────────────────────────────────
const VOICE_ID    = 'dhGvgIx0X6G3xzSWqOye';  // Kana — same as generate-audio.mjs
const MODEL_ID    = 'eleven_multilingual_v2';
const STABILITY   = 0.4;       // lowered from 0.5 — more natural on short utterances
const SIMILARITY  = 0.85;      // raised from 0.75 — sticks closer to Kana
const TEXT_SUFFIX = '。';      // appended to each kana before sending to TTS
const SLEEP_MS    = 100;

// ─── PATHS ───────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const repoRoot   = path.resolve(__dirname, '..');
const dataPath   = path.join(repoRoot, 'hiragana', 'shared', 'kana-data.js');
const audioDir   = path.join(repoRoot, 'hiragana', 'audio');
const flagsPath  = path.join(repoRoot, 'audio-flags.md');
const keyPath    = path.join(os.homedir(), '.rizzo', '.secrets', 'elevenlabs-api-key');

// ─── HELPERS ─────────────────────────────────────────────────────────
function die(msg, code = 1) {
  console.error(`\x1b[31m!!! ${msg}\x1b[0m`);
  process.exit(code);
}
function ok(msg)   { console.log(`\x1b[32m  ok:\x1b[0m ${msg}`); }
function info(msg) { console.log(`\x1b[36m==>\x1b[0m ${msg}`); }
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// Build a romaji -> kana map from KANA_DATA (first occurrence wins for duplicates
// like ji.mp3 covering both じ and ぢ — we use the more common modern form).
function loadKanaMap() {
  if (!fs.existsSync(dataPath)) die(`kana-data.js not found at ${dataPath}`);
  const src = fs.readFileSync(dataPath, 'utf8');
  const arrMatch = src.match(/const\s+KANA_DATA\s*=\s*\[([\s\S]*?)\n\];/);
  if (!arrMatch) die('Could not find KANA_DATA array');
  const body = arrMatch[1];
  const map = new Map();
  const re = /\{\s*kana:\s*'([^']+)',\s*romaji:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    if (!map.has(m[2])) map.set(m[2], m[1]);
  }
  if (!map.size) die('Parsed KANA_DATA but found no entries');
  return map;
}

// Parse "## Flagged" section of audio-flags.md → array of romaji strings.
function loadFlags() {
  if (!fs.existsSync(flagsPath)) {
    die(`audio-flags.md not found at ${flagsPath}\n` +
        `    Create it with a "## Flagged" section listing entries like:\n` +
        `      - a — muddled (Squibs, 2026-04-29)`);
  }
  const src = fs.readFileSync(flagsPath, 'utf8');
  const sectionMatch = src.match(/##\s+Flagged\s*\n([\s\S]*?)(?=\n##\s|$)/);
  if (!sectionMatch) die('No "## Flagged" section in audio-flags.md');
  const lines = sectionMatch[1].split('\n');
  const flagged = [];
  for (const line of lines) {
    // Match: "- <romaji> — ..." or "- <romaji> - ..." (em dash or hyphen)
    const m = line.match(/^\s*-\s+([a-z]+)\s*[—\-]/);
    if (m) flagged.push(m[1]);
  }
  return flagged;
}

function loadKey() {
  if (!fs.existsSync(keyPath)) {
    die(`API key file not found at ${keyPath}\n` +
        `    See generate-audio.mjs header for setup steps.`);
  }
  const key = fs.readFileSync(keyPath, 'utf8').trim();
  if (!key) die(`API key file at ${keyPath} is empty`);
  return key;
}

async function regenOne(romaji, kana, key) {
  const out = path.join(audioDir, `${romaji}.mp3`);
  const text = kana + TEXT_SUFFIX;
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': key,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: { stability: STABILITY, similarity_boost: SIMILARITY },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`ElevenLabs API ${res.status}: ${body.slice(0, 200)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(out, buf);
  return { text, bytes: buf.length };
}

// ─── MAIN ────────────────────────────────────────────────────────────
async function main() {
  info('Reading audio-flags.md');
  const flagged = loadFlags();
  if (!flagged.length) {
    ok('No flagged kana — nothing to do.');
    return 0;
  }
  ok(`${flagged.length} flagged: ${flagged.join(', ')}`);

  info('Loading KANA_DATA for character lookup');
  const map = loadKanaMap();
  for (const r of flagged) {
    if (!map.has(r)) {
      die(`Flagged romaji "${r}" doesn't match any kana in KANA_DATA`);
    }
  }
  ok('all flagged romaji map to known kana');

  info('Reading API key');
  const key = loadKey();
  ok(`key found (${key.length} chars), masked: ${key.slice(0, 4)}…${key.slice(-4)}`);

  fs.mkdirSync(audioDir, { recursive: true });
  info(`Regenerating with: text+"${TEXT_SUFFIX}", stability=${STABILITY}, similarity_boost=${SIMILARITY}`);
  let made = 0, failed = 0;
  const failures = [];
  for (let i = 0; i < flagged.length; i++) {
    const romaji = flagged[i];
    const kana = map.get(romaji);
    const tag = `[${String(i + 1).padStart(3)}/${flagged.length}]`;
    try {
      const r = await regenOne(romaji, kana, key);
      console.log(`${tag} regen "${r.text}" -> ${romaji}.mp3 (${r.bytes}B)`);
      made += 1;
    } catch (err) {
      console.error(`${tag} FAIL ${kana} (${romaji}): ${err.message}`);
      failed += 1;
      failures.push(romaji);
    }
    if (i < flagged.length - 1) await sleep(SLEEP_MS);
  }

  info('Summary');
  ok(`${made} regenerated, ${failed} failed`);
  if (failures.length) {
    console.error(`\x1b[33m  Failed: ${failures.join(', ')}\x1b[0m`);
    return 2;
  }
  console.log(`\nNext steps:`);
  console.log(`  1. Re-listen to the regenerated kana.`);
  console.log(`  2. If better, move entries from "## Flagged" to "## Resolved" in audio-flags.md.`);
  console.log(`  3. Commit + push the new MP3s.`);
  return 0;
}

main().catch((err) => {
  console.error('\x1b[31m!!! Unhandled error:\x1b[0m', err);
  process.exit(1);
});
