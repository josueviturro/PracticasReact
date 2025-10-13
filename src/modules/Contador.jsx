import { useState } from "react";

const Contador = () => {
    const [ count, setCount ] = useState(0);

    const incrementar = () => {setCount(count + 1)};
    const decrementar = () => {setCount(count - 1)};
    const resetear = () => {setCount(0)};
    return(
        <section>
            <div>
                <h2>Contador: {count}</h2>
                <div style={{display: "flex",gap: "10px"}}>
                    <button onClick={incrementar}> + 1</button>
                    <button onClick={decrementar}> - 1</button>
                    <button onClick={resetear}> Reset</button>
                </div>
            </div>
        </section>
    )
}

export default Contador;