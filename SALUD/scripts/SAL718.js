/* NOMBRE RM --> SER102C // NOMBRE ELECTR --> SAL718 */
/* PO - PABLO OLGUIN 16/12/2019 -> AJUSTES*/
/* PO - PABLO OLGUIN 17/12/2019 -> Rediseño formulario, reestructuracion codigo*/
var SAL718 = [], $_divisiones718 = '', $_planCuentas718 = '', $_costos718 = '', $_cups718 = '', $_grServicios718 = '', $_terceros718;
SAL718.CUPS = []; SAL718.COSTO = []; SAL718.TERCEROS = []; SAL718.GRUPOSER = []; SAL718.MAESTROS = []; SAL718.DIVISION = [];

//-------------------------------MASCARAS--------------------------//
var ingresoTerc = new IMask($('#ingrtercer_718')[0], { mask: Number, radix: '.', scale: 2, padFractionalZeros: false });
//----------------------------------------------------------------//

$(document).ready(function () {
	loader('hide');
	_inputControl('reset'); _inputControl('disabled');
	_toggleF8([
		{ input: 'codgrupo', app: '718', funct: _ventanaGrupo718 },
		{ input: 'codcups', app: '718', funct: _ventanaCups718 },
		{ input: 'centrocosto', app: '718', funct: _ventanaCentrCosto718 },
		{ input: 'ctaingrTercer', app: '718', funct: _ventanaPlanCuentas718 },
		{ input: 'nitTercer', app: '718', funct: _ventanaTerceros718 },
		{ input: 'codPuc', app: '718', funct: _ventanaPlanCuentas718 },
		{ input: 'codCoop', app: '718', funct: _ventanaPlanCuentas718 },
		{ input: 'codOficial', app: '718', funct: _ventanaPlanCuentas718 },
		{ input: 'division1', app: '718', funct: _ventanaDivision718 },
		{ input: 'division2', app: '718', funct: _ventanaDivision718 }
	]);
	iniciarObjetosFNF8();
	ocultCajas718();

});

function iniciarObjetosFNF8() {
	SAL718.CUPS = []; SAL718.COSTO = []; SAL718.TERCEROS = []; SAL718.GRUPOSER = []; SAL718.MAESTROS = [];
	obtenerDatosCompletos({ nombreFd: 'CUPS' }, (data) => {
		$_cups718 = data.CODIGOS;
		obtenerDatosCompletos({ nombreFd: 'GRUPO-SER' }, (data) => {
			$_grServicios718 = data.CODIGOS;
			obtenerDatosCompletos({ nombreFd: 'COSTOS' }, (data) => {
				$_costos718 = data.COSTO;
				obtenerDatosCompletos({ nombreFd: 'CTA-MAYOR' }, (data) => {
					$_planCuentas718 = data.MAESTROS;
					obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, (data) => {
						$_terceros718 = data.TERCEROS;
						obtenerDatosCompletos({ nombreFd: 'DIVISION' }, (data) => {
							$_divisiones718 = data.CODIGOS;
							CON850(_evaluarCON850_718)
						}, 'OFF');
					}, 'ONLY');
				}, 'ONLY');
			}, 'ONLY');
		}, 'ONLY');
	}, 'ON');
}

//------------------------ Funciones FNF8 -----------------------------------//
// F8 GRUPO-SERVICIO //
function _ventanaGrupo718(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE GRUPOS DE SERVICIOS",
			columnas: ["COD", "DESCRIP"],
			data: $_grServicios718,
			callback_esc: () => { _validarGrupo718() },
			callback: (data) => {
				SAL718.GRUPOSER.COD = data.COD.toUpperCase(); SAL718.GRUPOSER.DESCRIP = data.DESCRIP;
				document.getElementById('codgrupo_718').value = SAL718.GRUPOSER.COD + ' - ' + SAL718.GRUPOSER.DESCRIP;
				_validarCUPS718();
			}
		});
	}
}
// F8 CODCUPS //
function _ventanaCups718(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		switch (SAL718.NOVEDADW) {
			case '7':
				_validarCUPS718();
				break;
			case '8':
				$_cups718 = $_cups718.filter(cups_gr => cups_gr.LLAVE.substring(0, 2).toString().trim() == SAL718.GRUPOSER.COD.toString().trim());
				_ventanaDatos({
					titulo: "VENTANA DE CODIGOS CUPS",
					columnas: ["LLAVE", "DESCRIP"],
					data: $_cups718,
					callback_esc: () => { _validarCUPS718() },
					callback: (data) => {
						SAL718.CUPS = data;
						data.GRUPO = data.LLAVE.substring(0, 2);
						SAL718.CUPS.LLAVE = data.LLAVE; SAL718.CUPS.DESCRIP = data.DESCRIP;
						let datos_envio = datosEnvio() + SAL718.CUPS.LLAVE;
						postData({
							datosh: datos_envio
						}, get_url("APP/SALUD/SAL718-01.DLL"))
							.then((data) => {
								let res = data; SAL718.CUPS = res;
								_onrestricciones718({ invalid: SAL718.CUPS.ESTADO, seccion: 'CUPS' })

							})
							.catch((error) => { console.debug(error) });

					}
				});
				break;
			case '9':
				$_cups718 = $_cups718.filter(cups_gr => cups_gr.LLAVE.substring(0, 2).toString().trim() == SAL718.GRUPOSER.COD.toString().trim());
				_ventanaDatos({
					titulo: "VENTANA DE CODIGOS CUPS",
					columnas: ["LLAVE", "DESCRIP"],
					data: $_cups718,
					callback_esc: () => { _validarCUPS718() },
					callback: (data) => {
						data.GRUPO = data.LLAVE.substring(0, 2);
						SAL718.CUPS.LLAVE = data.LLAVE.toString().trim(); SAL718.CUPS.DESCRIP = data.DESCRIP;
						_eliminarCups718();
					}
				});
				break;
		}

	}
}
// F8 CENTRO-COSTO //
function _ventanaCentrCosto718(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA CENTRO DE COSTO",
			columnas: ["COD", "NOMBRE"],
			data: $_costos718,
			callback_esc: () => { _validarCentroCost718() },
			callback: (data) => {
				SAL718.COSTO = data;
				validarEdadMin718();

			}
		});
	}
}
// F8 PLAN DE CUENTAS
function _ventanaPlanCuentas718(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA CUENTA MAYOR",
			columnas: ["LLAVE_MAE", "NOMBRE_MAE"],
			data: $_planCuentas718,
			callback_esc: () => { validarCtaTercero718() },
			callback: (data) => {
				let caja = e.currentTarget.id;
				if (caja == 'ctaingrTercer_718') {
					SAL718.MAESTROS.LLAVE_MAE = data.LLAVE_MAE; SAL718.MAESTROS.NOMBRE_MAE = data.NOMBRE_MAE;
					$('#ctaingrTercer_718').val(data.LLAVE_MAE.toString().trim())
					$('#ctaDescripTercer_718').val(data.NOMBRE_MAE.toString().trim())
					validarTercero718();
				} else {
					switch ($_USUA_GLOBAL[0].PUC) {
						case '1': document.getElementById('codPuc_718').value = data.LLAVE_MAE + ' ' + data.NOMBRE_MAE; break;
						case '2': document.getElementById('codCoop_718').value = data.LLAVE_MAE + ' ' + data.NOMBRE_MAE; break;
						case '3': document.getElementById('codPuc_718').value = data.LLAVE_MAE + ' ' + data.NOMBRE_MAE; break;
						case '4': document.getElementById('codOficial_718').value = data.LLAVE_MAE + ' ' + data.NOMBRE_MAE; break;
						case '6': document.getElementById('codPuc_718').value = data.LLAVE_MAE + ' ' + data.NOMBRE_MAE; break;
						default: document.getElementById('codPuc_718').value = SAL718.MAESTROS.LLAVE_MAE + ' ' + data.NOMBRE_MAE; break;
					}
					validarDivision718();
				}
			}
		});
	}
}
function _ventanaTerceros718(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE TERCEROS",
			columnas: ["COD", "NOMBRE"],
			data: $_terceros718,
			callback_esc: () => { validarTercero718() },
			callback: (data) => {
				SAL718.TERCEROS.COD = data.COD; SAL718.TERCEROS.NOMBRE = data.NOMBRE;
				$("#nitTercer_718").val(data.COD);
				$("#descripTercer_718").val(data.NOMBRE);
				switch ($_USUA_GLOBAL[0].PUC) {
					case '1': validarCodPuc718(); break;
					case '2': validarCodCoop718(); break;
					case '3': validarCodPuc718(); break;
					case '4': validarcodOficial718(); break;
					case '6': validarCodPuc718(); break;
					default: validarCodPuc718(); break;
				}
			}
		});
	}
}
// F8 DIVISION //
function _ventanaDivision718(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE DIVISIONES",
			columnas: ["COD", "DESCRIP"],
			data: $_divisiones718,
			callback_esc: () => { validarDivision718() },
			callback: (data) => {
				SAL718.DIVISION.COD = data.COD; SAL718.DIVISION.DESCRIP = data.DESCRIP;
				let caja = e.currentTarget.id;
				if (caja == 'division1_718') {
					$('#division1_718').val(data.COD + ' ' + data.DESCRIP);
					validarDivision2718();
				} else {
					$('#division2_718').val(data.COD + ' ' + data.DESCRIP);
					Actualizar718();
				}
			}

		});
	}
}

