<?php
// 1. CORS Headers (Next.js/Vercel se connection allow krne k liye)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

include_once('../../config/connect.php');

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $query = "DELETE FROM cart_items WHERE id = $id";

    if (mysqli_query($con, $query)) {
        echo json_encode(['status' => 'success', 'message' => 'Item removed from cart']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to remove item']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
