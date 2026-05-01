/*
  =====================================================
  🎮 Physics Sandbox — World of Goo × Crayon Physics
  📁 js/object.js
  📌 Description:
    GooBall class — animated World of Goo-style physics
    object with eyes, wobble, squish, and strand logic.

    DrawnShape class — Crayon Physics-style freehand
    drawn objects with multi-layer crayon texture and
    simple physics (gravity, bounce, platform collision).
  =====================================================
*/

// ──────────────────────────────────────────────────
//  GOO BALL
// ──────────────────────────────────────────────────
class GooBall {
  constructor(x, y) {
    this.x  = x;
    this.y  = y;
    this.r  = GOO_RADIUS;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = -1 + Math.random() * 2;

    this.scored    = false;
    this.onGround  = false;
    this.age       = 0;

    // Visual
    this.hue      = 35 + Math.floor(Math.random() * 40);
    this.squishX  = 1;
    this.squishY  = 1;
    this.wobble   = 0;
    this.wobbleV  = 0;
    this.blobPhase = Math.random() * Math.PI * 2;

    // Eye tracking
    this.eyeX  = 0;
    this.eyeY  = 0;
  }

  update() {
    if (this.scored) return;
    this.age++;
    this.blobPhase += 0.04;

    // ─── Gravity & movement ───
    this.vy += GRAVITY;
    this.x  += this.vx;
    this.y  += this.vy;
    this.vx *= FRICTION;

    // ─── Ground ───
    const ground = H - 16;
    if (this.y + this.r > ground) {
      const impact = Math.abs(this.vy);
      if (!this.onGround && impact > 1.5) {
        this.squishX = 1 + impact * 0.045;
        this.squishY = 1 - impact * 0.045;
        spawnParticles(this.x, ground, `hsl(${this.hue},80%,55%)`, 5);
        cameraShake = Math.min(cameraShake + impact * 0.28, 9);
        playSound('bounce');
      }
      this.y        = ground - this.r;
      this.vy      *= -BOUNCE;
      this.vx      *= 0.82;
      this.onGround = true;
    } else {
      this.onGround = false;
    }

    // ─── Walls ───
    if (this.x - this.r < 10) {
      this.x   = 10 + this.r;
      this.vx *= -BOUNCE;
    }
    if (this.x + this.r > W - 10) {
      this.x   = W - 10 - this.r;
      this.vx *= -BOUNCE;
    }

    // ─── Platform collision ───
    for (const p of platforms) {
      const inX  = this.x > p.x && this.x < p.x + p.w;
      const atTop = this.y + this.r > p.y && this.y + this.r < p.y + p.h + 20 && this.vy > 0;
      if (inX && atTop) {
        this.y        = p.y - this.r;
        this.vy      *= -BOUNCE;
        this.vx      *= 0.78;
        this.onGround = true;
        const impact  = Math.abs(this.vy);
        if (impact > 1) {
          this.squishX = 1 + impact * 0.03;
          this.squishY = 1 - impact * 0.03;
          cameraShake = Math.min(cameraShake + impact * 0.18, 5);
          playSound('bounce');
        }
      }
    }

    // ─── Squish recovery ───
    this.squishX += (1 - this.squishX) * 0.14;
    this.squishY += (1 - this.squishY) * 0.14;

    // ─── Wobble ───
    this.wobbleV += (0 - this.wobble) * 0.14;
    this.wobbleV *= 0.84;
    if (Math.abs(this.vy) > 1.5) this.wobbleV += this.vy * 0.012;
    this.wobble  += this.wobbleV;

    // ─── Eye direction (looks toward goal) ───
    const dx     = (goal.x + goal.w / 2 - this.x) / 120;
    const dy     = (goal.y - this.y) / 120;
    this.eyeX   += (dx - this.eyeX) * 0.08;
    this.eyeY   += (dy - this.eyeY) * 0.08;

    // ─── Goal detection ───
    if (!this.scored &&
        this.x > goal.x       && this.x < goal.x + goal.w &&
        this.y > goal.y - this.r * 2 && this.y < goal.y + goal.h + this.r) {
      this.scored = true;
      score++;
      document.getElementById('scoreText').textContent = score;
      spawnParticles(this.x, this.y, '#58d68d', 22);
      cameraShake = 12;
      playSound('score');

      if (score >= TARGET_SCORE) {
        setTimeout(() => showWin(), 650);
      }
    }
  }

  draw(ctx) {
    if (this.scored) return;

    ctx.save();
    ctx.translate(this.x, this.y);

    // ─── Drop shadow ───
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.scale(1.1, 0.32);
    ctx.beginPath();
    ctx.arc(0, this.r + 8, this.r, 0, Math.PI * 2);
    ctx.fillStyle = '#3a1a00';
    ctx.fill();
    ctx.restore();

    // ─── Squish ───
    ctx.scale(this.squishX, this.squishY);

    const t  = this.blobPhase;
    const r  = this.r;

    // ─── Dark outline (goo skin) ───
    ctx.beginPath();
    for (let i = 0; i <= 36; i++) {
      const a    = (i / 36) * Math.PI * 2;
      const blob = (r + 3) * (1 + Math.sin(a * 3 + t * 1.8) * 0.09 + Math.sin(a * 5 + t * 1.3) * 0.04);
      const px   = Math.cos(a) * blob;
      const py   = Math.sin(a) * blob;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = `hsl(${this.hue},42%,22%)`;
    ctx.fill();

    // ─── Goo body ───
    ctx.beginPath();
    for (let i = 0; i <= 36; i++) {
      const a    = (i / 36) * Math.PI * 2;
      const blob = r * (1 + Math.sin(a * 3 + t * 1.8) * 0.09 + Math.sin(a * 5 + t * 1.3) * 0.04);
      const px   = Math.cos(a) * blob;
      const py   = Math.sin(a) * blob;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    const grad = ctx.createRadialGradient(-r * 0.28, -r * 0.38, r * 0.04, 0, 0, r);
    grad.addColorStop(0,   `hsl(${this.hue},95%,74%)`);
    grad.addColorStop(0.5, `hsl(${this.hue},85%,52%)`);
    grad.addColorStop(1,   `hsl(${this.hue},75%,30%)`);
    ctx.fillStyle = grad;
    ctx.fill();

    // ─── Eyes ───
    const eyeOff  = r * 0.30;
    const eyeR    = r * 0.26;
    const maxMove = eyeR * 0.45;
    const pu      = Math.max(-maxMove, Math.min(maxMove, this.eyeX * maxMove));
    const pv      = Math.max(-maxMove, Math.min(maxMove, this.eyeY * maxMove));

    for (const ex of [-eyeOff, eyeOff]) {
      const ey = -eyeOff * 0.5;
      // White
      ctx.beginPath();
      ctx.arc(ex, ey, eyeR, 0, Math.PI * 2);
      ctx.fillStyle   = 'white';
      ctx.fill();
      ctx.strokeStyle = `hsl(${this.hue},42%,22%)`;
      ctx.lineWidth   = 1.4;
      ctx.stroke();
      // Pupil
      ctx.beginPath();
      ctx.arc(ex + pu, ey + pv, eyeR * 0.48, 0, Math.PI * 2);
      ctx.fillStyle = '#120500';
      ctx.fill();
      // Highlight
      ctx.beginPath();
      ctx.arc(ex + pu + eyeR * 0.12, ey + pv - eyeR * 0.16, eyeR * 0.17, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.fill();
    }

    // ─── Body shine ───
    ctx.beginPath();
    ctx.arc(-r * 0.28, -r * 0.38, r * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.32)';
    ctx.fill();

    ctx.restore();
  }
}

// ──────────────────────────────────────────────────
//  DRAWN SHAPE  (Crayon Physics style)
// ──────────────────────────────────────────────────

// Cycling crayon color palette
const CRAYON_COLORS = [
  '#e74c3c','#e67e22','#f1c40f','#2ecc71','#3498db',
  '#9b59b6','#1abc9c','#e91e63','#795548','#607d8b'
];
let crayonColorIndex = 0;

function nextCrayonColor() {
  crayonColorIndex = (crayonColorIndex + 1) % CRAYON_COLORS.length;
  return CRAYON_COLORS[crayonColorIndex];
}

class DrawnShape {
  constructor(points, color) {
    // Deep copy
    this.points  = points.map(p => ({ x: p.x, y: p.y }));
    this.color   = color || CRAYON_COLORS[0];
    this.vy      = 0;
    this.vx      = 0;
    this.isStatic = false;
    this.age      = 0;
  }

  getBounds() {
    const xs = this.points.map(p => p.x);
    const ys = this.points.map(p => p.y);
    return {
      minX: Math.min(...xs), maxX: Math.max(...xs),
      minY: Math.min(...ys), maxY: Math.max(...ys)
    };
  }

  getCenterY() {
    return this.points.reduce((s, p) => s + p.y, 0) / this.points.length;
  }

  update() {
    this.age++;
    if (this.isStatic) return;

    // Gravity
    this.vy += GRAVITY * 0.38;
    this.vx *= FRICTION;

    for (const p of this.points) {
      p.y += this.vy;
      p.x += this.vx;
    }

    const b = this.getBounds();

    // ─── Ground ───
    const ground = H - 16;
    if (b.maxY > ground) {
      const diff = b.maxY - ground;
      for (const p of this.points) p.y -= diff;
      this.vy *= -BOUNCE * 0.45;
      this.vx *= 0.78;
      if (Math.abs(this.vy) < 0.6) {
        this.vy       = 0;
        this.isStatic = true;
      }
    }

    // ─── Platform collision ───
    for (const pl of platforms) {
      const inX   = b.maxX > pl.x && b.minX < pl.x + pl.w;
      const atTop = b.maxY > pl.y && b.minY < pl.y - 5 && this.vy > 0;
      if (inX && atTop) {
        const diff = b.maxY - pl.y;
        for (const p of this.points) p.y -= diff;
        this.vy *= -BOUNCE * 0.38;
        if (Math.abs(this.vy) < 0.5) {
          this.vy       = 0;
          this.isStatic = true;
        }
      }
    }
  }

  draw(ctx) {
    if (this.points.length < 2) return;

    ctx.save();
    ctx.lineCap  = 'round';
    ctx.lineJoin = 'round';

    // Drop shadow
    ctx.save();
    ctx.globalAlpha = 0.11;
    ctx.beginPath();
    ctx.moveTo(this.points[0].x + 4, this.points[0].y + 4);
    for (const p of this.points) ctx.lineTo(p.x + 4, p.y + 4);
    ctx.strokeStyle = '#3a1a00';
    ctx.lineWidth   = 9;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();

    // Crayon — 3 layer texture
    const layerData = [
      { jitter: 0,    width: 7,   alpha: 1.0,  color: this.color },
      { jitter: 1.4,  width: 4.5, alpha: 0.55, color: this.color },
      { jitter: -1.2, width: 2.5, alpha: 0.18, color: '#ffffff'  }
    ];

    for (const layer of layerData) {
      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x + layer.jitter, this.points[i].y + layer.jitter);
      }
      ctx.strokeStyle = layer.color;
      ctx.lineWidth   = layer.width;
      ctx.globalAlpha = layer.alpha;
      ctx.stroke();
    }

    ctx.restore();
  }
}

