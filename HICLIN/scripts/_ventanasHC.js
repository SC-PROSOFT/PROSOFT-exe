/*
17/01/2020 PO:Pablo Olguin-> Creacion _venatanasHC 
20/01/2020 PO:Pablo Olguin 
*/

function HC810(esccallback, callback) {
	_toggleF8([
		{ input: 'atendidos', app: 'HC810', funct: evaluarFNF_HC810 },
		{ input: 'paciente', app: 'HC810', funct: evaluarFNF_HC810 }
	]);
	let plantilla =
		'<div class="col-md-12">'
		+ '<div class="col-md-6 col-sm-6 col-xs-6"data-orden="1" id="atendidosHC810">'
		+ '<label class="col-md-12 col-xs-12 col-sm-12">Desea ver los ya atendidos?</label>'
		+ '<input class="form-control col-md-12 col-xs-12 col-sm-12" id="atendidos_HC810" max-lenght="1">'
		+ '</div>'
		+ '<div class="salto-linea"></div>'
		+ '<div class="col-md-6 col-sm-6 col-xs-6" id="fechaHC810">'
		+ '<label class="col-md-12 col-xs-12 col-sm-12">Buscar por fecha?</label>'
		+ '<input class="form-control col-md-12 col-xs-12 col-sm-12" id="fecha_HC810">'
		+ '</div>'
		+ '<div class="col-md-6 col-sm-6 col-xs-6" id="pacienteHC810">'
		+ '<label class="col-md-12 col-xs-12 col-sm-12">Buscar por Paciente?</label>'
		+ '<input class="form-control col-md-12 col-xs-12 col-sm-12" id="paciente_HC810">'
		+ '</div>'
		+ '</div>'
		;
	const ventana_HC810 = bootbox.dialog({
		message: plantilla,
		size: 'small',
		buttons: null
	})
	ventana_HC810.init(
		function validarAtendidosHC810() {
			var idhistoriafactMask = IMask($('#paciente_HC810')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
			var fechaDesdeMask = IMask($("#fecha_HC810")[0], {
				mask: Date,
				pattern: 'YYYY/MM/DD',
				lazy: true,
				blocks: {
					YYYY: {
						mask: IMask.MaskedRange,
						placeholderChar: 'y',
						from: 2000,
						to: 2030,
						maxLength: 4
					},
					MM: {
						mask: IMask.MaskedRange,
						placeholderChar: 'M',
						from: 01,
						to: 12,
						maxLength: 2,
					},
					DD: {
						mask: IMask.MaskedRange,
						placeholderChar: 'd',
						from: 01,
						to: 31,
						maxLength: 2,
					},
				},
				format: function (date) { return moment(date).format("YYYY/MM/DD"); },
				parse: function (str) { return str }
			});
			validarInputs({
				form: "#atendidos_HC810",
				orden: orden
			}, validarAtendidosHC810, () => {
				const atend = document.getElementById('atendidos_HC810').value.toString().toUppercase();
				if (atend == '') CON851('03', '03', validarAtendidosHC810(), 'error', 'error');
				else if (['N', 'S'].find(opc => opc == atend) != -1) {
					evaluarFNTriage(
						{
							tecla: null, caja: $('#atendidos_HC810'),
							cancel: validarAtendidosHC810,
							acept: onPacientesTriageHC810
						}
					);
				} else CON851('03', '03', validarAtendidosHC810(), 'error', 'error');
			})
		});
	ventana_HC810.on('shown.bs.modal', function () {
		$("#atendidos_HC810").focus();
	});
}

function evaluarFNF_HC810(e) {
	// FUNCIONES FN-F8 BUSCAR EN TRIAGE POR PACIENTE
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		parametros = {
			dll: 'PACIENTES',
			valoresselect: ['Nombre del paciente', 'identificación'],
			f8data: 'PACIENTES',
			columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }, { title: 'EDAD' }],
			callback: data => { idhistoriafactMask.typedValue = data.COD; _enterInput('#paciente_HC810'); },
			cancel: () => { $('#paciente_HC810').focus(); }
		};
		F8LITE(parametros);
		// FUNCIONES FN-F2 BUSCAR EN TRIAGE POR FECHA
	} else if (e.type == "keydown" && e.which == 113 || e.type == 'click') {
		evaluarFNTriage(
			{
				tecla: 'F2', caja: $('#fecha_HC810'),
				cancel: validarAtendidosHC810,
				acept: onPacientesTriageHC810
			})
	}
	// FUNCIONES FN-F9 IMPRIMIR DE TRIAGE DESDE | HASTA
	else if (e.type == "keydown" && e.which == 120 || e.type == 'click') {
		evaluarFNTriage(
			{
				tecla: 'F9', caja: null,
				cancel: validarAtendidosHC810,
				acept: onPacientesTriageHC810
			})
	}
}
