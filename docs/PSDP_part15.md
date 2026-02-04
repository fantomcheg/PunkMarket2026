# PSDP — Файл 15/15  
## Раздел XVI–XXII. Privacy • Zero Trust • Security Testing • Logging/Monitoring • WAF • Advanced Topics  
### Финальная теоретическая часть (Enterprise + РФ)

---

# 🛡 Раздел XVI. Privacy & Data Protection  
## Персональные данные, приватность, защита информации

В РФ защита ПДн регулируется:

- **ФЗ-152**,  
- **152-ПП**,  
- **152-ФЗ модели угроз**,  
- **ГОСТ Р 56939–2024**,  
- **приказы ФСТЭК**,  
- **положения ЦБ РФ**.

---

# XVI-01. Основные категории данных

- персональные данные  
- специальные категории  
- биометрические данные  
- коммерческая тайна  
- платёжные данные  
- данные УЗ  
- системная телеметрия  

---

# XVI-02. Политики Privacy by Design

- минимизация данных  
- минимальное хранение  
- анонимизация  
- псевдонимизация  
- разделение по зонам доступа  
- защитное логирование  

---

# XVI-03. Типичные ошибки

- сбор лишних данных  
- логирование ПДн в текстовые логи  
- отправка ПДн в сторонние сервисы  
- хранение ПДн в localStorage  
- передача ПДн без шифрования  

---

# XVI-04. Приватность в мобильных приложениях

- защита каналов  
- ограничение доступа к датчикам  
- разрешения Android/iOS  
- защита трекинга  

---

# 🏰 Раздел XVII. Zero Trust для приложений

Zero Trust = нет доверия ни пользователю, ни устройству, ни внутренней сети.

---

# XVII-01. Принципы Zero Trust

- «Никому не доверяй по умолчанию»  
- аутентифицируй каждую операцию  
- авторизуй каждый запрос  
- минимальные права  
- микросегментация  
- полная видимость событий  

---

# XVII-02. Zero Trust в API

Каждый запрос:
- должен быть аутентифицирован  
- должен иметь строгое ACL  
- должен иметь short-lived токены  

---

# XVII-03. Zero Trust в микросервисах

- mutual TLS  
- ограниченный межсервисный трафик  
- service identity  
- strict egress control  

---

# 🔍 Раздел XVIII. Security Testing  
## SAST • DAST • IAST • RASP • Pentest • Bug Bounty

---

# XVIII-01. SAST

Статика ищет:
- SQLi  
- XSS  
- SSRF  
- hardcoded secrets  

Проблемы:
- false positives  
- необходимость тюнинга  

---

# XVIII-02. DAST

Ищет:
- XSS  
- SQLi  
- misconfigurations  
- слабые токены  

Нужно:
- конфигурация  
- настройка scope  
- отключение лишних доменов  
- проверка context  

---

# XVIII-03. IAST / RASP

IAST = анализ в рантайме  
RASP = защита в рантайме

Используются в банках и enterprise.

---

# XVIII-04. Pentest vs DAST

Pentest:
- ручной  
- экспертный  
- проверяет бизнес-логику  
- выявляет сложные цепочки  

DAST:
- автоматизирован  
- покрывает только поверхностные уязвимости  

---

# XVIII-05. Bug Bounty

В РФ популярны:
- BI.ZONE Bug Bounty  
- Swordfish  
- Standoff  

---

# 📊 Раздел XIX. Logging, Monitoring, Incident Response

---

# XIX-01. Логирование

Логируем:
- ошибки  
- действия с привилегиями  
- аутентификацию  
- операции с ПДн  
- изменения прав  

Не логируем:
- пароли  
- токены  
- ключи  

---

# XIX-02. SIEM / SOC

Система корреляции событий:

- сбор логов  
- корреляция  
- оповещение  
- расследование  
- кейс-менеджмент  

---

# XIX-03. Incident Response (IR)

Этапы:
1. выявление  
2. анализ  
3. containment  
4. eradication  
5. восстановление  
6. пост-инцидентный разбор  

---

# 🧱 Раздел XX. Security Culture & Security Champions

---

# XX-01. Security Culture

Культура безопасности строится через:
- обучение  
- регулярные тренинги  
- геймификацию  
- признание (награждение безопасных разработчиков)  
- наличие AppSec  
- стандарты и правила  

---

# XX-02. Security Champions

Security Champion — разработчик, который помогает продвигать безопасную разработку в команде.

Задачи:
- координировать угрозы  
- помогать review  
- обучать коллег  
- первичная оценка рисков  

---

# 🛡 Раздел XXI. WAF, защитные механизмы и архитектурные паттерны

---

# XXI-01. WAF: принципы работы

- сигнатурный анализ  
- поведенческий анализ  
- anomaly detection  
- rate limiting  
- bot protection  

---

# XXI-02. Архитектурные паттерны защищённых приложений

- defense-in-depth  
- fail-safe defaults  
- least privilege  
- secure defaults  
- deny-by-default  
- zero-trust patterns  
- токенизация  
- микросегментация  

---

# XXI-03. CDN Security

- защита от DDoS  
- TLS termination  
- cache poisoning защита  
- WAF на периметре  

---

# 🧪 Раздел XXII. Advanced Topics

---

# XXII-01. Инъекции продвинутого уровня

- GraphQL deep recursion  
- HTTP desync  
- server-side prototype pollution  
- advanced SSRF bypass  
- deserialization gadget chains  

---

# XXII-02. Microservice attack techniques

- service-to-service impersonation  
- trust boundary bypass  
- insecure mTLS  
- race conditions across services  

---

# XXII-03. Side-channel атаки

- тайминговые атаки  
- атаки по размеру ответа  
- компиляционные утечки  

---

# XXII-04. Modern browser exploitation basics

- Spectre/Meltdown class  
- sandbox escape  
- JIT spraying  
- WASM exploitation  

---

# ✔ Полная теоретическая часть завершена.  
## Вы сформировали полный PSDP: 15 файлов, 22 раздела, 350+ страниц теории.

