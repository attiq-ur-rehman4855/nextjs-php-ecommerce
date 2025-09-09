<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php');

$id = $_POST['user_id'];
$product_id = $_POST['product_id'];
$quantity = isset($_POST['quantity']) ? $_POST['quantity'] : 1;

$check = "SELECT * FROM cart_items WHERE user_id = $id AND product_id = $product_id";
$result = mysqli_query($con, $check);

if (mysqli_num_rows($result) > 0) {
    echo json_encode(['status' => 'already_exists', 'message' => 'Item already exists in the cart']);
} else {
    $query = "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($id, $product_id, $quantity)";
    if (mysqli_query($con, $query)) {
        echo json_encode(['status' => 'success', 'message' => 'Item successfully added to your cart']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add item']);
    }
}
?>
