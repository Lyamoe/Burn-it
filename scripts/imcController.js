import { calcularIMC, obterFaixaIMC } from './imcService.js';

export function initIMCController() {
    const form = document.querySelector("form");
    const resultadoContainer = document.getElementById("resultado");

    if (!form || !resultadoContainer) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Captura e conversão de dados da UI
        const peso = parseFloat(document.getElementById("peso").value);
        const alturaEmMetros = parseFloat(document.getElementById("altura").value) / 100;

        // Execução da lógica de negócio isolada
        const imc = calcularIMC(peso, alturaEmMetros);
        
        if (!imc) {
            resultadoContainer.innerHTML = `<p class="error">Dados inválidos inseridos.</p>`;
            return;
        }

        const faixa = obterFaixaIMC(imc);

        // Renderização limpa (HTML final com a classe dinâmica de cor no resultado)
        resultadoContainer.innerHTML = `
            <div class="result-box ${faixa.classeColor}">
                <p>Seu IMC é: <strong>${imc.toFixed(2)}</strong></p>
                <p>Classificação: <strong>${faixa.label}</strong></p>
            </div>
        `;
    });
}