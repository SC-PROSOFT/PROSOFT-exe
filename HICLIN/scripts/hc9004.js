// PO Pablo Olguin Crea,Guarda e Imprime Historias Clínicas de Oncología
$(document).ready(function () {
	iniciar_apertura_h9004();
});

function iniciar_apertura_h9004() {
	$_REG_HC.sw_embar = '';
	var llave = $_REG_HC.llave_hc,
		serv_hc = $_REG_HC.serv_hc,
		novedad_hc = $_REG_HC.novedad_hc,
		finalid_hc = $_REG_HC.finalid_hc,
		ciuda_paci = $_REG_PACI[0].ciudad_paci,
		edad_paci = $_REG_HC.edad_hc.vlr_edad + $_REG_HC.edad_hc.unid_edad,
		oper_hc = localStorage['Usuario'];

	validarMedico_h9004();

	var data = datosEnvio() + llave +
		"|" + 1 +
		"|" + oper_hc +
		"|" + serv_hc +
		"|" + novedad_hc +
		"|" + finalid_hc +
		"|" + ciuda_paci +
		"|" + edad_paci + "|"

	SolicitarDll({
			datosh: data
		},
		validar_historia_h9004,
		//Enviar 1 Abrir historia | 2 Grabar historia
		get_url("APP/HICLIN/HC9004.DLL")
	);
}

function validarMedico_h9004() {
	var atiende_prof = $_REG_PROF[0].atiende_prof,
		esp_prof = $_REG_PROF.tabla_especialidad;
	if ((atiende_prof == 'A') && (["250", "140", "460", "461", "464", "462"].filter(arr => arr == esp_prof[0])).length > 0) {
		atiende_prof = "1";
		$_REG_HC.oper_elab_hc = atiende_prof;
	}
}

function validar_historia_h9004(data) {
	var admin = localStorage['Usuario'],
		nit = $_USUA_GLOBAL[0].NIT,
		res = data.split("|"),
		temporal = $_REG_HC.temporal_hc,
		estado = $_REG_HC.estado_hc,
		oper = $_REG_HC.oper_elab_hc;

	if (res[0] == "00") {
		$_REG_HC["fecha"] = res[3].substring(0, 4) + "/" + res[3].substring(4, 6) + "/" + res[3].substring(6, 8);
		$_REG_HC["procedencia"] = res[4];
		$_REG_HC["sesion"] = res[5];

		if (res[1] == "S") {
			if (
				(admin = "GEBC" || temporal == "1") ||
				(estado == "1" && oper == admin) ||
				(nit == "800037021" && admin == "ADMI") ||
				(nit == "892000401" && admin == "ADMI")
			) {
				if (res[2] > 0 && res[2] <= 3) {
					$_REG_HC.sw_embar = "S";
				}
			} else {
				let msj = "No fue totalmente diligenciada"
				jAlert({
					titulo: "ATENCION! ",
					mensaje: "El paciente ya tiene historia clinica" + "<br>" +
						"abierta, con fecha " + $_REG_HC9004.fecha + "<br>" + msj
				}, _salir_h9004)

			}
		} else {
			if (estado == 2) {
				CON851("70", "70", null, "error", "error");
				if (
					(admin !== "GEBC") ||
					(nit !== "800037021" && admin !== "ADMI") ||
					(nit !== "892000401" && admin !== "ADMI")
				) {
					_salir_h9004();
				}
			} else if (
				(admin !== "GEBC") ||
				(nit !== "800037021" && admin !== "ADMI") ||
				(nit !== "892000401" && admin !== "ADMI")
			) {
				CON851("81", "81", null, "error", "error");
				_salir_h9004();
			} else $_REG_HC.novedad_hc = 8;
		}
	} else {
		plantillaError(res[0], res[1], res[2]);
	}
	buscar_comprobante_historia_h9004();

}

function buscar_comprobante_historia_h9004() {

	if ($_REG_HC.serv_hc == "02" || $_REG_HC.serv_hc == "08") {

		buscar_consulta_externa();
	}
	switch ($_REG_HC.primera_hc) {
		case 1:
			_on_formulario_h9004(false);
			break;
		case 2:
			// Antecedentes HC
			/*
			1001--Enfermedad actual,
			2002--Antec.familiares,
			2010--Antec.medicos,
			2020--Antec.quirurgicos,
			2035--Antec.toxico-alergicos,
			2040--Antec.traumaticos,
			4040--Antec.ginecoobstetricos,
			4005--Examen general,
			7501--Analisis-hc
			*/
			// consultar_detalles_historia('**', ['9009','9004'], $_REG_HC.llave_hc, callback);
			let folio = $_REG_HC.suc_folio_hc + cerosIzq((parseInt($_REG_HC.nro_folio_hc) - 1), 6)
			let detalles_hc = ["1001", "2002", "2010", "2020", "2035", "2040", "4040", "4005", "7501"];
			console.log(detalles_hc)
			console.log(folio)
			consultar_detalles_historia(folio, detalles_hc, $_REG_HC.llave_hc, _get_detalles_h9004);
			break;

		default:
			break;
	}
}


function _get_detalles_h9004(data) {
	console.log(data)
	if (data == "99") {
		_on_formulario_h9004(false);
	} else {
		_on_formulario_h9004(false);
		$_REG_HC.detales_hc = data['DETHC'];
	}

}

function _on_formulario_h9004(sw) {
	var datos_envio =
		datosEnvio() +
		$_REG_HC.llave_hc + '|' +
		localStorage['Usuario'] + '|'
	var datos_farmacos = [];

	SolicitarDll({
			datosh: datos_envio

		},
		function (data) {
			var res = data.split('|')

			if (res[0] == '00') {
				SolicitarDatos({}, function (datos_farma) {
					datos_farmacos = datos_farma;
				}, get_url("TEMP/" + res[3]))
			} else {
				plantillaError(res[0], res[1], res[2]);
			}
		}, get_url("APP/SALUD/SER809.DLL"));
	console.log('3ntro');
	var f = new Date();
	//Precarga campos formulario
	$('#ano_hc_9004').val($_REG_HC.fecha_hc.substring(0, 4));
	$('#mes_hc_9004').val($_REG_HC.fecha_hc.substring(4, 6));
	$('#dia_hc_9004').val($_REG_HC.fecha_hc.substring(6, 8));
	$('#hora_hc_9004').val(f.getHours());
	$('#min_hc_9004').val(f.getMinutes());
	$('#med_hc_9004').val($_REG_PROF[0].descrip_prof + ' reg.' + $_REG_PROF[0].reg_med_prof);
	$('#act_hc_9004').val($_REG_HC.novedad_hc);
	$('#unser_hc_9004').val($_REG_HC.serv_hc);
	$('#proced_hc_9004').val($_REG_HC.procedencia);
	$('#llave_hc_9004').val($_REG_HC.llave_hc);
	$('#sucursal_hc_9004').val($_REG_HC.suc_folio_hc);
	$('#folio_hc_9004').val($_REG_HC.nro_folio_hc);

	//sw==true hay historias anteriores sino es la primera historia
	if (sw) {

		let cod_dethc = '',
			detalles = $_REG_HC.detales_hc;

		//Cargar antecedentes historia
		for (var detalle in detalles) {
			cod_dethc = detalles[detalle]['COD-DETHC']
			switch (cod_dethc) {
				case "1001":
					$('#enfer_act_hc_9004').text(detalles[detalle]['DETALLE'].trim())
					break;
				case "2002":
					$('#ant_famil_hc_9004').text(detalles[detalle]['DETALLE'].trim())
					break;
				case "2010":
					$('#ant_medi_hc_9004').text(detalles[detalle]['DETALLE'].trim())
					break;
				case "2020":
					$('#ant_quiru_hc_9004').text(detalles[detalle]['DETALLE'].trim())
					break;
				case "2035":
					$('#ant_toxi_hc_9004').text(detalles[detalle]['DETALLE'].trim())
					break;
				case "2040":
					$('#ant_traum_hc_9004').text(detalles[detalle]['DETALLE'].trim())
					break;
				case "4040":
					$('#ant_ginec_hc_9004').text(detalles[detalle]['DETALLE'].trim())
					break;
				case "4005":
					$('#exagen_hc_9004').text(detalles[detalle]['DETALLE'].trim())
					break;
				case "7501":
					$('#analisis_hc_9004').text(detalles[detalle]['DETALLE'].trim())
					break;
				default:
					break;
			}
		}
		//Medidas antropometricas
		$('#peso_hc_9004').val($_REG_HC['peso']);
		$('#talla_hc_9004').val($_REG_HC['talla']);
		$('#per_cef_hc_9004').val($_REG_HC['per_cef']);
		$('#per_tora_hc_9004').val($_REG_HC['per_tora']);
		$('#per_abdo_hc_9004').val($_REG_HC['per_abdo']);
	}

}
$('#btn_grabar_9004').click(grabar_historia_9004);

