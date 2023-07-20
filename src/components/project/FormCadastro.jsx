import React, { useState, useEffect } from 'react';
import styles from '../styles/FormCadastro.module.css'
import Button from '../form/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FormCadastro() {
  const [cursos, setCursos] = useState([]);
  const [cursoId, setCursoId] = useState(null);
  // eslint-disable-next-line
  const [accessToken, setAccessToken] = useState("");
  const [novoCoordenador, setNovoCoordenador] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    disciplina: '',
    registrodeTrabalho: '',
    curso: { id: null },
  });
  const navigate = useNavigate();

  const cadastrarCoordenador = (coordenador) => {
    axios
      .post('http://127.0.0.1:5000/api/coordenador', coordenador)
      .then((response) => {
        console.log(response.data);
        setAccessToken(response.data.access_token);
        localStorage.setItem("accessToken", response.data.access_token); 
        alert('Cadastro feito com sucesso');
        navigate('/GruposUser');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/curso')
      .then((response) => setCursos(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoCoordenador((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const coordenador = { ...novoCoordenador, curso: { id: cursoId } };
    cadastrarCoordenador(coordenador);
  };

  return (
    <div className={styles.formGroup}>
      <form className={styles.content_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          name="nome"
          value={novoCoordenador.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={novoCoordenador.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          name="senha"
          value={novoCoordenador.senha}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          name="telefone"
          value={novoCoordenador.telefone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Disciplina"
          name="disciplina"
          value={novoCoordenador.disciplina}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Registro de Trabalho"
          name="registrodeTrabalho"
          value={novoCoordenador.registrodeTrabalho}
          onChange={handleChange}
          required
        />
        <select
          name="cursoId"
          value={cursoId}
          onChange={(e) => setCursoId(e.target.value)}
          required
        >
          <option value="">Selecione um Curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome}
            </option>
          ))}
        </select>
        <Button type="submit" text="Cadastrar"></Button>
      </form>
    </div>
  );
}

export default FormCadastro;
