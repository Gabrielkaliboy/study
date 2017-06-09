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
```php
<?php
function woziji($one,$two,$func){
       //我规定：检查$func是否是函数，如果不是函数停止执行本段代码，返回false
       //is_callable检测参数是否为合法的可调用结构
       if(!is_callable($func)){
               return false;
       }

       //我把$one、$two相加，再把$one和$two传入$func这个函数中处理一次
       //$func是一个变量函数，参见变量函数这一章
       echo $one + $two + $func($one,$two);
}
//我们定义几个函数试试
function plusx2( $foo , $bar){

       $result = ($foo+$bar)*2;

       return $result;

}
function jian( $x , $y ){
   $result = $x - $y;

   return $result;
}


//调用一下函数，woziji，向里面传入参数试试
//输出90
echo woziji(20,10,'plusx2');

//将plusx2改成jian试试结果
//输出40
echo woziji(20,10,'jian');

?>
```
处理过程：
-  1.将20赋值给形参$one,10赋值给了$two，而plusx2或者jian这两个变量函数，赋值给了$func
-  2.在woziji这个函数中判断plusx2或者jian是否为函数，不是函数就return false 停止执行了
-  3.显示plusx2或者jian是函数。因此$one = 20, $two =10相加了，相加后，$one和$two又带入到了了$func($one,$two)中。
-  4.带入至里面后而$func，是可变的，可以为plusx2或者jian。如果为plusx2的话，$one = 20,$two = 10 的这个两个结果又给        了plusx2函数里面的$foo和$bar
-  5.$foo + $bar 乘以2后将结果返回至woziji这个函数功能体的运算处：$one + $two + $func($one,$two);
-  6.这样主得到了运算结果
-  现在我们明白了回调函数：在一个调数里面，再传入一个函数名，将函数名加上()括号。识为变量函数，配合执行。

#### 4.php自定义函数之变量函数
可变函数，仅仅是可变变量的一个变种，变形表达，**可变函数**，我们也称作**变量函数**

回顾可变变量：
```php
<?php 
$hello = 'world';
$world = '你好';
//输出的结果为：你好
echo $$hello; 
?>
```
变量函数
```php
<?php
function demo(){
    echo '天王盖地虎';
}
function test(){
    echo '小鸡炖蘑菇';
}
$fu = 'demo';
//把$fu变为了demo,把demo后加上了一个括号，就执行函数了
$fu();
//输出天王盖地虎
//把$fu的值改为test字符串，则输出小鸡炖蘑菇
?>
```
#### 5.php自定义函数之匿名函数
匿名函数就是没有函数名的函数

- 变量函数式的匿名函数
这个貌似在低版本报错
```php
<?php
	$greet=function($name){
		echo $name.",你好";
	};
	$greet('jarry');
?>
```
上面的例子中函数体没有函数名，通过$greet加括号来调用的，这就是匿名函数

- 回调式的匿名函数
```php
<?php
function woziji($one,$two,$func){
       //我规定：检查$func是否是函数，如果不是函数停止执行本段代码，返回false
       if(!is_callable($func)){
               return false;
       }

       //我把$one、$two相加，再把$one和$two传入$func这个函数中处理一次
       //$func是一个变量函数，参见变量函数这一章
       echo $one + $two + $func($one,$two);

}

woziji(20,30,function( $foo , $bar){

               $result = ($foo+$bar)*2;

               return $result;

           }
);
?>
```
分析：把$func当成有名的函数就可以，这个函数就是
```php
function( $foo , $bar){

               $result = ($foo+$bar)*2;

               return $result;

           }
```

#### 6.php自定义函数之内部函数
内部函数：是指在函数内部又声明了一个函数。
注意事项：
- 内部函数名称，不能是已存在的函数名
- 假如在函数 a里面定义了一个内部函数，不能定义两次函数a
```php
<?php
function foo()
{
   echo '我是函数foo哟，调一下我才会执行定义函数bar的过程<br />';
 function bar()
 {
      echo '在foo函数内部有个函数叫bar函数<br />';
 }


}

//现在还不能调用bar()函数，因为它还不存在
bar();

foo();

//现在可以调用bar()函数了，因为foo()函数的执行使得bar()函数变为已定义的函数

bar();

//再调一次foo()看看是不是会报错？
foo();

?>
```
说明：
- foo调用两次会报错
- 如果不调用foo函数，则无法执行bar函数，因为bar是在函数内部

#### 7.php自定义函数之变量作用域
知识：
- 函数定义时，括号里面的接的变量是形式上的参数(形参)，与函数体外的变量没有任何关系，仅仅是在函数体内执行。
- 函数内声明的变量也与函数外的变量没有关系

实际应用中的情况：
- 我想把函数体内定义的变量拿到函数体外用
- 把函数体外定义的变量拿到函数体内用

<table><thead><tr class="firstRow"><th>全局变量名</th><th>功能说明</th></tr></thead><tbody><tr><td>$_COOKIE</td><td>得到会话控制中cookie传值</td></tr><tr><td>$_SESSION</td><td>得到会话控制中session的值</td></tr><tr><td>$_FILES</td><td>得到文件上传的结果</td></tr><tr><td>$_GET</td><td>得到get传值的结果</td></tr><tr><td>$_POST</td><td>得到post传值的结果</td></tr><tr><td>$_REQUEST</td><td>即能得到get的传值结果，也能得到Post传值的结果</td></tr></tbody></table>

