import styles from '../styles/Tables.module.css';
import React, { useEffect, useState } from "react";
import AdminNavBar from "../form/AdminNavBar";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs";

function Instituicao(){
    const [instituicoes, setInstituicoes] = useState([])
    const [editInstituicaoId, setEditInstituicaoId] = useState(null);
    const [editInstituicaoDados, setEditInstituicaoDados] = useState({});
    const [filtroInstituicao, setFiltroInstituicao] = useState("");
    const [enderecoId, setEnderecoId] = useState(null);
    const [enderecos, setEnderecos] = useState([]);
    const [novaInstituicao, setNovaInstituicao] = useState({
      nome: "",
      endereco: { id: null }
    });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    const cadastrarInstituicao = () => {
      novaInstituicao.endereco = { id: enderecoId };
      axios
        .post("http://127.0.0.1:5000/api/instituicao", novaInstituicao)
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
        .get("http://127.0.0.1:5000/api/endereco")
        .then((response) => setEnderecos(response.data))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/instituicao')
          .then((response) => setInstituicoes(response.data))
          .catch((err) => console.log(err));
      }, []);

      const removeInstituicao = (id) => {
        axios.delete(`http://127.0.0.1:5000/api/instituicao/${id}`)
          .then((response) => {
            const AttListaInstituicao = instituicoes.filter((instituicao) => instituicao.id !== id);
            setInstituicoes(AttListaInstituicao);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const editInstituicao = (id) => {
        axios.get(`http://127.0.0.1:5000/api/instituicao/${id}`)
          .then((response) => {
            setEditInstituicaoDados(response.data);
            setEditInstituicaoId(id);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const saveEditInstituicao = () => {
        axios.put(`http://127.0.0.1:5000/api/instituicao/${editInstituicaoId}`, editInstituicaoDados)
          .then((response) => {
            const updatedIntituicao = instituicoes.map((instituicao) => {
              if (instituicao.id === editInstituicaoId) {
                return response.data;
              }
              return instituicao;
            });
            setInstituicoes(updatedIntituicao);
            setEditInstituicaoId(null);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const filtro_Instituicao = instituicoes.filter((instituicao) =>
      instituicao.nome && instituicao.nome.toLowerCase().includes(filtroInstituicao.toLowerCase())
      );

      const adicionarInstituicao = () => {
        setModoEdicao(true);
        setMensagemErro("");
      };

    return(
      <>
      <div className={styles.containerAdminNavBar}>
        <AdminNavBar /> 
          <div className={styles.container}>
            <main>
            <h1>Instituições</h1>
              <div className={styles.conteudo}>
              <input
              type="text"
              placeholder="Pesquisar"
              value={filtroInstituicao}
              onChange={(e) => setFiltroInstituicao(e.target.value)}
            />
              <button onClick={adicionarInstituicao}>Adicionar</button>
              </div>
              {editInstituicaoId ? (
                <div className={styles.editForm}>
                  <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Nome:</label>
                  <input
                    type="text"
                    value={editInstituicaoDados.nome}
                    onChange={(e) => setEditInstituicaoDados({ ...editInstituicaoDados, nome: e.target.value })}
                  /></div>
                  <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Endereco:</label>
                  <select
                    value={editInstituicaoDados.endereco.id}
                    onChange={(e) =>
                      setEditInstituicaoDados({
                        ...editInstituicaoDados,
                        endereco: { id: e.target.value }
                      })
                    }
                  >
                    <option value="">Selecione um endereço</option>
                    {enderecos.map((endereco) => (
                      <option key={endereco.id} value={endereco.id}>
                        {endereco.rua}
                      </option>
                    ))}
                  </select>
                </div>
                  <button onClick={saveEditInstituicao}>Salvar</button>
                </div>
              ) : (
              <div>
                <table className={`${styles.table} ${modoEdicao ? styles.hidden : ""}`} style={{ display: modoEdicao ? "none" : "table" }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOME</th>
                      <th>ENDEREÇO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Instituicao.map((instituicao) => {
                        return (
                          <tr key={instituicao.id}>
                            <td>{instituicao.id}</td>
                            <td>{instituicao.nome}</td>
                            <td>{instituicao.endereco ? instituicao.endereco.rua : ""}</td>
                            <div className={styles.icones}>
                              <BsPencil onClick={() => editInstituicao(instituicao.id)}/>
                              <BsFillTrashFill onClick={() => removeInstituicao(instituicao.id)}/>
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
                        value={novaInstituicao.nome}
                        onChange={(e) => setNovaInstituicao({ ...novaInstituicao, nome: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Endereço:</label>
                      <select
                        value={enderecoId}
                        onChange={(e) => setEnderecoId(e.target.value)}
                      >
                        <option value="">Selecione um endereço</option>
                        {enderecos.map((endereco) => (
                          <option key={endereco.id} value={endereco.id}>
                            {endereco.rua}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button onClick={cadastrarInstituicao}>Cadastrar</button>
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
export default Instituicao;