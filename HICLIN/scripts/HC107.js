var HC107 = []; var TABLAPROGHC107 = []; var TABLAVIASHC107 = []; var TABLACODFORMHC107 = [];

$(document).ready(function () {
    _inputControl('disabled');
    _inputControl('reset');
    HC107['ADMINW'] = localStorage.getItem('Usuario').trim();
    HC107['CONTEO'] = 0;
    HC107['PASOW'] = '1';
    HC107['DETALLEW'] = ' ';
    HC107['FORMATOCONSENW'] = ' ';
    HC107['NOMBRETXT'] = ' ';
    CON850(_evaluarCON850_HC107);
    // datos_envio = datosEnvio();
    // datos_envio += HC107.ADMINW
    // console.debug(datos_envio);
    // SolicitarDll({ datosh: datos_envio }, _dataHC10702_HC107, get_url('app/HICLIN/HC107-02.DLL'));
})

// function _dataHC10702_HC107(data){
//     console.debug(data);
// }

function _evaluarCON850_HC107(data) {
    console.debug(data);
    switch (data.id) {
        case '7':
        case '8':
        case '9':
            $('novedad_hc107').val(data.id);
            $('novedadd_hc107').val(data.descripcion);
            SER874_HC107();
            break;
        default:
            _toggleNav();
            break;
    }
    HC107['NOVEDADW'] = data.id;
    $('#novedad_hc107').val(data.id);
    $('#novedadd_hc107').val(data.descripcion);
    _toggleF8([
        { input: 'codigo', app: 'hc107', funct: _ventanamacrosevolucion_hc107 },
    ]);
}

function _ventanaevolucionesmedicas_hc107(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "PRGRAMAS PARA EVOLUCIONES MEDICAS",
            tipo: 'mysql',
            tablaSql: 'sc_progev',
            callback_esc: function () {
                $("#progw_hc107").focus();
            },
            callback: function (data) {
                $('#progw_hc107').val(data.codigo);
                _enterInput('#progw_hc107');
            }
        });
    }
    if (e.type == "keydown" && e.which == 40) {
        _validartablaprog_HC107();
    }
}

function _validartablaprog_HC107() {
    _inputControl('disabled');
    validarTabla(
        {
            tabla: '#TABLAPROGW_HC107',
            orden: '0',
        },
        seleccionprogw_HC107,
        function () {
            _evaluardataprog_HC107();
        },
        _evaluardataprog_HC107
    );
}

function _salirpopup_HC107() {
    HC107.CONTEO = 0;
    $('.btn-primary').click();
}

function seleccionprogw_HC107(data) {
    var tabla = data;
    HC107.CONTEO = parseInt(tabla.cells[0].textContent);
    $('#progw_hc107').val(tabla.cells[1].textContent);
    $("#progw_hc107").prop('disabled', false);
    $("#progw_hc107").focus();
}

function _ventanaviasacceso_hc107(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE VIA ACCESO",
            tipo: 'mysql',
            tablaSql: 'sc_viaacceso',
            callback_esc: function () {
                $("#vias_hc107").focus();
            },
            callback: function (data) {
                $('#vias_hc107').val(data.codigo);
                _enterInput('#vias_hc107');
            }
        });
    }
    if (e.type == "keydown" && e.which == 40) {
        _validartablavia_HC107();
    }
}

function _validartablavia_HC107() {
    _inputControl('disabled');
    validarTabla(
        {
            tabla: '#TABLAVIAS_HC107',
            orden: '0',
        },
        seleccionvia_HC107,
        function () {
            _evaluarvias_HC107();
        },
        _evaluarvias_HC107
    );
}

function seleccionvia_HC107(data) {
    var tabla = data;
    HC107.CONTEO = parseInt(tabla.cells[0].textContent);
    $('#vias_hc107').val(tabla.cells[1].textContent);
    $("#vias_hc107").prop('disabled', false);
    $("#vias_hc107").focus();
}

