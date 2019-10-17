/* NOMBRE RM --> SER106 // NOMBRE ELECTR --> SAL712 */

var $_NovedSer712, $arraynomtar;

$(document).ready(function () {

    _toggleF8([
        { input: 'codigo', app: '712', funct: _ventanaGrptar }
    ]);

    $_ADMINW = localStorage.cod_oper ? localStorage.cod_oper : false;
    json_Gruptar712();

});


// --> F8 NOMBRE-TAR //
function _ventanaGrptar(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "GRUPOS DE SERVICIO",
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_grupotar',
            callback_esc: function () {
                _validarDato712()
            },
            callback: function (data) {
                console.debug(data);
                $('#codigo_712').val(data.codigo_nomtr.trim())
                $('#descripSer712').val(data.descrip_nomtr)
                _enterInput('#codigo_712');
            }
        });
    }
}

function json_Gruptar712() {
    LLAMADO_DLL({
        dato: [],
        callback: on_jsonGruptar712,
        nombredll: 'SAL712-01',
        carpeta: 'SALUD'
    })
}

function on_jsonGruptar712(data) {
    console.debug(data);
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var json = date[1].trim();
    var rutaJson = get_url("temp/" + json);
    if (swinvalid == '00') {
        SolicitarDatos(
            null,
            function (data) {
                $arraynomtar = data.CODIGOS
                $arraynomtar.pop()
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_eliminarJson712);
            },
            rutaJson
        );
    }
    else {
        loader('hide');
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function on_eliminarJson712(data) {
    console.log(data);
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
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
    $_NovedSer712 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarDato712();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer712').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarDato712() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {
            var codigo_712 = $('#codigo_712').val();
            var busquedaArray = buscarDescrip_712(codigo_712)
            $_COD712 = codigo_712
            switch (codigo_712) {

                case codigo_712.length == 0:
                    CON851('03', '03', null, 'error', 'error');
                    _validarDato712()
                    break;
                default:
                    switch (parseInt($_NovedSer712)) {
                        case 7:
                            if (!busquedaArray) {
                                detalle712()
                            } else {
                                CON851('00', '00', null, 'error', 'error');
                                _validarDato712()
                            }
                            break;
                        case 8:

                        case 9:
                            if (!busquedaArray) {
                                CON851('01', '01', null, 'error', 'error');
                                _validarDato712()
                            } else {
                                _llenarDatSer712(busquedaArray)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function _llenarDatSer712(data) {
    $('#codigo_712').val(data.COD.trim());
    $('#descripSer712').val(data.DESCRIP.trim());

    switch (parseInt($_NovedSer712)) {
        case 8:
            detalle712()
            break;
        case 9:
            CON851P('54', _validarDato712, _eliminaDatos712)
            break;
    }
}


// ELIMINAR REGISTRO
function _eliminaDatos712() {
    var codgSer712 = cerosIzq($_COD712, 2)

    LLAMADO_DLL({
        dato: [$_NovedSer712, codgSer712],
        callback: function (data) { validarResp_712(data, codgSer712) },
        nombredll: 'SAL712-02',
        carpeta: 'SALUD'
    })
}



/// NOVEDAD 7 ////

function detalle712() {
    validarInputs(
        {
            form: '#detalle',
            orden: '1'
        },
        function () { _validarDato712(); },
        function () { envioDatSer712() }
    )
}


function envioDatSer712() {
    var novd712 = $_NovedSer712
    var desc712 = espaciosDer($('#descripSer712').val(), 25)

    LLAMADO_DLL({
        dato: [novd712, $_COD712, desc712],
        callback: function (data) {
            validarResp_712(data, $_COD712, desc712)
        },
        nombredll: 'SAL712-02',
        carpeta: 'SALUD'
    })
}

function validarResp_712(data, $_COD712, desc712) {
    loader('hide');
    var rdll = data.split('|');
    console.log(rdll[0])
    if (rdll[0].trim() == '00') {
        switch (parseInt($_NovedSer712)) {
            case 7:
                _consultaSql({
                    sql: `INSERT INTO sc_grupotar VALUES ('${$_COD712}', '${desc712}');`,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCajas712();
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO EL DATO' },
                                    function () {
                                        limpiarCajas712();
                                    });
                            }
                        }
                    }
                })
                break;
            case 8:
                _consultaSql({
                    sql: `UPDATE sc_grupotar SET descrip_nomtr ='${desc712}' WHERE codigo_nomtr = '${$_COD712}' `,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO MODIFICADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCajas712()
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR MODIFICANDO EL DATO' },
                                    function () {
                                        limpiarCajas712();
                                    });
                            }
                        }
                    }
                })
                break;
            case 9:
                _consultaSql({
                    sql: `DELETE FROM sc_grupotar WHERE codigo_nomtr = '${$_COD712}'`,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO ELIMINADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCajas712()
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR ELIMINANDO EL DATO' },
                                    function () {
                                        limpiarCajas712()
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

function limpiarCajas712() {
    _toggleNav();
    _inputControl('reset');
    _inputControl('disabled');

}

// FUNCIONES PARA DATOS NUEVOS
function buscarDescrip_712(data) {
    var retornar = false;
    for (var i in $arraynomtar) {
        if ($arraynomtar[i].COD.trim() == data) {
            retornar = $arraynomtar[i];
            break;
        }
    }
    return retornar;
}
