# GitHub MCP Server for Claude Code - 完整指南

> **文档更新时间**: 2026-02-09
> **文档版本**: v3.0（包含官方 CLI 配置）
> **重要更新**: npm 包已弃用，已更新为官方推荐的 Claude Code CLI 配置方式
> **说明**: 本文档基于官方最新配置方法编写，所有功能已验证可用
> **官方文档来源**: https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-claude.md

---

## 📋 目录

1. [快速开始](#快速开始)
2. [配置说明](#配置说明)
3. [可用工具详细列表](#可用工具详细列表)
4. [使用示例](#使用示例)
5. [限制和注意事项](#限制和注意事项)
6. [常见问题](#常见问题)

---

## 快速开始

### 🚀 5 分钟配置指南

**1. 获取 GitHub Token**
- 访问: https://github.com/settings/tokens
- 点击 "Generate new token (classic)"
- 勾选 `repo` 权限
- 生成并复制 Token

**2. 安全存储 Token**
```bash
# 在项目根目录创建 .env 文件
echo "GITHUB_PAT=ghp_your_token_here" > .env

# 添加到 .gitignore
echo -e ".env\n.mcp.json\n.claude.json" >> .gitignore
```

**3. 配置 GitHub MCP Server**
```bash
# 全局配置（推荐，所有项目可用）
claude mcp add-json github '{"type":"http","url":"https://api.githubcopilot.com/mcp","headers":{"Authorization":"Bearer '"$(grep GITHUB_PAT .env | cut -d '=' -f2)"'"}}' --scope user
```

**4. 验证配置**
```bash
claude mcp list
# 应该看到: github: https://api.githubcopilot.com/mcp (HTTP) - ✓ Connected
```

✅ **配置完成！** 现在可以在 Claude Code 中使用所有 GitHub MCP Server 功能了。

---

## 配置说明

> ⚠️ **重要更新（2025-04）**: npm 包 `@modelcontextprotocol/server-github` 已被官方弃用！
> 请使用下面的 **Claude Code CLI** 官方推荐配置方式。

### 方式一：Claude Code CLI 配置（✅ 官方推荐）

这是官方推荐的最新配置方式，使用远程 HTTP 服务器。

#### 第一步：准备 GitHub Token

1. **创建 Token**: 访问 https://github.com/settings/tokens
2. **Token 类型**: Personal Access Token (Classic)
3. **必需权限**:
   - `repo` - 完整访问私人仓库
   - `read:user` - 读取用户信息
   - `read:org` - 读取组织信息
   - `read:repo_hook` - 读取仓库 webhooks

#### 第二步：安全存储 Token（推荐）

在项目根目录创建 `.env` 文件：

```bash
# .env
GITHUB_PAT=ghp_your_token_here
```

**重要**：将 `.env` 添加到 `.gitignore`：

```bash
echo -e ".env\n.mcp.json\n.claude.json" >> .gitignore
```

#### 第三步：配置 GitHub MCP Server

打开终端（不是在 Claude Code 中），运行以下命令：

**使用环境变量（推荐）**:
```bash
claude mcp add-json github '{"type":"http","url":"https://api.githubcopilot.com/mcp","headers":{"Authorization":"Bearer '"$(grep GITHUB_PAT .env | cut -d '=' -f2)"'"}}'
```

**直接使用 Token**:
```bash
claude mcp add-json github '{"type":"http","url":"https://api.githubcopilot.com/mcp","headers":{"Authorization":"Bearer YOUR_GITHUB_PAT"}}'
```

**配置作用域选择**：

默认情况下，配置存储在**项目级别**（仅当前项目可用）。如需全局配置（所有项目可用），添加 `--scope user` 参数：

```bash
# 全局配置（推荐，所有项目可用）
claude mcp add-json github '{"type":"http","url":"https://api.githubcopilot.com/mcp","headers":{"Authorization":"Bearer '"$(grep GITHUB_PAT .env | cut -d '=' -f2)"'"}}' --scope user
```

#### 第四步：验证配置

```bash
# 查看所有 MCP 配置
claude mcp list

# 查看 GitHub 详细配置
claude mcp get github
```

成功后会显示：
```
github: https://api.githubcopilot.com/mcp (HTTP) - ✓ Connected
Scope: User config (available in all your projects)  # 全局配置
或
Scope: Local config (private to you in this project) # 项目配置
```

#### 配置文件位置

- **全局配置**: `%USERPROFILE%\.claude.json` (Windows) 或 `~/.claude.json` (macOS/Linux)
- **项目配置**: 项目根目录的 `.claude.json` 或全局 `.claude.json` 中的 `projects` 部分

---

### 方式二：VS Code settings.json 配置（⚠️ 已弃用）

> **警告**: 此配置方式使用的 npm 包已在 2025 年 4 月被官方弃用，不建议继续使用。请迁移到上面的 Claude Code CLI 配置方式。

<details>
<summary>点击查看旧配置方式（仅供参考）</summary>

**文件**: `%APPDATA%\Code\User\settings.json`（Windows）

```json
"claude.mcpServers": {
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_TOKEN": "ghp_your_token_here"
    }
  }
}
```

此配置方式已不再维护，建议尽快迁移到官方推荐的 CLI 配置方式。

</details>

---

### 安全建议

1. **使用 .env 文件存储 Token**（避免硬编码）
2. **将敏感文件添加到 .gitignore**:
   ```gitignore
   .env
   .mcp.json
   .claude.json
   ```
3. **定期轮换 Token**（建议 90 天）
4. **Token 泄露处理**:
   - 立即访问 https://github.com/settings/tokens 撤销
   - 生成新 Token 并更新配置
   - 检查代码仓库历史是否有泄露记录

---

## 可用工具详细列表

### 📊 用户和账户

| 工具 | 功能 | 说明 |
|------|------|------|
| `get_me` | 获取当前登录用户信息 | 返回用户名、仓库数、粉丝数等 |

**示例**:
```
请告诉我我的 GitHub 账户信息（仓库数、粉丝等）
```

---

### 📂 仓库操作

| 工具 | 功能 | 限制 |
|------|------|------|
| `get_file_contents` | 读取仓库中的文件或目录内容 | 需要提供 owner、repo、path |
| `list_branches` | 列出仓库的所有分支 | 支持分页 |
| `list_tags` | 列出仓库的所有标签 | 支持分页 |
| `list_releases` | 列出仓库的所有 Release | 支持分页 |
| `get_release_by_tag` | 按 Tag 获取特定 Release | 需要确切的 Tag 名称 |
| `get_latest_release` | 获取最新 Release | 返回最新发布版本 |
| `create_repository` | 创建新仓库 | 可指定私有/公开、自动初始化 |
| `fork_repository` | Fork 仓库 | 可 Fork 到个人账户或组织 |
| `search_repositories` | 搜索仓库 | 支持高级搜索语法（star、language 等） |

**示例**:
```
查看我 WebExamples 仓库中的 README.md 文件内容
```

```
搜索我的仓库中 star 超过 10 的项目
```

---

### 💾 提交和文件版本

| 工具 | 功能 | 限制 |
|------|------|------|
| `list_commits` | 列出分支的提交历史 | 支持按作者筛选、分页最多 100 条 |
| `get_commit` | 获取单个提交的详细信息 | 包含文件diff和统计信息 |
| `get_file_contents` | 获取特定 commit 的文件内容 | 使用 `sha` 参数指定提交 |
| `create_or_update_file` | 创建或更新单个文件 | 需要提供 commit message |
| `push_files` | 批量推送文件到分支 | 一次提交多个文件，效率高 |
| `delete_file` | 删除文件 | 需要提供 commit message |

**示例**:
```
查看 Glepooek/WebExamples 仓库最近 30 次提交
```

```
获取某个特定提交（SHA: abc123）的详细信息，包含改动的文件
```

---

### 🌳 分支管理

| 工具 | 功能 | 说明 |
|------|------|------|
| `create_branch` | 创建新分支 | 可指定从哪个分支创建 |
| `list_branches` | 列出仓库分支 | 分页，每页最多 100 条 |

**示例**:
```
在 WebExamples 仓库中创建一个名为 feature/new-docs 的分支
```

---

### 🐛 Issue 管理

| 工具 | 功能 | 限制 |
|------|------|------|
| `list_issues` | 列出仓库 Issues | 支持按 state、label、date 筛选 |
| `search_issues` | 搜索跨域 Issues | 支持高级搜索语法，按关键词、状态等 |
| `issue_read` | 读取 Issue 详情 | 包括评论、子 Issues、标签等 |
| `issue_write` | 创建/更新 Issue | 支持状态、标签、指配、复制关系 |

**Issue 状态**: `open`、`closed`

**关闭原因**: `completed`、`not_planned`、`duplicate`

**示例**:
```
列出我的 Vue 项目中所有 open 状态的 Issues
```

```
创建一个新的 Issue，标题："修复登录页面响应式问题"，标签：bug、high-priority
```

```
关闭 Issue #123，标记为重复问题（duplicate）
```

---

### 🔀 Pull Request 管理

| 工具 | 功能 | 限制 |
|------|------|------|
| `list_pull_requests` | 列出 PR | 支持按 state、base、head 筛选 |
| `search_pull_requests` | 搜索 PR | 支持高级搜索语法 |
| `pull_request_read` | 读取 PR 详情 | 包括 diff、文件列表、评论、审查等 |
| `update_pull_request` | 更新 PR | 修改标题、描述、审查者、state 等 |
| `merge_pull_request` | 合并 PR | 支持 merge、squash、rebase 三种方式 |
| `create_pull_request` | 创建新 PR | 自动关联 Issues |
| `pull_request_review_write` | 创建/提交/删除审查 | 支持 APPROVE、REQUEST_CHANGES、COMMENT |
| `add_comment_to_pending_review` | 给 pending 审查添加评论 | 支持 line-specific 和 file-level 评论 |
| `update_pull_request_branch` | 更新 PR 分支 | 与 base 分支同步 |
| `request_copilot_review` | 请求 Copilot 审查 | AI 自动审查代码 |

**审查方式**:
- `APPROVE` - 批准
- `REQUEST_CHANGES` - 请求更改
- `COMMENT` - 仅评论

**示例**:
```
查看我最近的 5 个 open Pull Requests
```

```
获取 PR #42 的完整 diff 和修改的文件列表
```

```
创建一个 PR 审查，请求代码审查者进行 review
```

```
请求 Copilot 进行自动代码审查
```

---

### 🔍 搜索和发现

| 工具 | 功能 | 支持的搜索范围 |
|------|------|---|
| `search_code` | 在所有 GitHub 仓库搜索代码 | 跨全 GitHub，支持语言、path、repo 过滤 |
| `search_repositories` | 搜索仓库 | 按名称、描述、语言、star 等 |
| `search_issues` | 搜索 Issues | 跨域搜索或指定仓库 |
| `search_pull_requests` | 搜索 PR | 跨域搜索或指定仓库 |
| `search_users` | 搜索用户 | 按用户名、真实名字、位置等 |

**搜索语法示例**:
```
搜索 Python 项目：
language:python stars:>1000 org:google

搜索特定仓库的 bug issues：
repo:Glepooek/WebExamples label:bug is:open

搜索 Vue 相关代码：
content:Vue language:JavaScript path:src/

搜索某个用户的仓库：
user:Glepooek is:public
```

**示例**:
```
在 GitHub 上搜索我创建的所有公开仓库，并按 star 数排序
```

```
搜索包含 "useState" 的 React 代码，过滤 TypeScript 文件
```

---

### 👥 团队和协作

| 工具 | 功能 | 说明 |
|------|------|------|
| `get_teams` | 获取当前用户所在的团队 | 需要有组织权限 |
| `get_team_members` | 获取团队成员列表 | 按 team_slug 查询 |

**示例**:
```
列出我所在的所有团队
```

---

### 🏷️ Label 管理

| 工具 | 功能 | 说明 |
|------|------|------|
| `get_label` | 获取标签信息 | 按标签名称查询 |

**示例**:
```
获取仓库中 "bug" 标签的详细信息
```

---

## 使用示例

### 示例 1: 统计仓库提交

```
列出我的 WebExamples 仓库过去 30 天的所有提交记录，
并统计总次数和主要贡献者
```

### 示例 2: 生成项目概览

```
读取我的所有公开仓库的 README.md，
生成一个项目列表和技术栈总结
```

### 示例 3: Issue 分类报告

```
列出 Vue 项目中所有 open Issues，
按优先级（标签）进行分类和排序
```

### 示例 4: PR 自动审查

```
查看我最近创建的 3 个 Pull Requests，
请求 Copilot 对每个进行自动代码审查
```

### 示例 5: 批量文件更新

```
在 WebExamples 仓库中，
批量更新所有 README.md 文件，添加"最后更新"时间戳
```

---

## 限制和注意事项

### ⚠️ API 限制

1. **速率限制**: GitHub API 有访问频率限制
   - 认证用户：每小时 5000 次请求
   - 匿名用户：每小时 60 次请求

2. **分页限制**:
   - 最多返回 100 条结果
   - 超过需要多次调用

3. **文件大小限制**:
   - 单个文件上传限制较大
   - 但读取时可能有超时限制

### ❌ 当前不支持的功能

以下功能**无法**通过 MCP Server 实现：

- ❌ 创建/管理 GitHub Actions workflow
- ❌ 管理 Webhooks
- ❌ 创建 GitHub Pages
- ❌ 管理 Branch protection rules
- ❌ 创建/管理 GitHub Projects
- ❌ 访问 GitHub Discussions（某些版本）
- ❌ 管理代码所有权配置（CODEOWNERS）

### 📝 权限要求

每个操作都需要相应的权限：

| 权限 | 需要的范围 |
|------|----------|
| 读取仓库内容 | `repo` 或 `public_repo` |
| 创建/更新文件 | `repo` |
| 管理 Issues | `repo` |
| 管理 PRs | `repo` |
| 删除文件 | `repo` |
| Fork 仓库 | `repo` |
| 创建仓库 | `repo` 或 `public_repo` |

---

## 常见问题

### Q1: 如何从旧的 npm 包配置迁移到新的 CLI 配置？

**A:** 按照以下步骤迁移：

1. **删除旧配置**:
   - 打开 VS Code `settings.json`
   - 删除 `claude.mcpServers` 中的 github 配置

2. **创建 .env 文件**（可选但推荐）:
   ```bash
   echo "GITHUB_PAT=your_token_here" > .env
   echo -e ".env\n.mcp.json\n.claude.json" >> .gitignore
   ```

3. **添加新配置**:
   ```bash
   # 全局配置（推荐）
   claude mcp add-json github '{"type":"http","url":"https://api.githubcopilot.com/mcp","headers":{"Authorization":"Bearer YOUR_TOKEN"}}' --scope user
   ```

4. **验证配置**:
   ```bash
   claude mcp list
   ```

---

### Q2: 全局配置和项目配置有什么区别？应该选择哪个？

**A:**

**全局配置（`--scope user`，推荐）**:
- ✅ 所有项目都可以使用
- ✅ 配置一次，到处可用
- ✅ 存储在 `~/.claude.json`
- 适合：个人开发，多个项目使用同一 GitHub 账号

**项目配置（`--scope local`，默认）**:
- ✅ 仅当前项目可用
- ✅ 可以为不同项目配置不同 Token
- ✅ 存储在全局 `.claude.json` 的 `projects` 部分
- 适合：团队协作，不同项目使用不同账号

**如何切换**:
```bash
# 删除旧配置
claude mcp remove github -s local   # 或 -s user

# 添加新配置
claude mcp add-json github '...' --scope user  # 或 --scope local
```

---

### Q3: 常用的配置管理命令有哪些？

**A:**

```bash
# 查看所有 MCP 配置
claude mcp list

# 查看特定服务器详细信息
claude mcp get github

# 添加配置（项目级别）
claude mcp add-json <name> '<json-config>'

# 添加配置（全局级别）
claude mcp add-json <name> '<json-config>' --scope user

# 删除配置
claude mcp remove github -s local   # 项目级别
claude mcp remove github -s user    # 全局级别

# 测试连接
claude mcp list  # 查看连接状态（✓ Connected 或 ✗ Failed）
```

---

### Q4: 如何验证 Token 是否正确配置？

**A:** 使用以下请求：
```
请告诉我我的 GitHub 账户信息
```

如果能成功返回用户名、仓库数等，说明配置正确。

---

### Q2: 为什么无法读取某个仓库的文件？

**常见原因**:
1. 指定的仓库或文件路径不存在
2. Token 权限不足（私有仓库需要 `repo` 权限）
3. Token 已过期或被撤销

**解决方法**:
- 检查仓库所有者用户名和仓库名
- 检查文件路径是否正确（区分大小写）
- 重新生成 Token 并更新配置

---

### Q3: 搜索结果为空，说明找不到代码？

**A:** 不一定。原因可能包括：
1. GitHub 搜索索引延迟（通常 10 分钟内）
2. 搜索语法有误
3. 代码确实不存在

**解决方法**:
- 等待几分钟后重试
- 简化搜索条件（如只用关键词）
- 直接访问仓库手动查找

---

### Q4: 合并 PR 时 squash 和 rebase 有什么区别？

**A:**
- **merge**: 保留所有提交历史，创建 merge commit
- **squash**: 将所有提交压缩为 1 个，提交历史更清洁
- **rebase**: 重新应用提交到 base 分支上，线性历史

**推荐**:
- 小 PR 使用 squash（简洁）
- 重要功能使用 merge（保留历史）

---

### Q5: 批量操作有时间限制吗？

**A:** 没有硬性时间限制，但需要注意：
1. API 频率限制（5000 次/小时）
2. 网络超时（通常 30 秒）
3. 大量操作可能耗时

**最佳实践**:
- 分批处理（如一次 10 个文件）
- 需要时添加延迟
- 使用 `push_files` 而不是逐个 `create_or_update_file`

---

### Q9: 如何处理已泄露的 Token？

**紧急步骤**:
1. **立即撤销**: 访问 https://github.com/settings/tokens，删除泄露的 Token
2. **生成新 Token**: 创建新的 Personal Access Token
3. **更新 .env 文件**: 修改 `.env` 文件中的 `GITHUB_PAT`
4. **重新配置**:
   ```bash
   # 删除旧配置
   claude mcp remove github -s user  # 或 -s local

   # 添加新配置
   claude mcp add-json github '{"type":"http","url":"https://api.githubcopilot.com/mcp","headers":{"Authorization":"Bearer '"$(grep GITHUB_PAT .env | cut -d '=' -f2)"'"}}' --scope user
   ```
5. **检查代码仓库**: 确保 `.env` 已在 `.gitignore` 中，检查 git 历史是否有泄露记录

---

## 总结

GitHub MCP Server 提供了强大的仓库、Issue、PR 管理能力，通过自然语言交互大大降低了 GitHub 操作的学习门槛。

**核心优势**:
- ✅ 自然语言交互（无需记住复杂命令）
- ✅ AI 辅助分析和决策
- ✅ 批量操作自动化
- ✅ 与开发工作流无缝集成

**最佳使用场景**:
1. 快速查询仓库信息
2. 管理 Issues 和 PRs
3. 自动化代码审查
4. 项目文档管理
5. 数据聚合和报告生成

---

**文档版本**: v3.0（官方 CLI 配置）
**最后更新**: 2026-02-09
**主要更新**:
- ✅ 添加官方推荐的 Claude Code CLI 配置方式
- ✅ 说明 npm 包已弃用
- ✅ 添加配置作用域说明（全局 vs 项目）
- ✅ 添加 .env 安全存储方案
- ✅ 更新配置管理常见问题

**维护者**: Claude Code User
**反馈**: 如发现不准确之处，请立即更正

