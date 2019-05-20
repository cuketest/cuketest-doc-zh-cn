# 步骤定义

步骤定义是Gherkin语言写的剧本文件和实际被测试的系统之间的粘合剂. 使用 `Given`, `When`, `Then`.
正则表达式中的匹配组匹配到的结果会作为参数传递给步骤定义。

```javascript
var {Then, When} = require('cucumber');
var assert = require('assert');
var fs = require('fs');
var mzFs = require('mz/fs')
var seleniumWebdriver = require('selenium-webdriver');

//同步
Then(/^the response status is (.*)$/, function (status) {
  assert.equal(this.responseStatus, status)
});

//异步-回调
//
//回调作为额外的参数传入，当步骤的操作执行完后可调用这个回调
Then(/^the file named (.*) is empty$/, function (fileName, callback) {
  fs.readFile(fileName, 'utf8', function(error, contents) {
    if (error) {
      callback(error);
    } else {
      assert.equal(contents, '');
      callback();
    }
  });
});

//异步 - Promise
//
//返回一个Promise. 当这个Promise resolve或者reject时这个步骤完成
When(/^I view my profile$/, function () {
  // Assuming this.driver is a selenium webdriver
  return this.driver.findElement({css: '.profile-link'}).then(function(element) {
    return element.click();
  });
});
```


##定义函数包装器

如果你想用一些额外的逻辑来封装步骤或hook定义，你可以使用`setDefinitionFunctionWrapper(fn)`。定义函数将在全部加载后但在测试开始运行之前进行封装。一个使用例子是封装生成器(generator)函数以返回一个Promise。Cucumber会做一个额外的包装，以确保功能保留其原有的长度。

```javascript
// features/step_definitions/file_steps.js
var {Then} = require('cucumber');
var assert = require('assert');
var mzFs = require('mz/fs');

Then(/^the file named (.*) is empty$/, function *(fileName) {
  contents = yield mzFs.readFile(fileName, 'utf8');
  assert.equal(contents, '');
});

// features/support/setup.js
var {setDefinitionFunctionWrapper} = require('cucumber');
var isGenerator = require('is-generator');
var Promise = require('bluebird');

setDefinitionFunctionWrapper(function (fn) {
  if (isGenerator.fn(fn)) {
    return Promise.coroutine(fn);
  } else {
    return fn;
  }
});
```

## Pending的步骤

Pending即有步骤定义但未实现的步骤，标记这种步骤的方式随着返回方式的不同而不同
* 同步 - 返回 `'pending'`
* 异步回调 - 使用参数`null, 'pending'`执行回调
* 异步Promise - Promise resolve成`'pending'`，例如`return Promise.resolve('pending')`

## 跳过的步骤

标记某个步骤为跳过也将跳过的同一场景中的其余的步骤。

这可用于将场景标记为基于运行时条件跳过。

随着返回方式的不同有不同的标记跳过方式
* 同步 - 返回 `'skipped'`
* 异步回调 - 使用参数 `null, 'skipped'`调用回调函数
* 异步Promise - 返回resolve成`'skipped'`的Promise
