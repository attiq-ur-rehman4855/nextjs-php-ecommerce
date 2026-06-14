<?php
// 1. CORS Headers (Next.js/Vercel se connection allow krne k liye)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
include_once('../../config/connect.php');

$brand_id = $_POST['brand_id'];

if (empty($brand_id)) {
    echo json_encode(['status' => 'error', 'message' => 'Brand ID is required']);
    exit;
}

// Pehle delete all products belonging to this brand
$deleteProducts = "DELETE FROM products WHERE brand_id='$brand_id'";
mysqli_query($con, $deleteProducts);

// Ab delete brand
$query = "DELETE FROM brands WHERE brand_id='$brand_id'";
if (mysqli_query($con, $query)) {
    echo json_encode(['status' => 'success', 'message' => 'Brand and its products deleted successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete brand']);
}
