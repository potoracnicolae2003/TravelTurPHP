<?php
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['message' => 'Method not allowed'], 405);
}

$data = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (!$email || !$password) {
    jsonResponse(['message' => 'Email și parolă necesare'], 400);
}

try {
    $stmt = $pdo->prepare("SELECT id, email, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->rowCount() === 0) {
        jsonResponse(['message' => 'Email sau parolă greșită'], 401);
    }
    
    $user = $stmt->fetch();
    
    if (!password_verify($password, $user['password'])) {
        jsonResponse(['message' => 'Email sau parolă greșită'], 401);
    }
    
    $_SESSION['user'] = $user['email'];
    $_SESSION['user_id'] = $user['id'];
    
    jsonResponse(['message' => 'Logare reușită', 'email' => $user['email']]);
} catch (PDOException $e) {
    jsonResponse(['message' => 'Eroare server', 'error' => $e->getMessage()], 500);
}
?>
