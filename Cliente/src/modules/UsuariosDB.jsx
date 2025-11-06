import { useState } from "react";
import axios from "axios";

const UsuariosDB = () => {

    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");

    const actualizarNombre = (e) => {
        setNombre(e.target.value);
    }

    const actualizarContraseña = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const nombreTrimmed = nombre.trim().toLowerCase();
            const passwordTrimmed = password.trim();
            const {data} = await axios.post("http://localhost:3000/usuariosdb", {
                nombre: nombreTrimmed,
                password: passwordTrimmed
            })
            console.log("Usuario agregado correctamente:", data);
            alert("Usuario agregado correctamente");
        }catch{
            console.error("Error al agregar el usuario");
        }
        setNombre("");
        setPassword("");

    }

    return(
        <section>
            <h2>Módulo 13 --- Enviado usuarios a una base de datos MONGODB</h2>
            <p>Para que esto funcione tenes que hacer andar el servidor</p>
            <div style={{display:"flex", gap:"12px", flexDirection:"column"}}>
                <div style={{display:"flex", gap:"12px", flexDirection:"column", justifyContent:"center", marginTop:"12px",alignItems:"center"}}>
                    <input type="text" placeholder="Ingrese nombre de usuario" onChange={actualizarNombre} value={nombre}/>
                    <input type="password" placeholder="Ingrese su contraseña" onChange={actualizarContraseña} value={password}/>
                    <button onClick={handleSubmit}>Registrar Usuario</button>
                </div>
            </div>
        </section>
    )

}

export default UsuariosDB;