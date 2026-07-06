import { getBmi, getBmiRange, errorHandling } from "./bmiService.js";

export function initBMIController() {
	const form = document.querySelector("form");
	const resultContainer = document.getElementById("resultado");
	const errorContainer = document.getElementById("error-box");
	const inputs = {
		weight: document.getElementById("weight"),
		height: document.getElementById("height"),
	};

	if (
		!form ||
		!resultContainer ||
		!errorContainer ||
		!inputs["weight"] ||
		!inputs["height"]
	) {
		console.error(
			"One of the key DOM components for the BMI results are missing.",
		);
		return;
	}

	form.addEventListener("submit", function (event) {
		event.preventDefault();

		resetStyles(errorContainer, resultContainer, inputs["weight"], inputs["height"]);

		const weight = parseFloat(inputs["weight"].value);
		const height = parseFloat(inputs["height"].value) / 100; //? in meters

		const [isInvalid, errorMessage, errorInput] = errorHandling(weight, height);

		if (isInvalid) {
			showErrorToClient(errorContainer, inputs[errorInput], errorMessage);
			return;
		}

		const bmi = getBmi(weight, height);
		const range = getBmiRange(bmi);

		resultContainer.innerHTML = `
                <p>Seu bmi é: <strong>${bmi.toFixed(2)}</strong></p>
                <p>Classificação: <strong>${range}</strong></p>
        `;
	});
}

function showErrorToClient(container, input, errorMessage) {
	container.classList.remove("calculator__error-box--hidden");
	container.innerHTML = `<p class="calculator__error-text">${errorMessage}</p>`;
	if (input) {
		input.classList.add("calculator__number-input--error");
	}
}

function resetStyles(container, result, wInput, hInput) {
	container.classList.add("calculator__error-box--hidden");
	result.innerHTML = "";
	wInput.classList.remove("calculator__number-input--error");
	hInput.classList.remove("calculator__number-input--error");
}
