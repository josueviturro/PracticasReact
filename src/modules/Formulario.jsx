import { useState } from "react";

const Formulario = () => {

    const [ nombre, setNombre ] = useState("");

    const handleChange = (e) => {
        setNombre(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Hola ${nombre}`)
        setNombre("");
    };

    return(
        <section>
            <div>
                
                <h2>03 - Formularios Controlados</h2>
                <form onSubmit={handleSubmit} style={{display: "flex", gap: "10px"}}>
                    <label>Nombre:</label>
                    <input type="text" value={nombre} onChange={handleChange} placeholder="Escribe tu nombre..." />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </section>
    )
}

export default Formulario;