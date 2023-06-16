import './styles.less'
import { Link, useNavigate } from 'react-router-dom'
import { BotaoEscolha } from '../../components/BotaoEscolha'
import { BoxTransparent } from '../../components/BoxTransparent'
import { CloseButton } from '../../components/CloseButton'
import { useState, useEffect  } from 'react'
import normal from '../../assets/Itens/poke-normal.svg'
import GreatBall from '../../assets/Itens/poke-great.svg'
import UltraBall from '../../assets/Itens/poke-ultra.svg'
import banana from '../../assets/Itens/banana-rosa.svg'
import abacaxi from '../../assets/Itens/aabacaxi.svg'
import uva from '../../assets/Itens/uva-vermelha.svg'
import gifTestePokemom from '../../assets/gifImagem.gif'
import { ButtonCompra } from '../../components/ButtonCompra'
import { TelaCompra } from '../../components/TelaCompra'
import { pokeStoreVisibleAtom } from '../../states/pokeStoreState'
import { pokeStore2VisibleAtom } from '../../states/pokeStoreState'
import { useAtom } from 'jotai'
import { atomEmail} from '../../states/emailState'
import { saldoInsuficienteAtom } from '../../states/pokeStoreState'
import { fecharConfiguracoes } from '../../states/configStats'
import { FormAlterar } from '../../components/FormAlterar'
import axios from 'axios'
import {atomLocal, atomLocalMini} from '../../states/mapStates'

import flyBackground      from '../../assets/Locais/fly-background.svg';
import steelBackground    from '../../assets/Locais/steel-background.svg';
import brasBackground     from '../../assets/background-gif.gif';
import grassBackground    from '../../assets/Locais/grass-background.svg';
import normalBackground   from '../../assets/Locais/normal-background.svg';
import electricBackground from '../../assets/Locais/electric-background.svg';
import waterBackground    from '../../assets/Locais/water-background.svg';
import fyghtBackground    from '../../assets/Locais/fyght-background.svg';
import groundBackground   from '../../assets/Locais/ground-background.svg';
import fairyBackground    from '../../assets/Locais/fairy-background.svg';
import bugBackground      from '../../assets/Locais/bug-background.svg';
import fireBackground     from '../../assets/Locais/fire-background.svg';
import ghostBackground    from '../../assets/Locais/ghost-background.svg';
import darkBackground     from '../../assets/Locais/dark-background.svg';
import poisonBackground   from '../../assets/Locais/poison-background.svg';
import rockBackground     from '../../assets/Locais/rock-background.svg';
import psychBackground    from '../../assets/Locais/psych-background.svg';
import dragonBackground   from '../../assets/Locais/dragon-background.svg';
import iceBackground      from '../../assets/Locais/ice-background.svg';

import flyMiniBackgroung      from '../../assets/mini-mapas/voador-mini-map.svg'
import steelMiniBackground    from '../../assets/mini-mapas/steel-mini-map.svg';
import brasMiniBackground     from '../../assets/mini-mapas/bras-mini-map.svg';
import grassMiniBackground    from '../../assets/mini-mapas/grass-mini-map.svg';
import normalMiniBackground   from '../../assets/mini-mapas/normal-mini-map.svg';
import electricMiniBackground from '../../assets/mini-mapas/eletrico-mini-map.svg';
import waterMiniBackground    from '../../assets/mini-mapas/agua-mini-map.svg';
import fyghtMiniBackground    from '../../assets/mini-mapas/lutador-mini-map.svg';
import groundMiniBackground   from '../../assets/mini-mapas/ground-mini-map.svg';
import fairyMiniBackground    from '../../assets/mini-mapas/fada-mini-map.svg';
import bugMiniBackground      from '../../assets/mini-mapas/bug-mini-map.svg';
import fireMiniBackground     from '../../assets/mini-mapas/fire-mini-map.svg';
import ghostMiniBackground    from '../../assets/mini-mapas/ghost-mini-map.svg';
import darkMiniBackground     from '../../assets/mini-mapas/dark-mini-map.svg';
import poisonMiniBackground   from '../../assets/mini-mapas/poison-mini-map.svg';
import rockMiniBackground     from '../../assets/mini-mapas/rock-mini-map.svg';
import psychMiniBackground    from '../../assets/mini-mapas/pisiquico-mini-map.svg';
import dragonMiniBackground   from '../../assets/mini-mapas/drangon-mini-map.svg';
import iceMiniBackground      from '../../assets/mini-mapas/gelo-mini-map.svg';


