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

  //script u diapo
  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('parfum-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    const slideCount = 5; // Nombre total de slides

    // Auto-défilement
    let interval = setInterval(nextSlide, 5000);

    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Mettre à jour les indicateurs
      indicators.forEach((ind, index) => {
        ind.classList.toggle('active', index === currentIndex);
        ind.classList.toggle('bg-or/70', index === currentIndex);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlider();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSlider();
    }

    // Contrôles manuels
    nextBtn.addEventListener('click', () => {
      clearInterval(interval);
      nextSlide();
      interval = setInterval(nextSlide, 5000);
    });

    prevBtn.addEventListener('click', () => {
      clearInterval(interval);
      prevSlide();
      interval = setInterval(nextSlide, 5000);
    });

    // Navigation par indicateurs
    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = parseInt(indicator.getAttribute('data-slide'));
        updateSlider();
        interval = setInterval(nextSlide, 5000);
      });
    });
  });


  // whatsapp form
  document.getElementById('rdvForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const message = document.getElementById('message').value;
    
    const whatsappText = `Nouvelle demande de RDV%0A%0A` +
                         `*Nom:* ${name}%0A` +
                         `*Téléphone:* ${phone}%0A` +
                         `*Date souhaitée:* ${date}%0A` +
                         `*Message:* ${message || 'Non spécifié'}`;
    
    window.open(`https://wa.me/237620872728?text=${whatsappText}`, '_blank');
  });