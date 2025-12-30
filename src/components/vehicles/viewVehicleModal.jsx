import React from 'react'
import { X, User, Phone, Mail, Calendar } from 'lucide-react'

const ViewVehicleModal = ({ isOpen, onClose, vehicle, onEdit }) => {

  if (!isOpen || !vehicle) return null
  
  const handleClose = () => {
    onClose()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible'
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const time = date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    return `${day}/${month}/${year}, ${time}`
  }
  
  return (
    <div 
      className='fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4'
      onClick={handleClose}
    >
      <div 
        className='bg-white rounded-lg shadow-xl w-full max-w-lg border-2 border-gray-300'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center p-4 border-b border-gray-200 bg-linear-to-r from-blue-50 to-indigo-50'>
          <div>
            <h2 className='text-xl font-bold text-gray-900 uppercase'>{vehicle.plate}</h2>
            <p className='text-sm text-gray-600'>{vehicle.brand} {vehicle.model} • {vehicle.year}</p>
          </div>
          <button
            onClick={handleClose}
            className='text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-white rounded'
          >
            <X size={20} />
          </button>
        </div>

        <div className='p-4'>
          <div className='mb-4'>
            <h3 className='text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2'>
              Propietario
            </h3>
            <div className='space-y-2'>
              <div className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors'>
                <User className='text-blue-500 shrink-0' size={18} />
                <div className='flex-1 min-w-0'>
                  <p className='text-sm text-gray-900 font-medium truncate'>{vehicle.client?.name || 'Sin asignar'}</p>
                </div>
              </div>

              {vehicle.client && (
                <>
                  <div className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors'>
                    <Phone className='text-green-500 shrink-0' size={18} />
                    <p className='text-sm text-gray-900'>{vehicle.client.cellphone}</p>
                  </div>

                  {vehicle.client.email && (
                    <div className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors'>
                      <Mail className='text-purple-500 shrink-0' size={18} />
                      <p className='text-sm text-gray-900 truncate'>{vehicle.client.email}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className='text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2'>
              Historial
            </h3>
            <div className='space-y-1 bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs'>
              <div className='flex items-center gap-2'>
                <Calendar className='text-gray-400 shrink-0' size={14} />
                <span className='text-gray-600'>Registrado:</span>
                <span className='text-gray-900 font-medium'>{formatDate(vehicle.created_at)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Calendar className='text-gray-400 shrink-0' size={14} />
                <span className='text-gray-600'>Actualizado:</span>
                <span className='text-gray-900 font-medium'>{formatDate(vehicle.updated_at)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex gap-3 p-4 bg-gray-50 border-t border-gray-200'>
          <button
            onClick={handleClose}
            className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors font-medium'
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              handleClose()
              onEdit(vehicle)
            }}
            className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
          >
            Editar Vehículo
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewVehicleModal