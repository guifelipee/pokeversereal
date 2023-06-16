import './styles.less'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BotaoTransparente } from '../../components/BotaoTransparente';
import { BoxTransparent } from '../../components/BoxTransparent';
import { ButtonCompra } from '../../components/ButtonCompra';
import { CloseButton } from '../../components/CloseButton';
import banana from '../../assets/Itens/banana-rosa.svg';
import abacaxi from '../../assets/Itens/aabacaxi.svg';
import uva from '../../assets/Itens/uva-vermelha.svg';
import BananaUpgrade from '../../assets/Itens/bananaUpgrade.png';
import AbacaxiUpgrade from '../../assets/Itens/abacaxiUpgrade.png';
import UvaUpgrade from '../../assets/Itens/uvaUpgrade.png';
import axios from 'axios';
import { useAtom } from 'jotai';
import { atomEmail } from '../../states/emailState';
import {InputsLogin} from '../../components/InputsLogin'
import {BotaoSubmit} from '../../components/BotaoSubmit'
export function Captura() {
  const navigate = useNavigate()
  const [inventarioVisible, setInventarioVisible] = useState(false);
  const [pokeEsquerda, setPokeEsquerda] = useState('pokebola1');
  const [pokeCentro, setPokeCentro] = useState('pokebola2');
  const [pokeDireita, setPokeDireita] = useState('pokebola3');
  const [frutaSelecionada, setFrutaSelecionada] = useState('');
  const [desistirVisible, setDesistirVisible] = useState(false);
  const [atomEmailValue, setAtomEmailValue] = useAtom(atomEmail);
  const [nicknameState, setNicknameState] = useState('')
  const [adicionarNickname, setAdicionarNickname] = useState(false)
  const [aparecerNickname, setAparecerNickname] = useState(false)
  const [desejaAdicionarNickname, setDesejaAdicionarNickname] = useState(false)
  const [pokemomSorteado, setPokemomSorteado] = useState({
    nome:"Carregando...",
    img: "",
    xp: 0
  })  
  const [itens, setItens] = useState([
    ['pokeball', "carregando..."],
    ['greatball', "carregando..."],
    ['ultraball', "carregando..."]
  ]) 
  async function getDados() {
    return axios.get('https://rotas-pokeverse.onrender.com/find_trainer_with_query', {
      params: { field: "email", value: atomEmailValue },
      headers: { 'token-jwt':localStorage.getItem('jwt') }
    })
      .then((response) => {
        if (response.data.message === []) {
          return "error";
        } else {
          let arr = []
          for (let i = 0; i < 9; i++){
            arr.push(response.data.message[0].items[i])
          }
          setItens(arr)
        }
      })
      .catch((error) => {
        console.log("errouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu aq?" + error);
      });
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
  function getPokemom(){
      axios.get('https://rotas-pokeverse.onrender.com/select_random_pokemon', {
        params:{email:atomEmailValue}})
        .then((response) => {
          if (response.data.message === []) {
            return "error";
          } else {
            setPokemomSorteado({
              nome: response.data.message[0].name,
              img: response.data.message[0].image_front,
              xp: response.data.message[0].experience
            })
          }
        })
        .catch((error) => {
          console.log("errouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu aq?" + error);
        });
  }
  function verificarItens(pokeball){
    if(pokeball == 'pokebola1'){
      return itens[2][1]
    } else if (pokeball == 'pokebola2'){
      return itens[0][1]
    } else {
      return itens[1][1]
    }
  }
  function setNickName(nicknamep){
    return axios({method: 'put',
    url: 'https://rotas-pokeverse.onrender.com/change_nickname',
    params: {nickname:nicknamep, owner_email: atomEmailValue},
    headers: {'token-jwt':localStorage.getItem('jwt')}})
    .then((response) => {
    })
  }
  //foi
  function capturar(pokebola){
    return axios({method: 'put',
    url: 'https://rotas-pokeverse.onrender.com/capture_pokemons',
    params: {name_poke:pokemomSorteado.nome, owner_email: atomEmailValue, name_pokeball:pokebola, experience:pokemomSorteado.xp, fruit:frutaSelecionada},
    headers: {'token-jwt':localStorage.getItem('jwt')}})
    .then((response) => {
      console.log(response.data.message[0].status)
        if(response.data.message[0].status == 'sem items'){
            alert('Você não tem dessa pokebolas')
        }
        else if(response.data.message[0].status == false){
          alert("Falha na captura")
        }
        else{
          setAparecerNickname(true)
        }
    })
    .catch((error) => {
        console.log(error)
    })
  }
  function jogarPokebola(){
    console.log(pokeCentro)
      if(pokeCentro == "pokebola2"){
        capturar('pokeball')
      }
      else if(pokeCentro == "pokebola3"){
        capturar('greatball')
      }
      else{
        capturar('ultraball')
      }
  } 
  useEffect(() => {
    redirectEmail()
    getPokemom()
    getDados()
  }, [])
  useEffect(() => {
    verificarItens()
  }, [, pokeCentro])
  useEffect(() => {
    getDados()
  }, [frutaSelecionada, pokeCentro, pokeDireita, pokeEsquerda, pokemomSorteado, capturar, jogarPokebola])
    return (
      <div className="Captura">
        <section className="pokemom">
          <div className="poke-info">
            <span>{pokemomSorteado.nome}</span>
            <span className="raridade">Legendary</span>
          </div>
          <div
            className="pokemom-img"
            id="pokemom-img"
            style={{backgroundImage: `url(${pokemomSorteado.img})`}}
          ></div>
        </section>
        <section className="options">
          <button
            className="item-box"
            onClick={() => {setInventarioVisible(true); console.log(frutaSelecionada)} }
          >
          <div className={frutaSelecionada + ' item'}></div>
          </button>
          <section className="pokebolas">
            <div>
              <button
                className={pokeEsquerda}
                onClick={() => {
                  setPokeCentro(pokeEsquerda);
                  setPokeEsquerda(pokeCentro);
                }}
              >
                {verificarItens(pokeEsquerda)}
              </button>
            </div>
            <div>
              <button
                className={'centro ' + pokeCentro}
                onClick={() => {
                  jogarPokebola();
                }}
              >
                {verificarItens(pokeCentro)}
              </button>
            </div>
            <div>
              <button
                className={pokeDireita}
                onClick={() => {
                  setPokeCentro(pokeDireita);
                  setPokeDireita(pokeCentro);
                }}
              >
                {verificarItens(pokeDireita)}
              </button>
            </div>
          </section>
          <div className="buttons-desistir">
        <BotaoTransparente
          classe="Botao-desistir"
          text="Desistir da captura"
          aoClicar={() => setDesistirVisible(true)}
        />
        {desistirVisible && (
          <div className="oppcoes-desistir">
            <Link to="/">
              <BotaoTransparente classe="" text="Deseja mesmo desistir?" />
            </Link> 
            <BotaoTransparente
              classe=""
              text="cancelar"
              aoClicar={() => {
                setDesistirVisible(false);
              }}
            />
          </div>
        )}
      </div>
    </section>
    <BoxTransparent classeShadow={inventarioVisible ? "aparecer" : ""}>
      <section className="titulo">
        <h1>Selecione sua fruta</h1>
        <CloseButton aoClicar={() => setInventarioVisible(false)} />
      </section>
      <div className="compra">
        <h1>Frutas</h1>
  
    <ButtonCompra
      info="Nenhuma fruta"
      classe='item'
      aoClicar={() => {
        setFrutaSelecionada("");
        setInventarioVisible(false);
      }}
    />
        {itens[3] !== undefined && itens[3][1] > 0 && (
    <ButtonCompra
      qnt={itens[3][1]}
      img={banana}
      info="Banana"
      classe='item'
      msgAlt="Banana"
      aoClicar={() => {
        setFrutaSelecionada("banana");
        setInventarioVisible(false);
      }}
    />
  )}
  
  {itens[4] !== undefined && itens[4][1] > 0 && (
    <ButtonCompra
      qnt={itens[4][1]}
      img={abacaxi}
      info="Abacaxi"
      classe='item'
      msgAlt="abacaxi"
      aoClicar={() => {
        setFrutaSelecionada("abacaxi");
        setInventarioVisible(false);
      }}
    />
  )}
  
  {itens[5] !== undefined && itens[5][1] > 0 && (
    <ButtonCompra
      qnt={itens[5][1]}
      img={uva}
      info="Uva"
      classe='item'
      msgAlt="Uva"
      aoClicar={() => {
        setFrutaSelecionada("uva");
        setInventarioVisible(false);
      }}
    />
  )}
  
  {itens[6] !== undefined && itens[6][1] > 0 && (
    <ButtonCompra
      qnt={itens[6][1]}
      img={BananaUpgrade}
      info="Banana-upgrade"
      classe='item'
      msgAlt="Banana-upgrade"
      aoClicar={() => {
        setFrutaSelecionada("upgraded_banana");
        setInventarioVisible(false);
      }}
    />
  )}
  
  {itens[7] !== undefined && itens[7][1] > 0 && (
    <ButtonCompra
      qnt={itens[7][1]}
      img={AbacaxiUpgrade}
      info="Abacaxi-upgrade"
      classe='item'
      msgAlt="Abacaxi-upgrade"
      aoClicar={() => {
        setFrutaSelecionada("upgraded_abacaxi");
        setInventarioVisible(false);
      }}
    />
  )}
  
  {itens[8] !== undefined && itens[8][1] > 0 && (
    <ButtonCompra
      qnt={itens[8][1]}
      img={UvaUpgrade}
      info="Uva-upgrade"
      classe='item'
      msgAlt="Uva-upgrade" 
      aoClicar={() => {
        setFrutaSelecionada("upgraded_uva");
        setInventarioVisible(false);
      }}
    />
  )}
  
      </div>
    </BoxTransparent>
  
  
    <div className={aparecerNickname? 'pos-captura' : 'sumir'}>
      <section className={adicionarNickname? "sumir": "adicionar-nickname"}>
        <h1>Capturadooooooooo</h1>
        <div className={desejaAdicionarNickname? "sumir" : "primeira-opt"}>
          <p>Deseja colocar um nickname no seu pokemom?</p>
          <section className='buttons-choice'>
            <BotaoTransparente text='Sim' aoClicar={() => {setDesejaAdicionarNickname(true)}}/>
            <BotaoTransparente text='Não' aoClicar = {() => {setAdicionarNickname(true)}}/>
          </section>
        </div>
        <div className={desejaAdicionarNickname? 'segunda-opt' : "sumir"}>
          <form action="" onSubmit={(e) => {
            e.preventDefault()
            setNickName(nicknameState)
            setAdicionarNickname(true)
          }}>
            <InputsLogin
              minLengthInput={1}
              maxLengthInput={15}
              placeHolderInput='Nickname aqui'
              typeInput='text'
              setValor={setNicknameState}
              valorInput={nicknameState}
            />
            <section className="buttons-confirm">
              <BotaoSubmit text='Salvar'/>
              <BotaoSubmit text='Cancelar' type='button' aoClicar = {() => {setDesejaAdicionarNickname(false)}} classe='cancelar'/>
            </section>
          </form>
        </div>
      </section>
      <section className={adicionarNickname ? 'continuarCaptura': 'sumir'}>
        <h1>Deseja continuar capturando?</h1>
        <section>
          <BotaoTransparente text='Sim' aoClicar={() => {
            getPokemom()
            setAparecerNickname(false)
          }}/>
          <Link to='/'>
            <BotaoTransparente text='Não'/>
          </Link>
        </section>
      </section>
    </div>
  </div>
    )
  }
