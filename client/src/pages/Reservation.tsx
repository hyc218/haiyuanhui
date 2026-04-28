import { useState, useEffect } from 'react'

const timeSlots = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
]

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

export default function ReservationPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)

  useRevealOnScroll()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 animate-scale-in">
          <div className="w-20 h-20 bg-jade/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif text-ink mb-4 tracking-wider">预约成功</h2>
          <p className="text-tea/70 font-light mb-2">您的预约已提交，我们将尽快与您确认。</p>
          <p className="text-sm text-tea/50 mb-8 font-light">预约编号：{new Date().getTime().toString(36).toUpperCase()}</p>
          <button
            onClick={() => {
              setSubmitted(false)
              setForm({ name: '', phone: '', date: '', time: '', guests: 2, notes: '' })
            }}
            className="px-8 py-3 bg-cinnabar text-white rounded-full hover:bg-cinnabar-light transition-all tracking-wider text-sm shadow-md shadow-cinnabar/20 btn-apple"
          >
            继续预约
          </button>
        </div>
      </div>
    )
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
              <span className="text-gold font-serif text-2xl">订</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-paper mb-4 tracking-wider animate-blur-in font-light" style={{ animationDelay: '0.1s' }}>
            预约订座
          </h1>
          <div className="brush-divider w-16 mx-auto mb-4 animate-scale-in" style={{ animationDelay: '0.2s' }} />
          <p className="text-paper/40 text-sm tracking-[0.3em] animate-blur-in font-light" style={{ animationDelay: '0.3s' }}>
            MAKE A RESERVATION
          </p>
        </div>
      </section>

      {/* 装饰图片 */}
      <section className="relative h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=400&fit=crop"
          alt="餐厅环境"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/50 to-transparent" />
      </section>

      {/* Form */}
      <section className="pb-20 -mt-20 relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-paper rounded-3xl p-8 md:p-10 shadow-sm border border-gold/5 reveal">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-tea/60 mb-2 tracking-wider">姓名 *</label>
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
                  <label className="block text-sm text-tea/60 mb-2 tracking-wider">电话 *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-5 py-3.5 bg-paper-dark/50 rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all border border-gold/5"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm text-tea/60 mb-2 tracking-wider">日期 *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full px-5 py-3.5 bg-paper-dark/50 rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all border border-gold/5"
                  />
                </div>
                <div>
                  <label className="block text-sm text-tea/60 mb-2 tracking-wider">时间 *</label>
                  <select
                    required
                    value={form.time}
                    onChange={e => setForm({ ...form, time: e.target.value })}
                    className="w-full px-5 py-3.5 bg-paper-dark/50 rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all border border-gold/5"
                  >
                    <option value="">请选择时间</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-tea/60 mb-2 tracking-wider">人数 *</label>
                  <div className="flex items-center space-x-4 bg-paper-dark/50 rounded-2xl px-5 py-2.5 border border-gold/5">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                      className="w-9 h-9 rounded-full bg-paper text-tea flex items-center justify-center hover:bg-cinnabar hover:text-white transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-xl font-serif text-ink w-8 text-center">{form.guests}</span>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, guests: Math.min(20, form.guests + 1) })}
                      className="w-9 h-9 rounded-full bg-paper text-tea flex items-center justify-center hover:bg-cinnabar hover:text-white transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-tea/60 mb-2 tracking-wider">特殊需求</label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-5 py-3.5 bg-paper-dark/50 rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 resize-none transition-all border border-gold/5"
                  rows={4}
                  placeholder="如有特殊需求（如过敏信息、座位偏好等）请在此备注"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-cinnabar text-white rounded-2xl hover:bg-cinnabar-light transition-all tracking-wider text-sm shadow-md shadow-cinnabar/20 btn-apple"
              >
                提交预约
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
