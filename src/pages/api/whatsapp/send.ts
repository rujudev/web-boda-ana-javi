import type { APIRoute } from "astro";

const url = 'https://api.wassenger.com/v1/messages';
let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Token: 'f10b75a8432d643cb4c45eb64a71a7ec8b4a717527067a77a95f8c068e28b8742d0fe57dbd8adac9'
    },
    body: '',
};

export const POST: APIRoute = async ({ request }) => {
    const { assistant } = await request.json();

    options = {
        ...options,
        body: JSON.stringify({
            group: '120363317334214495@g.us',
            message: `${assistant.name} ha confirmado su asistencia el día "${new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}"`
        })
    }
    const whatsappResponse = await fetch(url, options)

    return new Response(JSON.stringify(
        whatsappResponse.status === 201 ? {
            status: 201,
            message: 'Whatsapp de confirmación enviado'
        } : {
            status: 400,
            message: 'Ha ocurrido un error al enviar el mensaje'
        }
    ))
}