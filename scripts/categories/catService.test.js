import { getCatInfoPtBr } from "./catService";

describe("Categories Functions", () => {
	// ========================================
	// TITLE AND SUBTITLE TESTS
	// ========================================
	describe("getCatInfoPtBr", () => {
		// ---------- HAPPY PATHS ----------
		test.each([
			["health", { name: "Saúde", descSubstring: "saúde" }],
			["nutrition", { name: "Nutrição", descSubstring: "aliment" }],
			["workout", { name: "Exercício", descSubstring: "exercício" }],
		])("should return correct info for category '%s'", (cat, expected) => {
			const result = getCatInfoPtBr(cat);

			expect(result.name).toBe(expected.name);
			expect(result.description).toContain(expected.descSubstring);
		});

		// ---------- FALLBACK PATHS ----------
		test.each(["banana", "maçã", "", null, undefined])(
			"should return fallback data when category is '%s'",
			(invalidCat) => {
				const result = getCatInfoPtBr(invalidCat);

				expect(result).toEqual({
					name: "Não encontrado",
					description: expect.stringContaining(
						"Sua busca não exibiu calculadoras",
					),
				});
			},
		);
	});
});
