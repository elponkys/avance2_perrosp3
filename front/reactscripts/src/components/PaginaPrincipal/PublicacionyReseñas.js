import React from 'react';
import './../../assets/css/paginaprincipal.css';
import './../../assets/css/Reseñas.css';

import { Link } from 'react-router-dom';

class PublicacionyReseñas extends React.Component{


    render(){
       
        return(
            
            <div className='Publicaciones_Recientes'>

            <div className='Publicaciones'>

            
                
             <Link to = "/Perfil">   
             <a className='Publicacion' href="#"><div className='Nombre_Usuario'><img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="alt" id="Img_perfil_publicacion"/> Nombre</div><div className='Titulo_Publicacion'>Titulo</div> <div>Lorem ipsum dolor sit amet consectetur adipiscing elit neque porttitor curae, ut varius mauris mi congue metus blandit class. Fermentum nec et mollis enim metus curabitur donec pretium, libero proin in neque bibendum sapien blandit eleifend, eget at ad quam fusce porttitor vel. Sociosqu lectus torquent mi himenaeos donec vulputate primis, habitasse penatibus laoreet pretium ligula dis nunc, taciti rhoncus nullam at ut tellus.</div>
             <div className='Contacto'>8119047599</div> </a>
             </Link>
            

             
            </div>

                <div className='Reseñas'>

                <main className='contenedor'>

                    <section className='contenedor-agg-com'>

                    <div className='imagen-usuario'>
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"g></img>
                    </div>

                    <div className='input-com'>
                        <input id='nuevoComentario' type={"Text"} placeholder ="Nuevo Comentario..."></input>
                        <div className='btn-agg'>

                            <button>Comentar</button>

                        </div>

                    </div>

                    
                </section>

                </main>

                <ul id = "comentarios" class = "contenedor-2">


                </ul>

                </div>
        
            </div>

        );


    }


}

function nComentario(){


    let li = document.createElement("li");
    let valoringresado = document.getElementById("nuevoComentario").ariaValueMax;
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

export default PublicacionyReseñas;