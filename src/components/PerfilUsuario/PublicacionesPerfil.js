import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Publicacion } from './Publicacion';
import constants from './../../constants.json';
import './../../assets/css/paginaprincipal.css';

export function PublicacionesPerfil(){
	const location = useLocation();
	const [services, setServices] = useState([]);
	
	async function preLoad(){
		const response = await fetch(`${constants.API_URL}/servicios?u=${location.pathname.split('/')[2]}`);
		const servicesDB = await response.json();
		if(servicesDB.success){
			setServices(servicesDB.data);
		}
	}
	
	useEffect(() => {
		preLoad();
	}, []);
	
	return(
		<>
		<div className='Publicaciones-Perfil'>
			<div className='Publicaciones' id="publicaciones">
				
				{services.map((service, index) => (
					<Publicacion data={service} />
				))}
				
			</div>
		</div>
		</>
	);
}

export default PublicacionesPerfil;