export const inputsDOM = {
	submit: `<button type="submit" class="calculator__submit">
							Calcular
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
	// TODO: SWITCH TO RADIO BUTTON
	sex: `<div class="calculator__input-box">
			<select id="sex" name="sex" class="calculator__number-input" required>
				<option value="feminine" selected>Feminino</option>
				<option value="masculine">Masculino</option>
			</select>
		</div>
	`,
	neck: `<div class="calculator__input-box">
			<label for="neck" class="calculator__label">Pescoço (cm):</label>
			<input
				type="number"
				class="calculator__number-input"
				id="neck"
				name="neck"
				min="10"
				step="0.1"
				max="60"
				required
			/>
		</div>
	`,
	waist: `<div class="calculator__input-box">
			<label for="waist" class="calculator__label">Cintura (cm):</label>
			<input
				type="number"
				class="calculator__number-input"
				id="waist"
				name="waist"
				min="20"
				step="0.1"
				max="200"
				required
			/>
		</div>
	`,
	hip: `<div class="calculator__input-box">
			<label for="hip" class="calculator__label">Quadril (cm):</label>
			<input
				type="number"
				class="calculator__number-input"
				id="hip"
				name="hip"
				min="20"
				step="0.1"
				max="300"
				required
			/>
		</div>
	`,
};
