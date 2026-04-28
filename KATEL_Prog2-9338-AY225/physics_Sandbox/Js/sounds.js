const sounds = {
    bounce: new Audio("assets/sounds/bounce.mp3"),
    score: new Audio("assets/sounds/score.mp3"),
    win: new Audio("assets/sounds/win.mp3"),
};

// volume control
sounds.bounce.volume = 0.4;
sounds.score.volume = 0.6;
sounds.win.volume = 0.8;

let lastPlayed = {};

// play sound
function playSound(name) {
    const sound = sounds[name];
    if (!sound) return;

    const now = Date.now();
    if (lastPlayed[name] && now - lastPlayed[name] < 100) return;

    lastPlayed[name] = now;

    sound.currentTime = 0;
    sound.playbackRate = 0.9 + Math.random() * 0.2;
    sound.play();
}

// combo sound
function playScoreCombo() {
    playSound("score");

    setTimeout(() => {
        playSound("bounce");
    }, 80);
}

// background music
const bgMusic = new Audio("assets/sounds/bg.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3;

function startMusic() {
    bgMusic.play().catch(() => {});
}