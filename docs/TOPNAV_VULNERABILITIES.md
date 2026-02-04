# 🎯 Карта уязвимостей в TopNav (Верхняя навигация)

## Обзор
Верхняя навигация OmniMarket содержит множество точек входа для различных типов уязвимостей.

---

## 🔴 Уязвимости Red Team

### 1. **Omni fresh** (`data-xray-id="omni_fresh"`)
**Уязвимость:** SQL Injection в поиске по свежим продуктам
```sql
/fresh/search?category=fruits' OR 1=1--
```
**CWE-89**: SQL Injection

---

### 2. **Omni Карта** (`data-xray-id="omni_card"`)
**Уязвимость:** IDOR - доступ к чужим картам через ID
```
/api/cards/{card_id} - без проверки владельца
```
**CWE-639**: Insecure Direct Object Reference

---

### 3. **Билеты, отели** (`data-xray-id="tickets_hotels"`)
**Уязвимость:** XSS через параметр поиска отелей
```javascript
/hotels/search?city=<script>alert(document.cookie)</script>
```
**CWE-79**: Cross-Site Scripting (XSS)

---

### 4. **Для бизнеса** (`data-xray-id="for_business"`)
**Уязвимость:** Mass Assignment - создание админского аккаунта
```json
POST /api/business/register
{
  "email": "attacker@evil.com",
  "role": "admin" // не должно быть доступно
}
```
**CWE-915**: Mass Assignment

---

### 5. **Одежда** (`data-xray-id="category_clothes"`)
**Уязвимость:** NoSQL Injection через фильтры
```javascript
/api/products?category=clothes&price[$gt]=0&price[$lt]=999999
```
**CWE-943**: NoSQL Injection

---

### 6. **Электроника** (`data-xray-id="category_electronics"`)
**Уязвимость:** Price Manipulation через параметры
```
/api/products?category=electronics&discount=100
// Получение 100% скидки
```
**CWE-840**: Business Logic

---

### 7. **Дом и сад** (`data-xray-id="category_home"`)
**Уязвимость:** Path Traversal при загрузке каталогов
```
/api/catalog/download?file=../../../etc/passwd
```
**CWE-22**: Path Traversal

---

### 8. **Товары за 1₽** (`data-xray-id="special_1rub"`)
**Уязвимость:** Race Condition - купить несколько раз по 1₽
```javascript
// Одновременные запросы
Promise.all([
  fetch('/api/cart/add', {body: {product_id: 123, price: 1}}),
  fetch('/api/cart/add', {body: {product_id: 123, price: 1}}),
  fetch('/api/cart/add', {body: {product_id: 123, price: 1}})
])
```
**CWE-362**: Race Condition

---

### 9. **Сертификаты** (`data-xray-id="certificates"`)
**Уязвимость:** Predictable Certificate Codes
```
/api/certificate/validate?code=CERT-0001
// Перебор кодов: CERT-0002, CERT-0003...
```
**CWE-330**: Predictable Values

---

### 10. **Выбор города** (`data-xray-id="city_selector"`)
**Уязвимость:** Stored XSS через название города
```javascript
POST /api/user/city
{
  "city": "<img src=x onerror=alert(1)>"
}
// Сохраняется и отображается всем
```
**CWE-79**: Stored XSS

---

### 11. **Укажите адрес** (`data-xray-id="address_input"`)
**Уязвимость:** SSRF через проверку адреса
```javascript
POST /api/delivery/check
{
  "address": "http://localhost:8080/admin"
}
// Сервер делает запрос к внутренним сервисам
```
**CWE-918**: Server-Side Request Forgery (SSRF)

---

### 12. **Выбор языка** (`data-xray-id="language_selector"`)
**Уязвимость:** IDOR + Session Hijacking
```
GET /api/user/language?lang=ru&user_id=123
// Можно изменить настройки другого пользователя
// И украсть session токен из ответа
```
**CWE-639**: IDOR + **CWE-384**: Session Fixation

---

## 🔵 Сценарии для Blue Team (исправление)

### Исправление для каждой уязвимости:

#### 1. SQL Injection → Prepared Statements
```javascript
// ❌ Уязвимо
db.query(`SELECT * FROM products WHERE category='${req.query.category}'`)

// ✅ Безопасно
db.query('SELECT * FROM products WHERE category=?', [req.query.category])
```

#### 2. IDOR → Проверка владельца
```javascript
// ❌ Уязвимо
app.get('/api/cards/:id', (req, res) => {
  const card = db.findCard(req.params.id)
  res.json(card)
})

// ✅ Безопасно
app.get('/api/cards/:id', authMiddleware, (req, res) => {
  const card = db.findCard(req.params.id)
  if (card.user_id !== req.user.id) {
    return res.status(403).json({error: 'Access denied'})
  }
  res.json(card)
})
```

#### 3. XSS → Экранирование вывода
```javascript
// ❌ Уязвимо
res.send(`<h1>Отели в городе ${req.query.city}</h1>`)

// ✅ Безопасно
const escape = require('escape-html')
res.send(`<h1>Отели в городе ${escape(req.query.city)}</h1>`)
```

#### 4. Mass Assignment → Whitelist полей
```javascript
// ❌ Уязвимо
app.post('/api/business/register', (req, res) => {
  const user = db.createUser(req.body)
  res.json(user)
})

// ✅ Безопасно
app.post('/api/business/register', (req, res) => {
  const allowedFields = ['email', 'name', 'company']
  const userData = {}
  allowedFields.forEach(field => {
    if (req.body[field]) userData[field] = req.body[field]
  })
  userData.role = 'user' // Явно устанавливаем роль
  const user = db.createUser(userData)
  res.json(user)
})
```

#### 5-12. Аналогичные исправления для остальных...

---

## 📊 Статистика уязвимостей в TopNav

| Тип уязвимости | Количество | Сложность |
|---------------|------------|-----------|
| SQL Injection | 2 | 🟢 Easy |
| XSS | 2 | 🟢 Easy |
| IDOR | 3 | 🟡 Medium |
| SSRF | 1 | 🔴 Hard |
| NoSQL Injection | 1 | 🟡 Medium |
| Race Condition | 1 | 🔴 Hard |
| Business Logic | 2 | 🟡 Medium |

**ИТОГО:** 12 уязвимостей только в верхней навигации!

---

## 🎓 Образовательная ценность

Студенты узнают:
- Как атаковать параметры поиска и фильтров
- Как эксплуатировать функции выбора города/языка
- Как находить IDOR в API endpoints
- Как использовать Race Conditions в акциях
- Как делать SSRF через проверку адресов
- Как защищать каждый тип уязвимости

---

## 💡 Рекомендации по внедрению

1. **Начать с Easy уязвимостей** (SQL Injection в поиске)
2. **Постепенно добавлять Medium** (IDOR, NoSQL)
3. **Завершить Hard** (Race Condition, SSRF)
4. **Каждая уязвимость = отдельная миссия** в OmniCorp MMO
5. **X-Ray показывает код**, AI Coach подсказывает

---

Made with ❤️ for OmniCorp Educational Platform
