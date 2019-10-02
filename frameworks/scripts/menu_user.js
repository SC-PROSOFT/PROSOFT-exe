const path = require('path'),
    mysql = require('mysql');

$CONEXION_BD = {},
    $CONTROL = '',
    $_USUA_GLOBAL = '';

$(document).ready(function () {
    if (localStorage['Modulo'] == 'MIG') {
        cargarMenu()
    } else {
        _cargarUsuario();
    }
    $('#cerrar_menu_user').click(function () {
        var url = path.join(__dirname, '../../login/login.html');
        window.location.href = url;
    });
});

function _cargarUsuario() {
    var url = get_url("app/CONTAB/CONUSUA.dll");
    var datos_envio = localStorage.Sesion + '|' + localStorage.Contab + '|' + localStorage.Mes + '|' + localStorage.Usuario;
    SolicitarDll({ datosh: datos_envio }, _onCargarUsuario, url);
}

function _onCargarUsuario(data) {
    var res = data.split('|');
    var json = res[1].trim();
    if (res[0].trim() == '00') {
        var url = get_url("temp/" + json);
        SolicitarDatos(
            null,
            function (data) {
                cargarMenu();
                $_USUA_GLOBAL = data.DATOSUSUA;
                $_USUA_GLOBAL[0].NIT = parseInt($_USUA_GLOBAL[0].NIT);
                $_CLAVESQL = $_USUA_GLOBAL[0].CLAVE_SQL.trim();
                $_USUARIOSQL = $_USUA_GLOBAL[0].USUAR_SQL.trim();

                let mes = evaluarMes_min(localStorage.Mes);
                $('title').html(`
                \\${localStorage.Contab}\\${mes}
                &nbsp&nbsp&nbsp&nbsp&nbsp
                ${localStorage.Usuario} 
                ${localStorage.Nombre} 
                `)

                $('#user_menu_user').html(localStorage.Usuario + " - " + localStorage.Nombre);
                $('#lblEmpresa').html($_USUA_GLOBAL[0].NOMBRE);
                
                let database = localStorage.Contab + "_" + localStorage.Mes;
                $CONTROL = localStorage.Contab + "_13";
                $CONEXION_BD = {
                    host: localStorage.IP_DATOS,
                    user: $_USUARIOSQL,
                    password: $_CLAVESQL,
                    database: database
                };

                var arrayEliminar = [];
                arrayEliminar.push(json);
                _eliminarJson(arrayEliminar, _onEliminarJsonUSU);
            },
            url
        );
    } else {
        loader('hide');
        CON852(res[0], res[1], res[2], _toggleNav);
    }
}

