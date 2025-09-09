<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user_id']) || !isset($data['items']) || !isset($data['total']) || !isset($data['payment_method']) || !isset($data['billing'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required data']);
    exit();
}

$user_id = $data['user_id'];
$total_amount = $data['total'];
$payment_method = $data['payment_method'];
$fullname = $data['billing']['fullname'];
$email = $data['billing']['email'];
$phone = $data['billing']['phone'];
$user_address = $data['billing']['address'];
$city = $data['billing']['city'];
$country = $data['billing']['country'];
$zip = $data['billing']['zip'];

$order_status = "Pending";
$created_at = date("Y-m-d H:i:s");

// Step 1: Insert into orders table
$order_sql = "INSERT INTO orders (user_id, fullname, email, phone, user_address, city, country, zip_code, total_amount, payment_method, order_status, created_at) 
              VALUES ('$user_id', '$fullname', '$email', '$phone', '$user_address', '$city', '$country', '$zip', '$total_amount', '$payment_method', '$order_status', '$created_at')";

$result = mysqli_query($con, $order_sql);

if ($result) {
    // Step 2: Get newly inserted order ID
    $order_id = mysqli_insert_id($con);

    // Step 3: Get cart items of this user
    $cart_sql = "SELECT product_id, quantity FROM cart_items WHERE user_id = '$user_id'";
    $cart_result = mysqli_query($con, $cart_sql);

    while ($cart_row = mysqli_fetch_assoc($cart_result)) {
        $product_id = $cart_row['product_id'];
        $quantity = $cart_row['quantity'];

        // Step 4: Get product name and price from products table
        $product_sql = "SELECT product_title AS product_name, product_price AS price FROM products WHERE product_id = '$product_id'";
        $product_result = mysqli_query($con, $product_sql);

        if ($product_row = mysqli_fetch_assoc($product_result)) {
            $product_name = $product_row['product_name'];
            $price = $product_row['price'];
            $subtotal = $price * $quantity;

            // Step 5: Insert into order_items table
            $insert_item_sql = "INSERT INTO order_items (order_id, product_id, product_name, price, quantity, subtotal) 
                                VALUES ('$order_id', '$product_id', '$product_name', '$price', '$quantity', '$subtotal')";
            mysqli_query($con, $insert_item_sql);
        }
    }

    // Step 6: Clear cart
    mysqli_query($con, "DELETE FROM cart_items WHERE user_id = '$user_id'");

    echo json_encode(['status' => 'success', 'message' => 'Order placed successfully!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to place order.']);
}
?>
