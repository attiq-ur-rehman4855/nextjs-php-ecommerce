<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php');

// Collect data from POST
$title       = $_POST['title'];
$description = $_POST['description'];
$price       = $_POST['price'];
$category_id = $_POST['category'];
$brand_id    = $_POST['brand'];
$keywords    = $_POST['keywords'];

// Handle Images
$image1Name = $_FILES['image1']['name'];
$image2Name = $_FILES['image2']['name'];
$image3Name = $_FILES['image3']['name'];

$image1Tmp  = $_FILES['image1']['tmp_name'];
$image2Tmp  = $_FILES['image2']['tmp_name'];
$image3Tmp  = $_FILES['image3']['tmp_name'];

// Move uploaded files to 'product_images' folder
$folder = "../product_images/";
move_uploaded_file($image1Tmp, $folder . $image1Name);
move_uploaded_file($image2Tmp, $folder . $image2Name);
move_uploaded_file($image3Tmp, $folder . $image3Name);

// Insert into database
$query = "INSERT INTO products 
(product_title, product_desc, product_price, product_image1, product_image2, product_image3, category_id, brand_id, product_keywords, created_at)
VALUES
('$title', '$description', '$price', '$image1Name', '$image2Name', '$image3Name', '$category_id', '$brand_id', '$keywords', NOW())";

if(mysqli_query($con, $query)){
    echo json_encode(['status' => 'success', 'message' => 'Product added successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add product']);
}
?>
