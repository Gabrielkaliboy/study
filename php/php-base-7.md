#### 连接地址：http://www.php.cn/course/74.html

第七章php中的正则表达式
---
#### 2. 正则表达式的定界符
规则：定界符，不能用a-zA-Z0-9\,其他的都可以用，有开始就有结束
- /中间写正则/:正确
- $中间写正则$:正确
- %中间写正则%:正确
- ^正则^：正确
- @正则@：正确
- (正则)：错误
- A正则A:错误

注意：\是转义字符，如果在以后正则表达式里面需要匹配/，如下
///

这个时候真要匹配/的时候，需要把定界符里面的/，用转义字符转义一下，写成下面这样
/\//

如果觉得麻烦，可以用其他的定界符


#### 3. 正则表达式的原子
原子是正则表达式中的最小单位，原子说白了就是要匹配的内容，一个成立的正则表达式中，至少要有一个原子。

所有可见不可见的字符都是原子
说明：我们见到的空格，回车，换行，0-9，a-z,A-Z、中文、标点符号，特殊符号，全部都是原子

##### 3.1 preg_match
功能：根据$正则变量，匹配$字符串变量，如果存在就返回匹配的个数，把匹配到的结果放到$结果变量里，如果没有匹配到结果则返回0

语法：`int preg_match ( string $正则 , string $字符串 [, array &$结果] )`

注：上面是preg_match常用的主要几个参数。我在上面将另外几个参数没有列出来。因为，另外两个参数太不常用了。
*返回的是第一个匹配到的元素？？*
```php
<?php
	$pattern="/a/";
	$string="zdkkkjkcsadcjkji3434";
	if(preg_match($pattern,$string,$matches)){
		echo "匹配到了，结果为:";
		var_dump($matches);
	}else{
		echo "没有匹配到";
	}
//匹配到了，结果为:array(1) { [0]=> string(1) "a" }
?>
```

匹配一个空格试试
```php
<?php
	$pattern="/ /";
	$string="zdkkkjkcsad cjkji3434";
	if(preg_match($pattern,$string,$matches)){
		echo "匹配到了，结果为:";
		var_dump($matches);
	}else{
		echo "没有匹配到";
	}
?>
```


##### 3.2特殊标记的原子(默写)
- \d:匹配一个0-9
- \D: 除了0-9以外的所有字符
- \w:匹配a-zA-Z0-9_
- \W:除了a-zA-Z0-9_以外的所有字符
- \s:匹配所有空白字符\n \t \r
- \S:匹配所有非空白字符
- []:指定范围的原子

匹配一个0-9
```php
<?php
	$pattern="/\d/";
	$string="s3d";
	if(preg_match($pattern,$string,$matches)){
		echo "匹配到了，结果为:";
		var_dump($matches);
	}else{
		echo "没有匹配到";
	}
	//匹配到了，结果为:array(1) { [0]=> string(1) "3" }
?>
```

匹配所有空白字符\n \t \r空格
```php
<?php
$zz = '/\s/';

$string = "中国万
岁";

if(preg_match($zz, $string, $matches)){
   echo '匹配到了，结果为：';
   var_dump($matches);
}else{
   echo '没有匹配到';
}
//匹配到了，结果为：array(1) { [0]=> string(1) " " }
?>
```

指定范围的原子
```php
<?php

$zz = '/[0-5]\w+/';

$string = '6a';

$string1 = '1C';

if(preg_match($zz, $string, $matches)){
   echo '匹配到了，结果为：';
   var_dump($matches);
}else{
   echo '没有匹配到';
}

?>
```
总结：上例中0-5匹配$string失败，而$string1成功。因为，$string中的第一个数值为6，不在[0-5]的范围之内。

```php
<?php

$zz = '/[a-zA-Z0-9_]\w/';

$string = 'ab';

$string1 = '9A';

if(preg_match($zz, $string, $matches)){
   echo '匹配到了，结果为：';
   var_dump($matches);
}else{
   echo '没有匹配到';
}

?>
```
总结：$string和$string1都匹配成功。因为\w就是[a-zA-Z0-9_]


```php
<?php

$zz = '/[abc]\d+/';

$string = 'a9';

$string1 = 'b1';

$string2 = 'c5';

$string3 = 'd4';


if(preg_match($zz, $string, $matches)){
   echo '匹配到了，结果为：';
   var_dump($matches);
}else{
   echo '没有匹配到';
}

?>
```
总结：$string、$string1、$string2匹配成功，而$string3不成功。因为$string3超过了[abc]的范围，它是从d开始的。


##### 3.3[^字符]不匹配指定区间的字符
```php
<?php

$zz = '/[^0-9A-Za-z_]/';

$string = 'aaaaab311dd';

$string1 = '!$@!#%$#^##';

if(preg_match($zz, $string, $matches)){
   echo '匹配到了，结果为：';
   var_dump($matches);
}else{
   echo '没有匹配到';
}

?>
```

总结：    1.匹配$string不成功，但是匹配$string1的时候成功。因为中括号里面有个抑扬符。    2.^ 抑扬符在中括号里面的作用是不准以中括号里面的字符进行匹配。

#### 4. 正则表达式中的元字符
- *：代表匹配前面的一个原子，匹配0次或者任意多次前面的字符
- +：匹配一次或者多次前面的一个字符
- ?：前面的字符可有可无[可选]，有或者没有
- .：更标准一些，应该吧点算作原子，匹配除了\n以外的所有字符
- |：或者。注：他的优先级最低
- ^：必须要以抑扬符之后的字符串开始
- $：必须要以$之前的字符串结尾
- \b：词边界
- \B:非边界
- {m}：有且只能出现m次
- {n,m}：可以出现n-m次
- {m,}：至少m次，最大次数不限制
- ()：改变优先级或者将某个字符串视为整体，匹配到的数据取出来也可以使用它。

##### 4.1+:匹配至少一次前面的字符
```php
<?php
$zz = '/\d+/';

$string = "迪奥和奥迪250都是我最爱";

//待会儿再试试中间没有0-9的情况
//$string = "迪奥和奥迪都是我最爱";


if(preg_match($zz, $string, $matches)){
   echo '匹配到了，结果为：';
   var_dump($matches);
}else{
   echo '没有匹配到';
}
//匹配到了，结果为：array(1) { [0]=> string(3) "250" }
?>
```
总结：匹配成功，证明了\d+中的+。\d是匹配数字，而+是最少匹配一次前面的字符。

##### 4.2*:匹配0次或者任意多次前面的字符
```php
<?php
$zz = '/\w*/';

$string = "!@!@!!@#@!$@#!";

//$string1 = "!@#!@#!abcABC#@#!";


if(preg_match($zz, $string, $matches)){
   echo '匹配到了，结果为：';
   var_dump($matches);
}else{
   echo '没有匹配到';
}
//匹配到了，结果为：array(1) { [0]=> string(0) "" }

?>
```
说明，注释掉的$string1和$string都匹配成功了。因为，\w是匹配的0-9A-Za-z_，而*是说明前面的\w可以不存在。如果存在可以有1个或者多个。

##### 4.3 ?前面的字符出现一次或者0次，可有可无
```php
<?php

$zz = '/ABC\d?ABC/';

$string = "ABC1ABC";

//待会儿再试试中间没有0-9的情况
//$string1 = "ABC888888ABC";
//$string2 = "ABCABC";


if(preg_match($zz, $string, $matches)){
   echo '匹配到了，结果为：';
   var_dump($matches);
}else{
   echo '没有匹配到';
}

?>
```
总结：匹配$string,$string2成功，但是匹配$string1失败。因为匹配前后都是ABC，中间是一个0-9。0-9可有可无，但是不能有多个。


##### 4.4 .（点）匹配除了\n以外的所有字符
```php
<?php

$zz = '/gg.+gg/';

$string = "gg ggkjijlkjggadfgg
adfjkjgg";


if(preg_match($zz, $string, $matches)){
   echo '匹配到了，结果为：';
   var_dump($matches);
}else{
   echo '没有匹配到';
}
//匹配到了，结果为：array(1) { [0]=> string(19) "gg ggkjijlkjggadfgg" }
?>
```

##### 4.5 |(竖线)，或者，优先级最低
```php
<?php

$zz = '/abc|bcd/';

$string1 = "abccd";
$string2 = "ggggbcd";

if (preg_match($zz, $string1, $matches)) {
   echo '匹配到了，结果为：';
   var_dump($matches);
} else {
   echo '没有匹配到';
}
//匹配到了，结果为：array(1) { [0]=> string(3) "abc" }
?>
```
    1.最开始我匹配的想法是想匹配的是abccd或者是abbcd。可是，匹配$string1和$string2，匹配出来的结果却是abc和bcd.    2.实现了或者匹配，匹配出来了abc或者是bcd。它还没有字符串连续在一起的优先级高。那么问题来了，我要匹配上例中的abccd或者是abbcd怎么办？需要使用到() 来改变优先级。


```php
<?php

$zz = '/ab(c|b)cd/';

$string1 = "起来abccd阅兵";
$string2 = "ggggbcd";
$string3 = '中国abbcd未来';

if (preg_match($zz, $string1, $matches)) {
   echo '匹配到了，结果为：';
   var_dump($matches);
} else {
   echo '没有匹配到';
}
//匹配到了，结果为：array(2) { [0]=> string(5) "abccd" [1]=> string(1) "c" }
?>
```
总结：
    1.确实匹配了了abccd或者abbcd（$string1 or $string3）。    2.但是匹配的数组里面多了一个元素，这个元素的下标为1    3.()中的内容只要匹配成功，会把匹配到的数据放到下标为1的这个数组元素中。

