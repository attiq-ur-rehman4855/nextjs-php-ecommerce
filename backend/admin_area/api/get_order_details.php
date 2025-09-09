<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once('../../config/connect.php');

$order_id = $_GET['order_id'];

if (!$order_id) {
    echo json_encode(["status" => "error", "message" => "Missing order id"]);
    exit;
}

// --- Fetch order (including user info) ---
$order_sql = "SELECT id, user_id, fullname, email, phone, order_status 
              FROM orders 
              WHERE id = $order_id LIMIT 1";
$order_result = mysqli_query($con, $order_sql);

$order_data = null;
if ($order_result && mysqli_num_rows($order_result) > 0) {
    $order_data = mysqli_fetch_assoc($order_result);
} else {
    echo json_encode(["status" => "error", "message" => "Order not found"]);
    exit;
}

// --- Fetch order items ---
$items_sql = "SELECT id, order_id, product_name, price, quantity, subtotal 
              FROM order_items 
              WHERE order_id = $order_id";
$items_result = mysqli_query($con, $items_sql);

$order_items = [];
if ($items_result && mysqli_num_rows($items_result) > 0) {
    while ($row = mysqli_fetch_assoc($items_result)) {
        $order_items[] = $row;
    }
}

// Send combined data
echo json_encode([
    "status" => "success",
    "order" => $order_data,
    "items" => $order_items
]);
?>
