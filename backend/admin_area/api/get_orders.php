<?php
// 1. CORS Headers (Next.js/Vercel se connection allow krne k liye)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

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
