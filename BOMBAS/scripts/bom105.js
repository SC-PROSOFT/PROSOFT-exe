var $_SURTIDORES_105,
    $_DATOS_TABLA_105,
    $_INFO_COMP_105,
    $_FORMATO_105,
    $_LISTADO_105;

$(document).ready(function () {
    loader('hide');
    _init_105();
    $('#formatoImpresion').select2().on('select2:select', validarFormato_105);
    $('#logo_url').attr('src', $_RUTA_LOGO);
});

function habilitarFormato_105() {
    $('#formatoImpresion').val(null).removeAttr('disabled').trigger('change');
    $('#formatoImpresion').select2('open')
}

function _init_105() {
    _inputControl('reset');
    _inputControl('disabled');
    $('#tablaVenta tbody').html('')
    $('#tablaVales tbody').html('')

    $('#galonajeTablaVenta').html('');
    $('#ventaTablaVenta').html('');
    $('#totalTablaVales').html('');

    validarComprobante();
}

function validarComprobante() {
    validarInputs(
        { form: '#validarComprobante', orden: '1' },
        _toggleNav,
        function () {
            loader('show');
            var comprobante = $('#numComprobante').val() ? $('#numComprobante').val() : '0';
            $('#numComprobante').val(cerosIzq(comprobante, 5));

            var datos_envio = datosEnvio() + cerosIzq(comprobante, 6) + "|";

            SolicitarDll({ datosh: datos_envio }, on_validarComprobante, get_url("app/BOM105.DLL"));
        }
    )
}

function on_validarComprobante(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-LISTCOMB-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_SURTIDORES_105 = data.SURTIDORES;
                $_SURTIDORES_105.pop();
                $_DATOS_TABLA_105 = data['TBLA-DEUD'];
                $_INFO_COMP_105 = res;

                var arrayEliminar = [];
                arrayEliminar.push('SC-LISTCOMB-' + localStorage.Sesion)
                _eliminarJson(arrayEliminar, on_eliminarJson_105);
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], validarComprobante);
    }
}

function on_eliminarJson_105(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        _llenarDatos_105();
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function _llenarDatos_105() {
    let fecha = $_INFO_COMP_105['2'].trim();
    let año = fecha.substr(0, 2);
    $('#añoInicial').val(año);

    let mes = fecha.substr(2, 2);
    $('#mesInicial').val(mes);

    let dia = fecha.substr(4, 6);
    $('#diaInicial').val(dia);

    let turno = $_INFO_COMP_105['3'].trim();
    $('#turno').val(turno);

    let detalle = $_INFO_COMP_105['4'].trim();
    $('#detalle').val(detalle);

    let totalGalonaje = $_INFO_COMP_105['7'].trim();
    $('#galonajeTablaVenta').html(totalGalonaje);

    let totalVenta = $_INFO_COMP_105['8'].trim();
    $('#ventaTablaVenta').html(totalVenta);
    $('#totalCombustible').val(totalVenta);

    let totalFinanciacion = $_INFO_COMP_105['9'].trim();
    $('#totalFinanciacion').val(totalFinanciacion);

    let totalVales = $_INFO_COMP_105['10'].trim();
    $('#totalTablaVales').html(totalVales);
    $('#totalCreditos').val(totalVales);

    let totalCheques = $_INFO_COMP_105['11'].trim();
    $('#totalCheques').val(totalCheques);

    let totalEfectivo = $_INFO_COMP_105['12'].trim();
    $('#totalEfectivo').val(totalEfectivo);

    if (detalle != 'ANULADO') _llenarTablaSurtidores_105();
    else validarComprobante();

}

function _llenarTablaSurtidores_105() {
    for (var i in $_SURTIDORES_105) {
        let item = $_SURTIDORES_105[i].SURTI.trim() ? $_SURTIDORES_105[i].SURTI.trim() : false;
        if (item) {
            $('#tablaVenta tbody').append(''
                + '<tr>'
                + ' <td>' + item + '</td>'
                + ' <td>' + $_SURTIDORES_105[i].CANTID.trim() + '</td>'
                + ' <td>' + $_SURTIDORES_105[i].VALOR.trim() + '</td>'
                + '</tr>'
            )
        }
    }

    _llenarTablaVales_105();
}

function _llenarTablaVales_105() {
    for (var i in $_DATOS_TABLA_105) {
        if ($_DATOS_TABLA_105[i].COD.trim().length > 0) {
            let item = parseInt(i) + parseInt(1);
            $('#tablaVales tbody').append(''
                + '<tr>'
                + ' <td>' + cerosIzq(item, 3) + '</td>'
                + ' <td>' + $_DATOS_TABLA_105[i].COD.trim() + '</td>'
                + ' <td>' + $_DATOS_TABLA_105[i].NIT.trim() + '</td>'
                + ' <td>' + $_DATOS_TABLA_105[i].DOCUM.trim() + '</td>'
                + ' <td>' + $_DATOS_TABLA_105[i].VLR.trim() + '</td>'
                + ' <td>' + $_DATOS_TABLA_105[i].DESCRIP.trim().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' ') + '</td>'
                + '</tr>'
            )
        }
    }

    _validacionFinal_105();
}

