<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once('../../config/connect.php');

// Fetch products without joining categories/brands
$query = "SELECT product_id, product_title, product_price, product_image1 FROM products";

$result = mysqli_query($con, $query);

$products = [];
while($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

echo json_encode($products);
?>
