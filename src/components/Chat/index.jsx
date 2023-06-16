import { CloseButton } from '../CloseButton'
import './styles.less'
import { SendOutline } from 'react-ionicons'
import { useMediaQuery } from 'react-responsive'

export function Chat({classe = '', setClose, controleClose = false}){
    const resolucaoMin = useMediaQuery({maxWidth: 1000})
    return (
        <article className={'Chat ' + classe}>
            {resolucaoMin ? (
                controleClose ? (
                    <CloseButton classe='closeButton' aoClicar={() => {
                        setClose(true)
                    }}/>
                ) : (
                    ""
                )
            ) : (
                ""
            )}
            <div className="mensagens">
                <p>Vai se fuder fdp</p>
                <p>Vai se fuder fdp</p>
                <p>Vai se fuder fdp</p>
                <p>Vai se fuder fdp</p>
            </div>
            <span><input type="text" placeholder='Digite algo'/>
            <SendOutline
                color={'#00000'} 
                title='Enviar'
                height="30px"
                width="30px"
            />
            </span>
        </article>
    )
}