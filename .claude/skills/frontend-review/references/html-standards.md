# HTML5 Standards and Best Practices

Complete reference for HTML5 code review standards.

## Document Structure

### Required Elements
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Descriptive Page Title</title>
</head>
<body>
  <!-- Content -->
</body>
</html>
```

## Semantic HTML5 Elements

### Page Structure
- `<header>` - Introductory content or navigational aids
- `<nav>` - Navigation links
- `<main>` - Main content (only one per page)
- `<article>` - Self-contained composition
- `<section>` - Thematic grouping of content
- `<aside>` - Tangentially related content
- `<footer>` - Footer for a document or section

### Content Sectioning
- `<h1>` to `<h6>` - Headings (maintain hierarchy)
- `<address>` - Contact information
- `<figure>` and `<figcaption>` - Self-contained content with caption

## Accessibility (WCAG 2.1 Level AA)

### Images
```html
<!-- Informative images -->
<img src="chart.png" alt="Bar chart showing 50% increase in sales">

<!-- Decorative images -->
<img src="decoration.png" alt="" role="presentation">

<!-- Complex images -->
<figure>
  <img src="complex-chart.png" alt="Sales data visualization">
  <figcaption>Detailed description of the sales data...</figcaption>
</figure>
```

### Forms
```html
<form>
  <!-- Always associate labels -->
  <label for="email">Email Address</label>
  <input type="email" id="email" name="email" required aria-describedby="email-help">
  <span id="email-help">We'll never share your email</span>

  <!-- Group related inputs -->
  <fieldset>
    <legend>Shipping Address</legend>
    <label for="street">Street</label>
    <input type="text" id="street" name="street">
  </fieldset>
</form>
```

### ARIA Landmarks
```html
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<main role="main">
<aside role="complementary">
<footer role="contentinfo">
```

## SEO Best Practices

### Meta Tags
```html
<head>
  <!-- Essential meta tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unique Page Title (50-60 chars)</title>
  <meta name="description" content="Compelling description (150-160 chars)">

  <!-- Open Graph for social sharing -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Page description">
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta property="og:url" content="https://example.com/page">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
</head>
```

### Structured Data
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": {
    "@type": "Person",
    "name": "John Doe"
  }
}
</script>
```

## Performance

### Resource Loading
```html
<!-- Preload critical resources -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Lazy load images -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- Async/defer scripts -->
<script src="analytics.js" async></script>
<script src="app.js" defer></script>
```

## Common Mistakes to Avoid

1. ❌ Using `<div>` for clickable elements → ✅ Use `<button>`
2. ❌ Skipping heading levels → ✅ Follow h1→h2→h3 hierarchy
3. ❌ Missing alt attributes → ✅ Always provide alt text
4. ❌ Using tables for layout → ✅ Use CSS Grid/Flexbox
5. ❌ Inline styles → ✅ Use external stylesheets
6. ❌ Empty links (`<a href="#">`) → ✅ Use meaningful href or `<button>`
