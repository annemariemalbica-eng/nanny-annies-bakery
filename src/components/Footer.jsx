import { Link } from 'react-router-dom'
import config from '../config'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* Top border accent */}
      <div className="h-1 bg-gradient-to-r from-emerald via-orange to-emerald" />

      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/logo.jpg" alt="Nanny Annie's Bakery" className="w-10 h-10 rounded-full" />
              <span className="font-script text-2xl text-white">Nanny Annie's</span>
            </div>
            <p className="text-white/50 text-sm font-body leading-relaxed max-w-[260px]">
              {config.mission}
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white/40 uppercase tracking-wider mb-5">Navigate</h4>
            <div className="flex flex-col gap-2.5 font-body text-sm">
              <Link to="/" className="text-white/70 hover:text-orange transition-colors">Home</Link>
              <Link to="/about" className="text-white/70 hover:text-orange transition-colors">About Us</Link>
              <Link to="/training" className="text-white/70 hover:text-orange transition-colors">Training</Link>
              <Link to="/order" className="text-white/70 hover:text-orange transition-colors">Order</Link>
              <Link to="/contact" className="text-white/70 hover:text-orange transition-colors">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white/40 uppercase tracking-wider mb-5">Contact</h4>
            <div className="flex flex-col gap-2.5 font-body text-sm text-white/70">
              {config.email && <a href={`mailto:${config.email}`} className="hover:text-orange transition-colors">{config.email}</a>}
              {config.phone && <a href={`tel:${config.phone}`} className="hover:text-orange transition-colors">{config.phone}</a>}
              {config.address && <p>{config.address}</p>}
              {!config.email && !config.phone && <p>Reach us through our contact form</p>}
            </div>
          </div>

          {/* Support Us */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white/40 uppercase tracking-wider mb-5">Support Us</h4>
            <div className="flex flex-col gap-2.5 font-body text-sm">
              <Link to="/order" className="text-white/70 hover:text-orange transition-colors">Order Baked Goods</Link>
              <Link to="/contact" className="text-white/70 hover:text-orange transition-colors">Volunteer</Link>
              <Link to="/contact" className="text-white/70 hover:text-orange transition-colors">Employer Partnership</Link>
              <Link to="/contact" className="text-white/70 hover:text-orange transition-colors">Make a Donation</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs font-body">
            &copy; {new Date().getFullYear()} Nanny Annie's Bakery. All rights reserved.
          </p>
          <p className="text-white/30 text-xs font-body">
            Built with purpose in every pixel.
          </p>
        </div>
      </div>
    </footer>
  )
}
