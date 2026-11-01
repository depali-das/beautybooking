import { Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const services = [
  {
    id: 1,
    name: 'Facial Treatment',
    category: 'Skin Care',
    price: 1200,
    duration: '60 Minutes',
    image: '/images/facials.jpg',
  },
  {
    id: 2,
    name: 'Hair Styling',
    category: 'Hair Care',
    price: 800,
    duration: '45 Minutes',
    image: '/images/hairstyling.jpg',
  },
  {
    id: 3,
    name: 'Bridal Makeup',
    category: 'Makeup',
    price: 5000,
    duration: '120 Minutes',
    image: '/images/bridal-makeup.jpg',
  },
  {
    id: 4,
    name: 'Manicure & Pedicure',
    category: 'Nail Care',
    price: 1000,
    duration: '60 Minutes',
    image: '/images/manicure-pedicure.jpg',
  },
]

export default function PopularBeautyServices() {
  const navigate = useNavigate()

  return (
    <section className="bg-[#FCF9FF] px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking- text-purple-700">
            Our Popular Services
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#30213F] sm:text-4xl">
            Beauty & Care Services
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Discover our most loved beauty treatments and enjoy a relaxing salon experience.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = '/images/beauty-portrait.jpg'
                  }}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-purple-700">
                  {service.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-[#30213F]">
                  {service.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} aria-hidden="true" />
                  {service.duration}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Starting from</p>
                    <p className="text-xl font-bold text-purple-700">
                      ৳{service.price.toLocaleString('en-BD')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/booking?service=${encodeURIComponent(service.name)}`)
                    }
                    className="flex items-center gap-2 rounded-full bg-purple-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
                  >
                    Book <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 rounded-full border border-purple-700 px-7 py-3 font-semibold text-purple-800 transition hover:bg-purple-700 hover:text-white"
          >
            View All Services <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}