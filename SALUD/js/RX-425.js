// IMPRESION MASIVA DE ESTUDIOS DE IMAGENOLOGIA POR ENTIDAD //

var RX425 = [];

//////////////////////////// MASCARAS

var momentFormat_RX425 = 'YYYY/MM/DD';
var momentMask_RX425 = IMask($('#fechadesde_rx425')[0], {
    mask: Date,
    pattern: momentFormat_RX425,
    lazy: true,
    min: new Date(1970, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat_RX425);
    },
    parse: function (str) {
        return moment(str, momentFormat_RX425);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        }
    }
});
var momentMask2_RX425 = IMask($('#fechahasta_rx425')[0], {
    mask: Date,
    pattern: momentFormat_RX425,
    lazy: true,
    min: new Date(1970, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat_RX425);
    },
    parse: function (str) {
        return moment(str, momentFormat_RX425);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1970,
            to: 2030
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        }
    }
});

var clientMask_RX425 = new IMask($('#cliente_rx425')[0], { mask: Number, thousandsSeparator: ',' });
/////////////////////////////////////////////////////////

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    RX425['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    RX425['NOMBREUSU'] = $_USUA_GLOBAL[0].NOMBRE;
    RX425['ADMINW'] = localStorage.getItem('Usuario').trim();
    _evaluarfechadesde_RX425();
});

function _evaluarfechadesde_RX425() {
    validarInputs(
        {
            form: "#VALIDAR1_RX425",
            orden: '1'
        },
        function () { _toggleNav() },
        function () {
            RX425.FECHAINI = momentMask_RX425.unmaskedValue;
            var datos_envio = datosEnvio();
            datos_envio += RX425.ADMINW + '|' + '1' + '|' + RX425.FECHAINI
            console.debug(datos_envio)
            let URL = get_url("APP/SALUD/RX425.DLL");
            postData({ datosh: datos_envio }, URL)
                .then(function (data) {
                    if (data.CONSULTA[0].DESCRIP.trim() == '00') {
                        _evaluarfechahasta_RX425();
                    }
                })
                .catch(err => {
                    console.debug(err);
                    _toggleNav();
                })
        }
    )
}

function _evaluarfechahasta_RX425(orden) {
    clientMask_RX425.typedValue = '99';
    validarInputs(
        {
            form: "#VALIDAR2_RX425",
            orden: orden
        },
        function () { _toggleNav() },
        function () {
            RX425.FECHAFIN = momentMask2_RX425.unmaskedValue;
            RX425.SWNIT = clientMask_RX425.unmaskedValue;
            RX425.SWNIT = RX425.SWNIT.padStart(10, '0');
            if (RX425.SWNIT == '0000000099') {
                $('#cliented_rx425').val('TODOS LOS CLIENTES');
                _evaluarcups1_RX425();
            } else {
                var datos_envio = datosEnvio();
                datos_envio += RX425.ADMINW + '|' + '2' + '|' + RX425.FECHAINI + '|' + RX425.FECHAFIN + '|' + RX425.SWNIT
                console.debug(datos_envio)
                let URL = get_url("APP/SALUD/RX425.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(function (data) {
                        console.debug(data);
                        if (data.CONSULTA[0].DESCRIP.trim() == '00') {
                            clientMask_RX425.typedValue = data.CONSULTA[0].DESCRIP;
                            _evaluarcups1_RX425();
                        }
                    })
                    .catch(err => {
                        console.debug(err);
                        clientMask_RX425.typedValue = '99';
                        _evaluarfechahasta_RX425('2');
                    })
            }
        }
    )
}

function _evaluarcups1_RX425() {
    validarInputs(
        {
            form: "#VALIDAR3_RX425",
            orden: '1'
        },
        function () { _toggleNav() },
        function () {
            RX425.CUPS1 = $('#cups1_rx425').val();
            var datos_envio = datosEnvio();
            datos_envio += RX425.ADMINW + '|' + '3' + '|' + RX425.FECHAINI + '|' + RX425.FECHAFIN + '|' + RX425.SWNIT + '|' + RX425.CUPS1
            console.debug(datos_envio)
            let URL = get_url("APP/SALUD/RX425.DLL");
            postData({ datosh: datos_envio }, URL)
                .then(function (data) {
                    $('#cups1d_rx425').val(data.CONSULTA[0].DESCRIP);
                    _evaluarcups2_RX425();
                })
                .catch(err => {
                    console.debug(err);
                    $('#cups1_rx425').val('');
                    _evaluarcups1_RX425();
                })
        }
    )
}

