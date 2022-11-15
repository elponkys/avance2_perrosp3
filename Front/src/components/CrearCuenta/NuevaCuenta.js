import React, { useEffect, useState } from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
import './../../assets/css/NuevaCuenta.css';

import { Link } from 'react-router-dom';
import constants from './../../constants.json';
import $ from 'jquery';
export function NuevaCuenta() {
	function getActualDate() {
		var fecha = new Date();
		var dia = fecha.getDate();
		var mes = fecha.getMonth() + 1;
		var anio = fecha.getFullYear();
		
		var outDia = dia;
		var outMes = mes;
		if (dia < 10) {
			outDia = '0' + dia.toString();
		}
		if (mes < 10) {
			outMes = '0' + mes.toString();
		}
		
		return [anio, outMes, outDia].join('-');
	}

	const renderMultimedia = (source) => {
		if (source) {
			return (
				<div className="profile-pic">
					<img src={source} alt="profilePic" id="profile-pic" />
				</div>
			);
		} else {
			return (
				<div className="profile-pic">
					<img
						src={require('../../assets/imagenes/Huella.png')}
						alt="profilePic"
						id="profile-pic"
					/>
				</div>
			);
		}
	};
	
	const [profilePic, setProfilePic] = useState(null);
	const [result, setResult] = useState(null);
	const [imageblob, setimageblob] = useState(null);
	const imageHandleChange = (e) => {
		if (e.target.files) {
			//const filearray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
			setimageblob(e.target.files[0]);
			console.log(imageblob);
		}
		//console.log(e.target.files[0]);
		setProfilePic(URL.createObjectURL(e.target.files[0]));
	};
	
	const createAccountHandler = async (e) => {
		e.preventDefault();
		const name = $('#nombre').val();
		const email = $('#correo').val();
		const contra = $('#psw').val();
		
		const validName = /^[a-zA-Z ]{1,}$/;
		const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		
		if (name === '' || email === '' || contra === '') {
			alert('Llene los campos vacios.');
		} else if (contra.length > 15) {
			alert('La contraseña debe tener menos de 15 caracteres');
		} else if (!validEmail.test(email)) {
			alert('Introduzca un email valido.');
		} else if (!validPassword.test(contra)) {
			alert('La contraseña debe tener mínimo letra mayuscula, una letra minuscula, un digito, un caracter especial y debe de contar con 8 o más caracteres');
		} else if (!validName.test(name)) {
			alert('El nombre no puede tener numeros ni caracteres especiales');
		} else {
			alert('');
			//const img = $('#profilePic').attr('src');
			const img = imageblob;
			const filesito = $('#profilePic')[0].files[0];
			const reader = new FileReader();
			//reader.readAsText(filesito);
			reader.addEventListener('load', async function readFile(event) {
				console.log(event.target.result);
				const nameparts = filesito.name.split('.');
				const filename = nameparts[0];
				const mime = nameparts[1];
				var profilePicData = event.target.result;
				profilePicData=profilePicData.split("base64")[1];
				
				const profilePic = {
					name: filename,
					extention: mime,
					path: profilePicData,
				};
				setResult(profilePicData);
				console.log(profilePicData);
				const body = {
					isActive: true,
					nombre: name,
					fecha: getActualDate(),
					correo: email,
					contrasenia: contra,
					image: profilePic,
				};
				
				const response = await fetch(`${constants.API_URL}/usuarios/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				});
				
				const respJson = await response.json();
				console.log(respJson);
				if (respJson.success) {
				}
			});
			reader.readAsDataURL(filesito);
		}
	};
	
	return (
		<>
			<div class="wrapper">
				<div class="title-text">
					<div class="title signup">Crear cuenta</div>
				</div>
				<div class="form-container">
					<div class="form-inner">
						<form class="login" onSubmit={createAccountHandler}>
							<div class="img">
								<div class="img2">
									<input
										id="profilePic"
										name="profilePic"
										type="file"
										accept=".jpeg, .jpg, .png, .bmp"
										onChange={imageHandleChange}
									/>
									<img src={profilePic} />
								</div>
							</div>
							<div class="field">
								<input
									type="text"
									placeholder="Nombre"
									id="nombre"
									name="nombre"
									required
								/>
							</div>
							<div class="field">
								<input
									type="email"
									placeholder="Correo electronico"
									id="correo"
									name="email"
									required
								/>
							</div>
							<div class="field">
								<input
									type="password"
									placeholder="Contraseña"
									id="psw"
									name="contraseña"
									pattern="(?=.*\d)(?=.*[?;:.,])(?=.*[A-Z]).{8,}"
									title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
									required
								/>
							</div>
							<div class="field">
								<input
									type="text"
									placeholder="Servicios"
									name="servicios"
									required
								/>
							</div>
							<div class="field btn">
								<div class="btn-layer">
									<input type="submit" name="submit" value="Registrar" />
									<Link to="/PaginaPrincipal"> </Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default NuevaCuenta;