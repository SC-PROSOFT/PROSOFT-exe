/* NOMBRE RM --> SER116 // NOMBRE ELECTR --> SAL71I */

var $_NovedSer71I, $arraygrpresgu;

$(document).ready(function () {

    _toggleF8([
        { input: 'codigo', app: '71I', funct: _ventanaResgard }
    ]);

    loader('hide');
    CON850(_evaluarCON850);

});


// --> F8 NOMBRE-RESG //
function _ventanaResgard (e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "NOMBRES DE COMUNIDADES",
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_gruporesgu',
            callback_esc: function () {
                _validarDato71I()
            },
            callback: function (data) {
                console.debug(data);
                $('#codigo_71I').val(data.codigo.trim())
                $('#descripSer71I').val(data.nombre.trim())
                _enterInput('#codigo_71I');
            }
        });
    }
}


// NOVEDAD //
function _evaluarCON850(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    console.debug(novedad)
    $_NovedSer71I = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarDato71I();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer71I').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarDato71I() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {
            $codigo_71I = $('#codigo_71I').val();

            let datos_envio = datosEnvio()
            datos_envio += '|'
            datos_envio += $codigo_71I

            SolicitarDll({ datosh: datos_envio }, on_nomResgu71I, get_url('/APP/SALUD/SAL71I-01.DLL'));

        }
    )
}

function on_nomResgu71I(data) {
    console.debug(data);
    var date = data.split('|');
    $_CODRESGU = date[1].trim();
    $_NOMRESGU = date[2].trim();
    if (date[0].trim() == '00') {
        if ($_NovedSer71I == '7') {
            CON851('00', '00', null, 'error', 'Error');
            _validarDato71I()
        }
        else {
            detalle71I()
        }
    }
    else if (date[0].trim() == '01') {
        if ($_NovedSer71I == '7') {
            _llenarCampos71I();
        }
        else {
            CON851('01', '01', null, 'error', 'Error');
            _validarDato71I();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _llenarCampos71I() {
    $('#codigo_71I').val($_CODRESGU);
    $('#descripSer71I').val($_NOMRESGU);

    switch (parseInt($_NovedSer71I)) {
        case 8:
            detalle71I()
            break;
        case 9:
            CON851P('54', _validarDato71I, _eliminaDatos71I)
            break;
    }
}


// ELIMINAR REGISTRO
function _eliminaDatos71I() {

    LLAMADO_DLL({
        dato: [$_NovedSer71I, $codigo_71I],
        callback: function (data) {
            baseDatos71I(data, $codigo_71I)
        },
        nombredll: 'SAL71I-02',
        carpeta: 'SALUD'
    })
}



/// NOVEDAD 7 ////

function detalle71I() {
    validarInputs(
        {
            form: '#detalle',
            orden: '1'
        },
        function () { _validarDato71I(); },
        function () { envioDatSer71I() }
    )
}

function envioDatSer71I() {
        var descpr71I = espaciosDer($('#descripSer71I').val(), 25)

    LLAMADO_DLL({
        dato: [$_NovedSer71I, $codigo_71I, descpr71I],
        callback: function (data) {
            baseDatos71I(data, $codigo_71I)
        },
        nombredll: 'SAL71I-02',
        carpeta: 'SALUD'
    })
}


function baseDatos71I(data, $codigo_71I, desc71I) {
    loader('hide');
    var rdll = data.split('|');
    console.log(rdll[0])
    if (rdll[0].trim() == '00') {
        switch (parseInt($_NovedSer71I)) {
            case 7:
                _consultaSql({
                    sql: `INSERT INTO sc_gruporesgu VALUES ('${$codigo_71I}', '${desc71I}');`,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCajas71I();
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO EL DATO' },
                                    function () {
                                        limpiarCajas71I();
                                    });
                            }
                        }
                    }
                })
                break;
            case 8:
                _consultaSql({
                    sql: `UPDATE sc_gruporesgu SET nombre='${desc71I}' WHERE codigo = '${$codigo_71I}' `,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO MODIFICADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCajas71I()
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR MODIFICANDO EL DATO' },
                                    function () {
                                        limpiarCajas71I();
                                    });
                            }
                        }
                    }
                })
                break;
            case 9:
                _consultaSql({
                    sql: `DELETE FROM sc_gruporesgu WHERE codigo = '${$codigo_71I}'`,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO ELIMINADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCajas71I()
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR ELIMINANDO EL DATO' },
                                    function () {
                                        limpiarCajas71I()
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

function limpiarCajas71I() {
    _toggleNav();
    _inputControl('reset');
    _inputControl('disabled');

}

