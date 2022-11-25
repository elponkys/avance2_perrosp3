import React, { isValidElement } from 'react';
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
		const userType = $('#logInType').find(':selected').attr('id');
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
		var url = `${constants.API_URL}/usuarios?e=${emailInput}&p=${passwordInput}`;
		
		if (userType == 1) {
			url = `${constants.API_URL}/administradores?e=${emailInput}&p=${passwordInput}`;
		}
		
		const response = await fetch(url, {
			// headers: { 'authorization': `Bearer ${accessToken}` },
		});
		const respJson = await response.json();
		
		if (respJson.success) {
			cookies.set(constants.CookieIsAdmin, false, { path: '/' });
			if (userType == 1) {
				cookies.set(constants.CookieIsAdmin, true, { path: '/' });
				alert("Salu2 admin");
			}
			cookies.set(constants.CookieUserID, respJson.data[0]._id, { path: '/' });
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
					<br></br>
					<select class="form-select" id="logInType">
						<option id="0">Usuario común</option>
						<option id="1">Administrador</option>
					</select>
					
					<input
						className="form-control"
						type="text"
						id="usernameIt"
						placeholder="Correo"
					></input>
					
					<input
						className="form-control"
						type="password"
						id="claveIt"
						placeholder="Contraseña"
					></input>
					
					<button type="submit" className="btn btn-danger" id="btnLog">
						INGRESAR
					</button>
					
					<Link to="/NuevaCuenta">
						<button className="btn btn-danger">
							Crear cuenta
						</button>
					</Link>
				</form>
				<br></br>
			</div>
		</div>
	);
}

export default InicioSesion;