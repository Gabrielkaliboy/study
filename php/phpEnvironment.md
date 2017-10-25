# 1. xampp

## 1.1php文件存放位置
默认PHP文件放在xampp\htdocs文件夹下才能运行

## 1.2修改默认PHP存放位置
- 打开文xampp\apache\conf\httpd.conf
- 查找DocumentRoot，会搜到如下的内容，将目录更改一下就行
	- DocumentRoot "D:/xampp/htdocs"

# 2.H-builder搭建开发环境

如果如图一样的写法，最后的路径是这样的：

`D:\xampp\htdocs\phpStudy\phpStudy`

![](phpEnvironment/1.png)

设置外置web服务器
![](phpEnvironment/2.png)

最后测试一下是否搭建好了
```php
<?php
phpInfo();
?>
```

## 2.1 H-builder调试PHP
在工具里面选择安装插件，Aptana php插件。

打开已经搭建好开发环境的PHP文件（文件置于xampp目录下，搭建好localhost等）

右击空白处---》运行方式---》PHP server

或者直接用上部分的浏览器图标就成。

# 3.HeidiSQL
- 选择：在根分类创建会话

- 如果连接上面的的mysql的话，配置如图，密码为空
![](phpEnvironment/3.png)


# 4.vs code
详情查看markdown下面的vs code文件说明。