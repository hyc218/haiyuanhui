export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-paper">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-ink via-ink-light to-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-48 h-48 border border-gold/20 rounded-full" />
          <div className="absolute bottom-10 left-20 w-32 h-32 border border-gold/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 ink-circle" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-paper mb-4 tracking-wider">关于我们</h1>
          <div className="brush-divider w-16 mx-auto mb-4" />
          <p className="text-paper/60 text-sm tracking-wider">ABOUT US</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <h2 className="text-3xl font-serif text-ink mb-6 tracking-wider">品牌故事</h2>
              <div className="brush-divider w-12 mb-6" />
              <div className="space-y-4 text-tea leading-relaxed">
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
              <div className="mt-8 seal px-4 py-2 text-sm">
                始于2010
              </div>
            </div>
            <div className="relative reveal">
              <div className="aspect-square bg-gradient-to-br from-ink-light to-ink rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-48 h-48 border border-gold/30 rounded-full" />
                  <div className="absolute bottom-10 right-10 w-64 h-64 border border-gold/10 rounded-full" />
                </div>
                <div className="text-center z-10">
                  <div className="text-8xl mb-4 opacity-30">🏮</div>
                  <p className="text-gold font-serif text-2xl tracking-[0.5em]">海源荟</p>
                  <p className="text-paper/30 text-sm mt-2 tracking-[0.3em]">SINCE 2010</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-paper-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl font-serif text-ink mb-4 tracking-wider">品牌理念</h2>
            <div className="brush-divider w-16 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: '🌿',
                title: '至臻食材',
                desc: '全球甄选顶级食材，从源头把控品质，确保每一道菜品都达到最高标准。'
              },
              {
                icon: '👨‍🍳',
                title: '匠心技艺',
                desc: '资深厨师团队以精湛技艺烹制，传承经典的同时不断创新，演绎新派中餐美学。'
              },
              {
                icon: '🏮',
                title: '雅致体验',
                desc: '新中式装修风格，融合传统与现代，营造优雅舒适的用餐环境。'
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-8 bg-paper rounded-2xl card-hover reveal">
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-serif text-ink mb-4 tracking-wider">{value.title}</h3>
                <p className="text-sm text-tea leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1 reveal">
              <div className="aspect-[4/5] bg-gradient-to-br from-ink-light to-ink rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute bottom-10 left-10 w-48 h-48 border border-gold/30 rounded-full" />
                  <div className="absolute top-10 right-10 w-32 h-32 border border-gold/10 rounded-full" />
                </div>
                <div className="text-center z-10">
                  <div className="text-8xl mb-4 opacity-30">👨‍🍳</div>
                  <p className="text-gold font-serif text-xl tracking-wider">陈师傅</p>
                  <p className="text-paper/30 text-xs mt-2 tracking-wider">行政总厨</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 reveal">
              <h2 className="text-3xl font-serif text-ink mb-6 tracking-wider">行政总厨</h2>
              <div className="brush-divider w-12 mb-6" />
              <div className="space-y-4 text-tea leading-relaxed">
                <p>
                  陈师傅，海源荟行政总厨，拥有超过30年的烹饪经验。曾任职于多家米其林星级餐厅，精通传统中式烹饪技艺，同时对现代美食潮流有着独到的见解。
                </p>
                <p>
                  在陈师傅的带领下，海源荟的厨师团队不断探索食材的无限可能，将传统与创新完美融合，为食客带来一道道令人惊艳的佳肴。
                </p>
                <div className="relative pl-6 border-l-2 border-gold/30">
                  <p className="text-ink font-serif italic leading-relaxed">
                    "烹饪是一门艺术，更是一种态度。每一道菜都是我们对食客的承诺。"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
