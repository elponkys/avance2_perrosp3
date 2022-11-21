import React, { useEffect, useState } from 'react';
import { Publicacion } from './../PerfilUsuario/Publicacion';
import constants from './../../constants.json';
import { Link } from 'react-router-dom';
import './../../assets/css/paginaprincipal.css';

export function Publicaciones(){
	const [services, setServices] = useState([]);
	
	useEffect(() => {
		async function preLoad(){
			const response = await fetch(`${constants.API_URL}/servicios/`);
			const servicesDB = await response.json();
			if(servicesDB.success){
				setServices(servicesDB.data);
			}
		}
		preLoad();
	}, []);
	
	return(
		<>
		<div className='Publicaciones_Recientes'>
			<div className='Publicaciones'>
				<Link to = "/PubliNueva">
					<button id="Añadir_Publicacion" type="button" className='btn btn-danger'>Añadir una publicacion</button>
				</Link>
				
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