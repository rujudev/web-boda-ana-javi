import React, { Fragment, useEffect, useState } from 'react';
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
    const [content, setContent] = useState({
        title: '',
        sites: []
    });

    const handleOnChangeTab = e => {
        const { parentNode } = e.target;
        const { id } = parentNode;

        const updatedSites = content.sites.map(site => ({ ...site, isActive: site.id === id }));

        setContent(prevContent => ({
            ...prevContent,
            sites: updatedSites
        }));

    }

    useEffect(() => {
        if (type === dialogEnum.HOW_TO_GET_CEREMONY) {
            setContent({
                title: 'Cómo llegar a la ceremonia',
                sites: [
                    {
                        title: '',
                        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6254.771534698014!2d-0.7678169226764635!3d38.386328571837645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63c611b4e7a53f%3A0x30a5ff63d3005d86!2sCentro%20Cultural%20G%C3%B3mez%20Tortosa!5e0!3m2!1ses!2ses!4v1718456048125!5m2!1ses!2ses',
                        url: 'https://maps.app.goo.gl/xKNxoUs1ax7qy1aM6'
                    }
                ],
            });
        }
        else if (type === dialogEnum.HOW_TO_GET_CELEBRATION) {
            setContent({
                title: 'Cómo llegar a la celebración',
                sites: [
                    {
                        id: 'site1',
                        title: 'Quinta Lacy',
                        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.4803666881976!2d-0.8136795589692417!3d38.45346997193956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63c492df14876f%3A0xd55330b06dea4860!2sQuinta%20Lacy!5e0!3m2!1ses!2ses!4v1718999315509!5m2!1ses!2ses',
                        url: 'https://maps.app.goo.gl/xQHDi6eHjVE3hsvf7',
                        isActive: true
                    },
                    {
                        id: 'site2',
                        title: 'Deskaro Club',
                        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.6696739412555!2d-0.7704831!3d38.37976239999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63c7303fa33265%3A0x7cec57ee6a0e9d73!2sDesKaro%20Club!5e0!3m2!1ses!2ses!4v1723550828979!5m2!1ses!2ses',
                        url: 'https://maps.app.goo.gl/UtVngpvwuwq8c9yq6',
                        isActive: false,
                    }
                ],
            });
        } else if (type === dialogEnum.HOW_TO_GET_BUS) {
            setContent({
                title: 'Paradas del autobús',
                sites: [
                    {
                        id: 'site1',
                        title: 'Salida',
                        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.3663780421825!2d-0.7653430870778986!3d38.386776971720245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63c61aa0a22a75%3A0x1846dd51dc650460!2sC.%20Joan%20Martorell%2C%202%2C%2003660%20Novelda%2C%20Alicante!5e0!3m2!1ses!2ses!4v1723744211981!5m2!1ses!2ses"',
                        url: 'https://maps.app.goo.gl/rctGNyynMMTKK7kS6',
                        isActive: true
                    },
                    {
                        id: 'site2',
                        title: 'Regreso',
                        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.601393513926!2d-0.7728808870780909!3d38.38134167172141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63c6148cfb0c53%3A0xf6893261feed0aea!2sAv.%20Elche%2C%202%2C%2003660%20Novelda%2C%20Alicante!5e0!3m2!1ses!2ses!4v1723744283671!5m2!1ses!2ses',
                        url: 'https://maps.app.goo.gl/B4fey2fns7Ndu7L88',
                        isActive: false,
                    }
                ],
            });
        }
    }, [type])

    return (
        <>
            {
                content && (
                    <>
                        <Title title={content.title} />

                        {content.sites.length === 1 ? (
                            <>
                                <Map url={content.sites[0].map} />
                                <GoogleMapsLink url={content.sites[0].map} />
                            </>
                        ) : (
                            <div className="container">
                                <div className="tabs">
                                    {
                                        content.sites.map(({ id, title, map, url, isActive }) => (
                                            <div className={`tab ${isActive ? 'active' : ''}`} id={id} key={id}>
                                                <button onClick={handleOnChangeTab}>{title}</button>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="content">
                                    {
                                        content.sites.filter(site => site.isActive).map(({ id, map, url }) => (
                                            <Fragment key={id}>
                                                <Map url={map} />
                                                <GoogleMapsLink url={url} />
                                            </Fragment>
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                    </>
                )
            }
        </>
    )
}

export default HowToGetContent;