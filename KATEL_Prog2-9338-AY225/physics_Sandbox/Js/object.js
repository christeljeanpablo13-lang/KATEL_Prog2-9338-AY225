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
    this.velocityY += GRAVITY * 0.98;
    this.y += this.velocityY;

    if (this.y + this.size > ground) {
        this.y = ground - this.size;

        // improved bounce logic
        if (Math.abs(this.velocityY) > 1) {
            this.velocityY *= -0.35;
        } else {
            this.velocityY = 0;
        }
    }
}

    draw(ctx) {
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(this.x+3, this.y+3, this.size, this.size);

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}