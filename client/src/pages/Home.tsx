import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { menuData } from '../data/menuData'

const features = [
  {
    icon: '鲜',
    title: '新鲜食材',
    desc: '每日精选当季食材，从农场到餐桌'
  },
  {
    icon: '匠',
    title: '匠心烹饪',
    desc: '传承经典技艺，创新现代风味'
  },
  {
    icon: '境',
    title: '雅致环境',
    desc: '新中式装修风格，私密用餐空间'
  },
  {
    icon: '礼',
    title: '星级服务',
    desc: '专业侍者团队，贴心周到服务'
  }
]

const testimonials = [
  {
    name: '王先生',
    text: '海源荟的红烧肉是我在上海吃过最正宗的，肥而不腻，入口即化。环境也非常雅致，很适合商务宴请。',
    rating: 5,
    date: '2024-01'
  },
  {
    name: '李女士',
    text: '带家人来庆祝生日，佛跳墙和清蒸东星斑都让人惊艳。服务很周到，下次还会再来。',
    rating: 5,
    date: '2024-02'
  },
  {
    name: '张先生',
    text: '作为老顾客了，每次来都有新的惊喜。新派中餐的创意让人佩服，强烈推荐！',
    rating: 5,
    date: '2024-03'
  }
]

const stats = [
  { number: '10+', label: '年品牌历史' },
  { number: '100+', label: '精选菜品' },
  { number: '50,000+', label: '服务顾客' },
  { number: '98%', label: '好评率' }
]

