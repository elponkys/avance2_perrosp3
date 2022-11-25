import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../../assets/css/paginaprincipal.css';

export function Publicacion(props){
	const [data, setData] = useState({});
	
	useEffect(() => {
		setData(props.data);
	}, []);
	
	return(
		<>
		<Link to = {`/Publicaciones/Resenias/${data._id}`}>
			<a className='Publicacion'>
				<div className='Nombre_Usuario'>{data.nombre}</div>
				<div>{data.detalles}</div>
				<div className='Contacto'>${data.precio}</div>
			</a>
		</Link>
		</>
	);
}

export default Publicacion;