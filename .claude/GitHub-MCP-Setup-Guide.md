# GitHub MCP 配置与使用指南

> **配置时间**: 2026-02-08
> **状态**: ✅ 已完成配置

---

## 📦 安装状态

- ✅ Node.js v22.17.0
- ✅ npm v10.9.2
- ✅ GitHub MCP Server 已安装
- ✅ Claude Code 配置已创建

---

## ⚙️ 配置文件位置

**文件**: `C:\Users\Administrator\.claude\config.json`

**配置内容**:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_****...****"
      }
    }
  }
}
```

**重要提示**: Token 已安全保存，请妥善保管配置文件。

---

## 🔄 激活 GitHub MCP

**方法 1: 重启 VSCode**
1. 关闭 VSCode
2. 重新打开 VSCode
3. Claude Code 会自动加载新配置

**方法 2: 新建 Claude Code 会话**
```bash
# 退出当前会话（Ctrl+C）
# 启动新会话
claude
```

---

## 🧪 测试 GitHub MCP 功能

### 测试 1: 查看仓库信息

```
请使用 GitHub MCP 查看我的某个 GitHub 仓库的信息
```

**示例**:
```
查看 WebExamples 仓库的最新提交
```

### 测试 2: 查看 Issues

```
列出我的 GitHub 仓库中所有 open 的 issues
```

### 测试 3: 查看 Pull Requests

```
查看我最近创建的 Pull Requests
```

### 测试 4: 搜索代码

```
在我的 GitHub 仓库中搜索包含 "Vue" 的代码
```

### 测试 5: 查看文件内容

```
读取我的 GitHub 仓库中的 README.md 文件
```

---

## 🛠️ GitHub MCP 可用功能

GitHub MCP 提供以下能力：

### 📂 仓库操作
- ✅ 查看仓库信息
- ✅ 列出仓库文件
- ✅ 读取文件内容
- ✅ 搜索代码
- ✅ 查看提交历史

### 🐛 Issue 管理
- ✅ 列出 issues
- ✅ 查看 issue 详情
- ✅ 创建新 issue
- ✅ 更新 issue 状态
- ✅ 添加评论

### 🔀 Pull Request 管理
- ✅ 列出 PRs
- ✅ 查看 PR 详情
- ✅ 审查 PR 代码
- ✅ 添加 PR 评论
- ✅ 合并 PR

### 🔍 搜索功能
- ✅ 搜索仓库
- ✅ 搜索代码
- ✅ 搜索 issues
- ✅ 搜索 users

---

## 📝 实际使用示例

### 示例 1: 自动生成 Issue 报告

```
查看我的 Vue 项目中所有 bug 类型的 issues，并生成一个汇总报告
```

**Claude 会**:
1. 通过 GitHub MCP 获取 issues 列表
2. 筛选 bug 标签的 issues
3. 生成结构化报告

### 示例 2: 代码审查助手

```
查看我最近的 Pull Request，帮我审查代码质量
```

**Claude 会**:
1. 获取最新 PR
2. 读取变更的代码
3. 分析代码质量
4. 提供改进建议

### 示例 3: 仓库文档生成

```
读取我项目的所有 README 文件，帮我生成一个项目文档索引
```

**Claude 会**:
1. 遍历仓库结构
2. 读取所有 README.md
3. 生成文档目录
4. 创建导航索引

---

## 🔒 安全建议

1. **Token 权限最小化**: 只授予必要的权限
2. **定期更新 Token**: 建议每 90 天轮换一次
3. **配置文件保护**: 确保 `~/.claude/config.json` 不被提交到 Git
4. **Token 泄露应对**: 如果 token 泄露，立即在 GitHub 删除并重新生成

---

## ❓ 常见问题

### Q1: GitHub MCP 无法连接？

**解决方案**:
```bash
# 检查 MCP server 是否安装
npm list -g @modelcontextprotocol/server-github

# 检查 token 是否有效
# 访问: https://github.com/settings/tokens
```

### Q2: 权限不足错误？

**原因**: Token 权限不够

**解决方案**:
1. 访问 https://github.com/settings/tokens
2. 编辑您的 token
3. 确保勾选了必要的权限（repo, read:org 等）

### Q3: 如何更新 Token？

**步骤**:
1. 生成新的 GitHub token
2. 编辑 `~/.claude/config.json`
3. 替换 `GITHUB_TOKEN` 的值
4. 重启 Claude Code

---

## 🎯 进阶技巧

### 技巧 1: 结合 Git 工作流

```
1. 查看 GitHub 上的 open issues
2. 创建新分支修复 bug
3. 提交代码并推送
4. 自动创建 Pull Request
```

### 技巧 2: 自动化代码审查

```
每天早上查看我负责的 Pull Requests，
列出需要审查的 PRs 并优先级排序
```

### 技巧 3: 团队协作

```
查看团队成员最近的提交，
生成本周开发进度报告
```

---

## 📊 GitHub MCP vs gh CLI

| 功能 | GitHub MCP | gh CLI |
|------|-----------|--------|
| **集成方式** | 通过 Claude Code 自然语言 | 命令行工具 |
| **学习曲线** | 几乎无（自然语言） | 需要学习命令 |
| **智能分析** | ✅ AI 辅助分析 | ❌ 原始数据输出 |
| **批量操作** | ✅ 自动化处理 | 需要脚本 |
| **代码理解** | ✅ 深度代码分析 | ❌ 仅显示代码 |

**推荐**: GitHub MCP 和 gh CLI 配合使用效果最佳！

---

## 🎓 学习资源

- [GitHub MCP 官方文档](https://github.com/modelcontextprotocol/servers/tree/main/src/github)
- [MCP 协议规范](https://modelcontextprotocol.io)
- [Claude Code 文档](https://docs.anthropic.com/claude/docs/claude-code)

---

## ✅ 配置清单

- [x] Node.js 已安装
- [x] GitHub MCP Server 已安装
- [x] GitHub Personal Access Token 已创建
- [x] Claude Code 配置文件已创建
- [ ] 重启 Claude Code 会话
- [ ] 测试 GitHub MCP 功能

---

**下一步**: 重启 Claude Code，然后输入 `查看我的 GitHub 仓库` 来测试 MCP 是否正常工作！

---

**配置完成时间**: 2026-02-08
**文档版本**: v1.0
**维护者**: Claude Sonnet 4.5
