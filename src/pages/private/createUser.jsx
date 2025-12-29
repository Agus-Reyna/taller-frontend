import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import api from "../../api/axios"

export default function CreateUser() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}

    if (!name) {
      newErrors.name = "Debes ingresar tu nombre"
    } else if (name.length < 3) {
      newErrors.name = "Mínimo 3 caracteres"
    }

    if (!surname) {
      newErrors.surname = "Debes ingresar tu apellido"
    } else if (surname.length < 3) {
      newErrors.surname = "Mínimo 3 caracteres"
    }
    
    if (!role) {
      newErrors.role = "Debes seleccionar un rol"
    }

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

    if (!password2 && password) {
      newErrors.password2 = "Debe confirmar la contraseña"
    } else if (password2 != password) {
      newErrors.password2 = "Las contraseñas no coinciden"
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
      const response = await api.post("/auth/register", {
        email,
        password,
        full_name: `${name} ${surname}`.trim()
      })

      console.log("SIGNUP OK", response.data)
      navigate("/")
      
    } catch (error) {
      if (error.response) {
        setServerError(error.response.data.detail || "Error al registrar usuario")
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
          <h1 className='text-5xl font-semibold'> Register </h1>
          <p className='font-medium text-lg text-gray-500 mt-4'> Welcome! Please enter your details.</p>
          
          <div className='mt-6'> 
            <div className="flex items-center justify-center gap-3">
              <div>
                <label className='text-large font-medium'>Name</label>
                <input
                  className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                  placeholder='Enter your name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )} 
              </div>

              <div>
                <label className='text-large font-medium'>Surname</label>
                <input
                  className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                  placeholder='Enter your Surname'
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.surname}</p>
                )} 
              </div>              
            </div>

            <div className='mt-2'>
              <label className='text-large font-medium'>Role</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent ${
                  role ? 'text-black' : 'text-gray-400'
                }`}>
                <option value="" disabled hidden>Choose your Role</option>
                <option value="admin" className='text-black'>Administrator</option>
                <option value="employee" className='text-black'>Employee</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}

            </div>

            <div className='mt-2'>
              <label className='text-large font-medium'>Email</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
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
                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                placeholder='Enter your password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className='mt-2'>
              <label className='text-large font-medium'>Confirm password</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                placeholder='Enter your password'
                type='password'
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              {errors.password2 && (
                <p className="text-red-500 text-sm mt-1">{errors.password2}</p>
              )}
            </div>
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
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}