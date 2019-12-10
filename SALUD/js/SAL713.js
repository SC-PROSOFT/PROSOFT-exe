/* NOMBRE RM --> SER102 // NOMBRE ELECTR --> SAL713 */

var $_tiposer713, $liquidar713, $increm713;
var $_CTAMAYOR_703 = [];
var $_GRUPOSER_703 = [];
var $_TABLA_703 = [];

var vlrmonto_713Mask = new IMask(document.getElementById('monto_713'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
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
        { input: 'codtar', app: '713', funct: _ventanaNomtarif },
        { input: 'grupo', app: '713', funct: _ventanaGruposer },
        { input: 'cups', app: '713', funct: _ventanaTablatarif },
        { input: 'divis', app: '713', funct: _ventanaDivis },
        { input: 'contab', app: '713', funct: _ventanaContab }

    ]);
    obtenerDatosCompletos({
        nombreFd: 'CTA-MAYOR'
    }, function (data) {
        $_CTAMAYOR_703 = data.MAESTROS;
        $_CTAMAYOR_703.pop()
        obtenerDatosCompletos({
            nombreFd: 'GRUPO-SER'

        }, function (data) {
            $_GRUPOSER_703 = data.CODIGOS;
            obtenerDatosCompletos({
                nombreFd: 'TABLAS'

            }, function (data) {
                $_TABLA_703 = data.TABLA;
                CON850(_evaluarCON850);
            })
        })
    })


});



function _ventanaNomtarif(e) {
    var $_CONVENIO_713 = [];
    let URL = get_url("APP/" + "SALUD/SER803" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CONVENIO_713 = data;
            console.log($_CONVENIO_713, '$_CONVENIO_715')
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE NOMDRE TARIFAS",
                    columnas: ["COD", "DESCRIP"],
                    data: $_CONVENIO_713.NOMTAR,
                    callback_esc: function () {
                        $("#codtar_713").focus();
                    },
                    callback: function (data) {
                        console.log(data)
                        $('#codtar_713').val(data.COD);
                        $('#descptar_713').val(data.DESCRIP.trim());

                        _enterInput('#codtar_713');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaGruposer(e) {

    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "GRUPOS DE SERVICIO",
            columnas: ["COD", "DESCRIP"],
            data: $_GRUPOSER_703,
            callback_esc: function () {
                $("#grupo_713").focus();
            },
            callback: function (data) {
                console.debug(data);
                $('#grupo_713').val(data.COD.trim())
                $('#descrgrp_103').val(data.DESCRIP.trim())
                _enterInput('#grupo_713');
            }
        });
    }

}

function _ventanaTablatarif(e) {

    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA TABLAS DE TARIFA",
            columnas: ["COD", "TIPO", 'COD_SER',"DESCRIP"],
            data: $_TABLA_703,
            callback_esc: function () {
                ('#cups_713').focus()
            },
            callback: function (data) {
                console.debug(data);
                var cod713 = data.COD_SER
                $('#cups_713').val(cod713.substring(2, 15));
                $('#descrpcups_103').val(data.DESCRIP.trim());
                _enterInput('#cups_713');
            }
        });
    }

}

function _ventanaDivis(e) {
    var $_DIVISION_713 = [];
    let URL = get_url("APP/" + "INVENT/INV809-03" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_DIVISION_713 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONSULTA DE DIVISION",
                    columnas: ["COD", "DESCRIP"],
                    data: $_DIVISION_713.CODIGOS,
                    callback_esc: function () {
                        $("#divis_713").focus();
                    },
                    callback: function (data) {
                        document.getElementById('divis_713').value = data.COD.trim();
                        document.getElementById('descrpdiv_713').value = data.DESCRIP;
                        _enterInput('#divis_713');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });

}

function _ventanaContab(e) {
    loader('hide');
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite({
            titulo: 'VENTANA PLAN DE CUENTAS',
            columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "NOMBRE_MAE", "TIPO_MAE"],
            data: $_CTAMAYOR_103,
            callback_esc: function () {
                $("#contab_713").focus();
            },
            callback: function (data) {
                console.debug(data);
                $('#contab_713').val(data.CTA_MAY.trim() + data.SUB_CTA.trim() + data.AUX_MAE.trim() + data.TIPO_MAE.trim())
                $('#descontab_713').val(data.NOMBRE_MAE.trim())
                _enterInput('#contab_713');
            }
        });
    }
}

