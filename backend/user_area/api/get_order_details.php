<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once('../../config/connect.php');

$order_id = $_GET['order_id'];

$sql = "SELECT * FROM order_items WHERE order_id = $order_id";
$result = mysqli_query($con, $sql);

$items = [];

while ($row = mysqli_fetch_assoc($result)) {
    $items[] = $row;
}

echo json_encode($items);
?>
