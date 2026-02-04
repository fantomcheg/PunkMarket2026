# 📂 Выпадающий каталог товаров

## Обзор
Реализован полноценный выпадающий каталог товаров с боковой навигацией, как на Ozon.ru.

---

## 🎨 Дизайн и UX

### Структура
```
┌─────────────────────────────────────────────────┐
│                  OVERLAY (затемнение)            │
│  ┌───────────────────────────────────────────┐  │
│  │  Категории  │  Подкатегории               │  │
│  │  ─────────  │  ─────────────              │  │
│  │  📱 Электр. │  → Смартфоны                │  │
│  │  💻 Компью. │  → Планшеты                 │  │
│  │  🏠 Бытовая │  → Умные часы               │  │
│  │  ...        │  ...                        │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Компоненты
- **CatalogMenu** - основной компонент выпадающего меню
- **Overlay** - полупрозрачный фон для закрытия меню
- **Categories** - список категорий (левая колонка)
- **Subcategories** - подкатегории выбранной категории (правая панель)

---

## 📁 Структура файлов

```
src/components/CatalogMenu/
├── CatalogMenu.tsx          # Основной компонент
├── CatalogMenu.module.css   # Стили
└── index.ts                 # Экспорт
```

---

## 🔧 Технические детали

### Открытие/закрытие
```tsx
// Header.tsx
const [catalogOpen, setCatalogOpen] = useState(false);

<button onClick={() => setCatalogOpen(!catalogOpen)}>
  Каталог
</button>

<CatalogMenu 
  isOpen={catalogOpen} 
  onClose={() => setCatalogOpen(false)} 
/>
```

### Категории (12 штук)
```tsx
const categories = [
  { id: 1, name: 'Электроника', icon: '📱', subcategories: [...] },
  { id: 2, name: 'Компьютеры', icon: '💻', subcategories: [...] },
  { id: 3, name: 'Бытовая техника', icon: '🏠', subcategories: [...] },
  // ... 9 остальных
];
```

### Навигация по hover
```tsx
const [activeCategory, setActiveCategory] = useState<number | null>(null);

<div 
  onMouseEnter={() => setActiveCategory(category.id)}
  className={activeCategory === category.id ? styles.active : ''}
>
```

---

## 🎯 Точки уязвимостей

Каждый элемент меню помечен для X-Ray:

### Основное меню
```tsx
<div data-xray-id="catalog_menu">
```

### Категории
```tsx
<div data-xray-id="category_1">Электроника</div>
<div data-xray-id="category_2">Компьютеры</div>
// ... и т.д.
```

### Подкатегории
```tsx
<a data-xray-id="subcategory_1_0">Смартфоны</a>
<a data-xray-id="subcategory_1_1">Планшеты</a>
// format: subcategory_{category_id}_{index}
```

---

## 🔴 Потенциальные уязвимости

### 1. SQL Injection в фильтре категорий
```javascript
/api/products?category=electronics' OR 1=1--
```
**CWE-89**: SQL Injection

### 2. XSS через название подкатегории
```javascript
// Если подкатегория сохраняется из admin панели
subcategory: "<img src=x onerror=alert(1)>"
```
**CWE-79**: Stored XSS

### 3. IDOR - доступ к скрытым категориям
```javascript
/api/categories/999 // закрытая VIP категория
```
**CWE-639**: IDOR

### 4. NoSQL Injection в поиске
```javascript
/api/products/search?category[$ne]=null
```
**CWE-943**: NoSQL Injection

### 5. Path Traversal при загрузке иконок
```javascript
/api/category/icon?file=../../../etc/passwd
```
**CWE-22**: Path Traversal

---

## 🔵 Blue Team - Исправления

### SQL Injection → Prepared Statements
```javascript
// ❌ Уязвимо
db.query(`SELECT * FROM products WHERE category='${category}'`)

// ✅ Безопасно
db.query('SELECT * FROM products WHERE category=?', [category])
```

### XSS → Санитизация вывода
```javascript
// ❌ Уязвимо
res.send(`<h2>${subcategory}</h2>`)

// ✅ Безопасно
const escape = require('escape-html')
res.send(`<h2>${escape(subcategory)}</h2>`)
```

### IDOR → Проверка доступа
```javascript
// ❌ Уязвимо
app.get('/api/categories/:id', (req, res) => {
  const category = db.findCategory(req.params.id)
  res.json(category)
})

// ✅ Безопасно
app.get('/api/categories/:id', authMiddleware, (req, res) => {
  const category = db.findCategory(req.params.id)
  if (category.is_private && !req.user.is_premium) {
    return res.status(403).json({error: 'Premium only'})
  }
  res.json(category)
})
```

---

## 🎨 Анимации

### Появление меню
```css
@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### Hover эффекты
```css
.categoryItem:hover {
  background: var(--bg-white);
  border-left-color: var(--primary-color);
  transform: translateX(4px);
}
```

---

## 📱 Адаптивность

### Desktop (>768px)
- Меню слева
- Подкатегории справа
- Ширина: 900px

### Tablet (480-768px)
- Меню: 200px
- Подкатегории: flex
- Ширина: 100%

### Mobile (<480px)
- Вертикальная структура
- Категории сверху (макс. высота 200px)
- Подкатегории снизу
- Полная ширина экрана

---

## ✅ Чек-лист реализации

- [x] Создан компонент CatalogMenu
- [x] 12 категорий с иконками
- [x] 6-10 подкатегорий в каждой
- [x] Hover навигация (как на Ozon)
- [x] Overlay для закрытия
- [x] Анимации появления
- [x] Адаптивный дизайн
- [x] data-xray-id на всех элементах
- [x] Документированы 5+ уязвимостей
- [x] Интеграция в Header

---

## 🚀 Использование

```tsx
import CatalogMenu from '@/components/CatalogMenu';

// В компоненте
const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(true)}>
  Каталог
</button>

<CatalogMenu 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
/>
```

---

Made with ❤️ for OmniCorp Educational Platform
