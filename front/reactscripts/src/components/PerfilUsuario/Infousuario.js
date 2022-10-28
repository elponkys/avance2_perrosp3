import React from 'react';
//import './../../assets/css/perfilusuario.css';


class Encabezado extends React.Component{


    render(){
       
        return(
            
            <div id="Contenedor">

            <div id="Botones">
                
                <button type = "submit" className='btn btn-danger' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='bi bi-house' viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                        <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                        </svg> Publicaciones </button> 

                <button type = "submit" className='btn btn-danger'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='bi bi-clipboard' viewBox="0 0 16 16">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg> Informacion </button> 


            </div>
            
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