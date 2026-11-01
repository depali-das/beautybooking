import { useNavigate } from 'react-router-dom'
import { Sparkles, Heart, ShieldCheck, Star, ArrowRight, Award, Users, Clock } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Customer Care', description: 'We believe every customer deserves friendly attention and a comfortable beauty experience.' },
  { icon: ShieldCheck, title: 'Quality & Care', description: 'We aim to provide thoughtful beauty services with attention to cleanliness and quality.' },
  { icon: Sparkles, title: 'Beauty & Confidence', description: 'Our goal is to help every woman feel confident, refreshed and beautiful.' },
]

const highlights = [
  { icon: Users, number: 'Customer First', label: 'Our approach' },
  { icon: Award, number: 'Quality Care', label: 'Our commitment' },
  { icon: Clock, number: 'Personal Care', label: 'Our service style' },
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <main className="w-full bg-white">
      {/* Hero - FIXED: bg-gradient-to-br */}
      <section className="relative w-full overflow-hidden bg-linear-to-br from-purple-950 via-purple-800 to-purple-600 px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-pink-300/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-5xl text-center">
          <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium">
            <Sparkles size={16} aria-hidden="true" />About DR Beauty Salon
          </span>
          <h1 className="mt-7 text-4xl font-bold leading-tight sm:text-6xl">
            Beauty, Confidence<span className="block text-pink-200">& Self-Care</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-purple-100 sm:text-base">
            A beauty salon website concept designed to make discovering beauty services and requesting appointments simple and convenient.
          </p>
          <button type="button" onClick={() => navigate('/services')} className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[14px] font-semibold text-purple-800 transition hover:bg-pink-100">
            Explore Our Services<ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:px-8 sm:py-8 lg:py-24 lg:grid-cols-2">
        <div className="relative w-full">
          <img
            src="/images/about-salon.jpg"
            alt="Modern beauty salon interior"
            width="600"
            height="480"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/hero-woman.jpg' }}
            className="h-95 w-full rounded-3xl object-cover shadow-xl sm:h-120 lg:h-130"
          />
          <div className="absolute -bottom-6 right-4 max-w-65 rounded-2xl bg-white p-5 shadow-xl sm:right-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-primary"><Star size={25} aria-hidden="true" /></div>
              <div>
                <p className="text-[14px] font-bold text-gray-900">Beauty & Care</p>
                <p className="text-xs text-gray-600">Our philosophy</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full pt-4 lg:pt-0">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Who We Are</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">A Little Care Can Make You Feel Beautiful</h2>
          <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">DR Beauty Salon is presented as a modern women&apos;s beauty salon concept. Our website brings beauty services, special packages and appointment requests together in one convenient place.</p>
          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">We believe beauty is personal. Every customer should feel comfortable exploring services and choosing what suits her needs.</p>
          <button type="button" onClick={() => navigate('/booking')} className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-purple-800">
            Book an Appointment<ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Highlights */}
      <section className="w-full bg-purple-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-5 sm:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="rounded-2xl bg-white p-7 text-center shadow-sm">
                <Icon className="mx-auto text-primary" size={30} aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold text-gray-900">{item.number}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Mission and Vision - FIXED: bg-gradient-to-br */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-12 w-full text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Our Purpose</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Mission & Vision</h2>
        </div>
        <div className="grid w-full gap-7 md:grid-cols-2">
          <div className="rounded-3xl bg-linear-to-br from-purple-800 to-purple-600 p-8 text-white sm:p-10">
            <Heart size={34} aria-hidden="true" />
            <h3 className="mt-6 text-2xl font-bold">Our Mission</h3>
            <p className="mt-4 text-sm leading-7 text-purple-100">To create a welcoming beauty experience where customers can easily discover services, explore options and request appointments.</p>
          </div>
          <div className="rounded-3xl border border-purple-100 bg-purple-50 p-8 sm:p-10">
            <Sparkles size={34} className="text-primary" aria-hidden="true" />
            <h3 className="mt-6 text-2xl font-bold text-gray-900">Our Vision</h3>
            <p className="mt-4 text-sm leading-7 text-gray-600">To build a trusted and convenient beauty service experience focused on customer comfort, care and confidence.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-12 w-full text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">What Matters To Us</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Our Core Values</h2>
          </div>
          <div className="grid w-full gap-7 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="rounded-3xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-primary"><Icon size={30} aria-hidden="true" /></div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA - FIXED: bg-gradient-to-r */}
      <section className="w-full px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl rounded-3xl bg-linear-to-r from-purple-900 to-purple-700 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <Sparkles className="mx-auto text-pink-200" size={34} aria-hidden="true" />
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Let&apos;s Make Time for You</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-purple-100">Explore our beauty services and choose an appointment that works for you.</p>
          <button type="button" onClick={() => navigate('/booking')} className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[14px] font-semibold text-purple-800 transition hover:bg-pink-100">
            Book Your Appointment<ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </section>

      <p className="mx-auto w-full max-w-4xl px-4 pb-8 text-center text-xs leading-5 text-gray-600 sm:px-6 lg:px-8">
        This is sample website content. Add the salon&apos;s verified history, team information, location and business details before publishing.
      </p>
    </main>
  )
}
