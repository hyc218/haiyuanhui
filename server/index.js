require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb, saveDb } = require('./db/database');
const serverless = require('serverless-http');

const app = express();
const PORT = process.env.PORT || process.env.SCF_RUNTIME_PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'haiyuanhui_secret_key_2024';

app.use(cors());
app.use(express.json());

// ============ Auth Middleware ============
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: '未登录' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: '登录已过期' });
  }
}

// ============ Auth Routes ============
app.post('/api/auth/register', async (req, res) => {
  const { username, phone, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: '用户名和密码不能为空' });
  }

  const db = await getDb();

  // 检查用户名是否已存在
  const existing = db.exec('SELECT id FROM users WHERE username = ?', [username]);
  if (existing.length > 0 && existing[0].values.length > 0) {
    return res.status(400).json({ error: '用户名已存在' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  db.run(
    'INSERT INTO users (username, phone, password) VALUES (?, ?, ?)',
    [username, phone || '', hashedPassword]
  );
  saveDb(db);

  // 获取新用户
  const result = db.exec('SELECT * FROM users WHERE username = ?', [username]);
  const user = result[0].values[0];
  const userId = user[0];

  const token = jwt.sign({ id: userId, username }, JWT_SECRET, { expiresIn: '7d' });
  res.json({
    token,
    user: { id: userId, username, phone: phone || '', points: 0, vipLevel: '普通会员' }
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const db = await getDb();

  const result = db.exec('SELECT * FROM users WHERE username = ?', [username]);
  if (result.length === 0 || result[0].values.length === 0) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }

  const user = result[0].values[0];
  const isValid = await bcrypt.compare(password, user[3]); // password is 4th column
  if (!isValid) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }

  const token = jwt.sign({ id: user[0], username: user[1] }, JWT_SECRET, { expiresIn: '7d' });
  res.json({
    token,
    user: { id: user[0], username: user[1], phone: user[2], points: user[4], vipLevel: user[5] }
  });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  getDb().then(db => {
    const result = db.exec('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }
    const user = result[0].values[0];
    res.json({ id: user[0], username: user[1], phone: user[2], points: user[4], vipLevel: user[5] });
  });
});

// ============ Menu Routes ============
// Helper: resolve relative image URLs to absolute
function resolveImageUrl(url, baseUrl) {
  if (url && url.startsWith('/')) {
    return `${baseUrl}${url}`;
  }
  return url || '';
}

app.get('/api/menu', (req, res) => {
  const { category } = req.query;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  getDb().then(db => {
    let query = 'SELECT * FROM menu_items WHERE available = 1';
    const params = [];
    if (category && category !== '全部') {
      query += ' AND category = ?';
      params.push(category);
    }
    query += ' ORDER BY sort_order, id';

    const result = db.exec(query, params);
    if (result.length === 0) return res.json([]);

    const items = result[0].values.map(row => ({
      id: row[0],
      name: row[1],
      nameEn: row[2],
      category: row[3],
      price: row[4],
      description: row[5],
      image: resolveImageUrl(row[6], baseUrl),
      emoji: row[7],
      spicy: row[8] === 1,
      recommended: row[9] === 1
    }));
    res.json(items);
  });
});

app.get('/api/menu/recommended', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  getDb().then(db => {
    const result = db.exec('SELECT * FROM menu_items WHERE recommended = 1 AND available = 1 ORDER BY sort_order, id');
    if (result.length === 0) return res.json([]);

    const items = result[0].values.map(row => ({
      id: row[0],
      name: row[1],
      nameEn: row[2],
      category: row[3],
      price: row[4],
      description: row[5],
      image: resolveImageUrl(row[6], baseUrl),
      emoji: row[7],
      spicy: row[8] === 1,
      recommended: row[9] === 1
    }));
    res.json(items);
  });
});

// ============ Reservation Routes ============
app.post('/api/reservations', (req, res) => {
  const { name, phone, date, time, guests, notes } = req.body;
  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: '请填写完整预约信息' });
  }

  getDb().then(db => {
    db.run(
      'INSERT INTO reservations (name, phone, date, time, guests, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [name, phone, date, time, guests, notes || '']
    );
    saveDb(db);

    const result = db.exec('SELECT * FROM reservations WHERE id = last_insert_rowid()');
    const row = result[0].values[0];
    res.json({
      id: row[0],
      name: row[1],
      phone: row[2],
      date: row[3],
      time: row[4],
      guests: row[5],
      notes: row[6],
      status: row[7],
      createdAt: row[8]
    });
  });
});

