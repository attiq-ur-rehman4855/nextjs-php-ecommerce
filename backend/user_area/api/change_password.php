<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php');

// Receive raw POST JSON data
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$current_password = $data['current_password'];
$new_password = $data['new_password'];

// Get user from database
$sql = "SELECT * FROM users WHERE id = $user_id";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) === 1) {
    $user = mysqli_fetch_assoc($result);
    $hashedPassword = $user['password'];

    // Check current password
    if (password_verify($current_password, $hashedPassword)) {
        // Hash new password
        $newHashedPassword = password_hash($new_password, PASSWORD_DEFAULT);

        // Update password
        $update = "UPDATE users SET password = '$newHashedPassword' WHERE id = $user_id";
        if (mysqli_query($con, $update)) {
            echo json_encode(['status' => 'success', 'message' => 'Password updated successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update password']);
        }
    } else {
        echo json_encode(['status' => 'incorrect', 'message' => 'Old password is incorrect']);
    }
} else {
    echo json_encode(['status' => 'not_found', 'message' => 'User not found']);
}
?>
