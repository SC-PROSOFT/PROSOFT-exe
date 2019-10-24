const path = require('path'),
    mysql = require('mysql'),
    exe = require('child_process').execFile,
    fs = require('fs');

var $_RUTA_LOGO,
    $_IP_DATOS = false,
    $datosUsuar = [];
const { ipcRenderer } = require('electron');

$(document).ready(function () {
    $('#cerrar_menu_user').click(function (){
        var url = path.join(__dirname, '../login/login.html');
        window.location.href = url;
    });
    if (localStorage.IP_DATOS) {
        _indexUsuar();
        prueba();
    } else {
        jAlert({ titulo: 'Error 99', mensaje: 'No se encontro ip, favor y volver al logueo', autoclose: false });
    }
});

function prueba() {
    var datos = datosEnvio() + '20190902|' + "RYK780|";
    SolicitarDll({ datosh: datos }, function (data) {
        console.debug(data)
    }, get_url('app/CER101.dll'));
}

function _indexUsuar() {
    $_IP_DATOS = localStorage.IP_DATOS;
    var datos = datosEnvio();
    SolicitarDll({ datosh: datos }, cargarDatosUsuar, get_url('app/bom000.dll'));
}

function cargarDatosUsuar(datos) {
    console.debug(datos)
    var temp = datos.split('|'), razon_social;
    if (temp[0] === '00') {
        if (temp[5].trim()) {
            razon_social = temp[5];
        } else {
            razon_social = temp[10];
        }
        $('#razonSocial').html(razon_social);
        $datosUsuar = temp;
        $('#user_menu_user').html(localStorage.User + " - " + localStorage.Nombre);

        let mes = evaluarMes_min(localStorage.CarpetaTrabajo);

        $('title').html(`
        \\${localStorage.Contab}\\${mes}
        &nbsp&nbsp&nbsp&nbsp&nbsp
        ${localStorage.User} 
        ${localStorage.Nombre} 
        `)

        $_RUTA_LOGO = path.join('file://', __dirname, '../imagenes/logo/' + $datosUsuar[2] + '.BMP');
    } else {
        plantillaError(temp[0], temp[1], temp[2]);
    }
}

function get_url_local(file) {
    return "../paginas/" + file;
}

function get_url(dir) {
    return "http://" + $_IP_DATOS + "/bombas/" + dir;
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

// Formato impresiones

function imprimirPdf() {
    // var h = screen.height;
    // var w = screen.width;

    // window.print();
    var impresion = window.open('', '_blank');
    impresion.document.open();
    impresion.document.write("<style>" + $('#estiloImpresion').html() + "</style>");
    impresion.document.write($('#documento').html());

    impresion.document.close();
    impresion.focus();
    impresion.print();
    impresion.close();
}

function imprimirCsv(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }
    downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

// !Formato impresiones


function _enterInput(elm) {
    var e = $.Event('keyup');
    e.which = 13;
    $(elm).trigger(e);
}

function _eliminarJson(arrayFiles, func) {
    $.ajax({
        type: "POST",
        data: { files: arrayFiles },
        async: false,
        url: get_url("paginas/inc/_eliminarJson.php")
    }).done(function (msg) {
        func(msg);
    });
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

function datosEnvio() {
    var datos_envio = localStorage.Sesion;
    datos_envio += "|";
    datos_envio += localStorage.getItem('Contab');
    datos_envio += "|";
    datos_envio += carpetaTrabajo(localStorage.getItem('CarpetaTrabajo'));
    datos_envio += "|";
    return datos_envio;
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
        titulo: 'Error de conexión',
        autoclose: false,
        btnCancel: false,
        footer: false
    }, function () { });
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