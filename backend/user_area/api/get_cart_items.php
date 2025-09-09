<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once('../../config/connect.php');

$user_id = $_GET['user_id'];

if (!$user_id) {
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

// Fetch cart items with product info
$query = "SELECT 
            c.id AS cart_id,
            c.product_id,
            p.product_title,
            p.product_image1 AS product_image,
            p.product_price,
            c.quantity
          FROM cart_items c
          JOIN products p ON c.product_id = p.product_id
          WHERE c.user_id = $user_id";

$result = mysqli_query($con, $query);

$cartItems = [];

while ($row = mysqli_fetch_assoc($result)) {
    $cartItems[] = $row;
}

echo json_encode($cartItems);
?>
