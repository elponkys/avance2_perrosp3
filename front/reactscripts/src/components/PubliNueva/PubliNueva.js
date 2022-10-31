import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import './../../assets/css/Publi.css';
import { Link } from 'react-router-dom';



function PubliNueva() {
  return (
   <>
  <div class="container">
        <div class="subcontainer" >
            <div class="form-group text">
              <h1 class="text-black">Crear publicación</h1>
            </div>
            <div class="form-group" >
              <input type="text" placeholder="Titulo" /><br/>           
              <input type="text" placeholder="Descripción" /><br/>
              <input type="text" placeholder="Ubicación"/>
            </div>
              <div class="container2">
                <div class="mb-3">
                
                  <input class="form-control" type="file" multiple placeholder='Inserte archivos multimedia'/>
                  </div>
                               
                <input class="a" type="button" value="Publicar"/>
                </div>
           </div>
      </div>
   </>

  );
}

export default PubliNueva;
