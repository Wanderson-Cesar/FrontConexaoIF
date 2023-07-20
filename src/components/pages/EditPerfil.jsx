import styles from '../styles/EditPerfil.module.css';
import React, { useEffect, useState } from "react";
import SideBar from "../form/SideBar";
import axios from "axios";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


function EditPerfil() {
  const navegação = useNavigate();
  const [coordenadores, setCoordenadores] = useState([]);
  const [editCoordenadoresId, setEditCoordenadoresId] = useState(null);
  const [editCoordenadoresDados, setEditCoordenadoresDados] = useState({});
    // eslint-disable-next-line
  const [filtroCoordenador, setFiltroCoordenador] = useState("");
  const [cursos, setCursos] = useState([]);
      // eslint-disable-next-line
  const [mensagemErro, setMensagemErro] = useState('');

  
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
  
    if (!accessToken) {
      navegação("/Login");
    } 

  }, [navegação]);

  

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
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          console.log(error);
        }});
  };

  const saveEditCoordenador = () => {
    axios
      .put(`http://127.0.0.1:5000/api/coordenador/${editCoordenadoresId}`, editCoordenadoresDados)
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
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          console.log(error);
          alert('Email ou Senha já existentes');
        }
      });
  };
  
  
  const filtro_coordenador = coordenadores.filter((coordenador) =>
    coordenador.nome && coordenador.nome.toLowerCase().includes(filtroCoordenador.toLowerCase())
  );
  
 
  return (
    <>
      <SideBar />
      <div className={styles.containerAdminNavBar}>
        <div className={styles.container}>
          <main>
            <h1>Coordenador</h1>
            
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
                {mensagemErro && <p>{mensagemErro}</p>} {/* Exibe a mensagem de erro */}
              </div>
            ) : (
              <div>
                <table className={styles.table} >
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
                
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default EditPerfil;
