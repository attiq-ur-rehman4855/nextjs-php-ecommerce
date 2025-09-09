<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php');

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$quantity = $data['quantity'];

if ($id && $quantity > 0) {
    $query = "UPDATE cart_items SET quantity = $quantity WHERE id = $id";
    if (mysqli_query($con, $query)) {
        echo json_encode(['status' => 'success', 'message' => 'Quantity updated']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Update failed']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}
