export const inputsDOM = {
	submit: `<button type="submit" class="calculator__submit">
							Calcular IMC
						</button>`,
	weight: `<div class="calculator__input-box">
				<label for="weight" class="calculator__label">Peso (kg):</label>
				<input
					type="number"
					id="weight"
					class="calculator__number-input"
					name="weight"
					step="0.1"
					required
				/>
			</div>
		`,
	height: `
			<div class="calculator__input-box">
				<label for="height" class="calculator__label">Altura (cm):</label>
				<input
					type="number"
					id="height"
					class="calculator__number-input"
					name="height"
					step="1"
					required
				/>
			</div>
        `,
};