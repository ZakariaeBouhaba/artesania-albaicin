import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../services/auth.service'
import toast from 'react-hot-toast'

const schema = z.object({
  firstName: z.string().min(1, 'Introduce tu nombre'),
  lastName:  z.string().min(1, 'Introduce tus apellidos'),
  email:     z.string().email('Email inválido'),
  password:  z.string().min(8, 'Mínimo 8 caracteres'),
  confirm:   z.string(),
}).refine(d => d.password === d.confirm, { message: 'Las contraseñas no coinciden', path: ['confirm'] })

type Form = z.infer<typeof schema>

export default function RegisterPage() {
  const setAuth  = useAuthStore(s => s.setAuth)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: Form) {
    try {
      const res = await authService.register({
        email: values.email, password: values.password,
        firstName: values.firstName, lastName: values.lastName,
      })
      setAuth(res.data.user, res.data.accessToken, res.data.refreshToken)
      toast.success('Cuenta creada. ¡Bienvenido!')
      navigate('/')
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Error al registrarse')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Crear cuenta</h1>
        <p className="sub">Únete a la comunidad de Artesanía Albaycín</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="auth-input-group">
              <label>Nombre</label>
              <input {...register('firstName')} placeholder="Carlos" />
              {errors.firstName && <p className="auth-error">{errors.firstName.message}</p>}
            </div>
            <div className="auth-input-group">
              <label>Apellidos</label>
              <input {...register('lastName')} placeholder="García" />
              {errors.lastName && <p className="auth-error">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="auth-input-group">
            <label>Email</label>
            <input {...register('email')} type="email" placeholder="tu@email.com" />
            {errors.email && <p className="auth-error">{errors.email.message}</p>}
          </div>
          <div className="auth-input-group">
            <label>Contraseña</label>
            <input {...register('password')} type="password" placeholder="Mínimo 8 caracteres" />
            {errors.password && <p className="auth-error">{errors.password.message}</p>}
          </div>
          <div className="auth-input-group">
            <label>Confirmar contraseña</label>
            <input {...register('confirm')} type="password" placeholder="Repite la contraseña" />
            {errors.confirm && <p className="auth-error">{errors.confirm.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="btn btn--gold btn--wide" style={{ marginTop: 8 }}>
            {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="auth-link">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}
