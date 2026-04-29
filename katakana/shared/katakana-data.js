// katakana-data.js — single source of truth for Pack 2: Katakana
// 46 base katakana + 25 dakuten/handakuten + 33 yōon = 104 total
// Same syllable structure as hiragana — different (more angular) shapes.
// Each entry: { kana, romaji, row, lesson, mnemonic, irregular }
// Lesson: 1=vowels+K, 2=S/T/N, 3=H/M/Y/R/W+ン, 4=dakuten+yōon, 5=ー+ッ+usage
// Mnemonic style matches hiragana — short visual hook per shape, with bonus
// references to the hiragana lineage where the bones rhyme (カ↔か, モ↔も, ヘ↔へ).

const KATAKANA_DATA = [
  // ── Lesson 1: Vowels + K-row ──────────────────────────────────────────
  { kana: 'ア', romaji: 'a',  row: 'vowels', lesson: 1, mnemonic: 'a slanted "A" missing its crossbar — say "ahh!"' },
  { kana: 'イ', romaji: 'i',  row: 'vowels', lesson: 1, mnemonic: 'two clean ticks — "II" — eeee!' },
  { kana: 'ウ', romaji: 'u',  row: 'vowels', lesson: 1, mnemonic: 'a hat over a square hut — "u" sound inside' },
  { kana: 'エ', romaji: 'e',  row: 'vowels', lesson: 1, mnemonic: 'literally an "E" rotated 90° — "eh!"' },
  { kana: 'オ', romaji: 'o',  row: 'vowels', lesson: 1, mnemonic: 'a tall cross with a swooping tail — "Oh!"' },
  { kana: 'カ', romaji: 'ka', row: 'k',      lesson: 1, mnemonic: 'a karate chop — "ka-pow!" (shares bones with hiragana か)' },
  { kana: 'キ', romaji: 'ki', row: 'k',      lesson: 1, mnemonic: 'an old skeleton key — two prongs and a stem' },
  { kana: 'ク', romaji: 'ku', row: 'k',      lesson: 1, mnemonic: "a cuckoo's open beak — \"kuu!\"" },
  { kana: 'ケ', romaji: 'ke', row: 'k',      lesson: 1, mnemonic: 'a stick figure mid-punch — "ke-yah!"' },
  { kana: 'コ', romaji: 'ko', row: 'k',      lesson: 1, mnemonic: 'two right angles — a clean "co-rner"' },

  // ── Lesson 2: S/T/N rows ──────────────────────────────────────────────
  { kana: 'サ', romaji: 'sa',  row: 's', lesson: 2, mnemonic: 'a samurai\'s headband knot above the brow' },
  { kana: 'シ', romaji: 'shi', row: 's', lesson: 2, mnemonic: 'three slanted lines like a ski slope — "sshhh, watch out for ツ"', irregular: true },
  { kana: 'ス', romaji: 'su',  row: 's', lesson: 2, mnemonic: 'a figure swooping on a swing — "wheee, su!"' },
  { kana: 'セ', romaji: 'se',  row: 's', lesson: 2, mnemonic: 'a plus sign with a curling tail — "say!"' },
  { kana: 'ソ', romaji: 'so',  row: 's', lesson: 2, mnemonic: 'two strokes leaning right — opposite slant from ン' },
  { kana: 'タ', romaji: 'ta',  row: 't', lesson: 2, mnemonic: 'a tall figure crossed by a slash — "ta-da!"' },
  { kana: 'チ', romaji: 'chi', row: 't', lesson: 2, mnemonic: 'a sun rising over a horizon line — "chi" reaching up', irregular: true },
  { kana: 'ツ', romaji: 'tsu', row: 't', lesson: 2, mnemonic: 'three drops splashing — like tsu-namis (don\'t confuse with シ)', irregular: true },
  { kana: 'テ', romaji: 'te',  row: 't', lesson: 2, mnemonic: 'a "T" with an extra crossbar — tea-shelf' },
  { kana: 'ト', romaji: 'to',  row: 't', lesson: 2, mnemonic: 'a vertical stick with a tick — "to-do mark"' },
  { kana: 'ナ', romaji: 'na',  row: 'n', lesson: 2, mnemonic: 'a knife slicing across — "nah, none for me"' },
  { kana: 'ニ', romaji: 'ni',  row: 'n', lesson: 2, mnemonic: 'two parallel lines — kanji for two — "ni" means two!' },
  { kana: 'ヌ', romaji: 'nu',  row: 'n', lesson: 2, mnemonic: 'a folded ribbon with a knot — "nu"' },
  { kana: 'ネ', romaji: 'ne',  row: 'n', lesson: 2, mnemonic: 'a sharp angular cat ear — "ne~"' },
  { kana: 'ノ', romaji: 'no',  row: 'n', lesson: 2, mnemonic: 'a single slash — "no entry" sign' },

  // ── Lesson 3: H/M/Y/R/W + ン ─────────────────────────────────────────
  { kana: 'ハ', romaji: 'ha', row: 'h', lesson: 3, mnemonic: 'two strokes spreading apart — open-mouth "ha-ha!"' },
  { kana: 'ヒ', romaji: 'hi', row: 'h', lesson: 3, mnemonic: 'an "L" wearing a top hat — "hi!"' },
  { kana: 'フ', romaji: 'fu', row: 'h', lesson: 3, mnemonic: 'a single hook descending — "fu-tile" gesture', irregular: true },
  { kana: 'ヘ', romaji: 'he', row: 'h', lesson: 3, mnemonic: 'a flat hill — same shape as hiragana へ (twin glyph!)' },
  { kana: 'ホ', romaji: 'ho', row: 'h', lesson: 3, mnemonic: 'a cross with two side-stripes — a "ho-ho-ho" snowman' },
  { kana: 'マ', romaji: 'ma', row: 'm', lesson: 3, mnemonic: 'a sail above a hull — sailing "ma-ma"' },
  { kana: 'ミ', romaji: 'mi', row: 'm', lesson: 3, mnemonic: 'three stacked lines — kanji for three — "mi" rhymes with three' },
  { kana: 'ム', romaji: 'mu', row: 'm', lesson: 3, mnemonic: 'a "u" with a quirky tag — cow chewing "muuu"' },
  { kana: 'メ', romaji: 'me', row: 'm', lesson: 3, mnemonic: 'an "X" with a slanted slash — "X marks me"' },
  { kana: 'モ', romaji: 'mo', row: 'm', lesson: 3, mnemonic: 'a hook with two horizontals — like a "mo-bile" antenna (echoes hiragana も)' },
  { kana: 'ヤ', romaji: 'ya', row: 'y', lesson: 3, mnemonic: 'a yacht with rigging — "yah!"' },
  { kana: 'ユ', romaji: 'yu', row: 'y', lesson: 3, mnemonic: 'a sideways "u" with a closing top — "you" with a hat' },
  { kana: 'ヨ', romaji: 'yo', row: 'y', lesson: 3, mnemonic: 'three horizontals on a stem — "yo, that\'s an E"' },
  { kana: 'ラ', romaji: 'ra', row: 'r', lesson: 3, mnemonic: 'a flag with a small top tick — "rah!"' },
  { kana: 'リ', romaji: 'ri', row: 'r', lesson: 3, mnemonic: 'two hanging lines — same vertical pattern as hiragana り' },
  { kana: 'ル', romaji: 'ru', row: 'r', lesson: 3, mnemonic: 'a "u" with a small leg kicking out — "ru" running' },
  { kana: 'レ', romaji: 're', row: 'r', lesson: 3, mnemonic: 'a single hook — "re-eling" a fish' },
  { kana: 'ロ', romaji: 'ro', row: 'r', lesson: 3, mnemonic: 'a perfect square box — kanji for mouth — "ro" framed clean' },
  { kana: 'ワ', romaji: 'wa', row: 'w', lesson: 3, mnemonic: 'a roof with no walls — "wa" wide open' },
  { kana: 'ヲ', romaji: 'wo', row: 'w', lesson: 3, mnemonic: 'a flag — particle only, read as "o" (very rare in modern use, hiragana を is what you actually see)', irregular: true },
  { kana: 'ン', romaji: 'n',  row: 'n-final', lesson: 3, mnemonic: 'a slanted stroke — opposite slant from ソ (the most-confused katakana pair)' },

  // ── Lesson 4: Dakuten/Handakuten ──────────────────────────────────────
  // Dakuten = " mark, voices the consonant. Handakuten = ° (only on H-row → P).
  { kana: 'ガ', romaji: 'ga', row: 'g', lesson: 4, mnemonic: 'カ with two strokes — voiced K becomes G' },
  { kana: 'ギ', romaji: 'gi', row: 'g', lesson: 4, mnemonic: 'キ with dakuten' },
  { kana: 'グ', romaji: 'gu', row: 'g', lesson: 4, mnemonic: 'ク with dakuten' },
  { kana: 'ゲ', romaji: 'ge', row: 'g', lesson: 4, mnemonic: 'ケ with dakuten' },
  { kana: 'ゴ', romaji: 'go', row: 'g', lesson: 4, mnemonic: 'コ with dakuten' },
  { kana: 'ザ', romaji: 'za', row: 'z', lesson: 4, mnemonic: 'サ with dakuten — S becomes Z' },
  { kana: 'ジ', romaji: 'ji', row: 'z', lesson: 4, mnemonic: 'シ with dakuten — "shi" becomes "ji"', irregular: true },
  { kana: 'ズ', romaji: 'zu', row: 'z', lesson: 4, mnemonic: 'ス with dakuten' },
  { kana: 'ゼ', romaji: 'ze', row: 'z', lesson: 4, mnemonic: 'セ with dakuten' },
  { kana: 'ゾ', romaji: 'zo', row: 'z', lesson: 4, mnemonic: 'ソ with dakuten' },
  { kana: 'ダ', romaji: 'da', row: 'd', lesson: 4, mnemonic: 'タ with dakuten — T becomes D' },
  { kana: 'ヂ', romaji: 'ji', row: 'd', lesson: 4, mnemonic: 'チ + dakuten — also "ji", rare in modern use', irregular: true },
  { kana: 'ヅ', romaji: 'zu', row: 'd', lesson: 4, mnemonic: 'ツ + dakuten — also "zu", rare in modern use', irregular: true },
  { kana: 'デ', romaji: 'de', row: 'd', lesson: 4, mnemonic: 'テ with dakuten' },
  { kana: 'ド', romaji: 'do', row: 'd', lesson: 4, mnemonic: 'ト with dakuten' },
  { kana: 'バ', romaji: 'ba', row: 'b', lesson: 4, mnemonic: 'ハ with dakuten — H becomes B' },
  { kana: 'ビ', romaji: 'bi', row: 'b', lesson: 4, mnemonic: 'ヒ with dakuten' },
  { kana: 'ブ', romaji: 'bu', row: 'b', lesson: 4, mnemonic: 'フ with dakuten' },
  { kana: 'ベ', romaji: 'be', row: 'b', lesson: 4, mnemonic: 'ヘ with dakuten' },
  { kana: 'ボ', romaji: 'bo', row: 'b', lesson: 4, mnemonic: 'ホ with dakuten' },
  { kana: 'パ', romaji: 'pa', row: 'p', lesson: 4, mnemonic: 'ハ with handakuten (°) — H becomes P' },
  { kana: 'ピ', romaji: 'pi', row: 'p', lesson: 4, mnemonic: 'ヒ with handakuten' },
  { kana: 'プ', romaji: 'pu', row: 'p', lesson: 4, mnemonic: 'フ with handakuten' },
  { kana: 'ペ', romaji: 'pe', row: 'p', lesson: 4, mnemonic: 'ヘ with handakuten' },
  { kana: 'ポ', romaji: 'po', row: 'p', lesson: 4, mnemonic: 'ホ with handakuten' },

  // ── Lesson 4: Yōon (small ャュョ combinations) ───────────────────────
  // Format: consonant-row + small ya/yu/yo. 11 base × 3 = 33 standard yōon.
  { kana: 'キャ', romaji: 'kya', row: 'yoon', lesson: 4, mnemonic: 'キ + small ャ — "kya"' },
  { kana: 'キュ', romaji: 'kyu', row: 'yoon', lesson: 4, mnemonic: 'キ + small ュ — "kyu"' },
  { kana: 'キョ', romaji: 'kyo', row: 'yoon', lesson: 4, mnemonic: 'キ + small ョ — "kyo"' },
  { kana: 'シャ', romaji: 'sha', row: 'yoon', lesson: 4, mnemonic: 'シ + small ャ — "sha" not "shya"', irregular: true },
  { kana: 'シュ', romaji: 'shu', row: 'yoon', lesson: 4, mnemonic: 'シ + small ュ — "shu"', irregular: true },
  { kana: 'ショ', romaji: 'sho', row: 'yoon', lesson: 4, mnemonic: 'シ + small ョ — "sho"', irregular: true },
  { kana: 'チャ', romaji: 'cha', row: 'yoon', lesson: 4, mnemonic: 'チ + small ャ — "cha" like green tea', irregular: true },
  { kana: 'チュ', romaji: 'chu', row: 'yoon', lesson: 4, mnemonic: 'チ + small ュ — "chu"', irregular: true },
  { kana: 'チョ', romaji: 'cho', row: 'yoon', lesson: 4, mnemonic: 'チ + small ョ — "cho"', irregular: true },
  { kana: 'ニャ', romaji: 'nya', row: 'yoon', lesson: 4, mnemonic: 'ニ + small ャ — "nya" (cat sound!)' },
  { kana: 'ニュ', romaji: 'nyu', row: 'yoon', lesson: 4, mnemonic: 'ニ + small ュ — "nyu"' },
  { kana: 'ニョ', romaji: 'nyo', row: 'yoon', lesson: 4, mnemonic: 'ニ + small ョ — "nyo"' },
  { kana: 'ヒャ', romaji: 'hya', row: 'yoon', lesson: 4, mnemonic: 'ヒ + small ャ — "hya"' },
  { kana: 'ヒュ', romaji: 'hyu', row: 'yoon', lesson: 4, mnemonic: 'ヒ + small ュ — "hyu"' },
  { kana: 'ヒョ', romaji: 'hyo', row: 'yoon', lesson: 4, mnemonic: 'ヒ + small ョ — "hyo"' },
  { kana: 'ミャ', romaji: 'mya', row: 'yoon', lesson: 4, mnemonic: 'ミ + small ャ — "mya"' },
  { kana: 'ミュ', romaji: 'myu', row: 'yoon', lesson: 4, mnemonic: 'ミ + small ュ — "myu"' },
  { kana: 'ミョ', romaji: 'myo', row: 'yoon', lesson: 4, mnemonic: 'ミ + small ョ — "myo"' },
  { kana: 'リャ', romaji: 'rya', row: 'yoon', lesson: 4, mnemonic: 'リ + small ャ — "rya"' },
  { kana: 'リュ', romaji: 'ryu', row: 'yoon', lesson: 4, mnemonic: 'リ + small ュ — "ryu"' },
  { kana: 'リョ', romaji: 'ryo', row: 'yoon', lesson: 4, mnemonic: 'リ + small ョ — "ryo"' },
  { kana: 'ギャ', romaji: 'gya', row: 'yoon', lesson: 4, mnemonic: 'ギ + small ャ — "gya"' },
  { kana: 'ギュ', romaji: 'gyu', row: 'yoon', lesson: 4, mnemonic: 'ギ + small ュ — "gyu"' },
  { kana: 'ギョ', romaji: 'gyo', row: 'yoon', lesson: 4, mnemonic: 'ギ + small ョ — "gyo"' },
  { kana: 'ジャ', romaji: 'ja',  row: 'yoon', lesson: 4, mnemonic: 'ジ + small ャ — "ja" like jazz', irregular: true },
  { kana: 'ジュ', romaji: 'ju',  row: 'yoon', lesson: 4, mnemonic: 'ジ + small ュ — "ju"', irregular: true },
  { kana: 'ジョ', romaji: 'jo',  row: 'yoon', lesson: 4, mnemonic: 'ジ + small ョ — "jo"', irregular: true },
  { kana: 'ビャ', romaji: 'bya', row: 'yoon', lesson: 4, mnemonic: 'ビ + small ャ — "bya"' },
  { kana: 'ビュ', romaji: 'byu', row: 'yoon', lesson: 4, mnemonic: 'ビ + small ュ — "byu"' },
  { kana: 'ビョ', romaji: 'byo', row: 'yoon', lesson: 4, mnemonic: 'ビ + small ョ — "byo"' },
  { kana: 'ピャ', romaji: 'pya', row: 'yoon', lesson: 4, mnemonic: 'ピ + small ャ — "pya"' },
  { kana: 'ピュ', romaji: 'pyu', row: 'yoon', lesson: 4, mnemonic: 'ピ + small ュ — "pyu"' },
  { kana: 'ピョ', romaji: 'pyo', row: 'yoon', lesson: 4, mnemonic: 'ピ + small ョ — "pyo"' },
];

