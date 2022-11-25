import React, { useEffect, useState } from 'react';
import constants from './../../constants.json';
import Cookies from 'universal-cookie';
import './../../assets/css/Resenias.css';

export function Resenia(props){
	const cookies = new Cookies();
	const isAdmin = cookies.get(constants.CookieIsAdmin);
	const [state, setState] = useState(false);
	const [user, setUser] = useState({});
	
	useEffect(() => {
		async function preload(){
			const response = await fetch(`${constants.API_URL}/usuarios/${props.data.id_usuario}`);
			const getUser = await response.json();
			if (getUser.data.status === 2) {
				getUser.data.nombre = getUser.data.nombre.concat(' ' + constants.VerifiedCharacter);
			}
			setUser(getUser.data);
			setState(true);
		}
		preload();
	}, []);
	
	return(
		<>
		{state ? (<>
			<li className="comentario" id={props.data._id}>
				<img src={user.image.path} className="imagen-usuario" />
				<div className='Comentario'>

					<div className='Usuario'>{user.nombre}</div>
					<div className='Reseña'>{props.data.resenia}</div>

				</div>
				{isAdmin === 'true' ? (<>
				<p className="close" onClick={props.deleteButton}>Borrar</p>
				</>):(<></>)}
			</li>
		</>):(<></>)}
		</>
	);
}

export default Resenia;