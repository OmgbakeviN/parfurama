// ==================== GLOBALS ====================
let sliderIntervals = {}; // Pour stocker les intervalles des sliders

// ==================== MENU MOBILE ====================
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuBtn.innerHTML = mobileMenu.classList.contains('hidden') 
      ? '<i class="fas fa-bars"></i>' 
      : '<i class="fas fa-times"></i>';
  });
}

// ==================== DIAPORAMA PRINCIPAL ====================
function initMainSlider() {
  let currentSlide = 1;
  const totalSlides = 3;
  
  function showSlide(n) {
    // Masquer toutes les slides
    for (let i = 1; i <= totalSlides; i++) {
      const slide = document.getElementById(`slide${i}`);
      if (slide) {
        slide.classList.toggle('opacity-100', i === n);
        slide.classList.toggle('opacity-0', i !== n);
      }
      document.querySelectorAll(`.slide-dot[data-slide="${i}"]`).forEach(dot => {
        dot.classList.toggle('active', i === n);
      });
    }
    currentSlide = n;
  }
  
  // Navigation
  document.querySelectorAll('.slide-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.getAttribute('data-slide')));
    });
  });

  // Auto-défilement
  const interval = setInterval(() => {
    currentSlide = currentSlide % totalSlides + 1;
    showSlide(currentSlide);
  }, 5000);

  return interval;
}

// ==================== SLIDER PARFUMS ====================
function initParfumSlider() {
  const slider = document.getElementById('parfum-slider');
  if (!slider) return;

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;
  const slideCount = 5;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
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

  // Contrôles
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      currentIndex = parseInt(indicator.getAttribute('data-slide'));
      updateSlider();
    });
  });

  return setInterval(nextSlide, 5000);
}

// ==================== FORMULAIRE WHATSAPP ====================
function initWhatsAppForm() {
  const form = document.getElementById('rdvForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name')?.value || '',
      phone: document.getElementById('phone')?.value || '',
      date: document.getElementById('date')?.value || '',
      message: document.getElementById('message')?.value || 'Non spécifié'
    };
    
    const whatsappText = `Nouvelle demande de RDV%0A%0A` +
                       `*Nom:* ${formData.name}%0A` +
                       `*Téléphone:* ${formData.phone}%0A` +
                       `*Date souhaitée:* ${formData.date}%0A` +
                       `*Message:* ${formData.message}`;
    
    window.open(`https://wa.me/237620872728?text=${whatsappText}`, '_blank');
  });
}

// ==================== CATALOGUE PAR CREATEUR ====================
function initCreatorSliders() {
  // Filtrage
  document.querySelectorAll('.creator-filter').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.creator-filter').forEach(b => {
        b.classList.toggle('active-creator', b === this);
      });
      
      const creator = this.dataset.creator;
      document.querySelectorAll('.creator-section').forEach(section => {
        section.style.display = creator === 'all' || section.dataset.creator === creator 
          ? 'block' 
          : 'none';
      });
    });
  });

  // Initialisation des sliders
  const creators = ['dior', 'chanel', 'guerlain', 'armani','givenchy','lattafa','montale','paco','jean','victoria','lancome','burberry','narciso']; // Ajoutez d'autres
  
  creators.forEach(creator => {
    const slider = document.getElementById(`${creator}-slider`);
    if (!slider) return;

    // Navigation
    document.querySelector(`.slider-prev[data-creator="${creator}"]`)?.addEventListener('click', () => {
      slider.scrollBy({ left: -slider.offsetWidth, behavior: 'smooth' });
    });

    document.querySelector(`.slider-next[data-creator="${creator}"]`)?.addEventListener('click', () => {
      slider.scrollBy({ left: slider.offsetWidth, behavior: 'smooth' });
    });

    // Auto-slide
    sliderIntervals[creator] = setInterval(() => {
      const nextPos = slider.scrollLeft + slider.offsetWidth;
      slider.scrollTo({
        left: nextPos >= slider.scrollWidth ? 0 : nextPos,
        behavior: 'smooth'
      });
    }, 5000);

    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(sliderIntervals[creator]));
    slider.addEventListener('mouseleave', () => {
      sliderIntervals[creator] = setInterval(() => {
        const nextPos = slider.scrollLeft + slider.offsetWidth;
        slider.scrollTo({
          left: nextPos >= slider.scrollWidth ? 0 : nextPos,
          behavior: 'smooth'
        });
      }, 5000);
    });
  });

  // Barre de recherche
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const term = this.value.toLowerCase();
      document.querySelectorAll('.parfum-card').forEach(card => {
        const match = card.textContent.toLowerCase().includes(term);
        card.style.display = match ? 'flex' : 'none';
        card.closest('.slider-item')?.style.setProperty('display', match ? 'block' : 'none');
      });
    });
  }
}

// ==================== INITIALISATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initWhatsAppForm();
  
  // Sliders
  sliderIntervals.main = initMainSlider();
  sliderIntervals.parfum = initParfumSlider();
  initCreatorSliders();
});

// Nettoyage des intervalles si nécessaire
window.addEventListener('beforeunload', () => {
  Object.values(sliderIntervals).forEach(interval => clearInterval(interval));
});