function _ventanamacrosevolucion_hc107(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA MACRO PARA EVOLUCION",
            tipo: 'mysql',
            consultaSql: "SELECT * FROM `sc_macroev` WHERE `cl_macroevol` LIKE '" + RX424.CLW + "'",
            callback_esc: function () {
                $("#codigo_hc107").focus();
            },
            callback: function (data) {
                $('#codigo_hc107').val(data.codigo_macroevol);
                _enterInput('#codigo_hc107');
            }
        });
    }
}

function SER874_HC107() {
    var CL = [
        { codigo: 1, descripcion: 'CIRUGIAS' },
        { codigo: 2, descripcion: 'PROCEDIMIENTOS' },
        { codigo: 3, descripcion: 'RESULTADOS IMAGENOLOGIA' },
        { codigo: 4, descripcion: 'ENFERMERIA' },
        { codigo: 5, descripcion: 'MEDICINA GENERAL' },
        { codigo: 6, descripcion: 'MEDICINA ESPECIALIZADA' },
        { codigo: 7, descripcion: 'RESUMENES HISTORIA' },
        { codigo: 8, descripcion: 'TERAPIAS' },
        { codigo: 9, descripcion: 'PRE-ANESTESIA' },
        { codigo: 'O', descripcion: 'ODONTOLOGIA' },
        { codigo: 'C', descripcion: 'CONSENTIM.INFORMADO' },
        { codigo: 'P', descripcion: 'PROMOCION Y PREVENCION' },
    ]
    POPUP({
        array: CL,
        titulo: 'TIPOS DE MACRO',
        indices: [
            { label: 'descripcion' }
        ],
        callback_f: _toggleNav
    },
        _evaluarSER874_HC107);
}

function _evaluarSER874_HC107(data) {
    console.debug(data);
    switch (data.codigo) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 'A':
        case 'B':
        case 'C':
            console.debug(data);
            _evaluardato3_hc107();
            break;
        default:
            _toggleNav();
            break;
    }
    HC107['CLW'] = data.codigo;
    $('#tipo_hc107').val(data.codigo);
    $('#tipod_hc107').val(data.descripcion);
}

function _evaluardato3_hc107() {
    validarInputs(
        {
            form: "#CODIGO_HC107",
            orden: '1'
        },
        function () { SER874_HC107() },
        _dato3_HC107
    )
}

function _dato3_HC107() {
    HC107['CODIGOW'] = $('#codigo_hc107').val();
    HC107.PASOW = '2';
    if (parseInt(HC107.CODIGOW) == 0) {
        CON851('02', '02', null, 'error', 'Error');
        $('#codigo_hc107').val('');
        _evaluardato3_hc107();
    } else {
        HC107.CODIGOW = HC107.CODIGOW.padStart(6, '0');
        HC107['LLAVEW'] = HC107.CLW + HC107.CODIGOW;
        datos_envio = datosEnvio();
        datos_envio += HC107.ADMINW + '|' + HC107.PASOW + '|' + HC107.NOVEDADW + '|' + HC107.LLAVEW + '|' + HC107.DETALLEW + '|' + HC107.FORMATOCONSENW + '|' + HC107.NOMBRETXT
        console.debug(datos_envio);
        SolicitarDll({ datosh: datos_envio }, _dataHC10700_1_HC107, get_url('app/HICLIN/HC107-00.DLL'));
    }
}

