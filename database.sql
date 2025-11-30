-- Script SQL pentru inițializarea bazei de date TravelTur
-- Rulează acest script în phpMyAdmin sau MySQL Workbench după ce ai pornit MySQL în XAMPP

-- Creează baza de date (dacă nu există deja)
CREATE DATABASE IF NOT EXISTS travel_auth CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Folosește baza de date
USE travel_auth;

-- Creează tabelul pentru utilizatori
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Creează tabelul pentru cereri de consultație telefonică
CREATE TABLE IF NOT EXISTS consultatii (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nume VARCHAR(255) NOT NULL,
    telefon VARCHAR(50) NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Creează tabelul pentru hoteluri
CREATE TABLE IF NOT EXISTS hoteluri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nume VARCHAR(255) NOT NULL,
    tara VARCHAR(100) NOT NULL,
    oras VARCHAR(100) NOT NULL,
    stele INT NOT NULL,
    descriere TEXT,
    pret DECIMAL(10, 2),
    imagine VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserează datele hotelurilor
INSERT INTO hoteluri (nume, tara, oras, stele) VALUES
-- Turcia
('Hotel Aqua', 'Turcia', 'Marmaris', 5),
('Titanic Beach Lara', 'Turcia', 'Antalya', 5),
('Liberty Hotels Lykia', 'Turcia', 'Oludeniz', 4),
-- Egipt
('Baron Palace', 'Egipt', 'Hurghada', 5),
('Steigenberger Al Dau Beach', 'Egipt', 'Hurghada', 5),
('Jaz Aquamarine', 'Egipt', 'Hurghada', 5),
-- Bulgaria
('Melia Grand Hermitage', 'Bulgaria', 'Nisipurile de Aur', 5),
('Sol Nessebar Palace', 'Bulgaria', 'Nessebar', 5),
('Hotel Laguna Garden', 'Bulgaria', 'Albena', 4),
-- Italia
('Hotel Artemide', 'Italia', 'Roma', 4),
('NH Collection', 'Italia', 'Veneția', 4),
('Grand Hotel Vesuvio', 'Italia', 'Napoli', 5),
-- Cipru
('Adams Beach Hotel', 'Cipru', 'Ayia Napa', 5),
('Elysium', 'Cipru', 'Paphos', 5),
('Nissi Beach Resort', 'Cipru', 'Ayia Napa', 4),
-- România
('Hotel International', 'România', 'Iași', 4),
('Teleferic Grand Hotel', 'România', 'Poiana Brașov', 4),
('Vega Hotel', 'România', 'Mamaia', 5)
ON DUPLICATE KEY UPDATE nume=nume;

-- Verifică dacă tabelele au fost create cu succes
SHOW TABLES;

