#### 连接地址：http://www.php.cn/course/74.html

第四章php流程控制
---
#### 2.php流程控制之if结构流程
```php
<?php 
$week=date("4");
//判断星期小于6，则输出：还没到周末，继续上班.....
if ($week<"6") {
    echo "还没到周末，继续上班.....";
} 
?>
```
if后面加不加大括号
```php
//if单行判断
if(布尔值判断)
     只写一句话;
后续代码
//if多行判断
if(布尔值判断){
    可以写多句话;
}
后续代码
```
#### 3.php流程控制之if语句
1.html
```html
<form method="post" action="1.php">
    <input type="text" name="num1">

    <select name="fh">
        <option value="jia"> + </option>
        <option value="jian"> - </option>
        <option value="c"> x </option>
        <option value="chu"> / </option>
        <option value="qy"> % </option>

    </select>

    <input type="text" name="num2">

    <input type="submit" value="运算" />


</form>

```
1.php
```php
<?php

    $num1 = $_GET['num1'];
    $num2 = $_GET['num2'];
    $fh = $_GET['fh'];

    if(!is_numeric($num1) || !is_numeric($num2)){

        echo '请输入数值类型';
    }

    if($fh == 'jia'){
        echo $num1 . '+' . $num2 . '=' . ($num1+$num2);
    }

    if($fh=='jian'){
        echo $num1 . '-' . $num2 . '=' . ($num1-$num2);
    }

    if($fh=='c'){
        echo $num1 . 'x' . $num2 . '=' . ($num1*$num2);
    }
    if($fh=='chu'){
        echo $num1 . '/' . $num2 . '=' . ($num1/$num2);
    }
    if($fh=='qy'){
        echo $num1 . '%' . $num2 . '=' . ($num1%$num2);
    }

?>
```
作业：http://www.php.cn/code/4775.html

#### 4.php流程控制之if...else...elseif...
语法规则
```php
<?php
if（判断语句1）{
    执行语句体1
}elseif(判断语句2){
    执行语句体2
}else if(判断语句n){
        执行语句体n
}else{
        最后的else语句可选
}

//后续代码
?>
```
这种循环嵌套可以不含else语句，即只含有if,elseif
注意：elseif 等价于 else if
```php
<?php
//定义一个随机变量，抵达时间,随机0点至23点
$dida = rand(0,23);

if($dida > 6 && $dida < 10){
    echo '我爱泡澡';
}else if($dida >10 && $dida < 14){
    echo '吃神户牛肉';
}else if($dida >=19 && $dida < 22){
    echo '找一个朋友聊聊内心的寂寞';
}elseif($dida > 22 && $dida <= 23){
    echo '泡澡';

}elseif($dida >= 1 && $dida <3){
     echo '泡澡';
}else{
    echo '睡觉或者工作';
}


?>
```
作业：http://www.php.cn/code/4776.html

#### 5.php流程控制之if语句多种嵌套
语法规则:
```php
<?php
if(判断1){
    if(判断2){
            代码段 1    
    }else{
            代码段2
        }
}else{
    if(判断3){
            代码段3
        }else{
            代码段4
        }
}
?>
```
```php
<?php
//0表示工作秘书，1表示生活秘书
//用代码模拟随机产生当前的工作是生活秘书的还是工作秘书的
$mishu = rand(0,1);

if($mishu){
       //下雨和不下雨的状态，随机产生
       //下雨状态为1
       //不下雨状态为0
       $xiyu = rand(0,1);
        if($xiyu){
             //是否购买雨伞
             $you = rand(0,1);
             if($you){
                  echo '下雨天，已购买不用买雨伞';
             }else{
                  echo '下雨天，未购买，需要买雨伞';
             }
        }else{
             //是否购买防晒霜
             $you = rand(0,1);
             if($you){
                  echo '没下雨，有防晒霜';
             }else{
                  echo '没下雨，需要准备防晒霜';
             }
        }

}else{
    //是否准备好了会议议程
    $shifou = rand(0,1);

    if($shifou){
        echo '已准备好，可以随时出发';
    }else{
         echo '没有准备好，需要打印，延迟出发';
    }

}
```
#### 6.php流程控制之switch语句
语法规则：
```
<?php

switch(变量){    //字符串，整型

       case 具体值:
               执行代码;
               break;

       case 具体值2：

               执行代码2;
               break;

       case 具体值3：

               执行代码3;
               break;

       default:

}
?>
```
eg1
```php
<?php
//定义出行工具
$tool=rand(1,6);

switch($tool){

   case 1:
       echo '司机开车';
       break;
   case 2:
       echo '民航';
       break;
   case 3:
       echo '自己家的专机';
       break;
   case 4:
       echo '火车动车';
       break;
   case 5:
       echo '骑马';
       break;
   case 6:
       echo '游轮';
       break;

}

?>
```
eg1中break去掉
```php
<?php
//定义出行工具
$tool=rand(1,6);

switch($tool){

   case 1:
       echo '司机开车';
       
   case 2:
       echo '民航';
       
   case 3:
       echo '自己家的专机';
       
   case 4:
       echo '火车动车';
       
   case 5:
       echo '骑马';
       
   case 6:
       echo '游轮';
       

}

?>
```

