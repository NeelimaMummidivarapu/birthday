// Play background music on first touch (for mobile)
document.addEventListener("click", () => {
    let music = document.getElementById("bgMusic");
    music.play().catch(() => {});
});
