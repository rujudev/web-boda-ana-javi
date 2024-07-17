import ExcelJS from 'exceljs';

const getMaxNameLength = (confirms) => {
    let maxLength = 0;

    confirms.forEach((confirm) => {
        const length = confirm.name?.length || 0; // Obtener la longitud del nombre, si existe
        if (length > maxLength) {
            maxLength = length; // Actualizar la longitud máxima
        }
    });

    return maxLength;
};

const getMaxAllergenLength = (confirms) => {
    let maxLength = 0;

    confirms.forEach((confirm) => {
        const allergens = confirm.allergens.split("\n"); // Dividir por "\n"
        allergens.forEach((allergen) => {
            const length = allergen.trim().length; // Obtener la longitud sin espacios
            if (length > maxLength) {
                maxLength = length; // Actualizar la longitud máxima
            }
        });
    });

    return maxLength;
};

export const createXlsx = async (confirms) => {
    let xlsBuffer = new Buffer.from('Un buffer vacío');

    try {
        const workhook = new ExcelJS.Workbook();
        const worksheet = workhook.addWorksheet('Confirmaciones', {
            pageSetup: { paperSize: 9, orientation: 'landscape' }
        })

        let rowIndex = 2;
        let rowHeader = worksheet.getRow(rowIndex - 1);
        rowHeader.values = ['Nombre', 'Alergias', 'Autobús', 'Opción vegana'];
        rowHeader.font = { bold: true };


        const namesMaxLength = getMaxNameLength(confirms);
        const allergensMaxLength = getMaxAllergenLength(confirms);

        const columnsWidths = [namesMaxLength - 7, allergensMaxLength, 9, 11];

        rowHeader.eachCell((cell, colNumber) => {
            const columnIndex = colNumber - 1;
            const columnWidth = columnsWidths[columnIndex];
            worksheet.getColumn(colNumber).width = columnWidth;
        })

        confirms?.forEach((confirm, index) => {
            const rowValue = worksheet.getRow(rowIndex + index);
            rowValue.getCell('A').value = confirm.name;
            rowValue.getCell('B').value = confirm.allergens;
            rowValue.getCell('C').value = confirm.with_bus;
            rowValue.getCell('D').value = confirm.with_vegan_menu;
        });

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                cell.border = {
                    top: {
                        style: "thin", // You can use 'thin', 'medium', 'thick', or other valid styles
                        color: { argb: "00000000" },
                    },
                    bottom: {
                        style: "thin", // You can use 'thin', 'medium', 'thick', or other valid styles
                        color: { argb: "00000000" },
                    }
                }
            })
        })

        xlsBuffer = await workhook.xlsx.writeBuffer();

    } catch (err) {
        console.log({ err })
    }

    return xlsBuffer;
}