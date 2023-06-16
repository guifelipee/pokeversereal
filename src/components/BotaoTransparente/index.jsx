import './styles.less'

export function BotaoTransparente({typeButton = 'button', classe = '', aoClicar, text = 'Confirmar compra'}){
    return (
        <button className={classe + ' BotaoTransparente'} type = {typeButton} onClick={aoClicar}>
            {text}
        </button>
    )
}