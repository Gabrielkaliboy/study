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

#### 10.php自定义函数之静态变量
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

#### 11.php使用系统内置函数
##### 11.1使用函数的重点是三块
- 了解函数的功能，特别是常用函数的功能
- 了解函数的参数
- 了解函数的返回值
##### 11.2举例
- 直接返回布尔值如copy函数
	- 功能：拷贝一个文件
	- 返回值：为布尔型，成功返回true，失败返回false
	- 参数：两个字符串的值，一个是copy的源文件，一个为目标文件。第三个参数可选，不常用
```php
<?php
header("content-type:text/html;charset=utf-8");
if(copy('abc.txt','bcd.txt')){
   echo '复制成功';
}else{
   echo '复制失败';
}
?>
```

- Mixed表示任何类型的数据，如Array_unshift()
`int array_unshift(array &$array,mixed $value1[,mixed $...])`
	- 功能：操作一个数组，像数组之前插入其他类型的数据
	- 返回值，int类型，可能就是插入成功最后的个数
	- 参数：第一个参数是&符号，也就是在操作过程中改变了第一个参数的值。引用传参，也就是操作这个数组，向这个数组中传入参数。因此Mixed是指可传入的任意类型。
	- 第三个参数加了中括号，我们所有遇到中括号的都是指后面的参数可传，可不传。
	- 第四，最后还看到了三个省略号，代表可以传入任意多个参数
```php
<?php
header("content-type:text/html;charset=utf-8");
$queue=array("凤姐","芙蓉");
array_unshift($queue,"杨幂","姚晨");
print_r($queue);
//Array ( [0] => 杨幂 [1] => 姚晨 [2] => 凤姐 [3] => 芙蓉 )
?>
```

- 参数中带有&符号的参数，一定要传一个变量作为参数，函数里面改变了他的值。

- 带有[]的参数，表示可选项
- 带有...表示可以传任意多个参数
- 带有callback的参数，表示回调函数，需要传递一个函数进来。遇到callback的传函数或者匿名函数进去协助处理，让功能更强大。**没看懂实例**
	- `bool array_walk ( array &$array , callable $callback [, mixed $userdata = NULL ] )`
	- 功能：传入一个回调函数，将数组的原来数组操作，并且发生变化
	- 返回值：bool值，也就是提示成功或者失败
	- 参数：
		- 第一个参数是要操作的数组
		- 第二个参数是callback，代表着可以传入的函数或者匿名函数
```php
<?php
$shuaige = array("a" => "wuyanzhu", "b" => "huangxiaoming", "c" => "ninzetao");

function test_print($item2, $key)
{
   echo $key ." ---". strtoupper($item2) . "<br />\n";
}

echo '<pre>';
var_dump($shuaige);
echo '</pre>';


array_walk($shuaige, 'test_print');

echo '用自定义函数test_print执行后的效果：';

echo '<pre>';
var_dump($shuaige);
echo '</pre>';

?>
```
- 函数支持的版本要知道


#### 12.文件包含函数
在PHP里面有，require，require_once,include,include_once
##### 12.1他们之间的不同
<table><thead><tr class="firstRow"><th>函数</th><th>包含失败</th><th>特点</th></tr></thead><tbody><tr><td>Inlcude</td><td>返回一条警告</td><td>文件继续向下执行。通常用于动态包含</td></tr><tr><td>Require</td><td>一个致命的错</td><td>代码就不会继续向下执行。通常包含极为重要的文件，整个代码甭想执行</td></tr><tr><td>Include_once</td><td>返回一条警告</td><td>除了原有include的功能以外，它还会做once检测，如果文件曾经已经被被包含过，不再包含</td></tr><tr><td>Require_once</td><td>一个致命的错</td><td>除了原的功能一外，会做一次once检测，防止文件反复被包含</td></tr></tbody></table>

##### 12.2 注意
- 少用_once的，因为他会消耗更多的资源去做消耗工作
- 特高级：include文件只需要编译一次，因为每次包含include都会在执行一次对应的代码，如果减少include再执行的时候，需要重新解析的过程

##### 12.3实例
- include
functions.php
```php
<?php
//functions.php文件

function demo(){
   echo 'aaaa';
}

function test(){
   echo 'cccdddd';
}

?>
```
functions.php同级目录建user.php
```php
<?php

//user.php

include 'functions.php';

//可以直接调用
demo();

test();

?>
```

