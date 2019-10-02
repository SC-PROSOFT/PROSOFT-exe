const path = require('path');
const { ipcRenderer } = require('electron');
var $_IP_DATOS = false, $_CONTAB = false, $_NOMINA = false, $_MODULO = false;

ipcRenderer.on('ping', (e, m) => {
    localStorage.clear();
    var parametros = m.param.split('|');
    localStorage['IP_DATOS'] = parametros[0], localStorage['Modulo'] = parametros[1].toUpperCase();
    inicio();
});

function inicio(){   
    $_IP_DATOS = localStorage.IP_DATOS; 
    _cargarDatos();
    _faseValidarUsuario();
    $('#validarForm').click(function (){
        $.validar._fin();
    });
}

function _faseValidarUsuario(){
    $('.mid form .content-grid').addClass('hidden');
    validarInputs({
        form: "#fase_usuario",
        orden: "1"
    },
        _faseValidarUsuario,
        function (){
            if ($('#usuario').val().length < 1) alerta('Ingrese un usuario', _faseValidarUsuario) 
            else {
                _faseValidarClave();
                if ($('#usuario').val() != '99') validarInicioModulo();
            };
        }
    );
}

function validarInicioModulo(){
    var modulo = localStorage['Modulo'];
    $('.mid form .content-grid').removeClass('hidden');
    if (modulo == 'NOM' || modulo == 'PRD' || modulo == 'PRS'  || modulo == 'SEP' || modulo == 'MIG' || modulo == 'BAR'){
        if (modulo == 'NOM') $('#mesIngreso').attr('hidden', true), $('#select-nomina').removeAttr('hidden');
        if (modulo == 'PRD' || modulo == 'MIG' || modulo == 'BAR') $('.mid form .content-grid').addClass('hidden');
        if (modulo == 'PRS' || modulo == 'SEP') $('#mesIngreso').attr('hidden', true);
    }
    var mes = moment().format('MM');
    if (modulo == 'HIC'){
        $('#mesIngreso').val('13');    
    }else{
        $('#mesIngreso').val(mes);
    }
}

function _faseValidarClave(){
    validarInputs({
        form: "#fase_clave",
        orden: "1"
    },
        function (){
            _faseValidarUsuario();
        },
        function (){
            verificarLogin();
        }
    );
}

$(document).on('click', '.btn-edit', function () {
    var select = $('#select-contabilidad');
    var input = $('#inpt-contabilidad');

    let state = select.is(':visible');
    if (state) {
        select.addClass('hidden');
        input.removeClass('hidden').val('').focus();
    } else {
        select.removeClass('hidden');
        input.addClass('hidden');
    }
});

function _cargarDatos() {
    var url = get_url('datos/SC-USU-NET.JSON');
    console.log(url)
    $.getJSON(url, function (data) {
        $_CONTAB = data.Usunet[0].CONTAB;
        $_CONTAB.pop();
        
        $_NOMINA = data.Usunet[0].NOMINA;
        $_NOMINA.pop();
        
        $_MODULO = data.MODULOS;
        $_MODULO.pop();
        
        _cargarContabilidad();
        _cargarNomina();
        
        var nit = data.Usunet[0].NITUSU;
        let url = path.join('P:\\\PROG\\\LOGOS\\\00004059.bmp');
        $('#logo').attr('style', `background: url(${url}) no-repeat center center`);
    }).fail(function (jqxhr, textStatus, error) {
        jAlert({ titulo: "Error: 99", mensaje: "Ha ocurrido un error cargando los datos USUNET: " + error });
    });
}

function _cargarContabilidad(){
    $('#select-contabilidad').html('');
    for (var i in $_CONTAB) {
        let objContab = $('<option/>',
            {
                text: $_CONTAB[i].DIR.trim(),
                value: $_CONTAB[i].DIR.trim()
            }
        );
        $('#select-contabilidad').append(objContab);
    }
}

function _cargarNomina(){
    for (var i in $_NOMINA) {
        let objNomina = $('<option/>',
            {
                text: $_NOMINA[i].NOM.trim(),
                value: $_NOMINA[i].NOM.trim()
            }
        );
        $('#select-nomina').append(objNomina);
    }
}

