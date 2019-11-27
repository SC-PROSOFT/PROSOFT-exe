var array_rx421W = [];
var array_rx421w_ventana = []
var enfermedades_rx421w = [];
var profesionales_Rx421w = []
var macroEvoluciones_rx421w = []
var index, id_historia_rx421w

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');

    _toggleF8([
        { input: 'textarea', app: 'rx421w', funct: _ventanaMacroEvol_rx421w },
        { input: 'radiologo', app: 'rx421w', funct: _ventanaRadiologo_rx421w },
        { input: 'tecnologo', app: 'rx421w', funct: _ventanaTecnologo_rx421w },
        { input: 'diagPrincipal', app: 'rx421w', funct: _ventanaEnfermedad_rx421w }
    ]);
    // var datos_envio = datosEnvio();
    // console.log(datos_envio)
    // let URL = get_url("APP/SALUD/SER851.DLL");
    // postData({ datosh: datos_envio }, URL)
    //     .then(function (data) {
    //         enfermedades_rx421w = data
    //         console.log(enfermedades_rx421w)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         loader("hide")
    //         console.log('errorrrrrrrrrrr')
    //     })
    $('#Boton_email_rx421w').hide()
    $('#imprimir_rx421w').hide()
    incio_rx421w()
});
function incio_rx421w() {
    obtenerDatosCompletos({ nombreFd: 'PROFESIONALES' }, recibirProfesionales_Rx421w)
}
// pendienteeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// function recibirMacroEvol_rx421w(data){
//     macroEvoluciones_rx421w = data.MACRO-EVOL
//     macroEvoluciones_rx421w.pop()
//     obtenerDatosCompletos('PROFESIONALES', recibirProfesionales_Rx421w)
// }

function recibirProfesionales_Rx421w(data) {
    profesionales_Rx421w = data.ARCHPROF
    profesionales_Rx421w.pop()
    popUp_idHistoria_rx421w()
}

function _ventanaMacroEvol_rx421w(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana plantillas',
            columnas: ["CODIGO", "DESCRIPCION"],
            data: macroEvoluciones_rx421w,
            callback_esc: function () {
                $('#textarea_rx421w').focus()
            },
            callback: function (data) {
                console.log(data)
                $('#textarea_rx421w').val(data.tabla_macroevol.trim());
                setTimeout(() => { $('#textarea_rx421w').focus() }, 100)
            }
        });
    }
}

function _ventanaRadiologo_rx421w(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana profesionales',
            columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO", "LU", "MA", "MI", "JU", "VI", "SA"],
            data: profesionales_Rx421w,
            callback_esc: function () {
                $('#radiologo_rx421w').focus()
            },
            callback: function (data) {
                console.log(data)
                $('#radiologo_rx421w').val(data.IDENTIFICACION);
                $('#descrip1Radiologo_rx421w').val(data.REG_MEDICO);
                $('#descrip2Radiologo_rx421w').val(data.NOMBRE);
                _enterInput('#radiologo_rx421w');
            }
        });
    }
}

function _ventanaTecnologo_rx421w(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana profesionales',
            columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO", "LU", "MA", "MI", "JU", "VI", "SA"],
            data: profesionales_Rx421w,
            callback_esc: function () {
                $('#tecnologo_rx421w').focus()
            },
            callback: function (data) {
                console.log(data)
                $('#tecnologo_rx421w').val(data.IDENTIFICACION);
                $('#descripTecnologo_rx421w').val(data.NOMBRE);
                _enterInput('#tecnologo_rx421w');
            }
        });
    }
}

function _ventanaEnfermedad_rx421w(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana enfermedades',
            columnas: ["COD_ENF", "NOMBRE_ENF"],
            label: ["codigo", "nombre"],
            data: enfermedades_rx421w,
            callback_esc: function () {
                $('#diagPrincipal_rx421w').focus()
            },
            callback: function (data) {
                console.log(data)
                $('#diagPrincipal_rx421w').val(data.COD_ENF.trim());
                $('#descripDiagPrincipal_rx421w').val(data.NOMBRE_ENF.trim());
                _enterInput('#diagPrincipal_rx421w');
            }
        });
    }
}


function popUp_idHistoria_rx421w() {
    var fuente = $('#popUp_paciente_rx421w').html();
    var dialogo = bootbox.dialog({
        title: "Consulta estudio facturados:",
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
        validar_idHistoria_rx421w()
    });
}

function validar_idHistoria_rx421w() {
    validarInputs(
        {
            form: "#validar_idhistoria_rx421w",
            orden: '1'
        },
        function () {
            $('[data-bb-handler="main"]').click();
            var historia = $('.id_historia_rx421w')
            $(historia[1]).val('')
            _toggleNav()
            console.log('salioooo')
        },
        function () {
            var id = $('.id_historia_rx421w')
            id_historia_rx421w = cerosIzq($(id[1]).val(), 15)
            $(id[1]).val(id_historia_rx421w)
            console.log(id_historia_rx421w)
            loader("show")
            consultaDatos_rx421w()
        }
    )
}

function consultaDatos_rx421w() {
    var datos_envio = datosEnvio();
    datos_envio += localStorage.Usuario + '|' + id_historia_rx421w + "|"
    let URL = get_url("APP/SALUD/RX-421W.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            asignarDatosArray_rx421w(data)
        })
        .catch(err => {
            console.log(err);
            loader("hide")
            validar_idHistoria_rx421w()
        })
}

function asignarDatosArray_rx421w(llegada) {
    var data = llegada["RESULTADOS-RX"]
    console.log(data)

    for (var i in data) {
        array_rx421W.push({
            fecha_fact: moment(data[i].FECHA_FACT).format("YYYY/MM/DD"),
            suc_fact: data[i].SUC_FACT,
            cl_fact: data[i].CL_FACT,
            nro_fact: data[i].NRO_FACT,
            grupo_fact: data[i].GRUPO_FACT,
            cod_art_fact: data[i].COD_ART_FACT,
            clase_art_fact: data[i].CLASE_ART_FACT,
            item_fact: data[i].ITEM_FACT,
            descrip_cup: data[i].DESCRIP_CUP,
            nit_usu: data[i].NIT_USU,
            id_historia_Fact: data[i].ID_HISTORIA_FACT,
            descrip_paci: data[i].DESCRIP_PACI,
            id_radiologo: data[i].ID_RADIOLOGO,
            nom_medico: data[i].NOM_MEDICO,
            reg_medico: data[i].REG_MEDICO,
            id_tecnologo: data[i].ID_TECNOLOGO,
            nom_tecnologo: data[i].NOM_TECNOLOGO,
            edad: data[i].EDAD,
            sexo: data[i].SEXO,
            sala: data[i].SALA,
            cta_num: data[i].CTA_NUM,
            id_entidad: data[i].ID_ENTIDAD,
            dx: data[i].DX,
            tipo_dx: data[i].TIPO_DX,
            descrip_dx: data[i].DESCRIP_DX,
            admi_modif: data[i].ADMI_MODIF,
            fecha_modif: moment(data[i].FECHA_MODIF).format("YYYY/MM/DD"),
            // fecha_transc: moment(data[i].HORA_MODIF).format("HH:mm:ss"),
            hora_modif: data[i].HORA_MODIF,
            admi_transc: data[i].ADMI_TRANS,
            fecha_transc: moment(data[i].FECHA_TRANS).format("YYYY/MM/DD"),
            // hora_transc: moment(data.HORA_TRANS).format("HH:mm:ss"),
            hora_transc: data[i].HORA_TRANS,
            birads: data[i].BIRADS,
            complejidad: data[i].COMPLEJIDAD,
            normalidad: data[i].NORMALIDAD,
            email: data[i].EMAIL,
            fecha_email: moment(data[i].FECHA_EMAIL).format("YYYY/MM/DD"),
            hora_email: data[i].HORA_EMAIL,
            archivo_msj: data[i].ARCHIVO_MSG,
            resultado_ppal: data[i].RESULTADO_PPAL,
            resultado_comp: data[i].RESULTADO_COMP,
            resultado_adic: data[i].RESULTADO_ADIC,
            pagina: ''
        })
    }
    array_rx421W.pop()
    console.log(array_rx421W)
    $('[data-bb-handler="main"]').click();
    mostrarTabla_rx421w()
}


