import styles from '../styles/Tables.module.css';
import React, { useEffect, useState } from "react";
import AdminNavBar from "../form/AdminNavBar";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs";

function Endereco() {
    const [enderecos, setEnderecos] = useState([]);
    const [editEnderecoId, setEditEnderecosId] = useState(null);
    const [editEnderecoDados, setEditEnderecoDados] = useState({});
    const [filtroEndereco, setFiltroEndereco] = useState("");  
    const [novoEndereco, setNovoEndereco] = useState({
      rua: "",
      bairro: "",
      cep: "",
      numero: "",
      complemento: ""
    });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

  const cadastrarEndereco = () => {
    axios
      .post("http://127.0.0.1:5000/api/endereco", novoEndereco)
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
      axios.get('http://127.0.0.1:5000/api/endereco')
        .then((response) => setEnderecos(response.data))
        .catch((err) => console.log(err));
    }, []);

    const removeEndereco = (id) => {
      axios.delete(`http://127.0.0.1:5000/api/endereco/${id}`)
        .then((response) => {
          const AttListaEndereco = enderecos.filter((endereco) => endereco.id !== id);
          setEnderecos(AttListaEndereco);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const editEndereco = (id) => {
      axios.get(`http://127.0.0.1:5000/api/endereco/${id}`)
        .then((response) => {
          setEditEnderecoDados(response.data);
          setEditEnderecosId(id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const saveEditEndereco = () => {
      axios.put(`http://127.0.0.1:5000/api/endereco/${editEnderecoId}`, editEnderecoDados)
        .then((response) => {
          const updatedEnderecos = enderecos.map((endereco) => {
            if (endereco.id === editEnderecoId) {
              return response.data;
            }
            return endereco;
          });
          setEnderecos(updatedEnderecos);
          setEditEnderecosId(null);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const filtro_Endereco = enderecos.filter((endereco) =>
      endereco.rua && endereco.rua.toLowerCase().includes(filtroEndereco.toLowerCase())
    );

    const adicionarEndereco = () => {
      setModoEdicao(true);
      setMensagemErro("");
    };

    return(
    <>
    <div className={styles.containerAdminNavBar}>
      <AdminNavBar />
        <div className={styles.container}>
          <main>
          <h1>Endereços</h1>
            <div className={styles.conteudo}>
            <input
            type="text"
            placeholder="Pesquisar"
            value={filtroEndereco}
            onChange={(e) => setFiltroEndereco(e.target.value)}
          />
            <button onClick={adicionarEndereco}>Adicionar</button>
            </div>
            {editEnderecoId ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Rua:</label>
                <input
                  type="text"
                  value={editEnderecoDados.rua}
                  onChange={(e) => setEditEnderecoDados({ ...editEnderecoDados, rua: e.target.value })}
                /></div>                
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Bairro:</label>
                <input
                  type="text"
                  value={editEnderecoDados.bairro}
                  onChange={(e) => setEditEnderecoDados({ ...editEnderecoDados, bairro: e.target.value })}
                /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Cep:</label>
                <input
                  type="text"
                  value={editEnderecoDados.cep}
                  onChange={(e) => setEditEnderecoDados({ ...editEnderecoDados, cep: e.target.value })}
                /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Número:</label>
                <input
                  type="text"
                  value={editEnderecoDados.numero}
                  onChange={(e) => setEditEnderecoDados({ ...editEnderecoDados, numero: e.target.value })}
                /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Complemento:</label>
                <input
                  type="text"
                  value={editEnderecoDados.complemento}
                  onChange={(e) => setEditEnderecoDados({ ...editEnderecoDados, complemento: e.target.value })}
                /></div>
                <button onClick={saveEditEndereco}>Salvar</button>
              </div>
            ) : (
            <div>
                <table className={`${styles.table} ${modoEdicao ? styles.hidden : ""}`} style={{ display: modoEdicao ? "none" : "table" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>RUA</th>
                    <th>BAIRRO</th>
                    <th>CEP</th>
                    <th>NÚMERO</th>
                    <th>COMPLEMENTO</th>
                  </tr>
                </thead>
                <tbody>
                  {filtro_Endereco.map((endereco) => {
                      return (
                        <tr key={endereco.id}>
                          <td>{endereco.id}</td>
                          <td>{endereco.rua}</td>
                          <td>{endereco.bairro}</td>
                          <td>{endereco.cep}</td>
                          <td>{endereco.numero}</td>
                          <td>{endereco.complemento}</td>
                          <div className={styles.icones}>
                            <BsPencil onClick={() => editEndereco(endereco.id)}/>
                            <BsFillTrashFill onClick={() => removeEndereco(endereco.id)}/>
                          </div>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {modoEdicao ? (
                  <div className={styles.editForm}>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Rua:</label>
                      <input
                        type="text"
                        value={novoEndereco.rua}
                        onChange={(e) => setNovoEndereco({ ...novoEndereco, rua: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Bairro:</label>
                      <input
                        type="text"
                        value={novoEndereco.bairro}
                        onChange={(e) => setNovoEndereco({ ...novoEndereco, bairro: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Cep:</label>
                      <input
                        type="text"
                        value={novoEndereco.cep}
                        onChange={(e) => setNovoEndereco({ ...novoEndereco, cep: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Número:</label>
                      <input
                        type="text"
                        value={novoEndereco.numero}
                        onChange={(e) => setNovoEndereco({ ...novoEndereco, numero: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Complemento:</label>
                      <input
                        type="text"
                        value={novoEndereco.complemento}
                        onChange={(e) => setNovoEndereco({ ...novoEndereco, complemento: e.target.value })}
                        required
                      />
                    </div>
                    <button onClick={cadastrarEndereco}>Cadastrar</button>
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
export default Endereco;