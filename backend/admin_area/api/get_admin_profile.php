<?php
// 1. CORS Headers (Next.js/Vercel se connection allow krne k liye)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
include_once('../../config/connect.php');


$admin_id = $_GET['admin_id'] ?? '';

if (!$admin_id) {
    echo json_encode(["status" => "error", "message" => "Admin ID required"]);
    exit;
}

$query = "SELECT id, name, email, phone, image FROM admin_signup WHERE id='$admin_id'";
$result = mysqli_query($con, $query);

if (mysqli_num_rows($result) > 0) {
    $data = mysqli_fetch_assoc($result);
    echo json_encode(["status" => "success", "data" => $data]);
} else {
    echo json_encode(["status" => "error", "message" => "Admin not found"]);
}
?>
