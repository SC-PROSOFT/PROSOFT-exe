var $_SURTIDORES_104E,
    $_VALES_104E,
    $_INFO_COMP_104E,
    $_VALORES_TMP_104E,
    $_VENDEDORES_104E,
    $_CUENTAS_104E,
    $_TERCEROS_104E,
    $_ARTICULOS_104E,
    $_DATOS_TABLA_104E = [],
    $_DATOS_VALES_104E = [],
    $_DIALOGO,
    $_OP_PRINT = false,
    $_FORMATO_104e;

var numAnterior = new IMask(
    document.getElementById('numAnter'),
    { mask: Number, min: 0, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var numActual = new IMask(
    document.getElementById('numActual'),
    { mask: Number, min: 0, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var valorActualMask = new IMask(
    document.getElementById('valorActual'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var galonajeTotalMask = new IMask(
    document.getElementById('galonajeTotal'),
    { mask: Number, min: 0, max: 9999999999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

var valorTotalMask = new IMask(
    document.getElementById('valorTotal'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorValeMask = new IMask(
    document.getElementById('valorVale'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorCombustibleMask = new IMask(
    document.getElementById('totalCombustible'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorCreditosMask = new IMask(
    document.getElementById('totalCreditos'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorFinanciacionMask = new IMask(
    document.getElementById('totalFinanciacion'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorChequesMask = new IMask(
    document.getElementById('totalCheques'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorEfectivoMask = new IMask(
    document.getElementById('totalEfectivo'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    _crearJsonVendedores_104e();
    $('#formatoImpresion').select2().on('select2:select', validarFormato_104e);

    _toggleF8([
        { input: 'vendedor', app: '104e', funct: _ventanaVendedores }
    ]);
});

$(document).on('keydown', '#itemVales', function (e) {
    if (e.which == 114) {
        $(this).attr('disabled', 'true');
        _validarFinanciacion_104e();
        set_Event_validar('#itemSegundaTabla', 'off');
    }
})

// $(document).on('click', '#vendedorBtn', _ventanaVendedores);
// $(document).on('keydown', '#vendedor', _ventanaVendedores);

function _ventanaVendedores(e) {
    if (
        e.type == "keydown" && e.which == 119
        || e.type == 'click'
    ) {
        _ventanaDatos({
            titulo: 'Busqueda VENDEDORES',
            columnas: ["COD", "NOMBRE", "NIT"],
            data: $_VENDEDORES_104E,
            callback_esc: function () {
                $('#vendedor_104e').focus();
            },
            callback: function (data) {
                $('#vendedor_104e').val(data.COD.trim());
                _enterInput('#vendedor_104e');
            }
        });
    }
};

$(document).on('keydown', '#codigoCuenta', function (e) {
    if (e.type == "keydown" && e.which == 119) {
        _ventanaDatos({
            titulo: 'Busqueda CUENTA',
            columnas: ["CTA", "DESCRIP", "TIPO"],
            data: $_CUENTAS_104E,
            callback: function (data) {
                $('#codigoCuenta').val(data.CTA.trim());
                _enterInput('#codigoCuenta');
            }
        });
    }
});

$(document).on('keydown', '#nitTerceroInpt', function (e) {
    if (e.type == "keydown" && e.which == 119) {
        _ventanaDatos({
            titulo: 'Busqueda TERCEROS',
            columnas: ["NOMBRE", "COD", "TELEF", "CIUDAD", "ACT"],
            data: $_TERCEROS_104E,
            callback: function (data) {
                $('#nitTerceroInpt').val(data.COD.trim().replace(/\,/g, ''));
                _enterInput('#nitTerceroInpt');
            }
        });
    }
});


function _crearJsonVendedores_104e() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonVendedores_104e, get_url("app/CON805.DLL"));
}

function on_crearJsonVendedores_104e(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-ARCHVEN-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_VENDEDORES_104E = data.VENDEDORES;
                $_VENDEDORES_104E.pop();
                _crearJsonCuentas_104e();
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function _crearJsonCuentas_104e() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonCuentas_104e, get_url("app/CON801.DLL"));
}

function on_crearJsonCuentas_104e(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-ARCHMAE-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_CUENTAS_104E = data.CUENTAS;
                $_CUENTAS_104E.pop();
                _crearJsonArticulos_104e();
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function _crearJsonArticulos_104e() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonArticulos_104e, get_url("app/INV803.DLL"));
}

function on_crearJsonArticulos_104e(data) {
    console.log(data)
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-MAESART-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_ARTICULOS_104E = data.Articulos;
                $_ARTICULOS_104E.pop();
                _crearJsonTerceros_104e();
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}


function _crearJsonTerceros_104e() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonTerceros_014e, get_url("app/CON802.DLL"));
}

function on_crearJsonTerceros_014e(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-ARCHTER-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_TERCEROS_104E = data.TERCEROS;
                $_TERCEROS_104E.pop();
                var arrayEliminar = [];
                arrayEliminar.push('SC-ARCHVEN-' + localStorage.Sesion)
                arrayEliminar.push('SC-ARCHMAE-' + localStorage.Sesion)
                arrayEliminar.push('SC-ARCHTER-' + localStorage.Sesion)
                arrayEliminar.push('SC-MAESART-' + localStorage.Sesion)
                _eliminarJson(arrayEliminar, on_eliminarJson_1041e);
            },
            rutaJson
        );
    } else {
        jAlert({ titulo: 'Mensaje ' + res[1], mensaje: res[2] });
    }
}

function on_eliminarJson_1041e(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        _solicitarAcceso_104e();
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function _solicitarAcceso_104e() {
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
        let pwdIn = $('#pwdAcceso').val();
        if (pwdIn == psw) {
            jAlert_close();
            _init_104e();
        } else {
            // setTimeout(function () {
            $('#pwdAcceso').val('').focus();
            // }, 500);
            plantillaToast("99", "Clave de acceso inválida", null, 'error');
        }
    }, function () {
        // Evento cancelar
        jAlert_close();
        _toggleNav();
    });
}

function _reset_104e() {
    $('#tablaVenta tbody').html('');
    $('#tablaVales tbody').html('');

    $('#galonajeTablaVenta').html('');
    $('#ventaTablaVenta').html('');
    $('#totalTablaVales').html('');
    $_SURTIDORES_104E = '';
    $_VALES_104E = '';
    $_INFO_COMP_104E = '';
    $_VALORES_TMP_104E = '';
    $_VENDEDORES_104E = '';
    $_CUENTAS_104E = '';
    $_TERCEROS_104E = '';
    $_ARTICULOS_104E = '';
    $_DATOS_TABLA_104E = [];
    $_DATOS_VALES_104E = [];
    $_DIALOGO = '';
    $_OP_PRINT = false;
    $_FORMATO_104e = '';
    numAnterior.unmaskedValue = '';
    numActual.unmaskedValue = '';
    valorActualMask.unmaskedValue = '';
    galonajeTotalMask.unmaskedValue = '';
    valorTotalMask.unmaskedValue = '';
    valorValeMask.unmaskedValue = '';
    valorCombustibleMask.unmaskedValue = '';
    valorCreditosMask.unmaskedValue = '';
    valorFinanciacionMask.unmaskedValue = '';
    valorChequesMask.unmaskedValue = '';
    valorEfectivoMask.unmaskedValue = '';

    $('#añoInicial,'
        + '#mesInicial,'
        + '#diaInicial,'
        + '#primeraIslaInpt,'
        + '#segundaIslaInpt,'
        + '#terceraIslaInpt,'
        + '#detalle,'
        + '#vendedor_104e,'
        + '#sucursal,'
        + '#sucursalNom,'
        + '#turno').val();
}

function _init_104e() {
    $('#tablaVenta tbody').html('');
    $('#tablaVales tbody').html('');

    $('#galonajeTablaVenta').html('');
    $('#ventaTablaVenta').html('');
    $('#totalTablaVales').html('');
    _validarComprobante_104e();
}

function _validarComprobante_104e() {
    validarInputs(
        { form: '#validarComprobante', orden: '1' },
        _toggleNav,
        function () {
            loader('show');
            var comprobante = $('#numComprobante').val() ? $('#numComprobante').val() : '0';
            $('#numComprobante').val(cerosIzq(comprobante, 5));

            var datos_envio = datosEnvio();
            datos_envio += cerosIzq(comprobante, 6);

            SolicitarDll({ datosh: datos_envio }, on_validarComprobante_104e, get_url("app/BOM105.DLL"));
        }
    )
}

function on_validarComprobante_104e(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-LISTCOMB-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_SURTIDORES_104E = data['SURTIDORES'];
                $_SURTIDORES_104E.pop();
                $_VALES_104E = data['TBLA-DEUD'];
                $_INFO_COMP_104E = res;
                var arrayEliminar = [];
                arrayEliminar.push('SC-LISTCOMB-' + localStorage.Sesion)
                _eliminarJson(arrayEliminar, on_eliminarJson_104e);
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _validarComprobante_104e);
    }
}

function on_eliminarJson_104e(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        _llenarDatos_104e();
    } else {
        console.error(res[1]);
        jAlert({
            titulo: 'Error ',
            mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>'
        },
            _toggleNav
        );
    }
}

function _llenarDatos_104e() {
    var datos = $_INFO_COMP_104E;

    let fecha = datos['2'].trim();
    let año = fecha.substr(0, 2);
    $('#añoInicial').val(año);

    let mes = fecha.substr(2, 2);
    $('#mesInicial').val(mes);

    let dia = fecha.substr(4, 6);
    $('#diaInicial').val(dia);

    let turno = datos['3'].trim();
    $('#turno').val(turno);

    let detalle = datos['4'].trim();
    $('#detalle').val(detalle);

    let vendedor = datos['13'].trim();
    $('#vendedor_104e').val(vendedor)

    let totalGalonaje = datos['7'].trim();
    $('#galonajeTablaVenta').html(totalGalonaje);

    let totalVenta = datos['8'].trim();
    $('#ventaTablaVenta').html(totalVenta);

    let valorCombustible = parseFloat(totalVenta.replace(/\,/g, '')).toFixed(0);
    valorCombustibleMask.unmaskedValue = valorCombustible.toString();

    let totalFinanciacion = parseFloat(datos['9'].trim().replace(/\,/g, '')).toFixed(0);
    valorFinanciacionMask.unmaskedValue = totalFinanciacion
    // $('#totalFinanciacion').val(totalFinanciacion);

    let totalVales = datos['10'].trim();
    $('#totalTablaVales').html(totalVales);
    totalVales = parseFloat(totalVales.replace(/\,/g, '')).toFixed(0);
    valorCreditosMask.unmaskedValue = totalVales;

    let totalCheques = parseFloat(datos['11'].trim().replace(/\,/g, '')).toFixed(0);
    valorChequesMask.unmaskedValue = totalCheques.toString();
    // $('#totalCheques').val(totalCheques);

    let totalEfectivo = datos['12'].trim();
    totalEfectivo = parseFloat(totalEfectivo.replace(/\,/g, '')).toFixed(0);
    valorEfectivoMask.unmaskedValue = totalEfectivo;



    if (detalle != 'ANULADO') _llenarTablaSurtidores_104e();
    else _validarComprobante_104e();
}

function _llenarTablaSurtidores_104e() {
    for (var i in $_SURTIDORES_104E) {
        let item = $_SURTIDORES_104E[i].SURTI.trim() || false;
        if (item) {
            $('#tablaVenta tbody').append(''
                + '<tr data-anterior="' + $_SURTIDORES_104E[i]['NUM-ANT'] + '">'
                + ' <td class="index">' + item + '</td>'
                + ' <td>' + $_SURTIDORES_104E[i].CANTID.trim() + '</td>'
                + ' <td>' + $_SURTIDORES_104E[i].VALOR.trim() + '</td>'
                + '</tr>'
            )

            let galonaje = parseFloat($_SURTIDORES_104E[i].CANTID.trim() || "0");
            let numAnt = $_SURTIDORES_104E[i]['NUM-ANT'].trim() || "0";
            let numeroAnterior = parseFloat(numAnt.replace(/\,/g, ''));
            let numeroActual = parseFloat(galonaje) + parseFloat(numeroAnterior);

            $_DATOS_TABLA_104E.push({
                itemSurtidor: item,
                galonaje: $_SURTIDORES_104E[i].CANTID.trim() || "0",
                valor: $_SURTIDORES_104E[i].VALOR.trim() || "0",
                codProducto: $_SURTIDORES_104E[i].ARTICU.trim(),
                descrProducto: "0",
                valorGlobal: $_SURTIDORES_104E[i]['GLB-SOBRETA'].trim() || "0",
                valorSobretasa: $_SURTIDORES_104E[i].SOBRETA.trim() || "0",
                valorVenta: $_SURTIDORES_104E[i]['VLR-VENT-ART'].trim() || "0",
                valorAnterior: numAnt.replace(/\,/g, ''),
                numeroActual: numeroActual,
                valorActual: "0",
                pesosSurti: "0",
                numeroAnterior: numAnt.replace(/\,/g, '')
            })
        }
    }

    _llenarTablaVales_104e();
}

function _llenarTablaVales_104e() {
    for (var i in $_VALES_104E) {
        if ($_VALES_104E[i].COD.trim().length > 0) {
            let item = parseInt(i) + parseInt(1);
            $('#tablaVales tbody').append(''
                + '<tr>'
                + ' <td>' + cerosIzq(item, 3) + '</td>'
                + ' <td>' + $_VALES_104E[i].COD.trim() + '</td>'
                + ' <td>' + $_VALES_104E[i].NIT.trim().replace(/\,/g, '') + '</td>'
                + ' <td>' + $_VALES_104E[i].DOCUM.trim() + '</td>'
                + ' <td>' + $_VALES_104E[i].VLR.trim() + '</td>'
                + ' <td>' + $_VALES_104E[i].DESCRIP.trim().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' ') + '</td>'
                + '</tr>'
            )

            $_DATOS_VALES_104E.push({
                item: cerosIzq(item, 3),
                codCuenta: $_VALES_104E[i].COD.trim(),
                nitTercero: $_VALES_104E[i].NIT.trim().replace(/\,/g, ''),
                nombreTercero: $_VALES_104E[i].DESCRIP.trim().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' '),
                documento: $_VALES_104E[i].DOCUM.trim(),
                valorVale: $_VALES_104E[i].VLR.trim() || "0",
                codProducto: $_VALES_104E[i].ART.trim(),
                descripProducto: '',
                cantidad: $_VALES_104E[i].CANT.trim() || "0",
                placa: $_VALES_104E[i].PLACA.trim()
            })
        }
    }

    _fase2_104e('1');
}

function _fase2_104e(orden) {
    validarInputs(
        {
            form: '#fase2',
            orden: orden
        },
        _toggleNav,
        function () {
            let diaInicial = $('#diaInicial').val();
            if (parseInt(diaInicial) > 31) _fase2_104e('1');
            else _validarVendedor_104e('1');
        }
    )
}

function _validarVendedor_104e(orden) {
    validarInputs(
        {
            form: '#fase3',
            orden: orden
        },
        function () { _fase2_104e(1) },
        function () {
            var codVendedor = espaciosIzq($('#vendedor_104e').val(), 5);
            var validacion = buscarVendedor_104e(codVendedor);
            if (validacion != false) {
                $('#vendedor_104e').val(validacion.COD.trim())
                _validarSucursal_104e();
            } else {
                plantillaToast('99', '01', null, 'warning');
                _validarVendedor_104e('3');
            }
        }
    )
}

function _validarSucursal_104e() {
    validarInputs(
        {
            form: "#faseSucursal",
            orden: '1'
        },
        function () { _validarVendedor_104e('3'); },
        function () {
            var sucursal = $('#sucursal').val().trim();
            if (sucursal == '1' || sucursal == '2') {
                if (sucursal == '1') $('#sucursalNom').val($datosUsuar[1].trim());
                else $('#sucursalNom').val($datosUsuar[10].trim());
                _validacionTabla_104e('0');
            } else {
                _validarSucursal_104e();
            }
        }
    )
}

function _validacionTabla_104e(orden) {
    validarTabla(
        {
            tabla: '#tablaVenta',
            orden: orden,
            event_f3: _validacionSegundaTabla_104e
        },
        seleccion_104e,
        _validarSucursal_104e,
        _validacionSegundaTabla_104e
    );
}

function seleccion_104e(datos) {
    var element = $(datos).find('td.index')
    var surtidor = $(element).html();
    var valorAnterior = $(datos).data().anterior;

    galonajeTotalMask.unmaskedValue = '';
    valorTotalMask.unmaskedValue = '';

    var consulta = _consultarItemArray_104e(surtidor);
    if (consulta && consulta.array.valorAnterior != 0) {
        $('#codItem').val(consulta.array.itemSurtidor)
        $('#codProducto').val(consulta.array.codProducto)
        $('#descProducto').val(consulta.array.descrProducto)

        numAnterior.unmaskedValue = consulta.array.valorAnterior;
        numActual.unmaskedValue = consulta.array.numeroActual.toString();
        valorActualMask.unmaskedValue = consulta.array.valorActual.toString();

        $_VALORES_TMP_104E = {
            item: consulta.array.itemSurtidor,
            pesosSurti: consulta.array.pesosSurti,
            valorVenta: consulta.array.valorVenta,
            valorSobretasa: consulta.array.valorSobretasa,
            valorGlobal: consulta.array.valorGlobal,
            codProducto: consulta.array.codProducto,
            descrProducto: consulta.array.descrProducto,
            numeroAnterior: consulta.array.valorAnterior
        }

        _numeroActual_104e();
    } else {
        consultaInfoSurtidor_104e(surtidor, valorAnterior);
    }
}

function consultaInfoSurtidor_104e(surtidor, valorAnterior) {
    var sesion = localStorage.Sesion;

    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2)
    var diaInicial = cerosIzq($('#diaInicial').val(), 2)
    var fechaInicial = añoInicial + mesInicial + diaInicial;

    var datos_envio = datosEnvio()
        + surtidor
        + '|' + fechaInicial;

    console.log(datos_envio)
    SolicitarDll(
        { datosh: datos_envio },
        function (data) { on_consultaInfoSurtidor_104e(data, valorAnterior) },
        get_url("app/BOM104_2.DLL")
    );
}

function on_consultaInfoSurtidor_104e(data, valorAnterior) {
    console.log(data)
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var item = res[1].trim();

        var codProducto = res[2].trim();
        var descrProducto = res[3].trim();
        var numeroActual = res[4].trim() ? res[4].trim() : '0';
        var pesos = res[5].trim() || 0;
        var valorVenta = res[6].trim() || 0;
        var valorSobretasa = res[7].trim() || 0;
        var valorGlobal = res[8].trim() || 0;

        var numeroAnterior = valorAnterior;
        // var numeroAnterior = galonajeAct ? parseFloat(numeroActual) - parseFloat(galonajeAct) : numeroActual;

        $_VALORES_TMP_104E = {
            item: item,
            pesosSurti: pesos,
            valorVenta: valorVenta,
            valorSobretasa: valorSobretasa,
            valorGlobal: valorGlobal,
            codProducto: codProducto,
            descrProducto: descrProducto,
            numeroAnterior: numeroAnterior,
            valorActual: numeroActual
        }

        $('#codItem').val(item)
        $('#codProducto').val(codProducto)
        $('#descProducto').val(descrProducto)
        numAnterior.unmaskedValue = numeroAnterior.toString();
        numActual.unmaskedValue = numeroActual;

        _numeroActual_104e();
    } else {
        plantillaError(res[0], res[1], res[2], function () { _validacionTabla_104e('0') });
    }
}

function _numeroActual_104e() {
    validarInputs(
        { form: '#validarNumeroActual', orden: '1' },
        function () {
            var item = $('#codItem').val();
            var indxTabla = _siguienteFilaTabla_104e(item - 1); // Buscar siguiente elemento en la tabla
            _validacionTabla_104e(indxTabla)
        },
        _validarNumeroActual_104e
    )
}

function _valorActual_104e() {
    validarInputs(
        { form: '#validarNumeroActual', orden: '1' },
        _numeroActual,
        function () {
            let valorActual = valorActualMask || 0;
            if (parseFloat(valorActual) < parseFloat($_VALORES_TMP['pesosSurti'])) _valorActual_104e()
            else _calcularGalonaje_104e();
        }
    )
}

function _validarNumeroActual_104e() {
    var item = $('#codItem').val();

    if (item == $_VALORES_TMP_104E['item']) {
        var numeroAnterior = parseFloat(numAnterior.unmaskedValue);
        var numeroActual = parseFloat(numActual.unmaskedValue);

        if (numeroActual == numeroAnterior) {
            galonajeTotalMask.unmaskedValue = '';
            valorTotalMask.unmaskedValue = '';
            valorActualMask.unmaskedValue = '';
            numAnterior.unmaskedValue = '';
            numActual.unmaskedValue = '';

            var consulta = _consultarItemArray_104e(item);
            if (consulta) {
                $_DATOS_TABLA_104E[consulta.index] = {
                    itemSurtidor: item,
                    estado: 0
                }
            }

            _modificarTabla_104e();
            var indxTabla = _siguienteFilaTabla_104e(item); // Buscar siguiente elemento en la tabla
            _validacionTabla_104e(indxTabla);
        } else if (numeroActual < numeroAnterior) {
            _numeroActual_104e();
        } else {
            if (parseFloat($_VALORES_TMP_104E['pesosSurti']) == 0) {
                valorActualMask.unmaskedValue = '0';
                _calcularGalonaje_104e();
            } else {
                _valorActual_104e();
            }
        }
    } else {
        jAlert({
            titulo: 'Notificacion',
            mensaje: "Ha ocurrido un error con la consulta: <b>518</b>"
        }, function () { _validacionTabla_104e('0') });
    }
}

function _calcularGalonaje_104e() {
    var item = $('#codItem').val();
    var numeroAnterior = parseFloat(numAnterior.unmaskedValue);
    var numeroActual = parseFloat(numActual.unmaskedValue);
    var valorActual = valorActualMask.unmaskedValue || 0;
    let galonajeActual = numeroActual - numeroAnterior;
    let valorActualTmp = galonajeActual * parseFloat($_VALORES_TMP_104E['valorVenta']);
    let valorSobretasa = galonajeActual * parseFloat($_VALORES_TMP_104E['valorSobretasa']);
    let valorGlobal = galonajeActual * parseFloat($_VALORES_TMP_104E['valorGlobal']);
    let valorTotal = valorActualTmp + valorSobretasa + valorGlobal;

    let pesosSurti = $_VALORES_TMP_104E['pesosSurti'] || 0;
    let difW = parseFloat(pesosSurti) + parseFloat(valorTotal) - parseFloat(valorActual);

    if (
        (parseFloat(pesosSurti) > 0)
        && (parseFloat(difW) > parseFloat($_VALORES_TMP_104E['valorVenta']))
    ) {
        plantillaToast('', 'Error en lectura precio', null, 'error  ');
        _numeroActual_104e();
    } else {
        valorTotalMask.unmaskedValue = valorTotal.toFixed(0).toString();
        galonajeTotalMask.unmaskedValue = galonajeActual.toString();

        var consulta = _consultarItemArray_104e(item);
        if (consulta) {
            $_DATOS_TABLA_104E[consulta.index] = {
                itemSurtidor: item,
                galonaje: galonajeActual,
                valor: valorTotal.toFixed(0),
                codProducto: $_VALORES_TMP_104E['codProducto'],
                descrProducto: $_VALORES_TMP_104E['descrProducto'],
                valorGlobal: $_VALORES_TMP_104E['valorGlobal'],
                valorSobretasa: $_VALORES_TMP_104E['valorSobretasa'],
                valorVenta: $_VALORES_TMP_104E['valorVenta'],
                valorAnterior: $_VALORES_TMP_104E['numeroAnterior'],
                numeroActual: numeroActual,
                valorActual: valorActual,
                pesosSurti: $_VALORES_TMP_104E['pesosSurti']
            }
        } else {
            $_DATOS_TABLA_104E.push({
                itemSurtidor: item,
                galonaje: galonajeActual,
                valor: valorTotal.toFixed(0),
                codProducto: $_VALORES_TMP_104E['codProducto'],
                descrProducto: $_VALORES_TMP['descrProducto'],
                valorGlobal: $_VALORES_TMP['valorGlobal'],
                valorSobretasa: $_VALORES_TMP['valorSobretasa'],
                valorVenta: $_VALORES_TMP['valorVenta'],
                valorAnterior: $_VALORES_TMP['numeroAnterior'],
                numeroActual: numeroActual,
                valorActual: valorActual,
                pesosSurti: $_VALORES_TMP['pesosSurti']
            });
        }

        _modificarTabla_104e();

        var indxTabla = _siguienteFilaTabla_104e(item);// Buscar siguiente elemento en la tabla
        _validacionTabla_104e(indxTabla)
    }
}

function _modificarTabla_104e() {
    var items = $('#tablaVenta tbody tr');
    var totalGalonaje = 0, totalValor = 0;
    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 3, thousandsSeparator: ',', radix: '.' });
    var masked2 = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });

    for (var i = 0; i < items.length; i++) {
        let elemento = $(items[i])
        var columnas = $(elemento).find('td');
        let elementoIndex = $(elemento).find('td.index')
        let itemTabla = $(elementoIndex).html();

        for (var j in $_DATOS_TABLA_104E) {
            if ($_DATOS_TABLA_104E[j].itemSurtidor == itemTabla) {
                if ($_DATOS_TABLA_104E[j].estado == 0) {
                    $(columnas[1]).html('');
                    $(columnas[2]).html('');
                    $_DATOS_TABLA_104E.splice(j, 1);
                } else {
                    let valorTmp = $_DATOS_TABLA_104E[j].valor.replace(/\,/g, '') || 0;
                    let valor = parseFloat(valorTmp).toFixed(0)

                    totalGalonaje += parseFloat($_DATOS_TABLA_104E[j].galonaje);
                    totalValor = parseFloat(totalValor) + parseFloat(valor);
                    totalValor = parseFloat(totalValor).toFixed(0);

                    var maskedValue = masked.resolve($_DATOS_TABLA_104E[j].galonaje.toString());
                    $(columnas[1]).html(masked.value);

                    var maskedValue = masked2.resolve(valor.toString());
                    $(columnas[2]).html(masked2.value);
                }
            }
        }
    }

    var maskedValue = masked.resolve(totalGalonaje.toString());
    $('#galonajeTablaVenta').html(masked.value);
    var maskedValue = masked2.resolve(totalValor.toString());
    $('#ventaTablaVenta').html(masked2.value);
    valorCombustibleMask.unmaskedValue = totalValor.toString();
}

