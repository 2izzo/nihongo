# Audio Flags

Track kana whose generated audio needs improvement. As you and Atticus listen
through the lessons, add entries under "## Flagged" with a brief reason. Then
re-generate just the flagged ones:

```bash
node scripts/regen-flagged.mjs
```

The regen script overwrites only the listed MP3s — it uses tweaked TTS settings
that help short single-kana utterances sound cleaner:

- Appends `。` to the text so the model has a finalization cue (otherwise bare
  single vowels often come out clipped or muddy)
- Lower stability (0.4 vs 0.5) — more natural variation
- Higher similarity_boost (0.85 vs 0.75) — sticks closer to the Kana voice

After re-listening and confirming the fix, move entries from `## Flagged` to
`## Resolved` so we have a record of what was addressed.

**Format:** `- <romaji> — <reason> (<who>, <YYYY-MM-DD>)`
The script only needs the romaji at the start of the line — the reason and
attribution are notes for us.

## Flagged
- a — muddled, sounds clipped (Squibs, 2026-04-29)

## Resolved
(empty — move resolved flags here as we work through them)
