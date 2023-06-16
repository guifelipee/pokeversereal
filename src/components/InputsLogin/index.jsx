import './styles.less'

export function InputsLogin({
    typeInput,
    placeHolderInput,
    valorInput,
    setValor,
    classe = '',
    nameInput = '',
    minLengthInput,
    maxLengthInput
}){
    return (
        <input className={classe + ' InputsLogin'} 
        type={typeInput}
        placeholder={placeHolderInput}
        value={valorInput}
        onChange={(e) => setValor(e.target.value)}
        required
        name={nameInput}
        minLength={minLengthInput}
        maxLength={maxLengthInput}
        />
    )
}