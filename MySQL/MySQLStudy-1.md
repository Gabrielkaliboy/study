教程地址：http://www.runoob.com/mysql/mysql-install.html
使用的mysql图像化管理软件：HeidiSQL
下载地址：https://www.heidisql.com/
#### php链接及读取写入mysql数据库的常用代码

##### 1. 为了更好的数据库链接一般会将数据库链接所涉及的值定义成变量

```php
$mysql_server_name='localhost'; //改成自己的mysql数据库服务器

$mysql_username='root'; //改成自己的mysql数据库用户名

$mysql_password='123456'; //改成自己的mysql数据库密码

$mysql_database='Mydb'; //改成自己的mysql数据库名
```
可以将上面的代码放入一个名字为db_config.php,那么其他页面调用`require("db_config.php);`


##### 2.链接数据库
```php
$conn=mysql_connect($mysql_server_name,$mysql_username,$mysql_password) or die("error connecting") ; //连接数据库

mysql_query("set names 'utf8'"); //数据库输出编码 应该与你的数据库编码保持一致.建议用UTF-8 国际标准编码.

mysql_select_db($mysql_database); //打开数据库

$sql ="select * from news "; //SQL语句

$result = mysql_query($sql,$conn); //查询

```


##### 3.读取表中的内容，可以用while或者for
```php
while($row = mysql_fetch_array($result))

{

echo "<div style=\"height:24px; line-height:24px; font-weight:bold;\">"; //排版代码

echo $row['Topic'] . "<br/>";

echo "</div>"; //排版代码

}

```

##### 4.写入数据库
```php
$conn=mysql_connect($mysql_server_name,$mysql_username,$mysql_password); //连接数据库

mysql_query("set names 'utf8'"); //数据库输出编码

mysql_select_db($mysql_database); //打开数据库

$sql = "insert into messageboard (Topic,Content,Enabled,Date) values ('$Topic','$Content','1','2011-01-12')";

mysql_query($sql);

mysql_close(); //关闭MySQL连接
```


#### mysql链接
##### 1. 使用mysql Command Line Client
打开以后他会让你输入密码：root
我们输入root以后，他会返回下面的结果
```cmd
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 5.5.50 MySQL Community Server (GPL)

Copyright (c) 2000, 2016, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```

退出：输入 `exit`


##### 2.使用php脚本链接数据库
函数： `mysqli_connect()` 
语法：`mysqli_connect(host,username,password,dbname,port,socket);`
参数说明：
- host：主机名或者IP地址
- username：mysql用户名
- password：mysql密码
- dbname:默认使用的数据库
- port：连接到mysql服务器的端口号
- socket：规定socket或要使用自己命名的pipe

函数：`mysqli_close`
参数：该函数只有一个参数为 mysqli_connect() 函数创建连接成功后返回的 MySQL 连接标识符。
功能：断开与mysql数据库的链接，通常不需要自己主动关闭，因为已打开的非持久链接会在脚本执行完毕以后自动关闭

eg
```php
<?php
$dbhost = '127.0.0.1:3366';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('Could not connect: ' . mysqli_error());
}
echo '数据库连接成功！';
mysqli_close($conn);
?>
```


#### 创建mysql数据库
##### 使用php脚本创建数据库
函数：mysqli_query(connection,query,resultmode);
参数：
- connection：规定要使用的mysql链接
- query：规定查询字符串
- resultmode:可选，一个常量。可以是下面值中的任意一个：
	- MYSQLI_USER_RESULT:如果需要检索大量数据，就用这个
	- MYSQLI_STORE_RESULT:默认


```php
<?php
$dbhost = '127.0.0.1:3366';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
  die('连接错误: ' . mysqli_error($conn));
}
echo '连接成功<br />';
$sql = 'CREATE DATABASE RUNOOB';
$retval = mysqli_query($conn,$sql );
if(! $retval )
{
    die('创建数据库失败: ' . mysqli_error($conn));
}
echo "数据库 RUNOOB 创建成功\n";
mysqli_close($conn);
?>
```
返回结果：
连接成功
数据库 RUNOOB 创建成功


在heidi里面刷新一下，可以看到多了一个runoob

如果数据库已存在，执行后，返回如下结果：
连接成功
创建数据库失败: Can't create database 'runoob'; database exists


