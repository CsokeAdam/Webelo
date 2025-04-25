<?php
header('Content-Type: application/json');

// Adatok, amiket visszaadunk
$data = [
    ['id' => 1, 'name' => 'John Doe', 'height' => 180],
    ['id' => 2, 'name' => 'Jane Smith', 'height' => 165],
    ['id' => 3, 'name' => 'Alice Johnson', 'height' => 170],
    ['id' => 4, 'name' => 'Bob Brown', 'height' => 185]
];

// Visszaadjuk az adatokat JSON formátumban
echo json_encode($data);
?>
