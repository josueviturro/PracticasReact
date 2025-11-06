import { useLocation, Navigate, useNavigate } from "react-router-dom";

const LoginOk = () => {

    const {state} = useLocation();
    const user = state?.usuario;
    const volver = useNavigate();

    if (!user) {
        return <Navigate to="/usuarioslogin" replace />;
    }

    const retornar = () => {
        volver("/usuarioslogin", {replace: true, state: {usuario: null}});
    }

    const nombreCuenta = user.nombre.charAt(0).toUpperCase() + user.nombre.slice(1); // Capitaliza la primera letra del nombre

return (
    <section >
        <p style={{fontSize:"15px", opacity: "0.3"}}>ID: {user.id}</p>
        <div style={{display: "flex",gap: "20px", flexDirection: "column", alignItems: "center"}}>
            <h2>Benvenido a tu panel de Usuario</h2>
            <h2>Cuenta: {nombreCuenta}</h2>
            <button onClick={retornar}>Salir</button>
        </div>
    </section>
);
};

export default LoginOk;
