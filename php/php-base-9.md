#### 连接地址：http://www.php.cn/course/74.html

第九章 php文件上传
---
#### 2. 文件上传需要注意php.ini文件配置
找到php.ini然后搜索相应的配置项进行修改

- file_uploads:on为开启文件上传功能，off为关闭
- post_max_size:系统允许的POST传参的最大值
- upload_max_filesize:系统允许的上传文件的最大值

- memory_limit:内存使用限制

建议尺寸：file_size(文件大小)<upload_max_filesize<post_max_size<memory_max_filesize

另外需要注意脚本的执行时间
max_execution_time:参数的单位为秒。这个参数是设定脚本的最大执行时间。也可以根据需求做适当的改变，系统默认值即可。超大文件上传的时候，可能会涉及到这个参数的修改。

上传时间过长，会超时。如果你将此项参数设定为0，则是不限制超时时间，不建议使用。



#### 3.php文件上传的步骤
总共六个步骤

##### 3.1判断是否有错代码
系统返回的错误码详解

- 0：无误，可以继续文件上传的后续操作
- 1：超出上传文件的最大限制，upload_max_filesize=2MB,php.ini中设置，一般默认为两兆，可以根据项目的实际情况来修改
- 2：超出指定的文件大小，根据项目的业务需求指定上传文件的大小限制
- 3：只有部分文件被上传
- 4：文件没有被上传
- 6：找不到临时文件，可能目录不存在或者没有权限
- 7：文件写入失败，可能是磁盘满或者没有权限

**错误码中没有5**


##### 3.2自定义判断是否超出文件大小范围
自己写代码来判断用户上传的文件是否超出我们的限制

##### 3.3 判断后缀名和mime类型是否符合

MIME：Multipurpose Internet Mail Extensions,多用途互联网邮件扩展类型。是设定某种扩展名的文件用一种应用程序来打开的方式类型，当该扩展名文件被访问的时候，浏览器会自动使用指定的应用程序来打开。多用于指定一些客户端自定义的文件名，以及一些媒体文件打开方式。

在判断后缀和mime类型的时候，我们会用到php的一个函数in_array(),该函数传入两个参数，第一个参数是要判断的值，第二个参数是范围数组。
我们用这个函数来判断文件的后缀名和mime类型是否在允许的范围内


##### 3.4生成文件名
我们文件上传成功了不会让他保存原名。因为，有些人在原名中有敏感关键字，会违反我国的相关法律和法规。我们可以采用date()/mt_rand()或者unique()生成随机的文件名

##### 3.5 判断是否是上传文件
文件上传成功时，系统会将上传的临时文件上传到系统的临时目录中。产生一个临时文件。同时会产生临时文件名。我们需要做的事情是将临时文件移动到系统的指定目录中。而移动前不能瞎移动，或者移动错了都是不科学的。移动前我们需要使用相关函数判断上传的文件是不是临时文件。is_uploaded_file()传入一个参数($_FILES中的缓存文件名)，判断传入的名称是不是上传文件。


##### 3.6移动临时文件到指定位置
临时文件是真实的临时文件，我们需要将其移动到我们的网站目录下面了。让我们网站目录的数据，其他人可以访问到。我们使用：move_uploaded_file()。这个函数是将上传文件移动到指定位置，并命名。传入两个参数：第一个参数是指定移动的上传文件；第二个参数是指定的文件夹和名称拼接的字符串。

```php
<form action="" enctype="multipart/form-data" method="post" 
name="uploadfile">上传文件：<input type="file" name="upfile" /><br> 
<input type="submit" value="上传" /></form> 
<?php 
//print_r($_FILES["upfile"]); 
if(is_uploaded_file($_FILES['upfile']['tmp_name'])){ 
$upfile=$_FILES["upfile"]; 
//获取数组里面的值 
$name=$upfile["name"];//上传文件的文件名 
$type=$upfile["type"];//上传文件的类型 
$size=$upfile["size"];//上传文件的大小 
$tmp_name=$upfile["tmp_name"];//上传文件的临时存放路径 
//判断是否为图片 
switch ($type){ 
case 'image/pjpeg':$okType=true; 
break; 
case 'image/jpeg':$okType=true; 
break; 
case 'image/gif':$okType=true; 
break; 
case 'image/png':$okType=true; 
break; 
} 

if($okType){ 
/** 
* 0:文件上传成功<br/> 
* 1：超过了文件大小，在php.ini文件中设置<br/> 
* 2：超过了文件的大小MAX_FILE_SIZE选项指定的值<br/> 
* 3：文件只有部分被上传<br/> 
* 4：没有文件被上传<br/> 
* 5：上传文件大小为0 
*/ 
$error=$upfile["error"];//上传后系统返回的值 
echo "================<br/>"; 
echo "上传文件名称是：".$name."<br/>"; 
echo "上传文件类型是：".$type."<br/>"; 
echo "上传文件大小是：".$size."<br/>"; 
echo "上传后系统返回的值是：".$error."<br/>"; 
echo "上传文件的临时存放路径是：".$tmp_name."<br/>"; 

echo "开始移动上传文件<br/>"; 
//把上传的临时文件移动到up目录下面 
move_uploaded_file($tmp_name,'up/'.$name); 
$destination="up/".$name; 
echo "================<br/>"; 
echo "上传信息：<br/>"; 
if($error==0){ 
echo "文件上传成功啦！"; 
echo "<br>图片预览:<br>"; 
echo "<img src=".$destination.">"; 
//echo " alt=\"图片预览:\r文件名:".$destination."\r上传时间:\">"; 
}elseif ($error==1){ 
echo "超过了文件大小，在php.ini文件中设置"; 
}elseif ($error==2){ 
echo "超过了文件的大小MAX_FILE_SIZE选项指定的值"; 
}elseif ($error==3){ 
echo "文件只有部分被上传"; 
}elseif ($error==4){ 
echo "没有文件被上传"; 
}else{ 
echo "上传文件大小为0"; 
} 
}else{ 
echo "请上传jpg,gif,png等格式的图片！"; 
} 
} 
?> 
```


