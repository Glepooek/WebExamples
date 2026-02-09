# 书籍装饰图片使用说明

## 📸 图片放置步骤

1. **保存图片**
   - 将您提供的书籍装饰图片保存为 `books-decoration.png`
   - 放置到 `HtmlExamples/html_examples/assets/` 目录下

2. **图片要求**
   - 格式：PNG（推荐带透明背景）
   - 尺寸：建议 800x800 像素或更高
   - 文件大小：建议小于 500KB

3. **文件路径**
   ```
   HtmlExamples/html_examples/
   ├── assets/
   │   └── books-decoration.png  ← 图片放这里
   ├── login.html
   ├── login.css
   └── login.js
   ```

## 🎨 图片效果

已添加的动画效果：
- **浮动动画**：上下轻微浮动（3秒循环）
- **旋转动画**：轻微旋转和缩放（6秒循环）
- **阴影效果**：drop-shadow 增加立体感

## 🔄 备用方案

如果暂时没有图片，可以使用以下几种方案：

### 方案 1：使用在线图片链接
在 `login.html` 中修改：
```html
<img src="https://your-image-url.com/books.png" alt="书籍装饰" class="books-image">
```

### 方案 2：临时隐藏装饰
在 `login.css` 中添加：
```css
.decoration-books {
    display: none;
}
```

### 方案 3：使用纯CSS版本
如果需要，可以恢复之前的纯CSS实现（虽然不如图片精美）。

## 📝 图片优化建议

为了更好的性能，建议对图片进行优化：

1. **压缩图片**
   - 使用 TinyPNG 或 Squoosh 压缩
   - 保持质量的同时减小文件大小

2. **使用 WebP 格式**（可选）
   ```html
   <picture>
       <source srcset="assets/books-decoration.webp" type="image/webp">
       <img src="assets/books-decoration.png" alt="书籍装饰" class="books-image">
   </picture>
   ```

3. **添加懒加载**（可选）
   ```html
   <img src="assets/books-decoration.png"
        alt="书籍装饰"
        class="books-image"
        loading="lazy">
   ```

## 🎯 图片制作建议

如果需要重新制作或调整图片：

1. **元素组成**
   - 3本堆叠的书籍（橙黄色渐变）
   - 一支黄色铅笔（斜放）
   - 红色标签/贴纸
   - 白色圆形底座

2. **颜色方案**
   - 主色：橙黄色系 (#FF9035, #FFD54B)
   - 辅色：红色 (#FF5353)
   - 阴影：柔和的灰色

3. **风格特点**
   - 3D立体感
   - 柔和的光影
   - 扁平插画风格
   - 温暖的配色

## 🚀 快速测试

图片放置完成后，在浏览器中打开 `login.html`，应该能看到：
- 左侧书籍装饰缓慢浮动
- 轻微的旋转和缩放动画
- 柔和的阴影效果

如果图片没有显示，请检查：
1. 图片路径是否正确
2. 图片文件名是否为 `books-decoration.png`
3. 图片文件是否损坏
4. 浏览器控制台是否有错误信息

---

**提示**：如果您已经保存了图片，刷新浏览器即可看到效果！
