import React, { useState } from 'react'
import { Search, Car } from 'lucide-react'
import NewVehicleModal from './newVehicleModal'
import api from '../../api/axios'

const VehicleHeader = ({ onSearch, onVehicleCreated, clients = [], clientsLoading = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleCreateVehicle = async (vehicleData) => {
    try {
      const response = await api.post("/vehicles", {
        client_id: vehicleData.client_id,
        brand: vehicleData.brand,
        model: vehicleData.model,
        year: vehicleData.year,
        plate: vehicleData.plate

      })

      if (onVehicleCreated) {
        onVehicleCreated(response.data)
      }

      alert("Vehiculo creado con éxito")
      
    } catch (error) {
      console.error("Error al crear vehiculo:", error)
      
      if (error.response) {
        alert(`Error: ${error.response.data.detail || "No se pudo crear el vehiculo"}`)
      } else {
        alert("No se pudo conectar con el servidor")
      }   
      throw error
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-center tracking-wide text-gray-900 mb-6 mt-6">
          Gestión de Vehiculos 
        </h1>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-6xl mx-auto">
          
          <div className="flex items-center w-full md:flex-1 bg-white rounded-lg shadow-md border border-gray-200 px-4 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-2"/>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por patente, modelo, marca o año..."
              className="w-full p-2 border-none focus:outline-none focus:ring-0 bg-transparent text-gray-800"
            />
          </div>
          
          <button 
            onClick={() => !clientsLoading && setIsModalOpen(true)}
            disabled={clientsLoading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg whitespace-nowrap ${clientsLoading ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {clientsLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.6)', borderTopColor: 'transparent' }} />
                <span className="font-medium">Cargando clientes...</span>
              </>
            ) : (
              <>
                <Car className="w-5 h-5" />
                <span className="font-medium">Nuevo Vehiculo</span>
              </>
            )}
          </button>
        </div>
      </div>

      <NewVehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateVehicle}
        clients={clients}
        clientsLoading={clientsLoading}
      />
    </>
  )
}

export default VehicleHeader