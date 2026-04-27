import { useState } from 'react'
import { menuData, categories } from '../data/menuData'
import type { MenuItem } from '../types'

function MenuCard({ item }: { item: MenuItem }) {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className="group bg-paper-dark rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer"
      >
        <div className="relative h-48 bg-gradient-to-br from-ink-light to-ink flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-24 h-24 border border-gold/30 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-gold/10 rounded-full" />
          </div>
          <div className="text-center z-10 group-hover:scale-110 transition-transform duration-500">
            <div className="text-5xl mb-2">{item.emoji}</div>
            <p className="text-gold font-serif text-sm tracking-wider">{item.name}</p>
          </div>
          {item.recommended && (
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-cinnabar text-white text-xs rounded-full tracking-wider shadow-md">
              招牌
            </div>
          )}
          {item.spicy && (
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-cinnabar/80 text-white text-xs rounded-full">
              🌶 辣
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-serif text-ink tracking-wider">{item.name}</h3>
            <span className="text-cinnabar font-serif">¥{item.price}</span>
          </div>
          <p className="text-xs text-tea leading-relaxed line-clamp-2">{item.description}</p>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowDetail(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-paper rounded-2xl max-w-lg w-full p-8 shadow-2xl animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDetail(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-paper-dark text-tea hover:text-cinnabar transition-colors"
            >
              ✕
            </button>
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-ink-light to-ink rounded-2xl flex items-center justify-center mb-4">
                <span className="text-5xl">{item.emoji}</span>
              </div>
              <h2 className="text-2xl font-serif text-ink tracking-wider mb-1">{item.name}</h2>
              <p className="text-sm text-tea tracking-wider">{item.nameEn}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gold/10">
                <span className="text-sm text-tea">价格</span>
                <span className="text-2xl font-serif text-cinnabar">¥{item.price}</span>
              </div>
              <div>
                <h4 className="text-sm text-tea mb-2 tracking-wider">菜品介绍</h4>
                <p className="text-sm text-ink leading-relaxed">{item.description}</p>
              </div>
              <div className="flex items-center space-x-4 text-xs text-tea">
                <span>分类：{item.category}</span>
                {item.spicy && <span className="text-cinnabar">🌶 辣味</span>}
                {item.recommended && <span className="text-gold">★ 招牌推荐</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('全部')

  const filtered = activeCategory === '全部'
    ? menuData
    : menuData.filter(item => item.category === activeCategory)

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-ink via-ink-light to-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-48 h-48 border border-gold/20 rounded-full" />
          <div className="absolute bottom-10 left-20 w-32 h-32 border border-gold/10 rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-paper mb-4 tracking-wider">菜品展示</h1>
          <div className="brush-divider w-16 mx-auto mb-4" />
          <p className="text-paper/60 text-sm tracking-wider">MENU</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-40 glass border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm tracking-wider whitespace-nowrap transition-all duration-300
                  ${activeCategory === category
                    ? 'bg-cinnabar text-white shadow-md shadow-cinnabar/20'
                    : 'bg-paper-dark text-tea hover:bg-cinnabar/10 hover:text-cinnabar'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-30">🍽</div>
              <p className="text-tea">暂无菜品</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
