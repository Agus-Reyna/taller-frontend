import React, { useState } from 'react'
import { Eye, Edit, Trash2, Car } from 'lucide-react'
import ViewClientModal from './viewClientModal'

const ClientTable = ({ clients = [], onEdit, onDelete, loading = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!clients || clients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay clientes registrados</p>
        <p className="text-gray-400 text-sm mt-2">Comienza agregando un nuevo cliente</p>
      </div>
    )
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Vehículos
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client, index) => (
              <tr 
                key={client.id} 
                className={`hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{client.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {client.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {client.cellphone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {client.email || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Car size={16} className="text-gray-400" />
                    <span>{client.vehicles?.length || 0}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedClient(client)
                        setIsModalOpen(true)
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors"
                      aria-label="Ver cliente"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onEdit(client)}
                      className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors"
                      aria-label="Editar cliente"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(client)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors"
                      aria-label="Eliminar cliente"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {clients.map((client) => (
          <div 
            key={client.id} 
            className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{client.name}</h3>
                <p className="text-sm text-gray-500">ID: #{client.id}</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                <Car size={14} />
                <span>{client.vehicles?.length || 0}</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Teléfono:</span>
                <span className="text-sm text-gray-900">{client.cellphone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Email:</span>
                <span className="text-sm text-gray-900">{client.email || '-'}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => {
                  setSelectedClient(client)
                  setIsModalOpen(true)
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                <Eye size={16} />
                Ver
              </button>
              <button
                onClick={() => onEdit(client)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors text-sm font-medium"
              >
                <Edit size={16} />
                Editar
              </button>
              <button
                onClick={() => onDelete(client)}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ViewClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        client={selectedClient}
        onEdit={onEdit}
      />

    </>
  )
}

export default ClientTable