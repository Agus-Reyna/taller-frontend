import { useState, useEffect } from 'react'
import Navbar from '../../components/layout/navbar'
import Footer from '../../components/layout/footer'
import ClientHeader from '../../components/clients/clientHeader'
import ClientTable from '../../components/clients/clientTable'
import EditClientModal from '../../components/clients/editClientModal'
import api from '../../api/axios'

export default function Clients() {
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [clientToEdit, setClientToEdit] = useState(null)

  useEffect(() => {
    fetchClients()
  }, [])


  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await api.get('/clients')
      setClients(response.data)
      setFilteredClients(response.data)
    } catch (error) {
      console.error('Error al cargar clientes:', error)
      alert('No se pudieron cargar los clientes')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredClients(clients)
      return
    }

    const filtered = clients.filter(client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cellphone.includes(searchTerm) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredClients(filtered)
  }

  const handleClientCreated = (newClient) => {
    setClients(prev => [...prev, newClient])
    setFilteredClients(prev => [...prev, newClient])
  }

  const handleEdit = (client) => {
    setClientToEdit(client)
    setIsEditModalOpen(true)
  }

  const handleClientUpdated = async (clientId, updatedData) => {
    try {
      const response = await api.patch(`/clients/${clientId}`, updatedData)
      
      setClients(prev => prev.map(c => c.id === clientId ? response.data : c))
      setFilteredClients(prev => prev.map(c => c.id === clientId ? response.data : c))
      
      alert('Cliente actualizado con éxito')
    } catch (error) {
      console.error('Error al actualizar cliente:', error)
      if (error.response) {
        alert(`Error: ${error.response.data.detail || "No se pudo actualizar el cliente"}`)
      } else {
        alert('No se pudo conectar con el servidor')
      }
      throw error
    }
  }

  const handleDelete = async (client) => {
    if (!confirm(`¿Estás seguro de eliminar a ${client.name}?`)) {
      return
    }

    try {
      await api.delete(`/clients/${client.id}`)
      
      setClients(prev => prev.filter(c => c.id !== client.id))
      setFilteredClients(prev => prev.filter(c => c.id !== client.id))
      
      alert('Cliente eliminado con éxito')
    } catch (error) {
      console.error('Error al eliminar cliente:', error)
      alert('No se pudo eliminar el cliente')
    }
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ fontFamily: '"Poppins", sans-serif' }}>
      <Navbar/>
      <div className="flex-1 container mx-auto px-4 py-8">
        <ClientHeader 
          onSearch={handleSearch}
          onClientCreated={handleClientCreated}
        />
        <ClientTable 
          clients={filteredClients}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
      <EditClientModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        client={clientToEdit}
        onUpdate={handleClientUpdated}
      />
      <Footer/>
    </div>
  )
}
