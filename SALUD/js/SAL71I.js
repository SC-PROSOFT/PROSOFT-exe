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
            tablaSql: 'sc_gruporesgu',
            callback_esc: function () {
                _validarDato71I()
            },
            callback: function (data) {
                console.debug(data);
                $('#codigo_71I').val(data.codigo.trim())
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

            SolicitarDll({ datosh: datos_envio }, on_nomResgu71H, get_url('/SALUD/APP/SAL71I-01.DLL'));

        }
    )
}

function on_nomResgu71H(data) {
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

        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_NovedSer71I
        datos_envio += '|'
        datos_envio +=  $codigo_71I

        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _eliminar71I, get_url('/SALUD/APP/SAL71I-02.DLL'));
}

function _eliminar71I(data) {
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

    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_NovedSer71I
    datos_envio += '|'
    datos_envio +=  $codigo_71I
    datos_envio += '|'
    datos_envio += descpr71I

    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, guardarDatos71I, get_url('/APP/SALUD/SAL71I-02.DLL'));

}


function guardarDatos71I(data) {
    _inputControl('reset');
    _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        var mensaje
        switch (parseInt($_NovedSer71H)) {
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





// function validarResp_71I(data, codg71I, desc71I) {
//     loader('hide');
//     var rdll = data.split('|');
//     console.log(rdll[0])
//     if (rdll[0].trim() == '00') {
//         switch (parseInt($_NovedSer71I)) {
//             case 7:
//                 _consultaSql({
//                     sql: `INSERT INTO sc_gruporesgu VALUES ('${codg71I}', '${desc71I}');`,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCajas71I();
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO EL DATO' },
//                                     function () {
//                                         limpiarCajas71I();
//                                     });
//                             }
//                         }
//                     }
//                 })
//                 break;
//             case 8:
//                 _consultaSql({
//                     sql: `UPDATE sc_gruporesgu SET descripcion='${desc71I}' WHERE codigo = '${codg71I}' `,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             console.log(results)
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO MODIFICADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCajas71I()
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR MODIFICANDO EL DATO' },
//                                     function () {
//                                         limpiarCajas71I();
//                                     });
//                             }
//                         }
//                     }
//                 })
//                 break;
//             case 9:
//                 _consultaSql({
//                     sql: `DELETE FROM sc_gruporesgu WHERE codigo = '${codg71I}'`,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             console.log(results)
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO ELIMINADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCajas71I()
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR ELIMINANDO EL DATO' },
//                                     function () {
//                                         limpiarCajas71I()
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

// function limpiarCajas71I() {
//     _toggleNav();
//     _inputControl('reset');
//     _inputControl('disabled');

// }

