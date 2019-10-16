// PO Pablo Olguin Crea,Guarda e Imprime Historias Clínicas de Oncología

$(document).ready(function () {
	var REG_HC_9004 = [];
	iniciar_apertura_h9004();
});

function iniciar_apertura_h9004() {

	var llave = $_REG_HC.llave_hc,
		fecha_hc = $_REG_HC.fecha_hc,
		serv_hc = $_REG_HC.serv_hc,
		novedad_hc = $_REG_HC.novedad_hc,
		finalid_hc = $_REG_HC.finalid_hc;

	validarMedico_h9004();

	var data = datosEnvio() + llave +
		"|" + fecha_hc +
		"|" + serv_hc +
		"|" + novedad_hc +
		"|" + finalid_hc + "|";

	console.log(data)

	SolicitarDll({
			datosh: data
		},
		validar_historia_h9004,
		get_url("APP/HICLIN/HC9004.DLL")
	);
}

function validarMedico_h9004() {
	var atiende_prof = $_REG_PROF[0].atiende,
		esp_prof = $_REG_PROF.tabla_especialidad;
	if ((atiende_prof == 'A') && (["250", "140", "460", "461", "464", "462"].filter(arr => arr == esp_prof[0]))) {
		atiende_prof = "1";
		$_REG_HC.oper_elab_hc = atiende_prof;
	}
}

function validar_historia_h9004(data) {
	var admin = localStorage['Usuar'],
		nit = $_USUA_GLOBAL[0].NIT,
		res = data.split("|"),
		msj = '.',
		temporal = $_REG_HC.temporal_hc,
		estado = $_REG_HC.estado_hc,
		oper = $_REG_HC.oper_elab_hc;

	if (res[0] == "00") {
		if (res[1] == "S") {
			if (temporal = 1) msj = "No fue totalmente diligenciada";
			jAlert({
					titulo: "ATENCION! ",
					mensaje: "El paciente ya tiene historia clinica" + "<br>" +
						"abierta, con fecha " + res[3] + "<br>" + msj
				},
				function () {
					if (
						(admin = "GEBC" || temporal == "1") ||
						(estado == "1" && oper == admin) ||
						(nit == 800037021 && admin == "ADMI") ||
						(nit == 892000401 && admin == "ADMI")
					) {
						if (res[2] > 0 && res[2] <= 3) {
							$_REG_HC.sw_embar = "S";
						}
					} else {
						_salir_h9004();
					}
				}
			);
		}
		if (estado == 2) {
			CON851("70", "70", null, "error", "error");
			if (
				(admin !== "GEBC") ||
				(nit !== 800037021 && admin !== "ADMI") ||
				(nit !== 892000401 && admin !== "ADMI")
			) {
				_salir_h9004();
			}
		} else if (
			(admin !== "GEBC") ||
			(nit !== 800037021 && admin !== "ADMI") ||
			(nit !== 892000401 && admin !== "ADMI")
		) {
			CON851("81", "81", null, "error", "error");
			_salir_h9004();
		} else $_REG_HC.novedad_hc = 8;
	}
	buscar_comprobantes_h9004();
}

function buscar_comprobantes_h9004() {
	if ($_REG_HC.serv_hc == "02" || $_REG_HC.serv_hc == "08") {
		buscar_consulta_externa();
	}
}

function datos_hc_ant_h9004(){
	var data = datosEnvio() + llave +
		"|" + '**' +"|";
	//Medidas antropometricas

	//Antecedentes HC
	SolicitarDll({
		datosh: data
	},
	validar_historia_h9004,
	get_url("APP/HICLIN/HCDETAL-ANT.DLL")
);
	//Antecedentes cod: 9004
}

function _salir_h9004() {
	_cargarEventos("on");
	_toggleNav();
}