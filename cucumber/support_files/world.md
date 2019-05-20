# World对象

对于每个场景，都有一个独立的上下文叫*World*, 在hooks和步骤的运行函数中用`this`来访问.
默认的 world 构造函数是:

```javascript
function World({attach, parameters}) {
  this.attach = attach
  this.parameters = parameters
}
```

* `attach`: 用于将[附件](./attachments.md)添加到hooks/步骤的函数
* `parameters`: 通过[命令行](/execution/cli.md#world-parameters)传入的参数对象

默认的对象可以被`setWorldConstructor`覆盖.

```javascript
var {setWorldConstructor} = require('cucumber');
var seleniumWebdriver = require('selenium-webdriver');

function CustomWorld() {
  this.driver = new seleniumWebdriver.Builder()
    .forBrowser('firefox')
    .build();

  // Returns a promise that resolves to the element
  this.waitForElement = function(locator) {
    var condition = seleniumWebdriver.until.elementLocated(locator);
    return this.driver.wait(condition)
  }
}

setWorldConstructor(CustomWorld)
```

**注意:** World构造函数在*[v0.8.0](https://github.com/cucumber/cucumber-js/releases/tag/v0.8.0)*后是严格同步的.
