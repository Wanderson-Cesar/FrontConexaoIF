import styles from '../styles/Tables.module.css';
import React, { useEffect, useState } from "react";
import AdminNavBar from "../form/AdminNavBar";
import axios from "axios";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

function AlunoGrupo() {
  const [alunosGrupo, setAlunosGrupo] = useState([]);
  const [editAlunoGrupoId, setEditAlunoGrupoId] = useState(null);
  const [editAlunoGrupoDados, setEditAlunoGrupoDados] = useState({});
  const [filtroAlunoGrupo, setFiltroAlunoGrupo] = useState("");
  const [alunoId, setAlunoId] = useState(null);
  const [grupoId, setGrupoId] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [novoAlunoGrupo, setNovoAlunoGrupo] = useState({
    aluno_id: null,
    grupo_id: null,
  });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");


  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/alunogrupo?_expand=aluno&_expand=grupo")
      .then((response) => {
        const data = response.data.map((alunoGrupo) => ({
          ...alunoGrupo,
          grupo_id: alunoGrupo.grupo ? alunoGrupo.grupo.id : null
        }));
        setAlunosGrupo(data);
        console.log(data); // Add this line
      })
      .catch((error) => console.log(error));
  }, []);


  const cadastrarAlunoGrupo = () => {
    novoAlunoGrupo.aluno_id = alunoId;
    novoAlunoGrupo.grupo_id = grupoId;
    axios
      .post("http://127.0.0.1:5000/api/alunogrupo", novoAlunoGrupo)
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
      .get("http://127.0.0.1:5000/api/aluno")
      .then((response) => setAlunos(response.data))
      .catch((error) => console.log(error));
    axios
      .get("http://127.0.0.1:5000/api/grupo")
      .then((response) => setGrupos(response.data))
      .catch((error) => console.log(error));
  }, []);

 

  const removeAlunoGrupo = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/api/alunogrupo/${id}`)
      .then((response) => {
        const updatedAlunosGrupo = alunosGrupo.filter((alunoGrupo) => alunoGrupo.id !== id);
        setAlunosGrupo(updatedAlunosGrupo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editAlunoGrupo = (id) => {
    axios
      .get(`http://127.0.0.1:5000/api/alunogrupo/${id}`)
      .then((response) => {
        setEditAlunoGrupoDados(response.data);
        setEditAlunoGrupoId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveEditAlunoGrupo = () => {
    axios
      .put(`http://127.0.0.1:5000/api/alunogrupo/${editAlunoGrupoId}`, editAlunoGrupoDados)
      .then((response) => {
        const updatedAlunosGrupo = alunosGrupo.map((alunoGrupo) => {
          if (alunoGrupo.id === editAlunoGrupoId) {
            return response.data;
          }
          return alunoGrupo;
        });
        setAlunosGrupo(updatedAlunosGrupo);
        setEditAlunoGrupoId(null);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filtro_AlunoGrupo = alunosGrupo.filter((alunoGrupo) =>
    alunoGrupo.aluno && alunoGrupo.aluno.nome.toLowerCase().includes(filtroAlunoGrupo.toLowerCase())
  );

  const adicionarAlunoGrupo = () => {
    setModoEdicao(true);
    setMensagemErro("");
  };

  return (
    <>
      <div className={styles.containerAdminNavBar}>
        <AdminNavBar />
        <div className={styles.container}>
          <main>
            <h1>Alunos Grupo</h1>
            <div className={styles.conteudo}>
              <input
                type="text"
                placeholder="Pesquisar"
                value={filtroAlunoGrupo}
                onChange={(e) => setFiltroAlunoGrupo(e.target.value)}
              />
              <button onClick={adicionarAlunoGrupo}>Adicionar</button>
            </div>
            {editAlunoGrupoId ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Aluno:</label>
                  <select
                    value={editAlunoGrupoDados.aluno_id}
                    onChange={(e) =>
                      setEditAlunoGrupoDados({
                        ...editAlunoGrupoDados,
                        aluno_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Selecione um aluno</option>
                    {alunos.map((aluno) => (
                      <option key={aluno.id} value={aluno.id}>
                        {aluno.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Grupo:</label>
                  <select
                    value={editAlunoGrupoDados.grupo_id}
                    onChange={(e) =>
                      setEditAlunoGrupoDados({
                        ...editAlunoGrupoDados,
                        grupo_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Selecione um grupo</option>
                    {grupos.map((grupo) => (
                      <option key={grupo.id} value={grupo.id}>
                        {grupo.id}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={saveEditAlunoGrupo}>Salvar</button>
              </div>
            ) : (
                <div>
                <table className={`${styles.table} ${modoEdicao ? styles.hidden : ""}`} style={{ display: modoEdicao ? "none" : "table" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Alunos</th>
                      <th> ID do Aluno</th> {/* New column */}
                      <th> ID do Grupo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_AlunoGrupo.map((alunoGrupo) => {
                      return (
                        <tr key={alunoGrupo.id}>
                          <td>{alunoGrupo.id}</td>
                          <td>{alunoGrupo.aluno ? alunoGrupo.aluno.nome : ""}</td>
                          <td>{alunoGrupo.aluno ? alunoGrupo.aluno.id : ""}</td> {/* Display Aluno ID */}
                          <td>{alunoGrupo.grupo ? alunoGrupo.grupo.id : ""}</td>
                          <div className={styles.icones}>
                            <BsPencil onClick={() => editAlunoGrupo(alunoGrupo.id)} />
                            <BsFillTrashFill onClick={() => removeAlunoGrupo(alunoGrupo.id)} />
                          </div>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              
              
                {modoEdicao ? (
                  <div className={styles.editForm}>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Aluno:</label>
                      <select
                        value={novoAlunoGrupo.aluno_id}
                        onChange={(e) => setNovoAlunoGrupo({ ...novoAlunoGrupo, aluno_id: e.target.value })}
                        required
                      >
                        <option value="">Selecione um aluno</option>
                        {alunos.map((aluno) => (
                          <option key={aluno.id} value={aluno.id}>
                            {aluno.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Grupo:</label>
                      <select
                        value={novoAlunoGrupo.grupo_id}
                        onChange={(e) => setNovoAlunoGrupo({ ...novoAlunoGrupo, grupo_id: e.target.value })}
                        required
                      >
                        <option value="">Selecione um grupo</option>
                        {grupos.map((grupo) => (
                          <option key={grupo.id} value={grupo.id}>
                            {grupo.id}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button onClick={cadastrarAlunoGrupo}>Cadastrar</button>
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

export default AlunoGrupo;