const recommended = menuData.filter(item => item.recommended)

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

    document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useRevealOnScroll()

  // 鼠标视差效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // 自动轮播评价
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      {/* ============ HERO SECTION - 东方意境 ============ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 深色水墨渐变背景 */}
        <div className="absolute inset-0 hero-gradient" />
        
        {/* 动态金箔粒子 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold/30 rounded-full animate-gold-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -20}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 6}s`,
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                opacity: 0.2 + Math.random() * 0.3
              }}
            />
          ))}
        </div>

        {/* 装饰性圆环 - 鼠标视差 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gold/[0.06] rounded-full transition-transform duration-700 ease-out"
          style={{ transform: `translate(-50%, -50%) translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold/[0.04] rounded-full transition-transform duration-700 ease-out"
          style={{ transform: `translate(-50%, -50%) translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-gold/[0.08] rounded-full transition-transform duration-700 ease-out"
          style={{ transform: `translate(-50%, -50%) translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)` }}
        />

        {/* 水墨晕染 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] ink-circle animate-breathe" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] ink-circle animate-breathe" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] ink-circle animate-breathe" style={{ animationDelay: '4s' }} />
        </div>

        {/* 内容 */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* 中式印章Logo */}
          <div className="mb-10 animate-blur-in">
            <div className="seal w-16 h-16 mx-auto text-lg">
              海
            </div>
          </div>

          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-paper mb-4 tracking-[0.15em] animate-blur-in font-light"
            style={{ animationDelay: '0.1s' }}
          >
            海源荟
          </h1>
          <p 
            className="text-base md:text-lg text-gradient-gold font-serif mb-2 tracking-[0.3em] animate-blur-in"
            style={{ animationDelay: '0.2s' }}
          >
            HAIYUANHUI
          </p>
          
          {/* 中式分隔线 */}
          <div className="flex items-center justify-center gap-3 mb-6 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-[1px] bg-gold/30" />
            <div className="w-2 h-2 rotate-45 border border-gold/40" />
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
          
          <p 
            className="text-sm md:text-base text-paper/50 mb-14 max-w-xl mx-auto leading-relaxed tracking-wider animate-blur-in font-light"
            style={{ animationDelay: '0.4s' }}
          >
            以海纳百川之胸怀，汇聚天下珍馐美味
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-blur-in" style={{ animationDelay: '0.6s' }}>
            <Link
              to="/menu"
              className="group relative px-10 py-4 overflow-hidden tracking-wider text-sm"
            >
              <div className="absolute inset-0 bg-paper group-hover:bg-white transition-colors duration-500 rounded-full" />
              <span className="relative text-ink font-medium z-10">探索菜单</span>
              <div className="absolute inset-0 rounded-full border border-paper/20 group-hover:border-transparent transition-colors duration-500" />
            </Link>
            <Link
              to="/reservation"
              className="group relative px-10 py-4 overflow-hidden tracking-wider text-sm"
            >
              <div className="absolute inset-0 rounded-full border border-paper/30 group-hover:border-paper/60 transition-all duration-500" />
              <div className="absolute inset-0 bg-paper/0 group-hover:bg-paper/[0.06] transition-colors duration-500 rounded-full" />
              <span className="relative text-paper/80 group-hover:text-paper transition-colors duration-500 z-10">预约订座</span>
            </Link>
          </div>
        </div>

        {/* 滚动指示器 */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 animate-float-up">
          <span className="text-[10px] text-paper/25 tracking-[0.25em]">SCROLL</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-gold/30 to-transparent" />
        </div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section className="py-24 bg-ink relative overflow-hidden">
        {/* 装饰 */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-10 left-1/4 w-80 h-80 border border-gold/20 rounded-full" />
          <div className="absolute bottom-10 right-1/4 w-60 h-60 border border-gold/10 rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center reveal">
                <p className="text-4xl md:text-5xl font-serif text-gold mb-2 stat-number font-light">{stat.number}</p>
                {/* 小分隔 */}
                <div className="w-8 h-[1px] bg-gold/20 mx-auto mb-3" />
                <p className="text-xs text-paper/40 tracking-[0.2em] uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className="py-28 bg-paper relative">
        {/* 宣纸纹理背景 */}
        <div className="absolute inset-0 paper-texture opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 reveal">
            <span className="text-xs text-tea/60 tracking-[0.3em] uppercase mb-4 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-ink mb-4 tracking-wider font-light">至臻体验</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-[1px] bg-gold/40" />
              <div className="w-2 h-2 rotate-45 border border-gold/50" />
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-10 bg-paper-dark/50 rounded-3xl reveal card-chinese"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* 中式圆形图标 */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gold/30 flex items-center justify-center group-hover:border-cinnabar group-hover:bg-cinnabar/5 transition-all duration-500">
                  <span className="text-xl font-serif text-gold group-hover:text-cinnabar transition-colors duration-500">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-serif text-ink mb-3 tracking-wider">{feature.title}</h3>
                {/* 装饰点 */}
                <div className="w-6 h-[1px] bg-gold/20 mx-auto mb-3" />
                <p className="text-sm text-tea/70 leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RECOMMENDED DISHES ============ */}
      <section className="py-28 bg-paper-dark/30 relative">
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute top-20 right-20 w-96 h-96 border border-gold/20 rounded-full" />
          <div className="absolute bottom-20 left-20 w-72 h-72 border border-gold/10 rounded-full" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 reveal">
            <span className="text-xs text-tea/60 tracking-[0.3em] uppercase mb-4 block">Signature Dishes</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-ink mb-4 tracking-wider font-light">招牌推荐</h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-gold/40" />
              <div className="w-2 h-2 rotate-45 border border-gold/50" />
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>
            <p className="text-tea/60 text-sm tracking-wider font-light">主厨精选 · 不容错过</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {recommended.map((item, index) => (
              <div
                key={item.id}
                className="group bg-paper rounded-2xl overflow-hidden reveal card-chinese"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* 图片区 */}
                <div className="relative h-64 img-placeholder flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.06]">
                    <div className="absolute top-4 right-4 w-32 h-32 border border-gold/30 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-gold/10 rounded-full" />
                  </div>
                  <div className="text-center z-10 group-hover:scale-110 transition-transform duration-700 ease-out">
                    <div className="text-6xl mb-3 opacity-80">{item.emoji}</div>
                    <p className="text-gold font-serif text-base tracking-wider">{item.name}</p>
                    <p className="text-paper/30 text-xs mt-1 tracking-wider">{item.nameEn}</p>
                  </div>
                  {/* 印章标签 */}
                  <div className="absolute top-5 left-5 seal-sm">
                    <span className="text-[10px]">主厨推荐</span>
                  </div>
                </div>
                {/* 内容区 */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-serif text-ink tracking-wider">{item.name}</h3>
                    <span className="text-cinnabar font-serif text-xl font-light">¥{item.price}</span>
                  </div>
                  <div className="w-full h-[1px] bg-gold/10 mb-3" />
                  <p className="text-sm text-tea/70 leading-relaxed line-clamp-2 font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 reveal">
            <Link
              to="/menu"
              className="group inline-flex items-center space-x-3 px-10 py-4 border border-gold/40 text-gold rounded-full hover:bg-gold/[0.06] hover:border-gold/60 transition-all duration-500 tracking-wider text-sm"
            >
              <span>查看完整菜单</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS SECTION ============ */}
      <section className="py-28 bg-paper relative overflow-hidden">
        <div className="absolute inset-0 paper-texture opacity-20" />
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-20 right-20 w-80 h-80 border border-gold/20 rounded-full" />
          <div className="absolute bottom-20 left-20 w-60 h-60 border border-gold/10 rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-xs text-tea/60 tracking-[0.3em] uppercase mb-4 block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-ink mb-4 tracking-wider font-light">食客心声</h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-gold/40" />
              <div className="w-2 h-2 rotate-45 border border-gold/50" />
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>
            <p className="text-tea/60 text-sm tracking-wider font-light">来自真实顾客的评价</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative reveal">
              {/* 卷轴风格评价卡片 */}
              <div className="bg-paper-dark/50 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-gold/10 shadow-sm">
                {/* 顶部装饰 */}
                <div className="flex items-center justify-center gap-2 mb-8">
                  <div className="w-8 h-[1px] bg-gold/20" />
                  <div className="w-1.5 h-1.5 rotate-45 border border-gold/30" />
                  <div className="w-8 h-[1px] bg-gold/20" />
                </div>
                
                <div className="text-center">
                  {/* 引号 */}
                  <div className="text-5xl text-gold/10 font-serif mb-4 leading-none font-light">"</div>
                  
                  <p className="text-lg md:text-xl text-ink/80 leading-relaxed mb-8 transition-all duration-700 font-light italic">
                    {testimonials[activeTestimonial].text}
                  </p>

                  {/* 星级 */}
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gold font-serif text-lg">{testimonials[activeTestimonial].name}</p>
                  <p className="text-tea/50 text-xs mt-1">{testimonials[activeTestimonial].date}</p>
                </div>

                {/* 底部装饰 */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  <div className="w-8 h-[1px] bg-gold/20" />
                  <div className="w-1.5 h-1.5 rotate-45 border border-gold/30" />
                  <div className="w-8 h-[1px] bg-gold/20" />
                </div>

                {/* 指示点 */}
                <div className="flex items-center justify-center space-x-3 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`transition-all duration-500 rounded-full ${
                        index === activeTestimonial
                          ? 'w-8 h-2 bg-cinnabar'
                          : 'w-2 h-2 bg-gold/20 hover:bg-gold/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="py-32 bg-ink relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-80 h-80 border border-gold/[0.06] rounded-full" />
          <div className="absolute bottom-20 right-20 w-96 h-96 border border-gold/[0.04] rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 ink-circle animate-breathe" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 ink-circle animate-breathe" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* 金箔粒子 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-gold/20 rounded-full animate-gold-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -20}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 8}s`,
                opacity: 0.1 + Math.random() * 0.2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="mb-10 reveal-scale">
            <div className="seal w-16 h-16 mx-auto text-lg">
              宴
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-paper mb-6 tracking-wider reveal font-light">
            即刻开启美食之旅
          </h2>
          <p className="text-paper/40 mb-14 max-w-xl mx-auto leading-relaxed reveal font-light text-sm tracking-wider">
            无论是商务宴请、家庭聚餐还是浪漫约会，<br />
            海源荟都将为您呈现一场难忘的味觉盛宴
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 reveal">
            <Link
              to="/reservation"
              className="group relative px-10 py-4 overflow-hidden tracking-wider text-sm"
            >
              <div className="absolute inset-0 bg-paper group-hover:bg-white transition-colors duration-500 rounded-full" />
              <span className="relative text-ink font-medium z-10">立即预约</span>
            </Link>
            <Link
              to="/order"
              className="group relative px-10 py-4 overflow-hidden tracking-wider text-sm"
            >
              <div className="absolute inset-0 rounded-full border border-paper/20 group-hover:border-paper/40 transition-all duration-500" />
              <div className="absolute inset-0 bg-paper/0 group-hover:bg-paper/[0.05] transition-colors duration-500 rounded-full" />
              <span className="relative text-paper/70 group-hover:text-paper transition-colors duration-500 z-10">在线点餐</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
