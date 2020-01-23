/* NOMBRE RM --> SER405 // NOMBRE ELECTR --> SAL451 */
/* PO - PABLO OLGUIN 09/01/2020 -> CREACION*/
var SAL451 = new Array(), $_unser451 = ''; SAL451.UNSER = [];
//----------------------------Mascaras -----------------------------------//
function mascarasFecha451() {
	fechaDesdeMask = IMask($("#fechadesde_451")[0], {
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

	fechaHastaMask = IMask($("#fechahasta_451")[0], {
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
}//---------------------------------------------------------------------//

$(document).ready(function () {
	loader('hide');
	_inputControl('reset'); _inputControl('disabled');
	_toggleF8([{ input: 'unser', app: '451', funct: _ventanaUnser451 }]);
	obtenerDatosCompletos({ nombreFd: 'UNSERV' }, (data) => {
		$_unser451 = data.UNSERV;
		toastr.warning('Si digita "**" \n la consulta se hará en todas las unidades de servicio');
		mascarasFecha451();
		document.getElementById('fechadesde_451').value = moment().format('YYYY/MM/DD');
		// validarUnser451();
		FNF2SAL41_451();
	}, 'ONLY')
});
//-------------------------Arreglo temporal F2 SAL41-------------------------//
function FNF2SAL41_451(){
	let { ipcRenderer } = require("electron");
	ipcRenderer.send('another', 'SALUD/PAGINAS//SER880.html');
	vector = ['on', 'Añadiendo paciente a Triage...']
	_EventocrearSegventana(vector, validarUnser451);
}
//------------------------ Funciones FNF8 -----------------------------------//
// F8 UNIDADES DE SERVICIO //
function _ventanaUnser451(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE UNIDADES DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_unser451,
			callback_esc: () => { validarUnser451() },
			callback: (data) => {
				SAL451.UNSER.COD = data.COD.toUpperCase(); SAL451.UNSER.DESCRIP = data.DESCRIP;
				document.getElementById('unser_451').value = SAL451.UNSER.COD + ' - ' + SAL451.UNSER.DESCRIP;
				validarFechaDesde451();
			}
		});
	}
}

function validarUnser451() {
	validarInputs({
		form: "#unser451",
		orden: '1'
	}, validarUnser451,
		() => {
			if (document.getElementById('unser_451').value == '**') { SAL451.UNSER = $_unser451; validarFechaDesde451(); }
			else {
				let unser = $_unser451.filter(und => und.COD = document.getElementById('unser_451').value.substring(0, 2))
				if (unser == '') CON851('03', '03', validarUnser451(), 'error', 'error'); else { SAL451.UNSER = unser[0]; validarFechaDesde451(); }
			}
		})
}

function validarFechaDesde451() {
	validarInputs({
		form: "#fechadesde451",
		orden: '1'
	}, validarUnser451, () => {
		if (parseInt(fechaDesdeMask._value) > parseInt(moment().format('YYYYMMDD'))) {
			CON851('03', '03', validarFechaDesde451(), 'error', 'error');
		} else {
			validarFechaHasta451(); SAL451.DESDE = parseInt(fechaDesdeMask._value);
		}
	})
}
function validarFechaHasta451() {
	validarInputs({
		form: "#fechahasta451",
		orden: '1'
	}, validarFechaDesde451, () => {
		if (parseInt(fechaHastaMask._value) < parseInt(fechaDesdeMask._value)) {
			CON851('03', '03', validarFechaHasta451(), 'error', 'error');
		} else {
			SAL451.HASTA = parseInt(fechaHastaMask._value);
			consultarEventosPendientes451();
		}
	})
}

function consultarEventosPendientes451() {
	CON851P('55', () => {
		SAL451.SW_MARCA = 'N';
		CON851P('55', () => { SAL451.SW_EVOL = 'N'; SAL451.SELECCION = PendientesFNF8_451() }, () => {
			SAL451.SW_EVOL = 'S'; SAL451.SELECCION = PendientesFNF8_451()
		})
	}, () => {
		SAL451.SW_MARCA = 'S';
		CON851P('56', () => { SAL451.SW_EVOL = 'N'; SAL451.SELECCION = PendientesFNF8_451() }, () => {
			SAL451.SW_EVOL = 'S'; SAL451.SELECCION = PendientesFNF8_451()
		})
	})

}

function PendientesFNF8_451() {
	let retorno = '';
	SER818({ SWMARCA: SAL451.SW_MARCA, SWEVOL: SAL451.SW_EVOL, DESDE: SAL451.DESDE, HASTA: SAL451.HASTA }, validarFechaDesde451, (data) => { retorno = data })
	return retorno;
}

function ImpPendientesPorFacturar451() {

}

//Llama programa de apertura de facturacion
function SER108() {
	let { ipcRenderer } = require("electron");
	ipcRenderer.send('another', 'SALUD/PAGINAS//SER108.html');
	vector = ['on', 'Creando apertura de facturación...']
	_EventocrearSegventana(vector, _Revisardato_41);

}