# 📚 PunkMarket — Документация проекта
## Полный комплект архитектурных документов

---

## 🎯 Обзор проекта

**PunkMarket** — это реалистичная образовательная платформа в формате уязвимого e-commerce маркетплейса, предназначенная для обучения специалистов по Application Security и Bug Bounty.

### Ключевые особенности:

- ✅ **100+ реалистичных уязвимостей** всех типов (OWASP Top 10 + API Top 10)
- ✅ **X-Ray система** — "рентгеновское зрение" для просмотра backend кода
- ✅ **CTF-style флаги** — персонализированные для каждого студента
- ✅ **Два режима обучения** — Bug Hunter и AppSec
- ✅ **Прогрессивная сложность** — от Easy до Expert
- ✅ **Интеграция с PSDP** — полное покрытие программы обучения

---

## 📄 Документы проекта

### 1. [ARCHITECTURE.md](./ARCHITECTURE.md) — Основная архитектура

**Содержание:**
- 🎯 Общая концепция и философия
- 🗺️ Карта компонентов (Frontend + Backend)
- 🏛️ Архитектура микросервисов
- 🔬 X-Ray система
- 📚 Прогрессия обучения (4 уровня)
- 📖 Связь с PSDP и Bug Bounty Roadmap
- 🚀 Roadmap реализации (8 фаз)

**Для кого:**
- Project Managers
- Architects
- Team Leads
- Stakeholders

**Ключевые решения:**
- Vertical slices approach
- Реалистичная симуляция "5-летнего стартапа"
- 100+ уязвимостей в разных местах
- X-Ray как обучающий инструмент

---

### 2. [VULNERABILITIES_MAP.md](./VULNERABILITIES_MAP.md) — Карта уязвимостей

**Содержание:**
- 🎯 Полный список 100+ уязвимостей
- 📝 Детальное описание каждой:
  - Локация и endpoint
  - Vulnerable код
  - Проблема
  - Exploit examples
  - Impact
  - Remediation
- 📊 Статистика по типам и сложности
- 🔗 Ссылки на CWE/OWASP

**Для кого:**
- Developers
- Security Engineers
- Content Creators
- Students (reference)

**Использование:**
- Справочник при реализации
- База для создания challenges
- Материал для writeup'ов

---

### 3. [FLAG_SYSTEM.md](./FLAG_SYSTEM.md) — Система флагов и режимы

**Содержание:**
- 🚩 CTF-style flag system
- 📝 Форматы флагов
- 📍 Размещение флагов (8 типов)
- 🎮 Bug Hunter режим
- 🛡️ AppSec режим
- 🔐 Валидация флагов
- 📈 Progress tracking
- 🏆 Leaderboard и points

**Для кого:**
- Developers (implementation)
- Students (understanding system)
- Platform Integrators

**Ключевые фичи:**
- Персонализация (`FLAG{..._user123}`)
- Два режима обучения
- Bonus flags за code fixes
- Automated validation

---

### 4. [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) — План реализации

**Содержание:**
- 📅 8-недельный sprint plan
- 🎯 Week-by-week задачи
- 📊 Deliverables для каждого спринта
- 🔧 Development setup
- ✅ Quality checklist
- 🚀 Daily workflow
- 📈 Success metrics

**Для кого:**
- Developers (day-to-day work)
- Project Managers (tracking)
- Team Leads (planning)

**Подход:**
- Vertical slices (end-to-end features)
- MVP за 8 недель (50 vulnerabilities)
- Immediate feedback loops
- Incremental delivery

---

## 🗂️ Структура документов

```
/docs/
├── README.md                    # Этот файл
├── ARCHITECTURE.md              # 🏛️ Основная архитектура
├── VULNERABILITIES_MAP.md       # 🎯 Карта 100+ уязвимостей
├── FLAG_SYSTEM.md               # 🚩 Флаги и режимы обучения
├── IMPLEMENTATION_PLAN.md       # 📅 8-week sprint plan
├── PSDP_part*.md                # 📚 Программа обучения (15 файлов)
└── Ultimate BugBounty Roadmap FULL 150 weeks.md
```

---

## 🎓 Связь с образовательными программами

### PSDP (Punkration Secure Development Program)

PunkMarket покрывает **все 22 раздела PSDP:**

