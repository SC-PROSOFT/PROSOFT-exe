$_REG_PROF = {}, $_REG_HC = {}, $_REG_PACI = {};
$_COMP = {
	suc: "",
	tipo: "",
	comprobante: ""
};
if (document.readyState != "loading") _iniciar_menu_his();


function _iniciar_menu_his() {
	document.querySelector("#busqpaci_his").value = 94475639;
	_inputControl("disabled");
	loader("show");

	_toggleF8([{
		input: "busqpaci",
		app: "his",
		funct: _ventanaPacientes
	}]);
	// VALIDA Archivos para creacion Historia
	var URL = get_url("APP/HICLIN/ARCHIVOS-HC.DLL");

	postData({
			datosh: datosEnvio() + localStorage["Usuario"].trim()
		}, URL)
		.then((data) => {
			var res = data.split("|");
			var idProfe = parseInt(res[1]);
			idProfe=espaciosIzq(idProfe, 10)
			obtenerDatosCompletos({
				nombreFd: "PROFESIONALES"
			}, function (array_profesionales) {
				$_REG_PROF.datos_prof = array_profesionales['ARCHPROF'].find(profesional => profesional.IDENTIFICACION == idProfe);
				$_REG_PROF.datos_prof.IDENTIFICACION = $_REG_PROF.datos_prof.IDENTIFICACION.trim().padStart(10, "0");
				if ($_REG_PROF.datos_prof!==-1) {
					$_REG_PROF.tabla_especialidad = new Array();
					$_REG_PROF.tabla_especialidad = $_REG_PROF.datos_prof.TAB_ESPEC
					$_REG_PROF.tabla_especialidad.pop();
					validarPaciente();
				} else {
					jAlert({
						titulo: "Error ",
						mensaje: "Personal que no atiende"
					}, () => {
						console.log('Personal que no atiende')
					});
				}
			})
			loader("hide");
		})
		.catch((error) => {
			console.log(error)
		});
}

function validarPaciente() {
	validarInputs({
			form: "#formConsult_his",
			orden: "1"
		},
		function () {
			CON850_P(e.id == "S" ? salir_modulo() : validarPaciente(), {
				msj: "03"
			});
		},
		function () {
			if (document.querySelector("#busqpaci_his").value.length > 0) {
				// Crea Historia Clinica
				var datos_envio = datosEnvio() + cerosIzq(document.querySelector("#busqpaci_his").value, 15) + "|" + localStorage["Usuario"] + "|";
				postData({
						datosh: datos_envio
					}, get_url("APP/HICLIN/HC000-1.DLL"))
					.then(data => {
						cargarDatosPaci(data);
					})
					.catch(error => {
						console.log(error)
					});
			} else {
				jAlert({
					titulo: "Error ",
					mensaje: "Debe ingresar una identificacion"
				}, validarPaciente);
			}
		}
	);
}

function cargarDatosPaci(data) {
	var res = data.split("|"),
		datos_envio = datosEnvio() + res[1] + "|";
	postData({
			datosh: datos_envio
		}, get_url("APP/SALUD/SER810-1.DLL"))
		.then((data) => {
			$_REG_PACI = data['REG-PACI'];
			validarOpcPacienteHc(res);
		})
		.catch((error) => {
			console.log(error)
		});
}

function validarOpcPacienteHc(res) {
	if (res[2].trim() == 1) {
		//Existe historia clinica anterior
		let datos_envio = datosEnvio() + res[1] + "|";
		postData({
				datosh: datos_envio
			}, get_url("APP/HICLIN/HC811.DLL"))
			.then((data) => {
				loader("hide");
				$_REG_HC.primera_hc = 2;
				montarHc811(data);
			})
			.catch((err) => {
				console.debug(err)
			});
	} else {
		//No existe historia clinica anterior
		$_REG_HC.primera_hc = 1;
		_consultHc(res[3].trim());
	}
}

