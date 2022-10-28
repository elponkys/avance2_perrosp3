import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
//import './../../assets/css/Inicio_sesion.css';


class InicioSesion extends React.Component{


    render(){
       
        return(
            
            

                <div className='mainContenedor'>

                    <div className='Login'>

                    <h1>Inicia sesion</h1>

                    <form action="" method="GET" className='Formulario'>

                    <input className='form-control' type="text" id="usernameIt" placeholder="Nombre de usuario:"></input>
                    <br></br>

                    <input className='form-control' type="password" id="claveIt" placeholder="Contraseña:"></input>
                    

                    <button  type="button" className='btn btn-danger' id="btnLog"> Ingresar </button>

    
                    </form>

                    <a href="">Haz clic aqui para crear una cuenta</a><br></br>
                
                    </div> 

                </div>
    
            
                   


        );


    }


}

export default InicioSesion;