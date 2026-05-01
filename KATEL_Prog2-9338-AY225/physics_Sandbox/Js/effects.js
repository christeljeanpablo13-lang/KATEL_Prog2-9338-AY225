/*
  =====================================================
  🎮 Physics Sandbox — World of Goo × Crayon Physics
  📁 js/effects.js
  📌 Description:
    Particle class — confetti-style celebration particles
    with shapes (circles, stars, squares), gravity,
    rotation, and alpha fade.

    spawnParticles() — utility to burst many particles.
  =====================================================
*/

// ──────────────────────────────────────────────────
//  PARTICLE
// ──────────────────────────────────────────────────
class Particle {
  /**
   * @param {number} x       - spawn X
   * @param {number} y       - spawn Y
   * @param {string} color   - fill color (hex or hsl)
   * @param {number} [vx]    - horizontal velocity (default: random)
   * @param {number} [vy]    - vertical velocity (default: random upward)
   * @param {number} [life]  - lifespan in frames (default: 40)
   */
  constructor(x, y, color, vx, vy, life) {
    this.x    = x;
    this.y    = y;
    this.vx   = (vx !== undefined) ? vx : (Math.random() - 0.5) * 5.5;
    this.vy   = (vy !== undefined) ? vy : -Math.random() * 4.5 - 0.8;
    this.life    = life !== undefined ? life : 42;
    this.maxLife = this.life;
    this.r       = 3 + Math.random() * 4.5;
    this.color   = color || '#f4b942';

    // Random rotation for non-circle shapes
    this.rot  = Math.random() * Math.PI * 2;
    this.rotV = (Math.random() - 0.5) * 0.22;

    // Shape variety: 'circle', 'star', 'square'
    const shapes  = ['circle', 'circle', 'star', 'square'];
    this.shape    = shapes[Math.floor(Math.random() * shapes.length)];
  }

  update() {
    this.x   += this.vx;
    this.y   += this.vy;
    this.vy  += 0.16;   // gravity
    this.vx  *= 0.97;   // air friction
    this.rot += this.rotV;
    this.life--;
  }

  draw(ctx) {
    const alpha = Math.pow(this.life / this.maxLife, 1.2);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.fillStyle = this.color;

    switch (this.shape) {
      case 'star':
        drawStarShape(ctx, 0, 0, 4, this.r, this.r * 0.45);
        break;
      case 'square':
        ctx.fillRect(-this.r * 0.6, -this.r * 0.6, this.r * 1.2, this.r * 1.2);
        break;
      default: // circle
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
        ctx.fill();
        break;
    }

    ctx.restore();
  }
}

// ──────────────────────────────────────────────────
//  STAR SHAPE HELPER
// ──────────────────────────────────────────────────
function drawStarShape(ctx, cx, cy, spikes, outerR, innerR) {
  let rot  = -Math.PI / 2;
  const step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
  for (let i = 0; i < spikes; i++) {
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
  }
  ctx.closePath();
  ctx.fill();
}

// ──────────────────────────────────────────────────
//  SPAWN PARTICLES
// ──────────────────────────────────────────────────
/**
 * Burst multiple particles at (x, y).
 * @param {number} x
 * @param {number} y
 * @param {string} baseColor  - primary color
 * @param {number} [count]    - number of particles (default 12)
 */
function spawnParticles(x, y, baseColor, count) {
  count = count || 12;
  const palette = [
    baseColor,
    '#f4b942', '#5dade2', '#58d68d',
    '#e74c3c', '#a569bd', '#ff7675'
  ];
  for (let i = 0; i < count; i++) {
    const color = palette[Math.floor(Math.random() * palette.length)];
    particles.push(new Particle(x, y, color));
  }
}

/**
 * Big celebration burst (used on win / high score).
 */
function spawnCelebration(x, y) {
  spawnParticles(x, y, '#f4b942', 40);
  spawnParticles(x - 80, y - 60, '#58d68d', 20);
  spawnParticles(x + 80, y - 60, '#5dade2', 20);
}