function _dataHC10700_1_HC107(data) {
    console.debug(data);
    data = data.split('|');
    HC107['DETALLEW'] = data[1].trim();
    HC107['TABLAVIAS'] = [data[2].trim(), data[3].trim(), data[4].trim(), data[5].trim(), data[6].trim(), data[7].trim()];
    HC107['FORMATOCONSENW'] = data[8].trim();
    HC107['TABLACODFORM'] = [data[9].trim(), data[10].trim(), data[11].trim()];
    HC107['TABLAPROGHC107'] = [data[12].trim(), data[13].trim(), data[14].trim(), data[15].trim(), data[16].trim(), data[17].trim(), data[18].trim(), data[19].trim(), data[20].trim(), data[21].trim(), data[22].trim(), data[23].trim(), data[24].trim(), data[25].trim(), data[26].trim()];
    HC107['OPERW'] = data[27].trim();
    HC107['FECHAOPERW'] = data[28].trim();
    HC107['NOMBRETXTW'] = data[29].trim();
    let rutaJson = get_url('temp/' + HC107.NOMBRETXTW);
    if (data[0].trim() == '00') {
        if (HC107.NOVEDADW == '8' || HC107.NOVEDADW == '9') {
            $('#detalle_hc107').val(HC107.DETALLEW);
            SolicitarDatos(
                null,
                function (data) {
                    HC107.RENGMARCROW = data.trim();
                    $('#textarea_hc107').val(HC107.RENGMARCROW);
                    console.debug(data);
                    let arrayEliminar = [];
                    arrayEliminar.push(HC107.NOMBRETXTW);
                    _eliminarJson(arrayEliminar, on_eliminartxtconsultaHC107);
                    _datoc_HC107();
                },
                rutaJson
            );
        } else {
            CON851('01', '01', null, 'error', 'Error');
            $('#codigo_hc107').val('');
            SER874_HC107();
        }
    } else if (data[0].trim() == '01') {
        if (HC107.NOVEDADW == '7') {
            _datoc_HC107();
        } else {
            CON851('01', '01', null, 'error', 'Error');
            $('#codigo_hc107').val('');
            SER874_HC107();
        }
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}
function on_eliminartxtconsultaHC107(data){
    console.debug(data);
    var date = data.split('|');
    if (date[0].trim() == '00') {
        console.debug('json eliminado');
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}
// function _consultacodigo_hc107(error, results, fileds) {
//     console.debug(results);
//     if (error) throw error;
//     else {
//         console.debug(results, results.length);
//         if (results.length == 0) {
//             var validar = 1;
//             _leercodigo_HC107(validar);
//         } else {
//             var validar = 0
//             $('#detalle_hc107').val(results[0].detalle);
//             _leercodigo_HC107(validar);
//         }
//     }
// }

// function _Erro1_HC107() {
//     if (HC107.NOVEDADW == '7') {
//         CON851('00', '00', null, 'error', 'Error');
//         $('#codigo_hc107').val('');
//         _evaluardato3_hc107();
//     } else {
//         CON851('01', '01', null, 'error', 'Error');
//         $('#codigo_hc107').val('');
//         _evaluardato3_hc107();
//     }
// }

// function _nuevo_HC107() {
//     _datoc_HC107();
// }

function _datoc_HC107() {
    if (HC107.CLW == 'C') {
        _datoformato_HC107();
    } else {
        _evaluardetalle_HC107();
    }
}

function _evaluardetalle_HC107() {
    validarInputs(
        {
            form: "#DETALLE_HC107",
            orden: '1'
        },
        function () { _evaluardato3_hc107() },
        _validardetalle_HC107
    )
}

function _validardetalle_HC107() {
    HC107['DETALLEW'] = $('#detalle_hc107').val();
    if (HC107.DETALLEW.trim() == '') {
        CON851('02', '02', null, 'error', 'Error');
        $('#detalle_hc107').val('');
        _datoc_HC107();
    }
    else {
        _ventanaprog_HC107();
    }
}
function _ventanaprog_HC107() {
    var ventanaprog = bootbox.dialog({
        size: 'large',
        onEscape: false,
        title: 'PROGRAMA CON RUTINAS DE CAPTURA',
        message: '<div class="row"> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-12">Codigo:</label>' +
            '<div class="input-group col-md-7 col-sm-7 col-xs-12" id="PROGW_107">' +
            '<input id="progw_hc107" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="10">' +
            '</div>' +
            '<button type="button" id="progwBtn_hc107" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            '<i class="icon-magnifier"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12" style="overflow:auto; height:200px">' +
            '<table id="TABLAPROGW_HC107" class="table table-light table-striped">' +
            '<thead>' +
            '<tr>' +
            '<th>#</th>' +
            '<th>Codigo</th>' +
            '<th>Detalle</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '</tbody>' +
            '<tfoot>' +
            '<tr>' +
            '<td></td>' +
            '<td></td>' +
            '</tr>' +
            '</tfoot>' +
            '</table>' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanaprog.off('shown.bs.modal');
                    setTimeout(_evaluartextarea_HC107, 100);
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanaprog.off('shown.bs.modal');
                    HC107.CONTEO = 0;
                    _datoc_HC107();
                }
            }
        }
    });
    ventanaprog.init($('.modal-footer').hide());
    ventanaprog.init(_verificarvalorestablaprog());
    ventanaprog.init(_toggleF8([
        { input: 'progw', app: 'hc107', funct: _ventanaevolucionesmedicas_hc107 },
    ]));
    ventanaprog.on('shown.bs.modal', function () {
        $("#progw_hc107").focus();
    });
    ventanaprog.init(_evaluardataprog_HC107());
}

