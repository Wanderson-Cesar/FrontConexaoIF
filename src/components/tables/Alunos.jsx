import styles from '../styles/Tables.module.css';
import React, { useEffect, useState } from "react";
import AdminNavBar from "../form/AdminNavBar";
import axios from "axios";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

function Alunos() { 
  const [alunos, setAlunos] = useState([]);
  const [editAlunosId, setEditAlunosId] = useState(null);
  const [editAlunosDados, setEditAlunosDados] = useState({});
  const [filtroAluno, setFiltroAluno] = useState("");
  const [periodoId, setPeriodoId] = useState(null);
  const [periodos, setPeriodos] = useState([]);
  const [cursoId, setCursoId] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    matricula: "",
    periodo: { id: null },
    curso: { id: null }
  });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const cadastrarAluno = () => {
    novoAluno.periodo = { id: periodoId };
    novoAluno.curso = { id: cursoId };
    axios
      .post("http://127.0.0.1:5000/api/aluno", novoAluno)
      .then((response) => {
        setModoEdicao(false);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setMensagemErro(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/periodo")
      .then((response) => setPeriodos(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/curso")
      .then((response) => setCursos(response.data))
      .catch((error) => console.log(error));
  }, []);


  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/aluno')
      .then((response) => setAlunos(response.data))
      .catch((err) => console.log(err));
  }, []);

  const removeAluno = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/aluno/${id}`)
      .then((response) => {
        const AttListaAlunos = alunos.filter((aluno) => aluno.id !== id);
        setAlunos(AttListaAlunos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editAluno = (id) => {
    axios.get(`http://127.0.0.1:5000/api/aluno/${id}`)
      .then((response) => {
        setEditAlunosDados(response.data);
        setEditAlunosId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveEditAluno = () => {
    axios.put(`http://127.0.0.1:5000/api/aluno/${editAlunosId}`, editAlunosDados)
      .then((response) => {
        const updatedAlunos = alunos.map((aluno) => {
          if (aluno.id === editAlunosId) {
            return response.data;
          }
          return aluno;
        });
        setAlunos(updatedAlunos);
        setEditAlunosId(null);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    };

    const filtro_Alunos = alunos.filter((aluno) =>
    aluno.nome && aluno.nome.toLowerCase().includes(filtroAluno.toLowerCase())
    );

    const adicionarAluno = () => {
      setModoEdicao(true);
      setMensagemErro("");
    };

  return (
    <>
    <div className={styles.containerAdminNavBar}>
        <AdminNavBar />
        <div className={styles.container}>
          <main>
            <h1>Alunos</h1>
            <div className={styles.conteudo}>
              <input
                type="text"
                placeholder="Pesquisar"
                value={filtroAluno}
                onChange={(e) => setFiltroAluno(e.target.value)}
              />
            <button onClick={adicionarAluno}>Adicionar</button>
            </div>
            {editAlunosId ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Nome:</label>
                <input
                  type="text"
                  value={editAlunosDados.nome}
                  onChange={(e) => setEditAlunosDados({ ...editAlunosDados, nome: e.target.value })}
                  required
                /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Email:</label>
                <input
                  type="email"
                  value={editAlunosDados.email}
                  onChange={(e) => setEditAlunosDados({ ...editAlunosDados, email: e.target.value })}
                  required
                /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Senha:</label>
                 <input
                  type="password"
                  value={editAlunosDados.senha}
                  onChange={(e) => setEditAlunosDados({ ...editAlunosDados, senha: e.target.value })}
                  required
                /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Telefone:</label>
                <input
                  type="text"
                  value={editAlunosDados.telefone}
                  onChange={(e) => setEditAlunosDados({ ...editAlunosDados, telefone: e.target.value })}
                  required
                /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Matrícula:</label>
                <input
                  type="text"
                  value={editAlunosDados.matricula}
                  onChange={(e) => setEditAlunosDados({ ...editAlunosDados, matricula: e.target.value })}
                  required
                /></div>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Período:</label>
                  <select
                    value={editAlunosDados.periodo.id}
                    onChange={(e) =>
                      setEditAlunosDados({
                        ...editAlunosDados,
                        periodo: { id: e.target.value }
                      })
                    }
                  >
                    <option value="">Selecione um periodo</option>
                    {periodos.map((periodo) => (
                      <option key={periodo.id} value={periodo.id}>
                        {periodo.semestrereferencia}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Curso:</label>
                  <select
                    value={editAlunosDados.curso.id}
                    onChange={(e) =>
                      setEditAlunosDados({
                        ...editAlunosDados,
                        curso: { id: e.target.value }
                      })
                    }
                  >
                    <option value="">Selecione um curso</option>
                    {cursos.map((curso) => (
                      <option key={curso.id} value={curso.id}>
                        {curso.nome}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button onClick={saveEditAluno}>Salvar</button>
              </div>
            ) : (
              <div>
                <table className={`${styles.table} ${modoEdicao ? styles.hidden : ""}`} style={{ display: modoEdicao ? "none" : "table" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOME</th>
                      <th>EMAIL</th>
                      <th>SENHA</th>
                      <th>TELEFONE</th>
                      <th>MATRICULA</th>
                      <th>PERÍODO</th>
                      <th>CURSO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Alunos.map((aluno) => (
                      <tr key={aluno.id}>
                        <td>{aluno.id}</td>
                        <td>{aluno.nome}</td>
                        <td>{aluno.email}</td>
                        <td>{aluno.senha}</td>
                        <td>{aluno.telefone}</td>
                        <td>{aluno.matricula}</td>
                        <td>{aluno.periodo ? aluno.periodo.semestrereferencia : ""}</td>
                        <td>{aluno.curso ? aluno.curso.nome : ""}</td>
                        <div className={styles.icones}>
                          <BsPencil onClick={() => editAluno(aluno.id)} />
                          <BsFillTrashFill onClick={() => removeAluno(aluno.id)} />
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {modoEdicao ? (
                  <div className={styles.editForm}>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Nome:</label>
                      <input
                        type="text"
                        value={novoAluno.nome}
                        onChange={(e) => setNovoAluno({ ...novoAluno, nome: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Email:</label>
                      <input
                        type="email"
                        value={novoAluno.email}
                        onChange={(e) => setNovoAluno({ ...novoAluno, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Senha:</label>
                      <input
                        type="password"
                        value={novoAluno.senha}
                        onChange={(e) => setNovoAluno({ ...novoAluno, senha: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Telefone:</label>
                      <input
                        type="text"
                        value={novoAluno.telefone}
                        onChange={(e) => setNovoAluno({ ...novoAluno, telefone: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Matrícula:</label>
                      <input
                        type="text"
                        value={novoAluno.matricula}
                        onChange={(e) => setNovoAluno({ ...novoAluno, matricula: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Período:</label>
                      <select
                        value={periodoId}
                        onChange={(e) => setPeriodoId(e.target.value)}
                      >
                        <option value="">Selecione um periodo</option>
                        {periodos.map((periodo) => (
                          <option key={periodo.id} value={periodo.id}>
                            {periodo.semestrereferencia}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Curso:</label>
                      <select
                        value={cursoId}
                        onChange={(e) => setCursoId(e.target.value)}
                      >
                        <option value="">Selecione um curso</option>
                        {cursos.map((curso) => (
                          <option key={curso.id} value={curso.id}>
                            {curso.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button onClick={cadastrarAluno}>Cadastrar</button>
                    {mensagemErro && <p>{mensagemErro}</p>}
                  </div>
                ) : null}
              </div>
            )}
          </main>
        </div>
    </div>
    </>
  );
}

export default Alunos;
