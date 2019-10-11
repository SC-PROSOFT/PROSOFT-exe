var HC107 = []; var TABLAPROGHC107 = []; var TABLAVIASHC107 = []; var TABLAMACRO = [];

$(document).ready(function () {
    _inputControl('disabled');
    _inputControl('reset');
    HC107['ADMINW'] = localStorage.getItem('Usuario').trim();
    CON850(_evaluarCON850_HC107);
})

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
        { input: 'progw', app: 'hc107', funct: _ventanaevolucionesmedicas_hc107 },
    ]);
}

function _ventanaevolucionesmedicas_hc107(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "PRGRAMAS PARA EVOLUCIONES MEDICAS",
            tipo: 'mysql',
            tablaSql: 'sc_progev',
            callback_esc: function () {
                $("#progw_107").focus();
            },
            callback: function (data) {
                $('#progw_107').val(data.codigo);
                _enterInput('#progw_107');
            }
        });
    }
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
    HC107.CODIGOW = HC107.CODIGOW.padStart('0', 6);
    if (HC107.CODIGOW.trim() == '00') {
        CON851('02', '02', null, 'error', 'Error');
        $('#codigo_hc107').val('');
    }
    else {
        HC107['LLAVEW'] = HC107.CLW + HC107.CODIGOW;
        _consultaSql({
            db: 'datos_pros',
            // sql: 'SELECT CONCAT (cl_macroevol, codigo_macroevol, detalle) as "llave_macroevol" FROM sc_macroev WHERE CONCAT(cl_macroevol, codigo_macroevol) LIKE "' +  HC107.LLAVEW  +  '"',
            sql: 'SELECT * FROM sc_macroev WHERE CONCAT(cl_macroevol, codigo_macroevol) LIKE "' + HC107.LLAVEW + '"',
            callback: _consultacodigo_hc107
        });
    }
}

function _consultacodigo_hc107(error, results, fileds) {
    console.debug(results);
    if (error) throw error;
    else {
        console.debug(results, results.length);
        if (results.length == 0) {
            var validar = 1;
            _leercodigo_HC107(validar);
        } else {
            var validar = 0
            $('#detalle_hc107').val(results[0].detalle);
            _leercodigo_HC107(validar);
        }
    }
}

function _leercodigo_HC107(data) {
    console.debug(data);
    switch (HC107.NOVEDADW) {
        case '7':
            if (data == 1) {
                _nuevo_HC107();
            }
            else {
                _Erro1_HC107();
            }
            break;
        case '8':
            if (data == 0) {
                _cambio_HC107();
            }
            else {
                _Erro1_HC107();
            }
            break;
        case '9':
            if (data == 0) {
                _retiro_HC107();
            }
            else {
                _Erro1_HC107();
            }
            break;
    }
}

function _Erro1_HC107() {
    if (HC107.NOVEDADW == '7') {
        CON851('00', '00', null, 'error', 'Error');
        $('#codigo_hc107').val('');
        _evaluardato3_hc107();
    } else {
        CON851('01', '01', null, 'error', 'Error');
        $('#codigo_hc107').val('');
        _evaluardato3_hc107();
    }
}

function _nuevo_HC107() {
    _datoc_HC107();
}

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
        function () { _dato3_HC107() },
        _validardetalle_HC107
    )
}