function _evaluarCON850_718(novedad) {
	_inputControl('reset'); _inputControl('disabled');
	SAL718.NOVEDADW = novedad.id;
	document.getElementById('oper718').value = localStorage.Usuario + ' - ' + localStorage.Nombre;
	document.getElementById('fecha718').value = moment().format('YYYY/MM/DD');
	switch (parseInt(novedad.id)) {
		case 7: case 8: case 9: _validarGrupo718(); break;
		default: _toggleNav(); break;
	}
	$('#novedad718').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarGrupo718() {
	validarInputs({
		form: "#grupo718",
		orden: '1'
	},
		function () {
			CON850(_evaluarCON850_718);
		},
		evaluarGrupo718
	)
}
function evaluarGrupo718() {
	SAL718.GRUPOSER.COD = document.getElementById('codgrupo_718').value.toUpperCase().substring(0, 2);
	let res;
	res = $_grServicios718.filter(gruposer => gruposer.COD == SAL718.GRUPOSER.COD.toUpperCase());
	if (res == '') {
		CON851('03', '03', _validarGrupo718(), 'error', 'error');
	} else {
		SAL718.GRUPOSER = res[0]
		if (res.length > 0 || res != '') { SAL718.GRUPOSER.ESTADO = '00' } else { SAL718.GRUPOSER.ESTADO = '01'; }
		_onrestricciones718({ invalid: SAL718.GRUPOSER.ESTADO, seccion: 'GRUPOSER' })
	}
}
function _validarCUPS718() {
	validarInputs({
		form: "#cups718",
		orden: '1'
	},
		function () {
			CON850(_evaluarCON850_718);
		},
		evaluarCups718
	)
}
function evaluarCups718() {
	SAL718.CUPS.GRUPO = SAL718.GRUPOSER.COD;
	let campo = document.getElementById('codcups_718').value.toString().trim().toUpperCase();
	if (typeof campo == "undefined" || campo == '') {
		CON851('03', '03', _validarCUPS718(), 'error', 'error');
	} else {
		SAL718.CUPS.LLAVE = SAL718.CUPS.GRUPO + campo;

		let datos_envio = datosEnvio() + SAL718.CUPS.LLAVE.toUpperCase();
		postData({
			datosh: datos_envio
		}, get_url("APP/SALUD/SAL718-01.DLL"))
			.then((data) => {
				SAL718.CUPS = data;

				_onrestricciones718({ invalid: SAL718.CUPS.ESTADO, seccion: 'CUPS' })
			})
			.catch((error) => { console.debug(error) });
	}
}

function _validarDescripcion718() {
	validarInputs({
		form: "#descripcioncups718",
		orden: '1'
	},
		function () {
			switch (SAL718.NOVEDADW) {
				case '7': _validarCUPS718(); break;
				case '8': limpiarCajas718(); break;
			}
		},
		function () {
			SAL718.CUPS.DESCRIP = document.getElementById('descripCup_718').value;
			_validarTipoCups718();
		}
	)
}

function _validarTipoCups718() {
	let data = [
		{ 'COD': '01', 'DESCRIP': 'CIRUGIAS' },
		{ 'COD': '02', 'DESCRIP': 'LABORATORIO' }
	]
	SAL718.CUPS.LLAVE_ALT[0] = document.getElementById('tipocups_718').value;
	if ($_USUA_GLOBAL[0].NIT == 800156469) {
		data.push(
			{ 'COD': '03', 'DESCRIP': 'ECOGRAFIAS, DOPPLER, T.A.C, RESONACIA NUCLEAR' },
			{ 'COD': '04', 'DESCRIP': 'ESTANCIA Y OTROS' },
			{ 'COD': '05', 'DESCRIP': 'CONSULTA Y TERAPIAS' },
			{ 'COD': '06', 'DESCRIP': 'PATOLOGIA Y CITOLOGIA' },
			{ 'COD': '07', 'DESCRIP': 'PROMOCION Y PREVENCION' })
	} else {
		data.push(
			{ 'COD': '03', 'DESCRIP': 'RX iMAGENEOLOGIA' },
			{ 'COD': '04', 'DESCRIP': 'ESTANCIA Y OTROS' },
			{ 'COD': '05', 'DESCRIP': 'CONSULTA Y TERAPIAS' },
			{ 'COD': '06', 'DESCRIP': 'PATOLOGIA Y CITOLOGIA' },
			{ 'COD': '07', 'DESCRIP': 'PROMOCION Y PREVENCION' })
	}
	TIPOSERVICIOS({ popup: 'on', seleccion: parseInt(SAL718.CUPS.LLAVE_ALT[0]) }, _validarGrupo718, function (data) {
		SAL718.CUPS.LLAVE_ALT[0] = data.COD;
		document.getElementById('tipocups_718').value = data.COD + ' ' + data.DESCRIP
		_validarCodAbr718();
	});
}

function _validarCodAbr718() {
	validarInputs({
		form: "#codabreviado718",
		orden: '1'
	},
		_validarDescripcion718,
		function () {
			SAL718.CUPS.LLAVE_ALT[1] = (document.getElementById('codabrev_718').value).toString().trim();
			if (typeof SAL718.CUPS.LLAVE_ALT[1].toString().trim() == "undefined" || SAL718.CUPS.LLAVE_ALT[1].toString().trim() == '') {
				CON851('03', '03', _validarCodAbr718(), 'error', 'error');
			} else { document.getElementById('codabrev_718').value = SAL718.CUPS.LLAVE_ALT[1].toString().trim(); validarNivelComp718(); }

		}
	)
}
function validarNivelComp718() {
	validarInputs({
		form: "#nivcomplejidad718",
		orden: '1'
	},
		_validarCodAbr718,
		function () {
			SAL718.CUPS.NIVEL = (document.getElementById('nivcompl_718').value).toString().trim();
			if (typeof SAL718.CUPS.NIVEL == "undefined" || SAL718.CUPS.NIVEL.toString().trim() == '') {
				CON851('03', '03', validarNivelComp718(), 'error', 'error');
			} else {
				if (isNaN(SAL718.CUPS.NIVEL) || (parseInt(SAL718.CUPS.NIVEL) > 5)) { CON851('03', '03', validarNivelComp718(), 'error', 'error'); }
				else { document.getElementById('nivcompl_718').value = SAL718.CUPS.NIVEL.toString().trim(); validarDuracion718(); }
			}
		})
}
function validarDuracion718() {
	validarInputs({
		form: "#duracionproc718",
		orden: '1'
	},
		validarNivelComp718,
		function () {
			SAL718.CUPS.DURACION = document.getElementById('duracion_718').value;
			if (SAL718.CUPS.DURACION == 'undefined' || SAL718.CUPS.DURACION == '' || SAL718.CUPS.DURACION > 180) {
				CON851('03', '03', validarDuracion718(), 'error', 'error');
			} else {
				let swcampo = [5, 15, 45].find(n => n == SAL718.CUPS.DURACION);
				if (swcampo == -1) { CON851('03', '03', validarDuracion718(), 'error', 'error'); } else { document.getElementById('duracion_718').value = SAL718.CUPS.DURACION; validarCopago718() }
			}

		}
	)
}
function validarCopago718() {
	SER822B({ popup: 'on', seleccion: parseInt(SAL718.CUPS.COPAGO) }, validarDuracion718, function (data) {
		SAL718.CUPS.COPAGO = data.COD;
		document.getElementById('pagoPaci_718').value = SAL718.CUPS.COPAGO + ' ' + data.DESCRIP;
		validarDatoNopos718();
	})
}
function validarDatoNopos718() {
	validarInputs({
		form: "#procedencianopos718",
		orden: '1'
	},
		validarNivelComp718,
		function () {
			let cis;
			SAL718.CUPS.NOPOS = (document.getElementById('proced_718').value).toString().trim().toUpperCase();
			switch (SAL718.CUPS.NOPOS) {
				case 'N': case 'S':
					cis = document.getElementById('cis_718').style.display;
					if (cis == '') { validarCis718(); } else { validarHl7718(); } break;
				case '':
					document.getElementById('proced_718').value = 'N';
					SAL718.CUPS.NOPOS = document.getElementById('proced_718').value;
					cis = document.getElementById('cis_718').style.display;
					if (cis == '') { validarCis718(); } else { validarHl7718(); } break;
				default: CON851('03', '03', validarDatoNopos718(), 'error', 'error'); break;
			}

		}
	)
}

function validarCis718() {
	validarInputs({
		form: "#cis718",
		orden: '1'
	},
		validarDatoNopos718, function () {
			SAL718.CUPS.CIS = (document.getElementById('cis_718').value).toString().trim().toUpperCase();
			switch (SAL718.CUPS.CIS) {
				case 'N': case 'S': document.getElementById('cis_718').value = SAL718.CUPS.CIS; _validarCentroCost718(); break;
				case '': document.getElementById('cis_718').value = 'N'; SAL718.CUPS.CIS = document.getElementById('cis_718').value; _validarCentroCost718(); break;
				default: CON851('03', '03', validarCis718(), 'error', 'error'); break;
			}
		}
	)
}

function validarHl7718() {
	validarInputs({
		form: "#actHl718",
		orden: '1'
	},
		validarDatoNopos718, function () {
			SAL718.CUPS.CIS = (document.getElementById('actHl_718').value).toString().trim().toUpperCase();
			switch (SAL718.CUPS.CIS) {
				case 'N': case 'S': document.getElementById('actHl_718').value = SAL718.CUPS.CIS; _validarCentroCost718(); break;
				case '': document.getElementById('actHl_718').value = 'N'; _validarCentroCost718(); break;
				default: CON851('03', '03', validarCis718(), 'error', 'error'); break;
			}
		}
	)
}

function _validarCentroCost718() {
	validarInputs({
		form: "#centrocosto718",
		orden: '1'
	},
		function () {
			let cis = document.getElementById('cis_718').style.display;
			if (cis == '') { validarCis718(); } else { validarHl7718(); }
		}, evaluarCostos718)
}

function evaluarCostos718() {
	let res;
	SAL718.COSTO.COD = (document.getElementById('centrocosto_718').value).toString().trim();
	if (typeof SAL718.COSTO.COD == "undefined" || SAL718.COSTO.COD == '' || isNaN(SAL718.COSTO.COD)) { CON851('03', '03', _validarCentroCost718(), 'error', 'error'); }
	else {
		res = $_costos718.filter(costo => costo.COD.padStart(6, '0') == SAL718.COSTO.COD.padStart(6, '0'));
		if (res == '') {
			CON851('03', '03', _validarCentroCost718(), 'error', 'error');
		} else {
			SAL718.COSTO = res[0];
			if (res.length > 0) { SAL718.COSTO.ESTADO = '00'; SAL718.COSTO.DESCRIP = res[0].NOMBRE } else { SAL718.COSTO.ESTADO = '01'; }
			SAL718.CUPS.COSTO = SAL718.COSTO.COD;
			_onrestricciones718({ invalid: SAL718.COSTO.ESTADO, seccion: 'COSTO' })
		}

	}
}

function validarEdadMin718() {
	validarInputs({
		form: "#edadminima718",
		orden: '1'
	},
		_validarCentroCost718, function () {

			SAL718.CUPS.EDAD_MIN = document.getElementById('edadminima_718').value.toString().trim();
			if (SAL718.CUPS.EDAD_MIN > 100 || (isNaN(SAL718.CUPS.EDAD_MIN))) { CON851('03', '03', validarEdadMin718(), 'error', 'error'); }
			else {
				document.getElementById('edadminima_718').value = SAL718.CUPS.EDAD_MIN;
				validarEdadMax718();
			}
		})
}

function validarEdadMax718() {
	validarInputs({
		form: "#edadmaxima718",
		orden: '1'
	},
		validarEdadMin718, function () {

			SAL718.CUPS.EDAD_MAX = document.getElementById('edadmaxima_718').value.toString().trim();
			if (SAL718.CUPS.EDAD_MAX < SAL718.CUPS.EDAD_MIN || isNaN(SAL718.CUPS.EDAD_MAX)) { CON851('03', '03', validarEdadMax718(), 'error', 'error'); }
			else {
				document.getElementById('edadmaxima_718').value = SAL718.CUPS.EDAD_MAX;
				validarUndEdad718();
			}
		})
}

function validarUndEdad718() {
	validarInputs({
		form: "#undedad718",
		orden: '1'
	},
		validarEdadMax718, function () {
			SAL718.CUPS.UND_EDAD = document.getElementById('undedad_718').value.toString().trim().toUpperCase();
			switch (SAL718.CUPS.UND_EDAD) {
				case 'A': case 'D': case 'M': case '':
					document.getElementById('undedad_718').value = SAL718.CUPS.UND_EDAD;
					validarSexo718();
					break;
				default:
					CON851('03', '03', validarUndEdad718(), 'error', 'error');
					break;
			}
		})
}



function validarSexo718() {
	validarInputs({
		form: "#sexo718",
		orden: '1'
	},
		validarUndEdad718, function () {
			SAL718.CUPS.SEXO = document.getElementById('sexo_718').value.toString().trim().toUpperCase();
			switch (SAL718.CUPS.SEXO) {
				case 'N': case 'M': case 'F': document.getElementById('sexo_718').value = SAL718.CUPS.SEXO; validarDiagnostico718(); break;
				case '': document.getElementById('sexo_718').value = 'N'; SAL718.CUPS.SEXO = 'N'; validarDiagnostico718(); break;
				default: CON851('03', '03', validarSexo718(), 'error', 'error'); break;
			}

		}
	)
}

function validarDiagnostico718() {
	validarInputs({
		form: "#pregRips718",
		orden: '1'
	},
		validarUndEdad718, function () {
			SAL718.CUPS.DIAGN = document.getElementById('pregRips_718').value.toString().trim().toUpperCase();
			if (typeof SAL718.CUPS.DIAGN == "undefined" || SAL718.CUPS.DIAGN == '') { document.getElementById('pregRips_718').value = 'N'; evaluarDiagn718() }
			else { evaluarDiagn718() }
		})
}

function evaluarDiagn718() {
	if (SAL718.CUPS.GRUPO < 87) {
		if (SAL718.CUPS.LLAVE_ALT[0] == 2 || SAL718.CUPS.LLAVE_ALT[0] == 3 || SAL718.CUPS.LLAVE_ALT[0] == 4)
			document.getElementById('pregRips_718').value = 'N'; validar100Med();
	} else { document.getElementById('pregRips_718').value = 'S'; validar100Med(); }
}

function validar100Med() {
	validarInputs({
		form: "#porcmedico718",
		orden: '1'
	},
		validarUndEdad718, function () {
			SAL718.CUPS.MED_100 = document.getElementById('porcmedico_718').value.toString().trim().toUpperCase();
			switch (SAL718.CUPS.MED_100) {
				case 'S':
					switch ($_USUA_GLOBAL[0].PUC) {
						case '1': validarCodPuc718(); break;
						case '2': validarCodCoop718(); break;
						case '3': validarCodPuc718(); break;
						case '4': validarcodOficial718(); break;
						case '6': validarCodPuc718(); break;
						default: validarCodPuc718(); break;
					}
					break;
				case 'N': validarPorcentaje718(); break;
				case '': document.getElementById('porcmedico_718').value = 'N'; SAL718.CUPS.MED_100 = 'N'; validarPorcentaje718(); break;

				default: CON851('03', '03', validar100Med(), 'error', 'error'); break;
			}
		})
}
function validarPorcentaje718() {
	validarInputs({
		form: "#ingrclinica718",
		orden: '1'
	},
		validar100Med, function () {
			SAL718.CUPS.PORC_CL = document.getElementById('ingrclinica_718').value.toString().trim().toUpperCase();
			switch (SAL718.CUPS.PORC_CL) {
				case '': CON851('03', '03', validarPorcentaje718(), 'error', 'error'); break;
				default: document.getElementById('ingrclinica_718').value = SAL718.CUPS.PORC_CL; validarPorcentajeTer718(); break;
			}

		})

}

function validarPorcentajeTer718() {
	validarInputs({
		form: "#ingrtercer718",
		orden: '1'
	},
		validarPorcentaje718, function () {
			SAL718.CUPS.PORC_OTR = ingresoTerc.unmaskedValue;
			if (typeof SAL718.CUPS.PORC_OTR == "undefined" || SAL718.CUPS.PORC_OTR == '') { CON851('03', '03', validarPorcentaje718(), 'error', 'error'); }
			else {
				ingresoTerc._value = SAL718.CUPS.PORC_OTR;
				evaluarPorcentajeTer718();
			}
		})

}

function evaluarPorcentajeTer718() {
	SAL718.CUPS.PORC_CL = parseFloat(SAL718.CUPS.PORC_CL); SAL718.CUPS.PORC_OTR = parseFloat(SAL718.CUPS.PORC_OTR);
	if ((SAL718.CUPS.PORC_CL + SAL718.CUPS.PORC_OTR) > 100) {
		CON851('03', '03', validarPorcentajeTer718(), 'error', 'error')
	} else { validarCtaTercero718() }
}

function validarCtaTercero718() {
	validarInputs({
		form: "#ctaingrTercer718",
		orden: '1'
	},
		validarPorcentaje718, evaluarCtaTercero718)
}

function evaluarCtaTercero718() {
	SAL718.MAESTROS.LLAVE_MAE = document.getElementById('ctaingrTercer_718').value.toString().trim();
	SAL718.CUPS.CTA_OTR = SAL718.MAESTROS.LLAVE_MAE;
	let res;

	if (SAL718.CUPS.CTA_OTR.trim().length == 0 || SAL718.CUPS.CTA_OTR == '') {
		res = $_planCuentas718.filter(n => n.LLAVE_MAE == SAL718.CUPS.CTA_OTR.substring(0, 10) + 4);
		if (res == '') {
			document.getElementById('ctaingrTercer_718').value = '0';
			document.getElementById('ctaDescripTercer_718').value = document.getElementById('ctaDescripTercer_718').value.padStart(30, '*');
		} else {
			document.getElementById('ctaDescripTercer_718').value = res[0].NOMBRE_MAE
		}
		validarTercero718();
	}
	else {
		res = $_planCuentas718.filter(n => n.LLAVE_MAE == SAL718.CUPS.CTA_OTR.padStart(12, '0'));
		if (res == '') {
			CON851('03', '03', validarCtaTercero718(), 'error', 'error');
		} else {
			document.getElementById('ctaingrTercer_718').value = SAL718.CUPS.CTA_OTR
			document.getElementById('ctaDescripTercer_718').value = res[0].NOMBRE_MAE;
			validarTercero718();
		}
	}

}
function validarTercero718() {
	validarInputs({
		form: "#nitTercer718",
		orden: '1'
	},
		validarCtaTercero718, evaluarTercero718)
}

function evaluarTercero718() {
	let res = '';
	SAL718.CUPS.NIT_OTR = document.getElementById('nitTercer_718').value.trim();
	if (SAL718.CUPS.NIT_OTR == '' || SAL718.CUPS.NIT_OTR.trim().length == 0) {
		CON851('03', '03', validarTercero718(), 'error', 'error');
	} else {
		res = $_terceros718.filter(n => n.COD == parseInt(SAL718.CUPS.NIT_OTR));
		if (res == '' || res == undefined) {
			document.getElementById('nitTercer_718').value = SAL718.CUPS.NIT_OTR.trim();
			document.getElementById('descripTercer_718').value = document.getElementById('descripTercer_718').value.padStart(10, '*');
			CON851('03', '03', validarTercero718(), 'error', 'error');
		} else {
			document.getElementById('nitTercer_718').value = res[0].COD.trim();
			document.getElementById('descripTercer_718').value = res[0].NOMBRE;
			SAL718.TERCEROS.COD = parseInt(SAL718.CUPS.NIT_OTR);
			switch ($_USUA_GLOBAL[0].PUC) {
				case '1': validarCodPuc718(); break;
				case '2': validarCodCoop718(); break;
				case '3': validarCodPuc718(); break;
				case '4': validarcodOficial718(); break;
				case '6': validarCodPuc718(); break;
				default: validarCodPuc718(); break;
			}
		}
	}
}
//-------------------------------------------------------------------------------------------//

function validarCodHeon718() {
	validarInputs({
		form: "#codHeon718",
		orden: '1'
	},
		validarCtaTercero718, function () {
			SAL718.CUPS.NIT_OTR = document.getElementById('codHeon_718').value.toString().trim();
			if (typeof SAL718.CUPS.NIT_OTR == "undefined" || SAL718.CUPS.NIT_OTR == '') { CON851('03', '03', validarCtaTercero718(), 'error', 'error'); }
			else {
				document.getElementById('codHeon_718').value = SAL718.CUPS.NIT_OTR;
				switch ($_USUA_GLOBAL[0].PUC) {
					case '1': validarCodPuc718(); break;
					case '2': validarCodCoop718(); break;
					case '3': validarCodPuc718(); break;
					case '4': validarcodOficial718(); break;
					case '6': validarCodPuc718(); break;
					default: validarCodPuc718(); break;
				}
			}
		})
}

function validarCupsPrincipal718() {
	validarInputs({
		form: "#cupPrinc718",
		orden: '1'
	},
		validarCodHeon718,
		function () {
			SAL718.CUPS.LLAVE = document.getElementById('cupPrinc_718').value.toString().trim();
			if (typeof SAL718.CUPS.LLAVE == "undefined" || SAL718.CUPS.LLAVE == '') { CON851('03', '03', validarCtaTercero718(), 'error', 'error'); }
			else {
				document.getElementById('cupPrinc_718').value = SAL718.CUPS.LLAVE;
				validarDivision718();
			}
		})
}

//-------------------------------------------------------------------------------------------//
function validarCodPuc718() {
	validarInputs({
		form: "#codPuc718",
		orden: '1'
	},
		function () {
			let caja = document.getElementById('codHeon718').style.display;
			if (caja == '') {
				if (SAL718.CUPS.MED_100 == 'S') {
					validar100Med();
				} else { validarCodHeon718(); }
			} else {
				if (SAL718.CUPS.MED_100 == 'S') {
					validar100Med();
				} else { validarTercero718() }
			}
		},
		function () {
			SAL718.MAESTROS.LLAVE_MAE = document.getElementById('codPuc_718').value.substring(0, 12);
			SAL718.CUPS.CTA_CONTAB[0].CTA_CONTAB_CUP = SAL718.MAESTROS.LLAVE_MAE;
			SAL718.CUPS.CTA_CONTAB[2].CTA_CONTAB_CUP = SAL718.MAESTROS.LLAVE_MAE;
			let cuenta1, cuenta2, res1, res2;
			SAL718.CUPS.CTA_CONTAB[0].CTA_CONTAB_CUP == '' ? cuenta1 = ' ' : cuenta1 = SAL718.CUPS.CTA_CONTAB[0].CTA_CONTAB_CUP;
			SAL718.CUPS.CTA_CONTAB[2].CTA_CONTAB_CUP == '' ? cuenta2 = ' ' : cuenta2 = SAL718.CUPS.CTA_CONTAB[2].CTA_CONTAB_CUP;

			if ((cuenta1 == '' || cuenta2 == '')) { CON851('03', '03', validarCodPuc718(), 'error', 'error'); }
			else {
				res1 = $_planCuentas718.filter(cuenta => cuenta.LLAVE_MAE.trim() == cuenta1.toString().padStart(12, '0'));
				if (res1 == '') {
					CON851('03', '03', validarCodPuc718(), 'error', 'error');
				} else {
					if (res1.length > 0) {
						SAL718.CUENTA = SAL718.CUPS.CTA_CONTAB[0].CTA_CONTAB_CUP
						document.getElementById('codPuc_718').value = res1[0].LLAVE_MAE + ' ' + res1[0].NOMBRE_MAE; validarDivision718();
					} else {
						res2 = $_planCuentas718.filter(cuenta => cuenta.LLAVE_MAE.trim() == cuenta2.toString().padStart(12, '0'));
						if (res2 == '') {
							CON851('03', '03', validarCodPuc718(), 'error', 'error');
						} else {
							if (res2.length > 0) {
								SAL718.CUENTA = SAL718.CUPS.CTA_CONTAB[2].CTA_CONTAB_CUP
								document.getElementById('codPuc_718').value = res2[0].LLAVE_MAE + ' ' + res2[0].NOMBRE_MAE; validarDivision718();
							} else {
								CON851('01', '01', validarCodPuc718(), 'error', 'error');
							}
						}
					}
				}

			}
		})
}

function validarCodCoop718() {
	validarInputs({
		form: "#codCoop718",
		orden: '1'
	},
		function () {
			let caja = document.getElementById('codHeon718').style.display;
			if (caja == '') {
				validarCodHeon718();
			} else {
				validarTercero718()
			}
		},
		function () {
			SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP = SAL718.MAESTROS.LLAVE_MAE;
			if (typeof SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP == "undefined" || SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP == '') {
				CON851('03', '03', validarCodCoop718(), 'error', 'error');
			}
			else {
				document.getElementById('codCoop_718').value = SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP;
				let res = $_planCuentas718.find(cuenta => cuenta.LLAVE_MAE == SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP);
				SAL718.CUENTA = SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP
				if (res != -1) { validarDivision718(); } else { CON851('01', '01', validarCodCoop718(), 'error', 'error'); }
			}
		}
	)
}

function validarcodOficial718() {
	validarInputs({
		form: "#codOficial718",
		orden: '1'
	},
		function () {
			let caja = document.getElementById('codHeon718').style.display;
			if (caja == '') {
				validarCodHeon718();
			} else {
				validarTercero718()
			}
		},
		function () {
			SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP = SAL718.MAESTROS.LLAVE_MAE;
			if (typeof SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP == "undefined" || SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP == '') {
				CON851('03', '03', validarcodOficial718(), 'error', 'error');
			}
			else {
				document.getElementById('codOficial_718').value = SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP;
				let cuenta = $_planCuentas718.find(cuenta => cuenta.LLAVE_MAE == SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP);
				SAL718.CUENTA = SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP;
				if (cuenta != -1) { validarDivision718(); } else { CON851('01', '01', validarcodOficial718(), 'error', 'error'); }
			}
		}

	)
}

function validarDivision718() {
	validarInputs({
		form: "#division1718",
		orden: '1'
	},
		function () {
			switch ($_USUA_GLOBAL[0].PUC.toString()) {
				case '1': validarCodPuc718(); break;
				case '2': validarCodCoop718(); break;
				case '3': validarCodPuc718(); break;
				case '4': validarcodOficial718(); break;
				case '6': validarCodPuc718(); break;
				default: validarCodPuc718(); break;
			}
		}, evaluarDivision718)
}

function evaluarDivision718() {
	SAL718.CUPS.DIV1 = document.getElementById('division1_718').value.toString().trim().toUpperCase().substring(0, 2);
	if (typeof SAL718.CUPS.DIV1 == "undefined" || SAL718.CUPS.DIV1 == '') { CON851('03', '03', validarDivision718(), 'error', 'error'); }
	else {
		document.getElementById('division1_718').value = SAL718.CUPS.DIV1;
		let sw_invalid = $_divisiones718.find(n => n.COD == SAL718.CUPS.DIV1);
		if (sw_invalid == -1) { SAL718.DIVISION.ESTADO == '01'; CON851('01', '01', validarDivision718(), 'error', 'error'); }
		else { SAL718.DIVISION.ESTADO == '00'; document.getElementById('division1_718').value = sw_invalid.COD + ' ' + sw_invalid.DESCRIP; validarDivision2718(); }
	}

}

function validarDivision2718() {
	validarInputs({
		form: "#division2718",
		orden: '1'
	},
		validarDivision718,
		evaluarDivision2718)
}

function evaluarDivision2718() {
	SAL718.CUPS.DIV2 = document.getElementById('division2_718').value.toString().trim().toUpperCase().substring(0, 2);
	if (typeof SAL718.CUPS.DIV2 == "undefined" || SAL718.CUPS.DIV2 == '') { CON851('03', '03', validarDivision2718(), 'error', 'error'); }
	else {
		document.getElementById('division2_718').value = SAL718.CUPS.DIV2;
		let sw_invalid = $_divisiones718.find(n => n.COD == SAL718.CUPS.DIV2);
		if (sw_invalid == -1) { SAL718.DIVISION.ESTADO == '01'; CON851('01', '01', validarDivision718(), 'error', 'error'); }
		else { SAL718.DIVISION.ESTADO == '00'; document.getElementById('division2_718').value = sw_invalid.COD + ' ' + sw_invalid.DESCRIP; Actualizar718(); }
	}

}


function Actualizar718() {
	switch (SAL718.NOVEDADW) {
		case '7':
		case '8':
			SAL718.PARAMS =
				SAL718.CUPS.LLAVE.toUpperCase().padEnd(12, ' ')
				+ '|' + SAL718.CUPS.DESCRIP.trim().padEnd(80, ' ')
				+ '|' + parseInt(SAL718.CUPS.LLAVE_ALT[0])
				+ '|' + SAL718.CUPS.LLAVE_ALT[1].padEnd(5, ' ')
				+ '|' + parseInt(SAL718.CUPS.NIVEL)
				+ '|' + SAL718.CUPS.DURACION.padStart(3, '0')
				+ '|' + parseInt(SAL718.CUPS.COPAGO)
				+ '|' + SAL718.CUPS.NOPOS.trim()
				+ '|' + SAL718.CUPS.CIS.trim()
				+ '|' + SAL718.CUPS.COSTO.padStart(4, '0')
				+ '|' + SAL718.CUPS.EDAD_MIN.trim()
				+ '|' + SAL718.CUPS.EDAD_MAX.trim()
				+ '|' + SAL718.CUPS.UND_EDAD.toUpperCase()
				+ '|' + SAL718.CUPS.SEXO.toUpperCase().trim()
				+ '|' + SAL718.CUPS.DIAGN.toUpperCase().trim()
				+ '|' + SAL718.CUPS.MED_100.trim()
				+ '|' + SAL718.CUPS.PORC_CL
				+ '|' + SAL718.CUPS.PORC_OTR
				+ '|' + SAL718.TERCEROS.COD.toString().padStart(10, ' ')
				+ '|' + SAL718.CUPS.CTA_OTR.padStart(11, '0')
				+ '|' + SAL718.CUPS.CTA_CONTAB[0].CTA_CONTAB_CUP.padStart(11, '0')
				+ '|' + SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP.padStart(11, '0')
				+ '|' + SAL718.CUPS.CTA_CONTAB[2].CTA_CONTAB_CUP.padStart(11, '0')
				+ '|' + SAL718.CUPS.DIV1.trim()
				+ '|' + SAL718.CUPS.DIV2.trim()
				+ '|' + localStorage['Usuario'].trim()

			CON851P('01', validarDivision718, on_grabar718)
			break;
		case '9':
			_eliminarCups718(_validarGrupo718);
			break;

		default:
			break;
	}
}

function on_grabar718() {
	let datos_envio = datosEnvio() + SAL718.NOVEDADW + '|' + SAL718.PARAMS;
	console.debug(datos_envio, 'datos Grabar');

	postData({
		datosh: datos_envio
	}, get_url("APP/SALUD/SAL718-02.DLL"))
		.then((data) => {
			if (data.split('|')[0] == "00") {
				CON851(data.split('|')[0], data.split('|')[1], limpiarCajas718(), 'success', 'success');
			} else { CON851('ERROR', 'ERROR AL ACTUALIZAR', validarDivision718(), 'error', 'error'); };

		}).catch((error) => { console.debug(error) });
}

function _eliminarCups718(escCallback) {
	SAL718.PARAMS = SAL718.CUPS.LLAVE + '|';
	CON851P('54', escCallback, validarDivision718)
	let datos_envio = datosEnvio() + SAL718.NOVEDADW + '|' + SAL718.PARAMS;
	postData({
		datosh: datos_envio
	}, get_url("APP/SALUD/SAL718-02.DLL"))
		.then((data) => {
			if (data.split('|')[0] == "00") {
				CON851(data.split('|')[0], data.split('|')[1], limpiarCajas718(), 'success', 'success');
			} else {
				CON851('ERROR', 'ERROR AL ACTUALIZAR', validarDivision718(), 'error', 'error');
			};
		}).catch((error) => { console.debug(error) });
}

//------------- FUNCIONES DOM HTML --------------------- //
function limpiarCajas718() {
	_inputControl('reset');
	_inputControl('disabled');
	ocultCajas718();
	iniciarObjetosFNF8();
}

// CONDICION POR NIT PARA CAMBIO DE CAJAS //
function ocultCajas718() {
	if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
		document.getElementById('cis718').style.display = 'none';
		document.getElementById('actHl718').style.display = '';

		document.getElementById('codTerce718').style.display = 'none';
		document.getElementById('nomTerce718').style.display = 'none';

		document.getElementById('codHeon718').style.display = '';
		document.getElementById('cupPrinc718').style.display = '';
		CON850(_evaluarCON850_718);
	} else {
		document.getElementById('cis718').style.display = '';
		document.getElementById('actHl718').style.display = 'none';

		document.getElementById('codTerce718').style.display = '';
		document.getElementById('nomTerce718').style.display = '';

		document.getElementById('codHeon718').style.display = 'none';
		document.getElementById('cupPrinc718').style.display = 'none';
		CON850(_evaluarCON850_718);
	}
}
function on_llenarFormCups718() {
	SAL718.CUPS.TIPO = SAL718.CUPS.LLAVE_ALT[0]; SAL718.CUPS.ABRV = SAL718.CUPS.LLAVE_ALT[1];
	SAL718.CUPS.LLAVE_ALT[0] = SAL718.CUPS.LLAVE_ALT[0].trim();
	document.getElementById('codcups_718').value = SAL718.CUPS.LLAVE.substring(2, 12);
	const dom_Idcups = ['descripCup_718', 'codabrev_718', 'nivcompl_718',
		'duracion_718', 'proced_718', 'edadminima_718', 'edadmaxima_718',
		'undedad_718', 'sexo_718', 'pregRips_718', 'porcmedico_718', 'ingrclinica_718', 'ingrtercer_718',
		'cis_718', 'actHl_718'
	];
	const obj_Idcups = [
		'DESCRIP', 'ABRV', 'NIVEL', 'DURACION', 'NOPOS', 'EDAD_MIN',
		'EDAD_MAX', 'UND_EDAD', 'SEXO', 'DIAGN', 'MED_100', 'PORC_CL', 'PORC_OTR', 'CIS', 'CIS'
	];
	TIPOSERVICIOS({ popup: 'off', seleccion: parseInt(SAL718.CUPS.TIPO) }, null, function (data) {
		document.getElementById('tipocups_718').value = data.COD + ' ' + data.DESCRIP
	});
	SER822B({ popup: 'off', seleccion: parseInt(SAL718.CUPS.COPAGO) }, null, function (data) {
		document.getElementById('pagoPaci_718').value = data.COD + ' ' + data.DESCRIP
	});

	let cos = $_costos718.filter(costo => costo.COD == SAL718.CUPS.COSTO);
	if (cos == '') { document.getElementById('centrocosto_718').value = '*******' } else { document.getElementById('centrocosto_718').value = cos[0].COD + ' ' + cos[0].DESCRIP }

	document.getElementById('codgrupo_718').value = SAL718.GRUPOSER.COD + ' ' + SAL718.GRUPOSER.DESCRIP;
	let ter = $_terceros718.filter(tercero => tercero.COD.trim() == parseInt(SAL718.CUPS.NIT_OTR))
	let plan = $_planCuentas718.filter(cuenta => cuenta.LLAVE_MAE.trim() == SAL718.CUPS.CTA_OTR.padStart(12, '0'))

	let division1 = $_divisiones718.filter(div => div.COD.trim() == SAL718.CUPS.DIV1);
	if (division1 == '') { document.getElementById('division1_718').value = '*******' } else { document.getElementById('division1_718').value = division1[0].COD + ' ' + division1[0].DESCRIP }

	let division2 = $_divisiones718.filter(div => div.COD.trim() == SAL718.CUPS.DIV2);
	if (division2 == '') { document.getElementById('division2_718').value = '*******' } else { document.getElementById('division2_718').value = division2[0].COD + ' ' + division2[0].DESCRIP }


	for (indice in dom_Idcups) { document.querySelector(`#${dom_Idcups[indice]}`).value = SAL718.CUPS[obj_Idcups[indice]]; }
	if (plan == '') {
		document.getElementById('ctaingrTercer_718').value = ''; document.getElementById('ctaDescripTercer_718').value = '***********';
	} else {
		document.getElementById('ctaingrTercer_718').value = plan[0].LLAVE_MAE; document.getElementById('ctaDescripTercer_718').value = plan[0].NOMBRE_MAE;
	}
	if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
		ter[0] == '' ? document.getElementById('codHeon718').value = ' ' : document.getElementById('codHeon718').value = ter[0].COD + ' ' + ter[0].NOMBRE;

		SAL718.CUPS.LLAVE == '' ? document.getElementById('cupPrinc718').value = ' ' : document.getElementById('cupPrinc718').value = SAL718.CUPS.LLAVE;

		SAL718.CUPS.CIS == '' ? document.getElementById('actHl718').value = ' ' : document.getElementById('actHl718').value = SAL718.CUPS.CIS;
	} else {
		SAL718.CUPS.CIS == '' ? document.getElementById('cis718').value = ' ' : document.getElementById('cis718').value = SAL718.CUPS.CIS;
		SAL718.CUPS.NIT_OTR == '' ? document.getElementById('nitTercer_718').value = ' ' : document.getElementById('nitTercer_718').value = SAL718.CUPS.NIT_OTR.trim();
		SAL718.CUPS.NIT_OTR == '' ? document.getElementById('descripTercer_718').value = document.getElementById('descripTercer_718').value.padStart(10, '*') : document.getElementById('descripTercer_718').value = ter[0].NOMBRE;
	}
	if (SAL718.CUPS.LLAVE_ALT[0] == '6') {
		switch ($_USUA_GLOBAL[0].PUC.toString()) {
			case '1': case '3':
				SAL718.CUPS.CTA_CONTAB[0].CTA_CONTAB_CUP = '41250400050'; document.getElementById('codPuc_718').value = SAL718.CUPS.CTA_CONTAB[0].CTA_CONTAB_CUP;
				break;
			case '4':
				SAL718.CUPS.CTA_CONTAB[2].CTA_CONTAB_CUP = '41248000001'; document.getElementById('codOficial_718').value = SAL718.CUPS.CTA_CONTAB[2].CTA_CONTAB_CUP;
				break;
		}
	} else {
		let planc;
		switch ($_USUA_GLOBAL[0].PUC.toString()) {
			case '1': case '3':
				planc = $_planCuentas718.filter(cuenta => parseInt(cuenta.LLAVE_MAE) == parseInt(SAL718.CUPS.CTA_CONTAB[0].CTA_CONTAB_CUP));
				if (planc == '') {
					document.getElementById('codCoop_718').value = '***********';
				} else {
					document.getElementById('codCoop_718').value = SAL718.CUPS.CTA_CONTAB[0].CTA_CONTAB_CUP + '-' + planc[0].NOMBRE_MAE;
				}
				break;
			case '2':
				planc = $_planCuentas718.filter(cuenta => parseInt(cuenta.LLAVE_MAE) == parseInt(SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP));
				if (planc == '') {
					document.getElementById('codCoop_718').value = '***********';
				} else {
					document.getElementById('codCoop_718').value = SAL718.CUPS.CTA_CONTAB[1].CTA_CONTAB_CUP + '-' + planc[0].NOMBRE_MAE;
				}
				break;
			case '4':
				planc = $_planCuentas718.filter(cuenta => parseInt(cuenta.LLAVE_MAE) == parseInt(SAL718.CUPS.CTA_CONTAB[2].CTA_CONTAB_CUP));
				if (planc == '') {
					document.getElementById('codOficial_718').value = '***********';
				} else {
					document.getElementById('codOficial_718').value = SAL718.CUPS.CTA_CONTAB[2].CTA_CONTAB_CUP + '-' + planc[0].NOMBRE_MAE;
				}
				break;
			case '6':
				planc = $_planCuentas718.filter(cuenta => parseInt(cuenta.LLAVE_MAE) == parseInt(SAL718.CUPS.CTA_CONTAB[2].CTA_CONTAB_CUP));
				if (planc == '') {
					document.getElementById('codPuc_718').value = '***********';
				} else {
					document.getElementById('codPuc_718').value = SAL718.CUPS.CTA_CONTAB[2].CTA_CONTAB_CUP.padStart(12, '0') + '-' + planc[0].NOMBRE_MAE;
				}
				break;
			default:
				planc = $_planCuentas718.filter(cuenta => parseInt(cuenta.LLAVE_MAE) == parseInt(SAL718.CUPS.CTA_CONTAB[0].CTA_CONTAB_CUP));
				if (planc == '') {
					document.getElementById('codPuc_718').value = '***********';
				} else {
					document.getElementById('codPuc_718').value = SAL718.CUPS.CTA_CONTAB[0].CTA_CONTAB_CUP.padStart(12, '0') + '-' + planc[0].NOMBRE_MAE
				}
				break;
		}
	}
	_validarDescripcion718();

}

function _onrestricciones718(params) {
	switch (params.seccion) {
		case 'GRUPOSER':
			if (SAL718.GRUPOSER.COD.toString().trim() == '89' && $_USUA_GLOBAL[0].PUC == '5') {
				toastr.warning('Para consulta de medicina especializada \n use la cta 411027 que el sistema reclasifica x especialidad')
			} else if (params.invalid == '00') {
				document.getElementById('codgrupo_718').value = SAL718.GRUPOSER.COD + ' ' + SAL718.GRUPOSER.DESCRIP;
				_validarCUPS718();
			} else { CON851('01', '01', _validarGrupo718(), 'error', 'error'); }
			break;
		//-----------------------------------------//
		case 'CUPS':
			switch (SAL718.NOVEDADW.trim()) {
				case '7':
					if (params.invalid == '00') { CON851('00', '00', _validarCUPS718(), 'error', 'error'); }
					else {
						if (SAL718.CUPS.LLAVE.substring(0, 2).toUpperCase() != SAL718.GRUPOSER.COD.toUpperCase()) {
							CON851('03', '03', _validarCUPS718(), 'error', 'error');
						} else {
							document.getElementById('codcups_718').value = SAL718.CUPS.LLAVE.substring(2, 12);
							document.getElementById('descripCup_718').value = SAL718.CUPS.DESCRIP;
							_validarDescripcion718();
						}
					}
					break
				case '8':
					if (params.invalid == '01') {
						CON851('01', '01', _validarCUPS718(), 'error', 'error')
					}
					else {
						if (SAL718.CUPS.LLAVE.substring(0, 2) != SAL718.GRUPOSER.COD) {
							CON851('03', '03', _validarCUPS718(), 'error', 'error');
						} else {
							document.getElementById('codcups_718').value = SAL718.CUPS.LLAVE.substring(2, 12);
							document.getElementById('descripCup_718').value = SAL718.CUPS.DESCRIP;
							on_llenarFormCups718();
						}

					}
					break;
				case '9':
					if (params.invalid == '01') { CON851('01', '01', _validarCUPS718(), 'error', 'error'); }
					else { _eliminarCups718() }
					break;
			}
			break;

		//-----------------------------------------//
		case 'COSTO':
			if (params.invalid == '01') { CON851('01', '01', _validarCentroCost718(), 'error', 'error'); }
			else {
				document.getElementById('centrocosto_718').value = SAL718.COSTO.COD + ' ' + SAL718.COSTO.NOMBRE; validarEdadMin718();
			}
			break;

		//-----------------------------------------//
	}

}
