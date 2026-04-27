const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const JWT_SECRET = 'haiyuanhui_secret_key_2024';

app.use(cors());
app.use(express.json());

// ============ Mock Data ============
const menuItems = [
  { id: 1, name: '海源秘制醉蟹', nameEn: 'Drunken Crab', category: '冷菜', price: 188, description: '选用鲜活大闸蟹，以陈年花雕酒秘制浸泡，酒香四溢，蟹黄饱满', image: '/images/drunken-crab.jpg', recommended: true },
  { id: 2, name: '葱油海蜇头', nameEn: 'Jellyfish with Scallion Oil', category: '冷菜', price: 68, description: '精选海蜇头，配以热葱油浇淋，口感爽脆，鲜香可口', image: '/images/jellyfish.jpg' },
  { id: 3, name: '话梅小番茄', nameEn: 'Plum Cherry Tomatoes', category: '冷菜', price: 38, description: '小番茄以话梅汁浸泡，酸甜开胃，清爽解腻', image: '/images/plum-tomato.jpg' },
  { id: 4, name: '椒麻鸡', nameEn: 'Sichuan Pepper Chicken', category: '冷菜', price: 58, description: '土鸡煮熟后撕成细丝，浇以花椒油和辣椒油，麻辣鲜香', image: '/images/pepper-chicken.jpg', spicy: true },
  { id: 5, name: '海源招牌红烧肉', nameEn: 'Braised Pork Belly', category: '热菜', price: 128, description: '精选五花肉，文火慢炖四小时，肥而不腻，入口即化', image: '/images/braised-pork.jpg', recommended: true },
  { id: 6, name: '清蒸东星斑', nameEn: 'Steamed Coral Grouper', category: '热菜', price: 388, description: '鲜活东星斑清蒸，肉质鲜嫩，原汁原味', image: '/images/steamed-fish.jpg', recommended: true },
  { id: 7, name: '黑椒牛仔骨', nameEn: 'Black Pepper Beef Ribs', category: '热菜', price: 168, description: '美国牛仔骨配黑椒汁，肉质鲜嫩多汁', image: '/images/beef-ribs.jpg' },
  { id: 8, name: '宫保虾球', nameEn: 'Kung Pao Shrimp', category: '热菜', price: 138, description: '大虾仁配花生米、干辣椒爆炒，酸甜微辣', image: '/images/kung-pao-shrimp.jpg', spicy: true },
  { id: 9, name: '蒜蓉粉丝蒸扇贝', nameEn: 'Steamed Scallops with Garlic', category: '热菜', price: 98, description: '新鲜扇贝配蒜蓉粉丝蒸制，鲜甜可口', image: '/images/scallops.jpg' },
  { id: 10, name: '上汤娃娃菜', nameEn: 'Baby Cabbage in Broth', category: '热菜', price: 48, description: '娃娃菜以上汤煨制，清淡鲜美', image: '/images/baby-cabbage.jpg' },
  { id: 11, name: '佛跳墙', nameEn: 'Buddha Jumps Over the Wall', category: '汤品', price: 298, description: '鲍鱼、海参、花胶等名贵食材文火炖煮，汤浓味醇', image: '/images/buddha-soup.jpg', recommended: true },
  { id: 12, name: '松茸菌王汤', nameEn: 'Matsutake Mushroom Soup', category: '汤品', price: 88, description: '多种野生菌类慢火熬制，菌香浓郁', image: '/images/mushroom-soup.jpg' },
  { id: 13, name: '杨枝甘露', nameEn: 'Mango Pomelo Sago', category: '甜品', price: 38, description: '芒果、柚子、西米搭配椰汁，清甜爽口', image: '/images/mango-dessert.jpg' },
  { id: 14, name: '桂花糯米藕', nameEn: 'Lotus Root with Glutinous Rice', category: '甜品', price: 42, description: '莲藕塞入糯米，以桂花蜜汁浇淋，甜糯可口', image: '/images/lotus-root.jpg' },
  { id: 15, name: '绍兴花雕酒', nameEn: 'Shaoxing Huadiao Wine', category: '酒水', price: 168, description: '二十年陈酿绍兴花雕，醇厚甘甜', image: '/images/huadiao-wine.jpg' },
  { id: 16, name: '青岛啤酒', nameEn: 'Tsingtao Beer', category: '酒水', price: 18, description: '经典青岛啤酒，清爽怡人', image: '/images/beer.jpg' },
];

const users = [];
const reservations = [];
const orders = [];

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
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: '用户名已存在' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, username, phone, password: hashedPassword, points: 0, vipLevel: '普通会员' };
  users.push(user);
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, username: user.username, phone: user.phone, points: user.points, vipLevel: user.vipLevel } });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, username: user.username, phone: user.phone, points: user.points, vipLevel: user.vipLevel } });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: '用户不存在' });
  res.json({ id: user.id, username: user.username, phone: user.phone, points: user.points, vipLevel: user.vipLevel });
});

// ============ Menu Routes ============
app.get('/api/menu', (req, res) => {
  const { category } = req.query;
  let result = menuItems;
  if (category && category !== '全部') {
    result = menuItems.filter(item => item.category === category);
  }
  res.json(result);
});

app.get('/api/menu/recommended', (req, res) => {
  res.json(menuItems.filter(item => item.recommended));
});

// ============ Reservation Routes ============
app.post('/api/reservations', (req, res) => {
  const { name, phone, date, time, guests, notes } = req.body;
  const reservation = {
    id: reservations.length + 1,
    name, phone, date, time, guests, notes,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  reservations.push(reservation);
  res.json(reservation);
});

app.get('/api/reservations', (req, res) => {
  res.json(reservations);
});

// ============ Order Routes ============
app.post('/api/orders', authMiddleware, (req, res) => {
  const { items, address, note } = req.body;
  const order = {
    id: 'ORD' + Date.now().toString(36).toUpperCase(),
    userId: req.user.id,
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    status: 'pending',
    address,
    note,
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  res.json(order);
});

app.get('/api/orders', authMiddleware, (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.user.id);
  res.json(userOrders);
});

// Export for Vercel
module.exports = app;
