import './styles.less'
import logo from '../../assets/Título.png'
import {MenuUsuario} from './MenuUsuario'
export function Header({perfil = false, classeNovo = '', email = '', nome = ''}){
    // function kk(){
    //     ''
    // }
    return(
        <header className={classeNovo + ' Header'}>
            <img src={logo} alt="PokeVerse" />
            <MenuUsuario classePerfil={perfil ? '' : 'sumido'} nome={nome} />
        </header>
    )
}