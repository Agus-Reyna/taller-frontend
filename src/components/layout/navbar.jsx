import logo from "../../assets/logo.png"
import { LogOut, User, UserPlus, Menu, X } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Acceso Rápido", href: "#acceso-rapido" },
  { label: "Métricas", href: "#metricas" },
  { label: "Actividad Reciente", href: "#actividad-reciente" }
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const handleCreateUser = () => {
    navigate("/users/new");
    setMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 py-4 bg-white shadow-md border-b border-gray-200">
      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
            <span className="text-2xl tracking-tight font-bold bg-linear-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              AutoTaller
            </span>
          </div>

          {/* Desktop */}
          <ul className="hidden lg:flex items-center space-x-2 flex-1 justify-center">
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href}
                  className="relative text-gray-700 hover:text-blue-600 font-light transition-all duration-300 group px-4 py-2.5 rounded-lg hover:scale-105 inline-block whitespace-nowrap tracking-wider text-base"
                >
                  {item.label}
                  <span className="absolute left-4 bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-[calc(100%-2rem)]"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3 flex-1 justify-end ml-8">
            <div className="flex items-center gap-2 text-gray-700 whitespace-nowrap">
              <User className="w-5 h-5 text-blue-600" />
              <span className="font-medium">
                {user?.full_name || user?.email || "Usuario"}
              </span>
            </div>

            {user?.role === "admin" && (
              <button
                onClick={handleCreateUser}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                <span className="font-medium">Crear Usuario</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Cerrar sesión</span>
            </button>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-700 py-4 px-2">
              <User className="w-5 h-5 text-blue-600" />
              <span className="font-medium">
                {user?.full_name || user?.email || "Usuario"}
              </span>
            </div>

            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href}
                    onClick={handleNavClick}
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 px-2">
              {user?.role === "admin" && (
                <button
                  onClick={handleCreateUser}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="font-medium">Crear Usuario</span>
                </button>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Cerrar sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar