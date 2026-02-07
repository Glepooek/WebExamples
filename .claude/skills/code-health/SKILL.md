---
name: code-health
description: Analyze code quality, security vulnerabilities, and maintainability issues across any codebase
---

# Code Health Check

A comprehensive code analysis skill that identifies security issues, quality problems, and improvement opportunities in your codebase.

## When to use this skill

Use this skill when you need to:
- Audit code quality before a release
- Identify security vulnerabilities
- Find refactoring opportunities
- Onboard to a new codebase
- Review technical debt

## How it works

If the user provides a specific path (directory or file), focus on that scope. Otherwise, analyze the entire project.

### Analysis priorities

1. **Security issues** (highest priority)
   - Hardcoded credentials, API keys, secrets
   - Unsafe code execution (eval, innerHTML, exec)
   - Injection vulnerabilities (SQL, XSS, command injection)
   - Exposed sensitive data

2. **Code quality**
   - Oversized files (>200 lines) or functions (>50 lines)
   - High cyclomatic complexity
   - Code duplication
   - Unused variables/imports

3. **Best practices**
   - Inconsistent naming conventions
   - Missing error handling
   - Inadequate comments on complex logic
   - Violations of language idioms

4. **Performance concerns**
   - Unnecessary loops or computations
   - Potential memory leaks
   - Inefficient algorithms

## Output format

Structure your analysis as follows:

### Project Overview
- Project type and tech stack
- Code size metrics
- Overall health score (1-10)

### 🔴 Critical Issues (Fix Immediately)

For each issue:
- **Problem**: Clear description
- **Location**: `[filename.ext:line](path/to/file#Lline)` format
- **Risk**: What could go wrong
- **Fix**: Code example showing the correction

Example:
```markdown
**Hardcoded API key**
- **Location**: [config.js:12](src/config.js#L12)
- **Risk**: API key exposure could lead to unauthorized access
- **Fix**:
  ```javascript
  // Before
  const API_KEY = "sk-1234567890abcdef";

  // After
  const API_KEY = process.env.API_KEY;
  ```
```

### ⚠️ Improvement Recommendations (Prioritized)

List issues by priority (High/Medium/Low):
- Problem description
- Impact assessment
- Specific steps to resolve

### ✅ Good Practices

Highlight positive patterns worth maintaining:
- Well-structured code
- Good naming conventions
- Effective error handling
- Clear documentation

### Quick Action Checklist

- [ ] **This week**: Critical security and stability fixes
- [ ] **Next sprint**: Refactoring and quality improvements
- [ ] **Long-term**: Technical debt and optimization

## Tips for effective analysis

1. **Be specific**: Always provide file paths with line numbers
2. **Be actionable**: Include code examples for fixes
3. **Be realistic**: Consider project size and complexity
4. **Be thorough**: Use Grep, Glob, and Read tools systematically
5. **Ask when needed**: For large projects, ask which module to focus on

## Common patterns to check

### Security
```bash
# Search for hardcoded secrets
Grep: (password|secret|key|token)\s*=\s*["'][^"']+["']

# Find unsafe code execution
Grep: eval\(|exec\(|innerHTML\s*=|dangerouslySetInnerHTML
```

### Quality
```bash
# Find large files (likely need refactoring)
Bash: find . -name "*.{js,py,java}" | xargs wc -l | sort -rn | head -20

# Detect console.log in production code
Grep: console\.(log|debug|info)
```

## Notes

- All file references MUST use markdown link format: `[file:line](path#Lline)`
- Provide executable code examples, not pseudocode
- For large projects, proactively ask which areas to prioritize
- Use TodoWrite to track analysis progress
