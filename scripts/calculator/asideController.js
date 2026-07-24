import { CalculatorContent } from "./calcTextContent.js";

export function initAsideController() {
	const asideBox = document.querySelector(".related-info");

	// TODO: move this block to calcService and import it here and in calcController
	const urlParams = new URLSearchParams(window.location.search);
	const currentCalc = urlParams.get("calc");
	const activeConfig = CalculatorContent[currentCalc];

	let count = 0;
	for (const [key, calculator] of Object.entries(CalculatorContent)) {
		if (count >= 3) break;

		if (
			calculator.category === activeConfig.category &&
			calculator !== activeConfig
		) {
			asideBox.innerHTML += `
                <a class="related-info__card" href="./calculator.html?calc=${key}">
                    <img
                        src="../assets/images/${key}-banner.jpg"
                        alt="${calculator.imageAlt}"
                        class="related-info__image"
                    />
                    <h3 class="related-info__card-title">
                        ${calculator.title}
                    </h3>
                    <p class="related-info__description">
                        ${calculator.subtitle}
                    </p>
                </a>
            `;
			count++;
		}
	}

	if (count === 0) {
		asideBox.innerHTML += `
            <p class="related-info__empty-text" href="./calculator.html?calc=${key}">
                Não há calculadoras relacionadas a esta.
            </p>
        `;
	}
}
