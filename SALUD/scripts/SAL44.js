/* NOMBRE RM --> INV404 // NOMBRE ELECTR --> SAL44 */

var SAL44 = [];



$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_ANOLNK = 20 + $_ANOLNK; 
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_CONTADOUSU = $_USUA_GLOBAL[0].CONTADO;
    $_PUCUSU = $_USUA_GLOBAL[0].PUC;
    $_LOTEFARMUSU = $_USUA_GLOBAL[0].LOTE_FAMR;
    $_SALMINUSU = $_USUA_GLOBAL[0].SAL_MIN;
    $_BARRAS_USU = $_USUA_GLOBAL[0].BARRAS;
    $_IVA_USU = $_USUA_GLOBAL[0].IVA1;
    $_IVA_2_USU = $_USUA_GLOBAL[0].IVA2;
    $_IVA_3_USU = $_USUA_GLOBAL[0].IVA3;
    $_CLAVEINVUSU = $_USUA_GLOBAL[0].CLAVE_INV;
    $_BARRASUSULNK = ' ';
    $_LISTAPRECIOUSU = $_USUA_GLOBAL[0].LISTA_PRECIO;
    $_CODCIUUSU = $_USUA_GLOBAL[0].CONTROL_USU
    $_DPTCIUUSU = $_CODCIUUSU.substring(0, 1);
    $_CIUCIUUSU = $_CODCIUUSU.substring(1, 5);


    _toggleF8([
        { input: 'prefijo', app: '9441', funct: _ventanaprefijo_9441 },
    ]);


    _evaluarprefijofact_sal44();

});


function _ventanaprefijo_9441(e) {
    var formapago = '[{"COD": "E","DESCRIP": "E- EFECTIVO"},{"COD": "C", "DESCRIP": "C- CREDITO"},{"COD": "P","DESCRIP": "P- PENSIONADO"}, {"COD": "A", "DESCRIP": "A- AMBULATORIO"}, {"COD": "T", "DESCRIP": "T- T- ACC.TRANS"}]'
    var formaspago = JSON.parse(formapago);
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE PAGO",
            columnas: ["COD", "DESCRIP"],
            data: formaspago,
            callback_esc: function () {
                $("#prefijo_9441").focus();
            },
            callback: function (data) {
                $('#prefijo_9441').val(data.COD.trim());
                // $('#descrippref_9441').val(data.DESCRIP.trim());
                _enterInput('#prefijo_9441');
            }
        });
    }
}

function _evaluarprefijofact_sal44() {
    validarInputs(
        {
            form: "#PREFIJO_9441",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SAL44.PREFIJOW = $('#prefijo_9441').val();
            switch (SAL44.PREFIJOW) {
                case "E":
                    $('#descrippref_9441').val('CONTADO');
                    _evaluarfechaini_sal44();
                    break;
                case "C":
                    $('#descrippref_9441').val('CREDITO');
                    _evaluarfechaini_sal44();
                    break;
                case "P":
                    $('#descrippref_9441').val('PENSIONADO');
                    _evaluarfechaini_sal44();
                    break;
                case "A":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "B":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "D":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "F":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "G":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "H":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "I":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "J":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "K":
                    $('#descrippref_9441').val('AMBULATORIO'); 
                case "L":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "M":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "N":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "O":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "Q":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "R":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "S":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "V":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "W":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "X":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "Y":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "Z":
                    $('#descrippref_9441').val('AMBULATORIO');
                case "T":
                    $('#descrippref_9441').val('AMBULATORIO');
                    _evaluarfechaini_sal44();
                    break; 
                default:
                    _evaluarprefijofact_sal44(); 
                    break;
            }

        }
    )
}


function _evaluarfechaini_sal44() {
    momentMaskfechainicial.updateValue();
    validarInputs(
        {
            form: "#FECHAINIC_9441",
            orden: '1'
        },
        () => { _evaluarprefijofact_sal44(); },
        () => {
            SAL44.FECHAINICIAL = momentMaskfechainicial.unmaskedValue;
            console.log(SAL44.FECHAINICIAL, 'SAL44.FECHAINICIAL')
            LLAMADO_DLL({
                dato: [SAL44.FECHAINICIAL],
                callback: _consultafechaini_sal44,
                nombredll: 'SAL44-01',
                carpeta: 'SALUD'
            });

        }
    )
}

function _consultafechaini_sal44(data){
    console.log(data, 'fecha inicial result')
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _evaluarfechasal_sal44(); 
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarfechaini_sal44();
    }
}

function _evaluarfechasal_sal44(){
    momentMaskfechafinal.updateValue();
    validarInputs(
        {
            form: "#FECHAFINAL_9441",
            orden: '1'
        },
        () => { _evaluarfechaini_sal44(); },
        () => {

            SAL44.FECHAFINAL = momentMaskfechafinal.unmaskedValue;
            console.log(SAL44.FECHAFINAL, 'SAL44.FECHAFINAL')
            if(( parseInt(SAL44.FECHAFINAL)) > (parseInt(SAL44.FECHAINICIAL))){
                console.log('fecha inicial menor a fecha final')
                _evaluarfechasal_sal44(); 
            }else{
                console.log('va bien')
                _leerfacturas_sal44(); 
            }
        }
    )
}
function _leerfacturas_sal44(){
    console.log('consulta de leer facturas')
}




///////////////////OTRASFUNCIONES/////////////
var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);

var momentFormatfechaini = "YYYY-MM-DD";

var momentMaskfechainicial = IMask($("#fechaini_9441")[0], {
    mask: Date,
    pattern: momentFormatfechaini,
    lazy: true,
    min: new Date(2019, 0, 1),
    max: new Date(2025, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormatfechaini);
    },
    parse: function (str) {
        return moment(str, momentFormatfechaini);
    },
    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: $_ANOLNK,
            to: $_ANOLNK 
        },
        MM: {
            mask: IMask.MaskedRange,
            from: $_MESLNK,
            to: $_MESLNK
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        }
    }

});

var momentMaskfechafinal = IMask($("#fechafin_9441")[0], {
    mask: Date,
    pattern: momentFormatfechaini,
    lazy: true,
    min: new Date(2019, 0, 1),
    max: new Date(2025, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormatfechaini);
    },
    parse: function (str) {
        return moment(str, momentFormatfechaini);
    },
    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: $_ANOLNK,
            to: $_ANOLNK 
        },
        MM: {
            mask: IMask.MaskedRange,
            from: $_MESLNK,
            to: $_MESLNK
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        }
    }

});




