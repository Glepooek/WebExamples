# WebExamples - Claude Code 项目指南

## 项目概述

这是一个前端 Web 开发学习项目，专注于 HTML、CSS、JavaScript 和 Vue.js 的基础知识和示例代码。项目以单文件 HTML 示例为主，便于学习和快速验证概念。

## 项目结构

```
WebExamples/
├── CSSExamples/          # CSS 示例和教程
│   ├── css_basic/        # CSS 基础
│   ├── css_examples/     # CSS 示例（布局、定位、显示等）
│   └── interesting_examples/  # CSS 有趣案例
├── HtmlExamples/         # HTML 示例和教程
│   ├── html_basic/       # HTML 基础
│   ├── html_examples/    # HTML 示例
│   └── interesting_examples/  # HTML 有趣案例
├── JSExamples/           # JavaScript 示例和教程
│   ├── js_basic/         # JavaScript 基础
│   ├── js_basic_examples/  # JavaScript 基础示例
│   ├── interesting_examples/  # JavaScript 有趣案例
│   └── js_programming_advanced_examples/  # JavaScript 高级编程示例
├── VueExamples/          # Vue.js 示例和教程
│   ├── vuejs_basic/      # Vue.js 基础
│   ├── vuejs_basic_examples/  # Vue.js 基础示例
│   ├── vuejs_components_in-depth_examples/  # Vue.js 组件深入示例
│   ├── vuejs_built-in_components_examples/  # Vue.js 内置组件示例
│   ├── vue_router_*/     # Vue Router 相关示例
│   └── vue_apps/         # Vue 应用项目
├── MCPExamples/          # MCP (Model Context Protocol) 示例
├── tools_manual/         # 工具使用手册
└── .claude/              # Claude Code 配置和文档
```

## 技术栈

### 核心技术
- **HTML5** - 现代 Web 标记语言
- **CSS3** - 样式和布局
- **JavaScript (ES6+)** - 现代 JavaScript
- **Vue.js 3** - 渐进式前端框架

### 常用库（通过 CDN 引入）
- Vue.js 3: `https://unpkg.com/vue@3/dist/vue.esm-browser.js`
- Axios: `https://unpkg.com/axios@1.10.0/dist/axios.min.js`
- Lodash: `https://unpkg.com/lodash-es@4.17.21/lodash.js`
- ES Toolkit: `https://esm.sh/es-toolkit`

## 代码规范

### 文件和命名规范

1. **文件命名**
   - 示例文件使用描述性中英文混合命名
   - 使用小写字母和下划线分隔：`01_create_first_vue_app.html`
   - 主题相关文件使用数字前缀便于排序：`01_`, `02_`, `03_`

2. **目录结构**
   - 基础教程放在 `*_basic/` 目录
   - 示例代码放在 `*_examples/` 目录
   - 有趣案例放在 `interesting_examples/` 目录
   - 资源文件放在 `assets/` 目录

### HTML 代码风格

1. **文档结构**
   - 使用 HTML5 文档类型：`<!DOCTYPE html>`
   - 设置中文语言：`<html lang="zh-CN">`
   - 包含必要的 meta 标签（charset, viewport）

2. **引入外部库**
   - 优先使用 ES 模块方式引入
   - 使用 `<script type="importmap">` 定义导入映射表
   - CDN 使用 unpkg.com 作为首选

3. **注释风格**
   - 使用中文注释说明关键概念
   - 在代码块前添加说明性注释
   - 示例：
   ```html
   <!-- 通过 CDN 引入 Vue -->
   <!-- 引入的是全局构建版本，Vue 会暴露全局变量 Vue -->
   ```

### JavaScript 代码风格

1. **语法**
   - 使用 ES6+ 现代语法
   - 优先使用 `const` 和 `let`，避免使用 `var`
   - 使用箭头函数：`() => {}`
   - 使用模板字符串：`` `${variable}` ``
   - 使用解构赋值

2. **Vue.js 风格**
   - 使用 Composition API（`setup()`）
   - 使用 `ref()` 和 `reactive()` 管理响应式数据
   - 组件名使用 PascalCase
   - 在模板中使用 kebab-case

3. **注释**
   - 使用中文注释
   - 为复杂逻辑添加解释性注释
   - 示例代码应包含学习要点的注释

### CSS 代码风格

1. **选择器**
   - 使用有意义的类名
   - 避免使用 ID 选择器
   - 使用 kebab-case 命名：`.form-input`, `.login-button`

