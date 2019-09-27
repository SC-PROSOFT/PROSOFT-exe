/* NOMBRE RM --> SER11A // NOMBRE ELECTR --> SAL71A */

var $_NovedSer71A, arraycups, $_fechaact, $arrayprofes;

$(document).ready(function () {
    $_ADMINW = localStorage.cod_oper ? localStorage.cod_oper : false;

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
    crearJsonProfesion_71A();
});

// --> F8 CUPS //
// $(document).on('keydown', '#grupo71A', 
function _ventanGrp(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA CODIGO CUPS",
            tipo: 'mysql',
            tablaSql: 'sc_archcups',
            callback_esc: function () {
                _validarConsulta
            },
            callback: function (data) {
                console.debug(data);
                var grupo = data.codigo.trim();
                $('#grupo_71A').val(grupo.substring(0, 2));
                $('#codigo_71A').val(grupo.substring(2, 6));
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
            tablaSql: 'sc_archcups',
            callback_esc: function () {
                _validarConsulta
            },
            callback: function (data) {
                console.debug(data);
                var grupo = data.codigo.trim();
                $('#grupo_71A').val(grupo.substring(0, 2));
                $('#codigo_71A').val(grupo.substring(2, 6));
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
                tablaSql: 'sc_archespcup',
                callback_esc: function () {
                    profesiona71A()
                },
                callback: function (data) {
                    $(idEspec).val(data.especialidad.trim())
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

function crearJsonProfesion_71A() {
    LLAMADO_DLL({
        dato: [],
        callback: on_jsonProfesion71A,
        nombredll: 'SER830',
        carpeta: 'SALUD'
    })
}

function on_jsonProfesion71A(data) {
    console.debug(data);
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var json = date[1].trim();
    var rutaJson = get_url('/progdatos/json/' + json + '.JSON');
    if (swinvalid == '00') {
        SolicitarDatos(
            null,
            function (data) {
                $arrayprofes = data.PROFESION
                $arrayprofes.pop()
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_eliminarJsonPr71A);
                crearJsonDatos_71A();
            },
            rutaJson
        );
    }
    else {
        loader('hide');
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function on_eliminarJsonPr71A(data) {
    console.log(data);
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        console.debug('json eliminado')
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}



function crearJsonDatos_71A() {
    LLAMADO_DLL({
        dato: [],
        callback: on_jsonDatos71A,
        nombredll: 'SAL71A-01',
        carpeta: 'SALUD'
    })
}

function on_jsonDatos71A(data) {
    console.debug(data);
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var json = date[1].trim();
    var rutaJson = get_url('/progdatos/json/' + json + '.JSON');
    if (swinvalid == '00') {
        SolicitarDatos(
            null,
            function (data) {
                arraycups = data.CUPS
                arraycups.pop()
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_eliminarJson71A);
            },
            rutaJson
        );
    }
    else {
        loader('hide');
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function on_eliminarJson71A(data) {
    console.log(data);
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        loader('hide');
        CON850(_evaluarCON850);
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
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
            _validarConsulta();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer71A').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarConsulta() {
    validarInputs(
        {
            form: "#consulta",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {
            var grupo11 = $('#grupo_71A').val();
            var codig11 = $('#codigo_71A').val();

            var codigo71A = grupo11 + codig11;

            $_codglob = codigo71A

            var busquedaArray = buscarDescrip_71A(codigo71A);
            switch (codigo71A) {
                case codigo71A.trim().length == 0:
                    CON851('14', '14', null, 'error', 'error');
                    _validarConsulta()
                    break;
                default:
                    switch (parseInt($_NovedSer71A)) {
                        case 7:
                            if (!busquedaArray) {
                                $("#descrip71A").val(busquedaArray.DESCRIP);
                                fechaActual()
                            } else {
                                CON851('00', '00', null, 'error', 'error');
                                _validarConsulta()
                            }
                            break;
                        case 8:
                        case 9:
                            if (!busquedaArray) {
                                CON851('01', '01', null, 'error', 'error');
                                _validarConsulta()
                            } else {
                                _llenarDatSer101(busquedaArray)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function _llenarDatSer101(data) {
    var grupo = data.CODIGO.trim();
    $('#grupo_71A').val(grupo.substring(0, 2));
    $('#codigo_71A').val(grupo.substring(2, 6));
    $('#descrip71A').val(data.DESCRIP.trim());
    $('#espec1_71A').val(data.ESPECIALD1.trim());
    $('#espec2_71A').val(data.ESPECIALD2.trim());
    $('#espec3_71A').val(data.ESPECIALD3.trim());
    $('#espec4_71A').val(data.ESPECIALD4.trim());
    $('#espec5_71A').val(data.ESPECIALD5.trim());
    $('#espec6_71A').val(data.ESPECIALD6.trim());
    $('#espec7_71A').val(data.ESPECIALD7.trim());
    $('#espec8_71A').val(data.ESPECIALD8.trim());
    $('#espec9_71A').val(data.ESPECIALD9.trim());
    $('#espec10_71A').val(data.ESPECIALD10.trim());
    $('#espec11_71A').val(data.ESPECIALD11.trim());
    $('#espec12_71A').val(data.ESPECIALD12.trim());
    $('#espec13_71A').val(data.ESPECIALD13.trim());
    $('#espec14_71A').val(data.ESPECIALD14.trim());
    $('#espec15_71A').val(data.ESPECIALD15.trim());
    $('#espec16_71A').val(data.ESPECIALD16.trim());
    $('#espec17_71A').val(data.ESPECIALD17.trim());
    $('#espec18_71A').val(data.ESPECIALD18.trim());
    $('#espec19_71A').val(data.ESPECIALD19.trim());
    $('#espec20_71A').val(data.ESPECIALD20.trim());
    $('#espec21_71A').val(data.ESPECIALD21.trim());
    $('#espec22_71A').val(data.ESPECIALD22.trim());
    $('#espec23_71A').val(data.ESPECIALD23.trim());
    $('#espec24_71A').val(data.ESPECIALD24.trim());
    $('#espec25_71A').val(data.ESPECIALD25.trim());
    $('#espec26_71A').val(data.ESPECIALD26.trim());
    $('#espec27_71A').val(data.ESPECIALD27.trim());
    $('#espec28_71A').val(data.ESPECIALD28.trim());
    $('#espec29_71A').val(data.ESPECIALD29.trim());
    $('#oper71A').val(data.OPER.trim())
    $('#fecha71A').val(data.FECHA.trim())
    $('#sexo71A').val(data.SEXO.trim())
    $('#persona71A').val(data.ATIENDE.trim());
    $('#pyp71A').val(data.PYP.trim());
    $('#proced71A').val(data.TIP_PROC.trim());
    $('#finalidad71A').val(data.FINALIDAD.trim());

    switch (parseInt($_NovedSer71A)) {
        case 8:
            fechaActual()
            break;
        case 9:
            CON851P('54', _validarConsulta, _eliminaDatos71A)
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

function fechaActual() {
    var d = new Date();
    var mes = d.getMonth() + 1;
    var dia = d.getDate();

    var fchactual = d.getFullYear() + (mes < 10 ? '0' : '') + mes + (dia < 10 ? '0' : '') + dia;

    $_fechaact = fchactual
    $('#fecha71A').val($_fechaact.trim());

    operd()
}

function operd() {
    $('#oper71A').val($_ADMINW.trim());
    _datoPYP()
}

function _datoPYP() {
    var datospyp = '[{"codigo": "1","descripcion": "SI"},{"codigo": "2", "descripcion": "NO"}]';
    var datospyp = JSON.parse(datospyp);
    POPUP({
        array: datospyp,
        titulo: 'PYP?'
    },
        _evaluardatopyp
    );
}

function _evaluardatopyp(data) {
    $_PYP = data.descripcion
    switch (parseInt(data.id)) {
        case 1:
            validarTipoProce();
            break;
        case 2:
            validarSexo71A();
            break;
        default:
            _validarConsulta();
            break;
    }
    $('#pyp71A').val(data.descripcion);
}

function validarTipoProce() {
    var datoproce = '[{"codigo": "1", "descripcion": "DIAGNOSTICO"},{"codigo": "2", "descripcion": "TERAPEUTICO"},{"codigo": "3", "descripcion": "PROTECCION ESPECIFICA"},{"codigo": "4","descripcion": "DETEC TEMPRNA ENFER GENER"},{"codigo": "5", "descripcion": "DETEC TEMPRNA ENFER PROF"},{"codigo": "9", "descripcion": "NO APLICA"}]';
    var datoproces = JSON.parse(datoproce);
    POPUP({
        array: datoproces,
        titulo: 'Tipo Procedimiento'
    },
        _evaluarprocedimiento);
}

function _evaluarprocedimiento(data) {
    $_PROCED = (data.id).trim();
    switch (parseInt(data.id)) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 9:
            console.debug($_PROCED);
            validarFinalidad();
            break;
        default:
            _datoPYP();
            break;
    }
    $('#proced71A').val(data.id + "-" + data.descripcion);
}

function validarFinalidad() {
    var datofinal = '[{"codigo": "1","descripcion": "ATENCION PARTO PUERPERIO"},{"codigo": "2", "descripcion": "ATENCION RECIEN NACIDO"},{"codigo": "3", "descripcion": "ATENCION PLANIF FAMILIAR"},{"codigo": "4","descripcion": "ATEN ALT CREC Y DES < 10"},{"codigo": "5", "descripcion": "DETECC ALT DESARR JOVEN"},{"codigo": "6", "descripcion": "DETECC ALTER EMBARAZO"},{"codigo": "7", "descripcion": "DETECC ALTER ADULTO"},{"codigo": "8", "descripcion": "DETECC ALTER AGUD VIS"},{"codigo": "9", "descripcion": "DETECC ENFERMD PROFES"},{"codigo": "A", "descripcion": "NO APLICA"},{"codigo": "B", "descripcion":"PATOLOGIA CRONICA"}]';
    var datofinales = JSON.parse(datofinal);
    POPUP({
        array: datofinales,
        titulo: 'Finalidad de Consulta'
    },
        _evaluarFinal
    )
}

function _evaluarFinal(data) {
    $_FINAL = data.id
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
            if ($_FINAL == "A") {
                $_FINAL = 10
                validarSexo71A()
            } else if ($_FINAL == "B") {
                $_FINAL = 11
                validarSexo71A()
            }
            validarSexo71A();
            break;
        default:
            validarTipoProce();
            break;
    }
    $('#finalidad71A').val(data.id + "-" + data.descripcion);
}

function validarSexo71A() {
    var datosexo = '[{"codigo": "1","descripcion": "FEMENINO"},{"codigo": "2", "descripcion": "MASCULINO"}]';
    var datosexo = JSON.parse(datosexo);
    POPUP({
        array: datosexo,
        titulo: 'SEXO?'
    },
        _evaluardatosexo
    );
}

function _evaluardatosexo(data) {
    $_SEX0 = data.descripcion
    switch (parseInt(data.id)) {
        case 1:
        case 2:
            profesiona71A();
            break;
        default:
            _datoPYP();
            break;
    }
    $('#sexo71A').val(data.descripcion);
}

function profesiona71A() {
    _ventanaDatos({
        titulo: "Personal que atiende",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: $arrayprofes,
        callback_esc: function () {
            validarSexo71A()
        },
        callback: function (data) {
            $("#persona71A").val(data.CODIGO.trim())
            $("#descrPer71A").val(data.DESCRIPCION.trim())
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
                _validarConsulta()
            } else {
                validarEspecialidad_71A(parseInt(id) - 1)
            }
        },
        function () {
            var codigoEspec71A = $('#espec' + id + '_71A').val();

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
                    sql: `SELECT * FROM sc_archespcup WHERE especialidad = '${codigoEspec71A}'`,
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
                                var consecutivo = cerosIzq(datos.especialidad.toString().trim(), 3)
                                $(codigoEspec71A).val(consecutivo)
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

    LLAMADO_DLL({
        dato: [$_NovedSer71A, codgcp, espcup1, espcup2, espcup3, espcup4, espcup5, espcup6, espcup7, espcup8, espcup9, espcup10,
            espcup11, espcup12, espcup13, espcup14, espcup15, espcup16, espcup17, espcup18, espcup19, espcup20, espcup21, espcup22,
            espcup23, espcup24, espcup25, espcup26, espcup27, espcup28, espcup29, $_ADMINW, $_fechaact, sexenvr, atiencup, pypenvr, procd, $_FINAL],
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