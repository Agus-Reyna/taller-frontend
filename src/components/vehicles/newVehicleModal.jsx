import React, { useState } from 'react'
import { X } from 'lucide-react'

const NewVehicleModal= ({ isOpen, onClose, onSubmit, clients = [], clientsLoading = false }) => {
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
    
    if (!formData.client_id) {
      newErrors.client_id = 'Debe seleccionar un cliente'
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'La marca es requerida'
    } else if (formData.brand.trim().length < 2) {
      newErrors.brand = 'La marca debe tener al menos 2 caracteres'
    }

    if (!formData.model.trim()) {
      newErrors.model = 'El modelo es requerido'
    } else if (formData.model.trim().length < 1) {
      newErrors.model = 'El modelo es obligatorio'
    }

    const currentYear = new Date().getFullYear()
    const year = parseInt(formData.year)
    if (!formData.year) {
      newErrors.year = 'El año es requerido'
    } else if (isNaN(year) || year < 1900 || year > currentYear + 1) {
      newErrors.year = `El año debe estar entre 1900 y ${currentYear + 1}`
    }

    if (!formData.plate || formData.plate.trim().length === 0) {
      newErrors.plate = 'La patente es requerida'
    } else {
      const plateNoSpaces = formData.plate.replace(/\s/g, '')
      const plateRegex = /^[A-Z]{2,3}\d{3}[A-Z]{0,3}$/i
      if (!plateRegex.test(plateNoSpaces) || plateNoSpaces.length < 6 || plateNoSpaces.length > 9) {
        newErrors.plate = 'Formato inválido (Ej: ABC123 o AB123CD)'
      }
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

      setFormData({ client_id: '', brand: '', model: '', year: '', plate: '' })
      setErrors({})
      onClose()
    } catch (error) {
      console.error('Error al crear vehiculo:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({ client_id: '', brand: '', model: '', year: '', plate: '' })
    setErrors({})
    onClose()
  }

  return (
    <div 
      className='fixed inset-0 backdrop-blur-sm flex justify-center items-center z-60 p-4'
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
              <label htmlFor='client_id' className='block text-sm font-medium text-gray-700 mb-1'>
                Cliente <span className='text-red-500'>*</span>
              </label>
              <select
                id='client_id'
                name='client_id'
                value={formData.client_id}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.client_id ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading || clientsLoading}
              >
                {clientsLoading ? (
                  <option value='' disabled>
                    Cargando clientes...
                  </option>
                ) : clients.length === 0 ? (
                  <option value='' disabled>
                    No hay clientes
                  </option>
                ) : (
                  <option value='' disabled hidden>
                    Seleccionar cliente
                  </option>
                )}

                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name} - {client.cellphone}
                  </option>
                ))}
              </select>
              {errors.client_id && (
                <p className='text-red-500 text-sm mt-1'>{errors.client_id}</p>
              )}
            </div>

            <div>
              <label htmlFor='brand' className='block text-sm font-medium text-gray-700 mb-1'>
                Marca del Vehículo <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='brand'
                name='brand'
                value={formData.brand}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.brand ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Ej: Toyota'
                disabled={loading}
              />
              {errors.brand && (
                <p className='text-red-500 text-sm mt-1'>{errors.brand}</p>
              )}
            </div>

            <div>
              <label htmlFor='model' className='block text-sm font-medium text-gray-700 mb-1'>
                Modelo del Vehículo <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='model'
                name='model'
                value={formData.model}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.model ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Ej: Corolla'
                disabled={loading}
              />
              {errors.model && (
                <p className='text-red-500 text-sm mt-1'>{errors.model}</p>
              )}
            </div>

            <div>
              <label htmlFor='year' className='block text-sm font-medium text-gray-700 mb-1'>
                Año del Vehículo <span className='text-red-500'>*</span>
              </label>
              <input
                type='number'
                id='year'
                name='year'
                value={formData.year}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.year ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Ej: 2015'
                min='1900'
                max={new Date().getFullYear() + 1}
                disabled={loading}
              />
              {errors.year && (
                <p className='text-red-500 text-sm mt-1'>{errors.year}</p>
              )}
            </div>

            <div>
              <label htmlFor='plate' className='block text-sm font-medium text-gray-700 mb-1'>
                Patente del Vehículo <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='plate'
                name='plate'
                value={formData.plate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.plate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Ej: ABC123 o AB123CD'
                maxLength='10'
                disabled={loading}
              />
              {errors.plate && (
                <p className='text-red-500 text-sm mt-1'>{errors.plate}</p>
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
              disabled={loading || clientsLoading || clients.length === 0}
            >
              {loading ? 'Creando...' : clientsLoading ? 'Cargando clientes...' : clients.length === 0 ? 'No hay clientes' : 'Crear Vehículo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewVehicleModal