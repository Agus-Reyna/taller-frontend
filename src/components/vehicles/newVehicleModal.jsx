import React, { useState } from 'react'
import { X } from 'lucide-react'

const NewVehicleModal= ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    client_id: '',
    brand: '',
    model: '',
    year: '',
    plate: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

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

    if (!formData.brand.trim()) {
      newErrors.brand = 'La marca es requerida'
    } else if (formData.brand.trim().length < 2) {
      newErrors.brand = 'La marca debe tener al menos 2 caracteres'
    }

    if (!formData.model.trim()) {
      newErrors.model = 'El modelo es requerido'
    } else if (formData.model.trim().length < 3) {
      newErrors.model = 'El modelo debe tener al menos 3 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setLoading(true)
    try {
      await onSubmit(formData)

      setFormData({ client_id: '', brand: '', model: '', year: '', plate: ''})
      setErrors({})
      onClose()
    } catch (error) {
      console.error('Error al crear vehiculo:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({ client_id: '', brand: '', model: '', year: '', plate: ''})
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
          <h2 className='text-2xl font-bold text-gray-900'>Nuevo Vehículo</h2>
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
                Marca del Vehículo <span className='text-red-500'>*</span>
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
                placeholder='Ej: Toyota'
                disabled={loading}
              />
              {errors.name && (
                <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                Modelo del Vehículo <span className='text-red-500'>*</span>
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
                placeholder='Ej: Corolla'
                disabled={loading}
              />
              {errors.name && (
                <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                Año del Vehículo <span className='text-red-500'>*</span>
              </label>
              <input
                type='year'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Ej: 2015'
                disabled={loading}
              />
              {errors.name && (
                <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                Patente del Vehículo <span className='text-red-500'>*</span>
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
                placeholder='Ej: AF 123 CD'
                disabled={loading}
              />
              {errors.name && (
                <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
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
              {loading ? 'Creando...' : 'Crear Vehículo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewVehicleModal