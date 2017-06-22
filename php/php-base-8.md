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
- 打开文件的模式

返回类型是一个资源类型。资源类型需要其他函数来操作这个资源，所有的资源有打开就有关闭

fread函数：读取打开的文件资源，读取指定长度的文件资源，读取一部分然后就向后移动一部分，直到文件结尾

fclose:关闭资源，资源有打开就有关闭

##### 2.4 fopen模式
- r:只读方式打开，将文件指针指向文件头
- r+:读写方式打开，将文件指针指向文件头
- w:写入方式打开，将文件指针指向文件头，并将文件大小截为零。如果文件不存在，则尝试创建
- w+:读写方式打开，将文件指针指向文件头，并将文件大小截为零，如果文件不存在则尝试创建
- a:写入方式打开，将文件指针指向文件末尾，如果文件不存在则尝试创建
- a+:读写方式打开，将文件指针指向文件末尾，如果文件不存在则尝试创建
- x:创建并以写入方式打开，将文件指针指向文件头，如果文件已存在，则fopen()调用失败并返回false,并生成一条E_WARNING级别的错误信息	。如果文件不存在则尝试创建
- x+:创建并以读写方式打开，将文件指针指向文件头，如果文件已存在，则fopen()调用失败并返回false，并生产E_WARNING级别的错误信息。如果文件不存在则尝试创建


##### 2.5r模式
- 打开文件

```php
<?php
   //你可以创建一个NoAlike.txt，以只读模式打开
   $fp = fopen('1.txt', "r");


   //var_dump()操作一下$fp看看效果，输出的是不是只有类型提示的是resource
   var_dump($fp);
// resource(3) of type (stream)
?>
```

- 读取文件
```php
<?php
   $fp = fopen('1.txt', "r");

   //打开一个文件类型后，读取长度
   $contents = fread($fp, 1024);
   echo $contents;
// hahaha 你好吗 我爱吃榴莲
?>
```	

- 关闭文件
```php
<?php
   $fp = fopen("1.txt", 'r');
   $contents = fread($fp, 1024);
   fclose($fp);
   echo $contents;
   //hahaha 你好吗 我爱吃榴莲
?>
```

##### 2.6其他注意事项
- t:windows 下将\n转变为\r\n
- b：二进制打开模式

#### 3. php创建和修改内容

##### 3.1file_put_contents 写入文件
`int file_put_contents ( string $文件路径, string $写入数据])`
功能:向指定的文件写入一个字符串，如果文件不存在则创建文件，返回的是写入的字节长度
```php
<?php
   $data = "在PHP中文网学好PHP，妹子票子不再话下！";

   $numbytes = file_put_contents('1.txt', $data);

   if($numbytes){

       echo '写入成功，我们读取看看结果试试：';

       echo file_get_contents('1.txt');

   }else{
       echo '写入失败或者没有权限，注意检查';
   }
?>
```
这个把我1.txt里面原来的东西给我删除了！

##### 3.2fwrite配合fopen进行写入操作
`int fwrite ( resource $文件资源变量, string $写入的字符串 [, int 长度])`
`写入方式打开，将文件指针指向文件头并将文件大小截为零。如果文件不存在则尝试创建。`
```php
<?php
   $filename = 'test.txt';
   $fp= fopen($filename, "w");
   $len = fwrite($fp, '我是一只来自北方的狼，却在南方冻成了狗');
   fclose($fp);
   print $len .'字节被写入了\n';
?>
```
总结：
- 不论有没有test.txt文件，都会有一个test文件并被重新写入
- 原有的文件内容会被覆盖掉
- 文件不存在会被创建



##### 3.3几种模式的对比
- r:只能读，不能使用fwrite写
- r+:可操作读写
- w:只可以写
- w+:既可以读又可以写

```php
<?php
   $filename = '1.txt';
   $fp= fopen($filename, "r+");
   $len = fwrite($fp, '我是一只来自南方的狼，一直在寻找心中的花姑娘');
   fclose($fp);
   print $len .'字节被写入了\n';
   //66字节被写入了\n
?>
```

