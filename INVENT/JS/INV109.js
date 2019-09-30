var arrayPrefijos_109 = [];
var $maskFecha_109
var $_TABLA_BASE_DATOS = []

var $_Token_Cliente_109;
var $_Token_Acceso_109

var SQL_INSERT = "INSERT INTO sc_archpref VALUES";
var SQL_UPDATE = '';
var SQL_DELETE = "DELETE FROM sc_archpref WHERE id in (";


var momentFormat = 'YYYY/MM/DD';
var momentMaskFecha = new IMask($("#fechaPrefijo_109")[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(2009, 0, 1),
    max: new Date(2080, 0, 1),

    format: function (date) {
        console.log(date);
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        $maskFecha_109 = str;
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2009,
            to: 2080
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }

});

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');

    _toggleF8([
        { input: 'centroCosto', app: '109', funct: _ventanaCentroCosto_109 },
        { input: 'almacen', app: '109', funct: _ventanaAlmacen_109 },
        { input: 'listaEnvio', app: '109', funct: _ventanaListaEnvio_109 },
    ]);
    json_Prefijos_inv109()
});

function _ventanaCentroCosto_109(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana Centros De Costos',
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_archcos',
            callback_esc: function () {
                validar_Sucursal_109();
            },
            callback: function (data) {
                console.log(data)
                $('#centroCosto_109').val(data.codigo.trim());
                _enterInput('#centroCosto_109');
            }
        });
    }
}

function _ventanaAlmacen_109(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana de Almacenes',
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_almac',
            callback_esc: function () {
                validar_Costo_109();
            },
            callback: function (data) {
                console.log(data)
                $('#almacen_109').val(data.codigo.trim());
                _enterInput('#almacen_109');
            }
        });
    }
}

function _ventanaListaEnvio_109(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana de Sucursales',
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_sucur',
            callback_esc: function () {
                validar_Almacen_109();
            },
            callback: function (data) {
                console.log(data)
                $('#listaEnvio_109').val(data.cod_sucur.trim());
                _enterInput('#listaEnvio_109');
            }
        });
    }
}

function json_Prefijos_inv109() {
    LLAMADO_DLL({
        dato: [],
        callback: on_json_Prefijos_inv109,
        nombredll: 'INV109-01',
        carpeta: 'INVENT'
    })
}

function on_json_Prefijos_inv109(data) {
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        var rutaJson = rdll[1].trim()
        console.log(urlJson(rutaJson))
        SolicitarDatos(
            null,
            function (data) {
                console.log(data)
                arrayPrefijos_109 = data.PREFIJOS
                arrayPrefijos_109[0].TABLA.pop()
                var arrayEliminar = [];
                arrayEliminar.push(rutaJson)
                _eliminarJson(arrayEliminar, on_eliminarJson_109);
            },
            urlJson(rutaJson)
        );
    } else {
        loader('hide');
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}

