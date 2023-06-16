import './styles.less'
import {BoxTransparent} from '../../components/BoxTransparent'
import {BotaoSubmit} from '../../components/BotaoSubmit'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {atomLocal, atomLocalMini} from '../../states/mapStates'
import {useAtom} from 'jotai'
import { atomEmail } from '../../states/emailState'
import axios from "axios"
export function Mapa(){
    const navigate = useNavigate()
    const [atomEmailValue, setAtomEmailValue] = useAtom(atomEmail)
    const [cidadeEscolhida, setCidadeEscolhida] = useAtom(atomLocal) 
    const [cidadeEscolhidaMini, setCidadeEscolhidaMini] = useAtom(atomLocalMini) 
    function redirectEmail(){
        if(localStorage.getItem('jwt') == ''){
            navigate('/login')
        }
        else{
            if(atomEmailValue == ''){
                navigate('/primaria')
            }
        }
    }
    function setCidadeBackEnd(cidade){
        axios({method: 'put',
        url: 'https://rotas-pokeverse.onrender.com/change_place',
        params: {email: atomEmailValue, place:cidade},
        headers: {'token-jwt':localStorage.getItem('jwt')}})
        .then((response) => {
            console.log(cidadeEscolhida)
            navigate("/", {replace: true})
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        redirectEmail()
    }, [])
    return(
         <div className='Mapa'>
            <div className='mapa-fisico'></div>
            <section className="viajar">
                <h1>Viajar</h1>
                <div className="infoViagem">
                    <h2>Escolha a cidade para qual você quer viajar:</h2>
                    <div className="buttonsInfo">
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('mogi'); setCidadeBackEnd('mogi');}} text='Mogi'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('consolacao'); setCidadeBackEnd('consolacao');}} text='Consolação'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('bras'); setCidadeBackEnd('bras');}} text='Brás'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('ana rosa'); setCidadeBackEnd('ana rosa');}} text='Ana Rosa'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('pirituba'); setCidadeBackEnd('pirituba');}} text='Pirituba'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('luz'); setCidadeBackEnd('luz');}} text='Luz'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('agua branca'); setCidadeBackEnd('agua branca');}} text='Água Branca'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('jardim romano'); setCidadeBackEnd('jardim romano');}} text='Jardim Romano'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('jundiai'); setCidadeBackEnd('jundiai');}} text='Jundiaí'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('capao redondo'); setCidadeBackEnd('capao redondo');}} text='Capão Redondo'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('sacoma'); setCidadeBackEnd('sacoma');}} text='Sacomã'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('taboao'); setCidadeBackEnd('taboao');}} text='Taboão'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('socorro'); setCidadeBackEnd('socorro');}} text='Socorro'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('jurubatuba'); setCidadeBackEnd('jurubatuba');}} text='Jurubatuba'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('tatuape'); setCidadeBackEnd('tatuape');}} text='Tatuapé'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('se'); setCidadeBackEnd('se');}} text='Sé'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('vila madalena'); setCidadeBackEnd('vila madalena');}} text='Vila Madalena'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('jaragua'); setCidadeBackEnd('jaragua');}} text='Jaraguá'/>
                        <BotaoSubmit aoClicar={() => {setCidadeEscolhida('jabaquara'); setCidadeBackEnd('jabaquara');}} text='Jabaquara'/>
                    </div>
                </div>
            </section>
         </div>
    )
}