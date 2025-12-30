import { Route, Routes } from 'react-router-dom';
import Home from './pages/private/home';
import Login from './pages/public/login';
import CreateUser from './pages/private/createUser';
import Clients from './pages/private/clients';
import Vehicles from './pages/private/vehicles';
import PrivateRoute from "./routes/privateRoute";

function App() {
  return (
    <Routes>
      {/* públicas */}
      <Route path="/login" element={<Login />} />

      {/* privadas */}
      <Route path="/" element={ <PrivateRoute> <Home/> </PrivateRoute> }/>
      <Route path="/users/new" element={ <PrivateRoute> <CreateUser/> </PrivateRoute> }/>
      <Route path="/clientes" element={ <PrivateRoute> <Clients/> </PrivateRoute> }/>
      <Route path="/vehiculos" element={ <PrivateRoute> <Vehicles/> </PrivateRoute> }/>
    </Routes>
  );
}

export default App
