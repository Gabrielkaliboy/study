#### 连接地址：http://www.php.cn/course/74.html

第十一章 php错误处理
---
#### 1.php错误处理
例如下面这段代码，我们不加分号就全面暴露了我们的服务器端文件存放路径、框架信息等。如下：
```php
<?php

$fp = fopen('abc.txt','a+')

fwrite($fp,'abc');

fclose($fp);
//Parse error: syntax error, unexpected 'fwrite' (T_STRING) in D:\xampp\htdocs\phpStudy\upload.php on line 5
?>
```

#### 2.禁止显示错误
在php.ini配置文件中，我们可以控制php的错误显示状态：
**display_errors**
这个选项设置是否将错误信息展示到网页，或者对用户隐藏而不显示。这个值得状态为on或者off，或者是0或1。设为0或者off，则不再页面显示错误；

##### 如果没有修改php.ini状态的权限怎么办？
可以使用ini_set
```php
<?php
ini_set('display_errors' , 0 );
?>
```
上面的代码也相当于修改了php.ini中display_errors的值。不过，仅仅在当前php代码中生效。

##### 想取得php.ini的配置项状态
可以使用ini_get(参数项)得到参数的值
```php
<?php
echo '服务器中display_errors的状态为' . ini_get('display_errors');
?>
```
**修改完php.ini文件以后，需要重新启动服务器**


#### 3.错误报告级别

掌握级别的错误类型
- E_ERROR:错误，文件直接中断
- E_WARNING:警告，问题比较严重，但是还会继续向下执行
- E_NOTICE：提示，有些小问题不会影响到程序，常发生在项目未定义
- E_PARSE:编译时语法解析错误，解析错误仅仅由分析器 产生
- E_ALL:所有错误
- E_STRICT:启用php对代码的修改建议，以确保代码具有最佳的互操作性和向前兼容性
- E_DEPRECATED:启用后将会对在未来版本中可能无法正常工作的代码给出警告

在上面的几种类型中，error最严重，必须要解决，否则程序无法继续向下执行
warning也很重要。通也必须要解决。如果明确的，故意的可以不用处理。
notice 你可以不用管。但是在有些公司，项目标准特别高。在高标准要求的项目中也必须要解决。因为，notice会影响到PHP的执行效率。通常发生在函数未定义等。
parse错误，是指语法错写错了，必须要解决
代表全部类型的所有错误



了解级别的错误类型
- E_CORE_ERROR：在PHP初始化启动过程中发生的致命错误。该错误类似E_ERROR，但是是由PHP引擎核心产生的
- E_CORE_WARNING：PHP初始化启动过程中发生的警告 (非致命错误) 。类似 E_WARNING，但是是由PHP引擎核心产生的。
- E_COMPILE_ERROR：致命编译时错误。类似E_ERROR,但是是由Zend脚本引擎产生的。
- E_COMPILE_WARNING：编译时警告(非致命错误)。类似E_WARNING，但是是由Zend脚本引擎产生的
- E_USER_ERROR：用户自定义错误
- E_USER_WARNING：用户自定义警告
- E_USER_NOTICE：用户自定义提示
- E_USER_DEPRECATED：用户产少的警告信息。类似E_DEPRECATED,但是是由用户自己在代码中使用PHP函数trigger_error()来产生的。
- E_RECOVERABLE_ERROR：可被捕捉的致命错误。它表示发生了一个可能非常危险的错误，但是还没有导致PHP引擎处于不稳定的状态。


##### error_reporting报告错误类型
error_reporting 是指错误报告。在php.ini中也有这样一个参数。这个参数。决定了PHP引擎记录、报告、显示哪些错误类型。

一、 在php.ini中error_reporting参数。如若error_reporting参数设置为0。整个PHP引擎发错误均不会显示、输出、记录。在下一章将要讲到的日志记录中，也不会记录。

如果我们想显示所有错误可以写上：error_reporting = E_ALL
想要显示所有错误但排除提示，可以将这个参数写为：error_reporting = E_ALL & ~ E_NOTICE
显示所有错误，但排除提示、兼容性和未来兼容性。可写为：error_reporting ＝ E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED



二、在有些情况下我们无权限操作php.ini文件，又想要控制error_reporting怎么办呢？
在运行的xxxx.php文件中开始处，我们可以使用error_reporting()函数灰达到目标。演示代码如下：
```php
<?php

//关闭了所有的错误显示
error_reporting(0);


//显示所有错误
//error_reporting(E_ALL);

//显示所有错误，但不显示提示
//error_reporting(E_ALL & ~ E_NOTICE);
?>
```

**扩展**
@ 符是我们之前学习过的单行不显示错误，请不用或者少用@符。
我们拿读取一个不存在的文件，这样的php代码来演示实现过程：
```php
<?php
//读取一个不存在的adsaf.txt文件，用@符抑制错误
@$fp = fopen('adsaf.txt','r');
?>
```


@符效率较低，它在php内核中的实现过程是：
```php
<?php
//关闭错误
error_reporting(0);

//读取一个不存在的文件，显示错误

//显示错误
error_reporting(E_ALL & ~ E_NOTICE);
?>
```


#### 错误记录日志
在一些公司里面，有专门的日志收集系统。日志收集系统会在背后默默的帮你收集错误、警告、提示。不让用户看到，设置好错误报告级别好，如何将错误收集到日志系统中呢？
php.ini里面的相关配置

- log_errors:on/off,是否开启日志记录
- log_errors_maxlen:整型，默认1024，单行错误最大记录长度
- error_log:syslog或者指定路径，错误日志记录在什么地方


说明：
- 1.在表格中的log_errors和log_errors_max_len非常好理解。
- 2.而error_log 指定将错误存在什么路径上。配置项中的syslog可能有点不太好理解。syslog是指系统来记录。windows系统在电脑的日志收集器里面。linux默认在：/etc/syslog.conf


[扩展]了解知识点。若Linux系统启动或修改了日志收集。可能存储在第三方专用的日志收集服务器中。


此外，PHP还为我们专门准备了一个自定义的错误日志函数：bool error_log ( string $错误消息 [, int $错误消息类型 = 0 [, string $存储目标]] )这个函数可以把错误信息发送到web服务器的错误日志，或者到一个文件里。



常用的错误消息类型：

- 0：发送至默认的error_log指定位置
- 1：发送到指定的邮件位置
- 3：发送至指定的文件位置

实例
```php
<?php

//无法连接到数据库服务器，直接记录到php.ini 中的error_log指定位置
error_log("无法连接到数据库服务器服务器");

//可以发送邮件，但是php.ini必须配置过邮件系统
error_log('可以用邮件报告错误，让运维人员半夜起床干活',1 ,'pig@php.cn');

//记录在指定的位置
error_log("我是一个错误哟", 3, "d:/test/my-errors.log");

?>
```


#### 自定义错误处理函数

经常用到的两个函数
set_error_handler ( callable $回调的错误处理函数)：设置一个用户定义的错误处理函数
trigger_error ( string $error_msg):产生一个用户级别的 error/warning/notice 信息