class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random()-0.5)*4;
        this.vy = (Math.random()-1)*4;
        this.life = 30;
    }

    update() {
    this.x += this.vx * 0.95;
    this.y += this.vy * 0.95;
    this.vy += 0.1; // gravity effect
    this.life--;
}

    draw(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, 3, 3);
    }
}

function spawnParticles(x, y) {
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(x, y));
    }
}