import React, { useEffect, useState } from 'react';
import { Publicacion } from './../PerfilUsuario/Publicacion';
import constants from './../../constants.json';
import { Link, useLocation } from 'react-router-dom';
import './../../assets/css/paginaprincipal.css';

export function Publicaciones(){
	const location = useLocation();
	const urlParams = new URLSearchParams(location.search);
	const searchRequest = urlParams.get('s');
	const [services, setServices] = useState([]);
	
	useEffect(() => {
		async function preLoad(){
			const response = await fetch(`${constants.API_URL}/servicios?s=${searchRequest}`);
			const servicesDB = await response.json();
			if(servicesDB.success){
				setServices(servicesDB.data);
			}
		}
		setServices([]);
		preLoad();
	}, []);
	
	return(
		<>
		<div className='Publicaciones_Recientes'>
			<div className='Publicaciones'>
				
				{services.map((service, index) => (
					<Link to = "/Publicaciones/Resenias">
						<Publicacion data={service} />
					</Link>
				))}
				
			</div>
		</div>
		</>
	);
}

export default Publicaciones;