// ---------------------------------------------
//  NAVBAR BURGER MENU
// ---------------------------------------------

// Sélection des éléments du DOM
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksAll = navLinks ? navLinks.querySelectorAll('a') : [];

// Debug pour vérifier que les éléments sont trouvés
console.log('Burger trouvé:', !!burger);
console.log('Nav-links trouvé:', !!navLinks);

// Toggle du menu burger au clic ou au clavier
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });
  burger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      navLinks.classList.toggle('active');
      burger.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
      e.preventDefault();
    }
  });
  navLinksAll.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      }
      // Fermer le modal login si ouvert
      if (modal && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });
  
  // Fermer le menu au clic en dehors
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        navLinks.classList.contains('active') && 
        !burger.contains(e.target) && 
        !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  
  // Fermer le menu avec la touche Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ---------------------------------------------
//  MODAL LOGIN
// ---------------------------------------------

// Sélection du bouton login et du modal
const loginIcon = document.getElementById('openLogin');
const modal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeLogin');

// Ouvre le modal quand on clique sur l'icône
if (loginIcon && modal) {
  loginIcon.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input[type="email"]');
    if (firstInput) {
      firstInput.value = window.getUserEmail();
      firstInput.focus();
    }
  });
}

// Ferme le modal quand on clique sur le bouton X
if (closeModal && modal) {
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });
  closeModal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      e.preventDefault();
    }
  });
}

// Ferme le modal si on clique en dehors du contenu
if (modal) {
  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}

// Enregistrement de l'email utilisateur au submit du login
if (modal) {
  const loginForm = modal.querySelector('form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      const emailInput = loginForm.querySelector('input[type="email"]');
      if (emailInput) {
        window.saveUserEmail(emailInput.value);
      }
    });
  }
}

// ---------------------------------------------
//  MODAL IMAGE FORMULE
// ---------------------------------------------
const formuleModal = document.getElementById('formuleModal');
const closeFormuleModal = document.getElementById('closeFormuleModal');
const formuleModalImg = document.getElementById('formuleModalImg');
const formuleModalTitle = document.getElementById('formuleModalTitle');

// La gestion des modals sera déplacée après le chargement dynamique des formules

if (closeFormuleModal && formuleModal) {
  closeFormuleModal.addEventListener('click', () => {
    formuleModal.classList.remove('show');
    document.body.style.overflow = '';
  });
  closeFormuleModal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      formuleModal.classList.remove('show');
      document.body.style.overflow = '';
      e.preventDefault();
    }
  });
}
if (formuleModal) {
  window.addEventListener('click', (e) => {
    if (e.target === formuleModal) {
      formuleModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formuleModal.classList.contains('show')) {
      formuleModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
}

// ---------------------------------------------
//  OFFRES - Développer / Réduire
// ---------------------------------------------

// Chaque colonne d'offre est cliquable pour afficher un exemple
const offres = document.querySelectorAll('.offre');

offres.forEach(offre => {
  offre.addEventListener('click', () => {
    const preview = offre.querySelector('.preview');
    if (preview) {
      preview.classList.toggle('show');
    }
  });
});


// ---------------------------------------------
//  Formulaire de contact 
// ---------------------------------------------

// Pourrait être étendu plus tard 

const contactForm = document.querySelector('.contact form');
if (contactForm) {
  const inputs = contactForm.querySelectorAll('input, textarea');
  const emailInput = contactForm.querySelector('input[type="email"]');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  // Validation en temps réel
  contactForm.addEventListener('input', () => {
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) valid = false;
    });
    if (emailInput && !/^\S+@\S+\.\S+$/.test(emailInput.value)) valid = false;
    submitBtn.disabled = !valid;
  });
  // Message de confirmation et scroll
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = document.getElementById('contact-nom')?.value || '';
    const email = document.getElementById('contact-email')?.value || '';
    const message = document.getElementById('contact-message')?.value || '';
    const now = new Date();
    const date = now.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
    saveContactMessage({ nom, email, message, date });
    setTimeout(renderContactHistory, 200); // Met à jour l'historique après envoi
    contactForm.reset(); // Vide le formulaire après envoi
  });
}

// ---------------------------------------------
//  SLIDER
// ---------------------------------------------

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const slider = document.querySelector('.slider');

