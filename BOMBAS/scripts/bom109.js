var $_FORMATO_109, $_LISTADO_109,
    $_RANGO = [], $_IDX_ACTUAL = 0;

$(document).ready(function () {
    loader('hide');
    _inputControl('reset');
    _inputControl('disabled');

    $('#formatoImpresion_109').select2().on('select2:select', validarFormato);
    setTimeout(function () { $('#formatoImpresion_109').select2('open') }, 500)
    // $('#logo_url').attr('src', $_RUTA_LOGO);
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
    SolicitarDll({ datosh: datosEnvio() }, on_movimientoDiario, get_url("app/bombas/BOM109.DLL"));
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
        _formatRango_109
    )
}

function _formatRango_109() {
    var comprobanteInicial = document.getElementById('comprobanteInicial').value.padStart(6, "0"),
        comprobanteFinal = document.getElementById('comprobanteFinal').value.padStart(6, "0"),
        actual = comprobanteInicial;


    while (actual <= parseFloat(comprobanteFinal)) {
        $_RANGO.push(actual.toString().padStart(6, "0"))
        actual = parseFloat(actual) + 1;
    }

    _enviarDatos_109()
}

function _enviarDatos_109() {
    validarDetallado_109()
}

function validarDetallado_109() {
    validarInputs(
        {
            form: '#fase2',
            orden: '1'
        },
        () => {
            $('#contenido table#tabla-principal tbody').html('');
            $('#contenido table#tabla-secundaria tbody').html('');
            habilitarFormato();
            $_RANGO = [];
            $_IDX_ACTUAL = 0;
        },
        on_validarDetallado_109
    )
}

function on_validarDetallado_109() {
    var comprobante = $_RANGO[$_IDX_ACTUAL]
    var detallado = espaciosIzq($('#detallado').val(), 1)
    console.log(comprobante)

    var datos_envio = datosEnvio() + comprobante + '|' + comprobante + '|' + detallado + '|';
    loader('show');
    SolicitarDll({ datosh: datos_envio }, on_enviarDatos_109, get_url("app/BOMBAS/BOM111.DLL"));
}

function on_enviarDatos_109(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
        let nitEmpresa = $_USUA_GLOBAL[0].NIT.toString().trim();
        // let comprobanteInicial = $('#comprobanteInicial').val();

        res.push(nombreEmpresa);
        res.push(nitEmpresa);
        res.push($_RANGO[$_IDX_ACTUAL]);
        res.push($_USUA_GLOBAL[0].NIT.toString().padStart(10, "0"));

        var date = new Date(),
            str = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();

        var opcionesImpresiones = {
            datos: get_url('TEMP/SC-LISTVENT-' + localStorage.Sesion + '.JSON'),
            extra: { totales: res },
            tipo: '',
            formato: 'bombas/bom109.formato.html',
            nombre: 'LISTADO-VENT-COMBUST-' + str
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
    console.log($_IDX_ACTUAL, $_RANGO.length - 1)
    loader('hide');
    if ($_IDX_ACTUAL != ($_RANGO.length - 1)) {
        $_IDX_ACTUAL = $_IDX_ACTUAL + 1;
        _enviarDatos_109()
    } else {
        $('#contenido table#tabla-principal tbody').html('');
        $('#contenido table#tabla-secundaria tbody').html('');
        habilitarFormato();
    }
}