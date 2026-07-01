import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function About() {
  useScrollAnimation()

  return (
    <>
      {/* Hero — split layout */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 bg-mint-bg">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-in">
            <span className="inline-block bg-emerald/10 text-emerald text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              About Us
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-forest-text font-bold leading-[1.08] tracking-tight">
              Our Story
            </h1>
            <p className="mt-6 text-lg text-sage font-body leading-relaxed max-w-[520px]">
              The heart behind every loaf and the mission that drives everything we do.
            </p>
          </div>
          <div className="animate-in" style={{ transitionDelay: '0.2s' }}>
            <img
              src="/assets/about_team.png"
              alt="The Nanny Annie's Bakery team"
              className="w-full rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Founder Section — two-column */}
      <section className="py-28 md:py-36 px-6 texture-bg">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <div className="animate-in">
            <img
              src="/assets/anne-baking.jpg"
              alt="Anne Malbica working with a trainee in the bakery"
              className="rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] w-full object-cover aspect-[3/4] max-h-[560px]"
            />
          </div>
          <div className="animate-in">
            <span className="inline-block bg-orange/10 text-orange text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              The Founder
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-forest-text font-bold">Meet Dr. Anne Malbica</h2>
            <p className="mt-6 text-sage font-body leading-relaxed">
              With a <strong>PhD in behavior analysis</strong> and years of working alongside individuals with
              intellectual and developmental disabilities, Dr. Anne saw a critical gap: people
              who wanted to work but couldn't access the <strong>training they needed to succeed</strong>.
            </p>
            <p className="mt-4 text-sage font-body leading-relaxed">
              As a <strong>Board Certified Behavior Analyst (BCBA)</strong> and <strong>Licensed Behavior Analyst (LBA)</strong>,
              she designed a research-backed training program that uses the structure and warmth
              of a bakery to teach <strong>real, transferable job skills</strong>.
            </p>
            <div className="mt-8 bg-white rounded-xl p-6 border-l-4 border-emerald">
              <p className="text-forest-text font-body italic leading-relaxed">
                "I believe everyone deserves the dignity of meaningful work."
              </p>
              <p className="mt-3 text-sm text-sage font-body font-medium">Dr. Anne Malbica, PhD, BCBA, LBA</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem — icon-driven stat block */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 animate-in">
            <span className="inline-block bg-emerald/10 text-emerald text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              The Challenge
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-forest-text font-bold">The Problem We Solve</h2>
            <p className="mt-6 text-sage font-body leading-relaxed">
              Individuals with IDD and ASD face <strong>significant barriers to employment</strong>.
              Despite their desire and ability to work, many lack access to structured
              training programs that prepare them for competitive workplaces.
            </p>
            <p className="mt-4 text-sage font-body leading-relaxed">
              Traditional job programs often fall short. They don't provide <strong>hands-on experience,
              industry certifications, or the behavioral support</strong> that leads to lasting success.
            </p>
            <div className="mt-8 bg-emerald-dark rounded-2xl p-8 text-center">
              <p className="text-5xl font-heading font-bold text-white">80%</p>
              <p className="text-white/80 font-body mt-2">of adults with IDD are unemployed or underemployed</p>
              <p className="text-orange-light font-body font-semibold text-sm mt-2">We're changing that.</p>
            </div>
          </div>
          <div className="order-1 lg:order-2 animate-in">
            <img
              src="/assets/trainee-volunteer.jpg"
              alt="A bakery trainee proudly standing in the kitchen"
              className="rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] w-full"
            />
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-28 md:py-36 px-6 texture-bg">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <div className="animate-in">
            <img
              src="/assets/trainee-volunteer.jpg"
              alt="Bakery trainee in the kitchen"
              className="rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] w-full"
            />
          </div>
          <div className="animate-in">
            <span className="inline-block bg-orange/10 text-orange text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              What We Do
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-forest-text font-bold">Our Solution</h2>
            <p className="mt-6 text-sage font-body leading-relaxed">
              Nanny Annie's Bakery is more than a bakery. It's a <strong>training ground</strong>.
              Our program combines <strong>applied behavior analysis</strong> with real-world baking
              experience to teach participants the hard and soft skills employers need.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Structured, research-backed curriculum',
                'Hands-on training in a real bakery environment',
                'Industry-recognized food handling certifications',
                'Workplace behavior and social skills coaching',
                'Job placement support and employer partnerships',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-forest-text">
                  <span className="w-5 h-5 bg-emerald/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <span className="w-1.5 h-1.5 bg-emerald rounded-full" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-36 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/hero_bg.png)' }}
        />
        <div className="absolute inset-0 bg-emerald-dark/80" />
        <div className="relative z-10 max-w-[720px] mx-auto text-center animate-in">
          <h2 className="font-heading text-4xl sm:text-5xl text-white font-bold leading-[1.1]">
            Be Part of the Story
          </h2>
          <p className="mt-6 text-lg text-white/80 font-body leading-relaxed">
            Whether you order our baked goods, volunteer your time, or partner with us as
            an employer, you're helping someone <strong>build a brighter future</strong>.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/training"
              className="btn-primary bg-orange text-white px-10 py-4 rounded-full text-sm font-semibold font-body inline-flex items-center justify-center gap-2"
            >
              Explore the Program <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="btn-primary bg-white/10 backdrop-blur text-white border border-white/20 px-10 py-4 rounded-full text-sm font-semibold font-body hover:bg-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
