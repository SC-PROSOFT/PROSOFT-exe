var $_TERCEROS_421,
    $_PLACAS_421,
    $_VENDEDORES_421,
    $_DATOS_TABLA_421 = [],
    $_TOTALES_421,
    $_GRUPOS_421,
    $_ARTICULOS_421,
    $_ALMACENES_421,
    $_SALDOS_421,
    $_BASE_ICA_421 = 0,
    $_VALOR_BASE_IVA = {
        VALOR_BASE_IVA1: 0,
        VALOR_BASE_IVA2: 0,
        VALOR_BASE_IVA3: 0,
    },
    $_VALOR_IVA = {
        VALOR_IVA1: 0,
        VALOR_IVA2: 0,
        VALOR_IVA3: 0,
    },
    $_IVA_USU = {
        IVA_USU_1: parseFloat($datosUsuar[12]) || 0,
        IVA_USU_2: parseFloat($datosUsuar[13]) || 0,
        IVA_USU_3: parseFloat($datosUsuar[14]) || 0
    },
    $_MODO_GRABAR = '';

var cantidadItemMask = new IMask(
    document.getElementById('cantidadItem'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var totalItemMask = new IMask(
    document.getElementById('totalitem'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var subtotalMask = new IMask(
    document.getElementById('subTotal_421'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var descuentosMask = new IMask(
    document.getElementById('descuentos_421'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var retefuenteMask = new IMask(
    document.getElementById('retefuente_421'),
    {
        mask: 'PP{%}',
        blocks: {
            PP: {
                mask: Number,
                min: 0,
                max: 9.9,
                scale: 1,
                radix: '.'
            }
        },
        lazy: false,
        placeholderChar: ' '
    }
);

var valorRetefuenteMask = new IMask(
    document.getElementById('valor_retefuente_421'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var ivatotalMask = new IMask(
    document.getElementById('ivaTotal_421'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var totalfacturaMask = new IMask(
    document.getElementById('totalFactura_421'),
    { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');

    _crearJsonTerceros_421()
    _toggleF8([
        { input: 'placa', app: '421', funct: _ventanaPlacas },
        { input: 'vendedor', app: '421', funct: _ventanaVendedores },
        { input: 'nitCliente', app: '421', funct: _ventanaTerceros },
        { input: 'grupoArticulo', app: '421', funct: _ventanaGrupos },
        { input: 'articulo', app: '421', funct: _ventanaArticulos },
        { input: 'almacen', app: '421', funct: _ventanaAlmacenes },
    ]);
});

$('#itemTabla_421').unbind();
$('#itemTabla_421').bind('keydown', function (e) {
    if (e.which == 114 || e.which == 112) {
        if (e.which == 114) $_MODO_GRABAR = 'F3';
        else if (e.which == 112) $_MODO_GRABAR = 'F1';

        $(this).attr('disabled', 'true');
        _validarDescuento_421();
        set_Event_validar('#validarItemTabla_421', 'off');
    } else if (e.which == 116) {
        initDatos_421()
        validarPlacas_421('1')
        $(this).attr('disabled', 'true');
        set_Event_validar('#validarItemTabla_421', 'off');
    }
})

function _ventanaPlacas(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda placas',
            columnas: ["PLACA", "NOMBRE", "VEND"],
            data: $_PLACAS_421,
            callback_esc: function () {
                $('#placa_421').focus();
            },
            callback: function (data) {
                $('#placa_421').val(data.PLACA.trim());
                _enterInput('#placa_421');
            }
        });
    }
}

function _ventanaVendedores(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda vendedores',
            columnas: ["COD", "NIT", "NOMBRE"],
            data: $_VENDEDORES_421,
            callback_esc: function () {
                $('#vendedor_421').focus();
            },
            callback: function (data) {
                $('#vendedor_421').val(data.COD.trim());
                _enterInput('#vendedor_421');
            }
        });
    }
}

function _ventanaGrupos(e) {
    if (e.which == 114 || e.which == 112) {
        if (e.which == 114) $_MODO_GRABAR = 'F3';
        else if (e.which == 112) $_MODO_GRABAR = 'F1';

        $(this).attr('disabled', 'true');
        _validarDescuento_421();
        set_Event_validar('#validarGrupo_421', 'off');
    } else if (e.which == 116) {
        initDatos_421()
        validarPlacas_421('1')
        $(this).attr('disabled', 'true');
        set_Event_validar('#validarGrupo_421', 'off');
    } else if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de grupos',
            columnas: ["GRUPO", "DESCRIP"],
            data: $_GRUPOS_421,
            callback_esc: function () {
                $('#grupoArticulo_421').focus();
            },
            callback: function (data) {
                $('#grupoArticulo_421').val(data.GRUPO.substring(1).trim());
                _enterInput('#grupoArticulo_421');
            }
        });
    }
}

function _ventanaArticulos(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var grupo = $('#grupoArticulo_421').val().trim();
        const articulosFiltrados = $_ARTICULOS_421.filter(el => el.GRP.trim() == grupo)

        _ventanaDatos({
            titulo: 'Busqueda de articulos',
            columnas: ["GRP", "NUMERO", "CLASE", "DESCRIP", "UNID", "VR-VENT1"],
            data: articulosFiltrados,
            callback_esc: function () {
                $('#articulo_421').focus();
            },
            callback: function (data) {
                $('#articulo_421').val(data.NUMERO + data.CLASE);
                _enterInput('#articulo_421');
            }
        });
    }
}

function _ventanaAlmacenes(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de almacenes',
            columnas: ["COD", "DESCRIP"],
            data: $_ALMACENES_421,
            callback_esc: function () {
                $('#almacen_421').focus();
            },
            callback: function (data) {
                $('#almacen_421').val(data.COD.trim());
                _enterInput('#almacen_421');
            }
        });
    }
}

