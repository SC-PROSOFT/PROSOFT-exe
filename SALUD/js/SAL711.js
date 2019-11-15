/* NOMBRE RM --> SER101 // NOMBRE ELECTR --> SAL711 */

var $_NovedSer711, arraygrpser, arraycontab;

$(document).ready(function () {


    _toggleF8([
        { input: 'codigo', app: '711', funct: _ventanaGrupo },
        { input: 'contab', app: '711', funct: _ventanaContab }

    ]);

    grupoServicio_711();
});


// F8 GRUPO-SERVICIO //
function _ventanaGrupo(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "GRUPOS DE SERVICIO",
            columnas: ["COD", "DESCRIP"],
            data: arraygrpser,
            callback_esc: function () {
                _validarConsulta711()
            },
            callback: function (data) {
                console.debug(data);
                $('#codigo_711').val(data.COD.trim())
                $('#descrip711').val(data.DESCRIP.trim())
                _enterInput('#codigo_711');
            }
        });
    }
}

// // F8 CUENTA-MAYOR //
function _ventanaContab(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA PLAN DE CUENTAS",
            columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "NOMBRE_MAE", "TIPO_MAE"],
            data: arraycontab,
            callback_esc: function () {
                conContab_711
            },
            callback: function (data) {
                console.debug(data);
                $('#contab_711').val(data.CTA_MAY.trim() + data.SUB_CTA.trim() + data.AUX_MAE.trim() + data.TIPO_MAE.trim())
                $('#descripContab_711').val(data.NOMBRE_MAE.trim())
                _enterInput('#contab_711');
            }
        });
    }
}

// llamado DLL GRUPO-SERVICIO
function grupoServicio_711() {
    obtenerDatosCompletos("GRUPO-SER", function (data) {
        arraygrpser = data.CODIGOS;
        ctaMayor_711()
    });
    console.log(arraygrpser)

}

// Llamado DLL CUENTA-MAYOR
function ctaMayor_711() {
    obtenerDatosCompletos("CTA-MAYOR", function (data) {
        arraycontab = data.MAESTROS;
        arraycontab.pop();

    });
    CON850(_evaluarCON850);
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
    validarInputs({
        form: "#consulta",
        orden: '1'
    },
        function () {
            CON850(_evaluarCON850);
        },
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
            CON851P('54', _validarConsulta711, eliminar711)
            break;
    }
}

function eliminar711(){
    var URL = get_url("APP/SALUD/SAL711-02.DLL");
    var data = $_NovedSer711 + "|" + $CODG711;
    postData({
        datosh: datosEnvio()  + data
    }, URL)
        .then(() => {
            //TOAST CORRECTO
            var msj
            switch ($_NovedSer711) {
                case '9':
                    msj = 'Eliminado correctamente'
                    break;
            }
            jAlert({
                titulo: 'Notificacion',
                mensaje: msj
            },
                function () {
                    _toggleNav();
                    console.log('fin del programa')
                });
        })
        .catch((error) => {
            console.log(error)
        });
}

/// NOVEDAD 7 ////
function detalle711() {
    validarInputs({
        form: '#detalle',
        orden: '1'
    },
        function () {
            _validarConsulta711();
        },
        function () {
            validarPorcen_711('1')
        }
    )
}

function validarPorcen_711(orden) {
    validarInputs({
        form: '#porcentajes',
        orden: orden
    },
        function () {
            detalle711();
        },
        function () {
            var otro = $('#ingre_clin711').val()
            var tercero = $('#ingr_terc711').val()

            console.log(tercero)
            if (parseFloat(tercero).length > 0) {
                if (tercero + otro < 100) {
                    if ($('#contab_711').val().trim().length == 0) {
                        $('#contab_711').val('2815')
                        console.log(tercero + ' 1214')
                    }
                    console.log(tercero + '  455')
                    conContab_711()
                }
            } else if (parseFloat(tercero) == '') {
                console.log(tercero + '  64515')
                conContab_711()
            } else {
                conContab_711()
                console.log(tercero + ' dsgsfg')
            }
        }
    )
}

function conContab_711() {
    validarInputs({
        form: '#contables',
        orden: '1'
    },
        function () {
            validarPorcen_711('2');
        },
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
    var descp711 = espaciosDer($('#descrip711').val(), 25);
    var ingre711 = cerosIzq($('#ingre_clin711').val(), 3);
    var terce711 = cerosIzq($('#ingr_terc711').val(), 4);
    var contab_711 = cerosIzq($('#contab_711').val(), 11);

    var URL = get_url("APP/SALUD/SAL711-02.DLL");
    var data = $_NovedSer711 + "|" + $CODG711 + "|" + descp711 + "|" + ingre711 + "|" + terce711 + "|" + contab_711;
    postData({
        datosh: datosEnvio()  + data
    }, URL)
        .then(() => {
            //TOAST CORRECTO
            var msj
            switch ($_NovedSer711) {
                case '7':
                    msj = 'Creado correctamente'
                    break;
                case '8':
                    msj = 'Modificado correctamente'
                    break;
                case '9':
                    msj = 'Eliminado correctamente'
                    break;
            }
            jAlert({
                titulo: 'Notificacion',
                mensaje: msj
            },
                function () {
                    _toggleNav();
                    console.log('fin del programa')
                });
        })
        .catch((error) => {
            console.log(error)
        });
}


// function guardaDatos711(data) {
//     console.debug(data)
//     loader('hide');
//     var rdll = data.split('|');

//     if (rdll[0].trim() == '00') {
//         var msj
//         switch ($_NovedSer711) {
//             case '7':
//                 msj = 'Creado correctamente'
//                 break;
//             case '8':
//                 msj = 'Modificado correctamente'
//                 break;
//             case '9':
//                 msj = 'Eliminado correctamente'
//                 break;
//         }
//         jAlert({
//             titulo: 'Notificacion',
//             mensaje: msj
//         },
//             function () {
//                 _toggleNav();
//                 console.log('fin del programa')
//             });
//     } else {
//         CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
//     }
// }

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