var $_VENDEDORES_104,
    $_CUENTAS_104,
    $_TERCEROS_104,
    $_ARTICULOS_104,
    $_VALORES_TMP,
    $_DATOS_TABLA = [],
    $_DATOS_VALES = [];

// Máscaras inputs
var numAnterior = new IMask(
    document.getElementById('numAnter'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var numActual = new IMask(
    document.getElementById('numActual'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var valorActualMask = new IMask(
    document.getElementById('valorActual'),
    { mask: Number, min: -999999999, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var galonajeTotalMask = new IMask(
    document.getElementById('galonajeTotal'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

var valorTotalMask = new IMask(
    document.getElementById('valorTotal'),
    { mask: Number, min: -999999999, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorValeMask = new IMask(
    document.getElementById('valorVale'),
    { mask: Number, min: -999999999, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorCombustibleMask = new IMask(
    document.getElementById('valorCombustible'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorCreditosMask = new IMask(
    document.getElementById('totalCreditos'),
    { mask: Number, min: -999999999, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorFinanciacionMask = new IMask(
    document.getElementById('valorFinanciacion'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorChequesMask = new IMask(
    document.getElementById('valorCheques'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorEfectivoMask = new IMask(
    document.getElementById('valorEfectivo'),
    { mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);


var cantidadVentanaMask;
// !Máscaras inputs

$(document).ready(function () {
    loader('show')
    _inputControl('reset');
    _inputControl('disabled');
    _crearJsonVendedores_104();

    _toggleF8([
        { input: 'vendedor', app: '104', funct: _ventanaVendedores },
        { input: 'codigoCuenta', app: '104', funct: _ventanaCuentas },
        { input: 'nitTerceroInpt', app: '104', funct: _ventanaTerceros },
    ]);
});

$(document).on('keydown', '#itemVales', function (e) {
    if (e.which == 114) {
        $(this).attr('disabled', 'true');
        _validarFinanciacion();
        set_Event_validar('#itemSegundaTabla', 'off');
    }
})

function _ventanaVendedores(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "Busqueda vendedores",
            columnas: ["COD", "NOMBRE", "NIT", "TELEF"],
            data: $_VENDEDORES_104,
            callback_esc: function () {
                $('#vendedor_104').focus();
            },
            callback: function (data) {
                let cod = data.COD.trim()
                $('#vendedor_104').val(cod).focus();
                _enterInput('#vendedor_104');
            }
        });
    }
}


function _ventanaCuentas(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "Busqueda plan de cuentas",
            columnas: ["CTA", "DESCRIP", "TIPO"],
            data: $_CUENTAS_104,
            callback_esc: function () {
                $('#codigoCuenta_104').focus();
            },
            callback: function (data) {
                let cod = data.CTA.trim()
                $('#codigoCuenta_104').val(cod).focus();
                _enterInput('#codigoCuenta_104');
            }
        });
    }
}


// $(document).on('keydown', '#nitTerceroInpt_104', function (e) {
function _ventanaTerceros(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite_v2({
            titulo: 'Busqueda terceros',
            data: $_TERCEROS_104,
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
                $('#nitTerceroInpt_104').focus();
            },
            callback: function (data) {
                $('#nitTerceroInpt_104').val(data.COD.trim());
                _enterInput('#nitTerceroInpt_104');
            }
        });
    }
}
// });


function _crearJsonVendedores_104() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonVendedores_104, get_url("app/bombas/CON805.DLL"));
}

function on_crearJsonVendedores_104(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('temp/SC-ARCHVEN-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_VENDEDORES_104 = data.VENDEDORES;
                $_VENDEDORES_104.pop();
                _crearJsonCuentas_104()
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function _crearJsonCuentas_104() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonCuentas_104, get_url("app/bombas/CON801.DLL"));
}

function on_crearJsonCuentas_104(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('temp/SC-ARCHMAE-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_CUENTAS_104 = data.CUENTAS;
                $_CUENTAS_104.pop();
                _crearJsonArticulos_104();
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function _crearJsonArticulos_104() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonArticulos_104, get_url("app/bombas/INV803.DLL"));
}

function on_crearJsonArticulos_104(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('temp/SC-MAESART-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_ARTICULOS_104 = data.Articulos;
                $_ARTICULOS_104.pop();
                _crearJsonTerceros_014();
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function _crearJsonTerceros_014() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonTerceros_014, get_url("app/bombas/CON802.DLL"));
}

function on_crearJsonTerceros_014(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('temp/SC-ARCHTER-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_TERCEROS_104 = data.TERCEROS;
                $_TERCEROS_104.pop();
                var arrayEliminar = [];
                arrayEliminar.push('SC-ARCHVEN-' + localStorage.Sesion + ".json")
                arrayEliminar.push('SC-ARCHMAE-' + localStorage.Sesion + ".json")
                arrayEliminar.push('SC-ARCHTER-' + localStorage.Sesion + ".json")
                arrayEliminar.push('SC-MAESART-' + localStorage.Sesion + ".json")
                _eliminarJson(arrayEliminar, on_eliminarJson_104);
            },
            rutaJson
        );
    } else {
        jAlert({ titulo: 'Mensaje ' + res[1], mensaje: res[2] });
    }
}

function on_eliminarJson_104(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        consultarComprobante();
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function consultarComprobante() {
    SolicitarDll({ datosh: datosEnvio() }, on_consultarComprobante, get_url("app/bombas/BOM104.DLL"));
}

function on_consultarComprobante(data) {
    console.log(data)
    var res = data.split('|');
    if (res[0].trim() == '00') {
        $('#numComprobante').val(res[1]);
        $('#añoInicial').val(res[2].slice(0, 2))
        $('#mesInicial').val(res[2].slice(2, 4))
        $('#diaInicial').val(res[2].slice(4, 6))
        _initIslas();
    } else {
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function _initIslas() {
    $('#tablaVenta tbody').html('');
    $('#primeraIslaInpt,#segundaIslaInpt,#terceraIslaInpt').val('').attr('disabled', 'true')
    // validarPrimeraIsla();
    validarDia_104();
}


function validarDia_104() {
    validarInputs(
        { form: '#validarDia', orden: '1' },
        _toggleNav,
        () => {
            var dia = parseFloat(document.getElementById('diaInicial').value) || 0,
                mes = parseFloat(document.getElementById('mesInicial').value) || 0,
                dia_max = 0;

            switch (mes) {
                case 1: dia_max = 31; break;
                case 2: dia_max = 29; break;
                case 3: dia_max = 31; break;
                case 4: dia_max = 30; break;
                case 5: dia_max = 31; break;
                case 6: dia_max = 30; break;
                case 7: dia_max = 31; break;
                case 8: dia_max = 31; break;
                case 9: dia_max = 30; break;
                case 10: dia_max = 31; break;
                case 11: dia_max = 30; break;
                case 12: dia_max = 31; break;
                default: dia_max = 30; break;
            }

            if (dia < 0 | dia > dia_max) validarDia_104()
            else validarPrimeraIsla()
        }
    )
}

function validarPrimeraIsla() {
    validarInputs(
        { form: '#primeraIsla', orden: '1' },
        validarDia_104,
        on_validarPrimeraIsla
    )
}

function on_validarPrimeraIsla() {
    var isla = $('#primeraIslaInpt').val() || '0';
    var datos_envio = datosEnvio();
    datos_envio += isla + '|';

    SolicitarDll({ datosh: datos_envio }, res_primeraIsla, get_url("app/bombas/BOM104_1.DLL"));
}

function res_primeraIsla(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        _llenarTabla(res[1]);
        validarSegundaIsla();
    } else {
        plantillaToast(res[0], res[1], res[2], 'warning');
        validarPrimeraIsla();
    }
}

function validarSegundaIsla() {
    validarInputs(
        { form: '#segundaIsla', orden: '1' },
        _initIslas,
        on_validarSegunaIsla
    )
}

function on_validarSegunaIsla() {
    var primeraIsla = $('#primeraIslaInpt').val();
    var isla = $('#segundaIslaInpt').val() ? $('#segundaIslaInpt').val() : false;
    var datos_envio = datosEnvio();
    datos_envio += isla + '|';

    if (primeraIsla == isla) validarSegundaIsla();
    else if (isla) SolicitarDll({ datosh: datos_envio }, res_segundaIsla, get_url("app/bombas/BOM104_1.DLL"));
    else validarTerceraIsla();
}

function res_segundaIsla(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        _llenarTabla(res[1]);
        validarTerceraIsla();
    } else {
        plantillaToast(res[0], res[1], res[2], 'warning');
        validarSegundaIsla();
    }
}

function validarTerceraIsla() {
    validarInputs(
        { form: '#terceraIsla', orden: '1' },
        _initIslas,
        on_validarTerceraIsla
    )
}

function on_validarTerceraIsla() {
    var primeraIsla = $('#primeraIslaInpt').val();
    var segundaIsla = $('#segundaIslaInpt').val();
    var isla = $('#terceraIslaInpt').val() ? $('#terceraIslaInpt').val() : false;
    var datos_envio = datosEnvio();
    datos_envio += isla + '|';

    if (isla) {
        if (primeraIsla == isla) validarTerceraIsla();
        else if (segundaIsla == isla) validarTerceraIsla();
        else SolicitarDll({ datosh: datos_envio }, res_terceraIsla, get_url("app/bombas/BOM104_1.DLL"));
    } else {
        _validarPrimeraFase_104('1');
    }
}

function res_terceraIsla(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        _llenarTabla(res[1]);
        _validarPrimeraFase_104('1');
    } else {
        plantillaToast(res[0], res[1], res[2], 'warning');
        validarTerceraIsla();
    }
}

function _validarPrimeraFase_104(orden) {
    validarInputs(
        { form: '#primeraFase', orden: orden },
        _initIslas,
        _validarVendedor_104
    )
}

function _validarVendedor_104() {
    var codVendedor = espaciosIzq($('#vendedor_104').val(), 5);
    var validacion = buscarVendedor_104(codVendedor);
    if (validacion != false) {
        $('#vendedor_104').val(validacion.COD.trim())
        _validacionTabla_104('0');
    } else {
        plantillaToast('99', '01', null, 'warning');
        _validarPrimeraFase_104('3');
    }
}


function _validacionTabla_104(orden) {
    validarTabla(
        {
            tabla: '#tablaVenta',
            orden: orden,
            event_f3: _validacionSegundaTabla_104
        },
        seleccion,
        function () {
            // $_VALORES_TMP = {};
            // $_DATOS_TABLA = [];
            // numAnterior.unmaskedValue = '';
            // numActual.unmaskedValue = '';
            // valorActualMask.unmaskedValue = '';
            // galonajeTotalMask.unmaskedValue = '';
            // valorTotalMask.unmaskedValue = '';
            // $('#codItem,#codProducto,#descProducto').val('');
            // $('#tablaVenta tbody').html('');
            _validarPrimeraFase_104('3')
        },
        _validacionSegundaTabla_104
    );
}

function seleccion(datos) {
    var element = $(datos).find('td.index')
    var surtidor = $(element).html();

    galonajeTotalMask.unmaskedValue = '';
    valorTotalMask.unmaskedValue = '';

    var consulta = _consultarItemArray(surtidor);
    if (consulta) {
        $('#codItem').val(consulta.array.itemSurtidor)
        $('#codProducto').val(consulta.array.codProducto)
        $('#descProducto').val(consulta.array.descrProducto)

        numAnterior.unmaskedValue = consulta.array.valorAnterior;
        numActual.unmaskedValue = consulta.array.numeroActual.toString();
        valorActualMask.unmaskedValue = consulta.array.valorActual.toString();

        $_VALORES_TMP = {
            item: consulta.array.itemSurtidor,
            pesosSurti: consulta.array.pesosSurti,
            valorVenta: consulta.array.valorVenta,
            valorSobretasa: consulta.array.valorSobretasa,
            valorGlobal: consulta.array.valorGlobal,
            codProducto: consulta.array.codProducto,
            descrProducto: consulta.array.descrProducto,
            numeroAnterior: consulta.array.valorAnterior
        }

        _numeroActual();
    } else {
        consultaInfoSurtidor(surtidor)
    }
}

function consultaInfoSurtidor(surtidor) {
    var sesion = localStorage.Sesion;

    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2)
    var diaInicial = cerosIzq($('#diaInicial').val(), 2)
    var fechaInicial = añoInicial + mesInicial + diaInicial;

    var datos_envio = datosEnvio()
        + surtidor + '|'
        + fechaInicial + '|';

    console.log(datos_envio)
    SolicitarDll({ datosh: datos_envio }, on_consultaInfoSurtidor, get_url("app/bombas/BOM104_2.DLL"));
}

function on_consultaInfoSurtidor(data) {
    console.log(data)
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var item = res[1].trim();
        var codProducto = res[2].trim();
        var descrProducto = res[3].trim();
        var numeroAnterior = res[4].trim() ? res[4].trim() : '0';
        var pesos = res[5].trim() || 0;
        var valorVenta = res[6].trim() || 0;
        var valorSobretasa = res[7].trim() || 0;
        var valorGlobal = res[8].trim() || 0;

        $_VALORES_TMP = {
            item: item,
            pesosSurti: pesos,
            valorVenta: valorVenta,
            valorSobretasa: valorSobretasa,
            valorGlobal: valorGlobal,
            codProducto: codProducto,
            descrProducto: descrProducto,
            numeroAnterior: numeroAnterior,
            valorActual: 0
        }

        $('#codItem').val(item)
        $('#codProducto').val(codProducto)
        $('#descProducto').val(descrProducto)
        numAnterior.unmaskedValue = numeroAnterior;
        numActual.unmaskedValue = numeroAnterior;

        _numeroActual();
    } else {
        plantillaError(res[0], res[1], res[2], function () { _validacionTabla_104('0') });
    }
}

function _numeroActual() {
    validarInputs(
        { form: '#validarNumeroActual', orden: '1' },
        function () {
            var item = $('#codItem').val();
            var indxTabla = _siguienteFilaTabla(item - 1); // Buscar siguiente elemento en la tabla
            _validacionTabla_104(indxTabla)
        },
        _validarNumeroActual
    )
}

function _valorActual() {
    validarInputs(
        { form: '#validarNumeroActual', orden: '1' },
        _numeroActual,
        function () {
            let valorActual = valorActualMask || 0;
            if (parseFloat(valorActual) < parseFloat($_VALORES_TMP['pesosSurti'])) _valorActual()
            else _calcularGalonaje();
        }
    )
}

function _validarNumeroActual() {
    var item = $('#codItem').val();
    if (item == $_VALORES_TMP['item']) {
        var numeroAnterior = parseFloat(numAnterior.unmaskedValue);
        var numeroActual = parseFloat(numActual.unmaskedValue);

        if (numeroActual == numeroAnterior) {
            galonajeTotalMask.unmaskedValue = '';
            valorTotalMask.unmaskedValue = '';
            valorActualMask.unmaskedValue = '';
            numAnterior.unmaskedValue = '';
            numActual.unmaskedValue = '';

            var consulta = _consultarItemArray(item);
            if (consulta) {
                $_DATOS_TABLA[consulta.index] = {
                    itemSurtidor: item,
                    estado: 0
                }
            }

            _modificarTabla();
            var indxTabla = _siguienteFilaTabla(item); // Buscar siguiente elemento en la tabla
            _validacionTabla_104(indxTabla);
        } else if (numeroActual < numeroAnterior) {
            _numeroActual();
        } else {
            if (parseFloat($_VALORES_TMP['pesosSurti']) == 0) {
                valorActualMask.unmaskedValue = '0';
                _calcularGalonaje();
            } else {
                _valorActual();
            }
        }
    } else {
        jAlert({
            titulo: 'Notificacion',
            mensaje: "Ha ocurrido un error con la consulta: <b>501</b>"
        }, function () { _validacionTabla_104('0') });
    }
}

function _calcularGalonaje() {
    var item = $('#codItem').val();
    var numeroAnterior = parseFloat(numAnterior.unmaskedValue);
    var numeroActual = parseFloat(numActual.unmaskedValue);
    var valorActual = valorActualMask.unmaskedValue || 0;
    let galonajeActual = numeroActual - numeroAnterior;
    let valorActualTmp = galonajeActual * parseFloat($_VALORES_TMP['valorVenta']);
    let valorSobretasa = galonajeActual * parseFloat($_VALORES_TMP['valorSobretasa']);
    let valorGlobal = galonajeActual * parseFloat($_VALORES_TMP['valorGlobal']);
    let valorTotal = valorActualTmp + valorSobretasa + valorGlobal;

    let pesosSurti = $_VALORES_TMP['pesosSurti'] || 0;
    let difW = parseFloat(pesosSurti) + parseFloat(valorTotal) - parseFloat(valorActual);

    if (
        (parseFloat(pesosSurti) > 0)
        && (parseFloat(difW) > parseFloat($_VALORES_TMP['valorVenta']))
    ) {
        plantillaToast('', 'Error en lectura precio', null, 'error  ');
        _numeroActual();
    } else {
        valorTotalMask.unmaskedValue = valorTotal.toFixed(0).toString();
        galonajeTotalMask.unmaskedValue = galonajeActual.toString();

        var consulta = _consultarItemArray(item);
        if (consulta) {
            $_DATOS_TABLA[consulta.index] = {
                itemSurtidor: item,
                galonaje: galonajeActual,
                valor: valorTotal.toFixed(0),
                codProducto: $_VALORES_TMP['codProducto'],
                descrProducto: $_VALORES_TMP['descrProducto'],
                valorGlobal: $_VALORES_TMP['valorGlobal'],
                valorSobretasa: $_VALORES_TMP['valorSobretasa'],
                valorVenta: $_VALORES_TMP['valorVenta'],
                valorAnterior: $_VALORES_TMP['numeroAnterior'],
                numeroActual: numeroActual,
                valorActual: valorActual,
                pesosSurti: $_VALORES_TMP['pesosSurti']
            }
        } else {
            $_DATOS_TABLA.push({
                itemSurtidor: item,
                galonaje: galonajeActual,
                valor: valorTotal.toFixed(0),
                codProducto: $_VALORES_TMP['codProducto'],
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

        _modificarTabla();

        var indxTabla = _siguienteFilaTabla(item);// Buscar siguiente elemento en la tabla
        _validacionTabla_104(indxTabla)
    }
}


function _modificarTabla() {
    var items = $('#tablaVenta tbody tr');
    var totalGalonaje = 0, totalValor = 0;
    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 3, thousandsSeparator: ',', radix: '.' });
    var masked2 = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });

    for (var i = 0; i < items.length; i++) {
        let elemento = $(items[i])
        var columnas = $(elemento).find('td');
        let elementoIndex = $(elemento).find('td.index')
        let itemTabla = $(elementoIndex).html();

        for (var j in $_DATOS_TABLA) {
            if ($_DATOS_TABLA[j].itemSurtidor == itemTabla) {
                if ($_DATOS_TABLA[j].estado == 0) {
                    $(columnas[1]).html('');
                    $(columnas[2]).html('');
                    $_DATOS_TABLA.splice(j, 1);
                } else {
                    totalGalonaje += parseFloat($_DATOS_TABLA[j].galonaje);
                    totalValor = parseFloat(totalValor) + parseFloat($_DATOS_TABLA[j].valor);
                    totalValor = parseFloat(totalValor).toFixed(0);

                    var maskedValue = masked.resolve($_DATOS_TABLA[j].galonaje.toString());
                    $(columnas[1]).html(masked.value);
                    var maskedValue = masked2.resolve($_DATOS_TABLA[j].valor.toString());
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

function _validacionSegundaTabla_104() {
    validarInputs(
        { form: '#itemSegundaTabla', orden: '1' },
        function () {
            var items = $('#tablaVenta tbody tr');
            _validacionTabla_104(items.length - 1)
        },
        on_validacionSegundaTabla_104
    )
}

function on_validacionSegundaTabla_104() {
    var segundoItem = cerosIzq($('#itemVales').val(), 3)
    var itemsTabla = $('#tablaVales tbody tr').length + 1;

    if (segundoItem > itemsTabla || segundoItem == '000') {
        $('#itemVales').val(cerosIzq(itemsTabla, 3))
        _initBoxVales();
        _validacionSegundaTabla_104();
    } else {
        var consulta = _consultarItemArray_vales(segundoItem);
        if (consulta) {
            $('#itemVales').val(consulta.array.item);
            $('#codigoCuenta_104').val(consulta.array.codCuenta);
            $('#nitTerceroInpt_104').val(consulta.array.nitTercero);
            $('#documentoInpt').val(consulta.array.documento);
            valorValeMask.unmaskedValue = consulta.array.valorVale.toString();
            $('#itemVales').val(cerosIzq(segundoItem, 3))
        } else {
            $('#itemVales').val(cerosIzq(segundoItem, 3))
            _initBoxVales();
        }

        _validarPlanCuenta();
    }
}

function _validarPlanCuenta() {
    validarInputs(
        { form: '#validarCuenta', orden: '1' },
        _validacionSegundaTabla_104,
        function () {
            var codCuenta = $('#codigoCuenta_104').val();
            var validacion = buscarCuentaContable_104(codCuenta);
            if (validacion) {
                _validarTercero()
            } else {
                plantillaToast('99', '01', null, 'warning');
                _validarPlanCuenta();
            }
        }
    )
}

function _validarTercero() {
    validarInputs(
        { form: '#nitTercero', orden: '1' },
        _validarPlanCuenta,
        function () {
            var nitTercero = $('#nitTerceroInpt_104').val();
            var validacion = buscarTercero_014(nitTercero);
            if (validacion) {
                $('#nitTerceroInpt_104').val(validacion.COD.trim());
                _validarDocumento();
            } else {
                plantillaToast('99', '01', null, 'warning');
                _validarTercero();
            }
        }
    )
}

function _validarDocumento() {
    validarInputs(
        { form: '#documentoVale', orden: '1' },
        _validarTercero,
        function () {
            var sesion = localStorage.Sesion;
            let documento = $('#documentoInpt').val();
            let nitTercero = $('#nitTerceroInpt_104').val();

            let añoInicial = cerosIzq($('#añoInicial').val(), 2);
            let mesInicial = cerosIzq($('#mesInicial').val(), 2)
            let diaInicial = cerosIzq($('#diaInicial').val(), 2)
            let fechaInicial = añoInicial + mesInicial + diaInicial;

            var datos_envio = datosEnvio()
                + fechaInicial + '|'
                + nitTercero + '|'
                + cerosDer(documento, 6) + '|';

            SolicitarDll({ datosh: datos_envio }, on_validarDocumento, get_url("app/bombas/CON807B.DLL"));
        }
    )
}

function on_validarDocumento(data) {
    var temp = data.split('|');
    if (temp[0] == '00') {
        plantillaToast(temp[0], temp[0], null, 'error');
        _validarDocumento();
    } else {
        _validarPopup();
    }
}

function _validarPopup() {
    validarInputs(
        { form: '#validarPopup', orden: '1' },
        _validarDocumento,
        on_validarPopup
    )
}

function on_validarPopup() {
    var fuente = $('#plantillaProducto').html();
    var dialogo = bootbox.dialog({
        title: "Producto consumido",
        message: fuente,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue hidden",
                callback: function () {
                    // Evento aceptar popup
                }
            }
        },
    });

    dialogo.init(function () {
        // Inicia validación pop-up
        console.log('Popup abierto')
        cantidadVentanaMask = new IMask(
            document.getElementsByClassName('cantidadVentana')[1],
            { mask: Number, min: 0, max: 9999, scale: 2, thousandsSeparator: ',', radix: '.' }
        );

        var item = cerosIzq($('#itemVales').val(), 3)
        var consulta = _consultarItemArray_vales(item);
        if (consulta) {
            let codProducto = $('.codArticuloVentana');
            $(codProducto[1]).val(consulta.array.codProducto)
            let descripProducto = $('.descripArticuloVentana');
            $(descripProducto[1]).val(consulta.array.descripProducto)
            cantidadVentanaMask.unmaskedValue = consulta.array.cantidad;
            let placaVentana = $('.placaVentana');
            $(placaVentana[1]).val(consulta.array.placa)
        }
        setTimeout(function () { validarArticuloPopup() }, 500);

        $('.codArticuloVentana').unbind()
        $('.codArticuloVentana').bind('keydown', function (e) {
            if (e.which == 119) {
                _ventanaDatos({
                    titulo: "Ventana articulos",
                    columnas: ["GRP", "NUMERO", "DESCRIP", "UNID", "VALOR", "REFER"],
                    data: $_ARTICULOS_104,
                    callback_esc: function () {
                        $('.codArticuloVentana').focus();
                    },
                    callback: function (data) {
                        let grp = data.GRP.trim()
                        $('.codArticuloVentana').val(grp + data.NUMERO.trim()).focus();
                        _enterInput('.codArticuloVentana');
                    }
                });
            }
        })

        // $(document).on('keydown', '.codArticuloVentana', function (e) {});

    })
}

function validarArticuloPopup() {
    validarInputs(
        { form: '#productoPopup', orden: '1' },
        function () {
            _validarPopup();
            $('[data-bb-handler="main"]').click();
        },
        function () {
            var codProductoEl = $('.codArticuloVentana');
            var codProducto = $(codProductoEl[1]).val();
            var validacion = buscarProducto_104(codProducto);
            if (!codProducto) {
                segundaFasePopup('1');
                let descripProducto = $('.descripArticuloVentana');
                $(descripProducto[1]).val('')
            } else if (validacion) {
                let code = validacion.GRP.trim() + validacion.NUMERO.trim();
                $(codProductoEl[1]).val(code);
                let descripProducto = $('.descripArticuloVentana');
                $(descripProducto[1]).val(validacion.DESCRIP)
                segundaFasePopup('1');
            } else {
                // $('#codArticuloVentana').val('');
                // let descripProducto = $('.descripArticuloVentana');
                // $(descripProducto[1]).val('')
                plantillaToast('99', '01', null, 'warning');
                validarArticuloPopup();
            }
        }
    )
}

function segundaFasePopup(orden) {
    validarInputs(
        { form: '#segundaFasePopup', orden: orden },
        validarArticuloPopup,
        function () {
            var item = $('#itemVales').val();
            var codCuenta = $('#codigoCuenta_104').val();
            var nitTercero = $('#nitTerceroInpt_104').val();
            var documento = $('#documentoInpt').val();
            var valorVale = valorValeMask.unmaskedValue;
            let codProducto = $('.codArticuloVentana');
            codProducto = $(codProducto[1]).val()
            let descripProducto = $('.descripArticuloVentana');
            descripProducto = $(descripProducto[1]).val()
            let placa = $('.placaVentana');
            placa = $(placa[1]).val()
            let cantidad = cantidadVentanaMask.unmaskedValue;

            var consulta = _consultarItemArray_vales(item);
            if (consulta) {
                $_DATOS_VALES[consulta.index] = {
                    item: item,
                    codCuenta: codCuenta,
                    nitTercero: nitTercero,
                    documento: documento,
                    valorVale: valorVale,
                    codProducto: codProducto,
                    descripProducto: descripProducto,
                    cantidad: cantidad,
                    placa: placa
                }
            } else {
                $_DATOS_VALES.push({
                    item: item,
                    codCuenta: codCuenta,
                    nitTercero: nitTercero,
                    documento: documento,
                    valorVale: valorVale,
                    codProducto: codProducto,
                    descripProducto: descripProducto,
                    cantidad: cantidad,
                    placa: placa
                })
            }

            _modificarTablaVales();
            $('#itemVales').val('');
            _initBoxVales();
            $('[data-bb-handler="main"]').click();
            _validacionSegundaTabla_104();
        }
    )
}

function _modificarTablaVales() {
    $('#tablaVales tbody').html('');
    var masked = IMask.createMask({ mask: Number, min: -999999999, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });
    var valorTotal = 0;
    for (var i in $_DATOS_VALES) {
        var maskedValue = masked.resolve($_DATOS_VALES[i].valorVale.toString());
        valorTotal += parseFloat($_DATOS_VALES[i].valorVale);
        $('#tablaVales tbody').append(''
            + '<tr>'
            + '   <td>' + $_DATOS_VALES[i].item + '</td>'
            + '   <td>' + $_DATOS_VALES[i].codCuenta + '</td>'
            + '   <td>' + $_DATOS_VALES[i].nitTercero + '</td>'
            + '   <td>' + $_DATOS_VALES[i].documento + '</td>'
            + '   <td>' + masked.value + '</td>'
            + '</tr>'
        )
    }

    var maskedValue = masked.resolve(valorTotal.toString());
    $('#totalTablaVales').html(masked.value);
    valorCreditosMask.unmaskedValue = valorTotal.toString();
}

function _initBoxVales() {
    $('#codigoCuenta_104').val('');
    $('#nitTerceroInpt_104').val('');
    $('#documentoInpt').val('');
    valorValeMask.unmaskedValue = '';
}

function _llenarTabla(datos) {
    var filas = datos.split(';');
    for (var i in filas) {
        var fila = filas[i].trim() ? filas[i].trim() : false;
        if (fila) {
            $('#tablaVenta tbody').append(''
                + '<tr>'
                + ' <td class="index">' + filas[i] + '</td>'
                + ' <td></td>'
                + ' <td></td>'
                + '</tr>'
            )
        }
    }
}

function _validarFinanciacion() {
    validarInputs(
        { form: '#validarFinanciacion', orden: '1' },
        _validacionSegundaTabla_104,
        function () {
            let valorDeuda = valorCreditosMask.unmaskedValue || 0;
            let valorVenta = valorCombustibleMask.unmaskedValue || 0;
            let valorFinanciacion = valorFinanciacionMask.unmaskedValue || 0;

            if (parseFloat(valorDeuda) > (parseFloat(valorVenta) + parseFloat(valorFinanciacion))) {
                plantillaToast('99', '07', null, 'warning');
                _validarFinanciacion();
            } else {
                _validarCheques();
            }
        }
    )
}

function _validarCheques() {
    validarInputs(
        { form: '#validarCheques', orden: '1' },
        _validarFinanciacion,
        function () {
            var valorDeuda = valorCreditosMask.unmaskedValue || 0;
            var valorVenta = valorCombustibleMask.unmaskedValue || 0;
            var valorFinanciacion = valorFinanciacionMask.unmaskedValue || 0;
            var valorCheque = valorChequesMask.unmaskedValue || 0;

            var temp = parseFloat(valorDeuda) - parseFloat(valorFinanciacion) + parseFloat(valorCheque);
            if (parseFloat(valorVenta) < parseFloat(temp)) {
                plantillaToast('99', '07', null, 'warning');
                _validarCheques();
            } else {
                var totalEfectivo = parseFloat(valorVenta) + parseFloat(valorFinanciacion)
                    - parseFloat(valorDeuda) - parseFloat(valorCheque);

                valorEfectivoMask.unmaskedValue = totalEfectivo.toString();
                _validacionFinal_104();
            }
        }
    )
}

function _validacionFinal_104() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            _escribirTemp_104();
            // _bajarDatos_104();
        } else {
            setTimeout(_validarCheques, 500)
        }
    }, {}
    )
}

function _escribirTemp_104() {
    loader('show')
    if ($_DATOS_TABLA.length < 1) $_DATOS_TABLA = false;
    else {
        for (var i in $_DATOS_TABLA) {
            let actualTmp = $_DATOS_TABLA[i].numeroActual;
            let anteriorTmp = $_DATOS_TABLA[i].valorAnterior;
            let cantidadTmp = parseFloat(actualTmp) - parseFloat(anteriorTmp);

            $_DATOS_TABLA[i].codProducto = espaciosDer($_DATOS_TABLA[i].codProducto, 18);

            let galonaje = parseFloat($_DATOS_TABLA[i].galonaje).toFixed(3).replace(/\./g, '');
            $_DATOS_TABLA[i].galonaje = cerosIzq(galonaje, 15);

            let valorAnterior = parseFloat($_DATOS_TABLA[i].valorAnterior).toFixed(3).replace(/\./g, '');
            $_DATOS_TABLA[i].valorAnterior = cerosIzq(valorAnterior, 15);

            let numeroActual = parseFloat($_DATOS_TABLA[i].numeroActual).toFixed(3).replace(/\./g, '');
            $_DATOS_TABLA[i].numeroActual = cerosIzq(numeroActual, 15);

            $_DATOS_TABLA[i].valorActual = cerosIzq($_DATOS_TABLA[i].valorActual, 12);

            // Calculos para almacenar los datos
            // let valor = parseFloat($_DATOS_TABLA[i].valor).toFixed(0).replace(/\./g, '');
            let valor = parseFloat($_DATOS_TABLA[i].valorVenta) * parseFloat(cantidadTmp);
            valor = valor.toFixed(0).replace(/\./g, '');
            $_DATOS_TABLA[i].valor = cerosIzq(valor, 12);

            // let valorSobretasa = parseFloat($_DATOS_TABLA[i].valorSobretasa).toFixed(0).replace(/\./g, '');
            let valorSobretasa = parseFloat($_DATOS_TABLA[i].valorSobretasa) * parseFloat(cantidadTmp);
            valorSobretasa = valorSobretasa.toFixed(0).replace(/\./g, '');
            $_DATOS_TABLA[i].valorSobretasa = cerosIzq(valorSobretasa, 12);

            // let valorGlobal = parseFloat($_DATOS_TABLA[i].valorGlobal).toFixed(0).replace(/\./g, '');
            let valorGlobal = parseFloat($_DATOS_TABLA[i].valorGlobal) * parseFloat(cantidadTmp);
            valorGlobal = valorGlobal.toFixed(0).replace(/\./g, '');
            $_DATOS_TABLA[i].valorGlobal = cerosIzq(valorGlobal, 10);
        }
    }
    if ($_DATOS_VALES.length < 1) $_DATOS_VALES = false;
    else {
        for (var i in $_DATOS_VALES) {
            $_DATOS_VALES[i].nitTercero = cerosIzq($_DATOS_VALES[i].nitTercero, 11);
            $_DATOS_VALES[i].documento = cerosIzq($_DATOS_VALES[i].documento, 6);
            $_DATOS_VALES[i].valorVale = cerosIzq($_DATOS_VALES[i].valorVale, 12);
            $_DATOS_VALES[i].codProducto = espaciosDer($_DATOS_VALES[i].codProducto, 18);

            let cantidad = parseFloat($_DATOS_VALES[i].cantidad).toFixed(2).replace(/\./g, '');
            $_DATOS_VALES[i].cantidad = cerosIzq(cantidad, 14);

            $_DATOS_VALES[i].placa = espaciosDer($_DATOS_VALES[i].placa, 6);
        }
    }

    var datosEnvio = {
        sesion: localStorage.Sesion,
        datos_surtidores: $_DATOS_TABLA,
        datos_vales: $_DATOS_VALES,
    };

    console.log(datosEnvio)
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('bombas/paginas/inc/_datos_104.php')
    }).done(function (data) {
        var res = data.split('|');
        if (res[0].trim() == '00') {
            _bajarDatos_104();
        } else {
            console.error(data);
            loader('hide')
            plantillaError(res[0], res[1], res[2]);
        }
    });
}

function _bajarDatos_104() {
    let sesion = localStorage.Sesion;
    let operador = localStorage.Usuario;

    let comprobante = $('#numComprobante').val();

    let añoInicial = cerosIzq($('#añoInicial').val(), 2);
    let mesInicial = cerosIzq($('#mesInicial').val(), 2)
    let diaInicial = cerosIzq($('#diaInicial').val(), 2)
    let fechaInicial = añoInicial + mesInicial + diaInicial;

    let turno = $('#numTurno').val();
    let detalle = $('#detalle').val();
    let vendedor = $('#vendedor_104').val();

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
        + turno + '|'
        + espaciosDer(detalle, 20) + '|'
        + vendedor + '|'
        + valorFinanciacion + '|'
        + valorEfectivo + '|'
        + valorCheques + '|';
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, on_enviarDatos_104, get_url("app/bombas/BOM104_3.DLL"));
}

function on_enviarDatos_104(data) {
    console.debug(data);
    var res = data.split('|');
    if (res[0].trim() == '00') {
        let sesion = localStorage.Sesion;
        let comprobante = $('#numComprobante').val();

        var datos_envio = datosEnvio()
            + cerosIzq(comprobante, 6) + '|'
            + 'S' + '|';

        console.log(datos_envio)
        SolicitarDll({ datosh: datos_envio }, on_segundaConsulta, get_url("app/bombas/BOM020.DLL"));
    } else {
        loader('hide')
        plantillaError(res[0], res[1], res[2]);
    }
}

function on_segundaConsulta(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        if ($_USUA_GLOBAL[0].INVENT.trim() == 'S') {
            let sesion = localStorage.Sesion;
            let comprobante = $('#numComprobante').val();
            var datos_envio = datosEnvio()
                + cerosIzq(comprobante, 6) + '|';
            console.log(datos_envio)
            SolicitarDll({ datosh: datos_envio }, on_terceraConsulta, get_url("app/bombas/BOM030.DLL"));
        } else {
            _fin_104();
        }
    } else {
        loader('hide')
        plantillaError(res[0], res[1], res[2]);
    }
}

function on_terceraConsulta(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        _fin_104();
    } else {
        loader('hide')
        plantillaError(res[0], res[1], res[2]);
    }
}

function _fin_104() {
    loader('hide')
    console.log('Reiniciar todo');

    $('#tablaVenta tbody').html('')
    $('#numComprobante').val('');
    $('#añoInicial').val('')
    $('#mesInicial').val('')
    $('#diaInicial').val('')
    $('#numTurno').val('')
    $('#detalle').val('')
    $('#vendedor_104').val('')
    $('#codProducto,#codItem,#descProducto').val('')
    $('#galonajeTablaVenta,#ventaTablaVenta').html('');

    numAnterior.unmaskedValue = '';
    numActual.unmaskedValue = '';
    valorActualMask.unmaskedValue = '';
    galonajeTotalMask.unmaskedValue = '';
    valorTotalMask.unmaskedValue = '';

    $('#tablaVales tbody').html('');
    $('#totalTablaVales').html('');

    valorCombustibleMask.unmaskedValue = '';
    valorFinanciacionMask.unmaskedValue = '';
    valorCreditosMask.unmaskedValue = '';
    valorChequesMask.unmaskedValue = '';
    valorEfectivoMask.unmaskedValue = '';

    $_DATOS_TABLA = $_DATOS_VALES = [];

    jAlert({
        titulo: 'Guardado correctamente',
        mensaje: 'El comprobante ha sido guardado correctamente'
    }, function () {
        consultarComprobante()
    });
}

