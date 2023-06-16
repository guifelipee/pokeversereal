import './styles.less'

export function BoxTransparent({children, classe = '', classeShadow = '' }) {
    return  (
        <div className={classeShadow + ' BoxTransparent'}>
            <article className={classe + ' '}>
                {children}
            </article>
        </div>
    )
}