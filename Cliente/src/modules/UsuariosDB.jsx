import { useState } from "react";
import axios from "axios";

const UsuariosDB = () => {

    const [usuarios, setUsuarios] = useState([]);
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
            const {data} = await axios.post("http://localhost:3000/usuariosdb", {
                nombre,
                password
            })
            console.log("Usuario agregado correctamente:", data);
            alert("Usuario agregado correctamente");
        }catch{
            console.error("Error al agregar el usuario");
        }
        const nuevoUsuario = { nombre, password };
        setUsuarios([...usuarios, nuevoUsuario]);
        setNombre("");
        setPassword("");

    }

    return(
        <section>
            <h2>Módulo 13 --- Enviado usuarios a una base de datos MONGODB</h2>
            <div style={{display:"flex", gap:"12px", flexDirection:"column"}}>
                <div style={{display:"flex", gap:"12px", flexDirection:"column", maxWidth:"300px", justifyContent:"center", marginTop:"12px"}}>
                    <input type="text" placeholder="Ingrese nombre de usuario" onChange={actualizarNombre} value={nombre}/>
                    <input type="password" placeholder="Ingrese su contraseña" onChange={actualizarContraseña} value={password}/>
                    <button onClick={handleSubmit}>Enviar Datos</button>
                </div>
            </div>
        </section>
    )

}

export default UsuariosDB;