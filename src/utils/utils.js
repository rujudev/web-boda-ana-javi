import ExcelJS from "exceljs";
import confetti from "canvas-confetti";

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
	let xlsBuffer = new Buffer.from("Un buffer vacío");

	try {
		const workhook = new ExcelJS.Workbook();
		const worksheet = workhook.addWorksheet("Confirmaciones", {
			pageSetup: { paperSize: 9, orientation: "landscape" },
		});

		let rowIndex = 2;
		let rowHeader = worksheet.getRow(rowIndex - 1);
		rowHeader.values = ["Nombre", "Alergias", "Autobús", "Opción vegana"];
		rowHeader.font = { bold: true };

		const namesMaxLength = getMaxNameLength(confirms);
		const allergensMaxLength = getMaxAllergenLength(confirms);

		const columnsWidths = [namesMaxLength - 7, allergensMaxLength, 9, 11];

		rowHeader.eachCell((cell, colNumber) => {
			const columnIndex = colNumber - 1;
			const columnWidth = columnsWidths[columnIndex];
			worksheet.getColumn(colNumber).width = columnWidth;
		});

		confirms?.forEach((confirm, index) => {
			const rowValue = worksheet.getRow(rowIndex + index);
			rowValue.getCell("A").value = confirm.name;
			rowValue.getCell("B").value = confirm.allergens;
			rowValue.getCell("C").value = confirm.with_bus;
			rowValue.getCell("D").value = confirm.with_vegan_menu;
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
					},
				};
			});
		});

		xlsBuffer = await workhook.xlsx.writeBuffer();
	} catch (err) {
		console.log({ err });
	}

	return xlsBuffer;
};

export const getRemainingTime = (date) => {
	const now = new Date().getTime();
	const remainingTime = date.getTime() - now;
	const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
	);
	const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

	return { days, hours, minutes, seconds, remainingTime };
};

export const createConfetti = () => {
	const duration = 15 * 1000;
	const animationEnd = Date.now() + duration;
	const heart = confetti.shapeFromPath({
		path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
		matrix: [
			0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666,
			-5.533333333333333,
		],
	});
	const confettiDefaultConf = {
		startVelocity: 20,
		spread: 360,
		ticks: 60,
		scalar: 2,
		zIndex: 0,
		colors: [
			"#FF0000",
			"#FFC0CB",
			"#FF6F61",
			"#8A2BE2",
			"#FF91A4",
			"#FFD700",
			"#E6E6FA",
			"#800020",
		],
		shapes: [heart],
	};

	const randomInRange = (min, max) => {
		return Math.random() * (max - min) + min;
	};

	const generateConfettiRanges = () => {
		const windowInnerWidth = window.innerWidth;
		const xRandomRanges = [];
		const max = windowInnerWidth >= 480 ? 4 : 3;
		let j = 1;
		for (let i = 3; i > 0; i += j) {
			if (i === max) {
				j = -1;
			}

			xRandomRanges.push({
				min: Number.parseFloat(`0.${i}`),
				max: Number.parseFloat(`0.${i + 4}`),
			});

			if (i === 3 && j === -1) {
				break;
			}
		}

		console.log(xRandomRanges);
		return xRandomRanges;
	};

	const confettiRanges = generateConfettiRanges();

	const interval = setInterval(() => {
		const timeLeft = animationEnd - Date.now();

		if (timeLeft <= 0) {
			clearInterval(interval);
		}

		const particleCount = 15 * (timeLeft / duration);
		// since particles fall down, start a bit higher than random

		for (const { min, max } of confettiRanges) {
			confetti({
				...confettiDefaultConf,
				particleCount,
				origin: {
					x: randomInRange(min, max),
					y: Math.random() - min,
				},
			});
		}
	}, 250);
};
