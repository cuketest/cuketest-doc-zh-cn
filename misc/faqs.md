## 常见问题(FAQ)

<a id="version"></a>
#### Q: **CukeTest支持哪个版本的cucumber.js？**

**A**: CukeTest支持Cucumber 5.x。版本号中的“x”代表最近的版本。我们定期将引擎升级到新版本的Cucumber，以便CukeTest用户也可以使用Cucumber的新功能。

<a id="chromedriver"></a>
#### Q: 如何下载chromedriver？

**A**: chromedriver官方存储在google服务器上，国内网络问题不能下载。下面介绍几种通过配置NPM的方式来进行下载安装。

1. 使用cnpm进行安装

    参考 cnpm 文档说明 [https://npm.taobao.org/](https://npm.taobao.org/)，命令行执行：
    
    ```bash
    $ npm install -g cnpm --registry=https://registry.npm.taobao.org
    ```
    
    然后直接使用cnpm 安装chromedriver：
    ```bash
    $ cnpm install chromedriver --save
    ```
    
2. npm 安装时直接指定淘宝cdn路径

    ```bash
    $ npm install chromedriver --chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver
    ```
    或者 在.npmrc文件中添加chromedriver 的cdn路径。
    ```bash
    chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver
    ```
    
3. 从[https://npm.taobao.org/mirrors/chromedriver](https://npm.taobao.org/mirrors/chromedriver) 下载对应的版本安装指定压缩包的文件路径：

    ```bash
    npm install chromedriver --chromedriver_filepath=/path/to/chromedriver_mac64.zip
    ```
    
    或者 .npmrc文件中指定压缩包的文件路径：
    
    ```bash
    chromedriver_filepath=/path/to/chromedriver_mac64.zip
    ```

上面3种方法都可以安装chromedriver。

<a id="testing_tools"></a>
#### Q: 市面上有不少测试工具，如Selenium，Appium，Calabash等等，CukeTest属于哪一类？

**A**: CukeTest是一个测试脚本编辑和调试的平台，可以和多种测试框架集成，只要它们支持JavaScript语言。例如Selenium、Appium，就可以在在CukeTest下开发测试脚本。CukeTest可以开发Web、API、移动端的自动化脚本。

<a id="report_bug"></a>
#### Q: 如何报告错误或向CukeTest提出建议？

**A**: 可以通过以下之一的途径：
* 加入QQ群：707467292，并在QQ群中描述你遇到的问题
* 在[github](https://github.com/cuketest/demos/issues)上报告你的问题。
* 访问[联系我们](http://www.leanpro.cn/contactus)页面，提交您的问题和联系方式

<a id="chromedriver"></a>
#### Q: 下载的ChromeDriver驱动如何保持跟Chrome的版本一致？

**A**: 因为chrome每过一段时间就会更新一次，相应的你也要更新驱动。如果保持一致可以看 http://npm.taobao.org/mirrors/chromedriver  每个版本里面都有一个notes.txt文件，上面有对应的版本信息可以参考。

<a id="sqllite"></a>
#### Q: 在CukeTest中如何使用SQLLite3?

我安装了SQLLite3，在CukeTest中调用时，出现"A dynamic link library (DLL) initialization routine failed. ...  note_sqlite3.node."的错误。

**A**: 这是因为SQLLite3包含有动态链接库，需要在二进制接口级别兼容，缺省用NPM安装的只跟Node兼容，而CukeTest使用的是Electron，二进制级别不兼容，因此需要重新编译。下面的链接介绍了如何编译：

[https://stackoverflow.com/questions/32504307/how-to-use-sqlite3-module-with-electron](https://stackoverflow.com/questions/32504307/how-to-use-sqlite3-module-with-electron)

一个简单的方法是从[https://github.com/zhangxy1035/electron_sqlite3](https://github.com/zhangxy1035/electron_sqlite3)直接下载针对Electron的二进制文件并替换到相应目录里，针对CukeTest是Electron 4.2.10 32位版本。

<a id="fastfail"></a>
#### Q: 我的一个剧本有几十个场景，假如前面几个场景执行失败，能否快速跳过，不用运行这个剧本里之后的场景

**A**: 可以，您可以创建一个运行配置，将其中的快速失败设置成"true"。详见[运行配置](/execution/profiles.md)

<a id="embed_pictures"></a>
#### Q: 我的报告截图比较多，生成报告的时候失败，错误信息"Invalid string length"

**A**: 您可以在“设置”-> “报告”中，将截图保存文件设置成"独立文件"。这样报告文件就不会受截图大小的限制。

<a id="commandline"></a>
#### Q: 能不能多个项目串起来运行？例如是否能够通过bat将每个运行命令串起来？

**A**: 可以，CukeTest支持命令行方式运行，关于具体命令参考[命令行](/execution/cli.md)