eg2：判断星期
```php
<?php
//得到今天是星期几的英文简称
$day = date('D');

switch($day){
    //拿学校举例，我们让星期一、二、三是校长日
    case 'Mon':
    case 'Tue':
    case 'Wed':
        echo '校长日';
        break;

        echo '星期三';
        break;
    case 'Thu':
        echo '星期四';
        break;
    case 'Fri':
        echo '星期五';
        break;
    default:
        echo '周末，周末过的比周一到周五还要累<br />';
};
?>
```
eg3用switch...case..来做判断
```php
<?php
//用swith...case来完成bool判断
$bool=true;

switch($bool){
   case true:

   case false:


}


/*********分隔线*******************/
if($bool){


}else{


}
?>
```
#### 7.php流程控制之循环语句
```
<?php

//定义需要往返的次数，老外喜欢从0开始计数，我们也从0开始计
$count = 0;

//while后面接布尔值判断，为真执行，为假停止
//$count 小于100的时候执行，也就是$count为0至99的时候执行
//如果$count不小于100了，循环停止执行后续的代码

//循环开始处
while($count < 100){

   echo '我是王思总，我是第' . $count .'次出差<br />';
   //每次执行让$count+1，这样的话，就不会产生$count永远小于100的情况了
   $count++;

//循环结束
}

echo '后续代码';
?>
```

#### 8.php流程控制之while 循环
隔行变色
```php
<?php
$i=0;
echo '<table width="800" border="1">';

while($i<100){
 //0 - 9 为一行
 //10 -19 为一行
 //因此，每一行都能够被10求默，如为为10的时候，应该显示行开始的标签
 if($i%10 == 0){
 //为了隔行变色，每20，40，60每行的颜色是不同的，因此我们又可以再进行一次取余运算
 if($i%20==0){
 echo '<tr>';
 }else{
 echo '<tr bgcolor="pink">';
 }
 }

 echo '<td>'.$i.'</td>';

 $i++;
 //同理，每一行结束是不是应该有一个</tr>结束标签呢？
 if($i%10==0){
 echo '</tr>';
 }
}
echo '</table>';
?>
```
#### 9.php流程控制之do...while 循环
do...while与while语法类似。
语法：
```php
do {
   //代码块
} while (判断);
```
do-while 不论while判断是否成立，先执行一次代码代码块循环语句，保证会执行一次（表达式的真值在每次循环结束后检查）。然而我们之前的while循环会检查布尔判断区域，成立则执行。不成立则不执行。
```php
<?php
$i = 0;
do {
   echo $i;
} while ($i > 0);
?>
```
上面代码中，$i 肯定不大于0，也执行了。

#### 9.php流程控制之for循环
语法：
```php
for (表达示1; 表达示2; 表达示3){
        需要执行的代码段
}
```
- 表达式1 是初始化赋值，可以同时赋值多个代码。
- 表达示2 在每次循环开始前求值。如果值为 TRUE，则继续循环，执行嵌套的循环语句。如果值为 FALSE，则终止循环。
- 表达示3 在每次循环之后被求值。

```php
<?php
for ($i = 1; $i <= 10; $i++) {
    echo '分手后第'.$i.'年，我全都忘了你的样子<br />';
}
?>
```
```php
<?php
    for($i=0,$j=10;$i<$j;$i++,$j--){    
    echo $i.'---------'.$j.'<br />';
    }
?>
```
九九乘法口诀
```php
<?php

//99乘法口诀表从1开始，所以声明一个变量$i = 1,让$i小于10，也就是最大值为9
for($i = 1 ; $i < 10 ; $i++ ){
        //1x1=1，2x2等于4，所以第二次循环的最大值为$i的值，因此$j＝1, $j在循环自加的过程当中，只能够小于等于$i

    for($j=1;$j<=$i;$j++){
                //  1 x 2 = 2   2 x 2 = 4啦
        echo $j . 'x' . $i . '=' .($i*$j) . '   ';
    }
    echo '<br />';

}
```
关于break,exit和continue
- exit，从当前处停止后续执行
- break，跳出循环或者跳出结构体执行后续代码
- continue，跳出此次循环，下次循环继续

break示例
```php
<?php
for ($i = 1; $i <= 10; $i++) {

    if($i == 4){
            //待会儿换成continue试试
            
            break;
    }

    echo '分手后第'.$i.'年，我全都忘了你的样子<br />';
}
?>
```

#### 9.php流程控制之goto语法
自 PHP 5.3.0 起，还可以使用 goto 来跳出循环。
```php
<?php
//跳到wan,没有执行第一个echo
goto wan;
echo '天王盖地虎';

wan:
echo '小鸡炖蘑菇';
?>
```

这个到了17就停止了
```php
<?php
for($i=0; $i<100; $i++) {
    echo '第'. $i .'周往返北京大连<br />';
    if($i == 17){
            goto end; 
     }
}

end:
echo '集团公司要求停止此项';
?>
```