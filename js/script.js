
const IMAGE_COUNT = 10;

class GalleryLightbox {
  constructor() {
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = document.getElementById('lightbox-image');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.closeButton = document.getElementById('lightbox-close');
    this.prevButton = document.getElementById('lightbox-prev');
    this.nextButton = document.getElementById('lightbox-next');
    this.galleryGrid = document.getElementById('gallery-grid');
    this.currentIndex = 0;

    this.attachEvents();
  }

  attachEvents() {
    this.galleryGrid.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (!img) return;
      const idx = Number(img.dataset.index);
      this.open(idx);
    });

    this.closeButton.addEventListener('click', () => this.close());
    this.prevButton.addEventListener('click', () => this.prev());
    this.nextButton.addEventListener('click', () => this.next());

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (this.lightbox.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      }
    });
  }

  open(index) {
    this.currentIndex = index;
    const imageEl = this.galleryGrid.querySelector(`img[data-index="${index}"]`);
    if (!imageEl) return;
    this.lightboxImage.src = imageEl.src;
    this.lightboxImage.alt = imageEl.alt;
    this.lightboxCaption.textContent = imageEl.alt;
    this.lightbox.setAttribute('aria-hidden', 'false');
    this.lightbox.style.display = 'flex';
  }

  close() {
    this.lightbox.setAttribute('aria-hidden', 'true');
    this.lightboxImage.src = '';
    this.lightbox.style.display = 'none';
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + IMAGE_COUNT) % IMAGE_COUNT;
    this.updateImage();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % IMAGE_COUNT;
    this.updateImage();
  }

  updateImage() {
    const imageEl = this.galleryGrid.querySelector(`img[data-index="${this.currentIndex}"]`);
    if (!imageEl) return;
    this.lightboxImage.src = imageEl.src;
    this.lightboxImage.alt = imageEl.alt;
    this.lightboxCaption.textContent = imageEl.alt;
  }
}

function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.querySelector('.nav-list');

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navList.classList.toggle('show');
  });
}

function initAccordion() {
  const toggle = document.querySelector('.accordion-toggle');
  const panel = document.querySelector('.accordion-panel');

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
      panel.style.maxHeight = '0';
    }
  });
}

function initHeroSlides() {
  const slides = document.querySelectorAll('.slide');
  const nextBtn = document.getElementById('slide-next');
  const prevBtn = document.getElementById('slide-prev');
  let current = 0;
  const total = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    current = (current + 1) % total;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + total) % total;
    showSlide(current);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  setInterval(nextSlide, 6000);
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlides();
});



document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initAccordion();
  const gallery = new GalleryLightbox();

  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    alert('Gracias ' + (name || 'amigo') + ', tu mensaje ha sido recibido.');
    contactForm.reset();
  });
});
