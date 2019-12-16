var FAC135 = [];

$(document).ready(() => {
    FAC135.COMPLIMI = '99999';
    FAC135.LOTEW = '2R';
    _inputControl('reset');
    _inputControl('disabled');
    $('#nombreusu_FAC135').val(FAC135.LOTEW + ' ' + $_USUA_GLOBAL[0].NOMBRE.trim());
    let URL = get_url("APP/SALUD/FAC135.DLL");
    postData({ datosh: datosEnvio() + '1|' + FAC135.LOTEW }, URL)
        .then(data => {
            console.debug(data);
            FAC135.NOMBRELOTE = data.CONSULTA[0].NOMBRE_LOTE;
            $('#nombrelote_FAC135').val(FAC135.NOMBRELOTE);
            let URL = get_url("APP/CONTAB/CON007.DLL");
            postData({ datosh: datosEnvio() + FAC135.LOTEW }, URL)
                .then(data => {
                    console.debug(data);
                    var data = data.split("|");
                    FAC135.COMPINGRESO = parseInt(data[1].substring(3, 9));
                    $('#comprobante_FAC135').val(FAC135.COMPINGRESO);
                    FAC135.ULTFECHANUM = data[2].trim();
                    FAC135.FECHACOMP = moment().format('YYYY-MM-DD');
                    FechaelaboracionMask_FAC135.typedValue = FAC135.FECHACOMP;
                    switch ($_USUA_GLOBAL[0].NIT) {
                        case 900004059:
                            FAC135.HORACORTE = '0630';
                            FAC135.FECHACOMP = moment(FAC135.FECHACOMP).subtract(1,'days');
                            break;
                        default:
                            FAC135.HORACORTE = '0000'
                            break;
                    }
                    FechaelaboracionMask_FAC135.typedValue = FAC135.FECHACOMP;
                    _evaluarfechaelaboracion_FAC135();
                })
                .catch(err => {
                    console.debug(err);
                })
        })
        .catch(err => {
            console.debug(err);
        })
})

function fechaelaboracion_FAC135(){
    validarInputs({
        form: '#VALIDAR1_FAC135',
        orden: '1'
    },
        () => { _toggleNav() },
        () => {
            FAC135.ANODIRW = FechaelaboracionMask_FAC135.value;
            _evaluarsucursal_FAC135();
        }
    )
}

function _evaluarsucursal_FAC135(){
    $('#sucursal_FAC135').val($_USUA_GLOBAL[0].PREFIJ);
    validarInputs({
        form: '#VALIDAR2_FAC135',
        orden: '1'
    },
        () => { _toggleNav() },
        () => {
            FAC135.SUCFACTW = $('#sucursal_FAC135').val();
            _evaluarfactura_FAC135();
        }
    )
}

function _evaluarfactura_FAC135(orden){
    prefijoMask_FAC135.typedValue = 'P';
    validarInputs({
        form: '#VALIDAR3_FAC135',
        orden: orden
    },
        () => { _toggleNav() },
        () => {
            FAC135.PREFIJOW = prefijoMask_FAC135.value;
            FAC135.NRONUMW = nronumMask_FAC135.value;
        }
    )
}


///////////////////////////////////// MASCARAS /////////////////////////////////////////////////////////
var ano = moment().format('YYYY');
var anterior = (parseInt(ano) - 1).toString();
var mes = moment().format('MM');
var FechaelaboracionMask_FAC135 = IMask($("#fechaelaboracion_FAC135")[0], {
    mask: Date,
    pattern: 'Y-M-d',
    lazy: true,
    overwrite: true,
    autofix: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: anterior, to: ano, maxLength: 4 },
        M: { mask: IMask.MaskedRange, placeholderChar: 'M', from: mes, to: mes, maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        if (fecha == "Invalid date") {
            CON851('01', '01', null, 'error', 'error');
        }
        else {
            return str;
        }
    }
});
var prefijoMask_FAC135 = IMask($("#factura_FAC135")[0], {
    mask: 'a',
    definitions: {
        'a': /[C,E,P,T,D]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var nronumMask_FAC135 = new IMask($('#facturad_FAC135')[0], { mask: Number });