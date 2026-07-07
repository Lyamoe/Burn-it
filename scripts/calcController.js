import { getBmi, getBmiRange, bmiErrorHandling } from "./calcService.js";
import { inputsDOM } from "./inputDOM.js";

/**
 * @typedef {Object} CalculatorConfig
 * @property {string} title - The main heading for the calculator page.
 * @property {string} subtitle - A short description explaining the calculator's purpose.
 * @property {string} inputs - The raw HTML string containing the specific form inputs.
 * @property {function(HTMLElement): (string|boolean)} calculate - Processes the calculation.
 * Takes an error container element. Returns an HTML result string on success,
 * or true if an error was handled and displayed.
 */
/** @type {Object<string, CalculatorConfig>} */
const CalculatorConfigs = {
	bmi: {
		title: "Índice de Massa Corporal (IMC)",

		subtitle:
			"O cálculo do índice de massa corporal (IMC) é uma ferramenta simples e rápida para avaliar se uma pessoa está com o peso ideal em relação à sua altura.",

		inputs: inputsDOM.weight + inputsDOM.height + inputsDOM.submit,

		calculate: (errCont) => {
			const wInput = document.getElementById("weight");
			const hInput = document.getElementById("height");

			const w = parseFloat(wInput.value);
			const h = parseFloat(hInput.value) / 100;

			const [isInvalid, errorMessage, errorField] = bmiErrorHandling(w, h);

			if (isInvalid) {
				const errorDOM = errorField == "weight" ? wInput : hInput;
				showErrorToClient(errCont, errorDOM, errorMessage);
				return true;
			}

			const bmi = getBmi(w, h);
			const range = getBmiRange(bmi);

			return `<p>Seu imc é: <strong>${bmi.toFixed(2)}</strong></p> <p>Classificação: <strong>${range}</strong></p>`;
		},
	},
	bodyfat: {
		title: "Porcentagem de Gordura Corporal",

		subtitle: "Descubra a porcentagem de gordura em seu corpo.", //TODO: Make it bigger

		inputs:
			inputsDOM.sex +
			inputsDOM.height +
			inputsDOM.neck +
			inputsDOM.waist +
			inputsDOM.hip +
			inputsDOM.submit,

		calculate: (errCont) => {
			const sex = document.getElementById("sex").value;
			const height = parseFloat(document.getElementById("height").value);
			const neck = parseFloat(document.getElementById("neck").value);
			const waist = parseFloat(document.getElementById("waist").value);
			const hip = parseFloat(document.getElementById("hip").value);

			// TODO: Call this somewhere else
			// 	document.getElementById("sexo").addEventListener("change", function () {
			//     const quadrilInput = document.getElementById("quadril");
			//     const quadrilLabel = document.querySelector('label[for="quadril"]');

			//     if (this.value === "masculine") {
			//         quadrilInput.style.display = "none";
			//         quadrilLabel.style.display = "none";
			//     } else {
			//         quadrilInput.style.display = "block";
			//         quadrilLabel.style.display = "block";
			//     }
			// });

			// TODO: Move logic to service and create errorHandling
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

			return "Gordura Corporal: " + gorduraCorporal.toFixed(2) + "%";
		},
	},
};

export function initCalcController() {
	const form = document.querySelector(".calculator__form");
	const resultContainer = document.getElementById("resultado");
	const errorContainer = document.getElementById("error-box");
	const pageTitle = document.getElementById("content-intro__title");
	const pageDesc = document.getElementById("content-intro__text");

	if (!form || !resultContainer || !errorContainer) {
		console.error(
			"One of the key DOM components for the BMI results are missing.",
		);
		return;
	}

	const urlParams = new URLSearchParams(window.location.search);
	const currentCalc = urlParams.get("calc");
	const activeConfig = CalculatorConfigs[currentCalc];

	if (activeConfig) {
		pageTitle.innerText = activeConfig.title;
		pageDesc.innerText = activeConfig.subtitle;
		form.innerHTML = activeConfig.inputs;
	} else {
		pageTitle.innerText = "Erro na calculadora selecionada";
		// TODO: Throw 404 page
	}

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		resetStyles(errorContainer, resultContainer, this);

		if (activeConfig) {
			const result = activeConfig.calculate(errorContainer);

			if (result !== true) {
				//? True means it has shown a error to the user
				resultContainer.innerHTML = result;
			}
		}
	});
}

export function showErrorToClient(container, input, errorMessage) {
	container.classList.remove("calculator__error-box--hidden");
	container.innerHTML = `<p class="calculator__error-text">${errorMessage}</p>`;
	if (input) {
		input.classList.add("calculator__number-input--error");
	}
}

function resetStyles(container, result, form) {
	container.classList.add("calculator__error-box--hidden");
	result.innerHTML = "";

	const inputs = form.querySelectorAll(".calculator__number-input");

	inputs.forEach((input) => {
		input.classList.remove("calculator__number-input--error");
	});
}
