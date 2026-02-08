# CSS Standards and Best Practices

Complete reference based on BEM methodology and modern CSS best practices.

## BEM Naming Convention

### Block Element Modifier
```css
/* Block: standalone component */
.card { }

/* Element: part of a block */
.card__header { }
.card__title { }
.card__body { }
.card__footer { }

/* Modifier: variation of a block or element */
.card--featured { }
.card--large { }
.card__title--highlighted { }

/* ✅ Good BEM examples */
.button { }
.button--primary { }
.button--large { }
.button__icon { }

.nav { }
.nav__item { }
.nav__link { }
.nav__link--active { }

/* ❌ Bad - not following BEM */
.card-header-title { }  /* Use card__header__title? No, card__title */
.featured-card { }      /* Use card--featured */
.cardLarge { }          /* Use card--large */
```

## CSS Custom Properties (Variables)

```css
/* ✅ Define theme variables at root */
:root {
  /* Colors */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;

  /* Spacing scale */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 3rem;

  /* Typography */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-family-mono: 'Courier New', monospace;
  --font-size-base: 1rem;
  --line-height-base: 1.5;

  /* Breakpoints */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
}

/* ✅ Use variables throughout */
.button {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-primary);
  font-family: var(--font-family-base);
}

/* ✅ Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1a1a1a;
    --color-text: #f0f0f0;
  }
}
```

## Property Ordering

Group properties by type for better readability:

```css
.element {
  /* 1. Positioning */
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;

  /* 2. Box model */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;

  /* 3. Typography */
  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* 4. Visual */
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  opacity: 1;

  /* 5. Animation */
  transition: all 0.3s ease;

  /* 6. Misc */
  cursor: pointer;
}
```

## Modern Layout Techniques

### Flexbox
```css
/* ✅ Flexbox for one-dimensional layouts */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;  /* modern gap property */
}

.container--column {
  flex-direction: column;
}

/* ❌ Don't use floats for layout */
.old-layout {
  float: left;
  width: 33.33%;
}
```

### CSS Grid
```css
/* ✅ Grid for two-dimensional layouts */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.grid--sidebar {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

/* ✅ Named grid areas */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## Responsive Design

### Mobile-First Approach
```css
/* ✅ Mobile-first: start with mobile, add complexity for larger screens */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

@media (min-width: 1200px) {
  .container {
    padding: 3rem;
  }
}

/* ❌ Desktop-first: harder to maintain */
.container {
  padding: 3rem;
}

@media (max-width: 1199px) {
  .container {
    padding: 2rem;
  }
}
```

### Fluid Typography
```css
/* ✅ Use clamp() for fluid typography */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}

/* ✅ Use rem/em for scalability */
.text {
  font-size: 1rem;      /* Scales with root font size */
  line-height: 1.5;     /* Relative to font size */
  margin-bottom: 1em;   /* Relative to element's font size */
}

/* ❌ Avoid fixed pixel sizes */
.text {
  font-size: 16px;
  margin-bottom: 16px;
}
```

## Selectors Best Practices

```css
/* ✅ Use classes for styling */
.button { }
.button--primary { }

/* ❌ Avoid ID selectors */
#button { }  /* Too specific, hard to override */

/* ❌ Avoid deep nesting (max 3 levels) */
.header .nav .list .item .link { }  /* Too specific */

/* ✅ Keep selectors flat */
.nav__link { }

/* ❌ Don't use element selectors for styling */
div { }
p { }

/* ✅ Use classes instead */
.content-box { }
.text-paragraph { }

/* ❌ Avoid universal selector in key positions */
* { margin: 0; }  /* OK for reset */
.container * { }  /* Avoid - performance impact */

/* ❌ Don't use !important unless absolutely necessary */
.button {
  color: red !important;  /* Hard to override */
}

/* ✅ Increase specificity instead */
.card .button {
  color: red;
}
```

## Performance Optimization

### Efficient Animations
```css
/* ✅ Animate only transform and opacity (GPU accelerated) */
.modal {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal--open {
  opacity: 1;
  transform: translateY(0);
}

/* ❌ Avoid animating expensive properties */
.element {
  transition: width 0.3s;  /* Triggers layout */
  transition: height 0.3s; /* Triggers layout */
  transition: top 0.3s;    /* Triggers layout */
}

/* ✅ Use will-change for elements that will animate */
.will-animate {
  will-change: transform;  /* Hint to browser */
}

.will-animate.animating {
  transform: translateX(100px);
}
```

### Minimize Reflows
```css
/* ❌ Properties that trigger reflow */
width, height, margin, padding, border
top, left, right, bottom
font-size, line-height
display, position, float

/* ✅ Properties that only trigger repaint */
color, background-color
visibility, opacity (with transform)
box-shadow, border-radius
```

## Accessibility

```css
/* ✅ Maintain sufficient contrast */
.text {
  color: #333;             /* 12.6:1 ratio on white */
  background-color: white;
}

/* ✅ Focus styles for keyboard navigation */
.button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ❌ Don't remove outlines without replacement */
.button:focus {
  outline: none;  /* Bad for accessibility */
}

/* ✅ Hide elements accessibly */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ❌ Don't use display: none for screen reader content */
.sr-only {
  display: none;  /* Hidden from screen readers too */
}
```

## Code Organization

### File Structure
```
styles/
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── variables.css
├── components/
│   ├── button.css
│   ├── card.css
│   └── modal.css
├── layout/
│   ├── header.css
│   ├── footer.css
│   └── grid.css
└── utilities/
    ├── spacing.css
    └── colors.css
```

### Component Structure
```css
/* Component: Button */

/* 1. Base styles */
.button {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: 4px;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* 2. Elements */
.button__icon {
  margin-right: var(--spacing-xs);
}

/* 3. Modifiers */
.button--primary {
  background-color: var(--color-primary);
  color: white;
}

.button--secondary {
  background-color: var(--color-secondary);
  color: white;
}

.button--large {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 1.125rem;
}

/* 4. States */
.button:hover {
  opacity: 0.9;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Common Anti-patterns

```css
/* ❌ Magic numbers */
.spacing {
  margin: 17px 23px 19px;
}

/* ✅ Use spacing scale */
.spacing {
  margin: var(--spacing-md) var(--spacing-lg);
}

/* ❌ Hardcoded colors */
.button {
  background-color: #007bff;
  color: #ffffff;
}

/* ✅ Use CSS variables */
.button {
  background-color: var(--color-primary);
  color: var(--color-white);
}

/* ❌ Unnecessary specificity */
div.container > ul.list > li.item { }

/* ✅ Use flat selectors */
.list__item { }

/* ❌ Vendor prefixes (use autoprefixer instead) */
.element {
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}

/* ✅ Let build tools handle prefixes */
.element {
  border-radius: 4px;
}
```

## Utility Classes

```css
/* ✅ Single-purpose utilities */
.text-center { text-align: center; }
.text-bold { font-weight: bold; }

.mt-1 { margin-top: var(--spacing-sm); }
.mb-2 { margin-bottom: var(--spacing-md); }
.p-3 { padding: var(--spacing-lg); }

.d-flex { display: flex; }
.d-grid { display: grid; }
.d-none { display: none; }

/* ❌ Don't overuse utilities (prefer components) */
<div class="d-flex justify-between items-center p-4 bg-white rounded shadow">
  <!-- Better as a component -->
</div>
```