export function Home(){
    const navigate = useNavigate()
    const [pokeStoreVisible, setPokeStoreVisible] = useAtom(pokeStoreVisibleAtom)
    const [pokeStore2Visible, setPokeStore2Visible] = useAtom(pokeStore2VisibleAtom)
    const [atomEmailValue, setAtomEmail] = useAtom(atomEmail);
    const [saldoInsuficiente, setSaldoInsuficiente]  = useAtom(saldoInsuficienteAtom)
    const [fecharConfig, setFecharConfig]  = useAtom(fecharConfiguracoes)
    const [formNome, setFormNome] = useState(true)
    const [formSenha, setFormSenha] = useState(false)
    const [formEmail, setFormEmail] = useState(false)
    const [formDelete, setFormDelete] = useState(false)
    const [form, setForm] = useState('')
    const [chosePokeBattleVisibility, setChosePokeBattleVisibility] = useState(false)
    const [inventarioVisible, setInventarioVisible] = useState(false)
    const [moneyValue, setMoneyValue] = useState(0)
    const [nomeValue, setNomeValue] = useState("")
    const [map, setMap] = useAtom(atomLocal)
    const [miniMap, setMiniMap] = useAtom(atomLocalMini)
    const [mochila, setMochila] = useState()
    const [pokemonsCapturados, setPokemonsCapturados] = useState([])
    const [pokemonsCapturadosArray, setPokemonsCapturadosArray] = useState([])
    const [infoCompra, setInfoCompra] = useState({
        img: GreatBall,
        info: 'GreatBall',
        preco: '$100',
        msgAlt: 'Pokebola GreatBall',
        txtInfo: 'kdsa'
})
    const mapa = [
        {
            nome: 'mogi',
            background: flyBackground,
            miniBackground: flyMiniBackgroung
        },
        {
            nome: 'consolacao',
            background: steelBackground,
            miniBackground: steelMiniBackground
        },
        {
            nome: 'bras',
            background: brasBackground,
            miniBackground: brasMiniBackground
        },
        {
            nome: 'ana rosa',
            background: grassBackground,
            miniBackground: grassMiniBackground
        },
        {
            nome: 'pirituba',
            background: normalBackground,
            miniBackground: normalMiniBackground
        },
        {
            nome: 'luz',
            background: electricBackground,
            miniBackground: electricMiniBackground
        },
        {
            nome: 'agua branca',
            background: waterBackground,
            miniBackground: waterMiniBackground
        },
        {
            nome: 'jardim romano',
            background: fyghtBackground,
            miniBackground: fyghtMiniBackground
        },
        {
            nome: 'jundiai',
            background: groundBackground,
            miniBackground: groundMiniBackground
        },
        {
            nome: 'capao redondo',
            background: fairyBackground,
            miniBackground: fairyMiniBackground
        },
        {
            nome: 'sacoma',
            background: bugBackground,
            miniBackground: bugMiniBackground
        },
        {
            nome: 'taboao',
            background: fireBackground,
            miniBackground: fireMiniBackground
        },
        {
            nome: 'socorro',
            background: ghostBackground,
            miniBackground: ghostMiniBackground
        },
        {
            nome: 'jurubatuba',
            background: darkBackground,
            miniBackground: darkMiniBackground
        },
        {
            nome: 'tatuape',
            background: poisonBackground,
            miniBackground: poisonMiniBackground
        },
        {
            nome: 'se',
            background: rockBackground,
            miniBackground: rockMiniBackground
        },
        {
            nome: 'vila madalena',
            background: psychBackground,
            miniBackground: psychMiniBackground
        },
        {
            nome: 'jaragua',
            background: dragonBackground,
            miniBackground: dragonMiniBackground
        },
        {
            nome: 'jabaquara',
            background: iceBackground,
            miniBackground: iceMiniBackground
        }
    ]

    useEffect(() => {
        for (let i = 0; i < mapa.length; i++) {
            if (mapa[i].nome == map){
                setMap(mapa[i].background)
                setMiniMap(mapa[i].miniBackground)
            }
        }
    }, [map])


    function toggleZerarCmpos(form){
        if(form == 'email'){
            setFormNome(true)
            setFormSenha(false); 
            setFormEmail(false)
            setFormDelete(false)
        }
        else{
            setFormSenha(!formSenha); 
            setFormNome(!formNome)
            setFormEmail(false)
            setFormDelete(false)
        }
    }

    function toggleForm(componente){
        if(componente == 'email'){
            setFormNome(false)
            setFormSenha(false)
            setFormDelete(false)
            setFormEmail(true)
        }
        else if(componente == 'senha'){
            setFormNome(false)
            setFormSenha(true)
            setFormDelete(false)
            setFormEmail(false)
        }
        else if(componente == 'nome'){
            setFormNome(true)
            setFormSenha(false)
            setFormDelete(false)
            setFormEmail(false)
        }
        else if(componente == 'delete'){
            setFormNome(false)
            setFormSenha(false)
            setFormDelete(true)
            setFormEmail(false)
        }
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
    async function getDados() {
        return axios.get('https://rotas-pokeverse.onrender.com/find_trainer_with_query', {
          params: { field: "email", value: atomEmailValue },
          headers: { 'token-jwt':localStorage.getItem('jwt') }
        })
          .then((response) => {
            if (response.data.message === []) {
              return "error";
            } else {
              setMoneyValue(response.data.message[0].money)
              setNomeValue(response.data.message[0].name)
              let mochilaApi = response.data.message[0].items
              let arrayControlerQuantity = []
              for (let i = 0; i < mochilaApi.length; i++) {
                arrayControlerQuantity.push(mochilaApi[i][1])
              }
              let mochilaGuizz = arrayControlerQuantity;
              setMochila(mochilaGuizz);
              // setMap(response.data.message[0].place)
            }
          })
          .catch((error) => {
            console.log("errouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu aq?" + error);
          });
      }
    function getPokemonsCapturados(){
        axios.get('https://rotas-pokeverse.onrender.com/search_all_captured_pokemons', {
          params: { owner_id:atomEmailValue },
          headers: { 'token-jwt':localStorage.getItem('jwt') }
        })
        .then((response) => {
            console.log(response.data)
            setPokemonsCapturados(response.data.message)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    useEffect(() => {
        getDados()
    }, [fecharConfig, pokeStoreVisible,pokeStore2Visible]);
    
    useEffect(() => {
        getPokemonsCapturados()
        let arrayControle = []
        if(pokemonsCapturados[0] != undefined){
            for(let i = 0; i < Object.keys(pokemonsCapturados[0]).length; i++){
                console.log(pokemonsCapturados[0][i])
                arrayControle.push(pokemonsCapturados[0][i])
            }
            setPokemonsCapturadosArray(arrayControle)
        }
    }, [inventarioVisible, chosePokeBattleVisibility])
    
    return(
        <div className='Home' style={{backgroundImage: `url(${map})`}}>
            <section className="botoes">
                <div className="principais">
                    <BotaoEscolha text='Batalhar'  classe='botoes-principais' aoClicar={() => {setChosePokeBattleVisibility(true)}}/>
                    <Link to='/captura'>
                        <BotaoEscolha text='Capturar' classe='botoes-principais'/>
                    </Link>
                    <BotaoEscolha text='Loja' classe='botoes-principais' aoClicar={() => {setPokeStoreVisible(true)}}/>
                </div>
                <div className="secundarios">
                    <button className='mochila' onClick={() => {setInventarioVisible(true)}}></button>
                    <button className='config' onClick={() => {setFecharConfig(true)}}></button>
                </div>
            </section>
            <section className="personagem">
                <div className="nome">{nomeValue}</div>
                <div className='boneco'></div>
            </section>
                <section className="mapa">
                <Link to='/mapa'>
                    <div style={{backgroundImage: `url(${miniMap})`}}></div>
                </Link>
                </section>
            {/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - MOCHILA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
            <BoxTransparent classeShadow={inventarioVisible ? 'aparecer': ''} classe='mochila'>
                <section className="titulo titulo-mochila">
                    <h1>Inventário</h1>
                    <CloseButton aoClicar={() => {setInventarioVisible(false)}}/>
                </section>
                <section className="itens-inventario">
                    <div className="pokebolas-mochila">
                        <h1>Pokebolas</h1>
                       <ButtonCompra qnt={mochila !== undefined ? mochila[0] : 'Erro'} img={normal}    info='Pokeball'  msgAlt='Pokebola normal'/>
                       <ButtonCompra qnt={mochila !== undefined ? mochila[1] : 'Erro'} img={GreatBall} info='Greatball' msgAlt='Pokebola GreatBall'/>
                       <ButtonCompra qnt={mochila !== undefined ? mochila[2] : 'Erro'} img={UltraBall} info='Ultraball' msgAlt='Pokebola UltraBall'/>
                    </div>
                    <div>
                        <h1>Frutas</h1>
                        <ButtonCompra qnt={mochila !== undefined ? mochila[3] : 'Erro'} img={banana}  info='Banana'  msgAlt='Banana'/>
                        <ButtonCompra qnt={mochila !== undefined ? mochila[4] : 'Erro'} img={abacaxi} info='Abacaxi' msgAlt='abacaxi'/>
                        <ButtonCompra qnt={mochila !== undefined ? mochila[5] : 'Erro'} img={uva}     info='Uva'     msgAlt='Uva'/>
                    </div>
                    <div>
                        <h1>Frutas upgrade</h1>
                        <ButtonCompra qnt={mochila !== undefined ? mochila[6] : 'Erro'} img={banana}  info='Banana upgrade'  msgAlt='Banana upgrade'  classe='upgrade'/>
                        <ButtonCompra qnt={mochila !== undefined ? mochila[7] : 'Erro'} img={abacaxi} info='Abacaxi upgrade' msgAlt='abacaxi upgrade' classe='upgrade'/>
                        <ButtonCompra qnt={mochila !== undefined ? mochila[8] : 'Erro'} img={uva}     info='Uva upgrade'     msgAlt='Uva upgrade'     classe='upgrade'/>
                    </div>
                </section>
            </BoxTransparent>

            {/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - LOJA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
            <BoxTransparent classeShadow={pokeStoreVisible ? 'aparecer': ''} classe='loja'>
                <section className="titulo">
                    <p>${moneyValue}</p>
                    <h1>POKE STORE</h1>
                    <CloseButton aoClicar={() => {setPokeStoreVisible(false)}}/>
                </section>
                <section className="itens-compra">
                    
                    <div className="pokebolas">
                        <h1>Pokebolas</h1>
                       <ButtonCompra img={normal} info='Normal' preco='$200' msgAlt='Pokebola normal' aoClicar={() => {
                           setPokeStoreVisible(false)
                           setPokeStore2Visible(true)
                           setInfoCompra({
                            img: normal,
                            info: 'pokeball',
                            preco: '$200',
                            msgAlt: 'Pokebola normal',
                            txtInfo: 'Essas são as mais comuns e\n um ótimo começo para sua jornada!\n Elas ajudarão você a capturar\n pokémons logo no início.'
                        })
                        } 
                    }
                       />
                       <ButtonCompra img={GreatBall} info='GreatBall' preco='$600' msgAlt='Pokebola GreatBall'
                       aoClicar={
                        () => {
                            setInfoCompra({
                                img: GreatBall,
                                info: 'greatball',
                                preco: '$600',
                                msgAlt: 'Pokebola GreatBall',
                                txtInfo: 'Essa é a primeira bola que difere da Pokébola convencional, permitindo capturar pokémons semi-evoluídos ou em sua forma final.'
                            })
                            setPokeStoreVisible(false)
                            setPokeStore2Visible(true)
                        }
                       }
                       />
                       <ButtonCompra img={UltraBall} info='UltraBall' preco='$1200' msgAlt='Pokebola UltraBall'
                       aoClicar={
                        () => {
                            setInfoCompra({
                                img: UltraBall,
                                info: 'ultraball',
                                preco: '$1200',
                                msgAlt: 'Pokebola UltraBall',
                                txtInfo: 'São excelentes para capturar pokémons acima da média e, segundo alguns, até mesmo lendários.'
                            })
                            setPokeStoreVisible(false)
                            setPokeStore2Visible(true)
                        }
                       }
                       />
                    </div>

                    
                    <div>
                        <h1>Frutas</h1>
                        <ButtonCompra img={banana} info='Banana' preco='$250' msgAlt='Banana'
                        aoClicar={
                            () => {
                                setInfoCompra({
                                    img: banana,
                                    info: 'banana',
                                    preco: '$250',
                                    msgAlt: 'banana',
                                    txtInfo: 'É a fruta mais comum e simples, oferecendo uma chance de 2% de capturar um Pokémon.'
                                })
                                setPokeStoreVisible(false)
                                setPokeStore2Visible(true)
                            }
                           }/>
                        <ButtonCompra img={abacaxi} info='Abacaxi' preco='$475' msgAlt='abacaxi'
                        aoClicar={
                            () => {
                                setInfoCompra({
                                    img: abacaxi,
                                    info: 'abacaxi',
                                    preco: '$475',
                                    msgAlt: 'Abacaxi',
                                    txtInfo: 'É uma fruta um pouco mais rara e difícil de encontrar, oferecendo uma chance de 4% de capturar um Pokémon.'
                                })
                                setPokeStoreVisible(false)
                                setPokeStore2Visible(true)
                            }
                           }/>
                        <ButtonCompra img={uva} info='Uva' preco='$695' msgAlt='Uva'
                        aoClicar={
                            () => {
                                setInfoCompra({
                                    img: uva,
                                    info: 'uva',
                                    preco: '$695',
                                    msgAlt: 'Uva',
                                    txtInfo: 'É uma fruta bastante rara, oferecendo uma chance de 6% de capturar um Pokémon.'
                                })
                                setPokeStoreVisible(false)
                                setPokeStore2Visible(true)
                            }
                           }/>
                    </div>
                    <div>
                        <h1>Frutas Upgrade</h1>
                        <ButtonCompra img={banana} info='Banana Upgrade' classe='upgrade' preco='$1000' msgAlt='Banana'
                        aoClicar={
                            () => {
                                setInfoCompra({
                                    img: banana,
                                    info: 'upgraded_banana',
                                    preco: '$1000',
                                    msgAlt: 'Banana',
                                    txtInfo: 'É uma versão aprimorada da banana, oferecendo uma chance de 8% de capturar um Pokémon.'
                                })
                                setPokeStoreVisible(false)
                                setPokeStore2Visible(true)
                            }
                           }/>
                        <ButtonCompra img={abacaxi} info='Abacaxi Upgrade' classe='upgrade' preco='$1200' msgAlt='abacaxi'
                        aoClicar={
                            () => {
                                setInfoCompra({
                                    img: abacaxi,
                                    info: 'upgraded_abacaxi',
                                    preco: '$1200',
                                    msgAlt: 'Abacaxi',
                                    txtInfo: 'É uma versão aprimorada do abacaxi, oferecendo uma chance de 10% de capturar um Pokémon.'
                                })
                                setPokeStoreVisible(false)
                                setPokeStore2Visible(true)
                            }
                           }/>
                        <ButtonCompra img={uva} info='Uva Upgrade' classe='upgrade' preco='$1450' msgAlt='Uva'
                        aoClicar={
                            () => {
                                setInfoCompra({
                                    img: uva,
                                    info: 'upgraded_uva',
                                    preco: '$1450',
                                    msgAlt: 'Uva',
                                    txtInfo: 'É uma versão aprimorada da uva, oferecendo uma chance de 12% de capturar um Pokémon.'
                                })
                                setPokeStoreVisible(false)
                                setPokeStore2Visible(true)
                            }
                           }/>
                    </div>
                </section>
            </BoxTransparent>
                    {/*- - - - - - - - - - - - - - - - Tela de compra - - - - - - - - - - - - - - - - - */}
            <TelaCompra preco={100} aberto = {pokeStore2VisibleAtom} txtInfo={infoCompra.txtInfo} email={atomEmailValue} nomeItem = {infoCompra.info} componente={
                <ButtonCompra img={infoCompra.img} info={infoCompra.info} preco={infoCompra.preco} msgAlt={infoCompra.msgAlt}/>
                
            }
            closeButtonFunction={() => {setPokeStore2Visible(false); setPokeStoreVisible(true); setSaldoInsuficiente(true)}} classeConf={pokeStore2Visible ? 'aparecer' : ''}/>

                {/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - CONFIG - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}

                <BoxTransparent classeShadow={fecharConfig ? 'aparecer configuracoes' : 'configuracoes'}> 
                    <header>
                        <div className="config-icon">
                            <div className="config"></div>
                        </div>
                        <CloseButton aoClicar={() => {setFecharConfig(false); toggleZerarCmpos(form)}}/>
                    </header>
                    <section className="options">
                        <section className='botaos-opt'>
                            <button className={formNome ? 'clicado': ''} onClick={() => {toggleForm('nome');}}>Nome</button>
                            <button className={formSenha ? 'clicado': ''} onClick={() => {toggleForm('senha')}}>Senha</button>
                            <button className={formEmail ? 'clicado': ''} onClick={() => {toggleForm('email'); setForm('email')}}>Email</button>
                            <button className={formDelete ? 'clicado': ''} onClick={() => {toggleForm('delete'); setForm('email')}}>Deletear Conta</button>
                        </section>
                        <section className='alteracoes'>
                            <FormAlterar classe={formNome ? '': 'sumido'} 
                                typeCampo1='text' textoCampo1='Digite seu novo nome' placeholderCampo1='Novo nome'
                                typeCampo2='text' textoCampo2='Confirme seu novo nome' placeholderCampo2='Novo nome'
                                typeCampo3='text' textoCampo3='Para atualizar o nome, digite seu nome antigo' placeholderCampo3='Antigo nome'
                                campo = {formNome ? 'name' : 'null'}
                                emFoco = {formNome}
                                
                            />
                            <FormAlterar classe={formSenha ? '': 'sumido'}
                            campo={formSenha ? 'password' : 'null'}
                            emFoco = {formSenha}
                            
                            />
                            <FormAlterar classe={formEmail ? '': 'sumido'}
                                typeCampo1='email' textoCampo1='Digite seu novo email' placeholderCampo1='Novo email'
                                typeCampo2='email' textoCampo2='Confirme seu novo email' placeholderCampo2='Novo email'
                                typeCampo3='email' textoCampo3='Para atualizar o email, digite seu email antigo' placeholderCampo3='Antigo email'
                                campo={formEmail ? 'email' : 'null'}
                                emFoco = {formEmail}
                            />
                            <FormAlterar classe={formDelete ? '': 'sumido'} 
                                typeCampo1='text' textoCampo1={'Digite seu email'} placeholderCampo1='Email'
                                textoCampo2='Digite sua senha' placeholderCampo2='Senha'
                                typeCampo3='text' textoCampo3={'Para deletar sua conta digite ' + nomeValue} placeholderCampo3='Confirme'
                                campo = {formDelete ? 'delete' : 'null'}
                                emFoco = {formDelete}
                            />
                        </section>
                    </section>
                </BoxTransparent>
                {/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - BATALHA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
                <BoxTransparent classeShadow={chosePokeBattleVisibility ? 'aparecer' : ''} classe='articleSelecionarPokemomBatalha'>
                    <header>
                        <h1>Selecione o seu pokemom</h1>
                        <CloseButton aoClicar={() => {setChosePokeBattleVisibility(false)}}/>
                    </header>
                    {
                    pokemonsCapturadosArray.map((poke, index) => (
                        <Link to='/batalha'>
                            <div className="pokemom" key={index}>
                                <img src={poke.image_front} alt={poke.name}/>
                                <h2>{poke.nickname}</h2>
                                <p>{poke.name}</p>
                            </div>                        
                        </Link>
                    ))
                    }
                </BoxTransparent>
        </div>
    )
}