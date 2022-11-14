
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom"

import BarraNavegacion from './components/PaginaPrincipal/BarraNavegacion';
import Publicaciones from './components/PaginaPrincipal/Publicaciones';
import Encabezado from './components/PerfilUsuario/Encabezado';
import Infousuario from './components/PerfilUsuario/Infousuario';
import Botones from './components/PerfilUsuario/Botones';
import InicioSesion from './components/InicioSesion/InicioSesion';
import PublicacionesPerfil from "./components/PerfilUsuario/PublicacionesPerfil";

import PublicacionyReseñas from "./components/PaginaPrincipal/PublicacionyReseñas";

import "bootstrap/dist/css/bootstrap.min.css";
import './assets/css/Style.css';


function App() {

  return (
    
      <div className="Contenedor-base">
      
      <Router>

      <Routes>

      <Route path ="/Publicaciones/Reseñas" element = {<><BarraNavegacion/><PublicacionyReseñas /></>}  > </Route>

        <Route path ="/Perfil/Publicaciones" element = {<><BarraNavegacion/><Encabezado /><Botones /><PublicacionesPerfil /></>}  > </Route>

        <Route path ="/PaginaPrincipal" element = {<><BarraNavegacion /><Publicaciones /></>}  > </Route>

        <Route path ="/Perfil" element = {<><BarraNavegacion/><Encabezado /><Botones /><Infousuario /></>} > </Route>

        <Route path ="/" element = {<InicioSesion/>}  > </Route>
        

      </Routes>

      

      </Router>
      
    

      <footer>

      <div > 2021 Todos los derechos reservados </div>
      <div > Contacto: Tel:8118047600 Correo:Mascotas@gmail.com </div>
      <div > Informacion Compañia | Privacion y Politica | Terminos y Condiciones </div>

      </footer>

      </div>

  
  );
}

export default App;