function mostrarTabla_rx421w() {

    for (var i in array_rx421W) {
        array_rx421w_ventana.push({
            Fecha: array_rx421W[i].fecha_fact,
            Comprobante: array_rx421W[i].suc_fact + array_rx421W[i].cl_fact + array_rx421W[i].nro_fact,
            Item: array_rx421W[i].item_fact,
            Cups: array_rx421W[i].grupo_fact + array_rx421W[i].cod_art_fact + array_rx421W[i].clase_art_fact,
            Estudio: array_rx421W[i].descrip_cup,
            Nit: array_rx421W[i].nit_usu,
            Llave: array_rx421W[i].nit_usu + array_rx421W[i].suc_fact + array_rx421W[i].cl_fact + array_rx421W[i].nro_fact
        })
    }

    _ventanaDatos({
        titulo: 'Consulta estudios facturados',
        columnas: ["Fecha", "Comprobante", "Item", "Cups", "Estudio", "Nit"],
        data: array_rx421w_ventana,
        callback_esc: function () {
            _toggleNav()
        },
        callback: function (data) {
            console.log(data)
            var llaveEscogida = data.Nit + data.Comprobante
            console.log(llaveEscogida)
            index = array_rx421w_ventana.findIndex(llave => llave.Llave == llaveEscogida);
            console.log(index)
            mostrarDatos_rx421w(index)
        }
    });
}

function mostrarDatos_rx421w(index) {
    if (array_rx421W[index].fecha_fact != 'Invalid date') {
        $('#fecha_rx421w').val(array_rx421W[index].fecha_fact)
    }
    $('#paciente_rx421w').val(array_rx421W[index].id_historia_Fact)
    $('#descripPaciente_rx421w').val(array_rx421W[index].descrip_paci)
    $('#sucursal_rx421w').val(array_rx421W[index].suc_fact)
    $('#servicio_rx421w').val(array_rx421W[index].cl_fact)
    $('#descripServicio_rx421w').val('RX e Imagenologia')
    $('#comprob_rx421w').val(array_rx421W[index].nro_fact)
    $('#cups2_rx421w').val(array_rx421W[index].grupo_fact + array_rx421W[index].cod_art_fact + array_rx421W[index].clase_art_fact)
    $('#cups1_rx421w').val(array_rx421W[index].item_fact)
    $('#radiologo_rx421w').val(array_rx421W[index].id_radiologo)
    $('#descrip1Radiologo_rx421w').val(array_rx421W[index].reg_medico)
    $('#descrip2Radiologo_rx421w').val(array_rx421W[index].nom_medico)
    $('#tecnologo_rx421w').val(array_rx421W[index].id_tecnologo)
    $('#descripTecnologo_rx421w').val(array_rx421W[index].nom_tecnologo)
    $('#sala_rx421w').val(array_rx421W[index].sala)
    $('#cuenta_rx421w').val(array_rx421W[index].cta_num)
    $('#nit_rx421w').val(array_rx421W[index].id_entidad)
    var tipo_dx = array_rx421W[index].tipo_dx
    $('#tipoDiag_rx421w').val(tipo_dx)
    var descrip_dx
    switch (tipo_dx) {
        case '1': descrip_dx = 'Impresion diagnostica'
            break;
        case '2': descrip_dx = 'Confirmado nuevo'
            break;
        case '3': descrip_dx = 'Confirmado repetido'
            break;
        case '9': descrip_dx = 'No aplica'
            break;
    }
    $('#descripTipoDiag_rx421w').val(descrip_dx)

    $('#actualizo_rx421w').val(array_rx421W[index].admi_modif)
    if (array_rx421W[index].hora_modif != null && array_rx421W[index].hora_modif != undefined && array_rx421W[index].hora_modif != 'Invalid date') {
        if (array_rx421W[index].fecha_modif != null && array_rx421W[index].fecha_modif != undefined && array_rx421W[index].fecha_modif != 'Invalid date') {
            $('#fecha_modif_rx421w').val(array_rx421W[index].fecha_modif + ' - ' + array_rx421W[index].hora_modif)
        }
    }

    $('#transcribio_rx421w').val(array_rx421W[index].admi_transc)
    if (array_rx421W[index].hora_transc != null || array_rx421W[index].hora_transc != undefined && array_rx421W[index].hora_transc != 'Invalid date') {
        if (array_rx421W[index].fecha_transc != null && array_rx421W[index].fecha_transc != undefined && array_rx421W[index].fecha_transc != 'Invalid date') {
            $('#fecha_transc_rx421w').val(array_rx421W[index].fecha_transc + ' - ' + array_rx421W[index].hora_transc)
        }
    }

    $('#diagPrincipal_rx421w').val(array_rx421W[index].dx)
    $('#descripDiagPrincipal_rx421w').val(array_rx421W[index].descrip_dx)
    $('#birads_rx421w').val(array_rx421W[index].birads)
    $('#complej_rx421w').val(array_rx421W[index].complejidad)

    switch (array_rx421W[index].normalidad) {
        case '0':
            $('#normal_rx421w').val('No definida')
            break;
        case '1':
            $('#normal_rx421w').val('Normal')
            break;
        case '2':
            $('#normal_rx421w').val('Anormal')
            break;
    }

    $('#email_rx421w').val(array_rx421W[index].email)
    if (array_rx421W[index].hora_email != null && array_rx421W[index].hora_email != undefined && array_rx421W[index].hora_email != 'Invalid date') {
        if (array_rx421W[index].fecha_email != null && array_rx421W[index].fecha_email != undefined && array_rx421W[index].fecha_email != 'Invalid date') {
            $('#enviado_rx421w').val(array_rx421W[index].fecha_email + ' - ' + array_rx421W[index].hora_email)
        }
    }
    $('#archivomsj_rx421w').val(array_rx421W[index].archivo_msj)
    // var pagina = array_rx421W[index].pagina
    // switch (pagina) {
    //     case '0':
    $('#pagina_rx421w').val('1')
    $('#descripPagina_rx421w').val('Resultado principal')
    $('#textarea_rx421w').val(array_rx421W[index].resultado_ppal)
    // break;
    //     case '1':
    //         $('#pagina_rx421w').val('2')
    //         $('#descripPagina_rx421w').val('Resultado complementario')
    //         $('#textarea_rx421w').val(array_rx421W[index].resultado_comp)
    //         break;
    //     case '2':
    //         $('#pagina_rx421w').val('3')
    //         $('#descripPagina_rx421w').val('Resultado adicional')
    //         $('#textarea_rx421w').val(array_rx421W[index].resultado_adic)
    //         break;
    // }
    $('#imprimir_rx421w').show()
    $('#Boton_email_rx421w').show()

    loader('hide')
    validarRadiologo_rx421w()
}

