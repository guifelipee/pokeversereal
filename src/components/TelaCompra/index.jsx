import './styles.less'
import { ButtonCompra } from '../ButtonCompra'
import { CloseButton } from '../CloseButton'
import { BoxTransparent } from '../BoxTransparent'
import { useState } from 'react'
import { CaretDownOutline } from 'react-ionicons'
import { CaretUpOutline } from 'react-ionicons'
import { BotaoEscolha } from '../BotaoEscolha'
import { BotaoInicial } from '../BotaoInicial'
import { BotaoTransparente } from '../BotaoTransparente'
import { saldoInsuficienteAtom } from '../../states/pokeStoreState'
import { useAtom } from 'jotai'
import axios from 'axios'
import { atomEmail } from '../../states/emailState'
export function TelaCompra({componente = <ButtonCompra/>, email, nomeItem, closeButtonFunction, classeConf, aberto = true, txtInfo = ''}){
    const [saldoInsuficiente, setSaldoInsuficiente]  = useState(true)
    const [quantidade, setQuantidade] = useState(1);
    function comprar(){
        axios({method: 'put',
        url: 'https://rotas-pokeverse.onrender.com/buy_item_from_store',
        params: {user_name:email, item_name:nomeItem, quantity:quantidade},
        headers: {'token-jwt':localStorage.getItem('jwt') }})
        .then((promisse) => {
            if(promisse.data.message[0].Status == "Sem saldo amigão"){
                setSaldoInsuficiente(false)
            }
            else{
                alert('compra okkk')
            }
        })
        .catch((error) => {console.log("errouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"+error)})
    }
    return (
    <BoxTransparent classeShadow={classeConf + ' BoxTransparente teste'} classe='articleClasse'>
        <div className="info-compra">
            <header>
                <h1>Item selecionado</h1>
                <CloseButton aoClicar={() => {closeButtonFunction(); setQuantidade(1); setSaldoInsuficiente(true)}}/>
            </header>
            <section className='detalhes-item'>
                {componente}
                <div className="quantidade">
                    <div className="aumentar" onClick={() => {setQuantidade(quantidade + 1)}}>
                        <CaretUpOutline
                            color={'#ffffff'}
                            height="25px"
                            width="25px"
                        />
                    </div>
                    <div className='caixa'>{quantidade}</div>
                    <div className="diminuir" onClick={() => {if(quantidade > 0){
                        setQuantidade(quantidade - 1)
                    }
                    else{
                        setQuantidade(0)
                    }
                    }}>
                        <CaretDownOutline
                            color={'#ffffff'}
                            height="25px"
                            width="25px"
                        />
                    </div>
                </div>
            </section>
        </div>
        <p className='txtInfo'>{txtInfo}</p>
        <p className={saldoInsuficiente ? 'sumido' : ''}>Saldo insuficiente</p>
        <BotaoTransparente classe='confirmarCompra' aoClicar={comprar}/>
    </BoxTransparent>
    )
    
}