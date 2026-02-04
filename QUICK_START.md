# 🚀 OmniMarket - Быстрый старт

## ✅ Текущий статус: ПОЛНОСТЬЮ ГОТОВО

### 📦 Что работает:

#### 1. **50 товаров в 16 категориях**
- Электроника (4) | Компьютеры (4) | Бытовая техника (3) | Одежда (3)
- Обувь (3) | Дом и сад (3) | Детские товары (3) | Красота (3)
- Спорт (3) | Продукты (3) | Зоотовары (3) | Книги (3)
- Авто (3) | Мебель (3) | Игры (3) | Хобби (3)

#### 2. **Навигация**
✅ Клик по категории → фильтрация товаров
✅ Breadcrumbs
✅ Сортировка (по популярности, цене, рейтингу)
✅ Фильтры (цена, рейтинг, скидки)

#### 3. **Страницы**
✅ Главная: `http://localhost:3000`
✅ Категория: `http://localhost:3000/category/{1-16}`
✅ Товар: `http://localhost:3000/product/{id}`

#### 4. **Компоненты**
✅ Header с режимами Red Team / AppSec
✅ TopNav с быстрыми ссылками (Omni fresh, Omni Карта...)
✅ ModeSelector (Red Team / AppSec)
✅ ThemeToggle (Light / Dark)
✅ CatalogMenu (выпадающий каталог)
✅ ProductCard (карточки товаров)
✅ ReviewCard + ReviewForm (отзывы)
✅ Categories (16 категорий)

---

## 🎯 Как использовать:

### Запустить сервер:
```bash
cd /home/xrapid/Omnicorp/PunkMarket
npm run dev
```

### Открыть в браузере:
```
http://localhost:3000
```

### Протестировать категории:
1. Открыть главную страницу
2. Кликнуть на любую категорию (например "💻 Компьютеры")
3. Увидеть отфильтрованные товары (4 товара для Компьютеров)
4. Попробовать сортировку и фильтры

---

## 📂 Структура файлов:

```
PunkMarket/
├── src/
│   ├── components/
│   │   ├── Header/           # Шапка с навигацией
│   │   ├── TopNav/           # Верхняя панель
│   │   ├── ModeSelector/     # Переключатель режимов
│   │   ├── ThemeToggle/      # Переключатель темы
│   │   ├── CatalogMenu/      # Каталог товаров
│   │   ├── ProductCard/      # Карточка товара
│   │   ├── Categories/       # 16 категорий
│   │   ├── ReviewCard/       # Карточка отзыва
│   │   └── ReviewForm/       # Форма отзыва
│   ├── data/
│   │   ├── products.ts       # 50 товаров ⭐
│   │   └── reviews.ts        # Отзывы
│   ├── pages/
│   │   ├── index.tsx         # Главная
│   │   ├── category/[id].tsx # Страница категории
│   │   └── product/[id].tsx  # Страница товара
│   └── styles/
│       ├── globals.css
│       ├── Category.module.css
│       └── Product.module.css
├── docker/
│   ├── postgres/init.sql     # Схема PostgreSQL
│   └── mongo/init-mongo.js   # Инициализация MongoDB
├── PRODUCTS_SUMMARY.md       # Список всех 50 товаров
├── STATUS_COMPLETED.md       # Текущий статус
└── README.md
```

---

## 🔧 Следующие шаги (когда понадобится):

### 1. Настроить базы данных:
```bash
# PostgreSQL (для SQL инъекций)
sudo systemctl start postgresql
createdb omnimarket

# MongoDB (для NoSQL инъекций)
sudo systemctl start mongodb
```

### 2. Создать API с уязвимостями:
- SQL Injection в поиске
- XSS в отзывах
- IDOR в профиле пользователя
- CSRF в формах
- NoSQL Injection в фильтрах

### 3. Интегрировать X-Ray Mode:
- Подсветка уязвимых элементов
- Подсказки для студентов
- Отображение CWE

---

## 📝 Документация:

- **Полный список товаров**: `PRODUCTS_SUMMARY.md`
- **Статус проекта**: `STATUS_COMPLETED.md`
- **Уязвимости в TopNav**: `docs/TOPNAV_VULNERABILITIES.md`
- **Каталог меню**: `docs/CATALOG_MENU.md`
- **Phase 2 обновления**: `docs/UPDATE_PHASE_2.md`

---

## 🎉 Готово к использованию!

Все категории заполнены, навигация работает, сервер запущен.
Можете приступать к тестированию и добавлению уязвимостей! 🚀