function _siguienteFilaTabla_104e(item) {
    var validacion = false;
    var items = $('#tablaVenta tbody tr');
    for (var i = 0; i < items.length; i++) {
        let elemento = $(items[i])
        let elementoIndex = $(elemento).find('td.index')
        let itemTabla = $(elementoIndex).html();
        if (itemTabla == item) {
            validacion = i + 1;
            if (items.length == validacion) validacion--;
        }
    }

    return validacion;
}

function _validacionSegundaTabla_104e() {
    validarInputs(
        { form: '#itemSegundaTabla', orden: '1' },
        function () {
            var items = $('#tablaVenta tbody tr');
            _validacionTabla_104e(items.length - 1)
        },
        on_validacionSegundaTabla_104e
    )
}

function on_validacionSegundaTabla_104e() {
    var segundoItem = cerosIzq($('#itemVales').val(), 3)
    var itemsTabla = $('#tablaVales tbody tr').length + 1;

    if (segundoItem > itemsTabla || segundoItem == '000') {
        $('#itemVales').val(cerosIzq(itemsTabla, 3))
        _initBoxVales_104e();
        _validacionSegundaTabla_104e();
    } else {
        var consulta = _consultarItemArray_vales_104e(segundoItem);
        if (consulta) {
            $('#itemVales').val(consulta.array.item);
            $('#codigoCuenta').val(consulta.array.codCuenta);
            $('#nitTerceroInpt').val(consulta.array.nitTercero);
            $('#documentoInpt').val(consulta.array.documento);
            valorValeMask.unmaskedValue = consulta.array.valorVale.toString();
            $('#itemVales').val(cerosIzq(segundoItem, 3))
        } else {
            $('#itemVales').val(cerosIzq(segundoItem, 3))
            _initBoxVales_104e();
        }

        let codigoActual = $('#codigoCuenta').val().trim().length;
        let sucursal = $('#sucursal').val().trim();
        if (codigoActual == 0) {
            if (sucursal == '1') {
                $('#codigoCuenta').val('13050500001');
            } else {
                $('#codigoCuenta').val('13050500002');
            }
        }

        _validarPlanCuenta_104e();
    }
}

function _validarPlanCuenta_104e() {
    validarInputs(
        { form: '#validarCuenta', orden: '1' },
        _validacionSegundaTabla_104e,
        function () {
            var codCuenta = $('#codigoCuenta').val();
            var validacion = buscarCuentaContable_104e(codCuenta);
            if (validacion) {
                _validarTercero_104e();
            } else {
                plantillaToast('99', '01', null, 'warning');
                _validarPlanCuenta_104e();
            }
        }
    )
}
function _validarTercero_104e() {
    validarInputs(
        { form: '#nitTercero', orden: '1' },
        _validarPlanCuenta_104e,
        function () {
            var nitTercero = $('#nitTerceroInpt').val();
            var validacion = buscarTercero_104e(nitTercero);
            if (validacion) {
                $('#nitTerceroInpt').val(validacion.COD.trim());
                _validarDocumento_104e();
            } else {
                plantillaToast('99', '01', null, 'warning');
                _validarTercero_104e();
            }
        }
    )
}

function _validarDocumento_104e() {
    validarInputs(
        { form: '#documentoVale', orden: '1' },
        _validarTercero_104e,
        function () {
            var sesion = localStorage.Sesion;
            let documento = $('#documentoInpt').val();
            let nitTercero = $('#nitTerceroInpt').val();

            let añoInicial = cerosIzq($('#añoInicial').val(), 2);
            let mesInicial = cerosIzq($('#mesInicial').val(), 2)
            let diaInicial = cerosIzq($('#diaInicial').val(), 2)
            let fechaInicial = añoInicial + mesInicial + diaInicial;

            var datos_envio = datosEnvio()
                + fechaInicial
                + '|' + nitTercero
                + '|' + cerosDer(documento, 6);

            SolicitarDll({ datosh: datos_envio }, on_validarDocumento_104e, get_url("app/CON807B.DLL"));
        }
    )
}

function on_validarDocumento_104e(data) {
    var temp = data.split('|');
    if (temp[0] == '00') {
        plantillaToast(temp[0], temp[0], null, 'error');
        _validarDocumento_104e();
    } else {
        _validarPopup_104e();
    }
}

function _validarPopup_104e() {
    validarInputs(
        { form: '#validarPopup', orden: '1' },
        _validarDocumento_104e,
        on_validarPopup_104e
    )
}

function on_validarPopup_104e() {
    var fuente = $('#plantillaProducto').html();
    $_DIALOGO = bootbox.dialog({
        title: "Producto consumido",
        message: fuente,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue hidden"
            }
        },
    });

    $_DIALOGO.init(function () {
        // Inicia validación pop-up        
        cantidadVentanaMask = new IMask(
            document.getElementsByClassName('cantidadVentana')[1],
            { mask: Number, min: 0, max: 9999, scale: 2, thousandsSeparator: ',', radix: '.' }
        );

        var item = cerosIzq($('#itemVales').val(), 3)
        var consulta = _consultarItemArray_vales_104e(item);
        if (consulta) {
            let codProducto = $('.codArticuloVentana');
            $(codProducto[1]).val(consulta.array.codProducto)
            let descripProducto = $('.descripArticuloVentana');
            $(descripProducto[1]).val(consulta.array.descripProducto)
            cantidadVentanaMask.unmaskedValue = consulta.array.cantidad;
            let placaVentana = $('.placaVentanaPopup');
            $(placaVentana[1]).val(consulta.array.placa)
        }

        setTimeout(function () { validarArticuloPopup_104e() }, 500);
    })
}

