/* NOMBRE RM --> SER101 // NOMBRE ELECTR --> SAL711 */

var $_NovedSer711, arraygrpser, arraycontab;

$(document).ready(function () {


    _toggleF8([
        { input: 'codigo', app: '711', funct: _ventanaGrupo },
        { input: 'contab', app: '711', funct: _ventanaContab }

    ]);

    jsonGrupoServicio_711();
});


// F8 GRUPO-SERVICIO //
function _ventanaGrupo(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "GRUPOS DE SERVICIO",
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_gruposer',
            callback_esc: function () {
                _validarConsulta711()
            },
            callback: function (data) {
                console.debug(data);
                $('#codigo_711').val(data.codigo.trim())
                $('#descrip711').val(data.descripcion.trim())
                _enterInput('#codigo_711');
            }
        });
    }
}

// F8 CUENTA-MAYOR //
function _ventanaContab(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA PLAN DE CUENTAS",
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_archmae',
            callback_esc: function () {
                conContab_711
            },
            callback: function (data) {
                console.debug(data);
                $('#contab_711').val(data.cuenta.trim() + data.nivel.trim())
                $('#descripContab_711').val(data.descripcion)
                _enterInput('#contab_711');
            }
        });
    }
}

// llamado DLL GRUPO-SERVICIO
function jsonGrupoServicio_711() {
    LLAMADO_DLL({
        dato: [],
        callback: on_jsonGrupSer711,
        nombredll: 'SAL711-01',
        carpeta: 'SALUD'
    })
}

