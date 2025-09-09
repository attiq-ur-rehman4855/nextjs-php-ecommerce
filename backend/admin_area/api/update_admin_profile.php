<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include_once('../../config/connect.php');


$admin_id = $_POST['admin_id'] ?? '';
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';

if (!$admin_id || !$name || !$email || !$phone) {
    echo json_encode(["status" => "error", "message" => "All fields except image are required."]);
    exit;
}

// Image upload handling
$image_sql = "";
if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    $image_name = time() . "_" . basename($_FILES['image']['name']);
    $target_path = "../admin_images/" . $image_name;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_path)) {
        $image_sql = ", image='$image_name'";
    }
}

// Update query
$update_query = "UPDATE admin_signup 
                 SET name='$name', email='$email', phone='$phone' $image_sql 
                 WHERE id='$admin_id'";

if (mysqli_query($con, $update_query)) {
    echo json_encode(["status" => "success", "message" => "Profile updated successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update profile."]);
}
?>
