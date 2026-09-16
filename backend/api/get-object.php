<?php
header('Access-Control-Allow-Origin: *'); //avoir acces a l'api car 2 ports different entre le front et le back
header('Content-Type: application/json');
echo file_get_contents(__DIR__ . '/../storage/last_nfc.json');