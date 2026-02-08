---
name: frontend-review
description: Review HTML5, JavaScript, and CSS code against industry best practices and coding standards
---

# Frontend Code Review

A comprehensive code review skill for HTML5, JavaScript, and CSS that checks against industry-standard best practices including Airbnb style guides, W3C standards, and modern web development conventions.

## When to use this skill

Use this skill when you need to:
- Review pull requests for frontend code
- Audit existing HTML/JS/CSS code quality
- Ensure compliance with coding standards
- Identify accessibility, SEO, and performance issues
- Onboard new developers with coding standards
- Prepare code for production deployment

## Supported file types

- **HTML**: `.html`, `.htm`, `.vue` (template section), `.jsx` (JSX markup)
- **JavaScript**: `.js`, `.jsx`, `.ts`, `.tsx`, `.vue` (script section), `.mjs`
- **CSS**: `.css`, `.scss`, `.sass`, `.less`, `.vue` (style section)

## Review standards

This skill checks against the following standards:

### HTML5 Standards
- **W3C HTML5 Specification**
- **WAI-ARIA Accessibility Guidelines**
- **Google HTML/CSS Style Guide**
- **SEO Best Practices**

### JavaScript Standards
- **Airbnb JavaScript Style Guide** (primary reference)
- **ESLint Recommended Rules**
- **MDN JavaScript Best Practices**
- **Modern ES6+ Conventions**

### CSS Standards
- **BEM (Block Element Modifier) Naming**
- **Airbnb CSS / Sass Style Guide**
- **CSS Architecture Best Practices**
- **Performance Optimization Guidelines**

## How it works

If the user provides specific files or directories, focus the review on that scope. Otherwise, analyze all frontend files in the project.

### Review process

1. **Scan codebase** - Identify all HTML, JS, CSS files
2. **Parse and analyze** - Check each file against standards
3. **Categorize issues** - Group by severity and type
4. **Generate report** - Provide actionable feedback with examples

## Output format

### 📋 Review Summary

```markdown
**Files Reviewed**: 15 HTML, 23 JavaScript, 12 CSS
**Total Issues**: 47 (8 critical, 19 warnings, 20 suggestions)
**Standards Compliance**: 78/100
**Accessibility Score**: 6/10
**Performance Score**: 7/10
```

### 🔴 Critical Issues

Issues that must be fixed before deployment:

```markdown
**[HTML] Missing semantic tags**
- **File**: [index.html:45](path/to/index.html#L45)
- **Issue**: Using `<div>` for main content instead of `<main>`
- **Standard**: W3C HTML5 Semantics
- **Fix**:
  ```html
  <!-- ❌ Bad -->
  <div class="main-content">
    <div class="article">...</div>
  </div>

  <!-- ✅ Good -->
  <main>
    <article>...</article>
  </main>
  ```
- **Impact**: Hurts SEO and accessibility
```

### ⚠️ Warnings

Issues that should be addressed:

```markdown
**[JS] Using var instead of const/let**
- **File**: [app.js:23](path/to/app.js#L23)
- **Issue**: `var` is function-scoped, use block-scoped `const` or `let`
- **Standard**: Airbnb JavaScript Style Guide 2.1
- **Fix**:
  ```javascript
  // ❌ Bad
  var count = 0;

  // ✅ Good
  let count = 0;  // or const if not reassigned
  ```
```

### 💡 Suggestions

Nice-to-have improvements:

```markdown
**[CSS] Consider using CSS custom properties**
- **File**: [styles.css:112](path/to/styles.css#L112)
- **Issue**: Hardcoded color values repeated throughout
- **Benefit**: Easier theming and maintenance
- **Example**:
  ```css
  /* ✅ Better */
  :root {
    --primary-color: #007bff;
    --text-color: #333;
  }

  .button {
    background-color: var(--primary-color);
    color: var(--text-color);
  }
  ```
```

### 📊 Issues by Category

| Category | Critical | Warning | Suggestion | Total |
|----------|----------|---------|------------|-------|
| HTML Semantics | 3 | 5 | 2 | 10 |
| Accessibility | 5 | 4 | 1 | 10 |
| JavaScript Style | 0 | 8 | 10 | 18 |
| CSS Architecture | 0 | 2 | 7 | 9 |
| Performance | 0 | 0 | 0 | 0 |

### ✅ What's Done Well

Positive patterns worth maintaining:

```markdown
- ✅ Consistent use of ES6+ features (arrow functions, destructuring)
- ✅ Good use of semantic HTML5 elements in navigation
- ✅ CSS follows BEM naming convention
- ✅ All images have alt attributes
- ✅ Proper error handling with try-catch blocks
```

---

## Detailed Checking Criteria

### HTML5 Checklist

#### Structure & Semantics
- [ ] Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`)
- [ ] Avoid unnecessary `<div>` and `<span>` wrappers
- [ ] Proper document structure (doctype, html, head, body)
- [ ] Correct heading hierarchy (h1 → h6, no skipping levels)
- [ ] Use `<button>` for actions, `<a>` for navigation

#### Accessibility (WCAG 2.1 AA)
- [ ] All images have descriptive `alt` attributes
- [ ] Form inputs have associated `<label>` elements
- [ ] Use ARIA attributes where appropriate (`aria-label`, `aria-describedby`)
- [ ] Sufficient color contrast ratios (4.5:1 for normal text)
- [ ] Keyboard navigation support (proper tabindex)
- [ ] Skip links for screen readers
- [ ] Landmark roles are properly used

#### SEO Best Practices
- [ ] Unique and descriptive `<title>` tag (50-60 characters)
- [ ] Meta description present and compelling (150-160 characters)
- [ ] Proper use of heading tags for content hierarchy
- [ ] Descriptive link text (avoid "click here")
- [ ] Open Graph and Twitter Card meta tags (for social sharing)

#### Forms & Validation
- [ ] Use appropriate input types (`email`, `tel`, `date`, `number`)
- [ ] Include `required`, `pattern`, `min`, `max` attributes
- [ ] Provide clear error messages
- [ ] Use `autocomplete` attribute for better UX

#### Performance
- [ ] Images use `loading="lazy"` for below-the-fold content
- [ ] Use `<link rel="preload">` for critical resources
- [ ] Async/defer attributes on scripts
- [ ] Minimize inline CSS and JavaScript

---

### JavaScript Checklist

#### Code Style (Airbnb)
- [ ] Use `const` by default, `let` only when reassignment is needed
- [ ] Never use `var`
- [ ] Use arrow functions for anonymous functions
- [ ] Proper indentation (2 spaces)
- [ ] Single quotes for strings (configured via Prettier `"singleQuote": true` and ESLint `'quotes': ['error', 'single']`)
- [ ] No semicolons at end of statements (configured via Prettier `"semi": false` and ESLint `'semi': ['error', 'never']`)
- [ ] Consistent spacing around operators and keywords

**Project Configuration Notes**:
- **Quotes**: This project uses **single quotes** following Airbnb/StandardJS conventions. Single quotes are the JavaScript community standard and distinguish JS from JSON.
- **Semicolons**: This project uses **no semicolons** (StandardJS style) with proper ESLint + Prettier configuration to prevent ASI pitfalls. See `references/javascript-standards.md` for detailed rationale.

#### Modern ES6+ Features
- [ ] Use template literals for string interpolation
- [ ] Destructuring for objects and arrays
- [ ] Spread operator instead of `Object.assign()`
- [ ] Default parameters instead of logical OR
- [ ] Arrow functions for callbacks
- [ ] `async/await` instead of Promise chains
- [ ] Use `?.` optional chaining and `??` nullish coalescing

#### Functions & Methods
- [ ] Functions should do one thing (Single Responsibility)
- [ ] Keep functions under 50 lines
- [ ] Use descriptive function names (verbs for actions)
- [ ] Limit function parameters to 3 or fewer
- [ ] Avoid deeply nested callbacks (callback hell)
- [ ] Always return consistent types

#### Variables & Constants
- [ ] Use UPPER_SNAKE_CASE for constants
- [ ] Use camelCase for variables and functions
- [ ] Use PascalCase for classes and constructors
- [ ] Declare variables at the top of their scope
- [ ] One variable declaration per line

#### Error Handling
- [ ] Use try-catch for async operations
- [ ] Always handle promise rejections (.catch() or try-catch with async)
- [ ] Provide meaningful error messages
- [ ] Don't silently swallow errors (empty catch blocks)

#### Performance & Optimization
- [ ] Avoid global variables
- [ ] Debounce/throttle event handlers (scroll, resize, input)
- [ ] Use event delegation for multiple similar elements
- [ ] Avoid memory leaks (remove event listeners, clear timeouts)
- [ ] Minimize DOM manipulation (batch updates)

#### Security
- [ ] Never use `eval()` or `Function()` constructor
- [ ] Sanitize user input before rendering
- [ ] Use `textContent` instead of `innerHTML` when possible
- [ ] Avoid inline event handlers (`onclick`, etc.)
- [ ] No hardcoded credentials or API keys

#### Code Organization
- [ ] Group related code together
- [ ] Extract magic numbers to named constants
- [ ] Avoid long parameter lists (use options object)
- [ ] Use descriptive variable names (no single letters except loop counters)

---

### CSS Checklist

#### Architecture & Organization
- [ ] Follow BEM naming convention: `.block__element--modifier`
- [ ] Group related properties together (box model → typography → visual → misc)
- [ ] Use CSS custom properties (CSS variables) for theme values
- [ ] Avoid deep selector nesting (max 3 levels in Sass)
- [ ] Separate concerns: layout, components, utilities

#### Naming Conventions (BEM)
```css
/* ✅ Good BEM */
.card { }
.card__header { }
.card__title { }
.card--featured { }
.card__button--primary { }

