<?php

require __DIR__ . '/../vendor/autoload.php';

use PhpMqtt\Client\MqttClient;
use PhpMqtt\Client\ConnectionSettings;

$server   = '172.16.99.1';
$port     = 1883;
$clientId = 'php-backend-nfc';

$settings = (new ConnectionSettings())
    ->setKeepAliveInterval(60);

$client = new MqttClient($server, $port, $clientId);
$client->connect($settings, true);

// Quand l’ESP32 lit un tag NFC
$client->subscribe('esp32/machine/nfc', function ($topic, $message) {
    file_put_contents(__DIR__ . '/../storage/last_nfc.json', json_encode([
        'uid' => $message,
        'time' => time()
    ]));
});

$client->loop(true);
