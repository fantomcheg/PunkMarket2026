# 🎯 Фильтры с уязвимостями - OmniMarket

## 📊 Обновление товаров

### Электроника (категория 1): **104 товара**
- 40+ смартфонов (Samsung, Apple, Xiaomi, OPPO, Realme, OnePlus, Google, Motorola)
- 25 наушников и аудио (Sony, Apple, Bose, JBL, Sennheiser)
- 20 умных часов и браслетов (Apple Watch, Samsung, Xiaomi, Garmin)
- 15 планшетов (iPad, Galaxy Tab, Xiaomi Pad)
- Различные характеристики: память, RAM, экраны, цвета

### Компьютеры (категория 2): **91 товар**
- 50 ноутбуков (Apple MacBook, ASUS ROG, Lenovo Legion, HP, Dell, Acer, MSI, Razer)
- 20 мониторов (ASUS, Samsung, LG, Dell, BenQ)
- 6 клавиатур (Logitech, Razer, Corsair, SteelSeries)
- 10 мышей (Logitech, Razer, Corsair)
- 5+ веб-камер, микрофонов, наушников

### Остальные категории: **42 товара** (по 3 в каждой)

**Итого: 237 товаров**

---

## 🔍 Расширенный интерфейс Product

```typescript
export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  inStock: boolean;
  categoryId: number;
  category: string;
  
  // Новые поля для фильтров:
  brand?: string;        // Бренд
  color?: string;        // Цвет
  storage?: string;      // Память (128GB, 256GB...)
  ram?: string;          // ОЗУ (8GB, 16GB...)
  screen?: string;       // Экран (6.7", 15.6"...)
  processor?: string;    // Процессор
  warranty?: number;     // Гарантия в месяцах
  seller?: string;       // Продавец (для IDOR!)
  discount?: number;     // Скидка в %
}
```

---

## 🛡️ Компонент FilterPanel

### Расположение
`src/components/FilterPanel/FilterPanel.tsx`

### Основные фильтры:

1. **Поиск в категории** ⚠️ SQL Injection
   - Нефильтрованный ввод
   - CWE-89
   - Severity: Critical

2. **Бренд** (множественный выбор)
   - Динамически загружается для категории
   - Apple, Samsung, Xiaomi, ASUS, Lenovo, и т.д.

3. **Диапазон цен**
   - Slider + числовые поля
   - Автоматически подстраивается под категорию

4. **Рейтинг** (радио-кнопки)
   - От 4.5 ⭐
   - От 4.0 ⭐
   - От 3.5 ⭐

5. **Дополнительно** (чекбоксы)
   - Только в наличии
   - Со скидкой

6. **Продавец** ⚠️ IDOR
   - CWE-639
   - Severity: High
   - Можно выбрать "Admin (скрытый)"

7. **Сортировка**
   - По популярности
   - Сначала дешевле
   - Сначала дороже
   - По рейтингу
   - По размеру скидки

---

## ⚠️ УЯЗВИМОСТИ

### 1. SQL Injection в поиске

**Место:** `FilterPanel` → поле "Поиск в категории"

```typescript
// ⚠️ УЯЗВИМЫЙ КОД
const searchMatch = !filters.search || 
  p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
  p.brand?.toLowerCase().includes(filters.search.toLowerCase());
```

**Payload для тестирования:**
```sql
' OR '1'='1
' UNION SELECT * FROM users--
'; DROP TABLE products--
```

**Подсказка в UI:**
```
💡 Попробуйте: ' OR '1'='1
```

**data-xray атрибуты:**
```html
<input
  data-xray-id="search_input"
  data-xray-vuln="sql-injection"
  data-xray-cwe="CWE-89"
  data-xray-severity="critical"
/>
```

---

### 2. IDOR в выборе продавца

**Место:** `FilterPanel` → селект "Продавец"

```typescript
// ⚠️ УЯЗВИМЫЙ КОД
const sellerMatch = !filters.seller || p.seller === filters.seller;
```

**Проблема:**
- Можно выбрать любого продавца по ID
- Есть скрытая опция "Admin (ID: 999)"
- Нет проверки прав доступа

**HTML:**
```html
<select data-xray-vuln="idor" data-xray-cwe="CWE-639">
  <option value="">Все продавцы</option>
  <option value="1">OmniMarket</option>
  <option value="2">TechStore</option>
  <option value="3">ElectroPlus</option>
  <option value="4">GadgetHub</option>
  <option value="999">Admin (скрытый)</option>  ⚠️
</select>
```

**Подсказка в UI:**
```
💡 Попробуйте выбрать "Admin"
```

---

### 3. Потенциальные уязвимости для будущего API

Когда будет создан backend, фильтры можно использовать для:

#### NoSQL Injection
```javascript
// Уязвимый MongoDB запрос
db.products.find({
  brand: filters.brand,  // ⚠️ Можно подставить {"$ne": null}
  price: {
    $gte: filters.priceMin,
    $lte: filters.priceMax
  }
});
```

