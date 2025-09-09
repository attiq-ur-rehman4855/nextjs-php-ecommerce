<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once('../../config/connect.php');

$id = $_GET['id'];

$query = "SELECT * FROM products WHERE product_id='$id'";
$result = mysqli_query($con, $query);

if(mysqli_num_rows($result) > 0){
    $product = mysqli_fetch_assoc($result);
    echo json_encode($product);
} else {
    echo json_encode(['message' => 'Product not found']);
}
?>
