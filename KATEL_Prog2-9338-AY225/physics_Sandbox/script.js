/*
  =====================================================
  🎮 Physics Sandbox — World of Goo × Crayon Physics
  📁 script.js
  📌 Description:
    Main controller — canvas sizing, input handling
    (mouse + touch), tool logic, draw preview, flow
    control (start / reset / win / menu / next level),
    and HUD updates.

    Depends on (loaded before this):
      js/game.js    → canvas, ctx, W, H, resizeCanvas,
                      setupLevel, loop, objects,
                      gooObjects, particles, platforms,
                      goal, score, cameraShake, frameCount
      js/object.js  → GooBall, DrawnShape, nextCrayonColor
      js/effects.js → Particle, spawnParticles, spawnCelebration
      js/sound.js   → playSound, startMusic, stopMusic, fadeOutMusic
  =====================================================
*/

// ──────────────────────────────────────────────────
//  DOM REFERENCES
// ──────────────────────────────────────────────────
const menu       = document.getElementById('menu');
const uiBar      = document.getElementById('uiBar');
const winScreen  = document.getElementById('winScreen');
const winSub     = document.getElementById('winSub');
const scoreText  = document.getElementById('scoreText');
const targetText = document.getElementById('targetText');
const cursorDot  = document.getElementById('cursorDot');

// ──────────────────────────────────────────────────
//  INPUT STATE
// ──────────────────────────────────────────────────
let activeTool  = 'draw';
let isDrawing   = false;
let drawPath    = [];
let drawColor   = CRAYON_COLORS[0];

// ──────────────────────────────────────────────────
//  RESIZE
// ──────────────────────────────────────────────────
window.addEventListener('resize', () => {
  resizeCanvas();
  if (gameState === 'playing') setupLevel(currentLevel);
});

// ──────────────────────────────────────────────────
//  CURSOR DOT TRACKING
// ──────────────────────────────────────────────────
document.addEventListener('mousemove', e => {
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top  = e.clientY + 'px';
});

// ──────────────────────────────────────────────────
//  GET POINTER POSITION (mouse or touch)
// ──────────────────────────────────────────────────
function getPos(e) {
  const src = e.touches ? e.touches[0] : e;
  const r   = canvas.getBoundingClientRect();
  return {
    x: src.clientX - r.left,
    y: src.clientY - r.top
  };
}

// ──────────────────────────────────────────────────
//  CANVAS INPUT EVENTS
// ──────────────────────────────────────────────────
canvas.addEventListener('mousedown',  onPointerDown);
canvas.addEventListener('touchstart', e => { e.preventDefault(); onPointerDown(e); }, { passive: false });

canvas.addEventListener('mousemove',  onPointerMove);
canvas.addEventListener('touchmove',  e => { e.preventDefault(); onPointerMove(e); }, { passive: false });

canvas.addEventListener('mouseup',    onPointerUp);
canvas.addEventListener('touchend',   e => { e.preventDefault(); onPointerUp(e); }, { passive: false });

// ──────────────────────────────────────────────────
//  POINTER DOWN
// ──────────────────────────────────────────────────
function onPointerDown(e) {
  if (gameState !== 'playing') return;
  const pos = getPos(e);

  switch (activeTool) {

    case 'draw':
      isDrawing  = true;
      drawPath   = [{ x: pos.x, y: pos.y }];
      drawColor  = nextCrayonColor();
      break;

    case 'goo':
      if (gooObjects.length < MAX_OBJECTS) {
        const g  = new GooBall(pos.x, pos.y - 5);
        g.vy     = -2.5 + Math.random() * 1.5;
        g.vx     = (Math.random() - 0.5) * 3;
        gooObjects.push(g);
        playSound('bounce');
      }
      break;

    case 'chain':
      // Drop a cluster of 3 connected goo balls
      if (gooObjects.length < MAX_OBJECTS - 3) {
        for (let i = 0; i < 3; i++) {
          const g  = new GooBall(
            pos.x + (Math.random() - 0.5) * 28,
            pos.y  + (Math.random() - 0.5) * 28 - 8
          );
          g.vy     = -1.5 + Math.random();
          g.vx     = (Math.random() - 0.5) * 2.5;
          gooObjects.push(g);
        }
        playSound('bounce');
      }
      break;

    case 'erase':
      eraseAt(pos.x, pos.y);
      break;
  }
}

// ──────────────────────────────────────────────────
//  POINTER MOVE
// ──────────────────────────────────────────────────
function onPointerMove(e) {
  if (!isDrawing || activeTool !== 'draw') return;
  const pos  = getPos(e);
  const last = drawPath[drawPath.length - 1];
  const dx   = pos.x - last.x;
  const dy   = pos.y - last.y;
  // Only add point if moved enough (avoids dense overlapping points)
  if (dx * dx + dy * dy > 9) {
    drawPath.push({ x: pos.x, y: pos.y });
  }
}

