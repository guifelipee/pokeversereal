import './styles.less'
import { BotaoSubmit } from '../BotaoSubmit'
import { InputsLogin } from '../InputsLogin'
import { useState } from 'react'
import { Base64 } from 'js-base64'
import { useAtom } from 'jotai'
import { atomEmail } from '../../states/emailState'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export function ArticleCadastro({aoClicar, classe}){
    const navigate = useNavigate();
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [confSenha, setConfSenha] = useState("")
    const [genero, setGenero] = useState(false)
    const [genero2, setGenero2] = useState(false)
    const [sumido1, setSumido1] = useState(true)
    const [sumido2, setSumido2] = useState(true)
    const [atomEmailValue, setAtomEmail] = useAtom(atomEmail);
    async function post(name, email, password, genero){
        await axios({method: 'post',
        url: 'https://rotas-pokeverse.onrender.com/sign_in', 
        params: {name:name, email:email, password:password, gender:genero}})
        .then((e) => {if(e.data.message[0].Erro === "Email em uso"){
            setSumido2(false)
        }
        else{
            console.log(e.data.message)
            navigate("/inicial", {replace: true})
        }
    })
        .catch((promisse) => {console.log('errroooooooooooooooo' +console.log(promisse))})
        }
    function submitForm(e){
        e.preventDefault()
        function verificarGenero(){
            if(genero === true){
                return 'pedrosa'
            }
            else if(genero2 === true){
                return 'masculino'
            }
            else{
                return false
            }
        }
                    
            if(senha === confSenha){
                const pessoa = {
                    email: atomEmailValue,
                    nome: nome,
                    senha: Base64.encode(senha),
                    genero: verificarGenero() 
                }
                // localStorage.setItem("jwt", JSON.stringify({name: `${nome}`}))
                post(pessoa.nome, pessoa.email, pessoa.senha, pessoa.genero);
            }
            else{
                setSumido1(false);
            };
        }
    // }
    return <article className={classe + ' ArticleCadastro'}>
        <form action="#"  onSubmit={submitForm}>
            <h1>Cadastrar</h1>
            <InputsLogin 
                typeInput='email' 
                placeHolderInput='Email' 
                valorInput={atomEmailValue} 
                setValor={setAtomEmail}
            />
            <p className={sumido2 ? 'sumido' : ''}>Esse email ja está em uso.</p>
            <InputsLogin 
                typeInput='text' 
                placeHolderInput='Nome do usuário' 
                valorInput={nome} 
                setValor={setNome}
            />
            <InputsLogin 
                typeInput='password' 
                placeHolderInput='Senha' 
                valorInput={senha} 
                setValor={setSenha} 
                minLengthInput='8' 
                classe='senha'
            />
            <InputsLogin 
                typeInput='password' 
                placeHolderInput='Confirmar senha' 
                valorInput={confSenha} 
                setValor={setConfSenha} 
                minLengthInput='8' 
                classe='senha'
            />
            
            <div className="genero">
            <label htmlFor="generos">Gênero</label>
            <div className="generos-types">
                <label className='generos-label'>Vinicius 
                    <input 
                        type='radio' 
                        name='generos' 
                        onChange={() => {
                            setGenero(true)
                            setGenero2(false)
                        }}
                        required
                    />
                </label>
                <label className='generos-label'>Masculino 
                    <input 
                        type='radio' 
                        name='generos' 
                        onChange={() => {
                            setGenero2(true) 
                            setGenero(false)
                        }}
                        required
                    />
                </label>
            </div>
            </div>
            <p className={sumido1 ? 'sumido' : ''}>As senhas não estão iguais</p>
            <BotaoSubmit/>
            <p>Já tem uma conta? Faça login <button className='no-button' type='button' onClick={aoClicar}>clicando aqui</button> </p>
        </form>
    </article>
}