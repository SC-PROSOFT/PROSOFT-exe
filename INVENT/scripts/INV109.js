var arrayPrefijos_109 = [];
var $maskFecha_109
var $_TABLA_BASE_DATOS = []

var $_Token_Cliente_109;
var $_Token_Acceso_109
var $prueba_token

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
        { input: 'almacen', app: '109', funct: _ventanaAlmacen_109 }
    ]);
    json_Prefijos_inv109()
});

function _ventanaCentroCosto_109(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana centro de costos',
            columnas: ["COD", "NOMBRE"],
            data: arrayCostos_109,
            callback_esc: function () {
                $('#centroCosto_109').focus()
            },
            callback: function (data) {
                console.log(data)
                $('#centroCosto_109').val(data.COD);
                _enterInput('#centroCosto_109');
            }
        });
    }
}

function _ventanaAlmacen_109(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana de Almacenes',
            columnas: ["CODIGO", "DESCRIPCION", "RESPONSABLE"],
            data: arrayAlmacenes_109,
            callback_esc: function () {
                $('#almacen_109').focus()
            },
            callback: function (data) {
                console.log(data)
                $('#almacen_109').val(data.CODIGO);
                _enterInput('#almacen_109');
            }
        });
    }
}

function json_Prefijos_inv109() {
    obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, recibirPrefijos_109)
}

function recibirPrefijos_109(data) {
    console.log(data)
    arrayPrefijos_109 = data.PREFIJOS
    arrayPrefijos_109[0].TABLA.pop()
    obtenerDatosCompletos({ nombreFd: 'COSTOS' }, recibirCostos_109)
}

function recibirCostos_109(data) {
    arrayCostos_109 = data.COSTO
    arrayCostos_109.pop()
    obtenerDatosCompletos({ nombreFd: 'LOCALIZACION' }, recibirAlmacenes_109)
}

function recibirAlmacenes_109(data) {
    arrayAlmacenes_109 = data.LOCALIZACION
    arrayAlmacenes_109.pop()
    mostrarDatos_tabla_109()
    setTimeout(() => {
        validar_NroPrefijo_109()
    }, 200);
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
            $('#descripFactElect_109').val('Ekomercio')
            break;
        case '5':
            $('#descripFactElect_109').val('Emision')
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
        if (tabla[i].ESTADO == '1') {
            var fechaLlegada = tabla[i].FECHA
            if (fechaLlegada == "00000000") {
                fechaLlegada = ''
            } else {
                fechaLlegada = masked.resolve(tabla[i].FECHA.trim().toString())
            }
            $('#tablaPrefijos_109 tbody').append(''
                + '<tr>'
                + '   <td>' + tabla[i].NRO.trim().slice(-2) + '</td>'
                + '   <td>' + tabla[i].PREFIJO.trim() + '</td>'
                + '   <td>' + tabla[i].DESC_PREF.trim() + '</td>'
                + '   <td>' + tabla[i].AUT_DIAN.trim() + '</td>'
                + '   <td>' + fechaLlegada + '</td>'
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
    limpiarTodo_109()
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

function mostrarFilaPrefijo_109(datos) {
    $('#nroPrefijo_109').val(datos.NRO.trim().slice(-2));
    $('#prefijo_109').val(datos.PREFIJO.trim());
    $('#descripPref_109').val(datos.DESC_PREF.trim());
    $('#autDian_109').val(datos.AUT_DIAN.trim());
    if (datos.FECHA.trim() != '00000000'){
        momentMaskFecha.typedValue = datos.FECHA.trim()
    } else {
        $('#fechaPrefijo_109').val('')
    }
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
            orden: '1',
            event_f3: function () { _validacionTablaPrefijos_109('0') }
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
    validarChecked('#POS_109', 'N')
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
            var fechaDig = $('#fechaPrefijo_109').val()

            if (fechaDig.trim().length < 1) {
                $('#fechaPrefijo_109').val('')
                validar_DesdeNro_109()
            } else {
                validar_DesdeNro_109()
            }
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
                validar_Almacen_109()
            } else {
                var busqueda = arrayCostos_109.find(costo => costo.COD == cerosIzq(C_costo, 4))
                console.log(busqueda)
                if (busqueda) {
                    $('#centroCosto_109').val(busqueda.COD)
                    $('#descrip_global_109').val(busqueda.NOMBRE)
                    validar_Almacen_109()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    $('#descrip_global_109').val('***************')
                    validar_Costo_109()
                }
            }
        }
    )
}

function validar_Almacen_109() {
    validarInputs(
        {
            form: "#validarAlmacen_109",
            orden: '1'
        },
        function () { validar_Costo_109() },
        function () {
            var almacenDig = $('#almacen_109').val()

            if (almacenDig == "XXXXX") {
                $('#descrip_global_109').val('       ')
                validar_lista_109()
            } else {
                var busqueda = arrayAlmacenes_109.find(almacen => almacen.CODIGO == almacenDig)

                if (busqueda) {
                    $('#descrip_global_109').val(busqueda.DESCRIPCION)
                    validar_lista_109()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    $('#descrip_global_109').val('***************')
                    validar_Almacen_109()
                }
            }

        }
    )
}

