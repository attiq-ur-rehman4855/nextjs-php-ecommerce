<?php
header("Access-Control-Allow-Origin: *");
include_once('../../config/connect.php');

$user_id = $_GET['user_id'];

$query = "SELECT SUM(quantity) as total FROM cart_items WHERE user_id = $user_id";
$result = mysqli_query($con, $query);
$row = mysqli_fetch_assoc($result);

echo json_encode(['count' => $row['total'] ?? 0]);