function _evaluarcups2_RX425() {
    validarInputs(
        {
            form: "#VALIDAR4_RX425",
            orden: '1'
        },
        function () { _toggleNav() },
        function () {
            RX425.CUPS2 = $('#cups2_rx425').val();
            var datos_envio = datosEnvio();
            datos_envio += RX425.ADMINW + '|' + '3' + '|' + RX425.FECHAINI + '|' + RX425.FECHAFIN + '|' + RX425.SWNIT + '|' + RX425.CUPS2
            console.debug(datos_envio)
            let URL = get_url("APP/SALUD/RX425.DLL");
            postData({ datosh: datos_envio }, URL)
                .then(function (data) {
                    $('#cups2d_rx425').val(data.CONSULTA[0].DESCRIP);
                    CON851P('04', _cancelarimpresion_RX425, _confirmarimpresion_RX425);
                })
                .catch(err => {
                    console.debug(err);
                    $('#cups2_rx425').val('');
                    _evaluarcups1_RX425();
                })
        }
    )
}

function _confirmarimpresion_RX425() {
    setTimeout(function () { _cargandoimpresion_RX425('imprimiendo') }, 300);
    var datos_envio = datosEnvio();
    datos_envio += RX425.ADMINW + '|' + '4' + '|' + RX425.FECHAINI + '|' + RX425.FECHAFIN + '|' + RX425.SWNIT + '|' + RX425.CUPS1 + '|' + RX425.CUPS2
    console.debug(datos_envio)
    let URL = get_url("APP/SALUD/RX425.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            console.debug(data);
            RX425.FACTURAS = data.FACTURA;
            RX425.CONTADOR = 0;
            _imprimir_RX425();
        })
        .catch(err => {
            console.debug(err);
        })
}

function _cancelarimpresion_RX425() {
    _evaluarcups2_RX425();
}

function _cargandoimpresion_RX425(estado) {
    switch (estado) {
        case 'imprimiendo':
            var ventanaimpresion = bootbox.dialog({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Imprimiendo...</div>',
                closeButton: false,
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanaimpresion.off('show.bs.modal');
                            CON851('39', '39', null, 'success', 'Exito'); // MOMENTANEO MIENTRAS SE APLICA LA IMPRESION
                            _toggleNav();
                        }
                    }
                }
            })
            ventanaimpresion.init($('.modal-footer').hide());
            break;
        case 'termino':
            $('.btn-primary').click();
            break;
    }
}

