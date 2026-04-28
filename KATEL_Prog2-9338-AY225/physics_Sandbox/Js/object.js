class GameObject {
    constructor(x, y, size = 30) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocityY = 0;
        this.color = `hsl(${Math.random()*360},70%,60%)`;
        this.scored = false;
    }

    update() {
    // smoother gravity
    this.velocityY += GRAVITY * 0.98;
    this.y += this.velocityY;

    // basic ground collision (stable version)
    if (this.y + this.size > ground) {
        this.y = ground - this.size;
        this.velocityY *= -0.3;
    }
}

    draw(ctx) {
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(this.x+3, this.y+3, this.size, this.size);

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}