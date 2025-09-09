<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php'); 


$sql = "SELECT id, user_id, fullname, email, phone, total_amount, payment_method, order_status, created_at
        FROM orders";

$result = mysqli_query($con, $sql);

$orders = [];
if ($result && mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        // normalize values if needed
        $orders[] = $row;
    }
}

echo json_encode($orders);
exit;
?>
