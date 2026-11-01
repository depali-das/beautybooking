import { Sparkles, Scissors, Hand, Flower2, Brush, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const categories = [
  { name: 'Facial & Skincare', description: 'Glow with healthy skin', icon: Sparkles, image: '/images/facials.jpg' },
  { name: 'Hair Care', description: 'Beautiful hair treatments', icon: Scissors, image: '/images/spa-massage.jpg' },
  { name: 'Manicure & Pedicure', description: 'Care for hands and feet', icon: Hand, image: '/images/manicure-pedicure.jpg' },
  { name: 'Bridal Makeup', description: 'Your special day beauty', icon: Brush, image: '/images/bridal-makeup.jpg' },
  { name: 'Spa & Massage', description: 'Relax and refresh yourself', icon: Flower2, image: '/images/spa-massage.jpg' },
  { name: 'Waxing & Beauty', description: 'Feel fresh and confident', icon: Heart, image: '/images/waxing-beauty.jpg' },
]

export default function ServiceCategories() {
  const navigate = useNavigate()

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-purple-700">Explore Categories</span>
          <h2 className="font-display mt-3 text-3xl font-bold text-[#30213F] sm:text-4xl lg:text-5xl">Beauty Services for Every You</h2>
          <p className="mt-4 leading-7 text-gray-600">Discover your favourite beauty treatments and enjoy a little self-care whenever you need it.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <article key={category.name} className="group overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    width="400"
                    height="224"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.src = '/images/beauty-portrait.jpg' }}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 rounded-2xl bg-white/95 p-3 shadow">
                    <Icon size={22} className="text-purple-700" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#30213F]">{category.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{category.description}</p>
                  <button type="button" onClick={() => navigate('/services')} className="mt-5 text-sm font-semibold text-purple-700 hover:text-purple-900">Explore Services →</button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}