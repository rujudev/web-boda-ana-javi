
import React, { useState, useEffect, useRef } from 'react';
import Dialog, { dialogEnum } from './dialog/Dialog';
import lottie from 'lottie-web';
import "../styles/ceremony-section.style.css"

const CeremonySection = () => {
    const [dialogType, setDialogType] = useState(dialogEnum.HOW_TO_GET_CEREMONY);
    const dialogRef = useRef(null);

    const initAnimations = () => {
		// Animación anillos
        const svgContainerAnillos = document.querySelector('.anim-anillos');

        if (svgContainerAnillos) {
            const animAnillos = lottie.loadAnimation({
                container: svgContainerAnillos,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'src/assets/animations/anim_ceremonia.json'
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
                path: 'src/assets/animations/anim_fiesta.json'
            });
    
            animFiesta.play();
        }
	}
    
    const toggleOpenDialog = (type: dialogEnum) => {
        const dialog = dialogRef.current;
     
        setDialogType(type)

        if (dialog) {
            const dialogAttributes = dialog.attributes;
            const openAttribute = document.createAttribute('open')

            !dialog.open && dialogAttributes.setNamedItem(openAttribute)
        }
    }

    useEffect(() => {
        initAnimations();
    }, [])

    return (
        <>
            <section id="ceremony-section">
                <div id="ring-container">
                    <div className="anim-anillos circle"></div>
                    <div className="ceremony-title-container">
                        <h2>Ceremonia</h2>
                    </div>
                    <div className="hour">
                        <h6>Hora</h6>
                        <span>12:00H</span>
                    </div>
                    <div className="address">
                        <h6>Lugar</h6>
                        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
                            <span className="site-name"><b>Centro cultural Gómez Tortosa</b></span>
                            <span className="site-address">Carrer Major, 6, Novelda, Alicante</span>
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
                        <span>13:00H</span>
                    </div>
                    <div className="address">
                        <h6>Lugar</h6>
                        <div style={{ display: "flex", flexDirection: "column", gap: ".5em" }}>
                            <span className="site-name"><b>Quinta Lacy</b></span>
                            <span className="site-address">Av. San Luis de Cuba, 1, Elda, Alicante</span>
                        </div>
                        {/* <a href="https://maps.app.goo.gl/xQHDi6eHjVE3hsvf7" className="button"  data-dialog_type={dialogEnum.HOW_TO_GET_CEREMONY}>¿Cómo llegar?</a> */}
                        <button id="celebration-address-button" className="button" onClick={() => toggleOpenDialog(dialogEnum.HOW_TO_GET_CELEBRATION)}>¿Cómo llegar?</button>
                    </div>
                </div>
                <div id="assist-button-container" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h2>¡Te esperamos!</h2>
                    <button id="confirm-assist-button" className="button" onClick={() => toggleOpenDialog(dialogEnum.CONFIRM_ASSIST)}>Confirmar Asistencia</button>
                </div>
            <Dialog type={dialogType} ref={dialogRef} />
            </section>

        </>
    )
}

export default CeremonySection;