import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/menu', label: '菜品展示' },
  { path: '/order', label: '在线订餐' },
  { path: '/reservation', label: '预约订座' },
  { path: '/about', label: '关于我们' },
  { path: '/contact', label: '联系我们' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const cartItems = useCartStore(s => s.items)
  const { isLoggedIn } = useUserStore()

  // 监听滚动，改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 切换页面时关闭移动端菜单
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-paper/95 backdrop-blur-md shadow-sm'
        : 'bg-paper/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-ink rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
              <span className="text-gold font-serif text-xl">海</span>
            </div>
            <div className="flex flex-col">
              <span className="text-ink font-serif text-xl tracking-widest">海源荟</span>
              <span className="text-xs text-tea tracking-[0.3em]">HAIYUANHUI</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm tracking-wider transition-all duration-300 rounded-lg
                  ${location.pathname === link.path
                    ? 'text-cinnabar bg-cinnabar/5'
                    : 'text-ink-light hover:text-cinnabar hover:bg-cinnabar/5'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Cart */}
            <Link to="/order" className="relative p-2 text-ink-light hover:text-cinnabar transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cinnabar text-white text-xs rounded-full flex items-center justify-center animate-fade-in">
                  {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </Link>

            {/* User */}
            <Link
              to={isLoggedIn ? '/member' : '/login'}
              className="p-2 text-ink-light hover:text-cinnabar transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-ink-light hover:text-cinnabar transition-colors"
              aria-label="切换菜单"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-paper border-t border-gold/10 px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-lg text-sm tracking-wider transition-all duration-300
                ${location.pathname === link.path
                  ? 'text-cinnabar bg-cinnabar/5'
                  : 'text-ink-light hover:text-cinnabar hover:bg-cinnabar/5'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