#### 4.php文件上传表单注意事项
html文档
```html
<html>
   <head>
       <meta charset="utf-8" />
       <title>单文件上传</title>
   </head>
   <body>
       <form action="file.php" method="post" enctype="multipart/form-data">
           <input type="file" name="file">
           <input type="submit" value="上传">
       </form>
   </body>
</html>
```
**注意**
1.form表单中的参数method必须为post，若为get是无法进行文件上传的
2.enctype的值必须为multipart/form-data


#### 5.按照数组和步骤完成文件上传
form表单提交的文件内容指向了file.php。我们在file.php中，通过PHP代码，来处理上传文件。我们选择一个名为图片进行上传。假设图片的名字为：psu.jpg，点击上传。PHP为文件类数据准备了一个专用的系统函数$_FILES，上传文件的所有相关数据，都保存在这个系统函数中。


在PHP文件中，我们打印 $_FILES ，来观察这个数组的结构：
```php
<?php
//var_dump()或print_r()
//打印变量的相关信息,将变量的信息详细的展示出来
var_dump($_FILES);      
//array(0) { }       
?>
```
打印出来的数组结构如下
```php
array (size=1)
    'file' => 
       array (size=5)
       //文件名
      'name' => string 'psu.jpg' (length=7) 
      //文件的mime类型
      'type' => string 'image/jpeg' (length=10)                    
      //缓存文件，上传的图片即保存在这里
      'tmp_name' => string 'E:\wamp\tmp\phpC32A.tmp' (length=23)
      //错误码，详见上面错误码介绍
      'error' => int 0                                             
      //上传的文件大小
      'size' => int 225824
```


##### 5.1判断错误代码
```php
<?php
if($_FILES['file']['error'] > 0){
   switch ($_FILES['file']['error']) {    //错误码不为0，即文件上传过程中出现了错误
       case '1':
           echo '文件过大';
           break;
       case '2':
           echo '文件超出指定大小';
           break;
       case '3':
           echo '只有部分文件被上传';
           break;
       case '4':
           echo '文件没有被上传';
           break;
       case '6':
           echo '找不到指定文件夹';
           break;
       case '7':
           echo '文件写入失败';
           break;
       default:
           echo "上传出错<br/>";
   }
}else{
   //错误码为0，即上传成功，可以进行后续处理，处理流程见下文
}
?>
```
上面的代码详细的介绍了错误码和对应的错误，我们可以根据错误码，来生成准确的错误提示。

##### 5.2判断文件是否超出大小
 在实际项目中，由于系统硬件的限制，以及存储设备的限制，不可能让用户无限制的上传文件，所以我们要对用户上传的文件大小进行限制。定义一个合适的限制大小，能让我们的应用更稳定的运行。
```php
<?php
//判断错误
if ($_FILES['file']['error'] > 0) {
    //有错误可停止执行
} else {
    //当前上传文件无误，运行本段代码
    //判断文件是否超出了指定的大小
    //单位为byte
    $MAX_FILE_SIZE = 100000;
    if ($_FILES['file']['size'] > $MAX_FILE_SIZE) {
        //判断，如果上传的文件，大小超出了我们给的限制范围，退上传并产生错误提示
        exit("文件超出指定大小");
    }
}
?>
```
将我们指定的文件大小，定义为$MAX_FILE_SIZE，该变量的计数单位为byte，对应上传文件的 $_FILES['file']['size']大小。示例代码中，限制大小约为100K及以下的文件。


