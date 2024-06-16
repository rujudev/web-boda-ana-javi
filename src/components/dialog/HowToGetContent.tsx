import { dialogEnum } from "./Dialog"
import "../../styles/dialog.style.css"

const Title = ({ title }: { title: string }) => {
    return <h6>{title}</h6>
}

const Map = ({ url }: { url: string }) => {
    return <iframe src={url} width="600" height="450" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
}

const GoogleMapsLink = ({ url }: { url: string }) => {
    return <a href={url} className="button" target="_blank">¿Cómo llegar?</a>
}

const HowToGetContent = ({ type }: { type: string }) => {
    return (
        <>
            {
                type && (
                    type === dialogEnum.HOW_TO_GET_CEREMONY ? (
                        <>
                            <Title title='Cómo llegar a la ceremonia' />
                            <Map url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6254.771534698014!2d-0.7678169226764635!3d38.386328571837645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63c611b4e7a53f%3A0x30a5ff63d3005d86!2sCentro%20Cultural%20G%C3%B3mez%20Tortosa!5e0!3m2!1ses!2ses!4v1718456048125!5m2!1ses!2ses" />
                            <GoogleMapsLink url="https://maps.app.goo.gl/xKNxoUs1ax7qy1aM6" />
                        </>
                    ) : (
                        <>
                            <Title title='Cómo llegar a la celebración' />
                            <GoogleMapsLink url="https://maps.app.goo.gl/xKNxoUs1ax7qy1aM6" />
                        </>
                    )
                )
            }
        </>
    )
}

export default HowToGetContent;