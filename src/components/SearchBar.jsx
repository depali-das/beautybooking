import { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/services?search=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto flex max-w-xl items-center gap-2 rounded-2xl border border-purple-50 bg-white p-2 shadow-lg shadow-purple-100/60"
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} aria-hidden="true" />
        <input
          id="service-search"
          name="q"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search facial, hair spa, makeup..."
          className="w-full bg-transparent py-3 pl-11 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-500"
        />
      </div>
      <button type="submit" className="rounded-xl bg-[#8B5CF6] px-7 py-3 text-sm font-semibold text-white hover:bg-purple-700">
        Search
      </button>
    </form>
  )
}