<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include_once('../../config/connect.php');

$brand_title = $_POST['brand_title'];

// Validation: Check empty
if(empty($brand_title)){
    echo json_encode(['status' => 'error', 'message' => 'Brand title is required']);
    exit;
}

// Check duplicate
$checkQuery = "SELECT * FROM brands WHERE brand_title='$brand_title'";
$result = mysqli_query($con, $checkQuery);

if(mysqli_num_rows($result) > 0){
    echo json_encode(['status' => 'error', 'message' => 'Brand already exists']);
    exit;
}

// Insert new Brand
$insertQuery = "INSERT INTO brands (brand_title) VALUES ('$brand_title')";
if(mysqli_query($con, $insertQuery)){
    echo json_encode(['status' => 'success', 'message' => 'Brand added successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add brand']);
}
?>