#### 删除mysql数据库

##### 使用php 脚本删除数据库
函数：mysqli_query(connection,query,resultmode);
参数：
- connection:规定要使用的mysql链接
- query：规定查询字符串
- resultmode:一个常量，可选
	- MYSQLI_USE_RESULT:如果需要检索大量数据就用这个
	- MYSQLI_STORE_RESULT:默认

```php
<?php
$dbhost = '127.0.0.1:3366';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
  die('连接错误: ' . mysqli_error($conn));
}
echo '连接成功<br />';
$sql = 'Drop DATABASE RUNOOB';
$retval = mysqli_query($conn,$sql );
if(! $retval )
{
    die('删除数据库失败: ' . mysqli_error($conn));
}
echo "数据库 RUNOOB 删除成功\n";
mysqli_close($conn);
?>
```
结果：
连接成功
数据库 RUNOOB 删除成功
**注意：**
 在使用PHP脚本删除数据库时，不会出现确认是否删除信息，会直接删除指定数据库，所以你在删除数据库时要特别小心


##### 选择数据库
##### php脚本选择数据库

函数：mysqli_select_db(connection,dbname)
作用：用来选择一个数据库，函数在执行成功后返回true，否则返回false
参数：
- connection：规定使用的mysql链接
- dbname:规定要使用的默认数据库·

eg:
```php
<?php
$dbhost = '127.0.0.1:3366';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
  die('连接错误: ' . mysqli_error($conn));
}
echo '连接成功<br />';
$result=mysqli_select_db($conn,'RUNOOB');
if(! $result){
	die("筛选失败". mysqli_error($conn));
}
echo "筛选成功";
?>
```
结果：
连接成功
筛选成功


#### mysql数据类型
- mysql中定义数据字段的类型对于数据库的优化非常重要
- mysql支持多种类型，大致分为三类：数值、日期/时间、字符串（字符）类型

###### 数值类型
关键字INT是INTEGER的同义词，DEC是DECIMAL的同义词
- TINITY：小整数值
- SMALLINT：大正数值
- MEDIUMINT:大正数值
- INT或者INTEGER:大正数值 
- BIGINT：极大整数值
- FLOAT：单精度浮点数值
- DOUBLE：双精度浮点数值
- DECIMAL：小数值

##### 日期或者时间类型

- DATE：YYYY-MM-DD 日期值
- TIME：HH：MM：SS 时间值或者持续时间
- YEAR：YYYY 年分值
- DATETIME：YYYY-MM—DD HH：MM：SS 混合日期或者时间值
- TIMESTAMP：YYYYMMDD HHMMSS 混合日期或者时间值，时间戳


##### 字符串类型
- CHAR：定长字符串
- VAECHAR：变长字符
- TINYBLOG：不超过255个字符的二进制字符串
- TINYTEXT：短文本字符串
- BLOG：二进制形式的长文本数据
- TEXT：长文本数据
- MEDIUMBLOB：二进制形式的中等长度文本数据
- MEDIUMTEXT：中等长度文本数据
- LONGBLOG：二进制形式的极大文本数据
- LONGTEXT:极大文本数据


#### 创建数据库表
##### php创建数据库表
函数：mysqli_query(connection，query，resultmode)
说明：成功返回true，否则返回false
参数：
- connection：规定要使用的mysql链接
- query：查询字符串
- resultmode：
	- MYSQLI_USE_RESULT(如果需要检索大量数据就用这个)
	- MYSQLI_STORE_RESULT(默认)


eg:
```php
<?php
$dbhost = '127.0.0.1:3366';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
  die('连接错误: ' . mysqli_error($conn));
}
echo '连接成功<br />';


$sql = "CREATE TABLE runoob_tbl( ".
        "runoob_id INT NOT NULL AUTO_INCREMENT, ".
        "runoob_title VARCHAR(100) NOT NULL, ".
        "runoob_author VARCHAR(40) NOT NULL, ".
        "submission_date DATE, ".
        "PRIMARY KEY ( runoob_id ))ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
mysqli_select_db( $conn, 'RUNOOB' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('数据表创建失败: ' . mysqli_error($conn));
}
echo "数据表创建成功\n";
mysqli_close($conn);
?>
```
输出：
连接成功
数据表创建成功