import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Pencil, Save, X, LogOut, CalendarDays, Sparkles } from 'lucide-react'

function ProfilePage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' })
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    try {
      const savedAccount = JSON.parse(localStorage.getItem('drBeautyAccount') || 'null')
      if (savedAccount) {
        setProfile(savedAccount)
        setFormData(savedAccount)
      }
    } catch {
      setMessage('Profile information could not be loaded.')
    }
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSave(event) {
    event.preventDefault()
    const updatedProfile = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
    }
    if (!updatedProfile.name || !updatedProfile.email || !updatedProfile.phone) {
      setMessage('Please complete all required fields.')
      return
    }
    try {
      localStorage.setItem('drBeautyAccount', JSON.stringify(updatedProfile))
      setProfile(updatedProfile)
      setFormData(updatedProfile)
      setIsEditing(false)
      setMessage('Profile updated successfully!')
    } catch {
      setMessage('Could not save your profile. Please try again.')
    }
  }

  function handleCancel() {
    setFormData(profile)
    setIsEditing(false)
    setMessage('')
  }

  function handleLogout() {
    if (!window.confirm('Are you sure you want to log out?')) return
    localStorage.removeItem('drBeautyLoggedIn')
    navigate('/signin')
  }

  const isLoggedIn = localStorage.getItem('drBeautyLoggedIn') === 'true'

  if (!profile.email || !isLoggedIn) {
    return (
      <main className="flex min-h- items-center justify-center bg-purple-50/50 px-4 py-16">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-700"><User size={30} /></div>
          <h1 className="mt-5 text-2xl font-bold text-gray-900">Sign In Required</h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">Please sign in to view your demo customer profile.</p>
          <button onClick={() => navigate('/signin')} className="mt-6 w-full rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800">Sign In</button>
          <button onClick={() => navigate('/signup')} className="mt-3 text-sm font-semibold text-purple-700 hover:text-purple-900">Create an Account</button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-purple-50/50 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-700"><Sparkles size={30} /></div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">DR Beauty Salon</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">My Account</h1>
          <p className="mt-3 text-gray-600">Manage your customer profile and appointments.</p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-purple-100/60">
          <div className="bg-linear-to-r from-purple-900 to-purple-700 px-6 py-8 text-white sm:px-10">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/30 bg-white/15 text-3xl font-bold">{profile.name?.charAt(0)?.toUpperCase() || 'U'}</div>
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="mt-1 text-sm text-white">Demo Customer Account</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              {!isEditing && (
                <button onClick={() => { setMessage(''); setIsEditing(true) }} className="inline-flex items-center gap-2 rounded-xl border border-purple-200 px-4 py-2.5 text-sm font-semibold text-purple-700 hover:bg-purple-50"><Pencil size={16} />Edit Profile</button>
              )}
            </div>

            {message && <div role="status" className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">{message}</div>}

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="profile-name" className="mb-2 block text-sm font-semibold text-gray-700">Full Name *</label>
                  <input id="profile-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-gray-900" />
                </div>
                <div>
                  <label htmlFor="profile-email" className="mb-2 block text-sm font-semibold text-gray-700">Email Address *</label>
                  <input id="profile-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-gray-900" />
                </div>
                <div>
                  <label htmlFor="profile-phone" className="mb-2 block text-sm font-semibold text-gray-700">Phone Number *</label>
                  <input id="profile-phone" type="tel" name="phone" autoComplete="tel" inputMode="numeric" value={formData.phone} onChange={handleChange} pattern="[0-9]{11}" title="Enter an 11-digit phone number" required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-gray-900" />
                </div>
                <div className="flex flex-wrap gap-3 pt-3">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800"><Save size={18} />Save Changes</button>
                  <button type="button" onClick={handleCancel} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"><X size={18} />Cancel</button>
                </div>
              </form>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-4 rounded-2xl bg-purple-50 p-5"><User className="shrink-0 text-purple-700" size={22} /><div><p className="text-xs text-gray-600">Full Name</p><p className="mt-1 font-semibold text-gray-900">{profile.name}</p></div></div>
                <div className="flex items-center gap-4 rounded-2xl bg-purple-50 p-5"><Mail className="shrink-0 text-purple-700" size={22} /><div><p className="text-xs text-gray-600">Email Address</p><p className="mt-1 break-all font-semibold text-gray-900">{profile.email}</p></div></div>
                <div className="flex items-center gap-4 rounded-2xl bg-purple-50 p-5"><Phone className="shrink-0 text-purple-700" size={22} /><div><p className="text-xs text-gray-600">Phone Number</p><p className="mt-1 font-semibold text-gray-900">{profile.phone}</p></div></div>
              </div>
            )}

            <div className="mt-10 grid gap-4 border-t border-gray-100 pt-8 sm:grid-cols-2">
              <button onClick={() => navigate('/appointments')} className="flex items-center justify-center gap-2 rounded-xl bg-purple-100 px-5 py-4 font-semibold text-purple-800 hover:bg-purple-200"><CalendarDays size={19} />My Appointments</button>
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-4 font-semibold text-red-600 hover:bg-red-50"><LogOut size={19} />Logout</button>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-xs leading-5 text-gray-500">Demo profile only. Your information is stored in this browser and is not synchronized with a server.</p>
      </div>
    </main>
  )
}
export default ProfilePage