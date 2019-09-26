var $_OTRSTAT = '00', $_FECHACUMPTERCEW = '', $_APEL2TER2W = '';

var $_CODTERCEROLNK, $_NOMTERCEROLNK = '', $_DESCRIPTER2W = '';

// $_APEL1TERCEROLNK = $_NOMTERCEROLNK.substring(0,20); 
// $_APEL2TERCEROLNK = $_NOMTERCEROLNK.substring(20,40); 
// $_NOMB1TERCEROLNK  = $_NOMTERCEROLNK.substring(40,70); 

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    loader('hide');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.cod_oper ? localStorage.cod_oper : false;
    // $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    // $_MESLNK = $_FECHA_LNK.substring(2, 4);
    // $_ANOLNK = $_FECHA_LNK.substring(0, 2);
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


    // _dato_novedad_7767()
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

    }else {
        console.debug('novedad 7');
        $_NOVEDADCON110C = 7;
        $('#novedad_CON110C').val($_NOVEDADCON110C);

        revisarpermisos_con110c();
    }
}

// function _evaluarcodtercero110c() {
//     console.debug('evaluar codtercero');
//     validarInputs({
//         form: '#CODCLIEN_CON110C',
//         orden: "1"
//     },
//         function () { CON850(_datonovedad_con110c); },
//         _consultatercero
//     )
// }

// function _consultatercero() {
//     $_CODTERCEROW = $('#codclien_con110c').val();
//     // $_CODTERCEROW = $_COD_TER  
//     console.debug($_CODTERCEROW, 'novedad 8');
//     console.log($_CODTERCEROW.padStart(10, '0'));

//     let datos_envio = datosEnvio();
//     datos_envio += '|'
//     datos_envio += $_CODTERCEROW.padStart(10, '0');
//     console.debug(datos_envio);
//     SolicitarDll({ datosh: datos_envio }, _dataCON110C_01_110C, get_url('/CONTAB/APP/CON110C_01.DLL'));

// }

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
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_OPSEGU;
    SolicitarDll({ datosh: datos_envio }, _dataCON904_01_110C, get_url("/APP/CONTAB/CON904.DLL"));
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

function _leertercero_con110c(){
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
    if ((swinvalid == '00') || ($_SW9CON110C = '0')) {
        $_SW9CON110C = '1';
        $_NOVEDADCON110C = 8;
        _leertercero_con110c();
    } else {
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
    }else{
        _evaluardatocumpleaños_con110c(); 
    }
    
}

function _evaluardatocumpleaños_con110c() {
    console.debug('fecha cumpleaños');
    // momentMask.updateValue();
    validarInputs({
        form: '#CUMPLE_CON110C',
        orden: "1"
    },
        function () { _evaluardatodv_con110c(); },
        _dato1apellido_con110c
    )
}

function _dato1apellido_con110c(){
    console.debug('dato1apellido');

    if ($_NOVEDADCON110C == '7'){
        if($_CODTERCEROW = 0){
            $_NOMBRECLIW = $_NOMUSU; 
            $("#1erapellido_con110c").val($_NOMBRECLIW);
        }
    }
    validacionesnombres(); 
}

