import { useState } from "react";


const Tareas = () => {

    const [ tareas, setTareas ] = useState([]);
    const [nueva , setNueva] = useState("");


    const nuevaTarea = (e) => {
        setNueva(e.target.value);
    }

    const agregarTarea = (e) => {
        e.preventDefault();
        if (nueva.trim() === "") return;
        if (tareas.some(t => t.texto.toLowerCase() === nueva.toLowerCase().trim())){
            alert("La tarea ya existe");
            setNueva("");
            return;
        }


        const tarea = {id: Date.now(), texto: nueva}
        setTareas([...tareas, tarea]);
        setNueva("");
    }

    const eliminarTarea = (id) => {
        setTareas(tareas.filter(tarea => tarea.id !== id));
    }

    return(
    <section>
        <h2>Modulo 04 — Listas y renderizado condicional</h2>
            <form onSubmit={agregarTarea}>
                <input type="text" placeholder="Agregar tarea..." onChange={nuevaTarea} value={nueva}/>
                <button type="submit">Agregar</button>
                {tareas.length === 0 ? (<p style={{marginTop: "7px"}}>No hay tareas</p>): tareas.map(t => (<li style={{listStyle: "none", marginTop: "7px"}} key={t.id}>{t.texto} <span onClick={() => eliminarTarea(t.id)} style={{cursor:"pointer"}}>❌</span></li> ))}
            </form>



    </section>)
}

export default Tareas;