export function getCatInfoPtBr(cat) {
	switch (cat) {
		case "health":
			return {
				name: "Saúde",
				description:
					"Calculadoras planejadas para calcular como seu corpo afeta sua saúde",
			};
		case "nutrition":
			return {
				name: "Nutrição",
				description:
					"Descubra como seus habitos alimentares podem melhorar seu bem-estar",
			};
		case "workout":
			return {
				name: "Exercício",
				description: "Obtenha informações sobre seu treino e outros exercícios",
			};
		default:
			return {
				name: "Não encontrado",
				description:
					"Sua busca não exibiu calculadoras. Volte para a tela inicial e escolha uma das opções disponíveis",
			};
	}
}
