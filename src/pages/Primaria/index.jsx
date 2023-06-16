import './styles.less'
import { Header } from '../../components/Header'
import { BotaoInicial } from '../../components/BotaoInicial'
import {Link} from 'react-router-dom'
import { useState} from 'react'

let nomeUsuario;
export function Primaria(){
    function verificarLogin(){
        if (localStorage.getItem('jwt')) {
            window.location.assign('/inicial')
        }
        else{
            window.location.assign('/login')
        }
    }
    
    return(
        <div className="Principal">
            <Header perfil={false} classeNovo='imgHeader'/>
            <BotaoInicial text='Jogar' classeNova='botaoEdit' aoClicar={verificarLogin}/>
            <Link to='/lol'>
                <BotaoInicial text='Sair' classeNova='sair botaoEdit'/>
            </Link>
        </div>
    )
}

export function getNome() {
    return nomeUsuario;
}