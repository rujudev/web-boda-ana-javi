import type { APIRoute } from "astro";
import { supabaseClient } from "../../../db/config";
import { createXlsx } from "../../../utils/utils";

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
    // Subir el archivo a supabase storage (bucket = 'archivos')
    // Obtener la URL del archivo .xlsx en el bucket
    // Subir el archivo a wassenger con la URL
    // mandar el mensaje al grupo con la ID del archivo subido
    // const { data, error } = await supabaseClient.from("confirms").select();

    // const confirms = data?.map((confirm) => ({
    //     ...confirm,
    //     with_bus: confirm?.with_bus ? "Si" : "No",
    //     with_vegan_menu: confirm?.with_vegan_menu ? "Si" : "No",
    //     allergens: confirm.allergens
    //         .map((allergen: String) =>
    //             allergen.padStart(allergen.length + 1, "- "),
    //         )
    //         .join("\n"),
    // }));

    // const xlsBuffer = await createXlsx(confirms);

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