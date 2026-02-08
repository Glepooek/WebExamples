# JavaScript Standards and Best Practices

Complete reference based on Airbnb JavaScript Style Guide and ES6+ best practices.

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