2. **布局**
   - 优先使用 Flexbox 或 Grid 进行布局
   - 使用 CSS 自定义属性（CSS Variables）管理主题色

## 工作流程

### 创建新示例

1. **选择合适的目录**
   - 根据技术类型选择对应的 Examples 目录
   - 基础概念放在 `*_basic_examples/`
   - 复杂案例放在 `interesting_examples/`

2. **文件命名**
   - 使用数字前缀便于排序
   - 使用描述性名称
   - 示例：`05_class.html`, `02_dropdown_button.html`

3. **代码结构**
   - 自包含的单文件 HTML（包含 CSS 和 JS）
   - 或者分离的 HTML/CSS/JS 文件（复杂项目）
   - 必须包含中文注释说明学习要点

4. **引用外部资源**
   - 静态资源使用相对路径：`./assets/`
   - 第三方库使用 CDN（unpkg.com）
   - 记录库的版本号

### Git 提交规范

1. **提交信息格式**
   - 使用 Conventional Commits 规范
   - 格式：`<type>: <description>`
   - 示例：
     - `feat: 添加 Vue.js 计算属性示例`
     - `docs: 更新 CSS 布局教程`
     - `fix: 修复事件处理示例中的错误`
     - `chore: 更新依赖版本`

2. **提交类型**
   - `feat`: 新增功能或示例
   - `fix`: 修复错误
   - `docs`: 文档更新
   - `style`: 代码格式调整（不影响功能）
   - `refactor`: 代码重构
   - `chore`: 构建/工具/配置更新
   - `perf`: 性能优化

3. **提交时机**
   - **不要自动提交代码**
   - 完成一个完整的示例后再提交
   - 每次提交应该是一个独立、可运行的单元

### MCP Server 集成

项目已配置以下 MCP servers：

1. **GitHub MCP**
   - 用于访问 GitHub 仓库信息
   - 查看提交历史、文件内容等

2. **MasterGo MCP**
   - 用于从设计稿生成代码
   - 获取设计资源和 DSL

## Claude Code 使用偏好

### 代码生成

1. **示例代码要求**
   - 必须包含详细的中文注释
   - 代码应该可以直接运行
   - 使用最新的 Web 标准和最佳实践
   - 避免过度工程化，保持简单易懂

2. **文件操作**
   - 优先使用 Edit 工具修改现有文件
   - 只在必要时创建新文件
   - 不要创建文档文件（README.md 等），除非明确要求

3. **安全性**
   - 避免引入安全漏洞（XSS, SQL 注入等）
   - 不要在代码中硬编码敏感信息
   - 使用 .env 文件管理环境变量

### 交互方式

1. **确认机制**
   - 不要自动提交代码到 git
   - 对于破坏性操作（删除、强制推送等），先询问
   - 修改多个文件前，先说明计划

2. **响应风格**
   - 简洁明了，避免冗长
   - 使用中文交流
   - 不要使用 emoji（除非明确要求）
   - 引用代码时使用文件路径和行号：`file_path:line_number`

3. **任务执行**
   - 复杂任务使用 Task tool 和专门的 agent
   - 并行执行独立的操作以提高效率
   - 遇到阻塞时寻找替代方案，不要重复失败的操作

## 参考资源

### 官方文档
- [MDN Web Docs](https://developer.mozilla.org/zh-CN/) - HTML/CSS/JS 权威文档
- [Vue.js 官方文档](https://cn.vuejs.org/) - Vue.js 中文文档
- [Can I Use](https://caniuse.com/) - 浏览器兼容性查询

### 学习资源
- 项目内 README.md 文件包含各技术领域的学习资源链接
- `.claude/` 目录包含 Claude Code 相关文档

## 重要提示

1. **这是一个学习项目**
   - 代码应该清晰易懂，适合学习参考
   - 优先考虑可读性而非性能优化
   - 每个示例应该专注于演示一个特定概念

2. **独立运行**
   - 每个 HTML 文件应该能够独立在浏览器中打开运行
   - 最小化外部依赖
   - 必要的依赖通过 CDN 引入

3. **持续学习**
   - 欢迎添加新的示例和案例
   - 记录学习过程中遇到的问题和解决方案
   - 分享有趣的发现和技巧

4. **代码质量**
   - 即使是示例代码也要保持良好的代码质量
   - 遵循最佳实践
   - 避免已知的反模式

---

最后更新：2026-02-26
