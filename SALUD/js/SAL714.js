/* NOMBRE RM --> SER134 // NOMBRE ELECTR --> SAL714 */

var $_NovedSer714, $_COD_PACI, $_COD_MAESTROS;
var $fechareg, fechaActual714, $cedula, $_DATOSW, $_fechacrea, $fchmodf, $FECHAPERT714, $fecrea, $fechaper;
var arrayDatos714, arrayPrograma;

$(document).ready(function () {

    _toggleF8([
        { input: 'cedula', app: '714', funct: _ventanaTercr }
    ]);

    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    loader('hide');
    CON850(_evaluarCON850);
});

// F8 PACIENTES
function _ventanaTercr(e) {
    loader('hide');
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana Pacientes',
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_pacie',
            callback_esc: function () {
                validarIdentif714()
            },
            callback: function (data) {
                $('#cedula_714').val(data.cedula);
                $('#nombreSer714').val(data.nombre);
                _enterInput('#cedula_714');
            }
        });
    }
}

function _evaluarCON850(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    $_NovedSer714 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
            _validarFechAper();
            break;
        case 8:
        case 9:
            validarIdentif714();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer714').val(novedad.id + ' - ' + novedad.descripcion)
}


function _validarFechAper() {
    var aa = new Date();
    var mm = aa.getMonth() + 1;
    var dd = aa.getDate();

   
    $_fechacr = aa.getFullYear() + (mm < 10 ? '0' : '') + mm + (dd < 10 ? '0' : '') + dd;
    $('#fechaCrea714').val($_fechacr);
  
    $_feccrea = $_fechacr;

    $_ANOREG = $_feccrea.substring(2, 4)
    $_MESREG = $_feccrea.substring(4, 6)
    $_DIAREG = $_feccrea.substring(6, 8)

    $fchcreacion = $_ANOREG + $_MESREG + $_DIAREG

    $fechaper = aa.getFullYear() + '/' + (mm < 10 ? '0' : '') + mm + '/' + (dd < 10 ? '0' : '') + dd;
    $('#fechAper714').val($fechaper);
    

    validarNroFicha714()
}

