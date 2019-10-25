var $_ARTICULOS, $_NOVEDAD, $_DATOS_02;
$(document).ready(function () {
    _crearJsonArticulos_02();
});

$(document).on('click', '#productoBtn_02', _ventanaProdunctos);
$(document).on('keydown', '#producto_02', _ventanaProdunctos);


function _ventanaProdunctos(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda ARTICULOS',
            columnas: ["GRP", "NUMERO", "DESCRIP", "UNID", "VALOR", "REFER"],
            data: $_ARTICULOS,
            callback: function (data) {
                let grp = data.GRP.trim();
                $('#producto_02').val(grp + data.NUMERO.trim());
                _enterInput('#producto_02');
            }
        });
    }
}

function _crearJsonArticulos_02() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonArticulos_02, get_url("app/bombas/INV803.DLL"));
}

function on_crearJsonArticulos_02(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('temp/SC-MAESART-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_ARTICULOS = data.Articulos
                var arrayEliminar = [];
                arrayEliminar.push('SC-MAESART-' + localStorage.Sesion + ".json")
                _eliminarJson(arrayEliminar, on_eliminarJson_02);
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function on_eliminarJson_02(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        _solicitarAcceso();
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function _solicitarAcceso() {
    loader('hide');
    var psw = $_USUA_GLOBAL[0].CLAVE_2.trim();
    var fuente = ''
        + '<div style="width: 100%; height: 100%;text-align: center;">'
        + ' <input id="pwdAcceso" type="password" style="outline: none;padding: 5px 12px;box-sizing: border-box;" autofocus/>'
        + '</div>';

    jAlert({
        titulo: 'Clave de bloqueo',
        mensaje: fuente,
        autoclose: false,
        btnCancel: true
    }, function () {
        let pwdIn = $('#pwdAcceso').val();
        if (pwdIn == psw) {
            jAlert_close();
            $('#claveAcceso_02').val(psw);
            CON850(_evaluarNovedad_02, { opcion9: false });
        } else {
            $('#pwdAcceso').val('').focus();
            alert('Clave de acceso invalida')
        }
    }, function () {
        jAlert_close();
        _toggleNav();
    });
}

function _evaluarNovedad_02(novedad) {
    _inputControl('reset');
    _inputControl('disabled');

    $_NOVEDAD = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            modificar_02('1');
            break;
        default:
            _solicitarAcceso();
            break;
    }
    $('#novedad_02').val(novedad.id + ' - ' + novedad.descripcion);
}

function modificar_02() {
    validarInputs(
        {
            form: '#consulta',
            orden: "1"
        },
        function () { CON850(_evaluarNovedad_02); },
        _infoTanque
    )
}

function _infoTanque() {
    let tanque = $('#nroTanque_02').val();

    var datos_envio = datosEnvio() + cerosIzq(tanque, 2);

    var url = get_url("app/bombas/BOMB02.DLL");
    SolicitarDll({ datosh: datos_envio }, _onInfoTanque_02, url);
}

function _onInfoTanque_02(data) {
    var res = data.split('|');
    if (res[0] == '00') {
        if ($_NOVEDAD == '8') {
            $_DATOS_02 = res;
            _llenarDatos_02();
            validarPrimeraFase('1');
        } else if ($_NOVEDAD == '7') {
            jAlert({
                titulo: 'Mensaje ',
                mensaje: 'Ya existe código digitado',
            }, function () {
                modificar_02('1');
            });
        } else if ($_NOVEDAD == '9') {
            _eliminar();
        }
    } else {
        if ($_NOVEDAD == '8' || $_NOVEDAD == '9') {
            jAlert(
                { titulo: 'Mensaje ' + res[1], mensaje: 'No existe código digitado' },
                function () { modificar_02('1'); }
            );
        } else if ($_NOVEDAD == '7') {
            validarPrimeraFase('1')
        }
    }
}

function validarPrimeraFase(orden) {
    validarInputs(
        {
            form: '#fase1',
            orden: orden
        },
        function () {
            modificar_02('1');
        },
        _validarProducto
    )
}

function _validarProducto() {
    var nuevoCodigo = $('#producto_02').val().trim();
    var validacion = buscarProducto(nuevoCodigo);
    if (validacion != false) {
        $('#descrip_produc_02').val(validacion.DESCRIP)
        $('#producto_02').val(validacion.GRP.trim() + validacion.NUMERO.trim())
        validarSegundaFase();
    } else {
        plantillaError('Mensaje', 'No existe código digitado', '', function () { validarPrimeraFase('2'); });
    }
}

function validarSegundaFase(orden) {
    console.log('as')
    validarInputs(
        {
            form: '#fase2',
            orden: '1'
        },
        function () { validarPrimeraFase('2'); },
        validarClTanq
    )
}

function validarClTanq() {
    let clTanque = $('#clase_02').val();

    var datos_envio = datosEnvio() + cerosIzq(clTanque, 2);

    var url = get_url("app/bombas/BOMB01.DLL");
    SolicitarDll({ datosh: datos_envio }, _onInfoClTanque_02, url);
}

function _onInfoClTanque_02(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        $('#descrip_clase_02').val(res[1]);
        CON850_P(function (e) {
            if (e.id == 'S') {
                _dllBomb02_1();
            } else {
                setTimeout(()=>{validarSegundaFase();}, 200);
            }
        }, {})
    } else {
        plantillaError(res[0], res[1], res[2], validarSegundaFase);
    }
}

function _dllBomb02_1() {
    var data = bajarDatos_02();
    SolicitarDll({ datosh: data }, on_dllBomb02_1, get_url("app/bombas/BOMB02_1.DLL"));
}

function on_dllBomb02_1(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        _solicitarAcceso();
        _inputControl('reset');
        _inputControl('disabled');
    } else {
        plantillaError(res[0], res[1], res[2], validarSegundaFase);
    }
}

