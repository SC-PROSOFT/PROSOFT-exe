var $_FORMATO_110, $_LISTADO_110, $_LST_ART_110;

$(document).ready(function () {
    loader('hide');
    _inputControl('reset');
    _inputControl('disabled');

    //$('#formatoImpresion').selectric().change(validarFormato_110);
    $('#formatoImpresion').select2().on('select2:select', validarFormato_110);
    setTimeout(function () { $('#formatoImpresion').select2('open') }, 500)
    $('#logo_url').attr('src', $_USUA_GLOBAL[0].RUTA_LOGO);
});

function habilitarFormato_110() {
    _inputControl('reset');
    $('#formatoImpresion').val(null).removeAttr('disabled').trigger('change');
    $('#formatoImpresion').select2('open')
}

function validarFormato_110() {
    var seleccionado = $(this).val();
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_110 = 'PDF';
        else if (seleccionado == "2") $_FORMATO_110 = 'CSV';

        $(this).attr('disabled', 'true');

        $('#turno').val('*');
        $('#sucursal').val('1');
        var today = new Date();
        var yyyy = today.getFullYear();
        $('#añoInicial').val(yyyy.toString().substring(2, 4))


        validarFechas_110('1')
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function validarFechas_110(orden) {
    setTimeout(function () {
        validarInputs(
            {
                form: '#validarFechas',
                orden: orden
            },
            habilitarFormato_110,
            _validarFecha_envio
        );
    }, 100);
}

function _validarFecha_envio() {
    var sesion = localStorage.Sesion;

    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2);
    var diaInicial = cerosIzq($('#diaInicial').val(), 2);
    var fechaEnvio = añoInicial + mesInicial + diaInicial;

    var datos_envio = datosEnvio() + fechaEnvio + '|';
    SolicitarDll({ datosh: datos_envio }, on_validarFecha_envio_110, get_url("app/bombas/BOM110.DLL"));
}

function on_validarFecha_envio_110(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var añoInicial = cerosIzq($('#añoInicial').val(), 2);
        var mesInicial = cerosIzq($('#mesInicial').val(), 2);
        $('#añoFinal').val(añoInicial);
        $('#mesFinal').val(mesInicial);
        validarFase1_110('1');
    } else {
        plantillaError(res[0], res[1], res[2], function () { validarFechas_110('1') });
    }
}

function validarFase1_110(orden) {
    setTimeout(function () {
        validarInputs(
            {
                form: '#fase1',
                orden: orden
            },
            function () { validarFechas_110('3'); },
            validarFase2_110
        );
    }, 100);
}

function validarFase2_110() {
    validarInputs(
        {
            form: '#fase2',
            orden: "1"
        },
        function () { validarFase1_110('1'); },
        _enviarDatos_110
    );
}

function _enviarDatos_110() {
    var sesion = localStorage.Sesion;

    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2)
    var diaInicial = cerosIzq($('#diaInicial').val(), 2)
    var fechaInicial = añoInicial + mesInicial + diaInicial;

    var añoFinal = cerosIzq($('#añoFinal').val(), 2);
    var mesFinal = cerosIzq($('#mesFinal').val(), 2)
    var diaFinal = cerosIzq($('#diaFinal').val(), 2)
    var fechaFinal = añoFinal + mesFinal + diaFinal;

    var turno = espaciosIzq($('#turno').val(), 1);
    var sucursal = espaciosIzq($('#sucursal').val(), 1);

    var datos_envio = datosEnvio();
    datos_envio += fechaInicial;
    datos_envio += '|';
    datos_envio += fechaFinal;
    datos_envio += '|';
    datos_envio += turno;
    datos_envio += '|';
    datos_envio += sucursal;
    datos_envio += '|';

    loader('show');
    SolicitarDll({ datosh: datos_envio }, on_enviarDatos_110, get_url("app/bombas/BOM110_1.DLL"));
}

function on_enviarDatos_110(data) {
    console.debug(data);
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var añoInicial = cerosIzq($('#añoInicial').val(), 2);
        var mesInicial = cerosIzq($('#mesInicial').val(), 2)
        var diaInicial = cerosIzq($('#diaInicial').val(), 2)
        var fechaInicial = añoInicial + mesInicial + diaInicial;

        var añoFinal = cerosIzq($('#añoFinal').val(), 2);
        var mesFinal = cerosIzq($('#mesFinal').val(), 2)
        var diaFinal = cerosIzq($('#diaFinal').val(), 2)
        var fechaFinal = añoFinal + mesFinal + diaFinal;

        let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
        let turno = 'Turno: ' + $('#turno').val();
        let fecha = 'Fecha: ' + fechaInicial;

        res.push(nombreEmpresa)
        res.push(turno)
        res.push(fecha)
        res.push(fechaFinal)
        res.push($_USUA_GLOBAL[0].RUTA_LOGO)

        var opcionesImpresiones = {
            datos: get_url('temp/SC-LISTCOMB-' + localStorage.Sesion + '.JSON'),
            extra: { totales: res },
            tipo: '',
            formato: 'bom110.formato.html',
            nombre: 'LISTADO-GALONAJE-' + localStorage.Sesion
        };

        if ($_FORMATO_110 == 'PDF') {
            opcionesImpresiones.tipo = 'pdf';
            imprimir(opcionesImpresiones, finImpresion_110)
        } else if ($_FORMATO_110 == 'CSV') {
            opcionesImpresiones.tipo = 'csv';
            imprimir(opcionesImpresiones, finImpresion_110)
        }
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], function () { validarFechas_110('3') });
    }
}

function finImpresion_110() {
    loader('hide');
    $('#contenido table#tabla-principal tbody').html('');
    $('#contenido table#tabla-secundaria tbody').html('');
    habilitarFormato_110();
}