import './styles.less'
export function BotaoInicial({text, classeNova = '', aoClicar}){
    return <button type='button' className={classeNova + ' BotaoInicial'} onClick={aoClicar}>{text}</button>
}