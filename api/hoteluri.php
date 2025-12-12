<?php
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['message' => 'Method not allowed'], 405);
}

try {
    $stmt = $pdo->prepare("SELECT * FROM hoteluri ORDER BY tara, nume");
    $stmt->execute();
    $hotels = $stmt->fetchAll();
    
    jsonResponse($hotels);
} catch (PDOException $e) {
    jsonResponse(['message' => 'Eroare la interogare', 'error' => $e->getMessage()], 500);
}
?>
