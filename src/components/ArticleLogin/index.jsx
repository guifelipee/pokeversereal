import './styles.less'
import { InputsLogin } from '../InputsLogin'
import { BotaoSubmit } from '../BotaoSubmit'
import { useState } from 'react'
import { Base64 } from 'js-base64'
import { useAtom } from 'jotai'
import { atomEmail } from '../../states/emailState'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export function ArticleLogin({aoClicar, classe = ''}){
    const navigate = useNavigate();
    const [senha, setSenha] = useState('')
    const [sumido1, setSumido1] = useState(true)
    const [sumido2, setSumido2] = useState(true)
    const [atomEmailValue, setAtomEmail] = useAtom(atomEmail);
    function logar(email, senha){
        axios({method: 'get',
        url: 'https://rotas-pokeverse.onrender.com/login',
        params: {email:email, password:senha}})
        .then((promisse) => {
            if(promisse.data.message[0].Erro === 'Credenciais invalidas'){
                setSumido1(false)
            }
            else{
                console.log(promisse.data)
                localStorage.setItem("jwt", promisse.data.message[1].jwt)
                navigate("/inicial", {replace: true})
            }
        })
        .catch()
    }
    function submitForms(e){
        e.preventDefault()
        logar(atomEmailValue, Base64.encode(senha))

    }
    return(
        <article className={classe + ' ArticleLogin'}>
            <form action="#" onSubmit={submitForms}>
            <h1>Login</h1>
            <InputsLogin typeInput='email' placeHolderInput='Email' valorInput={atomEmailValue} setValor={setAtomEmail}/>
            <InputsLogin typeInput='password' placeHolderInput='Senha' valorInput={senha} setValor={setSenha}/>
            <p className={sumido1 ? 'sumido' : ''}>Algum dado está incorreto</p>
            <BotaoSubmit type='submit' text='Login'/>
            <p>Não tem cadastro? Cadastre-se <button className='no-button' type='button' onClick={aoClicar}>clicando aqui</button></p>
            </form>
        </article>
    )
}