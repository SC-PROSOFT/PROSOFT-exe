function SER835(data, esccallback, callback) {
    var SER835 = [];
    let URL = get_url("APP/SALUD/SER835.DLL");
    postData({
        datosh: datosEnvio() + data.PACIENTE + '|' + data.CLFACT + '|' + data.NITUSU + '|'
    }, URL)
        .then(data => {
            SER835 = data.FACTURAS;
            SER835.pop();
            _ventanaDatos({
                titulo: data.DESCRIPPACI,
                columnas: ["FECHA_IESTAD", "CTA_FACT", "ART_FACT", "DETALLE_FACT", "MEDIC_FACT", "COPAGO_FACT"],
                data: SER835,
                callback_esc: () => {
                    CON851P('04', esccallback, callback);
                },
                callback: data => {
                    CON851P('04', esccallback, callback);
                }
            });
        })
        .catch(error => {
            console.log(error);
            callback();
        });
}

function SER836(data, esccallback, callback) {
    if (parseInt(data.PACIENTE) < 2000) {
        console.debug('SER836 menor a 100 PACIENTE');
        callback();
    } else {
        var SER836 = [];
        console.debug(datosEnvio() + data.PACIENTE + '|' + data.FECHA + '|' + data.ANO + '|');
        let URL = get_url("APP/SALUD/SER836.DLL");
        postData({
            datosh: datosEnvio() + data.PACIENTE + '|' + data.FECHA + '|' + data.ANO + '|'
        }, URL)
            .then(data => {
                SER836 = data.CITAS;
                SER836.pop();
                if (SER836[0].LLAVE_CIT.trim() != '') {
                    _ventanaDatos({
                        titulo: '',
                        columnas: ["FECHA_CITA", "OBSER_CIT", "HORA_CIT", "NOMBRE_PROFESIONAL", "NOMBRE_CUP", "TIPO_FACT_CITA"],
                        data: SER836,
                        callback_esc: () => {
                            CON851P('04', esccallback, esccallback);
                        },
                        callback: data => {
                            console.debug(data);
                            CON851P('04', esccallback, () => { callback(data) });
                        }
                    });
                } else {
                    esccallback();
                }
            })
            .catch(error => {
                console.log(error);
                esccallback();
            });
    }
}

function SER836T(data, esccallback, callback) {
    var SER836T = [];
    let URL = get_url("APP/SALUD/SER836T.DLL");
    postData({
        datosh: datosEnvio() + data.PACIENTE + '|' + data.FECHA + '|' + data.AÑO + '|'
    }, URL)
        .then(data => {
            console.debug(data, 'SER836T');
            SER836T = data.CITASMED;
            SER836T.pop();
            if (SER836T[0].MEDICO.trim() != '') {
                _ventanaDatos({
                    titulo: '',
                    columnas: ["MEDICO", "HORA_CIT", "MED_CIT", "DESCRIP_TER"],
                    data: SER836T,
                    callback_esc: () => {
                        CON851P('04', esccallback, callback);
                    },
                    callback: data => {
                        CON851P('04', esccallback, callback);
                    }
                });
            } else {
                callback();
            }
        })
        .catch(error => {
            console.log(error);
            esccallback();
        });
}

function SER819H(data, esccallback, callback) {
    var SER819H = [];
    let URL = get_url("APP/SALUD/SER819H.DLL");
    postData({
        datosh: datosEnvio() + data.PACIENTE + '|'
    }, URL)
        .then(data => {
            console.debug(data, 'SER819H');
            SER819H = data.DIASDISPONIBLES;
            SER819H.pop();
            _ventanaDatos({
                titulo: '',
                columnas: ["FECHA", "OBSERVACION", "HORA_INGRESO1", "HORASALIDA1", "HORA_INGRESO2", "HORA_SALID2"],
                data: SER819H,
                callback_esc: () => {
                    esccallback(data);
                },
                callback: data => {
                    callback(data);
                }
            });
        })
        .catch(error => {
            console.log(error);
            esccallback();
        });
}
async function SER829(seleccion, esccallback, callback) {
    var SER829 = [];
    SER829.PROCEDIMIENTOS = [{ "COD": "1", "DESCRIP": "DIAGNOSTICO" }, { "COD": "2", "DESCRIP": "TERAPEUTICO" }, { "COD": "3", "DESCRIP": "PROTECION ESPECIFICA" }, { "COD": "4", "DESCRIP": "DETEC. TEMPRANA ENF. GENER" }, { "COD": "5", "DESCRIP": "DET. TEMPRANA ENF.PROF" }, { "COD": "9", "DESCRIP": "NO APLICA" }]
    POPUP({
        array: SER829.PROCEDIMIENTOS,
        titulo: 'TIPO DE PROCEDIMIENTO',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: seleccion,
        callback_f: esccallback
    }, callback)
}
async function SER834(data, esccallback, callback) {
    var SER834 = { NIT: data.NITUSU ? data.NITUSU : false, NACI: data.FECHANACI ? data.FECHANACI : false, SEXO: data.SEXOPACI ? data.SEXOPACI : false }
    SER834.DATOSV = [];

    if (SER834.NACI) {
        SER834.EDAD = calcular_edad(NACI);
        if (SER834.NIT == '844003225') {
            if ((SER834.SEXO == 'F') && (SER834.EDAD.unid_edad == 'A') && (SER834.EDAD.vlr_edad > 9 && SER834.EDAD.unid_edad < 51)) {
                SER834.DATOSV.push({ 'COD': '01', 'DESCRIP': consult_finalidad('1') });
            }

            if (SER834.EDAD.unid_edad == 'D') {
                SER834.DATOSV.push({ 'COD': '02', 'DESCRIP': consult_finalidad('2') });
            }

            if ((SER834.EDAD.unid_edad == 'A') && (SER834.EDAD.vlr_edad > 9 && SER834.EDAD.vlr_edad < 61)) {
                SER834.DATOSV.push({ 'COD': '03', 'DESCRIP': consult_finalidad('3') });
            }

            if ((SER834.EDAD.unid_edad == 'D' || SER834.EDAD.unid_edad == 'M') || (SER834.EDAD.unid_edad == 'A' && SER834.EDAD.vlr_edad < 10)) {
                SER834.DATOSV.push({ 'COD': '04', 'DESCRIP': consult_finalidad('4') });
            }

            if ((SER834.EDAD.unid_edad == 'A') && (SER834.EDAD.vlr_edad > 9 && SER834.EDAD.vlr_edad < 30)) {
                SER834.DATOSV.push({ 'COD': '05', 'DESCRIP': consult_finalidad('5') });
            }

            if ((SER834.SEXO == 'F') && (SER834.EDAD.unid_edad == 'A') && (SER834.EDAD.vlr_edad > 9 && SER834.EDAD.vlr_edad < 51)) {
                SER834.DATOSV.push({ 'COD': '06', 'DESCRIP': consult_finalidad('6') });
            }

            if (SER834.EDAD.unid_edad == 'A' && SER834.EDAD.vlr_edad > 29) {
                SER834.DATOSV.push({ 'COD': '07', 'DESCRIP': consult_finalidad('7') });
            }

            SER834.DATOSV.push({ 'COD': '08', 'DESCRIP': consult_finalidad('8') });

            if (SER834.EDAD.unid_edad == 'A' && SER834.EDAD.vlr_edad > 17) {
                SER834.DATOSV.push({ 'COD': '09', 'DESCRIP': consult_finalidad('9') });
            }

            SER834.DATOSV.push({ 'COD': '10', 'DESCRIP': consult_finalidad('10') }, { 'COD': '11', 'DESCRIP': consult_finalidad('11') });
        } else {
            if ((SER834.SEXO == 'F') && (SER834.EDAD.unid_edad == 'A') && (SER834.EDAD.vlr_edad > 9 && SER834.EDAD.vlr_edad < 51)) {
                SER834.DATOSV.push({ 'COD': '01', 'DESCRIP': consult_finalidad('1') });
            }

            if (SER834.EDAD.unid_edad == 'D') {
                SER834.DATOSV.push({ 'COD': '02', 'DESCRIP': consult_finalidad('2') });
            }

            if ((SER834.EDAD.unid_edad == 'A') && (SER834.EDAD.vlr_edad > 9 && SER834.EDAD.vlr_edad < 61)) {
                SER834.DATOSV.push({ 'COD': '03', 'DESCRIP': consult_finalidad('3') });
            }

            if ((SER834.EDAD.unid_edad == 'D' || SER834.EDAD.unid_edad == 'M') || (SER834.EDAD.unid_edad == 'A' && SER834.EDAD.vlr_edad < 12)) {
                if ((SER834.EDAD.unid_edad == 'D' || SER834.EDAD.unid_edad == 'M') || (SER834.EDAD.unid_edad == 'A' && SER834.EDAD.vlr_edad < 6)) {
                    SER834.DATOSV.push({ 'COD': '04', 'DESCRIP': "PRIMERA INFANCIA" });
                } else {
                    SER834.DATOSV.push({ 'COD': '04', 'DESCRIP': "INFANCIA" });
                }
            }

            if ((SER834.EDAD.unid_edad == 'A') && (SER834.EDAD.vlr_edad > 11 && SER834.EDAD.vlr_edad < 29)) {
                if (SER834.EDAD.vlr_edad > 11 && SER834.EDAD.vlr_edad < 18) {
                    SER834.DATOSV.push({ 'COD': '05', 'DESCRIP': "ADOLECENCIA" });
                } else {
                    SER834.DATOSV.push({ 'COD': '05', 'DESCRIP': "JUVENTU" });
                }
            }

            if ((SER834.SEXO == 'F') && (SER834.EDAD.unid_edad == 'A') && (SER834.EDAD.vlr_edad > 9 && SER834.EDAD.vlr_edad < 51)) {
                SER834.DATOSV.push({ 'COD': '06', 'DESCRIP': consult_finalidad('6') });
            }

            if (SER834.EDAD.unid_edad == 'A') {
                if (SER834.EDAD.vlr_edad > 28 && SER834.EDAD.vlr_edad < 60) {
                    SER834.DATOSV.push({ 'COD': '07', 'DESCRIP': "ADULTEZ" });
                }

                if (SER834.EDAD.vlr_edad > 59) {
                    SER834.DATOSV.push({ 'COD': '07', 'DESCRIP': "VEJEZ" });
                }
            }

            SER834.DATOSV.push({ 'COD': '08', 'DESCRIP': consult_finalidad('8') });

            if (SER834.EDAD.unid_edad == 'A' && SER834.EDAD.vlr_edad > 17) {
                SER834.DATOSV.push({ 'COD': '09', 'DESCRIP': consult_finalidad('9') });
            }

            SER834.DATOSV.push({ 'COD': '10', 'DESCRIP': consult_finalidad('10') }, { 'COD': '11', 'DESCRIP': consult_finalidad('11') });
        }
    } else {
        SER834.DATOSV = [
            { 'COD': '01', 'DESCRIP': consult_finalidad('1') },
            { 'COD': '02', 'DESCRIP': consult_finalidad('2') },
            { 'COD': '03', 'DESCRIP': consult_finalidad('3') },
            { 'COD': '04', 'DESCRIP': consult_finalidad('4') },
            { 'COD': '05', 'DESCRIP': consult_finalidad('5') },
            { 'COD': '06', 'DESCRIP': consult_finalidad('6') },
            { 'COD': '07', 'DESCRIP': consult_finalidad('7') },
            { 'COD': '08', 'DESCRIP': consult_finalidad('8') },
            { 'COD': '09', 'DESCRIP': consult_finalidad('9') },
            { 'COD': '10', 'DESCRIP': consult_finalidad('10') },
            { 'COD': '11', 'DESCRIP': consult_finalidad('11') }
        ]

    }
    POPUP({
        array: SER834.DATOSV,
        titulo: 'FINALIDAD DE LA CONSULTA',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: data.seleccion,
        callback_f: esccallback
    }, callback)
}

