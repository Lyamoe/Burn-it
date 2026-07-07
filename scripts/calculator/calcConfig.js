import { inputsDOM } from "./inputDOM.js";
import { getBmi, getBmiRange, bmiErrorHandling } from "./calcService.js";

export const CalculatorConfigs = {
	bmi: {
		title: "Índice de Massa Corporal (IMC)",
		subtitle: "O cálculo do índice de massa corporal (IMC) é uma ferramenta simples e rápida para avaliar se uma pessoa está com o peso ideal em relação à sua altura.",
		inputs: () =>
			inputsDOM.number({ id: "weight", label: "Peso (kg)", step: "0.1" }) +
			inputsDOM.number({ id: "height", label: "Altura (cm)", step: "1" }) +
			inputsDOM.submit(),
		calculate: (errCont, formData, showErrorToClient) => {
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
		setupListeners: null
	},
	bodyfat: {
		title: "Porcentagem de Gordura Corporal",
		subtitle: "Descubra a porcentagem de gordura em seu corpo.",
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
			inputsDOM.number({ id: "neck", label: "Pescoço (cm)", min: "10", max: "60" }) +
			inputsDOM.number({ id: "waist", label: "Cintura (cm)", min: "20", max: "200" }) +
			inputsDOM.number({ id: "hip", label: "Quadril (cm)", min: "20", max: "300" }) +
			inputsDOM.submit(),
		setupListeners: (form) => {
			const sexRadios = form.querySelectorAll('input[name="sex"]');
			const hipContainer = form.querySelector("#box-hip");
			const hipInput = form.querySelector("#hip");

			function toggleHipVisibility(sexValue) {
				if (sexValue === "masculine") {
					hipContainer.style.display = "none";
					hipInput.removeAttribute("required");
				} else {
					hipContainer.style.display = "";
					hipInput.setAttribute("required", "required");
				}
			}

			const checkedRadio = form.querySelector('input[name="sex"]:checked');
			if (checkedRadio) toggleHipVisibility(checkedRadio.value);

			sexRadios.forEach((radio) => {
				radio.addEventListener("change", (e) => toggleHipVisibility(e.target.value));
			});
		},
		calculate: (errCont, formData) => {
			const sex = formData.get("sex");
			const height = parseFloat(formData.get("height"));
			const neck = parseFloat(formData.get("neck"));
			const waist = parseFloat(formData.get("waist"));
			const hip = formData.get("hip") ? parseFloat(formData.get("hip")) : 0;

			// PRO TIP: You can move these formula equations to calcService.js later!
			let gorduraCorporal;
			if (sex === "masculine") {
				gorduraCorporal = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
			} else {
				gorduraCorporal = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
			}

			return [`Sua Gordura Corporal é: ${gorduraCorporal.toFixed(2)}%`];
		}
	}
};