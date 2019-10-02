/* NOMBRE RM --> SER116 // NOMBRE ELECTR --> SAL71H */

var $_NovedSer71H;

$(document).ready(function () {

    _toggleF8([
        { input: 'codigo', app: '71H', funct: _ventanaGrptar }
    ]);

    loader('hide');
    CON850(_evaluarCON850);

});

function _ventanaGrptar(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "NOMBRES DE COMUNIDADES",
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_grupocomu',
            callback_esc: function () {
                _validarDato71H()
            },
            callback: function (data) {
                console.debug(data);
                $('#codigo_71H').val(data.codigo)
                $('#descripSer71H').val(data.descripcion)
                _enterInput('#codigo_71H');
            }
        });
    }
}


// NOVEDAD //
function _evaluarCON850(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    console.debug(novedad)
    $_NovedSer71H = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarDato71H();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer71H').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarDato71H() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {
            $_COD71H = $('#codigo_71H').val();

            let datos_envio = datosEnvio()
            datos_envio += '|'
            datos_envio += $_COD71H

            SolicitarDll({ datosh: datos_envio }, on_grupoComu71H, get_url('/APP/SALUD/SAL71H-01.DLL'));
        }
    )
}

function on_grupoComu71H(data) {
    console.debug(data);
    var date = data.split('|');
    $_CODCOMU = date[1].trim();
    $_NOMCOMU = date[2].trim();

    if (date[0].trim() == '00') {
        if ($_NovedSer71H == '7') {
            CON851('00', '00', null, 'error', 'Error');
            _validarDato71H()
        }
        else {
            _llenarDatSer71H()
        }
    }
    else if (date[0].trim() == '01') {
        if ($_NovedSer71H == '7') {
            detalle71H();
        }
        else {
            CON851('01', '01', null, 'error', 'Error');
            _validarDato71H();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _llenarDatSer71H() {
    $('#codigo_71H').val($_CODCOMU);
    $('#descripSer71H').val($_NOMCOMU);

    switch (parseInt($_NovedSer71H)) {
        case 8:
            detalle71H()
            break;
        case 9:
            CON851P('54', _validarDato71H, _envDatos71H)
            break;
    }
}


// ELIMINAR REGISTRO
function _envDatos71H() {

    LLAMADO_DLL({
        dato: [$_NovedSer71H, $_COD71H],
        callback: function (data) {
            validarResp_71H(data, $_COD71H)
        },
        nombredll: 'SAL71H-02',
        carpeta: 'SALUD'
    })
}


/// NOVEDAD 7 ////
function detalle71H() {
    console.debug('detalle')
    validarInputs(
        {
            form: '#descrp',
            orden: '1'
        },
        function () { _validarDato71H(); },
        function () { envioDatSer71H() }
    )
}


function envioDatSer71H() {
    var novd71H = $_NovedSer71H
    var desc71H = espaciosDer($('#descripSer71H').val(), 25)

    LLAMADO_DLL({
        dato: [novd71H, $_COD71H, desc71H],
        callback: function (data) {
            validarResp_71H(data, $_COD71H, desc71H)
        },
        nombredll: 'SAL71H-02',
        carpeta: 'SALUD'
    })
}


function validarResp_71H(data, $_COD71H, desc71H) {
    loader('hide');
    var rdll = data.split('|');
    console.log(rdll[0])
    if (rdll[0].trim() == '00') {
        switch (parseInt($_NovedSer71H)) {
            case 7:
                _consultaSql({
                    sql: `INSERT INTO sc_grupocomu VALUES ('${$_COD71H}', '${desc71H}');`,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCajas71H();
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO EL DATO' },
                                    function () {
                                        limpiarCajas71H();
                                    });
                            }
                        }
                    }
                })
                break;
            case 8:
                _consultaSql({
                    sql: `UPDATE sc_grupocomu SET descripcion='${desc71H}' WHERE codigo = '${$_COD71H}' `,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO MODIFICADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCajas71H()
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR MODIFICANDO EL DATO' },
                                    function () {
                                        limpiarCajas71H();
                                    });
                            }
                        }
                    }
                })
                break;
            case 9:
                _consultaSql({
                    sql: `DELETE FROM sc_grupocomu WHERE codigo = '${$_COD71H}'`,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO ELIMINADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCajas71H()
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR ELIMINANDO EL DATO' },
                                    function () {
                                        limpiarCajas71H()
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

function limpiarCajas71H() {
    _toggleNav();
    _inputControl('reset');
    _inputControl('disabled');

}