function SER830(data, esccallback, callback) {
    var SER830 = [];
    SER830 = [
        { 'COD': '01', 'DESCRIP': consult_atiendProf('1') },
        { 'COD': '02', 'DESCRIP': consult_atiendProf('2') },
        { 'COD': '03', 'DESCRIP': consult_atiendProf('3') },
        { 'COD': '04', 'DESCRIP': consult_atiendProf('4') },
        { 'COD': '05', 'DESCRIP': consult_atiendProf('5') },
        { 'COD': '06', 'DESCRIP': consult_atiendProf('6') },
        { 'COD': '07', 'DESCRIP': consult_atiendProf('7') },
        { 'COD': '08', 'DESCRIP': consult_atiendProf('8') },
        { 'COD': '09', 'DESCRIP': consult_atiendProf('9') },
        { 'COD': 'A', 'DESCRIP': consult_atiendProf('A') },
        { 'COD': 'B', 'DESCRIP': consult_atiendProf('B') },
        { 'COD': 'H', 'DESCRIP': consult_atiendProf('H') },
        { 'COD': 'I,', 'DESCRIP': consult_atiendProf('I') },
        { 'COD': 'O', 'DESCRIP': consult_atiendProf('O') },
        { 'COD': 'T', 'DESCRIP': consult_atiendProf('T') }
    ]
    POPUP({
        array: SER830,
        titulo: 'PROFESIONAL ATIENDE',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: data.seleccion,
        callback_f: esccallback,
        teclaAlterna: true
    }, callback)
}
function SER822B(data, esccallback, callback) {
    var SER822B = [];
    SER822B = [
        { 'COD': '01', 'DESCRIP': 'COPAGO' },
        { 'COD': '02', 'DESCRIP': 'CUOTA MODERADORA' },
        { 'COD': '03', 'DESCRIP': 'NO APLICA' }
    ]
    POPUP({
        array: SER822B,
        titulo: 'TIPO DE PAGO',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: data.seleccion,
        callback_f: esccallback
    }, callback)
}

