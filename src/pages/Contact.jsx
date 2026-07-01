import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import config from '../config'

export default function Contact() {
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
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 bg-mint-bg">
        <div className="max-w-[1280px] mx-auto text-center animate-in">
          <span className="inline-block bg-emerald/10 text-emerald text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
            Reach Out
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-forest-text font-bold leading-[1.08] tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-sage font-body leading-relaxed max-w-xl mx-auto">
            We'd love to hear from you, whether it's about the <strong>program</strong>, an <strong>order</strong>, or how you can <strong>help</strong>.
          </p>
        </div>
      </section>

      {/* Contact Section — two columns */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — info */}
          <div className="lg:col-span-2 animate-in">
            <h2 className="font-heading text-2xl text-forest-text font-bold mb-6">Contact Info</h2>

            <div className="space-y-5 mb-10">
              {config.email && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-emerald" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-forest-text text-sm">Email</p>
                    <a href={`mailto:${config.email}`} className="text-sage font-body text-sm hover:text-emerald transition-colors">
                      {config.email}
                    </a>
                  </div>
                </div>
              )}
              {config.phone && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-emerald" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-forest-text text-sm">Phone</p>
                    <a href={`tel:${config.phone}`} className="text-sage font-body text-sm hover:text-emerald transition-colors">
                      {config.phone}
                    </a>
                  </div>
                </div>
              )}
              {config.address && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-emerald" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-forest-text text-sm">Location</p>
                    <p className="text-sage font-body text-sm">{config.address}</p>
                  </div>
                </div>
              )}
              {!config.email && !config.phone && !config.address && (
                <p className="text-sage font-body text-sm leading-relaxed bg-mint-surface rounded-xl p-5">
                  Use the form to reach us directly. We typically respond within 24 hours.
                </p>
              )}
            </div>

            {/* Mission summary */}
            <div className="bg-mint-surface rounded-2xl p-6 mb-8">
              <h3 className="font-heading text-lg text-forest-text font-bold mb-3">Our Mission</h3>
              <p className="text-sage font-body text-sm leading-relaxed">{config.mission}</p>
            </div>

            {/* Ways to support */}
            <div className="bg-white rounded-2xl p-6 border border-mint-border">
              <h3 className="font-heading text-lg text-forest-text font-bold mb-4">Ways to Support</h3>
              <ul className="space-y-3">
                {[
                  'Order our fresh baked goods',
                  'Volunteer at the bakery',
                  'Partner with us as an employer',
                  'Make a donation to fund training',
                  'Spread the word on social media',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-sage">
                    <span className="w-1.5 h-1.5 bg-orange rounded-full mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3 animate-in">
            {submitted ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-mint-border">
                <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-emerald" />
                </div>
                <h2 className="font-heading text-3xl text-forest-text font-bold mb-3">Message Sent!</h2>
                <p className="text-sage font-body leading-relaxed">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-mint-border">
                <h2 className="font-heading text-2xl text-forest-text font-bold mb-8">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                  <div className="form-field">
                    <label className="block font-body font-medium text-forest-text text-sm mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-mint-border bg-mint-bg font-body text-sm focus:outline-none"
                    />
                  </div>
                  <div className="form-field">
                    <label className="block font-body font-medium text-forest-text text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-mint-border bg-mint-bg font-body text-sm focus:outline-none"
                    />
                  </div>
                  <div className="form-field">
                    <label className="block font-body font-medium text-forest-text text-sm mb-2">Subject</label>
                    <select
                      name="subject"
                      className="w-full px-4 py-3 rounded-xl border border-mint-border bg-mint-bg font-body text-sm focus:outline-none"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="training">Training Program Info</option>
                      <option value="order">Order Question</option>
                      <option value="volunteer">Volunteering</option>
                      <option value="partnership">Employer Partnership</option>
                      <option value="donation">Donations</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="block font-body font-medium text-forest-text text-sm mb-2">Message *</label>
                    <textarea
                      name="message"
                      rows="5"
                      required
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 rounded-xl border border-mint-border bg-mint-bg font-body text-sm focus:outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full bg-emerald text-white py-3.5 rounded-xl font-body font-semibold text-sm"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
