import React, { useRef } from "react";
import { supabaseClient } from "../../db/config";
import 'animate.css';

const ConfirmAssistContent = () => {
    const otherAllergenInputRef = useRef(null);
    const submitButtonRef = useRef(null);

    const allergens = [
        "Cereales con gluten",
        "Crustáceos",
        "Moluscos",
        "Pescado",
        "Huevos",
        "Altramuces",
        "Mostaza",
        "Cacahuetes",
        "Frutos de cáscara",
        "Soja",
        "Sésamo",
        "Apio",
        "Lácteos",
        "Dióxido de azufre y sulfitos"
    ];

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const toggleOpenOtherAllergen = () => {
        const otherAllergenInput = otherAllergenInputRef.current;

        otherAllergenInput.classList.toggle('hidden');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const button = submitButtonRef.current;

        const form = event.target;

        const formData = new FormData(form)

        let assistant = {
            name: formData.get('name'),
            with_bus: formData.get('confirm-bus-option') === 'yes',
            with_vegan_menu: formData.get('confirm-vegan-option') === 'yes',
            allergens: [],
        }

        for (const [key, value] of formData) {
            if (value) {
                if (key.includes('allergen-option')) {
                    assistant = {
                        ...assistant,
                        allergens: [
                            ...assistant.allergens,
                            value
                        ]
                    }
                }
            }
        }

        const submitButton = document.querySelector('button[form=confirm-assist-form]');
        submitButton.classList.add('sending');
        const sendConfirmationSpan = submitButton.querySelector('.send-confirmation');
        sendConfirmationSpan.classList.add('animate__fadeOut');


        const loader = document.createElement('span');
        loader.classList.add('loader');
        sendConfirmationSpan.style.display = 'none';
        submitButton.appendChild(loader);
        submitButton.style.backgroundColor = '#81948b';

        let error = false;

        // const fetchTimeout = setTimeout(() => {
        //     supabaseClient.from('confirms').insert(assistant).then(({ error }) => error = error);
        // }, 2000);

        if (!error) {
            // await fetch('api/whatsapp/send', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         assistant
            //     })
            // });

            setTimeout(() => {
                submitButton.removeAttribute('style');
                submitButton.classList.remove('sending');
                submitButton.innerText = '✔ Confirmación enviada!';

                clearTimeout(fetchTimeout);
                form.reset()
            }, 2000)

            setTimeout(() => {
                submitButton.innerHTML = `<span class="send-confirmation animate__animated">Enviar confirmación</span>`;
            }, 4000)
        }
    }

    return (
        <>
            <h6 >Confirmación de asistencia</h6>
            <div id="confirmation-header">
                <p>
                    Por favor, rellena este cuestionario para que podamos contar contigo. Es necesario responder a todas las preguntas, a ser posible, antes del <span id="date">01/09/2024</span>.
                </p>
                <p>
                    El cuestionario debe rellenarse por persona (incluido niños/as y bebés (trona)). <span id="thank">¡Muchas gracias!</span>
                </p>
            </div>

            <form id="confirm-assist-form" method="post" onSubmit={handleSubmit}>
                <div id="name-input-container">
                    <label htmlFor="name">Nombre y apellidos</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div id="bus-container">
                    <h6>¿Asistirás en autobús?</h6>
                    <span>Habrá autobús de ida y vuelta con salida en Avda. Constitución, 36 Novelda.</span>
                    <div id="bus-confirmation">
                        <div>
                            <input type="radio" name="confirm-bus-option" id="yes" value="yes" required />
                            <label htmlFor="yes">Sí, voy en autobús</label>
                        </div>
                        <div>
                            <input type="radio" name="confirm-bus-option" id="no" value="no" required />
                            <label htmlFor="no">No, voy por mi cuenta</label>
                        </div>
                    </div>
                </div>
                <div id="allergen-container">
                    <div id="allergen-container-header">
                        <h6>Alergias</h6>
                    </div>
                    <div id="allergen-list-container">
                        {allergens.map(allergen => {
                            const allergenValue = removeAccents(allergen)
                            const mappedAllergen = allergenValue.toLowerCase().split(' ').join('_');

                            return (
                                <div key={mappedAllergen}>
                                    <input type="checkbox" name={`${mappedAllergen}-checkbox-allergen-option`} id={`${mappedAllergen}-checkbox-allergen-option`} value={allergenValue} />
                                    <label htmlFor={`${mappedAllergen}-checkbox-allergen-option`}>{allergen}</label>
                                </div>
                            );
                        })}
                    </div>
                    <div id="other-option-container">
                        <div>
                            <input type="checkbox" name="other-allergen-checkbox-option" id="other-allergen-checkbox-option" value="otros" onClick={toggleOpenOtherAllergen} />
                            <label htmlFor="other-allergen-checkbox-option">Otros</label>
                        </div>

                        <input type="text" name="other-allergens" id="other-allergens-input" className="hidden" ref={otherAllergenInputRef} />
                    </div>
                </div>
                <div id="vegan-container">
                    <h6>Opción vegana</h6>
                    <div id="vegan-confirmation">
                        <div>
                            <input type="radio" name="confirm-vegan-option" id="yes" value="yes" required />
                            <label htmlFor="yes">Sí</label>
                        </div>
                        <div>
                            <input type="radio" name="confirm-vegan-option" id="no" value="no" required />
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                </div>
            </form>
            <button form="confirm-assist-form" className="button confirm-assist" ref={submitButtonRef}><span className="send-confirmation animate__animated">Enviar confirmación</span></button>
        </>
    )

}

export default ConfirmAssistContent;