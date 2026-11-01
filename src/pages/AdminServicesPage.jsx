import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  X,
  Sparkles,
  Clock,
  Search,
  Save,
  LayoutDashboard,
} from 'lucide-react'

const STORAGE_KEY = 'drBeautyServices'

const IMAGE_MAP = {
  'facial treatment': '/images/facials.jpg',
  'bridal makeup': '/images/bridal-makeup.jpg',
  'hair styling': '/images/hairstyling.jpg',
  'manicure & pedicure': '/images/manicure-pedicure.jpg',
  'manicure and pedicure': '/images/manicure-pedicure.jpg',
  'hair spa': '/images/spa-massage.jpg',
  'party makeup': '/images/party-makeup.jpg',
  'clean up': '/images/clean-up.jpg',
  'nail art': '/images/nail-art.jpg',
}

function getImageSrc(service) {
  if (service.image && service.image.startsWith('/images/')) return service.image
  if (service.image && service.image.startsWith('images/')) return `/${service.image}`
  if (service.image && service.image.startsWith('http')) return service.image
  const key = service.name?.toLowerCase().trim()
  return IMAGE_MAP[key] || '/images/beauty-portrait.jpg'
}

const defaultServices = [
  { id: 1, name: 'Facial Treatment', category: 'Skincare', price: 1200, duration: '60 Minutes', description: 'Professional facial treatment for glowing skin.', image: '/images/facials.jpg' },
  { id: 2, name: 'Bridal Makeup', category: 'Makeup', price: 5000, duration: '120 Minutes', description: 'Beautiful bridal makeup for your special day.', image: '/images/bridal-makeup.jpg' },
  { id: 3, name: 'Hair Styling', category: 'Hair Care', price: 800, duration: '45 Minutes', description: 'Professional hair styling service.', image: '/images/hairstyling.jpg' },
  { id: 4, name: 'Manicure & Pedicure', category: 'Nail Care', price: 1000, duration: '60 Minutes', description: 'Complete hand and foot care treatment.', image: '/images/manicure-pedicure.jpg' },
  { id: 5, name: 'Hair Spa', category: 'Hair Care', price: 1500, duration: '60 Minutes', description: 'Relaxing hair spa and nourishing treatment.', image: '/images/spa-massage.jpg' },
  { id: 6, name: 'Party Makeup', category: 'Makeup', price: 2500, duration: '90 Minutes', description: 'Elegant makeup for parties and events.', image: '/images/party-makeup.jpg' },
  { id: 7, name: 'Clean Up', category: 'Skincare', price: 700, duration: '40 Minutes', description: 'Refreshing skin clean-up treatment.', image: '/images/clean-up.jpg' },
  { id: 8, name: 'Nail Art', category: 'Nail Care', price: 600, duration: '45 Minutes', description: 'Creative nail art and nail decoration.', image: '/images/nail-art.jpg' },
]

const emptyForm = {
  name: '',
  category: 'Skincare',
  price: '',
  duration: '',
  description: '',
  image: '',
}