function showSlide(n) {
  // Mettre à jour currentSlide avec la nouvelle valeur
  currentSlide = n;
  
  // Gérer les limites (boucle)
  if (currentSlide >= slides.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slides.length - 1;
  
  // Masquer toutes les slides
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Afficher la slide courante
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  
  // Déplacer le slider
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Événements pour les boutons
if (prevBtn && nextBtn && slider) {
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
}

// Événements pour les dots
if (dots.length > 0) {
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });
}

// Auto-play du slider
let slideInterval;
if (slides.length > 1) {
  slideInterval = setInterval(nextSlide, 5000);
}

// Pause au survol
if (slider && slides.length > 1) {
  slider.addEventListener('mouseenter', () => {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  });
  
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
}

// Navigation clavier
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

console.log('EasyResto app.js chargé avec succès');

// Import des fonctions de gestion de l'email utilisateur
// (Pour usage direct dans le navigateur, on attache les fonctions à window dans manager.js)

// ---------------------------------------------
//  MODAL RGPD
// ---------------------------------------------
const rgpdLink = document.getElementById('openRgpd');
const rgpdModal = document.getElementById('rgpdModal');
const closeRgpd = document.getElementById('closeRgpd');

if (rgpdLink && rgpdModal) {
  rgpdLink.addEventListener('click', (e) => {
    e.preventDefault();
    rgpdModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    closeRgpd.focus();
  });
}
if (closeRgpd && rgpdModal) {
  closeRgpd.addEventListener('click', () => {
    rgpdModal.style.display = 'none';
    document.body.style.overflow = '';
  });
  closeRgpd.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      rgpdModal.style.display = 'none';
      document.body.style.overflow = '';
      e.preventDefault();
    }
  });
}
if (rgpdModal) {
  window.addEventListener('click', (e) => {
    if (e.target === rgpdModal) {
      rgpdModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && rgpdModal.style.display === 'flex') {
      rgpdModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}

// ---------------------------------------------
//  CHARGEMENT DYNAMIQUE DES FORMULES ET FAQ
// ---------------------------------------------

// Données de fallback au cas où le fetch échoue
const fallbackData = {
  "formules": [
    {
      "id": "starter",
      "name": "Formule Starter",
      "description": "Site vitrine simple à personnaliser",
      "price": 99,
      "currency": "€",
      "image": "images/starter.png",
      "features": [
        { "name": "Accueil + Présentation + Menu simple", "included": true },
        { "name": "Menu interactif", "included": false },
        { "name": "Commande en ligne", "included": false },
        { "name": "Paiement en ligne", "included": false },
        { "name": "Google Maps", "included": true },
        { "name": "Galerie photo", "included": false },
        { "name": "Blog / actus", "included": false },
        { "name": "Avis clients", "included": false },
        { "name": "Statistiques", "included": false },
        { "name": "CRM simplifié", "included": false },
        { "name": "Coupons / promos", "included": false },
        { "name": "Gestion horaires avancée", "included": false },
        { "name": "Multi-utilisateur", "included": false },
        { "name": "Back-office complet", "included": false },
        { "name": "Comptes clients", "included": false }
      ]
    },
    {
      "id": "classique",
      "name": "Formule Classique",
      "description": "Site évolué à personnaliser",
      "price": 249,
      "currency": "€",
      "image": "images/classique.png",
      "features": [
        { "name": "Accueil + Présentation + Menu simple", "included": true },
        { "name": "Menu interactif", "included": true },
        { "name": "Commande en ligne", "included": false },
        { "name": "Paiement en ligne", "included": false },
        { "name": "Google Maps", "included": true },
        { "name": "Galerie photo", "included": true },
        { "name": "Blog / actus", "included": true },
        { "name": "Avis clients", "included": true },
        { "name": "Statistiques", "included": false },
        { "name": "CRM simplifié", "included": false },
        { "name": "Coupons / promos", "included": false },
        { "name": "Gestion horaires avancée", "included": false },
        { "name": "Multi-utilisateur", "included": false },
        { "name": "Back-office complet", "included": false },
        { "name": "Comptes clients (simple)", "included": true }
      ]
    },
    {
      "id": "premium",
      "name": "Formule Premium",
      "description": "Site complet à personnaliser",
      "price": 499,
      "currency": "€",
      "image": "images/premium.png",
      "features": [
        { "name": "Accueil + Présentation + Menu simple", "included": true },
        { "name": "Menu interactif", "included": true },
        { "name": "Commande en ligne", "included": true },
        { "name": "Paiement en ligne", "included": true },
        { "name": "Google Maps", "included": true },
        { "name": "Galerie photo", "included": true },
        { "name": "Blog / actus", "included": true },
        { "name": "Avis clients", "included": true },
        { "name": "Statistiques", "included": true },
        { "name": "CRM simplifié", "included": true },
        { "name": "Coupons / promos", "included": true },
        { "name": "Gestion horaires avancée", "included": true },
        { "name": "Multi-utilisateur", "included": true },
        { "name": "Back-office complet", "included": true },
        { "name": "Comptes clients (complet)", "included": true }
      ]
    }
  ],
  "faq": [
    {
      "question": "Comment ça marche ?",
      "answer": "Choisissez une formule, personnalisez-la (textes, images, couleurs, menu…), puis publiez-la en ligne en quelques clics."
    },
    {
      "question": "Ai-je besoin de compétences techniques ?",
      "answer": "Non, tout se fait via une interface simple et intuitive. Aucun code à écrire."
    },
    {
      "question": "Puis-je modifier mon site plus tard ?",
      "answer": "Oui, vous pouvez revenir à tout moment pour modifier votre formule et republier votre site."
    },
    {
      "question": "Les formules sont-elles adaptées au mobile ?",
      "answer": "Oui, toutes nos formules sont responsives et s'adaptent à tous les écrans (smartphone, tablette, ordinateur)."
    },
    {
      "question": "Puis-je ajouter la commande ou la réservation en ligne ?",
      "answer": "Oui, ces fonctionnalités sont incluses dans la Formule Premium. Il suffit de choisir cette formule et de l'activer lors de la personnalisation."
    },
    {
      "question": "Comment obtenir de l'aide ?",
      "answer": "Une documentation et un support sont disponibles dans votre espace utilisateur pour vous accompagner à chaque étape."
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  fetch('data/content.json')
    .then(response => response.json())
    .then(data => {
      renderFormules(data.formules);
      renderFAQ(data.faq);
      // Initialiser les modals des formules APRÈS leur génération
      initFormuleModals(data.formules);
      initScrollReveal();
    })
    .catch(err => {
      console.error('Erreur de chargement du contenu dynamique:', err);
      console.log('✅ Utilisation des données de fallback...');
      // Utiliser les données de fallback si le fetch échoue
      renderFormules(fallbackData.formules);
      renderFAQ(fallbackData.faq);
      initFormuleModals(fallbackData.formules);
      console.log('✅ Contenu affiché avec succès via le fallback !');
      initScrollReveal();
    });
});

function renderFormules(formules) {
  const container = document.getElementById('formules-list');
  if (!container) return;
  container.innerHTML = '';
  formules.forEach(formule => {
    const div = document.createElement('div');
    div.className = 'formule';
    div.tabIndex = 0;
    div.setAttribute('role', 'button');
    div.setAttribute('aria-label', `Voir l'image de la ${formule.name}`);
    div.innerHTML = `
      <h3>${formule.name}</h3>
      <p>${formule.description}</p>
      <ul>
        ${formule.features.map(f => `
          <li><span class="feature-text">${f.name}</span><span class="feature-icon">${f.included ? '✅' : '❌'}</span></li>
        `).join('')}
      </ul>
      <p class="prix">${formule.price}${formule.currency}</p>
      <button>Choisir cette formule</button>
    `;
    container.appendChild(div);
  });
  afterDynamicContent();
}

function initFormuleModals(formules) {
  const formuleModal = document.getElementById('formuleModal');
  const formuleModalImg = document.getElementById('formuleModalImg');
  const formuleModalTitle = document.getElementById('formuleModalTitle');
  const formulesElements = document.querySelectorAll('.formule');

  formulesElements.forEach(formule => {
    const titre = formule.querySelector('h3')?.textContent.trim();
    const formuleData = formules.find(f => f.name === titre);
    
    // Empêcher la propagation du clic sur le bouton
    const btn = formule.querySelector('button');
    if (btn) {
      btn.addEventListener('click', e => e.stopPropagation());
    }
    
    formule.addEventListener('click', (e) => {
      if (formuleData && formuleModal && formuleModalImg && formuleModalTitle) {
        formuleModalImg.src = formuleData.image;
        formuleModalTitle.textContent = titre;
        formuleModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        const closeBtn = document.getElementById('closeFormuleModal');
        if (closeBtn) closeBtn.focus();
      }
    });
    
    formule.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && formuleData && formuleModal && formuleModalImg && formuleModalTitle) {
        formuleModalImg.src = formuleData.image;
        formuleModalTitle.textContent = titre;
        formuleModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        const closeBtn = document.getElementById('closeFormuleModal');
        if (closeBtn) closeBtn.focus();
        e.preventDefault();
      }
    });
  });
}

function renderFAQ(faq) {
  const container = document.getElementById('faq-list');
  if (!container) return;
  container.innerHTML = '';
  // On répartit les questions en 2 colonnes pour garder la structure visuelle
  const col1 = document.createElement('div');
  col1.className = 'faq-col';
  const col2 = document.createElement('div');
  col2.className = 'faq-col';
  faq.forEach((item, i) => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = item.question;
    const p = document.createElement('p');
    p.textContent = item.answer;
    details.appendChild(summary);
    details.appendChild(p);
    if (i % 2 === 0) {
      col1.appendChild(details);
    } else {
      col2.appendChild(details);
    }
  });
  const columns = document.createElement('div');
  columns.className = 'faq-columns';
  columns.appendChild(col1);
  columns.appendChild(col2);
  container.appendChild(columns);
  afterDynamicContent();
}

