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
  brand?: string;
  color?: string;
  storage?: string;
  ram?: string;
  screen?: string;
  processor?: string;
  warranty?: number;
  seller?: string;
  discount?: number;
  description?: string;
}

// Детерминированная функция генерации случайных чисел на основе seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Функция генерации описания товара
function generateDescription(title: string, category: string, id: number): string {
  const titleLower = title.toLowerCase();
  
  // Смартфоны
  if (titleLower.includes('смартфон')) {
    const brand = title.split(' ')[1];
    const storage = title.match(/(\d+)GB/)?.[1] || '128';
    return `📱 Описание товара

Современный смартфон ${brand} с передовыми технологиями и стильным дизайном. Идеально подходит для работы, развлечений и повседневного использования.

✨ Основные характеристики:
• Встроенная память: ${storage} ГБ
• Высокопроизводительный процессор для плавной работы
• Качественная камера для ярких фотографий
• Долгая работа от аккумулятора
• Поддержка быстрой зарядки

🎁 В комплекте:
• Смартфон
• Зарядное устройство
• USB-кабель
• Документация

⚡ Преимущества:
Стильный дизайн, мощная производительность, отличная камера, современные технологии связи.`;
  }
  
  // Наушники
  if (titleLower.includes('наушники') || titleLower.includes('tws')) {
    const brand = title.split(' ')[1] || title.split(' ')[2];
    return `🎧 Описание товара

Премиальные наушники ${brand} с превосходным качеством звука и продуманной эргономикой. Идеальны для музыки, звонков и развлечений.

✨ Основные характеристики:
• Активное шумоподавление
• Беспроводное подключение Bluetooth 5.0
• До 30 часов автономной работы
• Быстрая зарядка
• Влагозащита IPX4

🎵 Качество звука:
Глубокие басы, чистые высокие частоты, объёмное звучание. Поддержка Hi-Res аудио и кодеков высокого качества.

⚡ Преимущества:
Комфортная посадка, долгая работа, отличная шумоизоляция, премиальные материалы.`;
  }
  
  // Умные часы
  if (titleLower.includes('часы') || titleLower.includes('браслет')) {
    return `⌚ Описание товара

Умные часы с широким функционалом для активного образа жизни. Отслеживание здоровья, фитнес-функции и уведомления на запястье.

✨ Основные характеристики:
• Мониторинг пульса и сна
• GPS-трекер для пробежек
• Водонепроницаемость 5 ATM
• До 14 дней автономной работы
• Яркий AMOLED дисплей

🏃 Фитнес-функции:
Более 100 режимов тренировок, подсчёт калорий, анализ активности, дыхательные упражнения.

⚡ Преимущества:
Стильный дизайн, долгая работа, точные датчики, удобный интерфейс.`;
  }
  
  // Планшеты
  if (titleLower.includes('планшет')) {
    const storage = title.match(/(\d+)GB/)?.[1] || '128';
    return `📱 Описание товара

Мощный планшет для работы, учёбы и развлечений. Большой яркий экран и производительное железо в компактном корпусе.

✨ Основные характеристики:
• Встроенная память: ${storage} ГБ
• Высокое разрешение дисплея
• Мощный процессор
• До 12 часов автономной работы
• Поддержка стилуса

💼 Возможности:
Идеален для просмотра видео, чтения, рисования, работы с документами. Многозадачность и производительность флагмана.

⚡ Преимущества:
Премиальный дисплей, быстрая работа, долгий заряд, тонкий корпус.`;
  }
  
  // Ноутбуки
  if (titleLower.includes('ноутбук')) {
    const storage = title.match(/(\d+)GB/)?.[1] || '512';
    return `💻 Описание товара

Производительный ноутбук для работы, учёбы и развлечений. Современные компоненты и продуманная эргономика.

✨ Основные характеристики:
• SSD накопитель: ${storage} ГБ
• Современный процессор
• Качественный дисплей
• До 10 часов автономной работы
• Быстрая зарядка

💼 Производительность:
Справится с офисными задачами, мультимедиа, программированием и даже играми. Тихая система охлаждения.

⚡ Преимущества:
Лёгкий вес, качественная клавиатура, яркий экран, быстрая работа.`;
  }
  
  // Мониторы
  if (titleLower.includes('монитор')) {
    return `🖥️ Описание товара

Профессиональный монитор с отличной цветопередачей и комфортными для глаз технологиями.

✨ Основные характеристики:
• Высокое разрешение
• Частота обновления до 165 Гц
• Время отклика 1 мс
• HDR поддержка
• Эргономичная подставка

🎮 Для работы и игр:
Идеален для геймеров, дизайнеров, программистов. Защита глаз от усталости при долгой работе.

⚡ Преимущества:
Яркая картинка, плавное изображение, широкие углы обзора, стильный дизайн.`;
  }
  
  // Игровые аксессуары
  if (titleLower.includes('клавиатура') && titleLower.includes('игровая')) {
    return `⌨️ Описание товара

Механическая игровая клавиатура для киберспортсменов и энтузиастов. Точность, скорость и стиль.

✨ Основные характеристики:
• Механические переключатели
• RGB подсветка с настройкой
• Программируемые макросы
• Anti-ghosting для всех клавиш
• Металлический корпус

🎮 Для игр:
Мгновенный отклик, долговечность до 50 млн нажатий, удобная раскладка для MOBA и FPS.

⚡ Преимущества:
Тактильные ощущения, яркая подсветка, прочная конструкция, настраиваемые эффекты.`;
  }
  
  if (titleLower.includes('мышь') && titleLower.includes('игровая')) {
    return `🖱️ Описание товара

Профессиональная игровая мышь с точным сенсором и эргономичным дизайном.

✨ Основные характеристики:
• Оптический сенсор до 25600 DPI
• Программируемые кнопки
• RGB подсветка
• Вес 60-80 грамм
• Teflon-ножки для скольжения

🎮 Для игр:
Идеальна для шутеров и MOBA. Настройка DPI на лету, высокая частота опроса 1000 Гц.

⚡ Преимущества:
Точность движений, комфортный хват, долговечность, настраиваемое ПО.`;
  }
  
  // Игровые консоли
  if (titleLower.includes('playstation')) {
    return `🎮 Описание товара

Игровая консоль нового поколения PlayStation 5 для незабываемых игровых впечатлений.

✨ Основные характеристики:
• Сверхбыстрый SSD накопитель
• Поддержка 4K при 120 fps
• Технология Ray Tracing
• 3D звук Tempest
• Беспроводной контроллер DualSense

🎮 Возможности:
Эксклюзивные игры, обратная совместимость с PS4, потоковые сервисы, онлайн-мультиплеер.

⚡ Преимущества:
Мгновенная загрузка, реалистичная графика, тактильная отдача, огромная библиотека игр.`;
  }
  
  if (titleLower.includes('xbox')) {
    return `🎮 Описание товара

Мощная игровая консоль Xbox Series для настоящих геймеров с Game Pass и облачным геймингом.

✨ Основные характеристики:
• Производительность до 12 терафлопс
• Поддержка 4K при 120 fps
• SSD на 1 ТБ
• Quick Resume для игр
• Обратная совместимость

🎮 Возможности:
Xbox Game Pass с сотнями игр, облачный гейминг, кросс-платформенная игра.

⚡ Преимущества:
Быстрая загрузка, мощное железо, удобный контроллер, огромная библиотека.`;
  }
  
  if (titleLower.includes('nintendo switch')) {
    return `🎮 Описание товара

Уникальная гибридная консоль Nintendo Switch — играй дома и в пути!

✨ Основные характеристики:
• Портативный и домашний режимы
• OLED дисплей 7 дюймов
• Съёмные контроллеры Joy-Con
• До 9 часов автономной работы
• Встроенная подставка

🎮 Возможности:
Эксклюзивы Nintendo, локальный мультиплеер, онлайн-игры, играй где угодно.

⚡ Преимущества:
Универсальность, эксклюзивные игры, семейный контент, портативность.`;
  }
  
  // Игры
  if (titleLower.includes('игра')) {
    const gameName = title.split('для')[0].replace('Игра', '').trim();
    return `🎮 Описание игры

${gameName} — захватывающее игровое приключение с проработанным миром и увлекательным геймплеем.

✨ Особенности:
• Проработанный сюжет
• Красивая графика
• Увлекательный геймплей
• Мультиплеер режим
• Регулярные обновления

🏆 Для геймеров:
Подходит как для новичков, так и для опытных игроков. Множество режимов и контента.

⚡ Преимущества:
Высокий рейтинг критиков, активное комьюнити, долгая игровая жизнь.`;
  }
  
  // Мебель
  if (titleLower.includes('диван')) {
    return `🛋️ Описание товара

Комфортный диван с качественной обивкой и продуманной эргономикой для вашего уюта.

✨ Основные характеристики:
• Прочный каркас из дерева
• Износостойкая обивка
• Удобные подушки
• Механизм трансформации
• Современный дизайн

🏠 Для дома:
Идеально впишется в любой интерьер. Комфорт для всей семьи.

⚡ Преимущества:
Долговечность, удобство, стильный вид, легкий уход.`;
  }
  
  if (titleLower.includes('кровать')) {
    return `🛏️ Описание товара

Качественная кровать для здорового и комфортного сна. Прочная конструкция и элегантный дизайн.

✨ Основные характеристики:
• Прочный каркас
• Ортопедическое основание
• Мягкое изголовье
• Вместительные ящики для белья
• Размер: 160x200 см

🏠 Для спальни:
Обеспечивает правильную поддержку позвоночника. Дополнительное место для хранения.

⚡ Преимущества:
Надёжность, комфорт, функциональность, стильный дизайн.`;
  }
  
  if (titleLower.includes('шкаф')) {
    return `🚪 Описание товара

Вместительный шкаф с продуманной системой хранения. Функциональность и стиль в одном.

✨ Основные характеристики:
• Прочный корпус из ЛДСП
• Зеркальные двери
• Множество полок и отделений
• Надёжная фурнитура
• Размеры: 200x220 см

🏠 Для дома:
Вместит всю одежду и аксессуары. Зеркало во весь рост экономит пространство.

⚡ Преимущества:
Вместительность, качественные материалы, удобная организация вещей.`;
  }
  
  // Авто товары
  if (titleLower.includes('масло') && titleLower.includes('моторное')) {
    return `🚗 Описание товара

Высококачественное моторное масло для надёжной защиты двигателя вашего автомобиля.

✨ Основные характеристики:
• Синтетическое масло 5W-30
• Объём: 4 литра
• Соответствует стандартам API SN/CF
• Всесезонное применение
• Защита от износа

🚗 Для автомобиля:
Снижает расход топлива, обеспечивает лёгкий пуск двигателя, продлевает срок службы мотора.

⚡ Преимущества:
Надёжная защита, экономичность, стабильная работа в любых условиях.`;
  }
  
  if (titleLower.includes('шины')) {
    return `🚗 Описание товара

Качественные автомобильные шины с отличным сцеплением и долгим сроком службы.

✨ Основные характеристики:
• Размер: 225/45 R17
• Современный протектор
• Отличное сцепление
• Низкий уровень шума
• Износостойкая резиновая смесь

🚗 Для безопасности:
Уверенное управление в любую погоду, короткий тормозной путь, стабильность на поворотах.

⚡ Преимущества:
Долговечность, безопасность, комфортная езда, топливная экономичность.`;
  }
  
  // Книги
  if (category === 'Книги' && id !== 244) {
    const bookTitle = title.split('—')[0].trim();
    return `📚 Описание товара

${bookTitle} — увлекательное чтение для расширения кругозора и профессионального роста.

✨ О книге:
• Качественная печать
• Твёрдый переплёт
• Понятное изложение
• Практические примеры
• Современный подход

📖 Для читателей:
Подходит как для начинающих, так и для опытных специалистов. Полезные знания и идеи.

⚡ Преимущества:
Актуальная информация, удобный формат, качественное издание.`;
  }
  
  // Одежда
  if (titleLower.includes('куртка') || titleLower.includes('футболка') || titleLower.includes('худи')) {
    return `👕 Описание товара

Качественная одежда из премиальных материалов. Комфорт и стиль на каждый день.

✨ Основные характеристики:
• Качественная ткань
• Удобная посадка
• Износостойкость
• Легкий уход
• Современный дизайн

👔 Для гардероба:
Подходит для повседневной носки, спорта или отдыха. Сочетается с любым стилем.

⚡ Преимущества:
Комфорт, долговечность, стильный вид, качественный пошив.`;
  }
  
  // Обувь
  if (titleLower.includes('кроссовки') || titleLower.includes('ботинки') || titleLower.includes('кеды')) {
    return `👟 Описание товара

Удобная обувь для активного образа жизни. Комфорт и поддержка стопы на весь день.

✨ Основные характеристики:
• Дышащие материалы
• Амортизирующая подошва
• Анатомическая стелька
• Износостойкая подметка
• Стильный дизайн

👟 Для активности:
Идеальны для спорта, прогулок, повседневной носки. Правильная поддержка свода стопы.

⚡ Преимущества:
Комфорт, долговечность, универсальность, современный стиль.`;
  }
  
  // Бытовая техника
  if (titleLower.includes('холодильник')) {
    return `❄️ Описание товара

Современный холодильник с передовыми технологиями хранения продуктов.

✨ Основные характеристики:
• Объём: 600 литров
• Система No Frost
• Энергоэффективность A++
• Зона свежести
• LED подсветка

🏠 Для кухни:
Сохраняет свежесть продуктов, экономит электроэнергию, работает тихо.

⚡ Преимущества:
Вместительность, экономичность, современный дизайн, надёжность.`;
  }
  
  // Универсальное описание
  return `✨ Описание товара

Качественный товар от проверенного производителя. Отличное соотношение цены и качества.

📦 Основные характеристики:
• Современный дизайн
• Качественные материалы
• Надёжная сборка
• Гарантия производителя
• Быстрая доставка

⭐ Преимущества:
Высокое качество, долгий срок службы, удобство использования, стильный внешний вид.

🎁 В комплекте:
Всё необходимое для начала использования, включая документацию и гарантийный талон.`;
}

