<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;port=3307', 'manager', 'Manager2026x');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec('CREATE DATABASE IF NOT EXISTS cms_test');
    $pdo->exec('CREATE DATABASE IF NOT EXISTS lemur_cms');
    echo "Databases created successfully on port 3307\n";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
