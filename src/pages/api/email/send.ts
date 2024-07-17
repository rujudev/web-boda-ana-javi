import type { APIRoute } from "astro";
import { Resend } from "resend";
import { supabaseClient } from "../../../db/config";

import { createXlsx } from "../../../utils/utils";

const resend = new Resend(
    "re_QtL137SQ_DrEDCyuVsm1yXY9sxZfqd4d2",
);

export const POST: APIRoute = async ({ request }) => {
    const { data, error } = await supabaseClient.from("confirms").select();

    const confirms = data?.map((confirm) => ({
        ...confirm,
        with_bus: confirm?.with_bus ? "Si" : "No",
        with_vegan_menu: confirm?.with_vegan_menu ? "Si" : "No",
        allergens: confirm.allergens
            .map((allergen: String) =>
                allergen.padStart(allergen.length + 1, "- "),
            )
            .join("\n"),
    }));

    const xlsBuffer = await createXlsx(confirms)

    const { data: emailData, error: emailError } = await resend.emails.send({
        from: "ruben@labodadepinaybuendia.es",
        // to: ["javi.buendia93@gmail.com", "pinacanicio@gmail.com"],
        to: ["saroxdofus20@gmail.com", "rubi_jm11@hotmail.com"],
        subject:
            "Documento excel con las confirmaciones para la boda de Ana y Javi",
        text: "Espero que os sirva mucho mucho ❤️",
        attachments: [
            {
                filename: "confirmaciones.xlsx",
                content: Buffer.from(xlsBuffer),
            },
        ],
    });

    const response = {
        message: emailError && !emailData ? 'Ha ocurrido un error al enviar el email' : 'Email enviado con éxito',
        status: emailError && !emailData ? 400 : 200
    }


    return new Response(JSON.stringify(response))
}