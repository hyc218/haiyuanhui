import { useEffect } from 'react'

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

export default function AboutPage() {
  useRevealOnScroll()

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
              <span className="text-gold font-serif text-2xl">源</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-paper mb-4 tracking-wider animate-blur-in font-light" style={{ animationDelay: '0.1s' }}>
            关于我们
          </h1>
          <div className="brush-divider w-16 mx-auto mb-4 animate-scale-in" style={{ animationDelay: '0.2s' }} />
          <p className="text-paper/40 text-sm tracking-[0.3em] animate-blur-in font-light" style={{ animationDelay: '0.3s' }}>
            OUR STORY
          </p>
        </div>
      </section>

      {/* Story - 品牌故事 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <span className="text-xs text-tea/60 tracking-[0.3em] uppercase mb-4 block">Since 2010</span>
              <h2 className="text-3xl md:text-4xl font-serif text-ink mb-6 tracking-wider font-light">品牌故事</h2>
              <div className="brush-divider w-12 mb-6" />
              <div className="space-y-4 text-tea/80 leading-relaxed font-light">
                <p>
                  「海源荟」创立于2010年，取"海纳百川，源远流长"之意。我们致力于将中华传统美食文化与现代烹饪技艺完美融合，为食客呈现一场跨越时空的味觉盛宴。
                </p>
                <p>
                  十余年来，我们始终坚持"以匠心致初心"的理念，从全球甄选顶级食材，由资深厨师团队精心烹制每一道菜品。我们相信，真正的美食不仅是味蕾的享受，更是文化的传承。
                </p>
                <p>
                  海源荟的每一道菜品，都承载着对食材的敬畏、对技艺的执着、对食客的诚意。我们期待与您一同品味这份匠心独运的美食艺术。
                </p>
              </div>
              {/* 印章装饰 */}
              <div className="mt-8 seal px-5 py-2 text-sm tracking-wider">
                始于2010
              </div>
            </div>
            <div className="relative reveal">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=800&fit=crop"
                  alt="海源荟餐厅环境"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              {/* 装饰印章 */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cinnabar/10 rounded-full flex items-center justify-center border border-cinnabar/20 backdrop-blur-sm">
                <span className="text-cinnabar font-serif text-lg" style={{ transform: 'rotate(-5deg)' }}>源</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values - 品牌理念 */}
      <section className="py-24 bg-paper-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-xs text-tea/60 tracking-[0.3em] uppercase mb-4 block">Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-serif text-ink mb-4 tracking-wider font-light">品牌理念</h2>
            <div className="brush-divider w-16 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop',
                title: '至臻食材',
                desc: '全球甄选顶级食材，从源头把控品质，确保每一道菜品都达到最高标准。'
              },
              {
                image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop',
                title: '匠心技艺',
                desc: '资深厨师团队以精湛技艺烹制，传承经典的同时不断创新，演绎新派中餐美学。'
              },
              {
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
                title: '雅致体验',
                desc: '新中式装修风格，融合传统与现代，营造优雅舒适的用餐环境。'
              }
            ].map((value, index) => (
              <div key={index} className="group bg-paper rounded-3xl overflow-hidden card-hover reveal">
                <div className="h-56 overflow-hidden">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-serif text-ink mb-3 tracking-wider">{value.title}</h3>
                  <p className="text-sm text-tea/70 leading-relaxed font-light">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef - 行政总厨 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1 reveal">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=1000&fit=crop"
                  alt="行政总厨"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-serif text-xl tracking-wider">陈师傅</p>
                  <p className="text-white/50 text-xs mt-1 tracking-wider">行政总厨 · 30年烹饪经验</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 reveal">
              <span className="text-xs text-tea/60 tracking-[0.3em] uppercase mb-4 block">Executive Chef</span>
              <h2 className="text-3xl md:text-4xl font-serif text-ink mb-6 tracking-wider font-light">行政总厨</h2>
              <div className="brush-divider w-12 mb-6" />
              <div className="space-y-4 text-tea/80 leading-relaxed font-light">
                <p>
                  陈师傅，海源荟行政总厨，拥有超过30年的烹饪经验。曾任职于多家米其林星级餐厅，精通传统中式烹饪技艺，同时对现代美食潮流有着独到的见解。
                </p>
                <p>
                  在陈师傅的带领下，海源荟的厨师团队不断探索食材的无限可能，将传统与创新完美融合，为食客带来一道道令人惊艳的佳肴。
                </p>
                <div className="relative pl-6 border-l-2 border-gold/30 mt-6">
                  <p className="text-ink font-serif italic leading-relaxed text-lg">
                    "烹饪是一门艺术，更是一种态度。每一道菜都是我们对食客的承诺。"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-20 w-80 h-80 border border-gold/20 rounded-full" />
          <div className="absolute bottom-20 right-20 w-96 h-96 border border-gold/10 rounded-full" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="mb-8 reveal-scale">
            <div className="w-16 h-16 mx-auto bg-gold/[0.08] rounded-full flex items-center justify-center border border-gold/[0.15] backdrop-blur-sm">
              <span className="text-gold font-serif text-2xl">邀</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-paper mb-6 tracking-wider reveal font-light">
            诚邀品鉴
          </h2>
          <p className="text-paper/40 mb-10 max-w-xl mx-auto leading-relaxed reveal font-light text-sm">
            期待与您一同品味这份匠心独运的美食艺术
          </p>
          <div className="reveal">
            <a
              href="tel:021-6888-8888"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-paper text-ink rounded-full hover:bg-white transition-all duration-500 tracking-wider text-sm font-medium btn-apple"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>021-6888-8888</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
