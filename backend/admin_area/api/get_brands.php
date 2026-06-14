<?php
// 1. CORS Headers (Next.js/Vercel se connection allow krne k liye)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
include_once('../../config/connect.php');

$query = "SELECT * FROM brands";
$result = mysqli_query($con, $query);

$brands = [];

while($row = mysqli_fetch_assoc($result)){
    $brands[] = $row;
}

echo json_encode($brands);
?>
