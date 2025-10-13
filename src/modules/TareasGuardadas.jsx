import { useState, useEffect } from "react";



const TareasGuardadas = () => {

    const [ tareas, setTareas ] = useState(() => {
        try {
            const guardadas = localStorage.getItem("tareas");
            return guardadas ? JSON.parse(guardadas) : [];
        }catch {
            console.log("no hay tareas guardadas, se asigna un array vacio");
            return [];}
    });


    const [nuevaTarea , setNuevaTarea] = useState("");



        useEffect(() => {
            localStorage.setItem("tareas", JSON.stringify(tareas));
        },[tareas]);

        const nuevosDatos = (e) => {
            setNuevaTarea(e.target.value);
        }

        const agregarTarea = (e) => {
            e.preventDefault();
            if (nuevaTarea.trim() === "") return;
            if (tareas.some(t => t.texto.toLowerCase() === nuevaTarea.toLowerCase().trim())){
                alert("La tarea ya existe");
                setNuevaTarea("");
                return;
            }
            const tarea = {id: Date.now(), texto: nuevaTarea}
            setTareas([...tareas, tarea]);
            setNuevaTarea("");
        }

        const eliminarTarea = (id) => {
            setTareas(tareas.filter(t => t.id !== id))
        }

        return(
        <section>
            <h2>Módulo 05 — useEffect y persistencia de datos</h2>
            <p>En este modulo si recargas la pagina y no eliminas los datos los mismos se mantienen</p>
            <form onSubmit={agregarTarea}>
                <input type="text" placeholder="Agrega nueva tarea" value={nuevaTarea} onChange={nuevosDatos}/>
                <button type="submit">Agregar</button>
                {tareas.length === 0 ? (<p style={{marginTop: "7px"}}>No hay tareas pendientes!</p>): tareas.map(t => {return(<li key={t.id} style={{listStyle: "none", marginTop: "7px"}}>{t.texto} <span style={{cursor: "pointer"}} onClick={() => eliminarTarea(t.id)}>❌</span></li>)})}
            </form>
        </section>
        )
}

export default TareasGuardadas;