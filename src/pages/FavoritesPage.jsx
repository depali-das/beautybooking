import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Trash2, CalendarDays, ArrowRight, Clock } from 'lucide-react'

const STORAGE_KEY = 'drBeautyFavorites'

function getImageSrc(src) {
  if (!src) return '/images/beauty-portrait.jpg'
  // Purano save kora 'images/...' ke '/images/...' e convert
  if (src.startsWith('images/')) return `/${src}`
  if (src.startsWith('http')) return src // fallback jodi kono unsplash theke thake
  return src.startsWith('/') ? src : `/images/${src}`
}

function FavoritesPage() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
      return Array.isArray(saved) ? saved : []
    } catch { return [] }
  })

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)) }, [favorites])

  const removeFavorite = (id) => setFavorites((prev) => prev.filter((item) => item.id !== id))
  const handleBooking = (service) => navigate(`/booking?service=${encodeURIComponent(service.name)}`)

  return (
    <main className="min-h-screen bg-[#fcfaff] px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100"><Heart size={30} className="text-purple-700" /></div>
          <p className="mb-2 text-sm font-semibold uppercase tracking- text-purple-700">Your Favourite Services</p>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">My Favourites</h1>
          <p className="mt-3 text-gray-600">আপনার পছন্দের Beauty Services এখানে সংরক্ষিত থাকবে।</p>
        </div>

        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Saved Services ({favorites.length})</h2>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-3xl border border-purple-100 bg-white px-5 py-16 text-center shadow-sm">
            <Heart size={52} className="mx-auto text-purple-200" />
            <h2 className="mt-5 text-2xl font-bold text-gray-900">No Favourite Services Yet</h2>
            <p className="mt-3 text-gray-600">আপনার পছন্দের সার্ভিসগুলো এখানে Save করুন।</p>
            <Link to="/services" className="mt-7 inline-flex items-center gap-2 rounded-full bg-purple-700 px-7 py-3 font-semibold text-white hover:bg-purple-800">Explore Services<ArrowRight size={18} /></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((service) => (
              <div key={service.id} className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-56 overflow-hidden">
                  <img src={getImageSrc(service.image)} alt={service.name} width="400" height="300" decoding="async" loading="lazy" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = '/images/beauty-portrait.jpg' }} />
                  <button type="button" onClick={() => removeFavorite(service.id)} aria-label={`Remove ${service.name}`} className="absolute right-4 top-4 rounded-full bg-white p-3 text-red-500 shadow-md hover:bg-red-50"><Trash2 size={19} /></button>
                </div>
                <div className="p-5">
                  <p className="text-sm font-medium text-purple-700">{service.category}</p>
                  <h3 className="mt-2 text-xl font-bold text-gray-900">{service.name}</h3>
                  {service.description && <p className="mt-2 text-sm leading-6 text-gray-600">{service.description}</p>}
                  <p className="mt-3 flex items-center gap-2 text-sm text-gray-600"><Clock size={15} />{service.duration}</p>
                  <div className="mt-5 flex items-center justify-between gap-2">
                    <p className="text-xl font-bold text-purple-700">৳{Number(service.price).toLocaleString('en-BD')}</p>
                    <button type="button" onClick={() => handleBooking(service)} className="inline-flex items-center gap-2 rounded-full bg-purple-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-800"><CalendarDays size={16} />Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
export default FavoritesPage