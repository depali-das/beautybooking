import { useState } from 'react'
import { Search, Heart, CalendarDays, UserRound, Menu, X, Sparkles } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Offers', path: '/offers' },
  { name: 'About Us', path: '/about' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const linkStyle = ({ isActive }) =>
    `py-2 text-[14px] sm:text-[13px] font-medium transition-colors hover:text-purple-700 min-h-[44px] flex items-center ${isActive ? 'text-purple-700 font-bold' : 'text-gray-600'}`

  const handleSearch = (e) => {
    e.preventDefault()
    if (!search.trim()) return
    navigate(`/services?q=${encodeURIComponent(search.trim())}`)
    setSearchOpen(false)
    setSearch('')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100 bg-white/95 backdrop-blur-md">
      <div className="w-full bg-[#30213F] px-3 py-2.5 text-center sm:px-4">
        <p className="mx-auto flex w-full max-w-7xl items-center justify-center gap-1.5 text-[11px] leading-[1.4] text-white sm:gap-2 sm:text-xs lg:text-sm">
          <Sparkles size={14} className="h-3.5 w-3.5 shrink-0" />
          <span>Special Beauty Offer! Get 15% OFF your first booking.</span>
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        {/* LOGO - BORO SIZE: h-12 mobile, h-16 desktop - age chilo h-8 */}
        <Link to="/" className="flex shrink-0 items-center" onClick={() => setMenuOpen(false)}>
          <img 
            src="/images/dr-logo-120.jpg"
            alt="DR Beauty Salon"
            className="h-10 w-auto sm:h-12"
            width="120"
            height="48"
            loading="eager"
            decoding="async"
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex lg:gap-7">
          {navigation.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `text-[13px] font-medium transition-colors hover:text-purple-700 ${isActive ? 'text-purple-700 font-bold' : 'text-gray-600'}`}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">
          <button type="button" onClick={() => setSearchOpen(!searchOpen)} aria-label="Toggle search" className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-purple-50 transition">
            <Search size={18} className="h-4.5 w-4.5 text-gray-700 sm:h-5 sm:w-5" />
          </button>
          <Link to="/favorites" aria-label="Favourites" className="hidden h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-purple-50 transition sm:inline-flex">
            <Heart size={18} className="h-4.5 w-4.5 text-gray-700 sm:h-5 sm:w-5" />
          </Link>
          <Link to="/appointments" aria-label="My appointments" className="hidden h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-purple-50 transition sm:inline-flex">
            <CalendarDays size={18} className="h-4.5 w-4.5 text-gray-700 sm:h-5 sm:w-5" />
          </Link>
          <Link to="/signin" aria-label="Sign in" className="hidden h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-purple-50 transition sm:inline-flex">
            <UserRound size={18} className="h-4.5 w-4.5 text-gray-700 sm:h-5 sm:w-5" />
          </Link>
          <Link to="/booking" className="hidden rounded-full bg-purple-700 px-4 py-2.5 text-[12px] font-semibold text-white transition hover:bg-purple-800 sm:px-5 sm:py-3 sm:text-[13px] lg:inline-flex">
            Book Appointment
          </Link>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen} className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-purple-50 transition lg:hidden">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="w-full border-t border-purple-100 bg-white px-4 py-3 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="mx-auto w-full max-w-7xl">
            <div className="flex w-full gap-2 rounded-xl border border-purple-200 bg-white p-1.5 sm:p-2">
              <Search className="ml-1 mt-2.5 shrink-0 text-purple-700 sm:ml-2" size={18} aria-hidden="true" />
              <input id="header-search" name="q" type="search" autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search beauty services..." className="min-w-0 flex-1 bg-transparent px-2 py-2 text-[13px] text-gray-700 outline-none placeholder:text-gray-500 sm:text-sm" />
              <button type="submit" className="shrink-0 rounded-lg bg-purple-700 px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-purple-800 sm:px-5 sm:text-sm min-h-10">Search</button>
            </div>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="w-full border-t border-purple-100 bg-white lg:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6 sm:py-5">
            {navigation.map((item) => (
              <NavLink key={item.path} to={item.path} onClick={() => setMenuOpen(false)} className={linkStyle}>{item.name}</NavLink>
            ))}
            <div className="my-2 h-px w-full bg-purple-100" />
            <Link to="/favorites" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center gap-3 py-2 text-[14px] text-gray-600"><Heart size={18} /> Favourites</Link>
            <Link to="/appointments" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center gap-3 py-2 text-[14px] text-gray-600"><CalendarDays size={18} /> My Appointments</Link>
            <Link to="/signin" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center gap-3 py-2 text-[14px] text-gray-600"><UserRound size={18} /> Sign In</Link>
            <Link to="/booking" onClick={() => setMenuOpen(false)} className="mt-3 flex min-h-12 w-full items-center justify-center rounded-xl bg-purple-700 py-3 text-center text-[14px] font-semibold text-white transition hover:bg-purple-800">Book Appointment</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
