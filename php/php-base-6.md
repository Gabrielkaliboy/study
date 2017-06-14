#### 连接地址：http://www.php.cn/course/74.html

第六章php数组与数据结构
---
#### 1.php数组
- 数组的定义，定义中的一些坑
- 数组的函数使用和默写

#### 2.php数组的定义
##### 2.1
- 两个点
	- 数组可以存入多个不同类型的数据，是一个复合数据类型
	- 英文为array

- 简单数组声明
```php
<?php

$shu = array(1 , 1.5 , true ,'天王盖地虎，小鸡炖蘑菇');

echo '<pre>';
var_dump($shu);
echo '</pre>';

?>
```
我们在数组里面放入了整型，浮点型，布尔型还有字符串
在浏览器里面输出是这样的
```
array(4) {
  [0]=>
  int(1)
  [1]=>
  float(1.5)
  [2]=>
  bool(true)
  [3]=>
  string(33) "天王盖地虎，小鸡炖蘑菇"
}
```
- 观察他的输出内容，可以看出
	- array(size=4)说明里面有四个元素
	- [0]=>int(1):这里的[0]表示下标或者键
	- =>是一个符号，标准叫法是“键值对应符”。所以上面可以这么表达：下标0对应整型1
	- 我们还称数组里面的键值对为元素，元素就是键值对的组合
	- 上面是索引数组声明
	- 所谓索引数组，就是下标全为整型的数组

- 索引数组的下标必须从零开始吗？否
```php
<?php

$kele = array('只有不断努力才能博得未来',10 => 'NoAlike', 'PHP中文网' , '去PHP中文网学PHP', 19 => '凤姐和芙蓉我都爱' , '杨幂我最爱');

//打印显示$kele
echo '<pre>';
var_dump($kele);
echo '</pre>';
?>
```
```
array(6) {
  [0]=>
  string(36) "只有不断努力才能博得未来"
  [10]=>
  string(7) "NoAlike"
  [11]=>
  string(12) "PHP中文网"
  [12]=>
  string(21) "去PHP中文网学PHP"
  [19]=>
  string(24) "凤姐和芙蓉我都爱"
  [20]=>
  string(15) "杨幂我最爱"
}
```
- 再写一个格式优美的
```php
<?php

$kele = array(
           '只有不断努力才能博得未来',
           10 => 'NoAlike',
           'PHP中文网' ,
           '去PHP中文网学PHP',
           19 => '凤姐和芙蓉我都爱' ,
           '杨幂我最爱'
       );


//打印显示$kele
echo '<pre>';
var_dump($kele);
echo '</pre>';
?>
```
输出
```php
array(6) {
  [0]=>
  string(36) "只有不断努力才能博得未来"
  [10]=>
  string(7) "NoAlike"
  [11]=>
  string(12) "PHP中文网"
  [12]=>
  string(21) "去PHP中文网学PHP"
  [19]=>
  string(24) "凤姐和芙蓉我都爱"
  [20]=>
  string(15) "杨幂我最爱"
}
```
- 总结上面的例子
	-	1.索引数组若不强制声明他的下标，他的下标是从0开始的。（我们的第一个数组的值：只有不断努力才能博得未来。这个值的下标为0）。
	-   2.如果我指定过下标他的下标就为我指定的值。如下标为10和下标为19的，都是我指定过的值。
	-   3.若某个值（如NoAlike），强制指定了下标（下标为10）。在它后面加上的值（PHP中文网），不指定下标的话。他们的下标增长规律为最大值+1。

##### 2.2向索引数组中添加元素
```php
<?php

$minren = array(
           '杨幂',
           '王珞丹',
           '刘亦菲',
           '黄圣依'
       );


//如何向这$minren这个数组中增加元素呢

//猜猜范冰冰的下标是多少？
$minren[] = '范冰冰';
echo '<pre>';
var_dump($minren);
echo '</pre>';
$minren[100] = '范爷';
echo '<pre>';
var_dump($minren);
echo '</pre>';
//它的下标又为几呢？
$minren[] = '李晨';
echo '<pre>';
var_dump($minren);
echo '</pre>';

?>
```
输出
```php
array(5) {
  [0]=>
  string(6) "杨幂"
  [1]=>
  string(9) "王珞丹"
  [2]=>
  string(9) "刘亦菲"
  [3]=>
  string(9) "黄圣依"
  [4]=>
  string(9) "范冰冰"
}
array(6) {
  [0]=>
  string(6) "杨幂"
  [1]=>
  string(9) "王珞丹"
  [2]=>
  string(9) "刘亦菲"
  [3]=>
  string(9) "黄圣依"
  [4]=>
  string(9) "范冰冰"
  [100]=>
  string(6) "范爷"
}
array(7) {
  [0]=>
  string(6) "杨幂"
  [1]=>
  string(9) "王珞丹"
  [2]=>
  string(9) "刘亦菲"
  [3]=>
  string(9) "黄圣依"
  [4]=>
  string(9) "范冰冰"
  [100]=>
  string(6) "范爷"
  [101]=>
  string(6) "李晨"
}
```

总结：
-	1.向索引数组中增加元素用: 数组变量名[]、数组变量名[键值]这两种方式来增加元素
-	2.键值的增长规则与之前的规则一样。都是最大值加1的原则。


##### 2.3向索引数组中删除元素
```php
<?php

$minren = array(
           '杨幂',
           '王珞丹',
           '刘亦菲',
           '黄圣依',
           '范冰冰'
       );


//假设我不喜欢：黄圣依，如何将黄圣依给删掉掉呢？

//如果删除掉后范冰冰的下标为多少呢？

//如果在后面再追加一个元素，会填掉：“黄圣依”留下来的空吗？

unset($minren[3]);

$minren[] = '金星';


echo '<pre>';

var_dump($minren);

echo '</pre>';


?>
```

输出：
```php
array(5) {
  [0]=>
  string(6) "杨幂"
  [1]=>
  string(9) "王珞丹"
  [2]=>
  string(9) "刘亦菲"
  [4]=>
  string(9) "范冰冰"
  [5]=>
  string(6) "金星"
}
```
总结：
- 使用unset删除变量的方法来删除数组里面的值
- 删除了中间值，并不会让后面的下标自定向前移动，而是原来的值是多少就是多少
- 删除掉其中的某个值，新加入的值不会替换掉原来的位置，依然遵循最大值加一的原则

##### 2.4修改值
```php
<?php

$minren = array(
           '杨幂',
           '王珞丹',
           '刘亦菲',
           '黄圣依',
           '范冰冰'
       );

$minren[5] = '范爷';

$minren[2] = '亦菲，不要嫁给韩国人好吗？';

echo '<pre>';

var_dump($minren);

echo '</pre>';


?>
```

输出：
```php
array(6) {
  [0]=>
  string(6) "杨幂"
  [1]=>
  string(9) "王珞丹"
  [2]=>
  string(39) "亦菲，不要嫁给韩国人好吗？"
  [3]=>
  string(9) "黄圣依"
  [4]=>
  string(9) "范冰冰"
  [5]=>
  string(6) "范爷"
}
```
总结：
- 变量名[键值]=新值，就可以把数组中的值改了

##### 2.5索引数组的其他声明方式
- 直接用之前未声明的变量，用变量名后面接中括号的方式声明数组
```php
<?php
    //直接写一个变量后面加上中括号，声明变量
    $qi[] = '可口可乐';
    $qi[10] ='百事可乐';
    echo '<pre>';
    var_dump($qi);
    echo '</pre>';
?>
```
- 每次用array()写太麻烦了，还可以不写array
```php
<?php

$minren = [
           '杨幂',
           '王珞丹',
           100 => '刘亦菲',
           '黄圣依',
           '范冰冰'
       ];

echo '<pre>';

var_dump($minren);

echo '</pre>';

?>
```
输出
```php
array(5) {
  [0]=>
  string(6) "杨幂"
  [1]=>
  string(9) "王珞丹"
  [100]=>
  string(9) "刘亦菲"
  [101]=>
  string(9) "黄圣依"
  [102]=>
  string(9) "范冰冰"
}
```
##### 2.6关联数组
索引数组适当的变形就出现了关联数组，只要数组里面有一个为字符串的数组，就为关联数组。

声明关联数组与之前的声明方式是一样的，不过，必须要使用字符串下标，必须要使用键值对应符。

```php
<?php

//声明一下关联数组
$rela = array(
       '帅' => '陈奕迅',
       '很帅' => '黄晓明',
       '灰常灰常帅' => '宁泽涛',
       '有男人味的大叔' => '吴秀波',
);




//再来玩玩简洁声明

$drink = [
        '美' => '凤姐',
        '很美' => '芙蓉姐姐',
        'verymei' => '杨幂',
        '心中滴女神呀' => '华妃',
        100 => '孙俪',
        '娘娘',
       ];


// 输出 $rela
echo '<pre>';

var_dump($rela);

echo '</pre>';


// 输出$drink

echo '<pre>';

var_dump($drink);

echo '</pre>';

?>
```

输出
```php
array(4) {
  ["帅"]=>
  string(9) "陈奕迅"
  ["很帅"]=>
  string(9) "黄晓明"
  ["灰常灰常帅"]=>
  string(9) "宁泽涛"
  ["有男人味的大叔"]=>
  string(9) "吴秀波"
}
array(6) {
  ["美"]=>
  string(6) "凤姐"
  ["很美"]=>
  string(12) "芙蓉姐姐"
  ["verymei"]=>
  string(6) "杨幂"
  ["心中滴女神呀"]=>
  string(6) "华妃"
  [100]=>
  string(6) "孙俪"
  [101]=>
  string(6) "娘娘"
}
```

总结：
- 声明关联数组是 键名=>键值
- 在关联数组可以有索引数组的元素
- 关联数组中的索引数组的元素后在声明了无下标的元素，依然是最大值加1原则，看$drink里面最后两个元素


##### 2.7关联数组的增删改
```php
<?php 
$drink = [
             '美' => '凤姐',
             '很美' => '芙蓉姐姐',
             'verymei' => '王涛',
             '心中滴女神呀' => '杨澜',
             100 => '孙俪',
             '娘娘',
            ];
//追加方式与索引数组是一样的 
$drink['ynj'] = '伊能静'; 
//输出试试 
echo '<pre>';
var_dump($drink);
echo '</pre>'; 
//删除一个试试 
unset($drink['verymei']);
echo '<pre>';
var_dump($drink);
echo '</pre>'; 
//将芙蓉姐姐 改成：心里美才是真的美 
$drink['很美'] = '心里美才是真的美'; 
echo '<pre>';
var_dump($drink);
echo '</pre>'; 
?>
```

输出：
```php
array(7) {
  ["美"]=>
  string(6) "凤姐"
  ["很美"]=>
  string(12) "芙蓉姐姐"
  ["verymei"]=>
  string(6) "王涛"
  ["心中滴女神呀"]=>
  string(6) "杨澜"
  [100]=>
  string(6) "孙俪"
  [101]=>
  string(6) "娘娘"
  ["ynj"]=>
  string(9) "伊能静"
}
array(6) {
  ["美"]=>
  string(6) "凤姐"
  ["很美"]=>
  string(12) "芙蓉姐姐"
  ["心中滴女神呀"]=>
  string(6) "杨澜"
  [100]=>
  string(6) "孙俪"
  [101]=>
  string(6) "娘娘"
  ["ynj"]=>
  string(9) "伊能静"
}
array(6) {
  ["美"]=>
  string(6) "凤姐"
  ["很美"]=>
  string(24) "心里美才是真的美"
  ["心中滴女神呀"]=>
  string(6) "杨澜"
  [100]=>
  string(6) "孙俪"
  [101]=>
  string(6) "娘娘"
  ["ynj"]=>
  string(9) "伊能静"
}
```

