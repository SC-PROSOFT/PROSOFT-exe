var SAL97C11 = ['DESCRIPPACIW', 'EPSPACIW', 'FECHANACPACW', 'EDADPACW', 'RESTAPLIPACIW', 'CIUDADPACIW', 'DERECHOPACIW', 'NOMBREENTW', 'NITFACTPACIW',
    'RESTRICPACIW', 'RESTDROGPACIW', 'RESTCIRUGPACIW', 'RESTLABOPACIW', 'RESTIMAGPACIW', 'RESTESTAPACIW', 'RESTCONSPACIW',
    'RESTTERFPACIW', 'RESTTEROPACIW', 'RESTODOCPACIW', 'RESTPYPPACIW', 'TUTELAPACIW', 'ALTCOSPACIW', 'PROGEPSPACIW',
    'CRONICOPACIW', 'MULTICONSULPACIW', 'MEDFAMIPACIW', 'EMBALTORIESGPACIW', 'NROCEDW', 'MEDW'
];
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

    ]);

    CON850(_evaluarCON850_SAL97C11);
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
    let URL = get_url("APP/" + "SALUD/SER819" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_PROFESIONALES_7C11 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE PROFESIONALES',
                    columnas: ["NOMBRE", "IDENTIFICACION", "ATIENDE_PROF", "LU", "MA", "MI", "JU", "VI", "SA"],
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
            }
        })
        .catch((error) => {
            console.log(error)
        });
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
        function () {
            CON850(_evaluarCON850_SAL97C11);
        },
        _datopaciente_SAL97C11
    )
}

function _datopaciente_SAL97C11() {
    SAL97C11['VARTERAPW', 'ULTMAMOW', 'SW9', 'CONTACITAST', 'SALACIRUEDIT'];
    SAL97C11.VARTERAPW = ' ';
    SAL97C11.ULTMAMOW = ' ';
    SAL97C11.SW9 = ' ';
    SAL97C11.CONTACITAST = ' ';
    SAL97C11.SALACIRUEDIT = ' ';

    if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
        SAL97C11['LLAVEALTW', 'DATOSW', 'OTROSDATOSW', 'DATOSADIC1', 'DATOSADIC3W', 'LLAVECITW', 'CUPSW'];
        console.debug('falta');
        //CLINICA  SERVIMEDICOS TIENEN PISTOLA CEDULA ADMISIONES
    } else if ($_NITUSU == '0800162035') {
        console.debug('codigo de barras', 'SER848');
        // if(NROCEDW){

        // }
        // llamado ser848
        _leercodigobarras_SAL97C11();
    } else {
        SAL97C11['PACIW'] = $('#numero_97C11').val();
        SAL97C11.PACIW = SAL97C11['PACIW'].padStart(15, "0");
        $('#numero_97C11').val(SAL97C11.PACIW);

        if ((SAL97C11.NOVEDADW == '7') && (SAL97C11.PACIW == '000000000000000')) {
            CON851('02', '02', null, 'error', 'Error');
            _evaluarpaciente_SAL97C11();
        } else if ((SAL97C11.PACIW < '000000000000100') && ($.isNumeric(SAL97C11.PACIW))) {
            SAL97C11.DESCRIPPACIW = ' ';
            SAL97C11.EPSPACIW = ' ';
            SAL97C11['DERECHOPACI'] = '1';
            _mostrarpaciente_SAL97C11();
        } else {
            datos_envio = datosEnvio() + SAL97C11.PACIW + "|";
            console.log(datos_envio)
            postData({
                datosh: datos_envio
            }, get_url("APP/SALUD/SER810-1.DLL"))
                .then((data) => {
                    console.debug(data);
                    $_REG_PACI = data['REG-PACI'];
                    console.log($_REG_PACI, 'json')
                    SAL97C11.DESCRIPPACIW = $_REG_PACI[0].DESCRIP
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
                    // $_OPSEGU = "IS767";
                    // LLAMADO_DLL({
                    //     dato: [$_ADMINW, $_OPSEGU],
                    //     callback: _dataCON904S_04_SAL97C11,
                    //     nombredll: 'CON904S',
                    //     carpeta: 'CONTAB'
                    // });
                    console.log(error)
                });
        }
    }
}

function _leercodigobarras_SAL97C11() {
    fuente = '<div class="col-md-12" id="CODBARRAS_SAL97C11"> ' +
        '<input id="codbarras_SAL97C11" type="text" class="form-control input-md" data-orden="1" maxlength="15"> ' +
        '</div>';
    _ventana({
        source: fuente,
        title: 'LECTOR DE CEDULA',
        size: 'small',
        espace: true,
        focus: '#codbarras_SAL97C11',
        form: '#CODBARRAS_SAL97C11',
        order: '1',
        global1: '$_CODCEDULA',
        inputglobal1: '#codbarras_SAL97C11',
    }, _consultaopaciente_SAL97C11, _evaluarpaciente_SAL97C11);
}

