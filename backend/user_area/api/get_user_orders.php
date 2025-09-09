<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once('../../config/connect.php');

$user_id = $_GET['user_id'];

$sql = "SELECT * FROM orders WHERE user_id = $user_id ORDER BY created_at DESC";
$result = mysqli_query($con, $sql);

$orders = [];

while ($row = mysqli_fetch_assoc($result)) {
    $orders[] = $row;
}

echo json_encode($orders);
?>
