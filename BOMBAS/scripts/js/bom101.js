var $_DATOS_101, $_NOVEDAD, $_ARTICULOS, $_ALMACENES, $_COSTOS, $numeracion;

var descuentoMask = new IMask(
    document.getElementById('descuento_101'),
    { mask: Number, min: 0, max: 99999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

var pesosMask = new IMask(
    document.getElementById('pesos_101'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var galonajeMask = new IMask(
    document.getElementById('galonaje_101'),
    { mask: Number, min: 0, max: 9999999999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

$(document).ready(function () {
    loader('hide');
    // _ventanaDatos_lite({
    //     titulo: 'Busqueda pacientes',
    //     // tablaSql: 'sc_archcups',
    //     // indice: ['codigo', 'descripcion'],
    //     tablaSql: 'sc_pacie',
    //     indice: ['cedula', 'nombre'],
    //     mascara: [
    //         {
    //             ing_act: 'hide',
	// 			cod_barras: 'Codigo de barras'
    //         }
    //     ],
    //     minLength: 1,
    //     callback_esc: function () {
    //         $('#producto_101').focus();
    //     },
    //     callback: function (data) {
    //         console.log(data)
    //     }
    // });

    _crearJsonArticulos_101()

    _toggleF8([
        { input: 'producto', app: '101', funct: _ventanaProductos },
        { input: 'almacen', app: '101', funct: _vantanaAlmacenes },
        { input: 'centrocostos', app: '101', funct: _ventanaCentroCostos }
    ]);
});

function _ventanaProductos(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda articulos',
            columnas: ["GRP", "NUMERO", "DESCRIP", "UNID", "VALOR", "REFER"],
            data: $_ARTICULOS,
            callback_esc: function () {
                $('#producto_101').focus();
            },
            callback: function (data) {
                let grp = data.GRP.trim()
                $('#producto_101').val(grp + data.NUMERO.trim());
                _enterInput('#producto_101');
            }
        });
    }
}

function _vantanaAlmacenes(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda almacén',
            columnas: ["COD", "DESCRIP"],
            data: $_ALMACENES,
            callback_esc: function () {
                $('#almacen_101').focus();
            },
            callback: function (data) {
                $('#almacen_101').val(data.COD.trim())
                _enterInput('#almacen_101');
            }
        });
    }
}

function _ventanaCentroCostos(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda centro de costos',
            columnas: ["COD", "DESCRIP", "NOMBRE"],
            data: $_COSTOS,
            callback_esc: function () {
                $('#centrocostos_101').focus();
            },
            callback: function (data) {
                $('#centrocostos_101').val(data.COD.trim())
                _enterInput('#centrocostos_101');
            }
        });
    }
}

function _crearJsonArticulos_101() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonArticulos_101, get_url("app/INV803.DLL"));
}

function on_crearJsonArticulos_101(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('PROGDATOS/JSON/SC-MAESART-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_ARTICULOS = data.Articulos
                _crearJsonAlmacenes_101();
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function _crearJsonAlmacenes_101() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonAlmacenes_101, get_url("app/INV801.DLL"));
}

function on_crearJsonAlmacenes_101(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-ARCHLOC-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_ALMACENES = data.LOCAL
                _crearJsonCentroCostos_101();
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function _crearJsonCentroCostos_101() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonCentroCostos_101, get_url("app/CON803.DLL"));
}

function on_crearJsonCentroCostos_101(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-ARCHCOS-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_COSTOS = data.COSTO
                var arrayEliminar = [];
                arrayEliminar.push('SC-MAESART-' + localStorage.Sesion)
                arrayEliminar.push('SC-ARCHLOC-' + localStorage.Sesion)
                arrayEliminar.push('SC-ARCHCOS-' + localStorage.Sesion)
                _eliminarJson(arrayEliminar, on_eliminarJson);
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function on_eliminarJson(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        _solicitarAcceso();
    } else {
        plantillaError(res[0], 'Ha ocurrido un error eliminando archivos <b>.JSON</b>', '_eliminarJson', _toggleNav);
    }
}

function _solicitarAcceso() {
    loader('hide');
    var psw = $datosUsuar[5].trim();
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
        // Evento aceptar
        let pwdIn = $('#pwdAcceso').val().trim();
        if (pwdIn == psw) {
            jAlert_close();
            $('#claveAcceso_101').val(psw);
            CON850(_evaluarNovedad_101, { opcion9: false });
        } else {
            $('#pwdAcceso').val('').focus();
            alert('Clave de acceso invalida')
        }
    }, function () {
        jAlert_close();
        _toggleNav();
    });
}

function _evaluarNovedad_101(novedad) {
    _inputControl('reset');
    _inputControl('disabled');

    $_NOVEDAD = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            modificar_101('1');
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedad_101').val(novedad.id + ' - ' + novedad.descripcion)
}

