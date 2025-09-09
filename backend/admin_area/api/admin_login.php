<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php');

$email = $_POST['email'];
$password = $_POST['password'];

// Check if email exists
$query = "SELECT * FROM admin_signup WHERE email='$email'";
$result = mysqli_query($con, $query);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $hashedPassword = $row['password'];

    // Verify password
    if (password_verify($password, $hashedPassword)) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Login successful',
            'name' => $row['name'] ,
            'id' => $row['id'] 
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Incorrect password']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Email not found']);
}
