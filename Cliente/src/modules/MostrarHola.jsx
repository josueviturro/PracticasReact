import { useContext } from "react";
import { HolaContext } from "../context/HolaContext";

const MostrarHola = () => {
    const {mensaje,cliente} = useContext(HolaContext);

    return (
        
        <section>
            <p>{mensaje}</p>
                    <ul style={{ listStyle: "none", border: "1px solid #ddd", borderRadius: 8, padding: "6px 10px", marginBottom: "6px"}}>
                        <strong>
                            <li><strong>Nombre:</strong> {cliente.nombre}</li>
                            <li><strong>Edad:</strong> {cliente.edad}</li>
                            <li><strong>Ciudad:</strong> {cliente.ciudad}</li>
                        </strong>
                    </ul>
        </section>

    )
}

export default MostrarHola;