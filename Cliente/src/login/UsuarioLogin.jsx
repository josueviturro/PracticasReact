import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UsuarioLogin = () => {

    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const navigate = useNavigate();

    const setNombre = (e) => {
        setNombreUsuario(e.target.value);
    };

    const setPass = (e) => {
        setContrasena(e.target.value);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const nombre = nombreUsuario.trim().toLowerCase();
        const password = contrasena.trim();
        
        if (!nombre || !password) {
            alert("Por favor, complete ambos campos");
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:3000/login", {
                nombre: nombre,
                password: password
            })

            if (data.status) {
                navigate("/dashboard", { state: { usuario: data.usuario } });
            }
        } catch {
            alert("Error en el inicio de sesión, no se pudo enviar los datos al servidor");
        }
        setContrasena("");
        setNombreUsuario("");
        
    }



    return (
        <section>
        <h2>Módulo 14 --- Login de Usuario con MongoDB</h2>
        <p>Para que esto funcione tenes que hacer andar el servidor</p>
        <form onSubmit={handleLogin} action="submit" style={{display: "flex", flexDirection:"column", alignItems:"center", gap:"15px", marginTop:"10px"}}>
            <input type="text" placeholder="Usuario" onChange={setNombre} value={nombreUsuario}/>
            <input type="password" placeholder="Contraseña" onChange={setPass} value={contrasena}/>
            <button type="submit">Iniciar Sesión</button>
        </form>
        </section>
    )
}

export default UsuarioLogin;