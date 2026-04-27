import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ username: '', phone: '', password: '' })
  const login = useUserStore(s => s.login)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({
      id: 1,
      username: form.username || '美食家',
      phone: form.phone || '138****8888',
      points: 1280,
      vipLevel: '黄金会员'
    })
    navigate('/member')
  }

  return (
    <div className="pt-20 min-h-screen bg-paper flex items-center justify-center">
      <div className="max-w-md w-full mx-4 animate-fade-in-up">
        <div className="bg-paper-dark rounded-2xl p-8 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-ink-light to-ink rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-gold font-serif text-2xl">海</span>
            </div>
            <h2 className="text-2xl font-serif text-ink tracking-wider">
              {isRegister ? '注册账号' : '会员登录'}
            </h2>
            <p className="text-sm text-tea mt-2 tracking-wider">
              {isRegister ? '加入海源荟，享受会员专属优惠' : '登录后享受更多会员权益'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-tea mb-1 tracking-wider">用户名</label>
              <input
                type="text"
                required
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                className="w-full px-4 py-3 bg-paper rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all"
                placeholder="请输入用户名"
              />
            </div>
            {isRegister && (
              <div>
                <label className="block text-sm text-tea mb-1 tracking-wider">手机号</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-paper rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all"
                  placeholder="请输入手机号"
                />
              </div>
            )}
            <div>
              <label className="block text-sm text-tea mb-1 tracking-wider">密码</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 bg-paper rounded-xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all"
                placeholder="请输入密码"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cinnabar text-white rounded-xl hover:bg-cinnabar-light transition-colors tracking-wider text-sm shadow-md shadow-cinnabar/20"
            >
              {isRegister ? '注册' : '登录'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-tea hover:text-cinnabar transition-colors"
            >
              {isRegister ? '已有账号？立即登录' : '没有账号？立即注册'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
