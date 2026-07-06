import { calculatorConfigs } from "./calcOptions.js";

export function initCalcController() {
	const form = document.querySelector("form");
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

	const currentCalc = window.location.search.replace("?", "");
	const activeConfig = calculatorConfigs[currentCalc];

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

		resetStyles(errorContainer, resultContainer);

		if (activeConfig) {
			const result = activeConfig.calculate();

			if (result !== true) {
				//? True means it has shown a error to the user
				resultContainer.innerHTML = result;
				this.reset();
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

function resetStyles(container, result) {
	container.classList.add("calculator__error-box--hidden");
	result.innerHTML = "";

	const inputs = document.querySelectorAll(".calculator__number-input");

	inputs.forEach((input) => {
		input.classList.remove("calculator__number-input--error");
	});
}
