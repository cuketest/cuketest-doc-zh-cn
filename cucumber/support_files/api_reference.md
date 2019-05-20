# 支持文件

## API参考

每个方法都可以从`require('cucumber')`返回的对象中获得。 

---

#### `defineParameterType({name, preferForRegexpMatch, regexp, transformer, useForSnippets})`

定义一个新的参数类型并可选地将输出参数转换为其他的参数。

* `name`: 用于在Cucumber表达式中引用此类型的字符串
* `regexp`: 与参数匹配的正则表达式 (或正则表达式数组)
* `transformer`: 一个可选函数，它将捕获的参数从字符串转换为传递给步骤定义的参数。如果未指定转换函数，则捕获的参数将保留为字符串。该函数可以是同步的，也可以返回转换后的Promise值。 `this`指针指向的值是当前的world对象，因此该函数可以委托给 world对象的函数. World 代理函数不能使用箭头函数。
* `useForSnippets`: 默认为`true`。这意味着此参数类型将用于生成未定义步骤的片段。如果`regexp`频繁匹配您不打算用作参数的文本，请用`false`来禁用其用于生成片段代码。
* `preferForRegexpMatch`: 默认为`false`。如果使用正则表达式，并且希望此参数类型对应的`regexp`在匹配期间优先于其他参数类型，则设置为true。

内置的参数类型是
* `int`
* `float`
* `string`
  * 包含在单引号或双引号中
  * `transformer`会移除引号
* `word`

---

#### `After([options,] fn)`

定义每个场景之后运行的hook。

* `options`: 具有以下键的对象：
  * `tags`: 字符串标签表达式，用于仅将此hook应用于某些场景。 有关更多信息，请参阅[cucumber-tag-expressions](https://docs.cucumber.io/tag-expressions/) 
  * `timeout`: hook特定于的超时，以覆盖默认超时。
* `fn`: 一个函数，定义如下：
  * 第一个参数将是一个对象，有这样的格式：`{sourceLocation: {line, uri}, result: {duration, status}, pickle}`
    * pickle对象来自[gherkin](https://github.com/cucumber/cucumber/tree/gherkin-v4.1.3/gherkin)库。请参阅其结构示例 `testdata/good/*.pickles.ndjson`。
  * 在使用异步回调接口时，可提供一个列在最后的参数为回调函数。

`options` 也可以是一个字符串作为简写指定标签`tags`。

按照它们定义多个`After` hooks的 **相反** 顺序执行它们。

---

#### `AfterAll([options,] fn)`

定义在所有场景完成后运行的hook。

* `options`: 具有以下键的对象:
  * `timeout`: 特定于hook的超时，以覆盖默认超时。
* `fn`: 一个函数，定义如下：
  * 在使用异步回调接口时，有一个回调函数的参数。

按照它们定义多个`AfterAll` hooks的 **相反** 顺序执行它们。

---

#### `Before([options,] fn)`

定义在每个场景之前运行的hook。 与`After` hook相同，除了传给`fn`的第一个不具有`result`属性。

多个`Before`挂钩按照它们定义的顺序执行。

---

#### `BeforeAll([options,] fn)`

定义在所有场景之前运行的挂钩。与`AfterAll`有相同的接口。

多个`BeforeAll`hook按照它们定义的顺序执行。

---

#### `defineStep(pattern[, options], fn)`

定义一个步骤。

别名：`Given`, `When`, `Then`.

* `pattern`: 一个正则表达式或字符串模式，用于与gherkin步骤进行匹配。
* `options`: 具有以下键的对象:
  - `timeout`: 特定于步骤的超时，以覆盖默认超时。
  - `wrapperOptions`: 传递给定义函数包装器的特定于步骤的选项
* `fn`: 一个函数，应该定义如下:
  - 针对正则表达式中的每个捕获应该有一个参数匹配。
  - 如果Cucumber步骤有一个文档字符串或数据表，会有一个额外的参数。
  - 在使用异步回调接口时，最后一个参数是回调函数。

---

#### `Given(pattern[, options], fn)`

别名 `defineStep`.

---

#### `setDefaultTimeout(milliseconds)`

设置异步步骤的默认超时时间。默认为`5000`毫秒。

---

#### `setDefinitionFunctionWrapper(fn, options)`

设置一个用于包装步骤/hook定义的函数。使用时，结果会再次包装以确保它与原始步骤/hook定义的长度相同。`options`是特定于步骤`wrapperOptions`，可以是未定义的。

---

#### `setWorldConstructor(constructor)`

设置一个自定义的world构造函数，以覆盖默认的world构造函数：

```javascript
function World({attach, parameters}) {
  this.attach = attach
  this.parameters = parameters
}
```

* `attach` - 在一个函数hook/步骤定义中可以用来添加 [附件](./attachments.md)
* `parameters` - 通过命令行传入的world参数

**注意:** World构造函数在*[v0.8.0](https://github.com/cucumber/cucumber-js/releases/tag/v0.8.0)*以后被严格同步.

---

#### `Then(pattern[, options], fn)`

`defineStep`的别名。

---

#### `When(pattern[, options], fn)`

`defineStep`的别名。
