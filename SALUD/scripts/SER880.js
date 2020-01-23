/*CREACION TURNO TRIAGE*/
/*2020/01/14 PO - PABLO OLGUIN -> CREACION TURNO TRIAGE*/

var SER880 = new Array(); SER880.PACI = [];
//--------------------------- MASCARAS ------------------------------//
var idhistoriafactMask = IMask($('#paci_SER880')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });

$(document).ready(function () {
	loader('hide'); _inputControl('reset'); _inputControl('disabled');
	_toggleF8([{ input: 'paci', app: 'SER880', funct: FNFPacientes_SER880 }]);
	validarPaciente_SER880();
})
//----------------------------- FNF8 FUNCIONES -----------------------//
function FNFPacientes_SER880(e) {
	// FUNCIONES FN-F8
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		parametros = {
			dll: 'PACIENTES',
			valoresselect: ['Nombre del paciente'],
			f8data: 'PACIENTES',
			columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }, { title: 'EDAD' }],
			callback: data => { idhistoriafactMask.typedValue = data.COD; _enterInput('#paci_SER880'); },
			cancel: () => { $('#paci_SER880').focus(); }
		};
		F8LITE(parametros);
		// FUNCIONESFN-F2
	} else if (e.type == "keydown" && e.which == 113 || e.type == 'click') { HC810(validarPaciente_SER880, cargarCampos_SER880); }
	// FUNCIONES FN-F4
	else if (e.type == "keydown" && e.which == 115 || e.type == 'click') { jAlert({ titulo: 'Advertencia ', mensaje: 'LLama al SER810W [Fase: Desarrollo]' }, validarPaciente_SER880) }

}
function validarPaciente_SER880() {
	validarInputs({
		form: "#paciSER880",
		orden: '1'
	}, _toggleNav, () => {
		const idpaci = idhistoriafactMask.unmaskedValue;
		var datos_envio = datosEnvio() + idpaci.toString().padStart(15, '0');
		postData({
			datosh: datos_envio
		}, get_url("APP/SALUD/SER810-1.DLL"))
			.then((data) => {
				if (data['REG-PACI'][0].COD.trim() == '') { CON851('01', '01', validarPaciente_SER880(), 'error', 'error'); }
				else {
					bootbox.confirm({
						size: "small",
						message: 'El código digitado no existe, ¿Desea crearlo?',
						animate: false,
						callback: function (result) { /* result is a boolean; true = OK, false = Cancel*/
							if (result == undefined) { validarPaciente_SER880(); }
							else {
								if (result == true) {
									let { ipcRenderer } = require("electron");
									ipcRenderer.send('another', 'SALUD/PAGINAS/SER110C.html');
									vector = ['on', 'Creando nuevo paciente...']
									_EventocrearSegventana(vector, validarPaciente_SER880);
								}
								else { validarPaciente_SER880() }
							}
						}
					})
				}
			})
			.catch((error) => {
				console.log(error)
			});
	})
}
function cargarCampos_SER880() {
	SER880.PACI.EDAD = calcular_edad(SER880.PACI.NACIM);
	SER880.PACI.SEXO == '' ? document.getElementById('sexopaci_SER880').value = ' ' : document.getElementById('sexopaci_SER880').value = SER880.PACI.SEXO;
	SER880.PACI.EDAD == '' ? document.getElementById('edadpaci_SER880').value = ' ' : document.getElementById('edadpaci_SER880').value = SER880.PACI.EDAD.vlr_edad + ' ' + SER880.PACI.EDAD.unid_edad;
	SER880.PACI.DERECHO == '' ? document.getElementById('estadopaci_SER880').value = ' ' : document.getElementById('estadopaci_SER880').value = SER880.PACI.DERECHO + ' ' + consultder_paci(SER880.PACI.DERECHO);
	SER880.PACI['APELL-PACI1'] == '' ? document.getElementById('apell1_SER880').value = ' ' : document.getElementById('apell1_SER880').value = SER880.PACI['APELL-PACI1'];
	SER880.PACI['APELL-PACI2'] == '' ? document.getElementById('apell2_SER880').value = ' ' : document.getElementById('apell2_SER880').value = SER880.PACI['APELL-PACI2'];
	SER880.PACI['NOM-PACI1'] == '' ? document.getElementById('nomb1_SER880').value = ' ' : document.getElementById('nomb1_SER880').value = SER880.PACI['NOM-PACI1'];
	SER880.PACI['NOM-PACI2'] == '' ? document.getElementById('nomb2_SER880').value = ' ' : document.getElementById('nomb2_SER880').value = SER880.PACI['NOM-PACI2'];

	let ent1 = '', ent2 = '';
	SER880.PACI['EPS'] == '' ? ent1 = ' ' : ent1 = SER880.PACI['EPS'];
	SER880.PACI['NIT-FACT'] == '' ? ent2 = ' ' : ent2 = SER880.PACI['NIT-FACT'];

	let datos_envio1 = datosEnvio() + localStorage['Usuario'] + '|' + ent1;
	SolicitarDll({ datosh: datos_envio1 }, data => {
		let res = data.split('|');
		if (res[0] = '00') { document.getElementById('entidafil_SER880').value = res[1] } else { document.getElementById('entidafil_SER880').value = '' }
	}, get_url('APP/CONTAB/CON110C_07.DLL'));

	//Entidad facturación
	let datos_envio2 = datosEnvio() + localStorage['Usuario'] + '|' + ent2;
	SolicitarDll({ datosh: datos_envio2 }, data => {
		let res = data.split('|');
		if (res[0] = '00') { document.getElementById('entidafact_SER880').value = res[1]; } else { document.getElementById('entidafact_SER880').value = ' '; }
	}, get_url('APP/CONTAB/CON110C_01.DLL'));
	validarTrauma_SER880();
}

