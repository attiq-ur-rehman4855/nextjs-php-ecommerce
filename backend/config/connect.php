<?php

// $con = mysqli_connect('localhost','root','','ecommerce-nextjs');
// if(!$con){
//     throw new Exception('Connection failed: ' . mysqli_connect_error());
//    // die(mysqli_error($con));
// }
?>

<?php
// 1. CORS Headers
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// 2. Aiven Database Credentials (Password hum Environment Variable se uthayenge)
$servername = "mysql-3eeb074b-my-nextjs-ecommerce-db.e.aivencloud.com"; 
$username   = "avnadmin";           

// Agar Render par ho to environment variable se le, nahi to local password (jo k khali hai)
$password   = getenv('AIVEN_DB_PASSWORD') ?: "";           

$dbname     = "defaultdb"; 
$port       = 23193; 

// 3. Database Connection
$con = mysqli_connect($servername, $username, $password, $dbname, $port);

if(!$con){
    throw new Exception('Connection failed: ' . mysqli_connect_error());
}
?>