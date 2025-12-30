import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const EditClientModal = ({ isOpen, onClose, client, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    cellphone: '',
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (client && isOpen) {
      setFormData({
        name: client.name || '',
        cellphone: client.cellphone || '',
        email: client.email || ''
      })
      setErrors({})
    }
  }, [client, isOpen])

  if (!isOpen || !client) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres'
    }

    if (!formData.cellphone.trim()) {
      newErrors.cellphone = 'El teléfono es requerido'
    } else if (!/^\d{10,15}$/.test(formData.cellphone.replace(/[\s-]/g, ''))) {
      newErrors.cellphone = 'Ingresa un teléfono válido (10-15 dígitos)'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setLoading(true)
    try {
      await onUpdate(client.id, formData)
      setErrors({})
      onClose()
    } catch (error) {
      console.error('Error al actualizar cliente:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setErrors({})
    onClose()
  }

  return (
    <div 
      className='fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4'
      onClick={handleClose}
    >
      <div 
        className='bg-white rounded-lg shadow-xl w-full max-w-md border-2 border-gray-300'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center p-6 border-b border-gray-200'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900'>Editar Cliente</h2>
            <p className='text-sm text-gray-500 mt-1'>ID: #{client.id}</p>
          </div>
          <button
            onClick={handleClose}
            className='text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded'
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                Nombre completo <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Ej: Juan Pérez'
                disabled={loading}
              />
              {errors.name && (
                <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor='cellphone' className='block text-sm font-medium text-gray-700 mb-1'>
                Teléfono <span className='text-red-500'>*</span>
              </label>
              <input
                type='tel'
                id='cellphone'
                name='cellphone'
                value={formData.cellphone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.cellphone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Ej: 3512345678'
                disabled={loading}
              />
              {errors.cellphone && (
                <p className='text-red-500 text-sm mt-1'>{errors.cellphone}</p>
              )}
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                Email <span className='text-gray-400 text-xs'>(opcional)</span>
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Ej: juan@ejemplo.com'
                disabled={loading}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
              )}
            </div>
          </div>

          <div className='flex gap-3 mt-6'>
            <button
              type='button'
              onClick={handleClose}
              className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400 disabled:cursor-not-allowed'
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditClientModal
