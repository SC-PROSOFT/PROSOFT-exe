var  SAL97C11 = ['DESCRIPPACIW','EPSPACIW','EDADPACW', 'RESTAPLIPACIW', 'CIUDADPACIW', 'DERECHOPACIW', 'NOMBREENTW', 'NITFACTPACIW',
                'RESTRICPACIW', 'RESTDROGPACIW', 'RESTCIRUGPACIW', 'RESTLABOPACIW', 'RESTIMAGPACIW', 'RESTESTAPACIW', 'RESTCONSPACIW',
                'RESTTERFPACIW', 'RESTTEROPACIW', 'RESTODOCPACIW', 'RESTPYPPACIW','TUTELAPACIW', 'ALTCOSPACIW', 'PROGEPSPACIW',
                'CRONICOPACIW', 'MULTICONSULPACIW', 'MEDFAMIPACIW','EMBALTORIESGPACIW']; 

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.cod_oper ? localStorage.cod_oper : false;
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
    $_DPTCIUUSU = $_CODCIUUSU.substring(0,1); 
    $_CIUCIUUSU = $_CODCIUUSU.substring(1,5); 
    // _buscarrestriccion_SAL97C11(); 
    // _toggleF8([
    //     { input: 'progw', app: 'hc107', funct: _ventanaevolucionesmedicas_hc107 },
    // ]);

    CON850(_evaluarCON850_SAL97C11);
});

//////// VENTANAS F8////////////////////////

function _ventanaevolucionesmedicas_hc107(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "PRGRAMAS PARA EVOLUCIONES MEDICAS",
            tipo: 'mysql',
            tablaSql: 'sc_progev',
            callback_esc: function () {
                $("#progw_107").focus();
            },
            callback: function (data) {
                $('#progw_107').val(data.codigo);
                _enterInput('#progw_107');
            }
        });
    }
}

///////////////////////// MASCARAS ///////////////////////////


// var momentFormat = 'YYYY/MM/DD HH:mm';

// var momentMask = IMask($("#nacimiento_110c")[0], {
//     mask: Date,
//     pattern: momentFormat,
//     lazy: true,
//     min: new Date(1920, 0, 1),
//     max: new Date(2020, 0, 1),

//     format: function (date) {
//         return moment(date).format(momentFormat);
//     },
//     parse: function (str) {
//         return moment(str, momentFormat);
//     },

//     blocks: {
//         YYYY: {
//             mask: IMask.MaskedRange,
//             from: 1920,
//             to: 2020
//         },
//         MM: {
//             mask: IMask.MaskedRange,
//             from: 1,
//             to: 12
//         },
//         DD: {
//             mask: IMask.MaskedRange,
//             from: 1,
//             to: 31
//         },
//         HH: {
//             mask: IMask.MaskedRange,
//             from: 0,
//             to: 23
//         },
//         mm: {
//             mask: IMask.MaskedRange,
//             from: 0,
//             to: 59
//         }
//     }
// });

// var $_FECHAACTUAL = moment().format('YYYYMMDD');
//     $_ANOACTUALW = $_FECHAACTUAL.substring(0,4); 
//     $_MESACTUALW = $_FECHAACTUAL.substring(4,6);
//     $_DIAACTUAL = $_FECHAACTUAL.substring(6,8);
 


///////////////////////// SAL97C11///////////////////////////

function _buscarrestriccion_SAL97C11(){
    $_OPSEGU = "ISC11";
    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904_01_SAL97C11,
        nombredll: 'CON904',
        carpeta: 'CONTAB'
    });
}
function _dataCON904_01_SAL97C11(data) {
    // console.debug(data, "CON904-01");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
      
        CON850(_evaluarCON850_SAL97C11);
    }
    else {
        CON851('15', '15', null, 'error', 'error');
        _toogleNav();
    }
}
function _evaluarCON850_SAL97C11(data){
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
    $('#novedad_97C11').val(data.id  + ' - ' + data.descripcion)
}

function _evaluarpaciente_SAL97C11(){
    validarInputs(
        {
            form: "#NUMERO_97C11",
            orden: '1'
        },
        function () { CON850(_evaluarCON850_SAL97C11); },
        _datopaciente_SAL97C11
    )
}

function _datopaciente_SAL97C11(){
    SAL97C11['VARTERAPW', 'ULTMAMOW', 'SW9', 'CONTACITAST', 'SALACIRUEDIT']; 
    SAL97C11.VARTERAPW = ' ';
    SAL97C11.ULTMAMOW = ' '; 
    SAL97C11.SW9 = ' '; 
    SAL97C11.CONTACITAST = ' ';
    SAL97C11.SALACIRUEDIT = ' '; 

    if(($_NITUSU == '0830092718') || ($_NITUSU == '0830092719') || ($_NITUSU == '0900193162')) {
        SAL97C11['LLAVEALTW', 'DATOSW', 'OTROSDATOSW', 'DATOSADIC1', 'DATOSADIC3W', 'LLAVECITW', 'CUPSW']; 
        console.debug('falta');

    }else if ($_NITUSU == '0800162035'){
        console.debug('codigo de barras');
        _leercodigobarras_SAL97C11(); 
    }else{
        SAL97C11['PACIW'] = $('#numero_97C11').val();
        if((SAL97C11.NOVEDADW == '7') && (SAL97C11.PACIW == '000000000000000')){
            CON851('02', '02', null, 'error', 'Error');
            _evaluarpaciente_SAL97C11(); 
        }else if((SAL97C11.PACIW < '000000000000000') && ($.isNumeric(SAL97C11.PACIW))){
            SAL97C11.DESCRIPPACIW = ' '; 
            SAL97C11.EPSPACIW = ' '; 
            SAL97C11['DERECHOPACI'] = '1';
            _mostrarpaciente_SAL97C11(); 
        }else{
            _consultaSql({
                db: 'san2019_13',
                sql: 'SELECT * FROM san2019_13.sc_pacie WHERE codigo LIKE "%' + SAL97C11.PACIW + '%"',
                callback: _consultacodigo_SAL97C11
            });
        }
    }
}

function _leercodigobarras_SAL97C11(){
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

function _consultaopaciente_SAL97C11(){
    SAL97C11.PACIW = $_CODCEDULA; 
    if(SAL97C11.PACIW.trim() == ' '){
        CON851('02', '02', null, 'error', 'Error');
        setTimeout(_leercodigobarras_SAL97C11, 100);
    }else{
        _consultaSql({
            db: 'san2019_13',
            sql: 'SELECT * FROM san2019_13.sc_pacie WHERE codigo LIKE "%' + SAL97C11.PACIW + '%"',
            callback: _consultacodigo_SAL97C11
        });
    } 
}

function _consultacodigo_SAL97C11(error, results, fileds){
    console.debug(results);
    if (error) throw error;
    else {
        console.debug(results, results.length);
        for (var i in results) {
            if (results[i].codigo.trim() == SAL97C11.PACIW) {
                // var swinvalid = 00;
                console.log('encuentra'); 
                if(SAL97C11.NOVEDADW == '7'){
                    if($_NITUSU == '0822006883'){
                        /// CONTINUE 
                        console.log('empresa 0822006883 '); 
                    }else{
                        $_OPSEGU = "IS767"; 
                        LLAMADO_DLL({
                            dato: [$_ADMINW, $_OPSEGU],
                            callback: _dataCON904S_02_SAL97C11,
                            nombredll: 'CON904S',
                            carpeta: 'CONTAB'
                        });
                    }   
                }else{
                    
                    SAL97C11.DESCRIPPACIW = results[i].descripcion; 
                    SAL97C11.EPSPACIW = results[i].eps;
                    SAL97C11.EDADPACW = results[i].fecha_nacimi;

        
                    SAL97C11.RESTAPLIPACIW = results[i].rest_aplica; 
                    SAL97C11.RESTDROGPACIW = results[i].rest_drog; 
                    SAL97C11.RESTCIRUGPACIW = results[i].rest_cirug;
                    SAL97C11.RESTLABOPACIW = results[i].rest_laborat;
                    SAL97C11.RESTIMAGPACIW = results[i].rest_imagen;
                    SAL97C11.RESTESTAPACIW = results[i].rest_esta;
                    SAL97C11.RESTCONSPACIW = results[i].rest_cons;
                    SAL97C11.RESTTERFPACIW = results[i].rest_terf;
                    SAL97C11.RESTTEROPACIW = results[i].rest_tero;
                    // SAL97C11.RESTODOCPACIW = results[i].rest_aplica;
                    SAL97C11.RESTPYPPACIW = results[i].rest_pyp;

                    SAL97C11.CIUDADPACIW = results[i].ciudad;
                    SAL97C11.NITFACTPACIW = results[i].nit_factura;
                    SAL97C11.TUTELAPACIW = results[i].tutela;
                    SAL97C11.ALTCOSPACIW = results[i].alto_costo;
                    SAL97C11.PROGEPSPACIW = results[i].programa_espec;
                    SAL97C11.CRONICOPACIW = results[i].cronico;
                    SAL97C11.MULTICONSULPACIW = results[i].multiconsulta;
                    SAL97C11.MEDFAMIPACIW = results[i].medico_famil;
                    SAL97C11.EMBALTORIESGPACIW = results[i].emba_alto_riesgo;

                    console.debug( SAL97C11.DESCRIPPACIW, 'nombre'); 
                    console.debug(SAL97C11.EPSPACIW, 'eps'); 
                    console.debug(SAL97C11.RESTAPLIPACIW, 'rest aplica'); 
                    console.debug(SAL97C11.EDADPACW, 'edad'); 
                  
                    // $('#nombrepacid_97C11').val(results[i].descripcion);
                    // $('#eps_97C11').val(results[i].eps);
                    
                   _leerpaciente_SAL97C11(); 
                }
            }else if (i == results.length - 1) {
                // var validar = 1;
                console.log('no encuentra'); 
                $_OPSEGU = "IS767"; 
                LLAMADO_DLL({
                    dato: [$_ADMINW, $_OPSEGU],
                    callback: _dataCON904S_04_SAL97C11,
                    nombredll: 'CON904S',
                    carpeta: 'CONTAB'
                });
                //// llama programa maestro de pacientes 
            }
        }
        if (results.length == 0) {
            console.log('1 no encuentra'); 
            $_OPSEGU = "IS767"; 
            LLAMADO_DLL({
                dato: [$_ADMINW, $_OPSEGU],
                callback: _dataCON904S_04_SAL97C11,
                nombredll: 'CON904S',
                carpeta: 'CONTAB'
            });
        }
    }
}

function _dataCON904S_04_SAL97C11(data){
    console.debug(data, "CON904S-04");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if($_NITUSU == '0800162035'){
            //// CONTINUA 
            // LLAMA AL PROGRAMA SER110c --- ACTUALIZA MAESTRO DE PACIENTES 
            _leerpaciente_SAL97C11(); 
        }else{
            //// INICIALIZA LOS DATOS 
            _toggleNav();
        }
    }
    else {
        $_OPSEGU = "IS1G"; 
        LLAMADO_DLL({
            dato: [$_ADMINW, $_OPSEGU],
            callback: _dataCON904S_05_SAL97C11,
            nombredll: 'CON904S',
            carpeta: 'CONTAB'
        });
    }
}

function _dataCON904S_05_SAL97C11(data){
    console.debug(data, "CON904S-05");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
       // LLAMA AL PROGRAMA SER11G --- ACTUALIZA MAESTRO DE PACIENTES 
       console.debug('LLAMAR SER11G --- ACTUALIZA MAESTRO DE PACIENTES ')
       _leerpaciente_SAL97C11()
    }
}

