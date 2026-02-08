# JavaScript Standards and Best Practices

Complete reference based on Airbnb JavaScript Style Guide and ES6+ best practices.

## Code Style Fundamentals

### Semicolons: The Great Debate

JavaScript has **Automatic Semicolon Insertion (ASI)**, which means semicolons are technically optional. However, there are two main approaches in the community:

#### Option 1: Use Semicolons (Recommended by Airbnb, Google)

```javascript
// ✅ Airbnb Style - Always use semicolons
const name = 'John';
const age = 25;

function greet() {
  return 'Hello';
}
```

**Pros:**
- Prevents ASI edge cases and bugs
- Makes code intentions explicit
- Easier to minify and refactor
- Consistent with other C-style languages

**Common ASI pitfalls avoided:**
```javascript
// ❌ Without semicolons - causes bugs
const a = 1
const b = 2
const c = a + b
[1, 2, 3].forEach(n => console.log(n))
// Interpreted as: const c = a + b[1, 2, 3].forEach(...)

// ❌ Return statement issue
return
{
  value: 1
}
// Returns undefined due to ASI

// ✅ With semicolons - no ambiguity
const a = 1;
const b = 2;
const c = a + b;
[1, 2, 3].forEach(n => console.log(n));
```

#### Option 2: No Semicolons (StandardJS, npm style)

```javascript
// ✅ StandardJS Style - No semicolons
const name = 'John'
const age = 25

function greet() {
  return 'Hello'
}
```

**Pros:**
- Cleaner visual appearance
- Less typing
- Works well with modern linters

**Rules to follow if not using semicolons:**
1. Never start a line with `[`, `(`, `` ` ``, `+`, `-`, `/`
2. Always use a linter (ESLint with appropriate rules)
3. Be aware of ASI rules

### Which Style to Choose?

**For this project, we use the "No Semicolons" style (StandardJS approach)**, configured via:
- **Prettier**: `"semi": false` in `.prettierrc.json`
- **ESLint**: `'semi': ['error', 'never']` in `eslint.config.js`

**Rules to follow when not using semicolons:**
1. Never start a line with `[`, `(`, `` ` ``, `+`, `-`, `/`
2. Always use a linter (ESLint) and formatter (Prettier) to catch issues
3. Be aware of ASI (Automatic Semicolon Insertion) edge cases

**Why this choice works well:**
1. Cleaner, more readable code
2. Modern tooling (ESLint + Prettier) prevents ASI pitfalls automatically
3. Consistent with many modern JavaScript projects (Vue.js, StandardJS)
4. Less visual noise, focus on logic

**Note**: If you prefer semicolons, update both Prettier (`"semi": true`) and ESLint (`'semi': ['error', 'always']`) configurations for consistency.

### Indentation and Spacing

```javascript
// ✅ Good - 2 spaces for indentation (Airbnb standard)
function example() {
  const value = 1;
  if (value > 0) {
    console.log('positive');
  }
}

// ✅ Good - spacing around operators
const sum = a + b;
const isValid = x === y;

// ❌ Bad - inconsistent spacing
const sum=a+b;
const isValid = x===y;

// ✅ Good - spacing in objects and arrays
const obj = { name: 'John', age: 25 };
const arr = [1, 2, 3, 4];

// ❌ Bad - no spacing
const obj = {name:'John',age:25};
const arr = [1,2,3,4];
```

### Quotes

**For this project, we use single quotes** (configured in Prettier and ESLint):
- **Prettier**: `"singleQuote": true` in `.prettierrc.json`
- **ESLint**: `'quotes': ['error', 'single']` in `eslint.config.js`

```javascript
// ✅ Good - single quotes for strings
const name = 'John'
const message = 'Hello, world!'

// ✅ Good - template literals for interpolation
const greeting = `Hello, ${name}!`

// ❌ Bad - double quotes
const name = "John"

// ✅ Exception - use double quotes to avoid escaping single quotes
const message = "It's a beautiful day"
// Or better: use template literals
const message = `It's a beautiful day`
```

**Why single quotes?**
1. **Industry standard**: Airbnb, Google, StandardJS all recommend single quotes
2. **Consistency**: Distinguishes JavaScript from JSON (which requires double quotes)
3. **HTML compatibility**: HTML attributes typically use double quotes
4. **Less typing**: No need to press Shift on English keyboards

## Variables and Constants

### Declarations
```javascript
// ❌ Bad - use of var
var count = 1;

// ✅ Good - use const by default
const MAX_COUNT = 10;

// ✅ Good - use let when reassignment is needed
let currentCount = 0;
currentCount += 1;

// ❌ Bad - multiple declarations
const items = getItems(),
      goSportsTeam = true,
      dragonball = 'z';

// ✅ Good - one declaration per line
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
```

### Naming Conventions
```javascript
// UPPER_SNAKE_CASE for constants
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;

// camelCase for variables and functions
const userName = 'john';
function getUserById(id) { }

// PascalCase for classes and constructors
class UserAccount { }
const user = new UserAccount();

// Descriptive names (avoid abbreviations)
// ❌ Bad
const u = getUser();
const btn = document.querySelector('.btn');

// ✅ Good
const currentUser = getUser();
const submitButton = document.querySelector('.submit-btn');
```

## Functions

### Function Declarations
```javascript
// ❌ Bad - function declaration in blocks
if (condition) {
  function test() { }  // Not guaranteed to work correctly
}

// ✅ Good - function expression
let test;
if (condition) {
  test = () => { };
}

// ✅ Good - arrow functions for anonymous functions
const numbers = [1, 2, 3];
numbers.map((number) => number * 2);

// ✅ Good - traditional function when you need 'this' binding
const calculator = {
  value: 0,
  add(num) {
    this.value += num;
    return this;
  }
};
```

### Parameters
```javascript
// ❌ Bad - too many parameters
function createUser(name, age, email, address, phone, role) { }

// ✅ Good - use options object
function createUser(options) {
  const { name, age, email, address, phone, role } = options;
}

// ✅ Good - default parameters
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

// ❌ Bad - using || for defaults
function greet(name) {
  name = name || 'Guest';  // fails for falsy values like 0, false
}

// ✅ Good - use ?? nullish coalescing
function greet(name) {
  name = name ?? 'Guest';
}
```

## Modern ES6+ Features

### Destructuring
```javascript
// ✅ Array destructuring
const [first, second] = array;
const [, , third] = array;  // skip first two

// ✅ Object destructuring
const { name, age } = user;
const { name: userName, age: userAge } = user;  // rename

// ✅ Destructuring in parameters
function displayUser({ name, email }) {
  console.log(`${name}: ${email}`);
}

// ✅ Rest properties
const { id, ...userDetails } = user;
```

### Template Literals
```javascript
// ❌ Bad - string concatenation
const greeting = 'Hello, ' + name + '!';

// ✅ Good - template literals
const greeting = `Hello, ${name}!`;

// ✅ Good - multiline strings
const html = `
  <div class="card">
    <h2>${title}</h2>
    <p>${content}</p>
  </div>
`;
```

### Arrow Functions
```javascript
// ✅ Simple arrow function
const double = (num) => num * 2;

// ✅ Implicit return with object
const getUser = (id) => ({ id, name: 'John' });

// ✅ Use arrow functions for callbacks
[1, 2, 3].map((num) => num * 2);
setTimeout(() => console.log('Done'), 1000);

// ❌ Don't use arrow functions when you need 'this'
const person = {
  name: 'John',
  sayHi: () => console.log(`Hi, ${this.name}`)  // 'this' is undefined
};

// ✅ Use regular function for methods
const person = {
  name: 'John',
  sayHi() {
    console.log(`Hi, ${this.name}`);
  }
};
```

### Spread Operator
```javascript
// ✅ Array concatenation
const combined = [...array1, ...array2];

// ✅ Array cloning
const copy = [...original];

// ✅ Object merging
const merged = { ...defaults, ...userOptions };

// ❌ Bad - using Object.assign
const merged = Object.assign({}, defaults, userOptions);
```

### Async/Await
```javascript
// ❌ Bad - promise chaining
function fetchUserPosts(userId) {
  return fetchUser(userId)
    .then(user => fetchPosts(user.id))
    .then(posts => processPosts(posts))
    .catch(error => handleError(error));
}

// ✅ Good - async/await
async function fetchUserPosts(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchPosts(user.id);
    return processPosts(posts);
  } catch (error) {
    handleError(error);
  }
}

// ✅ Good - parallel async operations
async function fetchAll() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);
}
```

## Error Handling

```javascript
// ✅ Always use try-catch for async operations
async function loadData() {
  try {
    const data = await fetch('/api/data');
    return data.json();
  } catch (error) {
    console.error('Failed to load data:', error);
    throw new Error('Data loading failed');
  }
}

