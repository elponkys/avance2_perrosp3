import React, { useEffect, useState } from 'react';
import { Publicacion } from './Publicacion';
import { Resenia } from './Resenia';
import constants from './../../constants.json';
import Cookies from 'universal-cookie';
import { Link, useLocation } from 'react-router-dom';
import $ from 'jquery';
import './../../assets/css/paginaprincipal.css';
import './../../assets/css/Resenias.css';

export function PublicacionyResenias(){
	const location = useLocation();
	const cookies = new Cookies();
	const isLoggedIn = cookies.get(constants.CookieIsLogedIn);
	const userID = cookies.get(constants.CookieUserID);
	const isAdmin = cookies.get(constants.CookieIsAdmin);
	const [state, setState] = useState(false);
	const [service, setService] = useState({});
	const [userLogged, setUserLogged] = useState({});
	const [reviews, setReviews] = useState([]);
	
	useEffect(() => {
		async function preLoad(){
			const response = await fetch(`${constants.API_URL}/servicios/${location.pathname.split('/')[3]}`);
			const selectedService = await response.json();
			if(selectedService.success){
				setService(selectedService.data);
				if (userID) {
					const responseUserLogged = await fetch(`${constants.API_URL}/usuarios/${userID}`);
					const userLoggedDB = await responseUserLogged.json();
					if(userLoggedDB.success){
						setUserLogged(userLoggedDB.data);
					}
				}
				const responseReviews = await fetch(`${constants.API_URL}/resenias?p=${location.pathname.split('/')[3]}`);
				const revierwsDB = await responseReviews.json();
				if(revierwsDB.success){
					setReviews(revierwsDB.data);
					setState(true);
				}
			}
		}
		preLoad();
	}, []);
	
	const deleteComment = async (id) => {
		let seccionComentarios = document.getElementById("comentarios");
		let comentario = document.getElementById(id);
		seccionComentarios.removeChild (comentario);
		const response = await fetch(`${constants.API_URL}/resenias/${id}`, {
			method: 'DELETE'
		});
		const respJson = await response.json();
		if (respJson.success) {
			alert(respJson.message);
		}
	}
	
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
	
	const nComentario = async () => {
		let newComment = $('#nuevoComentario').val();
		if(newComment.length < 10){
			alert('Comentario demasiado corto (debe tener mínimo 10 caracteres)');
			return;
		}
		const body = {
			id_usuario: userID,
			id_producto: location.pathname.split('/')[3],
			fecha: getActualDate(),
			resenia: newComment,
		};
		const response = await fetch(`${constants.API_URL}/resenias/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const respJson = await response.json();
		if (respJson.success) {
			window.location.reload();
		}
		return;
	}
	
	return(
		<>
		<div className='Publicaciones_Recientes'>
			<div className='Publicaciones'>
				{state ? (<>
				<Link to = {`/Perfil/${service.id_usuario}`}>
					<Publicacion data={service} />
				</Link>
				</>):(<></>)}
			</div>
			
			<div className='Reseñas'>
				
				{isLoggedIn === 'true' && isAdmin === 'false' && state ? (<>
				<main className='contenedor'>
					<section className='contenedor-agg-com'>
						<div className='imagen-usuario'>
							<img src={userLogged.image.path} className="imagen-usuario" />
						</div>
						<div className='input-com'>
							<input id='nuevoComentario' type={"Text"} placeholder ="Nuevo Comentario..."></input>
							<div className='btn-agg'>
								<button onClick={() => nComentario()}>Comentar</button>
							</div>
						</div>
					</section>
				</main>
				</>):(<></>)}
				
				<ul id="comentarios" class="contenedor-2">
					
					{reviews.map((review, index) => (
						<Resenia data={review} deleteButton={(e) => deleteComment(review._id)}/>
					))}
					
				</ul>
			</div>
		</div>
		</>
	);
}

export default PublicacionyResenias;