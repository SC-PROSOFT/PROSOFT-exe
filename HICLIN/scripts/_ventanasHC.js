function HC810(esccallback, callback) {
	_toggleF8([{ input: 'atendidos', app: 'SER880', funct: evaluarFNF_HC810 }]);
	let plantilla =
		'<div class="col-md-12">'
		+ '<div class="col-md-4 col-sm-4 col-xs-4">'
		+ '<label class="col-md-12 col-xs-12 col-sm-12">Desea ver los ya atendidos?</label>'
		+ '<input class="form-control col-md-12 col-xs-12 col-sm-12" id="atendidos_SER880">'
		+ '</div>'
		+ '<div class="salto-linea"></div>'
		+ '</div>'
		;
	bootbox.dialog({
		message: plantilla,
		size: 'large',
		buttons: {
			confirm: {
				label: 'SI',
				className: 'btn-primary'
			},
			cancel: {
				label: 'NO',
				className: 'btn-danger'
			}
		},
		// callback: function (result) { result == true ? pAtendidos = 'S' : pAtendidos = 'N'; evaluarFNF_HC810(pAtendidos); }
	})
}

function evaluarFNF_HC810(e) {
	const plantilla = '<input id="atendidos_HC810" hidden>'
		// *BUSCA EN TRIAGE POR OTRA FECHA
		+ '<span>Presione <stong>F2</strong> Buscar por otra fecha</span>'
		+ '</br>'
		// *BUSCA EN TRIAGE POR PACIENTE
		+ '<span>Presione <stong>F8</strong> Buscar por Paciente</span>'
		+ '</br>'
		// *MUESTRA LOS MENSAJES POR PACIENTE
		+ '<span>Presione <stong>F9</strong> Buscar por Paciente</span>'
		+ '</br>'
		// *INGRESA A LA LISTA DE ESPERA
		+ '<span>Presione <stong>F10</strong> Buscar por Paciente</span>'
	bootbox.dialog({
		message: plantilla,
		size: 'small',
		closeButton: false,
		buttons: {
			confirm: {
				label: 'Aceptar',
				className: 'btn-primary'
			}
		},
		callback: function (result) { result == true ? pAtendidos = 'S' : pAtendidos = 'N'; evaluarCasoTriage(pAtendidos); },
		onShow: function () {
			_toggleF8([{ input: 'atendidos', app: 'HC810', funct: get_datosAtendidos_HC810 }]);
			$('#atendidos_HC810').focus()
		}
	})
}

function get_datosAtendidos_HC810(e) {
	if (e.type == "keydown") {
		switch (e.which) {
			case 113:
				bootbox.prompt({
					title: "Ingrese la fecha de atención a consultar",
					inputType: 'date',
					size: 'small',
					locale: 'custom',
					callback: function (result) {
						console.debug(result, 'fecha')
					}
				});
				break;

			default:
				break;
		}
	}
}