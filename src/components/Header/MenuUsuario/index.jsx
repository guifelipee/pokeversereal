import './styles.less'

export function MenuUsuario({classePerfil, nome}){
    return <button className={classePerfil + ' MenuUsuario'}>
        <p>{nome}</p>
    </button>
}