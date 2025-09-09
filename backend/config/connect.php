<?php

$con = mysqli_connect('localhost','root','','ecommerce-nextjs');
if(!$con){
    throw new Exception('Connection failed: ' . mysqli_connect_error());
   // die(mysqli_error($con));
}
?>