- 对比include与require
用include包含不存在test.php
```php
<?php

//user.php

include 'functions.php';
include 'test.php';

//可以直接调用
demo();

test();

?>
```
require包含不存在的test.php
```php
<?php

//user.php

include 'functions.php';
require 'test.php';

//可以直接调用
demo();

test();

?>
```
如果test.php文件不存在include 会发出警告继续执行demo()和test()函数。而requre则直接报错，demo()和test()函数无法继续执行。
我们通过表格知道了:inlcude 和include_once的区别在于，检测是否重复包含。如果重复包含了include_once不会再包含 对应的文件了，而include 则不管这些。有没引入过文件，都再引入一次。

- include与include_once
```php
<?php

//user.php

//这儿被包含了两次同样的函数定义文件哟
include 'functions.php';
include 'functions.php';

//可以直接调用
demo();

test();

?>
```
改为include_once
```php
<?php
//user.php

//这儿被包含了两次同样的函数定义文件哟
include_once 'functions.php';
include_once 'functions.php';

//可以直接调用
demo();

test();

?>
```
include 这次引入functions.php两次的时候报错误,不能重复定义函数。
而include_once不报错的原因是因为：他检测了functions.php曾经包含过，不再进行包含引入了。

- require与require_once
	- 包含 的文件必须存在，否则停止执行
	- 会做重复包含检查哟

#### 13.数学常用函数
特别多，只需要用的时候查找就好
<table><thead><tr class="firstRow"><th>函数名</th><th>描述</th><th>实例</th><th>输入</th><th>输出</th></tr></thead><tbody><tr><td>abs()</td><td>求绝对值</td><td style="word-break: break-all;">$abs = abs(-4.2); //4.2</td><td>数字</td><td>绝对值数字</td></tr><tr><td>ceil()</td><td>进一法取整</td><td>echo ceil(9.999); // 10</td><td>浮点数</td><td>进一取整</td></tr><tr><td>floor()</td><td>舍去法取整</td><td>echo floor(9.999); // 9</td><td>浮点数</td><td>直接舍去小数部分</td></tr><tr><td>fmod()</td><td>浮点数取余</td><td>"$x = 5.7;$y = 1.3;$r = fmod($x, $y);// $r equals 0.5, because 4 * &nbsp;1.3 + 0.5 = 5.7 &nbsp; &nbsp;"</td><td>两个浮点数,x&gt;y</td><td>浮点余数</td></tr><tr><td>pow()</td><td>返回数的n次方</td><td>echo pow(-1, 20); // 1</td><td>基础数 n次方</td><td>乘方值</td></tr><tr><td>round()</td><td>浮点数四舍五入</td><td>echo round(1.95583, 2);// 1.96</td><td>一个数值</td><td>保留小数点后多少位,默认为0 舍入后的结果</td></tr><tr><td>sqrt()</td><td>求平方根</td><td>echo sqrt(9); //3</td><td>被开方的数</td><td>平方根</td></tr><tr><td>max()</td><td>求最大值</td><td>"echo max(1, 3, 5, 6, 7); &nbsp;// 7 echo max(array(2, 4, 5)); // 5"</td><td>多个数字或数组</td><td>返回其中的最大值</td></tr><tr><td>min()</td><td>求最小值</td><td>min</td><td>多个数字或数组</td><td>返回其中的最小值</td></tr><tr><td>mt_rand()</td><td>更好的随机数</td><td>echo mt_rand(0,9);//n</td><td>最小/最大,随机数</td><td>随机返回范围内的值</td></tr><tr><td>rand()</td><td>随机数</td><td>echo rand()</td><td>最小/最大,随机数</td><td>随机返回范围内的值</td></tr><tr><td>pi()</td><td>获取圆周率值</td><td>echo pi(); // 3.1415926535898</td><td>无</td><td>获取圆周率</td></tr></tbody></table>

#### 14.php获取时期时间信息函数
##### 14.1 区分几个概念
- 时区
1884年在华盛顿召开国际经度会议时，为了克服时间上的混乱，规定将全球划分为24个时区。在中国采用首都北京所在地东八区的时间为全国统一使用时间。

