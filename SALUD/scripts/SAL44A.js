/* NOMBRE RM --> INV404 // NOMBRE ELECTR --> SAL44 */

var SAL44A = [];

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_ANOLNK = 20 + $_ANOLNK;
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_CONTADOUSU = $_USUA_GLOBAL[0].CONTADO;
    $_PUCUSU = $_USUA_GLOBAL[0].PUC;
    $_LOTEFARMUSU = $_USUA_GLOBAL[0].LOTE_FAMR;
    $_SALMINUSU = $_USUA_GLOBAL[0].SAL_MIN;
    $_BARRAS_USU = $_USUA_GLOBAL[0].BARRAS;
    $_IVA_USU = $_USUA_GLOBAL[0].IVA1;
    $_IVA_2_USU = $_USUA_GLOBAL[0].IVA2;
    $_IVA_3_USU = $_USUA_GLOBAL[0].IVA3;
    $_CLAVEINVUSU = $_USUA_GLOBAL[0].CLAVE_INV;
    $_BARRASUSULNK = ' ';
    $_LISTAPRECIOUSU = $_USUA_GLOBAL[0].LISTA_PRECIO;
    $_CODCIUUSU = $_USUA_GLOBAL[0].CONTROL_USU
    $_DPTCIUUSU = $_CODCIUUSU.substring(0, 1);
    $_CIUCIUUSU = $_CODCIUUSU.substring(1, 5);
    $_INVENTUSU = $_USUA_GLOBAL[0].INVENT;

    _toggleF8([
        { input: 'claseservicio', app: 'SAL44A', funct: _ventanaclaseservicio_SAL44A },
        { input: 'compr', app: 'SAL44A', funct: _ventanapacientecomp_491 }
    ]);

    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SAL44A.SERVICIOS = [
            { COD: '0', DESCRIPCION: 'DROGUERIA' },
            { COD: '1', DESCRIPCION: 'CIRUGIAS' },
            { COD: '2', DESCRIPCION: 'ECOGRAFIAS' },
            { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
            { COD: '4', DESCRIPCION: 'DOPPLER' },
            { COD: '5', DESCRIPCION: 'T.A.C.' },
            { COD: '6', DESCRIPCION: 'RESONANCIA NUCLEAR' },
            { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
        ]
    } else {
        SAL44A.SERVICIOS = [
            { COD: '0', DESCRIPCION: 'DROGUERIA' },
            { COD: '1', DESCRIPCION: 'CIRUGIAS' },
            { COD: '2', DESCRIPCION: 'LAB. Y OTROS DIAG.' },
            { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
            { COD: '4', DESCRIPCION: 'OTROS SERVICIOS' },
            { COD: '5', DESCRIPCION: 'CONSULTAS Y TERAPIAS' },
            { COD: '6', DESCRIPCION: 'PATOLOGIA' },
            { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
        ]
    }
    _Revisardato_SAL44A();

});
/////////////////////MASCARAS///////////////////////////
var claseservMask = IMask($('#claseservicio_SAL44A')[0], { mask: Number, min: 0, max: 7 });

/////////////////////////F8/////////////////////////////

function _ventanaclaseservicio_SAL44A(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SAL44A.SERVICIOS,
            callback_esc: function () {
                $("#claseservicio_SAL44A").focus();
            },
            callback: function (data) {
                console.debug(data);
                claseservMask.typedValue = data.COD;
                _enterInput('#claseservicio_SAL44A');
            }
        });
    }
}

function _ventanapacientecomp_491(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        set_Event_validar('#COMPR_SAL44A', 'off')
        SER825(_evaluarcomprobante_SAL44A, mostrarDatosCompletos_SAL44A, '1')
    }
}




////////////////////RELIQUIDACION DE COMPROBANTE///////////////

// function _evaluarsuc_SAL44A() {
//     validarInputs(
//         {
//             form: "#SUC_SAL44A",
//             orden: '1'
//         },
//         () => { _toggleNav(); },
//         () => {
//             _evaluartiposervicio_SAL44A();
//         })
// }

