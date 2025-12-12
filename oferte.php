<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ExploreX Travel - Oferte</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <a class="navbar-brand" href="index.php">ExploreX Travel</a>
        <form style="display:inline; float:right;">
            <button type="button" id="logoutBtn" style="cursor: pointer; padding: 10px 20px; background: #fa463b; color: white; border: none; border-radius: 5px;">Logout</button>
        </form>
    </nav>
    <div class="container">
        <h2>Oferte turistice exclusive</h2>
        <div class="oferte-list">
            <div class="oferta">
                <img src="imgs/destinations/1.jpg" alt="Austria">
                <h3>Princetown, Austria</h3>
                <p>10 zile de excursie, 200$/noapte. Munți, natură, relaxare.</p>
            </div>
            <div class="oferta">
                <img src="imgs/destinations/2.jpg" alt="Australia">
                <h3>Surfers Paradise, Australia</h3>
                <p>7 zile de excursie, 150$/noapte. Plaje, surfing, aventură.</p>
            </div>
            <div class="oferta">
                <img src="imgs/destinations/3.jpg" alt="Elveția">
                <h3>Geneva, Elveția</h3>
                <p>5 zile de excursie, 180$/noapte. Lacuri, orașe elegante, cultură.</p>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
    <script>
        // Check if user is logged in, otherwise redirect
        fetch('api/auth-status.php', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (!data.loggedIn) {
                    window.location.href = 'login.php';
                }
            });
        
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', function(e) {
            e.preventDefault();
            fetch('api/logout.php', { method: 'POST', credentials: 'include' })
                .then(() => window.location.href = 'index.php');
        });
    </script>
</body>
</html>
