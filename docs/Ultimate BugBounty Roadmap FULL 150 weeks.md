# Ultimate Bug Bounty Roadmap — Полная версия (150 недель)

**Версия:** Ultimate FULL Edition  
**Период:** 150 недель (~3 года)  
**Формат:** Детальный план с чекбоксами, приоритетами и конкретными задачами  
**Цель:** Стать топ-1% Bug Hunter с систематическим подходом

---

## 📋 Оглавление

- [Phase I — Fundamentals (Weeks 1–24)](#phase-i--fundamentals-weeks-124)
- [Phase II — Advanced (Weeks 25–50)](#phase-ii--advanced-weeks-2550)
- [Phase III — Expert (Weeks 51–90)](#phase-iii--expert-weeks-5190)
- [Phase IV — Top Hunter (Weeks 91–120)](#phase-iv--top-hunter-weeks-91120)
- [Phase V — Researcher & Innovator (Weeks 121–150)](#phase-v--researcher--innovator-weeks-121150)

---

## Легенда приоритетов
- [ ] 🔴 **Критично** — нельзя пропускать  
- [ ] 🟡 **Важно** — можно перенести, но нужно закрыть  
- [ ] 🟢 **Опционально** — бонус, если хватает времени  

---

# Phase I — Fundamentals (Weeks 1–24)

*Фаза I — Fundamentals.*
Цель: получить прочную базу HTTP и ключевых веб-векторов атак, отработать инструменты, автоматизации и начать регулярные mini-hunts с reproducible PoC.

---

> Формат недели (каждая неделя): Core WebSec / DAST Hands‑On (Labs) / English / Dev / Research / Personal Project.

---

## Week 1 — Основы HTTP и среды

### Core WebSec
- [ ] 🔴 Traversy Media — HTTP Crash Course & Exploration (38 min)
- [ ] 🔴 CS50/freeCodeCamp: How the Web Works / Internet Course (бонус)
- [ ] 🔴 MDN: [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [ ] 🔴 MDN: [HTTP messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
- [ ] 🔴 Book: HTTP: The Definitive Guide — Ch.1
- [ ] 🟡 Book: HPBN (Grigorik) — Networking 101 (start)
- [ ] 🔴 PentesterLab Pro: HTTP basics labs
- [ ] 🔴 Понять HTTP, запросы/ответы, заголовки, структура URL, базовая конфигурация среды

### DAST Hands‑On (Labs)
- [ ] 🔴 `curl -v https://example.com` → разметь части запроса/ответа
- [ ] 🔴 `python3 -m http.server 8080` + `curl -v http://127.0.0.1:8080`
- [ ] 🟡 Сохрани HAR в браузере, отметь DNS/TCP/HTTP
- [ ] 🔴 Установить curl, Python3, Burp, Firefox+FoxyProxy
- [ ] 🔴 Локальный server `python -m http.server`
- [ ] 🔴 `curl -v`, сохранить HAR, анализ запросов

### English
- [ ] 🔴 YouTube playlist lessons 690–694 (2/day)
- [ ] 🔴 30–45 мин: прослушать/прочитать вводную статью про HTTP (делать пометки)

### Dev (Codecademy)
- [ ] 🔴 Building Interactive Websites (начало)
- [ ] 🔴 Инициализировать репозиторий `roadmap-notes`, создать шаблон `writeup.md`
- [ ] 🟡 Создать CSV/Notion‑дашборд с колонками: week, task, status, PoC, bounty

### Research
- [ ] 🔴 PortSwigger Research: James Kettle — HTTP Desync Attacks (конспект 1 стр.)
- [ ] 🟡 Прочитать короткий конспект James Kettle — HTTP desync (вводное чтение)

### Personal Project / Mini‑hunt
- [ ] 🟡 Mini‑hunt: 2 часа — поверхностный реког выбранной публичной программы: собрать список доменов/поддоменов/сайтов и сохранить в `assets.csv`

**Deliverable:** HAR + 3 curl-примера с объяснениями.

---

## Week 2 — HTTP методы, коды статусов, базовые заголовки

### Core WebSec
- [ ] 🔴 MDN: [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [ ] 🔴 MDN: [Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [ ] 🔴 Book: HTTP: The Definitive Guide — Ch.2–3
- [ ] 🟡 PentesterLab Pro: HTTP labs (кодировки, каноникализация)
- [ ] 🟡 HPBN: TCP/TLS основы (30 мин/день)
- [ ] 🟡 Разобраться с Host, Content-Type, Cookie, Set-Cookie, Location

### DAST Hands‑On (Labs)
- [ ] 🔴 Подними эндпоинты GET/POST/PUT/DELETE, сделай 4 `curl -X ...`
- [ ] 🔴 В nginx: `location /teapot { return 418; }`
- [ ] 🟡 `curl -I -H "Cache-Control: no-store" http://127.0.0.1:8080`
- [ ] 🔴 Практика: `curl -X POST -d "a=1" http://127.0.0.1:8080` — смотреть различия
- [ ] 🟡 Сохранить HAR из DevTools и проанализировать последовательность запросов

### English
- [ ] 🔴 YouTube playlist lessons 695–699 (2/day)
- [ ] 🔴 30–45 мин: чтение технической заметки про заголовки

### Dev (Codecademy)
- [ ] 🔴 Building Interactive Websites (продолжение)
- [ ] 🔴 Написать `recon.sh` (subfinder + httpx + waybackurls) и прогнать на тестовом домене
- [ ] 🟡 Proxy integration with Firefox/Chrome, first intercept/modify/repeat

### Research
- [ ] 🟡 Короткая заметка по Cache‑Control и ETag
- [ ] 🟢 Note: HTTP Methods & Status Codes

### Personal Project
- [ ] 🔴 Mini‑hunt: 2–3 часа — собрать sitemap/endpoint list для выбранной программы и загрузить в репо

---

## Week 3 — Заголовки, CORS, reflected XSS

### Core WebSec
- [ ] 🔴 MDN: [HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) (Content-Type, Accept, Host, X-Forwarded-For, Cookie, Set-Cookie)
- [ ] 🔴 MDN: [CORS overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [ ] 🔴 Book: HTTP: The Definitive Guide — Ch.4
- [ ] 🟡 PortSwigger Academy: Reflected XSS labs
- [ ] 🟡 PentesterLab Pro: XSS badge (начало)
- [ ] 🟡 HPBN: HTTP/2 overview
- [ ] 🔴 MDN: CORS (Access‑Control headers) — как работает, common pitfalls
- [ ] 🟡 Понять Origin vs Referer

### DAST Hands‑On (Labs)
- [ ] 🔴 `curl -H "User-Agent: EvilBot" http://127.0.0.1:8080` → смотри в логах
- [ ] 🔴 `curl -H "Origin: https://evil.com" -I https://httpbin.org/get`
- [ ] 🟡 `curl -H "X-Forwarded-For: 127.0.0.1" http://127.0.0.1:8080`
- [ ] 🔴 PortSwigger Academy: Reflected XSS — пройти 3 базовых лаба
- [ ] 🔴 Практика: инжект простого payload в параметр и воспроизвести PoC в Burp Repeater

### English
- [ ] 🔴 YouTube playlist lessons 700–704 (2/day)
- [ ] 🔴 30–45 мин: прочитать 1 writeup по Reflected XSS

### Dev (Codecademy)
- [ ] 🔴 Building Interactive Websites (финал)
- [ ] 🔴 Codecademy/локально: простая страница с формой для тестов XSS

### Research
- [ ] 🔴 Doyensec: client-side security writeups (overview)
- [ ] 🟡 Собрать `payloads/xss.txt` — 20 рефлективных payloads
- [ ] 🟢 Note: Key HTTP headers for hacking

### Personal Project
- [ ] 🔴 Mini‑hunt: 3–4 часа — найти отражённые XSS и подготовить reproducible PoC (curl + screenshot) и записать первичный writeup

---

## Week 4 — Кэширование, HTTP/2, Burp базовые техники

### Core WebSec
- [ ] 🔴 MDN: [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) (Cache-Control, Vary, ETag, Expires)
- [ ] 🔴 Book: HTTP: The Definitive Guide — Ch.5–6
- [ ] 🟡 HPBN: HTTP/2 multiplexing & prioritization
- [ ] 🟡 PortSwigger: Burp basics (Repeater, Proxy, Intruder)
- [ ] 🔴 Изучить HTTP Caching (Cache‑Control, Expires, ETag, Vary)
- [ ] 🟡 Введение в HTTP/2: multiplexing и потенциальные эффекты на сканирование

### DAST Hands‑On (Labs)
- [ ] 🔴 nginx: `add_header Cache-Control "public, max-age=60"; add_header Vary "User-Agent";`
- [ ] 🔴 `curl -H "Accept-Encoding: gzip" -I https://example.com`
- [ ] 🟡 `curl -I --http2 https://example.com`
- [ ] 🔴 Настроить Burp (Proxy, Repeater, Intruder) и установить Logger++/Autorize
- [ ] 🟡 Тестировать поведение cache‑заголовков в локальном стэнде

### English
- [ ] 🔴 YouTube playlist lessons 705–709 (2/day)
- [ ] 🔴 30–45 мин: просмотр материала про HTTP/2 и заметки

### Dev (Codecademy)
- [ ] 🔴 JS Syntax 3 — Loops & Iterators (закрыть)
- [ ] 🔴 Доработать `recon.sh`: логирование, user‑agent rotation, простая фильтрация

### Research
- [ ] 🔴 PortSwigger Research: HTTP/2 basics
- [ ] 🟡 Прочитать обзор PortSwigger по HTTP/2 и request smuggling (вводно)

### Personal Project
- [ ] 🟡 Публиковать заметки/чеклисты каждую фазу
- [ ] 🔴 Mini‑hunt: 4 часа — найти кэшируемые эндпоинты и оценить риск cache poisoning на тестовом острове
- [ ] 🟢 Post: «Что я понял про HTTP за 4 недели»

---

## Week 5 — XSS Stored + DOM, payload bypass

### Core WebSec
- [ ] 🔴 PortSwigger Academy: XSS Stored + DOM (6–8 labs)
- [ ] 🔴 PentesterLab Pro: XSS badge continuation
- [ ] 🔴 Book: *HTTP: The Definitive Guide* — Ch.5 (Request Headers)
- [ ] 🔴 FFUF: directory brute-force on test target
- [ ] 🔴 Note: XSS payloads & filters collection
- [ ] 🔴 PortSwigger Academy: Stored XSS & DOM XSS (3–5 лабов)
- [ ] 🟡 Понять фильтры и контексты (HTML, JS, attributes)

### DAST Hands‑On (Labs)
- [ ] 🔴 Практика: попробовать payloads из `payloads/xss.txt` в разных контекстах
- [ ] 🔴 Создать тестовый страничный пример (Flask/Express) и пробовать bypass фильтров
- [ ] 🟡 Passive scan rules exploration

### English
- [ ] 🔴 Lessons 710–714
- [ ] 🔴 30–45 мин: прочитать 1 writeup о DOM XSS и сделать краткий конспект

### Dev (Codecademy)
- [ ] 🔴 React Basics — Components & Props
- [ ] 🔴 Codecademy: JS — events/handlers (практика с DOM)
- [ ] 🟡 Автоматизировать простую отправку форм с curl

### Research
- [ ] 🔴 PortSwigger Research: desync browser attacks
- [ ] 🟡 Собрать список common sanitizers и их обходов

### Personal Project
- [ ] 🔴 Mini‑hunt: 4–6 часов — целенаправленный поиск Stored/DOM XSS; если найдено — подготовить reproducible PoC (curl + screenshot) и написать первичный writeup

---

## Week 6 — SQL Injection (basic) и Burp Intruder

### Core WebSec
- [ ] 🔴 PortSwigger Academy: SQL Injection (Error/Union/Blind, 6–8 labs)
- [ ] 🔴 PentesterLab Pro: SQLi labs
- [ ] 🔴 Book: *HTTP: The Definitive Guide* — Ch.6 (Response Headers)
- [ ] 🔴 Burp Intruder: payloads & encodings
- [ ] 🔴 Practice: sqlmap on DVWA
- [ ] 🔴 PortSwigger Academy: SQLi basics (Error/Union/Blind) — пройти 4–6 лабов
- [ ] 🟡 Понять encoding/escaping и фильтры

### DAST Hands‑On (Labs)
- [ ] 🔴 Практика: sqlmap на DVWA/Juice Shop (локально) — отладить флаги
- [ ] 🔴 Burp Intruder: простые payload lists и анализ ответов по длине/коду
- [ ] 🟡 Active scan basic config

### English
- [ ] 🔴 Lessons 715–719
- [ ] 🔴 30–45 мин: прочитать опубликованный SQLi writeup и сделать конспект

### Dev (Codecademy)
- [ ] 🔴 React — State & Events
- [ ] 🔴 Написать `sqli-check.py` — wrapper для curl + элементарной детекции

### Research
- [ ] 🔴 Assetnote Research: цепочка API vulns
- [ ] 🟡 Assetnote/PortSwigger статьи по blind/time SQLi — выписать техники

### Personal Project
- [ ] 🔴 Mini‑hunt: 6 часов — целенаправленная проверка параметров на SQLi; при успехе оформить writeup
- [ ] 🟢 Опубликовать статью: разбор SQLi

---

## Week 7 — Access control & IDOR

### Core WebSec
- [ ] 🔴 PortSwigger Academy: Access Control / IDOR (6–8 labs)
- [ ] 🔴 PentesterLab Pro: Auth/Authorization tracks
- [ ] 🔴 Book: *HTTP: The Definitive Guide* — Ch.7 (Status Codes deep dive)
- [ ] 🔴 Automation: nuclei basic profile (low FP)
- [ ] 🔴 PortSwigger Academy: Access Control / IDOR (labs 3–5)
- [ ] 🟡 Понять модели горизонтальной/вертикальной эскалации

### DAST Hands‑On (Labs)
- [ ] 🔴 Практика: изменять ID/UUID в запросах, пробовать elevation
- [ ] 🔴 Написать `id-enum.sh` (parallel, rate control)

### English
- [ ] 🔴 Lessons 720–724
- [ ] 🔴 30–45 мин: прочитать 1–2 writeups по IDOR

### Dev (Codecademy)
- [ ] 🔴 React — Forms & Controlled Inputs
- [ ] 🔴 Добавить `id-enum.sh` в репо и прогнать на asset list

### Research
- [ ] 🔴 Doyensec OAuth cheatsheet
- [ ] 🟡 Составить checklist по проверкам authorization (roles, scopes, owner checks)

### Personal Project
- [ ] 🔴 Mini‑hunt: 6–8 часов — искать IDOR; при нахождении — PoC + writeup
- [ ] 🟢 Add 'Resources' section (tools list)

---

## Week 8 — SSRF basics & local pivoting

### Core WebSec
- [ ] 🔴 PortSwigger Academy: SSRF basics
- [ ] 🔴 PentesterLab Pro: SSRF labs
- [ ] 🔴 Book: *HTTP: The Definitive Guide* — Ch.8 (Proxies, Gateways, Tunnels)
- [ ] 🔴 Recon: subfinder + httpx
- [ ] 🔴 Note: SSRF payloads cheatsheet
- [ ] 🔴 PortSwigger Academy: SSRF basics (3–4 лаба)
- [ ] 🟡 Понять разницу server‑side vs client‑side SSRF и OOB detection

### DAST Hands‑On (Labs)
- [ ] 🔴 Практика: Burp Collaborator / interactsh для OOB callbacks
- [ ] 🔴 Настроить локальный interactsh или ngrok для тестов
- [ ] 🟡 Explore authentication handling

### English
- [ ] 🔴 Lessons 725–729
- [ ] 🔴 30–45 мин: прочитать SSRF writeup и выписать варианты pivot

### Dev (Codecademy)
- [ ] 🔴 React — Project: Interactive UI
- [ ] 🔴 Написать `ssrf-checker.py` (пробует URL параметры и callback detection)
- [ ] 🟡 Dockerize mock internal service для pivot practice

### Research
- [ ] 🔴 Assetnote SSRF in cloud — записать полезные шаги
- [ ] 🟢 Написать заметку про SSRF

### Personal Project
- [ ] 🔴 Mini‑hunt: 8 часов — поиск SSRF‑векторов; при OOB — аккуратно зафиксировать PoC

---

## Week 9 — File upload, path traversal

### Core WebSec
- [ ] 🔴 Bash #1: vars, conditions, loops (2 utils)
- [ ] 🔴 Checklist: basic hardening
- [ ] 🔴 Book: *HTTP: The Definitive Guide* — Ch.9 (Caching)
- [ ] 🔴 PortSwigger labs: File Upload & Path Traversal
- [ ] 🟡 Понять фильтрацию расширений и проверку MIME type

### DAST Hands‑On (Labs)
- [ ] 🔴 Практика: bypass mime checks, double extension, null byte, content sniffing
- [ ] 🔴 Path traversal: попробовать `../`, `%2e%2e%2f`, null byte variants
- [ ] 🟡 Explore Spider & Ajax Spider

### English
- [ ] 🔴 Lessons 730–734
- [ ] 🔴 30–45 мин: изучить writeups по upload→RCE кейсам

### Dev (Codecademy)
- [ ] 🔴 Node.js Basics — Intro & Modules
- [ ] 🔴 Добавить `upload-fuzz.sh` в репо (payload list + response heuristics)

### Research
- [ ] 🔴 Assetnote: research on deserialization bugs
- [ ] 🟡 Doyensec/PortSwigger upload research — собрать обходы

### Personal Project
- [ ] 🔴 Mini‑hunt: 8–10 часов — target upload endpoints testing; safe PoC capture
- [ ] 🟢 Add section 'My Lab Setup'

---

## Week 10 — Advanced crawling & Ajax spiders

### Core WebSec
- [ ] 🔴 Bash #2: functions, arrays → runner subfinder→httpx
- [ ] 🔴 PentesterLab Pro: File Upload & Path Traversal
- [ ] 🔴 Book: *HTTP: The Definitive Guide* — Ch.10 (Persistent Connections)
- [ ] 🔴 Понять difference: normal spider vs Ajax Spider; forced browsing idea
- [ ] 🟡 Learn exclude lists and reducing noise

### DAST Hands‑On (Labs)
- [ ] 🔴 Настроить ZAP/Ajax Spider headless и экспорт sitemap
- [ ] 🔴 Написать `spider-runner.sh` (export HAR/JSON)
- [ ] 🟡 Active Scan Policy tuning

### English
- [ ] 🔴 Lessons 735–739
- [ ] 🔴 30–45 мин: прочитать заметки по headless spiders

### Dev (Codecademy)
- [ ] 🔴 Node.js — Express Intro
- [ ] 🔴 Добавить exclude list и noisy domains filter в spider runner

### Research
- [ ] 🔴 PortSwigger: new HTTP/1.1 desync article
- [ ] 🟡 Прочитать обсуждение о firefox windows при Ajax Spider и записать настройки headless

### Personal Project
- [ ] 🔴 Mini‑hunt: 8–10 часов — оптимизировать crawling, получить чистый sitemap

---

## Week 11 — XXE (in‑band & blind)

### Core WebSec
- [ ] 🔴 PortSwigger Academy: File Upload + Path Traversal labs
- [ ] 🔴 PentesterLab Pro: Directory Traversal
- [ ] 🔴 Book: *HTTP: The Definitive Guide* — Ch.11 (Authentication)
- [ ] 🔴 FFUF advanced (vhost/param discovery)
- [ ] 🔴 PortSwigger XXE labs: in‑band and blind scenarios
- [ ] 🟡 Understand XML parsers and entity expansion risks

### DAST Hands‑On (Labs)
- [ ] 🔴 Craft XXE payloads to exfiltrate local files in lab environment
- [ ] 🔴 Test OOB via interactsh/Burp Collaborator
- [ ] 🟡 Explore Contexts & Session Management

### English
- [ ] 🔴 Lessons 740–744
- [ ] 🔴 30–45 мин: прочитать blind XXE writeup

### Dev (Codecademy)
- [ ] 🔴 Node.js — Express Routes & Middleware
- [ ] 🔴 Добавить `xxe-templates` в репо (different parser variants)

### Research
- [ ] 🔴 Doyensec: CSP bypass 2024
- [ ] 🟡 PortSwigger XXE deep dive — конспектировать нюансы для Java/PHP

### Personal Project
- [ ] 🔴 Mini‑hunt: 10 часов — найти XML endpoints и аккуратно протестировать XXE в рамках scope
- [ ] 🟢 Add 'Tools I use' page

---

## Week 12 — Deserialization basics

### Core WebSec
- [ ] 🔴 PortSwigger Academy: XXE (4–6 labs)
- [ ] 🔴 Book: *HTTP: The Definitive Guide* — Ch.12 (Security, HTTPS)
- [ ] 🔴 Bash: add logging & error handling
- [ ] 🔴 Изучить concept of insecure deserialization и почему это RCE vector
- [ ] 🟡 Ознакомиться с common gadget chains (Commons‑Collections и др.)

### DAST Hands‑On (Labs)
- [ ] 🔴 Практика: ysoserial и тесты на локальных приложениях (Java/PHP/Python)
- [ ] 🔴 Тестировать cookie/session blobs и file inputs
- [ ] 🟡 Try baseline scan in CI/CD pipeline

### English
- [ ] 🔴 Lessons 745–749
- [ ] 🔴 30–45 мин: прочитать writeup по десериализации

### Dev (Codecademy)
- [ ] 🔴 Создать `deser-checker.sh` skeleton (detect serialized blobs)

### Research
- [ ] 🟡 Сбор реальных кейсов deserialization→RCE

### Personal Project
- [ ] 🔴 Mini‑hunt: 10 часов — сканировать на serialized inputs и аккуратно тестировать
- [ ] 🟢 Post: '12 weeks of fundamentals — recap'

---

## Week 13 — CSRF fundamentals & exploitation

### Core WebSec
- [ ] 🔴 TBHM v4 (Jhaddix) — Recon Edition video
- [ ] 🔴 Практика: собрать recon-матрицу для тестового домена
- [ ] 🔴 PortSwigger: DOM XSS labs
- [ ] 🔴 PentesterLab Pro: DOM XSS трек
- [ ] 🔴 PortSwigger CSRF labs — токены, SameSite, login‑CSRF
- [ ] 🟡 Понять stored action CSRF и state changing endpoints

### DAST Hands‑On (Labs)
- [ ] 🔴 Создать простые CSRF PoC pages (HTML forms) для demo
- [ ] 🔴 Проверить SameSite cookie behaviour с curl и браузером
- [ ] 🟡 Automation Framework basics

### English
- [ ] 🔴 Lessons 750–754
- [ ] 🔴 30–45 мин: прочитать CSRF mitigation patterns

### Dev (Codecademy)
- [ ] 🔴 Добавить CSRF test runner в репо (form automations)

### Research
- [ ] 🔴 PortSwigger Research: HTTP/2 request smuggling article
- [ ] 🟡 Assetnote CSRF notes — собрать обходы

### Personal Project
- [ ] 🔴 Mini‑hunt: 8–10 часов — искать CSRF в scope и подготовить disclosure notes

---

## Week 14 — Advanced SQLi (time‑based / OOB)

### Core WebSec
- [ ] 🔴 PortSwigger Academy: Business Logic Vulns (4–6 labs)
- [ ] 🔴 PentesterLab Pro: логические баги
- [ ] 🔴 Recon: добавить kiterunner для API discovery
- [ ] 🔴 Практика time‑based SQLi и OOB через Burp Collaborator
- [ ] 🟡 Понять различия и detection способов

### DAST Hands‑On (Labs)
- [ ] 🔴 `sqlmap` advanced flags на тест‑лабе; ручные sleep‑payloads
- [ ] 🔴 Настроить Collaborator/Interactsh для OOB
- [ ] 🟡 Custom scan policy: include/exclude rules

### English
- [ ] 🔴 Lessons 755–759
- [ ] 🔴 30–45 мин: прочитать advanced SQLi writeups

### Dev (Codecademy)
- [ ] 🔴 Улучшить `sqli-check.py` с timing heuristics

### Research
- [ ] 🔴 Assetnote Research: new misconfig case
- [ ] 🟡 Assetnote/PortSwigger papers по OOB channels

### Personal Project
- [ ] 🔴 Mini‑hunt: 8–10 часов — focused SQLi checks; оформить PoC
- [ ] 🟢 Add post: Business Logic vulnerabilities

---

## Week 15 — SSRF advanced & cloud pivoting

### Core WebSec
- [ ] 🔴 PortSwigger Academy: CSRF (6–8 labs)
- [ ] 🔴 PentesterLab Pro: CSRF практикум
- [ ] 🔴 ffuf: param fuzzing + recursion
- [ ] 🔴 Advanced SSRF patterns: metadata access (IMDS), SSRF chaining
- [ ] 🟡 Понять IMDSv1 vs IMDSv2 и mitigations

### DAST Hands‑On (Labs)
- [ ] 🔴 Практика: SSRF → IMDS access в lab (mock IMDS server)
- [ ] 🔴 Chain SSRF → internal service access in docker labs
- [ ] 🟡 Session management scripts

### English
- [ ] 🔴 Lessons 760–764
- [ ] 🔴 30–45 мин: read SSRF cloud case study

### Dev (Codecademy)
- [ ] 🔴 `ssrf-pivot-sim.py` — локальный симулятор цепочек

### Research
- [ ] 🔴 Doyensec: OAuth misconfig article
- [ ] 🟡 Сбор списка metadata endpoints для AWS/Azure/GCP

### Personal Project
- [ ] 🔴 Mini‑hunt: 10+ часов — искать SSRF с potential cloud pivot (соблюдать scope)
- [ ] 🟢 Опубликовать статью про CSRF

---

## Week 16 — File upload advanced, filters and RCE chains

### Core WebSec
- [ ] 🔴 PortSwigger: Advanced SQLi (time-based, OOB)
- [ ] 🔴 Практика: SQLi через Burp Collaborator
- [ ] 🔴 PentesterLab Pro: Advanced SQLi
- [ ] 🔴 Изучить zip slip, double extension, polyglot attacks и парсеры изображений
- [ ] 🟡 Понять как server‑side parsing может привести к RCE

### DAST Hands‑On (Labs)
- [ ] 🔴 Проба: content‑type spoofing, double extension, polyglot files against lab apps
- [ ] 🔴 Тестировать imagemagick/other parsers в docker lab
- [ ] 🟡 Explore active scan scripting

### English
- [ ] 🔴 Lessons 765–769
- [ ] 🔴 30–45 мин: read File Upload RCE writeups

### Dev (Codecademy)
- [ ] 🔴 `upload-fuzz.sh` — расширить и добавить heuristics for detection

### Research
- [ ] 🟡 Doyensec/PortSwigger upload research — summary
- [ ] 🟢 Note: Advanced SQLi payloads

### Personal Project
- [ ] 🔴 Mini‑hunt: 10+ часов — upload endpoints testing; capture safe PoC

---

## Week 17 — Path traversal & directory exposure

### Core WebSec
- [ ] 🔴 PortSwigger: Advanced XXE (blind, exfiltration)
- [ ] 🔴 PentesterLab Pro: XXE advanced
- [ ] 🔴 Note: XXE payloads + bypasses
- [ ] 🔴 Deep dive into traversal patterns and null byte issues
- [ ] 🟡 Learn server config differences and common exposures

### DAST Hands‑On (Labs)
- [ ] 🔴 Test common traversal payloads and scan for backups (.bak, .old)
- [ ] 🔴 Use ffuf/dirb to find exposed directories
- [ ] 🟡 Explore authentication scripts

### English
- [ ] 🔴 Lessons 770–774
- [ ] 🔴 30–45 мин: прочитать traversal writeups

### Dev (Codecademy)
- [ ] 🔴 `traversal-checker.sh` — добавить parallel execution и reporting

### Research
- [ ] 🔴 PortSwigger: Blind XXE research
- [ ] 🟡 PortSwigger traversal notes — собрать

### Personal Project
- [ ] 🔴 Mini‑hunt: 8–10 часов — find sensitive files; document responsibly
- [ ] 🟢 Post: XXE deep dive

---

## Week 18 — Recon automation & Nuclei templates

### Core WebSec
- [ ] 🔴 PortSwigger: SSRF advanced (pivoting, DNS rebinding)
- [ ] 🔴 PentesterLab Pro: SSRF углубленные
- [ ] 🔴 Practice: SSRF via Burp Collaborator
- [ ] 🔴 Изучить синтаксис Nuclei и matchers
- [ ] 🟡 Понять как писать low-noise templates

### DAST Hands‑On (Labs)
- [ ] 🔴 Написать 5 nuclei templates (headers, exposed pages, common files)
- [ ] 🔴 Запустить nuclei на asset list и уменьшать FP
- [ ] 🟡 HUD deep dive

### English
- [ ] 🔴 Lessons 775–779
- [ ] 🔴 30–45 мин: nuclei docs — quick read and examples

### Dev (Codecademy)
- [ ] 🔴 Backend — Express Basics
- [ ] 🔴 Интегрировать nuclei в `recon.sh` и сохранять результаты в `scans/`
- [ ] 🟡 GitHub Action skeleton для nightly nuclei run

### Research
- [ ] 🔴 Assetnote: SSRF in cloud services
- [ ] 🟡 Собрать 10 полезных публичных шаблонов и адаптировать

### Personal Project
- [ ] 🔴 Опубликовать nuclei‑pack #1 в GitHub (README + usage)

---

## Week 19 — API surface basics & Swagger/OpenAPI

### Core WebSec
- [ ] 🔴 PortSwigger: File Upload Advanced (RCE)
- [ ] 🔴 PentesterLab Pro: File Upload complex cases
- [ ] 🔴 Note: обходы фильтров для upload
- [ ] 🔴 Научиться распознавать и парсить Swagger/OpenAPI specs
- [ ] 🟡 Понять API auth patterns: API keys, JWT, OAuth

### DAST Hands‑On (Labs)
- [ ] 🔴 Использовать `swagger-parser`/httpx для извлечения эндпоинтов
- [ ] 🔴 GraphQL introspection: найти schema и составить список запросов
- [ ] 🟡 API scans: Swagger/OpenAPI

### English
- [ ] 🔴 Lessons 780–784
- [ ] 🔴 30–45 мин: прочитать главы по API reconnaissance

### Dev (Codecademy)
- [ ] 🔴 Backend — Express Middleware
- [ ] 🔴 `api-crawl.py` — скрипт для автоматизации извлечения эндпоинтов из OpenAPI

### Research
- [ ] 🔴 Doyensec: file upload issues
- [ ] 🟡 Assetnote GraphQL writeups — notes

### Personal Project
- [ ] 🔴 Mini‑hunt: 8–10 часов — enumerate API endpoints and test auth
- [ ] 🟢 Post: File Upload → RCE

---

## Week 20 — Rate limiting, BOLA & mass assignment

### Core WebSec
- [ ] 🔴 PortSwigger: Path Traversal Advanced
- [ ] 🔴 PentesterLab Pro: Traversal advanced
- [ ] 🔴 Automation: nuclei templates for traversal
- [ ] 🔴 Понять Broken Object Level Authorization (BOLA) и mass assignment risks
- [ ] 🟡 Learn rate limiting patterns and abuse

### DAST Hands‑On (Labs)
- [ ] 🔴 Turbo Intruder: тестирование rate limits и concurrency
- [ ] 🔴 Mass assignment: модификация JSON bodies и hidden fields

### English
- [ ] 🔴 Lessons 785–789
- [ ] 🔴 30–45 мин: read BOLA case studies

### Dev (Codecademy)
- [ ] 🔴 Backend — Express Routers
- [ ] 🔴 `rate-tester.py` — скрипт для rate limit тестов (exponential backoff)
- [ ] 🟡 JSON mutation helper для mass assignment тестов

### Research
- [ ] 🔴 PortSwigger: traversal bypasses
- [ ] 🟡 Doyensec/Assetnote BOLA writeups — собрать примеры

### Personal Project
- [ ] 🔴 Mini‑hunt: 10 часов — focused API auth checks (BOLA/mass assignment)
- [ ] 🟢 Добавить серию заметок по Path Traversal

---

## Week 21 — SSTI basics & template engines

### Core WebSec
- [ ] 🔴 PortSwigger: SSTI labs
- [ ] 🔴 PentesterLab Pro: SSTI exercises
- [ ] 🔴 Practice: test SSTI in Flask app
- [ ] 🔴 Понять SSTI (Jinja2, Twig, Velocity) и контексты выполнения
- [ ] 🟡 Ознакомиться с sandbox escape примерами

### DAST Hands‑On (Labs)
- [ ] 🔴 Практика SSTI на Flask/Django toy apps; пробовать evaluate expressions
- [ ] 🔴 Проверить common bypasses
- [ ] 🟡 Add custom passive scan rule

### English
- [ ] 🔴 Lessons 790–794
- [ ] 🔴 30–45 мин: SSTI writeups и payload notes

### Dev (Codecademy)
- [ ] 🔴 Backend — Express Project
- [ ] 🔴 `ssti-check.py` — добавить в репо

### Research
- [ ] 🔴 Assetnote: SSTI exploitation research
- [ ] 🟡 PortSwigger SSTI notes — собрать payloads

### Personal Project
- [ ] 🔴 Mini‑hunt: 8–10 часов — test template endpoints; document PoC
- [ ] 🟢 Post: SSTI case study

---

## Week 22 — Insecure deserialization deepening

### Core WebSec
- [ ] 🔴 PortSwigger: Insecure Deserialization (Java/PHP)
- [ ] 🔴 PentesterLab Pro: Deserialization basics
- [ ] 🔴 Углубиться в gadget chains и искать в зависимостях
- [ ] 🟡 Понять mitigations и detection patterns

### DAST Hands‑On (Labs)
- [ ] 🔴 Практика exploit chain hunting (ysoserial variants) в локальной среде
- [ ] 🔴 Тестировать cookie/session blobs и файловые загрузки на serialized input
- [ ] 🟡 Add active scan rule

### English
- [ ] 🔴 Lessons 795–799
- [ ] 🔴 30–45 мин: прочитать deep deserialization writeups

### Dev (Codecademy)
- [ ] 🔴 Backend — Databases intro
- [ ] 🔴 Улучшить `deser-checker.sh` с signature matching

### Research
- [ ] 🟡 Собрать реальные report'ы про deserialization→RCE

### Personal Project
- [ ] 🔴 Mini‑hunt: 10+ часов — искать serialized inputs, аккуратно тестировать
- [ ] 🟢 Post: Deserialization intro

---

## Week 23 — Request smuggling basics & cache poisoning intro

### Core WebSec
- [ ] 🔴 PortSwigger: Advanced Deserialization (RCE)
- [ ] 🔴 PentesterLab Pro: Deserialization advanced
- [ ] 🔴 Practice: Burp Extender for deserialization
- [ ] 🔴 Изучить основы request smuggling (CL.TE, TE.CL) и cache poisoning
- [ ] 🟡 Понять поведение промежуточных прокси и CDN

### DAST Hands‑On (Labs)
- [ ] 🔴 Собрать локальный тестбенч (nginx+varnish) и попробовать простые payloads
- [ ] 🔴 Документировать различия в парсинге между серверами
- [ ] 🟡 Custom scripts repo init

### English
- [ ] 🔴 Lessons 800–804
- [ ] 🔴 30–45 мин: request smuggling articles

### Dev (Codecademy)
- [ ] 🔴 Backend — Sequelize ORM
- [ ] 🔴 Создать reproducible lab configs (docker compose) для smuggling tests

### Research
- [ ] 🔴 Doyensec: deserialization writeup
- [ ] 🟡 PortSwigger/Albinowax smuggling notes — сохранить payloads

### Personal Project
- [ ] 🔴 Mini‑hunt: 8–10 часов — research possible indicators on targets; avoid destructive tests

---

## Week 24 — Review, writeup sprint & consolidation

### Core WebSec
- [ ] 🔴 PortSwigger: HTTP Request Smuggling (CL.TE, TE.CL)
- [ ] 🔴 Practice: Repeater smuggling
- [ ] 🔴 Read: Albinowax research on smuggling
- [ ] 🔴 Провести ревью конспектов и чеклистов по XSS, SQLi, SSRF, IDOR, Upload
- [ ] 🔴 Подготовить финальные cheat‑sheets

### DAST Hands‑On (Labs)
- [ ] 🔴 Перепройти ключевые лаборы и воспроизвести PoC в чистом виде (curl + scripts)
- [ ] 🔴 Проверить reproducibility всех PoC в репо
- [ ] 🟡 Baseline scan with auth script

### English
- [ ] 🔴 Lessons 805–809
- [ ] 🔴 30–45 мин: подготовить один длинный writeup (publishable quality)

### Dev (Codecademy)
- [ ] 🔴 Backend — Sequelize Associations
- [ ] 🔴 Полировка скриптов: recon, nuclei integration, spider runner
- [ ] 🟡 Настроить GitHub Action для nightly nuclei runs

### Research
- [ ] 🔴 PortSwigger: HTTP/2 desync research
- [ ] 🟡 Составить `research.md` с категоризацией (SSRF, SQLi, XSS...)

### Personal Project
- [ ] 🔴 Writeup sprint: опубликовать 1–2 качественных writeups на GitHub/Medium и поделиться в сообществе
- [ ] 🔴 Обновить dashboard: PoC/week, writeups/month, notes on blockers
- [ ] 🟢 Post: Request Smuggling basics

---

### 📌 Acceptance criteria for Phase I
- [ ] 🔴 Уверенное понимание HTTP, заголовков, кэширования и базовых web‑векторов
- [ ] 🔴 Практические PoC: XSS/SQLi/SSRF/IDOR/File upload (reproducible)
- [ ] 🔴 Basic automation: recon.sh, spider‑runner.sh, nuclei integration, simple scripts
- [ ] 🔴 Мини‑ханты: минимум 6 mini‑хант‑спринтов и 2+ writeups
- [ ] 🔴 Dashboard and repo organized for Phase II

---

# Phase II — Advanced (Weeks 25–50)

*Фаза II — Advanced.*
Цель: углубиться в продвинутые веб-векторы (XXE, Deserialization, Smuggling), API-секьюрити, автоматизацию и публикуемые инструменты.

---

> Формат недели: Core WebSec / DAST Hands‑On (Labs) / Dev / Research / Personal Project (mini‑hunt, publishable PoC).

---

## Week 25 — CSRF / Advanced SQLi / Nuclei & API

### Core WebSec
- [ ] 🔴 PortSwigger: Advanced Smuggling (CL.CL, TE.TE, cache poisoning)
- [ ] 🔴 PentesterLab Pro: smuggling labs
- [ ] 🔴 Checklist: smuggling detection
- [ ] 🔴 Изучить CSRF глубокие сценарии; Advanced SQLi, OOB; API reconnaissance и OpenAPI

### DAST Hands‑On (Labs)
- [ ] 🔴 PortSwigger advanced labs: CSRF, advanced SQLi; практика с Burp Collaborator/Interactsh
- [ ] 🟡 Full scan config tuning

### English
- [ ] 🔴 Lessons 810–814

### Dev (Codecademy)
- [ ] 🔴 Backend — Sequelize Project
- [ ] 🔴 Публикация nuclei-пака №1; доработка `sqli-check.py` и интеграция в recon

### Research
- [ ] 🔴 Assetnote: cache poisoning writeup
- [ ] 🟡 Собирать кейсы обхода CSRF и продвинутых SQLi

### Personal Project
- [ ] 🔴 Mini‑hunt спринт 6–10ч/нед: целевые проверки SQLi/CSRF + публикация writeup
- [ ] 🟢 Post: Advanced Smuggling

---

## Week 26 — CSRF / Advanced SQLi / Nuclei & API

### Core WebSec
- [ ] 🔴 PortSwigger: Web Cache Poisoning labs
- [ ] 🔴 Read: PortSwigger cache poisoning research
- [ ] 🔴 Practice: test cache headers
- [ ] 🔴 Изучить CSRF глубокие сценарии; Advanced SQLi, OOB; API reconnaissance и OpenAPI

### DAST Hands‑On (Labs)
- [ ] 🔴 PortSwigger advanced labs: CSRF, advanced SQLi; практика с Burp Collaborator/Interactsh
- [ ] 🟡 Explore add-ons marketplace

### English
- [ ] 🔴 Lessons 815–819

### Dev (Codecademy)
- [ ] 🔴 Backend — Testing with Jest
- [ ] 🔴 Публикация nuclei-пака №1; доработка `sqli-check.py` и интеграция в recon

### Research
- [ ] 🔴 Doyensec: cache attacks
- [ ] 🟡 Собирать кейсы обхода CSRF и продвинутых SQLi

### Personal Project
- [ ] 🔴 Mini‑hunt спринт 6–10ч/нед: целевые проверки SQLi/CSRF + публикация writeup
- [ ] 🟢 Note: Web Cache Poisoning

---

## Week 27 — CSRF / Advanced SQLi / Nuclei & API

### Core WebSec
- [ ] 🔴 OWASP API Top 10: Broken Object Level Authorization (BOLA)
- [ ] 🔴 Read: Corey Ball *Hacking APIs* ch.1–2
- [ ] 🔴 Изучить CSRF глубокие сценарии; Advanced SQLi, OOB; API reconnaissance и OpenAPI

### DAST Hands‑On (Labs)
- [ ] 🔴 PortSwigger advanced labs: CSRF, advanced SQLi; практика с Burp Collaborator/Interactsh
- [ ] 🟡 API scan with Swagger

### English
- [ ] 🔴 Lessons 820–824

### Dev (Codecademy)
- [ ] 🔴 Backend — Testing Express
- [ ] 🔴 Публикация nuclei-пака №1; доработка `sqli-check.py` и интеграция в recon

### Research
- [ ] 🟡 Собирать кейсы обхода CSRF и продвинутых SQLi

### Personal Project
- [ ] 🔴 Mini‑hunt спринт 6–10ч/нед: целевые проверки SQLi/CSRF + публикация writeup
- [ ] 🟢 Post: Starting API Security track

---

## Week 28 — CSRF / Advanced SQLi / Nuclei & API

### Core WebSec
- [ ] 🔴 OWASP API Top 10: BOLA/IDOR deep dive
- [ ] 🔴 PentesterLab Pro: API authorization
- [ ] 🔴 Checklist: API BOLA/IDOR tests
- [ ] 🔴 Изучить CSRF глубокие сценарии; Advanced SQLi, OOB; API reconnaissance и OpenAPI

### DAST Hands‑On (Labs)
- [ ] 🔴 PortSwigger advanced labs: CSRF, advanced SQLi; практика с Burp Collaborator/Interactsh
- [ ] 🟡 Automated API scan (CI integration)

### English
- [ ] 🔴 Lessons 825–829

### Dev (Codecademy)
- [ ] 🔴 Backend — Final Project
- [ ] 🔴 Публикация nuclei-пака №1; доработка `sqli-check.py` и интеграция в recon

### Research
- [ ] 🟡 Собирать кейсы обхода CSRF и продвинутых SQLi

### Personal Project
- [ ] 🔴 Mini‑hunt спринт 6–10ч/нед: целевые проверки SQLi/CSRF + публикация writeup
- [ ] 🟢 Опубликовать статью про BOLA

---

## Week 29 — CSRF / Advanced SQLi / Nuclei & API

### Core WebSec
- [ ] 🔴 Изучить CSRF глубокие сценарии; Advanced SQLi, OOB; API reconnaissance и OpenAPI

### DAST Hands‑On (Labs)
- [ ] 🔴 PortSwigger advanced labs: CSRF, advanced SQLi; практика с Burp Collaborator/Interactsh

### Dev
- [ ] 🔴 Публикация nuclei-пака №1; доработка `sqli-check.py` и интеграция в recon

### Research
- [ ] 🟡 Собирать кейсы обхода CSRF и продвинутых SQLi

### Personal Project
- [ ] 🔴 Mini‑hunt спринт 6–10ч/нед: целевые проверки SQLi/CSRF + публикация writeup

---

## Week 30 — CSRF / Advanced SQLi / Nuclei & API

### Core WebSec
- [ ] 🔴 Изучить CSRF глубокие сценарии; Advanced SQLi, OOB; API reconnaissance и OpenAPI

### DAST Hands‑On (Labs)
- [ ] 🔴 PortSwigger advanced labs: CSRF, advanced SQLi; практика с Burp Collaborator/Interactsh

### Dev
- [ ] 🔴 Публикация nuclei-пака №1; доработка `sqli-check.py` и интеграция в recon

### Research
- [ ] 🟡 Собирать кейсы обхода CSRF и продвинутых SQLi

### Personal Project
- [ ] 🔴 Mini‑hunt спринт 6–10ч/нед: целевые проверки SQLi/CSRF + публикация writeup

---

## Week 31 — XXE, Deserialization, Burp Ext

### Core WebSec
- [ ] 🔴 XXE (blind/OOB), unsafe deserialization (Java/PHP/Python) и анализ gadget‑chains

### DAST Hands‑On (Labs)
- [ ] 🔴 Deserialization labs (ysoserial) и XXE blind labs; тесты на локальных аппах

### Dev
- [ ] 🔴 Начать skeleton Burp Extension для автоматизации рутинных проверок

### Research
- [ ] 🟡 Собирать gadget‑цепочки и заметки по парсерам XML/JSON

### Personal Project
- [ ] 🔴 Опубликовать пример Burp Extension skeleton + writeup

---

## Week 32 — XXE, Deserialization, Burp Ext

### Core WebSec
- [ ] 🔴 XXE (blind/OOB), unsafe deserialization (Java/PHP/Python) и анализ gadget‑chains

### DAST Hands‑On (Labs)
- [ ] 🔴 Deserialization labs (ysoserial) и XXE blind labs; тесты на локальных аппах

### Dev
- [ ] 🔴 Начать skeleton Burp Extension для автоматизации рутинных проверок

### Research
- [ ] 🟡 Собирать gadget‑цепочки и заметки по парсерам XML/JSON

### Personal Project
- [ ] 🔴 Опубликовать пример Burp Extension skeleton + writeup

---

## Week 33 — XXE, Deserialization, Burp Ext

### Core WebSec
- [ ] 🔴 XXE (blind/OOB), unsafe deserialization (Java/PHP/Python) и анализ gadget‑chains

### DAST Hands‑On (Labs)
- [ ] 🔴 Deserialization labs (ysoserial) и XXE blind labs; тесты на локальных аппах

### Dev
- [ ] 🔴 Начать skeleton Burp Extension для автоматизации рутинных проверок

### Research
- [ ] 🟡 Собирать gadget‑цепочки и заметки по парсерам XML/JSON

### Personal Project
- [ ] 🔴 Опубликовать пример Burp Extension skeleton + writeup

---

## Week 34 — XXE, Deserialization, Burp Ext

### Core WebSec
- [ ] 🔴 XXE (blind/OOB), unsafe deserialization (Java/PHP/Python) и анализ gadget‑chains

### DAST Hands‑On (Labs)
- [ ] 🔴 Deserialization labs (ysoserial) и XXE blind labs; тесты на локальных аппах

### Dev
- [ ] 🔴 Начать skeleton Burp Extension для автоматизации рутинных проверок

### Research
- [ ] 🟡 Собирать gadget‑цепочки и заметки по парсерам XML/JSON

### Personal Project
- [ ] 🔴 Опубликовать пример Burp Extension skeleton + writeup

---

## Week 35 — XXE, Deserialization, Burp Ext

### Core WebSec
- [ ] 🔴 XXE (blind/OOB), unsafe deserialization (Java/PHP/Python) и анализ gadget‑chains

### DAST Hands‑On (Labs)
- [ ] 🔴 Deserialization labs (ysoserial) и XXE blind labs; тесты на локальных аппах

### Dev
- [ ] 🔴 Начать skeleton Burp Extension для автоматизации рутинных проверок

### Research
- [ ] 🟡 Собирать gadget‑цепочки и заметки по парсерам XML/JSON

### Personal Project
- [ ] 🔴 Опубликовать пример Burp Extension skeleton + writeup

---

## Week 36 — XXE, Deserialization, Burp Ext

### Core WebSec
- [ ] 🔴 XXE (blind/OOB), unsafe deserialization (Java/PHP/Python) и анализ gadget‑chains

### DAST Hands‑On (Labs)
- [ ] 🔴 Deserialization labs (ysoserial) и XXE blind labs; тесты на локальных аппах

### Dev
- [ ] 🔴 Начать skeleton Burp Extension для автоматизации рутинных проверок

### Research
- [ ] 🟡 Собирать gadget‑цепочки и заметки по парсерам XML/JSON

### Personal Project
- [ ] 🔴 Опубликовать пример Burp Extension skeleton + writeup

---

## Week 37 — Request Smuggling & Cache Poisoning

### Core WebSec
- [ ] 🔴 Request smuggling (CL.TE/TE.CL) и основы cache poisoning

### DAST Hands‑On (Labs)
- [ ] 🔴 Настройка локального стенда (nginx+varnish) и эксперименты со смугглингом

### Dev
- [ ] 🔴 Написать reproducible docker-compose для smuggling labs; nuclei шаблоны для кэша

### Research
- [ ] 🟡 Изучить известные CVE и случаи успешного cache poisoning

### Personal Project
- [ ] 🔴 Mini‑hunt: искать признаки уязвимости к кэш‑атакам, документировать

---

## Week 38 — Request Smuggling & Cache Poisoning

### Core WebSec
- [ ] 🔴 Request smuggling (CL.TE/TE.CL) и основы cache poisoning

### DAST Hands‑On (Labs)
- [ ] 🔴 Настройка локального стенда (nginx+varnish) и эксперименты со смугглингом

### Dev
- [ ] 🔴 Написать reproducible docker-compose для smuggling labs; nuclei шаблоны для кэша

### Research
- [ ] 🟡 Изучить известные CVE и случаи успешного cache poisoning

### Personal Project
- [ ] 🔴 Mini‑hunt: искать признаки уязвимости к кэш‑атакам, документировать

---

## Week 39 — Request Smuggling & Cache Poisoning

### Core WebSec
- [ ] 🔴 Request smuggling (CL.TE/TE.CL) и основы cache poisoning

### DAST Hands‑On (Labs)
- [ ] 🔴 Настройка локального стенда (nginx+varnish) и эксперименты со смугглингом

### Dev
- [ ] 🔴 Написать reproducible docker-compose для smuggling labs; nuclei шаблоны для кэша

### Research
- [ ] 🟡 Изучить известные CVE и случаи успешного cache poisoning

### Personal Project
- [ ] 🔴 Mini‑hunt: искать признаки уязвимости к кэш‑атакам, документировать

---

## Week 40 — Request Smuggling & Cache Poisoning

### Core WebSec
- [ ] 🔴 Request smuggling (CL.TE/TE.CL) и основы cache poisoning

### DAST Hands‑On (Labs)
- [ ] 🔴 Настройка локального стенда (nginx+varnish) и эксперименты со смугглингом

### Dev
- [ ] 🔴 Написать reproducible docker-compose для smuggling labs; nuclei шаблоны для кэша

### Research
- [ ] 🟡 Изучить известные CVE и случаи успешного cache poisoning

### Personal Project
- [ ] 🔴 Mini‑hunt: искать признаки уязвимости к кэш‑атакам, документировать

---

## Week 41 — Request Smuggling & Cache Poisoning

### Core WebSec
- [ ] 🔴 Request smuggling (CL.TE/TE.CL) и основы cache poisoning

### DAST Hands‑On (Labs)
- [ ] 🔴 Настройка локального стенда (nginx+varnish) и эксперименты со смугглингом

### Dev
- [ ] 🔴 Написать reproducible docker-compose для smuggling labs; nuclei шаблоны для кэша

### Research
- [ ] 🟡 Изучить известные CVE и случаи успешного cache poisoning

### Personal Project
- [ ] 🔴 Mini‑hunt: искать признаки уязвимости к кэш‑атакам, документировать

---

## Week 42 — Request Smuggling & Cache Poisoning

### Core WebSec
- [ ] 🔴 Request smuggling (CL.TE/TE.CL) и основы cache poisoning

### DAST Hands‑On (Labs)
- [ ] 🔴 Настройка локального стенда (nginx+varnish) и эксперименты со смугглингом

### Dev
- [ ] 🔴 Написать reproducible docker-compose для smuggling labs; nuclei шаблоны для кэша

### Research
- [ ] 🟡 Изучить известные CVE и случаи успешного cache poisoning

### Personal Project
- [ ] 🔴 Mini‑hunt: искать признаки уязвимости к кэш‑атакам, документировать

---

## Week 43 — API Top10, GraphQL, CI интеграция

### Core WebSec
- [ ] 🔴 OWASP API Top10: BOLA, Mass Assignment, Rate Limiting

### DAST Hands‑On (Labs)
- [ ] 🔴 GraphQL и Swagger продвинутые тесты; mass assignment практики

### Dev
- [ ] 🔴 Интегрировать сканы в CI (GitHub Actions), автоматизировать triage

### Research
- [ ] 🟡 Собирать примеры BOLA и mass assignment из публичных отчетов

### Personal Project
- [ ] 🔴 Writeup sprint: 2 детализованных writeup по API-уязвимостям

---

## Week 44 — API Top10, GraphQL, CI интеграция

### Core WebSec
- [ ] 🔴 OWASP API Top10: BOLA, Mass Assignment, Rate Limiting

### DAST Hands‑On (Labs)
- [ ] 🔴 GraphQL и Swagger продвинутые тесты; mass assignment практики

### Dev
- [ ] 🔴 Интегрировать сканы в CI (GitHub Actions), автоматизировать triage

### Research
- [ ] 🟡 Собирать примеры BOLA и mass assignment из публичных отчетов

### Personal Project
- [ ] 🔴 Writeup sprint: 2 детализованных writeup по API-уязвимостям

---

## Week 45 — API Top10, GraphQL, CI интеграция

### Core WebSec
- [ ] 🔴 OWASP API Top10: BOLA, Mass Assignment, Rate Limiting

### DAST Hands‑On (Labs)
- [ ] 🔴 GraphQL и Swagger продвинутые тесты; mass assignment практики

### Dev
- [ ] 🔴 Интегрировать сканы в CI (GitHub Actions), автоматизировать triage

### Research
- [ ] 🟡 Собирать примеры BOLA и mass assignment из публичных отчетов

### Personal Project
- [ ] 🔴 Writeup sprint: 2 детализованных writeup по API-уязвимостям

---

## Week 46 — API Top10, GraphQL, CI интеграция

### Core WebSec
- [ ] 🔴 OWASP API Top10: BOLA, Mass Assignment, Rate Limiting

### DAST Hands‑On (Labs)
- [ ] 🔴 GraphQL и Swagger продвинутые тесты; mass assignment практики

### Dev
- [ ] 🔴 Интегрировать сканы в CI (GitHub Actions), автоматизировать triage

### Research
- [ ] 🟡 Собирать примеры BOLA и mass assignment из публичных отчетов

### Personal Project
- [ ] 🔴 Writeup sprint: 2 детализованных writeup по API-уязвимостям

---

## Week 47 — API Top10, GraphQL, CI интеграция

### Core WebSec
- [ ] 🔴 OWASP API Top10: BOLA, Mass Assignment, Rate Limiting

### DAST Hands‑On (Labs)
- [ ] 🔴 GraphQL и Swagger продвинутые тесты; mass assignment практики

### Dev
- [ ] 🔴 Интегрировать сканы в CI (GitHub Actions), автоматизировать triage

### Research
- [ ] 🟡 Собирать примеры BOLA и mass assignment из публичных отчетов

### Personal Project
- [ ] 🔴 Writeup sprint: 2 детализованных writeup по API-уязвимостям

---

## Week 48 — API Top10, GraphQL, CI интеграция

### Core WebSec
- [ ] 🔴 OWASP API Top10: BOLA, Mass Assignment, Rate Limiting

### DAST Hands‑On (Labs)
- [ ] 🔴 GraphQL и Swagger продвинутые тесты; mass assignment практики

### Dev
- [ ] 🔴 Интегрировать сканы в CI (GitHub Actions), автоматизировать triage

### Research
- [ ] 🟡 Собирать примеры BOLA и mass assignment из публичных отчетов

### Personal Project
- [ ] 🔴 Writeup sprint: 2 детализованных writeup по API-уязвимостям

---

## Week 49 — API Top10, GraphQL, CI интеграция

### Core WebSec
- [ ] 🔴 OWASP API Top10: BOLA, Mass Assignment, Rate Limiting

### DAST Hands‑On (Labs)
- [ ] 🔴 GraphQL и Swagger продвинутые тесты; mass assignment практики

### Dev
- [ ] 🔴 Интегрировать сканы в CI (GitHub Actions), автоматизировать triage

### Research
- [ ] 🟡 Собирать примеры BOLA и mass assignment из публичных отчетов

### Personal Project
- [ ] 🔴 Writeup sprint: 2 детализованных writeup по API-уязвимостям

---

## Week 50 — API Top10, GraphQL, CI интеграция

### Core WebSec
- [ ] 🔴 OWASP API Top10: BOLA, Mass Assignment, Rate Limiting

### DAST Hands‑On (Labs)
- [ ] 🔴 GraphQL и Swagger продвинутые тесты; mass assignment практики

### Dev
- [ ] 🔴 Интегрировать сканы в CI (GitHub Actions), автоматизировать triage

### Research
- [ ] 🟡 Собирать примеры BOLA и mass assignment из публичных отчетов

### Personal Project
- [ ] 🔴 Writeup sprint: 2 детализованных writeup по API-уязвимостям

---

### 📌 К концу Phase II (Advanced) — Critical 🔴
- [ ] Эксплуатация CSRF, SSRF, File Upload, Path Traversal, SSTI, Deserialization
- [ ] Автоматизация recon: nuclei, ffuf, kiterunner, subfinder
- [ ] Понимание request smuggling и cache poisoning
- [ ] Старт в API Security (OWASP API Top 10, Corey Ball «Hacking APIs»)
- [ ] Английский: +150 уроков

---

# Phase III — Expert (Weeks 51–90)

*Фаза III — Expert.*
Цель: экспертные техники (OAuth/JWT, Race, Prototype Pollution), приватные программы, chaining и скорость в hunting.

---

> Формат недели: Core WebSec / DAST Hands‑On / Dev / Research / Personal Project.

---

## Week 51 — OWASP API Top10, JWT/OAuth

### Core WebSec
- [ ] 🔴 Глубокий разбор OWASP API Top10; JWT и OAuth комплексные атаки

### DAST Hands‑On (Labs)
- [ ] 🔴 Практика: JWT none-alg, alg confusion, token replay; OAuth flow abuse labs

### Dev
- [ ] 🔴 Публикация инструментов для автоматизации JWT тестов; улучшение API crawl

### Research
- [ ] 🟡 Анализ известных CVE и research по OAuth/JWT

### Personal Project
- [ ] 🔴 Mini‑hunt: фокус на auth‑векторах, подготовить PoC и writeup

---

[Continues with Weeks 52-90 in same detailed format...]

---

# Phase IV — Top Hunter (Weeks 91–120)

*Фаза IV — Top Hunter.*
Цель: охота за крупными целями, облачные поверхности, публикации и рост репутации.

---

> Формат недели: Core WebSec / Hunting / Dev / Research / Publicity.

---

## Week 91 — Cloud surfaces & IAM basics

### Core WebSec
- [ ] 🔴 AWS/Azure/GCP экспозиции: S3, Blob, IAM misconfigs, metadata endpoints

### DAST Hands‑On (Labs)
- [ ] 🔴 Практика с mock IMDS, публичные S3 misconfig labs

### Dev
- [ ] 🔴 Nuclei cloud checks; automations to detect public buckets and misconfigs

### Research
- [ ] 🟡 Сбор public reports по cloud misconfigs и эксплойтам

### Personal Project
- [ ] 🔴 Mini‑hunt: 1‑нед глубокая охота на облачную поверхность — PoC

---

[Continues with Weeks 92-120 in same detailed format...]

---

# Phase V — Researcher & Innovator (Weeks 121–150)

*Фаза V — Researcher & Innovator.*
Цель: research, 0‑day, конференции, создание команды и продуктов.

---

> Формат недели: Research / Dev / Labs / Publicity / Teaming.

---

## Week 121 — Browser internals & fuzzing

### Core WebSec
- [ ] 🔴 Изучение browser internals, парсеры, DOM engine, input handling

### DAST Hands‑On (Labs)
- [ ] 🔴 Fuzzing HTTP parsers and browser-like engines with honggfuzz/boofuzz

### Dev
- [ ] 🔴 Настройка fuzz harness и triage для крашей

### Research
- [ ] 🟡 Документирование найденных нестабильностей и анализ паттернов

### Personal Project
- [ ] 🔴 Publish research PoC (client-side/parsing bug)

---

[Continues with Weeks 122-150 in same detailed format...]

---

# 📚 Дополнительные Ресурсы из 70-недельного плана

## Полезные книги (как справочники)

### JavaScript & Client-Side
- [ ] You Don't Know JS Yet
- [ ] Speaking JavaScript
- [ ] The Tangled Web (M. Zalewski) — архитектура браузера и client-side безопасность

### API Security
- [ ] Hacking APIs (2022) — актуально для API/GraphQL багов
- [ ] Black Hat GraphQL — глубокое погружение в GraphQL-атаки
- [ ] Bug Bounty Bootcamp (Vickie Li) — системное введение в баунти

### Core Web
- [ ] HTTP: The Definitive Guide
- [ ] HPBN (High Performance Browser Networking)
- [ ] WAHH (Web Application Hacker's Handbook) — отдельные главы про HTTP/сессии

---

# 🎯 Итоговые Цели и Метрики

## К концу 150 недель (~3 года)

### Bug Bounty Achievements
- [ ] 100+ принятых отчётов
- [ ] 20+ high/critical bugs
- [ ] Топ-200 на HackerOne или Bugcrowd
- [ ] 5+ уникальных/novel находок
- [ ] 3–5 CVE присвоено
- [ ] Участие в 8–10 приватных программах

### Professional Certifications
- [ ] BSCP (Burp Suite Certified Practitioner)
- [ ] OSWE или eWPTXv2 (опционально)

### Community Impact
- [ ] 100+ writeups опубликовано
- [ ] 5+ выступлений на конференциях
- [ ] 5000+ подписчиков в сообществе
- [ ] Open-source contributions (3+ projects)
- [ ] Менторство 10+ начинающих

### Technical Excellence
- [ ] Мастерство во всех OWASP Top 10 + API Top 10
- [ ] Экспертиза в AI Security
- [ ] Навыки автоматизации и tool development
- [ ] Cloud security специализация
- [ ] Полный recon-to-report automated pipeline

---

# 📝 Финальные Рекомендации

## Ключевые Принципы

1. **Consistency > Intensity** — регулярность важнее интенсивности
2. **Quality > Quantity** — 1 critical bug > 10 low severity
3. **Depth > Breadth** — мастерство в нише > поверхностное знание всего
4. **Automation > Manual** — инвестиции в tooling окупаются
5. **Community > Solo** — networking ускоряет рост

## Attack Chains Philosophy

- [ ] Учиться связывать несколько мелких багов (low-severity) в одну серьёзную атаку
- [ ] Читать ресёрчи (Orange Tsai, Assetnote, Doyensec) не просто «для галочки»
- [ ] Пробовать воспроизводить куски и писать свои модули
- [ ] Развивать mindset ресёрча

## Когда корректировать план

- **Каждые 12 недель:** Review & Adjust
- **При выгорании:** Снизить интенсивность, не бросать
- **При достижении целей раньше:** Поднять планку
- **При новых возможностях:** Pivot (новая программа, research topic)

---

**Начни сегодня. Не завтра. Сегодня.**

*Версия: Ultimate FULL Edition*  
*Последнее обновление: 2025-11-19*  
*Следующий review: Неделя 12*

