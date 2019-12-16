var FAC135C = [];

$(document).ready(() => {
    FAC135C.COMPLIMI = '99999';
    FAC135C.LOTEW = '4R';
    FAC135C.NOMBRELOTEW = 'COPAGOS';
    _inputControl('reset');
    _inputControl('disabled');
    $('#nombrelote_FAC135C').val(FAC135C.NOMBRELOTEW);
    let datos_envio = datosEnvio()
    datos_envio += localStorage.getItem('Usuario').trim();
    SolicitarDll({ datosh: datos_envio }, data => {
        console.debug(data);
        data = data.split('|');
        console.debug(data);
        $_NOMBREOPERW = data[0].trim();
        var $_SUCOPERW = $_NOMBREOPERW.substring(28, 30);
        var $_SUCOPERW = '01';
        console.debug($_SUCOPERW);
        FAC135C.SUCFACTW = $_SUCOPERW;
        // console.debug(SUCFACTW);
        let URL = get_url("APP/CONTAB/CON007.DLL");
        postData({ datosh: datosEnvio() + FAC135C.LOTEW }, URL)
            .then(data => {
                console.debug(data);
                var data = data.split("|");
                FAC135C.COMPINGRESO = parseInt(data[1].substring(3, 9));
                $('#comprobante_FAC135C').val(FAC135C.COMPINGRESO);
                FAC135C.ULTFECHANUM = data[2].trim();
                FAC135C.FECHACOMP = moment().format('YYYY-MM-DD');
                switch ($_USUA_GLOBAL[0].NIT) {
                    case 900004059:
                        FAC135C.HORACORTE = '0630';
                        FAC135C.FECHACOMP = moment(FAC135C.FECHACOMP).subtract(1, 'days');
                        break;
                    default:
                        FAC135C.HORACORTE = '0000'
                        break;
                }
                $('#nombreusu_FAC135C').val(FAC135C.LOTEW + ' ' + $_USUA_GLOBAL[0].NOMBRE);
                $('#fechaelaboracion_FAC135C').val(FAC135C.FECHACOMP);
                _evaluaranodir_FAC135C();
            })
            .catch(err => {
                console.debug(err);
            })
    }, get_url('APP/CONTAB/CON003.DLL'));
})

function _evaluaranodir_FAC135C() {
    validarInputs({
        form: '#VALIDAR1_FAC135C',
        orden: '1'
    },
        () => { _toggleNav() },
        () => {
            FAC135C.ANODIRW = $('#anodir_FAC135C').val();
            if (FAC135C.SUCFACTW.trim() == '') {
                _evaluarsucursal_FAC135C();
            } else {
                $('#sucursal_FAC135C').val(FAC135C.SUCFACTW);
                _evaluarfactura_FAC135C();
            }
        }
    )
}

function _evaluarsucursal_FAC135C() {
    $('#sucursal_FAC135C').val($_USUA_GLOBAL[0].PREFIJ);
    validarInputs({
        form: '#VALIDAR2_FAC135C',
        orden: '1'
    },
        () => { _toggleNav() },
        () => {
            FAC135C.SUCFACTW = $('#sucursal_FAC135C').val();
            _evaluarfactura_FAC135C('1');
        }
    )
}

