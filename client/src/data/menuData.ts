import type { MenuItem } from '../types'

export const menuData: MenuItem[] = [
  // 冷菜
  {
    id: 1, name: '海源秘制醉蟹', nameEn: 'Drunken Crab', category: '冷菜',
    price: 188, description: '选用鲜活大闸蟹，以陈年花雕酒秘制浸泡，酒香四溢，蟹黄饱满',
    image: '/images/drunken-crab.jpg', emoji: '🦀', recommended: true
  },
  {
    id: 2, name: '葱油海蜇头', nameEn: 'Jellyfish with Scallion Oil', category: '冷菜',
    price: 68, description: '精选海蜇头，配以热葱油浇淋，口感爽脆，鲜香可口',
    image: '/images/jellyfish.jpg', emoji: '🪸'
  },
  {
    id: 3, name: '话梅小番茄', nameEn: 'Plum Cherry Tomatoes', category: '冷菜',
    price: 38, description: '小番茄以话梅汁浸泡，酸甜开胃，清爽解腻',
    image: '/images/plum-tomato.jpg', emoji: '🍅'
  },
  {
    id: 4, name: '椒麻鸡', nameEn: 'Sichuan Pepper Chicken', category: '冷菜',
    price: 58, description: '土鸡煮熟后撕成细丝，浇以花椒油和辣椒油，麻辣鲜香',
    image: '/images/pepper-chicken.jpg', emoji: '🐔', spicy: true
  },

  // 热菜
  {
    id: 5, name: '海源招牌红烧肉', nameEn: 'Braised Pork Belly', category: '热菜',
    price: 128, description: '精选五花肉，文火慢炖四小时，肥而不腻，入口即化',
    image: '/images/braised-pork.jpg', emoji: '🥩', recommended: true
  },
  {
    id: 6, name: '清蒸东星斑', nameEn: 'Steamed Coral Grouper', category: '热菜',
    price: 388, description: '鲜活东星斑清蒸，肉质鲜嫩，原汁原味',
    image: '/images/steamed-fish.jpg', emoji: '🐟', recommended: true
  },
  {
    id: 7, name: '黑椒牛仔骨', nameEn: 'Black Pepper Beef Ribs', category: '热菜',
    price: 168, description: '美国牛仔骨配黑椒汁，肉质鲜嫩多汁',
    image: '/images/beef-ribs.jpg', emoji: '🥩'
  },
  {
    id: 8, name: '宫保虾球', nameEn: 'Kung Pao Shrimp', category: '热菜',
    price: 138, description: '大虾仁配花生米、干辣椒爆炒，酸甜微辣',
    image: '/images/kung-pao-shrimp.jpg', emoji: '🦐', spicy: true
  },
  {
    id: 9, name: '蒜蓉粉丝蒸扇贝', nameEn: 'Steamed Scallops with Garlic', category: '热菜',
    price: 98, description: '新鲜扇贝配蒜蓉粉丝蒸制，鲜甜可口',
    image: '/images/scallops.jpg', emoji: '🦪'
  },
  {
    id: 10, name: '上汤娃娃菜', nameEn: 'Baby Cabbage in Broth', category: '热菜',
    price: 48, description: '娃娃菜以上汤煨制，清淡鲜美',
    image: '/images/baby-cabbage.jpg', emoji: '🥬'
  },

  // 汤品
  {
    id: 11, name: '佛跳墙', nameEn: 'Buddha Jumps Over the Wall', category: '汤品',
    price: 298, description: '鲍鱼、海参、花胶等名贵食材文火炖煮，汤浓味醇',
    image: '/images/buddha-soup.jpg', emoji: '🍲', recommended: true
  },
  {
    id: 12, name: '松茸菌王汤', nameEn: 'Matsutake Mushroom Soup', category: '汤品',
    price: 88, description: '多种野生菌类慢火熬制，菌香浓郁',
    image: '/images/mushroom-soup.jpg', emoji: '🍄'
  },

  // 甜品
  {
    id: 13, name: '杨枝甘露', nameEn: 'Mango Pomelo Sago', category: '甜品',
    price: 38, description: '芒果、柚子、西米搭配椰汁，清甜爽口',
    image: '/images/mango-dessert.jpg', emoji: '🥭'
  },
  {
    id: 14, name: '桂花糯米藕', nameEn: 'Lotus Root with Glutinous Rice', category: '甜品',
    price: 42, description: '莲藕塞入糯米，以桂花蜜汁浇淋，甜糯可口',
    image: '/images/lotus-root.jpg', emoji: '🪷'
  },

  // 酒水
  {
    id: 15, name: '绍兴花雕酒', nameEn: 'Shaoxing Huadiao Wine', category: '酒水',
    price: 168, description: '二十年陈酿绍兴花雕，醇厚甘甜',
    image: '/images/huadiao-wine.jpg', emoji: '🍶'
  },
  {
    id: 16, name: '青岛啤酒', nameEn: 'Tsingtao Beer', category: '酒水',
    price: 18, description: '经典青岛啤酒，清爽怡人',
    image: '/images/beer.jpg', emoji: '🍺'
  },
]

export const categories = ['全部', '冷菜', '热菜', '汤品', '甜品', '酒水']
