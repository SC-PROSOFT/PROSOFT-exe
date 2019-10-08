/* NOMBRE RM --> SER11A // NOMBRE ELECTR --> SAL71A */

var $_NovedSer71A, arraycups, $_fechaact;

$(document).ready(function () {
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;

    _toggleF8([
        { input: 'espec1', app: '71A', funct: _datoEspec },
        { input: 'espec2', app: '71A', funct: _datoEspec },
        { input: 'espec3', app: '71A', funct: _datoEspec },
        { input: 'espec4', app: '71A', funct: _datoEspec },
        { input: 'espec5', app: '71A', funct: _datoEspec },
        { input: 'espec6', app: '71A', funct: _datoEspec },
        { input: 'espec7', app: '71A', funct: _datoEspec },
        { input: 'espec8', app: '71A', funct: _datoEspec },
        { input: 'espec9', app: '71A', funct: _datoEspec },
        { input: 'espec10', app: '71A', funct: _datoEspec },
        { input: 'espec11', app: '71A', funct: _datoEspec },
        { input: 'espec12', app: '71A', funct: _datoEspec },
        { input: 'espec13', app: '71A', funct: _datoEspec },
        { input: 'espec14', app: '71A', funct: _datoEspec },
        { input: 'espec15', app: '71A', funct: _datoEspec },
        { input: 'espec16', app: '71A', funct: _datoEspec },
        { input: 'espec17', app: '71A', funct: _datoEspec },
        { input: 'espec18', app: '71A', funct: _datoEspec },
        { input: 'espec19', app: '71A', funct: _datoEspec },
        { input: 'espec20', app: '71A', funct: _datoEspec },
        { input: 'espec21', app: '71A', funct: _datoEspec },
        { input: 'espec22', app: '71A', funct: _datoEspec },
        { input: 'espec23', app: '71A', funct: _datoEspec },
        { input: 'espec24', app: '71A', funct: _datoEspec },
        { input: 'espec25', app: '71A', funct: _datoEspec },
        { input: 'espec26', app: '71A', funct: _datoEspec },
        { input: 'espec27', app: '71A', funct: _datoEspec },
        { input: 'espec28', app: '71A', funct: _datoEspec },
        { input: 'espec29', app: '71A', funct: _datoEspec },
        { input: 'grupo', app: '71A', funct: _ventanGrp },
        { input: 'codigo', app: '71A', funct: _ventanCodig }
    ]);
    CON850(_evaluarCON850);
});

// --> F8 CUPS //
function _ventanGrp(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA CODIGO CUPS",
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_archcups',
            callback_esc: function () {
                _validarConsulta71A
            },
            callback: function (data) {
                console.debug(data);
                var grupo = data.codigo.trim();
                $('#grupo_71A').val(grupo.substring(0, 2));
                $('#codigo_71A').val(grupo.substring(2, 6));
                $('#descrip71A').val(data.descripcion.trim());
                _enterInput('#codigo_71A');
            }
        });
    }
}

function _ventanCodig(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA CODIGO CUPS",
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_archcups',
            callback_esc: function () {
                _validarConsulta
            },
            callback: function (data) {
                console.debug(data);
                var grupo = data.codigo.trim();
                $('#grupo_71A').val(grupo.substring(0, 2));
                $('#codigo_71A').val(grupo.substring(2, 6));
                $('#descrip71A').val(data.descripcion.trim());
                _enterInput('#codigo_71A');
            }
        });
    }
}

function _datoEspec(e) {
    var atributo = $(this).attr("id");
    var numero = atributo.split('');
    var consultar = parseInt(numero[6]);
    if (isNaN(consultar)) {
        console.debug(consultar);
        var idEspec = '#espec' + numero[5] + '_71A'
        var idDescp = '#DescEspec' + numero[5] + '_71A'
    }
    else {
        console.debug(consultar);
        var idEspec = '#espec' + numero[5] + numero[6] + '_71A'
        var idDescp = '#DescEspec' + numero[5] + + numero[6] + '_71A'
    }
    switch (e.which) {
        case 119:
            _ventanaDatos({
                titulo: 'Ventana De Especialidades',
                tipo: 'mysql',
                db: 'datos_pros',
                tablaSql: 'sc_archesp',
                callback_esc: function () {
                    profesiona71A()
                },
                callback: function (data) {
                    $(idEspec).val(data.codigo.trim())
                    $(idDescp).val(data.nombre.trim())
                    _enterInput(idEspec)
                }
            });
            break;
        case 114: //f3
            if (idEspec.trim().length < 0) {
                _enterInput(idEspec)
            } else {
                $(idEspec).attr('disabled', 'true')
                set_Event_validar('#validarEspec' + numero[29], 'off')
                envioDatos_71A(1)
            }
            break;
    }

}


