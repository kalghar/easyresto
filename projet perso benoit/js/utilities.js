/**
 * Valide une adresse email
 * @param {string} email - L'email à valider
 * @returns {boolean} - True si l'email est valide
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valide un numéro de téléphone français
 * @param {string} phone - Le numéro à valider
 * @returns {boolean} - True si le numéro est valide
 */
function validatePhone(phone) {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
}

/**
 * Valide un formulaire complet
 * @param {HTMLFormElement} form - Le formulaire à valider
 * @returns {object} - {isValid: boolean, errors: array}
 */
function validateForm(form) {
  const errors = [];
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value.trim()) {
      errors.push(`Le champ "${input.name || input.placeholder}" est requis`);
    }
    
    if (input.type === 'email' && input.value && !validateEmail(input.value)) {
      errors.push('Adresse email invalide');
    }
    
    if (input.type === 'tel' && input.value && !validatePhone(input.value)) {
      errors.push('Numéro de téléphone invalide');
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// ---------------------------------------------
//  GESTION DU STORAGE
// ---------------------------------------------

/**
 * Sauvegarde des données en localStorage avec gestion d'erreur
 * @param {string} key - Clé de stockage
 * @param {any} value - Valeur à sauvegarder
 * @returns {boolean} - True si sauvegarde réussie
 */
function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return false;
  }
}

/**
 * Récupère des données du localStorage avec gestion d'erreur
 * @param {string} key - Clé de stockage
 * @param {any} defaultValue - Valeur par défaut si erreur
 * @returns {any} - Données récupérées
 */
function safeGetStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    return defaultValue;
  }
}

// ---------------------------------------------
//  EXPORT DES FONCTIONS (pour usage global)
// ---------------------------------------------

window.validateEmail = validateEmail;
window.validatePhone = validatePhone;
window.validateForm = validateForm;
window.safeSetStorage = safeSetStorage;
window.safeGetStorage = safeGetStorage;

console.log('EasyResto utilities.js chargé avec succès');
