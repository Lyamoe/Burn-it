import { CalculatorConfigs } from "../calculator/calcConfig.js";

export function initCatController() {
	const calcBox = document.querySelector(".link-box");
	const pageTitle = document.querySelector(".hero__title");
	const pageDesc = document.querySelector(".hero__subtitle");

	if (!calcBox || !pageTitle) {
		console.error(
			"Javascript failed to find the link box or title.",
		);
		return;
	}

	const urlParams = new URLSearchParams(window.location.search);
	const currentCat = urlParams.get("cat");

	changeNavActive(currentCat);

	const [catName, catDesc] = getCatInfoPtBt(currentCat);
	pageTitle.innerText = `Calculadoras de ${catName}`;
	pageDesc.innerText = catDesc;

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

	const catNamePtBr = getCatInfoPtBt(cat);

	headerLinks.forEach((linkDOM) => {
		if (linkDOM.innerText === catNamePtBr) {
			linkDOM.classList.add("header__link--active");
			linkDOM.setAttribute("aria-current", "page");
		} else {
			linkDOM.classList.remove("header__link--active");
			linkDOM.removeAttribute("aria-current");
		}
	});

	return catNamePtBr;
}

function getCatInfoPtBt(cat) {
	let catNamePtBr;
	let catDescPtBr;

	switch (cat) {
		case "health":
			catNamePtBr = "Saúde";
			catDescPtBr = "Calculadoras planejadas para calcular como seu corpo afeta sua saúde";
			break;
		case "nutrition":
			catNamePtBr = "Nutrição";
			catDescPtBr = "Descubra como seus habitos alimentares podem melhorar seu bem-estar";
			break;
		case "workout":
			catNamePtBr = "Exercício";
			catDescPtBr = "Obtenha informações sobre seu treino e outros exercícios";
			break;
		default:
			catNamePtBr = "Não encontrado"
			catDescPtBr = "Sua busca não exibiu calculadoras. Volte para a tela inicial e escolha uma das opções disponíveis"
			break;
	}

	return [catNamePtBr, catDescPtBr];
}
