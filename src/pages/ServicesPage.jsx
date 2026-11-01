import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Sparkles, Clock, ArrowRight, Heart } from 'lucide-react'

const services = [
  { id: 1, name: 'Facial Treatment', category: 'Skincare', price: 1200, duration: '60 Minutes', description: 'Refresh your skin with a relaxing facial treatment.', image: '/images/facials.jpg' },
  { id: 2, name: 'Bridal Makeup', category: 'Makeup', price: 5000, duration: '120 Minutes', description: 'A beautiful makeup experience for your special day.', image: '/images/bridal-makeup.jpg' },
  { id: 3, name: 'Hair Styling', category: 'Hair Care', price: 800, duration: '45 Minutes', description: 'Give your hair a fresh and beautiful new look.', image: '/images/hairstyling.jpg' },
  { id: 4, name: 'Manicure & Pedicure', category: 'Nail Care', price: 1000, duration: '60 Minutes', description: 'Enjoy complete nail care for your hands and feet.', image: '/images/manicure-pedicure.jpg' },
  { id: 5, name: 'Hair Spa', category: 'Hair Care', price: 1500, duration: '60 Minutes', description: 'Relax and give your hair some extra care.', image: '/images/hairstyling.jpg' },
  { id: 6, name: 'Party Makeup', category: 'Makeup', price: 2500, duration: '90 Minutes', description: 'Get ready for parties and special occasions.', image: '/images/party-makeup.jpg' },
  { id: 7, name: 'Clean Up', category: 'Skincare', price: 700, duration: '40 Minutes', description: 'A simple skincare session for a fresh appearance.', image: '/images/facials.jpg' },
  { id: 8, name: 'Nail Art', category: 'Nail Care', price: 600, duration: '45 Minutes', description: 'Add a creative touch to your nails.', image: '/images/manicure-pedicure.jpg' },
]

const categories = ['All Services', 'Skincare', 'Makeup', 'Hair Care', 'Nail Care']

function ServicesPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All Services')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('drBeautyFavorites')) || [] } catch { return [] }
  })

  useEffect(() => { localStorage.setItem('drBeautyFavorites', JSON.stringify(favorites)) }, [favorites])

  const toggleFavorite = (service) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === service.id)
      return exists ? prev.filter((item) => item.id !== service.id) : [...prev, service]
    })
  }
  const isFavorite = (id) => favorites.some((item) => item.id === id)

  const filteredServices = services.filter((service) => {
    const matchesCategory = activeCategory === 'All Services' || service.category === activeCategory
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) || service.description.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="bg-white min-h-screen">
      <section className="bg-linear-to-br from-purple-100 via-pink-50 to-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
            <Sparkles size={16} /> DR Beauty Salon
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">Our Beauty <span className="text-purple-700">Services</span></h1>
          <p className="mt-5 max-w-2xl mx-auto text-gray-600 leading-7">Explore our beauty and self-care services. Find the right treatment for your beauty needs.</p>
          <button onClick={() => navigate('/booking')} className="mt-8 inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-7 py-3.5 rounded-full font-semibold transition">Book Appointment <ArrowRight size={18} /></button>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input id="services-search" name="q" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search beauty services..." autoComplete="off" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-gray-900 placeholder:text-gray-500" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${activeCategory === category ? 'bg-purple-700 text-white shadow-lg' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}`}>{category}</button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Explore Our Services</h2>
            <span className="text-sm text-gray-600">{filteredServices.length} Services</span>
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <div key={service.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative overflow-hidden h-56">
                    <img src={service.image} alt={service.name} width="400" height="300" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.currentTarget.src = '/images/beauty-portrait.jpg' }} />
                    <span className="absolute top-4 left-4 bg-white/95 text-purple-700 px-3 py-1.5 rounded-full text-xs font-semibold">{service.category}</span>
                    <button type="button" onClick={() => toggleFavorite(service)} aria-label={isFavorite(service.id) ? 'Remove from favourites' : 'Add to favourites'} className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md hover:scale-110 transition">
                      <Heart size={21} className={isFavorite(service.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-6 min-h-12">{service.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-purple-700">৳{service.price.toLocaleString('en-BD')}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-600"><Clock size={14} />{service.duration}</span>
                    </div>
                    <button onClick={() => navigate(`/booking?service=${encodeURIComponent(service.name)}`)} className="w-full mt-5 flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl font-semibold transition">Book Now <ArrowRight size={17} /></button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-purple-50 rounded-2xl">
              <Search size={35} className="mx-auto text-purple-400" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">No Services Found</h3>
              <p className="mt-2 text-gray-600">Try another search or category.</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All Services') }} className="mt-5 text-purple-700 font-semibold hover:underline">Clear Filters</button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default ServicesPage