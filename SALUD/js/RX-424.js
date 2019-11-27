var RX424 = []; var IMPRESION = [];

/////////////////////////////// MASCARAS /////////////////////////////////////
var momentFormat_RX424 = 'YYYY/MM/DD';
var momentMask_RX424 = IMask($('#fechadesde_rx424')[0], {
    mask: Date,
    pattern: momentFormat_RX424,
    lazy: true,
    min: new Date(1970, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat_RX424);
    },
    parse: function (str) {
        return moment(str, momentFormat_RX424);
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
var momentMask2_RX424 = IMask($('#fechahasta_rx424')[0], {
    mask: Date,
    pattern: momentFormat_RX424,
    lazy: true,
    min: new Date(1970, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat_RX424);
    },
    parse: function (str) {
        return moment(str, momentFormat_RX424);
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
var desdeMask_RX424 = new IMask($('#desdenro_rx424')[0], { mask: Number, thousandsSeparator: ',' });
var hastaMask_RX424 = new IMask($('#hastanro_rx424')[0], { mask: Number, thousandsSeparator: ',' });
var clientMask_RX424 = new IMask($('#cliente_rx424')[0], { mask: Number, thousandsSeparator: ',' });
var medicMask_RX424 = new IMask($('#medico_rx424')[0], { mask: Number, thousandsSeparator: ',' });
var nrofactMask_RX424 = new IMask($('#facturanro_rx424')[0], { mask: Number, min: 0, max: 999999 });
var prefijoMask = IMask($('#factura_rx424')[0], {
    mask: '*',
    prepare: function (str) {
        console.debug(str, str.length);
        if (str == '*') {
            return str
        } else {
            str = str.toUpperCase();
            console.debug(str);
            if ((str == 'P') || (str == 'T') || (str == 'A')) {
                return str
            }
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var pdfMask = IMask($('#pdf_rx424')[0], {
    mask: 'a',
    prepare: function (str) {
        str = str.toUpperCase();
        console.debug(str);
        if ((str == 'S') || (str == 'N')) {
            return str
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
//////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    RX424['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    RX424['NOMBREUSU'] = $_USUA_GLOBAL[0].NOMBRE;
    RX424['ADMINW'] = localStorage.getItem('Usuario').trim();
    $('#nombreusu_rx424').text(RX424.NOMBREUSU);
    RX424['SUCW'] = RX424.PREFIJOUSU;
    RX424['CODTER'] = '';
    RX424['CODPROF'] = '';
    _evaluarprefijo_RX424('1');
    momentMask_RX424.updateValue();
    desdeMask_RX424.typedValue = '1';
    hastaMask_RX424.typedValue = '999999';
});

function _evaluarprefijo_RX424(orden) {
    $('#prefijo_rx424').val(RX424.PREFIJOUSU);
    validarInputs(
        {
            form: "#VALIDAR1_RX424",
            orden: orden
        },
        function () { _toggleNav() },
        _validarfecha_RX424
    )
}

function _validarfecha_RX424() {
    RX424.SUCW = $('#prefijo_rx424').val();
    RX424['NROINIW'] = desdeMask_RX424.unmaskedValue.padStart(6, '0');
    RX424['NROFINW'] = hastaMask_RX424.unmaskedValue.padStart(6, '0');
    RX424['FECHAINI'] = momentMask_RX424.unmaskedValue;
    console.debug(RX424.FECHAINI);
    var datos_envio = datosEnvio();
    datos_envio += RX424.ADMINW + '|' + '1' + '|' + RX424.FECHAINI + '|' + RX424.CODTER + '|' + RX424.CODPROF
    console.debug(datos_envio)
    let URL = get_url("APP/SALUD/RX424.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            if (data.CONSULTA[0].DESCRIP.trim() == '00') {
                _evaluarfechahasta_RX424();
            }
        })
        .catch(err => {
            console.debug(err);
        })
}

function _evaluarfechahasta_RX424() {
    momentMask2_RX424.updateValue();
    validarInputs(
        {
            form: "#VALIDAR2_RX424",
            orden: '1'
        },
        function () { _evaluarprefijo_RX424('4') },
        _validarfechahasta_RX424
    )
}

function _validarfechahasta_RX424() {
    RX424['FECHAFIN'] = momentMask2_RX424.unmaskedValue;
    if (RX424.FECHAFIN < RX424.FECHAINI) {
        CON851('37', '37', null, 'error', 'Error');
        _evaluarfechahasta_RX424();
    }
    else {
        _evaluarcliente_RX424();
    }
}

function _evaluarcliente_RX424() {
    clientMask_RX424.updateValue();
    validarInputs(
        {
            form: "#VALIDAR3_RX424",
            orden: '1'
        },
        function () { _evaluarfechahasta_RX424() },
        _validarcliente_RX424
    )
}

function _validarcliente_RX424() {
    RX424['SWNIT'] = clientMask_RX424.unmaskedValue;
    RX424.SWNIT = RX424.SWNIT.padStart(10, '0');
    if (RX424.SWNIT == '0000000099') {
        $('#cliented_rx424').val('TODOS LOS CLIENTES');
        _evaluarmedico_RX424();
    }
    else {
        // _consultaSql({
        //     db: 'san2019_13',
        //     sql: 'SELECT * FROM san2019_13.sc_archter WHERE codigo LIKE "%' + RX424.SWNIT + '%"',
        //     callback: function (error, results, fields) {
        //         if (error) throw error;
        //         else {
        //             console.debug(results);
        //             if (results.length == 0) {
        //                 CON851('01', '01', null, 'error', 'Error');
        //                 _evaluarcliente_RX424();
        //             } else {
        //                 for (var i in results) {
        //                     if (results[i].codigo == RX424.SWNIT) {
        //                         $('#cliented_rx424').val(results[i].descripcion);
        //                         _evaluarmedico_RX424();
        //                         break;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // });
        var datos_envio = datosEnvio();
        datos_envio += RX424.ADMINW + '|' + '2' + '|' + RX424.FECHAINI + '|' + RX424.SWNIT + '|' + RX424.CODPROF
        console.debug(datos_envio);
        let URL = get_url("APP/SALUD/RX424.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(function (data) {
                $('#cliented_rx424').val(data.CONSULTA[0].DESCRIP);
                _evaluarmedico_RX424();
            })
            .catch(err => {
                console.debug(err);
                _evaluarcliente_RX424();
            })
    }
}

function _evaluarmedico_RX424() {
    medicMask_RX424.updateValue();
    validarInputs(
        {
            form: "#VALIDAR4_RX424",
            orden: '1'
        },
        function () { _evaluarcliente_RX424() },
        _validarmedico_RX424
    )
}

function _validarmedico_RX424() {
    RX424['SWMED'] = medicMask_RX424.unmaskedValue;
    RX424.SWMED = RX424.SWMED.padStart(10, '0');
    if (RX424.SWMED == '0000000099') {
        $('#medicod_rx424').val('TODOS LOS MEDICOS');
        _evaluarfactura_RX424();
    }
    else {
        // _consultaSql({
        //     db: 'san2019_13',
        //     sql: 'SELECT * FROM san2019_13.sc_archprof WHERE codigo LIKE "%' + RX424.SWMED + '%"',
        //     callback: function (error, results, fields) {
        //         if (error) throw error;
        //         else {
        //             console.debug(results);
        //             if (results.length == 0) {
        //                 CON851('01', '01', null, 'error', 'Error');
        //                 _evaluarmedico_RX424();
        //             } else {
        //                 for (var i in results) {
        //                     if (results[i].codigo == RX424.SWMED) {
        //                         $('#medicod_rx424').val(results[i].descripcion);
        //                         _evaluarfactura_RX424();
        //                         break;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // });
        var datos_envio = datosEnvio();
        datos_envio += RX424.ADMINW + '|' + '3' + '|' + RX424.FECHAINI + '|' + RX424.SWNIT + '|' + RX424.SWMED
        let URL = get_url("APP/SALUD/RX424.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(function (data) {
                $('#medicod_rx424').val(data.CONSULTA[0].DESCRIP);
                _evaluarfactura_RX424();
            })
            .catch(err => {
                console.debug(err);
                _evaluarmedico_RX424();
            })
    }
}

function _evaluarfactura_RX424() {
    validarInputs(
        {
            form: "#VALIDAR5_RX424",
            orden: '1'
        },
        function () { _evaluarmedico_RX424() },
        _validarfactura_RX424
    )
}

function _validarfactura_RX424() {
    RX424['PREFFACTW'] = prefijoMask.unmaskedValue;
    if (RX424.PREFFACTW == '*') {
        $('#facturanro_rx424').val('TODAS LAS FACTURAS');
        _datopdf_RX424();
    } else if (RX424.PREFFACTW.trim() == 'P' || RX424.PREFFACTW.trim() == 'A' || RX424.PREFFACTW.trim() == 'T') {
        _evaluarctafact_RX424();
    } else {
        CON851('03', '03', null, 'error', 'Error');
        _evaluarfactura_RX424();
    }
}

function _evaluarctafact_RX424() {
    validarInputs(
        {
            form: "#VALIDAR6_RX424",
            orden: '1'
        },
        function () { _evaluarfactura_RX424() },
        _datopdf_RX424
    )
}

function _datopdf_RX424() {
    RX424['CTAFACTW'] = nrofactMask_RX424.unmaskedValue;
    RX424.CTAFACTW = RX424.CTAFACTW.padStart(6, '0');
    nrofactMask_RX424.typedValue = RX424.CTAFACTW;
    validarInputs(
        {
            form: "#VALIDAR7_RX424",
            orden: '1'
        },
        function () { _evaluarfactura_RX424() },
        _validarpdf_RX424
    )
}

function _validarpdf_RX424() {
    RX424['SWPDF'] = pdfMask.unmaskedValue;
    if (RX424.SWPDF == 'S') {
        CON851P('04', _cancelarpdf_RX424, _confirmarpdf_RX424);
    } else {
        _datopdf_RX424();
    }
}

function _confirmarpdf_RX424() {
    // for (var i in PDF) {
    //     if ((RX424.SUCW == '**') || (RX424.SUCW == PDF[i].suc_fact)) {
    //         if ((RX424.SWNIT == '99') || (RX424.SWNIT == PDF[i].nit_fact)) {
    //             if ((RX424.SWMED == '99') || (RX424.SWMED == PDF[i].med_otr_fact)) {
    //                 if ((RX424.PREFFACTW == '*') || (RX424.CTAFACTW == PDF[i].nro_fact)) {
    //                     if ((PDF[i].fecha_fact) < (RX424.FECHAFIN)) {
    //                         if (PDF[i].nro_fact > RX424.NROINIW && PDF[i].nro_fact < RX424.NROFINW) {
    //                             IMPRESION[i] = PDF[i];
    //                             console.debug(IMPRESION);
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    // _impresion_RX424();
    setTimeout(function () { _cargandoimpresion('imprimiendo') }, 300);
    var datos_envio = datosEnvio();
    datos_envio += RX424.ADMINW + '|' + '4' + '|' + RX424.FECHAINI + '|' + RX424.SWNIT + '|' + RX424.SWMED + '|' + RX424.SUCW + '|' + RX424.PREFFACTW + '|' + RX424.NROINIW + '|' + RX424.FECHAFIN + '|' + RX424.NROINIW + '|' + RX424.NROFINW
    console.debug(datos_envio);
    let URL = get_url("APP/SALUD/RX424.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            console.debug(data);
            RX424.FACTURAS = data.FACTURA;
            // _imprimir_RX424()
            RX424.CONTADOR = 0;
            setTimeout(_imprimir_RX424, 100);
        })
        .catch(err => {
            console.debug(err);
        })
}

function _cargandoimpresion(estado) {
    switch (estado) {
        case 'imprimiendo':
            var ventanaimpresion = bootbox.dialog({
                message: '<div class="text-center"><div class="fa-3x"><i class="fa fa-spin fa-spinner"></i> Imprimiendo...</div></div>',
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


function _imprimir_RX424() {
    if (RX424.CONTADOR == RX424.FACTURAS.length - 1) {
        _cargandoimpresion_RX425('termino');
        RX424.CONTADOR = 0;
    } else {
        var datos_envio = datosEnvio();
        datos_envio += RX424.ADMINW + '|' + RX424.FACTURAS[RX424.CONTADOR].LLAVE_FACT
        console.debug(datos_envio);
        let URL = get_url("APP/SALUD/RXI02.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(function (data) {
                console.debug(data);
                RX424.IMPRESION = data.IMPRESION[0];
                RX424.IMPRESIONPPAL = data.IMPRESION[1].RESULTADOPPAL_RX + data.IMPRESION[2].RESULTADOPPAL_RX + data.IMPRESION[3].RESULTADOPPAL_RX + data.IMPRESION[4].RESULTADOPPAL_RX + data.IMPRESION[5].RESULTADOPPAL_RX + data.IMPRESION[6].RESULTADOPPAL_RX + data.IMPRESION[7].RESULTADOPPAL_RX + data.IMPRESION[8].RESULTADOPPAL_RX + data.IMPRESION[9].RESULTADOPPAL_RX + data.IMPRESION[10].RESULTADOPPAL_RX + data.IMPRESION[11].RESULTADOPPAL_RX;
                RX424.IMPRESIONCOMP = data.IMPRESION[12].RESULTADOCOMP_RX + data.IMPRESION[13].RESULTADOCOMP_RX + data.IMPRESION[14].RESULTADOCOMP_RX + data.IMPRESION[15].RESULTADOCOMP_RX + data.IMPRESION[16].RESULTADOCOMP_RX + data.IMPRESION[17].RESULTADOCOMP_RX + data.IMPRESION[18].RESULTADOCOMP_RX + data.IMPRESION[19].RESULTADOCOMP_RX;
                RX424.IMPRESIONADIC = data.IMPRESION[20].RESULTADOADIC_RX + data.IMPRESION[21].RESULTADOADIC_RX + data.IMPRESION[22].RESULTADOADIC_RX + data.IMPRESION[23].RESULTADOADIC_RX + data.IMPRESION[24].RESULTADOADIC_RX + data.IMPRESION[25].RESULTADOADIC_RX + data.IMPRESION[26].RESULTADOADIC_RX + data.IMPRESION[27].RESULTADOADIC_RX;
                // _impresion_RX424();
                RX424.CONTADOR = RX424.CONTADOR + 1;
                setTimeout(_imprimir_RX424,50);
                _impresion_RX424();
            })
            .catch(err => {
                console.debug(err);
            })
    }
}

function _cancelarpdf_RX424() {
    _datopdf_RX424();
}

function _impresion_RX424() {
    console.debug('impresion', RX424.IMPRESION);
    RX424.IMPRESION.FECHA_FACTRX = RX424.IMPRESION.FECHA_FACTRX + RX424.IMPRESION.HORA_FACTRX
    moment.defaultFormat = "YYYYMMDD HHmm";
    RX424.IMPRESION.FECHA_FACTRX = moment(RX424.IMPRESION.FECHA_FACTRX, moment.defaultFormat).format('MMM. D/YYYY')
    RX424.IMPRESION.USU = RX424.NOMBREUSU;
    RX424.IMPRESION.COMPROBANTE = RX424.IMPRESION.LLAVE_FACTRX.substring(13, 19);
    RX424.IMPRESION.SUCURSAL = RX424.IMPRESION.LLAVE_FACTRX.substring(10, 11);
    RX424.IMPRESION.NIT = RX424.IMPRESION.LLAVE_FACTRX.substring(2, 10);
    RX424.NOMBREPDF = RX424.IMPRESION.SUCURSAL + RX424.IMPRESION.COMPROBANTE;
    RX424.IMPRESION.RESULTADOPPAL = RX424.IMPRESIONPPAL;
    let desclo = RX424.IMPRESION.RESULTADOPPAL.split('-');
    RX424.IMPRESIONCOMP.trim() == '' ? RX424.IMPRESION.HTMLCOMPPPAL = '0' : RX424.IMPRESION.HTMLCOMPPPAL = RX424.IMPRESION.HTMLCOMPPPAL;
    RX424.IMPRESIONADIC.trim() == '' ? RX424.IMPRESION.HTMLADICPPAL = '0' : RX424.IMPRESION.HTMLADICPPAL = RX424.IMPRESION.HTMLADICPPAL;
    RX424.IMPRESION.HTMLRESULTADOPPAL = desclo[0] + '<br/> <br/>' + desclo[1] + '<br/> <br/>' + desclo[2];
    console.debug(desclo);
    console.debug('impresion', RX424.IMPRESION);
    opcinesImpresion_RX424 = {
        datos: RX424.IMPRESION,
        tipo: 'pdf_masivo',
        formato: 'rx/RXI02A.html',
        nombre: RX424.NOMBREPDF
    }
    imprimir(opcinesImpresion_RX424, finImpresion_RX424);
}

function finImpresion_RX424() {
    _cargandoimpresion('termino');
}