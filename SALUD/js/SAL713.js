/* NOMBRE RM --> SER102 // NOMBRE ELECTR --> SAL713 */

var $_NovedSal713, arraytarifas;

$(document).ready(function () {

    _toggleF8([
        { input: 'codtar', app: '713', funct: _ventanaNomtarif },
        { input: 'grupo', app: '713', funct: _ventanaGruposer },
        { input: 'cups', app: '713', funct: _ventanaTablatarif },
        { input: 'divis', app: '713', funct: _ventanaDivis },
        { input: 'contab', app: '713', funct: _ventanaContab }

    ]);

    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    loader('hide');
    CON850(_evaluarCON850);
});

// --> F8'S //
function _ventanaNomtarif(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA NOMBRE DE TARIFAS",
            tipo: 'mysql',
            tablaSql: 'sc_grupotar',
            callback_esc: function () {
                _validarDato()
            },
            callback: function (data) {
                $('#codtar_713').val(data.codigo);
                $('#descptar_713').val(data.descripcion);
                _enterInput('#codtar_713');
            }
        });
    }
}


function _ventanaGruposer(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA GRUPO DE SERVICIOS",
            tipo: 'mysql',
            tablaSql: 'sc_gruposer',
            callback_esc: function () {
                _validarDato()
            },
            callback: function (data) {
                $('#grupo_713').val(data.codigo);
                $('#descrgrp_103').val(data.descripcion);
                _enterInput('#grupo_713');
            }
        });
    }
}


function _ventanaTablatarif(e) {
    loader('hide');
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite({
            titulo: "VENTANA TABLA DE TARIFAS",
            tablaSql: 'sc_tabla',
            indice: ['codigo', 'descripcion'],
            mascara: [
                {
                }
            ],
            minLength: 1,
            callback_esc: function () {
                _validarDato()
            },
            callback: function (data) {
                var codcup = data.codigo.trim();
                $('#cups_713').val(codcup.substring(6, 15));
                $('#descrpcups_103').val(data.descripcion);
                _enterInput('#cups_713');
            }
        });
    }
}

function _ventanaDivis(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DIVISION",
            tipo: 'mysql',
            tablaSql: 'sc_divis',
            callback_esc: function () {
                _validarDato()
            },
            callback: function (data) {
                $('#divis_713').val(data.cod_division);
                $('#descrpdiv_713').val(data.descrip_division);
                _enterInput('#divis_713');
            }
        });
    }
}


function _ventanaContab(e) {
    loader('hide');
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite({
            titulo: 'VENTANA PLAN DE CUENTAS',
            tablaSql: 'sc_archmae',
            indice: ['cuenta', 'descripcion'],
            mascara: [
                {
                }
            ],
            minLength: 1,
            callback_esc: function () {
                _validarDato()
            },
            callback: function (data) {
                $('#contab_713').val(data.cuenta.trim())
                $('#descontab_713').val(data.descripcion.trim())
                _enterInput('#contab_713');
            }
        });
    }
}


// NOVEDAD //
function _evaluarCON850(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    console.debug(novedad)
    $_NovedSal713 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarDato();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#noved713').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarDato() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () { grupotar(); }
    )
}

function grupotar() {
    $_codtar = $('#codtar_713').val();
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_codtar
    SolicitarDll({ datosh: datos_envio }, on_datosTarf713, get_url('/APP/SALUD/SAL713-03.DLL'));
}