function _onEliminarJsonUSU(data) {
    var res = data.split('|');
    if (res[0].trim() == "00") {
        console.debug('Finish');
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function CON851(err, code, dll, tipo, titulo) {
    var msj = msjError(cerosIzq(code.trim(), 2));
    var title = titulo ? titulo : 'Advertencia';
    toast(title + ' ' + err, msj, tipo);
}

function CON851P(codigo, funCancel, funAccept, a) {
    var code = cerosIzq(codigo.trim(), 2)
    var msj = CON851P_MSG(code);

    a = undefined ? a = undefined : a;

    bootbox.confirm({
        size: "small",
        message: msj,
        callback: function (result) { /* result is a boolean; true = OK, false = Cancel*/
            if (a == undefined) {
                console.log(result)
                result == true ? setTimeout(funAccept, 10) : setTimeout(funCancel, 10);
            }
            else {
                if (result == true) {
                    console.log("aceptar");
                    funAccept();
                }
                else {
                    console.log("cancelar");
                    funCancel(a)
                }
            }
        }
    })
}

function CON852(err, code, app, func) {
    var msj = msjError(cerosIzq(code.trim(), 2));
    jAlert(
        { titulo: 'Error ' + err, mensaje: '<b>Mensaje: </b>' + msj + '<br> <b>App:</b> ' + app },
        func
    );
}

function CON851B(code, func) {
    var form =
        '<form>'
        + '<div class="containerCon851B">'
        + '<label class= "labelUncheckedCon851B" id="contab_851B">Contabilidad</label>'
        + '<label class= "labelUncheckedCon851B" id="invent_851B">Inventarios</label>'
        + '<label class= "labelUncheckedCon851B" id="fact_851B">Facturacion</label>'
        + '<label class= "labelUncheckedCon851B" id="nomina_851B">Nomina</label>'
        + '</div>'
        + '</form>'

    var msj_B

    switch (parseInt(code)) {
        case 1: msj_B = 'Bloqueado solo menu contab.'
            con851B_Deshab('contab_851B')
            break;
        case 2: msj_B = 'Bloqueado solo inventarios'
            con851B_Deshab('invent_851B')
            break;
        case 3: msj_B = 'Periodo de Nomina bloqueado'
            con851B_Deshab('nomina_851B')
            break;
        case 4: msj_B = 'Mes de trabajo bloqueado tot'
            con851B_Deshab('contab_851B')
            con851B_Deshab('invent_851B')
            con851B_Deshab('fact_851B')
            con851B_Deshab('nomina_851B')
            break;
        case 5: msj_B = 'Bloqueo solo FACTURACION'
            con851B_Deshab('fact_851B')
            break;
        case 6: msj_B = 'BLOQUEO FACTURACION Y NOMINA'
            con851B_Deshab('fact_851B')
            con851B_Deshab('nomina_851B')
            break;
        case 7: msj_B = 'BLOQUEO FACTURACION E INVENT'
            con851B_Deshab('invent_851B')
            con851B_Deshab('fact_851B')
            break;
        case 8: msj_B = 'BLOQUEO FACT, INVENT, NOMINA'
            con851B_Deshab('invent_851B')
            con851B_Deshab('fact_851B')
            con851B_Deshab('nomina_851B')
            break;
        default: msj_B = 'Mes de trabajo No bloqueado'
            break;
    }

    var msj = 'Error ' + code + ' ' + msj_B

    jAlert(
        { titulo: msj, mensaje: form },
        func
    );
}

function con851B_Deshab(id) {
    setTimeout(function () {
        $('#' + id).css('background-color', '#cc0000');
    }, 300);

    //$(id).css("background-color", "#ca3c3c !important");
}

function get_url(dir) {
    return "http://" + localStorage.IP_DATOS + "/MAIN-ELECT/" + dir;
}

function _eliminarJson(arrayFiles, func) {
    $.ajax({
        type: "POST",
        data: { files: arrayFiles },
        async: false,
        url: get_url("frameworks/scripts/php/eliminarJson.php")
    }).done(function (msg) {
        func(msg);
    });
}


$(document).on('click', '.menuToggle', _toggleNav);

function _toggleNav() {
    var nav = $('.navbar-collapse');
    var visible = nav.is(':visible');
    var widthScreen = $(document).width();

    // if (widthScreen > 992) { // Pantalla grande
    if (visible) {
        if (widthScreen > 992) {
            nav.hide('slide', function () {
                $(this).attr('style', 'display:none!important;');
            });

            $('.page-fixed-main-content').animate({
                'margin-left': '0'
            });
        } else {
            nav.slideToggle('slow', function () {
                $(this).attr('style', 'display:none!important;');
            });
        }

        _cargarEventos('off');
    } else {
        if (widthScreen > 992) {
            nav.show('slide', function () {
                $(this).removeAttr('style');
            });

            $('.page-fixed-main-content').animate({
                'margin-left': '280px'
            });
        } else {
            nav.slideToggle('slow', function () {
                $(this).attr('style', 'display:block!important;');
            });
        }
        _cargarEventos('on');
        //$('#body_main').html('')
    }

    $("html, body").animate({ scrollTop: 0 }, "slow");
}

function _inputControl(set) {

    switch (set) {
        case 'disabled':
            $('input.form-control, button.f8-Btn').each(function () {
                $(this).attr('disabled', 'true');
            })
            break;
        case 'reset':
            $('input.form-control').each(function () {
                $(this).val('');
            })
            break;
    }
}

function _toggleF8(params) {
    for (var i in params) {
        let input = params[i].input;
        let app = params[i].app;
        let funct = params[i].funct;

        $('#' + input + 'Btn_' + app + ',#' + input + '_' + app).unbind()
        $('#' + input + 'Btn_' + app).bind('click', funct);
        $('#' + input + '_' + app).bind('keydown', funct);
    }
}


function errorSql(error) {
    console.error('Ha ocurrido un error conectando la base de datos: \n\n' + error);
    jAlert({
        mensaje: `<div style="text-align: center;">`
            + `Ha ocurrido un error conectando la base de datos: <br>`
            + `<b>${error}</b>`
            + `</div>`,
        titulo: 'Error de conexi�n',
        autoclose: false,
        btnCancel: false,
        footer: false
    }, function () { });
}


function plantillaError(err, code, app, func) {
    var msj = msjError(cerosIzq(code.trim(), 2));
    jAlert(
        { titulo: 'Error ' + err, mensaje: '<b>Mensaje: </b>' + msj + '<br> <b>App:</b> ' + app },
        func
    );
}

function plantillaToast(err, code, dll, tipo, titulo) {
    var msj = msjError(cerosIzq(code.trim(), 2));
    var title = titulo ? titulo : 'Advertencia';
    toast(title + ' ' + err, msj, tipo);
}

function _enterInput(elm) {
    var e = $.Event('keyup');
    e.which = 13;
    $(elm).trigger(e);
}

function evaluarMes(mes) {
    switch (mes) {
        case '01':
            mes = 'Enero';
            break;
        case '02':
            mes = 'Febrero';
            break;
        case '03':
            mes = 'Marzo';
            break;
        case '04':
            mes = 'Abril';
            break;
        case '05':
            mes = 'Mayo';
            break;
        case '06':
            mes = 'Junio';
            break;
        case '07':
            mes = 'Julio';
            break;
        case '08':
            mes = 'Agosto';
            break;
        case '09':
            mes = 'Septiembre';
            break;
        case '10':
            mes = 'Octubre';
            break;
        case '11':
            mes = 'Noviembre';
            break;
        case '12':
            mes = 'Diciembre';
            break;
    }

    return mes;
}

function evaluarMes_min(mes) {
    switch (mes) {
        case '01':
            mes = 'ENE';
            break;
        case '02':
            mes = 'FEB';
            break;
        case '03':
            mes = 'MAR';
            break;
        case '04':
            mes = 'ABR';
            break;
        case '05':
            mes = 'MAY';
            break;
        case '06':
            mes = 'JUN';
            break;
        case '07':
            mes = 'JUL';
            break;
        case '08':
            mes = 'AGT';
            break;
        case '09':
            mes = 'SEP';
            break;
        case '10':
            mes = 'OCT';
            break;
        case '11':
            mes = 'NOV';
            break;
        case '12':
            mes = 'DIC';
            break;
        case '13':
            mes = 'CONTROL';
            break;
        case '14':
            mes = 'CIE';
            break;

    }

    return mes;
}

function loader(estado) {
    if (estado == 'show') $('#loader_content').fadeIn();
    if (estado == 'hide') $('#loader_content').fadeOut();
}

function cerosIzq(obj, tam) {
    while (obj.toString().length < tam)
        obj = '0' + obj;
    return obj;
}

function cerosDer(obj, tam) {
    while (obj.toString().length < tam)
        obj = obj + '0';
    return obj;
}

function espaciosIzq(obj, tam) {
    while (obj.toString().length < tam)
        obj = ' ' + obj;
    return obj;
}
function espaciosDer(obj, tam) {
    while (obj.toString().length < tam) obj = obj + ' ';
    return obj;
}

function carpetaTrabajo(mes) {
    var car = false;
    switch (mes) {
        case '01': car = "/ENE/"; break;
        case '02': car = "/FEB/"; break;
        case '03': car = "/MAR/"; break;
        case '04': car = "/ABR/"; break;
        case '05': car = "/MAY/"; break;
        case '06': car = "/JUN/"; break;
        case '07': car = "/JUL/"; break;
        case '08': car = "/AGT/"; break;
        case '09': car = "/SEP/"; break;
        case '10': car = "/OCT/"; break;
        case '11': car = "/NOV/"; break;
        case '12': car = "/DIC/"; break;
        case '13': car = "/CONTROL/"; break;
        case '14': car = "/CIE/"; break;
    }
    return car;
}

function validarChecked(nombreCaja, dato) {
    switch (dato) {
        case "S": $(nombreCaja).prop('checked', true);
            break;
        case "N": $(nombreCaja).prop('checked', false);
            break;
    }
}

function datosEnvio() {
    var data = localStorage.getItem('Sesion').trim() + "|" + localStorage.getItem('Contab').trim() + "|" + localStorage.getItem('Mes').trim() + "|";
    return data;
}

function urlDll(nomDll, modulo) {
    return 'http://' + localStorage.IP_DATOS + '/MAIN-ELECT/' + 'APP/' + modulo + '/' + nomDll + '.dll';
}

function LLAMADO_DLL(params) {
    datos_envio = localStorage.getItem('Sesion');
    datos_envio += '|'
    datos_envio += localStorage.getItem('Contab');
    datos_envio += '|'
    datos_envio += localStorage.getItem('Mes');
    params.dato = params.dato ? params.dato : undefined;
    console.log(params.dato)
    if (params.dato !== undefined) {
        var array = params.dato
        var limite = array.length;
        if (limite == 0) {
            datos_envio += '|'
            datos_envio += localStorage.Usuario
            console.debug(datos_envio);
            SolicitarDll({ datosh: datos_envio }, params.callback, urlDll(params.nombredll, params.carpeta));
        }
        else {
            for (i = 0; i < limite; i++) {
                datos_envio += '|'
                datos_envio += params.dato[i];
            }
            datos_envio += '|'
            datos_envio += localStorage.Usuario
            console.debug(datos_envio);
            SolicitarDll({ datosh: datos_envio }, params.callback, urlDll(params.nombredll, params.carpeta));
        }
        // }
        // else {
        //     console.debug(datos_envio);
        //     SolicitarDll({ datosh: datos_envio }, params.callback, urlDll(params.nombredll, params.carpeta));
    }
}

_consultaSql = function (params) {
    var connect = $.parseJSON((JSON.stringify($CONEXION_BD)));
    connect.database = params.db || $CONEXION_BD.database;

    var connection = mysql.createConnection(connect);
    connection.connect();
    connection.query(params.sql, params.callback);
    connection.end();
}
