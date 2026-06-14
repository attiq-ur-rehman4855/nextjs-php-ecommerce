<?php
// 1. CORS Headers (Next.js/Vercel se connection allow krne k liye)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
include_once('../../config/connect.php');

$brand_id = $_GET['brand_id'];

$query = "SELECT * FROM brands WHERE brand_id='$brand_id'";
$result = mysqli_query($con, $query);

if(mysqli_num_rows($result) > 0){
    $row = mysqli_fetch_assoc($result);
    echo json_encode($row);
} else {
    echo json_encode(['error' => 'Brand not found']);
}
?>
    