// * ========================================
// * CALCULATOR VALUES
// * ========================================

// * ---------- BMI ----------
export function getBmi(weight, heightInMeters) {
	if (!weight || !heightInMeters || heightInMeters <= 0) return null;

	const bmi = weight / (heightInMeters * heightInMeters);
	const bmirange = getBmiRange(bmi);
	return [bmi, bmirange];
}

export function getBmiRange(bmi) {
	if (bmi < 18.5) return "Abaixo do peso";
	if (bmi < 25) return "Peso normal";
	if (bmi < 30) return "Sobrepeso";
	return "Obesidade";
}

// * ---------- Body Fat ----------
export function getBodyFat(sex, height, neck, waist, hip) {
	let gorduraCorporal;
	if (sex === "masculine") {
		gorduraCorporal =
			495 /
				(1.0324 -
					0.19077 * Math.log10(waist - neck) +
					0.15456 * Math.log10(height)) -
			450;
	} else {
		gorduraCorporal =
			495 /
				(1.29579 -
					0.35004 * Math.log10(waist + hip - neck) +
					0.221 * Math.log10(height)) -
			450;
	}
	return gorduraCorporal;
}

// * ========================================
// * GENERIC FUNCTIONS
// * ========================================
export function numInputErrorHandling(fieldName, value, min, max) {
    if (value === null || value === undefined || Number.isNaN(value)) {
        return [true, `O campo "${fieldName}" deve ser preenchido`];
    }

    if (value < min || value > max) {
        return [
            true,
            `O campo "${fieldName}" deve conter um valor válido para adultos`,
        ];
    }

    return [false, ""];
}