function modificar_101(orden) {
    validarInputs(
        {
            form: '#consulta',
            orden: orden
        },
        function () { CON850(_evaluarNovedad_101); },
        _infoSurtidores_101
    )
}

function _infoSurtidores_101() {
    let isla = $('#nroIsla_101').val();
    let registradora = $('#nroRegistradora_101').val();

    var datos_envio = datosEnvio()
        + isla + '|'
        + registradora + '|';

    var url = get_url("app/BOM101.DLL");
    SolicitarDll({ datosh: datos_envio }, _onInfoSurtidores_101, url);
}

function _onInfoSurtidores_101(data) {
    console.debug(data);
    var res = data.split('|');
    if (res[0] == '00') {
        if ($_NOVEDAD == '8') {
            $_DATOS_101 = res;
            _llenarDatos_101();
        } else if ($_NOVEDAD == '7') {
            jAlert({
                titulo: 'Mensaje ',
                mensaje: 'Ya existe código digitado',
            }, function () {
                modificar_101('2');
            });
        } else if ($_NOVEDAD == '9') {
            _eliminar();
        }
    } else {
        if ($_NOVEDAD == '8' || $_NOVEDAD == '9') {
            jAlert(
                { titulo: 'Mensaje ' + res[1], mensaje: 'No existe código digitado' },
                function () { modificar_101('2'); }
            );
        } else if ($_NOVEDAD == '7') {
            validarPrimeraFase('1')
        }
    }
}

function _eliminar() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            var datos_envio = datosEnvio();
            datos_envio += $_NOVEDAD;
            datos_envio += "|";
            datos_envio += $('#nroIsla_101').val();
            datos_envio += "|";
            datos_envio += $('#nroRegistradora_101').val();
            datos_envio += "|";

            SolicitarDll({ datosh: datos_envio }, on_guardarEliminar, get_url("app/BOM101_R.DLL"));

        } else {
            modificar_101('1');
        }
    }, {
            msj: '02'
        })
}

function on_guardarEliminar(data) {
    var temp = data.split('|')
    if (data.trim() === '00') {
        jAlert({ titulo: 'Notificacion', mensaje: "Eliminado correctamente" }, function () { modificar_101('1'); });
    } else {
        plantillaError(temp[0], temp[1], temp[2]);
    }
}

function _llenarDatos_101() {
    var producto = buscarProducto($_DATOS_101[2].trim());
    if (producto != false) {
        var almacen = buscarAlmacen($_DATOS_101[6].trim())
        if (almacen != false) {
            console.log($_DATOS_101[7].trim())
            var costo = buscarCostos($_DATOS_101[7].trim())
            if (costo != false) {
                $('#detalle_101').val($_DATOS_101[1].trim())
                $('#producto_101').val($_DATOS_101[2].trim())
                $('#productoDescrip_101').val(producto.DESCRIP)
                descuentoMask.unmaskedValue = $_DATOS_101[3].trim()
                galonajeMask.unmaskedValue = $_DATOS_101[4].trim()
                pesosMask.unmaskedValue = $_DATOS_101[5].trim()
                $('#almacen_101').val($_DATOS_101[6].trim())
                $('#almacenDescrip_101').val(almacen.DESCRIP)
                $('#centrocostos_101').val($_DATOS_101[7].trim())
                $('#centrocostosDescrip_101').val(costo.NOMBRE)
                validarPrimeraFase('1');
            } else {
                jAlert({ titulo: 'Error', mensaje: 'Centro de costo no encontrado' }, function () { modificar_101('2'); });
            }
        } else {
            jAlert({ titulo: 'Error', mensaje: 'Almacen no encontrado' }, function () { modificar_101('2'); });
        }
    } else {
        jAlert({ titulo: 'Error', mensaje: 'Producto no encontrado' }, function () { modificar_101('2'); });
    }
}

function validarPrimeraFase(orden) {
    validarInputs(
        {
            form: '#fase1',
            orden: orden
        },
        function () { modificar_101('2'); },
        _validarProducto
    )
}

function _validarProducto() {
    var nuevoCodigo = $('#producto_101').val();
    var validacion = buscarProducto(nuevoCodigo);
    if (validacion != false) {
        $('#productoDescrip_101').val(validacion.DESCRIP)
        $('#producto_101').val(validacion.GRP.trim() + validacion.NUMERO.trim())
        validarSegundaFase('1');
    } else {
        jAlert({
            titulo: 'Mensaje ',
            mensaje: 'No existe código digitado',
        }, function () {
            validarPrimeraFase('2');
        });
    }
}

function validarSegundaFase(orden) {
    validarInputs(
        {
            form: '#fase2',
            orden: orden
        },
        function () { validarPrimeraFase('2'); },
        validarTerceraFase
    )
}

function validarTerceraFase() {
    validarInputs(
        {
            form: '#fase3',
            orden: '1'
        },
        function () { validarSegundaFase('3'); },
        _validarAlmacen
    )
}

