var $_OTRSTAT = '00', $_FECHACUMPTERCEW = '', $_APEL2TER2W = '', $_DESCRIPTER2W = '', $_NOMBRECLIW;

var $_CODTERCEROLNK, $_NOMTERCEROLNK = '', $_FPAGOLNK;


// var cupoasig_110CMask = new IMask(document.getElementById('smvmd_con110c'),
//     { mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
// );

var porcentica_110cMask = new IMask(document.getElementById('porcetica_110c'),
    { mask: Number, min: 0, max: 99999, scale: 3, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var porcentreten_110cMask = new IMask(document.getElementById('porcentreten_110c'),
    { mask: Number, min: 0, max: 999, scale: 1, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    loader('hide');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.cod_oper ? localStorage.cod_oper : false;

    $_NOMUSU = $_USUA_GLOBAL[0].NOMBRE;
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
    $_CARTERAUSU = $_USUA_GLOBAL[0].CARTERA;
    $_PLACAUSU = $_USUA_GLOBAL[0].PLACA;
    $_CUOTASUSU = $_USUA_GLOBAL[0].CUOTAS;

    _comenzaropccon110c();
})

var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);

///////////////////////// MASCARAS ///////////////////////////


var momentFormatcumple = 'MM/DD HH:mm';

var momentMask = IMask($("#cumple_con110")[0], {
    mask: Date,
    pattern: momentFormatcumple,
    lazy: true,
    min: new Date(0, 1),
    max: new Date(0, 1),

    format: function (date) {
        return moment(date).format(momentFormatcumple);
    },
    parse: function (str) {
        return moment(str, momentFormatcumple);
    },

    blocks: {
        // YYYY: {
        //     mask: IMask.MaskedRange,
        //     from: 1920,
        //     to: 2020
        // },
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


/////////////////////////////// OPCION CON110C- MAESTRO DE TERCEROS //////////////////////////////////

function _comenzaropccon110c() {
    console.debug('comenzar');
    // ACCEPT FECHA-ACT-CTL FROM DATE.
    // MOVE 20 TO SIG-ACT-CTL.

    $_SW9CON110C = '0';

    $_NOVEDADCON110C = '7';

    if ($_OTRSTAT == '00') {
        console.debug('otrstat');
        //CONTINUE 
        if ($_CARTERAUSU = 'S') {
            console.debug('cartera usu');
            CON850(_datonovedad_con110c);
        } else {
            _comenzaropccon110c();
        }
    } else {
        _toggleNav();
    }


}

function _datonovedad_con110c(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    $_SWCREAR = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _evaluardatonovedad_con110c()
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedad_CON110C').val(novedad.id + ' - ' + novedad.descripcion)
}

function _evaluardatonovedad_con110c() {
    console.debug('datonovedad');
    if ($_SWCREAR > 0) {
        console.debug('swcrear >0');
        $_NOVEDADCON110C = $_SWCREAR;
        console.debug($_NOVEDADCON110C, 'novedad');
        if ($_SWCREAR == '7') {
            // $_CODTERCEROW = $_CODTERCEROLNK;
            _evaluarcodcliente110c();
        }
        else if (($_SWCREAR == '8') || ($_SWCREAR == '9')) {

            _evaluarcodcliente110c();

        }

    } else {
        console.debug('novedad 7');
        $_NOVEDADCON110C = 7;
        $('#novedad_CON110C').val($_NOVEDADCON110C);

        revisarpermisos_con110c();
    }
}

// function _dataCON110C_01_110C(data) {
//     console.debug(data, 'CON110C_01');
//     var date = data.split('|');
//     var swinvalid = date[0].trim();
//     if (swinvalid == '00') {


//     }
//     else if (swinvalid == '01') {
//         console.debug('01');
//         $_NOVEDADCON110C = 7;
//         $_SWCREAR = '';
//         // CON850(_datonovedad_con110c);
//     }
//     else {
//         CON852(date[0], date[1], date[2], _toggleNav);
//     }
// }

function revisarpermisos_con110c() {
    $_OPSEGU = 'C12' + $_NOVEDADCON110C;
    console.log($_OPSEGU, "_revisarpermisosCON90402");
    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904_01,
        nombredll: 'CON904',
        carpeta: 'CONTAB'
    });
    // let datos_envio = datosEnvio();
    // datos_envio += '|'
    // datos_envio += $_OPSEGU;
    // SolicitarDll({ datosh: datos_envio }, _dataCON904_01_110C, get_url("/APP/CONTAB/CON904.DLL"));
}

function _dataCON904_01_110C(data) {
    console.debug(data, 'CON904_01_110C');
    var date = data.split('|');
    if (date[0].trim() == '01') {
        $_SW9CON110C = '1';
        _datonovedad_con110c();
    }
    else if (date[0].trim() == '00') {
        _datocodigo_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _datocodigo_con110c() {
    console.debug('datocodigo');
    if ($_CODTERCEROLNK > 0) {
        $_CODTERCEROW = $_CODTERCEROLNK;

    }
    if (($_SWCREAR = 8) || ($_CODTERCEROLNK > 0)) {
        $_CODTERCEROW = $_CODTERCEROLNK;
        _leertercero_con110c();
    } else {
        _evaluarcodcliente110c();
    }
}


function _evaluarcodcliente110c() {
    console.debug('evaluar codcliente');
    validarInputs({
        form: '#CODCLIEN_CON110C',
        orden: "1"
    },
        function () { CON850(_datonovedad_con110c); },
        _codlcon110c
    )
}

function _codlcon110c() {
    console.debug('codlcon110c');
    $_CODTERCEROW = $('#codclien_con110c').val();
    // $_CODTERCEROW = $_CODTERCEROLNK;

    if ($_CODTERCEROW < '1') {
        if ($_CODTERCEROW == '0000000000') {
            //// CONTINUE

        } else {
            CON851('02', '02', null, 'error', 'Error');
        }
    } else {
        _leertercero_con110c();
    }
}

function _leertercero_con110c() {
    console.debug($_CODTERCEROW, '_leertercero');

    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_CODTERCEROW.padStart(10, '0');
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataCON110C_02_110C, get_url("/APP/CONTAB/CON110C_01.DLL"));
}

function _dataCON110C_02_110C(data) {
    console.debug(data, "CON110C_02_110C");
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (($_NOVEDADCON110C == '7') && (swinvalid == '01')) {
        console.debug('novedad 7 = 01');
        _nuevoregistrocon110c();
    }
    else if (($_NOVEDADCON110C == '7') && (swinvalid == '00')) {
        console.debug('novedad 7 = 00');
        _error1CON110C();
    }
    else if (($_NOVEDADCON110C == '8') && (swinvalid == '00')) {
        console.debug('novedad 8 = 00');
        setTimeout(_consultadatos_con110c, 100);
        _evaluardatodv_con110c();

    }
    else if (($_NOVEDADCON110C == '8') && (swinvalid == '01')) {
        console.debug('novedad 8 = 01');
        _error1CON110C();

    }
    else if (($_NOVEDADCON110C == '9') && (swinvalid == '00')) {
        console.debug('novedad 9 = 00');
        setTimeout(_retirar_con110c, 100);

    }
    else if (($_NOVEDADCON110C == '9') && (swinvalid == '01')) {
        console.debug('novedad 9 = 01');
        _error1CON110C();

    }
}

function _error1CON110C() {
    console.log('error');
    if ((($_NOVEDADCON110C == '7') && (swinvalid == '00')) || ($_SW9CON110C == '0')) {
        $_SW9CON110C = '1';
        $_NOVEDADCON110C = 8;
        $("#novedad_CON110C").val($_NOVEDADCON110C);
        _evaluarcodcliente110c();
    } else {
        console.log('else')
        CON851('01', '01', null, 'error', 'Error');
        _datocodigo_con110c();
    }
}

function _nuevoregistrocon110c() {
    console.debug('nuevo registro');
    $_SW9CON110C = '1';
    $_NITCLIW = '';
    $_NOMBRECLIW = '';
    _evaluardatodv_con110c();
}

function _evaluardatodv_con110c() {
    console.debug('evaluar dvtercero');
    validarInputs({
        form: '#DV_CON110C',
        orden: "1"
    },
        function () { _evaluarcodcliente110c(); },
        _datodv_con110c
    )
}

function _datodv_con110c() {
    console.debug('datodv');
    $_DVTERCEROW = $('#dv_con110c').val();

    if ($_DVTERCEROW.trim() == '') {
        if ($_NITUSU == '0822006141') {
            CON851('9I', '9I', null, 'error', 'Error');
            _evaluardatodv_con110c();
        }
        else {
            _evaluardatocumpleaños_con110c();
        }
    } else {
        _calculadigitoverificacion();
    }
}

function _calculadigitoverificacion() {
    console.debug('calculadigitoverificacion');
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_CODTERCEROW.padStart(10, '0')
    datos_envio += '|'
    datos_envio += $_DVTERCEROW;
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataCON110C_04_110C, get_url("/APP/CONTAB/CON110C_04.DLL"));
}

function _dataCON110C_04_110C(data) {
    console.debug(data, 'CON110C_04');
    var date = data.split('|');
    var $_DVTERW = date[0].trim();
    console.debug($_DVTERW);
    if ($_DVTERW != $_DVTERCEROW) {
        CON851('9I', '9I', null, 'error', 'Error');
        _evaluardatodv_con110c();
    } else {
        _evaluardatocumpleaños_con110c();
    }

}

function _evaluardatocumpleaños_con110c() {
    console.log('fecha cumpleaños');
    // momentMask.updateValue();
    validarInputs({
        form: '#CUMPLE_CON110C',
        orden: "1"
    },
        function () { _evaluardatodv_con110c(); },
        _dato1apellido_con110c
    )
}

function _dato1apellido_con110c() {
    console.log('dato1apellido');

    if ($_NOVEDADCON110C == '7') {
        if ($_CODTERCEROW = 0) {
            $_NOMBRECLIW = $_NOMUSU;
            $("#1erapellido_con110c").val($_NOMBRECLIW);
        }
    }
    validacionesnombres();
}

function validacionesnombres() {
    console.log('otra');
    if (($_CODTERCEROW > '0800000000') && ($_CODTERCEROW < '1000000000')) {
        console.debug('continuar')
        if (($_NITUSU == '0830009610') || ($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) {
            console.log(' nit dif ')
        } else {
            console.log(' dif ')
            _evaluardato1apellido_con110c();
        }

    }
    else {
        console.log(' nuevo else ')
        // if($_DESCRIPTER2W.trim() == ''){
        //     console.log(' if ');
        //     if($_NOMBRECLIW != ''){
        //         console.log(' if2 ');
        //         $_DESCRIPTER2W = $_NOMBRECLIW;
        //         $("#1erapellido_con110c").val($_DESCRIPTER2W); 
        //         //// NOMBRE-TER-EXT
        //         // MOVE POW-ON     TO POW-ENABLE OF RAZON-L                                  
        //         // CALL SETFOCUS OF RAZON-L.
        //         // EXIT PROGRAM.
        //     }else{
        //         console.log(' else2 ');
        //         ///CAJA RAZON L 
        //         _evaluardato1apellido_con110c(); 
        //     }
        // }else{
        console.log(' else ');
        _evaluardato1apellido_con110c();
        // }


    }
}

function _evaluardato1apellido_con110c() {
    console.log('evaluarapellido');
    validarInputs({
        form: '#PRAPELLIDO_CON110C',
        orden: "1"
    },
        function () { _evaluardatocumpleaños_con110c(); },
        _aceptarapellido1_con110c
    )
}

function _aceptarapellido1_con110c() {
    console.log('aceptar apellido 1')
    $_APEL1TER2W = $('#1erapellido_con110c').val();

    if ($_APEL1TER2W.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _evaluardato1apellido_con110c()
    } else {
        _evaluardato2apellido_con110c()
    }
}

function _evaluardato2apellido_con110c() {
    console.log('evaluarapellido2');
    validarInputs({
        form: '#SDOAPELLIDO_CON110C',
        orden: "1"
    },
        function () { _evaluardato1apellido_con110c(); },
        _aceptarapellido2_con110c
    )
}

function _aceptarapellido2_con110c() {
    console.log('aceptar apellido 2')
    $_APEL2TER2W = $('#2doapellido_con110c').val();

    _evaluardatonombre_con110c();
}

function _evaluardatonombre_con110c() {
    console.debug('evaluarnombres');
    validarInputs({
        form: '#NOMBRES_CON110C',
        orden: "1"
    },
        function () { _evaluardato2apellido_con110c(); },
        _aceptarnombres_con110c
    )
}
function _aceptarnombres_con110c() {
    console.debug('aceptar nombre')
    $_NOMB1TER2W = $('#nombres_con110c').val();

    if ($_NOMB1TER2W.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _evaluardatonombre_con110c();
    } else {
        _evaluardireccion_con110c();
    }
}

function _evaluardireccion_con110c() {
    console.debug('evaluar direccion');
    validarInputs({
        form: '#DIRECC_CON110C',
        orden: "1"
    },
        function () { _evaluardatonombre_con110c(); },
        _datodireccion_con110c
    )
}

function _datodireccion_con110c() {
    $_DIRECCTERCEW = $('#direcc_con110c').val();
    if ($_DIRECCTERCEW.trim() == '') {
        CON851('84', '84', null, 'error', 'error');
        _evaluardireccion_con110c()
    } else {
        _evaluarciudad_con110c()
    }
}
function _evaluarciudad_con110c() {
    console.log('evaluar ciudad');
    validarInputs({
        form: '#CIUDAD_CON110C',
        orden: "1"
    },
        function () { _evaluardireccion_con110c(); },
        _datociudad_con110c
    )
}

function _datociudad_con110c() {
    console.log('DATO ciudad');
    $_CODCIUTERCEW = $('#ciudad_con110').val();
    if ($_CODCIUTERCEW.trim() == '') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarciudad_con110c();
    } else {
        console.log('ELSE', $_CODCIUTERCEW);
        // LLAMADO_DLL({
        //     dato: [$_CODCIUTERCEW],
        //     callback: _dataCON110C_05_110C,
        //     nombredll: 'CON110C_05',
        //     carpeta: 'CONTAB'
        // });
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_CODCIUTERCEW;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_05_110C, get_url('/APP/CONTAB/CON110C_05.DLL'));
    }
}

function _dataCON110C_05_110C(data) {
    console.log(data, 'CON110C_05 CIUDAD');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCIUTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#ciudadd_con110c").val($_DESCRIPCIUTERW);
        _evaluartelind_con110c();
    }
    else if (swinvalid == '01') {
        _evaluarciudad_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluartelind_con110c() {
    console.log('evaluar TEL IND');
    validarInputs({
        form: '#IND_CON110C',
        orden: "1"
    },
        function () { _evaluarciudad_con110c(); },
        _datotelind_con110c
    )
}

function _datotelind_con110c() {
    $_INDICTERCEW = $('#ind_con110c').val();

    _evaluartelefonoterc_con110c();
}
function _evaluartelefonoterc_con110c() {
    console.debug('evaluar TEL IND');
    validarInputs({
        form: '#TEL_CON110C',
        orden: "1"
    },
        function () { _evaluartelind_con110c(); },
        _datotelefonoterc_con110c
    )
}
function _datotelefonoterc_con110c() {
    $_TELTERCEW = $('#tel_con110c').val();
    _evaluarcedula_con110c();
}
function _evaluarcedula_con110c() {
    console.debug('evaluar TEL IND');
    $('#cc_con110c').val('0');
    validarInputs({
        form: '#CC_CON110C',
        orden: "1"
    },
        function () { _evaluartelefonoterc_con110c(); },
        _datocedula_con110c
    )
}

function _datocedula_con110c() {
    $_NITTERCEW = $('#cc_con110c').val();
    if (($_NITTERCEW > 0) && ($_NITTERCEW < 100)) {
        CON851('03', '03', null, 'error', 'error');
        _evaluarcedula_con110c();
    } else {
        _validartipo_con110c();
    }
}

function _validartipo_con110c() {
    var documento = [
        { "COD": "CC", "DESCRIP": "Cedula de Ciudadania" },
        { "COD": "CE", "DESCRIP": "Cedula de Extranjeria" },
        { "COD": "PA", "DESCRIP": "Numero Pasaporte" },
        { "COD": "RC", "DESCRIP": "Registro Civil" },
        { "COD": "TI", "DESCRIP": "Tarjeta de Identidad" },
        { "COD": "NU", "DESCRIP": "Numero Unico de Identidad" },
        { "COD": "NI", "DESCRIP": "Numero Identidad Tributaria" }
    ]
    POPUP({
        array: documento,
        titulo: 'Tipo Identificacion',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluarcedula_con110c
    },
        _evaluartipodoc_con110c);
}

function _evaluartipodoc_con110c(documento) {
    $_TIPOIDTERCEW = documento.COD;
    switch (documento.COD) {
        case "CC":
        case "CE":
        case "PA":
        case "RC":
        case "TI":
        case "NU":
        case "NI":
            validacionestipodoc_con110c();
            break;
        default:
            _evaluarcedula_con110c();
            break;
    }
    $("#tipoident_con110c").val(documento.COD + " - " + documento.DESCRIP);
}

function validacionestipodoc_con110c() {
    if (($_TIPOIDTERCEW.trim() == '') && (($_CODTERCEROW > '800000000') && ($_CODTERCEROW < '999000000'))) {
        $_TIPOIDTERCEW = 'NI - Numero Identidad Tributaria';
        $("#tipoident_con110c").val($_DESCRIPMARCAARTW);
        _evaluaractividades_con110c();
    } else {
        _evaluaractividades_con110c();
    }
}
function _evaluaractividades_con110c() {
    console.log('evaluar ACTIVIDAD');
    validarInputs({
        form: '#ACTIVI_CON110C',
        orden: "1"
    },
        function () { _validartipo_con110c(); },
        _datoactividad_con110c
    )
}
function _datoactividad_con110c() {
    $_ACTIVICATERCEW = $("#activi_con110c").val();
    if ($_ACTIVICATERCEW == '00') {
        CON851('02', '02', null, 'error', 'error');
        _evaluaractividades_con110c()
    } else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_ACTIVICATERCEW;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_06_110C, get_url('/APP/CONTAB/CON110C_06.DLL'));
    }
}