把r+换为r
```php
<?php
   $filename = '1.txt';
   $fp= fopen($filename, "r");
   $len = fwrite($fp, '我是一只来自南方的狼，一直在寻找心中的花姑娘');
   fclose($fp);
   print $len .'字节被写入了\n';
   //0字节被写入了\n
?>
```
总结：我们通过实验，确实发现使用r模式，在文件存的时候可以进行写入数据，只用r的话，写入是不成功的。

##### 3.4 a模式和w模式的不同
```php
<?php
   $filename = 'test.txt';
   $fp= fopen($filename, "a");
   $len = fwrite($fp,'读大学迷茫了，PHP中文网学PHP给你希望');
   echo  $len .'字节被写入了\n';
?>
```
总结：
打开网页执行这段代码，你会发现：每刷新一次，文件中就会多一段：读大学迷茫了，PHP中文网学PHP给你希望。文件没有也会被创建

- 模式x:每次写入会干掉原有的文件内容，文件不存在都会创建
- 模式a:每次写入都会向文件的尾部追加内容
- a+:是增强的追加功能，可以读取时也可以使用

x模式和w模式不同
```php
<?php
   $filename = 'test.txt';
   $fp= fopen($filename, "x");
   $len = fwrite($fp,'读大学迷茫了，PHP中文网学PHP给你希望');
   echo  $len .'字节被写入了\n';
?>
```
总结：
1. 文件存在的时候会报错
2. 如果把$filename 改成其他的文件名,就可以了。但是，再次刷新的时候又报错了
3. x+ 是增强的x模式。读取时也可以使用。


#### 4.php创建临时文件
我们之前创建的文件都是永久文件，创建临时文件有几个好处，用完后就删除，不用维护这个文件的状态。
`resource tmpfile ( )`
功能：创建一个临时文件，返回资源类型，关闭文件即被删除。

```php
<?php
   //创建了一个临时文件
   $handle = tmpfile();

   //向里面写入了数据
   $numbytes = fwrite($handle, '写入临时文件');

   //关闭临时文件，文件即被删除
   fclose($handle);

   echo  '向临时文件中写入了'.$numbytes . '个字节'."<br>";
   	//向临时文件中写入了18个字节
?>
```

#### 5.移动，拷贝和删除文件

##### 5.1重命名文件
`bool rename($旧名,$新名);`
```php
<?php
   //旧文件名
   $filename = 'test.txt';

   //新文件名
   $filename2 = $filename . '.old';

   //复制文件
   rename($filename, $filename2);
   //文件运行以后，原来的test.txt变为了test.txt.old
?>
```

##### 5.2复制文件
`bool copy(源文件,目标文件)`
功能：将制定路径的源文件，复制一份到目标文件的位置
```
<?php
   //旧文件名
   $filename = '1.txt';

   //新文件名
   $filename2 = $filename . '_new';

   //修改名字。
   copy($filename, $filename2);
   //运行以后，1.txt后面又出现了一个1.txt_new
?>
```

#### 5.3删除文件
`bool unlink(指定路径的文件)`
```php
<?php
   $filename = '1.txt';

   if (unlink($filename)) {
       echo  "删除文件成功 $filename!\n";
   } else {
       echo "删除 $filename 失败!\n";
   }
   //运行以后，1.txt文件被删了
?>
```

#### 6. php检测文件属性函数
一些函数
`bool file_exists ( $指定文件名或者文件路径)`:检测文件是否存在
`bool is_readable($制定文件名或者文件路径)`:文件是否可读
`bool is_writeable ( $指定文件名或者文件路径)`:文件是否可写
`bool is_executable ( $指定文件名或者文件路径)`:文件是否可执行
`bool is_file ( $指定文件名或者文件路径)`:是否是文件
`bool is_dir ( $指定文件名或者文件路径)`:是否是目录
`void clearstatcache ( void )`:清除文件的状态缓存