function _validarAlmacen() {
    var nuevoAlmacen = $('#almacen_101').val();
    var validacion = buscarAlmacen(nuevoAlmacen);
    if (validacion != false) {
        $('#almacen_101').val(validacion.COD);
        $('#almacenDescrip_101').val(validacion.DESCRIP);
        validarCuartaFase();
    } else {
        jAlert({
            titulo: 'Mensaje ',
            mensaje: 'No existe código digitado',
        }, function () {
            validarTerceraFase()
        });
    }

}

function validarCuartaFase() {
    validarInputs(
        {
            form: '#fase4',
            orden: '1'
        },
        validarTerceraFase,
        _validarCentroCostos
    )
}


function _validarCentroCostos() {
    var nuevoCosto = $('#centrocostos_101').val();
    var validacion = buscarCostos(nuevoCosto);
    if (validacion != false) {
        // let cod = validacion.COD.trim().slice(2, 4);
        let cod = validacion.COD.trim();
        $('#centrocostos_101').val(cod);
        $('#centrocostosDescrip_101').val(validacion.NOMBRE.trim());
        validacionFinal_101();
    } else {
        jAlert({
            titulo: 'Mensaje ',
            mensaje: 'No existe código digitado',
        }, function () {
            validarCuartaFase()
        });
    }
}

function validacionFinal_101() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            guardarModificar();
        } else {
            setTimeout(validarCuartaFase, 500)
        }
    }, {})
}

function guardarModificar() {
    var sesion = localStorage.Sesion;
    var novedad = $_NOVEDAD;
    var datosForm = bajarDatos();
    var operador = localStorage.User;
    var fecRest = '      ';

    var datos_envio = datosEnvio();
    datos_envio += novedad;
    datos_envio += '|';
    datos_envio += datosForm;
    datos_envio += '|';
    datos_envio += operador;
    datos_envio += '|';
    datos_envio += fecRest;
    datos_envio += '|';

    console.debug(datos_envio)
    SolicitarDll({ datosh: datos_envio }, on_guardarModificar, get_url("app/BOM101_R.DLL"));
}

function on_guardarModificar(data) {
    console.debug(data);
    var temp = data.split('|')
    if (data.trim() === '00') {
        if ($_NOVEDAD === '7') {
            jAlert({ titulo: 'Notificacion', mensaje: "Creado correctamente" }, function () { modificar_101('1'); });
        } else {
            jAlert({ titulo: 'Notificacion', mensaje: "Modificado correctamente" }, function () { modificar_101('1'); });
        }
    } else {
        plantillaError(temp[0], temp[1], temp[2]);
    }

}

function bajarDatos() {
    var isla = $('#nroIsla_101').val();
    var registradora = $('#nroRegistradora_101').val();
    var detalleProducto = $('#detalle_101').val().trim();
    var codProducto = $('#producto_101').val().substring(2, $('#producto_101').val().length);
    var grpProducto = $('#producto_101').val().substring(0, 2);
    var galonaje = galonajeMask.unmaskedValue ? galonajeMask.unmaskedValue : 0;
    galonaje = parseFloat(galonaje).toFixed(3).replace(/\./g, '');

    var pesos = pesosMask.unmaskedValue;

    var descuento = descuentoMask.unmaskedValue ? descuentoMask.unmaskedValue : 0;
    descuento = parseFloat(descuento).toFixed(0).replace(/\./g, '');

    var centroCostos = $('#centrocostos_101').val();
    var almacen = $('#almacen_101').val();

    var datos = ''
    datos += isla
    datos += '|'
    datos += registradora
    datos += '|'
    datos += espaciosIzq(detalleProducto, 20);
    datos += '|'
    datos += cerosIzq(grpProducto, 2);
    datos += '|'
    datos += espaciosDer(codProducto, 13);
    datos += '|'
    datos += '  '
    datos += '|'
    datos += cerosIzq(galonaje, 13);
    datos += '|'
    datos += cerosIzq(pesos, 12);
    datos += '|'
    datos += cerosIzq(descuento, 15);
    datos += '|'
    datos += cerosIzq(centroCostos, 4);
    datos += '|'
    datos += almacen;

    return datos;
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

function buscarCostos(codigo) {
    var retornar = false;
    // codigo = cerosIzq(codigo, 4);
    for (var i in $_COSTOS) {
        var costo = $_COSTOS[i].COD.trim().toLowerCase()
        if (costo == codigo.toLowerCase()) {
            retornar = $_COSTOS[i];
            break;
        }
    }

    return retornar;
}

function buscarAlmacen(codigo) {
    var retornar = false;
    for (var i in $_ALMACENES) {
        if ($_ALMACENES[i].COD.trim().toLowerCase() == codigo.toLowerCase()) {
            retornar = $_ALMACENES[i];
            break;
        }
    }

    return retornar;
}