app.get('/api/reservations', (req, res) => {
  getDb().then(db => {
    const result = db.exec('SELECT * FROM reservations ORDER BY created_at DESC');
    if (result.length === 0) return res.json([]);

    const reservations = result[0].values.map(row => ({
      id: row[0],
      name: row[1],
      phone: row[2],
      date: row[3],
      time: row[4],
      guests: row[5],
      notes: row[6],
      status: row[7],
      createdAt: row[8]
    }));
    res.json(reservations);
  });
});

// ============ Order Routes ============
app.post('/api/orders', authMiddleware, (req, res) => {
  const { items, address, note } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ error: '订单不能为空' });
  }
  if (!address) {
    return res.status(400).json({ error: '请填写送餐地址' });
  }

  const orderId = 'ORD' + Date.now().toString(36).toUpperCase();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  getDb().then(db => {
    // 插入订单
    db.run(
      'INSERT INTO orders (id, user_id, total, address, note) VALUES (?, ?, ?, ?, ?)',
      [orderId, req.user.id, total, address, note || '']
    );

    // 插入订单项
    const stmt = db.prepare(
      'INSERT INTO order_items (order_id, menu_item_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)'
    );
    for (const item of items) {
      stmt.run([orderId, item.id, item.name, item.price, item.quantity]);
    }
    stmt.free();

    saveDb(db);

    res.json({
      id: orderId,
      userId: req.user.id,
      items,
      total,
      status: 'pending',
      address,
      note: note || '',
      createdAt: new Date().toISOString()
    });
  });
});