##### 6.1 文件锁
如果已经安装了，存在文件锁就提示已安装，否则就继续安装
安装界面的地址:install.php，安装的文件锁是install.lock我们就是检测install.lock文件是否存在
```php
<?php

if(file_exists('install.lock')){

   echo '已安装，请不要再次进行安装';
   exit;

}
?>
```


我们接下来做一个文件安装检测的实验来检测文件或目录是否有写入或者读取权限。如果没有则不能进行安装。
处理这件事情的思路如下：
- 1.定义一批需要检测权限的数组
- 2.可以检测是文件夹还是文件
- 3.做一个标置位变量，如果标置位变量一旦为false则不显示下一步的安装

```php
<?php

//可以定义一批文件是否存在
$files = [
   'config.php',
   'img/',
   'uploads/',
];

//定义标志位变量
$flag = true;
foreach($files as  $v){
   echo $v;

   //判断是文件还是文件夹

   if(is_file($v)){
       echo '是一个文件    ';
   }else if(is_dir($v)){
       echo '是一个文件夹    ';
   }

   if(is_readable($v)){
       echo ' 可读';
   }else{
        echo '<font color="red">不可读</font>';
   }

   if(is_writeable($v)){
       echo '可写';
   }else{
       echo '<font color="red">不可写</font>';
   }

   echo '<br />';
}

if($flag){
   echo '<a href="step1">下一步</a>';

}else{
    echo '不能进行安装';
}
?>
```


#### 7.文件常用函数和变量

##### 7.1 文件操作的常量
下面这个常量是最常用的，是文件目录分隔符的常量
我们来看看格式
- Windows：分隔符\
- 类Unix：/

windows 的路径格式为 d:\xxx\xxx 注意：windows支持 d:/xxx/xxx
linux 的路径格式为 /home/xxx/xxx 注意：如果\home\xxx\xxx 在linux上是错误的
所以当你开启转义之类的话，转义字符 \ 用一起的话 d:\xxx\xxx 是一样的。判断时候有两个 \ 有的话 再转成一个\ 再把 \ 替换成 /当路径分割，这样在linux上或者windos上的路径就能保持统一了。

##### 7.2常量
DIRECTORY_SEPARATOR
试验：定义文件当前所在的路径
由于是PHP的预定义常量，所以没办法改变，如果需要让也自适应操作系统。那么就是不要用,可以用自定义的常量，并且把处理一下，如下：

```php
<?php
$_current_file = str_replace(array('/', '\\'), DIRECTORY_SEPARATOR, __FILE__);
define('__CUR_FILE__', $_current_file);

echo __CUR_FILE__;
//D:\xampp\htdocs\phpStudy\1.php
?>
```

##### 7.3文件指针操作函数
`rewind ( resource handle)`:指针回到开始处
`fseek ( resource handle, int offset [, int from_where])`:文件指针向后移动指定字符

我们在之前的读取当中我们发现fread读取指定长度的数据。读取指定长度的内容，下次再读取的时候从原位置开始再接着向后读取。

demo.txt
```txt
abcdefghijklmnopqrstuvwxyz
```
```php
<?php
header("content-type:text/html;charset=utf-8");
$fp = fopen('1.txt', 'r+');
//读取10个字符
echo fread($fp,10)."<br>";
	
//指针设置回到开始处
rewind($fp);
//再读取10次看看输出的是什么
echo '<br>';
echo fread($fp,10);
echo '<br>';
	
	
//文件指针向后移动10个字符
echo fseek($fp,10);
echo '<br>';
	
	
//再看看文件中输出的是什么
echo fread($fp,10);
echo '<br>';
fclose($fp);
//abcdefghij
//
//abcdefghij
//0
//klmnopqrst
?>
```
fseek指定多长就移动多少个字节。而rewind每次都是回到文件的开始处。那如何移动到最末尾呢？我们可以统计字节数。在fseek的时候直接移到回后。


##### 7.4fielsizefilesize 检测文件的大小
```php
<?php


$filename = '1.txt';
echo $filename . '文件大小为: ' . filesize($filename) . ' bytes';
//1.txt文件大小为: 28 bytes
?>
```

