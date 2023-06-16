import './styles.less'

export function BotaoEscolha({text = '', aoClicar, classe = ''}){
    return(
        <button className={classe+' BotaoEscolha'} onClick={aoClicar}>
            {text}
        </button>
    )
} 