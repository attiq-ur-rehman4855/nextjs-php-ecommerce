<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
include_once('../../config/connect.php');

$id          = $_POST['id'];
$title       = $_POST['title'];
$desc        = $_POST['desc'];
$price       = $_POST['price'];
$category_id = $_POST['category_id'];
$brand_id    = $_POST['brand_id'];
$keywords    = $_POST['keywords'];

$image1 = $_FILES['image1']['name'] ?? '';
$image2 = $_FILES['image2']['name'] ?? '';
$image3 = $_FILES['image3']['name'] ?? '';

if ($image1) {
    move_uploaded_file($_FILES['image1']['tmp_name'], "../product_images/$image1");
    $updateImage1 = ", product_image1='$image1'";
} else {
    $updateImage1 = "";
}

if ($image2) {
    move_uploaded_file($_FILES['image2']['tmp_name'], "../product_images/$image2");
    $updateImage2 = ", product_image2='$image2'";
} else {
    $updateImage2 = "";
}

if ($image3) {
    move_uploaded_file($_FILES['image3']['tmp_name'], "../product_images/$image3");
    $updateImage3 = ", product_image3='$image3'";
} else {
    $updateImage3 = "";
}

$updateQuery = "UPDATE products SET 
                product_title='$title',
                product_desc='$desc',
                product_price='$price',
                category_id='$category_id',
                brand_id='$brand_id',
                product_keywords='$keywords'
                $updateImage1 $updateImage2 $updateImage3
                WHERE product_id='$id'";

if(mysqli_query($con, $updateQuery)){
    echo json_encode(['status'=>'success','message'=>'Product updated successfully']);
} else {
    echo json_encode(['status'=>'error','message'=>'Product update failed']);
}
?>