##### 4.6 ^(抑扬符)，必须以^以后的字符开始
```php
<?php

$zz = '/^猪哥好帅\w+/';

$string1 = "猪哥好帅abccdaaaasds";
//$string2没有以猪哥好帅开始
$string2 = "帅abccdaaaasds";


if (preg_match($zz, $string1, $matches)) {
   echo '匹配到了，结果为：';
   var_dump($matches);
} else {
   echo '没有匹配到';
}
//匹配到了，结果为：array(1) { [0]=> string(24) "猪哥好帅abccdaaaasds" }
?>
```
总结：    1.$string1匹配成功，$string2没有匹配成功	    2.因为$string1是以指定的字符开始的    3.而$string2并没有以^之后的字符开始    4.翻译这个正则的意思就是：以要猪哥好帅开始后面接a-zA-Z0-9_最少一个字符。

##### 4.7 $(美元符)，必须以$之前的符号结束
```php
<?php

$zz = '/\d+努力$/';

$string1 = "12321124333努力";
//$string2
$string2 = "12311124112313力";


if (preg_match($zz, $string1, $matches)) {
   echo '匹配到了，结果为：';
   var_dump($matches);
} else {
   echo '没有匹配到';
}

?>
```
    1.$string1 匹配成功，而$string2匹配不成功    2.$之前的字符是\d+，后面接着中文的努力。    3.因此，匹配的是这一个整体。\d指的是0-9的整型,+号代表最少一个0-9


##### 4.8 \b和\B词边界和非词边界
边界：
- 正则表达式室友边界的，这个边界是界定符的开始和结尾是正则的边界
- this是一个英文单词，后面加上一个空格，意味这个词结束了，到达了词的边界
- \b词边界，就是指必须在最前或者最后面
- \B非边界，就是不能在一个正则表达式的最前或者最后


```php
<?php

$zz = '/\w+\b/';

$string1 = "this is a apple";
$string2 = "thisis a apple";
$string3 = "thisisaapple";

if (preg_match($zz, $string1, $matches)) {
   echo '匹配到了，结果为：';
   var_dump($matches);
} else {
   echo '没有匹配到';
}
//匹配到了，结果为：array(1) { [0]=> string(4) "this" }
?>
```
    1.$string1、$string2和$string3都匹配成功。    2.$string1匹配的时候this 空格是边界    3.$string2匹配的时候thisis是边界    4.$string3匹配的时候，thisisaapple到了整个正则表达示的最后，因此也是边界。所以匹配成功。


非词边界
```php
<?php

$zz = '/\Bthis/';

$string1 = "hellothis9";

//$string2 = "hello this9";
//$string2 = "this9中国万岁";

if (preg_match($zz, $string1, $matches)) {
   echo '匹配到了，结果为：';
   var_dump($matches);
} else {
   echo '没有匹配到';
}
//匹配到了，结果为：array(1) { [0]=> string(4) "this" }
?>
```
总结：    1.匹配$string1成功而$string2不成功。    2.因为\B后接的是this，所以this不能在词边界（空格和开始结尾）的位置出现。


##### 4.9{m}有且只能出现m次
```php
<?php

$zz = '/喝\d{3}酒/';

$string1 = "喝988酒";

//$string2 = "喝98811酒";

if (preg_match($zz, $string1, $matches)) {
   echo '匹配到了，结果为：';
   var_dump($matches);
} else {
   echo '没有匹配到';
}
//匹配到了，结果为：array(1) { [0]=> string(9) "喝988酒" }
?>
```
总结：
上例中\d{3}我规定了0-9只能出现3次，多一次少一次都不行。

##### 4.9{n,m}可以出现n到m次
```php
<?php

$zz = '/喝\d{1,3}酒/';

$string1 = "喝9酒";

//$string2 = "喝988酒";

if (preg_match($zz, $string1, $matches)) {
   echo '匹配到了，结果为：';
   var_dump($matches);
} else {
   echo '没有匹配到';
}
//匹配到了，结果为：array(1) { [0]=> string(7) "喝9酒" }
?>
```
上例中\d{1,3}我规定了0-9只能出现1次，2次或者3次。其它次数都是错的

##### 4.10 {m,} 至少m次，最大次数不限制
```php
<?php

$zz = '/喝\d{2,}/';

$string1 = "喝9";

//$string2 = "喝98";
//$string3 = "喝98122121";


if (preg_match($zz, $string1, $matches)) {
   echo '匹配到了，结果为：';
   var_dump($matches);
} else {
   echo '没有匹配到';
}
//没有匹配到
?>
```
上例中\d{2,}我规定喝后面的0-9最少出现两次，最多次数不限。因此$string1是匹配不成功的，$string2是匹配成功的。$string3是匹配成功的。