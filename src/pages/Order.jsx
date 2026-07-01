import { useState } from 'react'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import config, { products, formatPrice } from '../config'

export default function Order() {
  useScrollAnimation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    items: {},
    pickup: 'pickup',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const updateItem = (id, qty) => {
    setFormData((prev) => ({
      ...prev,
      items: { ...prev.items, [id]: Math.max(0, qty) },
    }))
  }

  const totalItems = Object.values(formData.items).reduce((sum, qty) => sum + qty, 0)
  const totalPrice = products.reduce(
    (sum, p) => sum + (formData.items[p.id] || 0) * p.price,
    0
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (config.formspree_id) {
      const form = e.target
      fetch(`https://formspree.io/f/${config.formspree_id}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      }).then(() => setSubmitted(true))
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="text-center max-w-[500px] animate-in visible">
          <div className="w-20 h-20 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} className="text-emerald" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-forest-text font-bold mb-4">Order Received!</h1>
          <p className="text-sage font-body text-lg leading-relaxed">
            Thank you for supporting our mission! We'll be in touch shortly to confirm your order.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 bg-mint-bg">
        <div className="max-w-[1280px] mx-auto text-center animate-in">
          <span className="inline-block bg-orange/10 text-orange text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
            Support The Mission
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-forest-text font-bold leading-[1.08] tracking-tight">
            Place an Order
          </h1>
          <p className="mt-4 text-lg text-sage font-body leading-relaxed max-w-xl mx-auto">
            All proceeds from our baked goods directly support the training program.
          </p>
        </div>
      </section>

      {/* Menu + Order Form */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1280px] mx-auto">
          {/* Menu grid */}
          <div className="animate-in mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl text-forest-text font-bold mb-8">Our Menu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
              {products.map((product) => (
                <div key={product.id} className="product-card bg-white rounded-2xl overflow-hidden border border-mint-border card-hover animate-in">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg text-forest-text font-bold mb-1">{product.name}</h3>
                    <p className="text-sage font-body text-sm leading-relaxed mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-emerald font-heading font-bold text-lg">{formatPrice(product.price)}</p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateItem(product.id, (formData.items[product.id] || 0) - 1)}
                          className="qty-btn w-8 h-8 rounded-full bg-forest-text/5 flex items-center justify-center font-body font-bold text-forest-text hover:bg-forest-text/10 text-sm"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-body font-bold text-sm">{formData.items[product.id] || 0}</span>
                        <button
                          type="button"
                          onClick={() => updateItem(product.id, (formData.items[product.id] || 0) + 1)}
                          className="qty-btn w-8 h-8 rounded-full bg-emerald/10 flex items-center justify-center font-body font-bold text-emerald hover:bg-emerald/20 text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form + Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 border border-mint-border">
                <h2 className="font-heading text-2xl text-forest-text font-bold mb-8">Your Details</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-field">
                      <label className="block font-body font-medium text-forest-text text-sm mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-mint-border bg-mint-bg font-body text-sm focus:outline-none"
                      />
                    </div>
                    <div className="form-field">
                      <label className="block font-body font-medium text-forest-text text-sm mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-mint-border bg-mint-bg font-body text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="block font-body font-medium text-forest-text text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-mint-border bg-mint-bg font-body text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-body font-medium text-forest-text text-sm mb-3">Pickup or Delivery?</label>
                    <div className="flex gap-4">
                      {['pickup', 'delivery'].map((option) => (
                        <label key={option} className={`flex items-center gap-2 px-5 py-3 rounded-xl border cursor-pointer transition-colors ${
                          formData.pickup === option ? 'border-emerald bg-emerald/5 text-emerald' : 'border-mint-border text-sage'
                        }`}>
                          <input
                            type="radio"
                            name="fulfillment"
                            value={option}
                            checked={formData.pickup === option}
                            onChange={() => setFormData({ ...formData, pickup: option })}
                            className="sr-only"
                          />
                          <span className="font-body font-medium capitalize text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="block font-body font-medium text-forest-text text-sm mb-2">Special Instructions</label>
                    <textarea
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Allergies, dietary needs, preferred pickup time..."
                      className="w-full px-4 py-3 rounded-xl border border-mint-border bg-mint-bg font-body text-sm focus:outline-none resize-none"
                    />
                  </div>

                  {/* Hidden fields for form data */}
                  {products.map((product) => (
                    <input key={product.id} type="hidden" name={`item_${product.id}`} value={formData.items[product.id] || 0} />
                  ))}

                  <button
                    type="submit"
                    className="btn-primary w-full bg-emerald text-white py-3.5 rounded-xl font-body font-semibold text-sm"
                  >
                    Submit Order Request
                  </button>
                </form>
              </div>
            </div>

            {/* Sticky order summary */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 bg-white rounded-2xl p-6 border border-mint-border">
                <div className="flex items-center gap-3 mb-6">
                  <ShoppingBag size={20} className="text-emerald" />
                  <h3 className="font-heading text-lg text-forest-text font-bold">Order Summary</h3>
                </div>

                {totalItems === 0 ? (
                  <p className="text-sage font-body text-sm py-4 text-center">
                    Select items from the menu above
                  </p>
                ) : (
                  <div className="space-y-3">
                    {products.filter((p) => formData.items[p.id] > 0).map((product) => (
                      <div key={product.id} className="flex items-center justify-between py-2 border-b border-mint-border last:border-0">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="font-body font-medium text-forest-text text-sm">{product.name}</p>
                            <p className="text-sage text-xs font-body">x{formData.items[product.id]}</p>
                          </div>
                        </div>
                        <p className="font-body font-semibold text-forest-text text-sm">
                          {formatPrice(product.price * formData.items[product.id])}
                        </p>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-emerald/10 flex items-center justify-between">
                      <p className="font-body font-bold text-forest-text">Total</p>
                      <p className="font-heading font-bold text-emerald text-xl">{formatPrice(totalPrice)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
