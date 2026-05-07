import { useQuery } from '@tanstack/react-query'
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react'
import { ordersService } from '../../services/orders.service'
import { OrderStatus } from '../../types/api.types'

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending:    'Pendiente',
  confirmed:  'Confirmado',
  processing: 'En proceso',
  shipped:    'Enviado',
  delivered:  'Entregado',
  cancelled:  'Cancelado',
  refunded:   'Reembolsado',
}

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending:    'bg-yellow-100 text-yellow-800',
  confirmed:  'bg-blue-100 text-blue-800',
  processing: 'bg-indigo-100 text-indigo-800',
  shipped:    'bg-purple-100 text-purple-800',
  delivered:  'bg-green-100 text-green-800',
  cancelled:  'bg-red-100 text-red-800',
  refunded:   'bg-gray-100 text-gray-800',
}

const STATUS_ICON: Record<OrderStatus, React.ReactNode> = {
  pending:    <Clock size={14} />,
  confirmed:  <CheckCircle size={14} />,
  processing: <Package size={14} />,
  shipped:    <Truck size={14} />,
  delivered:  <CheckCircle size={14} />,
  cancelled:  <XCircle size={14} />,
  refunded:   <XCircle size={14} />,
}

export default function OrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders', 'mine'],
    queryFn: () => ordersService.listMine(),
  })

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="section-title mb-8">Mis Pedidos</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="card h-24 animate-pulse bg-andalusia-sand" />)}
        </div>
      ) : !data?.data.length ? (
        <div className="text-center py-20 card p-12">
          <Package size={48} className="mx-auto text-terracotta-200 mb-4" />
          <p className="font-serif text-xl text-gray-500">No tienes pedidos todavía</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.data.map(order => (
            <div key={order.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500 font-mono mb-0.5">#{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLOR[order.status]}`}>
                  {STATUS_ICON[order.status]}
                  {STATUS_LABEL[order.status]}
                </span>
              </div>

              {order.items && (
                <div className="space-y-1.5 mb-4 border-t pt-3">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.product_name} × {item.quantity}</span>
                      <span className="font-medium">€{parseFloat(item.total_price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between border-t pt-3">
                <div className="text-sm">
                  {order.tracking_number && (
                    <span className="text-gray-500">Seguimiento: <span className="font-mono text-terracotta-600">{order.tracking_number}</span></span>
                  )}
                </div>
                <span className="font-bold text-terracotta-700">€{parseFloat(order.total).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
