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

		inputs: () =>
			inputsDOM.number({ id: "weight", label: "Peso (kg)", step: "0.1" }) +
			inputsDOM.number({ id: "height", label: "Altura (cm)", step: "1" }) +
			inputsDOM.submit(),

		calculate: (errCont, formData) => {
			const w = parseFloat(formData.get("weight"));
			const h = parseFloat(formData.get("height")) / 100;

			const [isInvalid, errorMessage, errorField] = bmiErrorHandling(w, h);

			if (isInvalid) {
				const errorDOM = document.getElementById(errorField);
				showErrorToClient(errCont, errorDOM, errorMessage);
				return true;
			}

			const bmi = getBmi(w, h);
			const range = getBmiRange(bmi);

			return [`Seu imc é: ${bmi.toFixed(2)}`, `Classificação: ${range}`];
		},
	},
	bodyfat: {
		title: "Porcentagem de Gordura Corporal",

		subtitle: "Descubra a porcentagem de gordura em seu corpo.", //TODO: Make it bigger

		inputs: () =>
			inputsDOM.radio({
				id: "sex",
				label: "Sexo",
				options: [
					{ value: "feminine", label: "Feminino" },
					{ value: "masculine", label: "Masculino" },
				],
			}) +
			inputsDOM.number({ id: "height", label: "Altura (cm)", step: "1" }) +
			inputsDOM.number({
				id: "neck",
				label: "Pescoço (cm)",
				min: "10",
				max: "60",
			}) +
			inputsDOM.number({
				id: "waist",
				label: "Cintura (cm)",
				min: "20",
				max: "200",
			}) +
			inputsDOM.number({
				id: "hip",
				label: "Quadril (cm)",
				min: "20",
				max: "300",
			}) +
			inputsDOM.submit(),

		calculate: (errCont, formData) => {
			const sex = formData.get("sex");
			const height = parseFloat(formData.get("height"));
			const neck = parseFloat(formData.get("neck"));
			const waist = parseFloat(formData.get("waist"));
			const hip = formData.get("hip") ? parseFloat(formData.get("hip")) : 0;

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

			return [`Sua Gordura Corporal é: ${gorduraCorporal.toFixed(2)}%`];
		},
	},
};

export function initCalcController() {
	const form = document.querySelector(".calculator__form");
	const resultContainer = document.querySelector(".calculator__results");
	const errorContainer = document.querySelector(".calculator__error-box");
	const pageTitle = document.querySelector(".content-intro__title");
	const pageDesc = document.querySelector(".content-intro__text");

	if (!form || !resultContainer || !errorContainer || !pageTitle || !pageDesc) {
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

		form.innerHTML = activeConfig.inputs();
	} else {
		pageTitle.innerText = "Erro na calculadora selecionada";
		// TODO: Throw 404 page
	}

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		const formData = new FormData(this);

		resetStyles(errorContainer, resultContainer, this);

		if (activeConfig) {
			const result = activeConfig.calculate(errorContainer, formData);

			if (result !== true) {
				//? True means it has shown an error to the user

				resultContainer.innerHTML = result
					.map((text) => `<p>${text}</p>`)
					.join("");
			}
		}
	});
}

function showErrorToClient(container, input, errorMessage) {
	// TODO: Different classes based on the input type
	container.classList.remove("calculator__error-box--hidden");
	container.innerHTML = `<p class="calculator__error-text">${errorMessage}</p>`;
	if (input) {
		input.classList.add("calculator__text-input--error");
	}
}

function resetStyles(container, result, form) {
	container.classList.add("calculator__error-box--hidden");
	result.innerHTML = "";

	const inputs = form.querySelectorAll("input, select");

	inputs.forEach((input) => {
		input.classList.remove("calculator__text-input--error");
		input.classList.remove("calculator__radio-input--error");
	});
}
