import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { GraduationCap, Award, Briefcase, Star, ArrowRight, Mail, Phone, CheckCircle } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import config, { products, formatPrice } from '../config'

function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const num = parseInt(target)
          const duration = 1500
          const start = performance.now()

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            el.textContent = Math.floor(eased * num) + suffix
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export default function Home() {
  useScrollAnimation()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    if (data.get('_gotcha')) return
    // If a Formspree ID is set, deliver silently to that inbox; otherwise open a
    // pre-addressed email to the owner (connected, but nothing sends automatically).
    if (config.formspree_id) {
      fetch(`https://formspree.io/f/${config.formspree_id}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      }).then(() => setSubmitted(true))
    } else if (config.email) {
      const topic = data.get('interest') || data.get('subject') || ''
      const subject = `Website inquiry${topic ? ` — ${topic}` : ''}`
      const body = `Name: ${data.get('name') || ''}\nEmail: ${data.get('email') || ''}\n\n${data.get('message') || ''}`
      window.location.href = `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setSubmitted(true)
    } else {
      setSubmitted(true)
    }
  }

  return (
    <>
      {/* Hero — split layout */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 bg-mint-bg overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-in" style={{ transitionDelay: '0.1s' }}>
            <span className="inline-block bg-emerald/10 text-emerald text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              A BCBA-Designed Training Program
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-forest-text font-bold leading-[1.08] tracking-tight">
              Baking with <span className="font-script text-emerald text-[1.15em]">Purpose</span>
            </h1>
            <p className="mt-6 text-lg text-sage font-body leading-relaxed max-w-[520px]">
              {config.mission}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/about"
                className="btn-primary bg-emerald text-white px-8 py-3.5 rounded-full text-sm font-semibold font-body inline-flex items-center justify-center gap-2"
              >
                Learn Our Story <ArrowRight size={16} />
              </Link>
              <Link
                to="/order"
                className="btn-primary border-2 border-emerald text-emerald px-8 py-3.5 rounded-full text-sm font-semibold font-body text-center hover:bg-emerald hover:text-white transition-colors"
              >
                Order Baked Goods
              </Link>
            </div>
          </div>
          <div className="animate-in" style={{ transitionDelay: '0.3s' }}>
            <div className="relative">
              <img
                src="/assets/anne-baking.jpg"
                alt="Anne Malbica working with a trainee at Nanny Annie's Bakery"
                className="w-full rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] object-cover object-bottom aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center">
                  <Award size={20} className="text-emerald" />
                </div>
                <div>
                  <p className="font-heading font-bold text-forest-text text-sm">BCBA-Designed Program</p>
                  <p className="text-sage text-xs font-body">Research-backed training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-emerald py-14 md:py-16">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { number: '80', suffix: '%', label: 'Adults with IDD Unemployed' },
            { number: '1', suffix: ' in 36', label: 'Children Diagnosed with ASD' },
            { number: '19', suffix: '%', label: 'Have Competitive Jobs' },
            { number: '4', suffix: ' Phase', label: 'Training Program' },
          ].map(({ number, suffix, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl md:text-4xl font-heading font-bold text-white">
                <AnimatedCounter target={number} suffix={suffix} />
              </p>
              <p className="text-white/70 text-sm font-body mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-28 md:py-36 px-6 bg-blush-wash">
        <div className="max-w-[680px] mx-auto text-center animate-in">
          <span className="inline-block bg-orange/10 text-orange text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
            Why We Exist
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-forest-text font-bold">
            More Than a Bakery
          </h2>
          <p className="mt-6 text-lg text-sage font-body leading-relaxed">
            Over 80% of adults with IDD are unemployed or underemployed. Nanny Annie's Bakery
            exists to change that, <strong>one loaf, one certification, and one career at a time</strong>.
            Every purchase <strong>directly funds our training program</strong>.
          </p>
        </div>
      </section>

      {/* Quick Access */}
      <section className="pb-28 md:pb-36 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 stagger-children">
            {[
              { to: '/about', label: 'About Us', sub: 'Our story and mission', color: 'bg-emerald' },
              { to: '/training', label: 'Training Program', sub: 'How the program works', color: 'bg-blue-deep' },
              { to: '/order', label: 'Order Baked Goods', sub: 'Support us with a purchase', color: 'bg-orange' },
              { to: '/contact', label: 'Contact Us', sub: 'Get in touch or volunteer', color: 'bg-charcoal' },
            ].map(({ to, label, sub, color }) => (
              <Link
                key={to}
                to={to}
                className={`${color} rounded-2xl p-6 md:p-8 text-white card-hover animate-in block group`}
              >
                <h3 className="font-heading text-lg md:text-xl font-bold mb-2">{label}</h3>
                <p className="text-white/70 font-body text-sm">{sub}</p>
                <ArrowRight size={18} className="mt-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — numbered step cards */}
      <section className="py-28 md:py-36 px-6 bg-blue-wash">
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="text-center animate-in">
            <span className="inline-block bg-blue-deep/10 text-blue-deep text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              The Process
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-forest-text font-bold">How It Works</h2>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children relative">
            {/* Connecting line — desktop only */}
            <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-emerald/15" />
            {[
              { icon: GraduationCap, num: '01', title: 'Train', desc: 'Participants learn food handling, customer service, and workplace skills in our real bakery environment.' },
              { icon: Award, num: '02', title: 'Certify', desc: 'Earn industry-recognized certifications that open doors to competitive employment opportunities.' },
              { icon: Briefcase, num: '03', title: 'Employ', desc: 'Graduates enter the workforce with confidence, real skills, and professional experience.' },
            ].map(({ icon: Icon, num, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-8 text-center card-hover animate-in relative">
                <div className="w-14 h-14 bg-blue-deep/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-blue-deep" />
                </div>
                <span className="text-xs font-body font-bold text-blue-deep uppercase tracking-wider">{num}</span>
                <h3 className="font-heading text-xl text-forest-text font-bold mt-2 mb-3">{title}</h3>
                <p className="text-sage font-body text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-in">
            <div>
              <span className="inline-block bg-orange/10 text-orange text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
                Our Baked Goods
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-forest-text font-bold">Fresh from the Oven</h2>
              <p className="mt-2 text-sage font-body">All proceeds support our training program</p>
            </div>
            <Link to="/order" className="text-emerald font-body font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
              View full menu <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {products.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-sm card-hover animate-in group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg text-forest-text font-bold mb-1">{product.name}</h3>
                  <p className="text-sage font-body text-sm leading-relaxed mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-emerald font-heading font-bold text-lg">{formatPrice(product.price)}</p>
                    <Link
                      to="/order"
                      className="text-xs font-body font-semibold text-orange bg-orange/10 px-3 py-1.5 rounded-full hover:bg-orange hover:text-white transition-colors"
                    >
                      Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 md:py-36 px-6 bg-sage-wash">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center animate-in">
            <span className="inline-block bg-emerald/10 text-emerald text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              Testimonials
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-forest-text font-bold">What People Say</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {[
              { quote: "This program gave my son the confidence and skills he needed to land his first real job. We're so grateful.", name: 'Maria S.', role: 'Parent', stars: 5 },
              { quote: "The training is thorough, compassionate, and truly prepares participants for the workplace. A game changer.", name: 'David L.', role: 'Employer Partner', stars: 5 },
              { quote: "I love baking here. I learned so much and now I work at a real bakery downtown!", name: 'James T.', role: 'Program Graduate', stars: 5 },
            ].map(({ quote, name, role, stars }) => (
              <div key={name} className="bg-white rounded-2xl p-8 border border-mint-border card-hover animate-in">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={16} className="text-orange fill-orange" />
                  ))}
                </div>
                <p className="text-forest-text font-body leading-relaxed mb-6">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald rounded-full flex items-center justify-center">
                    <span className="text-white font-heading font-bold text-sm">{name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-forest-text text-sm">{name}</p>
                    <p className="text-sage font-body text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed CTA */}
      <section className="relative py-32 md:py-40 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/about_team.png)' }}
        />
        <div className="absolute inset-0 bg-emerald-dark/80" />
        <div className="relative z-10 max-w-[720px] mx-auto text-center animate-in">
          <h2 className="font-heading text-4xl sm:text-5xl text-white font-bold leading-[1.1]">
            Support Our Mission
          </h2>
          <p className="mt-6 text-lg text-white/80 font-body leading-relaxed">
            Every order, donation, and volunteer hour helps us <strong>train and certify more
            individuals</strong> for meaningful employment.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/order"
              className="btn-primary bg-orange text-white px-10 py-4 rounded-full text-sm font-semibold font-body"
            >
              Order Baked Goods
            </Link>
            <Link
              to="/contact"
              className="btn-primary bg-white/10 backdrop-blur text-white border border-white/20 px-10 py-4 rounded-full text-sm font-semibold font-body hover:bg-white/20"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Get in Touch — contact form with dropdown, at the bottom */}
      <section id="contact" className="py-24 md:py-32 px-6 bg-mint-surface">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — intro + info */}
          <div className="lg:col-span-2 animate-in">
            <span className="inline-block bg-blue-deep/10 text-blue-deep text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              Get in Touch
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-forest-text font-bold leading-[1.1]">
              Reach <span className="font-script text-blue-deep text-[1.15em]">out</span>
            </h2>
            <p className="mt-5 text-sage font-body leading-relaxed max-w-[420px]">
              Whether you're a parent exploring the program, an employer ready to hire a graduate,
              or a neighbor with a standing order, we read every message.
            </p>
            <div className="mt-8 space-y-4">
              {config.email && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-deep/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-blue-deep" />
                  </div>
                  <a href={`mailto:${config.email}`} className="text-sage font-body text-sm hover:text-blue-deep transition-colors">{config.email}</a>
                </div>
              )}
              {config.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-deep/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-blue-deep" />
                  </div>
                  <a href={`tel:${config.phone}`} className="text-sage font-body text-sm hover:text-blue-deep transition-colors">{config.phone}</a>
                </div>
              )}
              {!config.email && !config.phone && (
                <p className="text-sage font-body text-sm leading-relaxed bg-mint-bg rounded-xl p-5 border border-mint-border">
                  Send a note below and we'll be in touch, usually within 24 hours.
                </p>
              )}
            </div>
          </div>

          {/* Right — form with dropdown */}
          <div className="lg:col-span-3 animate-in">
            {submitted ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-mint-border">
                <div className="w-16 h-16 bg-blue-deep/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-blue-deep" />
                </div>
                <h3 className="font-heading text-2xl text-forest-text font-bold mb-3">Message Sent!</h3>
                <p className="text-sage font-body leading-relaxed">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-mint-border space-y-6">
                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block font-body font-medium text-forest-text text-sm mb-2">Name *</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-mint-border bg-mint-bg font-body text-sm focus:outline-none" />
                  </div>
                  <div className="form-field">
                    <label className="block font-body font-medium text-forest-text text-sm mb-2">Email *</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-mint-border bg-mint-bg font-body text-sm focus:outline-none" />
                  </div>
                </div>
                <div className="form-field">
                  <label className="block font-body font-medium text-forest-text text-sm mb-2">I'm interested in</label>
                  <select name="interest" className="w-full px-4 py-3 rounded-xl border border-mint-border bg-mint-bg font-body text-sm focus:outline-none">
                    <option value="">Select an option</option>
                    <option>Enrolling in the program</option>
                    <option>Hiring a graduate</option>
                    <option>Volunteering</option>
                    <option>Placing a large order</option>
                    <option>Press or media</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="block font-body font-medium text-forest-text text-sm mb-2">Message *</label>
                  <textarea name="message" rows="5" required placeholder="Tell us how we can help..." className="w-full px-4 py-3 rounded-xl border border-mint-border bg-mint-bg font-body text-sm focus:outline-none resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full bg-blue-deep text-white py-3.5 rounded-xl font-body font-semibold text-sm">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
