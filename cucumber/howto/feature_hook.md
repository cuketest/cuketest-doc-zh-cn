# HOWTO: 用于剧本(Feature)的生命周期(Hook)


## 适度使用Hook
事实上现在的Cucumber不再支持剧本(feature)级别的生命周期了，而在Cucumber曾经存在过BeforeFeature的Hook，但是在2.0版本以“会与`Before`Hook混淆”为由移除了。

并且其作为一种依赖`registerHandler`的语法糖，并不是作为Cucumber的一种功能特性存在，因此也可以认为CucumberJs一直不支持Feature层级的Hook。

> `this.BeforeFeature(fn)` is syntactic sugar for `this.registerHandler('BeforeFeature', fn)`. I am planning on removing `this.BeforeFeature(fn)` in 2.0 as its too easy to confuse with `this.Before`.  
> `this.BeforeFeature(fn)`作为`this.registerHandler('BeforeFeature', fn)`的一种语法糖. 我计划于2.0版本将`this.BeforeFeature(fn)`移除，因为它太容易和`this.Before`混淆了。

Hook作为一种开发常用的手段，通常会将其写在`support/hooks.js`文件中，这会导致习惯阅读剧本文件和步骤定义的人员无法理解发生了什么而导致沟通成本的提升，因此在Hook中更适合放一些与业务无关、不需要测试人员明白的底层逻辑代码。官网中是这样警告Hook使用的：  

> Think twice before you use `Before`:  
> Whatever happens in a `Before` hook is invisible to people who only read the `features`.   
> 1. You should consider using a `background` as a more explicit alternative, especially if the setup should be readable by non-technical people.   
> 2. Only use a Before hook for low-level logic such as starting a browser or deleting data from a database.  

以上的描述可以概括为，在使用Hook前需要审慎的考虑以下两点，以避免对普通的阅读人员带来困扰：
1. Before Hook是否可以使用`背景(background)`功能来代替，因为`背景`功能在`剧本`中可见，[点击](http://www.cuketest.com/zh-cn/cucumber/concepts.html#background%E8%83%8C%E6%99%AF)查看背景的定义；
2. Hook中的代码是否是与底层逻辑相关、与业务逻辑无关的，比如启动浏览器、清除原有的测试数据等等。

> 有些时候会希望Hook能够根据指定的场景来执行，这可以使用[条件Hook](https://cucumber.io/docs/cucumber/api/#afterstep)配合标签来实现，但是如果滥用的话会导致Hook中的功能变的冗杂并且难以维护。

## Feature Hook不存在，也没有使用的必要
以上的警告是针对Before Hook也就是步骤(Step)级别的Hook使用，而使用剧本级别的Hook时其实也需要考虑类似的问题。  

1. 首先考虑是否有必要使用Before/AfterFeature，能否使用[BeforeAll/AfterAll Hook](http://www.cuketest.com/zh-cn/cucumber/support_files/hooks.html#beforeall--afterall)来代替；  
2. 其次考虑是否有必要在一个项目中使用不同的`feature`文件来定义针对不同应用的测试，能否分为多个项目来写。

如果一个项目使用`BeforeAll/AfterAll Hook`无法满足需求，那就需要好好考虑一下项目里的各个剧本到底适不适合放在一起了。

## 如果一定要使用Feature Hook的话...
如果以上的文字你都阅读过了，并且思考过了，仍然觉得有使用Feature Hook的必要，那么这里也提供了实现的方法。

### 实现方案
阐述实现方案前，我们需要对两个概念达成共识：  
1. 标签(Tags)是继承的。也就是说，如果给一个剧本设置了一个标签，那么该剧本中的所有场景和步骤都会继承这个标签。  
2. 可以存在同名Hook（比如多个Before），它们会按顺序执行。  

实现的方法需要用到[world对象](http://www.cuketest.com/zh-cn/cucumber/support_files/world.html)保存上一场景的剧本名称，并与当前剧本名称比较，如果检测到切换就可以执行Hook。当然这种实现只能执行Before时间点的Hook，After是无法实现的。

### 实现代码
在`support/hooks.js`文件中（如果不存在可以新建一个）添加如下代码：

```js
BeforeAll(async function () {
    this.previousSenario = ''; // 在World中注册一个变量保存上一个场景所在的剧本，初始为空
})

Before(async function (testCase) {
    let currentSenario = testCase.sourceLocation.uri; // 获得当前剧本文件的名称
    if (currentSenario !== this.previousSenario){
        this.previousSenario = currentSenario; 
        // 在这里定义你在切换剧本时的行为
    }
})
```

由于同名Hook不会冲突的原因，你可以安全的使用以上代码。