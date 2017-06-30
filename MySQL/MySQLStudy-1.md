教程地址：http://www.runoob.com/mysql/mysql-install.html
使用的mysql图像化管理软件：HeidiSQL
下载地址：https://www.heidisql.com/
#### 1.php链接及读取写入mysql数据库的常用代码

##### 1.1 为了更好的数据库链接一般会将数据库链接所涉及的值定义成变量

```php
$mysql_server_name='localhost'; //改成自己的mysql数据库服务器

$mysql_username='root'; //改成自己的mysql数据库用户名

$mysql_password='123456'; //改成自己的mysql数据库密码

$mysql_database='Mydb'; //改成自己的mysql数据库名
```
可以将上面的代码放入一个名字为db_config.php,那么其他页面调用`require("db_config.php);`


##### 1.2链接数据库
```php
$conn=mysql_connect($mysql_server_name,$mysql_username,$mysql_password) or die("error connecting") ; //连接数据库

mysql_query("set names 'utf8'"); //数据库输出编码 应该与你的数据库编码保持一致.建议用UTF-8 国际标准编码.

mysql_select_db($mysql_database); //打开数据库

$sql ="select * from news "; //SQL语句

$result = mysql_query($sql,$conn); //查询

```


##### 1.3读取表中的内容，可以用while或者for
```php
while($row = mysql_fetch_array($result))

{

echo "<div style=\"height:24px; line-height:24px; font-weight:bold;\">"; //排版代码

echo $row['Topic'] . "<br/>";

echo "</div>"; //排版代码

}

```

##### 1.4写入数据库
```php
$conn=mysql_connect($mysql_server_name,$mysql_username,$mysql_password); //连接数据库

mysql_query("set names 'utf8'"); //数据库输出编码

mysql_select_db($mysql_database); //打开数据库

$sql = "insert into messageboard (Topic,Content,Enabled,Date) values ('$Topic','$Content','1','2011-01-12')";

mysql_query($sql);

mysql_close(); //关闭MySQL连接
```


#### 2.mysql链接
##### 2.1 使用mysql Command Line Client
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


##### 2.2使用php脚本链接数据库
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


#### 3.创建mysql数据库
##### 3.1使用php脚本创建数据库
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


#### 4.删除mysql数据库

##### 4.1使用php 脚本删除数据库
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


##### 5选择数据库
##### 5.1php脚本选择数据库

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


#### 6.mysql 数据类型
- mysql中定义数据字段的类型对于数据库的优化非常重要
- mysql支持多种类型，大致分为三类：数值、日期/时间、字符串（字符）类型

###### 6.1 数值类型
关键字INT是INTEGER的同义词，DEC是DECIMAL的同义词
- TINITY：小整数值
- SMALLINT：大正数值
- MEDIUMINT:大正数值
- INT或者INTEGER:大正数值 
- BIGINT：极大整数值
- FLOAT：单精度浮点数值
- DOUBLE：双精度浮点数值
- DECIMAL：小数值

##### 6.2 日期或者时间类型

- DATE：YYYY-MM-DD 日期值
- TIME：HH：MM：SS 时间值或者持续时间
- YEAR：YYYY 年分值
- DATETIME：YYYY-MM—DD HH：MM：SS 混合日期或者时间值
- TIMESTAMP：YYYYMMDD HHMMSS 混合日期或者时间值，时间戳


##### 6.3 字符串类型
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


#### 7.创建数据库表
##### 7.1 php创建数据库表
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

#### 8.删除数据库表
语法：`mysqli_query(connection,query,resultmode);`
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


$sql = "DROP TABLE runoob_tbl";
mysqli_select_db( $conn, 'RUNOOB' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('数据表删除失败: ' . mysqli_error($conn));
}
echo "数据表删除成功\n";
mysqli_close($conn);
?>
```


#### 9.插入数据

##### 9.1 MYSQLI插入数据
MySQL数据表插入数据通用的 INSERT INTO SQL语法
```mysql
INSERT INTO table_name ( field1, field2,...fieldN )
                       VALUES
                       ( value1, value2,...valueN );
