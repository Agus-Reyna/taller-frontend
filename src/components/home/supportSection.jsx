import React from 'react'
import { HeadphonesIcon } from 'lucide-react'

const SupportSection = () => {
  return (
    <div id="soporte" className="py-16 px-6 bg-gray-50 scroll-mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <HeadphonesIcon className="w-12 h-12 text-blue-500" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ¿Necesitás ayuda?
        </h2>
        
        <p className="text-gray-600 text-lg mb-6">
          Nuestro equipo de soporte está disponible para resolver cualquier consulta o inconveniente.
        </p>
        
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 inline-flex items-center gap-2">
          Contactar Soporte
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

export default SupportSection