function salir_rx421w() {
    $('#Boton_email_rx421w').hide()
    $('#imprimir_rx421w').hide()
    _inputControl('reset');
    _inputControl('disabled');
    array_rx421W = []
    array_rx421w_ventana = []
    profesionales_Rx421w = []
    enfermedades_rx421w = []
    macroEvoluciones_rx421w = []
    index = ''
    id_historia_rx421w = ''
    limpiar_inputs_rx421w()
    _toggleNav()
}


function limpiar_inputs_rx421w() {
    $('#sucursal_rx421w').val('');
    $('#servicio_rx421w').val('');
    $('#descripServicio_rx421w').val('');
    $('#comprob_rx421w').val('');
    $('#fecha_rx421w').val('');
    $('#paciente_rx421w').val('');
    $('#cups1_rx421w').val('');
    $('#cups2_rx421w').val('');
    $('#descripPaciente_rx421w').val('');
    $('#radiologo_rx421w').val('');
    $('#descrip1Radiologo_rx421w').val('');
    $('#descrip2Radiologo_rx421w').val('');
    $('#tecnologo_rx421w').val('');
    $('#descripTecnologo_rx421w').val('');
    $('#estudio_rx421w').val('');
    $('#descripEstudio_rx421w').val('');
    $('#cuenta_rx421w').val('');
    $('#nit_rx421w').val('');
    $('#sala_rx421w').val('');
    $('#textarea_rx421w').val('');
    $('#tipoDiag_rx421w').val('');
    $('#descripTipoDiag_rx421w').val('');
    $('#diagPrincipal_rx421w').val('');
    $('#descripDiagPrincipal_rx421w').val('');
    $('#birads_rx421w').val('');
    $('#complej_rx421w').val('');
    $('#normal_rx421w').val('');
    $('#email_rx421w').val('');
    $('#enviado_rx421w').val('');
    $('#actualizo_rx421w').val('');
    $('#fecha_modif_rx421w').val('');
    $('#transcribio_rx421w').val('');
    $('#fecha_transc_rx421w').val('');
    $('#archivomsj_rx421w').val('');
}

$('#Boton_email_rx421w').click(function () {
    var email_envio_rx

    if (array_rx421W[index].email.trim().length() == 0) {
        jAlert(
            { titulo: 'Error', mensaje: 'Paciente no tiene email especificado' },
            $('#validarRadiologo_rx421w').focus()
        );
    } else {
        switch (array_rx421W[index].suc_fact) {
            case 'UN':
                email_envio_rx = '0'
                break;
            case '80':
                email_envio_rx = '1'
                break;
            case 'PT':
                email_envio_rx = '2'
                break;
            case 'MD':
                email_envio_rx = '3'
                break;
            case 'CZ':
                email_envio_rx = '4'
                break;
            default:
                email_envio_rx = '5'
                break;
        }
    }


});




$("#imprimir_rx421w").click(function () {
    pre_impresion_rx421w()
});

function pre_impresion_rx421w() {
    loader('show')
    obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, Impresion_RX_421w)
}

function Impresion_RX_421w(data) {
    var terceros = data.TERCEROS
    terceros.pop()

    if (array_rx421W[index].id_entidad == '          ' || array_rx421W[index].id_entidad.length == 0) {
        array_rx421W[index].id_entidad = "0900219120"
    }

    var busqueda = terceros.find(tercero => tercero.COD == array_rx421W[index].id_entidad)
    console.log(busqueda)
    moment.locale('es')
    var envio_rxi02 = [
        {
            FECHA_FACTRX: moment(array_rx421W[index].fecha_fact).format('MMM. D/YYYY'),
            DESCRIP_PACIRX: array_rx421W[index].descrip_paci,
            COMPROBANTE: array_rx421W[index].suc_fact + array_rx421W[index].cl_fact + array_rx421W[index].nro_fact,
            IDHIS_FACTRX: id_historia_rx421w,
            EDAD_RX: array_rx421W[index].edad,
            REGMED_RX: array_rx421W[index].reg_medico,
            DESCRIP1_CUPRX: array_rx421W[index].descrip_cup,
            SEXO_RX: array_rx421W[index].sexo,
            DESCRIP_TER: busqueda.NOMBRE,
            IDRADIOLOGO_RX: array_rx421W[index].id_radiologo,
            NOMMEDICO_RX: array_rx421W[index].nom_medico,
            HTMLRESULTADOPPAL: array_rx421W[index].resultado_ppal,
            HTMLCOMPPPAL: array_rx421W[index].resultado_comp,
            HTMLDICPPAL: array_rx421W[index].resultado_adic,
            NIT: array_rx421W[index].nit_usu.substring(2, 10),
            USU: $_USUA_GLOBAL[0].NOMBRE
        }
    ]

    var hora_Actual = moment().format('HHmmss')
    var nombre_pdf = 'RX-' + array_rx421W[index].suc_fact + array_rx421W[index].cl_fact + array_rx421W[index].nro_fact + hora_Actual

    console.log(envio_rxi02)
    var Impresion_RX_421w = {
        datos: envio_rxi02[0],
        tipo: 'pdf',
        formato: 'rx/RXI02A.html',
        nombre: nombre_pdf
    }

    imprimir(Impresion_RX_421w, finImpresion_RX_421w);
}

function finImpresion_RX_421w() {
    console.log('termino')
    loader('hide')
    $('#Boton_email_rx421w').hide()
    $('#imprimir_rx421w').hide()
    volverAinicio_rx421w()
}