function _verificarvalorestablaprog() {
    if (TABLAPROGHC107) {
        for (var i in TABLAPROGHC107) {
            $('#TABLAPROGW_HC107 tbody').append(
                '<tr>' +
                '<td>' + i + '</td>' +
                '<td>' + TABLAPROGHC107[i].codigo + '</td>' +
                '<td>' + TABLAPROGHC107[i].descripcion + '</td>' +
                '</tr>'
            )
        }
    }
}

function _evaluardataprog_HC107() {
    validarInputs(
        {
            form: "#PROGW_107",
            orden: '1',
            event_f3: _salirpopup_HC107
        },
        function () { $('.btn-danger').click(); HC107.CONTEO = 0; },
        _validardataprog_HC107
    )
}

function _validardataprog_HC107() {
    HC107['PROGW'] = $('#progw_hc107').val();
    _consultaSql({
        db: 'datos_pros',
        sql: 'SELECT * FROM datos_pros.sc_progev WHERE llave_progev LIKE "' + HC107.PROGW + '"',
        callback: function (error, results, fileds) {
            if (error) throw error;
            else {
                console.debug(results, results.length);
                if (results.length > 0) {
                    for (var i in results) {
                        console.debug(i, results[i].llave_progev, HC107.PROGW);
                        // if (results[i].llave_progev.trim() == HC107.PROGW) {
                        TABLAPROGHC107.push({ codigo: results[i].llave_progev.padEnd(10, ' '), descripcion: results[i].descrip_progev });
                        if (HC107.CONTEO == 14) {
                            $('.btn-primary').click();
                            HC107.CONTEO = 0;
                            break;
                        } else {
                            var fila = $('#TABLAPROGW_HC107 tbody').find('tr:eq(' + HC107.CONTEO + ')');
                            if (fila.length > 0) {
                                var html = '<td>' + HC107.CONTEO + '</td>' +
                                    '<td>' + results[i].llave_progev + '</td>' +
                                    '<td>' + results[i].descrip_progev + '</td>';
                                fila.html(html);
                            } else {
                                $('#TABLAPROGW_HC107 tbody').append(
                                    '<tr>' +
                                    '<td>' + HC107.CONTEO + '</td>' +
                                    '<td>' + results[i].llave_progev + '</td>' +
                                    '<td>' + results[i].descrip_progev + '</td>' +
                                    '</tr>'
                                );
                            }
                            $('#TABLAPROGW_HC107').scrollTop($('#TABLAPROGW_HC107')[0].scrollHeight);
                            HC107.CONTEO = HC107.CONTEO + 1;
                            _evaluardataprog_HC107();
                        }
                        // }
                    }
                } else {
                    CON851('01', '01', null, 'error', 'Error');
                    $('#progw_hc107').val('');
                    _evaluardataprog_HC107();
                }
            }
        }
    });
}

function _evaluartextarea_HC107() {
    validarInputs(
        {
            form: "#TEXTAREA_HC107",
            orden: '1'
        },
        function () { _evaluardetalle_HC107() },
        _validartextarea_HC107
    )
}

