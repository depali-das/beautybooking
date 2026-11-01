import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Fatima Akter',
    role: 'Regular Customer',
    text: 'DR Beauty Salon er service ek kothay amazing! Facial er por skin ekdom glow korche. Staff ra khub professional.',
    image: '/images/beauty-portrait.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    role: 'Bridal Customer',
    text: 'Amar biyer makeup ekhane korechi. Sobai onek prosongsha koreche. Highly recommended for bridal makeup!',
    image: '/images/bridal-makeup.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sadia Islam',
    role: 'Happy Client',
    text: 'Hair spa ar hair styling er jonno best jayga. Khub relaxing environment ar price o reasonable.',
    image: '/images/hairstyling.jpg',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="bg-[#FCF9FF] px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking- text-purple-700">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#30213F] sm:text-4xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.id} className="rounded-3xl border border-purple-50 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-1 text-yellow-400">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-400" aria-hidden="true" />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -left-2 -top-2 text-purple-100" size={30} aria-hidden="true" />
                <p className="relative text-sm leading-7 text-gray-600">{item.text}</p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  width="44"
                  height="44"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.src = '/images/beauty-portrait.jpg' }}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-[#30213F]">{item.name}</p>
                  <p className="text-xs text-gray-600">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}