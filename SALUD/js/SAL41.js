var $_NITUSU, $_LOEFARM, $_PUCUSU, $_PREFIJOUSU, $_CONTADOUSU, $_SALMINUSU, $_UNDSERVICIO, $_SERVICIO, $_SUCOPERW, $_FECHA_LNK, $_ARCHTER;
var $_BARRASUSU, $_SUC868, $_SUCFACT, $_SUCPRN, $_FECHAINGESTADO, $_FACTURAS, $_F8LITE, $_PREFIJOFACT, $_PREFIJONUM;
var $_DESCRIPTER = new Array();
var $_NOM_PAC = new Array();
var $_SECUNUM, $_SECUNUM1, $_SECUNUM2, $_TIPO_COMP = "1  ", $_NROFACT, $_OPSEGU, $_NRONUM, $_SWINVALID, $_SECUOTROS, $_NROOTROS, $_NROCTAFACT, $_LLAVESALIDANUM;
var $_FECHARETNUM, $_FECHASIGFACT, $_FECHAFACT, $_SWORDSERV, $_ARTFACT, $_MULTFACT;
var $_HORACITFACT = '';
var $_facturas_A = [], $_facturas_P = [], $_facturas_T = [];

var $_CANTMAX, $_VALORBRUTO, $_VALORBASE1IVA, $_VALORBASE2IVA, $_VALORBASE3IVA;
var SAL41 = [];
////// CANTMAX MIRAR LINEA 1929

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.cod_oper ? localStorage.cod_oper : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    // $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_NITUSU = '0800162035';
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_PREFIJOUSU = '10';
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
    _toggleF8([
        { input: 'claseservicio', app: '401', funct: _ventanaClases_41 },
        { input: 'factura', app: '401', funct: _ventanaFormapago_41 },
        { input: 'cliente', app: '401', funct: _ventanaCliente_41 },
        { input: 'paciente', app: '401', funct: _ventanaPacientes_41 },
        { input: 'codservicio1', app: '401', funct: _ventanaCodigoabreviado_41 },
        { input: 'codservicio2', app: '401', funct: _ventanaTablatarifas_41 },
        { input: 'almac', app: '401', funct: _ventanaAlmacenes_41 },
        { input: 'espec', app: '41', funct: _ventanaEspecialidades_41 },
        { input: 'ccostos', app: '41', funct: _ventanaCostos_41 },
        { input: 'atend', app: '41', funct: _ventanaProfesionales_41 },
        { input: 'solic', app: '41', funct: _ventanaProfesionales_41 },
    ]);
    _Revisardato_41();
});

///////////////////////////////// F8 /////////////////////////////////////////////////
function _ventanaClases_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["codigo", "descripcion"],
            data: $_SERVICIO_401,
            callback_esc: function () {
                $("#claseservicio_401").focus();
            },
            callback: function (data) {
                $('#claseservicio_401').val(data.codigo.trim());
                _enterInput('#claseservicio_401');
            }
        });
    }
}

function _ventanaCliente_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA ALMACENES",
            columnas: ["codigo", "descripcion"],
            data: $_SERVICIO_401,
            callback_esc: function () {
                $("#claseservicio_401").focus();
            },
            callback: function (data) {
                $('#claseservicio_401').val(data.codigo.trim());
                _enterInput('#claseservicio_401');
            }
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
                $("#factura_401").focus();
            },
            callback: function (data) {
                $('#factura_401').val(data.codigo.trim());
                _enterInput('#factura_401');
            }
        });
    }
}

function _ventanaPacientes_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite({
            titulo: 'VENTANA DE PACIENTES',
            tablaSql: 'sc_pacie',
            indice: ['cedula', 'nombre'],
            mascara: [],
            minLength: 3,
            callback_esc: function () {
                $('#paciente_401').focus();
            },
            callback: function (data) {
                // $('#paciente_401').val(data.cedula);
                console.debug(data);
                idhistoriafactMask.typedValue = data.cedula;
                $('#paciented_401').val(data.nombre);
                _enterInput('#paciente_401');
            }
        });
    }
}

function _ventanaCodigoabreviado_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite({
            titulo: 'CONSULTA POR CODIGO ABREVIADO CUPS',
            tablaSql: 'sc_cups',
            indice: ['codigo', 'descripcion'],
            mascara: [],
            minLength: 3,
            callback_esc: function () {
                $('#codservicio1_401').focus();
            },
            callback: function (data) {
                console.debug(data);
                idhistoriafactMask.typedValue = data.cedula;
                $('#codservicio1_401').val(data.nombre);
                _enterInput('#codservicio1_401');
            }
        });
    }
}

function _ventanaTablatarifas_41(e) {
    if ($_CLFACT == '0') {
        /// INV803
    }
    else {
        if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
            _ventanaDatos({
                titulo: "TABLA DE TARIFAS",
                tipo: 'mysql',
                consultaSql: "SELECT * FROM `sc_tabla` WHERE `codigo` LIKE '%" + $_CODTABW + $_CLFACT + "%'",
                // tablaSql: 'sc_tabla',
                callback_esc: function () {
                    $("#codservicio2_401").focus();
                },
                callback: function (data) {
                    $_GRUPOFACT = data.codigo.substring(3, 5);
                    $('#codservicio1_401').val(data.codigo.substring(3, 5));
                    $('#codservicio2_401').val(data.codigo.substring(5, 9));
                    _enterInput('#codservicio2_401');
                }
            });
        }
    }
}

function _ventanaAlmacenes_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TABLA DE TARIFAS",
            tipo: 'mysql',
            tablaSql: 'sc_almac',
            callback_esc: function () {
                $("#almac_401").focus();
            },
            callback: function (data) {
                $('#almac_401').val(data.codigo);
                _enterInput('#almac_401');
            }
        });
    }
}
function _ventanaEspecialidades_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TABLA DE ESPECIALIDADES",
            tipo: 'mysql',
            tablaSql: 'sc_archesp',
            callback_esc: function () {
                $("#espec_41").focus();
            },
            callback: function (data) {
                $('#espec_41').val(data.codigo);
                _enterInput('#espec_41');
            }
        });
    }
}

function _ventanaCostos_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TABLA DE CENTRO DE COSTOS",
            tipo: 'mysql',
            tablaSql: 'sc_archcos',
            callback_esc: function () {
                $("#ccostos_41").focus();
            },
            callback: function (data) {
                $('#ccostos_41').val(data.codigo);
                _enterInput('#ccostos_41');
            }
        });
    }
}

function _ventanaProfesionales_41(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TABLA DE PROFESIONALES",
            tipo: 'mysql',
            tablaSql: 'sc_archprof',
            callback_esc: function () {
                $("#atend_41").focus();
            },
            callback: function (data) {
                $('#atend_41').val(data.codigo);
                _enterInput('#atend_41');
            }
        });
    }
}
////////////////////////////// MASCARAS /////////////////////////////////////////////////



////////////////////////////////// //////////////////////////////////////////////////

function _Revisardato_41() {
    if (parseInt($_MESLNK) > 12) {
        CON851('91', '91', null, 'error', 'error');
        _toggleNav();
    }
    else if (($_NITUSU == "0844003225") || ($_NITUSU == "0845000038")) {
        $_BARRASUSU = "N";
    }
    else if ($_LOTEFARMUSU != "S" || "N") {
        if (($_PUCUSU == "4") || ($_PUCUSU == "6")) {
            $_LOTEFARM = "S";
        }
        else {
            $_LOTEFARM = "N";
        }
    }
    else if (($_PUCUSU == "4") || ($_PUCUSU == "6")) {
        if ($_CONTADOUSU == "S") {
            $_CONTADOUSU = "N";
        }
    }
    else if ((($_PUCUSU == "4") || ($_PUCUSU == "6")) && ($_CONTADOUSU == "S")) {
        $_CONTADOUSU = "S";
    }

    // $_SALMINW = Math.round($_SALMINUSU / 30);
    $_SALMINW = $_SALMINUSU / 30;

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
    console.debug($_VLRMODW);
    _Datounidad_41();
}

function _Datounidad_41() {
    let datos_envio = datosEnvio()
    SolicitarDll({ datosh: datos_envio }, _dataSER873_41, get_url('/SALUD/APP/SER873.DLL'));
    // _consultaSql({
    //     sql: 'SELECT * FROM sc_unser',
    //     callback: function (error, results, fields) {
    //         if (error) throw error;
    //         else {
    //             unidades = JSON.stringify(results);
    //             $_UNDSERVICIO_401 = JSON.parse(unidades)
    //             _UndServicio_41();
    //         }
    //     }
    // })
}

function _dataSER873_41(data){
data = data.split('|');
var json = data[1].trim();
let rutaJson = get_url('/progdatos/json/' + json + '.JSON');
if (data[0].trim() == '00'){
    SolicitarDatos(
        null,
        function (data) {
            $_UNDSERVICIO_401 = data.UNIDSERV;
            console.debug(data, json);
            let arrayEliminar = [];
            arrayEliminar.push(json);
            _eliminarJson(arrayEliminar, on_eliminarJsonTablatar_41);
            _UndServicio_41();
            console.debug('cree el json y lo elimine de unidades de servicio');
        },
        rutaJson
    );
}
else {
    CON852(data[0],data[1],data[2],_toggleNav)
}
}

function _UndServicio_41() {
    loader("hide");
    POPUP({
        array: $_UNDSERVICIO_401,
        titulo: "UNIDADES DE SERVICIO"
    },
        _evaluarSER873_41);
}

function _evaluarSER873_41(data) {
    console.debug(data);
    loader("hide");
    _inputControl('reset');
    _inputControl('disabled');

    $_UNIDADES = data.id;
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
        case "I":
        case "J":
            _Validarunidaddeservicio_41();
            break;
        default:
            _toggleNav();
            break;
    }
    $_UNSER = data.id + " " + data.descripcion;
    $_UNSERW = data.id;
    for (var i in $_UNDSERVICIO_401) {
        if ($_UNDSERVICIO_401[i].codigo == $_UNSERW) {
            $_EDADMAXSERV = $_UNDSERVICIO_401[i].edad_max;
            $_UNDEDADMAXSERV = $_EDADMAXSERV.substring(0, 1);
            $_VLREDADMAXSERV = $_EDADMAXSERV.substring(1, 4);
            $_EDADMINSERV = $_UNDSERVICIO_401[i].edad_min;
            $_UNDEDADMINSERV = $_EDADMINSERV.substring(0, 1);
            $_VLREDADMINSERV = $_EDADMAXSERV.substring(1, 4);
            $_CCOSTOSERV = $_UNDSERVICIO_401[i].costo_unid;
        }
    }
}

function _Validarunidaddeservicio_41() {
    if (($_NITUSU == "0800037021") && ($_ADMINW == "JASP") && (($_UNSERW < 10) || ($_UNSERW == "A") || ($_UNSERW == "B"))) {
        CON851('03', '03', null, 'error', 'Error');
        _UndServicio_41();
    }
    else {
        _Datosucursal_41();
    }
}

function _Datosucursal_41() {
    LLAMADO_DLL({
        dato: [$_ADMINW],
        callback: _dataCON003_01,
        nombredll: 'CON003',
        carpeta: 'CONTAB'
    });
}

function _dataCON003_01(data) {
    console.debug(data, ' CON003_01');
    var date = data.split('|');
    $_NOMBREOPERW = date[0].trim();
    $_IDENTOPERW = date[1].trim();
    $_SUCOPERW = $_NOMBREOPERW.substring(28, 30);
    // REVISAR EN JSON EL ARCHIVO DE RESTRICCION PARA VER LAS SUCURSALES
    $_SUCOPERW = '10';
    console.debug($_NOMBREOPERW, $_IDENTOPERW, $_SUCOPERW, $_NOMBREOPERW.length);
    if ($_PREFIJOUSU == "  ") {
        $_PREFIJOUSU = "00";
        _Datosucursal2_41();
    }
    else if (($_ADMINW == "GEBC") || ($_ADMINW == "ADMI")) {
        _datosucursal2();
    }
    else {
        switch ($_NITUSU) {
            // ESE SALUD YOPAL
            case "0844003225":
                if (($_SUCOPERW == "JL") || ($_SUCOPERW == "CA") || ($_SUCOPERW == "CS") || ($_SUCOPERW == "PV") || ($_SUCOPERW == "BC") || ($_SUCOPERW == "LC") || ($_SUCOPERW == "CV") || ($_SUCOPERW == "HT") || ($_SUCOPERW == "EM") || ($_SUCOPERW == "HY") || ($_SUCOPERW == "TL") || ($_SUCOPERW == "MR") || ($_SUCOPERW == "01")) {
                    $_SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    _inputControl("disabled");
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // SERVIMEDICOS
            case "0800162035":
                if (($_SUCOPERW == "01") || ($_SUCOPERW == "03") || ($_SUCOPERW == "05") || ($_SUCOPERW == "06") || ($_SUCOPERW == "07") || ($_SUCOPERW == "08") || ($_SUCOPERW == "10") || ($_SUCOPERW == "11") || ($_SUCOPERW == "12") || ($_SUCOPERW == "14") || ($_SUCOPERW == "15") || ($_SUCOPERW == "17")) {
                    $_SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    _inputControl("disabled")
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // MULTISALID VILLAVICENCIO
            case "0830511298":
                if (($_SUCOPERW == "01") || ($_SUCOPERW == "02") || ($_SUCOPERW == "03") || ($_SUCOPERW == "04") || ($_SUCOPERW == "05") || ($_SUCOPERW == "06") || ($_SUCOPERW == "07") || ($_SUCOPERW == "08") || ($_SUCOPERW == "09") || ($_SUCOPERW == "10") || ($_SUCOPERW == "11") || ($_SUCOPERW == "12") || ($_SUCOPERW == "13") || ($_SUCOPERW == "14") || ($_SUCOPERW == "15") || ($_SUCOPERW == "16") || ($_SUCOPERW == "17") || ($_SUCOPERW == "18") || ($_SUCOPERW == "19") || ($_SUCOPERW == "20")) {
                    $_SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // FAMEDIC
            case "0900405505":
                if (($_SUCOPERW == "01") || ($_SUCOPERW == "02") || ($_SUCOPERW == "03") || ($_SUCOPERW == "05") || ($_SUCOPERW == "06") || ($_SUCOPERW == "07") || ($_SUCOPERW == "08") || ($_SUCOPERW == "09")) {
                    $_SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // SOCIEDAD CARDIOLOGICA
            case "0900161116":
                if (($_SUCOPERW == "01") || ($_SUCOPERW == "02") || ($_SUCOPERW == "03") || ($_SUCOPERW == "04")) {
                    $_SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // MAVEPHARMA
            case "0830511298":
                if (($_SUCOPERW == "01") || ($_SUCOPERW == "02") || ($_SUCOPERW == "03") || ($_SUCOPERW == "04") || ($_SUCOPERW == "05") || ($_SUCOPERW == "06") || ($_SUCOPERW == "07") || ($_SUCOPERW == "10")) {
                    $_SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // ENLACE
            case "0900541158":
                if (($_SUCOPERW == "01") || ($_SUCOPERW == "02") || ($_SUCOPERW == "03") || ($_SUCOPERW == "04") || ($_SUCOPERW == "05") || ($_SUCOPERW == "06") || ($_SUCOPERW == "07") || ($_SUCOPERW == "10")) {
                    $_SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // MAVESALUD
            case "0900566047":
                if (($_SUCOPERW == "01") || ($_SUCOPERW == "02") || ($_SUCOPERW == "03") || ($_SUCOPERW == "04") || ($_SUCOPERW == "05") || ($_SUCOPERW == "06") || ($_SUCOPERW == "07") || ($_SUCOPERW == "08") || ($_SUCOPERW == "09") || ($_SUCOPERW == "10") || ($_SUCOPERW == "11") || ($_SUCOPERW == "12")) {
                    $_SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // ALBERGUE SUKURAME
            case "0900565371":
                if (($_SUCOPERW == "01") || ($_SUCOPERW == "02") || ($_SUCOPERW == "03") || ($_SUCOPERW == "04") || ($_SUCOPERW == "05") || ($_SUCOPERW == "06") || ($_SUCOPERW == "07") || ($_SUCOPERW == "10")) {
                    $_SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // IMAGENES DIAGNOSTICAS VCIO
            case "0800156469":
                if (($_SUCOPERW == "00") || ($_SUCOPERW == "01") || ($_SUCOPERW == "02") || ($_SUCOPERW == "03")) {
                    $_SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // TERAMED
            case "0900641654":
                if (($_SUCOPERW == "00") || ($_SUCOPERW == "01") || ($_SUCOPERW == "02") || ($_SUCOPERW == "03") || ($_SUCOPERW == "04")) {
                    $_SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // TERAMED
            case "0800037979":
                if (($_SUCOPERW == "00") || ($_SUCOPERW == "01") || ($_SUCOPERW == "02") || ($_SUCOPERW == "03") || ($_SUCOPERW == "04")) {
                    $_SUCOPERW = $_PREFIJOUSU;
                    _Datosucursal2_41();
                }
                else {
                    CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
                }
                break;
            // SIKUANI
            case "0830512772":
                if (($_SUCOPERW == "01") || ($_SUCOPERW == "02") || ($_SUCOPERW == "03") || ($_SUCOPERW == "04") || ($_SUCOPERW = "05") || ($_SUCOPERW = "06") || ($_SUCOPERW = "07") || ($_SUCOPERW = "08") || ($_SUCOPERW = "09") || ($_SUCOPERW = "10") || ($_SUCOPERW = "11") || ($_SUCOPERW = "12") || ($_SUCOPERW = "13") || ($_SUCOPERW = "14") || ($_SUCOPERW = "15") || ($_SUCOPERW = "16") || ($_SUCOPERW = "17") || ($_SUCOPERW = "18") || ($_SUCOPERW = "19") || ($_SUCOPERW = "20") || ($_SUCOPERW = "21") || ($_SUCOPERW = "22") || ($_SUCOPERW = "23") || ($_SUCOPERW = "24") || ($_SUCOPERW = "25") || ($_SUCOPERW = "26") || ($_SUCOPERW = "27") || ($_SUCOPERW = "28") || ($_SUCOPERW = "29") || ($_SUCOPERW = "30") || ($_SUCOPERW = "31") || ($_SUCOPERW = "32") || ($_SUCOPERW = "33") || ($_SUCOPERW = "34") || ($_SUCOPERW = "35") || ($_SUCOPERW = "36") || ($_SUCOPERW = "37") || ($_SUCOPERW = "38") || ($_SUCOPERW = "39") || ($_SUCOPERW = "40") || ($_SUCOPERW = "41") || ($_SUCOPERW = "42") || ($_SUCOPERW = "43") || ($_SUCOPERW = "44") || ($_SUCOPERW = "45") || ($_SUCOPERW = "46") || ($_SUCOPERW = "47") || ($_SUCOPERW = "48") || ($_SUCOPERW = "49") || ($_SUCOPERW = "50")) {
                    $_SUCOPERW = $_PREFIJOUSU;
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
    $_SUCFACT = $_PREFIJOUSU;
    if (($_NITUSU == "0800162035") && ($_PREFIJOUSU == "08")) {
        $_ALMPREF = "SIN99";
    }
    else if (($_NITUSU == "0830092718") || ($_NITUSU == "0830092719") || ($_NITUSU == "0900193162")) {
        RX_822_41();
    }
    else if (($_NITUSU == "0844003225") && ($_SUCOPERW == "  ")) {
        _Evaluarsuc_41("1");
    }
    else if ($_NITUSU == '0844003225') {
        if (($_SUCOPERW == "JL") || ($_SUCOPERW == "CA") || ($_SUCOPERW == "CS") || ($_SUCOPERW == "PV") || ($_SUCOPERW == "BC") || ($_SUCOPERW == "LC") || ($_SUCOPERW == "CV") || ($_SUCOPERW == "HT") || ($_SUCOPERW == "EM") || ($_SUCOPERW == "HY") || ($_SUCOPERW == "TL") || ($_SUCOPERW == "MR") || ($_SUCOPERW == "01")) {
            // CONTINUE
        }
        else {
            CON851('48', '48', null, 'error', 'Error');
            _toggleNav();
        }
    }
    else if ($_NITUSU == '0830512772') {
        LLAMADO_DLL({
            dato: [$_ADMINW],
            callback: _dataINV401_09,
            nombredll: 'INV401_09',
            carpeta: 'SALUD'
        })
    }
    else {
        _Evaluarservicio_41();
    }
    $("#unidades_401").val($_SUCFACT);
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
            if ((admin_w == "0101") || (admin_w == "GEBC") || ($_SUCOPERW == "**")) {
                $_RX822 = $_SUCFACT;
                $_RX822 = $_SUCPRN;
            }
            else {
                if ($_RX822 != $_SUCOPERW) {
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
    if ($_NITUSU == "0800156469") {
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
            form: "#SERVICE_401",
            orden: "1"
        },
        function () { _Revisardato_41() },
        _validarservicio
    )
}

function _validarservicio() {
    $_CLFACT = clfactMask.value;
    $_CLFACT = $_CLFACT.substring(0, 1);
    if ($_CLFACT.length > 0) {
        for (i = 0; i < $_SERVICIO_401.length; i++) {
            if ($_CLFACT == $_SERVICIO_401[i].codigo.trim()) {
                $("#claseservicio_401").val($_SERVICIO_401[i].codigo + " - " + $_SERVICIO_401[i].descripcion);
                _Mostrartipo_41();
                break;
            }
        }
    }
    else {
        CON851('03', '03', null, 'error', 'error');
        _Evaluarservicio_41();
    }
}

function _Mostrartipo_41() {
    if ($_UNSERW == "08") {
        if (($_CLFACT == "0") || ($_CLFACT == "7")) {
            _Revisarpermisos_41();
        }
        else {
            CON851('B1', 'B1', null, 'error', 'error');
            _Evaluarservicio_41();
        }
    }
    else {
        _Revisarpermisos_41();
    }
}

function _Revisarpermisos_41() {
    if (($_CLFACT == "0") && (($_NITUSU == "0892000401") || ($_NITUSU == "0900648993") || ($_NITUSU == "0800162035") || ($_NITUSU == "0900755133") || ($_NITUSU == "0900804411") || ($_NITUSU == "0900870633")) && (parseInt($_SUCFACT) < 2)) {
        $_SWBLOQFECHA = "S";
        if ((parseInt($_CLFACT) > 0)) {
            $_CANTMAX = "99";
            _infoCON904_01_41();
        }
    }
    else if ((($_NITUSU == "0891855847")) && (parseInt($_CLFACT) > 0)) {
        $_CANTMAX = "99";
        _infoCON904_01_41();
    }
    else {
        $_SWBLOQFECHA = "N";
        _infoCON904_01_41();
    }
}

function _infoCON904_01_41() {
    $_OPSEGU = "I41" + $_CLFACT;
    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904_01_41,
        nombredll: 'CON904',
        carpeta: 'CONTAB'
    });
}
function _dataCON904_01_41(data) {
    console.debug(data, "CON904-01");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _Buscarnumero_41();
    }
    else {
        // NO TIENE PERMISOS
        _UndServicio_41();
    }
}

function _Buscarnumero_41() {
    if (($_NITUSU == "0830092718") || ($_NITUSU == "0830092719") || ($_NITUSU == "0900193162")) {
        $_SECUNUM2 = $_CLFACT;
        var contenido = ["KN", "TB", "ZP", "IN", "SO", "SC", "GT", "MS", "UN", "80", "MA", "CZ", "CE", "CH", "MD", "PT"];
        var secunum = ["K", "t", "z", "x", "s", "c", "g", "m", "u", "0", "m", "k", "l", "h", "d", "P"];
        for (i = 0; i < contenido.length; i++) {
            console.debug("estoy aca");
            if ($_SUCFACT == contenido[i]) {
                $_SECUNUM1 = secunum[i];
                _infoCON007_01_41();
                break;
            }
            if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                $_SECUNUM1 = "8";
                _infoCON007_01_41();
                break;
            }
        }
    }
    else {
        $_SECUNUM2 = $_CLFACT;
        if ($_TIPO_COMP == "3  ") {
            $_SECUNUM1 = "6";
            $_SECUNUM = $_SECUNUM1 + $_SECUNUM2;
            _Evaluarnit_41();
        }
        else {
            $_SECUNUM1 = "8";
            $_SECUNUM = $_SECUNUM1 + $_SECUNUM2;
            _Evaluarnit_41();
        }
    }
}
function _Evaluarnit_41() {
    switch ($_NITUSU) {
        case "0844003225":
            var contenido = ["01", "JL", "CA", "BC", "CV", "PV", "CS", "HY", "TL", "MR"];
            var secunum = ["8", "a", "c", "b", "v", "p", "s", "h", "i", "j"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                    _infoCON007_01_41();
                    break;
                }
                else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                    _infoCON007_01_41();
                    break;
                }
            }
            break;
        case "0800162035":
            var contenido = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
            var secunum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s"];
            for (i = 0; i < contenido.length; i++) {
                if ($_SUCFACT == contenido[i]) {
                    $_SECUNUM1 = secunum[i];
                    _infoCON007_01_41();
                    break;
                }
                else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                    _infoCON007_01_41();
                    break;
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
                    break;
                }
                else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                    _infoCON007_01_41();
                    break;
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
                    break;
                }
                else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                    _infoCON007_01_41();
                    break;
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
                    break;
                }
                else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                    _infoCON007_01_41();
                    break;
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
                    break;
                }
                else if ((contenido.length - 1 == i) && ($_SECUNUM1 == " ")) {
                    $_SECUNUM1 = " ";
                    _infoCON007_01_41();
                    break;
                }
            }
        default:
            _infoCON007_01_41();
    }
}

function _infoCON007_01_41() {
    $_SECUNUM = $_SECUNUM1 + $_SECUNUM2;
    LLAMADO_DLL({
        dato: [$_SECUNUM],
        callback: _dataCON007_01_41,
        nombredll: 'CON007',
        carpeta: 'CONTAB'
    });
}

function _dataCON007_01_41(data) {
    console.debug(data, "CON007_01");
    var date = data.split("|");
    $_NUMEROCTL = date[3].trim();
    $_ULTFECHANUM = date[2].trim();
    $_NROFACT = $_NUMEROCTL;
    if (($_NITUSU == "0900193162") || ($_NITUSU == "0830512772")) {
        _Leernumero_41();
    }
    else {
        if (parseInt($_NUMEROCTL) < 1000) {
            $_LLAVEFACT = $_SUCFACT + $_CLFACT + $_NROFACT;
            $_LLAVEFACTLNK = $_LLAVEFACT;
            LLAMADO_DLL({
                dato: [$_LLAVEFACTLNK],
                callback: _dataINV401C_01_41,
                nombredll: 'INV401C',
                carpeta: 'SALUD'
            });
        }
        else {
            $_FECHAANT = $_ULTFECHANUM
            $("#compr_401").val($_NUMEROCTL);
            _Leernumero_41();
        }
    }
}
function _dataINV401C_01_41(data) {
    console.debug(data, "INV401C_01");
    var date = data.split("|");
    $_NUMEROFACTLNK = date[1].trim();
    $_FECHAANT = $_ULTFECHANUM;
    if (date[0].trim() == "00") {
        if (parseInt($_NUMEROCTL) < $_NUMEROFACTLNK) {
            $_NUMEROCTL = $_NROFACTLNK;
        }
        _Leernumero_41();
    }
    else {
        // CON852(date[0], date[1], date[2], _toggleNav);
        // FALTA FACTURACION DE SERVICIOS
        _Leernumero_41();
    }
}

function _Leernumero_41() {
    if (($_NITUSU == "0891855847") && ($_ANOLNK == "10")) {
        _Evaluarnumeroctl_41();
    }
    else {
        $("#compr_401").val($_NROFACT);
        // _validarnumeroctl();
        // validacion factura de servicios linea 2294
        _Encabezar_41();
    }
}
function _Evaluarnumeroctl_41() {
    validarInputs(
        {
            form: "#COMPR_401",
            orden: "1"
        },
        function () { _Evaluarservicio_41() },
        _validarnumeroctl
    )
}
function _validarnumeroctl() {
    let datos_envio = datosEnvio()
        + '|' + $_NROFACT.padStart(6, '0');
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_01, get_url('/SALUD/APP/SAL41-01.DLL'));
}
function _dataSAL41_01(data) {
    console.debug(data, "SAL41-01");
    var date = data.split("|");
    if (date[0].trim() == "00") {
        $_NUMEROCTL = parseInt($_NUMEROCTL) + 1;
        $_NUMEROCTL = $_NUMEROCTL.padStart(6, '0');
        _Leernumero_41();
    }
    else if (date[1].trim() == "01") {
        _Encabezar_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
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
            $_DIAANT = $_FECHAANT.substring(4, 6);
            $_MESFACT = $_FECHAFACT.substring(2, 4);
            $_DIAFACT = $_FECHAFACT.substring(4, 6);
            if ($_ANOACT == $_ANOFACT) {
                $_DIFACT = $_DIAACT;
                _Encabezar2_41();
            }
            else {
                $_DIAFACT = $_DIAANT;
                _Encabezar2_41();
            }
        }
        else {
            /// linea 2307
            _toggleNav();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }
}
function _Encabezar2_41() {
    $_UNSERVFACT = $_UNSERW
    if (($_NITUSU == "0900541158") || ($_NITUSU == "0900566047") || ($_NITUSU == "0900565371") || ($_NITUSU == "0901120152")) {
        _infoSER865A_41();
        // CALL SER865A
    }
    else {
        _Validarclfact_41();
    }
}
function _infoSER865A_41() {
    var dispensacion = '[{"COD": "1", "DESCRIP": "NORMAL"},{"COD": "2","DESCRIP": "AUTOMATICA"}]'
    var dispensaciones = JSON.parse(dispensacion);
    var titulo = 'Facturacion';
    POPUP({
        array: dispensaciones,
        titulo: titulo
    },
        _evaluarSER865A_41);

}
function _evaluarSER865A_41(data) {
    loader('hide');
    _inputControl('disabled');
    $_FACTAUTOFACT = data.id;
    switch (parseInt(data.id)) {
        case 1:
        case 2:
            _Validarclfact_41();
            break;
        default:
            _toggleNav();
            break;
    }
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
    var medicamento = '[{"codigo": "1","descripcion": "VENTA DROGA"},{"codigo": "2", "descripcion": "DEVOLUCION DROGA"},{"codigo": "3","descripcion": "PENDIENTE DROGA"}]'
    var medicamentos = JSON.parse(medicamento);
    var titulo = 'Facturacion';
    POPUP({
        array: medicamentos,
        titulo: titulo
    },
        _evaluarSER865_41);
}
function _evaluarSER865_41(data) {
    loader('hide');
    _inputControl('disabled');
    $_TIPODRFACT = data.id;
    switch (parseInt(data.id)) {
        case 1:
        case 2:
        case 3:
            $_OPSEGU = "I410" + $_TIPODRFACT;
            LLAMADO_DLL({
                dato: [$_ADMINW, $_OPSEGU],
                callback: _dataCON904_02_41,
                nombredll: 'CON904',
                carpeta: 'CONTAB'
            });
            break;
        default:
            _Encabezar_41();
            break;
    }
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
    var date = data.split("|");
    _toggleNav();
}

function _Controldispensacion_41() {
    if (parseInt($_CLFACT) > 0) {
        _Evaluarfecha_41();
    }
    else {
        if ((($_UNSERW == "02") || ($_UNSERW == "08")) && ($_NITUSU != "0892000458")) {
            _Evaluarfecha_41();
        }
        else {
            _Evaluarfecha_41();
        }
    }
}

function _Evaluarfecha_41() {
    validarInputs(
        {
            form: "#FECHA_401",
            orden: "1"
        },
        function () { _Revisardato_41() },
        _Controlfecha_41
    )
    _MaskDate_41();
    fechaMask.updateValue();
}

function _Controlfecha_41() {
    $_FECHAFACT = $("#fecha_401").val();
    $_ANOFAC = $_FECHAFACT.substring(2, 4);
    $_MESFACT = $_FECHAFACT.substring(5, 7);
    $_DIAFACT = $_FECHAFACT.substring(8, 10);
    $_FECHASIGFACT = moment($_FECHAFACT).format("YYYYMMDD");
    $_ANOSIGFACT = $_FECHASIGFACT.substring(0, 4);
    $_MESSIGFACT = $_FECHASIGFACT.substring(4, 6);
    $_DIASIGFACT = $_FECHASIGFACT.substring(6, 8);
    var after = moment($_FECHAFACT).isAfter($_FECHAACT);
    if (($_CLFACT == "4") || ($_CLFACT == "5")) {
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
            if ((($_NITUSU == "0830092718") || ($_NITUSU == "0830092719") || ($_NITUSU == "0892000401") || ($_NITUSU == "0900648993") || ($_NITUSU == "0900193162") || ($_NITUSU == "0900755133") || ($_NITUSU == "0900804411") || ($_NITUSU == "0900870633") || ($_NITUSU == "0900658867")) && (after == true)) {
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
    if (($_NITUSU == "0800162035") || ($_NITUSU == "0845000038") || ($_NITUSU == "0892000401") || ($_NITUSU == "0900870633")) {
        _Evaluarfechaatencion_41();
    }
    else {
        if ($_UNSERW == "01") {
            $_FECHAINGESTAD = $_FECHAFACT;
            $_HORAATENESTAD = moment().format('LT');
            _Evaluarprefijofact_41();
        }
        else {
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
            '<div class="col-md-6" id="FECHAATENCION_401"> ' +
            '<input id="fechaatencion_401" type="text" class="form-control input-md" data-orden="1" maxlength="16"> ' +
            '<span class="help-block">' + 'YYYY-MM-DD HH:mm' + '</span> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                callback: function () {
                    _Evaluarprefijofact_41();
                    ventanafechaatencion.off('show.bs.modal');
                }
            }
        }
    });
    ventanafechaatencion.on('shown.bs.modal', function () {
        $("#fechaatencion_401").focus();
    });
    ventanafechaatencion.init(_Evaluarventanaatencion_41());
    ventanafechaatencion.init($('.modal-footer').hide());
    var DateAttentionMask = IMask($("#fechaatencion_401")[0], {
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
        form: '#FECHAATENCION_401',
        orden: "1"
    },
        function () { _Evaluarfecha_41() },
        _Validarventanaatencion_41
    )
}
function _Validarventanaatencion_41() {
    $_FECHAINGESTAD = $("#fechaatencion_401").val();
    $_FECHAINGW = $_FECHAINGESTAD;
    $('.btn-primary').click();
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
        form: '#FACTURA_401',
        orden: "1"
    },
        function () { _Evaluarfecha_41() },
        _Validarprefijofact_41
    )
}
function _Validarprefijofact_41() {
    $_PREFIJOFACT = $("#factura_401").val();
    $_PREFIJOFACT = $_PREFIJOFACT.substring(0, 1);
    if ((($_NITUSU == "0830092718") || ($_NITUSU == "0830092719") || ($_NITUSU == "0900193162") || ($_NITUSU == "0892000401") || ($_NITUSU == "0900648993") || ($_NITUSU == "0900755133") || ($_NITUSU == "0900870633") || ($_NITUSU == "0900804411")) && (($_PREFIJOFACT == "C") || ($_PREFIJOFACT == "E"))) {
        CON851('49', '49', null, 'error', 'error');
        $('#factura_401').val('');
        _Evaluarprefijofact_41();
    }
    else if (($_PREFIJOFACT.trim() == "") || (parseInt($_PREFIJOFACT) == 0)) {
        $("#factura_401").val('');
        _Evaluarprefijofact_41();
    }
    else {
        _Ubicarcuenta_41();
    }
}
function _Ubicarcuenta_41() {
    if (($_PREFIJOFACT == "E") || ($_PREFIJOFACT == "C")) {
        $_ESTADONUM = "0";
        $_CONVENIONUM = "CL";
        // $_NITCTAW = $_NITNUM;
        $_DESCRIPNUM = " ";
        $_TIPOPACINUM = "*";
        $_FORMACOPAGNUM = "1"
        console.debug($_CONVENIONUM, $_ESTADONUM);
        if ($_PREFIJOFACT == "E") {
            $_OPSEGU = "89";
            LLAMADO_DLL({
                dato: [$_OPSEGU],
                callback: _dataCON007_02_41,
                nombredll: 'CON007',
                carpeta: 'CONTAB'
            });
        }
        else if ($_PREFIJOFACT == "C") {
            $_OPSEGU = "96"
            LLAMADO_DLL({
                dato: [$_OPSEGU],
                callback: _dataCON007_02_41,
                nombredll: 'CON007',
                carpeta: 'CONTAB'
            });
        }
    }
    else {
        _Evaluarnrofact_41();
    }
}

function _dataCON007_02_41(data) {
    console.debug(data, "CON007-02");
    var date = data.split("|");
    $_NUMEROCTL2 = date[3].trim();
    $_ULTFECHANUM2 = date[2].trim();
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if (($_NITUSU == "0891855847") && ($_ANOLNK == "10")) {
            _Evaluarnrofact_41();
        }
        else {
            $("#facturad_401").val($_NUMEROCTL2);
            _Leerconvenio_41();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Evaluarnrofact_41() {
    validarInputs({
        form: '#FACTURAD_401',
        orden: "1"
    },
        function () { _Evaluarfecha_41() },
        _Validarnrofact_41
    )
}

function _Validarnrofact_41() {
    $_NROCTAFACT = $('#facturad_401').val();
    if (parseInt($_NROCTAFACT) == 0) {
        _Evaluarnrofact_41();
        $('#facturad_401').val('');
    }
    else {
        let datos_envio = datosEnvio()
            + '|' + $_PREFIJOFACT
            + '|' + $_NROCTAFACT.padStart(6, '0');
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_02, get_url('/SALUD/APP/SAL41-02.DLL'));
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
    // $_PORCAVISOCNCAP = date[30].trim();
    if (date[0].trim() == "00") {
        _Leercuenta_41();
    }
    else if (date[0].trim() == "01") {
        CON851('01', '01', null, 'error', 'error');
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Leercuenta_41() {
    if ($_NITUSU == "0844003225") {
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
    if ((($_NITUSU == "0800037021") || ($_NITUSU == "0800162035")) && (($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "T"))) {
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
                $('#facturad_401').val('');
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
                    $("#facturad_401").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "1":
                if ($_CONTROLCL1NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_401").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "2":
                if ($_CONTROLCL2NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_401").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "3":
                if ($_CONTROLCL3NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_401").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "4":
                if ($_CONTROLCL4NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_401").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "5":
                if ($_CONTROLCL5NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_401").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "6":
                if ($_CONTROLCL6NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_401").val("");
                    _Evaluarnrofact_41();
                }
                else {
                    _Leercuenta4_41();
                }
                break;
            case "7":
                if ($_CONTROLCL7NUM == "N") {
                    CON851('7U', '7U', null, 'error', 'error');
                    $("#facturad_401").val("");
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
            $("#facturad_401").val("");
            _Evaluarnrofact_41();
        }
    }
    else {
        if ($_FECHASIGFACT < $_FECHAINGNUM) {
            CON851('91', '91', null, 'error', 'error');
            $("#facturad_401").val("");
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
        $("#facturad_401").val("");
        _Evaluarnrofact_41();
    }
    else if ($_ESTADONUM == "1") {
        CON851('13', '13', null, 'error', 'error');
        $("#facturad_401").val("");
        _Evaluarnrofact_41();
    }
    else if ($_ESTADONUM == "2") {
        CON851('13', '13', null, 'error', 'error');
        $("#facturad_401").val("");
        _Evaluarnrofact_41();
    }
    else if ($_ESTADONUM == "3") {
        CON851('13', '13', null, 'error', 'error');
        $("#facturad_401").val("");
        _Evaluarnrofact_41();
    }
    else if (($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "T")) {
        if (($_NITUSU == "0830092718") || ($_NITUSU == "0830092719") || ($_NITUSU == "0900193162")) {
            _Leercuenta6_41();
        }
        else {
            $_IDHISTORIAFACT = $_IDPACNUM;
            _Leercuenta6_41();
        }
    }
    else {
        if ($_NITUSU == "0800251482") {
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
            $("#facturad_401").val("");
            _Evaluarnrofact_41();
        } else {
            if (parseFloat($_PORCENTCONTW) >= 90) {
                CON851('9C', '9C', null, 'error', 'error');
                $("#facturad_401").val("");
                _Evaluarnrofact_41();
            } else {
                if (parseFloat($_PORCENTCONTW) >= 90) {
                    CON851('9B', '9B', null, 'error', 'error');
                    $("#facturad_401").val("");
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
    $_PREFIJOFACT = $('#factura_401').val();
    $_NROCTAFAC = $('#facturad_401').val();
    if ($_PREFIJOFACT == "E") {
        if ($_MESFACT == $_MESACT) {
            let datos_envio = datosEnvio()
                + '|' + $_CONVENIONUM
                + '|' + $_PREFIJOFACT
                + '|' + $_NROFACT;
            SolicitarDll({ datosh: datos_envio }, _dataSAL41_03, get_url('/SALUD/APP/SAL41-03.DLL'));
        }
        else {
            CON851('91', '91', null, 'error', 'error');
            $("#facturad_401").val("");
            _Evaluarnrofact_41();
        }
    }
    else {
        let datos_envio = datosEnvio()
            + '|' + $_CONVENIONUM
            + '|' + $_PREFIJOFACT
            + '|' + $_NROFACT;
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_03, get_url('/SALUD/APP/SAL41-03.DLL'));
    }
}
function _dataSAL41_03(data) {
    console.debug(data, "SAL41-03");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    $_CODTAR = date[1].trim();
    $_DESCRIPTAR = date[2].trim();
    $("#convenio_401").val($_CODTAR + " - " + $_DESCRIPTAR);
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
    $_FACTCAPITNUM = date[14].trim();
    $_PRECAPITNUM = $_FACTCAPITNUM.substring(0, 1);
    $_NROCAPITNUM = $_FACTCAPITNUM.substring(1, 6);
    $_NITNUM = date[15].trim();
    $_NITCTAW = $_NITNUM;
    $_FECHAINGNUM = date[16].trim();
    $_REDEXTERNUM = date[17].trim();
    $_HNQUIRTAR = date[18].trim();
    if ($_HNQUIRTAR.trim() == '') {
        $_HNQUIRTAR = '000000.00';
    }
    $_HNQUIRTAR = parseFloat($_HNQUIRTAR);
    $_CISNUM = date[19].trim();
    $_PORCTABTAR = [date[20].trim(), date[21].trim(), date[22].trim(), date[23].trim(), date[24].trim(), date[25].trim()];
    $_LLAVENUM = date[26].trim();
    $_HNAYUDTAR = date[27].trim();
    $_HNANESTAR = date[28].trim();
    let json = date[29].trim();
    let rutaJson = get_url('/progdatos/json/' + json + '.JSON');
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
        $("#convenio_401").val('');
        _Evaluarnrofact_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function on_eliminarJsonTablatar_41(data) {
    console.debug(data);
    var date = data.split('|');
    // date[0].trim() == '00' ? console.debug('json eliminado') : jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
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
    LLAMADO_DLL({
        dato: [$_NITCTAW2, $_DESCRIPNUM],
        callback: _dataSER210A_01_41,
        nombredll: 'SER210A',
        carpeta: 'SALUD'
    });
}

function _dataSER210A_01_41(data) {
    console.debug(data, "SER210A_01", 'revisar');
    SER822_41();
}

function SER822_41() {
    var puertasingreso = '[{"codigo": "1", "descripcion": "URGENCIAS"},{"codigo": "2","descripcion": "C EXTERNA"},{"codigo": "3","descripcion": "REMITIDO"},{"codigo": "4","descripcion": "NACID INS"}]'
    var puertaingreso = JSON.parse(puertasingreso);
    var titulo = 'PUERTA DE INGRESO';
    POPUP({
        array: puertaingreso,
        titulo: titulo
    },
        _evaluarSER822_41);

}
function _evaluarSER822_41(data) {
    loader('hide');
    _inputControl('disabled');
    $_PUERTAINGW = data.id;
    switch (parseInt(data.id)) {
        case 1:
        case 2:
        case 3:
        case 4:
            _Validarpuertaingreso_41();
            break;
        default:
            _toggleNav();
            break;
    }
    $("#pingreso_401").val(data.id + " - " + data.descripcion);
}

function _Validarpuertaingreso_41() {
    if ($_PUERTAINGW == 2) {
        if (($_UNSERW != 02) || ($_UNSERW != 08)) {
            _Ubicarcliente_41();
        }
        else {
            CON851('03', '03', null, 'error', 'error');
            SER822_41();
        }
    }
    else if (($_UNSERW == "01") && ($_PUERTAINGW == 2)) {
        CON851('03', '03', null, 'error', 'error');
        SER822_41();
    }
    else if ((($_NITUSU == "0830092718") || ($_NITUSU == "0830092719") || ($_NITUSU == "0900193162")) && (($_NITUSU == "0830092718") || ($_NITUSU == "0830092719") || ($_NITUSU == "0900193162"))) {
        // GO TO DATO-BARRAS-PROMO
    }
    else {
        $_SWBONO = "0";
        _Ubicarcliente_41();
    }
}

function _Ubicarcliente_41() {
    if (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) {
        _Mostrarcliente_41();
    }
    else if ($_PREFIJOFACT == "E") {
        if ($_NITUSU == "0800162035") {
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
    $_NITFACT == '' ? clienteMask.typedValue = '' : clienteMask.typedValue = $_NITFACT;
    validarInputs({
        form: '#CLIENTE_401',
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
        $('#cliente_401').val('');
        _Evaluarcliente_41();
    }
    else {
        let datos_envio = datosEnvio()
            + '|' + $_NITFACT;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_04, get_url('/SALUD/APP/SAL41-04.DLL'));
    }
}

function _dataSAL41_04(data) {
    console.debug(data, "sal41-04");
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
                        $("#cliente_401").val("");
                        _Evaluarcliente_41();
                    }
                case "6":
                    if ($_ACTTER == "27") {
                        _Mostrarcliente_41();
                    }
                    else {
                        CON851('14', '14', null, 'error', 'Error');
                        $("#cliente_401").val("");
                        _Evaluarcliente_41();
                    }
                default:
                    if (($_ACTTER == "27") || ($_ACTTER == "30")) {
                        _Mostrarcliente_41();
                    }
                    else {
                        CON851('14', '14', null, 'error', 'Error');
                        $("#cliente_401").val("");
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
    bootbox.dialog({
        message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Actualización Maestro de terceros...</div>',
        closeButton: false
    });
    setTimeout(_Actualizacionmaestros_41, 50);
}

function _Actualizacionmaestros_41() {
    ipcRenderer.send('another', 'SALUD/PAGINAS/CON110C.html');
}

function _Mostrarcliente_41() {
    if (parseInt($_NITFACT) == 0) {
        $('#cliented_401').val('');
        _Evaluarcliente_41();
    }
    else {
        LLAMADO_DLL({
            dato: [$_NITFACT],
            callback: _dataINV401_06_02_41,
            nombredll: 'INV401-06',
            carpeta: 'SALUD'
        });
    }
}
function _dataINV401_06_02_41(data) {
    console.debug(data, "INV401-06");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    var swinvalid1 = date[1].trim();
    $_DESCRIPTER = date[2].trim();
    $_ACTTER = date[3].trim();
    $_ENTIDADTER = date[4].trim();
    if (swinvalid == "00") {
        if (swinvalid1 == "00") {
            if ($_DESCRIPNUM.trim() == '') {
                // $('#cliente_401').val($_NITFACT);
                $('#cliented_401').val($_DESCRIPTER);
                _Calcularmes_41();
            }
            else {
                // $('#cliente_401').val($_NITFACT);
                $('#cliented_401').val($_DESCRIPNUM);
                _Calcularmes_41();
            }
        }
        else {
            _Crearcliente_41();
        }
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
    $_HRELABFACT = "02";
    $_MNELABFACT = "00";
    $_ANOINGNUM = $_FECHAINGNUM.substring(2, 4);
    $_MESINGNUM = $_FECHAINGNUM.substring(4, 6);
    $_DIAINGNUM = $_FECHAINGNUM.substring(6, 8);

    $_ANOSIGFACT = $_FECHASIGFACT.substring(0, 4);
    $_MESSIGFACT = $_FECHASIGFACT.substring(4, 6);
    $_DIASIGFACT = $_FECHASIGFACT.substring(6, 8);
    $_HORASINGW = ((((parseInt($_ANOINGNUM) * 365.25) + 24)) + ($_NROMESW1 * 24) + (parseInt($_DIAINGNUM) * 24) + parseInt($_HRINGNUM) + (parseInt($_MNINGNUM) / 60));
    $_HORASACTW = ((((parseInt($_ANOSIGFACT) * 365.25) + 24)) + ($_NROMESW2 * 24) + (parseInt($_DIAFACT) * 24) + parseInt($_HRELABFACT) + (parseInt($_MNELABFACT) / 60));
    if ($_HORASINGW > $_HORASACTW) {
        $_DIASESTANCW = "";
        _Resultadohoras_41();
    }
    else {
        $_DIASESTANCW = ($_HORASACTW - $_HORASINGW) / 24;
        _Resultadohoras_41();
    }
}
function _Resultadohoras_41() {
    $_DIASESTANCEDIT = $_DIASESTANCW;
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
    if (($_PREFIJOFACT == "C") && (($_NITUSU == "0892000401") || ($_NITUSU == "0900648993") || ($_NITUSU == "0900755133") || ($_NITUSU == "0900804411") || ($_NITUSU == "0900870633")) && ($_NITFACT != "9999")) {
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
    if (($_ACTTER == "23") && ($_ENTESTANCEDIT > 0) && ($_TIPOPACI == "S") && ($_PREFIJOFACT == "P")) {
        // _avisarpos();
        // toastr.info("Recuerde que el ¨POS solo cubre 24 HORAS en observación");
        CON851('', 'Recuerde que el POS solo cubre 24 HORAS en observación', null, 'warning', 'Advertencia!');
    }
    else if ($_PREFIJOFACT == "P") {
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
    if ($_NITUSU == "0800162035") {
        if ((($_UNSERW == "01") || ($_UNSERW == "09")) && ($_REDEXTERNUM != "S")) {
            console.debug("estoy en el primer si de _dato ordserv")
            $_SWORDSERV = "N";
            $_ORDSERVFACT = "";
            _Datopaciente_41();
        }
        else {
            _Ventanaordserv_41();
        }
    }
    else {
        if ($_NITUSU == "0900434629") {
            $_SWORDSERV = "S";
            _Ventanaordserv_41();
        }
        else {
            if ((($_UNSERW == "01") || ($_UNSERW == "08") || ($_UNSERW == "09")) || ($_FECHAACT == $_FECHAFACT)) {
                console.debug("estoy en si no de _Datoordserv_41");
                $_SWORDSERV == "N";
                $_ORDSERVFACT = "";
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
            '<div class="form-group" id="REDEXT_401"> ' +
            '<label class="col-md-6 control-label" for="name">' + "Es un servicion autorizado x red externa?" + '</label> ' +
            '<div class="col-md-6"> ' +
            '<input id="redext_401" class="form-control input-md" data-orden="1"> ' +
            '<span class="help-block">' + "S/N" + '</span> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                callback: function () {
                    ventanaOrdserv.off('show.bs.modal');
                    console.debug($_SWORDSERV, $_SWORDSERV.length);
                    if ($_SWORDSERV == 'N') {
                        $_ORDSERVFACT = '';
                        setTimeout(_Datopaciente_41, 200);
                    }
                    else {
                        $_PREFORDSERVFACT = $_PREFIJOUSU;
                        $_CLORDSERVFACT = $_CLFACT;
                        console.debug("hace falta la ventanaordserv2");
                        //_Ventanaordserv2_41
                        // setTimeout(_Datopaciente_41, 100);
                    }
                }
            }
        }
    });
    ventanaOrdserv.init(_EvaluarRedext_41());
    ventanaOrdserv.init(Maskventanaordserv_41());
    ventanaOrdserv.init($('.modal-footer').hide());
    ventanaOrdserv.on('shown.bs.modal', function () {
        $("#redext_401").focus();
    });
}

function _EvaluarRedext_41() {
    _inputControl("disabled");
    validarInputs({
        form: '#REDEXT_401',
        orden: "1"
    },
        function () { _Evaluarcliente_41() },
        _ValidarinputRedext_41
    )
}

function _ValidarinputRedext_41() {
    $_SWORDSERV = $('#redext_401').val();
    console.debug($_SWORDSERV, $_SWORDSERV.length);
    $('.btn-primary').click();
}
function Maskventanaordserv_41() {
    var prefijoMask = IMask($("#redext_401")[0], {
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
            '<div class="form-group" id="PREFORDSERV_401"> ' +
            '<label class="col-md-2 control-label" for="name">' + "PREFIJO" + '</label> ' +
            '<div class="col-md-4"> ' +
            '<input id="prefordserv_401" class="form-control input-md" data-orden="1" maxlength="2"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="form-group" id="CLORDSERV_401"> ' +
            '<label class="col-md-2 control-label" for="name">' + "CLASE" + '</label> ' +
            '<div class="col-md-4"> ' +
            '<input id="clordserv_401" class="form-control input-md" data-orden="2" maxlength="1"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="form-group" id="NROORDSERV_401"> ' +
            '<label class="col-md-2 control-label" for="name">' + "NRO.ORDEN" + '</label> ' +
            '<div class="col-md-4"> ' +
            '<input id="nroordserv_401" class="form-control input-md" data-orden="3" maxlength="6"> ' +
            '</div> ' +
            '</div> ' +
            '</div>',
        // buttons: {
        //     confirm: {
        //         label: 'Aceptar',
        //         callback: function () {
        //             $_ORDSERVFACT = $("#prefordserv_401").val() + $("#clordserv_401").val() + $("#nroordserv_401").val();
        //             ventanaacceso.off('show.bs.modal');
        //         }
        //     }
        // }
    });
    ventanaOrdserv2.init(_Evaluarnroordserv_41());
    ventanaOrdserv2.init($("#prefordserv_401").val($_PREFIJOUSU), $("#clordserv_401").val($_CLFACT));
    ventanaOrdserv2.on('shown.bs.modal', function () {
        $("#prefordserv_401").focus();
    });
}
function _Evaluarnroordserv_41() {
    _inputControl("disabled");
    validarInputs({
        form: '#PREFORDSERV_401',
        orden: "1"
    },
        function () { _Evaluarcliente_41() },
        _Validarprefordserv_41
    )
}
function _Validarprefordserv_41() {
    var contenido = $("#prefordserv_401").val($_PREFIJOUSU);
    if (contenido.trim() == "") {
        CON851('02', '02', null, 'error', 'error');
        $("#prefordserv_401").val("");
        _Evaluarprefordserv_41();
    }
    else {
        _Evaluarclordserv_41();
    }
}
function _Evaluarclordserv_41() {
    _inputControl("disabled");
    validarInputs({
        form: '#CLORDSERV_401',
        orden: "1"
    },
        function () { _Evaluarprefordserv_41() },
        _validarclordserv
    )
}
function _validarclordserv() {
    var contenido = $("#clordserv_401").val($_CLFACT);
    if ((contenido.trim() == "") || (contenido.trim() == "1") || (contenido.trim() == "2") || (contenido.trim() == "3") || (contenido.trim() == "4") || (contenido.trim() == "5") || (contenido.trim() == "6") || (contenido.trim() == "7") || (contenido.trim() == "8") || (contenido.trim() == "9")) {
        CON851('03', '03', null, 'error', 'error');
        $("#clordserv_401").val("");
        _Evaluarclordserv_41();
    }
    else {
        _Evaluarnroordserv_41();
    }
}
function _Evaluarnroordserv_41() {
    _inputControl("disabled");
    validarInputs({
        form: '#NROORDSERV_401',
        orden: "1"
    },
        function () { _Evaluarclordserv_41() },
        _validarinputOrdserv_41
    )
}

function _validarinputOrdserv_41() {
    $_ORDSERVFACT = $("#prefordserv_401").val() + $("#clordserv_401").val() + $("#nroordserv_401").val();
    bootbox.hideAll();
    // ME HACE FALTA REALIZAR EL DLL PARA CONSULTAR AUTORIZACIONES-SALUD POR FALTA DE .DAT
    LLAMADO_DLL({
        dato: [$_ORDSERVFACT],
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
            _Datopaciente_41();
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
    console.debug("estoy en dato paciente", $_NITUSU, $_UNSERW);
    $_SWCREAR = '0';
    // CLINICA META Y SERVIMEDICOS TIENEN PISTOLA CEDULA ADMISIONES URGENCIAS
    if ((($_NITUSU == "0892000401") || ($_NITUSU == "0800162035")) && (($_UNSERW == "01") || ($_UNSERW == "02"))) {
        setTimeout(SER848, 50);
        // _Leerpaciente_41();
    }
    // LA MALOKA
    else if ($_NITUSU == "0800251482") {
        _Leerpaciente_41();
    }
    else if ($_NITUSU == "0830512772") {
        _Evaluaridhistoriafact_41();
    }
    else {
        _Datopaciente2_41();
    }
}

function _Datopaciente2_41() {
    if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) && ($_IDPACNUM != "000000000000001")) {
        console.debug("diferente a e y p y diferente a 000000000000001 el id del paciente");
        $_IDHISTORIAFACT = $_IDPACNUM;
        console.debug($_IDHISTORIAFACT);
        $_IDHISTORIAFACT = parseInt($_IDHISTORIAFACT);
        idhistoriafactMask.typedValue = $_IDHISTORIAFACT;
        _Evaluaridhistoriafact_41();
    }
    else {
        _Evaluaridhistoriafact_41();
    }
}

function _Evaluaridhistoriafact_41() {
    console.debug($_IDHISTORIAFACT, $_IDPACNUM);
    idhistoriafactMask.typedValue = $_IDHISTORIAFACT;
    validarInputs({
        form: '#PACIENTE_401',
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
        $('#paciente_401').val('');
        _Datopaciente_41();
    }
    // else if (($_PREFIJOFACT == "P") && ($_SEXOPACI == "M") && ($_IDHISTORIAFACT != $_IDPACNUM)) {
    //     $_IDHISTORIAFACT = $_IDPACNUM;
    // }
    else if (($_PREFIJOFACT == "P") && ($_IDHISTORIAFACT = !$_IDPACNUM)) {
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
    else if ($_NITUSU == "0800162035") {
        if ((($_PREFIJOUSU == "05") || ($_PREFIJOUSU == "06") || ($_PREFIJOUSU == "08") || ($_PREFIJOUSU == "10") || ($_PREFIJOUSU == "11") || ($_PREFIJOUSU == "12") || ($_PREFIJOUSU == "14") || ($_PREFIJOUSU == "15") || ($_PREFIJOUSU == "17")) && (parseInt($_NROCAPITNUM) > 0) && ($_FACTCAPITNUM == $_LLAVENUM) && ($_IDHISTORIAFACT != "000000000000001")) {
            CON851('1W', '1W', null, 'error', 'Error');
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
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_05, get_url("/SALUD/APP/SAL41-05.DLL"));
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
    $_DIRECCPACI = date[40].trim();
    $_TELEFONOPACI = date[41].trim();
    $_ESTCIVPACI = date[42].trim();
    $_CELPACI = date[43].trim();
    $('#paciented_401').val($_DESCRIPPACI);
    if (date[0].trim() == "00") {
        _Validarpaciente_41();
    }
    else if (date[0].trim() == '01') {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_OPSEGU;
        SolicitarDll({ datosh: datos_envio }, _dataCON904S_01_41, get_url("/CONTAB/APP/CON904S.DLL"));
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
            bootbox.dialog({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Actualización de pacientes...</div>',
                closeButton: false
            });
            vector = ['another', 'SALUD/PAGINAS/SAL7767.html']
            _Seconndwindow({ params: vector });
            // setTimeout(_Actualizacionmaestrosu_41, 50);
        }
        else {
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
    if ($_NITUSU == "0900019291") {
        if (($_NITUSU == '0800162035') && ($_SWINVALID == '2B')) {
            // PREFORM GRABAR-CAMBIO-DOCUMENTO
        }
        else {
            _Validandocliente3_41();
        }
    }
    else {
        if ($_SWCREAR == '0') {
            console.debug('sw crear = 0');
            if ((($_CLFACT == "3") || ($_CLFACT == "5") || ($_CLFACT == "7")) || (($_NITUSU == "0891855847") || ($_NITUSU == "0900565371"))) {
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
        }
        else {
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
        if ($_NITUSU == "0800162035") {
            if (($_EPSPACI == "RES004") && (swinvalid1 == "00")) {
                console.debug("actualizacion de pacientes");
                // CALL SER11G Y DESPUES GO TO LEER-PACIENTE
            }
            else {
                // CALL SER11I Y DESPUES GO TO LEER PACIENTE
            }
        }
        else {
            if (swinvalid1 == "00") {
                $_SWCREAR = '1'
                // CALL SER11G Y DESPUES GO TO PACIENTE
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
    }
    else {
        if ($_TIPOPACINUM == $_TIPOPACI) {
            _Validandocliente4_41();
        }
        else {
            if ($_NITUSU == '0845000038') {
                if ((($_TIPOPACINUM == 'D') || ($_TIPOPACINUM == 'E') || ($_TIPOPACINUM == 'F')) || (($_TIPOPACINUM == 'D') || ($_TIPOPACINUM == 'E') || ($_TIPOPACINUM == 'F'))) {
                    _Validandocliente4_41();
                }
            }
            else {
                CON851('3F', '3F', null, 'error', 'Error');
                _Datopaciente_41();
            }
        }
    }
}
function _Validandocliente4_41() {
    if (($_NITUSU == '0844003225') || ($_NITUSU == '0800251482') || ($_NITUSU == '0830092718') || ($_NITUSU == '0900193162')) {
        _Validandocliente5_41();
    }
    else {
        if ((($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) && ($_CONTRATONUM.trim() != '') && ($_CONTRATOPACI.trim() != '') && ($_CONTRATONUM != $_CONTRATOPACI)) {
            CON851('2M', '2M', null, 'error', 'Error');
            _Datopaciente_41();
        }
        else {
            _Validandocliente5_41();
        }
    }
}
function _Validandocliente5_41() {
    console.debug('validandocliente 5');
    if (($_IDHISTORIAFACT == '000000086059367') && ($_NITUSU == '0900405505')) {
        $_CONTRATOPACIW = $_CONTRATONUM;
        if ($_CONTRATONUM == $_CONTRATOPACI) {
            _Validandocliente6_41();
        }
        else {
            CON851('2M', '2M', null, 'error', 'Error');
            _Datopaciente_41();
        }
    }
    else if (($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'T')) {
        if ($_NITUSU == '0800037021') {
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
    $('#sexo_401').val($_SEXOPACI);
    $('#estrato_401').val($_ESTRATOPACI);
    $('#ciudad_401').val($_CIUDADPACI);
    $_CIUDADFACT = $_CIUDADPACI;
    switch ($_TIPOAFILPACI.trim()) {
        case '1':
            $('#tipoafiliacion_401').val('COTIZANTE');
            break;
        case '2':
            $('#tipoafiliacion_401').val('BENEFICIARIO');
            break;
        case '3':
            $('#tipoafiliacion_401').val('COT. PENSIONADO');
            break;
        case '4':
            $('#tipoafiliacion_401').val('UPC ADICIONAL');
            break;
        default:
            $('#tipoafiliacion_401').val('SIN DETERMINAR');
            break;
    }
    _Calcularedad_41();
    console.debug($_EDAD);
    $('#edad_401').val($_EDAD);
    if (($_PACIDISPE.trim() != '') && ($_IDHISTORIAFACT != $_PACIDISPE)) {
        CON851('06', '06', null, 'error', 'Error');
        _Datopaciente_41();
    }
    // CALL CON802A
    if ($_PREFIJOFACT == 'P') {
        $('#ULTIMOSDATOS_401').append(
            '<div class="col-md-3 col-sm-3 col-xs-12">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-12 col-sm-12 col-xs-12">' + $_FECHAINGNUM.toString() + ' ' + $_ENTESTANCEDIT.toString() + '</label>' +
            '</div>' +
            '</div>'
        );
        _Validandocliente7_41();
    }
    else if (($_NITUSU == '0845000038') || ($_NITUSU == '0800251482')) {
        _Validandocliente7_41();
    }
    else {
        if ((($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) && (parseInt($_IDHISTORIAFACT) > 000000000001)) {
            // SER 836C LINEA 3737
        }
        else {
            _Validandocliente7_41();
        }
    }
}

function _Validandocliente7_41() {
    console.debug('validandocliente 7')
    if (($_NITUSU == '0844003225') && $_CIUDADPACI != '85001') {
        $_DERECHOPACI = '2';
        console.debug('primera condicion')
    }
    if ((($_NITUSU == '0900229438') || ($_NITUSU == '0800162035')) && ($_FECHAVENCEPACI > 0) && ($_FECHAINGESTAD > $_FECHAVENCEPACI)) {
        console.debug('segunda condicion')
        $_DERECHOPACI = '2';
    }
    if ((($_DERECHOPACI == '2') || ($_DERECHOPACI == '4') || ($_DERECHOPACI == '7') || ($_DERECHOPACI == '8') || ($_DERECHOPACI == 'A')) && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'T') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
        CON851('80', '80', null, 'error', 'Error');
        if (($_PUERTAINGW == '2') && ($_NITUSU == '0800037979')) {
            _Datopaciente_41();
        }
        else if (($_NITUSU == '0800162035') || ($_NITUSU == '0900405505')) {
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
                }
                break;
            case '1':
                if ($_RESTCIRUPACI == 'N') {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                }
                break;
            case '2':
                if ($_RESTLABOPACI == 'N') {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                }
                break;
            case '3':
                if ($_RESTIMAGPACI == 'N') {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                }
                break;
            case '7':
                if ($_RESTPYPPACI == 'N') {
                    CON851('80', '80', null, 'error', 'Error');
                    _Datopaciente_41();
                }
                break;
        }
    }
    else if (($_UNDEDADMAXSERV == 'D') && ($_UNIDEDADELAB != 'D')) {
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
    }
    else if ($_ENTIDADTER == 'SIN001') {
        _Validandopaciente9_41();
    }
    else {
        if (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) {
            if (($_ENTIDADTER == 'EAR001') && (($_EPSPACI == 'EAR001') || ($_EPSPACI == 'EAR002') || ($_EPSPACI == 'EAR003') || ($_EPSPACI == 'EAR004')($_EPSPACI == 'EAR005'))) {
                _Validandopaciente9_41();
            }
            else {
                if ((($_ENTIDADTER == 'EAR000') || ($_ENTIDADTER == 'PEC004') || ($_ENTIDADTER == 'EAS027')) && (($_EPSPACI == 'EAR000') || ($_EPSPACI == 'PEC004') || ($_EPSPACI == 'EAS027'))) {
                    _Validandopaciente9_41();
                }
                else {
                    if ($_ENTIDADTER != $_EPSPACI) {
                        CON851('9S', '9S', null, 'error', 'Error');
                        if (($_CLFACT == '7') && ($.isNumeric($_VENDEDORTER))) {
                            _Datopaciente_41();
                        }
                        else if (($_NITUSU == '0900229438') && ($_ENTIDADTER == 'SIN438')) {
                            _Datopaciente_41();
                        }
                        else if ((($_NITUSU == '0800162035') || ($_NITUSU == '0900405505') || ($_NITUSU == '0900005594') || ($_NITUSU == '0830512772') || ($_NITUSU == '0830511298')) && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) && ($_NITNUM != '0000009999') && ($_ADMINW == 'GEBC')) {
                            _Datopaciente_41();
                        }
                    }
                    else {
                        _Validandopaciente9_41();
                    }
                }
            }
        }
        else {
            _Validandopaciente9_41();
        }
    }
}

function _Validandopaciente9_41() {
    console.debug('validando cliente 9');
    if (($_NITUSU == '0844003225') || ($_NITUSU == '0800251482')) {
        _Validandopaciente10_41();
    }
    else {
        if ((($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z')) && ($_CONTRATONUM.trim() != '') && ($_CONTRATOPACI.trim() != '') && ($_CONTRATONUM != $_CONTRATOPACI)) {
            CON851('2M', '2M', null, 'error', 'Error');
            _Datopaciente_41();
        }
        else {
            _Validandopaciente10_41();
        }
    }
}

function _Validandopaciente10_41() {
    if (($_NITUSU == '0900229438') && ($_EPSPACI == 'SIN438') && ($_FECHAVENCEPACI < $_FECHAINGESTAD)) {
        CON851('9S', '9S', null, 'error', 'Error');
        _Datopaciente_41();
    }
    else if ((($_NITUSU == '0900004059') || ($_NITUSU == '0891855847')) && ($_NITFACTPACI != $_NITFACT) && ($_NITFACT != '9999')) {
        CON851('9S', '9S', null, 'error', 'Error');
        _Datopaciente_41();
    }
    else {
        _Buscarconsultas_41();
    }
}

function _Buscarconsultas_41() {
    if ($_NITUSU == '0830512772') {
        // SER 835W
    }
    else {
        // SER835();
        _Buscarconsultas2_41();
    }
}

function SER835() {
    let datos_envio = datosEnvio();
    datos_envio += '|';
    datos_envio += $_IDHISTORIAFACT;
    SolicitarDll({ datosh: datos_envio }, _dataSER85_41, get_url("/SALUD/APP/SER835.DLL"));
}

function _dataSER85_41(data) {
    var date = data.split('|');
    if (date[0].trim() == '00') {
        _ventanaDatos({
            titulo: $_DESCRIPPACI,
            columnas: ["codigo", "descripcion"],
            data: $_SERVICIO_401,
            callback_esc: function () {
                $("#claseservicio_401").focus();
            },
            callback: function (data) {
                $('#claseservicio_401').val(data.codigo.trim());
                _enterInput('#claseservicio_401');
            }
        });
    }
    else if (date[0].trim() == '01') {
        _Buscarconsultas2_41();
        console.debug('no tiene historial');
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }

}

function _Buscarconsultas2_41() {
    if (($_NITUSU == '0800162035') && (($_NITFACT == '0860525150') || ($_NITFACT == '0860525149') || ($_NITFACT == '0900255098') || ($_NITFACT == '0860525148') || ($_NITFACT == '0900255099') || ($_NITFACT == '0900520316') || ($_NITFACT == '0900520317') || ($_NITFACT == '0900520318'))) {
        // SER 835E
    }
    else if (($_CLFACT == '0') && ((($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) && ($_NITUSU != '0830512772')) {
        // CALL 836A LINEA 3988
    }
    else if (($_NITUSU == '0800162035') && ($_UNSERW == '01') && ($_CLFACT != '5') && ($_PREFIJOUSU == '01') && ($_REDEXTERNUM == '01')) {
        // CALL SER 836U LINEA 4018
    }
    else if (($_NITUSU == '0891855847') && ($_UNSERW == '01') && ($_CLFACT != '5') && (($_PREFIJOFACT == 'A') || ($_PREFIJOFACT == 'B') || ($_PREFIJOFACT == 'D') || ($_PREFIJOFACT == 'F') || ($_PREFIJOFACT == 'G') || ($_PREFIJOFACT == 'H') || ($_PREFIJOFACT == 'I') || ($_PREFIJOFACT == 'J') || ($_PREFIJOFACT == 'K') || ($_PREFIJOFACT == 'L') || ($_PREFIJOFACT == 'M') || ($_PREFIJOFACT == 'N') || ($_PREFIJOFACT == 'O') || ($_PREFIJOFACT == 'Q') || ($_PREFIJOFACT == 'R') || ($_PREFIJOFACT == 'S') || ($_PREFIJOFACT == 'V') || ($_PREFIJOFACT == 'W') || ($_PREFIJOFACT == 'X') || ($_PREFIJOFACT == 'Y') || ($_PREFIJOFACT == 'Z'))) {
        // CALL SER 836U LINEA 4041
    }
    $_SWOCULTAR = '00'
    $_OPSEGU = 'I41O';
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_OPSEGU;
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataCON904S_04_41, get_url("/CONTAB/APP/CON904S.DLL"));
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
    var viasdeacceso = '[{"codigo": "1","descripcion": "ABDOMINAL"},{"codigo": "2", "descripcion": "CUELLO"},{"codigo": "3", "descripcion": "TORAXICA"},{"codigo": "4", "descripcion": "CRANEAL"},{"codigo": "5", "descripcion": "MIEMB.SUP.IZQ"},{"codigo": "6", "descripcion": "MIEMB.SUP.DER"},{"codigo": "7", "descripcion": "MIEMB.INF.IZQ"},{"codigo": "8", "descripcion": "MIEMB.INF.DER"},{"codigo": "9", "descripcion": "RECTAL"},{"codigo": "A", "descripcion": "VAGINAL"},{"codigo": "B", "descripcion": "OIDO"},{"codigo": "C", "descripcion": "NARIZ"},{"codigo": "D", "descripcion": "BOCA"},{"codigo": "E", "descripcion": "OCULAR"},{"codigo": "G", "descripcion": "OTRO"}]';
    var viaacceso = JSON.parse(viasdeacceso);
    POPUP({
        array: viaacceso,
        titulo: "VIA DE ACCESO"
    },
        _evaluarviaacceso_41);
}

function _evaluarviaacceso_41(data) {
    switch (data.id) {
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
            _Datocruenta_41();
            break;
        default:
            _Datopaciente_41();
            // $_VIAW = $_VIAFACT; CONDICION CUANDO AFCTURA DE SERVICIOS ESTE DISPONIBLE
            break;
    }
    $_VIAW = data.id;
    if ($.isNumeric(data.id)) {
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
        titulo: "INTERVENCION"
    },
        _Evaluarintervencion_41);
}

function _Evaluarintervencion_41(data) {
    switch (data.id) {
        case '1':
        case '2':
            $_CRUENTAW = data.id;
            _Dato1_41();
            break;
        default:
            _Viaacceso_41();
            break;
    }
}

function _Dato1_41() {
    $_VIAFACT = $_VIAW;
    $_CRUENTAFACT = $_CRUENTAW;
    $_TARIFFACT = $_CODTABW;
    $_PUERTAESTAD = $_PUERTAINGW;
    $_MACROFACT = 0;
    $_I = 1;
    $_K = 1;
    $_ESPECLAB = '';
    if ((($_CLFACT == '3') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) && ($_SWORDSERV == 'N')) {
        SER836(); // NO SE HA COMPLETADO 4137
    }
    else if (($_NITUSU == '0900405505') && ($_FECHACIT != $_FECHAACT) && ($_IDHISTORIAFACT != 000000000000001)) {
        CON851('9F', '9F', null, 'error', 'Error');
        if (($_CLFACT == '2') || ($_CLFACT == '3') || ($_CLFACT == '7')) {
            _Dato1_2_41();
        }
        else {
            let datos_envio = datosEnvio();
            datos_envio += '|'
            datos_envio += $_OPSEGU;
            SolicitarDll({ datosh: datos_envio }, _dataCON904S_05_41, get_url("/CONTAB/APP/CON904S.DLL"));
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
    _Aceptarcodigo_41();
}

function _Aceptarcodigo_41() {
    let ctabla_41 = $('#TABLA_401 tbody tr').length;
    console.debug(ctabla_41);
    if (ctabla_41 == 4) {
        console.debug(ctabla_41);
        _Datodescto_41();
    }
    else if (ctabla_41 == 1) {
        $_DIVISIONCUP1 = $_DIVISIONCUP;
        $_DIV2CUP1 = $_DIV2CUP;
        $_DIAGNCUP1 = $_DIAGNCUP;
        $_ATIENDEESPCUP1 = $_ATIENDEESPCUP;
        _Datobarras_41();
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
    fuente = '<div class="col-md-12" id="ACEPTARBARRAS_401"> ' +
        '<input id="aceptarbarras_401" type="text" class="form-control input-md" data-orden="1" maxlength="15"> ' +
        '</div>';
    _ventana({
        source: fuente,
        title: 'CODIGO DE BARRAS',
        size: 'small',
        espace: false,
        focus: '#aceptarbarras_401',
        form: '#ACEPTARBARRAS_401',
        order: '1',
        global1: '$_LLAVEBARW',
        inputglobal1: '#aceptarbarras_401',
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
    if (($_NITUSU == '0844003225') && ($_SWPASO == '0')) {
        if ($_CLFACT == '7') {
            $_TIPOMACROW = '2';
            _Evaluarmacro_41();
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
            _Evaluarcodservicio_41();
        }
    }
}

function _Evaluarmacro_41() {
    $('#elementos-tabla').append(
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12" id="MACRO_401">' +
        '<div class="inline-inputs">' +
        '<label class="col-md-6 col-sm-8 col-xs-12">Cod Macro:</label>' +
        '<div class="input-group col-md-6 col-sm-4 col-xs-12">' +
        '<input id="macro_401" type="text" class="form-control col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +
        '</div>');
    validarInputs({
        form: '#MACRO_401',
        orden: '1'
    },
        function () { _Dato2_41() },
        _Validarmacro_41
    )
}

function _Validarmacro_41() {
    console.debug(macro);
    $_CODMACROW = $('#macro_401').val();
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
                _Evaluarcodservicio_41();
            }
        },
        url
    );
}

function _Evaluarcodservicio_41() {
    validarInputs({
        form: '#CODSERVICIO_401',
        orden: '1'
    },
        function () { console.debug('no se puede salir') },
        _Validarcodservicio_41
    )
}
function _Validarcodservicio_41() {
    $_GRUPOFACT = $('#codservicio1_401').val();
    if ($_CLFACT == '3') {
        $_OPSEGU = "I41" + $_GRUPOFACT.substring(0, 2);
        LLAMADO_DLL({
            dato: [$_ADMINW, $_OPSEGU],
            callback: _dataCON904_04_41,
            nombredll: 'CON904',
            carpeta: 'CONTAB'
        });
    }
    else {
        _Grupoblanco_41();
    }
}

function _dataCON904_04_41(data) {
    console.debug(data, "CON904-01");
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
    validarInputs({
        form: '#CODSERVICIO2_401',
        orden: '1'
    },
        function () { _Evaluarcodservicio_41() },
        _Validarcodservicio2_41
    )
}

function _Validarcodservicio2_41() {
    $_CODARTFACT = $('#codservicio2_401').val();
    $_CODARTCTL = $_CODARTFACT;
    if (($_CLFACT == '0') && ($_CODARTFACT = !$_CODARTCTL)) {
        $_TIPOART = '0';
        $_GRUPOART = $_GRUPOFACT;
        $_NUMEROART = $_CODARTFACT;
        $_CLASEART = '  ';
        LLAMADO_DLL({
            dato: [],
            callback: _dataINV401_11_41,
            nombredll: 'INV401_11',
            carpeta: 'SALUD'
        })
    }
    else {
        console.debug('si no')
        if (parseInt($_CLFACT) > 0) {
            $_CLASEARTFACT = '  ';
            _Leerarticulo_41();
        }
        else {
            $('#elementos-tabla').append(
                '<div class="salto-linea"></div>' +
                '<div class="col-md-12 col-sm-12 col-xs-12" id="CLASEART_41">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-6 col-sm-8 col-xs-12">Clase Art</label>' +
                '<div class="input-group col-md-6 col-sm-4 col-xs-12">' +
                '<input id="claseart_41" type="text" data-orden="1" class="form-control col-md-12 col-sm-12 col-xs-12">' +
                '</div>' +
                '</div>' +
                '</div>'
            );
            _Evaluarclaseart_41();
        }
    }
}

function _Evaluarclaseart_41() {
    validarInputs({
        form: '#CLASEART_41',
        orden: '1'
    },
        function () { _Evaluarcodservicio_41() },
        _Validarclaseart_41
    )
}

function _Validarclaseart_41() {
    $_CLASEARTFACT = $('#claseart_41').val();
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
        $('codservicio2_401').val('');
        _Evaluarcodservicio2_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Leerarticulo_41() {
    $_ARTFACT = $_GRUPOFACT + $_CODARTFACT + $_CLASEARTFACT;
    // SE AÑADIO LA CLASEART DEBAJO DE TODAS LAS VARIABLES
    if ((($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) && ($_SUCW == 'SC')) {
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
        SolicitarDll({ datosh: datos_envio }, _dataCON904_05_41, get_url("/CONTAB/APP/CON904.DLL"));
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
        $_NUMEROART = $_CODARTFACT;
        $_CLASEART = $_CLASEARTFACT;
        $_CODART = $_TIPOART + $_GRUPOART + $_NUMEROART + $_CLASEART;
        // LLAMADO_DLL({
        //     dato: [$_CODART],
        //     callback: _dataINV401_12_41,
        //     nombredll: 'INV401-12',
        //     carpeta: 'SALUD'
        // })
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_CODART;
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_06, get_url("/SALUD/APP/SAL41-06.DLL"));
    }
    else {
        if (($_GRUPOFACT == 'XM') || ($_GRUPOFACT == 'XP') || ($_GRUPOFACT == 'XN')) {
            $_LLAVETAB = $_CODTABW + $_TIPOTABW + $_GRUPOFACT + $_CODARTFACT.padEnd(10, ' ');
            // LLAMADO_DLL({
            //     dato: [$_LLAVETAB, $_NITUSU, $_CONVENIONUM],
            //     callback: _dataINV401_13_41,
            //     nombredll: 'INV401_13',
            //     carpeta: 'SALUD'
            // })
            let datos_envio = datosEnvio();
            datos_envio += '|'
            datos_envio += $_LLAVETAB;
            datos_envio += '|'
            datos_envio += $_NITUSU;
            datos_envio += '|'
            datos_envio += $_CONVENIONUM;
            console.debug(datos_envio);
            SolicitarDll({ datosh: datos_envio }, _dataSAL41_07, get_url("/SALUD/APP/SAL41-07.DLL"));
        }
        else {
            $_ALMFACT = '     ';
            $_LLAVETAB = $_CODTABW + $_TIPOTABW + $_GRUPOFACT + $_CODARTFACT.padEnd(8, ' ');
            // LLAMADO_DLL({
            //     dato: [$_LLAVETAB, $_NITUSU, $_CONVENIONUM],
            //     callback: _dataINV401_13_41,
            //     nombredll: 'INV401-13',
            //     carpeta: 'SALUD'
            // })
            let datos_envio = datosEnvio();
            datos_envio += '|'
            datos_envio += $_LLAVETAB;
            datos_envio += '|'
            datos_envio += $_NITUSU;
            datos_envio += '|'
            datos_envio += $_CONVENIONUM;
            console.debug(datos_envio);
            SolicitarDll({ datosh: datos_envio }, _dataSAL41_07, get_url("/SALUD/APP/SAL41-07.DLL"));
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
    $_VRVENTA1ART = date[10].trim();
    $_VRVENTA1ART = parseFloat($_VRVENTA1ART);
    $_REFART = date[11].trim();
    $_OTROS4BART = $_OTROS4ART.substring(12, 26);
    $_HOMOLOGOART = date[12].trim();
    $_RENG1ART = date[13].trim();
    $_REGG1BART2 = $_RENG1ART.substring(29, 30);
    if (date[0].trim() == '00') {
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
                _Leerpromedio_41();
                $_VRVENTA1ART = $_VLRPROMEDW;
                break;
            case '2':
                $_VRVENTA1ART = $_VLRULTCOMPRA;
                break;
            case '3':
                if ($_VLRREFART > 0) {
                    $_VRVENTA1ART = $_VLRREFART;
                }
                break;
        }
        if (($_NITUSU == '0892000401') || ($_NITUSU == '0900648993') || ($_NITUSU == '0900755133') || ($_NITUSU == '0900804411') || ($_NITUSU == '0900870633')) {
            $('form').append(
                '<div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">' +
                '<div class="col-md-5 col-sm-4 col-xs-4">' +
                '<label>Ciudad</label>' +
                '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
                '<input id="otros_401" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="5" data-orden="1">' +
                '</div>' +
                '</div>' +
                '</div>'
            )
            $('#otros_401').val($_OTROSART);
        }
        if ($_VLRULTCOMPRA == 0) {
            if (parseInt($_PRECIOCOMPART) > 0) {
                $_VLRULTCOMPRA = $_PRECIOCOMPART;
            }
            else {
                _Leerpromedio_41();
                $_VLRULTCOMPRA = $_VLRPROMEDW;
            }
        }
        if ((($_DESCRIPART == '*') && ($_TIPODRFACT == '1')) && ($_GRUPO1ART.trim() == '') && ($_GRUPO2ART.trim() == '')) {
            $('#detalle_401').val('CODIGO CON * DESCTI');
            CON851('13', '13', null, 'error', 'Error');
            _Dato2_41();
        }
        if ($_ARTIVANUM == 'N') {
            if ($_IVAART == '0') {
                _Leerarticulo3_41();
            }
            else {
                CON851('72', '72', null, 'error', 'Error');
                _Dato2_41();
            }
        }
        if ((($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "T") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z"))) {
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
        }
        else {
            _Leerarticulo3_41();
        }
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#codservicio_41').val('');
        _Evaluarcodservicio_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _Leerarticulo3_41() {
    $_SWAPR = '1';
    $_VALORAPROX = parseInt($_VLRUNITW) * 1;
    console.debug($_VALORAPROX);
    $_VLRUNITW = $_VALORAPROX;
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
    }
    if ($_ASUMEIVAUSU == 'S') {
        $_VLRUNITW = (parseInt($_VRVENTA1ART) * (100 + parseInt($_TARIVAW))) / 100;
    }
    if ($_ASUMEIVAUSU != 'S') {
        $_VLRUNITW = $_VRVENTA1ART;
    }
    if ($_NITUSU == '0900004059') {
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
    $_MONTOTAB = date[4].trim();
    $_MONTOTAB = parseFloat($_MONTOTAB);
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
    $_ATIENDEESPCUP = date[23].trim();
    $_DESCRIPCUP = date[24].trim();
    $_CODSERTAB = date[25].trim();
    if (swinvalid == '00') {
        $('#detalle_401').val($_DESCRIPTAB);
        if ($_DESCRIP1TAB == '*') {
            $('#detalle_401').val('CODIGO NO EXISTE - REPITA');
            CON851('7R', '7R', null, 'error', 'Error');
            _Dato2_41();
        }
        else {
            SER102RC_41(swinvalid1);
        }
    }
    else if (swinvalid == '01') {
        $('#detalle_401').val('CODIGO NO EXISTE - REPITA');
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
            if ($_NITUSU == '0892000401') {
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
    if (($_LLAVETIPOTAB == 'SO1') && ($_CODPAQINTTAB = ! '')) {
        CON851('', 'Atencion !, este procedimiento esta clasificado como posible paquete integral', null, 'warning', 'Advertencia!');
    }
    if (($_NITUSU == '0800037021') && ($_NITFACT == '0830079672')) {
        $_SWAPR = '1';
    }
    if (($_CODTAR == 'H4') && (parseInt($_CLFACT) > 1)) {
        $_SWAPR = '1';
    }
    if (($_NITUSU == '0800037021') && ($_OCULTARCUP == '*')) {
        CON851('7R', '7R', null, 'error', 'Error');
        _Dato2_41();
    }
    else if ((($_NITUSU == '0900405505') || ($_NITUSU == '0822002688')) && ($_CISNUM == 'S') && ($_CISCUP == 'N')) {
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
            if ($_NITUSU == '0900019291') {
                _Leerarticulo6_41();
            }
            else {
                _Ventanacapacitacion_41();
            }
        }
        else {
            if ($_NITUSU == '0900405505') {
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
        }
        else {
            _Datolateralidad_41();
        }
    }
    else if (($_CLFACT == '2') || ($_CLFACT == '3') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) {
        // BUSCAR REPETIDO EN LA TABLA
    }
    $_SWBUSCAR = '0'
    if (($_NITUSU == '0800037021') && ($_CLFACT == '2')) {
        //BUSCAR REPETIDO 
        if ($_SWBUSCAR == 1) {
            CON851('05', '05', null, 'error', 'Error');
            _Dato2_41();
        }
    }
    else {
        _Datolateralidad_41();
    }
}

function _Datolateralidad_41() {
    console.debug('datolateralidad');
    $_PRINCIPALANTEW = $_DATOSSEPCUP;
    if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
        var lateralidades = '[{"codigo": "1","descripcion": "Derecho"},{"codigo": "2", "descripcion": "Izquierdo"},{"codigo": "3","descripcion": "Bilateral"},{"codigo": "4","descripcion": "No aplica"}]'
        var lateralidad = JSON.parse(lateralidades);
        POPUP({
            array: lateralidad,
            titulo: 'Lateralidades'
        },
            _EvaluarRX822A_41);
    }
    else {
        $_VLRLATERFACT = '0';
        _Datoalmacen_41();
    }
}

function _evaluarRX822_41(data) {
    switch (data.id) {
        case 1:
        case 2:
        case 3:
        case 4:
            $_VLRLATERFACT = data.id;
            _Datoalmacen_41();
            break;
        default:
            _toggleNav();
            break;
    }
}

function _Datoalmacen_41() {
    if (parseInt($_CLFACT) > 0) {
        _Calcularmonto_41();
    }
    else {
        _Evaluandoalmacen_41();
    }
}
function _Evaluandoalmacen_41() {
    if (($_NITUSU == '0800037021') && ($_ADMINW == 'UCI')) {
        $_ALMFACT = 'SIN97';
    }
    if (($_NITUSU == '0900658867') && ($_PREFIJOUSU == '10')) {
        $_ALMFACT = 'ALM10';
    }
    if ($_ALMFACT.trim() == '') {
        if (($_NITUSU == '0892000401') || ($_NITUSU == '0900648993') || ($_NITUSU == '0900755133') || ($_NITUSU == '0900804411') || ($_NITUSU == '0900870633')) {
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
        form: '#ALMACEN_401',
        orden: '1'
    },
        function () { _Dato2_41() },
        _Validaralmacen_41
    )
}

function _Validaralmacen_41() {
    $_ALMFACT = $('#almac_401').val();
    if ($_NITUSU == '0830512772') {
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
}

function _Datoalmacen2_41() {
    // if ((parseInt($_VLRPROMEDW) == 0) && (parseInt($_BASEMEDTAR) == 1)) {
    //     $_ALMPREF = $_ALMFACT;
    //     _Leerpromedio_41();
    //     $_VRVENTA1ART = $_VLRPROMEDW
    //     if ($_ASUMEIVAUSU == 'S'){
    //         $_VLRUNITW = Math.round( parseFloat($_VRVENTA1ART) * (100 + parseFloat($_TARIVAW)) / 100 )
    //     }
    //     else{
    //         $_VLRUNITW = $_VRVENTA1ART;
    //     }
    //     $_VALORAPROX = Math.round( $_VLRUNITW * 1 );
    //     $_VLRUNITW = $_VALORAPROX;
    // }
    // $('#almac_401').val($_ALMFACT);
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_ALMFACT;
    SolicitarDll({ datosh: datos_envio }, _dataINV401_14_41, get_url("/SALUD/APP/INV401-14.DLL"));
}

function _dataINV401_14_41(data) {
    console.debug(data, 'INV401-14');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_NOMBRELOCAL = date[1].trim();
    if (swinvalid == '00') {
        $_OPSEGU = 'I410' + $_ALMFACT.substring(0, 1) + $_ALMFACT.substr(4, 5);
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_OPSEGU;
        SolicitarDll({ datosh: datos_envio }, _dataCON904_06_41, get_url("/CONTAB/APP/CON904.DLL"));
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#almac_401').val('');
        _Datoalmacen_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _dataCON904_06_41(data) {
    console.debug(data, 'CON904_06');
    var date = data.split();
    var swinvalid = date[0].trim();
    var admin_w = date[1].trim();
    var nombreoper = date[2].trim();
    var codrest = date[3].trim();
    if ((swinvalid == '00') || (swinvalid == '01')) {
        if ((swinvalid == '01') && ($_CLFACT == '0')) {
            $_RESTRICLOCAL == 'N';
        }
        if (($_NITUSU == '0892001990') && ($_CODLOCAL == 'DR02') && (admin_w == 'MEOM')) {
            $_RESTRICLOCAL == 'N';
        }
        if (($_CLFACT == '0') && ($_ALMFACT.substring(0, 3) = ! "SIN") && (($_GRUPOFACT == 'PO') && ($_GRUPOFACT == 'NP'))) {
            $_OPSEGU = 'I410M';
            let datos_envio = datosEnvio();
            datos_envio += '|'
            datos_envio += $_OPSEGU;
            SolicitarDll({ datosh: datos_envio }, _dataCON904_07_41, get_url("/CONTAB/APP/CON904.DLL"));
        }
        else {
            _Permisosalmacen_41();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _dataCON904_07_41(data) {
    console.debug(data, 'CON904_07');
    var date = data.split();
    var swinvalid = date[0].trim();
    var admin_w = date[1].trim();
    var nombreoper = date[2].trim();
    var codrest = date[3].trim();
    if (swinvalid == '00') {
        _Permisosalmacen_41();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'Error');
        _datoalmacen();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _Permisosalmacen_41() {
    if ($_RESTRICLOCAL == 'N') {
        CON851('13', '13', null, 'error', 'Error');
        _Datoalmacen_41();
    }
    else if ((($_NITUSU == '0892000401') || ($_NITUSU == '0900648993') || ($_NITUSU == '0900755133') || ($_NITUSU == '0900804411') || ($_NITUSU == '0900870633')) && ($_ALMFACT == 'DR099') && (($_UNSERVFACT == '04') || ($_UNSERVFACT == '54'))) {
        CON851('B1', 'B1', null, 'error', 'Error');
        _Datoalmacen_41();
    }
    else if ((($_NITUSU == '0892000401') || ($_NITUSU == '0900648993') || ($_NITUSU == '0900755133')) || ($_ALMFACT == 'CR001')) {
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
        if (($_NITUSU == '0892000401') || ($_NITUSU == '0900648993') || ($_NITUSU == '0900755133') || ($_NITUSU == '0900804411') || ($_NITUSU == '0900870633')) {
            _Ventanalote_41()
        }
        if ((($_GRUPOFACT == 'MQ') && ($_TIPODRFACT == '1') && ((parseInt($_LLAVEBARRASW) == 0)) || ($_LLAVEBARRASW.trim() == '')) && ($_NITUSU == '0891855847')) {
            CON851('1P', '1P', null, 'error', 'Error');
            _Ventanabarras_41();
        }
        else {
            if ((($_GRUPOFACT == 'PO') || ($_GRUPOFACT == 'NP')) && ($_TIPODRFACT == '1') && (parseInt($_LLAVEBARRASW) == 0)) {
                CON851('1P', '1P', null, 'error', 'Error');
                _Ventanabarras_41();
            }
            if ((($_GRUPOFACT == 'PO') || ($_NITUSU == 'NP')) && ($_LLAVEBARRASW = !$_CODBARRASART)) {
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
    if ($_LOTEFARMUSU == 'N') {
        $_OPCLOTEGR = 'N';
    }
    if ($_OPCLOTEGR == 'S') {
        _Aceptarlote_41();
    }
    else {
        $_CODLOTEFACT = ' ';
        _Buscarsaldo_41();
    }
    /// NO ME MUESTRA RM LA VENTANA
}

function _Buscarsaldo_41() {
    $_CODALMSAL = $_ALMFACT;
    $_CODARTSAL = $_CODART;
    $_CODLOTESAL = $_CODLOTEFACT;
    if ($_GRP1SAL = ! '9') {
        // INV808
    }
    if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
        $_VLRUNITW = parseFloat($_VLRDEVOL / $_CANTDEVOL)
        $_VLRLIMIW = $_VLRUNIT * 3
        _Dato3_41();
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
        }
        else {
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
    }
    else {
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
            if ($_NITUSU == '0892000401') {
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
    if (($_NITUSU == '0845000038') && ($_CLFACT == '0')) {
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
    if ($_CLFACT == '0') {
        // AGREGAR A LA TABLA MOSTRAR "F4 EN CANTIDAD, RECALCULA SALDO ARTICULO"
    }
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
        function () { _Dato2_41() },
        _Validarcant_41
    )
}
function _Validarcant_41() {
    $_CANTFACT = MountMask_41.unmaskedValue;
    console.debug($_CANTFACT);
    if (($_CLFACT == '0') && ($_TIPODRFACT == '2')) {
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
            if ((parseFloat($_CANTFACT < 0)) && ($_ALMFACT = ! 'S')) {
                CON851('46', '46', null, 'error', 'Error');
                _Dato3_41();
            }
            if (($_NITUSU == '0892000458') && (($_ALMFACT == 'DR002') || ($_ALMFACT == 'DR003') || ($_ALMFACT == 'URG01'))) {
                _Validarcant2_41()
            }
            else {
                if (($_ALMFACT.substring(0, 3) = ! 'SIN') && (parseFloat($_CANTFACT) > 0) && (parseFloat($_CANTFACT) > parseFloat($_SDOACTCANT))) {
                    CON851('07', '07', null, 'error', 'Error');
                    if ($_RESTICEXUSU == 'N') {
                        _Dato3_41();
                    }
                    else {
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
        if ($_CANTFACT == '0') {
            _Dato3_41();
        }
        else {
            _Validarcant2_41();
        }
    }
}
function _Validarcant2_41() {
    // if ($_SDOACTCANT < $_AUTORETART) {
    //     CON851('5K', '5K', null, 'warning', 'Advertencia');
    // }
    if (($_GRUPOFACT == '93') || ($_GRUPOFACT == 'XX') || (($_GRUPOFACT == '89') && ($_COD1ARTFACT == '3'))) {
        _Validarcant3_41()
    }
    else {
        if ($_CANTFACT > $_CANTMAX) {
            $_SWERROR = '1';
            CON851('07', '07', null, 'error', 'Error');
            _Dato3_41();
        }
        else {
            _Validarcant3_41()
        }
    }
}
function _Validarcant3_41() {
    if ((($_NITUSU == '0900658867') || ($_NITUSU == '0900541158') || ($_NITUSU == '0900566047') || ($_NITUSU == '0800037979')) && (($_GRUPOFACT == 'PO') || ($_GRUPOFACT == 'NP'))) {
        fuente = '<div class="col-md-12" id="DIASTRATAFACT_41"> ' +
            '<input id="diatratafact_41" type="text" class="form-control input-md" data-orden="1" maxlength="3"> ' +
            '</div>';
        _ventana({
            source: fuente,
            title: 'DIAS TRATAMIENTO',
            size: small,
            espace: true,
            focus: '#diatratafact_41',
            form: '#DIASTRATAFACT_41',
            order: '1',
            global1: '$_DIASTRATAFACT',
            inputglobal1: '#diatratafact_41',
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
    if ($_NITUSU == '0845000038') {
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
    if (($_NITUSU == '0822001570') && ($_CLFACT == '0')) {
        // CONTINUE
    }
    else {
        if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162') || ($_NITUSU == '0900658867') || ($_NITUSU == '0830511298') || ($_NITUSU == '0822001570')) {
            if (($_ADMINW == 'LUZA') || ($_ADMINW == 'MOR6') || ($_ADMINW == 'ADMI') || ($_ADMINW == 'BLA1')) {
                $_SWINVALID = '0';
                _Dato42_41();
            }
            else {
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
    console.debug('falta incluir el con851p');
    if (($_VLRLIMIW > 0) && ($_VLRUNITW > $_VLRLIMIW)) {
        CON851('9E', '9E', null, 'warning', 'Advertencia!');
        if (($_NITUSU == '0891855847') || ($_NITUSU == '024247556') || ($_NITUSU == '0900030814') || ($_NITUSU == '0800162035') || ($_NITUSU == '0900019291')) {
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
    if ($_NITUSU == '0892000401') {
        $_VLRARTW = $_VLRUNITW * $_CANTFACT;
    }
    else {
        $_VLRARTW = Math.round($_VLRUNITW * $_CANTFACT);
    }
    _Dato52_41();
}
function _Dato52_41() {
    if (($_NITUSU == '0830512772') && ($_REGULADOSTABME == 'S')) {
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
    if ($_NITUSU == '0892000401') {
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
    $('#TABLA_401 tbody').append(
        '<tr>' +
        '<td>' + $('#codservicio1_401').val() + $('#codservicio2_401').val() + '</td>' +
        '<td>' + $('#detalle_401').val() + '</td>' +
        '<td></td>' +
        '<td></td>' +
        '<td>' + MountMask_41.value + '</td>' +
        '<td>' + PriceUnitMask_41.value + '</td>' +
        '<td>' + PriceTotalMask_41.value + '</td>' +
        '</tr>'
    )
    _Sumarvalores_41();
    _Almacenartabla();
    $_VALORBASE1IVA = $_VALORBASE2IVA = $_VALORBASE3IVA = 0;
    $_VLRTOTEDIT = $_VALORBRUTO;
    console.debug($_SWOCULTAR);
    $_VLRIVAFACT = ($_VALORBASE1IVA * $_IVAUSU / 100) + ($_VALORBASE2IVA * $_IVAUSU2 / 100) + ($_VALORBASE3IVA * $_IVAUSU3 / 100);
    $_VLRIVA1FACT = ($_VALORBASE1IVA * $_IVAUSU / 100);
    $_VLRIVA2FACT = ($_VALORBASE2IVA * $_IVAUSU / 100);
    $_VLRIVA3FACT = ($_VALORBASE3IVA * $_IVAUSU / 100);
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
    _Aceptarcodigo_41();
}

function _Almacenartabla() {
    $_DIASTRATAFACT.trim() == '' ? $_DIASTRATAFACT = 0 : $_DIASTRATAFACT = $_DIASTRATAFACT;
    // let almfact = $_ALMFACT;
    // let artfact = $_ARTFACT;
    // let codelotefact = $_CODLOTEFACT;
    // let cantfact = $_CANTFACT;
    // let vlrfact = $_VALORBRUTO;
    // let diastratafact = $_DIASTRATAFACT;
    // let vlrresultfact = $_VLRLATERFACT;
    if ($('#TABLA_401 tbody tr').length < 1) {
        // $TABLAFACT = [$_ALMFACT, $_ARTFACT, $_CODLOTEFACT, $_CANTFACT, $_VALORBRUTO,$_DIASTRATAFACT, $_VLRLATERFACT]
        $TABLAFACT = '[{"ALMFACT":"${$_ALMFACT}"},{"ARTFACT":"${$_ARTFACT}"},{"CODLOTEFACT":"${$_CODLOTEFACT}"},{"CANTFACT":"${$_CANTFACT}"},{"VLRFACT":"${$_VALORBRUTO}"},{"DIASTRATAFACT":"${$_DIASTRATAFACT}"},{"VLRLATERFACT":"${$_VLRLATERFACT}"},{"DATOSETCUP":"${$_DATOSETCUP}"},{"CISCUP":"${$_CISCUP}"},{"DESCRIPCUP":"${$_DESCRIPCUP}"},{"CODCUP":"${$_CODSERTAB}"}]'
        console.debug($_TABLAFACT)
    }
    else {
        $TABLAFACT2 = '[{"ALMFACT":"${$_ALMFACT}"},{"ARTFACT":"${$_ARTFACT}"},{"CODLOTEFACT":"${$_CODLOTEFACT}"},{"CANTFACT":"${$_CANTFACT}"},{"VLRFACT":"${$_VALORBRUTO}"},{"DIASTRATAFACT":"${$_DIASTRATAFACT}"},{"VLRLATERFACT":"${$_VLRLATERFACT}"},{"DATOSETCUP":"${$_DATOSETCUP}"},{"CISCUP":"${$_CISCUP}"},{"DESCRIPCUP":"${$_DESCRIPCUP}"},{"CODCUP":"${$_CODSERTAB}"}]'
        $TABLAFACT.push($TABLAFACT2);
        // $TABLAFACT = [$_TABLAFACT, $_ALMFACT, $_ARTFACT, $_CODLOTEFACT, $_CANTFACT, $_VALORBRUTO,$_DIASTRATAFACT, $_VLRLATERFACT]
        console.debug($_TABLAFACT)
    }
}

function _Limpiarcampos_41() {
    $('#codservicio1_401').val('');
    $('#codservicio12401').val('');
    $('#almac_401').val('');
    $('#cant_401').val('');
    $('#und_401').val('');
    $('#vlrunit_41').val('');
    $('#vlrtotal_41').val('');
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
        if ($_NITUSU == '0892000401') {
            _Datocopago_41();
        }
        else {
            _Editarabono_41();
        }
    }
    else if ((($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) && ($_PORCENTCOPAGONUM == '99')) {
        $_COPAGOESTIMFACT = $_VALORBRUTO;
        _Editarabono_41();
    }
    else if ((($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) && ($_COPAGOPACI == 'N')) {
        $_COPAGOESTIMFACT = 0;
        _Editarabono_41();
    }
    else if ($_NITUSU == '0800156469') {
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
        if ($_NITUSU == '0892000401') {
            _Datocopago_41();
        }
        else {
            _Editarabono_41();
        }
    }
    else if (($_NITUSU == $_NITFACT) && (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z"))) {
        $_COPAGOESTIMFACT = 0;
        _Datocopago_41();
    }
    else if (($_NITUSU == '0900685768') && (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z"))) {
        $_PORCENTCOPAGO = 9;
        $_COPAGOESTIMFACT = $_VALORTOTAL;
        _Editarabono_41();
    }
    else if (($_NITUSU == '0900405505') || ($_NITUSU == '0830511298')) {
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
    else if ($_NITUSU == '0800175901') {
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
            else if (($_NITUSU == '0900405505') && ($_CLFACT == '4') && (($_TIPOAFILPACI == '0') || ($_TIPOAFILPACI == '2'))) {
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
            SolicitarDll({ datosh: datos_envio }, _dataCON904S_06_41, get_url("/CONTAB/APP/CON904S.DLL"));
        }
    }
}
function _dataCON904S_06_41(data) {
    console.debug(data, 'CON904S_06');
    var date = data.split('|');
    if (date[1].trim() == '01') {
        if (($_NITUSU == '0900405505') && ($_GRUPOFACT == '93')) {
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
    }
    else if (date[1].trim() == '00') {
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
    if (($_NITUSU == '0800162035') && ($_NITFACT == '9999') && ($_CLFACT == '0')) {
        $_PORCENTCOPAGO = 9;
    }
    if ($_NITUSU == '0822002688') {
        _Validarcopago_41();
    }
    else {
        _Evaluarcopago_41();
    }
}
function _Evaluarcopago_41() {
    validarInputs({
        form: '#COPAGO_41',
        orden: '1'
    },
        function () { _Evaluarfecha_41() },
        _Validarcopago_41
    )
}
function _Validarcopago_41() {
    $_PORCENTCOPAGO = CopagoMask.unmaskedValue;
    if (($_PORCENTCOPAGO == 0) || ($_PORCENTCOPAGO == 5) || ($_PORCENTCOPAGO == 10) || ($_PORCENTCOPAGO == 15) || ($_PORCENTCOPAGO == 20) || ($_PORCENTCOPAGO == 30) || ($_PORCENTCOPAGO == 11.5) || ($_PORCENTCOPAGO == 17.3) || ($_PORCENTCOPAGO == 23) || ($_PORCENTCOPAGO == 9)) {
        _Validarcopago2_41();
    }
    else {
        _Datoabono_41();
    }
}

function _Validarcopago2_41() {
    if ($_PORCENTCOPAGO == 9) {
        CopagoMask.typedValue = ' ';
    }
    else {
        $_COPAGOESTIMFACT = Math.round((($_VALORBRUTO + $_VLRIVAFACT - $_VALORDESFACT) * $_PORCENTCOPAGO) / 100);
    }
    _Datocopago_41();
}

function _Datocopago_41() {
    if (($_NITUSU == '0800162035') && ($_NITFACT == '9999') && ($_CLFACT == '0')) {
        $_COPAGOESTIMFACT = $_VALORTOTAL;
    }
    $_OPSEGU = 'I41C';
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_OPSEGU;
    SolicitarDll({ datosh: datos_envio }, _dataCON904S_07_41, get_url("/CONTAB/APP/CON904S.DLL"));
}

function _dataCON904S_07_41(data) {
    console.debug(data, 'CON904S_07');
    var date = data.split('|');
    if (date[1].trim() == '01') {
        if ((($_NITUSU == '0900405505') || ($_NITUSU == '0830511298')) && ($_GRUPOFACT == '93')) {
            _Evaluarcopagoestimfact();
        }
        else {
            _Editarabono_41();
        }
    }
    else if (date[1].trim() == '00') {
        _Evaluarcopagoestimfact_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Evaluarcopagoestimfact_41() {
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
                if (($_NITUSU == '0845000038') && (($_CLFACT == '0') || ($_CLFACT == '2') || ($_CLFACT == '3') || ($_CLFACT == '4'))) {
                    $_TIPOCOPAGOFACT = '2';
                    _Aceptarespec_41();
                }
                else {
                    var copagos = '[{"codigo": "1","descripcion": "CO-PAGO"},{"codigo": "2", "descripcion": "CUOTA MODERAD"},{"codigo": "3","descripcion": "PAGO CONTADO"}]'
                    var copago = JSON.parse(copagos);
                    var titulo = 'Tipo de pago';
                    POPUP({
                        array: copago,
                        titulo: titulo
                    },
                        _EvaluarSER822A_41);
                }
            }
        }
    }
}

function _EvaluarSER822A_41(data) {
    switch (data.id) {
        case 1:
        case 2:
        case 3:
            if ($_NITUSU == '0800074996') {
                var tiposdepago = '[{"codigo": "1","descripcion": "EFECTIVO"},{"codigo": "2", "descripcion": "TARJ.CRED."},{"codigo": "3","descripcion": "TARJ.DEBIT"}]'
                var tipodepago = JSON.parse(tiposdepago);
                var titulo = 'Forma de pago';
                POPUP({
                    array: tipodepago,
                    titulo: titulo
                },
                    _EvaluarCON820_41);
            }
            break;
        default:
            _Datocopago_41();
            break;
    }
    $('#VALOR').append(
        '<div class="salto-linea"></div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<div class="inline-inputs">' +
        '<label class="col-md-6 col-sm-6 col-xs-6">Tipo de copago</label>' +
        '<div class="input-group col-md-6 col-sm-6 col-xs-6">' +
        '<input id="tcopago_41" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '</div>'
    )
    $('#tcopago_41').val(data.id + ' - ' + data.descripcion);
}

function _EvaluarCON820_41(data) {
    switch (data.id) {
        case 1:
        case 2:
        case 3:
            _Aceptarespec_41();
            break;
        default:
            _Aceptartipocopago_41();
            break;
    }
    $('#DETALLECITA').append(
        '<div class="col-md-3 col-sm-8 col-xs-8">' +
        '<div class="inline-inputs">' +
        '<label class="col-md-6 col-sm-6 col-xs-6">Tipo Copago</label>' +
        '<div class="input-group col-md-6 col-sm-6 col-xs-6">' +
        '<input id="tcopago_41" class="form-control col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +
        '</div>'
    )
    data.id = 1 ? $_FPAGOFACT = '1' : $_FPAGOFACT = $_FPAGOFACT;
    data.id = 2 ? $_FPAGOFACT = '95' : $_FPAGOFACT = $_FPAGOFACT;
    data.id = 3 ? $_FPAGOFACT = '96' : $_FPAGOFACT = $_FPAGOFACT;
    $('#tcopago_41').val($_FPAGOFACT + ' - ' + data.descripcion);
}

function _Aceptarespec_41() {
    if ((($_PREFIJOFACT == 'C') || ($_PREFIJOFACT == 'E')) && ($_ESPECLAB.trim() = '')) {
        $_ESPECLAB = '385';
    }
    // AGREGAR QUE SEA EL PRIMER ARTFACT
    if (($_NITUSU == '0800162035') && ($_CLFACT == '7') && ($_CODTAR == 'PE') && (($_ARTFACT == '903841') || ($_ARTFACT == '903815') || ($_ARTFACT == '903816') || ($_ARTFACT == '903818'))) {
        CON851('3S', '3S', null, 'warning', 'Advertencia!');
    }
    if (($_NITUSU == '0800162035') && ($_CLFACT == '7') && ($_CODTAR == 'PE') && ($_ARTFACT == '903841')) {
        CON851('3S', '3S', null, 'warning', 'Advertencia!');
    }
    if (($_ESPECLAB.trim() == '') && (($_NITUSU == '0830092718') || ($_NITUSU == '0900019291') || ($_NITUSU == '0900193162'))) {
        $_ESPECLAB = '602';
    }
    if (($_NITUSU == '0845000038') && ($_TIPODRFACT == '1') && ($_COPAGOESTIMFACT > $_VALORBRUTO)) {
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
        function () { _Aceptarcodigo_41() },
        _Leerespec_41
    )
}

function _Leerespec_41() {
    $_ESPECLAB = $('#espec_41').val();
    let datos_envio = datosEnvio()
        + '|' + $_ESPECLAB.padStart(3, '0');
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_08, get_url('/SALUD/APP/SAL41-08.DLL'));
}

function _dataSAL41_08(data) {
    console.debug(data, 'SAL41-08');
    var date = data.split('|');
    // var swinvalid = '00';
    $_NOMBREESP = date[1].trim();
    $_INICESP = $_NOMBREESP.substring(0, 1);
    $_COSTOESP = date[2].trim();
    $('#despec_41').val($_NOMBREESP);

    if (date[0].trim() == '00') {
        if ($_INICESP == '*') {
            $('#despec_41').val('ESPECIALIDAD DESCTIVADA');
            CON851('13', '13', null, 'error', 'Error');
            _Evaluarespeclab_41();
        }
        else if ($_NITUSU == '0800037021') {
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
            if ($_NITUSU == '0845000038') {
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
        $('#espec_41').val('');
        _Evaluarespeclab_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Leerespec2_41() {
    if (($_NITUSU == '0800037021') && ($_CLFACT == '4') && ($_GRUPOFACT == 'S3')) {
        $_COSTOESP = '41'
    }
    // if (($_CLFACT == '1') && ($_MEDCIRFACT > 0) && ($_MEDCIRFACT =! $_NITUSU)){
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
    console.debug('aceptarcosto')
    if (($_CCOSTOSERV == '  ') || ($_CCOSTOSERV == '00')) {
        if ($_COSTOESP.trim() == '') {
            if ($_NITUSU == '0900030814') {
                $_SWINVALID = '0'
            }
            else {
                $_COSTOFACT = '00'
            }
            _Datocccosto_41();
        }
        else {
            $_COSTOFACT = $_COSTOESP;
            if ($_NITUSU == '0891855847') {
                switch ($_UNSERVFACT) {
                    case '01':
                        $_COSTOFACT = $_COSTOESP;
                        if (($_ESPECLAB == '382') || ($_ESPECLAB == '385')) {
                            $_COSTOFACT = 'CA';
                        }
                        else {
                            $_COSTO1FACT = 'C';
                        }
                        _Leercosto_41();
                        break;
                    case '02':
                        $_COSTOFACT = $_COSTOESP;
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
                        _Leercosto_41();
                        break;
                    case '04':
                        $_COSTOFACT = $_COSTOESP;
                        if (($_ESPECLAB == '382') || ($_ESPECLAB == '385') || ($_ESPECLAB == '530')) {
                            _Datocccosto_41();
                        }
                        else {
                            $_COSTO1FACT = 'D';
                            _Leercosto_41();
                        }
                        break;
                    default:
                        _Datocccosto_41();
                        break;
                }
            }
            else {
                _Leercosto_41();
            }
        }
    }
    else {
        $_COSTOFACT = $_CCOSTOSERV;
        if (($_NITUSU == '0900004059') || ($_NITUSU == '0900541158')) {
            if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
                $_COSTOFACT = ' ';
                _Datocccosto_41();
            }
            else {
                _Leercosto_41();
            }
        }
        else {
            _Datocccosto_41();
        }
    }
}
function _Datocccosto_41() {
    if (($_NITUSU == '0900541158') || ($_NITUSU == '0900566047') || ($_NITUSU == '0900565371') || ($_NITUSU == '0901120152')) {
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
    console.debug($_COSTOFACT);
    $('#ccostos_41').val($_COSTOFACT);
    let datos_envio = datosEnvio()
        + '|' + $_COSTOFACT.padStart(4, '0');
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_09, get_url('/SALUD/APP/SAL41-09.DLL'));

}
function _dataSAL41_09(data) {
    console.debug(data, 'SAL41-09');
    var date = data.split('|');
    $_NOMBRECOSTO = date[1].trim();
    if (date[0].trim() == '00') {
        $('#dccostos_41').val($_NOMBRECOSTO);
        if (($_NITUSU == '0844003225') && ($_COSTOFACT == '00')) {
            CON851('03', '03', null, 'error', 'Error');
            $('#ccostos_41').val('');
            _Evaluarcostofact_41();
        }
        else if ((($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) && ($_COSTOFACT == 'HX')) {
            _Ventanacama_41();
        }
        else {
            _Detalle_41();
        }
    }
    else if (date[0].trim() == '01') {
        CON851('02', '02', null, 'error', 'Error');
        $('#ccostos_41').val('');
        _Datocccosto_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _Ventanacama_41() {
    fuente = '<div class="col-md-12" id="CAMARXFACT_41"> ' +
        '<input id="camarxfact_41" class="form-control input-md" data-orden="1" maxlength="15"> ' +
        '</div>';
    _ventana({
        source: fuente,
        title: 'CAMA DEL PACIENTE',
        size: 'small',
        espace: false,
        focus: '#camarxfact_41',
        form: '#CAMARXFACT_41',
        order: '1',
        global1: '$_CAMARXFACT',
        inputglobal1: '#camarxfact_41',
    }, _Datocama_41, _Datocccosto_41);
}
function _Datocama_41() {
    setTimeout(_Detalle_41, 200);
}
function _Detalle_41() {
    var fuente = '<div class="col-md-12" id="DETALLE_41"> ' +
        '<input id="detalle_41" class="form-control input-md" data-orden="1" maxlength="15"> ' +
        '</div>';
    var ventanadetalle = bootbox.dialog({
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
                callback: _Datodiagnosticos_41,
                className: 'btn-primary'
            },
            cancelar: {
                label: 'Cancelar',
                callback: _Aceptarespec_41,
                className: 'btn-danger'
            }
        },

    });
    ventanadetalle.init($('.modal-footer').hide());
    ventanadetalle.on('shown.bs.modal', function () {
        $('#detalle_41').focus();
    });
    _Evaluardetalle_41();
}

function _Evaluardetalle_41() {
    validarInputs({
        form: '#DETALLE_41',
        orden: '1'
    },
        function () { $('.btn-danger').click() },
        _Validardetalle_41
    );
}

function _Validardetalle_41() {
    $_DETALLEFACT = $('#detalle_41').val();
    if ($_NITUSU == '0800251482') {
        $('.modal-body .row').append('<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">Detalle</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="DETALLE2_41">' +
            '<input id="detalle2_41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="5" data-orden="1">' +
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
            $_DETALLE2W = $('#detalle2_41').val();
            $_RECIBIDORX = $_DETALLE2W;
            if ($_NITUSU == '0800162035') {
                _Aceptarautorizacion_41();
            }
            else {
                if (parseInt($_NROCAPITNUM) > 0) {
                    $_NROAUTORELAB = '  ';
                    if (($_NITUSU == '0830512772') || ($_NITUSU == '0844002258') || ($_NITUSU == '0900565371') || ($_NITUSU == '0900471031') || ($_NITUSU == '0901120152')) {
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
        '<input id="autorizacion_41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '</div>');
    _Evaluarautorizacion_41();
}

function _Evaluarautorizacion_41() {
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
    $_NROAUTORELAB = $('#autorizacion_41').val();
    if (($_NITUSU == '0900405505') || ($_NITUSU == '0900005594') || ($_NITUSU == '019233740')) {
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
    if (($_NROAUTORELAB.trim() == '') && (($_NITUSU == '0830092718') || ($_NITUSU == '0900193162'))) {
        CON851('02', '02', null, 'error', 'Error');
        _Detalle_41();
    }
    else if ($_NITUSU == '0900405505') {
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
    if (($_NITUSU == '0830512772') || ($_NITUSU == '0900264583')) {
        var fuente = '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">DIAG 1:</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="DIAG1_41">' +
            '<input id="diag1_41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">' +
            '</div>' +
            '</div>' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">DIAG 2:</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="DIAG2_41">' +
            '<input id="diag2_41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">' +
            '</div>' +
            '</div>' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">DIAG 3:</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="DIAG3_41">' +
            '<input id="diag3_41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">' +
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
                    callback: _Datodiagnosticos_41,
                    className: 'btn-primary'
                },
                cancelar: {
                    label: 'Cancelar',
                    callback: _Aceptarespec_41,
                    className: 'btn-danger'
                }
            },

        });
        ventanadetalle.init($('.modal-footer').hide());
        ventanadetalle.init(_inputControl('disabled'));
        ventanadetalle.on('shown.bs.modal', function () {
            $('#diag1_41').focus();
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
    $_DIAG1 = $('#diag1_41').val();
    $_DIAG1 = $_DIAG1.padStart(3, '0');
    $_DIAG1 = '2' + $_DIAG1;
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_DIAG1
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_101, get_url('/SALUD/APP/SAL41-10.DLL'));
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
        $('#diag1_41').val('');
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
    $_DIAG2 = $('#diag2_41').val();
    $_DIAG2 = $_DIAG2.padStart(3, '0');
    $_DIAG2 = '2' + $_DIAG2;
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_DIAG2
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_102, get_url('/SALUD/APP/SAL41-10.DLL'));
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
        $('#diag2_41').val('');
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
    $_DIAG3 = $('#diag3_41').val();
    $_DIAG3 = $_DIAG3.padStart(3, '0');
    $_DIAG3 = '2' + $_DIAG3;
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_DIAG3
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_103, get_url('/SALUD/APP/SAL41-10.DLL'));
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
        $('#diag2_41').val('');
        _Evaluardiag3_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _Datopaqintegral_41() {
    $_PRIMERARTFACT = $('#TABLA_401 tbody tr')[0].textContent;
    $_PRIMERARTFACT = $_PRIMERARTFACT.substring(0, 6);
    $_LLAVETAB1 = $_CODTABW + $_TIPOTABW + $_PRIMERARTFACT.padEnd(10, ' ');
    if (($_CLFACT == '4') && (($_PRIMERARTFACT == 'XXDIFT') || ($_PRIMERARTFACT == 'XXDTOPA'))) {
        $('.modal-body .row').append('<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">CUP CIRUGIA PAQ.</label>' +
            '<div class="input-group col-md-2 col-sm-3 col-xs-3" id="CUPCIRUGIA_41">' +
            '<input id="cupcirugia_41" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
            '</div>' +
            '<button type="button" id="cupcirugiaBtn_41" class="btn btn-default col-md-1 col-sm-1 col-xs-1"> <i class="icon-magnifier"></i></button>' +
            '<div class="input-group col-md-5 col-sm-4 col-xs-4">' +
            '<input id="dcupcirugia_41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12">' +
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
    $_CUPPAQINTFACT = $('#cupcirugia_41').val();
    if ($_CUPPAQINTFACT.trim() == '') {
        // CONTINUE
    }
    else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_CUPPAQINTFACT.padEnd(13, ' ');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_072, get_url("/SALUD/APP/SAL41-07.DLL"));
    }
}

function _dataSAL41_072(data) {
    console.debug(data);
    var date = data.split('|');
    if (date[0].trim() == '00') {
        $('#dcupcirugia_41').val(date[2].trim());
        _Cerrarventanadetalle_41();
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#cupcirugia_41').val('');
        _Evaluarcupcirugia_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }
}

function _Cerrarventanadetalle_41() {
    if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
        $_PASOW = '0'
        if ($_NITFACT == '0860011153') {
            var causasestado = '[{"codigo": "1","descripcion": "ACCIDENTE DE TRABAJO"},{"codigo": "2", "descripcion": "ACCIDENTE DE TRANSITO"},{"codigo": "3", "descripcion": "ACCIDENTE RABICO"},{"codigo": "4", "descripcion": "ACCIDENTE OFIDICO"},{"codigo": "5", "descripcion": "OTRO TIPO DE ACCIDENTE"},{"codigo": "6", "descripcion": "EVENTO CATASTROFICO"},{"codigo": "7", "descripcion": "LESION POR AGRESION"},{"codigo": "8", "descripcion": "LESION AUTOINFLINGIDA"},{"codigo": "9", "descripcion": "SOSP.MALTRATO FISICO"},{"codigo": "A", "descripcion": "SOSP.ABUSO SEXUAL"},{"codigo": "B", "descripcion": "SOSP.MALTRATO EMOCIONAL"},{"codigo": "C", "descripcion": "ENFERMEDAD GENERAL"},{"codigo": "D", "descripcion": "ENFERMEDAD PROFESIONAL"},{"codigo": "E", "descripcion": "NO APLICA"}]';
            var causaestado = JSON.parse(causasestado);
            POPUP({
                array: causaestado,
                titulo: "Causa del Evento"
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
        '<input id="fechaevento_41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">Diagnostico</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="FECHAE_41">' +
        '<input id="diagnostico_41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="2">' +
        '</div>' +
        '</div>' +
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">Nit empresa</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="NITE_41">' +
        '<input id="fechaegreso_41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">Nit empresa</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="NITE_41">' +
        '<input id="fechaegreso_41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="2">' +
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
    ventanadetalle.init($('.modal-footer').hide());
    ventanadetalle.init(_inputControl('disabled'));
    ventanadetalle.on('shown.bs.modal', function () {
        $('#fechaingreso_41').focus();
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
    $_FECHAACCIDRIPS = $('#fechaevento_41').val();
    $_CODDIAGESTAD = $('#diagnostico_41').val();
}



function _Fechaestancia_41() {
    $_GRUPOFACT1 = $('#TABLA_401 tbody tr')[0].textContent;
    $_GRUPOFACT1 = $_PRIMERARTFACT.substring(0, 2);
    if (($_NITUSU == '0892000401') || ($_NITUSU == '0900541158') || ($_NITUSU == '0900566047') || ($_NITUSU == '0900658867') || ($_NITUSU == '0900565371') || ($_NITUSU == '0901120152')) {
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
        '<input id="fechaingreso_41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="1">' +
        '</div>' +
        '</div>' +
        '<div class="salto-linea"></div>' +
        '<div class="col-md-12 col-sm-12 col-xs-12"' +
        '<div class="inline-inputs">' +
        '<label class="col-md-4 col-sm-4 col-xs-4">FECHA DE EGRESO</label>' +
        '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="FECHA_41">' +
        '<input id="fechaegreso_41" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="12" data-orden="2">' +
        '</div>' +
        '</div>';
    var ventanadetalle = bootbox.dialog({
        size: 'medium',
        title: 'FECHA DE ESTANCIA',
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
    ventanadetalle.init($('.modal-footer').hide());
    ventanadetalle.init(_inputControl('disabled'));
    ventanadetalle.on('shown.bs.modal', function () {
        $('#fechaingreso_41').focus();
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
    $_FECHAINGESTAD = $('#fechaingreso_41').val();
    $_FECHASALESTAD = $('#fechaegreso_31').val();
    $_FECHAINGESTAD = moment($_FECHAINGESTAD).format('YYYYMMDD');
    $_FECHASALESTAD = moment($_FECHASALESTAD).format('YYYYMMDD');
    if (($_FECHASALESTAD = $_FECHAINGESTADO) && ($_HORAATENESTAD > $_HORASALIDESTAD)) {
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
        $('#atend_41').val($_MEDOTRFACT);
        _Mostrarmedico_41();
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
        function () { $('.btn-danger').click() },
        _Validarmedotrfact_41
    );
}
function _Validarmedotrfact_41() {
    $_MEDOTRFACT = $('#atend_41').val();
    if ((parseInt($_MEDOTRFACT) == 0) && (parseInt($_CLFACT) > 1)) {
        CON851('02', '02', null, 'error', 'Error');
        $('#atend_41').val('')
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
        let datos_envio = datosEnvio()
        datos_envio += '|'
        datos_envio += $_MEDOTRFACT.padStart(10, '0');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_11, get_url('/SALUD/APP/SAL41-11.DLL'))
    }
}
function _dataSAL41_11(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPPROF = date[1].trim();
    $_ESTADOPROF = date[2].trim();
    // $_CLPROF1 =  date[2].trim();
    // $_CLPROF2 =  date[3].trim();
    // $_CLPROF3 =  date[4].trim();
    // $_CLPROF4 =  date[5].trim();
    // $_CLPROF5 =  date[6].trim();
    // $_CLPROF6 =  date[7].trim();
    // $_CLPROF7 =  date[8].trim();
    $_CLPROF = [date[3].trim(), date[4].trim(), date[5].trim(), date[6].trim(), date[7].trim(), date[8].trim(), date[9].trim()];
    $_ESPPROF = [date[10].trim(), date[11].trim(), date[12].trim(), date[13].trim(), date[14].trim(), date[15].trim(), date[16].trim(), date[17].trim(), date[18].trim(), date[19].trim()]
    // $_ESPPROF1 = date[9].trim();
    // $_ESPPROF2 = date[10].trim();
    // $_ESPPROF3 = date[11].trim();
    // $_ESPPROF4 = date[12].trim();
    // $_ESPPROF5 = date[13].trim();
    // $_ESPPROF6 = date[14].trim();
    // $_ESPPROF7 = date[15].trim();
    // $_ESPPROF8 = date[16].trim();
    // $_ESPPROF9 = date[17].trim();
    // $_ESPPROF10 = date[18].trim();
    $_DIVPROF = date[20].trim();
    $_ATIENDEPROF = date[21].trim();
    $_ATIENDEW = $_PERSONALELAB = $_ATIENDEPROF;
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
    $('#datend_41').val($_DESCRIPPROF);
    if ($_ESTADOPROF == '2') {
        CON851('13', '13', null, 'error', 'Error');
        $('#datend_41').val('PROFESIONAL DESACTIVADO');
        $('atend_41').val('')
        _Evaluarmedotrfact_41();
    }
    else {
        _Validarmedotrfact3_41();
    }
}
function _Validarmedotrfact3_41() {
    switch ($_CLFACT) {
        case '0':
            $_J = 1
            break;
        case '1':
            $_J = 2
            break;
        case '2':
            $_J = 3
            break;
        case '3':
            $_J = 4
            break;
        case '4':
            $_J = 5
            break;
        case '5':
            $_J = 6
            break;
        case '6':
            $_J = 2
            break;
        case '7':
            $_J = 7
            break;
    }
    if ($_CLPROF[$_J] == 'N') {
        CON851('82', '82', null, 'error', 'Error');
        $('atend_41').val('')
        _Evaluarmedotrfact_41();
    }
    else if (($_ESPPROF[1].trim() == '') || ($_GRUPOFACT1 == '87') || ($_GRUPOFACT1 == '88') || ($_GRUPOFACT1 == '90') || ($_GRUPOFACT1 == '95')) {
        _Validarmedotrfact4_41();
    }
    else {
        if ($_ESPECLAB == ($_ESPPROF[1] || ($_ESPPROF[2]) || ($_ESPPROF[3]) || ($_ESPPROF[4]) || ($_ESPPROF[5]))) {
            _Validarmedotrfact4_41();
        }
        else {
            if (($_NITUSU == '0830092718') && ($_SUCW == 'SC')) {
                $_SWINVALID = '0';
                _Validarmedotrfact4_41();
            }
            else {
                CON851('82', '82', null, 'error', 'Error');
                if (($_NITUSU == '0892000401') && ($_ESPPROF[1] == '999')) {
                    _Validarmedotrfact4_41();
                }
                else {
                    $('atend_41').val('')
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
        SER891A_41();
    }
    if (($_CLFACT == '3') || ($_CLFACT == '5') || ($_CLFACT == '7')) {
        SER891AD_41();
    }
    if (($_HORACITFACT > 0) && (($_PREFIJOFACT = ! 'E') && ($_PREFIJOFACT = ! 'C'))) {
        if ((($_CLFACT == '1') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) && ($_EVALUACIONCITW == '1')) {
            if ($_LLAVENUM == $_FACTCAPITNUM) {
                _Evaluarremite_41();
            }
            else {
                if (($_NITUSU == '0900565371') || ($_NITUSU == '0900081643') || ($_NITUSU == '0901120152')) {
                    _Evaluarremite_41();
                }
                else {
                    CON851('7S', '7S', null, 'error', 'Error');
                    $('atend_41').val('')
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
    $_REMITEFACT = $('#solic_41').val();
    if (parseInt($_REMITEFACT) == 0) {
        if ((($_NITUSU == '0830092718') || ($_NITUSU == '0900193162')) && ($_PREFIJOUSU = ! 'SB')) {
            $_DESCRIPTER = '  ';
        }
        else {
            if (($_CLFACT == '0') || ($_CLFACT == '2') || ($_CLFACT == '3')) {
                CON851('02', '02', null, 'error', 'Error');
                $('#solic_41').val('');
                _Evaluarremite_41();
            }
            else {
                $_DESCRIPTER = '  ';
            }
        }
    }
    else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_REMITEFACT.padStart(10, '0');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_042, get_url('/SALUD/APP/SAL41-04.DLL'));
    }
}

function _dataSAL41_042(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPTER = date[1].trim();
    $_ACTTER = date[2].trim();
    $_ENTIDADTER = date[3].trim();
    if (date[0].trim() == '00') {
        $('#dsolic_41').val($_DESCRIPTER);
        if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
            _Claseproced_41();
        }
        else {
            let datos_envio = datosEnvio();
            datos_envio += '|'
            datos_envio += $_REMITEFACT.padStart(10, '0');
            SolicitarDll({ datosh: datos_envio }, _dataSAL41_112, get_url('/SALUD/APP/SAL41-11.DLL'));
        }
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#solic_41').val('');
        _Evaluarremite_41();
    }
    else {
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
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#solic_41').val('');
        _Evaluarremite_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _Claseproced_41() {
    if (($_PREFIJOFACT == 'P') || ($_PREFIJOFACT == 'T')) {
        $_CLASEPROCESTADO = '2';
    }
    else {
        if ($_PUERTAESTAD == '1') {
            $_CLASEPROCESTADO = '3';
        }
        else {
            $_CLASEPROCESTADO = '1';
        }
    }
    _Mostrarproced_41();
}
function _Mostrarproced_41() {
    switch ($_CLASEPROCESTADO) {
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
        $_TIPOPROCESTAD = '0';
        _Controlcapitacion_41();
    }
    else if ((($_NITUSU == '0830092718') || ($_NITUSU == '0900193162')) && ($_PREFIJOUSU = 'SB')) {
        _Datoespecremite_41();
    }
    else {
        _Datocondicion_41();
    }
}
function _Datocondicion_41() {
    if (($_SEXOPACI == 'M') || ($_CLFACT == '0')) {
        $_EMBARESTAD = '0';
        _Leercondic_41();
    }
    else {
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
                titulo: titulo
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
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">NP APLICA ESTADO</label>' +
                '</div>' +
                '</div>');
            _Leercondic2_41()
            break;
        case '1':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">1ER TRIM. EMBARAZO</label>' +
                '</div>' +
                '</div>');
            _Leercondic2_41()
            break;
        case '2':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">2DO TRIM. EMBARAZO</label>' +
                '</div>' +
                '</div>');
            _Leercondic2_41()
            break;
        case '3':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">3ER TRIM. EMBARAZO</label>' +
                '</div>' +
                '</div>');
            _Leercondic2_41()
            break;
        case '4':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">NO ESTA EMBARAZADA</label>' +
                '</div>' +
                '</div>');
            break;
        case '8':
            _Detalle_41();
            break;
    }
}
function _Leercondic2_41() {
    if ($_CLFACT == '7') {
        _Tipoproced_41();
    }
    else {
        if ($_DIAGNCUP1 == 'S') {
            $_TIPOPROCESTAD = '0';
            _Controlcapitacion_41();
        }
        else {
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
        titulo: titulo
    },
        _evaluarSER829_41);
}

function _evaluarSER829_41(data) {
    $_TIPOPROCESTAD = data.id;
    console.debug(data.id, data)
    switch (data.id) {
        case '1':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">DIAGNOSTICO</label>' +
                '</div>' +
                '</div>');
            _Tipoproced2_41();
            break;
        case '2':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">TERAPEUTICO</label>' +
                '</div>' +
                '</div>');
            _Tipoproced2_41();
            break;
        case '3':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">PROTEC. ESPECIFICA</label>' +
                '</div>' +
                '</div>');
            _Tipoproced2_41();
            break;
        case '4':
            $('#DETALLECITA').append('<div class="col-md-3 col-sm-3 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-12 col-sm-12 col-xs-12">PROTEC.ESPECIFICA</label>' +
                '</div>' +
                '</div>');
            _Tipoproced2_41();
            break;
        case '9':
            _Detalle_41();
            break;
    }
}
function _Tipoproced2_41() {
    if ($_TIPOPROCCUP = !$_TIPOPROCESTAD) {
        CON851('3D', '3D', null, 'error', 'Error');
        setTimeout(_Tipoproced_41, 200);
    }
    else {
        _Aceptarpersonal_41();
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
        titulo: titulo
    },
        _evaluarSER830_41);
}
function _evaluarSER830_41(data) {
    console.debug(data);
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
        case 'H':
        case 'I':
        case 'O':
        case 'T':
            console.debug(data.id);
            _Leerpersonal_41();
            $_PERSONALELAB = data.id;
            break;
    }
}
function _Leerpersonal_41() {
    if (($_ATIENDEESPCUP1.trim() == '') || ($_ATIENDEESPCUP1 == '9')) {
        _Datofinalidconsulta_41();
    }
    else {
        if ($_PERSONALELAB = !$_ATIENDEESPCUP1) {
            CON851('3E', '3E', null, 'error', 'Error');
            setTimeout(_Detalle_41, 200);
        }
        else {
            _Datofinalidconsulta_41();
        }
    }
}

function _Datofinalidconsulta_41() {
    console.debug('datofonalidadconsulta')
    if ($_CLFACT == '7') {
        _Datofinalidconsulta2_41();
    }
    else {
        $_FINALIDESTAD = '10';
        _Controlcapitacion_41();
    }
}

function _Datofinalidconsulta2_41() {
    if (($_NITUSU == '0800162035') && ($_FINALANTW.trim() = ! '')) {
        $_FINALIDESTAD = $_FINALANTW;
    }
    _SER834A();
}

function _SER834A() {
    var personalatiende = '';
    var i;
    var l;
    if ($_NITUSU == '0844003225') {
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
        titulo: 'Finalidad de la consulta'
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
    if (($_NITUSU == '0900306771') && ($_GRUPOFACT1 == '89')) {
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
        if (($_NITUSU == '0845000038') && ($_NITUSU == '0900405505')) {
            CON851('4K', '4K', null, 'warning', 'Advertencia!');
        }
    }
    if (($_FINALIDCUP.trim() == '') || ($_FINALIDCUP == '0') || ($_FINALIDCUP == '10')) {
        _Datocronico_41();
    }
    else {
        if ($_FINALIDCUP = !$_FINALIDESTAD) {
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
            '<input id="cronico_41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
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
        $_CRONICOFACT = ' '
        $('#elementos-tabla').append(
            '<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12" id="CRONICO_41">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-6 col-sm-8 col-xs-12">Patol. cronica</label>' +
            '<div class="input-group col-md-6 col-sm-4 col-xs-12">' +
            '<input id="cronico_41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
            '</div>' +
            '</div>' +
            '</div>');
        $('#cronico_41').val($_CRONICOFACT);
        _Datocronico2_41();
    }
}

function _Datocronico2_41() {
    $_CRONICOFACT = $('#cronico_41').val();
    if ($_CRONICOFACT.trim() == '') {
        $_DESCRIPCRONIC = ' ';
        _Controlcapitacion_41();
    }
    else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_CRONICOFACT.padStart(3, '0');
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_12, get_url('/SALUD/APP/SAL41-12.DLL'));
    }
}

function _dataSAL41_12(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPCRONIC = date[1].trim();
    if (date[0].trim() == '00') {
        $('#dcronico').val($_DESCRIPCRONIC);
        _Controlcapitacion_41();
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        $('#cronico_41').val('');
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
    console.debug('controlcapacitacion')
    if (($_NITUSU == '0891855847') && ($_CLFACT == '0')) {
        _Controlcapitacion2_41();
    }
    else {
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
    $_CONTROLCAPESTAD = $('#cap_41').val();
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_CONTROLCAPESTAD.padStart(2, '0');
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_13, get_url('/SALUD/APP/SAL41-13'));
}
function _dataSAL41_13(data) {
    console.debug(data);
    var date = data.split('|');
    $_DESCRIPGRCAP = date[1].trim();
    $_CLASEGRCAP = [date[2].trim(), date[3].trim(), date[4].trim(), date[5].trim(), date[6].trim(), date[7].trim(), date[8].trim(), date[9].trim(), date[10].trim()]
    if (date[0].trim() == '00') {
        $('#dcap_41').val($_DESCRIPGRCAP);
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
        $('#cap_41').val('');
        _Controlcapitacion2_41();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav)
    }
}

function _Controlcapitacion3_41() {
    if ($_CLASEGRCAP[$_J] == 'N') {
        CON851('03', '04', null, 'error', 'Error');
        $('#cap_41').val('');
        _Controlcapitacion2_41();
    }
    else {
        _Confirmargrabar_41();
    }
}

function _Confirmargrabar_41() {
    var mensaje = '01';
    console.debug(mensaje);
    CON851P(mensaje, _Detalle_41, _Confirmargrabar2_41);
}

function _Confirmargrabar2_41() {
    console.debug('confirmar guardar');
    if (($_GRUPOFACT1.trim() == '') || (parseInt($_GRUPOFACT1) == 0)) {
        _Evaluarcodservicio_41();
    }
    $_HORAELABFACT = moment().format('LT');
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
            datos_envio += '|'
            datos_envio += $_SECUNUM;
            SolicitarDll({ datosh: datos_envio }, _dataCON007_03_41, get_url('/CONTAB/APP/CON007.DLL'))
            break;
        case 'E':
            $_SECUNUM = '89';
            var datos_envio = datosEnvio();
            datos_envio += '|'
            datos_envio += $_SECUNUM;
            SolicitarDll({ datosh: datos_envio }, _dataCON007_03_41, get_url('/CONTAB/APP/CON007.DLL'))
            break;
        default:
            _Leerfactura_41();
            break;
    }
}
function _dataCON007_03_41(data) {
    console.debug(data);
    var date = data.split('|');
    $_NUMEROOTROS = date[3].trim();
    if (date[0].trim() == '00' || date[0].trim() == '01') {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_SECUNUM;
        SolicitarDll({ datosh: datos_envio }, _dataCON007X_01_41, get_url('/CONTAB/APP/CON007X.DLL'))
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _dataCON007X_01_41(data) {
    console.debug(data);
    var date = data.split('|');
    $_NROOTROS = $_NROCTAFACT;
    _Leerfactura_41();
}

function _Leerfactura_41() {
    console.debug('leerfactura');
    if (($_NITUSU == '0830512772') && ($_CLFACT)) {
        $_SWBUSCAR3 = 0;
        _Buscarpendiente_41();
        if ($_SWBUSCAR3 > 0) {
            $_NROPENDIW = $_LLAVEFACT;
            $_FECHAFACT = $_FECHAFACT.replace('-', '')
            $_FECHAPENDIW = $_FECHAFACT;
            $_HORAPENDIW = moment().format('LT');
            $_HORAPENDIW = $_HORAPENDIW.replace(':', '');
            $_CANTPENDIW = $_SWBUSCAR3;
            $_PENDIENTEW = 'S';
            $_TIPOPENDIW = 1;
        }
        else {
            $_PENDIENTEW = 'N';
        }
    }
    if ((($_NITUSU == '0900541158') || ($_NITUSU == '0900566047') || ($_NITUSU == '0900565371') || ($_NITUSU == '0901120152')) && ($_FACTAUTOFACT == 2) && ($_SWAUTOPASO == 0)) {
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
    $_MULTFACT = '00'; // INITIALIZE
    $_NROCIRFACT = '00';
    $_FPAGOFACT = '00';
    $_NROFORMFACT = '0000000000000000';
    $_CAMARXFACT = '    ';
    $_CAUSAESTAD = '00';
    $_CLASEPROCESTADO = '0';
    $_TIPOPROCESTAD = '0';
    $_HORAATENESTAD = '0000';
    $_HORASALIDESTAD = '0000';
    $_ESPECREMIFACT = '   ';
    $_TIPODRFACT = '0';
    $_CUPPAQINTFACT = '        ';
    $_ORDSERVFACT = ' ';
    $_RECIBIDORX = ' ';
    $_EMPRESAPACIRIPS = '                                                  ';
    $_CRONICOFACT = '   ';
    $_PENDIENTEW = ' ';
    $_NROPENDIW = '  0000000';
    $_FECHAPENDIW = '00000000';
    $_HORAPENDIW = '0000';
    $_CANTPENDIW = '000';
    $_TIPOPENDIW = '0';
    $_FACTAUTOFACT = '0';
    $_CTAFACT = $_PREFIJOFACT + $_NROFACT.padStart(6, '0');
    let datos_envio = datosEnvio();
    datos_envio += '|' + $_LLAVEFACT
    datos_envio += '|' + $_FECHAFACT
    datos_envio += '|' + $_CTAFACT
    datos_envio += '|' + $_NITFACT
    datos_envio += '|' + $_IDHISTORIAFACT
    datos_envio += '|' + $_FECHAINGESTAD
    // TABLA FACT
    datos_envio += '|' + $_VALORDESFACT
    datos_envio += '|' + $_TIPOCOPAGOFACT
    datos_envio += '|' + $_COPAGOESTIMFACT
    datos_envio += '|' + $_VLRIVAFACT
    datos_envio += '|' + $_MEDCIRFACT
    datos_envio += '|' + $_MEDAYUFACT
    datos_envio += '|' + $_MEDANEFACT
    datos_envio += '|' + $_MEDINSFACT
    datos_envio += '|' + $_MEDOTRFACT
    datos_envio += '|' + $_VIAFACT
    datos_envio += '|' + $_MULTFACT // NIT MEDICO
    datos_envio += '|' + $_NROCIRFACT // NIT MEDICO
    datos_envio += '|' + $_CRUENTAFACT
    // datos_envio += '|' + $_GRUPOCIRFACT // GRUPO-CIR-FACT NO SE GUARDA
    datos_envio += '|' + $_PUERTAESTAD
    datos_envio += '|' + $_TARIFFACT
    datos_envio += '|' + $_COSTOFACT
    datos_envio += '|' + $_ESPECLAB
    datos_envio += '|' + $_DETALLEFACT
    datos_envio += '|' + $_CONTROLCAPESTAD
    datos_envio += '|' + $_NROAUTORELAB
    // datos_envio += '|' + $_CONTROLMESFACT // NO SE GUARDA
    datos_envio += '|' + $_FPAGOFACT
    // datos_envio += '|' + $_BLOQUEOIMPFACT // NO SE GUARDA
    datos_envio += '|' + $_NROFORMFACT // SER815
    datos_envio += '|' + $_CAMARXFACT
    datos_envio += '|' + $_OPERELABFACT
    datos_envio += '|' + $_FECHAELABFACT
    datos_envio += '|' + $_HORAELABFACT
    datos_envio += '|' + $_HORAATENESTAD
    // datos_envio += '|' + $_OPERCORRECFACT // NO SE GUARDA
    // datos_envio += '|' + $_FECHACORRECFACT // NO SE GUARDA
    // datos_envio += '|' + $_HORACORRECFACT // NO SE GUARDA
    datos_envio += '|' + $_UNIDEDADELAB
    datos_envio += '|' + $_VLREDADELAB
    datos_envio += '|' + $_CAUSAESTAD
    datos_envio += '|' + $_EMBARESTAD
    datos_envio += '|' + $_PERSONALELAB
    datos_envio += '|' + $_CLASEPROCESTADO
    datos_envio += '|' + $_TIPOPROCESTAD
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
    datos_envio += '|' + $_REMITEFACT
    datos_envio += '|' + $_ESPECREMIFACT
    datos_envio += '|' + $_UNSERVFACT
    datos_envio += '|' + $_TIPODRFACT
    // datos_envio += '|' + $_BIRADSFACT // NO SE GUARDA
    datos_envio += '|' + $_MACROFACT
    // datos_envio += '|' + $_ULTEXAMENESTAD // NO SE GUARDA
    // datos_envio += '|' + $_COMPLEJIDADFACT // NO SE GUARDA
    datos_envio += '|' + $_CUPPAQINTFACT
    datos_envio += '|' + $_ORDSERVFACT
    // datos_envio += '|' + $_ENTREGARXFACT // SOLO SE MUEVE 1 ARCHIVO
    datos_envio += '|' + $_RECIBIDORX
    datos_envio += '|' + $_CRONICOFACT
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
    datos_envio += '|' + $_PENDIENTEW
    datos_envio += '|' + $_NROPENDIW
    datos_envio += '|' + $_FECHAPENDIW
    datos_envio += '|' + $_HORAPENDIW
    datos_envio += '|' + $_CANTPENDIW
    datos_envio += '|' + $_TIPOPENDIW
    datos_envio += '|' + $_FACTAUTOFACT
    datos_envio += '|' + $_VLRIVA1FACT
    datos_envio += '|' + $_VLRIVA2FACT
    datos_envio += '|' + $_VLRIVA3FACT
    datos_envio += '|' + $_EMPRESAPACIRIPS
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataSAL41_15, get_url('/SALUD/APP/SAL41-15.DLL'));
}
function _dataSAL41_15(data) {
    console.debug(data);
    data = data.split('|');
    $_NROFACT = data[1].trim();
    $_NROW = data[2].trim();
    let datos_envio = datosEnvio();
    datos_envio += '|' + $_SECUNUM
    datos_envio += '|' + $_NROFACT
    datos_envio += '|' + $_FECHAFACT
    SolicitarDll({ datosh: datos_envio }, _dataCON007X_02_41, get_url('/CONTAB/APP/CON007X.DLL'));
}
function _dataCON007X_02_41(data) {
    console.debug(data);
    data = data.split('|');
    $_NROW = data[1].trim();
    $_DETALLEMOV = data[2].trim();
    if ((($_NITUSU == '0892000401') || ($_NITUSU == '0900648993') || ($_NITUSU == '0891855847') || ($_NITUSU == '0900755133') || ($_NITUSU == '0900804411') || ($_NITUSU == '0900870633') || ($_NITUSU == '0800037021') || ($_NITUSU == '0892000458') || ($_NITUSU == '0832002436') || ($_NITUSU == '0844003225')) && ($_CLFACT == '0') && ($_NROPEDFACT > 0)) {
        SER815C_41(); // CONTROL DE DISPENSACION
    }
    else if ((($_NITUSU == '0900541158') || ($_NITUSU == '0900566047') || ($_NITUSU == '0900565371') || ($_NITUSU == '0901120152')) && ($_FACTAUTOFACT == '2')) {
        SER108DB(); // IMPRIME FACTURAS (RESUMEN DE COMPROBANTES)
    }
    else {
        _Contabiliarcomp_41();
    }
}
function _Contabiliarcomp_41() {
    if ($_TIPO1COMP == '1') {
        if (($_PREFIJOFACT == "A") || ($_PREFIJOFACT == "B") || ($_PREFIJOFACT == "D") || ($_PREFIJOFACT == "F") || ($_PREFIJOFACT == "G") || ($_PREFIJOFACT == "H") || ($_PREFIJOFACT == "I") || ($_PREFIJOFACT == "J") || ($_PREFIJOFACT == "K") || ($_PREFIJOFACT == "L") || ($_PREFIJOFACT == "M") || ($_PREFIJOFACT == "N") || ($_PREFIJOFACT == "O") || ($_PREFIJOFACT == "P") || ($_PREFIJOFACT == "Q") || ($_PREFIJOFACT == "R") || ($_PREFIJOFACT == "S") || ($_PREFIJOFACT == "T") || ($_PREFIJOFACT == "V") || ($_PREFIJOFACT == "W") || ($_PREFIJOFACT == "X") || ($_PREFIJOFACT == "Y") || ($_PREFIJOFACT == "Z")) {
            // INV020GA(); // ACUMULAR FACTURA PARA CARTERA
            let datos_envio = datosEnvio()
            datos_envio += '|' + $_LLAVEFACT
            datos_envio += '|' + $_FECHA_LNK
            datos_envio += '|' + $_NITUSU
            datos_envio += '|' + $_SALMINUSU
            SolicitarDll({ datosh: datos_envio }, _dataINV020GA_41, get_url('/SALUD/APP/INV020GA.DLL'));
        }
        else if (($_PREFIJOFACT == 'E') || ($_PREFIJOFACT == 'C')) {
            let datos_envio = datosEnvio();
            datos_envio += '|' + $_LLAVEFACT
            datos_envio += '|' + $_FECHA_LNK
            datos_envio += '|' + $_NITUSU
            datos_envio += '|' + $_SALMINUSU
            datos_envio += '|' + $_CONTADOUSU
            datos_envio += '|' + $_PUCUSU
            datos_envio += '|' + $_PREFIJOUSU
            datos_envio += '|' + $_CONTABPOSUSU
            datos_envio += '|' + $_RETCREEUSU
            datos_envio += '|' + $_PEDIDOUSU
            datos_envio += '|' + $_AUTORETUSU
            datos_envio += '|' + $_RETENEDORUSU
            datos_envio += '|' + $_NOMBREUSU.substring(0, 7)
            datos_envio += '|' + $_SEPARACAJAUSU
            SolicitarDll({ datosh: datos_envio }, _dataINV020_41, get_url('/SALUD/APP/INV020.DLL'));
            // INV020(); // FACTURACION CLINICALS - CONTABILIZA UNA FACTURA
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
    if (($_FINALIDESTAD == '11') && ($_CRONICOPACI = ! 'S')) {
        // OPEN I-O EN ARCHIVO PACIENTES 7848
    }
    else {
        _Generarhl7_41();
    }
}

function _Generarhl7_41() {
    if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
        if ($_FECHAACT == $_FECHAFACT) {
            _Montarhl7_41();
        }
        else {
            _Descargarinvent_41();
        }
    }
    else {
        _Descargarinvent_41();
    }
}

function _Descargarinvent_41() {
    if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
        _Descargarinvent2_41();
    }
    else {
        if (($_INVENTUSU == 'S') && (($_CLFACT == '0') || ($_MACROFACT == '1'))) {
            $_SWRECAL = 0;
            let datos_envio = datosEnvio()
            datos_envio += '|' + $_LLAVEFACT
            datos_envio += '|' + $_SWRECAL
            SolicitarDll({ datosh: datos_envio }, _dataINV030_41, get_url('/SALUD/APP/INV030.DLL'));
        }
        else {
            _Descargarinvent2_41();
        }
    }
}

function _dataINV030_41(data) {
    data = data.split('|');
    if (data.trim() == '00') {
        let datos_envio = datosEnvio()
        datos_envio += '|' + $_LLAVEFACT
        datos_envio += '|' + $_SWRECAL
        SolicitarDll({ datosh: datos_envio }, _dataINV030V_41, get_url('/SALUD/APP/INV030V.DLL'));
    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _dataINV030V_41(data) {
    data = data.split('|');
    if ((data[0].trim() == '00') && ($_CLFACT == '0') && ($TABLAFACT[0].ALMAFACT = ! "SIN")) {
        CON851('3M', '3M', null, 'warning', 'Advertencia!');
        if (($_NITUSU == '0892000401') || ($_NITUSU == '0900648993') || ($_NITUSU == '0900755133') || ($_NITUSU == '0900804411') || ($_NITUSU == '0900870633')) {
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
    if (($_SWBONO == '1') && ($_TIPO_COMP == '1')) {
        // ESCRIBIR ARCHIVO PROMOCION 7893
    }
    else {
        Imprimir_41();
    }
}

function _Imprimir_41() {
    if ($_TIPOCAJAUSU > 1) {
        _Abrircaja_41();
    }
    if (($_REDEXTERNUM == 'N') || ($_FECHAFACT < $_FECHAACT)) {
        _Imprimir2_41();
    }
    else {
        if ($_PUERTAESTAD == 2) {
            let artfact = $TABLAFACT[0].ARTFACT;
            if ((($_CLFACT == '1') || ($_CLFACT == '5')) || (artfact.substring(0, 2) == '99') || (artfact.substring(0, 2) == '23') || (artfact.substring(0, 2) == 'F8') || (artfact.substring(0, 2) == '13') || (artfact.substring(0, 2) == '12') || (($_CLFACT == '7') && (artfact.substring(0, 2) = ! '90')) || (($_NITUSU == '0830092718') && ($_CLFACT == '3')) || (($_NITUSU == '0900193162') && ($_CLFACT == '3')) || (($_NITUSU == '0830092719') && ($_CLFACT == '3')) || (($_NITUSU == '0800037979') && ($_CLFACT == '3')) || (($_NITUSU == '0800037979') && ($_CLFACT == '4')) || (($_NITUSU == '0900405505') && ($_CLFACT == '3')) || (($_NITUSU == '0900073674') && ($_CLFACT == '3')) || (($_NITUSU == '0800175901') && ($_CLFACT == '4')) || (($_NITUSU == '0830511298') && ($_CLFACT == '4')) || (($_NITUSU == '0900004059') && (parseInt($_CLFACT) > 0)) || (($_NITUSU == '0900005594') && (parseInt($_CLFACT) > 0)) || (($_NITUSU == '0900405505') && ($_CLFACT == '3'))) {
                $_ACTCITW = 'F';
                let datos_envio = datosEnvio()
                datos_envio += $_LLAVEFACT
                datos_envio += $_FINALIDESTAD
                datos_envio += $_ACTCITW
                SolicitarDll({ datosh: datos_envio }, _dataSER891_41, get_url("/SALUD/APP/SER891.DLL"));
            }
            else {
                _Imprimir2_41();
            }
        }
        else {
            if ((($_NITUSU == '0900004059') || ($_NITUSU == '0830092718') || ($_NITUSU == '0900193162') || ($_NITUSU == '0900405505') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900405505') || ($_NITUSU == '0900005594')) && (parseInt($_CLFACT) > 0)) {
                $_ACTCITW = 'F';
                let datos_envio = datosEnvio()
                datos_envio += $_LLAVEFACT
                datos_envio += $_FINALIDESTAD
                datos_envio += $_ACTCITW
                SolicitarDll({ datosh: datos_envio }, _dataSER891_41, get_url("/SALUD/APP/SER891.DLL"));
            }
            else {
                _Imprimir2_41();
            }
        }
    }
}

function _dataSER891_41(data) {
    data = data.split('|');
    if (data[0].trim() == '00') {
        _Imprimir2_41();
    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Imprimir2_41() {
    if (($_NITUSU == '0845000038') && ($_PUERTAESTAD == '8') && (parseInt($_CLFACT) > 0)) {
        $_ACTCITW = 'F';
        let datos_envio = datosEnvio()
        datos_envio += $_LLAVEFACT
        datos_envio += $_FINALIDESTAD
        datos_envio += $_ACTCITW
        SolicitarDll({ datosh: datos_envio }, _dataSER8912_41, get_url("/SALUD/APP/SER891.DLL"));
    }
    else {
        _Imprimir3_41();
    }
}

function _dataSER8912_41(data) {
    data = data.split('|');
    if (data[0].trim() == '00') {
        _Imprimir3_41();
    }
    else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _Imprimir3_41() {
    let artfact = $TABLAFACT[0].ARTFACT;
    if ((($_CLFACT == '1') || ($_CLFACT == '4') || ($_CLFACT == '5') || ($_CLFACT == '7')) || (($_CLFACT == '0') && (artfact.substring(0, 2) == 'MO'))) {
        if ((($_ESPECLAB == '250') || ($_ESPECLAB == '460')($_ESPECLAB == '461')($_ESPECLAB == '462')($_ESPECLAB == '463')($_ESPECLAB == '464')($_ESPECLAB == '510')($_ESPECLAB == '220')) || ((parseInt(artfact) == 890203) || (parseInt(artfact) == 890303) || (parseInt(artfact) == 890304) || (parseInt(artfact) == 890403) || (parseInt(artfact) == 890404) || (parseInt(artfact) == 890703) || (parseInt(artfact) == 890704))) {
            let datos_envio = datosEnvio()
            datos_envio += $_LLAVEFACT
            SolicitarDll({ datosh: datos_envio }, _dataSER448O_41, get_url("/SALUD/APP/SER448O.DLL")); // FALTA FD-HISOD17 FD-ODEVO17
        }
        else {
            if (($_NITUSU == '0800162035') && ((parseInt(artfact) == 990113) || (artfact == 'A10502'))) {
                _Imprimir4_41();
            }
            else {
                let datos_envio = datosEnvio()
                datos_envio += $_LLAVEFACT
                SolicitarDll({ datosh: datos_envio }, _dataSER448C_41, get_url("/SALUD/APP/SER448C.DLL")); // FALTA
            }
        }
        _Releerrips_41(); // Pendiente
    }
    else {
        _Imprimir4_41();
    }
}

function _dataSER448O_41(data) {
    data = data.split('|');
}

function _dataSER448C_41(data) {
    data = data.split('|');
}

function _Imprimir4_41() {
    if ((($_NITUSU == '0900264583') || ($_NITUSU == '0900030814')) && ($_CODDIAGESTAD[1].trim() == '')) {
        //SER421 OTRA OPCION _dataSER421_41
    }
    if (($_PREFIJOFACT == 'C') || ($_PREFIJOFACT == 'E')) {
        _Imprimir5_41();
    }
    else {
        let artfact = $TABLAFACT[0].ARTFACT
        if ((artfact == 890701) || (artfact == 890702) || (artfact == 890703) || (artfact == 890704)) {
            if ($_CODDIAGESTAD[0].trim() == '') {
                //SER421 OTRA OPCION _dataSER421_41
            }
            if ($_NITUSU == '0800162035') {
                _Imprimir6_41();
            }
            else {
                let datos_envio = datosEnvio()
                datos_envio += '|' + $_LLAVEFACT
                SolicitarDll({ datosh: datos_envio }, _dataSER411U_41, get_url("/SALUD/APP/INV411U.DLL")); // FALTA
            }
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
    if ($_NITUSU == '0822007038') {
        _Imprimir7_41();
    }
    else {
        if (($_UNSERVFACT == '01') && ($_CLFACT == '5')) {
            let datos_envio = datosEnvio()
            datos_envio += '|' + $_LLAVEFACT
            datos_envio += '|' + $_FECHAFACT // convertir a fecha legible en .net
            datos_envio += '|' + $_IDHISTORIAFACT
            SolicitarDll({ datosh: datos_envio }, _dataSER880TG_41, get_url("/SALUD/APP/SER880TG.DLL"));
        }
    }
}

function _dataSER880TG_41(data) {
    data = data.split('|');
    _Imprimir7_41();
}

function _Imprimir7_41() {
    if (($.isNumeric($_CONTROLCAPNUM)) || (parseInt($_CONTROLCAPNUM) = 0) || ($_CONTROLCAPNUM == '9999')) {
        _Imprimir8_41();
    }
    else {
        let datos_envio = datosEnvio()
        datos_envio += '|' + $_CONTROLCAPNUM
        datos_envio += '|' + $_FECHAFACT
        SolicitarDll({ datosh: datos_envio }, _dataSAL41_16, get_url("/SALUD/APP/SAL41-16.DLL")); //FALTA
    }
}

function _dataSAL41_16(data) {
    data = data.split('|');
    _Imprimir8_41();
}

function _Imprimir8_41() {
    if ((($_CLFACT == '0') && ($_NITUSU == '0822005339')) || (($_REDEXTERNUM == 'S') && ($_DIAGNCUP = ! 'N'))){
        //SER421 OTRA OPCION _dataSER4213_41
    }
    if (($_NITUSU == '0900264583') && ($_DIAGNCUP = ! 'N') && ($_CODDIAGESTAD[0].trim() == '')) {
        //SER421 OTRA OPCION _dataSER4214_41
    }
    else {
        let grupofact = $TABLAFACT[0].ARTFACT.substring(0, 2);
        let grupofact2 = $TABLAFACT[0].ARTFACT.substring(0, 2);
        if ((grupofact = '73' || grupofact == '74' || grupofact2 == '73' || grupofact2 == '74' || grupofact == 'F8' || grupofact == 'FS' || grupofact2 == 'F8' || grupofact2 == 'FS') && ($_DIAGNCUP = ! 'N')) {
            //SER421 OTRA OPCION _dataSER4214_41
        }
        else {
            if (($_CLFACT == '1') && ($_CODDIAGESTAD[0].trim() == '') && ($_DIAGNCUP = ! 'N')) {
                //SER421 OTRA OPCION _dataSER4214_41
            }
            else {
                if (((parseInt($_CLFACT) > 2) || (($_NITUSU == '0891855847') && ($_CLFACT == '1'))) && (($_FECHAINGESTAD < $_FECHAACT) || (($_PUERTAESTAD = ! '1') && ($_HORAELABFACT > 1915))) && ($_DIAGNCUP = ! 'N') && ($_CODDIAGESTAD[0].trim() == '')) {
                    //SER421 OTRA OPCION _dataSER4213_41
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
    if (($_PUCUSU == '1') && (($_CLFACT == '0') || ($_CLFACT == '2') || ($_CLFACT == '3')) && ($_POSUSU == 'S')) { // FALTA POSUSU
        $_FORMATOW = 2;
    }
    else {
        $_FORMATOW == 1
    }
    if (($_NITUSU == '0830092718') && ($_PREFIJOUSU == 'TU')) {
        // REGRESAR
    }
    else {
        if ((($_NITUSU == '0892000401') || ($_NITUSU == '0900648993') || ($_NITUSU == '0900755133') || ($_NITUSU == '0900804411') || ($_NITUSU == '0900870633')) && ($_CLFACT == '5')) {
            $_FORMATOW = 0
            _Imprimir10_41();
        }
        else {
            let datos_envio = datosEnvio()
            datos_envio += '|' + $_FORMATOW
            SolicitarDll({ datosh: datos_envio }, _dataSER811_41, get_url("/SALUD/APP/SER811.DLL")); // FALTA
        }
    }
}

function _dataSER811_41(data) {
    data = data.split('|');
    _Imprimir10_41();
}

function _Imprimir10_41() {
    $_SWMOSTRAR = 2;
    $_REIMPW = '0';
    if (($_UNSERVFACT == '02') || ($_UNSERVFACT == '06')) {
        //
    }
    else {
        if (($_NITUSU == '0800162035') && ($_FORMATOW > 0) && ($_CLFACT == '0')) {
            $_FORMATOW = 5
        }
    }
    if (($_NITUSU == '0900565731') && ($_SWOCULTAR == '01')) {
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
            if ($_NITUSU == '0800162035') {
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
        var artfactm1 = $TABLAFACT[i + 1].ARTFACT;
        var artfactm2 = $TABLAFACT[i + 2].ARTFACT;
        var grupofact = $_ARTFACTI.substring(0, 2);
        $_DATOSETCUPK = $TABLAFACT[i].DATOSETCUP;
        if (grupofact.trim() == '' || grupofact == 'XX' || grupofact == 'MX' || grupofact == 'MQ') {
            $_SWINVALID = 0;
        } else {
            if (datosetcup.trim() = ! '') {
                $_SWBUSCAR2 = 0;
                _Buscarcupsppal_41();
                if ($_SWBUSCAR2 = 1) {
                    if ($TABLAFACT[i + 1].$_ARTFACTI == datosetcup) {
                        $TABLAFACT[i].CISCUP == 'N';
                    }
                    else {
                        $TABLAFACT[i].CISCUP == 'S';
                    }
                }
            }
            $_SWBUSCAR = 0;
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
                    switch ($_NITUSU) {
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
                    $NROMSGL1 = $_NROFACT;
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
                    SolicitarDll({ datosh: datos_envio }, _dataHL7001_41, get_url("/SALUD/APP/HL7001.DLL"));
                }
                _HL70002_41();
            }
            let datos_envio = datosEnvio()
            datos_envio += '|' + $_LLAVEFACT
            datos_envio += '|' + $_SWRECAL
            datos_envio += '|' + $_PUCUSU
            datos_envio += '|' + $_PREFIJOUSU
            datos_envio += '|' + $_NITUSU.padStart(10, '0');
            datos_envio += '|' + $_LOTEFARMUSU
            SolicitarDll({ datosh: datos_envio }, _dataRXWEB01, get_url("/SALUD/APP/RXWEB01.DLL"));
        }
    }
}

function _dataRXWEB01(data) {
    data = data.split('|');
    $_CODLOTEFACT = '****';
}

function _dataHL7001_41(data) {
    data = data.split('|');
    $NOMSALIDA = data[0].trim();
    $_TIPOMSGW = 'ADT-';
    $_ESTADOW = 0;
    let datos_envio = datosEnvio()
    datos_envio += '|' + $_LLAVEFACT
    datos_envio += '|' + $I
    datos_envio += '|' + $_ESTADOW
    datos_envio += '|' + $_FECHAFACT
    datos_envio += '|' + $NOMSALIDA
    datos_envio += '|' + $_TIPOMSGW
    SolicitarDll({ datosh: datos_envio }, _dataHL7000_41, get_url("/SALUD/APP/HL7000.DLL"));
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
    switch ($_NITUSU) {
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
    $NROMSGL1 = $_NROFACT;
    $ITEMMSGL1 = $I;
    $
    let datos_envio = datosEnvio
    datos_envio += '|' + $_CODCIUUSU
    datos_envio += '|' + $_NUIRUSU
    datos_envio += '|' + $_LLAVEFACT
    datos_envio += '|' + $_LLAVEFACT
    datos_envio += '|' + $EMPRMSGL1
    datos_envio += '|' + $SUCMSGL1
    datos_envio += '|' + $CLMSGL1
    datos_envio += '|' + $NROMSGL1
    datos_envio += '|' + $ITEMMSGL1
    datos_envio += '|' + $_LLAVEFACT
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
    datos_envio += '|' + $_VLRLATERFACT;
    datos_envio += '|' + $_CAUSAESTAD;
    datos_envio += '|' + $_DESCRIPTER2;
    datos_envio += '|' + $_PUERTAESTAD;
    datos_envio += '|' + $_DESCRIPPROF2;
    datos_envio += '|' + $_REGMEDPROF;
    datos_envio += '|' + $_DESCRIPCUPI;
    SolicitarDll({ datosh: datos_envio }, _dataHL7002_41, get_url("/SALUD/APP/HL7002.DLL"));
}

function _dataHL7002_41(data) {
    data = data.split('|');
    if (data[0].trim() == '00') {
        $_TIPOMSGW = 'ORM-';
        $_ESTADOW = 0;
        let datos_envio = datosEnvio()
        datos_envio += '|' + $_LLAVEFACT
        datos_envio += '|' + $I
        datos_envio += '|' + $_ESTADOW
        datos_envio += '|' + $_FECHAFACT
        datos_envio += '|' + $NOMSALIDA
        datos_envio += '|' + $_TIPOMSGW
        SolicitarDll({ datosh: datos_envio }, _dataHL70002_41, get_url("/SALUD/APP/HL7000.DLL"));
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
        var codlote = $TABLAFACT[i].CODLOTEFACT;
        if (codlote == '****') {
            $_SWBUSCAR = 1;
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
            }
            else {
                if ($_CRUENTAFACT == '2') {
                    // INV401BC
                    // LINEA 8460
                }
                else {
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
        if ($_NITUSU == '0892000401') {
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
    $('#primer-elemento').html(
        '<div class="inline-inputs">' +
        '<label class="col-md-6 col-sm-8 col-xs-12">Nit Medico:</label>' +
        '<div class="input-group col-md-6 col-sm-4 col-xs-12" id="NITMEDICO_41">' +
        '<input id="nitmedico_41" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1">' +
        '</div>' +
        '</div>'
    );
    $('#elementos-adicionales').append(
        '<p class="text-info">CIRUJANO</p>' +
        '<p class="text-info">AYUDANTIA</p>' +
        '<p class="text-info">ANESTESIA</p>' +
        '<p class="text-info">MAT.QUIRUG</p>' +
        '<p class="text-info">DERECH.SALA</p>'
    )
    _Evaluarnitmedico_41();
}

function _Evaluarnitmedico_41() {
    validarInputs({
        form: '#NITMEDICO_41',
        orden: '1'
    },
        function () { _Evaluarfecha2_41() },
        _validarnitmedico
    )
}
function _validarnitmedico() {

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
    if ((($_NITUSU == '0892000401') || ($_NITUSU == '0900648993') || ($_NITUSU == '0900755133') || ($_NITUSU == '0900804411') || ($_NITUSU == '0900870633')) && ($_CLFACT == '2') && ($_GRUPOFACT == '98')) {
        $_MEDOTRFACT = $_NITUSU;
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
        }
        else {
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
    }
    else {
        if ($_NITUSU == '0892000401') {
            let posicion = $_INCREMTAB - 1;
            // $_FACTORW = Math.round(parseFloat($_PORCTABTAR[posicion]) / 100);
            $_FACTORW = parseFloat($_PORCTABTAR[posicion]) / 100;
            $_VALOREDIT = $_FACTORW;
        }
        else {
            let posicion = parseInt($_INCREMTAB) - 1;
            $_FACTORW = parseFloat($_PORCTABTAR[posicion]) / 100;
            // $_FACTORW = Math.round(parseFloat($_PORCTABTAR[posicion]) / 100);
            console.debug($_FACTORW);
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
        $_NROMESW = $_NROMES + 1;
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
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_401"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "CODIGO" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datocodigo_401" class="form-control input-md" data-orden="1" maxlength="15"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_401"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "CEDULA" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datocedula_401" class="form-control input-md" data-orden="2" maxlength="14"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_401"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "1ER APELLIDO" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datoapellido1_401" class="form-control input-md" data-orden="3" maxlength="15"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_401"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "2DO APELLIDO" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datoapellido2_401" class="form-control input-md" data-orden="4" maxlength="15"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_401"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "1ER NOMBRE" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datonombre1_401" class="form-control input-md" data-orden="5" maxlength="12"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_401"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "2DO NOMBRE" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datonombre2_401" class="form-control input-md" data-orden="6" maxlength="12"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_401"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "SEXO" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datosexo_401" class="form-control input-md" data-orden="7" maxlength="1"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_401"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "FECHA DE NACIMIENTO" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datofechadenacimiento_401" class="form-control input-md" data-orden="8" maxlength="10"> ' +
            '</div> ' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12 form-group" id="SER848_401"> ' +
            '<label class="col-md-6 col-sm-6 col-xs-6 control-label" for="name">' + "HEMOCL" + '</label> ' +
            '<div class="col-md-6 col-sm-6 col-xs-6"> ' +
            '<input id="datofechadenacimiento_401" class="form-control input-md" data-orden="9" maxlength="3"> ' +
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
            }
        }
    });
    ventanaser848.init(_evaluarSER848());
    ventanaser848.init(mascarasser848());
    ventanaser848.init($('.modal-footer').hide());
    ventanaser848.on('shown.bs.modal', function () {
        $("#datocodigo_401").focus();
    });
}

function _evaluarSER848() {
    _inputControl('disabled');
    validarInputs({
        form: '#SER848_401',
        orden: '1'
    },
        function () { _Evaluaridhistoriafact_41() },
        _validarser848
    )
}

function _validarser848() {
    $_IDHISTORIAFACT = $('#datocedula_401').val();
    $_IDHISTORIAFACT = $_IDHISTORIAFACT.replace(/,/g, '');
    // $('#paciente_401').val($_IDHISTORIAFACT);
    idhistoriafactMask.typedValue = $_IDHISTORIAFACT;
    $('.btn-primary').click();
}

function mascarasser848() {
    var idhistoriaser848Mask = IMask($('#datocedula_401')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
    var sexoser848Mask = IMask($('#datosexo_401')[0], {
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
    var fechaser848Mask = IMask($('#datofechadenacimiento_401')[0], {
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

function SER836() {
    $_IDHISTORIAFACT = '000000019460902';
    $_FECHASIGATEN = '190421';
    LLAMADO_DLL({
        dato: [$_IDHISTORIAFACT, $_FECHASIGATEN, $_ADMINW],
        callback: _dataSER836_04,
        nombredll: 'SER836',
        carpeta: 'SALUD'
    });
}

function _dataSER836_04(data) {
    console.debug(data, 'SER836_04');
}

////////////////////////////////////////////////////// SER891A ////////////////////////////////////////////////////////////////////////////
function SER891A_41() {
    if (($_IDHISTORIAFACT == $_MEDCITW) || ($_PUERTAESTAD == '1')) {
        console.debug('no tiene citas');
    }
    else {
        let datos_envio = datosEnvio();
        datos_envio += '|' + $_IDHISTORIAFACT;
        SolicitarDll({ datosh: datos_envio }, _dataSER891A_41, get_url('/SALUD/APP/SER891A.DLL'));
    }
}

function _dataSER891A_41(data) {
    data = data.split('|');
    if (data[0].trim() == '00') {
        console.debug(data[0].trim());
    } else if (data[0].trim() == '9F') {
        CON851('9F', '9F', null, 'warning', 'Advertencia!');
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}


/////////////////////////////////////////////////////// SER891AD /////////////////////////////////////////////////////////////////////////
function SER891AD_41() {
    $_HORACITFACT = ' ';
    let datos_envio = datosEnvio();
    datos_envio += '|' + $_IDHISTORIAFACT;
    SolicitarDll({ datosh: datos_envio }, _dataSER891AD_41, get_url('/SALUD/APP/SER891AD.DLL'));
}

function _dataSER891AD_41(data) {
    data = data.split('|');
    let json = date[1].trim();
    let rutaJson = get_url('/progdatos/json/' + json + '.JSON');
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
    switch ($_NITUSU) {
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
    $NROMSGL1 = $_NROFACT;
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

///////////////////////////////// MASCARAS ///////////////////////////////////
var MountMask_41 = new IMask($('#cant_401')[0], { mask: Number, radix: '.', scale: 2, padFractionalZeros: true });
var PriceUnitMask_41 = new IMask($('#vlrunit_41')[0], { mask: Number, thousandsSeparator: ',' });
var PriceTotalMask_41 = new IMask($('#vlrtotal_41')[0], { mask: Number, thousandsSeparator: ',' });
var NetoFactMask_41 = new IMask($('#netofact_41')[0], { mask: Number, thousandsSeparator: ',' });
var PriceivaMask_41 = new IMask($('#valoriva_41')[0], { mask: Number, thousandsSeparator: ',' });
var PriceContMask_41 = new IMask($('#vlrtot_41')[0], { mask: Number, thousandsSeparator: ',' });
var clfactMask = IMask($('#claseservicio_401')[0], { mask: Number, min: 0, max: 7 });
var idhistoriafactMask = IMask($('#paciente_401')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });
var prefijoMask = IMask($('#factura_401')[0], {
    mask: 'a',
    prepare: function (str) {
        console.debug(str);
        if ((str == 'U') || (str == 'u')) {
            CON851('01', '01', null, 'error', 'error');
        }
        else {
            return str.toUpperCase()
        }
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});
var clienteMask = IMask($('#cliente_401')[0], { mask: Number, thousandsSeparator: ',', padFractionalZeros: false, normalizeZeros: true, radix: ',', mapToRadix: ['.'] });

function _MaskDate_41() {
    var preanofact = "20" + $_ANOFACT;
    var premesfact = $_MESFACT;
    var anofact = parseInt(preanofact);
    var mesfact = parseInt(premesfact);
    var fechaMask = IMask($("#fecha_401")[0], {
        mask: Date,
        pattern: 'Y-m-d',
        lazy: true,
        blocks: {
            Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: anofact, to: anofact, maxLength: 4 },
            m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: mesfact, to: mesfact, maxLength: 2 },
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