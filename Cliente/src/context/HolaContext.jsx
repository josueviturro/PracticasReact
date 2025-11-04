import { createContext } from "react";

export const HolaContext = createContext();

export const HolaProvider = ({ children }) => {
    const mensaje = "¡Hola desde useContext!, el usuario se comparte desde el contexto.";
    const cliente = {
        nombre: "Juan",
        edad: 30,
        ciudad: "Buenos Aires"
    }

    return (
        <HolaContext.Provider value={{mensaje, cliente}}>
            {children}
        </HolaContext.Provider>
    );
};
    