function validarNroFicha714() {
    validarInputs(
        {
            form: "#nroficha",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        // function () { validarIdentif714(); }
        validarIdentif714
    )
}

function validarIdentif714() {
    validarInputs(
        {
            form: "#tercero",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {
            $_CEDUPAC = $('#cedula_714').val();
            let datos_envio = datosEnvio()
            datos_envio += '|'
            datos_envio += $_CEDUPAC
            SolicitarDll({ datosh: datos_envio }, on_datoSisvan714, get_url('/APP/SALUD/SAL714-01.DLL'));
        }
    )
}

function on_datoSisvan714(data) {
    console.debug(data);
    var date = data.split('|');

    $_CODSIS = date[3].trim();
    $_NOMSIS = date[4].trim();
    $_FICHASIS = date[5].trim();
    $_FECHASIS = date[6].trim();
    $_NACIPACI = date[7].trim();
    $_SEXOPACI = date[8].trim();
    $_DIRECPACI = date[9].trim();
    $_CIUDPACI = date[10].trim();
    $_TELFPACI = date[11].trim();
    $_ZONAPACI = date[12].trim();
    $_REGMPACI = date[13].trim();
    $_ETNPACI = date[14].trim();
    $_SALUDSIS = date[15].trim();
    $_BRRSIS = date[16].trim();
    $_PROGSIS = date[17].trim();
    $_LACTSIS = date[18].trim();
    $_EXCLSIS = date[19].trim();
    $_MESESSIS = date[20].trim();
    $_OPERCSIS = date[21].trim();
    $_FECHCSIS = date[22].trim();
    $_OPERMSIS = date[23].trim();
    $_FECHMSIS = date[24].trim();

    if (date[0].trim() == '00') {
        if ($_NovedSer714 == '7') {
            CON851('00', '00', null, 'error', 'Error');
            validarIdentif714();
        }
        else {
            _datosPaci714()
        }
    }
    else if (date[0].trim() == '01') {
        if ($_NovedSer714 == '7') {
            edadPacinte714();
        }
        else {
            CON851('01', '01', null, 'error', 'Error');
            validarIdentif714();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _datosPaci714() {
    $("#numeroFic714").val($_FICHASIS)

    $fechareg = $_FECHASIS;
    $_ANOREG = $fechareg.substring(0, 4)
    $_MESREG = $fechareg.substring(4, 6)
    $_DIAREG = $fechareg.substring(6, 8)

    var fechfn = $_ANOREG + '/' + $_MESREG + '/' + $_DIAREG

    $FECHAPERT714 = $_ANOREG + $_MESREG + $_DIAREG

    $("#fechAper714").val($fechaper)
    $("#cedula_714").val($_CODSIS);
    $('#nombreSer714').val($_NOMSIS);
    $('#sexoSer714').val($_SEXOPACI);
    $('#direccSer714').val($_DIRECPACI);
    $('#ciudadSer714').val($_CIUDPACI);
    $('#telefSer714').val($_TELFPACI);
    $('#zonaSer714').val($_ZONAPACI);
    $('#regmnSer714').val($_REGMPACI);
    $('#etniaSer714').val($_ETNPACI);
    $('#barrioSer714').val($_BRRSIS);
    $('#centroSer714').val($_SALUDSIS);

    // VALIDA EDAD EN AÑOS Y MESES
    var edadpaci = $_NACIPACI;
    $_ANOPACI = edadpaci.substring(0, 4);
    $_MESPACI = edadpaci.substring(4, 6);
    $_DIAPACI = edadpaci.substring(6, 8);
    var edadpaciente = moment($_ANOPACI + $_MESPACI + $_DIAPACI, "YYYYMMDD").fromNow();
    $_EDADPACIE = edadpaciente.substring(5, 7);
    if ($_EDADPACIE == 2019 - $_ANOPACI && $_EDADPACIE > 28) {
        $('#edadSer714').val($_EDADPACIE + ' Años');
        CON851('74', '74', null, 'error', 'error');
        CON850(_evaluarCON850);
    } else {
        if ($_EDADPACIE == 2019 - $_ANOPACI) {
            $('#edadSer714').val($_EDADPACIE + ' Años');
            sgtePaso()
        } else {
            $('#edadSer714').val($_EDADPACIE + ' Meses');
            sgtePaso()
        }
    }
    $('#progrSer714').val($_PROGSIS);
    $('#LactaSer714').val($_LACTSIS);
    $('#exclSer714').val($_EXCLSIS);
    $('#mesLactaSer714').val($_MESESSIS);
    $('#operdCrea714').val($_OPERCSIS);
    $('#fechaCrea714').val($_FECHCSIS);
    $('#operModf714').val($_OPERMSIS);
    $('#fechaModf714').val($_FECHMSIS);
}


function sgtePaso() {
    switch (parseInt($_NovedSer714)) {
        case 8:
            _validarZona714()
            break;
        case 9:
            CON851P('54', validarIdentif714, eliminarReg_714)
            break;
    }

}

function eliminarReg_714() {

    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_NovedSer714
    datos_envio += '|'
    datos_envio += $_CEDUPAC

    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _elimRegis714, get_url('/APP/SALUD/SAL714-02.DLL'));
}

function _elimRegis714(data) {
    _inputControl('reset');
    _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        var mensaje
        switch (parseInt($_NovedSer714)) {
            case 9:
                mensaje = "Eliminado correctamente"
                break;
        }
        jAlert({ titulo: 'Notificacion', mensaje: mensaje })
    } else {
        CON852(temp[0], temp[1], temp[2]);
    }
}


// NOVEDAD 7 //

function edadPacinte714() {
    $('#nombreSer714').val($_NOMSIS);
    $('#sexoSer714').val($_SEXOPACI);
    $('#direccSer714').val($_DIRECPACI);
    $('#ciudadSer714').val($_CIUDPACI);
    $('#telefSer714').val($_TELFPACI);
    $('#zonaSer714').val($_ZONAPACI);
    $('#regmnSer714').val($_REGMPACI);
    $('#etniaSer714').val($_ETNPACI);

    // VALIDA EDAD EN AÑOS Y MESES
    var edadpaci = $_NACIPACI;
    $_ANOPACI = edadpaci.substring(0, 4);
    $_MESPACI = edadpaci.substring(4, 6);
    $_DIAPACI = edadpaci.substring(6, 8);
    var edadpaciente = moment($_ANOPACI + $_MESPACI + $_DIAPACI, "YYYYMMDD").fromNow();
    $_EDADPACIE = edadpaciente.substring(5, 7);
    $_EDADPACIE == 2019 - $_ANOPACI
    if ($_EDADPACIE > 28) {
        $('#edadSer714').val($_EDADPACIE + ' Años');
        CON851('74', '74', null, 'error', 'error');
        CON850(_evaluarCON850)
    } else {
        console.debug('edad años y meses')
        if ($_EDADPACIE > 10) {
            console.debug('años')
            $('#edadSer714').val($_EDADPACIE + ' Años');
            fechaCrea714()
        } else {
            console.debug('meses')
            $('#edadSer714').val($_EDADPACIE + ' Meses');
            fechaCrea714()
        }
    }
    
}

function fechaCrea714() {
    var d = new Date();
    var mes = d.getMonth() + 1;
    var dia = d.getDate();

    var fchactual = d.getFullYear() + (mes < 10 ? '0' : '') + mes + (dia < 10 ? '0' : '') + dia;

 
    $('#fechaCrea714').val(fchactual.trim());

    operdCrea714()
}


function operdCrea714() {
    $('#operdCrea714').val($_ADMINW.trim());
    validaOperd714()
}


function validaOperd714() {
    $('#operModf714').val($_ADMINW.trim());
    fechaModf714()
}

function fechaModf714() {
    var d = new Date();
    var mes = d.getMonth() + 1;
    var dia = d.getDate();
    var fechamodf = d.getFullYear() + '/' + (mes < 10 ? '0' : '') + mes + '/' + (dia < 10 ? '0' : '') + dia;

    $_fecmodf = d.getFullYear() + (mes < 10 ? '0' : '') + mes + (dia < 10 ? '0' : '') + dia;
    $('#fechaModf714').val($_fecmodf.trim());

    $modfec = $_fecmodf;

    $_ANOREG = $modfec.substring(2, 4)
    $_MESREG = $modfec.substring(4, 6)
    $_DIAREG = $modfec.substring(6, 8)

    $fchmodf = $_ANOREG + $_MESREG + $_DIAREG

    _validarZona714()
}

function _validarZona714() {
    $_ZONA = $('#zonaSer714').val();
    var evaluarzona = $_ZONA.trim();
    switch (evaluarzona) {
        case "U":
            $('#zonaSer714').val("U - URBANA");
            _validarSexo714();
            break;
        case "R":
            $('#zonaSer714').val("R - RURAL");
            _validarSexo714();
            break;
        default:
            $('#zonaSer714').val("NO REGISTRA");
            _validarSexo714();
            break;
    }
}

function _validarSexo714() {
    $_SEXO = $_SEXOPACI;
    var evaluarzona = $_SEXO.trim();
    switch (evaluarzona) {
        case "F":
            $('#sexoSer714').val("F - FEMENINO");
            _validaRegimen714();
            break;
        case "M":
            $('#sexoSer714').val("M - MASCULINO");
            _validaRegimen714();
            break;
        default:
            $('#sexoSer714').val("NO REGISTRA");
            _validaRegimen714();
            break;
    }
}

function _validaRegimen714() {
    $_TIPOPACI = $_REGMPACI
    var evaluar = $_TIPOPACI.trim();
    switch (evaluar) {
        case "C":
            $('#regmnSer714').val("C - CONTRIBUTIVO");
            break;
        case "S":
            $('#regmnSer714').val("S - SUBSIDIADO");
            _validaEtnia714();
            break;
        case "V":
            $('#regmnSer714').val("V - VINCULADO");
            _validaEtnia714();
            break;
        case "P":
            $('#regmnSer714').val("P - PARTICULAR");
            _validaEtnia714();
            break;
        case "O":
            $('#regmnSer714').val("O - OTRO TIPO");
            _validaEtnia714();
            break;
        case "D":
            $('#regmnSer714').val("D - DESPLAZ CONT");
            _validaEtnia714();
            break;
        case "E":
            $('#regmnSer714').val("E - DESPLAZ SUBS");
            _validaEtnia714();
            break;
        case "F":
            $('#regmnSer714').val("F - DESPLAZ VINC");
            _validaEtnia714();
            break;
        default:
            $('#regmnSer714').val("NO REGISTRA");
            _validaEtnia714();
            break;
    }
}

function _validaEtnia714() {
    $_ETNIA = $_ETNPACI
    var evalua = $_ETNIA.trim();
    switch (evalua) {
        case "1":
            $('#etniaSer714').val("1 - INDIGENA");
            validarBarrio714();
            break;
        case "2":
            $('#etniaSer714').val("2 - RAIZAL");
            validarBarrio714();
            break;
        case "3":
            $('#etniaSer714').val("3 - GITANO");
            validarBarrio714();
            break;
        case "4":
            $('#etniaSer714').val("4 - AFROCOL");
            validarBarrio714();
            break;
        case "5":
            $('#etniaSer714').val("5 - ROM");
            validarBarrio714();
            break;
        case "6":
            $('#etniaSer714').val("6 - MESTIZO");
            validarBarrio714();
            break;
        case "9":
            $('#etniaSer714').val("9 - NO APLICA");
            validarBarrio714();
            break;
        default:
            $('#etniaSer714').val("NO REGISTRA");
            validarBarrio714();
            break;
    }
}

function validarBarrio714() {
    console.debug('validar barrio')
    validarInputs(
        {
            form: "#barrio",
            orden: '1'
        },
        function () { validarIdentif714(); },
        _validarCntrSalud714
    )
}

function _validarCntrSalud714() {
    console.debug('centro de salud');
    validarInputs(
        {
            form: "#centrosalud",
            orden: '1'
        },
        function () { validarBarrio714(); },
        _datoLact714
    )
}


function _datoLact714() {

    var datosLacta = [
        { "COD": "1", "DESCRIP": "Si" },
        { "COD": "2", "DESCRIP": "No" }
    ]

    POPUP({
        array: datosLacta,
        titulo: 'Lactancia Actual?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _validarCntrSalud714
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
                $('#LactaSer714').val(data.DESCRIP.trim())
                $_LACTA = data.DESCRIP.trim()
                setTimeout(validarExcluLactan714, 300);
                break;
        }
    })
}


function validarExcluLactan714() {

    var datosExclus = [
        { "COD": "1", "DESCRIP": "Si" },
        { "COD": "2", "DESCRIP": "No" }
    ]

    POPUP({
        array: datosExclus,
        titulo: 'Lactancia Exclusiva?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _datoLact714
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
                $('#exclSer714').val(data.DESCRIP.trim())
                $_EXCL = data.DESCRIP.trim()
                setTimeout(validarMeses714, 300);
                break;
            case '2':
                $('#exclSer714').val(data.DESCRIP.trim())
                $_EXCL = data.DESCRIP.trim()
                setTimeout(validarProgra714, 300);
                break;
        }
    })
}

function validarMeses714() {
    validarInputs(
        {
            form: "#meses",
            orden: '1'
        },
        function () { validarExcluLactan714(); },
        function () {
            validarMesLac714();
        }
    )
}

function validarMesLac714() {
    $_meses = $('#mesLactaSer714').val();

    if ($_meses > 9) {
        CON851('03', '03', null, 'error', 'error');
        validarMeses714()
    } else {
        validarProgra714();
    }
}
function validarProgra714() {

    var datoProgr = [
        { "COD": "1", "DESCRIP": "DESAYUNO INFANTIL" },
        { "COD": "2", "DESCRIP": "RESTAURANTE ESCOLAR" },
        { "COD": "3", "DESCRIP": "RECUPERACION NUTRICIONAL" },
        { "COD": "4", "DESCRIP": "REFRIGERIOS" },
        { "COD": "5", "DESCRIP": "FAMILIAS EN ACCION" },
        { "COD": "6", "DESCRIP": "HOGAR INFANTIL" },
        { "COD": "7", "DESCRIP": "RED UNIDOS" },
        { "COD": "8", "DESCRIP": "NO SABE" },
        { "COD": "9", "DESCRIP": "NINGUNO" }
    ]
    POPUP({
        array: datoProgr,
        titulo: 'Incrementar Tarifa',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _datoLact714
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
                $_PROGRM = "DI"
                $('#progrSer714').val($_PROGRM)
                $("#descrProgr714").val(data.DESCRIP.trim());
                $_PROGRM = data.COD.trim()
                datosCompletos714();
                break;
            case '2':
                $_PROGRM = "RE"
                $('#progrSer714').val($_PROGRM)
                $("#descrProgr714").val(data.DESCRIP.trim());
                $_PROGRM = data.COD.trim()
                datosCompletos714();
                break;
            case '3':
                $_PROGRM = "RN"
                $('#progrSer714').val($_PROGRM)
                $("#descrProgr714").val(data.DESCRIP.trim());
                $_PROGRM = data.COD.trim()
                datosCompletos714();
                break;
            case '4':
                $_PROGRM = "RF"
                $('#progrSer714').val($_PROGRM)
                $("#descrProgr714").val(data.DESCRIP.trim());
                $_PROGRM = data.COD.trim()
                datosCompletos714();
                break;
            case '5':
                $_PROGRM = "FA"
                $('#progrSer714').val($_PROGRM)
                $("#descrProgr714").val(data.DESCRIP.trim());
                $_PROGRM = data.COD.trim()
                datosCompletos714();
                break;
            case '6':
                $_PROGRM = "HI"
                $('#progrSer714').val($_PROGRM)
                $("#descrProgr714").val(data.DESCRIP.trim());
                $_PROGRM = data.COD.trim()
                datosCompletos714();
                break;
            case '7':
                $_PROGRM = "RU"
                $('#progrSer714').val($_PROGRM)
                $("#descrProgr714").val(data.DESCRIP.trim());
                $_PROGRM = data.COD.trim()
                datosCompletos714();
                break;
            case '8':
                $_PROGRM = "NS"
                $('#progrSer714').val($_PROGRM)
                $("#descrProgr714").val(data.DESCRIP.trim());
                $_PROGRM = data.COD.trim()
                datosCompletos714();
                break;
            case '9':
                $_PROGRM = "NI"
                $('#progrSer714').val($_PROGRM)
                $("#descrProgr714").val(data.DESCRIP.trim());
                $_PROGRM = data.COD.trim()
                datosCompletos714();
                break;
        }
    })
}


