var $_DATOS_103, $_NOVEDAD_103, $_ARTICULOS_103, $_ALMACENES_103, $_CUENTAS_103, $_TASAS_103;

var valorSobretasaMask = new IMask(
    document.getElementById('valorSobretasa_103'),
    { mask: Number, min: 0, max: 99999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var valorGlobalMask = new IMask(
    document.getElementById('valorGlobal_103'),
    { mask: Number, min: 0, max: 99999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

$(document).ready(inicio);

function inicio() {
    _crearJsonArticulos_103();

    _toggleF8([
        { input: 'producto', app: '103', funct: _ventanaArticulos },
        { input: 'producto2', app: '103', funct: _ventanaArticulos },
        { input: 'contabSobretasa', app: '103', funct: _ventanaSobreTasas },
        { input: 'contabGlobal', app: '103', funct: _ventanaSobreTasasGlobal },
    ]);
}

function _ventanaArticulos(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda ARTICULOS',
            columnas: ["GRP", "NUMERO", "DESCRIP", "UNID", "VALOR", "REFER"],
            data: $_ARTICULOS_103,
            callback_esc: function () {
                $('#producto_103').focus();
            },
            callback: function (data) {
                $('#producto2_103').val(data.GRP.trim());
                $('#producto_103').val(data.NUMERO.trim());
                _enterInput('#producto_103');
            }
        });
    }
}

function _ventanaSobreTasas(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "Busqueda plan de cuentas",
            columnas: ["CTA", "DESCRIP", "TIPO"],
            data: $_CUENTAS_103,
            callback_esc: function () {
                $('#contabSobretasa_103').focus();
            },
            callback: function (data) {
                $('#contabSobretasa_103').val(data.CTA.trim()).focus();
                _enterInput('#contabSobretasa_103');
            }
        });
    }
}

function _ventanaSobreTasasGlobal(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "Busqueda plan de cuentas",
            columnas: ["CTA", "DESCRIP", "TIPO"],
            data: $_CUENTAS_103,
            callback_esc: function () {
                $('#contabGlobal_103').focus();
            },
            callback: function (data) {
                $('#contabGlobal_103').val(data.CTA.trim()).focus();
                _enterInput('#contabGlobal_103');
            }
        });
    }
}

function _crearJsonArticulos_103() {
    console.log(get_url("app/INV803.DLL"))
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonArticulos_103, get_url("app/bombas/INV803.DLL"));
}

function on_crearJsonArticulos_103(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('temp/SC-MAESART-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_ARTICULOS_103 = data.Articulos
                _crearJsonCuentas_103();
            },
            rutaJson
        );
    } else {
        jAlert({ titulo: 'Mensaje ' + res[1], mensaje: res[2] });
    }
}

function _crearJsonCuentas_103() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonCuentas_103, get_url("app/bombas/CON801.DLL"));
}

function on_crearJsonCuentas_103(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('temp/SC-ARCHMAE-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_CUENTAS_103 = data.CUENTAS
                var arrayEliminar = [];
                arrayEliminar.push('SC-MAESART-' + localStorage.Sesion + ".json")
                arrayEliminar.push('SC-ARCHMAE-' + localStorage.Sesion + ".json")
                _eliminarJson(arrayEliminar, on_eliminarJson);
            },
            rutaJson
        );
    } else {
        jAlert({ titulo: 'Mensaje ' + res[1], mensaje: res[2] });
    }
}

function on_eliminarJson(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        CON850(_evaluarNovedad_103);
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function _evaluarNovedad_103(novedad) {

    _inputControl('reset');
    _inputControl('disabled');

    $_NOVEDAD_103 = novedad.id;
    $('#almacen').val('ALM01');
    $('#almacenDescrip').val('Almacen principal');
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            modificar_103('1');
            break;
        default:
            _toggleNav();
            break;
    }

    $('#novedad_103').val(novedad.id + ' - ' + novedad.descripcion)
}

function modificar_103(orden) {
    setTimeout(function () {
        validarInputs(
            {
                form: '#fase1',
                orden: orden
            },
            function () {
                CON850(_evaluarNovedad_103);
            },
            _validarProducto_103
        )
    }, 100);
}

function _validarProducto_103() {
    var producto = $('#producto_103').val();

    var grupoProducto = $('#producto2_103').val();
    var nuevoCodigo = grupoProducto + producto;
    var validacion = buscarProducto_103(nuevoCodigo);
    if (validacion != false) {
        $('#productoDescrip_103').val(validacion.DESCRIP)
        $('#producto_103').val(validacion.NUMERO.trim())
        _validarSobretasa_103();

    } else {
        $('#productoDescrip_103').val('');
        plantillaError('99', '01', '-', function () {
            modificar_103('2');
        });
    }
}

