document.querySelector("form").addEventListener("submit", function (event) {
	event.preventDefault();

	const sexo = document.getElementById("sexo").value;
	const altura = parseFloat(document.getElementById("altura").value);
	const pescoco = parseFloat(document.getElementById("pescoco").value);
	const cintura = parseFloat(document.getElementById("cintura").value);
	const quadril = parseFloat(document.getElementById("quadril").value);

	let gorduraCorporal;

	if (sexo === "masculino") {
		gorduraCorporal =
			495 /
				(1.0324 -
					0.19077 * Math.log10(cintura - pescoco) +
					0.15456 * Math.log10(altura)) -
			450;
	} else {
		gorduraCorporal =
			495 /
				(1.29579 -
					0.35004 * Math.log10(cintura + quadril - pescoco) +
					0.221 * Math.log10(altura)) -
			450;
	}

	document.getElementById("resultado").textContent =
		"Gordura Corporal: " + gorduraCorporal.toFixed(2) + "%";
});