function _imprimir_RX425() {
    if (RX425.CONTADOR == RX425.FACTURAS.length - 1){
        _cargandoimpresion_RX425('termino');
        RX425.CONTADOR = 0;
    } else {
        console.debug(RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.trim());
        if (RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT.trim() != '') {
            var datos_envio = datosEnvio();
            datos_envio += RX425.ADMINW + '|' + RX425.FACTURAS[RX425.CONTADOR].LLAVE_FACT
            console.debug(datos_envio);
            let URL = get_url("APP/SALUD/RXI02.DLL");
            postData({ datosh: datos_envio }, URL)
                .then(function (data) {
                    console.debug(data);
                    RX425.IMPRESION = data.IMPRESION[0];
                    RX425.IMPRESION.IMPRESIONPPAL = data.IMPRESION[1].RESULTADOPPAL_RX + data.IMPRESION[2].RESULTADOPPAL_RX + data.IMPRESION[3].RESULTADOPPAL_RX + data.IMPRESION[4].RESULTADOPPAL_RX + data.IMPRESION[5].RESULTADOPPAL_RX + data.IMPRESION[6].RESULTADOPPAL_RX + data.IMPRESION[7].RESULTADOPPAL_RX + data.IMPRESION[8].RESULTADOPPAL_RX + data.IMPRESION[9].RESULTADOPPAL_RX + data.IMPRESION[10].RESULTADOPPAL_RX + data.IMPRESION[11].RESULTADOPPAL_RX;
                    RX425.IMPRESION.IMPRESIONCOMP = data.IMPRESION[12].RESULTADOCOMP_RX + data.IMPRESION[13].RESULTADOCOMP_RX + data.IMPRESION[14].RESULTADOCOMP_RX + data.IMPRESION[15].RESULTADOCOMP_RX + data.IMPRESION[16].RESULTADOCOMP_RX + data.IMPRESION[17].RESULTADOCOMP_RX + data.IMPRESION[18].RESULTADOCOMP_RX + data.IMPRESION[19].RESULTADOCOMP_RX;
                    RX425.IMPRESION.IMPRESIONADIC = data.IMPRESION[20].RESULTADOADIC_RX + data.IMPRESION[21].RESULTADOADIC_RX + data.IMPRESION[22].RESULTADOADIC_RX + data.IMPRESION[23].RESULTADOADIC_RX + data.IMPRESION[24].RESULTADOADIC_RX + data.IMPRESION[25].RESULTADOADIC_RX + data.IMPRESION[26].RESULTADOADIC_RX + data.IMPRESION[27].RESULTADOADIC_RX;
                    console.debug(RX425.IMPRESION);
                    RX425.CONTADOR = RX425.CONTADOR + 1;
                    setTimeout(_imprimir_RX425, 50);
                    _impresion_RX425();
                })
                .catch(err => {
                    console.debug(err);
                })
        } else {
            if (RX425.CONTADOR > 2){
                _cargandoimpresion_RX425('termino');
            } else {
                RX425.CONTADOR = RX425.CONTADOR + 1;
            }
        }
    }
}

function _impresion_RX425() {
    console.debug('impresion', RX425.IMPRESION);
    RX425.IMPRESION.FECHA_FACTRX = RX425.IMPRESION.FECHA_FACTRX + RX425.IMPRESION.HORA_FACTRX
    moment.defaultFormat = "YYYYMMDD HHmm";
    RX425.IMPRESION.FECHA_FACTRX = moment(RX425.IMPRESION.FECHA_FACTRX, moment.defaultFormat).format('LLL')
    RX425.IMPRESION.USU = RX425.NOMBREUSU;
    RX425.IMPRESION.COMPROBANTE = RX425.IMPRESION.LLAVE_FACTRX.substring(13, 19);
    RX425.IMPRESION.SUCURSAL = RX425.IMPRESION.LLAVE_FACTRX.substring(10, 11);
    RX425.IMPRESION.NIT = RX425.IMPRESION.LLAVE_FACTRX.substring(2, 10);
    RX425.NOMBREPDF = RX425.IMPRESION.SUCURSAL + RX425.IMPRESION.COMPROBANTE;
    RX425.IMPRESION.RESULTADOPPAL = RX425.IMPRESION.IMPRESIONPPAL;
    let desclo = RX425.IMPRESION.RESULTADOPPAL.split('-');
    RX425.IMPRESION.IMPRESIONCOMP.trim() == '' ? RX425.IMPRESION.HTMLCOMPPPAL = '0' : RX425.IMPRESION.HTMLCOMPPPAL = RX425.IMPRESION.HTMLCOMPPPAL;
    RX425.IMPRESION.IMPRESIONADIC.trim() == '' ? RX425.IMPRESION.HTMLADICPPAL = '0' : RX425.IMPRESION.HTMLADICPPAL = RX425.IMPRESION.HTMLADICPPAL;
    desclo[1] == undefined ? desclo[1] = '' : desclo[1] = desclo[1];
    desclo[2] == undefined ? desclo[2] = '' : desclo[2] = desclo[2];
    RX425.IMPRESION.HTMLRESULTADOPPAL = desclo[0] + '<br/> <br/>' + desclo[1] + '<br/> <br/>' + desclo[2];
    console.debug(desclo);
    console.debug('impresion', RX425.IMPRESION);
    opcinesImpresion_RX425 = {
        datos: RX425.IMPRESION,
        tipo: 'pdf_masivo',
        formato: 'rx/RXI02A.html',
        nombre: RX425.NOMBREPDF
    }
    imprimir(opcinesImpresion_RX425, function () { finImpresion_RX425(RX425.IMPRESION.COMPROBANTE) });
}

function finImpresion_RX425(data) {
    console.debug(data);
}