# ExploreX Travel - Agenție de Turism

Site web modern pentru o agenție de turism cu logare reală și oferte turistice.

## Instalare

```bash
npm install
npm start
```

## Configurare

1. Pornește MySQL în XAMPP
2. Rulează `database.sql` în phpMyAdmin
3. Verifică configurația din `server.js` (port, user, password)

## Endpoints API

- `POST /register` - Înregistrare cont nou
- `POST /login` - Logare utilizator
- `POST /logout` - Logout
- `GET /auth-status` - Verifică status autentificare
- `POST /consultatie` - Trimite cerere de consultație
- `GET /admin/consultatii` - Lista consultațiilor
- `GET /hoteluri` - Lista hotelurilor 