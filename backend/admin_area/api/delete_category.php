<?php
// 1. CORS Headers (Next.js/Vercel se connection allow krne k liye)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
include_once('../../config/connect.php');

$category_id = $_POST['category_id'];

if (empty($category_id)) {
    echo json_encode(['status' => 'error', 'message' => 'Category ID is required']);
    exit;
}

// First delete all products of this category
$deleteProducts = "DELETE FROM products WHERE category_id='$category_id'";
mysqli_query($con, $deleteProducts);

// Then delete the category
$query = "DELETE FROM categories WHERE category_id='$category_id'";
if (mysqli_query($con, $query)) {
    echo json_encode(['status' => 'success', 'message' => 'Category and its products deleted successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete category']);
}
