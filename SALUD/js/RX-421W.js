var array_rx421W = [];
var enfermedades_rx421w = [];

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');

    _toggleF8([
        { input: 'textarea', app: 'rx421w', funct: _ventanaMacroEvol_rx421w },
        { input: 'radiologo', app: 'rx421w', funct: _ventanaRadiologo_rx421w },
        { input: 'tecnologo', app: 'rx421w', funct: _ventanaTecnologo_rx421w },
        { input: 'diagPrincipal', app: 'rx421w', funct: _ventanaEnfermedad_rx421w }
    ]);

    _validacionTabla_rx421w()
});

function _ventanaMacroEvol_rx421w(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana plantillas',
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_macroev',
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
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_archprof',
            callback_esc: function () {
                $('#radiologo_rx421w').focus()
            },
            callback: function (data) {
                console.log(data)
                $('#radiologo_rx421w').val(data.cod_prof);
                $('#descrip1Radiologo_rx421w').val(data.reg_med_prof);
                $('#descrip2Radiologo_rx421w').val(data.descrip_prof);
                _enterInput('#radiologo_rx421w');
            }
        });
    }
}

function _ventanaTecnologo_rx421w(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana profesionales',
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_archprof',
            callback_esc: function () {
                $('#tecnologo_rx421w').focus()
            },
            callback: function (data) {
                console.log(data)
                $('#tecnologo_rx421w').val(data.cod_prof);
                $('#descripTecnologo_rx421w').val(data.descrip_prof);
                _enterInput('#tecnologo_rx421w');
            }
        });
    }
}

function _ventanaEnfermedad_rx421w(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana enfermedad segun tipo',
            columnas: ["cod_enf", "nombre_enf"],
            label: ["codigo", "nombre"],
            data: enfermedades_rx421w,
            callback_esc: function () {
                $('#diagPrincipal_rx421w').focus()
            },
            callback: function (data) {
                console.log(data)
                $('#diagPrincipal_rx421w').val(data.cod_enf.trim());
                $('#descripDiagPrincipal_rx421w').val(data.nombre_enf.trim());
                _enterInput('#diagPrincipal_rx421w');
            }
        });
    }
}

function _validacionTabla_rx421w() {
    _ventanaDatos({
        titulo: 'Consulta estudio facturados',
        tipo: 'mysql',
        db: 'datos_pros',
        tablaSql: 'sc_resrx',
        callback_esc: function () {
            $("#tablaHistorias_rx421w tbody").empty();
            _toggleNav()
        },
        callback: function (data) {
            console.log(data)
            var pagina_rx = '0'

            if (data.resultado_comp_rx != null) {
                pagina_rx = '2'
            } else if (data.resultado_ppal_rx != null) {
                pagina_rx = '1'
            }

            array_rx421W.push({
                fecha_fact: moment(data.fecha_fact_rx).format("YYYY/MM/DD"),
                suc_fact: data.suc_fact_rx,
                cl_fact: data.cl_fact_rx,
                nro_fact: data.nro_fact_rx,
                grupo_fact: data.grupo_fact_rx,
                cod_art_fact: data.cod_art_fact_rx,
                clase_art_fact: data.clase_art_fact_rx,
                item_fact: data.item_fact_rx,
                descrip_cup: data.descrip_cup_rx,
                nit_usu: data.nit_usu_rx,
                id_historia_Fact: data.id_historia_fact_rx,
                descrip_paci: data.descrip_paci_rx,
                id_radiologo: data.id_radiologo_rx,
                nom_medico: data.nom_medico_rx,
                reg_medico: data.reg_medico_rx,
                id_tecnologo: data.id_tecnologo_rx,
                nom_tecnologo: data.nom_tecnologo_rx,
                sala: data.sala_rx,
                cta_num: data.cta_num_rx,
                id_entidad: data.id_entidad_rx,
                dx: data.dx_rx,
                tipo_dx: data.tipo_dx_rx,
                descrip_dx: data.descrip_dx_rx,
                admi_modif: data.admi_modif_rx,
                fecha_modif: moment(data.fecha_modif_rx).format("YYYY/MM/DD"),
                hora_modif: data.hora_modif_rx,
                // admi_transc: data.admi_transc_rx,
                // fecha_transc: moment(data.fecha_transc_rx).format("YYYY/MM/DD"),
                // hora_transc: data.hora_transc_rx,
                birads: data.birads_rx,
                complejidad: data.complejidad_rx,
                email: data.email_rx,
                fecha_email: moment(data.fecha_Email_rx).format("YYYY/MM/DD"),
                hora_email: data.hora_email_rx,
                archivo_msj: data.archivo_msg_rx,
                resultado_ppal: data.resultado_ppal_rx,
                resultado_comp: data.resultado_comp_rx,
                resultado_adic: data.resultado_adic_rx,
                pagina: pagina_rx
            })
            console.log(array_rx421W)
            mostrarDatos_rx421w()
        }
    });
}