##### 2.7其他关联数组的声明
```php
<?php
    $drink['nf'] = '农夫山泉';
    $cocacola = '可口可乐';
    //当然可以是变量哟
    $drink['kl'] = $cocacola;
    $data = array(
        'kl' => $cocacola,
    );
    echo '<pre>';
    var_dump($drink);
    echo '</pre>'; 
?>
```
通过上例我们发现，在关联数组当中也是可以不用array，直接在变量后面接括号。括号里面插入字符串下标，一样也声明成功。后面插入变量的例子，只不过把字符串变成了变量，当然没有问题。

输出
```php
array(2) {
  ["nf"]=>
  string(12) "农夫山泉"
  ["kl"]=>
  string(12) "可口可乐"
}
```

##### 2.8数组中插入数组
名词定义：
- 1.一维数组 数组里面没有其他数组，只有单纯的一些变量或者值。
- 2.二维数组 数组里面插入了单层的一个数组，或者多个数组
- 3.三维数组 在数组（A）里面插入了一个数组（B），在B数组里面又插入了一层级的数组（C），这种我们就称为三维数组
- 4.超过三维的，统统都叫多维数组。

一维数组：
```php
<?php

//一维的索引数组
$data = [1 , 2 , 3 , 4 ,  10 => 250];

//一维的关联数组

$rela = [
           'beijing' => '北京',
           'shanghai' => '上海',
           'tj' => '天津',
       ];

echo '<pre>';
var_dump($rela);
echo '</pre>';

echo '<pre>';
var_dump($data);
echo '</pre>';
?>
```

输出：
```php
array(3) {
  ["beijing"]=>
  string(6) "北京"
  ["shanghai"]=>
  string(6) "上海"
  ["tj"]=>
  string(6) "天津"
}
array(5) {
  [0]=>
  int(1)
  [1]=>
  int(2)
  [2]=>
  int(3)
  [3]=>
  int(4)
  [10]=>
  int(250)
}
```

二位数组：
```php
<?php

$person = array(

       'office' => '办公室',

       //注意：插入第一个数组哟
       'family' => array(

           '爸爸',
           '妈妈',
           'yeye' => '爷爷',
           'nn' => '奶奶',
       ),

       //注意：又插入了一个平级的数组
       'jiaotong' => array(
           '自行车',
           '摩托车',
           '汽车',
           '飞机',
       ),
);

echo '<pre>';
var_dump($person);
echo '</pre>';

?>
```

输出
```php
array(3) {
  ["office"]=>
  string(9) "办公室"
  ["family"]=>
  array(4) {
    [0]=>
    string(6) "爸爸"
    [1]=>
    string(6) "妈妈"
    ["yeye"]=>
    string(6) "爷爷"
    ["nn"]=>
    string(6) "奶奶"
  }
  ["jiaotong"]=>
  array(4) {
    [0]=>
    string(9) "自行车"
    [1]=>
    string(9) "摩托车"
    [2]=>
    string(6) "汽车"
    [3]=>
    string(6) "飞机"
  }
}
```

总结：persion是一个数组类型，对应三个元素
- 第一个元素为office对应的第一个字符串“办公室”
- 第二个元素为family，对应的元素是数组，这个数组里面又对应四个元素，爸爸妈妈爷爷奶奶
- 第三个元素为jiaotong,里面也是一个数组，值分别为自行车，摩托车，汽车，飞机

如何读取数组中的爸爸爷爷这两个值呢
```php
<?php
$person = [

       'office' => '办公室',

       //注意：插入第一个数组哟
       'family' => [

           '爸爸',
           '妈妈',
           'yeye' => '爷爷',
           'nn' => '奶奶',
       ],

       //注意：又插入了一个平级的数组
       'jiaotong' => [
           '自行车',
           '摩托车',
           '汽车',
           '飞机',
       ],
];

//访问“爸爸”这什值
echo $person['family'][0];

echo '<br />-----华丽丽的分割线------<br />';


//访问“爷爷”这什值
echo $person['family']['yeye'];

echo '<br />-----华丽丽的分割线------<br />';

//访问“汽车”这什值
echo $person['jiaotong'][2];


?>
```
输出：
```php
爸爸
-----华丽丽的分割线------
爷爷
-----华丽丽的分割线------
汽车
```
**按照之前的下标读取方式依次向下读取就可以**


