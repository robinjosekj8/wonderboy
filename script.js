/* ============================================
   ROBIN JOSE — PERSONAL WEBSITE · SCRIPT.JS
   Dynamic Animations & Interactive Features
============================================ */

// ==============================
// CUSTOM CURSOR
// ==============================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// ==============================
// NAV SCROLL EFFECT
// ==============================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ==============================
// HAMBURGER MENU
// ==============================
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks   = document.querySelectorAll('.mob-link');
let menuOpen = false;

hamburger.addEventListener('click', toggleMenu);
mobLinks.forEach(link => link.addEventListener('click', () => {
  if (menuOpen) toggleMenu();
}));

function toggleMenu() {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
}

// ==============================
// TYPING EFFECT
// ==============================
const typingEl = document.getElementById('typingText');
const phrases  = [
  'Maintenance Supervisor',
  'Coffee Machine Technician',
  'Freelance Photographer',
  'Electrician & Carpenter',
  'Web Developer',
];

let phraseIndex   = 0;
let charIndex     = 0;
let isDeleting    = false;
let typingTimeout;

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      typingTimeout = setTimeout(type, 1800);
      return;
    }
  } else {
    typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 40 : 80;
  typingTimeout = setTimeout(type, speed);
}

type();

// ==============================
// FLOATING PARTICLES
// ==============================
const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 25;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  createParticle();
}

function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';

  const startX = Math.random() * 100;
  const drift  = (Math.random() - 0.5) * 200;
  const size   = Math.random() * 3 + 1;
  const dur    = Math.random() * 15 + 10;
  const delay  = Math.random() * 15;

  p.style.cssText = `
    left: ${startX}%;
    width: ${size}px;
    height: ${size}px;
    --drift: ${drift}px;
    animation-duration: ${dur}s;
    animation-delay: ${delay}s;
    opacity: 0;
  `;

  particlesContainer.appendChild(p);
}

// ==============================
// SCROLL REVEAL (IntersectionObserver)
// ==============================
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Trigger hero elements immediately (they start in view)
setTimeout(() => {
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
    el.classList.add('revealed');
  });
}, 100);

// ==============================
// SKILL BAR ANIMATION
// ==============================
const pillFills = document.querySelectorAll('.pill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.pill-fill');
      fills.forEach((fill, i) => {
        setTimeout(() => fill.classList.add('animate'), i * 80);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

// ==============================
// COUNTER ANIMATION (Stats)
// ==============================
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

function animateCounter(el, target) {
  let current  = 0;
  const step   = target / 40;
  const timer  = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 40);
}

// ==============================
// PARALLAX HERO BG
// ==============================
const heroBgImg = document.querySelector('.hero-bg-img');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (heroBgImg && scrolled < window.innerHeight) {
    heroBgImg.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ==============================
// SMOOTH SCROLL FOR NAV LINKS
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==============================
// ACTIVE NAV LINK HIGHLIGHT
// ==============================
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--amber)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ==============================
// CARD TILT EFFECT (mild 3D)
// ==============================
document.querySelectorAll('.timeline-card, .cert-card, .about-card, .cta-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const dx     = (x - cx) / cx;
    const dy     = (y - cy) / cy;
    const tiltX  = dy * 4;
    const tiltY  = -dx * 4;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ==============================
// PAGE LOAD ENTRANCE ANIMATION
// ==============================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});