// ──────────────────────────────────────────────────
//  POINTER UP
// ──────────────────────────────────────────────────
function onPointerUp(e) {
  if (!isDrawing) return;
  isDrawing = false;
  if (drawPath.length > 3 && objects.length < MAX_OBJECTS) {
    objects.push(new DrawnShape(drawPath, drawColor));
    playSound('bounce');
  }
  drawPath = [];
}

// ──────────────────────────────────────────────────
//  DRAW PREVIEW  (called from game.js drawGame)
// ──────────────────────────────────────────────────
function drawPreview() {
  if (!isDrawing || drawPath.length < 2) return;

  ctx.save();
  ctx.lineCap    = 'round';
  ctx.lineJoin   = 'round';
  ctx.globalAlpha = 0.65;

  // Crayon-style preview (two layers)
  ctx.beginPath();
  ctx.moveTo(drawPath[0].x, drawPath[0].y);
  for (const p of drawPath) ctx.lineTo(p.x, p.y);
  ctx.strokeStyle = drawColor;
  ctx.lineWidth   = 7;
  ctx.stroke();

  ctx.globalAlpha = 0.25;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth   = 3;
  ctx.stroke();

  ctx.restore();
}

// ──────────────────────────────────────────────────
//  ERASE
// ──────────────────────────────────────────────────
function eraseAt(x, y) {
  const R = 44; // erase radius

  gooObjects = gooObjects.filter(g => {
    const hit = Math.hypot(g.x - x, g.y - y) < R;
    if (hit) spawnParticles(g.x, g.y, `hsl(${g.hue},80%,55%)`, 6);
    return !hit;
  });

  objects = objects.filter(s => {
    const b  = s.getBounds();
    const cx = (b.minX + b.maxX) / 2;
    const cy = (b.minY + b.maxY) / 2;
    return Math.hypot(cx - x, cy - y) > R;
  });
}

// ──────────────────────────────────────────────────
//  TOOL SELECTION
// ──────────────────────────────────────────────────
function setTool(tool) {
  activeTool = tool;

  // Update button states
  document.querySelectorAll('.tool-btn[id^="tool-"]').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById('tool-' + tool);
  if (activeBtn) activeBtn.classList.add('active');

  // Update cursor style
  cursorDot.className = tool === 'erase' ? 'erase' :
                        tool === 'goo'   ? 'goo'   : '';
}

// ──────────────────────────────────────────────────
//  START LEVEL
// ──────────────────────────────────────────────────
function startLevel(idx) {
  currentLevel = idx;

  // Ensure canvas is sized
  resizeCanvas();
  setupLevel(idx);

  // Clear game objects
  objects    = [];
  gooObjects = [];
  particles  = [];
  score      = 0;

  // Update HUD
  scoreText.textContent  = '0';
  targetText.textContent = TARGET_SCORE;

  // Game state
  gameState = 'playing';

  // Show/hide elements
  menu.style.display      = 'none';
  canvas.style.display    = 'block';
  uiBar.style.display     = 'flex';
  winScreen.style.display = 'none';
  cursorDot.style.display = 'block';

  // Reset tool
  setTool('draw');

  // Background dots
  initBgDots();

  // Audio
  startMusic();

  // Start the loop if not already running
  startLoop();
}

// ──────────────────────────────────────────────────
//  RESET (same level)
// ──────────────────────────────────────────────────
function doReset() {
  objects    = [];
  gooObjects = [];
  particles  = [];
  score      = 0;
  scoreText.textContent = '0';
  winScreen.style.display = 'none';
  gameState = 'playing';
  setupLevel(currentLevel);
  initBgDots();
}

// ──────────────────────────────────────────────────
//  WIN
// ──────────────────────────────────────────────────
function showWin() {
  gameState = 'win';
  winScreen.style.display = 'flex';

  // Big celebration burst
  spawnCelebration(W / 2, H / 2);

  // Level-specific win message
  const msgs = [
    'Amazing! All goo balls in the goal!',
    'Bridge conquered! Perfect balance!',
    'Tower climber! Physics master!'
  ];
  winSub.textContent = msgs[currentLevel] || 'All goo balls in the goal!';

  playSound('win');
}

// ──────────────────────────────────────────────────
//  NEXT LEVEL
// ──────────────────────────────────────────────────
function nextLevel() {
  const next = (currentLevel + 1) % LEVELS.length;
  startLevel(next);
}

// ──────────────────────────────────────────────────
//  SHOW MENU
// ──────────────────────────────────────────────────
function showMenu() {
  gameState = 'menu';
  menu.style.display      = 'flex';
  uiBar.style.display     = 'none';
  winScreen.style.display = 'none';
  cursorDot.style.display = 'none';
  canvas.style.display    = 'none';
  fadeOutMusic(600);
}

// ──────────────────────────────────────────────────
//  INIT — start idle loop (for menu bg, if needed)
// ──────────────────────────────────────────────────
resizeCanvas();
