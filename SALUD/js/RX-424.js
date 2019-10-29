var RX424 = []; var PDF = []; var IMPRESION = [];

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
var nrofactMask_RX424 = new IMask($('#medico_rx424')[0], { mask: Number });
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
});

function _evaluarprefijo_RX424(orden) {
    $('#prefijo_rx424').val(RX424.PREFIJOUSU);
    momentMask_RX424.updateValue();
    desdeMask_RX424.typedValue = '1';
    hastaMask_RX424.typedValue = '999999';
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
    desdeMask_RX424.typedValue = '1';
    hastaMask_RX424.typedValue = '999999';
    RX424['NROINIW'] = parseInt(desdeMask_RX424.unmaskedValue);
    RX424['NROFINW'] = parseInt(hastaMask_RX424.unmaskedValue);
    RX424['FECHAINI'] = momentMask_RX424.unmaskedValue;
    console.debug(RX424.FECHAINI);
    datos_envio = datosEnvio();
    datos_envio += RX424.ADMINW + '|' + '1' + '|' + RX424.FECHAINI + '|' + RX424.CODTER + '|' + RX424.CODPROF
    // SolicitarDll({ datosh: datos_envio }, _dataRX424_1, get_url("APP/SALUD/RX424.DLL"));
    let URL = get_url("APP/SALUD/RX424.DLL");
    postData({datosh:datos_envio}, URL)
    .then(function (data)  {
        console.debug(data);
    })
    .catch(err => {
        console.debug(err);
    })
}
function _dataRX424_1(data){
    console.debug(data);
    RX424.DATA = data;
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
    if (RX424.SWNIT == '99') {
        $('#cliented_rx424').val('TODOS LOS CLIENTES');
        _evaluarmedico_RX424();
    }
    else {
        _consultaSql({
            db: 'san2019_13',
            sql: 'SELECT * FROM san2019_13.sc_archter WHERE codigo LIKE "%' + RX424.SWNIT + '%"',
            callback: function (error, results, fields) {
                if (error) throw error;
                else {
                    console.debug(results);
                    if (results.length == 0) {
                        CON851('01', '01', null, 'error', 'Error');
                        _evaluarcliente_RX424();
                    } else {
                        for (var i in results) {
                            if (results[i].codigo == RX424.SWNIT) {
                                $('#cliented_rx424').val(results[i].descripcion);
                                _evaluarmedico_RX424();
                                break;
                            }
                        }
                    }
                }
            }
        });
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
    if (RX424.SWMED == '99') {
        $('#medicod_rx424').val('TODOS LOS MEDICOS');
        _evaluarfactura_RX424();
    }
    else {
        _consultaSql({
            db: 'san2019_13',
            sql: 'SELECT * FROM san2019_13.sc_archprof WHERE codigo LIKE "%' + RX424.SWMED + '%"',
            callback: function (error, results, fields) {
                if (error) throw error;
                else {
                    console.debug(results);
                    if (results.length == 0) {
                        CON851('01', '01', null, 'error', 'Error');
                        _evaluarmedico_RX424();
                    } else {
                        for (var i in results) {
                            if (results[i].codigo == RX424.SWMED) {
                                $('#medicod_rx424').val(results[i].descripcion);
                                _evaluarfactura_RX424();
                                break;
                            }
                        }
                    }
                }
            }
        });
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
    } else if (RX424.PREFFACTW.trim() == '') {
        _evaluarfactura_RX424();
    } else {
        _evaluarctafact_RX424();
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
    if (RX424.SWPDF == 'S'){
        CON851P('04', _cancelarpdf_RX424, _confirmarpdf_RX424);
    } else{
        _datopdf_RX424();
    }
}

function _confirmarpdf_RX424() {
    for (var i in PDF) {
        if ((RX424.SUCW == '**') || (RX424.SUCW == PDF[i].suc_fact)){
            if ((RX424.SWNIT == '99') || (RX424.SWNIT == PDF[i].nit_fact)){
                if ((RX424.SWMED == '99') || (RX424.SWMED == PDF[i].med_otr_fact)){
                    if ((RX424.PREFFACTW == '*') || (RX424.CTAFACTW == PDF[i].nro_fact)){
                        if ((PDF[i].fecha_fact) < (RX424.FECHAFIN)){
                            if (PDF[i].nro_fact > RX424.NROINIW && PDF[i].nro_fact < RX424.NROFINW){
                                IMPRESION[i] = PDF[i];
                                console.debug(IMPRESION);
                            }
                        }
                    }
                }
            }
        } 
    }
    _impresion_RX424();
}

function _cancelarpdf_RX424() {
    _datopdf_RX424();
}

function _impresion_RX424(){
console.debug('impresion');

imprimir(opcinesImpresion_RX424, finImpresion_RX424);
}

function finImpresion_RX424(){
    _toggleNav();
}