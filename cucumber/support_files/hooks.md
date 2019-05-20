# Hooks

Hooks(钩子) 用于在每个场景之前和之后设置和清理环境。有关传递给Hooks的第一个参数的规范，请参阅 [API参考](./api_reference.md). 如果定义了多个*Before* hooks，会按它们被定义的顺序执行。多个 *After* hooks 按照它们被定义的**相反**顺序执行.

```javascript
var {After, Before} = require('cucumber');

// 同步
Before(function () {
  this.count = 0;
});

// 异步回调
Before(function (testCase, callback) {
  var world = this;
  tmp.dir({unsafeCleanup: true}, function(error, dir) {
    if (error) {
      callback(error);
    } else {
      world.tmpDir = dir;
      callback();
    }
  });
});

//异步Promise
After(function () {
  // 假设 this.driver 是 selenium webdriver 实例
  return this.driver.quit();
});
```

## 标记的 hooks

Hooks 可以根据场景的标签有条件地选择执行。

```javascript
var {After, Before} = require('cucumber');

Before(function () {
  //该hook会在所有场景之前执行
});

Before({tags: "@foo"}, function () {
  //该hook在使用@foo标记的场景之前执行
});

Before({tags: "@foo and @bar"}, function () {
  //这个hook将在使用@foo和@bar标记的场景之前执行
});

Before({tags: "@foo or @bar"}, function () {
  //这个钩子将在使用@foo或@bar标记的场景之前执行
});

//只有在指定标签时才可以使用下面的简写形式
Before("@foo", function () {
  //这个钩子将在使用@foo标记的场景之前执行
});
```

查看更多关于 [标签表达式](https://docs.cucumber.io/tag-expressions/)的文档

## 使用Before Hook跳过场景

如果你需要使用`Before` hook强制性地跳过测试，可以使用 [跳过步骤](./step_definitions.md)定义的任何构造来完成此操作

这包括使用：同步返回，异步回调或异步Promise

```javascript
// 同步
Before(function() {
  // 执行某些运行时检查，以决定是否跳过当前的场景
  return 'skipped'
});
```

<a id="beforeall_afterall" />
## BeforeAll / AfterAll

如果您需要在所有场景之前或之后完成一些设置/清除工作，请使用`BeforeAll` / `AfterAll`。像hooks和步骤一样，这些可以是同步的、接受回调函数或返回一个Promise。

不同于`Before` / `After`，这些方法不会有world实例，即`this`指针指向的对象。虽然每个场景都有自己的world实例，`BeforeAll` / `AfterAll` hooks在**所有**场景之前/之后运行，因此没有world实例。

```javascript
var {AfterAll, BeforeAll} = require('cucumber');

//同步
BeforeAll(function () {
  //执行一些共享设置
});

//异步回调
BeforeAll(function (callback) {
  //执行一些共享设置

  //执行回调（可选地在完成时传递出错信息）
});

//通过Promise异步
AfterAll(function () {
  //执行一些共享清理
  return Promise.resolve()
});
```