function TIPOSERVICIOS(data, esccallback, callback) {
    POPUP({
        array: data.array,
        titulo: 'Tipo servicios',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: data.seleccion,
        callback_f: esccallback
    }, callback)
}
/////////// FUNCIONES PARA VENTANAS SALUD//////////

function consult_finalidad(codigo) {
    var msj = false;
    switch (codigo) {
        case '0':
            msj = ""
            break;
        case '1':
            msj = "ATENCION PARTO PUERPERIO";
            break;
        case '2':
            msj = "ATENCION REC.NACID";
            break;
        case '3':
            msj = "ATENC.PLANIF.FAMIL";
            break;
        case '4':
            msj = "DET.ALT CRECIM <10";
            break;
        case '5':
            msj = "DET.ALT.DESA.JOVEN";
            break;
        case '6':
            msj = "DET.ALT.EMBARAZO";
            break;
        case '7':
            msj = "DET.ALT. ADULTO";
            break;
        case '8':
            msj = "DET.ALT.AGUD.VISUA";
            break;
        case '9':
            msj = "DET.ENFERM.PROFES.";
            break;
        case '10':
            msj = "NO APLICA";
            break;
        case '11':
            msj = "PATOLOGIA CRONICA";
            break;
    }
    return msj;
}
function consult_atiendProf(codigo) {
    var msj = false;
    switch (codigo) {
        case '1':
            msj = "MEDICO ESPECIALISTA";
            break;
        case '2':
            msj = "MEDICO GENERAL";
            break;
        case '3':
            msj = "ENFERMERA";
            break;
        case '4':
            msj = "AUXILIAR ENFERMERIA";
            break;
        case '5':
            msj = "TERAPEUTAS Y OTROS";
            break;
        case '6':
            msj = "ENFERMERA JEFE PYP";
            break;
        case '7':
            msj = "SICOLOGIA";
            break;
        case '8':
            msj = "NUTRICIONISTA"
            break;
        case '9':
            msj = "NUTRICIONISTA";
            break;
        case 'A':
            msj = "SIN DETERMINAR";
            break;
        case 'B':
            msj = "AUDITOR MEDICO";
            break;
        case 'H':
            msj = "ODONTOLOGO";
            break;
        case 'I':
            msj = "HIGIENISTA ORAL";
            break;
        case 'O':
            msj = "OPTOMETRA";
            break;
        case 'T':
            msj = "TRABAJO SOCIAL";
            break;
        default:
            msj = false;
    }
    return msj;
}

