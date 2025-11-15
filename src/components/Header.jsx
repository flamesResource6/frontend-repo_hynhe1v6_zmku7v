import { Newspaper, Search } from 'lucide-react'

function Header({ search, setSearch }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 text-white rounded-lg"><Newspaper size={20} /></div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">BeritaKini</h1>
            <p className="text-xs text-gray-500">Kabar terbaru, cepat, dan ringan</p>
          </div>
        </div>
        <div className="ml-auto relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berita, topik, atau penulis..."
            className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
