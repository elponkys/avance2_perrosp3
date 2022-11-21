import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';
import constants from '../../constants.json';
import './../../assets/css/perfilusuario.css';

export function Encabezado(){
	const location = useLocation();
	
	async function preLoad(){
		const userID = location.pathname.split('/')[2];
		const response = await fetch(`${constants.API_URL}/usuarios/${userID}`);
		const userLogged = await response.json();
		if(userLogged.success){
			let userName = userLogged.data.nombre;
			let userMail = userLogged.data.correo;
			let userImage = userLogged.data.image.path;
			$('#Username').html(userName);
			$('#UserFullname').html(userName);
			$('#Avatar').attr('src', userImage);
			$('#userMail').html(userMail);
		}
	}
	
	useEffect(() => {
		preLoad();
	}, []);
	
	return(
		<>
		<div className='EncabezadoW'>
			<div id="Encabezado">
				<img id="Avatar" src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"/>
				<h1 id="Username">Nombre del Usuario</h1>
			</div>
			
			<ul id="Informacion_Usuario"> 
				<li className='Elemento_Info'>
					<div className='Nombre_Completo' id="UserFullname">Nombre Completo</div>
				</li>
				
				<li className='Elemento_Info'>
					<div id="userMail">correo@gmail.com</div>
				</li>
				
			</ul>
		</div>
		</>
	);
}

export default Encabezado;