import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ArticleCard from './components/ArticleCard'
import ArticleModal from './components/ArticleModal'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [active, setActive] = useState(null)
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetchArticles()
  }, [category])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      setError(null)
      const url = new URL(`${BACKEND_URL}/api/articles`)
      if (category) url.searchParams.set('category', category)
      const res = await fetch(url.toString())
      if (!res.ok) throw new Error('Gagal memuat data')
      const data = await res.json()
      setArticles(data.items || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return articles
    return articles.filter(a =>
      (a.title || '').toLowerCase().includes(q) ||
      (a.summary || '').toLowerCase().includes(q) ||
      (a.author || '').toLowerCase().includes(q)
    )
  }, [search, articles])

  const categories = useMemo(() => {
    const set = new Set(articles.map(a => a.category).filter(Boolean))
    return ['Semua', ...Array.from(set)]
  }, [articles])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header search={search} setSearch={setSearch} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((c, idx) => {
            const value = idx === 0 ? '' : c
            const activeCat = (category || 'Semua')
            const label = idx === 0 ? 'Semua' : c
            const isActive = activeCat === label
            return (
              <button
                key={label}
                onClick={() => setCategory(value)}
                className={`px-3 py-1.5 rounded-full text-sm border ${isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {loading && (
          <div className="text-center text-gray-600 py-20">Memuat berita...</div>
        )}
        {error && (
          <div className="text-center text-red-600 py-20">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filtered.map(a => (
              <ArticleCard key={a.id} article={a} onClick={() => setActive(a)} />)
            )}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-600 py-20">Tidak ada berita yang cocok.</div>
            )}
          </div>
        )}
      </main>

      <ArticleModal open={!!active} onClose={() => setActive(null)} article={active || {}} />

      <footer className="border-t bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} BeritaKini. Semua hak dilindungi.</p>
          <a href="/test" className="text-blue-600 hover:underline">Cek Koneksi</a>
        </div>
      </footer>
    </div>
  )
}

export default App