function _ventanaTerceros(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite({
            titulo: 'Busqueda terceros',
            data: $_TERCEROS_421,
            indice: ['COD', 'NOMBRE'],
            mascara: [
                {
                    COD: 'Identificacion',
                    NOMBRE: 'Nombre',
                    TELEF: 'Telefono',
                    CIUDAD: 'Ciudad',
                    ACT: 'Actividad',
                }
            ],
            minLength: 1,
            callback_esc: function () {
                $('#nitCliente_421').focus();
            },
            callback: function (data) {
                $('#nitCliente_421').val(data.COD.trim());
                _enterInput('#nitCliente_421');
            }
        });
    }
}

function _crearJsonTerceros_421() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonTerceros_421, get_url("app/CON802.DLL"));
}

function on_crearJsonTerceros_421(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-ARCHTER-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_TERCEROS_421 = data.TERCEROS;
                $_TERCEROS_421.pop();
                _crearJsonVendedores_421();
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function _crearJsonVendedores_421() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonVendedores_421, get_url("app/CON805.DLL"));
}

function on_crearJsonVendedores_421(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-ARCHVEN-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_VENDEDORES_421 = data.VENDEDORES;
                $_VENDEDORES_421.pop();
                _crearJsonArticulos_421()
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function _crearJsonArticulos_421() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonArticulos_421, get_url("app/INV803.DLL"));
}

function on_crearJsonArticulos_421(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-MAESART-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_ARTICULOS_421 = data.Articulos;
                $_ARTICULOS_421.pop();
                _crearJsonAlmacenes_421()
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function _crearJsonAlmacenes_421() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonAlmacenes_421, get_url("app/INV801.DLL"));
}

function on_crearJsonAlmacenes_421(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-ARCHLOC-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_ALMACENES_421 = data.LOCAL;
                $_ALMACENES_421.pop();
                crearJsonPlacas_421()
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function crearJsonPlacas_421() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonPlacas_421, get_url("app/PLA805.DLL"));
}

function on_crearJsonPlacas_421(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-ARCHPLA-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_PLACAS_421 = data.PLACAS;
                $_PLACAS_421.pop();
                var arrayEliminar = [];
                arrayEliminar.push('SC-ARCHTER-' + localStorage.Sesion)
                arrayEliminar.push('SC-ARCHPLA-' + localStorage.Sesion)
                arrayEliminar.push('SC-ARCHVEN-' + localStorage.Sesion)
                arrayEliminar.push('SC-MAESART-' + localStorage.Sesion)
                arrayEliminar.push('SC-ARCHLOC-' + localStorage.Sesion)
                _eliminarJson(arrayEliminar, on_eliminarJson_421);
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function on_eliminarJson_421(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        loader('hide');

        // Init fecha
        var d = new Date(),
            año = d.getFullYear(),
            mes = d.getMonth() + 1,
            dia = d.getDate();

        $('#añoInicial').val(año)
        $('#mesInicial').val(mes)
        $('#diaInicial').val(dia)

        validarPlacas_421()
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function validarPlacas_421(orden) {
    validarInputs(
        {
            form: '#formPlaca',
            orden: orden
        },
        function () {
            _toggleNav()
        },
        on_validarPlacas_421
    )
}

function on_validarPlacas_421() {
    loader('show');
    var placa = $('#placa_421').val().toUpperCase();
    SolicitarDll({ datosh: datosEnvio() + placa }, on_datosTabla_421, get_url("app/INV421.DLL"));

    // var busqueda = buscarPlaca_421(placa);

    // if (busqueda) {
    //     $('#nitCliente_421').val(busqueda["COD-TER"])
    //     $('#nombreCliente_421').val(busqueda.NOMBRE)
    //     $('#vendedor_421').val(busqueda.VEND)
    //     _crearJsonGrupos_421()
    // } else {
    //     plantillaToast('99', '01', null, 'warning');
    //     validarPlacas_421('01')
    // }
}

function validarCliente_421(orden) {
    validarInputs(
        {
            form: '#formCliente',
            orden: orden
        },
        function () {
            // Limpiar datos
            initDatos_421();
            validarPlacas_421('1')
        },
        on_validarCliente_421
    )
}

function on_validarCliente_421() {
    var tercero = $('#nitCliente_421').val().trim(),
        busqueda = buscarTerceros_421(tercero);

    if (busqueda) {
        if (
            parseFloat(tercero) > 1000 &&
            (busqueda.DIRREC.trim().length < 1 || busqueda.TELEF.trim().length < 1)
        ) {
            abrirTerceroPower()
        } else {
            validarVendedor_421('1');
        }

        $('#nombreCliente_421').val(busqueda.NOMBRE)
    } else {
        plantillaToast('99', '01', null, 'warning');
        validarCliente_421('01')
    }
}

function validarVendedor_421(orden) {
    validarInputs(
        {
            form: '#formVendedor',
            orden: orden
        },
        function () { validarCliente_421('1') },
        on_validarVendedor_421
    )
}

function on_validarVendedor_421() {
    var vendedor = $('#vendedor_421').val().trim().toUpperCase(),
        busqueda = buscarVendedor_421(vendedor);

    if (busqueda) {
        $('#nombreVendedor').val(busqueda.NOMBRE)
        var siguienteItem = $('#tablaFacturas tbody tr').length + 1;
        $('#itemTabla_421').val(siguienteItem)
        validarItem_421('1')
    } else {
        plantillaToast('99', '01', null, 'warning');
        validarVendedor_421('01')
    }
}

// function datosTabla_421() {
//     var placa = $('#placa_421').val()
//     SolicitarDll({ datosh: datosEnvio() + placa }, on_datosTabla_421, get_url("app/INV421.DLL"));
// }

function on_datosTabla_421(totales) {
    var res = totales.split('|');
    console.log(res)
    if (res[0].trim() == '00') {
        var placa = $('#placa_421').val().toUpperCase(),
            busqueda = buscarPlaca_421(placa);

        if (busqueda) {
            $('#nitCliente_421').val(busqueda["COD-TER"])
            $('#nombreCliente_421').val(busqueda.NOMBRE)
            $('#vendedor_421').val(busqueda.VEND)
        }

        if (res[9] == '0') {
            var rutaJson = get_url('progdatos/json/SC-TABLIVA-' + localStorage.Sesion + '.JSON');
            SolicitarDatos(
                null,
                function (data) {
                    $_DATOS_TABLA_421 = data["TABLA-IVA"];
                    $_DATOS_TABLA_421.pop();
                    $_TOTALES_421 = res;
                    _crearJsonGrupos_421()
                },
                rutaJson
            );
        } else {
            _crearJsonGrupos_421()
        }

    } else {
        loader('hide');
        plantillaError(res[0], 'No existe la placa', res[2], function () {
            validarPlacas_421('1')
        });
    }
}

function _crearJsonGrupos_421() {
    var placa = $('#placa_421').val()
    SolicitarDll({ datosh: datosEnvio() + placa }, on_crearJsonGrupos_421, get_url("app/inv804.DLL"));
}

function on_crearJsonGrupos_421(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-ARCHGRP-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_GRUPOS_421 = data.GRUPOS;
                var arrayEliminar = [];
                // arrayEliminar.push('SC-TABLIVA-' + localStorage.Sesion)
                arrayEliminar.push('SC-ARCHGRP-' + localStorage.Sesion)
                _eliminarJson(arrayEliminar, on_eliminarJson_421_2);
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], function () {
            validarPlacas_421('1')
        });
    }
}

