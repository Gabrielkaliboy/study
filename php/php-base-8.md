#### 连接地址：http://www.php.cn/course/74.html

第八章 php文件系统
---
#### 2. php读取文件
##### 2.1readefile读取文件
`int readfile ( string $文件名)`
```php
<?php
   //linux类的读了方式
   //readfile("/home/paul/test.txt");
   //windows类的读取方式
   readfile("1.txt");
   //我的1.txt里面的文件内容就是hahaha
?>
```
1.txt
```
hahaha
```
注意：上面的代码中windows的斜线是\斜线，可能会转义掉一些字符。因此，我们写的时候写上两个斜线。

##### 2.2 file_get_contents打开文件
`string file_get_contents ( string filename)`

打开文件赋值给另外一个变量
```php
<?php

   $filename = '1.txt';

   $filestring = file_get_contents($filename);
   echo $filestring;
   //hahaha
?>
```
一个综合实例
```php
<?php
   //假设我们有一个多行的文件叫NoAlike.txt，没有的话你可以新建一个这个文件
    $filename = '1.txt';


   //打开这个文件，将文件内容赋值给$filestring
   $filestring = file_get_contents($filename);

   //因为每一行有一个回车即\n，我用\n来把这个字符串切割成数组
   $filearray = explode("\n", $filestring);

   //把切割成的数组，下标赋值给$key,值赋值给$val，每次循环将$key加1。
   while (list($key, $val) = each($filearray)) {
       ++$key;
       $val = trim($val);

       //用的单引号，单引号不解释变量进行了拼接而已
       print 'Line' . $key .':'.  $val.'<br />';
   }
//Line1:hahaha
//Line2:你好吗
//Line3:我爱吃榴莲
?>
```

##### 2.3fopen、fread、fclose操作读取文件
`resource fopen ( string $文件名, string 模式)`
`string fread ( resource $操作资源, int 读取长度)`
`bool fclose ( resource $操作资源 )`

打开资源---》使用相关函数进行操作----》关闭资源

fopen函数：功能是打开文件，参数主要有两个：
- 文件打开的路径
- 

