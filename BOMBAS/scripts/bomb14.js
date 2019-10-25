var $_FORMATO_014, $_LISTADO_014;

$(document).ready(function () {
    loader('hide');
    _inputControl('reset');
    _inputControl('disabled');

    $('#formatoImpresion_014').select2().on('select2:select', validarFormato_014);
    setTimeout(function () { $('#formatoImpresion_014').select2('open') }, 500)
});

function habilitarFormato_014() {
    _inputControl('reset');
    $('#formatoImpresion_014').val(null).removeAttr('disabled').trigger('change');
    $('#formatoImpresion_014').select2('open')
}

function validarFormato_014(e) {
    var seleccionado = e.params.data.id;
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_014 = 'PDF';
        else if (seleccionado == "2") $_FORMATO_014 = 'CSV';

        $(this).attr('disabled', 'true');

        var fecha = new Date();
        var year = fecha.getFullYear()
        year = String(year).substr(2, 4);
        var mes = fecha.getMonth() + 1;
        var dia = fecha.getDate();

        $('#añoInicial, #añoFinal').val(year);
        $('#mesInicial, #mesFinal').val(mes);
        $('#diaInicial, #diaFinal').val(dia);
        validarFechas_014('1')
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function validarFechas_014(orden) {
    validarInputs(
        {
            form: '#validarFechas',
            orden: orden
        },
        function () { habilitarFormato_014(); },
        _enviarDatos_014
    )
}

function _enviarDatos_014() {
    var sesion = localStorage.Sesion;

    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2)
    var diaInicial = cerosIzq($('#diaInicial').val(), 2)
    var fechaInicial = añoInicial + mesInicial + diaInicial;

    var añoFinal = cerosIzq($('#añoFinal').val(), 2);
    var mesFinal = cerosIzq($('#mesFinal').val(), 2)
    var diaFinal = cerosIzq($('#diaFinal').val(), 2)
    var fechaFinal = añoFinal + mesFinal + diaFinal;

    var datos_envio = datosEnvio();
    datos_envio += fechaInicial;
    datos_envio += '|';
    datos_envio += fechaFinal;

    loader('show');
    console.debug(datos_envio)
    SolicitarDll({ datosh: datos_envio }, on_enviarDatos_014, get_url("app/bombas/BOMB14.DLL"));
}

function on_enviarDatos_014(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        // Configurar página        

        var añoInicial = cerosIzq($('#añoInicial').val(), 2);
        var mesInicial = cerosIzq($('#mesInicial').val(), 2);
        mesInicial = evaluarMes(mesInicial);
        var diaInicial = cerosIzq($('#diaInicial').val(), 2);
        let fechaDesde = 'Desde: ' + mesInicial + ' ' + diaInicial + '/' + añoInicial;

        var añoFinal = cerosIzq($('#añoFinal').val(), 2);
        var mesFinal = cerosIzq($('#mesFinal').val(), 2)
        mesFinal = evaluarMes(mesFinal);
        var diaFinal = cerosIzq($('#diaFinal').val(), 2)
        let fechaHasta = 'Hasta: ' + mesFinal + ' ' + diaFinal + '/' + añoFinal;

        let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();

        res.push(nombreEmpresa)
        res.push(fechaDesde)
        res.push(fechaHasta)
        res.push($_USUA_GLOBAL[0].NIT.toString().padStart(10, "0"))

        var opcionesImpresiones = {
            datos: get_url('temp/SC-LISTGAL-' + localStorage.Sesion + '.JSON'),
            extra: { totales: res },
            tipo: '',
            formato: 'bombas/bomb14.formato.html',
            nombre: 'LISTADO-GALONAJExVEND-' + localStorage.Sesion
        };

        if ($_FORMATO_014 == 'PDF') {
            opcionesImpresiones.tipo = 'pdf';
            imprimir(opcionesImpresiones, finImpresion_014)
        } else if ($_FORMATO_014 == 'CSV') {
            opcionesImpresiones.tipo = 'csv';
            imprimir(opcionesImpresiones, finImpresion_014)
        }
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], function () { validarFechas_014('6') });
    }
}

function finImpresion_014() {
    loader('hide');
    $('#contenido table tbody').html('');
    habilitarFormato_014();
}

