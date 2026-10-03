<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

try {
    // Register the Composer autoloader...
    require __DIR__.'/../vendor/autoload.php';

    // Bootstrap Laravel and handle the request...
    /** @var Application $app */
    $app = require_once __DIR__.'/../bootstrap/app.php';

    $app->handleRequest(Request::capture());
} catch (\Throwable $e) {
    http_response_code(200);
    echo '<div style="padding:20px; font-family:sans-serif; background:#fff; color:#333;">';
    echo '<h2>Application Fatal Error:</h2>';
    echo '<p style="color:red; font-weight:bold; font-size:16px;">' . htmlspecialchars($e->getMessage()) . '</p>';
    echo '<h3>File:</h3><p>' . htmlspecialchars($e->getFile()) . ' (Line ' . $e->getLine() . ')</p>';
    echo '<h3>Trace:</h3><pre style="background:#f4f4f4; padding:15px; overflow:auto;">' . htmlspecialchars($e->getTraceAsString()) . '</pre>';
    echo '</div>';
}
