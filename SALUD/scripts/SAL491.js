var global_SAL491 = []
var tarifas_SAL491 = []
var llave_SAL491 = {
    'SUC': '',
    'CL': '',
    'NRO': '',
}
var numeracion_491 = []
var claseServicio_491 = [
    { "codigo": "0", "descripcion": "DROGUERIA" },
    { "codigo": "1", "descripcion": "CIRUGIAS" },
    { "codigo": "2", "descripcion": "LAB. Y OTROS DIAG." },
    { "codigo": "3", "descripcion": "RX - IMAGENOLOGIA" },
    { "codigo": "4", "descripcion": "OTROS SERVICIOS" },
    { "codigo": "5", "descripcion": "CONSULTAS Y TERAPIAS" },
    { "codigo": "6", "descripcion": "PATOLOGIA" },
    { "codigo": "7", "descripcion": "PROMOCION Y PREVENCION" }]

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    _toggleF8([
        { input: 'claseservicio', app: 'SAL491', funct: _ventanaClases_491 },
        { input: 'comprob', app: 'SAL491', funct: _ventanaIdHistoria_491 },
        { input: 'factura', app: 'SAL491', funct: _ventanaFormapago_491 },
        { input: 'facturad', app: 'SAL491', funct: _ventanaFacturas_491 },
    ]);
    global_SAL491['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    global_SAL491['ADMIN_W'] = localStorage.getItem('Usuario').trim() ? localStorage.getItem('Usuario').trim() : false;
    global_SAL491['NITUSU'] = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0');

    obtenerDatosCompletos({ nombreFd: 'TARIFAS' }, function (data) {
        tarifas_SAL491 = data.TARIFAS;
        tarifas_SAL491.pop()
        console.log(tarifas_SAL491)
        inicio_sal491()
    }, 'ONLY');
})

function _ventanaFacturas_491(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var numerFiltrado = numeracion_491.filter(numer => numer.PREFIJO == global_SAL491.PREFIJO)

        _ventanaDatos({
            titulo: "VENTANA DE FACTURAS",
            columnas: ["COD", "DESCRIP", "NOM_PAC", "HABITAC", "FECHA_ING", "CONVENIO"],
            data: numerFiltrado,
            ancho: '70%',
            callback_esc: function () {
                $("#facturad_SAL491").focus();
            },
            callback: function (data) {
                $('#facturad_SAL491').val(data.COD.slice(1));
                _enterInput('#facturad_SAL491');
            }
        });
    }
}

function _ventanaFormapago_491(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE PAGO",
            columnas: ["CODIGO", "DESCRIPCION"],
            data: [
                { 'CODIGO': 'E', 'DESCRIPCION': 'EFECTIVO' },
                { 'CODIGO': 'C', 'DESCRIPCION': 'CREDITO' },
                { 'CODIGO': 'P', 'DESCRIPCION': 'PENSIONADO' },
                { 'CODIGO': 'A', 'DESCRIPCION': 'AMBULATORIO' },
                { 'CODIGO': 'T', 'DESCRIPCION': 'ACC.TRANS.' }
            ],
            callback_esc: function () {
                $("#factura_SAL491").focus();
            },
            callback: function (data) {
                $('#factura_SAL491').val(data.CODIGO.trim());
                _enterInput('#factura_SAL491');
            }
        });
    }
}

function _ventanaClases_491(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'TIPO DE SERVICIO',
            columnas: ["codigo", "descripcion"],
            data: claseServicio_491,
            callback_esc: function () {
                $('#claseservicio_SAL491').focus()
            },
            callback: function (data) {
                $('#claseservicio_SAL491').val(data.codigo)
                _enterInput('#claseservicio_SAL491');
            }
        });
    }
}

function _ventanaIdHistoria_491(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        set_Event_validar('#COMPR_491', 'off')
        SER825(nroComprob_491, mostrarDatosCompletos_SAL491, '1')
    }
}

function cerrarArchivos_491() {
    _inputControl("reset");
    _inputControl("disabled");
    claseServicio_491 = []
    llave_SAL491 = []
    global_SAL491 = []
    numeracion_491 = []
    _toggleNav()
}

