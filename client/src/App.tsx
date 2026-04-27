import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MenuPage from './pages/Menu'
import OrderPage from './pages/Order'
import ReservationPage from './pages/Reservation'
import LoginPage from './pages/Login'
import MemberPage from './pages/Member'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/member" element={<MemberPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