function verificarLogin() {
    var admin = $('#usuario').val().trim(),
        clave = $('#clave').val().trim(),
        mes = $('#mesIngreso').val(),
        nomina = $('#select-nomina').val(),
        datos_envio = '';

    if (!admin){
        alerta('Ingrese un usuario',_faseValidarUsuario);
    }else if (admin != '99'){
        if ($('#select-contabilidad').is(':visible') && !$('#select-contabilidad').val()) {
            alerta('Seleccione una contabilidad', _faseValidarClave);
        } else if ($('#inpt-contabilidad').is(':visible') && !$('#inpt-contabilidad').val()) {
            alerta('Ingrese una contabilidad', _faseValidarClave);
        }else if ($('#select-nomina').is(':visible') && !$('#select-nomina').val()){
            alerta('Seleccione una nomina', _faseValidarClave);
        }else{
            if (clave == '') clave = SpacesIzq(clave, 8);
            datos_envio = admin + '|' + clave + '|'
            validarDataLoguin(datos_envio);
        }
    }else{
        if (clave.length < 1) 
            alert('Debe ingresar un clave', _faseValidarClave)
        else 
            admin = CerosIzq(admin, 4)
            datos_envio = admin + '|' + clave + '|'
            validarDataLoguin(datos_envio);
        ;
    }
}

function validarDataLoguin(datos){
    console.debug(datos)
    var url = get_url("app/INDEX.dll");
    SolicitarDll({ datosh: datos }, recibirLogin, url);
}

function recibirLogin(datos) {
    var res = datos.split('|'), url = '';
    if (datos.split('|')[0] === "00") {
        if (datos.split('|')[1] === "01") {
            var modulo = localStorage['Modulo'];
            var clave = $('#clave').val().trim(),
                mes = $('#mesIngreso').val(),
                contab = $('#select-contabilidad').is(':visible') ? $('#select-contabilidad').val() : ($('#inpt-contabilidad').is(':visible') ? $('#inpt-contabilidad').val().trim().toUpperCase() : false),
                nomina = $('#select-nomina').val() || '',
                consulta = consultarModulo(modulo);
        
            if (consulta){
                if (consulta.array.ACT == 'S'){
                    localStorage.Clave = clave;
                    localStorage.Usuario = res[2];
                    localStorage.Nombre = res[3];
                    localStorage.Sesion = res[4];
                    localStorage.Contab = contab;
                    localStorage.Nomina = nomina;
                    localStorage.Mes = mes;
                    
                    url = path.join(`${__dirname}`, `../frameworks/paginas/menu_user.html`);
                    window.location.href = url;
                }else{
                    alert('Modulo no se encuentra habilitado', _faseValidarClave);
                }
            } else if(modulo == 'MIG'){
                console.log('entroa migrador')
                url = path.join(`${__dirname}`, `../frameworks/paginas/menu_user.html`);
                window.location.href = url;
            }else{
                alert('No se encontro modulo', _faseValidarClave);
            }
        } else {
            let url = path.join(__dirname, '../frameworks/paginas/menu_config.html');
            window.location.href = url;
        }
    } else {
        jAlert(
            { titulo: 'Error ' + res[0], mensaje: '<b>Mensaje: </b>' + res[1] + '<br> <b>App:</b> ' + res[2] },
            _faseValidarClave
        );
    }
}

var alerta = function (mensaje, func) {
    jAlert({ titulo: 'Alerta', mensaje: mensaje }, func);
}

function CerosIzq(obj, tam) {
    while (obj.length < tam) {
        obj = '0' + obj;
    }
    return obj;
}

function SpacesIzq(obj, tam) {
    while (obj.length < tam) {
        obj = ' ' + obj;
    }
    return obj;
}

function get_url(dll) {
    return "http://" + $_IP_DATOS + "/MAIN-ELECT/" + dll;
}

function consultarModulo(item) {
    var retornar = false;
    for (var i in $_MODULO) {
        if (item == $_MODULO[i].COD) {
            retornar = {
                index: i,
                array: $_MODULO[i]
            }
        }
    }
    return retornar;
}