// ---------------------------------------------
//  ANIMATION APPARITION AU SCROLL (scroll reveal)
// ---------------------------------------------

function initScrollReveal() {
  const revealEls = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .zoom-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback si IntersectionObserver non supporté
    revealEls.forEach(el => el.classList.add('visible'));
  }
}

// Si du contenu dynamique est injecté (ex: formules, FAQ), relancer l'observer après le rendu
function afterDynamicContent() {
  setTimeout(initScrollReveal, 100); // Laisse le temps au DOM d'être mis à jour
}

// ---------------------------------------------
//  CHARGEMENT DE LA CONFIGURATION DU SITE
// ---------------------------------------------

// Fonction utilitaire pour charger un JSON avec fallback
function fetchJsonWithFallback(url, fallback, callback) {
  fetch(url)
    .then(res => res.json())
    .then(data => callback(data))
    .catch(() => {
      console.warn('⚠️ Utilisation du fallback pour', url);
      callback(fallback);
    });
}

// Fallback pour config.json
const fallbackConfig = {
  site: {
    name: "EasyResto",
    description: "Création de sites web pour restaurateurs",
    version: "1.0.0",
    author: "EasyResto Team",
    language: "fr"
  },
  contact: {
    email: "contact@easyresto.fr",
    phone: "+33 1 23 45 67 89",
    address: "123 Rue de la Gastronomie, 75001 Paris",
    social: {
      facebook: "https://facebook.com/easyresto",
      instagram: "https://instagram.com/easyresto",
      linkedin: "https://linkedin.com/company/easyresto"
    }
  },
  colors: {
    primary: "#d35400",
    dark: "#2c3e50",
    light: "#ecf0f1",
    white: "#fff",
    success: "#27ae60"
  },
  features: {
    slider: { autoPlay: true, interval: 5000, pauseOnHover: true },
    modal: { animation: true, backdropClose: true, escapeClose: true },
    form: { validation: true, autoSave: true }
  },
  seo: {
    title: "EasyResto - Création de sites pour restaurateurs",
    description: "Sites web clé en main pour restaurateurs. Simple, rapide, efficace avec EasyResto.",
    keywords: "site web restaurant, création site restaurant, développement web, restauration, digital",
    ogImage: "images/logo.png"
  },
  performance: {
    lazyLoading: true,
    imageOptimization: true,
    minification: false
  }
};

