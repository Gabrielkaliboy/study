<?php
$fo=5;
$bar=&$fo;
$bar=6;
//$fo也变为了6
echo $fo."<br>";
echo $bar
?>