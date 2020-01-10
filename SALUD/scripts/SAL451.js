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
		$_unser451 = data.CODIGOS;
		toastr.warning('Si digita "**" \n la consulta se hará en todas las unidades de servicio');
		mascarasFecha451();
		document.getElementById('fechadesde_451').value = moment().format('YYYY/MM/DD');
		validarUnser451();
	}, 'ONLY')
});

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
				SAL718.UNSER.COD = data.COD.toUpperCase(); SAL718.UNSER.DESCRIP = data.DESCRIP;
				document.getElementById('unser_451').value = SAL718.GRUPOSER.COD + ' - ' + SAL718.GRUPOSER.DESCRIP;
				validarFechaProceso451();
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
		if (fechaDesdeMask._value > moment().format('YYYYMMDD')) {
			CON851('03', '03', validarFechaDesde451(), 'error', 'error');
		} else validarFechaHasta451();
	})
}
function validarFechaHasta451() {
	validarInputs({
		form: "#fechahasta451",
		orden: '1'
	}, validarFechaDesde451, () => {
		if (fechaHastaMask._value > fechaDesdeMask._value) CON851('03', '03', validarFechaHasta451(), 'error', 'error');
		else consultarEventosPendientes451();
	})
}

function consultarEventosPendientes451() {

}

function ImpPendientesPorFacturar451(){
	
}