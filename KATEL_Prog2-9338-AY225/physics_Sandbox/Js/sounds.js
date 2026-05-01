/*
  =====================================================
  🎮 Physics Sandbox — World of Goo × Crayon Physics
  📁 js/sound.js
  📌 Description:
    Sound manager — loads and plays sounds with cooldown
    protection (prevents audio spam), randomized pitch
    for variety, and background music with autoplay
    fallback handling.

    Required assets (place in assets/sounds/):
      bounce.mp3, score.mp3, win.mp3, bg.mp3
  =====================================================
*/

// ──────────────────────────────────────────────────
//  SOUND MAP
// ──────────────────────────────────────────────────
const sounds = {
  bounce: new Audio('assets/sounds/bounce.mp3'),
  score:  new Audio('assets/sounds/score.mp3'),
  win:    new Audio('assets/sounds/win.mp3')
};

// Volume levels
sounds.bounce.volume = 0.40;
sounds.score.volume  = 0.65;
sounds.win.volume    = 0.85;

// ──────────────────────────────────────────────────
//  COOLDOWN TRACKER  (prevents audio spam)
// ──────────────────────────────────────────────────
const lastPlayed = {};
const COOLDOWN_MS = {
  bounce: 90,
  score:  200,
  win:    500
};

// ──────────────────────────────────────────────────
//  PLAY SOUND
// ──────────────────────────────────────────────────
/**
 * Play a named sound with pitch randomization.
 * @param {string} name  - key in the sounds object
 */
function playSound(name) {
  const sound = sounds[name];
  if (!sound) return;

  const now      = Date.now();
  const cooldown = COOLDOWN_MS[name] || 100;
  if (lastPlayed[name] && now - lastPlayed[name] < cooldown) return;

  lastPlayed[name] = now;

  // Slightly random pitch for natural feel
  sound.currentTime  = 0;
  sound.playbackRate = 0.88 + Math.random() * 0.24;

  sound.play().catch(() => {
    // Browser autoplay blocked — silently ignore
  });
}

// ──────────────────────────────────────────────────
//  COMBO  (score + quick bounce echo)
// ──────────────────────────────────────────────────
function playScoreCombo() {
  playSound('score');
  setTimeout(() => playSound('bounce'), 85);
}

// ──────────────────────────────────────────────────
//  BACKGROUND MUSIC
// ──────────────────────────────────────────────────
const bgMusic    = new Audio('assets/sounds/bg.mp3');
bgMusic.loop     = true;
bgMusic.volume   = 0.28;
let musicStarted = false;

/**
 * Start background music on first user interaction.
 * Call this once from startGame / startLevel.
 */
function startMusic() {
  if (musicStarted) return;
  bgMusic.play().then(() => {
    musicStarted = true;
  }).catch(() => {
    // Autoplay blocked — attach one-time listener to start on click
    const unlock = () => {
      bgMusic.play().catch(() => {});
      musicStarted = true;
      document.removeEventListener('pointerdown', unlock);
    };
    document.addEventListener('pointerdown', unlock);
  });
}

/**
 * Stop and reset background music (e.g. on menu return).
 */
function stopMusic() {
  bgMusic.pause();
  bgMusic.currentTime = 0;
  musicStarted = false;
}

/**
 * Fade music out over `duration` ms.
 */
function fadeOutMusic(duration) {
  duration = duration || 800;
  const step     = bgMusic.volume / (duration / 50);
  const interval = setInterval(() => {
    if (bgMusic.volume > step) {
      bgMusic.volume -= step;
    } else {
      bgMusic.pause();
      bgMusic.volume  = 0.28;
      bgMusic.currentTime = 0;
      musicStarted    = false;
      clearInterval(interval);
    }
  }, 50);
}