function _validartextarea_HC107() {
    _datoformato_HC107();
}

function _datoformato_HC107() {
    if (HC107.CLW == 'C') {
        var CONSENTIMIENTOS = [
            { codigo: 'CON05', descripcion: 'IMPLANTE SUBDERMICO' },
            { codigo: 'CON09', descripcion: 'MUESTRA EXAM. FFV FU LAB.' },
            { codigo: 'CON10', descripcion: 'INTERES EN SALUD PUBLICA' },
            { codigo: 'CON11', descripcion: 'REFERENCIA Y CONTRAREFERENCIA' },
            { codigo: 'CON12', descripcion: 'ATENCION AL PARTO' },
            { codigo: 'CON13', descripcion: 'PROCEDIMIENTOS INVASIVOS' },
        ]
        POPUP({
            array: CONSENTIMIENTOS,
            titulo: 'FORMATOS DE CONSENTIMIENTO INFORMADO',
            indices: [
                { label: 'descripcion' }
            ],
            callback_f: _toggleNav
        },
            _evaluardatoformato_HC107);
    }
    else {
        _datovias_HC107();
    }
}

function _evaluardatoformato_HC107(data) {
    switch (data.codigo) {
        case 'CON05':
        case 'CON09':
        case 'CON10':
        case 'CON11':
        case 'CON12':
        case 'CON13':
            HC107['FORMATOCONSENW'] = data.codigo;
            _confirmar_HC107();
    }
}

function _datovias_HC107() {
    if (HC107.CLW != '2') {
        _datomacroform_HC107();
    } else {
        var ventanavias = bootbox.dialog({
            size: 'large',
            onEscape: false,
            title: 'VIAS ACCESO',
            message: '<div class="row"> ' +
                '<div class="col-md-12 col-sm-12 col-xs-12">' +
                '<div class="inline-inputs">' +
                '<label class="col-md-4 col-sm-4 col-xs-12">Codigo:</label>' +
                '<div class="input-group col-md-4 col-sm-4 col-xs-12" id="VIAS_HC107">' +
                '<input id="vias_hc107" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="2">' +
                '</div>' +
                '<button type="button" id="viasBtn_hc107" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
                '<i class="icon-magnifier"></i>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-12 col-sm-12 col-xs-12">' +
                '<table id="TABLAVIAS_HC107" class="table table-light table-striped">' +
                '<thead>' +
                '<tr>' +
                '<th>#</th>' +
                '<th>Codigo</th>' +
                '<th>Detalle</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '</tbody>' +
                '<tfoot>' +
                '<tr>' +
                '<td></td>' +
                '<td></td>' +
                '</tr>' +
                '</tfoot>' +
                '</table>' +
                '</div>' +
                '</div>',
            buttons: {
                confirm: {
                    label: 'Aceptar',
                    className: 'btn-primary',
                    callback: function () {
                        setTimeout(_datomacroform_HC107, 500);
                        ventanavias.off('show.bs.modal');
                    }
                },
                cancelar: {
                    label: 'Cancelar',
                    className: 'btn-danger',
                    callback: function () {
                        ventanavias.off('show.bs.modal');
                        _datoc_HC107();
                    }
                }
            }
        });
        ventanavias.init($('.modal-footer').hide());
        ventanavias.on('shown.bs.modal', function () {
            $("#vias_hc107").focus();
        });
        ventanavias.init(_evaluarvias_HC107());
        ventanavias.init(_toggleF8([
            { input: 'vias', app: 'hc107', funct: _ventanaviasacceso_hc107 },
        ]));
    }
}

function _evaluarvias_HC107() {
    validarInputs(
        {
            form: "#VIAS_HC107",
            orden: '1',
            event_f3: _salirpopup_HC107
        },
        function () { $('.btn-danger').click(); HC107.CONTEO = 0; },
        _validarvias_HC107
    )
}

function _validarvias_HC107() {
    HC107['VIASW'] = $('#vias_hc107').val();
    var conteo = 0;
    _consultaSql({
        db: 'datos_pros',
        sql: 'SELECT * FROM datos_pros.sc_viaacceso WHERE codigo LIKE "' + HC107.VIASW + '"',
        callback: function (error, results, fileds) {
            if (error) throw error;
            else {
                if (results.length > 0) {
                    for (var i in results) {
                        TABLAVIASHC107.push({ codigo: results[i].codigo, descripcion: results[i].nombre });
                        if (HC107.CONTEO == 5) {
                            $('.btn-primary').click();
                            HC107.CONTEO = 0;
                            break;
                        } else {
                            var fila = $('#TABLAVIAS_HC107 tbody').find('tr:eq(' + HC107.CONTEO + ')');
                            if (fila.length > 0) {
                                var html = '<td>' + HC107.CONTEO + '</td>' +
                                    '<td>' + results[i].codigo + '</td>' +
                                    '<td>' + results[i].nombre + '</td>';
                                fila.html(html);
                            } else {
                                $('#TABLAVIAS_HC107 tbody').append(
                                    '<tr>' +
                                    '<td>' + HC107.CONTEO + '</td>' +
                                    '<td>' + results[i].codigo + '</td>' +
                                    '<td>' + results[i].nombre + '</td>' +
                                    '</tr>'
                                );
                            }
                            HC107.CONTEO = HC107.CONTEO + 1;
                            _evaluarvias_HC107();
                        }
                    }
                } else {
                    CON851('01', '01', null, 'error', 'Error');
                    $('#vias_hc107').val('');
                    _evaluarvias_HC107();
                }
            }
        }
    });
}

function _datomacroform_HC107() {
    var ventanamacros = bootbox.dialog({
        size: 'large',
        onEscape: false,
        title: 'MACROS FORMULACION',
        message: '<div class="row"> ' +
            '<div class="col-md-12 col-sm-12 col-xs-12">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-3 col-sm-3 col-xs-12">Drog:</label>' +
            '<div class="input-group col-md-3 col-sm-3 col-xs-12" id="DROG_HC107">' +
            '<input id="drog_hc107" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="2">' +
            '</div>' +
            '<div class="input-group col-md-5 col-sm-5 col-xs-12">' +
            '<input id="drogd_hc107" class="form-control col-md-12 col-sm-12 col-xs-12">' +
            '</div>' +
            '<button type="button" id="drogBtn_hc107" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            '<i class="icon-magnifier"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-3 col-sm-3 col-xs-12">Lab:</label>' +
            '<div class="input-group col-md-3 col-sm-3 col-xs-12" id="LAB_HC107">' +
            '<input id="lab_hc107" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="2">' +
            '</div>' +
            '<div class="input-group col-md-5 col-sm-5 col-xs-12">' +
            '<input id="labd_hc107" class="form-control col-md-12 col-sm-12 col-xs-12">' +
            '</div>' +
            '<button type="button" id="labBtn_hc107" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            '<i class="icon-magnifier"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-3 col-sm-3 col-xs-12">Imag:</label>' +
            '<div class="input-group col-md-3 col-sm-3 col-xs-12" id="IMAG_HC107">' +
            '<input id="imag_hc107" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="2">' +
            '</div>' +
            '<div class="input-group col-md-5 col-sm-5 col-xs-12">' +
            '<input id="imagd_hc107" class="form-control col-md-12 col-sm-12 col-xs-12">' +
            '</div>' +
            '<button type="button" id="imagBtn_hc107" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            '<i class="icon-magnifier"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    setTimeout(_confirmar_HC107, 500);
                    ventanamacros.off('show.bs.modal');
                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanamacros.off('show.bs.modal');
                    _datoc_HC107();
                }
            }
        }
    });
    ventanamacros.init($('.modal-footer').hide());
    ventanamacros.init(_inputControl('disabled'));
    ventanamacros.on('shown.bs.modal', function () {
        $("#drog_hc107").focus();
    });
    ventanamacros.init(_evaluardrog_HC107());
}

