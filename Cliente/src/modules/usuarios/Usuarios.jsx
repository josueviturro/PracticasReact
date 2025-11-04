import {Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const UsuariosDinam =  () => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const cargarUsuarios = async () => {
            try{
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsuarios(data);}
        catch (err) {
            console.error(err);
        }}
        cargarUsuarios();
    }, []);
    

    return (
        <section>
            <h2>Módulo 10 — Rutas Dinámicas</h2>
            <ul>
                {usuarios.map(u => (
                    <li key={u.id} style={{ listStyle: "none", border: "1px solid #ddd", borderRadius: 8, padding: "6px 10px", marginBottom: "6px"}}>
                        <Link to={`/usuariosdin/${u.id}`} style={{textDecoration:"none", color:"black"}}> <strong>{u.name} -- <em>{u.email}</em></strong></Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default UsuariosDinam;