三维数组：
```php
<?php


$area = array(

       'china' => array(

           '上海',
           '湖北',
           '天津',
           '北京' => array(
               'hd' => '海淀',
               '朝阳',
               '房山',
               'cp' => '昌平',
           ),

           '广东' => array(
               '深圳',
               '广州',
               '佛山',
               'dg' => '东莞',

           ),

       ),


       'usa' => array(

           '华盛顿',
           '旧金山',
           '纽约' => array(
                   '曼哈顿区',
                   '皇后区',
                   '布鲁克林区',
           ),

       ),
);


echo '<pre>';
var_dump($area);
echo '</pre>';
?>
```

输出：
```php
array(2) {
  ["china"]=>
  array(5) {
    [0]=>
    string(6) "上海"
    [1]=>
    string(6) "湖北"
    [2]=>
    string(6) "天津"
    ["北京"]=>
    array(4) {
      ["hd"]=>
      string(6) "海淀"
      [0]=>
      string(6) "朝阳"
      [1]=>
      string(6) "房山"
      ["cp"]=>
      string(6) "昌平"
    }
    ["广东"]=>
    array(4) {
      [0]=>
      string(6) "深圳"
      [1]=>
      string(6) "广州"
      [2]=>
      string(6) "佛山"
      ["dg"]=>
      string(6) "东莞"
    }
  }
  ["usa"]=>
  array(3) {
    [0]=>
    string(9) "华盛顿"
    [1]=>
    string(9) "旧金山"
    ["纽约"]=>
    array(3) {
      [0]=>
      string(12) "曼哈顿区"
      [1]=>
      string(9) "皇后区"
      [2]=>
      string(15) "布鲁克林区"
    }
  }
}
```
总结：
- 在变量$area下有二个数组，一个为china，一个为usa。
- 在china这个数组里面插入了上海、湖北、天津，又插入了北京和广东。而北京和广东又是一个数组。在北京和广东这两个数组里面分别有不同的元素。

- 在这usa 这个数组里面插美国的华盛顿、旧金山和纽约。而纽约下面又是一个数组，说明了纽约下面的几个区。
- 所以说，三维数组就是在数组里面再插入一个数组(A)，在A数组里面插入一个数组。

去读三维数组的变量

```php
<?php


$area = array(

       'china' => array(

           '上海',
           '湖北',
           '天津',
           '北京' => array(
               'hd' => '海淀',
               '朝阳',
               '房山',
               'cp' => '昌平',
           ),

           '广东' => array(
               '深圳',
               '广州',
               '佛山',
               'dg' => '东莞',

           ),

       ),


       'usa' => array(

           '华盛顿',
           '旧金山',
           '纽约' => array(
                   '曼哈顿区',
                   '皇后区',
                   '布鲁克林区',
           ),

       ),
);


//读取华盛顿
echo $area['usa']['0'];

//读取：布鲁克林
echo $area['usa']['纽约'][2];


//读取：昌平
echo $area['china']['北京']['cp'];

//修改cp下标的值改为：西城区

$area['china']['北京']['cp'] = '西城区';

//输出看看原来昌平的值是否发生了变化
echo $area['china']['北京']['cp'];

?>
```
输出：
```php
华盛顿布鲁克林区昌平西城区
```

**数组元素间的分割符为逗号，在数组中插入数组的时候，不要在结尾处写成了分号（；）**

#### 3.php数组的计算
使用count()函数
- 用法
    `int count ( mixed $变量)`
