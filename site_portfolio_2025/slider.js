const slider = document.querySelector('.slider-auto');
const slides = document.querySelector('.slides');
const slideElements = Array.from(document.querySelectorAll('.slide'));

let index = 0;
let slideWidths = [];

// Mesure la largeur réelle de chaque slide
function measureSlides() {
  slideWidths = slideElements.map(slide => slide.offsetWidth);
}

// Calcule l’offset exact pour aller à la slide n°
function getOffset(i) {
  return slideWidths.slice(0, i).reduce((a, b) => a + b, 0);
}

function updateSlider() {
  measureSlides(); // Mise à jour des tailles à chaque resize/load
  const offset = getOffset(index);
  slides.style.transform = `translateX(-${offset}px)`;
}

function nextSlide() {
  index = (index + 1) % slideWidths.length;
  updateSlider();
}

window.addEventListener('resize', updateSlider);
window.addEventListener('load', updateSlider);

setInterval(nextSlide, 2000);