function on_eliminarJson_421_2(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        if (llenarTabla_421()) {
            var nitTercero = $('#nitCliente_421').val().trim(),
                busquedaTercero = buscarTerceros_421(nitTercero);

            if (busquedaTercero) {
                if (
                    parseFloat(nitTercero) > 1000 &&
                    (busquedaTercero.DIRREC.trim().length < 1 || busquedaTercero.TELEF.trim().length < 1)
                ) {
                    // abrirTerceroPower()
                    validarVendedor_421('1');
                } else {
                    validarVendedor_421('1');
                }
            } else {
                var busquedaTercero = buscarTerceros_421(cerosIzq('1', 10));
                $('#nitCliente_421').val(busquedaTercero.COD.trim())
                $('#nombreCliente_421').val(busquedaTercero.NOMBRE.trim())
                validarVendedor_421('1');
            }
        }
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, function () {
            validarPlacas_421('1')
        });
    }
}

function validarItem_421(orden) {
    validarInputs(
        {
            form: '#validarItemTabla_421',
            orden: orden
        },
        function () { validarVendedor_421('01') },
        on_validarItem_421
    )
}

function on_validarItem_421() {
    var item = parseInt($('#itemTabla_421').val().trim()),
        itemsTabla = $('#tablaFacturas tbody tr').length + 1,
        busqueda = false;

    if ($_DATOS_TABLA_421) busqueda = $_DATOS_TABLA_421.find(el => el.itemTabla == item)

    if (busqueda == false) {
        validarGrupo_421()
    } else if (typeof busqueda !== 'undefined' || item > itemsTabla) {
        validarItem_421('1')
        $('#itemTabla_421').val(itemsTabla)
    } else {
        validarGrupo_421()
    }
}

function validarGrupo_421() {
    validarInputs(
        {
            form: '#validarGrupo_421',
            orden: '1'
        },
        function () { validarItem_421('01') },
        on_validarGrupo_421
    )
}

function on_validarGrupo_421() {
    var grupo = $('#grupoArticulo_421').val(),
        busqueda = buscarGrupo_421(grupo);

    if (busqueda) {
        $('#descripcionArticulo_421').val(busqueda.DESCRIP)
        validarArticulo_421()
    } else {
        plantillaToast('99', '01', null, 'warning');
        validarGrupo_421()
    }
}

function validarArticulo_421() {
    validarInputs(
        {
            form: '#validarArticulo_421',
            orden: '1'
        },
        function () { validarGrupo_421() },
        on_validarArticulo_421
    )
}

function on_validarArticulo_421() {
    var grupo = $('#grupoArticulo_421').val(),
        articulo = $('#articulo_421').val(),
        busqueda = buscarArticulo_421(grupo + articulo);

    if (busqueda) {
        console.log(busqueda)
        $('#descripcionArticulo_421').val(busqueda.DESCRIP)
        totalItemMask.unmaskedValue = busqueda.VALOR.replace(/\,/g, '').trim();
        validarAlmacen_421()
    } else {
        plantillaToast('99', '01', null, 'warning');
        validarArticulo_421()
    }
}

function validarAlmacen_421() {
    validarInputs(
        {
            form: '#validarAlmacen_421',
            orden: '1'
        },
        validarArticulo_421,
        on_validarAlmacen_421
    )
}

function on_validarAlmacen_421() {
    var almacen = $('#almacen_421').val().trim().toUpperCase(),
        busqueda = buscarAlmacenes_421(almacen);

    if (busqueda) {
        $('#almacen_421').val(busqueda.COD)
        crearJsonSaldos_421();
        // validarCantidad_421()
    } else {
        plantillaToast('99', '01', null, 'warning');
        validarAlmacen_421()
    }
}

function crearJsonSaldos_421() {
    var almacen = $('#almacen_421').val(),
        grupo = "0" + $('#grupoArticulo_421').val(),
        codArticulo = $('#articulo_421').val(),
        articulo = grupo + codArticulo;

    SolicitarDll({ datosh: datosEnvio() + almacen + articulo }, on_crearJsonSaldos_421, get_url("app/INV808.DLL"));
}

function on_crearJsonSaldos_421(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-SDOACT-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_SALDOS_421 = data.SALDOS;
                var arrayEliminar = [];
                arrayEliminar.push('SC-SDOACT-' + localStorage.Sesion)
                _eliminarJson(arrayEliminar, on_eliminarJson_421_3);
            },
            rutaJson
        );
    } else {
        plantillaError(res[0], res[1], res[2], validarAlmacen_421);
    }
}

function on_eliminarJson_421_3(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        ventana_INV808($_SALDOS_421);
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, validarAlmacen_421);
    }
}

function validarCantidad_421() {
    validarInputs(
        {
            form: '#validarCantidad_421',
            orden: '1'
        },
        validarAlmacen_421,
        function () {
            var cantidad = parseFloat(cantidadItemMask.unmaskedValue) || 0;
            if (cantidad < 1) {
                cantidadItemMask.unmaskedValue = '1'
                validarCantidad_421()
            } else {
                validarTotal_421();
            }
        }
    )
}

function validarTotal_421() {
    validarInputs(
        {
            form: '#validarTotal_421',
            orden: '1'
        },
        validarAlmacen_421,
        function () {
            var itemTabla = parseInt($('#itemTabla_421').val()),
                grupoArticulo = $('#grupoArticulo_421').val(),
                codArticulo = $('#articulo_421').val(),
                COD = "0" + grupoArticulo + codArticulo,
                DESCRIP = $('#descripcionArticulo_421').val(),
                ALM = $('#almacen_421').val(),
                CANTIDAD = parseFloat(cantidadItemMask.unmaskedValue) || 0,
                valorInd = parseFloat(totalItemMask.unmaskedValue) || 0,
                subTotal = parseFloat(CANTIDAD) * parseFloat(valorInd),
                VALOR = subTotal.toString(),
                datosArticulo = buscarArticulo_421(grupoArticulo + codArticulo);


            $_DATOS_TABLA_421.push({
                itemTabla,
                COD,
                DESCRIP,
                ALM,
                CANTIDAD,
                VALOR,
                VLR_ART_W: valorInd
            })

            if (llenarTabla_421()) {
                limpiarItem();
                var siguienteItem = $('#tablaFacturas tbody tr').length + 1;
                $('#itemTabla_421').val(siguienteItem);
                validarItem_421('1')
            }
        }
    )
}

function _validarDescuento_421() {
    validarInputs(
        {
            form: '#validarDescuento_421',
            orden: '1'
        },
        function () { validarItem_421('1') },
        function () {
            var valor_des_pla = parseFloat(descuentosMask.unmaskedValue) || 0,
                valor_bruto = parseFloat(subtotalMask.unmaskedValue) || 0,
                factor_descto = 0;

            if (valor_des_pla > valor_bruto) {
                descuentosMask.unmaskedValue = ''
                _validarDescuento_421()
            } else {
                var $_VALOR_BASE_IVA_tmp = { VALOR_BASE_IVA1: 0, VALOR_BASE_IVA2: 0, VALOR_BASE_IVA3: 0 },
                    $_VALOR_IVA_tmp = { VALOR_IVA1: 0, VALOR_IVA2: 0, VALOR_IVA3: 0 },
                    totalIva = valorTotal = 0,
                    valor_bruto = parseFloat(subtotalMask.unmaskedValue) || 0;

                if (valor_des_pla > 0) {
                    factor_descto = 1 - (parseFloat(valor_des_pla) / parseFloat(valor_bruto))
                } else {
                    factor_descto = 1;
                }

                for (let i = 1; i < 4; i++) {
                    $_VALOR_BASE_IVA_tmp[`VALOR_BASE_IVA${i}`] = $_VALOR_BASE_IVA[`VALOR_BASE_IVA${i}`] * factor_descto;
                    $_VALOR_IVA_tmp[`VALOR_IVA${i}`] = $_VALOR_BASE_IVA_tmp[`VALOR_BASE_IVA${i}`] * $_IVA_USU[`IVA_USU_${i}`] / 100;
                }


                totalIva = parseFloat($_VALOR_IVA_tmp[`VALOR_IVA1`])
                    + parseFloat($_VALOR_IVA_tmp[`VALOR_IVA2`])
                    + parseFloat($_VALOR_IVA_tmp[`VALOR_IVA3`]);

                valorTotal = parseFloat(valor_bruto) - parseFloat(valor_des_pla) + parseFloat(totalIva)
                ivatotalMask.unmaskedValue = totalIva.toString();
                totalfacturaMask.unmaskedValue = valorTotal.toString();

                validarRetefuente_421();
            }
        }
    )
}


