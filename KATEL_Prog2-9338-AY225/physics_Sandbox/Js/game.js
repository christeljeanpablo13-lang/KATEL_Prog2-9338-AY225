let objects = [];
let particles = [];

let score = 0;
const TARGET_SCORE = 3;

const GRAVITY = 0.5;
const ground = 500;

let gameState = "menu";

const goal = {
    x: 650,
    y: 450,
    width: 120,
    height: 20,
    glow: 0
};

function updateGame() {
    if (gameState !== "playing") return;

    objects.forEach(o => o.update());

    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => p.update());

    if (goal.glow > 0) goal.glow--;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 🌐 background grid (NEW)
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // 🎯 goal
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

    if (goal.glow > 0) {
        ctx.fillStyle = `rgba(34,197,94,${goal.glow / 20})`;
        ctx.fillRect(goal.x - 5, goal.y - 5, goal.width + 10, goal.height + 10);
    }

    objects.forEach(o => o.draw(ctx));
    particles.forEach(p => p.draw(ctx));
}

 