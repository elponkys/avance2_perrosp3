import React, { useEffect, useState } from 'react';
import constants from './../../constants.json';
import './../../assets/css/paginaprincipal.css';

export function Publicacion(props){
	const [state, setState] = useState(false);
	const [user, setUser] = useState({});
	
	useEffect(() => {
		async function preload(){
			const response = await fetch(`${constants.API_URL}/usuarios/${props.data.id_usuario}`);
			const getUser = await response.json();
			setUser(getUser.data);
			setState(true);
		}
		preload();
	}, []);
	
	return(
		<>
		{state ? (<>
			<a className='Publicacion'>
				<div className='Nombre_Usuario'>
					<img src={user.image.path} alt={user.image.name} id="Img_perfil_publicacion"/>
					{user.nombre}
				</div>
				<div className='Titulo_Publicacion'>{props.data.nombre}</div>
				<div>{props.data.detalles}</div>
				<div className='Contacto'>{props.data.numero}</div>
				{props.data.multimedia.map((image, index) => (
					<img src={image.path} alt={image.name}/>
				))}
			</a>
		</>):(<></>)}
		</>
	);
}

export default Publicacion;