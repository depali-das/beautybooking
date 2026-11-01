import { useState } from 'react'
import { Search, Sparkles, ArrowRight, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const q = search.trim()
    if (!q) return
    navigate(`/services?q=${encodeURIComponent(q)}`)
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#2D1B4E]">
      <div className="absolute inset-0 h-full w-full">
        <img
          src="/images/hero-banner-1200.jpg"
          srcSet="/images/hero-banner-400.jpg 400w, /images/hero-banner-800.jpg 800w, /images/hero-banner-1200.jpg 1200w"
          sizes="(max-width: 768px) 100vw, 50vw"
          alt="DR Beauty Salon - Modern women's beauty salon for beauty and self-care"
          className="h-full w-full object-cover object-[70%_center] sm:object-[65%_center] lg:object-center"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width="1200"
          height="600"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#2D1B4E]/95 via-[#2D1B4E]/90 to-[#2D1B4E]/40" />
        <div className="absolute inset-0 bg-linear-to-t from-[#2D1B4E]/70 via-transparent to-transparent lg:bg-linear-to-r lg:from-[#2D1B4E]/90 lg:to-transparent" />
      </div>

      <div className="relative z-10 flex min-h- w-full items-center sm:min-h- lg:min-h-">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-16">
            <div className="flex w-full justify-center lg:justify-start mb-4 sm:mb-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-[#2D1B4E] shadow-lg sm:px-5">
                <Sparkles size={14} className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />
                Welcome to DR Beauty Salon
              </div>
            </div>

            <h1 className="w-full text-center lg:text-left text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              Discover Your
              <span className="block text-[#E9D5FF]">Natural Beauty</span>
              <span className="block">& Inner Glow.</span>
            </h1>

            <p className="mx-auto mt-4 sm:mt-5 w-full max-w-xl lg:mx-0 text-center lg:text-left text-sm leading-[1.7] text-white/90 sm:text-base lg:text-lg">
              Experience exceptional beauty and skincare treatments at DR Beauty Salon. Look beautiful, feel confident and shine every day.
            </p>

            <form onSubmit={handleSearch} className="mt-6 sm:mt-7 flex w-full max-w-full sm:max-w-xl mx-auto lg:mx-0 items-center gap-1 sm:gap-1.5 rounded-xl sm:rounded-2xl bg-white p-1 sm:p-1.5 shadow-xl">
              <Search size={16} className="ml-2 sm:ml-3 shrink-0 text-gray-500" aria-hidden="true" />
              <label htmlFor="hero-search" className="sr-only">Search beauty services</label>
              <input id="hero-search" name="q" type="search" autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search facial, hair spa, makeup..." className="min-w-0 flex-1 bg-transparent px-1.5 sm:px-2 py-2 sm:py-2.5 text-sm sm:text-base text-gray-800 outline-none placeholder:text-gray-500" />
              <button type="submit" className="shrink-0 rounded-lg sm:rounded-xl bg-purple-600 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white hover:bg-purple-800 min-h-9">Search</button>
            </form>

            <div className="mt-5 sm:mt-6 flex w-full flex-wrap justify-center lg:justify-start gap-2 sm:gap-2.5">
              <button onClick={() => navigate('/services')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-purple-600 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-purple-800 transition">Explore Services <ArrowRight size={14} className="sm:h-4 sm:w-4" /></button>
              <button onClick={() => navigate('/booking')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-[#2D1B4E] hover:bg-gray-100 transition shadow-lg"><Clock size={14} className="sm:h-4 sm:w-4" /> Book Now</button>
            </div>

            <div className="mt-6 sm:mt-7 flex w-full items-center justify-center lg:justify-start gap-2.5">
              <div className="flex -space-x-2">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 border-[#2D1B4E] bg-linear-to-br from-pink-400 to-purple-500 flex items-center justify-center text-xs sm:text-sm font-bold text-white">A</div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 border-[#2D1B4E] bg-linear-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-xs sm:text-sm font-bold text-white">S</div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 border-[#2D1B4E] bg-linear-to-br from-rose-400 to-pink-500 flex items-center justify-center text-xs sm:text-sm font-bold text-white">R</div>
              </div>
              <span className="text-xs sm:text-sm font-medium text-white">Trusted by 2k+ happy clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}