# 附件

可以将文本，图像和其他数据添加到事件协议的输出和带有附件的JSON格式器中。
World构造函数接受一个`attach`函数, 在缺省的World构造函数中它被传给`this.attach`. 如果使用自定义的World构造函数,
则还需要执行此操作，以便添加附件。

```javascript
var {After} = require('cucumber');

After(function () {
  this.attach('Some text');
});
```

默认情况下，文本以MIME类型 `text/plain`来保存. 您也可以指定不同的MIME类型：

```javascript
var {After} = require('cucumber');

After(function () {
  this.attach('{"name": "某些 JSON"}', 'application/json');
});
```

图像和其他二进制数据可以使用[stream.Readable](https://nodejs.org/api/stream.html)附加。
数据将被 `base64`编码到输出中。
您应该等待流被读取后再继续写入，等待方式可通过提供回调函数或等到返回的Promise被完成。

```javascript
var {After, Status} = require('cucumber');

// 传递一个回调函数
After(function (testCase, callback) {
  if (testCase.result.status === Status.FAILED) {
    var stream = getScreenshotOfError();
    this.attach(stream, 'image/png', callback);
  }
  else {
    callback();
  }
});

// 返回Promise
After(function (testCase) {
  if (testCase.result.status === Status.FAILED) {
    var stream = getScreenshotOfError();
    return this.attach(stream, 'image/png');
  }
});
```

图像和二进制数据也可以使用[Buffer](https://nodejs.org/api/buffer.html)附加上去.
数据将被 `base64` 编码到输出中.

```javascript
var {After, Status} = require('cucumber');

After(function (testCase) {
  if (testCase.result.status === Status.FAILED) {
    var buffer = getScreenshotOfError();
    this.attach(buffer, 'image/png');
  }
});
```

以下是 在场景失败时使用[Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver)
保存屏幕截图的示例:

```javascript
var {After} = require('cucumber');

After(function (testCase) {
  var world = this;
  if (testCase.result.status === Status.FAILED) {
    return webDriver.takeScreenshot().then(function(screenShot) {
      // 截图是一个base-64编码PNG
      world.attach(screenShot, 'image/png');
    });
  }
});
```

附件也由progress、progress-bar和summary格式化程序打印。它们在步骤之后出现，只有`text/plain`内容可见。它可以用于调试场景，特别是在并行模式下。


```javascript
// 步骤定义
Given(/^a basic step$/, function() {
  this.attach('Some info.')
  this.attach('{"some", "JSON"}}', 'application/json')
})

// 结果格式
// ✔ Given a basic step # path:line
//    Attachment (text/plain): Some info.
//    Attachment (application/json)
```