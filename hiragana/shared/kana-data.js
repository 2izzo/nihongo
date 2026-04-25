// kana-data.js — single source of truth for Pack 1: Hiragana
// 46 base hiragana + 25 dakuten/handakuten + 33 yōon = 104 total
// Each entry: { kana, romaji, row, lesson, mnemonic, irregular }
// Lesson: 1=vowels+K, 2=S/T/N, 3=H/M/Y/R/W+ん, 4=dakuten+yōon
// Mnemonic style: distinct visual hook per character. Paraphrased from common
// pedagogical patterns (Tofugu-inspired). Each is a short scene the learner
// can picture instantly when they see the kana.

const KANA_DATA = [
  // ── Lesson 1: Vowels + K-row ──────────────────────────────────────────
  { kana: 'あ', romaji: 'a',  row: 'vowels', lesson: 1, mnemonic: 'a capital A wearing a hat — say "ahh!"' },
  { kana: 'い', romaji: 'i',  row: 'vowels', lesson: 1, mnemonic: 'two eels swimming side by side — eeee!' },
  { kana: 'う', romaji: 'u',  row: 'vowels', lesson: 1, mnemonic: 'a person doing a U-turn while bowling' },
  { kana: 'え', romaji: 'e',  row: 'vowels', lesson: 1, mnemonic: 'an exotic bird with a long beak — eh?' },
  { kana: 'お', romaji: 'o',  row: 'vowels', lesson: 1, mnemonic: 'a person with a big "Oh!" mouth' },
  { kana: 'か', romaji: 'ka', row: 'k',      lesson: 1, mnemonic: 'a kite tied to a string — kah!' },
  { kana: 'き', romaji: 'ki', row: 'k',      lesson: 1, mnemonic: 'a key on a keychain — key/ki' },
  { kana: 'く', romaji: 'ku', row: 'k',      lesson: 1, mnemonic: "a cuckoo's open beak" },
  { kana: 'け', romaji: 'ke', row: 'k',      lesson: 1, mnemonic: 'a keg of beer with a tap' },
  { kana: 'こ', romaji: 'ko', row: 'k',      lesson: 1, mnemonic: 'a coiled rope — two short stripes' },

  // ── Lesson 2: S/T/N rows ──────────────────────────────────────────────
  { kana: 'さ', romaji: 'sa',  row: 's', lesson: 2, mnemonic: 'a samurai with a sword across the back' },
  { kana: 'し', romaji: 'shi', row: 's', lesson: 2, mnemonic: 'a long fishing line — shhhh, the fish hear', irregular: true },
  { kana: 'す', romaji: 'su',  row: 's', lesson: 2, mnemonic: 'a swing on a pole — wheee, suuu!' },
  { kana: 'せ', romaji: 'se',  row: 's', lesson: 2, mnemonic: 'a sailor saying "say!"' },
  { kana: 'そ', romaji: 'so',  row: 's', lesson: 2, mnemonic: 'a needle threading a so-so stitch' },
  { kana: 'た', romaji: 'ta',  row: 't', lesson: 2, mnemonic: 'a tall figure standing next to a low one — "ta-da!"' },
  { kana: 'ち', romaji: 'chi', row: 't', lesson: 2, mnemonic: 'a cheerleader doing a leap — "cheee!"', irregular: true },
  { kana: 'つ', romaji: 'tsu', row: 't', lesson: 2, mnemonic: 'a tsunami wave curling over', irregular: true },
  { kana: 'て', romaji: 'te',  row: 't', lesson: 2, mnemonic: 'a hand reaching for a teapot — "te!"' },
  { kana: 'と', romaji: 'to',  row: 't', lesson: 2, mnemonic: 'a toe with a thumbtack stuck in it — "to!"' },
  { kana: 'な', romaji: 'na',  row: 'n', lesson: 2, mnemonic: 'a nun praying with a cross' },
  { kana: 'に', romaji: 'ni',  row: 'n', lesson: 2, mnemonic: 'a knee bent forward — "knee/ni"' },
  { kana: 'ぬ', romaji: 'nu',  row: 'n', lesson: 2, mnemonic: 'a noodle twisted in a knot' },
  { kana: 'ね', romaji: 'ne',  row: 'n', lesson: 2, mnemonic: 'a curled-up napping cat — "ne~"' },
  { kana: 'の', romaji: 'no',  row: 'n', lesson: 2, mnemonic: 'a "no entry" sign with a slash through' },

  // ── Lesson 3: H/M/Y/R/W + ん ─────────────────────────────────────────
  { kana: 'は', romaji: 'ha', row: 'h', lesson: 3, mnemonic: 'a person laughing — "ha-ha!"' },
  { kana: 'ひ', romaji: 'hi', row: 'h', lesson: 3, mnemonic: 'a smiling face — "hi!"' },
  { kana: 'ふ', romaji: 'fu', row: 'h', lesson: 3, mnemonic: 'a tall mountain (Mount Fuji) with peaks', irregular: true },
  { kana: 'へ', romaji: 'he', row: 'h', lesson: 3, mnemonic: 'a flat hill — "heeey, where\'d the slope go?"' },
  { kana: 'ほ', romaji: 'ho', row: 'h', lesson: 3, mnemonic: 'a Santa with a "ho-ho-ho" belly' },
  { kana: 'ま', romaji: 'ma', row: 'm', lesson: 3, mnemonic: 'a mama with two kids in tow' },
  { kana: 'み', romaji: 'mi', row: 'm', lesson: 3, mnemonic: 'the number 21 — "mi" mind your numbers' },
  { kana: 'む', romaji: 'mu', row: 'm', lesson: 3, mnemonic: 'a cow chewing — "moooo/mu"' },
  { kana: 'め', romaji: 'me', row: 'm', lesson: 3, mnemonic: 'an eye with a long eyelash — "me!"' },
  { kana: 'も', romaji: 'mo', row: 'm', lesson: 3, mnemonic: 'a fishhook with two worms — "more"' },
  { kana: 'や', romaji: 'ya', row: 'y', lesson: 3, mnemonic: 'a yacht with a sail — "yah!"' },
  { kana: 'ゆ', romaji: 'yu', row: 'y', lesson: 3, mnemonic: 'a unique fish swimming — "you!"' },
  { kana: 'よ', romaji: 'yo', row: 'y', lesson: 3, mnemonic: 'a yo-yo on its string' },
  { kana: 'ら', romaji: 'ra', row: 'r', lesson: 3, mnemonic: 'a rabbit ear bent over' },
  { kana: 'り', romaji: 'ri', row: 'r', lesson: 3, mnemonic: 'two reeds standing in a pond' },
  { kana: 'る', romaji: 'ru', row: 'r', lesson: 3, mnemonic: 'a curly noodle shaped like a route' },
  { kana: 'れ', romaji: 're', row: 'r', lesson: 3, mnemonic: 'a person resting against a wall' },
  { kana: 'ろ', romaji: 'ro', row: 'r', lesson: 3, mnemonic: 'a boxing glove from the side — "round!"' },
  { kana: 'わ', romaji: 'wa', row: 'w', lesson: 3, mnemonic: 'a wasp ready to sting — "wahh!"' },
  { kana: 'を', romaji: 'wo', row: 'w', lesson: 3, mnemonic: 'a person carrying a heavy object — only used as a particle, read as "o"', irregular: true },
  { kana: 'ん', romaji: 'n',  row: 'n-final', lesson: 3, mnemonic: 'the only single-consonant kana — never starts a word' },

  // ── Lesson 4: Dakuten/Handakuten ──────────────────────────────────────
  // Dakuten = " mark, voices the consonant. Handakuten = ° (only on H-row → P).
  { kana: 'が', romaji: 'ga', row: 'g', lesson: 4, mnemonic: 'か with two strokes — voiced K becomes G' },
  { kana: 'ぎ', romaji: 'gi', row: 'g', lesson: 4, mnemonic: 'き with dakuten' },
  { kana: 'ぐ', romaji: 'gu', row: 'g', lesson: 4, mnemonic: 'く with dakuten' },
  { kana: 'げ', romaji: 'ge', row: 'g', lesson: 4, mnemonic: 'け with dakuten' },
  { kana: 'ご', romaji: 'go', row: 'g', lesson: 4, mnemonic: 'こ with dakuten' },
  { kana: 'ざ', romaji: 'za', row: 'z', lesson: 4, mnemonic: 'さ with dakuten — S becomes Z' },
  { kana: 'じ', romaji: 'ji', row: 'z', lesson: 4, mnemonic: 'し with dakuten — "shi" becomes "ji"', irregular: true },
  { kana: 'ず', romaji: 'zu', row: 'z', lesson: 4, mnemonic: 'す with dakuten' },
  { kana: 'ぜ', romaji: 'ze', row: 'z', lesson: 4, mnemonic: 'せ with dakuten' },
  { kana: 'ぞ', romaji: 'zo', row: 'z', lesson: 4, mnemonic: 'そ with dakuten' },
  { kana: 'だ', romaji: 'da',  row: 'd', lesson: 4, mnemonic: 'た with dakuten — T becomes D' },
  { kana: 'ぢ', romaji: 'ji',  row: 'd', lesson: 4, mnemonic: 'ち + dakuten — also "ji", rare in modern Japanese', irregular: true },
  { kana: 'づ', romaji: 'zu',  row: 'd', lesson: 4, mnemonic: 'つ + dakuten — also "zu", rare in modern Japanese', irregular: true },
  { kana: 'で', romaji: 'de',  row: 'd', lesson: 4, mnemonic: 'て with dakuten' },
  { kana: 'ど', romaji: 'do',  row: 'd', lesson: 4, mnemonic: 'と with dakuten' },
  { kana: 'ば', romaji: 'ba', row: 'b', lesson: 4, mnemonic: 'は with dakuten — H becomes B' },
  { kana: 'び', romaji: 'bi', row: 'b', lesson: 4, mnemonic: 'ひ with dakuten' },
  { kana: 'ぶ', romaji: 'bu', row: 'b', lesson: 4, mnemonic: 'ふ with dakuten' },
  { kana: 'べ', romaji: 'be', row: 'b', lesson: 4, mnemonic: 'へ with dakuten' },
  { kana: 'ぼ', romaji: 'bo', row: 'b', lesson: 4, mnemonic: 'ほ with dakuten' },
  { kana: 'ぱ', romaji: 'pa', row: 'p', lesson: 4, mnemonic: 'は with handakuten (°) — H becomes P' },
  { kana: 'ぴ', romaji: 'pi', row: 'p', lesson: 4, mnemonic: 'ひ with handakuten' },
  { kana: 'ぷ', romaji: 'pu', row: 'p', lesson: 4, mnemonic: 'ふ with handakuten' },
  { kana: 'ぺ', romaji: 'pe', row: 'p', lesson: 4, mnemonic: 'へ with handakuten' },
  { kana: 'ぽ', romaji: 'po', row: 'p', lesson: 4, mnemonic: 'ほ with handakuten' },

  // ── Lesson 4: Yōon (combinations with small ゃゅょ) ───────────────────
  // Format: consonant-row + small ya/yu/yo. 11 base × 3 = 33 standard yōon.
  { kana: 'きゃ', romaji: 'kya', row: 'yoon', lesson: 4, mnemonic: 'き + small ゃ — "kya"' },
  { kana: 'きゅ', romaji: 'kyu', row: 'yoon', lesson: 4, mnemonic: 'き + small ゅ — "kyu"' },
  { kana: 'きょ', romaji: 'kyo', row: 'yoon', lesson: 4, mnemonic: 'き + small ょ — "kyo"' },
  { kana: 'しゃ', romaji: 'sha', row: 'yoon', lesson: 4, mnemonic: 'し + small ゃ — "sha" not "shya"', irregular: true },
  { kana: 'しゅ', romaji: 'shu', row: 'yoon', lesson: 4, mnemonic: 'し + small ゅ — "shu"', irregular: true },
  { kana: 'しょ', romaji: 'sho', row: 'yoon', lesson: 4, mnemonic: 'し + small ょ — "sho"', irregular: true },
  { kana: 'ちゃ', romaji: 'cha', row: 'yoon', lesson: 4, mnemonic: 'ち + small ゃ — "cha" like green tea', irregular: true },
  { kana: 'ちゅ', romaji: 'chu', row: 'yoon', lesson: 4, mnemonic: 'ち + small ゅ — "chu"', irregular: true },
  { kana: 'ちょ', romaji: 'cho', row: 'yoon', lesson: 4, mnemonic: 'ち + small ょ — "cho"', irregular: true },
  { kana: 'にゃ', romaji: 'nya', row: 'yoon', lesson: 4, mnemonic: 'に + small ゃ — "nya" (cat sound!)' },
  { kana: 'にゅ', romaji: 'nyu', row: 'yoon', lesson: 4, mnemonic: 'に + small ゅ — "nyu"' },
  { kana: 'にょ', romaji: 'nyo', row: 'yoon', lesson: 4, mnemonic: 'に + small ょ — "nyo"' },
  { kana: 'ひゃ', romaji: 'hya', row: 'yoon', lesson: 4, mnemonic: 'ひ + small ゃ — "hya"' },
  { kana: 'ひゅ', romaji: 'hyu', row: 'yoon', lesson: 4, mnemonic: 'ひ + small ゅ — "hyu"' },
  { kana: 'ひょ', romaji: 'hyo', row: 'yoon', lesson: 4, mnemonic: 'ひ + small ょ — "hyo"' },
  { kana: 'みゃ', romaji: 'mya', row: 'yoon', lesson: 4, mnemonic: 'み + small ゃ — "mya"' },
  { kana: 'みゅ', romaji: 'myu', row: 'yoon', lesson: 4, mnemonic: 'み + small ゅ — "myu"' },
  { kana: 'みょ', romaji: 'myo', row: 'yoon', lesson: 4, mnemonic: 'み + small ょ — "myo"' },
  { kana: 'りゃ', romaji: 'rya', row: 'yoon', lesson: 4, mnemonic: 'り + small ゃ — "rya"' },
  { kana: 'りゅ', romaji: 'ryu', row: 'yoon', lesson: 4, mnemonic: 'り + small ゅ — "ryu"' },
  { kana: 'りょ', romaji: 'ryo', row: 'yoon', lesson: 4, mnemonic: 'り + small ょ — "ryo"' },
  { kana: 'ぎゃ', romaji: 'gya', row: 'yoon', lesson: 4, mnemonic: 'ぎ + small ゃ — "gya"' },
  { kana: 'ぎゅ', romaji: 'gyu', row: 'yoon', lesson: 4, mnemonic: 'ぎ + small ゅ — "gyu"' },
  { kana: 'ぎょ', romaji: 'gyo', row: 'yoon', lesson: 4, mnemonic: 'ぎ + small ょ — "gyo"' },
  { kana: 'じゃ', romaji: 'ja',  row: 'yoon', lesson: 4, mnemonic: 'じ + small ゃ — "ja" like jazz', irregular: true },
  { kana: 'じゅ', romaji: 'ju',  row: 'yoon', lesson: 4, mnemonic: 'じ + small ゅ — "ju"', irregular: true },
  { kana: 'じょ', romaji: 'jo',  row: 'yoon', lesson: 4, mnemonic: 'じ + small ょ — "jo"', irregular: true },
  { kana: 'びゃ', romaji: 'bya', row: 'yoon', lesson: 4, mnemonic: 'び + small ゃ — "bya"' },
  { kana: 'びゅ', romaji: 'byu', row: 'yoon', lesson: 4, mnemonic: 'び + small ゅ — "byu"' },
  { kana: 'びょ', romaji: 'byo', row: 'yoon', lesson: 4, mnemonic: 'び + small ょ — "byo"' },
  { kana: 'ぴゃ', romaji: 'pya', row: 'yoon', lesson: 4, mnemonic: 'ぴ + small ゃ — "pya"' },
  { kana: 'ぴゅ', romaji: 'pyu', row: 'yoon', lesson: 4, mnemonic: 'ぴ + small ゅ — "pyu"' },
  { kana: 'ぴょ', romaji: 'pyo', row: 'yoon', lesson: 4, mnemonic: 'ぴ + small ょ — "pyo"' },
];