外部变量（超全局变量）的特点
global.html
```html
<html>
   <head>
       <title>超全局数组实验</title>
   </head>
   <body>
       <!--先用POST来实验，以后你可以改成GET哟 -->
       <form action="glob.php" method="post">
           <input type="text" name="hongniu" /><br />

           <input type="submit" value="提交" />
       </form>

   </body>
</html>
```
glob.php
```php
<?php 
function demo(){ 
echo $_POST['hongniu']; 
} 
demo(); 
?>
```
上面的demo可以看出，$_POST等这一系列的超全局变量(外部变量)，在函数体内部也是可以用的。其实我们所有声明的变量都放到了$GLOBALS这个数组下面
```php
<?php
header("content-type:text/html;charset=utf-8");
$hello = 10;
//输出10
echo $GLOBALS['hello'].'<br />';

$GLOBALS['hello'] = '我爱你';

echo $hello;
//输出我爱你
?>
```
再看一个例子
```php
<?php
function test() {
    $foo = "local variable";
	//输出的是全局的
    echo '$foo in global scope: ' . $GLOBALS["foo"] . "\n";
    echo "<br>";
	//输出的是函数内部的
    echo '$foo in current scope: ' . $foo . "\n";
}

$foo = "Example content";
test();
//输出
//$foo in global scope: Example content 
//$foo in current scope: local variable
?>
```
可以看出$变量名=$GLOBALS['变量名']，所有的变量都放到了$GLOBALS里面了，而$GLOBALS也是全局的

- eg1$GLOBALS读取外部变量
```php
<?php

$one = 10;

function demo(){
   $two = 100;

   $result = $two + $GLOBALS['one'];

   return $result;

}
//你会发现结果变成了110
echo demo();

?>
```

- eg2通过$GLOBALS在函数内部修改外部变量
```php
<?php

$hongniu = '我是一个兵，来自老百姓';

function test(){

   echo '执行了函数test哟<br />';
   //调用test()函数，将通过$GLOBALS['hongniu'],把$hongniu的值改变掉

   $GLOBALS['hongniu'] = '帮助别人很快乐';
}

test();
//我是一个兵，来自老百姓
echo $hongniu;

?>
```

- eg3通过$GLOBALS在函数内部创建一个全局变量
```php
<?php
header("content-type:text/html;charset=utf-8");
function hello(){

   $GLOBALS['que'] = '提神喝茶更好哟';

   echo '你调了一下函数hello<br />';
}
//如果不调用一下hello,que不会输出
hello();

echo $que;

?>
```

**了解级别-声明全局变量**，这种方式用的越来越少
在global关键字后面跟着一个或者多个变量，就把变量变为了全局变量
```php
<?php
$a = 10;
$b = 100;
function test(){
   global $a , $b;
   echo $a + $b;
}
//输出110
test();
?>
```
不可以在global后面写$变量=值

#### 8.php自定义函数之参数的引用
变量的一个例子，$a与$b指向同一个存储位置
```php
<?php

$a = 10;

$b = &$a;

$a = 100;

echo $a.'---------'.$b;
?>
```
```php
<?php

$foo = 100;

//注意：在$n前面加上了&符
function demo(&$n){

       $n = 10;

       return $n + $n;

}

echo  demo($foo).'<br />';
//你就记住，&变量以后，二者的存储位置和值都一样，一个变化，另一个也变化
//你会发生$foo的值变为了10
echo $foo;

?>
```
#### 9.php自定义函数之递归函数
递归：函数体内调用自己。实际中主要用在文件与文件夹操作的时候。如果这里自己不懂，可以直接用现成的文件处理函数或者文件夹处理函数。

- 代码是从上到下执行的，所有代码没有exit等停止符，函数必须执行完
- 如果函数从函数A调到函数B，必须把函数B执行完再执行函数A余下的代码
- 递归函数必要有执行完的结束条件，否则函数就会进入死循环。函数会永远的自我执行下去。

eg
```php
<?php
header("content-type:text/html;charset=utf-8");
$n = 2;

function dg( $n ){

   echo $n.'<br />';

   $n = $n - 1;

   if($n > 0){
       //在函数体内调用了dg自己哟
       dg($n);

   }else{

       echo '--------------'."<br>";
   }

   echo '俺是狗蛋，俺还没执行' . $n . '<br />';

}
dg($n);
//结果顺序为
//2
//1
//--------------
//俺是狗蛋，俺还没执行0
//俺是狗蛋，俺还没执行1
?>
```
注意俺是狗蛋那里，先是0，后是1，因为$n为1的时候跳回去了，没有继续执行后面的echo"俺是狗蛋。。。"，当他执行完了0以后，又继续执行1的时候。

#### 9.php自定义函数之静态变量
如果我们想知道函数被调用了多少次怎么办，在没有学校静态变量之前，我们没有办法来解决。

静态变量的特点是:声明一个静态变量，再第二次调用函数的时候，静态变量不会再初始化变量，会在原值的基础上读取执行。

```php
<?php
function demo()
{
   $a = 0;
   echo $a;
   $a++;
}
demo();
demo();
demo();
demo();
demo();
demo();
demo();
demo();
demo();
demo();

?>
```
输出全部都是0

```php
<?php
function test()
{
   static $a = 0;
   echo $a;
   $a++;
}

for($i = 0 ;$i < 10 ; $i++){
   test();
}
?>
```
这个输出0123456789
由此看出静态变量的特点

#### 10.php使用系统内置函数