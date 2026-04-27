import { useState } from 'react'

const timeSlots = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
]

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 animate-fade-in-up">
          <div className="w-20 h-20 bg-jade/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif text-ink mb-4 tracking-wider">预约成功</h2>
          <p className="text-tea mb-2">您的预约已提交，我们将尽快与您确认。</p>
          <p className="text-sm text-tea/60 mb-8">预约编号：{new Date().getTime().toString(36).toUpperCase()}</p>
          <button
            onClick={() => {
              setSubmitted(false)
              setForm({ name: '', phone: '', date: '', time: '', guests: 2, notes: '' })
            }}
            className="px-8 py-3 bg-cinnabar text-white rounded-xl hover:bg-cinnabar-light transition-colors tracking-wider text-sm shadow-md shadow-cinnabar/20"
          >
            继续预约
          </button>
        </div>
      </div>
    )
  }

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
          <h1 className="text-4xl md:text-5xl font-serif text-paper mb-4 tracking-wider">预约订座</h1>
          <div className="brush-divider w-16 mx-auto mb-4" />
          <p className="text-paper/60 text-sm tracking-wider">RESERVATION</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-tea mb-2 tracking-wider">姓名 *</label>
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
                <label className="block text-sm text-tea mb-2 tracking-wider">电话 *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-paper-dark rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all"
                  placeholder="请输入联系电话"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm text-tea mb-2 tracking-wider">日期 *</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3 bg-paper-dark rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-tea mb-2 tracking-wider">时间 *</label>
                <select
                  required
                  value={form.time}
                  onChange={e => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-3 bg-paper-dark rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all"
                >
                  <option value="">请选择时间</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-tea mb-2 tracking-wider">人数 *</label>
                <div className="flex items-center space-x-4 bg-paper-dark rounded-xl px-4 py-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                    className="w-8 h-8 rounded-full bg-paper text-tea flex items-center justify-center hover:bg-cinnabar hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-serif text-ink w-8 text-center">{form.guests}</span>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, guests: Math.min(20, form.guests + 1) })}
                    className="w-8 h-8 rounded-full bg-paper text-tea flex items-center justify-center hover:bg-cinnabar hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-tea mb-2 tracking-wider">特殊需求</label>
              <textarea
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                className="w-full px-4 py-3 bg-paper-dark rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none transition-all"
                rows={4}
                placeholder="如有特殊需求（如过敏信息、座位偏好等）请在此备注"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-cinnabar text-white rounded-xl hover:bg-cinnabar-light transition-colors tracking-wider text-sm shadow-md shadow-cinnabar/20"
            >
              提交预约
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