function montarHc811(data) {
	var hc = data.HC,
		sw_open = 0,
		nuevahc;
	for (var i in hc) {
		if (hc[i].ESTADO == '1') {
			sw_open = 1;
		}
	}
	hc.pop();
	if (sw_open !== 1) {
		nuevahc = historiaNueva(hc);
		hc.push(nuevahc)
	}
	hc.reverse();
	_ventanaHistoriasPaciente(hc)

}

function _consultHc(llave) {
	$_REG_HC.llave_hc = llave;
	$_REG_HC.id_paciente = $_REG_HC.llave_hc.substr(0,15);
	var data = datosEnvio() + llave + "|";
	SolicitarDll({
			datosh: data
		},
		function (data) {
			var res = data.split("|");
			if (res[0] == "00") {
				_toggleNav();
				_mostrarDatosPaci(res);
			} else {
				plantillaError(res[0], res[1], res[2]);
			}
		},
		get_url("APP/HICLIN/HC000-2.DLL")

	);
}

function _mostrarDatosPaci(resp) {
	$_REG_HC.unser_hc = resp[1];
	$_REG_HC.eps_hc = resp[3];
	$_REG_HC.sexo_hc = resp[8];
	$_REG_HC.ocup_v8_hc = resp[9];
	$_REG_HC.temporal_hc = resp[11];
	$_REG_HC.estado_hc = resp[12];
	$_REG_HC.suc_folio_hc = resp[5];
	if (resp[6].trim().length > 0) $_REG_HC.nro_folio_hc = resp[6];
	else $_REG_HC.nro_folio_hc = '000001';
	var edad = calcular_edad(resp[13]);
	$_REG_HC.edad_hc = edad;

	$_REG_HC.finalid_hc = resp[14];
	$_REG_HC.serv_hc = resp[15];
	$_REG_HC.esquema_hc = resp[16].trim();
	$_REG_HC.novedad_hc = resp[17].trim();

	$("#doc_paci_his").val($_REG_PACI[0].cod_paci);
	$("#cod_ent_his").val(resp[1]);
	$("#descrip_ent_his").val(resp[2]);
	$("#cod_ent_his").val(resp[3]);
	$("#descrip_ent_his").val(resp[4]);
	$("#suc_paci_his").val(resp[5]);
	$("#fol_paci_his").val($_REG_HC.nro_folio_hc);
	$("#nom_paci_his").val(resp[7]);
	$("#sex_paci_his").val(resp[8]);
	$("#cod_ocu_his").val(resp[9]);
	$("#descrip_ocu_his").val(resp[10]);
	$("#edad_paci_his").val(edad.vlr_edad + " " + edad.unid_edad);

	var descrip_hc;

	if ($_REG_HC.temporal_hc == "1") {
		descrip_hc = "TEMPORAL";
	} else {
		switch ($_REG_HC.estado_hc) {
			case "0":
				descrip_hc = "NO HAY H.C. ";
				break;
			case "1":
				descrip_hc = "H.C. ABIERTA";
				break;
			case "2":
				descrip_hc = "H.C. CERRADA";
				break;
		}
	}

	// llamado al HC904A RECALCULAR CENSO HOSPITALARIO
	recalcularCenso_hosp(function () {
		$("#descrip_hc_his").val(descrip_hc);
		_toggleNav();
		$(".menuToggle").attr("style", "display: block;");
		$("#formConsult_his").attr("hidden", true);
		$(".footer").attr("hidden", true);
	}), $_REG_PROF.ATIENDE_PROF;
}