| PSDP Раздел | PunkMarket Coverage | Vulnerabilities |
|-------------|---------------------|-----------------|
| I. Основы безопасной разработки | ✅ 100% | Все уязвимости демонстрируют базовые ошибки |
| II. OWASP Top-10 Core | ✅ 100% | 50+ уязвимостей |
| III. Аутентификация и контроль доступа | ✅ 100% | 15+ уязвимостей (JWT, OAuth, Session, IDOR) |
| IV. Современные протоколы и API | ✅ 100% | REST, GraphQL, WebSockets |
| V. Advanced Web Exploitation | ✅ 100% | XXE, Deserialization, SSTI |
| VI. Client-side Security | ✅ 100% | XSS, DOM, Prototype Pollution |
| VII-VIII. DevSecOps, CI/CD | 🎯 Planned | SAST/DAST integration |
| IX. Threat Modeling | 🎯 Planned | Architecture diagrams with threats |
| X. API Security | ✅ 100% | OWASP API Top 10 |
| ... | ... | ... |

---

### Bug Bounty Roadmap (150 weeks)

PunkMarket соответствует roadmap по неделям:

| Weeks | Phase | Skills | PunkMarket |
|-------|-------|--------|------------|
| 1-24 | Fundamentals | HTTP, XSS, SQLi, IDOR, SSRF | ✅ 100% |
| 25-50 | Advanced | XXE, Deserialization, Smuggling, API | ✅ 80% |
| 51-90 | Expert | JWT/OAuth, Race, Prototype Pollution | ✅ 60% |
| 91-120 | Top Hunter | Cloud, Chains, 0-days | 🎯 Planned |

---

## 🚀 Quick Start Guide

### Для разработчиков:

1. **Прочитать документы в порядке:**
   ```
   README.md (этот файл)
   → ARCHITECTURE.md (понять общую картину)
   → IMPLEMENTATION_PLAN.md (понять workflow)
   → VULNERABILITIES_MAP.md (справочник)
   → FLAG_SYSTEM.md (детали системы флагов)
   ```

2. **Setup окружения:**
   ```bash
   git clone https://github.com/punkration/punkmarket.git
   cd punkmarket
   npm install
   docker-compose up -d
   npm run dev
   ```

3. **Начать с Week 1, Sprint 1.1:**
   - Setup Backend (Node.js + Express)
   - PostgreSQL Database
   - First vulnerability (SQLi-01)

---

### Для студентов:

1. **Выбрать режим:**
   - 🔍 **Bug Hunter** — только поиск уязвимостей и флагов
   - 🛡️ **AppSec** — поиск + исправление кода

2. **Начать с Easy уязвимостей:**
   - SQLi-01: Product Search
   - XSS-01: Search Results
   - IDOR-01: View Order
   - CSRF-01: Update Profile
   - SSRF-01: Avatar URL

3. **Использовать X-Ray:**
   - Включить toggle вверху справа
   - Навести мышь на элемент
   - Изучить backend код
   - Найти уязвимость

4. **Захватить флаг:**
   - Exploit уязвимость
   - Найти флаг в ответе/БД/файле
   - Submit на платформе
   - Получить points!

---

## 📊 Текущий статус проекта

### ✅ Completed (Week 0):

- [x] Архитектурное планирование
- [x] Документация (5 документов)
- [x] Frontend structure (Next.js + React)
- [x] X-Ray система (toggle + panel)
- [x] Mock data (8 products, 10 categories)
- [x] Routing и базовые компоненты

### ⏳ In Progress (Week 1):

- [ ] Backend API (Node.js + Express)
- [ ] PostgreSQL setup
- [ ] First 5 vulnerabilities
- [ ] Flag generation system
- [ ] X-Ray metadata expansion

### 🎯 Planned (Week 2-8):

- Week 2: 5 vulnerabilities + flags
- Week 3-4: 10 vulnerabilities + User Auth
- Week 5-6: 10 vulnerabilities + Advanced features
- Week 7-8: Expert vulnerabilities + AI Coach
- **Week 8: MVP Launch** (50+ vulnerabilities)

---

## 📈 Success Metrics

### Week 2 Checkpoint:
- ✅ 5 working vulnerabilities
- ✅ Backend functional
- ✅ Docker deployment
- ✅ Demo-ready

### Week 4 Checkpoint:
- ✅ 15 vulnerabilities
- ✅ Auth system
- ✅ Flag validation
- ✅ Public demo

### Week 8 Checkpoint (MVP):
- ✅ 50+ vulnerabilities
- ✅ AI Coach
- ✅ Two modes working
- ✅ Beta launch

---

## 🛠️ Tech Stack

### Frontend:
- Next.js 14
- React 18
- TypeScript
- CSS Modules
- X-Ray система

