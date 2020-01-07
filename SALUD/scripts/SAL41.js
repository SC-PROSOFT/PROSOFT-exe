var $_LOEFARM, $_PUCUSU, $_PREFIJOUSU, $_CONTADOUSU, $_SALMINUSU, $_UNDSERVICIO, $_SERVICIO, $_FECHA_LNK, $_ARCHTER;
var $_BARRASUSU, $_SUC868, $_SUCFACT, $_SUCPRN, $_FECHAINGESTADO, $_FACTURAS, $_F8LITE, $_PREFIJOFACT, $_PREFIJONUM;
var $_DESCRIPTER = new Array();
var $_NOM_PAC = new Array();
var $_SECUNUM, $_SECUNUM1, $_SECUNUM2, $_TIPO_COMP = "1  ", $_OPSEGU, $_NRONUM, $_SWINVALID, $_SECUOTROS, $_NROOTROS, $_NROCTAFACT, $_LLAVESALIDANUM;
var $_FECHARETNUM, $_FECHASIGFACT, $_FECHAFACT$_FECHAFACT, $_SWORDSERV, $_ARTFACT;
var $_DIASTRATAFACT = $_CODLOTEFACT = $_HORACITFACT = $_DATOSETCUP = $_ALMFACT = $_RESTRICLOCAL = $_LLAVEBARRASW = $_DESCRIPCUP = $_CODSERTAB = $_TIPOPACI = '';
var $_facturas_A = [], $_facturas_P = [], $_facturas_T = [];
var $_TIPOCOPAGOFACT = ' '; $_COPAGOESTIMFACT = 0; $_MEDCIRFACT = '0'; $_MEDAYUFACT = '0'; $_MEDANEFACT = '0'; $_MEDINSFACT = '0'; $_DETALLEFACT = ''; $_NROAUTORELAB = ''; $_NITFACT = $_IDPACNUM = $_IDHISTORIAFACT = $_MYTNUM = ''; $_VLRPROMEDW = 0;

var $_CANTMAX, $_VALORBRUTO, $_VALORBASE1IVA, $_VALORBASE2IVA, $_VALORBASE3IVA;
var SAL41 = [];
////// CANTMAX MIRAR LINEA 1929

///////////////////////////////// MASCARAS ///////////////////////////////////
var MountMask_41 = new IMask($('#cant_SAL41')[0], { mask: Number, radix: '.', scale: 2, padFractionalZeros: true });
var PriceUnitMask_41 = new IMask($('#vlrunit_SAL41')[0], { mask: Number, thousandsSeparator: ',' });
var PriceTotalMask_41 = new IMask($('#vlrtotal_SAL41')[0], { mask: Number, thousandsSeparator: ',' });
var NetoFactMask_41 = new IMask($('#netofact_SAL41')[0], { mask: Number, thousandsSeparator: ',' });
var PriceivaMask_41 = new IMask($('#valoriva_SAL41')[0], { mask: Number, thousandsSeparator: ',' });
var PriceContMask_41 = new IMask($('#vlrtot_SAL41')[0], { mask: Number, thousandsSeparator: ',' });
var clfactMask = IMask($('#claseservicio_SAL41')[0], { mask: Number, min: 0, max: 7 });
var idhistoriafactMask = IMask($('#paciente_SAL41')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
var prefijoMask = IMask($('#factura_SAL41')[0], {
    mask: 'a',
    prepare: function (str) {
        // console.debug(str);
        // if ((str == 'U') || (str == 'u')) {
        //     CON851('01', '01', null, 'error', 'error');
        // }
        // else {
        return str.toUpperCase()
        // }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var clienteMask = IMask($('#cliente_SAL41')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
var CopagoMask = new IMask($('#porcentcopago_SAL41')[0], { mask: Number, radix: '.', scale: 2, padFractionalZeros: false });
var CopagoMask2 = new IMask($('#copagoestimfact_SAL41')[0], { mask: Number, thousandsSeparator: ',' });

var preanofact = moment().format('YYYY');
var premesfact = moment().format('MM');
var anofact = parseInt(preanofact);
var mesfact = parseInt(premesfact);
var fechaMask = IMask($("#fecha_SAL41")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: anofact, to: anofact, maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: mesfact, to: mesfact, maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 01, to: 31, maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        if (fecha == "Invalid date") {
            CON851('01', '01', null, 'error', 'error');
        }
        else {
            return str;
        }
    }
});
fechaMask.updateValue();
function _Nitmedico_41() {
    var nitmedicoMask = IMask($('#nitmedico_SAL41')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
    nitmedicoMask.updateValue();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////



$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    SAL41['ADMINW'] = localStorage.getItem('Usuario').trim() ? localStorage.getItem('Usuario').trim() : false;
    SAL41['FECHALNK'] = $_USUA_GLOBAL[0].FECHALNK;
    SAL41['MESLNK'] = SAL41.FECHALNK.substring(2, 4);
    SAL41['ANOLNK'] = SAL41.FECHALNK.substring(0, 2);
    SAL41['NITUSU'] = '0800162035';
    SAL41['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    SAL41['PREFIJOUSU'] = '10';
    SAL41['CODCIUUSU'] = $_USUA_GLOBAL[0].COD_CIUD;
    SAL41['NUIRUSU'] = $_USUA_GLOBAL[0].NUIR;
    SAL41['CONTADOUSU'] = $_USUA_GLOBAL[0].CONTADO;
    SAL41['PUCUSU'] = $_USUA_GLOBAL[0].PUC;
    SAL41['LOTEFARMUSU'] = $_USUA_GLOBAL[0].LOTE_FARM;
    SAL41['SALMINUSU'] = $_USUA_GLOBAL[0].SAL_MIN;
    SAL41['SALMINUSU'] = parseInt(SAL41.SALMINUSU);
    SAL41['REPETIDOUSU'] = $_USUA_GLOBAL[0].REPETIDO;
    SAL41['ASUMEIVAUSU'] = $_USUA_GLOBAL[0].ASUME_IVA;
    SAL41['IVAUSU'] = $_USUA_GLOBAL[0].IVA1;
    SAL41['IVAUSU2'] = $_USUA_GLOBAL[0].IVA2;
    SAL41['IVAUSU3'] = $_USUA_GLOBAL[0].IVA3;
    SAL41['ALMPREF'] = 'ALM01';
    SAL41['INVENTUSU'] = $_USUA_GLOBAL[0].INVENT;
    SAL41['TIPOCAJAUSU'] = $_USUA_GLOBAL[0].TIP_CAJ;
    //INICIALIZAR VARIABLES QUE SE UTILIZAN DEPENDIENDO LA CLASE DE SERVICIOS
    SAL41['MULTFACT'] = '00'; SAL41['NROCIRFACT'] = '00'; SAL41['FPAGOFACT'] = '00'; SAL41['NROFORMFACT'] = '0000000000000000'; SAL41['HORAATENESTAD'] = '0000';
    SAL41['CLASEPROCESTADO'] = '0'; SAL41['TIPOPROCESTAD'] = '0'; SAL41['ESPECREMIFACT'] = '   '; SAL41['CUPPAQINTFACT'] = '        '; SAL41['ORDSERVFACT'] = ' ';
    SAL41['RECIBIDORX'] = ' '; SAL41['CRONICOFACT'] = '   '; SAL41['PENDIENTEW'] = ' '; SAL41['NROPENDIW'] = '  0000000';
    SAL41['FECHAPENDIW'] = '00000000'; SAL41['HORAPENDIW'] = '0000'; SAL41['CANTPENDIW'] = '000'; SAL41['TIPOPENDIW'] = '0';
    SAL41['FACTAUTOFACT'] = '0'; SAL41['EMPRESAPACIRIPS'] = '                                                  '; SAL41['VLRLATERFACT'] = ' '; SAL41['BIRADSFACT'] = ' ';
    SAL41['BLOQUEOIMPFACT'] = '0';
    SAL41['RESTIC_EXUSU'] = $_USUA_GLOBAL[0].RESTRIC_EX;

    // SAL41.NITUSU = '0800162035';

    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    SAL41.MODULO = localStorage.Modulo;
    if (SAL41.MODULO == 'RX') {
        SAL41.NITUSU = '0830092718'; SAL41.NITUSU = '0830092718';
        $_PREFIJOUSU = '80';
    }
    // } else {
    //     $_PREFIJOUSU = 'JL';
    // }
    $_ADMINW = localStorage.getItem('Usuario').trim() ? localStorage.getItem('Usuario').trim() : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    SAL41.NITUSU = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0');
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_CODDCIUUSU = $_USUA_GLOBAL[0].COD_CIU;
    $_NUIRUSU = $_USUA_GLOBAL[0].NUIR;
    $_CONTADOUSU = $_USUA_GLOBAL[0].CONTADO;
    $_PUCUSU = $_USUA_GLOBAL[0].PUC;
    $_LOTEFARMUSU = $_USUA_GLOBAL[0].LOTE_FAMR;
    $_SALMINUSU = $_USUA_GLOBAL[0].SAL_MIN;
    $_SALMINUSU = parseInt($_SALMINUSU);
    $_REPETIDOUSU = $_USUA_GLOBAL[0].REPETIDO;
    $_ASUMEIVAUSU = $_USUA_GLOBAL[0].ASUME_IVA;
    $_IVAUSU = $_USUA_GLOBAL[0].IVA1;
    $_IVAUSU2 = $_USUA_GLOBAL[0].IVA2;
    $_IVAUSU3 = $_USUA_GLOBAL[0].IVA3;
    $_ALMPREF = 'ALM01';
    parametros = [];
    _toggleF8([
        { input: 'claseservicio', app: 'SAL41', funct: _ventanaClases_41 },
        { input: 'factura', app: 'SAL41', funct: _ventanaFormapago_41 },
        { input: 'facturad', app: 'SAL41', funct: _ventanaNumeroFactura_41 },
        { input: 'cliente', app: 'SAL41', funct: _ventanaCliente_41 },
        { input: 'paciente', app: 'SAL41', funct: _ventanaPacientes_41 },
        { input: 'codservicio2', app: 'SAL41', funct: _ventanaTablatarifas_41 },
        { input: 'almac', app: 'SAL41', funct: _ventanaAlmacenes_41 },
        { input: 'espec', app: 'SAL41', funct: _ventanaEspecialidades_41 },
        { input: 'ccostos', app: 'SAL41', funct: _ventanaCostos_41 },
        { input: 'atend', app: 'SAL41', funct: _ventanaProfesionales_41 },
        { input: 'solic', app: 'SAL41', funct: _ventanaProfesionales2_41 },
        { input: 'nitmedico', app: 'SAL41', funct: _ventanaProfesionales3_41 },
    ]);
    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SAL41.SERVICIOS = [
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
        SAL41.SERVICIOS = [
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
    OPCIONES = new Object;
    OPCIONES = {
        '09421': _Revisardato_41,
        '09422': _Datosucursal_41,
        '09423': _Clavedeacceso_41
    }
    let active = $('#navegacion').find('li.opcion-menu.active');
    SAL41.OPCIONACTIVA = active[0].attributes[2].nodeValue;
    var opcion = new Function ();
    opcion = OPCIONES[active[0].attributes[2].nodeValue];
    opcion();
    // setTimeout(FAC135, 500);
});


function _Clavedeacceso_41(){
    console.debug('clave de acceso');
}
// function FAC135() {
//     let { ipcRenderer } = require("electron");
//     ipcRenderer.send('another', 'SALUD/PAGINAS/FAC135C.html');
//     vector = ['on', 'Actualizando maestro de pacientes...']
//     _EventocrearSegventana(vector, _Revisardato_41);
// }

///////////////////////////////// F8 /////////////////////////////////////////////////
function _ventanaClases_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SAL41.SERVICIOS,
            callback_esc: function () {
                $("#claseservicio_SAL41").focus();
            },
            callback: function (data) {
                console.debug(data);
                clfactMask.typedValue = data.COD;
                _enterInput('#claseservicio_SAL41');
            }
        });
    }
}

function _ventanaNumeroFactura_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var NUMERACION_SAL41 = [];
        let URL = get_url("APP/SALUD/SER808.DLL");
        postData({
            datosh: datosEnvio() + prefijoMask.value + '|'
        }, URL)
            .then((data) => {
                loader("hide");
                NUMERACION_SAL41 = data.NUMERACION;
                console.log(NUMERACION_SAL41);
                if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                    _ventanaDatos_lite_v2({
                        titulo: 'VENTANA NUMERACION',
                        indice: ['COD', 'FECHA_ING', "HABITAC", "CONVENIO", "DESCRIP", "NOM_PAC"],
                        mascara: ['DESCRIP', 'NOM_PAC'],
                        data: NUMERACION_SAL41,
                        minLength: 3,
                        callback_esc: function () {
                            $('#facturad_SAL41').focus();
                        },
                        callback: function (data) {
                            console.debug(data);
                            $('#facturad_SAL41').val(data.COD.substring(1, 7));
                            _enterInput('#facturad_SAL41');
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

function _ventanaCliente_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var TERCEROS_SAL41 = [];
        let URL = get_url("APP/CONTAB/CON802.DLL");
        postData({
            datosh: datosEnvio()
        }, URL)
            .then((data) => {
                loader("hide");
                TERCEROS_SAL41 = data.TERCEROS;
                console.log(TERCEROS_SAL41);
                if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                    _ventanaDatos_lite_v2({
                        titulo: 'VENTANA TERCEROS',
                        indice: ['COD', 'NOMBRE', "DIRREC", "TELEF", "CIUDAD", "FACTOR"],
                        mascara: ['NOMBRE'],
                        data: TERCEROS_SAL41,
                        minLength: 3,
                        callback_esc: function () {
                            $('#cliente_SAL41').focus();
                        },
                        callback: function (data) {
                            console.debug(data);
                            clienteMask.typedValue = data.COD;
                            _enterInput('#cliente_SAL41');
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

function _ventanaFormapago_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var fpago = '[{"codigo": "E","descripcion": "EFECTIVO"},{"codigo": "C", "descripcion": "CREDITO"},{"codigo": "P", "descripcion": "PENSIONADO"},{"codigo": "A", "descripcion": "AMBULATORIO"},{"codigo": "T", "descripcion": "ACC.TRANS."}]'
        var formapago = JSON.parse(fpago);
        _ventanaDatos({
            titulo: "TIPO DE PAGO",
            columnas: ["codigo", "descripcion"],
            data: formapago,
            callback_esc: function () {
                $("#factura_SAL41").focus();
            },
            callback: function (data) {
                $('#factura_SAL41').val(data.codigo.trim());
                _enterInput('#factura_SAL41');
            }
        });
    }
}

function _ventanaPacientes_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        // _ventanaDatos_lite({
        //     titulo: 'VENTANA DE PACIENTES',
        //     tablaSql: 'sc_pacie',
        //     indice: ['cedula', 'nombre'],
        //     mascara: [],
        //     minLength: 3,
        //     callback_esc: function () {
        //         $('#paciente_401').focus();
        //     },
        //     callback: function (data) {
        //         // $('#paciente_401').val(data.cedula);
        //         console.debug(data);
        //         idhistoriafactMask.typedValue = data.cedula;
        //         $('#paciented_401').val(data.nombre);
        //         _enterInput('#paciente_401');
        //     }
        // });
        parametros = {
            valoresselect: ['Descripcion', 'Identificacion'],
            f8data: 'PACIENTES',
            columnas: [{
                title: 'COD'
            }, {
                title: 'NOMBRE'
            }, {
                title: 'EPS'
            }, {
                title: 'EDAD'
            }],
            callback: data => {
                console.debug(data);
                idhistoriafactMask.typedValue = data.COD;
                $('#paciented_SAL41').val(data.NOMBRE);
                _enterInput('#paciente_SAL41');
            },
            cancel: () => {
                $('#paciente_SAL41').focus();
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaTablatarifas_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        if ($_CLFACT == '0') {
            var ARTICULOS_SAL41 = [];
            let URL = get_url("APP/INVENT/INV803.DLL");
            postData({
                datosh: datosEnvio() + clfactMask.value + '|'
            }, URL)
                .then((data) => {
                    loader("hide");
                    console.debug(data);
                    ARTICULOS_SAL41 = data.ARTICULOS;
                    console.log(ARTICULOS_SAL41);
                    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                        _ventanaDatos({
                            titulo: 'VENTANA TABLA DE TARIFAS',
                            columnas: ["LLAVE_ART", "DESCRIP_ART"],
                            data: ARTICULOS_SAL41,
                            callback_esc: function () {
                                // $("#").focus();
                                $('#codservicio2_SAL41').focus();
                            },
                            callback: function (data) {
                                $('#codservicio2_SAL41').val(data.LLAVE_ART.substring(1, 15));
                                $('#claseart_SAL41').val(data.LLAVE_ART.substring(15, 17));
                                _enterInput('#codservicio2_SAL41');
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            var ARTICULOS_SAL41 = [];
            let URL = get_url("APP/SALUD/SER802.DLL");
            postData({
                datosh: datosEnvio() + $_CODTABW + $_TIPOTABW
            }, URL)
                .then((data) => {
                    loader("hide");
                    ARTICULOS_SAL41 = data.TABLA;
                    console.log(ARTICULOS_SAL41);
                    _ventanaDatos({
                        titulo: 'VENTANA TABLA DE TARIFAS',
                        columnas: ["COD", "TIPO", "COD_SER", "DESCRIP"],
                        data: ARTICULOS_SAL41,
                        callback_esc: function () {
                            $("#codservicio2_SAL41").focus();
                        },
                        callback: function (data) {
                            console.debug(data, data.COD_SER.substring(0, 2), data.COD_SER.substring(2, 12));
                            $_GRUPOFACT = data.COD_SER.substring(0, 2);
                            $('#codservicio2_SAL41').val(data.COD_SER);
                            _enterInput('#codservicio2_SAL41');
                        }
                    });

                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }
}

function _ventanaAlmacenes_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        let URL = get_url("APP/INVENT/INV801.DLL");
        postData({
            datosh: datosEnvio()
        }, URL)
            .then((data) => {
                loader("hide");
                SAL41.ALMACENES = data.LOCALIZACION;
                console.debug(SAL41.ALMACENES);
                _ventanaDatos({
                    titulo: 'VENTANA DE ALMACENES',
                    columnas: ["CODIGO", "DESCRIPCION", "COSTO"],
                    data: SAL41.ALMACENES,
                    callback_esc: function () {
                        $("#almac_SAL41").focus();
                    },
                    callback: function (data) {
                        $('#almac_SAL41').val(data.CODIGO);
                        _enterInput('#almac_SAL41');
                    }
                });

            })
            .catch((error) => {
                console.log(error)
            });
    }
}
function _ventanaEspecialidades_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var ESPECIALIDADES_SAL41 = [];
        let URL = get_url("APP/SALUD/SER855.DLL");
        postData({
            datosh: datosEnvio()
        }, URL)
            .then((data) => {
                loader("hide");
                ESPECIALIDADES_SAL41 = data.ESPECIALIDADES;
                console.log(ESPECIALIDADES_SAL41);
                _ventanaDatos({
                    titulo: 'VENTANA DE ESPECIALIDADES',
                    columnas: ["CODIGO", "NOMBRE"],
                    data: ESPECIALIDADES_SAL41,
                    callback_esc: function () {
                        $('#espec_SAL41').focus();
                    },
                    callback: function (data) {
                        $('#espec_SAL41').val(data.CODIGO);
                        _enterInput('#espec_SAL41');
                    }
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

function _ventanaCostos_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var ARTICULOS_SAL41 = [];
        let URL = get_url("APP/CONTAB/CON803.DLL");
        postData({
            datosh: datosEnvio()
        }, URL)
            .then((data) => {
                loader("hide");
                ARTICULOS_SAL41 = data.COSTO;
                console.log(ARTICULOS_SAL41);
                if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                    _ventanaDatos({
                        titulo: 'VENTANA DE CONSULTA CENTRO DE COSTOS',
                        columnas: ["COD", "NOMBRE", "DESCRIP"],
                        data: ARTICULOS_SAL41,
                        callback_esc: function () {
                            $('#ccostos_SAL41').focus();
                        },
                        callback: function (data) {
                            $('#ccostos_SAL41').val(data.COD);
                            $_COSTOFACT = data.COD;
                            _enterInput('#ccostos_SAL41');
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

function _ventanaProfesionales_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var PROFESIONALES_SAL41 = [];
        let URL = get_url("APP/SALUD/SER819.DLL");
        postData({
            datosh: datosEnvio() + $_ESPECLAB + '|'
        }, URL)
            .then((data) => {
                loader("hide");
                data.ARCHPROF.pop();
                PROFESIONALES_SAL41 = data.ARCHPROF;
                console.log(PROFESIONALES_SAL41);
                if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                    _ventanaDatos({
                        titulo: 'VENTANA DE PROFESIONALES',
                        columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
                        data: PROFESIONALES_SAL41,
                        callback_esc: function () {
                            $('#atend_SAL41').focus();
                        },
                        callback: function (data) {
                            $('#atend_SAL41').val(data.IDENTIFICACION.trim());
                            _enterInput('#atend_SAL41');
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}
function _ventanaProfesionales2_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var PROFESIONALES_SAL41 = [];
        let URL = get_url("APP/SALUD/SER819.DLL");
        postData({
            datosh: datosEnvio()
        }, URL)
            .then((data) => {
                loader("hide");
                PROFESIONALES_SAL41 = data.ARCHPROF;
                console.log(PROFESIONALES_SAL41);
                if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                    _ventanaDatos({
                        titulo: 'VENTANA DE PROFESIONALES',
                        columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
                        data: PROFESIONALES_SAL41,
                        callback_esc: function () {
                            $('#solic_SAL41').focus();
                        },
                        callback: function (data) {
                            $('#solic_SAL41').val(data.IDENTIFICACION.trim());
                            _enterInput('#solic_SAL41');
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

function _ventanaProfesionales3_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var PROFESIONALES_SAL41 = [];
        let URL = get_url("APP/SALUD/SER819.DLL");
        postData({
            datosh: datosEnvio()
        }, URL)
            .then((data) => {
                loader("hide");
                PROFESIONALES_SAL41 = data.ARCHPROF;
                console.log(PROFESIONALES_SAL41);
                _ventanaDatos({
                    titulo: 'VENTANA DE PROFESIONALES',
                    columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
                    data: PROFESIONALES_SAL41,
                    callback_esc: function () {
                        $('#nitmedico_SAL41').focus();
                    },
                    callback: function (data) {
                        $('#nitmedico_SAL41').val(data.IDENTIFICACION.trim());
                        _enterInput('#nitmedico_SAL41');
                    }
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }
}
////////////////////////////// MASCARAS /////////////////////////////////////////////////



////////////////////////////////// //////////////////////////////////////////////////

function _Revisardato_41() {
    if (parseInt(SAL41.MESLNK) > 12) {
        CON851('91', '91', null, 'error', 'error');
        _toggleNav();
    }
    else if ((SAL41.NITUSU == "0844003225") || (SAL41.MESLNK == "0845000038")) {
        $_BARRASUSU = "N";
    }
    else if (SAL41.LOTEFARMUSU != "S" || "N") {
        if ((SAL41.PUCUSU == "4") || (SAL41.PUCUSU == "6")) {
            $_LOTEFARM = "S";
            SAL41['LOTEFARM'] = 'S';
        }
        else {
            $_LOTEFARM = "N";
            SAL41['LOTEFARM'] = 'N';
        }
    }
    else if ((SAL41.PUCUSU == "4") || (SAL41.PUCUSU == "6")) {
        if (SAL41.CONTADOUSU == "S") {
            SAL41['CONTADOUSU'] = "N";
        }
    }
    else if (((SAL41.PUCUSU == "4") || (SAL41.PUCUSU == "6")) && (SAL41.CONTADOUSU == "S")) {
        SAL41['CONTADOUSU'] = "S";
    }

    // $_SALMINW = Math.round($_SALMINUSU / 30);
    $_SALMINW = SAL41.SALMINUSU / 30;
    SAL41['SALMINW'] = SAL41.SALMINUSU / 30;

    // $_VALORAPROX = Math.round($_SALMINW * 0.00117);
    $_VALORAPROX = $_SALMINW * 0.00117;
    var valormodw1 = $_VALORAPROX * 100;

    // $_VALORAPROX = Math.round($_SALMINW * 0.004610);
    $_VALORAPROX = $_SALMINW * 0.004610;
    var valormodw2 = $_VALORAPROX * 100;

    // $_VALORAPROX = Math.round($_SALMINW * 0.01215);
    $_VALORAPROX = $_SALMINW * 0.01215;
    var valormodw3 = $_VALORAPROX * 100;

    $_VLRMODW = [valormodw1, valormodw2, valormodw3];
    SAL41['VLRMODW'] = [valormodw1, valormodw2, valormodw3];
    console.debug($_VLRMODW, SAL41.VLRMODW);
    _Datounidad_41();
}

function _Datounidad_41() {
    let datos_envio = datosEnvio()
    datos_envio += SAL41.ADMINW
    let URL = get_url("APP/SALUD/SER873.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            console.debug(data);
            SAL41.UNSERV = data.UNSERV;
            _UndServicio_41();
        })
        .catch(err => {
            console.debug(err);
        })
}

function _UndServicio_41() {
    $_UNIDSERVICIO_401 = [];
    for (var i in SAL41.UNSERV) {
        if (SAL41.UNSERV[i].ESTADO.trim() == 'S') {
            if (SAL41.UNSERV[i].COD.trim() != '') {
                $_UNIDSERVICIO_401.push(SAL41.UNSERV[i]);
                console.debug($_UNIDSERVICIO_401)
            }
        }
    }
    loader("hide");
    POPUP({
        array: $_UNIDSERVICIO_401,
        titulo: "UNIDADES DE SERVICIO",
        indices: [
            { label: 'DESCRIP' }
        ],
        callback_f: _toggleNav
    },
        _evaluarSER873_41);
}

function _evaluarSER873_41(data) {
    console.debug(data);
    loader("hide");
    _inputControl('reset');
    _inputControl('disabled');

    $_UNIDADES = data.COD;
    console.debug(data.COD);
    switch (data.COD) {
        case '01':
        case '02':
        case '03':
        case '04':
        case '05':
        case '06':
        case '07':
        case '08':
        case '09':
        case '11':
        case '12':
        case '13':
        case '21':
        case '22':
        case '31':
        case '32':
        case '51':
            _Validarunidaddeservicio_41();
            break;
        default:
            _toggleNav();
            break;
    }
    $_UNSER = data.COD + " " + data.DESCRIP;
    $_UNSERW = data.COD;
    SAL41['UNSERW'] = data.COD;
    SAL41['UNSER'] = data.COD + " " + data.DESCRIP;
    $_EDADMAXSERV = data.EDADMAX;
    $_UNDEDADMAXSERV = $_EDADMAXSERV.substring(0, 1);
    $_VLREDADMAXSERV = $_EDADMAXSERV.substring(1, 4);
    $_EDADMINSERV = data.EDADMIN;
    $_UNDEDADMINSERV = $_EDADMINSERV.substring(0, 1);
    $_VLREDADMINSERV = $_EDADMAXSERV.substring(1, 4);
    $_CCOSTOSERV = data.CENCOS;
    SAL41['EDADMAXSERV'] = data.EDADMAX;
    SAL41['UNDEDADMAXSERV'] = $_EDADMAXSERV.substring(0, 1);
    SAL41['VLREDADMAXSERV'] = $_EDADMAXSERV.substring(1, 4);
    SAL41['EDADMINSERV'] = data.EDADMIN;
    SAL41['UNDEDADMINSERV'] = $_EDADMINSERV.substring(0, 1);
    SAL41['VLREDADMINSERV'] = $_EDADMAXSERV.substring(1, 4);
    SAL41['CCOSTOSERV'] = data.CENCOS;
}

function _Validarunidaddeservicio_41() {
    if ((SAL41.NITUSU == "0800037021") && (SAL41.ADMINW == "JASP") && ((SAL41.UNSERW < 10) || (SAL41.UNSERW == "A") || (SAL41.UNSERW == "B"))) {
        CON851('03', '03', null, 'error', 'Error');
        _UndServicio_41();
    }
    else {
        _Datosucursal_41();
    }
}

function _Datosucursal_41() {
    let datos_envio = datosEnvio()
    datos_envio += SAL41.ADMINW
    let URL = get_url("app/CONTAB/CON003.DLL");
    postData({
        datosh: datos_envio
    }, URL)
        .then((data) => {
            loader("hide")
            _dataCON003_41_01(data)
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}

function _dataCON003_41_01(data) {
    // console.debug(data, ' CON003_01');
    data = data.split('|');
    SAL41.NOMBREOPERW = data[0].trim();
    SAL41.IDENTOPERW = data[1].trim();
    SAL41.SUCOPERW = data[2].trim();
    if ($_PREFIJOUSU == "  ") {
        $_PREFIJOUSU = "00";
        _Datosucursal2_41();
    }
    else if (($_ADMINW == "GEBC") || ($_ADMINW == "ADMI")) {
        _Datosucursal2_41();
    }
    else {
        switch (SAL41.NITUSU) {
            // ESE SALUD YOPAL
            case "0844003225":
                if ((SAL41.SUCOPERW == "JL") || (SAL41.SUCOPERW == "CA") || (SAL41.SUCOPERW == "CS") || (SAL41.SUCOPERW == "PV") || (SAL41.SUCOPERW == "BC") || (SAL41.SUCOPERW == "LC") || (SAL41.SUCOPERW == "CV") || (SAL41.SUCOPERW == "HT") || (SAL41.SUCOPERW == "EM") || (SAL41.SUCOPERW == "HY") || (SAL41.SUCOPERW == "TL") || (SAL41.SUCOPERW == "MR") || (SAL41.SUCOPERW == "01")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    _inputControl("disabled");
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // SERVIMEDICOS
            case "0800162035":
                if ((SAL41.SUCOPERW == "01") || (SAL41.SUCOPERW == "03") || (SAL41.SUCOPERW == "05") || (SAL41.SUCOPERW == "06") || (SAL41.SUCOPERW == "07") || (SAL41.SUCOPERW == "08") || (SAL41.SUCOPERW == "10") || (SAL41.SUCOPERW == "11") || (SAL41.SUCOPERW == "12") || (SAL41.SUCOPERW == "14") || (SAL41.SUCOPERW == "15") || (SAL41.SUCOPERW == "17")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    _inputControl("disabled")
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // MULTISALID VILLAVICENCIO
            case "0830511298":
                if ((SAL41.SUCOPERW == "01") || (SAL41.SUCOPERW == "02") || (SAL41.SUCOPERW == "03") || (SAL41.SUCOPERW == "04") || (SAL41.SUCOPERW == "05") || (SAL41.SUCOPERW == "06") || (SAL41.SUCOPERW == "07") || (SAL41.SUCOPERW == "08") || (SAL41.SUCOPERW == "09") || (SAL41.SUCOPERW == "10") || (SAL41.SUCOPERW == "11") || (SAL41.SUCOPERW == "12") || (SAL41.SUCOPERW == "13") || (SAL41.SUCOPERW == "14") || (SAL41.SUCOPERW == "15") || (SAL41.SUCOPERW == "16") || (SAL41.SUCOPERW == "17") || (SAL41.SUCOPERW == "18") || (SAL41.SUCOPERW == "19") || (SAL41.SUCOPERW == "20")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // FAMEDIC
            case "0900405505":
                if ((SAL41.SUCOPERW == "01") || (SAL41.SUCOPERW == "02") || (SAL41.SUCOPERW == "03") || (SAL41.SUCOPERW == "05") || (SAL41.SUCOPERW == "06") || (SAL41.SUCOPERW == "07") || (SAL41.SUCOPERW == "08") || (SAL41.SUCOPERW == "09")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // SOCIEDAD CARDIOLOGICA
            case "0900161116":
                if ((SAL41.SUCOPERW == "01") || (SAL41.SUCOPERW == "02") || (SAL41.SUCOPERW == "03") || (SAL41.SUCOPERW == "04")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // MAVEPHARMA
            case "0830511298":
                if ((SAL41.SUCOPERW == "01") || (SAL41.SUCOPERW == "02") || (SAL41.SUCOPERW == "03") || (SAL41.SUCOPERW == "04") || (SAL41.SUCOPERW == "05") || (SAL41.SUCOPERW == "06") || (SAL41.SUCOPERW == "07") || (SAL41.SUCOPERW == "10")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // ENLACE
            case "0900541158":
                if ((SAL41.SUCOPERW == "01") || (SAL41.SUCOPERW == "02") || (SAL41.SUCOPERW == "03") || (SAL41.SUCOPERW == "04") || (SAL41.SUCOPERW == "05") || (SAL41.SUCOPERW == "06") || (SAL41.SUCOPERW == "07") || (SAL41.SUCOPERW == "10")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // MAVESALUD
            case "0900566047":
                if ((SAL41.SUCOPERW == "01") || (SAL41.SUCOPERW == "02") || (SAL41.SUCOPERW == "03") || (SAL41.SUCOPERW == "04") || (SAL41.SUCOPERW == "05") || (SAL41.SUCOPERW == "06") || (SAL41.SUCOPERW == "07") || (SAL41.SUCOPERW == "08") || (SAL41.SUCOPERW == "09") || (SAL41.SUCOPERW == "10") || (SAL41.SUCOPERW == "11") || (SAL41.SUCOPERW == "12")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // ALBERGUE SUKURAME
            case "0900565371":
                if ((SAL41.SUCOPERW == "01") || (SAL41.SUCOPERW == "02") || (SAL41.SUCOPERW == "03") || (SAL41.SUCOPERW == "04") || (SAL41.SUCOPERW == "05") || (SAL41.SUCOPERW == "06") || (SAL41.SUCOPERW == "07") || (SAL41.SUCOPERW == "10")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // IMAGENES DIAGNOSTICAS VCIO
            case "0800156469":
                if ((SAL41.SUCOPERW == "00") || (SAL41.SUCOPERW == "01") || (SAL41.SUCOPERW == "02") || (SAL41.SUCOPERW == "03")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // TERAMED
            case "0900641654":
                if ((SAL41.SUCOPERW == "00") || (SAL41.SUCOPERW == "01") || (SAL41.SUCOPERW == "02") || (SAL41.SUCOPERW == "03") || (SAL41.SUCOPERW == "04")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // TERAMED
            case "0800037979":
                if ((SAL41.SUCOPERW == "00") || (SAL41.SUCOPERW == "01") || (SAL41.SUCOPERW == "02") || (SAL41.SUCOPERW == "03") || (SAL41.SUCOPERW == "04")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // SIKUANI
            case "0830512772":
                if ((SAL41.SUCOPERW == "01") || (SAL41.SUCOPERW == "02") || (SAL41.SUCOPERW == "03") || (SAL41.SUCOPERW == "04") || (SAL41.SUCOPERW = "05") || (SAL41.SUCOPERW = "06") || (SAL41.SUCOPERW = "07") || (SAL41.SUCOPERW = "08") || (SAL41.SUCOPERW = "09") || (SAL41.SUCOPERW = "10") || (SAL41.SUCOPERW = "11") || (SAL41.SUCOPERW = "12") || (SAL41.SUCOPERW = "13") || (SAL41.SUCOPERW = "14") || (SAL41.SUCOPERW = "15") || (SAL41.SUCOPERW = "16") || (SAL41.SUCOPERW = "17") || (SAL41.SUCOPERW = "18") || (SAL41.SUCOPERW = "19") || (SAL41.SUCOPERW = "20") || (SAL41.SUCOPERW = "21") || (SAL41.SUCOPERW = "22") || (SAL41.SUCOPERW = "23") || (SAL41.SUCOPERW = "24") || (SAL41.SUCOPERW = "25") || (SAL41.SUCOPERW = "26") || (SAL41.SUCOPERW = "27") || (SAL41.SUCOPERW = "28") || (SAL41.SUCOPERW = "29") || (SAL41.SUCOPERW = "30") || (SAL41.SUCOPERW = "31") || (SAL41.SUCOPERW = "32") || (SAL41.SUCOPERW = "33") || (SAL41.SUCOPERW = "34") || (SAL41.SUCOPERW = "35") || (SAL41.SUCOPERW = "36") || (SAL41.SUCOPERW = "37") || (SAL41.SUCOPERW = "38") || (SAL41.SUCOPERW = "39") || (SAL41.SUCOPERW = "40") || (SAL41.SUCOPERW = "41") || (SAL41.SUCOPERW = "42") || (SAL41.SUCOPERW = "43") || (SAL41.SUCOPERW = "44") || (SAL41.SUCOPERW = "45") || (SAL41.SUCOPERW = "46") || (SAL41.SUCOPERW = "47") || (SAL41.SUCOPERW = "48") || (SAL41.SUCOPERW = "49") || (SAL41.SUCOPERW = "50")) {
                    SAL41.SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            default:
                _Datosucursal2_41();
        }
    }
}

function _Datosucursal2_41() {
    $_SUCFACT = $_SUCW = $_PREFIJOUSU;
    if ((SAL41.NITUSU == "0800162035") && ($_PREFIJOUSU == "08")) {
        $_ALMPREF = "SIN99";
    }
    // else if ((SAL41.NITUSU == "0830092718") || (SAL41.NITUSU == "0830092719") || (SAL41.NITUSU == "0900193162")) {
    //     RX_822_41();
    // } DIAGNOSTICOS E IMAGENES
    else if ((SAL41.NITUSU == "0844003225") && (SAL41.SUCOPERW == "  ")) {
        _Evaluarsuc_41("1");
    } else if (SAL41.NITUSU == '0844003225') {
        if ((SAL41.SUCOPERW == "JL") || (SAL41.SUCOPERW == "CA") || (SAL41.SUCOPERW == "CS") || (SAL41.SUCOPERW == "PV") || (SAL41.SUCOPERW == "BC") || (SAL41.SUCOPERW == "LC") || (SAL41.SUCOPERW == "CV") || (SAL41.SUCOPERW == "HT") || (SAL41.SUCOPERW == "EM") || (SAL41.SUCOPERW == "HY") || (SAL41.SUCOPERW == "TL") || (SAL41.SUCOPERW == "MR") || (SAL41.SUCOPERW == "01")) {
            _Evaluarservicio_41();
        } else {
            console.debug('sucursal');
            CON851('48', '48', null, 'error', 'Error');
            _toggleNav();
        }
    }
    else if (SAL41.NITUSU == '0830512772') {
        LLAMADO_DLL({
            dato: [$_ADMINW],
            callback: _dataINV401_09,
            nombredll: 'INV401_09',
            carpeta: 'SALUD'
        })
    } else {
        _Evaluarservicio_41();
    }
    $("#unidades_SAL41").val($_SUCFACT);
}

// function _Evaluarsuc_41(orden) {
//     validarInputs(
//         {
//             form: "#SUC_401",
//             orden: orden
//         },
//         function () { _toggleNav; console.debug("SUC401") },
//         validar1_401("1")
//     )
// }

function RX_822_41() {
    var MenuRX822 = '[{"COD": "1","DESCRIP": "Calle 127        -01-"},{"COD": "2", "DESCRIP": "Tabora           -TB-"},{"COD": "3","DESCRIP": "Kenedy           -KN-"},{"COD": "4","DESCRIP": "Zipaquira        -ZP-"},{"COD": "5","DESCRIP": "Calle 80         -80-"},{"COD": "6","DESCRIP": "Ibague           -IB-"},{"COD": "7","DESCRIP": "Soacha           -SO-"},{"COD": "8","DESCRIP": "Santa Clara      -SC-"},{"COD": "9","DESCRIP": "Hosp. Suba        -SB-"},{"COD": "10","DESCRIP": "Medplus          -MP-"},{"COD": "11","DESCRIP": "Girardot         -GT-"},{"COD": "12","DESCRIP": "Med-Sport        -MS-"},{"COD": "13","DESCRIP": "Unicentro        -UN-"},{"COD": "14","DESCRIP": "Marly            -MA-"},{"COD": "15","DESCRIP": "Cadiz            -CZ-"},{"COD": "16","DESCRIP": "Centenario       -CE-"},{"COD": "17","DESCRIP": "Chapinero        -CH-"},{"COD": "18","DESCRIP": "Madrid          -MD-"},{"COD": "19","DESCRIP": "Ib_Platino       -PT-"},{"COD": "20","DESCRIP": "Medplus C19      -M2-"}]'
    var Rx822 = JSON.parse(MenuRX822);
    var titulo = 'Sede';
    POPUP({
        array: Rx822,
        titulo: titulo
    },
        _evaluarRX822_41);
}

function _evaluarRX822_41(data) {
    loader('hide');
    _inputControl('disabled');
    switch (parseInt(data.id)) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case "A":
        case "B":
        case "C":
        case "D":
        case "E":
        case "G":
        case "H":
        case "I":
        case "J":
        case "K":
        case "L":
            console.debug(data);
            var suc = data.descripcion;
            var sedes = suc.substr(18, 19);
            var sucursal = sedes.substr(0, 2);
            $_RX822 = sucursal;
            var admin_w = localStorage.getItem('cod_oper');
            if ((admin_w == "0101") || (admin_w == "GEBC") || (SAL41.SUCOPERW == "**")) {
                $_RX822 = $_SUCFACT;
                $_RX822 = $_SUCPRN;
            }
            else {
                if ($_RX822 != SAL41.SUCOPERW) {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
            }
            break;
        default:
            _toggleNav();
            break;
    }
}

function _Cargarunidadesdeservicio_41() {
    if (SAL41.NITUSU == "0800156469") {
        var tiposerv = '[{"codigo": "0","descripcion": "DROGUERIA"},{"codigo": "1", "descripcion": "CIRUGIAS"},{"codigo": "2", "descripcion": "ECOGRAFIAS"},{"codigo": "3", "descripcion": "RX - IMAGENOLOGIA"},{"codigo": "4", "descripcion": "DOPPLER"},{"codigo": "5", "descripcion": "T.A.C."},{"codigo": "6", "descripcion": "RESONANCIA NUCLEAR"},{"codigo": "7", "descripcion": "PROMOCION Y PREVENCION"}]';
        $_SERVICIO_401 = JSON.parse(tiposerv);
    }
    else {
        var tiposerv = '[{"codigo": "0","descripcion": "DROGUERIA"},{"codigo": "1", "descripcion": "CIRUGIAS"},{"codigo": "2", "descripcion": "LAB. Y OTROS DIAG."},{"codigo": "3", "descripcion": "RX - IMAGENOLOGIA"},{"codigo": "4", "descripcion": "OTROS SERVICIOS"},{"codigo": "5", "descripcion": "CONSULTAS Y TERAPIAS"},{"codigo": "6", "descripcion": "PATOLOGIA"},{"codigo": "7", "descripcion": "PROMOCION Y PREVENCION"}]';
        $_SERVICIO_401 = JSON.parse(tiposerv);
    }
}


function _Evaluarservicio_41() {
    clfactMask.updateValue();
    _Cargarunidadesdeservicio_41();
    validarInputs(
        {
            form: "#SERVICE_41",
            orden: "1"
        },
        function () { _Revisardato_41() },
        _validarservicio
    )
}

function _validarservicio() {
    $_CLFACT = clfactMask.value;
    console.debug(clfactMask.value);
    if ($_CLFACT.length > 0) {
        for (i = 0; i < $_SERVICIO_401.length; i++) {
            if ($_CLFACT == $_SERVICIO_401[i].codigo.trim()) {
                $("#claseservicio_SAL41").val($_SERVICIO_401[i].codigo + " - " + $_SERVICIO_401[i].descripcion);
                if (SAL41.OPCIONACTIVA == '09421'){
                    _Mostrartipo_41();
                } else {
                    _Evaluarnumeroctl_41();
                } 
                break;
            }
        }
    } else {
        CON851('03', '03', null, 'error', 'error');
        _Evaluarservicio_41();
    }
}

function _Mostrartipo_41() {
    if ($_UNSERW == "08") {
        if (($_CLFACT == "0") || ($_CLFACT == "7")) {
            _Revisarpermisos_41();
        } else {
            CON851('B1', 'B1', null, 'error', 'error');
            _Evaluarservicio_41();
        }
    } else {
        _Revisarpermisos_41();
    }
}

function _Revisarpermisos_41() {
    if ($_CLFACT == "0" && ((SAL41.NITUSU == "0892000401") || (SAL41.NITUSU == "0900648993") || (SAL41.NITUSU == "0800162035") || (SAL41.NITUSU == "0900755133") || (SAL41.NITUSU == "0900804411") || (SAL41.NITUSU == "0900870633")) && parseInt($_SUCFACT) < 2) {
        $_SWBLOQFECHA = "S";
    } else {
        $_SWBLOQFECHA = "N";
    } if ((SAL41.NITUSU == '0891855847') || (SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) {
        $_CANTMAX = "99";
    }
    _infoCON904_01_41();
}

function _infoCON904_01_41() {
    $_OPSEGU = "I41" + $_CLFACT;
    let datos_envio = datosEnvio();
    datos_envio += localStorage.getItem('Usuario').trim() + '|' + $_OPSEGU;
    SolicitarDll({ datosh: datos_envio }, _dataCON904_01_41, get_url('APP/CONTAB/CON904.DLL'));
}

function _dataCON904_01_41(data) {
    console.debug(data, "CON904-01");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        console.debug('904');
        _Buscarnumero_41();
    } else {
        // NO TIENE PERMISOS
        _UndServicio_41();
    }
}

function _Buscarnumero_41() {
    if ((SAL41.NITUSU == "0830092718") || (SAL41.NITUSU == "0830092719") || (SAL41.NITUSU == "0900193162")) {
        console.debug('nit rx');
        $_SECUNUM2 = $_CLFACT;
        var contenido = ["KN", "TB", "ZP", "IN", "SO", "SC", "GT", "MS", "UN", "80", "MA", "CZ", "CE", "CH", "MD", "PT"];
        var secunum = ["K", "t", "z", "x", "s", "c", "g", "m", "u", "0", "m", "k", "l", "h", "d", "P"];
        for (i = 0; i < contenido.length; i++) {
            if ($_SUCFACT == contenido[i]) {
                $_SECUNUM1 = secunum[i];
                _infoCON007_01_41();
            }
            if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                $_SECUNUM1 = "8";
                _infoCON007_01_41();
            }
        }
    } else {
        $_SECUNUM2 = $_CLFACT;
        if ($_TIPO_COMP == "3  ") {
            $_SECUNUM1 = "6";
            $_SECUNUM = $_SECUNUM1 + $_SECUNUM2;
            _Evaluarnit_41();
        } else {
            $_SECUNUM1 = "8";
            $_SECUNUM = $_SECUNUM1 + $_SECUNUM2;
            _Evaluarnit_41();
        }
    }
}

function _Evaluarnit_41() {
    console.debug('nit');
    switch (SAL41.NITUSU) {
        case "0844003225":
            var contenido = ["01", "JL", "CA", "BC", "CV", "PV", "CS", "HY", "TL", "MR"];
            var secunum = ["8", "a", "c", "b", "v", "p", "s", "h", "i", "j"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                    _infoCON007_01_41();
                }
                else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                    _infoCON007_01_41();
                }
            }
            break;
        case "0800162035":
            var contenido = ["01", "03", "05", "06", "07", "08", "10", "11", "12", "14", "15", "17"];
            var secunum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                    _infoCON007_01_41();
                } else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                    _infoCON007_01_41();
                }
            }
            break;
        case "0900566047":
            var contenido = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
            var secunum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                    _infoCON007_01_41();
                }
                else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                    _infoCON007_01_41();
                }
            }
            break;
        case "0900658867":
            var contenido = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
            var secunum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                    _infoCON007_01_41();
                }
                else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                    _infoCON007_01_41();
                }
            }
            break;
        case "0900541148":
            var contenido = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
            var secunum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                    _infoCON007_01_41();
                }
                else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                    _infoCON007_01_41();
                }
            }
            break;
        case "0830512772":
            var contenido = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"];
            var secunum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "W", "V", "X", "Y"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                    _infoCON007_01_41();
                }
                else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                    _infoCON007_01_41();
                }
            }
            break;
        default:
            console.debug('default')
            _infoCON007_01_41();
            break;
    }
}

function _infoCON007_01_41() {
    $_SECUNUM = $_SECUNUM1 + $_SECUNUM2;
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + $_SECUNUM }, URL)
        .then(data => {
            console.debug(data);
            var data = data.split("|");
            SAL41['ULTFECHANUM'] = data[2].trim();
            SAL41['NUMEROCTL'] = data[1].substring(3, 9);
            SAL41['NROFACT'] = SAL41.NUMEROCTL;
            _dataCON007_01_41();
        })
        .catch(err => {
            console.debug(err);
        })
}

function _dataCON007_01_41() {
    if ((SAL41.NITUSU == "0900193162") || (SAL41.NITUSU == "0830512772")) {
        _Leernumero_41();
    } else {
        if (parseInt(SAL41.NUMEROCTL) < 1000) {
            SAL41['LLAVEFACT'] = $_SUCFACT + $_CLFACT + SAL41.NROFACT;
            LLAMADO_DLL({
                dato: [SAL41.LLAVEFACT],
                callback: _dataINV401C_01_41,
                nombredll: 'INV401C',
                carpeta: 'SALUD'
            });
        } else {
            SAL41.FECHAANT = SAL41.ULTFECHANUM
            $("#compr_SAL41").val(SAL41.NUMEROCTL);
            _Leernumero_41();
        }
    }
}
function _dataINV401C_01_41(data) {
    console.debug(data, "INV401C_01");
    var data = data.split("|");
    SAL41['NUMEROFACTLNK'] = data[1].trim();
    SAL41.FECHAANT = SAL41.ULTFECHANUM;
    if (data[0].trim() == "00") {
        if (parseInt(SAL41.NUMEROCTL) < SAL41.NUMEROFACTLNK) {
            SAL41.NUMEROCTL = $_NROFACTLNK;
        }
        _Leernumero_41();
    } else {
        // CON852(date[0], date[1], date[2], _toggleNav);
        // FALTA FACTURACION DE SERVICIOS
        _Leernumero_41();
    }
}

function _Leernumero_41() {
    if ((SAL41.NITUSU == "0891855847") && ($_ANOLNK == "10")) {
        _Evaluarnumeroctl_41();
    } else {
        $("#compr_SAL41").val(SAL41.NROFACT);
        _validarnumeroctl_SAL41();
    }
}
function _Evaluarnumeroctl_41() {
    validarInputs(
        {
            form: "#COMPR_41",
            orden: "1"
        },
        () => { _Evaluarservicio_41() },
        _validarnumeroctl_SAL41
    )
}
function _validarnumeroctl_SAL41() {
    SAL41.NROFACT = $("#compr_SAL41").val();
    let datos_envio = datosEnvio()
    datos_envio += SAL41.ADMINW + "|" + $_SUCFACT + $_CLFACT + SAL41.NROFACT.padStart(6, '0');
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_01, get_url('APP/SALUD/SAL41-01.DLL'));
}

function _dataSAL41_01(data) {
    console.debug(data, "SAL41-01");
    var data = data.split("|");
    if (data[0].trim() == "00") {
        console.debug(parseInt(SAL41.NUMEROCTL));
        SAL41.NUMEROCTL = parseInt(SAL41.NUMEROCTL) + 1;
        SAL41.NUMEROCTL = SAL41.NUMEROCTL.toString().padStart(6, '0');
        SAL41.NROFACT = SAL41.NUMEROCTL;
        console.debug(SAL41.NUMEROCTL, SAL41.NROFACT);
        _Leernumero_41();
    } else if (data[0].trim() == "01") {
        _Encabezar_41();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Encabezar_41() {
    LLAMADO_DLL({
        dato: [$_ADMINW],
        callback: _dataCON007B_01_41,
        nombredll: 'CON007B',
        carpeta: 'CONTAB'
    });
}

function _dataCON007B_01_41(data) {
    console.debug(data, "CON007B_01");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ((date[1].trim() == "0") || (date[1].trim() == "5")) {
            $_FECHAACT = moment().format('YYMMDD');
            $_FECHASIST = moment().format('YYYYMMDD');
            $_FECHAFACT = $_FECHA_LNK;
            $_ANOSIST = $_FECHASIST.substring(0, 4);
            $_MESSIST = $_FECHASIST.substring(4, 6);
            $_DIASIST = $_FECHASIST.substring(6, 8);
            $_ANOACT = $_FECHAACT.substring(0, 2);
            $_MESACT = $_FECHAACT.substring(2, 4);
            $_ANOFACT = $_FECHAFACT.substring(0, 2);
            $_DIAACT = $_FECHAACT.substring(4, 6);
            $_DIAANT = SAL41.FECHAANT.substring(4, 6);
            $_MESFACT = $_FECHAFACT.substring(2, 4);
            $_DIAFACT = $_FECHAFACT.substring(4, 6);
            if ($_ANOACT == $_ANOFACT) {
                $_DIFACT = $_DIAACT;
                _Encabezar2_41();
            } else {
                $_DIAFACT = $_DIAANT;
                _Encabezar2_41();
            }
        } else {
            /// linea 2307
            _toggleNav();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }
}
function _Encabezar2_41() {
    $_UNSERVFACT = $_UNSERW;
    $_SWBONO = '0';
    if ((SAL41.NITUSU == "0900541158") || (SAL41.NITUSU == "0900566047") || (SAL41.NITUSU == "0900565371") || (SAL41.NITUSU == "0901120152")) {
        _infoSER865A_41();
        // CALL SER865A
    } else {
        _Validarclfact_41();
    }
}
function _infoSER865A_41() {
    var dispensaciones = [
        { CODIGO: '1', DESCRIPCION: 'NORMAL' },
        { CODIGO: '2', DESCRIPCION: 'AUTOMATICA' }
    ];
    var titulo = 'Facturacion';
    POPUP({
        array: dispensaciones,
        titulo: titulo,
        indices: [
            { label: 'DESCRIPCION' }
        ],
        callback_f: _Evaluarservicio_41
    },
        data => {
            SAL41.FACTAUTOFACT = data.CODIGO;
            switch (parseInt(data.CODIGO)) {
                case '1':
                case '2':
                    _Validarclfact_41();
                    break;
                default:
                    _toggleNav();
                    break;
            }
        });
}

function _Validarclfact_41() {
    $_PACIDISPE = '';
    if ($_CLFACT == "0") {
        _infoSER865_41();
    }
    else {
        _Evaluarfecha_41();
    }
}

function _infoSER865_41() {
    var medicamentos = [
        { CODIGO: '1', DESCRIPCION: 'VENTA DROGA' },
        { CODIGO: '2', DESCRIPCION: 'DEVOLUCION DROGA' },
        { CODIGO: '3', DESCRIPCION: 'PENDIENTE DROGA' },
    ]
    var titulo = 'Facturacion';
    POPUP({
        array: medicamentos,
        titulo: titulo,
        callback_f: _Evaluarservicio_41,
        indices: [
            { id: 'CODIGO', label: 'DESCRIPCION' }
        ]
    },
        data => {
            console.debug(data);
            $_TIPODRFACT = data.CODIGO;
            switch (data.CODIGO) {
                case '1':
                case '2':
                case '3':
                    $_OPSEGU = "I410" + $_TIPODRFACT;
                    LLAMADO_DLL({
                        dato: [$_ADMINW, $_OPSEGU],
                        callback: _dataCON904_02_41,
                        nombredll: 'CON904',
                        carpeta: 'CONTAB'
                    });
                    break;
            };
        })
}

function _dataCON904_02_41(data) {
    console.debug(data, "CON904-02");
    var date = data.split("|");
    if (date[0].trim() == "00") {
        if (($_CLFACT == "0") && ($_TIPODRFACT == "3")) {
            LLAMADO_DLL({
                dato: [$_ADMINW, $_OPSEGU],
                callback: _dataINV409S_01_41,
                nombredll: 'INV409S',
                carpeta: 'SALUD'
            });
        }
        else {
            _Controldispensacion_41();
        }
    }
    else {
        _Encabezar_41();
    }
}

function _dataINV409S_01_41(data) {
    console.debug(data, "INV409S_01");
    data = data.split("|");
    _toggleNav();
}

function _Controldispensacion_41() {
    if (parseInt($_CLFACT) > 0) {
        _Evaluarfecha_41();
    } else {
        if ((($_UNSERW == "02") || ($_UNSERW == "08")) && (SAL41.NITUSU != "0892000458")) {
            _Evaluarfecha_41();
        } else {
            console.debug('control dispensacion SER815')
            _Evaluarfecha_41();
        }
    }
}

function _Evaluarfecha_41() {
    fechaMask.typedValue = moment().format('YYYY-MM-DD');
    validarInputs(
        {
            form: "#FECHA_41",
            orden: "1"
        },
        () => { _Revisardato_41() },
        _Controlfecha_41
    )
}

function _Controlfecha_41() {
    $_FECHAFACT = $("#fecha_SAL41").val();
    $_ANOFAC = $_FECHAFACT.substring(2, 4);
    $_MESFACT = $_FECHAFACT.substring(5, 7);
    $_DIAFACT = $_FECHAFACT.substring(8, 10);
    $_FECHASIGFACT = moment($_FECHAFACT).format("YYYYMMDD");
    $_ANOSIGFACT = $_FECHASIGFACT.substring(0, 4);
    $_MESSIGFACT = $_FECHASIGFACT.substring(4, 6);
    $_DIASIGFACT = $_FECHASIGFACT.substring(6, 8);
    var after = moment($_FECHAFACT).isAfter($_FECHAACT);
    if ($_FECHAFACT.length < 10) {
        _Evaluarfecha_41();
    } else if (($_CLFACT == "4") || ($_CLFACT == "5")) {
        _Validarfechaopago_41();
    }
    else {
        if (after == true) {
            CON851('37', '37', null, 'error', 'error');
            if ($_SWBLOQFECHA == "S") {
                _Revisardato_41();
            }
            else {
                _Evaluarfecha_41();
            }
        }
        else {
            if (((SAL41.NITUSU == "0830092718") || (SAL41.NITUSU == "0830092719") || (SAL41.NITUSU == "0892000401") || (SAL41.NITUSU == "0900648993") || (SAL41.NITUSU == "0900193162") || (SAL41.NITUSU == "0900755133") || (SAL41.NITUSU == "0900804411") || (SAL41.NITUSU == "0900870633") || (SAL41.NITUSU == "0900658867")) && (after == true)) {
                $_OPSEGU = "I4SF";
                LLAMADO_DLL({
                    dato: [$_ADMINW, $_OPSEGU],
                    callback: _dataCON904_03_41,
                    nombredll: 'CON904',
                    carpeta: 'CONTAB'
                });
            }
            else {
                _Validarfechaopago_41();
            }
        }
    }
}

function _dataCON904_03_41(data) {
    console.debug(data, "CON904-03");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    var swinvalid2 = date[1].trim();
    if (swinvalid == "00") {
        if ($_SUCFACT == "SC") {
            _Evaluarfecha_41();
        }
        else if (swinvalid2 == "01") {
            _Evaluarfecha_41();
        }
        else {
            _Validarfechaopago_41();
        }
    }
    else {
        CON852(date[0], date[1], date[3], _toggleNav)
    }
}

function _Validarfechaopago_41() {
    if ((SAL41.NITUSU == "0800162035") || (SAL41.NITUSU == "0845000038") || (SAL41.NITUSU == "0892000401") || (SAL41.NITUSU == "0900870633")) {
        _Evaluarfechaatencion_41();
    } else {
        if ($_UNSERW == "01") {
            $_FECHAINGESTAD = $_FECHAFACT;
            SAL41.HORAATENESTAD = moment().format('LT');
            _Evaluarprefijofact_41();
        } else {
            _Evaluarfechaatencion_41();
        }
    }
}

function _Evaluarfechaatencion_41() {
    $_FECHAINGESTAD = $_FECHAFACT;
    var preanofact = parseInt($_FECHAINGESTAD);
    var minanofact = preanofact - 1;
    var maxanofact = preanofact + 1;
    var ventanafechaatencion = bootbox.dialog({
        size: 'large',
        onEscape: true,
        title: 'FECHA DE ATENCION',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-4 control-label">' + 'FECHA DE ATENCION' + '</label> ' +
            '<div class="col-md-6" id="FECHAATENCION_41"> ' +
            '<input id="fechaatencion_SAL41" type="text" class="form-control input-md" data-orden="1" maxlength="16"> ' +
            '<span class="help-block">' + 'YYYY-MM-DD HH:mm' + '</span> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanafechaatencion.off('show.bs.modal');
                    _Evaluarprefijofact_41();
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanafechaatencion.off('show.bs.modal');
                    _Evaluarfecha_41();
                }
            }
        }
    });
    ventanafechaatencion.init($('.modal-footer').hide());
    ventanafechaatencion.on('shown.bs.modal', function () {
        $("#fechaatencion_SAL41").focus();
    });
    ventanafechaatencion.init(_Evaluarventanaatencion_41(), $('#fechaatencion_SAL41').val(moment().format('YYYY-MM-DD HH:mm')));
    var DateAttentionMask = IMask($("#fechaatencion_SAL41")[0], {
        mask: Date,
        pattern: 'Y-M-d h:m',
        lazy: true,
        overwrite: true,
        autofix: true,
        blocks: {
            Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: minanofact, to: maxanofact, maxLength: 4 },
            M: { mask: IMask.MaskedRange, placeholderChar: 'M', from: 01, to: 12, maxLength: 2 },
            d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2 },
            h: { mask: IMask.MaskedRange, placeholderChar: 'h', from: 00, to: 23, maxLength: 2 },
            m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: 00, to: 59, maxLength: 2 },
        },
        format: function (date) {
            return moment(date).format("YYYY-MM-DD HH:mm");
        },
        parse: function (str) {
            var fecha = moment(str).format('YYYY-MM-DD HH:mm');
            if (fecha == "Invalid date") {
                CON851('01', '01', null, 'error', 'error');
            }
            else {
                ventanafechaatencion.off('show.bs.modal');
                return str;
            }
        }
    });
}
function _Evaluarventanaatencion_41() {
    _inputControl("disabled");
    validarInputs({
        form: '#FECHAATENCION_41',
        orden: "1"
    },
        () => { $('.btn-danger').click() },
        () => {
            $_FECHAINGESTAD = $('#fechaatencion_SAL41').val();
            console.debug($_FECHAINGESTAD)
            if ($_FECHAINGESTAD.length > 15) {
                $_FECHAINGW = $_FECHAINGESTAD;
                $('.btn-primary').click();
            } else {
                CON851('37', '37', null, 'error', 'Error');
                _Evaluarventanaatencion_41();
            }
        }
    )
}


// preguntar como realizar esta operacion ya que no se encuentra el control form usu en fd usuar p
// function _pago(){
//     if ($_CONTROLFORMUUSU == "S"){
//         if (($_PACIELNK == "000000000000001") || ($_PACIELNK == "000000000000000")){
//             // continue
//         }
//         else {
//             $_FECHABUSQ = moment().format('L');
//             $_ANOBUSQ = $_FECHABUSQ.substring(8,10);
//             $_MESBUSQ = $_FECHABUSQ.substring(3,5);
//             $_DIABUSQ = $_FECHABUSQ.substring(0,2);
//             $_CTAFACT = $_LLAVENUMECTL;
//             if (parseInt($_MESBUSQ) > 1){
//                 $_MESBUSQ = parseInt($_MESBUSQ) - 1;
//             }
//         }
//     }
// }
// function _pago2(){
//     if ($_PREFIJOFACT.trim() == ""){
//         LLAMADO_DLL({
//             dato: [$_PACIELNK, $_ANOBUSQ + $_MESBUSQ + $_DIABUSQ, $_CTAFACT],
//             callback: _dataSER836C_01,
//             nombredll: 'SER836C',
//             carpeta: 'SALUD'
//         });
//     }
// }
// function _dataSER836C_01(data){
//     console.debug(data, "SER836C_01");
//     var date = data.split("|");
//     var swinvalid = date[0].trim();
//     if (swinvalid == "00"){
//         _Evaluarprefijofact_41();
//     }
//     else {
//         CON852(date[0],date[1],date[2], _toggleNav);
//     }
// }

function _Evaluarprefijofact_41() {
    $_FECHASIGATEN = $_FECHAINGESTAD;
    $_FECHASIGATEN = moment($_FECHASIGATEN).format("YYYYMMDD");
    validarInputs({
        form: '#FACTURA_41',
        orden: "1"
    },
        function () { _Evaluarfecha_41() },
        _Validarprefijofact_41
    )
}
function _Validarprefijofact_41() {
    $_PREFIJOFACT = $("#factura_SAL41").val();
    $_PREFIJOFACT = $_PREFIJOFACT.substring(0, 1);
    if (((SAL41.NITUSU == "0830092718") || (SAL41.NITUSU == "0830092719") || (SAL41.NITUSU == "0900193162") || (SAL41.NITUSU == "0892000401") || (SAL41.NITUSU == "0900648993") || (SAL41.NITUSU == "0900755133") || (SAL41.NITUSU == "0900870633") || (SAL41.NITUSU == "0900804411")) && (($_PREFIJOFACT == "C") || ($_PREFIJOFACT == "E"))) {
        CON851('49', '49', null, 'error', 'error');
        $('#factura_SAL41').val('');
        _Evaluarprefijofact_41();
    }
    else if (($_PREFIJOFACT.trim() == "") || (parseInt($_PREFIJOFACT) == 0)) {
        $("#factura_SAL41").val('');
        _Evaluarprefijofact_41();
    }
    else {
        _Ubicarcuenta_41();
    }
}
function _Ubicarcuenta_41() {
    if (($_PREFIJOFACT == "E") || ($_PREFIJOFACT == "C")) {
        $_ESTADONUM = "0";
        $_CONVENIONUM = $_CODTAR = "CL";
        // $_NITCTAW = $_NITNUM;
        $_DESCRIPNUM = " ";
        $_TIPOPACINUM = "*";
        $_FORMACOPAGNUM = "1";
        $_FACTCAPITNUM = ' ';
        $_PRECAPITNUM = ' ';
        $_NROCAPITNUM = ' ';
        $_NITNUM = $_NITCTAW = ' ';
        $_FECHAINGNUM = ' ';
        $_REDEXTERNUM = ' ';
        console.debug($_CONVENIONUM, $_ESTADONUM);
        if ($_PREFIJOFACT == "E") {
            $_OPSEGU = "89";
            let datos_envio = datosEnvio()
            datos_envio += $_SECUNUM
            console.debug(datos_envio);
            // SolicitarDll({ datosh: datos_envio }, _dataCON007_02_41, get_url('APP/CONTAB/CON007.DLL'));
            _EvaluarCON0072_SAL41();
        } else if ($_PREFIJOFACT == "C") {
            $_OPSEGU = "96"
            let datos_envio = datosEnvio()
            datos_envio += $_SECUNUM
            console.debug(datos_envio);
            // SolicitarDll({ datosh: datos_envio }, _dataCON007_02_41, get_url('APP/CONTAB/CON007.DLL'));
            _EvaluarCON0072_SAL41();
        }
    }
    else {
        _Evaluarnrofact_41();
    }
}

function _EvaluarCON0072_SAL41() {
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + $_OPSEGU }, URL)
        .then(data => {
            console.debug(data);
            var data = data.split("|");
            $_NUMEROCTL2 = data[1].substring(3, 9);
            $_ULTFECHANUM2 = data[2].trim();
            if ((SAL41.NITUSU == "0891855847") && ($_ANOLNK == "10")) {
                _Evaluarnrofact_41();
            }
            else {
                $("#facturad_SAL41").val($_NUMEROCTL2);
                _Leerconvenio_41();
            }
        })
        .catch(err => {
            console.debug(err);
            CON852(date[0], date[1], date[2], _toggleNav);
        })
}

function _Evaluarnrofact_41() {
    validarInputs({
        form: '#FACTURAD_41',
        orden: "1"
    },
        function () { _Evaluarfecha_41() },
        _Validarnrofact_41
    )
}

function _Validarnrofact_41() {
    $_NROCTAFACT = $('#facturad_SAL41').val();
    if (parseInt($_NROCTAFACT) == 0) {
        _Evaluarnrofact_41();
        $('#facturad_SAL41').val('');
    }
    else {
        let datos_envio = datosEnvio()
            + '|' + $_PREFIJOFACT
            + '|' + $_NROCTAFACT.padStart(6, '0');
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_02, get_url('APP/SALUD/SAL41-02.DLL'));
    }
}

function _dataSAL41_02(data) {
    console.debug(data, "SAL41-02");
    var date = data.split("|");
    $_LLAVESALIDNUM = date[1].trim();
    $_CONTROLXSERVNUM = date[2].trim();
    $_CONTROLCL0NUM = date[3].trim();
    $_CONTROLCL1NUM = date[4].trim();
    $_CONTROLCL2NUM = date[5].trim();
    $_CONTROLCL3NUM = date[6].trim();
    $_CONTROLCL4NUM = date[7].trim();
    $_CONTROLCL5NUM = date[8].trim();
    $_CONTROLCL6NUM = date[9].trim();
    $_CONTROLCL7NUM = date[10].trim();
    $_FECHAINGNUM = date[11].trim();
    $_ANOINGNUM = $_FECHAINGNUM.substring(2, 4);
    $_MESINGNUM = $_FECHAINGNUM.substring(4, 6);
    $_DIAINGNUM = $_FECHAINGNUM.substring(6, 8);
    $_ESTADONUM = date[12].trim();
    $_NITNUM = date[13].trim();
    $_NITCTAW = $_NITNUM;
    $_IDPACNUM = date[14].trim();
    $_CONTROLCAPNUM = date[15].trim();
    $_CTLNROPACINUM = date[16].trim();
    $_FECHAFARMANUM = date[17].trim();
    $_MESFARMANUM = $_FECHAFARMANUM.substring(4, 6);
    $_CONVENIONUM = date[18].trim();
    $_LLAVENUM = date[19].trim();
    $_FECHARETNUM = date[20].trim();
    $_FECHARETNUM = moment($_FECHARETNUM).format("YYYYMMDD");
    $_ANORETNUM = $_FECHARETNUM.substring(0, 4);
    $_MESRETNUM = $_FECHARETNUM.substring(4, 6);
    $_DIARETNUM = $_FECHARETNUM.substring(6, 8);
    $_DESCRIPNUM = date[21].trim();
    $_HORAINGNUM = date[22].trim();
    $_HRINGNUM = $_HORAINGNUM.substring(0, 2);
    $_MNINGNUM = $_HORAINGNUM.substring(2, 4);
    $_FACTCAPITNUM = date[23].trim();
    $_PRECAPITNUM = $_FACTCAPITNUM.substring(0, 1);
    $_NROCAPITNUM = $_FACTCAPITNUM.substring(1, 7);
    $_MYTNUM = date[24].trim();
    $_FECHASALID = date[25].trim();
    $_MONTOCONTW = date[26].trim();
    $_SALDOCONTW = date[27].trim();
    $_PORCENTCONTW = date[28].trim();
    $_PORCAVISOCNCAP = date[29].trim();
    $_SWINVALIDCONT = date[30].trim();
    $_SWINVALIDSALID = date[31].trim();
    $_TIPOPACINUM = date[32].trim();
    $_CONTRATONUM = date[33].trim();
    $_REDEXTERNUM = date[34].trim();
    $_FORMACOPAGNUM = date[35].trim();
    // $_PORCAVISOCNCAP = date[30].trim();
    if (date[0].trim() == "00") {
        _Leercuenta_41();
    }
    else if (date[0].trim() == "01") {
        CON851('01', '01', null, 'error', 'error');
        $('#facturad_SAL41').val('');
        _Evaluarnrofact_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Leercuenta_41() {
    if (SAL41.NITUSU == "0844003225") {
        _Leercuenta2_41();
    }
    else {
        if (($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "T") || ($_PREFIJOFACT == "C") || ($_PREFIJOFACT == "E")) {
            _Leercuenta2_41();
        }
        else {
            if (($_DIASIST >= 20) && (($_ANOACT == $_ANOLNK) && ($_MESACT == $_MESLNK))) {
                $_MESSIST = parseInt($_MESSIST) + 1;
                $_DIASIST = "01";
                if ($_MESSIST > 12) {
                    $_ANOSIST = parseInt($_ANOSIST) + 1;
                    $_ANOSIST = $_ANOSIST.toString();
                    $_MESSIST = "01";
                    _Leercuenta2_41();
                }
                else {
                    _Leercuenta2_41();
                }
            }
            else {
                _Leercuenta2_41();
            }
        }
    }
}

function _Leercuenta2_41() {
    if (((SAL41.NITUSU == "0800037021") || (SAL41.NITUSU == "0800162035")) && (($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "T"))) {
        if (parseInt($_LLAVESALIDANUM) > 0) {
            $_FECHASALIDBOLW = $_FECHASALID;
            $_ANOACSALIDBOLW = $_FECHASALIDBOLW.substring(0, 4);
            $_MESSALIDBOLW = $_FECHASALIDBOLW.substring(4, 6);
            $_DIASALIDBOLW = $_FECHASALIDBOLW.substring(6, 8);
            if ($_FECHASALID.trim() == '') {
                _Leercuenta3_41();
            }
            else if ($_FECHAFACT > $_FECHASALIDBOLW) {
                CON851('8D', '8D', null, 'error', 'error');
                $('#facturad_SAL41').val('');
                _Evaluarnrofact_41();
            }
            else {
                _Leercuenta3_41();
            }
        }
        else {
            _Leercuenta3_41();
        }
    }
    else {
        _Leercuenta3_41();
    }
}

function _Leercuenta3_41() {
    console.debug('leercuenta3');
    if ($_CONTROLXSERVNUM == "S") {
        switch ($_CLFACT) {
            case "0":
                if ($_CONTROLCL0NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_SAL41").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "1":
                if ($_CONTROLCL1NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_SAL41").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "2":
                if ($_CONTROLCL2NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_SAL41").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "3":
                if ($_CONTROLCL3NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_SAL41").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "4":
                if ($_CONTROLCL4NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_SAL41").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "5":
                if ($_CONTROLCL5NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_SAL41").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "6":
                if ($_CONTROLCL6NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_SAL41").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "7":
                if ($_CONTROLCL7NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_SAL41").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            default:
                _Leercuenta4_41();
                break;
        }
    }
    else {
        _Leercuenta4_41();
    }
}

function _Leercuenta4_41() {
    console.debug("leer cuenta 4")
    if (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) {
        if ((($_ANOINGNUM == $_ANOSIGFACT.substring(2, 4)) && ($_MESINGNUM == $_MESSIGFACT)) || (($_ANOINGNUM == $_ANOSIST.substring(2, 4)) && ($_MESINGNUM == $_MESSIST) && ($_ANOLNK == $_ANOACT) && ($_MESLNK == $_MESACT))) {
            _Leercuenta5_41();
        }
        else {
            console.debug($_ANOINGNUM, $_ANOSIGFACT.substring(2, 4), $_MESINGNUM, $_MESSIGFACT, $_ANOINGNUM, $_ANOSIST.substring(2, 4), $_MESINGNUM, $_MESSIST, $_ANOLNK, $_ANOACT, $_MESLNK, $_MESACT);
            CON851('91', '91', null, 'error', 'error');
            $("#facturad_SAL41").val("");
            _Evaluarnrofact_41();
        }
    }
    else {
        if ($_FECHASIGFACT < $_FECHAINGNUM) {
            CON851('91', '91', null, 'error', 'error');
            $("#facturad_SAL41").val("");
            _Evaluarnrofact_41();
        }
        else {
            _Leercuenta5_41();
        }
    }
}

function _Leercuenta5_41() {
    $_NITFACT = $_NITNUM;
    $_NITCTAW = $_NITNUM;
    console.debug($_FECHASIGATEN, $_FECHARETNUM);
    if (($_MESRETNUM > 0) && ($_FECHASIGATEN > $_FECHARETNUM)) {
        CON851('91', '91', null, 'error', 'error');
        $("#facturad_SAL41").val("");
        _Evaluarnrofact_41();
    }
    else if ($_ESTADONUM == "1") {
        CON851('13', '13', null, 'error', 'error');
        $("#facturad_SAL41").val("");
        _Evaluarnrofact_41();
    }
    else if ($_ESTADONUM == "2") {
        CON851('13', '13', null, 'error', 'error');
        $("#facturad_SAL41").val("");
        _Evaluarnrofact_41();
    }
    else if ($_ESTADONUM == "3") {
        CON851('13', '13', null, 'error', 'error');
        $("#facturad_SAL41").val("");
        _Evaluarnrofact_41();
    }
    else if (($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "T")) {
        if ((SAL41.NITUSU == "0830092718") || (SAL41.NITUSU == "0830092719") || (SAL41.NITUSU == "0900193162")) {
            $_IDHISTORIAFACT = $_IDPACNUM;
            console.debug('quitar condicion funciona solo pára pruebas');
            _Leercuenta6_41();
        }
        else {
            $_IDHISTORIAFACT = $_IDPACNUM;
            _Leercuenta6_41();
        }
    }
    else {
        if (SAL41.NITUSU == "0800251482") {
            $_IDHISTORIAFACT = $_IDPACNUM;
            _Leercuenta6_41();
        }
        else {
            _Leercuenta6_41();
        }
    }
}

function _Leercuenta6_41() {
    if ((parseInt($_CONTROLCAPNUM) == 0) || ($_CONTROLCAPNUM == "9999") || ($_CONTROLCAPNUM.trim() != "")) {
        _Leercuenta7_41();
    } else {
        if (parseFloat($_PORCENTCONTW) >= 100) {
            CON851('9D', '9D', null, 'error', 'error');
            $("#facturad_SAL41").val("");
            _Evaluarnrofact_41();
        } else {
            if (parseFloat($_PORCENTCONTW) >= 90) {
                CON851('9C', '9C', null, 'error', 'error');
                $("#facturad_SAL41").val("");
                _Evaluarnrofact_41();
            } else {
                if (parseFloat($_PORCENTCONTW) >= 90) {
                    CON851('9B', '9B', null, 'error', 'error');
                    $("#facturad_SAL41").val("");
                    _Evaluarnrofact_41();
                } else {
                    _Leercuenta7_41();
                }
            }
        }
    }
}

function _Leercuenta7_41() {
    if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) && ($_CTLNROPACINUM == "S")) {
        console.debug("SER835F SC SALUD PROBLEMA");
    }
    else if (($_CLFACT == "0") && (parseInt($_MESFARMANUM) > 0)) {
        console.debug('revisar');
        var mostrarfechafarm = moment($_FECHAFARMANUM).format("dddd YYYY MM DD");
        var ventanafechafarm = bootbox.dialog({
            message: mostrarfechafarm,
            size: 'small',
            buttons: {
                Aceptar: {
                    label: 'Aceptar',
                    className: 'btn-submit',
                    callback: function () {
                        _Leerconvenio_41();
                        $("#myModal").off("keydown");
                    }
                }
            }
        });
        $("#myModal").on("keydown", function (e) {
            if (e.wich == 13) {
                $(".btn-submit").click();
            }
        });
    }
    else {
        _Leerconvenio_41();
    }
}
function _Leerconvenio_41() {
    $_PREFIJOFACT = $('#factura_SAL41').val();
    $_NROCTAFAC = $('#facturad_SAL41').val();
    if ($_PREFIJOFACT == "E") {
        if ($_MESFACT == $_MESACT) {
            let datos_envio = datosEnvio()
            datos_envio += $_ADMINW
                + '|' + $_CONVENIONUM
                + '|' + $_PREFIJOFACT
                + '|' + SAL41.NROFACT;
            SolicitarDll({ datosh: datos_envio }, _dataSAL41_03, get_url('APP/SALUD/SAL41-03.DLL'));
        }
        else {
            CON851('91', '91', null, 'error', 'error');
            $("#facturad_SAL41").val("");
            _Evaluarnrofact_41();
        }
    }
    else {
        let datos_envio = datosEnvio()
        datos_envio += $_ADMINW
            + '|' + $_CONVENIONUM
            + '|' + $_PREFIJOFACT
            + '|' + SAL41.NROFACT;
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_03, get_url('APP/SALUD/SAL41-03.DLL'));
    }
}
function _dataSAL41_03(data) {
    console.debug(data, "SAL41-03");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    $_CODTAR = date[1].trim();
    $_DESCRIPTAR = date[2].trim();
    $("#convenio_SAL41").val($_CODTAR + " - " + $_DESCRIPTAR);
    $_PORCPOTAR = date[3].trim();
    $_PORCPOTAR = parseFloat($_PORCPOTAR);
    $_PORCNPTAR = date[4].trim();
    $_PORCNPTAR = parseFloat($_PORCNPTAR);
    $_PORCMOTAR = date[5].trim();
    $_PORCMOTAR = parseFloat($_PORCMOTAR);
    $_PORCMQTAR = date[6].trim();
    $_PORCMQTAR = parseFloat($_PORCMQTAR);
    $_SALMINTAR = date[7].trim();
    if ($_SALMINTAR.trim() == '') {
        $_SALMINTAR = '000000.00';
    }
    $_SALMINTAR = parseFloat($_SALMINTAR);
    console.debug($_SALMINTAR);
    $_CODTABTAR = [date[8], date[9], date[10], date[11], date[12], date[13]];
    // $_FACTCAPITNUM = date[14].trim();
    // $_PRECAPITNUM = $_FACTCAPITNUM.substring(0, 1);
    // $_NROCAPITNUM = $_FACTCAPITNUM.substring(1, 6);
    // $_NITNUM = date[15].trim();
    // $_NITCTAW = $_NITNUM;
    // $_FECHAINGNUM = date[16].trim();
    // $_REDEXTERNUM = date[17].trim();
    $_HNQUIRTAR = date[18].trim();
    if ($_HNQUIRTAR.trim() == '') {
        $_HNQUIRTAR = '000000.00';
    }
    $_HNQUIRTAR = parseFloat($_HNQUIRTAR);
    // $_CISNUM = date[19].trim();
    $_PORCTABTAR = [date[20].trim(), date[21].trim(), date[22].trim(), date[23].trim(), date[24].trim(), date[25].trim()];
    $_LLAVENUM = date[26].trim();
    $_HNAYUDTAR = date[27].trim();
    $_HNANESTAR = date[28].trim();
    let json = date[29].trim();
    $_BASEMEDTAR = date[30].trim();
    // $_ARTIVANUM = date[31].trim();
    // $_CLASIFNUM = date[32].trim();
    let rutaJson = get_url('temp/' + json);
    SolicitarDatos(
        null,
        function (data) {
            $_TABLATAR = data.TABLA_TAR;
            console.debug(data, json);
            let arrayEliminar = [];
            arrayEliminar.push(json);
            _eliminarJson(arrayEliminar, on_eliminarJsonTablatar_41);
        },
        rutaJson
    );
    if (swinvalid == "00") {
        if ($_CLFACT == "0") {
            $_CODTABW = $_CONVENIONUM;
            if ($_PORCPOTAR == 0) {
                $_PORCPOTAR = 100;
                $_BASEMEDTAR = 3;
                _Macrodocumentos_41();
            }
            else if ($_PORCNPTAR == 0) {
                $_PORCNPTAR = $_PORCPOTAR;
                _Macrodocumentos_41();
            }
            else if ($_PORCMOTAR == 0) {
                $_PORCMOTAR = $_PORCPOTAR;
                _Macrodocumentos_41();
            }
            else if ($_PORCMQTAR) {
                $_PORCMQTAR = $_PORCPOTAR;
                _Macrodocumentos_41();
            }
            else {
                _Macrodocumentos_41();
            }
        }
        else {
            salminnumero = $.isNumeric($_SALMINTAR);
            if ($_CLFACT == "7") {
                $_SWCL = "5";
                // _macrodocumentos();
                _Premacrodocumento_41();
            }
            else {
                $_SWCL = $_CLFACT;
                // _macrodocumentos();
                _Premacrodocumento_41();
            }
        }
    }
    else if (swinvalid == "01") {
        CON851('', 'Error no existe convenio', null, 'error', 'Error');
        $("#convenio_SAL41").val('');
        _Evaluarnrofact_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function on_eliminarJsonTablatar_41(data) {
    console.debug(data);
    var date = data.split('|');
    if (date[0].trim() == '00') {
        console.debug('json eliminado');
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}
function _Premacrodocumento_41() {
    $_TIPOTABW = $_CLFACT;
    $_CODTABW = $_CODTABTAR[$_SWCL];
    if (($_SALMINTAR == 0) || (salminnumero == true)) {
        console.debug("no tengo swcl");
        $_SALMINTAR = $_SALMINW;
        _Macrodocumentos_41();
    }
    else {
        _Macrodocumentos_41();
    }
}

function _Macrodocumentos_41() {
    $_NITCTAW2 = $_NITCTAW.substring(4, 10);
    let datos_envio = datosEnvio()
    datos_envio += $_NITCTAW2 + '|' + $_DESCRIPNUM + '|' + 'DOCUMENTOS EXIGIDOS POR LA ENTIDAD' + '|' + 'F'
    console.debug(datos_envio);
    let URL = get_url("APP/SALUD/SER210A.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            console.debug(data, "SER210A_01", 'revisar');
            SER822_41();
        })
        .catch(err => {
            console.debug(err);
        })
}

function SER822_41() {
    var puertasingreso = '[{"codigo": "1", "descripcion": "URGENCIAS"},{"codigo": "2","descripcion": "C EXTERNA"},{"codigo": "3","descripcion": "REMITIDO"},{"codigo": "4","descripcion": "NACID INS"}]'
    var puertaingreso = JSON.parse(puertasingreso);
    var titulo = 'PUERTA DE INGRESO';
    POPUP({
        array: puertaingreso,
        titulo: titulo,
        indices: [
            { id: 'codigo', label: 'descripcion' }
        ],
        callback_f: _Evaluarnrofact_41
    },
        _evaluarSER822_41);

}
function _evaluarSER822_41(data) {
    loader('hide');
    _inputControl('disabled');
    $_PUERTAINGW = data.codigo;
    switch (data.codigo) {
        case '1':
        case '2':
        case '3':
        case '4':
            _Validarpuertaingreso_41();
            break;
        default:
            _toggleNav();
            break;
    }
    $("#pingreso_SAL41").val(data.codigo + " - " + data.descripcion);
}

function _Validarpuertaingreso_41() {
    if ($_PUERTAINGW == 2) {
        if (($_UNSERW != 02) || ($_UNSERW != 08)) {
            _Ubicarcliente_41();
        } else {
            CON851('03', '03', null, 'error', 'error');
            SER822_41();
        }
    } else if (($_UNSERW == "01") && ($_PUERTAINGW == 2)) {
        CON851('03', '03', null, 'error', 'error');
        SER822_41();
    } else if (((SAL41.NITUSU == "0830092718") || (SAL41.NITUSU == "0830092719") || (SAL41.NITUSU == "0900193162")) && (($_NITNUM == "0830092718") || ($_NITNUM == "0830092719") || ($_NITNUM == "0900193162"))) {
        // GO TO DATO-BARRAS-PROMO
        console.debug('dato barras promo');
    } else {
        $_SWBONO = "0";
        _Ubicarcliente_41();
    }
}

function _Ubicarcliente_41() {
    if (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) {
        _Mostrarcliente_41();
    }
    else if ($_PREFIJOFACT == "E") {
        if (SAL41.NITUSU == "0800162035") {
            $_NITFACT = "222222222";
            _Evaluarcliente_41();
        }
        else {
            $_NITFACT = "9999";
            _Evaluarcliente_41();
        }
    }
    else {
        _Evaluarcliente_41();
    }
}

function _Evaluarcliente_41() {
    // $_NITFACT = $_NITFACT.trim();
    $_NITFACT = '' ? clienteMask.typedValue = '' : clienteMask.typedValue = $_NITFACT;
    validarInputs({
        form: '#CLIENTE_41',
        orden: '1'
    },
        function () { _Evaluarfecha_41() },
        _Cliente_41
    )
}

function _Cliente_41() {
    $_NITFACT = clienteMask.unmaskedValue;
    var espacios = $_NITFACT.trim();
    var nitfact = espacios.padStart(10, '0');
    $_NITFACT = nitfact;
    if (($_NITFACT.trim() == "") || (parseInt($_NITFACT) == 0)) {
        CON851('01', '01', null, 'error', 'Error');
        $('#cliente_SAL41').val('');
        _Evaluarcliente_41();
    }
    else {
        let datos_envio = datosEnvio()
        datos_envio += $_ADMINW
            + '|' + $_NITFACT;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_04, get_url('APP/SALUD/SAL41-04.DLL'));
    }
}

function _dataSAL41_04(data) {
    console.debug(data, "SAL41-04");
    var date = data.split("|");
    $_DESCRIPTER = date[1].trim();
    $_ACTTER = date[2].trim();
    $_ENTIDADTER = date[3].trim();
    $_DESCRIPTER2 = date[4].trim();
    if (date[0].trim() == "00") {
        if ($_PREFIJOFACT == "E") {
            switch ($_PUCUSU) {
                case "4":
                    if ($_ACTTER == "27") {
                        _Mostrarcliente_41();
                    }
                    else {
                        CON851('14', '14', null, 'error', 'Error');
                        $("#cliente_SAL41").val("");
                        _Evaluarcliente_41();
                    }
                case "6":
                    if ($_ACTTER == "27") {
                        _Mostrarcliente_41();
                    }
                    else {
                        CON851('14', '14', null, 'error', 'Error');
                        $("#cliente_SAL41").val("");
                        _Evaluarcliente_41();
                    }
                default:
                    if (($_ACTTER == "27") || ($_ACTTER == "30")) {
                        _Mostrarcliente_41();
                    }
                    else {
                        CON851('14', '14', null, 'error', 'Error');
                        $("#cliente_SAL41").val("");
                        _Evaluarcliente_41();
                    }
            }
        }
        else {
            _Mostrarcliente_41();
        }
    }
    else if (date[0].trim() == '01') {
        _Crearcliente_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }
}

function _Crearcliente_41() {
    let { ipcRenderer } = require("electron");
    ipcRenderer.send('another', 'SALUD/PAGINAS/SAL7767.html');
    vector = ['on', 'Actualizando maestro de pacientes...']
    _EventocrearSegventana(vector, _Evaluarcliente_41);
}

function _Mostrarcliente_41() {
    if (parseInt($_NITFACT) == 0) {
        $('#cliented_401').val('');
        _Evaluarcliente_41();
    }
    else {
        clienteMask.typedValue = $_NITFACT;
        let datos_envio = datosEnvio()
        datos_envio += $_ADMINW
            + '|' + $_NITFACT;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_042, get_url('APP/SALUD/SAL41-04.DLL'));
    }
}
function _dataSAL41_042(data) {
    console.debug(data, "SAL41-04");
    var date = data.split("|");
    $_DESCRIPTER = date[1].trim();
    $_ACTTER = date[2].trim();
    $_ENTIDADTER = date[3].trim();
    $_DESCRIPTER2 = date[4].trim();
    if (date[0].trim() == '00') {
        if ($_DESCRIPNUM.trim() == '') {
            // $('#cliente_401').val($_NITFACT);
            $('#cliented_SAL41').val($_DESCRIPTER);
            _Calcularmes_41();
        }
        else {
            // $('#cliente_401').val($_NITFACT);
            $('#cliented_SAL41').val($_DESCRIPNUM);
            _Calcularmes_41();
        }
    }
    else if (date[0].trim() == "01") {
        _Crearcliente_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }
}

function _Calcularmes_41() {
    console.debug("calcular mes 1");
    $_FECHAMESW1 = $_FECHAINGNUM;
    $_MESMES = $_FECHAMESW1.substring(4, 6);
    $_ANOMES = $_FECHAMESW1.substring(0, 4);
    switch ($_MESMES) {
        case "01":
            $_NROMESW1 = "0";
            _Calcularmes2_41();
            break;
        case "02":
            $_NROMESW1 = "31";
            _Calcularmes2_41();
            break;
        case "03":
            $_NROMESW1 = "59";
            _Calcularmes2_41();
            break;
        case "04":
            $_NROMESW1 = "90";
            _Calcularmes2_41();
            break;
        case "05":
            $_NROMESW1 = "120";
            _Calcularmes2_41();
            break;
        case "06":
            $_NROMESW1 = "151";
            _Calcularmes2_41();
            break;
        case "07":
            $_NROMESW1 = "181";
            _Calcularmes2_41();
            break;
        case "08":
            $_NROMESW1 = "212";
            _Calcularmes2_41();
            break;
        case "09":
            $_NROMESW1 = "243";
            _Calcularmes2_41();
            break;
        case "10":
            $_NROMESW1 = "273";
            _Calcularmes2_41();
            break;
        case "11":
            $_NROMESW1 = "304";
            _Calcularmes2_41();
            break;
        case "12":
            $_NROMESW1 = "334";
            _Calcularmes2_41();
            break;
        default:
            $_NROMESW1 = "0"
            _Calcularmes2_41();
            break;
    }
}
function _Calcularmes2_41() {
    console.debug("calcular mes 2");
    if ((parseInt($_MESMES) > 2) && (($_ANOMES == "1996") || ($_ANOMES == "2000") || ($_MESMES == "2004") || ($_MESMES == "2008") || ($_MESMES == "2012") || ($_MESMES == "2016"))) {
        $_NROMESW = parseInt($_NROMESW) + 1;
        _Calcularmes3_41();
    }
    else {
        _Calcularmes3_41();
    }
}
function _Calcularmes3_41() {
    $_FECHAMESW2 = $_FECHASIGFACT;
    $_MESMES = $_FECHAMESW2.substring(4, 6);
    $_ANOMES = $_FECHAMESW2.substring(0, 4);
    switch ($_MESMES) {
        case "01":
            $_NROMESW2 = "0";
            _Calcularmes4_41();
            break;
        case "02":
            $_NROMESW2 = "31";
            _Calcularmes4_41();
            break;
        case "03":
            $_NROMESW2 = "59";
            _Calcularmes4_41();
            break;
        case "04":
            $_NROMESW2 = "90";
            _Calcularmes4_41();
            break;
        case "05":
            $_NROMESW2 = "120";
            _Calcularmes4_41();
            break;
        case "06":
            $_NROMESW2 = "151";
            _Calcularmes4_41();
            break;
        case "07":
            $_NROMESW2 = "181";
            _Calcularmes4_41();
            break;
        case "08":
            $_NROMESW2 = "212";
            _Calcularmes4_41();
            break;
        case "09":
            $_NROMESW2 = "243";
            _Calcularmes4_41();
            break;
        case "10":
            $_NROMESW2 = "273";
            _Calcularmes4_41();
            break;
        case "11":
            $_NROMESW2 = "304";
            _Calcularmes4_41();
            break;
        case "12":
            $_NROMESW2 = "334";
            _Calcularmes4_41();
            break;
        default:
            $_NROMESW2 = "0"
            _Calcularmes4_41();
            break;
    }
}
function _Calcularmes4_41() {
    if ((parseInt($_MESMES) > 2) && (($_ANOMES == "1996") || ($_ANOMES == "2000") || ($_MESMES == "2004") || ($_MESMES == "2008") || ($_MESMES == "2012") || ($_MESMES == "2016"))) {
        $_NROMESW2 = parseInt($_NROMESW2) + 1;
        // _calcularhoras();
        if ($_FECHAINGNUM.length > 8) {
            $_HRINGNUM = $_FECHAINGNUM.substring(8, 10);
            $_MNINGNUM = $_FECHAINGNUM.substring(10, 12);
            _Calcularhoras_41();
        }
        else {
            $_HORAINGNUM = "00";
            $_MNINGNUM = "00";
            _Calcularhoras_41();
        }
    }
    else {
        if ($_FECHAINGNUM.length > 8) {
            $_HRNGNUM = $_FECHAINGNUM.substring(8, 10);
            $_MNINGNUM = $_FECHAINGNUM.substring(10, 12);
            _Calcularhoras_41();
        }
        else {
            $_HRINGNUM = "00";
            $_MNINGNUM = "00";
            _Calcularhoras_41();
        }
    }
}

function _Calcularhoras_41() {
    console.debug("faltan dos variables de facturacion de servicios FD-SALUD");
    $_HRELABFACT = "00";
    $_MNELABFACT = "00";
    $_ANOINGNUM = $_FECHAINGNUM.substring(2, 4);
    $_MESINGNUM = $_FECHAINGNUM.substring(4, 6);
    $_DIAINGNUM = $_FECHAINGNUM.substring(6, 8);

    $_ANOSIGFACT = $_FECHASIGFACT.substring(2, 4);
    $_MESSIGFACT = $_FECHASIGFACT.substring(4, 6);
    $_DIASIGFACT = $_FECHASIGFACT.substring(6, 8);
    $_HORASINGW = ((((parseInt($_ANOINGNUM) * 365.25) + 24)) + ($_NROMESW1 * 24) + (parseInt($_DIAINGNUM) * 24) + parseInt($_HRINGNUM) + (parseInt($_MNINGNUM) / 60));
    $_HORASACTW = ((((parseInt($_ANOSIGFACT) * 365.25) + 24)) + ($_NROMESW2 * 24) + (parseInt($_DIAFACT) * 24) + parseInt($_HRELABFACT) + (parseInt($_MNELABFACT) / 60));
    if ($_HORASINGW > $_HORASACTW) {
        console.debug($_HORASACTW, $_HORASINGW);
        $_DIASESTANCW = "";
        _Resultadohoras_41();
    }
    else {
        console.debug($_HORASACTW, $_HORASINGW);
        $_DIASESTANCW = ($_HORASACTW - $_HORASINGW) / 24;
        _Resultadohoras_41();
    }
}
function _Resultadohoras_41() {
    $_DIASESTANCEDIT = $_DIASESTANCW;
    console.debug($_DIASESTANCEDIT);
    $_ENTESTANCEDIT = Math.floor($_DIASESTANCEDIT);
    $_DECESTANCEDIT = $_ENTESTANCEDIT - $_DIASESTANCEDIT;
    if ($_DECESTANCEDIT > 25) {
        $_ENTESTANCEDIT = $_ENTESTANCEDIT + 1;
        $_DECESTANCEDIT = "";
        _Validandocliente_41();
    }
    else {
        _Validandocliente_41();
    }
}

function _Validandocliente_41() {
    $_NOMBRECTA = $_DESCRIPTER;
    if (($_PREFIJOFACT == "C") && ((SAL41.NITUSU == "0892000401") || (SAL41.NITUSU == "0900648993") || (SAL41.NITUSU == "0900755133") || (SAL41.NITUSU == "0900804411") || (SAL41.NITUSU == "0900870633")) && ($_NITFACT != "9999")) {
        if (($_ACTTER == "01") || ($_ACTTER == "03") || ($_ACTTER == "04") || ($_ACTTER == "05")) {
            _Validandocliente2_41();
        }
        else {
            toastr.info("ERROR ACTIVIDAD DE TERCERO");
            _Evaluarcliente_41();
        }
    }
    else {
        _Validandocliente2_41();
    }
}
function _Validandocliente2_41() {
    $_TIPOPACI.length > 0 ? $_TIPOPACI = $_TIPOPACI : $_TIPOPACI = ' ';
    if (($_ACTTER == "23") && ($_ENTESTANCEDIT > 0) && ($_TIPOPACI == "S") && ($_PREFIJOFACT == "P")) {
        // _avisarpos();
        // toastr.info("Recuerde que el ¨POS solo cubre 24 HORAS en observación");
        CON851('', 'Recuerde que el POS solo cubre 24 HORAS en observación', null, 'warning', 'Advertencia!');
    }
    if ($_PREFIJOFACT == "P") {
        if ((($_CLFACT == "0") || ($_CLFACT == "1") || ($_CLFACT == "3") || ($_CLFACT == "4"))) {
            _Datopaciente_41();
        }
        else {
            _Datoordserv_41();
        }
    }
    else {
        _Datoordserv_41();
    }
}
function _Datoordserv_41() {
    if (SAL41.NITUSU == "0800162035") {
        if ((($_UNSERW == "01") || ($_UNSERW == "09")) && ($_REDEXTERNUM != "S")) {
            $_SWORDSERV = "N";
            SAL41.ORDSERVFACT = "";
            _Datopaciente_41();
        } else {
            _Ventanaordserv_41();
        }
    } else {
        if (SAL41.NITUSU == "0900434629") {
            $_SWORDSERV = "S";
            _Ventanaordserv_41();
        }
        else {
            if ((($_UNSERW == "01") || ($_UNSERW == "08") || ($_UNSERW == "09")) || ($_FECHAACT == $_FECHAFACT)) {
                $_SWORDSERV == "N";
                SAL41.ORDSERVFACT = "";
                _Datopaciente_41();
            }
            else {
                _Ventanaordserv_41();
            }
        }
    }
}

function _Ventanaordserv_41() {
    var ventanaOrdserv = bootbox.dialog({
        size: 'small',
        title: 'SERVICIOS PRESTADO RED EXTERNA',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-6 control-label" for="name">' + "Es un servicion autorizado x red externa?" + '</label> ' +
            '<div class="col-md-6" id="REDEXT_401"> ' +
            '<input id="redext_SAL41" class="form-control input-md" data-orden="1" maxlength="1"> ' +
            '<span class="help-block">' + "S/N" + '</span> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanaOrdserv.off('show.bs.modal');
                    console.debug($_SWORDSERV, $_SWORDSERV.length);
                    if ($_SWORDSERV == 'N') {
                        SAL41.ORDSERVFACT = '';
                        setTimeout(_Datopaciente_41, 200);
                    } else {
                        $_PREFORDSERVFACT = $_PREFIJOUSU;
                        $_CLORDSERVFACT = $_CLFACT;
                        console.debug("hace falta la ventanaordserv2");
                        //_Ventanaordserv2_41
                        // setTimeout(_Datopaciente_41, 100);
                    }
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanaOrdserv.off('show.bs.modal');
                    console.debug($_SWORDSERV, $_SWORDSERV.length);
                    _Evaluarcliente_41();
                }
            }
        }
    });
    ventanaOrdserv.init($('.modal-footer').hide());
    ventanaOrdserv.init(_EvaluarRedext_41());
    ventanaOrdserv.init(Maskventanaordserv_41());
    ventanaOrdserv.on('shown.bs.modal', function () {
        $("#redext_SAL41").focus();
    });
}

function _EvaluarRedext_41() {
    _inputControl("disabled");
    validarInputs({
        form: '#REDEXT_401',
        orden: "1"
    },
        () => { $('.btn-danger').click() },
        () => {
            $_SWORDSERV = $('#redext_SAL41').val(); $_SWORDSERV = $_SWORDSERV.trim();
            $_SWORDSERV == '' ? _EvaluarRedext_41() : $('.btn-primary').click();
        }
    )
}

function Maskventanaordserv_41() {
    var prefijoMask = IMask($("#redext_SAL41")[0], {
        mask: 'a',
        definitions: {
            'a': /[N-S]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
}

function _Ventanaordserv2_41() {
    var ventanaOrdserv2 = bootbox.dialog({
        size: 'small',
        title: 'SERVICIOS PRESTADO RED EXTERNA',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group" id="PREFORDSERV_41"> ' +
            '<label class="col-md-2 control-label" for="name">' + "PREFIJO" + '</label> ' +
            '<div class="col-md-4"> ' +
            '<input id="prefordserv_SAL41" class="form-control input-md" data-orden="1" maxlength="2"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="form-group" id="CLORDSERV_401"> ' +
            '<label class="col-md-2 control-label" for="name">' + "CLASE" + '</label> ' +
            '<div class="col-md-4"> ' +
            '<input id="clordserv_SAL41" class="form-control input-md" data-orden="2" maxlength="1"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="form-group" id="NROORDSERV_401"> ' +
            '<label class="col-md-2 control-label" for="name">' + "NRO.ORDEN" + '</label> ' +
            '<div class="col-md-4"> ' +
            '<input id="nroordserv_SAL41" class="form-control input-md" data-orden="3" maxlength="6"> ' +
            '</div> ' +
            '</div> ' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                callback: function () {
                    ventanaacceso.off('show.bs.modal');
                    SAL41.ORDSERVFACT = $("#prefordserv_401").val() + $("#clordserv_401").val() + $("#nroordserv_401").val();
                    _Datopaciente_41();
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanaacceso.off('show.bs.modal');
                    _Evaluarcliente_41();
                }
            }
        }
    });
    ventanaOrdserv2.init(_Evaluarnroordserv_41());
    ventanaOrdserv2.init($("#prefordserv_401").val($_PREFIJOUSU), $("#clordserv_401").val($_CLFACT));
    ventanaOrdserv2.on('shown.bs.modal', function () {
        $("#prefordserv_SAL41").focus();
    });
}
function _Evaluarnroordserv_41() {
    _inputControl("disabled");
    validarInputs({
        form: '#PREFORDSERV_41',
        orden: "1"
    },
        function () { $('.btn-danger').click() },
        _Validarprefordserv_41
    )
}
function _Validarprefordserv_41() {
    var contenido = $("#prefordserv_SAL41").val($_PREFIJOUSU);
    if (contenido.trim() == "") {
        CON851('02', '02', null, 'error', 'error');
        $("#prefordserv_SAL41").val("");
        _Evaluarprefordserv_41();
    }
    else {
        _Evaluarclordserv_41();
    }
}
function _Evaluarclordserv_41() {
    _inputControl("disabled");
    validarInputs({
        form: '#CLORDSERV_41',
        orden: "1"
    },
        function () { _Evaluarprefordserv_41() },
        _validarclordserv
    )
}
function _validarclordserv() {
    var contenido = $("#clordserv_SAL41").val($_CLFACT);
    if ((contenido.trim() == "") || (contenido.trim() == "1") || (contenido.trim() == "2") || (contenido.trim() == "3") || (contenido.trim() == "4") || (contenido.trim() == "5") || (contenido.trim() == "6") || (contenido.trim() == "7") || (contenido.trim() == "8") || (contenido.trim() == "9")) {
        CON851('03', '03', null, 'error', 'error');
        $("#clordserv_SAL41").val("");
        _Evaluarclordserv_41();
    }
    else {
        _Evaluarnroordserv_41();
    }
}
function _Evaluarnroordserv_41() {
    _inputControl("disabled");
    validarInputs({
        form: '#NROORDSERV_41',
        orden: "1"
    },
        function () { _Evaluarclordserv_41() },
        _validarinputOrdserv_41
    )
}

function _validarinputOrdserv_41() {
    SAL41.ORDSERVFACT = $("#prefordserv_SAL41").val() + $("#clordserv_SAL41").val() + $("#nroordserv_SAL41").val();
    // bootbox.hideAll();
    // ME HACE FALTA REALIZAR EL DLL PARA CONSULTAR AUTORIZACIONES-SALUD POR FALTA DE .DAT
    LLAMADO_DLL({
        dato: [SAL41.ORDSERVFACT],
        callback: _dataINV401_07_41,
        nombredll: 'INV401-07',
        carpeta: 'SALUD'
    });
}

function _dataINV401_07_41(data) {
    console.debug(data, "INV401-07");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    var swinvalid1 = date[1].trim();
    if (swinvalid == "00") {
        if (swinvalid1 == "00") {
            /// FALTA LINEA 3373
            $(".btn-primary").click();
        }
        else {
            CON851('01', '01', null, 'error', 'error');
            _evaluarOrdserv();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _Datopaciente_41() {
    console.debug("estoy en dato paciente", SAL41.NITUSU, $_UNSERW);
    $_SWCREAR = '0';
    // CLINICA META Y SERVIMEDICOS TIENEN PISTOLA CEDULA ADMISIONES URGENCIAS
    if (((SAL41.NITUSU == "0892000401") || (SAL41.NITUSU == "0800162035")) && (($_UNSERW == "01") || ($_UNSERW == "02"))) {
        setTimeout(SER848, 50);
        // _Leerpaciente_41();
    } // LA MALOKA
    else if (SAL41.NITUSU == "0800251482") {
        _Leerpaciente_41();
    } else if (SAL41.NITUSU == "0830512772") {
        _Evaluaridhistoriafact_41();
    } else {
        _Datopaciente2_41();
    }
}

function _Datopaciente2_41() {
    if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) && ($_IDPACNUM != "000000000000001")) {
        console.debug("diferente a e y p y diferente a 000000000000001 el id del paciente");
        $_IDHISTORIAFACT = $_IDPACNUM;
        console.debug($_IDHISTORIAFACT);
        $_IDHISTORIAFACT = parseInt($_IDHISTORIAFACT);
        if ($_PREFIJOFACT != 'A') {
            idhistoriafactMask.typedValue = $_IDHISTORIAFACT;
        }
        _Evaluaridhistoriafact_41();
    } else {
        _Evaluaridhistoriafact_41();
    }
}

function _Evaluaridhistoriafact_41() {
    console.debug($_IDHISTORIAFACT, $_IDPACNUM);
    if ($_PREFIJOFACT != 'A') {
        idhistoriafactMask.typedValue = $_IDHISTORIAFACT;
    }
    validarInputs({
        form: '#PACIENTE_41',
        orden: "1"
    },
        function () { _Evaluarfecha_41() },
        _Validaridhistoriafact_41
    )
}

function _Validaridhistoriafact_41() {
    $_IDHISTORIAFACT = idhistoriafactMask.unmaskedValue;
    $_IDHISTORIAFACT = $_IDHISTORIAFACT.padStart(15, "0");
    if (($_IDHISTORIAFACT == "000000000000000") || ($_IDHISTORIAFACT.trim() == "")) {
        $('#paciente_SAL41').val('');
        _Datopaciente_41();
    }
    // else if (($_PREFIJOFACT == "P") && ($_SEXOPACI == "M") && ($_IDHISTORIAFACT != $_IDPACNUM)) {
    //     $_IDHISTORIAFACT = $_IDPACNUM;
    // }
    if (($_PREFIJOFACT == "P") && ($_IDHISTORIAFACT != $_IDPACNUM)) {
        CON851('7O', '7O', null, 'error', 'Error');
    }
    // else if (($_PREFIJOFACT == "P") && ($_SEXOPACI == "F") && (($_CLFACT == "0") || ($_CLFACT == "1") || ($_CLFACT == "3") || ($_CLFACT == "4")) && ($_IDHISTORIAFACT != $_IDPACNUM)) {
    //     $_IDHISTORIAFACT = $_IDPACNUM;
    //     _Leerpaciente_41();
    // }
    else if ((($_CLFACT == "1") || ($_CLFACT == "2") || ($_CLFACT == "3") || ($_CLFACT == "5") || ($_CLFACT == "5")) && (parseInt($_IDHISTORIAFACT) < 000000000000010)) {
        console.debug("no deberia entrar");
        CON851('03', '03', null, 'error', 'Error');
        _Datopaciente_41();
    }
    else if (SAL41.NITUSU == "0800162035") {
        if ((($_PREFIJOUSU == "05") || ($_PREFIJOUSU == "06") || ($_PREFIJOUSU == "08") || ($_PREFIJOUSU == "10") || ($_PREFIJOUSU == "11") || ($_PREFIJOUSU == "12") || ($_PREFIJOUSU == "14") || ($_PREFIJOUSU == "15") || ($_PREFIJOUSU == "17")) && (parseInt($_NROCAPITNUM) > 0) && ($_FACTCAPITNUM == $_LLAVENUM) && ($_IDHISTORIAFACT != "000000000000001")) {
            CON851('1W', '1W', null, 'error', 'Error');
        } else {
            if ((parseInt($_NROCAPITNUM) > 0) && ($_FACTCAPITNUM == $_LLAVENUM) && ($_IDHISTORIAFACT != "000000000000001")) {
                CON851('1W', '1W', null, 'error', 'Error');
                _Datopaciente_41();
            }
            else {
                _Leerpaciente_41();
            }
        }
    }
    else {
        if ((parseInt($_NROCAPITNUM) > 0) && ($_FACTCAPITNUM == $_LLAVENUM) && ($_IDHISTORIAFACT != "000000000000001")) {
            CON851('1W', '1W', null, 'error', 'Error');
            _Datopaciente_41();
        }
        else {
            _Leerpaciente_41();
        }
    }
}

function _Leerpaciente_41() {
    $_IDHISTORIAFACT = idhistoriafactMask.unmaskedValue;
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_IDHISTORIAFACT.padStart(15, '0');
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_05, get_url("APP/SALUD/SAL41-05.DLL"));
}

function _dataSAL41_05(data) {
    console.debug(data, "SAL41-05");
    var date = data.split('|');
    $_EPSPACI = date[1].trim();
    $_DESCRIPPACI = date[2].trim();
    $_NACIMPACI = date[3].trim();
    $_TIPOPACI = date[4].trim();
    $_CONTRATOPACI = date[5].trim();
    $_TUTELAPACI = date[6].trim();
    $_ALTCOSPACI = date[7].trim();
    $_PROGESPPACI = date[8].trim();
    $_CRONICOPACI = date[9].trim();
    $_MULTICONSULPACI = date[10].trim();
    $_SEXOPACI = date[11].trim();
    $_CLASIFPACI = date[12].trim();
    $_CIUDADPACI = date[13].trim();
    $_TIPOAFILPACI = date[14].trim();
    $_DERECHOPACI = date[15].trim();
    $_FECHAVENCEPACI = date[16].trim();
    $_RESTAPLIPACI = date[17].trim();
    $_RESTDROGPACI = date[18].trim();
    $_RESTCIRUPACI = date[19].trim();
    $_RESTLABOPACI = date[20].trim();
    $_RESTIMAGPACI = date[21].trim();
    $_RESTESTAPACI = date[22].trim();
    $_RESTCONSPACI = date[23].trim();
    $_RESTTERFPACI = date[24].trim();
    $_RESTTEROPACI = date[25].trim();
    $_RESTODONPACI = date[26].trim();
    $_RESTPYPPACI = date[27].trim();
    $_NITFACTPACI = date[28].trim();
    $_TIPOPACIDPACI = date[29].trim();
    $_ESTRATOPACI = date[30].trim();
    $_FECHANOTAPAC2 = date[31].trim();
    $_OBSERV1ANOTAPAC2 = date[32].trim();
    $_OBSERV1BNOTAPAC2 = date[33].trim();
    $_OBSERV1CNOTAPAC2 = date[34].trim();
    $_OBSERV2NOTAPAC2 = date[35].trim();
    $_OBSERV3NOTAPAC2 = date[36].trim();
    $_OBSERV4NOTAPAC2 = date[37].trim();
    $_OBSERV5NOTAPAC2 = date[38].trim();
    $_OPEROBSENOTAPAC2 = date[39].trim();
    $_FACTNOTAPAC2 = date[40].trim();
    $_DIRECCPACI = date[41].trim();
    $_TELEFONOPACI = date[42].trim();
    $_ESTCIVPACI = date[43].trim();
    $_CELPACI = date[44].trim();
    $_EMAILPACI = data[45].trim();
    SAL41.OCUPACION = data[46].trim();
    SAL41.ZONAPACI = data[47].trim();
    SAL41.ACOMPAPACI = date[48].trim();
    SAL41.NOMBREOCU = date[49].trim();
    $('#paciented_SAL41').val($_DESCRIPPACI);
    if (date[0].trim() == "00") {
        _Validarpaciente_41();
    } else if (date[0].trim() == '01') {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_OPSEGU;
        SolicitarDll({ datosh: datos_envio }, _dataCON904S_01_41, get_url("APP/CONTAB/CON904S.DLL"));
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }
}
function _dataCON904S_01_41(data) {
    console.debug(data, "CON904S-01");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    var swinvalid1 = date[2].trim();
    if (swinvalid == "00") {
        if ((swinvalid1 == '00') && ($_SWCREAR == '0')) {
            $_SWCREAR = '1';
            // ACTUALIZACION DE MAESTRO DE PACIENTES SER110C
            let { ipcRenderer } = require("electron");
            ipcRenderer.send('another', 'SALUD/PAGINAS/SAL7767.html');
            vector = ['on', 'Actualizando maestro de pacientes...']
            _EventocrearSegventana(vector, _Evaluaridhistoriafact_41);
        } else {
            CON851('01', '01', null, 'error', 'Error');
            _Datopaciente_41();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
// function _Actualizacionmaestrosu_41() {
//     ipcRenderer.send('another', { html:'SALUD/PAGINAS/SAL7767.html'});
// }
function _Validarpaciente_41() {
    if (SAL41.NITUSU == "0900019291") {
        if ((SAL41.NITUSU == '0800162035') && ($_SWINVALID == '2B')) {
            // PREFORM GRABAR-CAMBIO-DOCUMENTO
        } else {
            _Validandocliente3_41();
        }
    } else {
        if ($_SWCREAR == '0') {
            if ((($_CLFACT == "3") || ($_CLFACT == "5") || ($_CLFACT == "7")) || ((SAL41.NITUSU == "0891855847") || (SAL41.NITUSU == "0900565371"))) {
                $_OPSEGU = "IS767";
                LLAMADO_DLL({
                    dato: [$_ADMINW, $_OPSEGU],
                    callback: _dataCON904S_02_41,
                    nombredll: 'CON904S',
                    carpeta: 'CONTAB'
                })
            }
            else {
                console.debug('validar cliente 3');
                /// SER 810H
                _Validandocliente3_41();
            }
        } else {
            _Validandocliente3_41();
        }
    }
}
function _dataCON904S_02_41(data) {
    console.debug(data, "CON904-02");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    var swinvalid1 = date[1].trim();
    if (swinvalid == "00") {
        if (swinvalid1 == "00") {
            // ACTUALIZACION DE MAESTRO DE PACIENTES SER110C GO TO LEER PACIENTE
        }
        else {
            $_OPSEGU = "IS1G";
            LLAMADO_DLL({
                dato: [$_ADMINW, $_OPSEGU],
                callback: _dataCON904S_03_41,
                nombredll: 'CON904S',
                carpeta: 'CONTAB'
            })
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _dataCON904S_03_41(data) {
    console.debug(data, "CON904-03");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    var swinvalid1 = date[1].trim();
    if (swinvalid == "00") {
        if (SAL41.NITUSU == "0800162035") {
            if (($_EPSPACI == "RES004") && (swinvalid1 == "00")) {
                console.debug("actualizacion de pacientes");
                // CALL SER11G Y DESPUES GO TO LEER-PACIENTE
                console.debug('segunda ventana de actualizar paciente SER11G')
                let { ipcRenderer } = require("electron");
                ipcRenderer.send('another', 'SALUD/PAGINAS/SAL7767.html');
                vector = ['on', 'Actualizando maestro de pacientes...']
                _EventocrearSegventana(vector, _Validandocliente3_41);
                // _Validandocliente3_41();
            }
            else {
                // CALL SER11I Y DESPUES GO TO LEER PACIENTE
                console.debug('segunda ventana de actualizar paciente SER11I')
                let { ipcRenderer } = require("electron");
                ipcRenderer.send('another', 'SALUD/PAGINAS/SAL7767.html');
                vector = ['on', 'Actualizando maestro de pacientes...']
                _EventocrearSegventana(vector, _Validandocliente3_41);
                // _Validandocliente3_41();
            }
        }
        else {
            if (swinvalid1 == "00") {
                $_SWCREAR = '1'
                // CALL SER11G Y DESPUES GO TO PACIENTE
                console.debug('segunda ventana de actualizar paciente SER11G')
                let { ipcRenderer } = require("electron");
                ipcRenderer.send('another', 'SALUD/PAGINAS/SAL7767.html');
                vector = ['on', 'Actualizando maestro de pacientes...']
                _EventocrearSegventana(vector, _Validandocliente3_41);
                // _Validandocliente3_41();
            }
            else {
                _Validandocliente3_41();
            }
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Validandocliente3_41() {
    if ($_TIPOPACINUM == '*') {
        _Validandocliente4_41();
    } else {
        if ($_TIPOPACINUM == $_TIPOPACI) {
            _Validandocliente4_41();
        } else {
            if (SAL41.NITUSU == '0845000038') {
                if ((($_TIPOPACINUM == 'D') || ($_TIPOPACINUM == 'E') || ($_TIPOPACINUM == 'F')) || (($_TIPOPACINUM == 'D') || ($_TIPOPACINUM == 'E') || ($_TIPOPACINUM == 'F'))) {
                    _Validandocliente4_41();
                }
            } else {
                CON851('3F', '3F', null, 'error', 'Error');
                _Datopaciente_41();
            }
        }
    }
}
function _Validandocliente4_41() {
    if ((SAL41.NITUSU == '0844003225') || (SAL41.NITUSU == '0800251482') || (SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0900193162')) {
        _Validandocliente5_41();
    } else {
        if ((($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) && ($_CONTRATONUM.trim() != '') && ($_CONTRATOPACI.trim() != '') && ($_CONTRATONUM != $_CONTRATOPACI)) {
            CON851('2M', '2M', null, 'error', 'Error');
            _Datopaciente_41();
        } else {
            _Validandocliente5_41();
        }
    }
}
function _Validandocliente5_41() {
    console.debug('validandocliente 5');
    if (($_IDHISTORIAFACT == '000000086059367') && (SAL41.NITUSU == '0900405505')) {
        $_CONTRATOPACIW = $_CONTRATONUM;
        if ($_CONTRATONUM == $_CONTRATOPACI) {
            _Validandocliente6_41();
        } else {
            CON851('2M', '2M', null, 'error', 'Error');
            _Datopaciente_41();
        }
    }
    else if (($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'T')) {
        if (SAL41.NITUSU == '0800037021') {
            if (($_TIPOPACIDPACI == 'RC') || ($_TIPOPACIDPACI == 'MSI')) {
                _Validandocliente6_41();
            }
            else {
                if ($_IDHISTORIAFACT != $_IDPACNUM) {
                    CON851('7O', '7O', null, 'error', 'Error');
                    _Datopaciente_41();
                }
            }
        }
        else {
            _Validandocliente6_41();
        }
    }
    else {
        _Validandocliente6_41();
    }
}

function _Validandocliente6_41() {
    if ($_TUTELAPACI == 'S') {
        CON851('5B', '5B', null, 'error', 'Error');
    }
    else if ($_ALTCOSPACI == 'S') {
        CON851('5J', '5J', null, 'error', 'Error');
    }
    else if ($_PROGESPPACI == 'S') {
        CON851('5Q', '5Q', null, 'error', 'Error');
    }
    else if ($_CRONICOPACI == 'S') {
        CON851('7A', '7A', null, 'error', 'Error');
    }
    else if ($_MULTICONSULPACI == 'S') {
        CON851('5V', '5V', null, 'error', 'Error');
    }
    $('#sexo_SAL41').val($_SEXOPACI);
    $('#estrato_SAL41').val($_ESTRATOPACI);
    $('#ciudad_SAL41').val($_CIUDADPACI);
    $_CIUDADFACT = $_CIUDADPACI;
    switch ($_TIPOAFILPACI.trim()) {
        case '1':
            $('#tipoafiliacion_SAL41').val('COTIZANTE');
            break;
        case '2':
            $('#tipoafiliacion_SAL41').val('BENEFICIARIO');
            break;
        case '3':
            $('#tipoafiliacion_SAL41').val('COT. PENSIONADO');
            break;
        case '4':
            $('#tipoafiliacion_SAL41').val('UPC ADICIONAL');
            break;
        default:
            $('#tipoafiliacion_SAL41').val('SIN DETERMINAR');
            break;
    }
    _Calcularedad_41();
    console.debug($_EDAD);
    $('#edad_SAL41').val($_EDAD);
    if (($_PACIDISPE.trim() != '') && ($_IDHISTORIAFACT != $_PACIDISPE)) {
        CON851('06', '06', null, 'error', 'Error');
        _Datopaciente_41();
    }
    // CALL CON802A
    console.debug($_FECHAINGNUM, $_ENTESTANCEDIT);
    if ($_PREFIJOFACT == 'P') {
        $('#ULTIMOSDATOS_41').append(
            '<div class="col-md-3 col-sm-3 col-xs-12">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-12 col-sm-12 col-xs-12">' + 'INGRESO:' + $_FECHAINGNUM.toString() + '  &nbsp' + $_ENTESTANCEDIT.toString() + '</label>' +
            '</div>' +
            '</div>'
        );
        _Validandocliente7_41();
    }
    else if ((SAL41.NITUSU == '0845000038') || (SAL41.NITUSU == '0800251482')) {
        _Validandocliente7_41();
    }
    else {
        if ((($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) && (parseInt($_IDHISTORIAFACT) > 000000000001)) {
            // SER 836C LINEA 3737
            let fecha = $_FECHAFACT.split('-');
            let datos_envio = datosEnvio() + $_IDHISTORIAFACT + '|' + fecha[0].substring(2, 4) + fecha[1] + fecha[2] + '|' + $_LLAVENUM + '|' + $_ADMINW;
            console.debug(datos_envio);
            SolicitarDll({ datosh: datos_envio }, data => {
                console.debug(data);
                data = data.split('|');
                if (data[1].trim() != '') { CON851('1K', '1K', null, 'warning', 'Advertencia!') }
            }, get_url("APP/SALUD/SER836C.DLL"));
            _Validandocliente7_41();
        }
        else {
            _Validandocliente7_41();
        }
    }
}

function _Validandocliente7_41() {
    console.debug('validandocliente 7')
    $_FECHAVENCEPACI = '00000000';
    console.debug('quitar fechavence paci solo para prueba');
    if ((SAL41.NITUSU == '0844003225') && $_CIUDADPACI != '85001') {
        $_DERECHOPACI = '2';
    }
    if (((SAL41.NITUSU == '0900229438') || (SAL41.NITUSU == '0800162035')) && ($_FECHAVENCEPACI > 0) && ($_FECHAINGESTAD > $_FECHAVENCEPACI)) {
        $_DERECHOPACI = '2';
    }
    if ((($_DERECHOPACI == '2') || ($_DERECHOPACI == '4') || ($_DERECHOPACI == '7') || ($_DERECHOPACI == '8') || ($_DERECHOPACI == 'A')) && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
        CON851('80', '80', null, 'error', 'Error');
        if (($_PUERTAINGW == '2') && (SAL41.NITUSU == '0800037979')) {
            _Datopaciente_41();
        }
        else if ((SAL41.NITUSU == '0800162035') || (SAL41.NITUSU == '0900405505')) {
            _Datopaciente_41()
        }
        else {
            _Validandocliente8_41();
        }
    }
    else {
        _Validandocliente8_41();
    }
}

function _Validandocliente8_41() {
    console.debug('validandocliente 8');
    if (($_DERECHOPACI == '5') && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
        CON851('2N', '2N', null, 'error', 'Error');
        if ($_PUERTAINGW == '2') {
            _Datopaciente_41();
        }
        else {
            _Validandocliente82_41();
        }
    }
    if (($_DERECHOPACI == '6') && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
        CON851('2T', '2T', null, 'warning', 'Advertencia!');
        _Validandocliente82_41();
    }
    else {
        _Validandocliente82_41();
    }
}
function _Validandocliente82_41() {
    console.debug('validandocliente 82');
    if (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) {
        switch ($_CLFACT) {
            case '0':
                if (($_RESTDROGPACI == 'N') && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                } else {
                    _Validandocliente83_41();
                }
                break;
            case '1':
                if ($_RESTCIRUPACI == 'N') {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                } else {
                    _Validandocliente83_41();
                }
                break;
            case '2':
                if ($_RESTLABOPACI == 'N') {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                } else {
                    _Validandocliente83_41();
                }
                break;
            case '3':
                if ($_RESTIMAGPACI == 'N') {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                } else {
                    _Validandocliente83_41();
                }
                break;
            case '7':
                if ($_RESTPYPPACI == 'N') {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                } else {
                    _Validandocliente83_41();
                }
                break;
            default:
                _Validandocliente83_41();
                break;
        }
    } else {
        _Validandocliente83_41();
    }
}

function _Validandocliente83_41() {
    if (($_UNDEDADMAXSERV == 'D') && ($_UNIDEDADELAB != 'D')) {
        CON851('74', '74', null, 'error', 'Error');
        _Datopaciente_41();
    }
    else if (($_UNDEDADMINSERV == 'M') && ($_UNIDEDADELAB == 'D')) {
        CON851('74', '74', null, 'error', 'Error');
        _Datopaciente_41();
    }
    else if (($_UNDEDADMAXSERV == 'M') && ($_UNIDEDADELAB == 'A')) {
        CON851('74', '74', null, 'error', 'Error');
        _Datopaciente_41();
    }
    else if (($_UNDEDADMINSERV == 'A') && ($_UNIDEDADELAB != 'A')) {
        CON851('74', '74', null, 'error', 'Error');
        _Datopaciente_41();
    }
    else if (($_UNDEDADMAXSERV == 'A') && ($_UNIDEDADELAB == 'A') && ($_VLREDADELAB > parseInt($_VLREDADMINSERV))) {
        CON851('74', '74', null, 'error', 'Error');
        _Datopaciente_41();
    }
    else if (($_UNDEDADMINSERV == 'A') && ($_UNIDEDADELAB == 'A') && ($_VLREDADELAB < parseInt($_VLREDADMINSERV))) {
        CON851('74', '74', null, 'error', 'Error');
        _Datopaciente_41();
    } else {
        _Validandocliente84_41();
    }
}

function _Validandocliente84_41() {
    if ($_ENTIDADTER == 'SIN001') {
        _Validandopaciente9_41();
    } else {
        if (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) {
            if (($_ENTIDADTER == 'EAR001') && (($_EPSPACI == 'EAR001') || ($_EPSPACI == 'EAR002') || ($_EPSPACI == 'EAR003') || ($_EPSPACI == 'EAR004') || ($_EPSPACI == 'EAR005'))) {
                _Validandopaciente9_41();
            } else {
                if ((($_ENTIDADTER == 'EAR000') || ($_ENTIDADTER == 'PEC004') || ($_ENTIDADTER == 'EAS027')) && (($_EPSPACI == 'EAR000') || ($_EPSPACI == 'PEC004') || ($_EPSPACI == 'PEC004'))) {
                    _Validandopaciente9_41();
                } else {
                    if ($_ENTIDADTER != $_EPSPACI) {
                        CON851('9S', '9S', null, 'warning', 'Advertencia!');
                        if (($_CLFACT == '7') && (isNumeric($_VENDEDORTER))) {
                            _Datopaciente_41()
                        } else if ((SAL41.NITUSU == '0900229438') && ($_ENTIDADTER == 'SIN438')) {
                            _Datopaciente_41();
                        } else if (((SAL41.NITUSU == '0800162035') || (SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0900005594') || (SAL41.NITUSU == '0830512772') || (SAL41.NITUSU == '0830511298') || (SAL41.NITUSU == '0822001570') || (SAL41.NITUSU == '0844003225')) && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) && ($_NITNUM != '0000009999') && ($_ADMINW != 'GEBC')) {
                            _Datopaciente_41();
                        } else {
                            _Validandopaciente10_41();
                        }
                    } else {
                        _Validandopaciente10_41();
                    }
                }
            }
        } else {
            _Validandopaciente9_41();
        }
    }
}

function _Validandopaciente9_41() {
    console.debug('validando cliente 9');
    if ((SAL41.NITUSU == '0844003225') || (SAL41.NITUSU == '0800251482')) {
        _Validandopaciente10_41();
    } else {
        if ((($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) && ($_CONTRATONUM.trim() != '') && ($_CONTRATOPACI.trim() != '') && ($_CONTRATONUM != $_CONTRATOPACI)) {
            CON851('2M', '2M', null, 'error', 'Error');
            _Datopaciente_41();
        } else {
            _Validandopaciente10_41();
        }
    }
}

function _Validandopaciente10_41() {
    if ((SAL41.NITUSU == '0900229438') && ($_EPSPACI == 'SIN438') && ($_FECHAVENCEPACI < $_FECHAINGESTAD)) {
        CON851('9S', '9S', null, 'error', 'Error');
        _Datopaciente_41();
    } else if (((SAL41.NITUSU == '0900004059') || (SAL41.NITUSU == '0891855847')) && ($_NITFACTPACI != $_NITFACT) && ($_NITFACT != '9999')) {
        CON851('9S', '9S', null, 'error', 'Error');
        _Datopaciente_41();
    } else {
        _Buscarconsultas_41();
    }
}

function _Buscarconsultas_41() {
    SER835({ PACIENTE: $_IDHISTORIAFACT.padStart(15, '0'), CLFACT: $_CLFACT, NITUSU: SAL41.NITUSU, DESCRIPPACI: $_DESCRIPPACI }, _Evaluaridhistoriafact_41, _Buscarconsultas2_41);
}

function _Buscarconsultas2_41() {
    if ((SAL41.NITUSU == '0800162035') && (($_NITFACT == '0860525150') || ($_NITFACT == '0860525149') || ($_NITFACT == '0900255098') || ($_NITFACT == '0860525148') || ($_NITFACT == '0900255099') || ($_NITFACT == '0900520316') || ($_NITFACT == '0900520317') || ($_NITFACT == '0900520318'))) {
        // SER 835E
    } else if (($_CLFACT == '0') && ((($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) && (SAL41.NITUSU != '0830512772')) {
        // CALL 836A LINEA 3988
    } else if ((SAL41.NITUSU == '0800162035') && ($_UNSERW == '01') && ($_CLFACT != '5') && ($_PREFIJOUSU == '01') && ($_REDEXTERNUM == '01')) {
        // CALL SER 836U LINEA 4018
    } else if ((SAL41.NITUSU == '0891855847') && ($_UNSERW == '01') && ($_CLFACT != '5') && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
        // CALL SER 836U LINEA 4041
    }
    $_SWOCULTAR = '00'
    $_OPSEGU = 'I41O';
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_OPSEGU;
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataCON904S_04_41, get_url("APP/CONTAB/CON904S.DLL"));
}
function _dataCON904S_04_41(data) {
    console.debug(data, 'CON904S_04');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var swinvalid1 = date[2].trim();
    if (swinvalid == '00') {
        if (swinvalid1 == '00') {
            _buscarconsultas3_41();
        }
        else {
            $_SWOCULTAR = '01';
            // MIRAR LINEA 4067
            _buscarconsultas3_41();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _buscarconsultas3_41() {
    if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
        INV401D();
    }
    else {
        _Viaacceso_41();
    }
}

function _Viaacceso_41() {
    if ($_CLFACT == '1') {
        var viasdeacceso = '[{"codigo": "1","descripcion": "ABDOMINAL"},{"codigo": "2", "descripcion": "CUELLO"},{"codigo": "3", "descripcion": "TORAXICA"},{"codigo": "4", "descripcion": "CRANEAL"},{"codigo": "5", "descripcion": "MIEMB.SUP.IZQ"},{"codigo": "6", "descripcion": "MIEMB.SUP.DER"},{"codigo": "7", "descripcion": "MIEMB.INF.IZQ"},{"codigo": "8", "descripcion": "MIEMB.INF.DER"},{"codigo": "9", "descripcion": "RECTAL"},{"codigo": "A", "descripcion": "VAGINAL"},{"codigo": "B", "descripcion": "OIDO"},{"codigo": "C", "descripcion": "NARIZ"},{"codigo": "D", "descripcion": "BOCA"},{"codigo": "E", "descripcion": "OCULAR"},{"codigo": "G", "descripcion": "OTRO"}]';
        var viaacceso = JSON.parse(viasdeacceso);
        POPUP({
            array: viaacceso,
            titulo: "VIA DE ACCESO",
            indices: [
                { id: 'codigo', label: 'descripcion' }
            ],
            callback_f: _Evaluaridhistoriafact_41
        },
            _evaluarviaacceso_41);
    } else {
        $_VIAW = '00'; $_CRUENTAW = '00';
        _Dato1_41();
    }
}

function _evaluarviaacceso_41(data) {
    switch (data.codigo) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'E':
        case 'G':
            setTimeout(_Datocruenta_41, 400);
            break;
        default:
            _Datopaciente_41();
            // $_VIAW = $_VIAFACT; CONDICION CUANDO AFCTURA DE SERVICIOS ESTE DISPONIBLE
            break;
    }
    $_VIAW = data.codigo;
    if ($.isNumeric(data.codigo)) {
        $_VIAW = '0' + $_VIAW;
    }
    else {
        var numeros = [10, 11, 12, 13, 14, 15];
        var letras = ['A', 'B', 'C', 'D', 'E', 'G'];
        for (var i in letras) {
            if (numeros[i] == letras[i]) {
                $_VIAW = numeros[i];
                break;
            }
        }
    }
}

function _Datocruenta_41() {
    var intervenciones = '[{"codigo": "1","descripcion": "CRUENTA"},{"codigo": "2", "descripcion": "INCRUENTA"}]';
    var intervencion = JSON.parse(intervenciones);
    POPUP({
        array: intervencion,
        titulo: "INTERVENCION",
        indices: [
            { id: 'codigo', label: 'descripcion' }
        ],
        callback_f: _Evaluaridhistoriafact_41
    },
        _Evaluarintervencion_41);
}

function _Evaluarintervencion_41(data) {
    switch (data.codigo) {
        case '1':
        case '2':
            $_CRUENTAW = data.codigo;
            _Dato1_41();
            break;
        default:
            _Viaacceso_41();
            break;
    }
}

function _Dato1_41() {
    console.debug('dato1_41');
    $_VIAFACT = $_VIAW;
    $_CRUENTAFACT = $_CRUENTAW;
    $_TARIFFACT = $_CODTABW;
    $_PUERTAESTAD = $_PUERTAINGW;
    $_MACROFACT = 0;
    $_I = 1;
    $_K = 1;
    $_ESPECLAB = '';
    if ((($_CLFACT == '3') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7'))) { // && ($_SWORDSERV == 'N')
        SER836({ PACIENTE: $_IDHISTORIAFACT.padStart(15, '0'), FECHA: $_FECHASIGATEN, ANO: $_ANOACT }, () => { _Dato1_2_41(); $_FINALIDESTAD = ' ' }, data => {
            console.debug(data);
            SAL41.CITAS = data;
            $_FINALIDESTAD = SAL41.CITAS.FINALID_CIT;
            $('#codservicio2_SAL41').val(SAL41.CITAS.LLAVE_CIT.substring(36, 48))
            let datos_envio = datosEnvio() + SAL41.ADMINW + '|' + SAL41.CITAS.MED_CIT.padStart(10, '0');
            SolicitarDll({ datosh: datos_envio }, data => {
                console.debug(data);
                data = data.split('|');
                $('#espec_SAL41').val(data[10].trim());
                $('#atend_SAL41').val(SAL41.CITAS.MED_CIT);
                _Dato1_2_41();
            }, get_url('APP/SALUD/SAL41-11.DLL'))
            // _Dato1_2_41();
        });
    }
    else if ((SAL41.NITUSU == '0900405505') && ($_FECHACIT != $_FECHAACT) && ($_IDHISTORIAFACT != 000000000000001)) {
        CON851('9F', '9F', null, 'error', 'Error');
        if (($_CLFACT == '2') || ($_CLFACT == '3') || ($_CLFACT == '7')) {
            _Dato1_2_41();
        }
        else {
            let datos_envio = datosEnvio();
            datos_envio += '|'
            datos_envio += $_OPSEGU;
            SolicitarDll({ datosh: datos_envio }, _dataCON904S_05_41, get_url("APP/CONTAB/CON904S.DLL"));
        }
    }
    else {
        _Dato1_2_41();
    }
}

function _dataCON904S_05_41(data) {
    console.debug(data, 'CON904S_05');
    var date = data.split('|');
    var swinvalid1 = date[1].trim();
    if (swinvalid1 == '01') {
        _Datopaciente_41();
    }
    else if (swinvalid1 == '00') {
        _Dato1_2_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function _Dato1_2_41() {
    $_BUSCTLFOR = '0';
    /// CONTROL FORMU USU LINEA 4183
    SAL41['CONTEO'] = 0;
    _Aceptarcodigo_41();
}

function _Aceptarcodigo_41() {
    // let ctabla_41 = $('#TABLA_401 tbody tr').length;
    console.debug(SAL41.CONTEO);
    if (SAL41.CONTEO == 4) {
        console.debug(SAL41.CONTEO);
        _Datodescto_41();
    }
    else if (SAL41.CONTEO == 1) {
        if ($_CLFACT == '0') {
            _Datobarras_41();
        }
        else {
            $_DIVISIONCUP1 = $_DIVISIONCUP;
            $_DIV2CUP1 = $_DIV2CUP;
            $_DIAGNCUP1 = $_DIAGNCUP;
            $_ATIENDEESPCUP1 = $_ATIENDEESPCUP;
            _Datobarras_41();
        }
    }
    else if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
        // SER807 REALIZAR PRUEBAS EN RM PARA VER LA VENTANA
    }
    else {
        _Datobarras_41();
    }
}

function _Datobarras_41() {
    if (($_CLFACT == '0') && ($_BARRASUSU == 'S') && ($_TIPODRFACT == '1')) {
        _Ventanabarras_41();
    }
    else {
        _Dato2_41();
    }
}

function _Ventanabarras_41() {
    fuente = '<div class="col-md-12" id="ACEPTARBARRAS_41"> ' +
        '<input id="aceptarbarras_SAL41" type="text" class="form-control input-md" data-orden="1" maxlength="15"> ' +
        '</div>';
    _ventana({
        source: fuente,
        title: 'CODIGO DE BARRAS',
        size: 'small',
        espace: false,
        focus: '#aceptarbarras_SAL41',
        form: '#ACEPTARBARRAS_41',
        order: '1',
        global1: '$_LLAVEBARRASW',
        inputglobal1: '#aceptarbarras_SAL41',
    }, _Leerventanabarras_41, _Leerarticulo_41);
}

function _Leerventanabarras_41() {
    if (($_LLAVEBARRASW == '') || (parseInt($_LLAVEBARRASW) == 0)) {
        _Dato2_41();
    }
    else {
        console.debug($_LLAVEBARW)
        LLAMADO_DLL({
            dato: [$_LLAVEBARW],
            callback: _dataINV401_10_41,
            nombredll: 'IN401-10',
            carpeta: 'SALUD'
        });
    }
}
function _dataINV401_10_41(data) {
    console.debug(data, 'INV401_10');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_GRUPOART = date[1].trim();
    $_NUMEROART = date[2].trim();
    $_CLASEART = date[3].trim();
    if (swinvalid == '00') {
        $_GRUPOFACT = $_GRUPOART;
        $_CODARTFACT = $_NUMEROART;
        $_CLASEARTFACT = $_CLASEART;
        _Leerarticulo_41();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'Error');
        _Datobarras_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Dato2_41() {
    $_SWPASO = 0;
    if ((SAL41.NITUSU == '0844003225') && ($_SWPASO == '0')) {
        if ($_CLFACT == '7') {
            $_TIPOMACROW = '2';
            _Evaluarmacro_41();
        } else {
            _Evaluarcodservicio2_41();
        }
    }
    else {
        if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
            _Aceptarcodigo_41();
        }
        // else if ($_CONTROLFORMUUSU == 'S') {
        //     // MIRAR BIEN 4362
        //     console.debug('SW-MARCAFORM');
        // }
        else {
            _Evaluarcodservicio2_41();
        }
    }
}

function _Evaluarmacro_41() {
    $('#elementos-tabla').append(
        '<div class="col-md-4 col-sm-4 col-xs-4" id="MACRO_41">' +
        '<div class="inline-inputs">' +
        '<label class="col-md-6 col-sm-8 col-xs-12">Cod Macro:</label>' +
        '<div class="input-group col-md-6 col-sm-4 col-xs-12" id="MACRO_41">' +
        '<input id="macro_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden"1">' +
        '</div>' +
        '</div>' +
        '</div>');
    validarInputs({
        form: '#MACRO_41',
        orden: '1'
    },
        function () { _Dato2_41() },
        _Validarmacro_41
    )
}

function _Validarmacro_41() {
    console.debug('macro');
    $_CODMACROW = $('#macro_SAL41').val();
    LLAMADO_DLL({
        dato: [$_CODMACROW],
        callback: _dataINV401_11_41,
        nombredll: 'INV401_11',
        carpeta: 'SALUD'
    })
}

function _dataINV401_11_41(data) {
    console.debug(data, 'INV401_11');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_NOMBREMACRO = date[1].trim();
    var json = date[2].trim();
    var url = "http://" + $_IP_DATOS + "/progdatos/json/" + json + ".json";
    SolicitarDatos(
        null,
        function (data) {
            $_ARTMACROH = data.MACRO;
            for (var i in $_ARTMACROH) {
                $('#TABLA_401').append(
                    '<td></td>' +
                    '<td>' + $_ARTMACROH[i].ART_MACROH + '</td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>'
                );
            }
            if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
                _Aceptarcodigo_41();
            }
            else if ($_CONTROLFORMUUSU == 'S') {
                // MIRAR BIEN 4362
                console.debug('SW-MARCAFORM');
            }
            else {
                _Evaluarcodservicio2_41();
            }
        },
        url
    );
}

function _Evaluarcodservicio_41() {
    let parametros = {
        estado: 'on',
        mensaje: 'Oprima F3 para continuar'
    }
    _event_f3(parametros);
    validarInputs({
        form: '#CODSERVICIO_41',
        orden: '1',
        event_f3: function () { _event_f3({ estado: 'off' }); _Datoabono_41() }
    },
        function () {
            _event_f3({ estado: 'off' });
            if ($('#TABLA_401 tbody tr').length > 0) {
                SAL41.CONTEO = SAL41.CONTEO - 1;
                $('#TABLA_401 tbody tr').eq($('#TABLA_401 tbody tr').length - 1).remove()
                _Evaluarcodservicio_41();
            } else {
                _Evaluarcodservicio_41();
            }

        },
        _Validarcodservicio_41
    )
}

function _event_f3(parametros) {
    switch (parametros.estado) {
        case 'on':
            if ($('#texto_f3').length > 0) {
                $('#texto_f3').html(
                    '<kbd style="background-color: #476FAD; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center">' + parametros.mensaje + '</kbd>'
                )
            } else {
                $('#body_main').append(
                    '<div id="texto_f3" style="position: absolute; top:90%; left: 1%; transform: translate:(-1%,90%); z-index: 999; width: 15%; height: 10%; display: flex; justify-content: center; align-items: center">' +
                    '<kbd style="background-color: #476FAD; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center">' + parametros.mensaje + '</kbd>' +
                    '</div>'
                )
            }
            break;
        case 'off':
            $('#texto_f3').remove();
            break;
    }
}

function _Validarcodservicio_41() {
    $_GRUPOFACT = $('#codservicio1_SAL41').val();
    if ($_CLFACT == '3') {
        $_OPSEGU = "I41" + $_GRUPOFACT.substring(0, 2);
        let datos_envio = datosEnvio();
        datos_envio += SAL41.ADMINW + '|' + $_OPSEGU + '|' + SAL41.ADMINW;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON904_04_41, get_url("APP/CONTAB/CON904.DLL"));
    }
    else {
        _Grupoblanco_41();
    }
}

function _dataCON904_04_41(data) {
    console.debug(data, "CON904-04");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _Grupoblanco_41();
    }
    else {
        _Dato2_41();
    }
}

function _Grupoblanco_41() {
    if ($_GRUPOFACT.trim() == '') {
        // MOSTRAR RENGLON CAMPOS EN BLANCO
        _Buscarcodigo_41();
    }
    else {
        _Buscarcodigo_41();
    }
}

function _Buscarcodigo_41() {
    // CONTROL FROMU USU 4404
    _Evaluarcodservicio2_41();
}

function _Evaluarcodservicio2_41() {
    $_ARTFACT == undefined ? $_ARTFACT = '                  ' : $_ARTFACT = $_ARTFACT;
    $_ARTCTL = $_ARTFACT;
    let parametros = {
        estado: 'on',
        mensaje: 'Oprima F3 para continuar'
    }
    _event_f3(parametros);
    if ($('#CLASEART_SAL41').length < 1) {
        $('#elementos-tabla').append(
            '<div class="col-md-4 col-sm-4 col-xs-4" id="CLASEART_SAL41">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-6 col-sm-8 col-xs-12">Clase Art</label>' +
            '<div class="input-group col-md-6 col-sm-4 col-xs-12">' +
            '<input id="claseart_SAL41" type="text" data-orden="1" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    validarInputs({
        form: '#CODSERVICIO2_41',
        orden: '1',
        event_f3: function () { _event_f3({ estado: 'off' }); _Datoabono_41() }
    },
        function () {
            _event_f3({ estado: 'off' });
            if ($('#TABLA_401 tbody tr').length > 0) {
                SAL41.CONTEO = SAL41.CONTEO - 1;
                $('#TABLA_401 tbody tr').eq($('#TABLA_401 tbody tr').length - 1).remove()
                _Evaluarcodservicio2_41();
            } else {
                _Evaluarcodservicio2_41();
            }
        },
        _Validarcodservicio2_41
    )
}

function _Validarcodservicio2_41() {
    _event_f3({ estado: 'off' });
    let LLAVECUP = $('#codservicio2_SAL41').val();
    $_GRUPOFACT = LLAVECUP.substring(0, 2);
    $_CODARTFACT = LLAVECUP.substring(2, 15);
    $_CODARTCTL = $_CODARTFACT;
    // if (($_CLFACT == '0') && ($_CODARTFACT != $_CODARTCTL)) {
    //     $_TIPOART = '0';
    //     $_GRUPOART = $_GRUPOFACT;
    //     $_NUMEROART = $_CODARTFACT;
    //     $_CLASEART = '  ';
    //     LLAMADO_DLL({
    //         dato: [],
    //         callback: _dataINV401_11_41,
    //         nombredll: 'INV401_11',
    //         carpeta: 'SALUD'
    //     })
    // }
    // else {
    console.debug('si no', $_CODARTFACT);
    if (parseInt($_CLFACT) > 0) {
        $_CLASEARTFACT = '  ';
        _Leerarticulo_41();
    }
    else {
        _Evaluarclaseart_41();
    }
}

function _Evaluarclaseart_41() {
    validarInputs({
        form: '#CLASEART_SAL41',
        orden: '1'
    },
        function () { _Evaluarcodservicio2_41() },
        _Validarclaseart_41
    )
}

function _Validarclaseart_41() {
    $_CLASEARTFACT = $('#claseart_SAL41').val();
    $_CLASEARTFACT = $_CLASEARTFACT.padEnd(2, ' ');
    _Leerarticulo_41();
}
function _dataINV401_11(data) {
    console.debug(data, 'INV401_11');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_CLASEARTFACT = date[1].trim();
    if (swinvalid == '00') {
        _Leerarticulo_41();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('codservicio2_SAL41').val('');
        _Evaluarcodservicio2_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Leerarticulo_41() {
    $_ARTFACT = $_GRUPOFACT + $_CODARTFACT + $_CLASEARTFACT;
    // SE AÑADIO LA CLASEART DEBAJO DE TODAS LAS VARIABLES
    if (((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) && ($_SUCW == 'SC')) {
        // SER835C NO SE REALIZA POR FALTA DE FACTURA-SERVICIO (SALUD)
    }
    else if (($_GRUPOFACT.trim() == '') || (parseInt($_GRUPOFACT) == 0)) {
        _Aceptarcodigo_41();
    }
    else if ($_CLFACT == '3') {
        $_OPSEGU = 'I413' + $_GRUPOFACT.trim();
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_OPSEGU;
        SolicitarDll({ datosh: datos_envio }, _dataCON904_05_41, get_url("APP/CONTAB/CON904.DLL"));
    }
    else {
        _Leerarticulo2_41();
    }
}

function _dataCON904_05_41(data) {
    console.debug(data, 'CON904_05');
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _Leerarticulo2_41();
    }
    else if (swinvalid == '01') {
        _Dato2_41();
    }
}

function _Leerarticulo2_41() {
    console.debug('leerarticulo2');
    if (($_RESTAPLIPACI == 'S') && (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) && ($_CLFACT == '5')) {
        if (($_GRUPOFACT == '89') && ($_RESTCONSPACI == 'N') && ($_ARTFACT != '890103') && ($_ARTFACT != '890203') && ($_ARTFACT != '890303') && ($_ARTFACT != '890403')) {
            CON851('80', '80', null, 'error', 'Error');
            _Dato2_41();
        }
        else if (($_GRUPOFACT == '93') && ($_COD1ARTFACT == '1') && ($_RESTTERFPACI == 'N')) {
            CON851('80', '80', null, 'error', 'Error');
            _Dato2_41();
        }
        else if (($_GRUPOFACT == '93') && ($_COD1ARTFACT != '1') && ($_RESTTEROPACI == 'N')) {
            CON851('80', '80', null, 'error', 'Error');
            _Dato2_41();
        }
        else if (($_RESTODONPACI == 'N') && (($_GRUPOFACT == '24') || ($_ARTFACT == '890103') || ($_ARTFACT == '890203') || ($_ARTFACT == '890303') || ($_ARTFACT == '890403'))) {
            CON851('80', '80', null, 'error', 'Error');
            _Dato2_41();
        }
    }
    else if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) && ($_CLFACT == '4') && ($_RESTESTAPACI == 'N') && ($.isNumeric($_GRUPOFACT))) {
        CON851('80', '80', null, 'error', 'Error');
        _Datopaciente_41();
    }
    else if ($_CLFACT == '0') {
        $_TIPOART = '0';
        $_GRUPOART = $_GRUPOFACT;
        $_NUMEROART = $_CODARTCTL;
        $_CLASEART = $_CLASEARTFACT;
        $_GRP1SAL = $_GRUPOFACT.substring(0, 1);
        $_CODART = $_TIPOART + $_GRUPOART + $_NUMEROART.padEnd(13, ' ') + $_CLASEART;
        // _Leerpromedio_41(_LlamdoSAL41_06_41); // PRUEBA DE LEER PROMEDIO ANTES DE DEBIDO A EJECUCION DE VARIABLES
        // setTimeout(_LlamdoSAL41_06_41, 300);
        _Leerpromedio_41();
        let datos_envio = datosEnvio();
        datos_envio += $_CODART;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_06, get_url("APP/SALUD/SAL41-06.DLL"));
    }
    else {
        if (($_GRUPOFACT == 'XM') || ($_GRUPOFACT == 'XP') || ($_GRUPOFACT == 'XN')) {
            $_LLAVETAB = $_CODTABW + $_TIPOTABW + $_GRUPOFACT + $_CODARTFACT.padEnd(10, ' ');
            $_LLAVECUP = $_GRUPOFACT + $_CODARTFACT.padEnd(10, ' ');
            let datos_envio = datosEnvio();
            datos_envio += SAL41.ADMINW + '|' + $_LLAVETAB + '|' + SAL41.NITUSU + '|' + $_CONVENIONUM + '|' + $_LLAVECUP;
            console.debug(datos_envio)
            SolicitarDll({ datosh: datos_envio }, _dataSAL41_07, get_url("APP/SALUD/SAL41-07.DLL"));
        }
        else {
            $_ALMFACT = '     ';
            $_LLAVETAB = $_CODTABW + $_TIPOTABW + $_GRUPOFACT + $_CODARTFACT.padEnd(8, ' ');
            $_LLAVECUP = $_GRUPOFACT + $_CODARTFACT.padEnd(10, ' ');
            let datos_envio = datosEnvio();
            datos_envio += SAL41.ADMINW + '|' + $_LLAVETAB + '|' + SAL41.NITUSU + '|' + $_CONVENIONUM + '|' + $_LLAVECUP;
            console.debug(datos_envio)
            SolicitarDll({ datosh: datos_envio }, _dataSAL41_07, get_url("APP/SALUD/SAL41-07.DLL"));
        }
    }
}

function _dataSAL41_06(data) {
    console.debug(data, 'SAL41-06');
    var date = data.split('|');
    $_DESCRIPART = date[1].trim();
    $_UNIDADART = date[2].trim();
    $_VLRULTCOMPRA = date[3].trim();
    $_VLRULTCOMPRA = parseFloat($_VLRULTCOMPRA);
    $_VLRREFART = date[4].trim();
    $_VLRREFART = parseFloat($_VLRREFART);
    $_OTROS1ART = date[5].trim();
    $_OTROS2ART = date[6].trim();
    $_OTROS3ART = date[7].trim();
    $_OTROS4ART = date[8].trim();
    $_IVAART = date[9].trim();
    $_VRVENTA1ART = date[10].trim(); // TABLA
    $_VRVENTA1ART = parseFloat($_VRVENTA1ART); // TABLA
    $_REFART = date[11].trim();
    $_OTROS4BART = $_OTROS4ART.substring(12, 26);
    $_HOMOLOGOART = date[12].trim();
    $_RENG1ART = date[13].trim(); // TABLA
    $_REGG1BART2 = $_RENG1ART.substring(29, 30); // TABLA
    $_PRECIOCOMPART = data[14].trim(); // VLR LISTA COMP ART
    $_AUTORETART = data[15].trim();
    // INICIALIZANDO VARIABLES PARA EL LEER ARTICULO 5
    $_CODPAQINTTAB = $_CISCUP = $_LLAVETIPOTAB = $_DATOSSEPCUP = '';
    $_IVAARTW = $_IVAART;
    $_ARTIVANUM = ' '; $_CLASIFNUM = ' ';
    if (date[0].trim() == '00') {
        $('#detalle_SAL41').val($_DESCRIPART);
        $('#und_SAL41').val($_UNIDADART);
        switch ($_IVAART) {
            case '0':
                $_TARIVAW = '0';
                break;
            case '1':
                $_TARIVAW = $_IVAUSU;
                break;
            case '2':
                $_TARIVAW = $_IVA2USU;
                break;
            case '3':
                $_TARIVAW = $_IVA3USU;
                break;
        }
        switch ($_BASEMEDTAR) {
            case '1':
                // _Leerpromedio_41();
                $_VRVENTA1ART = $_VLRPROMEDW;
                break;
            case '2':
                $_VRVENTA1ART = $_VLRULTCOMPRA;
                break;
            case '4':
                if ($_VLRREFART > 0) {
                    $_VRVENTA1ART = $_VLRREFART;
                }
                break;
        }
        if ((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) {
            $('form').append(
                '<div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">' +
                '<div class="col-md-5 col-sm-4 col-xs-4">' +
                '<label>Ciudad</label>' +
                '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
                '<input id="otros_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="5" data-orden="1">' +
                '</div>' +
                '</div>' +
                '</div>'
            )
            $('#otros_SAL41').val($_OTROSART);
        }
        if ($_VLRULTCOMPRA == 0) {
            if (parseInt($_PRECIOCOMPART) > 0) {
                $_VLRULTCOMPRA = $_PRECIOCOMPART;
            }
            else {
                _Leerpromedio_41(_Leerarticulo3_41);
                $_VLRULTCOMPRA = $_VLRPROMEDW;
            }
        }
        if ((($_DESCRIPART.substring(0, 1) == '*') && ($_TIPODRFACT == '1')) && ($_GRUPOART.substring(0, 1) == '') && ($_GRUPO2ART.trim() == '')) {
            $('#detalle_SAL41').val('CODIGO CON * DESCTI');
            CON851('13', '13', null, 'error', 'Error');
            _Dato2_41();
        } else if ($_ARTIVANUM == 'N') {
            if ($_IVAART == '0') {
                _Leerarticulo3_41();
            } else {
                CON851('72', '72', null, 'error', 'Error');
                _Dato2_41();
            }
        } else if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "T") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z"))) {
            switch ($_CLASIFNUM) {
                case '1':
                    if (($_GRUPOFACT == 'PO') || ($_GRUPOFACT == 'MQ')) {
                        _Leerarticulo3_41();
                    }
                    else {
                        CON851('7H', '7H', null, 'error', 'Error');
                        _Dato2_41();
                    }
                    break;
                case '2':
                    if (($_GRUPOFACT == 'PO') || ($_GRUPOFACT == 'MQ') || ($_GRUPOFACT == 'CO')) {
                        _Leerarticulo3_41();
                    }
                    else {
                        CON851('7H', '7H', null, 'error', 'Error');
                        _Dato2_41();
                    }
                    break;
                default:
                    _Leerarticulo3_41();
                    break;
            }
        } else {
            _Leerarticulo3_41();
        }
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#codservicio2_SAL41').val('');
        _Evaluarcodservicio2_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _Leerarticulo3_41() {
    console.debug('leerarticulo3');
    if ($_MYTNUM == 'S') {
        if ($_HOMOLOGOART == 'S') {
            $_CUMHOMOLOGOW = $_OTROS4BART;
            $_DETALLEHOMOLOW = $_DESCRIPART;
            $_VLRMYTEDIT = $_VRVENTA1ART;
            $_ATCHOMOLOGOW = $_REFART;
        }
        if ($_REGG1BART2 == '0') {
            $_VLRMYTEDIT = parseInt($_VLRMYTEDIT) * 1;
        }
        else {
            $_VLRMYTEDIT = parseInt($_VLRMYTEDIT) * parseInt($_REGG1BART2);
        }
        $_VRVENTA1ART = parseInt($_VRVENTA1ART) - parseInt($_VLRMYTEDIT);
        /// TERMINA EN 4836
    } if ($_ASUMEIVAUSU == 'S') {
        isNaN($_VRVENTA1ART) ? $_VRVENTA1ART = 0 : $_VRVENTA1ART = $_VRVENTA1ART;
        $_VLRUNITW = (parseInt($_VRVENTA1ART) * (100 + parseInt($_TARIVAW))) / 100;
    } if ($_ASUMEIVAUSU != 'S') {
        isNaN($_VRVENTA1ART) ? $_VRVENTA1ART = 0 : $_VRVENTA1ART = $_VRVENTA1ART;
        $_VLRUNITW = $_VRVENTA1ART;
    }
    $_SWAPR = '1';
    $_VALORAPROX = parseInt($_VLRUNITW) * 1;
    console.debug($_VALORAPROX);
    $_VLRUNITW = $_VALORAPROX;
    if (SAL41.NITUSU == '0900004059') {
        $_SWAPR = '100';
        $_VLRUNITW = parseInt($_VLRUNITW) + 50;
        $_VALORAPROX = parseInt($_VLRUNITW) / $_SWAPR;
        $_VLRUNITW = $_VALORAPROX * $_SWAPR;
        $_SWAPR = '1';
    }
    _Leerarticulo5_41();
}

function _dataSAL41_07(data) {
    console.debug(data, 'SAL41-07');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var swinvalid1 = date[1].trim();
    $_DESCRIPTAB = date[2].trim();
    $_DESCRIP1TAB = $_DESCRIPTAB.substring(0, 1);
    $_GRSERTAB = date[3].trim();
    $_MONTOTAB = date[4];
    // console.debug($_MONTOTAB, $_MONTOTAB.length);
    let montotab1 = $_MONTOTAB.substring(0, 11);
    montotab1 = montotab1.replace('.', '');
    montotab1 = parseInt(montotab1);
    isNaN(montotab1) ? montotab1 = 0 : montotab1 = montotab1;
    console.debug(montotab1);
    let montotab2 = $_MONTOTAB.substring(11, 14);
    montotab2 = parseFloat(montotab2);
    console.debug(montotab2);
    $_MONTOTAB = montotab1 + montotab2;
    console.debug($_MONTOTAB)
    $_FORMALIQTAB = date[5].trim();
    $_NIVELCUP = date[6].trim();
    $_CISCUP = date[7].trim();
    $_OCULTARCUP = date[8].trim();
    $_SEXOCUP = date[9].trim();
    $_UNIDEDADCUP = date[10].trim();
    $_EDADMINCUP = date[11].trim();
    $_EDADMAXCUP = date[12].trim();
    $_CODTAB = date[13].trim();
    $_CDSERTAB = date[14].trim();
    $_LLAVETIPOTAB = date[15].trim();
    $_CODPAQINTTAB = date[16].trim();
    $_DATOSSEPCUP = date[17].trim();
    $_MONTOTABME = date[18].trim();
    $_INCREMTAB = date[19].trim();
    $_INCREMTAB = parseInt($_INCREMTAB);
    $_DIV2CUP = date[20].trim();
    $_DIVISIONCUP = date[21].trim();
    $_DIAGNCUP = date[22].trim();
    console.debug($_DIAGNCUP);
    $_ATIENDEESPCUP = date[23].trim();
    $_DESCRIPCUP = date[25].trim();
    $_CODSERTAB = date[26].trim();
    SAL41['TIPOPROCCUP'] = date[27].trim();
    if (swinvalid == '00') {
        $('#detalle_SAL41').val($_DESCRIPTAB);
        if ($_DESCRIP1TAB == '*') {
            $('#detalle_SAL41').val('CODIGO NO EXISTE - REPITA');
            CON851('7R', '7R', null, 'error', 'Error');
            _Dato2_41();
        }
        else {
            SER102RC_41(swinvalid1);
        }
    }
    else if (swinvalid == '01') {
        $('#detalle_SAL41').val('CODIGO NO EXISTE - REPITA');
        _Dato2_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function SER102RC_41(swinvalid1) {
    console.debug(swinvalid1, 'SER102RC');
    // FS LIMI CUP AUN NO ESTA
    // LINEA 4707
    if (swinvalid1 == '9R') {
        CON851('9R', '9R', null, 'error', 'Error');
        _Dato2_41();
    }
    else {
        if (($_SEXOCUP = ! '') && ($_SEXOCUP = !$_SEXOPACI)) {
            CON851('73', '73', null, 'error', 'Error');
            _Dato2_41();
        }
        else if (parseInt($_EDADMINCUP) > 0) {
            if (($_UNIDEDADCUP == $_UNIDEDADELAB) && (parseInt($_EDADMINCUP) > parseInt($_VLREDADELAB))) {
                CON851('74', '74', null, 'error', 'Error');
                _Dato2_41();
            }
            else if (($_UNIDEDADCUP = !$_UNIDEDADELAB) && ($_UNIDEDADCUP == 'A')) {
                CON851('74', '74', null, 'error', 'Error');
                _Dato2_41();
            }
            else if (($_UNIDEDADCUP = !$_UNIDEDADELAB) && ($_UNIDEDADCUP == 'M') && ($_UNIDEDADELAB == 'D')) {
                CON851('74', '74', null, 'error', 'Error');
                _Dato2_41();
            }
            else {
                _Leerarticulo4_41();
            }
        }
        else if (parseInt($_EDADMAXCUP) > 0) {
            if (($_UNIDEDADCUP == $_UNIDEDADELAB) && (parseInt($_EDADMAXCUP) < parseInt($_VLREDADELAB))) {
                CON851('74', '74', null, 'error', 'Error');
                _Dato2_41();
            }
            else if (($_UNIDEDADCUP = !$_UNIDEDADELAB) && ($_UNIDEDADCUP == 'D')) {
                CON851('74', '74', null, 'error', 'Error');
                _Dato2_41();
            }
            else if (($_UNIDEDADCUP = !$_UNIDEDADELAB) && ($_UNIDEDADCUP == 'M') && ($_UNIDEDADELAB == 'A')) {
                CON851('74', '74', null, 'error', 'Error');
                _Dato2_41();
            }
            else {
                _Leerarticulo4_41();
            }
        }
        else {
            _Leerarticulo4_41();
        }
    }
}

function _Leerarticulo4_41() {
    console.debug('leerarticulo4');
    // FALTA NIVEL CUPS
    if (($_CODTAB == 'I4') || ($_CODTAB == 'IS') && ($_PREFIJOFACT == 'P') && ($_GRSERTAB == '93')) {
        if (($_CDSERTAB.trim() == '1000') || ($_CDSERTAB == '9400') || ($_CDSERTAB == '8300') || ($_CDSERTAB == '7000')) {
            $_MONTOTAB = $_MONTOTAB * 1.1;
        }
    }
    $_IVAARTW = '0';
    switch ($_FORMALIQTAB) {
        case '1':
            // $_VLRUNITW = Math.round($_MONTOTAB * $_HNQUIRTAR);
            $_VLRUNITW = $_MONTOTAB * $_HNQUIRTAR;
            break;
        case '2':
            $_VLRUNITW = $_MONTOTAB;
            break;
        case '3':
            $_VLRUNITW = $_MONTOTAB;
            break;
        case '4':
            if (SAL41.NITUSU == '0892000401') {
                $_FACTORW = 1;
                $_SWAPR = 100;
                // $_VLRUNITW = Math.round($_MONTOTAB * $_SALMINTAR);
                // $_VALORAPROX = Math.round(($_VLRUNITW * $_FACTORW) / $_SWAPR);
                $_VLRUNITW = $_MONTOTAB * $_SALMINTAR;
                $_VALORAPROX = ($_VLRUNITW * $_FACTORW) / $_SWAPR;
                $_VLRUNITW = $_VALORAPROX * $_SWAPR;
            }
            else {
                // $_VLRUNITW = Math.round($_MONTOTAB * $_SALMINTAR);
                $_VLRUNITW = $_MONTOTAB * $_SALMINTAR;
                console.debug($_VLRUNITW, $_MONTOTAB, $_SALMINTAR);
            }
            break;
        case '5':
            var table = $('#TABLA_401 tbody tr').eq(0).length;
            if (table == 0) {
                $_VLRARTW1 = 0;
            }
            else {
                var table1 = $('#TABLA_401 tbody tr').eq(0).children();
                $_VLRARTW1 = table1[0].textContent;
                $_VLRARTW1 = parseFloat($_VLRARTW1);
            }
            // $_VLRUNITW = Math.round($_MONTOTAB * $_VLRARTW1 / 100);
            $_VLRUNITW = $_MONTOTAB * $_VLRARTW1 / 100;
            break;
        default:
            $_VLRUNITW = $_MONTOTAB;
            break;
    }
    _Leerarticulo5_41();
}

function _Leerarticulo5_41() {
    console.debug('leerarticulo5');
    $_CODPAQINTTAB = $_CODPAQINTTAB.trim();
    if (($_CISCUP.trim() == '') || (parseInt($_CISCUP) == 0)) {
        $_CISCUP = 'N';
    }
    if (($_LLAVETIPOTAB == 'SO1') && ($_CODPAQINTTAB != '')) {
        CON851('', 'Atencion !, este procedimiento esta clasificado como posible paquete integral', null, 'warning', 'Advertencia!');
    }
    if ((SAL41.NITUSU == '0800037021') && ($_NITFACT == '0830079672')) {
        $_SWAPR = '1';
    }
    if (($_CODTAR == 'H4') && (parseInt($_CLFACT) > 1)) {
        $_SWAPR = '1';
    }
    if ((SAL41.NITUSU == '0800037021') && ($_OCULTARCUP == '*')) {
        CON851('7R', '7R', null, 'error', 'Error');
        _Dato2_41();
    }
    else if (((SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0822002688')) && ($_CISNUM == 'S') && ($_CISCUP == 'N')) {
        CON851('5L', '5L', null, 'error', 'Error');
        _Buscarcodigo_41();
    }
    else if (($_ARTFACT == '39134  ') && ($_UNIDEDADELAB == 'A') && (parseInt($_VLREDADELAB) > 13)) {
        CON851('76', '76', null, 'error', 'Error');
        _Buscarcodigo_41();
    }
    else if (($_FACTCAPITNUM == $_LLAVENUM) && ($_CLFACT == '4') && ($_I < 9)) {
        $_VALCAPITAW = $_ARTFACT;
        if (($_VALCAPITAW == 'XXCAP') || ($_VALCAPITAW == 'XXPGP')) {
            if (SAL41.NITUSU == '0900019291') {
                _Leerarticulo6_41();
            }
            else {
                _Ventanacapacitacion_41();
            }
        }
        else {
            if (SAL41.NITUSU == '0900405505') {
                if ($_VALCAPITAW == 'XX19') {
                    _Ventanacapacitacion_41();
                }
            }
        }
    }
    else {
        $_VALCAPITAW = ' ';
        _Leerarticulo6_41();
    }
}
function _Leerarticulo6_41() {
    console.debug('leerarticulo6');
    if (($_CLFACT == '0') && ($_LOTEFARMUSU == 'N') && ($_REPETIDOUSU == 'N')) {
        $_SWBUSCAR = '0';
        // BUSCAR REPETIDO EN LA TABLA
        if ($_SWBUSCAR == 1) {
            CON851('05', '05', null, 'error', 'Error');
            _Dato2_41();
        } else {
            _Datolateralidad_41();
        }
    }
    else if (($_CLFACT == '2') || ($_CLFACT == '3') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) {
        // BUSCAR REPETIDO EN LA TABLA
    }
    $_SWBUSCAR = '0'
    if ((SAL41.NITUSU == '0800037021') && ($_CLFACT == '2')) {
        //BUSCAR REPETIDO 
        if ($_SWBUSCAR == 1) {
            CON851('05', '05', null, 'error', 'Error');
            _Dato2_41();
        }
    } else {
        _Datolateralidad_41();
    }
}

function _Datolateralidad_41() {
    console.debug($_VLRUNITW);
    console.debug('datolateralidad');
    $_PRINCIPALANTEW = $_DATOSSEPCUP;
    if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) {
        var lateralidades = '[{"codigo": "1","descripcion": "Derecho"},{"codigo": "2", "descripcion": "Izquierdo"},{"codigo": "3","descripcion": "Bilateral"},{"codigo": "4","descripcion": "No aplica"}]'
        var lateralidad = JSON.parse(lateralidades);
        POPUP({
            array: lateralidad,
            titulo: 'Lateralidades',
            indices: [
                { id: 'codigo', label: 'descripcion' }
            ],
            callback_f: _toggleNav
        },
            _EvaluarRX822A_41);
    } else {
        SAL41.VLRLATERFACT = '0';
        _Datoalmacen_41();
    }
}

function _EvaluarRX822A_41(data) {
    switch (data.codigo) {
        case '1':
        case '2':
        case '3':
        case '4':
            SAL41.VLRLATERFACT = data.codigo;
            _Datoalmacen_41();
            break;
    }
}

function _Datoalmacen_41() {
    console.debug('dato almacen')
    if (parseInt($_CLFACT) > 0) {
        _Calcularmonto_41();
    }
    else {
        _Evaluandoalmacen_41();
    }
}
function _Evaluandoalmacen_41() {
    if ((SAL41.NITUSU == '0800037021') && ($_ADMINW == 'UCI')) {
        $_ALMFACT = 'SIN97';
    }
    if ((SAL41.NITUSU == '0900658867') && ($_PREFIJOUSU == '10')) {
        $_ALMFACT = 'ALM10';
    }
    if ($_ALMFACT.trim() == '') {
        if ((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) {
            if (($_UNSERVFACT == '04') || ($_UNSERVFACT == '54')) {
                $_ALMFACT == 'CR001';
            }
            else if (($_GRUPOFACT == 'PO') || ($_GRUPOFACT == 'NP') || ($_GRUPOFACT == 'MQ')) {
                $_CODARTTEMP = $_CODARTFACT;
                if ((parseInt($_CODARTTEMP) >= 9000100000000) && (parseInt($_CODARTTEMP) <= 9000100000000)) {
                    $_ALMFACT = 'UNI01';
                    $_CODARTTEMP = ' ';
                }
            }
            else {
                $_ALMFACT == 'DR099';
            }
        }
    }
    _Evaluaralmacen_41();
}

function _Evaluaralmacen_41() {
    validarInputs({
        form: '#ALMACEN_41',
        orden: '1'
    },
        function () { _Dato2_41() },
        _Validaralmacen_41
    )
}

function _Validaralmacen_41() {
    $_ALMFACT = $('#almac_SAL41').val();
    if (SAL41.NITUSU == '0830512772') {
        if (($_SWPASOALMW == '1') || ($_ALMFACT == 'SIN99') || (($_ADMINW == 'INVI') || ($_ADMINW == 'VENT')) && ($_ALMFACT == 'SIN98')) {
            _Datoalmacen2_41();
        }
        else {
            if ($_ALMFACT == $_ALMPREF) {
                _Datoalmacen2_41();
            }
            else {
                CON851('13', '13', null, 'error', 'Error');
                $('#almac_401').val('');
                _Datoalmacen2_41();
            }
        }
    }
    else {
        _Datoalmacen2_41();
    }
}

function _Datoalmacen2_41() {
    if ((parseInt($_VLRPROMEDW) == 0) && (parseInt($_BASEMEDTAR) == 1)) {
        $_ALMPREF = $_ALMFACT;
        _Leerpromedio_41();
        $_VRVENTA1ART = $_VLRPROMEDW
        if ($_ASUMEIVAUSU == 'S') {
            $_VLRUNITW = Math.round(parseFloat($_VRVENTA1ART) * (100 + parseFloat($_TARIVAW)) / 100)
        }
        else {
            $_VLRUNITW = $_VRVENTA1ART;
        }
        $_VALORAPROX = Math.round($_VLRUNITW * 1);
        $_VLRUNITW = $_VALORAPROX;
    }
    $('#almac_SAL41').val($_ALMFACT);
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_ALMFACT;
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_16_41, get_url("APP/SALUD/SAL41-16.DLL"));
}

function _dataSAL41_16_41(data) {
    console.debug(data, 'SAL41-16');
    data = data.split('|');
    $_NOMBRELOCAL = data[1].trim();
    $_RESTRICLOCAL = data[2].trim();
    if (data[0].trim() == '00') {
        $_OPSEGU = 'I410' + $_ALMFACT.substring(0, 1) + $_ALMFACT.substr(4, 5);
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_OPSEGU;
        SolicitarDll({ datosh: datos_envio }, _dataCON904_06_41, get_url("APP/CONTAB/CON904.DLL"));
    }
    else if (data[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#almac_SAL41').val('');
        _Datoalmacen_41();
    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _dataCON904_06_41(data) {
    console.debug(data, 'CON904_06');
    data = data.split('|');
    var nombreoper = data[2].trim();
    var codrest = data[3].trim();
    if ((data[0].trim() == '00') || (data[0].trim() == '01')) {
        if ((data[0].trim() == '01') && ($_CLFACT == '0')) {
            $_RESTRICLOCAL == 'N';
        }
        if ((SAL41.NITUSU == '0892001990') && ($_CODLOCAL == 'DR02') && ($_ADMINW == 'MEOM')) {
            $_RESTRICLOCAL == 'N';
        }
        if (($_CLFACT == '0') && ($_ALMFACT.substring(0, 3) != "SIN") && (($_GRUPOFACT == 'PO') && ($_GRUPOFACT == 'NP'))) {
            $_OPSEGU = 'I410M';
            let datos_envio = datosEnvio();
            datos_envio += '|'
            datos_envio += $_OPSEGU;
            SolicitarDll({ datosh: datos_envio }, _dataCON904_07_41, get_url("APP/CONTAB/CON904.DLL"));
        }
        else {
            _Permisosalmacen_41();
        }
    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}
function _dataCON904_07_41(data) {
    console.debug(data, 'CON904_07');
    data = data.split('|');
    var nombreoper = data[2].trim();
    var codrest = data[3].trim();
    if (data[0].trim() == '00') {
        _Permisosalmacen_41();
    }
    else if (data[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        _datoalmacen();
    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}
function _Permisosalmacen_41() {
    if ($_RESTRICLOCAL == 'N') {
        CON851('13', '13', null, 'error', 'Error');
        _Datoalmacen_41();
    }
    else if (((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) && ($_ALMFACT == 'DR099') && (($_UNSERVFACT == '04') || ($_UNSERVFACT == '54'))) {
        CON851('B1', 'B1', null, 'error', 'Error');
        _Datoalmacen_41();
    }
    else if (((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133')) || ($_ALMFACT == 'CR001')) {
        if (($_UNSERVFACT == '04') || ($_UNSERVFACT == '54')) {
            _Permisosalmacen2_41();
        }
        else {
            CON851('B1', 'B1', null, 'error', 'Error');
            _Datoalmacen_41();
        }
    }
    else {
        _Permisosalmacen2_41();
    }
}

function _Permisosalmacen2_41() {
    if ($_ALMFACT.substring(0, 3) == 'SIN') {
        _Ventanalote_41()
    }
    else {
        if ((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) {
            _Ventanalote_41()
        }
        if ((($_GRUPOFACT == 'MQ') && ($_TIPODRFACT == '1') && ((parseInt($_LLAVEBARRASW) == 0)) || ($_LLAVEBARRASW.trim() == '')) && (SAL41.NITUSU == '0891855847')) {
            CON851('1P', '1P', null, 'error', 'Error');
            _Ventanabarras_41();
        }
        else {
            if ((($_GRUPOFACT == 'PO') || ($_GRUPOFACT == 'NP')) && ($_TIPODRFACT == '1') && (parseInt($_LLAVEBARRASW) == 0)) {
                CON851('1P', '1P', null, 'error', 'Error');
                _Ventanabarras_41();
            }
            if ((($_GRUPOFACT == 'PO') || (SAL41.NITUSU == 'NP')) && ($_LLAVEBARRASW = !$_CODBARRASART)) {
                CON851('1P', '1P', null, 'error', 'Error');
                _Ventanabarras_41();
            }
            else {
                _Ventanalote_41();
            }
        }
    }
}
function _Ventanalote_41() {
    let datos_envio = datosEnvio();
    datos_envio += SAL41.ADMINW + '|' + $_TIPOART + $_GRUPOFACT + '|'
    SolicitarDll({ datosh: datos_envio }, data => {
        data = data.split('|');
        if (data[0].trim() == '00' || data[0].trim() == '01') {
            SAL41.DESCRIPGRUPO = data[1].trim();
            SAL41.OPCLOTEGR = data[2].trim();
            SAL41.INICIOLOTEGR = data[3].trim();
            if (SAL41.LOTEFARMUSU == 'N') {
                SAL41.OPCLOTEGR = 'N'
            } if ((SAL41.OPCLOTEGR == 'S') && (SAL41.FECHALNK >= SAL41.INICIOLOTEGR)) {
                _Aceptarlote_SAL41(); // Ventana
            } else {
                _Buscarsaldo_41();
            }
        } else {
            CON852(data[0], data[1], data[2], _toggleNav);
        }
    }, get_url('APP/SALUD/SAL41-17.DLL'));
}

function _Aceptarlote_SAL41() {
    if ($('#faarmaceutico_SAL41').length < 1) {
        $('#elementos-tabla').append(
            '<div class="col-md-4 col-sm-4 col-xs-4" id="FARMACEUTICO_SAL41">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-6 col-sm-8 col-xs-12">Lote farmaceutico:</label>' +
            '<div class="input-group col-md-6 col-sm-4 col-xs-12" id="MACRO_41">' +
            '<input id="farmaceutico_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden"1">' +
            '</div>' +
            '</div>' +
            '</div>');
        _evaluarlotefarmaceutico_SAL41();
    } else {
        _evaluarlotefarmaceutico_SAL41();
    }
}

function _evaluarlotefarmaceutico_SAL41() {
    validarInputs({
        form: '#FARMACEUTICO_SAL41',
        orden: '1'
    },
        () => { _Evaluaralmacen_41() },
        () => {
            SAL41.CODLOTEFACT = $('#farmaceutico_SAL41').val();
            if (SAL41.CODLOTEFACT.trim() == '') {
                CON851('', '02', null, 'error', 'Error');
                _evaluarlotefarmaceutico_SAL41();
            } else {
                datos_envio = datosEnvio() + SAL41.CODLOTEFACT + '|';
                SolicitarDll({ datosh: datos_envio }, data => {
                    console.debug(data);
                    data = data.split('|');
                    if (data[0].trim() == '00') {
                        SAL41.DESCRIPLTF = data[1].trim();
                        SAL41.LABLTF = data[2].trim();
                        SAL41.LOTELTF = data[3].trim();
                        _Buscarsaldo_41();
                    } else if (data[0].trim() == '08') {
                        CON851('', '08', null, 'error', 'Error');
                        _Evaluaralmacen_41();
                    }
                }, get_url("APP/SALUD/SAL41-18.DLL"));
            }
        }
    )
}

// function _dataSAL41_17(data) {
//     console.debug(data, 'SAL41-17');
//     data = data.split('|');
//     if (data[0].trim() == '00' || data[0].trim() == '99') {
//         if (data[0].trim() == '00') {
//             SAL41['DESCRIPGRUPO'] = data[1].trim();
//             SAL41['OPCLOTEGR'] = data[2].trim();
//         }
//         else {
//             SAL41['DESCRIPGRUPO'] = 'GRUPO NO EXISTE!';
//             SAL41['OPCLOTEGR'] = 'N';
//         }
//         _Validacionesventanalote_41();
//     }
//     else {
//         CON852(data[0], data[1], data[2], _toggleNav);
//     }
//     /// NO ME MUESTRA RM LA VENTANA
// }

function _Buscarsaldo_41() {
    $_CODALMSAL = $_ALMFACT;
    $_CODARTSAL = $_CODART;
    $_GRP1SAL = $_GRUPOFACT.substring(0, 1);
    $_CODLOTESAL = $_CODLOTEFACT;
    if ($_GRP1SAL != '9') {
        let URL = get_url("APP/INVENT/INV808.DLL");
        postData({ datosh: datosEnvio() + $_ALMFACT + $_CODART + $_CODLOTEFACT + '|' }, URL)
            .then(data => {
                console.debug(data);
                fuente = '';
                for (var i in data) {
                    var fuente = '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<div class="col-md-3"> ' +
                        '<input id="sdoantcant' + i + '_SAL41" class="form-control input-md"> ' +
                        '</div>' +
                        '<div class="col-md-3"> ' +
                        '<input id="acumentcant' + i + '_SAL41" class="form-control input-md"> ' +
                        '</div>' +
                        '<div class="col-md-3"> ' +
                        '<input id="acumsalcant' + i + '_SAL41" class="form-control input-md"> ' +
                        '</div>' +
                        '<div class="col-md-3"> ' +
                        '<input id="sdoactcant' + i + '_SAL41" class="form-control input-md"> ' +
                        '</div>' +
                        '</div>';
                }
                var ventanaconsultasaldo = bootbox.dialog({
                    size: 'large',
                    title: 'CONSULTA SALDO ACTUAL ' + `${$_CODART}` + ' ALM: ' + `${$_ALMFACT}`,
                    closeButton: false,
                    message: '<div class="row" style="display:float!important">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        fuente +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-6 col-sm-6 col-xs-12">TOTAL ACUMULADO:</label>' +
                        '<div class="input-group col-md-6 col-sm-6 col-xs-12" id="SU_41">' +
                        '<input id="saldototal_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="2">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>',
                    buttons: {
                        aceptar: {
                            label: 'Aceptar',
                            callback: function () {
                                ventanaconsultasaldo.off('shown.bs.modal');
                                if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
                                    $_VLRUNITW = parseFloat($_VLRDEVOL / $_CANTDEVOL)
                                    $_VLRLIMIW = $_VLRUNIT * 3
                                    _Dato3_41();
                                } else {
                                    _Calcularmonto_41();
                                }
                            },
                            className: 'btn-primary'
                        },
                    },
                });
                ventanaconsultasaldo.init($('.modal-footer').hide());
                ventanaconsultasaldo.on('keydown', e => {
                    $('.btn-primary').click();
                });
                ventanaconsultasaldo.init(() => {
                    _inputControl('disabled');
                    var SALDOTOTAL = 0;
                    for (var i in data) {
                        $('#sdoantcant' + i + '_SAL41').val(data.SDO_ANT);
                        $('#acumentcant' + i + '_SAL41').val(data.ACUM_ENT);
                        $('#acumsalcant' + i + '_SAL41').val(data.ACUM_SAL);
                        $('#sdoactcant' + i + '_SAL41').val(data.SDO_ACT);
                        SALDOTOTAL = SALDOTOTAL + parseFloat(data.SDO_ACT);
                    }
                    $('#saldototal_SAL41').val(SALDOTOTAL);
                    $_SDOACTCANT = SALDOTOTAL;
                });

            })
            .catch(err => {
                console.debug(err);
            })
    }
}

function _Calcularmonto_41() {
    console.debug('calcularmonto');
    if ($_CLFACT == '0') {
        if (($_BASEMEDTAR == '1') || ($_BASEMEDTAR == '2') || ($_BASEMEDTAR == '3') || ($_BASEMEDTAR == '4')) {
            switch ($_GRUPOFACT) {
                case 'PO':
                    $_FACTORW = $_PORCPOTAR / 100;
                    break;
                case 'NP':
                    $_FACTORW = $_PORCNPTAR / 100;
                    break;
                case 'MO':
                    $_FACTORW = $_PORCMOTAR / 100;
                    break;
                default:
                    $_FACTORW = $_PORCMQTAR / 100;
                    break;
            }
        } else {
            $_FACTORW = 1;
            $_BASEMEDTAR = '3';
        }
        $_VLRUNITW = parseFloat($_VLRUNITW) * $_FACTORW;
        // $_VALORAPROX = Math.round(parseFloat($_VLRUNITW) * 1);
        $_VALORAPROX = parseFloat($_VLRUNITW) * 1;
        $_VLRUNITW = $_VALORAPROX;
        // LEER TABMEDICAMENTO
        console.debug('archivo-medicamento');
        _Calcularmonto2_41();
    } else {
        if (($_CLFACT == '4') && (($_ARTFACT == 'XXCAPITA') || ($_ARTFACT == 'XXUTI'))) {
            $_SWAPR = '1';
        }
        else {
            _Buscarincremento_41();
            switch ($_FORMALIQTAB) {
                case '1':
                    $_SWAPR = 1;
                    break;
                case '2':
                    $_SWAPR = 100;
                    break;
                case '3':
                    $_SWAPR = 1;
                    break;
                case '4':
                    $_SWAPR = 100;
                    break;
                case '5':
                    $_SWAPR = 1;
                    break;
                default:
                    $_SWAPR = 1;
                    break;
            }
            if (SAL41.NITUSU == '0892000401') {
                $_VLRUNITW = Math.round(($_VLRUNITW * $_FACTORW) / $_SWAPR);
                $_VLRUNITW = Math.round($_VLRUNITW * $_SWAPR);
            }
            else {
                $_VALORAPROX = Math.round(($_VLRUNITW * $_FACTORW) / $_SWAPR);
                $_VLRUNITW = Math.round($_VALORAPROX * $_SWAPR);
            }
        }
        _Calcularmonto2_41();
    }
}

function _Calcularmonto2_41() {
    if (($_CLFACT == '1') && (($_FORMALIQTAB == '2') || ($_FORMALIQTAB == '4'))) {
        $_VALOREDIT = $_MONTOTAB;
    }
    else {
        $_VALOREDIT = $_VLRUNITW;
    }
    _Calcularmonto3_41();
}
function _Calcularmonto3_41() {
    console.debug('CANTFACT SALUD');
    $_CANTFACT = 0;
    if (parseInt($_CANTFACT) > 0) {
        // $_VLRARTW = Math.round($_VLRUNITW * $_CANTFACT);
        $_VLRARTW = $_VLRUNITW * $_CANTFACT;
    }
    if ((SAL41.NITUSU == '0845000038') && ($_CLFACT == '0')) {
        $_VLRARTCOMPW = $_VLRUNITW * $_CANTFACT;
        if ($_VLRARTCOMPW == $_VLRARTW) {
            _Calcularmonto4_41();
        }
        else {
            $_VLRARTW = $_VLRARTCOMPW;
        }
    }
    else {
        _Calcularmonto4_41();
    }
}
function _Calcularmonto4_41() {
    if ($_SWOCULTAR == '01') {
        // $('#und_401').val('');
        PriceUnitMask_41.typedValue = ' ';
    }
    else {
        console.debug($_VLRUNITW);
        // $('#und_401').val(parseFloat($_VALOREDIT));
        PriceUnitMask_41.typedValue = $_VALOREDIT;
    }
    $_VLRLIMIW = $_VLRUNITW * 3;
    _Calcularmonto5_41();
}

function _Calcularmonto5_41() {
    if ($_CLFACT == '1') {
        if ($_CODTABW == 'I4') {
            $_VLRUNITW = $_MONTOTAB * $_HNQUIRTAR * $_FACTORW;
            $_CANTFACT = 1;
            MountMask_41.typedValue = $_CANTFACT;
            _Validarcant_41();
        }
        else {
            _Datohonorarios_41();
        }
    }
    else {
        _Dato3_41();
    }
}

function _Dato3_41() {
    // if ($_CLFACT == '0') {
    //     // AGREGAR A LA TABLA MOSTRAR "F4 EN CANTIDAD, RECALCULA SALDO ARTICULO"
    // }
    if (parseFloat($_CANTFACT) == 0) {
        if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
            $_CANTFACT = $_CANTDEVOL * (-1);
        }
        else {
            $_CANTFACT = 1;
        }
        $_CANTFACTEDIT = $_CANTFACT;
        console.debug($_CANTFACTEDIT);
        MountMask_41.typedValue = $_CANTFACTEDIT;
    }
    console.debug('dato3');
    _Evaluarcant_41();
}

function _Evaluarcant_41() {
    validarInputs({
        form: '#CANT_41',
        orden: '1'
    },
        () => { _Dato2_41() },
        () => {
            $_CANTFACT = MountMask_41.value;
            console.debug($_CANTFACT);
            if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
                _Validarcant_41();
            } else {
                if ($_CANTFACT == '0.00') {
                    _Dato3_41();
                } else {
                    _Validarcant_41();
                }
            }
        }
    )
}
function _Validarcant_41() {
    if ($_CLFACT == '0') {
        if ($_TIPODRFACT == '2') {
            if (parseFloat($_CANTFACT) == 0) {
                _Aceptarcodigo_41();
            }
            else {
                if ((parseFloat($_CANTFACT) > 0) || (parseFloat($_CANTFACT) + parseFloat($_CANTDEVOL) < 0)) {
                    $_SWERROR = '1'
                    CON851('07', '07', null, 'error', 'Error');
                    _Dato3_41();
                }
                else {
                    $_SWERROR = '0';
                    _Dato5_41();
                }
            }
        }
        else {
            if ((parseFloat($_CANTFACT < 0)) && ($_ALMFACT != 'S')) {
                CON851('46', '46', null, 'error', 'Error');
                _Dato3_41();
            } else if ((SAL41.NITUSU == '0892000458') && (($_ALMFACT == 'DR002') || ($_ALMFACT == 'DR003') || ($_ALMFACT == 'URG01'))) {
                _Validarcant2_41()
            }
            else {
                if (($_ALMFACT.substring(0, 3) != 'SIN') && (parseFloat($_CANTFACT) > 0) && (parseFloat($_CANTFACT) > parseFloat($_SDOACTCANT))) {
                    CON851('07', '07', null, 'error', 'Error');
                    if (SAL41.RESTIC_EXUSU == 'N') {
                        _Dato3_41();
                    } else {
                        _Validarcant2_41();
                    }
                }
                else {
                    _Validarcant2_41();
                }
            }
        }
    }
    else {
        _Validarcant2_41();
    }
}
function _Validarcant2_41() {
    if ($_CLFACT == '0') {
        if ($_SDOACTCANT < $_AUTORETART) {
            CON851('5K', '5K', null, 'warning', 'Advertencia!');
        } else {
            if ($_CANTFACT > $_CANTMAX) {
                $_SWERROR = '1';
                CON851('07', '07', null, 'error', 'Error');
                _Dato3_41();
            } else {
                _Validarcant3_41()
            }
        }
    } else {
        $_COD1ARTFACT = $_CODARTFACT.substring(0, 1);
        if (($_GRUPOFACT == '93') || ($_GRUPOFACT == 'XX') || (($_GRUPOFACT == '89') && ($_COD1ARTFACT == '3'))) {
            _Validarcant3_41()
        }
        else {
            if ($_CANTFACT > $_CANTMAX) {
                $_SWERROR = '1';
                CON851('07', '07', null, 'error', 'Error');
                _Dato3_41();
            } else {
                _Validarcant3_41()
            }
        }
    }
}
function _Validarcant3_41() {
    if (((SAL41.NITUSU == '0900658867') || (SAL41.NITUSU == '0900541158') || (SAL41.NITUSU == '0900566047') || (SAL41.NITUSU == '0800037979')) && (($_GRUPOFACT == 'PO') || ($_GRUPOFACT == 'NP'))) {
        fuente = '<div class="col-md-12" id="DIASTRATAFACT_41"> ' +
            '<input id="diatratafact_SAL41" type="text" class="form-control input-md" data-orden="1" maxlength="3"> ' +
            '</div>';
        _ventana({
            source: fuente,
            title: 'DIAS TRATAMIENTO',
            size: small,
            espace: true,
            focus: '#diatratafact_SAL41',
            form: '#DIASTRATAFACT_41',
            order: '1',
            global1: '$_DIASTRATAFACT',
            inputglobal1: '#diatratafact_SAL41',
        }, _Validarcant4_41, _Detalle_41)
    }
    else {
        _Validarcant4_41();
    }
}
function _Validarcant4_41() {
    if (($_VLRUNITW == '0') || (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
        $_DESCTOW = '0';
        _Calcularprecio_41();
    } else {
        _Datodestart_41();
    }
}

function _Datodestart_41() {
    $_DESCTOUSU = $_USUA_GLOBAL[0].DESCTO;
    if (($_DESCTOUSU == 'N') || (($_CLFACT == '0') && ($_TIPODRFACT == '2'))) {
        $_DESCTOW = '0'
        _Calcularprecio_41();
    }
    else {
        // evaluar desctow 5592
    }
}

function _Calcularprecio_41() {
    // $_FACTORDESW = Math.round((100 - $_DESCTOW) / 100)
    $_FACTORDESW = (100 - $_DESCTOW) / 100;
    if (SAL41.NITUSU == '0845000038') {
        if ($_CLFACT == '0') {
            $_VLRUNIT2W = Math.round(parseFloat($_VLRUNITW) * parseFloat($_FACTORDESW));
            $_VLRUNITW = $_VLRUNIT2W;
        }
        else {
            $_VLRUNITW = Math.round(parseFloat($_VLRUNITW) * parseFloat($_FACTORDESW));
        }
    }
    else {
        $_VLRUNITW = Math.round(parseFloat($_VLRUNITW) * parseFloat($_FACTORDESW));
    }
    _Calcularprecio2_41();
}
function _Calcularprecio2_41() {
    if (($_ASUMEIVAUSU == 'S') && ($_CLFACT = ! '1') && ($_GRUPOFACT = !'S1') && ($_GRUPOFACT = ! 'XX') && (parseFloat($_VLRUNITW > 0))) {
        _Dato5_41();
    }
    else {
        _Dato4_41();
    }
}

function _Dato4_41() {
    if ((SAL41.NITUSU == '0822001570') && ($_CLFACT == '0')) {
        // CONTINUE
    } else {
        if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162') || (SAL41.NITUSU == '0900658867') || (SAL41.NITUSU == '0830511298') || (SAL41.NITUSU == '0822001570')) {
            if (($_ADMINW == 'LUZA') || ($_ADMINW == 'MOR6') || ($_ADMINW == 'ADMI') || ($_ADMINW == 'BLA1')) {
                $_SWINVALID = '0';
                _Dato42_41();
            } else {
                _Validartlimite_41();
            }
        }
        else {
            _Dato42_41();
        }
    }
}

function _Dato42_41() {
    if ($_SWOCULTAR == '01') {
        _Validartlimite_41();
    }
    else {
        _Evaluarvlrunitw_41();
    }
}

function _Evaluarvlrunitw_41() {
    console.debug('pendiente f8 linea 5656');
    validarInputs({
        form: '#VLRUNIT_41',
        orden: '1'
    },
        function () { _Dato2_41() },
        _Validartlimite_41
    )
}
function _Validartlimite_41() {
    $_VLRUNITW = PriceUnitMask_41.value;
    console.debug($_VLRUNITW);
    console.debug('falta incluir el con851p');
    if (($_VLRLIMIW > 0) && ($_VLRUNITW > $_VLRLIMIW)) {
        CON851('9E', '9E', null, 'warning', 'Advertencia!');
        if ((SAL41.NITUSU == '0891855847') || (SAL41.NITUSU == '024247556') || (SAL41.NITUSU == '0900030814') || (SAL41.NITUSU == '0800162035') || (SAL41.NITUSU == '0900019291')) {
            // CON851P
        }
        else {
            _Dato4_41();
        }
    }
    if ($_SWBONO == '1') {
        $_VRDCTOW = $_VLRUNITW * 0.2;
        $_VLRUNITW = $_VLRUNITW * 0.8;
    }
    $_VALOREDIT = $_VLRUNITW;
    console.debug($_VALOREDIT);
    if ($_SWOCULTAR == '01') {
        _Dato5_41();
    }
    else {
        // $('#vlrunit_401').val($_VALOREDIT);
        PriceUnitMask_41.typedValue = $_VALOREDIT;
        _Dato5_41();
    }
}
function _Dato5_41() {
    if (SAL41.NITUSU == '0892000401') {
        let vlrunit = $_VLRUNITW.replace(/,/, '');
        let cantfact = $_CANTFACT.replace(/,/, '')
        $_VLRARTW = parseFloat(vlrunit) * parseFloat(cantfact);
    }
    else {
        let vlrunit = $_VLRUNITW.replace(/,/, '');
        let cantfact = $_CANTFACT.replace(/,/, '');
        $_VLRARTW = parseFloat(vlrunit) * parseFloat(cantfact);
    }
    _Dato52_41();
}
function _Dato52_41() {
    if ((SAL41.NITUSU == '0830512772') && ($_REGULADOSTABME == 'S')) {
        if ($_VLRARTW > $_VLRLIMITETABME) {
            $_VLRREGULADOW = ($_VLRARTW * $_PORCEMINTABME) / 100;
        }
        else {
            if ($_VLRARTW > 0) {
                $_VLRREGULADOW = ($_VLRARTW * $_PORCEMAXTABME) / 100;
            }
        }
        $_VLRARTW = $_VLRARTW + $_VLRREGULADOW;
    }
    if (SAL41.NITUSU == '0892000401') {
        console.debug('condicion despues 4835');
        $_VALOREDIT = $_VLRARTW;
        // $('#vlrtotal_41').val($_VALOREDIT);
        PriceTotalMask_41.typedValue = $_VALOREDIT;
        _Dato53_41();
    }
    else {
        $_VALORAPROX = $_VLRARTW / $_SWAPR;
        $_VLRARTW = $_VALORAPROX * $_SWAPR;
    }
    $_VALOREDIT = $_VLRARTW;
    // $('#vlrtotal_41').val($_VALOREDIT);
    PriceTotalMask_41.typedValue = $_VALOREDIT;
    console.debug('condicion despues 4845')
    _Dato53_41();
}

function _Dato53_41() {
    if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
        if (($_VLRARTW > 0) || (($_VLRARTW + $_VLRDEVOL) < 0)) {
            CON851('07', '07', null, 'error', 'Error');
            _Dato4_41();
        }
    }
    else if (($_CLFACT == '1') && ($_CODTAB == 'I4')) {
        _Ventanacirugia_41();
    }
    else {
        // _Agregarfila_41();
        _Total_41();
    }

}

// function _Agregarfila_41() {
//     $('#TABLA_401 tbody').append(
//         '<tr>' +
//         '<td>' + $('#codservicio1_401').val() + $('#codservicio2_401').val() + '</td>' +
//         '<td>' + $('#detalle_401').val() + '</td>' +
//         '<td></td>' +
//         '<td></td>' +
//         '<td>' + MountMask_41.value + '</td>' +
//         '<td>' + PriceUnitMask_41.value + '</td>' +
//         '<td>' + PriceTotalMask_41.value + '</td>' +
//         '</tr>'
//     )
//     _Limpiarcampos_41();
//     _Aceptarcodigo_41();
// }

function _Total_41() {
    if ($_CLFACT == '0') {
        $('#TABLA_401 tbody').append(
            '<tr>' +
            '<td>' + SAL41.CONTEO + '</td>' +
            '<td>' + $('#codservicio2_SAL41').val() + '</td>' +
            '<td>' + $('#detalle_SAL41').val() + '</td>' +
            '<td>' + $('#almac_SAL41').val() + '</td>' +
            '<td>' + MountMask_41.value + '</td>' +
            '<td>' + $('#und_SAL41').val() + '</td>' +
            '<td>' + PriceUnitMask_41.value + '</td>' +
            '<td>' + PriceTotalMask_41.value + '</td>' +
            '</tr>'
        )
    } else {
        $('#TABLA_401 tbody').append(
            '<tr>' +
            '<td>' + SAL41.CONTEO + '</td>' +
            '<td>' + $('#codservicio2_SAL41').val() + '</td>' +
            '<td>' + $('#detalle_SAL41').val() + '</td>' +
            '<td></td>' +
            '<td>' + MountMask_41.value + '</td>' +
            '<td></td>' +
            '<td>' + PriceUnitMask_41.value + '</td>' +
            '<td>' + PriceTotalMask_41.value + '</td>' +
            '</tr>'
        )
    }
    _Sumarvalores_41();
    _Almacenartabla();
    $_VALORBASE1IVA = $_VALORBASE2IVA = $_VALORBASE3IVA = 0;
    $_VLRTOTEDIT = $_VALORBRUTO;
    console.debug($_SWOCULTAR);
    $_VLRIVAFACT = ($_VALORBASE1IVA * $_IVAUSU / 100) + ($_VALORBASE2IVA * $_IVAUSU2 / 100) + ($_VALORBASE3IVA * $_IVAUSU3 / 100);
    SAL41['VLRIVA1FACT'] = ($_VALORBASE1IVA * $_IVAUSU / 100);
    SAL41['VLRIVA2FACT'] = ($_VALORBASE2IVA * $_IVAUSU / 100);
    SAL41['VLRIVA3FACT'] = ($_VALORBASE3IVA * $_IVAUSU / 100);
    $_VALORDESFACT = 0;
    $_VALORTOTAL = $_VALORBRUTO + $_VLRIVAFACT - $_VALORDESFACT;
    if ($_SWOCULTAR == '01') {
        PriceTotalMask_41.typedValue = '';
        PriceivaMask_41.typedValue = '';
        NetoFactMask_41.typedValue = '';
    }
    else {
        PriceContMask_41.typedValue = $_VLRTOTEDIT;
        PriceivaMask_41.typedValue = $_VLRIVAFACT;
        NetoFactMask_41.typedValue = $_VLRIVAFACT;
        console.debug($_VLRIVAFACT, $_VLRTOTEDIT);
    }
    _Limpiarcampos_41();
    SAL41.CONTEO = SAL41.CONTEO + 1;
    _Aceptarcodigo_41();
}

function _Almacenartabla() {
    if ($('#TABLA_401 tbody tr').length < 2) {
        $_CODSERTAB.length > 0 ? $_CODSERTAB = $_CODSERTAB : $_CODSERTAB = '';
        $_DIASTRATAFACT = '' ? $_DIASTRATAFACT = 0 : $_DIASTRATAFACT = $_DIASTRATAFACT;
        $_CODLOTEFACT = '' ? $_CODLOTEFACT = '    ' : $_CODLOTEFACT = $_CODLOTEFACT;
        // $TABLAFACT = '[{"ALMFACT":"' + $_ALMFACT + '","ARTFACT":"' + $_ARTFACT + '","CODLOTEFACT":"' + $_CODLOTEFACT + '","CANTFACT":"' + $_CANTFACT + '","VLRFACT":"' + $_VALORBRUTO + '","DIASTRATAFACT":"' + $_DIASTRATAFACT + '","VLRLATERFACT":"' + SAL41.VLRLATERFACT + '","DATOSETCUP":"' + $_DATOSETCUP + '","CISCUP":"' + $_CISCUP + '","DESCRIPCUP":"' + $_DESCRIPCUP + '","CODCUP":"' + $_CODSERTAB + '","VLRTOTAL":"' + $_VALOREDIT + '"}]'
        $TABLAFACT = [
            { ALMAFACT: $_ALMFACT, ARTFACT: $_ARTFACT, CODLOTEFACT: $_CODLOTEFACT, CANTFACT: MountMask_41.value, VLRFACT: PriceUnitMask_41.value, DIASTRATAFACT: $_DIASTRATAFACT, VLRLATERFACT: SAL41.VLRLATERFACT, DATOSETCUP: $_DATOSETCUP, CISCUP: $_CISCUP, DESCRIPCUP: $_DESCRIPCUP, CODCUP: $_CODSERTAB, VLRTOTAL: PriceTotalMask_41.value }
        ]
        // $TABLAFACT = JSON.parse($TABLAFACT);
        console.debug($TABLAFACT);
        // }
    } else {
        // if ($_CLFACT == '0') {
        // $TABLAFACT2 = '{"ALMFACT":"' + $_ALMFACT + '","ARTFACT":"' + $_ARTFACT + '","CODLOTEFACT":"' + $_CODLOTEFACT + '","CANTFACT":"' + $_CANTFACT + '","VLRFACT":"' + $_VALORBRUTO + '","DIASTRATAFACT":"' + $_DIASTRATAFACT + '","VLRLATERFACT":"' + $_VLRLATERFACT + '","DATOSETCUP":"' + $_DATOSETCUP + '","CISCUP":"' + $_CISCUP + '","DESCRIPCUP":"' + $_DESCRIPCUP + '"}'
        // $TABLAFACT2 = JSON.parse($TABLAFACT2);
        // $TABLAFACT.push($TABLAFACT2);
        // console.debug($TABLAFACT)
        // }
        // else {
        // $TABLAFACT2 = '{"ALMFACT":"' + $_ALMFACT + '","ARTFACT":"' + $_ARTFACT + '","CODLOTEFACT":"' + $_CODLOTEFACT + '","CANTFACT":"' + $_CANTFACT + '","VLRFACT":"' + $_VALORBRUTO + '","DIASTRATAFACT":"' + $_DIASTRATAFACT + '","VLRLATERFACT":"' + SAL41.VLRLATERFACT + '","DATOSETCUP":"' + $_DATOSETCUP + '","CISCUP":"' + $_CISCUP + '","DESCRIPCUP":"' + $_DESCRIPCUP + '","CODCUP":"' + $_CODSERTAB + '","VLRTOTAL":"' + $_VALOREDIT + '"}'
        // $TABLAFACT2 = JSON.parse($TABLAFACT2);
        $TABLAFACT2 = { ALMAFACT: $_ALMFACT, ARTFACT: $_ARTFACT, CODLOTEFACT: $_CODLOTEFACT, CANTFACT: MountMask_41.value, VLRFACT: PriceUnitMask_41.value, DIASTRATAFACT: $_DIASTRATAFACT, VLRLATERFACT: SAL41.VLRLATERFACT, DATOSETCUP: $_DATOSETCUP, CISCUP: $_CISCUP, DESCRIPCUP: $_DESCRIPCUP, CODCUP: $_CODSERTAB, VLRTOTAL: PriceTotalMask_41.value }
        $TABLAFACT.push($TABLAFACT2);
        console.debug($TABLAFACT)
    }
}


function _Limpiarcampos_41() {
    $('#codservicio2_SAL41').val('');
    $('#almac_SAL41').val('');
    $('#cant_SAL41').val('');
    $('#und_SAL41').val('');
    $('#vlrunit_SAL41').val('');
    $('#vlrtotal_SAL41').val('');
}

function _Datodescto_41() {
    if ($_SWBONO == '0') {
        $_VALORDESFACT = 0;
    }
    _Datoabono_41();
}
function _Datoabono_41() {
    if (($_PREFIJOFACT == 'C' || $_PREFIJOFACT == 'P' || $_PREFIJOFACT == 'T') || ($_FORMACOPAGNUM == '2')) {
        $_COPAGOESTIMFACT = 0;
        _Editarabono_41();
    }
    else if (($_FORMACOPAGNUM == '4') && ($_LLAVENUM == $_FACTCAPITNUM)) {
        _Datocopago_41();
    }
    else if ($_PREFIJOFACT == 'E') {
        $_PORCENTCOPAGO = 9;
        $_COPAGOESTIMFACT = $_VALORTOTAL;
        if (SAL41.NITUSU == '0892000401') {
            _Datocopago_41();
        }
        else {
            _Editarabono_41();
        }
    }
    else if (((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) && ($_PORCENTCOPAGONUM == '99')) {
        $_COPAGOESTIMFACT = $_VALORBRUTO;
        _Editarabono_41();
    }
    else if (((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719')) && ($_COPAGOPACI == 'N')) {
        $_COPAGOESTIMFACT = 0;
        _Editarabono_41();
    }
    else if (SAL41.NITUSU == '0800156469') {
        _Datoabono2_41();
    }
    else {
        if ($_CLFACT == '7') {
            $_COPAGOESTIMFACT = 0;
            _Editarabono_41();
        }
        else {
            _Datoabono2_41();
        }
    }
}
function _Datoabono2_41() {
    if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
        $_COPAGOESTIMFACT == 0;
        _Editarabono_41();
    }
    else if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) && ($_NITFACT == '9999') && (($_ACTTER == '15') || ($_ACTTER == '25'))) {
        $_PORCENTCOPAGO = 9;
        $_COPAGOESTIMFACT = $_VALORTOTAL;
        if (SAL41.NITUSU == '0892000401') {
            _Datocopago_41();
        }
        else {
            _Editarabono_41();
        }
    }
    else if ((SAL41.NITUSU == $_NITFACT) && (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z"))) {
        $_COPAGOESTIMFACT = 0;
        _Datocopago_41();
    }
    else if ((SAL41.NITUSU == '0900685768') && (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z"))) {
        $_PORCENTCOPAGO = 9;
        $_COPAGOESTIMFACT = $_VALORTOTAL;
        _Editarabono_41();
    }
    else if ((SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0830511298')) {
        _Datoabono3_41();
    }
    else {
        if (($_ACTTER == '15') || ($_ACTTER == '25') || ($_ACTTER == '30') || ($_ACTTER == '22') || ($_ACTTER == '27')) {
            _Datocopago_41();
        }
        else {
            _Datoabono3_41();
        }
    }
}

function _Datoabono3_41() {
    if ((($_UNSERVFACT == '01') || ($_UNSERVFACT == '08')) || ($_PUERTAESTAD == '1') || (($_EPSPACI == 'RES') || ($_EPSPACI == 'EAR'))) {
        $_COPAGOESTIMFACT = 0;
        _Editarabono_41();
    }
    else if (SAL41.NITUSU == '0800175901') {
        $_PORCENTCOPAGO = 0;
    }
    else {
        if ($_PORCENTCOPAGO = 0) {
            if (($_COPAGMODCUP == '1') && (($_TIPOAFILPACI == '0') || ($_TIPOAFILPACI == '2'))) {
                switch ($_ESTRATOPACI) {
                    case '1':
                        $_PORCENTCOPAGO = 11.5;
                        break;
                    case '2':
                        $_PORCENTCOPAGO = 17.3;
                        break;
                    case '3':
                        $_PORCENTCOPAGO = 23;
                        break;
                    default:
                        $_PORCENTCOPAGO = 11.5;
                        break;
                }
                _Validarfechaopago_41();
            }
            else if ((SAL41.NITUSU == '0900405505') && ($_CLFACT == '4') && (($_TIPOAFILPACI == '0') || ($_TIPOAFILPACI == '2'))) {
                if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                    _Datocopago_41();
                }
                else {
                    _Datoabono4_41();
                }
            }
            else {
                switch ($_ESTRATOPACI) {
                    case '0':
                        $_PORCENTCOPAGO = 0;
                        if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                            _Datocopago_41();
                        }
                        else {
                            _Datoabono4_41();
                        }
                        break;
                    case '1':
                        if ($_TIPOPACI == 'S') {
                            $_PORCENTCOPAGO = 0;
                            if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                                _Datocopago_41();
                            }
                            else {
                                _Datoabono4_41();
                            }
                        }
                        else {
                            $_PORCENTCOPAGO = 9;
                            $_COPAGOESTIMFACT = $_VLRMODW[1];
                            _Datocopago_41();
                        }
                        break;
                    case '2':
                        if ($_TIPOPACI == 'S') {
                            $_PORCENTCOPAGO = 10;
                            if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                                _Datocopago_41();
                            }
                            else {
                                _Datoabono4_41();
                            }
                        }
                        else {
                            $_PORCENTCOPAGO = 9;
                            $_COPAGOESTIMFACT = $_VLRMODW[2];
                            _Datocopago_41();
                        }
                        break;
                    case '3':
                        if ($_TIPOPACI == 'S') {
                            $_PORCENTCOPAGO = 15;
                            if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                                _Datocopago_41();
                            }
                            else {
                                _Datoabono4_41();
                            }
                        }
                        else {
                            $_PORCENTCOPAGO = 9;
                            $_COPAGOESTIMFACT = $_VLRMODW[3];
                            _Datocopago_41();
                        }
                        break;
                    default:
                        if ($_TIPOPACI == 'S') {
                            $_PORCENTCOPAGO = 15;
                            if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                                _Datocopago_41();
                            }
                            else {
                                _Datoabono4_41();
                            }
                        }
                        else {
                            $_PORCENTCOPAGO = 9;
                            $_COPAGOESTIMFACT = $_VLRMODW[3];
                            _Datocopago_41();
                        }
                        break;
                }
            }
        }
        else {
            $_OPSEGU = 'I41C';
            let datos_envio = datosEnvio();
            datos_envio += '|'
            datos_envio += $_OPSEGU;
            SolicitarDll({ datosh: datos_envio }, _dataCON904S_06_41, get_url("APP/CONTAB/CON904S.DLL"));
        }
    }
}
function _dataCON904S_06_41(data) {
    console.debug(data, 'CON904S_06');
    var date = data.split('|');
    if (date[0].trim() == '01') {
        if ((SAL41.NITUSU == '0900405505') && ($_GRUPOFACT == '93')) {
            if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
                _Datocopago_41();
            }
            else {
                _Datoabono4_41();
            }
        }
        else {
            _Editarabono_41();
        }
    } else if (date[0].trim() == '00') {
        if (($_SWORDSERV == 'S') && ($_COPAGOESTIMFACT > 0)) {
            _Datocopago_41();
        }
        else {
            _Datoabono4_41();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _Datoabono4_41() {
    if ((SAL41.NITUSU == '0800162035') && ($_NITFACT == '9999') && ($_CLFACT == '0')) {
        $_PORCENTCOPAGO = 9;
    } if (SAL41.NITUSU == '0822002688') {
        _Validarcopago_41();
    }
    else {
        _Evaluarcopago_41();
    }
}
function _Evaluarcopago_41() {
    validarInputs({
        form: '#PCOPAGO_41',
        orden: '1'
    },
        () => { _Evaluarcodservicio2_41() },
        () => {
            $_PORCENTCOPAGO = CopagoMask.value;
            if (($_PORCENTCOPAGO == 0) || ($_PORCENTCOPAGO == 5) || ($_PORCENTCOPAGO == 10) || ($_PORCENTCOPAGO == 15) || ($_PORCENTCOPAGO == 20) || ($_PORCENTCOPAGO == 30) || ($_PORCENTCOPAGO == 11.5) || ($_PORCENTCOPAGO == 17.3) || ($_PORCENTCOPAGO == 23) || ($_PORCENTCOPAGO == 9)) {
                _Validarcopago2_41();
            } else {
                _Datoabono_41();
            }
        }
    )
}

function _Validarcopago2_41() {
    if ($_PORCENTCOPAGO == 9) {
        CopagoMask.typedValue = ' ';
    } else {
        $_COPAGOESTIMFACT = Math.round((($_VALORBRUTO + $_VLRIVAFACT - $_VALORDESFACT) * $_PORCENTCOPAGO) / 100);
    }
    _Datocopago_41();
}

function _Datocopago_41() {
    console.debug('dato copago 41');
    if ((SAL41.NITUSU == '0800162035') && ($_NITFACT == '9999') && ($_CLFACT == '0')) {
        $_COPAGOESTIMFACT = $_VALORTOTAL;
    }
    $_OPSEGU = 'I41C';
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_OPSEGU;
    SolicitarDll({ datosh: datos_envio }, _dataCON904S_07_41, get_url("APP/CONTAB/CON904S.DLL"));
}

function _dataCON904S_07_41(data) {
    console.debug(data, 'CON904S_07');
    var date = data.split('|');
    if (date[0].trim() == '01') {
        if (((SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0830511298')) && ($_GRUPOFACT == '93')) {
            _Evaluarcopagoestimfact();
        } else {
            _Editarabono_41();
        }
    } else if (date[0].trim() == '00') {
        _Evaluarcopagoestimfact_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Evaluarcopagoestimfact_41() {
    CopagoMask2.typedValue = $_COPAGOESTIMFACT;
    validarInputs({
        form: '#COPAGO_41',
        orden: '1'
    },
        function () { _Evaluarfecha_41() },
        _Editarabono_41
    )
}

function _Editarabono_41() {
    $_VALOREDIT = $_COPAGOESTIMFACT; // mostrar valoredit? en neto factura
    $_VALOTOTAL = $_VALORBRUTO + $_VLRIVAFACT - $_VALORDESFACT - $_COPAGOESTIMFACT;
    $_VALORTOTEDIT = $_VALORTOTAL;
    if ($_SWOCULTAR == '01') {
        NetoFactMask_41.typedValue = ' ';
    }
    else {
        NetoFactMask_41.typedValue = $_VALORTOTAL;
    }
    _Aceptartipocopago_41();
}

function _Aceptartipocopago_41() {
    if (($_VALORTOTAL < 0) && (($_CLFACT == '1') || ($_CLFACT == '2') || ($_CLFACT == '3'))) {
        CON851('07', '07', null, 'warning', 'Warning');
    }
    if ($_COPAGOESTIMFACT == 0) {
        $_TIPOCOPAGOFACT = ' ';
        _Aceptarespec_41();
    }
    else {
        if ($_VALOTOTAL = 0) {
            $_TIPOCOPAGOFACT = 3;
            _Aceptarespec_41();
        }
        else {
            if ($_CLFACT == '5') {
                $_TIPOCOPAGOFACT = 2;
                _Aceptarespec_41();
            }
            else {
                if ((SAL41.NITUSU == '0845000038') && (($_CLFACT == '0') || ($_CLFACT == '2') || ($_CLFACT == '3') || ($_CLFACT == '4'))) {
                    $_TIPOCOPAGOFACT = '2';
                    _Aceptarespec_41();
                }
                else {
                    var copago = [
                        { codigo: '1', descripcion: 'CO-PAGO' },
                        { codigo: '2', descripcion: 'CUOTA MODERAD' },
                        { codigo: '3', descripcion: 'PAGO CONTADO' }
                    ];
                    POPUP({
                        array: copago,
                        titulo: 'TIPO DE PAGO',
                        indices: [
                            { id: 'codigo', label: 'descripcion' }
                        ],
                        callback_f: _Evaluarcopagoestimfact_41
                    },
                        _EvaluarSER822A_41);
                }
            }
        }
    }
}

function _EvaluarSER822A_41(data) {
    switch (data.codigo) {
        case '1':
        case '2':
        case '3':
            if (SAL41.NITUSU == '0800074996') {
                var tipodepago = [
                    { codigo: '1', descripcion: 'EFECTIVO' },
                    { codigo: '2', descripcion: 'TARJ.CRED' },
                    { codigo: '2', descripcion: 'TARJ.DEBIT' },
                ];
                POPUP({
                    array: tipodepago,
                    titulo: 'FORMA DE PAGO',
                    indices: [
                        { id: 'codigo', label: 'descripcion' }
                    ],
                    callback_f: _Aceptartipocopago_41
                },
                    _EvaluarCON820_41);
            } else {
                _Aceptarespec_41();
            }
            break;
        default:
            _Datocopago_41();
            break;
    }
    if ($('#fcopago_SAL41').length < 1) {
        $('#VALOR_SAL41').append(
            '<div class="salto-linea"></div>' +
            '<div class="col-md-3 col-sm-3 col-xs-3">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-6 col-sm-6 col-xs-6">Forma de copago</label>' +
            '<div class="input-group col-md-6 col-sm-6 col-xs-6">' +
            '<input id="fcopago_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" disabled="disabled">' +
            '</div>' +
            '</div>' +
            '</div>'
        )
        $('#fcopago_SAL41').val(data.codigo + ' - ' + data.descripcion);
    } else {
        $('#fcopago_SAL41').val(data.codigo + ' - ' + data.descripcion);
    }
}

function _EvaluarCON820_41(data) {
    switch (data.codigo) {
        case '1':
        case '2':
        case '3':
            _Aceptarespec_41();
            break;
        default:
            _Aceptartipocopago_41();
            break;
    }
    if ($('#tcopago_SAL41').length < 1) {
        $('#DETALLECITA').append(
            '<div class="col-md-3 col-sm-8 col-xs-8">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-6 col-sm-6 col-xs-6">Tipo Copago</label>' +
            '<div class="input-group col-md-6 col-sm-6 col-xs-6">' +
            '<input id="tcopago_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">' +
            '</div>' +
            '</div>' +
            '</div>'
        )
        data.codigo = '1' ? SAL41.FPAGOFACT = '1' : SAL41.FPAGOFACT = SAL41.FPAGOFACT;
        data.codigo = '2' ? SAL41.FPAGOFACT = '95' : SAL41.FPAGOFACT = SAL41.FPAGOFACT;
        data.codigo = '3' ? SAL41.FPAGOFACT = '96' : SAL41.FPAGOFACT = SAL41.FPAGOFACT;
        $('#tcopago_SAL41').val(SAL41.FPAGOFACT + ' - ' + data.descripcion);
    } else {
        data.codigo = '1' ? SAL41.FPAGOFACT = '1' : SAL41.FPAGOFACT = SAL41.FPAGOFACT;
        data.codigo = '2' ? SAL41.FPAGOFACT = '95' : SAL41.FPAGOFACT = SAL41.FPAGOFACT;
        data.codigo = '3' ? SAL41.FPAGOFACT = '96' : SAL41.FPAGOFACT = SAL41.FPAGOFACT;
        $('#tcopago_SAL41').val(SAL41.FPAGOFACT + ' - ' + data.descripcion);
    }
}

function _Aceptarespec_41() {
    if ((($_PREFIJOFACT == 'C') || ($_PREFIJOFACT == 'E')) && ($_ESPECLAB.trim() == '')) {
        $_ESPECLAB = '385';
    }
    // AGREGAR QUE SEA EL PRIMER ARTFACT
    if ((SAL41.NITUSU == '0800162035') && ($_CLFACT == '7') && ($_CODTAR == 'PE') && (($_ARTFACT == '903841') || ($_ARTFACT == '903815') || ($_ARTFACT == '903816') || ($_ARTFACT == '903818'))) {
        CON851('3S', '3S', null, 'warning', 'Advertencia!');
    }
    if ((SAL41.NITUSU == '0800162035') && ($_CLFACT == '7') && ($_CODTAR == 'PE') && ($_ARTFACT == '903841')) {
        CON851('3S', '3S', null, 'warning', 'Advertencia!');
    }
    if (($_ESPECLAB.trim() == '') && ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0900019291') || (SAL41.NITUSU == '0900193162'))) {
        $_ESPECLAB = '602';
    }
    if ((SAL41.NITUSU == '0845000038') && ($_TIPODRFACT == '1') && ($_COPAGOESTIMFACT > $_VALORBRUTO)) {
        CON851('11', '11', null, 'error', 'Error');
        _Aceptarcodigo_41();
    }
    else {
        _Evaluarespeclab_41();
    }
}

function _Evaluarespeclab_41() {
    validarInputs({
        form: '#ESPEC_41',
        orden: '1'
    },
        function () {
            if ($('#TABLA_401 tbody tr').length > 0) {
                SAL41.CONTEO = SAL41.CONTEO - 1;
                $('#TABLA_401 tbody tr').eq($('#TABLA_401 tbody tr').length - 1).remove()
                _Evaluarcodservicio2_41();
            } else {
                _Evaluarcodservicio2_41();
            }
        },
        _Leerespec_41
    )
}

function _Leerespec_41() {
    $_ESPECLAB = $('#espec_SAL41').val();
    let datos_envio = datosEnvio()
        + '|' + $_ESPECLAB.padStart(3, '0');
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_08, get_url('APP/SALUD/SAL41-08.DLL'));
}

function _dataSAL41_08(data) {
    console.debug(data, 'SAL41-08');
    var date = data.split('|');
    // var swinvalid = '00';
    $_NOMBREESP = date[1].trim();
    $_INICESP = $_NOMBREESP.substring(0, 1);
    $_COSTOESP = date[2].trim();
    $('#despec_SAL41').val($_NOMBREESP);

    if (date[0].trim() == '00') {
        if ($_INICESP == '*') {
            $('#despec_SAL41').val('ESPECIALIDAD DESCTIVADA');
            CON851('13', '13', null, 'error', 'Error');
            _Evaluarespeclab_41();
        }
        else if (SAL41.NITUSU == '0800037021') {
            if (($_COSTOESP == '2D') || ($_COSTOESP == '26') || ($_COSTOESP == '27') || ($_COSTOESP == '28') || ($_COSTOESP == '2H') || ($_COSTOESP == '2Q') || ($_COSTOESP == '2W') || ($_COSTOESP == '2g')) {
                $_OPCION1 = ' ';
            }
            else {
                switch ($_UNSERVW) {
                    case '01':
                        $_COSTO1ESP = 'B';
                        break;
                    case '02':
                        $_COSTO1ESP = '1';
                        break;
                    case '03':
                        $_COSTO1ESP = 'A';
                        break;
                    case '04':
                        $_COSTO1ESP = 'C';
                        break;
                }
            }
            _Leerespec2_41();
        }
        else {
            if (SAL41.NITUSU == '0845000038') {
                if (($_COSTOESP == '2a') || ($_COSTOESP == '2e') || ($_COSTOESP == '2C') || ($_COSTOESP == '2J') || ($_COSTOESP == '2w') || ($_COSTOESP == '2b') || ($_COSTOESP == '3Q') || ($_COSTOESP == '3s') || ($_COSTOESP == '3g') || ($_COSTOESP == '3h') || ($_COSTOESP == '3m') || ($_COSTOESP == '4n')) {
                    $_OPCION1 = ' '
                }
                else {
                    switch ($_UNSERVW) {
                        case '01':
                            $_COSTOESP = 'B'
                            break;
                        case '02':
                            $_COSTOESP = 'H'
                            break;
                        case '03':
                            $_COSTOESP = 'A'
                            break;
                        case '04':
                            $_COSTOESP = 'C'
                            break;
                        case '05':
                            $_COSTOESP = 'B'
                            break;
                        case '06':
                            $_COSTOESP = '3'
                            break;
                        case '08':
                            $_COSTOESP = 'Y'
                            break;
                        default:
                            break;
                    }
                }
                _Leerespec2_41();
            }
            else {
                _Leerespec2_41();
            }
        }
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#espec_SAL41').val('');
        _Evaluarespeclab_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Leerespec2_41() {
    if ((SAL41.NITUSU == '0800037021') && ($_CLFACT == '4') && ($_GRUPOFACT == 'S3')) {
        $_COSTOESP = '41'
    }
    // if (($_CLFACT == '1') && ($_MEDCIRFACT > 0) && ($_MEDCIRFACT =! SAL41.NITUSU)){
    //     SE PUEDE IMPLEMENTAR EN SAL41-07 Y SAL41-08
    // }
    // if (parseInt($_CLFACT) > 0){
    //  LINEA 6509
    // }
    _Aceptarcosto();
}

function _Aceptarcosto() {
    // if (parseInt($_CLFACT) > 0){
    // }
    if (($_CCOSTOSERV == '  ') || ($_CCOSTOSERV == '00')) {
        if ($_COSTOESP.trim() == '') {
            if (SAL41.NITUSU == '0900030814') {
                $_SWINVALID = '0'
            }
            else {
                $_COSTOFACT = '00'
            }
            _Datocccosto_41();
        }
        else {
            $_COSTOFACT = $_COSTOESP;
            if (SAL41.NITUSU == '0891855847') {
                switch ($_UNSERVFACT) {
                    case '01':
                        $_COSTOFACT = $_COSTOESP;
                        if (($_ESPECLAB == '382') || ($_ESPECLAB == '385')) {
                            $_COSTOFACT = 'CA';
                        }
                        else {
                            $_COSTO1FACT = 'C';
                        }
                        $('#ccostos_SAL41').val($_COSTOFACT);
                        _Leercosto_41();
                        break;
                    case '02':
                        $_COSTOFACT = $_COSTOESP;
                        $('#ccostos_SAL41').val($_COSTOFACT);
                        _Leercosto_41();
                        break;
                    case '03':
                        $_COSTOFACT = $_COSTOESP;
                        if (($_ESPECLAB == '382') || ($_ESPECLAB == '385')) {
                            $_COSTOFACT = 'EA';
                        }
                        else {
                            $_COSTO1FACT = 'E';
                        }
                        $('#ccostos_SAL41').val($_COSTOFACT);
                        _Leercosto_41();
                        break;
                    case '04':
                        $_COSTOFACT = $_COSTOESP;
                        if (($_ESPECLAB == '382') || ($_ESPECLAB == '385') || ($_ESPECLAB == '530')) {
                            _Datocccosto_41();
                        }
                        else {
                            $_COSTO1FACT = 'D';
                            $('#ccostos_SAL41').val($_COSTOFACT);
                            _Leercosto_41();
                        }
                        break;
                    default:
                        _Datocccosto_41();
                        break;
                }
            }
            else {
                $('#ccostos_SAL41').val($_COSTOFACT);
                _Leercosto_41();
            }
        }
    }
    else {
        $_COSTOFACT = $_CCOSTOSERV;
        if ((SAL41.NITUSU == '0900004059') || (SAL41.NITUSU == '0900541158')) {
            if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) {
                $_COSTOFACT = ' ';
                _Datocccosto_41();
            }
            else {
                _Datocccosto_41();
            }
        }
        else {
            $('#ccostos_SAL41').val($_COSTOFACT);
            _Leercosto_41();
        }
    }
}
function _Datocccosto_41() {
    if ((SAL41.NITUSU == '0900541158') || (SAL41.NITUSU == '0900566047') || (SAL41.NITUSU == '0900565371') || (SAL41.NITUSU == '0901120152')) {
        $_COSTOFACT = $_CCOSTONUM;
    }
    _Evaluarcostofact_41();
}

function _Evaluarcostofact_41() {
    validarInputs({
        form: '#CCOSTOS_41',
        orden: '1'
    },
        function () { _Evaluarespeclab_41() },
        _Leercosto_41
    )
}

function _Leercosto_41() {
    $_COSTOFACT = $('#ccostos_SAL41').val();
    console.debug($_COSTOFACT);
    let datos_envio = datosEnvio()
        + '|' + $_COSTOFACT.padStart(4, '0');
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_09, get_url('APP/SALUD/SAL41-09.DLL'));

}
function _dataSAL41_09(data) {
    console.debug(data, 'SAL41-09');
    var date = data.split('|');
    $_NOMBRECOSTO = date[1].trim();
    if (date[0].trim() == '00') {
        $('#dccostos_SAL41').val($_NOMBRECOSTO);
        if ((SAL41.NITUSU == '0844003225') && ($_COSTOFACT == '00')) {
            CON851('03', '03', null, 'error', 'Error');
            $('#ccostos_41').val('');
            _Evaluarcostofact_41();
        }
        else if (((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) && ($_COSTOFACT == 'HX')) {
            _Ventanacama_41();
        }
        else {
            _Detalle_41();
        }
    }
    else if (date[0].trim() == '01') {
        CON851('02', '02', null, 'error', 'Error');
        $('#ccostos_SAL41').val('');
        _Datocccosto_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Ventanacama_41() {
    fuente = '<div class="col-md-12" id="CAMARXFACT_41"> ' +
        '<input id="camarxfact_SAL41" class="form-control input-md" data-orden="1" maxlength="15"> ' +
        '</div>';
    _ventana({
        source: fuente,
        title: 'CAMA DEL PACIENTE',
        size: 'small',
        espace: false,
        focus: '#camarxfact_SAL41',
        form: '#CAMARXFACT_41',
        order: '1',
        global1: '$_CAMARXFACT',
        inputglobal1: '#camarxfact_SAL41',
    }, _Datocama_41, _Datocccosto_41);
}
function _Datocama_41() {
    setTimeout(_Detalle_41, 200);
}
function _Detalle_41() {
    var fuente = '<div class="col-md-12" id="DETALLE_41"> ' +
        '<input id="detallefactura_SAL41" class="form-control input-md" data-orden="1" maxlength="40"> ' +
        '</div>';
    var ventanadetallefactura = bootbox.dialog({
        size: 'medium',
        title: 'DETALLE FACTURA',
        closeButton: false,
        message: '<div class="row" style="display:float!important">' +
            '<div class="col-md-12 col-sm-12 col-xs-12">' +
            fuente +
            '</div>' +
            '</div>',
        buttons: {
            aceptar: {
                label: 'Aceptar',
                callback: function () {
                    ventanadetallefactura.off('shown.bs.modal');
                    _Datodiagnosticos_41();
                },
                className: 'btn-primary'
            },
            cancelar: {
                label: 'Cancelar',
                callback: function () {
                    ventanadetallefactura.off('shown.bs.modal');
                    _Aceptarespec_41();
                },
                className: 'btn-danger'
            }
        },

    });
    ventanadetallefactura.init($('.modal-footer').hide());
    ventanadetallefactura.on('shown.bs.modal', function () {
        $('#detallefactura_SAL41').focus();
    });
    _Evaluardetalle_41();
}

function _Evaluardetalle_41() {
    $_DETALLEFACT.length > 1 ? $('#detallefactura_SAL41').val($_DETALLEFACT) : $('#detallefactura_SAL41').val('');
    validarInputs({
        form: '#DETALLE_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validardetalle_41
    );
}

function _Validardetalle_41() {
    $_DETALLEFACT = $('#detallefactura_SAL41').val();
    if (SAL41.NITUSU == '0800251482') {
        $('.modal-body .row').append('<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">Detalle</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="DETALLE2_41">' +
            '<input id="detalle2_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="5" data-orden="1">' +
            '</div>' +
            '</div>' +
            '</div>');
        _Evaluardetalle2_41();
    }
    else {
        _Aceptarautorizacion_41();
    }
}

function _Evaluardetalle2_41() {
    validarInputs({
        form: 'DETALLE_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        function () {
            $_DETALLE2W = $('#detalle2_SAL41').val();
            SAL41.RECIBIDORX = $_DETALLE2W;
            if (SAL41.NITUSU == '0800162035') {
                _Aceptarautorizacion_41();
            }
            else {
                if (parseInt($_NROCAPITNUM) > 0) {
                    $_NROAUTORELAB = '  ';
                    if ((SAL41.NITUSU == '0830512772') || (SAL41.NITUSU == '0844002258') || (SAL41.NITUSU == '0900565371') || (SAL41.NITUSU == '0900471031') || (SAL41.NITUSU == '0901120152')) {
                        _Aceptarautorizacion_41();
                    }
                    else {
                        _Datopaqintegral_41();
                    }
                }
                else {
                    _Aceptarautorizacion_41();
                }
            }
        }
    );
}

function _Aceptarautorizacion_41() {
    $('.modal-body .row').append('<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">AUTORIZACION EPS</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="AUTORIZACION_41">' +
        '<input id="autorizacion_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '</div>');
    _Evaluarautorizacion_41();
}

function _Evaluarautorizacion_41() {
    $_NROAUTORELAB.length > 1 ? $('#autorizacion_SAL41').val($_NROAUTORELAB) : $('#autorizacion_SAL41').val('');
    validarInputs({
        form: '#AUTORIZACION_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Aceptarautorizacion2_41
    );
}

function _Aceptarautorizacion2_41() {
    console.debug('aceptarautorizacion 2');
    $_NROAUTORELAB = $('#autorizacion_SAL41').val();
    if ((SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0900005594') || (SAL41.NITUSU == '019233740')) {
        _Aceptarautorizacion3_41();
    }
    else {
        if (($_NROAUTORELAB.trim() == '') && (parseInt($_NITFACT) > 9999) && ($_UNSERW == '02')) {
            CON851('02', '02', null, 'error', 'Error');
            if (($_CLFACT == '5') && (($_ACTTER == '55') || ($_ACTTER == '21') || ($_ACTTER == '22') || ($_ACTTER == '23'))) {
                _Detalle_41();
            }
            else {
                _Aceptarautorizacion3_41();
            }
        }
        else {
            _Aceptarautorizacion3_41();
        }
    }
}
function _Aceptarautorizacion3_41() {
    console.debug('aceptarautorizacion3')
    if (($_NROAUTORELAB.trim() == '') && ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0900193162'))) {
        CON851('02', '02', null, 'error', 'Error');
        _Detalle_41();
    }
    else if (SAL41.NITUSU == '0900405505') {
        $_NROAUTOREDIT = $_NROAUTORINUM
        if ($_NROAUTOREDIT.trim() == '') {
            $('.btn-primary').click();
            // _Datodiagnosticos_41();
        }
        else {
            if (($_PREFAUTORELAB == '.') || ($_PREFAUTORELAB == '*') || ($_PREFAUTORELAB == '!') || ($_PREFAUTORELAB == ' ') || ($_PREFAUTORELAB == '$') || ($_PREFAUTORELAB == '%') || ($_PREFAUTORELAB == '&') || ($_PREFAUTORELAB == '/') || ($_PREFAUTORELAB == '(') || ($_PREFAUTORELAB == ')') || ($_PREFAUTORELAB == '=') || ($_PREFAUTORELAB == 'A') || ($_PREFAUTORELAB == 'B') || ($_PREFAUTORELAB == 'C') || ($_PREFAUTORELAB == 'D') || ($_PREFAUTORELAB == 'E') || ($_PREFAUTORELAB == 'F') || ($_PREFAUTORELAB == 'G') || ($_PREFAUTORELAB == 'H') || ($_PREFAUTORELAB == 'I') || ($_PREFAUTORELAB == 'J') || ($_PREFAUTORELAB == 'K') || ($_PREFAUTORELAB == 'L') || ($_PREFAUTORELAB == 'M') || ($_PREFAUTORELAB == 'N') || ($_PREFAUTORELAB == 'O') || ($_PREFAUTORELAB == 'P') || ($_PREFAUTORELAB == 'Q') || ($_PREFAUTORELAB == 'R') || ($_PREFAUTORELAB == 'S') || ($_PREFAUTORELAB == 'T') || ($_PREFAUTORELAB == 'W') || ($_PREFAUTORELAB == 'X') || ($_PREFAUTORELAB == 'Y') || ($_PREFAUTORELAB == 'Z') || ($_PREFAUTORELAB == 'a') || ($_PREFAUTORELAB == 'b') || ($_PREFAUTORELAB == 'c') || ($_PREFAUTORELAB == 'd') || ($_PREFAUTORELAB == 'e') || ($_PREFAUTORELAB == 'f') || ($_PREFAUTORELAB == 'g') || ($_PREFAUTORELAB == 'h') || ($_PREFAUTORELAB == 'i') || ($_PREFAUTORELAB == 'j') || ($_PREFAUTORELAB == 'k') || ($_PREFAUTORELAB == 'l') || ($_PREFAUTORELAB == 'm') || ($_PREFAUTORELAB == 'n') || ($_PREFAUTORELAB == 'o') || ($_PREFAUTORELAB == 'p') || ($_PREFAUTORELAB == 'q') || ($_PREFAUTORELAB == 'r') || ($_PREFAUTORELAB == 's') || ($_PREFAUTORELAB == 't') || ($_PREFAUTORELAB == 'w') || ($_PREFAUTORELAB == 'x') || ($_PREFAUTORELAB == 'y') || ($_PREFAUTORELAB == 'z')) {
                CON851('02', '02', null, 'error', 'Error');
                _Detalle_41();
            }
            else {
                if ($_EPSPACI == 'EPS037') {
                    $_NROAUTOREDIT3 = $_NROAUTORELAB;
                    // HACER CON MAS TIEMPO EVALUAR-AUTORIZACION
                    if ($_SWCAMPERR > 0) {
                        CON851('02', '02', null, 'error', 'Error');
                        _Detalle_41();
                    }
                    else {
                        $('.btn-primary').click();
                        // _Datodiagnosticos_41();
                    }
                }
                $_NROAUTOREDIT2 = $_NROAUTORELAB;
                if ($_NROAUTOREDIT2 < $_NROAUTOREDIT) {
                    CON851('02', '02', null, 'error', 'Error');
                    _Detalle_41();
                }
                else {
                    $('.btn-primary').click();
                    // _Datodiagnosticos_41();
                }
            }
        }

    }
    else {
        $('.btn-primary').click();
        // _Datodiagnosticos_41();
    }
}

function _Datodiagnosticos_41() {
    console.debug('datodiagnostico');
    setTimeout(_Ventanadiagnostico_41, 200);
}

function _Ventanadiagnostico_41() {
    if ((SAL41.NITUSU == '0830512772') || (SAL41.NITUSU == '0900264583')) {
        var fuente = '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">DIAG 1:</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="DIAG1_41">' +
            '<input id="diag1_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">' +
            '</div>' +
            '</div>' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">DIAG 2:</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="DIAG2_41">' +
            '<input id="diag2_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">' +
            '</div>' +
            '</div>' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">DIAG 3:</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="DIAG3_41">' +
            '<input id="diag3_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">' +
            '</div>' +
            '</div>';
        var ventanadetalle = bootbox.dialog({
            size: 'medium',
            title: 'DIAGNOSTICOS',
            closeButton: false,
            message: '<div class="row" style="display:float!important">' +
                fuente +
                '</div>',
            buttons: {
                aceptar: {
                    label: 'Aceptar',
                    callback: function () {
                        ventanadetalle.off('shown.bs.modal');
                        _Datodiagnosticos_41()
                    },
                    className: 'btn-primary'
                },
                cancelar: {
                    label: 'Cancelar',
                    callback: function () {
                        ventanadetalle.off('shown.bs.modal');
                        _Aceptarespec_41();
                    },
                    className: 'btn-danger'
                }
            },

        });
        ventanadetalle.init($('.modal-footer').hide());
        ventanadetalle.init(_inputControl('disabled'));
        ventanadetalle.on('shown.bs.modal', function () {
            $('#diag1_SAL41').focus();
        });
        _Evaluardiag1_41();
    }
    else {
        _Datopaqintegral_41();
    }
}
function _Evaluardiag1_41() {
    validarInputs({
        form: '#DIAG1_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validardiag1_41
    );
}
function _Validardiag1_41() {
    $_DIAG1 = $('#diag1_SAL41').val();
    $_DIAG1 = $_DIAG1.padStart(3, '0');
    $_DIAG1 = '2' + $_DIAG1;
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_DIAG1
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_101, get_url('APP/SALUD/SAL41-10.DLL'));
}

function _dataSAL41_101(data) {
    console.debug(data);
    var date = data.split('|');
    $_NOMBREDIAG1 = date[1].trim();
    if (date[0].trim() == '00') {
        _Evaluardiag2_41();
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#diag1_SAL41').val('');
        _Evaluardiag1_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _Evaluardiag2_41() {
    validarInputs({
        form: '#DIAG2_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validardiag2_41
    );
}
function _Validardiag2_41() {
    $_DIAG2 = $('#diag2_SAL41').val();
    $_DIAG2 = $_DIAG2.padStart(3, '0');
    $_DIAG2 = '2' + $_DIAG2;
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_DIAG2
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_102, get_url('APP/SALUD/SAL41-10.DLL'));
}

function _dataSAL41_102(data) {
    console.debug(data);
    $_NOMBREDIAG2 = date[1].trim();
    var date = data.split('|');
    if (date[0].trim() == '00') {
        _Evaluardiag3_41();
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#diag2_SAL41').val('');
        _Evaluardiag2_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _Evaluardiag3_41() {
    validarInputs({
        form: '#DIAG3_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validardiag3_41
    );
}
function _Validardiag3_41() {
    $_DIAG3 = $('#diag3_SAL41').val();
    $_DIAG3 = $_DIAG3.padStart(3, '0');
    $_DIAG3 = '2' + $_DIAG3;
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_DIAG3
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_103, get_url('APP/SALUD/SAL41-10.DLL'));
}

function _dataSAL41_103(data) {
    console.debug(data);
    $_NOMBREDIAG3 = date[1].trim();
    var date = data.split('|');
    if (date[0].trim() == '00') {
        _Datopaqintegral_41();
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#diag2_SAL41').val('');
        _Evaluardiag3_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _Datopaqintegral_41() {
    $_PRIMERARTFACT = $('#TABLA_401 tbody tr')[0].textContent;
    $_PRIMERARTFACT = $_PRIMERARTFACT.substring(0, 6);
    // $_LLAVETAB1 = $_CODTABW + $_TIPOTABW + $_PRIMERARTFACT.padEnd(10, ' ');
    if (($_CLFACT == '4') && (($_PRIMERARTFACT == 'XXDIFT') || ($_PRIMERARTFACT == 'XXDTOPA'))) {
        $('.modal-body .row').append('<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">CUP CIRUGIA PAQ.</label>' +
            '<div class="input-group col-md-2 col-sm-3 col-xs-3" id="CUPCIRUGIA_41">' +
            '<input id="cupcirugia_SAL41" clasSs="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
            '</div>' +
            '<button type="button" id="cupcirugiaBtn_41" class="btn btn-default col-md-1 col-sm-1 col-xs-1"> <i class="icon-magnifier"></i></button>' +
            '<div class="input-group col-md-5 col-sm-4 col-xs-4">' +
            '<input id="dcupcirugia_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12">' +
            '</div>' +
            '</div>' +
            '</div>');
        _Evaluarcupcirugia_41();
    }
    else {
        _Cerrarventanadetalle_41();
    }
}
function _Evaluarcupcirugia_41() {
    validarInputs({
        form: '#CUPCIRUGIA_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validarcupcirugia
    );
}
function _Validarcupcirugia() {
    SAL41.CUPPAQINTFACT = $('#cupcirugia_SAL41').val();
    if (SAL41.CUPPAQINTFACT.trim() == '') {
        // CONTINUE
    }
    else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += SAL41.CUPPAQINTFACT.padEnd(13, ' ');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_072, get_url("APP/SALUD/SAL41-07.DLL"));
    }
}

function _dataSAL41_072(data) {
    console.debug(data);
    var date = data.split('|');
    if (date[0].trim() == '00') {
        $('#dcupcirugia_SAL41').val(date[2].trim());
        _Cerrarventanadetalle_41();
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#cupcirugia_SAL41').val('');
        _Evaluarcupcirugia_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }
}

function _Cerrarventanadetalle_41() {
    if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) {
        $_PASOW = '0'
        if ($_NITFACT == '0860011153') {
            var causasestado = '[{"codigo": "1","descripcion": "ACCIDENTE DE TRABAJO"},{"codigo": "2", "descripcion": "ACCIDENTE DE TRANSITO"},{"codigo": "3", "descripcion": "ACCIDENTE RABICO"},{"codigo": "4", "descripcion": "ACCIDENTE OFIDICO"},{"codigo": "5", "descripcion": "OTRO TIPO DE ACCIDENTE"},{"codigo": "6", "descripcion": "EVENTO CATASTROFICO"},{"codigo": "7", "descripcion": "LESION POR AGRESION"},{"codigo": "8", "descripcion": "LESION AUTOINFLINGIDA"},{"codigo": "9", "descripcion": "SOSP.MALTRATO FISICO"},{"codigo": "A", "descripcion": "SOSP.ABUSO SEXUAL"},{"codigo": "B", "descripcion": "SOSP.MALTRATO EMOCIONAL"},{"codigo": "C", "descripcion": "ENFERMEDAD GENERAL"},{"codigo": "D", "descripcion": "ENFERMEDAD PROFESIONAL"},{"codigo": "E", "descripcion": "NO APLICA"}]';
            var causaestado = JSON.parse(causasestado);
            POPUP({
                array: causaestado,
                titulo: "Causa del Evento",
                indices: [
                    { id: 'codigo', label: 'descripcion' }
                ],
                callback_f: _Cerrarventanadetalle_41
            },
                _evaluarSER828_41);
        }
        else {
            _Datodiagntipo_41();
        }
    }
    else {
        _Fechaestancia_41();
    }
}

function _Datodiagntipo_41() {
    if ($('#diagtipo_SAL41').length > 0) {
        validarInputs({
            form: '#DIAGTIPO_41',
            orden: '1'
        },
            function () { _Evaluarcodservicio2_41() },
            _Validartipodiagntipo_SAL41
        );
    } else {
        $('#DIVFACTURA').append(
            // '<div class="salto-linea"></div>' +
            '<div class="col-md-6 col-sm-6 col-xs-6">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-12">Codigo Diag:</label>' +
            '<div class="input-group col-md-4 col-sm-4 col-xs-12" id="DIAGTIPO_41">' +
            '<input id="diagtipo_SAL41" maxlength="4" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
            '</div>' +
            '<div class="input-group col-md-4 col-sm-4 col-xs-12">' +
            '<input id="diagtipod_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12">' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        _inputControl('disabled');
        validarInputs({
            form: '#DIAGTIPO_41',
            orden: '1'
        },
            function () { _Evaluarcodservicio2_41() },
            _Validartipodiagntipo_SAL41
        );
    }
}
function _Validartipodiagntipo_SAL41() {
    $_DIAG = $('#diagtipo_SAL41').val();
    $_DIAG = $_DIAG.padStart(4, '0');
    let datos_envio = datosEnvio()
    datos_envio += SAL41.ADMINW + '|' + '2' + $_DIAG;
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_104, get_url('APP/SALUD/SAL41-10.DLL'));
}

function _dataSAL41_104(data) {
    console.debug(data, 'SAL41-10');
    data = data.split('|');
    if (data[0].trim() == '00') {
        $('#diagtipod_SAL41').val(data[1]);
        _Evaluarmedotrfact_41();
    } else if (data[0].trim() == '01') {
        CON851(data[0], data[0], null, 'error', 'Error');
        _Datodiagntipo_41();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}


function _evaluarSER828_41(data) {
    $_CAUSAESTAD = data.id;
    switch (data.id) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'E':
        case 'G':
            _Datoacctransito_41();
            break;
    }
}

function _Datoacctransito_41() {
    var fuente = '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">Fecha del evento</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="FECHAE_41">' +
        '<input id="fechaevento_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">Diagnostico</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="FECHAE_41">' +
        '<input id="diagnostico_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="2">' +
        '</div>' +
        '</div>' +
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">Nit empresa</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="NITE_41">' +
        '<input id="fechaegreso_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">Nit empresa</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="NITE_41">' +
        '<input id="fechaegreso_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="2">' +
        '</div>' +
        '</div>';

    var ventanaevento = bootbox.dialog({
        size: 'medium',
        title: 'DATOS ACCIDENTE DE TRANSITO',
        closeButton: false,
        message: '<div class="row" style="display:float!important">' +
            fuente +
            '</div>',
        buttons: {
            aceptar: {
                label: 'Aceptar',
                callback: _Datommedico_41,
                className: 'btn-primary'
            },
            cancelar: {
                label: 'Cancelar',
                callback: _Detalle_41,
                className: 'btn-danger'
            }
        },

    });
    ventanaevento.init($('.modal-footer').hide());
    ventanaevento.init(_inputControl('disabled'));
    ventanaevento.on('shown.bs.modal', function () {
        $('#fechaingreso_SAL41').focus();
    });
    _EvaluarDatoacctransito_41();
}

function _EvaluarDatoacctransito_41() {
    validarInputs({
        form: '#FECHAE_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validardatoacctransito_41
    );
}

function _Validardatoacctransito_41() {
    $_FECHAACCIDRIPS = $('#fechaevento_SAL41').val();
    $_CODDIAGESTAD = $('#diagnostico_SAL41').val();
}



function _Fechaestancia_41() {
    $_GRUPOFACT1 = $('#TABLA_401 tbody tr')[0].textContent;
    $_GRUPOFACT1 = $_PRIMERARTFACT.substring(1, 3);
    if ((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900541158') || (SAL41.NITUSU == '0900566047') || (SAL41.NITUSU == '0900658867') || (SAL41.NITUSU == '0900565371') || (SAL41.NITUSU == '0901120152')) {
        _Datommedico_41();
    }
    if (($_GRUPOFACT1 == 'S1') || ($_GRUPOFACT1 == 'F5') || ($_GRUPOFACT1 == 'F8')) {
        _Fechaestancia2_41();
    }
    else {
        _Datommedico_41();
    }
}
function _Fechaestancia2_41() {
    var fuente = '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">FECHA DE INGRESO</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="FECHA_41">' +
        '<input id="fechaingreso_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">FECHA DE EGRESO</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="FECHA_41">' +
        '<input id="fechaegreso_SAL41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="2">' +
        '</div>' +
        '</div>';
    var ventanafechaingreso = bootbox.dialog({
        size: 'medium',
        title: 'FECHA DE ESTANCIA',
        closeButton: false,
        message: '<div class="row" style="display:float!important">' +
            fuente +
            '</div>',
        buttons: {
            aceptar: {
                label: 'Aceptar',
                callback: function () {
                    ventanafechaingreso.off('shown.bs.modal');
                    _Datommedico_41();
                },
                className: 'btn-primary'
            },
            cancelar: {
                label: 'Cancelar',
                callback: function () {
                    ventanafechaingreso.off('shown.bs.modal');
                    setTimeout(_Detalle_41, 300);
                },
                className: 'btn-danger'
            }
        },

    });
    ventanafechaingreso.init($('.modal-footer').hide());
    ventanafechaingreso.init(_inputControl('disabled'));
    ventanafechaingreso.on('shown.bs.modal', function () {
        $('#fechaingreso_SAL41').focus();
    });
    _Evaluarfecha2_41();
}
function _Evaluarfecha2_41() {
    validarInputs({
        form: '#FECHA_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validarfecha_41
    );
}
function _Validarfecha_41() {
    $_FECHAINGESTAD = $('#fechaingreso_SAL41').val();
    $_FECHASALESTAD = $('#fechaegreso_SAL41').val();
    $_FECHAINGESTAD = moment($_FECHAINGESTAD).format('YYYYMMDD');
    $_FECHASALESTAD = moment($_FECHASALESTAD).format('YYYYMMDD');
    if (($_FECHASALESTAD = $_FECHAINGESTADO) && (SAL41.HORAATENESTAD > $_HORASALIDESTAD)) {
        CON851('37', '37', null, 'error', 'Error');
        _Evaluarfecha2_41();
    }
    else {
        _Datommedico_41();
    }
}
function _Datommedico_41() {
    if (($_CLFACT == '0') || ($_CLFACT == '1')) {
        $_MEDOTRFACT = ' ';
        $('#atend_SAL41').val($_MEDOTRFACT);
        _Validarmedotrfact_41();
    }
    else {
        $_MEDCIRFACT = ' ';
        $_MEDAYUFACT = ' ';
        $_MEDANEFACT = ' ';
        $_MEDINSFACT = ' ';
        _Datommedico2_41();
    }
    $_TERCTL = '2';
}

function _Datommedico2_41() {
    // if (($_UNSERVW == '01') && ($_CLFACT == '5') && ($_IDTRIA.trim() =! '') && ($_FOLIONROCONSULTRIA > 0)){

    // }
    _Evaluarmedotrfact_41();
}

function _Evaluarmedotrfact_41() {
    validarInputs({
        form: '#ATEND_41',
        orden: '1'
    },
        function () {
            if ($('.btn-danger').length > 0) {
                $('.btn-danger').click();
            } else {
                setTimeout(_Detalle_41, 300);
            }
        },
        _Validarmedotrfact_41
    );
}
function _Validarmedotrfact_41() {
    $_MEDOTRFACT = $('#atend_SAL41').val();
    if ((parseInt($_MEDOTRFACT) == 0) && (parseInt($_CLFACT) > 1)) {
        CON851('02', '02', null, 'error', 'Error');
        $('#atend_SAL41').val('')
        _Evaluarmedotrfact_41();
    }
    else if (parseInt($_MEDOTRFACT) == 0) {
        $_DESCRIPPROF = '  ';
        $_CLPROF1 = $_CLPROF2 = 'S';
        $_ESPPROF01 = ' ';
        $_ESTADOPROF = '1';
        $_ATIENDEW = '0';
    }
    else {
        // if ($_MEDOTRFACT == '17329215') {
        //     console.debug('borrar esta linea cuando se arreglen los cambios del fd de profesionales')
        //     $('#datend_SAL41').val('BOHORQUEZ GABRIEL');
        //     $_CLPROF = ['S', 'S', 'S', 'S', 'S', 'S', 'S'];
        //     $_ESPPROF = ['', '', '', '', '', '', '', '', '', ''];
        //     $_DIVPROF = '';
        //     $_ATIENDEPROF = 'N';
        //     _Validarmedotrfact3_41();
        // } else {
        let datos_envio = datosEnvio()
        datos_envio += SAL41.ADMINW + '|' + $_MEDOTRFACT.padStart(10, '0');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_11, get_url('APP/SALUD/SAL41-11.DLL'))
        // }
    }
}
function _dataSAL41_11(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPPROF = date[1].trim();
    $_ESTADOPROF = date[2].trim();
    $_CLPROF = [date[3].trim(), date[4].trim(), date[5].trim(), date[6].trim(), date[7].trim(), date[8].trim(), date[9].trim()];
    $_ESPPROF = [date[10].trim(), date[11].trim(), date[12].trim(), date[13].trim(), date[14].trim(), date[15].trim(), date[16].trim(), date[17].trim(), date[18].trim(), date[19].trim()]
    $_DIVPROF = date[20].trim();
    $_ATIENDEPROF = date[21].trim();
    $_ATIENDEW = $_PERSONALELAB = $_ATIENDEPROF;
    $_REGMEDPROF = date[22].trim();
    if (date[0].trim() == '00') {
        _Validarmedotrfact2_41();
    }
    else if (date[0].trim() == '01') {
        $_CLPROF = $_TABLACLPROF = 'N';
        $_ESTADOPROF = '2';
        _Validarmedotrfact2_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Validarmedotrfact2_41() {
    $('#datend_SAL41').val($_DESCRIPPROF);
    if ($_ESTADOPROF == '2') {
        CON851('13', '13', null, 'error', 'Error');
        $('#datend_SAL41').val('PROFESIONAL DESACTIVADO');
        $('atend_SAL41').val('')
        _Evaluarmedotrfact_41();
    }
    else {
        _Validarmedotrfact3_41();
    }
}
function _Validarmedotrfact3_41() {
    $_GRUPOFACT1 = $('#TABLA_401 tbody tr')[0].textContent;
    $_GRUPOFACT1 = $_PRIMERARTFACT.substring(1, 3);
    switch ($_CLFACT) {
        case '0':
            $_J = 0
            break;
        case '1':
            $_J = 1
            break;
        case '2':
            $_J = 2
            break;
        case '3':
            $_J = 3
            break;
        case '4':
            $_J = 4
            break;
        case '5':
            $_J = 5
            break;
        case '6':
            $_J = 1
            break;
        case '7':
            $_J = 6
            break;
    }
    console.debug($_J, $_CLPROF[$_J], $_CLPROF);
    if ($_CLPROF[parseInt($_J)] == 'N') {
        CON851('82', '82', null, 'error', 'Error');
        $('atend_SAL41').val('')
        _Evaluarmedotrfact_41();
    } else if (($_ESPPROF[1].trim() == '') || ($_GRUPOFACT1 == '87') || ($_GRUPOFACT1 == '88') || ($_GRUPOFACT1 == '90') || ($_GRUPOFACT1 == '95')) {
        _Validarmedotrfact4_41();
    } else {
        if (($_ESPECLAB == $_ESPPROF[0]) || ($_ESPECLAB == $_ESPPROF[1]) || ($_ESPECLAB == $_ESPPROF[2]) || ($_ESPECLAB == $_ESPPROF[3]) || ($_ESPECLAB == $_ESPPROF[4])) {
            _Validarmedotrfact4_41();
        } else {
            console.debug('sino de evaluar med otr');
            if ((SAL41.NITUSU == '0830092718') && ($_SUCW == 'SC')) {
                $_SWINVALID = '0';
                _Validarmedotrfact4_41();
            } else {
                CON851('82', '82', null, 'error', 'Error');
                if ((SAL41.NITUSU == '0892000401') && ($_ESPPROF[1] == '999')) {
                    _Validarmedotrfact4_41();
                } else {
                    $('atend_SAL41').val('')
                    _Evaluarmedotrfact_41();
                }
            }
        }
    }
}

function _Validarmedotrfact4_41() {
    if ($_DIVPROF == '') {
        _Validarmedotrfact5_41();
    }
    else {
        _Validarmedotrfact5_41();
        // FUNCIONALIDAD PENDIENTE
    }
}

function _Validarmedotrfact5_41() {
    $_HORACITFACT.length > 1 ? $_HORACITFACT = $_HORACITFACT : $_HORACITFACT = '0000';
    if (($_CLFACT == '1') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) {
        if ($_CLFACT == '1') {
            $_MEDCITW = $_MEDCIRFACT;
        }
        else {
            $_MEDCITW = $_MEDOTRFACT;
        }
        $_EVALUACIONCITW = 0;
        // SER891A_41();
    }
    if (($_CLFACT == '3') || ($_CLFACT == '5') || ($_CLFACT == '7')) {
        // console.debug('HABLAR CON DIANA PARA VER COPMO SE LEEN LOS ARCHIVOS DE LAS CITAS');
        // SER891AD_41();
    }
    if (($_HORACITFACT > 0) && (($_PREFIJOFACT = ! 'E') && ($_PREFIJOFACT = ! 'C'))) {
        if ((($_CLFACT == '1') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) && ($_EVALUACIONCITW == '1')) {
            if ($_LLAVENUM == $_FACTCAPITNUM) {
                _Evaluarremite_41();
            }
            else {
                if ((SAL41.NITUSU == '0900565371') || (SAL41.NITUSU == '0900081643') || (SAL41.NITUSU == '0901120152')) {
                    _Evaluarremite_41();
                }
                else {
                    CON851('7S', '7S', null, 'error', 'Error');
                    $('atend_SAL41').val('')
                    _Evaluarmedotrfact_41();
                }
            }
        }
    }
    else {
        if ((($_CLFACT == '1') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) && ($_EVALUACIONCITW == '1')) {
            // CON851P
            console.debug('CON851P');
        }
        else {
            _Evaluarremite_41();
        }
    }
}

function _Evaluarremite_41() {
    validarInputs(
        {
            form: '#SOLIC_41',
            orden: '1'
        },
        function () { _Evaluarmedotrfact_41() },
        _Validarremite_41
    )
}

function _Validarremite_41() {
    $_REMITEFACT = $('#solic_SAL41').val();
    if (parseInt($_REMITEFACT) == 0) {
        if (((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0900193162')) && ($_PREFIJOUSU = ! 'SB')) {
            $_DESCRIPTER = '  ';
        } else {
            if (($_CLFACT == '0') || ($_CLFACT == '2') || ($_CLFACT == '3')) {
                CON851('02', '02', null, 'error', 'Error');
                $('#solic_SAL41').val('');
                _Evaluarremite_41();
            }
            else {
                $_DESCRIPTER = '  ';
            }
        }
    } else {
        // if ($_MEDOTRFACT == '17329215') {
        //     console.debug('borrar esta linea cuando se arreglen los cambios del fd de profesionales')
        //     $('#dsolic_SAL41').val('BOHORQUEZ GABRIEL');
        //     _Claseproced_41();
        // } else {
        let datos_envio = datosEnvio();
        datos_envio += SAL41.ADMINW + '|' + $_REMITEFACT.padStart(10, '0');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_043, get_url('APP/SALUD/SAL41-04.DLL'));
        // }
    }
}

function _dataSAL41_043(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPTER = date[1].trim();
    $_ACTTER = date[2].trim();
    $_ENTIDADTER = date[3].trim();
    if (date[0].trim() == '00') {
        $('#dsolic_SAL41').val($_DESCRIPTER);
        if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) {
            _Claseproced_41();
        } else {
            let datos_envio = datosEnvio();
            datos_envio += SAL41.ADMINW + '|' + $_REMITEFACT.padStart(10, '0');
            SolicitarDll({ datosh: datos_envio }, _dataSAL41_112, get_url('APP/SALUD/SAL41-11.DLL'));
        }
    } else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#solic_SAL41').val('');
        _Evaluarremite_41();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _dataSAL41_112(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPPROF2 = date[1].trim();
    $_REGMEDPROF = date[22].trim();
    if (date[0].trim() == '00') {
        _Claseproced_41();
    } else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error'); $('#solic_SAL41').val('');
        _Evaluarremite_41();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _Claseproced_41() {
    if (($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'T')) {
        SAL41.CLASEPROCESTADO = '2';
    } else {
        if ($_PUERTAESTAD == '1') {
            SAL41.CLASEPROCESTADO = '3';
        } else {
            SAL41.CLASEPROCESTADO = '1';
        }
    }
    _Mostrarproced_41();
}
function _Mostrarproced_41() {
    switch (SAL41.CLASEPROCESTADO) {
        case '0':
            break;
        case '1':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">ATENCION AMBULATOR</label>' +
                '</div>' +
                '</div>');
            break;
        case '2':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">ATENCION HOSPITAL</label>' +
                '</div>' +
                '</div>');
            break;
        case '3':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">EN URGENCIA</label>' +
                '</div>' +
                '</div>');
            break;
    }
    if ($_CLFACT == '0') {
        $_DIAGNCUP1 = 'N';
        SAL41.TIPOPROCESTAD = '0';
        _Controlcapitacion_41();
    } else if (((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0900193162')) && ($_PREFIJOUSU == 'SB')) {
        _Datoespecremite_41();
    } else {
        _Datocondicion_41();
    }
}

function _Datoespecremite_41() {
    if ($('#diagtipo_SAL41').length > 0) {
        validarInputs({
            form: '#DIAGTIPO_41',
            orden: '1'
        },
            function () { _Tipoproced_41() },
            _Validarespecremite_SAL41
        );
    } else {
        $('#DIVFACTURA').append(
            '<div class="col-md-6 col-sm-6 col-xs-6">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-12">Codigo Diag:</label>' +
            '<div class="input-group col-md-4 col-sm-4 col-xs-12" id="ESPECREMITE_41">' +
            '<input id="especremite_SAL41" maxlength="3" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
            '</div>' +
            '<div class="input-group col-md-4 col-sm-4 col-xs-12">' +
            '<input id="especremited_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12">' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        _inputControl('disabled');
        validarInputs({
            form: '#ESPECREMITE_41',
            orden: '1'
        },
            function () { _Tipoproced_41() },
            _Validarespecremite_SAL41
        );
    }
}

function _Validarespecremite_SAL41() {
    $_ESPECREMIFACT = $('#especremite_SAL41').val();
    let datos_envio = datosEnvio()
    datos_envio += SAL41.ADMIN + '|' + $_ESPECREMIFACT.padStart(3, '0');
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_081, get_url('APP/SALUD/SAL41-08.DLL'));
}

function _dataSAL41_081(data) {
    console.debug(data, 'SAL41-08 2');
    data = data.split('|');
    if (data[0].trim() == '00') {
        $('#especremited_SAL41').val(data[1]);
        _Aceptarpersonal_41();
    } else if (data[0].trim() == '01') {
        $('#especremited_SAL41').val('');
        CON851(data[0], data[0], null, 'error', 'Error');
        _Datoespecremite_41();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Datocondicion_41() {
    if (($_SEXOPACI == 'M') || ($_CLFACT == '0')) {
        $_EMBARESTAD = '0';
        _Leercondic_41();
    } else {
        if ((($_UNIDEDADELAB == 'D') || ($_UNIDEDADELAB == 'M')) || (($_UNIDEDADELAB == 'A') && (parseInt($_VLREDADELAB) < 10))) {
            $_EMBARESTAD = '4'
            _Leercondic_41();
        }
        else {
            var estadosusuaria = '[{"codigo": "1", "descripcion": "EMBARAZO PRIMER TRIMESTRE"},{"codigo": "2","descripcion": "EMBARAZO SEGUNDO TRIMESTRE"},{"codigo": "3","descripcion": "EMBARAZO TERCER TRIMESTRE"},{"codigo": "4","descripcion": "NO ESTA EMBARAZADA"},{"codigo": "8","descripcion": "NO APLICA"},]'
            var estadousuaria = JSON.parse(estadosusuaria);
            var titulo = 'Condicion usuaria';
            POPUP({
                array: estadousuaria,
                titulo: titulo,
                indices: [
                    { id: 'codigo', label: 'descripcion' }
                ],
                callback_f: _Datocondicion_41
            },
                _evaluarSER826_41);
        }
    }
}

function _evaluarSER826_41(data) {
    $_EMBARESTAD = data.id;
    _Leercondic_41();
}

function _Leercondic_41() {
    switch ($_EMBARESTAD) {
        case '0':
            if ($('#embarestado_SAL41').length > 0) {
                $('#embarestado_SAL41').html(
                    '<label class="col-md-12 col-sm-12 col-xs-12" id="embarestado_SAL41">NO APLICA ESTADO</label>'
                )
            } else {
                $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                    '<div class="inline-inputs">' +
                    '<label class="col-md-12 col-sm-12 col-xs-12" id="embarestado_SAL41">NO APLICA ESTADO</label>' +
                    '</div>' +
                    '</div>');
            }
            _Leercondic2_41()
            break;
        case '1':
            if ($('#embarestado_SAL41').length > 0) {
                $('#embarestado_SAL41').html(
                    '<label class="col-md-12 col-sm-12 col-xs-12" id="embarestado_SAL41">1ER TRIM. EMBARAZO</label>'
                )
            } else {
                $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                    '<div class="inline-inputs">' +
                    '<label class="col-md-12 col-sm-12 col-xs-12" id="embarestado_SAL41">1ER TRIM. EMBARAZO</label>' +
                    '</div>' +
                    '</div>');
            }
            _Leercondic2_41()
            break;
        case '2':
            if ($('#embarestado_SAL41').length > 0) {
                $('#embarestado_SAL41').html(
                    '<label class="col-md-12 col-sm-12 col-xs-12" id="embarestado_SAL41">2DO TRIM. EMBARAZO</label>'
                )
            } else {
                $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                    '<div class="inline-inputs">' +
                    '<label class="col-md-12 col-sm-12 col-xs-12" id="embarestado_SAL41">2DO TRIM. EMBARAZO</label>' +
                    '</div>' +
                    '</div>');
            }
            _Leercondic2_41()
            break;
        case '3':
            if ($('#embarestado_SAL41').length > 0) {
                $('#embarestado_SAL41').html(
                    '<label class="col-md-12 col-sm-12 col-xs-12" id="embarestado_SAL41">3ER TRIM. EMBARAZO</label>'
                )
            } else {
                $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                    '<div class="inline-inputs">' +
                    '<label class="col-md-12 col-sm-12 col-xs-12" id="embarestado_SAL41">3ER TRIM. EMBARAZO</label>' +
                    '</div>' +
                    '</div>');
            }
            _Leercondic2_41()
            break;
        case '4':
            if ($('#embarestado_SAL41').length > 0) {
                $('#embarestado_SAL41').html(
                    '<label class="col-md-12 col-sm-12 col-xs-12" id="embarestado_SAL41">NO ESTA EMBARAZADA</label>'
                )
                _Leercondic2_41()
            } else {
                $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                    '<div class="inline-inputs">' +
                    '<label class="col-md-12 col-sm-12 col-xs-12" id="embarestado_SAL41">NO ESTA EMBARAZADA</label>' +
                    '</div>' +
                    '</div>');
                _Leercondic2_41()
            }
            break;
        case '8':
            _Detalle_41();
            break;
    }
}
function _Leercondic2_41() {
    if ($_CLFACT == '7') {
        _Tipoproced_41();
    } else {
        if ($_DIAGNCUP1 == 'S') {
            console.debug('diagnostico cup S');
            SAL41.TIPOPROCESTAD = '0';
            $_FINALIDESTAD = '' ? $_FINALIDESTAD = ' ' : $_FINALIDESTAD = $_FINALIDESTAD;
            _Controlcapitacion_41();
        } else {
            _Tipoproced_41();
        }
    }
}

function _Tipoproced_41() {
    // if (parseInt($_TIPOPROCESTAD) == 0) {
    //     switch ($_CLFACT) {
    //         case '2':
    //             $_TIPOPROCESTAD = '1'
    //             break;
    //         case '3':
    //             $_TIPOPROCESTAD = '1'
    //             break;
    //         case '4':
    //             $_TIPOPROCESTAD = '2'
    //             break;
    //         case '6':
    //             $_TIPOPROCESTAD = '1'
    //             break;
    //         case '7':
    //             $_TIPOPROCESTAD = '4'
    //             break;
    //     }
    // }
    var tiposprocedimientos = '[{"codigo": "1", "descripcion": "DIAGNOSTICO"},{"codigo": "2","descripcion": "TERAPEUTICO"},{"codigo": "3","descripcion": "PROTEC.ESPEXIFICA"},{"codigo": "4","descripcion": "DETECCION TEMPRANA ENF.GENER"},{"codigo": "9","descripcion": "NO APLICA"}]'
    var tipoprocedimiento = JSON.parse(tiposprocedimientos);
    var titulo = 'Tipo procedimiento';
    POPUP({
        array: tipoprocedimiento,
        titulo: titulo,
        indices: [
            { label: 'descripcion' }
        ],
        callback_f: _Evaluarremite_41
    },
        _evaluarSER829_41);
}

function _evaluarSER829_41(data) {
    SAL41.TIPOPROCESTAD = data.codigo;
    console.debug(data.codigo, data)
    console.debug(SAL41.TIPOPROCCUP.length, SAL41.TIPOPROCCUP.trim());
    if ((SAL41.TIPOPROCCUP.trim() == '') || (SAL41.TIPOPROCCUP == '0') || (SAL41.TIPOPROCCUP == ' ')) {
        _Tipoproced2_41();
    } else {
        if (SAL41.TIPOPROCCUP != SAL41.TIPOPROCESTAD) {
            CON851('3D', '3D', null, 'error', 'Error');
            setTimeout(_Tipoproced_41, 200);
        } else {
            _Tipoproced2_41();
        }
    }
}
function _Tipoproced2_41() {
    switch (SAL41.TIPOPROCESTAD) {
        case '1':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">DIAGNOSTICO</label>' +
                '</div>' +
                '</div>');
            _Aceptarpersonal_41();
            break;
        case '2':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">TERAPEUTICO</label>' +
                '</div>' +
                '</div>');
            _Aceptarpersonal_41();
            break;
        case '3':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">PROTEC. ESPECIFICA</label>' +
                '</div>' +
                '</div>');
            _Aceptarpersonal_41();
            break;
        case '4':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">PROTEC.ESPECIFICA</label>' +
                '</div>' +
                '</div>');
            _Aceptarpersonal_41();
            break;
        case '9':
            _Detalle_41();
            break;
        default:
            _Detalle_41();
            break;
    }
}
function _Aceptarpersonal_41() {
    if (($_CLFACT == '2') || ($_CLFACT == '3')) {
        $_PERSONALELAB = '9';
        _Leerpersonal_41();
    } else {
        if ($_ATIENDEW = '0') {
            SER830()
        } else {
            $_PERSONALELAB = $_ATIENDEW;
            switch ($_ATIENDEW) {
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case 'A':
                case 'B':
                case 'H':
                case 'I':
                case 'O':
                case 'T':
                    console.debug($_ATIENDEW);
                    _Leerpersonal_41();
                    $_PERSONALELAB = data.codigo;
                    break;
            }
        }
    }
}
function SER830() {
    console.debug('ser830');
    var todopersonalatiende = '[{"codigo": "1", "descripcion": "MEDICO ESPECIALISTA"},{"codigo": "2","descripcion": "MEDICO GENERAL"},{"codigo": "3","descripcion": "ENFERMERO(A) JEFE"},{"codigo": "4","descripcion": "AUXILIAR ENFERMERIA"},{"codigo": "5","descripcion": "TERAPEUTA Y OTROS"},{"codigo": "6","descripcion": "ENFERMERA JEFE P Y P"},{"codigo": "7","descripcion": "PSICOLOGA"},{"codigo": "8","descripcion": "NUTRICIONISTA"},{"codigo": "9","descripcion": "NO APLICA"},{"codigo": "A","descripcion": "ODONTOLOGO"},{"codigo": "B","descripcion": "AUDITOR MEDICO"},{"codigo": "H","descripcion": "HIGIENE ORAL"},{"codigo": "I","descripcion": "INTRUMENTADOR(A)"},{"codigo": "O","descripcion": "OPTOMETRA"},{"codigo": "T","descripcion": "TRABAJADOR SOCIAL"}]'
    var personalatiende = JSON.parse(todopersonalatiende);
    var titulo = 'Personal que atiende';
    POPUP({
        array: personalatiende,
        titulo: titulo,
        indices: [
            { id: 'codigo', label: 'descripcion' }
        ],
        callback_f: SER830
    },
        _evaluarSER830_41);
}
function _evaluarSER830_41(data) {
    console.debug(data);
    switch (data.codigo) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case 'A':
        case 'B':
        case 'H':
        case 'I':
        case 'O':
        case 'T':
            console.debug(data.codigo);
            _Leerpersonal_41();
            $_PERSONALELAB = data.codigo;
            break;
    }
}
function _Leerpersonal_41() {
    if (($_ATIENDEESPCUP1.trim() == '') || ($_ATIENDEESPCUP1 == '9')) {
        _Datofinalidconsulta_41();
    } else {
        if ($_PERSONALELAB != $_ATIENDEESPCUP1) {
            CON851('3E', '3E', null, 'error', 'Error');
            setTimeout(_Detalle_41, 200);
        } else {
            _Datofinalidconsulta_41();
        }
    }
}

function _Datofinalidconsulta_41() {
    console.debug('datofonalidadconsulta')
    if ($_CLFACT == '7') {
        _Datofinalidconsulta2_41();
    } else {
        $_FINALIDESTAD = '10';
        _Controlcapitacion_41();
    }
}

function _Datofinalidconsulta2_41() {
    if ((SAL41.NITUSU == '0800162035') && ($_FINALANTW.trim() = ! '')) {
        $_FINALIDESTAD = $_FINALANTW;
    }
    _SER834A();
}

function _SER834A() {
    var personalatiende = '';
    var i;
    var l;
    if (SAL41.NITUSU == '0844003225') {
        if (($_SEXOPACI == 'F') && ($_UNIDEDADELAB == 'A') && (($_VLREDADELAB > 9) && ($_VLREDADELAB < 51))) {
            i++;
            personalatiende += '{"codigo": "' + i + '", "descripcion": "ATENCION PARTO puerperio"}';
        }
        if ($_UNIDEDADELAB == 'D') {
            i++;
            personalatiende += '{"codigo": "' + i + '", "descripcion": "ATENCION RECIEN NACIDO"}';
        }
        if (($_UNIDEDADELAB == 'A') && (($_VLREDADELAB > 9) && ($_VLREDADELAB < 61))) {
            i++;
            personalatiende += '{"codigo": "' + i + '", "descripcion": "ATENCION PLANIF.FAMILIAR"}';
        }
        if ((($_UNIDEDADELAB == 'D') || ($_UNIDEDADELAB == 'M')) || (($_UNIDEDADELAB > 'A') && ($_VLREDADELAB < 10))) {
            i++;
            personalatiende += '{"codigo": "' + i + '", "descripcion": "ATENCION PLANIF.FAMILIAR"}';
        }
        if (($_UNIDEDADELAB == 'A') && (($_VLREDADELAB > 9) && ($_VLREDADELAB < 30))) {
            i++;
            personalatiende += '{"codigo": "' + i + '", "descripcion": "DET.ALT.DESA.JOVEN"}';
        }
        if (($_SEXOPACI == 'F') && ($_UNIDEDADELAB == 'A') && (($_VLREDADELAB > 9) && ($_VLREDADELAB < 51))) {
            i++;
            personalatiende += '{"codigo": "' + i + '", "descripcion": "DETECCION ALTER. EMBARAZO"}';
        }
        if (($_UNIDEDADELAB == 'A') && ($_VLREDADELAB > 29)) {
            i++;
            personalatiende += '{"codigo": "' + i + '", "descripcion": "DET.ALT.ADULTO"}';
        }
        i++
        personalatiende += '{"codigo": "' + i + '", "descripcion" : "DETECCION ALTER. AGUD VIS"}';
        if (($_UNIDEDADELAB == 'A') && ($_VLREDADELAB > 17)) {
            i++;
            personalatiende += '{"codigo": "' + i + '", "descripcion": "DET.ALT.ADULTO"}';
        }
        i++;
        if (i == 10) {
            l = 'A';
        }
        personalatiende += '{"codigo": "' + l + '", "descripcion":"NO APLICA"}';
        i++;
        if (i == 11) {
            l = 'B'
        }
        personalatiende += '{"codigo": "' + l + '", "descripcion":"PATOLOGIA CRONICA"}';
    }
    if (($_SEXOPACI == 'F') && ($_UNIDEDADELAB == 'A') && (($_VLREDADELAB > 9) && ($_VLREDADELAB < 51))) {
        i++;
        personalatiende += '{"codigo": "' + i + '", "descripcion": "ATENCION PARTO puerperio"}';
    }
    if ($_UNIDEDADELAB == 'D') {
        i++;
        personalatiende += '{"codigo": "' + i + '", "descripcion": "ATENCION RECIEN NACIDO"}';
    }
    if (($_UNIDEDADELAB == 'A') && (($_VLREDADELAB > 9) && ($_VLREDADELAB < 61))) {
        i++;
        personalatiende += '{"codigo": "' + i + '", "descripcion": "ATENCION PLANIF.FAMILIAR"}';
    }
    if ((($_UNIDEDADELAB == 'D') || ($_UNIDEDADELAB == 'M')) || (($_UNIDEDADELAB > 'A') && ($_VLREDADELAB < 12))) {
        i++;
        if ((($_UNIDEDADELAB == 'D') || ($_UNIDEDADELAB == 'M')) || (($_UNIDEDADELAB > 'A') && ($_VLREDADELAB < 6))) {
            personalatiende += '{"codigo": "' + i + '", "descripcion": "PRIMERA INFANCIA"}';
        }
        else {
            personalatiende += '{"codigo": "' + i + '", "descripcion": "INFANCIA"}';
        }
    }
    if (($_UNIDEDADELAB == 'A') && (($_VLREDADELAB > 11) && ($_VLREDADELAB < 29))) {
        i++;
        if (($_VLREDADELAB > 11) && ($_VLREDADELAB < 18)) {
            personalatiende += '{"codigo": "' + i + '", "descripcion": "ADOLESCENCIA"}';
        }
        else {
            personalatiende += '{"codigo": "' + i + '", "descripcion": "JUVENTUD"}';
        }
    }
    if (($_SEXOPACI == 'F') && ($_UNIDEDADELAB == 'A') && (($_VLREDADELAB > 9) && ($_VLREDADELAB < 51))) {
        i++;
        personalatiende += '{"codigo": "' + i + '", "descripcion": "DETECCION ALTER. EMBARAZO"}';
    }
    if (($_UNIDEDADELAB == 'A')) {
        if (($_VLREDADELAB > 28) && ($_VLREDADELAB < 60)) {
            i++;
            personalatiende += '{"codigo": "' + i + '", "descripcion": "ADULTEZ"}';
        }
        if ($_VLREDADELAB > 60) {
            i++;
            personalatiende += '{"codigo": "' + i + '", "descripcion": "VEJEZ"}';
        }
    }
    i++;
    personalatiende += '{"codigo": "' + i + '", "descripcion":"DETECCION ALTER. AGUD VIS"}';
    if (($_UNIDEDADELAB == 'A') && ($_VLREDADELAB > 17)) {
        i++;
        personalatiende += '{"codigo": "' + i + '", "descripcion": "DET.ALT.ADULTO"}';
    }
    i++;
    if (i == 10) {
        l = 'A';
    }
    personalatiende += '{"codigo": "' + l + '", "descripcion":"NO APLICA"}';
    i++;
    if (i == 11) {
        l = 'B'
    }
    personalatiende += '{"codigo": "' + l + '", "descripcion":"PATOLOGIA CRONICA"}';
    console.debug(personalatiende);
    personalatiende = JSON.parse(personalatiende);
    POPUP({
        array: personalatiende,
        titulo: 'Finalidad de la consulta',
        indices: [
            { id: 'codigo', label: 'descripcion' }
        ],
        callback_f: _SER834A
    },
        _evaluarSER834A_41);
}
function _evaluarSER834A_41(data) {
    switch (data.id) {
        case 1:
            $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                '</div>' +
                '</div>');
            _Datofinalidconsulta3_41();
            break;
        case 2:
            $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                '</div>' +
                '</div>');
            _Datofinalidconsulta3_41();
            break;
        case 3:
            $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                '</div>' +
                '</div>');
            _Datofinalidconsulta3_41();
            break;
        case 4:
            $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                '</div>' +
                '</div>');
            _Datofinalidconsulta3_41();
            break;
        case 5:
            $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                '</div>' +
                '</div>');
            _Datofinalidconsulta3_41();
            break;
        case 6:
            $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                '</div>' +
                '</div>');
            break;
        case 7:
            $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                '</div>' +
                '</div>');
            _Datofinalidconsulta3_41();
            break;
        case 8:
            $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                '</div>' +
                '</div>');
            _Datofinalidconsulta3_41();
            break;
        case 9:
            $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                '</div>' +
                '</div>');
            _Datofinalidconsulta3_41();
            break;
        case 'A':
            $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                '</div>' +
                '</div>');
            _Datofinalidconsulta3_41();
            break;
        case 'B':
            $('#ULTIMOSDATOS').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">' + data.descripcion + '</label>' +
                '</div>' +
                '</div>');
            _Datofinalidconsulta3_41();
            break;
        default:
            setTimeout(_Datofinalidconsulta_41, 200);
            break;
    }
}

function _Datofinalidconsulta3_41() {
    if ((SAL41.NITUSU == '0900306771') && ($_GRUPOFACT1 == '89')) {
        if ($_FINALIDCIT == $_FINALIDESTAD) {
            _Datofinalidconsulta4_41();
        }
        else {
            CON851('4K', '4K', null, 'warning', 'Advertencia!');
        }
    }
}
function _Datofinalidadconsulta4_41() {
    if ($_FINALIDESTAD == '10') {
        if ((SAL41.NITUSU == '0845000038') && (SAL41.NITUSU == '0900405505')) {
            CON851('4K', '4K', null, 'warning', 'Advertencia!');
        }
    }
    if (($_FINALIDCUP.trim() == '') || ($_FINALIDCUP == '0') || ($_FINALIDCUP == '10')) {
        _Datocronico_41();
    }
    else {
        if ($_FINALIDCUP != $_FINALIDESTAD) {
            CON851('3D', '3D', null, 'error', 'Error');
            setTimeout(_Datofinalidconsulta_41, 200);
        }
        else {
            _Datocronico_41();
        }
    }
}

function _Datocronico_41() {
    if ($_FINALIDESTAD == '11') {
        $('#elementos-tabla').append(
            '<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12" id="CRONICO_41">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-6 col-sm-8 col-xs-12">Patol. cronica</label>' +
            '<div class="input-group col-md-6 col-sm-4 col-xs-12">' +
            '<input id="cronico_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
            '</div>' +
            '</div>' +
            '</div>');
        validarInputs({
            form: '#CRONICO_41',
            orden: '1'
        },
            function () { _Datofinalidconsulta_41() },
            _Datocronico2_41
        )
    }
    else {
        SAL41.CRONICOFACT = ' '
        $('#elementos-tabla').append(
            '<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12" id="CRONICO_41">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-6 col-sm-8 col-xs-12">Patol. cronica</label>' +
            '<div class="input-group col-md-6 col-sm-4 col-xs-12">' +
            '<input id="cronico_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
            '</div>' +
            '</div>' +
            '</div>');
        $('#cronico_SAL41').val(SAL41.CRONICOFACT);
        _Datocronico2_41();
    }
}

function _Datocronico2_41() {
    SAL41.CRONICOFACT = $('#cronico_SAL41').val();
    if (SAL41.CRONICOFACT.trim() == '') {
        $_DESCRIPCRONIC = ' ';
        _Controlcapitacion_41();
    }
    else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += SAL41.CRONICOFACT.padStart(3, '0');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_12, get_url('APP/SALUD/SAL41-12.DLL'));
    }
}

function _dataSAL41_12(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPCRONIC = date[1].trim();
    if (date[0].trim() == '00') {
        $('#dcronico_SAL41').val($_DESCRIPCRONIC);
        _Controlcapitacion_41();
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#cronico_SAL41').val('');
        validarInputs({
            form: '#CRONICO_41',
            orden: '1'
        },
            function () { _Datofinalidconsulta_41() },
            _Datocronico2_41
        );
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }

}

function _Controlcapitacion_41() {
    console.debug('controlcapacitacion');
    if ((SAL41.NITUSU == '0891855847') && ($_CLFACT == '0')) {
        _Controlcapitacion2_41();
    } else {
        $_CONTROLCAPESTAD = ' ';
        _Confirmargrabar_41();
    }
}
function _Controlcapitacion2_41() {
    validarInputs({
        form: '#CAP_41',
        orden: '1'
    },
        function () { _Datofinalidconsulta_41() },
        _Validarcapitacion_41
    )
}
function _Validarcapitacion_41() {
    $_CONTROLCAPESTAD = $('#cap_SAL41').val();
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_CONTROLCAPESTAD.padStart(2, '0');
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_13, get_url('APP/SALUD/SAL41-13'));
}
function _dataSAL41_13(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPGRCAP = date[1].trim();
    $_CLASEGRCAP = [date[2].trim(), date[3].trim(), date[4].trim(), date[5].trim(), date[6].trim(), date[7].trim(), date[8].trim(), date[9].trim(), date[10].trim()]
    if (date[0].trim() == '00') {
        $('#dcap_SAL41').val($_DESCRIPGRCAP);
        if ($_CLFACT == '0') {
            $_J = 8;
        }
        else {
            $_J = parseInt($_CLFACT);
        }
        _Controlcapitacion3_41();
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#cap_SAL41').val('');
        _Controlcapitacion2_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }
}

function _Controlcapitacion3_41() {
    if ($_CLASEGRCAP[$_J] == 'N') {
        CON851('03', '04', null, 'error', 'Error');
        $('#cap_SAL41').val('');
        _Controlcapitacion2_41();
    }
    else {
        _Confirmargrabar_41();
    }
}

function _Confirmargrabar_41() {
    let fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    let nombretxt = SAL41.ADMINW + '_' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20);
    SAL41['NOMBRETXT'] = nombretxt;
    let datosEnvio = {
        nombre_archivo: nombretxt,
        tabla: $TABLAFACT,
    };
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('SALUD/paginas/_datostabla_SAL41.php')
    }).done(function (data) {
        console.debug(data);
        if (data == '00') {
            let mensaje = '01';
            console.debug(mensaje);
            CON851P(mensaje, _Cancelar_41, _Confirmargrabar2_41);
        } else {
            console.debug('problemas para crear el txt');
        }
    });
}

function _Cancelar_41() {
    setTimeout(_Detalle_41, 300);
}

function _Confirmargrabar2_41() {
    console.debug('confirmar guardar');
    if (($_GRUPOFACT1.trim() == '') || (parseInt($_GRUPOFACT1) == 0)) {
        _Evaluarcodservicio2_41();
    }
    $_HORAELABFACT = moment().format('HH:mm');
    console.debug($_HORAELABFACT);
    $_HRELABFACT = $_HORAELABFACT.substring(0, 2);
    $_MNELABFACT = $_HORAELABFACT.substring(3, 5);
    $_FECHASALESTAD = moment().format('YYYYMMDD');
    $_ANOSALESTAD = $_FECHASALESTAD.substring(0, 4);
    $_MESSALESTAD = $_FECHASALESTAD.substring(4, 6);
    $_DIASALESTAD = $_FECHASALESTAD.substring(6, 8);
    $_OPERELABFACT = $_ADMINW;
    $_FECHAELABFACT = moment().format('YYYYMMDD');
    switch ($_PREFIJOFACT) {
        case 'C':
            $_SECUNUM = '96';
            var datos_envio = datosEnvio();
            datos_envio += $_SECUNUM;
            // SolicitarDll({ datosh: datos_envio }, _dataCON007_03_41, get_url('/CONTAB/APP/CON007.DLL'))
            _infoCON007_03_SAL41();
            break;
        case 'E':
            $_SECUNUM = '89';
            var datos_envio = datosEnvio();
            datos_envio += $_SECUNUM;
            // SolicitarDll({ datosh: datos_envio }, _dataCON007_03_41, get_url('/CONTAB/APP/CON007.DLL'))
            _infoCON007_03_SAL41();
            break;
        default:
            _Leerfactura_41();
            break;
    }
}

function _infoCON007_03_SAL41() {
    let URL = get_url("APP/CONTAB/CON007.DLL");
    postData({ datosh: datosEnvio() + $_SECUNUM }, URL)
        .then(data => {
            console.debug(data);
            var data = data.split("|");
            SAL41['ULTFECHANUM3'] = data[2].trim();
            SAL41['NUMEROCTL3'] = data[1].substring(3, 9);
            SAL41['NROFACT3'] = SAL41.NUMEROCTL;
            let fecha = $_FECHAFACT.split('-');
            datos_envio = datosEnvio() + $_SECUNUM + '|' + fecha[0].substring(2, 4) + fecha[1] + fecha[2] + '|' + SAL41.NROFACT3 + '|'
            console.debug(datos_envio);
            SolicitarDll({ datosh: datos_envio }, data => {
                console.debug(data);
                data = data.split('|');
                $_NROOTROS = data[1].substring(3, 9);
                $_NROCTAFACT = $_NROOTROS;
                _Leerfactura_41();
            }, get_url('APP/CONTAB/CON007X.DLL'));
        })
        .catch(err => {
            console.debug(err);
        })
}

function _Leerfactura_41() {
    if ((SAL41.NITUSU == '0830512772') && ($_CLFACT)) {
        $_SWBUSCAR3 = 0;
        _Buscarpendiente_41();
        if ($_SWBUSCAR3 > 0) {
            SAL41.NROPENDIW = SAL41.LLAVEFACT;
            $_FECHAFACT = $_FECHAFACT.replace('-', '')
            SAL41.FECHAPENDIW = $_FECHAFACT;
            SAL41.HORAPENDIW = moment().format('LT');
            SAL41.HORAPENDIW = SAL41.HORAPENDIW.replace(':', '');
            SAL41.CANTPENDIW = $_SWBUSCAR3;
            SAL41.PENDIENTEW = 'S';
            SAL41.TIPOPENDIW = 1;
        }
        else {
            SAL41.PENDIENTEW = 'N';
        }
    }
    if (((SAL41.NITUSU == '0900541158') || (SAL41.NITUSU == '0900566047') || (SAL41.NITUSU == '0900565371') || (SAL41.NITUSU == '0901120152')) && (SAL41.FACTAUTOFACT == 2) && ($_SWAUTOPASO == 0)) {
        $_SECUNUM = '9' + $_PREFIJONUM;
        let datos_envio = datosEnvio();
        datos_envio += '|' + $_SECUNUM;
        SolicitarDll({ datosh: datos_envio }, _dataCON007_04_41, get_url('/CONTAB/APP/CON007.DLL'))
    }
    else {
        _Leerfactura2_41();
    }
}

function _dataCON007_04_41(data) {
    data = data.split('|');
    $_NROOTROS = data[3].trim();
    if (date[0].trim() == '00' || date[0].trim() == '01') {
        $_FECHAFACT = $_FECHAFACT.replace('-', '')
        let datos_envio = datosEnvio();
        datos_envio += '|';
        datos_envio += $_CTAFACT;
        datos_envio += '|';
        datos_envio += $_IDHISTORIAFACT;
        datos_envio += '|';
        datos_envio += $_FECHAFACT;
        datos_envio += '|';
        datos_envio += $_DETALLEFACT;
        datos_envio += '|';
        datos_envio += $_NROAUTORELAB;
        datos_envio += '|';
        datos_envio += $_NROOTROS;
        SolicitarDll({ datosh: datos_envio }, _dataSER108DA_41, get_url('/SALUD/APP/SER108DA.DLL'))
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _dataSER108DA_41(data) {
    data = data.split('|');
    $_LLAVEREGREW = data[1].trim();
    $_FECHACREW = data[2].trim();
    $_NROW = data[3].trim();
    let datos_envio = datosEnvio();
    datos_envio += '|' + $_SECUNUM
    datos_envio += '|' + $_NROW
    datos_envio += '|' + $_FECHACREW
    SolicitarDll({ datosh: datos_envio }, _dataCON007X_02_41, get_url('/CONTAB/APP/CON007X.DLL'));
    _Leerfactura2_41();
    // DESCARGA CONTROL-FORMULACION R4
}

function _Leerfactura2_41() {
    // INITIALIZE
    // $_NROCIRFACT = '00';
    // $_FPAGOFACT = '00';
    // $_NROFORMFACT = '0000000000000000';
    $_CAMARXFACT = '    ';
    $_CAUSAESTAD = '00';
    // $_CLASEPROCESTADO = '0';
    // $_TIPOPROCESTAD = '0';
    // $_HORAATENESTAD = '0000';
    $_HORASALIDESTAD = '0000';
    // $_ESPECREMIFACT = '   ';
    $_TIPODRFACT = '0';
    // $_CUPPAQINTFACT = '        ';
    // $_ORDSERVFACT = ' ';
    // $_RECIBIDORX = ' ';
    // $_EMPRESAPACIRIPS = '                                                  ';
    // $_CRONICOFACT = '   ';
    // $_PENDIENTEW = ' ';
    // $_NROPENDIW = '  0000000';
    // $_FECHAPENDIW = '00000000';
    // $_HORAPENDIW = '0000';
    // $_CANTPENDIW = '000';
    // $_TIPOPENDIW = '0';
    // $_FACTAUTOFACT = '0';
    $_HORAELABFACT = $_HORAELABFACT.substring(0, 2) + $_HORAELABFACT.substring(3, 5);
    $_FECHAFACT = $_FECHAFACT.split('-');
    SAL41.LLAVEFACT = $_SUCFACT + $_CLFACT + SAL41.NROFACT;
    console.debug(SAL41.LLAVEFACT)
    SAL41['HORAINGESTAD'] = $_FECHAINGESTAD.substring(11, 13) + $_FECHAINGESTAD.substring(14, 16);
    $_FECHAINGESTAD = $_FECHAINGESTAD.substring(0, 4) + $_FECHAINGESTAD.substring(5, 7) + $_FECHAINGESTAD.substring(8, 10);
    $_CTAFACT = $_PREFIJOFACT + SAL41.NROFACT.padStart(6, '0');
    let datos_envio = datosEnvio();
    datos_envio += SAL41.ADMINW;
    datos_envio += '|' + SAL41.LLAVEFACT
    datos_envio += '|' + $_FECHAFACT[0].trim() + $_FECHAFACT[1].trim() + $_FECHAFACT[2].trim();
    datos_envio += '|' + $_PREFIJOFACT + $_NROCTAFACT.padStart(6, '0')
    datos_envio += '|' + $_NITFACT
    datos_envio += '|' + $_IDHISTORIAFACT.padStart(15, '0');
    datos_envio += '|' + $_FECHAINGESTAD
    // TABLA FACT
    datos_envio += '|' + $_VALORDESFACT
    datos_envio += '|' + $_TIPOCOPAGOFACT
    datos_envio += '|' + $_COPAGOESTIMFACT
    datos_envio += '|' + $_VLRIVAFACT
    datos_envio += '|' + $_MEDCIRFACT.padStart(10, '0')
    datos_envio += '|' + $_MEDAYUFACT.padStart(10, '0')
    datos_envio += '|' + $_MEDANEFACT.padStart(10, '0')
    datos_envio += '|' + $_MEDINSFACT.padStart(10, '0')
    datos_envio += '|' + $_MEDOTRFACT.padStart(10, '0')
    datos_envio += '|' + $_VIAFACT
    datos_envio += '|' + SAL41.MULTFACT // NIT MEDICO
    datos_envio += '|' + SAL41.NROCIRFACT // NIT MEDICO
    datos_envio += '|' + $_CRUENTAFACT
    // datos_envio += '|' + $_GRUPOCIRFACT // GRUPO-CIR-FACT NO SE GUARDA
    datos_envio += '|' + $_PUERTAESTAD
    datos_envio += '|' + $_TARIFFACT
    datos_envio += '|' + $_COSTOFACT.padStart(4, '0');
    datos_envio += '|' + $_ESPECLAB
    datos_envio += '|' + $_DETALLEFACT
    datos_envio += '|' + $_CONTROLCAPESTAD
    datos_envio += '|' + $_NROAUTORELAB
    // datos_envio += '|' + $_CONTROLMESFACT // NO SE GUARDA
    datos_envio += '|' + SAL41.FPAGOFACT
    // datos_envio += '|' + $_BLOQUEOIMPFACT // NO SE GUARDA
    datos_envio += '|' + SAL41.NROFORMFACT // SER815
    datos_envio += '|' + $_CAMARXFACT
    datos_envio += '|' + $_OPERELABFACT
    datos_envio += '|' + $_FECHAELABFACT
    datos_envio += '|' + $_HORAELABFACT
    datos_envio += '|' + SAL41.HORAATENESTAD
    // datos_envio += '|' + $_OPERCORRECFACT // NO SE GUARDA
    // datos_envio += '|' + $_FECHACORRECFACT // NO SE GUARDA
    // datos_envio += '|' + $_HORACORRECFACT // NO SE GUARDA
    datos_envio += '|' + $_UNIDEDADELAB
    datos_envio += '|' + $_VLREDADELAB
    datos_envio += '|' + $_CAUSAESTAD
    datos_envio += '|' + $_EMBARESTAD
    datos_envio += '|' + $_PERSONALELAB
    datos_envio += '|' + SAL41.CLASEPROCESTADO
    datos_envio += '|' + SAL41.TIPOPROCESTAD
    // datos_envio += '|' + $_CODSERVESTAD // NO SE GUARDA
    datos_envio += '|' + $_FINALIDESTAD
    // datos_envio += '|' + $_TRIAGEESTAD // NO SE GUARDA
    // datos_envio += '|' + $_TIPDIAGESTAD // NO SE GUARDA
    // datos_envio += '|' + $_REPETIDESTAD // NO SE GUARDA
    // TABLA DIAG ESTAD
    // datos_envio += '|' + $_HOROBSERESTAD // NO SE GUARDA
    // datos_envio += '|' + $_DIASINCESTAD // NO SE GUARDA
    // datos_envio += '|' + $_TIPODISCAPELAB // NO SE GUARDA
    // datos_envio += '|' + $_GRADODISCAP // NO SE GUARDA
    // datos_envio += '|' + $_ESTADSALESTAD // NO SE GUARDA
    datos_envio += '|' + $_FECHASALESTAD
    datos_envio += '|' + $_HORASALIDESTAD
    // datos_envio += '|' + $_DIAGMUERESTAD // NO SE GUARDA
    datos_envio += '|' + $_REMITEFACT.padStart(10, '0')
    datos_envio += '|' + SAL41.ESPECREMIFACT
    datos_envio += '|' + $_UNSERVFACT
    datos_envio += '|' + $_TIPODRFACT
    // datos_envio += '|' + $_BIRADSFACT // NO SE GUARDA
    datos_envio += '|' + $_MACROFACT
    // datos_envio += '|' + $_ULTEXAMENESTAD // NO SE GUARDA
    // datos_envio += '|' + $_COMPLEJIDADFACT // NO SE GUARDA
    datos_envio += '|' + SAL41.CUPPAQINTFACT
    datos_envio += '|' + SAL41.ORDSERVFACT
    // datos_envio += '|' + $_ENTREGARXFACT // SOLO SE MUEVE 1 ARCHIVO
    datos_envio += '|' + SAL41.RECIBIDORX
    datos_envio += '|' + SAL41.CRONICOFACT
    // datos_envio += '|' + $_DESTINOREFACT // NO SE GUARDA
    // datos_envio += '|' + $_REFACTURAFACT // NO SE GUARDA
    // datos_envio += '|' + $_OPERCORRRIPS
    // datos_envio += '|' + $_FECHACORRRIPS
    // datos_envio += '|' + $_RECIBIDO2RX
    // datos_envio += '|' + $_MOTBLOQUEORX
    // datos_envio += '|' + $_SINTOMRESPIFACT
    // datos_envio += '|' + $_1RAVEZFACT
    // datos_envio += '|' + $_PLANIFICFACT
    // datos_envio += '|' + $_FECHAPARTOFURFACT
    // datos_envio += '|' + $_TALLAFACT
    // datos_envio += '|' + $_PESOFACT
    // datos_envio += '|' + $_NROCONTPREN
    datos_envio += '|' + SAL41.PENDIENTEW
    datos_envio += '|' + SAL41.NROPENDIW
    datos_envio += '|' + SAL41.FECHAPENDIW
    datos_envio += '|' + SAL41.HORAPENDIW
    datos_envio += '|' + SAL41.CANTPENDIW
    datos_envio += '|' + SAL41.TIPOPENDIW
    datos_envio += '|' + SAL41.FACTAUTOFACT
    datos_envio += '|' + SAL41.VLRIVA1FACT
    datos_envio += '|' + SAL41.VLRIVA2FACT
    datos_envio += '|' + SAL41.VLRIVA3FACT
    datos_envio += '|' + SAL41.EMPRESAPACIRIPS + '|' + SAL41.NOMBRETXT
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_15, get_url('APP/SALUD/SAL41-15.DLL'));

}
function _dataSAL41_15(data) {
    console.debug(data);
    data = data.split('|');
    SAL41.NROFACT = data[1].trim();
    $_NROW = data[2].trim();
    if (data[0].trim() == '00' || data[0].trim() == '01') {
        let datos_envio = datosEnvio();
        datos_envio += $_SECUNUM + '|' + $_FECHAFACT[0].substring(2, 4) + $_FECHAFACT[1] + $_FECHAFACT[2] + '|' + $_NROW + '|'
        console.debug(datos_envio)
        SolicitarDll({ datosh: datos_envio }, _dataCON007X_02_41, get_url('APP/CONTAB/CON007X.DLL'));
    } else {
        CON852(data[0], data[1], data[2], _toggleNav)
    }
}
function _dataCON007X_02_41(data) {
    console.debug(data);
    data = data.split('|');
    $_NROW = data[1].trim();
    $_DETALLEMOV = data[2].trim();
    if (((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0891855847') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633') || (SAL41.NITUSU == '0800037021') || (SAL41.NITUSU == '0892000458') || (SAL41.NITUSU == '0832002436') || (SAL41.NITUSU == '0844003225')) && ($_CLFACT == '0') && ($_NROPEDFACT > 0)) {
        SER815C_41(); // CONTROL DE DISPENSACION
    }
    else if (((SAL41.NITUSU == '0900541158') || (SAL41.NITUSU == '0900566047') || (SAL41.NITUSU == '0900565371') || (SAL41.NITUSU == '0901120152')) && (SAL41.FACTAUTOFACT == '2')) {
        SER108DB(); // IMPRIME FACTURAS (RESUMEN DE COMPROBANTES)
    }
    else {
        _Contabiliarcomp_41();
    }
}
function _Contabiliarcomp_41() {
    $_TIPO1COMP = '1';
    if ($_TIPO1COMP == '1') {
        if (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "T") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) {
            // INV020GA(); // ACUMULAR FACTURA PARA CARTERA
            let datos_envio = datosEnvio()
            datos_envio += SAL41.ADMINW + '|' + $_LLAVENUM + $_NROCTAFACT.padStart(6, '0') + '|' + $_FECHA_LNK + '|' + SAL41.NITUSU + '|' + $_SALMINUSU
            console.debug(datos_envio);
            SolicitarDll({ datosh: datos_envio }, _dataINV020GA_41, get_url('APP/SALUD/INV020GA.DLL'));
        }
        else if (($_PREFIJOFACT == 'E') || ($_PREFIJOFACT == 'C')) {
            let datos_envio = datosEnvio();
            datos_envio += SAL41.ADMINW + '|' + SAL41.LLAVEFACT + '|' + $_FECHA_LNK + '|' + SAL41.NITUSU + '|' + $_SALMINUSU + '|' + $_CONTADOUSU + '|' + $_PUCUSU + '|' + $_PREFIJOUSU + '|' + $_CONTABPOSUSU + '|' + $_RETCREEUSU + '|' + $_PEDIDOUSU + '|' + $_AUTORETUSU + '|' + $_RETENEDORUSU + '|' + $_NOMBREUSU.substring(0, 7) + '|' + $_SEPARACAJAUSU
            SolicitarDll({ datosh: datos_envio }, _dataINV020_41, get_url('APP/SALUD/INV020.DLL'));
        }
        else {
            _Contabiliarcomp2_41();
        }
    }
    else {
        _Contabiliarcomp2_41();
    }
}

function _dataINV020GA_41(data) {
    console.debug(data);
    data = data.split('|');
    if (data[0].trim() == '00' || data[0].trim() == '01' || data[0].trim() == '8O' || data[0].trim() == '8P' || data[0].trim() == '8Q' || data[0].trim() == '8R' || data[0].trim() == '8S') {
        if (data[0].trim() == '01' || data[0].trim() == '8O' || data[0].trim() == '8P' || data[0].trim() == '8Q' || data[0].trim() == '8R' || data[0].trim() == '8S') {
            CON851(data[0].trim(), data[0].trim(), null, 'warning', 'Advertencia!');
        }
        _Contabiliarcomp2_41();
    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _dataINV020_41(data) {
    data = data.split('|');
    if (data[0].trim() == '00') {
        _Contabiliarcomp2_41();
    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Contabiliarcomp2_41() {
    console.debug('contabiliarcomp2_41');
    if (($_FINALIDESTAD == '11') && ($_CRONICOPACI != 'S')) {
        // OPEN I-O EN ARCHIVO PACIENTES 7848
    }
    else {
        _Generarhl7_41();
    }
}

function _Generarhl7_41() {
    console.debug('generarh17_41');
    $_FECHAFACT = $_FECHAFACT[0].substring(2, 4) + $_FECHAFACT[1] + $_FECHAFACT[2];
    if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) {
        if ($_FECHAACT == $_FECHAFACT) {
            console.debug('montarhl17_41')
            _Montarhl7_41();
        } else {
            console.debug('si no de fecha fact');
            _Descargarinvent_41();
        }
    } else {
        _Descargarinvent_41();
    }
}

function _Descargarinvent_41() {
    if ((SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900193162')) {
        _Descargarinvent2_41();
    } else {
        if ((SAL41.INVENTUSU == 'S') && (($_CLFACT == '0') || ($_MACROFACT == '1'))) {
            $_SWRECAL = 0;
            let datos_envio = datosEnvio()
            datos_envio += '|' + SAL41.LLAVEFACT
            datos_envio += '|' + $_SWRECAL
            SolicitarDll({ datosh: datos_envio }, _dataINV030_41, get_url('APP/SALUD/SAL030.DLL'));
        } else {
            _Descargarinvent2_41();
        }
    }
}

function _dataINV030_41(data) {
    data = data.split('|');
    if (data.trim() == '00') {
        let datos_envio = datosEnvio()
        datos_envio += '|' + SAL41.LLAVEFACT
        datos_envio += '|' + $_SWRECAL
        SolicitarDll({ datosh: datos_envio }, _dataINV030V_41, get_url('APP/SALUD/INV030V.DLL'));
    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _dataINV030V_41(data) {
    data = data.split('|');
    if ((data[0].trim() == '00') && ($_CLFACT == '0') && ($TABLAFACT[0].ALMAFACT = ! "SIN")) {
        CON851('3M', '3M', null, 'warning', 'Advertencia!');
        if ((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) {
            _Descargarinvent2_41();
        }
        else {
            console.debug('me devuelvo a descargar invent');
            _Descargarinvent_41();
        }
    }
    else if (data[0].trim() == '01') {
        _Descargarinvent2_41();
    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Descargarinvent2_41() {
    console.debug('descargarinvent2');
    if (($_SWBONO == '1') && ($_TIPO_COMP == '1')) {
        // ESCRIBIR ARCHIVO PROMOCION 7893
    } else {
        _Imprimir_41();
    }
}

function _Imprimir_41() {
    console.debug('imprimir');
    if (parseInt(SAL41.TIPOCAJAUSU) > 1) {
        _Abrircaja_41();
    } if (($_REDEXTERNUM == 'S') || ($_FECHAFACT < $_FECHAACT)) {
        _Imprimir2_41();
    } else {
        if ($_PUERTAESTAD == '2') {
            let artfact = $TABLAFACT[0].ARTFACT;
            if ((($_CLFACT == '1') || ($_CLFACT == '5')) || (artfact.substring(0, 2) == '99') || (artfact.substring(0, 2) == '23') || (artfact.substring(0, 2) == 'F8') || (artfact.substring(0, 2) == '13') || (artfact.substring(0, 2) == '12') || (($_CLFACT == '7') && (artfact.substring(0, 2) = ! '90')) || ((SAL41.NITUSU == '0830092718') && ($_CLFACT == '3')) || ((SAL41.NITUSU == '0900193162') && ($_CLFACT == '3')) || ((SAL41.NITUSU == '0830092719') && ($_CLFACT == '3')) || ((SAL41.NITUSU == '0800037979') && ($_CLFACT == '3')) || ((SAL41.NITUSU == '0800037979') && ($_CLFACT == '4')) || ((SAL41.NITUSU == '0900405505') && ($_CLFACT == '3')) || ((SAL41.NITUSU == '0900073674') && ($_CLFACT == '3')) || ((SAL41.NITUSU == '0800175901') && ($_CLFACT == '4')) || ((SAL41.NITUSU == '0830511298') && ($_CLFACT == '4')) || ((SAL41.NITUSU == '0900004059') && (parseInt($_CLFACT) > 0)) || ((SAL41.NITUSU == '0900005594') && (parseInt($_CLFACT) > 0)) || ((SAL41.NITUSU == '0900405505') && ($_CLFACT == '3'))) {
                $_ACTCITW = 'F';
                let datos_envio = datosEnvio() + SAL41.LLAVEFACT + '|' + $_FINALIDESTAD + '|' + $_ACTCITW + '|' + $_ANOACT + '|' + SAL41.NITUSU + '|'
                console.debug(datos_envio);
                let URL = get_url("APP/SALUD/SER891.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(data => {
                        console.debug(data);
                        _Imprimir2_41();
                    })
                    .catch(err => {
                        console.debug(err);
                        console.debug('error en la actualizacion de citas');
                        _Imprimir2_41();
                    })
            } else {
                _Imprimir2_41();
            }
        } else {
            if (((SAL41.NITUSU == '0900004059') || (SAL41.NITUSU == '0830092718') || (SAL41.NITUSU == '0900193162') || (SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0830092719') || (SAL41.NITUSU == '0900405505') || (SAL41.NITUSU == '0900005594')) && (parseInt($_CLFACT) > 0)) {
                $_ACTCITW = 'F';
                let datos_envio = datosEnvio() + SAL41.LLAVEFACT + '|' + $_FINALIDESTAD + '|' + $_ACTCITW + '|' + $_ANOACT + '|' + SAL41.NITUSU + '|'
                console.debug(datos_envio);
                // SolicitarDll({ datosh: datos_envio }, _dataSER891_41, get_url("APP/SALUD/SER891.DLL"));
                let URL = get_url("APP/SALUD/SER891.DLL");
                postData({ datosh: datos_envio }, URL)
                    .then(data => {
                        console.debug(data);
                        _Imprimir2_41();
                    })
                    .catch(err => {
                        console.debug(err);
                    })
            } else {
                _Imprimir2_41();
            }
        }
    }
}

function _Imprimir2_41() {
    console.debug('imprimir 2');
    if ((SAL41.NITUSU == '0845000038') && ($_PUERTAESTAD == '8') && (parseInt($_CLFACT) > 0)) {
        $_ACTCITW = 'F';
        let datos_envio = datosEnvio() + SAL41.LLAVEFACT + '|' + $_FINALIDESTAD + '|' + $_ACTCITW + '|' + $_ANOACT + '|' + SAL41.NITUSU + '|'
        let URL = get_url("APP/SALUD/SER891.DLL");
        postData({ datosh: datos_envio }, URL)
            .then(data => {
                console.debug(data);
                _Imprimir3_41();
            })
            .catch(err => {
                console.debug(err);
            })
    } else {
        _Imprimir3_41();
    }
}

function _Imprimir3_41() {
    console.debug('imprimir 3')
    let artfact = $TABLAFACT[0].ARTFACT;
    if ((($_CLFACT == '1') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) || (($_CLFACT == '0') && (artfact.substring(0, 2) == 'MO'))) {
        if ((($_ESPECLAB == '250') || ($_ESPECLAB == '460') || ($_ESPECLAB == '461') || ($_ESPECLAB == '462') || ($_ESPECLAB == '463') || ($_ESPECLAB == '464') || ($_ESPECLAB == '510') || ($_ESPECLAB == '220')) || ((parseInt(artfact) == 890203) || (parseInt(artfact) == 890303) || (parseInt(artfact) == 890304) || (parseInt(artfact) == 890403) || (parseInt(artfact) == 890404) || (parseInt(artfact) == 890703) || (parseInt(artfact) == 890704))) {
            let datos_envio = datosEnvio()
            datos_envio += SAL41.LLAVEFACT
            SolicitarDll({ datosh: datos_envio }, data => { console.debug(data) }, get_url("APP/SALUD/SER448O.DLL")); // FALTA FD-HISOD17 FD-ODEVO17
        }
        else {
            if ((SAL41.NITUSU == '0800162035') && ((parseInt(artfact) == 990113) || (artfact == 'A10502'))) {
                _Imprimir4_41();
            }
            else {
                let datos_envio = datosEnvio()
                datos_envio += SAL41.LLAVEFACT
                SolicitarDll({ datosh: datos_envio }, data => { console.debug(data) }, get_url("APP/SALUD/SER448C.DLL")); // FALTA
            }
        }
        _Releerrips_41(); // Pendiente
        _Imprimir4_41();
    } else {
        _Imprimir4_41();
    }
}

function _Releerrips_41() {
    let datos_envio = datosEnvio()
    datos_envio += SAL41.LLAVEFACT
    SolicitarDll({ datosh: datos_envio }, data => {
        console.debug(data);
        data = data.split('|');
        if (data[0].trim() == '00') {
            SAL41.TRIAGEESTAD = data[4].trim();
            SAL41.HORAATENESTAD = data[5].trim();
            SAL41.MINHORAESTAD = data[6].trim();
            SAL41.ESTADSALESTAD = data[7].trim();
            SAL41.FINALIDESTAD = data[8].trim();
            SAL41.CAUSAESTAD = data[9].trim();
            SAL41.CODDIAGESTAD = data[10].trim();
            SAL41.TIPDIAGESTAD = data[11].trim();
            SAL41.REPETIDESTAD = data[12].trim();
            SAL41.NOMBREENF1 = data[13].trim();
            SAL41.NOMBREENF2 = data[14].trim();
            SAL41.MOTIVOCONSULTA = data[15].trim();
        } else {
            console.debug('No existe la factura');
        }
    }, get_url("APP/SALUD/SAL41-01.DLL"));
}

function _Imprimir4_41() {
    console.debug('imprimir 4');
    if (((SAL41.NITUSU == '0900264583') || (SAL41.NITUSU == '0900030814')) && ($_CODDIAGESTAD[1].trim() == '')) {
        //SER421 OTRA OPCION _dataSER421_41
    }
    if (($_PREFIJOFACT == 'C') || ($_PREFIJOFACT == 'E')) {
        _Imprimir5_41();
    } else {
        let artfact = $TABLAFACT[0].ARTFACT
        if ((artfact == 890701) || (artfact == 890702) || (artfact == 890703) || (artfact == 890704)) {
            if ($_CODDIAGESTAD[0].trim() == '') {
                //SER421 OTRA OPCION _dataSER421_41
            } if (SAL41.NITUSU == '0800162035') {
                _Imprimir6_41();
            } else {
                let datos_envio = datosEnvio()
                datos_envio += '|' + SAL41.LLAVEFACT
                SolicitarDll({ datosh: datos_envio }, _dataSER411U_41, get_url("APP/SALUD/INV411U.DLL")); // FALTA
            }
        } else {
            _Imprimir6_41();
        }
    }
}

function _dataSER421_41(data) {
    data = data.split('|');
    _Imprimir6_41();
}

function _dataSER411U_41(data) {
    data = data.split('|');
    _Imprimir6_41();
}

function _Imprimir6_41() {
    console.debug('imprimir 6')
    if (SAL41.NITUSU == '0822007038') {
        _Imprimir7_41();
    } else {
        if (($_UNSERVFACT == '01') && ($_CLFACT == '5')) {
            let datos_envio = datosEnvio()
            datos_envio += '|' + SAL41.LLAVEFACT
            datos_envio += '|' + $_FECHAFACT // convertir a fecha legible en .net
            datos_envio += '|' + $_IDHISTORIAFACT
            SolicitarDll({ datosh: datos_envio }, _dataSER880TG_41, get_url("APP/SALUD/SER880TG.DLL"));
        } else {
            _Imprimir7_41();
        }
    }
}

function _dataSER880TG_41(data) {
    data = data.split('|');
    _Imprimir7_41();
}

function _Imprimir7_41() {
    console.debug('imprimir 7');
    if (($.isNumeric($_CONTROLCAPNUM)) || (parseInt($_CONTROLCAPNUM) = 0) || ($_CONTROLCAPNUM == '9999')) {
        _Imprimir8_41();
    } else {
        let datos_envio = datosEnvio()
        datos_envio += '|' + $_CONTROLCAPNUM
        datos_envio += '|' + $_FECHAFACT
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_16, get_url("APP/SALUD/SAL41-16.DLL")); //FALTA
    }
}

function _dataSAL41_16(data) {
    console.debug(data);
    data = data.split('|');
    _Imprimir8_41();
}

function _Imprimir8_41() {
    console.debug('imprimir 8');
    if ((($_CLFACT == '0') && (SAL41.NITUSU == '0822005339')) || (($_REDEXTERNUM == 'S') && ($_DIAGNCUP = ! 'N'))) {
        //SER421 OTRA OPCION _dataSER4213_41
    } if ((SAL41.NITUSU == '0900264583') && ($_DIAGNCUP = ! 'N') && ($_CODDIAGESTAD[0].trim() == '')) {
        //SER421 OTRA OPCION _dataSER4214_41
    } else {
        let grupofact = $TABLAFACT[0].ARTFACT.substring(0, 2);
        let grupofact2 = $TABLAFACT[0].ARTFACT.substring(0, 2);
        if ((grupofact = '73' || grupofact == '74' || grupofact2 == '73' || grupofact2 == '74' || grupofact == 'F8' || grupofact == 'FS' || grupofact2 == 'F8' || grupofact2 == 'FS') && ($_DIAGNCUP = ! 'N')) {
            //SER421 OTRA OPCION _dataSER4214_41
        } else {
            if (($_CLFACT == '1') && ($_CODDIAGESTAD[0].trim() == '') && ($_DIAGNCUP = ! 'N')) {
                //SER421 OTRA OPCION _dataSER4214_41
            } else {
                if (((parseInt($_CLFACT) > 2) || ((SAL41.NITUSU == '0891855847') && ($_CLFACT == '1'))) && (($_FECHAINGESTAD < $_FECHAACT) || (($_PUERTAESTAD != '1') && ($_HORAELABFACT > 1915))) && ($_DIAGNCUP = ! 'N') && ($_CODDIAGESTAD[0].trim() == '')) {
                    //SER421 OTRA OPCION _dataSER4213_41
                } else {
                    _Imprimir9_41();
                }
            }
        }
    }
}

function _dataSER4213_41(data) {
    data = data.split('|');
    _Releerrips_41(); // FALTA
    _Recibopago_41();
}

function _dataSER4214_41(data) {
    data = data.split('|');
    _Releerrips_41();
    _Imprimir9_41();
}

function _Imprimir9_41() {
    // if (($_PUCUSU == '1') && (($_CLFACT == '0') || ($_CLFACT == '2') || ($_CLFACT == '3')) && ($_POSUSU == 'S')) { // FALTA POSUSU
    // $_FORMATOW = 2;
    // }
    // else {
    // $_FORMATOW == 1
    // }
    if ((SAL41.NITUSU == '0830092718') && ($_PREFIJOUSU == 'TU')) {
        // REGRESAR
    }
    else {
        if (((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) && ($_CLFACT == '5')) {
            $_FORMATOW = 0
            _Imprimir10_41();
        }
        else {
            SAL41.FORMATO = [
                { COD: '1', DESCRIP: 'FORMATO NORMAL ORIGINAL' },
                { COD: '2', DESCRIP: 'FORMATO NORMAL CON COPIA' },
                { COD: '3', DESCRIP: 'FORMATO R.I.P.S ORIGINAL' },
                { COD: '4', DESCRIP: 'FORMATO POS' },
                { COD: '5', DESCRIP: 'PENDIENTE MEDICAMENTOS' },
                { COD: '0', DESCRIP: 'NO IMPRIMIR' },
            ];
            POPUP({
                array: SAL41.FORMATO,
                titulo: 'IMPRESION DE FORMATOS',
                indices: [
                    { label: 'DESCRIP' }
                ],
                callback_f: function () { setTimeout(_Detalle_41, 300) }
            },
                _evaluarSER811_SAL41);

        }
    }
}

function _evaluarSER811_SAL41(data) {
    SAL41.IMPRESION = new Object;
    switch (data.COD) {
        case '1':
            _imprimirINV411_SAL97C11();
            break;
        case '2':
            if ($_USUA_GLOBAL[0].POS == 'S') {
                _imprimirINV412_SAL97C11();
            } else {
                _imprimirINV411_SAL97C11();
            }
            break;
        case '3':
            _imprimirINV414_SAL97C11();
            break;
        case '4':
            _imprimirINV412_SAL97C11();
            break;
        case '5':
            if (SAL41.NITUSU == '0800162035') {
                _imprimirINV411_SAL97C11();
            } else {
                _imprimirINV412P_SAL97C11();
            }
            break;
        case '0':
            _toggleNav();
    }
}


function _imprimirINV411_SAL97C11() {
    SAL41.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
    SAL41.IMPRESION.NITUSU = 'NIT' + $_USUA_GLOBAL[0].NIT.toString();
    switch ($_USUA_GLOBAL[0].IVA_S) {
        case 'C':
            SAL41.IMPRESION.IVAUSU = 'IVA REG. COMUN-RETENEDOR'
            break;
        case 'S':
            SAL41.IMPRESION.IVAUSU = 'IVA REGIMEN SIMPLIFICADO'
            break;
        case 'N':
            SAL41.IMPRESION.IVAUSU = 'NO RESPONSABLES DE IVA'
            break;
        default:
            SAL41.IMPRESION.IVAUSU = '';
            break;
    }
    switch ($_PUERTAINGW) {
        case '1':
            SAL41.IMPRESION.PUERTAW = 'ACCESO: A1';
            break;
        case '2':
            SAL41.IMPRESION.PUERTAW = 'ACCESO: CE';
            break;
        case '3':
            SAL41.IMPRESION.PUERTAW = 'ACCESO: RE';
            break;
        case '4':
            SAL41.IMPRESION.PUERTAW = 'ACCESO: NA';
            break;
    }
    switch ($_PREFIJOFACT) {
        case 'E':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: CONTADO'
            break;
        case 'C':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: CREDITO'
            break;
        case 'P':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: Hospit.'
            break;
        case 'T':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: A. Trans'
            break;
        default:
            SAL41.IMPRESION.FPAGO = 'F.PAGO: Ambulat.'
            break;
    }
    switch ($_TIPOPACI) {
        case 'C':
            SAL41.IMPRESION.TIPOUSUW = 'TIPO USUARIO: CONTR.'
            break;
        case 'S':
            SAL41.IMPRESION.TIPOUSUW = 'TIPO USUARIO: SUBSID'
            break;
        case 'V':
            SAL41.IMPRESION.TIPOUSUW = 'TIPO USUARIO: VINCUL'
            break;
        case 'P':
            SAL41.IMPRESION.TIPOUSUW = 'TIPO USUARIO: PARTIC'
            break;
        case '0':
            SAL41.IMPRESION.TIPOUSUW = 'TIPO USUARIO: OTRO'
            break;
        default:
            SAL41.IMPRESION.TIPOUSUW = $_TIPOPACI
            break;
    }
    if ($_USUA_GLOBAL[0].BARRAS == 'N') {
        SAL41.IMPRESION.CODIGOBARRAS = '';
    } if ($_USUA_GLOBAL[0].BARRAS != 'N') {
        SAL41.IMPRESION.CODIGOBARRAS = $_SUCFACT + $_CLFACT + $_NROCTAFACT;
    }
    SAL41.IMPRESION.DIRECCIONUSU = $_USUA_GLOBAL[0].DIRECC;
    SAL41.IMPRESION.TELEFONOUSU = $_USUA_GLOBAL[0].TEL.trim();
    SAL41.IMPRESION.CLASESERVICIO = $('#claseservicio_SAL41').val();
    SAL41.IMPRESION.FECHAFACT = 'FECHA: ' + moment($_FECHAFACT).format('MMMM DD/YY');
    SAL41.IMPRESION.FACTURA = 'CARGAR A LA FACTURA: ' + $_PREFIJOFACT + $_NROCTAFACT.padStart(6, '0');
    SAL41.IMPRESION.COMPROBANTE = 'COMPROBANTE NUMERO: ' + SAL41.LLAVEFACT.substring(3, 9);
    SAL41.IMPRESION.DESCRIPTER = 'ENTIDAD: ' + $('#cliented_SAL41').val();
    SAL41.IMPRESION.CODIGOEPS = 'CODIGO: ' + $_EPSPACI;
    SAL41.IMPRESION.ATIENDE = 'ATIENDE: ' + $_DESCRIPPROF;
    SAL41.IMPRESION.ESPECIALIDAD = 'Espec:' + $_ESPECLAB + ' ' + $_NOMBREESP;
    SAL41.IMPRESION.COSTO = 'COS: ' + $_COSTOFACT + ' ' + $_NOMBRECOSTO;
    SAL41.IMPRESION.PACIENTE = 'PACIENTE: ' + $_IDHISTORIAFACT + ' CC ' + $_DESCRIPPACI;
    SAL41.IMPRESION.UNSERVFACT = 'US: ' + $_UNSER.substring(3, 35);
    SAL41.IMPRESION.OCUPACION = 'OCUPACION: ' + SAL41.OCUPACION;
    SAL41.IMPRESION.EDAD = 'EDAD: ' + $_EDAD.substring(0, 1) + $_EDAD.substring(1, 3).padStart(3, '0');
    SAL41.IMPRESION.SEXO = 'SEXO: ' + $_SEXOPACI;
    SAL41.IMPRESION.CIUDAD = 'CIUDAD: ' + $_CIUDADPACI;
    SAL41.IMPRESION.ZONA = 'ZONA: ' + SAL41.ZONAPACI;
    SAL41.IMPRESION.DETALLE = 'DETALLE: ' + $_DETALLEFACT;
    SAL41.IMPRESION.NROAURO = 'Autor: ' + $_NROAUTORELAB;
    SAL41.IMPRESION.SOLICITA = 'SOLICITA: ' + $_DESCRIPPROF2;
    let valorenletra = FAC146($_VALORTOTAL);
    SAL41.IMPRESION.SON = 'SON ' + valorenletra;

    SAL41.IMPRESION.TABLA = $TABLAFACT;
    SAL41.IMPRESION.ACCESO = $_PUERTAESTAD;
    SAL41.IMPRESION.BARRASFACT = $_USUA_GLOBAL[0].BARRAS;
    // SAL41.IMPRESION.NUMEROBARRAFACT = $_SUCFACT + $_CLFACT + $_NROCTAFACT;
    SAL41.IMPRESION.FECHAELABORADO = $_FECHASALESTAD + ' ' + $_HRELABFACT + ':' + $_MNELABFACT;
    SAL41.IMPRESION.RESOLDIAN = $_USUA_GLOBAL[0].RESOL_DIAN;
    SAL41.IMPRESION.VLRIVAFACT = $_VLRIVAFACT;
    SAL41.IMPRESION.VLRTOTAL = 'TOTAL FACTURA: ' + PriceContMask_41.value;
    SAL41.IMPRESION.COPAGO = 'ABONOS/COPAGOS: ' + $_COPAGOESTIMFACT.toString();
    let saldo = parseInt($_VALORTOTEDIT) + parseInt($_COPAGOESTIMFACT);
    SAL41.IMPRESION.SALDO = 'SALDO: ' + saldo.toString();
    SAL41.IMPRESION.OPERELABFACT = $_OPERELABFACT;
    SAL41.IMPRESION.OPERCORRECFACT = 'Mod: ' + $_OPERELABFACT;
    SAL41.IMPRESION.ADMINW = 'Imprime: ' + $_ADMINW;
    // SAL41.IMPRESION.FECHASALESTAD = moment($_FECHASALESTAD).format('MMMM DD/YY');

    opcinesImpresion_INV411 = {
        datos: SAL41.IMPRESION,
        tipo: 'pdf',
        formato: 'salud/INV411.html',
        nombre: SAL41.NOMBREPDF
    }
    imprimir(opcinesImpresion_INV411, finImpresion_INV411)
}

function _imprimirINV412_SAL97C11() {
    SAL41.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
    SAL41.IMPRESION.NITUSU = 'NIT' + $_USUA_GLOBAL[0].NIT.toString();
    switch ($_USUA_GLOBAL[0].IVA_S) {
        case 'C':
            SAL41.IMPRESION.IVAUSU = 'IVA REG. COMUN-RETENEDOR'
            break;
        case 'S':
            SAL41.IMPRESION.IVAUSU = 'IVA REGIMEN SIMPLIFICADO'
            break;
        case 'N':
            SAL41.IMPRESION.IVAUSU = 'NO RESPONSABLES DE IVA'
            break;
        default:
            SAL41.IMPRESION.IVAUSU = '';
            break;
    }
    switch ($_PREFIJOFACT) {
        case 'E':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: CONTADO'
            break;
        case 'C':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: CREDITO'
            break;
        case 'P':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: Hospit.'
            break;
        case 'T':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: A. Trans'
            break;
        default:
            SAL41.IMPRESION.FPAGO = 'F.PAGO: Ambulat.'
            break;
    }
    SAL41.IMPRESION.DIRECCIONUSU = $_USUA_GLOBAL[0].DIRECC;
    SAL41.IMPRESION.TELEFONOUSU = $_USUA_GLOBAL[0].TEL.trim();
    SAL41.IMPRESION.FECHAFACT = 'FECHA: ' + moment($_FECHAFACT).format('MMMM DD/YY');
    SAL41.IMPRESION.FACTURA = 'FACTURA DE VENTA: ' + $_PREFIJOFACT + $_NROCTAFACT.padStart(6, '0');
    SAL41.IMPRESION.COMPROBANTE = 'COMPROBANTE NUMERO: ' + SAL41.LLAVEFACT.substring(3, 9);
    SAL41.IMPRESION.DESCRIPTER = 'CLIENTE: ' + $('#cliented_SAL41').val() + ' ' + $_NITFACT;
    SAL41.IMPRESION.CIUDAD = 'CIUDAD: ' + $_CIUDADPACI;
    let valorenletra = FAC146($_VALORTOTAL);
    SAL41.IMPRESION.SON = 'SON ' + valorenletra;

    SAL41.IMPRESION.TABLA = $TABLAFACT;
    SAL41.IMPRESION.ACCESO = $_PUERTAESTAD;
    SAL41.IMPRESION.BARRASFACT = $_USUA_GLOBAL[0].BARRAS;
    SAL41.IMPRESION.FECHAELABORADO = $_FECHASALESTAD + ' ' + $_HRELABFACT + ':' + $_MNELABFACT;
    SAL41.IMPRESION.RESOLDIAN = $_USUA_GLOBAL[0].RESOL_DIAN;
    SAL41.IMPRESION.VLRIVAFACT = $_VLRIVAFACT;
    SAL41.IMPRESION.VLRTOTAL = 'TOTAL FACTURA: ' + PriceContMask_41.value;
    SAL41.IMPRESION.COPAGO = 'ABONOS/COPAGOS: ' + $_COPAGOESTIMFACT.toString();
    let saldo = parseInt($_VALORTOTEDIT) + parseInt($_COPAGOESTIMFACT);
    SAL41.IMPRESION.SALDO = 'SALDO: ' + saldo.toString();
    SAL41.IMPRESION.OPERELABFACT = $_OPERELABFACT;
    SAL41.IMPRESION.OPERCORRECFACT = 'Mod: ' + $_OPERELABFACT;
    SAL41.IMPRESION.ADMINW = 'Imprime: ' + $_ADMINW;

    opcinesImpresion_INV411B = {
        datos: SAL41.IMPRESION,
        tipo: 'pdf',
        formato: 'salud/INV411B.html',
        nombre: SAL41.NOMBREPDF
    }
    imprimir(opcinesImpresion_INV411B, finImpresion_INV411)
}

function _imprimirINV414_SAL97C11() {
    SAL41.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
    SAL41.IMPRESION.NITUSU = 'NIT' + $_USUA_GLOBAL[0].NIT.toString();
    switch ($_USUA_GLOBAL[0].IVA_S) {
        case 'C':
            SAL41.IMPRESION.IVAUSU = 'IVA REG. COMUN-RETENEDOR'
            break;
        case 'S':
            SAL41.IMPRESION.IVAUSU = 'IVA REGIMEN SIMPLIFICADO'
            break;
        case 'N':
            SAL41.IMPRESION.IVAUSU = 'NO RESPONSABLES DE IVA'
            break;
        default:
            SAL41.IMPRESION.IVAUSU = '';
            break;
    }
    switch ($_PUERTAINGW) {
        case '1':
            SAL41.IMPRESION.PUERTAW = 'ACCESO: A1';
            break;
        case '2':
            SAL41.IMPRESION.PUERTAW = 'ACCESO: CE';
            break;
        case '3':
            SAL41.IMPRESION.PUERTAW = 'ACCESO: RE';
            break;
        case '4':
            SAL41.IMPRESION.PUERTAW = 'ACCESO: NA';
            break;
    }
    switch ($_PREFIJOFACT) {
        case 'E':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: CONTADO'
            break;
        case 'C':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: CREDITO'
            break;
        case 'P':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: Hospit.'
            break;
        case 'T':
            SAL41.IMPRESION.FPAGO = 'F.PAGO: A. Trans'
            break;
        default:
            SAL41.IMPRESION.FPAGO = 'F.PAGO: Ambulat.'
            break;
    }
    switch ($_TIPOPACI) {
        case 'C':
            SAL41.IMPRESION.TIPOUSUW = 'CONTR.'
            break;
        case 'S':
            SAL41.IMPRESION.TIPOUSUW = 'SUBSID'
            break;
        case 'V':
            SAL41.IMPRESION.TIPOUSUW = 'VINCUL'
            break;
        case 'P':
            SAL41.IMPRESION.TIPOUSUW = 'PARTIC'
            break;
        case '0':
            SAL41.IMPRESION.TIPOUSUW = 'OTRO'
            break;
        default:
            SAL41.IMPRESION.TIPOUSUW = $_TIPOPACI
            break;
    }
    switch ($_PERSONALELAB) {
        case '1':
            SAL41.PERSONALEDIT = 'MD.ESP'
            break;
        case '2':
            SAL41.PERSONALEDIT = 'MD.GEN'
            break;
        case '3':
            SAL41.PERSONALEDIT = 'ENFERM'
            break;
        case '4':
            SAL41.PERSONALEDIT = 'AUXIL.'
            break;
        case '5':
            SAL41.PERSONALEDIT = '      '
            break;
    }
    if ($_USUA_GLOBAL[0].BARRAS == 'N') {
        SAL41.IMPRESION.CODIGOBARRAS = '';
    } if ($_USUA_GLOBAL[0].BARRAS != 'N') {
        SAL41.IMPRESION.CODIGOBARRAS = $_SUCFACT + $_CLFACT + $_NROCTAFACT;
    }
    SAL41.IMPRESION.DIRECCIONUSU = $_USUA_GLOBAL[0].DIRECC.trim();
    SAL41.IMPRESION.TELEFONOUSU = $_USUA_GLOBAL[0].TEL.trim();
    SAL41.IMPRESION.CLASESERVICIO = 'COMPROB. ' + $('#claseservicio_SAL41').val();
    SAL41.IMPRESION.FECHAFACT = 'FECHA: ' + moment($_FECHAFACT).format('MMMM DD/YY');
    SAL41.IMPRESION.FACTURA = 'FACTURA NR: ' + $_PREFIJOFACT + $_NROCTAFACT.padStart(6, '0');
    SAL41.IMPRESION.COMPROBANTE = 'NRO: ' + SAL41.LLAVEFACT.substring(3, 9);
    SAL41.IMPRESION.DESCRIPTER = 'ENTIDAD: ' + $('#cliented_SAL41').val();
    SAL41.IMPRESION.CODIGOEPS = 'CODIGO: ' + $_EPSPACI;
    SAL41.IMPRESION.ATIENDE = 'ATIENDE: ' + $_DESCRIPPROF.trim();
    SAL41.IMPRESION.ESPECIALIDAD = 'Espec:' + $_ESPECLAB + ' ' + $_NOMBREESP.trim();
    SAL41.IMPRESION.COSTO = 'COS: ' + $_COSTOFACT + ' ' + $_NOMBRECOSTO.trim();
    SAL41.IMPRESION.PACIENTE = $_IDHISTORIAFACT + ' CC ';
    SAL41.IMPRESION.UNSERVFACT = 'US: ' + $_UNSER.substring(3, 35);
    SAL41.IMPRESION.OCUPACION = SAL41.OCUPACION.trim();
    SAL41.IMPRESION.EDAD = $_EDAD.substring(0, 1) + $_EDAD.substring(1, 3).padStart(3, '0');
    SAL41.IMPRESION.SEXO = $_SEXOPACI;
    SAL41.IMPRESION.CIUDADUSU = 'CIUDAD: ' + $_USUA_GLOBAL[0].COD_CIUD;
    SAL41.IMPRESION.ZONA = SAL41.ZONAPACI.trim();
    SAL41.IMPRESION.DETALLE = 'DETALLE: ' + $_DETALLEFACT.trim();
    SAL41.IMPRESION.NROAURO = 'Autor: ' + $_NROAUTORELAB;
    SAL41.IMPRESION.SOLICITA = 'SOLICITA: ' + $_DESCRIPPROF2.trim();
    let valorenletra = FAC146($_VALORTOTAL);
    SAL41.IMPRESION.SON = 'SON ' + valorenletra;
    SAL41.IMPRESION.PERSONALEDIT = SAL41.PERSONALEDIT;
    SAL41.IMPRESION.NOMBREPACIENTE = $('#paciented_SAL41').val();
    SAL41.IMPRESION.CIUDADPACI = $_CIUDADPACI;
    SAL41.IMPRESION.CELLPACI = $_CELPACI;
    SAL41.IMPRESION.DIRECCPACI = 'DIRECCION: ' + $_DIRECCPACI.trim();
    SAL41.IMPRESION.NOMBREOCU = 'OCUPACION: ' + SAL41.NOMBREOCU;
    SAL41.IMPRESION.ACOMPAPACI = 'ACOMPAÑANTE: ' + SAL41.ACOMPAPACI;
    switch (parseInt(SAL41.FINALIDESTAD)) {
        case 0:
            SAL41.IMPRESION.FINALIDESTAD = '__'
            break;
        default:
            SAL41.IMPRESION.FINALIDESTAD = SAL41.FINALIDESTAD;
            break;
    }
    switch (SAL41.TRIAGEESTAD) {
        case '1':
            SAL41.IMPRESION.TRIAGEESTAD12 = 'X ';
            SAL41.IMPRESION.TRIAGEESTAD34 = '  ';
            break;
        case '2':
            SAL41.IMPRESION.TRIAGEESTAD12 = 'X ';
            SAL41.IMPRESION.TRIAGEESTAD34 = '  ';
            break;
        case '3':
            SAL41.IMPRESION.TRIAGEESTAD12 = 'X ';
            SAL41.IMPRESION.TRIAGEESTAD34 = '  ';
            break;
        case '4':
            SAL41.IMPRESION.TRIAGEESTAD12 = 'X ';
            SAL41.IMPRESION.TRIAGEESTAD34 = '  ';
            break;
        default:
            SAL41.IMPRESION.TRIAGEESTAD12 = ' ';
            SAL41.IMPRESION.TRIAGEESTAD34 = '  ';
            break;
    }
    switch (parseInt(SAL41.CAUSAESTAD)) {
        case 0:
            SAL41.IMPRESION.CAUSAESTAD = '__'
            break;
        default:
            SAL41.IMPRESION.CAUSAESTAD = SAL41.CAUSAESTAD;
            break;
    }
    switch (parseInt(SAL41.CODDIAGESTAD)) {
        case 0:
            SAL41.IMPRESION.CODDIAGESTAD = '__'
            break;
        default:
            SAL41.IMPRESION.CODDIAGESTAD = SAL41.CODDIAGESTAD;
            break;
    }
    switch (parseInt(SAL41.TIPDIAGESTAD)) {
        case 0:
            SAL41.IMPRESION.TIPDIAGESTAD = '__'
            break;
        default:
            SAL41.IMPRESION.TIPDIAGESTAD = SAL41.TIPDIAGESTAD;
            break;
    }
    switch (parseInt(SAL41.REPETIDESTAD)) {
        case 0:
            SAL41.IMPRESION.REPETIDESTAD = '__'
            break;
        default:
            SAL41.IMPRESION.REPETIDESTAD = SAL41.REPETIDESTAD;
            break;
    }
    switch (SAL41.ESTADSALESTAD) {
        case '1':
            SAL41.IMPRESION.VIVO = 'XX';
            SAL41.IMPRESION.MUERTO = '  ';
            SAL41.IMPRESION.REMITD = '  ';
            break;
        case '2':
            SAL41.IMPRESION.VIVO = '  ';
            SAL41.IMPRESION.MUERTO = 'XX';
            SAL41.IMPRESION.REMITD = '  ';
            break;
        case '3':
            SAL41.IMPRESION.VIVO = '  ';
            SAL41.IMPRESION.MUERTO = '  ';
            SAL41.IMPRESION.REMITD = '  ';
            break;
        default:
            SAL41.IMPRESION.VIVO = '__';
            SAL41.IMPRESION.MUERTO = '__';
            SAL41.IMPRESION.REMITD = '__';
            break;
    }
    SAL41.IMPRESION.NOMBREENF1 = SAL41.NOMBREENF1.trim();
    SAL41.IMPRESION.NOMBREENF2 = SAL41.NOMBREENF2.trim();
    SAL41.IMPRESION.TABLA = $TABLAFACT;
    SAL41.IMPRESION.ACCESO = $_PUERTAESTAD.trim();
    SAL41.IMPRESION.BARRASFACT = $_USUA_GLOBAL[0].BARRAS.trim();
    // SAL41.IMPRESION.NUMEROBARRAFACT = $_SUCFACT + $_CLFACT + $_NROCTAFACT;
    SAL41.IMPRESION.FECHAELABORADO = $_FECHASALESTAD + ' ' + $_HRELABFACT + ':' + $_MNELABFACT;
    SAL41.IMPRESION.RESOLDIAN = $_USUA_GLOBAL[0].RESOL_DIAN.trim();
    SAL41.IMPRESION.VLRIVAFACT = $_VLRIVAFACT;
    SAL41.IMPRESION.VLRTOTAL = 'TOTAL FACTURA: ' + PriceContMask_41.value;
    SAL41.IMPRESION.VLRCOPAGO = $_COPAGOESTIMFACT.toString();
    SAL41.IMPRESION.COPAGO = $_TIPOCOPAGOFACT;
    let saldo = parseInt($_VALORTOTEDIT) + parseInt($_COPAGOESTIMFACT);
    SAL41.IMPRESION.SALDO = 'SALDO: ' + saldo.toString();
    SAL41.IMPRESION.OPERELABFACT = ' Elaboró: ' + $_OPERELABFACT;
    SAL41.IMPRESION.OPERCORRECFACT = 'Mod: ' + $_OPERELABFACT;
    SAL41.IMPRESION.ADMINW = 'Imprime: ' + $_ADMINW;
    SAL41.IMPRESION.HORAESTAD = SAL41.HORAATENESTAD + ':' + SAL41.MINHORAESTAD;
    SAL41.IMPRESION.MOTIVOCONSULTA = 'Causa basica que origina la atención : ' + SAL41.MOTIVOCONSULTA;

    // SAL41.IMPRESION.FECHASALESTAD = moment($_FECHASALESTAD).format('MMMM DD/YY');

    opcinesImpresion_INV414 = {
        datos: SAL41.IMPRESION,
        tipo: 'pdf',
        formato: 'salud/INV414.html',
        nombre: SAL41.NOMBREPDF
    }
    // _toggleNav();

    imprimir(opcinesImpresion_INV414, finImpresion_INV411)
}

function finImpresion_INV411() {
    console.debug('Impresion satisfactoria');
    // _toggleNav();
    if (parseInt($_COPAGOESTIMFACT) > 0) {
        let { ipcRenderer } = require("electron");
        ipcRenderer.send('another', 'SALUD/PAGINAS/FAC135C.html');
        vector = ['on', 'Ventana de Copagos']
        _EventocrearSegventana(vector, _toggleNav);
    }
}

function _Imprimir10_41() {
    $_SWMOSTRAR = 2;
    $_REIMPW = '0';
    if (($_UNSERVFACT == '02') || ($_UNSERVFACT == '06')) {
        //
    }
    else {
        if ((SAL41.NITUSU == '0800162035') && ($_FORMATOW > 0) && ($_CLFACT == '0')) {
            $_FORMATOW = 5
        }
    }
    if ((SAL41.NITUSU == '0900565731') && ($_SWOCULTAR == '01')) {
        $_FORMATOW = 1
    }
    _Imprimir11_41();
}

function _Imprimir11_41() {
    switch ($_FORMATOW) {
        case 1:
            // INV411
            break;
        case 2:
            if ($_POSUSU == 'S') {
                // INV412
            }
            else {
                // INV411
            }
            break;
        case 3:
            // INV414
            break;
        case 4:
            // INV412
            break;
        case 5:
            if (SAL41.NITUSU == '0800162035') {
                // INV411
            }
            else {
                // INV412P
            }
            break;
    }
}


function _Montarhl7_41() {
    for (var i in $TABLAFACT) {
        $I = i;
        $_ARTFACTI = $TABLAFACT[i].ARTFACT;
        $LLAVECUPI = $TABLAFACT[i].CODCUP;
        $DESCRIPCUPI = $TABLAFACT[i].DESCRIPCUP;
        if ($TABLAFACT[i + 1] == undefined) {
            var artfactm1 = '                 ';
        } else {
            var artfactm1 = $TABLAFACT[i + 1].ARTFACT;
        } if ($TABLAFACT[i + 2] == undefined) {
            var artfactm2 = '                 ';
        } else {
            var artfactm2 = $TABLAFACT[i + 2].ARTFACT;
        }
        var grupofact = $_ARTFACTI.substring(0, 2);
        $_DATOSETCUPK = $TABLAFACT[i].DATOSETCUP;
        if (grupofact.trim() == '' || grupofact == 'XX' || grupofact == 'MX' || grupofact == 'MQ') {
            $_SWINVALID = 0;
        } else {
            // if (datosetcup.trim() = ! '') {
            //     $_SWBUSCAR2 = 0;
            //     _Buscarcupsppal_41();
            //     if ($_SWBUSCAR2 = 1) {
            //         if ($TABLAFACT[i + 1].$_ARTFACTI == datosetcup) {
            //             $TABLAFACT[i].CISCUP == 'N';
            //         }
            //         else {
            //             $TABLAFACT[i].CISCUP == 'S';
            //         }
            //     }
            // }
            $_SWBUSCAR = 0;
            $_SWBUSCAR2 = 0; // COMPRUEBA DE QUE NO HALLA REPETIDOS
            _Buscarcupsrep_41();
            if ((i == 1) && (artfactm1.trim() == '') && (artfactm2.trim() == '')) {
                $TABLAFACT[i].CISCUP == 'N';
            }
            if ($_SWBUSCAR2 == 0) {
                if (grupofact == '88') {
                    $TABLAFACT[i].CISCUP == 'N';
                    $_SWPACI = 0;
                }
            }
            $_ARTLNK = $_ARTFACTI;
            if ($_CISCUP == 'S') {
                if ($_SWPACI == 0) {
                    $_SWPACI = 1;
                    switch (SAL41.NITUSU) {
                        case '0830092718':
                            $EMPRMSGL1 = 1;
                            break;
                        case '0830092719':
                            $EMPRMSGL1 = 2;
                            break;
                        case '0900193162':
                            $EMPRMSGL1 = 3;
                            break;
                        default:
                            $EMPRMSGL1 = 1;
                            break;
                    }
                    if ($_MEDOTRFACT == '3319') {
                        $_SUCFACT = 'T6';
                    }
                    $SUCMSGL1 = $_SUCFACT;
                    $CLMSGL1 = $_CLFACT;
                    $NROMSGL1 = SAL41.NROFACT;
                    $ITEMMSGL1 = $I;
                    let datos_envio = datosEnvio();
                    datos_envio += '|' + $EMPRMSGL1
                    datos_envio += '|' + $SUCMSGL1
                    datos_envio += '|' + $CLMSGL1
                    datos_envio += '|' + $NROMSGL1
                    datos_envio += '|' + $ITEMMSGL1
                    datos_envio += '|' + $_IDPACNUM
                    datos_envio += '|' + $_DESCRIPPACI.substring(0, 15);
                    datos_envio += '|' + $_DESCRIPPACI.substring(15, 30);
                    datos_envio += '|' + $_DESCRIPPACI.substring(30, 42);
                    datos_envio += '|' + $_DESCRIPPACI.substring(42, 54);
                    datos_envio += '|' + $_NACIMPACI;
                    datos_envio += '|' + $_SEXOPACI;
                    datos_envio += '|' + $_DIRECCPACI;
                    console.debug(datos_envio);
                    SolicitarDll({ datosh: datos_envio }, _dataHL7001_41, get_url("APP/SALUD/HL7001.DLL"));
                }
                _HL70002_41();
            }
            let datos_envio = datosEnvio()
            // datos_envio += '|' + SAL41.LLAVEFACT
            // datos_envio += '|' + $_SWRECAL
            // datos_envio += '|' + $_PUCUSU
            // datos_envio += '|' + $_PREFIJOUSU
            // datos_envio += '|' + SAL41.NITUSU.padStart(10, '0');
            // datos_envio += '|' + $_LOTEFARMUSU
            datos_envio += $_FECHAFACT + '|' + SAL41.NITUSU + SAL41.LLAVEFACT + '|' + $_PREFIJOFACT + $_NROCTAFACT + '|' + $_IDHISTORIAFACT + '|' + $_DESCRIPPACI + '|' + $_GRUPOFACT + '|' + $_CODARTFACT.padEnd(13, ' ') + '|' + $_DESCRIPCUP + '|' + $_MEDAYUFACT + '|' + $_DESCRIPPROF + '|' + $_REGMEDPROF + '|' + SAL41.BIRADSFACT + '|' + $_VLREDADELAB + $_UNIDEDADELAB.padStart(3, '0') + '|' + $_SEXOPACI + '|' + SAL41.BLOQUEOIMPFACT + '|' + $_EMAILPACI
            console.debug(datos_envio);
            SolicitarDll({ datosh: datos_envio }, _dataRXWEB01, get_url("APP/SALUD/RX-WEB01.DLL"));
        }
    }
    _Descargarinvent_41();
}

function _dataRXWEB01(data) {
    console.debug(data);
    data = data.split('|');
    $_CODLOTEFACT = '****';

}

function _dataHL7001_41(data) {
    data = data.split('|');
    $NOMSALIDA = data[0].trim();
    $_TIPOMSGW = 'ADT-';
    $_ESTADOW = 0;
    let datos_envio = datosEnvio()
    datos_envio += '|' + SAL41.LLAVEFACT
    datos_envio += '|' + $I
    datos_envio += '|' + $_ESTADOW
    datos_envio += '|' + $_FECHAFACT
    datos_envio += '|' + $NOMSALIDA
    datos_envio += '|' + $_TIPOMSGW
    SolicitarDll({ datosh: datos_envio }, _dataHL7000_41, get_url("APP/SALUD/HL7000.DLL"));
}

function _dataHL7000_41(data) {
    data = data.split('|');
    if (data[0].trim() == '00') {
        console.debug('00')
    }
    else if (data[0].trim() == '01') {

    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _HL70002_41() {
    $DESCRIPCUPI.trim() == '' ? $DESCRIPCUPI = $LLAVECUPI : $DESCRIPCUPI = $DESCRIPCUPI;
    switch (SAL41.NITUSU) {
        case '0830092718':
            $EMPRMSGL1 = 1;
            break;
        case '0830092719':
            $EMPRMSGL1 = 2;
            break;
        case '0900193162':
            $EMPRMSGL1 = 3;
            break;
        default:
            $EMPRMSGL1 = 1;
            break;
    }
    if ($_MEDOTRFACT == '3319') {
        $_SUCFACT = 'T6';
    }
    $SUCMSGL1 = $_SUCFACT;
    $CLMSGL1 = $_CLFACT;
    $NROMSGL1 = SAL41.NROFACT;
    $ITEMMSGL1 = $I;
    $
    let datos_envio = datosEnvio
    datos_envio += '|' + $_CODCIUUSU
    datos_envio += '|' + $_NUIRUSU
    datos_envio += '|' + SAL41.LLAVEFACT
    datos_envio += '|' + SAL41.LLAVEFACT
    datos_envio += '|' + $EMPRMSGL1
    datos_envio += '|' + $SUCMSGL1
    datos_envio += '|' + $CLMSGL1
    datos_envio += '|' + $NROMSGL1
    datos_envio += '|' + $ITEMMSGL1
    datos_envio += '|' + SAL41.LLAVEFACT
    datos_envio += '|' + $_IDPACNUM
    datos_envio += '|' + $_DESCRIPPACI.substring(0, 15);
    datos_envio += '|' + $_DESCRIPPACI.substring(15, 30);
    datos_envio += '|' + $_DESCRIPPACI.substring(30, 42);
    datos_envio += '|' + $_DESCRIPPACI.substring(42, 54);
    datos_envio += '|' + $_NACIMPACI;
    datos_envio += '|' + $_SEXOPACI;
    datos_envio += '|' + $_DIRECCPACI;
    datos_envio += '|' + $_CIUDADPACI;
    datos_envio += '|' + $_DIRECCPACI;
    datos_envio += '|' + $_TELEFONOPACI;
    datos_envio += '|' + $_CELPACI;
    datos_envio += '|' + $_ESTCIVPACI;
    datos_envio += '|' + $_HORACITFACT;
    datos_envio += '|' + $_REMITEFACT;
    datos_envio += '|' + $_CLFACT;
    datos_envio += '|' + $_ARTLNK;
    datos_envio += '|' + SAL41.VLRLATERFACT;
    datos_envio += '|' + $_CAUSAESTAD;
    datos_envio += '|' + $_DESCRIPTER2;
    datos_envio += '|' + $_PUERTAESTAD;
    datos_envio += '|' + $_DESCRIPPROF2;
    datos_envio += '|' + $_REGMEDPROF;
    datos_envio += '|' + $_DESCRIPCUPI;
    SolicitarDll({ datosh: datos_envio }, _dataHL7002_41, get_url("APP/SALUD/HL7002.DLL"));
}

function _dataHL7002_41(data) {
    data = data.split('|');
    if (data[0].trim() == '00') {
        $_TIPOMSGW = 'ORM-';
        $_ESTADOW = 0;
        let datos_envio = datosEnvio()
        datos_envio += '|' + SAL41.LLAVEFACT
        datos_envio += '|' + $I
        datos_envio += '|' + $_ESTADOW
        datos_envio += '|' + $_FECHAFACT
        datos_envio += '|' + $NOMSALIDA
        datos_envio += '|' + $_TIPOMSGW
        SolicitarDll({ datosh: datos_envio }, _dataHL70002_41, get_url("APP/SALUD/HL7000.DLL"));
    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _dataHL70002_41(data) {
    data = data.split('|');
    console.debug(data[1]);
    if (data[0].trim() == '00') {
        console.debug('00');
    }
    else if (data[0].trim() == '01') {
        console.debug('01');
    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Buscarcupsppal_41() {
    for (var k in $TABLAFACT) {
        if ($TABLAFACT[k].ARTFACT == $_DATOSETCUPK) {
            $_SWBUSCAR2 = 1;
        }
        if ($TABLAFACT[k].ARTFACT == $_ARTFACTI) {
            $_SWBUSCAR3++;
        }
    }
}

function _Buscarcupsrep_41() {
    for (var k in $TABLAFACT) {
        var codlote = $TABLAFACT[k].CODLOTEFACT;
        if (codlote == '****') {
            $_SWBUSCAR2 = 1;
        }
    }
}

function _Buscarpendiente_41() {
    for (var i = 0; i < $('#TABLA_401 tbody').length; i++) {
        let cant_fact = $('#TABLA_401 tbody tr')[i].getElementsByTagName("td")[3];
        let alm_fact = $('#TABLA_401 tbody tr')[i].getElementsByTagName("td")[2];
        if ((parseFloat(cant_fact) = !0) && (alm_fact == 'SIN99')) {
            $_SWBUSCAR3++;
        }
    }
}

function _Datohonorarios_41() {
    $_VLRARTW = '0';
    let containerfecha = $_FECHAFACT.split('-');
    $_ANOFACT = containerfecha[0];
    if ((parseInt($_ANOFACT) > 01) && ($_FORMALIQTAB == '2')) {
        if (($_CLFACT == '1') || ($_CODTAB == 'SO')) {
            $_FORMALIQTAB = '4';
        }
    }
    switch ($_FORMALIQTAB) {
        case '1':
            $_VLRCIRUW = Math.round($_MONTOTAB * parseFloat($_HNQUIRTAR));
            $_VLRAYUDW = Math.round($_MONTOTAB * parseFloat($_HNAYUDTAR));
            $_VLRANESW = Math.round($_MONTOTAB * parseFloat($_HNANESTAR));
            parseInt($_MONTOTAB) < 21 ? $_J = "01" : parseInt($_MONTOTAB) < 31 ? $_J = "02" : parseInt($_MONTOTAB) < 41 ? $_J = "03" : parseInt($_MONTOTAB) < 51 ? $_J = "04" : parseInt($_MONTOTAB) < 61 ? $_J = "05" : parseInt($_MONTOTAB) < 71 ? $_J = "06" : parseInt($_MONTOTAB) < 81 ? $_J = "07" : parseInt($_MONTOTAB) < 91 ? $_J = "08" : parseInt($_MONTOTAB) < 101 ? $_J = "09" : parseInt($_MONTOTAB) < 111 ? $_J = "10" : parseInt($_MONTOTAB) < 131 ? $_J = "11" : parseInt($_MONTOTAB) < 151 ? $_J = "12" : parseInt($_MONTOTAB) < 171 ? $_J = "13" : parseInt($_MONTOTAB) < 201 ? $_J = "14" : parseInt($_MONTOTAB) < 231 ? $_J = "15" : parseInt($_MONTOTAB) < 261 ? $_J = "16" : parseInt($_MONTOTAB) < 291 ? $_J = "17" : parseInt($_MONTOTAB) < 321 ? $_J = "18" : parseInt($_MONTOTAB) < 351 ? $_J = "19" : parseInt($_MONTOTAB) < 381 ? $_J = "20" : parseInt($_MONTOTAB) < 411 ? $_J = "21" : $_J = "22";
            $_VLRSALAW = $_DRSALATAR[$_J];
            $_VLRMATW = $_MATQUITAR[$_J];
            break;
        case '2':
            $_J = $_MONTOTAB;
            if ($_J > 29 || $_J < 1) {
                $_J = 1;
            }
            $_VLRCIRUW = $_TABLATAR[$_J].HNQUIRTAR;
            $_VLRAYUDW = $_TABLATAR[$_J].HNAYUDTAR;
            $_VLRANESW = $_TABLATAR[$_J].HNANESTAR;
            if (($_GRSERTAB == '72') || ($_GRSERTAB == '73')) {
                $_VLRMATW = 0;
            }
            else {
                if ($_CRUENTAFACT == '2') {
                    // INV401BC
                    // LINEA 8440
                }
                else {
                    $_VLRMATW = $_TABLATAR[$_J].MATQUITAR;
                }
            }
            break;
        case '4':
            $_J = Math.round($_MONTOTAB);
            if ($_J > 29 || $_J < 1) {
                $_J = 1;
            }
            $_VLRCIRUW = Math.round(parseFloat($_SALMINTAR) * parseFloat($_TABLATAR[$_J].HNQUIRTAR));
            $_VLRAYUDW = Math.round(parseFloat($_SALMINTAR) * parseFloat($_TABLATAR[$_J].HNAYUDTAR));
            $_VLRANESW = Math.round(parseFloat($_SALMINTAR) * parseFloat($_TABLATAR[$_J].HNANESTAR));
            if (($_GRSERTAB == '72') || ($_GRSERTAB == '73')) {
                $_VLRMATW = 0;
            } else {
                if ($_CRUENTAFACT == '2') {
                    // INV401BC
                    // LINEA 8460
                    let URL = get_url("APP/SALUD/SAL401BC.DLL");
                    postData({ datosh: datosEnvio() + $_PREFIJOFACT + $_NROCTAFAC + '|' + 4 + '|' + 'XX39305' }, URL)
                        .then(data => {
                            console.debug(data);
                            $_VLRMATW = data.VLR_MAT;
                        })
                        .catch(err => {
                            console.debug(err);
                        })
                } else {
                    $_VLRMATW = $_TABLATAR[$_J].MATQUITAR;
                }
            }
            break;
        default:
            $_VLRCIRUW = 0;
            $_VLRAYUDW = 0;
            $_VLRANESW = 0;
            $_VLRMATW = 0;
            $_VLRSALAW = 0;
            break;
    }
    if ($_CODTAR == 'H4') {
        $_VALORAPROX = Math.round(parseFloat($_VLRCIRUW) / $_SWAPR);
        $_VLRCIRUW = Math.round($_VALORAPROX * $_SWAPR);
        $_VALORAPROX = Math.round(parseFloat($_VLRAYUDW) / $_SWAPR);
        $_VLRAYUDW = Math.round($_VALORAPROX * $_SWAPR);
        $_VALORAPROX = Math.round(parseFloat($_VLRANESW) / $_SWAPR);
        $_VLRANESW = Math.round($_VALORAPROX * $_SWAPR);
        $_VALORAPROX = Math.round(parseFloat($_VLRMATW) / $_SWAPR);
        $_VLRMATW = Math.round($_VALORAPROX * $_SWAPR);
        $_VALORAPROX = Math.round(parseFloat($_VLRSALAW) / $_SWAPR);
        $_VLRSALAW = Math.round($_VALORAPROX * $_SWAPR);

        $_VLRCIRUW = Math.round($_VLRCIRUW * $_FACTORW);
        $_VLRAYUDW = Math.round($_VLRAYUDW * $_FACTORW);
        $_VLRANESW = Math.round($_VLRANESW * $_FACTORW);
        if ($_FACTORW < 1) {
            $_VLRMATW = Math.round($_VLRMATW * $_FACTORW);
            $_VLRSALAW = Math.round($_VLRSALAW * $_FACTORW);
        }
        else {
            $_VLRMATW = Math.round($_VLRMATW * 1);
            $_VLRSALAW = Math.round($_VLRSALAW * 1);
        }
    }
    else {
        if (SAL41.NITUSU == '0892000401') {
            $_VALORAPROX = Math.round(parseFloat($_VLRCIRUW) / $_SWAPR);
            $_VLRCIRUW = Math.round($_VALORAPROX * $_SWAPR);
            $_VALORAPROX = Math.round(parseFloat($_VLRAYUDW) / $_SWAPR);
            $_VLRAYUDW = Math.round($_VALORAPROX * $_SWAPR);
            $_VALORAPROX = Math.round(parseFloat($_VLRANESW) / $_SWAPR);
            $_VLRANESW = Math.round($_VALORAPROX * $_SWAPR);
            $_VALORAPROX = Math.round(parseFloat($_VLRMATW) / $_SWAPR);
            $_VLRMATW = Math.round($_VALORAPROX * $_SWAPR);
            $_VALORAPROX = Math.round(parseFloat($_VLRSALAW) / $_SWAPR);
            $_VLRSALAW = Math.round($_VALORAPROX * $_SWAPR);
            if ($_FACTORW < 1) {
                if ($_CUPW == 'XX39305') {
                    $_VLRMATW = Math.round($_VLRMATW * 1);
                }
                else {
                    $_VLRMATW = Math.round($_VLRMATW * $_FACTORW);
                }
            }
        }
        else {
            $_VLRMATW = Math.round($_VLRMATW * 1);
        }
    }
    _Ventanacirugia_41();
}
function _Ventanacirugia_41() {
    SAL41.CONTEOMEDCIR = 0;
    let nitmedico = $('#elementos-tabla #nitmedico_SAL41').length
    if (nitmedico > 0) {
        _Evaluarnitmedico_41();
    } else {
        $('#TABLA_401 tbody').append(
            '<tr>' +
            '<td>' + SAL41.CONTEO + '</td>' +
            '<td>' + $('#codservicio2_SAL41').val() + '</td>' +
            '<td>' + $('#detalle_SAL41').val() + '</td>' +
            '<td>' + ' ' + '</td>' +
            '<td>' + ' ' + '</td>' +
            '<td>' + ' ' + '</td>' +
            '<td>' + PriceUnitMask_41.value + '</td>' +
            '<td>' + ' ' + '</td>' +
            '</tr>'
        );
        $('#elementos-tabla').append(
            '<div class="col-md-4 col-sm-4 col-xs-12">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-12">Nit Medico:</label>' +
            '<div class="input-group col-md-4 col-sm-4 col-xs-12" id="NITMEDICO_41">' +
            '<input id="nitmedico_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
            '</div>' +
            '<div class="input-group col-md-4 col-sm-4 col-xs-12">' +
            '<input id="nitmedicod_SAL41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12">' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        var prof = ['CIRUJANO', 'AYUDANTIA', 'ANESTESIOA', 'MAT.QUIRG', 'DERECH.SALA'];
        for (var i in prof) {
            $('#TABLA_401 tbody').append(
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
        _inputControl('disabled');
        _Limpiarcampos_41();
        _Evaluarnitmedico_41();
    }
    $_CODSERTAB.length > 0 ? $_CODSERTAB = $_CODSERTAB : $_CODSERTAB = '';
    $_DIASTRATAFACT = '' ? $_DIASTRATAFACT = 0 : $_DIASTRATAFACT = $_DIASTRATAFACT;
    $_CODLOTEFACT = '' ? $_CODLOTEFACT = '    ' : $_CODLOTEFACT = $_CODLOTEFACT;
    $TABLAFACT = [
        { ALMAFACT: ' ', ARTFACT: $_ARTFACT, CODLOTEFACT: $_CODLOTEFACT, CANTFACT: ' ', VLRFACT: PriceUnitMask_41.value, DIASTRATAFACT: $_DIASTRATAFACT, VLRLATERFACT: SAL41.VLRLATERFACT, DATOSETCUP: $_DATOSETCUP, CISCUP: $_CISCUP, DESCRIPCUP: $_DESCRIPCUP, CODCUP: $_CODSERTAB, VLRTOTAL: PriceTotalMask_41.value }
    ]
    console.debug($TABLAFACT);
}

function _Evaluarnitmedico_41() {
    _Nitmedico_41();
    SAL41.CONTEOMEDCIR = SAL41.CONTEOMEDCIR + 1;
    _toggleF8([
        { input: 'nitmedico', app: 'SAL41', funct: _ventanaProfesionales3_41 }
    ]);
    switch (SAL41.CONTEOMEDCIR) {
        case 1:
            _event_f3({ estado: 'on', mensaje: 'CIRUJANO' });
            break;
        case 2:
            _event_f3({ estado: 'on', mensaje: 'AYUDANTIA' });
            break;
        case 3:
            _event_f3({ estado: 'on', mensaje: 'ANESTESIA' });
            break;
        case 4:
            _event_f3({ estado: 'on', mensaje: 'MAT.QUIRURG' });
            break;
        case 5:
            _event_f3({ estado: 'on', mensaje: 'DERECH.SALA' });
            break;
    }
    console.debug(SAL41.CONTEOMEDCIR);
    if (SAL41.CONTEOMEDCIR < 4) {
        console.debug('NIT MEDICO')
        validarInputs({
            form: '#NITMEDICO_41',
            orden: '1'
        },
            () => { _Evaluarfecha2_41() },
            _validarnitmedico
        )
    } else {
        console.debug('NO NIT DEL MEDICO');
        _Aceptarhonorarioscir_SAL41();
    }
}

function _validarnitmedico() {
    _event_f3({ estado: 'off' });
    SAL41['NITMEDW'] = $('#nitmedico_SAL41').val();
    SAL41.NITMEDW = SAL41.NITMEDW.padStart(10, '0');
    switch (SAL41.CONTEOMEDCIR) {
        case 1:
            $_MEDCIRFACT = SAL41.NITMEDW.padStart(10, '0')
            break;
        case 2:
            $_MEDAYUFACT = SAL41.NITMEDW.padStart(10, '0')
            break;
        case 3:
            $_MEDANEFACT = SAL41.NITMEDW.padStart(10, '0')
            break;
    } if (parseInt(SAL41.NITMEDW) == 0) {
        CON851('01', '01', null, 'error', 'Error');
        _Evaluarnitmedico_41();
    } else if (SAL41.CONTEOMEDCIR == 1) {
        SAL41['NROCIRFACT'] = 0; SAL41['MULTFACT'] = 1; SAL41['SWBILAT'] = 'N'; SAL41['GRUPOCIRW'] = '';
        let URL = get_url("APP/SALUD/INV401M.DLL");
        postData({ datosh: datosEnvio() + $_PREFIJOFACT + $_NROCTAFACT + '|' + SAL41.LLAVEFACT + '|' + $_IDHISTORIAFACT.padStart(15, '0') + '|' + $_FECHAFACT.replace(/-/gi, '') + '|' }, URL)
            .then(data => {
                console.debug(data);
                SAL41.INV401M = data.CIRUGIAS;
                if (SAL41.INV401M[0].MULT.trim() != '') {
                    console.debug('tiene algo');
                    SAL41.MULTFACT = SAL41.INV401M[0].MULT;
                } if (SAL41.INV401M[0].GRUPO.trim() != '') {
                    console.debug('tiene algo');
                    SAL41.NROCIRFACT = SAL41.INV401M[0].GRUPO;
                }
                switch (SAL41.MULTFACT.toString()) {
                    case '1':
                        SAL41.DESCRIPMULT = 'UNILATERAL';
                        break;
                    case '2':
                        SAL41.DESCRIPMULT = 'MISMA VIA DIF. MEDICO';
                        break;
                    case '3':
                        SAL41.DESCRIPMULT = 'MISMA VIA IGUAL MEDICO';
                        break;
                    case '4':
                        SAL41.DESCRIPMULT = 'DIF. VIA DIF. MEDICO';
                        break;
                    case '5':
                        SAL41.DESCRIPMULT = 'DIF. VIA MISMO MEDICO';
                        break;
                }
                console.debug(SAL41.DESCRIPMULT);
                var ventanahonorarios_SAL41 = bootbox.dialog({
                    message: '<div class="col-12 text-center">' + SAL41.MULTFACT + ' ' + SAL41.DESCRIPMULT + '</div>',
                    closeButton: false,
                    buttons: {
                        aceptar: {
                            label: 'Aceptar',
                            className: 'btn-primary',
                            callback: function () {
                                setTimeout(_SAL41_113, 30);
                                ventanahonorarios_SAL41.on('off');
                            }
                        }
                    }
                });
                ventanahonorarios_SAL41.init($('.modal-footer').hide());
                ventanahonorarios_SAL41.on('keyup', function (e) {
                    $(".btn-primary").click();
                });
            })
            .catch(err => {
                console.debug(err);
            })
    } else {
        _SAL41_113();
    }
}

function _SAL41_113() {
    let datos_envio = datosEnvio()
    datos_envio += SAL41.ADMINW + '|' + SAL41.NITMEDW + '|';
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_113, get_url('APP/SALUD/SAL41-11.DLL'))
}

function _dataSAL41_113(data) {
    console.debug(data, 'SAL41 11_3');
    data = data.split('|');
    $_DESCRIPPROF3 = data[1].trim();
    $_ESTADOPROF3 = data[2].trim();
    $_CLPROF3 = [data[3].trim(), data[4].trim(), data[5].trim(), data[6].trim(), data[7].trim(), data[8].trim(), data[9].trim()];
    $_ESPPROF3 = [data[10].trim(), data[11].trim(), data[12].trim(), data[13].trim(), data[14].trim(), data[15].trim(), data[16].trim(), data[17].trim(), data[18].trim(), data[19].trim()]
    $_DIVPROF3 = data[20].trim();
    $_ATIENDEPROF3 = data[21].trim();
    $_ATIENDEW3 = $_PERSONALELAB3 = $_ATIENDEPROF3;
    // _validarnitmedico2();
    switch ($_CLFACT) {
        case '0':
            var k = '1';
            break;
        case '1':
            var k = '2';
            break;
        case '2':
            var k = '3';
            break;
        case '3':
            var k = '4';
            break;
        case '4':
            var k = '5';
            break;
        case '5':
            var k = '6';
            break;
        case '6':
            var k = '2';
            break;
        case '7':
            var k = '7';
            break;
    }
    if ($_CLPROF3[k] == 'N') {
        CON851('82', '82', null, 'error', 'Error');
        $('#nitmedico_SAL41').val('');
        _Evaluarnitmedico_41();
    } else {
        $_ESPECLAB = $_ESPPROF3[1]
        _Aceptarhonorarioscir_SAL41();
    }
}

function _Aceptarhonorarioscir_SAL41() {
    switch (SAL41.CONTEOMEDCIR) {
        case 1:
            if (SAL41.MULTFACT == 6) {
                $_VLRCIRUW = $_VLRCIRUW * 1.75
                console.debug($_VLRCIRUW);
            } else {
                switch (SAL41.NROCIRFACT) {
                    case '0':
                        SAL41.NROCIRFACT = 1;
                        break;
                    case '1':
                        SAL41.NROCIRFACT = 1;
                        break;
                    case '2':
                        if (SAL41.GRUPOCIRW < SAL41.GRUPOCIRFACT) {
                            CON851('01', '01', null, 'warning', 'Advertencia!');
                        }
                        switch (SAL41.MULTFACT) {
                            case 2:
                                if ($_CODTAB == 'I4') {
                                    $_VLRCIRUW = $_VLRCIRUW * 0.40;
                                    console.debug($_VLRCIRUW);
                                } else {
                                    $_VLRCIRUW = $_VLRCIRUW * 0.50;
                                    console.debug($_VLRCIRUW);
                                }
                                break;
                            case 3:
                                if ($_CODTAB == 'I4') {
                                    $_VLRCIRUW = $_VLRCIRUW * 0.55;
                                    console.debug($_VLRCIRUW);
                                } else {
                                    $_VLRCIRUW = $_VLRCIRUW * 0.50;
                                    console.debug($_VLRCIRUW);
                                }
                            case 4:
                                $_VLRCIRUW = $_VLRCIRUW * 0.50;
                                console.debug($_VLRCIRUW);
                            case 5:
                                if ($_CODTAB == 'I4') {
                                    $_VLRCIRUW = $_VLRCIRUW * 0.65;
                                    console.debug($_VLRCIRUW);
                                } else {
                                    $_VLRCIRUW = $_VLRCIRUW * 0.75;
                                    console.debug($_VLRCIRUW);
                                }
                            default:
                                $_VLRCIRUW = $_VLRCIRUW * 0.50;
                                console.debug($_VLRCIRUW);
                                break;
                        }
                }
            }
            if ($_CODTAR != 'H4') {
                if (SAL41.PUCUSU != '3') {
                    $_VALORAPROX = $_VLRCIRUW / $_SWAPR;
                    $_VLRCIRUW = $_VALORAPROX * $_SWAPR
                }
            }
            $_VLRARTW = $_VLRCIRUW;
            console.debug($_VLRARTW);
            break;
        // MOVER A LA VARIABLE QUE VA A GRABAR TABLA
        case 2:
            if (SAL41.MULTFACT == 6) {
                $_VLRAYUDW = $_VLRAYUDW * 1.75
                console.debug($_VLRAYUDW);
            } else {
                switch (SAL41.NROCIRFACT) {
                    case '0':
                        SAL41.NROCIRFACT = 1;
                        break;
                    case '1':
                        SAL41.NROCIRFACT = 1;
                        break;
                    case '2':
                        switch (SAL41.MULTFACT) {
                            case 2:
                                if ($_CODTAB == 'I4') {
                                    $_VLRAYUDW = $_VLRAYUDW * 0.40;
                                    console.debug($_VLRAYUDW);
                                } else {
                                    $_VLRAYUDW = $_VLRCIRUW * 0.50;
                                    console.debug($_VLRAYUDW);
                                }
                                break;
                            case 3:
                                if ($_CODTAB == 'I4') {
                                    $_VLRAYUDW = $_VLRAYUDW * 0.55;
                                    console.debug($_VLRAYUDW);
                                } else {
                                    $_VLRAYUDW = $_VLRAYUDW * 0.50;
                                    console.debug($_VLRAYUDW);
                                }
                            case 4:
                                $_VLRAYUDW = $_VLRAYUDW * 0.50;
                                console.debug($_VLRAYUDW);
                            case 5:
                                if ($_CODTAB == 'I4') {
                                    $_VLRAYUDW = $_VLRAYUDW * 0.65;
                                    console.debug($_VLRAYUDW);
                                } else {
                                    $_VLRAYUDW = $_VLRAYUDW * 0.75;
                                    console.debug($_VLRAYUDW);
                                }
                            default:
                                $_VLRAYUDW = $_VLRAYUDW * 0.50;
                                console.debug($_VLRAYUDW);
                                break;
                        }
                }
            }
            if ($_CODTAR != 'H4') {
                if (SAL41.PUCUSU != '3') {
                    $_VALORAPROX = $_VLRAYUDW / $_SWAPR;
                    $_VLRAYUDW = $_VALORAPROX * $_SWAPR
                }
            }
            $_VLRARTW = $_VLRAYUDW;
            console.debug($_VLRARTW);
            break;
        case 3:
            if (SAL41.MULTFACT == 6) {
                $_VLRANESW = $_VLRANESW * 1.75
                console.debug($_VLRANESW);
            } else {
                switch (SAL41.NROCIRFACT) {
                    case '0':
                        SAL41.NROCIRFACT = 1;
                        break;
                    case '1':
                        SAL41.NROCIRFACT = 1;
                        break;
                    case '2':
                        switch (SAL41.MULTFACT) {
                            case 2:
                                if ($_CODTAB == 'I4') {
                                    $_VLRANESW = $_VLRANESW * 0.40;
                                    console.debug($_VLRANESW);
                                } else {
                                    $_VLRANESW = $_VLRANESW * 0.50;
                                    console.debug($_VLRANESW);
                                }
                                break;
                            case 3:
                                if ($_CODTAB == 'I4') {
                                    $_VLRANESW = $_VLRANESW * 0.55;
                                    console.debug($_VLRANESW);
                                } else {
                                    $_VLRANESW = $_VLRANESW * 0.50;
                                    console.debug($_VLRANESW);
                                }
                            case 4:
                                $_VLRANESW = $_VLRANESW * 0.50;
                                console.debug($_VLRANESW);
                            case 5:
                                if ($_CODTAB == 'I4') {
                                    $_VLRANESW = $_VLRANESW * 0.65;
                                    console.debug($_VLRANESW);
                                } else {
                                    $_VLRANESW = $_VLRANESW * 0.75;
                                    console.debug($_VLRANESW);
                                }
                            default:
                                $_VLRANESW = $_VLRANESW * 0.50;
                                console.debug($_VLRANESW);
                                break;
                        }
                }
            }
            if ($_CODTAR != 'H4') {
                if (SAL41.PUCUSU != '3') {
                    $_VALORAPROX = $_VLRANESW / $_SWAPR;
                    $_VLRANESW = $_VLRANESW * $_SWAPR
                }
            }
            $_VLRARTW = $_VLRANESW;
            console.debug($_VLRARTW);
            break;
        case 4:
            if (SAL41.MULTFACT == 6) {
                $_VLRMATW = $_VLRMATW = $_VLRANESW * 1.75;
                console.debug($_VLRMATW);
            } else {
                if (SAL41.NROCIRFACT > 1) {
                    switch (SAL41.MULTFACT) {
                        case 2:
                            $_VLRMATW = 0;
                            break;
                        case 3:
                            $_VLRMATW = 0;
                            break;
                        case 4:
                            $_VLRMATW = $_VLRMATW * 0.75;
                            console.debug($_VLRMATW);
                        case 5:
                            $_VLRMATW = $_VLRMATW * 0.75;
                    }
                }
            }
            if ($_CODTAR != 'H4') {
                if ($_PUCUSU != 3) {
                    $_VALORAPROX = $_VLRMATW / $_SWAPR
                    $_VLRMATW = $_VALORAPROX * $_SWAPR
                }
            }
            $_VLRARTW = $_VLRMATW;
            break;
        case 5:
            $_VLRSALAW = 0;
            if (SAL41.MULTFACT == 6) {
                if ($_CODTAB == 'IS') {
                    $_VLRSALAW = $_VLRSALAW = $_VLRANESW * 1.75;
                    console.debug($_VLRSALAW);
                } else {
                    $_VLRSALAW = $_VLRSALAW = $_VLRANESW * 1.50;
                    console.debug($_VLRSALAW);
                }
            } else {
                if (SAL41.NROCIRFACT > 1) {
                    switch (SAL41.MULTFACT) {
                        case 2:
                            $_VLRSALAW = $_VLRSALAW * 0.50;
                            console.debug($_VLRSALAW);
                            break;
                        case 3:
                            $_VLRMATW = 0;
                            break;
                        case 4:
                            $_VLRSALAW = $_VLRSALAW * 0.50;
                            console.debug($_VLRSALAW);
                        case 5:
                            $_VLRSALAW = $_VLRSALAW * 0.50;
                            console.debug($_VLRSALAW);
                    }
                }
            }
            if ($_CODTAR != 'H4') {
                if ($_PUCUSU != 3) {
                    $_VALORAPROX = $_VLRSALAW / $_SWAPR
                    $_VLRSALAW = $_VALORAPROX * $_SWAPR
                }
            }
            $_VLRARTW = $_VLRSALAW;
            break;
    }
    _evaluarvlrartw_SAL41();
}

function _evaluarvlrartw_SAL41() {
    PriceTotalMask_41.typedValue = $_VLRARTW;
    validarInputs({
        form: '#VLRTOTAL_41',
        orden: '1'
    },
        function () { _Evaluarnitmedico_41() },
        () => {
            let fila = SAL41.CONTEOMEDCIR + 1;
            switch (fila) {
                case 2:
                    $('#TABLA_401 tbody tr:nth-child(' + fila + ')').html(
                        '<td>' + ' ' + '</td>' +
                        '<td>' + SAL41.NITMEDW + '</td>' +
                        '<td>' + $_DESCRIPPROF3 + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + 'CIRUJANO' + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + PriceTotalMask_41.value + '</td>'
                    )
                    break;
                case 3:
                    $('#TABLA_401 tbody tr:nth-child(' + fila + ')').html(
                        '<td>' + ' ' + '</td>' +
                        '<td>' + SAL41.NITMEDW + '</td>' +
                        '<td>' + $_DESCRIPPROF3 + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + 'AYUDANTIA' + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + PriceTotalMask_41.value + '</td>'
                    )
                    break;
                case 4:
                    $('#TABLA_401 tbody tr:nth-child(' + fila + ')').html(
                        '<td>' + ' ' + '</td>' +
                        '<td>' + SAL41.NITMEDW + '</td>' +
                        '<td>' + $_DESCRIPPROF3 + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + 'ANESTESIO' + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + PriceTotalMask_41.value + '</td>'
                    )
                    break;
                case 5:
                    $('#TABLA_401 tbody tr:nth-child(' + fila + ')').html(
                        '<td>' + ' ' + '</td>' +
                        '<td>' + SAL41.NITMEDW + '</td>' +
                        '<td>' + $_DESCRIPPROF3 + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + 'MAT.QUIRG.' + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + PriceTotalMask_41.value + '</td>'
                    )
                    break;
                case 6:
                    $('#TABLA_401 tbody tr:nth-child(' + fila + ')').html(
                        '<td>' + ' ' + '</td>' +
                        '<td>' + SAL41.NITMEDW + '</td>' +
                        '<td>' + $_DESCRIPPROF3 + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + 'DERECH.SALA' + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + ' ' + '</td>' +
                        '<td>' + PriceTotalMask_41.value + '</td>'
                    )
                    break;
            }

            _Almacenartablacirugia_SAL97C11();
            $('#vlrtotal_SAL41').val('');
            $('#nitmedico_SAL41').val('');
            if (SAL41.CONTEOMEDCIR == 5) {
                _Sumarvaloresciru_41();
            } else {
                _Evaluarnitmedico_41();
            }
        }
    )
}
function _Sumarvaloresciru_41() {
    let tabla = $('#TABLA_401 tbody tr');
    $_VALORBRUTO = 0;
    for (var i = 0; i < tabla.length; i++) {
        let cantidad = tabla[i].cells[7].textContent;
        cantidad = cantidad.replace(',', '');
        cantidad = parseFloat(cantidad);
        $.isNaN(cantidad) ? cantidad = 0 : cantidad = cantida;
        $_VALORBRUTO += cantidad;
        console.debug($_VALORBRUTO)
    }
    console.debug($_VALORBRUTO);
    switch ($_IVAARTW) {
        case '0':
            $_TARIVAW = '0';
            break;
        case '1':
            $_TARIVAW = $_IVAUSU;
            break;
        case '2':
            $_TARIVAW = $_IVA2USU;
            break;
        case '3':
            $_TARIVAW = $_IVA3USU;
            break;
    }
    if ($_ASUMEIVAUSU == 'S') {
        $_VALORBRUTO = Math.round($_VALORBRUTO / ((100 + $_TARIVAW) * 100));
    }
    switch ($_IVAARTW) {
        case '1':
            $_VALORBASE1IVA += $_VALORBRUTO;
            break;
        case '2':
            $_VALORBASE2IVA += $_VALORBRUTO;
            break;
        case '3':
            $_VALORBASE3IVA += $_VALORBRUTO;
            break;
    }
    if (((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) && ($_CLFACT == '2') && ($_GRUPOFACT == '98')) {
        $_MEDOTRFACT = SAL41.NITUSU;
    }
    if ($_CLFACT == '5') {
        if (($_ARTFACT == '39145') || ($_ARTFACT == '35604')) {
            $_SWURG = '1';
        }
    }
    $_VALORBASE1IVA = $_VALORBASE2IVA = $_VALORBASE3IVA = 0;
    $_VLRTOTEDIT = $_VALORBRUTO;
    console.debug($_SWOCULTAR);
    $_VLRIVAFACT = ($_VALORBASE1IVA * $_IVAUSU / 100) + ($_VALORBASE2IVA * $_IVAUSU2 / 100) + ($_VALORBASE3IVA * $_IVAUSU3 / 100);
    SAL41['VLRIVA1FACT'] = ($_VALORBASE1IVA * $_IVAUSU / 100);
    SAL41['VLRIVA2FACT'] = ($_VALORBASE2IVA * $_IVAUSU / 100);
    SAL41['VLRIVA3FACT'] = ($_VALORBASE3IVA * $_IVAUSU / 100);
    $_VALORDESFACT = 0;
    $_VALORTOTAL = $_VALORBRUTO + $_VLRIVAFACT - $_VALORDESFACT;
    if ($_SWOCULTAR == '01') {
        PriceTotalMask_41.typedValue = '';
        PriceivaMask_41.typedValue = '';
        NetoFactMask_41.typedValue = '';
    }
    else {
        PriceContMask_41.typedValue = $_VLRTOTEDIT;
        PriceivaMask_41.typedValue = $_VLRIVAFACT;
        NetoFactMask_41.typedValue = $_VLRIVAFACT;
        console.debug($_VLRIVAFACT, $_VLRTOTEDIT);
    }
    _Datodescto_41();
}
function _Almacenartablacirugia_SAL97C11() {
    if ($('#TABLA_401 tbody tr').length < 2) {
        $_CODSERTAB.length > 0 ? $_CODSERTAB = $_CODSERTAB : $_CODSERTAB = '';
        $_DIASTRATAFACT = '' ? $_DIASTRATAFACT = 0 : $_DIASTRATAFACT = $_DIASTRATAFACT;
        $_CODLOTEFACT = '' ? $_CODLOTEFACT = '    ' : $_CODLOTEFACT = $_CODLOTEFACT;
        $TABLAFACT = [
            { ALMAFACT: ' ', ARTFACT: SAL41.NITMEDW, CODLOTEFACT: $_CODLOTEFACT, CANTFACT: ' ', VLRFACT: ' ', DIASTRATAFACT: $_DIASTRATAFACT, VLRLATERFACT: SAL41.VLRLATERFACT, DATOSETCUP: ' ', CISCUP: ' ', DESCRIPCUP: $_DESCRIPPROF3, CODCUP: ' ', VLRTOTAL: PriceTotalMask_41.value }
        ]
        console.debug($TABLAFACT);
    } else {
        $TABLAFACT2 = { ALMAFACT: ' ', ARTFACT: SAL41.NITMEDW, CODLOTEFACT: $_CODLOTEFACT, CANTFACT: ' ', VLRFACT: ' ', DIASTRATAFACT: $_DIASTRATAFACT, VLRLATERFACT: SAL41.VLRLATERFACT, DATOSETCUP: ' ', CISCUP: ' ', DESCRIPCUP: $_DESCRIPPROF3, CODCUP: ' ', VLRTOTAL: PriceTotalMask_41.value }
        $TABLAFACT.push($TABLAFACT2);
        console.debug($TABLAFACT)
    }
}

//////////////////////////////////////// LEER  PROMEDIO /////////////////////////////
function _Leerpromedio_41() {
    if ($_GRP1SAL != '9') {
        let datos_envio = datosEnvio()
        datos_envio += $_ALMPREF + '|' + $_CODART + '|' + $_DIAFACT + '|' + SAL41.PUCUSU + '|'
        SolicitarDll({ datosh: datos_envio }, data => {
            console.debug(data, 'INV808S');
            data = data.split('|');
            $_SDOACTCANT = data[1].trim();
            $_SDOACTCANT = parseFloat($_SDOACTCANT);
            $_SDOACTVLR = data[2].trim();
            $_SDOACTVLR = parseFloat($_SDOACTVLR);
            isNaN($_SDOACTCANT) ? $_SDOACTCANT = 0 : $_SDOACTCANT = $_SDOACTCANT;
            isNaN($_SDOACTVLR) ? $_SDOACTVLR = 0 : $_SDOACTVLR = $_SDOACTVLR;
            if ((data[0].trim() == '00') || (data[0].trim() == '01')) {
                if ((parseFloat($_SDOACTCANT) == 0) || (parseFloat($_SDOACTVLR) == 0)) {
                    $_VLRPROMEDW = 0;
                } else {
                    $_VLRPROMEDW = $_SDOACTVLR / $_SDOACTCANT;
                }
            } else {
                CON852(data[0], data[1], data[2], _toggleNav);
            }
        }, get_url('APP/INVENT/INV808S.DLL'))
    }
}

//////////////////////////////////////// SUMAR VALORES /////////////////////////////
function _Sumarvalores_41() {
    let tabla = $('#TABLA_401 tbody tr');
    $_VALORBRUTO = 0;
    for (var i = 0; i < tabla.length; i++) {
        let cantidad = tabla[i].cells[6].textContent;
        cantidad = cantidad.replace(',', '');
        cantidad = parseFloat(cantidad);
        $_VALORBRUTO += cantidad;
    }
    console.debug($_VALORBRUTO);
    switch ($_IVAARTW) {
        case '0':
            $_TARIVAW = '0';
            break;
        case '1':
            $_TARIVAW = $_IVAUSU;
            break;
        case '2':
            $_TARIVAW = $_IVA2USU;
            break;
        case '3':
            $_TARIVAW = $_IVA3USU;
            break;
    }
    if ($_ASUMEIVAUSU == 'S') {
        $_VALORBRUTO = Math.round($_VALORBRUTO / ((100 + $_TARIVAW) * 100));
    }
    switch ($_IVAARTW) {
        case '1':
            $_VALORBASE1IVA += $_VALORBRUTO;
            break;
        case '2':
            $_VALORBASE2IVA += $_VALORBRUTO;
            break;
        case '3':
            $_VALORBASE3IVA += $_VALORBRUTO;
            break;
    }
    if (((SAL41.NITUSU == '0892000401') || (SAL41.NITUSU == '0900648993') || (SAL41.NITUSU == '0900755133') || (SAL41.NITUSU == '0900804411') || (SAL41.NITUSU == '0900870633')) && ($_CLFACT == '2') && ($_GRUPOFACT == '98')) {
        $_MEDOTRFACT = SAL41.NITUSU;
    }
    if ($_CLFACT == '5') {
        if (($_ARTFACT == '39145') || ($_ARTFACT == '35604')) {
            $_SWURG = '1';
        }
    }
}

///////////////////////////////////////// BUSCAR INCREMENTO ////////////////////////
function _Buscarincremento_41() {
    if ($_INCREMTAB == 0) {
        if ($_CLFACT == '7') {
            switch ($_INCREMTAB) {
                case '90':
                    $_INCREMTAB = 2;
                    break;
                case '87':
                    $_INCREMTAB = 3;
                    break;
                case '88':
                    $_INCREMTAB = 3;
                    break;
                case '89':
                    $_INCREMTAB = 5;
                    break;
                default:
                    if (parseInt($_GRUPOFACT) < 87) {
                        $_INCREMTAB = 1;
                    }
                    else {
                        $_INCREMTAB = 4;
                    }
                    break;
            }
        } else {
            $_INCREMTAB = parseInt($_CLFACT);
        }
    }
    if (($_SALMINTAR == 0) || ($.isNumeric($_SALMINTAR))) {
        $_SALMINTAR = $_SALMINW;
    }
    if (($_FORMALIQTAB == '5') || (parseInt($_FORMALIQTAB) == 0)) {
        $_FACTORW = 1;
    }
    if ($_INCREMTAB == '9') {
        $_FACTORW = 1;
    } else {
        if (SAL41.NITUSU == '0892000401') {
            let posicion = $_INCREMTAB - 1;
            // $_FACTORW = Math.round(parseFloat($_PORCTABTAR[posicion]) / 100);
            if (($_PORCTABTAR[posicion] == '') || (parseFloat($_PORCTABTAR[posicion]) == 0)) {
                $_FACTORW = 0;
                $_VALOREDIT = $_FACTORW;
            } else {
                $_FACTORW = parseFloat($_PORCTABTAR[posicion]) / 100;
                $_VALOREDIT = $_FACTORW;
            }
        }
        else {
            let posicion = parseInt($_INCREMTAB) - 1;
            if (($_PORCTABTAR[posicion] == '') || (parseFloat($_PORCTABTAR[posicion]) == 0)) {
                $_FACTORW = 0;
                console.debug($_FACTORW);
            } else {
                $_FACTORW = parseFloat($_PORCTABTAR[posicion]) / 100;
                // $_FACTORW = Math.round(parseFloat($_PORCTABTAR[posicion]) / 100);
                console.debug($_FACTORW);
            }
        }
    }
}
/////////////////////////////// LEER PROMEDIO ////////////////////////////////

// function _Leerpromedio_41() {
//     $_CODALMSAL = $_ALMPREF;
//     $_CODARTSAL = $_CODART;
//     $_CODLOTESAL = '         ';
//     $_LLAVESAL = $_CODALMSAL + $_CODARTSAL + $_CODLOTESAL;
//     if ($_GRP1SAL != '9') {
//         LLAMADO_DLL({
//             dato: [$_LLAVESAL],
//             callback: _dataINV401_14,
//             nombredll: 'INV401-14',
//             carpeta: 'SALUD'
//         })
//     }
// }
// function _dataINV401_14(data) {
//     console.debug(data, 'INV401_14');
//     var date = data.split('|');
//     var swinvalid = date[0].trim();
//     $_SDOACTVLR = date[1].trim();
//     $_SDOACTCANT = date[2].trim();
//     if (swinvalid == '00') {
//         if ((parseInt($_SDOACTCANT) == 0) && (parseInt($_SDOACTVLR) == 0)) {
//             $_VLRPROMEDW = '0';
//         }
//         else {
//             $_VLRPROMEDW = parseInt($_SDOACTVLR) / parseInt($_SDOACTCANT);
//         }
//     }
//     else if (swinvalid == '01') {

//     }
//     else {
//         CON852(date[0], date[1], date[2], _toggleNav);
//     }
// }

//////////////////////////////// CALCULAR EDAD ///////////////////////////////////////////////////////
function _Calcularedad_41() {
    $_FECHAINIW = $_NACIMPACI;
    $_FECHAACTW = $_FECHASIGATEN;
    $_ANOINIW = parseInt($_FECHAINIW.substring(0, 4));
    $_MESINIW = parseInt($_FECHAINIW.substring(4, 6));
    $_DIAINIW = parseInt($_FECHAINIW.substring(6, 8));
    $_ANOACTW = parseInt($_FECHAACTW.substring(0, 4));
    $_MESACTW = parseInt($_FECHAACTW.substring(4, 6));
    $_DIAACTW = parseInt($_FECHAACTW.substring(6, 8));
    console.debug($_MESACTW, $_MESINIW);

    if (($_MESACTW == $_MESINIW) && ($_DIAACTW == $_DIAACTW) && ($_ANOACTW > $_ANOINIW)) {
        $_UNIDEDADELAB = 'A';
        $_VLREDADELAB = $_ANOACT - $_ANOINIW;
        $_VLREDADELAB = Math.round($_VLREDADELAB);
        $_EDAD = $_UNIDEDADELAB + $_VLREDADELAB;
    }

    console.debug($_MESACTW, $_MESINIW);
    console.debug($_FECHAACTW, $_FECHAINIW);
    var mesesdias = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mesesmes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (var i = 0; i < mesesmes.length; i++) {
        if ($_MESACTW == mesesmes[i]) {
            $_NROMESW = mesesdias[i];
            console.debug($_MESACTW, mesesdias[i]);
            break;
        }
    }

    console.debug($_MESACTW, $_NROMESW);

    if (($_MESACTW > 2) && (($_ANOACTW == 1996) || ($_ANOACTW == 2000) || ($_ANOACTW == 2004) || ($_ANOACTW == 2008) || ($_ANOACTW == 2012) || ($_ANOACTW == 2016) || ($_ANOACTW == 2020) || ($_ANOACTW == 2024) || ($_ANOACTW == 2028) || ($_ANOACTW == 2032))) {
        $_NROMESW++;
    }
    console.debug($_MESACTW, $_NROMESW);
    $_NRODIASACT = ($_ANOACTW * 365.25) + $_NROMESW + $_DIAACTW;
    $_NRODIASACT = Math.round($_NRODIASACT);


    for (var i = 0; i < mesesmes.length; i++) {
        if ($_MESINIW == mesesmes[i]) {
            $_NROMESW = mesesdias[i];
            console.debug($_MESINIW, mesesdias[i]);
            break;
        }
    }

    if (($_MESINIW > 2) && (($_ANOINIW == 1996) || ($_ANOINIW == 2000) || ($_ANOINIW == 2004) || ($_ANOINIW == 2008) || ($_ANOINIW == 2012) || ($_ANOINIW == 2016) || ($_ANOINIW == 2020) || ($_ANOINIW == 2024) || ($_ANOINIW == 2028) || ($_ANOINIW == 2032))) {
        $_NROMESW = $_NROMESW + 1;
    }

    $_NRODIASINI = ($_ANOINIW * 365.25) + $_NROMESW + $_DIAINIW;
    $_NRODIASINI = Math.round($_NRODIASINI);

    console.debug($_NRODIASACT, $_NRODIASINI);

    $_NRODIASEDAD = $_NRODIASACT - $_NRODIASINI;

    if ($_NRODIASEDAD == 0) {
        $_NRODIASEDAD = 1;
    }

    else if ($_NRODIASEDAD < 30) {
        $_UNIDEDADELAB = 'D';
        $_VLREDADELAB = $_NRODIASEDAD;
        $_VLREDADELAB = Math.round($_VLREDADELAB);
        $_EDAD = $_UNIDEDADELAB + $_VLREDADELAB;
        _Calcularedad2_41();
    }
    else {
        if ($_NRODIASEDAD < 365) {
            $_UNIDEDADELAB = 'M';
            $_VLREDADELAB = $_NRODIASEDAD / 30;
            $_VLREDADELAB = Math.round($_VLREDADELAB);
            $_EDAD = $_UNIDEDADELAB + $_VLREDADELAB;
            _Calcularedad2_41();
        }
        else {
            $_UNIDEDADELAB = 'A';
            $_VLREDADELAB = $_NRODIASEDAD / 365.25;
            _Calcularedad2_41();
            $_VLREDADELAB = Math.round($_VLREDADELAB);
            $_EDAD = $_UNIDEDADELAB + $_VLREDADELAB;
            if ($_VLREDADELAB == 0) {
                $_UNIDEDADELAB = 'M';
                $_VLREDADELAB = 11;
                $_VLREDADELAB = Math.round($_VLREDADELAB);
                $_EDAD = $_UNIDEDADELAB + $_VLREDADELAB;
                _Calcularedad2_41();
            }
        }
    }
}

function _Calcularedad2_41() {
    if (($_UNIDEDADELAB == 'D') && ($_VLREDADELAB == 30)) {
        $_UNIDEDADELAB = 'M';
        $_VLREDADELAB = 1;
        $_EDAD = $_UNIDEDADELAB + $_VLREDADELAB;
    }
    if (($_UNIDEDADELAB == 'M') && ($_VLREDADELAB == 12)) {
        $_UNIDEDADELAB = 'A';
        $_VLREDADELAB = 1;
        $_EDAD = $_UNIDEDADELAB + $_VLREDADELAB;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// VENTANAS ALTERNAS //////////////////////////////////////////////////////////
function SER848() {
    var ventanaser848 = bootbox.dialog({
        size: 'small',
        title: 'LECTOR DE CEDULA',
        onEscape: true,
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_41"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "CODIGO" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datocodigo_SAL41" class="form-control input-md" data-orden="1" maxlength="15"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_41"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "CEDULA" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datocedula_SAL41" class="form-control input-md" data-orden="2" maxlength="14"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_41"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "1ER APELLIDO" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datoapellido1_SAL41" class="form-control input-md" data-orden="3" maxlength="15"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_41"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "2DO APELLIDO" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datoapellido2_SAL41" class="form-control input-md" data-orden="4" maxlength="15"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_41"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "1ER NOMBRE" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datonombre1_SAL41" class="form-control input-md" data-orden="5" maxlength="12"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_41"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "2DO NOMBRE" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datonombre2_SAL41" class="form-control input-md" data-orden="6" maxlength="12"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_41"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "SEXO" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datosexo_SAL41" class="form-control input-md" data-orden="7" maxlength="1"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_41"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "FECHA DE NACIMIENTO" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datofechadenacimiento_SAL41" class="form-control input-md" data-orden="8" maxlength="10"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_41"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "HEMOCL" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datofechadenacimiento_SAL41" class="form-control input-md" data-orden="9" maxlength="3"> ' +
            '</div> ' +
            '</div> ' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    // COMPARAR DATOS CON LOS DE DATO-CED-W
                    ventanaser848.off('show.bs.modal');
                    _Leerpaciente_41();
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    _Datopaciente2_41();
                    ventanaser848.off('show.bs.modal');
                }
            }
        }
    });
    ventanaser848.init(_evaluarSER848());
    ventanaser848.init(mascarasser848());
    ventanaser848.init($('.modal-footer').hide());
    ventanaser848.on('shown.bs.modal', function () {
        $("#datocodigo_SAL41").focus();
    });
}

function _evaluarSER848() {
    _inputControl('disabled');
    validarInputs({
        form: '#SER848_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _validarser848
    )
}

function _validarser848() {
    $_IDHISTORIAFACT = $('#datocedula_SAL41').val();
    $_IDHISTORIAFACT = $_IDHISTORIAFACT.replace(/,/g, '');
    // $('#paciente_401').val($_IDHISTORIAFACT);
    idhistoriafactMask.typedValue = $_IDHISTORIAFACT;
    $('.btn-primary').click();
}

function mascarasser848() {
    var idhistoriaser848Mask = IMask($('#datocedula_SAL41')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
    var sexoser848Mask = IMask($('#datosexo_SAL41')[0], {
        mask: 'a',
        prepare: function (str) {
            console.debug(str);
            if ((str == "F") || (str == "f") || (str == "M") || (str == "M")) {
                return str.toUpperCase();
            }
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var fechaser848Mask = IMask($('#datofechadenacimiento_SAL41')[0], {
        mask: Date,
        pattern: 'Y-m-d',
        lazy: true,
        blocks: {
            Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: '1900', to: '20' + $_ANOACT, maxLength: 4 },
            m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: '01', to: '12', maxLength: 2 },
            d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2 },
        },
        format: function (date) {
            return moment(date).format("YYYY-MM-DD");
        },
        parse: function (str) {
            var fecha = moment(str).format('YYYY-MM-DD');
            if (fecha == "Invalid date") {
                CON851('01', '01', null, 'error', 'error');
            }
            else {
                return str;
            }
        }
    });
}
///////////////////////////////////////////////////////// SER 836 ///////////////////////////////////////////////////////////////////////

// function SER836() {
//     $_IDHISTORIAFACT = '000000019460902';
//     $_FECHASIGATEN = '190421';
//     LLAMADO_DLL({
//         dato: [$_IDHISTORIAFACT, $_FECHASIGATEN, $_ADMINW],
//         callback: _dataSER836_04,
//         nombredll: 'SER836',
//         carpeta: 'SALUD'
//     });
// }

// function _dataSER836_04(data) {
//     console.debug(data, 'SER836_04');
//     data = data.split('|');
//     if ((data[0].trim() == '00') || data[1].trim() == '01') {
//         let rutaJson = get_url('temp/' + data[1].trim());
//         let json = data[1].trim();
//         SolicitarDatos(
//             null,
//             function (data) {
//                 SAL41.SER836 = data.CITAS;
//                 let arrayEliminar = [];
//                 arrayEliminar.push(json);
//                 _eliminarJson(arrayEliminar, on_eliminarJsonSER836_SAL41)
//             },
//             rutaJson
//         );
//     } else {
//         CON852(data[0], data[1], data[2], _toggleNav);
//     }

// }

// function on_eliminarJsonSER835_SAL41(data) {
//     var data = data.split('|');
//     if (data[0].trim() == '00') {
//         console.debug('json elminado');
//         _ventanaSER836_SAL41();
//     } else {
//         console.error(res[1]);
//         jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
//     }
// }




function _ventanaSER836_SAL41() {
    _ventanaDatos({
        titulo: 'CONSUTA DE CITAS',
        columnas: ["LLAVE_CIT", "HORA_CIT", "MED_CIT", "DESCRIP_TER", "OBSER_CIT", "COMPROB_CIT"],
        data: SAL41.SER836,
        callback_esc: function () {
            CON851P('04', funcancelar, _Buscarconsultas2_41);
        },
        callback: function (data) {
            CON851P('04', _Evaluaridhistoriafact_41, _Dato1_2_41);
        }
    });
}

////////////////////////////////////////////////////// SER891A ////////////////////////////////////////////////////////////////////////////
// function SER891A_41() {
//     if (($_IDHISTORIAFACT == $_MEDCITW) || ($_PUERTAESTAD == '1')) {
//         console.debug('no tiene citas');
//     }
//     else {
//         let datos_envio = datosEnvio();
//         datos_envio += '|' + $_IDHISTORIAFACT;
//         SolicitarDll({ datosh: datos_envio }, _dataSER891A_41, get_url('/SALUD/APP/SER891A.DLL'));
//     }
// }

// function _dataSER891A_41(data) {
//     data = data.split('|');
//     if (data[0].trim() == '00') {
//         console.debug(data[0].trim());
//     } else if (data[0].trim() == '9F') {
//         CON851('9F', '9F', null, 'warning', 'Advertencia!');
//     } else {
//         CON852(data[0], data[1], data[2], _toggleNav);
//     }
// }


/////////////////////////////////////////////////////// SER891AD /////////////////////////////////////////////////////////////////////////
function SER891AD_41() {
    $_HORACITFACT = ' ';
    let datos_envio = datosEnvio();
    datos_envio += SAL41.ADMINW + '|' + $_IDHISTORIAFACT;
    SolicitarDll({ datosh: datos_envio }, _dataSER891AD_41, get_url('APP/SALUD/SER891AD.DLL'));
}

function _dataSER891AD_41(data) {
    console.debug(data);
    data = data.split('|');
    let json = data[1].trim();
    // let rutaJson = get_url(json + '.JSON');
    let rutaJson = json + '.JSON';
    SolicitarDatos(
        null,
        function (data) {
            $_CITAW = data.CITAS;
            $_HORACITFACT = $_CITAW[0].HORACIT;
            let arrayEliminar = [];
            arrayEliminar.push(json);
            _eliminarJson(arrayEliminar, on_eliminarJsonCitas_41);
        },
        rutaJson
    );
}

function on_eliminarJsonCitas_41() {
    var date = data.split('|');
    if (date[0].trim() == '00') {
        for (var i in $_CITAW) {
            if ($_CITAW[i].PAC_CIT == $_IDHISTORIAFACT) {
                if ($_CITAW[i].FECHA_CIT == $_FECHAFACT) {
                    $_HORACITFACT = $_CITAW[i].HORA_CIT;
                    if (($_HORACITFACT.trim() == '') || (parseInt($_HORACITFACT) == 0)) {
                        $_HORACITFACT = moment().format('LT');
                    }
                }
            } else {
                if (($_HORACITFACT.trim() == '') || (parseInt($_HORACITFACT) == 0)) {
                    $_HORACITFACT = moment().format('LT');
                }
            }
        }
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

/////////////////////////////////////////////////// INV401D ////////////////////////////////////

function INV401D() {
    console('INV401D');
}

/////////////////////////////////////////////////// HL7001 ///////////////////////////////////////////////

function _HL7001() {
    switch (SAL41.NITUSU) {
        case '0830092718':
            $EMPRMSGL1 = 1;
            break;
        case '0830092719':
            $EMPRMSGL1 = 2;
            break;
        case '0900193162':
            $EMPRMSGL1 = 3;
            break;
        default:
            $EMPRMSGL1 = 1;
            break;
    }
    if ($_MEDOTRFACT == '3319') {
        $_SUCFACT = 'T6';
    }
    $SUCMSGL1 = $_SUCFACT;
    $CLMSGL1 = $_CLFACT;
    $NROMSGL1 = SAL41.NROFACT;
    $ITEMMSGL1 = $I;
    $PROCCL1 = '|P|';
    $VERSIONL1 = '2.6';
    $SEPL1 = '|||||';
    $PAISL1 = 'CO|';
    $ISOL1 = '8859/1';
    $FINL1 = '*';
    $NOMBRETXT = $SUCMSGL1 + $CLMSGL1 + $NROMSGL1 + $ITEMMSGL1 + $PROCCL1 + $VERSIONL1 + $SEPL1 + $PAISL1 + $ISOL1 + $FINL1;
    $NOMSALIDA = 'S:\EXPORTAR\HL7\ADT-' + $NOMBRETXT + '.HL7'
    let hora = moment().format('LTS');
    hora = hora.split(':');
    $HORAL1 = hora[0] + hora[1] + hora[2];
    let fecha = moment().format('L');
    fecha = fecha.split('/');
    $FECHAL1 = fecha[2] + fecha[1] + fecha[0];

}