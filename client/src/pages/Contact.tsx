import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-20 min-h-screen bg-paper">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-ink via-ink-light to-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-48 h-48 border border-gold/20 rounded-full" />
          <div className="absolute bottom-10 left-20 w-32 h-32 border border-gold/10 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 ink-circle" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-paper mb-4 tracking-wider">联系我们</h1>
          <div className="brush-divider w-16 mx-auto mb-4" />
          <p className="text-paper/60 text-sm tracking-wider">CONTACT US</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="reveal">
              <h2 className="text-3xl font-serif text-ink mb-8 tracking-wider">联系方式</h2>
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
                    <div className="w-12 h-12 bg-paper-dark rounded-xl flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-cinnabar group-hover:text-white transition-all duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-sm text-tea tracking-wider mb-1">{info.title}</h3>
                      <p className="text-ink">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Form */}
            <div className="reveal">
              <h2 className="text-3xl font-serif text-ink mb-8 tracking-wider">在线留言</h2>
              {submitted ? (
                <div className="bg-paper-dark rounded-2xl p-12 text-center">
                  <div className="w-20 h-20 bg-jade/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif text-ink mb-2 tracking-wider">留言已发送</h3>
                  <p className="text-sm text-tea">感谢您的留言，我们会尽快回复！</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                    className="mt-6 px-6 py-2 border border-gold text-gold rounded-lg hover:bg-gold/10 transition-colors text-sm tracking-wider"
                  >
                    继续留言
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-tea mb-2 tracking-wider">姓名</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-paper-dark rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-tea mb-2 tracking-wider">邮箱</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-paper-dark rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-tea mb-2 tracking-wider">留言内容</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 bg-paper-dark rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none transition-all"
                      rows={6}
                      placeholder="请输入您的留言内容..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-cinnabar text-white rounded-xl hover:bg-cinnabar-light transition-colors tracking-wider text-sm shadow-md shadow-cinnabar/20"
                  >
                    发送留言
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-ink-light to-ink rounded-3xl h-80 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-48 h-48 border border-gold/20 rounded-full" />
              <div className="absolute bottom-10 left-10 w-32 h-32 border border-gold/10 rounded-full" />
            </div>
            <div className="text-center relative z-10">
              <svg className="w-16 h-16 mx-auto text-gold/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-gold font-serif text-lg tracking-wider mb-2">海源荟</p>
              <p className="text-sm text-paper/50">上海市黄浦区南京东路100号海源大厦3层</p>
              <p className="text-xs text-paper/30 mt-1">周一至周日 11:00 - 22:00</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
