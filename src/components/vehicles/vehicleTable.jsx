import React, { useState } from 'react'
import { Eye, Edit, Trash2, User } from 'lucide-react'
import ViewVehicleModal from './viewVehicleModal'

const VehicleTable = ({ vehicles = [], onEdit, onDelete, loading = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay vehículos registrados</p>
        <p className="text-gray-400 text-sm mt-2">Comienza agregando un nuevo vehículo</p>
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
                Patente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Marca
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Modelo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Año
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map((vehicle, index) => (
              <tr 
                key={vehicle.id} 
                className={`hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{vehicle.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium uppercase">
                  {vehicle.plate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vehicle.brand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {vehicle.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {vehicle.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User size={16} className="text-gray-400" />
                    <span>{vehicle.client?.name || 'Sin asignar'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedVehicle(vehicle)
                        setIsModalOpen(true)
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors"
                      aria-label="Ver vehículo"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onEdit(vehicle)}
                      className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors"
                      aria-label="Editar vehículo"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(vehicle)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors"
                      aria-label="Eliminar vehículo"
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
        {vehicles.map((vehicle) => (
          <div 
            key={vehicle.id} 
            className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg uppercase">{vehicle.plate}</h3>
                <p className="text-sm text-gray-500">{vehicle.brand} {vehicle.model}</p>
              </div>
              <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {vehicle.year}
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-500">Cliente:</span>
                <span className="text-sm text-gray-900">{vehicle.client?.name || 'Sin asignar'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">ID:</span>
                <span className="text-sm text-gray-900">#{vehicle.id}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => {
                  setSelectedVehicle(vehicle)
                  setIsModalOpen(true)
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                <Eye size={16} />
                Ver
              </button>
              <button
                onClick={() => onEdit(vehicle)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors text-sm font-medium"
              >
                <Edit size={16} />
                Editar
              </button>
              <button
                onClick={() => onDelete(vehicle)}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ViewVehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicle={selectedVehicle}
        onEdit={onEdit}
      />

    </>
  )
}

export default VehicleTable