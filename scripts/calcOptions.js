import { getBmi, getBmiRange, errorHandling } from "./calcService.js";
import { showErrorToClient } from "./calcController.js";

const form = document.querySelector("form");
const errorContainer = document.getElementById("error-box");

if (!errorContainer) {
	console.error(
		"There's no error-box.",
	);
}

const inputsDOM = {
	submit: `<button type="submit" class="calculator__submit">
							Calcular IMC
						</button>`,
	weight: `<div class="calculator__input-box">
				<label for="weight" class="calculator__label">Peso (kg):</label>
				<input
					type="number"
					id="weight"
					class="calculator__number-input"
					name="weight"
					min="20"
					step="0.1"
					max="400"
					required
				/>
			</div>
		`,
	height: `
			<div class="calculator__input-box">
				<label for="height" class="calculator__label">Altura (cm):</label>
				<input
					type="number"
					id="height"
					class="calculator__number-input"
					name="height"
					min="50"
					step="1"
					max="260"
					required
				/>
			</div>
        `,
};

export const calculatorConfigs = {
	bmi: {
		title: "Índice de Massa Corporal (IMC)",

		subtitle:
			"O cálculo do índice de massa corporal (IMC) é uma ferramenta simples e rápida para avaliar se uma pessoa está com o peso ideal em relação à sua altura.",

		inputs: inputsDOM.weight + inputsDOM.height + inputsDOM.submit,

		calculate: () => {
			const w = parseFloat(document.getElementById("weight").value);
			const h = parseFloat(document.getElementById("height").value) / 100;
			const [isInvalid, errorMessage, errorInput] = errorHandling(w, h);

			if (isInvalid) {
				const errorDOM = errorInput == "weight" ? document.getElementById("weight") : document.getElementById("height");
				showErrorToClient(errorContainer, errorDOM, errorMessage);
				return true;
			}

			const bmi = getBmi(w, h);
			const range = getBmiRange(bmi);

			return `<p>Seu bmi é: <strong>${bmi.toFixed(2)}</strong></p> <p>Classificação: <strong>${range}</strong></p>`;
		},
	},
};