// Reading drill: 15 real Japanese words written entirely in hiragana.
// Used in Lesson 4's final reading drill. Frequency-driven (N5 vocab).
// Romaji and meaning are revealed on click.
const READING_DRILL = [
  { word: 'ねこ',         romaji: 'neko',          meaning: 'cat' },
  { word: 'いぬ',         romaji: 'inu',           meaning: 'dog' },
  { word: 'みず',         romaji: 'mizu',          meaning: 'water' },
  { word: 'ひと',         romaji: 'hito',          meaning: 'person' },
  { word: 'ほん',         romaji: 'hon',           meaning: 'book' },
  { word: 'さくら',       romaji: 'sakura',        meaning: 'cherry blossom' },
  { word: 'おちゃ',       romaji: 'ocha',          meaning: 'tea (yōon: ちゃ)' },
  { word: 'にほん',       romaji: 'nihon',         meaning: 'Japan' },
  { word: 'ありがとう',   romaji: 'arigatou',      meaning: 'thanks (long ō: うう)' },
  { word: 'こんにちは',   romaji: "kon'nichiwa",   meaning: 'hello (は read as wa here — particle)' },
  { word: 'すし',         romaji: 'sushi',         meaning: 'sushi' },
  { word: 'ともだち',     romaji: 'tomodachi',     meaning: 'friend' },
  { word: 'にほんご',     romaji: 'nihongo',       meaning: 'Japanese language' },
  { word: 'きょうしつ',   romaji: 'kyōshitsu',     meaning: 'classroom (yōon: きょ)' },
  { word: 'がっこう',     romaji: 'gakkō',         meaning: 'school (small っ doubles next consonant; long ō)' },
];

// Expose to other scripts (browser-global, no module system).
if (typeof window !== 'undefined') {
  window.KANA_DATA = KANA_DATA;
  window.READING_DRILL = READING_DRILL;
}
