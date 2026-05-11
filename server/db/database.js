const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'haiyuanhui.db');

let db = null;

async function getDb() {
  if (db) return db;

  const SQL = await initSqlJs();

  // 尝试从文件加载已有数据库
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
    initializeDb(db);
    saveDb(db);
  }

  return db;
}

function initializeDb(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      phone TEXT DEFAULT '',
      password TEXT NOT NULL,
      points INTEGER DEFAULT 0,
      vip_level TEXT DEFAULT '普通会员',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      name_en TEXT,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT,
      emoji TEXT,
      spicy INTEGER DEFAULT 0,
      recommended INTEGER DEFAULT 0,
      available INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      guests INTEGER NOT NULL,
      notes TEXT DEFAULT '',
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      address TEXT,
      note TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      menu_item_id INTEGER,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT NOT NULL,
      user_role TEXT DEFAULT '',
      stars INTEGER DEFAULT 5,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 插入初始菜单数据
  insertInitialMenu(db);
  insertInitialReviews(db);
}

function insertInitialMenu(db) {
  const items = [
    ['海源秘制醉蟹', 'Drunken Crab', '冷菜', 188, '选用鲜活大闸蟹，以陈年花雕酒秘制浸泡，酒香四溢，蟹黄饱满', '/api/placeholder?text=蟹', '', 0, 1],
    ['葱油海蜇头', 'Jellyfish with Scallion Oil', '冷菜', 68, '精选海蜇头，配以热葱油浇淋，口感爽脆，鲜香可口', '/api/placeholder?text=蜇', '', 0, 0],
    ['话梅小番茄', 'Plum Cherry Tomatoes', '冷菜', 38, '小番茄以话梅汁浸泡，酸甜开胃，清爽解腻', '/api/placeholder?text=番', '', 0, 0],
    ['椒麻鸡', 'Sichuan Pepper Chicken', '冷菜', 58, '土鸡煮熟后撕成细丝，浇以花椒油和辣椒油，麻辣鲜香', '/api/placeholder?text=鸡', '', 1, 0],
    ['海源招牌红烧肉', 'Braised Pork Belly', '热菜', 128, '精选五花肉，文火慢炖四小时，肥而不腻，入口即化', '/api/placeholder?text=肉', '', 0, 1],
    ['清蒸东星斑', 'Steamed Coral Grouper', '热菜', 388, '鲜活东星斑清蒸，肉质鲜嫩，原汁原味', '/api/placeholder?text=鱼', '', 0, 1],
    ['黑椒牛仔骨', 'Black Pepper Beef Ribs', '热菜', 168, '美国牛仔骨配黑椒汁，肉质鲜嫩多汁', '/api/placeholder?text=牛', '', 0, 0],
    ['宫保虾球', 'Kung Pao Shrimp', '热菜', 138, '大虾仁配花生米、干辣椒爆炒，酸甜微辣', '/api/placeholder?text=虾', '', 1, 0],
    ['蒜蓉粉丝蒸扇贝', 'Steamed Scallops with Garlic', '热菜', 98, '新鲜扇贝配蒜蓉粉丝蒸制，鲜甜可口', '/api/placeholder?text=贝', '', 0, 0],
    ['上汤娃娃菜', 'Baby Cabbage in Broth', '热菜', 48, '娃娃菜以上汤煨制，清淡鲜美', '/api/placeholder?text=菜', '', 0, 0],
    ['佛跳墙', 'Buddha Jumps Over the Wall', '汤品', 298, '鲍鱼、海参、花胶等名贵食材文火炖煮，汤浓味醇', '/api/placeholder?text=汤', '', 0, 1],
    ['松茸菌王汤', 'Matsutake Mushroom Soup', '汤品', 88, '多种野生菌类慢火熬制，菌香浓郁', '/api/placeholder?text=菌', '', 0, 0],
    ['杨枝甘露', 'Mango Pomelo Sago', '甜品', 38, '芒果、柚子、西米搭配椰汁，清甜爽口', '/api/placeholder?text=芒', '', 0, 0],
    ['桂花糯米藕', 'Lotus Root with Glutinous Rice', '甜品', 42, '莲藕塞入糯米，以桂花蜜汁浇淋，甜糯可口', '/api/placeholder?text=藕', '', 0, 0],
    ['绍兴花雕酒', 'Shaoxing Huadiao Wine', '酒水', 168, '二十年陈酿绍兴花雕，醇厚甘甜', '/api/placeholder?text=酒', '', 0, 0],
    ['青岛啤酒', 'Tsingtao Beer', '酒水', 18, '经典青岛啤酒，清爽怡人', '/api/placeholder?text=啤', '', 0, 0],
  ];

  const stmt = db.prepare(`
    INSERT INTO menu_items (name, name_en, category, price, description, image, emoji, spicy, recommended)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const item of items) {
    stmt.run(item);
  }
  stmt.free();
}

function insertInitialReviews(db) {
  const reviews = [
    ['王先生', '资深美食家', 5, '海源荟的红烧肉是我在上海吃过最正宗的，肥而不腻，入口即化。环境也非常雅致，适合商务宴请。'],
    ['李女士', '美食博主', 5, '清蒸东星斑鲜嫩无比，保留了食材最原始的味道。服务也非常周到，每次来都有惊喜。'],
    ['张先生', '回头客', 5, '佛跳墙汤浓味醇，用料十足。朋友聚会首选这家，每次带新朋友来都不会失望。'],
    ['陈女士', '家庭聚餐', 4, '杨枝甘露非常清爽，孩子们很喜欢。整体环境安静优雅，适合家庭聚餐。'],
  ];

  const stmt = db.prepare(
    'INSERT INTO reviews (user_name, user_role, stars, content) VALUES (?, ?, ?, ?)'
  );
  for (const r of reviews) {
    stmt.run(r);
  }
  stmt.free();
}

function saveDb(db) {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

module.exports = { getDb, saveDb };
