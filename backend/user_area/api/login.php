<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php');

$email = $_POST['email'];
$password = $_POST['password'];

// Check if email exists
$query = "SELECT * FROM users WHERE email='$email'";
$result = mysqli_query($con, $query);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $hashedPassword = $row['password'];

    // Verify password
    if (password_verify($password, $hashedPassword)) {
        echo json_encode(['status' => 'success', 'message' => 'Login successful', 'user_id' => $row['id'], 'user_name' => $row['name'], 'user_email' => $row['email'], 'user_phone' => $row['phone']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Incorrect password']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Email not found']);
}
