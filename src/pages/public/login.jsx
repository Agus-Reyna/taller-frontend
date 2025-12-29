import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}

    if (!email) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido"
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria"
    } else if (password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError("")

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setLoading(true)

    try {
      await login(email, password)

      console.log("LOGIN OK")
      navigate("/")

    } catch (error) {
      if (error.response) {
        setServerError(error.response.data.detail || "Error al iniciar sesión")
      } else {
        setServerError("No se pudo conectar con el servidor")
      }
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className='flex w-full h-screen bg-gray-200'>
      <div className='w-full flex items-center justify-center'>
        <form 
          onSubmit={handleSubmit}
          className='bg-white px-10 py-16 rounded-3xl border-2 border-gray-100'
        >
          <h1 className='text-5xl font-semibold'> Welcome Back </h1>
          <p className='font-medium text-lg text-gray-500 mt-4'> Welcome back! Please enter your details.</p>
          
          <div className='mt-8'> 
            <div>
              <label className='text-large font-medium'>Email</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className='mt-2'>
              <label className='text-large font-medium'>Password</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder='Enter your password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button className='active:scale-[.99] active:duration-75 ease-in-out transition-all font-medium text-base text-blue-600 mt-2'>Forgot password</button>
          </div>

          {serverError && (
            <p className="text-red-600 text-sm mt-4 text-center">
              {serverError}
            </p>
          )}
          
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 text-white text-lg font-bold
              active:scale-[.98] hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}