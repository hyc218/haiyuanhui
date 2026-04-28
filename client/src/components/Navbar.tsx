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
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()
  const cartItems = useCartStore(s => s.items)
  const { isLoggedIn } = useUserStore()

  // Apple 风格导航：滚动时隐藏/显示
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 20)
      
      if (currentScrollY > 100) {
        setHidden(currentScrollY > lastScrollY && currentScrollY > 200)
      } else {
        setHidden(false)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // 切换页面时关闭移动端菜单
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-sm'
          : 'bg-transparent'
      } ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
              scrolled ? 'bg-ink shadow-sm' : 'bg-white/10 backdrop-blur-sm'
            }`}>
              <span className={`font-serif text-lg transition-colors duration-500 ${
                scrolled ? 'text-gold' : 'text-gold'
              }`}>海</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-lg tracking-widest transition-colors duration-500 ${
                scrolled ? 'text-ink' : 'text-paper'
              }`}>海源荟</span>
              <span className={`text-[10px] tracking-[0.3em] transition-colors duration-500 ${
                scrolled ? 'text-tea/60' : 'text-paper/40'
              }`}>HAIYUANHUI</span>
            </div>
          </Link>

          {/* Desktop Nav - Apple 风格居中 */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link px-3 py-2 text-sm tracking-wider transition-all duration-300 rounded-lg
                  ${location.pathname === link.path
                    ? scrolled ? 'text-cinnabar' : 'text-paper'
                    : scrolled ? 'text-ink/60 hover:text-ink' : 'text-paper/70 hover:text-paper'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-1">
            {/* Cart */}
            <Link
              to="/order"
              className={`relative p-2.5 rounded-full transition-all duration-300 ${
                scrolled ? 'text-ink/60 hover:text-cinnabar hover:bg-cinnabar/5' : 'text-paper/70 hover:text-paper hover:bg-white/5'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-cinnabar text-white text-[10px] rounded-full flex items-center justify-center shadow-sm shadow-cinnabar/30">
                  {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </Link>

            {/* User */}
            <Link
              to={isLoggedIn ? '/member' : '/login'}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                scrolled ? 'text-ink/60 hover:text-cinnabar hover:bg-cinnabar/5' : 'text-paper/70 hover:text-paper hover:bg-white/5'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2.5 rounded-full transition-all duration-300 ${
                scrolled ? 'text-ink/60 hover:text-cinnabar' : 'text-paper/70 hover:text-paper'
              }`}
              aria-label="切换菜单"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Mobile Menu - Apple 风格 */}
      <div
        className={`lg:hidden transition-all duration-400 ease-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`border-t ${scrolled ? 'border-gold/10' : 'border-white/10'} px-4 py-3 space-y-1 ${
          scrolled ? 'bg-paper/98 backdrop-blur-xl' : 'bg-ink/90 backdrop-blur-xl'
        }`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-xl text-sm tracking-wider transition-all duration-300 ${
                location.pathname === link.path
                  ? scrolled ? 'text-cinnabar bg-cinnabar/5' : 'text-paper bg-white/10'
                  : scrolled ? 'text-ink/60 hover:text-ink hover:bg-ink/5' : 'text-paper/60 hover:text-paper hover:bg-white/5'
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
