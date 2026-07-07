import { CalculatorConfigs } from "./calcConfig.js";

export function initCalcController() {
	const form = document.querySelector(".calculator__form");
	const resultContainer = document.querySelector(".calculator__results");
	const errorContainer = document.querySelector(".calculator__error-box");
	const pageTitle = document.querySelector(".content-intro__title");
	const pageDesc = document.querySelector(".content-intro__text");

	if (!form || !resultContainer || !errorContainer || !pageTitle || !pageDesc) {
		console.error("One of the key DOM components for the BMI results are missing.");
		return;
	}

	const urlParams = new URLSearchParams(window.location.search);
	const currentCalc = urlParams.get("calc");
	const activeConfig = CalculatorConfigs[currentCalc];

	if (activeConfig) {
		pageTitle.innerText = activeConfig.title;
		pageDesc.innerText = activeConfig.subtitle;
		form.innerHTML = activeConfig.inputs();

		if (typeof activeConfig.setupListeners === "function") {
			activeConfig.setupListeners(form);
		}
	} else {
		pageTitle.innerText = "Erro na calculadora selecionada";
	}

	form.addEventListener("submit", function (e) {
		e.preventDefault();
		const formData = new FormData(this);

		resetStyles(errorContainer, resultContainer, this);

		if (activeConfig) {
			// We pass showErrorToClient context so the config block can use it if needed
			const result = activeConfig.calculate(errorContainer, formData, showErrorToClient);

			if (result !== true) {
				resultContainer.innerHTML = result
					.map((text) => `<p>${text}</p>`)
					.join("");
			}
		}
	});
}

function showErrorToClient(container, input, errorMessage) {
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