function datosCompletos714() {
    var cedula = cerosIzq($_CEDUPAC.trim(), 15)
    var ficha = cerosIzq($("#numeroFic714").val(), 6)
    var barrio = espaciosDer($("#barrioSer714").val(), 20)
    var centsald = espaciosDer($("#centroSer714").val(), 20)
    var lactactu = $_LACTA.substring(0, 1);
    var lactexc = $_EXCL.substring(0, 1);
    var meseslac = cerosIzq($("#mesLactaSer714").val(), 2)

    $operCre = $_ADMINW
    $operMdfc = $_ADMINW

    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_NovedSer714
    datos_envio += '|'
    datos_envio += cedula
    datos_envio += '|'
    datos_envio += ficha
    datos_envio += '|'
    datos_envio += $fechaper
    datos_envio += '|'
    datos_envio += centsald
    datos_envio += '|'
    datos_envio += barrio
    datos_envio += '|'
    datos_envio += $_PROGRM
    datos_envio += '|'
    datos_envio += lactactu
    datos_envio += '|'
    datos_envio += lactexc
    datos_envio += '|'
    datos_envio += meseslac
    datos_envio += '|'
    datos_envio += $operCre
    datos_envio += '|'
    datos_envio += $fchcreacion
    datos_envio += '|'
    datos_envio += $operMdfc
    datos_envio += '|'
    datos_envio += $fchmodf

    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, validarElimi714, get_url('/APP/SALUD/SAL714-02.DLL'));

}


