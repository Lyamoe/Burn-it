// inputDOM.js
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
		<div class="calculator__input-box" id="box-${id}">
			<span class="calculator__label">${label}:</span>
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
		</div>`
};