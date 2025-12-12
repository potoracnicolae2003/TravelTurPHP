# ExploreX Travel - Agenție de Turism

Site web modern pentru o agenție de turism cu logare reală și oferte turistice.

## Instalare și rulare

### 1. Instalează dependențele

```bash
npm install
```

### 2. Modifică datele de conectare la MySQL în `server.js`

Editează fișierul `server.js` și actualizează configurația:

```javascript
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,              // Portul MySQL (verifică în MySQL Workbench)
    user: 'root',            // User-ul MySQL
    password: 'rout',       // Parola MySQL (schimbă dacă este diferită)
    database: 'travel_auth'  // Numele bazei de date
});
```

**Important:**
- Dacă nu ai parolă setată pentru MySQL, schimbă `password: 'rout'` în `password: ''`
- Verifică că baza de date `travel_auth` există în MySQL

### 3. Pornește serverul

```bash
npm start
```

Ar trebui să vezi:
```
✅ Conexiune MySQL reușită!
✅ Serverul rulează pe http://localhost:3000
```

### 4. Accesează aplicația

Deschide browserul și accesează:

```
http://localhost:3000
```

## Pagini disponibile

- `http://localhost:3000` - Pagina principală
- `http://localhost:3000/login` - Pagina de logare
- `http://localhost:3000/admin-consultatii` - Panou admin pentru consultații

## Endpoints API

- `POST /register` - Înregistrare cont nou
- `POST /login` - Logare utilizator
- `POST /logout` - Logout
- `GET /auth-status` - Verifică status autentificare
- `POST /consultatie` - Trimite cerere de consultație
- `GET /admin/consultatii` - Lista consultațiilor (JSON)
- `GET /hoteluri` - Lista hotelurilor 