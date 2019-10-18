/* NOMBRE RM --> SER11A // NOMBRE ELECTR --> SAL71D */

var $_NovedSer71D, arraycoleg, $_fechaact, $arrayprofes, $CIUDCOLG71D;

$(document).ready(function () {

    _toggleF8([
        { input: 'tipo', app: '71D', funct: _ventanColeg },
        { input: 'ciudad', app: '71D', funct: _ventanColeg },
        { input: 'codigo', app: '71D', funct: _ventanColeg },
        { input: 'codciud', app: '71D', funct: _ventanCiudad }
    ]);
    loader('hide');
    CON850(_evaluarCON850);
});

// --> F8 COLEGIOS //
function _ventanColeg(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE INSTITUCIONES",
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_coleg',
            callback_esc: function () {
                _validarColeg71D()
            },
            callback: function (data) {
                console.debug(data);
                $colegC71D = data.cod_coleg;
                $('#tipo_71D').val(data.tipo_coleg);
                $('#ciudad_71D').val($colegC71D.substring(0, 5));
                $('#codigo_71D').val($colegC71D.substring(5, 11));
                $('#ciudcoleg_71D').val(data.ciudad_coleg);
                _enterInput('#tipo_71D');
            }
        });
    }
}

function _ventanCiudad(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA CIUDADES",
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_archciud',
            callback_esc: function () {
                _validarColeg71D
            },
            callback: function (data) {
                console.debug(data);
                $CIUDCOLG71D = data.nombre.trim()
                $('#codciud_71D').val(data.cuenta);
                $('#ciudad71D').val($CIUDCOLG71D);
                $('#ciudcoleg_71D').val($CIUDCOLG71D);

                _enterInput('#codciud_71D');
            }
        });
    }
}


// NOVEDAD //
function _evaluarCON850(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    console.debug(novedad)
    $_NovedSer71D = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarColeg71D();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer71D').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarColeg71D() {
    validarInputs(
        {
            form: "#colegio",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {

            $tipo71D = $('#tipo_71D').val();
            $ciud71D = $('#ciudad_71D').val();
            $codg71D = $('#codigo_71D').val();

            $colegio71D = $tipo71D + $ciud71D + $codg71D;



            let datos_envio = datosEnvio()
            datos_envio += '|'
            datos_envio += $colegio71D
            SolicitarDll({ datosh: datos_envio }, on_datosColeg71D, get_url('/APP/SALUD/SAL71D-01.DLL'));
        }
    )
}

function on_datosColeg71D(data) {
    console.debug(data);

    var date = data.split('|');
    $_CODCOLEG71D = date[2].trim();
    $_NOMBCOLEG71D = date[3].trim();
    $_NUCLEOCOLEG71D = date[4].trim();
    $_ZONACOLEG71D = date[5].trim();
    $_DIRECCOLEG71D = date[6].trim();
    $_CODCIUDAD71D = date[7].trim();
    $_CIUDAD71D = date[8].trim();
    $_TELFNCOLEG71D = date[9].trim();

    if (date[0].trim() == '00') {
        if ($_NovedSer71D == '7') {
            CON851('00', '00', null, 'error', 'Error');
            _validarColeg71D()
        }
        else {
            _llenarDatos71D()
        }
    }
    else if (date[0].trim() == '01') {
        if ($_NovedSer71D == '7') {
            descrp71D();
        }
        else {
            CON851('01', '01', null, 'error', 'Error');
            _validarColeg71D();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}



function _llenarDatos71D() {
    var colg71D = $_CODCOLEG71D
    console.debug($_TELFNCOLEG71D + 'TELEFONO DLL');
    $('#tipo_71D').val(colg71D.substring(0, 1));
    $('#ciudad_71D').val(colg71D.substring(1, 6));
    $('#codigo_71D').val(colg71D.substring(6, 12));
    $('#ciudcoleg_71D').val($_CODCIUDAD71D);
    $('#descrip71D').val($_NOMBCOLEG71D)
    $('#nucleo71D').val($_NUCLEOCOLEG71D)
    $('#codciud_71D').val($_CODCIUDAD71D);
    $('#ciudad71D').val($_CIUDAD71D)
    $('#zona71D').val($_ZONACOLEG71D);
    $('#direcc71D').val($_DIRECCOLEG71D);
    $('#telefono71D').val($_TELFNCOLEG71D);

    switch (parseInt($_NovedSer71D)) {
        case 8:
            descrp71D()
            break;
        case 9:
            CON851P('54', _validarColeg71D, _eliminaDatos71D)
            break;
    }
}

// ELIMINAR REGISTRO
function _eliminaDatos71D() {

    LLAMADO_DLL({
        dato: [$_NovedSer71D, $colegio71D],
        callback: function (data) {
            validarResp_71D(data, $colegio71D)
        },
        nombredll: 'SAL71D-02',
        carpeta: 'SALUD'
    })
}

/// NOVEDAD 7 ///
function descrp71D() {
    validarInputs(
        {
            form: '#descrp',
            orden: '1'
        },
        function () { _validarColeg71D(); },
        function () {
            setTimeout(validarNucleo71D, 300)
        }
    )
}

function validarNucleo71D() {
    validarInputs(
        {
            form: '#nucleo',
            orden: '1'
        },
        function () { descrp71D(); },
        function () {
            setTimeout(validarCiud71D, 300)
        }
    )
}



function validarCiud71D() {
    validarInputs(
        {
            form: '#ciudad',
            orden: '1'
        },
        function () { validarNucleo71D(); },
        function () { validarZonad71D() }
    )
}

function validarZonad71D() {

    var datoZona = [
        { "COD": "1", "DESCRIP": "Urbana" },
        { "COD": "2", "DESCRIP": "Rural" }
    ]

    POPUP({
        array: datoZona,
        titulo: 'Zona',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: validarCiud71D
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
                $('#zona71D').val(data.COD.trim() + '. ' + data.DESCRIP.trim())
                $_ZONA = data.COD.trim()
                validarDirecc71D();
                break;
        }
    })
}

function validarDirecc71D() {
    validarInputs(
        {
            form: '#direccion',
            orden: '1'
        },
        function () { validarCiud71D(); },
        function () { validarTelf71D(); }
    )
}

function validarTelf71D() {
    validarInputs(
        {
            form: '#telfon',
            orden: '1'
        },
        function () { validarDirecc71D(); },
        function () {
            $TELFONO = $('#telefono71D').val();
            setTimeout(envioDatos71D, 300);
        }
    )
}


function envioDatos71D() {

    var decrpcolg = espaciosDer($('#descrip71D').val(), 50);
    var nucleoclg = cerosIzq($('#nucleo71D').val(), 10);
    var codciud = cerosIzq($('#codciud_71D').val(), 5);
    var direcclg = espaciosDer($('#direcc71D').val(), 30);
    var telfclg = cerosIzq($TELFONO, 10);

    $codCiud71D = + $ciud71D + $codg71D;

    LLAMADO_DLL({
        dato: [$_NovedSer71D, $colegio71D, decrpcolg, nucleoclg, codciud, $_ZONA, direcclg, telfclg],
        callback: function (data) {
            validarResp_71D(data, $tipo71D,  $codCiud71D, decrpcolg, $ciud71D)
        },
        nombredll: 'SAL71D-02',
        carpeta: 'SALUD'
    })
}

function validarResp_71D(data, $tipo71D,  $codCiud71D, decrpcolg, $ciud71D) {
    loader('hide');
    var rdll = data.split('|');
    console.log(rdll[0])
    if (rdll[0].trim() == '00') {
        switch (parseInt($_NovedSer71D)) {
            case 7:
                _consultaSql({
                    sql: `INSERT INTO sc_coleg VALUES ('${$tipo71D}', '${$codCiud71D}', '${decrpcolg}', '${$ciud71D}');`,
                    db: 'datos_pros',
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCampos71D();
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO EL DATO' },
                                    function () {
                                        limpiarCampos71D();
                                    });
                            }
                        }
                    }
                })
                break;
            case 8:
                var TABSQL = `UPDATE sc_coleg SET ciudad_coleg ='${$codg71D}' descrip_coleg ='${decrpcolg}' WHERE tipo_coleg= '${$tipo71D}' cod_coleg = '${$codCiud71D}' `
                _consultaSql({
                    sql: TABSQL,
                    db: 'datos_pros',
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO MODIFICADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCampos71D()
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR MODIFICANDO EL DATO' },
                                    function () {
                                        limpiarCampos71D();
                                    });
                            }
                        }
                    }
                })
                break;
            case 9:
                _consultaSql({
                    sql: `DELETE FROM sc_coleg WHERE tipo_coleg= '${$tipo71D}' SET cod_coleg = '${$codCiud71D}' `,
                    db: 'datos_pros',
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            console.log(results)
                            if (results.affectedRows > 0) {
                                jAlert({ titulo: 'Notificacion', mensaje: 'DATO ELIMINADO CORRECTAMENTE' },
                                    function () {
                                        limpiarCampos71D()
                                    });
                            } else {
                                jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR ELIMINANDO EL DATO' },
                                    function () {
                                        limpiarCampos71D()
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

function limpiarCampos71D() {
    _toggleNav();
    _inputControl('reset');
    _inputControl('disabled');

}