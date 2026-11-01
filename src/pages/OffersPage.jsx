import { useNavigate } from 'react-router-dom'
import { Sparkles, Clock, ArrowRight, Gift, BadgePercent, Heart } from 'lucide-react'

const offers = [
  {
    id: 1,
    title: 'Glow Facial Package',
    category: 'Skincare',
    description: 'Refresh your skin with our relaxing facial treatment.',
    regularPrice: 1500, offerPrice: 1100, discount: '27% OFF', duration: '60 Minutes',
    image: '/images/facials.jpg', popular: true,
  },
  {
    id: 2,
    title: 'Bridal Beauty Package',
    category: 'Bridal',
    description: 'A special beauty package for your memorable day.',
    regularPrice: 7000, offerPrice: 5500, discount: '21% OFF', duration: '120 Minutes',
    image: '/images/bridal-makeup.jpg', popular: false,
  },
  {
    id: 3,
    title: 'Hair Spa Special',
    category: 'Hair Care',
    description: 'Give your hair a refreshing and nourishing treatment.',
    regularPrice: 2000, offerPrice: 1500, discount: '25% OFF', duration: '60 Minutes',
    image: '/images/hair-spa.jpg', popular: false,
  },
  {
    id: 4,
    title: 'Party Makeup Deal',
    category: 'Makeup',
    description: 'Get ready for your special event with a beautiful look.',
    regularPrice: 3500, offerPrice: 2800, discount: '20% OFF', duration: '90 Minutes',
    image: '/images/party-makeup.jpg', popular: true,
  },
  {
    id: 5,
    title: 'Manicure & Pedicure',
    category: 'Nail Care',
    description: 'Enjoy a complete hand and foot care experience.',
    regularPrice: 1400, offerPrice: 1000, discount: '29% OFF', duration: '60 Minutes',
    image: '/images/manicure-pedicure.jpg', popular: false,
  },
  {
    id: 6,
    title: 'Complete Clean Up',
    category: 'Skincare',
    description: 'A refreshing clean up session for healthy-looking skin.',
    regularPrice: 1000, offerPrice: 750, discount: '25% OFF', duration: '40 Minutes',
    image: '/images/facials.jpg', popular: false,
  },
]

function OffersPage() {
  const navigate = useNavigate()
  return (
    <main className="min-h-screen bg-purple-50/50">
      <section className="relative overflow-hidden bg-linear-to-r from-purple-950 via-purple-800 to-purple-600 px-5 py-16 text-white sm:py-24">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-pink-300/10 blur-2xl" />
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15"><Gift size={30} /></div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-200">Special Offers</p>
          <h1 className="text-3xl font-bold sm:text-5xl">Beauty Deals You'll Love</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white sm:text-base">Explore our special beauty packages and enjoy selected services at sample promotional prices.</p>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold"><BadgePercent size={20} />Special demo discounts</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-700">Limited Collection</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Our Special Packages</h2>
            <p className="mt-2 text-sm text-gray-600">Choose a package and book your preferred service.</p>
          </div>
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">{offers.length} Offers</span>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <article key={offer.id} className="group overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-56 overflow-hidden">
                <img src={offer.image} alt={offer.title} width="600" height="400" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" onError={(e) => { e.currentTarget.src = '/images/beauty-portrait.jpg' }} />
                <span className="absolute left-4 top-4 rounded-full bg-purple-700 px-4 py-2 text-xs font-bold text-white shadow">{offer.discount}</span>
                {offer.popular && <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-bold text-purple-700"><Heart size={13} />Popular</span>}
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">{offer.category}</p>
                <h3 className="mt-2 text-xl font-bold text-gray-900">{offer.title}</h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-gray-600">{offer.description}</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-2xl font-bold text-purple-700">৳{offer.offerPrice.toLocaleString('en-BD')}</span>
                  <span className="text-sm text-gray-500 line-through">৳{offer.regularPrice.toLocaleString('en-BD')}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600"><Clock size={16} className="text-purple-700" />{offer.duration}</div>
                <button onClick={() => navigate(`/booking?service=${encodeURIComponent(offer.title)}`)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white transition hover:bg-purple-800">Book This Offer<ArrowRight size={18} /></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-linear-to-r from-pink-100 to-purple-100 p-8 text-center sm:p-12">
          <Sparkles className="mx-auto text-purple-700" size={32} />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Ready for Your Beauty Experience?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">Explore our complete service collection and choose the treatment you love.</p>
          <button onClick={() => navigate('/services')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800">Explore All Services<ArrowRight size={18} /></button>
        </div>
      </section>

      <p className="mx-auto max-w-4xl px-5 pb-8 text-center text-xs leading-5 text-gray-500">All prices and promotional offers shown here are sample demo content.</p>
    </main>
  )
}
export default OffersPage