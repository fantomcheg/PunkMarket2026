// X-Ray metadata - информация о backend для каждого элемента
export interface XRayEndpoint {
  method: string;
  path: string;
  controller: string;
}

export interface XRayVulnerability {
  pattern: string;
  status: 'vulnerable' | 'safe';
  description: string;
  difficulty: number;
  cwe: string[];
}

export interface XRayData {
  id: string;
  title: string;
  endpoint: XRayEndpoint;
  validation?: Record<string, string[]>;
  flow: string[];
  vulnerabilities: XRayVulnerability[];
  backend: {
    language: 'nodejs' | 'java' | 'php';
    framework: string;
    code?: string;
  };
}

export const xrayMetadata: Record<string, XRayData> = {
  search_bar: {
    id: 'search_bar',
    title: 'Строка поиска',
    endpoint: {
      method: 'GET',
      path: '/api/search',
      controller: 'SearchController.search',
    },
    validation: {
      query: ['required', 'min:1', 'max:200'],
    },
    flow: [
      '1. Получаем query параметр из запроса',
      '2. Формируем SQL запрос для поиска',
      '3. Выполняем запрос к базе данных',
      '4. Возвращаем результаты',
    ],
    vulnerabilities: [
      {
        pattern: 'sql-injection',
        status: 'vulnerable',
        description: 'Поисковый запрос напрямую подставляется в SQL без экранирования',
        difficulty: 2,
        cwe: ['CWE-89'],
      },
    ],
    backend: {
      language: 'nodejs',
      framework: 'NestJS',
      code: `// SearchController.ts
@Get('/search')
async search(@Query('query') query: string) {
  const sql = \`SELECT * FROM products 
               WHERE name LIKE '%\${query}%'\`;
  return await this.db.raw(sql);
}`,
    },
  },
  
  catalog_button: {
    id: 'catalog_button',
    title: 'Кнопка каталога',
    endpoint: {
      method: 'GET',
      path: '/api/categories',
      controller: 'CategoryController.list',
    },
    flow: [
      '1. Запрос списка категорий',
      '2. Получение из базы данных',
      '3. Возврат JSON ответа',
    ],
    vulnerabilities: [
      {
        pattern: 'information-disclosure',
        status: 'vulnerable',
        description: 'API возвращает скрытые категории и внутренние ID',
        difficulty: 1,
        cwe: ['CWE-200'],
      },
    ],
    backend: {
      language: 'nodejs',
      framework: 'NestJS',
      code: `// CategoryController.ts
@Get('/categories')
async list() {
  return await this.db.categories.findMany();
}`,
    },
  },

  login_button: {
    id: 'login_button',
    title: 'Форма входа',
    endpoint: {
      method: 'POST',
      path: '/api/auth/login',
      controller: 'AuthController.login',
    },
    validation: {
      email: ['required', 'format:email'],
      password: ['required', 'min:6'],
    },
    flow: [
      '1. Получаем email и password',
      '2. Ищем пользователя в базе данных',
      '3. Проверяем пароль',
      '4. Генерируем JWT токен',
      '5. Возвращаем токен',
    ],
    vulnerabilities: [
      {
        pattern: 'broken-authentication',
        status: 'vulnerable',
        description: 'Нет ограничения на количество попыток входа (brute-force)',
        difficulty: 1,
        cwe: ['CWE-307'],
      },
      {
        pattern: 'timing-attack',
        status: 'vulnerable',
        description: 'Разное время ответа для существующих/несуществующих пользователей',
        difficulty: 3,
        cwe: ['CWE-208'],
      },
    ],
    backend: {
      language: 'nodejs',
      framework: 'NestJS',
      code: `// AuthController.ts
@Post('/login')
async login(@Body() dto: LoginDto) {
  const user = await this.db.users.findOne({ 
    email: dto.email 
  });
  
  if (!user) {
    return { error: 'User not found' };
  }
  
  const valid = await bcrypt.compare(
    dto.password, 
    user.password
  );
  
  if (!valid) {
    return { error: 'Invalid password' };
  }
  
  return { token: this.generateJWT(user) };
}`,
    },
  },

  add_to_cart_1: {
    id: 'add_to_cart_1',
    title: 'Добавить в корзину',
    endpoint: {
      method: 'POST',
      path: '/api/cart/add',
      controller: 'CartController.addItem',
    },
    validation: {
      productId: ['required', 'uuid'],
      quantity: ['required', 'integer', 'min:1'],
    },
    flow: [
      '1. Получаем productId и quantity',
      '2. Проверяем авторизацию пользователя',
      '3. Добавляем товар в корзину',
      '4. Пересчитываем итоговую сумму',
    ],
    vulnerabilities: [
      {
        pattern: 'idor',
        status: 'vulnerable',
        description: 'Можно добавить товар в чужую корзину, подменив userId',
        difficulty: 2,
        cwe: ['CWE-639'],
      },
      {
        pattern: 'race-condition',
        status: 'vulnerable',
        description: 'Нет блокировки при одновременном добавлении товара',
        difficulty: 4,
        cwe: ['CWE-362'],
      },
    ],
    backend: {
      language: 'nodejs',
      framework: 'NestJS',
      code: `// CartController.ts
@Post('/cart/add')
async addItem(@Body() dto: AddToCartDto) {
  const cart = await this.db.carts.findOne({ 
    userId: dto.userId 
  });
  
  await this.db.cartItems.create({
    cartId: cart.id,
    productId: dto.productId,
    quantity: dto.quantity
  });
  
  return { success: true };
}`,
    },
  },

  category_1: {
    id: 'category_1',
    title: 'Категория "Электроника"',
    endpoint: {
      method: 'GET',
      path: '/api/category/1/products',
      controller: 'ProductController.byCategory',
    },
    validation: {
      categoryId: ['required', 'integer'],
      page: ['integer', 'min:1'],
      limit: ['integer', 'min:1', 'max:100'],
    },
    flow: [
      '1. Получаем categoryId из URL',
      '2. Запрашиваем товары категории',
      '3. Применяем пагинацию',
      '4. Возвращаем список товаров',
    ],
    vulnerabilities: [
      {
        pattern: 'nosql-injection',
        status: 'vulnerable',
        description: 'Фильтры передаются напрямую в MongoDB query',
        difficulty: 3,
        cwe: ['CWE-943'],
      },
    ],
    backend: {
      language: 'nodejs',
      framework: 'NestJS',
      code: `// ProductController.ts
@Get('/category/:id/products')
async byCategory(
  @Param('id') categoryId: string,
  @Query() filters: any
) {
  return await this.db.products.find({
    categoryId: categoryId,
    ...filters
  });
}`,
    },
  },

  // Все остальные категории используют тот же код
  category_2: {
    id: 'category_2',
    title: 'Категория',
    endpoint: { method: 'GET', path: '/api/category/2/products', controller: 'ProductController.byCategory' },
    flow: ['1. Получаем categoryId', '2. Запрос товаров', '3. Возврат'],
    vulnerabilities: [],
    backend: {
      language: 'nodejs', framework: 'NestJS',
      code: `@Get('/category/:id/products')
async byCategory(@Param('id') id: string, @Query() filters: any) {
  return await this.db.products.find({ categoryId: id, ...filters });
}`
    },
  },

  category_3: { id: 'category_3', title: 'Категория', endpoint: { method: 'GET', path: '/api/category/3/products', controller: 'ProductController.byCategory' }, flow: ['1. Запрос категории', '2. Возврат'], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/category/:id/products')
async byCategory(@Param('id') id: string) {
  return this.db.products.find({ categoryId: id });
}` } },
  
  category_4: { id: 'category_4', title: 'Категория', endpoint: { method: 'GET', path: '/api/category/4/products', controller: 'ProductController.byCategory' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/category/:id/products')
async byCategory(@Param('id') id: string) {
  return this.db.products.find({ categoryId: id });
}` } },

  category_5: { id: 'category_5', title: 'Категория', endpoint: { method: 'GET', path: '/api/category/5/products', controller: 'ProductController.byCategory' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/category/:id/products')
async byCategory(@Param('id') id: string) {
  return this.db.products.find({ categoryId: id });
}` } },

  category_6: { id: 'category_6', title: 'Категория', endpoint: { method: 'GET', path: '/api/category/6/products', controller: 'ProductController.byCategory' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/category/:id/products')
async byCategory(@Param('id') id: string) {
  return this.db.products.find({ categoryId: id });
}` } },

  category_7: { id: 'category_7', title: 'Категория', endpoint: { method: 'GET', path: '/api/category/7/products', controller: 'ProductController.byCategory' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/category/:id/products')
async byCategory(@Param('id') id: string) {
  return this.db.products.find({ categoryId: id });
}` } },

  category_8: { id: 'category_8', title: 'Категория', endpoint: { method: 'GET', path: '/api/category/8/products', controller: 'ProductController.byCategory' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/category/:id/products')
async byCategory(@Param('id') id: string) {
  return this.db.products.find({ categoryId: id });
}` } },

  category_9: { id: 'category_9', title: 'Категория', endpoint: { method: 'GET', path: '/api/category/9/products', controller: 'ProductController.byCategory' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/category/:id/products')
async byCategory(@Param('id') id: string) {
  return this.db.products.find({ categoryId: id });
}` } },

  category_10: { id: 'category_10', title: 'Категория', endpoint: { method: 'GET', path: '/api/category/10/products', controller: 'ProductController.byCategory' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/category/:id/products')
async byCategory(@Param('id') id: string) {
  return this.db.products.find({ categoryId: id });
}` } },

  // Товары - для каждого товара свой endpoint
  product_1: { id: 'product_1', title: 'Товар', endpoint: { method: 'GET', path: '/api/products/1', controller: 'ProductController.getById' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/products/:id')
async getById(@Param('id') id: string) {
  return await this.db.products.findOne({ id });
}` } },

  product_2: { id: 'product_2', title: 'Товар', endpoint: { method: 'GET', path: '/api/products/2', controller: 'ProductController.getById' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/products/:id')
async getById(@Param('id') id: string) {
  const product = await this.db.products.findOne({ id });
  await this.analytics.track('product_view', { productId: id });
  return product;
}` } },

  product_3: { id: 'product_3', title: 'Товар', endpoint: { method: 'GET', path: '/api/products/3', controller: 'ProductController.getById' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/products/:id')
async getById(@Param('id') id: string) {
  return this.db.products.findOne({ id });
}` } },

  product_4: { id: 'product_4', title: 'Товар', endpoint: { method: 'GET', path: '/api/products/4', controller: 'ProductController.getById' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/products/:id')
async getById(@Param('id') id: string) {
  return this.db.products.findOne({ id });
}` } },

  product_5: { id: 'product_5', title: 'Товар', endpoint: { method: 'GET', path: '/api/products/5', controller: 'ProductController.getById' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/products/:id')
async getById(@Param('id') id: string) {
  return this.db.products.findOne({ id });
}` } },

  product_6: { id: 'product_6', title: 'Товар', endpoint: { method: 'GET', path: '/api/products/6', controller: 'ProductController.getById' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/products/:id')
async getById(@Param('id') id: string) {
  return this.db.products.findOne({ id });
}` } },

  product_7: { id: 'product_7', title: 'Товар', endpoint: { method: 'GET', path: '/api/products/7', controller: 'ProductController.getById' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/products/:id')
async getById(@Param('id') id: string) {
  return this.db.products.findOne({ id });
}` } },

  product_8: { id: 'product_8', title: 'Товар', endpoint: { method: 'GET', path: '/api/products/8', controller: 'ProductController.getById' }, flow: [], vulnerabilities: [], backend: { language: 'nodejs', framework: 'NestJS', code: `@Get('/products/:id')
async getById(@Param('id') id: string) {
  return this.db.products.findOne({ id });
}` } },

  categories_list: {
    id: 'categories_list',
    title: 'Список категорий',
    endpoint: { method: 'GET', path: '/api/categories', controller: 'CategoryController.list' },
    flow: [],
    vulnerabilities: [],
    backend: {
      language: 'nodejs', framework: 'NestJS',
      code: `@Get('/categories')
async list() {
  return await this.db.categories.findMany({
    where: { active: true }
  });
}`
    },
  },

  products_list: {
    id: 'products_list',
    title: 'Список товаров',
    endpoint: { method: 'GET', path: '/api/products', controller: 'ProductController.list' },
    flow: [],
    vulnerabilities: [],
    backend: {
      language: 'nodejs', framework: 'NestJS',
      code: `@Get('/products')
async list(@Query() params: ListParamsDto) {
  return await this.db.products.findMany({
    skip: params.page * params.limit,
    take: params.limit,
    where: { inStock: true }
  });
}`
    },
  },

  main_banner: {
    id: 'main_banner',
    title: 'Главный баннер',
    endpoint: { method: 'GET', path: '/api/banners/main', controller: 'BannerController.getMain' },
    flow: [],
    vulnerabilities: [],
    backend: {
      language: 'nodejs', framework: 'NestJS',
      code: `@Get('/banners/main')
async getMain() {
  return await this.db.banners.findFirst({
    where: { position: 'main', active: true }
  });
}`
    },
  },
};