function validarArticuloPopup_104e() {
    validarInputs(
        { form: '#productoPopup', orden: '1' },
        function () {
            _validarPopup_104e();
            $('[data-bb-handler="main"]').click();
        },
        function () {
            var codProductoEl = $('.codArticuloVentana');
            var codProducto = $(codProductoEl[1]).val();
            var validacion = buscarProducto_104e(codProducto);
            if (codProducto.length < 1) {
                segundaFasePopup_104e('1');
            } else if (validacion) {
                let code = validacion.GRP.trim() + validacion.NUMERO.trim();
                $(codProductoEl[1]).val(code);
                let descripProducto = $('.descripArticuloVentana');
                $(descripProducto[1]).val(validacion.DESCRIP)
                segundaFasePopup_104e('1');
            } else {
                // $('#codArticuloVentana').val('');
                // let descripProducto = $('.descripArticuloVentana');
                // $(descripProducto[1]).val('')
                plantillaToast('99', '01', null, 'warning');
                validarArticuloPopup_104e();
            }
        }
    )
}

function segundaFasePopup_104e(orden) {
    validarInputs(
        { form: '#segundaFasePopup', orden: orden },
        validarArticuloPopup_104e,
        function () {
            var item = $('#itemVales').val();
            var codCuenta = $('#codigoCuenta').val();

            var nitTercero = $('#nitTerceroInpt').val();
            var infoTercero = buscarTercero_104e(nitTercero) || 'Sin definir';
            var documento = $('#documentoInpt').val();
            var valorVale = valorValeMask.unmaskedValue;
            let codProducto = $('.codArticuloVentana');
            codProducto = $(codProducto[1]).val()
            let descripProducto = $('.descripArticuloVentana');
            descripProducto = $(descripProducto[1]).val()
            let placa = $('.placaVentanaPopup');
            placa = $(placa[1]).val()
            let cantidad = cantidadVentanaMask.unmaskedValue;

            var consulta = _consultarItemArray_vales_104e(item);
            if (consulta) {
                $_DATOS_VALES_104E[consulta.index] = {
                    item: item,
                    codCuenta: codCuenta,
                    nitTercero: nitTercero,
                    nombreTercero: infoTercero.NOMBRE.trim(),
                    documento: documento,
                    valorVale: valorVale,
                    codProducto: codProducto,
                    descripProducto: descripProducto,
                    cantidad: cantidad,
                    placa: placa
                }
            } else {
                $_DATOS_VALES_104E.push({
                    item: item,
                    codCuenta: codCuenta,
                    nitTercero: nitTercero,
                    nombreTercero: infoTercero.NOMBRE.trim(),
                    documento: documento,
                    valorVale: valorVale,
                    codProducto: codProducto,
                    descripProducto: descripProducto,
                    cantidad: cantidad,
                    placa: placa
                })
            }

            _modificarTablaVales_104e();
            $('#itemVales').val('');
            _initBoxVales_104e();
            // $('[data-bb-handler="main"]').click();
            bootbox.hideAll()
            $('html').removeClass('modal-open');
            // $_DIALOGO.modal('hide');
            _validacionSegundaTabla_104e();
        }
    )
}