**Payload:**
```json
{
  "brand": {"$ne": null},
  "price": {"$gt": 0}
}
```

#### XSS в результатах
```typescript
// Если результаты рендерятся без экранирования
<div>{searchQuery}</div>  // ⚠️ XSS!
```

**Payload:**
```html
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
```

---

## 🎨 X-Ray Mode интеграция

### CSS подсветка уязвимостей

```css
[data-xray-enabled="true"] [data-xray-vuln="sql-injection"]::after {
  content: '⚠️ SQL Injection';
  background: #dc3545;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}

[data-xray-enabled="true"] [data-xray-vuln="idor"]::after {
  content: '⚠️ IDOR';
  background: #fd7e14;
  color: white;
}

[data-xray-enabled="true"] [data-xray-vuln] {
  outline: 2px dashed #dc3545;
  outline-offset: 4px;
}
```

---

## 📝 Использование

### Интеграция в страницу категории

```typescript
import FilterPanel, { FilterState } from '@/components/FilterPanel/FilterPanel';

const [filters, setFilters] = useState<FilterState>({
  brands: [],
  priceMin: 0,
  priceMax: 200000,
  rating: 0,
  inStock: false,
  hasDiscount: false,
  sortBy: 'popular',
});

<FilterPanel 
  categoryId={Number(id)} 
  onFilterChange={setFilters}
/>
```

### Применение фильтров

```typescript
const filteredProducts = products.filter(p => {
  const categoryMatch = p.categoryId === Number(id);
  const priceMatch = p.price >= filters.priceMin && p.price <= filters.priceMax;
  const brandMatch = filters.brands.length === 0 || 
                     (p.brand && filters.brands.includes(p.brand));
  const ratingMatch = filters.rating === 0 || p.rating >= filters.rating;
  const stockMatch = !filters.inStock || p.inStock;
  const discountMatch = !filters.hasDiscount || 
                        (p.oldPrice && p.oldPrice > p.price);
  
  // ⚠️ Уязвимые фильтры
  const searchMatch = !filters.search || 
    p.title.toLowerCase().includes(filters.search.toLowerCase());
  const sellerMatch = !filters.seller || p.seller === filters.seller;
  
  return categoryMatch && priceMatch && brandMatch && ratingMatch && 
         stockMatch && discountMatch && searchMatch && sellerMatch;
});
```

---

## 🚀 Страницы для тестирования

### Электроника (104 товара, множество брендов):
```
http://localhost:3000/category/1
```

**Тест SQL Injection:**
1. Введите в поиск: `' OR '1'='1`
2. Должны появиться все товары категории

**Тест фильтра по бренду:**
1. Выберите "Apple" - покажет только iPhone, iPad, AirPods, MacBook
2. Выберите "Samsung" - только Samsung товары

### Компьютеры (91 товар, игровые и офисные):
```
http://localhost:3000/category/2
```

**Тест IDOR:**
1. Выберите продавца "Admin (скрытый)"
2. Должны отфильтроваться товары админа

**Тест сортировки:**
1. "По размеру скидки" - товары со скидками вверху
2. "Сначала дороже" - MacBook Pro, игровые ноутбуки вверху

---

## 📚 Дополнительные функции экспорта

```typescript
// В src/data/products.ts:

export const getBrands = (categoryId?: number): string[] => {
  const filteredProducts = categoryId ? 
    products.filter(p => p.categoryId === categoryId) : products;
  const brands = new Set(filteredProducts
    .map(p => p.brand)
    .filter(Boolean) as string[]);
  return Array.from(brands).sort();
};

export const getPriceRange = (categoryId?: number): [number, number] => {
  const filteredProducts = categoryId ? 
    products.filter(p => p.categoryId === categoryId) : products;
  const prices = filteredProducts.map(p => p.price);
  return [Math.min(...prices), Math.max(...prices)];
};
```

---

## ✅ Чек-лист для студентов

### Red Team Mode:
- [ ] Найти SQL Injection в поиске
- [ ] Эксплуатировать IDOR для доступа к админским товарам
- [ ] Попробовать XSS в поле поиска
- [ ] Манипулировать ценовым диапазоном (отрицательные значения)
- [ ] Обойти фильтр "Только в наличии"

### AppSec Mode:
- [ ] Добавить санитизацию ввода в поиске
- [ ] Реализовать проверку прав для селектора продавца
- [ ] Добавить валидацию диапазона цен
- [ ] Экранировать вывод результатов поиска
- [ ] Добавить rate limiting для фильтров

---

## 🎯 Итог

✅ **237 товаров** с реалистичными характеристиками
✅ **Продвинутые фильтры** с множественным выбором
✅ **2 критические уязвимости** готовы к эксплуатации
✅ **X-Ray Mode** подсветка для обучения
✅ **Реалистичный UX** как в настоящем магазине

Теперь студенты могут практиковаться на **почти 200 товарах в Электронике и Компьютерах**! 🚀
