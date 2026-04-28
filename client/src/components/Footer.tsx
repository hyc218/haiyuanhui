import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/80 relative overflow-hidden">
      {/* 装饰 */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-1/4 w-96 h-96 border border-gold/20 rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 border border-gold/10 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gold/10 rounded-2xl flex items-center justify-center border border-gold/20">
                <span className="text-gold font-serif text-xl">海</span>
              </div>
              <div>
                <h3 className="text-gold font-serif text-lg tracking-widest">海源荟</h3>
                <p className="text-xs text-paper/40 tracking-[0.3em]">HAIYUANHUI</p>
              </div>
            </div>
            <p className="text-sm text-paper/50 leading-relaxed font-light">
              以匠心传承中华美食文化，<br />
              用至臻食材演绎味觉盛宴。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold/80 font-serif text-base mb-4 tracking-wider">快速链接</h4>
            <ul className="space-y-2">
              {[
                { label: '菜品展示', path: '/menu' },
                { label: '在线订餐', path: '/order' },
                { label: '预约订座', path: '/reservation' },
                { label: '会员中心', path: '/member' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-paper/50 hover:text-gold transition-colors font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold/80 font-serif text-base mb-4 tracking-wider">联系方式</h4>
            <ul className="space-y-3 text-sm text-paper/50 font-light">
              <li className="flex items-start space-x-2">
                <svg className="w-4 h-4 mt-0.5 text-gold/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>上海市黄浦区南京东路100号<br />海源大厦3层</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gold/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>021-6888-8888</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gold/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>11:00 - 22:00（周一至周日）</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-gold/80 font-serif text-base mb-4 tracking-wider">关注我们</h4>
            <div className="flex space-x-4">
              {['微信', '微博', '抖音'].map(social => (
                <button
                  key={social}
                  className="w-10 h-10 border border-paper/10 rounded-full flex items-center justify-center text-xs text-paper/50 hover:border-gold/40 hover:text-gold transition-all duration-300"
                >
                  {social}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-paper/30 font-light">
              扫码关注公众号<br />
              获取最新优惠信息
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-paper/5 text-center">
          <p className="text-xs text-paper/30 tracking-wider font-light">
            © 2024 海源荟 HAIYUANHUI. All Rights Reserved. | 沪ICP备XXXXXXXX号
          </p>
        </div>
      </div>
    </footer>
  )
}
