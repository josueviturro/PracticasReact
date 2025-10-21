// UsuarioDetalle.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UsuarioDetalle = () => {
    const { id } = useParams(); // 1️⃣ Leer parámetro dinámico
    const navigate = useNavigate(); // 2️⃣ Para ir hacia atrás
    const [usuario, setUsuario] = useState(null);
    useEffect(() => {

        const cargarUsuario = async () => {
            try{
                const {data} = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUsuario(data);
            }catch (err){
                console.error(err);
            }
        }
        cargarUsuario();
    }, [id]);

    return (
        <section>
            <h2>Detalle del usuario</h2>
            {usuario ? (
                <div>
                    <p><strong>Nombre:</strong> {usuario.name}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Teléfono:</strong> {usuario.phone}</p>
                    <p><strong>Empresa:</strong> {usuario.company?.name}</p>
                </div>
            ) : (<p>Cargando usuario...</p> )}
            <button onClick={() => navigate(-1)}>Volver</button>
        </section>);
}
    export default UsuarioDetalle;