function _evaluarfactura_FAC135C(orden) {
    prefijoMask_FAC135C.typedValue = 'P';
    validarInputs({
        form: '#VALIDAR3_FAC135C',
        orden: orden
    },
        () => { _toggleNav() },
        () => {
            FAC135C.PREFIJOW = prefijoMask_FAC135C.value;
            FAC135C.NRONUMW = nronumMask_FAC135C.value;
            FAC135C.CLFACTW = tipofactMask_FAC135C.value;

            let URL = get_url("APP/SALUD/FAC135C.DLL");
            postData({ datosh: datosEnvio() + '1|' + FAC135C.SUCFACTW + FAC135C.CLFACTW + FAC135C.NRONUMW.padStart(6,'0') + '|' + FAC135C.CLFACTW + '|' + FAC135C.FECHACOMP.replace(/-/g, '') + '|' }, URL)
                .then(data => {
                    console.debug(data);
                    FAC135C.TOTALFACT = data.VLRCOPAGO[0].TOTALFACT.trim();
                    FAC135C.TOTALFACT = '' ? '0' : FAC135C.TOTALFACT = FAC135C.TOTALFACT;
                    FAC135C.COPAGOESTW = data.VLRCOPAGO[0].COPAGO;
                    FAC135C.DESCRIPTER = data.VLRCOPAGO[0].DESCRIP_TER;
                    FAC135C.DESCRIPPACI = data.VLRCOPAGO[0].DESCRIP_PACI;
                    FAC135C.CODTER = data.VLRCOPAGO[0].COD_TER;
                    FAC135C.ACTTER = data.VLRCOPAGO[0].ACT_TER;
                    FAC135C.TABLA = [];
                    if (parseInt(FAC135C.TOTALFACT) <= 0) {
                        CON851('', '16', null, 'error', 'Error');
                        _evaluaranodir_FAC135C();
                    } else {
                        FAC135C.COPAGOESTW = FAC135C.TOTALFACT;
                        if (parseInt(FAC135C.COPAGOESTW) <= 0) {
                            CON851('', '07', null, 'error', 'Error');
                            _evaluaranodir_FAC135C();
                        } else {
                            if (FAC135C.ACTTER == '01') {
                                FAC135C.ACTTER = '25';
                            } if ((($_USUA_GLOBAL[0].PUC == '4') || ($_USUA_GLOBAL[0].PUC == '6')) && ((FAC135C.ACTTER == '41') || (FAC135C.ACTTER == '42') || (FAC135C.ACTTER == '43') || (FAC135C.ACTTER == '44') || (FAC135C.ACTTER == '45') || (FAC135C.ACTTER == '46'))) {
                                FAC135C.ACTTER = '31';
                            } if (((FAC135C.CLFACTW == 'D') || (FAC135C.CLFACTW == 'E') || (FAC135C.CLFACTW == 'C')) && (FAC135C.ACTTER != FAC135C.ACTPARTIC1) && (FAC135C.ACTTER != FAC135C.ACTPARTIC2)) {
                                switch ($_USUA_GLOBAL[0].PUC) {
                                    case '1':
                                        FAC135C.TABLA[0] = '13050500001';
                                        break;
                                    case '3':
                                        FAC135C.TABLA[0].CODIGOCONTROL = FAC135C.CTACOPAGO;
                                        break;
                                    case '4':
                                        FAC135C.TABLA[0].CODIGOCONTROL = FAC135C.CTACOPAGO;
                                        break;
                                    case '5':
                                        FAC135C.TABLA[0].CODIGOCONTROL = FAC135C.CTACOPAGO;
                                    case '6':
                                        FAC135C.TABLA[0].CODIGOCONTROL = FAC135C.CTACOPAGO;
                                        FAC135C.TABLA[0].FLUJOARR = '112';
                                }
                            } else {
                                switch ($_USUA_GLOBAL[0].PUC) {
                                    case '1':
                                        FAC135C.TABLA[0] = '13050500001';
                                        break;
                                    case '2':
                                        FAC135C.TABLA[0].CODIGOCONTROL = '16150200001';
                                        break;
                                    case '3':
                                        FAC135C.TABLA[0].CODIGOCONTROL = '13052500001';
                                        break;
                                    case '4':
                                        FAC135C.TABLA[0].CODIGOCONTROL = '14090700001';
                                        FAC135C.TABLA[0].FLUJOARR = '112';
                                        break;
                                    case '5':
                                        FAC135C.TABLA[0].CODIGOCONTROL = '13012406025';
                                    case '6':
                                        FAC135C.TABLA[0].CODIGOCONTROL = '13191600001';
                                        FAC135C.TABLA[0].FLUJOARR = '112';
                                }
                            }
                            FAC135C.TABLA[0].NITARR = FAC135C.CODTER;
                            FAC135C.TABLA[0].SUCURSALARR = FAC135C.CLFACTW;
                            if (FAC135C.CLFACTW == 'C') {
                                FAC135C.TABLA[0].SUCURSALARR = 'E';
                            }
                            FAC135C.TABLA[0].DOCUMARR = FAC135C.NRONUMW;
                            FAC135C.TABLA[0].COSTOARR = '00';
                            FAC135C.TABLA[0].VALORARR = '-' + FAC135C.COPAGOESTW;
                            FAC135C.TABLA[0].DETALLEARR = FAC135C.DESCRIPPACI;
                            FAC135C.TABLA[0] = FAC135C.TABLA[1];
                        }
                    }
                })
                .catch(err => {
                    console.debug(err);
                    _evaluarfactura_FAC135C('1');
                })
        }
    )
}


///////////////////////////////////// MASCARAS /////////////////////////////////////////////////////////
var prefijoMask_FAC135C = IMask($("#factura_FAC135C")[0], {
    mask: 'a',
    definitions: {
        'a': /[C,D]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var tipofactMask_FAC135C = IMask($("#tipofact_FAC135C")[0], {
    mask: '0',
    definitions: {
        '0': /[0-7]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var nronumMask_FAC135C = new IMask($('#facturad_FAC135C')[0], { mask: Number });