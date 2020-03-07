#CukeTest APIs

CukeTest中提供了多个内置的npm包，其中的各种API实现了自动化的功能。在不同平台上API支持能力不同，下表列出不同平台上提供包的能力：

名称 | 功能 | Windows | Mac | Linux
---|---|---|---|---
cuketest | 操作CukeTest自己| 支持 | 支持 | 支持
leanpro.common | 常用工具函数 | 支持 | 支持 | 支持
leanpro.win | Windows自动化库 | 支持 | 不支持 | 不支持
leanpro.visual | 图像OCR库 | 支持 | 部分支持 | 支持


### "cuketest"包

下面是在测试脚本代码中可以使用的CukeTest API列表。只需要require内置的“`cuketest`”模块，然后就可以使用。你在使用时会获得这些API的智能提示。

例如，下面的代码可以用来在测试运行期间最小化整个CukeTest窗口，然后在测试完成之后恢复CukeTest窗口大小:

```javascript
const CukeTest = require("cuketest");
CukeTest.minimize();

//…执行测试操作…
CukeTest.restore();
```

这里是API的列表:
* **delay(milliseconds: number)**
    
    延迟指定的毫秒数. 它返回Promise\<void>，在异步函数中使用它，你可以使用“await”关键字。例如以下声明将会延迟一秒钟：
   ```javascript
   await CukeTest.delay(1000);
   ```

* **minimize()**
    最小化CukeTest窗口

* **maximize()**
    最大化CukeTest窗口

* **restore()**
    将CukeTest窗口恢复到正常大小
    
* **launchProcess(exePath: string, ...args: string[]): child_process.ChildProcess**
    启动另一个进程，返回node.js的ChildProcess进程对象
    
* **stopProcess(proc)**
    停止这个进程

### “leanpro.*"包

以"leanpro."为前缀的是自动化API包，详情可参见[Node.js自动化API](/node_api)。