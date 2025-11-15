import { Calendar, Tag } from 'lucide-react'

function ArticleCard({ article, onClick }) {
  return (
    <div onClick={onClick} className="group cursor-pointer bg-white rounded-lg border border-gray-200 hover:shadow-md transition overflow-hidden">
      {article.image_url && (
        <div className="aspect-[16/9] overflow-hidden">
          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
      )}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1"><Tag size={14} /> {article.category}</span>
          {article.published_at && (
            <span className="inline-flex items-center gap-1"><Calendar size={14} /> {new Date(article.published_at).toLocaleDateString('id-ID')}</span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 leading-snug line-clamp-2">{article.title}</h3>
        {article.summary && <p className="text-sm text-gray-600 line-clamp-3">{article.summary}</p>}
      </div>
    </div>
  )
}

export default ArticleCard
