import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../services/auth.service'
import { cartService } from '../../services/cart.service'
import { useCartStore } from '../../store/cartStore'
import toast from 'react-hot-toast'

const schema = z.object({
  email:    z.string().email('Email inválido'),
  password: z.string().min(1, 'Introduce tu contraseña'),
})
type Form = z.infer<typeof schema>

export default function LoginPage() {
  const setAuth  = useAuthStore(s => s.setAuth)
  const setCart  = useCartStore(s => s.setCart)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: Form) {
    try {
      const res = await authService.login(values.email, values.password)
      setAuth(res.data.user, res.data.accessToken, res.data.refreshToken)
      try {
        const merged = await cartService.merge()
        setCart(merged.data)
      } catch { /* guest cart may not exist */ }
      toast.success(`Bienvenido, ${res.data.user.first_name}`)
      navigate('/')
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Credenciales incorrectas')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Bienvenido</h1>
        <p className="sub">Accede a tu cuenta de Artesanía Albaycín</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-input-group">
            <label>Email</label>
            <input {...register('email')} type="email" placeholder="tu@email.com" />
            {errors.email && <p className="auth-error">{errors.email.message}</p>}
          </div>
          <div className="auth-input-group">
            <label>Contraseña</label>
            <input {...register('password')} type="password" placeholder="••••••••" />
            {errors.password && <p className="auth-error">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="btn btn--gold btn--wide" style={{ marginTop: 8 }}>
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="auth-link">
          ¿No tienes cuenta?{' '}
          <Link to="/registro">Regístrate gratis</Link>
        </p>
      </div>
    </div>
  )
}