// NOVEDAD //
function _evaluarCON850(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    console.debug(novedad)
    $_NovedSer71A = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarConsulta71A();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer71A').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarConsulta71A() {
    validarInputs(
        {
            form: "#consulta",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {
            var grupo11 = $('#grupo_71A').val();
            var codig11 = $('#codigo_71A').val();
            $codigo71A = grupo11 + codig11;

            let datos_envio = datosEnvio()
            datos_envio += '|'
            datos_envio += $codigo71A
            SolicitarDll({ datosh: datos_envio }, datoCups71A, get_url('/APP/SALUD/SAL71A-C.DLL'));
        }
    )
}


function datoCups71A(data) {
    console.debug(data);
    var date = data.split('|');

    $_CODCUP71A = date[2].trim();
    $_DESCRCUPS71A = date[3].trim();
    $_ESPEC1_71A = date[4].trim();
    $_ESPEC2_71A = date[5].trim();
    $_ESPEC3_71A = date[6].trim();
    $_ESPEC4_71A = date[7].trim();
    $_ESPEC5_71A = date[8].trim();
    $_ESPEC6_71A = date[9].trim();
    $_ESPEC7_71A = date[10].trim();
    $_ESPEC8_71A = date[11].trim();
    $_ESPEC9_71A = date[12].trim();
    $_ESPEC10_71A = date[13].trim();
    $_ESPEC11_71A = date[14].trim();
    $_ESPEC12_71A = date[15].trim();
    $_ESPEC13_71A = date[16].trim();
    $_ESPEC14_71A = date[17].trim();
    $_ESPEC15_71A = date[18].trim();
    $_ESPEC16_71A = date[19].trim();
    $_ESPEC17_71A = date[20].trim();
    $_ESPEC18_71A = date[21].trim();
    $_ESPEC19_71A = date[22].trim();
    $_ESPEC20_71A = date[23].trim();
    $_ESPEC21_71A = date[24].trim();
    $_ESPEC22_71A = date[25].trim();
    $_ESPEC23_71A = date[26].trim();
    $_ESPEC24_71A = date[27].trim();
    $_ESPEC25_71A = date[28].trim();
    $_ESPEC26_71A = date[29].trim();
    $_ESPEC27_71A = date[30].trim();
    $_ESPEC28_71A = date[31].trim();
    $_ESPEC29_71A = date[32].trim();
    $_OPER71A = date[33].trim();
    $_FECHACUPS71A = date[34].trim();
    $_SEXOCUP71A = date[35].trim();
    $_ATIEND71A = date[36].trim();
    $_PYP71A = date[37].trim();
    $_TIPO71A = date[38].trim();
    $_FINALD71A = date[39].trim();

    if (date[0].trim() == '00') {
        if ($_NovedSer71A == '7') {
            CON851('00', '00', null, 'error', 'Error');
            _validarConsulta71A();
        }
        else {
            _llenadoDatos71A()
        }
    }
    else if (date[0].trim() == '01') {
        if ($_NovedSer71A == '7') {
            fechaAct71A();
        }
        else {
            CON851('01', '01', null, 'error', 'Error');
            _validarConsulta71A();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }

}


function _llenadoDatos71A() {
    var grupo = $_CODCUP71A;
    $('#grupo_71A').val(grupo.substring(0, 2));
    $('#codigo_71A').val(grupo.substring(2, 6));
    $('#descrip71A').val($_DESCRCUPS71A);
    $('#espec1_71A').val($_ESPEC1_71A);
    $('#espec2_71A').val($_ESPEC2_71A);
    $('#espec3_71A').val($_ESPEC3_71A);
    $('#espec4_71A').val($_ESPEC4_71A);
    $('#espec5_71A').val($_ESPEC5_71A);
    $('#espec6_71A').val($_ESPEC6_71A);
    $('#espec7_71A').val($_ESPEC7_71A);
    $('#espec8_71A').val($_ESPEC8_71A);
    $('#espec9_71A').val($_ESPEC9_71A);
    $('#espec10_71A').val($_ESPEC10_71A);
    $('#espec11_71A').val($_ESPEC11_71A);
    $('#espec12_71A').val($_ESPEC12_71A);
    $('#espec13_71A').val($_ESPEC13_71A);
    $('#espec14_71A').val($_ESPEC14_71A);
    $('#espec15_71A').val($_ESPEC15_71A);
    $('#espec16_71A').val($_ESPEC16_71A);
    $('#espec17_71A').val($_ESPEC17_71A);
    $('#espec18_71A').val($_ESPEC18_71A);
    $('#espec19_71A').val($_ESPEC19_71A);
    $('#espec20_71A').val($_ESPEC20_71A);
    $('#espec21_71A').val($_ESPEC21_71A);
    $('#espec22_71A').val($_ESPEC22_71A);
    $('#espec23_71A').val($_ESPEC23_71A);
    $('#espec24_71A').val($_ESPEC24_71A);
    $('#espec25_71A').val($_ESPEC25_71A);
    $('#espec26_71A').val($_ESPEC26_71A);
    $('#espec27_71A').val($_ESPEC27_71A);
    $('#espec28_71A').val($_ESPEC28_71A);
    $('#espec29_71A').val($_ESPEC29_71A);
    $('#oper71A').val($_OPER71A)
    $('#fecha71A').val($_FECHACUPS71A)
    $('#sexo71A').val($_SEXOCUP71A)
    $('#persona71A').val($_ATIEND71A);
    $('#pyp71A').val($_PYP71A);
    $('#proced71A').val($_TIPO71A);
    $('#finalidad71A').val($_FINALD71A);

    switch (parseInt($_NovedSer71A)) {
        case 8:
            fechaAct71A()
            break;
        case 9:
            CON851P('54', _validarConsulta71A, _eliminaDatos71A)
            break;
    }
}

// ELIMINAR REGISTRO
function _eliminaDatos71A() {
    var codg71A = cerosIzq($_codglob, 6)
    LLAMADO_DLL({
        dato: [$_NovedSer71A, codg71A],
        callback: validarElim71A,
        nombredll: 'SAL71A-02',
        carpeta: 'SALUD'
    })
}

function validarElim71A(data) {
    loader('hide');
    var rdll = data.split('|');

    if (rdll[0].trim() == '00') {
        jAlert({ titulo: 'Notificacion', mensaje: "Eliminado correctamente" },
            function () { _toggleNav(); });
    } else {
        console.log(rdll)
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}


/// NOVEDAD 7 ////

function fechaAct71A() {
    var d = new Date();
    var mes = d.getMonth() + 1;
    var dia = d.getDate();

    var fchactual = d.getFullYear() + (mes < 10 ? '0' : '') + mes + (dia < 10 ? '0' : '') + dia;

    $_fechaact = fchactual
    $('#fecha71A').val($_fechaact.trim());

    operd71A()
}

function operd71A() {
    $('#oper71A').val($_ADMINW.trim());
    _datoPYP71A()
}

function _datoPYP71A() {
    var datosPyp = [
        { "COD": "1", "DESCRIP": "Si" },
        { "COD": "2", "DESCRIP": "No" }
    ]

    POPUP({
        array: datosPyp,
        titulo: 'PYP?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _validarConsulta71A
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
                $('#pyp71A').val(data.DESCRIP.trim())
                $_PYP = data.DESCRIP.trim()
                setTimeout(validarProce71A, 300);
                break;
            case '2':
                $('#pyp71A').val(data.DESCRIP.trim())
                $_PYP = data.DESCRIP.trim()
                setTimeout(validarFinalidad71A, 300);
                break;
        }
    })
}

function validarProce71A() {
    var datoProce = [
        { "COD": "1", "DESCRIP": "Diagnostico" },
        { "COD": "2", "DESCRIP": "Terapeutico" },
        { "COD": "3", "DESCRIP": "Proteccion Especifica" },
        { "COD": "4", "DESCRIP": "Detec. Temprana Enferm Genr" },
        { "COD": "5", "DESCRIP": "Destc. Temprana Enferm Prof" },
        { "COD": "9", "DESCRIP": "No Aplica" }
    ]

    POPUP({
        array: datoProce,
        titulo: 'Tipo Procedimiento',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _datoPYP71A
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '9':
                $('#proced71A').val(data.COD.trim() + "-" + data.DESCRIP.trim());
                $_PROCED = data.COD.trim()
                setTimeout(validarFinalidad71A, 300);
                break;
        }
    })
}

function validarFinalidad71A() {
    var datoFinald = [
        { "COD": "1", "DESCRIP": "Atencion Parto Puerperio" },
        { "COD": "2", "DESCRIP": "Atencion Recien Nacido" },
        { "COD": "3", "DESCRIP": "Atencion Planf. Familiar" },
        { "COD": "4", "DESCRIP": "Atencion Alt. Crecm y Desarrollo <10" },
        { "COD": "5", "DESCRIP": "Deteccion Alter Desarrollo Jov" },
        { "COD": "6", "DESCRIP": "Deteccion Alter Embarazo" },
        { "COD": "7", "DESCRIP": "Deteccion Alter Adulto" },
        { "COD": "8", "DESCRIP": "Deteccion Alter Agud Vis" },
        { "COD": "9", "DESCRIP": "Deteccion Enfermed Profes" },
        { "COD": "10", "DESCRIP": "No Aplica" },
        { "COD": "11", "DESCRIP": "Patologia Cronica" }
    ]

    POPUP({
        array: datoFinald,
        titulo: 'Finalidad de Consulta',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: validarProce71A
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '10':
            case '11':
                $('#finalidad71A').val(data.COD.trim() + "-" + data.DESCRIP.trim());
                $_FINAL = data.COD.trim()
                setTimeout(validarSexo71A, 300);
                break;
        }
    })
}



