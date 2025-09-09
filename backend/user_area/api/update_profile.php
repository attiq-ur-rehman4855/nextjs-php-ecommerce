<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include_once('../../config/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_POST['user_id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    // Fetch current user image from DB
    $fetch_query = "SELECT image FROM users WHERE id = $user_id";
    $result = mysqli_query($con, $fetch_query);
    $row = mysqli_fetch_assoc($result);
    $current_image = $row['image'];

    $new_image_name = $current_image;

    // Handle new image upload
    if (!empty($_FILES['image']['name'])) {
        $new_image_name = time() . "_" . basename($_FILES['image']['name']);
        $target_path = "../user_images/" . $new_image_name;
        move_uploaded_file($_FILES['image']['tmp_name'], $target_path);
    }

    // Update query 
    $update_query = "UPDATE users SET name='$name', email='$email', phone='$phone', image='$new_image_name' WHERE id=$user_id";
    $update_result = mysqli_query($con, $update_query);

    if ($update_result) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update user"]);
    }

    mysqli_close($con);
}
?>
