/* =============================================================
game.js — Wordle Clone
Drop this in the same folder as index.html + style.css
============================================================= */

// ── WORD LIST (200 common 5-letter words) ──────────────────
const WORDS = [
"about","above","abuse","actor","acute","admit","adopt","adult","after","again",
"agent","agree","ahead","alarm","album","alert","alike","alive","alley","allow",
"alone","along","alter","angel","anger","angle","angry","anime","ankle","annex",
"apart","apple","apply","arena","argue","arise","armor","army","aroma","arose",
"array","arrow","aside","asset","atlas","avoid","awake","award","aware","badly",
"basic","basis","batch","beach","began","begin","being","below","bench","bible",
"black","blade","blame","bland","blank","blast","blaze","bleed","blend","bless",
"blind","block","blood","bloom","blown","blues","blunt","board","bonus","boost",
"booth","bound","boxed","brain","brand","brave","bread","break","breed","brick",
"bride","brief","bring","broad","broke","brook","brown","brush","build","built",
"bunch","burst","buyer","cabin","cable","camel","candy","carry","catch","cause",
"cease","chain","chair","chaos","charm","chart","chase","cheap","check","cheek",
"chess","chest","chief","child","chill","choir","civic","civil","claim","class",
"clean","clear","clerk","click","cliff","climb","cling","clock","close","cloth",
"cloud","coach","coast","color","comet","comic","coral","could","count","court",
"cover","crack","craft","crane","crash","crazy","cream","creek","crime","crisp",
"cross","crowd","crown","cruel","crush","curve","cycle","daily","dance","death",
"debut","decor","delay","delta","demon","dense","depot","depth","derby","devil",
"digit","diode","dirty","disco","ditch","diver","doing","dough","doubt","drank",
"drawn","dream","dress","drift","drink","drive","drone","drove","dying","eager",
"early","earth","eight","elite","email","empty","enemy","enjoy","enter","entry",
"equal","error","event","every","exact","exist","extra","fable","faced","faith",
"false","fancy","fatal","feast","fiber","field","fifth","fifty","fight","final",
"flair","flame","flank","flash","flask","fleet","flesh","flock","flood","floor",
"flour","flown","fluid","flute","focus","force","forge","forth","forum","found",
"frame","freed","fresh","front","froze","fruit","fully","funds","funny","giant",
"given","gland","glass","glide","globe","gloom","glory","gloss","glove","going",
"grace","grade","grain","grand","grant","grasp","grass","graze","great","greed",
"green","greet","grief","grind","groan","group","grove","grown","gruel","guard",
"guide","guild","guilt","guise","gulch","gummy","gusto","hands","happy","harsh",
"heart","heavy","hence","herbs","hinge","hired","homer","honey","horse","hotel",
"house","human","humor","hunch","image","imply","inbox","index","indie","infer",
"inner","input","inter","intro","issue","ivory","joker","juice","juicy","jumbo",
"judge","kayak","kneel","knife","knock","known","label","lance","large","laser",
"later","laugh","layer","learn","lease","leave","legal","lemon","level","light",
"limit","linen","liver","llama","local","logic","loose","lover","lower","lucid",
"lucky","lunar","lyric","magic","major","maker","manor","maple","march","match",
"mayor","media","metal","model","money","month","moral","motor","mount","mouse",
"mouth","moved","movie","music","naive","nerve","never","night","noble","noise",
"north","noted","novel","nurse","nylon","occur","ocean","offer","often","olive",
"onset","optic","orbit","order","other","ought","outer","ozone","paint","panic",
"panel","paper","party","paste","patch","pause","peace","pearl","pedal","perch",
"phase","phone","photo","piano","piece","pilot","pinch","pixel","place","plain",
"plane","plant","plate","plaza","plead","pluck","plumb","plume","plunk","plush",
"point","polar","posed","power","press","price","pride","prime","print","prior",
"prism","prize","probe","prone","proof","prose","proud","prove","prowl","proxy",
"pulse","punch","pupil","purse","queen","query","queue","quick","quiet","quota",
"quote","radar","radio","raise","rally","ranch","range","rapid","ratio","reach",
"react","ready","realm","rebel","refer","reign","relax","remix","repay","reset",
"rider","ridge","right","rigid","risky","rival","river","robin","robot","rocky",
"roman","rouge","rough","round","route","royal","rugby","ruler","rural","saint",
"salad","sauce","scale","scald","scene","scout","screw","sedan","sense","serve",
"setup","seven","shade","shaft","shake","shall","shame","shape","share","shark",
"sharp","sheep","sheer","shelf","shell","shift","shine","shirt","shock","shore",
"short","shout","shove","shown","sight","silky","silly","since","sixth","sixty",
"sized","skill","skulk","slate","sleep","slice","slide","slope","small","smart",
"smell","smile","smoke","snake","solar","solid","solve","sorry","sound","south",
"space","spare","spark","speak","spend","spice","spill","spine","spire","split",
"spoke","spore","sport","spray","squad","stack","staff","stage","stain","stake",
"stale","stand","stare","start","state","stays","steal","steam","steel","steep",
"steer","stern","stick","stiff","still","stock","stone","stood","store","storm",
"story","stove","strap","stray","strip","stuck","study","style","sugar","suite",
"sunny","super","surge","swamp","swear","sweep","sweet","swept","swift","swipe",
"swirl","swore","sworn","swing","table","taste","teach","teeth","tempo","tense",
"terms","their","theme","there","these","thick","thing","think","thorn","those",
"three","threw","throw","thumb","tiger","tight","timer","tired","title","today",
"token","total","touch","tough","tower","toxic","trace","track","trade","trail",
"train","trait","tramp","trash","trawl","trend","trial","tribe","trick","tried",
"troop","truck","truly","trump","trunk","trust","truth","tumor","tuner","tunic",
"tweed","twice","twist","typed","ultra","under","unify","union","unity","until",
"upper","upset","urban","usage","usual","utter","vague","valid","valor","value",
"vapor","vault","video","vigil","viral","visit","vital","vivid","vocal","voice",
"voted","vowed","waltz","waste","watch","water","weary","weave","wedge","weigh",
"weird","whale","wheat","wheel","where","which","while","white","whole","whose",
"wider","witty","woman","women","world","worry","worse","worst","worth","would",
"wound","wrath","wrist","wrote","yield","young","yours","youth","zebra","zonal"
];

