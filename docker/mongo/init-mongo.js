// OmniMarket MongoDB Init Script
// Vulnerable by design для обучения NoSQL Injection

db = db.getSiblingDB('omnimarket');

// Создаем коллекции
db.createCollection('users');
db.createCollection('products');
db.createCollection('reviews');
db.createCollection('orders');
db.createCollection('sessions');

// Вставляем тестовых пользователей
db.users.insertMany([
  {
    _id: ObjectId(),
    username: 'admin',
    email: 'admin@omnimarket.ru',
    password: 'vulnerable_hash_admin_123',
    fullName: 'Администратор',
    role: 'admin',
    isVerified: true,
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    username: 'testuser',
    email: 'test@example.com',
    password: 'vulnerable_hash_user_456',
    fullName: 'Тестовый Пользователь',
    role: 'user',
    isVerified: true,
    favorites: [],
    cart: [],
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    username: 'hacker',
    email: 'hacker@evil.com',
    password: 'vulnerable_hash_hacker_789',
    fullName: 'Evil Hacker',
    role: 'user',
    isVerified: false,
    createdAt: new Date()
  }
]);

// Вставляем товары
db.products.insertMany([
  {
    _id: '1',
    title: 'Смартфон Samsung Galaxy S24 Ultra 256GB',
    price: 89990,
    oldPrice: 119990,
    categoryId: 1,
    category: 'Смартфоны',
    rating: 4.8,
    reviews: 1243,
    badge: 'Хит продаж',
    inStock: true,
    tags: ['смартфон', 'samsung', 'флагман'],
    specs: {
      brand: 'Samsung',
      memory: '256GB',
      color: 'Черный'
    }
  },
  {
    _id: '2',
    title: 'Ноутбук Apple MacBook Air 13 M2 2024',
    price: 124990,
    oldPrice: 149990,
    categoryId: 2,
    category: 'Ноутбуки',
    rating: 4.9,
    reviews: 856,
    badge: 'Новинка',
    inStock: true,
    tags: ['ноутбук', 'apple', 'macbook'],
    specs: {
      brand: 'Apple',
      processor: 'M2',
      ram: '8GB'
    }
  }
]);

// Вставляем отзывы
db.reviews.insertMany([
  {
    _id: ObjectId(),
    productId: '1',
    userId: ObjectId(),
    userName: 'Александр М.',
    rating: 5,
    text: 'Отличный флагман! Камера снимает просто невероятно.',
    helpful: 156,
    verified: true,
    createdAt: new Date('2024-11-28')
  },
  {
    _id: ObjectId(),
    productId: '1',
    userId: ObjectId(),
    userName: 'Екатерина П.',
    rating: 4,
    text: 'Телефон хороший, но очень большой.',
    helpful: 89,
    verified: true,
    createdAt: new Date('2024-11-25')
  }
]);

// Создаем индексы
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });
db.products.createIndex({ categoryId: 1 });
db.products.createIndex({ title: 'text' });
db.reviews.createIndex({ productId: 1 });

print('✅ MongoDB initialized successfully for OmniMarket');
print('⚠️  WARNING: This database has intentional vulnerabilities for educational purposes!');