function validarRetefuente_421() {
    validarInputs(
        {
            form: '#validarRtefuente',
            orden: '1'
        },
        function () {
            descuentosMask.unmaskedValue = '';
            retefuenteMask.unmaskedValue = '';
            valorRetefuenteMask.unmaskedValue = '';
            if (llenarTabla_421()) _validarDescuento_421();
        },
        function () {
            var temp = retefuenteMask.unmaskedValue ? retefuenteMask.unmaskedValue.slice(0, -1) : '0',
                porcent_ret = parseFloat(temp) || 0,
                valor_ret = 0,
                valor_total = parseFloat(totalfacturaMask.unmaskedValue) || 0,
                valor_iva = parseFloat(ivatotalMask.unmaskedValue) || 0;

            if (porcent_ret == 8) {
                retefuenteMask.unmaskedValue = '';
                validarValorRetfuente_421();
            } else {
                valor_ret = (valor_total - valor_iva) * porcent_ret / 100
                calcularRetencion(parseFloat(valor_ret));
            }

        }
    )
}

function validarValorRetfuente_421() {
    validarInputs(
        {
            form: '#validarValorRtefuente',
            orden: '1'
        },
        function () {
            descuentosMask.unmaskedValue = '';
            retefuenteMask.unmaskedValue = '';
            valorRetefuenteMask.unmaskedValue = '';
            if (llenarTabla_421()) _validarDescuento_421();
        },
        function () {
            var valorRetencion = parseFloat(valorRetefuenteMask.unmaskedValue) || 0;
            calcularRetencion(valorRetencion);
        }
    )
}

function calcularRetencion(valorRetencion) {
    var temp = 0,
        valor_iva = parseFloat(ivatotalMask.unmaskedValue) || 0,
        valor_bruto = parseFloat(subtotalMask.unmaskedValue) || 0,
        valor_des = parseFloat(descuentosMask.unmaskedValue) || 0;

    temp = valor_bruto - valor_des + valor_iva - valorRetencion;
    totalfacturaMask.unmaskedValue = temp.toString();
    valorRetefuenteMask.unmaskedValue = valorRetencion.toString();
    validarFormaPago();
}

function validarFormaPago() {
    validarInputs(
        {
            form: '#validarFormapago_421',
            orden: '1'
        },
        function () {
            descuentosMask.unmaskedValue = '';
            retefuenteMask.unmaskedValue = '';
            valorRetefuenteMask.unmaskedValue = '';
            if (llenarTabla_421()) _validarDescuento_421();
        },
        function () {
            var formaPago = $('#formapago_421').val().trim();

            if (formaPago == '2' || formaPago == '3') {
                validarDiasPago();
            } else {
                let año = $('#añoInicial').val(),
                    mes = cerosIzq($('#mesInicial').val(), 2),
                    dia = cerosIzq($('#diaInicial').val(), 2);

                $('#fechaVencimiento').val(año + mes + dia);
                validarDetallePago();
            }
        }
    )
}

function validarDiasPago() {
    validarInputs(
        {
            form: '#validarDias_421',
            orden: '1'
        },
        function () {
            $('#diasPago_421,#fechaVencimiento').val('');
            validarFormaPago()
        },
        function () {
            var diasPago = parseFloat($('#diasPago_421').val().trim()) || 0;
            console.log(diasPago)

            if (diasPago < 1 || diasPago > 200) validarDiasPago()
            else {
                // Calcular fecha
                var fechaVence = datoFechaVence(diasPago);
                $('#fechaVencimiento').val(fechaVence);
                validarDetallePago();
            }
        }
    )
}

function validarDetallePago() {
    validarInputs(
        {
            form: '#validarDetalle_421',
            orden: '1'
        },
        function () {
            $('#diasPago_421,#fechaVencimiento').val('');
            validarFormaPago()
        },
        validacionFinal
    )
}

function validacionFinal() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            _escribirTemp_421();
        } else {
            setTimeout(validarDetallePago, 200)
        }
    }, {}
    )
}

function _escribirTemp_421() {
    if ($_DATOS_TABLA_421.length < 1) $_DATOS_TABLA_421 = false;
    else {
        $_DATOS_TABLA_421.map(e => {
            var cantidadEdit = parseFloat(e.CANTIDAD) || 0,
                cantidadEdit = cantidadEdit.toFixed(2).replace(/\./g, ''),
                valorEdit = parseFloat(e.VALOR.replace(/\,/g, '')) || 0,
                valorEdit = valorEdit.toFixed(2).replace(/\./g, '');

            e.CANTIDAD = cerosIzq(cantidadEdit, 14);
            e.VALOR = cerosIzq(valorEdit, 14);
        })
    }

    var datosEnvio = {
        sesion: localStorage.Sesion,
        tabla_articulos: $_DATOS_TABLA_421
    }

    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('paginas/inc/_datos_421.php')
    }).done(function (data) {
        var res = data.split('|');
        if (res[0].trim() == '00') {
            _bajarDatos_421();
        } else {
            console.error(data);
            plantillaError(res[0], res[1], res[2]);
        }
    });
}

