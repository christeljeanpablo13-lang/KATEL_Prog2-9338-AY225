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

    // ground collision
    if (this.y + this.size > ground) {
        this.y = ground - this.size;

        if (Math.abs(this.velocityY) > 1) {
            this.velocityY *= -0.35;
        } else {
            this.velocityY = 0;
        }
    }

    // 🎯 ADD THIS WHOLE BLOCK (goal + sound)
    if (!this.scored &&
        this.x < goal.x + goal.width &&
        this.x + this.size > goal.x &&
        this.y < goal.y + goal.height &&
        this.y + this.size > goal.y) {

        this.scored = true;
        score++;
        goal.glow = 15;

        spawnParticles(this.x, this.y);
        updateUI();

        playSound("score"); // 🔊 sound when scoring

        if (score >= TARGET_SCORE && gameState !== "win") {
            gameState = "win";
            winScreen.style.display = "block";

            playSound("win"); // 🔊 win sound
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
class DrawnObject {
    constructor(points) {
        this.points = points;
        this.velocityY = 0;
    }

    update() {
        this.velocityY += GRAVITY;

        for (let p of this.points) {
            p.y += this.velocityY;

            if (p.y > ground) {
                p.y = ground;
            }
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}