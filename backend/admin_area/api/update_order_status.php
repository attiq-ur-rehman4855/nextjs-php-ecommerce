<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php');

$data = json_decode(file_get_contents("php://input"), true);

$order_id = $data['order_id'];

if (isset($data['status'])) {
    $new_status = $data['status'];
} else {
    $new_status = 'delivered';
}

$update_sql = "UPDATE orders SET order_status = '$new_status' WHERE id = '$order_id'";
if (mysqli_query($con, $update_sql)) {
    echo json_encode(["status"=>"success","message"=>"Order status updated"]);
} else {
    echo json_encode(["status"=>"error","message"=>"Failed to update order"]);
}
?>
