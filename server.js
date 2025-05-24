const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rout',
    database: 'travel_auth'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conexiune MySQL reușită!');
    // Creează tabelul dacă nu există
    db.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )`, (err) => {
      if (err) throw err;
    });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use(session({
    secret: 'explorex_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: 'lax' }
}));
app.use(cors({
  origin: true,
  credentials: true
}));

// Rute
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Untitled-1.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Înregistrare cont nou
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email și parolă necesare' });
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Email deja folosit' });
            return res.status(500).json({ message: 'Eroare server', error: err });
        }
        res.json({ message: 'Cont creat cu succes' });
    });
});

// Logare
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Eroare server' });
        if (results.length === 0) return res.status(401).json({ message: 'Email sau parolă greșită' });
        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Email sau parolă greșită' });
        }
        req.session.user = user.email;
        res.json({ message: 'Logare reușită', email: user.email });
    });
});

// Logout
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'Logout cu succes' });
    });
});

// Middleware pentru protejarea rutei /oferte
function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

app.get('/oferte', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'oferte.html'));
});

// Rută pentru status autentificare (folosită de navbar)
app.get('/auth-status', (req, res) => {
    if (req.session.user) {
      res.json({ loggedIn: true, email: req.session.user });
    } else {
      res.json({ loggedIn: false, email: null });
    }
});

// Salvează cerere consultație telefonică
app.post('/consultatie', (req, res) => {
    const { nume, telefon } = req.body;
    if (!nume || !telefon) return res.status(400).json({ message: 'Nume și telefon necesare' });
    db.query('INSERT INTO consultatii (nume, telefon) VALUES (?, ?)', [nume, telefon], (err, result) => {
        if (err) return res.status(500).json({ message: 'Eroare la salvare', error: err });
        res.json({ message: 'Cerere înregistrată cu succes!' });
    });
});

// Rută pentru afișarea cererilor de consultație (admin)
app.get('/admin/consultatii', (req, res) => {
    db.query('SELECT * FROM consultatii ORDER BY data DESC', (err, results) => {
        if (err) return res.status(500).json({ message: 'Eroare la interogare', error: err });
        res.json(results);
    });
});

// Rută pentru afișarea hotelurilor din MySQL
app.get('/hoteluri', (req, res) => {
    db.query('SELECT * FROM hoteluri ORDER BY tara, nume', (err, results) => {
        if (err) return res.status(500).json({ message: 'Eroare la interogare', error: err });
        res.json(results);
    });
});

// Pornire server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
}); 