/* ❌ Bad */
.card-header-title { }
.cardFeatured { }
```

#### Selectors & Specificity
- [ ] Avoid ID selectors for styling
- [ ] Minimize use of `!important`
- [ ] Use classes instead of element selectors for styling
- [ ] Avoid overly specific selectors
- [ ] Don't use inline styles

#### Layout & Positioning
- [ ] Use Flexbox or Grid for layouts (not floats)
- [ ] Prefer `margin` for spacing between elements
- [ ] Use relative units (`rem`, `em`, `%`, `vw/vh`) instead of `px`
- [ ] Mobile-first responsive design
- [ ] Use media queries for breakpoints

#### Typography
- [ ] Use `rem` for font sizes (relative to root)
- [ ] Limit number of font families (2-3 max)
- [ ] Maintain consistent line-height (1.4-1.6 for body text)
- [ ] Ensure sufficient contrast (WCAG AA: 4.5:1)

#### Colors & Visual
- [ ] Use CSS variables for color palette
- [ ] Maintain consistent color naming
- [ ] Use `rgba()` or `hsla()` for transparency
- [ ] Avoid excessive use of animations

#### Performance
- [ ] Minimize use of expensive properties (`box-shadow`, `filter`, `transform`)
- [ ] Use `transform` and `opacity` for animations (GPU accelerated)
- [ ] Avoid universal selector (`*`) in key selectors
- [ ] Group and minimize media queries
- [ ] Compress images and use modern formats (WebP, AVIF)

#### Responsive Design
- [ ] Mobile-first approach
- [ ] Use relative units for flexible layouts
- [ ] Test on multiple devices and screen sizes
- [ ] Use `clamp()` for fluid typography
- [ ] Avoid fixed pixel widths

#### Maintainability
- [ ] Consistent indentation (2 spaces)
- [ ] One selector per line in multi-selector rules
- [ ] Add comments for complex or non-obvious code
- [ ] Remove unused CSS
- [ ] Group related rules together

---

## Common Anti-patterns to Flag

### HTML Anti-patterns
```html
<!-- ❌ Don't use divs for everything -->
<div class="button" onclick="submit()">Submit</div>

<!-- ✅ Use semantic elements -->
<button type="submit">Submit</button>

<!-- ❌ Don't skip heading levels -->
<h1>Title</h1>
<h3>Subtitle</h3>  <!-- skipped h2 -->

<!-- ✅ Follow hierarchy -->
<h1>Title</h1>
<h2>Subtitle</h2>

<!-- ❌ Empty alt attributes on important images -->
<img src="product.jpg" alt="">

<!-- ✅ Descriptive alt text -->
<img src="product.jpg" alt="Blue ceramic coffee mug with handle">
```

### JavaScript Anti-patterns
```javascript
// ❌ Don't use var
var count = 0;

// ✅ Use const/let
let count = 0;

// ❌ Don't mutate parameters
function addItem(array, item) {
  array.push(item);  // mutates original array
}

// ✅ Return new values
function addItem(array, item) {
  return [...array, item];
}

// ❌ Don't use == for comparison
if (value == '0') { }

// ✅ Use === for strict equality
if (value === '0') { }

// ❌ Don't ignore async errors
async function fetchData() {
  const data = await api.get();  // no error handling
}

// ✅ Always handle errors
async function fetchData() {
  try {
    const data = await api.get();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
```

### CSS Anti-patterns
```css
/* ❌ Don't use IDs for styling */
#header { }

/* ✅ Use classes */
.header { }

/* ❌ Don't use !important unless absolutely necessary */
.button {
  color: red !important;
}

/* ✅ Increase specificity properly */
.card .button {
  color: red;
}

/* ❌ Don't use inline styles */
<div style="color: red;">

/* ✅ Use classes */
<div class="text-danger">
.text-danger { color: red; }

/* ❌ Don't use magic numbers */
.spacing {
  margin: 17px 23px 19px;
}

/* ✅ Use consistent spacing scale */
:root {
  --spacing-md: 1rem;
}
.spacing {
  margin: var(--spacing-md);
}
```

---

## Tips for conducting the review

1. **Be constructive**: Focus on improvement, not criticism
2. **Prioritize by impact**: Fix critical issues first (accessibility, security)
3. **Provide context**: Explain WHY something is a problem
4. **Show examples**: Always include before/after code snippets
5. **Be consistent**: Apply standards uniformly across all files
6. **Link to resources**: Reference specific sections of style guides
7. **Acknowledge good code**: Highlight positive patterns

## Reference materials

See the `references/` directory for detailed style guides:
- `html-standards.md` - Complete HTML5 best practices
- `javascript-standards.md` - Comprehensive JavaScript style guide
- `css-standards.md` - CSS architecture and naming conventions

## Notes

- All file references MUST use markdown link format: `[file:line](path#Lline)`
- Group similar issues together to avoid repetition
- For large projects, ask user which areas to prioritize
- Adjust strictness based on project context (e.g., legacy vs. new code)
- Consider team conventions that may override general standards