```

##### 9.2使用PHP脚本插入数据
使用mysqli_query()来执行SQL INSERT INTO命令来插入数据，成功返回true，否则返回false

语法：`mysqli_query(connection,query,resultmode);`

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


// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");
 
$runoob_title = '学习 Python';
$runoob_author = 'RUNOOB.COM';
$submission_date = '2016-03-06';
//执行完毕以后刷新数据库可以看到
$sql = "INSERT INTO runoob_tbl ".
        "(runoob_title,runoob_author, submission_date) ".
        "VALUES ".
        "('$runoob_title','$runoob_author','$submission_date')";
 
 
 
mysqli_select_db( $conn, 'RUNOOB' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
  die('无法插入数据: ' . mysqli_error($conn));
}
echo "数据插入成功\n";
mysqli_close($conn);
?>
```

对于含有中文的数据插入，需要添加 mysqli_query($conn , "set names utf8"); 语句。

在数据库里面执行SQL命令`select * from runoob_tbl;`就可以将刚才的命令查出来


#### 10.mysql查询数据
MySQL 数据库使用SQL SELECT语句来查询数据。
select查询的时候语法：
```mysql
SELECT column_name,column_name
FROM table_name
[WHERE Clause]
[OFFSET M ][LIMIT N]
```


##### 10.1 使用php脚本来获取数据
使用 PHP 函数的 `mysqli_query()` 及 `SQL SELECT `命令来获取数据。
该函数用于执行 SQL 命令，然后通过 PHP 函数 `mysqli_fetch_array()` 来使用或输出所有查询的数据。
mysqli_fetch_array() 函数从结果集中取得一行作为关联数组，或数字数组，或二者兼有 返回根据从结果集取得的行生成的数组，如果没有更多行则返回 false。

##### 10.2 使用 mysqli_fetch_array MYSQL_ASSOC 参数获取数据：这个有错误
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


// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");
 
$sql = 'SELECT runoob_id, runoob_title, 
        runoob_author, submission_date
        FROM runoob_tbl';
 