- 参数$变量要求是一个数组或者是一个可以被统计的对象
```php
<?php
$a[0] = 1;
$a[1] = 3;
$a[2] = 5;
$result1 = count($a);
// $result1 == 3
echo $result1."<br>";

$b[0]  = '迪奥和奥迪我都爱';
$b[5]  = '努力开创未来';
$b[10] = '为了未来而努力';
$result2 = count($b);
echo $result2."<br>";
//$result2==3
$data = [
       'baidu' =>'百度',
       'ali' => '阿里',
       'tencent' => '腾讯',
       ];
echo count($data)."<br>";
//$data==3
$erwei = [
           [
           'baidu' =>'百度',
           'ali' => '阿里',
           'tencent' => '腾讯',
           ],
           [
           'netease' =>'网易',
           'sohu' => '搜狐',
           'sina' => '新浪',
           ]
       ];

//试试输出一个二维数组个数==2
echo count($erwei)."<br>";

//试试输出二维数组中某个元素的个数==3
echo count($erwei[1]);
?>
```
**可以输出索引数组，也可以输出关联数组**

#### 4.for循环遍历索引数组
索引为数字
```php
<?php

//声明一个数组，值为1到10
$num = array(1,2,3,4,5,6,7,8,9,10);

//按照索引数组的特点，下标从0开始。所以1的下标为0，10的下标为9
echo $num[0].'<br />';
echo $num[9].'<br />';


//我们可以得到数组中元素的总个数,为10
echo count($num)."<br>";

//遍历这个索引数组的话，我们就可以定义一个变量为$i
//$i 的值为0，从0开始
//可以设定一个循环条件为：$i 在下标的(9)最大值之内循环
for($i = 0 ; $i < count($num) ; $i++){

   echo $num[$i].'<br />';

}

?>
```
输出
```php
1
10
10
1
2
3
4
5
6
7
8
9
10
```
#### 5.foreach遍历关联数组
语法：
```php
foreach( 要循环的数组变量 as [键变量 =>] 值变量){
//循环的结构体
}
```
这是一个固定用法，将要循环的数组放进去。as 是一个固定的关键字,后面的键变量是可选的，随意定义一个变量，每次循环的时候，foreach这个语法会把键取出来赋值到键变量里面.后面的值变量是必填的。每次循环的时候，会把值放到值变量里面。
遍历关联数组：
```php
<?php

$data = [
       'fj' => '凤姐',
       'fr' => '芙蓉',
   ];


foreach($data  as $key => $value){
       echo $key . '-------' . $value . '<br />';
}


//如果我们只想读取值的话，就可以把下面的$key => 给删除掉，读取的时候，就只读取值了。做完上面的实验，你可以打开下面的代码再实验几次。


foreach($data  as  $value){
       echo  $value . '<br />';
}

?>
```
输出：
```php
fj-------凤姐
fr-------芙蓉
凤姐
芙蓉
```

总结：
- 1.每次循环的时候，把下标赋值给了变量$key，把值的变量赋值给了变量$value
- 2.循环一次读一次键和值。如上例中，读完“凤姐”再读取“芙蓉”，读到最后，发现没有可以读取的数组元素后，停止循环遍历数据。
- 注意：$key 和$value并不是变量名必须得为这两个名字。你命名为其他的也可以，如 $kai => $wen是一样的。 你要清楚键赋值给了哪个变量，值赋值给了另外的哪个变量。

遍历索引数组：
```php
<?php

$data = array(
       0 => '中国',
       100 => '美国',
       20 => '韩国',
       300 => '德国',
   );

//待会儿可以自己做做实验，循环遍历一下下面的这个数组
//$data = array(1,2,3,4,5,6,7,8,9,10);


foreach($data as $k => $v){

   echo $k . '------' . $v .'<br />';

}

?>
```

输出
```php
0------中国
100------美国
20------韩国
300------德国
```

