import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import Hello from './Hello.jsx'
import Contador from './Contador.jsx'
import Formulario from './Formulario.jsx';
import Tareas from './Tareas.jsx';
import TareasGuardadas from './TareasGuardadas.jsx';
import Usuarios from './Apis.jsx';
import UsuariosCRUD from './PostAxios.jsx';
import UsuariosDelete from './DeleteAxios.jsx';
import UsuariosPatch from './UsuariosPatch.jsx';

const Rutes = () => {

    return(
        <main>
        <h1>React Playground</h1>
        <BrowserRouter>
            <nav style={{marginBottom: "20px", gap: "10px", display: "flex", flexWrap: "wrap"}}>
                <NavLink to="/" ><button>Módulo 01</button></NavLink>
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
    )
}


export default Rutes;