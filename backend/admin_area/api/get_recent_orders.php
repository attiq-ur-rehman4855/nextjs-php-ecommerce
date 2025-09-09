<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php');


if ($con->connect_error) {
  echo json_encode(["error" => "Database connection  failed"]);
  exit;
}

$query = "SELECT id, user_id, total_amount, order_status FROM orders ORDER BY id DESC LIMIT 5";
$result = $con->query($query);

$orders = [];

while ($row = $result->fetch_assoc()) {
  // You can later add logic to fetch user name from user_id if needed.
  $orders[] = $row;
}

echo json_encode($orders);
?>
