import React, { useEffect, useState } from 'react';
import constants from './../../constants.json';
//import "bootstrap/dist/css/bootstrap.min.css";
import './../../assets/css/Usuarios.css';

function Usuarios() {
	const [state, setState] = useState(false);
	const [users, setUsers] = useState([]);
	
	useEffect(() => {
		async function preLoad(){
			const response = await fetch(`${constants.API_URL}/usuarios?s=1`);
			const usersDB = await response.json();
			if (usersDB.success) {
				setUsers(usersDB.data);
				setState(true);
			}
		}
		preLoad();
	}, []);
	
	const accept = async (id) => {
		const response = await fetch(`${constants.API_URL}/usuarios/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ status: 2, }),
		});
		const respJson = await response.json();
		if(respJson.success){
			console.log(respJson.data);
			alert("El usuario " + respJson.data.nombre + " ha sido aceptado");
			return;
		}
		return;
	};
	
	const reject = async (id) => {
		const response = await fetch(`${constants.API_URL}/usuarios/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ status: 0, }),
		});
		const respJson = await response.json();
		if(respJson.success){
			console.log(respJson.data);
			alert("El usuario " + respJson.data.nombre + " ha sido rechazado");
			return;
		}
	};
	
	return (
		<>
		{state ? (<>
		{users.map((user, index) => (
		<div class="form-inner">
			<div class="img">
				<div class="img2">
					<img src={user.image.path} alt={user.image.name} />
				</div>
			</div>
			<form class="login">
				<div class="texto">
					<h1>{user.nombre}</h1>
					<h4 class="servicio">{user.servicio}</h4>
				</div>
				<div class="field btn">
					<div class="btn-layer">
						<input type="submit" class="butn" value="Aceptar" onClick={() => accept(user._id)}/>
					</div>
				</div>
				<div class="field btn">
					<div class="btn-layer2">
						<input type="submit" class="butn2" value="Rechazar" onClick={() => reject(user._id)}/>
					</div>
				</div>
			</form>
		</div>
		))}
		</>):(<></>)}
		</>
	);
}

export default Usuarios;