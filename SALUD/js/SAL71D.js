/* NOMBRE RM --> SER11A // NOMBRE ELECTR --> SAL71D */

var $_NovedSer71D, arraycoleg, $_fechaact, $arrayprofes;

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
            tablaSql: 'sc_coleg',
            callback_esc: function () {
                _validarColeg71D()
            },
            callback: function (data) {
                console.debug(data);
                var coleg71D = data.codigo.trim();
                $('#tipo_71D').val(coleg71D.substring(0, 1));
                $('#ciudad_71D').val(coleg71D.substring(1, 6));
                $('#codigo_71D').val(coleg71D.substring(6, 12));
                $('#ciudcoleg_71D').val(data.ciudad);
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
            tablaSql: 'sc_archciud',
            callback_esc: function () {
                _validarColeg71D
            },
            callback: function (data) {
                console.debug(data);
                $('#codciud_71D').val(data.codigo);
                $('#ciudad_71D').val(data.ciudad);
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

            var tipo71D = $('#tipo_71D').val();
            var ciud71D = $('#ciudad_71D').val();
            var codg71D = $('#codigo_71D').val();

            $colegio71D = tipo71D + ciud71D + codg71D;

            let datos_envio = datosEnvio()
            datos_envio += '|'
            datos_envio += $colegio71D
            SolicitarDll({ datosh: datos_envio }, on_datosColeg71D, get_url('/SALUD/APP/SAL71D-01.DLL'));
        }
    )
}

function on_datosColeg71D(data) {
    console.debug(data);

    var date = data.split('|');
    $_CODCOLEG = date[2].trim();
    $_NOMBCOLEG = date[3].trim();
    $_NUCLEOCOLEG = date[4].trim();
    $_CODCIUDCOLEG = date[5].trim();
    $_ZONACOLEG = date[6].trim();
    $_DIRECCOLEG = date[7].trim();
    $_TELFNCOLEG = date[8].trim();
    $_CODCIUDAD = date[9].trim();
    $_CIUDAD = date[10].trim();

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
    var colg71D = $_CODCOLEG;
    console.debug($_TELFNCOLEG); 
    $('#tipo_71D').val(colg71D.substring(0, 1));
    $('#ciudad_71D').val(colg71D.substring(1, 6));
    $('#codigo_71D').val(colg71D.substring(6, 12));
    $('#ciudcoleg_71D').val($_CIUDAD);
    $('#descrip71D').val($_NOMBCOLEG)
    $('#nucleo71D').val($_NUCLEOCOLEG)
    $('#codciud_71D').val($_CODCIUDAD);
    $('#ciudad71D').val($_CIUDAD)
    $('#zona71D').val($_ZONACOLEG);
    $('#direcc71D').val($_DIRECCOLEG);
    $('#telefono71D').val($_TELFNCOLEG);

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

    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_NovedSer71D
    datos_envio += '|'
    datos_envio += $colegio71D

    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, validarElim71D, get_url('/SALUD/APP/SAL71D-02.DLL'));
}

function validarElim71D(data) {
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


/// NOVEDAD 7 ///
function descrp71D() {
    validarInputs(
        {
            form: '#descrp',
            orden: '1'
        },
        function () { _validarColeg71D(); },
        function () { validarNucleo71D() }
    )
}

function validarNucleo71D() {
    validarInputs(
        {
            form: '#nucleo',
            orden: '1'
        },
        function () { descrp71D(); },
        function () { validarCiud71D(); }
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
    var datoszona = '[{"codigo": "1","descripcion": "Urbana"},{"codigo": "2", "descripcion": "Rural"}]';
    var datozona = JSON.parse(datoszona);
    POPUP({
        array: datozona,
        titulo: 'ZONA'
    },
        _evaluardatozona
    );
}

function _evaluardatozona(data) {
    $_ZONA = data.id
    switch (parseInt(data.id)) {
        case 1:
        case 2:
            validarDirecc71D();
            break;
        default:
            validarCiud71D();
            break;
    }
    $('#zona71D').val(data.id + '-' + data.descripcion);
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
            $TELFONO =  $('#telefono71D').val();
            envioDatos71D(); }
    )
}


function envioDatos71D() {
    
    var decrpcolg = espaciosDer($('#descrip71D').val(), 50);
    var nucleoclg = cerosIzq($('#nucleo71D').val(), 10);
    var codciud = cerosIzq($('#codciud_71D').val(), 5);
    var direcclg = espaciosDer($('#direcc71D').val(), 30);
    var telfclg = cerosIzq($TELFONO, 10);

    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_NovedSer71D
    datos_envio += '|'
    datos_envio += $colegio71D
    datos_envio += '|'
    datos_envio += decrpcolg
    datos_envio += '|'
    datos_envio += nucleoclg
    datos_envio += '|'
    datos_envio += codciud
    datos_envio += '|'
    datos_envio += $_ZONA
    datos_envio += '|'
    datos_envio += direcclg
    datos_envio += '|'
    datos_envio += telfclg

    console.debug(datos_envio + '  DATOS ENVIADOS' );
    SolicitarDll({ datosh: datos_envio }, _guardarDatos71D, get_url('/APP/SALUD/SAL71D-02.DLL'));

}


function _guardarDatos71D(data) {
    _inputControl('reset');
    _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        var mensaje
        switch (parseInt($_NovedSer71D)) {
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


// function envioDatos71D() {
//     var tipocol = cerosIzq($('#tipo_71D').val(), 1);
//     var ciudcol = cerosIzq($('#ciudad_71D').val(), 5);
//     var codgcol = cerosIzq($('#codigo_71D').val(), 6);

//     var colegio = tipocol + ciudcol + codgcol;

//     var decrpcolg = espaciosDer($('#descrip71D').val(), 50);
//     var nucleoclg = cerosIzq($('#nucleo71D').val(), 10);
//     var codciud = cerosIzq($('#codciud_71D').val(), 5);
//     var zonaclg = $_ZONA.substring(0, 1);
//     var direcclg = espaciosDer($('#direcc71D').val(), 30);
//     var telfclg = cerosIzq($('#telefono71D').val(), 10);  


//     LLAMADO_DLL({
//         dato: [$_NovedSer71D, colegio, decrpcolg, nucleoclg, codciud, zonaclg, direcclg, telfclg],
//         callback: function (data) {
//             validarResp_71D(data, colegio, decrpcolg, nucleoclg, codciud, zonaclg, direcclg, telfclg)
//         },
//         nombredll: 'SAL71D-02',
//         carpeta: 'SALUD'
//     })
// }

// function validarResp_71D(data, colegio, decrpcolg, nucleoclg, codciud, zonaclg, direcclg, telfclg) {
//     loader('hide');
//     var rdll = data.split('|');
//     console.log(rdll[0])
//     if (rdll[0].trim() == '00') {
//         switch (parseInt($_NovedSer71D)) {
//             case 7:
//                 _consultaSql({
//                     sql: `INSERT INTO sc_coleg VALUES ('${colegio}', '${decrpcolg}');`,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCampos71D();
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR CREANDO EL DATO' },
//                                     function () {
//                                         limpiarCampos71D();
//                                     });
//                             }
//                         }
//                     }
//                 })
//                 break;
//             case 8:
//                 _consultaSql({
//                     sql: `UPDATE sc_coleg SET descripcion='${decrpcolg}' WHERE codigo = '${colegio}' `,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             console.log(results)
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO MODIFICADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCampos71D()
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR MODIFICANDO EL DATO' },
//                                     function () {
//                                         limpiarCampos71D();
//                                     });
//                             }
//                         }
//                     }
//                 })
//                 break;
//             case 9:
//                 _consultaSql({
//                     sql: `DELETE FROM sc_coleg WHERE codigo = '${colegio}'`,
//                     callback: function (error, results, fields) {
//                         if (error) throw error;
//                         else {
//                             console.log(results)
//                             if (results.affectedRows > 0) {
//                                 jAlert({ titulo: 'Notificacion', mensaje: 'DATO ELIMINADO CORRECTAMENTE' },
//                                     function () {
//                                         limpiarCampos71D()
//                                     });
//                             } else {
//                                 jAlert({ titulo: 'ERROR', mensaje: 'HA OCURRIDO UN ERROR ELIMINANDO EL DATO' },
//                                     function () {
//                                         limpiarCampos71D()
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

// function limpiarCampos71D() {
//     _toggleNav();
//     _inputControl('reset');
//     _inputControl('disabled');

// }