- 世界时
不光是天文学家使用格林尼治时间（英文简写:GMT），就是在新闻报刊上也经常出现这个名词。我们知道各地都有各地的地方时间。如果对国际上某一重大事情，用地方时间来记录，就会感到复杂不便．而且将来日子一长容易搞错。因此，天文学家就提出一个大家都能接受且又方便的记录方法，那就是以格林尼治（英国某地区）的地方时间为标准。

- Unix时间戳
电脑本身不认识时间，我们在电脑里面设置一个时间方便运算。于是我们规定了一种计算方式，unix时间戳。从Unix纪元（1970 年 1月1日零时）开始到一个时间经过的秒数。我们学了几个概念，那我们现在可以开始来学习时间函数了。

##### 14.2例子
- 设置时区
	- 设置时区的函数是
		- data_default_timezone_get()
		- data_default_timezone_set()
	- 例子：data_default_timezone_get()取得一个脚本中所有日期时间函数所使用的默认时区
```php
<?php
echo date_default_timezone_get ();
//Asia/Chongqing
?>
```
	- 例子：bool date_default_timezone_set ( string $timezone_identifier )，用于所有日期时间函数的默认时区
```php
<?php

//定义一下时区常量，以后你可以放到配置文件里
define('TIME_ZONE','Asia/shanghai');

//执行函数
date_default_timezone_set(TIME_ZONE);
//上面代码如果被注掉的话，值不一样
echo date('Y-m-d H:i:s');

?>
```

##### 14.3time()获取当前的Unix时间戳
```php
<?php
   $time=time();
   print_r( $time);
?>
```

Y 英文是 year，为年份代表年 
m 英文代表month，为月份代表
d 英文代表day，为日期 代表

```php
<?php
header("content-type:text/html;charset=utf-8");
echo date('Y年m月d日');
//2017年06月12日
?>
```

H:m:s 代表的是：时分秒
```php
<?php

//就可以显示出来当前的时间了哟。
echo date('Y-m-d H:i:s');
?>
```

date函数用于将一个时间进行格式化输出，以方便时间的显示或存储。其语法格式如下：
string date ( string $forrnat [, int $tirnestamp] )


<table><thead><tr class="firstRow"><th>字符</th><th>说明</th><th>返回值</th></tr></thead><tbody><tr><td>d</td><td>月份中的第几天，有前导零的2 位数字</td><td>01 到31</td></tr><tr><td>D</td><td>英文星期几，3个字母</td><td>Mon到Sun</td></tr><tr><td>j</td><td>月份中的第几天，没有前导零</td><td>1 到31</td></tr><tr><td>l(字母)</td><td>英文星期几</td><td>Sunday到 Saturday</td></tr><tr><td>N</td><td>1格式数字表示的星期</td><td>1（表示星期一）到7（表示星期天)</td></tr><tr><td>S</td><td>每月天数后面的英文后缀，2个字符</td><td>st，nd，rd或者th。可以和jg一起用</td></tr><tr><td>w</td><td>星期中的第几天，数字表示</td><td>0（表示星期天）到 6（表示星期六）</td></tr><tr><td>z</td><td>一年中的第几天</td><td>0到366</td></tr><tr><td>W</td><td>年份中的第几周，每周从星期一开始</td><td>42（当年的第42周）</td></tr><tr><td>F</td><td>月份，完整的文本格式</td><td>January 到 December</td></tr><tr><td>m</td><td>数字表示月份，有前导零</td><td>01 到 12</td></tr><tr><td>M</td><td>3个字母缩写表示的月份</td><td>Jan 到Dec</td></tr><tr><td>n</td><td>数字表示月份，没有前导零</td><td>1 到 12</td></tr><tr><td>t</td><td>给定月份所应有的天数</td><td>28 到 31</td></tr><tr><td>L</td><td>是否为闰年</td><td>如果是闰年为1，否则为o</td></tr><tr><td>o</td><td>格式年份数字</td><td>例如2007</td></tr><tr><td>Y</td><td>4 位数字完整表示年份</td><td>例如1999或2008</td></tr><tr><td>y</td><td>2 位数字表示的年份</td><td>例如99或08</td></tr><tr><td>a</td><td>小写的上午和下午值</td><td>am或pm</td></tr><tr><td>A</td><td>大写的上午和下午值</td><td>AM或PM</td></tr><tr><td>g</td><td>小时，12小时格式，没有前导零</td><td>1到12</td></tr><tr><td>G</td><td>小时，24小时格式，没有前导零</td><td>0 到 23</td></tr><tr><td>i</td><td>有前导零的分钟数</td><td>00 到 59</td></tr><tr><td>s</td><td>秒数，有前导零</td><td>00到59</td></tr><tr><td>e</td><td>时区标识</td><td><br></td></tr><tr><td>U</td><td>从Unix纪元开始至今的秒数</td><td style="word-break: break-all;">长整型数字</td></tr></tbody></table>


