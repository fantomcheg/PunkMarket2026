export interface Review {
  id: number;
  productId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  text: string;
  photos?: string[];
  helpful: number;
  verified: boolean;
}

export const reviews: Review[] = [
  // Отзывы для Samsung Galaxy S24 Ultra (id: 1)
  {
    id: 1,
    productId: 1,
    userName: 'Александр М.',
    rating: 5,
    date: '2024-11-28',
    text: 'Отличный флагман! Камера снимает просто невероятно, особенно в ночном режиме. Батарея держит весь день при активном использовании. S Pen очень удобен для заметок.',
    helpful: 156,
    verified: true
  },
  {
    id: 2,
    productId: 1,
    userName: 'Екатерина П.',
    rating: 4,
    date: '2024-11-25',
    text: 'Телефон хороший, но очень большой. Для женской руки не очень удобно. В остальном - топ!',
    helpful: 89,
    verified: true
  },
  {
    id: 3,
    productId: 1,
    userName: 'Дмитрий К.',
    rating: 5,
    date: '2024-11-20',
    text: 'Перешел с iPhone 14 Pro Max. Samsung впечатлил! Экран ярче, камера лучше, батарея дольше держит. Рекомендую!',
    helpful: 234,
    verified: true
  },

  // Отзывы для iPhone 15 Pro Max (id: 2)
  {
    id: 4,
    productId: 2,
    userName: 'Ирина В.',
    rating: 5,
    date: '2024-11-29',
    text: 'Лучший iPhone за всю историю! Титановый корпус очень приятный, камера просто огонь. iOS 17 работает без лагов.',
    helpful: 312,
    verified: true
  },
  {
    id: 5,
    productId: 2,
    userName: 'Максим Т.',
    rating: 5,
    date: '2024-11-27',
    text: 'Взял в титане. Выглядит премиально! Action Button удобная, сразу настроил на камеру. Батарея 2 дня держит при моем использовании.',
    helpful: 187,
    verified: true
  },
  {
    id: 6,
    productId: 2,
    userName: 'Ольга С.',
    rating: 4,
    date: '2024-11-23',
    text: 'Отличный телефон, но дорогой. Если есть деньги - однозначно брать. Если нет - можно подождать 16 модель или взять 14 Pro.',
    helpful: 145,
    verified: false
  },

  // Отзывы для Xiaomi 14 Pro (id: 3)
  {
    id: 7,
    productId: 3,
    userName: 'Антон Л.',
    rating: 5,
    date: '2024-11-26',
    text: 'За эту цену - просто бомба! Камера как у флагманов за 100к+. MIUI 15 работает шустро, никаких глюков.',
    helpful: 267,
    verified: true
  },
  {
    id: 8,
    productId: 3,
    userName: 'Виктория Р.',
    rating: 4,
    date: '2024-11-24',
    text: 'Хороший телефон, но много предустановленных приложений. Пришлось удалять вручную. В остальном доволен.',
    helpful: 98,
    verified: true
  },

  // Отзывы для MacBook Pro 14 (id: 11)
  {
    id: 9,
    productId: 11,
    userName: 'Сергей Н.',
    rating: 5,
    date: '2024-11-30',
    text: 'Работаю в Final Cut Pro - летает! M3 Pro справляется с 4K видео на ура. Батарея держит 12+ часов.',
    helpful: 423,
    verified: true
  },
  {
    id: 10,
    productId: 11,
    userName: 'Анна К.',
    rating: 5,
    date: '2024-11-28',
    text: 'Лучший ноутбук для дизайна! Цветопередача экрана идеальная. Тихий, не греется. Рекомендую всем дизайнерам!',
    helpful: 356,
    verified: true
  },
  {
    id: 11,
    productId: 11,
    userName: 'Павел М.',
    rating: 4,
    date: '2024-11-25',
    text: 'Отличная машина, но цена кусается. Если нужен для работы - окупится быстро. Для серфинга интернета - дорого.',
    helpful: 189,
    verified: false
  },

  // Отзывы для ASUS ROG (id: 12)
  {
    id: 12,
    productId: 12,
    userName: 'Игорь С.',
    rating: 5,
    date: '2024-11-29',
    text: 'Игровой монстр! RTX 4070 тянет все на ультрах. Охлаждение отличное, не шумит. Клавиатура удобная для гейминга.',
    helpful: 512,
    verified: true
  },
  {
    id: 13,
    productId: 12,
    userName: 'Алексей П.',
    rating: 5,
    date: '2024-11-27',
    text: 'Играю в Cyberpunk 2077 на максималках - 60+ FPS стабильно. Экран 165 Гц - красота! RGB подсветка топ.',
    helpful: 289,
    verified: true
  },

  // Отзывы для Sony WH-1000XM5 (id: 16)
  {
    id: 14,
    productId: 16,
    userName: 'Мария Д.',
    rating: 5,
    date: '2024-11-30',
    text: 'Лучшие наушники с шумодавом! В метро вообще ничего не слышно. Звук чистый, басы глубокие. Сидят удобно.',
    helpful: 678,
    verified: true
  },
  {
    id: 15,
    productId: 16,
    userName: 'Николай Б.',
    rating: 5,
    date: '2024-11-28',
    text: 'Использую в самолетах - шум двигателей полностью гасится. Батарея держит 30 часов. Стоят своих денег!',
    helpful: 445,
    verified: true
  },

  // Отзывы для PlayStation 5 (id: 19)
  {
    id: 16,
    productId: 19,
    userName: 'Владимир Г.',
    rating: 5,
    date: '2024-11-29',
    text: 'Наконец-то купил! Spider-Man 2 в 4K 60 FPS - невероятно! Загрузки мгновенные благодаря SSD. Рекомендую!',
    helpful: 892,
    verified: true
  },
  {
    id: 17,
    productId: 19,
    userName: 'Евгений Л.',
    rating: 4,
    date: '2024-11-26',
    text: 'Консоль отличная, но игры дорогие. Подписка PS Plus тоже не дешевая. Но игровой опыт стоит того.',
    helpful: 234,
    verified: true
  },

  // Отзывы для Samsung QLED (id: 21)
  {
    id: 18,
    productId: 21,
    userName: 'Татьяна Н.',
    rating: 5,
    date: '2024-11-30',
    text: 'Невероятная картинка! HDR просто бомба, цвета насыщенные. Смарт ТВ работает быстро, без подвисаний.',
    helpful: 567,
    verified: true
  },
  {
    id: 19,
    productId: 21,
    userName: 'Андрей Ж.',
    rating: 5,
    date: '2024-11-27',
    text: 'Купил для PS5 - идеальное сочетание! 4K 120 Гц, низкая задержка. Фильмы смотреть - одно удовольствие!',
    helpful: 389,
    verified: true
  },

  // Отзывы для Apple Watch Ultra 2 (id: 6)
  {
    id: 20,
    productId: 6,
    userName: 'Роман К.',
    rating: 5,
    date: '2024-11-29',
    text: 'Занимаюсь триатлоном - часы идеальны! GPS точный, батарея 2 дня держит. Титановый корпус очень крепкий.',
    helpful: 445,
    verified: true
  },
  {
    id: 21,
    productId: 6,
    userName: 'Елена М.',
    rating: 4,
    date: '2024-11-26',
    text: 'Отличные часы, но большие. Для женской руки многовато. В остальном - функционал огромный!',
    helpful: 178,
    verified: false
  },
  
  // Отзывы для Бхагават-Гиты (id: 108 - после обмена с планшетом)
  {
    id: 22,
    productId: 108,
    userName: 'Михаил С.',
    rating: 5,
    date: '2024-11-30',
    text: 'Лучший учебник по жизненному циклу разработки! Глава про карму объяснила мне, почему код предыдущего разработчика работает именно так. Теперь пишу комментарии с любовью.',
    helpful: 892,
    verified: true
  },
  {
    id: 23,
    productId: 108,
    userName: 'Анастасия Р.',
    rating: 5,
    date: '2024-11-28',
    text: 'Прочитала перед собеседованием на Senior. Теперь понимаю, что важнее делать правильно, чем быстро. И да, SQL-инъекции валидировать ОБЯЗАТЕЛЬНО, даже если "это только админка".',
    helpful: 1247,
    verified: true
  },
  {
    id: 24,
    productId: 108,
    userName: 'Дмитрий К.',
    rating: 5,
    date: '2024-11-27',
    text: 'Читаю каждый раз перед code review. +15 к внимательности работает! Теперь замечаю уязвимости, которые раньше пропускал. Арджуна был бы горд.',
    helpful: 678,
    verified: true
  },
  {
    id: 25,
    productId: 108,
    userName: 'Елена В.',
    rating: 5,
    date: '2024-11-26',
    text: 'После прочтения перестала хардкодить пароли. Кришна учит: "Делай правильно, даже когда никто не видит". OWASP бы одобрил!',
    helpful: 945,
    verified: true
  },
  {
    id: 26,
    productId: 108,
    userName: 'Александр Т.',
    rating: 5,
    date: '2024-11-25',
    text: 'Работаю в security команде. Эта книга помогла мне принять, что некоторые legacy-проекты исправлять бессмысленно - нужно переписывать. Карма девопсера тяжела, но справедлива.',
    helpful: 1534,
    verified: true
  },
  {
    id: 27,
    productId: 108,
    userName: 'Игорь Л.',
    rating: 4,
    date: '2024-11-24',
    text: 'Отличная книга, но regex для email всё равно писать сложно. Может быть, нужно прочитать ещё раз?',
    helpful: 423,
    verified: true
  },
  {
    id: 28,
    productId: 108,
    userName: 'Ольга Н.',
    rating: 5,
    date: '2024-11-23',
    text: 'QA здесь. После прочтения начала баги репортить с любовью, а не с пассивной агрессией. Разработчики в шоке, продакшн стабилен. Магия работает!',
    helpful: 2156,
    verified: true
  },
  {
    id: 29,
    productId: 108,
    userName: 'Сергей М.',
    rating: 5,
    date: '2024-11-22',
    text: 'Прочитал главу про дхарму перед тем как объяснять джуну почему нельзя делать eval() на user input. Получилось спокойно и без мата. Книга работает!',
    helpful: 1823,
    verified: true
  },
  {
    id: 30,
    productId: 108,
    userName: 'Наталья П.',
    rating: 5,
    date: '2024-11-21',
    text: 'Держу на рабочем столе рядом с OWASP Top 10. Когда находишь Critical уязвимость в проде - открываешь наугад и читаешь. Помогает не паниковать.',
    helpful: 1667,
    verified: true
  },
  {
    id: 31,
    productId: 108,
    userName: 'Максим Б.',
    rating: 5,
    date: '2024-11-20',
    text: 'Backend разработчик с 10 летним стажем. Эта книга объяснила мне больше про архитектуру, чем все курсы на Udemy. Особенно про то, что важнее делать правильно, чем чужую работу.',
    helpful: 2341,
    verified: true
  },
  {
    id: 32,
    productId: 108,
    userName: 'Виктория Г.',
    rating: 5,
    date: '2024-11-19',
    text: 'Читаю перед каждым спринтом. Теперь понимаю: "Ты не можешь контролировать баги в проде, но можешь контролировать свою реакцию на них". Дзен достигнут.',
    helpful: 1456,
    verified: true
  },
  {
    id: 33,
    productId: 108,
    userName: 'Андрей Ж.',
    rating: 5,
    date: '2024-11-18',
    text: 'Пентестер тут. После этой книги начал писать отчёты с состраданием к разработчикам. "Делай правильно, даже когда никто не видит" - девиз каждого хорошего AppSec специалиста.',
    helpful: 1789,
    verified: true
  },
  {
    id: 34,
    productId: 108,
    userName: 'Роман К.',
    rating: 5,
    date: '2024-11-17',
    text: 'Младший разработчик здесь. Прочитал по совету тимлида. Теперь понимаю, что валидация ввода - это не просто правило, это ДОЛГ. И regex для email я всё-таки осилил!',
    helpful: 923,
    verified: true
  },
  {
    id: 35,
    productId: 108,
    userName: 'Светлана Д.',
    rating: 5,
    date: '2024-11-16',
    text: 'Tech Lead в стартапе. Читаю команде вслух перед ретро. Теперь обсуждаем проблемы конструктивно, а не ищем виноватых. Продуктивность +100500.',
    helpful: 2678,
    verified: true
  },
  {
    id: 36,
    productId: 108,
    userName: 'Павел С.',
    rating: 5,
    date: '2024-11-15',
    text: 'DevSecOps инженер. Эта книга в комплекте с "The Web Application Hacker\'s Handbook" - идеальная комбинация. Одна учит принимать, другая - ломать. Баланс важен.',
    helpful: 3124,
    verified: true
  },
  {
    id: 37,
    productId: 108,
    userName: 'Артём К.',
    rating: 5,
    date: '2024-11-14',
    text: '"Я - источник всех духовных и материальных миров" (БГ 10.8). Прочитал эту главу и понял: код - это проявление архитектуры, архитектура - проявление идеи. Теперь перед рефакторингом ищу источник проблемы, а не латаю симптомы. Критичные баги находятся быстрее.',
    helpful: 2845,
    verified: true
  },
  {
    id: 38,
    productId: 108,
    userName: 'Владимир Г.',
    rating: 5,
    date: '2024-11-12',
    text: '"Я наделяю разумом, который помогает им прийти ко Мне" (БГ 10.10). Джун разработчик тут. Читал эту главу перед сложным рефакторингом legacy кода. Внезапно все стало понятно - куда двигаться, что удалять, как структурировать. Словно кто-то включил свет в темной комнате. Рефакторинг прошел без единого бага.',
    helpful: 2934,
    verified: true
  },
];

