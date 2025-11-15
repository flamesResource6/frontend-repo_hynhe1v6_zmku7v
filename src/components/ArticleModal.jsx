import { X } from 'lucide-react'

function ArticleModal({ open, onClose, article }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{article.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X size={18} />
          </button>
        </div>
        {article.image_url && (
          <img src={article.image_url} alt={article.title} className="w-full max-h-80 object-cover" />
        )}
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-500">Oleh {article.author} • {article.category} • {article.published_at ? new Date(article.published_at).toLocaleString('id-ID') : ''}</p>
          {article.summary && <p className="text-gray-700">{article.summary}</p>}
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
        </div>
      </div>
    </div>
  )
}

export default ArticleModal
