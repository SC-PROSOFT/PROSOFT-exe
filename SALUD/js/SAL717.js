/* NOMBRE RM --> SER112 // NOMBRE ELECTR --> SAL717 */

var $_NovedSer717, arrayservhsp;

$(document).ready(function () {

    _toggleF8([
        { input: 'codigo', app: '717', funct: _ventanaSerHosp }
    ]);

    $_ADMINW = localStorage.cod_oper ? localStorage.cod_oper : false;
    json_Gruptar717();

});


// --> F8 SERVICIO-HOSPT //
function _ventanaSerHosp(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "SERVICIOS HOSPITALARIOS",
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_servhos',
            callback_esc: function () {
                _validarDato()
            },
            callback: function (data) {
                console.debug(data, data.codigo);
                $('#codigo_717').val(data.codigo);
                _enterInput('#codigo_717');
            }
        });
    }
}

function json_Gruptar717() {
    LLAMADO_DLL({
        dato: [],
        callback: on_jsonGruptar717,
        nombredll: 'SAL717-01',
        carpeta: 'SALUD'
    })
}

function on_jsonGruptar717(data) {
    console.debug(data);
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var json = date[1].trim();
    var rutaJson = get_url("temp/" + json);
    if (swinvalid == '00') {
        SolicitarDatos(
            null,
            function (data) {
                arrayservhsp = data.SERVICIOS
                arrayservhsp.pop()
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_eliminarJson717);
            },
            rutaJson
        );
    }
    else {
        loader('hide');
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function on_eliminarJson717(data) {
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
    $_NovedSer717 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarDato();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer717').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarDato() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {
            var codigo_717 = $('#codigo_717').val();
            var busquedaArray = buscarDescrip_717(codigo_717)
            $_COD717 = codigo_717
            switch (codigo_717) {

                case codigo_717.length == 0:
                    CON851('03', '03', null, 'error', 'error');
                    _validarDato()
                    break;
                default:
                    switch (parseInt($_NovedSer717)) {
                        case 7:
                            if (!busquedaArray) {
                                detalle717()

                            } else {
                                CON851('00', '00', null, 'error', 'error');
                                _validarDato()

                            }
                            break;
                        case 8:

                        case 9:
                            if (!busquedaArray) {
                                CON851('01', '01', null, 'error', 'error');
                                _validarDato()
                            } else {
                                _llenarDatSer717(busquedaArray)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function _llenarDatSer717(data) {
    $('#codigo_717').val(data.CODIGO.trim());
    $('#descripServh717').val(data.DESCRIP.trim());

    switch (parseInt($_NovedSer717)) {
        case 8:
            detalle717()
            break;
        case 9:
            CON851P('54', _validarDato, _eliminaDatos717)
            break;
    }
}


// ELIMINAR REGISTRO
function _eliminaDatos717() {
    var codgSer717 = cerosIzq($_COD717, 2)

    LLAMADO_DLL({
        dato: [$_NovedSer717, codgSer717],
        callback: _elimRegis717,
        // function (data) { validarResp_717(data, codgSer717) },
        nombredll: 'SAL717-02',
        carpeta: 'SALUD'
    })
}



function _elimRegis717(data) {
    _inputControl('reset');
    _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        var mensaje
        switch (parseInt($_NovedSer717)) {
            case 9:
                mensaje = "Eliminado correctamente"
                break;
        }
        jAlert({ titulo: 'Notificacion', mensaje: mensaje })
    } else {
        CON852(temp[0], temp[1], temp[2]);
    }
}





/// NOVEDAD 7 ////
function detalle717() {
    validarInputs(
        {
            form: '#detalle',
            orden: '1'
        },
        function () { _validarDato(); },
        function () { envioDatSer717() }
    )
}


function envioDatSer717() {
    var novd717 = $_NovedSer717
    var desc717 = espaciosDer($('#descripServh717').val(), 25)

    LLAMADO_DLL({
        dato: [novd717, $_COD717, desc717],
        callback: function (data) {
            validarResp_717(data, $_COD717, desc717)
        },
        nombredll: 'SAL717-02',
        carpeta: 'SALUD'
    })
}


// function _limpiarDatos717(data) {
//     _inputControl('reset');
//     _toggleNav();
//     var temp = data.split('|')
//     console.log(temp)
//     if (temp[0].trim() == '00') {
//         var mensaje
//         switch (parseInt($_NovedSer717)) {
//             case 7:
//                 mensaje = "Creado Correctamente"
//                 break;
//             case 8:
//                 mensaje = "Modificado correctamente"
//                 break;
//         }
//         jAlert({ titulo: 'Notificacion', mensaje: mensaje })
//     } else {
//         CON852(temp[0], temp[1], temp[2]);
//     }
// }

// function envioDatSer717() {
//     var novd717 = $_NovedSer717
//     var codg717 = $_COD717
//     var desc717 = espaciosDer($('#descripServh717').val(), 25)

//     LLAMADO_DLL({
//         dato: [novd717, codg717, desc717],
//         callback: function (data) {
//             validarResp_717(data, codg717, desc717)
//         },
//         nombredll: 'SAL717-02',
//         carpeta: 'SALUD'
//     })
// }


function validarResp_717(data, $_COD717, desc717) {
    loader('hide');
    var rdll = data.split('|');
    console.log(rdll[0])
    if (rdll[0].trim() == '00') {
        switch (parseInt($_NovedSer717)) {
            case 7:
                _consultaSql({
                    sql: `INSERT INTO sc_servhos VALUES ('${$_COD717}', '${desc717}');`,
                    db: 'datos_pros',
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCajas717();
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO EL DATO' },
                                    function () {
                                        limpiarCajas717();
                                    });
                            }
                        }
                    }
                })
                break;
            case 8:
                _consultaSql({
                    sql: `UPDATE sc_servhos SET nombre='${desc717}' WHERE codigo = '${$_COD717}' `,
                    db: 'datos_pros',
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO MODIFICADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCajas717()
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR MODIFICANDO EL DATO' },
                                    function () {
                                        limpiarCajas717();
                                    });
                            }
                        }
                    }
                })
                break;
            case 9:
                _consultaSql({
                    sql: `DELETE FROM sc_servhos WHERE codigo = '${$_COD717}'`,
                    db: 'datos_pros',
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO ELIMINADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCajas717()
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR ELIMINANDO EL DATO' },
                                    function () {
                                        limpiarCajas717()
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

function limpiarCajas717() {
    _toggleNav();
    _inputControl('reset');
    _inputControl('disabled');

}

// FUNCIONES PARA DATOS NUEVOS
function buscarDescrip_717(data) {
    var retornar = false;
    for (var i in arrayservhsp) {
        if (arrayservhsp[i].CODIGO.trim() == data) {
            retornar = arrayservhsp[i];
            break;
        }
    }
    return retornar;
}
