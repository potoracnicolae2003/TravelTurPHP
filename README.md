
# TravelTur (versiune PHP)

Aplicație pentru agenție de turism convertită la PHP, cu API în `api/` și conexiune MySQL prin `config.php`.

## Cerințe
- PHP 8+ (sau PHP inclus în XAMPP)
- MySQL (XAMPP recomandat pentru Windows)

## Pași rapizi de configurare (XAMPP)

1) Pornește Apache și MySQL din XAMPP Control Panel.

2) Importă baza de date `travel_auth` din fișierul `database.sql`:

    - phpMyAdmin: deschide http://localhost/phpmyadmin → New → import → încarcă `database.sql`.
    - CLI (PowerShell):

```powershell
mysql -u root < database.sql
```

    (Dacă folosești XAMPP și nu ai parolă, comanda de mai sus funcționează fără `-p`.)

3) Configurează conexiunea MySQL în fișierul `config.php` (fișierul este exclus din Git):

- `DB_HOST` = `localhost`
- `DB_USER` = `root`
- `DB_PASS` = '' (implicit XAMPP)
- `DB_NAME` = `travel_auth`

4) Pornește aplicația:

- Folosind XAMPP (recomandat): plasează proiectul în `C:\xampp\htdocs\TravelTur` și accesează `http://localhost/TravelTur/`.
- Sau folosește serverul PHP încorporat (folosește php din XAMPP pentru a evita lipsa din PATH):

```powershell
C:\xampp\php\php.exe -S localhost:8000 -t .
```

5) Verifică conexiunea la bază de date deschizând pagina de diagnoză:

- `http://localhost:8000/status.php` sau `http://localhost/TravelTur/status.php`

## Ce am modificat în proiect
- Pagini convertite la PHP: `index.php`, `login.php`, `oferte.php`, `admin-consultatii.php`, `termeni-si-conditii.php`.
- API PHP în `api/` (ex: `api/login.php`, `api/register.php`, `api/hoteluri.php`, `api/consultatie.php`).
- `config.php` folosește PDO și conține funcție de inițializare DB (dacă e nevoie).

## Probleme comune & soluții rapide
- `php` nu este recunoscut: folosește calea completă `C:\xampp\php\php.exe` sau adaugă PHP în `PATH`.
- MySQL nu pornește (port 3306 ocupat): verifică și oprește procesele duplicate (`tasklist` / `taskkill`) sau schimbă portul MySQL.
- `Access denied` pentru `root`: verifică parola din `config.php` (XAMPP are parolă goală implicit).
- `Unknown database 'travel_auth'`: importă `database.sql` (pasul 2).

## Git / Deploy

După modificări locale:

```powershell
git add .
git commit -m "Migrate project to PHP + add DB config"
git push origin main
```

## Pași următori recomandați
- Importează `database.sql` și deschide `status.php` pentru verificare.
- Dacă vrei, pot rula pașii de import/local testing pentru tine (îți pot genera comenzile exacte pe sistemul tău).

---
Fișierul `config.php` conține credențiale sensibile și este exclus din Git prin `.gitignore`.
