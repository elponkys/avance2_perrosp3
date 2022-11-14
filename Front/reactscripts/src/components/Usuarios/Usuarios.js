import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './../../assets/css/Usuarios.css';
import { Link } from 'react-router-dom';

function Usuarios() {
  return (
   <>
   
      <div class="form-inner">
        <div class="img">
          <div class="img2">
            <img src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg"/>
          </div>
        </div>
        <form action="includes/register_inc.php" class="login" enctype="multipart/form-data" method="POST">
          <div class="texto">
            <h1> Usuario 1</h1>
            <h4 class="servicio"> Veterinario</h4>
          </div>
          <div class="field btn">
            <div class="btn-layer"> 

              <input type="submit" class="butn" value="Aceptar"/>
            </div>                 
          </div>
          <div class="field btn">
            <div class="btn-layer2">               
            <input type="submit"  class="butn2" value="Rechazar"/>
            </div>
           </div>
        </form>
    
  </div>
  


   </>

  );
}

export default Usuarios;