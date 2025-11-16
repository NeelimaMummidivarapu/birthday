// Loading screen remove
window.onload = function() {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 1500);
};

// Music play/pause button
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

// Fix autoplay on mobile
document.body.addEventListener("touchstart", () => {
    music.play();
}, { once: true });

btn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        btn.innerHTML = "⏸️";
    } else {
        music.pause();
        btn.innerHTML = "🎵";
    }
});

// Smooth reveal animation when scrolling
const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
    cards.forEach(card => {
        const top = card.getBoundingClientRect().top;
        if (top < window.innerHeight - 50) {
            card.classList.add("show");
        }
    });
});

// Falling hearts
setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💗";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 12 + 14) + "px";
    heart.style.animationDuration = (Math.random() * 3 + 2) + "s";

    document.querySelector(".hearts-container").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}, 300);