### Backend:
- Node.js + Express (Products, Users)
- Python FastAPI (Orders) — planned
- Java Spring Boot (Reviews) — planned
- PostgreSQL (main DB)
- Redis (cache, sessions)
- Docker & Docker Compose

### Platform:
- Flag validation API
- Progress tracking
- Points & Leaderboard
- AI Coach (GPT-4)
- Code review system

---

## 🎯 Target Audience

### Students:
- 🎓 **Junior Developers** — learning AppSec basics
- 🔍 **Aspiring Bug Hunters** — preparing for bug bounty
- 🛡️ **Security Champions** — becoming AppSec experts
- 👨‍💻 **DevSecOps Engineers** — understanding vulnerabilities

### Organizations:
- 🏢 **Enterprise teams** — security training
- 🎓 **Universities** — cybersecurity courses
- 🏫 **Bootcamps** — practical AppSec programs
- 💼 **Companies** — employee upskilling

---

## 📞 Support & Contribution

### Issues:
- GitHub Issues: [github.com/punkration/punkmarket/issues](https://github.com/punkration/punkmarket/issues)
- Documentation bugs: tag with `docs`
- Vulnerability ideas: tag with `enhancement`

### Contributions:
- Pull Requests welcome!
- Follow contribution guidelines
- Add tests for new vulnerabilities
- Update documentation

### Discussion:
- Discord: [punkration.dev/discord](https://punkration.dev/discord)
- Telegram: @punkration
- Email: support@punkration.dev

---

## 📚 Learning Resources

### Recommended Reading:

**Books:**
- The Web Application Hacker's Handbook
- Bug Bounty Bootcamp (Vickie Li)
- Hacking APIs (Corey Ball)
- HTTP: The Definitive Guide

**Online:**
- PortSwigger Academy
- OWASP Top 10
- HackerOne Reports
- Bugcrowd University

**Practice:**
- **PunkMarket** (этот проект!)
- PortSwigger Labs
- HackTheBox
- TryHackMe

---

## 🗺️ Roadmap

### 2025 Q1 (Week 1-12):
- ✅ Architecture & Documentation (Week 0)
- ⏳ MVP Development (Week 1-8)
- 🎯 Beta Launch (Week 8)
- 🎯 User Testing (Week 9-12)

### 2025 Q2 (Week 13-24):
- Expand to 80 vulnerabilities
- Multi-language backends (Python, Java)
- Advanced features (GraphQL, WebSockets)
- Video tutorials

### 2025 Q3 (Week 25-36):
- 100+ vulnerabilities
- Platform integration
- Certificate system
- Production deployment

### 2025 Q4 (Week 37-48):
- Enterprise features
- API access
- Custom challenges
- White-label option

---

## 🎖️ Certifications

### Bug Hunter Certificate:
- ✅ 80%+ flags captured
- ✅ 20+ writeups
- ✅ Top 20% ranking

### AppSec Certificate:
- ✅ 80%+ flags captured
- ✅ 80%+ fixes approved
- ✅ Avg review score 85+
- ✅ All bonus flags

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-28 | Initial architecture & docs |
| 1.1 | TBD | Flag system implementation |
| 2.0 | TBD | MVP launch (50 vulnerabilities) |

---

## 🎯 Vision Statement

> "PunkMarket стремится стать **золотым стандартом** практического обучения Application Security, предоставляя реалистичную среду с сотнями органично внедренных уязвимостей, где студенты развивают навыки, необходимые для работы в реальных bug bounty программах и AppSec командах."

---

## ⚖️ Legal & Ethics

### Важно:

- ✅ **Только для обучения** — не использовать на production
- ✅ **Изолированная среда** — Docker sandbox
- ✅ **Нет реальных данных** — только mock data
- ✅ **Ответственное раскрытие** — учим ethical hacking
- ✅ **Соответствие законам** — легальная практическая среда

---

## 🙏 Acknowledgments

### Вдохновение:
- PortSwigger Academy
- OWASP WebGoat
- HackTheBox
- Damn Vulnerable Web Application (DVWA)

### Программа обучения:
- OWASP Top 10
- OWASP API Security Top 10
- MITRE CWE Top 25
- NIST Secure Software Development Framework

---

## 📧 Contact

**Punkration Team**

- Website: [punkration.dev](https://punkration.dev)
- Email: info@punkration.dev
- GitHub: [github.com/punkration](https://github.com/punkration)
- Twitter: [@punkration](https://twitter.com/punkration)

---

**Let's make the web more secure, one vulnerability at a time! 🚀**

---

**Last Updated:** 2025-11-28  
**Version:** 1.0  
**Status:** 🟢 Documentation Complete, Ready for Development
