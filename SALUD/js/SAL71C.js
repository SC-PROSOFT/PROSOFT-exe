/* NOMBRE RM --> SER11C // NOMBRE ELECTR --> SAL71C */

var $_NovedSer71C, arraygrucap;

$(document).ready(function () {

    _toggleF8([
        { input: 'codigo', app: '71C', funct: _ventanaGrupcap }
    ]);

    json_Grupcap71C();

});


// --> F8 DIVISIONES //
function _ventanaGrupcap(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "UNIDADES DE SERVICIO",
            tipo: 'mysql',
            tablaSql: 'sc_grupocap',
            callback_esc: function () {
                _validarDato71C()
            },
            callback: function (data) {
                $('#codigo_71C').val(data.codigo);
                $('#descripGrcp71C').val(data.descripcion.trim());
                _enterInput('#codigo_71C');
            }
        });
    }
}

function json_Grupcap71C() {
    LLAMADO_DLL({
        dato: [],
        callback: on_jsonGrupcap71C,
        nombredll: 'SAL71C-01',
        carpeta: 'SALUD'
    })
}

function on_jsonGrupcap71C(data) {
    console.debug(data);
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var json = date[1].trim();
    var rutaJson = get_url('/progdatos/json/' + json + '.JSON');
    if (swinvalid == '00') {
        SolicitarDatos(
            null,
            function (data) {
                arraygrucap = data.DIVISIONES
                arraygrucap.pop()
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_eliminarJson71C);
            },
            rutaJson
        );
    }
    else {
        loader('hide');
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function on_eliminarJson71C(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        CON850(_evaluarCON850);
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

// NOVEDAD //
function _evaluarCON850(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    console.debug(novedad)
    $_NovedSer71C = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarDato71C();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer71C').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarDato71C() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {
            var codigo_71C = $('#codigo_71C').val();
            $_COD71C = codigo_71C

            var busquedaArray = buscarDescrip_71C(codigo_71C)
            switch (codigo_71C) {
                case codigo_71C.trim().length == 0:
                    CON851('03', '03', null, 'error', 'error');
                    _validarDato71C()
                    break;
                default:
                    switch (parseInt($_NovedSer71C)) {
                        case 7:
                            if (!busquedaArray) {
                                detalle71C()
                            } else {
                                CON851('00', '00', null, 'error', 'error');
                                _validarDato71C()
                            }
                            break;
                        case 8:
                        case 9:
                            if (!busquedaArray) {
                                CON851('01', '01', null, 'error', 'error');
                                _validarDato71C()
                            } else {
                                _llenaGrpcap71C(busquedaArray)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function _llenaGrpcap71C(data) {
    $('#codigo_71C').val(data.CODIGO.trim());
    $('#descripGrcp71C').val(data.DESCRIP.trim());
    $('#proced71C').val(data.PROCED.trim());
    $('#laborat71C').val(data.LABORAT.trim());
    $('#imagen71C').val(data.IMAGEN.trim());
    $('#otroServ71C').val(data.OTRS_SER.trim());
    $('#consulta71C').val(data.CONSULT.trim());
    $('#patolog71C').val(data.PATOLG.trim());
    $('#promyprev71C').val(data.PROMYPREV);
    $('#medicam71C').val(data.MEDICM);

    switch (parseInt($_NovedSer71C)) {
        case 8:
            detalle71C()
            break;
        case 9:
            CON851P('54', _validarDato71C, _eliminaDatos71C)
            break;
    }
}


// ELIMINAR REGISTRO
function _eliminaDatos71C() {
    var codgSer71C = cerosIzq($_COD71C, 2)

    LLAMADO_DLL({
        dato: [$_NovedSer71C, codgSer71C],
        callback: _elimRegst71C, 
        // function (data) { validarResp_71C(data, codgSer71C) },
        nombredll: 'SAL71C-02',
        carpeta: 'SALUD'
    })
}



function _elimRegst71C(data) {
    _inputControl('reset');
    _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        var mensaje
        switch (parseInt($_NovedSer71C)) {
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
function detalle71C() {
    validarInputs(
        {
            form: '#detalle',
            orden: '1'
        },
        function () { _validarDato71C(); },
        function () { proced71c() }
    )
}

function proced71c() {
    validarInputs(
        {
            form: '#procedm',
            orden: '1'
        },
        function () { detalle71C(); },
        function () { laborat71c() }
    )
}

function laborat71c() {
    validarInputs(
        {
            form: '#laborat',
            orden: '1'
        },
        function () { proced71c(); },
        function () { imagen71c() }
    )
}

function imagen71c() {
    validarInputs(
        {
            form: '#imagenol',
            orden: '1'
        },
        function () { laborat71c(); },
        function () { servicio71c() }
    )
}

function servicio71c() {
    validarInputs(
        {
            form: '#servic',
            orden: '1'
        },
        function () { imagen71c(); },
        function () { consulta71c() }
    )
}

function consulta71c() {
    validarInputs(
        {
            form: '#consulta',
            orden: '1'
        },
        function () { servicio71c(); },
        function () { patologia71c() }
    )
}

function patologia71c() {
    validarInputs(
        {
            form: '#patologia',
            orden: '1'
        },
        function () { consulta71c(); },
        function () { promyprev71c() }
    )
}


function promyprev71c() {
    validarInputs(
        {
            form: '#promyprev',
            orden: '1'
        },
        function () { patologia71c(); },
        function () { medicament71c() }
    )
}


function medicament71c() {
    validarInputs(
        {
            form: '#medicamn',
            orden: '1'
        },
        function () { promyprev71c(); },
        function () { envioDatSer71C() }
    )
}


function envioDatSer71C() {
    var novd71C = $_NovedSer71C
    var codg71C = $_COD71C
    var desc71C = espaciosDer($('#descripGrcp71C').val(), 25)
    var procedm71C = espaciosDer($('#proced71C').val(), 1)
    var laborat71C = espaciosDer($('#laborat71C').val(), 1)
    var imagen71C = espaciosDer($('#imagen71C').val(), 1)
    var servicios71C = espaciosDer($('#otroServ71C').val(), 1)
    var consulta71C = espaciosDer($('#consulta71C').val(), 1)
    var patologia71C = espaciosDer($('#patolog71C').val(), 1)
    var pyp71C = espaciosDer($('#promyprev71C').val(), 1)
    var medicamn71C = espaciosDer($('#medicam71C').val(), 1)

    LLAMADO_DLL({
        dato: [novd71C, codg71C, desc71C, procedm71C, laborat71C, imagen71C, servicios71C, consulta71C, patologia71C, pyp71C, medicamn71C],
        callback: _elimnDatos71C,
        nombredll: 'SAL71C-02',
        carpeta: 'SALUD'
    })
}


function _elimnDatos71C(data) {
    _inputControl('reset');
    _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        var mensaje
        switch (parseInt($_NovedSer71C)) {
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



// function envioDatSer71C() {
//     var novd71C = $_NovedSer71C
//     var codg71C = $_COD71C
//     var desc71C = espaciosDer($('#descripGrcp71C').val(), 25)
//     var procedm71C = espaciosDer($('#proced71C').val(), 1)
//     var laborat71C = espaciosDer($('#laborat71C').val(), 1)
//     var imagen71C = espaciosDer($('#imagen71C').val(), 1)
//     var servicios71C = espaciosDer($('#otroServ71C').val(), 1)
//     var consulta71C = espaciosDer($('#consulta71C').val(), 1)
//     var patologia71C = espaciosDer($('#patolog71C').val(), 1)
//     var pyp71C = espaciosDer($('#promyprev71C').val(), 1)
//     var medicamn71C = espaciosDer($('#medicam71C').val(), 1)


//     LLAMADO_DLL({
//         dato: [novd71C, codg71C, desc71C, procedm71C, laborat71C, imagen71C, servicios71C, consulta71C, patologia71C, pyp71C, medicamn71C],
//         callback: function (data) {
//             validarResp_71C(data, codg71C, desc71C, procedm71C, laborat71C, imagen71C, servicios71C, consulta71C, patologia71C, pyp71C, medicamn71C)
//         },
//         nombredll: 'SAL71C-02',
//         carpeta: 'SALUD'
//     })
// }


// function validarResp_71C(data, codg71C, desc71C, procedm71C, laborat71C, imagen71C, servicios71C, consulta71C, patologia71C, pyp71C, medicamn71C) {
//     loader('hide');
//     var rdll = data.split('|');
//     console.log(rdll[0])
//     if (rdll[0].trim() == '00') {
//         switch (parseInt($_NovedSer71C)) {
//             case 7:
//                 _consultaSql({
//                     sql: `INSERT INTO sc_grupocap VALUES ('${codg71C}', '${desc71C}');`,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCajas71C();
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO EL DATO' },
//                                     function () {
//                                         limpiarCajas71C();
//                                     });
//                             }
//                         }
//                     }
//                 })
//                 break;
//             case 8:
//                 var TABLASQ = `UPDATE sc_gruposer SET descripcion='${desc71C}' WHERE codigo = '${codg71C}' `;
//                 _consultaSql({
//                     sql: TABLASQ,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             console.log(results)
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO MODIFICADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCajas71C()
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR MODIFICANDO EL DATO' },
//                                     function () {
//                                         limpiarCajas71C();
//                                     });
//                             }
//                         }
//                     }
//                 })
//                 break;
//             case 9:
//                 _consultaSql({
//                     sql: `DELETE FROM sc_grupocap WHERE codigo = '${codg71C}'`,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             console.log(results)
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO ELIMINADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCajas71C()
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR ELIMINANDO EL DATO' },
//                                     function () {
//                                         limpiarCajas71C()
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

// function limpiarCajas71C() {
//     _toggleNav();
//     _inputControl('reset');
//     _inputControl('disabled');

// }

// FUNCIONES PARA DATOS NUEVOS
function buscarDescrip_71C(data) {
    var retornar = false;
    console.debug(data)
    for (var i in arraygrucap) {
        if (arraygrucap[i].CODIGO == data) {
            retornar = arraygrucap[i];
            break;
        }
    }
    return retornar;
}