function _bajarDatos_421() {
    let año = $('#añoInicial').val(),
        mes = cerosIzq($('#mesInicial').val(), 2),
        dia = cerosIzq($('#diaInicial').val(), 2),
        placa = $('#placa_421').val(),
        tercero = cerosIzq($('#nitCliente_421').val(), 10),
        vendedor = cerosIzq($('#vendedor_421').val(), 5),
        valorDescuento = parseFloat(descuentosMask.unmaskedValue) || 0,
        valorIva = parseFloat(ivatotalMask.unmaskedValue) || 0,
        valorRetencion = parseFloat(valorRetefuenteMask.unmaskedValue) || 0,
        formaPago = $('#formapago_421').val(),
        detalle = $('#detalle_421').val().trim(),
        vl1_iva_1 = parseFloat($_VALOR_IVA.VALOR_IVA1) || 0,
        vl1_iva_2 = parseFloat($_VALOR_IVA.VALOR_IVA2) || 0,
        vl1_iva_3 = parseFloat($_VALOR_IVA.VALOR_IVA3) || 0,
        item = $('#tablaFacturas tbody tr').length,
        fechaVencimiento = $('#fechaVencimiento').val();

    valorDescuento = valorDescuento.toFixed(2).replace(/\./g, '');
    valorIva = valorIva.toFixed(2).replace(/\./g, '');
    valorRetencion = valorRetencion.toFixed(2).replace(/\./g, '');

    vl1_iva_1 = vl1_iva_1.toFixed(2).replace(/\./g, '')
    vl1_iva_2 = vl1_iva_2.toFixed(2).replace(/\./g, '')
    vl1_iva_3 = vl1_iva_3.toFixed(2).replace(/\./g, '')
    $_BASE_ICA_421 = parseFloat($_BASE_ICA_421).toFixed(0).replace(/\./g, '');

    var tipo_guardado = '';
    if ($_MODO_GRABAR == 'F1') tipo_guardado = 'S';
    else tipo_guardado = 'N';

    var datos_envio = datosEnvio()
        + localStorage.User
        + '|' + año + mes + dia
        + '|' + placa
        + '|' + tercero
        + '|' + vendedor
        + '|' + cerosIzq(valorDescuento, 14)
        + '|' + cerosIzq(valorIva, 14)
        + '|' + cerosIzq(valorRetencion, 14)
        + '|' + cerosIzq(formaPago, 2)
        + '|' + espaciosDer(detalle, 95)
        + '|' + cerosIzq(item, 2)
        + '|' + cerosIzq($_BASE_ICA_421, 12)
        + '|' + cerosIzq(vl1_iva_1, 14)
        + '|' + cerosIzq(vl1_iva_2, 14)
        + '|' + cerosIzq(vl1_iva_3, 14)
        + '|' + cerosIzq(item, 2)
        + '|' + fechaVencimiento
        + '|' + tipo_guardado
        + '|';

    console.log(datos_envio)
    SolicitarDll({ datosh: datos_envio }, on_bajarDatos_421, get_url("app/INV421_R.DLL"));
}

function on_bajarDatos_421(data) {
    console.log(data)
    var res = data.split('|');
    if (res[0].trim() == '00') {
        jAlert({ titulo: 'Correcto ', mensaje: `Factura <b>${res[1]}</b> creada correctamente` }, function () {
            initDatos_421()
            setTimeout(function () {
                $('#placa_421').focus();
            }, 500)
        });
    } else {
        console.error(data);
        plantillaError(res[0], res[1], res[2], validarDetallePago);
    }
}

function llenarTabla_421() {
    var cantidadMask = IMask.createMask({ mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }),
        valorMask = IMask.createMask({ mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }),
        subTotal = totalIva = totalFactura = 0,
        id = $_BASE_ICA_421 = 0;


    $_VALOR_BASE_IVA = { VALOR_BASE_IVA1: 0, VALOR_BASE_IVA2: 0, VALOR_BASE_IVA3: 0 };
    $_VALOR_IVA = { VALOR_IVA1: 0, VALOR_IVA2: 0, VALOR_IVA3: 0 };

    $('#tablaFacturas tbody').html('')

    if ($_DATOS_TABLA_421) {
        $_DATOS_TABLA_421.map((el, idx) => {
            var datosArticulo = buscarArticulo_421(el.COD.substring(1)),
                ASUME_IVA_USU = $datosUsuar[15].trim();

            if (datosArticulo) {
                var iva = parseFloat(datosArticulo["VLR-IVA"]) || 0,
                    IVA_ART_W = parseInt(datosArticulo["ITEM-IVA"]) || 0,
                    ivaPorcentaje = parseFloat(iva) / 100,
                    valorIva = (parseFloat(iva) + 100) / 100,
                    valor = parseFloat(el.VALOR.replace(/\,/g, '')) || 0,
                    valorNeto = parseFloat(valor) / valorIva,
                    valorIva = parseFloat(valorNeto) * parseFloat(ivaPorcentaje),
                    grp = datosArticulo.GRP,
                    autoret = parseFloat(datosArticulo.AUTORE) || 0,
                    VLR_ART_W = parseFloat(el.VLR_ART_W) || 0,
                    base_icav = 0;

                var cantidad = parseFloat(el.CANTIDAD) || "0",
                    valor = el.VALOR.replace(/\,/g, '');

                if (ASUME_IVA_USU != 'S') valorNeto = valor;

                id = id + 1;
                cantidadMask.resolve(cantidad.toString())
                valorMask.resolve(valor)

                if (IVA_ART_W == 1 || IVA_ART_W == 2 || IVA_ART_W == 3)
                    $_VALOR_BASE_IVA[`VALOR_BASE_IVA${IVA_ART_W}`] += parseFloat(valorNeto);


                $('#tablaFacturas tbody').append(''
                    + '<tr>'
                    + ` <td>${id}</td>`
                    + ` <td>${el.COD}</td>`
                    + ` <td>${el.DESCRIP}</td>`
                    + ` <td>${el.ALM}</td>`
                    + ` <td>${cantidadMask.value}</td>`
                    + ` <td>${valorMask.value}</td>`
                    + '</tr>'
                )

                el.itemTabla = id;
                subTotal = parseFloat(subTotal) + parseFloat(valorNeto);
                // totalIva = parseFloat(totalIva) + parseFloat(valorIva);

                if (grp == '01' && autoret > 0) base_icav = (VLR_ART_W * autoret) / 100
                else base_icav = 0

                if (valorNeto > 0) $_BASE_ICA_421 = parseFloat($_BASE_ICA_421) + base_icav;
            }

            return el;
        });


        for (let i = 1; i < 4; i++)
            $_VALOR_IVA[`VALOR_IVA${i}`] = $_VALOR_BASE_IVA[`VALOR_BASE_IVA${i}`] * $_IVA_USU[`IVA_USU_${i}`] / 100;

        totalIva = parseFloat($_VALOR_IVA[`VALOR_IVA1`])
            + parseFloat($_VALOR_IVA[`VALOR_IVA2`])
            + parseFloat($_VALOR_IVA[`VALOR_IVA3`]);

        totalFactura = subTotal + totalIva;
        subtotalMask.unmaskedValue = subTotal.toString();
        ivatotalMask.unmaskedValue = totalIva.toString();
        totalfacturaMask.unmaskedValue = totalFactura.toString();
    }

    return true;
}