function grabar_historia_9004() {
	var llave = $_REG_HC.llave_hc,
		serv_hc = $_REG_HC.serv_hc,
		novedad_hc = $_REG_HC.novedad_hc,
		finalid_hc = $_REG_HC.finalid_hc,
		ciuda_paci = $_REG_PACI[0].ciudad_paci,
		edad_paci = $_REG_HC.edad_hc.vlr_edad + $_REG_HC.edad_hc.unid_edad,
		oper_hc = localStorage['Usuario'],
		motiv_hc = $("#motiv_hc_9004").text(),
		peso_hc = $("#peso_hc_9004").val(),
		talla_hc = $("#talla_hc_9004").val(),
		imc_corp_hc = $("#imc_corp_hc_9004").val(),
		per_cef_hc = $("#per_cef_hc_9004").val(),
		per_abdo_hc = $("#per_abdo_hc_9004").val(),
		per_tora_hc = $("#per_tora_hc_9004").val(),
		sup_corp_hc = $("#sup_corp_hc_9004").val(),
		sw_embar = $_REG_HC.sw_embar,
		med_hc = $_REG_PROF[0].cod_prof,
		datos_9004 = "";
	var arr_9004 = $(".onco");
	$.each(arr_9004, function (i, val) {
		datos_9004 += val.value + "|";
	});
	datos_9004 = datos_9004.slice(0);


	var data_env = datosEnvio() + llave +
		"|" + 2 +
		"|" + oper_hc +
		"|" + serv_hc +
		"|" + novedad_hc +
		"|" + finalid_hc +
		"|" + ciuda_paci +
		"|" + edad_paci +
		"|" + motiv_hc +
		"|" + peso_hc +
		"|" + talla_hc +
		"|" + imc_corp_hc +
		"|" + per_cef_hc +
		"|" + per_abdo_hc +
		"|" + per_tora_hc +
		"|" + sup_corp_hc +
		"|" + sw_embar +
		"|" + med_hc +
		datos_9004 + "|";

	console.log(data_env)

	var datosphp = {
		llave: $_REG_HC["sesion"].trim(),
		detalles_envio: {
			enfer_act_hc: $("#enfer_act_hc_9004").val(),
			exagen_hc: $("#exagen_hc_9004").val(),
			ant_famil_hc: $("#ant_famil_hc_9004").val(),
			ant_medi_hc: $("#ant_medi_hc_9004").val(),
			ant_hemor_hc: $("#ant_hemor_hc_9004").val(),
			ant_quiru_hc: $("#ant_quiru_hc_9004").val(),
			ant_toxi_hc: $("#ant_toxi_hc_9004").val(),
			ant_traum_hc: $("#ant_traum_hc_9004").val(),
			ant_ginec_hc: $("#ant_ginec_hc_9004").val(),
			analisis_hc: $("#analisis_hc_9004").val(),
			observaciones_hc: $("#observaciones_hc_9004").val(),
		}
	}
	console.log(datosphp.detalles_envio)
	$.ajax({
		data: datosphp,
		type: 'POST',
		async: false,
		url: get_url('HICLIN/paginas/_datos_9004.php')
	}).done(function (data) {
		console.debug(data, 'TXT');
		var res = data.split('|');
		if (res[0].trim() == '00') {
			// SolicitarDll({
			// 		datosh: data_env
			// 	},
			// 	console.log(data),
			// 	//Enviar 1 Abrir historia | 2 Grabar historia
			// 	get_url("APP/HICLIN/HC9004.DLL")
			// );
			console.log("fine");
		} else {
			console.error(data);
			plantillaError(res[0], res[1], res[2]);
		}
	});
}


function _salir_h9004() {
	_cargarEventos("on");
	_toggleNav();
}