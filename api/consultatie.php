<?php
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['message' => 'Method not allowed'], 405);
}

$data = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$nume = trim($data['nume'] ?? '');
$telefon = trim($data['telefon'] ?? '');

if (!$nume || !$telefon) {
    jsonResponse(['message' => 'Nume și telefon necesare'], 400);
}

try {
    $stmt = $pdo->prepare("INSERT INTO consultatii (nume, telefon) VALUES (?, ?)");
    $stmt->execute([$nume, $telefon]);
    
    jsonResponse(['message' => 'Cerere înregistrată cu succes!']);
} catch (PDOException $e) {
    jsonResponse(['message' => 'Eroare la salvare', 'error' => $e->getMessage()], 500);
}
?>
