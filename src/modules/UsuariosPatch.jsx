import { useState, useEffect, use } from "react";
import axios from "axios";


const UsuariosPatch = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error , setError] = useState(null);

    const [editId, setEditId] = useState(null);
    const [editNombre, setEditNombre] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        const cargarUsuarios = async () => {
            try{
                setCargando(true);
                setError(null);
                const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
                setUsuarios(data);
            } catch (err) {
                setError( `Se produjo un error: ${err.message}`);
            }finally{
                setCargando(false);
            }
        };
        cargarUsuarios();
    }, []);

    const empezarEditar = (u) => {
        setEditId(u.id);
        setEditNombre(u.name);
        setEditEmail(u.email);
    };

    const cancelarEditar = () => {
        setEditId(null);
        setEditNombre("");
        setEditEmail("");
    };

    const guardarEdicion = async () => {
    const nombre = editNombre.trim();
    const email  = editEmail.trim();
    if (!nombre || !email) return;

    try {
        setGuardando(true);
        setError(null);


        await axios.patch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
        name: nombre,
        email
        });


    setUsuarios(prev => prev.map(u => (u.id === editId ? { ...u, name: nombre, email } : u))
        );

    cancelarEditar();
    } catch  {
    setError("No se pudo actualizar el usuario");
    } finally {
    setGuardando(false);
    }};

    return (
        <section>
            <h2>Modulo 09 - Editar (PATCH) con axios</h2>
            {cargando && <p>Cargando usuarios...</p>}
            {error && <p style={{ color: "red"}}>{error}</p>}
            <ul>
                {usuarios.map((u) => (
                    <li key={u.id} style={{ listStyle: "none", border: "1px solid #ddd", borderRadius: 8, padding: "6px 10px", marginBottom: "6px"}}>
                        {editId === u.id ? (
                            <>
                            <input type="text" value={editNombre} onChange={(e) => setEditNombre(e.target.value)} placeholder="Nombre" />
                            <input type= "email" value={editEmail}  onChange={(e) => setEditEmail(e.target.value)} placeholder="Email"/>
                            <button type="button" onClick={guardarEdicion} disabled={guardando}>{guardando ? "Guardando..." : "Guardar"}</button>
                            <button type="button" onClick={cancelarEditar} disabled={guardando}>Cancelar</button>
                            </>
                        ):(
                            <>
                            <div style={{display:"flex", justifyContent:"space-between", border: "1px solid #ddd", borderRadius:8 , padding:"6px 10px", marginBottom:"8px"}}>
                                <div><strong>{u.name} -- <em>{u.email}</em></strong></div>
                                <button type="button" onClick={() => empezarEditar(u)}>Editar</button>
                            </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default UsuariosPatch;