遍历多为数组
```php
<?php

$data = array(

       0 => array(
           '中国' => 'china',
           '美国' => 'usa',
           '德国' => ' Germany',
       ),

       1 => array(
           '湖北' => 'hubei',
           '河北' => 'hebei',
           '山东' => 'shandong',
           '山西' => 'sanxi',
       ),

);

//注：我们在使用foreach循环时，第一次循环将键为0和键为1的两个数组赋值给一个变量($value)。然后，再套一个循环遍历这个$value变量，$value中的值取出来，赋值给$k和$v。

foreach($data as $value){

   //第一次循环把国家的数组赋值给了$value
   //第二次循环把中国的省份的数组又赋值给了$value
   //因此，我在循环的时候把$value再遍历一次

   foreach($value as $k => $v){
           echo $k . '-----' . $v .'<br />';
   }

   //为了看的更清晰，我在中间加上华丽丽的分割线方便你来分析

   echo '----------分割线-----------<br />';

}

?>
```

输出：
```php
中国-----china
美国-----usa
德国----- Germany
----------分割线-----------
湖北-----hubei
河北-----hebei
山东-----shandong
山西-----sanxi
----------分割线-----------
```

总结：
- 第一次循环的时候，将数组赋值给了$value，然后用foreach循环$value。将二维的子数组中的键给到$k，值赋值给变量$v。
- 第一次循环退出子数组的循环，执行后续代码显示分割线。依此类推，第二次循环也是这样。


#### 6.php list/each函数操作数组

##### 6.1list函数
语法：
    `list ( mixed $变量1 [, mixed $变量n ] )`

功能：它的功能：将索引数组下标为0的对应我变量1，下标1的对应变量2，依此类推。

```php
<?php

list($one , $two , $three) = array('张三' ,'李四' ,'王五');

//再次声明：单引号不结释变量，所以输出的是字符串$one
echo '$one----'.$one.'<br />';
echo '$two----'.$two.'<br />';
echo '$three----'.$three.'<br />';

?>
```

输出：
```php
$one----张三
$two----李四
$three----王五
```
总结：list的功能就是从左到右，一一对应索引数组从0开始的下标值。

list的另外一种用法
```php
<?php

list( ,  , $three) = array('张三' ,'李四' ,'王五');

echo '$one----'.$one.'<br />';
echo '$two----'.$two.'<br />';
echo '$three----'.$three.'<br />';

?>
```

输出：
```php

Notice: Undefined variable: one in D:\xampp\htdocs\phpStudy\3-25-3.php on line 5
$one----

Notice: Undefined variable: two in D:\xampp\htdocs\phpStudy\3-25-3.php on line 6
$two----
$three----王五
```

总结：
    1.list当中的第一、二个放变量的地方留空，我只写了$three。    2.按照一一对应原则，张三和李四没有变量可以对应。    3.所以只有王五有变量对应



在来一个：
```php
<?php
list($one, $two, $three) = array(2 => '张三', '李四', '王五');
echo '$one----' . $one . '<br />';
echo '$two----' . $two . '<br />';
echo '$three----' . $three . '<br />';
?>
```

输出：
```php

Notice: Undefined offset: 0 in D:\xampp\htdocs\phpStudy\3-25-3.php on line 2

Notice: Undefined offset: 1 in D:\xampp\htdocs\phpStudy\3-25-3.php on line 2
$one----
$two----
$three----张三
```

总结：
    1.因为是一一对应原则，$one找不到下标为0的数组元素，$two找不到下标为1的数组元素，只有$three找到了下标为2的数组元素    3.在list($one, $two, $three)，我只写了三个变量。对应完成，无需再对应后面的变量了，丢弃李四和王五。


##### 6.2each函数
语法：`array each ( array &$array )`
功能：传入一个数组。它会将其中的一个元素拆为个新数组。每次执行这样操作一个元素。执行一次先后移动一次，同样的方式操作下一个数组元素。执行到最后，返回false。

```php
<?php

//定义一个变量叫$kongjie(空姐)
$kongjie=[
   'gao'=>'穿黑衣服的',
   'shou'=>'退特别长特别细',
   'mei'=>'好白',
   'pl'=>'五官端正',
   'type'=>'那就是女神',
   '我是吊丝不敢跟女神搭讪'
   ];

//第一次each
$data = each($kongjie);

echo '<pre>';
var_dump($data);
echo '</pre>';


?>
```

