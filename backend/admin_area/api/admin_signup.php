<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include_once('../../config/connect.php');

// Collect data from POST
$name     = $_POST['name'];
$email    = $_POST['email'];
$phone    = $_POST['phone'];
$password = $_POST['password'];

// Image handling
$imageName = $_FILES['image']['name'];
$imageTmp  = $_FILES['image']['tmp_name'];

// Check if email already exists
$checkQuery = "SELECT * FROM admin_signup WHERE email='$email'";
$result = mysqli_query($con, $checkQuery);

if (mysqli_num_rows($result) > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Email already exists']);
    exit;
}

// Password Hashing
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Move uploaded image
move_uploaded_file($imageTmp, "../admin_images/$imageName");

// Insert user into database (store hashed password)
$insertQuery = "INSERT INTO admin_signup (name, email, phone,image,password) 
                VALUES ('$name', '$email', '$phone', '$imageName', '$hashedPassword')";

if (mysqli_query($con, $insertQuery)) {
    echo json_encode(['status' => 'success', 'message' => 'Admin registered successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Signup failed']);
}
