const exe = require('child_process').execFile,
    fs = require('fs');
    
const path = require('path');

var $_IP_DATOS;
var $_DATOS_CONTAB = [];
var $_FECHA = "";
$(document).ready(function () {
    consultarIp();
    $('#guardar_conf').click(guardarConfig);
    
    $('#dir_cont_conf').keyup(function (e){
        e.preventDefault();
        if (e.which === 13){
            if ($(this).val()){
                montarData($(this).val());
                $(this).val('').focus();
            }
        }
    });
    
    $('#add_contab_conf').click(function () {
        if ($('#dir_cont_conf').val()) {
            montarData($('#dir_cont_conf').val());
            $('#dir_cont_conf').val('').focus();
        }
    });
    
    $('#salir_conf').click(function (){
        var url = path.join(__dirname, '../login/login.html');
        window.location.href = url;
    });

});

function consultarIp(){
    if (localStorage.IP_DATOS) {
        $_IP_DATOS = localStorage.IP_DATOS;
        var url = get_url("datos/SC-USU-NET.JSON");
        console.debug(get_url("datos/SC-USU-NET.JSON"))
        SolicitarDatos({}, respuestCargarJson, url);
    } else {
        jAlert({titulo: 'Error 99', mensaje: 'No se encontro ip, favor y volver al logueo', autoclose: false});
    }
}

function respuestCargarJson(datos) {
    console.log(datos)
    conf = datos['Usunet'];
    $('#empr_conf').val(conf[0]['NOMUSU']);
    $('#nit_conf').val(conf[0]['NITUSU']);
    $('#dir_conf').val(conf[0]['DIRUSU']);
    $('#email_conf').val(conf[0]['EMAILUSU']);
    $('#contr_conf').val(conf[0]['CLAVEUSU']);
    $('#serv_email_conf').val(conf[0]['SERVIDORUSU']);
    $('#puerto_conf').val(conf[0]['PUERTOUSU']);
    $('#ssl_conf').val(conf[0]['SSLUSU']);
    $('#ip_datos_conf').val(conf[0]['IPUSU']);
    $('#ip_desc_conf').val(conf[0]['IP-DESCARGA']);
    $('#timer_conf').val(conf[0]['Tiempo']);
    var cont = conf[0].CONTAB.length;
    $('table tbody').html('');
    if (cont > 0) {
        for (var i = 0; i < cont - 1; i++) {
            montarData(conf[0].CONTAB[i]['DIR'].trim());
        }
    }
}

function montarData(data) {
    var cont = $('table tbody tr').length + 1;
    if (cont > 60) {
        alert('Supero el maximo de contabilidades por usuario');
    } else {
        var plantilla = "<tr>" +
                "<td>" + cont + "</td>" +
                "<td>" + data + "</td>" +
                "<td>" +
                "<a delete>" +
                "<i class='fa fa-trash'></i>" +
                "</a>" +
                "</td>" +
                "</tr>";
        $('table tbody').append(plantilla);
    }
    $("a[delete]").click(function () {
        $(this).parents('tr').remove();
    });
}

function guardarConfig() {
    var array_contab = [];
    if ($('table tbody tr').length > 0) {
        $.each($('table tbody tr'), function (k, v) {
            array_contab.push({contab: $(v).children('td:eq(1)').text().trim()});
            //tabla += $(v).children('td:eq(1)').text().trim()+"\r\n";
        });
        
        $_FECHA = moment().format('YYYYMMDDhhmm');
        var datos = {
            contabilidad: array_contab,
            sesion: $_FECHA
        };
        $.ajax({
            data: datos,
            type: 'POST',
            async: false,
            url: get_url('paginas/inc/_datos_config.php')
        }).done(function (data) {
            var res = data.split('|');
            if (res[0].trim() == '00') {
                bajarDatos();
            } else {
                console.error(data);
                plantillaError(res[0], res[1], res[2]);
            }
        });
    } else {
        alert('Debe ingresar las contabilidades');
    }

}

function bajarDatos() {
    var datosEnvio = $_FECHA;
    datosEnvio += "|";
    datosEnvio += $('#empr_conf').val();
    datosEnvio += "|";
    datosEnvio += $('#nit_conf').val();
    datosEnvio += "|";
    datosEnvio += $('#dir_conf').val();
    datosEnvio += "|";
    datosEnvio += $('#email_conf').val();
    datosEnvio += "|";
    datosEnvio += $('#contr_conf').val();
    datosEnvio += "|";
    datosEnvio += $('#serv_email_conf').val(); 
    datosEnvio += "|";
    datosEnvio += $('#puerto_conf').val();
    datosEnvio += "|";
    datosEnvio += $('#ssl_conf').val();
    datosEnvio += "|";
    datosEnvio += $('#ip_datos_conf').val();
    datosEnvio += "|";
    datosEnvio += $('#ip_desc_conf').val();
    datosEnvio += "|";
    datosEnvio += $('#timer_conf').val();
    datosEnvio += "|";
    console.log(datosEnvio);
    var url = get_url('app/BOM001.DLL');
    SolicitarDll({datosh: datosEnvio}, respuestGuardado, url);
}

function respuestGuardado(datos) {
    var resp = datos.split('|');
    if (datos.trim() == '00') {
        refrescarMenu();
    } else {
        alert(resp[0] + ' - ' + resp[1]);
    }
}

function refrescarMenu(){
    var url = get_url("app/INDEX.dll");
    var datos_envio = '0099|641218';
    SolicitarDll({ datosh: datos_envio }, function (data){
        var res = data.split('|');
        console.log(res)
        if (res[00] == '00'){
            window.location.reload();
        }else{
            jAlert({titulo: 'Error 99', mensaje: 'Error al refrescar menu configuracion.', autoclose: false});
        }
    }, url);
}

function get_url(dll) {
    return "http://" + $_IP_DATOS + "/bombas/" + dll;
}