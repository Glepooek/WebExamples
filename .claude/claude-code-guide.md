# Claude Code 使用指南

> 一份由浅入深的Claude Code CLI学习指南，帮助你从配置到实战全面掌握Claude Code。

## 目录

- [简介](#简介)
- [安装和启动](#安装和启动)
- [配置和设置](#配置和设置)
- [基础命令](#基础命令)
- [工作模式](#工作模式)
- [扩展功能](#扩展功能)
  - [Skills](#skills)
  - [MCP服务器](#mcp服务器)
- [任务管理](#任务管理)
- [会话管理](#会话管理)
- [快捷操作](#快捷操作)
- [工作流程建议](#工作流程建议)
- [提示技巧](#提示技巧)
- [常见问题](#常见问题)
- [命令速查表](#命令速查表)

---

## 简介

### 什么是 Claude Code？

Claude Code是Anthropic官方提供的命令行工具，让你可以在终端中与Claude AI进行交互，直接操作本地文件系统，完成代码开发、审查、重构等任务。

### 核心特性

- **🖥️ 命令行交互**：在终端中与```Claude```对话，无需切换窗口
- **📁 本地文件访问**：直接读写项目文件，无需复制粘贴
- **🔧 可扩展**：支持```Skills和MCP服务器```扩展功能
- **🎯 专注开发**：为软件工程任务优化的AI助手
- **💡 多种工作模式**：Plan Mode、Ask Before Edits、Edit Automatically

### 适用场景

- 代码开发和调试
- 代码审查和重构
- Git提交管理
- 项目架构设计
- 依赖管理和安全检查
- 学习新代码库

---

## 安装和启动

### 系统要求

- **操作系统**：Windows 10+、macOS 10.15+、Linux
- **Node.js**：16.0+（推荐18.0+）
- **终端**：支持UTF-8的现代终端（Windows Terminal、iTerm2、Alacritty等）
- **API密钥**：需要Anthropic API密钥

### 安装方式

**方式一：使用npm（推荐）**
```bash
npm install -g @anthropic-ai/claude-code
```

**方式二：使用yarn**
```bash
yarn global add @anthropic-ai/claude-code
```

**方式三：从源码安装**
```bash
git clone https://github.com/anthropics/claude-code.git
cd claude-code
npm install
npm link
```

### 配置API密钥

安装完成后，需要配置API密钥：

```bash
# 方式一：使用环境变量
export ANTHROPIC_API_KEY="your-api-key-here"

# 方式二：使用配置文件
claude config set api-key your-api-key-here
```

### 启动Claude Code

```bash
# 在任意目录启动
claude

# 在指定项目目录启动
cd /path/to/your/project
claude
```

### 验证安装

```bash
# 查看版本
claude --version

# 查看帮助
claude --help
```

### 更新Claude Code

**检查更新**
```bash
# 查看当前版本
claude --version

# 检查是否有新版本
npm outdated -g @anthropic-ai/claude-code
```

**更新到最新版本**

**方式一：使用npm更新**
```bash
# 更新到最新版本
npm update -g @anthropic-ai/claude-code

# 或者先卸载再重新安装
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code
```

**方式二：使用yarn更新**
```bash
# 更新到最新版本
yarn global upgrade @anthropic-ai/claude-code

# 或者先移除再重新添加
yarn global remove @anthropic-ai/claude-code
yarn global add @anthropic-ai/claude-code
```

**方式三：从源码更新**
```bash
cd /path/to/claude-code
git pull origin main
npm install
npm link
```

**更新后验证**
```bash
# 确认版本已更新
claude --version

# 测试运行
claude
```

**查看更新日志**
- **在线查看**：https://github.com/anthropics/claude-code/releases
- **命令行查看**：
  ```bash
  npm info @anthropic-ai/claude-code
  ```

**更新建议**
- 定期检查更新（建议每月一次）
- 更新前备份重要配置文件（`~/.claude/settings.json`）
- 阅读发布说明，了解破坏性变更
- 在非关键项目上先测试新版本

---

## 配置和设置

> 💡 **开始之前**：正确的配置是使用 Claude Code 的第一步，让我们先完成环境准备。

### 配置文件位置

- **Windows**: `%USERPROFILE%\.claude\settings.json`
- **macOS/Linux**: `~/.claude/settings.json`
- **MCP配置**：`~/.claude/mcp_settings.json`

### 环境变量配置

```bash
# API Key（必需）
export ANTHROPIC_API_KEY="your-api-key"

# 自定义配置目录（可选）
export CLAUDE_CONFIG_DIR="~/.config/claude"

# 默认模型（可选）
export CLAUDE_DEFAULT_MODEL="sonnet"

# 启用调试模式（可选）
export CLAUDE_DEBUG=true
```

### 基础配置示例

**settings.json 最小配置**
```json
{
  "defaultModel": "sonnet"
}
```

**settings.json 完整配置**
```json
{
  "defaultModel": "sonnet",
  "autoCommit": false,
  "theme": "dark",
  "editor": "code",
  "editMode": "ask",
  "hooks": {
    "preToolCall": "echo 'Starting tool...'",
    "postToolCall": "echo 'Tool completed'",
    "userPromptSubmit": "./scripts/validate.sh"
  },
  "allowedPrompts": [
    {
      "tool": "Bash",
      "prompt": "run tests"
    },
    {
      "tool": "Bash",
      "prompt": "install dependencies"
    }
  ]
}
```

### Hooks配置详解

Hooks允许你在特定事件触发时执行自定义命令：

- **preToolCall**: 在工具调用前执行
- **postToolCall**: 在工具调用后执行
- **userPromptSubmit**: 在用户提交提示后执行

**实用Hooks示例**：

```json
{
  "hooks": {
    "preToolCall": "git status",
    "postToolCall": "npm test",
    "userPromptSubmit": "./pre-commit-check.sh"
  }
}
```

### 验证配置

配置完成后，运行以下命令验证：
```bash
# 启动 Claude Code
claude

# 检查当前配置
显示当前配置
```

---

## 基础命令

> 💡 **基础入门**：掌握这些基本命令，你就可以开始使用Claude Code了。

### /help
- **功能**：获取 Claude Code 使用帮助
- **用法**：直接输入 `/help`
- **说明**：显示可用命令和功能说明

### /clear
- **功能**：清除当前对话历史
- **用法**：直接输入 `/clear`
- **说明**：开始新的对话会话，但保留工作目录

### /exit 或 /quit
- **功能**：退出 Claude Code CLI
- **用法**：输入 `/exit` 或 `/quit`
- **说明**：关闭当前会话并退出程序

### /model
- **功能**：切换 AI 模型
- **用法**：`/model` 或 `/model <model-name>`
- **可选模型**：
  - `sonnet` - Claude Sonnet 4.5（默认，平衡性能和成本）
  - `opus` - Claude Opus 4.5（最强大的模型，适合复杂任务）
  - `haiku` - Claude Haiku（快速响应，适合简单任务）
- **使用场景**：
  - 日常开发 → 使用 `sonnet`
  - 复杂架构设计、代码重构 → 使用 `opus`
  - 简单查询、快速问答 → 使用 `haiku`

### 基础操作示例

```bash
# 启动 Claude Code
claude

# 查看帮助
/help

# 切换到 opus 模型处理复杂任务
/model opus

# 完成后切换回 sonnet
/model sonnet

# 清除对话历史，开始新任务
/clear

# 退出
/exit
```

---

## 工作模式

> 💡 **掌握工作模式**：不同的工作模式适用于不同的场景，理解它们可以让你更高效地使用 Claude Code。

Claude Code 提供三种不同的工作模式，适应不同场景的开发需求。你可以根据任务的复杂度和风险程度选择合适的模式。

### 模式对比

| 模式 | 特点 | 适用场景 | 控制程度 |
|------|------|---------|---------|
| **Plan Mode**<br/>计划模式 | 先规划后执行<br/>需要用户审批 | 复杂任务、重构、新功能 | 🔒 完全控制 |
| **Ask Before Edits**<br/>编辑前询问 | 每次修改前询问<br/>实时确认 | 重要文件、学习过程 | 🔐 高度控制 |
| **Edit Automatically**<br/>自动编辑 | 直接执行修改<br/>无需确认 | 简单任务、信任场景 | ⚡ 快速执行 |

---

### 1️⃣ Plan Mode（计划模式）

**概述**：先制定详细计划，获得批准后再执行代码修改的工作模式。

#### 何时使用

✅ **应该使用**：
- 添加新功能（用户认证、支付系统、权限管理等）
- 重构代码或改变架构
- 需要修改多个文件的复杂任务
- 有多种实现方案需要权衡选择
- 对代码库不熟悉，需要先探索理解
- 可能影响系统核心功能的修改

❌ **不需要使用**：
- 修复简单的 bug（拼写错误、逻辑错误）
- 修改单行或几行代码
- 添加注释或文档
- 纯粹的信息查询和代码分析

#### 进入方式

**方式一：直接命令**
```bash
进入 plan mode
请进入计划模式
启用计划模式
```

**方式二：描述规划任务**
```bash
帮我规划如何实现用户认证功能
我想重构数据库层，先制定一个计划
设计一个缓存系统的实现方案
```

**方式三：AI主动建议**
当任务复杂度达到一定程度时，Claude会主动建议进入plan mode

#### 工作流程

```
1. 📋 进入计划模式
   └─> 告诉 Claude 你的需求和目标

2. 🔍 代码探索阶段
   └─> Claude分析代码库结构、现有模式、依赖关系

3. 📝 方案设计阶段
   └─> 制定详细的实现计划：
       • 需要修改的文件列表
       • 具体实现步骤
       • 潜在风险和注意事项
       • 测试策略

4. 💬 互动讨论阶段
   └─> 你可以：
       • 提出疑问和建议
       • 要求调整方案
       • 请求更多细节

5. ✅ 确认执行阶段
   └─> 审批计划后，Claude开始实施

6. ⚙️ 退出 Plan Mode
   └─> 按照计划逐步实施代码修改
```

#### 特点与优势

- **📊 全局视角**：在动手前了解完整的修改范围
- **🎯 目标明确**：确保实现方案符合需求
- **🛡️ 风险可控**：提前识别潜在问题
- **💡 方案优化**：可以讨论和改进实施方案
- **📚 学习机会**：理解Claude的设计思路

#### 示例对话

```
用户: 进入 plan mode，帮我规划如何给项目添加暗色模式

Claude: [进入 Plan Mode]
正在分析项目结构...
✓ 检查现有样式系统
✓ 分析组件结构
✓ 识别主题相关代码

分析完成！我制定了以下实现方案：

方案：基于 CSS 变量的主题系统

文件修改清单：
1. src/styles/variables.css - 定义主题颜色变量
2. src/contexts/ThemeContext.tsx - 创建主题上下文
3. src/components/ThemeToggle.tsx - 新建主题切换组件
4. src/App.tsx - 集成主题系统
5. 16 个组件文件 - 更新为使用 CSS 变量

实施步骤：
1. 创建 CSS 变量定义（亮色/暗色）
2. 实现主题 Context 和 Provider
3. 添加主题切换组件
4. 更新所有组件使用变量而非硬编码颜色
5. 持久化主题选择到 localStorage

风险评估：
- 低风险：使用 CSS 变量，兼容性好
- 需要测试：确保所有组件在两种主题下都可读

预计影响：
- 新增 2 个文件
- 修改 18 个文件
- 不影响现有功能

用户: 方案很好，但能不能使用 Tailwind 的暗色模式？

Claude: 当然可以！让我调整方案...
[展示基于 Tailwind dark: 修饰符的新方案]

用户: 这个方案更好，请开始实施

Claude: [退出 Plan Mode，开始执行]
开始实施主题系统...
```

---

### 2️⃣ Ask Before Edits（编辑前询问模式）

**概述**：每次进行文件修改前都会询问你的确认，适合需要精细控制的场景。

#### 何时使用

✅ **适用场景**：
- 修改关键业务逻辑文件
- 修改配置文件（如package.json、tsconfig.json）
- 学习阶段，想了解每一步修改
- 不确定AI建议是否合适
- 多人协作项目，需要慎重修改
- 处理遗留代码，不确定影响范围

#### 启用方式

**方式一：对话中请求**
```bash
请在修改前询问我
每次编辑前先让我确认
开启编辑前询问模式
```

**方式二：配置文件设置**

在 `~/.claude/settings.json` 中配置：
```json
{
  "editMode": "ask",
  "alwaysAskBeforeEdits": true
}
```

#### 工作方式

```
Claude: 我需要修改 src/auth/login.ts

建议的修改：
━━━━━━━━━━━━━━━━━━━━━━━━━━━
- 在第 25 行添加参数验证
- 在第 30 行添加错误处理
- 更新第 45 行的返回类型
━━━━━━━━━━━━━━━━━━━━━━━━━━━

具体修改内容：
[显示 diff 预览]

❓ 是否执行此修改？
   [A] 同意所有修改
   [Y] 同意此修改
   [N] 跳过此修改
   [E] 编辑修改内容
   [Q] 退出

用户: Y

Claude: ✓ 已修改 src/auth/login.ts
继续下一个文件...
```

#### 特点与优势

- **🎯 精确控制**：每一步修改都在你的掌控之中
- **📖 学习工具**：理解AI的修改逻辑和最佳实践
- **🔍 及时发现问题**：在修改发生前就能发现不当之处
- **🛡️ 安全保障**：避免意外修改重要文件

#### 快捷响应

| 输入 | 操作 |
|------|------|
| `y` / `yes` | 同意此次修改 |
| `n` / `no` | 跳过此次修改 |
| `a` / `all` | 同意所有后续修改 |
| `e` / `edit` | 编辑修改内容 |
| `d` / `diff` | 查看详细 diff |
| `q` / `quit` | 退出修改流程 |

---

### 3️⃣ Edit Automatically（自动编辑模式）

**概述**：Claude 直接执行代码修改，无需逐个确认，适合快速开发和信任场景。

#### 何时使用

✅ **适用场景**：
- 简单的 bug 修复
- 添加日志、注释等非关键修改
- 格式化代码、重命名变量
- 已经充分信任AI的能力
- 快速原型开发
- 批量修改（如更新导入路径）

⚠️ **谨慎使用**：
- 核心业务逻辑修改
- 数据库 schema 变更
- 安全相关代码
- 第一次处理陌生代码库

#### 启用方式

**方式一：对话中请求**（临时）
```bash
自动执行修改，不需要询问
直接帮我修改，不用确认
开启自动编辑模式
```

**方式二：配置文件设置**（永久）

在 `~/.claude/settings.json` 中配置：
```json
{
  "editMode": "auto",
  "alwaysAskBeforeEdits": false
}
```

#### 工作方式

```
用户: 修复 src/utils/format.ts 中的日期格式化 bug

Claude: 正在分析代码...
✓ 已读取 src/utils/format.ts
✓ 识别到问题：时区处理不正确

执行修改：
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ 修改 src/utils/format.ts (3 处更改)
  • 第 12 行：添加时区参数
  • 第 18 行：使用 toLocaleString 替代 toString
  • 第 25 行：添加默认时区处理
━━━━━━━━━━━━━━━━━━━━━━━━━━━

修改完成！建议运行测试验证修复效果。
```

#### 特点与优势

- **⚡ 快速高效**：无需等待确认，直接完成任务
- **🔄 流畅体验**：适合连续的开发工作流
- **🎯 专注结果**：关注最终效果而非过程细节

#### 安全措施

即使在自动编辑模式下，Claude仍会：
- 避免修改`.env`、`.git`等敏感文件
- 修改前自动备份重要文件（如果配置了git）
- 在修改完成后显示修改摘要
- 遇到高风险操作时主动询问

---

### 模式切换指南

#### 根据任务类型选择

| 任务类型 | 推荐模式 | 理由 |
|---------|---------|------|
| 新功能开发 | Plan Mode | 需要整体规划 |
| 代码重构 | Plan Mode | 影响范围大 |
| Bug 修复（复杂） | Ask Before Edits | 需要谨慎确认 |
| Bug 修复（简单） | Edit Automatically | 快速解决 |
| 添加注释/文档 | Edit Automatically | 低风险操作 |
| 修改配置文件 | Ask Before Edits | 可能影响全局 |
| 格式化代码 | Edit Automatically | 标准操作 |
| 数据库迁移 | Plan Mode | 高风险操作 |
| 学习新代码库 | Ask Before Edits | 了解修改细节 |
| 快速原型开发 | Edit Automatically | 追求速度 |

#### 根据经验水平选择

**新手开发者**
```
推荐：Ask Before Edits → Plan Mode
好处：学习最佳实践，理解每一步修改
```

**中级开发者**
```
推荐：Plan Mode + Edit Automatically（结合使用）
好处：复杂任务规划，简单任务快速执行
```

**高级开发者**
```
推荐：Edit Automatically（主要） + Plan Mode（架构设计）
好处：高效开发，关键决策时深入规划
```

#### 混合使用策略

你可以在同一个会话中灵活切换模式：

```bash
# 开始规划
用户: 进入 plan mode，规划用户认证系统

Claude: [制定详细计划...]

用户: 计划很好，请开始实施。对于配置文件修改，请在执行前询问我

Claude: [退出 Plan Mode，进入 Ask Before Edits 模式]
即将修改 config/auth.config.ts，是否继续？

用户: y

Claude: ✓ 已修改配置文件。现在自动处理其他文件...
```

---

### 模式相关命令总结

| 操作 | 命令示例 |
|------|---------|
| 进入 Plan Mode | `进入 plan mode` |
| 退出 Plan Mode | `开始实施` / `按计划执行` |
| 启用编辑前询问 | `请在修改前询问我` |
| 启用自动编辑 | `自动执行，不需要确认` |
| 查看当前模式 | `当前是什么模式？` |
| 临时切换模式 | `接下来的修改不用询问我` |

---

### 最佳实践

1. **任务开始时明确模式**
   ```
   ✅ "进入 plan mode，规划购物车功能"
   ✅ "自动帮我修复这些 ESLint 错误"
   ```

2. **关键阶段切换到更安全的模式**
   ```
   "数据库迁移部分，请在每次修改前询问我"
   ```

3. **完成后切回高效模式**
   ```
   "核心功能已完成，剩下的可以自动处理"
   ```

4. **不确定时，选择更保守的模式**
   ```
   Plan Mode > Ask Before Edits > Edit Automatically
   ```

5. **建立个人习惯**
   ```json
   // 在 settings.json 中设置默认模式
   {
     "defaultEditMode": "ask",  // 默认谨慎
     "autoModeForSimpleTasks": true  // 简单任务自动识别
   }
   ```

---

## 扩展功能

> 💡 **扩展 Claude Code 的能力**：通过 Skills 和 MCP服务器，你可以为 Claude Code 添加无限可能。

Claude Code 提供两种主要的扩展方式，让你能够根据需求定制和增强功能：

### 扩展方式对比

| 扩展方式 | 类型 | 特点 | 适用场景 | 上手难度 |
|---------|------|------|---------|---------|
| **Skills** | 任务封装 | 轻量级、开箱即用 | 快速工作流、命令封装、团队标准化 | ⭐ 简单 |
| **MCP服务器** | 深度集成 | 强大、有状态 | GitHub集成、数据库访问、外部API | ⭐⭐⭐ 中等 |

### 如何选择？

**选择Skills当你需要：**
- ✅ 快速封装常用命令和工作流
- ✅ 标准化团队开发流程
- ✅ 简单的脚本和命令组合
- ✅ 无需外部服务的本地操作

**选择MCP服务器当你需要：**
- ✅ 与外部服务深度集成（GitHub、Slack、数据库）
- ✅ 访问需要认证的API
- ✅ 复杂的有状态交互
- ✅ 跨多个系统的协调操作

### 两者协作

Skills和MCP服务器不是互斥的，而是可以配合使用：

```bash
# Skill可以调用MCP提供的能力
/github-sync      # Skill使用GitHub MCP Server同步代码
/db-migrate       # Skill使用SQLite MCP Server执行迁移
/deploy-check     # Skill调用多个MCP服务验证部署条件
```

**实际案例：**
- 创建一个`/deploy` Skill，内部调用GitHub MCP检查PR状态、调用CI/CD API触发部署
- 创建一个`/sync-issues` Skill，使用GitHub MCP和Slack MCP同步问题到团队频道

---

## Skills

> 💡 **快速上手**：Skills 是预定义的专业工具，通过斜杠命令快速调用，大幅提升开发效率。

Skills是Claude Code的扩展功能模块，通过斜杠命令（如`/commit`、`/code-health`）调用。每个Skill都是一个专门的工具，用于完成特定的开发任务。

### Skills的特点

- **🎯 专业化**：每个Skill专注于特定领域（Git、代码审查、依赖管理等）
- **📦 可扩展**：支持自定义Skills，满足项目特定需求
- **⚡ 快速调用**：通过`/skill-name`形式直接调用
- **🔧 可配置**：可以传递参数自定义行为

### 查看可用Skills

```bash
# 在对话中询问
列出所有可用的Skills
显示已安装的技能

# 或者直接调用不存在的Skill，会显示可用列表
/help-skills
```

### 内置Skills

Claude Code内置了以下常用Skills：

---

#### Git相关Skills

##### /commit
- **功能**：创建Git提交
- **用法**：`/commit`或`/commit -m "提交信息"`
- **说明**：
  - 自动分析代码更改
  - 生成规范的提交信息
  - 支持自定义提交消息
  - 自动添加Co-Authored-By标记

##### /review-pr
- **功能**：审查GitHub Pull Request
- **用法**：`/review-pr <PR号>`或`/review-pr <PR-URL>`
- **说明**：
  - 分析PR中的代码更改
  - 提供改进建议
  - 检查潜在问题
- **示例**：
  ```bash
  /review-pr 123
  /review-pr https://github.com/user/repo/pull/456
  ```

---

#### 代码质量Skills

##### /code-health
- **功能**：分析代码质量、安全漏洞和可维护性问题
- **用法**：`/code-health [文件路径或目录]`
- **检查项**：
  - 代码质量问题
  - 安全漏洞
  - 性能问题
  - 可维护性评估

##### /dependency-check
- **功能**：检查依赖安全性和版本更新
- **用法**：`/dependency-check`
- **检查项**：
  - 已知安全漏洞
  - 过时的依赖版本
  - 更新建议
  - 支持多种包管理器（npm, pip, cargo等）

##### /frontend-review
- **功能**：审查前端代码（HTML5、JavaScript、CSS）
- **用法**：`/frontend-review [文件路径]`
- **检查项**：
  - HTML5 最佳实践
  - JavaScript 代码规范
  - CSS 编码标准
  - 可访问性问题
  - 性能优化建议

---

### 如何使用Skills

**基本用法**
```bash
/skill-name [参数]
```

**示例**
```bash
# 不带参数
/commit
/dependency-check

# 带参数
/commit -m "fix: 修复登录问题"
/code-health src/components
/review-pr 123
```

**在对话中调用**
```bash
# 直接描述任务（Claude会自动使用相应的Skill）
帮我审查PR #123
检查代码质量问题
创建一个Git提交
```

### 自定义Skills

你可以创建自己的Skills来满足项目特定需求。

#### 创建自定义Skill

**1. 创建Skill定义文件**

在`~/.claude/skills/`目录下创建`my-skill.json`：

```json
{
  "name": "my-skill",
  "description": "我的自定义技能",
  "command": "/my-skill",
  "prompt": "这是一个自定义技能，用于...",
  "parameters": [
    {
      "name": "target",
      "description": "目标文件或目录",
      "required": false
    }
  ]
}
```

**2. 或创建Skill脚本**

创建可执行脚本`~/.claude/skills/my-skill.sh`：

```bash
#!/bin/bash
# 自定义Skill脚本

TARGET=$1

echo "执行自定义检查: $TARGET"
# 你的自定义逻辑...
```

赋予执行权限：
```bash
chmod +x ~/.claude/skills/my-skill.sh
```

**3. 在配置中注册**

在`~/.claude/settings.json`中添加：

```json
{
  "skills": {
    "my-skill": {
      "command": "bash",
      "args": ["~/.claude/skills/my-skill.sh"],
      "description": "执行自定义检查"
    }
  }
}
```

**4. 使用自定义Skill**

```bash
/my-skill src/
```

#### 自定义Skill示例

**示例1：代码统计Skill**

```json
{
  "name": "code-stats",
  "description": "统计代码行数和文件数量",
  "command": "/code-stats",
  "script": "find . -name '*.js' -o -name '*.ts' | xargs wc -l"
}
```

**示例2：测试覆盖率Skill**

```json
{
  "name": "coverage",
  "description": "检查测试覆盖率",
  "command": "/coverage",
  "script": "npm run test:coverage && open coverage/index.html"
}
```

**示例3：部署检查Skill**

```json
{
  "name": "deploy-check",
  "description": "部署前检查",
  "command": "/deploy-check",
  "tasks": [
    "运行所有测试",
    "检查代码质量",
    "验证环境变量",
    "检查依赖安全性"
  ]
}
```

### Skills最佳实践

1. **合理命名**
   - 使用清晰、描述性的名称
   - 遵循kebab-case命名规范
   - ✅ `/test-coverage` ✅ `/deploy-check`
   - ❌ `/tc` ❌ `/DeployCheck`

2. **提供描述**
   - 每个Skill都应有清晰的描述
   - 说明参数和使用方法

3. **组合使用**
   ```bash
   # 工作流：代码检查 → 测试 → 提交
   /code-health src/
   /coverage
   /commit
   ```

4. **创建项目专属Skills**
   - 将常用工作流封装为Skill
   - 团队共享Skills配置

5. **版本控制**
   - 将Skills配置提交到项目仓库
   - 团队成员共享相同的Skills

---

## 任务管理

> 💡 **跟踪进度**：对于复杂的多步骤任务，使用任务管理功能可以清晰地跟踪进度。

### /tasks
- **功能**：查看和管理任务列表
- **用法**：`/tasks`
- **说明**：
  - 显示当前所有任务
  - 查看任务状态（待处理、进行中、已完成）
  - 跟踪复杂任务的进度

### 使用场景

```bash
# 开始复杂任务时，Claude 会自动创建任务列表
用户: 帮我实现一个用户认证系统

Claude: 我将创建以下任务：
1. [待处理] 设计数据库 schema
2. [待处理] 实现注册功能
3. [待处理] 实现登录功能
4. [待处理] 添加 JWT 认证
5. [待处理] 编写单元测试

# 查看任务进度
用户: /tasks

Claude: 当前任务列表：
1. ✅ 设计数据库 schema
2. 🔄 实现注册功能（进行中）
3. ⏳ 实现登录功能
4. ⏳ 添加 JWT 认证
5. ⏳ 编写单元测试
```

---

## 会话管理

> 💡 **跨平台协作**：灵活管理你的对话会话，在不同设备和平台间无缝切换。

### /push
- **功能**：将当前对话推送到 Claude.ai 网页版
- **用法**：`/push`
- **说明**：在浏览器中继续当前对话
- **使用场景**：
  - 需要在网页端查看更丰富的格式
  - 与团队成员共享对话
  - 切换设备继续工作

### /remember
- **功能**：记住特定信息供后续对话使用
- **用法**：`/remember <信息内容>`
- **说明**：保存用户偏好、项目约定等信息
- **示例**：
  ```bash
  /remember 我们的项目使用 TypeScript 和 React
  /remember 提交信息使用约定式提交格式
  /remember API 端点前缀为 /api/v1
  /remember 组件库使用 Ant Design 5.x
  ```

### 最佳实践

**建立项目上下文**
```bash
# 在项目开始时记住关键信息
/remember 项目技术栈：React 18 + TypeScript + Vite
/remember 使用ESLint Airbnb规范
/remember API接口统一使用axios封装
/remember 测试框架使用Jest + React Testing Library
```

**跨设备协作**
```bash
# 在命令行完成代码后，推送到网页端写文档
用户: /push

Claude: ✓ 对话已推送到Claude.ai
访问链接: https://claude.ai/chat/abc123
```

---

## 快捷操作

> 💡 **提高效率**：掌握这些快捷操作，让你的工作更加流畅。

### 多行输入
- 在输入时按 `Shift + Enter` 可以换行
- 按 `Enter` 发送消息

### 中断执行
- 按 `Ctrl + C` 可以中断当前正在执行的操作

### 命令历史
- 使用上下箭头键浏览命令历史

### 快捷键总结

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + C` | 中断当前操作 |
| `Shift + Enter` | 多行输入（不发送） |
| `Enter` | 发送消息 |
| `↑ / ↓` | 浏览命令历史 |

---

## MCP服务器

> 💡 **深度集成**：MCP（Model Context Protocol）服务器提供与外部服务的深度集成能力。

Claude Code 支持 Model Context Protocol (MCP) 服务器，可以扩展功能：

### 什么是MCP？

MCP（Model Context Protocol）是一个开放协议，允许AI应用与外部工具和数据源进行标准化交互。通过MCP服务器，Claude Code可以：

- 🔗 连接到GitHub、Slack等服务
- 📊 访问数据库和文件系统
- 🔍 执行网页搜索
- 🎨 与设计工具集成

### 配置MCP服务器

在 `~/.claude/mcp_settings.json` 中配置：
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token"
      }
    }
  }
}
```

### 常用MCP服务器

#### 官方MCP服务器

**GitHub MCP Server**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```
功能：仓库管理、Issue、PR、文件操作、搜索等

**Filesystem MCP Server**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    }
  }
}
```
功能：安全的文件系统访问

**SQLite MCP Server**
```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "/path/to/database.db"]
    }
  }
}
```
功能：数据库查询和管理

**Brave Search MCP Server**
```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-api-key"
      }
    }
  }
}
```
功能：网页搜索能力

#### 第三方MCP服务器

**MasterGo MCP Server**
```json
{
  "mcpServers": {
    "mastergo": {
      "command": "npx",
      "args": ["-y", "@mastergo/mcp-server-mastergo"],
      "env": {
        "MASTERGO_TOKEN": "your-token"
      }
    }
  }
}
```
功能：设计稿转代码、获取设计资源

**Slack MCP Server**
```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-token",
        "SLACK_TEAM_ID": "T1234567"
      }
    }
  }
}
```
功能：发送消息、管理频道、搜索历史

### MCP服务器管理

**查看已安装的MCP服务器**：
检查`~/.claude/mcp_settings.json`文件

**测试MCP服务器**：
```bash
# 手动测试MCP服务器
npx @modelcontextprotocol/server-github
```

**调试MCP连接**：
在对话中询问："列出可用的MCP工具"

### Skills与MCP的协作

Skills和MCP服务器不是替代关系，而是互补关系。合理组合使用可以发挥更大威力。

#### 协作模式

**模式1：Skill调用MCP**
```bash
# Skill封装工作流，MCP提供底层能力
/deploy-prod
  ↓
  内部使用GitHub MCP检查PR状态
  ↓
  内部使用CI/CD API触发部署
  ↓
  内部使用Slack MCP发送通知
```

**模式2：MCP数据 + Skill处理**
```bash
# MCP获取数据，Skill加工处理
/weekly-report
  ↓
  GitHub MCP获取本周PR和Issue
  ↓
  Skill生成报告并格式化
  ↓
  Slack MCP发送到团队频道
```

#### 实际案例

**案例1：完整的代码审查流程**
```json
{
  "name": "full-review",
  "description": "完整代码审查流程",
  "steps": [
    "使用/code-health检查代码质量",
    "使用/dependency-check检查依赖安全",
    "使用GitHub MCP获取PR diff",
    "生成审查报告",
    "使用GitHub MCP发布审查评论"
  ]
}
```

**案例2：自动化部署检查**
```json
{
  "name": "deploy-check",
  "description": "部署前自动检查",
  "steps": [
    "使用/code-health验证代码质量",
    "使用GitHub MCP检查所有CI是否通过",
    "使用SQLite MCP验证数据库迁移脚本",
    "使用Slack MCP请求部署批准",
    "批准后触发部署"
  ]
}
```

**案例3：团队周报生成**
```json
{
  "name": "weekly-summary",
  "description": "生成团队周报",
  "steps": [
    "GitHub MCP获取本周提交、PR、Issue",
    "分析代码变更统计",
    "生成Markdown格式报告",
    "Slack MCP发送到团队频道",
    "GitHub MCP创建Discussion存档"
  ]
}
```

#### 最佳实践

1. **分层设计**
   ```
   用户命令 → Skills（封装逻辑） → MCP（底层能力）
   ```

2. **单一职责**
   - Skill负责工作流编排
   - MCP负责外部集成

3. **错误处理**
   - Skill中处理MCP调用失败的情况
   - 提供友好的错误提示

4. **团队共享**
   - 将常用的Skill + MCP组合配置化
   - 在团队内统一标准

5. **文档记录**
   ```json
   {
     "name": "deploy",
     "description": "生产环境部署",
     "dependencies": [
       "GitHub MCP Server",
       "Slack MCP Server"
     ],
     "permissions": [
       "repo:write",
       "chat:write"
     ]
   }
   ```

#### 选择建议

| 需求 | 推荐方案 |
|------|---------|
| 简单命令封装 | Skills |
| 需要外部 API | MCP服务器 |
| 复杂工作流 + 外部服务 | Skills + MCP |
| 团队标准化流程 | Skills + MCP（配置化） |
| 一次性脚本 | Skills（临时） |
| 持续集成 | MCP服务器（稳定） |

---

## 工作流程建议

> 💡 **实战应用**：结合前面学到的知识，这里提供了实际开发中的完整工作流程。

### 新功能开发流程

```
1. 需求分析
   "进入 plan mode，帮我规划如何实现 [功能]"

2. 代码实现
   按照计划逐步实现功能

3. 代码审查
   "/code-health src/new-feature"
   "/frontend-review src/components/NewComponent.tsx"

4. 测试
   "运行测试并检查覆盖率"

5. 提交代码
   "/commit"

6. 创建 PR
   "创建 PR 到 main 分支"
```

### Bug 修复流程

```
1. 重现问题
   "帮我分析这个错误：[错误信息]"

2. 定位代码
   "在代码库中查找 [相关功能] 的实现"

3. 修复 Bug
   "修复 [文件名] 中的 [问题]"

4. 验证修复
   "运行相关测试"

5. 提交
   "/commit -m 'fix: [问题描述]'"
```

### 代码重构流程

```
1. 进入计划模式
   "进入 plan mode，我想重构 [模块名]"

2. 分析现状
   Claude 分析代码结构和潜在问题

3. 制定方案
   审查并确认重构计划

4. 分步实施
   按计划逐步重构

5. 质量检查
   "/code-health [重构的目录]"

6. 测试验证
   "运行完整测试套件"

7. 提交
   "/commit"
```

---

## 提示技巧

> 💡 **进阶使用**：掌握这些技巧，让 Claude Code 更好地理解你的需求。

### 基础技巧

1. **明确任务**：清晰描述你想要完成的任务
   - ✅ "在登录页面添加记住密码功能"
   - ❌ "改进登录"

2. **提供上下文**：包含相关文件路径和代码片段
   - ✅ "修改 src/auth/login.ts 中的验证逻辑"
   - ❌ "修改验证逻辑"

3. **分步骤**：对于复杂任务，可以分步骤请求
   - "先帮我分析现有的路由结构"
   - "基于分析结果，设计新的路由方案"
   - "实施路由重构"

4. **使用技能**：善用技能命令提高效率
   - `/commit` - 快速提交
   - `/code-health` - 代码检查
   - `/review-pr` - PR 审查

5. **审查建议**：对于重要更改，先制定计划
   - "进入 plan mode，规划数据库迁移方案"

### 高级技巧

**使用 /remember 建立项目上下文**
```bash
/remember 项目技术栈：React 18 + TypeScript + Vite
/remember 使用 ESLint Airbnb 规范
/remember API 接口统一使用 axios 封装
/remember 组件库使用 Ant Design 5.x
```

**组合使用多个命令**
```bash
先运行 /code-health，然后根据问题修复代码，最后 /commit
```

**利用 Plan Mode 探索代码库**
```bash
进入 plan mode，帮我理解这个项目的架构
[Claude 会探索代码库并生成架构文档]
```

**精确指定文件和位置**
```bash
在 src/utils/auth.ts 的第 45 行，getUserInfo 函数需要添加错误处理
```

---

## 常见问题

> 💡 **问题排查**：遇到问题时，先看看这里有没有答案。

### Q: Claude Code和Claude.ai有什么区别？
**A**:
- **Claude Code**：命令行工具，直接访问本地文件系统，适合编程任务
- **Claude.ai**：网页版，更适合对话和文档处理
- 可以用`/push`命令在两者之间切换

### Q: 如何让Claude记住项目约定？
**A**：使用`/remember`命令或在项目根目录创建`.clauderc`文件：
```json
{
  "projectContext": "React + TypeScript 项目",
  "conventions": [
    "使用函数式组件和 Hooks",
    "所有组件需要 PropTypes",
    "提交信息遵循约定式提交"
  ]
}
```

### Q: 如何提高响应速度？
**A**:
- 简单任务使用`/model haiku`
- 避免一次性处理过多文件
- 使用具体的文件路径而非模糊描述

### Q: 如何处理敏感信息？
**A**:
- 在`.gitignore`中排除配置文件
- 使用环境变量存储密钥
- 配置hooks在提交前检查敏感信息

### Q: 代码修改太激进怎么办？
**A**:
- 使用plan mode先审查方案
- 明确告诉Claude："只修改X，不要改动其他代码"
- 每次只处理一个小任务

### Q: 如何使用自定义MCP服务器？
**A**：在`~/.claude/mcp_settings.json`中添加配置：
```json
{
  "mcpServers": {
    "my-custom-server": {
      "command": "node",
      "args": ["/path/to/my-server/index.js"],
      "env": {
        "API_KEY": "your-key"
      }
    }
  }
}
```

### Q: 如何取消正在执行的操作？
**A**：按`Ctrl + C`中断当前操作

### Q: 如何查看Claude使用了哪些工具？
**A**：对话中会显示工具调用，或在设置中启用详细日志：
```json
{
  "verboseLogging": true
}
```

### Q: 如何更新Claude Code到最新版本？
**A**：使用npm或yarn更新：
```bash
# npm更新
npm update -g @anthropic-ai/claude-code

# yarn更新
yarn global upgrade @anthropic-ai/claude-code

# 查看当前版本
claude --version
```
详细更新步骤请参考[安装和启动](#安装和启动)章节的"更新Claude Code"部分。

### Q: 更新后配置会丢失吗？
**A**：不会。更新只会替换程序文件，不会影响以下配置：
- `~/.claude/settings.json`（用户配置）
- `~/.claude/mcp_settings.json`（MCP配置）
- `~/.claude/skills/`（自定义Skills）

建议更新前仍然备份这些文件以防万一。

---

## 命令速查表

> 💡 **快速参考**：将这个速查表保存下来，随时查阅常用命令。

### 基础命令

| 命令 | 功能 | 示例 |
|------|------|------|
| `/help` | 显示帮助信息 | `/help` |
| `/clear` | 清除对话历史 | `/clear` |
| `/exit` | 退出程序 | `/exit` 或 `/quit` |
| `/model` | 切换模型 | `/model opus` |
| `/push` | 推送到网页版 | `/push` |
| `/remember` | 记住信息 | `/remember 使用 TypeScript` |
| `/tasks` | 查看任务列表 | `/tasks` |

### Skills技能

| Skill | 功能 | 示例 |
|------|------|------|
| `/commit` | 创建Git提交 | `/commit -m "feat: add login"` |
| `/review-pr` | 审查PR | `/review-pr 123` |
| `/code-health` | 代码质量检查 | `/code-health src/` |
| `/dependency-check` | 依赖检查 | `/dependency-check` |
| `/frontend-review` | 前端代码审查 | `/frontend-review src/App.tsx` |

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + C` | 中断当前操作 |
| `Shift + Enter` | 多行输入（不发送） |
| `Enter` | 发送消息 |
| `↑ / ↓` | 浏览命令历史 |

### 快捷短语

| 短语 | 效果 |
|------|------|
| "进入plan mode" | 进入计划模式 |
| "列出可用的Skills" | 查看所有可用技能 |
| "列出可用工具" | 查看MCP工具 |
| "显示当前配置" | 查看配置信息 |
| "分析代码库结构" | 探索项目架构 |

---

## 反馈和帮助

### 获取帮助
- **命令行帮助**：输入`/help`
- **官方文档**：https://docs.anthropic.com/claude-code
- **MCP协议**：https://modelcontextprotocol.io

### 反馈渠道
- **问题反馈**：https://github.com/anthropics/claude-code/issues
- **社区讨论**：https://discord.gg/anthropic

### 相关资源
- **Claude API文档**：https://docs.anthropic.com
- **MCP Server仓库**：https://github.com/modelcontextprotocol/servers
- **示例项目**：https://github.com/anthropics/claude-code-examples
- **最佳实践**：https://docs.anthropic.com/claude-code/best-practices

---

*文档版本：v1.0*
*最后更新：2026-02-26*
*Claude Code 版本：基于 Claude Sonnet 4.5*
*文档位置：`.claude/claude-code-guide.md`*

---

## 学习路径建议

根据你的经验水平，推荐以下学习路径：

**🔰 新手路径（1-2天）**
1. [配置和设置](#配置和设置) - 完成环境配置
2. [基础命令](#基础命令) - 掌握基本操作
3. [工作模式](#工作模式) - 从Ask Before Edits开始
4. [扩展功能 - Skills](#skills) - 尝试`/commit`和`/code-health`
5. [常见问题](#常见问题) - 了解常见问题

**🎓 中级路径（3-5天）**
1. 复习基础内容
2. [工作模式](#工作模式) - 尝试Plan Mode
3. [扩展功能 - Skills](#skills) - 创建自定义Skills
4. [扩展功能 - MCP服务器](#mcp服务器) - 配置GitHub MCP
5. [工作流程建议](#工作流程建议) - 建立自己的工作流

**🚀 高级路径（1-2周）**
1. 熟练使用所有工作模式
2. 创建团队共享的Skills库
3. 配置完整的MCP服务器集成
4. 建立自动化工作流（Hooks + Skills + MCP）
5. 优化团队协作流程

祝你学习愉快！🎉