app.get('/api/orders', authMiddleware, (req, res) => {
  getDb().then(db => {
    const ordersResult = db.exec('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    if (ordersResult.length === 0) return res.json([]);

    const orders = ordersResult[0].values.map(row => {
      const orderId = row[0];
      // 获取订单项
      const itemsResult = db.exec('SELECT name, price, quantity FROM order_items WHERE order_id = ?', [orderId]);
      const items = itemsResult.length > 0
        ? itemsResult[0].values.map(i => ({ name: i[0], price: i[1], quantity: i[2] }))
        : [];

      return {
        id: row[0],
        userId: row[1],
        total: row[2],
        status: row[3],
        address: row[4],
        note: row[5],
        createdAt: row[6],
        items
      };
    });

    res.json(orders);
  });
});

// ============ Review Routes ============
app.get('/api/reviews', (req, res) => {
  getDb().then(db => {
    const result = db.exec('SELECT * FROM reviews ORDER BY created_at DESC');
    if (result.length === 0) return res.json([]);

    const reviews = result[0].values.map(row => ({
      id: row[0],
      userName: row[1],
      userRole: row[2],
      stars: row[3],
      content: row[4],
      createdAt: row[5]
    }));
    res.json(reviews);
  });
});

app.post('/api/reviews', authMiddleware, (req, res) => {
  const { stars, content } = req.body;
  if (!content || !stars) {
    return res.status(400).json({ error: '请填写评价内容和评分' });
  }

  getDb().then(db => {
    const userResult = db.exec('SELECT username FROM users WHERE id = ?', [req.user.id]);
    const userName = userResult.length > 0 && userResult[0].values.length > 0
      ? userResult[0].values[0][0]
      : '匿名用户';

    db.run(
      'INSERT INTO reviews (user_name, user_role, stars, content) VALUES (?, ?, ?, ?)',
      [userName, '食客', stars, content]
    );
    saveDb(db);

    const result = db.exec('SELECT * FROM reviews WHERE id = last_insert_rowid()');
    const row = result[0].values[0];
    res.json({
      id: row[0], userName: row[1], userRole: row[2], stars: row[3], content: row[4], createdAt: row[5]
    });
  });
});

// ============ Admin Menu Routes ============
app.post('/api/admin/menu', authMiddleware, (req, res) => {
  const { name, nameEn, category, price, description, image, emoji, spicy, recommended } = req.body;
  if (!name || !category || !price) {
    return res.status(400).json({ error: '菜品名称、分类和价格不能为空' });
  }

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  getDb().then(db => {
    db.run(
      'INSERT INTO menu_items (name, name_en, category, price, description, image, emoji, spicy, recommended) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, nameEn || '', category, price, description || '', image || '', emoji || '🍽', spicy ? 1 : 0, recommended ? 1 : 0]
    );
    saveDb(db);

    const result = db.exec('SELECT * FROM menu_items WHERE id = last_insert_rowid()');
    const row = result[0].values[0];
    res.json({
      id: row[0], name: row[1], nameEn: row[2], category: row[3], price: row[4],
      description: row[5], image: resolveImageUrl(row[6], baseUrl), emoji: row[7], spicy: row[8] === 1, recommended: row[9] === 1
    });
  });
});

app.put('/api/admin/menu/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { name, nameEn, category, price, description, image, emoji, spicy, recommended, available } = req.body;

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  getDb().then(db => {
    const fields = [];
    const values = [];

    if (name !== undefined) { fields.push('name = ?'); values.push(name); }
    if (nameEn !== undefined) { fields.push('name_en = ?'); values.push(nameEn); }
    if (category !== undefined) { fields.push('category = ?'); values.push(category); }
    if (price !== undefined) { fields.push('price = ?'); values.push(price); }
    if (description !== undefined) { fields.push('description = ?'); values.push(description); }
    if (image !== undefined) { fields.push('image = ?'); values.push(image); }
    if (emoji !== undefined) { fields.push('emoji = ?'); values.push(emoji); }
    if (spicy !== undefined) { fields.push('spicy = ?'); values.push(spicy ? 1 : 0); }
    if (recommended !== undefined) { fields.push('recommended = ?'); values.push(recommended ? 1 : 0); }
    if (available !== undefined) { fields.push('available = ?'); values.push(available ? 1 : 0); }

    if (fields.length === 0) {
      return res.status(400).json({ error: '没有要更新的字段' });
    }

    values.push(id);
    db.run(`UPDATE menu_items SET ${fields.join(', ')} WHERE id = ?`, values);
    saveDb(db);

    const result = db.exec('SELECT * FROM menu_items WHERE id = ?', [id]);
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({ error: '菜品不存在' });
    }
    const row = result[0].values[0];
    res.json({
      id: row[0], name: row[1], nameEn: row[2], category: row[3], price: row[4],
      description: row[5], image: resolveImageUrl(row[6], baseUrl), emoji: row[7], spicy: row[8] === 1, recommended: row[9] === 1
    });
  });
});

app.delete('/api/admin/menu/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  getDb().then(db => {
    db.run('DELETE FROM menu_items WHERE id = ?', [id]);
    saveDb(db);
    res.json({ message: '菜品已删除' });
  });
});

// ============ Placeholder Image (replace picsum.photos) ============
app.get('/api/placeholder', (req, res) => {
  const { text = '菜', color = 'c9a96e' } = req.query;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="#f5f0eb"/>
    <rect x="50" y="50" width="500" height="300" rx="12" fill="#faf8f5" stroke="#e8ddd0" stroke-width="2"/>
    <text x="300" y="220" font-size="120" text-anchor="middle" fill="#${color}" font-family="serif">${text}</text>
  </svg>`;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(svg);
});

// ============ CloudBase 云函数入口 ============
exports.main = serverless(app);

// ============ 本地开发启动 ============
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`海源荟 API 服务运行在 http://localhost:${PORT}`);
  });
}


