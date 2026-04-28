import { useUserStore } from '../store/userStore'
import { useNavigate } from 'react-router-dom'

const orderHistory = [
  { id: 'ORD20240101', date: '2024-01-15', items: '海源招牌红烧肉, 清蒸东星斑...', total: 516, status: '已完成' },
  { id: 'ORD20240102', date: '2024-01-20', items: '佛跳墙, 松茸菌王汤...', total: 386, status: '已完成' },
]

const vipBenefits = [
  { level: '普通会员', points: '0', discount: '9.5折', color: 'text-tea' },
  { level: '黄金会员', points: '1000', discount: '9.0折', color: 'text-gold' },
  { level: '钻石会员', points: '5000', discount: '8.5折', color: 'text-cinnabar' },
]

export default function MemberPage() {
  const { user, isLoggedIn, logout } = useUserStore()
  const navigate = useNavigate()

  if (!isLoggedIn || !user) {
    navigate('/login')
    return null
  }

  return (
    <div className="pt-20 min-h-screen bg-paper">
      {/* Profile Header - Apple 风格 */}
      <section className="relative py-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-10 right-1/4 w-64 h-64 border border-gold/20 rounded-full" />
          <div className="absolute bottom-10 left-1/4 w-48 h-48 border border-gold/10 rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center border border-gold/20 backdrop-blur-sm">
              <span className="text-gold font-serif text-3xl">{user.username[0]}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-serif text-paper tracking-wider font-light">{user.username}</h1>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-gold text-sm tracking-wider">{user.vipLevel}</span>
                <span className="text-paper/20">|</span>
                <span className="text-paper/40 text-xs">{user.phone}</span>
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate('/') }}
              className="px-5 py-2.5 border border-paper/20 text-paper/60 rounded-full hover:border-paper/40 hover:text-paper transition-all text-xs tracking-wider backdrop-blur-sm"
            >
              退出登录
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-paper rounded-3xl p-6 shadow-sm card-hover border border-gold/5">
            <p className="text-xs text-tea/60 tracking-wider mb-2">我的积分</p>
            <p className="text-3xl font-serif text-gold font-light">{user.points}</p>
          </div>
          <div className="bg-paper rounded-3xl p-6 shadow-sm card-hover border border-gold/5">
            <p className="text-xs text-tea/60 tracking-wider mb-2">会员等级</p>
            <p className="text-3xl font-serif text-ink font-light">{user.vipLevel}</p>
          </div>
          <div className="bg-paper rounded-3xl p-6 shadow-sm card-hover border border-gold/5">
            <p className="text-xs text-tea/60 tracking-wider mb-2">累计订单</p>
            <p className="text-3xl font-serif text-ink font-light">{orderHistory.length}</p>
          </div>
        </div>
      </section>

      {/* VIP Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif text-ink mb-8 tracking-wider font-light">会员权益</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vipBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-paper-dark/50 rounded-3xl p-6 shadow-sm border-2 card-hover ${
                  user.vipLevel.includes(benefit.level) ? 'border-gold/40' : 'border-transparent'
                }`}
              >
                <h3 className={`text-lg font-serif mb-3 tracking-wider ${benefit.color}`}>
                  {benefit.level}
                </h3>
                <div className="space-y-2 text-sm text-tea/70 font-light">
                  <p>所需积分：{benefit.points}</p>
                  <p>用餐折扣：{benefit.discount}</p>
                </div>
                {user.vipLevel.includes(benefit.level) && (
                  <div className="mt-4 px-3 py-1 bg-gold/10 text-gold text-xs rounded-full inline-block tracking-wider">
                    当前等级
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order History */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif text-ink mb-8 tracking-wider font-light">订单记录</h2>
          <div className="space-y-4">
            {orderHistory.map(order => (
              <div key={order.id} className="bg-paper-dark/50 rounded-3xl p-6 shadow-sm card-hover border border-gold/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-tea/60">{order.date}</span>
                  <span className="text-xs text-jade bg-jade/10 px-3 py-1 rounded-full">{order.status}</span>
                </div>
                <p className="text-sm text-ink mb-2 font-light">{order.items}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-tea/50">订单号：{order.id}</span>
                  <span className="text-xl font-serif text-cinnabar">¥{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
