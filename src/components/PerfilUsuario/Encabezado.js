import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import $ from 'jquery';
import constants from '../../constants.json';
import './../../assets/css/perfilusuario.css';

export function Encabezado(){
	const location = useLocation();
	const cookies = new Cookies();
	const isAdmin = cookies.get(constants.CookieIsAdmin);
	
	useEffect(() => {
		async function preLoad(){
			const userID = location.pathname.split('/')[2];
			var url;
			if (isAdmin === 'true') {
				url = `${constants.API_URL}/administradores/${userID}`;
			} else {
				url = `${constants.API_URL}/usuarios/${userID}`;
			}
			const response = await fetch(url);
			const userLogged = await response.json();
			if(userLogged.success){
				let userMail = userLogged.data.correo;
				let userImage = userLogged.data.image.path;
				let userName = userLogged.data.nombre;
				$('#UserFullname').html(userName);
				if(isAdmin === 'true'){
					userName = userName.concat(' ' + constants.AdminCharacter);
				} else {
					if (userLogged.data.status === 2) {
						userName = userName.concat(' ' + constants.VerifiedCharacter);
					}
				}
				
				$('#Username').html(userName);
				$('#Avatar').attr('src', userImage);
				$('#userMail').html(userMail);
			}
		}
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