# Git Worktree 详细指南

## 什么是 Git Worktree

Git Worktree 允许你在同一个 Git 仓库中同时拥有多个工作目录（working directory），每个工作目录可以检出不同的分支。这些工作目录共享同一个 `.git` 目录，但拥有独立的工作空间。

## 核心概念

**主 Worktree（Main Worktree）**
- 就是你执行 `git clone` 或 `git init` 时创建的原始工作目录
- 包含完整的 `.git` 目录

**附加 Worktree（Linked Worktree）**
- 通过 `git worktree add` 创建的额外工作目录
- 包含一个指向主仓库 `.git` 的链接文件
- 共享所有 Git 对象、引用和配置

## 作用和使用场景

### 1. 同时开发多个功能分支
```
项目/
├── main-workspace/          # 主工作区（main 分支）
├── feature-login/           # 登录功能开发
├── feature-dashboard/       # 仪表盘功能开发
└── hotfix-bug-123/         # 紧急修复
```

**场景**：你正在开发一个新功能，突然需要修复生产环境的紧急 bug，不想 stash 或 commit 未完成的工作。

### 2. 代码审查
在不干扰当前工作的情况下，检出 PR 分支进行代码审查。

### 3. 并行构建和测试
- 一个 worktree 运行开发服务器
- 另一个 worktree 运行测试
- 第三个 worktree 构建生产版本

### 4. 比较不同分支
在不同的编辑器窗口中同时打开不同分支的代码进行对比。

## 基本命令

### 查看所有 Worktree

```bash
git worktree list

# 输出示例：
# F:/WebExamples              55f9859 [main]
# F:/WebExamples-feature      a1b2c3d [feature/new-component]
```

### 创建新 Worktree

```bash
# 1. 基于现有分支创建
git worktree add <路径> <已存在的分支名>
# 例如：
git worktree add ../WebExamples-develop develop

# 2. 创建新分支并创建 worktree
git worktree add -b <新分支名> <路径> <基于哪个分支>
# 例如：
git worktree add -b feature/login ../WebExamples-login main

# 3. 简化写法（自动以路径最后部分命名分支）
git worktree add -b feature/login ../WebExamples-login
```

### 删除 Worktree

```bash
# 1. 先删除文件系统中的目录（或让 git 自动删除）
git worktree remove <路径>
# 例如：
git worktree remove ../WebExamples-login

# 2. 或者手动删除目录后清理记录
rm -rf ../WebExamples-login
git worktree prune
```

### 移动 Worktree

```bash
# 移动 worktree 到新位置
git worktree move <原路径> <新路径>
```

### 修复损坏的 Worktree

```bash
# 修复 worktree 的链接
git worktree repair
```

## 实际操作示例

### 场景 1：开发新功能时需要紧急修复 bug

```bash
# 当前在主工作区开发新功能
cd F:/WebExamples
# 工作区有未提交的修改

# 创建 hotfix worktree
git worktree add -b hotfix/urgent-fix ../WebExamples-hotfix main

# 切换到 hotfix worktree
cd ../WebExamples-hotfix

# 修复 bug 并提交
# ... 修改代码 ...
git add .
git commit -m "fix: 修复紧急bug"
git push origin hotfix/urgent-fix

# 回到主工作区继续开发
cd F:/WebExamples
# 你的未完成工作还在，无需 stash
```

### 场景 2：同时维护多个版本

```bash
# 主工作区：开发 v2.0
cd F:/WebExamples  # main 分支

# 创建 v1.x 维护分支的 worktree
git worktree add ../WebExamples-v1 release/v1.x

# 可以在不同的 IDE 窗口中同时编辑两个版本
code F:/WebExamples          # VSCode 窗口 1: v2.0 开发
code ../WebExamples-v1       # VSCode 窗口 2: v1.x 维护
```

### 场景 3：代码审查

```bash
# 有个 PR 需要审查，分支名为 feature/user-profile
git worktree add -b review/user-profile ../WebExamples-review origin/feature/user-profile

cd ../WebExamples-review
# 在这里审查代码，运行测试等

# 审查完成后删除
cd F:/WebExamples
git worktree remove ../WebExamples-review
```

