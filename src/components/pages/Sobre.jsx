import SideBar from "../form/SideBar";
import styles from  '../styles/Sobre.module.css'
import {FaGithub} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import React, { useEffect} from "react";




function Sobre() {
    const navegação = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
      
        if (!accessToken) {
          navegação("/Login");
        } 
  
      }, [navegação]);

    return(
        <>
        <SideBar />
        <div className={styles.conteudo_pgn}>
        <div className={styles.conteudo_edit}>
            <h1>Sobre o Projeto</h1>
            <div className={styles.formGroup}>
            <p> O Projeto ConexãoIF tem como objetivo estabelecer uma rede de comunicação interna entre professores 
            e alunos por meio de mensagens instantâneas, visando facilitar a transição dos novos alunos para o 
            ambiente acadêmico do campus do IFPB de Guarabira-PB. A ideia principal do aplicativo é permitir que o coordenador crie grupos 
            específicos para cada turma do primeiro período e adicione os alunos recém-chegados a esses grupos.<br /></p>
            </div><div className={styles.formGroup}>
            <p> Com o aplicativo, os alunos terão a oportunidade de interagir diretamente com os professores e outros
            colegas de turma, tirar dúvidas, receber informações importantes sobre a grade curricular, cronogramas
            de aulas, atividades e projetos. Além disso, o coordenador também poderá compartilhar via liks materiais de 
            estudo, realizar discussões em grupo e fornecer orientações relevantes para ajudar os alunos a se 
            adaptarem rapidamente ao ambiente acadêmico.</p></div>
        <div></div></div>
        <div className={styles.formGroup}>

            <h3 className={styles.textoSobre}>Saiba mais do Projeto</h3>
            <FaGithub size="60px" color="white" href="https://github.com/joseMarcus/ConexaoIF-Back"/>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <p><a href="https://github.com/Renan-Thierry/ConexaoIF-Front" target="_blank" rel="noopener noreferrer">Front</a></p>
                    <hr />
                </div>
                <div>
                    <p><a href="https://github.com/joseMarcus/ConexaoIF-Back" target="_blank" rel="noopener noreferrer">Back</a></p>
                    <hr />
                </div>
                </div>


        </div></div>
        </>
    )
}

export default Sobre;