function _evaluardrog_HC107() {
    validarInputs(
        {
            form: "#DROG_HC107",
            orden: '1'
        },
        function () { $('.btn-danger').click() },
        _validardrog_HC107
    )
}

function _validardrog_HC107() {
    HC107['DROGW'] = '1' + $('#drog_hc107').val();
    console.debug(HC107.DROGW);
    _consultaSql({
        db: 'datos_pros',
        sql: 'SELECT * FROM datos_pros.sc_macrohis WHERE llave LIKE "' + HC107.DROGW + '"',
        callback: function (error, results, fileds) {
            if (error) throw error;
            else {
                console.debug(results, results.length);
                if (results.length > 0) {
                    for (var i in results) {
                        console.debug(i, results[i].nombre, HC107.DROGW);
                        // if (results[i].llave.trim() == HC107.DROGW) {
                        TABLACODFORMHC107.push({ codigo: results[i].llave.substring(1, 3), descripcion: results[i].nombre });
                        $('#drog_hc107').val(results[i].llave);
                        $('#drogd_hc107').val(results[i].nombre);
                        _evaluarlab_HC107();
                        break;
                        // }
                    }
                }
                else {
                    CON851('01', '01', null, 'error', 'Error');
                    $('#drog_hc107').val('');
                    _evaluardrog_HC107();
                }
            }
        }
    });
}

function _evaluarlab_HC107() {
    validarInputs(
        {
            form: "#LAB_HC107",
            orden: '1'
        },
        function () { _evaluardrog_HC107() },
        _validarlab_HC107
    )
}

function _validarlab_HC107() {
    HC107['LABW'] = '2' + $('#lab_hc107').val();
    _consultaSql({
        db: 'datos_pros',
        sql: 'SELECT * FROM datos_pros.sc_macrohis WHERE llave LIKE "%' + HC107.LABW + '%"',
        callback: function (error, results, fileds) {
            if (error) throw error;
            else {
                console.debug(results, results.length);
                if (results.length > 0) {
                    for (var i in results) {
                        console.debug(i, results[i].nombre, HC107.LABW);
                        // if (results[i].llave.trim() == HC107.LABW) {
                        TABLACODFORMHC107.push({ codigo: results[i].llave.substring(1, 3), descripcion: results[i].nombre });
                        $('#lab_hc107').val(results[i].llave);
                        $('#labd_hc107').val(results[i].nombre);
                        _evaluarimag_HC107();
                        break;
                        // }
                    }
                } else {
                    CON851('01', '01', null, 'error', 'Error');
                    $('#lab_hc107').val('');
                    _evaluarlab_HC107();
                }
            }
        }
    });
}

function _evaluarimag_HC107() {
    validarInputs(
        {
            form: "#IMAG_HC107",
            orden: '1'
        },
        function () { _evaluarlab_HC107() },
        _validarimag_HC107
    )
}

function _validarimag_HC107() {
    HC107['IMAGW'] = '3' + $('#imag_hc107').val();
    _consultaSql({
        db: 'datos_pros',
        sql: 'SELECT * FROM datos_pros.sc_macrohis WHERE llave LIKE "%' + HC107.IMAGW + '%"',
        callback: function (error, results, fileds) {
            if (error) throw error;
            else {
                console.debug(results, results.length);
                if (results.length > 0) {
                    for (var i in results) {
                        console.debug(i, results[i].nombre, HC107.IMAGW);
                        // if (results[i].llave.trim() == HC107.IMAGW) {
                        TABLACODFORMHC107.push({ codigo: results[i].llave.substring(1, 3), descripcion: results[i].nombre });
                        $('#imag_hc107').val(results[i].llave);
                        $('#imagd_hc107').val(results[i].nombre);
                        $('.btn-primary').click();
                        break;
                        // }
                    }
                } else {
                    CON851('01', '01', null, 'error', 'Error');
                    $('#imag_hc107').val('');
                    _evaluarimag_HC107();
                }
            }
        }
    });
}


