var $_TERCEROS_013, $_LISTADO_013;

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');

    $('#logo_url').attr('src', $_RUTA_LOGO);
    $('#formatoImpresion').select2().on('select2:select', validarFormato);
    _crearJsonTerceros_013();

    _toggleF8([
        { input: 'tercero', app: '013', funct: _ventanaTerceros_13 }
    ]);
});

function habilitarFormato() {
    _inputControl('reset');
    $('#formatoImpresion').val(null).removeAttr('disabled').trigger('change');
    $('#formatoImpresion').select2('open');
}

function validarFormato(e) {
    var seleccionado = e.params.data.id;
    if (seleccionado != "3") {
        if (seleccionado == "2") $_FORMATO = 'CSV';

        $(this).attr('disabled', 'true');

        var fecha = new Date();
        var year = fecha.getFullYear()
        year = String(year).substr(2, 4);
        var mes = fecha.getMonth() + 1;
        var dia = fecha.getDate();

        $('#añoInicial, #añoFinal').val(year);
        $('#mesInicial, #mesFinal').val(mes);
        $('#diaInicial, #diaFinal').val(dia);
        setTimeout(function () { validarPrimeraFase_013('1') }, 100);
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function _ventanaTerceros_13(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite({
            titulo: 'Busqueda terceros',
            data: $_TERCEROS_013,
            indice: ['COD', 'NOMBRE'],
            mascara: [
                {
                    COD: 'Identificacion',
                    NOMBRE: 'Nombre',
                    TELEF: 'Telefono',
                    CIUDAD: 'Ciudad',
                    ACT: 'Actividad',
                }
            ],
            minLength: 1,
            callback_esc: function () {
                $('#tercero_013').focus();
            },
            callback: function (data) {
                $('#tercero_013').val(data.COD.trim());
                _enterInput('#tercero_013');
            }
        });
    }
}

function _crearJsonTerceros_013() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonTerceros_013, get_url("app/CON802.DLL"));
}

function on_crearJsonTerceros_013(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-ARCHTER-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_TERCEROS_013 = data.TERCEROS;
                var arrayEliminar = [];
                arrayEliminar.push('SC-ARCHTER-' + localStorage.Sesion)
                _eliminarJson(arrayEliminar, on_eliminarJson_013);
            },
            rutaJson
        );
    } else {
        jAlert({ titulo: 'Mensaje ' + res[1], mensaje: res[2] });
    }
}

function on_eliminarJson_013(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        setTimeout(function () { $('#formatoImpresion').val(null).select2('open') }, 500)
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function validarPrimeraFase_013(orden) {
    validarInputs(
        {
            form: '#fase1',
            orden: orden
        },
        habilitarFormato,
        _validarTercero_013

    )
}

function _validarTercero_013() {
    var codTercero = cerosIzq($('#tercero_013').val(), 10);
    var validacion = buscarTercero_013(codTercero);
    if (validacion != false) {
        _enviarDatos_013();
    } else {
        $('#tercero_013').val('');
        plantillaError('99', '01', '-', function () { validarPrimeraFase_013('7'); });
    }
}

function _enviarDatos_013() {
    var sesion = localStorage.Sesion;

    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2)
    var diaInicial = cerosIzq($('#diaInicial').val(), 2)
    var fechaInicial = añoInicial + mesInicial + diaInicial;

    var añoFinal = cerosIzq($('#añoFinal').val(), 2);
    var mesFinal = cerosIzq($('#mesFinal').val(), 2)
    var diaFinal = cerosIzq($('#diaFinal').val(), 2)
    var fechaFinal = añoFinal + mesFinal + diaFinal;

    var tercero = cerosIzq($('#tercero_013').val(), 10);

    var datos_envio = datosEnvio();
    datos_envio += fechaInicial;
    datos_envio += '|';
    datos_envio += fechaFinal;
    datos_envio += '|';
    datos_envio += tercero;

    console.debug(datos_envio);
    loader('show');
    SolicitarDll({ datosh: datos_envio }, on_enviarDatos_013, get_url("app/BOMB13.DLL"));
}

function on_enviarDatos_013(data) {
    console.debug(data)
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var nombreEmpresa = $datosUsuar[1].trim();
        var nitTercero = $('#tercero_013').val();

        res.push(nombreEmpresa)
        res.push(nitTercero)

        imprimir({
            datos: get_url('progdatos/json/SC-LISTVAL-' + localStorage.Sesion + '.JSON'),
            extra: { totales: res },
            tipo: 'csv',
            formato: 'bomb13.formato.html',
            nombre: 'LISTADO-VALESxCLIENTE-' + localStorage.Sesion
        }, finImpresion_013)
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], function () { validarPrimeraFase_013('1') });
    }
}

function finImpresion_013() {
    loader('hide');
    $('#contenido table#tabla-principal tbody').html('');
    habilitarFormato();
}
function buscarTercero_013(codigo) {
    var retornar = false;
    for (var i in $_TERCEROS_013) {
        if ($_TERCEROS_013[i].COD.trim().toLowerCase() == codigo.trim().toLowerCase()) {
            retornar = $_TERCEROS_013[i];
            break;
        }
    }

    return retornar;
}