# CukeTest概述

CukeTest是开发测试自动化脚本的一个灵巧方便的工具。用户可以使用此工具快速创建BDD（行为驱动开发, Behavior Driven Development）测试脚本。它集成了[Cucumber](/cucumber/concepts.md#cucumber)框架和JavaScript，可视化编辑，调试功能，并有多个html报告模板可供选择。同时它能够实现了各种类型应用的自动化，包括Web、Windows、移动设备、API等等。

这里是一些主要特点：

1. 提供可视化的方式来编写BDD测试用例和脚本，使用CukeTest用户可以专注于内容创建，而不是BDD文档的格式，用户只需了解BDD的一些基本概念即可使用它。CukeTest工具内置了丰富的可视化操作，可以在整个脚本创建过程中为用户提供贴心的提示和指导。
2. 通过单击步骤(Step)生成步骤定义(Step Definition)代码，从步骤文本轻松跳转到步骤定义代码，反之亦然。
3. 提供多种方式来执行您的测试，并可以配置标签过滤和不同种类的浏览器来自定义执行。另外，场景可以在编辑时进行验证和运行。
4. 帮助你管理代码和BDD测试用例文档，在文档和代码之间进行精准的匹配和跳转。
5. 剧本（gherkin）文件编辑可以在可视模式(Visual Mode)或文本模式(Text Mode)。多种语言支持功能文档。您可以在CukeTest中将文档从一种语言格式转换为另一种语言格式。
6. 可视化模式下轻松编辑测试数据，还可以将数据导入到gherkin文件或从中导出数据。
7. CukeTest可在测试运行之前全面验证您的脚本，将执行过程中可能出现的问题降至最低。
8. 全面的Windows应用自动化功能，可以针对各类Windows应用实现自动化，包括Qt、Windows原生应用、.NET、Delphi、DevExpress等类型的应用都提供支持。提供方便易用的应用对象模型库管理功能、强大的控件识别功能，拖拽生成代码，方法调用测试等功能，能够快速生成Windows自动化脚本。


您使用CukeTest创建的脚本与[Node.js](http://nodejs.org)和[Cucumber.js](https://github.com/cucumber/cucumber-js/)框架完全兼容。在使用CukeTest创建BDD自动化测试脚本之后，可以在另一个没有CukeTest的环境中运行该脚本，只要这个环境中安装了Node.js + Cucumber.js和其他相关的NPM库。在CukeTest中创建自动化脚本要比手动创建自动化脚本要快得多，而且即使在您选择使用CukeTest之后，创建的脚本和文档也仍旧基于流行的规范，不用担心格式上的不兼容。

下面是CukeTest的主界面:
![](/assets/main_ui.png)

你可以从[Windows 应用商店](https://www.microsoft.com/store/apps/9p9lchrp8kb8)上下载它，或者从[官网](http://cuketest.com)下载Windows桌面版或Mac版。

