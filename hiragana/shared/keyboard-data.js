// keyboard-data.js — JIS kana layout (JIS X 6004-1986) + key sequence lookup.
//
// On a Japanese keyboard in kana-input mode, each kana has a dedicated key
// position. Closes #1 — virtual keyboard helper for touch-typing kana.
//
// Key shape: { key, kana, shiftKana?, modifier? }
//   - `key` is the physical QWERTY label printed on the key
//   - `kana` is the kana that key produces in unshifted state
//   - `shiftKana` is what it produces with Shift held (small kana, を, っ)
//   - `modifier: true` flags non-kana keys like Shift, Space
//
// The combining marks ゛ (dakuten) and ゜ (handakuten) live on @ and [
// respectively. To type が, you press T (か) then @ (゛) — the IME combines.
// Yōon like きゃ are typed as base-kana then Shift+small-ya: G (き) + Shift+7 (ゃ).

const JIS_KANA_LAYOUT = {
  // Each row is an array of keys, left-to-right as they sit on the keyboard.
  rows: [
    // Number row
    [
      { key: '1',  kana: 'ぬ' },
      { key: '2',  kana: 'ふ' },
      { key: '3',  kana: 'あ', shiftKana: 'ぁ' },
      { key: '4',  kana: 'う', shiftKana: 'ぅ' },
      { key: '5',  kana: 'え', shiftKana: 'ぇ' },
      { key: '6',  kana: 'お', shiftKana: 'ぉ' },
      { key: '7',  kana: 'や', shiftKana: 'ゃ' },
      { key: '8',  kana: 'ゆ', shiftKana: 'ゅ' },
      { key: '9',  kana: 'よ', shiftKana: 'ょ' },
      { key: '0',  kana: 'わ', shiftKana: 'を' },
      { key: '-',  kana: 'ほ' },
      { key: '^',  kana: 'へ' },
    ],
    // Q row
    [
      { key: 'Q',  kana: 'た' },
      { key: 'W',  kana: 'て' },
      { key: 'E',  kana: 'い', shiftKana: 'ぃ' },
      { key: 'R',  kana: 'す' },
      { key: 'T',  kana: 'か' },
      { key: 'Y',  kana: 'ん' },
      { key: 'U',  kana: 'な' },
      { key: 'I',  kana: 'に' },
      { key: 'O',  kana: 'ら' },
      { key: 'P',  kana: 'せ' },
      { key: '@',  kana: '゛', label: 'dakuten' },
      { key: '[',  kana: '゜', label: 'handakuten' },
    ],
    // A row
    [
      { key: 'A',  kana: 'ち' },
      { key: 'S',  kana: 'と' },
      { key: 'D',  kana: 'し' },
      { key: 'F',  kana: 'は' },
      { key: 'G',  kana: 'き' },
      { key: 'H',  kana: 'く' },
      { key: 'J',  kana: 'ま' },
      { key: 'K',  kana: 'の' },
      { key: 'L',  kana: 'り' },
      { key: ';',  kana: 'れ' },
      { key: ':',  kana: 'け' },
      { key: ']',  kana: 'む' },
    ],
    // Z row
    [
      { key: 'Z',  kana: 'つ', shiftKana: 'っ' },
      { key: 'X',  kana: 'さ' },
      { key: 'C',  kana: 'そ' },
      { key: 'V',  kana: 'ひ' },
      { key: 'B',  kana: 'こ' },
      { key: 'N',  kana: 'み' },
      { key: 'M',  kana: 'も' },
      { key: ',',  kana: 'ね' },
      { key: '.',  kana: 'る' },
      { key: '/',  kana: 'め' },
      { key: '\\', kana: 'ろ' },
    ],
  ],
  // Reverse lookup map (built once below): kana → { key, shift }
  byKana: {},
};

// Build the byKana lookup from the row data.
(function indexLayout() {
  for (const row of JIS_KANA_LAYOUT.rows) {
    for (const k of row) {
      if (k.kana) JIS_KANA_LAYOUT.byKana[k.kana] = { key: k.key, shift: false };
      if (k.shiftKana) JIS_KANA_LAYOUT.byKana[k.shiftKana] = { key: k.key, shift: true };
    }
  }
})();

