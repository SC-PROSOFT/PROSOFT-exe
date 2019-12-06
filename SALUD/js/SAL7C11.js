// var SAL97C11 = ['DESCRIPPACIW', 'EPSPACIW', 'FECHANACPACW', 'EDADPACW', 'RESTAPLIPACIW', 'CIUDADPACIW', 'DERECHOPACIW', 'NOMBREENTW', 'NITFACTPACIW',
//     'RESTRICPACIW', 'RESTDROGPACIW', 'RESTCIRUGPACIW', 'RESTLABOPACIW', 'RESTIMAGPACIW', 'RESTESTAPACIW', 'RESTCONSPACIW',
//     'RESTTERFPACIW', 'RESTTEROPACIW', 'RESTODOCPACIW', 'RESTPYPPACIW', 'TUTELAPACIW', 'ALTCOSPACIW', 'PROGEPSPACIW',
//     'CRONICOPACIW', 'MULTICONSULPACIW', 'MEDFAMIPACIW', 'EMBALTORIESGPACIW', 'NROCEDW', 'MEDW'
// ];
var SAL97C11 = [];
var $_REG_PACI = [];
var $_REG_ENT = [];
var $_REG_TERCE = [];
var $SW_PASO = 0;
var $_SER835;

var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_CONTADOUSU = $_USUA_GLOBAL[0].CONTADO;
    $_PUCUSU = $_USUA_GLOBAL[0].PUC;
    $_LOTEFARMUSU = $_USUA_GLOBAL[0].LOTE_FAMR;
    SAL97C11.SALMINUSU = $_USUA_GLOBAL[0].SAL_MIN;
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
    // SAL97C11.SALMINW = Math.round(parseFloat($_SALMINUSU) / 30);
    // _buscarrestriccion_SAL97C11(); 
    obtenerDatosCompletos({ nombreFd: 'TABLAS' }, data => {
        console.debug(data);
        SAL97C11.TARIFAS = data.TABLA;
        if ($_USUA_GLOBAL[0].NIT == '0800156469') {
            SAL97C11.SERVICIOS = [
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
            SAL97C11.SERVICIOS = [
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
        CON850(_evaluarCON850_SAL97C11);
    });
    _toggleF8([
        {
            input: "numero",
            app: "97C11",
            funct: _ventanaPacientes
        },
        {
            input: 'medico',
            app: '97C11',
            funct: _ventanaprofesionales_SAL7C11
        },
        {
            input: 'procedimiento',
            app: '97C11',
            funct: _ventanatablatarifas_SAL97C11
        },
        {
            input: 'clase',
            app: '97C11',
            funct: _ventanaclase_SAL97C11
        }

    ]);
});

//////// VENTANAS F8////////////////////////
function _ventanaPacientes(e) {
    var $PACIENTES = [];
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {

        parametros = {
            valoresselect: ['Descripcion', 'Identificacion'],
            f8data: 'PACIENTES',
            columnas: [{
                title: 'COD'
            }, {
                title: 'NOMBRE'
            }, {
                title: 'EPS'
            }],
            callback: (data) => {
                document.querySelector("#numero_97C11").value = data.COD;
                document.querySelector("#numero_97C11").focus();
            },
            cancel: () => {
                document.querySelector("#numero_97C11").focus()
            }
        };
        F8LITE(parametros);
    }
}

function _ventanaprofesionales_SAL7C11(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        $("#medico_97C11").val('');
        let URL = get_url("APP/" + "SALUD/SER819" + ".DLL");
        postData({
            datosh: datosEnvio() + localStorage['Usuario'] + "|"
        }, URL)
            .then((data) => {
                loader("hide");
                $_PROFESIONALES_7C11 = data;
                _ventanaDatos({
                    titulo: 'VENTANA DE PROFESIONALES',
                    columnas: ["NOMBRE", "DESCRIPCION", "IDENTIFICACION", "ATIENDE_PROF", "LU", "MA", "MI", "JU", "VI", "SA"],
                    data: $_PROFESIONALES_7C11.ARCHPROF,
                    callback_esc: function () {
                        $("#medico_97C11").focus();
                    },
                    callback: function (data) {
                        $('#medico_97C11').val(data.IDENTIFICACION);
                        $('#medicod_97C11').val(data.NOMBRE.trim());
                        _enterInput('#medico_97C11');
                    }
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

function _ventanatablatarifas_SAL97C11(e) {
    SAL97C11.F8TARIFAS = [];
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        SAL97C11.TARIFAS2 = SAL97C11.TARIFAS.forEach(element => {
            if (element.TIPO == SAL97C11.TIPOFACTW) {
                SAL97C11.F8TARIFAS.push(element);
            }
        });
        _ventanaDatos({
            titulo: 'VENTANA DE TARIFAS',
            columnas: ['COD', 'TIPO', 'COD_SER', 'DESCRIP'],
            data: SAL97C11.F8TARIFAS,
            callback_esc: function () {
                $("#medico_97C11").focus();
            },
            callback: function (data) {
                $('#procedimiento_97C11').val(data.COD_SER);
                _enterInput('#procedimiento_97C11');
            }
        });
    }
}

function _ventanaclase_SAL97C11(e) {
    $("#clase_97C11").val('');
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE CLASES DE SERVICIO',
            columnas: ["COD", "DESCRIPCION"],
            data: SAL97C11.SERVICIOS,
            callback_esc: function () {
                $("#clase_97C11").focus();
            },
            callback: function (data) {
                // $('#clase_97C11').val(data.COD);
                claseMask_SAL7C11.typedValue = data.COD;
                _enterInput('#clase_97C11');
            }
        });
    }
}
///////////////////////// MASCARAS ///////////////////////////



///////////////////////// SAL97C11///////////////////////////

function _buscarrestriccion_SAL97C11() {
    $_OPSEGU = "ISC11";
    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904_01_SAL97C11,
        nombredll: 'CON904',
        carpeta: 'CONTAB'
    });
}

function _dataCON904_01_SAL97C11(data) {
    console.debug(data, "CON904-01");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {

        CON850(_evaluarCON850_SAL97C11);
    } else {
        CON851('15', '15', null, 'error', 'error');
        _toogleNav();
    }
}

function _evaluarCON850_SAL97C11(data) {
    SAL97C11['NOVEDADW'] = data.id;
    switch (data.id) {
        case '7':
        case '8':
        case '9':
            _evaluarpaciente_SAL97C11();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedad_97C11').val(data.id + ' - ' + data.descripcion)
}

function _evaluarpaciente_SAL97C11() {
    validarInputs({
        form: "#NUMERO_97C11",
        orden: '1'
    },
        () => { CON850(_evaluarCON850_SAL97C11) },
        () => {
            SAL97C11['PACIW'] = $('#numero_97C11').val();
            SAL97C11.PACIW = SAL97C11['PACIW'].padStart(15, "0");
            $('#numero_97C11').val(SAL97C11.PACIW);
            if (parseInt(SAL97C11.PACIW) == 0) {
                CON851('02', '02', null, 'error', 'Error');
                _evaluarpaciente_SAL97C11();
            } else if ((parseInt(SAL97C11.PACIW) < 100) && ($.isNumeric(SAL97C11.PACIW))) {
                SAL97C11.DERECHOPACIW = '1';
                SAL97C11.DESCRIPPACIW = ' '
                SAL97C11.EPSPACIW = ' '
                _mostrarpaciente_SAL97C11();
            } else {
                postData({
                    datosh: datosEnvio() + SAL97C11.PACIW + '|'
                }, get_url("APP/SALUD/SER810-1.DLL"))
                    .then((data) => {
                        console.debug(data);
                        $_REG_PACI = data['REG-PACI'];
                        console.log($_REG_PACI, 'json')
                        SAL97C11.DESCRIPPACIW = $_REG_PACI[0].DESCRIP
                        SAL97C11.NOMBREW = SAL97C11.DESCRIPPACIW;
                        console.log(SAL97C11.DESCRIPPACIW, 'NOMBREPACIENTE')
                        SAL97C11.EPSPACIW = $_REG_PACI[0].EPS;
                        SAL97C11.FECHANACPACW = $_REG_PACI[0].NACIM;
                        console.log(SAL97C11.FECHANACPACW, 'nacimiento')
                        SAL97C11.RESTAPLIPACIW = $_REG_PACI[0]["REST-APLI"];
                        SAL97C11.RESTDROGPACIW = $_REG_PACI[0]["REST-DROG"];
                        SAL97C11.RESTCIRUGPACIW = $_REG_PACI[0]["REST-CIRU"];
                        SAL97C11.RESTLABOPACIW = $_REG_PACI[0]["REST-LABO"];
                        SAL97C11.RESTIMAGPACIW = $_REG_PACI[0]["REST-IMAG"];
                        SAL97C11.RESTESTAPACIW = $_REG_PACI[0]["REST-ESTA"];
                        SAL97C11.RESTCONSPACIW = $_REG_PACI[0]["REST-CONS"];
                        SAL97C11.RESTTERFPACIW = $_REG_PACI[0]["REST-TERF"];
                        SAL97C11.RESTTEROPACIW = $_REG_PACI[0]["REST-TERO"];
                        SAL97C11.RESTPYPPACIW = $_REG_PACI[0]["REST-PYP"];
                        SAL97C11.CIUDADPACIW = $_REG_PACI[0].CIUDAD;
                        SAL97C11.NITFACTPACIW = $_REG_PACI[0]["NIT-FACT"];
                        console.log(SAL97C11.NITFACTPACIW, 'SAL97C11.NITFACTPACIW')
                        SAL97C11.TUTELAPACIW = $_REG_PACI[0].TUTELA;
                        SAL97C11.ALTCOSPACIW = $_REG_PACI[0]["ALT-COS"];
                        SAL97C11.PROGEPSPACIW = $_REG_PACI[0]["PROG-ESP"];
                        SAL97C11.CRONICOPACIW = $_REG_PACI[0].CRONICO;
                        SAL97C11.MULTICONSULPACIW = $_REG_PACI[0].MULTICONSUL;
                        SAL97C11.MEDFAMIPACIW = $_REG_PACI[0]["MED-FAMI"];
                        console.log(SAL97C11.MEDFAMIPACIW, 'SAL97C11.MEDFAMIPACIW')
                        SAL97C11.EMBALTORIESGPACIW = $_REG_PACI[0]["EMB-ALTO - RIESG"];
                        _consultacodigo_SAL97C11();
                    })
                    .catch((error) => {
                        console.log(error);
                        console.debug('actualizacion de pacientes');
                    });
            }
        }
    )
}

function _consultacodigo_SAL97C11() {
    console.log('consultacodigopaciente');
    if (SAL97C11.NOVEDADW == '7') {
        if ($_NITUSU == '0822006883') {
            _leerpaciente_SAL97C11();
        } else {
            $_OPSEGU = "IS767";
            LLAMADO_DLL({
                dato: [$_ADMINW, $_OPSEGU],
                callback: _dataCON904S_02_SAL97C11,
                nombredll: 'CON904S',
                carpeta: 'CONTAB'
            });
        }
    } else {
        _leerpaciente_SAL97C11();
    }
}

function _dataCON904S_02_SAL97C11(data) {
    console.debug(data, "CON904S-01");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        // _leerpaciente_SAL97C11();
        let { ipcRenderer } = require("electron");
        ipcRenderer.send('another', 'SALUD/PAGINAS/SAL7767.html');
        vector = ['on', 'Actualizando maestro de pacientes...']
        _EventocrearSegventana(vector, _leerpaciente_SAL97C11);
    } else {
        $_OPSEGU = "IS1G";
        LLAMADO_DLL({
            dato: [$_ADMINW, $_OPSEGU],
            callback: _dataCON904S_03_SAL97C11,
            nombredll: 'CON904S',
            carpeta: 'CONTAB'
        });
    }
}

function _dataCON904S_03_SAL97C11(data) {
    console.debug(data, "CON904S-02");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if ($_NITUSU == '0800162035') {

        if ((SAL97C11.EPSPACIW == "RES004") && (swinvalid == "00")) {
            console.debug('LLAMAR PROGRAMA SER11G --- ACTUALIZA MAESTRO DE PACIENTES')
            // LLAMA AL PROGRAMA SER11G --- ACTUALIZA MAESTRO DE PACIENTES
            let { ipcRenderer } = require("electron");
            ipcRenderer.send('another', 'SALUD/PAGINAS/SAL7767.html');
            vector = ['on', 'Actualizando maestro de pacientes...']
            _EventocrearSegventana(vector, _leerpaciente_SAL97C11);

        } else {
            swinvalid = '00';
            console.debug('LLAMAR PROGRAMA SER11I --- ACTUALIZA MAESTRO DE PACIENTES SOLO MAGISTERIO')
            // LLAMA AL PROGRAMA SER11I --- ACTUALIZA MAESTRO DE PACIENTES SOLO MAGISTERIO 
            let { ipcRenderer } = require("electron");
            ipcRenderer.send('another', 'SALUD/PAGINAS/SAL7767.html');
            vector = ['on', 'Actualizando maestro de pacientes...']
            _EventocrearSegventana(vector, _leerpaciente_SAL97C11);
        }
    } else {
        if (swinvalid == "00") {
            console.debug('LLAMAR PROGRAMA  SER11G --- ACTUALIZA MAESTRO DE PACIENTES ')
            // LLAMA AL PROGRAMA SER11G --- ACTUALIZA MAESTRO DE PACIENTES 
            let { ipcRenderer } = require("electron");
            ipcRenderer.send('another', 'SALUD/PAGINAS/SAL7767.html');
            vector = ['on', 'Actualizando maestro de pacientes...']
            _EventocrearSegventana(vector, _leerpaciente_SAL97C11);
        } else {
            _leerpaciente_SAL97C11();
        }
    }
}

function _dataCON904S_04_SAL97C11(data) {
    console.debug(data, "CON904S-04");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_NITUSU == '0800162035') {
            //// CONTINUA 
            // LLAMA AL PROGRAMA SER110c --- ACTUALIZA MAESTRO DE PACIENTES 
            let { ipcRenderer } = require("electron");
            ipcRenderer.send('another', 'SALUD/PAGINAS/SAL7767.html');
            vector = ['on', 'Actualizando maestro de pacientes...']
            _EventocrearSegventana(vector, _leerpaciente_SAL97C11);
        } else {
            //// INICIALIZA LOS DATOS 
            _toggleNav();
        }
    } else {
        $_OPSEGU = "IS1G";
        LLAMADO_DLL({
            dato: [$_ADMINW, $_OPSEGU],
            callback: _dataCON904S_05_SAL97C11,
            nombredll: 'CON904S',
            carpeta: 'CONTAB'
        });
    }
}

function _dataCON904S_05_SAL97C11(data) {
    console.debug(data, "CON904S-05");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        // LLAMA AL PROGRAMA SER11G --- ACTUALIZA MAESTRO DE PACIENTES 
        let { ipcRenderer } = require("electron");
        ipcRenderer.send('another', 'SALUD/PAGINAS/SAL7767.html');
        vector = ['on', 'Actualizando maestro de pacientes...']
        _EventocrearSegventana(vector, _leerpaciente_SAL97C11);
    }
}

function _leerpaciente_SAL97C11() {
    if (SAL97C11.DESCRIPPACIW.substring(0, 1) == '*') {
        CON851('13', '13', null, 'error', 'Error');
        _evaluarpaciente_SAL97C11();
    } else if ((SAL97C11.RESTAPLIPACIW == 'S') && (SAL97C11.NOVEDADW == '7')) {
        CON851('80', '80', null, 'error', 'Error');
        _evaluarpaciente_SAL97C11();
    } else {
        $('#nombrepacid_97C11').val(SAL97C11.DESCRIPPACIW);
        $('#eps_97C11').val(SAL97C11.EPSPACIW);
        _calcularedad_SAL97C11();
        $('#edad_97C11').val($_EDADPACW);
        _validarpaciente_SAL97C11();
    }
}

function _validarpaciente_SAL97C11() {
    console.log('validarpaciente_sal97c11')
    // SAL97C11.SW9 = '0'
    // if (SAL97C11.SW9 == '0') {
    //     SAL97C11.SW9 = '1'
    //     get_mensajesPacientes_SER810B()
    // } 
    if (($_NITUSU == '0844003225') && (SAL97C11.CIUDADPACIW != '85001') && (parseInt(SAL97C11.PACIW) > 100)) {
        SAL97C11.DERECHOPACIW = '2';
    } if (SAL97C11.EPSPACIW.trim() == '') {
        SAL97C11.NOMBREENTW = '';
    } else {
        LLAMADO_DLL({
            dato: [SAL97C11.EPSPACIW],
            callback: data => {
                console.log(data, 'entidad')
                var data = data.split('|');
                SAL97C11.NOMBREENTW = data[1];
                if (data[0].trim() == "00") {
                    // if (SAL97C11.NITFACTPACIW > '0') {
                    //     console.log('envia a terceros')
                    //     LLAMADO_DLL({
                    //         dato: [SAL97C11.EPSPACIW],
                    //         callback: _consultatercero_7C11,
                    //         nombredll: 'SAL7767_11',
                    //         carpeta: 'SALUD'
                    //     });
                    // } else {
                    //     _validarrestricionpac_SAL97C11();
                    // }
                    _validarpaciente2_SAL97C11();
                } else if (data[0].trim() == "01") {
                    SAL97C11.NOMBREENTW = '';
                    _validarpaciente2_SAL97C11();
                } else {
                    CON852(data[0], data[1], data[2], _toggleNav);
                }
            },
            nombredll: 'SAL7767_08',
            carpeta: 'SALUD'
        });
    }
}

function _validarpaciente2_SAL97C11() {
    if (parseInt(SAL97C11.NITFACTPACIW) > 0) {
        LLAMADO_DLL({
            dato: [SAL97C11.NITFACTPACIW],
            callback: data => {
                console.log(data, 'terceros');
                data = data.split('|');
                SAL97C11.NOMBREENTIDADW = data[1].trim();
                if (data[0].trim() == "00") {
                    $('#epsd_97C11').val(SAL97C11.NOMBREENTIDADW);
                    SAL97C11.NITTERW = SAL97C11.NITFACTPACIW;
                    _validarrestricionpac_SAL97C11();
                } else if (data[0].trim() == "01") {
                    $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
                    _validarrestricionpac_SAL97C11();
                } else {
                    CON852(data[0], data[1], data[2], _toggleNav);
                }
            },
            nombredll: 'SAL7767_11',
            carpeta: 'SALUD'
        });
    } else {
        _validarrestricionpac_SAL97C11();
    }
}

// function _consultatercero_7C11(data) {
//     console.log(data, 'terceros')
//     data = data.split('|');
//     SAL97C11.NOMBREENTIDADW = data[1].trim();
//     if (data[0].trim() == "00") {
//         $('#epsd_97C11').val(SAL97C11.NOMBREENTIDADW);
//         _validarrestricionpac_SAL97C11();
//     } else if (data[0].trim() == "01") {
//         // SAL97C11.NOMBREENTW = '';
//         // $('#eps_97C11').val(SAL97C11.EPSPACIW);
//         $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
//         _validarrestricionpac_SAL97C11();
//     } else {
//         CON852(data[0], data[1], data[2], _toggleNav);
//     }
// }

// function _mostrarentidad_7C11(data) {
//     var date = data.split('|');
//     var swinvalid = date[0].trim();
//     SAL97C11.NOMBREENTW = date[1];
//     if (swinvalid == "00") {
//         $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
//         _mostratfacturado_SAL97C11();
//     } else if (swinvalid == "01") {
//         CON851('01', '01', null, 'error', 'error');
//         _mostratfacturado_SAL97C11();
//     } else {
//         CON852(date[0], date[1], date[2], _toggleNav);
//     }
// }

function _validarrestricionpac_SAL97C11() {
    if ((SAL97C11.EPSPACIW == 'EPS025') && (SAL97C11.RESTRICPACIW == '04')) {
        SAL97C11.NOMBREENTW = 'CAPRESOCA NO';
        // $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
    } if (SAL97C11.TUTELAPACIW == 'S') {
        CON851('5B', '5B', null, 'error', 'Error');
        console.debug('TUTELAPACI')
    } if (SAL97C11.ALTCOSPACIW == 'S') {
        CON851('5J', '5J', null, 'error', 'Error');
        console.debug('ALTO COSTO')
    } if (SAL97C11.PROGEPSPACIW == 'S') {
        CON851('5Q', '5Q', null, 'error', 'Error');
    } if (SAL97C11.CRONICOPACIW == 'S') {
        CON851('7A', '7A', null, 'error', 'Error');
    } if ($_NITUSU == '0845000038') {
        if (($_UNIDEDADW = 'A') && (($_VLREDADW = '45') || ($_VLREDADW = '50') || ($_VLREDADW = '55') || ($_VLREDADW = '60') || ($_VLREDADW = '65') || ($_VLREDADW = '70') || ($_VLREDADW = '75') || ($_VLREDADW = '80') || ($_VLREDADW = '85') || ($_VLREDADW = '90') || ($_VLREDADW = '95') || ($_VLREDADW = '100'))) {
            CON851('8T', '8T', null, 'error', 'Error');
        }
    } if (SAL97C11.MULTICONSULPACIW == 'S') {
        CON851('5V', '5V', null, 'error', 'Error');
    } if (SAL97C11.EMBALTORIESGPACIW == 'S') {
        CON851('EH', 'EH', null, 'error', 'Error');
    } if (parseInt(SAL97C11.MEDFAMIPACIW) > 0) {
        SAL97C11.MEDW = SAL97C11.MEDFAMIPACIW.padStart(10, "0");
        LLAMADO_DLL({
            dato: [SAL97C11.MEDFAMIPACIW],
            callback: data => {
                console.log(data, 'profes')
                var data = data.split('|');
                SAL97C11['DESCRIPMEDIF'] = data[1].trim();
                if (data[0].trim() == "00") {
                    $('#medfac_97C11').val(SAL97C11.DESCRIPMEDIF);
                    _mostratfacturado_SAL97C11();
                    // CALL 880
                } else if (data[0].trim() == "01") {
                    // CALL 880
                    _mostratfacturado_SAL97C11();
                } else {
                    CON852(data[0], data[1], data[2], _toggleNav);
                }
            },
            nombredll: 'SAL7C11_1',
            carpeta: 'SALUD'
        });
    } else {
        // CALL 880RV
        _mostratfacturado_SAL97C11();
    }
    ////CALL CON880RV MUESTRA LOS RECORDATORIOS POR USUARIO ARCH
    // get_Recordatorios_CON880RV(foco, callback)
    // console.log("Aqui buscaria el recordatorio")
}

function _mostratfacturado_SAL97C11() {
    if (SAL97C11.NOVEDADW == '7') {
        if (SAL97C11.DERECHOPACIW == '6') {
            CON851('2T', '2T', null, 'error', 'Error');
        } else if ((SAL97C11.DERECHOPACIW == '2') || (SAL97C11.DERECHOPACIW == '4') || (SAL97C11.DERECHOPACIW == '7') || (SAL97C11.DERECHOPACIW == '8') || (SAL97C11.DERECHOPACIW == 'A')) {
            CON851('80', '80', null, 'error', 'Error');
            if (($_NITUSU == '0891855847') || ($_NITUSU == '0800037979') || ($_NITUSU == '0800162035') || ($_NITUSU == '0900405505') || ($_NITUSU == '0822002688')) {
                SAL97C11.NROCEDW = '';
                _evaluarpaciente_SAL97C11();
            }
        } else if (SAL97C11.DERECHOPACIW == '5') {
            CON851('2N', '2N', null, 'error', 'Error');
            SAL97C11.NROCEDW = '';
            _evaluarpaciente_SAL97C11();
        } else if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) {
            // SER835B
        } else if (parseInt(SAL97C11.PACIW) != 0) {
            SER835({ PACIENTE: SAL97C11.PACIW, CLFACT: '9', NITUSU: $_NITUSU }, _SER836_SAL97C11, _SER836_SAL97C11);
        } else {
            SER835({ PACIENTE: SAL97C11.PACIW, CLFACT: '9', NITUSU: $_NITUSU }, data => { setTimeout(() => { _SER836_SAL97C11(data) }, 300) }, data => { setTimeout(() => { _SER836_SAL97C11(data) }, 300) });
        }
    } else {
        _SER836_SAL97C11();
    }
}

function _SER836_SAL97C11(data) {
    console.debug(data);
    SER836({ PACIENTE: SAL97C11.PACIW, FECHA: $_FECHAACTUAL, ANO: $_ANOACTUALW.substring(2, 4) }, data => { setTimeout(() => { _SER836T_SAL97C11(data) }, 300) }, data => { setTimeout(() => { _SER836T_SAL97C11(data) }, 300) })
}

function _SER836T_SAL97C11(data) {
    console.debug(data);
    SER836T({ PACIENTE: SAL97C11.PACIW, FECHAACT: $_FECHAACTUAL, AÑO: $_ANOACTUALW.substring(2, 4) }, _datounidad_7C11, _datounidad_7C11);
}

function _datounidad_7C11() {
    let URL = get_url("APP/SALUD/SER873.DLL");
    postData({
        datosh: datosEnvio()
    }, URL)
        .then(function (data) {
            console.debug(data, 'SER873');
            SAL97C11.UNSERV = data.UNSERV;
            _Unidadserv_7C11();
        })
        .catch(err => {
            console.debug(err);
        })
}

function _Unidadserv_7C11() {
    $_UNIDSERVICIO_401 = [];
    for (var i in SAL97C11.UNSERV) {
        if (SAL97C11.UNSERV[i].ESTADO.trim() == 'S') {
            if (SAL97C11.UNSERV[i].COD.trim() != '') {
                $_UNIDSERVICIO_401.push(SAL97C11.UNSERV[i]);
                console.debug($_UNIDSERVICIO_401)
            }
        }
    }
    loader("hide");
    POPUP({
        array: $_UNIDSERVICIO_401,
        titulo: "UNIDADES DE SERVICIO",
        indices: [{
            label: 'DESCRIP'
        }],
        callback_f: _toggleNav
    },
        // _evaluarmedico_7C11
        data => {
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
                    SAL97C11.UNSERVW = data.COD;
                    _evaluarmedico_7C11();
                    break;
                default:
                    break;
            }
        });
}

function _evaluarmedico_7C11() {
    validarInputs({
        form: '#MEDICO_97C11',
        orden: "1"
    },
        function () {
            _evaluarpaciente_SAL97C11();
        },
        _datomedico_7C11
    )
}

function _datomedico_7C11() {
    SAL97C11.MEDW = $('#medico_97C11').val();
    SAL97C11.MEDW = SAL97C11.MEDW.trim().padStart(10, "0");
    console.log(SAL97C11.MEDW)
    $('#medico_97C11').val(SAL97C11.MEDW);
    LLAMADO_DLL({
        dato: [SAL97C11.MEDW],
        callback: _consultaterceromed_7C11,
        nombredll: 'SAL7767_11',
        carpeta: 'SALUD'
    });
}

function _consultaterceromed_7C11(data) {
    console.log(data, 'TERCEROS')
    data = data.split('|');
    SAL97C11['DESCRIPMEDW'] = data[1].trim();
    if (data[0].trim() == "00") {
        $('#medicod_97C11').val(SAL97C11.DESCRIPMEDW);
        LLAMADO_DLL({
            dato: [SAL97C11.MEDW],
            callback: _mostrarprofesionales_7C11,
            nombredll: 'SAL7C11_1',
            carpeta: 'SALUD'
        });
    } else if (data[0].trim() == "01") {
        CON851('9X', '9X', null, 'error', 'error');
        _evaluarmedico_7C11();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _mostrarprofesionales_7C11(data) {
    console.log(data, 'PROFESIONALES')
    data = data.split('|');
    SAL97C11['DESCRIPMEDW'] = data[1].trim();
    SAL97C11['ATIENDEPROF'] = data[2].trim();
    SAL97C11['SOBREAGEPROF'] = data[3].trim();
    SAL97C11['ESTADOPROF'] = data[4].trim();
    SAL97C11['OPERAUTPROF'] = data[5].trim();
    SAL97C11['OPERAUTCIRUPROF'] = data[6].trim();
    SAL97C11['OPERAUTOTROPROF'] = data[7].trim();
    SAL97C11['OPERAUT4PROF'] = data[8].trim();
    SAL97C11['OPERAUT5PROF'] = data[9].trim();
    SAL97C11['FORMAAGEPROF'] = data[10].trim();
    SAL97C11.ESPPROF1 = data[11].trim();
    SAL97C11.ESPPROF2 = data[12].trim();
    SAL97C11.ESPPROF3 = data[13].trim();
    SAL97C11.ESPPROF4 = data[14].trim();
    SAL97C11.ESPPROF5 = data[15].trim();
    SAL97C11.HORARIO = [
        { HRINI1P: data[16].trim(), HRINI2P: data[17].trim() },
        { HRINI1P: data[18].trim(), HRINI1P: data[18].trim() },
        { HRINI1P: data[19].trim(), HRINI2P: data[20].trim() },
        { HRINI1P: data[21].trim(), HRINI2P: data[22].trim() },
        { HRINI1P: data[23].trim(), HRINI2P: data[24].trim() },
        { HRINI1P: data[25].trim(), HRINI2P: data[26].trim() },
        { HRINI1P: data[27].trim(), HRINI2P: data[28].trim() },
    ];
    SAL97C11.INTMINP = data[29].trim();
    if (data[0].trim() == "00") {
        SAL97C11['ATIENDEPROFEDIT2'] = SAL97C11.ATIENDEPROF;
        _validacionesmedico();
    } else if (data[0].trim() == "01") {
        CON851('9X', '9X', null, 'error', 'error');
        _evaluarmedico_7C11();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _validacionesmedico() {
    console.log('validacionmedico')
    if (SAL97C11.ESTADOPROF == '2') {
        CON851('13', '13', null, 'error', 'error');
        if (SAL97C11.NOVEDADW == '7') {
            _evaluarmedico_7C11()
        } else {
            _revisartablahorarios_7C11();
        }
    } else {
        if (SAL97C11.SOBREAGEPROF != 'S') {
            SAL97C11.SOBREAGEPROF = 'N';
        } if ($_NITUSU == '0800037021') {
            SAL97C11.SOBREAGEPROF = 'N';
        } else {
            _validarautoprof()
        }
    }
}
function _validarautoprof() {
    console.log('validarautoprof')
    if (SAL97C11.OPERAUTPROF.trim().length == 0) {
        SAL97C11.OPERAUTPROF = '****';
    } if (SAL97C11.OPERAUTCIRUPROF.trim().length == 0) {
        SAL97C11.OPERAUTCIRUPROF = '****';
    } if (SAL97C11.OPERAUTOTROPROF.trim().length == 0) {
        SAL97C11.OPERAUTOTROPROF = '****';
    } if (SAL97C11.OPERAUT4PROF.trim().length == 0) {
        SAL97C11.OPERAUT4PROF = '****';
    } if (SAL97C11.OPERAUT5PROF.trim().length == 0) {
        SAL97C11.OPERAUT5PROF = '****';
    }
    _revisartablahorarios_7C11();
}

function _revisartablahorarios_7C11() {
    if (SAL97C11.FORMAAGEPROF == 'S') {
        SER819H({ PACIENTE: SAL97C11.PACIW }, _evaluarmedico_7C11, data => {
            if (parseInt(data.FECHA.substring(2, 4)) == 0) {
                _evaluarmedico_7C11();
            } else {
                SAL97C11.FECHAW = data.FECHA;
                _datoclase_7C11();
            }
        });
    } else {
        if ((SAL97C11.HORARIO[0].HRINI1P == '00') && (SAL97C11.HORARIO[0].HRINI2P == '00') &&
            (SAL97C11.HORARIO[1].HRINI1P == '00') && (SAL97C11.HORARIO[1].HRINI2P == '00') &&
            (SAL97C11.HORARIO[2].HRINI1P == '00') && (SAL97C11.HORARIO[2].HRINI2P == '00') &&
            (SAL97C11.HORARIO[3].HRINI1P == '00') && (SAL97C11.HORARIO[3].HRINI2P == '00') &&
            (SAL97C11.HORARIO[4].HRINI1P == '00') && (SAL97C11.HORARIO[4].HRINI2P == '00') &&
            (SAL97C11.HORARIO[5].HRINI1P == '00') && (SAL97C11.HORARIO[5].HRINI2P == '00') &&
            (SAL97C11.HORARIO[6].HRINI1P == '00') && (SAL97C11.HORARIO[6].HRINI2P == '00')) {
            SAL97C11.INTMINP = '';
            SAL97C11.TABLAMINP = '';
            SAL97C11.TABLAMIN2PROF = '';
        } else {
            _datoclase_7C11();
        }
    }
    $('#tiempmedico_97C11').val(SAL97C11.INTMINP + ' Mn');
}

function _datoclase_7C11() {
    if (($_NITUSU == '0800162035') && (SAL97C11['CLW'] == '7')) {
        SAL97C11.TIPOFACTW = SAL97C11.CLW;
    } else if ((SAL97C11['UNSERVW'] == '08') && (SAL97C11.TIPOFACTW.trim() == '')) {
        SAL97C11.TIPOFACTW = '7';
    } else {
        _Cargarunidadesdeservicio_7C11();
    }
}

function _Cargarunidadesdeservicio_7C11() {
    if ($_NITUSU == "0800156469") {
        var tiposerv = '[{"codigo": "0","descripcion": "DROGUERIA"},{"codigo": "1", "descripcion": "CIRUGIAS"},{"codigo": "2", "descripcion": "ECOGRAFIAS"},{"codigo": "3", "descripcion": "RX - IMAGENOLOGIA"},{"codigo": "4", "descripcion": "DOPPLER"},{"codigo": "5", "descripcion": "T.A.C."},{"codigo": "6", "descripcion": "RESONANCIA NUCLEAR"},{"codigo": "7", "descripcion": "PROMOCION Y PREVENCION"}]';
        $_SERVICIO_7C11 = JSON.parse(tiposerv);
    }
    else {
        var tiposerv = '[{"codigo": "0","descripcion": "DROGUERIA"},{"codigo": "1", "descripcion": "CIRUGIAS"},{"codigo": "2", "descripcion": "LAB. Y OTROS DIAG."},{"codigo": "3", "descripcion": "RX - IMAGENOLOGIA"},{"codigo": "4", "descripcion": "OTROS SERVICIOS"},{"codigo": "5", "descripcion": "CONSULTAS Y TERAPIAS"},{"codigo": "6", "descripcion": "PATOLOGIA"},{"codigo": "7", "descripcion": "PROMOCION Y PREVENCION"}]';
        $_SERVICIO_7C11 = JSON.parse(tiposerv);
    }
    _evaluardatoclase_SAL7C11();
}

function _evaluardatoclase_SAL7C11() {
    claseMask_SAL7C11.updateValue();
    validarInputs(
        {
            form: "#CLASE_97C11",
            orden: "1"
        },
        () => { _evaluarmedico_7C11() },
        () => {
            SAL97C11.TIPOFACTW = claseMask_SAL7C11.value;
            if (((SAL97C11.UNSERVW == '08') && (SAL97C11.TIPOFACTW == '5')) || (SAL97C11.TIPOFACTW.trim() == '')) {
                CON851('03', '03', null, 'error', 'Error');
                _evaluardatoclase_SAL7C11();
            } else if ((($_ADMINW == 'ADMI') || ($_ADMINW == 'GEBC')) || ((SAL97C11.NOVEDADW == '8') && (parseInt(SAL97C11.PACIW) < 100) && ($.isNumeric(SAL97C11.PACIW)))) {
                _validardatoclase2_SAL7C11();
            } else {
                if (SAL97C11.TIPOFACTW != '1') {
                    if ((SAL97C11.OPERAUTPROF == 'XXXX') || (SAL97C11.OPERAUTPROF == $_ADMINW) || (SAL97C11.OPERAUTCIRUPROF == $_ADMINW) || (SAL97C11.OPERAUTOTROPROF == $_ADMINW) || (SAL97C11.OPERAUT4PROF == $_ADMINW) || (SAL97C11.OPERAUT5PROF == $_ADMINW) || (SAL97C11.OPERAUTPROF == '****')) {
                        _validardatoclase2_SAL7C11();
                    } else {
                        CON851('15', '15', null, 'error', 'Error');
                        _evaluardatoclase_SAL7C11()
                    }
                } else {
                    _validardatoclase2_SAL7C11();
                }
            }
        }
    )
}

function _validardatoclase2_SAL7C11() {
    if ((SAL97C11.TIPOFACTW == '7') && (SAL97C11.UNSERVW != '08') && (SAL97C11.UNSERVW != '06')) {
        CON851('03', '03', null, 'error', 'Error');
        _evaluardatoclase_SAL7C11();
    } else if (SAL97C11.TIPOFACTW == '1') {
        // console.debug('HC878');
        let URL = get_url("APP/HICLIN/HC878.DLL");
        postData({ datosh: datosEnvio() }, URL)
            .then(data => {
                console.debug(data.SALAS);
                _ventanaDatos({
                    titulo: 'VENTANA DE SALAS DE CIRUGIA',
                    columnas: ["CODIGO", "DESCRIPCION"],
                    data: data.SALAS,
                    callback_esc: function () {
                        _evaluardatoclase_SAL7C11();
                    },
                    callback: function (data) {
                        SAL97C11.SALACIRUEDIT = data.CODIGO;
                        _mostrarclase_7C11();
                    }
                });
            })
            .catch(err => {
                console.debug(err);
            })
    } else {
        _mostrarclase_7C11();
    }
}

function _mostrarclase_7C11() {
    switch (SAL97C11.TIPOFACTW) {
        case "1":
            $('#clase_97C11').val('1 CIRUGIA');
            _datocups_7C11();
            break;
        case "3":
            $('#clase_97C11').val('3 IMAGENOLOGIA');
            _datocups_7C11();
            break;
        case "4":
            $('#clase_97C11').val('4 OTROS PROCESOS');
            _datocups_7C11();
            break;
        case "5":
            $('#clase_97C11').val('5 CONSULTAS');
            _datocups_7C11();
            break;
        case "7":
            $('#clase_97C11').val('7 P & P');
            _datocups_7C11();
            break;
        case "A":
            $('#clase_97C11').val('A CITA DOBLE');
            _datocups_7C11();
            break;
        case "B":
            $('#clase_97C11').val('B CONSULTAS');
            _datocups_7C11();
            break;
        case "C":
            $('#clase_97C11').val('C CITA DOBLE');
            _datocups_7C11();
            break;
        case "D":
            $('#clase_97C11').val('D CITA DOBLE');
            _datocups_7C11();
            break;
        case "F":
            $('#clase_97C11').val('F CITA DOBLE');
            _datocups_7C11();
            break;
        case "G":
            $('#clase_97C11').val('G CITA DOBLE');
            _datocups_7C11();
            break;
        case "H":
            $('#clase_97C11').val('H CONSULTAS');
            _datocups_7C11();
            break;
        case "I":
            $('#clase_97C11').val('I CITA DOBLE');
            _datocups_7C11();
            break;
        case "J":
            $('#clase_97C11').val('J CITA DOBLE');
            _datocups_7C11();
            break;
        case "K":
            $('#clase_97C11').val('K CITA DOBLE');
            _datocups_7C11();
            break;
        case "L":
            $('#clase_97C11').val('L CITA DOBLE');
            _datocups_7C11();
            break;
        case "M":
            $('#clase_97C11').val('M CITA DOBLE');
            _datocups_7C11();
            break;
        case "N":
            $('#clase_97C11').val('N CITA DOBLE');
            _datocups_7C11();
            break;
        case "O":
            $('#clase_97C11').val('O CITA DOBLE');
            _datocups_7C11();
            break;
        case "P":
            $('#clase_97C11').val('P CITA DOBLE');
            _datocups_7C11();
            break;
        case "Q":
            $('#clase_97C11').val('Q CITA DOBLE');
            _datocups_7C11();
            break;
        case "R":
            $('#clase_97C11').val('R CITA DOBLE');
            _datocups_7C11();
            break;
        case "S":
            $('#clase_97C11').val('S CITA DOBLE');
            _datocups_7C11();
            break;
        case "T":
            $('#clase_97C11').val('T CITA DOBLE');
            _datocups_7C11();
            break;
    }
}

function _datocups_7C11() {
    validarInputs(
        {
            form: "#PROCEDIMIENTO_97C11",
            orden: "1"
        },
        () => { _datomedico_7C11() },
        () => {
            SAL97C11.CUPSW = $('#procedimiento_97C11').val();
            if (SAL97C11.CUPSW.trim() == '') {
                CON851('02', '02', null, 'error', 'Error');
                if (($_NITUSU == '0900005594') || ($_NITUSU == '0900541158') || ($_NITUSU == '0900566047') || ($_NITUSU == '0900405505')) {
                    _datocups_7C11();
                } else {
                    validarcups_SAL97C11();
                }
            } else {
                validarcups_SAL97C11();
            }
        }
    )
}

function validarcups_SAL97C11() {
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datosEnvio() + '1|' + SAL97C11.CUPSW }, URL)
        .then(data => {
            console.debug(data);
            SAL97C11.DESCRIPCUP = data.CONSULTA[0].DESCRIP_CUP;
            SAL97C11.OCULTARCUP = SAL97C11.DESCRIPCUP.substring(0, 1);
            SAL97C11.DURACIONCUP = data.CONSULTA[0].OCULTAR_CUP;
            if (SAL97C11.OCULTARCUP == '*') {
                CON851('13', '13', null, 'error', 'Error');
                _datocups_7C11();
            } else {
                $('#procedid_97C11').val(SAL97C11.DESCRIPCUP + SAL97C11.DURACIONCUP);
                if ((SAL97C11.CUPSW.substring(0, 2) == '93') || (SAL97C11.CUPSW.trim() == '890210') || (SAL97C11.CUPSW.trim() == '890211') || (SAL97C11.CUPSW.trim() == '890212') || (SAL97C11.CUPSW.trim() == '890310') || (SAL97C11.CUPSW.trim() == '890311') || (SAL97C11.CUPSW.trim() == '890312') || (SAL97C11.CUPSW.trim() == '890410') || (SAL97C11.CUPSW.trim() == '890411') || (SAL97C11.CUPSW.trim() == '890412') || (SAL97C11.CUPSW.trim() == '890610') || (SAL97C11.CUPSW.trim() == '890611') || (SAL97C11.CUPSW.trim() == '890612')) {
                    SAL97C11.SWTERAPIA = '1';
                } else {
                    SAL97C11.SWTERAPIA = '0';
                }
                _validarcups2_SAL97C11();
            }
        })
        .catch(err => {
            console.debug(err);
            _datocups_7C11();
        })
}


function _validarcups2_SAL97C11() {
    if (SAL97C11.SWTERAPIA == '1') {
        console.debug('evaluarterapias');
    } if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) {
        console.debug('SER210A')
    } if (SAL97C11.CUPSW.trim() != '') {
        let URL = get_url("APP/SALUD/SAL97C11.DLL");
        postData({ datosh: datosEnvio() + '3|' + SAL97C11.CUPSW + '|' + ' ' + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW }, URL)
            .then(data => {
                console.debug(data);
                SAL97C11.HORARIOSPROF = data.CONSULTA;
                _datocontrato_SAL97C11();
            })
            .catch(err => {
                console.debug(err);
                _datocups_7C11();
            })
    } else {
        _datocontrato_SAL97C11();
    }
}

function _datocontrato_SAL97C11() {
    if ($_NITUSU == '0830092718') {
        console.debug('buscar contrato');
    }
    _evaluarcontrato_SAL97C11();
}

function _evaluarcontrato_SAL97C11() {
    validarInputs(
        {
            form: "#CONTRATO_97C11",
            orden: "1"
        },
        () => { _datocups_7C11() },
        () => {
            SAL97C11.CONTRATOW = $('#contrato_97C11').val();
            console.debug(SAL97C11.CONTRATOW);
            if ((parseInt(SAL97C11.CONTRATOW) == 0) || (SAL97C11.CONTRATOW.trim() == '')) {
                SAL97C11.NITCNCAP = '0'
                SAL97C11.CONVENIOCNCAP = 'SO'
                SAL97C11.ESTADOCNCAP = '';
                SAL97C11.DESCRIPTAR = 'SOAT 2423';
                // _datosolicitud_SAL97C11(); CONTINUAR FLUJO NORMAL
                _datoconvenio_SAL97C11();
            } else {
                let URL = get_url("APP/SALUD/SAL97C11.DLL");
                postData({ datosh: datosEnvio() + '2|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU }, URL)
                    .then(data => {
                        console.debug(data);
                        SAL97C11.CNCAP = data.CONSULTA[0];
                        if (SAL97C11.CNCAP.ESTADO_CNCAP == '1') {
                            CON851('13', '13', null, 'error', 'Error');
                            _evaluarcontrato_SAL97C11();
                        } else {
                            // _datosolicitud_SAL97C11();
                            _datoconvenio_SAL97C11();
                        }
                    })
                    .catch(err => {
                        console.debug(err);
                        _evaluarcontrato_SAL97C11();
                    })
            }
        }
    )
}

function _datoconvenio_SAL97C11() {
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datosEnvio() + '2|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU }, URL)
        .then(data => {
            console.debug(data);
            SAL97C11.CNCAP = data.CONSULTA[0];
            SAL97C11.VALORW = SAL97C11.CNCAP.VALORW;
            if (SAL97C11.CNCAP.ESTADO_CNCAP == '1') {
                CON851('13', '13', null, 'error', 'Error');
                _evaluarcontrato_SAL97C11();
            } else {
                // _datosolicitud_SAL97C11();
                _ventana({
                    tipo: 'mostrar',
                    size: 'small',
                    escape: false,
                    source: '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-6 col-sm-6 col-xs-6">Estudio:</label>' +
                        '<div class="input-group col-md-6 col-sm-6 col-xs-6">' +
                        '<input id="input1_ventanaunica" class="form-control col-md-12 col-sm-12 col-xs-12">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-6 col-sm-6 col-xs-6">Insumos:</label>' +
                        '<div class="input-group col-md-6 col-sm-6 col-xs-6">' +
                        '<input id="input2_ventanaunica" class="form-control col-md-12 col-sm-12 col-xs-12">' +
                        '</div>' +
                        '</div>' +
                        '</div>' + 
                        '<div class="col-md-12 col-sm-12 col-xs-12">' +
                        '<div class="inline-inputs">' +
                        '<label class="col-md-6 col-sm-6 col-xs-6">Total:</label>' +
                        '<div class="input-group col-md-6 col-sm-6 col-xs-6">' +
                        '<input id="input3_ventanaunica" class="form-control col-md-12 col-sm-12 col-xs-12">' +
                        '</div>' +
                        '</div>' +
                        '</div>',
                    inputs: [
                        { input: 'input1_ventanaunica', valor: SAL97C11.CNCAP.VLRESTUDIOSEDIT },
                        { input: 'input2_ventanaunica', valor: SAL97C11.CNCAP.VLRINSUMOS },
                        { input: 'input3_ventanaunica', valor: SAL97C11.CNCAP.VLRTOTALEDIT }
                    ]
                }, _datosolicitud_SAL97C11, _datosolicitud_SAL97C11);
            }
        })
        .catch(err => {
            console.debug(err);
            _evaluarcontrato_SAL97C11();
        })
}

function _datosolicitud_SAL97C11() {
    SAL97C11.FECHAACT = moment().format('L');
    if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0800156469')) {
        if (SAL97C11.NOVEDADW == '7') {

        }
    } else {
        _fechasolicitud_SAL97C11();
    }
}

function _fechasolicitud_SAL97C11() {
    fechadeseadaMask_SAL7C11.typedValue = SAL97C11.FECHAACT;
    validarInputs(
        {
            form: "#FECHADESEA_97C11",
            orden: "1"
        },
        () => { _datocups_7C11() },
        () => {
            SAL97C11.FECHASOLICW = fechadeseadaMask_SAL7C11.value;
            if ((SAL97C11.NOVEDADW == '7') && (moment(SAL97C11.FECHASOLICW).isBefore(SAL97C11.FECHAACT))) {
                CON851('37', '37', null, 'error', 'Error');
                if (($_ADMINW == 'ADMI') || ($_ADMINW == 'GEBC')) {

                } else {
                    if ((($_NITUSU == '0800162035') || ($_NITUSU == '0900030814')) && (($_ADMINW == 'KELL') || ($_ADMINW == 'NATY') || ($_ADMINW == 'LOL3'))) {

                    } else {
                        if ($_NITUSU == '0900147959') {

                        } else {
                            _datosolicitud_SAL97C11();
                        }
                    }
                }
            } else {
                _datofecha_SAL97C11();
            }
        }
    )
}

function _datofecha_SAL97C11() {
    if (SAL97C11.SWTERAPIA == '1') {
        console.debug('display nro de terapias');
    } if (SAL97C11.FORMAAGEPROF == 'S') {
        SAL97C11.FECHAW = SAL97C11.FECHASOLICW;
    } if (SAL97C11.NOVEDADW == '7') {
        SER890C();
    } else {
        console.debug('tomar unicamente hora');
    }
}


///////////////////////////////// CALENDARIO ////////////////////////////////////////////////

function SER890C() {
    $('#fechacita_97C11').datepicker({
        dateFormat: "yy-mm-dd",
        autoclose: true,
        onSeclect: function (data, event) {
            console.debug(data, event);
        },
        onClose: function (data, event) {
            console.debug(data, event);
        }
    });
    validarInputs(
        {
            form: "#FECHACITA_97C11",
            orden: "1"
        },
        () => { _datocups_7C11() },
        () => {
            SAL97C11.FECHAW = fechacitaaMask_SAL7C11.value;
            if (SAL97C11.NOVEDADW == '7') {
                let URL = get_url("APP/SALUD/SAL97C11.DLL");
                postData({ datosh: datosEnvio() + '4|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW }, URL)
                    .then(data => {
                        console.debug(data)
                        _datocontrato_SAL97C11();
                    })
                    .catch(err => {
                        console.debug(err);
                        if (err.MENSAJE == '01') {
                            _validardia_SAL97C11();
                        }
                    })
            }
        }
    )
}

function _validardia_SAL97C11() {
    if ((SAL97C11.NOVEDADW == '7') && (moment(SAL97C11.FECHAW).isBefore(SAL97C11.FECHASOLICW))) {
        CON851('37', '37', null, 'error', 'Error');
        SER890C();
    }
    moment(SAL97C11.FECHAW).format('dddd DD MM YYYY');
    console.debug('añadir fecha en un input');
    if (SAL97C11.TIPOFACTW == '1') {
        if ($('#fecharequerida_SAL97C11').length > 0) {
            _evaluarfecharequerida_SAL97C11();
        } else {
            $('#DATOSFECHA_SAL97C11').append(
                '<div class="col-md-5 col-sm-3 col-xs-6">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-7 col-sm-6 col-xs-12">Fecha requerida</label>' +
                '<div class="input-group col-md-7 col-sm-4 col-xs-12" id="FECHAREQUERIDA_97C11">' +
                '<input id="fecharequerida_SAL97C11" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="10" data-orden="1">' +
                '</div>' +
                '</div>' +
                '</div>'
            )
            _evaluarfecharequerida_SAL97C11();
        }
    } else {
        _buscarfestivos_SAL97C11();
    }
}

function _evaluarfecharequerida_SAL97C11() {
    $('#fecharequerida_SAL97C11').val(SAL97C11.$_FECHAACT);
    _fecharequeridaMask_SAL97C11();
    validarInputs(
        {
            form: "#FECHAREQUERIDA_97C11",
            orden: "1"
        },
        () => { SER890C() },
        () => {
            SAL97C11.FECHARECOMEALT = $('#fecharequerida_SAL97C11').val();
            _buscarfestivos_SAL97C11()
        }
    )
}

function _buscarfestivos_SAL97C11() {
    if (SAL97C11.FORMAAGEPROF != 'S') {
        let festivo = moment(SAL97C11.FECHAW).format('YYYYMMDD');
        let retorno = buscarFestivo(festivo);
        if (retorno == undefined) {
            _validarfecha_SAL97C11();
        } else {
            CON851('9Q', '9Q', null, 'error', 'Error');
            SER890C();
        }
    } else {
        _validarfecha_SAL97C11();
    }
}

function _validarfecha_SAL97C11() {
    if (SAL97C11.NOVEDADW == '7') {
        if (SAL97C11.NOVEDADW == '7') {
            let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD')
            let datos_Evnio = datosEnvio() + '5|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw;
            console.debug(datos_Evnio);
            let URL = get_url("APP/SALUD/SAL97C11.DLL");
            postData({ datosh: datosEnvio() + '5|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw }, URL)
                .then(data => {
                    console.debug(data)
                    _leerhorarioprof_SAL97C11();
                })
                .catch(err => {
                    console.debug(err);
                    _datofecha_SAL97C11();
                })
        }
    } else {
        _leerhorarioprof_SAL97C11();
    }
}

function _leerhorarioprof_SAL97C11() {
    if ((SAL97C11.FORMAAGEPROF == 'S') && (SAL97C11.TIPOFACTW != '1')) {
        let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD')
        let URL = get_url("APP/SALUD/SAL97C11.DLL");
        postData({ datosh: datosEnvio() + '6|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw }, URL)
            .then(data => {
                console.debug(data)
                _consultar836B();
            })
            .catch(err => {
                console.debug(err);
                SER890C();
            })
    } else {
        _consultar836B();
    }
}

function _consultar836B() {
    if ((SAL97C11.NOVEDADW == '7') || (SAL97C11.NOVEDADW == '8')) {
        let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD')
        let URL = get_url("APP/SALUD/SER836B.DLL");
        postData({ datosh: datosEnvio() + SAL97C11.PACIW + '|' + fechaw + '|' + SAL97C11.MEDW.padStart(10, '0') + '|' + fechaw.substring(2, 4) }, URL)
            .then(data => {
                console.debug(data)
                if (data.CITASMED[0].trim() == '') {
                    _leercitas_SAL97C11();
                } else {
                    console.debug('tiene una cita');
                }
            })
            .catch(err => {
                console.debug(err);
                _leercitas_SAL97C11();
            })
    } else {
        _leercitas_SAL97C11();
    }
}

function _leercitas_SAL97C11() {
    let dia = moment(SAL97C11.FECHAW).day() - 1;
    if (parseInt(SAL97C11.HORARIOSPROF[dia].INTMINTABLA_PROF) > 0) {
        SAL97C11.INTMINW = SAL97C11.HORARIOSPROF[dia].INTMINTABLA_PROF
        SAL97C11.INTMIN2W = SAL97C11.HORARIOSPROF[dia].INTMIN2TABLA_PROF
    } if (parseInt(SAL97C11.HORARIOSPROF[dia].INTMINTABLA_PROF) < 0) {
        SAL97C11.INTMINW = SAL97C11.INTMIN2W = SAL97C11.HORARIOSPROF[0].INTMIN_PROF;
    } if (parseInt(SAL97C11.INTMINW) == 0) {
        SAL97C11.INTMINW = '20';
    } if (parseInt(SAL97C11.INTMIN2W) == 0) {
        SAL97C11.INTMIN2W = '20';
    } if (parseInt(SAL97C11.DURACIONCUP) > 0) {
        if (SAL97C11.INTMINW > 0) {
            SAL97C11.FACTORW = Math.round(parseInt(SAL97C11) / 15)
        } else {
            SAL97C11.FACTORW = Math.round((parseInt(SAL97C11.DURACIONCUP) / parseInt(SAL97C11.INTMINW)) + 0.2);
        }
    } if (parseInt(SAL97C11.DURACIONCUP) < 1) {
        SAL97C11.FACTORW = '0'
    }
    if (($_NITUSU != '830092718') && ($_NITUSU != '0830092719') && ($_NITUSU != '0800156469')) {
        if (SAL97C11.HRINI1P > 0) {
            SAL97C11.HORAINI1T = '0700';
            SAL97C11.HORAFIN1T = '1200';
            SAL97C11.HORAINI2T = '1400'
            SAL97C11.HORAFIN2T = '1800'
        }
    }
    _leercitas2_SAL97C11();
}

function _leercitas2_SAL97C11() {
    let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD');
    let ano = fechaw.substring(2, 4);
    SAL97C11.LLAVEW = $_USUA_GLOBAL[0].PREFIJ + fechaw + SAL97C11.MEDW.padStart(10, '0') + SAL97C11.PACIW + SAL97C11.TIPOFACTW + SAL97C11.CUPSW.padEnd(12, ' ');
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datosEnvio() + '7|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw + '|' + ano + '|' + SAL97C11.LLAVEW }, URL)
        .then(data => {
            console.debug(data)
            if (SAL97C11.NOVEDADW == '8') {
                _cambio_SAL97C11();
            } if (SAL97C11.NOVEDADW == '9') {
                _retiro_SAL97C11();
            } else {
                CON851('00', '00', null, 'error', 'Error');
                SER890C();
            }
        })
        .catch(err => {
            console.debug(err);
            if (SAL97C11.NOVEDADW == '7') {
                _nuevo_SAL97C11();
            }
        })
}

function _nuevo_SAL97C11() {
    if ((SAL97C11.PACIW > 0) && (SAL97C11.PACIW < 100)) {
        SAL97C11.EPSPACIW = '';
        _aceptardatosw_SAL97C11();
    } else {
        _mostrarnuevo_SAL97C11();
    }
}

function _mostrarnuevo_SAL97C11() {
    $('#observacion_97C11').val(SAL97C11.NOMBREENTW);
    $('#telefonouno_97C11').val($_REG_PACI[0].TELEFONO);
    $('#telefonodos_97C11').val($_REG_PACI[0].CEL);
    let horax = moment().format('LT').substring(0, 2) + ' 00';
    horaMask_SAL97C11.typedValue = horax;
    if ((($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) && ((SAL97C11.CUPSW == '876801') || (SAL97C11.CUPSW == '0876802'))) {
        _ventanamamografia_SAL97C11();
    } else {
        _evaluarhora_SAL97C11();
    }
}

function _evaluarhora_SAL97C11() {
    validarInputs(
        {
            form: "#HORA_97C11",
            orden: "1"
        },
        () => { _datomedico_7C11() },
        () => {
            SAL97C11.HORAW = horaMask_SAL97C11.value;
            if ((SAL97C11.NOVEDADW == '7') && (SAL97C11.FECHAW == SAL97C11.FECHAACT)) {
                if (parseInt(SAL97C11.HORAW) < parseInt(SAL97C11.HORAACT)) {
                    CON851('9Q', '9Q', null, 'error', 'Error');
                    if ($_NITUSU == '0900306771') {
                        _buscarcita_SAL97C11();
                    } else {
                        _evaluarhora_SAL97C11();
                    }
                } else {
                    _buscarcita_SAL97C11();
                }
            } else {
                _buscarcita_SAL97C11();
            }
        }
    )
}

function _buscarcita_SAL97C11() {
    let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD');
    let horaw = SAL97C11.HORAW.replace(':', '');
    let ano = fechaw.substring(2, 4);
    SAL97C11.LLAVEALTW = SAL97C11.MEDW + fechaw + horaw;
    console.debug(SAL97C11.LLAVEALTW);
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datosEnvio() + '8|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw + '|' + ano + '|' + SAL97C11.LLAVEW + '|' + SAL97C11.LLAVEALTW }, URL)
        .then(data => {
            console.debug(data)
            console.debug('LINEA 2188');
            _evaluartelefono_SAL97C11();
        })
        .catch(err => {
            console.debug(err);
            _evaluartelefono_SAL97C11();
        })
}

function _evaluartelefono_SAL97C11() {
    validarInputs(
        {
            form: "#TELEFONOUNO_97C11",
            orden: "1"
        },
        () => {
            if (SAL97C11.NOVEDADW == '8') {
                _evaluarpaciente_SAL97C11();
            } else {
                _evaluarhora_SAL97C11();
            }
        },
        () => {
            SAL97C11.TELW = $('#telefonouno_97C11').val();
            _evaluarcelular_SAL97C11();
        }
    )
}

function _evaluarcelular_SAL97C11() {
    validarInputs(
        {
            form: "#TELEFONODOS_97C11",
            orden: "1"
        },
        () => { _evaluartelefono_SAL97C11() },
        () => {
            SAL97C11.TEL2W = $('#telefonodos_97C11').val();
            if (SAL97C11.TIPOFACTW != '1') {
                SAL97C11.TIPOANESTW = '';
                _datoembarazon_SAL97C11();
            } else {
                let TIPOSANES = [
                    { CODIGO: '1', DESCRIPCION: 'GENERAL' },
                    { CODIGO: '2', DESCRIPCION: 'EPIDURAL' },
                    { CODIGO: '3', DESCRIPCION: 'RAQUIDEA' },
                    { CODIGO: '4', DESCRIPCION: 'SEDACION' },
                    { CODIGO: '5', DESCRIPCION: 'BLOQUEO' },
                    { CODIGO: '6', DESCRIPCION: 'LOCAL ASISTIDA' },
                    { CODIGO: '7', DESCRIPCION: 'LOCAL' },
                    { CODIGO: '8', DESCRIPCION: 'SIN ANESTECIA' }
                ];
                POPUP({
                    array: TIPOSANES,
                    titulo: "Tipo Anestesia:",
                    indices: [
                        { label: 'DESCRIPCION' }
                    ],
                    callback_f: _evaluarcelular_SAL97C11
                },
                    data => {
                        switch (data.CODIGO) {
                            case '1':
                            case '2':
                            case '3':
                            case '4':
                            case '5':
                            case '6':
                            case '7':
                            case '8':
                                SAL97C11.TIPOANESTW = data.CODIGO;
                                _datoembarazon_SAL97C11();
                                break;
                        }
                    });
            }
        }
    )
}

function _datoembarazon_SAL97C11() {
    let fechanacim = $_REG_PACI[0].NACIM;
    SAL97C11.EDAD = calcular_edad(moment(fechanacim).format('YYYY-MM-DD'));

    if (($_REG_PACI[0].SEXO == 'F') && (SAL97C11.EDAD.unid_edad == 'A') && (SAL97C11.EDAD.vlr_edad > 8) && (SAL97C11.EDAD.vlr_edad < 60)) {
        let TIPOEMBARAZO = [
            { CODIGO: '1', DESCRIPCION: 'EMBARAZO PRIMER TRIMESTRE' },
            { CODIGO: '2', DESCRIPCION: 'EMBARAZO SEGUND TRIMESTRE' },
            { CODIGO: '3', DESCRIPCION: 'EMBARAZO TERCER TRIMESTRE' },
            { CODIGO: '4', DESCRIPCION: 'NO ESTA EMBARAZADA' }
        ];
        POPUP({
            array: TIPOEMBARAZO,
            titulo: "Condicion usuaria:",
            indices: [
                { label: 'DESCRIPCION' }
            ],
            callback_f: _evaluarcelular_SAL97C11
        },
            data => {
                switch (data.CODIGO) {
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                        SAL97C11.EMBARAZOW = data.CODIGO;
                        if ((SAL97C11.UNSERVW == '08') && ((SAL97C11.EMBARAZOW == '1') || (SAL97C11.EMBARAZOW == '2') || (SAL97C11.EMBARAZOW == '3'))) {
                            CON851('6U', '6U', null, 'warning', 'Advertencia');
                        }
                        $('#embarazo_97C11').val(data.CODIGO + ' - ' + data.DESCRIPCION);
                        if (SAL97C11.TIPOFACTW != '7') {
                            SAL97C11.FINALIDADW = '10';
                            _datoobser_SAL97C11();
                        } else {
                            var nitdelusu = $_NITUSU;
                            SAL97C11.DATOFINALIDAD = datos_finalidad(nitdelusu.padStart(10, '0'), $_REG_PACI[0].SEXO, SAL97C11.EDAD.vlr_edad);
                            _datofinalidad_SAL97C11();
                        }
                        break;
                }
            });
    } else {
        SAL97C11.EMBARAZOW = '9';
        $('#embarazo_97C11').val('9 - NO APLICA');
        if (SAL97C11.TIPOFACTW != '7') {
            SAL97C11.FINALIDADW = '10';
            _datoobser_SAL97C11();
        } else {
            var nitdelusu = $_NITUSU;
            SAL97C11.DATOFINALIDAD = datos_finalidad(nitdelusu.padStart(10, '0'), $_REG_PACI[0].SEXO, SAL97C11.EDAD.vlr_edad);
            _datofinalidad_SAL97C11();
        }
    }
}

function _datofinalidad_SAL97C11() {
    POPUP({
        array: SAL97C11.DATOFINALIDAD,
        titulo: "Dato Finalidad:",
        indices: [
            { label: 'descripcion' }
        ],
        callback_f: _evaluarcelular_SAL97C11
    },
        data => {
            switch (data.CODIGO) {
                case '01':
                case '02':
                case '03':
                case '04':
                case '05':
                case '06':
                case '07':
                case '08':
                case '09':
                case '10':
                case '11':
                    SAL97C11.FINALIDADW = data.CODIGO;
                    if ((SAL97C11.EMBARAZOW == 'N') && ((SAL97C11.FINALIDADW == '1') || (SAL97C11.FINALIDADW == '6'))) {
                        CON851('03', '03', null, 'error', 'Error');
                        _datofinalidad_SAL97C11();
                    } else if (((SAL97C11.EDAD.vlr_edad == 'M') || (SAL97C11.vlr_edad == 'A')) && (SAL97C11.FINALIDADW == '2')) {
                        CON851('03', '03', null, 'error', 'Error');
                        _datofinalidad_SAL97C11();
                    } else if (SAL97C11.FINALIDADW == '6') {
                        if ((SAL97C11.EMBARAZOW == '1') || (SAL97C11.EMBARAZOW == '2') || (SAL97C11.EMBARAZOW == '3')) {
                            if (SAL97C11.FINALIDADW == '10') {
                                if (($_NITUSU == '0845000038') || ($_NITUSU == '0900405505')) {
                                    CON851('4K', '4K', null, 'error', 'Error');
                                }
                                _datoobser_SAL97C11();
                            }
                        } else {
                            CON851('83', '83', null, 'error', 'Error');
                            _datofinalidad_SAL97C11();
                        }
                    } if (SAL97C11.FINALIDADW == '10') {
                        if (($_NITUSU == '0845000038') || ($_NITUSU == '0900405505')) {
                            CON851('4K', '4K', null, 'error', 'Error');
                        }
                        _datoobser_SAL97C11();
                    }
                    break;
            }
        });
}

function _datoobser_SAL97C11() {
    validarInputs(
        {
            form: "#OBSERVACION_97C11",
            orden: "1"
        },
        () => { _evaluartelefono_SAL97C11() },
        () => {
            SAL97C11.OBSERW = $('#observacion_97C11').val();
            if (SAL97C11.TIPOFACTW == '1') {
                // console.debug('RECOMENDACIONES LINEA 2511');
                var ventanarecomendaciones = bootbox.dialog({
                    size: 'large',
                    onEscape: true,
                    title: 'RECOMENDACIONES',
                    message: '<div class="row"> ' +
                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Nada via oral despues de las 22:00 horas o 10 pm' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="nadaviadorarecome_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +
                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Debe asistir en Ayunas' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="asisayunasrecome_SAL97C11" type="text" class="form-control input-md" data-orden="2" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +
                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Dieta Liquida el dia anterior' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="dietaliquirecome_SAL97C11" type="text" class="form-control input-md" data-orden="3" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +
                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Si la cirugia es en la tarde puede tomar JUGO 5 am' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="jugocincamrecome_SAL97C11" type="text" class="form-control input-md" data-orden="4" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +
                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Traer ropa comoda, zapatos planos' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="ropazapatorecome_SAL97C11" type="text" class="form-control input-md" data-orden="5" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Avise con 3 dias de anticipacion si presenta algunos de estos sintomas, Fiebre, gripe, diarrea' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="gripefeibrrecome_SAL97C11" type="text" class="form-control input-md" data-orden="6" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Si toma Aspirina, Asawin , Asa, o cualquier tipo de anticoagulante, suspender 10 dias antes de QX' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="aspirinasarecome_SAL97C11" type="text" class="form-control input-md" data-orden="7" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Debe venir con acompañante mayor de 18 años' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="acompanantrecome_SAL97C11" type="text" class="form-control input-md" data-orden="8" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Asitir sin ,maquillaje, esmalte en uñas , rasurada en area de QX , sin Joyas' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="maquillajerecome_SAL97C11" type="text" class="form-control input-md" data-orden="9" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Todo menor de edad debe venir con los padres' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="menoredaderecome_SAL97C11" type="text" class="form-control input-md" data-orden="10" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Debe hacer copago' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="copagomoderecome_SAL97C11" type="text" class="form-control input-md" data-orden="11" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Traer Maleta con pijama y utiles de aseo' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="pijamautilrecome_SAL97C11" type="text" class="form-control input-md" data-orden="12" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Si toma medicamentos de control traer la formula y si trae medicamento entregar medico servicio' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="medicontrorecome_SAL97C11" type="text" class="form-control input-md" data-orden="13" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Traer Frasco de boca ancha con tapa' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="frascobocarecome_SAL97C11" type="text" class="form-control input-md" data-orden="14" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Traer Radiografias ,TAC,Resonacias, Ecografias' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="radiogrtacrecome_SAL97C11" type="text" class="form-control input-md" data-orden="15" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Pañales desechables' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="panalesdesrecome_SAL97C11" type="text" class="form-control input-md" data-orden="16" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Traer una cobija termica limpia' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="cobijatermrecome_SAL97C11" type="text" class="form-control input-md" data-orden="17" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'Reserva GRE' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="reservafremrecome_SAL97C11" type="text" class="form-control input-md" data-orden="18" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +

                        '<div class="col-md-4"> ' +
                        '<div class="form-group"> ' +
                        '<label class="col-md-8 control-label">' + 'FORMOL X 500ML' + '</label> ' +
                        '<div class="col-md-4" id="VALIDA1R_SAL97C11"> ' +
                        '<input id="formolx500recome_SAL97C11" type="text" class="form-control input-md" data-orden="19" maxlength="1"> ' +
                        '<span class="help-block">' + 'S/N' + '</span> ' +
                        '</div> ' +
                        '</div> ' +
                        '</div>' +
                        '</div>',
                    buttons: {
                        confirm: {
                            label: 'Aceptar',
                            className: 'btn-primary',
                            callback: function () {
                                ventanarecomendaciones.off('show.bs.modal');
                                _datoestado_SAL97C11();
                            }
                        },
                        cancelar: {
                            label: 'Cancelar',
                            className: 'btn-danger',
                            callback: function () {
                                ventanarecomendaciones.off('show.bs.modal');
                                _datoobser_SAL97C11();
                            }
                        }
                    }
                });
                ventanarecomendaciones.init($('.modal-footer').hide(), _evaluarrecomendaciones_SAL97C11());
                ventanarecomendaciones.on('shown.bs.modal', function () {
                    $("#nadaviadorarecome_SAL97C11").focus();
                });
                ventanarecomendaciones.init(_Mascarasrecomendaciones_SAL97C11(), _inputControl('disabled'));
            } else {
                _datoestado_SAL97C11();
            }
        }
    )
}

function _evaluarrecomendaciones_SAL97C11(orden) {
    validarInputs(
        {
            form: "#VALIDA1R_SAL97C11",
            orden: orden
        },
        () => { $('.btn-danger').click() },
        () => {
            SAL97C11.NADAVIAORARECOME = $('#nadaviadorarecome_SAL97C11').val();
            SAL97C11.ASISAYUNASRECOME = $('#asisayunasrecome_SAL97C11').val();
            SAL97C11.DIETALIQUIRECOME = $('#dietaliquirecome_SAL97C11').val();
            SAL97C11.JUGOCINCARECOME = $('#jugocincamrecome_SAL97C11').val();
            SAL97C11.ROPAZAPATOARECOME = $('#ropazapatorecome_SAL97C11').val();
            SAL97C11.GRIPEFEIBRRECOME = $('#gripefeibrrecome_SAL97C11').val();
            SAL97C11.ASPIRINASRECOME = $('#aspirinasarecome_SAL97C11').val();
            SAL97C11.ACOMPANANTARECOME = $('#acompanantrecome_SAL97C11').val();
            SAL97C11.MAQUILLAJERECOME = $('#maquillajerecome_SAL97C11').val();
            SAL97C11.MENOREDADDERECOME = $('#menoredaderecome_SAL97C11').val();
            SAL97C11.COPAGOMORDERECOME = $('#copagomoderecome_SAL97C11').val();
            SAL97C11.PIJAMAUTILRECOME = $('#pijamautilrecome_SAL97C11').val();
            SAL97C11.MEDICONTRORECOME = $('#medicontrorecome_SAL97C11').val();
            SAL97C11.FRASCOBOCARECOME = $('#frascobocarecome_SAL97C11').val();
            SAL97C11.PANALESDESRECOME = $('#panalesdesrecome_SAL97C11').val();
            SAL97C11.COBIJATERMRECOME = $('#cobijatermrecome_SAL97C11').val();
            SAL97C11.RESERVAFREMRECOME = $('#reservafremrecome_SAL97C11').val();
            SAL97C11.FORMOLX500RECOME = $('#formolx500recome_SAL97C11').val();
            $('.btn-primary').click();
        }
    )
}



function _datoestado_SAL97C11() {
    validarInputs(
        {
            form: "#ESTADOCITA_97C11",
            orden: "1"
        },
        () => { _datoobser_SAL97C11() },
        () => {
            SAL97C11.ESTADOW = estadocitaMask_SAL7C11.value;
            if (SAL97C11.ESTADOW == 'C') {
                if (SAL97C11.ESTADOW != SAL97C11.ESTADOANT) {
                    SAL97C11.CLAVECANCW = $_ADMINW + $_DIAACTUAL + SAL97C11.HORAACTUAL;
                } else {
                    _datocausa_SAL97C11();
                }
            } else {
                SAL97C11.CLAVECANCW = '';
                _datocausa_SAL97C11();
            }
        }
    )
}

function _datocausa_SAL97C11() {
    if (SAL97C11.ESTADOW == 'C') {
        let DATOESTADOS = [
            { CODIGO: '1', DESCRIPCION: '1 CANCEL X URGEN' },
            { CODIGO: '2', DESCRIPCION: '2 FALTA SANGRE' },
            { CODIGO: '3', DESCRIPCION: '3 FALTA MAT. MQ' },
            { CODIGO: '4', DESCRIPCION: '4 FALTA APOYO DX' },
            { CODIGO: '5', DESCRIPCION: '5 FALTA MEDICO' },
            { CODIGO: '6', DESCRIPCION: '6 FALTA SALA' },
            { CODIGO: '7', DESCRIPCION: '7 FALTA CUID INS' },
            { CODIGO: '8', DESCRIPCION: '8 FALTA CUID PAC' },
            { CODIGO: '9', DESCRIPCION: '9 CUDARO CLINICO' },
            { CODIGO: 'A', DESCRIPCION: 'A DECISION PACI.' },
            { CODIGO: 'B', DESCRIPCION: 'B OTRO MOTIVO' },
            { CODIGO: 'C', DESCRIPCION: 'C DECISION PROFE' }
        ];
        POPUP({
            array: DATOESTADOS,
            titulo: "Motivo cancelacion:",
            indices: [
                { label: 'DESCRIPCION' }
            ],
            callback_f: _datoestado_SAL97C11
        },
            data => {
                switch (data.CODIGO) {
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
                        SAL97C11.CAUSACANCW = data.CODIGO;
                        _datodoble_SAL97C11();
                        break;
                }
            });
    } else {
        SAL97C11.CAUSACANCW = '';
        _datodoble_SAL97C11();
    }
}

function _datodoble_SAL97C11() {
    validarInputs(
        {
            form: "#CITADOBLE_97C11",
            orden: "1"
        },
        () => { _datoobser_SAL97C11() },
        () => {
            SAL97C11.DOBLEW = dobleMask_SAL97C11.value;
            switch (SAL97C11.DOBLEW) {
                case 'S':
                    $('#citadoble_97C11').val('S DOBLE');
                    break;
                case 'N':
                    $('#citadoble_97C11').val('N SENCILLA');
                    break;
                case 'T':
                    $('#citadoble_97C11').val('TRIPLE');
                    break;
            }
            CON851P('01', _datoobser_SAL97C11, _confirmar_SAL97C11);
        }
    )
}

function _confirmar_SAL97C11() {
    if (parseInt(SAL97C11.CONTRATOW) > 0) {
        console.debug('mirar cncap');
    } if (SAL97C11.NOVEDADW == '8') {
        _grabarcambio_SAL97C11();
    } else if (SAL97C11.NOVEDADW == '7') {
        SAL97C11.OPERW = $_ADMINW;
        SAL97C11.FECHAELABW = moment().format('YYYYMMDD');
        SAL97C11.HORAELABW = moment().format('HH:mm');
        _grabarcambio_SAL97C11();
    }
}

function _grabarcambio_SAL97C11() {
    // datos_envio = datosEnvio() + 'A|' + SAL97C11.LLAVEW + '|' + SAL97C11.LLAVEALTW + '|' + SAL97C11.NOMBREW + '|' + SAL97C11.OBSERW; // FALTAN LAS OTRAS DOS OBSERV
    // datos_envio += SAL97C11.CONTRATOW + '|' + SAL97C11.CONVENIOCNCAP + '|' + SAL97C11.VALORW + '|' + SAL97C11.CLAVECANCW + '|' + SAL97C11.FINALIDADW + '|' + SAL97C11.EMBARAZOW + '|' + SAL97C11.FECHASOLICW + '|' + SAL97C11.HORAELABW + '|' + SAL97C11.EPSPACIW + '|' + SAL97C11.ESTADOW + '|' + SAL97C11.CAUSACANCW + '|' + SAL97C11.TELW + '|' + SAL97C11.TEL2W + '|' + SAL97C11.UNSERVW + '|' + SAL97C11.TIPOANESTW + '|' + SAL97C11.DOBLEW + '|' + SAL97C11.OPERW + '|' + SAL97C11.FECHAELABW;
    let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD');
    let ano = fechaw.substring(2, 4);
    datos_envio = datosEnvio() + 'A|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw + '|' + ano + '|'
    datos_envio += SAL97C11.LLAVEW + '|' + SAL97C11.LLAVEALTW + '|' + SAL97C11.ATIENDEPROF + '|' + SAL97C11.NOMBREW + '|' + SAL97C11.OBSERW + '|'; // FALTAN LAS OTRAS DOS OBSERV
    datos_envio += SAL97C11.CONTRATOW.padStart(4, ' ') + '|' + SAL97C11.CONVENIOCNCAP.padStart(2, ' ') + '|' + SAL97C11.VALORW.padEnd(12, '0') + '|' + SAL97C11.CLAVECANCW + '|' + SAL97C11.FINALIDADW.padStart(2, '0') + '|' + SAL97C11.EMBARAZOW + '|' + SAL97C11.FECHASOLICW.replace(/-/g, '') + '|' + SAL97C11.HORAELABW.replace(/:/, '') + '|' + SAL97C11.EPSPACIW.padStart(6, ' ') + '|' + SAL97C11.ESTADOW.padStart(1, ' ') + '|' + SAL97C11.CAUSACANCW.padStart(1, ' ') + '|' + SAL97C11.TELW.padStart(12, ' ') + '|' + SAL97C11.TEL2W.padStart(12, ' ') + '|' + SAL97C11.UNSERVW.padStart(2, ' ') + '|' + SAL97C11.TIPOANESTW.padStart(1, ' ') + '|' + SAL97C11.DOBLEW.padStart(1, ' ') + '|' + SAL97C11.OPERW + '|' + SAL97C11.FECHAELABW + '|' + SAL97C11.FACTORW;
    console.debug(datos_envio);
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(data => {
            console.debug(data);
            CON851('39', '', null, 'success', 'Exito');
            _toggleNav()
        })
        .catch(err => {
            console.debug(err);
            _evaluartelefono_SAL97C11();
        })
}
///////////////////////////////// MASCARAS //////////////////////////////////////////////////

// var claseMask_SAL7C11 = IMask($('#clase_97C11')[0], { mask: Number, min: 0, max: 7 });
var claseMask_SAL7C11 = IMask($("#clase_97C11")[0], {
    mask: '*',
    definitions: {
        '*': /[A,B,C,D,E,F,G,H,I,1,3,4,5,7]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});

var dobleMask_SAL97C11 = IMask($("#citadoble_97C11")[0], {
    mask: '*',
    definitions: {
        '*': /[S,N,T]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});

var estadocitaMask_SAL7C11 = IMask($("#estadocita_97C11")[0], {
    mask: '*',
    definitions: {
        '*': /[C,*, ]/
    },
    prepare: function (str) {
        console.debug(str);
        return str.toUpperCase();
    },
    commit: function (value, masked) {
        masked._value = value.toLowerCase()
    }
});

var horaMask_SAL97C11 = IMask($('#hora_97C11')[0], {
    mask: 'HH:mm',
    blocks: {
        HH: {
            mask: IMask.MaskedRange,
            from: 00,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 00,
            to: 59
        }
    }
})

var fechadeseadaMask_SAL7C11 = IMask($("#fechadesea_97C11")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 2000, to: 2030, maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: 01, to: 12, maxLength: 2 },
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

var fechacitaaMask_SAL7C11 = IMask($("#fechacita_97C11")[0], {
    mask: Date,
    pattern: 'Y-m-d',
    lazy: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 2000, to: 2030, maxLength: 4 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: 01, to: 12, maxLength: 2 },
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

function _fecharequeridaMask_SAL97C11() {
    var fecharequeridaMask = IMask($("#fecharequerida_SAL97C11")[0], {
        mask: Date,
        pattern: 'Y-m-d',
        lazy: true,
        blocks: {
            Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 2000, to: 2030, maxLength: 4 },
            m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: 01, to: 12, maxLength: 2 },
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
}

function _Mascarasrecomendaciones_SAL97C11() {
    var nadaviaoraMask_SAL97C11 = IMask($("#nadaviadorarecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var asisayunasMask_SAL97C11 = IMask($("#asisayunasrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var dietaliquiMask = IMask($("#dietaliquirecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var jugocincamMask = IMask($("#jugocincamrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var ropazapatoMask = IMask($("#ropazapatorecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var gripefeibrMask = IMask($("#gripefeibrrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var aspirinasaMask = IMask($("#aspirinasarecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var acompanantMask = IMask($("#acompanantrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var maquillajeMask = IMask($("#maquillajerecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var menoredadeMask = IMask($("#menoredaderecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var copagomodeMask = IMask($("#copagomoderecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var pijamautilMask = IMask($("#pijamautilrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var medicontroMask = IMask($("#medicontrorecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var frascobocaMask = IMask($("#frascobocarecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var radiogrtacMask = IMask($("#radiogrtacrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var panalesdesMask = IMask($("#panalesdesrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var cobijatermMask = IMask($("#cobijatermrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var reservafremMask = IMask($("#reservafremrecome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
        },
        prepare: function (str) {
            console.debug(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
    var formolx500Mask = IMask($("#formolx500recome_SAL97C11")[0], {
        mask: '*',
        definitions: {
            '*': /[S,N]/
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

////////////////////////////////// FUNCIONES ADICIONALES /////////////////////////////
function _calcularedad_SAL97C11() {
    // $_UNIDEDADW = 'A';
    // $_VLREDADW
    $_FECHAINIW = SAL97C11.FECHANACPACW;
    $_FECHASISTEMA = moment().format('YYYYMMDD');
    $_FECHAACTW = $_FECHASISTEMA;
    $_ANOINIW = parseInt($_FECHAINIW.substring(0, 4));
    $_MESINIW = parseInt($_FECHAINIW.substring(4, 6));
    $_DIAINIW = parseInt($_FECHAINIW.substring(6, 8));
    $_ANOACTW = parseInt($_FECHAACTW.substring(0, 4));
    $_MESACTW = parseInt($_FECHAACTW.substring(4, 6));
    $_DIAACTW = parseInt($_FECHAACTW.substring(6, 8));
    // console.debug($_MESACTW, $_MESINIW);

    if (($_MESACTW == $_MESINIW) && ($_DIAACTW == $_DIAACTW) && ($_ANOACTW > $_ANOINIW)) {
        $_UNIDEDADW = 'A';
        $_VLREDADW = $_ANOACTW - $_ANOINIW;
        $_VLREDADW = Math.round($_VLREDADW);
        $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
    }

    // console.debug($_MESACTW, $_MESINIW);
    // console.debug($_FECHAACTW, $_FECHAINIW);
    var mesesdias = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mesesmes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (var i = 0; i < mesesmes.length; i++) {
        if ($_MESACTW == mesesmes[i]) {
            $_NROMESW = mesesdias[i];
            // console.debug($_MESACTW, mesesdias[i]);
            break;
        }
    }

    // console.debug($_MESACTW, $_NROMESW);

    if (($_MESACTW > 2) && (($_ANOACTW == 1996) || ($_ANOACTW == 2000) || ($_ANOACTW == 2004) || ($_ANOACTW == 2008) || ($_ANOACTW == 2012) || ($_ANOACTW == 2016) || ($_ANOACTW == 2020) || ($_ANOACTW == 2024) || ($_ANOACTW == 2028) || ($_ANOACTW == 2032))) {
        $_NROMESW++;
    }
    // console.debug($_MESACTW, $_NROMESW);
    $_NRODIASACT = ($_ANOACTW * 365.25) + $_NROMESW + $_DIAACTW;
    $_NRODIASACT = Math.round($_NRODIASACT);


    for (var i = 0; i < mesesmes.length; i++) {
        if ($_MESINIW == mesesmes[i]) {
            $_NROMESW = mesesdias[i];
            // console.debug($_MESINIW, mesesdias[i]);
            break;
        }
    }

    if (($_MESINIW > 2) && (($_ANOINIW == 1996) || ($_ANOINIW == 2000) || ($_ANOINIW == 2004) || ($_ANOINIW == 2008) || ($_ANOINIW == 2012) || ($_ANOINIW == 2016) || ($_ANOINIW == 2020) || ($_ANOINIW == 2024) || ($_ANOINIW == 2028) || ($_ANOINIW == 2032))) {
        $_NROMESW = $_NROMESW + 1;
    }

    $_NRODIASINI = ($_ANOINIW * 365.25) + $_NROMESW + $_DIAINIW;
    $_NRODIASINI = Math.round($_NRODIASINI);

    // console.debug($_NRODIASACT, $_NRODIASINI);

    $_NRODIASEDAD = $_NRODIASACT - $_NRODIASINI;

    if ($_NRODIASEDAD == 0) {
        $_NRODIASEDAD = 1;
    } else if ($_NRODIASEDAD < 30) {
        $_UNIDEDADW = 'D';
        $_VLREDADW = $_NRODIASEDAD;
        $_VLREDADW = Math.round($_VLREDADW);
        $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
        _Calcularedad2_7767();
    } else {
        if ($_NRODIASEDAD < 365) {
            $_UNIDEDADW = 'M';
            $_VLREDADW = $_NRODIASEDAD / 30;
            $_VLREDADW = Math.round($_VLREDADW);
            $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
            _Calcularedad2_7767();
        } else {
            $_UNIDEDADW = 'A';
            $_VLREDADW = $_NRODIASEDAD / 365.25;
            _Calcularedad2_7767();
            $_VLREDADW = Math.round($_VLREDADW);
            $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
            if ($_VLREDADW == 0) {
                $_UNIDEDADW = 'M';
                $_VLREDADW = 11;
                $_VLREDADW = Math.round($_VLREDADW);
                $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
                _Calcularedad2_7767();
            }
        }
    }
}

function _Calcularedad2_7767() {
    if (($_UNIDEDADW == 'D') && ($_VLREDADW == 30)) {
        $_UNIDEDADW = 'M';
        $_VLREDADW = 1;
        $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
    }
    if (($_UNIDEDADW == 'M') && ($_VLREDADW == 12)) {
        $_UNIDEDADW = 'A';
        $_VLREDADW = 1;
        $_EDADPACW = $_UNIDEDADW + $_VLREDADW;

    }
}