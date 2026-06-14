<?php
// 1. CORS Headers (Next.js/Vercel se connection allow krne k liye)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
include_once('../../config/connect.php');

$user_id = $_GET['user_id'];

$query = "SELECT SUM(quantity) as total FROM cart_items WHERE user_id = $user_id";
$result = mysqli_query($con, $query);
$row = mysqli_fetch_assoc($result);

echo json_encode(['count' => $row['total'] ?? 0]);
