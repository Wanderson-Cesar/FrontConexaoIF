import styles from '../styles/Tables.module.css';
import React, { useEffect, useState } from "react";
import AdminNavBar from "../form/AdminNavBar";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs";

function Grupo(){
    const [grupos, setGrupos] = useState([])
    const [editGrupoId, setEditGrupoId] = useState(null);
    const [editGruposDados, setEditGruposDados] = useState({});
    const [filtroGrupo, setFiltroGrupo] = useState("");
    const [coordenadorId, setCoordenadorId] = useState(null);
    const [coordenadores, setCoordenadores] = useState([]);
    const [novoGrupo, setNovoGrupo] = useState({
      titulo: "",
      link: "",
      semestreturma: "",
      coordenador: { id: null }
    });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    const cadastrarGrupo = () => {
      novoGrupo.coordenador = { id: coordenadorId };
      axios
        .post("http://127.0.0.1:5000/api/grupo", novoGrupo)
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
        .get("http://127.0.0.1:5000/api/coordenador")
        .then((response) => setCoordenadores(response.data))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/grupo')
          .then((response) => setGrupos(response.data))
          .catch((err) => console.log(err));
      }, []);

      const removeGrupo = (id) => {
        axios.delete(`http://127.0.0.1:5000/api/grupo/${id}`)
          .then((response) => {
            const AttListaGrupo = grupos.filter((grupo) => grupo.id !== id);
            setGrupos(AttListaGrupo);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const editGrupo = (id) => {
        axios.get(`http://127.0.0.1:5000/api/grupo/${id}`)
          .then((response) => {
            setEditGruposDados(response.data);
            setEditGrupoId(id);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const saveEditGrupo = () => {
        axios.put(`http://127.0.0.1:5000/api/grupo/${editGrupoId}`, editGruposDados)
          .then((response) => {
            const updatedGrupos = grupos.map((grupo) => {
              if (grupo.id === editGrupoId) {
                return response.data;
              }
              return grupo;
            });
            setGrupos(updatedGrupos);
            setEditGrupoId(null);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const filtro_Grupo = grupos.filter((grupo) =>
      grupo.titulo && grupo.titulo.toLowerCase().includes(filtroGrupo.toLowerCase())
      );

      const adicionarGrupo = () => {
        setModoEdicao(true);
        setMensagemErro("");
      };

    return(
      <>
      <div className={styles.containerAdminNavBar}>
        <AdminNavBar />
          <div className={styles.container}>
            <main>
            <h1>Grupos</h1>
              <div className={styles.conteudo}>
              <input
              type="text"
              placeholder="Pesquisar"
              value={filtroGrupo}
              onChange={(e) => setFiltroGrupo(e.target.value)}
              />
              <button onClick={adicionarGrupo}>Adicionar</button>
              </div>
              {editGrupoId ? (
                <div className={styles.editForm}>
                  <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Título:</label>
                  <input
                    type="text"
                    value={editGruposDados.titulo}
                    onChange={(e) => setEditGruposDados({ ...editGruposDados, titulo: e.target.value })}
                    required
                  /></div>
                  <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Link:</label>
                  <input
                    type="text"
                    value={editGruposDados.link}
                    onChange={(e) => setEditGruposDados({ ...editGruposDados, link: e.target.value })}
                    required
                  /></div>
                  <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Semestre da Turma:</label>
                  <input
                    type="text"
                    value={editGruposDados.semestreturma}
                    onChange={(e) => setEditGruposDados({ ...editGruposDados, semestreturma: e.target.value })}
                    required
                  /></div>
                  <div className={styles.formGroup}>
                    <label style={{ color: 'white' }}>Coordenador:</label>
                    <select
                      value={editGruposDados.coordenador.id}
                      onChange={(e) =>
                        setEditGruposDados({
                          ...editGruposDados,
                          coordenador: { id: e.target.value }
                        })
                      }
                    >
                      <option value="">Selecione um coordenador</option>
                      {coordenadores.map((coordenador) => (
                        <option key={coordenador.id} value={coordenador.id}>
                          {coordenador.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button onClick={saveEditGrupo}>Salvar</button>
                </div>
              ) : (
              <div>
                <table className={`${styles.table} ${modoEdicao ? styles.hidden : ""}`} style={{ display: modoEdicao ? "none" : "table" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>TÍTULO</th>
                      <th>LINK</th>
                      <th>SEMESTRE DA TURMA</th>
                      <th>COORDENADOR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Grupo.map((grupo) => {
                        return (
                          <tr key={grupo.id}>
                            <td>{grupo.id}</td>
                            <td>{grupo.titulo}</td>
                            <td>{grupo.link}</td>
                            <td>{grupo.semestreturma}</td>
                            <td>{grupo.coordenador ? grupo.coordenador.nome : ""}</td>
                            <div className={styles.icones}>
                              <BsPencil onClick={() => editGrupo(grupo.id)}/>
                              <BsFillTrashFill onClick={() => removeGrupo(grupo.id)}/>
                            </div>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {modoEdicao ? (
                  <div className={styles.editForm}>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Título:</label>
                      <input
                        type="text"
                        value={novoGrupo.titulo}
                        onChange={(e) => setNovoGrupo({ ...novoGrupo, titulo: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Link:</label>
                      <input
                        type="text"
                        value={novoGrupo.link}
                        onChange={(e) => setNovoGrupo({ ...novoGrupo, link: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Semestre da Turma:</label>
                      <input
                        type="text"
                        value={novoGrupo.semestreturma}
                        onChange={(e) => setNovoGrupo({ ...novoGrupo, semestreturma: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Coordenador:</label>
                      <select
                        value={coordenadorId}
                        onChange={(e) => setCoordenadorId(e.target.value)}
                      >
                        <option value="">Selecione um coordenador</option>
                        {coordenadores.map((coordenador) => (
                          <option key={coordenador.id} value={coordenador.id}>
                            {coordenador.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button onClick={cadastrarGrupo}>Cadastrar</button>
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
export default Grupo;