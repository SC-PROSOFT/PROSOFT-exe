function SER835(data, esccallback, callback) {
    var SER835 = [];
    let URL = get_url("APP/SALUD/SER835.DLL");
    console.log(' data.PACIENTE + ' | ' + data.CLFACT + ' | ' + data.NITUSU', data.PACIENTE + '|' + data.CLFACT + '|' + data.NITUSU)
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
function SER829(seleccion, esccallback, callback) {
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
function SER834A(data, esccallback, callback) {
    var SER834A = { NIT: data.NITUSU ? data.NITUSU : false, NACI: data.FECHANACI ? data.FECHANACI : false, SEXO: data.SEXOPACI ? data.SEXOPACI : false }
    SER834A.DATOS = [];

    if (SER834A.NACI) {
        SER834A.EDAD = calcular_edad(NACI);
        if (SER834A.NIT == '844003225') {
            if ((SER834A.SEXO == 'F') && (SER834A.EDAD.unid_edad == 'A') && (SER834A.EDAD.vlr_edad > 9 && SER834A.EDAD.unid_edad < 51)) {
                SER834A.DATOS.push({ 'COD': '01', 'DESCRIP': get_finalidadConsulta('1') });
            }

            if (SER834A.EDAD.unid_edad == 'D') {
                SER834A.DATOS.push({ 'COD': '02', 'DESCRIP': get_finalidadConsulta('2') });
            }

            if ((SER834A.EDAD.unid_edad == 'A') && (SER834A.EDAD.vlr_edad > 9 && SER834A.EDAD.vlr_edad < 61)) {
                SER834A.DATOS.push({ 'COD': '03', 'DESCRIP': get_finalidadConsulta('3') });
            }

            if ((SER834A.EDAD.unid_edad == 'D' || SER834A.EDAD.unid_edad == 'M') || (SER834A.EDAD.unid_edad == 'A' && SER834A.EDAD.vlr_edad < 10)) {
                SER834A.DATOS.push({ 'COD': '04', 'DESCRIP': get_finalidadConsulta('4') });
            }

            if ((SER834A.EDAD.unid_edad == 'A') && (SER834A.EDAD.vlr_edad > 9 && SER834A.EDAD.vlr_edad < 30)) {
                SER834A.DATOS.push({ 'COD': '05', 'DESCRIP': get_finalidadConsulta('5') });
            }

            if ((SER834A.SEXO == 'F') && (SER834A.EDAD.unid_edad == 'A') && (SER834A.EDAD.vlr_edad > 9 && SER834A.EDAD.vlr_edad < 51)) {
                SER834A.DATOS.push({ 'COD': '06', 'DESCRIP': get_finalidadConsulta('6') });
            }

            if (SER834A.EDAD.unid_edad == 'A' && SER834A.EDAD.vlr_edad > 29) {
                SER834A.DATOS.push({ 'COD': '07', 'DESCRIP': get_finalidadConsulta('7') });
            }

            SER834A.DATOS.push({ 'COD': '08', 'DESCRIP': get_finalidadConsulta('8') });

            if (SER834A.EDAD.unid_edad == 'A' && SER834A.EDAD.vlr_edad > 17) {
                SER834A.DATOS.push({ 'COD': '09', 'DESCRIP': get_finalidadConsulta('9') });
            }

            SER834A.DATOS.push({ 'COD': '10', 'DESCRIP': get_finalidadConsulta('10') }, { 'COD': '11', 'DESCRIP': get_finalidadConsulta('11') });
        } else {
            if ((SER834A.SEXO == 'F') && (SER834A.EDAD.unid_edad == 'A') && (SER834A.EDAD.vlr_edad > 9 && SER834A.EDAD.vlr_edad < 51)) {
                SER834A.DATOS.push({ 'COD': '01', 'DESCRIP': get_finalidadConsulta('1') });
            }

            if (SER834A.EDAD.unid_edad == 'D') {
                SER834A.DATOS.push({ 'COD': '02', 'DESCRIP': get_finalidadConsulta('2') });
            }

            if ((SER834A.EDAD.unid_edad == 'A') && (SER834A.EDAD.vlr_edad > 9 && SER834A.EDAD.vlr_edad < 61)) {
                SER834A.DATOS.push({ 'COD': '03', 'DESCRIP': get_finalidadConsulta('3') });
            }

            if ((SER834A.EDAD.unid_edad == 'D' || SER834A.EDAD.unid_edad == 'M') || (SER834A.EDAD.unid_edad == 'A' && SER834A.EDAD.vlr_edad < 12)) {
                if ((SER834A.EDAD.unid_edad == 'D' || SER834A.EDAD.unid_edad == 'M') || (SER834A.EDAD.unid_edad == 'A' && SER834A.EDAD.vlr_edad < 6)) {
                    SER834A.DATOS.push({ 'COD': '04', 'DESCRIP': "PRIMERA INFANCIA" });
                } else {
                    SER834A.DATOS.push({ 'COD': '04', 'DESCRIP': "INFANCIA" });
                }
            }

            if ((SER834A.EDAD.unid_edad == 'A') && (SER834A.EDAD.vlr_edad > 11 && SER834A.EDAD.vlr_edad < 29)) {
                if (SER834A.EDAD.vlr_edad > 11 && SER834A.EDAD.vlr_edad < 18) {
                    SER834A.DATOS.push({ 'COD': '05', 'DESCRIP': "ADOLECENCIA" });
                } else {
                    SER834A.DATOS.push({ 'COD': '05', 'DESCRIP': "JUVENTU" });
                }
            }

            if ((SER834A.SEXO == 'F') && (SER834A.EDAD.unid_edad == 'A') && (SER834A.EDAD.vlr_edad > 9 && SER834A.EDAD.vlr_edad < 51)) {
                SER834A.DATOS.push({ 'COD': '06', 'DESCRIP': get_finalidadConsulta('6') });
            }

            if (SER834A.EDAD.unid_edad == 'A') {
                if (SER834A.EDAD.vlr_edad > 28 && SER834A.EDAD.vlr_edad < 60) {
                    SER834A.DATOS.push({ 'COD': '07', 'DESCRIP': "ADULTEZ" });
                }

                if (SER834A.EDAD.vlr_edad > 59) {
                    SER834A.DATOS.push({ 'COD': '07', 'DESCRIP': "VEJEZ" });
                }
            }

            SER834A.DATOS.push({ 'COD': '08', 'DESCRIP': get_finalidadConsulta('8') });

            if (SER834A.EDAD.unid_edad == 'A' && SER834A.EDAD.vlr_edad > 17) {
                SER834A.DATOS.push({ 'COD': '09', 'DESCRIP': get_finalidadConsulta('9') });
            }

            SER834A.DATOS.push({ 'COD': '10', 'DESCRIP': get_finalidadConsulta('10') }, { 'COD': '11', 'DESCRIP': get_finalidadConsulta('11') });
        }
    } else {
        SER834A.DATOS = [
            { 'COD': '01', 'DESCRIP': get_finalidadConsulta('1') },
            { 'COD': '02', 'DESCRIP': get_finalidadConsulta('2') },
            { 'COD': '03', 'DESCRIP': get_finalidadConsulta('3') },
            { 'COD': '04', 'DESCRIP': get_finalidadConsulta('4') },
            { 'COD': '05', 'DESCRIP': get_finalidadConsulta('5') },
            { 'COD': '06', 'DESCRIP': get_finalidadConsulta('6') },
            { 'COD': '07', 'DESCRIP': get_finalidadConsulta('7') },
            { 'COD': '08', 'DESCRIP': get_finalidadConsulta('8') },
            { 'COD': '09', 'DESCRIP': get_finalidadConsulta('9') },
            { 'COD': '10', 'DESCRIP': get_finalidadConsulta('10') },
            { 'COD': '11', 'DESCRIP': get_finalidadConsulta('11') }
        ]

    }
    POPUP({
        array: SER834A.DATOS,
        titulo: 'FINALIDAD DE LA CONSULTA',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: data.seleccion,
        callback_f: esccallback
    }, callback)
}

function SER818(data, esccallback, callback) {
    var SER818 = {
        SWMARCA: data.SWMARCA ? data.SWMARCA : false,
        SWEVOL: data.SWEVOL ? data.SWEVOL : false,
        DESDE: data.DESDE ? data.DESDE : false,
        HASTA: data.HASTA ? data.HASTA : false
    };
    var datos_envio = datosEnvio()
    datos_envio += SER818.SWMARCA + '|'
    datos_envio += SER818.SWEVOL + '|'
    datos_envio += SER818.DESDE + '|'
    datos_envio += SER818.HASTA + '|'

    let URL = get_url("APP/SALUD/SAL451-01.DLL");
    postData({
        datosh: datos_envio
    }, URL)
        .then((data) => {
            data.PENDIENTES_FACT_HC.pop();
            if (data.PENDIENTES_FACT_HC == '') {
                jAlert({ titulo: 'Error ', mensaje: 'No hay registros de pendientes por facturar HC' }, _toggleNav);
            } else {
                POPUP({
                    array: data.PENDIENTES_FACT_HC,
                    titulo: 'CONSULTA DE ATENCIÓN MEDICA POR FECHA',
                    callback_f: esccallback
                }, callback)
            }
        }).catch(err => {
            console.debug(err);
        })
}

function SER830(data, esccallback, callback) {
    var SER830 = [];
    SER830 = [
        { 'COD': '1', 'DESCRIP': consult_atiendProf('1') },
        { 'COD': '2', 'DESCRIP': consult_atiendProf('2') },
        { 'COD': '3', 'DESCRIP': consult_atiendProf('3') },
        { 'COD': '4', 'DESCRIP': consult_atiendProf('4') },
        { 'COD': '5', 'DESCRIP': consult_atiendProf('5') },
        { 'COD': '6', 'DESCRIP': consult_atiendProf('6') },
        { 'COD': '7', 'DESCRIP': consult_atiendProf('7') },
        { 'COD': '8', 'DESCRIP': consult_atiendProf('8') },
        { 'COD': '9', 'DESCRIP': consult_atiendProf('9') },
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
    if (data.popup == 'off') {
        callback(SER822B.find(e => e.COD == data.seleccion))
    } else {
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
}
function TIPOSERVICIOS(data, esccallback, callback) {
    var TIPOSER = [
        { 'COD': '01', 'DESCRIP': 'CIRUGIAS' },
        { 'COD': '02', 'DESCRIP': 'LABORATORIO' }];

    if ($_USUA_GLOBAL[0].NIT == 800156469) {
        TIPOSER.push(
            { 'COD': '03', 'DESCRIP': 'ECOGRAFIAS, DOPPLER, T.A.C, RESONACIA NUCLEAR' },
            { 'COD': '04', 'DESCRIP': 'ESTANCIA Y OTROS' },
            { 'COD': '05', 'DESCRIP': 'CONSULTA Y TERAPIAS' },
            { 'COD': '06', 'DESCRIP': 'PATOLOGIA Y CITOLOGIA' },
            { 'COD': '07', 'DESCRIP': 'PROMOCION Y PREVENCION' })
    } else {
        TIPOSER.push(
            { 'COD': '03', 'DESCRIP': 'RX iMAGENEOLOGIA' },
            { 'COD': '04', 'DESCRIP': 'ESTANCIA Y OTROS' },
            { 'COD': '05', 'DESCRIP': 'CONSULTA Y TERAPIAS' },
            { 'COD': '06', 'DESCRIP': 'PATOLOGIA Y CITOLOGIA' },
            { 'COD': '07', 'DESCRIP': 'PROMOCION Y PREVENCION' })
    }
    if (data.popup == 'off') {
        callback(TIPOSER.find(ts => ts.COD == data.seleccion))
    } else {
        POPUP({
            array: TIPOSER,
            titulo: 'Tipo servicios',
            indices: [{
                id: 'COD',
                label: 'DESCRIP'
            }],
            seleccion: data.seleccion,
            callback_f: esccallback
        }, callback)
    }
}
/////////// FUNCIONES PARA VENTANAS SALUD//////////

function get_finalidadConsulta(codigo) {
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

// REQUIERE ENVIAR ORDEN-W PARA DETERMINAR CUAL .DAT ABRIR DEL FD-SALUD, SI NO ENVIA ORDEN-W POR LINKAGE, ENVIE '1'
function paciente_SER825(callbackAtras, callbackSig, orden_w) {
    _toggleF8([{ input: 'paciente', app: 'SER825', funct: (e) => { f8Pacientes_SER825(e, callbackAtras, callbackSig, orden_w) } },])

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

            llamado_ventana_SER825(id_historia, callbackAtras, callbackSig, orden_w)
        }

    )
}

function llamado_ventana_SER825(idHistoria, callbackAtras, callbackSig, orden_w) {
    var datos_envio = datosEnvio()
    datos_envio += idHistoria
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
            // paciente_SER825(callbackAtras, callbackSig, orden_w)
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
    console.log(datos_envio)
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
            dll: 'PACIENTES',
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
                llamado_ventana_SER825(data.COD, callbackAtras, callbackSig, orden_w)
            },
            cancel: () => {
                callbackAtras(callbackAtras)
            }
        };
        F8LITE(parametros);
    }
}