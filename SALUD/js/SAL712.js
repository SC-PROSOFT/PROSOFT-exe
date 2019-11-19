/* NOMBRE RM --> SER106 // NOMBRE ELECTR --> SAL712 */

var $_NovedSer712, arraytarifas;

$(document).ready(function () {

    _toggleF8([
        { input: 'codigo', app: '712', funct: _ventanaGrptar }
    ]);

    $_ADMINW = localStorage.cod_oper ? localStorage.cod_oper : false;

    nombreTarf712();

});


// --> F8 NOMBRE-TAR //
function _ventanaGrptar(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA NOMBRE DE TARIFAS",
            columnas: ["COD", "DESCRIP"],
            data: arraytarifas,
            callback_esc: function () {
                _validarDato712()
            },
            callback: function (data) {
                console.debug(data);
                $('#codigo_712').val(data.COD.trim())
                $('#descripSer712').val(data.DESCRIP.trim())
                _enterInput('#codigo_712');
            }
        });
    }
}

// llamado DLL NOM-TARIF
function nombreTarf712() {
    data = [];
    data.nombreFd = "NOM-TAR";
    data.busqueda = '';
    obtenerDatosCompletos(data, function (data) {
        arraytarifas = data.NOMTAR;
    });
    CON850(_evaluarCON850);
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
            var codigo712= $('#codigo_712').val();
            var busquedaArray = buscarDescp712(codigo712)
            console.log("res",busquedaArray)

            $_CODIGOTARF712 = codigo712

            switch (codigo712) {

                case codigo712.trim().length == 0:
                    CON851('14', '14', null, 'error', 'error');
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
                                _datosSer712(busquedaArray)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}


function _datosSer712(data) {
    $('#codigo_712').val(data.COD);
    $('#descripSer712').val(data.DESCRIP);

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
    var URL = get_url("APP/SALUD/SAL712-02.DLL");
    var data = $_NovedSer712 + "|" + $_CODIGOTARF712;
    postData({
        datosh: datosEnvio() + data
    }, URL)
        .then(() => {
            //TOAST CORRECTO
            var msj
            switch ($_NovedSer712) {
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
    var desc712 = espaciosDer($('#descripSer712').val(), 25)

    var URL = get_url("APP/SALUD/SAL712-02.DLL");
    var data = $_NovedSer712 + "|" + $_CODIGOTARF712 + "|" + desc712;
    console.debug(data);
    postData({
        datosh: datosEnvio() + data
    }, URL)
        .then(() => {
            //TOAST CORRECTO
            var msj
            switch ($_NovedSer712) {
                case '7':
                    msj = 'Creado correctamente'
                    break;
                case '8':
                    msj = 'Modificado correctamente'
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


// FUNCIONES PARA DATOS NUEVOS
function buscarDescp712(data) {
    var retornar = false;
    for (var i in arraytarifas) {
        if (arraytarifas[i].COD.trim() == data) {
            retornar = arraytarifas[i];
            break;
        }
    }
    return retornar;
}
