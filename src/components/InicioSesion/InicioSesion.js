import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
import './../../assets/css/Iniciosesion.css';
import { Link, useNavigate } from 'react-router-dom';
import constants from './../../constants.json';
import Cookies from 'universal-cookie';
import $ from 'jquery';

export function InicioSesion() {
	const navigate = useNavigate();
	const sessionauth = async (e) => {
		e.preventDefault();
		const cookies = new Cookies();
		const emailInput = $('#usernameIt').val();
		const passwordInput = $('#claveIt').val();
		
		if (!emailInput || !passwordInput) {
			// setError('Llene los campos vacios.');
			$('.error').addClass('bounce');
			$('.error').slideDown('fast');
			
			setTimeout(function () {
				$('.error').removeClass('bounce');
			}, 1000);
			
			return;
		}
		const cookie = new Cookies();
		const accessToken = cookie.get(constants.CookieAccessToken);
		const response = await fetch(
			`${constants.API_URL}/usuarios?e=${emailInput}&p=${passwordInput}`,
			{
				// headers: { 'authorization': `Bearer ${accessToken}` },
			}
		);
		const respJson = await response.json();
		
		if (respJson.success) {
			cookies.set(constants.CookieUserID, respJson.Data[0]._id, { path: '/' });
			cookies.set(constants.CookieIsLogedIn, true, { path: '/' });
			navigate('/');
			return;
		} else {
			//setLoading(false)
			//setError('Verifique que las credenciales sean correctas.');
			$('.error').addClass('bounce');
			$('.error').slideDown('fast');
			
			setTimeout(function () {
				$('.error').removeClass('bounce');
			}, 1000);
			
			return;
		}
	};
	
	return (
		<div className="mainContenedor">
			<div className="Login">
				<h1>Inicia sesion</h1>
				
				<form onSubmit={sessionauth} className="Formulario">
					<input
						className="form-control"
						type="text"
						id="usernameIt"
						placeholder="Correo"
					></input>
					<br></br>
					
					<input
						className="form-control"
						type="password"
						id="claveIt"
						placeholder="Contraseña"
					></input>
					
					<br></br>
					<button type="submit" className="btn btn-danger" id="btnLog">
						INGRESAR
					</button>
					
				</form>
				
				<br></br>
				<Link to="/NuevaCuenta">Crear cuenta</Link>
			</div>
		</div>
	);
}

export default InicioSesion;