function validarRadiologo_rx421w() {
    validarInputs(
        {
            form: "#validarRadiologo_rx421w",
            orden: '1',
            event_f3: function () { pre_impresion_rx421w() }
        },
        function () { salir_rx421w() },
        function () {
            var radiologo = $('#radiologo_rx421w').val()

            var busqueda = profesionales_Rx421w.find(profesional => profesional.IDENTIFICACION == espaciosIzq(radiologo, 10))

            if (busqueda) {
                array_rx421W[index].id_radiologo = cerosIzq(busqueda.IDENTIFICACION, 10)
                array_rx421W[index].reg_medico = busqueda.REG_MEDICO
                array_rx421W[index].nom_medico = busqueda.NOMBRE
                $('#radiologo_rx421w').val(array_rx421W[index].id_radiologo);
                $('#descrip1Radiologo_rx421w').val(array_rx421W[index].reg_medico);
                $('#descrip2Radiologo_rx421w').val(array_rx421W[index].nom_medico);
                $('#Boton_email_rx421w').hide()
                $('#imprimir_rx421w').hide()
                validarTecnologo_rx421w()
            } else {
                CON851('01', '01', null, 'error', 'error');
                validarRadiologo_rx421w()
            }

        }
    )
}

function validarTecnologo_rx421w() {
    validarInputs(
        {
            form: "#validarTecnologo_rx421w",
            orden: '1'
        },
        function () {
            $('#imprimir_rx421w').show()
            $('#Boton_email_rx421w').show()
            validarRadiologo_rx421w()
        },
        function () {
            var tecnologo = $('#tecnologo_rx421w').val()

            var busqueda = profesionales_Rx421w.find(profesional => profesional.IDENTIFICACION == espaciosIzq(tecnologo, 10))

            if (tecnologo.length > 0) {
                if (busqueda) {
                    array_rx421W[index].id_tecnologo = cerosIzq(busqueda.IDENTIFICACION, 10)
                    array_rx421W[index].nom_tecnologo = busqueda.NOMBRE
                    $('#tecnologo_rx421w').val(array_rx421W[index].id_tecnologo);
                    $('#descripTecnologo_rx421w').val(array_rx421W[index].nom_tecnologo);
                    validarTablaResult_rx421w()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    validarTecnologo_rx421w()
                }
            } else {
                array_rx421W[index].id_tecnologo = ''
                array_rx421W[index].nom_tecnologo = ''
                validarTablaResult_rx421w()
            }

        }
    )
}

function validarTablaResult_rx421w() {
    var arrayTablaResult_rx_421w = [
        { "COD": "1", "DESCRIP": "Resultado principal" },
        { "COD": "2", "DESCRIP": "Resultado complementario" },
        { "COD": "3", "DESCRIP": "Resultado adicional" }
    ]

    POPUP({
        array: arrayTablaResult_rx_421w,
        titulo: 'Tipo de resultado',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: validarTecnologo_rx421w
    }, function (data) {
        array_rx421W[index].pagina = data.COD.trim()
        switch (array_rx421W[index].pagina) {
            case '1':
                $('#pagina_rx421w').val('1')
                $('#descripPagina_rx421w').val('Resultado principal')
                $('#textarea_rx421w').val(array_rx421W[index].resultado_ppal)
                break;
            case '2':
                $('#pagina_rx421w').val('2')
                $('#descripPagina_rx421w').val('Resultado complementario')
                $('#textarea_rx421w').val(array_rx421W[index].resultado_comp)
                break;
            case '3':
                $('#pagina_rx421w').val('3')
                $('#descripPagina_rx421w').val('Resultado adicional')
                $('#textarea_rx421w').val(array_rx421W[index].resultado_adic)
                break;
        }
        validarTextarea_rx421w()
    })
}

function validarTextarea_rx421w() {
    validarInputs(
        {
            form: "#validartextarea_rx421w",
            orden: '1',
            event_f3: function () { validarTipoDiag_rx421w() }
        },
        function () { validarTecnologo_rx421w() },
        function () {
            validarTipoDiag_rx421w()
        }
    )
}