function mostrarDatos_rx421w() {
    if (array_rx421W[0].fecha_fact != 'Invalid date') {
        $('#fecha_rx421w').val(array_rx421W[0].fecha_fact)
    }
    $('#paciente_rx421w').val(array_rx421W[0].id_historia_Fact)
    $('#descripPaciente_rx421w').val(array_rx421W[0].descrip_paci)
    $('#sucursal_rx421w').val(array_rx421W[0].suc_fact)
    $('#servicio_rx421w').val(array_rx421W[0].cl_fact)
    $('#comprob_rx421w').val(array_rx421W[0].nro_fact)
    $('#cups2_rx421w').val(array_rx421W[0].grupo_fact + array_rx421W[0].cod_art_fact + array_rx421W[0].clase_art_fact)
    $('#cups1_rx421w').val(array_rx421W[0].item_fact)
    $('#radiologo_rx421w').val(array_rx421W[0].id_radiologo)
    $('#descrip1Radiologo_rx421w').val(array_rx421W[0].reg_medico)
    $('#descrip2Radiologo_rx421w').val(array_rx421W[0].nom_medico)
    $('#tecnologo_rx421w').val(array_rx421W[0].id_tecnologo)
    $('#descripTecnologo_rx421w').val(array_rx421W[0].nom_tecnologo)
    $('#sala_rx421w').val(array_rx421W[0].sala)
    $('#cuenta_rx421w').val(array_rx421W[0].cta_num)
    $('#nit_rx421w').val(array_rx421W[0].id_entidad)
    var tipo_dx = array_rx421W[0].tipo_dx
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

    $('#actualizo_rx421w').val(array_rx421W[0].admi_modif)
    if (array_rx421W[0].hora_modif != null || array_rx421W[0].hora_modif != undefined) {
        $('#fecha_modif_rx421w').val(array_rx421W[0].fecha_modif + ' - ' + array_rx421W[0].hora_modif)
    }
    // $('#transcribio_rx421w').val(array_rx421W[0].admi_transc)
    // if (array_rx421W[0].hora_transc != null || array_rx421W[0].hora_transc != undefined) {
    //     $('#fecha_transc_rx421w').val(array_rx421W[0].fecha_transc + ' - ' + array_rx421W[0].hora_transc)
    // }

    $('#diagPrincipal_rx421w').val(array_rx421W[0].dx)
    $('#descripDiagPrincipal_rx421w').val(array_rx421W[0].descrip_dx)
    $('#birads_rx421w').val(array_rx421W[0].birads)
    $('#complej_rx421w').val(array_rx421W[0].complejidad)

    $('#email_rx421w').val(array_rx421W[0].email)
    if (array_rx421W[0].hora_email != null || array_rx421W[0].hora_email != undefined) {
        $('#enviado_rx421w').val(array_rx421W[0].fecha_email + ' - ' + array_rx421W[0].hora_email)
    }
    $('#archivomsj_rx421w').val(array_rx421W[0].archivo_msj)
    var pagina = array_rx421W[0].pagina
    switch (pagina) {
        case '0':
            $('#pagina_rx421w').val('1')
            $('#descripPagina_rx421w').val('Resultado principal')
            $('#textarea_rx421w').val(array_rx421W[0].resultado_ppal)
            break;
        case '1':
            $('#pagina_rx421w').val('2')
            $('#descripPagina_rx421w').val('Resultado complementario')
            $('#textarea_rx421w').val(array_rx421W[0].resultado_comp)
            break;
        case '2':
            $('#pagina_rx421w').val('3')
            $('#descripPagina_rx421w').val('Resultado adicional')
            $('#textarea_rx421w').val(array_rx421W[0].resultado_adic)
            break;
    }
    validarRadiologo_rx421w()
}