function _dataCON904_02_SAL97C11(data) {
    console.debug(data, "CON904S-01");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        // LLAMA AL PROGRAMA SER110C ---- ACTUALIZA MAESTRO PACIENTES
        console.debug('LLAMAR SER110C ---- ACTUALIZA MAESTRO PACIENTES ')
        _leerpaciente_SAL97C11() 
        console.debug('00 swinvalid CON904S'); 
    }
    else {
        $_OPSEGU = "IS1G"; 
        LLAMADO_DLL({
            dato: [$_ADMINW, $_OPSEGU],
            callback: _dataCON904S_03_SAL97C11,
            nombredll: 'CON904S',
            carpeta: 'CONTAB'
        });
    }
}
function _dataCON904S_03_SAL97C11(data){
    console.debug(data, "CON904S-02");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if($_NITUSU == '0800162035'){

        if((SAL97C11.EPSPACIW == "RES004") && (swinvalid == "00")){
            console.debug('LLAMAR PROGRAMA SER11G --- ACTUALIZA MAESTRO DE PACIENTES')
            // LLAMA AL PROGRAMA SER11G --- ACTUALIZA MAESTRO DE PACIENTES
            _leerpaciente_SAL97C11() 

        }else{
            swinvalid = '00'; 
            console.debug('LLAMAR PROGRAMA SER11I --- ACTUALIZA MAESTRO DE PACIENTES SOLO MAGISTERIO')
            // LLAMA AL PROGRAMA SER11I --- ACTUALIZA MAESTRO DE PACIENTES SOLO MAGISTERIO 
            _leerpaciente_SAL97C11() 
        }
    }else{
        if (swinvalid == "00") {
            console.debug('LLAMAR PROGRAMA  SER11G --- ACTUALIZA MAESTRO DE PACIENTES ')
            // LLAMA AL PROGRAMA SER11G --- ACTUALIZA MAESTRO DE PACIENTES 
            console.debug('00 swinvalid CON904S'); 
            _leerpaciente_SAL97C11()
        }
    }
}
function _leerpaciente_SAL97C11(){

    if (SAL97C11.PACIW == '000000000000000'){
        console.debug('se debe devolver a lector de cedula'); 

    }else if((SAL97C11.RESTAPLIPACIW == 'S') && (SAL97C11.NOVEDADW == '7')){
            CON851('80', '80', null, 'error', 'Error');
            console.debug('se debe devolver a lector de cedula'); 
            _evaluarpaciente_SAL97C11(); 
        
    }else{
        $('#nombrepacid_97C11').val(SAL97C11.DESCRIPPACIW);
        $('#eps_97C11').val(SAL97C11.EPSPACIW); 

        // SAL97C11 = ['DIANACIW', 'MESACIW', 'AÑONACIW']
        // SAL97C11.DIANACIW = SAL97C11.EDADPACW.substring(0,4);
        // SAL97C11.MESACIW = SAL97C11.EDADPACW.substring(4,6);
        // SAL97C11.AÑONACIW = SAL97C11.EDADPACW.substring(6,8);
        // console.debug(SAL97C11.DIANACIW, SAL97C11.MESACIW, SAL97C11.AÑONACIW, 'edad'); 
        // _calcularedad_SAL97C11(); 
        _validarpaciente_SAL97C11(); 
    }
}
function _validarpaciente_SAL97C11(){

    if(SAL97C11.SW9 == '0'){
        SAL97C11.SW9 = '1'; 
        ///// VENTANA 
        console.debug('LLAMA SER810B -MUESTRA MENSAJES SOBRE PACIENTES'); 
    }else if(($_NITUSU == '0844003225') && (SAL97C11.CIUDADPACIW != '85001') && (SAL97C11.PACIW > '000000000000000')){
        SAL97C11.DERECHOPACIW = '2'; 

    }else if (SAL97C11.EPSPACIW.trim() == ''){
        SAL97C11.NOMBREENTW = ''; 
        $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
    }else{
        _consultaSql({
            db: 'datos_pros',
            sql: 'SELECT * FROM datos_pros.sc_archent WHERE cuenta LIKE "%' + SAL97C11.EPSPACIW + '%"',
            callback: _consultaentidad_SAL97C11
        });
    }
}