function validarTipoDiag_rx421w() {
    var arrayTipoDiag_rx_421w = [
        { "COD": "1", "DESCRIP": "Impresion diagnostica" },
        { "COD": "2", "DESCRIP": "Confirmado nuevo" },
        { "COD": "3", "DESCRIP": "Confirmado repetido" },
        { "COD": "9", "DESCRIP": "No aplica" }
    ]

    POPUP({
        array: arrayTipoDiag_rx_421w,
        titulo: 'Tipo de diagnostico',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: validarTextarea_rx421w
    }, function (data) {
        array_rx421W[index].tipo_dx = data.COD.trim()
        $('#tipoDiag_rx421w').val(data.COD.trim())
        $('#descripTipoDiag_rx421w').val(data.DESCRIP.trim())
        obtenerDatosCompletos({ nombreFd: 'ENFERMEDADES' }, recibirEnfermedad_rx421w)
    })
}

function recibirEnfermedad_rx421w(data) {
    enfermedades_rx421w = data.ENFERMEDADES
    enfermedades_rx421w.pop()
    console.log(enfermedades_rx421w)
    if (enfermedades_rx421w.length == 0) {
        jAlert(
            { titulo: 'Error', mensaje: 'No se han encontrado enfermedades' },
            validarTipoDiag_rx421w
        );
    } else {
        validarDiagPrin_rx421w()
    }
}

function validarDiagPrin_rx421w() {
    validarInputs(
        {
            form: "#validarDiagPrincipal_rx421w",
            orden: '1'
        },
        function () { validarTipoDiag_rx421w() },
        function () {
            var enfer = cerosIzq($('#diagPrincipal_rx421w').val(), 4)

            var busqueda = enfermedades_rx421w.find(enfermedad => enfermedad.COD_ENF == enfer)

            if (busqueda) {
                array_rx421W[index].dx = enfer
                array_rx421W[index].descrip_dx = busqueda.NOMBRE_ENF
                $('#descripDiagPrincipal_rx421w').val(array_rx421W[index].descrip_dx)
                validarBirads_rx421w()
            } else {
                CON851('01', '01', null, 'error', 'error');
                validarDiagPrin_rx421w()
            }
        }
    )
}

function validarBirads_rx421w() {
    validarInputs(
        {
            form: "#validarBirads_rx421w",
            orden: '1'
        },
        function () { validarTipoDiag_rx421w() },
        function () {
            var birads = $('#birads_rx421w').val()

            switch (birads) {
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                    array_rx421W[index].birads = birads
                    validarComplejidad_Rx421w()
                    break;
                default:
                    CON851('01', '01', null, 'error', 'error');
                    validarBirads_rx421w()
                    break;
            }
        }
    )
}

function validarComplejidad_Rx421w() {
    validarInputs(
        {
            form: "#validarComplejidad_Rx421w",
            orden: '1'
        },
        function () { validarTipoDiag_rx421w() },
        function () {
            var complejidad = $('#complej_rx421w').val()

            switch (complejidad) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                    array_rx421W[index].complejidad = complejidad
                    CON851P('01', validarComplejidad_Rx421w, grabar_rx421w);
                    break;
                default:
                    CON851('01', '01', null, 'error', 'error');
                    validarComplejidad_Rx421w()
                    break;
            }
        }
    )
}

function grabar_rx421w() {
    var text_area = $('#textarea_rx421w').val()
    var nombre = localStorage.Usuario + '_' + moment().format('YYYYMMDDhhmmssSS');
    var nombre_archivo = 'C:\\PROSOFT\\TEMP\\' + nombre + '.txt';
    fs.writeFile(nombre_archivo, text_area, function (err) {
        if (err) {
            loader('hide');
            jAlert({ titulo: 'Error 99', mensaje: 'Error escribiendo archivo txt', autoclose: true });
        }
        else {
            console.log(nombre_archivo)
            _grabardatos(nombre_archivo);
        }
    });
}