function _modificarTablaVales_104e() {
    $('#tablaVales tbody').html('');
    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });
    var valorTotal = 0;
    for (var i in $_DATOS_VALES_104E) {
        var maskedValue = masked.resolve($_DATOS_VALES_104E[i].valorVale.toString());
        valorTotal += parseFloat($_DATOS_VALES_104E[i].valorVale.trim().replace(/\,/g, ''));

        $('#tablaVales tbody').append(''
            + '<tr>'
            + '   <td>' + $_DATOS_VALES_104E[i].item + '</td>'
            + '   <td>' + $_DATOS_VALES_104E[i].codCuenta + '</td>'
            + '   <td>' + $_DATOS_VALES_104E[i].nitTercero + '</td>'
            + '   <td>' + $_DATOS_VALES_104E[i].documento + '</td>'
            + '   <td>' + masked.value + '</td>'
            + '   <td>' + $_DATOS_VALES_104E[i].nombreTercero + '</td>'
            + '</tr>'
        )
    }

    var maskedValue = masked.resolve(valorTotal.toString());
    $('#totalTablaVales').html(masked.value);
    valorCreditosMask.unmaskedValue = valorTotal.toString();
}

function _validarFinanciacion_104e() {
    validarInputs(
        { form: '#validarFinanciacion', orden: '1' },
        _validacionSegundaTabla_104e,
        function () {
            let valorDeuda = valorCreditosMask.unmaskedValue || 0;
            let valorVenta = valorCombustibleMask.unmaskedValue || 0;
            let valorFinanciacion = valorFinanciacionMask.unmaskedValue || 0;

            if (parseFloat(valorDeuda) > (parseFloat(valorVenta) + parseFloat(valorFinanciacion))) {
                plantillaToast('99', '07', null, 'warning');
                _validarFinanciacion_104e();
            } else {
                _validarCheques_104e();
            }
        }
    )
}

function _validarCheques_104e() {
    validarInputs(
        { form: '#validarCheques', orden: '1' },
        _validarFinanciacion_104e,
        function () {
            var valorDeuda = valorCreditosMask.unmaskedValue || 0;
            var valorVenta = valorCombustibleMask.unmaskedValue || 0;
            var valorFinanciacion = valorFinanciacionMask.unmaskedValue || 0;
            var valorCheque = valorChequesMask.unmaskedValue || 0;

            var temp = parseFloat(valorDeuda) - parseFloat(valorFinanciacion) + parseFloat(valorCheque);
            if (parseFloat(valorVenta) < parseFloat(temp)) {
                plantillaToast('99', '07', null, 'warning');
                _validarCheques_104e();
            } else {
                var totalEfectivo = parseFloat(valorVenta) + parseFloat(valorFinanciacion)
                    - parseFloat(valorDeuda) - parseFloat(valorCheque);

                valorEfectivoMask.unmaskedValue = totalEfectivo.toString();
                _validacionFinal_104e();
            }
        }
    )
}

function _validacionFinal_104e() {
    CON850_P(function (e) {
        if (e.id == 'S') $_OP_PRINT = true;
        else $_OP_PRINT = false;

        _escribirTemp_104e();
    },
        {
            msj: '00'
        }
    )
}

