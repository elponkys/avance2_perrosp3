import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './../../assets/css/SoliPubli.css';
import { Link } from 'react-router-dom';

function SoliPubli() {
  return (
   <>
   
      <div class="form-inner">
        <form action="includes/register_inc.php" class="login" enctype="multipart/form-data" method="POST">
          <div class="texto">
            <h1>Publicacion</h1>
            <h4>Usuario1</h4>
          </div>
          <div class="text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a ipsum eu sapien sollicitudin imperdiet vel at tellus. Nunc dui mi, pellentesque </p>
          </div>
          <div class="field">
            <div class="btn-layer"> 
              <input type="submit" class="butn" value="Aceptar"/>
            </div>                 
          </div>
          <div class="field">
            <div class="btn-layer">               
            <input type="submit" class="butn2" value="Rechazar"/>
            </div>
           </div>
        </form>
    
  </div>
  


   </>

  );
}

export default SoliPubli;