function _dataCON110C_06_110C(data) {
    console.log(data, 'CON110C_06 CIUDAD');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPACTTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#actividadd_con110c").val($_DESCRIPACTTERW);
        _evaluarcomercial_con110c();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluaractividades_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _evaluarcomercial_con110c() {
    console.log('evaluar COMERCIAL');
    validarInputs({
        form: '#NOMCOM_CON110C',
        orden: "1"
    },
        function () { _evaluaractividades_con110c(); },
        _datocomercial_con110c
    )
}
function _datocomercial_con110c() {
    $_NOMCOMERTERCEW = $('#nomcom_con110c').val();
    _evaluarotrosdatos_con110c();
}
function _evaluarotrosdatos_con110c() {
    console.log('evaluar OTROS DATOS');
    validarInputs({
        form: '#DATOS_CON110C',
        orden: "1"
    },
        function () { _evaluarcomercial_con110c(); },
        _datootros_con110c
    )
}
function _datootros_con110c() {
    $_OTROSTERCEW = $('#datos_con110c').val();
    _evaluarcontacto_con110c();
}
function _evaluarcontacto_con110c() {
    console.log('evaluar CONTACTO');
    validarInputs({
        form: '#CONTACT_CON110C',
        orden: "1"
    },
        function () { _evaluarotrosdatos_con110c(); },
        _datocontacto_con110c
    )
}
function _datocontacto_con110c() {
    $_CONTACTTERCEW = $('#contact_con110c').val();
    _evaluarweb_con110c();
}
function _evaluarweb_con110c() {
    console.log('evaluar WEB');
    validarInputs({
        form: '#WEB_CON110C',
        orden: "1"
    },
        function () { _evaluarotrosdatos_con110c(); },
        _datoweb_con110c
    )
}
function _datoweb_con110c() {
    $_WEBTERCEW = $('#web_con110c').val();
    _evaluarcargocontac_con110c();
}
function _evaluarcargocontac_con110c() {
    console.log('evaluar CARGOCONTAC');
    validarInputs({
        form: '#CARGO_CON110C',
        orden: "1"
    },
        function () { _evaluarweb_con110c(); },
        _datocargocontac_con110c
    )
}
function _datocargocontac_con110c() {
    $_CARGOTERCEW = $('#cargo_con110c').val();
    _evaluaremail_con110c();
}
function _evaluaremail_con110c() {
    console.log('evaluar EMAIL');
    validarInputs({
        form: '#EMAIL_CON110C',
        orden: "1"
    },
        function () { _evaluarcargocontac_con110c(); },
        _datoemail_con110c
    )
}
function _datoemail_con110c() {
    $_EMAILTERCEW = $('#email_con110c').val();

    if ($_EMAILTERCEW.trim() == '') {
        console.log('IF');
        CON851('2K', '2K', null, 'error', 'Error');
        _evaluarasesor_con110c();
    } else {
        console.log('ELSE');
        _evaluarasesor_con110c();
        // $_SWBUSCAR = '0'; 

        // if($_SWBUSCAR != '1'){
        //     CON851('03', '03', null, 'error', 'Error');
        //     _evaluaremail_con110c();
        // }
        // if(($_SWBUSCAR < '1') && ($_SWBUSCAR > '3')){
        //     CON851('03', '03', null, 'error', 'Error');
        //     _evaluaremail_con110c();
        // }

    }
}
function _evaluarasesor_con110c() {
    console.log('evaluar ASESOR');
    validarInputs({
        form: '#ASESOR_CON110C',
        orden: "1"
    },
        function () { _evaluaremail_con110c(); },
        _datoasesor_con110c
    )
}
function _datoasesor_con110c() {
    $_ASESORTERCEW = $('#asesor_con110c').val();

    _evaluartipo_con110c();
}
function _evaluartipo_con110c() {
    console.log('evaluar TIPO');
    validarInputs({
        form: '#CUPO_CON110C',
        orden: "1"
    },
        function () { _evaluarasesor_con110c(); },
        _datotipo_con110c
    )
}
function _datotipo_con110c() {
    $_TIPOCUPOTERCEW = $('#cupo_con110c').val();
    // if($_SWSALUD == '1'){
    //     _evaluarentidad_con110c(); 
    // }else{
    _evaluarfactorvent_con110c();
    // } 
}

function _evaluarentidad_con110c() {
    console.log('evaluar entidad');
    validarInputs({
        form: '#ENTIDAD_CON110C',
        orden: "1"
    },
        function () { _evaluartipo_con110c(); },
        _datoentidad_con110c
    )
}
function _datoentidad_con110c() {
    $_ENTIDADTERCEW = $('#entidad_con110c').val();
    if ($_ENTIDADTERCEW.trim() == '') {
        _evaluarentidad_con110c();
    } else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_ENTIDADTERCEW;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_07_110C, get_url('/APP/CONTAB/CON110C_07.DLL'));
    }
}
function _dataCON110C_07_110C(data) {
    console.log(data, 'CON110C_07 ENTIDAD');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPENTTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#entidadd_con110c").val($_DESCRIPENTTERW);
        if (($_ACTIVICATERCEW < '05') || ($_ACTIVICATERCEW > '90')) {
            $_CONVENIOTERCEW = '';
            $("#convenio_con110c").val($_CONVENIOTERCEW);
            _evaluarfactorvent_con110c();
        } else {
            _evaluarconvenio_con110c();
        }
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarentidad_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarconvenio_con110c() {
    console.log('evaluar convenio');
    validarInputs({
        form: '#CONVENIO_CON110C',
        orden: "1"
    },
        function () { _evaluarentidad_con110c(); },
        _datoconvenio_con110c
    )
}
function _datoconvenio_con110c() {
    $_CONVENIOTERCEW = $('#convenio_con110c').val();
    if ($_CONVENIOTERCEW.trim() == '') {
        _evaluarconvenio_con110c();
    } else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_CONVENIOTERCEW;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_08_110C, get_url('/APP/CONTAB/CON110C_08.DLL'));
    }
}

function _dataCON110C_08_110C(data) {
    console.log(data, 'CON110C_08 actividad');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPTARIFTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#conveniod_con110c").val($_DESCRIPTARIFTERW);
        _evaluarfactorvent_con110c();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarconvenio_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function _evaluarfactorvent_con110c() {
    console.log('evaluar FACTOR VENT');
    $('#tabla2').click();
    $('#factventas_con110c').val('1');
    $('#factventasd_con110c').val('0');
    validarInputs({
        form: '#FACTVENTAS_CON110C',
        orden: "1"
    },
        function () { _evaluartipo_con110c(); },
        _datofactorvent_con110c
    )
}
function _datofactorvent_con110c() {
    $_PORCICATER2W = $('#factventas_con110c').val();
    if ((($_ACTIVICATERCEW == '20') || ($_ACTIVICATERCEW == '21')) && ($_PORCICATER2W < '1')) {
        CON851('34', '34', null, 'error', 'error');
        _evaluarfactorvent_con110c();
    } else {
        _evaluarfactorvent2_con110c();
    }
}
function _evaluarfactorvent2_con110c() {
    console.log('evaluar FACTOR2 VENT');

    validarInputs({
        form: '#FACTPORCET_CON110C',
        orden: "1"
    },
        function () { _evaluarfactorvent_con110c(); },
        _datofactorvent2_con110c
    )
}
function _datofactorvent2_con110c() {

    $_PORCRETTER2W = $('#factventasd_con110c').val();
    _evaluarcuposmvm_con110c();
}
function _evaluarcuposmvm_con110c() {
    console.log('evaluar SMVM');
    validarInputs({
        form: '#SMVM_CON110C',
        orden: "1"
    },
        function () { _evaluarfactorvent2_con110c(); },
        _datcupossmvm_con110c
    )
}
function _datcupossmvm_con110c() {
    $_CUPOTERCEW = $('#smvm_con110c').val();

    if (($_CUOTASUSU == '2') && ($_ACTIVICATERCEW == '01') && ($_CUPOTERCEW == '0')) {
        CON851('02', '02', null, 'error', 'error');
        _evaluarcuposmvm_con110c();
    } else {
        $_CUPOASIGW = $_CUPOTERCEW * $_SALMINUSU;
        $("#smvmd_con110c").val($_CUPOASIGW);
        // $_CUPOASIGW = cupoasig_110CMask.unmaskedValue; 
        _evaluarvendedor_con110c();
    }
}
function _evaluarvendedor_con110c() {
    console.log('evaluar VENDEDOR');
    validarInputs({
        form: '#VENDEDOR_CON110C',
        orden: "1"
    },
        function () { _evaluarcuposmvm_con110c(); },
        _datovendedor_con110c
    )
}
function _datovendedor_con110c() {
    console.log('DATO VENDEDOR');
    if ($_CARTERAUSU != 'S') {
        $_VENDTERCEW = '';
        $("#vendedor_con110").val($_VENDTERCEW);
        _mostrarvendedro_con110c();
    } else {
        $_VENDTERCEW = $('#vendedor_con110').val();
        if ($_VENDTERCEW == '00000') {
            $_VENDTERCEW = '00000';
            $_DESCRIPVENDTERW = ''
            $("#vendedor_con110").val($_VENDTERCEW);
            $("#descripvendedor_con110c").val($_DESCRIPVENDTERW);
            _datopago_con110c();
        } else {
            _validacionesfpago_con110c();
        }
    }
}
function _mostrarvendedro_con110c() {
    console.log('evaluar MOSTRAR VENDEDOR');
    if ($_VENDTERCEW.trim() == '') {
        if (($_CUOTASUSU == '2') && ($_ACTIVICATERCEW == '01') && ($_CARTERAUSU == 'S')) {
            CON851('02', '02', null, 'error', 'error');
            _datovendedor_con110c();
        } else {
            $_PAGOTERCEW = '02';
            $("#formapago_110c").val($_PAGOTERCEW);
            _evaluarplazo_con110c();
        }
    } else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_VENDTERCEW;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_09_110C, get_url('/APP/CONTAB/CON110C_09.DLL'));
    }
}

function _dataCON110C_09_110C() {
    console.log(data, 'CON110C_09 VENDEDORES');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPVENDTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#descripvendedor_con110c").val($_DESCRIPVENDTERW);
        _datopago_con110c();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarvendedor_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _validacionesfpago_con110c() {
    console.log('VALIDACIONESF PAGO')

    if (($_CONTADOUSU == 'N') && ($_PAGOTERCEW == '01')) {
        $_PAGOTERCEW = '02';
        $("#formapago_110c").val($_PAGOTERCEW);
        _evaluarplazo_con110c();
    } else if (($_ACTIVICATERCEW == '02') || ($_ACTIVICATERCEW == '03') || ($_ACTIVICATERCEW == '04') || ($_ACTIVICATERCEW == '05') || ($_ACTIVICATERCEW == '92')) {
        $_PAGOTERCEW = '02';
        $("#formapago_110c").val($_PAGOTERCEW);
        //    _datosvehiculo_con110c();
        _evaluarplazo_con110c();
    } else if (($_ACTIVICATERCEW == '01') && ($_PAGOTERCEW == '00')) {
        $_PAGOTERCEW = '02';
        $("#formapago_110c").val($_PAGOTERCEW);
        _evaluarplazo_con110c();

    } else if (($_CUOTASUSU = '4') && ($_ACTIVICATERCEW == '12')) {
        // INVOKE POW-SELF "CALLFORM" USING "CON820A" "C:\PROG\CONTAB\CON110C.DLL"
        _datopago_con110c();
    } else {
        // $_FPAGOLNK = $_PAGOTERCEW; 
        // console.log($_FPAGOLNK); 
        // $("#formapago_110c").val($_FPAGOLNK);
        // INVOKE POW-SELF "CALLFORM" USING "CON820" "C:\PROG\CONTAB\CON820.DLL"
        // $_PAGOTERCEW =  $_FPAGOLNK; 
        // _datopago_con110c(); 
        _datopago_con110c();
    }
}

function _datopago_con110c() {
    console.log('datopago')
    if (($_CUOTASUSU == '4') && ($_ACTIVICATERCEW == '12')) {
        var pago = [
            { "COD": "01", "DESCRIP": "Contado" },
            { "COD": "02", "DESCRIP": "Credito" }
        ]
        POPUP({
            array: pago,
            titulo: 'Forma de Pago',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: _evaluarcomercial_con110c
        },
            _evaluarformapago_con110c);
    } else {
        var pago = [
            { "COD": "00", "DESCRIP": "Anticipago" },
            { "COD": "01", "DESCRIP": "Contado" },
            { "COD": "02", "DESCRIP": "Credito" },
            { "COD": "03", "DESCRIP": "Ch. Posfechado" },
            { "COD": "04", "DESCRIP": "Letra" },
            { "COD": "05", "DESCRIP": "Credito US$" },
            { "COD": "06", "DESCRIP": "Empleados" },
            { "COD": "95", "DESCRIP": "Tarjeta. Credito" },
            { "COD": "96", "DESCRIP": "Tarjeta. Debito" },
            { "COD": "97", "DESCRIP": "Contado Cheque" }
        ]
        POPUP({
            array: pago,
            titulo: 'Forma de Pago',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: _evaluarcomercial_con110c
        },
            _evaluarformapago_con110c);
    }
}

function _evaluarformapago_con110c(pago) {
    $_PAGOTERCEW = pago.COD;
    switch (pago.COD) {
        case "00":
        case "01":
        case "02":
        case "03":
        case "04":
        case "05":
        case "06":
        case "95":
        case "96":
        case "97":
            if (($_CONTADOUSU == 'N') && ($_PAGOTERCEW == '01')) {
                CON851('02', '02', null, 'error', 'error');
                _validacionesfpago_con110c();
            } else {
                _evaluarplazo_con110c();
            }
            break;
        default:
            _evaluarcomercial_con110c();
            break;
    }
    $("#formapago_110c").val(pago.COD + " - " + pago.DESCRIP);
}

function _evaluarplazo_con110c() {
    console.log('evaluar PLAZO');
    validarInputs({
        form: '#PLAZO_CON110C',
        orden: "1"
    },
        function () { _evaluarcuposmvm_con110c(); },
        _datoplazo_con110c
    )
}
function _datoplazo_con110c() {
    $_PLAZOTERCEW = $('#plazo_110c').val();
    if (($_ACTIVICATERCEW == '02') || ($_ACTIVICATERCEW == '03') || ($_ACTIVICATERCEW == '04') || ($_ACTIVICATERCEW == '05') || ($_ACTIVICATERCEW == '92')) {
        _evaluargrado_con110c();
    } else {
        _evaluarzona_con110c();
    }
}
function _evaluarzona_con110c() {
    console.log('evaluar ZONA');
    validarInputs({
        form: '#ZONA_CON110C',
        orden: "1"
    },
        function () { _evaluarplazo_con110c(); },
        _datozona_con110c
    )
}
function _datozona_con110c() {
    $_CODZONAW = $('#zona_110c').val();
    console.log($_CODZONAW);
    if (($_CODZONAW.trim() == '') || ($_CODZONAW == '00')) {
        $_ZONATERCEW = $_CODZONAW;
        $_PASOW = '9';
        _leerzonayrutas_con110c();
    } else {
        $_TIPOZONA = '1';
        $_ZONATERCEW = $_TIPOZONA + $_CODZONAW;
        console.log($_ZONATERCEW);
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_ZONATERCEW;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_10_110C, get_url('/APP/CONTAB/CON110C_10.DLL'));
    }
}

function _dataCON110C_10_110C(data) {
    console.log(data, 'CON110C_09 ZONA');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPZONAW = date[1].trim();
    if (swinvalid == '00') {
        $("#zonad_110c").val($_DESCRIPZONAW);
        _evaluarrutas_con110c();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarzona_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _leerzonayrutas_con110c() {
    if ((($_ZONATERCEW.trim() == '') || ($_ZONATERCEW == '00')) || (($_RUTATERCEW.trim() == '') || ($_RUTATERCEW == '00'))) {
        if ((($_NITUSU == '0830505217') || ($_NITUSU == '0822006141')) && ($_ACTIVICATERCEW == '01')) {
            CON851('02', '02', null, 'error', 'error');
            _evaluarzona_con110c();

        } else {
            if($_PASOW == '9') {
                $_DESCRIPZONAW = '';
                $("#zonad_110c").val($_DESCRIPZONAW);
                _evaluarrutas_con110c();
            }else {
                $_DESCRIPRUTAW = '';
                $("#rutad_110c").val($_DESCRIPRUTAW);
                _evaluarorden_con110c();
            }
        }
    }
}
function _evaluarrutas_con110c() {
    console.log('evaluar RUTAS');
    validarInputs({
        form: '#RUTA_110C',
        orden: "1"
    },
        function () { _evaluarzona_con110c(); },
        _datorutas_con110c
    )
}

function _datorutas_con110c() {
    $_CODRUTAW = $('#ruta_110c').val();
    console.log($_CODRUTAW);
    if (($_CODRUTAW.trim() == '') || ($_CODRUTAW == '00')) {
        $_RUTATERCEW = $_CODRUTAW;
        _leerzonayrutas_con110c();
    } else {
        $_TIPOZONA = '2';
        $_RUTATERCEW = $_TIPOZONA + $_CODRUTAW;
        console.log($_RUTATERCEW);
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_RUTATERCEW;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_101_110C, get_url('/APP/CONTAB/CON110C_10.DLL'));
    }
}
function _dataCON110C_101_110C(data) {
    console.log(data, 'CON110C_10 RUTAS');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPRUTAW = date[1].trim();
    if (swinvalid == '00') {
        $("#rutad_110c").val($_DESCRIPRUTAW);
        _evaluarorden_con110c();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarrutas_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarorden_con110c() {
    console.log('evaluar ORDEN');
    validarInputs({
        form: '#ORDEN_110C',
        orden: "1"
    },
        function () { _evaluarrutas_con110c(); },
        _datoorden_con110c
    )
}

function _datoorden_con110c() {
    $_ORDENTERCEW = $('#orden_110c').val();

    if (($_NOVEDADCON110C == '8') && ($.isNumeric($_ACTIVICATERCEW))) {
        $_ACTIVICATERCEW = '000';
        $("#actica_110c").val($_ACTIVICATERCEW);
        _evaluaractica_con110c()
    } else {
        _evaluaractica_con110c();
    }
}

function _evaluaractica_con110c() {
    console.log('evaluar ACT ICA ');
    validarInputs({
        form: '#ACTICA_110C',
        orden: "1"
    },
        function () { _evaluarorden_con110c(); },
        _datoactica_con110c
    )
}
function _datoactica_con110c() {

    $_ACTIVICAW = $('#actica_110c').val();
    if ($_ACTIVICAW.trim() == '') {
        $_ACTIVICATERCEW = '';
        _evaluarporcentica_con110c();
    } else {
        $_ACTIVICATERCEW = $_ACTIVICAW;
        if (Number.isNaN($_ACTIVICATERCEW)) {
            // ($.isNumeric($_ACTIVICATERCEW))
            CON851('57', '57', null, 'error', 'error');
            _evaluaractica_con110c()
        } else {
            _evaluarporcentica_con110c();
        }
    }
}
function _evaluarporcentica_con110c() {
    console.log('evaluar PORCENT ICA ');
    validarInputs({
        form: '#PORCENTICA_110C',
        orden: "1"
    },
        function () { _evaluaractica_con110c(); },
        _datoporcentica_con110c
    )
}
function _datoporcentica_con110c() {
    $_PORCICATERCEW = porcentica_110cMask.unmaskedValue;

    _evaluarporcentret_con110c();
}
function _evaluarporcentret_con110c() {
    console.log('evaluar PORCENT RET ');
    validarInputs({
        form: '#PORCETRETEN_110C',
        orden: "1"
    },
        function () { _evaluarporcentica_con110c(); },
        _datoporcentret_con110c
    )
}
function _datoporcentret_con110c() {

    $_PORCRETTERCEW = porcentreten_110cMask.unmaskedValue;
    _evaluargrado_con110c();
}

function _evaluargrado_con110c() {
    console.log('evaluar GRADO');
    validarInputs({
        form: '#GRDNEGOCIO_110C',
        orden: "1"
    },
        function () { _evaluarporcentica_con110c(); },
        _datogradonegocio_con110c
    )
}

function _datogradonegocio_con110c() {
    $_GRADOTERCEW = $('#grdnegocio_110c').val();
    if ($_NITUSU == '0800202522') {
        if ($_ACTIVICATERCEW == '01') {
            if (($_GRADOTERCEW == '1') || ($_GRADOTERCEW == '2') || ($_GRADOTERCEW == '3') || ($_GRADOTERCEW == '4')) {
                ///// CONTINUE 
                consultagradonegocio_con110c();

            } else {
                CON851('02', '02', null, 'error', 'error');
                _evaluargrado_con110c();
            }
        } else {
            consultagradonegocio_con110c();
        }
    } else {
        if (($_GRADOTERCEW == '0') || ($_GRADOTERCEW.trim() == '')) {
            $_GRADOTERCEW = '9';
            $("#grdnegocio_110c").val($_GRADOTERCEW);
            _evaluarIVA_con110c();
        } else {
            consultagradonegocio_con110c();
        }
    }
}
function consultagradonegocio_con110c() {
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_GRADOTERCEW;
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataCON110C_11_110C, get_url('/APP/CONTAB/CON110C_11.DLL'));
}

function _dataCON110C_11_110C(data) {
    console.log(data, 'CON110C_11 GRADO');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPGRADTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#grdnegociod_110c").val($_DESCRIPGRADTERW);
        _evaluarIVA_con110c();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluargrado_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarIVA_con110c() {
    var iva = [
        { "COD": "1", "DESCRIP": "Regimen Comun" },
        { "COD": "2", "DESCRIP": "Regimen Simplificado" },
        { "COD": "3", "DESCRIP": "No Responsable" },
        { "COD": "9", "DESCRIP": "No Aplica" }
    ]
    POPUP({
        array: iva,
        titulo: 'I.V.A',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluargrado_con110c
    },
        _validariva_con110c);
}

function _validariva_con110c(iva) {
    $_REGIVATERCEW = iva.COD;
    switch (iva.COD) {
        case "1":
        case "2":
        case "3":
        case "9":
            setTimeout(_evaluarcalificacion_con110c, 300);
            break;
        default:
            _evaluargrado_con110c();
            break;
    }
    $("#iva_110c").val(iva.COD + " - " + iva.DESCRIP);
}

function _evaluarcalificacion_con110c() {
    var calificacion = [
        { "COD": "1", "DESCRIP": "Excelente" },
        { "COD": "2", "DESCRIP": "Bueno" },
        { "COD": "3", "DESCRIP": "Regular" },
        { "COD": "4", "DESCRIP": "Malo" },
        { "COD": "9", "DESCRIP": "No Aplica" }
    ]
    POPUP({
        array: calificacion,
        titulo: 'Calificacion',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluarIVA_con110c
    },
        _validarcalificacion_con110c);
}

function _validarcalificacion_con110c(calificacion) {
    $_REGIVATERCEW = calificacion.COD;
    switch (calificacion.COD) {
        case "1":
        case "2":
        case "3":
        case "9":
            _evaluarbaseret_con110c();
            break;
        default:
            _evaluarIVA_con110c();
            break;
    }
    $("#calif_110c").val(calificacion.COD + " - " + calificacion.DESCRIP);
}

function _evaluarbaseret_con110c() {
    console.log('evaluar BASE RET');
    $('#baseret_con110c').val('0');
    validarInputs({
        form: '#BASERET_110C',
        orden: "1",
        event_f3: _ubicargrabar_con110c
    },
        function () { _evaluarcalificacion_con110c(); },
        _datoagenteret_con110c
    )
}
function _datoagenteret_con110c() {
    $_GRADOTERCEW = $('#baseret_con110c').val();
    _evaluarnombreref1_con110c();
}

function _evaluarnombreref1_con110c() {
    $('#tabla3').click();
    console.log('evaluar REFERENCIA');
    validarInputs({
        form: '#NOMBRE1REF_CON110C',
        orden: "1"
    },
        function () { _evaluarbaseret_con110c(); },
        _evaluardirecciref1_con110c
    )
}

function _evaluardirecciref1_con110c() {
    console.log('evaluar DIRE REF');
    validarInputs({
        form: '#DIRREF1_CON110C',
        orden: "1"
    },
        function () { _evaluarnombreref1_con110c(); },
        _evaluartelref1_con110c
    )
}

function _evaluartelref1_con110c() {
    console.log('evaluar TEL REF');
    validarInputs({
        form: '#TELREF1_CON110C',
        orden: "1"
    },
        function () { _evaluardirecciref1_con110c(); },
        _evaluarrelaref1_con110c
    )
}

function _evaluarrelaref1_con110c() {
    console.log('evaluar TEL REF');
    validarInputs({
        form: '#RELACIONREF1_CON110C',
        orden: "1"
    },
        function () { _evaluartelref1_con110c(); },
        _evaluarnombreref2_con110c
    )
}

function _evaluarnombreref2_con110c() {
    console.log('evaluar REFERENCIA2');
    validarInputs({
        form: '#NOMBRE2REF_CON110C',
        orden: "1"
    },
        function () { _evaluarrelaref1_con110c(); },
        _evaluardirecciref2_con110c

    )
}
function _evaluardirecciref2_con110c() {
    console.log('evaluar DIRE REF2');
    validarInputs({
        form: '#DIRREF2_CON110C',
        orden: "1"
    },
        function () { _evaluarnombreref2_con110c(); },
        _evaluartelref2_con110c
    )
}
function _evaluartelref2_con110c() {
    console.log('evaluar TEL REF2');
    validarInputs({
        form: '#TELREF2_CON110C',
        orden: "1"
    },
        function () { _evaluardirecciref2_con110c(); },
        _evaluarrelaref2_con110c
    )
}
function _evaluarrelaref2_con110c() {
    console.log('evaluar TEL REF3');
    validarInputs({
        form: '#RELACIONREF2_CON110C',
        orden: "1"
    },
        function () { _evaluartelref2_con110c(); },
        _evaluarnombreref3_con110c
    )
}
function _evaluarnombreref3_con110c() {
    console.log('evaluar REFERENCIA3');
    validarInputs({
        form: '#NOMBRE3REF_CON110C',
        orden: "1"
    },
        function () { _evaluarrelaref2_con110c(); },
        _evaluardirecciref3_con110c

    )
}
function _evaluardirecciref3_con110c() {
    console.log('evaluar DIRE REF3');
    validarInputs({
        form: '#DIRREF3_CON110C',
        orden: "1"
    },
        function () { _evaluarnombreref3_con110c(); },
        _evaluartelref3_con110c
    )
}
function _evaluartelref3_con110c() {
    console.log('evaluar TEL REF3');
    validarInputs({
        form: '#TELREF3_CON110C',
        orden: "1"
    },
        function () { _evaluardirecciref3_con110c(); },
        _evaluarrelaref3_con110c
    )
}
function _evaluarrelaref3_con110c() {
    console.log('evaluar TEL REF3');
    validarInputs({
        form: '#RELACIONREF3_CON110C',
        orden: "1"
    },
        function () { _evaluartelref3_con110c(); },
        _evaluarempleador_con110c
    )
}

function _evaluarempleador_con110c() {
    console.log('evaluar EMPLEADOR');
    validarInputs({
        form: '#EMPLEADOR_110C',
        orden: "1"
    },
        function () { _evaluarrelaref3_con110c(); },
        _evaluardirempleador_con110c
    )
}
function _evaluardirempleador_con110c() {
    console.log('evaluar DIR EMPLEADO');
    validarInputs({
        form: '#DIRECEMPLEADOR_110C',
        orden: "1"
    },
        function () { _evaluarempleador_con110c(); },
        _evaluartelempleador_con110c
    )
}

function _evaluartelempleador_con110c() {
    console.log('evaluar TEL EMPLEADOR');
    validarInputs({
        form: '#TELEMPLEADOR_110C',
        orden: "1"
    },
        function () { _evaluardirempleador_con110c(); },
        _evaluarcargoempleador_con110c
    )
}
function _evaluarcargoempleador_con110c() {
    console.log('evaluar CARGO EMPLEADOR');
    validarInputs({
        form: '#CARGOEMPLEADOR_110C',
        orden: "1"
    },
        function () { _evaluartelempleador_con110c(); },
        _evaluarsueldoempleador_con110c
    )
}
function _evaluarsueldoempleador_con110c() {
    console.log('evaluar SUELDO EMPLEADOR');
    validarInputs({
        form: '#SUELDOEMPLEADOR_110C',
        orden: "1"
    },
        function () { _evaluarcargoempleador_con110c(); },
        _evaluarantigempleador_con110c
    )
}
function _evaluarantigempleador_con110c() {
    console.log('evaluar ANTIGUEDAD EMPLEADOR');
    validarInputs({
        form: '#ANTIGEMPLEADOR_110C',
        orden: "1"
    },
        function () { _evaluarsueldoempleador_con110c(); },
        _evaluarfechanacempl_con110c
    )
}
function _evaluarfechanacempl_con110c() {
    console.log('evaluar FECHA NACI EMPLEADOR');
    validarInputs({
        form: '#FECHANACIM_CON110C',
        orden: "1"
    },
        function () { _evaluarantigempleador_con110c(); },
        _evaluarembargosempl_con110c
    )
}
function _evaluarembargosempl_con110c() {
    console.log('evaluar EMBARGOS EMPLEADOR');

    validarInputs({
        form: '#EMBARGOS_CON110C',
        orden: "1"
    },
        function () { _evaluarfechanacempl_con110c(); },
        _datoembargosempl_con110c
    )
}
function _datoembargosempl_con110c() {

    $_EMBARGOTERCEW = $('#embargos_con110c').val();
    if (($_NITUSU == '0800224972') || ($_NITUSU == '0900165076') || ($_NITUSU == '0830138486')) {
        _evaluarcedulasempl_con110c()
    } else {
        ultimapestaña_con110c();
    }
}

function _evaluarcedulasempl_con110c() {
    console.log('evaluar CIUDAD CEDULA EMPLEADOR');
    validarInputs({
        form: 'CELMPLEADOR_CON110C',
        orden: "1"
    },
        function () { _evaluarembargosempl_con110c(); },
        _evaluarentidadempl_con110c
    )
}

function _evaluarentidadempl_con110c() {
    console.log('evaluar ENTIDAD EMPLEADOR');
    validarInputs({
        form: '#ENTIDADAFIL_CON110C',
        orden: "1"
    },
        function () { _evaluarembargosempl_con110c(); },
        _datoentidadafil_con110c
    )
}
function _datoentidadafil_con110c() {
    $_ENTIDAFITERCEW = $('#entidadafil_con110c').val();

    ///// PENDIENTE DLL CON110C_11 REFERENTE A LA CONSULTA DEL CON802D
    _evaluarfechaafil_con110c();
}
function _evaluarfechaafil_con110c() {
    console.log('evaluar ENTIDAD EMPLEADOR');
    validarInputs({
        form: '#ENTIDADAFIL_CON110C',
        orden: "1"
    },
        function () { _evaluarembargosempl_con110c(); },
        ultimapestaña_con110c
    )
}

function ultimapestaña_con110c(){
    $('#tabla4').click();
    if ($_NOVEDADCON110C == '7'){
        _evaluardirectabla_con110c(); 
    }else{
        _validaciontabla_con110c(); 
    }
}

function _evaluardirectabla_con110c(){
    validarInputs({
        form: '#DIRESUCU_CON103',
        orden: "1"
    },
        function () { pestañainicio() },
        _validardirecciontabla
    )
}
function _validardirecciontabla(){
    $_DIRECCIONTABLA = $("#diresucu_con110c").val();
    // if (ITEM > 20){
    //     _validardatos_con110c()
    // }else{

    // }
    _evaluarteltabla_con110c(); 
}
function _evaluarteltabla_con110c(){
    validarInputs({
        form: '#TELSUCU_CON110C',
        orden: "1"
    },
        function () { pestañainicio() },
        _validarteltabla
    )
}
function _validarteltabla(){
    $_TELTABLA = $("#telsucu_con110c").val();
    _evaluarciudadtabla_con110c(); 
}
function _evaluarciudadtabla_con110c(){
    validarInputs({
        form: '#CIUDADSUCU_CON110C',
        orden: "1"
    },
        function () { pestañainicio() },
        _validarciudadtabla
    )
}
function _validarciudadtabla(){
    $_CIUDADTABLA = $("#ciudadsucu_con110c").val();
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_CIUDADTABLA;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_05_01_110C, get_url('/APP/CONTAB/CON110C_05.DLL'));
}

function _dataCON110C_05_01_110C(data) {
    console.log(data, 'CON110C_05_1 CIUDAD');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == '00') {
        _evaluarbarriotabla_con110c()
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarciudadtabla_con110c(); 
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _evaluarbarriotabla_con110c(){
    validarInputs({
        form: '#BARRIOSUCU_CON110C',
        orden: "1"
    },
        function () { pestañainicio() },
        _validarbarriotabla
    )
}
function _validarbarriotabla(){
    $_BARRIOTABLA = $("#barriosucu_110c").val();
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_BARRIOTABLA;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_13_110C, get_url('/APP/CONTAB/CON110C_13.DLL'));
}

function _dataCON110C_13_110C(data) {
    console.log(data, 'CON110C_13 BARRIO');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == '00') {
        if ($_NOVEDADCON110C == 7) {
            agregarFilaTabla_con110c();
        } else {
            editarfilatabla_con110c();
        }
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        if ($_NOVEDADCON110C == 7) {
            agregarFilaTabla_con110c();
        } else {
            editarfilatabla_con110c();
        }
        // _evaluarbarriotabla_con110c();  
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function editarfilatabla_con110c(){
    var tamañotabla = $('#TABLADIRECCION_CON110C tbody tr').length;
    let nfila = parseInt($_Nfila) - 1;
    // console.debug($_Nfila);
    let fila = $('#TABLADIRECCION_CON110C tbody tr:eq(' + nfila + ')');
    let html = 
        '<td>' + $('#diresucu_con110c').val() +
        '</td><td>' + $('#telsucu_con110c').val() +
        '</td><td>' + $('#ciudadsucu_con110c').val() +
        '</td><td>' + $('#barriosucu_110c').val() +
        '</td>';
    fila.html(html);
    
    _validaciontabla_con110c();
}

function agregarFilaTabla_con110c() {

    $('#TABLADIRECCION_CON110C tbody').append(
        '<tr>' +
        '<td>' + $('#diresucu_con110c').val() + '</td>' +
        '<td>' + $('#telsucu_con110c').val() + '</td>' +
        '<td>' + $('#ciudadsucu_con110c').val() + '</td>' +
        '<td>' + $('#barriosucu_110c').val() + '</td>' +
        '</tr>'
    );
    _validaciontabla_con110c();
}

function _validaciontabla_con110c(orden){
    validarTabla(
        {
            tabla: '#TABLADIRECCION_CON110C',
            orden: orden,
            event_f3: _ubicargrabar_con110c
        },
        _direcciones,
        function () {
            _evaluarnombreref1_con110c()
        },
        _ubicargrabar_con110c

    );
}

function _direcciones(datos){
    var tabla110C = datos;
    $_Nfila = tabla2.rowIndex;
    // $('#item_con110c').val(tabla110C.cells[0].textContent);
    $('#diresucu_con110c').val(tabla110C.cells[0].textContent);
    $('#telsucu_con110c').val(tabla110C.cells[1].textContent);
    $('#ciudadsucu_con110c').val(tabla110C.cells[2].textContent);
    $('#barriosucu_110c').val(tabla110C.cells[3].textContent);
    
    if ($_NOVEDADCON110C == 7) {
        _limpiarcampos_con110c();
        _evaluardirectabla_con110c();
        // _evaluaralmacen();
    } else {
        _evaluardirectabla_con110c();
        // _evaluaralmacen();
    }
}
function _limpiarcampos_con110c() {
    
    $('#diresucu_con110c').val('');
    $('#telsucu_con110c').val('');
    $('#ciudadsucu_con110c').val('');
    $('#barriosucu_110c').val('');
}


///////////////////////////// GRABAR DATOS ///////////////////////////////
function _ubicargrabar_con110c() {
    console.debug('ubicar grabar');
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
                console.log('si');
                // _grabardatos_con110c()

            }
            else {
                console.log('no')
            }
        }
    })
}

function _grabardatos_con110c() {

    $_NOMREF1TERCEW = $('#nombreref1_110c').val();
    $_DIRREF1TERCEW = $('#dirref1_110c').val();
    $_TELREF1TERCEW = $('#telref1_110c').val();
    $_RELREF1TERCEW = $('#relacionref1_110c').val();
    $_NOMREF2TERCEW = $('#nombreref2_110c').val();
    $_DIRREF2TERCEW = $('#dirref2_110c').val();
    $_TELREF2TERCEW = $('#telref2_110c').val();
    $_RELREF2TERCEW = $('#relacionref2_110c').val();
    $_NOMREF3TERCEW = $('#nombreref3_110c').val();
    $_DIRREF3TERCEW = $('#dirref3_110c').val();
    $_TELREF3TERCEW = $('#telref3_110c').val();
    $_RELREF3TERCEW = $('#relacionref3_110c').val();

    $_NOMTRABTERCEW = $('#empleador_110c').val();
    $_DIRTRABTERCEW = $('#direc_110c').val();
    $_TELTRABTERCEW = $('#telempleador_110c').val();
    $_CARTRABTERCEW = $('#cargoempleador_110c').val();
    $_SUETRABTERCEW = $('#sueldoempleador_110c').val();
    $_ANTTRABTERCEW = $('#antigempleador_110c').val();
    $_FECHANACTERCEW = $('#fechanac_con110c').val();
    $_CIUEXPTERCEW = $('#celempleador_con110c').val();
    $_FECHAAFILTERCEW = $('#fechaafil_con110c').val();

    $('#rut_110c').is(':checked') ? $_RUTTERCEW == 'S' : $_RUTTERCEW == 'N';
    $('#contribuyente_con110c').is(':checked') ? $_GRANCONTRIBTERCEW == 'S' : $_GRANCONTRIBTERCEW == 'N';
    $('#retenedor_con110c').is(':checked') ? $_RETETERCEW == 'S' : $_RETETERCEW == 'N';
    $('#reteivacompra_con110c').is(':checked') ? $_RETIVACOMPTERCEW == 'S' : $_RETIVACOMPTERCEW == 'N';
    $('#causareteiva_con110c').is(':checked') ? $_RETIVATERCEW == 'S' : $_RETIVATERCEW == 'N';
    $('#exento_con110c').is(':checked') ? $_EXENTRETTERCEW == 'S' : $_EXENTRETTERCEW == 'N';
    $('#cobroseg_con110c').is(':checked') ? $_SEGUROTERCEW == 'S' : $_SEGUROTERCEW == 'N';
    $('#datacredito_con110c').is(':checked') ? $_DATACRETERCEW == 'S' : $_DATACRETERCEW == 'N';
    $('#acuerdopago_con110c').is(':checked') ? $_ACUEPAGOTERCEW == 'S' : $_ACUEPAGOTERCEW == 'N';

    $('#capitado_con110c').is(':checked') ? $_CAPITADOTERCEW == 'S' : $_CAPITADOTERCEW == 'N';
    $('#nitcliente_con110c').is(':checked') ? $_NITCLITERCEW == 'S' : $_NITCLITERCEW == 'N';
    $('#icav_con110c').is(':checked') ? $_RETICAVTERCEW == 'S' : $_RETICAVTERCEW == 'N';
    $('#excluiriva_con110c').is(':checked') ? $_EXIVATERCEW == 'S' : $_EXIVATERCEW == 'N';
}






////////////////////////////// NOVEDAD 8 Y 9 ///////////////////////////////////

function _consultadatos_con110c() {
    console.debug($_CODTERCEROW, 'novedad 8');
    console.log($_CODTERCEROW.padStart(10, '0'));

    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_CODTERCEROW.padStart(10, '0');
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _dataCON110C_02, get_url('/APP/CONTAB/CON110C_02.DLL'));
}

function _dataCON110C_02(data) {
    console.log(data, "CON110C_02");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    $_CODTERCEROW = date[1].trim();
    $_DVTERCEROW = date[2].trim();
    $_FECHACUMPTERCEW = date[3].trim();
    $_APEL1TER2W = date[4].trim();
    $_APEL2TER2W = date[5].trim();
    $_NOMB1TER2W = date[6].trim();
    $_DIRECCTERCEW = date[7].trim();
    $_CODCIUTERCEW = date[8].trim();
    $_DESCRIPCIUTERW = date[9].trim();
    $_INDICTERCEW = date[10].trim();
    $_TELTERCEW = date[11].trim();
    $_NITTERCEW = date[12].trim();
    $_TIPOIDTERCEW = date[13].trim();
    $_ENTIDADTERCEW = date[14].trim();
    $_DESCRIPENTTERW = date[15].trim();
    $_ACTTERCEW = date[16].trim();
    $_DESCRIPACTTERW = date[17].trim();
    $_CONVENIOTERCEW = date[18].trim();
    $_RUTTERCEW = date[19].trim();
    $_NOMCOMERTERCEW = date[20].trim();
    $_OTROSTERCEW = date[21].trim();
    $_CONTACTTERCEW = date[22].trim();
    $_WEBTERCEW = date[23].trim();
    $_CARGOTERCEW = date[24].trim();
    $_EMAILTERCEW = date[25].trim();
    $_ASESORTERCEW = date[26].trim();
    $_TIPOCUPOTERCEW = date[27].trim();
    $_FECHACRETERCEW = date[28].trim();
    $_ADMINCRETERCEW = date[29].trim();
    $_FECHAMODTERCEW = date[30].trim();
    $_ADMINMODTERCEW = date[31].trim();
    $_FACTORTERCEW = date[32].trim();
    $_PORCICATER2W = $_FACTORTERCEW.substring(0, 3);
    $_PORCRETTER2W = $_FACTORTERCEW.substring(4, 6);

    $_CUPOTERCEW = date[33].trim();
    $_VENDTERCEW = date[34].trim();

    $_PAGOTERCEW = date[35].trim();
    $_PLAZOTERCEW = date[36].trim();
    $_ZONATERCEW = date[37].trim();
    console.log($_ZONATERCEW, 'zona')
    $_DESCRIPZONAW = date[38].trim();
    console.log($_DESCRIPZONAW, 'descrip zona')
    $_RUTATERCEW = date[39].trim();
    console.log($_RUTATERCEW, 'ruta')
    $_DESCRIPRUTAW = date[40].trim();
    console.log($_DESCRIPRUTAW, 'descrip ruta')
    $_ORDENTERCEW = date[41].trim();
    console.log($_ORDENTERCEW, 'orden')
    $_ACTIVICATERCEW = date[42].trim();
    console.log($_ACTIVICATERCEW, 'act ica')
    $_PORCICATERCEW = date[43].trim();
    $_PORCRETTERCEW = date[44].trim();
    $_GRADOTERCEW = date[45].trim();
    $_DESCRIPGRADTERW = date[46].trim();
    $_REGIVATERCEW = date[47].trim();
    $_CALIFITERCEW = date[48].trim();
    $_GRANCONTRIBTERCEW = date[49].trim();
    $_RETETERCEW = date[50].trim();
    $_VLRBASERETTERCEW = date[51].trim();
    $_RETIVACOMPTERCEW = date[52].trim();
    $_RETIVATERCEW = date[53].trim();
    $_EXENTRETTERCEW = date[54].trim();
    $_SEGUROTERCEW = date[55].trim();
    $_DATACRETERCEW = date[56].trim();
    $_ACUEPAGOTERCEW = date[57].trim();
    $_CAPITADOTERCEW = date[58].trim();
    $_NITCLITERCEW = date[60].trim();
    console.log($_NITCLITERCEW, 'nit')
    $_RETICAVTERCEW = date[61].trim();
    console.log($_RETICAVTERCEW, 'rete iva')
    $_BLOQTERCEW = date[62].trim();
    $_EXIVATERCEW = date[63].trim();
    $_MARCATERCEW = date[64].trim();
    $_EMPRESAVEHTERCEW = date[65].trim();

    if (swinvalid == '00') {
        console.debug($_CODTERCEROW, 'novedad 8');
        console.log($_CODTERCEROW.padStart(10, '0'));

        let datos_envio = datosEnvio()
        datos_envio += localStorage.Usuario + '|'
        datos_envio += $_CODTERCEROW.padStart(10, '0');
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_03, get_url('/APP/CONTAB/CON110C_03.DLL'));

        // _mostrardatos_con110c();
    }
    else {
        CON852(date[1], date[2], date[3], _toogleNav);
    }

}

function _dataCON110C_03(data) {
    console.log(data, "CON110C_02");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    $_NROVEHTERCEW = date[1].trim();
    $_PLACAVEHTERCEW = date[2].trim();
    $_REPRETERCEW = date[3].trim();
    $_IDREPRETERCEW = $_REPRETERCEW.substring(0, 10);
    $_NOMREPRETERCEW = $_REPRETERCEW.substring(10, 30);
    $_EMAILREPTERCEW = date[4].trim();
    $_TESORTERCEW = date[5].trim();
    $_IDTESORTERCEW = $_TESORTERCEW.substring(0, 10);
    $_NOMTESORTERCEW = $_TESORTERCEW.substring(10, 30);
    $_EMAILTESOTERCEW = date[6].trim();
    $_REF1TERCEW = date[7].trim();
    $_NOMREF1TERCEW = $_REF1TERCEW.substring(0, 30);
    $_DIRREF1TERCEW = $_REF1TERCEW.substring(30, 60);
    $_TELREF1TERCEW = $_REF1TERCEW.substring(60, 75);
    $_RELREF1TERCEW = $_REF1TERCEW.substring(75, 85);
    $_REF2TERCEW = date[8].trim();
    $_NOMREF2TERCEW = $_REF2TERCEW.substring(0, 30);
    $_DIRREF2TERCEW = $_REF2TERCEW.substring(30, 60);
    $_TELREF2TERCEW = $_REF2TERCEW.substring(60, 75);
    $_RELREF2TERCEW = $_REF2TERCEW.substring(75, 85);
    $_REF3TERCEW = date[9].trim();
    $_NOMREF3TERCEW = $_REF3TERCEW.substring(0, 30);
    $_DIRREF3TERCEW = $_REF3TERCEW.substring(30, 60);
    $_TELREF3TERCEW = $_REF3TERCEW.substring(60, 75);
    $_RELREF3TERCEW = $_REF3TERCEW.substring(75, 85);
    $_TRABTERCEW = date[10].trim();
    $_NOMTRABTERCEW = $_TRABTERCEW.substring(0, 30);
    $_DIRTRABTERCEW = $_TRABTERCEW.substring(30, 60);
    $_TELTRABTERCEW = $_TRABTERCEW.substring(60, 75);
    $_CARTRABTERCEW = $_TRABTERCEW.substring(75, 90);
    $_SUETRABTERCEW = $_TRABTERCEW.substring(90, 100);
    $_ANTTRABTERCEW = $_TRABTERCEW.substring(100, 110);
    $_FECHANACTERCEW = date[11].trim();
    $_EMBARGOTERCEW = date[12].trim();
    $_CIUEXPTERCEW = date[13].trim();
    $_ENTIDAFITERCEW = date[14].trim();
    $_FECHAAFILTERCEW = date[15].trim();

    if (date[0].trim() == '00') {
        var json = date[16].trim();
        var rutajson = get_url("temp/" + json);
        console.log(rutajson);
        SolicitarDatos(
            null,
            function (data) {
                console.log(data, 'direcciones')
                $_DIRECCI_CON110C = data.DIRECCIONES;
                // arraygrpser.pop();
                var arrayEliminar = [];
                arrayEliminar.push(json);
                _eliminarJson(arrayEliminar, on_eliminarJsoncon110c);
            },
            rutajson
        );

    } else {
        loader('hide');
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function on_eliminarJsoncon110c(data) {
    console.log(data);
    var date = data.split('|');
    if (date[0].trim() == '00') {
        console.debug('json eliminado');
        _mostrardatos_con110c();
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function _mostrardatos_con110c() {
    $_RUTTERCEW == 'S' ? $('#rut_110c')[0].checked = true : $('#rut_110c')[0].checked = false;
    $_GRANCONTRIBTERCEW == 'S' ? $('#contribuyente_con110c')[0].checked = true : $('#contribuyente_con110c')[0].checked = false;
    $_RETETERCEW == 'S' ? $('#retenedor_con110c')[0].checked = true : $('#retenedor_con110c')[0].checked = false;
    $_RETIVACOMPTERCEW == 'S' ? $('#reteivacompra_con110c')[0].checked = true : $('#reteivacompra_con110c')[0].checked = false;
    $_RETIVATERCEW == 'S' ? $('#causareteiva_con110c')[0].checked = true : $('#causareteiva_con110c')[0].checked = false;
    $_EXENTRETTERCEW == 'S' ? $('#exento_con110c')[0].checked = true : $('#exento_con110c')[0].checked = false;
    $_SEGUROTERCEW == 'S' ? $('#cobroseg_con110c')[0].checked = true : $('#cobroseg_con110c')[0].checked = false;
    $_DATACRETERCEW == 'S' ? $('#datacredito_con110c')[0].checked = true : $('#datacredito_con110c')[0].checked = false;
    $_ACUEPAGOTERCEW == 'S' ? $('#acuerdopago_con110c')[0].checked = true : $('#acuerdopago_con110c')[0].checked = false;
    $_CAPITADOTERCEW == 'S' ? $('#capitado_con110c')[0].checked = true : $('#capitado_con110c')[0].checked = false;
    $_NITCLITERCEW == 'S' ? $('#nitcliente_con110c')[0].checked = true : $('#nitcliente_con110c')[0].checked = false;
    $_RETICAVTERCEW == 'S' ? $('#icav_con110c')[0].checked = true : $('#icav_con110c')[0].checked = false;
    $_BLOQTERCEW == 'S' ? $('#bloquearvend_con110c')[0].checked = true : $('#bloquearvend_con110c')[0].checked = false;
    $_EXIVATERCEW == 'S' ? $('#excluiriva_con110c')[0].checked = true : $('#excluiriva_con110c')[0].checked = false;

    $('#codclien_con110c').val($_CODTERCEROW);
    $('#dv_con110c').val($_DVTERCEROW);
    $_DIACUMPLETERCEW = $_FECHACUMPTERCEW.substring(4, 6);
    $_MESCUMPLETERCEW = $_FECHACUMPTERCEW.substring(6, 8);
    $('#cumple_con110').val($_DIACUMPLETERCEW + '/' + $_MESCUMPLETERCEW);
    $('#1erapellido_con110c').val($_APEL1TER2W);
    $('#2doapellido_con110c').val($_APEL2TER2W);
    $('#nombres_con110c').val($_NOMB1TER2W);
    $('#direcc_con110c').val($_DIRECCTERCEW);
    $('#ciudad_con110').val($_CODCIUTERCEW);
    $('#ciudadd_con110c').val($_DESCRIPCIUTERW);
    $('#ind_con110c').val($_INDICTERCEW);
    $('#tel_con110c').val($_TELTERCEW);
    $('#cc_con110c').val($_NITTERCEW);
    $('#tipoident_con110c').val($_TIPOIDTERCEW);
    $('#entidad_con110c').val($_ENTIDADTERCEW);
    $('#entidadd_con110c').val($_DESCRIPENTTERW);
    $('#activi_con110c').val($_ACTTERCEW);
    $('#actividadd_con110c').val($_DESCRIPACTTERW);
    $('#convenio_con110c').val($_CONVENIOTERCEW);
    // $('#conveniod_con110c').val();
    $('#nomcom_con110c').val($_NOMCOMERTERCEW);
    $('#datos_con110c').val($_OTROSTERCEW);
    $('#contact_con110c').val($_CONTACTTERCEW);
    $('#web_con110c').val($_WEBTERCEW);
    $('#cargo_con110c').val($_CARGOTERCEW);
    // $('#ultfact_con110c').val();
    $('#email_con110c').val($_EMAILTERCEW);
    $('#asesor_con110c').val($_ASESORTERCEW);
    $('#cupo_con110c').val($_TIPOCUPOTERCEW);
    $_ANOCRETERCEW = $_FECHACRETERCEW.substring(0, 4);
    $_MESCRETERCEW = $_FECHACRETERCEW.substring(4, 6);
    $_DIACRETERCEW = $_FECHACRETERCEW.substring(6, 8);
    $('#creado_110c').val($_ANOCRETERCEW + '/' + $_MESCRETERCEW + '/' + $_DIACRETERCEW);
    $('#creadod_110c').val($_ADMINCRETERCEW);
    $_ANOMODTERCEW = $_FECHAMODTERCEW.substring(0, 4);
    $_MESMODTERCEW = $_FECHAMODTERCEW.substring(4, 6);
    $_DIAMODTERCEW = $_FECHAMODTERCEW.substring(6, 8);
    $('#modificado_110c').val($_ANOMODTERCEW + '/' + $_MESMODTERCEW + '/' + $_DIAMODTERCEW);
    $('#modificadod_103').val($_ADMINMODTERCEW);

    $('#factventas_con110c').val($_PORCICATER2W);
    $('#factventasd_con110c').val($_PORCRETTER2W);
    $('#smvm_con110c').val($_CUPOTERCEW);
    // $('#smvmd_con110c').val();
    $('#vendedor_con110').val($_VENDTERCEW);
    // $('#descripvendedor_con110c').val();
    $('#formapago_110c').val($_PAGOTERCEW);
    $('#plazo_110c').val($_PLAZOTERCEW);
    $('#zona_110c').val($_ZONATERCEW);
    $('#zonad_110c').val($_DESCRIPZONAW);
    $('#ruta_110c').val($_RUTATERCEW);
    $('#rutad_110c').val($_DESCRIPRUTAW);

    $('#orden_110c').val($_ORDENTERCEW);
    $('#actica_110c').val($_ACTIVICATERCEW);
    $('#porcetica_110c').val($_PORCICATERCEW);
    $('#porcentreten_110c').val($_PORCRETTERCEW);
    $('#grdnegocio_110c').val($_GRADOTERCEW);
    $('#grdnegociod_110c').val($_DESCRIPGRADTERW);
    $('#iva_110c').val($_REGIVATERCEW);
    $('#calif_110c').val($_CALIFITERCEW);
    $('#baseret_con110c').val($_VLRBASERETTERCEW);

    // $('#hectaria_con110c').val();
    $('#marca_con110c').val($_MARCATERCEW);
    $('#empresa_con110c').val($_EMPRESAVEHTERCEW);
    $('#numero_con110c').val($_NROVEHTERCEW);
    $('#placa_con110c').val($_PLACAVEHTERCEW);

    // $('#codventas_con110c').val();

    $('#replegal_con110c').val($_IDREPRETERCEW);
    $('#nombrelegal_con110c').val($_NOMREPRETERCEW);
    $('#emailemp_con110c').val($_EMAILREPTERCEW);
    $('#tesorero_con110c').val($_IDTESORTERCEW);
    $('#nombreteso_con110c').val($_NOMTESORTERCEW);
    $('#emailteso_con110c').val($_EMAILTESOTERCEW);

    $('#nombreref1_110c').val($_NOMREF1TERCEW);
    $('#dirref1_110c').val($_DIRREF1TERCEW);
    $('#telref1_110c').val($_TELREF1TERCEW);
    $('#relacionref1_110c').val($_RELREF1TERCEW);
    $('#nombreref2_110c').val($_NOMREF2TERCEW);
    $('#dirref2_110c').val($_DIRREF2TERCEW);
    $('#telref2_110c').val($_TELREF2TERCEW);
    $('#telref2_110c').val($_RELREF2TERCEW);
    $('#nombreref3_110c').val($_NOMREF3TERCEW);
    $('#dirref3_110c').val($_DIRREF3TERCEW);
    $('#telref3_110c').val($_TELREF3TERCEW);
    $('#relacionref3_110c').val($_RELREF3TERCEW);
    $('#empleador_110c').val($_NOMTRABTERCEW);
    $('#direc_110c').val($_DIRTRABTERCEW);
    $('#telempleador_110c').val($_TELTRABTERCEW);
    $('#cargoempleador_110c').val($_CARTRABTERCEW);
    $('#sueldoempleador_110c').val($_SUETRABTERCEW);
    $('#antigempleador_110c').val($_ANTTRABTERCEW);
    $_ANONACTERCEW = $_FECHANACTERCEW.substring(0, 4);
    $_MESNACTERCEW = $_FECHANACTERCEW.substring(4, 6);
    $_DIANACTERCEW = $_FECHANACTERCEW.substring(6, 8);
    $('#fechanac_con110c').val($_ANONACTERCEW + '/' + $_MESNACTERCEW + '/' + $_DIANACTERCEW);
    $('#embargos_con110c').val($_EMBARGOTERCEW);
    $('#celempleador_con110c').val($_CIUEXPTERCEW);
    $('#entidadafil_con110c').val($_ENTIDAFITERCEW);
    $_ANOAFILTERCEW = $_FECHANACTERCEW.substring(0, 4);
    $_MESAFILTERCEW = $_FECHANACTERCEW.substring(4, 6);
    $_DIAAFILTERCEW = $_FECHANACTERCEW.substring(6, 8);
    $('#fechaafil_con110c').val($_ANOAFILTERCEW + '/' + $_MESAFILTERCEW + '/' + $_DIAAFILTERCEW);

    var cont = 0;
    for (var i = 0; i < $_DIRECCI_CON110C.length; i++) {
        direcciontabla = $_DIRECCI_CON110C[i].DIRECCION;
        ciudadtabla = $_DIRECCI_CON110C[i].CODCIU;
        telefonotabla = $_DIRECCI_CON110C[i].TELEXT;
        barriotabla = $_DIRECCI_CON110C[i].BARRIOTER;
        var sumar = $_DIRECCI_CON110C[i].DIRECCION.trim();
        if (sumar.length > 1) {
            cont++;
            $('#TABLADIRECCION_CON110C tbody').append(''
                + '<tr>'
                + '<td>' + cont.toString().padStart(2, '0') + '</td>'
                + '<td>' + direcciontabla + '</td>'
                + '<td>' + ciudadtabla + '</td>'
                + '<td>' + telefonotabla + '</td>'
                + '<td>' + barriotabla + '</td>'
                + "</tr>"
            );
        }

    }

    if ($_NOVEDADCON110C == '9') {
        _retiroregistro_con110c();
    }
}

function _retirar_con110c() {
    _consultadatos_con110c();
}

function _retiroregistro_con110c() {
    // _consultademostrarinf(); 
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
                // _grabarcorresponsalia();
                if (($_NOVEDADCON110C == '7') || ($_NOVEDADCON110C == '8')) {
                    _grabardatos_con110c();
                } else {
                    _eliminarregistro_con110c();
                }
            }
            else {
                _toggleNav();

            }
        }
    });

}





//////////////////////////////////////////////// OTRAS FUNCIONES //////////////////////////
