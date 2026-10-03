<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>Cloudways PHP Diagnostic Test</h2>";
echo "<p>PHP Version: " . phpversion() . "</p>";

$envPath = __DIR__ . '/../.env';
if (file_exists($envPath)) {
    echo "<p>✓ .env file exists</p>";
} else {
    echo "<p>✗ .env file MISSING</p>";
}

try {
    require __DIR__.'/../vendor/autoload.php';
    echo "<p>✓ Vendor autoloader loaded</p>";
} catch (\Throwable $e) {
    echo "<p>✗ Autoloader Error: " . htmlspecialchars($e->getMessage()) . "</p>";
}

try {
    $app = require_once __DIR__.'/../bootstrap/app.php';
    echo "<p>✓ Bootstrap app loaded</p>";
} catch (\Throwable $e) {
    echo "<p>✗ Bootstrap Error: " . htmlspecialchars($e->getMessage()) . "</p>";
}
