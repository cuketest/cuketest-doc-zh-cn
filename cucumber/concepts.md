# Cucumber的概念定义 

<a id="bdd"></a>
## BDD（Behavior Driven Development，行为驱动开发）
BDD出现并扩展了TDD。主要思想是：既然可以根据文档编写单元测试，为什么不把文档本身作为一个测试？是让那些具有足够的业务知识但非专业测试人员如业务分析师、项目经理、用户等也可以定义测试。

<a id="cucumber"></a>
## Cucumber
Cucumber是一个测试框架，可以用来建立软件开发人员和业务经理之间沟通的渠道。测试脚本基于行为驱动开发（BDD）风格词语编写，如“假如”，“当”、“那么”，或在英文中的**Given**, **When**, **Then**，这样任何非专业人员都能理解。然后将测试用例放入覆盖一个或多个测试场景的剧本(gherkin)文件中。 Cucumber将测试解释成指定的编程语言，然后执行。典型的用法是使用Selenium驱动浏览器中进行测试。这里有[更多的解释](https://en.wikipedia.org/wiki/Cucumber_(software))

<a id="gherkin"></a>
## Gherkin语法
Gherkin(剧本语法)是用于编写Cucumber、Specflow或类似的BDD框架规范的语言。这是一种业务人员可读懂的，特定领域的语言，它可以让你描述软件的行为，而不用详细说明如何实现这个行为。有几个约定：
- 一个gherkin源文件包含单个功能的说明。
- 源文件具有扩展名* .feature。
- 每个gherkin场景都有一个基本的模式，其中包括：（假如），事件（当）和结果（那么）

你可以在这里阅读更多有关gherkin的信息: <a href="https://github.com/cucumber/cucumber/tree/master/gherkin" target="_blank">https://github.com/cucumber/cucumber/tree/master/gherkin</a>

<a id="world"></a>
## Cucumber World
请在下面的文章中找到更多的解释：
<a href="http://drnicwilliams.com/2009/04/15/cucumber-building-a-better-world-object/" target="_blank">http://drnicwilliams.com/2009/04/15/cucumber-building-a-better-world-object/</a>

<a id="feature"></a>
## Feature(剧本)
每个`*.feature`文件通常由一个Feature(剧本)组成。Cucumber中的Feature在有些文章中翻译成“特性”，在本书中始终使用“剧本”，因为“特性”的多义性，在阅读中可能造成困扰。在阅读相关文章时，你只要知道这两者是等价的就可以了。

一个剧本以关键字“`Feature:`”开头，或其等价的本地化的关键字开头(中文是“功能”)。后跟缩进三格的行可以写任何你想要的内容，表示这个剧本的描述。一个Feature通常包含一个场景列表。剧本描述之后是第一个场景，以“`Scenario:`”（中文对应的是“场景”）开始。

当然根据需要"Feature:"关键字前面可能还有语言标识，或者标签，如下面例子：

```gherkin
# language: zh-CN
@math
功能: 加法
  加法计算器的验证用例

  @sanity
  场景: 两个数相加
    假如我已经在计算器里输入6
    而且我已经在计算器里输入7
    当我按"相加"按钮
    那么我应该在屏幕上看到的结果是13

```

<a id="scenario"></a>
## Scenario(场景)
场景是gherkin核心结构之一。每个场景都以“Scenario:”关键字（中文格式中“场景”）开头，后面跟着一个可选的场景标题。每个剧本可以有一个或多个场景，每个场景由一个或多个步骤组成。

<a id="outline"></a>
## Scenario Outline(场景大纲)
有时开发者会将一个场景复制和粘贴成多份，仅仅为了以使用不同的参数值。但这种重复是令人乏味的。场景大纲允许我们通过使用带占位符的模板来更加简洁地表达这些示例。场景大纲的步骤提供了一个不会直接运行的模板。每个场景大纲包含一个或多个[示例表](/cucumber/concepts.md#example)，示例表中的每行都运行一次这个场景大纲的步骤（不包括标题行）。场景大纲使用占位符来标识参数，在场景大纲步骤中用`“< >”`括起来的就是占位符。

<a id="backgrounds"></a>
## Background(背景)
背景允许你在单个剧本中的所有场景中添加“背景”。背景就是一个无标题的场景，包含许多步骤。不同之处在于它们运行的时机：背景在每个场景之前运行，但是在场景的“Before” hook(钩子函数)之后运行。

<a id="steps"></a>
## Steps(步骤)
一个场景包含多个步骤，也就是以“Given”、“When”或“Then” （中文是“假如”，“当”、“那么”）开始的描述语句。Cucumber在技术上并没有区分这三种步骤。不过，我们强烈建议你这样做。这些词语是为了它们的目的而精心挑选的，为了深得BDD的精髓，您应该将这些关键字用得恰到好处。

<a id="stepArg"></a>
## Step参数
有时您想要将更复杂的数据结构从步骤传递到【步骤定义】。这是多行步骤参数。它们紧跟在一个步骤之后，并作为最后一个参数传递给步骤定义方法。
多行步骤参数有两种类型：**表格**或**文档字符串**。

<a id="docstring"></a>
## Doc String(文档字符串)
  如果需要指定的信息无法放在一行内，你可以使用Doc String，也称为多行字符串。Doc String用于指定较大的文本。文本应由放在一行的三个并列的双引号“"""”开始(注意是英文的双引号，不是中文的全角双引号)：
```gherkin

Scenario:
Given a blog post named "Random" with:
"""
Some Title, Eh?
===============
Here is the first paragraph of my blog post.
Lorem ipsum dolor sit amet, consectetur adipiscing
elit.
"""
```

<a id="table"></a>
## Table(表格)
表格作为步骤的参数对指定更大的数据集很方便——通常作为“Given”步骤的输入或者“Then”步骤的输出。这是例子：
```gherkin
Scenario:
  Given the following people exist:
    | name  | email           | phone |
    | Jason | jason@email.com | 123   |
    | Joe   | joe@email.com   | 234   |
    | Zark  | zark@email.org  | 456   |
```

<a id="example"></a>
## Example(示例表)
示例表是放置在“场景大纲”下的数据表，用于向“场景大纲”中的参数提供数据，对于示例表中的每行数据，“场景大纲”将被执行一次。

一个场景大纲可以有多个示例表，每个示例表可以有自己的标签，这样在执行过程中，可以使用标签过滤器来运行部分数据。

下面是一个示例，位于场景大纲内：

```gherkin
Scenario Outline: eating
  Given there are <start> cucumbers
  When I eat <eat> cucumbers
  Then I should have <left> cucumbers

  Examples:
    | start | eat | left |
    |  12   |  5  |  7   |
    |  20   |  5  |  15  |
```

<a id="tag"></a>
## Tags(标签)
标签是组织剧本和场景的好方法。考虑这个例子：
```gherkin
@billing
Feature: Verify billing

  @important
  Scenario: Missing product description

  Scenario: Several products
```
场景或剧本可以有任意数量的标签，只需要用空格分隔即可:
```gherkin
@billing @bicker @annoy
Feature: Verify billing
```

<a id="stepdef"></a>
## Step Definition(步骤定义)
步骤定义类似于任何种类的面向对象/面向过程编程语言中的方法或函数定义。 步骤定义可以使用0到多个参数，由**正则表达式**或**Cucumber表达式**中的组标识（和函数参数的数量相同。正则表达式中的组匹配结果作为参数传递给步骤定义。

<a id="cucumber_expression"></a>
## Cucumber Expressions(Cucumber表达式)
Cucumber Expression是用于将步骤定义与gherkin中的Step(步骤)匹配的简单模式。 Cucumber表达式提供与正则表达式类似的功能，具有以下改进：
* 提高可读性
* 自定义参数类型
* 表达式生成

请参阅[更多的解释](https://docs.cucumber.io/cucumber/cucumber-expressions)。

<a id="regex"></a>
## Cucumber Regular Expression(Cucumber正则表达式)
步骤定义中的正则表达式与步骤文本相匹配。 [这里](http://agileforall.com/wp-content/uploads/2011/08/Cucumber-Regular-Expressions-Cheat-Sheet.pdf)有更详细的描述。

