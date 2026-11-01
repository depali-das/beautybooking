import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'

const STORAGE_KEY = 'drBeautyAppointments'

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([])
  const [mobileMenu, setMobileMenu] = useState(false)

  const loadAppointments = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setAppointments(Array.isArray(saved) ? saved : [])
    } catch {
      setAppointments([])
    }
  }

  useEffect(() => { loadAppointments() }, [])

  const updateStatus = (id, status) => {
    const updated = appointments.map((a) => (a.id === id ? { ...a, status } : a))
    setAppointments(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const pending = appointments.filter((i) => i.status === 'Pending').length
  const confirmed = appointments.filter((i) => i.status === 'Confirmed').length
  const cancelled = appointments.filter((i) => i.status === 'Cancelled').length
  const customers = new Set(appointments.map((i) => i.phone).filter(Boolean)).size

  const stats = [
    { title: 'Total Appointments', value: appointments.length, icon: CalendarDays, color: 'bg-purple-100 text-purple-700' },
    { title: 'Pending Bookings', value: pending, icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
    { title: 'Confirmed Bookings', value: confirmed, icon: CheckCircle, color: 'bg-green-100 text-green-700' },
    { title: 'Cancelled Bookings', value: cancelled, icon: XCircle, color: 'bg-red-100 text-red-600' },
    { title: 'Total Customers', value: customers, icon: Users, color: 'bg-blue-100 text-blue-700' },
  ]

  const quickActions = [
    { title: 'Manage Bookings', description: 'View customer appointments', icon: CalendarDays, link: '/appointments' },
    { title: 'Manage Services', description: 'Add, edit and delete services', icon: Sparkles, link: '/admin/services' },
    { title: 'View Offers', description: 'Explore special offers', icon: TrendingUp, link: '/offers' },
    { title: 'My Profile', description: 'View account details', icon: Users, link: '/profile' },
    { title: 'Manage Customers', description: 'View customer information', icon: Users, link: '/admin/customers' },
  ]

  return (
    <main className="min-h-screen bg-[#f8f7fc]">
      <header className="sticky top-0 z-30 border-b border-purple-100 bg-white">
        <div className="mx-auto flex max-w- items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-700 text-white"><LayoutDashboard size={23} /></div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">DR Beauty Salon</h1>
              <p className="text-xs font-semibold text-purple-700">Admin Dashboard</p>
            </div>
          </Link>

          <div className="hidden items-center gap-4 sm:flex">
            <button type="button" onClick={loadAppointments} className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <RefreshCw size={16} />Refresh
            </button>
            <Link to="/" className="text-sm font-semibold text-purple-700 hover:text-purple-900">Visit Website</Link>
          </div>

          <button type="button" onClick={() => setMobileMenu(!mobileMenu)} className="rounded-lg p-2 text-gray-700 sm:hidden" aria-label="Toggle menu">
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t border-gray-100 bg-white px-4 py-4 sm:hidden">
            <button type="button" onClick={() => { loadAppointments(); setMobileMenu(false) }} className="mb-3 flex w-full items-center gap-2 rounded-lg bg-purple-50 px-4 py-3 font-semibold text-purple-700">
              <RefreshCw size={17} />Refresh Dashboard
            </button>
            <Link to="/" onClick={() => setMobileMenu(false)} className="block rounded-lg px-4 py-3 font-medium text-purple-700">Visit Website</Link>
          </div>
        )}
      </header>

      <div className="mx-auto max-w- px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-purple-700">Administration</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Dashboard Overview</h2>
            <p className="mt-2 text-gray-600">Welcome to your salon management dashboard.</p>
          </div>
          <Link to="/appointments" className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white shadow-md hover:bg-purple-800">
            View Customer Appointments<ArrowRight size={18} />
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}><Icon size={23} /></div>
                  <TrendingUp size={18} className="text-gray-400" aria-hidden="true" />
                </div>
                <p className="mt-5 text-sm text-gray-600">{stat.title}</p>
                <h3 className="mt-1 text-3xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h3 className="mb-5 text-xl font-bold text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.title} to={action.link} className="flex items-center justify-between rounded-2xl border border-purple-100 bg-white p-5 transition hover:border-purple-300 hover:shadow-md">
                  <div>
                    <Icon className="text-purple-700" size={25} />
                    <h4 className="mt-3 font-bold text-gray-900">{action.title}</h4>
                    <p className="mt-1 text-sm text-gray-600">{action.description}</p>
                  </div>
                  <ArrowRight className="shrink-0 text-purple-700" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Recent Appointments</h3>
              <p className="mt-1 text-sm text-gray-600">Manage your latest customer bookings.</p>
            </div>
            <button type="button" onClick={loadAppointments} className="flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900">
              <RefreshCw size={16} />Refresh Data
            </button>
          </div>

          {appointments.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <CalendarDays size={45} className="mx-auto text-purple-200" />
              <h4 className="mt-4 text-lg font-bold text-gray-800">No Appointments Yet</h4>
              <p className="mt-2 text-sm text-gray-600">Customer bookings will appear here.</p>
              <Link to="/booking" className="mt-5 inline-flex items-center gap-2 rounded-full bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800">
                Open Booking Page<ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w- text-left">
                <thead className="bg-purple-50 text-sm text-gray-700">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Customer</th>
                    <th className="px-5 py-4 font-semibold">Phone</th>
                    <th className="px-5 py-4 font-semibold">Service</th>
                    <th className="px-5 py-4 font-semibold">Date</th>
                    <th className="px-5 py-4 font-semibold">Time</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[...appointments].reverse().map((item) => (
                    <tr key={item.id} className="hover:bg-purple-50/50">
                      <td className="px-5 py-4 font-semibold text-gray-900">{item.name}</td>
                      <td className="px-5 py-4 text-sm text-gray-700">{item.phone}</td>
                      <td className="px-5 py-4 text-sm text-gray-700">{item.service}</td>
                      <td className="px-5 py-4 text-sm text-gray-700">{item.date}</td>
                      <td className="px-5 py-4 text-sm text-gray-700">{item.time}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === 'Confirmed' ? 'bg-green-100 text-green-700' : item.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>
                          {item.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <label htmlFor={`status-${item.id}`} className="sr-only">Update status for {item.name}</label>
                        <select
                          id={`status-${item.id}`}
                          name={`status-${item.id}`}
                          aria-label={`Update status for ${item.name}`}
                          value={item.status || 'Pending'}
                          onChange={(e) => updateStatus(item.id, e.target.value)}
                          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-purple-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">DR Beauty Salon Admin Panel · Frontend Demo</p>
      </div>
    </main>
  )
}