<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once('../../config/connect.php');


if ($con->connect_error) {
  echo json_encode(["error" => "Database connection  failed"]);
  exit;
}

$data = [];

// Total Products
$productResult = $con->query("SELECT COUNT(*) AS total FROM products");
$data['totalProducts'] = $productResult->fetch_assoc()['total'];

// Total Categories
$categoryResult = $con->query("SELECT COUNT(*) AS total FROM categories");
$data['totalCategories'] = $categoryResult->fetch_assoc()['total'];

// Total Brands
$brandResult = $con->query("SELECT COUNT(*) AS total FROM brands");
$data['totalBrands'] = $brandResult->fetch_assoc()['total'];

// Total Orders
$orderResult = $con->query("SELECT COUNT(*) AS total FROM orders");
$data['totalOrders'] = $orderResult->fetch_assoc()['total'];

// Total Customers
$userResult = $con->query("SELECT COUNT(*) AS total FROM users");
$data['totalCustomers'] = $userResult->fetch_assoc()['total'];

// Total Earnings
$earningResult = $con->query("SELECT SUM(total_amount) AS total FROM orders");
$data['totalEarnings'] = $earningResult->fetch_assoc()['total'] ?? 0;

echo json_encode($data);
?>
