# 超时

默认情况下，异步hook和步骤在5000毫秒后超时。这个可以全局修改：

```javascript
var {setDefaultTimeout} = require('cucumber');

setDefaultTimeout(60 * 1000);
```

特定的hook或步骤超时可以通过以下方式设置：

```javascript
var {Before, Given} = require('cucumber');

Before({timeout: 60 * 1000}, function() {
  //执行一些较慢的浏览器/文件系统/网络操作
});

Given(/^a slow step$/, {timeout: 60 * 1000}, function() {
  //执行一些较慢的浏览器/文件系统/网络操作 
});
```

## 禁用超时

**除非绝对必要，否则请勿使用此功能**

通过将其设置为-1来禁用超时。如果你使用这个，你需要实现你自己的超时保护。否则测试套件可能会提前结束或无限期挂起。

```javascript
var {Before, Given} = require('cucumber');
var Promise = require('bluebird');

Given('the operation completes within {n} minutes', {timeout: -1}, function(minutes) {
  const milliseconds = (minutes + 1) * 60 * 1000
  const message = `operation did not complete within ${minutes} minutes`
  return Promise(this.verifyOperationComplete()).timeout(milliseconds, message);
});
```
