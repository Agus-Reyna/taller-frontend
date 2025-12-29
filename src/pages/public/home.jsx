import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Taller Mecánico</h1>
        <p className="text-xl mb-8">Sistema de Gestión</p>
        <Link 
          to="/login" 
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Ir al Login
        </Link>
        <Link 
          to="/users/new"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Crear Usuario
        </Link>
      </div>
    </div>
  );
}
