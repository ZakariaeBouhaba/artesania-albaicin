import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { UserRole } from '../types/api.types'

interface Props { allowedRoles: UserRole[] }

export default function RoleRoute({ allowedRoles }: Props) {
  const user = useAuthStore(s => s.user)
  if (!user) return <Navigate to="/login" replace />
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />
  return <Outlet />
}