function validar_lista_109() {
    console.log('entro a lista')
    validarInputs(
        {
            form: "#validarLista_Env_109",
            orden: '1'
        },
        function () { validar_Almacen_109() },
        function () {
            var lista = $('#listaEnvio_109').val()

            if (lista == '1') {
                agregarFilaTabla()
            } else {
                CON851('03', '03', null, 'error', 'error');
                validar_lista_109()
            }
        }
    )
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
    var fecha
    var fechaDig = $('#fechaPrefijo_109').val().trim()
    if (fechaDig.length < 1) {
        fecha = ''
    } else {
        fecha = $maskFecha_109
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
            ESTADO: '1'
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
            ESTADO: '1'
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
        { "COD": "4", "DESCRIP": "Ekomercio" },
        { "COD": "5", "DESCRIP": "Emision" }
    ]

    POPUP({
        array: arrayProveedor_Fact_109,
        titulo: 'Proveedor facturacion Electronica',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: validar_sucPref_109,
        seleccion: arrayPrefijos_109[0].PROV_FACT_ELECT
    }, function (data) {
        var proveedor = data.COD.trim()
        $('#factElect_109').val(proveedor)
        $('#descripFactElect_109').val(data.DESCRIP.trim())

        console.log(proveedor)
        if (proveedor == '1' || proveedor == '4' || proveedor == '5') {
            popUp_TokenFactElect_109()
        } else {
            _tablatxt_109()
        }
    })

}

function popUp_TokenFactElect_109() {
    var fuente = $('#popUp_TokenFactElect_109').html();
    var dialogo2 = bootbox.dialog({
        title: "Datos de acceso :",
        message: fuente,
        closeButton: false,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue hidden",
                callback: function () {

                }
            }
        },
    });
    // dialogo.init(function(){console.log('entro')})
    dialogo2.on('shown.bs.modal', function (e) {
        console.log('entro a token')
        $('.modal-content').css({ 'width': '900px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
        setTimeout(function () {
            var token_prueba = $('.token_prueba_109')
            validarChecked(token_prueba[1], arrayPrefijos_109[0].PRUEBA_TOKEN.trim())
            var cliente = $('.cliente_token_109')
            $(cliente[1]).val(arrayPrefijos_109[0].CLIENTE_TOKEN.trim())
            var acceso = $('.acceso_token_109')
            $(acceso[1]).val(arrayPrefijos_109[0].ACCESO_TOKEN.trim())
            validar_Cliente_109()
        }, 400);
    });

    // dialogo2.init(function () {
    // $('.modal-content').css({ 'width': '900px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
    // setTimeout(function () {
    //     var cliente = $('.cliente_token_109')
    //     $(cliente[1]).val(arrayPrefijos_109[0].CLIENTE_TOKEN.trim())
    //     var acceso = $('.acceso_token_109')
    //     $(acceso[1]).val(arrayPrefijos_109[0].ACCESO_TOKEN.trim())
    //     validar_Cliente_109()
    // }, 400);
    // })
}

function validar_Cliente_109() {
    validarInputs(
        {
            form: "#validarClienteToken_109",
            orden: '1'
        },
        function () {
            $('[data-bb-handler="main"]').click();
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
            var token_prueba = $('.token_prueba_109')
            if ($(token_prueba[1]).prop('checked')) { $prueba_token = 'S' } else { $prueba_token = 'N' }
            console.log($_Token_Acceso_109)
            $('[data-bb-handler="main"]').click();
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
        if (fecha == '') {
            fecha = '00000000'
        }
        var desde_Nro = tabla.DESDE_NRO
        var hasta_Nro = tabla.HASTA_NRO
        var vigencia = tabla.VIGENCIA
        var suc = tabla.SUCURSAL
        var centro_Costo = tabla.CENTRO_COSTO
        var almacen = tabla.ALMACEN
        var precios = tabla.LISTA_SUC
        var pos = tabla.POS
        var estado = tabla.ESTADO

        if (estado == '1') {
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

        // var nro_sql = nro.trim().slice(-2)
        // console.log(estado)
        // if (estado == '7') {

        //     SQL_INSERT += `('${nro_sql}', '${prefijo}', '${descripcion_prefijo}')` + ","

        // } else if (estado == '8') {

        //     SQL_UPDATE += `UPDATE sc_archpref SET cod_pref='${prefijo}',descrip_pref='${descripcion_prefijo}' WHERE id = '${nro_sql}' ;`

        // } else if (estado == '9') {

        //     SQL_DELETE += `${nro_sql},`
        // }
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

    var envio_Datos_109 = datosEnvio()
    envio_Datos_109 += sucFactPref
    envio_Datos_109 += '|'
    envio_Datos_109 += factElect
    envio_Datos_109 += '|'
    envio_Datos_109 += txt_nombre
    envio_Datos_109 += '|'
    envio_Datos_109 += $_Token_Cliente_109
    envio_Datos_109 += '|'
    envio_Datos_109 += $_Token_Acceso_109
    envio_Datos_109 += '|'
    envio_Datos_109 += $prueba_token
    envio_Datos_109 += '|'

    let URL = get_url("APP/INVENT/INV109-02.DLL");

    postData({
        datosh: envio_Datos_109
    }, URL)
        .then((data) => {
            console.log(data)
            jAlert(
                { titulo: 'INV109-02', mensaje: data },
                reInicio_109
            );
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });

    // LLAMADO_DLL({
    //     dato: [sucFactPref, factElect, txt_nombre, $_Token_Cliente_109, $_Token_Acceso_109, $prueba_token],
    //     callback: limpiarTodo_109,
    //     nombredll: 'INV109-02',
    //     carpeta: 'INVENT'
    // });
}

function reInicio_109() {
    limpiarTodo_109()
    json_Prefijos_inv109()
}

function limpiarTodo_109() {
    loader('hide')
    limpiarInputs()
    $("#tablaPrefijos_109 tbody").empty();
    arrayAlmacenes_109 = []
    arrayCostos_109 = []
    arrayPrefijos_109 = []
    $_Token_Cliente_109 = ''
    $_Token_Acceso_109 = ''
    $prueba_token = ''
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