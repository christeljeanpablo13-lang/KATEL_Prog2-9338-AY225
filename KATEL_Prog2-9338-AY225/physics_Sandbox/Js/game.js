/*
  =====================================================
  🎮 Physics Sandbox — World of Goo × Crayon Physics
  📁 js/game.js
  📌 Description:
    Core game state, level definitions, physics config,
    platform & goal setup, game loop, and rendering.
  =====================================================
*/

// ──────────────────────────────────────────────────
//  CANVAS & CONTEXT
// ──────────────────────────────────────────────────
const canvas  = document.getElementById('gameCanvas');
const ctx     = canvas.getContext('2d');

let W = 0;
let H = 0;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

// ──────────────────────────────────────────────────
//  PHYSICS CONFIG
// ──────────────────────────────────────────────────
const GRAVITY         = 0.38;
const FRICTION        = 0.88;
const BOUNCE          = 0.38;
const GOO_RADIUS      = 16;
const GOO_CONNECT_DIST = 80;
const MAX_OBJECTS     = 60;

// ──────────────────────────────────────────────────
//  GAME STATE
// ──────────────────────────────────────────────────
let gameState    = 'menu';   // 'menu' | 'playing' | 'win'
let currentLevel = 0;
let score        = 0;
let TARGET_SCORE = 3;

let objects      = [];   // DrawnShape[]
let gooObjects   = [];   // GooBall[]
let particles    = [];   // Particle[]
let platforms    = [];   // resolved platform objects
let goal         = {};   // { x, y, w, h }

let frameCount        = 0;
let cameraShake       = 0;
let goalParticleTimer = 0;
let bgDots            = [];

// ──────────────────────────────────────────────────
//  LEVEL DEFINITIONS
// ──────────────────────────────────────────────────
const LEVELS = [
  {
    name:      'Simple Drop',
    bgColor:   '#f5ecd7',
    goalX:     0.50,
    goalY:     0.70,
    goalW:     110,
    goalH:     18,
    platforms: [],
    target:    3
  },
  {
    name:      'The Bridge',
    bgColor:   '#eaf0e4',
    goalX:     0.78,
    goalY:     0.72,
    goalW:     96,
    goalH:     18,
    platforms: [
      { rx: 0.22, ry: 0.55, rw: 0.18, rh: 0.022, color: '#a07040' },
      { rx: 0.55, ry: 0.65, rw: 0.18, rh: 0.022, color: '#a07040' }
    ],
    target: 3
  },
  {
    name:      'The Tower',
    bgColor:   '#e8f0f5',
    goalX:     0.50,
    goalY:     0.18,
    goalW:     86,
    goalH:     16,
    platforms: [
      { rx: 0.18, ry: 0.78, rw: 0.24, rh: 0.022, color: '#8a6040' },
      { rx: 0.60, ry: 0.78, rw: 0.24, rh: 0.022, color: '#8a6040' },
      { rx: 0.34, ry: 0.57, rw: 0.32, rh: 0.022, color: '#7a5030' }
    ],
    target: 3
  }
];

// ──────────────────────────────────────────────────
//  SETUP LEVEL
// ──────────────────────────────────────────────────
function setupLevel(idx) {
  const lv = LEVELS[idx];

  // Resolve platform percentages to pixels
  platforms = (lv.platforms || []).map(p => ({
    x:     p.rx * W,
    y:     p.ry * H,
    w:     p.rw * W,
    h:     Math.max(10, p.rh * H),
    color: p.color || '#a07040'
  }));

  // Resolve goal
  goal = {
    x: lv.goalX * W - lv.goalW / 2,
    y: lv.goalY * H,
    w: lv.goalW,
    h: lv.goalH
  };

  TARGET_SCORE = lv.target || 3;
  document.getElementById('targetText').textContent = TARGET_SCORE;
}

// ──────────────────────────────────────────────────
//  BACKGROUND DOTS (decorative)
// ──────────────────────────────────────────────────
function initBgDots() {
  const colors = ['#f4b942','#5dade2','#58d68d','#e74c3c','#a569bd','#f39c12','#1abc9c'];
  bgDots = [];
  for (let i = 0; i < 28; i++) {
    bgDots.push({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     2 + Math.random() * 3.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      phase: Math.random() * Math.PI * 2
    });
  }
}

// ──────────────────────────────────────────────────
//  UPDATE
// ──────────────────────────────────────────────────
function updateGame() {
  if (gameState !== 'playing') return;

  // Update drawn shapes
  for (const obj of objects) obj.update();

  // Update goo balls
  for (const g of gooObjects) g.update();

  // Update & cull particles
  particles = particles.filter(p => p.life > 0);
  for (const p of particles) p.update();

  // Goal ambient particles
  goalParticleTimer++;
  if (goalParticleTimer % 20 === 0 && score < TARGET_SCORE) {
    particles.push(new Particle(
      goal.x + Math.random() * goal.w,
      goal.y,
      '#58d68d', 0, -2.2, 35
    ));
  }

  // Decay camera shake
  if (cameraShake > 0.2) cameraShake *= 0.84;
  else cameraShake = 0;
}

// ──────────────────────────────────────────────────
//  DRAW HELPERS
// ──────────────────────────────────────────────────
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);  ctx.arcTo(x + w, y,     x + w, y + r,     r);
  ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);  ctx.arcTo(x,     y + h, x,     y + h - r, r);
  ctx.lineTo(x, y + r);      ctx.arcTo(x,     y,     x + r, y,         r);
  ctx.closePath();
}

