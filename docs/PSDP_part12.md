# PSDP — Файл 12/15  
## Раздел X. API Security (OWASP API Top-10)  
### Полная теоретическая часть (Enterprise + РФ)

---

# 🔌 Раздел X. API Security  
## OWASP API Security Top-10 + российские требования (финтех/банки/enterprise)

API — основа современных приложений.  
90% уязвимостей в мобильных приложениях, SPA, микросервисах — это API-баги.

Этот раздел критичен для российских компаний:  
- финтех (ЦБ РФ требует защиту API),  
- госуслуги,  
- телеком и КИИ,  
- корпоративные системы.

---

# X-01. API1: Broken Object Level Authorization (BOLA / IDOR)

## 🎯 Самая частая уязвимость API в мире и в РФ

Проблема:
```
GET /api/user/123  
→ возвращает данные пользователя 123 без проверки владельца
```

## Причина:
- Backend доверяет frontend  
- Нет проверки “кто запрашивает ресурс”  

## Защита:
- проверка владельца ресурса на сервере  
- централизованный ACL  
- запрет ручного формирования идентификаторов  
- избегать автоповышения прав

---

# X-02. API2: Broken Authentication

Типовые ошибки:
- слишком длинный TTL токенов  
- отсутствие ротации  
- хранение токенов в localStorage  
- слабые refresh-токены  
- неправильный OAuth/OIDC  
- отсутствие ограничения попыток  

---

# X-03. API3: Excessive Data Exposure

Ошибка:
Backend отдаёт слишком много данных, надеясь что frontend “скроет лишнее”.

Пример:
```json
{
  "id": 123,
  "name": "Ivan",
  "role": "admin",
  "passwordHash": "..."
}
```

## Защита:
- формировать DTO на сервере  
- “принцип минимально необходимой информации”  

---

# X-04. API4: Lack of Rate Limiting

Без rate limiting API можно:
- brute-force  
- подбирать токены  
- спамить операции  
- злоупотреблять логикой

## Защита:
- лимиты по IP, userID, device  
- капчи  
- device fingerprint  
- circuit breaker  

---

# X-05. API5: Broken Function Level Authorization

Разница между “ролями” и “функциями”.

Пример:
```
POST /admin/delete
```
доступен обычному пользователю.

---

# X-06. API6: Mass Assignment

Проблема:
Backend маппит JSON напрямую в объект модели.

Пример JSON:
```json
{
  "email": "a@b.com",
  "role": "admin"
}
```

Если поле `role` не отфильтровано → эскалация привилегий.

Защита:
- allow-list полей  
- DTO вместо моделей  

---

# X-07. API7: Security Misconfiguration

Примеры:
- открытый Swagger в проде  
- включён debug  
- неверный CORS  
- отладочные эндпоинты  

---

# X-08. API8: Injection

Все виды инъекций:
- SQLi  
- NoSQLi  
- SSTI  
- LDAP injection  
- XPath injection  
- command injection  

---

# X-09. API9: Improper Asset Management

Проблема:
- старая версия API остаётся доступной  
- нет документации  
- нет ограничения use-case  
- нет контроля deprecated endpoints  

Защита:
- версия API в URL  
- sunset-политики  
- регулярные ревизии  

---

# X-10. API10: SSRF

Слабые валидации URL → API делает запросы в локальную сеть:
```
http://169.254.169.254/latest/meta-data
```

---

# X-11. GraphQL-specific API Risks

- introspection  
- deep queries  
- circular queries  
- безлимитные вложения  
- резолвер без ACL  

---

# X-12. Webhooks / Callbacks Security

Ошибки:
- доверие к Source IP  
- отсутствие подписи  
- отсутствие replay protection  
- open redirects  

## Защита:
- подпись (HMAC)  
- timestamp + nonce  
- strict-allow-list адресов  

---

# X-13. Mobile API Security (Android/iOS)

Для мобильных клиентов актуальны:
- certificate pinning  
- защита токенов  
- защита от MITM  
- защита от rooted/jailbreak  
- anti-debug  

---

# X-14. Bot Protection и API Anti-Abuse

API должны защищаться от:
- парсинга  
- автокликеров  
- фрода  
- скриптов массовых операций  

Инструменты:
- поведенческий анализ  
- ML-модели аномалий  
- device fingerprint  
- rate limiting  
- CAPTCHA (на risk-based операциях)

---

# X-15. Российские требования по безопасности API

## ЦБ РФ:
- защита от фрода обязательна  
- API логируются  
- авторизация и аутентификация должны быть централизованы  

## ГОСТ Р 56939–2024:
- проверка входных данных  
- защита от всех классов инъекций  
- безопасный контроль доступа  
- шифрование данных  

## ФЗ-152:
- защита ПДн в API  
- недопустимость передачи лишних данных  

## ФЗ-187 (КИИ):
- обязательный контроль подлинности  
- защита каналов связи  
- управление уязвимостями API  

---

# ✔ Часть 12 завершена.

