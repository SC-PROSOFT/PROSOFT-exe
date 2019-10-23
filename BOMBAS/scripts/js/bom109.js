var $_FORMATO_109, $_LISTADO_109;

$(document).ready(function () {
    loader('hide');
    _inputControl('reset');
    _inputControl('disabled');

    $('#formatoImpresion_109').select2().on('select2:select', validarFormato);
    setTimeout(function () { $('#formatoImpresion_109').select2('open') }, 500)
    $('#logo_url').attr('src', $_RUTA_LOGO);
});

function habilitarFormato() {
    _inputControl('reset');
    $('#formatoImpresion_109').val(null).removeAttr('disabled').trigger('change');
    $('#formatoImpresion_109').select2('open')
}

function validarFormato(e) {
    var seleccionado = e.params.data.id;
    var seleccionado = $(this).val();
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_109 = 'PDF';
        else if (seleccionado == "2") $_FORMATO_109 = 'CSV';

        $(this).attr('disabled', 'true');

        movimientoDiario();
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function movimientoDiario() {
    SolicitarDll({ datosh: datosEnvio() }, on_movimientoDiario, get_url("app/BOM109.DLL"));
}

function on_movimientoDiario(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        $('#comprobanteInicial').val(res[1].trim().replace(/^0+/, ''))
        $('#comprobanteFinal').val(res[2].trim())
        validarFase1_109('1');
    } else {
        plantillaError(res[0], res[1], res[2], function () { habilitarFormato() });
    }
}

function validarFase1_109(orden) {
    validarInputs(
        {
            form: '#fase1',
            orden: orden
        },
        habilitarFormato,
        _enviarDatos_109
    )
}

function _enviarDatos_109() {
    var comprobanteInicial = cerosIzq($('#comprobanteInicial').val(), 6);
    var comprobanteFinal = cerosIzq($('#comprobanteInicial').val(), 6)
    var detallado = espaciosIzq($('#detallado').val(), 1)

    var datos_envio = datosEnvio() + comprobanteInicial + '|' + comprobanteFinal + '|' + detallado + '|';
    loader('show');
    SolicitarDll({ datosh: datos_envio }, on_enviarDatos_109, get_url("app/BOM111.DLL"));
}

function on_enviarDatos_109(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        let nombreEmpresa = $datosUsuar[1].trim();
        let nitEmpresa = $datosUsuar[2].trim();
        let comprobanteInicial = $('#comprobanteInicial').val();

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

        if ($_FORMATO_109 == 'PDF') {
            opcionesImpresiones.tipo = 'pdf';
            imprimir(opcionesImpresiones, finImpresion_109)
        } else if ($_FORMATO_109 == 'CSV') {
            opcionesImpresiones.tipo = 'csv';
            imprimir(opcionesImpresiones, finImpresion_109)
        }
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], function () { validarFase1_109('1') });
    }
}

function finImpresion_109() {
    loader('hide');
    $('#contenido table#tabla-principal tbody').html('');
    $('#contenido table#tabla-secundaria tbody').html('');
    habilitarFormato();
}