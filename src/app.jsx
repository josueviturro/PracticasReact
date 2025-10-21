import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Hello from './modules/Hello.jsx'
import Contador from './modules/Contador.jsx'
import Formulario from './modules/Formulario.jsx';
import Tareas from './modules/Tareas.jsx';
import TareasGuardadas from './modules/TareasGuardadas.jsx';
import Usuarios from './modules/Apis.jsx';
import UsuariosCRUD from './modules/PostAxios.jsx';
import UsuariosDelete from './modules/DeleteAxios.jsx';
import UsuariosPatch from './modules/UsuariosPatch.jsx';


export default function App() {
    return (
    <main>
        <h1>React Playground</h1>
        <BrowserRouter>
            <nav style={{marginBottom: "20px", gap: "10px", display: "flex", flexWrap: "wrap"}}>
                <Link to="/" ><button>Módulo 01</button></Link>
                <Link to="/contador" ><button>Módulo 02</button></Link>
                <Link to="/formulario" ><button>Módulo 03</button></Link>
                <Link to="/tareas" ><button>Módulo 04</button></Link>
                <Link to="/tareasguardadas" ><button>Módulo 05</button></Link>
                <Link to="/usuarios" ><button>Módulo 06</button></Link>
                <Link to="/usuarioscrud" ><button>Módulo 07</button></Link>
                <Link to="/usuariosdelete" ><button>Módulo 08</button></Link>
                <Link to="/usuariospatch" ><button>Módulo 09</button></Link>
            </nav>
            <Routes>
                <Route path='/' element={<Hello nombre="Josue" />}/>
                <Route path='/contador' element={<Contador />}/>
                <Route path='/formulario' element={<Formulario />}/>
                <Route path='/tareas' element={<Tareas />}/>
                <Route path='/tareasguardadas' element={<TareasGuardadas />}/>
                <Route path='/usuarios' element={<Usuarios />}/>
                <Route path='/usuarioscrud' element={<UsuariosCRUD />}/>
                <Route path='/usuariosdelete' element={<UsuariosDelete />}/>
                <Route path='/usuariospatch' element={<UsuariosPatch />}/>
            </Routes>
        </BrowserRouter>
    </main>
    );
}