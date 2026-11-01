import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Search, Phone, Mail, CalendarDays, ArrowLeft, RefreshCw, UserRound, X } from 'lucide-react'

const STORAGE_KEY = 'drBeautyAppointments'

function CustomersPage() {
  const [appointments, setAppointments] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const loadCustomers = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
      setAppointments(Array.isArray(saved) ? saved : [])
    } catch { setAppointments([]) }
  }

  useEffect(() => { loadCustomers() }, [])

  const customers = useMemo(() => {
    const customerMap = new Map()
    appointments.forEach((appointment) => {
      const phone = appointment.phone?.trim()
      if (!phone) return
      if (!customerMap.has(phone)) {
        customerMap.set(phone, { id: phone, name: appointment.name || 'Unknown Customer', phone, email: appointment.email || '', bookings: [] })
      }
      const customer = customerMap.get(phone)
      customer.bookings.push(appointment)
      if (!customer.email && appointment.email) customer.email = appointment.email
    })
    return Array.from(customerMap.values())
  }, [appointments])

  const filteredCustomers = customers.filter((customer) => {
    const query = search.toLowerCase()
    return customer.name.toLowerCase().includes(query) || customer.phone.toLowerCase().includes(query) || customer.email.toLowerCase().includes(query)
  })

  const totalBookings = appointments.length
  const confirmedBookings = appointments.filter((i) => i.status === 'Confirmed').length

  return (
    <main className="min-h-screen bg-[#f8f7fc] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Link to="/admin" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900"><ArrowLeft size={17} />Back to Dashboard</Link>
            <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
            <p className="mt-2 text-gray-600">Manage and view your salon customers.</p>
          </div>
          <button onClick={loadCustomers} className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-200 bg-white px-5 py-3 text-sm font-semibold text-purple-700 hover:bg-purple-50"><RefreshCw size={17} />Refresh Data</button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Total Customers</p><h2 className="mt-2 text-3xl font-bold text-gray-900">{customers.length}</h2></div><div className="rounded-xl bg-purple-100 p-3 text-purple-700"><Users size={25} /></div></div></div>
          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Total Bookings</p><h2 className="mt-2 text-3xl font-bold text-gray-900">{totalBookings}</h2></div><div className="rounded-xl bg-blue-100 p-3 text-blue-700"><CalendarDays size={25} /></div></div></div>
          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Confirmed Bookings</p><h2 className="mt-2 text-3xl font-bold text-gray-900">{confirmedBookings}</h2></div><div className="rounded-xl bg-green-100 p-3 text-green-700"><CalendarDays size={25} /></div></div></div>
        </div>

        <div className="mb-6 rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div><h2 className="text-lg font-bold text-gray-900">All Customers</h2><p className="mt-1 text-sm text-gray-600">{filteredCustomers.length} customers found</p></div>
            <div className="relative w-full sm:max-w-md">
              <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input id="customer-search" name="q" type="search" autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone or email..." className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-gray-900 placeholder:text-gray-500" />
            </div>
          </div>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="rounded-2xl border border-purple-100 bg-white px-5 py-16 text-center shadow-sm">
            <UserRound size={48} className="mx-auto text-purple-200" />
            <h3 className="mt-4 text-xl font-bold text-gray-900">{search ? 'No Customers Found' : 'No Customers Yet'}</h3>
            <p className="mt-2 text-sm text-gray-600">{search ? 'Try another name, phone number or email.' : 'Customer information will appear after appointments are submitted.'}</p>
            {search && <button onClick={() => setSearch('')} className="mt-5 font-semibold text-purple-700 hover:underline">Clear Search</button>}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-700">{customer.name.charAt(0).toUpperCase()}</div>
                  <div className="min-w-0"><h3 className="truncate text-lg font-bold text-gray-900">{customer.name}</h3><p className="text-sm text-purple-700">Customer</p></div>
                </div>
                <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
                  <p className="flex items-center gap-3 break-all text-sm text-gray-700"><Phone size={17} className="shrink-0 text-purple-700" />{customer.phone}</p>
                  <p className="flex items-center gap-3 break-all text-sm text-gray-700"><Mail size={17} className="shrink-0 text-purple-700" />{customer.email || 'Email not provided'}</p>
                </div>
                <div className="mt-6 flex items-center justify-between rounded-xl bg-purple-50 p-4">
                  <div><p className="text-xs text-gray-600">Total Appointments</p><p className="mt-1 text-2xl font-bold text-purple-700">{customer.bookings.length}</p></div>
                  <button onClick={() => setSelectedCustomer(customer)} className="rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-800">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedCustomer(null)}>
            <div className="max-h- w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between gap-4">
                <div><h2 className="text-2xl font-bold text-gray-900">Customer Details</h2><p className="mt-1 text-sm text-gray-600">{selectedCustomer.name}</p></div>
                <button onClick={() => setSelectedCustomer(null)} aria-label="Close" className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"><X size={20} /></button>
              </div>
              <div className="mt-6 space-y-3 rounded-xl bg-purple-50 p-5">
                <p className="flex items-center gap-3 text-sm text-gray-700"><Phone size={17} />{selectedCustomer.phone}</p>
                <p className="flex items-center gap-3 break-all text-sm text-gray-700"><Mail size={17} />{selectedCustomer.email || 'Email not provided'}</p>
              </div>
              <h3 className="mb-4 mt-7 text-lg font-bold text-gray-900">Appointment History</h3>
              <div className="space-y-4">
                {selectedCustomer.bookings.map((booking) => (
                  <div key={booking.id} className="rounded-xl border border-gray-100 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-bold text-gray-900">{booking.service}</h4>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : booking.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>{booking.status || 'Pending'}</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">Date: {booking.date || 'Not provided'}</p>
                    <p className="mt-1 text-sm text-gray-600">Time: {booking.time || 'Not provided'}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="mt-6 w-full rounded-xl bg-purple-700 py-3 font-semibold text-white hover:bg-purple-800">Close</button>
            </div>
          </div>
        )}
        <p className="mt-8 text-center text-xs text-gray-500">DR Beauty Salon · Customer Management · Frontend Demo</p>
      </div>
    </main>
  )
}
export default CustomersPage