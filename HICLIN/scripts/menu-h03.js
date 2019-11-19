$(document).ready(function () {
	loader("hide");
	_cargarEventos("off");
	_toggleNav();
	if ($_REG_HC.estado_hc == '2') {
		jAlert({
			titulo: "ATENCION! ",
			mensaje: "La historia a la que intenta ingresar se encuentra cerrada"
		}, function () {
			_cargarEventos("of");
			// _toggleNav();
			$("#body_main").load("../../HICLIN/paginas/menu_his.html");
		})
	}
	_confirmar_medico_h03();
});

function _confirmar_medico_h03() {
	var admin = localStorage["Usuario"];
	//------Pruebas----------
	$_REG_PROF.tabla_especialidad[0] = "490";
	$_REG_PROF.tabla_especialidad[1] = "491";
	//-------------------------
	if (admin != "GEBC" || admin != "0101") {
		var atiende = $_REG_PROF.datos_prof.ATIENDE_PROF;
		if (
			atiende == "1" ||
			atiende == "2" ||
			atiende == "3" ||
			atiende == "7" ||
			atiende == "8" ||
			atiende == "O" ||
			atiende == "6"
		) {
			confirmarNovedad_menu_h03();
		} else {
			if ($_USUA_GLOBAL[0].NIT == 900565371 && atiende == "4") {
				confirmarNovedad_menu_h03();
			} else {
				CON851("15", "15", null, "error", "error");
				_salir_menu_h03();
			}
		}
	}
}

function confirmarNovedad_menu_h03() {
	if ($_REG_HC.novedad_hc == "8") {
		if (
			localStorage["Usuario"] == "GEBC" ||
			$_REG_HC.temporal_hc == "1" ||
			($_USUA_GLOBAL[0].NIT == 800037021 &&
				localStorage["Usuario"] == "ADMI") ||
			($_USUA_GLOBAL[0].NIT == 892000401 && localStorage["Usuario"] == "ADMI")
		) {
			datoUnidad_h03();
		} else {
			_salir_menu_h03();
		}
	} else {
		$_REG_HC.fecha_hc = moment().format("YYYYMMDD");
		$_REG_HC.hora_hc = moment().format("hhmm");
		datoUnidad_h03();
	}
}

function datoUnidad_h03() {
	if ($_REG_PROF.datos_prof.ATIENDE_PROF == "3" || $_REG_PROF.datos_prof.ATIENDE_PROF == "6") {
		finValidarUnidad_h03("08");
	} else {
		on_datoUnidad_h03();
	}
}

function on_datoUnidad_h03() {
	_consultaSql({
		sql: "Select codigo_unid_serv, descrip_unid_serv from sc_unser where activar_serv='S'",
		bd: localStorage.Contab + "_13",
		callback: function (error, results, fields) {
			if (error) throw error;
			else {
				if (!results[0]) {
					plantillaError("99", "Unidad de servicio inexistente", "menu_h03");
				} else {
					POPUP({
							array: JSON.parse(JSON.stringify(results)),
							titulo: "UNIDADES DE SERVICIO",
							indices: [{
								id: "codigo_unid_serv",
								label: "descrip_unid_serv"
							}],
							callback_f: function () {
								plantillaToast(
									"",
									"No se pudo ingresar. Menu-h03",
									null,
									"error",
									"error"
								);
							}
						},
						validardatoUnidad_h03
					);
				}
			}
		}
	});
}

function validardatoUnidad_h03(unidad) {
	unidad.codigo_unid_serv = cerosIzq(unidad.codigo_unid_serv.toString(), 2);
	unidad = unidad.codigo_unid_serv;
	var sw = 0;
	var admin = localStorage["Usuario"];
	if (
		$_USUA_GLOBAL[0].NIT == 832002436 ||
		$_USUA_GLOBAL[0].NIT == 845000038 ||
		$_USUA_GLOBAL[0].NIT == 900005594 ||
		$_USUA_GLOBAL[0].NIT == 800037979 ||
		$_USUA_GLOBAL[0].NIT == 830511298 ||
		$_USUA_GLOBAL[0].NIT == 830515242 ||
		$_USUA_GLOBAL[0].NIT == 822001570
	) {
		if ($_COMP.tipo == "5") {
			if (unidad !== "02") {
				if (admin !== "GEBC" || admin !== "ADMI") {
					sw = 1;
					plantillaToast("", "B1", null, "error", "error");
				}
			}
		}
		if ($_COMP.tipo == "7") {
			if (unidad !== "08") {
				if (admin !== "GEBC" || admin !== "ADMI") {
					sw = 1;
					plantillaToast("", "B1", null, "error", "error");
				}
			} else if (unidad !== "88") {
				if (unidad !== "08") {
					sw = 1;
					plantillaToast("", "B1", null, "error", "error");
				}
			}
		}
	}
	if (sw == 0) {
		finValidarUnidad_h03(unidad);
	} else {
		datoUnidad_h03();
	}
}

function finValidarUnidad_h03(unidad) {
	var sw = 0;
	//Condiccion Hospital Fuente de Oro
	if (
		$_USUA_GLOBAL[0].NIT == 822001570 &&
		$_COMP.tipo == "5" &&
		unidad == "08"
	) {
		sw = 1;
		plantillaToast("", "B1", null, "error", "error");
	}

	if (sw == 1) {
		datoUnidad_h03();
	} else {
		$_REG_HC.serv_hc = unidad;
		setTimeout(datoFinalidad_h03, 300);
	}
}

function datoFinalidad_h03() {
	if ($_REG_HC.serv_hc == "08") {
		$_REG_HC.finalid_hc = "10";
		seleccionarPrograma_h03();
	} else {
		POPUP({
				array: datos_finalidad(
					$_USUA_GLOBAL[0].NIT,
					$_REG_HC.sexo_hc,
					$_REG_HC.edad_hc
				),
				titulo: "FINALIDAD",
				indices: [{
					id: "codigo",
					label: "descripcion"
				}],
				callback_f: function () {
					if ($_REG_PROF.datos_prof.ATIENDE_PROF == "3" || $_REG_PROF.datos_prof.ATIENDE_PROF == "6") {
						CON850_P(
							function (e) {
								if (e.id == "S") {
									plantillaToast(
										"",
										"No se pudo ingresar. Menu-h03",
										null,
										"error",
										"error"
									);
								} else {
									seleccionarPrograma_h03();
								}
							}, {
								msj: "Modificar item?"
							}
						);
					} else {
						plantillaToast(
							"",
							"No se pudo ingresar. Menu-h03",
							null,
							"error",
							"error"
						);
					}
				}
			},
			validarFinalidad
		);
	}
}

function validarFinalidad(data) {
	if (
		($_USUA_GLOBAL[0].NIT == 900005594 || $_USUA_GLOBAL[0].NIT == 800037979) &&
		(data.codigo == "10" || data.codigo == "11") &&
		$_REG_PROF.datos_prof.ATIENDE_PROF == "3"
	) {
		plantillaToast("", "15", null, "error", "error");
		datoFinalidad_h03();
	} else {
		$_REG_HC.finalid_hc = data.codigo;
		seleccionarPrograma_h03();
	}
}

function seleccionarPrograma_h03() {
	var edad = $_REG_HC.edad_hc,
		atiende_prof = $_REG_PROF.datos_prof.ATIENDE_PROF,
		esp_prof = $_REG_PROF.tabla_especialidad,
		serv = $_REG_HC.serv_hc,
		finalidad = $_REG_HC.finalid_hc,
		nit = $_USUA_GLOBAL[0].NIT,
		admin = localStorage["Usuar"],
		esquema = $_REG_HC.esquema_hc;

	if ($_REG_HC.novedad_hc == "7") {
		// validacion aiepi de 0 a 2 meses
		if (
			(edad.unid_edad == "D" ||
				(edad.unid_edad == "M" && edad.vlr_edad == "1")) &&
			(atiende_prof == "2" ||
				atiende_prof == "3" ||
				atiende_prof == "6" ||
				esp_prof[0] == "550")
		) {
			if (
				(serv == "08" && finalidad == "08") ||
				(serv == "11" || serv == "12" || serv == "13" || serv == "01") ||
				(nit == 900005594 && serv == "01")
			) {
				buscar_programa_h03("HC-01");
			} else {
				buscar_programa_h03("AIEPI002");
			}
			// validacion de 2 Meses a 5 Años
		} else if (
			(edad.unid_edad == "M" && edad.vlr_edad > 1) ||
			(edad.unid_edad == "A" &&
				edad.vlr_edad < 5 &&
				(atiende_prof == "2" ||
					atiende_prof == "3" ||
					atiende_prof == "6" ||
					esp_prof[0] == "550"))
		) {
			if (
				(serv == "08" && finalidad == "08") ||
				(serv == "11" || serv == "12" || serv == "13" || serv == "01") ||
				(nit == 900005594 && serv == "01")
			) {
				buscar_programa_h03("HC-01");
			} else {
				buscar_programa_h03("AIEPI001");
			}
			// otorrinolaringologia
		} else if (
			esp_prof[0] == "521" ||
			esp_prof[0] == "522" ||
			(esp_prof[1] == "521" || esp_prof[1] == "522")
		) {
			buscar_programa_h03("HC-12");
			// oftalmologia y optometria
		} else if (
			esp_prof[0] == "480" ||
			esp_prof[0] == "481" ||
			esp_prof[0] == "500" ||
			(esp_prof[1] == "480" || esp_prof[1] == "481" || esp_prof[1] == "500")
		) {
			buscar_programa_h03("HC-13");
			// oncologia oncooriente
		} else if (
			esp_prof[0] == "490" ||
			esp_prof[0] == "491" ||
			esp_prof[0] == "492" ||
			((esp_prof[1] == "490" || esp_prof[1] == "491" || esp_prof[1] == "492") &&
				(nit == 900264583))
			// &&(admin == "GEBC" || admin == "ADMI")
		) {
			buscar_programa_h03("HC-9004");
			// historia mamografia
		} else if (nit == 830092718 && esp_prof[0] == "602") {
			buscar_programa_h03("HC-14");
			// historia resumida para albergue de sucurame
		} else if (nit == 900565371) {
			buscar_programa_h03("HC-02");
		} else if (serv == "08") {
			if (
				finalidad == "03" ||
				finalidad == "05" ||
				finalidad == "06" ||
				finalidad == "10" ||
				finalidad == "07"
			) {
				//finalidades que tengan formatos o apliquen para algun formato especial pyp
				var array_finalidad = seleccionPyp_h03(finalidad, $_REG_HC.sexo_hc);
				console.debug(array_finalidad);
				mostrar_historiaPYP(array_finalidad);
			} else {
				programa = "HC-01";
			}
		}
	} else {
		if (validar_servicio_finalidad_h03()) {
			switch (esquema) {
				case "AI02":
					programa = "AIEPI002";
					break;
				case "AI01":
					programa = "AIEPI001";
					break;
				case "HC12":
					programa = "HC-12";
					break;
				case "HC13":
					programa = "HC-13";
					break;
				case "HC14":
					programa = "HC-14";
					break;
				case "HC01":
					programa = "HC-01";
					break;
				case "HC02":
					programa = "HC-02";
					break;
				case "8001":
					programa = "HC-8001";
					break;
				case "8002":
					programa = "HC-8002";
					break;
				case "8031":
					programa = "HC-8031";
					break;
				case "8051":
					programa = "HC-8051";
					break;
				default:
					programa = "";
					break;
			}
		}
	}
}

function mostrar_historiaPYP(array) {
	POPUP({
			array: array,
			titulo: "SELECCION HISTORIA PYP",
			indices: [{
				id: "esquema",
				label: "descripcion"
			}]
		},
		_data_hcPYP_hc0003
	);
}

function seleccionPyp_h03(finalidad, sexo) {
	var array_pyp = new Array();
	if (sexo == "F") {
		if (["03", "05", "06", "07", "10"].filter(arr => arr == finalidad).length>0) {
			array_pyp.push({
				esquema: "8001",
				descripcion: "HISTORIA CLINICA DE CITOLOGIA TOMA Y CONTROL"
			}, {
				esquema: "8002",
				descripcion: "HISTORIA CLINICA DE CITOLOGIA BETHESDA       "
			});
		}
	}

	switch (finalidad) {
		case "03":
			array_pyp.push({
				esquema: "8031",
				descripcion: "HISTORIA CLINICA PLANIFICACION FAMILIAR"
			});
			break;
		case "05":
			array_pyp.push({
				esquema: "8031",
				descripcion: "HISTORIA CLINICA DEL JOVEN"
			});
			break;
		case "06":
		case "07":
		case "10":
			array_pyp.push({
				esquema: "HC01",
				descripcion: "HISTORIA CLINICA NORMAL"
			});
			break;
	}
	return array_pyp;
}

function _data_hcPYP_hc0003(data) {
	var esquema = data.esquema;
	if (esquema.length == 0) {
		setTimeout(_unidadesdeservicio_hc0003, 500);
	} else {
		switch (esquema) {
			case "8001":
				buscar_programa_h03("HC-8001");
				break;
			case "8002":
				buscar_programa_h03("HC-8002");
				break;
			case "8031":
				buscar_programa_h03("HC-8031");
				break;
			case "8051":
				buscar_programa_h03("HC-8051");
				break;
			default:
				buscar_programa_h03("HC-01");
				break;
		}
	}
}

function validar_servicio_finalidad_h03() {
	var esquema = $_REG_HC.esquema_hc,
		retorno = false,
		serv = $_REG_HC.serv_hc,
		finalidad = $_REG_HC.finalid_hc;

	if (esquema == "AI01" || esquema == "AI02") {
		if (
			["01", "02", "06", "07", "08"].filter(arr => arr == serv).length>0 &&
			!finalidad == 08
		) {
			retorno = true;
		}
	}

	if (["8001", "8002", "8031", "8051"].filter(arr => arr == esquema).length>0) {
		if (serv == 08 && ["3", "5", "6", "10"].filter(arr => arr == finalidad).length>0) {
			retorno = true;
		}
	}

	if (["HC12", "HC13", "HC14"].filter(arr => arr == esquema)) {
		if (serv !== 08 && ["3", "5", "6", "10"].filter(arr => arr == finalidad).length>0) {
			retorno = true;
		}
	}

	return retorno;
}

function buscar_programa_h03(programa) {
	if (programa) {
		console.log(programa);
		switch (programa) {
			case 'HC-9004':
				$("#body_main").load("../../HICLIN/paginas/hc9004.html");
				break;
			default:
				break;
		}

	} else {
		jAlert({
			titulo: "Error ",
			mensaje: "Programa ha abrir no definido"
		});
	}
}

function _salir_menu_h03() {
	_cargarEventos("on");
	_toggleNav();
}