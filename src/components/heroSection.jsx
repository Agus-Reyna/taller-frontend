import React from 'react'
import tallerImage from '../assets/taller-mecanico.jpeg'

const HeroSection = () => {
  return (
    <div 
      className="relative flex flex-col items-center min-h-100 lg:min-h-125"
      style={{
        backgroundImage: `url(${tallerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-40">
        <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide text-white">
          Bienvenido a
          <span className="font-bold bg-linear-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
            {" "}
            AutoTaller
          </span>
        </h1>
        <p className="mt-4 text-2xl text-white text-center max-w-210 mx-auto">
          Sistema de gestión integral para talleres mecánicos. Controle clientes, vehículos, 
          turnos y servicios desde una plataforma profesional y eficiente.
        </p>
      </div>
    </div>
  )
}

export default HeroSection