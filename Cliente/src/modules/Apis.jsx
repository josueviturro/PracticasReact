import { useEffect, useState } from "react";
import axios from "axios";

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try{
                setCargando(true);
                const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
                setUsuarios(data);

            }catch{
                setError("Hubo un error al obtener los usuarios");
            }
            finally{
                setCargando(false);
            }
        }
        obtenerUsuarios();
    },[])

    return(
        <section>
            <h2>Módulo 06 - Consumo de APIs</h2>
            <p>Lista de usuarios obtenida desde una API real:</p>
            {cargando && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            <ul>
                {usuarios.map((prev) => (
                    <li key={prev.id} style={{listStyle: "none", border: "1px solid #ddd", borderRadius:"8px", padding: "6px 10px", marginBottom: "6px"}}><strong>{prev.name} -- <em>{prev.email}</em></strong></li>
                ))}
            </ul>

        </section>
    )
}

export default Usuarios;