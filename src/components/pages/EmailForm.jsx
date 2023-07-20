import React, { useState, useEffect } from 'react';
import SideBar from '../form/SideBar';
import styles from '../styles/EmailForm.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmailForm() {
  const navegação = useNavigate();
  const [fileData, setFileData] = useState(null);
  const [tituloGrupo, setTituloGrupo] = useState('');
  const [mensagemManual, setMensagemManual] = useState('');
  const [grupoLink, setGrupoLink] = useState('');
  const [numEmails, setNumEmails] = useState(0);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navegação('/Login');
    }
  }, [navegação]);

  const fetchEmailData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_emails');
      const emailsData = response.data;

      if (emailsData.length === 0) {
        alert('Nenhum email encontrado');
        return;
      }

      const firstEmail = emailsData[0];

      setFileData(emailsData);
      setTituloGrupo(firstEmail.titulo);
      setMensagemManual(firstEmail.mensagem);
      setGrupoLink(firstEmail.link);
      setNumEmails(emailsData.length);
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao buscar os emails.');
    }
  };

  useEffect(() => {
    fetchEmailData();
  }, []); // Adicione a função fetchEmailData como dependência
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      titulo_grupo: tituloGrupo,
      mensagem_manual: mensagemManual,
    };
  
    try {
      setEnviando(true);
  
      const response = await axios.post('http://localhost:5000/send', payload);
      alert(response.data.message);
      navegação('/Lista');
  
     // Salvar no banco de dados
     const alunoGrupoData = fileData.map(email => ({
      aluno: { id: email.id },
      grupo: { id: email.grupo_id.id }
    }));
    
    const saveAlunoGrupoPromises = [];
    
    for (const data of alunoGrupoData) {
      saveAlunoGrupoPromises.push(axios.post('http://localhost:5000/api/alunogrupo', data));
    }
    
    try {
      await Promise.all(saveAlunoGrupoPromises);
    
      // Atualizar os dados buscando novamente
      await fetchEmailData();
    } catch (error) {
      console.error(error);
      alert('Atenção: Um ou mais alunos receberam a mensagem, mas já estão vinculados ao referente grupo.');
    }
    


    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao enviar o e-mail.');
    } finally {
      setEnviando(false);
    }
  };
  
  return (
    <>
      <SideBar />
      <div className={styles.containerAdminNavBar}>
        <div className={styles.container}>
          <main>
            <h1>Mensagem</h1>
            <div className={styles.conteudo}>{/* Content */}</div>

            <form onSubmit={handleSubmit}>
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label>Título do Grupo:</label>
                  <span id="titulo_grupo">{tituloGrupo}</span>
                </div>
                <div className={styles.formGroup}>
                  <label>Link do Grupo:</label>
                  <span id="link_grupo">{grupoLink}</span>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="mensagem_manual">Mensagem Padrão:</label>
                  <textarea
                    id="mensagem_manual"
                    name="mensagem_manual"
                    rows="4"
                    cols="50"
                    required
                    placeholder={mensagemManual ? '' : 'Digite a mensagem'}
                    value={mensagemManual}
                    onChange={(e) => setMensagemManual(e.target.value)}
                  ></textarea>
                </div>
                <div className={styles.formGroup}>
                  <label>Número de Alunos Selecionados:</label>
                  <span id="num_emails">{numEmails}</span>
                </div>
                <div className={styles.editForm}>
                  <button type="submit" disabled={enviando}>
                    {enviando ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}

export default EmailForm;