function validarSexo71A() {

    var datoSexo = [
        { "COD": "1", "DESCRIP": "Femenino" },
        { "COD": "2", "DESCRIP": "Masculino" }
    ]

    POPUP({
        array: datoSexo,
        titulo: 'Sexo?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _datoPYP71A
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
                $('#sexo71A').val(data.DESCRIP.trim())
                $_SEX0 = data.COD.trim()
                profesiona71A();
                break;
        }
    })
}


function profesiona71A() {
    _ventanaDatos({
        titulo: "Personal que atiende",
        tipo: 'mysql',
        db: $CONTROL,
        tablaSql: 'sc_archatiend',
        callback_esc: function () {
            validarSexo71A()
        },
        callback: function (data) {
            $("#persona71A").val(data.codigo)
            $("#descrPer71A").val(data.nombre)
            validarEspecialidad_71A(1);
        }
    });
}

function validarEspecialidad_71A(id) {
    console.debug('validar especialidad');
    validarInputs(
        {
            form: '#validarEspec' + id,
            orden: "1"
        },
        function () {
            if (id == '1') {
                _validarConsulta71A()
            } else {
                validarEspecialidad_71A(parseInt(id) - 1)
            }
        },
        function () {
            var codigoEspec71A = $('#espec' + id + '_71A').val();
            var descpEsp71A = $('#DescEspec' + id + '_71A').val();

            if (codigoEspec71A.trim().length > 0) {
                switch (codigoEspec71A) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        validarEspecialidad_71A(id)
                        break;

                    default:
                        if (id == '29') {
                            envioDatos_71A(1)
                        } else {
                            validarEspecialidad_71A(parseInt(id) + 1);
                        }
                        break;
                }
            } else {
                _consultaSql({
                    sql: `SELECT * FROM sc_archesp WHERE codigo = '${codigoEspec71A}'`,
                    db: 'datos_pros',
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            var datos = results[0]
                            console.log(datos)
                            if (results.length > 0) {
                                switch (id) {
                                    case 29:
                                        envioDatos_71A(1)
                                        break;
                                    default:
                                        validarEspecialidad_71A(parseInt(id) + 1);
                                        break;
                                }
                                var consecutivo = cerosIzq(datos.codigo.toString().trim(), 3)
                                $(idDescp).val(data.nombre.trim())
                                $(descpEsp71A).val(consecutivo)
                                envioDatos_71A()
                            } else if (results.length == '') {
                                envioDatos_71A()
                            }
                        }
                    }
                })
            }
        }
    )
}

