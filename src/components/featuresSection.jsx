import React from 'react'
import { Users, Car, Calendar, Wrench, UserCog } from 'lucide-react'

const features = [
  {
    icon: <Users className="w-12 h-12 text-blue-500" />,
    title: "Clientes",
    description: "Gestiona la información de tus clientes y su historial de servicios",
    href: "/clientes"
  },
  {
    icon: <Car className="w-12 h-12 text-blue-500" />,
    title: "Vehículos",
    description: "Administra el registro de vehículos y su estado de mantenimiento",
    href: "/vehiculos"
  },
  {
    icon: <Calendar className="w-12 h-12 text-blue-500" />,
    title: "Turnos",
    description: "Organiza y visualiza los turnos programados del taller",
    href: "/turnos"
  },
  {
    icon: <Wrench className="w-12 h-12 text-blue-500" />,
    title: "Servicios",
    description: "Controla los servicios disponibles y trabajos en progreso",
    href: "/servicios"
  },
  {
    icon: <UserCog className="w-12 h-12 text-blue-500" />,
    title: "Usuarios",
    description: "Administra los permisos y accesos del personal del taller",
    href: "/usuarios"
  }
]

const FeaturesSection = () => {
  return (
    <div id="acceso-rapido" className="py-16 px-6 bg-gray-50 scroll-mt-18">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <a
              key={index}
              href={feature.href}
              className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-4 text-blue-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Ver más →
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
