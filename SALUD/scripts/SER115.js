var valor71G_Mask = new IMask(document.getElementById('valor_71G'),
    { mask: Number, min: 0, max: 99999999999, thousandsSeparator: ',', padFractionalZeros: true }
);
var cantidadart71G_Mask = new IMask(document.getElementById('cantidad_71G'),
    { mask: Number, min: 1, max: 999, padFractionalZeros: false });

var $_GRUPO_71G = [];
var $_TARIFAS_71G = [];
var $_CUPS_71G = [];
var $_ART_71G = [];
var SAL71G = [];
var filtroarticulos = [];

var $_descripgrupo71G, $descrip71G, $convenio71G, $grupos71G, $codigocups71, $llavecod71G, $llavepaquete, $observaciones71G,
    $valor71G, $tabla_paq;

$(document).ready(function () {
    $('.page-content-fixed-header').append('<ul class="page-breadcrumb">' +
        '<li>' +
        '<a href="#" id="nombreOpcion">9,3,1 - Actualiza maestro paquete integrales </a>' +
        '</li>' +
        '</ul>')
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;

    _toggleF8([
        { input: 'convenio', app: '71G', funct: _ventanatarifas71G },
        { input: 'grupos', app: '71G', funct: _ventanagruposer71G },
        { input: 'cups', app: '71G', funct: _ventanacups71G },
        { input: 'codigo', app: '71G', funct: _ventanaarticulos71G }

    ]);

    obtenerDatosCompletos({
        nombreFd: 'TARIFAS'
    }, function (data) {
        $_TARIFAS_71G = data.TARIFAS;
        $_TARIFAS_71G.pop()
        obtenerDatosCompletos({
            nombreFd: 'GRUPO-SER'
        }, function (data) {
            $_GRUPO_71G = data.CODIGOS;
            $_GRUPO_71G.pop()
            obtenerDatosCompletos({
                nombreFd: 'CUPS'
            }, function (data) {
                $_CUPS_71G = data.CODIGOS;
                $_CUPS_71G.pop()
                obtenerDatosCompletos({
                    nombreFd: 'ARTICULOS'
                }, function (data) {
                    $_ART_71G = data.ARTICULOS;
                    CON850(_evaluarCON850);
                }, 'OFF')
            })
        })
    }, 'ON')
});

function _ventanatarifas71G(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONVENIOS",
            columnas: ["COD", "DESCRIP"],
            data: $_TARIFAS_71G,
            callback_esc: function () {
                $("#convenio_71G").focus();
            },
            callback: function (data) {
                $('#convenio_71G').val(data.COD.trim())
                // $('#descrgrp_103').val(data.DESCRIP.trim())
                _enterInput('#convenio_71G');
            }
        });
    }
}

function _ventanagruposer71G(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE GRUPOS DE SERVICIOS",
            columnas: ["COD", "DESCRIP"],
            data: $_GRUPO_71G,
            callback_esc: function () {
                $("#grupos_71G").focus();
            },
            callback: function (data) {
                $('#grupos_71G').val(data.COD.trim())
                // $('#descrgrp_103').val(data.DESCRIP.trim())
                _enterInput('#grupos_71G');
            }
        });
    }
}
function _ventanacups71G(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CODIGOS CUPS",
            columnas: ["LLAVE", "DESCRIP"],
            data: $_CUPS_71G,
            callback_esc: function () {
                $("#cups_71G").focus();
            },
            callback: function (data) {
                $_LLAVECUPS = data.LLAVE.trim()
                $GRUPO_71G = $_LLAVECUPS.substring(0, 2);
                $CUPS_71G = $_LLAVECUPS.substring(2, 12);
                $('#cups_71G').val($CUPS_71G)
                _enterInput('#cups_71G');
            }
        });
    }
}
function _ventanacodcups71G(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CODIGOS CUPS",
            columnas: ["LLAVE", "DESCRIP"],
            data: $_CUPS_71G,
            callback_esc: function () {
                $("#cups_71G").focus();
            },
            callback: function (data) {
                $_LLAVECUPS = data.LLAVE.trim()
                $GRUPO_71G = $_LLAVECUPS.substring(0, 2);
                $CUPS_71G = $_LLAVECUPS.substring(2, 12);
                $('#codigo_71G').val($_LLAVECUPS)
                _enterInput('#codigo_71G');
            }
        });
    }
}
function _ventanaarticulos71G(e) {
    $_TIPOART = 0;
    filtroarticulos = $_ART_71G.filter(clase => (clase.LLAVE_ART.substring(0, 1) == $_TIPOART))

    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite_v2({
            titulo: 'BUSQUEDA DE ARTICULOS',
            data: filtroarticulos,
            indice: ['LLAVE_ART', 'DESCRIP_ART'],
            mascara: [
                {
                    'LLAVE_ART': 'Codigo',
                    'DESCRIP_ART': 'Descripcion'
                }],
            minLength: 3,
            callback_esc: function () {
                $('#codigo_71G').focus();
            },
            callback: function (data) {
                $_LLAVENROART = data.LLAVE_ART.trim();
                $_TIPOARTW = $_LLAVENROART.substring(0, 1);
                $_GRUPOARTW = $_LLAVENROART.substring(1, 3);
                $_NUMEROARTW = $_LLAVENROART.substring(3, 16);

                $('#codigo_71G').val($_LLAVENROART);
                // $('#descripcod_71G').val(data.DESCRIP_ART.trim());
                _enterInput('#codigo_71G');
            }
        });
    }
}


// NOVEDAD //
function _evaluarCON850(novedad) {
    $_Novedad71G = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            $clasepaquete71G = '1';
            _datoclase_71G();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedad_71G').val(novedad.id + ' - ' + novedad.descripcion)
}

function _datoclase_71G() {
    switch ($clasepaquete71G) {
        case "1":
            $('#tipo_71G').val("1- CIRUGIA");
            _evaluardatoconvenio_71G();
            break;
        case "2":
            $('#tipo_71G').val("2- LABORATORIOS");
            _evaluardatoconvenio_71G();
            break;
        case "3":
            $('#tipo_71G').val("3- IMAGENOLOGIA");
            _evaluardatoconvenio_71G();
            break;
        default:
            CON851('03', '03', null, 'error', 'Error');
            _datoclase_71G();
            break;
    }
}
function _evaluardatoconvenio_71G() {
    validarInputs({
        form: '#CONVENIO_71G',
        orden: '1'
    },
        function () {
            CON850(_evaluarCON850);
        },
        _validarconvenio_71G
    )
}
function _validarconvenio_71G() {
    $convenio71G = $('#convenio_71G').val();
    LLAMADO_DLL({
        dato: [$convenio71G],
        callback: _CONSULTARCONVENIO_71G,
        nombredll: 'SER108-06',
        carpeta: 'SALUD'
    });
}

function _CONSULTARCONVENIO_71G(data) {
    var date = data.split("|");
    var swinvalid = date[0].trim();
    $descrip71G = date[1].trim();
    if (swinvalid == "00") {
        $("#descripconv_71G").val($descrip71G);
        _evaluarcups_71G();

    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluardatoconvenio_71G();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarcups_71G() {
    validarInputs({
        form: '#GRUPO_71G',
        orden: '1'
    },
        function () {
            _evaluardatoconvenio_71G();
        },
        _validarcups_71G
    )
}
function _validarcups_71G() {
    $grupos71G = $('#grupos_71G').val();
    if ($grupos71G.trim() == '') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarcups_71G();
    } else {
        LLAMADO_DLL({
            dato: [$grupos71G],
            callback: _dataconsultacups_71G,
            nombredll: 'SER102-04',
            carpeta: 'SALUD'
        });

    }
}
function _dataconsultacups_71G(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_descripgrupo71G = date[1].trim();
    if (swinvalid == "00") {
        $('#descripcups_71G').val($_descripgrupo71G);
        _evaluargrupo_71G();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarcups_71G();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluargrupo_71G() {
    validarInputs({
        form: '#CUPS_71G',
        orden: '1'
    },
        function () { _evaluarcups_71G(); },
        _validargrupos_71G
    )
}
function _validargrupos_71G() {
    $codigocups71G = $('#cups_71G').val();

    if ($codigocups71G.trim() == '') {
        CON851('01', '01', null, 'error', 'error');
        _evaluargrupo_71G();
    } else {
        $llavecod71G = $grupos71G + $codigocups71G;
        LLAMADO_DLL({
            dato: [$llavecod71G],
            callback: _datavalidarcups_71G,
            nombredll: 'SER102-03',
            carpeta: 'SALUD'
        });
    }
}
function _datavalidarcups_71G(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_descripgrupo71G = date[1].trim();
    if (swinvalid == "00") {
        $('#descripcups_71G').val($_descripgrupo71G);
        _leerpaquete_71G();

    } else if (swinvalid == "01") {
        if ($_Novedad71G == '7') {
            CON851('01', '01', null, 'error', 'error');
            _evaluargrupo_71G();
        } else {
            $_descripgrupo71G = '**************';
            $('#descripcups_71G').val($_descripgrupo71G);
            _evaluardatoconvenio_71G();
        }


    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _leerpaquete_71G() {
    $llavepaquete = $convenio71G + $clasepaquete71G + $grupos71G + $codigocups71G;

    postData({
        datosh: datosEnvio() + $llavepaquete + '|'
    }, get_url("APP/SALUD/SER115-01.DLL"))
        .then((data) => {

            $_PAQINT = data['PAQINTEGRAL'];
            swinvalid = $_PAQINT[0].ESTADO;
            $observaciones71G = $_PAQINT[0].OBSERVACION;
            $valor71G = $_PAQINT[0].VALOR;
            $tabla_paq = $_PAQINT[0].TAB_PAQINT;

            if (($_Novedad71G == '7') && (swinvalid == '01')) {
                _evaluarobservacion_71G();

            } else if (($_Novedad71G == '7') && (swinvalid == '00')) {

                CON851('00', '00', null, 'error', 'Error');
                _evaluardatoconvenio_71G();
            } else if (($_Novedad71G == '8') && (swinvalid == '00')) {

                _llenardatos_71G();
            } else if (($_Novedad71G == '8') && (swinvalid == '01')) {

                CON851('01', '01', null, 'error', 'Error');
                _evaluardatoconvenio_71G();
            } else if (($_Novedad71G == '9') && (swinvalid == '00')) {

                _llenardatos_71G();
            } else if (($_Novedad71G == '9') && (swinvalid == '01')) {

                CON851('01', '01', null, 'error', 'Error');
                _evaluardatoconvenio_71G();
            }
        })
        .catch((error) => {
            console.log(error);
        });

}

function _evaluarobservacion_71G() {
    validarInputs({
        form: '#OSERV_71G',
        orden: '1'
    },
        function () { _evaluargrupo_71G(); },
        _evaluarvalor_71G
    )
}
function _evaluarvalor_71G() {
    $observaciones71G = $('#observ_71G').val();

    validarInputs({
        form: '#VALOR_71G',
        orden: '1'
    },
        function () { _evaluarobservacion_71G(); },
        _validarvalor_71G
    )
}
function _validarvalor_71G() {
    $valor71G = valor71G_Mask.unmaskedValue;

    if ($_Novedad71G == '7') {
        SAL71G.CONTEO = 1;
        $('#item_71G').val(SAL71G.CONTEO.toString().padStart(3, '0'));
        _evaluarcl_71G();
    } else {
        _evaluaritemtabla_71G();
    }
}

///////////////////////TABLA////////////////////
function _evaluaritemtabla_71G() {

    validarInputs({
        form: '#ITEM_71G',
        orden: '1'
    }, () => { _evaluaritemtabla_71G() },
        () => {
        
            SAL71G.CONTEO = itemMask_SAL71G.value;
            $('#item_71G').val(SAL71G.CONTEO.padStart(3, '0'));
            SAL71G.CONTEO = parseInt(SAL71G.CONTEO) - 1;
            let existeregisto_71G = validarexistenciareg_71G();
            if (!existeregisto_71G) {
                _evaluarcl_71G(); 
            } else {
                $('#cl_71G').val($('#TABLAPAQUETEINT_71G tbody tr')[SAL71G.CONTEO].cells[1].textContent);
                $('#cldescrip_71G').val($('#TABLAPAQUETEINT_71G tbody tr')[SAL71G.CONTEO].cells[2].textContent);
                $('#codigo_71G').val($('#TABLAPAQUETEINT_71G tbody tr')[SAL71G.CONTEO].cells[3].textContent);
                $('#descripcod_71G').val($('#TABLAPAQUETEINT_71G tbody tr')[SAL71G.CONTEO].cells[4].textContent);
                $('#cantidad_71G').val($('#TABLAPAQUETEINT_71G tbody tr')[SAL71G.CONTEO].cells[5].textContent);
                _evaluarcl_71G();
            }

        })
}

function _evaluarcl_71G() {
    validarInputs({
        form: '#CL_71G',
        orden: '1'
    },
        function () { _evaluaritemtabla_71G(); },
        _validarcl_71G
    )
}

function _validarcl_71G() {
    $cl71G = $('#cl_71G').val();
    switch ($cl71G) {
        case "0":
            $('#cldescrip_71G').val("Droga");
            _toggleF8([
                { input: 'codigo', app: '71G', funct: _ventanaarticulos71G }
            ]);

            _evaluarcodigoart_71G()
            break;
        case "1":
            $('#cldescrip_71G').val("Cups");
            _toggleF8([
                { input: 'codigo', app: '71G', funct: _ventanacodcups71G }
            ]);
            _evaluarcupsart_71G()
            break;
        default:
            _evaluarcl_71G()
            CON851('03', '03', null, 'error', 'Error');
            break;
    }
}

function _evaluarcupsart_71G() {
    validarInputs({
        form: '#CODIGO_71C',
        orden: '1'
    },
        function () { _evaluarcl_71G(); },
        _validarartcups_71G
    )
}
function _validarartcups_71G() {
    $codigoartcups_71G = $('#codigo_71G').val();

    if ($codigoartcups_71G.trim() == '') {
        _evaluarcl_71G();
    } else {
        LLAMADO_DLL({
            dato: [$codigoartcups_71G],
            callback: _validarcupsart_71G,
            nombredll: 'SER102-03',
            carpeta: 'SALUD'
        });
    }
}
function _validarcupsart_71G(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_descripcioncups71G = date[1].trim();
    if (swinvalid == "00") {
        $('#descripcod_71G').val($_descripcioncups71G);
        _evaluarcantidad_71G();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        $_descripcioncups71G = '**************';
        $('#descripcod_71G').val($_descripcioncups71G);
        _evaluarcl_71G();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function _evaluarcodigoart_71G() {
    validarInputs({
        form: '#CODIGO_71C',
        orden: '1'
    },
        function () { _evaluarcl_71G(); },
        _validarcodigoart_71G
    )
}
function _validarcodigoart_71G() {
    $codigoart_71G = $('#codigo_71G').val();
    if ($codigoart_71G.trim() == '') {
        _evaluarcl_71G();
    } else {
        LLAMADO_DLL({
            dato: [$codigoart_71G],
            callback: _dataarticulo_71G,
            nombredll: 'INV103_05',
            carpeta: 'INVENT'
        });
    }
}
function _dataarticulo_71G(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $descripart_71G = date[1].trim();
    if (swinvalid == "00") {
        $('#descripcod_71G').val($descripart_71G);
        _evaluarcantidad_71G();

    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'Error');
        $descripart_71G = '**************';
        $('#descripcod_71G').val($descripart_71G);
        _evaluarcl_71G()
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _evaluarcantidad_71G() {
    cantidadart71G_Mask.updateValue();
    validarInputs({
        form: '#CANTIDAD_71G',
        orden: '1'
    },
        function () { _evaluarcl_71G(); },
        _validarcantart_71G
    )
}
function _validarcantart_71G() {
    $cantidad71G = cantidadart71G_Mask.unmaskedValue;
    if (($cantidad71G.trim() == '') || ($cantidad71G == '0')) {
        CON851('02', '02', null, 'error', 'Error');
        _evaluarcantidad_71G();
    } else {
    
        _modificacionestabla_71G(); 
    }
}

function _modificacionestabla_71G() {
    let existeregisto_71G = validarexistenciareg_71G();
    if (!existeregisto_71G) {
        $('#TABLAPAQUETEINT_71G tbody').append(
            '<tr>' +
            '<td>' + $('#item_71G').val() + '</td>' +
            '<td>' + $('#cl_71G').val() + '</td>' +
            '<td>' + $('#cldescrip_71G').val() + '</td>' +
            '<td>' + $('#codigo_71G').val() + '</td>' +
            '<td>' + $('#descripcod_71G').val() + '</td>' +
            '<td>' + $('#cantidad_71G').val() + '</td>' +
            '</tr>'
        );
        _validaciontablaalmacen_71G();

    } else {
        var cambiar = $('#item_71G').val();
        cambiar = parseInt(cambiar) - 1;
        let fila = $('#TABLAPAQUETEINT_71G tbody tr:eq(' + cambiar + ')');
        let html = '<td>' + $('#item_71G').val() +
            '</td><td>' + $('#cl_71G').val() +
            '</td><td>' + $('#cldescrip_71G').val() +
            '</td><td>' + $('#codigo_71G').val() +
            '</td><td>' + $('#descripcod_71G').val() +
            '</td><td>' + $('#cantidad_71G').val() +
            '</td>';
        fila.html(html);

        _validaciontablaalmacen_71G();
    }
}

function validarexistenciareg_71G() {

    const tableReg = document.getElementById('TABLAPAQUETEINT_71G');
    let found = false;
    //Recorre las filas existentes de la tabla
    for (let i = 0; i < tableReg.rows.length; i++) {
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        //Recorre todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            // Busqueda de coincidencias en la tabla
            if (cellsOfRow[0].textContent.trim() == cerosIzq($('#item_71G').val(), 3).trim()) {
                found = cellsOfRow
            }

        }
    }
    return found;
}

function _validaciontablaalmacen_71G(orden) {
    validarTabla(
        {
            tabla: '#TABLAPAQUETEINT_71G',
            orden: orden,
            event_f3: _ubicargrabar_71G
        },
        _paquetes,
        function () {
            _evaluarcl_71G()
        },
        _ubicargrabar_71G

    );
}

function _paquetes(datos) {
    // var tabla = datos;
    // $_Nfila = tabla.rowIndex;
    $('#item_71G').val(datos.cells[0].textContent);
    $('#cl_71G').val(datos.cells[1].textContent);
    $('#cldescrip_71G').val(datos.cells[2].textContent);
    $('#codigo_71G').val(datos.cells[3].textContent);
    $('#descripcod_71G').val(datos.cells[4].textContent);
    cantidadart71G_Mask.typedValue = datos.cells[5].textContent;
    SAL71G.tablasal71G = []; 
    let a = {
        'item': datos.cells[0].textContent,
        'cl': datos.cells[1].textContent,
        'cldescripcion': datos.cells[2].textContent,
        'codigo': datos.cells[0].textContent,
        'descripcod': datos.cells[0].textContent,
        'cantidad': datos.cells[0].textContent
    }
    SAL71G.tablasal71G.push(a); 

    if ($_Novedad71G == '7') {
        SAL71G.CONTEO = SAL71G.CONTEO + 1;
        $('#item_71G').val(SAL71G.CONTEO.toString().padStart(3, '0'));
        $('#cl_71G').val('');
        $('#cldescrip_71G').val('');
        $('#codigo_71G').val('')
        $('#descripcod_71G').val('')
        $('#cantidad_71G').val('')

        _evaluarcl_71G();
    } else {
        SAL71G.CONTEO = SAL71G.CONTEO + 1;
        $('#item_71G').val(SAL71G.CONTEO.toString().padStart(3, '0'));
        $('#cl_71G').val('');
        $('#cldescrip_71G').val('');
        $('#codigo_71G').val('')
        $('#descripcod_71G').val('')
        $('#cantidad_71G').val('')
        _evaluarcl_71G();
    }
}

/////////////////GRABARDATOS//////////////////////////////

function _ubicargrabar_71G() {
    CON851P('01', _evaluarcl_71G, _tablapaquetetxt)
}
function _tablapaquetetxt() {

    let fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    let nombretxt = $_ADMINW + '_' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20) + '.txt';
    SAL71G['NOMBRETABLA'] = nombretxt;
    console.debug(SAL71G.NOMBRETABLA);
    let datosEnvio = {
        nombre_archivo: SAL71G.NOMBRETABLA,
        datos_intregales: SAL71G.tablasal71G,
    };
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('SALUD/paginas/_datostablas_SAL71G.php')
    }).done(function (data) {
        console.debug(data);
        if (data == '00') {
            let mensaje = '01';
            console.debug(mensaje);
            if ($_Novedad71G == '9') {
                _eliminardatos_71G();
            }
            else {
                _grabardatos_71G();
            }
        } else {
            console.debug('problemas para crear el txt');
        }
    });
}

function _eliminardatos_71G() {
    if ($_Novedad71G == '8') {
        $fechamod_71G = moment().format('YYMMDD');
        $opermod_71G = $_ADMINW;
    } else {
        $fechacrea_71G = moment().format('YYMMDD');
        $opercrea_71G = $_ADMINW;
        $fechamod_71G = ' ';
        $opermod_71G = ' ';
    }
    LLAMADO_DLL({
        dato: [$_Novedad71G, $llavepaquete, $observaciones71G, $valor71G, SAL71G.NOMBRETABLA],
        callback: _grabaropcion,
        nombredll: 'SER115-02',
        carpeta: 'SALUD'
    });
}

function _grabardatos_71G() {
    console.log('grabar datos')
    if ($_Novedad71G == '8') {
        $fechamod_71G = moment().format('YYMMDD');
        $opermod_71G = $_ADMINW;
    } else {
        $fechacrea_71G = moment().format('YYMMDD');
        $opercrea_71G = $_ADMINW;
        $fechamod_71G = ' ';
        $opermod_71G = ' ';
    }
    LLAMADO_DLL({
        dato: [$_Novedad71G, $llavepaquete, $observaciones71G, $valor71G, SAL71G.NOMBRETABLA],
        callback: _grabaropcion,
        nombredll: 'SER115-02',
        carpeta: 'SALUD'
    });
}
function _grabaropcion(data) {
    console.log('resultados', data)
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_Novedad71G == '9') {
            toastr.success('Se ha retirado', 'PAQUETE INTEGRAL');
            // CON850(_evaluarCON850);
            _inputControl('reset');
            _toggleNav();
        } else {
            toastr.success('Se ha guardado', 'PAQUETE INTEGRAL');
            // CON850(_evaluarCON850);
            _inputControl('reset');
            _toggleNav();

        }
    }
    else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');
        _toggleNav();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }

}


function _llenardatos_71G() {

    $('#observ_71G').val($observaciones71G);
    valor71G_Mask.typedValue = $valor71G

    for (var i = 0; i < $tabla_paq.length; i++) {
        itemstabla = $tabla_paq[i].ITEM_PAQ;
        item = itemstabla.substring(3, 6);
        cltabla = $tabla_paq[i].TIPO_PAQ;
        if (cltabla == '0') {
            descripcl = 'Droga';
        } else {
            descripcl = 'Cups';
        }
        codigotabla = $tabla_paq[i].CUPS_PAQ;
        cantidadtabla = $tabla_paq[i].CANT_PAQ;
        descripcod = $tabla_paq[i].DESCRIP_PAQ;
        valorcanti = parseInt(cantidadtabla, 10)
        var comparar = $tabla_paq[i].CUPS_PAQ.trim();
        if (comparar.length > 1) {
            $('#TABLAPAQUETEINT_71G tbody').append(''
                + '<tr>'
                + '<td>' + item + '</td>'
                + '<td>' + cltabla + '</td>'
                + '<td>' + descripcl + '</td>'
                + '<td>' + codigotabla + '</td>'
                + '<td>' + descripcod + '</td>'
                + '<td>' + valorcanti + '</td>'
                + "</tr>"
            );
        }

    }
    switch (parseInt($_Novedad71G)) {
        case 8:
            _evaluarobservacion_71G()
            break;
        case 9:
            CON851P('54', _evaluardatoconvenio_71G, _tablapaquetetxt)
            break;
    }
}

var itemMask_SAL71G = IMask($("#item_71G")[0], {
    mask: Number,
    min: 0,
    max: 20
});