## 目录结构示例

```
项目存放目录/
├── WebExamples/                    # 主 worktree (main 分支)
│   ├── .git/                       # 完整的 Git 仓库
│   ├── CSSExamples/
│   ├── HtmlExamples/
│   └── ...
│
├── WebExamples-feature-login/      # 附加 worktree (feature/login 分支)
│   ├── .git                        # 文件（不是目录），指向主仓库
│   ├── CSSExamples/
│   ├── HtmlExamples/
│   └── ...
│
└── WebExamples-hotfix/             # 附加 worktree (hotfix/bug-123 分支)
    ├── .git                        # 文件（不是目录），指向主仓库
    ├── CSSExamples/
    └── ...
```

## 最佳实践

### 1. 命名规范

```bash
# 推荐的目录命名方式
<项目名>-<分支类型>-<功能名>

# 例如：
WebExamples-feature-vue-router
WebExamples-hotfix-login-error
WebExamples-release-v2.0
```

### 2. 位置选择

```bash
# 推荐：在主项目的父目录创建
cd F:/WebExamples
git worktree add ../WebExamples-feature feature/new-feature

# 避免：在主项目内部创建（会导致嵌套混乱）
# 不推荐：git worktree add ./worktrees/feature
```

### 3. 使用专门的目录

```bash
# 创建专门存放 worktrees 的目录
mkdir F:/worktrees

# 所有 worktree 都放在这里
git worktree add F:/worktrees/WebExamples-feature1 feature/feature1
git worktree add F:/worktrees/WebExamples-feature2 feature/feature2
```

### 4. 及时清理

```bash
# 定期检查 worktree 列表
git worktree list

# 删除不需要的 worktree
git worktree remove <path>

# 如果手动删除了目录，清理记录
git worktree prune
```

## 注意事项

### 1. 分支限制
每个分支只能同时被一个 worktree 检出：

```bash
# 这会失败，因为 main 已经在主 worktree 中
git worktree add ../test main
# fatal: 'main' is already checked out at 'F:/WebExamples'

# 解决方案：检出不同的分支
git worktree add -b test-main ../test main
```

### 2. 共享配置
所有 worktree 共享：
- Git 配置（.git/config）
- 所有分支和标签
- Stash 栈
- Hooks

但不共享：
- 工作区文件
- 暂存区（index）
- HEAD 指向

### 3. 磁盘空间
每个 worktree 都是完整的工作目录副本，会占用相应的磁盘空间。

### 4. IDE 集成
某些 IDE 可能需要单独配置才能正确识别 worktree。

## 常见问题

### Q: Worktree 和 `git clone` 多个副本有什么区别？

**Worktree**：
- 共享 .git 目录
- 所有 worktree 的提交、分支立即同步
- 节省磁盘空间（只存储一份 Git 对象）

**多个 Clone**：
- 每个都有独立的 .git 目录
- 需要 push/pull 同步
- 占用更多磁盘空间

### Q: 如何在 worktree 之间切换？

直接使用 `cd` 命令切换目录即可，不需要 `git checkout`。

### Q: 可以删除主 worktree 吗？

不能。主 worktree 包含 .git 目录，是整个仓库的核心。必须保留主 worktree。

## 与项目相关的使用建议

对于 WebExamples 项目：

```bash
# 主工作区：日常开发
F:/WebExamples (main)

# 创建实验性示例的 worktree
git worktree add ../WebExamples-experiment -b experiment/new-vue-feature

# 创建教程编写的 worktree
git worktree add ../WebExamples-tutorial -b docs/css-tutorial

# 测试不同版本的库
git worktree add ../WebExamples-test -b test/vue-version-upgrade
```

这样你可以：
- 在主工作区继续日常学习和示例添加
- 在实验 worktree 中尝试新想法，不影响主分支
- 在教程 worktree 中专注编写文档
- 在测试 worktree 中验证升级或重构

---

**最后更新**：2026-03-18
