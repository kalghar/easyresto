// Gestion de l'enregistrement de l'email utilisateur pour le login

function saveUserEmail(email) {
  if (typeof email === 'string' && email.trim() !== '') {
    localStorage.setItem('easyresto_user_email', email.trim());
  }
}

function getUserEmail() {
  return localStorage.getItem('easyresto_user_email') || '';
}

window.saveUserEmail = saveUserEmail;
window.getUserEmail = getUserEmail;