##### 7.5其他操作文件的函数
- file:把整个文件读入一个数组中
- fgets:从文件指针中读取一行，读到最后返回false
- fgetc:从文件指针中读取一个字符，读到最后返回false
- ftruncate:将文件截断到指定长度。

```php
<?php

//以增加的r模式打开
$fp = fopen('1.txt','r+');

//你分发现每次只读一个字符
echo  fgetc($fp)."<br>";

//我要全部读取可以,读取一次将结果赋值一次给$string
while($string = fgetc($fp)){

   echo $string;

}
//a
//bcdefghijklmnopqrstuvwsyz
?>
```


fgets每次打开一行
```php
<?php

//以增加的r模式打开
$fp = fopen('demo.txt','r+');

//你分发现每次只读一个字符
echo  fgets($fp);
echo  fgets($fp);
echo  fgets($fp);
echo  fgets($fp);

?>
```
上面的代码读取的最后返回的是false

##### 7.6文件的时间函数
- filectime:文件创建的时间
- filemtime:文件修改的时间
- fielatime:文件上次访问时间

```php
<?php

$filename = '1.txt';

if (file_exists($filename)) {
   echo '$filename文件的上次访问时间是:'  . date("Y-m-d H:i:s", fileatime($filename));
   echo '$filename文件的创建时间是: ' . date("Y-m-d H:i:s", filectime($filename));
    echo '$filename文件的修改时间是: ' . date("Y-m-d H:i:s", filemtime($filename));}
?>
```

##### 8.php文件锁机制
熟悉文件锁函数和锁机制

文件锁的用途
若一个人在写入一个文件，另外一个人同时也打个了这个文件进行写入文件。这情况下，如果遇到一定的碰撞概率的话，不知道到底谁的操作为准。因此，这个时候我们引入锁机制。若用户A在写入或者读取这个文件的时候，将文件加上共享所。我可以读，其他人也可以读。但是，我如果这与的时候。我使用独占锁。这个文件归我了，你们都别动，除非我将文件锁进行释放。

注意：不论加上了文件锁后要注意释放。


##### 8.1 锁类型
`bool flock ( resource $handle , int $operation)`
功能：轻便的咨询文件锁定

- LOCK_SH:取得共享锁定（读取的程序）
- LOCK_EX:取得独占锁定(写入的程序)
- LOCK_UN:释放锁定(无论共享或者独占)

```php
<?php

$fp = fopen("demo.txt", "r+");

// 进行排它型锁定
if (flock($fp, LOCK_EX)) { 

   fwrite($fp, "文件这个时候被我独占了哟\n");

  // 释放锁定
   flock($fp, LOCK_UN);    
} else {
   echo "锁失败，可能有人在操作，这个时候不能将文件上锁";
}

fclose($fp);

?>
```
1.上例中我为了写入文件，把文件加上了独占锁。2.如果我操作完成，写入完成后，解除掉了独占锁。3.如果是在读取文件的时候，大家可加按照同样的处理思路加上共享锁。



##### 9.php目录处理函数
处理文件夹的基本思路：
- 读取某个路径的时候判断是否是文件夹
- 是文件夹的话，打开指定文件夹，返回文件目录的资源变量
- 使用readdir读取一次目录中的文件，目录指针向后偏移一次
- 使用readdir读取到最后，没有可读的文件返回false
- 关闭文件目录

一些常用函数
- opendir：打开文件夹返回操作资源
- readdir:读取文件夹资源
- is_dir:判断是否是文件夹
- closedir:关闭文件夹操作资源
- filetype:显示是文件夹还是文件，文件显示file，文件夹显示dir

```php
<?php
//设置打开的目录是D盘
$dir = "d:/";

//判断是否是文件夹，是文件夹
if (is_dir($dir)) {
   if ($dh = opendir($dir)) {

      //读取一次向后移动一次文件夹指针
      echo readdir($dh).'<br />';
      echo readdir($dh).'<br />';
      echo readdir($dh).'<br />';
      echo readdir($dh).'<br />';

      //读取到最后返回false

      //关闭文件夹资源
       closedir($dh);
   }
}
//$RECYCLE.BIN
//360Downloads
//Adobe Reader
//CloudMusic
?>
```

