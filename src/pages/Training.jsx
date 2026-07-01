import { Link } from 'react-router-dom'
import { ShieldCheck, Users, Utensils, HandHeart, BadgeCheck, MessageCircle, ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const phases = [
  { phase: 'Phase 1', title: 'Orientation & Assessment', duration: '2 weeks', desc: 'Participants are assessed on their current skill levels, learning styles, and goals. Individualized training plans are developed.' },
  { phase: 'Phase 2', title: 'Foundation Skills', duration: '4 weeks', desc: 'Core training in food safety, kitchen hygiene, basic baking techniques, and workplace expectations. Emphasis on routine and structure.' },
  { phase: 'Phase 3', title: 'Advanced Training & Certification', duration: '6 weeks', desc: 'Advanced baking skills, customer interaction practice, time management, and industry certification preparation and testing.' },
  { phase: 'Phase 4', title: 'Job Placement & Support', duration: 'Ongoing', desc: 'Graduates are connected with employer partners. Ongoing coaching and check-ins ensure long-term workplace success.' },
]

const skills = [
  { icon: Utensils, title: 'Food Handling & Safety' },
  { icon: Users, title: 'Customer Service' },
  { icon: ShieldCheck, title: 'Workplace Behavior' },
  { icon: HandHeart, title: 'Social Skills' },
  { icon: BadgeCheck, title: 'Time Management' },
  { icon: MessageCircle, title: 'Communication' },
]

export default function Training() {
  useScrollAnimation()

  return (
    <>
      {/* Hero — split layout */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 bg-mint-bg">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-in">
            <span className="inline-block bg-emerald/10 text-emerald text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              Our Program
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-forest-text font-bold leading-[1.08] tracking-tight">
              Training Program
            </h1>
            <p className="mt-6 text-lg text-sage font-body leading-relaxed max-w-[520px]">
              A <strong>structured, research-backed</strong> path from training to <strong>competitive employment</strong> for individuals with IDD/ASD.
            </p>
          </div>
          <div className="animate-in" style={{ transitionDelay: '0.2s' }}>
            <img
              src="/assets/training_program.png"
              alt="Training program at Nanny Annie's Bakery"
              className="w-full rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-28 md:py-36 px-6 texture-bg">
        <div className="max-w-[860px] mx-auto relative z-10 animate-in">
          <div className="text-center">
            <span className="inline-block bg-orange/10 text-orange text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              Eligibility
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-forest-text font-bold">Who It's For</h2>
            <p className="mt-6 text-sage font-body text-lg leading-relaxed max-w-2xl mx-auto">
              Our program is designed for individuals with <strong>intellectual and developmental
              disabilities (IDD)</strong> and <strong>autism spectrum disorder (ASD)</strong> who want to develop
              job skills and enter competitive employment.
            </p>
          </div>
          <div className="mt-10 bg-white rounded-2xl p-8 border border-mint-border">
            <ul className="space-y-4">
              {[
                'Adults with IDD/ASD seeking meaningful employment',
                'Individuals transitioning from school to the workforce',
                'Those looking to build confidence and independence',
                'Families seeking structured vocational training for a loved one',
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

      {/* Skills Taught */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center animate-in">
            <span className="inline-block bg-emerald/10 text-emerald text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              Curriculum
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-forest-text font-bold">Skills You'll Learn</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 stagger-children">
            {skills.map(({ icon: Icon, title }) => (
              <div key={title} className="bg-white rounded-xl p-6 text-center border border-mint-border hover:border-emerald/20 transition-colors duration-200 animate-in">
                <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-emerald" />
                </div>
                <h3 className="font-heading text-base sm:text-lg text-forest-text font-bold">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Timeline — alternating layout */}
      <section className="py-28 md:py-36 px-6 texture-bg">
        <div className="max-w-[960px] mx-auto relative z-10">
          <div className="text-center animate-in">
            <span className="inline-block bg-orange/10 text-orange text-xs font-semibold font-body px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              The Journey
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-forest-text font-bold">Program Structure</h2>
          </div>
          <div className="mt-16 relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-emerald/20" />

            <div className="space-y-12">
              {phases.map(({ phase, title, duration, desc }, i) => (
                <div key={phase} className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 animate-in ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 w-3 h-3 bg-emerald rounded-full ring-4 ring-mint-bg z-10" />

                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-32px)] ${i % 2 === 0 ? 'md:pr-0' : 'md:pl-0'}`}>
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-mint-border hover:shadow-lg transition-shadow duration-300">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-emerald text-white font-body font-bold text-xs px-3 py-1 rounded-full">
                          {phase}
                        </span>
                        <span className="bg-orange/10 text-orange font-body font-medium text-xs px-3 py-1 rounded-full">
                          {duration}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl text-forest-text font-bold mb-2">{title}</h3>
                      <p className="text-sage font-body text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-32px)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-[720px] mx-auto text-center animate-in">
          <div className="w-20 h-20 bg-emerald/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <BadgeCheck size={40} className="text-emerald" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl text-forest-text font-bold">Earn Your Certification</h2>
          <p className="mt-6 text-sage font-body text-lg leading-relaxed">
            Upon completing the program, graduates receive <strong>industry-recognized food handling
            and workplace readiness certifications</strong>. These credentials are recognized by
            employers across the food service industry and beyond.
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center gap-2 bg-emerald text-white px-8 py-3.5 rounded-full text-sm font-semibold font-body mt-10"
          >
            Apply to the Program <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-36 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/about_team.png)' }}
        />
        <div className="absolute inset-0 bg-charcoal/80" />
        <div className="relative z-10 max-w-[720px] mx-auto text-center animate-in">
          <h2 className="font-heading text-4xl sm:text-5xl text-white font-bold leading-[1.1]">
            Ready to Get Started?
          </h2>
          <p className="mt-6 text-lg text-white/80 font-body leading-relaxed">
            Contact us to learn more about enrollment, eligibility, and how the program works.
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-block bg-orange text-white px-10 py-4 rounded-full text-sm font-semibold font-body mt-10"
          >
            Contact Us to Learn More
          </Link>
        </div>
      </section>
    </>
  )
}