function ventana_INV808(saldos) {
    var NIT_USU = parseFloat($datosUsuar[2].trim()),
        tabla_parent = $('<table />', { class: "table table-light table-atriped" }).css({ margin: '0' }),
        SALDO_TOTAL = 0,
        grupoArticulo = $('#grupoArticulo_421').val(),
        codArticulo = $('#articulo_421').val(),
        articulo = grupoArticulo + codArticulo,
        ALM = $('#almacen_421').val();

    saldos.forEach(datos => {
        let row_obj = $('<tr />'),
            SDO_ANT_CANT = parseFloat(datos["SDO-ANT-CANT"]) || 0,
            ACUM_ENT_CANT = parseFloat(datos["ACUM-ENT-CANT"]) || 0,
            ACUM_SAL_CANT = parseFloat(datos["ACUM-SAL-CANT"]) || 0,
            SDO_ACT_CANT = parseFloat(datos["SDO-ACT-CANT"]) || 0,
            VLR_UNIT = parseFloat(datos["VLR-UNIT"]) || 0,
            ASUME_IVA_USU = $datosUsuar[15].trim(),
            VLR_REF_ART = parseFloat(datos["VLR-REF-ART"]) || 0,
            COD_LOTE_SAL = datos["COD-LOTE-SAL"] || "",
            COD_ALM_SAL = datos["COD-ALM-SAL"] || "";


        if (NIT_USU == 822002983 || NIT_USU == 809012776 || NIT_USU == 19845216) {

        } else {
            row_obj.append($('<td />', { text: SDO_ANT_CANT }))
            row_obj.append($('<td />', { text: ACUM_ENT_CANT }))
            row_obj.append($('<td />', { text: ACUM_SAL_CANT }))
        }

        row_obj.append($('<td />', { text: SDO_ACT_CANT }))

        SALDO_TOTAL += SDO_ACT_CANT;

        if (
            (NIT_USU == 822002983 || NIT_USU == 809012776 || NIT_USU == 19845216 || NIT_USU == 800202522)
            || ((ASUME_IVA_USU == "S" || $datosUsuar[21] == '3') && NIT_USU != 40391944)
        ) {
            row_obj.append($('<td />', { text: `Vr. REF: ${VLR_REF_ART}` }))
        } else {
            row_obj.append($('<td />', { text: `C.unit: ${VLR_UNIT}` }))
        }

        row_obj.append($('<td />', { text: COD_LOTE_SAL }))
        row_obj.append($('<td />', { text: COD_ALM_SAL }))

        tabla_parent.append(row_obj)
    })

    var foot_obj = $('<tfoot />');
    foot_obj.append(''
        + '<tr>'
        + '   <td></td>'
        + '   <td></td>'
        + '   <td></td>'
        + '   <td></td>'
        + '   <td></td>'
        + '   <td>TOTAL ACUMULADO: </td>'
        + `   <td>${SALDO_TOTAL}</td>`
        + '</tr>'
    )

    tabla_parent.append(foot_obj)

    bootbox.dialog({
        title: `Consulta de saldo actual: <b>${articulo}</b> - ALM: <b>${ALM}</b>`,
        message: tabla_parent,
        closeButton: false,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue",
                callback: function () {
                    validarCantidad_421()
                }
            }
        }
    });
}

