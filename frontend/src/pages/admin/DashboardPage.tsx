import { useQuery } from '@tanstack/react-query'
import { ShoppingBag, Package, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ordersService } from '../../services/orders.service'
import { productsService } from '../../services/products.service'
import { useAuthStore } from '../../store/authStore'
import { OrderStatus } from '../../types/api.types'

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending:    'bg-yellow-100 text-yellow-800',
  confirmed:  'bg-blue-100 text-blue-800',
  processing: 'bg-indigo-100 text-indigo-800',
  shipped:    'bg-purple-100 text-purple-800',
  delivered:  'bg-green-100 text-green-800',
  cancelled:  'bg-red-100 text-red-800',
  refunded:   'bg-gray-100 text-gray-800',
}

const STATUS_ES: Record<OrderStatus, string> = {
  pending: 'Pendiente', confirmed: 'Confirmado', processing: 'En proceso',
  shipped: 'Enviado', delivered: 'Entregado', cancelled: 'Cancelado', refunded: 'Reembolsado',
}

export default function DashboardPage() {
  const user = useAuthStore(s => s.user)

  const { data: ordersData } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: () => ordersService.listAll({ limit: 10 }),
  })
  const { data: productsData } = useQuery({
    queryKey: ['admin', 'products'],
    queryFn: () => productsService.listAdmin({ limit: 1 }),
  })

  const orders = ordersData?.data ?? []
  const pendingCount  = orders.filter(o => o.status === 'pending').length
  const totalRevenue  = orders.filter(o => o.status !== 'cancelled' && o.status !== 'refunded')
    .reduce((s, o) => s + parseFloat(o.total), 0)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="section-title mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm">Bienvenido, {user?.first_name}. Aquí tienes el resumen.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Pedidos totales</span>
            <ShoppingBag size={20} className="text-terracotta-400" />
          </div>
          <p className="text-3xl font-bold text-andalusia-night">{ordersData?.meta?.total ?? '—'}</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Pendientes</span>
            <Clock size={20} className="text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Productos</span>
            <Package size={20} className="text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-andalusia-night">{productsData?.meta?.total ?? '—'}</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Ingresos</span>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-700">€{totalRevenue.toFixed(0)}</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Link to="/admin/productos" className="card p-5 flex items-center gap-4 hover:shadow-md transition group">
          <div className="w-12 h-12 bg-terracotta-100 rounded-xl flex items-center justify-center group-hover:bg-terracotta-200 transition">
            <Package size={22} className="text-terracotta-700" />
          </div>
          <div>
            <p className="font-semibold text-andalusia-night">Gestión de Productos</p>
            <p className="text-sm text-gray-500">Crear, editar y publicar artículos</p>
          </div>
        </Link>
        <Link to="/admin/pedidos" className="card p-5 flex items-center gap-4 hover:shadow-md transition group">
          <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center group-hover:bg-gold-200 transition">
            <ShoppingBag size={22} className="text-gold-700" />
          </div>
          <div>
            <p className="font-semibold text-andalusia-night">Gestión de Pedidos</p>
            <p className="text-sm text-gray-500">Ver y actualizar el estado de pedidos</p>
          </div>
        </Link>
      </div>

      {/* Recent orders */}
      <div>
        <h2 className="font-serif text-xl font-semibold mb-4">Pedidos recientes</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-andalusia-sand/40">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Estado</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Total</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 8).map(o => (
                <tr key={o.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">#{o.id.slice(0,8).toUpperCase()}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLOR[o.status]}`}>
                      {STATUS_ES[o.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-terracotta-700">€{parseFloat(o.total).toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(o.created_at).toLocaleDateString('es-ES')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
