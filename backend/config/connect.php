<?php
// 1. CORS Headers (Aapne pehle hi bilkul sahi lagaye hue hain, is se koi CORS issue nahi aayega)
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// 2. Aiven Database Credentials
$servername = "mysql-3eeb074b-my-nextjs-ecommerce-db.e.aivencloud.com"; 
$username   = "avnadmin";           

// AwardSpace ke liye hum direct apna real password yahan daal rahe hain
$password   = "";           

$dbname     = "defaultdb"; 
$port       = 23193; 

// 3. Database Connection
$con = mysqli_connect($servername, $username, $password, $dbname, $port);

if(!$con){
    throw new Exception('Connection failed: ' . mysqli_connect_error());
}
?>