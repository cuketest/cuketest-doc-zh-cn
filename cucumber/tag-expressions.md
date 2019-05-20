# 标签表达式


标签表达式允许您根据标签选择场景的子集。 它可以用于两个目的：

* [运行一组场景](https://docs.cucumber.io/cucumber/api#running-a-subset-of-scenarios)
* [将某个hook应用于一组场景](https://docs.cucumber.io/cucumber/api#tagged-hooks)

标签表达式是一个*内嵌的布尔表达式*。 下面是一些例子:

表达式                | 描述
---------------------|---------------------------------------------------------:
`@fast`              | 标记`@fast`的场景
`@wip and not @slow` | 标记 `@wip` 但没有标记`@slow`的场景
`@smoke and @fast`   | 同时标记`@smoke`和`@fast`的场景
`@gui or @database`  | 标记`@gui`或`@database`的场景

对于更高级的标记表达式，您可以使用括号，它可以更清晰的表示，或者更改运算符优先级：

```
(@smoke or @ui) and (not @slow)
```

