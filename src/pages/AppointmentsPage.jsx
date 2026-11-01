import { useEffect, useState } from 'react'
import {
  CalendarDays,
  Clock,
  User,
  Phone,
  Sparkles,
  XCircle,
  ClipboardList,
} from 'lucide-react'

const STORAGE_KEY = 'drBeautyAppointments'

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])

  function loadAppointments() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setAppointments(Array.isArray(saved) ? saved : [])
    } catch {
      setAppointments([])
    }
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  function cancelAppointment(id) {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this appointment?'
    )
    if (!confirmed) return

    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id
        ? { ...appointment, status: 'Cancelled' }
        : appointment
    )

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments))
    setAppointments(updatedAppointments)
  }

  const activeAppointments = appointments.filter(
    (item) => item.status !== 'Cancelled'
  )

  return (
    <main className="min-h-screen bg-purple-50/50 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
            <ClipboardList size={28} />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">
            DR Beauty Salon
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Appointments
          </h1>

          <p className="mt-3 text-gray-600">
            View and manage your appointment requests.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-600">Total Bookings</p>
            <p className="mt-2 text-3xl font-bold text-purple-700">
              {appointments.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-600">Active Bookings</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {activeAppointments.length}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {appointments.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-700">
              <CalendarDays size={30} />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              No Appointments Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600">
              You have not booked any beauty services yet. Explore our services
              and schedule your first appointment.
            </p>

            <a
              href="/services"
              className="mt-6 inline-flex rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white transition hover:bg-purple-800"
            >
              Explore Services
            </a>
          </div>
        ) : (
          /* Appointments List */
          <div className="space-y-5">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm sm:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">
                      Appointment #{String(appointment.id).slice(-6)}
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-gray-900">
                      {appointment.service}
                    </h2>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-xs font-bold ${
                      appointment.status === 'Cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {appointment.status || 'Pending'}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CalendarDays size={18} className="text-purple-700" />
                    <span>{appointment.date || 'Date not set'}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Clock size={18} className="text-purple-700" />
                    <span>{appointment.time || 'Time not set'}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <User size={18} className="text-purple-700" />
                    <span>{appointment.name}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Phone size={18} className="text-purple-700" />
                    <span>{appointment.phone}</span>
                  </div>
                </div>

                {appointment.email && (
                  <p className="mt-4 break-all text-sm text-gray-600">
                    Email: {appointment.email}
                  </p>
                )}

                {appointment.notes && (
                  <div className="mt-4 rounded-xl bg-purple-50 p-4 text-sm text-gray-700">
                    <strong>Additional Notes:</strong>
                    <p className="mt-1">{appointment.notes}</p>
                  </div>
                )}

                {appointment.status !== 'Cancelled' && (
                  <div className="mt-6 border-t border-gray-100 pt-5">
                    <button
                      type="button"
                      onClick={() => cancelAppointment(appointment.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <XCircle size={17} />
                      Cancel Appointment
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Demo Notice */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-purple-100 bg-white p-5 text-sm leading-6 text-gray-600">
          <Sparkles size={20} className="mt-0.5 shrink-0 text-purple-700" />
          <p>
            Demo notice: Appointment information is stored only in this
            browser's LocalStorage. It is not connected to a real salon
            booking system.
          </p>
        </div>
      </div>
    </main>
  )
}

export default AppointmentsPage