import { useReducer, useState } from "react";

function cuenta(state, action)  {
    switch(action.type){
        case "depositar":
            return state.map((c) => c.nombre === action.nombre ? {...c, cuenta: c.cuenta + action.cantidad} : c);
        case "retirar":
            return state.map((c) => c.nombre === action.nombre ? {...c, cuenta: Math.max (0, c.cuenta - action.cantidad) } : c);
        default:
            return state;
        
    }
}


const Gestiones = () => {

    const [monto, setMonto] = useState(0);

    const acreditarMonto = (e) => {
        setMonto(Number(e.target.value));
        console.log("funciona");
    }
    const [estado, dispatch] = useReducer(cuenta, [
        {nombre: "Ana", edad: 28, cuenta: 5000},
        {nombre: "Luis", edad: 34, cuenta: 3000},
        {nombre: "María", edad: 45, cuenta: 7200},
        {nombre: "Carlos", edad: 52, cuenta: 1000},
        {nombre: "Sofía", edad: 31, cuenta: 6400},
        {nombre: "Jorge", edad: 39, cuenta: 8500},
        {nombre: "Lucía", edad: 27, cuenta: 4100},
        {nombre: "Miguel", edad: 48, cuenta: 2900},
        {nombre: "Elena", edad: 36, cuenta: 5300},
        {nombre: "Pedro", edad: 50, cuenta: 7700},
    ]);

    


    return (
        <section>
            <h2>Módulo 12 - Gestión de saldo con useReducer.</h2>
                {estado.map(c => (
                    <ul style={{ listStyle: "none", border: "1px solid #ddd", borderRadius: 8, padding: "6px 10px", marginBottom: "6px"}}>
                        <li key={c.nombre}><strong>
                            <p>Nombre: {c.nombre}</p>
                            <p>Edad: {c.edad}</p>
                            <p>Saldo: {c.cuenta}</p>
                            <div style={{display: "flex", gap: "10px"}}>
                                <input type="number" placeholder="Indique monto a operar..." onChange={acreditarMonto} />
                                <button onClick={() => dispatch({type: "depositar", nombre: c.nombre, cantidad: monto})} value={monto}>Depositar</button>
                                <button onClick={() => dispatch({type: "retirar", nombre: c.nombre, cantidad: monto})} value={monto}>Retirar</button>
                            </div>
                            </strong></li>
                        </ul>
                ))}
            
        </section>
    )
}

export default Gestiones;
