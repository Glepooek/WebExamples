css grid布局系统引入了二维grid布局，可用于布局页面主要的区域或小型用户界面元素。

## 什么是css grid？
grid是一组相交的水平线和垂直线，定义了grid的行和列。可以将grid元素放置在与这些列和行相关的位置上。CSS grid布局具有以下特点：

### 固定的（fixed）和弹性的（flexible）轨道大小。
可以使用固定的尺寸创建grid，如使用像素单位，也可以使用弹性尺寸，如使用百分比单位或`fr`来创建有弹性尺寸的grid。

### grid item放置。
可以使用行号、行名或者标定一个grid区域来精确定位元素。grid同时还使用一种算法来控制未给出明确grid位置的元素。

### 创建额外的轨道来包含内容
可以通过grid布局定义显式grid。grid布局规范非常灵活，可以在需要时添加额外的行和列。包括添加“一个容器能容纳的尽可能多的列”等特性。

### 对齐控制
grid包含对齐特性，因此我们可以控制item放入grid区域后的对齐方式，以及整个grid的对齐方式。

### 控制重叠内容
多个item可以放置在grid单元格中，或者区域可以部分地彼此重叠。然后可以使用`z-index`属性来控制重叠区域显示的优先级。

## grid容器
通过在元素上声明`display：grid`或`display：inline-grid`来创建一个grid容器。一旦这样做，这个元素的所有直系子元素将成为grid项目。

## gird轨道
使用`grid-template-columns`属性来定义列，使用`grid-template-rows`属性来定义行。这些属性定义了grid轨道。网格轨道（grid track）是grid`上任意两条相邻线之间的空间。

### fr单位
轨道可以使用任何长度单位进行定义。grid还引入了一个新的`fr`单位，代表grid容器中可用空间的一部分。下一个网格定义将创建三个等宽的轨道，并根据可用空间的大小进行增减。

```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-color: orange;
}
```

还可以定义不同尺寸比例：
```css
    .container {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
    }
```

### 混合弹性尺寸和固定尺寸
```css
    .container {
        display: grid;
        grid-template-columns: 100px 2fr 1fr;
    }
```

### 在轨道列表中使用repeat()函数
包含多个轨道的大型grid可使用`repeat()`函数来重复部分或整个轨道列表。如下方的网格定义：

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
    /* grid-template-columns: 20px repeat(3, 1fr) 20px; */
    /* grid-template-columns: repeat(3, 1fr 2fr); */
    /* grid-template-columns: repeat(3, 1fr 20px); */
}
```

### 隐式和显式grid
显式grid由使用`grid-template-columns`或`grid-template-rows`定义的任何行和列组成。示例中，在创建grid时，使用`grid-template-columns`属性专门定义了列轨道，但grid也会自行创建行。这些行是隐式grid的一部分。

如果你在定义的grid外放置内容，或者由于内容太多，需要更多的grid轨道，那么grid就会在隐式grid中创建行和列。`默认情况下，这些轨道会自动调整大小，因此它们的大小取决于轨道内的内容。`还可以使用 `grid-auto-rows`和`grid-auto-columns`属性为在隐式grid中创建的轨道定义设定大小。

### 轨道大小和minmax()函数
在设置显式或隐式grid创建的行或列的大小时，希望给轨迹一个最小尺寸，但也要确保它们能扩展以适应添加的任何内容。grid布局提供了`minmax()`函数来解决这个问题。

```css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

## grid line
应该注意的是，当定义grid时，我们定义的是网格轨道，而不是网格线。网格布局会为我们创建编号的网格线来让我们来定位每一个网格元素。

### 跨轨道放置grid item
放置项目时，目标是网格线而不是网格轨道。使用`grid-column-start`、`grid-column-end`、`grid-row-start`和`grid-row-end`属性。

```css
.item1 {
    grid-column-start: 1;
    grid-column-end: 4;
}

.item2 {
    grid-row-start: 2;
    grid-row-end: 4;
}
```

### 网格线定位简写
可以使用`grid-column`和`grid-row`属性简写网格定位。斜线字符（/）前面的值为起始网格线，斜线字符（/）后面的值为终止网格线。

```css
.item1 {
    grid-column: 1 / 4; 
}

.item2 {
    grid-row: 2 / 4;
}
```

## 网格单元格（grid cell）

## 网格区域（grid area）
item可以按行或列跨越一个或多个单元格，这样就形成了一个网格区域（grid area）。网格区域必须是矩形的（例如不能创建L形区域）。

## 网格间距
网格单元格之间的横向间距（gutter）或纵向间距（alley）可以使用`column-gap`和`row-gap`属性或简写`gap`来创建。

```css
/* column-gap: 10px;
row-gap: 10px; */
gap: 10px;
```

## 嵌套grid
### 不使用子网格的嵌套
在这种情况下，嵌套网格与父网格没有任何关系。正如在示例中看到的，它没有继承父网格的`gap`，嵌套网格中的行也没有与父网格中的行对齐。

### 使用子网格的嵌套
除了常规网格外，子网格（subgrid）还能让我们创建嵌套网格，使用父网格的轨道定义。

```css
.item1 {
    grid-column: 1 / 4;
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    grid-template-columns: subgrid;
}
```

## 使用z-index控制元素堆叠
grid item可以占据同一单元格，在这种情况下，可以使用`z-index`属性来控制重叠项的堆叠顺序。