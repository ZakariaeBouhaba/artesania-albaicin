import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { productsService } from '../../services/products.service'
import { categoriesService } from '../../services/categories.service'
import { Product } from '../../types/api.types'
import toast from 'react-hot-toast'

const schema = z.object({
  name:         z.string().min(1),
  description:  z.string().optional(),
  price:        z.coerce.number().min(0),
  stock:        z.coerce.number().int().min(0),
  sku:          z.string().optional(),
  categoryId:   z.string().optional(),
  isPublished:  z.boolean().optional(),
  isFeatured:   z.boolean().optional(),
})
type Form = z.infer<typeof schema>

interface Props {
  product: Product | null
  onClose: () => void
  onSaved: () => void
}

export default function ProductFormModal({ product, onClose, onSaved }: Props) {
  const { data: catData } = useQuery({ queryKey: ['categories'], queryFn: categoriesService.list })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: product ? {
      name: product.name, description: product.description ?? '',
      price: parseFloat(product.price), stock: product.stock,
      sku: product.sku ?? '', categoryId: product.category_id ?? '',
      isPublished: product.is_published, isFeatured: product.is_featured,
    } : { isPublished: false, isFeatured: false },
  })

  async function onSubmit(values: Form) {
    try {
      if (product) {
        await productsService.update(product.id, values)
        toast.success('Producto actualizado')
      } else {
        await productsService.create(values)
        toast.success('Producto creado')
      }
      onSaved()
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Error al guardar')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-serif text-xl">{product ? 'Editar producto' : 'Nuevo producto'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Nombre *</label>
            <input {...register('name')} className="input" placeholder="Agua de Rosas del Albaycín" />
            {errors.name && <p className="text-red-500 text-xs mt-1">Campo obligatorio</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Descripción</label>
            <textarea {...register('description')} rows={3} className="input resize-none" placeholder="Describe el producto..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Precio (€) *</label>
              <input {...register('price')} type="number" step="0.01" min="0" className="input" placeholder="29.99" />
              {errors.price && <p className="text-red-500 text-xs mt-1">Precio inválido</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Stock *</label>
              <input {...register('stock')} type="number" min="0" className="input" placeholder="0" />
              {errors.stock && <p className="text-red-500 text-xs mt-1">Stock inválido</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">SKU</label>
              <input {...register('sku')} className="input" placeholder="PERF-001" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Categoría</label>
              <select {...register('categoryId')} className="input">
                <option value="">Sin categoría</option>
                {(catData?.data ?? []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input {...register('isPublished')} type="checkbox" className="rounded" />
              Publicado
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input {...register('isFeatured')} type="checkbox" className="rounded" />
              Destacado
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