export default function AdminServicesPage() {
  const [services, setServices] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setServices(Array.isArray(parsed) ? parsed : defaultServices)
      } else {
        setServices(defaultServices)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultServices))
      }
    } catch {
      setServices(defaultServices)
    }
  }, [])

  const saveServices = (updatedServices) => {
    setServices(updatedServices)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedServices))
  }

  const openAddForm = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  const openEditForm = (service) => {
    setEditingId(service.id)
    setForm({
      name: service.name || '',
      category: service.category || 'Skincare',
      price: service.price ?? '',
      duration: service.duration || '',
      description: service.description || '',
      image: service.image || '',
    })
    setShowForm(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const serviceData = {
      ...form,
      id: editingId || Date.now(),
      price: Number(form.price),
      image: form.image || getImageSrc({ name: form.name, image: '' }),
    }
    const updatedServices = editingId !== null
      ? services.map((s) => (s.id === editingId ? serviceData : s))
      : [...services, serviceData]

    saveServices(updatedServices)
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const deleteService = (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return
    saveServices(services.filter((s) => s.id !== id))
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || service.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = ['All', ...new Set(services.map((s) => s.category))]

  return (
    <main className="min-h-screen bg-[#f8f7fc]">
      {/* Header */}
      <header className="border-b border-purple-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-700 text-white">
              <LayoutDashboard size={23} />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">DR Beauty Salon</h1>
              <p className="text-xs text-purple-700">Services Management</p>
            </div>
          </Link>
          <Link to="/admin" className="flex items-center gap-2 rounded-lg border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-50">
            <ArrowLeft size={17} />Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-medium text-purple-700">Administration</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Manage Services</h2>
            <p className="mt-2 text-gray-600">Add, edit and manage your salon services.</p>
          </div>
          <button type="button" onClick={openAddForm} className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-purple-800">
            <Plus size={20} />Add New Service
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-purple-100 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-3 text-purple-700"><Sparkles size={23} /></div>
              <div><p className="text-sm text-gray-600">Total Services</p><h3 className="text-2xl font-bold text-gray-900">{services.length}</h3></div>
            </div>
          </div>
          <div className="rounded-2xl border border-purple-100 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3 text-green-700"><Plus size={23} /></div>
              <div><p className="text-sm text-gray-600">Categories</p><h3 className="text-2xl font-bold text-gray-900">{categories.length - 1}</h3></div>
            </div>
          </div>
          <div className="rounded-2xl border border-purple-100 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-700"><Clock size={23} /></div>
              <div>
                <p className="text-sm text-gray-600">Average Price</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  ৳{services.length ? Math.round(services.reduce((t, i) => t + Number(i.price || 0), 0) / services.length) : 0}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 rounded-2xl border border-purple-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{editingId !== null ? 'Edit Service' : 'Add New Service'}</h3>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg p-2 text-gray-600 hover:bg-gray-100" aria-label="Close form"><X size={22} /></button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="service-name" className="mb-2 block text-sm font-semibold text-gray-700">Service Name *</label>
                  <input id="service-name" name="name" type="text" autoComplete="off" value={form.name} onChange={handleChange} placeholder="Example: Premium Facial" required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none placeholder:text-gray-500 focus:border-purple-500" />
                </div>
                <div>
                  <label htmlFor="service-category" className="mb-2 block text-sm font-semibold text-gray-700">Category *</label>
                  <select id="service-category" name="category" value={form.category} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500">
                    <option value="Skincare">Skincare</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Nail Care">Nail Care</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="service-price" className="mb-2 block text-sm font-semibold text-gray-700">Price (৳) *</label>
                  <input id="service-price" name="price" type="number" autoComplete="off" value={form.price} onChange={handleChange} placeholder="1200" min="0" required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none placeholder:text-gray-500 focus:border-purple-500" />
                </div>
                <div>
                  <label htmlFor="service-duration" className="mb-2 block text-sm font-semibold text-gray-700">Duration *</label>
                  <input id="service-duration" name="duration" type="text" autoComplete="off" value={form.duration} onChange={handleChange} placeholder="60 Minutes" required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none placeholder:text-gray-500 focus:border-purple-500" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="service-description" className="mb-2 block text-sm font-semibold text-gray-700">Description *</label>
                  <textarea id="service-description" name="description" autoComplete="off" value={form.description} onChange={handleChange} placeholder="Write service details..." rows={3} required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none placeholder:text-gray-500 focus:border-purple-500" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="service-image" className="mb-2 block text-sm font-semibold text-gray-700">Image URL (Optional) - Local: /images/facials.jpg</label>
                  <input id="service-image" name="image" type="text" autoComplete="off" value={form.image} onChange={handleChange} placeholder="/images/facials.jpg" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none placeholder:text-gray-500 focus:border-purple-500" />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800"><Save size={18} />{editingId !== null ? 'Update Service' : 'Save Service'}</button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm) }} className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input id="admin-search" name="q" type="search" autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search services..." className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none placeholder:text-gray-500 focus:border-purple-500" />
          </div>
          <select id="admin-category-filter" name="categoryFilter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* List */}
        {filteredServices.length === 0 ? (
          <div className="rounded-2xl border border-purple-100 bg-white px-5 py-16 text-center">
            <Sparkles size={42} className="mx-auto text-purple-300" />
            <h3 className="mt-4 text-xl font-bold text-gray-800">No Services Found</h3>
            <p className="mt-2 text-gray-600">Try another search or add a new service.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <div key={service.id} className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <img
                  src={getImageSrc(service)}
                  alt={service.name}
                  width="400"
                  height="192"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.src = '/images/beauty-portrait.jpg' }}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">{service.category}</span>
                    <span className="text-lg font-bold text-purple-700">৳{service.price}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                  <p className="mt-2 min-h-12 text-sm text-gray-600">{service.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600"><Clock size={16} className="text-purple-700" />{service.duration}</div>
                  <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
                    <button type="button" onClick={() => openEditForm(service)} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple-50 px-3 py-2.5 text-sm font-semibold text-purple-700 hover:bg-purple-100"><Pencil size={16} />Edit</button>
                    <button type="button" onClick={() => deleteService(service.id)} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100"><Trash2 size={16} />Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-gray-600">DR Beauty Salon · Services Management · Frontend Demo</p>
      </div>
    </main>
  )
}