function _consultarItemArray(item) {
    var retornar = false;

    for (var i in $_DATOS_TABLA) {
        if (item == $_DATOS_TABLA[i].itemSurtidor) {
            retornar = {
                index: i,
                array: $_DATOS_TABLA[i]
            }
        }
    }

    return retornar;
}

function _consultarItemArray_vales(item) {
    var retornar = false;

    for (var i in $_DATOS_VALES) {
        if (item == $_DATOS_VALES[i].item) {
            retornar = {
                index: i,
                array: $_DATOS_VALES[i]
            }
        }
    }

    return retornar;
}

function _siguienteFilaTabla(item) {
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

function buscarProducto_104(codigo) {
    var retornar = false;
    for (var i in $_ARTICULOS_104) {
        let code = $_ARTICULOS_104[i].GRP.trim().toLowerCase() + $_ARTICULOS_104[i].NUMERO.trim().toLowerCase();
        if (code.trim() == codigo.toLowerCase()) {
            retornar = $_ARTICULOS_104[i];
            break;
        }
    }

    return retornar;
}

function buscarVendedor_104(codigo) {
    var retornar = false;
    for (var i in $_VENDEDORES_104) {
        if ($_VENDEDORES_104[i].COD.trim().toLowerCase() == codigo.trim().toLowerCase()) {
            retornar = $_VENDEDORES_104[i];
            break;
        }
    }

    return retornar;
}

function buscarCuentaContable_104(codigo) {
    var retornar = false;
    for (var i in $_CUENTAS_104) {
        if ($_CUENTAS_104[i].CTA.trim().toLowerCase() == codigo.trim().toLowerCase()) {
            retornar = $_CUENTAS_104[i];
            break;
        }
    }

    return retornar;
}

function buscarTercero_014(codigo) {
    let nit = cerosIzq(codigo.trim(), 10);
    var retornar = false;
    for (var i in $_TERCEROS_104) {
        if ($_TERCEROS_104[i].COD.trim().toLowerCase() == nit.toLowerCase()) {
            retornar = $_TERCEROS_104[i];
            break;
        }
    }

    return retornar;
}