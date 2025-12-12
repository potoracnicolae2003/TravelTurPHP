<?php
require_once 'config.php';

echo "<h2>Status Conexiune Bază de Date</h2>";

try {
    // Test connection
    $stmt = $pdo->query("SELECT 1");
    echo "<p style='color: green;'>✅ Conexiune MySQL reușită!</p>";
    
    // Check tables
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h3>Tabele existente:</h3>";
    echo "<ul>";
    foreach ($tables as $table) {
        $stmt = $pdo->query("SELECT COUNT(*) FROM $table");
        $count = $stmt->fetchColumn();
        echo "<li><strong>$table</strong> ($count înregistrări)</li>";
    }
    echo "</ul>";
    
    // Check hotels
    $stmt = $pdo->query("SELECT COUNT(*) as total, COUNT(DISTINCT tara) as countries FROM hoteluri");
    $result = $stmt->fetch();
    echo "<h3>Hoteluri:</h3>";
    echo "<p>Total: <strong>" . $result['total'] . "</strong> hoteluri din <strong>" . $result['countries'] . "</strong> țări</p>";
    
    echo "<h3>Session Info:</h3>";
    echo "<p>Session ID: <strong>" . session_id() . "</strong></p>";
    echo "<p>User logged in: <strong>" . (!empty($_SESSION['user']) ? $_SESSION['user'] : 'Nu') . "</strong></p>";
    
    echo "<hr>";
    echo "<p><a href='index.php'>← Înapoi la home</a></p>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Eroare: " . $e->getMessage() . "</p>";
}
?>