function _escribirTemp_104e() {
    if ($_DATOS_TABLA_104E.length < 1) $_DATOS_TABLA_104E = false;
    else {
        for (var i in $_DATOS_TABLA_104E) {
            let actualTmp = $_DATOS_TABLA_104E[i].numeroActual;
            let anteriorTmp = $_DATOS_TABLA_104E[i].valorAnterior.replace(/\,/g, '');
            let cantidadTmp = parseFloat(actualTmp) - parseFloat(anteriorTmp);

            $_DATOS_TABLA_104E[i].codProducto = espaciosDer($_DATOS_TABLA_104E[i].codProducto, 18);

            let galonaje = parseFloat($_DATOS_TABLA_104E[i].galonaje).toFixed(3).replace(/\./g, '');
            $_DATOS_TABLA_104E[i].galonaje = cerosIzq(galonaje, 15);

            let valorAnterior = parseFloat($_DATOS_TABLA_104E[i].valorAnterior.replace(/\,/g, '')).toFixed(3).replace(/\./g, '');
            $_DATOS_TABLA_104E[i].valorAnterior = cerosIzq(valorAnterior, 15);

            let numeroActual = parseFloat($_DATOS_TABLA_104E[i].numeroActual).toFixed(3).replace(/\./g, '');
            $_DATOS_TABLA_104E[i].numeroActual = cerosIzq(numeroActual, 15);


            let valorActual = parseFloat($_DATOS_TABLA_104E[i].valorActual.replace(/\,/g, '')).toFixed(0);
            $_DATOS_TABLA_104E[i].valorActual = cerosIzq(valorActual, 12);

            // Calculos para almacenar los datos
            // let valor = parseFloat($_DATOS_TABLA[i].valor).toFixed(0).replace(/\./g, '');
            let valor = parseFloat($_DATOS_TABLA_104E[i].valorVenta) * parseFloat(cantidadTmp);
            valor = valor.toFixed(0).replace(/\./g, '');
            $_DATOS_TABLA_104E[i].valor = cerosIzq(valor, 12);

            // let valorSobretasa = parseFloat($_DATOS_TABLA[i].valorSobretasa).toFixed(0).replace(/\./g, '');
            let valorSobretasa = parseFloat($_DATOS_TABLA_104E[i].valorSobretasa) * parseFloat(cantidadTmp);
            valorSobretasa = valorSobretasa.toFixed(0).replace(/\./g, '');
            $_DATOS_TABLA_104E[i].valorSobretasa = cerosIzq(valorSobretasa, 12);

            // let valorGlobal = parseFloat($_DATOS_TABLA[i].valorGlobal).toFixed(0).replace(/\./g, '');
            let valorGlobal = parseFloat($_DATOS_TABLA_104E[i].valorGlobal) * parseFloat(cantidadTmp);
            valorGlobal = valorGlobal.toFixed(0).replace(/\./g, '');
            $_DATOS_TABLA_104E[i].valorGlobal = cerosIzq(valorGlobal, 10);
        }
    }
    if ($_DATOS_VALES_104E.length < 1) $_DATOS_VALES_104E = false;
    else {
        for (var i in $_DATOS_VALES_104E) {
            $_DATOS_VALES_104E[i].nitTercero = cerosIzq($_DATOS_VALES_104E[i].nitTercero, 11);
            $_DATOS_VALES_104E[i].documento = cerosIzq($_DATOS_VALES_104E[i].documento, 6);

            let valorVale = parseFloat($_DATOS_VALES_104E[i].valorVale.replace(/\,/g, '')).toFixed(0)
            $_DATOS_VALES_104E[i].valorVale = cerosIzq(valorVale, 12);
            $_DATOS_VALES_104E[i].codProducto = espaciosDer($_DATOS_VALES_104E[i].codProducto, 18);

            let cantidad = $_DATOS_VALES_104E[i].cantidad || 0;
            cantidad = parseFloat(cantidad).toFixed(2).replace(/\./g, '')
            $_DATOS_VALES_104E[i].cantidad = cerosIzq(cantidad, 14);

            $_DATOS_VALES_104E[i].placa = espaciosDer($_DATOS_VALES_104E[i].placa, 6);
        }
    }

    var datosEnvio = {
        sesion: localStorage.Sesion,
        datos_surtidores: $_DATOS_TABLA_104E,
        datos_vales: $_DATOS_VALES_104E,
    };

    console.log(datosEnvio)
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('paginas/inc/_datos_104.php')
    }).done(function (data) {
        console.log(data);
        var res = data.split('|');
        if (res[0].trim() == '00') {
            _bajarDatos_104e();
        } else {
            console.error(data);
            plantillaError(res[0], res[1], res[2]);
        }
    });
}

function _bajarDatos_104e() {
    let sesion = localStorage.Sesion;
    let operador = localStorage.User;

    let comprobante = $('#numComprobante').val();

    let añoInicial = cerosIzq($('#añoInicial').val(), 2);
    let mesInicial = cerosIzq($('#mesInicial').val(), 2)
    let diaInicial = cerosIzq($('#diaInicial').val(), 2)
    let fechaInicial = añoInicial + mesInicial + diaInicial;

    let turno = $('#turno').val();
    let detalle = $('#detalle').val();
    let vendedor = $('#vendedor_104e').val();

    let valorFinanciacion = valorFinanciacionMask.unmaskedValue || 0;
    valorFinanciacion = parseFloat(valorFinanciacion).toFixed(0);
    valorFinanciacion = cerosIzq(valorFinanciacion, 12);

    let valorEfectivo = valorEfectivoMask.unmaskedValue || 0;
    valorEfectivo = parseFloat(valorEfectivo).toFixed(0);
    valorEfectivo = cerosIzq(valorEfectivo, 12);

    let valorCheques = valorChequesMask.unmaskedValue || 0;
    valorCheques = parseFloat(valorCheques).toFixed(0);
    valorCheques = cerosIzq(valorCheques, 12);

    var datos_envio = datosEnvio()
        + operador + '|'
        + cerosIzq(comprobante, 6) + '|'
        + fechaInicial + '|'
        + espaciosDer(turno, 1) + '|'
        + espaciosDer(detalle, 20) + '|'
        + espaciosDer(vendedor, 5) + '|'
        + valorFinanciacion + '|'
        + valorEfectivo + '|'
        + valorCheques + '|';

    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, on_enviarDatos_104e, get_url("app/BOM104_3E.DLL"));
}

function on_enviarDatos_104e(data) {
    console.debug(data);
    var res = data.split('|');
    if (res[0].trim() == '00') {
        let comprobante = $('#numComprobante').val();

        let añoInicial = cerosIzq($('#añoInicial').val().trim());
        let mesInicial = cerosIzq($('#mesInicial').val().trim());
        let diaInicial = cerosIzq($('#diaInicial').val().trim());

        let fechaAnt = añoInicial + mesInicial + diaInicial;

        var datos_envio = datosEnvio()
            + cerosIzq(comprobante, 6)
            + '|' + '2'
            + '|' + fechaAnt
            + '|';

        console.log(datos_envio)
        SolicitarDll({ datosh: datos_envio }, on_segundaConsulta_104e, get_url("app/BOM106.DLL"));
    } else {
        plantillaError(res[0], res[1], res[2]);
    }
}


function on_segundaConsulta_104e(data) {
    console.debug(data);
    var res = data.split('|');
    if (res[0].trim() == '00') {
        let comprobante = $('#numComprobante').val();

        var datos_envio = datosEnvio()
            + cerosIzq(comprobante, 6) + '|'
            + 'S' + '|';

        console.log(datos_envio)
        SolicitarDll({ datosh: datos_envio }, on_terceraConsulta_104e, get_url("app/BOM020.DLL"));
    } else {
        plantillaError(res[0], res[1], res[2]);
    }
}

