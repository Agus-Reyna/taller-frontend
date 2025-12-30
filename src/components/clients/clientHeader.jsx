import React, { useState } from 'react'
import { Search, UserPlus } from 'lucide-react'
import NewClientModal from './newClientModal'
import api from '../../api/axios'

const ClientHeader = ({ onSearch, onClientCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleCreateClient = async (clientData) => {
    try {
      const response = await api.post("/clients", {
        name: clientData.name,
        cellphone: clientData.cellphone,
        email: clientData.email || null
      })

      if (onClientCreated) {
        onClientCreated(response.data)
      }

      alert("Cliente creado con éxito")
      
    } catch (error) {
      console.error("Error al crear cliente:", error)
      
      if (error.response) {
        alert(`Error: ${error.response.data.detail || "No se pudo crear el cliente"}`)
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
          Gestión de Clientes  
        </h1>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-6xl mx-auto">
          
          <div className="flex items-center w-full md:flex-1 bg-white rounded-lg shadow-md border border-gray-200 px-4 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-2"/>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre, teléfono o email..."
              className="w-full p-2 border-none focus:outline-none focus:ring-0 bg-transparent text-gray-800"
            />
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
          >
            <UserPlus className="w-5 h-5" />
            <span className="font-medium">Nuevo Cliente</span>
          </button>
        </div>
      </div>

      <NewClientModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateClient}
      />
    </>
  )
}

export default ClientHeader