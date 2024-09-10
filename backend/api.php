<?php
header('Content-Type: application/json');

$conn = pg_connect("host=localhost dbname=api user=postgres password=Masterisbest120");

if (!$conn) {
    echo json_decode(['error' => 'Failed to connect to the database']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $browser= $data['browser'];
    $event = $data['event'];
    $host = $data['host'];
    $pid = $data['pid'];
    $session = $data['session'];
    $terminal = $data['terminal'];
    $time = $data['time'];
    $title = $data['time'];
    $url = $data['url'];
    $user = $data['user'];

    $result = pg_query_params($conn, "INSERT INTO api (id, browser, event, host, pid, session, terminal, time, title, url, user) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", array($id, $browser, $event, $host, $pid, $session, $terminal, $time, $title, $url, $user));

    if ($result) {
        echo json_encode(['message' => 'data added successfully']);
    } else {
        echo json_encode(['error' => 'Failed to add data']);
    }
}