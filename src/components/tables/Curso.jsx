import styles from '../styles/Tables.module.css';
import React, { useEffect, useState } from "react";
import AdminNavBar from "../form/AdminNavBar";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs";

function Curso(){
    const [cursos, setCursos] = useState([])
    const [editCursoId, setEditCursosId] = useState(null);
    const [editCursoDados, setEditCursoDados] = useState({});
    const [filtroCurso, setFiltroCurso] = useState("");
    const [instituicaoId, setInstituicaoId] = useState(null);
    const [instituicoes, setInstituicoes] = useState([]);
    const [novoCurso, setNovoCurso] = useState({
      nome: "",
      instituicao: { id: null }
    });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    const cadastrarCurso = () => {
      novoCurso.instituicao = { id: instituicaoId };
      axios
        .post("http://127.0.0.1:5000/api/curso", novoCurso)
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
        .get("http://127.0.0.1:5000/api/instituicao")
        .then((response) => setInstituicoes(response.data))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/curso')
          .then((response) => setCursos(response.data))
          .catch((err) => console.log(err));
      }, []);

      const removeCurso = (id) => {
        axios.delete(`http://127.0.0.1:5000/api/curso/${id}`)
          .then((response) => {
            const AttListaCursos = cursos.filter((curso) => curso.id !== id);
            setCursos(AttListaCursos);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const editCurso = (id) => {
        axios.get(`http://127.0.0.1:5000/api/curso/${id}`)
          .then((response) => {
            setEditCursoDados(response.data);
            setEditCursosId(id);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const saveEditCurso = () => {
        axios.put(`http://127.0.0.1:5000/api/curso/${editCursoId}`, editCursoDados)
          .then((response) => {
            const updatedCursos = cursos.map((curso) => {
              if (curso.id === editCursoId) {
                return response.data;
              }
              return curso;
            });
            setCursos(updatedCursos);
            setEditCursosId(null);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const filtro_Curso = cursos.filter((curso) =>
      curso.nome && curso.nome.toLowerCase().includes(filtroCurso.toLowerCase())
      );
      const adicionarCurso = () => {
        setModoEdicao(true);
        setMensagemErro("");
      };

    return(
        <>
        <div className={styles.containerAdminNavBar}>
          <AdminNavBar />
          <div className={styles.container}>
            <main>
            <h1>Cursos</h1>
              <div className={styles.conteudo}>
                <input
                  type="text"
                  placeholder="Pesquisar"
                  value={filtroCurso}
                  onChange={(e) => setFiltroCurso(e.target.value)}
                />
              <button onClick={adicionarCurso}>Adicionar</button>
              </div>
              {editCursoId ? (
                <div className={styles.editForm}>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Nome:</label>
                <input
                    type="text"
                    value={editCursoDados.nome}
                    onChange={(e) => setEditCursoDados({ ...editCursoDados, nome: e.target.value })}
                  /></div>
                  <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Instituição:</label>
                  <select
                    value={editCursoDados.instituicao.id}
                    onChange={(e) =>
                      setEditCursoDados({
                        ...editCursoDados,
                        instituicao: { id: e.target.value }
                      })
                    }
                  >
                    <option value="">Selecione uma instituição</option>
                    {instituicoes.map((instituicao) => (
                      <option key={instituicao.id} value={instituicao.id}>
                        {instituicao.nome}
                      </option>
                    ))}
                  </select>
                </div>
                  <button onClick={saveEditCurso}>Salvar</button>
                </div>
              ) : (
              <div>
                <table className={`${styles.table} ${modoEdicao ? styles.hidden : ""}`} style={{ display: modoEdicao ? "none" : "table" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOME</th>
                      <th>INSTITUIÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Curso.map((curso) => {
                        return (
                          <tr key={curso.id}>
                            <td>{curso.id}</td>
                            <td>{curso.nome}</td>
                            <td>{curso.instituicao ? curso.instituicao.nome : ""}</td>
                            <div className={styles.icones}>
                              <BsPencil onClick={() => editCurso(curso.id)}/>
                              <BsFillTrashFill onClick={() => removeCurso(curso.id)}/>
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
                        value={novoCurso.nome}
                        onChange={(e) => setNovoCurso({ ...novoCurso, nome: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Instituição:</label>
                      <select
                        value={instituicaoId}
                        onChange={(e) => setInstituicaoId(e.target.value)}
                      >
                        <option value="">Selecione uma instituição</option>
                        {instituicoes.map((instituicao) => (
                          <option key={instituicao.id} value={instituicao.id}>
                            {instituicao.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button onClick={cadastrarCurso}>Cadastrar</button>
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
export default Curso;