function _confirmar_HC107() {
    CON851P('01', _cancelargrabar_HC107, _confirmargrabar_HC107);
}

function _confirmargrabar_HC107() {
    HC107.PASOW = '1';
    var fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    var nombretxt = HC107.ADMINW + '_' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20);
    var txtarea = $('#textarea_hc107').val();
    HC107['NOMBRETXT'] = nombretxt;
    HC107['TABLATXTPROG'] = '';
    HC107['TABLATXTFORM'] = '';
    HC107['TABLATXTVIAS'] = '';
    for (var i in TABLAPROGHC107) {
        if (HC107.TABLATXTPROG.length < 1) {
            HC107.TABLATXTPROG = TABLAPROGHC107[i].codigo + ',';
        } else {
            if (TABLAPROGHC107[i].codigo) {
                HC107.TABLATXTPROG += TABLAPROGHC107[i].codigo + ',';
            }
        }
    }
    for (var i in TABLACODFORMHC107) {
        if (HC107.TABLATXTFORM.length < 1) {
            HC107.TABLATXTFORM += TABLACODFORMHC107[i].codigo + ',';
        } else {
            if (TABLACODFORMHC107[i].codigo) {
                HC107.TABLATXTFORM += TABLACODFORMHC107[i].codigo + ',';
            }
        }
    }
    if (HC107.CLW == '2') {
        for (var i in TABLAVIASHC107) {
            if (HC107.TABLATXTVIAS.length < 1) {
                HC107.TABLATXTVIAS = TABLAVIASHC107[i].codigo + ',';
            } else {
                if (TABLAVIASHC107[i].codigo) {
                    HC107.TABLATXTVIAS += TABLAVIASHC107[i].codigo + ',';
                }
            }
        }
    }
    if (HC107.CLW == '2') {
        var datosphp = {
            nombre_archivo: nombretxt,
            rengmacroevol: txtarea,
            viasmacroevol: HC107.TABLATXTVIAS,
            codformmacroevol: HC107.TABLATXTFORM,
            comandosmacroevol: HC107.TABLATXTPROG
        };
    } else {
        var datosphp = {
            nombre_archivo: nombretxt,
            rengmacroevol: txtarea,
            codformmacroevol: HC107.TABLATXTFORM,
            comandosmacroevol: HC107.TABLATXTPROG
        };
    }

    $.ajax({
        data: datosphp,
        type: 'POST',
        async: false,
        url: get_url('HICLIN/paginas/_tabla_HC107.php')
    }).done(function (data) {
        console.debug(data, 'TXT');
        if (data == '00') {
            datos_envio = datosEnvio();
            datos_envio += HC107.ADMINW + '|' + HC107.PASOW + '|' + HC107.NOVEDADW + '|' + HC107.LLAVEW + '|' + HC107.DETALLEW + '|' + HC107.FORMATOCONSENW + '|' + HC107.NOMBRETXT
            console.debug(datos_envio);
            SolicitarDll({ datosh: datos_envio }, _dataHC10700_HC107, get_url('app/HICLIN/HC107-00.DLL'));
        } else {
            console.debug('problemas para crear el txt');
        }
    });
}

function _cancelargrabar_HC107() {
    setTimeout(_datomacroform_HC107, 300);
}

function _dataHC10700_HC107(data) {
    console.debug(data, 'Guardado');
    data = data.split('|');
    let json = data[29].trim();
    let rutaJson = get_url('temp/' + json);
    if (data[0].trim() == '00') {
        SolicitarDatos(
            null,
            function (data) {
                console.debug(data);
                let arrayEliminar = [];
                arrayEliminar.push(json);
                _eliminarJson(arrayEliminar, on_eliminartxtHC107);
                _toggleNav();
            },
            rutaJson
        );
    } else {
        CON852(data[0], data[1], data[2], _toggleNav);
    }
}

function on_eliminartxtHC107(data) {
    console.debug(data);
    var date = data.split('|');
    if (date[0].trim() == '00') {
        console.debug('json eliminado');
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}