function on_datosTarf713(data) {
    console.debug(data);
    var date = data.split('|');
    $_CODGTAR = date[1].trim();
    $_DESCRIPTAR = date[2].trim();
    if (date[0].trim() == '00') {
        mostrarTarf()
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        _validarDato();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function mostrarTarf() {
    $('#codtar_713').val($_CODGTAR)
    $('#descptar_713').val($_DESCRIPTAR)
    tipoSer()
}


function tipoSer() {

    var datoSerTarif = [
        { "COD": "0", "DESCRIP": "Drogueria" },
        { "COD": "1", "DESCRIP": "Cirugias" },
        { "COD": "2", "DESCRIP": "Laboratorio y Otros diag." },
        { "COD": "3", "DESCRIP": "RX - Imagenol" },
        { "COD": "4", "DESCRIP": "Otros Servic" },
        { "COD": "5", "DESCRIP": "Consulta y Terap" },
        { "COD": "6", "DESCRIP": "Patologia" },
        { "COD": "7", "DESCRIP": "Promoc y Preven" }
    ]

    POPUP({
        array: datoSerTarif,
        titulo: 'Tipo de Servicio?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _validarDato
    }, function (data) {
        switch (data.COD.trim()) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
                $('#tiposer_713').val(data.COD.trim())
                $('#descpser_713').val(data.DESCRIP.trim())
                $_SERV = data.COD.trim()
                grupoTar()
                break;
        }
    })
}


function grupoTar() {
    validarInputs(
        {
            form: "#grupo",
            orden: '1'
        },
        function () { tipoSer(); },
        function () { grupoSer(); }
    )
}

function grupoSer() {
    $_GRUPOTAR = $('#grupo_713').val();
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_GRUPOTAR
    SolicitarDll({ datosh: datos_envio }, on_datosServ713, get_url('/APP/SALUD/SAL713-04.DLL'));
}

function on_datosServ713(data) {
    console.debug(data);
    var date = data.split('|');
    $_CODGSER = date[1].trim();
    $_DESCRIPSER = date[2].trim();
    if (date[0].trim() == '00') {
        mostrarServ()
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        grupoTar();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function mostrarServ() {
    $('#grupo_713').val($_CODGSER)
    $('#descrgrp_103').val($_DESCRIPSER)
    _validarCodig()
}


function _validarCodig() {
    validarInputs(
        {
            form: "#codcups",
            orden: '1'
        },
        function () { grupoTar(); },
        function () {
            $codigo713 = $('#cups_713').val();
            $_llavetab = $_codtar + $_SERV + $_GRUPOTAR + $codigo713.padEnd(10, ' ');
            let datos_envio = datosEnvio()
            datos_envio += '|'
            datos_envio += $_llavetab
            SolicitarDll({ datosh: datos_envio }, on_datosTbla713, get_url('/APP/SALUD/SAL713-01.DLL'));
        }
    )
}

function on_datosTbla713(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPTAB = date[1].trim();
    $_CODTAB = date[2].trim();
    $_GRSERTAB = date[3].trim();
    $_CODSERTAB = date[4].trim();
    $_FORMLIQTAB = date[5].trim();
    $_MONTOTAB = date[6].trim();
    $_INCREMTAB = date[7].trim();
    $_CTACONTAB = date[8].trim();
    $_CODPAQTAB = date[9].trim();
    $_CODRIPSTAB = date[10].trim();
    $_INSUMOTAB = date[11].trim();
    $_CANTDIATAB = date[12].trim();
    $_DIVTAB = date[13].trim();
    $_EXTENTAB = date[14].trim();

    if (date[0].trim() == '00') {
        if ($_NovedSal713 == '7') {
            CON851('00', '00', null, 'error', 'Error');
            _validarCodig();
        }
        else {
            _mostrarDatos713()
        }
    }
    else if (date[0].trim() == '01') {
        if ($_NovedSal713 == '7') {
            fechaActual713();
        }
        else {
            CON851('01', '01', null, 'error', 'Error');
            _validarCodig();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _mostrarDatos713() {
    $('#descrpcups_103').val($_DESCRIPTAB);
    $('#liquidar_713').val($_FORMLIQTAB);
    $('#monto_713').val($_MONTOTAB);
    $('#incrementar_713').val($_INCREMTAB);
    $('#integ_713').val($_CODPAQTAB);
    $('#insumos_713').val($_INSUMOTAB);
    $('#codtari_713').val($_CODRIPSTAB);
    $('#contab_713').val($_CTACONTAB);
    $('#divis_713').val($_DIVTAB);
    $('#cantidaddias713').val($_CANTDIATAB);
    $('#descrpexten_713').val($_EXTENTAB);
    $('#oper_173').val($_ADMINW);

    switch (parseInt($_NovedSal713)) {
        case 8:
            fechaActual713()
            break;
        case 9:
            CON851P('54', _validarDato, _eliminaDatos713)
            break;
    }
}


// ELIMINAR REGISTRO
function _eliminaDatos713() {

    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_NovedSal713
    datos_envio += '|'
    datos_envio += $_llavetab

    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _elimRegis713, get_url('/SALUD/APP/SAL713-02.DLL'));
}

function _elimRegis713(data) {
    _inputControl('reset');
    _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        var mensaje
        switch (parseInt($_NovedSal713)) {
            case 9:
                mensaje = "Eliminado correctamente"
                break;
        }
        jAlert({ titulo: 'Notificacion', mensaje: mensaje })
    } else {
        CON852(temp[0], temp[1], temp[2]);
    }
}


/// NOVEDAD 7 ////

function fechaActual713() {
    var d = new Date();
    var mes = d.getMonth() + 1;
    var dia = d.getDate();

    var fchactual = d.getFullYear() + (mes < 10 ? '0' : '') + mes + (dia < 10 ? '0' : '') + dia;

    $fechfin = fchactual

    $('#fechat_713').val($fechfin.trim());

    operd713()
}

function operd713() {
    $('#oper_713').val($_ADMINW.trim());
    formLiquid713()
}

function formLiquid713() {

    var datoLiquidar = [
        { "COD": "1", "DESCRIP": "Puntos" },
        { "COD": "2", "DESCRIP": "Grupos" },
        { "COD": "3", "DESCRIP": "Valor Fijo" },
        { "COD": "4", "DESCRIP": "Salario Minimo" },
        { "COD": "5", "DESCRIP": "% 1er Valor" }
    ]
    POPUP({
        array: datoLiquidar,
        titulo: 'Forma Liquidar',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _validarCodig
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
                $('#liquidar_713').val(data.COD.trim() + '. ' + data.DESCRIP.trim())
                $_LIQUID = data.COD.trim()
                monto713()
                break;
        }
    })
}

function monto713() {
    validarInputs(
        {
            form: '#monto',
            orden: '1'
        },
        function () { formLiquid713(); },
        function () { incrTarf713() }
    )
}


function incrTarf713() {

    var datoIncrem = [
        { "COD": "1", "DESCRIP": "% Cirugias" },
        { "COD": "2", "DESCRIP": "% Laboratorios" },
        { "COD": "3", "DESCRIP": "% Imagenologia" },
        { "COD": "4", "DESCRIP": "% Otros Servc" },
        { "COD": "5", "DESCRIP": "% Consult y Terap" },
        { "COD": "6", "DESCRIP": "% Internacion" },
        { "COD": "9", "DESCRIP": "No Incrementar" }
    ]
    POPUP({
        array: datoIncrem,
        titulo: 'Incrementar Tarifa',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: monto713
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '9':
                if ($_SERV == '1') {
                    $('#incrementar_713').val(data.COD.trim() + '. ' + data.DESCRIP.trim())
                    $_TARIF = data.COD.trim()
                    paqueteIntg713();
                } else {
                    $('#incrementar_713').val(data.COD.trim() + '. ' + data.DESCRIP.trim())
                    $_TARIF = data.COD.trim()
                    setTimeout(facturaInsumo713, 300);
                }
                break;
        }
    })
}

function paqueteIntg713() {
    validarInputs(
        {
            form: '#paquete',
            orden: '1'
        },
        function () { incrTarf713(); },
        function () { facturaInsumo713() }
    )
}


function facturaInsumo713() {

    var datoIncrem = [
        { "COD": "1", "DESCRIP": "Si" },
        { "COD": "2", "DESCRIP": "No" }
    ]

    POPUP({
        array: datoIncrem,
        titulo: 'Facturar Insumos?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: incrTarf713
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
                $('#insumos_713').val(data.COD.trim() + '. ' + data.DESCRIP.trim())
                $_INSUMO = data.COD.trim()
                codigoTarifa713();
                break;
            case '2':
                $('#insumos_713').val(data.COD.trim() + '. ' + data.DESCRIP.trim())
                $_INSUMO = data.COD.trim()
                codigoTarifa713();
                break;
        }
    })
}


function codigoTarifa713() {
    console.debig('codigo tarf')
    validarInputs(
        {
            form: '#seguntari',
            orden: '1'
        },
        function () { monto713(); },
        function () { divis713() }
    )
}

function divis713() {
    validarInputs(
        {
            form: '#division',
            orden: '1'
        },
        function () { codigoTarifa713(); },
        function () { diasAutori713() }
    )
}

function diasAutori713() {
    validarInputs(
        {
            form: '#cantidad',
            orden: '1'
        },
        function () { divis713(); },
        function () { extensa713() }
    )
}

function extensa713() {
    validarInputs(
        {
            form: '#extensa',
            orden: '1'
        },
        function () { diasAutori713(); },
        function () { enviarDatos713() }
    )
}

function enviarDatos713() {
    var monto = cerosIzq($("#monto_713").val(), 12);
    var ctacontab = cerosIzq($("#contab_713").val(), 11);
    var codpaq = cerosIzq($("#integ_713").val(), 10);
    var codrips = cerosIzq($("#codtari_713").val(), 11);
    var cantiddias = cerosIzq($("#cantidaddias713").val(), 3);
    var divis = cerosIzq($("#divis_713").val(), 2);
    var extend = espaciosDer($("#descrpexten_713").val(), 120);
    var operd = $_ADMINW

    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_NovedSal713
    datos_envio += '|'
    datos_envio += $_llavetab
    datos_envio += '|'
    datos_envio += $_DESCRIPTAB
    datos_envio += '|'
    datos_envio += $_LIQUID
    datos_envio += '|'
    datos_envio += monto
    datos_envio += '|'
    datos_envio += ctacontab
    datos_envio += '|'
    datos_envio += codpaq
    datos_envio += '|'
    datos_envio += codrips
    datos_envio += '|'
    datos_envio += $_INSUMO
    datos_envio += '|'
    datos_envio += cantiddias
    datos_envio += '|'
    datos_envio += $_TARIF
    datos_envio += '|'
    datos_envio += divis
    datos_envio += '|'
    datos_envio += extend
    datos_envio += '|'
    datos_envio += operd
    datos_envio += '|'
    datos_envio += $fechfin
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _cambios713, get_url('/APP/SALUD/SAL713-02.DLL'));
}


function _cambios713(data) {
    _inputControl('reset');
    _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        var mensaje
        switch (parseInt($_NovedSal713)) {
            case 7:
                mensaje = "Creado Correctamente"
                break;
            case 8:
                mensaje = "Modificado correctamente"
                break;
        }
        jAlert({ titulo: 'Notificacion', mensaje: mensaje })
    } else {
        CON852(temp[0], temp[1], temp[2]);
    }
}

// function enviarDatos713() {
//     var monto = cerosIzq($("#monto_713").val(), 12);
//     var ctacontab = cerosIzq($("#contab_713").val(), 11);
//     var codpaq = cerosIzq($("#integ_713").val(), 10);
//     var codrips = cerosIzq($("#codtari_713").val(), 11);
//     var cantiddias = cerosIzq($("#cantidaddias713").val(), 3);
//     var divis = cerosIzq($("#divis_713").val(), 2);
//     var extend = espaciosDer($("#descrpexten_713").val(), 60);
//     // var increm = espaciosDer($("#incrementar_713").val(), 1);
//     var operd = $_ADMINW

//     LLAMADO_DLL({
//         dato: [$_NovedSal713, $_llavetab, $_DESCRIPTAB, $_LIQUID, monto, ctacontab,
//             codpaq, codrips, $_INSUMO, cantiddias, increm, divis, extend, operd, $fechfin],
//         callback: function (data) {
//             validarResp_713(data, $_llavetab, $_DESCRIPTAB, $_LIQUID, monto, ctacontab, codpaq, codrips, $_INSUMO, cantiddias, $_TARIF, divis, extend, operd, $fechfin)
//         },
//         nombredll: 'SAL713-02',
//         carpeta: 'SALUD'
//     })
// }


