// Logare modernă cu fetch pentru modalul Bootstrap
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    if (!email || !password) {
      document.getElementById('loginError') && (document.getElementById('loginError').textContent = 'Completează toate câmpurile!');
      return;
    }
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.email) {
        window.location.reload();
      } else {
        document.getElementById('loginError') && (document.getElementById('loginError').textContent = data.message || 'Date de autentificare incorecte!');
      }
    })
    .catch(() => {
      document.getElementById('loginError') && (document.getElementById('loginError').textContent = 'Eroare la conectare cu serverul!');
    });
  };
}

// Înregistrare cont nou (dacă ai formularul în modal)
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    if (!email || !password) {
      document.getElementById('registerError') && (document.getElementById('registerError').textContent = 'Completează toate câmpurile!');
      return;
    }
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Cont creat cu succes') {
        alert('Cont creat cu succes! Acum te poți loga.');
        document.getElementById('toggleLogin') && document.getElementById('toggleLogin').click();
      } else {
        document.getElementById('registerError') && (document.getElementById('registerError').textContent = data.message || 'Eroare la creare cont!');
      }
    })
    .catch(() => {
      document.getElementById('registerError') && (document.getElementById('registerError').textContent = 'Eroare la conectare cu serverul!');
    });
  };
}

// Afișare mesaj de eroare primit de la backend (dacă există)
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('error')) {
        document.getElementById('loginError').textContent = 'Date de autentificare incorecte!';
    }
}; 