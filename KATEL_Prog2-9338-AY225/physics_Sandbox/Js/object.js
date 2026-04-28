class GameObject {
    constructor(x, y, size = 30) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocityY = 0;
        this.scored = false;
    }

    update() {
        this.velocityY += GRAVITY;
        this.y += this.velocityY;

        if (this.y + this.size > ground) {
            this.y = ground - this.size;
            this.velocityY *= -0.4;
        }

        // Goal
        if (!this.scored &&
            this.x < goal.x + goal.width &&
            this.x + this.size > goal.x &&
            this.y < goal.y + goal.height &&
            this.y + this.size > goal.y) {

            this.scored = true;
            score++;

            playScoreCombo(); // 🔊 upgraded sound

            spawnParticles(this.x, this.y);
            updateUI();

            if (score >= TARGET_SCORE) {
                gameState = "win";
                winScreen.style.display = "block";
                playSound("win");
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

class DrawnObject {
    constructor(points) {
        this.points = points;
        this.velocityY = 0;
    }

    update() {
        this.velocityY += GRAVITY * 0.5;

        for (let p of this.points) {
            p.y += this.velocityY;

            if (p.y > ground) {
                p.y = ground;
            }
        }

        this.velocityY *= 0.98;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let p of this.points) {
            ctx.lineTo(p.x, p.y);
        }

        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}