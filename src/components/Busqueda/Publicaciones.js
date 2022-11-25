import React, { useEffect, useState } from 'react';
import { Publicacion } from './../PerfilUsuario/Publicacion';
import constants from './../../constants.json';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import './../../assets/css/paginaprincipal.css';

export function Publicaciones(){
	const location = useLocation();
	const navigate = useNavigate();
	const urlParams = new URLSearchParams(location.search);
	const searchRequest = urlParams.get('s');
	const postType = urlParams.get('t');
	const pais = urlParams.get('p');
	const estado = urlParams.get('e');
	const ciudad = urlParams.get('c');
	const [services, setServices] = useState([]);
	
	useEffect(() => {
		async function preLoad(){
			var url = `${constants.API_URL}/servicios?s=${searchRequest}`;
			if (postType) {
				url = url.concat('&t=' + postType);
				$('#postType').val(postType);
			}
			if (pais) {
				url = url.concat('&p=' + pais);
				$('#country').val(pais);
			}
			if (estado) {
				url = url.concat('&e=' + estado);
				$('#state').val(estado);
			}
			if (ciudad) {
				url = url.concat('&c=' + ciudad);
				$('#city').val(ciudad);
			}
			const response = await fetch(url);
			const servicesDB = await response.json();
			if(servicesDB.success){
				setServices(servicesDB.data);
			}
		}
		setServices([]);
		preLoad();
	}, []);
	
	const busquedaAvanzada = () => {
		const postType = $('#postType').find(':selected').val();
		let pais = $('#country').val();
		let estado = $('#state').val();
		let ciudad = $('#city').val();
		var url = '/' +  location.pathname.split('/')[1] + '?s=' + searchRequest;
		if (postType !== 'Cualquier tipo') {
			url = url.concat('&t=' + postType);
		}
		if (pais !== '') {
			url = url.concat('&p=' + pais);
		}
		if (estado !== '') {
			url = url.concat('&e=' + estado);
		}
		if (ciudad !== '') {
			url = url.concat('&c=' + ciudad);
		}
		navigate(url);
		window.location.reload();
	};
	
	return(
		<>
		<div className='Publicaciones_Recientes'>
			<div className='Publicaciones'>
				
				<a className='Publicacion'>
					<select class="form-select" id="postType">
						<option>Cualquier tipo</option>
						<option>Producto</option>
						<option>Servicio</option>
					</select>
					<input className="form-control" type="text" id="country" placeholder="País" ></input>
					<input className="form-control" type="text" id="state" placeholder="Estado" ></input>
					<input className="form-control" type="text" id="city" placeholder="Ciudad" ></input>
					<button type="submit" className="btn" onClick={() => busquedaAvanzada()}>Realizar búsqueda avanzada</button>
				</a>
				
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