##### 5.3判断文件mime文件类型是否正确
下面的示例代码中，我们假设当前的项目需求为指定上传图片，要求上传后缀名为GIF或者jpg的文件，当用户上传不符合要求的文件时，返回错误提示。
```php
<?php
/*判断后缀名和MIME类型是否符合指定需求
例如:
当前项目指定上传后缀为.jpg或.gif的图片，则$allowSuffix = array('jpg','gif');
*/
//定义允许的后缀名数组
$myImg = explode('.', $_FILES['file']['name']);
/*
explode() 将一个字符串用指定的字符切割，并返回一个数组，这里我们将文件名用'.''切割,结果存在$myImg中，文件的后缀名即为数组的最后一个值
*/
$myImgSuffix = array_pop($myImg);
/*
根据上传文件名获取文件的后缀名
使用in_array()函数，判断上传文件是否符合要求
当文件后缀名不在我们允许的范围内时退出上传并返回错误信息
*/
if(!in_array($myImgSuffix, $allowSuffix)){
    exit("文件后缀名不符");
}
/*
mime类型和文件后缀名的对应关系，我们可以通过很多途径查询到，为了避免用户自主修改文件后缀名造成文件无法使用。
mime类型也必须做出限制检查mime类型，是为了防止上传者直接修改文件后缀名
导致文件不可用或上传的文件不符合要求。
*/
//数组内容为允许上传的mime类型
$allowMime = array(
    "image/jpg",
    "image/jpeg",
    "image/pjpeg",
    "image/gif"
);
if(!in_array($_FILES['file']['type'], $allowMime)){                      //判断上传文件的mime类型是否在允许的范围内
    exit('文件格式不正确，请检查');
    //如果不在允许范围内，退出上传并返回错误信息
}
?>
```


##### 5.4 生成指定的路径和文件名
按照项目的文件安排，生成文件存储路径，为了避免文件名重复而产生的错误，按照一定的格式，生成一个随机文件名。
```php
<?php
//指定上传文件夹
$path = "upload/images/";
/*
根据当前时间生成随机文件名，本行代码是使用当前时间 + 随机一个0-9的数字组合成文件名，后缀即为前面取到的文件后缀名
*/
$name = date('Y').date('m').date("d").date('H').date('i').date('s').rand(0,9).'.'.$myImgSuffix;
?>
```	

##### 5.5 判断文件是否上传
is_uploaded_file()函数是专用的函数，来判断目标文件是否是上传文件。

```php
<?php

//使用is_uploaded_file()判断是否是上传文件,函数介绍见上文
if(is_uploaded_file($_FILEs['file']['tmp_name'])){    

}
?>
```

##### 5.6移动文件到指定位置
使用move_uploaded_file()函数，将文件移动到指定的位置，并命名。需要注意的是，Linux系统中对目标目录是否有权限及磁盘空间是否足够，否则会导致上传操作失败。
```php
<?php
/*
使用move_uploaded_file()移动上传文件至指定位置,第一个参数为上传文件，第二个参数为我们在前面指定的上传路径和名称。
*/
if(move_uploaded_file($_FILEs['file']['tmp_name'], $path.$name)){
           //提示文件上传成功
           echo "上传成功";                                
       }else{
/*
文件移动失败，检查磁盘是否有足够的空间，或者linux类系统中文件夹是否有足够的操作权限
*/
           echo '上传失败';                                                
       }
   }else{
       echo '不是上传文件';
   }

}
?>
```

整体的一个代码
```php
<?php
if ($_FILES['file']['error'] > 0) {
   switch ($_FILES['file']['error']) {
       //错误码不为0，即文件上传过程中出现了错误
       case '1':
           echo '文件过大';
           break;
       case '2':
           echo '文件超出指定大小';
           break;
       case '3':
           echo '只有部分文件被上传';
           break;
       case '4':
           echo '文件没有被上传';
           break;
       case '6':
           echo '找不到指定文件夹';
           break;
       case '7':
           echo '文件写入失败';
           break;
       default:
           echo "上传出错<br/>";
   }
} else {

   $MAX_FILE_SIZE = 100000;
   if ($_FILES['file']['size'] > $MAX_FILE_SIZE) {
       exit("文件超出指定大小");

   }

   $allowSuffix = array(
       'jpg',
       'gif',
   );

   $myImg = explode('.', $_FILES['file']['name']);

   $myImgSuffix = array_pop($myImg);

   if (!in_array($myImgSuffix, $allowSuffix)) {
       exit("文件后缀名不符");
   }

   $allowMime = array(
       "image/jpg",
       "image/jpeg",
       "image/pjpeg",
       "image/gif",
   );

   if (!in_array($_FILES['file']['type'], $allowMime)) {
       exit('文件格式不正确，请检查');
   }

   $path = "upload/images/";
   $name = date('Y') . date('m') . date("d") . date('H') . date('i') . date('s') . rand(0, 9) . '.' . $myImgSuffix;

   if (is_uploaded_file($_FILEs['file']['tmp_name'])) {

       if (move_uploaded_file($_FILEs['file']['tmp_name'], $path . $name)) {
           echo "上传成功";
       } else {
           echo '上传失败';
       }

   } else {
       echo '不是上传文件';
   }

}
?>
```