function validarElimi714(data) {
    console.debug(data)
    loader('hide');
    var rdll = data.split('|');

    if (rdll[0].trim() == '00') {
        var msj
        switch ($_NovedSer714) {
            case '7': msj = 'Creado correctamente'
                break;
            case '8': msj = 'Modificado correctamente'

        }
        jAlert({ titulo: 'Notificacion', mensaje: msj },
            function () {
                _toggleNav();
                console.log('fin del programa')
            });
    } else {
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}

// function validarBdSql714(data, cedula, ficha, $_FECHAPERT714, centsald, barrio, $_PROGRM, lactactu, lactexc, meseslac, $_FCREA, $_FMODF) {
//     loader('hide');
//     var rdll = data.split('|');
//     console.log(rdll[0])
//     if (rdll[0].trim() == '00') {
//         switch (parseInt($_NovedSer714)) {
//             case 7:
//                 _consultaSql({
//                     sql: `INSERT INTO sc_pacie VALUES ('${cedula}');`,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCajas714();
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO EL DATO' },
//                                     function () {
//                                         limpiarCajas714();
//                                     });
//                             }
//                         }
//                     }
//                 })
//                 break;
//             case 8:
//                 _consultaSql({
//                     sql: `
//                     UPDATE sc_pacie 
//                     WHERE cedula = '${cedula}' `,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             console.log(results)
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO MODIFICADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCajas714()
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR MODIFICANDO EL DATO' },
//                                     function () {
//                                         limpiarCajas714();
//                                     });
//                             }
//                         }
//                     }
//                 })
//                 break;
//             case 9:
//                 _consultaSql({
//                     sql: `DELETE FROM sc_pacie WHERE codigo = '${cedula}'`,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             console.log(results)
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO ELIMINADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCajas714()
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR ELIMINANDO EL DATO' },
//                                     function () {
//                                         limpiarCajas714()
//                                     });
//                             }
//                         }
//                     }
//                 })
//                 break;
//         }
//     } else {
//         CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
//     }
// }


// function limpiarCajas714() {
//     loader('hide');
//     _toggleNav();
//     _inputControl('reset');
//     _inputControl('disabled');

// }
