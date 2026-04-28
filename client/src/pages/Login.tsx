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
    <div className="pt-20 min-h-screen bg-paper flex items-center justify-center relative overflow-hidden">
      {/* 装饰背景 */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 right-20 w-80 h-80 border border-gold/20 rounded-full" />
        <div className="absolute bottom-20 left-20 w-60 h-60 border border-gold/10 rounded-full" />
      </div>

      <div className="max-w-md w-full mx-4 animate-scale-in relative z-10">
        <div className="bg-paper-dark/50 rounded-3xl p-8 md:p-10 shadow-sm border border-gold/5 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-ink rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-gold font-serif text-2xl">海</span>
            </div>
            <h2 className="text-2xl font-serif text-ink tracking-wider font-light">
              {isRegister ? '注册账号' : '会员登录'}
            </h2>
            <p className="text-sm text-tea/60 mt-2 tracking-wider font-light">
              {isRegister ? '加入海源荟，享受会员专属优惠' : '登录后享受更多会员权益'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-tea/60 mb-1 tracking-wider">用户名</label>
              <input
                type="text"
                required
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                className="w-full px-5 py-3.5 bg-paper rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all border border-gold/5"
                placeholder="请输入用户名"
              />
            </div>
            {isRegister && (
              <div>
                <label className="block text-sm text-tea/60 mb-1 tracking-wider">手机号</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-5 py-3.5 bg-paper rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all border border-gold/5"
                  placeholder="请输入手机号"
                />
              </div>
            )}
            <div>
              <label className="block text-sm text-tea/60 mb-1 tracking-wider">密码</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-5 py-3.5 bg-paper rounded-2xl text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all border border-gold/5"
                placeholder="请输入密码"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-cinnabar text-white rounded-2xl hover:bg-cinnabar-light transition-all tracking-wider text-sm shadow-md shadow-cinnabar/20 btn-apple"
            >
              {isRegister ? '注册' : '登录'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-tea/60 hover:text-cinnabar transition-colors tracking-wider"
            >
              {isRegister ? '已有账号？立即登录' : '没有账号？立即注册'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