// NOVEDAD //
function _evaluarCON850(novedad) {

    $_NovedSal713 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarDato713();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#noved713').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarDato713() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        _validacionestarifa_713
    )
}
function _validacionestarifa_713() {
    $codigo713 = $('#codtar_713').val();

    if ($codigo713.trim() == '') {
        console.log('origen')
        CON851('01', '01', null, 'error', 'error');
        _validarDato713()
    } else {
        console.log('evaluar dll')
        LLAMADO_DLL({
            dato: [$codigo713],
            callback: _dataCONSULTANOMTAR_713,
            nombredll: 'SAL715_01',
            carpeta: 'SALUD'
        });
    }
}

function _dataCONSULTANOMTAR_713(data) {
    console.log(data, 'SAL713-01')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPNOMTAR_713 = date[1].trim();
    console.log($_DESCRIPNOMTAR_713, '$_DESCRIPNOMTAR_715')
    if (swinvalid == "00") {
        $('#descptar_713').val($_DESCRIPNOMTAR_713);
        tipoSer_713()

    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _validarDato713();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function tipoSer_713() {
    if ($_NITUSU == '0800156469') {
        var tiposer = '[{"COD": "0","DESCRIP": "Drogueria"},{"COD": "1", "DESCRIP": "Cirugias"},{"COD": "2","DESCRIP": "Ecografias."},{"COD": "3","DESCRIP": "RX - Imagenol"},{ "COD": "4", "DESCRIP": "Doppler" },{ "COD": "5", "DESCRIP": "T.A.C" },{ "COD": "6", "DESCRIP": "Resonancia Nuclear" },{ "COD": "7", "DESCRIP": "Promoc y Preven" }]'
        var datoSerTarif = JSON.parse(tiposer);
    } else {
        var tiposer = '[{"COD": "0","DESCRIP": "Drogueria"},{"COD": "1", "DESCRIP": "Cirugias"},{"COD": "2","DESCRIP": "Laboratorio y Otros diag."},{"COD": "3","DESCRIP": "RX - Imagenol"},{ "COD": "4", "DESCRIP": "Otros Servic" },{ "COD": "5", "DESCRIP": "Consulta y Terap" },{ "COD": "6", "DESCRIP": "Patologia" },{ "COD": "7", "DESCRIP": "Promoc y Preven" }]'
        var datoSerTarif = JSON.parse(tiposer);
    }
    POPUP({
        array: datoSerTarif,
        titulo: 'Tipo de Servicio?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_tiposer713,
        callback_f: _validarDato713,
        teclaAlterna: true

    }, _evaluartiposerv_713);
}

function _evaluartiposerv_713(datoSerTarif) {
    $_tiposer713 = datoSerTarif.COD;
    switch (datoSerTarif.COD) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
            $('#tiposer_713').val(datoSerTarif.COD)
            $('#descpser_713').val(datoSerTarif.DESCRIP)
            grupoTar713();
            break;
        default:
            _validarDato713();
            break;
    }
}

function grupoTar713() {
    validarInputs(
        {
            form: "#grupo",
            orden: '1'
        },
        function () { tipoSer_713(); },
        validacionesgrupo_713
    )
}

function validacionesgrupo_713() {
    console.log('validar grupo')
    $grupo713 = $('#grupo_713').val();
    if ($grupo713.trim() == '') {
        console.log('grupo en espacios')
        CON851('02', '02', null, 'error', 'error');
        grupoTar713();
    } else {
        LLAMADO_DLL({
            dato: [$grupo713],
            callback: _dataCONSULTAGRUPO_715,
            nombredll: 'SAL713-04',
            carpeta: 'SALUD'
        });

    }
}
function _dataCONSULTAGRUPO_715(data) {
    console.log(data, 'SAL715-01')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPGRUPOTAR_713 = date[1].trim();
    if (swinvalid == "00") {
        $('#descrgrp_103').val($_DESCRIPGRUPOTAR_713);
        _validarCodig();
    } else if (swinvalid == "01") {
        if ($grupo713 == 'XX') {
            $_DESCRIPGRUPOTAR_713 = 'CODIGOS FUERA DE CUPS';
            $('#descrgrp_103').val($_DESCRIPGRUPOTAR_713);
            _validarCodig();
        } else {
            CON851('01', '01', null, 'error', 'error');
            grupoTar713();
        }
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _validarCodig() {
    console.log('evaluaciones COD TABLA')
    validarInputs(
        {
            form: "#codcups",
            orden: '1'
        },
        function () { grupoTar713(); },
        _validacionescodtabla_713
    )
}
function _validacionescodtabla_713() {
    console.log('validar CODIGO TABLA')
    $codigocups713 = $('#cups_713').val();

    if ($codigocups713.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _validarCodig();
    } else {
        $codserr713 = $grupo713 + $codigocups713;
        LLAMADO_DLL({
            dato: [$codserr713],
            callback: _datavalidarcups_713,
            nombredll: 'SAL713-03',
            carpeta: 'SALUD'
        });

    }
}
function _datavalidarcups_713(data) {
    console.log(data, 'SAL713-03')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $descripcups713 = date[1].trim();
    $tipocup = date[2].trim();
    if (swinvalid == "00") {
        if (($tipocup != $_tiposer713) && ($_tiposer713 != '7')) {
            jAlert({ titulo: 'Error ', mensaje: 'Atencion! el tipo dado para este proceso, no corresponde con el tipo de los cups' }, _validarCodig);
        } else {
            $('#descrpcups_103').val($descripcups713);
            consultatabla_713();
        }
    } else if (swinvalid == "01") {
        jAlert({ titulo: 'Error ', mensaje: 'Atencion! Este proceso No esta codificado en los cups, Puede actualizar los cups por la opc 7.1.8' }, _validarCodig);

    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function consultatabla_713() {
    console.log('CONSULTA TABLA')
    $llavetab713 = $codigo713 + $_tiposer713 + $grupo713 + $codigocups713;

    LLAMADO_DLL({
        dato: [$llavetab713],
        callback: _datavalidartabla_713,
        nombredll: 'SAL713-01',
        carpeta: 'SALUD'
    });

}
function _datavalidartabla_713(data) {
    console.log(data, 'SAL713-01')
    var date = data.split('|');
    var swinvalid = date[0].trim();

    if (($_NovedSal713 == '7') && (swinvalid == '01')) {
        console.log('novedad 7 error 01')
        _descriptabla()
    }
    else if (($_NovedSal713 == '7') && (swinvalid == '00')) {
        console.log('novedad 7 error 00')
        CON851('00', '00', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }
    else if (($_NovedSal713 == '8') && (swinvalid == '00')) {
        console.log('novedad 8 error 00')
        _llenarCampos713();
    }
    else if (($_NovedSal713 == '8') && (swinvalid == '01')) {
        console.log('novedad 8 error 01')
        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }
    else if (($_NovedSal713 == '9') && (swinvalid == '00')) {
        console.log('novedad 9 error 00')
        _llenarCampos713();
    }
    else if (($_NovedSal713 == '9') && (swinvalid == '01')) {
        console.log('novedad 9 error 01')
        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }
}

function _descriptabla() {
    validarInputs(
        {
            form: "#DESCRIPCUPS_713",
            orden: '1'
        },
        function () { _validarCodig() },
        _validacionesdescriptabla_713
    )
}
function _validacionesdescriptabla_713() {
    $descripcups713 = $('#descrpcups_103').val();
    if ($descripcups713.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _descriptabla()
    } else {
        _validarformliqui_713();
    }
}
function _validarformliqui_713() {
    var liquidar = [
        { "COD": "1", "DESCRIP": "Puntos" },
        { "COD": "2", "DESCRIP": "Grupos" },
        { "COD": "3", "DESCRIP": "Valor fijo" },
        { "COD": "4", "DESCRIP": "Salario min." },
        { "COD": "5", "DESCRIP": "% 1er valor" }
    ]
    POPUP({
        array: liquidar,
        titulo: 'FORMA DE LIQUIDAR',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $liquidar713,
        callback_f: _descriptabla
    },
        _evaluarliquidacion);
}

function _evaluarliquidacion(liquidar) {
    $liquidar713 = liquidar.COD;
    switch (liquidar.COD) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
            _evaluarmonto_713();
            break;
        default:
            _descriptabla();
            break;
    }
    $("#liquidar_713").val(liquidar.COD + " - " + liquidar.DESCRIP);
}

function _evaluarmonto_713() {
    validarInputs(
        {
            form: "#monto",
            orden: '1'
        },
        function () { _validarformliqui_713() },
        _validacionesrliquida
    )
}
function _validacionesrliquida() {
    // $monto713 = $('#monto_713').val();
    $monto713 = vlrmonto_713Mask.unmaskedValue;

    if (($liquidar713 != '3') && ($monto713 == 0)) {
        _evaluarmonto_713();
    } else if ($liquidar713 == '4') {
        $_valor = ($_SALMINUSU / 30) * $monto713
        $('#valortotal_713').val($_valor);
        _validacionesincre_713();
    } else {
        _validacionesincre_713();
    }
}

function _validacionesincre_713() {
    var incre = '[{"COD": "1", "DESCRIP": " % Cirugias"},{"COD": "2","DESCRIP": " % Laboratorios"},{"COD": "3","DESCRIP": " % Imagenologia"},{ "COD": "4", "DESCRIP": " % Otros Servic" },{ "COD": "5", "DESCRIP": " % Consultas" },{ "COD": "6", "DESCRIP": " % Internacion" },{ "COD": "9", "DESCRIP": "No incrementar" }]'
    var incremento = JSON.parse(incre);
    POPUP({
        array: incremento,
        titulo: 'Incrementar Tarifa',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $increm713,
        callback_f: _evaluarmonto_713,
        teclaAlterna: true

    }, function (incremento) {
        $increm713 = incremento.COD;
        switch (incremento.COD) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '9':
                $('#incrementar_713').val(incremento.COD + '-' + incremento.DESCRIP)
                if ($_tiposer713 == '1') {
                    $paqint713 = '';
                    _evaluarcodint_713();
                } else {
                    $paqint713 = '';
                    $('#integ_713').val($paqint713);
                    _evaluarinsumos_713();
                }
                break;
            default:
                _evaluarmonto_713()
                break;
        }
    })
}
function _evaluarcodint_713() {
    validarInputs(
        {
            form: "#paquete",
            orden: '1'
        },
        function () { _validacionesincre_713() },
        _evaluarinsumos_713
    )
}

function _evaluarinsumos_713() {
    $paqint713 = $('#integ_713').val();
    validarInputs(
        {
            form: "#insumo",
            orden: '1'
        },
        function () { _evaluarcodint_713() },
        _validacioninsumos
    )
}

function _validacioninsumos() {
    $insumos_713 = $('#insumos_713').val();
    if (($insumos_713 == 'S') || ($insumos_713 == 'N')) {
        _evaluarcodtar_713();
    } else {
        _evaluarinsumos_713();
    }
}
function _evaluarcodtar_713() {
    validarInputs(
        {
            form: "#seguntari",
            orden: '1'
        },
        function () { _evaluarinsumos_713() },
        _validaciontarifa
    )
}
function _validaciontarifa() {
    $codtari_713 = $('#codtari_713').val();
    _evaluardivision_713();
}

// function _evaluarctacontab_713(){

//     validarInputs(
//         {
//             form: "#contable",
//             orden: '1'
//         },
//         function () { _descriptabla() },
//         _validacionctacontab
//     )
// }
// function __validacionctacontab(){
//     contab_713
//     descontab_713
// }
function _evaluardivision_713() {
    validarInputs(
        {
            form: "#division",
            orden: '1'
        },
        function () { _evaluarcodtar_713() },
        _validaciondivision
    )
}
function _validaciondivision() {
    $division_713 = $('#divis_713').val();
    if ($division_713.trim() == '') {
        $descrpdiv_713 = '';
        $('#descrpdiv_713').val($descrpdiv_713);
        _evaluarcantdias_713();
    } else {
        LLAMADO_DLL({
            dato: [$division_713],
            callback: _dataCONSULTAGRUPO_713,
            nombredll: 'SER108-11',
            carpeta: 'SALUD'
        });
    }
}
function _dataCONSULTAGRUPO_713(data) {
    console.log(data, 'SAL713-03')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $descrpdiv_713 = date[1].trim();
    if (swinvalid == "00") {
        $('#descrpdiv_713').val($descrpdiv_713);
        _evaluarcantdias_713();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluardivision_713();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarcantdias_713() {
    validarInputs(
        {
            form: "#cantidad",
            orden: '1'
        },
        function () { _evaluardivision_713() },
        _evaluardescripext
    )
}
function _evaluardescripext() {
    $cantidaddias713 = $('#cantidaddias713').val();
    
    if($cantidaddias713.trim() == ''){
        $cantidaddias713 = '0'; 
        $('#cantidaddias713').val($cantidaddias713);
    }else{
        $('#cantidaddias713').val($cantidaddias713);
    }
    
    validarInputs(
        {
            form: "#extensa",
            orden: '1'
        },
        function () { _descriptabla() },
        enviarDatos713
    )
}

///////////////////////GRABAR////////


function enviarDatos713() {
    $descripextensa713 = $('#descrpexten_713').val();
    $fechaact = moment().format('YYMMDD');
    $operario = $_ADMINW;
    console.log($operario)

    LLAMADO_DLL({
        dato: [$_NovedSal713, $llavetab713, $descripcups713, $liquidar713, $monto713, $paqint713, $codtari_713,
               $insumos_713, $cantidaddias713, $increm713, $division_713, $descripextensa713, $operario, $fechaact],
        callback: validargrabado713,
        nombredll: 'SAL713-02',
        carpeta: 'SALUD'
    })
}

function validargrabado713(data) {
    console.log(data, 'data')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_NovedSal713 == '9') {
            toastr.success('Se ha retirado', 'MAESTRO TABLAS');
            _inputControl('reset');
            _inputControl('disabled');
            CON850(_evaluarCON850);
        } else {
            toastr.success('Se ha guardado', 'MAESTRO TABLAS');
            _inputControl('reset');
            _inputControl('disabled');
            CON850(_evaluarCON850);
        }
    } else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');

    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
// ELIMINAR REGISTRO
function _eliminaDatos713() {
    LLAMADO_DLL({
        dato: [$_NovedSal713, $_llavetab],
        callback: validargrabado713,
        nombredll: 'SAL713-02',
        carpeta: 'SALUD'
    })
}
/////MOSTRAR DATOS NOVEDAD 8 Y 9 /////////////
function _llenarCampos713() {
    LLAMADO_DLL({
        dato: [$llavetab713],
        callback: on_datosTbla713,
        nombredll: 'SAL713-01',
        carpeta: 'SALUD'
    });
}

function on_datosTbla713(data) {
    console.debug(data);
    var date = data.split('|');
    $llavetab713 = date[1].trim();
    $descripcups713 = date[2].trim();
    $liquidar713 = date[3].trim();
    $monto713 = date[4].trim();
    $paqint713 = date[5].trim();
    $codtari_713 = date[6].trim();
    $insumos_713 = date[7].trim();
    $cantidaddias713 = date[8].trim();
    $increm713 = date[9].trim();
    $division_713 = date[10].trim();
    $descrpdiv_713 = date[11].trim();
    $descripextensa713 = date[12].trim();
    $operario = date[13].trim();
    $fechaact = date[14].trim();

    if (date[0].trim() == '00') {
        _mostrarDatos713()
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        validarCodig();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function _mostrarDatos713() {

    $('#descrpcups_103').val($descripcups713);
    $('#liquidar_713').val($liquidar713);
    $('#monto_713').val($monto713);
    $('#incrementar_713').val($increm713);
    $('#integ_713').val($paqint713);
    $('#insumos_713').val($insumos_713);
    $('#codtari_713').val($codtari_713);
    // $('#contab_713').val($_CTACONTAB);
    $('#divis_713').val($division_713);
    $('#cantidaddias713').val($cantidaddias713);
    $('#descrpdiv_713').val($descrpdiv_713);
    $('#descrpexten_713').val($descripextensa713);
    $('#oper_713').val($operario);
    $('#fechat_713').val($fechaact);

    switch (parseInt($_NovedSal713)) {
        case 8:
            _descriptabla();
            break;
        case 9:
            CON851P('54', _validarDato713, _eliminaDatos713)
            break;
    }
}