function datoFechaVence(dias_w) {
    var dias_temp = 0,
        año_vence_w = parseFloat($('#añoInicial').val()),
        mes_vence_w = parseFloat($('#mesInicial').val()),
        dia_vence_w = parseFloat($('#diaInicial').val());

    dia_vence_w = parseFloat(dia_vence_w) + parseFloat(dias_w)

    if (dia_vence_w > 30) {
        let dias_temp = parseFloat(dia_vence_w) / 30,
            ent_temp = Math.trunc(dias_temp);

        dia_vence_w = dia_vence_w - (ent_temp * 30);
        mes_vence_w = mes_vence_w + ent_temp;
        if (dia_vence_w == 0) dia_vence_w = 1;
    }

    if (mes_vence_w > 12) {
        let dias_temp = parseFloat(mes_vence_w) / 12,
            ent_temp = Math.trunc(dias_temp);

        mes_vence_w = mes_vence_w - (ent_temp * 12);
        año_vence_w = año_vence_w + ent_temp;
    }

    return año_vence_w.toString() + cerosIzq(mes_vence_w.toString(), 2) + cerosIzq(dia_vence_w.toString(), 2);
}

function limpiarItem() {
    $('#grupoArticulo_421,#articulo_421,#descripcionArticulo_421,#almacen_421').val('')
    cantidadItemMask.unmaskedValue = ''
    totalItemMask.unmaskedValue = ''
}

function buscarPlaca_421(placa) {
    var busqueda = $_PLACAS_421.find(el => el.PLACA == placa.trim())

    return typeof busqueda === 'undefined' ? false : busqueda;
}

function buscarVendedor_421(vendedor) {
    var busqueda = $_VENDEDORES_421.find(el => el.COD.trim() == vendedor.trim())

    return typeof busqueda === 'undefined' ? false : busqueda;
}

function buscarTerceros_421(tercero) {
    var busqueda = $_TERCEROS_421.find(el => el.COD.trim() == tercero.trim())

    return typeof busqueda === 'undefined' ? false : busqueda;
}

function buscarGrupo_421(grupo) {
    var busqueda = $_GRUPOS_421.find(el => el.GRUPO.substring(1).trim() == grupo.trim())

    return typeof busqueda === 'undefined' ? false : busqueda;
}

function buscarArticulo_421(articulo) {
    var busqueda = $_ARTICULOS_421.find(el => el.GRP.trim() + el.NUMERO + el.CLASE == articulo)

    return typeof busqueda === 'undefined' ? false : busqueda;
}

function buscarAlmacenes_421(almacen) {
    var busqueda = $_ALMACENES_421.find(el => el.COD.trim() == almacen.trim())

    return typeof busqueda === 'undefined' ? false : busqueda;
}

function initDatos_421() {
    $('#tablaFacturas tbody').html('')
    $('#itemTabla_421,#vendedor_421,#nombreVendedor,#formapago_421,#diasPago_421,#fechaVencimiento,#detalle_421').val('')
    limpiarItem()
    subtotalMask.unmaskedValue = "";
    ivatotalMask.unmaskedValue = "";
    totalfacturaMask.unmaskedValue = "";
    descuentosMask.unmaskedValue = "";
    retefuenteMask.unmaskedValue = "";
    valorRetefuenteMask.unmaskedValue = "";
    $_DATOS_TABLA_421;
    $_VALOR_BASE_IVA = {
        VALOR_BASE_IVA1: 0,
        VALOR_BASE_IVA2: 0,
        VALOR_BASE_IVA3: 0,
    };

    $_VALOR_IVA = {
        VALOR_IVA1: 0,
        VALOR_IVA2: 0,
        VALOR_IVA3: 0,
    };
}

function abrirTerceroPower() {
    var nombre_bat = "C:\\PROSOFT\\TEMP\\MENU-" + localStorage.Sesion.trim() + ".BAT",
        contab = sessionStorage.Contab,
        mes = evaluarMes_min(sessionStorage.CarpetaTrabajo),
        usuario = espaciosDer(localStorage.User, 4),
        clave = espaciosDer(localStorage.Clave, 8),
        formulario = "CON110C",
        dll = "CONTAB\\CON110C.dll",
        idOpcion = "0131",
        descripcionOpcion = "Actualizacion de terceros";

    var params = usuario
        + "-" + clave
        + "-" + formulario
        + "-" + dll
        + "-" + ' '
        + "-" + '  '
        + "-" + '  '
        + "-" + '8'
        + "-" + $('#nitCliente_421').val()
        + "-"

    console.log(params)
    var titulo = contab + "\\"
        + mes
        + "     "
        + idOpcion.substring(1, idOpcion.length).split('').join(',') + " "
        + descripcionOpcion
        + "     "
        + usuario;

    var batch = "ECHO OFF\r\n"
        + "P:\r\n"
        + "CD\\" + contab + "\\" + mes + "\r\n"
        + "START C:\\PWCOBOL\\MAIN.EXE " + params + titulo + "\r\n";

    fs.writeFile(nombre_bat, batch, function (err) {
        if (err) console.error('Error escribiendo bat: \n\n' + err);
        else {
            jAlert({
                mensaje: `<div style="text-align: center;">`
                    + `Debe cerrar el siguiente programa: <br>`
                    + `<b>${idOpcion.substring(1, idOpcion.length).split('').join('-')} - ${descripcionOpcion}</b>`
                    + `</div>`,
                titulo: 'Esperando power',
                autoclose: false,
                btnCancel: false,
                footer: false
            }, function () { });

            exe(nombre_bat, function (err, data) {
                if (err) console.error('Error ejecutando bat: \n\n' + err);
                else {
                    fs.unlink(nombre_bat, function (err) {
                        if (err) console.error('Error eliminando bat: \n\n' + err);
                        else {
                            validarVendedor_421('1');
                            jAlert_close();
                        }
                    });
                }
            });
        }
    });
}