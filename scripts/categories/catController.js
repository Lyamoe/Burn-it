import { CalculatorConfigs } from "../calculator/calcConfig.js";

export function initCatController() {
	const calcBox = document.querySelector(".link-box");

	if (!calcBox) {
		console.error(
			"Javascript failed to find the calculator links box.",
		);
		return;
	}

	const urlParams = new URLSearchParams(window.location.search);
	const currentCat = urlParams.get("cat");

	changeNavActive(currentCat);

	Object.entries(CalculatorConfigs).forEach(([key, calculator]) => {
		console.log(calculator.category + " and " + currentCat);
		if (calculator.category === currentCat) {
			calcBox.innerHTML += `
            <div class="link-box__item">
                <a
                    class="link-box__link"
                    href="./calculator.html?calc=${key}"
                >
                    <h2 class="link-box__title">${calculator.title}</h2>
                    <p class="link-box__text">
                        ${calculator.subtitle}
                    </p>
                </a>
            </div>
        `;
		}
	});
}

export function changeNavActive(cat) {
	const headerLinks = document.querySelectorAll(".header__link");

	if (!headerLinks) {
		console.error(
			"Couldn't find header links (navbar).",
		);
		return;
	}

	let catNamePtBr;

	switch (cat) {
		case "health":
			catNamePtBr = "Saúde";
			break;
		case "nutrition":
			catNamePtBr = "Nutrição";
			break;
		case "workout":
			catNamePtBr = "Exercício";
			break;
		default:
			break;
	}

	headerLinks.forEach((linkDOM) => {
		if (linkDOM.innerText === catNamePtBr) {
			linkDOM.classList.add("header__link--active");
			linkDOM.setAttribute("aria-current", "page");
		} else {
			linkDOM.classList.remove("header__link--active");
			linkDOM.removeAttribute("aria-current");
		}
	});
}
