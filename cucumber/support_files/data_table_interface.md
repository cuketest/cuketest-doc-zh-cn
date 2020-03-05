# 数据表

当**步骤**有一个**数据表**时（注意与场景大纲的示例表区别开），数据表会作为一个对象传递，以下将访问该对象的方法按照**输出是否含标题信息**为两类：

- 含每列标题信息
  - `hashes()`: 返回一个对象数组，其中每一行都被转换为一个对象（即列标题是键、内容为值的键值对）。
  - `raw()`: 以二维数组形式返回表。
- 不含列标题信息
  - `rowsHash()`: 返回一个对象，其中每个属性的属性名为表的第一列数据，属性值为第二列数据（或者说第一列是键，第二列是值）。（注意：该方法适用于只有两列的数据表）。
  - `rows()`: 返回一个二维数组，数据表中的每一行组成一个一维数组，并且不返回标题行。

假设步骤中有如下一张数据表：  

|   id   | password |
|:------:|:--------:|
| user01 | 123456   |
| user02 | 123456   |
| user03 | 123456   |

接着将数据传入参数`table`中，输出数据表的四种读取方法的结果：
```js
    let table_hashes = table.hashes();
    console.log("table.hashes():", table_hashes);

    let table_raw = table.raw();
    console.log("table.raw():", table_raw);
    
    let table_rowsHash = table.rowsHash();
    console.log("table.rowsHash():", table_rowsHash);

    let table_rows = table.rows();
    console.log("table.rows():", table_rows);
```

输出如下：  
```js
table.hashes(): [ { id: 'user01', password: '123456' },
    { id: 'user02', password: '123456' },
    { id: 'user03', password: '123456' } ]

table.raw(): [ [ 'id', 'password' ],
  [ 'user01', '123456' ],
  [ 'user02', '123456' ],
  [ 'user03', '123456' ] ]

table.rowsHash(): { id: 'password',
  user01: '123456',
  user02: '123456',
  user03: '123456' }

table.rows(): [ [ 'user01', '123456' ],
  [ 'user02', '123456' ],
  [ 'user03', '123456' ] ]
```  

有关示例，请参阅github上Cucumber.js的[剧本]样例(https://github.com/cucumber/cucumber-js/blob/master/features/data_tables.feature)。