function _Revisardato_SAL44A() {
    console.log('revisardato')
    if ($_PREFIJOUSU.trim() == '') {
        $_PREFIJOUSU = '0';
        $('#unidades_SAL44A').val($_PREFIJOUSU);
        _evaluartiposervicio_SAL44A();
    } else {
        console.log('sucursal llena')
        SAL44A.SUCFACT = $_PREFIJOUSU;
        if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) {
            console.log('nit usu')
            SAL44A.POSICIONW = '3';
            // CALL "RX822"
            switch (SAL44A.DATOVENW) {
                case '1':
                    SAL44A.SUCFACT = '01';
                    break;
                case '2':
                    SAL44A.SUCFACT = 'TB';
                    break;
                case '3':
                    SAL44A.SUCFACT = 'KN';
                    break;
                case '4':
                    SAL44A.SUCFACT = 'ZP';
                    break;
                case '5':
                    SAL44A.SUCFACT = '80';
                    break;
                case '6':
                    SAL44A.SUCFACT = 'IB';
                    break;
                case '7':
                    SAL44A.SUCFACT = 'SO';
                    break;
                case '8':
                    SAL44A.SUCFACT = 'SC';
                    break;
                case '9':
                    SAL44A.SUCFACT = 'SC';
                    break;
                case 'A':
                    SAL44A.SUCFACT = 'CS';
                    break;
                default:
                    _toggleNav();
                    break;
            }
        } else {
            console.log('sucursal')
            $('#unidades_SAL44A').val(SAL44A.SUCFACT);
            _evaluartiposervicio_SAL44A();
        }
    }
}

function _evaluartiposervicio_SAL44A() {
    console.log('evalua tipo servicio')
    validarInputs(
        {
            form: "#CLASE_SAL44A",
            orden: '1'
        }, function () { _evaluartiposervicio_SAL44A(); },
        () => {
            SAL44A.CLFACT = claseservMask.value;
            if (SAL44A.CLFACT) {
                SAL44A.SERVICIOS.forEach(data => {
                    if (SAL44A.CLFACT == data.COD) {
                        $('#claseservicio_SAL44A').val(data.COD + " - " + data.DESCRIPCION);
                        if ($_NITUSU == '0800162035') {
                            _buscarnumero_SAL44A();
                        } else {
                            if ((SAL44A.TIPO1COMP == '2' || '3') && (SAL44A.CLFACT == '0' || '1' || '5')) {
                                CON851('14', '14', null, 'error', 'error');
                                _evaluartiposervicio_SAL44A();
                            } else {
                                _buscarnumero_SAL44A();
                            }
                        }
                    }
                });
            } else {
                CON851('03', '03', null, 'error', 'error');
                _evaluartiposervicio_SAL44A();
            }
        })
}

function _buscarnumero_SAL44A() {
    SAL44A.NROW = '';
    console.log('buscarnumero')
    if ((SAL44A.NROW == '') || (SAL44A.NROW == '0')) {
        SAL44A.SECU1NUM = '8';
        SAL44A.SECU2NUM = SAL44A.CLFACT;
        console.log(SAL44A.SECU2NUM, 'SAL44A.SECU2NUM');
        _consultaCON007_SAL44A();
    }
}

function _consultaCON007_SAL44A() {

    SAL44A.SECUNUM = SAL44A.SECU1NUM + SAL44A.SECU2NUM;
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + SAL44A.SECUNUM }, URL)
        .then(data => {
            console.log(data);
            var data = data.split("|");
            SAL44A['ULTFECHANUM'] = data[2].trim();
            SAL44A['NUMEROCTL'] = data[1].substring(3, 9);
            // SAL44A['NROFACT'] = SAL44A.NUMEROCTL;
            SAL44A.NROW = parseInt(SAL44A.NUMEROCTL) - 1;
            $('#compr_SAL44A').val(SAL44A.NROW);
            _evaluarcomprobante_SAL44A();
        })
        .catch(err => {
            console.debug(err);
        })
}

function _evaluarcomprobante_SAL44A() {
    validarInputs(
        {
            form: "#COMPR_SAL44A",
            orden: '1'
        },
        () => { _evaluartiposervicio_SAL44A(); },
        () => {
            SAL44A.NROW = cerosIzq($('#compr_SAL44A').val(), 6)
            $('#compr_SAL44A').val(SAL44A.NROW)
            console.log(SAL44A.NROW, 'COMPROBANTE CONSULTA')

            var llave_envio = SAL44A.SUCFACT
            llave_envio += SAL44A.CLFACT
            llave_envio += SAL44A.NROW

            var datos_envio = datosEnvio()
            datos_envio += llave_envio
            datos_envio += '|'

            let URL = get_url("APP/SALUD/SAL44A.DLL");
            postData({
                datosh: datos_envio
            }, URL)
                .then((data) => {
                    // SAL44A = []; 
                    $("#TABLA_44A tbody").empty();
                    // SAL44A['ADMIN_W'] = localStorage.getItem('Usuario').trim() ? localStorage.getItem('Usuario').trim() : false;
                    // global_SAL44A['FACTOR_W'] = ''
                    mostrarDatosCompletos_SAL44A(data)
                })
                .catch(error => {
                    console.error(error)
                    _evaluarcomprobante_SAL44A()
                });


        })
}



