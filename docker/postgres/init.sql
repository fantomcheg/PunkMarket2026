-- OmniMarket Database Schema
-- Vulnerable by design для обучения SQL Injection

-- Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE
);

-- Таблица товаров
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2),
    category_id INTEGER NOT NULL,
    category_name VARCHAR(100),
    rating DECIMAL(3, 2) DEFAULT 0.0,
    reviews_count INTEGER DEFAULT 0,
    image_url TEXT,
    badge VARCHAR(100),
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица категорий
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    parent_id INTEGER REFERENCES categories(id)
);

-- Таблица отзывов
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    user_id INTEGER REFERENCES users(id),
    user_name VARCHAR(255),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    helpful_count INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заказов
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    delivery_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица items заказа
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Вставляем тестовые данные
INSERT INTO categories (id, name, icon) VALUES
(1, 'Электроника', '📱'),
(2, 'Компьютеры', '💻'),
(3, 'Бытовая техника', '🔌'),
(15, 'Игры и консоли', '🎮'),
(9, 'Спорт и отдых', '⚽');

-- Вставляем тестовых пользователей
INSERT INTO users (username, email, password_hash, full_name, role, is_verified) VALUES
('admin', 'admin@omnimarket.ru', '$2b$10$vulnerable_hash_1', 'Администратор', 'admin', TRUE),
('testuser', 'test@example.com', '$2b$10$vulnerable_hash_2', 'Тестовый Пользователь', 'user', TRUE),
('hacker', 'hacker@evil.com', '$2b$10$vulnerable_hash_3', 'Evil Hacker', 'user', FALSE);

-- Вставляем товары из нашего магазина
INSERT INTO products (id, title, price, old_price, category_id, category_name, rating, reviews_count, image_url, badge, in_stock) VALUES
(1, 'Смартфон Samsung Galaxy S24 Ultra 256GB', 89990, 119990, 1, 'Смартфоны', 4.8, 1243, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop', 'Хит продаж', TRUE),
(2, 'Ноутбук Apple MacBook Air 13 M2 2024', 124990, 149990, 2, 'Ноутбуки', 4.9, 856, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', 'Новинка', TRUE),
(3, 'Беспроводные наушники Sony WH-1000XM5', 29990, NULL, 1, 'Электроника', 4.7, 2341, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', NULL, TRUE),
(6, 'Игровая консоль PlayStation 5 Slim', 54990, 64990, 15, 'Игры и консоли', 4.9, 3421, 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop', 'Хит продаж', TRUE);

-- Вставляем отзывы
INSERT INTO reviews (product_id, user_id, user_name, rating, text, helpful_count, verified) VALUES
(1, 2, 'Александр М.', 5, 'Отличный флагман! Камера снимает просто невероятно, особенно в ночном режиме. Батарея держит весь день при активном использовании. S Pen очень удобен для заметок.', 156, TRUE),
(1, 2, 'Екатерина П.', 4, 'Телефон хороший, но очень большой. Для женской руки не очень удобно. В остальном - топ!', 89, TRUE);

-- Создаем индексы для быстрого поиска
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_users_email ON users(email);

-- ВАЖНО: Это демо-БД с уязвимостями!
-- В продакшене никогда не используйте такие простые пароли и схемы!
