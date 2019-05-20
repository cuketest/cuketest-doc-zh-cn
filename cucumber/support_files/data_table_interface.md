# 数据表

当步骤有一个数据表时，它们会传递一个对象，其中有可用于访问数据的方法。

- 有列的标题
  - `hashes`: 返回一个对象数组，其中每一行都被转换为一个对象（列标题是键值）
  - `rows`: 以二维数组的形式返回表，不包含第一行
- 没有列标题
  - `raw`: 以二维数组形式返回表
  - `rowsHash`: 返回一个对象，其中每一行对应一个条目（第一列是键，第二列是值）

有关示例，请参阅下面的[剧本](https://github.com/cucumber/cucumber-js/blob/master/features/data_tables.feature)