// Маппинг категорий на их ID
function getCategoryIdFromName(categoryName: string): number {
  const categoryMap: { [key: string]: number } = {
    'Электроника': 1,
    'Компьютеры': 2,
    'Бытовая техника': 3,
    'Одежда': 4,
    'Обувь': 5,
    'Детские товары': 6,
    'Спорт': 7,
    'Красота и здоровье': 8,
    'Дом и сад': 9,
    'Продукты': 10,
    'Игрушки': 11,
    'Книги': 12,
    'Авто и мото': 13,
    'Мебель': 14,
    'Игры и консоли': 15,
    'Зоотовары': 16,
  };
  return categoryMap[categoryName] || 1;
}

// ВСЕ 243 ТОВАРА напрямую из CSV goods.csv - каждый имеет индивидуальное фото!
const PRODUCTS_DATA = [
  { id: 1, title: "Смартфон Samsung Galaxy S24 Ultra 128GB", category: "Электроника", categoryId: 1 },
  { id: 2, title: "Смартфон Samsung Galaxy S24+ 256GB", category: "Электроника", categoryId: 1 },
  { id: 3, title: "Смартфон Samsung Galaxy S24 512GB", category: "Электроника", categoryId: 1 },
  { id: 4, title: "Смартфон Samsung Galaxy Z Fold 5 1TB", category: "Электроника", categoryId: 1 },
  { id: 5, title: "Смартфон Samsung Galaxy Z Flip 5 64GB", category: "Электроника", categoryId: 1 },
  { id: 6, title: "Смартфон Apple iPhone 15 Pro Max 128GB", category: "Электроника", categoryId: 1 },
  { id: 7, title: "Смартфон Apple iPhone 15 Pro 256GB", category: "Электроника", categoryId: 1 },
  { id: 8, title: "Смартфон Apple iPhone 15 Plus 512GB", category: "Электроника", categoryId: 1 },
  { id: 9, title: "Смартфон Apple iPhone 15 1TB", category: "Электроника", categoryId: 1 },
  { id: 10, title: "Смартфон Apple iPhone 14 Pro 64GB", category: "Электроника", categoryId: 1 },
  { id: 11, title: "Смартфон Xiaomi 14 Ultra 128GB", category: "Электроника", categoryId: 1 },
  { id: 12, title: "Смартфон Xiaomi 14 Pro 256GB", category: "Электроника", categoryId: 1 },
  { id: 13, title: "Смартфон Xiaomi 14 512GB", category: "Электроника", categoryId: 1 },
  { id: 14, title: "Смартфон Xiaomi 13T Pro 1TB", category: "Электроника", categoryId: 1 },
  { id: 15, title: "Смартфон Xiaomi 13T 64GB", category: "Электроника", categoryId: 1 },
  { id: 16, title: "Смартфон OPPO Find X7 Pro 128GB", category: "Электроника", categoryId: 1 },
  { id: 17, title: "Смартфон OPPO Find X7 256GB", category: "Электроника", categoryId: 1 },
  { id: 18, title: "Смартфон OPPO Reno 11 Pro 512GB", category: "Электроника", categoryId: 1 },
  { id: 19, title: "Смартфон OPPO Reno 11 1TB", category: "Электроника", categoryId: 1 },
  { id: 20, title: "Смартфон OPPO A79 64GB", category: "Электроника", categoryId: 1 },
  { id: 21, title: "Смартфон Realme GT 5 Pro 128GB", category: "Электроника", categoryId: 1 },
  { id: 22, title: "Смартфон Realme GT 5 256GB", category: "Электроника", categoryId: 1 },
  { id: 23, title: "Смартфон Realme 12 Pro+ 512GB", category: "Электроника", categoryId: 1 },
  { id: 24, title: "Смартфон Realme 12 Pro 1TB", category: "Электроника", categoryId: 1 },
  { id: 25, title: "Смартфон Realme 12 64GB", category: "Электроника", categoryId: 1 },
  { id: 26, title: "Смартфон OnePlus 12 Pro 128GB", category: "Электроника", categoryId: 1 },
  { id: 27, title: "Смартфон OnePlus 12 256GB", category: "Электроника", categoryId: 1 },
  { id: 28, title: "Смартфон OnePlus 11T 512GB", category: "Электроника", categoryId: 1 },
  { id: 29, title: "Смартфон OnePlus 11 1TB", category: "Электроника", categoryId: 1 },
  { id: 30, title: "Смартфон OnePlus Nord 3 64GB", category: "Электроника", categoryId: 1 },
  { id: 31, title: "Смартфон Google Pixel 8 Pro 128GB", category: "Электроника", categoryId: 1 },
  { id: 32, title: "Смартфон Google Pixel 8 256GB", category: "Электроника", categoryId: 1 },
  { id: 33, title: "Смартфон Google Pixel 7a 512GB", category: "Электроника", categoryId: 1 },
  { id: 34, title: "Смартфон Google Pixel 7 Pro 1TB", category: "Электроника", categoryId: 1 },
  { id: 35, title: "Смартфон Google Pixel 7 64GB", category: "Электроника", categoryId: 1 },
  { id: 36, title: "Смартфон Motorola Edge 40 Pro 128GB", category: "Электроника", categoryId: 1 },
  { id: 37, title: "Смартфон Motorola Edge 40 256GB", category: "Электроника", categoryId: 1 },
  { id: 38, title: "Смартфон Motorola G84 512GB", category: "Электроника", categoryId: 1 },
  { id: 39, title: "Смартфон Motorola G54 1TB", category: "Электроника", categoryId: 1 },
  { id: 40, title: "Смартфон Motorola G34 64GB", category: "Электроника", categoryId: 1 },
  { id: 41, title: "Наушники Sony WH-1000XM5", category: "Электроника", categoryId: 1 },
  { id: 42, title: "Наушники Sony WH-1000XM4", category: "Электроника", categoryId: 1 },
  { id: 43, title: "Наушники Sony WF-1000XM5", category: "Электроника", categoryId: 1 },
  { id: 44, title: "Наушники Sony WF-1000XM4", category: "Электроника", categoryId: 1 },
  { id: 45, title: "TWS наушники Apple AirPods Pro 2", category: "Электроника", categoryId: 1 },
  { id: 46, title: "TWS наушники Apple AirPods 3", category: "Электроника", categoryId: 1 },
  { id: 47, title: "TWS наушники Apple AirPods Max", category: "Электроника", categoryId: 1 },
  { id: 48, title: "TWS наушники Apple AirPods 2", category: "Электроника", categoryId: 1 },
  { id: 49, title: "TWS наушники Samsung Galaxy Buds2 Pro", category: "Электроника", categoryId: 1 },
  { id: 50, title: "TWS наушники Samsung Galaxy Buds2", category: "Электроника", categoryId: 1 },
  { id: 51, title: "TWS наушники Samsung Galaxy Buds FE", category: "Электроника", categoryId: 1 },
  { id: 52, title: "Наушники JBL Tune 770NC", category: "Электроника", categoryId: 1 },
  { id: 53, title: "Наушники JBL Live 660NC", category: "Электроника", categoryId: 1 },
  { id: 54, title: "Наушники JBL Flip 6", category: "Электроника", categoryId: 1 },
  { id: 55, title: "Наушники JBL Charge 5", category: "Электроника", categoryId: 1 },
  { id: 56, title: "Наушники Bose QuietComfort Ultra", category: "Электроника", categoryId: 1 },
  { id: 57, title: "Наушники Bose QuietComfort 45", category: "Электроника", categoryId: 1 },
  { id: 58, title: "Наушники Bose Sport Earbuds", category: "Электроника", categoryId: 1 },
  { id: 59, title: "Наушники Sennheiser Momentum 4", category: "Электроника", categoryId: 1 },
  { id: 60, title: "Наушники Sennheiser HD 660S2", category: "Электроника", categoryId: 1 },
  { id: 61, title: "Наушники Sennheiser IE 200", category: "Электроника", categoryId: 1 },
  { id: 62, title: "Наушники Audio-Technica ATH-M50xBT2", category: "Электроника", categoryId: 1 },
  { id: 63, title: "Наушники Audio-Technica ATH-M20xBT", category: "Электроника", categoryId: 1 },
  { id: 64, title: "Наушники Audio-Technica ATH-CKS50TW", category: "Электроника", categoryId: 1 },
  { id: 65, title: "Наушники Beats Studio Pro", category: "Электроника", categoryId: 1 },
  { id: 66, title: "Наушники Beats Solo 4", category: "Электроника", categoryId: 1 },
  { id: 67, title: "Наушники Beats Fit Pro", category: "Электроника", categoryId: 1 },
  { id: 68, title: "TWS наушники Beats Studio Buds+", category: "Электроника", categoryId: 1 },
  { id: 69, title: "Умные часы Apple Watch Series 9 45mm", category: "Электроника", categoryId: 1 },
  { id: 70, title: "Умные часы Apple Watch Series 9 41mm", category: "Электроника", categoryId: 1 },
  { id: 71, title: "Умные часы Apple Watch Ultra 2", category: "Электроника", categoryId: 1 },
  { id: 72, title: "Умные часы Samsung Galaxy Watch6 Classic", category: "Электроника", categoryId: 1 },
  { id: 73, title: "Умные часы Samsung Galaxy Watch6", category: "Электроника", categoryId: 1 },
  { id: 74, title: "Умные часы Samsung Galaxy Watch5 Pro", category: "Электроника", categoryId: 1 },
  { id: 75, title: "Умные часы Xiaomi Watch S3", category: "Электроника", categoryId: 1 },
  { id: 76, title: "Умные часы Xiaomi Watch 2 Pro", category: "Электроника", categoryId: 1 },
  { id: 77, title: "Фитнес-браслет Xiaomi Smart Band 8 Pro", category: "Электроника", categoryId: 1 },
  { id: 78, title: "Умные часы Huawei Watch GT 4", category: "Электроника", categoryId: 1 },
  { id: 79, title: "Фитнес-браслет Huawei Watch Fit 3", category: "Электроника", categoryId: 1 },
  { id: 80, title: "Фитнес-браслет Huawei Band 9", category: "Электроника", categoryId: 1 },
  { id: 81, title: "Умные часы Garmin Fenix 7", category: "Электроника", categoryId: 1 },
  { id: 82, title: "Умные часы Garmin Forerunner 965", category: "Электроника", categoryId: 1 },
  { id: 83, title: "Умные часы Garmin Venu 3", category: "Электроника", categoryId: 1 },
  { id: 84, title: "Умные часы Amazfit GTR 4", category: "Электроника", categoryId: 1 },
  { id: 85, title: "Умные часы Amazfit GTS 4", category: "Электроника", categoryId: 1 },
  { id: 86, title: "Умные часы Amazfit T-Rex Ultra", category: "Электроника", categoryId: 1 },
  { id: 87, title: "Умные часы Fitbit Sense 2", category: "Электроника", categoryId: 1 },
  { id: 88, title: "Умные часы Fitbit Versa 4", category: "Электроника", categoryId: 1 },
  { id: 89, title: "Умные часы Fitbit Charge 6", category: "Электроника", categoryId: 1 },
  { id: 90, title: "Планшет Apple iPad Pro 12.9\" 64GB", category: "Электроника", categoryId: 1 },
  { id: 91, title: "Планшет Apple iPad Pro 11\" 128GB", category: "Электроника", categoryId: 1 },
  { id: 92, title: "Планшет Apple iPad Air 256GB", category: "Электроника", categoryId: 1 },
  { id: 93, title: "Планшет Apple iPad 10.2\" 512GB", category: "Электроника", categoryId: 1 },
  { id: 94, title: "Планшет Samsung Galaxy Tab S9 Ultra 1TB", category: "Электроника", categoryId: 1 },
  { id: 95, title: "Планшет Samsung Galaxy Tab S9+ 64GB", category: "Электроника", categoryId: 1 },
  { id: 96, title: "Планшет Samsung Galaxy Tab S9 128GB", category: "Электроника", categoryId: 1 },
  { id: 97, title: "Планшет Samsung Galaxy Tab A9+ 256GB", category: "Электроника", categoryId: 1 },
  { id: 98, title: "Планшет Xiaomi Pad 6 Pro 512GB", category: "Электроника", categoryId: 1 },
  { id: 99, title: "Планшет Xiaomi Pad 6 1TB", category: "Электроника", categoryId: 1 },
  { id: 100, title: "Планшет Xiaomi Pad 5 64GB", category: "Электроника", categoryId: 1 },
  { id: 101, title: "Планшет Xiaomi Redmi Pad SE 128GB", category: "Электроника", categoryId: 1 },
  { id: 102, title: "Планшет Lenovo Tab P12 256GB", category: "Электроника", categoryId: 1 },
  { id: 103, title: "Планшет Lenovo Tab P11 Pro 512GB", category: "Электроника", categoryId: 1 },
  { id: 104, title: "Планшет Lenovo Tab M10 Plus 1TB", category: "Электроника", categoryId: 1 },
  { id: 105, title: "Планшет Lenovo Tab M8 64GB", category: "Электроника", categoryId: 1 },
  { id: 106, title: "Планшет Huawei MatePad Pro 128GB", category: "Электроника", categoryId: 1 },
  { id: 107, title: "Планшет Huawei MatePad 11 256GB", category: "Электроника", categoryId: 1 },
  { id: 108, title: "Бхагават-Гита как она есть – Бхактиведанта Свами Шрила Прабхупада", category: "Книги", categoryId: 12 },
  { id: 109, title: "Планшет Huawei MediaPad T10 1TB", category: "Электроника", categoryId: 1 },
  { id: 110, title: "Ноутбук Apple MacBook Pro 16\" 64GB", category: "Компьютеры", categoryId: 2 },
  { id: 111, title: "Ноутбук Apple MacBook Pro 14\" 128GB", category: "Компьютеры", categoryId: 2 },
  { id: 112, title: "Ноутбук Apple MacBook Air 15\" 256GB", category: "Компьютеры", categoryId: 2 },
  { id: 113, title: "Ноутбук Apple MacBook Air 13\" 512GB", category: "Компьютеры", categoryId: 2 },
  { id: 114, title: "Ноутбук ASUS ROG Strix G16 1TB", category: "Компьютеры", categoryId: 2 },
  { id: 115, title: "Ноутбук ASUS TUF Gaming A15 64GB", category: "Компьютеры", categoryId: 2 },
  { id: 116, title: "Ноутбук ASUS Vivobook Pro 15 128GB", category: "Компьютеры", categoryId: 2 },
  { id: 117, title: "Ноутбук ASUS ZenBook 14 256GB", category: "Компьютеры", categoryId: 2 },
  { id: 118, title: "Ноутбук Lenovo Legion 5 Pro 512GB", category: "Компьютеры", categoryId: 2 },
  { id: 119, title: "Ноутбук Lenovo IdeaPad Gaming 3 1TB", category: "Компьютеры", categoryId: 2 },
  { id: 120, title: "Ноутбук Lenovo ThinkPad X1 Carbon 64GB", category: "Компьютеры", categoryId: 2 },
  { id: 121, title: "Ноутбук Lenovo Yoga Slim 7 128GB", category: "Компьютеры", categoryId: 2 },
  { id: 122, title: "Ноутбук HP Omen 16 256GB", category: "Компьютеры", categoryId: 2 },
  { id: 123, title: "Ноутбук HP Pavilion Gaming 15 512GB", category: "Компьютеры", categoryId: 2 },
  { id: 124, title: "Ноутбук HP Envy 13 1TB", category: "Компьютеры", categoryId: 2 },
  { id: 125, title: "Ноутбук HP ProBook 450 64GB", category: "Компьютеры", categoryId: 2 },
  { id: 126, title: "Ноутбук Dell XPS 15 128GB", category: "Компьютеры", categoryId: 2 },
  { id: 127, title: "Ноутбук Dell G15 Gaming 256GB", category: "Компьютеры", categoryId: 2 },
  { id: 128, title: "Ноутбук Dell Inspiron 15 512GB", category: "Компьютеры", categoryId: 2 },
  { id: 129, title: "Ноутбук Dell Latitude 5430 1TB", category: "Компьютеры", categoryId: 2 },
  { id: 130, title: "Ноутбук Acer Predator Helios 300 64GB", category: "Компьютеры", categoryId: 2 },
  { id: 131, title: "Ноутбук Acer Nitro 5 128GB", category: "Компьютеры", categoryId: 2 },
  { id: 132, title: "Ноутбук Acer Swift 3 256GB", category: "Компьютеры", categoryId: 2 },
  { id: 133, title: "Ноутбук Acer Aspire 5 512GB", category: "Компьютеры", categoryId: 2 },
  { id: 134, title: "Ноутбук MSI Raider GE78 1TB", category: "Компьютеры", categoryId: 2 },
  { id: 135, title: "Ноутбук MSI Katana 15 64GB", category: "Компьютеры", categoryId: 2 },
  { id: 136, title: "Ноутбук MSI Prestige 14 128GB", category: "Компьютеры", categoryId: 2 },
  { id: 137, title: "Ноутбук MSI Modern 15 256GB", category: "Компьютеры", categoryId: 2 },
  { id: 138, title: "Ноутбук Razer Blade 15 512GB", category: "Компьютеры", categoryId: 2 },
  { id: 139, title: "Ноутбук Razer Blade 14 1TB", category: "Компьютеры", categoryId: 2 },
  { id: 140, title: "Ноутбук Razer Book 13 64GB", category: "Компьютеры", categoryId: 2 },
  { id: 141, title: "Монитор ASUS ROG Swift PG27UQ", category: "Компьютеры", categoryId: 2 },
  { id: 142, title: "Монитор ASUS TUF Gaming VG27AQ", category: "Компьютеры", categoryId: 2 },
  { id: 143, title: "Монитор ASUS ProArt PA279CV", category: "Компьютеры", categoryId: 2 },
  { id: 144, title: "Монитор Samsung Odyssey G7", category: "Компьютеры", categoryId: 2 },
  { id: 145, title: "Монитор Samsung ViewFinity S9", category: "Компьютеры", categoryId: 2 },
  { id: 146, title: "Монитор Samsung M8 Smart Monitor", category: "Компьютеры", categoryId: 2 },
  { id: 147, title: "Монитор LG UltraGear 27GN950", category: "Компьютеры", categoryId: 2 },
  { id: 148, title: "Монитор LG 27UP850", category: "Компьютеры", categoryId: 2 },
  { id: 149, title: "Монитор LG 27UL500", category: "Компьютеры", categoryId: 2 },
  { id: 150, title: "Монитор Dell UltraSharp U2723DE", category: "Компьютеры", categoryId: 2 },
  { id: 151, title: "Монитор Dell S2721DGF", category: "Компьютеры", categoryId: 2 },
  { id: 152, title: "Монитор Dell P2422H", category: "Компьютеры", categoryId: 2 },
  { id: 153, title: "Монитор BenQ MOBIUZ EX3210U", category: "Компьютеры", categoryId: 2 },
  { id: 154, title: "Монитор BenQ ZOWIE XL2546K", category: "Компьютеры", categoryId: 2 },
  { id: 155, title: "Монитор BenQ PD2725U", category: "Компьютеры", categoryId: 2 },
  { id: 156, title: "Монитор AOC AGON AG273QX", category: "Компьютеры", categoryId: 2 },
  { id: 157, title: "Монитор AOC C27G2Z", category: "Компьютеры", categoryId: 2 },
  { id: 158, title: "Монитор AOC Q27P2Q", category: "Компьютеры", categoryId: 2 },
  { id: 159, title: "Монитор MSI Optix MAG274QRF", category: "Компьютеры", categoryId: 2 },
  { id: 160, title: "Монитор MSI MAG323UPF", category: "Компьютеры", categoryId: 2 },
  { id: 161, title: "Монитор MSI Modern MD272QPW", category: "Компьютеры", categoryId: 2 },
  { id: 162, title: "Клавиатура механическая Logitech G915", category: "Компьютеры", categoryId: 2 },
  { id: 163, title: "Мышь беспроводная Logitech MX Master 3S", category: "Компьютеры", categoryId: 2 },
  { id: 164, title: "Гарнитура игровая HyperX Cloud II", category: "Компьютеры", categoryId: 2 },
  { id: 165, title: "Веб-камера Logitech C920 Pro HD", category: "Компьютеры", categoryId: 2 },
  { id: 166, title: "Микрофон студийный Blue Yeti", category: "Компьютеры", categoryId: 2 },
  { id: 167, title: "Коврик для мыши SteelSeries QcK XXL", category: "Компьютеры", categoryId: 2 },
  { id: 168, title: "ИБП APC Back-UPS 650VA", category: "Компьютеры", categoryId: 2 },
  { id: 169, title: "Внешний SSD Samsung T7 1TB", category: "Компьютеры", categoryId: 2 },
  { id: 170, title: "USB-хаб Anker 10 портов", category: "Компьютеры", categoryId: 2 },
  { id: 171, title: "Док-станция Dell WD19", category: "Компьютеры", categoryId: 2 },
  { id: 172, title: "Графический планшет Wacom Intuos Pro", category: "Компьютеры", categoryId: 2 },
  { id: 173, title: "Стример Elgato Stream Deck", category: "Компьютеры", categoryId: 2 },
  { id: 174, title: "Светодиодная подсветка Philips Hue", category: "Компьютеры", categoryId: 2 },
  { id: 175, title: "Кресло геймерское DXRacer Formula", category: "Компьютеры", categoryId: 2 },
  { id: 176, title: "Стол письменный IKEA Bekant", category: "Компьютеры", categoryId: 2 },
  { id: 177, title: "Колонки студийные KRK Rokit 5", category: "Компьютеры", categoryId: 2 },
  { id: 178, title: "Звуковая карта Focusrite Scarlett 2i2", category: "Компьютеры", categoryId: 2 },
  { id: 179, title: "Кабель HDMI 2.1 Belkin 2м", category: "Компьютеры", categoryId: 2 },
  { id: 180, title: "Адаптер USB-C Satechi", category: "Компьютеры", categoryId: 2 },
  { id: 181, title: "Флешка Kingston 128GB", category: "Компьютеры", categoryId: 2 },
  { id: 182, title: "Карта памяти SanDisk Extreme 256GB", category: "Компьютеры", categoryId: 2 },
  { id: 183, title: "Роутер Wi-Fi 6 TP-Link AX3000", category: "Компьютеры", categoryId: 2 },
  { id: 184, title: "Сетевой коммутатор Netgear GS108", category: "Компьютеры", categoryId: 2 },
  { id: 185, title: "Умная розетка Xiaomi Smart Plug", category: "Компьютеры", categoryId: 2 },
  { id: 186, title: "Умная лампочка Yeelight LED Bulb", category: "Компьютеры", categoryId: 2 },
  { id: 187, title: "Принтер HP LaserJet Pro M15w", category: "Компьютеры", categoryId: 2 },
  { id: 188, title: "Сканер Epson Perfection V39", category: "Компьютеры", categoryId: 2 },
  { id: 189, title: "Проектор BenQ TH685P", category: "Компьютеры", categoryId: 2 },
  { id: 190, title: "Экран для проектора 100", category: "Компьютеры", categoryId: 2 },
  { id: 191, title: "VR-шлем Meta Quest 3", category: "Компьютеры", categoryId: 2 },
  { id: 192, title: "Контроллер Xbox Wireless", category: "Компьютеры", categoryId: 2 },
  { id: 193, title: "Руль Logitech G29", category: "Компьютеры", categoryId: 2 },
  { id: 194, title: "Джойстик Thrustmaster T16000M", category: "Компьютеры", categoryId: 2 },
  { id: 195, title: "Стрим-камера Elgato Facecam", category: "Компьютеры", categoryId: 2 },
  { id: 196, title: "Зеленый фон для стрима Neewer", category: "Компьютеры", categoryId: 2 },
  { id: 197, title: "Кольцевая лампа 18", category: "Компьютеры", categoryId: 2 },
  { id: 198, title: "Штатив для камеры Manfrotto", category: "Компьютеры", categoryId: 2 },
  { id: 199, title: "Сумка для ноутбука Thule 15", category: "Компьютеры", categoryId: 2 },
  { id: 200, title: "Чехол для планшета Apple Smart Cover", category: "Компьютеры", categoryId: 2 },
  { id: 201, title: "Защитная пленка для экрана", category: "Компьютеры", categoryId: 2 },
  { id: 202, title: "Холодильник Samsung Side-by-Side 600л", category: "Бытовая техника", categoryId: 3 },
  { id: 203, title: "Стиральная машина LG с AI 9кг", category: "Бытовая техника", categoryId: 3 },
  { id: 204, title: "Пылесос Dyson V15 Detect", category: "Бытовая техника", categoryId: 3 },
  { id: 205, title: "Куртка зимняя The North Face", category: "Одежда", categoryId: 4 },
  { id: 206, title: "Джинсы Levis 501 Original", category: "Одежда", categoryId: 4 },
  { id: 207, title: "Футболка Adidas Originals", category: "Одежда", categoryId: 4 },
  { id: 208, title: "Худи Nike Tech Fleece", category: "Одежда", categoryId: 4 },
  { id: 209, title: "Кроссовки Nike Air Max 90", category: "Обувь", categoryId: 5 },
  { id: 210, title: "Ботинки Timberland 6 Inch", category: "Обувь", categoryId: 5 },
  { id: 211, title: "Кеды Converse Chuck Taylor All Star", category: "Обувь", categoryId: 5 },
  { id: 212, title: "Сандалии Birkenstock Arizona", category: "Обувь", categoryId: 5 },
  { id: 213, title: "Туфли классические Ecco", category: "Обувь", categoryId: 5 },
  { id: 214, title: "Матрас ортопедический 160x200", category: "Дом и сад", categoryId: 9 },
  { id: 215, title: "Подушка анатомическая с памятью", category: "Дом и сад", categoryId: 9 },
  { id: 216, title: "Одеяло пуховое 200x220", category: "Дом и сад", categoryId: 9 },
  { id: 217, title: "Комплект постельного белья сатин", category: "Дом и сад", categoryId: 9 },
  { id: 218, title: "Набор посуды Tefal 12 предметов", category: "Дом и сад", categoryId: 9 },
  { id: 219, title: "Мультиварка Redmond 6л", category: "Дом и сад", categoryId: 9 },
  { id: 220, title: "Коляска Cybex Priam 3в1", category: "Детские товары", categoryId: 6 },
  { id: 221, title: "Автокресло Britax Romer", category: "Детские товары", categoryId: 6 },
  { id: 222, title: "Радионяня Philips Avent", category: "Детские товары", categoryId: 6 },
  { id: 223, title: "Электрическая зубная щетка Oral-B Genius", category: "Красота и здоровье", categoryId: 8 },
  { id: 224, title: "Тонометр автоматический Omron", category: "Красота и здоровье", categoryId: 8 },
  { id: 225, title: "Массажер для спины Beurer", category: "Красота и здоровье", categoryId: 8 },
  { id: 226, title: "Велосипед горный Trek X-Caliber", category: "Спорт и отдых", categoryId: 1 },
  { id: 227, title: "Самокат электрический Xiaomi Pro 2", category: "Спорт и отдых", categoryId: 1 },
  { id: 228, title: "Гантели разборные 20кг пара", category: "Спорт и отдых", categoryId: 1 },
  { id: 229, title: "Кофе в зернах Lavazza 1кг", category: "Продукты", categoryId: 10 },
  { id: 230, title: "Чай черный Greenfield ассорти", category: "Продукты", categoryId: 10 },
  { id: 231, title: "Шоколад Lindt молочный", category: "Продукты", categoryId: 10 },
  { id: 232, title: "Корм для кошек Royal Canin 10кг", category: "Зоотовары", categoryId: 16 },
  { id: 233, title: "Лоток-туалет для кошек автоматический", category: "Зоотовары", categoryId: 16 },
  { id: 234, title: "Игровой комплекс для кошек", category: "Зоотовары", categoryId: 16 },
  { id: 236, title: "Чистый код - Роберт Мартин", category: "Книги", categoryId: 12 },
  { id: 238, title: "Игровая консоль PlayStation 5", category: "Хобби", categoryId: 17 },
  { id: 239, title: "Игровая консоль Xbox Series X", category: "Хобби", categoryId: 17 },
  { id: 240, title: "Nintendo Switch OLED", category: "Хобби", categoryId: 17 },
  { id: 241, title: "Дрон DJI Mini 3 Pro с камерой 4K", category: "Хобби", categoryId: 17 },
  { id: 242, title: "Набор для рисования Faber-Castell 120 цветов", category: "Хобби", categoryId: 17 },
  { id: 243, title: "Гитара акустическая Yamaha F310", category: "Хобби", categoryId: 17 },
  { id: 244, title: "Планшет Huawei MatePad SE 512GB", category: "Электроника", categoryId: 1 },
  { id: 245, title: "Secure by Design — Dan Bergh Johnsson, Daniel Deogun, Daniel Sawano", category: "Книги", categoryId: 12 },
  { id: 246, title: "Designing Secure Software — Loren Kohnfelder (Microsoft)", category: "Книги", categoryId: 12 },
  { id: 247, title: "The Web Application Hacker’s Handbook (2nd Ed.) — Stuttard & Pinto", category: "Книги", categoryId: 12 },
  { id: 248, title: "OWASP Cheat Sheet Series", category: "Книги", categoryId: 12 },
  { id: 249, title: "Мы – Евгений Замятин", category: "Книги", categoryId: 12 },
  { id: 250, title: "Стив Джобс Уолтер Айзексон", category: "Книги", categoryId: 12 },
  { id: 251, title: "Моторное масло Mobil 1 5W-30 4л", category: "Авто и мото", categoryId: 13 },
  { id: 252, title: "Автомобильные шины Michelin Pilot Sport 4 225/45 R17", category: "Авто и мото", categoryId: 13 },
  { id: 253, title: "Аккумулятор автомобильный Bosch S5 60Ah", category: "Авто и мото", categoryId: 13 },
  { id: 254, title: "Видеорегистратор Xiaomi 70mai Pro Plus+", category: "Авто и мото", categoryId: 13 },
  { id: 255, title: "Фары светодиодные Philips LED H7", category: "Авто и мото", categoryId: 13 },
  { id: 256, title: "Коврики автомобильные резиновые универсальные", category: "Авто и мото", categoryId: 13 },
  { id: 257, title: "Компрессор автомобильный Berkut R20", category: "Авто и мото", categoryId: 13 },
  { id: 258, title: "Зарядное устройство автомобильное Baseus 65W", category: "Авто и мото", categoryId: 13 },
  { id: 259, title: "Шлем мотоциклетный HJC i70", category: "Авто и мото", categoryId: 13 },
  { id: 260, title: "Автомобильный огнетушитель ОП-2", category: "Авто и мото", categoryId: 13 },
  { id: 261, title: "Игровая консоль Sony PlayStation 5 Slim", category: "Игры и консоли", categoryId: 15 },
  { id: 262, title: "Игровая консоль Microsoft Xbox Series X 1TB", category: "Игры и консоли", categoryId: 15 },
  { id: 263, title: "Игровая консоль Nintendo Switch OLED", category: "Игры и консоли", categoryId: 15 },
  { id: 264, title: "Игра Spider-Man 2 для PlayStation 5", category: "Игры и консоли", categoryId: 15 },
  { id: 265, title: "Игра God of War Ragnarök для PlayStation 5", category: "Игры и консоли", categoryId: 15 },
  { id: 266, title: "Игра Hogwarts Legacy для PlayStation 5", category: "Игры и консоли", categoryId: 15 },
  { id: 267, title: "Игра Forza Horizon 5 для Xbox Series X", category: "Игры и консоли", categoryId: 15 },
  { id: 268, title: "Игра Starfield для Xbox Series X", category: "Игры и консоли", categoryId: 15 },
  { id: 269, title: "Игра Halo Infinite для Xbox Series X", category: "Игры и консоли", categoryId: 15 },
  { id: 270, title: "Игра The Legend of Zelda Tears of the Kingdom для Nintendo Switch", category: "Игры и консоли", categoryId: 15 },
  { id: 271, title: "Игра Super Mario Bros Wonder для Nintendo Switch", category: "Игры и консоли", categoryId: 15 },
  { id: 272, title: "Игра Pokemon Scarlet для Nintendo Switch", category: "Игры и консоли", categoryId: 15 },
  { id: 273, title: "Геймпад Sony DualSense белый", category: "Игры и консоли", categoryId: 15 },
  { id: 274, title: "Геймпад Sony DualSense черный", category: "Игры и консоли", categoryId: 15 },
  { id: 275, title: "Геймпад Microsoft Xbox Wireless Controller черный", category: "Игры и консоли", categoryId: 15 },
  { id: 276, title: "VR-гарнитура Meta Quest 3 128GB", category: "Игры и консоли", categoryId: 15 },
  { id: 277, title: "VR-гарнитура Sony PlayStation VR2", category: "Игры и консоли", categoryId: 15 },
  { id: 278, title: "Игровое кресло DXRacer Formula Series", category: "Игры и консоли", categoryId: 15 },
  { id: 279, title: "Игровой руль Logitech G29 с педалями", category: "Игры и консоли", categoryId: 15 },
  { id: 280, title: "Игровая гарнитура HyperX Cloud II красная", category: "Игры и консоли", categoryId: 15 },
  { id: 281, title: "Игровая мышь Logitech G Pro X Superlight", category: "Игры и консоли", categoryId: 15 },
  { id: 282, title: "Игровая мышь Razer DeathAdder V3", category: "Игры и консоли", categoryId: 15 },
  { id: 283, title: "Игровая клавиатура механическая SteelSeries Apex Pro", category: "Игры и консоли", categoryId: 15 },
  { id: 284, title: "Игровая клавиатура Razer BlackWidow V4 Pro", category: "Игры и консоли", categoryId: 15 },
  { id: 285, title: "Игровой коврик для мыши SteelSeries QcK XXL", category: "Игры и консоли", categoryId: 15 },
  { id: 286, title: "Подписка PlayStation Plus Premium 12 месяцев", category: "Игры и консоли", categoryId: 15 },
  { id: 287, title: "Подписка Xbox Game Pass Ultimate 12 месяцев", category: "Игры и консоли", categoryId: 15 },
  { id: 288, title: "Игровой монитор ASUS ROG Swift 27 165Hz", category: "Игры и консоли", categoryId: 15 },
  { id: 289, title: "Игровая консоль Sony PlayStation 5 Digital Edition", category: "Игры и консоли", categoryId: 15 },
  { id: 290, title: "Игровая консоль Microsoft Xbox Series S 512GB", category: "Игры и консоли", categoryId: 15 },
  { id: 291, title: "Диван угловой IKEA FRIHETEN серый", category: "Мебель", categoryId: 14 },
  { id: 292, title: "Кровать двуспальная IKEA MALM 160x200", category: "Мебель", categoryId: 14 },
  { id: 293, title: "Шкаф-купе 3-дверный белый 200x220", category: "Мебель", categoryId: 14 },
  { id: 294, title: "Стол обеденный раздвижной на 6 персон", category: "Мебель", categoryId: 14 },
  { id: 295, title: "Комод с 5 ящиками белый", category: "Мебель", categoryId: 14 },
  { id: 296, title: "Тумба прикроватная IKEA HEMNES белая", category: "Мебель", categoryId: 14 },
  { id: 297, title: "Стеллаж открытый 5 полок белый", category: "Мебель", categoryId: 14 },
  { id: 298, title: "Кресло мягкое STRANDMON серое", category: "Мебель", categoryId: 14 },
  { id: 299, title: "Журнальный столик со стеклянной столешницей", category: "Мебель", categoryId: 14 },
  { id: 300, title: "Книжный шкаф Billy IKEA белый", category: "Мебель", categoryId: 14 },
  { id: 301, title: "Микроволновая печь Samsung 23л с грилем", category: "Бытовая техника", categoryId: 3 },
  { id: 302, title: "Кофемашина De'Longhi автоматическая", category: "Бытовая техника", categoryId: 3 },
  { id: 303, title: "Посудомоечная машина Bosch 60см 14 комплектов", category: "Бытовая техника", categoryId: 3 },
  { id: 304, title: "Электрочайник Xiaomi Mi Smart Kettle Pro", category: "Бытовая техника", categoryId: 3 },
  { id: 305, title: "Мультиварка Redmond с йогуртницей 5л", category: "Бытовая техника", categoryId: 3 },
  { id: 306, title: "Блендер Bosch погружной 1000W", category: "Бытовая техника", categoryId: 3 },
  { id: 307, title: "Тостер Philips на 2 ломтика с размораживанием", category: "Бытовая техника", categoryId: 3 },
  { id: 308, title: "Соковыжималка Braun центробежная 1200W", category: "Бытовая техника", categoryId: 3 },
  { id: 309, title: "Хлебопечка Panasonic с программой французского хлеба", category: "Бытовая техника", categoryId: 3 },
  { id: 310, title: "Утюг Tefal с паровым ударом 200г/мин", category: "Бытовая техника", categoryId: 3 },
  { id: 311, title: "Вентилятор Dyson Pure Cool очиститель воздуха", category: "Бытовая техника", categoryId: 3 },
  { id: 312, title: "Обогреватель Electrolux масляный 2500W", category: "Бытовая техника", categoryId: 3 },
  { id: 313, title: "Увлажнитель воздуха Xiaomi Mi Smart Antibacterial", category: "Бытовая техника", categoryId: 3 },
  { id: 314, title: "Электрогриль Tefal OptiGrill+ контроль температуры", category: "Бытовая техника", categoryId: 3 },
  { id: 315, title: "Кухонный комбайн KitchenAid 4.8л с насадками", category: "Бытовая техника", categoryId: 3 },
  { id: 316, title: "Вафельница Philips антипригарное покрытие", category: "Бытовая техника", categoryId: 3 },
  { id: 317, title: "Миксер Bosch планетарный 1000W с чашей", category: "Бытовая техника", categoryId: 3 },
  { id: 318, title: "Электромясорубка Moulinex 2000W реверс", category: "Бытовая техника", categoryId: 3 },
  { id: 319, title: "Сушилка для овощей и фруктов Kitfort 5 ярусов", category: "Бытовая техника", categoryId: 3 },
  { id: 320, title: "Электрический духовой шкаф Gorenje 65л конвекция", category: "Бытовая техника", categoryId: 3 },
  { id: 321, title: "Компьютер игровой Intel Core i7 RTX 4070", category: "Компьютеры", categoryId: 2 },
  { id: 322, title: "ПК офисный Intel Core i5 16GB RAM", category: "Компьютеры", categoryId: 2 },
  { id: 323, title: "Системный блок AMD Ryzen 7 RX 7800", category: "Компьютеры", categoryId: 2 },
  { id: 324, title: "Процессор Intel Core i9-14900K 24 ядра", category: "Компьютеры", categoryId: 2 },
  { id: 325, title: "Видеокарта NVIDIA RTX 4090 24GB", category: "Компьютеры", categoryId: 2 },
  { id: 326, title: "Роутер TP-Link Archer AX73 WiFi 6", category: "Компьютеры", categoryId: 2 },
  { id: 327, title: "Маршрутизатор Asus RT-AX88U Dual-Band", category: "Компьютеры", categoryId: 2 },
  { id: 328, title: "Портативная колонка JBL Flip 6 Bluetooth", category: "Электроника", categoryId: 1 },
  { id: 329, title: "Умная колонка Яндекс Станция Макс", category: "Электроника", categoryId: 1 },
  { id: 330, title: "Акустическая система Marshall Emberton II", category: "Электроника", categoryId: 1 },
  { id: 331, title: "Экшн-камера GoPro HERO 12 Black", category: "Электроника", categoryId: 1 },
  { id: 332, title: "Фотоаппарат Canon EOS R6 Mark II", category: "Электроника", categoryId: 1 },
  { id: 333, title: "Видеокамера Sony FDR-AX700 4K HDR", category: "Электроника", categoryId: 1 },
  { id: 334, title: "Рубашка мужская деловая белая", category: "Одежда", categoryId: 4 },
  { id: 335, title: "Брюки мужские классические черные", category: "Одежда", categoryId: 4 },
  { id: 336, title: "Пиджак мужской серый шерстяной", category: "Одежда", categoryId: 4 },
  { id: 337, title: "Платье женское вечернее черное", category: "Одежда", categoryId: 4 },
  { id: 338, title: "Блузка женская шелковая белая", category: "Одежда", categoryId: 4 },
  { id: 339, title: "Юбка женская карандаш синяя", category: "Одежда", categoryId: 4 },
  { id: 340, title: "Комбинезон детский утепленный", category: "Одежда", categoryId: 4 },
  { id: 341, title: "Куртка детская демисезонная", category: "Одежда", categoryId: 4 },
  { id: 342, title: "Джинсы детские синие", category: "Одежда", categoryId: 4 },
  { id: 343, title: "Ремень мужской кожаный черный", category: "Одежда", categoryId: 4 },
  { id: 344, title: "Шарф кашемировый серый", category: "Одежда", categoryId: 4 },
  { id: 345, title: "Перчатки кожаные зимние", category: "Одежда", categoryId: 4 },
  { id: 346, title: "Ботинки мужские зимние кожаные", category: "Обувь", categoryId: 5 },
  { id: 347, title: "Туфли мужские классические черные", category: "Обувь", categoryId: 5 },
  { id: 348, title: "Мокасины мужские замшевые", category: "Обувь", categoryId: 5 },
  { id: 349, title: "Сапоги женские кожаные черные", category: "Обувь", categoryId: 5 },
  { id: 350, title: "Туфли женские на каблуке бежевые", category: "Обувь", categoryId: 5 },
  { id: 351, title: "Балетки женские кожаные", category: "Обувь", categoryId: 5 },
  { id: 352, title: "Кроссовки детские Nike Air Force", category: "Обувь", categoryId: 5 },
  { id: 353, title: "Ботинки детские утепленные", category: "Обувь", categoryId: 5 },
  { id: 354, title: "Сандалии детские летние", category: "Обувь", categoryId: 5 },
  { id: 355, title: "Кроссовки Adidas Ultraboost беговые", category: "Обувь", categoryId: 5 },
  { id: 356, title: "Кроссовки Puma RS-X спортивные", category: "Обувь", categoryId: 5 },
  { id: 357, title: "Кеды Vans Old Skool черные", category: "Обувь", categoryId: 5 },];
