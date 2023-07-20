import styles from '../styles/Tables.module.css';
import React, { useEffect, useState } from "react";
import AdminNavBar from "../form/AdminNavBar";
import axios from "axios";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

function Coordenador() {
  const [coordenadores, setCoordenadores] = useState([]);
  const [editCoordenadoresId, setEditCoordenadoresId] = useState(null);
  const [editCoordenadoresDados, setEditCoordenadoresDados] = useState({});
  const [filtroCoordenador, setFiltroCoordenador] = useState("");
  const [cursoId, setCursoId] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [novoCoordenador, setNovoCoordenador] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    disciplina: "",
    registrodeTrabalho: "",
    curso: { id: null }
  });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const cadastrarCoordenador = () => {
    novoCoordenador.curso = { id: cursoId };
    axios
      .post("http://127.0.0.1:5000/api/coordenador", novoCoordenador)
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
    axios.get('http://127.0.0.1:5000/api/coordenador')
      .then((response) => setCoordenadores(response.data))
      .catch((err) => console.log(err));
  }, []);

  const removeCoordenador = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/coordenador/${id}`)
      .then((response) => {
        const AttListaCoordenador = coordenadores.filter((coordenador) => coordenador.id !== id);
        setCoordenadores(AttListaCoordenador);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editCoordenador = (id) => {
    axios.get(`http://127.0.0.1:5000/api/coordenador/${id}`)
      .then((response) => {
        setEditCoordenadoresDados(response.data);
        setEditCoordenadoresId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveEditCoordenador = () => {
    axios.put(`http://127.0.0.1:5000/api/coordenador/${editCoordenadoresId}`, editCoordenadoresDados)
      .then((response) => {
        const updatedCoordenadores = coordenadores.map((coordenador) => {
          if (coordenador.id === editCoordenadoresId) {
            return response.data;
          }
          return coordenador;
        });
        setCoordenadores(updatedCoordenadores);
        setEditCoordenadoresId(null);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filtro_coordenador = coordenadores.filter((coordenador) =>
    coordenador.nome && coordenador.nome.toLowerCase().includes(filtroCoordenador.toLowerCase())
  );
  
  const adicionarCoordenador = () => {
    setModoEdicao(true);
    setMensagemErro("");
  };

  return (
    <>
      <div className={styles.containerAdminNavBar}>
        <AdminNavBar />
        <div className={styles.container}>
          <main>
            <h1>Coordenadores</h1>
            <div className={styles.conteudo}>
              <input
                type="text"
                placeholder="Pesquisar"
                value={filtroCoordenador}
                onChange={(e) => setFiltroCoordenador(e.target.value)}
              />
              <button onClick={adicionarCoordenador}>Adicionar</button>
            </div>
            {editCoordenadoresId ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Nome:</label>
                  <input
                    type="text"
                    value={editCoordenadoresDados.nome}
                    onChange={(e) =>
                      setEditCoordenadoresDados({ ...editCoordenadoresDados, nome: e.target.value })
                    }required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Email:</label>
                  <input
                    type="email"
                    value={editCoordenadoresDados.email}
                    onChange={(e) =>
                      setEditCoordenadoresDados({ ...editCoordenadoresDados, email: e.target.value })
                    }required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Senha:</label>
                  <input
                    type="password"
                    value={editCoordenadoresDados.senha}
                    onChange={(e) =>
                      setEditCoordenadoresDados({ ...editCoordenadoresDados, senha: e.target.value })
                    }required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Telefone:</label>
                  <input
                    type="text"
                    value={editCoordenadoresDados.telefone}
                    onChange={(e) =>
                      setEditCoordenadoresDados({ ...editCoordenadoresDados, telefone: e.target.value })
                    }required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Disciplina:</label>
                  <input
                    type="text"
                    value={editCoordenadoresDados.disciplina}
                    onChange={(e) =>
                      setEditCoordenadoresDados({ ...editCoordenadoresDados, disciplina: e.target.value })
                    }required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Registro de Trabalho:</label>
                  <input
                    type="text"
                    value={editCoordenadoresDados.registrodeTrabalho}
                    onChange={(e) =>
                      setEditCoordenadoresDados({ ...editCoordenadoresDados, registrodeTrabalho: e.target.value })
                    }required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Curso:</label>
                  <select
                    value={editCoordenadoresDados.curso.id}
                    onChange={(e) =>
                      setEditCoordenadoresDados({
                        ...editCoordenadoresDados,
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
                <button onClick={saveEditCoordenador}>Salvar</button>
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
                      <th>REGISTRO DE TRABALHO</th>
                      <th>CURSO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_coordenador.map((coordenador) => {
                      return (
                        <tr key={coordenador.id}>
                          <td>{coordenador.id}</td>
                          <td>{coordenador.nome}</td>
                          <td>{coordenador.email}</td>
                          <td>{coordenador.senha}</td>
                          <td>{coordenador.telefone}</td>
                          <td>{coordenador.disciplina}</td>
                          <td>{coordenador.registrodeTrabalho}</td>
                          <td>{coordenador.curso ? coordenador.curso.nome : ""}</td>
                          <div className={styles.icones}>
                            <BsPencil onClick={() => editCoordenador(coordenador.id)} />
                            <BsFillTrashFill onClick={() => removeCoordenador(coordenador.id)} />
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
                        value={novoCoordenador.nome}
                        onChange={(e) => setNovoCoordenador({ ...novoCoordenador, nome: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Email:</label>
                      <input
                        type="email"
                        value={novoCoordenador.email}
                        onChange={(e) => setNovoCoordenador({ ...novoCoordenador, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Senha:</label>
                      <input
                        type="password"
                        value={novoCoordenador.senha}
                        onChange={(e) => setNovoCoordenador({ ...novoCoordenador, senha: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Telefone:</label>
                      <input
                        type="text"
                        value={novoCoordenador.telefone}
                        onChange={(e) => setNovoCoordenador({ ...novoCoordenador, telefone: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Disciplina:</label>
                      <input
                        type="text"
                        value={novoCoordenador.disciplina}
                        onChange={(e) => setNovoCoordenador({ ...novoCoordenador, disciplina: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Registro de Trabalho:</label>
                      <input
                        type="text"
                        value={novoCoordenador.registrodeTrabalho}
                        onChange={(e) => setNovoCoordenador({ ...novoCoordenador, registrodeTrabalho: e.target.value })}
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
                    <button onClick={cadastrarCoordenador}>Cadastrar</button>
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

export default Coordenador;
