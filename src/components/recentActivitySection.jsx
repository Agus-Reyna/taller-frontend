import React from 'react'
import { CheckCircle, Calendar, Package } from 'lucide-react'

const activities = [
  {
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    title: "Vehículo Toyota Corolla completado",
    time: "Hace 2 horas"
  },
  {
    icon: <Calendar className="w-5 h-5 text-blue-500" />,
    title: "Nuevo turno programado para mañana",
    time: "Hace 4 horas"
  },
  {
    icon: <Package className="w-5 h-5 text-orange-500" />,
    title: "Repuesto pendiente de llegada",
    time: "Hace 6 horas"
  }
]

const RecentActivitySection = () => {
  return (
    <div id="actividad-reciente" className="py-16 px-6 bg-gray-50 scroll-mt-20">
      <div className="max-w-4xl mx-auto">      
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900">
              Actividad Reciente
            </h2>
          </div>

          {activities.map((activity, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-6 hover:bg-gray-50 transition-colors duration-200 ${
                index !== activities.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="shrink-0 mt-1">
                {activity.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-medium">
                  {activity.title}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentActivitySection
