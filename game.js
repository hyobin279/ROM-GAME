/* =========================================
   ROM DANCE GAME — game.js
   ROM exercise database + game engine
   ========================================= */

// ===== ROM EXERCISE DATABASE =====
const ROM_MOVES = [
  // SHOULDER
  {
    id: 'shoulder_flex',
    icon: '💪',
    title: '팔을 앞으로 들어요!',
    bodyPart: '어깨',
    romType: '어깨 굴곡 (Shoulder Flexion)',
    instruction: '두 팔을 앞으로 쭉 들어올려요!',
    feedbackMsg: '어깨 근육이 튼튼해지고 있어요!',
    demoArms: { left: 'shoulder-flex', right: 'shoulder-flex' },
    demoLegs: { left: '', right: '' },
    hold: 3,
    stars: 3,
  },
  {
    id: 'shoulder_abduct',
    icon: '🦅',
    title: '독수리처럼 날개를 펴요!',
    bodyPart: '어깨',
    romType: '어깨 외전 (Shoulder Abduction)',
    instruction: '팔을 양 옆으로 활짝 펴요!',
    feedbackMsg: '양 어깨가 쑥쑥 움직이고 있어요!',
    demoArms: { left: 'shoulder-abduct', right: 'shoulder-abduct' },
    demoLegs: { left: '', right: '' },
    hold: 3,
    stars: 3,
  },
  {
    id: 'reach_up',
    icon: '🌈',
    title: '하늘에 손닿아요!',
    bodyPart: '어깨',
    romType: '어깨 굴곡 (Full Elevation)',
    instruction: '두 팔을 하늘 위로 높이 뻗어요!',
    feedbackMsg: '하늘에 손이 닿을 것 같아요!',
    demoArms: { left: 'reach-up', right: 'reach-up' },
    demoLegs: { left: '', right: '' },
    hold: 4,
    stars: 3,
  },
  {
    id: 'elbow_flex',
    icon: '🦾',
    title: '팔꿈치를 구부려요!',
    bodyPart: '팔꿈치',
    romType: '팔꿈치 굴곡 (Elbow Flexion)',
    instruction: '팔꿈치를 구부려 어깨를 터치해요!',
    feedbackMsg: '팔꿈치가 쑥쑥 잘 움직여요!',
    demoArms: { left: 'elbow-flex', right: 'elbow-flex' },
    demoLegs: { left: '', right: '' },
    hold: 3,
    stars: 2,
  },
  // HIP / LEG
  {
    id: 'hip_flex',
    icon: '🦵',
    title: '무릎을 높이 들어요!',
    bodyPart: '고관절',
    romType: '고관절 굴곡 (Hip Flexion)',
    instruction: '무릎을 배꼽까지 번갈아 들어올려요!',
    feedbackMsg: '다리가 씩씩하게 올라갔어요!',
    demoArms: { left: 'idle', right: 'idle' },
    demoLegs: { left: 'hip-flex', right: 'hip-flex' },
    hold: 3,
    stars: 3,
  },
  {
    id: 'march',
    icon: '🥁',
    title: '신나게 제자리 걸음!',
    bodyPart: '고관절',
    romType: '고관절 굴곡 리듬 (Marching)',
    instruction: '신나는 음악에 맞춰 제자리 걸음!',
    feedbackMsg: '리듬감이 넘쳐나요!',
    demoArms: { left: 'idle', right: 'idle' },
    demoLegs: { left: 'march', right: 'march' },
    hold: 5,
    stars: 3,
  },
  // COMBINED
  {
    id: 'star_jump',
    icon: '⭐',
    title: '별모양 점프!',
    bodyPart: '전신',
    romType: '전신 운동 (Full Body)',
    instruction: '팔다리를 쭉 펴고 별 모양을 만들어요!',
    feedbackMsg: '온몸이 별처럼 빛나요!',
    demoArms: { left: 'shoulder-abduct', right: 'shoulder-abduct' },
    demoLegs: { left: 'hip-flex', right: 'hip-flex' },
    hold: 4,
    stars: 3,
  },
  {
    id: 'wave',
    icon: '👋',
    title: '손을 흔들어요!',
    bodyPart: '어깨/손목',
    romType: '어깨+손목 (Shoulder & Wrist)',
    instruction: '두 팔을 올려 신나게 손을 흔들어요!',
    feedbackMsg: '손목과 어깨 모두 잘했어요!',
    demoArms: { left: 'reach-up', right: 'reach-up' },
    demoLegs: { left: '', right: '' },
    hold: 4,
    stars: 2,
  },
];

