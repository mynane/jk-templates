# jk-tempates

### 1. 解决什么问题

平时浏览 github 是收集到一些有用的 github 仓库，但是过一段时间想起这个功能，知道有这个库，但是怎么也找不到这个仓库或者花大量时间才能找到这个仓库。

jkt（jike templates）能够帮助我们有效的管理和使用我们收藏的仓库

### 2. 怎么安装

```
npm i -g jk-templates
```

### 3. 怎么使用

- [x] [基础使用](#基础使用)

  - [x] [查看帮助](#查看帮助)

  - [x] [查看版本](#查看版本)

  - [x] [打开官网](#打开官网)

- [x] [账号管理](#账号管理)

  - [x] [查看登录信息](#查看登录信息)

  - [x] [github 登录](#github登录)

  - [x] [退出登录](#退出登录)

- [x] [模块管理](#模块管理)

  - [x] [查看现有模块](#查看现有模块)

  - [x] [新增模块](#新增模块)

  - [x] [删除模块](#删除模块)

  - [x] [编辑模块](#编辑模块)

- [x] [模块使用](#模块使用)

  - [x] [clone 和安装](#clone和安装)

- [x] [jk-tempates 版本管理](#jk-tempates版本管理)

  - [x] [版本检测与更新](#版本检测与更新)

### 详细说明

#### 基础使用

##### 查看帮助

```
  jkt -h
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72a89a8f55ec4907915afe62c1c105e5~tplv-k3u1fbpfcp-watermark.image)

##### 查看版本

```
  jkt -V
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b2c60e29b344bfe821b68cf382136f7~tplv-k3u1fbpfcp-watermark.image)

##### 打开官网

```
  jkt home
```

#### 账号管理

##### 查看登录信息

```
  jkt whoami
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb3a475e9bff4f16b734994bb38c3bfe~tplv-k3u1fbpfcp-watermark.image)

##### github 登录

```
  jkt login
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3d1718c2a9e4232baa6a41be87bb229~tplv-k3u1fbpfcp-watermark.image)

##### 退出登录

```
  jkt logout
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34aeec63b61e4c5588d330d6a14aa590~tplv-k3u1fbpfcp-watermark.image)

##### 模块管理

##### 查看现有模块

```
  jkt lists
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8471428ec08b4c949944788d7a14b629~tplv-k3u1fbpfcp-watermark.image)

##### 新增模块

```
  jkt module
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b3891db5af14f4896aaaa630f723033~tplv-k3u1fbpfcp-watermark.image)

##### 删除模块

```
  jkt module <ModuleID>
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82892bcb82224a718177c7d2b2d780b7~tplv-k3u1fbpfcp-watermark.image)

##### 编辑模块

```
  jkt edit <ModuleID>
```

#### 模块使用

##### clone 和安装

```
  jkt use <ModuleID>
```

下载

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b2d6098e9634cacae62e2361d0a47c4~tplv-k3u1fbpfcp-watermark.image)

安装

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc1dca73f75042be94478f922ea8d1dd~tplv-k3u1fbpfcp-watermark.image)

完成

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb1d3f3106fc479f9f947f322b4d706d~tplv-k3u1fbpfcp-watermark.image)

#### jk-tempates 版本管理

##### 版本检测与更新

```
  jkt check
```

最新版

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ba3b33794ea4e55b4d8c71e42279ee8~tplv-k3u1fbpfcp-watermark.image)

有更新

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cd1ca784e204c10b8fc23488dada563~tplv-k3u1fbpfcp-watermark.image)

完成

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/524fd8b085de4ae2bd11b8ae62cba4c1~tplv-k3u1fbpfcp-watermark.image)
