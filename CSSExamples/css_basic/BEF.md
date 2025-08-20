BEM（Block Element Modifier）是一种流行的CSS命名约定和方法论，旨在帮助开发者创建可重用的组件和CSS代码。

## BEM的三个核心概念：

### 1. Block（块）
- 独立的、有意义的实体，可以被重复使用
- 例如：按钮、菜单、表单、导航等

### 2. Element（元素）
- 块的一部分，不能独立存在，必须属于某个块
- 例如：按钮中的图标、菜单中的项目、表单中的输入框等

### 3. Modifier（修饰符）
- 表示块或元素的不同状态或版本
- 例如：按钮的大小（大、小）、菜单的状态（激活、禁用）等

## BEM命名规则：

```
block__element--modifier
```

### 具体格式：
- **Block**: `block-name`
- **Element**: `block-name__element-name`
- **Modifier**: `block-name--modifier-name` 或 `block-name__element-name--modifier-name`

## 实际示例：

```html
<!-- 按钮块 -->
<button class="btn btn--primary btn--large">
  <span class="btn__text">点击我</span>
  <span class="btn__icon btn__icon--arrow"></span>
</button>

<!-- 卡片块 -->
<div class="card card--featured">
  <div class="card__header">
    <h3 class="card__title">标题</h3>
  </div>
  <div class="card__body">
    <p class="card__text card__text--highlight">内容文本</p>
  </div>
  <div class="card__footer">
    <button class="card__button card__button--disabled">操作</button>
  </div>
</div>
```

对应的CSS：

```css
/* 块 */
.btn {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

/* 修饰符 */
.btn--primary {
  background-color: blue;
  color: white;
}

.btn--large {
  padding: 15px 30px;
  font-size: 18px;
}

/* 元素 */
.btn__text {
  font-weight: bold;
}

.btn__icon {
  margin-left: 5px;
}

/* 元素的修饰符 */
.btn__icon--arrow::after {
  content: "→";
}

/* 卡片相关样式 */
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.card--featured {
  border-color: gold;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.card__title {
  margin: 0;
  font-size: 20px;
}

.card__text--highlight {
  background-color: yellow;
}
```

## BEM的优势：

1. **清晰的结构**：通过命名就能知道元素之间的关系
2. **避免样式冲突**：独特的命名方式减少了样式冲突的可能性
3. **易于维护**：结构清晰，便于团队协作和代码维护
4. **可重用性**：组件化思维提高了代码的可重用性
5. **语义化**：命名具有语义，易于理解和记忆

## 注意事项：

1. BEM不意味着类名要非常长，而是要有清晰的结构
2. 不是所有CSS类都需要遵循BEM，只对组件相关的样式使用
3. 可以根据团队习惯调整命名分隔符（如使用`-`代替`__`或`--`）

BEM命名约定特别适用于大型项目和团队协作，能够有效管理复杂的CSS样式结构。