function _consultaopaciente_SAL97C11() {
    SAL97C11.PACIW = $_CODCEDULA;
    if (SAL97C11.PACIW.trim() == ' ') {
        CON851('02', '02', null, 'error', 'Error');
        setTimeout(_leercodigobarras_SAL97C11, 100);
    } else {
        datos_envio = datosEnvio() + SAL97C11.PACIW + "|";

        postData({
            datosh: datos_envio
        }, get_url("APP/SALUD/SER810-1.DLL"))
            .then((data) => {
                $_REG_PACI = data['REG-PACI'];
                SAL97C11.DESCRIPPACIW = $_REG_PACI[0].DESCRIP
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
                SAL97C11.TUTELAPACIW = $_REG_PACI[0].TUTELA;
                SAL97C11.ALTCOSPACIW = $_REG_PACI[0]["ALT-COS"];
                SAL97C11.PROGEPSPACIW = $_REG_PACI[0]["PROG-ESP"];
                SAL97C11.CRONICOPACIW = $_REG_PACI[0].CRONICO;
                SAL97C11.MULTICONSULPACIW = $_REG_PACI[0].MULTICONSUL;
                SAL97C11.MEDFAMIPACIW = $_REG_PACI[0]["MED-FAMI"];
                SAL97C11.EMBALTORIESGPACIW = $_REG_PACI[0]["EMB-ALTO - RIESG"];
                _consultacodigo_SAL97C11();

            })
            .catch((error) => {
                console.log(error)
                console.log('no encuentra');
                $_OPSEGU = "IS767";
                LLAMADO_DLL({
                    dato: [$_ADMINW, $_OPSEGU],
                    callback: _dataCON904S_04_SAL97C11,
                    nombredll: 'CON904S',
                    carpeta: 'CONTAB'
                });
            });
    }
}

function _consultacodigo_SAL97C11() {
    console.log('consultacodigopaciente');
    if (SAL97C11.NOVEDADW == '7') {
        if ($_NITUSU == '0822006883') {
            /// CONTINUE 
            _leerpaciente_SAL97C11();
            console.log('empresa 0822006883 ');
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
        // LLAMA AL PROGRAMA SER110C ---- ACTUALIZA MAESTRO PACIENTES
        console.debug('LLAMAR SER110C ---- ACTUALIZA MAESTRO PACIENTES ')
        _leerpaciente_SAL97C11();
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
            _leerpaciente_SAL97C11()

        } else {
            swinvalid = '00';
            console.debug('LLAMAR PROGRAMA SER11I --- ACTUALIZA MAESTRO DE PACIENTES SOLO MAGISTERIO')
            // LLAMA AL PROGRAMA SER11I --- ACTUALIZA MAESTRO DE PACIENTES SOLO MAGISTERIO 
            _leerpaciente_SAL97C11()
        }
    } else {
        if (swinvalid == "00") {
            console.debug('LLAMAR PROGRAMA  SER11G --- ACTUALIZA MAESTRO DE PACIENTES ')
            // LLAMA AL PROGRAMA SER11G --- ACTUALIZA MAESTRO DE PACIENTES 
            console.debug('00 swinvalid CON904S');
            _leerpaciente_SAL97C11()
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
            _leerpaciente_SAL97C11();
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
        console.debug('LLAMAR SER11G --- ACTUALIZA MAESTRO DE PACIENTES ')
        _leerpaciente_SAL97C11()
    }
}

function _leerpaciente_SAL97C11() {

    if (SAL97C11.PACIW == '000000000000000') {
        console.debug('se debe devolver a lector de cedula');
        SAL97C11.RESTAPLIPACIW = 'N'
    } else if ((SAL97C11.RESTAPLIPACIW == 'S') && (SAL97C11.NOVEDADW == '7')) {
        CON851('80', '80', null, 'error', 'Error');
        console.debug('se debe devolver a lector de cedula');
        _evaluarpaciente_SAL97C11();

    } else {
        console.log('los coloca en las cajas')
        $('#nombrepacid_97C11').val(SAL97C11.DESCRIPPACIW);
        $('#eps_97C11').val(SAL97C11.EPSPACIW);
        _calcularedad_SAL97C11();
        $('#edad_97C11').val($_EDADPACW);
        _validarpaciente_SAL97C11();
    }
}

function _validarpaciente_SAL97C11() {
    console.log('validarpaciente_sal97c11')
    SAL97C11.SW9 = '0'
    if (SAL97C11.SW9 == '0') {
        SAL97C11.SW9 = '1'
        ///// VENTANA 
        console.debug('LLAMA SER810B -MUESTRA MENSAJES SOBRE PACIENTES');
        get_mensajesPacientes_SER810B()
    } else if (($_NITUSU == '0844003225') && (SAL97C11.CIUDADPACIW != '85001') && (SAL97C11.PACIW > '000000000000000')) {
        console.log('validacion por nit')
        SAL97C11.DERECHOPACIW = '2';
        LLAMADO_DLL({
            dato: [SAL97C11.EPSPACIW],
            callback: _mostrarentidad_7C11,
            nombredll: 'SAL7767_08',
            carpeta: 'SALUD'
        });
    } else if (SAL97C11.EPSPACIW.trim() == '') {
        console.log('eps viene vacio ')
        SAL97C11.NOMBREENTW = '';
        $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
        _validarrestricionpac_SAL97C11();

    } else {
        console.log('validapaciente')
        LLAMADO_DLL({
            dato: [SAL97C11.EPSPACIW],
            callback: _mostrarentidadpaci_7C11,
            nombredll: 'SAL7767_08',
            carpeta: 'SALUD'
        });
    }
}

function _mostrarentidadpaci_7C11(data) {
    console.log(data, 'entidad')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    SAL97C11.NOMBREENTW = date[1];
    if (swinvalid == "00") {
        if (SAL97C11.NITFACTPACIW > '0') {
            console.log('envia a terceros')
            LLAMADO_DLL({
                dato: [SAL97C11.EPSPACIW],
                callback: _consultatercero_7C11,
                nombredll: 'SAL7767_11',
                carpeta: 'SALUD'
            });
        } else {
            $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
            _validarrestricionpac_SAL97C11();
        }

    } else if (swinvalid == "01") {
        console.log('noencuentra eps')
        SAL97C11.NOMBREENTW = '';
        SAL97C11.EPSPACIW = '';
        $('#eps_97C11').val(SAL97C11.EPSPACIW);
        $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
        _validarrestricionpac_SAL97C11();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _consultatercero_7C11(data) {
    console.log(data, 'terceros')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    SAL97C11.NOMBREENTIDADW = date[1];
    if (swinvalid == "00") {
        $('#epsd_97C11').val(SAL97C11.NOMBREENTIDADW);
        _validarrestricionpac_SAL97C11();
    } else if (swinvalid == "01") {
        console.log('no encuentra')
        // SAL97C11.NOMBREENTW = '';
        // $('#eps_97C11').val(SAL97C11.EPSPACIW);
        $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
        _validarrestricionpac_SAL97C11();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _mostrarentidad_7C11(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    SAL97C11.NOMBREENTW = date[1];
    if (swinvalid == "00") {
        $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
        _mostratfacturado_SAL97C11();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _mostratfacturado_SAL97C11();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _validarrestricionpac_SAL97C11() {
    console.log('validarrestricciones')
    if ((SAL97C11.EPSPACIW == 'EPS025') && (SAL97C11.RESTRICPACIW == '04')) {
        console.log('validarrestricciones 1')
        SAL97C11.NOMBREENTW = 'CAPRESOCA NO';
        $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
        $('#epsd_97C11').id;
        _mostratfacturado_SAL97C11();
    } else if (SAL97C11.TUTELAPACIW == 'S') {
        console.log('validarrestricciones 2')
        CON851('5B', '5B', null, 'error', 'Error');
        _mostratfacturado_SAL97C11();
        console.debug('TUTELAPACI')
    } else if (SAL97C11.ALTCOSPACIW == 'S') {
        console.log('validarrestricciones 3')
        CON851('5J', '5J', null, 'error', 'Error');
        _mostratfacturado_SAL97C11();
        console.debug('ALTO COSTO')
    } else if (SAL97C11.PROGEPSPACIW == 'S') {
        console.log('validarrestricciones 4')
        CON851('5Q', '5Q', null, 'error', 'Error');
        _mostratfacturado_SAL97C11();
        console.debug('PROGEPS')
    } else if (SAL97C11.CRONICOPACIW == 'S') {
        console.log('validarrestricciones 5')
        CON851('7A', '7A', null, 'error', 'Error');
        _mostratfacturado_SAL97C11();
        console.debug('CRONICO')
    } else if ($_NITUSU == '0845000038') {
        console.log('validarrestricciones 6')
        if (($_UNIDEDADW = 'A') && (($_VLREDADW = '45') || ($_VLREDADW = '50') || ($_VLREDADW = '55') || ($_VLREDADW = '60') || ($_VLREDADW = '65') || ($_VLREDADW = '70') || ($_VLREDADW = '75') || ($_VLREDADW = '80') || ($_VLREDADW = '85') || ($_VLREDADW = '90') || ($_VLREDADW = '95') || ($_VLREDADW = '100'))) {
            CON851('8T', '8T', null, 'error', 'Error');
            console.debug('CONDICION CON NIT 0845000038')
        } else {
            console.debug('otra validacion')
        }
    } else if (SAL97C11.MULTICONSULPACIW == 'S') {
        console.log('validarrestricciones 7')
        CON851('5V', '5V', null, 'error', 'Error');
        _mostratfacturado_SAL97C11();
        console.debug('MULTICONSULTA')

    } else if (SAL97C11.MEDFAMIPACIW > 0) {
        console.log(SAL97C11.MEDFAMIPACIW, 'eeeee')
        SAL97C11.MEDW = SAL97C11.MEDFAMIPACIW.padStart(10, "0");
        LLAMADO_DLL({
            dato: [SAL97C11.MEDFAMIPACIW],
            callback: _mostrarprofes_7C11,
            nombredll: 'SAL7C11_1',
            carpeta: 'SALUD'
        });
        // _mostratfacturado_SAL97C11();
    } else if (SAL97C11.EMBALTORIESGPACIW == 'S') {
        console.log('validarrestricciones 9')
        CON851('EH', 'EH', null, 'error', 'Error');
        console.debug('EMB ALT RIESGO')
        _mostratfacturado_SAL97C11();
    } else {
        console.log('validarrestricciones 10')
        _mostratfacturado_SAL97C11()
    }
    ////CALL CON880RV MUESTRA LOS RECORDATORIOS POR USUARIO ARCH
    // get_Recordatorios_CON880RV(foco, callback)
    // console.log("Aqui buscaria el recordatorio")
}

function _mostrarprofes_7C11(data) {
    console.log(data, 'profes')
    var date = data.split('|');
    var swinvalid = date[0];
    SAL97C11['DESCRIPMEDIF'] = date[1];
    if (swinvalid == "00") {
        $('#medfac_97C11').val(SAL97C11.DESCRIPMEDIF);
        _mostratfacturado_SAL97C11();
    } else if (swinvalid == "01") {
        _mostratfacturado_SAL97C11();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _mostratfacturado_SAL97C11() {
    console.log('mostrarfacturado')
    if (SAL97C11.NOVEDADW == '7') {
        if ((SAL97C11.DERECHOPACIW == '2') || (SAL97C11.DERECHOPACIW == '4') || (SAL97C11.DERECHOPACIW == '7') || (SAL97C11.DERECHOPACIW == '8') || (SAL97C11.DERECHOPACIW == 'A')) {
            CON851('80', '80', null, 'error', 'Error');
            if (($_NITUSU == '0891855847') || ($_NITUSU == '0800037979') || ($_NITUSU == '0800162035') || ($_NITUSU == '0900405505') || ($_NITUSU == '0822002688')) {
                SAL97C11.NROCEDW = '';
                _evaluarpaciente_SAL97C11();
            } else {
                _evaluarpaciente_SAL97C11();
            }
        } else if (SAL97C11.DERECHOPACIW == '5') {
            CON851('2N', '2N', null, 'error', 'Error');
            SAL97C11.NROCEDW = '';
            _evaluarpaciente_SAL97C11();
        } else if (SAL97C11.DERECHOPACIW == '6') {
            CON851('2T', '2T', null, 'error', 'Error');
        }

        if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) {
            console.log('llama opc SER835B')
            // CONSULTA DE CITAS POR PACIENTE        
        } else if (SAL97C11.PACIW != '000000000000000') {
            console.log('primero')
            $_CLFACT = '9';
            let URL = get_url("APP/SALUD/SER835.DLL");
            postData({
                datosh: datosEnvio() + SAL97C11.PACIW + "|" + $_CLFACT + '|' + $_NITUSU
            }, URL)
                .then(data => {
                    // _cargandodatos('off');
                    console.log(data, 'COMPROBANTES')
                    $_SER835 = data.FACTURAS;
                    _ventanaSER835_7C11();
                })
                .catch(error => {
                    console.log(error);
                    consulta_ser836();
                });
        } else {
            console.log('segundo')
            $_CLFACT = '9';
            let URL = get_url("APP/SALUD/SER835.DLL");
            postData({
                datosh: datosEnvio() + SAL97C11.PACIW + "|" + $_CLFACT + '|' + $_NITUSU
            }, URL)
                .then(data => {
                    // _cargandodatos('off');
                    console.log(data, 'COMPROBANTES')
                    $_SER835 = data.FACTURAS;
                    _ventanaSER835_7C11();
                })
                .catch(error => {
                    console.log(error);
                    consulta_ser836();
                });
        }
    }
}

function _ventanaSER835_7C11() {
    console.log("VENTANA", $_SER835)
    // if ($_SER835['FECHA_IESTAD'].trim().length > 0) {
    _ventanaDatos({
        titulo: SAL97C11.DESCRIPPACIW,
        columnas: ["FECHA_IESTAD", "CTA_FACT", "ART_FACT", "DETALLE_FACT", "MEDIC_FACT", "COPAGO_FACT"],
        data: $_SER835,
        callback_esc: () => {
            CON851P('04', consulta_ser836, consulta_ser836);
            SAL97C11.REFFACTW = '';
        },
        callback: data => {
            SAL97C11.REFFACTW = data.ART_FACT.trim();
            console.log(data);
            CON851P('04', consulta_ser836, consulta_ser836);
        }
    });
    // } else {
    // _datounidad_7C11();
    // consulta_ser836();
    // }
}


function consulta_ser836() {
    console.log('consulta_ser836')
    var $_FECHAACT = moment().format('YYMMDD');
    $_ANOFECHAACT = $_FECHAACT.substring(0, 2);
    let datos_envio = datosEnvio();
    datos_envio += $_ADMINW + '|' + SAL97C11.PACIW + "|" + $_FECHAACTUAL + "|" + $_ANOFECHAACT
    SolicitarDll({
        datosh: datos_envio
    }, _dataSER836_04, get_url("APP/SALUD/SER836.DLL"));
}

function _dataSER836_04(data) {
    console.log(data);
    var data = data.split('|');
    if (data[0].trim() == '00') {
        let rutaJson = get_url('temp/' + data[1].trim());
        let json = data[1].trim();
        SolicitarDatos(
            null,
            function (data) {
                $_SER836 = data.CITAS;
                console.log($_SER836, '$_SER836')
                let arrayEliminar = [];
                arrayEliminar.push(json);
                _eliminarJson(arrayEliminar, on_eliminarJsonSER836_7C11);
                _consultarSER836T_SAL97C11();
            },
            rutaJson
        );
    } else if (data[0].trim() == '01') {
        _datounidad_7C11();
        console.log('no encuentra citas')
        _consultarSER836T_SAL97C11();
        // consulta_ser836T();
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function _consultarSER836T_SAL97C11() {
    let URL = get_url("APP/SALUD/SER836T.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(data => {
            console.debug(data);
            SAL97C11.CITASMEDICAS = data.CITASMED;
        })
        .catch(err => {
            console.debug(err);
            SAL97C11.CITASMEDICAS = '';
        })
}

function on_eliminarJsonSER836_7C11(data) {
    var data = data.split('|');
    if (data[0].trim() == '00') {
        console.debug('json elminado');
        _ventanaSER836_7C11();
    } else {
        console.error(res[1], 'error json');
        jAlert({
            titulo: 'Error ',
            mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>'
        }, _toggleNav);
    }
}

function _ventanaSER836_7C11() {
    _ventanaDatos({
        titulo: SAL97C11.DESCRIPPACIW,
        columnas: ["LLAVE_CIT", "HORA_CIT", "MED_CIT", "DESCRIP_TER", "OBSER_CIT", "COMPROB_CIT", "FINALID_CIT"],
        data: $_SER836,
        callback_esc: function () {
            CON851P('04', _datounidad_7C11, _datounidad_7C11);
        },
        callback: function (data) {
            console.log(data)
            CON851P('04', _datounidad_7C11, _datounidad_7C11);
        }
    });
}

// function consulta_ser836T(){

//     //TRAE LA ULTIMAS CITAS CON MEDICO GENERAL Y ESPECIALISTA
//     if (SAL97C11.PACIW != '000000000000000') {
//     console.log('llama opc SER836T')
//     var $_FECHAACT = moment().format('YYMMDD');
//     console.log( $_FECHAACT)
//     let datos_envio = datosEnvio();
//     datos_envio += $_ADMINW + '|' + SAL97C11.PACIW + "|" + $_FECHAACT
//     SolicitarDll({ datosh: datos_envio }, _dataSER836T_01, get_url("APP/SALUD/SER836T.DLL"));
//     }else{
//         _datounidad_7C11();
//     }
// }

// function _dataSER836T_01(data){
//     console.log(data);
//     var data = data.split('|');
//     if (data[0].trim() == '00') {
//         let rutaJson = get_url('temp/' + data[1].trim());
//         let json = data[1].trim();
//         SolicitarDatos(
//             null,
//             function (data) {
//                 $_SER836T = data.CITASESP;
//                 console.log($_SER836T, '$_SER836T')
//                 let arrayEliminar = [];
//                 arrayEliminar.push(json);
//                 _eliminarJson(arrayEliminar, on_eliminarJsonSER836T_7C11)
//             },
//             rutaJson
//         );
//     } else if (data[0].trim() == '01') {
//         _datounidad_7C11(); 
//     } else {
//         CON852(data[0], data[1], data[2], _toggleNav);
//     }
// }

// function on_eliminarJsonSER836T_7C11(data) {
//     var data = data.split('|');
//     if (data[0].trim() == '00') {
//         console.debug('json elminado');
//         _datounidad_7C11(); 
//     } else {
//         console.error(res[1], 'error json');
//         jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
//     }
// }
// function _ventanaSER836T_7C11() {
//     _ventanaDatos({
//         titulo: SAL97C11.DESCRIPPACIW,
//         columnas: ["MEDICO", "FECHA_CIT", "HORA_CIT", "ESTADO_CIT"],
//         data: $_SER836T,
//         callback_esc: function () {
//             CON851P('04', _datounidad_7C11, _datounidad_7C11);
//         },
//         callback: function (data) {
//             console.log(data)
//             CON851P('04', _datounidad_7C11, _datounidad_7C11);
//         }
//     });
// }

function _datounidad_7C11() {
    console.log('datounidadservicio')
    let datos_envio = datosEnvio()
    datos_envio += $_ADMINW
    let URL = get_url("APP/SALUD/SER873.DLL");
    postData({
        datosh: datos_envio
    }, URL)
        .then(function (data) {
            console.debug(data);
            SAL97C11.UNSERV = data.UNSERV;
            console.debug(SAL97C11.UNSERV);
            _Unidadserv_7C11();
        })
        .catch(err => {
            console.debug(err);
        })
}

function _Unidadserv_7C11() {
    console.log('unidadserv_7c11')
    $_UNIDSERVICIO_401 = [];
    for (var i in SAL97C11.UNSERV) {
        if (SAL97C11.UNSERV[i].ESTADO.trim() == '') {
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
    console.log('evaluarmedico')
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

    SAL97C11['MEDW'] = $('#medico_97C11').val();
    SAL97C11.MEDW = SAL97C11.MEDW.padStart(10, "0");
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
    var date = data.split('|');
    var swinvalid = date[0].trim();
    SAL97C11['DESCRIPMEDW'] = date[1].trim();
    if (swinvalid == "00") {
        $('#medicod_97C11').val(SAL97C11.DESCRIPMEDW);
        LLAMADO_DLL({
            dato: [SAL97C11.MEDW],
            callback: _mostrarprofesionales_7C11,
            nombredll: 'SAL7C11_1',
            carpeta: 'SALUD'
        });
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarmedico_7C11();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _mostrarprofesionales_7C11(data) {
    console.log(data, 'PROFESIONALES')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    SAL97C11['DESCRIPMEDW'] = date[1].trim();
    SAL97C11['ATIENDEPROF'] = date[2].trim();
    SAL97C11['SOBREAGEPROF'] = date[3].trim();
    SAL97C11['ESTADOPROF'] = date[4].trim();
    SAL97C11['OPERAUTPROF'] = date[5].trim();
    SAL97C11['OPERAUTCIRUPROF'] = date[6].trim();
    SAL97C11['OPERAUTOTROPROF'] = date[7].trim();
    SAL97C11['OPERAUT4PROF'] = date[8].trim();
    SAL97C11['OPERAUT5PROF'] = date[9].trim();
    SAL97C11['FORMAAGEPROF'] = date[10].trim();
    SAL97C11.ESPPROF1 = date[11].trim();
    SAL97C11.ESPPROF2 = date[12].trim();
    SAL97C11.ESPPROF3 = date[13].trim();
    SAL97C11.ESPPROF4 = date[14].trim();
    SAL97C11.ESPPROF5 = date[15].trim();
    if (swinvalid == "00") {
        SAL97C11['ATIENDEPROFEDIT2'] = SAL97C11.ATIENDEPROF;
        _validacionesmedico();
    } else if (swinvalid == "01") {
        CON851('9X', '9X', null, 'error', 'error');
        _evaluarmedico_7C11();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _validacionesmedico() {
    console.log('validacionmedico')
    if (SAL97C11.SOBREAGEPROF != 'S') {
        SAL97C11.SOBREAGEPROF = 'N';
        _validarautoprof()
    } else if ($_NITUSU == '0800037021') {
        SAL97C11.SOBREAGEPROF = 'N';
        _validarautoprof()
    } else if (SAL97C11.ESTADOPROF == '2') {
        CON851('13', '13', null, 'error', 'error');
        if (SAL97C11.NOVEDADW == '7') {
            _evaluarmedico_7C11()
        } else {
            _revisartablahorarios_7C11();
        }
    } else {
        _validarautoprof()
    }
}
function _validarautoprof() {
    console.log('validarautoprof')
    if (SAL97C11.OPERAUTPROF.trim().length == 0) {
        SAL97C11.OPERAUTPROF = '****';
        _revisartablahorarios_7C11();
    } else if (SAL97C11.OPERAUTCIRUPROF.trim().length == 0) {
        SAL97C11.OPERAUTCIRUPROF = '****';
        _revisartablahorarios_7C11();
    } else if (SAL97C11.OPERAUTOTROPROF.trim().length == 0) {
        SAL97C11.OPERAUTOTROPROF = '****';
        _revisartablahorarios_7C11();
    } else if (SAL97C11.OPERAUT4PROF.trim().length == 0) {
        SAL97C11.OPERAUT4PROF = '****';
        _revisartablahorarios_7C11();
    } else if (SAL97C11.OPERAUT5PROF.trim().length == 0) {
        SAL97C11.OPERAUT5PROF = '****';
        _revisartablahorarios_7C11();
    } else {
        _revisartablahorarios_7C11();
    }
}

function _revisartablahorarios_7C11() {
    console.log('revisartablahorario')
    _datoclase_7C11();
    // if (SAL97C11.FORMAAGEPROF == 'S') {
    //     // CALL "SER819H" USING MED-W FECHA-W
    //     if ($_MESW == '0') {
    //         _evaluarmedico_7C11();
    //     }
    // } else {
    //     // SAL97C11['HRINI1P']
    //     // SAL97C11['SALHRINI2P']

    //     // if ((SAL97C11.HRINI1P(1) == '0') && (SAL97C11.SALHRINI2P(1) == '0') &&
    //     //     (SAL97C11.HRINI1P(2) == '0') && (SAL97C11.SALHRINI2P(2) == '0') &&
    //     //     (SAL97C11.HRINI1P(3) == '0') && (SAL97C11.SALHRINI2P(3) == '0') &&
    //     //     (SAL97C11.HRINI1P(4) == '0') && (SAL97C11.SALHRINI2P(4) == '0') &&
    //     //     (SAL97C11.HRINI1P(5) == '0') && (SAL97C11.SALHRINI2P(5) == '0') &&
    //     //     (SAL97C11.HRINI1P(6) == '0') && (SAL97C11.SALHRINI2P(6) == '0') &&
    //     //     (SAL97C11.HRINI1P(7) == '0') && (SAL97C11.SALHRINI2P(7) == '0')) {

    //     // } else {

    //     // }
    //     asignarclase_7C11()
    // }
}

function asignarclase_7C11() {
    SAL97C11['TIPOFACTW']
    switch ($_NITUSU) {
        case "0830092718":
        case "0830092719":
            SAL97C11.TIPOFACTW = '3';
            _mostrarclase_7C11();
            break;
        default:
            if ($.isNumeric(SAL97C11.TIPOFACTW)) {
                switch ($_NITUSU) {
                    case "800156469":
                        SAL97C11.TIPOFACTW = '3';
                        _datoclase_7C11();
                        break;
                    default:
                        SAL97C11.TIPOFACTW = '5';
                        _datoclase_7C11();
                        break;
                }
            } else {
                _datoclase_7C11();
            }
            break;
    }
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
        () => { _datomedico_7C11() },
        () => {
            SAL97C11.TIPOFACTW = claseMask_SAL7C11.value;
            if ((SAL97C11.UNSERVW == '08') && (SAL97C11.TIPOFACTW == '5')) {
                CON851('03', '03', null, 'error', 'Error');
                _evaluardatoclase_SAL7C11();
            } else if ((($_ADMINW == 'ADMI') || ($_ADMINW == 'GEBC')) || ((SAL97C11.NOVEDADW == '8') && (parseInt(SAL97C11.PACIW) < 100) && ($.isNumeric(SAL97C11.PACIW)))) {
                _validardatoclase2_SAL7C11();
            } else {
                if (SAL97C11.TIPOFACTW != '1') {
                    if ((SAL97C11.OPERAUTPROF == '****') || (SAL97C11.OPERAUTPROF == $_ADMINW) || (SAL97C11.OPERAUTCIRUPROF == $_ADMINW) || (SAL97C11.OPERAUTOTROPROF == $_ADMINW) || (SAL97C11.OPERAUT4PROF == $_ADMINW) || (SAL97C11.OPERAUT5PROF == $_ADMINW)) {
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
        console.debug('HC878');
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
        case "2":
            $('#clase_97C11').val('2 IMAGENOLOGIA');
            _datocups_7C11();
            break;
        case "3":
            $('#clase_97C11').val('3 OTROS PROCESOS');
            _datocups_7C11();
            break;
        case "4":
            $('#clase_97C11').val('4 CONSULTAS');
            _datocups_7C11();
            break;
        case "5":
            $('#clase_97C11').val('5 P & P');
            _datocups_7C11();
            break;
        case "7":
            $('#clase_97C11').val(' 7CITA DOBLE');
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
            SAL97C11.DURACIONCUP = data.CONSULTA[0].OCULTARCUP;
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
            if ((parseInt(SAL97C11.CONTRATOW) == 0) || (SAL97C11.CONTRATOW.trim() == '')) {
                SAL97C11.NITCNCAP = '0'
                SAL97C11.CONVENIOCNCAP = 'SO'
                SAL97C11.ESTADOCNCAP = '';
                SAL97C11.DESCRIPTAR = 'SOAT 2423';
                _datosolicitud_SAL97C11();
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
                            _datosolicitud_SAL97C11();
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
        // console.debug('display calendario');
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
    _fecharequeridaMask_SAL97C11();
    fecharequeridaMask.typedValue = SAL97C11.$_FECHAACT
    validarInputs(
        {
            form: "#FECHAREQUERIDA_SAL97C11",
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
        postData({ datosh: datosEnvio() + SAL97C11.PACIW + '|' + fechaw + '|' + SAL97C11.MEDW.padStart(10,'0') + '|' + fechaw.substring(2,4) }, URL)
            .then(data => {
                console.debug(data)
                if(data.CITASMED[0].trim() == ''){
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
        console.debug('falta');
    } if (($_NITUSU != '830092718') && ($_NITUSU != '0830092719') && ($_NITUSU != '0800156469')) {
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
    SAL97C11.LLAVEW = $_USUA_GLOBAL[0].PREFIJ + fechaw + SAL97C11.PACIW + SAL97C11.TIPOFACTW + SAL97C11.CUPSW.padEnd(12, ' ');
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datosEnvio() + '7|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw + '|' + SAL97C11.LLAVEW }, URL)
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
    let horax = moment().format('LT').substring(0,2);
    horaMask_SAL97C11.typedValue = horax;
    if ((($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) && ((SAL97C11.CUPSW == '876801') || (SAL97C11.CUPSW == '0876802'))){
        _ventanamamografia_SAL97C11();
    } else {
        _evaluarhora_SAL97C11();
    }
}

function _evaluarhora_SAL97C11(){
    validarInputs(
        {
            form: "#HORA_97C11",
            orden: "1"
        },
        () => { _datomedico_7C11() },
        () => {
            SAL97C11.HORAW = horaMask_SAL97C11.value;
            if ((SAL97C11.NOVEDADW == '7') && (SAL97C11.FECHAW == SAL97C11.FECHAACT)){
                if (parseInt(SAL97C11.HORAW) < parseInt(SAL97C11.HORAACT)){
                    CON851('9Q','9Q',null,'error','Error');
                    if ($_NITUSU == '0900306771'){
                        _buscarcita_SAL97C11();
                    } else{
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

function _buscarcita_SAL97C11(){
    let fechaw = moment(SAL97C11.FECHAW).format('YYYYMMDD');
    let horaw = SAL97C11.HORAW.replace(':','');
    SAL97C11.LLAVEALTW = SAL97C11.MEDW + fechaw + horaw;
    console.debug(SAL97C11.LLAVEALTW);
    let URL = get_url("APP/SALUD/SAL97C11.DLL");
    postData({ datosh: datosEnvio() + '8|' + SAL97C11.CUPSW + '|' + SAL97C11.CONTRATOW + '|' + SAL97C11.NITFACTPACIW + '|' + SAL97C11.TIPOFACTW + '|' + SAL97C11.SALMINUSU + '|' + SAL97C11.MEDW + '|' + SAL97C11.EPSPACIW + '|' + fechaw + '|' + SAL97C11.LLAVEW + '|' + SAL97C11.LLAVEALTW  }, URL)
        .then(data => {
            console.debug(data)
           
        })
        .catch(err => {
            console.debug(err);
            
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