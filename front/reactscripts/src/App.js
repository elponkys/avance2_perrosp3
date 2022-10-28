
import logo from './assets/imagenes/logo.svg';
import './assets/css/App.css';


import BarraNavegacion from './components/PaginaPrincipal/BarraNavegacion';
import Publicaciones from './components/PaginaPrincipal/Publicaciones';
import Encabezado from './components/PerfilUsuario/Encabezado';
import Infousuario from './components/PerfilUsuario/Infousuario';
import Botones from './components/PerfilUsuario/Botones';
import InicioSesion from './components/InicioSesion/InicioSesion';



import "bootstrap/dist/css/bootstrap.min.css";
import './assets/css/Style.css';


function App() {

  return (
    
      <div className="Contenedor-base">
      
      <BarraNavegacion/>
      <Publicaciones/>
    

      <footer>

      <div > 2021 Todos los derechos reservados </div>
      <div > Contacto: Tel:8118047600 Correo:Mascotas@gmail.com </div>
      <div > Informacion Compañia | Privacion y Politica | Terminos y Condiciones </div>

      </footer>

      </div>

  
  );
}

export default App;
