import { useState } from 'react'
import { menuData, categories } from '../data/menuData'
import { useCartStore } from '../store/cartStore'
import type { MenuItem } from '../types'

function MenuItemCard({ item }: { item: MenuItem }) {
  const addItem = useCartStore(s => s.addItem)

  return (
    <div className="flex items-center justify-between p-4 bg-paper-dark rounded-xl card-hover">
      <div className="flex items-center space-x-4 flex-1 min-w-0 mr-4">
        <div className="w-12 h-12 bg-gradient-to-br from-ink-light to-ink rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
          {item.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-sm font-serif text-ink tracking-wider">{item.name}</h3>
            {item.recommended && <span className="text-xs text-cinnabar">★</span>}
            {item.spicy && <span className="text-xs text-cinnabar">🌶</span>}
          </div>
          <p className="text-xs text-tea line-clamp-1">{item.description}</p>
          <span className="text-cinnabar font-serif text-sm">¥{item.price}</span>
        </div>
      </div>
      <button
        onClick={() => addItem(item)}
        className="flex-shrink-0 w-9 h-9 bg-cinnabar text-white rounded-full flex items-center justify-center hover:bg-cinnabar-light transition-colors text-lg shadow-md shadow-cinnabar/20"
      >
        +
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
      <section className="py-12 bg-gradient-to-br from-ink via-ink-light to-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 right-20 w-32 h-32 border border-gold/20 rounded-full" />
          <div className="absolute bottom-5 left-20 w-24 h-24 border border-gold/10 rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif text-paper tracking-wider">在线订餐</h1>
          <div className="brush-divider w-16 mt-4" />
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
                      : 'bg-paper-dark text-tea hover:bg-cinnabar/10 hover:text-cinnabar'
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
            <div className="sticky top-28 bg-paper-dark rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-serif text-ink mb-4 tracking-wider flex items-center justify-between">
                <span>购物车</span>
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-tea hover:text-cinnabar transition-colors"
                  >
                    清空
                  </button>
                )}
              </h2>

              {items.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-6xl mb-4 opacity-20">🛒</div>
                  <p className="text-sm text-tea">购物车是空的</p>
                  <p className="text-xs text-tea/60 mt-1">点击菜品旁的 + 号添加</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-80 overflow-y-auto scrollbar-hide">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-paper rounded-xl">
                        <div className="flex items-center space-x-3 flex-1 min-w-0 mr-2">
                          <span className="text-xl">{item.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-ink truncate">{item.name}</p>
                            <p className="text-xs text-tea">¥{item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-paper-dark text-tea flex items-center justify-center hover:bg-cinnabar hover:text-white transition-colors text-xs"
                          >
                            -
                          </button>
                          <span className="text-sm text-ink w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-paper-dark text-tea flex items-center justify-center hover:bg-cinnabar hover:text-white transition-colors text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gold/10 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-tea">合计</span>
                      <span className="text-xl font-serif text-cinnabar">¥{total()}</span>
                    </div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full py-3 bg-cinnabar text-white rounded-xl hover:bg-cinnabar-light transition-colors tracking-wider text-sm shadow-md shadow-cinnabar/20"
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
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCheckout(false)} />
          <div className="relative bg-paper rounded-2xl max-w-md w-full p-8 shadow-2xl animate-fade-in-up">
            <h2 className="text-xl font-serif text-ink mb-6 tracking-wider">确认订单</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-tea mb-1 tracking-wider">姓名</label>
                <input
                  type="text"
                  value={checkoutInfo.name}
                  onChange={e => setCheckoutInfo({ ...checkoutInfo, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-paper-dark rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30"
                  placeholder="请输入您的姓名"
                />
              </div>
              <div>
                <label className="block text-sm text-tea mb-1 tracking-wider">电话</label>
                <input
                  type="tel"
                  value={checkoutInfo.phone}
                  onChange={e => setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-paper-dark rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30"
                  placeholder="请输入联系电话"
                />
              </div>
              <div>
                <label className="block text-sm text-tea mb-1 tracking-wider">送餐地址</label>
                <input
                  type="text"
                  value={checkoutInfo.address}
                  onChange={e => setCheckoutInfo({ ...checkoutInfo, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-paper-dark rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30"
                  placeholder="请输入送餐地址"
                />
              </div>
              <div>
                <label className="block text-sm text-tea mb-1 tracking-wider">备注</label>
                <textarea
                  value={checkoutInfo.note}
                  onChange={e => setCheckoutInfo({ ...checkoutInfo, note: e.target.value })}
                  className="w-full px-4 py-2.5 bg-paper-dark rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none"
                  rows={3}
                  placeholder="如有特殊要求请备注"
                />
              </div>

              <div className="border-t border-gold/10 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-tea">订单金额</span>
                  <span className="text-xl font-serif text-cinnabar">¥{total()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-cinnabar text-white rounded-xl hover:bg-cinnabar-light transition-colors tracking-wider text-sm shadow-md shadow-cinnabar/20"
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
