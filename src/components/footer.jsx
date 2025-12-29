import React from 'react'

const Footer = () => {
  const navItems = [
    { name: "Acceso Rápido", href: "#acceso-rapido" },
    { name: "Métricas", href: "#metricas" },
    { name: "Actividad Reciente", href: "#actividad-reciente" },
    { name: "Soporte", href: "#soporte" }
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-5 px-6">
      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center shrink-0">
            <span className="text-4xl tracking-tight font-bold bg-linear-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              AutoTaller
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-blue-400 font-light transition-all duration-300 px-4 py-2.5 rounded-lg hover:bg-gray-800 hover:scale-105 inline-block whitespace-nowrap tracking-wider text-base"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="text-gray-400 text-sm">
            © 2025 AutoTaller. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
