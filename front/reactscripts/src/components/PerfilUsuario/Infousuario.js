import React from 'react';
import './../../assets/css/perfilusuario.css';


class Encabezado extends React.Component{


    render(){
       
        return(
            
            <div id="Contenedor">

            <div id="Servicios">
            
            <h3 id="Titulo_Servicios">Servicios</h3>

            <ul id="Servicios_Usuario"> 
            
            <li className='Elemento_Servicio'>
                <div className='Servicio'>Estetica Canina</div>
            </li>

            <li className='Elemento_Servicio'>
                <div className='Servicio'>Comida para mascotas</div>
            </li>

            </ul>

            </div>

            </div>
  

        );


    }


}

export default Encabezado;