function validarTrauma_SER880() {
	validarInputs({
		form: "#traumSER880",
		orden: '1'
	}, validarTrauma_SER880, () => {
		const pTrauma = document.getElementById('traum_SER880').value.toString().toUppercase();
		if (pTrauma == '') CON851('03', '03', validarTrauma_SER880(), 'error', 'error');
		else if (['N', 'S'].find(opc => opc == pTrauma) != -1) validarRemitido_SER880();
		else CON851('03', '03', validarTrauma_SER880(), 'error', 'error');
	})
}

function validarRemitido_SER880() {
	validarInputs({
		form: "#remitidoSER880",
		orden: '1'
	}, validarRemitido_SER880, () => {
		const pRemitido = document.getElementById('remitido_SER880').value.toString().toUppercase();
		if (pRemitido == '') CON851('03', '03', validarRemitido_SER880(), 'error', 'error');
		else if (['N', 'S'].find(opc => opc == pRemitido) != -1) validarMedicolegal_SER880();
		else CON851('03', '03', validarRemitido_SER880(), 'error', 'error');
	})
}

function validarMedicolegal_SER880() {
	validarInputs({
		form: "#medlegalSER880",
		orden: '1'
	}, validarMedicolegal_SER880, () => {
		const pMedlegal = document.getElementById('medlegal_SER880').value.toString().toUppercase();
		if (pMedlegal == '') CON851('03', '03', validarMedicolegal_SER880(), 'error', 'error');
		else if (['N', 'S'].find(opc => opc == pMedlegal) != -1) validarReingreso_SER880();
		else CON851('03', '03', validarMedicolegal_SER880(), 'error', 'error');
	})
}

function validarReingreso_SER880() {
	validarInputs({
		form: "#reingrSER880",
		orden: '1'
	}, validarReingreso_SER880, () => {
		const pReingreso = document.getElementById('reingr_SER880').value.toString().toUppercase();
		if (pReingreso == '') CON851('03', '03', validarReingreso_SER880(), 'error', 'error');
		else if (['N', 'S'].find(opc => opc == pReingreso) != -1) validarTurno_SER880();
		else CON851('03', '03', validarReingreso_SER880(), 'error', 'error');
	})
}

function validarTurno_SER880() {
	validarInputs({
		form: "#turnoSER880",
		orden: '1'
	}, validarTurno_SER880, () => {
		const pTurno = document.getElementById('turno_SER880').value.toString().toUppercase();
		if (pTurno == '') CON851('03', '03', validarTurno_SER880(), 'error', 'error');
		else if (['N', 'S'].find(opc => opc == pTurno) != -1) validarEmbar_SER880();
		else CON851('03', '03', validarTurno_SER880(), 'error', 'error');
	})
}

function validarEmbar_SER880() {
	validarInputs({
		form: "#embarSER880",
		orden: '1'
	}, validarTurno_SER880, () => {
		const pEmbar = document.getElementById('embar_SER880').value.toString().toUppercase();
		if (pEmbar == '') CON851('03', '03', validarEmbar_SER880(), 'error', 'error');
		else if (['N', 'S'].find(opc => opc == pEmbar) != -1) HC810();
		else CON851('03', '03', validarEmbar_SER880(), 'error', 'error');
	})
}

function on_restriccionesSER880() {
switch (key) {
	case value:
		
		break;

	default:
		break;
}
}