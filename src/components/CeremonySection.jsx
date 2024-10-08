import React, { useState, useEffect, useRef } from 'react';
import Dialog, { dialogEnum } from './dialog/Dialog';
import lottie from 'lottie-web';
import "../styles/ceremony-section.style.css"

const CeremonySection = () => {
    const [dialogType, setDialogType] = useState(dialogEnum.HOW_TO_GET_CEREMONY)
    const dialogRef = useRef(null)
    const height = useRef(null);

    const initAnimations = () => {
        // Animación anillos
        const svgContainerAnillos = document.querySelector('.anim-anillos')

        if (svgContainerAnillos) {
            const animAnillos = lottie.loadAnimation({
                container: svgContainerAnillos,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '../assets/animations/anim_ceremonia.json'
            });

            animAnillos.play();
        }

        // Animación fiesta
        const svgContainerFiesta = document.querySelector('.anim-fiesta');

        if (svgContainerFiesta) {
            const animFiesta = lottie.loadAnimation({
                container: svgContainerFiesta,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '../assets/animations/anim_fiesta.json'
            });

            animFiesta.play();
        }

        // Animación bus
        const svgContainerBus = document.querySelector('.anim-bus');

        if (svgContainerBus) {
            const animBus = lottie.loadAnimation({
                container: svgContainerBus,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '../assets/animations/anim_bus.json'
            });

            animBus.play();
        }

        // Animación parking
        const svgContainerParking = document.querySelector('.anim-parking');

        if (svgContainerParking) {
            const animParking = lottie.loadAnimation({
                container: svgContainerParking,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '../assets/animations/anim_parking.json'
            });

            animParking.play();
        }

        // Animación pinmap
        const svgContainerPinmap = document.querySelector('.anim-pinmap');

        if (svgContainerPinmap) {
            const animPinmap = lottie.loadAnimation({
                container: svgContainerPinmap,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '../assets/animations/anim_pinmap.json'
            });

            animPinmap.play();
        }

        // Animación flores arriba izquierda
        const svgContainerTopLeftFlowers = document.querySelector('#top-left-flowers');

        if (svgContainerTopLeftFlowers) {
            const animTopLeftFlowers = lottie.loadAnimation({
                container: svgContainerTopLeftFlowers,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: '../assets/animations/hojas_top_celebration_section.json'
            });

            animTopLeftFlowers.play();
        }

        // Animación flores bajo derecha
        const svgContainerRightBottomFlowers = document.querySelector('#right-bottom-flowers');

        if (svgContainerRightBottomFlowers) {
            const animRightBottomFlowers = lottie.loadAnimation({
                container: svgContainerRightBottomFlowers,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: '../assets/animations/hojas_bottom_right_celebration_section.json'
            });

            animRightBottomFlowers.play();
        }
    }

    const toggleOpenDialog = (type) => {
        const dialog = dialogRef.current;

        setDialogType(type)

        if (dialog) {
            dialog.showModal();

            if (type === dialogEnum.CONFIRM_ASSIST) {
                dialog.classList.add('confirm-assist')
            }

            document.body.style.overflowY = 'hidden';
        }
    }

    useEffect(() => {
        initAnimations();
    }, [])

    return (
        <>
            <span id="height" ref={height} style={{ position: "fixed", top: 0, zIndex: 3 }}></span>
            <section id="ceremony-section">
                <div id="line-background"></div>
                <div id="top-left-flowers"></div>
                <div id="ring-container">
                    <div className="anim-anillos circle"></div>
                    <div className="ceremony-title-container">
                        <h2>Ceremonia</h2>
                    </div>
                    <div className="hour">
                        <h6>Hora</h6>
                        <span>12:00 H.</span>
                    </div>
                    <div className="address">
                        <h6>Lugar</h6>
                        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
                            <span className="site-name"><b>Centro cultural Gómez Tortosa</b></span>
                            <span className="site-address">Carrer Major, 6 Novelda, Alicante</span>
                        </div>

                        <button id="ceremony-address-button" className="button" onClick={() => toggleOpenDialog(dialogEnum.HOW_TO_GET_CEREMONY)}>¿Cómo llegar?</button>
                    </div>
                </div>
                <div id="party-container">
                    <div className="anim-fiesta circle"></div>
                    <div className="party-title-container">
                        <h2>Celebración</h2>
                    </div>
                    <div className="hour">
                        <h6>Hora</h6>
                        <span>13:30 H.</span>
                    </div>
                    <div className="address">
                        <h6>Lugar</h6>
                        <div className='addresses-container'>
                            <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
                                <span className="site-name"><b>Quinta Lacy</b></span>
                                <span className="site-address">Avda. San Luis de Cuba, 1 Elda, Alicante</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
                                <span>Después de la celebración, la fiesta continúa en <span className="site-name"><b>Deskaro Club</b></span></span>
                                <span className="site-address">Avda. de los Reyes Católicos, 93 Novelda, Alicante</span>
                            </div>

                        </div>
                        <button id="celebration-address-button" className="button" onClick={() => toggleOpenDialog(dialogEnum.HOW_TO_GET_CELEBRATION)}>¿Cómo llegar?</button>
                    </div>
                </div>
                <div id="bus-container">
                    <div className="anim-bus circle"></div>
                    <div className="bus-title-container">
                        <h2>Autobús</h2>
                    </div>
                    <div className="hour">
                        <h6>Hora</h6>
                        <div className="departure-arrival-hour-container">
                            <div className="departure-hour-container"><span className="departure-title">Salida: </span><span>13:00 H.</span></div>
                            <div className="arrival-hour-container"><span className="arrival-title">Regreso:</span><span>20:00 H.</span></div>
                        </div>
                    </div>
                    <div className="address">
                        <h6>Lugar</h6>
                        <div className="departure-arrival-address-container">
                            <div className="departure-address-container"><span className="departure-title">Salida: </span><span>Carrer Joanot Martorell, 2 Novelda, Alicante</span></div>
                            <div className="arrival-address-container"><span className="arrival-title">Regreso:</span><span>Avda. Elche, 2 Novelda, Alicante</span></div>
                        </div>

                        <button id="ceremony-address-button" className="button" onClick={() => toggleOpenDialog(dialogEnum.HOW_TO_GET_BUS)}>¿Cómo llegar?</button>
                    </div>
                </div>
                <div id="parking-container">
                    <div className="anim-parking circle"></div>
                    <div className="parking-title-container">
                        <h2>Parking</h2>
                    </div>
                    <div className="parking-pinmap-container">
                        <span>Os recomendamos aparcar por esta zona: </span>
                        <a href="https://maps.app.goo.gl/q28oV6tdBPpNSjGR6"><span className="anim-pinmap"></span></a>
                    </div>
                </div>

                <div id="assist-button-container" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h2>¡Gracias por tod@s las confirmaciones!</h2>
                    <span>Os esperamos a todos en <strong>CENTRO CULTURAL GÓMEZ TORTOSA</strong> a las <strong>12:00H</strong> el día <strong>05/10/2024</strong></span>
                    {/* <h2>¡Te esperamos!</h2>
                    <button id="confirm-assist-button" className="button" onClick={() => toggleOpenDialog(dialogEnum.CONFIRM_ASSIST)}>Confirmar Asistencia</button> */}
                </div>
                <div id="right-bottom-flowers" />
            </section>
            <Dialog type={dialogType} ref={dialogRef} />
        </>
    )
}

export default CeremonySection;