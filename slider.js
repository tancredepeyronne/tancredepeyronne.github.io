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
  const offset = getOffset(index);
  slides.style.transform = `translateX(-${offset}px)`;
}

// Passe à la slide suivante
function nextSlide() {
  index = (index + 1) % slideWidths.length;
  updateSlider();
}

// Mesure initiale dès que le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  measureSlides();
  updateSlider();
  setInterval(nextSlide, 2000);
});

// Re-mesure les slides quand la fenêtre change de taille
window.addEventListener('resize', () => {
  measureSlides();
  updateSlider();
});

// Ajuste la largeur si les images change