function salir_rx421w() {
    _inputControl('reset');
    _inputControl('disabled');
    array_rx421W = []
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
    // $('#transcribio_rx421w').val('');
    // $('#fecha_transc_rx421w').val('');
    $('#archivomsj_rx421w').val('');
}

// function validarSuc_rx421w() {
//     validarInputs(
//         {
//             form: "#validarSucursal_rx421w",
//             orden: '1'
//         },
//         function () { salir_rx421w() },
//         function () {
//             validarRadiologo_rx421w()
//         }
//     )
// }

function validarRadiologo_rx421w() {
    validarInputs(
        {
            form: "#validarRadiologo_rx421w",
            orden: '1'
        },
        function () { salir_rx421w() },
        function () {
            var radiologo = $('#radiologo_rx421w').val()
            
            _consultaSql({
                sql: `SELECT * FROM sc_archprof WHERE cod_prof LIKE '${radiologo}%'`,
                db: $CONTROL,
                callback: function (error, results, fields) {
                    if (error) {
                        CON852('BD', 'BD', 'RX_421W', _toggleNav);
                        throw error;
                    } else {
                        console.log(results)
                        if (results.length > 0) {
                            $('#radiologo_rx421w').val(results[0].cod_prof);
                            $('#descrip1Radiologo_rx421w').val(results[0].reg_med_prof);
                            $('#descrip2Radiologo_rx421w').val(results[0].descrip_prof);
                            array_rx421W[0].id_radiologo = radiologo
                            array_rx421W[0].reg_medico = results[0].reg_med_prof
                            array_rx421W[0].nom_medico = results[0].descrip_prof
                            validarTecnologo_rx421w()
                            console.log('va a tecnologo')
                        } else {
                            CON851('01', '01', null, 'error', 'error');
                            validarRadiologo_rx421w()
                        }
                    }
                }
            })

        }
    )
}

function validarTecnologo_rx421w() {
    validarInputs(
        {
            form: "#validarTecnologo_rx421w",
            orden: '1'
        },
        function () { validarRadiologo_rx421w() },
        function () {
            var tecnologo = $('#tecnologo_rx421w').val()

            console.group('enter tecnologo')
            if (tecnologo.length > 0) {
                _consultaSql({
                    sql: `SELECT * FROM sc_archprof WHERE cod_prof LIKE '${tecnologo}%'`,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) {
                            CON852('BD', 'BD', 'RX_421W', _toggleNav);
                            throw error;
                        } else {
                            console.log(results)
                            if (results.length > 0) {
                                $('#tecnologo_rx421w').val(results[0].cod_prof);
                                $('#descripTecnologo_rx421w').val(results[0].descrip_prof);
                                array_rx421W[0].id_tecnologo = tecnologo
                                array_rx421W[0].nom_tecnologo = results[0].descrip_prof
                                validarTextarea_rx421w()
                            } else {
                                CON851('01', '01', null, 'error', 'error');
                                validarTecnologo_rx421w()
                            }
                        }
                    }
                })
            } else {
                array_rx421W[0].id_tecnologo = ''
                array_rx421W[0].nom_tecnologo = ''
                validarTextarea_rx421w()
            }

        }
    )
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
        { "COD": "4", "DESCRIP": "No aplica" }
    ]

    POPUP({
        array: arrayTipoDiag_rx_421w,
        titulo: 'Tipo de diagnostico',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: validarTextarea_rx421w
    }, function (data) {
        array_rx421W[0].tipo_dx = data.COD.trim()
        $('#tipoDiag_rx421w').val(data.COD.trim())
        $('#descripTipoDiag_rx421w').val(data.DESCRIP.trim())
        traerDatosEnfer_rx421w()
    })
}

