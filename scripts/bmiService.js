export function getBmi(peso, alturaEmMetros) {
    if (!peso || !alturaEmMetros || alturaEmMetros <= 0) return null;
    return peso / (alturaEmMetros * alturaEmMetros);
}

export function getBmiRange(bmi) {
    if (bmi < 18.5) {
        return "Abaixo do peso";
    } else if (bmi < 25) {
        return "Peso normal";
    } else if (bmi < 30) {
        return "Sobrepeso";
    } else {
        return "Obesidade";
    }
}

export function errorHandling(weight, height) {
	if (!weight || Number.isNaN(weight)) {
		return [true, "O peso deve ser preenchido", "weight"];
	}

	if (weight <= 20 || weight >= 635) {
		// actual weight of the heaviest adult
		return [
			true,
			"O peso deve conter um valor real para humanos adultos",
			"weight",
		];
	}

	if (!height || Number.isNaN(height)) {
		return [true, "A altura deve ser preenchida", "height"];
	}

	if (height <= 0.54 || height >= 2.72) {
		// actual height of the tallest and smallest adult (in m)
		return [
			true,
			"A altura deve conter um valor real para humanos adultos",
			"height",
		];
	}

	return [false, "", ""];
}