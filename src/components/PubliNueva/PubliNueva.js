import React, { useState } from 'react';

//import "bootstrap/dist/css/bootstrap.min.css";
import constants from './../../constants.json';
import './../../assets/css/Publi.css';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export const PubliNueva = (props) => {
	const [multimediaJson, setMultimediaJson] = useState([]);
	const [base64Multimedia, setBase64Multimedia] = useState([]);
	
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

	const imageHandleChange = (e) => {
		if (e.target.files) {
			const fileArray = Array.from(e.target.files).map((file) =>
				URL.createObjectURL(file)
			);
			
			let json2 = [];
			let jsonBase64 = [];
			
			let indexMultimedia = 0;
			for (let i = 0; i < multimediaJson.length; i++) {
				json2.push({
					src: multimediaJson[i].src,
					type: multimediaJson[i].type,
					key: indexMultimedia,
				});
				
				jsonBase64.push({
					blob: base64Multimedia[i].blob,
					key: indexMultimedia,
				});
				
				indexMultimedia++;
			}
			
			for (let i = 0; i < fileArray.length; i++) {
				json2.push({
					src: fileArray[i],
					type: e.target.files[i].type,
					key: indexMultimedia,
				});
				
				jsonBase64.push({
					blob: e.target.files[i],
					key: indexMultimedia,
				});
				indexMultimedia++;
			}
			
			setBase64Multimedia(jsonBase64);
			setMultimediaJson(json2);
			Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
		} else {
			alert('No se pudo cargar el archivo deseado, por favor intente de nuevo');
		}
	};

	async function publicate(e) {
		const cookies = new Cookies();
		const nombre = $('#nombre').val();
		const publicacion = $('#publi').val();
		const pais = $('#pais').val();
		const estado = $('#estado').val();
		const ciudad = $('#ciudad').val();
		const detalles = $('#detalles').val();
		const numero = $('#numero').val();
		const precio = $('#precio').val();
		
		if (cookies.get(constants.CookieIsLogedIn) === 'false') {
			alert('Se necesita iniciar sesion para publicar');
			return;
		} else if (base64Multimedia.length === 0) {
			alert('No puedes publicar algo vacio');
			return;
		}
		
		const userID = cookies.get(constants.CookieUserID);
		alert(userID);
		let multiArray2 = [];
		let index = 0;
		if (base64Multimedia.length !== 0) {
			base64Multimedia.forEach((multimedia) => {
				var reader = new FileReader();
				reader.readAsDataURL(multimedia.blob);
				reader.onloadend = function () {
					var base64data = reader.result;
					
					const parts = base64data.split(';');
					const mime = parts[0].split(':')[1].split('/')[1];
					const imgName = 'publication';
					const multimediaData = parts[1].split('base64,').pop();
					var multi = {};
					
					multi['name'] = imgName;
					multi['extention'] = mime;
					multi['path'] = multimediaData;
					multiArray2[`${index}`] = multi;
					
					if (index === base64Multimedia.length - 1) {
						savePublication(multiArray2, nombre, publicacion, pais, estado, ciudad, detalles, numero, precio, userID);
					}
					index++;
				};
			});
		} else {
			savePublication(multiArray2, nombre, publicacion, pais, estado, ciudad, detalles, numero, precio, userID);
		}
	}
	
	async function savePublication(pMultiArray2, pnombre, ppublicacion, ppais, pestado, pciudad, pdetalles, pnumero, pprecio, pUserID) {
		let body = {
			id_usuario: pUserID,
			nombre: pnombre,
			publicacion: ppublicacion,
			pais: ppais,
			estado: pestado,
			ciudad: pciudad,
			fecha: getActualDate(),
			detalles: pdetalles,
			numero: pnumero,
			precio: pprecio,
		};
		
		if (pMultiArray2.length !== 0) body.multimedia = pMultiArray2;
		const cookie = new Cookies();
		const response = await fetch(`${constants.API_URL}/servicios`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		
		const respJson = await response.json();
		console.log(respJson);
		props.closeCallback(false);
		if (!respJson.success) {
			props.closeCallback(false);
			alert('Hubo un error subiendo la publicacion, por favor intente de nuevo');
		}
	}
	
	const renderMultimedia = (source) => {
		return source.map((multimedia) => {
			if (multimedia['type'] === 'video/mp4') {
				return (
					<div className="single-multimedia" key={multimedia.index}>
						<video src={multimedia.src} controls />
					</div>
				);
			} else if (
				multimedia['type'] === 'image/jpeg' ||
				multimedia['type'] === 'image/jpg' ||
				multimedia['type'] === 'image/png' ||
				multimedia['type'] === 'image/bmp'
			) {
				return (
					<div className="single-multimedia" key={multimedia.index}>
						<img src={multimedia.src} alt="imgMultimedia"/>
					</div>
				);
			} else {
				return <></>;
			}
		});
	};
	
	return (
		<>
		<div class="container">
			<form onSubmit={publicate}>
				<div class="subcontainer">
					<div class="form-group text">
						<h1 class="text-black">Crear publicación</h1>
					</div>
					<div class="form-group">
						<input type="text" id="nombre" placeholder="Titulo"/>
						<br />
						<input type="text"	id="detalles" placeholder="Descripción"/>
						<br />
						<input type="text"	id="pais" placeholder="pais"/>
						<input type="text"	id="estado" placeholder="estado"/>
						<input type="text"	id="ciudad" placeholder="ciudad"/>
						
						<label for="servicio">Escoge un tipo de publicacion:</label>
						<br />
						<select id="publi" name="servicio">
							<option value="Servicio">Servicio</option>
							<option value="Producto">Producto</option>
						</select>
						<br />
						<input type="text" id="numero" placeholder="numero"/>
						<input type="text" id="precio" placeholder="precio"/>
					</div>
					<div class="container2">
						<div class="mb-3">
							<input
								id="file-input"
								type="file"
								multiple
								hidden
								accept=".jpeg, .jpg, .png, .bmp, .mp4"
								onChange={imageHandleChange}
							/>
							<label for="file-input" id="imgLabel">Subir Imagen</label>
							<div className="publication-multimedia-modal">
								{multimediaJson ? renderMultimedia(multimediaJson) : <></>}
							</div>
						</div>
						
						<input class="a" type="submit" name="submit" value="Publicar"/>
					</div>
				</div>
			</form>
		</div>
		</>
	);
};

export default PubliNueva;