function generateProductFromCSV(data: { id: number; title: string; category: string; categoryId: number }): Product {
  const id = data.id;
  const rand1 = seededRandom(id * 1);
  const rand2 = seededRandom(id * 2);
  const rand3 = seededRandom(id * 3);
  const rand4 = seededRandom(id * 4);
  const rand5 = seededRandom(id * 5);
  const rand6 = seededRandom(id * 6);
  const rand7 = seededRandom(id * 7);
  
  // Определяем базовую цену по категории и типу товара
  let basePrice = 10000;
  if (data.title.includes('Смартфон')) basePrice = 30000 + rand1 * 70000;
  else if (data.title.includes('Наушники')) basePrice = 5000 + rand1 * 30000;
  else if (data.title.includes('Часы')) basePrice = 15000 + rand1 * 40000;
  else if (data.title.includes('Планшет')) basePrice = 25000 + rand1 * 50000;
  else if (data.title.includes('Ноутбук')) basePrice = 40000 + rand1 * 100000;
  else if (data.title.includes('Монитор')) basePrice = 15000 + rand1 * 50000;
  else if (data.title.includes('Клавиатура')) basePrice = 3000 + rand1 * 15000;
  else if (data.title.includes('Мышь')) basePrice = 2000 + rand1 * 10000;
  // Книги - до 2000 рублей (кроме товара 108 - Бхагават-Гита)
  else if (data.category === 'Книги' && id !== 108) basePrice = 500 + rand1 * 1500;
  else basePrice = 5000 + rand1 * 30000;
  
  const hasDiscount = rand1 > 0.7;
  const discountPercent = hasDiscount ? Math.floor(rand2 * 40) + 10 : 0;
  const price = Math.floor(basePrice);
  const oldPrice = hasDiscount ? Math.floor(basePrice / (1 - discountPercent / 100)) : undefined;
  
  const badges = hasDiscount ? ['Скидка', 'Хит продаж', 'Супер цена'] : ['Новинка', 'Хит продаж', null];
  const badge = rand3 > 0.6 ? badges[Math.floor(rand4 * badges.length)] : undefined;
  
  // Изображение по ID
  const image = `/images/${id}.png`;
  
  // Генерация описания для товара
  let description = generateDescription(data.title, data.category, id);
  
  // Специальное описание для Бхагават-Гиты (ID 108) - переопределяем
  if (id === 108) {
    description = `📚 Полное описание

«Лучше выполнять свой долг плохо, чем чужой — отлично.»
Но ввод пользователя всё равно нужно валидировать.

Это особое издание Бхагавад-Гиты, которое случайно затесалось в маркетплейс среди USB-эксплойтов, фейковых скидок и XSS-тестов. Несёт ясность уму, облегчает работу с токсичными legacy-проектами и помогает держать себя в руках при виде уязвимостей уровня Critical.

⭐ Что даёт разработчику

+10 к стойкости перед дедлайнами
+15 к внимательности при code review
+5 к умению принимать кармически верные pull-request'ы
+1 шанс, что QA перестанет ломать твою жизнь

🔐 AppSec-пасхалки

✔ Кришна советует действовать правильно, даже когда никто не видит.
✔ OWASP советует валидировать, даже если это внутренняя админка.
✔ Даже Арджуна бы написал нормальный regex для email-валидации.`;
  }
  
  return {
    id: id.toString(),
    title: data.title,
    price,
    oldPrice: oldPrice || undefined,
    rating: id === 108 ? 5.0 : +(rand5 * 1 + 4).toFixed(1), // Для Бхагават-Гиты (ID 108) рейтинг 5.0
    reviews: Math.floor(rand6 * 5000) + 50,
    image,
    badge,
    inStock: rand7 > 0.1,
    categoryId: data.categoryId,
    category: data.category,
    discount: discountPercent || undefined,
    warranty: [12, 24, 36][id % 3],
    seller: ['OmniMarket', 'TechStore', 'ElectroPlus', 'GadgetHub'][id % 4],
    description,
  };
}

// Генерируем products из CSV данных
export const products: Product[] = PRODUCTS_DATA.map(generateProductFromCSV);

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (categoryId: number): Product[] => {
  return products.filter(p => p.categoryId === categoryId);
};

export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter(p => p.brand === brand);
};

export const getBrands = (categoryId?: number): string[] => {
  const filteredProducts = categoryId ? products.filter(p => p.categoryId === categoryId) : products;
  const brands = new Set(filteredProducts.map(p => p.brand).filter(Boolean) as string[]);
  return Array.from(brands).sort();
};

export const getPriceRange = (categoryId?: number): [number, number] => {
  const filteredProducts = categoryId ? products.filter(p => p.categoryId === categoryId) : products;
  const prices = filteredProducts.map(p => p.price);
  return [Math.min(...prices), Math.max(...prices)];
};

console.log(`
🎉 ===== ТОВАРЫ ЗАГРУЖЕНЫ ИЗ CSV =====
📦 Всего товаров: ${products.length}
🖼️  Все товары имеют индивидуальные фотографии!
`);
