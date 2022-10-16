import styles from '/styles/nearBy.module.css'

export default function NearBySlide({innerHtml}) {
    return (
        <>
            <div dangerouslySetInnerHTML={{__html: innerHtml}} />
        </>
    )
}