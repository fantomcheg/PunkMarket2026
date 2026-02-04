# 🎯 Режимы работы PunkMarket

## Обновление дизайна (02.12.2025)

### Что было изменено:

#### 1. **Добавлен переключатель режимов Red Team / AppSec**

Теперь в шапке сайта есть переключатель между двумя режимами обучения:

##### 🔴 **Red Team Mode (по умолчанию)**
- **Цель**: Найти уязвимости и захватить флаги
- **Роль**: Bug Hunter / Pentester
- **Особенности**:
  - Бэкенд НЕ выбирается (скрыт)
  - Для Red Team без разницы на каком бэкенде работает приложение
  - Фокус на эксплуатации уязвимостей
  - Работа только с готовым приложением

##### 🔵 **AppSec Mode**
- **Цель**: Найти, exploit и исправить код
- **Роль**: Secure Developer / AppSec Engineer
- **Особенности**:
  - **Backend Selector доступен** (Node.js / Java / PHP)
  - Студент выбирает стек, который будет редактировать
  - Фокус на исправлении кода и secure coding
  - Работа с кодом + эксплуатация

---

## 🎨 Визуальные элементы

### ModeSelector компонент
Расположение: Header (после логотипа)

**Структура:**
```
[🔴 Red Team] [🔵 AppSec]
  Bug Hunter    Secure Developer
```

**Состояния:**
- **Active Red Team**: Красное свечение, анимация пульса
- **Active AppSec**: Синее свечение, анимация пульса
- **Hover**: Подсветка при наведении

### ModeIndicator компонент
Расположение: Самый верх страницы (фиксированная полоска 3px)

**Визуализация:**
- **Red Team**: Красная светящаяся полоска с градиентом
- **AppSec**: Синяя светящаяся полоска с градиентом

---

## 🔧 Технические детали

### Файловая структура:

```
src/components/
├── ModeSelector/
│   ├── ModeSelector.tsx       # Компонент переключателя
│   ├── ModeSelector.module.css
│   └── index.ts
│
├── ModeIndicator/
│   ├── ModeIndicator.tsx      # Индикатор сверху страницы
│   ├── ModeIndicator.module.css
│   └── index.ts
│
└── Header/
    ├── Header.tsx             # Обновлён: добавлен state для mode
    └── Header.module.css      # Обновлён: стили для ModeSelector
```

### Логика работы:

1. **По умолчанию**: режим `redteam` активен
2. **При клике на AppSec**:
   - Меняется состояние `mode` в Header
   - Появляется BackendSelector с анимацией
   - Меняется цвет ModeIndicator
3. **При клике на Red Team**:
   - BackendSelector скрывается
   - Возврат к красному индикатору

### TypeScript типы:

```typescript
export type Mode = 'redteam' | 'appsec';

interface ModeSelectorProps {
  onModeChange?: (mode: Mode) => void;
}

interface ModeIndicatorProps {
  mode: Mode;
}
```

---

## 🎯 Использование в других компонентах

### Пример получения текущего режима:

```tsx
import { useState } from 'react';
import ModeSelector, { Mode } from '@/components/ModeSelector';

const MyComponent = () => {
  const [mode, setMode] = useState<Mode>('redteam');

  return (
    <div>
      <ModeSelector onModeChange={setMode} />
      
      {mode === 'redteam' ? (
        <div>Red Team контент</div>
      ) : (
        <div>AppSec контент</div>
      )}
    </div>
  );
};
```

---

## 🚀 Будущие улучшения

### Запланировано:

1. **Context API для глобального состояния режима**
   - Доступ к `mode` из любого компонента
   - Сохранение выбора в localStorage

2. **Разный контент в зависимости от режима**
   - Red Team: больше информации о векторах атак
   - AppSec: больше информации о secure coding

3. **Статистика по режимам**
   - Время в каждом режиме
   - Количество найденных уязвимостей
   - Количество исправленного кода

4. **Персонализация X-Ray**
   - Red Team: показывать векторы атак
   - AppSec: показывать исправленный код

---

## 📝 Changelog

### v1.1.0 (02.12.2025)
- ✅ Добавлен ModeSelector с Red Team / AppSec режимами
- ✅ Добавлен ModeIndicator (полоска сверху)
- ✅ BackendSelector теперь показывается только в AppSec режиме
- ✅ По умолчанию активен Red Team режим
- ✅ Анимации переключения режимов
- ✅ Responsive дизайн для мобильных устройств

---

Made with ❤️ by Punkration Team