// Injection dynamique des infos de config dans le site
function applyConfig(config) {
  // 1. Nom du site dans le header (logo alt) et le footer
  const logoImg = document.querySelector('.logo img');
  if (logoImg && config.site && config.site.name) {
    logoImg.alt = `Logo ${config.site.name}, retour à l'accueil`;
  }
  // 2. Nom du site et version dans le footer
  const footer = document.querySelector('footer');
  if (footer && config.site) {
    let copyright = footer.querySelector('p');
    if (copyright) {
      copyright.innerHTML = `© 2025 <span class="site-name">${config.site.name}</span> v${config.site.version}. Tous droits réservés.`;
    }
  }
  // 3. Réseaux sociaux dynamiques
  const socials = document.querySelector('footer .socials');
  if (socials && config.contact && config.contact.social) {
    socials.innerHTML = '';
    if (config.contact.social.facebook) {
      socials.innerHTML += `<a href="${config.contact.social.facebook}" target="_blank">Facebook</a>`;
    }
    if (config.contact.social.instagram) {
      socials.innerHTML += `<a href="${config.contact.social.instagram}" target="_blank">Instagram</a>`;
    }
    if (config.contact.social.linkedin) {
      socials.innerHTML += `<a href="${config.contact.social.linkedin}" target="_blank">LinkedIn</a>`;
    }
  }
  // 4. Titre de la page et meta description
  if (config.seo) {
    document.title = config.seo.title;
    let metaDesc = document.querySelector('head meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = config.seo.description;
  }
  // 5. Couleur principale (CSS custom property)
  if (config.colors && config.colors.primary) {
    document.documentElement.style.setProperty('--primary', config.colors.primary);
  }
  // 6. Activer/désactiver le slider autoPlay
  if (config.features && config.features.slider) {
    window.EASYRESTO_SLIDER_CONFIG = config.features.slider;
  }
}

// Charger la config au chargement du DOM
fetchJsonWithFallback('data/config.json', fallbackConfig, applyConfig);

// ---------------------------------------------
//  HISTORIQUE DES MESSAGES (CONTACT)
// ---------------------------------------------

function saveContactMessage(message) {
  const key = 'easyresto_contact_messages';
  let messages = [];
  try {
    messages = JSON.parse(sessionStorage.getItem(key)) || [];
  } catch (e) { messages = []; }
  messages.unshift(message); // Ajoute en début de liste
  sessionStorage.setItem(key, JSON.stringify(messages));
}

function renderContactHistory() {
  const formSection = document.querySelector('.contact form');
  if (!formSection) return;
  let historyDiv = document.getElementById('contact-history');
  if (!historyDiv) {
    historyDiv = document.createElement('div');
    historyDiv.id = 'contact-history';
    historyDiv.style.marginTop = '2rem';
    formSection.parentNode.appendChild(historyDiv);
  }
  let messages = [];
  try {
    messages = JSON.parse(sessionStorage.getItem('easyresto_contact_messages')) || [];
  } catch (e) { messages = []; }
  if (messages.length === 0) {
    historyDiv.innerHTML = '<h3>Historique de vos messages</h3><p>Aucun message envoyé pour le moment.</p>';
    return;
  }
  historyDiv.innerHTML = '<h3>Historique de vos messages</h3>' +
    '<ul style="padding-left:0; list-style:none;">' +
    messages.map(msg =>
      `<li style="margin-bottom:1em; border-bottom:1px solid #eee; padding-bottom:0.5em;">
        <strong>[${msg.date}] ${msg.nom}</strong><br/>
        <span>${msg.message.length > 120 ? msg.message.slice(0,120)+'…' : msg.message}</span>
      </li>`
    ).join('') + '</ul>';
}

// Ajout sur la page contact uniquement
if (window.location.pathname.includes('contact.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    renderContactHistory();
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        const nom = document.getElementById('contact-nom')?.value || '';
        const email = document.getElementById('contact-email')?.value || '';
        const message = document.getElementById('contact-message')?.value || '';
        const now = new Date();
        const date = now.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
        saveContactMessage({ nom, email, message, date });
        setTimeout(renderContactHistory, 200); // Met à jour l'historique après envoi
        contactForm.reset(); // Vide le formulaire après envoi
      });
    }
  });
}
