
# 🚀 Punkration Vulnerable Marketplace  
### Monolith + X-Ray Mode + AI Coach  
**Project Concept (Spec for AI Agents)**

## 1. Overview  
Punkration Vulnerable Marketplace (PVMS) — это большая обучающая уязвимая платформа, построенная как единый реальный маркетплейс с сотнями уязвимостей, встроенным X-Ray режимом и AI-коучем.

Цель: обучать разработчиков, AppSec-инженеров и багхантеров через реалистичные сценарии, показывая всю backend-логику, поток данных и CWE-паттерны в режиме реального времени.

---

## 2. Key Components

### 2.1. Vulnerable Monolith  
Единое приложение (Node.js + TypeScript + NestJS), содержащее:
- товары, категории, поиск  
- корзина, заказы, оплата (mock)  
- личный кабинет покупателя/продавца  
- админка  
- чат  
- загрузка файлов  
- API (REST + GraphQL)  
- уведомления  
- отчёты (CSV/XML)  

### 2.2. Vulnerabilities  
Платформа содержит сотни реальных уязвимостей:

- SQL Injection (classic / blind / filter bypass)  
- XSS (stored / reflected / DOM)  
- IDOR / Broken Auth  
- CSRF  
- File Upload → RCE  
- Path Traversal  
- SSRF  
- SSTI  
- XXE  
- JWT bypass  
- OAuth misconfig  
- Prototype Pollution  
- Race conditions  
- CSV Injection  
- GraphQL introspection leaks  
- Misconfigurations (CORS, headers, debug, error leaks)  
- Business logic vulnerabilities  

Все уязвимости разложены по CWE-паттернам.

### 2.3. X-Ray Mode  
Уникальный режим, показывающий backend-логику UI-элементов.

При наведении на элемент с `data-xray-id` отображается карточка:

- endpoint (method + path)  
- контроллер / метод  
- DTO / параметры  
- валидация  
- поток данных  
- записи в БД  
- внешние интеграции  
- связанные CWE / типичные уязвимости  
- уровень сложности  
- безопасность (auth, csrf, rate limit)  

X-Ray данные берутся из JSON-манифеста.

### 2.4. AI-Coach  
AI-модуль, который использует X-Ray данные, код контроллеров и CWE-паттерны, чтобы объяснять:

- как работает endpoint  
- где уязвимость  
- как построить payload  
- как эксплуатировать  
- как фиксить  
- исторические инциденты  
- типичные ошибки команды  

---

## 3. Tech Stack

### Backend
- Node.js  
- TypeScript  
- NestJS  
- PostgreSQL / MySQL  
- Prisma / TypeORM (для чистых модулей)  
- raw SQL (для уязвимых частей)  

### Frontend
- Next.js / React  
- UI-kit в светлых тонах (corporate clean UI)  
- Компоненты X-Ray: Overlay, Tooltip, Indicators  

### Container
- Docker / docker-compose  
- Один монолитный image как «Juice Shop 2.0»  

---

## 4. Repo Structure

```
/project-root
  /apps
    /api        -> NestJS backend
    /web        -> Next.js frontend
  /libs
    /xray       -> X-Ray types, schema, metadata parser
    /security   -> utils for safe & unsafe patterns
  /xray-meta
    *.json      -> X-Ray manifests per page/module
  /patterns
    CWE-79/...
    CWE-89/...
  /scripts
    generate_xray.ts
    seed_database.ts
```

---

## 5. X-Ray Manifest Format (Example)

```json
{
  "feedback_form": {
    "title": "Форма обратной связи",
    "endpoint": {
      "method": "POST",
      "path": "/api/feedback",
      "controller": "FeedbackController.submit",
      "cwe": ["CWE-79", "CWE-116"]
    },
    "validation": {
      "name": ["min:1", "max:100"],
      "email": ["format:email"],
      "message": ["max:1000"]
    },
    "flow": [
      "Считываем поля",
      "Записываем в таблицу feedback_messages",
      "Отправляем уведомление"
    ],
    "vulns": [
      {
        "pattern": "reflected-xss",
        "status": "vulnerable",
        "description": "Нет output escaping",
        "difficulty": 1
      }
    ]
  }
}
```

---

## 6. AI-Coach Context

AI получает:

- X-Ray metadata  
- код контроллера  
- DTO / SQL-запрос  
- CWE-паттерны  
- действие студента (payload)  
- уровень студента  

AI формирует:

1. архитектурное объяснение  
2. что происходит в endpoint  
3. где уязвимость  
4. как эксплуатировать  
5. как фиксировать  
6. как распознать паттерн в дикой природе  

---

## 7. UI Design Guidelines

- светлый минималистичный корпоративный интерфейс  
- мягкие тени, скругление 8–12px  
- цвета:
  - белый / серый  
  - акценты Punkration (#6C63FF, #4FD3C4, #FF8B3D)  
- X-Ray подсветка: неоновый голубой / бирюза  
- чистая структура как у Ozon/Apple Store  

---

## 8. Business Model

Платформа продаётся как:

### B2C
- подписка для разработчиков/багхантеров  
- AI-коуч + X-Ray + все модули  

### B2B
- on-prem контейнер  
- админ-кабинет  
- отчёты  
- контроль прогресса команд  

### Enterprise
- кастомные уязвимости  
- интеграции  
- white-label  
- SLA  
- отдельный AI-модуль  

---

## 9. Constraints

- уязвимости должны быть реалистичными  
- AI не решает за студента, а обучает  
- X-Ray только в training-режиме  
- приложение должно запускаться в контейнере без внешних зависимостей  

---

## 10. Goal Summary

Цель — создать:
- реалистическую уязвимую платформу,
- встроенный X-Ray как DevTools для безопасности,
- AI-коуча,
- систему паттернов CWE,
- продукт мирового уровня,
- основу для обучения разработчиков, AppSec и багхантеров.