function _validacionFinal_105() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            _popupImpresion();
        } else {
            _init_105();
        }
    }, {
            msj: '00',
            overlay_show: false
        })
}

function _popupImpresion() {
    $('#abrirPopupBtn').click();
    setTimeout(function () { $('#formatoImpresion').select2('open') }, 500)
}

function validarFormato_105(e) {
    var seleccionado = e.params.data.id;
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_105 = 'PDF';
        else if (seleccionado == "2") $_FORMATO_105 = 'CSV';

        $(this).attr('disabled', 'true');

        _validarPregunta_105();
    } else {
        $(this).attr('disabled', 'true');
        $('#closePopup').click();
        _init_105();
    }
}

function _validarPregunta_105() {
    validarInputs(
        { form: '#preguntaImpresion', orden: '1' },
        habilitarFormato_105,
        function () {
            var sesion = localStorage.Sesion;

            var comprobante = cerosIzq($('#numComprobante').val(), 6);
            var detallado = espaciosIzq($('#detallado').val(), 1)

            var datos_envio = datosEnvio() + comprobante + '|' + comprobante + '|' + detallado + "|";
            loader('show');
            SolicitarDll({ datosh: datos_envio }, on_enviarDatos_105, get_url("app/BOM111.DLL"));
        }
    )
}

function on_enviarDatos_105(data) {
    console.debug(data);
    var res = data.split('|');
    if (res[0].trim() == '00') {
        let nombreEmpresa = $datosUsuar[1].trim();
        let nitEmpresa = $datosUsuar[2].trim();
        let comprobanteInicial = $('#numComprobante').val();

        res.push(nombreEmpresa);
        res.push(nitEmpresa);
        res.push(comprobanteInicial);
        res.push($_RUTA_LOGO);

        var opcionesImpresiones = {
            datos: get_url('progdatos/json/SC-LISTVENT-' + localStorage.Sesion + '.JSON'),
            extra: { totales: res },
            tipo: '',
            formato: 'bom109.formato.html',
            nombre: 'LISTADO-VENT-COMBUST-' + localStorage.Sesion
        };

        if ($_FORMATO_105 == 'PDF') {
            opcionesImpresiones.tipo = 'pdf';
            imprimir(opcionesImpresiones, on_finImpresion_105)
        } else if ($_FORMATO_105 == 'CSV') {
            opcionesImpresiones.tipo = 'csv';
            imprimir(opcionesImpresiones, on_finImpresion_105)
        }
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], function () { validarFase1_105('1') });
    }
}

function on_finImpresion_105() {
    loader('hide');
    $('#contenido table#tabla-principal tbody').html('');
    $('#contenido table#tabla-secundaria tbody').html('');
    $('#formatoImpresion').val(null).removeAttr('disabled').trigger('change');
    $('#closePopup').click();
    _init_105();
}