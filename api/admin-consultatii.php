<?php
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['message' => 'Method not allowed'], 405);
}

try {
    $stmt = $pdo->prepare("SELECT * FROM consultatii ORDER BY data DESC");
    $stmt->execute();
    $consultatii = $stmt->fetchAll();
    
    jsonResponse($consultatii);
} catch (PDOException $e) {
    jsonResponse(['message' => 'Eroare la interogare', 'error' => $e->getMessage()], 500);
}
?>
