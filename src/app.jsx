import Hello from './modules/Hello.jsx'
import Contador from './modules/Contador.jsx'
import Formulario from './modules/Formulario.jsx';
import Tareas from './modules/Tareas.jsx';
import TareasGuardadas from './modules/TareasGuardadas.jsx';
import Usuarios from './modules/Apis.jsx';


export default function App() {
    return (
    <main>
        <h1>React Playground</h1>
        <Hello nombre="Josue" />
        <Contador />
        <Formulario />
        <Tareas />
        <TareasGuardadas />
        <Usuarios />
    </main>
    );
}