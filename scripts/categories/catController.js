import { CalculatorConfigs } from "../calculator/calcConfig.js";
import { getCatInfoPtBr } from "./catService.js";

export function initCatController() {
	const calcBox = document.querySelector(".link-box");
	const pageTitle = document.querySelector(".hero__title");
	const pageDesc = document.querySelector(".hero__subtitle");

	if (!calcBox || !pageTitle) {
		console.error("Javascript failed to find the link box or title.");
		return;
	}

	const urlParams = new URLSearchParams(window.location.search);
	const currentCat = urlParams.get("cat");

	const { name: catNamePtBr, description: catDescPtBr } =
		getCatInfoPtBr(currentCat);

	pageTitle.innerText =
		catNamePtBr === "Não encontrado"
			? catNamePtBr
			: `Calculadoras de ${catNamePtBr}`;

	if (pageDesc) {
		pageDesc.innerText = catDescPtBr;
	}

	changeNavActive(catNamePtBr);

	Object.entries(CalculatorConfigs).forEach(([key, calculator]) => {
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

	if (!headerLinks.length) {
		console.error("Couldn't find header links (navbar).");
		return;
	}

	headerLinks.forEach((linkDOM) => {
		if (linkDOM.innerText.trim() === cat) {
			linkDOM.classList.add("header__link--active");
			linkDOM.setAttribute("aria-current", "page");
		} else {
			linkDOM.classList.remove("header__link--active");
			linkDOM.removeAttribute("aria-current");
		}
	});
}
