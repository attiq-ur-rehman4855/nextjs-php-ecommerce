<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

include_once('../../config/connect.php');

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"] ?? "";
$session_id = $data["session_id"] ?? "";
$billing = $data["billing"] ?? [];

if (!$user_id || !$session_id || empty($billing)) {
  echo json_encode(["status" => "error", "message" => "Missing data"]);
  exit;
}

// ✅ Use billing info from frontend
$fullname = $billing['fullname'];
$email = $billing['email'];
$phone = $billing['phone'];
$user_address = $billing['address'];
$city = $billing['city'];
$country = $billing['country'];
$zip_code = $billing['zip'];

// 🛒 Get cart items
$cart_items = [];
$total = 0;

$cart_query = "SELECT * FROM cart_items WHERE user_id = '$user_id'";
$result_cart = mysqli_query($con, $cart_query);

if (!$result_cart || mysqli_num_rows($result_cart) == 0) {
  echo json_encode(["status" => "error", "message" => "Cart is empty"]);
  exit;
}

while ($row = mysqli_fetch_assoc($result_cart)) {
  $cart_items[] = $row;
  $product_id = $row['product_id'];

  // Get product price from products table
  $product_query = "SELECT * FROM products WHERE product_id = '$product_id'";
  $result_product = mysqli_query($con, $product_query);
  $product_row = mysqli_fetch_assoc($result_product);

  $total += $product_row['product_price'] * $row['quantity'];
}

// 📝 Insert order
$order_query = "
  INSERT INTO orders (
    user_id, fullname, email, phone, user_address, city, country, zip_code,
    total_amount, payment_method, order_status, created_at
  ) VALUES (
    '$user_id', '$fullname', '$email', '$phone', '$user_address', '$city', '$country', '$zip_code',
    '$total', 'online', 'pending', NOW()
  )
";

if (mysqli_query($con, $order_query)) {
  $order_id = mysqli_insert_id($con); // ✅ Get new order ID

  // 🔁 Loop through cart and insert into order_items
  foreach ($cart_items as $item) {
    $product_id = $item['product_id'];
    $quantity = $item['quantity'];

    // Get product name & price again (optional optimization: cache this)
    $product_sql = "SELECT product_title AS product_name, product_price AS price FROM products WHERE product_id = '$product_id'";
    $product_result = mysqli_query($con, $product_sql);

    if ($product_row = mysqli_fetch_assoc($product_result)) {
      $product_name = $product_row['product_name'];
      $price = $product_row['price'];
      $subtotal = $price * $quantity;

      // Insert into order_items table
      $insert_item_sql = "INSERT INTO order_items (order_id, product_id, product_name, price, quantity, subtotal)
                          VALUES ('$order_id', '$product_id', '$product_name', '$price', '$quantity', '$subtotal')";
      mysqli_query($con, $insert_item_sql);
    }
  }

  // 🧹 Clear user's cart
  mysqli_query($con, "DELETE FROM cart_items WHERE user_id = '$user_id'");

  echo json_encode(["status" => "success", "message" => "Order placed successfully"]);
} else {
  echo json_encode(["status" => "error", "message" => "Failed to place order"]);
}
?>