// ── CONSTANTS ──────────────────────────────────────────────
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

// ── STATE ──────────────────────────────────────────────────
let targetWord   = '';
let currentRow   = 0;
let currentCol   = 0;
let currentGuess = [];
let gameOver     = false;

// ── DOM REFS ───────────────────────────────────────────────
const messageEl = document.getElementById('message-container');

// ── INIT ───────────────────────────────────────────────────
function init() {
targetWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
buildStarField();
attachKeyboard();
attachPhysicalKeyboard();
console.log('🟩 Target (dev only):', targetWord); // remove before shipping!
}

// ── STAR FIELD (ambient background twinkles) ───────────────
function buildStarField() {
const sf = document.getElementById('star-field');
if (!sf) return;
for (let i = 0; i < 50; i++) {
const s = document.createElement('span');
const size = 1 + Math.random() * 2.5;
s.style.cssText = `
    left:${Math.random() * 100}vw;
    top:${Math.random() * 100}vh;
    width:${size}px;
    height:${size}px;
    animation-duration:${2 + Math.random() * 5}s;
    animation-delay:${Math.random() * 6}s;
`;
sf.appendChild(s);
}
}

// ── KEYBOARD — on-screen click ─────────────────────────────
function attachKeyboard() {
/*
Event delegation: one listener on #keyboard catches all
button clicks. We read data-key to know which key fired.
This is more efficient than 29 individual listeners.
*/
document.getElementById('keyboard').addEventListener('click', e => {
const btn = e.target.closest('[data-key]');
if (!btn) return;
// Visual press feedback
btn.classList.add('key--pressed');
btn.addEventListener('animationend', () => btn.classList.remove('key--pressed'), { once: true });
handleKey(btn.dataset.key);
});
}

// ── KEYBOARD — physical keys ───────────────────────────────
function attachPhysicalKeyboard() {
document.addEventListener('keydown', e => {
if (e.ctrlKey || e.altKey || e.metaKey) return;
if (e.key === 'Enter')     handleKey('Enter');
else if (e.key === 'Backspace') handleKey('Backspace');
else if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key.toUpperCase());
});
}

// ── CENTRAL KEY HANDLER ────────────────────────────────────
function handleKey(key) {
if (gameOver) return;

if (key === 'Enter') {
submitGuess();
} else if (key === 'Backspace') {
deleteLetter();
} else if (/^[A-Z]$/.test(key)) {
addLetter(key);
}
}

