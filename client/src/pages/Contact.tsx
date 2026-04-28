import { useState, useEffect } from 'react'

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

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useRevealOnScroll()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

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
              <span className="text-gold font-serif text-2xl">联</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-paper mb-4 tracking-wider animate-blur-in font-light" style={{ animationDelay: '0.1s' }}>
            联系我们
          </h1>
          <div className="brush-divider w-16 mx-auto mb-4 animate-scale-in" style={{ animationDelay: '0.2s' }} />
          <p className="text-paper/40 text-sm tracking-[0.3em] animate-blur-in font-light" style={{ animationDelay: '0.3s' }}>
            GET IN TOUCH
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="reveal">
              <span className="text-xs text-tea/60 tracking-[0.3em] uppercase mb-4 block">Information</span>
              <h2 className="text-3xl md:text-4xl font-serif text-ink mb-8 tracking-wider font-light">联系方式</h2>
              <div className="space-y-8">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    title: '地址',
                    content: '上海市黄浦区南京东路100号海源大厦3层'
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    title: '电话',
                    content: '021-6888-8888'
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    title: '邮箱',
                    content: 'contact@haiyuanhui.com'
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: '营业时间',
                    content: '周一至周日 11:00 - 22:00'
                  }
                ].map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-paper-dark rounded-2xl flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-cinnabar group-hover:text-white transition-all duration-500">
                      {info.icon}
                    </div>
                    <div className="pt-1">
                      <h3 className="text-sm text-tea/60 tracking-wider mb-1">{info.title}</h3>
                      <p className="text-ink font-light">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Form */}
            <div className="reveal">
              <span className="text-xs text-tea/60 tracking-[0.3em] uppercase mb-4 block">Message</span>
              <h2 className="text-3xl md:text-4xl font-serif text-ink mb-8 tracking-wider font-light">在线留言</h2>
              {submitted ? (
                <div className="bg-paper-dark/50 rounded-3xl p-12 text-center border border-gold/5">
                  <div className="w-20 h-20 bg-jade/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif text-ink mb-2 tracking-wider">留言已发送</h3>
                  <p className="text-sm text-tea/70 font-light">感谢您的留言，我们会尽快回复！</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                    className="mt-6 px-6 py-2.5 border border-gold/40 text-gold rounded-full hover:bg-gold/5 transition-all text-sm tracking-wider"
                  >
                    继续留言
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-tea/60 mb-2 tracking-wider">姓名</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-5 py-3.5 bg-paper-dark/50 rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all border border-gold/5"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-tea/60 mb-2 tracking-wider">邮箱</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-5 py-3.5 bg-paper-dark/50 rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all border border-gold/5"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-tea/60 mb-2 tracking-wider">留言内容</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-5 py-3.5 bg-paper-dark/50 rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 resize-none transition-all border border-gold/5"
                      rows={6}
                      placeholder="请输入您的留言内容..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-cinnabar text-white rounded-2xl hover:bg-cinnabar-light transition-all tracking-wider text-sm shadow-md shadow-cinnabar/20 btn-apple"
                  >
                    发送留言
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden h-96">
            <img
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=500&fit=crop"
              alt="上海地图"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-cinnabar rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-serif text-lg tracking-wider">海源荟</p>
                  <p className="text-white/50 text-xs">上海市黄浦区南京东路100号海源大厦3层</p>
                </div>
              </div>
              <p className="text-white/30 text-xs mt-2">周一至周日 11:00 - 22:00</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