function envioDatos_71A() {
    var grupcup = cerosIzq($('#grupo_71A').val(), 2)
    var codcup = cerosIzq($('#codigo_71A').val(), 4)
    var codgcp = grupcup + codcup;
    var sexenvr = $_SEX0.substring(0, 1);
    var atiencup = cerosIzq($("#persona71A").val(), 1)
    var pypenvr = $_PYP.substring(0, 1);
    var espcup1 = cerosIzq($("#espec1_71A").val(), 3)
    var espcup2 = cerosIzq($("#espec2_71A").val(), 3)
    var espcup3 = cerosIzq($("#espec3_71A").val(), 3)
    var espcup4 = cerosIzq($("#espec4_71A").val(), 3)
    var espcup5 = cerosIzq($("#espec5_71A").val(), 3)
    var espcup6 = cerosIzq($("#espec6_71A").val(), 3)
    var espcup7 = cerosIzq($("#espec7_71A").val(), 3)
    var espcup8 = cerosIzq($("#espec8_71A").val(), 3)
    var espcup9 = cerosIzq($("#espec9_71A").val(), 3)
    var espcup10 = cerosIzq($("#espec10_71A").val(), 3)
    var espcup11 = cerosIzq($("#espec11_71A").val(), 3)
    var espcup12 = cerosIzq($("#espec12_71A").val(), 3)
    var espcup13 = cerosIzq($("#espec13_71A").val(), 3)
    var espcup14 = cerosIzq($("#espec14_71A").val(), 3)
    var espcup15 = cerosIzq($("#espec15_71A").val(), 3)
    var espcup16 = cerosIzq($("#espec16_71A").val(), 3)
    var espcup17 = cerosIzq($("#espec17_71A").val(), 3)
    var espcup18 = cerosIzq($("#espec18_71A").val(), 3)
    var espcup19 = cerosIzq($("#espec19_71A").val(), 3)
    var espcup20 = cerosIzq($("#espec20_71A").val(), 3)
    var espcup21 = cerosIzq($("#espec21_71A").val(), 3)
    var espcup22 = cerosIzq($("#espec22_71A").val(), 3)
    var espcup23 = cerosIzq($("#espec23_71A").val(), 3)
    var espcup24 = cerosIzq($("#espec24_71A").val(), 3)
    var espcup25 = cerosIzq($("#espec25_71A").val(), 3)
    var espcup26 = cerosIzq($("#espec26_71A").val(), 3)
    var espcup27 = cerosIzq($("#espec27_71A").val(), 3)
    var espcup28 = cerosIzq($("#espec28_71A").val(), 3)
    var espcup29 = cerosIzq($("#espec29_71A").val(), 3)
    var procd = cerosIzq($_PROCED, 1);
    var finaldad = cerosIzq($_FINAL, 2)

    LLAMADO_DLL({
        dato: [$_NovedSer71A, codgcp, espcup1, espcup2, espcup3, espcup4, espcup5, espcup6, espcup7, espcup8, espcup9, espcup10,
            espcup11, espcup12, espcup13, espcup14, espcup15, espcup16, espcup17, espcup18, espcup19, espcup20, espcup21, espcup22,
            espcup23, espcup24, espcup25, espcup26, espcup27, espcup28, espcup29, $_ADMINW, $_fechaact, sexenvr, atiencup, pypenvr, procd, finaldad],
        callback: _limpiarDatos71A,
        nombredll: 'SAL71A-02',
        carpeta: 'SALUD'
    })
}


function _limpiarDatos71A(data) {
    _inputControl('reset');
    _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        var mensaje
        switch (parseInt($_NovedSer71A)) {
            case 7:
                mensaje = "Creado Correctamente"
                break;
            case 8:
                mensaje = "Modificado correctamente"
                break;
        }
        jAlert({ titulo: 'Notificacion', mensaje: mensaje })
    } else {
        CON852(temp[0], temp[1], temp[2]);
    }
}

// FUNCIONES PARA DATOS NUEVOS
function buscarDescrip_71A(codig) {
    var retornar = false;
    for (var i = 0; i < arraycups.length; i++) {
        if (arraycups[i].CODIGO.trim() == codig) {
            retornar = arraycups[i];
            break;
        }
    }
    return retornar;
}