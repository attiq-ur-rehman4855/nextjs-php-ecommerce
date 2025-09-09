<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php');

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

$old_password = $data['old_password'] ?? '';
$new_password = $data['new_password'] ?? '';
$admin_id = $data['admin_id'] ?? ''; // Frontend se bheja gaya admin_id

if (!$old_password || !$new_password || !$admin_id) {
    echo json_encode(["message" => "All fields are required."]);
    exit;
}

// Fetch current password from DB
$sql = "SELECT password FROM admin_signup WHERE id = '$admin_id'";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) === 0) {
    echo json_encode(["message" => "Admin not found."]);
    exit;
}

$row = mysqli_fetch_assoc($result);
$current_password = $row['password'];

// Check old password
if (!password_verify($old_password, $current_password)) {
    echo json_encode(["message" => "Old password is incorrect."]);
    exit;
}

// Hash new password
$hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

// Update in DB
$update_sql = "UPDATE admin_signup SET password = '$hashed_password' WHERE id = '$admin_id'";
if (mysqli_query($con, $update_sql)) {
    echo json_encode(["message" => "Password updated successfully."]);
} else {
    echo json_encode(["message" => "Error updating password."]);
}