function _consultaentidad_SAL97C11(error, results, fileds){
    console.debug(results);
    if (error) throw error;
    else {
        console.debug(results, results.length);
        for (var i in results) {
            if (results[i].cuenta.trim() == SAL97C11.EPSPACIW) {
                console.log('encuentra entidades'); 
                SAL97C11.NOMBREENTW = results[i].nombre; 
                if(SAL97C11.NITFACTPACIW > '0'){
                    _consultaSql({
                        db: 'san2019_13',
                        sql: 'SELECT * FROM san2019_13.sc_archter WHERE cod_ter LIKE "%' + SAL97C11.NITFACTPACIW + '%"',
                        callback: _consultanitfact_SAL97C11
                    });
                }else{

                    $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
                    _validarrestricionpac_SAL97C11()
                }
                
            }else if (i == results.length - 1) {
                SAL97C11.NOMBREENTW = ''; 
                $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
                console.log('no encuentra entidades'); 
               
            }
        }
        if (results.length == 0) {
            SAL97C11.NOMBREENTW = ''; 
            $('#epsd_97C11').val(SAL97C11.DESCRIPPACIW);
            console.log('1 no encuentra entidades'); 
        }
    }
}
function _consultanitfact_SAL97C11(error, results, fileds){
    console.debug(results);
    if (error) throw error;
    else {
        console.debug(results, results.length);
        for (var i in results) {
            if (results[i].cuenta.trim() == SAL97C11.NITFACTPACIW) {
                console.log('encuentra archivo terceros');
                SAL97C11['CODTERW']
                SAL97C11.CODTERW = results[i].descrip_ter;
                SAL97C11.NOMBREENTW = SAL97C11.CODTERW
                $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
                _validarrestricionpac_SAL97C11()
            }else if (i == results.length - 1) {
                console.log('no encuentra archivo terceros'); 
                $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
                _validarrestricionpac_SAL97C11(); 
            }
        }
        if (results.length == 0) {
            console.log('1 no encuentra archivo terceros'); 
            $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
            _validarrestricionpac_SAL97C11()
        }
    }
}
function _validarrestricionpac_SAL97C11(){

    if((SAL97C11.EPSPACIW == 'EPS025') && (SAL97C11.RESTRICPACIW == '04')){
        SAL97C11.NOMBREENTW = 'CAPRESOCA NO'; 
        $('#epsd_97C11').val(SAL97C11.NOMBREENTW);
        _mostratfacturado_SAL97C11();
    }else if (SAL97C11.TUTELAPACIW == 'S'){
        CON851('5B', '5B', null, 'error', 'Error');
        _mostratfacturado_SAL97C11();
        console.debug('TUTELAPACI')
    }else if(SAL97C11.ALTCOSPACIW == 'S'){
        CON851('5J', '5J', null, 'error', 'Error');
        _mostratfacturado_SAL97C11();
        console.debug('ALTO COSTO')
    }else if(SAL97C11.PROGEPSPACIW == 'S'){
        CON851('5Q', '5Q', null, 'error', 'Error');
        _mostratfacturado_SAL97C11();
        console.debug('PROGEPS')
    }else if(SAL97C11.CRONICOPACIW == 'S'){
        CON851('7A', '7A', null, 'error', 'Error');
        _mostratfacturado_SAL97C11();
        console.debug('CRONICO')
    }else if($_NITUSU == '0845000038'){
        if(($_UNIDEDADW = 'A') && (($_VLREDADW = '45') || ($_VLREDADW = '50') ||  ($_VLREDADW = '55') || ($_VLREDADW = '60') || ($_VLREDADW = '65') || ($_VLREDADW = '70') || ($_VLREDADW = '75') || ($_VLREDADW = '80') || ($_VLREDADW = '85') || ($_VLREDADW = '90') || ($_VLREDADW = '95') || ($_VLREDADW = '100'))){
            CON851('8T', '8T', null, 'error', 'Error');
            console.debug('CONDICION CON NIT 0845000038')
        }else{
            console.debug('otra validacion')
        }
    }else if (SAL97C11.MULTICONSULPACIW == 'S'){
        CON851('5V', '5V', null, 'error', 'Error');
        _mostratfacturado_SAL97C11();
        console.debug('MULTICONSULTA')
    }else if (SAL97C11.MEDFAMIPACIW > 0){
        console.log('LLAMAR PROGRAMA CON805A')
        _mostratfacturado_SAL97C11();
    }else if(SAL97C11.EMBALTORIESGPACIW == 'S'){
        CON851('EH', 'EH', null, 'error', 'Error');
        console.debug('EMB ALT RIESGO')
        _mostratfacturado_SAL97C11();
    }
    ////CALL CON880RV MUESTRA LOS RECORDATORIOS POR USUARIO ARCH

}

function _mostratfacturado_SAL97C11(){


}















////////////////////////////////// FUNCIONES ADICIONALES /////////////////////////////
function _calcularedad_SAL97C11(){
    // $_UNIDEDADW = 'A';
    // $_VLREDADW
    $_NACIMPACIW = momentMask.unmaskedValue; 
    $_FECHAINIW =  $_NACIMPACIW;
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