// ===== LEVELS =====
const LEVELS = [
  {
    level: 1,
    name: '워밍업!',
    movesPerRound: 3,
    holdMultiplier: 1,
    movePool: ['shoulder_flex', 'reach_up', 'hip_flex'],
    bgGradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
  },
  {
    level: 2,
    name: '도전!',
    movesPerRound: 4,
    holdMultiplier: 1,
    movePool: ['shoulder_abduct', 'elbow_flex', 'hip_flex', 'march'],
    bgGradient: 'linear-gradient(135deg, #1a0533, #40107a, #1c3a6e)',
  },
  {
    level: 3,
    name: '파워업!',
    movesPerRound: 5,
    holdMultiplier: 1.2,
    movePool: ['shoulder_flex', 'shoulder_abduct', 'reach_up', 'star_jump', 'wave'],
    bgGradient: 'linear-gradient(135deg, #0a2e0a, #0d5c2e, #0a4069)',
  },
];

const PRAISE_MSGS = [
  '잘했어요! 🎉', '최고야! 🌟', '훌륭해요! 🎊', '대단해! 💪', '완벽해요! ✨',
  '멋있어요! 🎈', '정말 잘했어요! 🏆',
];

// ===== GAME STATE =====
let state = {
  currentScreen: 'start',
  levelIndex: 0,
  score: 0,
  lives: 3,
  moveQueue: [],
  currentMoveIndex: 0,
  countdownInterval: null,
  countdownLeft: 0,
  completedParts: new Set(),
};

// ===== SCREEN MANAGEMENT =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  const screen = document.getElementById(`screen-${id}`);
  screen.classList.add('active', 'screen-fade-in');
  setTimeout(() => screen.classList.remove('screen-fade-in'), 400);
}

// ===== START GAME =====
function startGame() {
  state.score = 0;
  state.lives = 3;
  state.levelIndex = 0;
  state.completedParts = new Set();
  startLevel();
}

function resetGame() {
  startGame();
}

function startLevel() {
  const level = LEVELS[state.levelIndex];
  // Build move queue from pool
  const pool = level.movePool.map(id => ROM_MOVES.find(m => m.id === id)).filter(Boolean);
  // Shuffle and pick
  state.moveQueue = shuffle([...pool]).slice(0, level.movesPerRound);
  state.currentMoveIndex = 0;

  updateHUD();
  showScreen('mission');
  presentMove();
}

// ===== PRESENT CURRENT MOVE =====
function presentMove() {
  const move = state.moveQueue[state.currentMoveIndex];
  if (!move) {
    // All moves done → level complete
    showLevelComplete();
    return;
  }

  updateProgress();

  // Update ROM label
  document.getElementById('rom-icon').textContent = move.icon;
  document.getElementById('rom-text').textContent = move.instruction;

  // Re-trigger animation
  const label = document.getElementById('rom-label');
  label.style.animation = 'none';
  void label.offsetWidth;
  label.style.animation = '';

  // Set character pose
  applyPose(move);

  // Start countdown
  startCountdown(move.hold);
}

function applyPose(move) {
  const arms = { left: document.getElementById('demo-arm-left'), right: document.getElementById('demo-arm-right') };
  const legs = { left: document.getElementById('demo-leg-left'), right: document.getElementById('demo-leg-right') };

  const allClasses = ['shoulder-flex','shoulder-abduct','elbow-flex','reach-up','hip-flex','march','idle','raised','droop'];

  // Reset
  Object.values(arms).forEach(el => {
    allClasses.forEach(c => el.classList.remove(c));
  });
  Object.values(legs).forEach(el => {
    if (el) allClasses.forEach(c => el.classList.remove(c));
  });

  // Apply
  if (move.demoArms.left) arms.left.classList.add(move.demoArms.left);
  if (move.demoArms.right) arms.right.classList.add(move.demoArms.right);
  if (legs.left && move.demoLegs.left) legs.left.classList.add(move.demoLegs.left);
  if (legs.right && move.demoLegs.right) legs.right.classList.add(move.demoLegs.right);
}

