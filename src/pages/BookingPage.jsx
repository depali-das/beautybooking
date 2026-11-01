import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CalendarDays, Clock, User, Phone, Mail, Sparkles, CheckCircle } from 'lucide-react'

const STORAGE_KEY = 'drBeautyAppointments'
const timeSlots = ['09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM']

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const preselectedService = searchParams.get('service') || searchParams.get('package') || ''
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: preselectedService, date: '', time: '', notes: '' })
  const [success, setSuccess] = useState(false)

  useEffect(() => { if (preselectedService) setFormData((p) => ({ ...p, service: preselectedService })) }, [preselectedService])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAppointment = { id: Date.now(), ...formData, status: 'Pending', createdAt: new Date().toISOString() }
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      const updated = Array.isArray(saved) ? [...saved, newAppointment] : [newAppointment]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newAppointment]))
    }
    setSuccess(true)
    setTimeout(() => navigate('/appointments'), 1500)
  }

  return (
    <main className="min-h-screen bg-[#f8f7fc] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
            <CalendarDays size={28} />
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">DR Beauty Salon</p>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Book an Appointment</h1>
          <p className="mt-3 text-gray-600">Choose your service and preferred time.</p>
        </div>
        <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">
          {success ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600"><CheckCircle size={32} /></div>
              <h2 className="text-xl font-bold text-gray-900">Appointment Booked!</h2>
              <p className="mt-2 text-sm text-gray-600">Redirecting to your appointments...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-name" className="mb-2 block text-sm font-semibold text-gray-700">Full Name *</label>
                  <div className="relative"><User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" /><input id="booking-name" name="name" type="text" autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-500 focus:border-purple-500" /></div>
                </div>
                <div>
                  <label htmlFor="booking-phone" className="mb-2 block text-sm font-semibold text-gray-700">Phone Number *</label>
                  <div className="relative"><Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" /><input id="booking-phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={handleChange} placeholder="Your phone number" required className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-500 focus:border-purple-500" /></div>
                </div>
              </div>
              <div><label htmlFor="booking-email" className="mb-2 block text-sm font-semibold text-gray-700">Email (Optional)</label><div className="relative"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" /><input id="booking-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-500 focus:border-purple-500" /></div></div>
              <div><label htmlFor="booking-service" className="mb-2 block text-sm font-semibold text-gray-700">Service *</label><input id="booking-service" name="service" type="text" autoComplete="off" value={formData.service} onChange={handleChange} placeholder="Ex: Facial Treatment" required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-500 focus:border-purple-500" /></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label htmlFor="booking-date" className="mb-2 block text-sm font-semibold text-gray-700">Date *</label><div className="relative"><CalendarDays size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" /><input id="booking-date" name="date" type="date" value={formData.date} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none focus:border-purple-500" /></div></div>
                <div><label htmlFor="booking-time" className="mb-2 block text-sm font-semibold text-gray-700">Time *</label><div className="relative"><Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" /><select id="booking-time" name="time" value={formData.time} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none focus:border-purple-500"><option value="">Select time</option>{timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}</select></div></div>
              </div>
              <div><label htmlFor="booking-notes" className="mb-2 block text-sm font-semibold text-gray-700">Additional Notes</label><textarea id="booking-notes" name="notes" autoComplete="off" value={formData.notes} onChange={handleChange} rows={3} placeholder="Any special request..." className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-500 focus:border-purple-500" /></div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-3.5 font-semibold text-white hover:bg-purple-800"><Sparkles size={18} />Confirm Booking</button>
              <p className="text-center text-xs leading-5 text-gray-600">Frontend demo only. Data is saved in your browser LocalStorage.</p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}