<?php
// 1. CORS Headers (Next.js/Vercel se connection allow krne k liye)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
include_once('../../config/connect.php');

$id = $_GET['id'];

$query = "SELECT 
            p.*, 
            c.category_title, 
            b.brand_title 
          FROM products p
          JOIN categories c ON p.category_id = c.category_id
          JOIN brands b ON p.brand_id = b.brand_id
          WHERE p.product_id = $id";

$result = mysqli_query($con, $query);
if ($row = mysqli_fetch_assoc($result)) {
    echo json_encode($row);
} else {
    echo json_encode(['error' => 'Product not found']);
}
?>
