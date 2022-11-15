import React from 'react';
import './../../assets/css/paginaprincipal.css';
import { Link } from 'react-router-dom';

class PublicacionesPerfil extends React.Component{
	render(){
		return(
			<div className='Publicaciones-Perfil'>
				<div className='Publicaciones'>
					<Link to = "/Perfil">
						<a className='Publicacion' href="#">
							<div className='Nombre_Usuario'>
								<img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="alt" id="Img_perfil_publicacion"/>
								Nombre
							</div>
							<div className='Titulo_Publicacion'>Titulo</div>
							<div>
								Lorem ipsum dolor sit amet consectetur adipiscing elit neque porttitor curae, ut varius mauris mi congue metus blandit class. Fermentum nec et mollis enim metus curabitur donec pretium, libero proin in neque bibendum sapien blandit eleifend, eget at ad quam fusce porttitor vel. Sociosqu lectus torquent mi himenaeos donec vulputate primis, habitasse penatibus laoreet pretium ligula dis nunc, taciti rhoncus nullam at ut tellus.
							</div>
							<div className='Contacto'>8119047599</div>
						</a>
					</Link>
					
					<Link to = "/Perfil">
						<a className='Publicacion' href="#">
							<div className='Nombre_Usuario'>
								<img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="alt" id="Img_perfil_publicacion"/>
								Nombre
							</div>
							<div className='Titulo_Publicacion'>Titulo</div>
							<div>
								Lorem ipsum dolor sit amet consectetur adipiscing elit neque porttitor curae, ut varius mauris mi congue metus blandit class. Fermentum nec et mollis enim metus curabitur donec pretium, libero proin in neque bibendum sapien blandit eleifend, eget at ad quam fusce porttitor vel. Sociosqu lectus torquent mi himenaeos donec vulputate primis, habitasse penatibus laoreet pretium ligula dis nunc, taciti rhoncus nullam at ut tellus.
							</div>
							<div className='Contacto'>8119047599</div>
						</a>
					</Link>
					
					<Link to = "/Perfil">
						<a className='Publicacion' href="#">
							<div className='Nombre_Usuario'>
								<img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="alt" id="Img_perfil_publicacion"/>
								Nombre
							</div>
							<div className='Titulo_Publicacion'>Titulo</div>
							<div>
								Lorem ipsum dolor sit amet consectetur adipiscing elit neque porttitor curae, ut varius mauris mi congue metus blandit class. Fermentum nec et mollis enim metus curabitur donec pretium, libero proin in neque bibendum sapien blandit eleifend, eget at ad quam fusce porttitor vel. Sociosqu lectus torquent mi himenaeos donec vulputate primis, habitasse penatibus laoreet pretium ligula dis nunc, taciti rhoncus nullam at ut tellus.
							</div>
							<div className='Contacto'>8119047599</div>
						</a>
					</Link>
				</div>
			</div>
		);
	}
}

export default PublicacionesPerfil;