// function validarResp_713(data, $_llavetab, $_DESCRIPTAB, $_LIQUID, monto, ctacontab, codpaq, codrips, $_INSUMO, cantiddias, $_TARIF, divis, extend, operd, $fechfin) {
//     loader('hide');
//     var rdll = data.split('|');
//     console.log(rdll[0])
//     if (rdll[0].trim() == '00') {
//         switch (parseInt($_NovedSal713)) {
//             case 7:
//                 _consultaSql({
//                     sql: `INSERT INTO sc_tabla VALUES ('${$_llavetab}', '${$_DESCRIPTAB}');`,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCajas713();
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO EL DATO' },
//                                     function () {
//                                         limpiarCajas713();
//                                     });
//                             }
//                         }
//                     }
//                 })
//                 break;
//             case 8:
//                 _consultaSql({
//                     sql: `UPDATE sc_tabla SET descripcion='${$_DESCRIPTAB}' WHERE codigo = '${$_llavetab}' `,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             console.log(results)
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO MODIFICADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCajas713()
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR MODIFICANDO EL DATO' },
//                                     function () {
//                                         limpiarCajas713();
//                                     });
//                             }
//                         }
//                     }
//                 })
//                 break;
//             case 9:
//                 _consultaSql({
//                     sql: `DELETE FROM sc_tabla WHERE codigo = '${$_llavetab}'`,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             console.log(results)
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO ELIMINADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCajas713()
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR ELIMINANDO EL DATO' },
//                                     function () {
//                                         limpiarCajas713()
//                                     });
//                             }
//                         }
//                     }
//                 })
//                 break;
//         }
//     } else {
//         CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
//     }
// }

// function limpiarCajas713() {
//     _toggleNav();
//     _inputControl('reset');
//     _inputControl('disabled');

// }

