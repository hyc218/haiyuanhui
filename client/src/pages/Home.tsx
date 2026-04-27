import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { menuData } from '../data/menuData'

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '新鲜食材',
    desc: '每日精选当季食材，从农场到餐桌'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: '匠心烹饪',
    desc: '传承经典技艺，创新现代风味'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: '雅致环境',
    desc: '新中式装修风格，私密用餐空间'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
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

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // 自动轮播评价
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      {/* ============ Hero Section ============ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 水墨背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink-light to-ink" />
        
        {/* 装饰性水墨圆 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 ink-circle animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 ink-circle animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold/10 rounded-full" />
          <div className="absolute top-20 left-20 w-48 h-48 border border-gold/10 rounded-full" />
          <div className="absolute bottom-20 right-20 w-64 h-64 border border-gold/5 rounded-full" />
        </div>

        {/* 水墨晕染粒子 */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-gold/5 animate-ink-spread"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>

        {/* 内容 */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Logo 动画 */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gold/10 rounded-full flex items-center justify-center animate-float border border-gold/20">
              <span className="text-gold font-serif text-5xl">海</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-paper mb-6 tracking-[0.2em] animate-fade-in-up">
            海源荟
          </h1>
          <p className="text-xl md:text-2xl text-gradient-gold font-serif mb-4 tracking-wider animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            HAIYUANHUI
          </p>
          <p className="text-lg text-paper/60 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            以海纳百川之胸怀，汇聚天下珍馐美味<br />
            传承中华饮食文化精髓，演绎新派中餐美学
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Link
              to="/menu"
              className="group relative px-10 py-4 overflow-hidden rounded-lg tracking-wider text-sm"
            >
              <div className="absolute inset-0 bg-cinnabar group-hover:bg-cinnabar-light transition-colors duration-300" />
              <span className="relative text-white">探索菜单</span>
            </Link>
            <Link
              to="/reservation"
              className="group relative px-10 py-4 overflow-hidden rounded-lg tracking-wider text-sm border border-gold/50 hover:border-gold transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-300" />
              <span className="relative text-gold">预约订座</span>
            </Link>
          </div>
        </div>

        {/* 滚动指示器 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <svg className="w-6 h-6 text-gold/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ============ Stats Section ============ */}
      <section className="py-16 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 border border-gold/20 rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 border border-gold/10 rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center reveal">
                <p className="text-3xl md:text-4xl font-serif text-gold mb-2">{stat.number}</p>
                <p className="text-sm text-paper/50 tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Features Section ============ */}
      <section className="py-24 bg-paper-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-serif text-ink mb-4 tracking-wider">至臻体验</h2>
            <div className="brush-divider w-24 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 bg-paper rounded-2xl shadow-sm card-hover group reveal"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-paper-dark rounded-xl flex items-center justify-center text-gold group-hover:bg-cinnabar group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-serif text-ink mb-3 tracking-wider">{feature.title}</h3>
                <p className="text-sm text-tea leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Recommended Dishes ============ */}
      <section className="py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-serif text-ink mb-4 tracking-wider">招牌推荐</h2>
            <div className="brush-divider w-24 mx-auto mb-4" />
            <p className="text-tea text-sm tracking-wider">主厨精选，不容错过</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommended.map((item, index) => (
              <div
                key={item.id}
                className="group bg-paper-dark rounded-2xl overflow-hidden shadow-sm card-hover reveal"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 bg-gradient-to-br from-ink-light to-ink flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 right-4 w-32 h-32 border border-gold/30 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-gold/10 rounded-full" />
                  </div>
                  <div className="text-center z-10 group-hover:scale-110 transition-transform duration-500">
                    <div className="text-7xl mb-3">{item.emoji}</div>
                    <p className="text-gold font-serif text-lg tracking-wider">{item.name}</p>
                    <p className="text-paper/40 text-xs mt-1">{item.nameEn}</p>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-cinnabar text-white text-xs rounded-full tracking-wider shadow-lg">
                    招牌
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-serif text-ink tracking-wider">{item.name}</h3>
                    <span className="text-cinnabar font-serif text-lg">¥{item.price}</span>
                  </div>
                  <p className="text-sm text-tea leading-relaxed line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <Link
              to="/menu"
              className="group inline-flex items-center space-x-2 px-8 py-3 border border-gold text-gold rounded-lg hover:bg-gold/10 transition-all duration-300 tracking-wider text-sm"
            >
              <span>查看完整菜单</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Testimonials Section ============ */}
      <section className="py-24 bg-paper-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-serif text-ink mb-4 tracking-wider">食客心声</h2>
            <div className="brush-divider w-24 mx-auto mb-4" />
            <p className="text-tea text-sm tracking-wider">来自真实顾客的评价</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative bg-paper rounded-3xl p-8 md:p-12 shadow-sm min-h-[220px]">
              {/* 评价内容 */}
              <div className="text-center">
                {/* 引号装饰 */}
                <div className="text-5xl text-gold/20 font-serif mb-4 leading-none">"</div>
                
                <p className="text-lg text-ink leading-relaxed mb-6 transition-all duration-500">
                  {testimonials[activeTestimonial].text}
                </p>

                {/* 星级 */}
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gold font-serif text-lg">{testimonials[activeTestimonial].name}</p>
                <p className="text-tea text-xs mt-1">{testimonials[activeTestimonial].date}</p>
              </div>

              {/* 指示点 */}
              <div className="flex items-center justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial
                        ? 'bg-cinnabar w-6'
                        : 'bg-gold/30 hover:bg-gold/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA Section ============ */}
      <section className="py-24 bg-ink relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 border border-gold/10 rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-gold/5 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 ink-circle" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="mb-8 reveal">
            <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center border border-gold/20">
              <span className="text-gold font-serif text-2xl">宴</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-paper mb-6 tracking-wider reveal">
            即刻开启美食之旅
          </h2>
          <p className="text-paper/60 mb-10 max-w-2xl mx-auto leading-relaxed reveal">
            无论是商务宴请、家庭聚餐还是浪漫约会，<br />
            海源荟都将为您呈现一场难忘的味觉盛宴
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
            <Link
              to="/reservation"
              className="px-10 py-4 bg-gold text-ink rounded-lg hover:bg-gold-light transition-all duration-300 tracking-wider text-sm font-medium"
            >
              立即预约
            </Link>
            <Link
              to="/order"
              className="px-10 py-4 border border-paper/30 text-paper rounded-lg hover:border-paper/50 transition-all duration-300 tracking-wider text-sm"
            >
              在线点餐
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