// Генератор случайных отзывов для товаров
export const generateRandomReviews = (productId: number, count: number = 3): Review[] => {
  const names = [
    'Александр', 'Екатерина', 'Дмитрий', 'Ирина', 'Максим', 'Ольга', 
    'Антон', 'Виктория', 'Сергей', 'Анна', 'Павел', 'Мария'
  ];
  
  const lastNames = ['М.', 'П.', 'К.', 'В.', 'Т.', 'С.', 'Л.', 'Р.', 'Н.', 'Д.'];
  
  const positiveTexts = [
    'Отличный товар! Качество супер, доставка быстрая. Рекомендую!',
    'Очень доволен покупкой. Соответствует описанию. Цена адекватная.',
    'Товар хороший, без нареканий. Упаковка качественная. Спасибо продавцу!',
    'Купил по акции - не пожалел! За эти деньги просто отличный вариант.',
    'Качество превзошло ожидания! Работает отлично. Всем советую брать!',
  ];
  
  const neutralTexts = [
    'Нормальный товар за свою цену. Есть небольшие недочеты, но в целом доволен.',
    'Качество среднее, но для таких денег сойдет. Главное - работает.',
    'Товар пришел быстро, но упаковка помята. Сам товар целый, претензий нет.',
  ];
  
  const result: Review[] = [];
  
  for (let i = 0; i < count; i++) {
    const rating = Math.random() > 0.3 ? 5 : (Math.random() > 0.5 ? 4 : 3);
    const texts = rating >= 4 ? positiveTexts : neutralTexts;
    
    result.push({
      id: Date.now() + i + productId * 1000,
      productId,
      userName: `${names[Math.floor(Math.random() * names.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      rating,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      text: texts[Math.floor(Math.random() * texts.length)],
      helpful: Math.floor(Math.random() * 500),
      verified: Math.random() > 0.2
    });
  }
  
  return result;
};

export const getReviewsForProduct = (productId: number): Review[] => {
  const existingReviews = reviews.filter(r => r.productId === productId);
  if (existingReviews.length > 0) {
    return existingReviews;
  }
  // Если нет реальных отзывов, генерируем случайные
  return generateRandomReviews(productId, 2);
};
