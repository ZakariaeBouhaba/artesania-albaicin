import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { productsService } from '../../services/products.service'
import { Product } from '../../types/api.types'
import toast from 'react-hot-toast'
import ProductFormModal from './ProductFormModal'

export default function AdminProductsPage() {
  const [page, setPage]         = useState(1)
  const [editProduct, setEdit]  = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'products', page],
    queryFn: () => productsService.listAdmin({ page, limit: 15 }),
  })

  const toggleMutation = useMutation({
    mutationFn: (id: string) => productsService.togglePublish(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'products'] }); toast.success('Visibilidad actualizada') },
  })
  const deleteMutation = useMutation({
    mutationFn: (id: string) => productsService.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'products'] }); toast.success('Producto eliminado') },
    onError: () => toast.error('Error al eliminar'),
  })

  function handleNew() { setEdit(null); setShowForm(true) }
  function handleEdit(p: Product) { setEdit(p); setShowForm(true) }
  function handleDelete(p: Product) {
    if (confirm(`¿Eliminar "${p.name}"? Esta acción no se puede deshacer.`)) deleteMutation.mutate(p.id)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title mb-1">Productos</h1>
          <p className="text-gray-500 text-sm">{data?.meta.total ?? 0} productos en total</p>
        </div>
        <button onClick={handleNew} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Nuevo producto
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-andalusia-sand/40">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Producto</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Categoría</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Precio</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Stock</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Estado</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}><td colSpan={6} className="px-4 py-3"><div className="h-5 bg-gray-100 rounded animate-pulse" /></td></tr>
                ))
              : (data?.data ?? []).map(product => (
                  <tr key={product.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-andalusia-sand rounded-lg overflow-hidden flex-shrink-0">
                          {product.images[0] ? (
                            <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                          ) : <div className="w-full h-full flex items-center justify-center">🏺</div>}
                        </div>
                        <span className="font-medium line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{product.category_name ?? '—'}</td>
                    <td className="px-4 py-3 font-bold text-terracotta-700">€{parseFloat(product.price).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${product.stock > 0 ? 'text-green-700' : 'text-red-500'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {product.is_published ? 'Publicado' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleMutation.mutate(product.id)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-500"
                          title={product.is_published ? 'Ocultar' : 'Publicar'}
                        >
                          {product.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button onClick={() => handleEdit(product)} className="p-1.5 hover:bg-blue-50 rounded-lg transition text-blue-600">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(product)} className="p-1.5 hover:bg-red-50 rounded-lg transition text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {(data?.meta.totalPages ?? 0) > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: data!.meta.totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition ${p === page ? 'bg-terracotta-600 text-white' : 'bg-white border hover:border-terracotta-400'}`}
            >{p}</button>
          ))}
        </div>
      )}

      {showForm && (
        <ProductFormModal
          product={editProduct}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); qc.invalidateQueries({ queryKey: ['admin', 'products'] }) }}
        />
      )}
    </main>
  )
}
