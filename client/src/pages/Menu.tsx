import { useState, useEffect } from 'react'
import { menuData, categories } from '../data/menuData'
import type { MenuItem } from '../types'

function MenuCard({ item }: { item: MenuItem }) {
  const [showDetail, setShowDetail] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className="group bg-paper rounded-3xl overflow-hidden shadow-sm card-hover cursor-pointer"
      >
        {/* 图片区域 */}
        <div className="relative h-56 overflow-hidden bg-ink">
          {/* 加载占位 */}
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-2 opacity-50">{item.emoji}</div>
                <p className="text-gold/40 font-serif text-xs tracking-wider">{item.name}</p>
              </div>
            </div>
          )}
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* 标签 */}
          <div className="absolute top-4 left-4 flex space-x-2">
            {item.recommended && (
              <span className="px-3 py-1 bg-cinnabar/90 backdrop-blur-sm text-white text-xs rounded-full tracking-wider shadow-lg">
                ★ 招牌
              </span>
            )}
            {item.spicy && (
              <span className="px-3 py-1 bg-orange-500/80 backdrop-blur-sm text-white text-xs rounded-full shadow-lg">
                🌶 辣
              </span>
            )}
          </div>

          {/* 底部菜品名 */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-serif text-lg tracking-wider drop-shadow-lg">{item.name}</p>
            <p className="text-white/50 text-xs tracking-wider">{item.nameEn}</p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-tea/60 tracking-wider">{item.category}</span>
            <span className="text-cinnabar font-serif text-xl">¥{item.price}</span>
          </div>
          <p className="text-sm text-tea/70 leading-relaxed line-clamp-2 font-light">{item.description}</p>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowDetail(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-paper rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal 图片 */}
            <div className="relative h-64 bg-ink overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <button
                onClick={() => setShowDetail(false)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/30 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-6">
                <h2 className="text-2xl font-serif text-white tracking-wider mb-1">{item.name}</h2>
                <p className="text-white/50 text-sm tracking-wider">{item.nameEn}</p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-gold/10">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-tea">价格</span>
                  <span className="text-3xl font-serif text-cinnabar">¥{item.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.recommended && <span className="px-3 py-1 bg-cinnabar/10 text-cinnabar text-xs rounded-full">招牌推荐</span>}
                  {item.spicy && <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs rounded-full">🌶 辣味</span>}
                </div>
              </div>
              <div>
                <h4 className="text-sm text-tea mb-2 tracking-wider">菜品介绍</h4>
                <p className="text-sm text-ink/80 leading-relaxed font-light">{item.description}</p>
              </div>
              <div className="text-xs text-tea/60">
                分类：{item.category}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ============ 滚动触发动画 Hook ============
function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal, .reveal-scale').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('全部')

  useRevealOnScroll()

  const filtered = activeCategory === '全部'
    ? menuData
    : menuData.filter(item => item.category === activeCategory)

  return (
    <div className="pt-20 min-h-screen bg-paper">
      {/* Header - Apple 风格 */}
      <section className="relative py-24 overflow-hidden hero-gradient">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-10 right-1/4 w-64 h-64 border border-gold/20 rounded-full" />
          <div className="absolute bottom-10 left-1/4 w-48 h-48 border border-gold/10 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 ink-circle animate-breathe" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 animate-blur-in">
            <div className="w-14 h-14 mx-auto bg-gold/[0.08] rounded-full flex items-center justify-center border border-gold/[0.15] backdrop-blur-sm">
              <span className="text-gold font-serif text-2xl">品</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-paper mb-4 tracking-wider animate-blur-in font-light" style={{ animationDelay: '0.1s' }}>
            菜品展示
          </h1>
          <div className="brush-divider w-16 mx-auto mb-4 animate-scale-in" style={{ animationDelay: '0.2s' }} />
          <p className="text-paper/40 text-sm tracking-[0.3em] animate-blur-in font-light" style={{ animationDelay: '0.3s' }}>
            CURATED CUISINE
          </p>
        </div>
      </section>

      {/* Category Filter - Apple 风格分段控件 */}
      <section className="sticky top-20 z-40 glass border-b border-gold/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm tracking-wider whitespace-nowrap transition-all duration-300
                  ${activeCategory === category
                    ? 'bg-cinnabar text-white shadow-md shadow-cinnabar/20'
                    : 'bg-paper-dark/50 text-tea/70 hover:bg-cinnabar/5 hover:text-cinnabar'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item, index) => (
              <div key={item.id} className="reveal" style={{ transitionDelay: `${index * 0.05}s` }}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-30">🍽</div>
              <p className="text-tea/60 font-light">暂无菜品</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
