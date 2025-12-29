import React from 'react'
import { Calendar, Car, Users, CheckCircle } from 'lucide-react'

const metrics = [
  {
    icon: <Calendar className="w-10 h-10 text-blue-500" />,
    value: "12",
    label: "Turnos de hoy"
  },
  {
    icon: <Car className="w-10 h-10 text-green-500" />,
    value: "8",
    label: "Vehículos en servicio"
  },
  {
    icon: <Users className="w-10 h-10 text-purple-500" />,
    value: "243",
    label: "Clientes registrados"
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-orange-500" />,
    value: "1,847",
    label: "Servicios completados"
  }
]

const MetricsSection = () => {
  return (
    <div id="metricas" className="py-16 px-6 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-4">
                {metric.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {metric.value}
              </div>
              <div className="text-gray-600 text-sm font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MetricsSection
