import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersService } from '../../services/orders.service'
import { OrderStatus } from '../../types/api.types'
import toast from 'react-hot-toast'

const STATUSES: OrderStatus[] = ['pending','confirmed','processing','shipped','delivered','cancelled']
const STATUS_ES: Record<OrderStatus, string> = {
  pending: 'Pendiente', confirmed: 'Confirmado', processing: 'En proceso',
  shipped: 'Enviado', delivered: 'Entregado', cancelled: 'Cancelado', refunded: 'Reembolsado',
}
const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800', confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-indigo-100 text-indigo-800', shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
}

export default function AdminOrdersPage() {
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [page, setPage] = useState(1)
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'orders', filterStatus, page],
    queryFn: () => ordersService.listAll({ ...(filterStatus && { status: filterStatus }), page, limit: 20 }),
  })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => ordersService.updateStatus(id, status),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'orders'] }); toast.success('Estado actualizado') },
    onError: () => toast.error('Error al actualizar'),
  })

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title mb-1">Pedidos</h1>
          <p className="text-gray-500 text-sm">{data?.meta?.total ?? 0} pedidos en total</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => { setFilterStatus(''); setPage(1) }}
          className={`text-sm px-4 py-1.5 rounded-full font-medium transition ${!filterStatus ? 'bg-andalusia-night text-white' : 'bg-white border hover:border-gray-400'}`}
        >Todos</button>
        {STATUSES.map(s => (
          <button key={s} onClick={() => { setFilterStatus(s); setPage(1) }}
            className={`text-sm px-4 py-1.5 rounded-full font-medium transition ${filterStatus === s ? 'bg-andalusia-night text-white' : 'bg-white border hover:border-gray-400'}`}
          >{STATUS_ES[s]}</button>
        ))}
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-andalusia-sand/40">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Estado</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Total</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Fecha</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Cambiar estado</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}><td colSpan={5} className="px-4 py-3"><div className="h-5 bg-gray-100 rounded animate-pulse" /></td></tr>
                ))
              : (data?.data ?? []).map(order => (
                  <tr key={order.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">#{order.id.slice(0,8).toUpperCase()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLOR[order.status]}`}>
                        {STATUS_ES[order.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-terracotta-700">€{parseFloat(order.total).toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <select
                        value={order.status}
                        onChange={e => statusMutation.mutate({ id: order.id, status: e.target.value })}
                        className="text-xs border rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                        disabled={order.status === 'cancelled' || order.status === 'refunded'}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{STATUS_ES[s]}</option>)}
                      </select>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {(data?.meta?.totalPages ?? 0) > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: data!.meta.totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition ${p === page ? 'bg-terracotta-600 text-white' : 'bg-white border hover:border-terracotta-400'}`}
            >{p}</button>
          ))}
        </div>
      )}
    </main>
  )
}