// ── Combining-mark logic ────────────────────────────────────────────
// To type が (dakuten), press か then the dakuten key (゛, on @).
// To type ぱ (handakuten), press は then the handakuten key (゜, on [).
// Many dakuten kana don't have direct positions — they're composed.

const DAKUTEN_BASE = {
  // Voiced consonant → unvoiced base
  'が':'か','ぎ':'き','ぐ':'く','げ':'け','ご':'こ',
  'ざ':'さ','じ':'し','ず':'す','ぜ':'せ','ぞ':'そ',
  'だ':'た','ぢ':'ち','づ':'つ','で':'て','ど':'と',
  'ば':'は','び':'ひ','ぶ':'ふ','べ':'へ','ぼ':'ほ',
};
const HANDAKUTEN_BASE = {
  // P-row → H-row
  'ぱ':'は','ぴ':'ひ','ぷ':'ふ','ぺ':'へ','ぽ':'ほ',
};

// ── Yōon decomposition ──────────────────────────────────────────────
// Yōon are 2-char kana like きゃ. Decompose into base + small ya/yu/yo.
// Then each component maps to a key sequence.
function splitYoon(kana) {
  if (kana.length < 2) return null;
  const base = kana[0];
  const small = kana[1];
  if (small === 'ゃ' || small === 'ゅ' || small === 'ょ' || small === 'ぁ' || small === 'ぃ' || small === 'ぅ' || small === 'ぇ' || small === 'ぉ') {
    return { base, small };
  }
  return null;
}

// ── Public lookup ───────────────────────────────────────────────────
// Returns an array of key presses to type the given kana.
// Each press: { key, shift, label?, hint? }
//   - `label` describes what this press produces (e.g., 'か', 'dakuten')
//   - `hint` is a short human-readable explanation
//
// Examples:
//   kanaToKeySequence('あ')   → [{ key: '3', shift: false, label: 'あ' }]
//   kanaToKeySequence('が')   → [
//     { key: 'T', shift: false, label: 'か' },
//     { key: '@', shift: false, label: '゛ (dakuten)' }
//   ]
//   kanaToKeySequence('きゃ') → [
//     { key: 'G', shift: false, label: 'き' },
//     { key: '7', shift: true,  label: 'ゃ' }
//   ]
function kanaToKeySequence(kana) {
  // 1. Direct lookup (covers all base kana + small kana via shift)
  const direct = JIS_KANA_LAYOUT.byKana[kana];
  if (direct) {
    return [{ key: direct.key, shift: direct.shift, label: kana }];
  }

  // 2. Dakuten (single char): base + ゛
  if (DAKUTEN_BASE[kana]) {
    const base = DAKUTEN_BASE[kana];
    const baseKey = JIS_KANA_LAYOUT.byKana[base];
    if (!baseKey) return null;
    return [
      { key: baseKey.key, shift: baseKey.shift, label: base },
      { key: '@',         shift: false,          label: '゛ (dakuten)' },
    ];
  }

  // 3. Handakuten (single char): base + ゜
  if (HANDAKUTEN_BASE[kana]) {
    const base = HANDAKUTEN_BASE[kana];
    const baseKey = JIS_KANA_LAYOUT.byKana[base];
    if (!baseKey) return null;
    return [
      { key: baseKey.key, shift: baseKey.shift, label: base },
      { key: '[',         shift: false,          label: '゜ (handakuten)' },
    ];
  }

  // 4. Yōon (2-char kana like きゃ): split into base + small
  const split = splitYoon(kana);
  if (split) {
    const baseSeq = kanaToKeySequence(split.base);  // recurse for dakuten yōon (e.g., ぎゃ → ぎ + ゃ)
    const smallSeq = kanaToKeySequence(split.small);
    if (baseSeq && smallSeq) return baseSeq.concat(smallSeq);
  }

  // 5. Unknown — return null so the UI can show a graceful "not mapped" state.
  return null;
}

// ── Expose to other scripts ────────────────────────────────────────
if (typeof window !== 'undefined') {
  window.JIS_KANA_LAYOUT = JIS_KANA_LAYOUT;
  window.kanaToKeySequence = kanaToKeySequence;
}
