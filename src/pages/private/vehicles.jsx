import { useState, useEffect } from 'react'
import Navbar from '../../components/layout/navbar'
import Footer from '../../components/layout/footer'
import VehicleHeader from '../../components/vehicles/vehicleHeader'
import VehicleTable from '../../components/vehicles/vehicleTable'
import EditVehicleModal from '../../components/vehicles/editVehicleModal'
import api from '../../api/axios'

export default function Vehicles(){
  const [vehicles, setVehicles] = useState([])
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [vehicleToEdit, setVehicleToEdit] = useState(null)
  
  useEffect(() => {
    fetchVehicles()
  }, [])


  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const response = await api.get('/vehicles')
      setVehicles(response.data)
      setFilteredVehicles(response.data)
    } catch (error) {
      console.error('Error al cargar vehiculos:', error)
      alert('No se pudieron cargar los vehiculos')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredVehicles(vehicles)
      return
    }

    const filtered = vehicles.filter(vehicle =>
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.year.includes(searchTerm)
    )
    setFilteredVehicles(filtered)
  }

  const handleVehicleCreated = (newVehicle) => {
    setVehicles(prev => [...prev, newVehicle])
    setFilteredVehicles(prev => [...prev, newVehicle])
  }
  
  const handleEdit = (vehicle) => {
    setVehicleToEdit(vehicle)
    setIsEditModalOpen(true)
  }

  const handleVehicleUpdated = async (vehicleId, updatedData) => {
    try {
      const response = await api.patch(`/vehicles/${vehicleId}`, updatedData)
      
      setVehicles(prev => prev.map(c => c.id === vehicleId ? response.data : c))
      setFilteredVehicles(prev => prev.map(c => c.id === vehicleId ? response.data : c))
      
      alert('Vehículo actualizado con éxito')
    } catch (error) {
      console.error('Error al actualizar vehículo:', error)
      if (error.response) {
        alert(`Error: ${error.response.data.detail || "No se pudo actualizar el vehículo"}`)
      } else {
        alert('No se pudo conectar con el servidor')
      }
      throw error
    }
  }

  const handleDelete = async (vehicle) => {
    if (!confirm(`¿Estás seguro de eliminar al vehiculo con patente: ${vehicle.plate}?`)) {
      return
    }

    try {
      await api.delete(`/vehicles/${vehicle.id}`)
      
      setVehicles(prev => prev.filter(c => c.id !== vehicle.id))
      setFilteredVehicles(prev => prev.filter(c => c.id !== vehicle.id))
      
      alert('Vehículo eliminado con éxito')
    } catch (error) {
      console.error('Error al eliminar Vehículo:', error)
      alert('No se pudo eliminar el Vehículo')
    }
  }
  
  return (
   <div className="flex flex-col min-h-screen" style={{ fontFamily: '"Poppins", sans-serif' }}>
      <Navbar/>
      <div className="flex-1 container mx-auto px-4 py-8">
        <VehicleHeader
          onSearch={handleSearch}
          onVehicleCreated={handleVehicleCreated}
        />
        <VehicleTable 
          vehicles={filteredVehicles}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
      <EditVehicleModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        vehicle={vehicleToEdit}
        onUpdate={handleVehicleUpdated}
      />
      <Footer/> 
    </div>
  )
} 