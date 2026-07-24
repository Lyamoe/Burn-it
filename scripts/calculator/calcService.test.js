import {
	getBmi,
	getBmiRange,
	getBodyFat,
	numInputErrorHandling,
} from "./calcService";

describe("Calculator Functions", () => {
	// ========================================
	// BMI TESTS
	// ========================================
	describe("getBmi", () => {
		test("should return null if weight or height is missing or invalid", () => {
			expect(getBmi(null, 1.75)).toBeNull();
			expect(getBmi(70, null)).toBeNull();
			expect(getBmi(70, 0)).toBeNull();
			expect(getBmi(70, -1.5)).toBeNull();
		});

		test("should calculate BMI and return the value and range", () => {
			const [bmi, range] = getBmi(70, 1.75); // 70 / (1.75 * 1.75) = 22.857...
			expect(bmi).toBeCloseTo(22.86, 2);
			expect(range).toBe("Peso normal");
		});
	});

	describe("getBmiRange", () => {
		test('should return "Abaixo do peso" for BMI < 18.5', () => {
			expect(getBmiRange(18.4)).toBe("Abaixo do peso");
		});

		test('should return "Peso normal" for 18.5 <= BMI < 25', () => {
			expect(getBmiRange(18.5)).toBe("Peso normal");
			expect(getBmiRange(24.9)).toBe("Peso normal");
		});

		test('should return "Sobrepeso" for 25 <= BMI < 30', () => {
			expect(getBmiRange(25)).toBe("Sobrepeso");
			expect(getBmiRange(29.9)).toBe("Sobrepeso");
		});

		test('should return "Obesidade" for BMI >= 30', () => {
			expect(getBmiRange(30)).toBe("Obesidade");
			expect(getBmiRange(35)).toBe("Obesidade");
		});
	});

	// ========================================
	// BODY FAT TESTS
	// ========================================
	describe("getBodyFat", () => {
		test("should calculate body fat correctly for masculine sex", () => {
			// Sample data: height: 180, neck: 38, waist: 88, hip: 95 (hip ignored for males)
			const result = getBodyFat("masculine", 180, 38, 88, 95);
			expect(result).toBeCloseTo(18.4, 1);
		});

		test("should calculate body fat correctly for feminine sex", () => {
			// Sample data: height: 165, neck: 34, waist: 75, hip: 100
			const result = getBodyFat("feminine", 165, 34, 75, 100);
			expect(result).toBeCloseTo(28.9, 1);
		});
	});

	// ========================================
	// ERROR HANDLING TESTS
	// ========================================
	describe("numInputErrorHandling", () => {
		test("should return error if value is null, undefined, or NaN", () => {
			expect(numInputErrorHandling("Peso", null, 30, 300)).toEqual([
				true,
				'O campo "Peso" deve ser preenchido',
			]);
			expect(numInputErrorHandling("Peso", undefined, 30, 300)).toEqual([
				true,
				'O campo "Peso" deve ser preenchido',
			]);
			expect(numInputErrorHandling("Peso", NaN, 30, 300)).toEqual([
				true,
				'O campo "Peso" deve ser preenchido',
			]);
		});

		test("should return error if value is out of bounds (min/max)", () => {
			expect(numInputErrorHandling("Idade", 17, 18, 120)).toEqual([
				true,
				'O campo "Idade" deve conter um valor válido para adultos',
			]);
			expect(numInputErrorHandling("Idade", 121, 18, 120)).toEqual([
				true,
				'O campo "Idade" deve conter um valor válido para adultos',
			]);
		});

		test("should return no error if value is within bounds", () => {
			expect(numInputErrorHandling("Idade", 25, 18, 120)).toEqual([false, ""]);
			expect(numInputErrorHandling("Idade", 18, 18, 120)).toEqual([false, ""]);
			expect(numInputErrorHandling("Idade", 120, 18, 120)).toEqual([false, ""]);
		});
	});
});