function traerDatosEnfer_rx421w() {
    var tipo = array_rx421W[0].tipo_dx
    _consultaSql({
        sql: `SELECT * FROM sc_archenf WHERE tipo_enf LIKE '${tipo}%'`,
        db: 'datos_pros',
        callback: function (error, results, fields) {
            if (error) {
                CON852('BD', 'BD', 'RX_421W', _toggleNav);
                throw error;
            } else {
                console.log(results)
                if (results.length > 0) {
                    enfermedades_rx421w = results
                    validarDiagPrin_rx421w()
                } else {
                    jAlert(
                        { titulo: 'Error', mensaje: 'No se han encontrado enfermedades de acuerdo al tipo seleccionado' },
                        validarTipoDiag_rx421w
                    );
                }
            }
        }
    })
}

function validarDiagPrin_rx421w() {
    validarInputs(
        {
            form: "#validarDiagPrincipal_rx421w",
            orden: '1'
        },
        function () { validarTipoDiag_rx421w() },
        function () {
            var enfer = $('#diagPrincipal_rx421w').val()

            var busqueda = buscarEnfermedad_rx421w(cerosIzq(enfer, 4))

            if (busqueda) {
                $('#descripDiagPrincipal_rx421w').val(busqueda.nombre_enf)
                array_rx421W[0].dx = enfer
                array_rx421W[0].descrip_dx = busqueda.nombre_enf
                validarBirads_rx421w()
            } else {
                CON851('01', '01', null, 'error', 'error');
                validarDiagPrin_rx421w()
            }
        }
    )
}

function buscarEnfermedad_rx421w(enfer) {
    var retornar = false
    for (var i in enfermedades_rx421w) {
        if (enfermedades_rx421w[i].cod_enf == enfer) {
            retornar = enfermedades_rx421w[i]
        }
    }
    return retornar;
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
                    array_rx421W[0].birads = birads
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
                    array_rx421W[0].complejidad = complejidad
                    grabar_rx421w()
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
            console.log(txt_nombre)
            _grabardatos(nombre_archivo);
        }
    });
}


function _grabardatos(nombre_archivo) {
    var nit = array_rx421W[0].nit_usu
    var suc = array_rx421W[0].suc_fact
    var clase = array_rx421W[0].cl_fact
    var nro_fact = array_rx421W[0].nro_fact

    var grupo = array_rx421W[0].grupo_fact
    var cod_Art = array_rx421W[0].cod_art_fact
    var clase_art_fact = array_rx421W[0].clase_art_fact
    var item = array_rx421W[0].item_fact

    var radiologo = array_rx421W[0].id_radiologo
    var registro_medico = array_rx421W[0].reg_medico
    var nombre_radiologo = array_rx421W[0].nom_medico
    var tecnologo = array_rx421W[0].id_tecnologo
    var nombre_tecnologo = array_rx421W[0].nom_tecnologo

    var pagina = array_rx421W[0].pagina

    var tipo_dx = array_rx421W[0].tipo_dx
    var dx = array_rx421W[0].dx
    var descrip_dx = array_rx421W[0].descrip_dx

    var birads = array_rx421W[0].birads
    var complejidad = array_rx421W[0].complejidad

    var fecha_modif = moment().format("YYYYMMDD")
    var hora_modif = moment().format("HHmmss")

   
    LLAMADO_DLL({
        dato: [nit, suc, clase, nro_fact, grupo, cod_Art, clase_art_fact, item, radiologo, registro_medico, nombre_radiologo, 
            tecnologo, nombre_tecnologo, tipo_dx, dx, descrip_dx, birads, complejidad, fecha_modif, hora_modif, pagina, nombre_archivo],
        callback: llegadaDll_Rx421w,
        nombredll: 'RX-421W',
        carpeta: 'SALUD'
    });
}

function llegadaDll_Rx421w(data) {
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        guardadoBaseDatos_rx421w()
    } else if (rdll[0].trim() == 'SC'){
        jAlert(
            { titulo: 'Error ' + rdll[0].trim(), mensaje: '<b>Mensaje: </b>' + rdll[1] + '<br> <b>App:</b> ' + rdll[2] },
            _toggleNav
        );
    } else {
        loader('hide');
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}

function guardadoBaseDatos_rx421w() {
    console.log('va a guardar en bd')
}