function validacionesnombres(){
    console.debug('otra');
    if (($_CODTERCEROW > '0800000000') && ($_CODTERCEROW < '1000000000')){
        console.debug('continuar')
        if(($_NITUSU == '0830009610') || ($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')){

        }else{

        }
        
    }
    else{
        console.debug(' nuevo else ')
        if($_DESCRIPTER2W.trim() == ''){
            if($_NOMBRECLIW != ''){
                $_DESCRIPTER2W = $_NOMBRECLIW;
                $("#1erapellido_con110c").val($_DESCRIPTER2W); 
                //// NOMBRE-TER-EXT
                // MOVE POW-ON     TO POW-ENABLE OF RAZON-L                                  
                // CALL SETFOCUS OF RAZON-L.
                // EXIT PROGRAM.
            }else{
                ///CAJA RAZON L 
            }
        }
        _evaluardato1apellido_con110c(); 
    }
}

function _evaluardato1apellido_con110c() {
    console.debug('evaluarapellido');
    validarInputs({
        form: '#PRAPELLIDO_CON110C',
        orden: "1"
    },
        function () { _evaluardatocumpleaños_con110c(); },
        _aceptarapellido1_con110c
    )
}

function _aceptarapellido1_con110c(){
    console.debug('aceptar apellido 1')
    $_APEL1TER2W = $('#1erapellido_con110c').val();
    // $_DESCRIPTER2W = $('#1erapellido_con110c').val();
    // $_APEL1TER2W = $_DESCRIPTER2W.substring(0,20); 
    // $_APEL2TER2W = $_DESCRIPTER2W.substring(20,40); 
    // $_NOMB1TER2W = $_DESCRIPTER2W.substring(40,70); 
    if($_APEL1TER2W.trim() == ''){
        CON851('02', '02', null, 'error', 'error');
        _evaluardato1apellido_con110c()
    }else{
        _evaluardato2apellido_con110c()
    }
}

function _evaluardato2apellido_con110c() {
    console.debug('evaluarapellido2');
    validarInputs({
        form: '#SDOAPELLIDO_CON110C',
        orden: "1"
    },
        function () { _evaluardato1apellido_con110c(); },
        _aceptarapellido2_con110c
    )
}

function _aceptarapellido2_con110c(){
    console.debug('aceptar apellido 2')
    $_APEL2TER2W = $('#2doapellido_con110c').val();
    
    _evaluardatonombre_con110c(); 
}

function _evaluardatonombre_con110c(){
    console.debug('evaluarnombres');
    validarInputs({
        form: '#NOMBRES_CON110C',
        orden: "1"
    },
        function () { _evaluardato2apellido_con110c(); },
        _aceptarnombres_con110c
    )
}
function _aceptarnombres_con110c(){
    console.debug('aceptar nombre')
    $_NOMB1TER2W = $('#nombres_con110c').val();
    // $_DESCRIPTER2W = $('#1erapellido_con110c').val();
    // $_APEL1TER2W = $_DESCRIPTER2W.substring(0,20); 
    // $_APEL2TER2W = $_DESCRIPTER2W.substring(20,40); 
    // $_NOMB1TER2W = $_DESCRIPTER2W.substring(40,70); 
    if($_NOMB1TER2W.trim() == ''){
        CON851('02', '02', null, 'error', 'error');
        _evaluardatonombre_con110c(); 
    }else{
        _evaluardireccion_con110c(); 
    }
}

function _evaluardireccion_con110c(){
    console.debug('evaluar direccion');
    validarInputs({
        form: '#DIRECC_CON110C',
        orden: "1"
    },
        function () { _evaluardatonombre_con110c(); },
        _datodireccion_con110c
    )
}

function _datodireccion_con110c(){
    $_DIRECCTERCEW = $('#direcc_con110c').val();
    if($_DIRECCTERCEW.trim() == ''){
        CON851('84', '84', null, 'error', 'error'); 
        _evaluardireccion_con110c()
    }else{
        _evaluarciudad_con110c()
    }
}
function _evaluarciudad_con110c(){
    console.debug('evaluar ciudad');
    validarInputs({
        form: '#CIUDAD_CON110C',
        orden: "1"
    },
        function () { _evaluardireccion_con110c(); },
        _datociudad_con110c
    )
}

function _datociudad_con110c(){
    console.debug('DATO ciudad');
    $_CODCIUTERCEW = $('#ciudad_con110').val();

    if($_CODCIUTERCEW.trim() == ''){
        console.debug('IF');
        _evaluarciudad_con110c(); 
    }else{
       
        console.debug('ELSE');
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_CODCIUTERCEW;
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_05_110C, get_url('/APP/CONTAB/CON110C_05.DLL'));
    }
}

function _dataCON110C_05_110C(data) {
    console.debug(data, 'CON110C_01 CIUDAD');
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

function _evaluartelind_con110c(){
    console.debug('evaluar TEL IND');
    validarInputs({
        form: '#IND_CON110C',
        orden: "1"
    },
        function () { _evaluarciudad_con110c(); },
        _datotelind_con110c
    )
}

function _datotelind_con110c(){
    $_INDICTERCEW = $('#ind_con110c').val();

    _evaluartelefonoterc_con110c(); 
}
function _evaluartelefonoterc_con110c(){
    console.debug('evaluar TEL IND');
    validarInputs({
        form: '#TEL_CON110C',
        orden: "1"
    },
        function () { _evaluartelind_con110c(); },
        _datotelefonoterc_con110c
    )
}
function _datotelefonoterc_con110c(){
    $_TELTERCEW = $('#tel_con110c').val();
    _evaluarcedula_con110c(); 
}
function _evaluarcedula_con110c(){
    console.debug('evaluar TEL IND');
    validarInputs({
        form: '#CC_CON110C',
        orden: "1"
    },
        function () { _evaluartelefonoterc_con110c(); },
        _datocedula_con110c
    )
}

function _datocedula_con110c(){
    $_NITTERCEW = $('#cc_con110c').val(); 
    if(($_NITTERCEW > 0) && ($_NITTERCEW < 100)){
        CON851('03', '03', null, 'error', 'error');   
        _evaluarcedula_con110c();      
    }else{
        _validartipo_con110c(); 
    }
}

function _validartipo_con110c() {
    var documento  = [
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

function validacionestipodoc_con110c(){
    if (($_TIPOIDTERCEW.trim() == '') && (( $_CODTERCEROW > '800000000') && ( $_CODTERCEROW < '999000000'))){
        $_TIPOIDTERCEW = 'NI - Numero Identidad Tributaria'; 
        $("#tipoident_con110c").val($_DESCRIPMARCAARTW);
    }else{
        _evaluaractividades(); 
    }
}
function _evaluaractividades(){
    console.log('evaluar ACTIVIDAD');
    validarInputs({
        form: '#ACTIVI_CON110C',
        orden: "1"
    },
        function () { _validartipo_con110c(); },
        _datoactividad_con110c
    )
}
function _datoactividad_con110c(){
    $_ACTIVICATERCEW = $("#activi_con110c").val();
    if($_ACTIVICATERCEW == '00'){
        CON851('02', '02', null, 'error', 'error');
        _evaluaractividades()   
    }else{
        
    }
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
    console.debug(data, "CON110C_02");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    $_CODTERCEROW = date[1].trim();
    $_DVTERCEROW = date[2].trim();
    $_FECHACUMPTERCEW = date[3].trim();
    $_DESCRIPTER2W = date[4].trim();
    console.debug($_DESCRIPTER2W, 'nombre')
    $_APEL1TER2W = $_DESCRIPTER2W.substring(0,18); 
    console.debug($_APEL1TER2W, '1 apellido')
    $_APEL2TER2W = $_DESCRIPTER2W.substring(18,38); 
    console.debug($_APEL2TER2W, '2 apellido')
    $_NOMB1TER2W = $_DESCRIPTER2W.substring(38,70); 
    console.debug($_NOMB1TER2W, 'nombres')

    $_DIRECCTERCEW = date[5].trim();
    $_CODCIUTERCEW = date[6].trim();
    $_INDICTERCEW = date[7].trim();
    $_TELTERCEW = date[8].trim();
    $_NITTERCEW = date[9].trim();
    $_TIPOIDTERCEW = date[10].trim();
    $_ENTIDADTERCEW = date[11].trim();
    $_ACTTERCEW = date[12].trim();
    $_CONVENIOTERCEW = date[13].trim();
    $_RUTTERCEW = date[14].trim();
    $_NOMCOMERTERCEW = date[15].trim();
    $_OTROSTERCEW = date[16].trim();
    $_CONTACTTERCEW = date[17].trim();
    $_WEBTERCEW = date[18].trim();
    $_CARGOTERCEW = date[19].trim();
    $_EMAILTERCEW = date[20].trim();
    $_ASESORTERCEW = date[21].trim();
    $_CUPOTERCEW = date[22].trim();
    $_FECHACRETERCEW = date[23].trim();
    $_ADMINCRETERCEW = date[24].trim();
    $_FECHAMODTERCEW = date[25].trim();
    $_ADMINMODTERCEW = date[26].trim();
    $_FACTORTERCEW = date[27].trim();
    $_EXTRACUPOTERCEW = date[28].trim();
    $_VENDTERCEW = date[29].trim();
    $_PAGOTERCEW = date[30].trim();
    $_PLAZOTERCEW = date[31].trim();
    $_ZONATERCEW = date[32].trim();
    $_RUTATERCEW = date[33].trim();
    $_ORDENTERCEW = date[34].trim();
    $_ACTIVICATERCEW = date[35].trim();
    $_PORCICATERCEW = date[36].trim();
    $_PORCRETTERCEW = date[37].trim();
    $_GRADOTERCEW = date[38].trim();
    $_REGIVATERCEW = date[39].trim();
    $_CALIFITERCEW = date[40].trim();
    $_GRANCONTRIBTERCEW = date[41].trim();
    $_RETETERCEW = date[42].trim();
    $_VLRBASERETTERCEW = date[43].trim();
    $_RETIVACOMPTERCEW = date[44].trim();
    $_RETIVATERCEW = date[45].trim();
    $_EXENTRETTERCEW = date[46].trim();
    $_SEGUROTERCEW = date[47].trim();
    $_DATACRETERCEW = date[48].trim();
    $_ACUEPAGOTERCEW = date[49].trim();
    $_CAPITADOTERCEW = date[50].trim();
    $_NITCLITERCEW = date[51].trim();
    $_RETICAVTERCEW = date[52].trim();
    $_BLOQTERCEW = date[53].trim();
    $_EXIVATERCEW = date[54].trim();
    $_MARCATERCEW = date[55].trim();
    $_EMPRESAVEHTERCEW = date[56].trim();
    $_NROVEHTERCEW = date[57].trim();
    $_PLACAVEHTERCEW = date[58].trim();
    $_REPRETERCEW = date[59].trim();
    $_IDREPRETERCEW = $_REPRETERCEW.substring(0, 10);
    $_NOMREPRETERCEW = $_REPRETERCEW.substring(10, 30);
    $_EMAILREPTERCEW = date[60].trim();
    $_TESORTERCEW = date[61].trim();
    $_IDTESORTERCEW = $_TESORTERCEW.substring(0, 10);
    $_NOMTESORTERCEW = $_TESORTERCEW.substring(10, 30);
    $_EMAILTESOTERCEW = date[62].trim();
    if (swinvalid == '00') {
        // LLAMADO_DLL({
        //     dato: [$_CODPACIW],
        //     callback: _dataSAL7767_03_1,
        //     nombredll: 'SAL7767_03_1',
        //     carpeta: 'SALUD'
        // });

        _mostrardatos_con110c();
    }
    else {
        CON852(date[1], date[2], date[3], _toogleNav);
    }

}

function _mostrardatos_con110c() {
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
    // $('#ciudadd_con110c').val();
    $('#ind_con110c').val($_INDICTERCEW);
    $('#tel_con110c').val($_TELTERCEW);
    $('#cc_con110c').val($_NITTERCEW);
    $('#tipoident_con110c').val($_TIPOIDTERCEW);
    $('#entidad_con110c').val($_ENTIDADTERCEW);
    // $('#entidadd_con110c').val();
    $('#activi_con110c').val($_ACTTERCEW);
    // $('#actividadd_con110c').val();
    $('#convenio_con110c').val($_CONVENIOTERCEW);
    // $('#conveniod_con110c').val();
    $('#rut_con110c').val($_RUTTERCEW);
    $('#nomcom_con110c').val($_NOMCOMERTERCEW);
    $('#datos_con110c').val($_OTROSTERCEW);
    $('#contact_con110c').val($_CONTACTTERCEW);
    $('#web_con110c').val($_WEBTERCEW);
    $('#cargo_con110c').val($_CARGOTERCEW);
    // $('#ultfact_con110c').val();
    $('#email_con110c').val($_EMAILTERCEW);
    $('#asesor_con110c').val($_ASESORTERCEW);
    $('#cupo_con110c').val($_CUPOTERCEW);
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

    $('#factventas_con110c').val($_FACTORTERCEW);
    // $('#factventasd_con110c').val();
    $('#smvm_con110c').val($_EXTRACUPOTERCEW);
    // $('#smvmd_con110c').val();
    $('#vendedor_con110').val($_VENDTERCEW);
    // $('#descripvendedor_con110c').val();
    $('#formapago_110c').val($_PAGOTERCEW);
    $('#plazo_110c').val($_PLAZOTERCEW);
    $('#zona_110c').val($_ZONATERCEW);
    // $('#zonad_110c').val();
    $('#ruta_110c').val($_RUTATERCEW);
    // $('#rutad_110c').val();
    $('#orden_110c').val($_ORDENTERCEW);
    $('#actica_110c').val($_ACTIVICATERCEW);
    $('#porcetica_110c').val($_PORCICATERCEW);
    $('#porcentreten_110c').val($_PORCRETTERCEW);
    $('#grdnegocio_110c').val($_GRADOTERCEW);
    // $('#grdnegociod_110c').val();
    $('#iva_110c').val($_REGIVATERCEW);
    $('#calif_110c').val($_CALIFITERCEW);
    $('#contribuyente_con110c').val($_GRANCONTRIBTERCEW);
    $('#retenedor_con110c').val($_RETETERCEW);
    $('#baseret_con110c').val($_VLRBASERETTERCEW);
    $('#reteivacompra_con110c').val($_RETIVACOMPTERCEW);
    $('#causareteiva_con110c').val($_RETIVATERCEW);
    $('#exento_con110c').val($_EXENTRETTERCEW);
    $('#cobroseg_con110c').val($_SEGUROTERCEW);
    $('#datacredito_con110c').val($_DATACRETERCEW);
    $('#acuerdopago_con110c').val($_ACUEPAGOTERCEW);
    $('#capitado_con110c').val($_CAPITADOTERCEW);
    $('#nitcliente_con110c').val($_NITCLITERCEW);
    $('#icav_con110c').val($_RETICAVTERCEW);
    $('#bloquearvend_cpm110c').val($_BLOQTERCEW);
    $('#excluiriva_con110c').val($_EXIVATERCEW);

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
