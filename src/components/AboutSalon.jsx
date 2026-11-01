import { Sparkles, Target, Eye, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AboutSalon() {
  const navigate = useNavigate()

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-purple-100 blur-2xl opacity-70" aria-hidden="true" />
            <img
              src="/images/Beauty salon.jpg"
              alt="Beauty salon interior"
              width="600"
              height="500"
              loading="lazy"
              decoding="async"
              onError={(e) => { e.currentTarget.src = '/images/beauty-portrait.jpg' }}
              className="relative h- w-full rounded-3xl object-cover shadow-xl sm:h-"
            />
            <div className="absolute -bottom-6 right-4 max-w- rounded-2xl bg-white p-5 shadow-xl sm:right-8 sm:p-6">
              <div className="mb-2 flex items-center gap-2 text-purple-700">
                <Sparkles size={20} />
                <span className="text-sm font-semibold">Beauty & Care</span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-gray-700">Feel beautiful, confident and special every day.</p>
            </div>
          </div>

          {/* Content */}
          <div className="pt-6 lg:pt-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              <Sparkles size={16} />About DR Beauty Salon
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Your Beauty,<span className="block text-purple-700">Our Passion.</span>
            </h2>
            <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">Welcome to DR Beauty Salon. We believe beauty is about feeling confident, comfortable and happy in your own skin. Explore beauty and self-care services designed to make your experience special.</p>
            <p className="mt-4 leading-8 text-gray-600">From skincare and hair styling to special occasion makeup, our goal is to make your beauty-care journey simple, enjoyable and convenient.</p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-700 text-white"><Target size={22} /></div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">Our Mission</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">To make beauty and self-care accessible, comfortable and enjoyable.</p>
              </div>
              <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-500 text-white"><Eye size={22} /></div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">Our Vision</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">To create a welcoming beauty-care experience where everyone feels valued.</p>
              </div>
            </div>

            <button type="button" onClick={() => navigate('/about')} className="mt-8 inline-flex items-center gap-3 rounded-full bg-purple-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-purple-200 hover:bg-purple-800">
              Learn More<ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}