function SER825(callbackAtras, callbackSig, orden_w) {
    var fuente = '<div id="popUp_paciente_491">' +
        '<div class="col-md-12">' +
        '<div class="portlet light no-padding">' +
        '<div class="portlet-body no-padding">' +
        '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
        '<div class="col-md-12 col-sm-12 col-xs-12" id="validar_paciente_SER825" style="display: flex;justify-content: center">' +
        '<div class="col-md-6">' +
        '<label>Doc. Identidad:</label>' +
        '<div class="input-group col-md-10 col-sm-10 col-xs-10">' +
        '<input type="text" id="paciente_SER825" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="15" data-orden="1" required="true" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div style="clear:both;"></div>' +
        '</div>'
    var dialogo = bootbox.dialog({
        title: "Consulta por paciente:",
        message: fuente,
        closeButton: false,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue hidden",
                callback: function () {

                }
            }
        },
    });
    dialogo.on('shown.bs.modal', function (e) {
        $('.modal-content').css({ 'width': '1000px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
        paciente_SER825(callbackAtras, callbackSig, orden_w)
    });
}


function paciente_SER825(callbackAtras, callbackSig, orden_w) {
    _toggleF8([{ input: 'paciente', app: 'SER825', funct: (e) => {f8Pacientes_SER825(e, callbackAtras, callbackSig, orden_w)}},])

    validarInputs(
        {
            form: "#validar_paciente_SER825",
            orden: '1'
        },
        function () {
            $('[data-bb-handler="main"]').click();
            $('#paciente_SER825').val()
            callbackAtras(callbackAtras)
        },
        function () {
            var id_historia = cerosIzq($('#paciente_SER825').val(), 15)
            $('#paciente_SER825').val(id_historia)

            var datos_envio = datosEnvio()
            datos_envio += id_historia
            datos_envio += '|'
            datos_envio += orden_w
            datos_envio += '|'
            let URL = get_url("APP/SALUD/SER825.DLL");
            postData({
                datosh: datos_envio
            }, URL)
                .then((data) => {
                    validarFacturas_SER825(data, callbackAtras, callbackSig, orden_w);
                })
                .catch(error => {
                    console.error(error)
                    paciente_SER825(callbackAtras, callbackSig, orden_w)
                });

        }

    )
}

function validarFacturas_SER825(data, callbackAtras, callbackSig, orden_w) {
    $('[data-bb-handler="main"]').click();
    f8comprob_sal491 = data.FACTURAS[0]
    console.log(f8comprob_sal491)
    f8comprob_sal491.TABLA.pop()
    _ventanaDatos({
        titulo: f8comprob_sal491.NOMBRE_PACI,
        columnas: ["SUC", "NRO_FACT", "FECHA", "CUENTA", "CLASE", "ARTICULO", "MEDICO", "DIAGNOSTICO_1", "DIAGNOSTICO_2", "COPAGO", "FINALID", "EMBAR"],
        data: f8comprob_sal491.TABLA,
        ancho: '90%',
        callback_esc: function () {
            callbackAtras(callbackAtras)
        },
        callback: function (data) {
            traerRegistroCompleto_SER825(data.LLAVE, callbackAtras, callbackSig, orden_w)
        }
    });
}

function traerRegistroCompleto_SER825(llave, callbackAtras, callbackSig, orden_w) {
    var datos_envio = datosEnvio();
    datos_envio += llave
    datos_envio += '|'

    let URL = get_url("APP/SALUD/SAL49.DLL");

    postData({
        datosh: datos_envio
    }, URL)
        .then((data) => {
            callbackSig(data);
        })
        .catch(error => {
            console.error(error)
            callbackAtras(callbackAtras)
        });
}

function f8Pacientes_SER825(e, callbackAtras, callbackSig, orden_w) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        $('[data-bb-handler="main"]').click();
        parametros = {
            valoresselect: ['Descripcion', 'Identificacion'],
            f8data: 'PACIENTES',
            columnas: [{
                title: 'COD'
            }, {
                title: 'NOMBRE'
            }, {
                title: 'EPS'
            }, {
                title: 'EDAD'
            }],
            callback: data => {
                console.debug(data);
                $('#paciente_SER825').val(data.COD)
                _enterInput($('#paciente_SER825'));
            },
            cancel: () => {
                paciente_SER825(callbackAtras, callbackSig, orden_w)
            }
        };
        F8LITE(parametros);
    }
}