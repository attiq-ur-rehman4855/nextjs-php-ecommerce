<?php
// 1. CORS Headers (Next.js/Vercel se connection allow krne k liye)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
include_once('../../config/connect.php');

$id = $_GET['id'];

$result = $con->query("SELECT * FROM users WHERE id = $id");

if ($row = $result->fetch_assoc()) {
    echo json_encode($row);
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}
