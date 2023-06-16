import './styles.less'

export function CloseButton({aoClicar, classe = ''}){
    return <button onClick={aoClicar} className={classe + ' CloseButton'}>

    </button>
}