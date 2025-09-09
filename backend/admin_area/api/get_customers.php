<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include_once('../../config/connect.php');

if ($con->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

// Fetch all customers
$sql = "SELECT id, name, email, phone, image, created_at FROM users ORDER BY id DESC";
$result = $con->query($sql);

$customers = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $customers[] = $row;
    }
    echo json_encode(["status" => "success", "customers" => $customers]);
} else {
    echo json_encode(["status" => "error", "message" => "No customers found"]);
}

$con->close();
?>