输出：
```php
array(4) {
  [1]=>
  string(15) "穿黑衣服的"
  ["value"]=>
  string(15) "穿黑衣服的"
  [0]=>
  string(3) "gao"
  ["key"]=>
  string(3) "gao"
}
```
总结：
1.读取了$kongjie中的第一个元素，将第一个元素（'gao'=>'穿黑衣服的'）分解开了。    1分解后第一个元素变成了一个新数组。    2在新数组里面，将原值（穿黑衣服的）放了索引下标1里面，同时放到了关联下标value里面。    3在新数组里面，将原键（gao），放到了关联下标key里面，放到了索引下标0里面。


接下来我们说说each的另外一个特性。读一次，向后移动一个元素。
```php
<?php

//定义一个变量叫$kongjie(空姐)
$kongjie=[
   'gao'=>'穿黑衣服的',
   'shou'=>'退特别长特别细',
   'mei'=>'好白',
   ];

//第一次each
$data = each($kongjie);

echo '<pre>';
var_dump($data);
echo '</pre>';

echo '-----华丽丽分割线------<br />';


//第2次each
$data = each($kongjie);

echo '<pre>';
var_dump($data);
echo '</pre>';

echo '-----华丽丽分割线------<br />';

//第3次each【执行到了最后一个元素了】
$data = each($kongjie);

echo '<pre>';
var_dump($data);
echo '</pre>';

echo '-----华丽丽分割线------<br />';

//第4次【此时，后面已没有可操作的元素了，看返回什么】
$data = each($kongjie);

echo '<pre>';
var_dump($data);
echo '</pre>';

echo '-----华丽丽分割线------<br />';

?>
```
输出：
```php
array(4) {
  [1]=>
  string(15) "穿黑衣服的"
  ["value"]=>
  string(15) "穿黑衣服的"
  [0]=>
  string(3) "gao"
  ["key"]=>
  string(3) "gao"
}
-----华丽丽分割线------
array(4) {
  [1]=>
  string(21) "退特别长特别细"
  ["value"]=>
  string(21) "退特别长特别细"
  [0]=>
  string(4) "shou"
  ["key"]=>
  string(4) "shou"
}
-----华丽丽分割线------
array(4) {
  [1]=>
  string(6) "好白"
  ["value"]=>
  string(6) "好白"
  [0]=>
  string(3) "mei"
  ["key"]=>
  string(3) "mei"
}
-----华丽丽分割线------
bool(false)
-----华丽丽分割线------
```

总结：
    1.读一次向后移动一次【可以想象有一个记录的箭头在移动】，将其中的每个元素拆解成一个新数组    2.读取到最后，没有可操作的元素了，所以返回了false。



##### 6.3list与each函数相结合
语法：`list($key,$value) = each($array);`

```php
<?php

//定义一个变量叫$kongjie(空姐)
$kongjie=[
   'gao'=>'穿黑衣服的',
   'shou'=>'腿特别长特别细',
   'mei'=>'好白',
   ];

list($key,$value) = each($kongjie);

echo $key. '-----' .$value .'<br />';

?>
```

输出：
```php
gao-----穿黑衣服的
```

总结：    1.each 把变量拆成了4个元素    2.而list把0 =>gao 赋值给了变量$key    3.list把1 => 穿黑衣服的 赋值给了变量 $value。each到最后会返回false，因此我可以用布尔型循环while来配合完成数组的循环。


```php
<?php

//定义一个变量叫$kongjie(空姐)
$kongjie=[
   'gao'=>'穿黑衣服的',
   'shou'=>'退特别长特别细',
   'mei'=>'好白',
   ];

while(list($key,$value) = each($kongjie)){

   echo $key. '-----' .$value .'<br />';

}

?>
```
输出：
```php
gao-----穿黑衣服的
shou-----退特别长特别细
mei-----好白
```

总结：
    1.循环一次，执行一次each，执行代码，然后向后移动一个元素    2.执行到最后返回fasle，因此停止执行。    3.可以通过each和list配合实现foreach一样的效果。


#### 7.php常用操作数组函数