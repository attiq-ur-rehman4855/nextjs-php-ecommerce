
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php');

if (!isset($_GET['order_id'])) {
    echo json_encode(["status" => "error", "message" => "Order ID missing"]);
    exit;
}

$order_id = $_GET['order_id'];

$update_query = "UPDATE orders SET order_status = 'delivered' WHERE id = $order_id";
$result = mysqli_query($con, $update_query);

if ($result) {
    echo json_encode(["status" => "success", "message" => "Order marked as delivered"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update order"]);
}
