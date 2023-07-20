import styles from '../styles/Tables.module.css';
import React, { useEffect, useState } from "react";
import AdminNavBar from "../form/AdminNavBar";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs";

function Professor() {
    const [professores, setProfessor] = useState([]);
    const [editProfessorId, setEditProfessorId] = useState(null);
    const [editProfessoresDados, setEditProfessoresDados] = useState({});
    const [filtroProfessor, setFiltroProfessor] = useState("");
    const [cursoId, setCursoId] = useState(null);
    const [cursos, setCursos] = useState([]);
    const [novoProfessor, setNovoProfessor] = useState({
      nome: "",
      email: "",
      senha: "",
      telefone: "",
      disciplina: "",
      curso: { id: null }
    });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    const cadastrarProfessor = () => {
      novoProfessor.curso = { id: cursoId };
      axios
        .post("http://127.0.0.1:5000/api/professor", novoProfessor)
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
        .get("http://127.0.0.1:5000/api/curso")
        .then((response) => setCursos(response.data))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
      axios.get('http://127.0.0.1:5000/api/professor')
        .then((response) => setProfessor(response.data))
        .catch((err) => console.log(err));
    }, []);

    const removeProfessor = (id) => {
      axios.delete(`http://127.0.0.1:5000/api/professor/${id}`)
        .then((response) => {
          const AttListaProfessores = professores.filter((professor) => professor.id !== id);
          setProfessor(AttListaProfessores);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const editProfessor = (id) => {
      axios.get(`http://127.0.0.1:5000/api/professor/${id}`)
        .then((response) => {
          setEditProfessoresDados(response.data);
          setEditProfessorId(id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const saveEditProfessor = () => {
      axios.put(`http://127.0.0.1:5000/api/professor/${editProfessorId}`, editProfessoresDados)
        .then((response) => {
          const updatedProfessor = professores.map((professor) => {
            if (professor.id === editProfessorId) {
              return response.data;
            }
            return professor;
          });
          setProfessor(updatedProfessor);
          setEditProfessorId(null);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const filtro_Professor = professores.filter((professor) =>
    professor.nome && professor.nome.toLowerCase().includes(filtroProfessor.toLowerCase())
    );

    const adicionarProfessor = () => {
      setModoEdicao(true);
      setMensagemErro("");
    };

    return(
    <>
    <div className={styles.containerAdminNavBar}>
      <AdminNavBar />
        <div className={styles.container}>
          <main>
          <h1 className={styles}>Professores</h1>
            <div className={styles.conteudo}>
            <input
            type="text"
            placeholder="Pesquisar"
            value={filtroProfessor}
            onChange={(e) => setFiltroProfessor(e.target.value)}
            />
            <button onClick={adicionarProfessor}>Adicionar</button>
            </div>
            {editProfessorId ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Nome:</label>
                  <input
                    type="text"
                    value={editProfessoresDados.nome}
                    onChange={(e) => setEditProfessoresDados({ ...editProfessoresDados, nome: e.target.value })}
                    required
                  /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Email:</label>
                  <input
                    type="email"
                    value={editProfessoresDados.email}
                    onChange={(e) => setEditProfessoresDados({ ...editProfessoresDados, email: e.target.value })}
                    required
                  /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Senha:</label>  
                  <input
                    type="password"
                    value={editProfessoresDados.senha}
                    onChange={(e) => setEditProfessoresDados({ ...editProfessoresDados, senha: e.target.value })}
                    required
                  /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Telefone:</label>  
                  <input
                    type="text"
                    value={editProfessoresDados.telefone}
                    onChange={(e) => setEditProfessoresDados({ ...editProfessoresDados, telefone: e.target.value })}
                    required
                  /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Disciplina:</label> 
                  <input
                    type="text"
                    value={editProfessoresDados.disciplina}
                    onChange={(e) => setEditProfessoresDados({ ...editProfessoresDados, disciplina: e.target.value })}
                    required
                  /></div>
                  <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Curso:</label>
                  <select
                    value={editProfessoresDados.curso.id}
                    onChange={(e) =>
                      setEditProfessoresDados({
                        ...editProfessoresDados,
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
                <button onClick={saveEditProfessor}>Salvar</button>
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
                    <th>DISCIPLINA</th>
                    <th>CURSO</th>
                  </tr>
                </thead>
                <tbody>
                  {filtro_Professor.map((professor) => {
                      return (
                        <tr key={professor.id}>
                          <td>{professor.id}</td>
                          <td>{professor.nome}</td>
                          <td>{professor.email}</td>
                          <td>{professor.senha}</td>
                          <td>{professor.telefone}</td>
                          <td>{professor.disciplina}</td>
                          <td>{professor.curso ? professor.curso.nome : ""}</td>
                          <div className={styles.icones}>
                            <BsPencil onClick={() => editProfessor(professor.id)}/>
                            <BsFillTrashFill onClick={() => removeProfessor(professor.id)}/>
                          </div>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {modoEdicao ? (
                  <div className={styles.editForm}>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Nome:</label>
                      <input
                        type="text"
                        value={novoProfessor.nome}
                        onChange={(e) => setNovoProfessor({ ...novoProfessor, nome: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Email:</label>
                      <input
                        type="email"
                        value={novoProfessor.email}
                        onChange={(e) => setNovoProfessor({ ...novoProfessor, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Senha:</label>
                      <input
                        type="password"
                        value={novoProfessor.senha}
                        onChange={(e) => setNovoProfessor({ ...novoProfessor, senha: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Telefone:</label>
                      <input
                        type="text"
                        value={novoProfessor.telefone}
                        onChange={(e) => setNovoProfessor({ ...novoProfessor, telefone: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Disciplina:</label>
                      <input
                        type="text"
                        value={novoProfessor.disciplina}
                        onChange={(e) => setNovoProfessor({ ...novoProfessor, disciplina: e.target.value })}
                        required
                      />
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
                    <button onClick={cadastrarProfessor}>Cadastrar</button>
                    {mensagemErro && <p>{mensagemErro}</p>}
                  </div>
                ) : null}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
    )
}
export default Professor;