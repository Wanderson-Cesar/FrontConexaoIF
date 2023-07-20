import styles from '../styles/Tables.module.css';
import React, { useEffect, useState } from "react";
import AdminNavBar from "../form/AdminNavBar";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs";

function Pessoas() {
    const [pessoas, setPessoas] = useState([]);
    const [editPessoaId, setEditPessoaId] = useState(null);
    const [editPessoaDados, setEditPessoaDados] = useState({});
    const [filtroPessoa, setFiltroPessoa] = useState("");
    const [novaPessoa, setNovaPessoa] = useState({
      nome: "",
      email: "",
      senha: "",
      telefone: ""
    });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

  const cadastrarPessoa = () => {
    axios
      .post("http://127.0.0.1:5000/api/pessoa", novaPessoa)
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
      axios.get('http://127.0.0.1:5000/api/pessoa')
        .then((response) => setPessoas(response.data))
        .catch((err) => console.log(err));
    }, []);

    const removePessoas = (id) => {
      axios.delete(`http://127.0.0.1:5000/api/pessoa/${id}`)
        .then((response) => {
          const AttListaPessoas = pessoas.filter((pessoa) => pessoa.id !== id);
          setPessoas(AttListaPessoas);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const editPessoa = (id) => {
      axios.get(`http://127.0.0.1:5000/api/pessoa/${id}`)
        .then((response) => {
          setEditPessoaDados(response.data);
          setEditPessoaId(id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const saveEditPessoa = () => {
      axios.put(`http://127.0.0.1:5000/api/pessoa/${editPessoaId}`, editPessoaDados)
        .then((response) => {
          const updatedPessoas = pessoas.map((pessoa) => {
            if (pessoa.id === editPessoaId) {
              return response.data;
            }
            return pessoa;
          });
          setPessoas([...updatedPessoas]);
          setEditPessoaId(null);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const filtro_Pessoa = pessoas.filter((pessoa) =>
    pessoa.nome && pessoa.nome.toLowerCase().includes(filtroPessoa.toLowerCase())
    );

    const adicionarPessoa = () => {
      setModoEdicao(true);
      setMensagemErro("");
    };

    return(
    <>
    <div className={styles.containerAdminNavBar}>
      <AdminNavBar />
        <div className={styles.container}>
          <main>
          <h1>Pessoas</h1>
            <div className={styles.conteudo}>
            <input
            type="text"
            placeholder="Pesquisar"
            value={filtroPessoa}
            onChange={(e) => setFiltroPessoa(e.target.value)}
            />
            <button onClick={adicionarPessoa}>Adicionar</button>
            </div>
            {editPessoaId ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Nome:</label>
                <input
                  type="text"
                  value={editPessoaDados.nome}
                  onChange={(e) => setEditPessoaDados({ ...editPessoaDados, nome: e.target.value })}
                  required
                /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Email:</label>
                <input
                  type="email"
                  value={editPessoaDados.email}
                  onChange={(e) => setEditPessoaDados({ ...editPessoaDados, email: e.target.value })}
                  required
                /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Senha:</label>
                <input
                  type="password"
                  value={editPessoaDados.senha}
                  onChange={(e) => setEditPessoaDados({ ...editPessoaDados, senha: e.target.value })}
                  required
                /></div>
                <div className={styles.formGroup}>
                <label style={{ color: 'white' }}>Telefone:</label>
                <input
                  type="text"
                  value={editPessoaDados.telefone}
                  onChange={(e) => setEditPessoaDados({ ...editPessoaDados, telefone: e.target.value })}
                  required
                /></div>
                <button onClick={saveEditPessoa}>Salvar</button>
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
                  </tr>
                </thead>
                <tbody>
                  {filtro_Pessoa.map((pessoa) => {
                      return (
                        <tr key={pessoa.id}>
                          <td>{pessoa.id}</td>
                          <td>{pessoa.nome}</td>
                          <td>{pessoa.email}</td>
                          <td>{pessoa.senha}</td>
                          <td>{pessoa.telefone}</td>
                          <div className={styles.icones}>
                            <BsPencil onClick={() => editPessoa(pessoa.id)}/>
                            <BsFillTrashFill onClick={() => removePessoas(pessoa.id)}/>
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
                        value={novaPessoa.nome}
                        onChange={(e) => setNovaPessoa({ ...novaPessoa, nome: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Email:</label>
                      <input
                        type="email"
                        value={novaPessoa.email}
                        onChange={(e) => setNovaPessoa({ ...novaPessoa, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Senha:</label>
                      <input
                        type="password"
                        value={novaPessoa.senha}
                        onChange={(e) => setNovaPessoa({ ...novaPessoa, senha: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Telefone:</label>
                      <input
                        type="text"
                        value={novaPessoa.telefone}
                        onChange={(e) => setNovaPessoa({ ...novaPessoa, telefone: e.target.value })}
                        required
                      />
                    </div>
                    <button onClick={cadastrarPessoa}>Cadastrar</button>
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
export default Pessoas;