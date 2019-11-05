var $_CODLINK, $_CEDLNK, $_RHLNK, $_NITW, $_REGBASE09, $_EMBALTOPACIW, $_TIPOIDLNK, $_DESCRIPCEDLNK,
    $_SEXOLNK, $_FECHANACLNK, $_HEMOCLASLNK, EPSPACI, $_NITENT, $_ENTIFACTPACIW, $_NITFACTPACIW,
    $_TUTELAPACIW = '', $_PADREPACIW = '', $_MADREPACIW = '', $_PAISPACIW = '', $_FECHADEMPACIW = '', $_DEMANINDPACIW = '',
    $_CERTESTUDPACIW = '', $_PERIESTUDPACIW = '', $_ULTMAMOPACIW = '', $_CERTECONOPACIW = '', $_PERIECOPACIW = ''
$_CIUDASEGPACIW = '50689', $_PARENTPACIW = '', $_COMUNIPACW = '', $_RESGUARPACIW = '', $_FICHAPACIW = '', $_CARNETPACIW = '',
    $_EMPRESAPACIW = '', $_FECHANITPACIW = '', $_OBSERVPACIW = '', $_ANTCANCERPACIW = '';

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


    _toggleF8([
        { input: 'numero', app: '110c', funct: _ventanamaestropacientes_SAL7767 },
        { input: 'ciudad', app: '110c', funct: _ventanaciudad_SAL7767 },
        { input: 'pais', app: '110c', funct: _ventanapais_SAL7767 },
        { input: 'ocupacion', app: '110c', funct: _ventanaocupaciones_SAL7767 },
        { input: 'colegio', app: '110c', funct: _ventanacolegios_SAL7767 },
        { input: 'eps', app: '110c', funct: _ventanaentidades_SAL7767 },
        { input: 'cotizante', app: '110c', funct: _ventanamaestrodospaci_SAL7767 },
        { input: 'patologiacronica', app: '110c', funct: _ventanapatologias_SAL7767 },
        { input: 'clasif', app: '110c', funct: _ventanaclasificacion_SAL7767 },
        { input: 'entidad', app: '110c', funct: _ventanaterceros_SAL7767 },
        { input: 'medicofam', app: '110c', funct: _ventanaprofesionales_SAL7767 }

    ]);
    _buscarrestriccion_7767();

});

//////// VENTANAS F8////////////////////////


function _ventanamaestropacientes_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite({
            titulo: 'BUSQUEDA DE PACIENTES',
            db: $CONTROL,
            tablaSql: 'sc_pacie',
            indice: ['cod_paci', 'descrip_paci', 'nacim_paci', 'eps_paci'],
            mascara: [
                {
                    // tipo_id_paci: 'hide',
                    cod_paci: 'cedula'
                }
            ],
            minLength: 1,
            callback_esc: function () {
                $('#numero_110c').focus();
            },
            callback: function (data) {

                $('#numero_110c').val(data.cod_paci.trim());
                _enterInput('#numero_110c');

            }
        });
    }
}

function _ventanaciudad_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA CIUDADES',
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_archciud',
            callback_esc: function () {
                $("#ciudad_110c").focus();
            },
            callback: function (data) {

                $('#ciudad_110c').val(data.cuenta.trim());
                $('#ciudadd_110c').val(data.nombre.trim());
                _enterInput('#ciudad_110c');
            }
        });
    }
}

function _ventanapais_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA PAIS RIPS',
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_pairip',
            callback_esc: function () {
                $("#pais_110c").focus();
            },
            callback: function (data) {

                $('#pais_110c').val(data.cod_pair.trim());
                $('#paisd_110c').val(data.descrip_pair.trim());
                _enterInput('#pais_110c');
            }
        });
    }
}

function _ventanaocupaciones_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA CIUDADES',
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_archocu',
            callback_esc: function () {
                $("#ocupacion_110c").focus();
            },
            callback: function (data) {

                $('#ocupacion_110c').val(data.cod_ocu.trim());
                $('#ocupaciond_110c').val(data.nombre_ocu.trim());
                _enterInput('#ocupacion_110c');
            }
        });
    }
}

function _ventanacolegios_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE INSTITUCIONES',
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_coleg',
            callback_esc: function () {
                $("#colegio_110c").focus();
            },
            callback: function (data) {
                $_TIPO_COLEG = data.tipo_coleg.trim();
                $_COD_COLEG = data.cod_coleg.trim();

                $('#colegio_110c').val($_TIPO_COLEG + $_COD_COLEG);
                $('#colegiod_110c').val(data.descrip_coleg.trim());
                _enterInput('#colegio_110c');
            }
        });
    }
}

function _ventanaentidades_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE ENTIDADES',
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_archent',
            callback_esc: function () {
                $("#eps_110c").focus();
            },
            callback: function (data) {
                $('#eps_110c').val(data.cod_ent.trim());
                $('#epsd_110c').val(data.nombre_ent.trim());
                _enterInput('#eps_110c');
            }
        });
    }
}

function _ventanamaestrodospaci_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite({
            titulo: 'BUSQUEDA DE PACIENTES',
            db: $CONTROL,
            tablaSql: 'sc_pacie',
            indice: ['cod_paci', 'descrip_paci', 'nacim_paci', 'eps_paci'],
            mascara: [
                {
                    // tipo_id_paci: 'hide',
                    cod_paci: 'cedula'
                }
            ],
            minLength: 1,
            callback_esc: function () {
                $('#cotizante_110c').focus();
            },
            callback: function (data) {

                $('#cotizante_110c').val(data.cod_paci.trim());
                $('#cotizanted_110c').val(data.descrip_paci.trim());
                _enterInput('#cotizante_110c');

            }
        });
    }
}

function _ventanapatologias_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE PATOLOGIAS CRONICAS',
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_croni',
            callback_esc: function () {
                $("#patologiacronica_110c").focus();
            },
            callback: function (data) {
                $('#patologiacronica_110c').val(data.llave_cronic.trim());
                _enterInput('#patologiacronica_110c');
            }
        });
    }
}

function _ventanaclasificacion_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE CLASIFICACION PACI',
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_clasipaci',
            callback_esc: function () {
                $("#clasif_110c").focus();
            },
            callback: function (data) {
                $('#clasif_110c').val(data.cod_clasp.trim());
                $('#clasifd_110c').val(data.descrip_clasp.trim());
                _enterInput('#clasif_110c');
            }
        });
    }
}

function _ventanaterceros_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE TERCEROS',
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_archter',
            callback_esc: function () {
                $("#entidad_110c").focus();
            },
            callback: function (data) {
                $('#entidad_110c').val(data.cod_ter);
                $('#entidadd_110c').val(data.descrip_ter.trim());
                _enterInput('#entidad_110c');
            }
        });
    }
}

function _ventanaprofesionales_SAL7767(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'VENTANA DE PROFESIONALES',
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_archprof',
            callback_esc: function () {
                $("#medicofam_110c").focus();
            },
            callback: function (data) {
                $('#medicofam_110c').val(data.cod_prof);
                $('#medicofamd_110c').val(data.descrip_prof.trim());
                _enterInput('#medicofam_110c');
            }
        });
    }
}


///////////////////////// MASCARAS ///////////////////////////


var momentFormat = 'YYYY/MM/DD HH:mm';

var momentMask = IMask($("#nacimiento_110c")[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(1920, 0, 1),
    max: new Date(2020, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1920,
            to: 2020
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

var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);

var momentFormatdos = 'YYYY/MM/DD HH:mm';
var momentMaskfechaafil = IMask($("#fechaafil_110c")[0], {
    mask: Date,
    pattern: momentFormatdos,
    lazy: true,
    min: new Date(1890, 0, 1),
    max: new Date(2019, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormatdos);
    },
    parse: function (str) {
        return moment(str, momentFormatdos);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1890,
            to: 2019
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

var momentFormattres = 'YYYY/MM/DD HH:mm';
var momentMaskfechavence = IMask($("#fechavence_110c")[0], {
    mask: Date,
    pattern: momentFormattres,
    lazy: true,
    min: new Date(1890, 0, 1),
    max: new Date(2030, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormattres);
    },
    parse: function (str) {
        return moment(str, momentFormattres);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1890,
            to: 2030
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

var momentMaskcertestudio = IMask($("#fechamatr_110c")[0], {
    mask: Date,
    pattern: momentFormattres,
    lazy: true,
    min: new Date(1890, 0),
    max: new Date(2030, 0),

    format: function (date) {
        return moment(date).format(momentFormattres);
    },
    parse: function (str) {
        return moment(str, momentFormattres);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1890,
            to: 2030
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

var momentMaskcertecno = IMask($("#fechaecono_110c")[0], {
    mask: Date,
    pattern: momentFormattres,
    lazy: true,
    min: new Date(1890, 0),
    max: new Date(2030, 0),

    format: function (date) {
        return moment(date).format(momentFormattres);
    },
    parse: function (str) {
        return moment(str, momentFormattres);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1890,
            to: 2030
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

///////////////////////// SAL7767///////////////////////////
function _buscarrestriccion_7767() {

    $_OPSEGU = "IS767";
    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904_01,
        nombredll: 'CON904',
        carpeta: 'CONTAB'
    });
}
function _dataCON904_01(data) {
    // console.debug(data, "CON904-01");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {

        _comenzar_7767();
    }
    else {
        CON851('15', '15', null, 'error', 'error');
        _toogleNav();
    }
}
function _comenzar_7767() {

    $_OPCION1 = '00';
    $_SW9 = "0";
    $_NITW = "   ";
    $_NIT1W = $_NITW.substring(0, 5);
    $_NIT2W = $_NITW.substring(5, 20);

    if ($.isNumeric($_CEDLNK)) {

        $_NIT1W = "00000",
            $_CEDLNK = NIT2W;

        if (($_RHLNK == "+") || ($_RHLNK == "-")) {

            // PENDIENTE EL EMAIL PARA LOS NIT IF (NIT-USU = 830092718 OR 830092719 OR 900193162)
            //  DISPLAY "Email:       "      LINE 11 POSITION 02
            //  END-IF.
            _validacionnovedad_7767();
        } else {

            $_RHLNK = ''; //MUEVO SPACES A LA VARIABLE  

        }
    } else {
        _validacionnovedad_7767();
    }
}

function _validacionnovedad_7767() {

    if ($_NITW.trim() == "") {

        $_NOVEDAD7767 = 8;
        CON850(_dato_novedad_7767);
    }
    else {
        $_NITW = $_CODPACIW;
        LLAMADO_DLL({
            dato: [$_CODPACIW],
            callback: _dataSAL7767_01,
            nombredll: 'SAL7767_01',
            carpeta: 'SALUD'
        });
    }
}
function _dataSAL7767_01(data) {

    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        $_NOVEDAD7767 = 8;
        _mostrardatos_7767();
    }
    else if (swinvalid == "01") {
        $_NOVEDAD7767 = 7;
        _mostrarnovedad_7767();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _dato_novedad_7767(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    $_SWCAMBIOW = "0";
    $_NOVEDAD7767 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _infosal7767();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedad_110c').val(novedad.id + ' - ' + novedad.descripcion)
}

function _infosal7767() {
    if ($_NOVEDAD7767 == 9) {
        $_OPSEGU = "IS7679"
        LLAMADO_DLL({
            dato: [$_ADMINW, $_OPSEGU],
            callback: _dataCON904_02,
            nombredll: 'CON904',
            carpeta: 'CONTAB'
        });
    } else {
        _permisonovedad_7767();
    }
}

function _dataCON904_02(data) {
    // console.debug(data, "CON904-02");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _permisonovedad_7767();

    }
    else {
        CON851('01', '01', null, 'error', 'error');
        CON850(_dato_novedad_7767);
        // _dato_novedad_7767()
    }
}

function _permisonovedad_7767() {
    $_OPSEGU = "IS767" + $_NOVEDAD7767;

    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904_03,
        nombredll: 'CON904',
        carpeta: 'CONTAB'
    });
}
function _dataCON904_03(data) {
    // console.debug(data, "CON904-03");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _dato3_7767();

    }
    else {
        CON851('01', '01', null, 'error', 'error');
        CON850(_dato_novedad_7767);
    }
}

function _dato3_7767() {
    $_REGBASE09 = "                    ";
    $_CODBASE09 = $_REGBASE09.substring(0, 15);
    $_TIPOIDBASE09 = $_REGBASE09.substring(15, 18);
    $_DESCRIPBASE09 = $_REGBASE09.substring(18, 72);
    $_DATOSBASE09 = $_REGBASE09.substring(72, 752);

    if (($_SW9 == "0") && ($_NITW.trim() != "") && ($_NITW != "000000000000000")) {
        $_SW9 = "1";
        $_CODPACIW = $_NITW;
        _editarpaci_7767();

    } else if (($_SWCAMBIOW == "0") && ($_NITUSU == "0845000038")) {
        $_CODPACIW.trim() = ' ';
        $_SWCAMBIOW = "1";
        // _editarpaci();
    }
    else {

        _evaluarpaciente_7767();
    }
}

function _evaluarpaciente_7767() {

    validarInputs({
        form: '#NUMERO_110C',
        orden: "1"
    },
        function () { CON850(_dato_novedad_7767); },
        _editarpaci_7767
    )
}

function _editarpaci_7767() {

    $_CODPACIW = $('#numero_110c').val();

    // $_TABLACOD1 = $_CODPACIW,
    // SE ENVIA A ESTA FUNCION 
    // editarcod(); 
    // $_CODPACIW = $_TABLACOD2;

    if ($_CODPACIW == "000000000000000") {

        _dato3_7767();
    } else {

        LLAMADO_DLL({
            dato: [$_CODPACIW],
            callback: _dataSAL7767_02,
            nombredll: 'SAL7767_02',
            carpeta: 'SALUD'
        });
    }
}

function _dataSAL7767_02(data) {

    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (($_NOVEDAD7767 == '7') && (swinvalid == '01')) {

        _nuevoregistro_7767();
    }
    else if (($_NOVEDAD7767 == '7') && (swinvalid == '00')) {

        if ($_NITW > "000000000000000") {
            $_NOVEDAD7767 = '8';
            $('#novedad_110c').val($_NOVEDAD7767);

            setTimeout(function () { CON850(_dato_novedad_7767) }, 100)
            _cambioregistro_7767();
        }
        else {
            setTimeout(_consultademostrarinf_7767, 100);
            _error_7767();
        }
    }
    else if (($_NOVEDAD7767 == '8') && (swinvalid == '00')) {

        setTimeout(_consultademostrarinf_7767, 100);
        _dato4_7767();

    }
    else if (($_NOVEDAD7767 == '8') && (swinvalid == '01')) {
        _error_7767();
    }
    else if (($_NOVEDAD7767 == '9') && (swinvalid == '01')) {
        _error_7767();
    }
    else if (($_NOVEDAD7767 == '9') && (swinvalid == '00')) {
        setTimeout(_retirar, 100);
    }

}
function _error_7767() {

    if ($_NOVEDAD7767 == '7') {
        CON851('00', '00', null, 'error', 'Error');

        setTimeout(function () { CON850(_dato_novedad_7767) }, 100)

    } else if (($_NOVEDAD7767 == '8') || ($_NOVEDAD7767 == '9')) {
        CON851('01', '01', null, 'error', 'Error');
        setTimeout(function () { CON850(_dato_novedad_7767) }, 100)
        // setTimeout(_dato_novedad_7767, 100);
    }
}

function _nuevoregistro_7767() {

    if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {

        // MOSTRAR CAJA DE CORREO 
        validacionesregistro_7767();
    } else {

        // MOSTRAR CAJA DE PADRE
        validacionesregistro_7767();
    }

}

function validacionesregistro_7767() {

    $_TIPOPACIW = '';
    $_DECRIPPACIW = '';
    $_APELLIDO1PACW = $_DECRIPPACIW.substring(0, 15);
    $_APELLIDO2PACW = $_DECRIPPACIW.substring(15, 30);
    $_NOMBRE1PACW = $_DECRIPPACIW.substring(30, 42);
    $_NOMBRE2PACW = $_DECRIPPACIW.substring(42, 54);
    // INITIALIZE
    if ($_CODPACIW.trim() == '') {
        CON851('03', '03', null, 'error', 'error');

        CON850(_dato_novedad_7767);
    } else if ($.isNumeric($_CEDLNK)) {
        _calcularedad_7767();
        if ($_UNIDEDADW == "A") {
            if ($_VLREDADW > 017) {
                $_TIPOPACIW = "CC";
            } else {
                $_TIPOPACIW = "TI"
            }
            $_DECRIPPACIW = $_DESCRIPCEDLNK;
            PERAPELLNK = $_DESCRIPCEDLNK.substring(0, 15);
            SDOAPELLNK = $_DESCRIPCEDLNK.substring(15, 30);
            PERNOMLNK = $_DESCRIPCEDLNK.substring(30, 42);
            SDONOMLNK = $_DESCRIPCEDLNK.substring(42, 54);
            $_SEXOPACIW = $_SEXOLNK;
            $_NACIMPACIW = $_FECHANACLNK;
            $_HEMOCLASPAC = $_HEMOCLASLNK;
            $_HEMOCLASLNK = $_GRUPOSANGLNK.substring(0, 2);
            $_HEMOCLASLNK = $_RHLNK.substring(2, 3);


        } else if ($_NOMBRE1PACW.trim() == '') {

            _datoapellido_7767();
        } else {
            _validarfecha_7767();
            ///// PENDIENTE FUNCION 
        }
    }
    else {
        validarcodpaciente_7767();
    }
}

function validarcodpaciente_7767() {

    if ($_CODLINK == $_CODPACIW) {
        $_TIPOPACIW = $_TIPOIDLNK;
        $_DECRIPPACIW = $_DESCRIPCEDLNK;
        _dato4_7767();
    } else {
        if ($_CODBASE09 == $_CODPACIW) {
            $_TIPOPACIW = $_TIPOIDBASE09;
            $_DECRIPPACIW = $_DESCRIPBASE09;
            _dato4_7767();
        } else {
            _dato4_7767();
        }
    }
}

function _dato4_7767() {
    //// CALL SER810B ///// MUESTRA MENSAJES SOBRE PACIENTES 

    if (($_NOVEDAD7767 == '7') && (Number.isNaN($_CODPACIW)) && ($_TIPOPACIW == ' ')) {
        $_TIPOPACIW = "RC";
        $("identif_110c").val($_TIPOPACIW);
        _validartipopac_7767();

    } else if (($_NOVEDAD7767 == '8') && ($_ADMINW == "ADMI") || ($_ADMINW == "GEBC")) {

        if ($_BLOQUEOHCW.trim() == '') {
            $_BLOQUEOHCW = "N"
            // imprimirenpantalla
            _dato3_7767();

        } else if (($_BLOQUEOHCW == "S") || ($_BLOQUEOHCW == "N")) {
            _validartipopac_7767();

        } else {
            _dato4_7767();
        }
    } else {
        _validartipopac_7767();
    }
}

function _validartipopac_7767() {
    var documento = [
        { "COD": "CC", "DESCRIP": "CEDULA CIUDADANIA" },
        { "COD": "CE", "DESCRIP": "CEDULA EXTRANJERIA" },
        { "COD": "PA", "DESCRIP": "NUMERO PASAPORTE" },
        { "COD": "RC", "DESCRIP": "REGISTRO CIVIL" },
        { "COD": "TI", "DESCRIP": "TARJETA IDENTIDAD" },
        { "COD": "ASI", "DESCRIP": "ADULTO SIN IDENT" },
        { "COD": "MSI", "DESCRIP": "MENOR SIN IDENT" },
        { "COD": "NUI", "DESCRIP": "NUM UNICO IDENT. NUID" },
        { "COD": "CD", "DESCRIP": "CARNET DIPLOMA" },
        { "COD": "SC", "DESCRIP": "SALVO CONDUCTO" },
        { "COD": "PE", "DESCRIP": "PERMISO ESPECIAL PERM" },
        { "COD": "CN", "DESCRIP": "CERTIFICADO NACIDO VIVO" }
    ]
    POPUP({
        array: documento,
        titulo: 'Tipo Identificacion',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluarpaciente_7767
    },
        _evaluartipodoc_7767);
}

function _evaluartipodoc_7767(documento) {
    $_TIPOPACIW = documento.COD;
    switch (documento.COD) {
        case 'CC':
        case 'CE':
        case 'PA':
        case 'RC':
        case 'TI':
        case 'ASI':
        case 'MSI':
        case 'NUI':
        case 'CD':
        case 'SC':
        case 'PE':
        case 'CN':
            validacionestipodoc_7767();
            break;
        default:
            _evaluarpaciente_7767();
            break;
    }
    $("#identif_110c").val(documento.COD + " - " + documento.DESCRIP);
}

function validacionestipodoc_7767() {
    if (parseInt($_TIPOPACIW) == 888) {
        $_TIPOPACIW = '';
        $("identif_110c").val($_TIPOPACIW);
        _dato3_7767();

    } else if (($_TIPOPACIW == "CC") || ($_TIPOPACIW == "CE") || ($_TIPOPACIW == "PA") || ($_TIPOPACIW == "RC") || ($_TIPOPACIW == "TI") || ($_TIPOPACIW == "ASI") || ($_TIPOPACIW == "MSI") || ($_TIPOPACIW == "NUI") || ($_TIPOPACIW == "CD") || ($_TIPOPACIW == "SC") || ($_TIPOPACIW == "PE") || ($_TIPOPACIW == "CN")) {
        _validacionestipopac2_7767();

    } else {
        _dato4_7767()
    }
}

function _validacionestipopac2_7767() {

    if ((($_TIPOPACIW == "CC") || ($_TIPOPACIW == "TI")) && (Number.isNaN($_CODPACIW))) {

        CON851('57', '57', null, 'error', 'error');
        _dato4_7767();
    } else if ($_TIPOPACIW == "CC") {
        if (($_CODPACIW < '000000000001000') || ($_CODPACIW > '000001999000000') || (($_CODPACIW > '000000100000000') && ($_CODPACIW < '000001000000000'))) {
            CON851('78', '78', null, 'error', 'error');
            _validartipopac_7767();

            if ($_NOVEDAD7767 == '7') {
                _dato4_7767();
            }
        } else {
            _lugaridentificacion_7767();
        }
    }
    else {
        _lugaridentificacion_7767();
    }
}

function _lugaridentificacion_7767() {
    fuente = '<div class="col-md-12" id="LUGAR_110C"> ' +
        '<input id="lugar_110c" type="text" class="form-control input-md" data-orden="1" maxlength="5"> ' +
        '</div>';

    _ventana({
        source: fuente,
        title: 'LUGAR DE IDENTIFICACION',
        size: 'small',
        espace: false,
        focus: '#lugar_110c',
        form: '#LUGAR_110C',
        order: '1',
        global1: '$_LUGARIDPACIW',
        inputglobal1: '#lugar_110c',
    }, _leerlugarnacimiento_7767, _validartipopac_7767);
}

function _leerlugarnacimiento_7767() {
    if (($_LUGARIDPACIW == '00000') || ($_LUGARIDPACIW.trim() == '')) {
        _evaluarapellido_7767();
    } else {
        LLAMADO_DLL({
            dato: [$_LUGARIDPACIW],
            callback: _dataSAL7767_044,
            nombredll: 'SAL7767_04',
            carpeta: 'SALUD'
        });
    }
}

function _dataSAL7767_044(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCIUDNACIW = date[1].trim();
    if (swinvalid == "00") {
        // $("#ciudadnaci_110C").val($_DESCRIPCIUDNACIW);
        _evaluarapellido_7767();
    }
    else if (swinvalid == "01") {
        setTimeout(_lugaridentificacion_7767, 500);

    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarapellido_7767() {
    validarInputs({
        form: '#APELLIDO1_110C',
        orden: "1"
    },
        function () { _evaluarpaciente_7767(); },
        _datoapellido_7767
    )
}

function _datoapellido_7767() {
    $_APELLIDO1PACW = $('#apellido1_110c').val();

    $_PERAPEL1PACIW = $_APELLIDO1PACW.substring(0, 1);
    $_PERAPEL2PACIW = $_APELLIDO1PACW.substring(1, 14);

    if (($_PERAPEL1PACIW.trim() == ' ') || ($.isNumeric($_PERAPEL1PACIW))) {
        CON851('58', '58', null, 'error', 'error');
        _evaluarapellido_7767();
    } else if ($_TUTELAPACIW == "S") {
        CON851('5B', '5B', null, 'error', 'error');
        _evaluarsegundoapellido_7767();

    } else if ($_APELLIDO1PACW.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _evaluarapellido_7767();
    } else {
        if (($.isNumeric($_CEDLNK)) && (PERAPELLNK != $_APELLIDO1PACW)) {
            CON851('2D', '2D', null, 'error', 'error');
            _evaluarapellido_7767();
        } else {
            _evaluarsegundoapellido_7767();
        }
    }
}

function _evaluarsegundoapellido_7767() {
    validarInputs({
        form: '#APELLIDO2_110C',
        orden: "1"
    },
        function () { _evaluarapellido_7767(); },
        _dato5_7767
    )
}
function _dato5_7767() {
    $_APELLIDO2PACW = $('#apellido2_110c').val();
    if (($.isNumeric($_CEDLNK)) && (SDOAPELLNK != $_APELLIDO2PACW)) {
        CON851('2D', '2D', null, 'error', 'error');
        _dato5_7767();

    } else {
        _evaluarprimernombre_7767();
    }

}

function _evaluarprimernombre_7767() {
    validarInputs({
        form: '#NOMBRE1_110C',
        orden: "1"
    },
        function () { _evaluarsegundoapellido_7767(); },
        _dato6_7767
    )
}
function _dato6_7767() {
    $_NOMBRE1PACW = $('#nombre1_110c').val();

    $_PERANOM1PACIW = $_NOMBRE1PACW.substring(0, 1);
    $_PERANOM2PACIW = $_NOMBRE1PACW.substring(1, 11);

    if (($_PERANOM1PACIW.trim() == ' ') || ($.isNumeric($_PERANOM1PACIW))) {
        CON851('58', '58', null, 'error', 'error');
        _evaluarprimernombre_7767();
    } else if ($.isNumeric($_CEDLNK) && (PERNOMLNK != $_NOMBRE1PACW)) {
        CON851('2D', '2D', null, 'error', 'error');
        _dato6_7767();

    } else if ($_NOMBRE1PACW.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _evaluarprimernombre_7767();
    } else {
        _evaluarsegnombre_7767();
    }
}

function _evaluarsegnombre_7767() {
    validarInputs({
        form: '#NOMBRE2_110C',
        orden: "1"
    },
        function () { _evaluarprimernombre_7767(); },
        _dato6A_7767
    )
}

function _dato6A_7767() {
    $_NOMBRE2PACW = $('#nombre2_110c').val();
    if (($.isNumeric($_CEDLNK)) && (SDONOMLNK != $_NOMBRE2PACW)) {
        CON851('2D', '2D', null, 'error', 'error');
        _dato6A_7767();

    } else {
        _validacionipssanfernando_7767();
    }
}

function _validacionipssanfernando_7767() {

    if ((($_NITUSU == "0900475095") || ($_NITUSU == "0822007038")) || (($_NITUSU == "0844003225") && ($_ADMINW == "ADMI") || ($_ADMINW == "GEBC"))) {
        ventalahuelladactilar_7767();
        //// PENDIENTE PREGUNTAR LO DE HUELLA 
    } else {
        _evaluarfechanac_7767();
    }
}

function _evaluarfechanac_7767() {
    momentMask.updateValue();
    validarInputs({
        form: "#NACIEMIENTO_110C",
        orden: "1"
    },
        function () { _evaluarprimernombre_7767(); },
        validarfecha_7767

    )
}

function validarfecha_7767() {
    $_NACIMPACIW = momentMask.unmaskedValue;

    if ($_NACIMPACIW.trim() == '') {
        _evaluarfechanac_7767();
    }
    else if ($_NACIMPACIW > $_FECHAACTUAL) {
        CON851('37', '37', null, 'error', 'error');
        _evaluarfechanac_7767();
    } else {
        _calcularedad_7767();
        $("#edad_110c").val($_EDADPACW);
        _validacionesedad7767();
    }
}

function _validacionesedad7767() {
    if (($_TIPOPACIW == 'RC') || ($_TIPOPACIW == 'MSI') || ($_TIPOPACIW == 'CE') || ($_TIPOPACIW == 'CN')) {
        /// NEXT SENTENCE
        _buscarduplicado_7767();

    }
    else {
        if ((($_CODPACIW > '000000003000000') && ($_CODPACIW < '000000009000000')) && (($_UNIDEDADW != 'A') || $_VLREDADW < 15)) {

            CON851('74', '74', null, 'error', 'error');
            _dato3_7767();
        }
        else if ((($_UNIDEDADW == 'A') && ($_VLREDADW > 18)) && (($_TIPOPACIW == 'RC') || ($_TIPOPACIW == 'TI') || ($_TIPOPACIW == 'NUI') || ($_TIPOPACIW == 'MSI') || ($_TIPOPACIW == 'CN'))) {

            if ($_NITUSU == '800251482') {
                /// CONTINUE
                _buscarduplicado_7767();
            } else {
                CON851('74', '74', null, 'error', 'error');
                _dato3_7767();
            }

        } else if ((($_UNIDEDADW == 'A') && ($_VLREDADW < 18)) && (($_TIPOPACIW == 'CC') || ($_TIPOPACIW == 'ASI'))) {

            CON851('74', '74', null, 'error', 'error');
            _dato3_7767();
        } else if (($_UNIDEDADW != 'A') && (($_TIPOPACIW == 'CC') || ($_TIPOPACIW == 'ASI'))) {

            CON851('74', '74', null, 'error', 'error');
            _dato3_7767();
        } else if ((($_UNIDEDADW == 'A') && ($_VLREDADW > 10)) && ($_TIPOPACIW == 'RC')) {

            CON851('74', '74', null, 'error', 'error');
            _dato3_7767();
        } else {
            _buscarduplicado_7767();
        }
    }
}

function _buscarduplicado_7767() {
    console.debug("buscar duplicado")
    // $_DECRIPPACIW = $_APELLIDO1PACW.padEnd(15, ' ')  + $_APELLIDO2PACW.padEnd(15, ' ') + $_NOMBRE1PACW.padEnd(12, ' ') + $_NOMBRE2PACW.padEnd(12, ' '); 

    // LLAMADO_DLL({
    //     dato: [$_DECRIPPACIW, $_CODPACIW, $_NACIMPACIW],
    //     callback: _dataSER810H,
    //     nombredll: 'SER810H',
    //     carpeta: 'SALUD'
    // }); 
    ////CALL SER810H

    //////PENDIENTE HACER DLL 

    // if (($_NOVEDAD7767 == '7') && ($_CODBASE09 != ' ')){
    //     $_SWOK = 'S';
    //     CON851P('07', '07', null, 'error', 'error');
    //     if($_SWOK =='S'){
    //         $_PACIANTW = $_CODBASE09;
    //         $_DECRIPPACIW = $_DESCRIPBASE09
    //         $_DATOSPACIW = $_DATOSBASE09

    //         _consultademostrarinf_7767(); 
    //         ACTUALIZAPACIX = '1'; 
    //     }else{
    //         _dato3_7767();
    //     }      
    // }else{
    _evaluargruposang_7767();
    // }
}


// function _dataSER810H(data) {
//     console.log(data, "SER810H");
//     var date = data.split('|');
//     var swinvalid = date[0].trim();

//     if (swinvalid == "00") {
//         CON851('2B', 'PACIENTE DUPLICADO', null, 'error', 'error');
//          console.debug('saldria ventana')             
//     }
//     else if (swinvalid == "01") {
//         CON851('01', '01', null, 'error', 'error');
//         // _evaluargruposang_7767();
//     }
//     else {
//         CON852(date[0], date[1], date[2], _toggleNav);
//     }
// }

function _evaluargruposang_7767() {
    validarInputs({
        form: "#GRUPOSANG_110C",
        orden: "1"
    },
        function () { _evaluarfechanac_7767(); },
        _datogrpsang_7767
    )
}

function _datogrpsang_7767() {
    if ($_NITUSU == "0900019291") {

        _evaluarsexo_7767();
    }
    /////SER810K
    $_GRPSANGPACIW = $("#gruposang_110c").val();

    if (($.isNumeric($_CEDLNK)) && ($_GRUPOSANGLNK != $_GRPSANGPACIW)) {

        CON851('2D', '2D', null, 'error', 'error');
        _evaluargruposang_7767();
    }
    else if ($_GRPSANGPACIW.trim() == '') {
        CON851('2C', '2C', null, 'error', 'error');
        $_RHPACIW = '';
        $("#rh_110c").val($_RHPACIW);
        _evaluarsexo_7767();

    } else if (($_GRPSANGPACIW == 'A') || ($_GRPSANGPACIW == 'a') || ($_GRPSANGPACIW == 'B') || ($_GRPSANGPACIW == 'b') || ($_GRPSANGPACIW == 'AB') || ($_GRPSANGPACIW == 'ab') || ($_GRPSANGPACIW == 'O') || ($_GRPSANGPACIW == 'o')) {
        ////NEXT SENTENCE
        _evaluarrh_7767();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluargruposang_7767();
    }
}

function _evaluarrh_7767() {
    validarInputs({
        form: "#RH_110C",
        orden: "1"
    },
        function () { _evaluargruposang_7767(); },
        _datorh_7767
    )
}

function _datorh_7767() {
    $_RHPACIW = $("#rh_110c").val();

    if (($_RHPACIW == '+') || ($_RHPACIW == '-')) {
        /// NEXT SENTENCE
        _evaluarsexo_7767();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluarrh_7767();
    }
    if (($.isNumeric($_CEDLNK)) && ($_RHLNK != ' ') && ($_RHLNK != $_RHPACIW)) {
        CON851('2D', '2D', null, 'error', 'error');
        _evaluarrh_7767();
    }

}

function _evaluarsexo_7767() {
    validarInputs({
        form: "#SEXO_110C",
        orden: "1"
    },
        function () { _evaluargruposang_7767(); },
        _dato10_7767
    )
}

function _dato10_7767() {
    $_SEXOPACIW = $("#sexo_110c").val();
    /////SER810K
    if (($_SEXOPACIW == 'M') || ($_SEXOPACIW == 'm') || ($_SEXOPACIW == 'F') || ($_SEXOPACIW == 'f')) {
        datoestadocivil();
    } else {
        _evaluarsexo_7767();
    }

    if (($.isNumeric($_CEDLNK)) && ($_SEXOLNK != $_SEXOPACIW)) {
        CON851('2D', '2D', null, 'error', 'error');
        _evaluarsexo_7767();
    }
}

function datoestadocivil() {
    if ($_NITUSU == '0900019291') {
        $_ESTCIVILPACIW = 'S';
        $_ZONAPACIW = 'U';

        $_CIUDASEGPACIW = $_CODCIUUSU;

        // PERFOME MOSTRAR DATOS
        _evaluarocupacion();
    } else if ((($_UNIDEDADW == 'D') || ($_UNIDEDADW == 'M')) || ($ - $_VLREDADW < 16)) {
        $_ESTCIVILPACIW = 'S';

    } else {
        // $_OPCION1 = $_ESTCIVILPACIW;
        if ($_OPCION1 == 8) {

            _evaluarsexo_7767();
        } else {
            // $_ESTCIVILPACIW = $_OPCION1;
            // console.debug($_ESTCIVILPACIW);
            _validarcivilpac_7767();
        }
    }
}
function _validarcivilpac_7767() {
    var civil = [
        { "COD": "S", "DESCRIP": "SOLTERO" },
        { "COD": "C", "DESCRIP": "CASADO" },
        { "COD": "U", "DESCRIP": "UNION LIBRE" },
        { "COD": "V", "DESCRIP": "VIUDO" },
        { "COD": "D", "DESCRIP": "SEPARADA" }
    ]
    POPUP({
        array: civil,
        titulo: 'ESTADO CIVIL',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluarsexo_7767
    },
        _evaluarestadocivil_7767);
}

function _evaluarestadocivil_7767(civil) {
    $_ESTCIVILPACIW = civil.COD;
    switch (civil.COD) {
        case 'S':
        case 'C':
        case 'U':
        case 'V':
        case 'D':
            setTimeout(validacionestudio_7767, 300);
            break;
        default:
            _evaluarsexo_7767();
            break;
    }
    $("#civil_110c").val(civil.COD + " - " + civil.DESCRIP);
}


function validacionestudio_7767() {
    var nivelest = [
        { "COD": "1", "DESCRIP": "NINGUNO" },
        { "COD": "2", "DESCRIP": "PRE-ESCOL" },
        { "COD": "3", "DESCRIP": "PRIMARIA" },
        { "COD": "4", "DESCRIP": "SECUNDARIA" },
        { "COD": "5", "DESCRIP": "BACH. BASIC" },
        { "COD": "6", "DESCRIP": "BACH. TECN" },
        { "COD": "7", "DESCRIP": "NORMALIST" },
        { "COD": "8", "DESCRIP": "TECN. PROFE" },
        { "COD": "9", "DESCRIP": "TECNOLOGI" },
        { "COD": "A", "DESCRIP": "PROFESION" },
        { "COD": "B", "DESCRIP": "ESPECIALI" },
        { "COD": "C", "DESCRIP": "MAESTRIA" },
        { "COD": "D", "DESCRIP": "DOCTORADO" }
    ]
    POPUP({
        array: nivelest,
        titulo: 'ESTADO CIVIL',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluarsexo_7767
    },
        _validarcalificacion_con110c);
}

function _validarcalificacion_con110c(nivelest) {

    $_NIVESTUPACIW = nivelest.COD;
    switch (nivelest.COD) {
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
            _evaluarzona_7767();
            break;
        default:
            setTimeout(_validarcivilpac_7767, 300);
            break;
    }
    $("#estudio_110c").val(nivelest.COD + " - " + nivelest.DESCRIP);
}


function _evaluarzona_7767() {

    validarInputs({
        form: "#ZONA_110C",
        orden: "1"
    },
        function () { validacionestudio_7767(); },
        _datozona_7767
    )
}

function _datozona_7767() {
    $_ZONAPACIW = $("#zona_110c").val();

    if (($_NOVEDAD7767 == '7') && ($_ZONAPACIW.trim() == '')) {
        $_ZONAPACIW = 'U';
        $("#zona_110c").val($_ZONAPACIW);
        // _evaluardireccion_7767();
        _evaluarzona_7767();

    } else if (($_ZONAPACIW == 'U') || ($_ZONAPACIW == 'R')) {
        _datopadre_7767();

    } else {
        _evaluarzona_7767();
    }
}

function _datopadre_7767() {
    if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
        _dato2gmail_7767();
    }
    if ((($_UNIDEDADW == 'D') || ($_UNIDEDADW == 'M')) || (($_UNIDEDADW == 'A') && ($_VLREDADW < 18))) {
        /////NEXT SENTENCE
        _evaluarpadre_7767();
    } else {
        if (($_NITUSU == '019381427') || ($_NITUSU == '017306492') || ($_NITUSU == '0800175901')) {
            swinvalid = '0';
            _evaluarpadre_7767();
        } else {
            _evaluardireccion_7767();
        }
    }
}

function _evaluarpadre_7767() {

    validarInputs({
        form: "#PADRE_110C",
        orden: "1"
    },
        function () { validacionestudio_7767(); },
        _datopadre2_7767
    )
}

function _datopadre2_7767() {
    $_PADREPACIW = $("#padre_110c").val();

    if (($_PADREPACIW.trim() == '') && ($_DPTCIUUSU == '85')) {
        CON851('02', '02', null, 'error', 'error');
        if ($_NOVEDAD7767 == '7') {
            _datopadre_7767();
        } else {
            _datomadre_7767();
        }
    } else {
        _datomadre_7767();
    }
}

function _datomadre_7767() {
    if ((($_UNIDEDADW == 'D') || ($_UNIDEDADW == 'M')) || (($_UNIDEDADW == 'A') && ($_VLREDADW < 18))) {
        /// NEXT SENTENCE
        _evaluarmadre_7767();
    } else {
        if (($_NITUSU == '019381427') || ($_NITUSU == '017306492') || ($_NITUSU == '0800175901')) {
            swinvalid = '0';
            _evaluarmadre_7767();
        } else {
            _evaluardireccion_7767();
        }
    }
}

function _evaluarmadre_7767() {
    validarInputs({
        form: "#MADRE_110C",
        orden: "1"
    },
        function () { _evaluarpadre_7767(); },
        _datomadre2_7767
    )
}

function _datomadre2_7767() {
    $_MADREPACIW = $("#madre_110c").val();
    if (($_MADREPACIW.trim() == '') && ($_DPTCIUUSU == '85')) {
        CON851('02', '02', null, 'error', 'error');

        if ($_NOVEDAD7767 == '7') {
            _evaluardireccion_7767();
        } else {
            _evaluardireccion_7767();
        }
    } else {
        _evaluardireccion_7767();
    }
}

function _evaluardireccion_7767() {
    validarInputs({
        form: "#DIRECCION_110C",
        orden: "1"
    },
        function () { _evaluarmadre_7767(); },
        _datodireccion_7767
    )
}

function _datodireccion_7767() {

    $_DIRPACIW = $("#direccion_110c").val();

    if ($_DIRPACIW.trim() == '') {
        CON851('84', '84', null, 'error', 'error');
        _evaluardireccion_7767();
    } else {
        _evaluartelefono1_7767();
    }
}

function _evaluartelefono1_7767() {
    validarInputs({
        form: "#TELEFONO_110C",
        orden: "1"
    },
        function () { _evaluardireccion_7767(); },
        _datotel1_7767
    )
}

function _datotel1_7767() {
    $_TELPACIW = $("#tel1_110c").val();

    if ($_TELPACIW.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _evaluartelefono1_7767();
    } else {
        _evaluartelefono2_7767();
    }

}
function _evaluartelefono2_7767() {
    validarInputs({
        form: "#TELEFONO2_110C",
        orden: "1"
    },
        function () { _evaluartelefono1_7767(); },
        _datotel2_7767
    )
}

function _datotel2_7767() {

    $_CELPACIW = $("#tel2_110c").val();
    $("#ciudad_110c").val('50689');

    if ($_CELPACIW.trim() == '') {
        _evaluarciudad_7767();
    } else {
        _evaluarciudad_7767();
    }
}

function _evaluarciudad_7767() {
    validarInputs({
        form: "#CIUDAD_110C",
        orden: "1"
    },
        function () { _evaluartelefono1_7767(); },
        _datociudad_7767
    )
}

function _datociudad_7767() {

    $_CIUPACIW = $("#ciudad_110c").val();
    $_DPTO1PACIW = $_CIUPACIW.substring(0, 1);
    $_CIUD2PACIW = $_CIUPACIW.substring(1, 5);

    if (($_NOVEDAD7767 == '7') && ($_CIUPACIW.trim() == '') || ($_CIUPACIW == '00000')) {
        $_CIUPACIW = $_CODCIUUSU;
        $("#ciudad_110c").val($_CIUPACIW);
        _datopais_7767();

        if ($_CIUD2PACIW == '000') {
            _evaluarciudad_7767();
        }
    }
    else {
        // _consultaSql({
        //     db: 'datos_pros',
        //     sql: 'SELECT * FROM datos_pros.sc_archciud WHERE cuenta LIKE "%' + $_CIUPACIW + '%"',
        //     callback: _consultaciudad_SAL7767
        // });
        LLAMADO_DLL({
            dato: [$_CIUPACIW],
            callback: _dataSAL7767_04,
            nombredll: 'SAL7767_04',
            carpeta: 'SALUD'
        });
    }
}

function _dataSAL7767_04(data) {
    // console.debug(data, 'SAL7767_04');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCIUDW = date[1].trim();
    if (swinvalid == "00") {
        $("#ciudadd_110c").val($_DESCRIPCIUDW);
        _datopais_7767();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarciudad_7767();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function _datopais_7767() {
    if (($_TIPOPACIW == 'CE') || ($_TIPOPACIW == 'CD') || ($_TIPOPACIW == 'SC') || ($_TIPOPACIW == 'PE') || ($_TIPOPACIW == 'CN') || ($_TIPOPACIW == 'ASI') || ($_TIPOPACIW == 'MSI')) {
        //// CONTINUE 
        _evaluarpais_7767();
    } else {
        if ($_NOVEDAD7767 == '7') {
            $("#ocupacion_110c").val('9998');
            _evaluarocupacion_7767();
        } else {
            _evaluarocupacion_7767();
        }
    }
}

function _evaluarpais_7767() {

    validarInputs({
        form: "#PAIS_110C",
        orden: "1"
    },
        function () { _evaluarciudad_7767(); },
        _mostrarpais_66717
    )
}

function _mostrarpais_66717() {
    $_PAISPACIW = $("#pais_110c").val();

    LLAMADO_DLL({
        dato: [$_PAISPACIW, $_ADMINW],
        callback: _dataSAL7767_05,
        nombredll: 'SAL7767_05',
        carpeta: 'SALUD'
    });
}

function _dataSAL7767_05(data) {
    // console.debug(data, 'SAL7767_05');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPPAISW = date[1].trim();
    if (swinvalid == "00") {
        $("#paisd_110c").val($_DESCRIPPAISW);
        $("#ocupacion_110c").val('9998');
        _evaluarocupacion_7767();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _datopais_7767();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

// function _consultapais_SAL7767(error, results, fileds) {
//     console.debug(results);
//     if (error) throw error;
//     else {
//         console.debug(results, results.length);
//         for (var i in results) {
//             if (results[i].cod_pair.trim() == $_PAISPACIW) {
//                 console.log('encuentra pais');
//                 $_DESCRIPPAISW = results[i].descrip_pair;
//                 $("#paisd_110c").val($_DESCRIPPAISW);
//                 $("#ocupacion_110c").val('9998');
//                 _evaluarocupacion_7767();

//             } else if (i == results.length - 1) {
//                 console.log('no encuentra pais');
//                 CON851('01', '01', null, 'error', 'error');
//                 _datopais_7767();
//             }
//         }
//         if (results.length == 0) {
//             console.log('1 no encuentra pais');
//             CON851('01', '01', null, 'error', 'error');
//             _datopais_7767();
//         }
//     }
// }

function _evaluarocupacion_7767() {
    validarInputs({
        form: "#OCUPACION_110C",
        orden: "1"
    },
        function () { _evaluarciudad_7767(); },
        _datoocupacion_7767
    )
}

function _datoocupacion_7767() {
    $_OCUPPACIW = $("#ocupacion_110c").val();

    if ($_OCUPPACIW == '0000') {
        if ((($_UNIDEDADW == 'D') || ($_UNIDEDADW == 'M')) || ($_VLREDADW < 18)) {
            $_OCUPPACIW = '9998';
            $("#ocupacion_110c").val($_OCUPPACIW);
            consultarocupacion_7767();
        }
    } else {

        consultarocupacion_7767();
    }
}

function consultarocupacion_7767() {
    LLAMADO_DLL({
        dato: [$_OCUPPACIW],
        callback: _dataSAL7767_06,
        nombredll: 'SAL7767_06',
        carpeta: 'SALUD'
    });
}

function _dataSAL7767_06(data) {
    // console.debug(data, 'SAL7767_06');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPOCUPAW = date[1].trim();
    if (swinvalid == "00") {
        $("#ocupaciond_110c").val($_DESCRIPOCUPAW);
        _evaluarestrato_7767();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarocupacion_7767();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
// function _consultaocupacion_SAL7767(error, results, fileds) {
//     console.debug(results);
//     if (error) throw error;
//     else {
//         console.debug(results, results.length);
//         for (var i in results) {
//             if (results[i].cod_ocu.trim() == $_OCUPPACIW) {
//                 console.log('encuentra ocupacion');
//                 $_DESCRIPPAISW = results[i].nombre_ocu;
//                 $("#ocupaciond_110c").val($_DESCRIPPAISW);
//                 _evaluarestrato_7767();

//             } else if (i == results.length - 1) {
//                 console.log('no encuentra ocupacion');
//                 CON851('01', '01', null, 'error', 'error');
//                 _evaluarocupacion_7767();
//             }
//         }
//         if (results.length == 0) {
//             console.log('1 no encuentra ocupacion');
//             CON851('01', '01', null, 'error', 'error');
//             _evaluarocupacion_7767();
//         }
//     }
// }

function _evaluarestrato_7767() {
    var estrato = [
        { "COD": "0", "DESCRIP": "NIVEL 0" },
        { "COD": "1", "DESCRIP": "NIVEL 1" },
        { "COD": "2", "DESCRIP": "NIVEL 2" },
        { "COD": "3", "DESCRIP": "NIVEL 3" },
        { "COD": "4", "DESCRIP": "NIVEL 4" },
        { "COD": "5", "DESCRIP": "NIVEL 5" },
        { "COD": "6", "DESCRIP": "NIVEL 6" }
    ]
    POPUP({
        array: estrato,
        titulo: 'ESTADO CIVIL',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluarocupacion_7767
    },
        _datoestrato_7767);
}

function _datoestrato_7767(estrato) {

    $_ESTRATOPACIW = estrato.COD;
    switch (estrato.COD) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
            _evaluarcopago_7767();
            break;
        default:
            _evaluarocupacion_7767();
            break;
    }
    $("#nivel_110c").val(estrato.COD + " - " + estrato.DESCRIP);
}

function _evaluarcopago_7767() {
    validarInputs({
        form: "#COPAGO_110C",
        orden: "1"
    },
        function () { _evaluarciudad_7767(); },
        _datocopago_7767
    )
}

function _datocopago_7767() {
    $_COPAGOPACIW = $("#copago_110c").val();
    if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) {
        if ($_COPAGOPACIW.trim() == '') {
            $_COPAGOPACIW = 'S';
            $("#copago_110c").val($_COPAGOPACIW);
            _datoregimen_7767();
        } else {
            _datocopago2_7767();
        }
    } else {

        if ($_COPAGOPACIW.trim() == '') {
            _evaluarcopago_7767();
        } else {
            _datocopago2_7767();
        }
    }
}
function _datocopago2_7767() {

    if (($_COPAGOPACIW == 'S') || ($_COPAGOPACIW == 's') || ($_COPAGOPACIW == 'N') || ($_COPAGOPACIW == 'n')) {
        swinvalid = '0';
        _datoregimen_7767();
    }
    else {
        _evaluarcopago_7767();
    }
}

function _datoregimen_7767() {
    if ($_NITUSU = '0900004059') {
        _evaluarregimen_7767();
    } else {
        _evaluarregimen_7767();
    }
}

function _evaluarregimen_7767() {
    var tipousuario = [
        { "COD": "C", "DESCRIP": "CONTRIBUTIVO" },
        { "COD": "S", "DESCRIP": "SUBSIDIADO" },
        { "COD": "V", "DESCRIP": "VINCULADO" },
        { "COD": "P", "DESCRIP": "PARTICULAR" },
        { "COD": "O", "DESCRIP": "OTRO TIPO" },
        { "COD": "D", "DESCRIP": "DESPLAZ CONT" },
        { "COD": "E", "DESCRIP": "DESPLAZ SUBS" },
        { "COD": "G", "DESCRIP": "DESPLAZ VINC" }
    ]
    POPUP({
        array: tipousuario,
        titulo: 'TIPO USUARIO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluarcopago_7767
    },
        _datoregimen2_7767);
}

function _datoregimen2_7767(tipousuario) {
    $_REGIMENPACIW = tipousuario.COD;
    switch (tipousuario.COD) {
        case 'C':
        case 'S':
        case 'V':
        case 'P':
        case 'O':
        case 'D':
        case 'E':
        case 'G':
            _mostrarregimen_7767();
            break;
        default:
            _evaluarcopago_7767();
            break;
    }
    $("#regimen_110c").val(tipousuario.COD + " - " + tipousuario.DESCRIP);
}

function _mostrarregimen_7767() {
    if ($_NITUSU == '0900005594') {
        if (($_REGIMENPACIW == 'D') || ($_REGIMENPACIW == 'E') || ($_REGIMENPACIW == 'G')) {
            CON851('03', '03', null, 'error', 'error');
            _datoregimen_7767();
        } else {
            _evaluarcolegio_7767();
        }
    } else {
        _evaluarcolegio_7767();
    }
}

function _evaluarcolegio_7767() {
    validarInputs({
        form: "#COLEGIO_102",
        orden: "1"
    },
        function () { _evaluarregimen_7767(); },
        _datoeducacion_7767
    )
}

function _datoeducacion_7767() {
    $_INSTITUTOPACIW = $("#colegio_110c").val();

    if ($_INSTITUTOPACIW.trim() == '') {
        $_INSTITUTOPACIW = '';
        $("#colegio_110c").val($_INSTITUTOPACIW);
        $_DESCRIPCOLEGIOW = 'COLEGIO NO ASIGNADO';
        $("#colegiod_110c").val($_DESCRIPCOLEGIOW);
        _evaluaretnia_7767();
    } else {
        LLAMADO_DLL({
            dato: [$_INSTITUTOPACIW],
            callback: _dataSAL7767_07,
            nombredll: 'SAL7767_07',
            carpeta: 'SALUD'
        });
    }
}

function _dataSAL7767_07(data) {
    // console.debug(data, 'SAL7767_07');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCOLEGIOW = date[1].trim();
    if (swinvalid == "00") {
        $("#colegiod_110c").val($_DESCRIPCOLEGIOW);
        _evaluaretnia_7767();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarcolegio_7767();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
// function _consultacolegio_SAL7767(error, results, fileds) {
//     console.debug(results);
//     if (error) throw error;
//     else {
//         console.debug(results, results.length);
//         if (results.length == 0) {
//             CON851('01', '01', null, 'error', 'error');
//             _evaluarcolegio_7767();

//         } else {

//             $("#colegiod_110c").val(results[0].descrip_coleg);
//             _evaluaretnia_7767();
//         }
//     }
// }

function _evaluaretnia_7767() {
    validarInputs({
        form: "#ETNIA_110C",
        orden: "1"
    },
        function () { _evaluarcolegio_7767(); },
        _datoetnia_7767
    )
}

function _datoetnia_7767() {

    if ($_REGIMENPACIW == 'P') {
        $_ETNIAPACIW = '9';
        $("#etnia_110c").val($_ETNIAPACIW);
        _evaluartipoafiliado_7767();
    } else {
        _evaluaretnia_7767();
    }
}


function _evaluaretnia_7767() {
    var etnia = [
        { "COD": "1", "DESCRIP": "INDIGE" },
        { "COD": "2", "DESCRIP": "RAIZAL" },
        { "COD": "3", "DESCRIP": "GITANO" },
        { "COD": "4", "DESCRIP": "AFROCO" },
        { "COD": "5", "DESCRIP": "ROM" },
        { "COD": "6", "DESCRIP": "MESTIZO" },
        { "COD": "9", "DESCRIP": "NO APLICA" }
    ]
    POPUP({
        array: etnia,
        titulo: 'GRUPO ETNICO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluarestrato_7767
    },
        _seleccionaretnia_7767);
}

function _seleccionaretnia_7767(etnia) {
    $_ETNIAPACIW = etnia.COD;
    switch (etnia.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '9':
            _validacionesetnia_7767();
            break;
        default:
            _evaluarestrato_7767();
            break;
    }
    $("#etnia_110c").val(etnia.COD + " - " + etnia.DESCRIP);
}

function _validacionesetnia_7767() {
    if ($_ETNIAPACIW == '1') {
        _ventanaDatos({
            titulo: 'VENTANA DE ETNIAS PACIENTES',
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_etnias',
            callback_esc: function () {
                $("#colegio_110c").focus();
            },
            callback: function (data) {
                $('#indigena_110c').val(data.cod_etni.trim());
                setTimeout(_evaluartipoafiliado_7767, 300);
                //// ERROR AJ //// DEBE DE ACTUALIZAR ETNIAS 97765
                // CON851('4J', '4J', null, 'error', 'error');
                //// SE DEVUELVE A SELECCIONAR GRUPO ETNICO 
            }
        });


    } else if ((($_ETNIAPACIW == '1') || ($_ETNIAPACIW == '2')) && ($_NITUSU != '0845000038')) {

        _ventanaDatos({
            titulo: 'VENTANA DE NOMBRES DE COMUNIDADES',
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_grupocomu',
            callback_esc: function () {
                $("#colegio_110c").focus();
            },
            callback: function (data) {
                $('#comunidades_110c').val(data.llave_nom_cu.trim());
                //// VENTANA SER116A CONSULTA DE NOMBRES DE COMUNIDADES 
                //// ERROR 4X ///
                //// SE DEVUELVE A SELECCIONAR GRUPO ETNICO
                _validarresguardos_SAL7767();
            }
        });

    } else {
        setTimeout(_evaluartipoafiliado_7767, 300);
    }
}

function _validarresguardos_SAL7767() {
    if ((($_ETNIAPACIW == '1') || ($_ETNIAPACIW == '2')) && ($_NITUSU != '0845000038')) {
        _ventanaDatos({
            titulo: 'VENTANA DE NOMBRES DE COMUNIDADES',
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_gruporesgu',
            callback_esc: function () {
                $("#colegio_110c").focus();
            },
            callback: function (data) {
                $('#resguardos_110c').val(data.llave_nom_resgu.trim());

                setTimeout(_evaluartipoafiliado_7767, 300);
            }
        });
        //// VENTANA SER117A CONSULTA DE NOMBRES DE RESGUARDOS
        //// ERROR 4Y ///
        //// SE DEVUELVE A SELECCIONAR GRUPO ETNICO
    }
}



function _evaluartipoafiliado_7767() {
    var afiliado = [
        { "COD": "1", "DESCRIP": "COTIZANTE" },
        { "COD": "2", "DESCRIP": "BENEFICIARIO" },
        { "COD": "3", "DESCRIP": "COT. PENSIONADO" },
        { "COD": "4", "DESCRIP": "UPC ADICIONAL" },
        { "COD": "5", "DESCRIP": "CABEZA FAMILIA" },
        { "COD": "6", "DESCRIP": "GRUPO FAMILIAR" },
        { "COD": "0", "DESCRIP": "SIN DETERMINAR" }
    ]
    POPUP({
        array: afiliado,
        titulo: 'TIPO AFILIADO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluarestrato_7767
    },
        _seleccionartipoafiliado_7767);
}

function _seleccionartipoafiliado_7767(afiliado) {
    $_TIPOAFILPACIW = afiliado.COD;
    switch (afiliado.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '0':
            _validacionestipoafiliado_7767();
            break;
        default:
            _evaluarestrato_7767();
            break;
    }
    $("#tipoafil_110c").val(afiliado.COD + " - " + afiliado.DESCRIP);
}

function _validacionestipoafiliado_7767() {
    console.log('evaluaciones tipo de afiliado')
    if (($_NITUSU == '0900405505') && ($_REGIMENPACIW != 'O')) {
        if (($_REGIMENPACIW != 'S') && (($_TIPOAFILPACIW == '5') || ($_TIPOAFILPACIW == '6'))) {
            ////CONTINUE 
            _evaluarportabilidad_7767();
        }
        else {
            if (($_REGIMENPACIW != 'C') && (($_TIPOAFILPACIW == '1') || ($_TIPOAFILPACIW == '2') || ($_TIPOAFILPACIW == '0'))) {
                // CONTINUE 
                _evaluarportabilidad_7767();
            } else {
                _seleccionartipoafiliado_7767();
            }
        }
    } else {
        _evaluarportabilidad_7767();
    }
}

function _evaluarportabilidad_7767() {
    console.log('ventana de portabilidad')
    fuente = '<div class="col-md-12" id="PORTABILIDAD_110C"> ' +
        '<input id="portabilidad_110c" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
        '</div>';
    // fuente = '<div class="col-md-12 col-sm-12 col-xs-12"' +
    // '<div class="inline-inputs">' +
    // '<label class="col-md-4 col-sm-4 col-xs-4">PORTABILIDAD:</label>' +
    // '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="PORTABILIDAD_110C">' +
    // '<input id="portabilidad_110c" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1">' +
    // '</div>' +
    // '</div>' +
    // '<div class="salto-linea"></div>' +
    // '<div class="col-md-12 col-sm-12 col-xs-12"' +
    // '<div class="inline-inputs">' +
    // '<label class="col-md-4 col-sm-4 col-xs-4">CIUDAD:</label>' +
    // '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="PORTABILIDAD_110C">' +
    // '<input id="ciudadorig_110C" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="5" data-orden="2">' +
    // '</div>' +
    // '</div>';

    _ventana({
        source: fuente,
        title: 'PORTABILIDAD PACIENTE',
        size: 'small',
        espace: false,
        focus: '#portabilidad_110c',
        form: '#PORTABILIDAD_110C',
        order: '1',
        global1: '$_PORTABPACIW',
        inputglobal1: '#portabilidad_110c',
    }, validar_portabilidad_7767, _evaluartipoafiliado_7767);
}

function validar_portabilidad_7767() {

    if ($_PORTABPACIW.trim() == '') {
        $_PORTABPACIW = 'N';
        $_CIUDASEGPACIW = '50689'

        datodesplazado_7767();
    } else if (($_PORTABPACIW == 'S') || ($_PORTABPACIW == 's')) {

        _ventanaciudadaseg_7767();

    } else if (($_PORTABPACIW == 'N') || ($_PORTABPACIW == 'n')) {
        $_CIUDASEGPACIW = '50689'
        $("#ciudadaseg_110c").val($_CIUDASEGPACIW);

        datodesplazado_7767();
    }
    else {
        CON851('02', '02', null, 'error', 'error');
        _evaluarportabilidad_7767();
    }
}

function _ventanaciudadaseg_7767() {

    fuente = '<div class="col-md-12" id="CIUDADASEG_110C"> ' +
        '<input id="ciudadaseg_110c" type="text" class="form-control input-md" data-orden="1" maxlength="5"> ' +
        '</div>';
    _ventana({
        source: fuente,
        title: 'CIUDAD ASEGURAMIENTO',
        size: 'small',
        espace: false,
        focus: '#ciudadaseg_110c',
        form: '#CIUDADASEG_110C',
        order: '1',
        global1: '$_CIUDASEGPACIW',
        inputglobal1: '#ciudadaseg_110c',
    }, _validarciudadaseg_7767, _evaluartipoafiliado_7767);
}

function _validarciudadaseg_7767() {
    if (($_CIUDASEGPACIW == '00000') || ($_CIUDASEGPACIW.trim() == '')) {
        datodesplazado_7767();
    } else {
        LLAMADO_DLL({
            dato: [$_CIUDASEGPACIW],
            callback: _dataSAL7767_045,
            nombredll: 'SAL7767_04',
            carpeta: 'SALUD'
        });
    }
}

function _dataSAL7767_045(data) {
    // console.debug(data, 'SAL7767_045');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCIUDASEGW = date[1].trim();
    if (swinvalid == "00") {

        datodesplazado_7767();
    }
    else if (swinvalid == "01") {
        setTimeout(_validacionestipoafiliado_7767, 500);
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function datodesplazado_7767() {
    if ((($_REGIMENPACIW == 'D') || ($_REGIMENPACIW == 'E') || ($_REGIMENPACIW == 'G')) && ($_TIPOAFILPACIW == '1')) {
        /// LLAMA OTRO PROGRAMA SER110D
    } else {
        _evaluarentidadafiliada_7767();
    }
}

function _evaluarentidadafiliada_7767() {
    validarInputs({
        form: "#AFILIADO_110C",
        orden: "1"
    },
        function () { _evaluarportabilidad_7767(); },
        _datoentidadafiliado_7767
    )
}

function _datoentidadafiliado_7767() {

    $_EPSPACIW = $("#eps_110c").val();
    if ($_EPSPACIW.trim() == '') {
        if ($_REGIMENPACIW == 'P') {
            $_DESCRIPENTIPACIW = '';
            $("#epsd_110c").val($_DESCRIPENTIPACIW);
            _validarentidadpaci_7767();
        } else {
            CON851('02', '02', null, 'error', 'error');
            _evaluarentidadafiliada_7767();
        }

    } else {
        LLAMADO_DLL({
            dato: [$_EPSPACIW],
            callback: _dataSAL7767_08,
            nombredll: 'SAL7767_08',
            carpeta: 'SALUD'
        });
        // _consultaSql({
        //     db: 'datos_pros',
        //     sql: 'SELECT * FROM datos_pros.sc_archent WHERE cod_ent LIKE "%' + $_EPSPACIW + '%"',
        //     callback: _consultaentidades_SAL7767
        // });
    }
}

function _dataSAL7767_08(data) {
    // console.debug(data, 'SAL7767_08');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPENTIPACIW = date[1].trim();
    if (swinvalid == "00") {
        $("#epsd_110c").val($_DESCRIPENTIPACIW);
        _validacionesentidadpaci_7767();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarentidadafiliada_7767();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

// function _consultaentidades_SAL7767(error, results, fileds) {
//     console.debug(results);
//     if (error) throw error;
//     else {
//         console.debug(results, results.length);
//         for (var i in results) {
//             if (results[i].cod_ent.trim() == $_EPSPACIW) {
//                 console.log('encuentra eps');
//                 $_DESCRIPENTIPACIW = results[i].nombre_ent;
//                 $("#epsd_110c").val($_DESCRIPENTIPACIW);
//                 _validacionesentidadpaci_7767();


//             } else if (i == results.length - 1) {
//                 console.log('no encuentra eps');
//                 CON851('01', '01', null, 'error', 'error');
//                 _evaluarentidadafiliada_7767();
//             }
//         }
//         if (results.length == 0) {
//             console.log('1 no encuentra eps');
//             CON851('01', '01', null, 'error', 'error');
//             _evaluarentidadafiliada_7767();
//         }
//     }
// }


function _validacionesentidadpaci_7767() {
    if (($_ADMINW == 'ADMIN') || ($_ADMINW == 'GEBC')) {
        swinvalid = '0';
        _validacionesentidadpaci2_7767();
    } else {
        if ($_EPSPACIW != EPSPACI) {
            if (($_EPSPACIW == 'SIN438') || (EPSPACI == 'SIN438')) {
                $_EPSPACIW = EPSPACI;
                _evaluarentidadafiliada_7767();
            } else {
                _validacionesentidadpaci2_7767();
            }
        } else {
            _validacionesentidadpaci2_7767();
        }
    }
}
function _validacionesentidadpaci2_7767() {
    if ($_ENTIFACTPACIW == $_NITENT) {
        _evaluarcontrato_7767();
    } else {
        $_ENTIFACTPACIW = $_NITENT;
        _evaluarcontrato_7767();
    }
}

function _evaluarcontrato_7767() {
    validarInputs({
        form: "#CONTRATO_110C",
        orden: "1"
    },
        function () { _evaluarentidadafiliada_7767(); },
        _datocontrato_7767
    )
}
function _datocontrato_7767() {
    $_CONTRATOPACIW = $("#contrato_110c").val();
    if (($_NITUSU == '0900405505') && ($_CONTRATOPACIW.trim() == '')) {
        _evaluarcontrato_7767();
    } else if (($_NITUSU == '0900405505') && ($_CONTRATOPACIW == '99')) {
        _evaluarcontrato_7767();
    } else if (($_NITUSU == '0830092718') && ($_NOVEDAD7767 == '7')) {
        _datomamo_7767();
    } else {
        _evaluarfechaafiliado();
    }
}

function _evaluarfechaafiliado() {
    momentMaskfechaafil.updateValue();
    validarInputs({
        form: "#FECHAAFIL_110C",
        orden: "1"
    },
        function () { _evaluarcontrato_7767(); },
        _datofecha_7767
    )
}

function _datofecha_7767() {
    $_FECHAAFILPACIW = momentMaskfechaafil.unmaskedValue;

    if ((($_EPSPACIW == 'EPS013') || ($_EPSPACIW == 'RES004')) && ($_FECHAAFILPACIW == '00000000')) {
        CON851('02', '02', null, 'error', 'error');
        _evaluarfechaafiliado();
        if ($_NITUSU == '0891855847') {
            _evaluarfechaafiliado();
        }
    } else if ($_FECHAAFILPACIW.trim() == '') {
        _evaluarcarnet_7767();

    } else if (($_FECHAACTUAL > 0) && ($_FECHAACTUAL < 1890)) {
        CON851('37', '37', null, 'error', 'error');
        _evaluarfechaafiliado();
    } else {
        _evaluarficha_7767();
    }
}

function _evaluarficha_7767() {
    validarInputs({
        form: "#FICHA_110C",
        orden: "1"
    },
        function () { _evaluarentidadafiliada_7767(); },
        _datoficha_7767
    )
}

function _datoficha_7767() {
    $_FICHAPACIW = $("#ficha_110c").val();
    _evaluarcarnet_7767();
}

function _evaluarcarnet_7767() {
    validarInputs({
        form: "#CARNET_110C",
        orden: "1"
    },
        function () { _evaluarficha_7767(); },
        _datocarnet_7767
    )
}
function _datocarnet_7767() {
    $_CARNETPACIW = $("#carnet_110c").val();
    _datovencerestriccion_7767();
}

function _datovencerestriccion_7767() {
    $_OPSEGU = "IS7677";
    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904_04,
        nombredll: 'CON904',
        carpeta: 'CONTAB'
    });
}

function _dataCON904_04(data) {
    // console.debug(data, "CON904-04");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _evaluarvence_7767();
    }
    else {
        CON851('01', '01', null, 'error', 'error');
        CON850(_dato_novedad_7767);
    }
}

function _evaluarvence_7767() {
    momentMaskfechavence.updateValue();
    validarInputs({
        form: "#FECHAVENCE_110C",
        orden: "1"
    },
        function () { _evaluarcarnet_7767(); },
        _datovence_7767
    )
}
function _datovence_7767() {
    $_FECHAVENCEPACIW = momentMaskfechavence.unmaskedValue;

    if (($_FECHAVENCEPACIW == '00000000') || ($_FECHAVENCEPACIW.trim() == '')) {

        if (($_TIPOAFILPACIW == '1') || $_TIPOAFILPACIW == '3') {
            $_IDCOTIPACIW = $_CODPACIW;
            $_DESCRIPCOTIPACW = $_APELLIDO1PACW + ' ' + $_APELLIDO2PACW + ' ' + $_NOMBRE1PACW + ' ' + $_NOMBRE2PACW;
            $_PARENTPACIW = '0';
            $("#cotizante_110c").val($_IDCOTIPACIW);
            $("#cotizanted_110c").val($_DESCRIPCOTIPACW);
            $("#parentezco_110c").val($_PARENTPACIW);

            _evaluarempresa_7767();
        } else {
            _datocotizante_7767();
        }

    } else {
        if ($_FECHAACTUAL > $_FECHAVENCEPACIW) {
            CON851('02', '02', null, 'error', 'error');
            $_CLASIFPACIW = 'R';
            $("#clasif_110c").val($_CLASIFPACIW);
            _evaluarvence_7767();
        } else {
            if (($_TIPOAFILPACIW == '1') || $_TIPOAFILPACIW == '3') {
                $_IDCOTIPACIW = $_CODPACIW;
                $_DESCRIPCOTIPACW = $_APELLIDO1PACW + ' ' + $_APELLIDO2PACW + ' ' + $_NOMBRE1PACW + ' ' + $_NOMBRE2PACW;
                $_PARENTPACIW = '0';
                $("#cotizante_110c").val($_IDCOTIPACIW);
                $("#cotizanted_110c").val($_DESCRIPCOTIPACW);
                $("#parentezco_110c").val($_PARENTPACIW);

                _evaluarempresa_7767();
            } else {
                _datocotizante_7767();
            }
        }
    }
}

function _datocotizante_7767() {
    if (($_TIPOAFILPACIW == '2') || ($_TIPOAFILPACIW == '4')) {
        ///NEXT SENTENCE
        _evaluarcotizante_7767();
    } else {
        if ((($_REGIMENPACIW == 'V') || ($_REGIMENPACIW == 'P') || ($_REGIMENPACIW == 'O')) || (($_TIPOAFILPACIW == '1') || ($_TIPOAFILPACIW == '3'))) {
            // $_IDCOTIPACIW =  $_CODPACIW; 
            _evaluarcotizante_7767();
        } else {
            _evaluarcotizante_7767();
        }
    }
}

function _evaluarcotizante_7767() {
    validarInputs({
        form: "#COTIZANTE_102",
        orden: "1"
    },
        function () { _evaluarvence_7767(); },
        _mostrarcotizante_7767
    )
}

function _mostrarcotizante_7767() {
    $_IDCOTIPACIW = $("#cotizante_110c").val();

    if ((($_TIPOAFILPACIW == '2') || ($_TIPOAFILPACIW == '4')) && ($_IDCOTIPACIW == $_CODPACIW)) {
        CON851('03', '03', null, 'error', 'error');
        _datocotizante_7767()

    } else if (($_TIPOAFILPACIW == '2') && (($_IDCOTIPACIW == '000000000000000') || ($_IDCOTIPACIW.trim() == ''))) {
        CON851('02', '02', null, 'error', 'error');
        _datocotizante_7767()

        if (($_NITUSU == '0800162035') && (($_ADMINW == 'ALMB') || ($_ADMINW == 'KAJU'))) {
            _evaluarempresa_7767();

        } else {
            if ($_NITUSU == '0800037202') {
                _evaluarempresa_7767()
            } else {
                _datocotizante_7767()
            }
        }
    }
    else if ($_IDCOTIPACIW == '000000000000000') {
        $_IDCOTIPACIW = '000000000000000';
        $_DESCRIPCOTIPACW = '';
        $_PARENTPACIW = '0';
        $("#cotizante_110c").val($_IDCOTIPACIW);
        $("#cotizanted_110c").val($_DESCRIPCOTIPACW);
        $("#parentezco_110c").val($_PARENTPACIW);
        _evaluarempresa_7767();

    }
    else if (($_TIPOAFILPACIW == '1') || $_TIPOAFILPACIW == '3') {
        $_IDCOTIPACIW = $_CODPACIW;
        $_DESCRIPCOTIPACW = $_APELLIDO1PACW + ' ' + $_APELLIDO2PACW + ' ' + $_NOMBRE1PACW + ' ' + $_NOMBRE2PACW;
        $_PARENTPACIW = '0';
        $("#cotizante_110c").val($_IDCOTIPACIW);
        $("#cotizanted_110c").val($_DESCRIPCOTIPACW);
        $("#parentezco_110c").val($_PARENTPACIW);

        _evaluarempresa_7767();
    }
    else {
        if ($_IDCOTIPACIW == $_CODPACIW) {
            $_DESCRIPCOTIPACW = '';
            $("#cotizanted_110c").val($_DESCRIPCOTIPACW);
            _validatipocotizante_7767()
            // _evaluarparentezcopaci_7767(); 
        } else {
            consultarcotizante_7767();
        }
    }
}

function consultarcotizante_7767() {
    LLAMADO_DLL({
        dato: [$_IDCOTIPACIW],
        callback: _dataSER810C,
        nombredll: 'SER810C',
        carpeta: 'SALUD'
    });

}

function _dataSER810C(data) {
    // console.debug(data, 'SER810C');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCOTIPACW = date[1];
    $_PARENTPACIW = date[2].trim();
    if (swinvalid == "00") {
        if (($_PARENTPACIW == '1') || ($_PARENTPACIW == '3')) {
            $("#cotizanted_110c").val($_DESCRIPCOTIPACW);
            _validatipocotizante_7767()

        } else {
            CON851('03', '03', null, 'error', 'error');
            _datocotizante_7767();
        }
    }
    else if (swinvalid == "01") {
        CON851P('08', '08', null, 'error', 'error');
        $_SWORK = 'S';
        if ($_SWORK = 'S') {
            //// CALL SER110CA
            ///// llama nuevamente el maestro de pacientes 
            //// GO TO MOSTRAR COTIZANTE 
        } else {
            _evaluarcotizante_7767();
        }

    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _validatipocotizante_7767() {
    if (($_TIPOAFILPACIW == '0') || ($_TIPOAFILPACIW == '1') || ($_TIPOAFILPACIW == '3')) {
        $_PARENTPACIW = '0';
        $("#parentezco_110c").val($_PARENTPACIW);
        _evaluarempresa_7767();
    } else {
        _evaluarparentezcopaci_7767()
    }
}


function _evaluarparentezcopaci_7767() {
    var parentezco = [
        { "COD": "1", "DESCRIP": "CONYUGUE" },
        { "COD": "2", "DESCRIP": "HIJO" },
        { "COD": "3", "DESCRIP": "PADRES" },
        { "COD": "4", "DESCRIP": "2 GRADO" },
        { "COD": "5", "DESCRIP": "3 GRADO" },
        { "COD": "6", "DESCRIP": "< 12" },
        { "COD": "7", "DESCRIP": "SUEGRO" },
        { "COD": "8", "DESCRIP": "OTR-BE" },
        { "COD": "0", "DESCRIP": "COTIZANTE" }
    ]
    POPUP({
        array: parentezco,
        titulo: 'RELACION CON EL COTIZ',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluarcotizante_7767
    },
        _seleccionrelacioncotiz_7767);
}

function _seleccionrelacioncotiz_7767(parentezco) {
    $_PARENTPACIW = parentezco.COD;
    switch (parentezco.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
            _evaluarempresa_7767();
            break;
        case '0':
            if ($_TIPOAFILPACIW == '2') {
                CON851('03', '03', null, 'error', 'error');
                _validatipocotizante_7767();
            } else {
                _evaluarempresa_7767();
            }
            break;
        default:
            _evaluarcotizante_7767();
            break;
    }
    $("#parentezco_110c").val(parentezco.COD + " - " + parentezco.DESCRIP);
}


function _evaluarempresa_7767() {
    validarInputs({
        form: "#EMPRESALAB_110C",
        orden: "1"
    },
        function () { _evaluarentidadafiliada_7767(); },
        _datoempresa_7767
    )
}

function _datoempresa_7767() {
    $_EMPRESAPACIW = $("#empresalab_110c").val();

    _evaluarvictimaconfli_7767();
}

function _evaluarvictimaconfli_7767() {
    validarInputs({
        form: "#VICTIMAC_110C",
        orden: "1"
    },
        function () { _evaluarentidadafiliada_7767(); },
        _datovictimaconfli_7767
    )
}

function _datovictimaconfli_7767() {
    $_VICTICONFLICPACIW = $("#victimac_110c").val();
    if ($_VICTICONFLICPACIW.trim() == '') {
        $_VICTICONFLICPACIW = 'N';
        $("#victimac_110c").val($_VICTICONFLICPACIW);
        _evaluarprograespeci_7767();

    } else if (($_VICTICONFLICPACIW == 'S') || ($_VICTICONFLICPACIW == 'N')) {
        _evaluarprograespeci_7767();

    } else {
        _evaluarvictimaconfli_7767()
    }

}

function _evaluarprograespeci_7767() {
    validarInputs({
        form: "#PROESPECIAL_110C",
        orden: "1"
    },
        function () { _evaluarvictimaconfli_7767(); },
        _datoprograespeci_7767
    )
}

function _datoprograespeci_7767() {
    $_PROGEPSPACIW = $("#proespecial_110c").val();
    if ($_PROGEPSPACIW.trim() == '') {
        $_PROGEPSPACIW = 'N';
        $("#proespecial_110c").val($_PROGEPSPACIW);
        _evaluaraltocosto_7767();

    } else if (($_PROGEPSPACIW == 'S') || ($_PROGEPSPACIW == 'N')) {
        _evaluaraltocosto_7767();

    } else {
        _evaluarprograespeci_7767();
    }
}

function _evaluaraltocosto_7767() {
    validarInputs({
        form: "#ALTOCOSTO_110C",
        orden: "1"
    },
        function () { _evaluarprograespeci_7767(); },
        _datoaltocosto_7767
    )
}

function _datoaltocosto_7767() {
    $_ALTCOSPACIW = $("#altocosto_110c").val();
    if ($_ALTCOSPACIW.trim() == '') {
        $_ALTCOSPACIW = 'N';
        $("#altocosto_110c").val($_ALTCOSPACIW);
        _evaluarcronico_7767();

    } else if (($_ALTCOSPACIW == 'S') || ($_ALTCOSPACIW == 'N')) {
        _evaluarcronico_7767();

    } else {
        _evaluaraltocosto_7767();
    }
}

function _evaluarcronico_7767() {
    validarInputs({
        form: "#CRONIC_110C",
        orden: "1"
    },
        function () { _evaluaraltocosto_7767(); },
        _datocronico_7767
    )
}

function _datocronico_7767() {
    $_CRONICOPACIW = $("#cronica_110c").val();
    if ($_CRONICOPACIW.trim() == '') {
        $_CRONICOPACIW = 'N';
        $("#cronica_110c").val($_CRONICOPACIW);
        _evaluarpatologia_7767();

    } else if (($_CRONICOPACIW == 'S') || ($_CRONICOPACIW == 'N')) {
        if ($_CRONICOPACIW == 'N') {
            $_PATOLCRONICPACIW = '000';
            $("#patologiacronica_110c").val($_PATOLCRONICPACIW);
            _evaluartutela_7767();
        } else {
            _evaluarpatologia_7767();
        }
    } else {
        _evaluarcronico_7767();
    }
}

function _evaluarpatologia_7767() {
    validarInputs({
        form: "#PATOLOGIA_110C",
        orden: "1"
    },
        function () { _evaluarcronico_7767(); },
        _datopatolcronic_7767
    )
}

function _datopatolcronic_7767() {
    $_PATOLCRONICPACIW = $("#patologiacronica_110c").val();

    if ($_CRONICOPACIW == 'S') {
        if ($_PATOLCRONICPACIW == '000') {
            _evaluartutela_7767();
        } else {
            LLAMADO_DLL({
                dato: [$_PATOLCRONICPACIW],
                callback: _dataSAL7767_09,
                nombredll: 'SAL7767_09',
                carpeta: 'SALUD'
            });
        }

    } else {
        $_PATOLCRONICPACIW = '000';
        $("#patologiacronica_110c").val($_PATOLCRONICPACIW);
        _evaluartutela_7767();
    }
}

// function _consultapatologias_SAL7767(error, results, fileds) {
//     console.debug(results);
//     if (error) throw error;
//     else {
//         console.debug(results, results.length);
//         for (var i in results) {
//             if (results[i].llave_cronic.trim() == $_PATOLCRONICPACIW) {
//                 console.log('encuentra patologias');
//                 _evaluartutela_7767();

//             } else if (i == results.length - 1) {
//                 console.log('no encuentra patologias');
//                 CON851('01', '01', null, 'error', 'error');
//                 _evaluarpatologia_7767();
//             }
//         }
//         if (results.length == 0) {
//             console.log('1 no encuentra patologias');
//             CON851('01', '01', null, 'error', 'error');
//             _evaluarpatologia_7767();
//         }
//     }
// }

function _dataSAL7767_09(data) {
    // console.debug(data, 'SAL7767_09');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _evaluartutela_7767();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarpatologia_7767();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluartutela_7767() {
    validarInputs({
        form: "#PACITUTELA_110C",
        orden: "1"
    },
        function () { _evaluarcronico_7767(); },
        _datotutela_7767
    )
}

function _datotutela_7767() {
    $_TUTELAPACIW = $("#pacitutela_110c").val();
    if ($_TUTELAPACIW.trim() == '') {
        $_TUTELAPACIW = 'N';
        $("#pacitutela_110c").val($_TUTELAPACIW);
        _evaluarclasificacion_7767();

    } else if (($_TUTELAPACIW == 'S') || ($_TUTELAPACIW == 'N')) {
        _evaluarclasificacion_7767();

    } else {
        _evaluartutela_7767();
    }
}

function _evaluarclasificacion_7767() {
    validarInputs({
        form: "#CLASIF_110C",
        orden: "1"
    },
        function () { _evaluarcronico_7767(); },
        _datoclasificacion_7767
    )
}

function _datoclasificacion_7767() {
    switch ($_NITUSU) {
        case "0844003225":
        case "0891855847":
        case "0800162035":
        case "0900541158":
        case "0900565371":
        case "0900566047":
        case "0900658867":
        case "0900405505":
        case "0900405505":
            $_CLASIFPACIW = '';
            $("#clasif_110c").val($_CLASIFPACIW);
            _evaluaracomp_7767();
            break;
        default:
            $_CLASIFPACIW = $("#clasif_110c").val();
            $_CODCLASP = $_CLASIFPACIW;
            if ($_CLASIFPACIW.trim() == '') {
                //// continuE
                _evaluarpoliconsulta_7767();
            } else {

                LLAMADO_DLL({
                    dato: [$_CODCLASP],
                    callback: _dataSAL7767_10,
                    nombredll: 'SAL7767_10',
                    carpeta: 'SALUD'
                });

            }
            break;
    }
}

function _dataSAL7767_10(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCLASIFICACION = date[1].trim();
    if (swinvalid == "00") {
        $("#clasifd_110c").val($_DESCRIPCLASIFICACION);
        $("#mamografia_110c").val('000000');
        $_ANOULTMAMOPACIW = $("#mamografia_110c").val();
        _evaluarpoliconsulta_7767();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarclasificacion_7767();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarpoliconsulta_7767() {
    validarInputs({
        form: "#POLICONSUL_110C",
        orden: "1"
    },
        function () { _evaluarclasificacion_7767(); },
        _datopoliconsulta_7767
    )
}

function _datopoliconsulta_7767() {

    $_MULTICONSULPACIW = $("#policonsul_110c").val();
    if ($_MULTICONSULPACIW.trim() == '') {
        $_MULTICONSULPACIW = 'N';
        $("#policonsul_110c").val($_MULTICONSULPACIW);
        _evaluaracomp_7767();

    } else if (($_MULTICONSULPACIW == 'S') || ($_MULTICONSULPACIW == 'N')) {
        _evaluaracomp_7767();

    } else {
        _evaluarpoliconsulta_7767();
    }
}

function _evaluaracomp_7767() {
    validarInputs({
        form: "#ACOMPAÑANTE_110C",
        orden: "1"
    },
        function () { _evaluarcronico_7767(); },
        _datoacompa_7767
    )
}

function _datoacompa_7767() {

    $_ACOMPAPACIW = $("#acompañante_110c").val();

    if ($_NITUSU == '0800251482') {
        _datomamo_7767();
    } else if ($_ACOMPAPACIW.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _evaluaracomp_7767();
    } else if ($_EPSPACIW == 'RES004') {
        _evaluarfechacertestu_7767();
    }
    else {
        _evaluartelefonoacomp();
    }
}

function _evaluartelefonoacomp() {
    validarInputs({
        form: "#TELFACOMP_110C",
        orden: "1"
    },
        function () { _evaluaracomp_7767(); },
        _datotelacomp_7767
    )
}

function _datotelacomp_7767() {
    $_TELACOMPACIW = $("#telefacomp_110c").val();

    if ($_TELACOMPACIW.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _evaluartelefonoacomp();
    } else {
        _datomamo_7767();
    }
}


function _evaluarfechacertestu_7767() {
    momentMaskcertestudio.updateValue();
    validarInputs({
        form: "#FECHAMATR_110C",
        orden: "1"
    },
        function () { _evaluaracomp_7767(); },
        _fechacertestudio_7767
    )
}

function _fechacertestudio_7767() {
    $_CERTESTUDPACIW = momentMaskcertestudio.unmaskedValue;
    $_ANOCERTESTUDPACIW = $_CERTESTUDPACIW.substring(0, 4);
    $_MESCERTESTUDPACIW = $_CERTESTUDPACIW.substring(4, 6);
    if ($_CERTESTUDPACIW == '000000') {
        $_CERTESTUDPACIW = '';
        _evaluarcerteco_7767();
    } else if (($_ANOCERTESTUDPACIW > 0) && ($_ANOCERTESTUDPACIW < 1890)) {
        CON851('37', '37', null, 'error', 'error');
        _evaluarfechacertestu_7767()
    } else {
        peridocerticado_7767();
    }
}
function peridocerticado_7767() {
    var pcertificados = [
        { "codigo": "1", "descripcion": "SEMESTRAL" },
        { "codigo": "2", "descripcion": "ANUAL" }
    ]
    POPUP({
        array: pcertificados,
        titulo: 'PERIODO CERT. ESTUDIO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: peridocerticado_7767
    },
        _seleccionarperiodo_7767);
}

function _seleccionarperiodo_7767(pcertificados) {
    $_PARENTPACIW = pcertificados.COD;
    switch (pcertificados.COD) {
        case '1':
        case '2':
            _validacionesperiodocert_7767();
            break;
        default:
            peridocerticado_7767();
            break;
    }
    $("#matr_110c").val(pcertificados.COD);
}
function _validacionesperiodocert_7767() {
    if ($_PERIESTUDPACIW == '1') {
        $_DIASESTUDIOW = (($_ANOACTUALW * 365.25) + ($_MESACTUALW * 30)) - (($_ANOCERTESTUDPACIW * 365.25) + ($_MESCERTESTUDPACIW * 30));
        if ($_DIASESTUDIOW > 180) {
            CON851('B8', 'B8', null, 'error', 'error');
            _seleccionarperiodo_7767();
        } else {
            _evaluarcerteco_7767();
        }
    } else {
        $_DIASESTUDIOW = (($_ANOACTUALW * 365.25) + ($_MESACTUALW * 30)) - (($_ANOCERTESTUDPACIW * 365.25) + ($_MESCERTESTUDPACIW * 30));
        if ($_DIASESTUDIOW > 360) {
            CON851('B8', 'B8', null, 'error', 'error');
            _seleccionarperiodo_7767();
        } else {
            _evaluarcerteco_7767();
        }
    }
}

function _evaluarcerteco_7767() {
    momentMaskcertecno.updateValue();
    validarInputs({
        form: "#FECHAECONO_110C",
        orden: "1"
    },
        function () { _evaluarfechacertestu_7767(); },
        _fechacerteco_7767
    )
}

function _fechacerteco_7767() {

    $_CERTECONOPACIW = momentMaskcertecno.unmaskedValue;
    $_ANOCERTECONOPACIW = $_CERTECONOPACIW.substring(0, 4);
    $_MESCERTECONOPACIW = $_CERTECONOPACIW.substring(4, 6);
    if ($_CERTECONOPACIW == '000000') {
        $_CERTECONOPACIW = '';
        _datomamo_7767();
    } else if (($_ANOCERTECONOPACIW > 0) && ($_ANOCERTECONOPACIW < 1890)) {
        CON851('37', '37', null, 'error', 'error');
        _evaluarcerteco_7767();
    } else {
        _peridocerticadoeco_7767();
    }
}

function peridocerticado_7767() {
    var periodo = [
        { "codigo": "1", "descripcion": "SEMESTRAL" },
        { "codigo": "2", "descripcion": "ANUAL" }
    ]
    POPUP({
        array: periodo,
        titulo: 'PERIODO CERT. ECO. ESTUDIO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluarcerteco_7767()
    },
        _seleccionarperiodoeco_7767);
}

function _seleccionarperiodoeco_7767(periodo) {
    $_PERIECOPACIW = periodo.COD;
    switch (periodo.COD) {
        case '1':
        case '2':
            _validacionesperiodoeco_7767();
            break;
        default:
            _evaluarcerteco_7767();
            break;
    }
    $("#econo_110c").val(periodo.COD);
}

function _validacionesperiodoeco_7767() {
    if ($_PERIECOPACIW == '1') {
        $_DIASESCOW = (($_ANOACTUALW * 365.25) + ($_MESACTUALW * 30)) - (($_ANOCERTECONOPACIW * 365.25) + ($_MESCERTECONOPACIW * 30));
        if ($_DIASESCOW > 180) {
            CON851('4G', '4G', null, 'error', 'error');
            _seleccionarperiodoeco_7767();
        } else {
            _datomamo_7767();
        }
    } else {
        $_DIASESTUDIOW = (($_ANOACTUALW * 365.25) + ($_MESACTUALW * 30)) - (($_ANOCERTECONOPACIW * 365.25) + ($_MESCERTECONOPACIW * 30));
        if ($_DIASESCOW > 360) {
            CON851('4G', '4G', null, 'error', 'error');
            _seleccionarperiodoeco_7767();
        } else {
            _datomamo_7767();
        }
    }
}

function _datomamo_7767() {
    if (($_NITUSU == '0830092718') && (($_SEXOPACIW == 'F') || ($_SEXOPACIW == 'f'))) {
        _evaluarultimomamo();
    } else {
        _evaluarrestriccion();
    }
}

function _evaluarultimomamo() {

    validarInputs({
        form: "#MAMOGRAFIA_110C",
        orden: "1"
    },
        function () { _evaluartelefonoacomp(); },
        _ultmamografia_7767
    )
}

function _ultmamografia_7767() {
    $_ULTMAMOPACIW = $("#acompañante_110c").val();
    $_ANOULTMAMOPACIW = $_ULTMAMOPACIW.substring(0, 4);
    $_MESULTMAMOPACIW = $_ULTMAMOPACIW.substring(4, 6);

    if ($_ULTMAMOPACIW == '000000') {
        $_ULTMAMOPACIW = '';
        _evaluarrestriccion();

    } else if ($_NOVEDAD7767 == 7) {
        _evaluardatonitfact_7767();
    }
    else {
        if ($_ANOULTMAMOPACIW < 2000) {
            CON851('03', '03', null, 'error', 'error');
            _evaluarultimomamo();
        } else {
            _evaluarrestriccion();
        }
    }
}

function _evaluarrestriccion() {

    validarInputs({
        form: "#RESTRIC_110C",
        orden: "1"
    },
        function () { _evaluarultimomamo(); },
        _datorestriccion_7767
    )
}

function _datorestriccion_7767() {

    $_RESTAPLIPACIW = $("#restric_110c").val();

    // if(($_RESTCONSPACIW = 'N') || ($_RESTADONPACIW = 'N') || ($_RESTPYPPACIW = 'N') || ($_RESTLABOPACIW = 'N') || ($_RESTIMAGPACIW = 'N') || ($_RESTDROGPACIW = 'N') || ($_RESTTERFPACIW = 'N') || ($_RESTTEROPACIW = 'N') || ($_RESTESTAPACIW = 'N')){
    //     $_RESTAPLIPACIW = 'S'; 
    //     $("#restric_110c").val($_RESTAPLIPACIW);
    //     _evaluarrestriconsulta();
    if ($_RESTAPLIPACIW.trim() == '') {
        $_RESTAPLIPACIW = 'N';
        $("#restric_110c").val($_RESTAPLIPACIW);
        _evaluarrestriconsulta();
    } else if (($_RESTAPLIPACIW == 'S') || ($_RESTAPLIPACIW == 'N')) {
        _evaluarrestriconsulta();
    } else {
        _evaluarrestriccion();
    }
}

function _evaluarrestriconsulta() {

    validarInputs({
        form: "#CONSULT_110C",
        orden: "1"
    },
        function () { _evaluarrestriccion(); },
        _datorestriccionconsult_7767
    )
}

function _datorestriccionconsult_7767() {
    $_RESTCONSPACIW = $("#consult_110c").val();
    if ($_RESTCONSPACIW.trim() == '') {
        $_RESTCONSPACIW = 'S';
        $("#consult_110c").val($_RESTCONSPACIW);
        _evaluarrestriodont();

    } else if (($_RESTCONSPACIW == 'S') || ($_RESTCONSPACIW == 'N')) {
        _evaluarrestriodont();
    } else {
        _evaluarrestriconsulta();
    }
}

function _evaluarrestriodont() {

    validarInputs({
        form: "#ODONT_110C",
        orden: "1"
    },
        function () { _evaluarrestriconsulta(); },
        _datorestriccionodont_7767
    )
}

function _datorestriccionodont_7767() {
    $_RESTADONPACIW = $("#odont_110c").val();

    if ($_RESTADONPACIW.trim() == '') {
        $_RESTADONPACIW = 'S';
        $("#odont_110c").val($_RESTADONPACIW);
        _evaluarrestripyp();

    } else if (($_RESTADONPACIW == 'S') || ($_RESTADONPACIW == 'N')) {
        _evaluarrestripyp();
    } else {
        _evaluarrestriodont();
    }
}

function _evaluarrestripyp() {

    validarInputs({
        form: "#PYP_110C",
        orden: "1"
    },
        function () { _evaluarrestriodont(); },
        _datorestriccionpyp_7767
    )
}

function _datorestriccionpyp_7767() {
    $_RESTPYPPACIW = $("#pyp_110c").val();
    if ($_RESTPYPPACIW.trim() == '') {
        $_RESTPYPPACIW = 'S';
        $("#pyp_110c").val($_RESTPYPPACIW);
        _evaluarrestrilabo();

    } else if (($_RESTPYPPACIW == 'S') || ($_RESTPYPPACIW == 'N')) {
        _evaluarrestrilabo();
    } else {
        _evaluarrestripyp();
    }
}

function _evaluarrestrilabo() {

    validarInputs({
        form: "#LAB_110C",
        orden: "1"
    },
        function () { _evaluarrestripyp(); },
        _datorestriccionlabo_7767
    )
}

function _datorestriccionlabo_7767() {
    $_RESTLABOPACIW = $("#lab_110c").val();
    if ($_RESTLABOPACIW.trim() == '') {
        $_RESTLABOPACIW = 'S';
        $("#lab_110c").val($_RESTLABOPACIW);
        _evaluarrestrirx();

    } else if (($_RESTLABOPACIW == 'S') || ($_RESTLABOPACIW == 'N')) {
        _evaluarrestrirx();
    } else {
        _evaluarrestripyp();
    }
}

function _evaluarrestrirx() {

    validarInputs({
        form: "#RX_110C",
        orden: "1"
    },
        function () { _evaluarrestrilabo(); },
        _datorestriccionrx_7767
    )
}

function _datorestriccionrx_7767() {
    $_RESTIMAGPACIW = $("#rx_110c").val();
    if ($_RESTIMAGPACIW.trim() == '') {
        $_RESTIMAGPACIW = 'S';
        $("#rx_110c").val($_RESTIMAGPACIW);
        _evaluarrestridrog();

    } else if (($_RESTIMAGPACIW == 'S') || ($_RESTIMAGPACIW == 'N')) {
        _evaluarrestridrog();
    } else {
        _evaluarrestrirx();
    }
}

function _evaluarrestridrog() {

    validarInputs({
        form: "#DROG_110C",
        orden: "1"
    },
        function () { _evaluarrestrirx(); },
        _datorestricciondrog_7767
    )
}

function _datorestricciondrog_7767() {
    $_RESTDROGPACIW = $("#drog_110c").val();
    if ($_RESTDROGPACIW.trim() == '') {
        $_RESTDROGPACIW = 'S';
        $("#drog_110c").val($_RESTDROGPACIW);
        _evaluarrestriterap();

    } else if (($_RESTDROGPACIW == 'S') || ($_RESTDROGPACIW == 'N')) {
        _evaluarrestriterap();
    } else {
        _evaluarrestridrog();
    }
}

function _evaluarrestriterap() {

    validarInputs({
        form: "#FISIOT_110C",
        orden: "1"
    },
        function () { _evaluarrestridrog(); },
        _datorestriccionfisioterap_7767
    )
}

function _datorestriccionfisioterap_7767() {
    $_RESTTERFPACIW = $("#fisiot_110c").val();
    if ($_RESTTERFPACIW.trim() == '') {
        $_RESTTERFPACIW = 'S';
        $("#fisiot_110c").val($_RESTTERFPACIW);
        _evaluarrestriotratera();

    } else if (($_RESTTERFPACIW == 'S') || ($_RESTTERFPACIW == 'N')) {
        _evaluarrestriotratera();
    } else {
        _evaluarrestriterap();
    }
}

function _evaluarrestriotratera() {

    validarInputs({
        form: "#TERAP_110C",
        orden: "1"
    },
        function () { _evaluarrestridrog(); },
        _datorestriccionotraterap_7767
    )
}

function _datorestriccionotraterap_7767() {
    $_RESTTEROPACIW = $("#terap_110c").val();
    if ($_RESTTEROPACIW.trim() == '') {
        $_RESTTEROPACIW = 'S';
        $("#terap_110c").val($_RESTTEROPACIW);
        _evaluarrestricirugia();

    } else if (($_RESTTEROPACIW == 'S') || ($_RESTTEROPACIW == 'N')) {
        _evaluarrestricirugia();
    } else {
        _evaluarrestriotratera();
    }
}

function _evaluarrestricirugia() {

    validarInputs({
        form: "#CIRUG_110C",
        orden: "1"
    },
        function () { _evaluarrestriotratera(); },
        _datorestriccioncirugia_7767
    )
}

function _datorestriccioncirugia_7767() {
    $_RESTCIRUPACIW = $("#cirug_110c").val();
    if ($_RESTCIRUPACIW.trim() == '') {
        $_RESTCIRUPACIW = 'S';
        $("#cirug_110c").val($_RESTCIRUPACIW);
        _evaluarrestriestancia();

    } else if (($_RESTCIRUPACIW == 'S') || ($_RESTCIRUPACIW == 'N')) {
        _evaluarrestriestancia();
    } else {
        _evaluarrestricirugia();
    }
}

function _evaluarrestriestancia() {

    validarInputs({
        form: "#ESTANC_110C",
        orden: "1"
    },
        function () { _evaluarrestriotratera(); },
        _datorestriccionestancia_7767
    )
}

function _datorestriccionestancia_7767() {
    $_RESTESTAPACIW = $("#estanc_110c").val();
    if ($_RESTESTAPACIW.trim() == '') {
        $_RESTESTAPACIW = 'S';
        $("#estanc_110c").val($_RESTESTAPACIW);
        _evaluarvcm_7767();

    } else if (($_RESTESTAPACIW == 'S') || ($_RESTESTAPACIW == 'N')) {
        _evaluarvcm_7767();

    } else {
        _evaluarrestriestancia();
    }
}

function _evaluarvcm_7767() {

    validarInputs({
        form: "#VCM_110C",
        orden: "1"
    },
        function () { _evaluarrestriestancia(); },
        _datovcm_7767
    )
}

function _datovcm_7767() {
    $_VCMPACIW = $("#vcm_110c").val();

    if ($_VCMPACIW.trim() == '') {
        $_VCMPACIW = 'N';
        $("#vcm_110c").val($_VCMPACIW);

        if ($_NOVEDAD7767 == '7') {
            $_DERECHOPACIW = '3 - Creado por el  usuario';
            $("#basedatos_110c").val($_DERECHOPACIW);
            _evaluarobservaciones_7767();
        } else {
            // _evaluarestado_7767();
            _datoestado_7767();
        }

    } else if (($_VCMPACIW == 'S') || ($_VCMPACIW == 'N')) {
        if ($_NOVEDAD7767 == '7') {
            $_DERECHOPACIW = '3 - Creado por el  usuario';
            $("#basedatos_110c").val($_DERECHOPACIW);
            _evaluarobservaciones_7767();
        } else {
            // _evaluarestado_7767();
            _datoestado_7767();
        }
    } else {
        _evaluarvcm_7767();
    }
}


function _evaluarestado_7767() {

    validarInputs({
        form: "#BASEDATOS_110C",
        orden: "1"
    },
        function () { _evaluarrestriestancia(); },
        _datoestado_7767
    )
}

function _datoestado_7767() {

    if ($_NOVEDAD7767 == '8') {
        var derecho = [
            { "COD": "1", "DESCRIP": "En base de datos, ACTIVO" },
            { "COD": "2", "DESCRIP": "En base de datos, INACTIVO" },
            { "COD": "3", "DESCRIP": "Creado por el  usuario" },
            { "COD": "4", "DESCRIP": "Pendiente por determinar" },
            { "COD": "5", "DESCRIP": "En base de datos, SIN CARNET" },
            { "COD": "6", "DESCRIP": "SUSPENDIDO, requiere autoriz" },
            { "COD": "7", "DESCRIP": "Afiliado Fallecido" },
            { "COD": "8", "DESCRIP": "Retiro X Multiafiliado" },
            { "COD": "9", "DESCRIP": "Ingreso X Traslado" },
            { "COD": "A", "DESCRIP": "Retiro  X Traslado" },
            { "COD": "B", "DESCRIP": "Periodo integral" }
        ]
        POPUP({
            array: derecho,
            titulo: 'COMPROBACION DE DERECHOS',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: consultarocupacion_7767
        },
            _seleccionderecho_7767);
    }
}

function _seleccionderecho_7767(derecho) {

    $_DERECHOPACIW = derecho.COD;
    switch (derecho.COD) {
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
            _evaluarobservaciones_7767();
            break;
        default:
            consultarocupacion_7767();
            break;
    }
    $("#basedatos_110c").val(derecho.COD + " - " + derecho.DESCRIP);
}

function _evaluarobservaciones_7767() {
    validarInputs({
        form: "#OBSERVACIONES_110C",
        orden: "1"
    },
        function () { _evaluarrestriestancia(); },
        _datoobservaciones_7767
    )
}

function _datoobservaciones_7767() {
    $_OBSERVPACIW = $("#observaciones_110c").val();
    _datodiscapacidad_7767();
}

function _datodiscapacidad_7767() {
    // var discapacidad = '[{"codigo": "1","descripcion": "SIN DISCAPACI"},{"codigo": "2","descripcion": "DISC.FISICA"},{"codigo": "3", "descripcion": "DISC.AUDITIVA"},{"codigo": "4","descripcion": "DISC.VISUAL"},{"codigo": "5","descripcion": "DISC.MENTAL"},{"codigo": "6","descripcion": "DISC.COGNITIV"}]'
    // var discapacidades = JSON.parse(discapacidad);
    // POPUP({
    //     array: discapacidades,
    //     titulo: 'TIPO DE DISCAPACIDAD'
    // },
    //     _seleccionardiscapacidad_7767);
    var discapacidad = [
        { "COD": "1", "DESCRIP": "SIN DISCAPACI" },
        { "COD": "2", "DESCRIP": "DISC.FISICA" },
        { "COD": "3", "DESCRIP": "DISC.AUDITIVA" },
        { "COD": "4", "DESCRIP": "DISC.VISUAL" },
        { "COD": "5", "DESCRIP": "DISC.MENTAL" },
        { "COD": "6", "DESCRIP": "DISC.COGNITIV" }
    ]
    POPUP({
        array: discapacidad,
        titulo: 'TIPO DE DISCAPACIDAD',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: consultarocupacion_7767
    },
        _seleccionardiscapacidad_7767);
}

function _seleccionardiscapacidad_7767(discapacidad) {

    $_DISCAPPACIW = discapacidad.COD;
    switch (discapacidad.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
            if ($_NOVEDAD7767 == '7') {
                $("#entidad_110c").val('0');
                _evaluarentidadfact_7767();
            } else {
                _evaluarentidadfact_7767();
            }
            break;
        default:
            _evaluarobservaciones_7767();
            break;
    }
    $("#discapacidad_110c").val(discapacidad.COD + " - " + discapacidad.DESCRIP);
}


function _evaluarentidadfact_7767() {
    validarInputs({
        form: "#ENTIDAD_102",
        orden: "1"
    },
        function () { _datodiscapacidad_7767(); },
        _validacionentidadfact_7767
    )
}

function _validacionentidadfact_7767() {

    if ($_NITUSU == '0830092718') {
        switch ($_PREFIJOUSU) {
            case "TU":
                $_ENTIFACTPACIW = '0800209488';
                $("#entidad_110c").val($_ENTIFACTPACIW);
                _leernitfact_7767();
            case "SB":
                $_ENTIFACTPACIW = '0800216883';
                $("#entidad_110c").val($_ENTIFACTPACIW);
                _leernitfact_7767();
                break;
            default:
                break;
        }
    } else {

        $_ENTIFACTPACIW = $('#entidad_110c').val();

        if ($_ENTIFACTPACIW == '0') {
            $_DESCRIPENTIPACIW = '';
            $("#entidadd_110c").val($_DESCRIPENTIPACIW);
            _evaluarembarazoriesgo_7767();
            // $_ENTIFACTPACIW = $_NITENT
            // _leernitfact_7767(); 

        } else if (($_ENTIFACTPACIW == '0') && ($_NITUSU != '0892000401') && ($_NITUSU != '830092718')) {
            $_DESCRIPENTIPACIW = '';
            $("#entidadd_110c").val($_DESCRIPENTIPACIW);
            _evaluarembarazoriesgo_7767();
            //////////////////
        } else {
            LLAMADO_DLL({
                dato: [$_ENTIFACTPACIW],
                callback: _dataSAL7767_11,
                nombredll: 'SAL7767_11',
                carpeta: 'SALUD'
            });
        }
    }
}

function _dataSAL7767_11(data) {
    // console.log(data, "SAL7767-11");
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPENTIPACIW = date[1].trim();
    if (swinvalid == "00") {
        $("#entidadd_110c").val($_DESCRIPENTIPACIW);
        if (($_ENTIFACTPACIW > '0') && ($_ENTIFACTPACIW != $_NITFACTPACIW)) {
            $_FECHANITPACIW = moment().format('YYYYMMDD');
            $("#fechasistd_110c").val($_FECHANITPACIW);
            _evaluarembarazoriesgo_7767();

        } else if ($_NITUSU == '0830092718') {
            _evaluarantecendentescancer();
        } else {
            _leernitfact_7767();
        }
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarentidadfact_7767();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function _evaluarembarazoriesgo_7767() {
    validarInputs({
        form: "#ALGORIESGO_110C",
        orden: "1"
    },
        function () { _evaluarentidadfact_7767(); },
        _datoembarazo_7767
    )
}

function _datoembarazo_7767() {

    $_EMBALTOPACIW = $("#altoriesgo_110c").val();

    if ((($_SEXOPACIW == 'M') || ($_SEXOPACIW == 'm')) || ($_UNIDEDADW != 'A') || ($_VLREDADW < 8)) {
        $_EMBALTOPACIW = '';
        $("#altoriesgo_110c").val($_EMBALTOPACIW);
        _evaluarmedicofami_7767();
    } else if (($_EMBALTOPACIW.trim() == '') || ($_EMBALTOPACIW == 'S') || ($_EMBALTOPACIW == 'N')) {
        _evaluarmedicofami_7767();
    } else if ($_EMBALTOPACIW == 'S') {
        CON851('EH', 'EH', null, 'error', 'error');
        _evaluarmedicofami_7767();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluarembarazoriesgo_7767();
    }
}

function _evaluarmedicofami_7767() {
    validarInputs({
        form: "#MEDICOFAM_102",
        orden: "1"
    },
        function () { _evaluarembarazoriesgo_7767(); },
        _datomedicofami_7767
    )
}

function _datomedicofami_7767() {

    $_MEDFAMIPACIW = $("#medicofam_110c").val();
    if (($_MEDFAMIPACIW == '0') || ($_MEDFAMIPACIW.trim() == '')) {
        $_DESCRIPMEDPACIW = '';
        $("#medicofamd_110c").val($_DESCRIPMEDPACIW);
        _evaluaremail_7767();
    } else {
        LLAMADO_DLL({
            dato: [$_MEDFAMIPACIW],
            callback: _dataSAL7767_12,
            nombredll: 'SAL7767_12',
            carpeta: 'SALUD'
        });
    }
}

function _dataSAL7767_12(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPMEDPACIW = date[1].trim();
    if (swinvalid == "00") {
        $("#medicofamd_110c").val($_DESCRIPMEDPACIW);
        _evaluaremail_7767();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarmedicofami_7767();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluaremail_7767() {
    validarInputs({
        form: "#CORREOPACI_110C",
        orden: "1"
    },
        function () { _evaluarentidadfact_7767(); },
        _datoemail_7767
    )
}

function _datoemail_7767() {
    if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
        confirmar_7767();
    }
    $_EMAILPACIW = $("#correopacie_110c").val();

    if ($_EMAILPACIW != '') {
        $_SWBUSCAR = '0';
        if ($_SWBUSCAR != '1') {
            CON851('03', '03', null, 'error', 'error');
            _evaluaremail_7767();
        } else if (($_SWBUSCAR < '1') || ($_SWBUSCAR > '3')) {
            CON851('03', '03', null, 'error', 'error');
            _evaluaremail_7767();
        }
    } else if (($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
        swinvalid = '0';
    } else {
        confirmar_7767();
    }
}

function confirmar_7767() {
    bootbox.confirm({
        size: "small",
        onEscape: false,
        message: "DESEA GRABAR LOS DATOS?",
        buttons: {
            confirm: {
                label: 'Si',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }

        },
        callback: function (result) {
            if (result == true) {
                _grabarcorresponsalia();

            }
            else {
                _evaluarentidadfact_7767();
            }
        }
    })
}



//////////////////////////////// NOVEDAD 8  Y 9//////////////////////////////
function _cambioregistro_7767() {
    $_ETNIAPACIW = "";
    if (($_EMBALTOPACIW == "S") || ($_EMBALTOPACIW == "N")) {

        setTimeout(_dato4_7767, 100);
        _consultademostrarinf_7767();

    }
    else {
        $_EMBALTOPACIW = "";
        setTimeout(_dato4_7767, 100);
        _consultademostrarinf_7767();

    }
}

function _consultademostrarinf_7767() {
    LLAMADO_DLL({
        dato: [$_CODPACIW],
        callback: _dataSAL7767_03,
        nombredll: 'SAL7767_03',
        carpeta: 'SALUD'
    });

}

function _dataSAL7767_03(data) {
    // console.log(data, 'SAL7767_03');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_CODPACIW = date[1].trim();
    $_TIPOPACIW = date[2].trim();
    $_LUGARIDPACIW = date[3].trim();
    $_DECRIPPACIW = date[4].trim();

    $_APELLIDO1PACW = $_DECRIPPACIW.substring(0, 14);

    $_PERAPEL1PACIW = $_DECRIPPACIW.substring(0, 1);
    $_PERAPEL2PACIW = $_DECRIPPACIW.substring(1, 14);

    $_APELLIDO2PACW = $_DECRIPPACIW.substring(14, 29);

    $_PERANOM1PACIW = $_DECRIPPACIW.substring(14, 15);
    $_PERANOM2PACIW = $_DECRIPPACIW.substring(15, 30);

    $_NOMBRE1PACW = $_DECRIPPACIW.substring(29, 41);

    $_NOMBRE2PACW = $_DECRIPPACIW.substring(41, 54);


    $_NACIMPACIW = date[5].trim();
    $_ANOPACW = $_NACIMPACIW.substring(0, 4);
    $_MESPACW = $_NACIMPACIW.substring(4, 6);
    $_DIAPACW = $_NACIMPACIW.substring(6, 8);

    $_HEMOCLASPAC = date[6].trim();
    $_GRPSANGPACIW = $_HEMOCLASPAC.substring(0, 1);
    $_RHPACIW = $_HEMOCLASPAC.substring(1, 3);

    $_SEXOPACIW = date[7].trim();
    $_ESTCIVILPACIW = date[8].trim();
    $_NIVESTUPACIW = date[9].trim();
    $_ZONAPACIW = date[10].trim();
    $_PADREPACIW = date[11].trim();
    $_MADREPACIW = date[12].trim();
    $_DIRPACIW = date[13].trim();
    $_TELPACIW = date[14].trim();
    $_CELPACIW = date[15].trim();
    $_CIUPACIW = date[16].trim();
    $_NOMCIUPACIW = date[17].trim();
    $_OCUPPACIW = date[18].trim();
    $_NOMOCUPPACIW = date[19].trim();
    $_PAISPACIW = date[20].trim();
    $_ESTRATOPACIW = date[21].trim();
    $_COPAGOPACIW = date[22].trim();
    $_REGIMENPACIW = date[23].trim();
    $_INSTITUTOPACIW = date[24].trim();
    $_DESCRIPINSTIPACIW = date[25].trim();
    $_ETNIAPACIW = date[26].trim();
    $_TIPOAFILPACIW = date[27].trim();
    $_PORTABPACIW = date[28].trim();
    $_CIUDASEGPACIW = date[29].trim();
    $_EPSPACIW = date[30].trim();
    $_NOMEPSPACIW = date[31].trim();
    $_CONTRATOPACIW = date[32].trim();
    $_FECHAAFILPACIW = date[33].trim();
    $_FICHAPACIW = date[34].trim();
    $_CARNETPACIW = date[35].trim();
    $_FECHAVENCEPACIW = date[36].trim();
    $_FECHADEMPACIW = date[37].trim();
    $_DEMANINDPACIW = date[38].trim();
    $_IDCOTIPACIW = date[39].trim();
    $_DESCRIPCOTIPACW = date[40].trim();
    $_PARENTPACIW = date[41].trim();
    $_VICTICONFLICPACIW = date[42].trim();
    $_PROGEPSPACIW = date[43].trim();
    $_ALTCOSPACIW = date[44].trim();
    $_TUTELAPACIW = date[45].trim();
    $_EMPRESAPACIW = date[46].trim();
    $_CRONICOPACIW = date[47].trim();
    $_PATOLCRONICPACIW = date[48].trim();
    $_CLASIFPACIW = date[49].trim();
    $_ACOMPAPACIW = date[50].trim();
    $_TELACOMPACIW = date[51].trim();
    $_CERTESTUDPACIW = date[52].trim();
    $_PERIESTUDPACIW = date[53].trim();
    $_ULTMAMOPACIW = date[54].trim();
    $_CERTECONOPACIW = date[55].trim();
    $_PERIECOPACIW = date[56].trim();
    $_MULTICONSULPACIW = date[57].trim();
    $_RESTRICCIONPACIW = date[58].trim();
    $_RESTAPLIPACIW = $_RESTRICCIONPACIW.substring(0, 1);
    $_RESTDROGPACIW = $_RESTRICCIONPACIW.substring(1, 2);
    $_RESTCIRUPACIW = $_RESTRICCIONPACIW.substring(2, 3);
    $_RESTLABOPACIW = $_RESTRICCIONPACIW.substring(3, 4);
    $_RESTIMAGPACIW = $_RESTRICCIONPACIW.substring(4, 5);
    $_RESTESTAPACIW = $_RESTRICCIONPACIW.substring(5, 6);
    $_RESTCONSPACIW = $_RESTRICCIONPACIW.substring(6, 7);
    $_RESTTERFPACIW = $_RESTRICCIONPACIW.substring(7, 8);
    $_RESTTEROPACIW = $_RESTRICCIONPACIW.substring(8, 9);
    $_RESTADONPACIW = $_RESTRICCIONPACIW.substring(9, 10);
    $_RESTPYPPACIW = $_RESTRICCIONPACIW.substring(10, 11);
    $_VCMPACIW = date[59].trim();
    $_DERECHOPACIW = date[60].trim();
    $_OBSERVPACIW = date[61].trim();
    $_DISCAPPACIW = date[62].trim();
    $_EMBALTOPACIW = date[63].trim();
    $_ENTIFACTPACIW = date[64].trim();
    $_DESCRIPENTIPACIW = date[65].trim();
    $_FECHANITPACIW = date[66].trim();
    $_ANTCANCERPACIW = date[67].trim();
    $_MEDFAMIPACIW = date[68].trim();
    $_DESCRIPMEDPACIW = date[69].trim();

    if (swinvalid == '00') {
        LLAMADO_DLL({
            dato: [$_CODPACIW],
            callback: _dataSAL7767_03_1,
            nombredll: 'SAL7767_03_1',
            carpeta: 'SALUD'
        });
    }
    else {
        CON852(date[1], date[2], date[3], _toogleNav);
    }
}

function _dataSAL7767_03_1(data) {
    // console.debug(data, 'SAL7767_03_01');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_CODPACIW = date[1].trim();
    $_COMUNIPACW = date[2].trim();
    $_RESGUARPACIW = date[3].trim();
    $_EMAILPACIW = date[4].trim();
    $_DATOACTPACIW = date[5].trim();
    $_OPERCREAPACIW = $_DATOACTPACIW.substring(0, 4);
    $_FECHACREAPACIW = $_DATOACTPACIW.substring(4, 12);
    $_HORACREAPACIW = $_DATOACTPACIW.substring(12, 16);
    $_OPERMODIFPACIW = $_DATOACTPACIW.substring(16, 20);
    $_FECHAMODIFPACIW = $_DATOACTPACIW.substring(20, 28);
    $_HORAMODIFPACIW = $_DATOACTPACIW.substring(28, 32);
    if (swinvalid == '00') {
        _mostrardatos_7767();
    }
    else {
        CON852(date[1], date[2], date[3], _toogleNav);
    }
}


function _mostrardatos_7767() {

    $('#numero_110c').val($_CODPACIW);
    $('#identif_110c').val($_TIPOPACIW);
    $('#lugar_110c').val($_LUGARIDPACIW);
    $('#apellido1_110c').val($_APELLIDO1PACW);
    $('#apellido2_110c').val($_APELLIDO2PACW);
    $('#nombre1_110c').val($_NOMBRE1PACW);
    $('#nombre2_110c').val($_NOMBRE2PACW);
    $_ANONACIMPACIW = $_NACIMPACIW.substring(0, 4);
    $_MESNACIMPACIW = $_NACIMPACIW.substring(4, 6);
    $_DIANACIMPACIW = $_NACIMPACIW.substring(6, 8);
    $('#nacimiento_110c').val($_ANONACIMPACIW + '/' + $_MESNACIMPACIW + '/' + $_DIANACIMPACIW);
    $_EDADPACW = $_ANOACTUALW - $_ANONACIMPACIW;

    $('#edad_110c').val($_EDADPACW);

    $('#gruposang_110c').val($_GRPSANGPACIW);
    $('#rh_110c').val($_RHPACIW);
    $('#sexo_110c').val($_SEXOPACIW);
    $('#civil_110c').val($_ESTCIVILPACIW);
    $('#estudio_110c').val($_NIVESTUPACIW);
    $('#zona_110c').val($_ZONAPACIW);
    $('#padre_110c').val($_PADREPACIW);
    $('#madre_110c').val($_MADREPACIW);
    $('#direccion_110c').val($_DIRPACIW);
    $('#tel1_110c').val($_TELPACIW);
    $('#tel2_110c').val($_CELPACIW);
    $('#ciudad_110c').val($_CIUPACIW);
    $('#ciudadd_110c').val($_NOMCIUPACIW);
    $('#ocupacion_110c').val($_OCUPPACIW);
    $('#ocupaciond_110c').val($_NOMOCUPPACIW);
    $('#pais_110c').val($_PAISPACIW);
    $('#nivel_110c').val($_ESTRATOPACIW);
    $('#copago_110c').val($_COPAGOPACIW);
    $('#regimen_110c').val($_REGIMENPACIW);
    $('#colegio_110c').val($_INSTITUTOPACIW);
    $('#etnia_110c').val($_ETNIAPACIW);
    $('#comunidades_110c').val($_COMUNIPACW);
    $('#resguardos_110c').val($_RESGUARPACIW);
    $('#tipoafil_110c').val($_TIPOAFILPACIW);
    $('#portabilidad_110c').val($_PORTABPACIW);
    $('#ciudadorig_110C').val($_CIUDASEGPACIW);
    $('#eps_110c').val($_EPSPACIW);
    $('#epsd_110c').val($_NOMEPSPACIW);
    $('#contrato_110c').val($_CONTRATOPACIW);
    $_ANOAFILPACIW = $_FECHAAFILPACIW.substring(0, 4);
    $_MESAFILPACIW = $_FECHAAFILPACIW.substring(4, 6);
    $_DIAAFILPACIW = $_FECHAAFILPACIW.substring(6, 8);
    $('#fechaafil_110c').val($_ANOAFILPACIW + '/' + $_MESAFILPACIW + '/' + $_DIAAFILPACIW);
    $('#ficha_110c').val($_FICHAPACIW);
    $('#carnet_110c').val($_CARNETPACIW);
    $_ANOVENCEPACIW = $_FECHAVENCEPACIW.substring(0, 4);
    $_MESVENCEPACIW = $_FECHAVENCEPACIW.substring(4, 6);
    $_DIAVENCEPACIW = $_FECHAVENCEPACIW.substring(6, 8);
    $('#fechavence_110c').val($_ANOVENCEPACIW + '/' + $_MESVENCEPACIW + '/' + $_DIAVENCEPACIW);
    $_ANODEMPACIW = $_FECHADEMPACIW.substring(0, 4);
    $_MESDEMPACIW = $_FECHADEMPACIW.substring(4, 6);
    $_DIADEMPACIW = $_FECHADEMPACIW.substring(6, 8);
    $('#fechademan_110c').val($_ANODEMPACIW + '/' + $_MESDEMPACIW + '/' + $_DIADEMPACIW);
    $('#demandaindu_110c').val($_DEMANINDPACIW);
    $('#cotizante_110c').val($_IDCOTIPACIW);
    $('#cotizanted_110c').val($_DESCRIPCOTIPACW);
    $('#parentezco_110c').val($_PARENTPACIW);
    $('#victimac_110c').val($_VICTICONFLICPACIW);
    $('#proespecial_110c').val($_PROGEPSPACIW);
    $('#altocosto_110c').val($_ALTCOSPACIW);
    $('#pacitutela_110c').val($_TUTELAPACIW);
    $('#empresalab_110c').val($_EMPRESAPACIW);
    $('#cronica_110c').val($_CRONICOPACIW);
    $('#patologiacronica_110c').val($_PATOLCRONICPACIW);
    $('#clasif_110c').val($_CLASIFPACIW);
    $('#acompañante_110c').val($_ACOMPAPACIW);
    $('#telefacomp_110c').val($_TELACOMPACIW);
    $_ANOCERTESTUDPACIW = $_CERTESTUDPACIW.substring(0, 4);
    $_MESCERTESTUDPACIW = $_CERTESTUDPACIW.substring(4, 6);
    $('#fechamatr_110c').val($_ANOCERTESTUDPACIW + '/' + $_MESCERTESTUDPACIW);
    $('#matr_110c').val($_PERIESTUDPACIW);
    $_ANOULTMAMOPACIW = $_ULTMAMOPACIW.substring(0, 4);
    $_MESULTMAMOPACIW = $_ULTMAMOPACIW.substring(4, 6);
    $('#mamografia_110c').val($_ANOULTMAMOPACIW + '/' + $_MESULTMAMOPACIW);
    $_ANOCERTECONOPACIW = $_CERTECONOPACIW.substring(0, 4);
    $_MESCERTECONOPACIW = $_CERTECONOPACIW.substring(4, 6);
    $('#fechaecono_110c').val($_ANOCERTECONOPACIW + '/' + $_MESCERTECONOPACIW);
    $('#econo_110c').val($_PERIECOPACIW);
    $('#policonsul_110c').val($_MULTICONSULPACIW);
    $('#restric_110c').val($_RESTAPLIPACIW);
    $('#drog_110c').val($_RESTDROGPACIW);
    $('#cirug_110c').val($_RESTCIRUPACIW);
    $('#lab_110c').val($_RESTLABOPACIW);
    $('#rx_110c').val($_RESTIMAGPACIW);
    $('#estanc_110c').val($_RESTESTAPACIW);
    $('#consult_110c').val($_RESTCONSPACIW);
    $('#fisiot_110c').val($_RESTTERFPACIW);
    $('#terap_110c').val($_RESTTEROPACIW);
    $('#odont_110c').val($_RESTADONPACIW);
    $('#pyp_110c').val($_RESTPYPPACIW);
    $('#vcm_110c').val($_VCMPACIW);
    $('#basedatos_110c').val($_DERECHOPACIW);
    $('#observaciones_110c').val($_OBSERVPACIW);
    $('#discapacidad_110c').val($_DISCAPPACIW);
    $('#altoriesgo_110c').val($_EMBALTOPACIW);
    $('#entidad_110c').val($_ENTIFACTPACIW);
    $('#entidadd_110c').val($_DESCRIPENTIPACIW);
    $('#fechasistd_110c').val($_FECHANITPACIW);
    $('#medicofam_110c').val($_MEDFAMIPACIW);
    $('#medicofamd_110c').val($_DESCRIPMEDPACIW);
    $('#correopacie_110c').val($_EMAILPACIW);
    $('#fact_110c').val($_OPERCREAPACIW);
    $('#fechaact_110c').val($_FECHACREAPACIW);
    $('#hr_110c').val($_HORACREAPACIW);
    $('#modificado_110c').val($_OPERMODIFPACIW);
    $('#fechamodif_110c').val($_FECHAMODIFPACIW);
    $('#hrmodif_110c').val($_HORAMODIFPACIW);

    if ($_NOVEDAD7767 == '9') {
        _retiroregistro_7767();
    }
}

function _retirar() {
    _consultademostrarinf_7767();
}

function _retiroregistro_7767() {
    bootbox.confirm({
        size: "small",
        onEscape: false,
        message: "DESEA RETIRAR ESTOS DATOS?",
        buttons: {
            confirm: {
                label: 'Si',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }

        },
        callback: function (result) {
            if (result == true) {
                _grabarcorresponsalia();
            }
            else {
                CON850(_dato_novedad_7767);
            }
        }
    });

}

function _grabarcorresponsalia() {
    $_OPSEGU = "IS767C"
    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904S_04,
        nombredll: 'CON904S',
        carpeta: 'CONTAB'
    })
}

function _dataCON904S_04(data) {
    // console.log(data, "CON904S-04");
    var date = data.split("|");
    var swinvalid = date[2].trim();
    if (swinvalid == "00") {
        setTimeout(_ventanacorresponsalia_7767, 500);
    }
    else {
        CON851(swinvalid, swinvalid, null, 'error', 'error');
        // NO TIENE PERMISOS
        _toggleNav();
    }
}

function _ventanacorresponsalia_7767() {
    bootbox.confirm({
        size: "small",
        onEscape: false,
        message: "ACTUALIZAR CORRESPONSALIA?",
        buttons: {
            confirm: {
                label: 'Si',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }

        },
        callback: function (result) {
            if (result == true) {
                _ventanaactualizarcorresponsalia();
            }
            else {
                if (($_NOVEDAD7767 == '7') || ($_NOVEDAD7767 == '8')) {
                    _grabardatos_7767();
                } else {
                    _eliminarregistro();
                }
            }
        }
    });
}
function _ventanaactualizarcorresponsalia() {
    console.log("VENTANA CORRESPONSALIA PREGUNTAR ESNEIDER COMO FUNCIONAR");
}

function _grabardatos_7767() {
    if ($_NOVEDAD7767 == '8') {
        $_OPERMODIFPACIW = $_ADMINW;
        $_FECHAMODIFPACIW = moment().format('YYMMDD');
        $_HORAMODIFPACIW = moment().format('HH:mm');


    } else {
        $_OPERCREAPACIW = $_ADMINW;
        $_FECHACREAPACIW = moment().format('YYMMDD');
        $_HORACREAPACIW = moment().format('HH:mm');
        $_OPERMODIFPACIW = '';
        $_FECHAMODIFPACIW = '';
        $_HORAMODIFPACIW = '';
    }


    $_HEMOCLASPAC = $_GRPSANGPACIW + $_RHPACIW;
    $_RESTRICCIONPACIW = $_RESTAPLIPACIW + $_RESTDROGPACIW + $_RESTCIRUPACIW + $_RESTLABOPACIW + $_RESTIMAGPACIW + $_RESTESTAPACIW + $_RESTCONSPACIW + $_RESTTERFPACIW + $_RESTTEROPACIW + $_RESTADONPACIW + $_RESTPYPPACIW;

    LLAMADO_DLL({
        dato: [$_NOVEDAD7767, $_CODPACIW, $_TIPOPACIW, $_LUGARIDPACIW, $_APELLIDO1PACW, $_APELLIDO2PACW, $_NOMBRE1PACW, $_NOMBRE2PACW, $_NACIMPACIW, $_HEMOCLASPAC, $_SEXOPACIW, $_ESTCIVILPACIW, $_NIVESTUPACIW, $_ZONAPACIW, $_PADREPACIW, $_MADREPACIW, $_DIRPACIW, $_TELPACIW, $_CELPACIW, $_CIUPACIW, $_OCUPPACIW, $_PAISPACIW, $_ESTRATOPACIW, $_COPAGOPACIW, $_TIPOPACIW, $_INSTITUTOPACIW, $_ETNIAPACIW, $_COMUNIPACW, $_RESGUARPACIW, $_TIPOAFILPACIW, $_PORTABPACIW, $_CIUDASEGPACIW, $_EPSPACIW, $_CONTRATOPACIW, $_FECHAAFILPACIW, $_FICHAPACIW, $_CARNETPACIW, $_FECHAVENCEPACIW, $_FECHADEMPACIW, $_DEMANINDPACIW, $_IDCOTIPACIW, $_PARENTPACIW, $_VICTICONFLICPACIW, $_PROGEPSPACIW, $_ALTCOSPACIW, $_TUTELAPACIW, $_EMPRESAPACIW, $_CRONICOPACIW, $_PATOLCRONICPACIW, $_CLASIFPACIW, $_ACOMPAPACIW, $_TELACOMPACIW, $_CERTESTUDPACIW, $_PERIESTUDPACIW, $_ULTMAMOPACIW, $_CERTECONOPACIW, $_PERIECOPACIW, $_MULTICONSULPACIW, $_RESTRICCIONPACIW, $_VCMPACIW, $_DERECHOPACIW, $_OBSERVPACIW, $_DISCAPPACIW, $_EMBALTOPACIW, $_ENTIFACTPACIW, $_FECHANITPACIW, $_ANTCANCERPACIW, $_MEDFAMIPACIW, $_EMAILPACIW, $_OPERCREAPACIW, $_FECHACREAPACIW, $_HORACREAPACIW, $_OPERMODIFPACIW, $_FECHAMODIFPACIW, $_HORAMODIFPACIW],
        callback: _dataSAL7767_13,
        nombredll: 'SAL7767_13',
        carpeta: 'SALUD'
    });
}

function _eliminarregistro() {

    $_HEMOCLASPAC = $_GRPSANGPACIW + $_RHPACIW;
    $_RESTRICCIONPACIW = $_RESTAPLIPACIW + $_RESTDROGPACIW + $_RESTCIRUPACIW + $_RESTLABOPACIW + $_RESTIMAGPACIW + $_RESTESTAPACIW + $_RESTCONSPACIW + $_RESTTERFPACIW + $_RESTTEROPACIW + $_RESTADONPACIW + $_RESTPYPPACIW;

    if (($_NOVEDAD7767 == '8') && ($_NOVEDAD7767 == '9')) {

        $_OPERMODIFPACIW = $_ADMINW;
        $_FECHAMODIFPACIW = moment().format('YYYYMMDD');
        $_HORAMODIFPACIW = moment().format('HH:mm');

    } else {
        $_OPERCREAPACIW = $_ADMINW;
        $_FECHACREAPACIW = moment().format('YYYYMMDD');
        $_HORACREAPACIW = moment().format('HH:mm');
        $_OPERMODIFPACIW = '';
        $_FECHAMODIFPACIW = '';
        $_HORAMODIFPACIW = '';
    }

    LLAMADO_DLL({
        dato: [$_NOVEDAD7767, $_CODPACIW, $_TIPOPACIW, $_LUGARIDPACIW, $_APELLIDO1PACW, $_APELLIDO2PACW, $_NOMBRE1PACW, $_NOMBRE2PACW, $_NACIMPACIW, $_HEMOCLASPAC, $_SEXOPACIW, $_ESTCIVILPACIW, $_NIVESTUPACIW, $_ZONAPACIW, $_PADREPACIW, $_MADREPACIW, $_DIRPACIW, $_TELPACIW, $_CELPACIW, $_CIUPACIW, $_OCUPPACIW, $_PAISPACIW, $_ESTRATOPACIW, $_COPAGOPACIW, $_TIPOPACIW, $_INSTITUTOPACIW, $_ETNIAPACIW, $_COMUNIPACW, $_RESGUARPACIW, $_TIPOAFILPACIW, $_PORTABPACIW, $_CIUDASEGPACIW, $_EPSPACIW, $_CONTRATOPACIW, $_FECHAAFILPACIW, $_FICHAPACIW, $_CARNETPACIW, $_FECHAVENCEPACIW, $_FECHADEMPACIW, $_DEMANINDPACIW, $_IDCOTIPACIW, $_PARENTPACIW, $_VICTICONFLICPACIW, $_PROGEPSPACIW, $_ALTCOSPACIW, $_TUTELAPACIW, $_EMPRESAPACIW, $_CRONICOPACIW, $_PATOLCRONICPACIW, $_CLASIFPACIW, $_ACOMPAPACIW, $_TELACOMPACIW, $_CERTESTUDPACIW, $_PERIESTUDPACIW, $_ULTMAMOPACIW, $_CERTECONOPACIW, $_PERIECOPACIW, $_MULTICONSULPACIW, $_RESTRICCIONPACIW, $_VCMPACIW, $_DERECHOPACIW, $_OBSERVPACIW, $_DISCAPPACIW, $_EMBALTOPACIW, $_ENTIFACTPACIW, $_FECHANITPACIW, $_ANTCANCERPACIW, $_MEDFAMIPACIW, $_EMAILPACIW, $_OPERCREAPACIW, $_FECHACREAPACIW, $_HORACREAPACIW, $_OPERMODIFPACIW, $_FECHAMODIFPACIW, $_HORAMODIFPACIW],
        callback: _dataSAL7767_13,
        nombredll: 'SAL7767_13',
        carpeta: 'SALUD'
    });
}


function _dataSAL7767_13(data) {
    // console.debug(data, 'SAL7767_13');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_NOVEDAD7767 == '9') {
            toastr.success('Se ha retirado', 'MAESTRO PACIENTES');
            limpiarCajas_7767();
        } else {
            toastr.success('Se ha guardado', 'MAESTRO PACIENTES');
            limpiarCajas_7767();
        }
    }
    else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');
        _grabarcorresponsalia()
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function limpiarCajas_7767() {
    // _toggleNav();
    CON850(_dato_novedad_7767);
    _inputControl('reset');
    // _inputControl('disabled');
}




/////////////////////////////////// OTRAS VALIDACIONES /////////////////////////////////

function _evaluarantecendentescancer() {
    fuente = '<div class="col-md-12" id="CANCER_110C"> ' +
        '<input id="cancer_110c" type="text" class="form-control input-md" data-orden="1" maxlength="1"> ' +
        '</div>';

    _ventana({
        source: fuente,
        title: 'ANTECEDENTES DE CANCER',
        size: 'small',
        espace: false,
        focus: '#cancer_110c',
        form: '#CANCER_110C',
        order: '1',
        global1: '$_ANTCANCERPACIW',
        inputglobal1: '#cancer_110c',
    }, _validacionantecedentes_7767, _evaluarentidadfact_7767);
}

function _validacionantecedentes_7767() {
    if (($_ANTCANCERPACIW == 'S') || ($_ANTCANCERPACIW == 's') || ($_ANTCANCERPACIW == 'N') || ($_ANTCANCERPACIW == 'n')) {
        _evaluarembarazoriesgo_7767();
    } else {
        _evaluarantecendentescancer();
    }
}


function _calcularedad_7767() {
    // $_UNIDEDADW = 'A';
    // $_VLREDADW
    $_NACIMPACIW = momentMask.unmaskedValue;
    $_FECHAINIW = $_NACIMPACIW;
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
        $_VLREDADW = $_ANOACT - $_ANOINIW;
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
    }

    else if ($_NRODIASEDAD < 30) {
        $_UNIDEDADW = 'D';
        $_VLREDADW = $_NRODIASEDAD;
        $_VLREDADW = Math.round($_VLREDADW);
        $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
        _Calcularedad2_7767();
    }
    else {
        if ($_NRODIASEDAD < 365) {
            $_UNIDEDADW = 'M';
            $_VLREDADW = $_NRODIASEDAD / 30;
            $_VLREDADW = Math.round($_VLREDADW);
            $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
            _Calcularedad2_7767();
        }
        else {
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

function _dato2gmail_7767() {
    validarInputs({
        form: "#CORREOPACI_110C",
        orden: "1"
    },
        function () { _evaluarentidadfact_7767(); },
        _dato2email_7767
    )
}

function _dato2email_7767() {
    $_EMAILPACIW = $("#correopacie_110c").val();
    if ($_EMAILPACIW.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _dato2gmail_7767()
    } else if ($_EMAILPACIW != '') {
        $_SWBUSCAR = '0';
        if ($_SWBUSCAR != '1') {
            CON851('03', '03', null, 'error', 'error');
            _dato2gmail_7767();
        } else if (($_SWBUSCAR < '1') || ($_SWBUSCAR > '3')) {
            CON851('03', '03', null, 'error', 'error');
            _dato2gmail_7767();
        } else {
            _datodireccion_7767();
        }
    } else {
        _datodireccion_7767();
    }
}




