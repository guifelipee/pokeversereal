import './styles.less'
import { BotaoInicial } from '../../components/BotaoInicial'
import { Header } from '../../components/Header'
import {Link} from 'react-router-dom'
import { useAtom } from "jotai";
import { atomEmail } from '../../states/emailState'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export function Inicial(){
    const [nome, setNome] = useState('')
    const navigate = useNavigate()
    const [atomEmailValue, setAtomEmailValue] = useAtom(atomEmail)
    function getDados(){
        console.log(atomEmailValue)
        return axios.get('https://rotas-pokeverse.onrender.com/find_trainer_with_query', {
          params: { field: "email", value: atomEmailValue },
          headers: { 'token-jwt':localStorage.getItem('jwt') }
        })
        .then((response) => {
            setNome(response.data.message[0].name)
        })
        .catch((error) => {
            console.log(error)
            setNome('carregando...')
        })
    }
    
    function setEmail(){
        return axios.get('https://auth-pokeverse.onrender.com/decode_jwt_user', {
            params: { jwt: localStorage.getItem('jwt')}
        })
        .then((response) => {
            setAtomEmailValue(response.data.roles[0].replace("view_", ""))
        })
        .catch((error) => {
            navigate('/login')
        })
    }
    useEffect(() => {
        setEmail()
        console.log(atomEmailValue)
    }, [])
    useEffect(() => {
        getDados()
    }, [setEmail])
    return(
        <div className='Inicial'>
            <Header perfil={true} nome={nome}/>
            <section className='botoes'>
                <Link to='/'>
                    <BotaoInicial text='Iniciar o jogo'/>
                </Link>
                <Link to='/login'>
                    <BotaoInicial text='Trocar conta'/>
                </Link>
            </section>
        </div>
        
    )
}