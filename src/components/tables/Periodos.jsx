import styles from '../styles/Tables.module.css';
import React, { useEffect, useState } from "react";
import AdminNavBar from "../form/AdminNavBar";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs";

function Periodos(){
    const [Periodos, setPeriodos] = useState([])
    const [editPeriodoId, setEditPeriodoId] = useState(null);
    const [editPeriodosDados, setEditPeriodosDados] = useState({});
    const [filtroPeriodo, setFiltroPeriodo] = useState("");
    const [novoPeriodo, setNovoPeriodo] = useState({
      semestrereferencia: ""
    });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

  const cadastrarPeriodo = () => {
    axios
      .post("http://127.0.0.1:5000/api/periodo", novoPeriodo)
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
        axios.get('http://127.0.0.1:5000/api/periodo')
          .then((response) => setPeriodos(response.data))
          .catch((err) => console.log(err));
      }, []);

      const removePeriodo = (id) => {
        axios.delete(`http://127.0.0.1:5000/api/periodo/${id}`)
          .then((response) => {
            const AttListaPeriodos = Periodos.filter((periodo) => periodo.id !== id);
            setPeriodos(AttListaPeriodos);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const editPeriodo = (id) => {
        axios.get(`http://127.0.0.1:5000/api/periodo/${id}`)
          .then((response) => {
            setEditPeriodosDados(response.data);
            setEditPeriodoId(id);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const saveEditPeriodo = () => {
        axios.put(`http://127.0.0.1:5000/api/periodo/${editPeriodoId}`, editPeriodosDados)
          .then((response) => {
            const updatedPeriodo = Periodos.map((periodo) => {
              if (periodo.id === editPeriodoId) {
                return response.data;
              }
              return periodo;
            });
            setPeriodos(updatedPeriodo);
            setEditPeriodoId(null);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const filtro_Periodo = Periodos.filter((periodo) =>
      periodo.semestrereferencia && periodo.semestrereferencia.toLowerCase().includes(filtroPeriodo.toLowerCase())
      );

      const adicionarPeriodo = () => {
        setModoEdicao(true);
        setMensagemErro("");
      };

    return(
      <>
      <div className={styles.containerAdminNavBar}>
        <AdminNavBar />
          <div className={styles.container}>
            <main>
            <h1>Periodos</h1>
              <div className={styles.conteudo}>
              <input
              type="text"
              placeholder="Pesquisar"
              value={filtroPeriodo}
              onChange={(e) => setFiltroPeriodo(e.target.value)}
              />
              <button onClick={adicionarPeriodo}>Adicionar</button>
              </div>
              {editPeriodoId ? (
                <div className={styles.editForm}>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Semestre de Referência:</label>
                  <input
                    type="text"
                    value={editPeriodosDados.semestrereferencia}
                    onChange={(e) => setEditPeriodosDados({ ...editPeriodosDados, semestrereferencia: e.target.value })}
                    required
                  /></div>
                  <button onClick={saveEditPeriodo}>Salvar</button>
                </div>
              ) : (
              <div>
                <table className={`${styles.table} ${modoEdicao ? styles.hidden : ""}`} style={{ display: modoEdicao ? "none" : "table" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>SEMESTRE DE REFERÊNCIA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Periodo.map((periodo) => {
                        return (
                          <tr key={periodo.id}>
                            <td>{periodo.id}</td>
                            <td>{periodo.semestrereferencia}</td>
                            <div className={styles.icones}>
                              <BsPencil onClick={() => editPeriodo(periodo.id)}/>
                              <BsFillTrashFill onClick={() => removePeriodo(periodo.id)}/>
                            </div>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {modoEdicao ? (
                  <div className={styles.editForm}>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Semestre de Referência:</label>
                      <input
                        type="text"
                        value={novoPeriodo.semestrereferencia}
                        onChange={(e) => setNovoPeriodo({ ...novoPeriodo, semestrereferencia: e.target.value })}
                        required
                      />
                    </div>
                    <button onClick={cadastrarPeriodo}>Cadastrar</button>
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
export default Periodos;