function _validardetalle_HC107() {
    HC107['DETALLEW'] = $('#detalle_hc107').val();
    console.debug('validar detalle');
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
            '<div class="col-md-12 col-sm-12 col-xs-12">' +
            '<table id="TABLAPROGW_HC107" class="table table-light table-striped">' +
            '<thead>' +
            '<tr>' +
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
                    _datoc_HC107();
                }
            }
        }
    });
    ventanaprog.init($('.modal-footer').hide());
    ventanaprog.on('shown.bs.modal', function () {
        $("#progw_hc107").focus();
    });
    ventanaprog.init(_evaluardataprog_HC107());
}
function _evaluardataprog_HC107() {
    validarInputs(
        {
            form: "#PROGW_107",
            orden: '1'
        },
        function () { $('.btn-danger').click() },
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
                        if (results[i].llave_progev.trim() == HC107.PROGW) {
                            TABLAPROGHC107.push({ codigo: results[i].llave_progev }, { descripcion: results[i].descrip_progev });
                            if ($('#TABLAPROGW_HC107 tbody tr').length == 3) {
                                $('.btn-primary').click();
                                break;
                            } else {
                                $('#TABLAPROGW_HC107 tbody').append(
                                    '<tr>' +
                                    '<td>' + results[i].llave_progev + '</td>' +
                                    '<td>' + results[i].descrip_progev + '</td>' +
                                    '</tr>'
                                )
                                _evaluardataprog_HC107();
                            }
                        }
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
}

function _evaluarvias_HC107() {
    validarInputs(
        {
            form: "#VIAS_HC107",
            orden: '1'
        },
        function () { $('.btn-danger').click() },
        _validarvias_HC107
    )
}

function _validarvias_HC107() {
    HC107['VIASW'] = $('#vias_hc107').val();
    _consultaSql({
        db: 'datos_pros',
        sql: 'SELECT * FROM datos_pros.sc_viaacceso WHERE codigo LIKE "' + HC107.VIASW + '"',
        callback: function (error, results, fileds) {
            if (error) throw error;
            else {
                console.debug(results, results.length);
                if (results.length > 0) {
                    for (var i in results) {
                        console.debug(i, results[i].nombre, HC107.VIASW);
                        TABLAVIASHC107.push({ codigo: results[i].codigo }, { descripcion: results[i].nombre });
                        if ($('#TABLAVIAS_HC107 tbody tr').length == 3) {
                            $('.btn-primary').click();
                            break;
                        } else {
                            $('#TABLAVIAS_HC107 tbody').append(
                                '<tr>' +
                                '<td>' + results[i].codigo + '</td>' +
                                '<td>' + results[i].nombre + '</td>' +
                                '</tr>'
                            )
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
            '<label class="col-md-4 col-sm-4 col-xs-12">Drog:</label>' +
            '<div class="input-group col-md-3 col-sm-3 col-xs-12" id="DROG_HC107">' +
            '<input id="drog_hc107" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="2">' +
            '</div>' +
            '<div class="input-group col-md-4 col-sm-4 col-xs-12">' +
            '<input id="drogd_hc107" class="form-control col-md-12 col-sm-12 col-xs-12">' +
            '</div>' +
            '<button type="button" id="drogBtn_hc107" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            '<i class="icon-magnifier"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-12">Lab:</label>' +
            '<div class="input-group col-md-4 col-sm-4 col-xs-12" id="LAB_HC107">' +
            '<input id="lab_hc107" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="2">' +
            '</div>' +
            '<div class="input-group col-md-4 col-sm-4 col-xs-12">' +
            '<input id="labd_hc107" class="form-control col-md-12 col-sm-12 col-xs-12">' +
            '</div>' +
            '<button type="button" id="labBtn_hc107" class="btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            '<i class="icon-magnifier"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-12 col-sm-12 col-xs-12">' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-12">Imag:</label>' +
            '<div class="input-group col-md-4 col-sm-4 col-xs-12" id="IMAG_HC107">' +
            '<input id="imag_hc107" class="form-control col-md-12 col-sm-12 col-xs-12" data-orden="1" maxlength="2">' +
            '</div>' +
            '<div class="input-group col-md-4 col-sm-4 col-xs-12">' +
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
                            TABLAVIASHC107.push({ codigo: results[i].llave }, { descripcion: results[i].nombre });
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
                            TABLAVIASHC107.push({ codigo: results[i].llave }, { descripcion: results[i].nombre });
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
                            TABLAVIASHC107.push({ codigo: results[i].llave }, { descripcion: results[i].nombre });
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
    var fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    var nombretxt = HC107.ADMINW + '_' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20);
    var datos_envio = $('#textarea_hc107').val();
    SolicitarDll({ datosh: datos_envio, nombretxt: nombretxt }, _dataphp, get_url('frameworks/scripts/php/_datosTabla_HC107.php'));
    // datos_envio = datosEnvio()
    // datos_envio += HC107.ADMINW + '|' + HC107.CLW + HC107.CODIGOW + '|' + HC107.DETALLEW + '|' + HC107.FORMATOCONSENW;
    // SolicitarDll({ datosh: datos_envio }, _dataHC107_HC107, get_url('app/HICLIN/HC107.DLL'));
}

function _dataphp(data) {
    console.debug(data);
}

function _cancelargrabar_HC107() {
    setTimeout(_datomacroform_HC107, 300);
}

function _dataHC107_HC107(data) {
    console.debug(data, 'Guardado');
}