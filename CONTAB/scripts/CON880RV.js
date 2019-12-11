var CON880RV = ['OPER_RECOR_DESTW', 'ESTADO_RECORW', 'FECHA_RECORW', 'HORA_RECORW', 'ORIGEN_RECORW'];
CON880RV.ORIGEN_RECORW = ['OPER_ORIGW', 'FECHA_ORIGW', 'HORA_ORIGW', 'MENSAJE1W'];

// * BUSCA EL ARCHIVO DE CONFIGURACION DE IMPRESORAS.
// * DEVUELVE LA UNIDAD DONDE ESTA EL PROG, NRO COPIAS RBO CAJA
console.log("CALL CON899")

// *MUESTRA LOS RECORDATORIOS POR USUARIO.
function get_Recordatorios_CON880RV(callback) {
	// Abrir notificaciones
	datos_envio = datosEnvio() + localStorage['Usuario'] + "|";
	//LEER RECORDATORIOS
	var URL = get_url("APP/CONTAB/CON880RV.DLL");
	postData({
			datosh: datosEnvio() + localStorage["Usuario"].trim()
		}, URL)
		.then((data) => {
			// MOSTRAR DATOS
			data.RECORDATORIOS.length > 0 ?
				_ventanaDatos({
					titulo: `${localStorage['Usuario']}  TIENE RECORDATORIOS`,
					columnas: [
						"FECHA_ORIGEN",
						"HORA_ORIGEN",
						"IDOPERADOR_ORIGEN",
						"NOMBREOPER_ORIGEN",
						"ESTADO",
						"MENSAJE"
					],
					data: data['RECORDATORIOS'],
					orden: false,
					callback_esc: function () {
						document.getElementById("campo").focus();
					},
					callback: function (data) {
						let params = {
							size: 1,
							titulo: 'Recordatorios: ' + localStorage['Usuario'],
							datos: data,
							function: callback
						}
						ventanaRecordatorios(params);
					}
				}) : callback
		})
		.catch((error) => {
			console.log(error)
		});
}

// IF FNF1 CALL "CON880R" USING ADMIN-W OPER-ORIG-RECOR
// GO TO ACEPTAR-OPCION
// ELSE
// IF FNF5
// GO TO OCULTAR-MENSAJE
// ELSE
// IF FNF2
// PERFORM MOSTRAR-PDF
// ELSE
// GO TO APLAZAR-FECHA
// END-IF
// END-IF
// END-IF.

function ventanaRecordatorios(parametros) {
	var boxRecordatorios = bootbox.dialog({
		size: parametros.size,
		onEscape: true,
		title: parametros.titulo,
		message: '<div class="portlet">' +
			'<div class="portlet-title">' +
			'<div class="caption">' +
			'<i class="fal fa-bell"></i>Recordatorio seleccionado' +
			'</div>' + // cierra portlet title
			'<div class="portlet-body">' + `<span>admin: +${localStorage['usuario']}  &gt;  ${localStorage['Nombre']} </span>` +
			+'</br>' +
			+'<div class="col-md-3">' +
			`<h3>${parametros.datos.NOMBREOPER_ORIGEN}[${parametros.datos.IDOPERADOR_ORIGEN}]</h3>` +
			'<span>' + `Hora:  ${parametros.datos.HORA_ORIGEN}` + '</span>' +
			'</div>' +
			+'<div class="col-md-3">' +
			'<span>' + `Fecha:  ${parametros.datos.FECHA_ORIGEN}` + '</span>' +
			'</div>' +
			+'<div class="col-md-3">' +
			'<span>' + `Operador:  ${parametros.datos.FECHA_ORIGEN}` + '</span>' +
			'</div>' +
			+'<div class="col-md-3">' +
			'<span>' + `Estado:  ${parametros.datos.ESTADO}` + '</span>' +
			'</div>' +
			'<div class="col-md-12">' + `Mensaje:  ${parametros.datos.MENSAJE}` + '</div>' +
			'</div>' + //cierrra portlet body
			'</div>' //cierrra portlet
			,
		buttons: {
			main: {
				label: 'Aceptar',
				className: 'btn-primary',
				callback: parametros.function
			}
		}
	});
	// por si se necesita iniciar una funcion en el PopUp boxRecordatorios.init();
	boxRecordatorios.on('show.bs.modal', parametros.function)
}