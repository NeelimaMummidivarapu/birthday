// LOADER
window.onload = () => {
    setTimeout(() => {
        document.getElementById("loader").style.top = "-100%";
    }, 1500);
};

// MUSIC BUTTON
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

btn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        btn.textContent = "Pause Music ♡";
    } else {
        music.pause();
        btn.textContent = "Play Music ♡";
    }
});

// FALLING HEARTS
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (3 + Math.random() * 3) + "s";
    heart.innerHTML = "💖";
    document.querySelector(".hearts-container").appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// FINAL MESSAGE SHOW WHEN SCROLLED TO END
window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY + window.innerHeight;
    let pageHeight = document.body.offsetHeight;

    if (scrollTop >= pageHeight - 10) {
        document.getElementById("finalMessage").style.top = "0";
    }
});
