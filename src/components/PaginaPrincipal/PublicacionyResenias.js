import React, { useEffect, useState } from 'react';
import { Publicacion } from './Publicacion';
import constants from './../../constants.json';
import { Link, useLocation } from 'react-router-dom';
import $ from 'jquery';
import './../../assets/css/paginaprincipal.css';
import './../../assets/css/Resenias.css';

export function PublicacionyResenias(){
	const location = useLocation();
	const [state, setState] = useState(false)
	const [service, setService] = useState({});
	
	useEffect(() => {
		async function preLoad(){
			const response = await fetch(`${constants.API_URL}/servicios/${location.pathname.split('/')[3]}`);
			const selectedService = await response.json();
			if(selectedService.success){
				setService(selectedService.data);
				setState(true);
			}
		}
		preLoad();
	}, []);
	
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
				<main className='contenedor'>
					<section className='contenedor-agg-com'>
						<div className='imagen-usuario'>
							<img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"></img>
						</div>
						
						<div className='input-com'>
							<input id='nuevoComentario' type={"Text"} placeholder ="Nuevo Comentario..."></input>
							<div className='btn-agg'>
								<button onClick={nComentario}>Comentar</button>
							</div>
						</div>
					</section>
				</main>
				<ul id="comentarios" class="contenedor-2">
				</ul>
			</div>
		</div>
		</>
	);
}

function nComentario() {
	let li = document.createElement("li");
	let valoringresado = $('#nuevoComentario').val(); //document.getElementById("nuevoComentario").ariaValueMax;
	let text = document.createTextNode(valoringresado);
	li.appendChild(text);
	if(valoringresado === ''){
		alert("Ingrese un comentario")
	} else{
		document.getElementById("comentarios").appendChild(li);
	}
	
	document.getElementById("nuevoComentario").value = "";
	li.className = "comentario";
	
	let borrar = document.createElement("p");
	borrar.innerHTML = ("Borrar");
	borrar.className = "close";
	li.appendChild(borrar);
	
	let close = document.getElementsByClassName("close");
	let i;
	for(i=0; i< close.length; i++){
		close[i].onclick = function(){
			let div = this.parentElement;
			div.style.display = "none";
		}
	}
}

export default PublicacionyResenias;