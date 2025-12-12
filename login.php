<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ExploreX Travel - Logare</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="login-container">
        <h2>Autentificare ExploreX Travel</h2>
        <form id="loginForm" method="POST">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <label for="password">Parolă</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Logare</button>
        </form>
        <div id="loginError" class="error-message"></div>
        <a href="index.php">Înapoi la acasă</a>
    </div>
    <script src="script.js"></script>
    <script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorDiv = document.getElementById('loginError');
            
            if (!email || !password) {
                errorDiv.textContent = 'Completează toate câmpurile!';
                errorDiv.style.color = 'red';
                return;
            }
            
            fetch('api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Logare reușită') {
                    errorDiv.textContent = 'Logare reușită! Redirecționare...';
                    errorDiv.style.color = 'green';
                    setTimeout(() => window.location.href = 'index.php', 1500);
                } else {
                    errorDiv.textContent = data.message || 'Eroare la logare!';
                    errorDiv.style.color = 'red';
                }
            })
            .catch(() => {
                errorDiv.textContent = 'Eroare la conectare cu serverul!';
                errorDiv.style.color = 'red';
            });
        });
    </script>
</body>
</html>
