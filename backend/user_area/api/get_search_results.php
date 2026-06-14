<?php
// 1. CORS Headers (Next.js/Vercel se connection allow krne k liye)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

include_once('../../config/connect.php');

// Get raw search query
$searchQuery = isset($_GET['query']) ? $_GET['query'] : '';

if ($searchQuery == '') {
    echo json_encode([]);
    exit;
}

// Simple query without escaping
$query = "SELECT * FROM products 
          WHERE product_title LIKE '%$searchQuery%' 
          OR product_keywords LIKE '%$searchQuery%'";

$result = mysqli_query($con, $query);

$products = [];
while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

echo json_encode($products);
?>
