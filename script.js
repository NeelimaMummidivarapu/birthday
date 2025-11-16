// ---------------- Slideshow ----------------
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
  slideDiv.appendChild(img);

  const msg = document.createElement('div');
  msg.className = 'slide-message';
  msg.textContent = slideMessages[i];
  slideDiv.appendChild(msg);

  container.appendChild(slideDiv);
}

// Show slides one by one
function showSlides() {
  const slides = document.getElementsByClassName('slide');
  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 4000); // 4 seconds per slide
}
showSlides();

// ---------------- Typewriter ----------------
const typewriterText = "Wishing you a day full of love, fun, and happiness! 💖";
let i = 0;
function typeWriter() {
  if (i < typewriterText.length) {
    document.getElementById("typewriter-text").innerHTML += typewriterText.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// ---------------- Background music ----------------
const audio = document.getElementById("bg-music");
audio.volume = 0.4;
audio.play();
