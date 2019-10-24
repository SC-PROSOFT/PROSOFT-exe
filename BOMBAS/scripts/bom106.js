var $_SURTIDORES_106, $_DATOS_TABLA_106, $_INFO_COMP_106;

$(document).ready(function () {
    loader('hide');
    _init_106();
});

function _init_106() {
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

            var datos_envio = datosEnvio()+ cerosIzq(comprobante, 6)+ "|";

            SolicitarDll({ datosh: datos_envio }, on_validarComprobante, get_url("app/bombas/BOM105.DLL"));
        }
    )
}

function on_validarComprobante(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('temp/SC-LISTCOMB-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_SURTIDORES_106 = data.SURTIDORES;
                $_SURTIDORES_106.pop();
                $_DATOS_TABLA_106 = data['TBLA-DEUD'];
                $_INFO_COMP_106 = res;

                var arrayEliminar = [];
                arrayEliminar.push('SC-LISTCOMB-' + localStorage.Sesion + ".json")
                _eliminarJson(arrayEliminar, on_eliminarJson_106);
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], validarComprobante);
    }
}

function on_eliminarJson_106(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        _llenarDatos_106();
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function _llenarDatos_106() {
    let fecha = $_INFO_COMP_106['2'].trim();
    let año = fecha.substr(0, 2);
    $('#añoInicial').val(año);

    let mes = fecha.substr(2, 2);
    $('#mesInicial').val(mes);

    let dia = fecha.substr(4, 6);
    $('#diaInicial').val(dia);

    let turno = $_INFO_COMP_106['3'].trim();
    $('#turno').val(turno);

    let detalle = $_INFO_COMP_106['4'].trim();
    $('#detalle').val(detalle);

    let totalGalonaje = $_INFO_COMP_106['7'].trim();
    $('#galonajeTablaVenta').html(totalGalonaje);

    let totalVenta = $_INFO_COMP_106['8'].trim();
    $('#ventaTablaVenta').html(totalVenta);
    $('#totalCombustible').val(totalVenta);

    let totalFinanciacion = $_INFO_COMP_106['9'].trim();
    $('#totalFinanciacion').val(totalFinanciacion);

    let totalVales = $_INFO_COMP_106['10'].trim();
    $('#totalTablaVales').html(totalVales);
    $('#totalCreditos').val(totalVales);

    let totalCheques = $_INFO_COMP_106['11'].trim();
    $('#totalCheques').val(totalCheques);

    let totalEfectivo = $_INFO_COMP_106['12'].trim();
    $('#totalEfectivo').val(totalEfectivo);

    _llenarTablaSurtidores_106();
}

function _llenarTablaSurtidores_106() {
    for (var i in $_SURTIDORES_106) {
        let item = $_SURTIDORES_106[i].SURTI.trim() ? $_SURTIDORES_106[i].SURTI.trim() : false;
        if (item) {
            $('#tablaVenta tbody').append(''
                + '<tr>'
                + ' <td>' + item + '</td>'
                + ' <td>' + $_SURTIDORES_106[i].CANTID.trim() + '</td>'
                + ' <td>' + $_SURTIDORES_106[i].VALOR.trim() + '</td>'
                + '</tr>'
            )
        }
    }

    _llenarTablaVales_106();
}

function _llenarTablaVales_106() {
    for (var i in $_DATOS_TABLA_106) {
        let item = parseInt(i) + parseInt(1);
        $('#tablaVales tbody').append(''
            + '<tr>'
            + ' <td>' + cerosIzq(item, 3) + '</td>'
            + ' <td>' + $_DATOS_TABLA_106[i].COD.trim() + '</td>'
            + ' <td>' + $_DATOS_TABLA_106[i].NIT.trim() + '</td>'
            + ' <td>' + $_DATOS_TABLA_106[i].DOCUM.trim() + '</td>'
            + ' <td>' + $_DATOS_TABLA_106[i].VLR.trim() + '</td>'
            + ' <td>' + $_DATOS_TABLA_106[i].DESCRIP.trim().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' ') + '</td>'
            + '</tr>'
        )
    }

    _validacionFinal_106();
}

function _validacionFinal_106() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            loader('show');
            var comprobante = $('#numComprobante').val() ? $('#numComprobante').val() : '0';
            var datos_envio = datosEnvio();
            datos_envio += cerosIzq(comprobante, 6);
            datos_envio += '|' + "1";
            datos_envio += '|' + "      ";
            SolicitarDll({ datosh: datos_envio }, on_anularComprobante, get_url("app/bombas/BOM106.DLL"));
        } else {
            _init_106();
        }
    }, {
            msj: '02',
            overlay_show: false
        })
}

function on_anularComprobante(data) {
    console.debug(data);
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        jAlert(
            {
                titulo: 'Correcto ' + res[0],
                mensaje: 'El comprobante <b>' + $('#numComprobante').val() + '</b> ha sido anulado.'
            },
            _init_106
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _init_106);
    }
}