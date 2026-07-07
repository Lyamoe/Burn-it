import { inputsDOM } from "./inputDOM.js";
import { getBmi, getBodyFat, numInputErrorHandling } from "./calcService.js";

/**
 * @typedef {Object} CalculationResult
 * @property {string} label - The main text result.
 * @property {string} [secondaryLabel] - Optional sub-text rating or classification.
 */

export const CalculatorConfigs = {
	bmi: {
		title: "Índice de Massa Corporal (IMC)",
		subtitle:
			"O cálculo do índice de massa corporal (IMC) é uma ferramenta simples e rápida para avaliar se uma pessoa está com o peso ideal em relação à sua altura.",

		inputs: () =>
			inputsDOM.number({ id: "weight", label: "Peso (kg)", step: "0.1" }) +
			inputsDOM.number({ id: "height", label: "Altura (cm)", step: "1" }) +
			inputsDOM.submit(),

		setupListeners: null,

		/**
		 * @param {Array} errCont
		 * @param {FormData} formData
		 * @param {Function} showErrorToClient
		 * @returns {CalculationResult|boolean}
		 */
		calculate: (errCont, formData, showErrorToClient) => {
			const schema = {
				weight: {
					value: parseFloat(formData.get("weight")),
					min: 20,
					max: 635,
					namePtBr: "peso",
				},
				height: {
					value: parseFloat(formData.get("height")) / 100,
					min: 0.55,
					max: 2.75,
					namePtBr: "altura",
				},
			};

			for (const [fieldId, rules] of Object.entries(schema)) {
				const [hasError, errorMessage] = numInputErrorHandling(
					rules.namePtBr,
					rules.value,
					rules.min,
					rules.max,
				);

				if (hasError) {
					const errorDOM = document.getElementById(fieldId);
					showErrorToClient(errCont, errorDOM, errorMessage);
					return true;
				}
			}

			const [bmi, range] = getBmi(schema.weight.value, schema.height.value);

			return [`Seu IMC é: ${bmi.toFixed(2)}`, `Classificação: ${range}`];
		},
	},

	bodyfat: {
		title: "Porcentagem de Gordura Corporal",
		subtitle: "Descubra a porcentagem de gordura em seu corpo.",

		inputs: () =>
			inputsDOM.radio({
				id: "sex",
				name: "sex",
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
				max: "100",
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

		setupListeners: (form) => {
			const sexRadios = form.querySelectorAll('input[name="sex"]');
			const hipContainer = form.querySelector("#box-hip");
			const hipInput = form.querySelector("#hip");

			if (!hipContainer || !hipInput) console.warn("Hip DOM wasn't found");

			const toggleHipVisibility = (sexValue) => {
				const isMasculine = sexValue === "masculine";
				console.log(
					"Toggling hip. Is masculine?",
					isMasculine,
					"Target container:",
					hipContainer,
				);

				hipContainer.classList.toggle(
					"calculator__input-box--hidden",
					isMasculine,
				);

				if (isMasculine) {
					hipInput.removeAttribute("required");
				} else {
					hipInput.setAttribute("required", "required");
				}
			};

			const checkedRadio = form.querySelector('input[name="sex"]:checked');
			if (checkedRadio) {
				toggleHipVisibility(checkedRadio.value);
			}

			sexRadios.forEach((radio) => {
				radio.addEventListener("change", (e) =>
					toggleHipVisibility(e.target.value),
				);
			});
		},

		/**
		 * @param {Array} errCont
		 * @param {FormData} formData
		 * @param {Function} showErrorToClient
		 * @returns {CalculationResult|boolean}
		 */
		calculate: (errCont, formData, showErrorToClient) => {
			const sex = formData.get("sex");
			const height = parseFloat(formData.get("height"));
			const neck = parseFloat(formData.get("neck"));
			const waist = parseFloat(formData.get("waist"));
			const rawHip = formData.get("hip");

			const hip = rawHip ? parseFloat(rawHip) : 0;

			const bodyFat = getBodyFat(sex, height, neck, waist, hip);

			return [`Sua Gordura Corporal é: ${bodyFat.toFixed(2)}%`];
		},
	},
};
