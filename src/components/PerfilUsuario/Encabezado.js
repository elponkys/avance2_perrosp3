import React from 'react';
import './../../assets/css/perfilusuario.css';

class Encabezado extends React.Component {
	render(){
		return(
			<div className='EncabezadoW'>
				<div id="Encabezado">
					<img id="Avatar" src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"/>
					<h1 id="Username">Nombre del Usuario</h1>
				</div>
				
				<ul id="Informacion_Usuario"> 
					<li className='Elemento_Info'>
						<div className='Nombre_Completo'>Nombre Completo</div>
					</li>
					<li className='Elemento_Info'>
						<a href="https://www.google.com.mx/maps">Ubicacion</a>
					</li>
					<li className='Elemento_Info'>
						<a href="mailto:correo@gmail.com">correo@gmail.com</a>
					</li>
					<li className='Elemento_Info'>
						<a href="https://facebook.com/Nombre">Facebook</a>
					</li>
					<li className='Elemento_Info'>
						<div className='Contacto'>8119047599</div>
					</li>
				</ul>
			</div>
		);
	}
}

export default Encabezado;