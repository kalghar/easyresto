// ---------------------------------------------
//  NAVBAR BURGER MENU
// ---------------------------------------------

// Sélection des éléments du DOM
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksAll = navLinks ? navLinks.querySelectorAll('a') : [];

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
const formules = document.querySelectorAll('.formule');

const formuleImages = {
  'Formule Starter': 'images/starter.png',
  'Formule Classique': 'images/classique.png',
  'Formule Premium': 'images/premium.png'
};

formules.forEach(formule => {
  const titre = formule.querySelector('h3')?.textContent.trim();
  // Empêcher la propagation du clic sur le bouton
  const btn = formule.querySelector('button');
  if (btn) {
    btn.addEventListener('click', e => e.stopPropagation());
  }
  formule.addEventListener('click', (e) => {
    if (titre && formuleImages[titre]) {
      formuleModalImg.src = formuleImages[titre];
      formuleModalTitle.textContent = titre;
      formuleModal.classList.add('show');
      document.body.style.overflow = 'hidden';
      closeFormuleModal.focus();
    }
  });
  formule.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && titre && formuleImages[titre]) {
      formuleModalImg.src = formuleImages[titre];
      formuleModalTitle.textContent = titre;
      formuleModal.classList.add('show');
      document.body.style.overflow = 'hidden';
      closeFormuleModal.focus();
      e.preventDefault();
    }
  });
});
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
    contactForm.reset();
    submitBtn.disabled = true;
    const msg = document.createElement('div');
    msg.textContent = 'Merci pour votre message ! Nous vous répondrons rapidement.';
    msg.style.background = '#27ae60';
    msg.style.color = '#fff';
    msg.style.padding = '1rem';
    msg.style.marginTop = '1rem';
    msg.style.borderRadius = '8px';
    msg.setAttribute('role', 'status');
    contactForm.parentNode.insertBefore(msg, contactForm.nextSibling);
    setTimeout(() => { msg.remove(); }, 5000);
    contactForm.scrollIntoView({behavior: 'smooth'});
  });
}

console.log('EasyResto app.js chargé avec succès');

// Import des fonctions de gestion de l'email utilisateur
// (Pour usage direct dans le navigateur, on attache les fonctions à window dans manager.js)
