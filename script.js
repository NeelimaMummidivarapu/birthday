// ---------------- Slideshow with messages ----------------
const slideImages = [
  "images/pic1.jpg","images/pic2.jpg","images/pic3.jpg",
  "images/pic4.jpg","images/pic5.jpg","images/pic6.jpg",
  "images/pic7.jpg","images/pic8.jpg","images/pic9.jpg","images/pic10.jpg"
];

const slideMessages = [
  "First memory ❤️","Best smile 😊","Crazy fun times 🎉",
  "Cute pose 😍","Another amazing day 💖","Love this pic 💓",
  "Remember this moment 💕","Epic adventure 🕷️","Smiling always 😄",
  "Happy Birthday again! 🎂"
];

let slideIndex = 0;
const container = document.querySelector('.slideshow-container');

// Create slides dynamically
for (let i = 0; i < slideImages.length; i++) {
  const slideDiv = document.createElement('div');
  slideDiv.className = 'slide';

  const img = document.createElement('img');
  img.src = slideImages[i];
  img.style.width = '100%';
  img.style.borderRadius = '15px';
  slideDiv.appendChild(img);

  const msg = document.createElement('div');
  msg.className = 'slide-message';
  msg.textContent = slideMessages[i];
  slideDiv.appendChild(msg);

  container.appendChild(slideDiv);
}

// Show slides
function showSlides() {
  const slides = document.getElementsByClassName('slide');
  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 4000); // 4 seconds per slide
}
showSlides();

// ---------------- Gift box ----------------
function openGift() {
  const msg = document.querySelector('.gift-message');
  msg.style.display = (msg.style.display === 'block') ? 'none' : 'block';
}

// ---------------- Hold to reveal ----------------
const holdMessage = document.querySelector('.hold-message');
holdMessage.addEventListener('mousedown', () => {
  holdMessage.querySelector('.hidden-text').style.display = 'block';
});
holdMessage.addEventListener('mouseup', () => {
  holdMessage.querySelector('.hidden-text').style.display = 'none';
});

// ---------------- Typewriter ----------------
const typewriterText = "Wishing you a day full of love, fun, and Spiderman adventures! 💖🕷️";
let i = 0;
function typeWriter() {
  if (i < typewriterText.length) {
    document.getElementById("typewriter-text").innerHTML += typewriterText.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// ---------------- Stars & Bubbles ----------------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for(let i=0;i<100;i++){
  stars.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2,
    d: Math.random()*1
  });
}

function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<stars.length;i++){
    ctx.beginPath();
    ctx.arc(stars[i].x,stars[i].y,stars[i].r,0,Math.PI*2);
    ctx.fillStyle = "rgba(255,200,255,0.8)";
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
drawStars();

// ---------------- Continuous background music ----------------
const audio = document.getElementById("bg-music");
audio.volume = 0.4; // optional: reduce volume
audio.play();
