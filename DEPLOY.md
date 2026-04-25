# Deploying nihongo

Pack 1 was bootstrapped and pushed by Rizzo from the Cowork sandbox using the
`~/.rizzo/.secrets/github-pat-2izzo` token. The macOS-mounted workspace folder
can't host a `.git/` directory cleanly from inside the sandbox (a known
gotcha — see `~/.rizzo/bin/studio-push-pack3.sh` comments), so the push came
from a sandbox-local temp dir, and the working clone for ongoing work lives
at `~/nihongo/` (mirroring `~/studio/` for the music repo).

This file is now the **after-care guide** — what you do next, mainly to:
1. Clean up the orphan `.git/` stub left behind in the workspace folder
2. Get a real working clone at `~/nihongo/`
3. Generate the audio and push it as a follow-up commit

---

## 1 · Clean up + clone fresh (one-time, ~15 sec)

Run these on your Mac:

```bash
# Remove the orphan .git stub the sandbox couldn't fully clean
rm -rf ~/.rizzo/nihongo/.git

# Get a working clone at ~/nihongo (matching the music studio's ~/studio)
cd ~ && git clone https://github.com/2izzo/nihongo.git
```

After this you have two folders:
- `~/.rizzo/nihongo/` — the staging copy (Rizzo writes here from Cowork)
- `~/nihongo/` — your working git clone (you pull/edit/commit/push here)

For Pack 2+, Rizzo will write to `~/.rizzo/nihongo/` and you'll `rsync` the
delta into `~/nihongo/` before committing. Same pattern as the music studio.

## 2 · Add the ElevenLabs audio (one-time, ~5 min)

Pack 1 ships without audio because the MP3 generation needs your ElevenLabs
API key — which lives only on your Mac, never in this repo. The lessons render
fine without audio (drills, quizzes, mnemonics, navigation all work — the
"hear it" buttons just silently fail until the MP3s exist).

```bash
# 1. Park your ElevenLabs API key (one-time):
mkdir -p ~/.rizzo/.secrets && chmod 700 ~/.rizzo/.secrets
echo 'sk_your_elevenlabs_key' > ~/.rizzo/.secrets/elevenlabs-api-key
chmod 600 ~/.rizzo/.secrets/elevenlabs-api-key

# 2. Pick a ja-JP-capable voice from https://elevenlabs.io/app/voice-library
#    Edit ~/nihongo/scripts/generate-audio.mjs and paste the voice ID
#    into the VOICE_ID constant near the top.

# 3. Run the generator:
cd ~/nihongo
node scripts/generate-audio.mjs

# Idempotent: skips files that already exist. Re-runs are free.
```

About 3-5 minutes of API calls (104 short clips, polite 100ms delay). You'll
end up with `~/.rizzo/nihongo/hiragana/audio/*.mp3` — 104 files, ~300KB total.

## 3 · Commit and push the audio

```bash
cd ~/nihongo
git add hiragana/audio/
git commit -m "Pack 1 audio — 104 ElevenLabs ja-JP MP3s"
git push
```

GitHub pages auto-rebuilds. Within 1-2 minutes the audio buttons start
working at `https://2izzo.github.io/nihongo/hiragana/`.

## 4 · Smoke-test locally before pushing future changes (optional)

```bash
cd ~/nihongo
python3 -m http.server 8000
# open http://localhost:8000/hiragana/
```

The lessons need to be served via HTTP (not `file://`) because the audio
buttons load relative URLs and browsers block that on `file://` for security.

## 5 · Future packs

When Pack 2 (Katakana) is ready, the workflow is:

1. Rizzo writes the new `katakana/` folder + extends `kana-data.js` in
   `~/.rizzo/nihongo/`
2. You `rsync -av --exclude='.git/' ~/.rizzo/nihongo/ ~/nihongo/` to bring
   the delta into your working clone
3. From `~/nihongo/` you run `node scripts/generate-audio.mjs` (only
   generates new MP3s — existing Pack 1 ones are skipped)
4. Smoke-test locally, `git add`, `git commit`, `git push`

We can adapt `~/.rizzo/bin/studio-push-pack3.sh` into
`~/.rizzo/bin/nihongo-push-packN.sh` once we've shipped a couple of packs and
the workflow is stable. For now the manual flow above is honest and easy to
debug.

---

## Notes for Rizzo (future me)

- The PAT at `~/.rizzo/.secrets/github-pat-2izzo` is fine-grained: it can push
  to `2izzo/*` repos but **cannot** create new repos. Squibs has to do the
  initial `New repository` click whenever we open a new one.
- Same goes (probably) for github pages enablement — try the API first, fall
  back to asking Squibs to enable it manually.
- Always sanitize `.git/config` after pushing with a token-embedded URL — set
  the remote back to the clean `https://github.com/...` form.
- Author for the 2izzo account: `Rizzo <276420065+2izzo@users.noreply.github.com>`.
