import { useState, useEffect } from "react";
import axios from "axios";


const UsuariosDelete = () => {

    const [usuarios, setUsuarios] = useState([]);




    useEffect(() => {
        const cargar = async () => {
            try {
                const {data} = await axios.get("https://jsonplaceholder.typicode.com/users");
                setUsuarios(data.map(u => ({...u, eliminando: false})));
            }catch{
                alert("Error al cargar los usuarios");
            }
        }
        cargar();
            }, [])

        const eliminarUsuario = async (id) => {
            try{
                setUsuarios(prev => prev.map(u => (u.id === id ? {...u, eliminando: true} : u)));
                await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUsuarios(prev => prev.filter(u => u.id !== id));
            }catch{
                alert("Error al eliminar el usuario");
            }
        }

        return(
            <section>
                <h2>Módulo 08 — Eliminar (DELETE) con Axios</h2>
                <h3>Usuarios:</h3>
                {usuarios.length === 0 ? <p>Cargando...</p> : 
                (<ul style={{listStyle:"none"}}>
                    {usuarios.map(u => (
                        <div style={{display:"flex", justifyContent:"space-between", border: "1px solid #ddd", borderRadius:8 , padding:"6px 10px", marginBottom:"8px"}}>
                            <li key={u.id}><strong>{u.name} -- <em>{u.email}</em> </strong></li>
                            <button style={{boxSizing:"content-box"}} onClick={() => eliminarUsuario(u.id)}>{!u.eliminando ? "Eliminar" : "Borrando..."}</button>
                        </div>
                    ))}
                </ul>)}
            </section>
        )
}

export default UsuariosDelete;