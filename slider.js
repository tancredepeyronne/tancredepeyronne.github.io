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

function nextSlide() {
  index = (index + 1) % slideWidths.length;
  updateSlider();
}

// Fonction pour démarrer le slider **après que toutes les images soient chargées**
function startSlider() {
  measureSlides();
  updateSlider();
  setInterval(nextSlide, 2000);
}

// On attend que toutes les images du slider soient chargées
const images = slideElements.map(slide => slide.querySelector('img'));
let loadedCount = 0;

images.forEach(img => {
  if (img.complete) {
    loadedCount++;
  } else {
    img.addEventListener('load', () => {
      loadedCount++;
      if (loadedCount === images.length) startSlider();
    });
  }
});

// Si toutes les images sont déjà chargées (cache), on démarre immédiatement
if (loadedCount === images.length) startSlider();

// Re-mesure si la fenêtre change de taille
window.addEventListener('resize', () => {
  measureSlides();
  updateSlider();
});


const btnTop = document.querySelector('.btn-top');

btnTop.addEventListener('click', function(e) {
    e.preventDefault(); // empêche le jump par défaut
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // scroll fluide
    });
});
