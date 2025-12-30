import React from 'react'
import { X, User, Phone, Mail, Calendar, Car } from 'lucide-react'

const ViewClientModal = ({ isOpen, onClose, client, onEdit }) => {

  if (!isOpen || !client) return null
  
  const handleClose = () => {
    onClose()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible'
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
        <div className='flex justify-between items-center p-6 border-b border-gray-200 bg-linear-to-r from-blue-50 to-indigo-50'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900'>Detalles del Cliente</h2>
            <span className='inline-block mt-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
              ID: #{client.id}
            </span>
          </div>
          <button
            onClick={handleClose}
            className='text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-white rounded'
          >
            <X size={24} />
          </button>
        </div>

        <div className='p-6'>
          <div className='mb-6'>
            <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3'>
              Información Personal
            </h3>
            <div className='space-y-3'>
              <div className='flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                <User className='text-blue-500 mt-1' size={20} />
                <div className='flex-1'>
                  <p className='text-xs font-medium text-gray-500 uppercase'>Nombre completo</p>
                  <p className='text-base text-gray-900 font-medium'>{client.name}</p>
                </div>
              </div>

              <div className='flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                <Phone className='text-green-500 mt-1' size={20} />
                <div className='flex-1'>
                  <p className='text-xs font-medium text-gray-500 uppercase'>Teléfono</p>
                  <p className='text-base text-gray-900 font-medium'>{client.cellphone}</p>
                </div>
              </div>

              <div className='flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                <Mail className='text-purple-500 mt-1' size={20} />
                <div className='flex-1'>
                  <p className='text-xs font-medium text-gray-500 uppercase'>Email</p>
                  <p className='text-base text-gray-900 font-medium'>
                    {client.email || <span className='text-gray-400 italic'>No especificado</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='mb-6'>
            <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3'>
              Estadísticas
            </h3>
            <div className='grid grid-cols-1 gap-3'>
              <div className='bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200'>
                <div className='flex items-center gap-3'>
                  <div className='bg-blue-500 p-2 rounded-lg'>
                    <Car className='text-white' size={20} />
                  </div>
                  <div className='flex-1'>
                    <p className='text-xs font-medium text-blue-700 uppercase'>Vehículos</p>
                    <p className='text-2xl font-bold text-blue-900'>
                      {client.vehicles?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3'>
              Historial
            </h3>
            <div className='space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200'>
              <div className='flex items-center gap-2 text-sm'>
                <Calendar className='text-gray-400' size={16} />
                <span className='text-gray-600'>Registrado:</span>
                <span className='text-gray-900 font-medium'>
                  {formatDate(client.created_at)}
                </span>
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <Calendar className='text-gray-400' size={16} />
                <span className='text-gray-600'>Última actualización:</span>
                <span className='text-gray-900 font-medium'>
                  {formatDate(client.updated_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex gap-3 p-6 bg-gray-50 border-t border-gray-200'>
          <button
            onClick={handleClose}
            className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors font-medium'
          >
            Cerrar
          </button>
          {onEdit && (
            <button
              onClick={() => {
                onEdit(client)
                handleClose()
              }}
              className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
            >
              Editar Cliente
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewClientModal