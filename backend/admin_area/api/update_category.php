<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include_once('../../config/connect.php');

$category_id = $_POST['category_id'];
$category_title = $_POST['category_title'];

if(empty($category_id) || empty($category_title)){
    echo json_encode(['status' => 'error', 'message' => 'Required fields are missing']);
    exit;
}

$query = "UPDATE categories SET category_title='$category_title' WHERE category_id='$category_id'";
if(mysqli_query($con, $query)){
    echo json_encode(['status' => 'success', 'message' => 'Category updated successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Update failed']);
}
?>
