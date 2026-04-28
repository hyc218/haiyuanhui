import { useState } from 'react'
import { menuData, categories } from '../data/menuData'
import { useCartStore } from '../store/cartStore'
import type { MenuItem } from '../types'

function MenuItemCard({ item }: { item: MenuItem }) {
  const addItem = useCartStore(s => s.addItem)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div className="flex items-center justify-between p-3 bg-paper-dark/50 rounded-2xl card-hover border border-gold/5">
      <div className="flex items-center space-x-4 flex-1 min-w-0 mr-4">
        {/* 菜品缩略图 */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-ink flex-shrink-0 relative">
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl opacity-50">{item.emoji}</span>
            </div>
          )}
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-sm font-serif text-ink tracking-wider">{item.name}</h3>
            {item.recommended && <span className="text-xs text-cinnabar">★</span>}
            {item.spicy && <span className="text-xs text-cinnabar">🌶</span>}
          </div>
          <p className="text-xs text-tea/60 line-clamp-1 font-light">{item.description}</p>
          <span className="text-cinnabar font-serif text-sm">¥{item.price}</span>
        </div>
      </div>
      <button
        onClick={() => addItem(item)}
        className="flex-shrink-0 w-10 h-10 bg-cinnabar text-white rounded-2xl flex items-center justify-center hover:bg-cinnabar-light transition-all text-lg shadow-md shadow-cinnabar/20 hover:shadow-lg hover:shadow-cinnabar/30 active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}

export default function OrderPage() {
  const [activeCategory, setActiveCategory] = useState('全部')
  const { items, updateQuantity, total, clearCart } = useCartStore()

  const filtered = activeCategory === '全部'
    ? menuData
    : menuData.filter(item => item.category === activeCategory)

  const [showCheckout, setShowCheckout] = useState(false)
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  })

  const handleCheckout = () => {
    alert('订单已提交！我们会尽快与您确认。')
    clearCart()
    setShowCheckout(false)
    setCheckoutInfo({ name: '', phone: '', address: '', note: '' })
  }

  return (
    <div className="pt-20 min-h-screen bg-paper">
      {/* Header */}
      <section className="relative py-16 overflow-hidden hero-gradient">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-5 right-1/4 w-32 h-32 border border-gold/20 rounded-full" />
          <div className="absolute bottom-5 left-1/4 w-24 h-24 border border-gold/10 rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gold/[0.08] rounded-2xl flex items-center justify-center border border-gold/[0.15] backdrop-blur-sm">
              <span className="text-gold font-serif text-xl">餐</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-paper tracking-wider font-light">在线订餐</h1>
              <p className="text-paper/30 text-xs tracking-[0.3em] mt-1">ONLINE ORDER</p>
            </div>
          </div>
          <div className="brush-divider w-16" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Section */}
          <div className="flex-1">
            {/* Category Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto mb-6 pb-2 scrollbar-hide">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-xs tracking-wider whitespace-nowrap transition-all duration-300
                    ${activeCategory === category
                      ? 'bg-cinnabar text-white shadow-md shadow-cinnabar/20'
                      : 'bg-paper-dark/50 text-tea/70 hover:bg-cinnabar/5 hover:text-cinnabar'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-3">
              {filtered.map(item => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:w-96">
            <div className="sticky top-28 bg-paper-dark/50 rounded-3xl p-6 shadow-sm border border-gold/5">
              <h2 className="text-lg font-serif text-ink mb-4 tracking-wider flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                  <span>购物车</span>
                </span>
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-tea/60 hover:text-cinnabar transition-colors"
                  >
                    清空
                  </button>
                )}
              </h2>

              {items.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-6xl mb-4 opacity-20">🛒</div>
                  <p className="text-sm text-tea/60 font-light">购物车是空的</p>
                  <p className="text-xs text-tea/40 mt-1 font-light">点击菜品旁的 + 号添加</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-80 overflow-y-auto scrollbar-hide">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-paper rounded-2xl">
                        <div className="flex items-center space-x-3 flex-1 min-w-0 mr-2">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-ink flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-ink truncate">{item.name}</p>
                            <p className="text-xs text-tea/60">¥{item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-paper-dark/50 text-tea flex items-center justify-center hover:bg-cinnabar hover:text-white transition-all text-xs"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="text-sm text-ink w-6 text-center font-serif">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-paper-dark/50 text-tea flex items-center justify-center hover:bg-cinnabar hover:text-white transition-all text-xs"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gold/10 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-tea/60">合计</span>
                      <span className="text-2xl font-serif text-cinnabar">¥{total()}</span>
                    </div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full py-3.5 bg-cinnabar text-white rounded-2xl hover:bg-cinnabar-light transition-all tracking-wider text-sm shadow-md shadow-cinnabar/20 btn-apple"
                    >
                      去结算
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCheckout(false)} />
          <div className="relative bg-paper rounded-3xl max-w-md w-full p-8 shadow-2xl animate-scale-in">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-paper-dark rounded-full flex items-center justify-center text-tea hover:text-cinnabar transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-serif text-ink mb-6 tracking-wider">确认订单</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-tea/60 mb-1 tracking-wider">姓名</label>
                <input
                  type="text"
                  value={checkoutInfo.name}
                  onChange={e => setCheckoutInfo({ ...checkoutInfo, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-paper-dark/50 rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 border border-gold/5"
                  placeholder="请输入您的姓名"
                />
              </div>
              <div>
                <label className="block text-sm text-tea/60 mb-1 tracking-wider">电话</label>
                <input
                  type="tel"
                  value={checkoutInfo.phone}
                  onChange={e => setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-paper-dark/50 rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 border border-gold/5"
                  placeholder="请输入联系电话"
                />
              </div>
              <div>
                <label className="block text-sm text-tea/60 mb-1 tracking-wider">送餐地址</label>
                <input
                  type="text"
                  value={checkoutInfo.address}
                  onChange={e => setCheckoutInfo({ ...checkoutInfo, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-paper-dark/50 rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 border border-gold/5"
                  placeholder="请输入送餐地址"
                />
              </div>
              <div>
                <label className="block text-sm text-tea/60 mb-1 tracking-wider">备注</label>
                <textarea
                  value={checkoutInfo.note}
                  onChange={e => setCheckoutInfo({ ...checkoutInfo, note: e.target.value })}
                  className="w-full px-4 py-2.5 bg-paper-dark/50 rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 resize-none border border-gold/5"
                  rows={3}
                  placeholder="如有特殊要求请备注"
                />
              </div>

              <div className="border-t border-gold/10 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-tea/60">订单金额</span>
                  <span className="text-2xl font-serif text-cinnabar">¥{total()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-cinnabar text-white rounded-2xl hover:bg-cinnabar-light transition-all tracking-wider text-sm shadow-md shadow-cinnabar/20 btn-apple"
                >
                  提交订单
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
