#!/bin/bash

# Скрипт запуска PunkMarket

echo ""
echo "╔═══════════════════════════════════════════╗"
echo "║   🛒 PUNKMARKET - Запуск сервера          ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен!"
    exit 1
fi

echo "✓ Node.js $(node --version)"
echo ""

# Проверка зависимостей
if [ ! -d "node_modules" ]; then
    echo "📦 Установка зависимостей..."
    npm install
    echo ""
fi

# Освобождение порта 3000
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Порт 3000 занят. Освобождаем..."
    fuser -k 3000/tcp 2>/dev/null
    sleep 2
fi

# Запуск сервера
echo "🚀 Запуск Next.js сервера..."
echo ""
echo "Откройте в браузере:"
echo "→ http://localhost:3000"
echo ""
echo "Для остановки нажмите Ctrl+C"
echo ""

npm run dev
