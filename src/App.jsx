import { Route, Routes } from 'react-router-dom';
import Home from './pages/public/home';
import Login from './pages/public/login';
import CreateUser from './pages/private/createUser';
import PrivateRoute from "./routes/privateRoute";

function App() {
  return (
    <Routes>
      {/* públicas */}
      <Route path="/login" element={<Login />} />

      {/* privadas */}
      <Route path="/" element={ <PrivateRoute> <Home/> </PrivateRoute> }/>
      <Route path="/users/new" element={ <PrivateRoute> <CreateUser/> </PrivateRoute> }/>
    </Routes>
  );
}

export default App