function _eliminar() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            _dllBomb02_1();
        } else {
            modificar_02('1');
        }
    }, {
        msj: '02'
    })
}

function _llenarDatos_02() {
    var producto = buscarProducto($_DATOS_02[4].trim());
    $('#detalle_02').val($_DATOS_02[2]);
    $('#clase_02').val($_DATOS_02[3]);
    $('#medicion_02').val($_DATOS_02[5]);
    $('#galon_02').val($_DATOS_02[6]);
    $('#fecha_02').val($_DATOS_02[7]);
    $('#producto_02').val($_DATOS_02[4]);
    if (producto != false)
        $('#descrip_produc_02').val(producto.DESCRIP);
    else
        $('#descrip_produc_02').val('');
}

function bajarDatos_02() {
    var datos_envio = datosEnvio();
    datos_envio += $_NOVEDAD;
    datos_envio += "|";
    datos_envio += $('#nroTanque_02').val();
    datos_envio += "|";
    datos_envio += $('#detalle_02').val();
    datos_envio += "|";
    datos_envio += $('#clase_02').val();
    datos_envio += "|";
    datos_envio += cerosIzq($('#producto_02').val(), $('#producto_02').val().length + 1);
    datos_envio += "|";
    datos_envio += $('#medicion_02').val();
    datos_envio += "|";
    datos_envio += $('#galon_02').val();
    datos_envio += "|";
    datos_envio += $('#fecha_02').val();
    datos_envio += "|";
    datos_envio += $_DATOS_02[8];
    datos_envio += "|";
    datos_envio += $_DATOS_02[9].trim();
    return datos_envio;
}

function buscarProducto(codigo) {
    var retornar = false;
    for (var i in $_ARTICULOS) {
        let code = $_ARTICULOS[i].GRP.trim().toLowerCase() + $_ARTICULOS[i].NUMERO.trim().toLowerCase();
        if (code.trim() == codigo.toLowerCase()) {
            retornar = $_ARTICULOS[i];
            break;
        }
    }

    return retornar;
}