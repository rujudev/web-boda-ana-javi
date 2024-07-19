import React from 'react';
import { dialogEnum } from "./Dialog"
import "../../styles/dialog.style.css"

const Title = ({ title }) => {
    return <h6>{title}</h6>
}

const Map = ({ url }) => {
    return <iframe src={url} style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
}

const GoogleMapsLink = ({ url }) => {
    return <a href={url} className="button" target="_blank">¿Cómo llegar?</a>
}

const HowToGetContent = ({ type }) => {
    let content = null;

    if (type === dialogEnum.HOW_TO_GET_CEREMONY) {
        content = {
            title: 'Cómo llegar a la ceremonia',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6254.771534698014!2d-0.7678169226764635!3d38.386328571837645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63c611b4e7a53f%3A0x30a5ff63d3005d86!2sCentro%20Cultural%20G%C3%B3mez%20Tortosa!5e0!3m2!1ses!2ses!4v1718456048125!5m2!1ses!2ses',
            mapLinkUrl: 'https://maps.app.goo.gl/xKNxoUs1ax7qy1aM6'
        };
    }
    else if (dialogEnum.HOW_TO_GET_CELEBRATION) {
        content = {
            title: 'Cómo llegar a la celebración',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.4803666881976!2d-0.8136795589692417!3d38.45346997193956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63c492df14876f%3A0xd55330b06dea4860!2sQuinta%20Lacy!5e0!3m2!1ses!2ses!4v1718999315509!5m2!1ses!2ses',
            mapLinkUrl: 'https://maps.app.goo.gl/xQHDi6eHjVE3hsvf7'
        };
    }

    return (
        <>
            {
                content && (
                    <>
                        <Title title={content.title} />
                        <Map url={content.mapUrl} />
                        <GoogleMapsLink url={content.mapLinkUrl} />
                    </>
                )
            }
        </>
    )
}

export default HowToGetContent;