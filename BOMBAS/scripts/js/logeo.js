const path = require('path');
        var $_IP_DATOS = false;
$(document).ready(inicio);

function inicio() {
    if (localStorage.IP_DATOS) {
        $_IP_DATOS = localStorage.IP_DATOS || false;
        _cargarContabilidad();
        $('#usuario').focus();
        $('#validarForm').click(verificarLogin);
        $('#clave, #usuario').keyup(function (e) {
            e.preventDefault();
            if (e.which === 13) {
                verificarLogin();
            }
        });
    } else {
        var fuente = ''
                + '<div style="text-align: center; ">'
                + ' <input id="input_ip" type="text" style="outline: none;padding: 5px 35px;box-sizing: border-box;" autofocus/>'
                + '</div>';

        jAlert({
            titulo: 'Ingrese Ip',
            mensaje: fuente,
            autoclose: false
        }, function () {
            // Evento aceptar
            if ($('#input_ip').val()) {
                jAlert_close();
                localStorage.IP_DATOS = $('#input_ip').val();
                window.location.reload();
            } else {
                toast('Adbertencia!', 'Debe ingresar la ip', 'warning');
            }
        });
    }
}

$(document).on('click', '.btn-edit', function () {
    var select = $('#select-contabilidad');
    var input = $('#inpt-contabilidad');

    var state = select.is(':visible');
    if (state) {
        select.addClass('hidden');
        input.removeClass('hidden').val('').focus();
    } else {
        select.removeClass('hidden');
        input.addClass('hidden');
    }
});

function _cargarContabilidad() {
    var url = get_url('datos/SC-USU-NET.JSON');
    $.getJSON(url, function (data) {
        var contab = data.Usunet[0].CONTAB, nit = data.Usunet[0].NITUSU;
        contab.pop();
        for (var i in contab) {
            var objContab = $('<option/>',
                    {
                        text: contab[i].DIR.trim(),
                        value: contab[i].DIR.trim()
                    }
            );
            console.debug(objContab)
            $('#select-contabilidad').append(objContab);
        }

        url = path.join('P:\\\PROG\\\LOGOS\\\00004059.bmp');
        $('#logo').attr('style', `background: url(${url}) no - repeat center center`);
    }).fail(function (jqxhr, textStatus, error) {
        jAlert({titulo: "Error: 99", mensaje: "Ha ocurrido un error cargando los datos USUNET: " + error});
    });
}

function verificarLogin() {
    var admin = $('#usuario').val().trim(),
            clave = $('#clave').val().trim(),
            mes = $('#mesIngreso').val();

    if (!admin) {
        alerta('Ingrese un usuario', function () {
            $('#usuario').focus()
        })
    } else if (admin != '0101' && !clave) {
        alerta('Ingrese una contraseña', function () {
            $('#clave').focus()
        })
    } else if ($('#select-contabilidad').is(':visible') && !$('#select-contabilidad').val() && admin != '99') {
        alerta('Seleccione una contabilidad')
    } else if ($('#inpt-contabilidad').is(':visible') && !$('#inpt-contabilidad').val() && admin != '99') {
        alerta('Ingrese una contabilidad')
    } else {
        if (!admin == '99') {
            clave = CerosIzq(clave, 8);
        }
        admin = CerosIzq(admin, 4);

        var contab = $('#select-contabilidad').is(':visible') ? $('#select-contabilidad').val() : ($('#inpt-contabilidad').is(':visible') ? $('#inpt-contabilidad').val().trim().toUpperCase() : false);
        ;

        localStorage.setItem('Contab', contab);
        localStorage.setItem('CarpetaTrabajo', mes);
        var datos_envio = admin + '|' + clave + "|";
        var url = get_url("app/INDEX.dll");
        SolicitarDll({datosh: datos_envio}, recibirLogin, url);
    }
}

function recibirLogin(data) {
    var url;
    var res = data.split('|');
    if (res[0].trim() == '00') {
        if (res[1] == '01') {
            console.debug(res)
            localStorage['User'] = res[2];
            localStorage['Nombre'] = res[3];
            localStorage['Sesion'] = res[4].trim();
            localStorage.Clave = $('#clave').val().trim();
            url = path.join(__dirname, '../paginas/menu_user.html');
            window.location.href = url;
        } else {
            url = path.join(__dirname, '../paginas/menu_config.html');
            window.location.href = url;
        }
    } else {
        jAlert({titulo: 'Error ' + res[0], mensaje: '<b>Mensaje: </b>' + res[1] + '<br> <b>App:</b> ' + res[2]});
    }
}

var alerta = function (mensaje, func) {
    jAlert({titulo: 'Alerta', mensaje: mensaje}, func);
}

function CerosIzq(obj, tam) {
    while (obj.length < tam) {
        obj = '0' + obj;
    }
    return obj;
}

function get_url(dll) {
    return "http://" + $_IP_DATOS + "/bombas/" + dll;
}