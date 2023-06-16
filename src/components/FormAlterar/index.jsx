import { InputsLogin } from '../InputsLogin'
import './styles.less'
import { useState, useEffect } from 'react'
import { Base64 } from 'js-base64'
import { fecharConfiguracoes } from '../../states/configStats'
import { useAtom } from 'jotai'
import axios from 'axios'
import {atomEmail} from '../../states/emailState'
import { useNavigate } from 'react-router-dom'
export function FormAlterar({
    classe = '',
    typeCampo1 = 'password', textoCampo1 = 'Digite uma nova senha', placeholderCampo1 = 'Nova senha',
    typeCampo2 = 'password', textoCampo2 = 'Confirme sua senha', placeholderCampo2 = 'Nova senha',
    typeCampo3 = 'password', textoCampo3 = 'Para atualizar a senha, digite sua senha antiga', placeholderCampo3 = 'Antiga senha',
    campo = '',
    emFoco = false,
}){
    const navigate = useNavigate()
    const [campoCorreto, setCampoCorreto] =  useState('')
    const [sumido1, setSumido1] = useState(true)
    const [sumido2, setSumido2] = useState(true)
    const [campo1, setCampo1] = useState('')
    const [campo2, setCampo2] = useState('')
    const [campo3, setCampo3] = useState('')
    const [atomEmailValue, setAtomEmailValue] = useAtom(atomEmail)
    const [controleDelete, setControleDelete] = useState(false)
    const campo1Novo = Base64.encode(campo1)
    const campo2Novo =  Base64.encode(campo1)
    const [fecharConfig, setFecharConfig]  = useAtom(fecharConfiguracoes)
    const [campo3conf, setCampo3conf] = useState()
    function zerarCampos(){
        if(emFoco === true){
            setCampo1('')
            setCampo2('')
            setCampo3('')
        }
    }
    useEffect(() => {
        zerarCampos()
      }, [emFoco, setFecharConfig]);
    
    function fechar(){
        setCampo1('')
        setCampo2('')
        setCampo3('')
        setFecharConfig(false)
    }
    function aoSubmitar(campo, event){
        event.preventDefault()
        if(campo1Novo == campo2Novo){
            if(campo == 'email'){
                if(campo3 == campo3conf){
                    alterarTreinador(campo, campo2)
                    setAtomEmailValue(campo2)
                    setCampo1('')
                    setCampo2('')
                    setCampo3('')
                    alert( 'Alteração no '+ campo +' foi um sucesso')
                }
                else{
                    setSumido1(false)
                }
            }
             else if(campo == 'password'){
                if(Base64.encode(campo3) == Base64.encode(campo3conf.replaceAll('"', ""))){
                    console.log("entrou")
                    alterarTreinador(campo, Base64.encode(campo2))
                    setCampo1('')
                    setCampo2('')
                    setCampo3('')
                    alert( 'Alteração no '+ campo +' foi um sucesso')
                }
                else{
                    setSumido1(false)
                }
            }
             else if(campo == 'name'){
                if(campo3 == campo3conf){
                    console.log('entrou')
                    alterarTreinador(campo, campo2)
                    setCampo1('')
                    setCampo2('')
                    setCampo3('')
                    alert( 'Alteração no '+ campo +' foi um sucesso')
                }
                else{
                    setSumido1(false)
                }
            }
             else if(campo == 'delete'){
                getInfo()
                if(controleDelete == true){
                    deletarTreinador()
                    setCampo1('')
                    setCampo2('')
                    setCampo3('')
                }
                else{
                    setSumido1(false)
                }
            }
        }
        else{
            setSumido2(false)
        }
        // console.log(campo, "valor1", campo1, "valor2", campo2, "valor3",campo3, "campo 3 aql", campo3conf) 
    }
    async function alterarTreinador(campo, valor){
        console.log(campo, valor, atomEmailValue, localStorage.getItem('jwt'))
        return axios({method: 'put', 
            url:'https://rotas-pokeverse.onrender.com/alter_trainer', 
            params: { email: atomEmailValue, field: campo, value:valor},
            headers: { 'token-jwt':localStorage.getItem('jwt')}})
          .then((response) => {
            console.log("Valor antigo" + campo3 + 'Valor novo' + response.data.message[0].campo)
          })
          .catch((error) => {
            console.log("erro se pa        ", error)
          })
    }

    function deletarTreinador(){
        return axios({method: 'delete', 
        url:'https://rotas-pokeverse.onrender.com/delete_trainer', 
        params: { email: atomEmailValue},
        headers: { 'token-jwt':localStorage.getItem('jwt')}})
      .then((response) => {
        if(response.data.message[0] != ""){
            localStorage.clear()
            navigate("/primaria", {replace:true})
        }
      })
      .catch((error) => {
        console.log("erro se pa        ", error)
      })
    }

    async function getInfo(campo) {
            return axios.get('https://rotas-pokeverse.onrender.com/find_trainer_with_query', {
            params: { field: "email", value: atomEmailValue },
            headers: { 'token-jwt':localStorage.getItem('jwt') }
            })
            .then((response) => {
                if (response.data.message === []) {
                return "error";
                } else {
                if(campo == 'email'){
                    setCampo3conf(response.data.message[0].email)
                    console.log(response.data.message[0].email)
                }
                if(campo == 'name'){
                    setCampo3conf(response.data.message[0].name)
                    console.log(response.data.message[0].name)
                }
                if(campo == 'password'){
                    setCampo3conf(response.data.message[0].password)
                    console.log(response.data.message[0].password)
                }
                if(campo == 'delete'){
                    console.log("entrou")
                    if(campo1 == response.data.message[0].email){
                        console.log("entrou2" + response.data.message[0].password.replaceAll('"', ""))
                        if(campo2 == response.data.message[0].password.replaceAll('"', "")){
                            console.log("entrou3")
                            if(campo3 == response.data.message[0].name){
                                console.log("entrou4")
                                setControleDelete(true)
                            }
                        }
                    }
                }
                }
            })
            .catch((error) => {
                console.log("errouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu aq?" + error);
            });
      }
      useEffect(() => {
        getInfo(campo)
        if(campo != 'null'){
            setCampoCorreto(campo)
        }
    }, [campo, aoSubmitar]);
    return <form action="" className={classe + ' FormAlterar'} onSubmit={(event) => {aoSubmitar(campo, event)}}>
        <p>{textoCampo1 + ': '}</p>
        <InputsLogin typeInput={typeCampo1} placeHolderInput={placeholderCampo1 } setValor={setCampo1} valorInput={campo1} />
        <p>{textoCampo2 + ': '}</p>
        <InputsLogin typeInput={typeCampo2} placeHolderInput={placeholderCampo2} setValor={setCampo2} valorInput={campo2}/>
        <p className={sumido2 ? 'sumido' : ''}>Os campos não estão iguais</p>
        <p>{textoCampo3 + ': '}</p>
        <InputsLogin typeInput={typeCampo3} placeHolderInput={placeholderCampo3} setValor={setCampo3} valorInput={campo3}/>
        <p className={sumido1 ? 'sumido' : ''}>Incorreto, digite o valor correto</p>
        <div className="botoes-submit">
            <button onClick={fechar} type='button'>Cancelar</button>
            <button type='submit'>Confirmar</button>
        </div>
    </form>
}