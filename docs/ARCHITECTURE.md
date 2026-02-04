# 🏗️ PunkMarket — Архитектура образовательной платформы
## Версия 2.0 — Реалистичный уязвимый маркетплейс

---

## 📋 Оглавление

1. [Общая концепция](#общая-концепция)
2. [Образовательные цели](#образовательные-цели)
3. [Архитектурная философия](#архитектурная-философия)
4. [Карта компонентов](#карта-компонентов)
5. [Карта уязвимостей](#карта-уязвимостей)
6. [Микросервисы и Backend](#микросервисы-и-backend)
7. [Frontend и X-Ray система](#frontend-и-x-ray-система)
8. [Прогрессия обучения](#прогрессия-обучения)
9. [Roadmap реализации](#roadmap-реализации)

---

## 🎯 Общая концепция

**PunkMarket** — это образовательная платформа в виде реалистичного e-commerce маркетплейса, где **каждая уязвимость внедрена органично**, как если бы она была результатом ошибок разных разработчиков в реальной компании.

### Ключевые принципы:

1. **Реализм превыше всего**
   - Уязвимости разбросаны по разным компонентам
   - Разный стиль кода (как будто писали разные девы)
   - Разные технологии и версии API
   - Разная "возраст" кода (legacy vs modern)

2. **Множественность инстансов**
   - НЕ "один search с 5 вариантами SQLi"
   - А "5-7 РАЗНЫХ мест, где есть SQLi"
   - Каждое место — свой контекст, своя логика

3. **X-Ray как "рентген", НЕ как подсказка**
   - Показывает backend код
   - НЕ показывает явно, что это уязвимость
   - Студент сам должен найти проблему

4. **Прогрессия сложности**
   - От простых reflected XSS до сложных chain attacks
   - От очевидных до скрытых уязвимостей
   - От single-step до multi-step exploits

---

## 🎓 Образовательные цели

### Что должен освоить студент:

#### **Phase I: Fundamentals (PSDP Разделы I-II)**
- ✅ Валидация ввода и каноникализация
- ✅ Контекстное экранирование
- ✅ OWASP Top 10:
  - SQL Injection (5-7 мест)
  - XSS (Reflected, Stored, DOM) (7-10 мест)
  - CSRF (4-5 мест)
  - IDOR (6-8 мест)
  - SSRF (4-6 мест)
  - Path Traversal (5-7 мест)
  - File Upload (4-5 мест)

#### **Phase II: Advanced (PSDP Разделы III-VI)**
- ✅ JWT/OAuth/OIDC уязвимости (4-5 мест)
- ✅ Session management (3-4 атаки)
- ✅ XXE (3-4 места)
- ✅ Deserialization (3-4 места)
- ✅ SSTI (2-3 места)
- ✅ NoSQL Injection (3-4 места)
- ✅ GraphQL vulnerabilities (3-4 места)

#### **Phase III: Expert (PSDP Разделы VII-X)**
- ✅ Business Logic flaws (8-10 сценариев)
- ✅ Race Conditions (3-4 места)
- ✅ Cache Poisoning (2-3 места)
- ✅ Request Smuggling (1-2 места)
- ✅ Prototype Pollution (2-3 места)
- ✅ API Security (OWASP API Top 10)

#### **Phase IV: Advanced Chains**
- ✅ SSRF → RCE chains
- ✅ XSS → Session hijacking → Privilege escalation
- ✅ IDOR + Race Condition → массовая утечка
- ✅ JWT manipulation → Admin access → SQL injection

---

## 🏛️ Архитектурная философия

### Принцип "Реальной компании"

Представим, что PunkMarket — это:
- 🏢 5-летний стартап
- 👥 3 команды разработки
- 📊 Несколько API версий (v1, v2, v3)
- 🔧 Разные технологии (Node.js, Python, Java)
- 🕰️ Legacy код + modern код
- 🌐 Монолит + попытки микросервисов

### Симулированная техническая архитектура:

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js + React)               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Catalog   │  │   Search   │  │  User Auth │            │
│  │  (React)    │  │  (Legacy)  │  │  (Modern)  │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                    API GATEWAY (Node.js)                     │
│         [Rate Limiting] [Auth Middleware] [Logging]          │
└─────────────────────────────────────────────────────────────┘
                             ↓
        ┌────────────┬───────────────┬────────────────┐
        ↓            ↓               ↓                ↓
┌──────────────┐ ┌─────────────┐ ┌──────────────┐ ┌──────────────┐
│   Products   │ │   Orders    │ │    Users     │ │   Reviews    │
│   Service    │ │   Service   │ │   Service    │ │   Service    │
│  (Node.js)   │ │  (Python)   │ │  (Node.js)   │ │  (Java/PHP)  │
│   API v1     │ │   API v2    │ │   API v3     │ │   API v1     │
└──────────────┘ └─────────────┘ └──────────────┘ └──────────────┘
        ↓            ↓               ↓                ↓
┌──────────────┐ ┌─────────────┐ ┌──────────────┐ ┌──────────────┐
│  PostgreSQL  │ │   MongoDB   │ │  PostgreSQL  │ │    MySQL     │
│  (Products)  │ │  (Orders)   │ │   (Users)    │ │  (Reviews)   │
└──────────────┘ └─────────────┘ └──────────────┘ └──────────────┘

     + Redis (Sessions, Cache)
     + S3-like Storage (Images, Files)
     + Message Queue (RabbitMQ/Kafka) для async задач
```

---

## 🗺️ Карта компонентов

### 1. **Frontend** (Next.js/React)

#### Компоненты:
- **Header** (Search, Categories, User Menu)
- **Product Catalog** (Grid, Filters, Pagination)
- **Product Detail Page** (Images, Description, Reviews, Add to Cart)
- **Shopping Cart** (Items, Checkout, Payment)
- **User Profile** (Orders, Settings, Wishlist)
- **Admin Panel** (Product Management, Orders, Users)
- **Reviews & Ratings** (Comments, Stars)
- **Search** (Full-text, Autocomplete, Filters)

#### X-Ray Integration:
- Каждый компонент имеет `data-xray-id`
- X-Ray показывает:
  - Endpoint path
  - HTTP method
  - Backend handler code
  - Database query (pseudo-code)
  - Business logic flow

---

### 2. **Backend Services**

#### A. **Products Service** (Node.js Express, API v1/v2)

**Эндпоинты:**
```
GET  /api/v1/products              - List products
GET  /api/v1/products/:id          - Get product details
POST /api/v1/products/search       - Search products
GET  /api/v1/products/:id/reviews  - Get reviews
POST /api/v1/products/:id/review   - Add review
GET  /api/v2/products/filter       - Advanced filters
POST /api/v2/products/:id/image    - Upload image (admin)
```

**Уязвимости (примеры):**
1. SQLi в `/products/search` (query parameter)
2. XSS Stored в `/products/:id/review` (review text)
3. IDOR в `/products/:id` (можно видеть draft products)
4. Path Traversal в `/products/:id/image` (file download)
5. Race Condition в `/products/:id/stock` (overselling)

---

#### B. **Orders Service** (Python FastAPI, API v2)

**Эндпоинты:**
```
POST /api/v2/orders                - Create order
GET  /api/v2/orders/:id            - Get order details
PUT  /api/v2/orders/:id/cancel     - Cancel order
GET  /api/v2/orders/user/:userId   - User orders
POST /api/v2/orders/:id/refund     - Request refund
```

**Уязвимости:**
1. IDOR в `/orders/:id` (view other's orders)
2. Mass Assignment в `POST /orders` (add discount field)
3. Business Logic в `/orders/:id/refund` (double refund)
4. NoSQL Injection в MongoDB query (user filter)
5. JWT manipulation (weak secret, none algorithm)

---

#### C. **Users Service** (Node.js, API v3)

**Эндпоинты:**
```
POST /api/v3/auth/register         - Register
POST /api/v3/auth/login            - Login
POST /api/v3/auth/logout           - Logout
GET  /api/v3/users/me              - Current user
PUT  /api/v3/users/me              - Update profile
POST /api/v3/users/me/avatar       - Upload avatar
GET  /api/v3/users/:id             - Get user profile
POST /api/v3/auth/forgot-password  - Password reset
```

**Уязвимости:**
1. SQL Injection в `/auth/login` (username field)
2. XSS Stored в `/users/me` (bio field)
3. CSRF в `/users/me` (no CSRF token)
4. IDOR в `/users/:id` (access to private data)
5. File Upload в `/users/me/avatar` (RCE via image parser)
6. SSRF в `/users/me` (profile image URL fetch)

---

#### D. **Reviews Service** (Java/PHP Mix, API v1)

**Эндпоинты:**
```
GET  /api/v1/reviews/:productId    - Get reviews
POST /api/v1/reviews               - Add review
PUT  /api/v1/reviews/:id           - Edit review
DELETE /api/v1/reviews/:id         - Delete review
GET  /api/v1/reviews/user/:userId  - User's reviews
```

**Уязвимости:**
1. XSS Reflected в `GET /reviews?sort=<script>`
2. SQL Injection в `GET /reviews/user/:userId`
3. XXE в `POST /reviews` (accepts XML)
4. Deserialization в session cookie
5. SSTI в email template (review notification)

---

#### E. **Search Service** (Elasticsearch, Node.js wrapper)

**Эндпоинты:**
```
GET  /api/v1/search?q=:query       - Search
GET  /api/v1/search/suggest        - Autocomplete
POST /api/v1/search/advanced       - Advanced search
```

**Уязвимости:**
1. ElasticSearch Injection в `?q=`
2. SSRF в advanced search (external API calls)
3. ReDoS в regex validation
4. Information Disclosure (stack traces in errors)

---

#### F. **Admin Service** (Node.js, API v2)

**Эндпоинты:**
```
GET    /api/v2/admin/users         - List users
DELETE /api/v2/admin/users/:id     - Delete user
GET    /api/v2/admin/orders        - List orders
PUT    /api/v2/admin/orders/:id    - Update order
POST   /api/v2/admin/products      - Create product
GET    /api/v2/admin/logs          - View logs
```

**Уязвимости:**
1. Broken Access Control (no role check)
2. IDOR in `/admin/logs` (view any log file)
3. Path Traversal в `/admin/logs?file=../../../etc/passwd`
4. Command Injection в product import (CSV parsing)
5. Timing Attack в admin login

---

## 🎯 Карта уязвимостей

### Распределение по типам:

#### **1. SQL Injection (7 мест)**

| # | Локация | Сервис | Тип | Сложность |
|---|---------|--------|-----|-----------|
| 1 | `/api/v1/products/search` | Products | Union-based | 🟢 Easy |
| 2 | `/api/v3/auth/login` | Users | Error-based | 🟢 Easy |
| 3 | `/api/v1/reviews/user/:id` | Reviews | Boolean Blind | 🟡 Medium |
| 4 | `/api/v2/orders/user/:userId` (filter param) | Orders | Time-based | 🟡 Medium |
| 5 | `/api/v2/admin/users?sort=` | Admin | Second-order | 🔴 Hard |
| 6 | `/api/v1/products/:id` (raw query в analytics) | Products | Stacked queries | 🔴 Hard |
| 7 | `/api/v3/users/me` (JSON field injection) | Users | JSON SQLi | 🔴 Expert |

---

#### **2. Cross-Site Scripting (10 мест)**

| # | Локация | Тип | Контекст | Сложность |
|---|---------|-----|----------|-----------|
| 1 | `/search?q=` | Reflected | HTML text | 🟢 Easy |
| 2 | `/products/:id/reviews` | Stored | Comment | 🟢 Easy |
| 3 | `/users/:id` (bio field) | Stored | Profile | 🟢 Easy |
| 4 | `/reviews?sort=` | Reflected | HTML attr | 🟡 Medium |
| 5 | Product name в корзине | Stored | JS context | 🟡 Medium |
| 6 | Error message | Reflected | JS string | 🟡 Medium |
| 7 | Category filter | DOM-based | innerHTML | 🟡 Medium |
| 8 | Search autocomplete | DOM-based | React setState | 🔴 Hard |
| 9 | Admin logs viewer | Stored | CSP bypass | 🔴 Hard |
| 10 | GraphQL query error | Reflected | JSON context | 🔴 Expert |

---

#### **3. IDOR (8 мест)**

| # | Локация | Ресурс | Проверка | Сложность |
|---|---------|--------|----------|-----------|
| 1 | `/api/v2/orders/:id` | Order details | Нет | 🟢 Easy |
| 2 | `/api/v3/users/:id` | User profile | Частичная | 🟢 Easy |
| 3 | `/api/v1/reviews/:id` | Review edit | Нет | 🟢 Easy |
| 4 | `/api/v1/products/:id` (draft) | Draft products | Role не проверен | 🟡 Medium |
| 5 | `/api/v2/orders/:id/invoice.pdf` | Invoice file | UUID угадываемый | 🟡 Medium |
| 6 | `/api/v3/users/me/addresses/:id` | Address | Race condition bypass | 🔴 Hard |
| 7 | `/api/v2/admin/logs/:id` | Log files | Path manipulation | 🔴 Hard |
| 8 | GraphQL `{order(id:X)}` | Order via GraphQL | Batching attack | 🔴 Expert |

---

#### **4. CSRF (5 мест)**

| # | Локация | Операция | Защита | Сложность |
|---|---------|----------|--------|-----------|
| 1 | `POST /api/v3/users/me` | Profile update | Нет токена | 🟢 Easy |
| 2 | `POST /api/v1/reviews` | Add review | Нет | 🟢 Easy |
| 3 | `DELETE /api/v2/orders/:id` | Cancel order | Referer check (обход) | 🟡 Medium |
| 4 | `PUT /api/v3/users/me/email` | Change email | SameSite=None | 🔴 Hard |
| 5 | `POST /api/v2/admin/users/:id/role` | Grant admin | JSON request (обход) | 🔴 Expert |

---

#### **5. SSRF (6 мест)**

| # | Локация | Параметр | Фильтр | Сложность |
|---|---------|----------|--------|-----------|
| 1 | `/api/v3/users/me` (avatar URL) | `avatarUrl` | Нет | 🟢 Easy |
| 2 | `/api/v1/products/import` | `url` | HTTP only | 🟡 Medium |
| 3 | `/api/v1/search/advanced` | `webhookUrl` | Localhost blocked | 🟡 Medium |
| 4 | `/api/v2/orders/webhooks` | `callbackUrl` | DNS rebinding | 🔴 Hard |
| 5 | GraphQL `{fetchPrice(url:X)}` | `url` | Чейнинг | 🔴 Hard |
| 6 | PDF generator | HTML с `<img src=>` | SSRF → RCE | 🔴 Expert |

---

#### **6. Authentication/Authorization (7 мест)**

| # | Локация | Проблема | Сложность |
|---|---------|----------|-----------|
| 1 | JWT `alg: none` | Signature bypass | 🟢 Easy |
| 2 | Session fixation | No regeneration | 🟢 Easy |
| 3 | Password reset token | Predictable | 🟡 Medium |
| 4 | OAuth callback | Open redirect | 🟡 Medium |
| 5 | JWT weak secret | Brute-force | 🔴 Hard |
| 6 | Multi-step auth | Race condition | 🔴 Hard |
| 7 | GraphQL introspection | Admin queries exposed | 🔴 Expert |

---

#### **7. Business Logic (10 мест)**

| # | Локация | Сценарий | Сложность |
|---|---------|----------|-----------|
| 1 | Promo code | Reuse infinite | 🟢 Easy |
| 2 | Cart total | Negative price | 🟢 Easy |
| 3 | Product quantity | Buy more than stock | 🟡 Medium |
| 4 | Referral bonus | Self-referral | 🟡 Medium |
| 5 | Order cancellation | Cancel after shipping | 🟡 Medium |
| 6 | Double refund | Race condition | 🔴 Hard |
| 7 | Coupon stacking | Apply multiple | 🔴 Hard |
| 8 | Loyalty points | Integer overflow | 🔴 Hard |
| 9 | Payment rounding | Fractional amounts | 🔴 Expert |
| 10 | Multi-currency | Rate manipulation | 🔴 Expert |

---

#### **8. File Upload (5 мест)**

| # | Локация | Проблема | Сложность |
|---|---------|----------|-----------|
| 1 | Avatar upload | No type check | 🟢 Easy |
| 2 | Product image | Path traversal | 🟡 Medium |
| 3 | CSV import (admin) | Command injection | 🔴 Hard |
| 4 | PDF generation | XXE in XML | 🔴 Hard |
| 5 | Image processing | ImageMagick RCE | 🔴 Expert |

---

#### **9. Advanced (10+ мест)**

- **XXE** (3): XML в reviews, PDF generation, SOAP legacy endpoint
- **Deserialization** (3): Session cookie, Redis cache, Java serialized objects
- **SSTI** (2): Email templates, error pages
- **NoSQL Injection** (4): MongoDB queries в Orders, search filters
- **GraphQL** (4): Introspection, batching, depth limit bypass, alias abuse
- **Prototype Pollution** (2): JSON merge в settings, Object.assign abuse
- **Race Conditions** (4): Stock decrement, double refund, promo code, concurrent updates
- **Cache Poisoning** (2): CDN cache keys, Varnish exploitation
- **Request Smuggling** (1): CL.TE между nginx и backend

---

## 🔬 X-Ray система

### Концепция

X-Ray — это "рентгеновское зрение", которое позволяет студенту видеть **backend код**, но **НЕ говорит прямо о уязвимости**.

### Архитектура X-Ray

#### 1. **Frontend Integration**

Каждый интерактивный элемент имеет:
```tsx
<button data-xray-id="product_add_to_cart">
  Add to Cart
</button>
```

#### 2. **X-Ray Metadata Structure**

```typescript
interface XRayMetadata {
  id: string;
  endpoint: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    version: 'v1' | 'v2' | 'v3';
  };
  service: {
    name: string;
    language: 'nodejs' | 'python' | 'java' | 'php';
    framework: string;
  };
  code: {
    handler: string;      // Псевдокод backend handler
    query: string;        // Database query (если есть)
    validation: string;   // Input validation code
  };
  flow: string;           // Описание бизнес-логики
  author: string;         // Симулированный автор кода
  lastModified: string;   // Дата "последнего изменения"
}
```

#### 3. **X-Ray Panel Display**

```tsx
<XRayPanel>
  <Header>
    <Method>POST</Method>
    <Path>/api/v2/orders</Path>
  </Header>
  
  <CodeBlock language="javascript">
    {metadata.code.handler}
  </CodeBlock>
  
  <Footer>
    <Author>{metadata.author}</Author>
    <Modified>{metadata.lastModified}</Modified>
  </Footer>
</XRayPanel>
```

### Важно: Что X-Ray НЕ показывает

- ❌ Красные флаги "УЯЗВИМОСТЬ ЗДЕСЬ"
- ❌ Советы как эксплуатировать
- ❌ CVE номера
- ❌ Hint'ы о том, что код опасен

### Что X-Ray показывает

- ✅ Реальный псевдокод обработчика
- ✅ SQL-запрос (как он есть)
- ✅ Логику валидации (если есть)
- ✅ Контекст (автор, дата, версия API)

**Студент сам** должен найти проблему при анализе кода.

---

## 📚 Прогрессия обучения

### Уровень 1: Beginner (Easy)

**Цель:** Найти очевидные уязвимости

**Примеры:**
- Reflected XSS в search
- SQL Injection в login
- IDOR в order view
- CSRF без токена

**Подсказки:**
- X-Ray показывает небезопасный код прямо
- Минимальная фильтрация
- Payload работает с первой попытки

---

### Уровень 2: Intermediate (Medium)

**Цель:** Обходить базовые фильтры

**Примеры:**
- Boolean Blind SQLi
- DOM-based XSS
- UUID IDOR (но угадываемый)
- SSRF с localhost block

**Подсказки:**
- Есть фильтрация, но обходимая
- Нужно несколько попыток
- Требуется знание encoding/bypass

---

### Уровень 3: Advanced (Hard)

**Цель:** Chaining и сложные техники

**Примеры:**
- Second-order SQLi
- CSP bypass XSS
- SSRF → RCE chain
- Race condition exploitation
- JWT secret cracking

**Подсказки:**
- Multi-step атаки
- Требуется автоматизация
- Timing matters
- Нужны инструменты (Burp, sqlmap)

---

### Уровень 4: Expert

**Цель:** Исследовательские навыки

**Примеры:**
- Cache poisoning → universal XSS
- Request smuggling
- Prototype pollution → RCE
- GraphQL batching → rate limit bypass → data leak
- Business logic chain → financial impact

**Подсказки:**
- Требуется глубокое понимание
- Нестандартные векторы
- Может потребоваться код-ревью
- Bug chains из 3-4 шагов

---

## 🚀 Roadmap реализации

### Phase 1: Foundation (Weeks 1-4)

**Задачи:**
1. ✅ Настроить Next.js frontend
2. ✅ Создать базовую структуру компонентов
3. ✅ Реализовать X-Ray систему (toggle + panel)
4. ✅ Создать mock данных (products, users, orders)
5. ⏳ Подготовить архитектуру backend (Node.js API)

**Deliverables:**
- Работающий frontend с X-Ray
- Каталог товаров
- Поиск
- Product detail pages
- User authentication (mock)

---

### Phase 2: Easy Vulnerabilities (Weeks 5-8)

**Задачи:**
1. Внедрить 7-10 Easy уязвимостей:
   - 2x Reflected XSS
   - 2x SQL Injection (union-based)
   - 2x IDOR (no auth check)
   - 1x CSRF (no token)
   - 2x Stored XSS

2. Создать X-Ray метадату для каждой
3. Написать writeup'ы и PoC
4. Создать тесты для проверки exploit'ов

**Deliverables:**
- 10 работающих уязвимостей
- X-Ray покрытие 100%
- Документация для каждой
- Unit/Integration тесты

---

### Phase 3: Medium Vulnerabilities (Weeks 9-14)

**Задачи:**
1. Внедрить 15-20 Medium уязвимостей:
   - 3x Blind SQL Injection
   - 3x DOM-based XSS
   - 3x SSRF (с обходами)
   - 2x XXE
   - 2x Deserialization
   - 2x NoSQL Injection
   - 3x Business Logic flaws

2. Добавить обфускацию и фильтры
3. Создать "реалистичные" защиты (которые можно обойти)

**Deliverables:**
- 20 уязвимостей среднего уровня
- Bypass techniques documentation
- AI Coach hints system

---

### Phase 4: Hard & Expert (Weeks 15-20)

**Задачи:**
1. Внедрить сложные уязвимости:
   - 2x Cache Poisoning
   - 1x Request Smuggling
   - 3x Race Conditions
   - 2x JWT attacks
   - 3x GraphQL advanced
   - 2x Prototype Pollution
   - 5x Complex business logic

2. Создать multi-step attack chains
3. Добавить "защиты" (WAF rules, rate limiting)

**Deliverables:**
- 15-20 hard/expert уязвимостей
- Attack chain documentation
- Advanced PoC scripts

---

### Phase 5: Real Backend (Weeks 21-24)

**Задачи:**
1. Реализовать настоящие backend сервисы:
   - Node.js (Products, Users)
   - Python FastAPI (Orders)
   - Java/PHP (Reviews) — опционально

2. Настроить базы данных:
   - PostgreSQL (Products, Users)
   - MongoDB (Orders)
   - Redis (Sessions, Cache)

3. API Gateway с rate limiting
4. Docker Compose для всего стека

**Deliverables:**
- Полноценный backend
- Все уязвимости работают в real environment
- Docker образы
- Deploy инструкции

---

### Phase 6: Content & Challenges (Weeks 25-30)

**Задачи:**
1. Создать guided challenges:
   - Step-by-step tutorials для Easy
   - Hints для Medium
   - Minimal hints для Hard/Expert

2. Интеграция AI Coach:
   - GPT-powered подсказки
   - Контекстная помощь
   - Code review suggestions

3. Progress tracking система:
   - User achievements
   - Vulnerability checklist
   - Leaderboard

**Deliverables:**
- 50+ guided challenges
- AI Coach интеграция
- Gamification система

---

### Phase 7: Platform Integration (Weeks 31-36)

**Задачи:**
1. Интеграция с Punkration Platform
2. Video tutorials для каждой уязвимости
3. Writeup templates
4. Report submission система
5. Automated grading

**Deliverables:**
- Полная интеграция с LMS
- Video content library
- Assessment система

---

## 📊 Метрики успеха

### Для студентов:

- ✅ Найти и exploit 50+ уязвимостей
- ✅ Написать 20+ writeup'ов
- ✅ Создать 10+ PoC scripts
- ✅ Успешно пройти финальный challenge

### Для платформы:

- 🎯 100+ различных уязвимостей
- 🎯 Покрытие всех OWASP Top 10
- 🎯 Покрытие всех OWASP API Top 10
- 🎯 50+ реалистичных бизнес-логических флоу
- 🎯 X-Ray metadata для 200+ элементов
- 🎯 Поддержка 3+ backend языков

---

## 🎨 Дизайн-принципы

### UI/UX:

1. **Реалистичный дизайн**
   - Выглядит как настоящий маркетплейс
   - Профессиональный UI
   - Не выглядит как "учебная платформа"

2. **X-Ray ненавязчивый**
   - Полупрозрачное окно
   - Позиция под курсором
   - Легко копировать код
   - Не закрывает контент

3. **Прогрессивное раскрытие**
   - Начинаем с простого
   - Постепенно добавляем сложность
   - Подсказки доступны, но не навязчивы

---

## 🔐 Безопасность самой платформы

**Важно:** PunkMarket должен быть безопасен для хостинга, несмотря на уязвимости внутри.

### Изоляция:

1. **Песочница** (Docker containers)
2. **Resource limits** (CPU, Memory, Network)
3. **Restricted network** (no outbound internet except whitelisted)
4. **Monitoring** (все exploit'ы логируются)
5. **Auto-reset** (каждые N часов)

### Что НЕ делаем:

- ❌ Реальные CVE с RCE на host
- ❌ Настоящие платежные данные
- ❌ Реальные email-отправки без sandbox
- ❌ Unlimited resource consumption

---

## 📖 Связь с PSDP и Bug Bounty Roadmap

### Соответствие PSDP разделам:

| PSDP Раздел | PunkMarket Coverage |
|-------------|---------------------|
| I. Основы безопасной разработки | ✅ Валидация, экранирование examples во всех уязвимостях |
| II. OWASP Top-10 | ✅ Все 10 типов, 50+ инстансов |
| III. Аутентификация и контроль доступа | ✅ JWT, OAuth, Session, IDOR |
| IV. Современные протоколы и API | ✅ REST, GraphQL, WebSockets |
| V. Advanced Web Exploitation | ✅ XXE, Deserialization, SSTI |
| VI. Client-side Security | ✅ XSS, DOM, Prototype Pollution |
| VII-VIII. DevSecOps, CI/CD | 🎯 Planned (SAST/DAST integration) |
| IX. Threat Modeling | 🎯 Planned (Architecture diagrams with threats) |
| X. API Security | ✅ OWASP API Top 10 coverage |

### Соответствие Bug Bounty Roadmap:

| Week Range | Skills | PunkMarket Coverage |
|------------|--------|---------------------|
| 1-24 (Fundamentals) | HTTP, XSS, SQLi, IDOR, SSRF | ✅ 100% |
| 25-50 (Advanced) | XXE, Deserialization, Smuggling, API | ✅ 80% |
| 51-90 (Expert) | JWT/OAuth, Race, Prototype Pollution, Chains | ✅ 60% |
| 91-120 (Top Hunter) | Cloud, Advanced Chains, 0-days | 🎯 Planned |

---

## 🚩 Система флагов

### CTF-Style Flags

Каждая успешная эксплуатация выдает персонализированный флаг:

```
FLAG{category_vulnerability_level_userId}
```

**Примеры:**
- `FLAG{sqli_search_union_01_user123}` — SQLi в search
- `FLAG{xss_review_stored_01_user123}` — Stored XSS в reviews
- `FLAG{idor_order_view_01_user123}` — IDOR в orders

### Размещение флагов:

1. **В JSON ответах** — прямо в данных
2. **В базе данных** — извлекается через SQLi
3. **На скрытых страницах** — через IDOR/Path Traversal
4. **В HTTP headers** — через SSRF/XXE
5. **В error messages** — через SSTI/XXE
6. **В файлах** — через File Upload
7. **В cookies/JWT** — через Auth bypass

---

## 🎮 Два режима обучения

### Mode 1: "Bug Hunter" 🔍

**Цель:** Найти уязвимости и захватить флаги

**Workflow:**
1. Explore платформу
2. Найти уязвимость через X-Ray
3. Exploit уязвимость
4. Захватить флаг
5. Submit флаг на платформе
6. Получить points

**Без code fixing!**

---

### Mode 2: "AppSec" 🛡️

**Цель:** Найти, exploit И исправить код

**Workflow:**
1. Найти уязвимость
2. Capture флаг
3. **Проанализировать код через X-Ray**
4. **Написать исправленную версию**
5. **Submit fix на review**
6. **Получить bonus flag за правильный fix**

**Дополнительные награды:**
- ✅ +50% points за fix submission
- ✅ +100% points за approved fix
- ✅ Bonus flag (например: `FLAG{sqli_search_fixed_01_user123}`)

---

## 🎯 Next Steps (Immediate)

### Week 1-2:

1. ✅ Финализировать архитектурный документ (этот файл)
2. ✅ Создать детальную карту всех 100+ уязвимостей (VULNERABILITIES_MAP.md)
3. ✅ Разработать систему флагов (FLAG_SYSTEM.md)
4. ⏳ Написать X-Ray metadata для 50 ключевых элементов
5. ⏳ Реализовать первые 10 Easy уязвимостей с флагами

### Week 3-4:

1. Создать backend API (Node.js) для Products Service
2. Подключить PostgreSQL + flags tables
3. Реализовать 5 SQLi уязвимостей с флагами
4. Создать PoC scripts и writeup'ы
5. Implement flag validation system

---

## 📝 Заключение

PunkMarket — это **амбициозная образовательная платформа**, которая симулирует реальный e-commerce с органично внедренными уязвимостями.

**Ключевые преимущества:**

1. ✅ **Реализм** — как настоящая компания со всеми проблемами
2. ✅ **Множественность** — 100+ уязвимостей в разных местах
3. ✅ **Прогрессия** — от Easy до Expert
4. ✅ **X-Ray** — обучающий инструмент, не читерство
5. ✅ **Полное покрытие** — PSDP + OWASP + PortSwigger
6. ✅ **Практика** — hands-on, как в real bug bounty

**Цель:** Подготовить студентов к реальной работе в AppSec и Bug Bounty через **практический опыт** на реалистичной платформе.

---

**Версия:** 2.0  
**Дата:** 2025-11-28  
**Авторы:** Punkration Team  
**Статус:** 🚧 In Development
