#### 连接地址：http://www.php.cn/course/74.html

第五章php函数基本语法
---
#### 1.php函数基本语法
分为两大类
- 自定义函数
- 系统函数

#### 2.php函数基本语法之自定义函数
语法规则：
```php
function 函数名([参数名1[=值1], 参数名2[=值2], 参数名n[=值n]])
{
       函数中的功能体
    [return 返回值]
}
```
- 函数名不区分大小写
- 参数就是变量
- 函数名后接括号，括号内跟参数，参数全部用[]包起来，代表参数可填可不填
- 如果有参数的话，参数后可以接=等号，等号接默认值，默认值也是用[]接起来，代表选填

eg
```php
<?php

function php_cn(){

   echo '我是一条狗';
}

php_cn();
php_cn();
php_cn();
?>
```
- 函数名只能是字母数字和下划线，并且之间不能包含空格，数字不能放在变量名首位
```php
<?php
function 1demo(){
}
?>
```
上面代码会报错。

- 函数体的参数如果定义了，未传参数，代码会报错，下面报错

```php
<?php

//定义函数名为test，必须要传入一个参数
function test($hello){


}

test();
?>
```

- 函数后的参数如果有默认值，参数可以不填，代码也不会报错

```php
<?php
function test( $arg = 10){

       echo $arg;

}
test();
echo "<br>";
test(88);
//最后输出10和88
?>
```
参数如果传了，参数会带入函数中，如果函数没有传参数，会用参数后面的默认值
- 函数后面的参数可以写多个
```php
<?php
function test( $a , $b = 20 , $c = 30){

       echo $a + $b + $c;

}

test( 1 , 2 , 3 );
//输出6
```

- 函数后面如果有默认值和无默认值的参数，通常把无默认值的参数写在前面
默认值是代表这个参数可以不用传值进去。而没有默认值的话，代码会报错，也就是没有默认值的参数是必填的，下面这个例子会报错
```php
<?php
function test( $a = 20 , $b = 30 , $c ){

       echo $a + $b + $c;

}

//重点：重点看这一行执行一下
test(  ,  , 8 );
?>
```
上面的语法我们希望的是，参数$a和参数$b我们不传入任何值。参数$c是必须要传进去的，我们传了8。可是PHP的语法规定中不准许我们这么写。因此，我们换一种写法，也能达到一样的效果：
```php
<?php
function test( $c , $a = 20 , $b = 30){

       echo $a + $b + $c;

}

//重点：重点看这一行执行一下
test( 8 );
?>
```
- 函数体的变量与函数体外的变量没有关系
```php
<?php
//定义变量$hello的值为10
$hello = 10;


//函数后的参数（形式上的参数，参数）处写上变量名为$hello
function demo( $hello ){

   //形参带入了函数体内，函数体内变量$hello 改为了 250
   $hello = 250;

   //输入2个250相加的结果
   echo $hello + $hello;

}


//将函数体外的变量$hello，传入变量的参数处（实际传入的参数，实参），显示出的结果为500
demo($hello);

//此处$hello的值输出，依然为10
echo $hello;
?>
```
- 函数体中若有return，return后面的代码不执行
```php
<?php

function demo(){

   echo 111;

   return;

   echo 222;

}

demo();
?>
```
- 函数执行完后，return可把函数体内的值，带到函数体外
```php
<?php

//定义一条函数狗
function php_cn(){

   $foo = 5;

   $bar = 6;

   $result =  $foo + $bar;
   //将$result的结果进行返回
   return $result;

}

//调用php_cn()这个函数，$foo和$bar相加的$result就会返回回来给到变量$piao
$piao = php_cn();

//输出$piao的结果，果真为11
echo $piao;

?>
```
- 函数的执行没有顺序关系，可以在定义处之前的位置调用
```php
<?php
header("content-type:text/html;charset=utf-8");
demo();
function demo(){

   $str = '爸爸妈妈年龄越来越大';
   $str .= '大多数的孩子都是独生子女，更加应该负起责任';

   echo $str;
}
echo"<br>";
demo();
?>
```

- 函数不能重载
也就是同名函数不能定义两次，否则报错
```php
<?php

function demo(){

}

function demo(){

}
//试试会报错吗？
?
```

#### 3.php自定义函数之回调函数