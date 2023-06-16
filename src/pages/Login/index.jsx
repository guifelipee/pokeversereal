import './styles.less'
import '../../global.less'
import {Header} from '../../components/Header'
import { ArticleCadastro } from '../../components/ArticleCadastro'
import { ArticleLogin } from '../../components/ArticleLogin'
import { useState } from 'react'
export function Login(){
    const [hide, setHide] = useState(false)
    const toggleArticles = () => {
        setHide(!hide)
    }
    
    return(

        <div className='Login'>
            <Header perfil = {false}/>
            <ArticleCadastro aoClicar ={toggleArticles} classe={hide? '': 'sumido1'}/>
            <ArticleLogin  aoClicar ={toggleArticles}  classe={hide ? 'sumido' : ''}/>
        </div>
    )
}