function drawGround() {
  // Main bar
  ctx.fillStyle = '#c8a46e';
  ctx.fillRect(0, H - 14, W, 14);
  // Top edge
  ctx.fillStyle = '#a07040';
  ctx.fillRect(0, H - 16, W, 4);
  // Stipple texture
  ctx.fillStyle = '#b8944e';
  for (let gx = 8; gx < W; gx += 20) {
    ctx.fillRect(gx, H - 12, 5, 6);
  }
}

function drawWalls() {
  ctx.fillStyle = '#c8a46e';
  ctx.fillRect(0, 0, 10, H);
  ctx.fillRect(W - 10, 0, 10, H);
  ctx.fillStyle = '#a07040';
  ctx.fillRect(8, 0, 3, H);
  ctx.fillRect(W - 11, 0, 3, H);
}

function drawPlatforms() {
  for (const p of platforms) {
    ctx.save();
    ctx.shadowColor  = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur   = 8;
    ctx.shadowOffsetY = 4;

    // Plank body
    roundRect(ctx, p.x, p.y, p.w, p.h, 5);
    ctx.fillStyle = p.color;
    ctx.fill();

    ctx.shadowBlur = 0;

    // Highlight top edge
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    roundRect(ctx, p.x + 2, p.y + 1, p.w - 4, 5, 2);
    ctx.fill();

    // Wood grain lines
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth   = 1;
    for (let gx = p.x + 14; gx < p.x + p.w - 6; gx += 24) {
      ctx.beginPath();
      ctx.moveTo(gx, p.y + 2);
      ctx.lineTo(gx, p.y + p.h - 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawGoal() {
  const t       = frameCount * 0.04;
  const pulse   = 1 + Math.sin(t) * 0.055;
  const cx      = goal.x + goal.w / 2;
  const cy      = goal.y + goal.h / 2;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(pulse, pulse);

  const hw = goal.w / 2;
  const hh = goal.h / 2;

  // Glow
  const grd = ctx.createRadialGradient(0, 0, 4, 0, 0, goal.w);
  grd.addColorStop(0, 'rgba(88,214,141,0.45)');
  grd.addColorStop(1, 'rgba(88,214,141,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(-hw - 24, -hh - 24, goal.w + 48, goal.h + 48);

  // Body
  roundRect(ctx, -hw, -hh, goal.w, goal.h, 8);
  ctx.fillStyle = score >= TARGET_SCORE ? '#2ecc71' : '#27ae60';
  ctx.fill();
  ctx.strokeStyle = '#1a8a45';
  ctx.lineWidth   = 2.5;
  ctx.stroke();

  // Score label
  ctx.fillStyle    = 'rgba(255,255,255,0.92)';
  ctx.font         = '13px "Schoolbell", cursive';
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${score}/${TARGET_SCORE}  ⭐`, 0, 0);

  // Animated down-arrows
  for (let a = 0; a < 3; a++) {
    const ay = -hh - 14 - a * 9 + Math.sin(t + a) * 4;
    ctx.globalAlpha = 0.5 + Math.sin(t + a * 1.3) * 0.3;
    ctx.fillText('▼', 0, ay);
  }
  ctx.restore();
}

function drawBgDots() {
  for (const d of bgDots) {
    d.phase += 0.025;
    const r = d.r * (0.8 + Math.sin(d.phase) * 0.2);
    ctx.save();
    ctx.globalAlpha = 0.17;
    ctx.beginPath();
    ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
    ctx.fillStyle = d.color;
    ctx.fill();
    ctx.restore();
  }
}

function drawGooStrands() {
  for (let i = 0; i < gooObjects.length; i++) {
    const ga = gooObjects[i];
    if (ga.scored) continue;
    for (let j = i + 1; j < gooObjects.length; j++) {
      const gb = gooObjects[j];
      if (gb.scored) continue;
      const dx   = gb.x - ga.x;
      const dy   = gb.y - ga.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < GOO_CONNECT_DIST) {
        const alpha = (1 - dist / GOO_CONNECT_DIST) * 0.45;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.lineWidth   = 4 * (1 - dist / GOO_CONNECT_DIST) + 1;
        ctx.strokeStyle = `hsl(${ga.hue},70%,40%)`;
        ctx.lineCap     = 'round';
        ctx.beginPath();
        ctx.moveTo(ga.x, ga.y);
        ctx.lineTo(gb.x, gb.y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

// ──────────────────────────────────────────────────
//  DRAW FRAME
// ──────────────────────────────────────────────────
function drawGame() {
  // Camera shake offset
  let sx = 0, sy = 0;
  if (cameraShake > 0.2) {
    sx = (Math.random() - 0.5) * cameraShake;
    sy = (Math.random() - 0.5) * cameraShake;
  }

  ctx.save();
  ctx.translate(sx, sy);

  // Background
  const lv = LEVELS[currentLevel];
  ctx.fillStyle = lv.bgColor || '#f5ecd7';
  ctx.fillRect(-Math.abs(sx) - 2, -Math.abs(sy) - 2, W + 20, H + 20);

  drawBgDots();
  drawWalls();
  drawGround();
  drawPlatforms();
  drawGoal();

  // Goo strands (drawn before balls so balls appear on top)
  drawGooStrands();

  // Drawn shapes
  for (const obj of objects) obj.draw(ctx);

  // Goo balls
  for (const g of gooObjects) g.draw(ctx);

  // Draw preview (from script.js)
  if (typeof drawPreview === 'function') drawPreview();

  // Particles
  for (const p of particles) p.draw(ctx);

  ctx.restore();
}

// ──────────────────────────────────────────────────
//  GAME LOOP
// ──────────────────────────────────────────────────
let animId = null;

function loop() {
  animId = requestAnimationFrame(loop);
  frameCount++;
  if (gameState === 'playing') updateGame();
  drawGame();
}

function startLoop() {
  if (!animId) loop();
}
