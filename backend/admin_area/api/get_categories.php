<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once('../../config/connect.php');

$query = "SELECT * FROM categories";
$result = mysqli_query($con, $query);

$categories = [];

while($row = mysqli_fetch_assoc($result)){
    $categories[] = $row;
}

echo json_encode($categories);
?>
