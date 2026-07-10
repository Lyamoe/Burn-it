import { changeNavActive } from "../categories/catController.js";
import { CalculatorConfigs } from "./calcConfig.js";

export function initCalcController() {
	const form = document.querySelector(".calculator__form");
	const resultContainer = document.querySelector(".calculator__results");
	const errorContainer = document.querySelector(".calculator__error-box");
	const pageTitle = document.querySelector(".content-intro__title");
	const pageDesc = document.querySelector(".content-intro__text");
	const bannerImageDiv = document.querySelector(".calculator-banner");
	const article = document.querySelector(".article");

	if (
		!form ||
		!resultContainer ||
		!errorContainer ||
		!pageTitle ||
		!pageDesc ||
		!bannerImageDiv ||
		!article
	) {
		console.error(
			"One of the key DOM components for the calculator results are missing.",
		);
		return;
	}

	const urlParams = new URLSearchParams(window.location.search);
	const currentCalc = urlParams.get("calc");
	const activeConfig = CalculatorConfigs[currentCalc];

	if (activeConfig) {
		pageTitle.innerText = activeConfig.title;
		pageDesc.innerText = activeConfig.desc;
		form.innerHTML = activeConfig.inputs();
		document.title = `${activeConfig.title} | Bunnit`;
		bannerImageDiv.innerHTML = `<img
				src="../assets/images/${currentCalc}-banner.jpg"
				alt="${activeConfig.imageAlt}"
				class="calculator-banner__image"
			/>`;
			changeNavActive(activeConfig.category);

		let articleText = `<h2 class="article__title">Sobre o Cálculo</h2>`;

		for (let i = 0; i < activeConfig.article.length; i++) {
			const block = activeConfig.article[i];
			articleText += `<section class="article__text-block">
        	    <h3 class="article__subtitle">${block.title}</h3>
        		<p class="article__parag">${block.text}</p>
    		</section>`;
		}

		article.innerHTML = articleText;

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
			const result = activeConfig.calculate(
				errorContainer,
				formData,
				showErrorToClient,
			);

			if (result !== true) {
				resultContainer.innerHTML = result
					.map((text) => `<p>${text}</p>`)
					.join("");

				this.reset();
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
