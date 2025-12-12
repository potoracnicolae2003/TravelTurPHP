<?php
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['message' => 'Method not allowed'], 405);
}

if (!empty($_SESSION['user'])) {
    jsonResponse(['loggedIn' => true, 'email' => $_SESSION['user']]);
} else {
    jsonResponse(['loggedIn' => false, 'email' => null]);
}
?>
