import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';
import constants from '../../constants.json'
import './../../assets/css/perfilusuario.css';

export function Encabezado(){
	const location = useLocation();
	
	async function preLoad(){
		const userID = location.pathname.split('/')[2];
		const response = await fetch(`${constants.API_URL}/usuarios/${userID}`);
		const user = await response.json();
		if(user.success){
			let service = user.data.servicio;
			$('#service').html(service);
		}
	}
	
	useEffect(() => {
		preLoad();
	}, []);
	
	return(
		<>
		<div id="Contenedor">
			<div id="Servicios">
				<h3 id="Titulo_Servicios">Servicio</h3>
				<ul id="Servicios_Usuario"> 
					
					<li className='Elemento_Servicio'>
						<div className='Servicio' id="service">Estetica Canina</div>
					</li>
					
				</ul>
			</div>
		</div>
		</>
	);
}

export default Encabezado;