// ── ADD LETTER ─────────────────────────────────────────────
function addLetter(letter) {
if (currentCol >= WORD_LENGTH) return; // row is full

const tile = getTile(currentRow, currentCol);
tile.textContent       = letter;
tile.dataset.letter    = letter;   // triggers CSS border glow
currentGuess.push(letter);
currentCol++;

// Bounce the tile when a letter lands
animateTile(tile, 'tile--bounce');
}

// ── DELETE LETTER ──────────────────────────────────────────
function deleteLetter() {
if (currentCol <= 0) return;

currentCol--;
currentGuess.pop();

const tile = getTile(currentRow, currentCol);
tile.textContent    = '';
delete tile.dataset.letter;
}

// ── SUBMIT GUESS ───────────────────────────────────────────
function submitGuess() {
if (currentCol < WORD_LENGTH) {
showMessage('Not enough letters');
shakeRow(currentRow);
return;
}

const guess = currentGuess.join('');

if (!WORDS.includes(guess.toLowerCase())) {
showMessage('Not in word list');
shakeRow(currentRow);
return;
}

const result = evaluateGuess(guess);
revealRow(currentRow, guess, result);
}

// ── EVALUATE GUESS ─────────────────────────────────────────
/*
Returns an array of 5 statuses: 'correct' | 'present' | 'absent'
Uses a two-pass algorithm to handle duplicate letters correctly:
Pass 1 — mark exact matches (correct)
Pass 2 — mark letters in wrong position (present) or absent
*/
function evaluateGuess(guess) {
const result    = Array(WORD_LENGTH).fill('absent');
const targetArr = targetWord.split('');
const guessArr  = guess.split('');

// Pass 1 — correct positions
guessArr.forEach((letter, i) => {
if (letter === targetArr[i]) {
    result[i]    = 'correct';
    targetArr[i] = null; // consume this letter
    guessArr[i]  = null;
}
});

// Pass 2 — present but wrong position
guessArr.forEach((letter, i) => {
if (!letter) return; // already matched
const foundAt = targetArr.indexOf(letter);
if (foundAt !== -1) {
    result[i]          = 'present';
    targetArr[foundAt] = null; // consume
}
});

return result;
}

// ── REVEAL ROW (flip animation + colour) ───────────────────
function revealRow(row, guess, result) {
const FLIP_DURATION  = 520;  // ms — matches CSS animation
const FLIP_STAGGER   = 300;  // ms between each tile flip

result.forEach((status, i) => {
const tile = getTile(row, i);

setTimeout(() => {
    // Start flip
    tile.classList.add('tile--flip');

    // At the midpoint of the flip, swap in the colour class
    setTimeout(() => {
    tile.classList.add(status);
    }, FLIP_DURATION / 2);

    // After flip completes, add particles
    setTimeout(() => {
    tile.classList.remove('tile--flip');

    if (status === 'correct') {
        // CSS star burst
        animateTile(tile, 'tile--stars');
        animateTile(tile, 'tile--ring-pulse');
        // JS particle explosion
        const rect = tile.getBoundingClientRect();
        const cx   = rect.left + rect.width / 2;
        const cy   = rect.top  + rect.height / 2;
        spawnBubbles(cx, cy, 10);
        spawnStars(cx, cy, 14);
    } else if (status === 'present') {
        animateTile(tile, 'tile--ring-pulse-yellow');
    }

    // Update keyboard colour (best state wins)
    updateKeyColor(guess[i], status);

    // After last tile — check win/lose
    if (i === WORD_LENGTH - 1) {
        setTimeout(() => checkGameEnd(result), 200);
    }
    }, FLIP_DURATION);

}, i * FLIP_STAGGER);
});
}

// ── CHECK WIN / LOSE ───────────────────────────────────────
function checkGameEnd(result) {
const won = result.every(s => s === 'correct');

if (won) {
gameOver = true;
celebrateWin();
const msgs = ['Genius!', 'Magnificent!', 'Impressive!', 'Splendid!', 'Great!', 'Phew!'];
setTimeout(() => showMessage(msgs[currentRow] || 'Nice!', 2800), 300);
return;
}

currentRow++;
currentCol   = 0;
currentGuess = [];

if (currentRow >= MAX_GUESSES) {
gameOver = true;
setTimeout(() => showMessage(targetWord, 3500), 300);
}
}

// ── WIN CELEBRATION ────────────────────────────────────────
function celebrateWin() {
const tiles = document.querySelectorAll(`[data-row="${currentRow}"] .tile`);
tiles.forEach((tile, i) => {
setTimeout(() => {
    animateTile(tile, 'tile--win-bounce');
}, i * 120);
});

// Burst of bubbles from each winning tile
setTimeout(() => {
tiles.forEach(tile => {
    const rect = tile.getBoundingClientRect();
    spawnBubbles(rect.left + rect.width/2, rect.top + rect.height/2, 8);
    spawnStars(rect.left + rect.width/2,   rect.top + rect.height/2, 10);
});
}, 400);
}