mysqli_select_db( $conn, 'RUNOOB' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
echo '<h2>菜鸟教程 mysqli_fetch_array 测试<h2>';
echo '<table border="1"><tr><td>教程 ID</td><td>标题</td><td>作者</td><td>提交日期</td></tr>';
while($row = mysqli_fetch_array($retval, MYSQL_ASSOC))
{
    echo "<tr><td> {$row['runoob_id']}</td> ".
         "<td>{$row['runoob_title']} </td> ".
         "<td>{$row['runoob_author']} </td> ".
         "<td>{$row['submission_date']} </td> ".
         "</tr>";
}
echo '</table>';
mysqli_close($conn);
?>
```
以上实例中，读取的每行记录赋值给变量 $row，然后再打印出每个值。
注意：记住如果你需要在字符串中使用变量，请将变量置于花括号。

##### 10.3 mysqli_fetch_assoc() 函数来输出数据表 runoob_tbl 的所有记录
这个可以

```php
<?php
$dbhost = '127.0.0.1:3366';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");
 
$sql = 'SELECT runoob_id, runoob_title, 
        runoob_author, submission_date
        FROM runoob_tbl';
 
mysqli_select_db( $conn, 'RUNOOB' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
echo '<h2>菜鸟教程 mysqli_fetch_assoc 测试<h2>';
echo '<table border="1"><tr><td>教程 ID</td><td>标题</td><td>作者</td><td>提交日期</td></tr>';
while($row = mysqli_fetch_assoc($retval))
{
    echo "<tr><td> {$row['runoob_id']}</td> ".
         "<td>{$row['runoob_title']} </td> ".
         "<td>{$row['runoob_author']} </td> ".
         "<td>{$row['submission_date']} </td> ".
         "</tr>";
}
echo '</table>';
mysqli_close($conn);
?>
```

##### 10.4 使用常量 `MYSQL_NUM` 作为 PHP `mysqli_fetch_array()` 函数的第二个参数，返回数字数组：报错！
```php
<?php
$dbhost = '127.0.0.1:3366';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");
 
$sql = 'SELECT runoob_id, runoob_title, 
        runoob_author, submission_date
        FROM runoob_tbl';
 
mysqli_select_db( $conn, 'RUNOOB' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
echo '<h2>菜鸟教程 mysqli_fetch_array 测试<h2>';
echo '<table border="1"><tr><td>教程 ID</td><td>标题</td><td>作者</td><td>提交日期</td></tr>';
while($row = mysqli_fetch_array($retval, MYSQL_NUM))
{
    echo "<tr><td> {$row[0]}</td> ".
         "<td>{$row[1]} </td> ".
         "<td>{$row[2]} </td> ".
         "<td>{$row[3]} </td> ".
         "</tr>";
}
echo '</table>';
mysqli_close($conn);
?>
```

##### 10.5内存释放:报错
在我们执行完 SELECT 语句后，释放游标内存是一个很好的习惯。
可以通过 PHP 函数 mysqli_free_result() 来实现内存的释放。
```php
<?php
$dbhost = '127.0.0.1:3366';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");
 
$sql = 'SELECT runoob_id, runoob_title, 
        runoob_author, submission_date
        FROM runoob_tbl';
 
mysqli_select_db( $conn, 'RUNOOB' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
echo '<h2>菜鸟教程 mysqli_fetch_array 测试<h2>';
echo '<table border="1"><tr><td>教程 ID</td><td>标题</td><td>作者</td><td>提交日期</td></tr>';
while($row = mysqli_fetch_array($retval, MYSQL_NUM))
{
    echo "<tr><td> {$row[0]}</td> ".
         "<td>{$row[1]} </td> ".
         "<td>{$row[2]} </td> ".
         "<td>{$row[3]} </td> ".
         "</tr>";
}
echo '</table>';
// 释放内存
mysqli_free_result($retval);
mysqli_close($conn);
?>
```

#### 11. where语句
我们知道从 MySQL 表中使用 `SQL SELECT` 语句来读取数据。
如需有条件地从表中选取数据，可将 WHERE 子句添加到 SELECT 语句中
语法：
```mysql
SELECT field1, field2,...fieldN FROM table_name1, table_name2...
[WHERE condition1 [AND [OR]] condition2.....
```
- 查询语句中可以使用一个或者多个表，表之间使用逗号分隔，并使用where语句来设定查询条件
- 可以在where语句中指定任何条件
- 可以使用and或or指定一个或多个条件
- where语句也可以用于SQL的DELECT或者UPDATE命令
- WHERE语句类似于程序语言的if条件，根据mysql表中的字段值来读取指定的数据

下面的是操作符，可以用于where语句，假设A=10，B=20
- `=`，检测两个值是否相等，相等返回true，（A=B）返回false
- `<>,!=`,不等于，检测两个值是否相等，如果不相等返回true，（A！=B）true
- `>`,
- `<`
- `>=`
- `<=`


使用主键来作为 WHERE 子句的条件查询是非常快速的。
如果给定的条件在表中没有任何匹配的记录，那么查询不会返回任何数据。


##### 11.1 SQL语句查询
```mysql
SELECT * from runoob_tbl WHERE runoob_author='菜鸟教程';
```
在 runoob_tbl表中查找runoob_author='菜鸟教程'

MySQL 的 WHERE 子句的字符串比较是不区分大小写的。 你可以使用 BINARY 关键字来设定 WHERE 子句的字符串比较是区分大小写的。
`mysql> SELECT * from runoob_tbl WHERE BINARY runoob_author='runoob.com';`


##### 11.2使用php脚本读取数据
可以使用 PHP 函数的 mysqli_query() 及相同的 SQL SELECT 带上 WHERE 子句的命令来获取数据。
该函数用于执行 SQL 命令，然后通过 PHP 函数 mysqli_fetch_array() 来输出所有查询的数据

```php
<?php
$dbhost = '127.0.0.1:3366';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");
 
// 读取 runoob_author 为 RUNOOB.COM 的数据
$sql = 'SELECT runoob_id, runoob_title, 
        runoob_author, submission_date
        FROM runoob_tbl
        WHERE runoob_author="RUNOOB.COM"';
 
mysqli_select_db( $conn, 'RUNOOB' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
echo '<h2>菜鸟教程 MySQL WHERE 子句测试<h2>';
echo '<table border="1"><tr><td>教程 ID</td><td>标题</td><td>作者</td><td>提交日期</td></tr>';
while($row = mysqli_fetch_assoc($retval))
{
    echo "<tr><td> {$row['runoob_id']}</td> ".
         "<td>{$row['runoob_title']} </td> ".
         "<td>{$row['runoob_author']} </td> ".
         "<td>{$row['submission_date']} </td> ".
         "</tr>";
}
echo '</table>';
// 释放内存
mysqli_free_result($retval);
mysqli_close($conn);
?>
```

#### 12.MYSQL UPDATE 更新数据
如果我们需要修改或更新 MySQL 中的数据，我们可以使用 SQL UPDATE 命令来操作。

语法：
以下是 UPDATE 命令修改 MySQL 数据表数据的通用 SQL 语法：
`UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]`

- 可以同时更新一个或者多个字段
- 可以在where语句中指定任何条件
- 可以在一个单独表中更新数据

当你需要更新数据表中指定行的数据时 WHERE 子句是非常有用的。
```mysql
UPDATE runoob_tbl SET runoob_title='学习 C++' WHERE runoob_id=3;
```
将runoob_tbl表中，id=3的那一行的runoob_title修改为学习 C++


##### 12.1 php脚本更新数据
PHP 中使用函数 mysqli_query() 来执行 SQL 语句，你可以在 SQL UPDATE 语句中使用或者不使用 WHERE 子句。
**注意：不使用 WHERE 子句将数据表的全部数据进行更新，所以要慎重。**
该函数与在mysql>命令提示符中执行SQL语句的效果是一样的。

```php
<?php
$dbhost = '127.0.0.1:3366';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");
 
$sql = 'UPDATE runoob_tbl
        SET runoob_title="学习 Python"
        WHERE runoob_id=3';
 
mysqli_select_db( $conn, 'RUNOOB' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法更新数据: ' . mysqli_error($conn));
}
echo '数据更新成功！';
mysqli_close($conn);
?>
```

#### 13.mysql delect语句
可以使用 SQL 的 DELETE FROM 命令来删除 MySQL 数据表中的记录
语法：`DELETE FROM table_name [WHERE Clause]`
eg:` DELETE FROM runoob_tbl WHERE runoob_id=3;`删除runoob_tbl表中，键值为3的


##### php删除数据库中的数据
```php
<?php
$dbhost = '127.0.0.1:3366';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");
 
$sql = 'DELETE FROM runoob_tbl
        WHERE runoob_id=2';
 
mysqli_select_db( $conn, 'RUNOOB' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法删除数据: ' . mysqli_error($conn));
}
echo '数据删除成功！';
mysqli_close($conn);
?>
```

#### 14.like语句
我们知道在 MySQL 中使用 SQL SELECT 命令来读取数据， 同时我们可以在 SELECT 语句中使用 WHERE 子句来获取指定的记录。
WHERE 子句中可以使用等号 = 来设定获取数据的条件，如 "runoob_author = 'RUNOOB.COM'"。
但是有时候我们需要获取 runoob_author 字段含有 "COM" 字符的所有记录，这时我们就需要在 WHERE 子句中使用 SQL LIKE 子句。
SQL LIKE 子句中使用百分号 %字符来表示任意字符，类似于UNIX或正则表达式中的星号 *。
如果没有使用百分号 %, LIKE 子句与等号 = 的效果是一样的。

语法:
```mysql
SELECT field1, field2,...fieldN 
FROM table_name
WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue'
```
- 可以在where语句中指定任何条件
- 可以在where语句中使用like
- 可以使用like子句代替等号
- like通常和%一起使用，用来表示任意字符
- 可以使用and或者or指定一个或者多个条件
- 可以在update或者delect语句中使用where...like语句

eg:
```
SELECT * from runoob_tbl  WHERE runoob_author LIKE '%el';
```
说明：在runoob_tbl表格中筛选runoob_author中有el的数据

##### 14.1 使用php来进行like查询
```php
<?php
$dbhost = '127.0.0.1:3366';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = 'root';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");
 
$sql = 'SELECT runoob_id, runoob_title, 
        runoob_author, submission_date
        FROM runoob_tbl
        WHERE runoob_author LIKE "%el"';
 
mysqli_select_db( $conn, 'RUNOOB' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
echo '<h2>菜鸟教程 mysqli_fetch_array 测试<h2>';
echo '<table border="1"><tr><td>教程 ID</td><td>标题</td><td>作者</td><td>提交日期</td></tr>';
while($row = mysqli_fetch_assoc($retval))
{
    echo "<tr><td> {$row['runoob_id']}</td> ".
         "<td>{$row['runoob_title']} </td> ".
         "<td>{$row['runoob_author']} </td> ".
         "<td>{$row['submission_date']} </td> ".
         "</tr>";
}
echo '</table>';
mysqli_close($conn);
?>
```

#### 15.mysql union操作符
描述：MySQL UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。
语法：
```mysql
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions]
UNION [ALL | DISTINCT]
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions];
```
- expression1,expression2....:要检索的列
- tables：要检索的数据库
- WHERE conditions:可选，检索条件
- DISTINCT：可选，删除结果集中重复的数据，默认情况下union操作符已经删除了重复数据，所有DISTINCT对于结果没有影响
- all:可选，返回所有结果集，包含重复数据

##### 15.1RUNOOB数据库建websites数据表
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


$sql = "CREATE TABLE Websites( ".
        "websites_id INT NOT NULL AUTO_INCREMENT, ".
        "websites_name VARCHAR(100) NOT NULL, ".
        "websites_url VARCHAR(40) NOT NULL, ".
        "websites_alexa INT NOT NULL, ".
        "country VARCHAR(40) NOT NULL, ".
        "submission_date DATE, ".
        "PRIMARY KEY ( websites_id ))ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
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
往表里面插入数据
```mysql
INSERT INTO `runoob`.`websites` (`websites_name`, `websites_url`, `websites_alexa`,`websites_country`) VALUES ('Google', 'www.google.com', '1','usa');
```

##### 15.2 创建apps的表
```
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


$sql = "CREATE TABLE apps( ".
        "apps_id INT NOT NULL AUTO_INCREMENT, ".
        "apps_name VARCHAR(100) NOT NULL, ".
        "apps_url VARCHAR(40) NOT NULL, ".
        "country VARCHAR(40) NOT NULL, ".
        "PRIMARY KEY ( apps_id ))ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
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
插入数据
```
INSERT INTO `runoob`.`apps` (`apps_name`, `apps_url`, `apps_country`) VALUES ('微博 App', ' http://weibo.com/ ', 'china');
```

websites表的内容：
![](MYSQLStudy-1/2.png)

apps表的内容：
![](MYSQLStudy-1/1.png)


##### 15.3 union实例
下面的 SQL 语句从 "Websites" 和 "apps" 表中选取所有不同的country（只有不同的值）：
```mysql]
SELECT country FROM Websites
UNION
SELECT country FROM apps
ORDER BY country;
```
![](MYSQLStudy-1/3.png)
**注释：**UNION 不能用于列出两个表中所有的country。如果一些网站和APP来自同一个国家，每个国家只会列出一次。UNION 只会选取不同的值。请使用 UNION ALL 来选取重复的值！

##### 15.4 SQL UnION ALL
下面的 SQL 语句使用 UNION ALL 从 "Websites" 和 "apps" 表中选取所有的country（也有重复的值）：
```mysql
SELECT country FROM Websites
UNION ALL
SELECT country FROM apps
ORDER BY country;
```
![](MYSQLStudy-1/4.png)


##### 15.5 带有 WHERE 的 SQL UNION ALL
下面的 SQL 语句使用 UNION ALL 从 "Websites" 和 "apps" 表中选取所有的中国(CN)的数据（也有重复的值）：
```mysql
SELECT country, name FROM Websites
WHERE country='China'
UNION ALL
SELECT country, app_name FROM apps
WHERE country='China'
ORDER BY country;
```
![](MYSQLStudy-1/5.png)


#### 16.mysql 排序
用 MySQL 的 ORDER BY 子句来设定你想按哪个字段哪种方式来进行排序，再返回搜索结果。

语法：
```
SELECT field1, field2,...fieldN table_name1, table_name2...
ORDER BY field1, [field2...] [ASC [DESC]]
```
说明：
- 可以使用任何字段来作为排序的条件，从而返回排序后的查询结果
- 可以设定多个字段来排序
- 可以使用ASC或者DESC关键字来设置查询结果按照升序还是降序。默认情况下按照升序排列
- 可以添加where....like语句来设置条件