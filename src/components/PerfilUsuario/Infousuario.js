import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import $ from 'jquery';
import constants from '../../constants.json'
import './../../assets/css/perfilusuario.css';

export function Encabezado(){
	const location = useLocation();
	const cookies = new Cookies();
	const isAdmin = cookies.get(constants.CookieIsAdmin);
	
	async function preLoad(){
		const userID = location.pathname.split('/')[2];
		var url;
		if (isAdmin === 'true') {
			url = `${constants.API_URL}/administradores/${userID}`;
		} else {
			url = `${constants.API_URL}/usuarios/${userID}`;
		}
		const response = await fetch(url);
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