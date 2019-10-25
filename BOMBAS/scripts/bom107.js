var $_COMPRO_INI, $_COMPRO_FIN, $_CONT_COMPRO,$_SURTIDORES_107, $_DATOS_TABLA_107, $_INFO_COMP_107;

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    loader('hide');
    _ventanaComprobante();
});

function _ventanaComprobante() {
    var fuente = $('#plantillaComprobante').html();
    var dialogo = bootbox.dialog({
        title: "Rango de comprobantes",
        message: fuente,
        closeButton: false,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue hidden",
                callback: function () {
                    // Evento aceptar popup
                }
            }
        }
    });
    dialogo.init(function () {
        setTimeout(function () { validarRangoComprobante('1'); }, 500);
    });
}

function validarRangoComprobante(orden) {
    validarInputs(
            {form: '#rangoComprobantes', orden: orden},
            function(){
                _toggleNav();
                $('[data-bb-handler="main"]').click();
            },
            function () {
                var comp1 = $('.numCompr1');
                var comp2 = $('.numCompr2');
                $_COMPRO_INI = $(comp1[1]).val();
                $_COMPRO_FIN = $(comp2[1]).val();
                if ($_COMPRO_INI <= $_COMPRO_FIN) {
                    $('#numComprobante').val($_COMPRO_INI);
                    solicitarComp();
                    $('[data-bb-handler="main"]').click();
                } else {
                    alert('El comprobante final no puede ser menor');
                }
            }
    );
}

function solicitarComp() {
    $_CONT_COMPRO = $('#numComprobante').val();
    if ($_CONT_COMPRO <= $_COMPRO_FIN) {
        loader('show');
        var datos_envio = datosEnvio() + cerosIzq($_CONT_COMPRO, 6) + "|";
        console.log(datos_envio)
        SolicitarDll({datosh: datos_envio}, on_validarComprobante, get_url("app/bombas/BOM105.DLL"));
    } else {
        _inputControl('reset');
        plantillaToast('confirmado', '39', '', 'success','Exitoso');
        _toggleNav();
    }

}

function on_validarComprobante(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('temp/SC-LISTCOMB-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_SURTIDORES_107 = data.SURTIDORES;
                $_SURTIDORES_107.pop();
                $_DATOS_TABLA_107 = data['TBLA-DEUD'];
                $_INFO_COMP_107 = res;

                var arrayEliminar = [];
                arrayEliminar.push('SC-LISTCOMB-' + localStorage.Sesion + ".json")
                _eliminarJson(arrayEliminar, on_eliminarJson_105);
            },
            rutaJson
        );
    } else {
        console.log('entra')
        loader('hide');
        plantillaError(res[0], res[1], res[2], on_finalizar);
    }
}

function on_eliminarJson_105(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        _llenarDatos_107();
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function _llenarDatos_107() {
    let fecha = $_INFO_COMP_107['2'].trim();
    let año = fecha.substr(0, 2);
    $('#añoInicial').val(año);

    let mes = fecha.substr(2, 2);
    $('#mesInicial').val(mes);

    let dia = fecha.substr(4, 6);
    $('#diaInicial').val(dia);

    let turno = $_INFO_COMP_107['3'].trim();
    $('#turno').val(turno);

    let detalle = $_INFO_COMP_107['4'].trim();
    $('#detalle').val(detalle);

    let totalGalonaje = $_INFO_COMP_107['7'].trim();
    $('#galonajeTablaVenta').html(totalGalonaje);

    let totalVenta = $_INFO_COMP_107['8'].trim();
    $('#ventaTablaVenta').html(totalVenta);
    $('#totalCombustible').val(totalVenta);

    let totalFinanciacion = $_INFO_COMP_107['9'].trim();
    $('#totalFinanciacion').val(totalFinanciacion);

    let totalVales = $_INFO_COMP_107['10'].trim();
    $('#totalTablaVales').html(totalVales);
    $('#totalCreditos').val(totalVales);

    let totalCheques = $_INFO_COMP_107['11'].trim();
    $('#totalCheques').val(totalCheques);

    let totalEfectivo = $_INFO_COMP_107['12'].trim();
    $('#totalEfectivo').val(totalEfectivo);

    if (detalle != 'ANULADO') _llenarTablaSurtidores_107();
    else plantillaError('', "Comrobante anulado!", "SC", on_finalizar);

}

function _llenarTablaSurtidores_107() {
    for (var i in $_SURTIDORES_107) {
        let item = $_SURTIDORES_107[i].SURTI.trim() ? $_SURTIDORES_107[i].SURTI.trim() : false;
        if (item) {
            $('#tablaVenta tbody').append(''
                + '<tr>'
                + ' <td>' + item + '</td>'
                + ' <td>' + $_SURTIDORES_107[i].CANTID.trim() + '</td>'
                + ' <td>' + $_SURTIDORES_107[i].VALOR.trim() + '</td>'
                + '</tr>'
            )
        }
    }

    _llenarTablaVales_107();
}

function _llenarTablaVales_107() {
    for (var i in $_DATOS_TABLA_107) {
        let item = parseInt(i) + parseInt(1);
        $('#tablaVales tbody').append(''
            + '<tr>'
            + ' <td>' + cerosIzq(item, 3) + '</td>'
            + ' <td>' + $_DATOS_TABLA_107[i].COD.trim() + '</td>'
            + ' <td>' + $_DATOS_TABLA_107[i].NIT.trim() + '</td>'
            + ' <td>' + $_DATOS_TABLA_107[i].DOCUM.trim() + '</td>'
            + ' <td>' + $_DATOS_TABLA_107[i].VLR.trim() + '</td>'
            + ' <td>' + $_DATOS_TABLA_107[i].DESCRIP.trim().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' ') + '</td>'
            + '</tr>'
        )
    }

    _validacionFinal_107();
}

function _validacionFinal_107() {
    loader('hide');
    CON850_P(function (e) {
        if (e.id == 'S') {
            setTimeout(function(){
                CON850_P(function(d){
                    loader('show');
                    var datos_envio = datosEnvio()
                        + cerosIzq($_CONT_COMPRO, 6)+ '|' + d.id + '|' ;
                    SolicitarDll({ datosh: datos_envio }, on_segundaConsulta, get_url("app/bombas/BOM020.DLL"));
                },{
                    msj: 'Permitir refacturar?',
                    overlay_show: false
                });
            },500);
        } else {
            on_finalizar();
        }
    }, {
            msj: '04',
            overlay_show: false
        });
}

function on_segundaConsulta(data){
    var res = data.split('|');
    if (res[0].trim() == '00') {
        if ($_USUA_GLOBAL[0].INVENT.trim() == 'S') {
            var datos_envio = datosEnvio()
                + cerosIzq($_CONT_COMPRO, 6)+ '|' ;
            SolicitarDll({ datosh: datos_envio }, on_finConsulta, get_url("app/bombas/BOM030.DLL"));
        } else {
            on_finalizar();
        }
    } else {
        plantillaError(res[0], res[1], res[2]);
    }
}

function on_finConsulta(data){
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        on_finalizar();
    } else {
        plantillaError(res[0], res[1], res[2]);
    }
}

function on_finalizar(){
    _inputControl('reset');
    $('#tablaVenta tbody').html('');
    $('#tablaVales tbody').html('');
    setTimeout(function(){
        $('#numComprobante').val(parseInt($_CONT_COMPRO)+1);
        solicitarComp();
    },500);
}