import './styles.less';
import { useState, useEffect, styles } from 'react';
import { Chat } from '../../components/Chat';
import {BotaoTransparente} from '../../components/BotaoTransparente'
import { Link, useNavigate } from 'react-router-dom';
import { BotaoEscolha } from '../../components/BotaoEscolha';
import { useAtom } from 'jotai';
import { atomEmail } from '../../states/emailState';
export function Battle() {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(true);
  const [fugiu, setFugiu] = useState(false);
  const [classeChatMin, setClasseChatMin] = useState(true)
  const [closeButtonFugido, setCloseButtonFugido] = useState(true)
  const [closeButtonChat, setCloseButtonChat] = useState(true)
  const [atomEmailValue, setAtomEmailValue] = useAtom(atomEmail)
  const [life2Poke1, setLife2Poke1] = useState(100)
  const [life2Poke2, setLife2Poke2] = useState(100)
  const styles = {
    classLifePoke1: {
      minWidth: life2Poke1 + '%',
    },
    classLifePoke2: {
      minWidth: life2Poke2 + '%',
    }
  }
  
  function fugir() {
    setFugiu(true);
    setTimeout(() => {
      setFugiu(false);
      setShowMenu(false);
      setCloseButtonFugido(false)
    }, 2000);
  }
  function mostrarChat(){
    setClasseChatMin(false)
  }
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
useEffect(() => {
    redirectEmail()
}, [])
  return (
    <div className="Battle">
      {showMenu ? (
        <>
          <BotaoEscolha text='Ver o chat' classe='chat-800-600' aoClicar={mostrarChat}/>
          <Chat classe={classeChatMin ? 'chat' : 'chatMin'} setClose={setClasseChatMin} controleClose = {closeButtonChat}/>
          <section className="pokemons">
            <div>
              <div className='poke1'></div>
              <div className="info">
                <p>PIKACHU</p>
                <span className="life-pai">
                  <span className='life' style={styles.classLifePoke1}></span>
                </span>
              </div>
            </div>
            <div>
              <div className='poke2'></div>
              <div className="info">
                <p>PIKACHU</p>
                <span className="life-pai"><span className='life' style={styles.classLifePoke2}></span></span>
              </div>
            </div>
          </section>
          {fugiu ? (
            <section className="menu">
              <h2>Fugiu cuzão!</h2>
            </section>
          ) : (
            <section className="menu">
              <div className="coluna1">
                <button onClick={() => {('atacar do backEnd, estou simulando'); setLife2Poke2(life2Poke2 - 20)}}>Soco</button>
                <button>Arranhão</button>
              </div>
              <div className="coluna2">
                <button>Mordida</button>
                <button className="fugir" onClick={fugir}>
                  Fugir
                </button>
              </div>
            </section>
          )}
        </>
      ) : (
        <article className='fugido'>
            <h1>Você perdeu a batalha!</h1>
            <Chat controleClose = {closeButtonFugido}/>
            <div className="botoes-fugido">
                <Link to='/'>
                    <BotaoTransparente text='Voltar para o menu'/>
                </Link>
            </div>
        </article>
      )
      }
    </div>
  );
}
