import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/training', label: 'Training' },
  { to: '/order', label: 'Order' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : 'bg-mint-bg/80 backdrop-blur-sm'}`}>
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 relative z-10">
          <img src="/assets/logo.jpg" alt="Nanny Annie's Bakery" className="w-11 h-11 rounded-full ring-2 ring-emerald/10" />
          <span className="font-script text-2xl text-forest-text leading-none">Nanny Annie's</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link text-sm font-body font-medium transition-colors duration-200 hover:text-emerald ${
                location.pathname === link.to ? 'active text-emerald' : 'text-sage'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/order"
            className="btn-primary bg-emerald text-white px-6 py-2.5 rounded-full text-sm font-semibold font-body"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-forest-text p-2 relative z-10"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu — slide from right */}
      <div className={`md:hidden fixed inset-0 top-[72px] bg-mint-bg transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-6 py-8 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-lg font-body font-medium py-4 border-b border-forest-text/5 ${
                location.pathname === link.to ? 'text-emerald' : 'text-forest-text'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/order"
            className="btn-primary bg-emerald text-white px-6 py-3.5 rounded-full text-center font-semibold font-body mt-6"
          >
            Order Now
          </Link>
        </div>
      </div>
    </nav>
  )
}