```php
<?php
//设置打开的目录是D盘
$dir = "d:/";

//判断是否是文件夹，是文件夹
if (is_dir($dir)) {
   if ($dh = opendir($dir)) {


      //读取到最后返回false，停止循环
      while (($file = readdir($dh)) !== false) {
           echo "文件名为: $file : 文件的类型是: " . filetype($dir . $file) . "<br />";
       }

       closedir($dh);
   }
}
?>
```

#### 10.文件权限设置
文件权限设置的函数在系统管理级别的软件中很常用。例如：某个文件不准许guest组（来宾用户）查看呀。在企业管理中，某些用户或者某些用户文件只准读取不准修改。这都是非常常用的功能。

注意：
1.本章为了解章节。如果没有学习过linux会有些吃力，可以跳过本章，了解有这个东西即可。    2.在实际生产环节中用处较少。    3.主要针对在linux下有过全面知识体系的同学可以重点学习。    4.windows下面有些功能无法实现。

##### 10.1一些函数
- chmod:修改读取模式
- chgrp:修改用户组
- chown:修改权限

上面的函数用法与linux的权限操作的用法一样。对于学过linux的同学来说学起来比较简单。没有学过的会有些吃力。

```php
<?php
//修改linux  系统/var/wwwroot/某文件权限为755
chmod("/var/wwwroot/index.html", 755);  
chmod("/var/wwwroot/index.html", "u+rwx,go+rx"); 
chmod("/somedir/somefile", 0755); 
?>
```

#### 11.php文件路径函数
我们经常遇到处理文件路径的情况
1.文件后缀需要取出来2.路径需要取出名字不取目录    3.只需要取出路径名中的目录路径    4.或者把网址中的各个部份进行解析取得独立值

- pathinfo:返回文件的各个组成部分
- basename:返回文件名
- dirname:文件目录部分
- parse_url:网址拆解成部分
- http_build_query:生成url中query字符串
- http_build_url:生成一个URL

##### 11.1pathinfo
```
array pathinfo ( string $路径)
功能：传入文件路径返回文件的各个组成部份
```

例子：
```php
<?php
$path_parts = pathinfo('d:/www/index.inc.php');

echo '文件目录名：'.$path_parts['dirname']."<br />";
echo '文件全名：'.$path_parts['basename']."<br />";
echo '文件扩展名：'.$path_parts['extension']."<br />";
echo '不包含扩展的文件名：'.$path_parts['filename']."<br />"; 
//文件目录名：d:/www
//文件全名：index.inc.php
//文件扩展名：php
//不包含扩展的文件名：index.inc
?>
```

##### 11.2 basename
```php
string basename ( string $路径[, string $suffix ])
功能：传入路径返回文件名
第一个参数传入路径。
第二个参数，指定我文件名到了指定字符停止。
```

例子
```php
<?php 

echo "1: ".basename("d:/www/index.d", ".d").PHP_EOL;
echo "2: ".basename("d:/www/index.php").PHP_EOL;
echo "3: ".basename("d:/www/passwd").PHP_EOL;
//1: index 2: index.php 3: passwd
?>
```

##### 11.3 dirname
```
dirname(string $路径) 
功能：返回文件路径的文件目录部份
```


##### 11.4parse_url
mixed parse_url ( string $路径 )
功能：将网址拆解成各个部份
```
<?php
$url = 'http://username:password@hostname:9090/path?arg=value#anchor';

var_dump(parse_url($url));

?>
```
返回
```
array(8) { ["scheme"]=> string(4) "http" ["host"]=> string(8) "hostname" ["port"]=> int(9090) ["user"]=> string(8) "username" ["pass"]=> string(8) "password" ["path"]=> string(5) "/path" ["query"]=> string(9) "arg=value" ["fragment"]=> string(6) "anchor" }
```