##### 14.4getdate()获取当前的系统时间
getdate用来获取当前系统的时间，或者获得一个时间戳的具体含义。时间戳是一个长整数，表示getdate的语法格式如下所示。

`array getdate ([ int $timestamp = time() ] )`
函数的返回值是一个根据timestamp得到的包含有时间信息的数组。如果没有参数，则会返回当前的时间。getdate返回的数组，键名包括时间和日期的完整信息。
<table><thead><tr class="firstRow"><th>键名</th><th>说明</th><th>返回值</th></tr></thead><tbody><tr><td>secnods</td><td>秒</td><td>数字0到 59</td></tr><tr><td>minutes</td><td>分钟</td><td>数字0到59</td></tr><tr><td>hours</td><td>小时</td><td>数字 0到 23</td></tr><tr><td>mday</td><td>月份中第几天</td><td>数字 1到 31</td></tr><tr><td>wday</td><td>星期中第几天</td><td>数字0（表示星期天）到6（表示星期六）</td></tr><tr><td>mon</td><td>月份</td><td>数字 1 到 12</td></tr><tr><td>year</td><td>年</td><td>4 位数字表示的完整年份</td></tr><tr><td>yday</td><td>一年中第几天</td><td>数字0到365</td></tr><tr><td>weekday</td><td>星期几的英文</td><td>Sunday到 Saturday</td></tr><tr><td>month</td><td>月份的英文</td><td>January 到 December</td></tr><tr><td>0</td><td>自从Unix纪元开始的秒数</td><td>长整型数字</td></tr></tbody></table>

以下代码可以返回getdate 数组的详细信息。
```php
<?php
   $mytime=getdate(); 
   print_r( $mytime);
   //Array ( [seconds] => 1 [minutes] => 40 [hours] => 14 [mday] => 12 [wday] => 1 [mon] => 6 [year] => 2017 [yday] => 162 [weekday] => Monday [month] => June [0] => 1497278401 )
?>
```
返回是这个
```php
Array
(
    [seconds] => 1            //秒
    [minutes] => 10            //分钟
    [hours] => 17            //小时
    [mday] => 18            //日
    [wday] => 0            //星期中的第几天
    [mon] => 1            //月
    [year] => 2015            //年
    [yday] => 17            //年中的第几天
    [weekday] => Sunday        //星期
    [month] => January        //月份
    [0] => 1421597401        //时间戳
)
```

理解了getdate函数和返回的数组以后，就很容易取得当前的时间信息了。下面的代码就是用getdate函数取得时间信息，调用返回时间数组的值输出时间信息。

```php
<?php 
$mytime = getdate();
echo "年 :".$mytime['year']."\n";
echo "月 :".$mytime['mon']."\n";
echo "日 :".$mytime['mday']."\n";
echo "时 :".$mytime['hours']."\n";
echo "分 :".$mytime['minutes']."\n";
echo "秒 :".$mytime['seconds']."\n";
echo "一个小时中的第几钟 :".$mytime['minutes']."\n";
echo "这是一分钟的第几秒 :".$mytime['seconds']."\n";
echo "星期名称 :".$mytime['weekday']."\n";
echo "月份名称 :".$mytime['month']."\n";
echo "时间戳   :".$mytime[0]."\n";
?>
```

#### 15.php日期验证函数
checkdate可以判断一个输出日期是否有效
例如：验证用户输入的时间是否正确。

语法：`bool checkdate ( int $month , int $day , int $year )`
下例中，我们就可以用一个代码来进行实验，写出一段真实的例子。试试2011年有没有2月29日。
如果是有效的时间就返回真，如果不是有效的时间就返回假。

```php
<?php
var_dump(checkdate(12, 31, 2018));
var_dump(checkdate(2, 29, 2011));
?>
```

#### 16.php获取本地化时间戳函数