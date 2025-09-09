<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include_once('../../config/connect.php');

$brand_id = $_POST['brand_id'];
$brand_title = $_POST['brand_title'];

if(empty($brand_id) || empty($brand_title)){
    echo json_encode(['status' => 'error', 'message' => 'Required fields are missing']);
    exit;
}

$query = "UPDATE brands SET brand_title='$brand_title' WHERE brand_id='$brand_id'";
if(mysqli_query($con, $query)){
    echo json_encode(['status' => 'success', 'message' => 'Brand updated successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Update failed']);
}
?>
