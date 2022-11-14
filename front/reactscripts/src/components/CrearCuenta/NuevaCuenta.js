import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
import './../../assets/css/NuevaCuenta.css';
import { Link } from 'react-router-dom';


class NuevaCuenta extends React.Component{


    render(){
       
        return(
            <>
            <div class="wrapper">
               <div class="title-text">
                 <div class="title signup">Crear cuenta</div>
               </div>
               <div class="form-container">
                
                 <div class="form-inner">
                
                   <form action="includes/register_inc.php" class="login" enctype="multipart/form-data" method="POST">
                       <div class="img">
                           <div class="img2">
                               <img src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg"/>
                           </div>
                         </div>
                     <div class="field">
                       <input type="text" placeholder="Nombre" name="nombre" required/>
                     </div>
                     <div class="field">
                       <input type="email" placeholder="Correo electronico" name="email" required/>
                     </div>
                     <div class="field">
                     
                     <input type="password"  placeholder="Contraseña" id="psw" name="contraseña" pattern="(?=.*\d)(?=.*[?;:.,])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
                     </div>
                     <div class="field"> 
                       <input type="text" placeholder="Servicios" name="servicios" required/>
                     </div>
                     <div class="field btn">
                       <div class="btn-layer">                    
                       <Link to = "/PaginaPrincipal"> <input type="submit" name="submit" value="Registrar"/> </Link> 
                       </div>
                     </div>
                   </form>
                 </div>
               </div>
             </div>
          </>

        );


    }


}

export default NuevaCuenta;