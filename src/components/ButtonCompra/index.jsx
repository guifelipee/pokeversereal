import './styles.less'

export function ButtonCompra({preco,  info = '', msgAlt = '', aoClicar, classe = '', img, qnt}){
    return( 
    <button type='button' className={classe + ' ButtonCompra'} onClick={aoClicar}>
        <span>
            <img src={img} alt={msgAlt} />
            <p>{info}</p>
        </span>
        <p>{preco} {qnt}</p>
    </button>
    )
}