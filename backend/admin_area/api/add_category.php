<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include_once('../../config/connect.php');

$category_title = $_POST['category_title'];

// Validation: Check empty
if(empty($category_title)){
    echo json_encode(['status' => 'error', 'message' => 'Category title is required']);
    exit;
}

// Check duplicate
$checkQuery = "SELECT * FROM categories WHERE category_title='$category_title'";
$result = mysqli_query($con, $checkQuery);

if(mysqli_num_rows($result) > 0){
    echo json_encode(['status' => 'error', 'message' => 'Category already exists']);
    exit;
}

// Insert new category
$insertQuery = "INSERT INTO categories (category_title) VALUES ('$category_title')";
if(mysqli_query($con, $insertQuery)){
    echo json_encode(['status' => 'success', 'message' => 'Category added successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add category']);
}
?>
