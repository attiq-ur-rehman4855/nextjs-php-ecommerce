<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
include_once('../../config/connect.php');

$product_id = $_POST['product_id'];

// Delete query
$query = "DELETE FROM products WHERE product_id='$product_id'";
if(mysqli_query($con, $query)) {
    echo json_encode(['status' => 'success', 'message' => 'Product deleted successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete product']);
}
?>