// ✅ Meaningful error messages
if (!userId) {
  throw new Error('User ID is required');
}

// ❌ Bad - silent failures
try {
  riskyOperation();
} catch (error) {
  // Do nothing
}

// ✅ Good - handle or rethrow
try {
  riskyOperation();
} catch (error) {
  logger.error('Operation failed:', error);
  throw error;  // or handle appropriately
}
```

## Comparison and Equality

```javascript
// ✅ Use === and !== for comparison
if (value === 0) { }
if (type !== 'admin') { }

// ❌ Don't use == and !=
if (value == 0) { }  // type coercion issues

// ✅ Use optional chaining
const userName = user?.profile?.name;

// ❌ Bad - nested checks
const userName = user && user.profile && user.profile.name;

// ✅ Use nullish coalescing
const displayName = userName ?? 'Anonymous';

// ❌ Bad - using ||
const displayName = userName || 'Anonymous';  // fails for empty string
```

## Performance Best Practices

```javascript
// ✅ Debounce expensive operations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const handleSearch = debounce((query) => {
  searchAPI(query);
}, 300);

// ✅ Use event delegation
document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    handleItemClick(e.target);
  }
});

// ❌ Bad - adding listeners to each item
items.forEach(item => {
  item.addEventListener('click', handleItemClick);
});

// ✅ Minimize DOM manipulation
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item.name;
  fragment.appendChild(li);
});
list.appendChild(fragment);  // Single DOM update
```

## Security

```javascript
// ❌ Never use eval
eval('2 + 2');

// ❌ Never use Function constructor
new Function('return 2 + 2')();

// ✅ Sanitize user input
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// ✅ Use textContent instead of innerHTML
element.textContent = userInput;

// ❌ Dangerous - XSS vulnerability
element.innerHTML = userInput;
```

## Code Organization

```javascript
// ✅ Group related code
class UserManager {
  constructor() {
    this.users = [];
  }

  // Group CRUD operations
  addUser(user) { }
  removeUser(id) { }
  updateUser(id, data) { }
  getUser(id) { }

  // Group validation methods
  validateEmail(email) { }
  validatePassword(password) { }
}

// ✅ Extract magic numbers
const CONFIG = {
  MAX_LOGIN_ATTEMPTS: 3,
  SESSION_TIMEOUT: 30 * 60 * 1000,  // 30 minutes
  PAGE_SIZE: 20
};

// ❌ Bad - magic numbers
if (attempts > 3) { }
setTimeout(logout, 1800000);
```
