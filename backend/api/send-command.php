<?php
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');

require __DIR__ . '/../vendor/autoload.php';

use PhpMqtt\Client\MqttClient;
use PhpMqtt\Client\ConnectionSettings;

$cmd = $_POST['cmd'] ?? $_GET['dir'] ?? null;

if (!in_array($cmd, ['avant', 'arriere', 'gauche', 'droite', 'drop'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid command']);
    exit;
}

$server   = '172.16.99.1';
$port     = 1883;
$clientId = 'php-backend-command-' . uniqid();

$settings = (new ConnectionSettings())
    ->setKeepAliveInterval(60);

$client = new MqttClient($server, $port, $clientId);
$client->connect($settings, true);

$topic = ($cmd === 'drop') ? 'esp321/machine/pince' : 'esp321/machine/joystick';
$client->publish($topic, $cmd, 0);

$client->disconnect();

echo json_encode(['status' => 'ok', 'command' => $cmd]);