function historiaNueva(hc) {
	var date = new Date(),
		folio = parseInt(hc[hc.length - 1]["FOLIO-HC"].split("-")[1]);
	folio = cerosIzq(folio + 1, 6);
	var nueva = {
		"DETALLE": "1                   ",
		"DIAG-MUER-HC": "    ",
		"EGRESO-HC": "",
		"ESPECIALIDAD": "                                                                      ",
		"ESTADO": "0",
		"ESTADO-HC": "NO HAY H.C. ",
		"FACT-HC": " ",
		"FECHA-HC": date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
		"FECHA-ORD-SALIDA-HC": "00/00/0000",
		"FOLIO-HC": hc[hc.length - 1]["FOLIO-HC"].split("-")[0] + "-" + folio,
		"HAB-HC": "    ",
		"HORA-HC": date.getHours() + ":" + date.getMinutes(),
		"HORA-ORD-SALIDA-HC": "00:00",
		"ID-HC": $_REG_PACI[0].COD.trim(),
		"MED-HC": $_REG_PROF.IDENTIFICACION,
		"MOTIV-HC": "**ABRIR NUEVA HISTORIA**                            ",
		"NIT-FACT-HC": "0000000000",
		"NOM-SERV": "**NUEVA**",
		"OPER-CIE-HC": "",
		"OPER-ORD-SALIDA-HC": "    ",
		"SERV-HC": "00",
		"PESO": hc[hc.length - 1]["PESO"].trim(),
		"UND-PESO": hc[hc.length - 1]["UND-PESO"].trim(),
		"TALLA": hc[hc.length - 1]["TALLA"].trim(),
		"PER_CEF": hc[hc.length - 1]["PER_CEF"].trim(),
		"PER_TORA": hc[hc.length - 1]["PER_TORA"].trim(),
		"PER_ABDO": hc[hc.length - 1]["PER_ABDO"].trim(),
		"UNSERV-HC": "00"
	};
	return nueva;
}
//---- Funciones de busqueda (F8)
function _ventanaPacientes(e) {
	var $PACIENTES = [];
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		// obtenerDatosCompletos("PACIENTES", function (data) {
		// 	$PACIENTES = data.PACIENTES;
		// 	_ventanaDatos_lite_v2({
		// 		titulo: "VENTANA DE PACIENTES",
		// 		data: $PACIENTES,
		// 		indice: ["COD", "NOMBRE", "SEXO", "DERECHO"],
		// 		mascara: [{
		// 			"COD": 'IDENTIFICACION',
		// 			"NOMBRE": 'NOMBRE',
		// 			"ACOMPA�ANTE": "ACOMPAÑANTE"
		// 		}],
		// 		minLength: 3,
		// 		callback_esc: function () {
		// 			document.querySelector("#busqpaci_his").focus();
		// 		},
		// 		callback: function (data) {
		// 			document.querySelector("#busqpaci_his").value = data.COD;
		// 			document.querySelector("#busqpaci_his").focus();
		// 		}
		// 	})
		// });

		parametros = {
			valoresselect: ['Descripcion', 'Identificacion'],
			f8data: 'PACIENTES',
			columnas: [{
				title: 'COD'
			}, {
				title: 'NOMBRE'
			}, {
				title: 'EPS'
			}],
			callback: (data) => {
				document.querySelector("#busqpaci_his").value = data.COD;
				document.querySelector("#busqpaci_his").focus();
			},
			cancel: () => {
				document.querySelector("#busqpaci_his").focus()
			}
		};
		F8LITE(parametros);
	}
}

function _ventanaHistoriasPaciente(hc) {
	_ventanaDatos({
		titulo: $_REG_PACI[0].DESCRIP,
		columnas: [
			"FOLIO-HC",
			"NOM-SERV",
			"FECHA-HC",
			"HORA-HC",
			"MOTIV-HC",
			"ESTADO-HC"
		],
		data: hc,
		orden: false,
		callback_esc: function () {
			document.getElementById("busqpaci_his").focus();
		},
		callback: function (data) {
			var llave = cerosIzq($_REG_PACI[0].COD, 15) + data["FOLIO-HC"].split("-")[0] + data["FOLIO-HC"].split("-")[1];
			$_REG_HC.peso = data['PESO']
			$_REG_HC.talla = data['TALLA']
			$_REG_HC.per_cef = data['PER_CEF']
			$_REG_HC.per_tora = data['PER_TORA']
			$_REG_HC.per_abdo = data['PER_ABDO']
			_consultHc(llave);
		}
	})
}