function inicio_sal491() {
    var datos_envio_491 = datosEnvio()
    datos_envio_491 += global_SAL491.ADMIN_W
    datos_envio_491 += '|'

    let URL = get_url("app/CONTAB/CON003.DLL");

    postData({
        datosh: datos_envio_491
    }, URL)
        .then((data) => {
            loader("hide")
            var date = data.split('|');
            global_SAL491['NOMBRE_OPER'] = date[0].trim();
            global_SAL491['IDENT_OPER'] = date[1].trim();
            global_SAL491['SUC_OPER'] = date[2].trim();
            datoSucursal_491()
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}

function datoSucursal_491() {
    if (global_SAL491.PREFIJOUSU == "  ") {
        global_SAL491.PREFIJOUSU = "00";
        claseServicio_SAL491();
    }

    if ((global_SAL491.ADMIN_W == "GEBC") || (global_SAL491.ADMIN_W == "ADMI")) {
        $('#unidades_SAL491').val(global_SAL491.PREFIJOUSU)
        claseServicio_SAL491();
    }
    else {
        switch (global_SAL491.NITUSU) {
            // ESE SALUD YOPAL
            case "0844003225":
                if ((global_SAL491.SUC_OPER == "JL") || (global_SAL491.SUC_OPER == "CA") || (global_SAL491.SUC_OPER == "CS") || (global_SAL491.SUC_OPER == "PV") || (global_SAL491.SUC_OPER == "BC") || (global_SAL491.SUC_OPER == "LC") || (global_SAL491.SUC_OPER == "CV") || (global_SAL491.SUC_OPER == "HT") || (global_SAL491.SUC_OPER == "EM") || (global_SAL491.SUC_OPER == "HY") || (global_SAL491.SUC_OPER == "TL") || (global_SAL491.SUC_OPER == "MR")) {
                    global_SAL491.PREFIJOUSU = global_SAL491.SUC_OPER
                }
                else {
                    CON851('48', '48', null, 'error', 'error');
                    cerrarArchivos_491()
                }
                break;
            // SERVIMEDICOS
            case "0800162035":
                if ((global_SAL491.SUC_OPER == "01") || (global_SAL491.SUC_OPER == "03") || (global_SAL491.SUC_OPER == "05") || (global_SAL491.SUC_OPER == "06") || (global_SAL491.SUC_OPER == "07") || (global_SAL491.SUC_OPER == "08") || (global_SAL491.SUC_OPER == "10") || (global_SAL491.SUC_OPER == "11") || (global_SAL491.SUC_OPER == "12") || (global_SAL491.SUC_OPER == "14") || (global_SAL491.SUC_OPER == "15")) {
                    global_SAL491.PREFIJOUSU = global_SAL491.SUC_OPER
                }
                else {
                    CON851('48', '48', null, 'error', 'error');
                    cerrarArchivos_491()
                }
                break;
            // FAMEDIC
            case "0900405505":
                if ((global_SAL491.SUC_OPER == "01") || (global_SAL491.SUC_OPER == "02") || (global_SAL491.SUC_OPER == "03") || (global_SAL491.SUC_OPER == "04") || (global_SAL491.SUC_OPER == "05") || (global_SAL491.SUC_OPER == "06")) {
                    global_SAL491.PREFIJOUSU = global_SAL491.SUC_OPER
                }
                else {
                    CON851('48', '48', null, 'error', 'error');
                    cerrarArchivos_491()
                }
                break;
        }

    }
    $('#unidades_SAL491').val(global_SAL491.PREFIJOUSU)
    llave_SAL491.SUC_W = global_SAL491.PREFIJOUSU
    claseServicio_SAL491();
}

function sucursal_SAL491() {
    validarInputs(
        {
            form: '#SU_491',
            orden: '1'
        },
        function () {
            cerrarArchivos_491();
        },
        function () {
            llave_SAL491.SUC_W = $('#unidades_SAL491').val()
            claseServicio_SAL491()
        }
    )
}

function claseServicio_SAL491() {
    validarInputs(
        {
            form: '#SERVICE_491',
            orden: '1'
        },
        function () {
            cerrarArchivos_491();
        },
        function () {
            llave_SAL491.CL_W = $('#claseservicio_SAL491').val()
            llave_SAL491.CL_W = llave_SAL491.CL_W.split('')
            llave_SAL491.CL_W = llave_SAL491.CL_W[0]

            if ((llave_SAL491.CL_W == 0) && ($_USUA_GLOBAL[0].SEG-MOV == "3")) {
                CON851B($_USUA_GLOBAL[0].SEG-MOV);
                sucursal_SAL491()
            } else {
                var Servicio = claseServicio_491.find(servicio => servicio.codigo == llave_SAL491.CL_W)

                if (Servicio) {
                    $('#claseservicio_SAL491').val(Servicio.codigo + ' - ' + Servicio.descripcion)
                    nroComprob_491()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    claseServicio_SAL491()
                }
            }
        }
    )
}

function nroComprob_491() {
    validarInputs(
        {
            form: '#COMPR_491',
            orden: '1'
        }, function () {
            claseServicio_SAL491()
        },
        function () {
            llave_SAL491.NRO = cerosIzq($('#comprob_SAL491').val(), 6)
            $('#comprob_SAL491').val(llave_SAL491.NRO)

            var llave_envio = llave_SAL491.SUC_W
            llave_envio += llave_SAL491.CL_W
            llave_envio += llave_SAL491.NRO

            var datos_envio = datosEnvio()
            datos_envio += llave_envio
            datos_envio += '|'

            let URL = get_url("APP/SALUD/SAL450A.DLL");

            postData({
                datosh: datos_envio
            }, URL)
                .then((data) => {
                    global_SAL491 = []
                    $("#TABLA_491 tbody").empty();
                    global_SAL491['ADMIN_W'] = localStorage.getItem('Usuario').trim() ? localStorage.getItem('Usuario').trim() : false;
                    global_SAL491['FACTOR_W'] = ''
                    mostrarDatosCompletos_SAL491(data)
                })
                .catch(error => {
                    console.error(error)
                    nroComprob_491()
                });
        }
    )
}


function mostrarDatosCompletos_SAL491(data) {
    var datos = data.FACTURA[0]
    datos.TABLA.pop()
    global_SAL491 = datos
    console.log(global_SAL491, 'mostrar')

    $('#comprob_SAL491').val(global_SAL491.NRO)
    $('#claseservicio_SAL491').val(global_SAL491.CLASE)
    var clase = global_SAL491.CLASE.split('')
    global_SAL491.CLASE = clase[0]
    $('#comprob_SAL491').val(global_SAL491.NRO)
    $('#fecha_SAL491').val(global_SAL491.FECHA)
    $('#factura_SAL491').val(global_SAL491.PREFIJO)
    $('#facturad_SAL491').val(global_SAL491.NRO_CTA)
    $('#pingreso_SAL491').val(global_SAL491.PUERTA_ESTAD + '.- ' + global_SAL491.DESCRIP_PUERTA)
    $('#cliente_SAL491').val(global_SAL491.NIT)
    $('#cliented_SAL491').val(global_SAL491.DESCRIP_TER)
    $('#paciente_SAL491').val(global_SAL491.ID_PACIENTE)
    $('#paciented_SAL491').val(global_SAL491.DESCRIP_PACI)
    $('#sexo_SAL491').val(global_SAL491.SEXO)
    $('#edad_SAL491').val(global_SAL491.EDAD)
    $('#estrato_SAL491').val(global_SAL491.ESTRATO)
    $('#espec_SAL491').val(global_SAL491.ESPEC)
    $('#despec_SAL491').val(global_SAL491.DESCRIP_ESPEC)
    $('#operElab_SAL491').val(global_SAL491.OPER_ELAB)
    if (global_SAL491.OPER_CORREC.trim().length > 0) {
        $('#operCorrec_SAL491').val(global_SAL491.OPER_CORREC + '-' + global_SAL491.FECHA_CORREC)
    }
    $('#secuCopago_SAL491').val(global_SAL491.SECU_ABON)

    if (global_SAL491.CLASE == '1') {
        var prof = ['CIRUJANO', 'AYUDANTIA', 'ANESTESIOA', 'MAT.QUIRG', 'DERECH.SALA'];
        for (var i in prof) {
            $('#TABLA_491 tbody').append(
                '<tr>' +
                '<td>' + ' ' + '</td>' +
                '<td>' + ' ' + '</td>' +
                '<td>' + ' ' + '</td>' +
                '<td>' + ' ' + '</td>' +
                '<td>' + prof[i] + '</td>' +
                '<td>' + ' ' + '</td>' +
                '<td>' + ' ' + '</td>' +
                '<td>' + ' ' + '</td>' +
                '</tr>'
            )
        }
    } else {
        for (var i in global_SAL491.TABLA) {
            if (global_SAL491.TABLA[i].ARTICULO.trim().length > 0) {
                $('#TABLA_491 tbody').append(''
                    + '<tr>'
                    + '   <td>' + global_SAL491.TABLA[i].POSICION + '</td>'
                    + '   <td>' + global_SAL491.TABLA[i].ARTICULO + '</td>'
                    + '   <td>' + global_SAL491.TABLA[i].DESCRIP_ART + '</td>'
                    + '   <td>' + global_SAL491.TABLA[i].ALMACEN + '</td>'
                    + '   <td>' + global_SAL491.TABLA[i].CANTIDAD + '</td>'
                    + '   <td>' + global_SAL491.TABLA[i].UNIDAD + '</td>'
                    + '   <td>' + global_SAL491.TABLA[i].VALOR_UNIT + '</td>'
                    + '   <td>' + global_SAL491.TABLA[i].VALOR_FACT + '</td>'
                    + '</tr>'
                )
            }
        }
    }
    $('#refactura_SAL491').val(global_SAL491.REFACTURA)
    $('#destino_SAL491').val(global_SAL491.DESTINO)
    $('#fechaAten_SAL491').val(global_SAL491.FECHA_ING)
    $('#vlrtot_SAL491').val(global_SAL491.VALOR_BRUTO)
    $('#valoriva_SAL491').val(global_SAL491.VALOR_IVA)
    $('#copagoestimfact_SAL491').val(global_SAL491.COPAGO_ESTIM_PAGO)
    $('#netofact_SAL491').val(global_SAL491.VALOR_TOTAL)

    var fecha_num = $_USUA_GLOBAL[0].FECHALNK
    fecha_num = fecha_num.split('')
    var ano_num = fecha_num[0] + fecha_num[1]
    var mes_num = fecha_num[2] + fecha_num[3]

    var fecha_fact = global_SAL491.FECHA
    fecha_fact = fecha_fact.split('')
    var ano_fact = fecha_fact[2] + fecha_fact[3]
    var mes_fact = fecha_fact[5] + fecha_fact[6]
    // console.log(ano_num + '-' + mes_num + '-' + ano_fact + '-' + mes_fact)
    // if ((ano_num != ano_fact) || (mes_num != mes_fact)) {
    //     CON851('37', '37', null, 'error', 'error');
    //     if (global_SAL491.CLASE == '0') {
    //         CON851('91', '91', null, 'error', 'error');
    //     }
    //     nroComprob_491()
    // } else {
    leer_anterior_491('1')
    // }

}

function leer_anterior_491(orden) {
    if ((global_SAL491.PREFIJO == "E" || global_SAL491.PREFIJO == "C") && (orden == '1')) {
        prefijo_491()
    } else {
        var cta = global_SAL491.PREFIJO + global_SAL491.NRO_CTA
        console.log(cta)

        var datos_envio_491 = datosEnvio()
        datos_envio_491 += cta
        datos_envio_491 += '|'
        let URL = get_url("APP/SALUD/SAL450A-02.DLL");

        postData({
            datosh: datos_envio_491
        }, URL)
            .then((data) => {
                loader("hide")
                numeracion_491 = data.NUMERACION[0]

                console.log(numeracion_491)
                switch (orden) {
                    case '1':
                        anteriorOrden1_491(orden)
                        break;
                    case '2':
                        anteriorOrden2_491(orden)
                        break;
                }

            })
            .catch(error => {
                console.error(error)
                switch (orden) {
                    case '1':
                        nroComprob_491()
                        break;
                    case '2':
                        prefijo_491()
                        break;
                }
            });

    }
}

function anteriorOrden1_491(orden) {
    var ano_sig_fact = moment(global_SAL491.FECHA).format("YYYY")
    var mes_sig_Fact = moment(global_SAL491.FECHA).format("MM")

    var ano_ing_num = moment(numeracion_491.FECHA_ING).format("YYYY")
    var mes_ing_num = moment(numeracion_491.FECHA_ING).format("MM")

    if (global_SAL491.PREFIJO == "A" || global_SAL491.PREFIJO == "T") {

        if ((ano_sig_fact == ano_ing_num) && (mes_sig_Fact == mes_ing_num)) {
            leer_anterior2_491(orden)
        } else {
            if (global_SAL491.CLASE != '0') {
                CON851('37', '37', null, 'error', 'error')
            }
            leer_anterior2_491(orden)
        }

    } else {
        var fecha_sig_Fact = global_SAL491.FECHA
        var fecha_ing_num = numeracion_491.FECHA_ING

        if (fecha_sig_Fact < fecha_ing_num) {
            CON851('37', '37', null, 'error', 'error')
            console.log('año siguiente no coincide con fecha ingreso numeracion')

            if (global_SAL491.CLASE == '0') {
                leer_anterior2_491(orden)
            } else {
                nroComprob_491()
            }
        } else {
            leer_anterior2_491(orden)
        }

    }
}


function anteriorOrden2_491(orden) {
    var ano_sig_fact = moment(global_SAL491.FECHA).format("YYYY")
    var mes_sig_Fact = moment(global_SAL491.FECHA).format("MM")

    var ano_ing_num = moment(numeracion_491.FECHA_ING).format("YYYY")
    var mes_ing_num = moment(numeracion_491.FECHA_ING).format("MM")

    if (global_SAL491.PREFIJO == "A" || global_SAL491.PREFIJO == "T") {

        if ((ano_sig_fact == ano_ing_num) && (mes_sig_Fact == mes_ing_num)) {
            leer_anterior2_491(orden)
        } else {
            CON851('37', '37', null, 'error', 'error')
            leer_anterior2_491(orden)
        }

    } else {
        var fecha_sig_Fact = global_SAL491.FECHA
        var fecha_ing_num = numeracion_491.FECHA_ING

        if (fecha_sig_Fact < fecha_ing_num) {
            console.log('año siguiente no coincide con fecha ingreso numeracion')
            CON851('37', '37', null, 'error', 'error')
            prefijo_491()
        } else {
            leer_anterior2_491(orden)
        }

    }
}


function leer_anterior2_491(orden) {
    console.log('esta llegandooooo')
    if (numeracion_491.ESTADO == '1') {
        CON851('13', 'PACIENTE RETIRADO', null, 'error', 'error')
        switch (orden) {
            case '1':
                nroComprob_491()
                break;
            case '2':
                prefijo_491()
                break;
        }

    } else if (numeracion_491.ESTADO == '2') {
        CON851('13', 'FACTURA ANULADA', null, 'error', 'error')
        switch (orden) {
            case '1':
                nroComprob_491()
                break;
            case '2':
                prefijo_491()
                break;
        }
    } else if ((numeracion_491.ESTADO == '3') && (global_SAL491.ADMIN_W != numeracion_491.OPER_BLOQUEO)) {
        CON851('13', 'FACTURA BLOQUEADA', null, 'error', 'error')
        switch (orden) {
            case '1':
                nroComprob_491()
                break;
            case '2':
                prefijo_491()
                break;
        }
    } else {
        switch (orden) {
            case '1':
                prefijo_491()
                break;
            case '2':
                leer_convenio_491()
                break;
        }
    }

}

function prefijo_491() {
    validarInputs(
        {
            form: '#FACTURA_491',
            orden: '1'
        },
        nroComprob_491,
        function () {
            global_SAL491.PREFIJO = $('#factura_SAL491').val()

            if (($_USUA_GLOBAL[0].PUC_USU == '4' || $_USUA_GLOBAL[0].PUC_USU == '6') && (global_SAL491.PREFIJO == "C")) {
                global_SAL491.PREFIJO = 'E'
                $('#factura_SAL491').val(global_SAL491.PREFIJO)
            }

            switch (global_SAL491.PREFIJO) {
                case "E":
                case "C":
                case "A":
                case "P":
                case "T":
                case "B":
                case "C":
                case "D":
                case "E":
                case "F":
                case "G":
                case "H":
                case "I":
                case "J":
                case "K":
                case "L":
                case "M":
                case "N":
                case "O":
                case "P":
                case "Q":
                case "R":
                case "S":
                case "T":
                case "V":
                case "W":
                case "X":
                case "Y":
                case "Z":
                    nro_cuenta_491()
                    break;
                default:
                    CON851('03', '03', null, 'error', 'error')
                    prefijo_491()
                    break;
            }
        }
    )
}

function nro_cuenta_491() {
    validarInputs(
        {
            form: '#FACTURAD_491',
            orden: '1'
        },
        prefijo_491,
        function () {
            global_SAL491.NRO_CTA = cerosIzq($('#facturad_SAL491').val(), 6)
            $('#facturad_SAL491').val(global_SAL491.NRO_CTA)

            if (global_SAL491.PREFIJO == 'E' || global_SAL491.PREFIJO == 'C') {
                grabar_Factura_491()
            } else {
                leer_anterior_491('2')
            }
        }
    )
}

function leer_convenio_491() {
    var busquedaTarifa = tarifas_SAL491.find(tarifa => tarifa.COD == numeracion_491.CONVENIO)
    console.log(busquedaTarifa)

    if (!busquedaTarifa) {
        CON851('01', 'ERROR NO EXISTE CONVENIO', null, 'error', 'error')
        $('#convenio_SAL491').val('ERROR NO EXISTE CONVENIO')
        prefijo_491()
    } else {
        $('#convenio_SAL491').val(busquedaTarifa.COD + ' ' + busquedaTarifa.DESCRIP)
        console.log(busquedaTarifa.COD + ' ' + busquedaTarifa.DESCRIP)
        var cod_tab_w

        if (global_SAL491.CLASE == '0') {
            cod_tab_w = numeracion_491.CONVENIO
            if (busquedaTarifa.PORC_NP == '0') busquedaTarifa.PORC_NP = busquedaTarifa.PORC_PO
            if (busquedaTarifa.PORC_MO == '0') busquedaTarifa.PORC_MO = busquedaTarifa.PORC_PO
            if (busquedaTarifa.PORC_MQ == '0') busquedaTarifa.PORC_MQ = busquedaTarifa.PORC_PO
        } else {
            var sw_cl
            sw_cl = global_SAL491.CLASE
            if (global_SAL491.CLASE == '7')  sw_cl = '5'
            
            var numerico = $.isNumeric(busquedaTarifa.SAL_MIN)
            if (busquedaTarifa.SAL_MIN == '000000000' || numerico == false) busquedaTarifa.SAL_MIN = $_USUA_GLOBAL[0].SAL_MIN / 30

            console.log(sw_cl)
            cod_tab_w = busquedaTarifa.TABLA[sw_cl].COD_TABLA

            global_SAL491.FACTOR_W = Math.round(parseFloat(busquedaTarifa.TABLA[sw_cl].PORC_TABLA) / 100)
        }
        global_SAL491['CONVENIO_NUM'] = numeracion_491.CONVENIO
        if (global_SAL491.TARIF != cod_tab_w) {
            jAlert({ titulo: 'ATENCION! SE CAMBIO LA TARIFA', mensaje: 'Tarifa anterior: ' + global_SAL491.TARIF + '   Tarifa actual: ' + cod_tab_w}, ()=> re_liquidar_SALUD(global_SAL491, busquedaTarifa, grabar_Factura_491));
        } else {
            CON851P('01', prefijo_491, ()=> re_liquidar_SALUD(global_SAL491, busquedaTarifa, grabar_Factura_491))
        }

    }
}

function grabar_Factura_491(data) {
    console.log(data)
    console.log('termino de reliquidar')
}

function grabarAud_491(){
    
}