function _validarSobretasa_103() {
    var grupoProducto = $('#producto2_103').val();
    var producto = $('#producto_103').val();

    var datos_envio = datosEnvio()
        + espaciosIzq(grupoProducto, 2) + '|'
        + espaciosDer(producto, 15) + '|';

    SolicitarDll({ datosh: datos_envio }, on_validarSobretasa_103, get_url("app/bombas/BOMSOB.DLL"));
}

function on_validarSobretasa_103(data) {
    var res = data.split('|');
    if (res[0] == '00') {
        if ($_NOVEDAD_103 == '8') {
            valorSobretasaMask.unmaskedValue = res[2];
            var cuentaContable = res[3].trim();
            var validacion = buscarCuentaContable_103(cuentaContable);
            if (validacion != false) {
                $('#contabSobretasa_103').val(validacion.CTA.trim());
                $('#contabDescrip_103').val(validacion.DESCRIP.trim());
            } else {
                $('#contabDescrip_103').val('');
            }

            valorGlobalMask.unmaskedValue = res[4];
            $('#contabGlobal_103').val(res[5].trim());
            _validarValor_103('1');
        } else if ($_NOVEDAD_103 == '7') {
            jAlert({ titulo: 'Mensaje ' + res[1], mensaje: 'Ya existe código digitado', },
                function () {
                    setTimeout(function () {
                        modificar_103('2');
                    }, 100)
                });
        } else if ($_NOVEDAD_103 == '9') {
            _eliminar_103();
        }
    } else {
        if ($_NOVEDAD_103 == '8' || $_NOVEDAD_103 == '9') {
            plantillaError(res[0], res[1], res[2], function () {
                modificar_103('2');
            });
        } else if ($_NOVEDAD_103 == '7') {
            validarSegundaFase_103('1')
        }
    }
}

function _eliminar_103() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            var grupoProducto = $('#producto2_103').val();
            var producto = $('#producto_103').val();

            var datos_envio = datosEnvio();
            datos_envio += $_NOVEDAD_103;
            datos_envio += "|";
            datos_envio += espaciosIzq(grupoProducto, 2);
            datos_envio += "|";
            datos_envio += espaciosDer(producto, 15);
            datos_envio += "|";
            SolicitarDll({ datosh: datos_envio }, on_eliminar_103, get_url("app/bombas/BOM103.DLL"));

        } else {
            modificar_103('1');
        }
    }, { msj: '02' });
}

function on_eliminar_103(data) {
    var temp = data.split('|')
    if (data.trim() === '00') {
        jAlert({ titulo: 'Notificacion', mensaje: "Eliminado correctamente" }, function () {
            modificar_103('1');
        });
    } else {
        plantillaError(temp[0], temp[1], temp[2]);
    }
}

function _validarValor_103(orden) {
    setTimeout(function () {
        validarInputs(
            {
                form: '#faseValidarValor',
                orden: orden
            },
            function () {
                modificar_103('2');
            },
            _validacionValor_103
        )
    }, 100);
}

function _validacionValor_103() {
    var vlrSobretasa = valorSobretasaMask.unmaskedValue ? valorSobretasaMask.unmaskedValue : 0;
    if (vlrSobretasa == 0) {
        $('#contabSobretasa_103').val('');
        $('#contabDescrip_103').val('');
    } else {
        var codContab = $('#contabSobretasa_103').val();
        if (codContab.length < 1)
            $('#contabSobretasa_103').val('28150500001');
    }
    validarSegundaFase_103('1');
}


function validarSegundaFase_103(orden) {
    setTimeout(function () {
        validarInputs(
            {
                form: '#fase2',
                orden: orden
            },
            function () {
                _validarValor_103('1');
            },
            _validarCodContable_103
        )
    }, 100);
}

function _validarCodContable_103() {
    var cuentaContable = $('#contabSobretasa_103').val();
    var validacion = buscarCuentaContable_103(cuentaContable);
    if (validacion != false) {
        $('#contabDescrip_103').val(validacion.DESCRIP.trim());
        _validarValorImpto('1');
    } else {
        plantillaError('99', '01', '-', function () {
            _validarValor_103('1');
        });
    }
}

function _validarValorImpto(orden) {
    setTimeout(function () {
        validarInputs(
            {
                form: '#faseValidarValor_impto',
                orden: orden
            },
            function () {
                validarSegundaFase_103('1');
            },
            _validacionValorImpto_103
        )
    }, 100);
}