function on_eliminarJson_109(data) {
    loader('hide');
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        mostrarDatos_tabla_109()
        _validacionTablaPrefijos_109('0');
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function buscarProv_fact(proveedor) {
    switch (proveedor) {
        case '1':
            $('#descripFactElect_109').val('Facse')
            break;
        case '2':
            $('#descripFactElect_109').val('Carvajal')
            break;
        case '3':
            $('#descripFactElect_109').val('Novacorp')
            break;
        case '4':
            $('#descripFactElect_109').val('Dispapeles')
            break;
    }
}

function mostrarDatos_tabla_109() {
    var tabla = arrayPrefijos_109[0].TABLA
    $('#sucPrefNro_109').val(arrayPrefijos_109[0].FPREF_NUM.trim())
    $('#factElect_109').val(arrayPrefijos_109[0].PROV_FACT_ELECT.trim())
    buscarProv_fact($('#factElect_109').val())

    var masked = IMask.createMask({ mask: Date, pattern: 'Y/`m/`dd' });

    for (var i in tabla) {
        if (tabla[i].ESTADO == '1' || tabla[i].ESTADO == '7' || tabla[i].ESTADO == '8') {
            $('#tablaPrefijos_109 tbody').append(''
                + '<tr>'
                + '   <td>' + tabla[i].NRO.trim().slice(-2) + '</td>'
                + '   <td>' + tabla[i].PREFIJO.trim() + '</td>'
                + '   <td>' + tabla[i].DESC_PREF.trim() + '</td>'
                + '   <td>' + tabla[i].AUT_DIAN.trim() + '</td>'
                + '   <td>' + masked.resolve(tabla[i].FECHA.trim().toString()) + '</td>'
                + '   <td>' + tabla[i].DESDE_NRO.trim() + '</td>'
                + '   <td>' + tabla[i].HASTA_NRO.trim() + '</td>'
                + '   <td>' + tabla[i].VIGENCIA.trim() + '</td>'
                + '   <td>' + tabla[i].SUCURSAL.trim() + '</td>'
                + '   <td>' + tabla[i].CENTRO_COSTO.trim() + '</td>'
                + '   <td>' + tabla[i].ALMACEN.trim() + '</td>'
                + '   <td>' + tabla[i].LISTA_SUC.trim() + '</td>'
                + '</tr>'
            )
        }
    }
    _organizarTabla()
}

function salir_109() {
    CON851P('03', validar_NroPrefijo_109, on_salir_109);
}

function on_salir_109() {
    _inputControl('reset');
    _inputControl('disabled');
    _toggleNav()
}

function _validacionTablaPrefijos_109(orden) {
    validarTabla(
        {
            tabla: '#tablaPrefijos_109',
            orden: orden,
            event_f3: validar_sucPref_109
        },
        tabla_proceso_2,
        function () {
            validar_NroPrefijo_109()
        },
        function () {
            validar_sucPref_109()
        }
    );
}

function tabla_proceso_2(datos) {
    var nroPrefijo = cerosIzq(datos.cells[0].textContent, 6)
    var busqueda = _consultarArray_109(nroPrefijo)
    console.log(nroPrefijo + '        ' + busqueda)
    mostrarFilaPrefijo_109(busqueda.array)
    validar_NroPrefijo_109()
}

// function mostrarFilaPrefijo_109(datos) {
//     tabladatos = datos;
//     $('#nroPrefijo_109').val(datos.cells[0].textContent);
//     $('#prefijo_109').val(datos.cells[1].textContent);
//     $('#descripPref_109').val(datos.cells[2].textContent);
//     $('#autDian_109').val(datos.cells[3].textContent);
//     // $('#fechaPrefijo_109').val(datos.cells[4].textContent);
//     momentMaskFecha.typedValue = datos.cells[4].textContent;
//     $('#nroDesde_109').val(datos.cells[5].textContent);
//     $('#nroHasta_109').val(datos.cells[6].textContent);
//     $('#vigencia_109').val(datos.cells[7].textContent);
//     $('#suc_109').val(datos.cells[8].textContent);
//     $('#centroCosto_109').val(datos.cells[9].textContent);
//     $('#almacen_109').val(datos.cells[10].textContent);
//     $('#listaEnvio_109').val(datos.cells[11].textContent);
// }

function mostrarFilaPrefijo_109(datos) {
    $('#nroPrefijo_109').val(datos.NRO.trim().slice(-2));
    $('#prefijo_109').val(datos.PREFIJO.trim());
    $('#descripPref_109').val(datos.DESC_PREF.trim());
    $('#autDian_109').val(datos.AUT_DIAN.trim());
    momentMaskFecha.typedValue = datos.FECHA.trim()
    $('#nroDesde_109').val(datos.DESDE_NRO.trim());
    $('#nroHasta_109').val(datos.HASTA_NRO.trim());
    $('#vigencia_109').val(datos.VIGENCIA.trim());
    $('#suc_109').val(datos.SUCURSAL.trim());
    $('#centroCosto_109').val(datos.CENTRO_COSTO.trim());
    $('#almacen_109').val(datos.ALMACEN.trim());
    $('#listaEnvio_109').val(datos.LISTA_SUC.trim());
    validarChecked('#POS_109', datos.POS.trim())
}


function validar_NroPrefijo_109() {

    validarInputs(
        {
            form: "#validar_NRO_prefijo109",
            orden: '1'
        },
        function () { salir_109() },
        function () {
            var numeroPref = cerosIzq($('#nroPrefijo_109').val(), 6)

            var busqueda = _consultarArray_109(numeroPref)

            if (busqueda) {
                console.debug("consulta")
                mostrarFilaPrefijo_109(busqueda.array)
            } else {
                console.debug(" else")
                $('#nroPrefijo_109').val(numeroPref.slice(-2));
                $('#prefijo_109').val('');
                $('#descripPref_109').val('');
                $('#autDian_109').val('');
                $('#fechaPrefijo_109').val('');
                $('#nroDesde_109').val('');
                $('#nroHasta_109').val('');
                $('#vigencia_109').val('');
                $('#suc_109').val('');
                $('#centroCosto_109').val('');
                $('#almacen_109').val('');
                $('#listaEnvio_109').val('');
            }
            validar_Prefijo_109()
        }
    )
}

function validar_Prefijo_109() {

    validarInputs(
        {
            form: "#validarPrefijo_109",
            orden: '1'
        },
        function () { validar_NroPrefijo_109() },
        function () {
            var nro = cerosIzq($('#nroPrefijo_109').val(), 6)
            var prefijo = $('#prefijo_109').val();

            if (prefijo.length < 1) {
                var busqueda = _consultarArray_109(nro)
                console.log(busqueda)
                if (busqueda) {
                    arrayPrefijos_109[0].TABLA[busqueda.index].ESTADO = '9'
                    $("#tablaPrefijos_109 tbody").empty();
                    mostrarDatos_tabla_109()

                    limpiarInputs()
                    _validacionTablaPrefijos_109('0');
                } else {
                    CON851('03', '03', null, 'error', 'error');
                    validar_Prefijo_109()
                }
            } else {
                validar_Descripcion_109()
            }


        }
    )
}

function limpiarInputs() {
    $('#nroPrefijo_109').val('');
    $('#prefijo_109').val('');
    $('#descripPref_109').val('');
    $('#autDian_109').val('');
    $maskFecha_109 = undefined
    $('#nroDesde_109').val('');
    $('#nroHasta_109').val('');
    $('#vigencia_109').val('');
    $('#suc_109').val('');
    $('#centroCosto_109').val('');
    $('#almacen_109').val('');
    $('#listaEnvio_109').val('');
}

function validar_Descripcion_109() {
    validarInputs(
        {
            form: "#validarDescripPref_109",
            orden: '1'
        },
        function () { validar_Prefijo_109() },
        function () {
            validar_AutDian_109()
        }
    )
}

function validar_AutDian_109() {
    validarInputs(
        {
            form: "#validarAutDian_109",
            orden: '1'
        },
        function () { validar_Descripcion_109() },
        function () {
            validar_Fecha_109()
        }
    )
}

function validar_Fecha_109() {
    validarInputs(
        {
            form: "#validarFecha_109",
            orden: '1'
        },
        function () { validar_AutDian_109() },
        function () {
            validar_DesdeNro_109()
        }
    )
}

function validar_DesdeNro_109() {
    validarInputs(
        {
            form: "#validarDesde_109",
            orden: '1'
        },
        function () { validar_Fecha_109() },
        function () {
            var desde = cerosIzq($('#nroDesde_109').val(), 9)
            var fecha = $('#fechaPrefijo_109').val()

            if ((fecha.length > 0) && (desde == 0)) {
                CON851('03', '03', null, 'error', 'error');
                validar_DesdeNro_109()
            } else {
                $('#nroDesde_109').val(desde)
                validar_HastaNro_109()
            }
        }
    )
}

function validar_HastaNro_109() {
    validarInputs(
        {
            form: "#validarHasta_109",
            orden: '1'
        },
        function () { validar_DesdeNro_109() },
        function () {
            var desde = cerosIzq($('#nroDesde_109').val(), 9)
            var hasta = cerosIzq($('#nroHasta_109').val(), 9)
            var fecha = $('#fechaPrefijo_109').val()

            if (fecha.length > 0) {
                if ((hasta < desde) || (hasta == 0)) {
                    CON851('03', '03', null, 'error', 'error');
                    validar_HastaNro_109()
                } else {
                    $('#nroHasta_109').val(hasta)
                    validar_Vigencia_109()
                }
            } else {
                $('#nroHasta_109').val(hasta)
                validar_Vigencia_109()
            }
        }
    )
}

function validar_Vigencia_109() {
    validarInputs(
        {
            form: "#validarVigencia_109",
            orden: '1'
        },
        function () { validar_HastaNro_109() },
        function () {
            var vigencia = $('#vigencia_109').val()

            if ((vigencia.length == 0) || (vigencia == 0)) {
                jAlert({ titulo: 'Atencion ', mensaje: 'Vigencia debe ser mayor a cero' }, validar_Vigencia_109);
            } else {
                $('#vigencia_109').val(cerosIzq(vigencia, 3))
                validar_Sucursal_109()
            }
        }
    )
}

function validar_Sucursal_109() {
    validarInputs(
        {
            form: "#validarSuc_109",
            orden: '1'
        },
        function () { validar_Vigencia_109() },
        function () {
            var sucursal = $('#suc_109').val()
            $('#suc_109').val(cerosIzq(sucursal, 2))

            if ((sucursal == 01) || (sucursal == 2)) {
                validar_Costo_109()
            } else {
                validar_Sucursal_109()
            }
        }
    )
}

function validar_Costo_109() {
    validarInputs(
        {
            form: "#validarCC_109",
            orden: '1'
        },
        function () { validar_Sucursal_109() },
        function () {
            var C_costo = $('#centroCosto_109').val()

            if (C_costo.length < 1) {
                console.log('entro a cc')
                validar_Almacen_109()
            } else {
                busquedaCosto_109(cerosIzq(C_costo, 4))
            }
        }
    )
}

function busquedaCosto_109(costo) {
    _consultaSql({
        sql: `SELECT * FROM sc_archcos WHERE codigo LIKE '${costo}%'`,
        db: $CONTROL,
        callback: function (error, results, fields) {
            console.log(results)
            if (error) throw error;
            else {
                var datos = results[0]
                if (results.length > 0) {
                    $('#centroCosto_109').val(datos.codigo.trim())
                    $('#descrip_global_109').val(datos.nombre.trim())
                    validar_Almacen_109()
                } else {
                    $('#descrip_global_109').val('***************')
                    validar_Costo_109()
                }
            }
        }
    })
}

function validar_Almacen_109() {
    validarInputs(
        {
            form: "#validarAlmacen_109",
            orden: '1'
        },
        function () { validar_Costo_109() },
        function () {
            var almacen = $('#almacen_109').val()

            if (almacen == "XXXXX") {
                $('#descrip_global_109').val('       ')
                validar_lista_109()
            } else {
                busquedaAlmacen_109(almacen)
            }

        }
    )
}


function busquedaAlmacen_109(almacen) {
    _consultaSql({
        sql: `SELECT * FROM sc_almac WHERE codigo LIKE '${almacen}%'`,
        db: $CONTROL,
        callback: function (error, results, fields) {
            if (error) throw error;
            else {
                var datos = results[0]
                if (results.length > 0) {
                    $('#almacen_109').val(datos.codigo.trim())
                    $('#descrip_global_109').val(datos.nombre.trim())
                    validar_lista_109()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    validar_Almacen_109()
                }
            }
        }
    })
}

function validar_lista_109() {
    validarInputs(
        {
            form: "#validarLista_Env_109",
            orden: '1'
        },
        function () { validar_Almacen_109() },
        function () {
            var lista = cerosIzq($('#listaEnvio_109').val(), 2)
            busquedaSucursal_109(lista)
        }
    )
}

function busquedaSucursal_109(sucursal) {
    _consultaSql({
        sql: `SELECT * FROM sc_sucur WHERE cod_sucur LIKE '${sucursal}%'`,
        db: 'datos_pros',
        callback: function (error, results, fields) {
            if (error) throw error;
            else {
                var datos = results[0]
                if (results.length > 0) {
                    $('#listaEnvio_109').val(datos.cod_sucur.trim())
                    $('#descrip_global_109').val(datos.descrip_sucur.trim())
                    agregarFilaTabla()
                } else {
                    if (sucursal == '01') {
                        agregarFilaTabla()
                    } else {
                        CON851('01', '01', null, 'error', 'error');
                        validar_Almacen_109()
                    }
                }
            }
        }
    })
}

function _consultarArray_109(nro) {
    var retornar = false;
    nro = nro.toString();

    for (var i in arrayPrefijos_109[0].TABLA) {
        if (arrayPrefijos_109[0].TABLA[i].NRO == nro) {
            retornar = {
                index: i,
                array: arrayPrefijos_109[0].TABLA[i]
            }
        }
    }
    return retornar;
}

function buscaren_tabla_109(nro) {
    var filas = $('#tablaPrefijos_109 tbody tr td:first-child'),
        coincidencia = false,
        fila;

    for (let i = 0; i < filas.length; i++) {
        let valFila = $(filas[i]).html();
        if (valFila == nro) {
            coincidencia = true;
            fila = $('#tablaPrefijos_109').find('tr:eq(' + (i + 1) + ')');
        }
    }
    return [fila, coincidencia]
}



function agregarFilaTabla() {
    console.log("agregarFilaTabla")
    var nro = cerosIzq($('#nroPrefijo_109').val(), 6)
    var prefijo = espaciosDer($('#prefijo_109').val().trim(), 4)
    var descripcion = espaciosDer($('#descripPref_109').val().trim(), 15)
    var autDian = espaciosDer($('#autDian_109').val().trim(), 15)
    var fecha = $maskFecha_109

    if (fecha == undefined || fecha == "undefinedundefined") {
        fecha = '00000000';
    } else {
        fecha = fecha.split('/');
        fecha = fecha[0] + fecha[1] + fecha[2];
    }
    // fecha = (fecha == undefined) ? '00000000' : fecha;
    var nroDesde = cerosIzq($('#nroDesde_109').val().trim(), 9)
    var nroHasta = cerosIzq($('#nroHasta_109').val().trim(), 9)
    var vigencia = cerosIzq($('#vigencia_109').val().trim(), 3)
    var suc = cerosIzq($('#suc_109').val().trim(), 2)
    var centroCosto = espaciosDer($('#centroCosto_109').val().trim(), 4)
    var almacen = espaciosDer($('#almacen_109').val().trim(), 5)
    var lista = cerosIzq($('#listaEnvio_109').val().trim(), 1)
    var pos
    if ($("#POS_109").prop('checked')) { pos = 'S' } else { pos = 'N' }

    var busqueda = _consultarArray_109(nro)
    console.log(busqueda)

    if (busqueda) {
        arrayPrefijos_109[0].TABLA[busqueda.index] = {
            NRO: nro,
            PREFIJO: prefijo,
            DESC_PREF: descripcion,
            AUT_DIAN: autDian,
            FECHA: fecha,
            DESDE_NRO: nroDesde,
            HASTA_NRO: nroHasta,
            VIGENCIA: vigencia,
            SUCURSAL: suc,
            CENTRO_COSTO: centroCosto,
            ALMACEN: almacen,
            LISTA_SUC: lista,
            POS: pos,   
            ESTADO: '8'
        }
    } else {
        arrayPrefijos_109[0].TABLA.push({
            NRO: nro,
            PREFIJO: prefijo,
            DESC_PREF: descripcion,
            AUT_DIAN: autDian,
            FECHA: fecha,
            DESDE_NRO: nroDesde,
            HASTA_NRO: nroHasta,
            VIGENCIA: vigencia,
            SUCURSAL: suc,
            CENTRO_COSTO: centroCosto,
            ALMACEN: almacen,
            LISTA_SUC: lista,
            POS: pos,
            ESTADO: '7'
        });
    }

    $("#tablaPrefijos_109 tbody").empty();
    $maskFecha_109 = undefined
    mostrarDatos_tabla_109()
    _validacionTablaPrefijos_109('0');
}


function validar_sucPref_109() {
    validarInputs(
        {
            form: "#validarSucPrefNro_109",
            orden: '1'
        },
        function () { _validacionTablaPrefijos_109('0') },
        function () {
            var fpref = cerosIzq($('#sucPrefNro_109').val(), 2)

            switch (fpref) {
                case '01':
                case '02':
                case '03':
                case '04':
                case '05':
                case '06':
                case '07':
                case '08':
                    var busqueda = buscaren_tabla_109(fpref)
                    if (busqueda[1]) {
                        var descrip = busqueda[0][0]
                        $('#descrip_global_109').val(descrip.cells[2].textContent);
                        validar_factElect_109()
                    } else {
                        CON851('03', '03', null, 'error', 'error');
                        validar_sucPref_109()
                    }
                    break;
                default:
                    CON851('03', '03', null, 'error', 'error');
                    validar_sucPref_109()
                    break;
            }
        }
    )
}


function validar_factElect_109() {
    var arrayProveedor_Fact_109 = [
        { "COD": "1", "DESCRIP": "Facse" },
        { "COD": "2", "DESCRIP": "Carvajal" },
        { "COD": "3", "DESCRIP": "Novacorp" },
        { "COD": "4", "DESCRIP": "Dispapeles" }
    ]

    POPUP({
        array: arrayProveedor_Fact_109,
        titulo: 'Proveedor facturacion Electronica',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: validar_sucPref_109
    }, function (data) {
        var proveedor = data.COD.trim()
        $('#factElect_109').val(proveedor)
        $('#descripFactElect_109').val(data.DESCRIP.trim())

        console.log(proveedor)
        if (proveedor == '1') {
            popUp_TokenFactElect_109()
        } else {
            _tablatxt_109()
        }
    })

}

function popUp_TokenFactElect_109() {
    var fuente = $('#popUp_TokenFactElect_109').html();
    var dialogo = bootbox.dialog({
        title: "Datos de acceso :",
        message: fuente,
        size: 'extra-large',
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue hidden",
                callback: function () {

                }
            }
        },
    });
    dialogo.init(function () {
        $('.modal-content').css({ 'width': '900px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
        setTimeout(function () {
            var cliente = $('.cliente_token_109')
            $(cliente[1]).val(arrayPrefijos_109[0].CLIENTE_TOKEN.trim())
            var acceso = $('.acceso_token_109')
            $(acceso[1]).val(arrayPrefijos_109[0].ACCESO_TOKEN.trim())
            validar_Cliente_109()
        }, 400);
    })
}

function validar_Cliente_109() {
    validarInputs(
        {
            form: "#validarClienteToken_109",
            orden: '1'
        },
        function () {
            bootbox.hideAll()
            validar_factElect_109()
        },
        function () {
            var cliente = $('.cliente_token_109')
            $_Token_Cliente_109 = espaciosDer($(cliente[1]).val(), 80)
            validar_Acceso_109()
        }
    )
}

function validar_Acceso_109() {
    validarInputs(
        {
            form: "#validarAccesoToken_109",
            orden: '1'
        },
        function () { validar_Cliente_109() },
        function () {
            var acceso = $('.acceso_token_109')
            $_Token_Acceso_109 = espaciosDer($(acceso[1]).val(), 80)
            console.log($_Token_Acceso_109)
            bootbox.hideAll()
            _tablatxt_109()
        }
    )
}

function _tablatxt_109() {
    var tablaTXT = '';
    loader('show');
    arrayPrefijos_109[0].TABLA.forEach(function (tabla) {
        var nro = tabla.NRO
        var prefijo = tabla.PREFIJO
        var descripcion_prefijo = tabla.DESC_PREF
        var autorizacion_Dian = tabla.AUT_DIAN
        var fecha = tabla.FECHA
        var desde_Nro = tabla.DESDE_NRO
        var hasta_Nro = tabla.HASTA_NRO
        var vigencia = tabla.VIGENCIA
        var suc = tabla.SUCURSAL
        var centro_Costo = tabla.CENTRO_COSTO
        var almacen = tabla.ALMACEN
        var precios = tabla.LISTA_SUC
        var pos = tabla.POS
        var estado = tabla.ESTADO

        if (estado == '1' || estado == '7' || estado == '8') {
            tablaTXT += nro + '|'
                + prefijo + ';'
                + descripcion_prefijo + ';'
                + autorizacion_Dian + ';'
                + fecha + ';'
                + desde_Nro + ';'
                + hasta_Nro + ';'
                + vigencia + ';'
                + suc + ';'
                + centro_Costo + ';'
                + almacen + ';'
                + precios + ';'
                + pos + ';'
                + '\r\n';
        }

        var nro_sql = nro.trim().slice(-2)
        console.log(estado)
        if (estado == '7') {

            SQL_INSERT += `('${nro_sql}', '${prefijo}', '${descripcion_prefijo}')` + ","

        } else if (estado == '8') {
            console.log(SQL_UPDATE)
            SQL_UPDATE += `UPDATE sc_archpref SET codigo='${prefijo}',descripcion='${descripcion_prefijo}' WHERE id = '${nro_sql}' ;`
            console.log(SQL_UPDATE)
        } else if (estado == '9') {

            SQL_DELETE += `${nro_sql},`
        }
    });

    var $_NOMBRE = localStorage.Usuario + '_' + moment().format('YYYYMMDDhhmmssSS');
    var nombre_archivo = 'C:\\PROSOFT\\TEMP\\' + $_NOMBRE + '.txt';
    fs.writeFile(nombre_archivo, tablaTXT, function (err) {
        if (err) {
            loader('hide');
            jAlert({ titulo: 'Error 99', mensaje: 'Error escribiendo archivo txt', autoclose: true });
        }
        else {
            var txt_nombre = nombre_archivo;
            console.log(txt_nombre)
            _grabardatos(txt_nombre);
        }
    });
}

function _grabardatos(txt_nombre) {
    var sucFactPref = $('#sucPrefNro_109').val()
    var factElect = $('#factElect_109').val()

    LLAMADO_DLL({
        dato: [sucFactPref, factElect, txt_nombre, $_Token_Cliente_109, $_Token_Acceso_109],
        callback: sql_check_109,
        nombredll: 'INV109-02',
        carpeta: 'INVENT'
    });
}

function buscarEstadoArray_109(estado) {
    var retornar = false
    for (var i in arrayPrefijos_109[0].TABLA) {
        if (arrayPrefijos_109[0].TABLA[i].ESTADO == estado) {
            retornar = true
        }
    }
    return retornar;
}

function sql_check_109(data) {
    console.log(data)
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        var estadoNuevo = buscarEstadoArray_109('7')
        console.log(estadoNuevo)
        var estadoCambio = buscarEstadoArray_109('8')
        console.log(estadoCambio)
        var estadoRetiro = buscarEstadoArray_109('9')
        console.log(estadoRetiro)

        var crear = true
        var modificar = true
        var eliminar = true

        if (estadoNuevo) {
            crear = baseDatos_109(SQL_INSERT, '7')
        }

        if (estadoCambio) {
            modificar = baseDatos_109(SQL_UPDATE, '8')
        }

        if (estadoRetiro) {
            eliminar = baseDatos_109(SQL_DELETE, '9')
        }


        if (crear == false || modificar == false || eliminar == false) {
            loader('hide');
            error_sql_109()
        } else {
            jAlert({ titulo: 'Notificacion', mensaje: 'LA OPERACION FUE EXITOSA !' },
                function () {
                    loader('hide');
                    limpiarTodo_109();
                    console.log('fin del programa')
                });
        }
    } else {
        loader('hide');
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}

function error_sql_109() {
    jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR GUARDANDO LOS CAMBIOS' },
        function () {
            limpiarTodo_109();
        });
}

function limpiarTodo_109() {
    limpiarInputs()
    $("#tablaPrefijos_109 tbody").empty();
    _toggleNav()
}

function baseDatos_109(sql, estado) {
    var retornar
    if (estado == '9') {
        sql = sql.slice(0, -1)
        sql += ')'
    } else if (estado == '7') {
        sql = sql.slice(0, -1)
    }
    console.log(sql)
    _consultaSql({
        sql: sql,
        db: $CONTROL,
        callback: function (error, results, fields) {
            if (error) throw error;
            else {
                console.log(results)
                if (results.affectedRows > 0) {
                    retornar = true
                } else {
                    retornar = false
                }
            }
        }
    })
    return retornar
}

function _organizarTabla() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tablaPrefijos_109");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}