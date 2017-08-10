<?php

$conn = mysqli_connect('127.0.0.1','root','','kaifanla');

//连接新浪云数据库，要按照新浪云的要求去连接数据库：
//$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER,  SAE_MYSQL_PASS,    SAE_MYSQL_DB,     SAE_MYSQL_PORT);

mysqli_query($conn,'set names utf8');


?>