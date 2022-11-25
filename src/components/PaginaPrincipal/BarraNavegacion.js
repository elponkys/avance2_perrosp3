import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import constants from './../../constants.json';
import Cookies from 'universal-cookie';
import $ from 'jquery';
import './../../assets/css/paginaprincipal.css';

export function BarraNavegacion() {
	const location = useLocation();
	const navigate = useNavigate();
	const cookies = new Cookies();
	const isLoggedIn = cookies.get(constants.CookieIsLogedIn);
	const isAdmin = cookies.get(constants.CookieIsAdmin);
	const urlParams = new URLSearchParams(location.search);
	const searchRequest = urlParams.get('s');
	
	useEffect(() => {
		$('#busqueda').val(searchRequest);
		async function preLoad(){
			var url;
			if (isAdmin === 'true') {
				url = `${constants.API_URL}/administradores/${cookies.get(constants.CookieUserID)}`;
			}
			else {
				url = `${constants.API_URL}/usuarios/${cookies.get(constants.CookieUserID)}`;
			}
			const response = await fetch(url);
			const userLogged = await response.json();
			if (userLogged.success) {
				let userName = userLogged.data.nombre;
				if(isAdmin === 'true'){
					userName = constants.AdminCharacter.concat(' ' + userName);
				} else {
					if (userLogged.data.status === 2) {
						userName = constants.VerifiedCharacter.concat(' ' + userName);
					}
				}
				let userImage = userLogged.data.image.path;
				$('#userName').html(userName);
				$('#profilePic').attr('src', userImage);
				$('#profilePic').attr('alt', userLogged.data.image.name);
			}
		}
		if(isLoggedIn === 'true'){
			preLoad();
		}
	}, []);
	
	const logOut = () => {
		cookies.remove(constants.CookieUserID);
		cookies.remove(constants.CookieIsAdmin);
		cookies.set(constants.CookieIsLogedIn, false, { path: '/' });
		navigate('/');
		return;
	};
	
	const busqueda = () => {
		let searchTerms = $('#busqueda').val();
		if(searchTerms){
			navigate(`/Busqueda?s=${searchTerms}`);
			if(location.pathname.includes('Busqueda')) {
				window.location.reload();
			}
		}
	};
	
	return(
		<>
		<div className='Barra-navegacion'>
			<Link to = "/">
				<button type="button" className='btn btn-danger'>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='bi bi-house' viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
						<path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
					</svg>
				</button>
			</Link>
			<div id="Barra">
				<input type="text" name="Buscador" placeholder="Busqueda" className='form-control' id='busqueda'/>
			</div>
			<button type="submit" className='btn btn-danger' onClick={busqueda}>Buscar</button> 
			
			{isLoggedIn === 'true' ? (
				<>
				<div className='Foto_perfil'>
					<Link to={`/Perfil/${cookies.get(constants.CookieUserID)}`}>
						<img src="https://cdn-icons-png.flaticon.com/512/428/428933.png" id="profilePic"/>
						<div id="userName"></div>
					</Link>
				</div>
				<button type="button" className='btn btn-danger' onClick={logOut}>
					Cerrar sesión
				</button>
				</>
			) : (
				<>
				<Link to = "/InicioSesion">
					<button type="button" className='btn btn-danger'>
						Iniciar sesión
					</button>
				</Link>
				</>
			)}
			
		</div>
		</>
	);
}

export default BarraNavegacion;