// Reading drill: 16 real katakana words mixing N5 loanwords with Japanese
// proper nouns. Several use ー (chōonpu) and ッ (sokuon) which preview Lesson 5.
const READING_DRILL = [
  // Loanwords — instantly readable for English speakers, the "I CAN READ THIS" payoff
  { word: 'テレビ',         romaji: 'terebi',       meaning: 'TV (television)' },
  { word: 'コーヒー',       romaji: 'kōhī',         meaning: 'coffee (two ー long-vowel marks)' },
  { word: 'アメリカ',       romaji: 'amerika',      meaning: 'America' },
  { word: 'ピザ',           romaji: 'piza',         meaning: 'pizza' },
  { word: 'ジュース',       romaji: 'jūsu',         meaning: 'juice (uses ー)' },
  { word: 'カメラ',         romaji: 'kamera',       meaning: 'camera' },
  { word: 'レストラン',     romaji: 'resutoran',    meaning: 'restaurant' },
  { word: 'ホテル',         romaji: 'hoteru',       meaning: 'hotel' },
  { word: 'バナナ',         romaji: 'banana',       meaning: 'banana' },
  { word: 'サンドイッチ',   romaji: 'sandoitchi',   meaning: 'sandwich (small ッ doubles the t)' },

  // Japanese proper nouns — culture + brand recognition
  { word: 'フジ',           romaji: 'fuji',         meaning: 'Mt. Fuji' },
  { word: 'トヨタ',         romaji: 'toyota',       meaning: 'Toyota (car company)' },
  { word: 'ソニー',         romaji: 'sonī',         meaning: 'Sony (uses ー)' },
  { word: 'ニンテンドー',   romaji: 'nintendō',     meaning: 'Nintendo (uses ー)' },
  { word: 'パナソニック',   romaji: 'panasonikku',  meaning: 'Panasonic (small ッ)' },
  { word: 'トーキョー',     romaji: 'tōkyō',        meaning: 'Tokyo (two ー long-vowel marks)' },
];

// Expose to other scripts (browser-global, no module system).
if (typeof window !== 'undefined') {
  window.KATAKANA_DATA = KATAKANA_DATA;
  window.KATAKANA_READING_DRILL = READING_DRILL;
}