function on_jsonGrupSer711(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var json = date[1].trim();
    var rutaJson = get_url("temp/" + json);
    if (swinvalid == '00') {
        SolicitarDatos(
            null,
            function (data) {
                arraygrpser = data.CODIGOS;
                arraygrpser.pop();
                var arrayEliminar = [];
                arrayEliminar.push(json);
                _eliminarJson(arrayEliminar, on_eliminarJsonGrupSer711);
                jsonCtamay_711();
            },
            rutaJson
        );
    }
    else {
        loader('hide');
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function on_eliminarJsonGrupSer711(data) {
    console.debug(data);
    var date = data.split('|');
    if (date[0].trim() == '00') {
        console.debug('json eliminado');
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

// Llamado DLL CUENTA-MAYOR
function jsonCtamay_711() {
    LLAMADO_DLL({
        dato: [],
        callback: on_Ctamay711,
        nombredll: 'CON801',
        carpeta: 'CONTAB'
    })
}

function on_Ctamay711(data) {
    console.debug(data);
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        var json = rdll[1].trim();
        var rutaJson = get_url("temp/" + json);
        SolicitarDatos(
            null,
            function (data) {
                arraycontab = data.MAESTROS
                arraycontab.pop()
                var arrayEliminar = [];
                arrayEliminar.push(json);
                console.debug(json);
                _eliminarJson(arrayEliminar, on_eliminarJson711);
            },
            rutaJson
        );
    } else {
        loader('hide');
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}


function on_eliminarJson711(data) {
    console.debug('llego a eliminar')
    loader('hide');
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
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
    $_NovedSer711 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarConsulta711();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer711').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarConsulta711() {
    validarInputs(
        {
            form: "#consulta",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {
            var codigo_711 = $('#codigo_711').val();
            var busquedaArray = buscarDescrip_711(codigo_711)

            $CODG711 = codigo_711

            switch (codigo_711) {

                case codigo_711.trim().length == 0:
                case "PO":
                case "NP":
                case "MQ":
                    CON851('14', '14', null, 'error', 'error');
                    _validarConsulta711()
                    break;
                default:
                    switch (parseInt($_NovedSer711)) {
                        case 7:
                            if (!busquedaArray) {
                                detalle711()
                            } else {
                                CON851('00', '00', null, 'error', 'error');
                                _validarConsulta711()
                            }
                            break;
                        case 8:

                        case 9:
                            if (!busquedaArray) {
                                CON851('01', '01', null, 'error', 'error');
                                _validarConsulta711()
                            } else {
                                _llenarDatSer711(busquedaArray)
                            }
                            break;
                    }
                    break;
            }
        }
    )

}

function _llenarDatSer711(data) {
    $('#codigo_711').val(data.COD.trim());
    $('#descrip711').val(data.DESCRIP.trim());
    $('#ingre_clin711').val(data.INGR_CLIN.trim());
    $('#ingr_terc711').val(data.INGR_TERC.trim());
    var codigoCont = data.COD_CONTAB.trim()
    if (codigoCont.length > 0) {
        $('#contab_711').val(codigoCont);
        var descripCont = buscarCodContb(codigoCont)
        $('#descripContab_711').val(descripCont.NOMBRE_MAE)
    }
    switch (parseInt($_NovedSer711)) {
        case 8:
            detalle711()
            break;
        case 9:
            CON851P('54', _validarConsulta711, eliminaRegis)
            break;
    }
}

function eliminaRegis() {
    var codgsr711 = cerosIzq($CODG711, 2)

    LLAMADO_DLL({
        dato: [$_NovedSer711, codgsr711],
        // callback: _elimRegis711,
        callback: function (data) { validarBdSql(data, codgsr711) },
        nombredll: 'SAL711-02',
        carpeta: 'SALUD'
    })
}



/// NOVEDAD 7 ////
function detalle711() {
    validarInputs(
        {
            form: '#detalle',
            orden: '1'
        },
        function () { _validarConsulta711(); },
        function () { validarPorcen_711('1') }
    )
}

function validarPorcen_711(orden) {
    validarInputs(
        {
            form: '#porcentajes',
            orden: orden
        },
        function () { detalle711(); },
        function () {
            var otro = $('#ingre_clin711').val()
            var tercero = $('#ingr_terc711').val()

            console.log(tercero)
            if ($('#ingr_terc711').val().trim().length > 0) {
                if (tercero + otro < 100) {
                    if ($('#contab_711').val().trim().length == 0) {
                        $('#contab_711').val('2815')
                    }
                    conContab_711()
                } else {
                    validarPorcen_711('2')
                }
            }
        }
    )
}

function conContab_711() {
    validarInputs(
        {
            form: '#contables',
            orden: '1'
        },
        function () { validarPorcen_711('2'); },
        function () {
            var valor = $('#contab_711').val()

            var busqueda = buscarCodContb(valor)
            switch (busqueda) {
                case false || undefined:
                    CON851('01', '01', null, 'error', 'error');
                    conContab_711()
                    break;
                default:
                    envioDat711()
                    break;
            }
        }
    )
}


function envioDat711() {
    var novd711 = $_NovedSer711;
    var codg711 = $CODG711;
    var descp711 = espaciosDer($('#descrip711').val(), 25);
    var ingre711 = cerosIzq($('#ingre_clin711').val(), 3);
    var terce711 = cerosIzq($('#ingr_terc711').val(), 4);
    var contab_711 = cerosIzq($('#contab_711').val(), 11);

    LLAMADO_DLL({
        dato: [novd711, codg711, descp711, ingre711, terce711, contab_711],
        callback: function (data) {
            validarBdSql(data, codg711, descp711, ingre711, terce711, contab_711)
        },
        nombredll: 'SAL711-02',
        carpeta: 'SALUD'
    })
}


function validarBdSql(data, codg711, descp711, ingre711, terce711, contab_711) {
    loader('hide');
    var rdll = data.split('|');
    console.log(rdll[0])
    if (rdll[0].trim() == '00') {
        switch (parseInt($_NovedSer711)) {
            case 7:
                _consultaSql({
                    sql: `INSERT INTO sc_gruposer VALUES ('${codg711}', '${descp711}', '${ingre711}', '${terce711}', '${contab_711}' );`,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
                                    function () {
                                        cajasLimp711();
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO EL DATO' },
                                    function () {
                                        cajasLimp711();
                                    });
                            }
                        }
                    }
                })
                break;
            case 8:
                var BDSQL = `UPDATE sc_gruposer SET descripcion='${descp711}', porc_clinica='${ingre711}', porc_terceros='${terce711}', cta_mayor='${contab_711}' WHERE codigo = '${codg711}' `;
                _consultaSql({
                    sql: BDSQL,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO MODIFICADO CORRECTAMENTE' },
                                    function () {
                                        cajasLimp711()
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR MODIFICANDO EL DATO' },
                                    function () {
                                        cajasLimp711();
                                    });
                            }
                        }
                    }
                })
                break;
            case 9:
                _consultaSql({
                    sql: `DELETE FROM sc_gruposer WHERE codigo = '${codg711}'`,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO ELIMINADO CORRECTAMENTE' },
                                    function () {
                                        cajasLimp711()
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR ELIMINANDO EL DATO' },
                                    function () {
                                        cajasLimp711()
                                    });
                            }
                        }
                    }
                })
                break;
        }
    } else {
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}


function cajasLimp711() {
    _toggleNav();

    _inputControl('reset');
    _inputControl('disabled');
}


// FUNCIONES PARA DATOS NUEVOS
function buscarDescrip_711(data) {
    var retornar = false;
    for (var i in arraygrpser) {
        if (arraygrpser[i].COD.trim() == data) {
            retornar = arraygrpser[i];
            break;
        }
    }
    return retornar;
}

function buscarCodContb(data) {
    var retornar = false;
    console.log(data)
    for (var i in arraycontab) {
        var $CUENTA = arraycontab[i].CTA_MAY
        $CUENTA += arraycontab[i].SUB_CTA
        $CUENTA += arraycontab[i].AUX_MAE
        if ($CUENTA == data) {
            retornar = arraycontab[i];
            break;
        }
    }
    return retornar;
}