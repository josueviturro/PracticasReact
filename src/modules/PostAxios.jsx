import { useState, useEffect} from "react";
import axios from "axios";

const UsuariosCRUD = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [enviado, setEnviado] = useState(false);

    const infoNombre = (e) => {
        setNombre(e.target.value);
    }

    const infoemail = (e) => {
        setEmail(e.target.value);
    }

    useEffect(() => {
        const cargar = async () => {
            try {
                setCargando(true);
                const { data} = await axios.get("https://jsonplaceholder.typicode.com/users");
                setUsuarios(data);
            }catch (error){
                alert(error);
            }
            finally{
                setCargando(false);
            }
        }
        cargar();
    }, [])

    const crearUsuario = async (e) => {
        e.preventDefault();
        const n = nombre.trim();
        const m = email.trim();
        if ( !n || !m) return;

        try{
            setEnviado(true);
            setError(null);
            const { data } = await axios.post("https://jsonplaceholder.typicode.com/users", {
                name: n,
                email: m
            });
                const nuevo = { id: data?.id ?? Date.now(), name: n, email: m};
                setUsuarios([...usuarios, nuevo]);
                setNombre("");
                setEmail("");
        }catch{
            alert("Hubo un error al crear el usuario");
        }finally{
            setEnviado(false);
        }}
    
    return(
        <section>
            <h2>Módulo 07 — Crear (POST) con Axios</h2>

            <form onSubmit={crearUsuario}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={infoNombre} />
                <input type="email" placeholder="Email" value={email} onChange={infoemail} />
                <button type="submit">{!enviado ? "Crear usuario" : "Creando Usuario"}</button>
            </form>
            {cargando && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            <ul>
                {usuarios.map((u) => (
                    <li key={u.id}  style={{ listStyle: "none", border: "1px solid #ddd", borderRadius: 8, padding: "6px 10px", marginBottom: "6px"}}><strong>{u.name} -- <em>{u.email}</em></strong></li>
                ))}
            </ul>
        </section>
    )
    }

export default UsuariosCRUD;