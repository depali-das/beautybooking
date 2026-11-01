import { Sparkles, ArrowRight, Gift, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const offers = [
  {
    id: 1,
    title: 'Glow Facial Package',
    subtitle: 'Refresh Your Natural Glow',
    price: 1500,
    oldPrice: 2000,
    discount: '25% OFF',
    image: '/images/facials.jpg',
    features: ['Deep Cleansing', 'Face Massage', 'Skin Hydration'],
  },
  {
    id: 2,
    title: 'Bridal Beauty Package',
    subtitle: 'Your Special Day, Your Perfect Look',
    price: 5000,
    oldPrice: 6500,
    discount: '23% OFF',
    image: '/images/bridal-makeup.jpg',
    features: ['Professional Makeup', 'Hair Styling', 'Bridal Touch-up'],
  },
  {
    id: 3,
    title: 'Hair Care Package',
    subtitle: 'Give Your Hair Extra Love',
    price: 1800,
    oldPrice: 2400,
    discount: '25% OFF',
    image: '/images/spa-massage.jpg',
    features: ['Hair Spa', 'Hair Mask', 'Hair Styling'],
  },
]

export default function SpecialOffers() {
  const navigate = useNavigate()

  return (
    <section className="bg-white px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking- text-purple-700">
            <Gift size={17} />Special Offers
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#30213F] sm:text-4xl">Beauty Deals You Will Love</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">Enjoy our selected beauty packages and discover your favorite treatments at special prices.</p>
        </div>

        {/* Offers */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <article key={offer.id} className="group overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="relative h-60 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  width="400"
                  height="240"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.src = '/images/beauty-portrait.jpg' }}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-full bg-purple-700 px-4 py-2 text-sm font-bold text-white shadow-lg">{offer.discount}</span>
                <span className="absolute bottom-4 right-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-purple-700">Special Package</span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#30213F]">{offer.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{offer.subtitle}</p>

                <div className="mt-5 space-y-3">
                  {offer.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={17} className="text-purple-700" />{feature}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-purple-100 pt-5">
                  <div>
                    <p className="text-xs text-gray-600">Package Price</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-2xl font-bold text-purple-700">৳{offer.price.toLocaleString('en-BD')}</span>
                      <span className="text-sm text-gray-500 line-through">৳{offer.oldPrice.toLocaleString('en-BD')}</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => navigate(`/booking?package=${encodeURIComponent(offer.title)}`)} className="flex items-center gap-2 rounded-full bg-purple-700 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-800">
                    Book Now<ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 rounded-3xl bg-linear-to-r from-purple-700 to-fuchsia-600 px-6 py-10 text-center text-white sm:px-12">
          <Sparkles className="mx-auto mb-4" size={32} />
          <h3 className="text-2xl font-bold sm:text-3xl">Ready for Your Beauty Transformation?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-purple-100">Explore our beauty services and find the perfect treatment for your needs.</p>
          <button type="button" onClick={() => navigate('/services')} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-purple-700 hover:bg-purple-50">
            Explore All Services<ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}