function mostrarDatosCompletos_SAL44A(data) {
    console.log(data, 'datos dll')
    var datos = data.FACTURA[0];
    //    datos.TABLA.pop()
    SAL44A = datos
    console.log(SAL44A, 'llenado de datos')
    $('#compr_SAL44A').val(SAL44A.NRO)
    $('#claseservicio_SAL44A').val(SAL44A.CLASE)
    var clase = SAL44A.CLASE.split('')
    SAL44A.CLASE = clase[0]
    $('#compr_SAL44A').val(SAL44A.NRO)
    $('#fecha_SAL44A').val(SAL44A.FECHA)
    $('#factura_SAL44A').val(SAL44A.PREFIJO)
    $('#facturad_SAL44A').val(SAL44A.NRO_CTA)
    $('#pingreso_SAL44A').val(SAL44A.PUERTA_ESTAD + '.- ' + SAL44A.DESCRIP_PUERTA)
    $('#cliente_SAL44A').val(SAL44A.NIT_TER)
    $('#cliented_SAL44A').val(SAL44A.DESCRIP_TER)
    $('#paciente_SAL44A').val(SAL44A.ID_PACIENTE)
    $('#paciented_SAL44A').val(SAL44A.DESCRIP_PACI)
    $('#sexo_SAL44A').val(SAL44A.SEXO)
    $('#edad_SAL44A').val(SAL44A.EDAD)
    $('#espec_SAL44A').val(SAL44A.ESPEC)
    $('#despec_SAL44A').val(SAL44A.DESCRIP_ESPEC)
    $('#operElab_SAL44A').val(SAL44A.OPER_ELAB)
    $('#fechaElab_SAL44A').val(SAL44A.FECHA_ELAB)
    if (SAL44A.OPER_CORREC.trim().length > 0) {
        $('#operCorrec_SAL44A').val(SAL44A.OPER_CORREC)
        $('#fechaCorrec_SAL44A').val(SAL44A.FECHA_CORREC)
    }
    $('#secuCopago_SAL44A').val(SAL44A.SECU_ABON)
    if (SAL44A.CLASE == '1') {
        var prof = ['CIRUJANO', 'AYUDANTIA', 'ANESTESIOA', 'MAT.QUIRG', 'DERECH.SALA'];
        for (var i in prof) {
            $('#TABLA_44A tbody').append(
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
        for (var i in SAL44A.TABLA) {
            if (SAL44A.TABLA[i].ARTICULO.trim().length > 0) {
                $('#TABLA_44A tbody').append(''
                    + '<tr>'
                    + '   <td>' + SAL44A.TABLA[i].POSICION + '</td>'
                    + '   <td>' + SAL44A.TABLA[i].ARTICULO + '</td>'
                    + '   <td>' + SAL44A.TABLA[i].DESCRIP_ART + '</td>'
                    + '   <td>' + SAL44A.TABLA[i].ALMACEN + '</td>'
                    + '   <td>' + SAL44A.TABLA[i].CANTIDAD + '</td>'
                    + '   <td>' + SAL44A.TABLA[i].UNIDAD + '</td>'
                    + '   <td>' + SAL44A.TABLA[i].VALOR_UNIT + '</td>'
                    + '   <td>' + SAL44A.TABLA[i].VALOR_FACT + '</td>'
                    + '</tr>'
                )
            }
        }
    }

    $('#refactura_SAL44A').val(SAL44A.REFACTURA)
    $('#destino_SAL44A').val(SAL44A.DESTINO)
    $('#fechaAten_SAL44A').val(SAL44A.FECHA_ING)
    $('#vlrtot_SAL44A').val(SAL44A.VALOR_BRUTO)
    $('#valoriva_SAL44A').val(SAL44A.VALOR_IVA)
    $('#copagoestimfact_SAL44A').val(SAL44A.COPAGO_ESTIM_PAGO)
    $('#netofact_SAL44A').val(SAL44A.VALOR_TOTAL)
    $('#atend_SAL44A').val(SAL44A.MED_OTR_FACT);
    $('#datend_SAL44A').val(SAL44A.DESCRIP_MED1);
    $('#espec_SAL44A').val(SAL44A.ESPEC);
    $('#despec_SAL44A').val(SAL44A.DESCRIP_ESPEC);
    $('#ccostos_SAL44A').val(SAL44A.COSTO_FACT)
    $('#dccostos_SAL44A').val(SAL44A.NOMBRE_COSTO)
    $('#convenio_SAL44A').val(SAL44A.COD_TAR)
    $('#estrato_SAL44A').val(SAL44A.ESTRATO)
    $('#solic_SAL44A').val(SAL44A.REMITE_FACT);
    $('#dsolic_SAL44A').val(SAL44A.DESCRIP_MED2);
    $('#ciudad_SAL44A').val(SAL44A.CIUDAD_PACI)
    $('#detalle_SAL44A').val(SAL44A.DETALLE_FACT)
    $('#finalidad_SAL44A').val(SAL44A.FINALIDAD)
    $('#unidserv_SAL44A').val(SAL44A.UNIDAD_SERVICIO)
    $('#descripunidserv_SAL44A').val(SAL44A.DESCRIP_UNISERV)
    SAL44A.CTAFACT = SAL44A.PREFIJO + SAL44A.NRO_CTA;
    SAL44A.ANOFACT = SAL44A.FECHA.substring(0, 4);
    SAL44A.MESFACT = SAL44A.FECHA.substring(5, 7);
    SAL44A.DIAFACT = SAL44A.FECHA.substring(8, 10);
    _validargrabado_SAL44A();

}

function _validargrabado_SAL44A() {
    console.log('grabar')
    CON851P('04', _evaluartiposervicio_SAL44A, _grabar_SAL44A)
}
function _grabar_SAL44A() {
    SAL44A.LLAVEFACT = SAL44A.SUCFACT + SAL44A.CLFACT + SAL44A.NROW;
    console.log('ultimo', SAL44A.LLAVEFACT)
    if (SAL44A.PREFIJO == "A" || "P" || "T" || "B" || "D" || "F"
        || "G" || "H" || "I" || "J" || "K" || "L" || "M" || "N"
        || "O" || "Q" || "R" || "S" || "V" || "W" || "X" || "Y" || "Z") {
        let datos_envio = datosEnvio() + '|' + SAL44A.CTAFACT + '|' + SAL44A.ANOFACT + SAL44A.MESFACT + SAL44A.DIAFACT + '|';
        SolicitarDll({ datosh: datos_envio }, data => {
            if (data.trim() == '00') {
                _ultimavalidaciones_SAL44A(); 
            } else {
                CON852(data[0], data[1], data[2], _toggleNav);
            }
        }, get_url('APP/SALUD/INV020GA.DLL'));

    } else if (SAL44A.PREFIJO == 'E' || 'C') {
        let datos_envio = datosEnvio() + SAL44A.LLAVEFACT + '|';
        SolicitarDll({ datosh: datos_envio }, dato => {
            console.log(dato, 'INV020');
            if (dato[0].trim() == '00') {
                _ultimavalidaciones_SAL44A(); 
            }
            else {
                CON852(dato[0], dato[1], dato[2], _toggleNav);
            }
        }, get_url('APP/SALUD/SAL020.DLL'));
    }else{
        _ultimavalidaciones_SAL44A(); 
    }
}
function _ultimavalidaciones_SAL44A() {
    if ($_NITUSU == '0830092718' || SAL44A.TIPO1COMP > 1) {
        _toggleNav();
    }else if (($_INVENTUSU == 'S') && (SAL44A.CLASE == '0' || SAL44A.MACRO_FACT == '1') && (SAL44A.CTR_FACT != '1')) {
        SAL44A.SWRECAL = '0';
        let datos_envio = datosEnvio() + '|' + SAL44A.LLAVEFACT + '|';
        SolicitarDll({ datosh: datos_envio }, data => {
            console.debug(data);
            var date = data.split('|');
            if (date[0].trim() == '00') {
                _toggleNav();
            }
            else {
                CON852(dato[0], dato[1], dato[2], _toggleNav);
            }         
        }, get_url('APP/SALUD/SAL030.DLL'));
    }else{
        _toggleNav();
    }
}