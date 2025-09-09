<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once('../../config/connect.php');

$query = "SELECT * FROM brands";
$result = mysqli_query($con, $query);

$brands = [];

while($row = mysqli_fetch_assoc($result)){
    $brands[] = $row;
}

echo json_encode($brands);
?>