function _validacionValorImpto_103() {
    var vlrImpuesto = valorGlobalMask.unmaskedValue ? valorGlobalMask.unmaskedValue : 0;
    if (vlrImpuesto == 0) {
        $('#contabGlobal_103').val('');
        $('#contabDescripGlobal_103').val('');
    } else {
        var codContab = $('#contabGlobal_103').val();
        if (codContab.length < 1)
            $('#contabGlobal_103').val('28150500020');
    }
    validarTerceraFase_103('1');
}

function validarTerceraFase_103(orden) {
    setTimeout(function () {
        validarInputs(
            {
                form: '#fase3',
                orden: orden
            },
            function () {
                _validarValorImpto('1');
            },
            _validarCodContableGlobal_103
        )
    }, 100);
}

function _validarCodContableGlobal_103() {
    var cuentaContable = $('#contabGlobal_103').val();
    if (cuentaContable.length > 0) {
        var validacion = buscarCuentaContable_103(cuentaContable);
        if (validacion != false) {
            $('#contabDescripGlobal_103').val(validacion.DESCRIP.trim());
            validacionFinal_103()
        } else {
            plantillaError('99', '01', '-', function () {
                validarTerceraFase_103('1');
            });
        }
    } else {
        validacionFinal_103()
    }
}

function validacionFinal_103() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            guardarModificar_103();
        } else {
            validarTerceraFase_103('1');
        }
    }, {})
}

function guardarModificar_103() {
    var sesion = localStorage.Sesion;
    var novedad = $_NOVEDAD_103;
    var datosForm = bajarDatos_103();
    var operador = localStorage.User;

    var datos_envio = datosEnvio();
    datos_envio += novedad;
    datos_envio += '|';
    datos_envio += datosForm;
    datos_envio += '|';
    datos_envio += operador;
    datos_envio += '|';
    SolicitarDll({ datosh: datos_envio }, on_guardarModificar_103, get_url("app/bombas/BOM103.DLL"));
}

function on_guardarModificar_103(data) {
    console.debug(data);
    var temp = data.split('|')
    if (data.trim() === '00') {
        if ($_NOVEDAD_103 === '7') {
            jAlert({ titulo: 'Notificacion', mensaje: "Creado correctamente" }, function () {
                modificar_103('1');
            });
        } else {
            jAlert({ titulo: 'Notificacion', mensaje: "Modificado correctamente" }, function () {
                modificar_103('1');
            });
        }
    } else {
        plantillaError(temp[0], temp[1], temp[2], function () {
            validarTerceraFase_103('1')
        });
    }

}

function bajarDatos_103() {
    var grpProducto = $('#producto2_103').val();
    var codProducto = $('#producto_103').val();

    var vlrSobretasa = valorSobretasaMask.unmaskedValue ? valorSobretasaMask.unmaskedValue : 0;
    vlrSobretasa = parseFloat(vlrSobretasa).toFixed(2).replace(/\./g, '');
    var ctaSobretasa = $('#contabSobretasa_103').val();

    var vlrImpuesto = valorGlobalMask.unmaskedValue ? valorGlobalMask.unmaskedValue : 0;
    vlrImpuesto = parseFloat(vlrImpuesto).toFixed(2).replace(/\./g, '');
    var ctaImpuesto = $('#contabGlobal_103').val();

    var datos = ''
    datos += cerosIzq(grpProducto, 2);
    datos += '|'
    datos += espaciosDer(codProducto, 16);
    datos += '|'
    datos += cerosIzq(vlrSobretasa, 14);
    datos += '|'
    datos += espaciosIzq(ctaSobretasa, 11);
    datos += '|'
    datos += cerosIzq(vlrImpuesto, 14);
    datos += '|'
    datos += espaciosIzq(ctaImpuesto, 11);

    return datos;
}

function buscarCuentaContable_103(codigo) {
    var retornar = false;
    for (var i in $_CUENTAS_103) {
        if ($_CUENTAS_103[i].CTA.trim().toLowerCase() == codigo.trim().toLowerCase()) {
            retornar = $_CUENTAS_103[i];
            break;
        }
    }

    return retornar;
}

// function buscarSobretasa(codigo) {
//     var retornar = false;
//     for (var i in $_TASAS_103) {
//         if ($_TASAS_103[i].COD.trim().toLowerCase() == codigo.trim().toLowerCase()) {
//             retornar = $_TASAS_103[i];
//             break;
//         }
//     }

//     return retornar;
// }

function buscarProducto_103(codigo) {
    var retornar = false;
    for (var i in $_ARTICULOS_103) {
        let code = $_ARTICULOS_103[i].GRP.trim().toLowerCase() + $_ARTICULOS_103[i].NUMERO.trim().toLowerCase();
        if (code.trim() == codigo.toLowerCase()) {
            retornar = $_ARTICULOS_103[i];
            break;
        }
    }

    return retornar;
}