##### 11.5 http_budil_query
```
string http_build_query ( mixed $需要处理的数据)
功能：生成url 中的query字符串
```

```php
<?php
//定义一个关联数组
$data = [
       'username'=>'php',
       'area'=>'hubei'
        ];

//生成query内容
echo http_build_query($data);
//username=php&area=hubei
?>
```

#### 12.php实现文件留言板
index.php---展示输入框和留言内容
```php
<?Php
//设置时区
date_default_timezone_set('PRC');
//读了内容
@$string = file_get_contents('message.txt');
//如果$string 不为空的时候执行，也就是message.txt中有留言数据
if (!empty($string)) {
    //每一段留言有一个分格符，但是最后多出了一个&^。因此，我们要将&^删掉
    $string = rtrim($string, '&^');
    //以&^切成数组
    $arr = explode('&^', $string);
    //将留言内容读取
    foreach ($arr as $value) {
        //将用户名和内容分开
        list($username, $content, $time) = explode('$#', $value);
        echo '用户名为<font color="gree">' . $username . '</font>内容为<font color="red">' . $content . '</font>时间为' . date('Y-m-d H:i:s', $time);
        echo '<hr />';
    }
}
?>
<h1>基于文件的留言本演示</h1>
<form action="write.php" method="post">
    用户名：<input type="text" name="username" /><br />
    留言内容：<textarea  name="content"></textarea><br />
    <input type="submit" value="提交" />
</form>
```

write.php:向message.text写入数据
```php
<?Php
//设置时区
date_default_timezone_set('PRC');
//读了内容
@$string = file_get_contents('message.txt');
//如果$string 不为空的时候执行，也就是message.txt中有留言数据
if (!empty($string)) {
    //每一段留言有一个分格符，但是最后多出了一个&^。因此，我们要将&^删掉
    $string = rtrim($string, '&^');
    //以&^切成数组
    $arr = explode('&^', $string);
    //将留言内容读取
    foreach ($arr as $value) {
        //将用户名和内容分开
        list($username, $content, $time) = explode('$#', $value);
        echo '用户名为<font color="gree">' . $username . '</font>内容为<font color="red">' . $content . '</font>时间为' . date('Y-m-d H:i:s', $time);
        echo '<hr />';
    }
}
?>
<h1>基于文件的留言本演示</h1>
<form action="write.php" method="post">
    用户名：<input type="text" name="username" /><br />
    留言内容：<textarea  name="content"></textarea><br />
    <input type="submit" value="提交" />
</form>
```

#### 12.php实现修改配置文件
- index.php---展示修改界面
- edit.php---修改功能代码
- config.php---实际的修改部分


index.php展示修改页面，将config.php的配置项展示出来，展示到菜单中
```php
<?php

    include 'config.php';

?>


<form action="edit.php" method="post">
<input type="text" name="DB_HOST" value="<?php echo DB_HOST;?>" /><br />
<input type="text" name="DB_USER" value="<?php echo DB_USER;?>" /><br />
<input type="text" name="DB_PWD" value="<?php echo DB_PWD;?>" /><br />
<input type="text" name="DB_NAME" value="<?php echo DB_NAME;?>" /><br />


<input type="submit" value="修改" />

</form>
```

edit.php 读取config.php文件，将这个文件视为字符串。我然后使用正则表达示匹配来修改内容。
```php
<?php

$string=file_get_contents('config.php');


//DB_HOST    localhost

foreach($_POST as $key=>$val){

   //定义正则来查找内容，这里面的key为form表单里面的name
   $yx="/define\('$key','.*?'\);/";

   //将内容匹配成对应的key和修改的值
   $re="define('$key','$val');";

   //替换内容
   $string=preg_replace($yx,$re,$string);
}


//写入成功
file_put_contents('config.php',$string);

echo '修改成功';

?>
```
config.php 实际存储配置文件的部份，存储了真实的config.php文件内容：
```php
<?php

define('DB_HOST','localhost');

define('DB_USER','root');

define('DB_PWD','root');

define('DB_NAME','neirong');


?>
```

修改index.php里面的东西，config.php里面会变