// ── UPDATE KEYBOARD KEY COLOUR ─────────────────────────────
/*
Priority: correct > present > absent
Once a key is green, never downgrade it to yellow or gray.
*/
const KEY_PRIORITY = { correct: 2, present: 1, absent: 0 };

function updateKeyColor(letter, status) {
const key = document.querySelector(`[data-key="${letter}"]`);
if (!key) return;

const current = ['correct','present','absent'].find(c => key.classList.contains(c));
if (current && KEY_PRIORITY[current] >= KEY_PRIORITY[status]) return;

if (current) key.classList.remove(current);
key.classList.add(status);
}

// ── SHOW MESSAGE ───────────────────────────────────────────
let messageTimer = null;

function showMessage(text, duration = 1600) {
messageEl.textContent = text;
messageEl.classList.add('visible');

clearTimeout(messageTimer);
messageTimer = setTimeout(() => {
messageEl.classList.remove('visible');
}, duration);
}

// ── SHAKE ROW ──────────────────────────────────────────────
function shakeRow(row) {
const rowEl = document.querySelector(`[data-row="${row}"]`);
animateTile(rowEl, 'tile-row--shake');
}

// ── ANIMATE HELPER ─────────────────────────────────────────
/*
Adds a CSS animation class, waits for it to end, then removes it.
This lets the same animation be re-triggered cleanly later.
*/
function animateTile(el, className) {
el.classList.remove(className); // reset if already present
void el.offsetWidth;            // force reflow so re-add triggers
el.classList.add(className);
el.addEventListener('animationend', () => {
el.classList.remove(className);
}, { once: true });
}

// ── GET TILE ───────────────────────────────────────────────
function getTile(row, col) {
return document.querySelector(`.tile[data-row="${row}"][data-index="${col}"]`);
}

// ── SPAWN BUBBLES (JS particle system) ────────────────────
/*
Creates coloured circles that float upward from (x, y).
Each bubble uses CSS custom properties --dx / --dy for direction.
*/
function spawnBubbles(x, y, count = 12) {
const colors = [
'#4CAF50','#00e676','#fbbf24',
'#a78bfa','#60a5fa','#f87171',
'#34d399','#fff'
];
for (let i = 0; i < count; i++) {
const b    = document.createElement('span');
b.className = 'bubble';
const size  = 7 + Math.random() * 14;
const dx    = (Math.random() - 0.5) * 130;
const dy    = -(55 + Math.random() * 130);
const color = colors[Math.floor(Math.random() * colors.length)];
const dur   = 0.55 + Math.random() * 0.55;
const delay = Math.random() * 0.15;

b.style.cssText = `
    left:${x}px; top:${y}px;
    width:${size}px; height:${size}px;
    background:${color};
    --dx:${dx}px; --dy:${dy}px;
    animation-duration:${dur}s;
    animation-delay:${delay}s;
`;
document.body.appendChild(b);
b.addEventListener('animationend', () => b.remove(), { once: true });
}
}

// ── SPAWN STARS (JS confetti flecks) ──────────────────────
function spawnStars(x, y, count = 16) {
const colors = [
'#fff','#fbbf24','#34d399',
'#a78bfa','#60a5fa','#f87171',
'#00e676','#38bdf8'
];
for (let i = 0; i < count; i++) {
const s     = document.createElement('span');
s.className  = 'star-particle';
const dx    = (Math.random() - 0.5) * 200;
const dy    = -(45 + Math.random() * 170);
const rot   = Math.random() * 360;
const size  = 4 + Math.random() * 7;
const color = colors[i % colors.length];
const round = Math.random() > 0.5 ? '50%' : '2px';
const dur   = 0.45 + Math.random() * 0.5;
const delay = Math.random() * 0.12;

s.style.cssText = `
    left:${x}px; top:${y}px;
    width:${size}px; height:${size}px;
    background:${color};
    border-radius:${round};
    --dx:${dx}px; --dy:${dy}px; --rot:${rot}deg;
    animation-duration:${dur}s;
    animation-delay:${delay}s;
`;
document.body.appendChild(s);
s.addEventListener('animationend', () => s.remove(), { once: true });
}
}

// ── GO ─────────────────────────────────────────────────────
init();