<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once('../../config/connect.php');

$query = "SELECT product_id, product_title, product_price, product_image1 
          FROM products 
          order by rand() LIMIT 0,25";

$result = mysqli_query($con, $query);

$products = [];
while($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

echo json_encode($products);
?>
