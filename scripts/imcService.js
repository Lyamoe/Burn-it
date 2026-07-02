/**
 * Calcula o IMC bruto baseado no peso e altura (em metros).
 * Formula: $IMC = \frac{peso}{altura^2}$
 */
export function calcularIMC(peso, alturaEmMetros) {
    if (!peso || !alturaEmMetros || alturaEmMetros <= 0) return null;
    return peso / (alturaEmMetros * alturaEmMetros);
}

/**
 * Retorna os metadados da faixa do IMC para feedback visual na UI.
 */
export function obterFaixaIMC(imc) {
    if (imc < 18.5) {
        return { label: "Abaixo do peso", classeColor: "imc-alert" };
    } else if (imc < 25) {
        return { label: "Peso normal", classeColor: "imc-success" };
    } else if (imc < 30) {
        return { label: "Sobrepeso", classeColor: "imc-warning" };
    } else {
        return { label: "Obesidade", classeColor: "imc-danger" };
    }
}