import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from "./components/pages/Cadastro";
import Sobre from './components/pages/Sobre';
import Home from './components/pages/Home';
import Professor from './components/tables/Professor';
import Coordenador from './components/tables/Coordenador';
import Alunos from './components/tables/Alunos';
import Curso from './components/tables/Curso';
import Endereco from './components/tables/Endereco';
import Grupo from './components/tables/Grupo';
import Instituicao from './components/tables/Instituicao';
import Periodos from './components/tables/Periodos';
import Pessoas from './components/tables/Pessoas';
import GruposUser from './components/pages/GruposUser';
import EditPerfil from './components/pages/EditPerfil';
import AdicionarAlunos from './components/pages/AdicionarAlunos';
import Alunogrupo from './components/tables/Alunogrupo';
import Login from "./components/pages/Login";
import Lista from "./components/pages/Lista"
import EmailForm from './components/pages/EmailForm';
import AlunosConectados from './components/pages/AlunosConectados';



function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/Professor" element={<Professor />} />
          <Route path="/Coordenador" element={<Coordenador />} />
          <Route path="/Alunos" element={<Alunos />} />
          <Route path="/Curso" element={<Curso />} />
          <Route path="/Endereco" element={<Endereco />} />
          <Route path="/Grupo" element={<Grupo />} />
          <Route path="/Instituicao" element={<Instituicao />} />
          <Route path="/Periodos" element={<Periodos />} />
          <Route path="/Pessoas" element={<Pessoas />} />
          <Route path="/GruposUser" element={<GruposUser />} />
          <Route path="/EditPerfil" element={<EditPerfil />} />
          <Route path="/AdicionarAlunos" element={<AdicionarAlunos />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Lista" element={<Lista />} />
          <Route path="/EmailForm" element={<EmailForm />} />
          <Route path="/Alunogrupo" element={<Alunogrupo />} />
          <Route path="/AlunosConectados" element={<AlunosConectados />} />
        </Routes>
      </Router>
    
    </>
  );
}

export default App;
