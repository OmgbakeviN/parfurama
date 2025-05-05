// Gestion du menu mobile
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuBtn.innerHTML = mobileMenu.classList.contains('hidden') 
        ? '<i class="fas fa-bars"></i>' 
        : '<i class="fas fa-times"></i>';
});


// diapo script
let currentSlide = 1;
  const totalSlides = 3;
  
  function showSlide(n) {
    // Masquer toutes les slides
    for (let i = 1; i <= totalSlides; i++) {
      document.getElementById(`slide${i}`).classList.remove('opacity-100');
      document.getElementById(`slide${i}`).classList.add('opacity-0');
      document.querySelector(`.slide-dot[data-slide="${i}"]`).classList.remove('active');
    }
    
    // Afficher la slide sélectionnée
    document.getElementById(`slide${n}`).classList.remove('opacity-0');
    document.getElementById(`slide${n}`).classList.add('opacity-100');
    document.querySelector(`.slide-dot[data-slide="${n}"]`).classList.add('active');
    currentSlide = n;
  }
  
  // Auto-défilement
  setInterval(() => {
    currentSlide = currentSlide % totalSlides + 1;
    showSlide(currentSlide);
  }, 5000);
  
  // Clic sur les points
  document.querySelectorAll('.slide-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.getAttribute('data-slide')));
    });
  });