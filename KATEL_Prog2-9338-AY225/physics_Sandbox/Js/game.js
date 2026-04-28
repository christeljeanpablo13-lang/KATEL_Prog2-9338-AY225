let objects = [];
let particles = [];

let score = 0;
const TARGET_SCORE = 3;

const GRAVITY = 0.5;
const ground = window.innerHeight;

let gameState = "menu";

const goal = {
    x: 600,
    y: 400,
    width: 120,
    height: 20
};

function updateGame() {
    if (gameState !== "playing") return;

    objects.forEach(o => o.update());

    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => p.update());
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Goal
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

    objects.forEach(o => o.draw(ctx));
    particles.forEach(p => p.draw(ctx));

    // Drawing preview
    if (isDrawing && currentPath.length > 1) {
        ctx.beginPath();
        ctx.moveTo(currentPath[0].x, currentPath[0].y);

        for (let p of currentPath) {
            ctx.lineTo(p.x, p.y);
        }

        ctx.strokeStyle = "yellow";
        ctx.stroke();
    }
}