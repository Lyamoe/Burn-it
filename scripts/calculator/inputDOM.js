// * Input templates that can be used on forms

export const inputsDOM = {
	submit: () => `
		<button type="submit" class="calculator__submit">
			Calcular
		</button>`,

	number: ({ id, label, min = "", max = "", step = "0.1" }) => `
		<div class="calculator__input-box" id="box-${id}">
			<label for="${id}" class="calculator__label">${label}:</label>
			<input
				type="number"
				id="${id}"
				class="calculator__text-input"
				name="${id}"
				min="${min}"
				max="${max}"
				step="${step}"
				required
			/>
		</div>`,

	radio: ({ id, label, options }) => `
		<fieldset class="calculator__input-box" id="box-${id}">
			<legend class="calculator__label">${label}:</legend>
			<div class="calculator__radio-group">
				${options.map((opt, index) => `
					<label class="calculator__radio-label">
						<input 
							type="radio" 
							class="calculator__radio-option"
							id="${id}-${opt.value}" 
							name="${id}" 
							value="${opt.value}" 
							${index === 0 ? "checked" : ""} 
							required
						/>
						${opt.label}
					</label>
				`).join("")}
			</div>
		</fieldset>`
};