import './styles.less'

export function BotaoSubmit({text = "Cadastrar", type = "submit", classe = '', aoClicar}){
    return <button className={classe + ' BotaoSubmit'} type={type} onClick={aoClicar}>
        {text}
    </button>
}