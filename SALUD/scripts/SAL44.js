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
    $_INVENTUSU = $_USUA_GLOBAL[0].INVENT;

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
    $('#anoini_9441').val($_ANOLNK);
    $('#mesini_9441').val($_MESLNK);
    validarInputs(
        {
            form: "#DIAINIC_9441",
            orden: '1'
        },
        () => { _evaluarprefijofact_sal44(); },
        () => {
            SAL44.DIAINI = $('#diaini_9441').val();
            SAL44.DIAINI = SAL44.DIAINI.padStart(2, '0');
            SAL44.FECHAINICIAL = $_ANOLNK + $_MESLNK + SAL44.DIAINI;
            console.log(SAL44.FECHAINICIAL, 'SAL44.FECHAINICIAL')
            _evaluarfechasal_sal44();
        }
    )
}

function _evaluarfechasal_sal44() {
    $('#anofin_9441').val($_ANOLNK);
    $('#mesfin_9441').val($_MESLNK);
    validarInputs(
        {
            form: "#DIAFINAL_9441",
            orden: '1'
        },
        () => { _evaluarfechaini_sal44(); },
        () => {
            SAL44.DIAFIN = $('#diafin_9441').val();
            SAL44.FECHAFINAL = $_ANOLNK + $_MESLNK + SAL44.DIAFIN;
            if (parseInt(SAL44.DIAFIN) < parseInt(SAL44.DIAINI)) {
                _evaluarfechasal_sal44();
            } else {
                let URL = get_url("APP/SALUD/SAL44-02.DLL");
                postData({ datosh: datosEnvio() + SAL44.PREFIJOW + '|' + SAL44.FECHAINICIAL + '|' + SAL44.FECHAFINAL }, URL)
                    .then(data => {
                        SAL44.RECONSOLIDACION = data.RECONSOLIDA;
                        swinvalid = SAL44.RECONSOLIDACION[0].ESTADO;
                        console.log(SAL44.RECONSOLIDACION, 'SAL44.RECONSOLIDACION')
                        loader("show");
                        if (swinvalid == '00') {
                            var CONTAITEM = 0; 
                            for (var i in SAL44.RECONSOLIDACION) {
                                SAL44.RECONSOLIDACION[i].CLIND == '0'?CONTAITEM++:console.log(CONTAITEM, 'CONTAITEM');
                                if ((SAL44.PREFIJOW == 'E') || (SAL44.PREFIJOW == 'C')) {
                                    let datos_envio = datosEnvio() + SAL44.RECONSOLIDACION[i].LLAVEFACT + '|';
                                    SolicitarDll({ datosh: datos_envio }, data => {
                                        console.log(data, 'INV020');
                                        dato = data.split('|');
                                        if (dato[0].trim() == '00') {
                                            _procesandofacturas_SAL44(i); 
                                        }
                                        else {
                                            CON852(dato[0], dato[1], dato[2], _toggleNav);
                                        }
                                    }, get_url('APP/SALUD/SAL020.DLL'));

                                } else if ($_NITUSU == '0830092718') {
                                    let datos_envio = datosEnvio() + SAL44.RECONSOLIDACION[i].LLAVEFACT + '|';
                                    SolicitarDll({ datosh: datos_envio }, data => {
                                        console.log(data, 'INV020', '0830092718');
                                        dato = data.split('|');
                                        if (dato[0].trim() == '00') {
                                            console.log('sale en el inv020 NIT USU')
                                        }
                                        else {
                                            CON852(dato[0], dato[1], dato[2], _toggleNav);
                                        }
                                    }, get_url('APP/SALUD/SAL020.DLL'));
                                }else{
                                    _procesandofacturas_SAL44(i);
                                }      
                            }
                            _borrarinput_SAL44()
                        } else {
                            $('#prefijo_9441').val('');
                            $('#descrippref_9441').val('');
                            $('#anoini_9441').val('');
                            $('#mesini_9441').val('');
                            $('#diaini_9441').val('');
                            $('#anofin_9441').val('');
                            $('#mesfin_9441').val('');
                            $('#diafin_9441').val('');
                            CON851('01', '01', null, 'error', 'error');
                            _evaluarprefijofact_sal44();
                        }
                        loader("hide");
                    })
                    .catch(err => {
                        console.debug(err);
                    })
            }
        }
    )
}

function _procesandofacturas_SAL44(i){
    console.log('procesandofacturas')
    var CONTAITEM2 = 0;
    if ($_INVENTUSU == 'S' && SAL44.RECONSOLIDACION[i].CLIND == '0' || SAL44.RECONSOLIDACION[i].MACROIND == '1' && parseInt(SAL44.RECONSOLIDACION[i].INVEIND) > 0) {
        console.log('entro procesandofacturas')
        SAL44.SWRECAL = '0';
        CONTAITEM2++;
        let datos_envio = datosEnvio() + '|' + SAL44.LLAVEFACT + '|' + SAL44.SWRECAL + '|';
        SolicitarDll({ datosh: datos_envio }, data => {
            console.debug(data, 'respuesta');
            // $('#').val(CONTAITEM);
            // $('#').val(CONTAITEM2);
            let datos_envio = datosEnvio() + '|' + SAL44.LLAVEFACT + '|';
            SolicitarDll({ datosh: datos_envio }, data => {
                console.debug(data);
                var date = data.split('|');
                SAL44.SWBUSCAR = date[0].trim();
                if (SAL44.SWBUSCAR == '0' && SAL44.RECONSOLIDACION[i].CLIND == '0') {
                    CON851('3M', '3M', null, 'error', 'error');
                    console.log('2 no actualizo inventarios')
                } else {
                    console.log('2 si actualizo inventarios')
                }
            }, get_url('APP/SALUD/SAL030V.DLL'));
        }, get_url('APP/SALUD/SAL030.DLL'));
    }else{
        console.log('finaliza')
    }
}


function _borrarinput_SAL44() {
    _inputControl('reset');
    _inputControl('disabled');
    _evaluarprefijofact_sal44();
}




///////////////////OTRASFUNCIONES/////////////
var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);
