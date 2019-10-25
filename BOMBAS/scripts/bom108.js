var $_FORMATO, $_LISTADO;

$(document).ready(function () {
    loader('hide');
    _inputControl('reset');
    _inputControl('disabled');

    $('#formatoImpresion').select2().on('select2:select', validarFormato);
    setTimeout(function () { $('#formatoImpresion').select2('open') }, 500)
    $('#logo_url').attr('src', $_USUA_GLOBAL[0].RUTA_LOGO);
});

function habilitarFormato() {
    _inputControl('reset');
    $('#formatoImpresion').val(null).removeAttr('disabled').trigger('change');
    $('#formatoImpresion').select2('open')
}

function validarFormato(e) {
    var seleccionado = e.params.data.id;
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO = 'PDF';
        else if (seleccionado == "2") $_FORMATO = 'CSV';

        $(this).attr('disabled', 'true');

        var fecha = new Date();
        var year = fecha.getFullYear()
        year = String(year).substr(2, 4);
        var mes = fecha.getMonth() + 1;
        var dia = fecha.getDate();

        $('#añoInicial, #añoFinal').val(year);
        $('#mesInicial, #mesFinal').val(mes);
        $('#diaInicial, #diaFinal').val(dia);
        $('#vendedor').val('*');
        $('#isla').val('*');
        $('#turno').val('*');
        $('#imprGalones').val('S');
        setTimeout(function () { validarFechas('1') }, 100);
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function validarFechas(orden) {
    validarInputs(
        {
            form: '#validarFechas',
            orden: orden
        },
        habilitarFormato,
        _validarFecha_envio
    )
}

function _validarFecha_envio() {
    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2)
    var diaInicial = cerosIzq($('#diaInicial').val(), 2)
    var fechaEnvio = añoInicial + mesInicial + diaInicial;

    var datos_envio = datosEnvio() + fechaEnvio + '|';
    SolicitarDll({ datosh: datos_envio }, on_validarFecha_envio, get_url("app/bombas/BOM108_1.DLL"));
}

function on_validarFecha_envio(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        validarFase1_108('1');
    } else {
        plantillaError(res[0], res[1], res[2], function () { validarFechas('1') });
    }
}

function validarFase1_108(orden) {
    validarInputs(
        {
            form: '#fase1',
            orden: orden
        },
        function () { validarFechas('3'); },
        _enviarDatos_108
    )
}

function _enviarDatos_108() {
    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2)
    var diaInicial = cerosIzq($('#diaInicial').val(), 2)
    var fechaInicial = añoInicial + mesInicial + diaInicial;

    var añoFinal = cerosIzq($('#añoFinal').val(), 2);
    var mesFinal = cerosIzq($('#mesFinal').val(), 2)
    var diaFinal = cerosIzq($('#diaFinal').val(), 2)
    var fechaFinal = añoFinal + mesFinal + diaFinal;

    var vendedor = $('#vendedor').val();
    if (vendedor == '*' || vendedor == '*****') vendedor = '     ';
    else espaciosIzq(vendedor, 5);

    var isla = espaciosIzq($('#isla').val(), 1);
    var turno = espaciosIzq($('#turno').val(), 1);
    var imprGalones = espaciosIzq($('#imprGalones').val(), 1);

    var datos_envio = datosEnvio();
    datos_envio += fechaInicial;
    datos_envio += '|';
    datos_envio += fechaFinal;
    datos_envio += '|';
    datos_envio += vendedor;
    datos_envio += '|';
    datos_envio += isla;
    datos_envio += '|';
    datos_envio += turno;
    datos_envio += '|';
    datos_envio += imprGalones + "|";
    console.debug(datos_envio);

    loader('show');
    SolicitarDll({ datosh: datos_envio }, on_enviarDatos_108, get_url("app/bombas/BOM108.DLL"));
}

function on_enviarDatos_108(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();

        var añoFinal = cerosIzq($('#añoFinal').val(), 2);
        var mesFinal = cerosIzq($('#mesFinal').val(), 2)
        mesFinal = evaluarMes(mesFinal);
        var diaFinal = cerosIzq($('#diaFinal').val(), 2)

        res.push(nombreEmpresa)
        res.push(mesFinal + ' ' + diaFinal + '/' + añoFinal)
        res.push($_USUA_GLOBAL[0].NIT.toString().padStart(10, "0"));

        var opcionesImpresiones = {
            datos: get_url('temp/SC-LISTGAL-' + localStorage.Sesion + '.JSON'),
            extra: { totales: res },
            tipo: '',
            formato: 'bombas/bom108.formato.html',
            nombre: 'LISTADO-GALONAJE-' + localStorage.Sesion
        };

        if ($_FORMATO == 'PDF') {
            opcionesImpresiones.tipo = 'pdf';
            imprimir(opcionesImpresiones, finImpresion_108)

        } else if ($_FORMATO == 'CSV') {
            opcionesImpresiones.tipo = 'csv';
            imprimir(opcionesImpresiones, finImpresion_108
            )
        }
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], function () { validarFechas('3') });
    }
}

function finImpresion_108() {
    var arrayEliminar = [];
    arrayEliminar.push('SC-LISTGAL-' + localStorage.Sesion + ".json");
    _eliminarJson(arrayEliminar, function (data) {
        loader('hide');
        var res = data.split('|');
        if (res[0].trim() == '00') {
            loader('hide');
            $('#contenido table tbody').html('');
            habilitarFormato();
        } else {
            plantillaError(res[0], 'Ha ocurrido un error eliminando archivos <b>.JSON</b>', '_eliminarJson', _toggleNav);
        }
    });
}

