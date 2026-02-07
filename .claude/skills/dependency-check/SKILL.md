---
name: dependency-check
description: Check dependency security, outdated versions, and provide update recommendations for any package manager
---

# Dependency Health Check

A universal dependency analysis skill that works with npm, pip, cargo, go mod, maven, and more. Identifies security vulnerabilities, outdated packages, and optimization opportunities.

## When to use this skill

Use this skill when you need to:
- Audit dependencies for security vulnerabilities
- Update packages to latest versions
- Find and remove unused dependencies
- Optimize bundle size
- Check for deprecated packages

## Supported package managers

This skill automatically detects:

| Language | Package Files |
|----------|--------------|
| JavaScript/TypeScript | package.json, package-lock.json, yarn.lock, pnpm-lock.yaml |
| Python | requirements.txt, Pipfile, Pipfile.lock, pyproject.toml |
| Go | go.mod, go.sum |
| Rust | Cargo.toml, Cargo.lock |
| Java | pom.xml, build.gradle |
| Ruby | Gemfile, Gemfile.lock |
| PHP | composer.json, composer.lock |

## How it works

If the user provides a package name, analyze only that specific package. Otherwise, analyze all dependencies.

### Analysis checklist

1. **Security vulnerabilities**: Check for known CVEs
2. **Outdated versions**: Identify available updates (patch/minor/major)
3. **Unused dependencies**: Scan code for actual usage
4. **Deprecated packages**: Find unmaintained or archived packages
5. **Lock file integrity**: Verify consistency

## Output format

### 📊 Dependency Overview

```markdown
**Package Manager**: npm (Node.js)
**Lock File**: ✅ package-lock.json (v3)
**Total Dependencies**: 42 (32 prod + 10 dev)
**Health Score**: 7/10
```

### 🚨 Security Vulnerabilities

List each vulnerable package:

```markdown
**axios@0.21.1** - HIGH severity
- **CVE-2021-3749**: Server-Side Request Forgery
- **Impact**: Attackers could make arbitrary HTTP requests
- **Fix**: `npm install axios@0.21.4`
- **References**: https://nvd.nist.gov/vuln/detail/CVE-2021-3749
```

### 📦 Outdated Dependencies

Use a table format:

| Package | Current | Latest | Type | Priority | Notes |
|---------|---------|--------|------|----------|-------|
| vue | 3.2.47 | 3.4.21 | 🟡 Minor | Medium | Breaking changes in 3.3.x |
| axios | 1.4.0 | 1.6.7 | 🟢 Patch | High | Security fixes |
| eslint | 8.0.0 | 9.0.0 | 🔴 Major | Low | Wait for ecosystem |

**Legend**:
- 🟢 Patch (0.0.x): Safe to update immediately
- 🟡 Minor (0.x.0): Usually compatible, test thoroughly
- 🔴 Major (x.0.0): Breaking changes, review changelog

### ⚠️ Problem Dependencies

#### Unused Dependencies
Packages installed but not imported in code:
- `moment` - Consider removing or switching to `date-fns`
- `lodash` - Only using 2 functions, use `lodash-es` with tree-shaking

#### Deprecated Packages
- `request@2.88.0` - Deprecated since 2020, use `axios` or `node-fetch`
- `babel-preset-es2015` - Use `@babel/preset-env`

#### Duplicate Dependencies
Version conflicts that increase bundle size:
- `uuid`: 8.3.2 (via package-a) and 9.0.0 (via package-b)

### 💡 Update Commands

Provide copy-paste ready commands:

```bash
# Critical security updates (run immediately)
npm update axios@1.6.7 semver@7.5.4

# Compatible updates (test in staging)
npm update vue@3.4.21 vite@5.1.4

# Major version upgrades (review changelog first)
# npm install vue-router@5.0.0  # Breaking changes!

# Clean up unused packages
npm uninstall moment lodash

# Audit and fix automatically
npm audit fix
```

### 📈 Optimization Recommendations

#### Bundle Size (Frontend projects)
- **Current**: 1.2 MB (gzipped: 340 KB)
- **Potential savings**: 200 KB by removing moment.js
- **Tool**: Run `npm run build -- --analyze` to visualize

#### Alternative Packages
| Current | Alternative | Size Savings | Notes |
|---------|------------|--------------|-------|
| moment | date-fns | -67 KB | Modern, tree-shakeable |
| lodash | lodash-es + individual imports | -50 KB | Import only what you need |
| axios | native fetch | -15 KB | Use if targeting modern browsers |

#### Update Strategy
1. **Phase 1** (This week): Security patches
2. **Phase 2** (Next sprint): Minor updates with testing
3. **Phase 3** (Planned): Major version migrations

## Tools to use

### Check for security vulnerabilities
```bash
# npm
npm audit

# yarn
yarn audit

# pnpm
pnpm audit

# Python
pip-audit

# Rust
cargo audit
```

### Check for outdated packages
```bash
# npm
npm outdated

# yarn
yarn outdated

# Python
pip list --outdated

# Go
go list -u -m all

# Rust
cargo outdated
```

### Find unused dependencies
```bash
# JavaScript
npx depcheck

# Python
pip install pip-autoremove && pip-autoremove --list
```

## Best practices

1. **Prioritize security**: Always fix vulnerabilities first
2. **Read changelogs**: For major updates, review CHANGELOG.md and migration guides
3. **Test thoroughly**: Run full test suite after updates
4. **Update incrementally**: Don't update everything at once
5. **Pin versions**: Use exact versions in package.json for critical dependencies
6. **Use lock files**: Always commit lock files to ensure reproducible builds

## Tips for analysis

- Use `npm ls <package>` to see why a dependency is installed
- Check GitHub repos for deprecation notices and alternatives
- For frontend projects, use bundle analyzers to visualize impact
- Consider automated tools like Dependabot or Renovate for ongoing monitoring
- Test major updates in a separate branch first

## Notes

- Security vulnerabilities should be addressed immediately
- Major version updates require careful testing and may need code changes
- Keep track of deprecated packages and plan migrations
- For monorepos, analyze each package separately
