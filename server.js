const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rout',
    database: 'travel_auth'
});

// Funcție pentru inițializarea bazei de date
function initDatabase() {
    db.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`, (err) => {
      if (err) console.error('Eroare la crearea tabelului users:', err.message);
    });
    db.query(`CREATE TABLE IF NOT EXISTS consultatii (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nume VARCHAR(255) NOT NULL,
      telefon VARCHAR(50) NOT NULL,
      data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`, (err) => {
      if (err) console.error('Eroare la crearea tabelului consultatii:', err.message);
    });
    db.query(`CREATE TABLE IF NOT EXISTS hoteluri (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nume VARCHAR(255) NOT NULL,
      tara VARCHAR(100) NOT NULL,
      oras VARCHAR(100) NOT NULL,
      stele INT NOT NULL,
      descriere TEXT,
      pret DECIMAL(10, 2),
      imagine VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`, (err) => {
      if (err) console.error('Eroare la crearea tabelului hoteluri:', err.message);
    });
}

db.connect((err) => {
    if (err) {
        console.error('❌ Eroare la conectarea la MySQL:', err.message);
        console.error('Verifică:');
        console.error('  1. MySQL este pornit?');
        console.error('  2. Portul este corect? (3306)');
        console.error('  3. Parola este corectă?');
        console.error('  4. Baza de date "travel_auth" există?');
        console.error('\n⚠️  Serverul va porni, dar funcțiile de bază de date nu vor funcționa!');
    } else {
        console.log('✅ Conexiune MySQL reușită!');
        initDatabase();
    }
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

app.get('/admin-consultatii', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-consultatii.html'));
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
    // Verifică dacă conexiunea la MySQL este activă
    if (db.state === 'disconnected') {
        return res.status(500).json({ message: 'Conexiune MySQL nu este activă. Verifică că MySQL rulează!' });
    }
    db.query('SELECT * FROM hoteluri ORDER BY tara, nume', (err, results) => {
        if (err) {
            console.error('Eroare la interogarea hotelurilor:', err.message);
            return res.status(500).json({ message: 'Eroare la interogare', error: err.message });
        }
        console.log(`✅ Returnat ${results.length} hoteluri`);
        res.json(results);
    });
});

// Gestionare erori de conexiune
db.on('error', (err) => {
    console.error('❌ Eroare MySQL:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Conexiunea la MySQL a fost pierdută. Reîncearcă...');
    }
});

// Pornire server (chiar dacă MySQL nu este conectat)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n✅ Serverul rulează pe http://localhost:${PORT}`);
    console.log(`📊 Baza de date: travel_auth`);
    console.log(`\n💡 Dacă vezi erori MySQL, verifică că MySQL este pornit!\n`);
}); 