function on_terceraConsulta_104e(data) {
    console.log(data)
    var res = data.split('|');
    if (res[0].trim() == '00') {
        if ($datosUsuar[9].trim() == 'S') {
            let comprobante = $('#numComprobante').val();

            var datos_envio = datosEnvio()
                + cerosIzq(comprobante, 6) + '|';

            console.log(datos_envio)
            SolicitarDll({ datosh: datos_envio }, on_final_104e, get_url("app/BOM030.DLL"));
        } else {
            _fin_104e();
        }
    } else {
        plantillaError(res[0], res[1], res[2]);
    }
}

function on_final_104e(data) {
    console.log(data)
    var res = data.split('|');
    if (res[0].trim() == '00') {

        if ($_OP_PRINT) _ventanaImpresion_104e();
        else _fin_104e();
    } else {
        plantillaError(res[0], res[1], res[2]);
    }
}

function _ventanaImpresion_104e() {
    $('#abrirPopupBtn').click();
    setTimeout(function () { $('#formatoImpresion').select2('open') }, 500)
}

function validarFormato_104e(e) {
    var seleccionado = e.params.data.id;
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_104e = 'PDF';
        else if (seleccionado == "2") $_FORMATO_104e = 'CSV';

        $(this).attr('disabled', 'true');

        _validarPregunta_104e();
    } else {
        $(this).attr('disabled', 'true');
        $('#closePopup').click();
        _fin_104e();
    }
}
function _validarPregunta_104e() {
    validarInputs(
        { form: '#preguntaImpresion', orden: '1' },
        _fin_104e,
        function () {
            var comprobante = cerosIzq($('#numComprobante').val(), 6);
            var detallado = espaciosIzq($('#detallado').val(), 1)

            var datos_envio = datosEnvio() + comprobante + '|' + comprobante + '|' + detallado + "|";
            loader('show');
            SolicitarDll({ datosh: datos_envio }, on_enviarImpresion_104e, get_url("app/BOM111.DLL"));
        }
    )
}

function on_enviarImpresion_104e(data) {
    console.debug(data);
    var res = data.split('|');
    if (res[0].trim() == '00') {
        let nombreEmpresa = $datosUsuar[1].trim();
        let nitEmpresa = $datosUsuar[2].trim();
        let comprobanteInicial = $('#numComprobante').val();

        res.push(nombreEmpresa);
        res.push(nitEmpresa);
        res.push(comprobanteInicial);
        res.push($_RUTA_LOGO);

        var opcionesImpresiones = {
            datos: get_url('progdatos/json/SC-LISTVENT-' + localStorage.Sesion + '.JSON'),
            extra: { totales: res },
            tipo: '',
            formato: 'bom109.formato.html',
            nombre: 'LISTADO-VENT-COMBUST-' + localStorage.Sesion
        };

        if ($_FORMATO_104e == 'PDF') {
            opcionesImpresiones.tipo = 'pdf';
            imprimir(opcionesImpresiones, _fin_104e)
        } else if ($_FORMATO_104e == 'CSV') {
            opcionesImpresiones.tipo = 'csv';
            imprimir(opcionesImpresiones, _fin_104e)
        }
    } else {
        $('#closePopup').click();
        loader('hide');
        plantillaError(res[0], res[1], res[2], function () { validarFase1_105('1') });
    }
}

function _fin_104e() {
    loader('hide');
    $('#closePopup').click();
    console.log('Reiniciar todo');
    jAlert({
        titulo: 'Modificado correctamente',
        mensaje: 'El comprobante ha sido modificado correctamente'
    }, function () {
        _reset_104e()
    });
}

function _initBoxVales_104e() {
    $('#codigoCuenta').val('');
    $('#nitTerceroInpt').val('');
    $('#documentoInpt').val('');
    valorValeMask.unmaskedValue = '';
}

function _consultarItemArray_104e(item) {
    var retornar = false;

    for (var i in $_DATOS_TABLA_104E) {
        if (item == $_DATOS_TABLA_104E[i].itemSurtidor) {
            retornar = {
                index: i,
                array: $_DATOS_TABLA_104E[i]
            }
        }
    }

    return retornar;
}

function _consultarItemArray_vales_104e(item) {
    var retornar = false;

    for (var i in $_DATOS_VALES_104E) {
        if (item == $_DATOS_VALES_104E[i].item) {
            retornar = {
                index: i,
                array: $_DATOS_VALES_104E[i]
            }
        }
    }

    return retornar;
}

function _siguienteFilaTabla_104e(item) {
    var validacion = false;
    var items = $('#tablaVenta tbody tr');
    for (var i = 0; i < items.length; i++) {
        let elemento = $(items[i])
        let elementoIndex = $(elemento).find('td.index')
        let itemTabla = $(elementoIndex).html();
        if (itemTabla == item) {
            validacion = i + 1;
            if (items.length == validacion) validacion--;
        }
    }

    return validacion;
}

function _consultarItemArray_vales_104e(item) {
    var retornar = false;

    for (var i in $_DATOS_VALES_104E) {
        if (item == $_DATOS_VALES_104E[i].item) {
            retornar = {
                index: i,
                array: $_DATOS_VALES_104E[i]
            }
        }
    }

    return retornar;
}

function buscarProducto_104e(codigo) {
    var retornar = false;
    for (var i in $_ARTICULOS_104E) {
        let code = $_ARTICULOS_104E[i].GRP.trim().toLowerCase() + $_ARTICULOS_104E[i].NUMERO.trim().toLowerCase();
        if (code.trim() == codigo.toLowerCase()) {
            retornar = $_ARTICULOS_104E[i];
            break;
        }
    }

    return retornar;
}

function buscarVendedor_104e(codigo) {
    var retornar = false;
    for (var i in $_VENDEDORES_104E) {
        if ($_VENDEDORES_104E[i].COD.trim().toLowerCase() == codigo.trim().toLowerCase()) {
            retornar = $_VENDEDORES_104E[i];
            break;
        }
    }

    return retornar;
}

function buscarCuentaContable_104e(codigo) {
    var retornar = false;
    for (var i in $_CUENTAS_104E) {
        if ($_CUENTAS_104E[i].CTA.trim().toLowerCase() == codigo.trim().toLowerCase()) {
            retornar = $_CUENTAS_104E[i];
            break;
        }
    }

    return retornar;
}

function buscarTercero_104e(codigo) {
    let nit = cerosIzq(codigo.trim(), 10);
    var retornar = false;
    for (var i in $_TERCEROS_104E) {
        if ($_TERCEROS_104E[i].COD.trim().toLowerCase() == nit.toLowerCase()) {
            retornar = $_TERCEROS_104E[i];
            break;
        }
    }

    return retornar;
}