function _grabardatos(nombre_archivo) {
    loader('show')
    var nit = array_rx421W[index].nit_usu
    var suc = array_rx421W[index].suc_fact
    var clase = array_rx421W[index].cl_fact
    var nro_fact = array_rx421W[index].nro_fact

    var grupo = array_rx421W[index].grupo_fact
    var cod_Art = array_rx421W[index].cod_art_fact
    var clase_art_fact = array_rx421W[index].clase_art_fact
    var item = array_rx421W[index].item_fact

    var radiologo = cerosIzq(array_rx421W[index].id_radiologo, 10)
    var registro_medico = array_rx421W[index].reg_medico
    var nombre_radiologo = array_rx421W[index].nom_medico
    var tecnologo = cerosIzq(array_rx421W[index].id_tecnologo, 10)
    var nombre_tecnologo = array_rx421W[index].nom_tecnologo

    var pagina = array_rx421W[index].pagina

    var tipo_dx = array_rx421W[index].tipo_dx
    var dx = array_rx421W[index].dx
    var descrip_dx = array_rx421W[index].descrip_dx

    var birads = array_rx421W[index].birads
    var complejidad = array_rx421W[index].complejidad

    var fecha_modif = moment().format("YYYYMMDD")
    var hora_modif = moment().format("HHmmss")


    // LLAMADO_DLL({
    //     dato: [nit, suc, clase, nro_fact, grupo, cod_Art, clase_art_fact, item, radiologo, registro_medico, nombre_radiologo,
    //         tecnologo, nombre_tecnologo, tipo_dx, dx, descrip_dx, birads, complejidad, fecha_modif, hora_modif, pagina, nombre_archivo],
    //     callback: llegadaDll_Rx421w,
    //     nombredll: 'RX-421W-02',
    //     carpeta: 'SALUD'
    // });

    var datos_envio_rx421w = datosEnvio();
    datos_envio_rx421w += nit
    datos_envio_rx421w += '|'
    datos_envio_rx421w += suc
    datos_envio_rx421w += '|'
    datos_envio_rx421w += clase
    datos_envio_rx421w += '|'
    datos_envio_rx421w += nro_fact
    datos_envio_rx421w += '|'
    datos_envio_rx421w += grupo
    datos_envio_rx421w += '|'
    datos_envio_rx421w += cod_Art
    datos_envio_rx421w += '|'
    datos_envio_rx421w += clase_art_fact
    datos_envio_rx421w += '|'
    datos_envio_rx421w += item
    datos_envio_rx421w += '|'
    datos_envio_rx421w += radiologo
    datos_envio_rx421w += '|'
    datos_envio_rx421w += registro_medico
    datos_envio_rx421w += '|'
    datos_envio_rx421w += nombre_radiologo
    datos_envio_rx421w += '|'
    datos_envio_rx421w += tecnologo
    datos_envio_rx421w += '|'
    datos_envio_rx421w += nombre_tecnologo
    datos_envio_rx421w += '|'
    datos_envio_rx421w += tipo_dx
    datos_envio_rx421w += '|'
    datos_envio_rx421w += dx
    datos_envio_rx421w += '|'
    datos_envio_rx421w += descrip_dx
    datos_envio_rx421w += '|'
    datos_envio_rx421w += birads
    datos_envio_rx421w += '|'
    datos_envio_rx421w += complejidad
    datos_envio_rx421w += '|'
    datos_envio_rx421w += fecha_modif
    datos_envio_rx421w += '|'
    datos_envio_rx421w += hora_modif
    datos_envio_rx421w += '|'
    datos_envio_rx421w += pagina
    datos_envio_rx421w += '|'
    datos_envio_rx421w += nombre_archivo
    datos_envio_rx421w += '|'
    datos_envio_rx421w += localStorage.Usuario
    datos_envio_rx421w += '|'

    console.log(datos_envio_rx421w)
    let URL = get_url("APP/SALUD/RX-421W-02.DLL");

    postData({
        datosh: datos_envio_rx421w
    }, URL)
        .then((data) => {
            loader('hide')
            console.log(data)
            jAlert(
                { titulo: 'CORRECTO', mensaje: data },
                volverAinicio_rx421w
            );
        })
        .catch(error => {
            loader('hide')
            console.error(error)
            _toggleNav()
        });
}

function volverAinicio_rx421w() {
    limpiar_inputs_rx421w()
    _inputControl('reset');
    _inputControl('disabled');
    array_rx421W = []
    array_rx421w_ventana = []
    profesionales_Rx421w = []
    enfermedades_rx421w = []
    macroEvoluciones_rx421w = []
    index = ''
    id_historia_rx421w = ''
    incio_rx421w()
}