#!/usr/bin/env node
// generate-audio.mjs — generate kana pronunciation MP3s via ElevenLabs.
//
// Reads the API key from ~/.rizzo/.secrets/elevenlabs-api-key (NOT an env var,
// to mirror the github PAT convention).
//
// Iterates over hiragana/shared/kana-data.js, calls the ElevenLabs TTS API
// once per kana, writes <romaji>.mp3 into hiragana/audio/.
//
// Idempotent: skips files that already exist. Safe to re-run.
//
// USAGE:
//   1. Park your ElevenLabs API key:
//        echo 'sk_paste_key_here' > ~/.rizzo/.secrets/elevenlabs-api-key
//        chmod 600 ~/.rizzo/.secrets/elevenlabs-api-key
//   2. Pick a ja-JP-capable voice from https://elevenlabs.io/app/voice-library
//      and put the voice ID in the VOICE_ID constant below.
//   3. From the nihongo/ root:  node scripts/generate-audio.mjs
//
// Estimated time: ~3-5 minutes for all 104 kana (with the polite 100ms sleep).
// Estimated ElevenLabs character usage: ~150 chars total — trivial on any plan.

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

// ─── CONFIG ──────────────────────────────────────────────────────────
// Paste your ElevenLabs voice ID here. Browse https://elevenlabs.io/app/voice-library
// for ja-JP-capable voices. Format looks like: '21m00Tcm4TlvDq8ikWAM'
const VOICE_ID = 'dhGvgIx0X6G3xzSWqOye';  // Kana — young female, standard accent, eleven_multilingual_v2-verified

const MODEL_ID  = 'eleven_multilingual_v2';
const STABILITY = 0.5;
const SIMILARITY = 0.75;
const SLEEP_MS  = 100;     // polite delay between API calls

// ─── PATHS ───────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const repoRoot   = path.resolve(__dirname, '..');
const dataPath   = path.join(repoRoot, 'hiragana', 'shared', 'kana-data.js');
const audioDir   = path.join(repoRoot, 'hiragana', 'audio');
const keyPath    = path.join(os.homedir(), '.rizzo', '.secrets', 'elevenlabs-api-key');

// ─── HELPERS ─────────────────────────────────────────────────────────
function die(msg, code = 1) {
  console.error(`\x1b[31m!!! ${msg}\x1b[0m`);
  process.exit(code);
}

function ok(msg) {
  console.log(`\x1b[32m  ok:\x1b[0m ${msg}`);
}

function info(msg) {
  console.log(`\x1b[36m==>\x1b[0m ${msg}`);
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// Parse kana-data.js by reading the file as text and extracting the array.
// This is safer than eval — we just match the entries with a regex.
function loadKana() {
  if (!fs.existsSync(dataPath)) die(`kana-data.js not found at ${dataPath}`);
  const src = fs.readFileSync(dataPath, 'utf8');
  // Pull every { kana: '...', romaji: '...', ... } block within KANA_DATA.
  const arrMatch = src.match(/const\s+KANA_DATA\s*=\s*\[([\s\S]*?)\n\];/);
  if (!arrMatch) die('Could not find KANA_DATA array in kana-data.js');
  const body = arrMatch[1];
  const entries = [];
  const re = /\{\s*kana:\s*'([^']+)',\s*romaji:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    entries.push({ kana: m[1], romaji: m[2] });
  }
  if (!entries.length) die('No KANA_DATA entries parsed');
  return entries;
}

function loadKey() {
  if (!fs.existsSync(keyPath)) {
    die(`API key file not found at ${keyPath}\n` +
        `    Create it with:\n` +
        `      mkdir -p ~/.rizzo/.secrets && chmod 700 ~/.rizzo/.secrets\n` +
        `      echo 'sk_your_key_here' > ${keyPath}\n` +
        `      chmod 600 ${keyPath}`);
  }
  const key = fs.readFileSync(keyPath, 'utf8').trim();
  if (!key) die(`API key file at ${keyPath} is empty`);
  return key;
}

async function generateOne({ kana, romaji }, key) {
  const out = path.join(audioDir, `${romaji}.mp3`);
  if (fs.existsSync(out) && fs.statSync(out).size > 0) {
    return { skipped: true, romaji };
  }
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': key,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({
      text: kana,
      model_id: MODEL_ID,
      voice_settings: {
        stability: STABILITY,
        similarity_boost: SIMILARITY,
      },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`ElevenLabs API error ${res.status} for ${kana} (${romaji}): ${body.slice(0, 200)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(out, buf);
  return { skipped: false, romaji, bytes: buf.length };
}

// ─── MAIN ────────────────────────────────────────────────────────────
async function main() {
  if (VOICE_ID === 'dhGvgIx0X6G3xzSWqOye') {
    die(`Set VOICE_ID at the top of scripts/generate-audio.mjs.\n` +
        `    Pick a ja-JP-capable voice at https://elevenlabs.io/app/voice-library`);
  }

  info('Loading kana data');
  const kana = loadKana();
  ok(`${kana.length} kana entries parsed`);

  info('Reading API key');
  const key = loadKey();
  ok(`key found (${key.length} chars), masked: ${key.slice(0, 4)}…${key.slice(-4)}`);

  info(`Ensuring ${audioDir} exists`);
  fs.mkdirSync(audioDir, { recursive: true });
  ok('audio dir ready');

  info(`Generating ${kana.length} MP3s (will skip any that already exist)`);
  let made = 0, skipped = 0, failed = 0;
  for (let i = 0; i < kana.length; i++) {
    const k = kana[i];
    const tag = `[${String(i + 1).padStart(3)}/${kana.length}]`;
    try {
      const r = await generateOne(k, key);
      if (r.skipped) {
        console.log(`${tag} skip ${k.kana} → ${k.romaji}.mp3 (already exists)`);
        skipped += 1;
      } else {
        console.log(`${tag}  gen ${k.kana} → ${k.romaji}.mp3 (${r.bytes} bytes)`);
        made += 1;
      }
    } catch (err) {
      console.error(`${tag} FAIL ${k.kana} (${k.romaji}): ${err.message}`);
      failed += 1;
    }
    if (i < kana.length - 1) await sleep(SLEEP_MS);
  }

  info('Summary');
  ok(`${made} generated, ${skipped} skipped (already existed), ${failed} failed`);
  if (failed > 0) {
    console.error(`\x1b[33m  ${failed} kana failed — re-run the script (it will skip the ones that succeeded)\x1b[0m`);
    process.exit(2);
  }
}

main().catch((err) => {
  console.error('\x1b[31m!!! Unhandled error:\x1b[0m', err);
  process.exit(1);
});