// ===== COUNTDOWN RING =====
const CIRCUMFERENCE = 2 * Math.PI * 34; // r=34 → ≈213.6

function startCountdown(seconds) {
  clearInterval(state.countdownInterval);
  state.countdownLeft = seconds;

  const ring = document.getElementById('ring-progress');
  const num = document.getElementById('ring-number');

  const update = () => {
    const pct = state.countdownLeft / seconds;
    ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct);
    num.textContent = Math.ceil(state.countdownLeft);
    num.classList.add('flash');
    setTimeout(() => num.classList.remove('flash'), 150);
  };

  update();

  state.countdownInterval = setInterval(() => {
    state.countdownLeft -= 0.1;
    update();
    if (state.countdownLeft <= 0) {
      clearInterval(state.countdownInterval);
      // Auto-count as done after hold time (prompt shown)
    }
  }, 100);
}

// ===== PLAYER ACTIONS =====
function markDone() {
  clearInterval(state.countdownInterval);
  const move = state.moveQueue[state.currentMoveIndex];

  // Add score
  const earned = move.stars * 10;
  state.score += earned;
  state.completedParts.add(move.bodyPart);

  // Show success feedback
  showSuccessFeedback(move, earned);
}

function skipMove() {
  clearInterval(state.countdownInterval);
  state.lives = Math.max(0, state.lives - 1);
  updateHUD();

  state.currentMoveIndex++;
  if (state.lives <= 0) {
    showGameOver();
    return;
  }
  presentMove();
}

function nextMove() {
  state.currentMoveIndex++;
  showScreen('mission');
  presentMove();
}

// ===== FEEDBACK SCREEN =====
function showSuccessFeedback(move, earned) {
  // Set praise title
  const title = PRAISE_MSGS[Math.floor(Math.random() * PRAISE_MSGS.length)];
  document.getElementById('feedback-title').textContent = title;
  document.getElementById('feedback-msg').textContent = move.feedbackMsg;

  // Stars earned display
  const starsEl = document.getElementById('stars-earned');
  starsEl.textContent = '⭐'.repeat(move.stars);

  // Burst emoji
  const bursts = ['🎉', '🎊', '✨', '💫', '🌟'];
  document.getElementById('burst-fx').textContent = bursts[Math.floor(Math.random() * bursts.length)];

  showScreen('success');
}

// ===== LEVEL COMPLETE =====
function showLevelComplete() {
  const level = LEVELS[state.levelIndex];
  document.getElementById('level-score-val').textContent = state.score;

  // Body parts
  const partsEl = document.getElementById('body-parts-done');
  partsEl.innerHTML = '';
  state.completedParts.forEach(part => {
    const badge = document.createElement('div');
    badge.className = 'body-part-badge';
    badge.textContent = part;
    partsEl.appendChild(badge);
  });

  showScreen('level-complete');
}

function nextLevel() {
  state.levelIndex++;
  if (state.levelIndex >= LEVELS.length) {
    // All levels done
    showGameOver(true);
    return;
  }
  startLevel();
}

// ===== GAME OVER =====
function showGameOver(win = false) {
  document.getElementById('final-score').textContent = state.score;
  showScreen('gameover');
}

// ===== HUD =====
function updateHUD() {
  document.getElementById('score').textContent = state.score;
  document.getElementById('current-level').textContent = state.levelIndex + 1;

  const hearts = '❤️'.repeat(state.lives) + '🖤'.repeat(3 - state.lives);
  document.getElementById('lives-display').textContent = hearts;
}

function updateProgress() {
  const total = state.moveQueue.length;
  const done = state.currentMoveIndex;
  const pct = (done / total) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent = `${done} / ${total}`;
}

// ===== UTILS =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ===== KEYBOARD SUPPORT =====
document.addEventListener('keydown', (e) => {
  const mission = document.getElementById('screen-mission');
  const success = document.getElementById('screen-success');
  if (mission.classList.contains('active')) {
    if (e.key === 'Enter' || e.key === ' ') markDone();
    if (e.key === 'Escape') skipMove();
  }
  if (success.classList.contains('active')) {
    if (e.key === 'Enter' || e.key === ' ') nextMove();
  }
});
