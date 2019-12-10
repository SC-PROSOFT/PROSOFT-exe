var $_HC_01 = {
    HISTORIA: [],
    DETALLES: []
};

var $DATOS_HC_TMP = new Array();
var ptorMask, p_abdoMask, perim_cefalicoMask, perim_braquialMask, perim_mudecaMask;
var height = $(window).height();

var pesoMask = IMask($('#peso_hc_01')[0], { mask: '{000}00.[0]' });

var imcMask = IMask($("#imc_hc_01")[0], { mask: "00.00" });
var supCMask = IMask($("#supc_hc_01")[0], { mask: "00.00" });
var tempMask = IMask($("#temp_hc_01")[0], { mask: "00.00" });

$dato_9005 = {
    valoracion_9005: '',
    revaloracion_9005: '',
    comer_9005: 0,
    lavarse_9005: 0,
    vestirse_9005: 0,
    arreglarse_9005: 0,
    deposicion_9005: 0,
    miccion_9005: 0,
    baño_9005: 0,
    trasladarse_9005: 0,
    deambulacion_9005: 0,
    escaleras_9005: 0,
    dependencia_funcional_9005: {
        nivel_secuelas_9005: '',
        ayuda_actividades_9005: '',
        depen_funcional_9005: ''
    }
};

$dato_9006 = {
    valoracion_9006: '',
    revaloracion_9006: '',
    categoria_9006: 0,
    actividad_normal_9006: 0,
    incapaz_trabajar_9006: 0,
    incapaz_cuidarse_9006: 0
};

$dato_9009 = {
    clasificacion_9009: 0,
    dimension_9009: 0,
    profund_tejido_9009: 0,
    comorbilidad_9009: '',
    estado_herida_9009: 0,
    infeccion_9009: '',
    tiempo_evolu_9009: '',
    registro_foto_909: 0
};

(() => {
    _inputControl('reset');
    _inputControl('disabled');
    cargarHistoria();

})();

function cargarHistoria() {
    var datos_envio = datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage["Usuario"].trim() + "|";
    postData({ datosh: datos_envio }, get_url("APP/HICLIN/HC-01.DLL"))
        .then(data => {
            $_HC_01.HISTORIA = data['HC-PAC'][0];
            cargarDetalles();
        })
        .catch(error => {
            console.log(error)
            _toggleNav();
        })
}

function cargarDetalles() {
    var folio = $_REG_HC.llave_hc.substr(17, 6), llave = '', datos_envio = '';
    folio = parseFloat(folio) - 1;
    llave = folio < 1 ? llave = $_REG_HC.llave_hc : $_REG_HC.llave_hc.substr(0, 17) + folio.toString().padStart(6, "0");

    datos_envio = datosEnvio() + llave + "|**|  |";
    postData({ datosh: datos_envio }, get_url("APP/HICLIN/HCDETAL-ANT.DLL"))
        .then(data => {
            $_HC_01.DETALLES = data.DETHC;
            montar_pantallas()
        })
        .catch(error => {
            console.log(error);
        })
}

function montar_pantallas() {
    var hora_inicial = new Date();
    hora_inicial = hora_inicial.toLocaleTimeString();
    var fecha_inicial = moment().format('DD/MM/YYYY');

    $('#ano_hc_01').val(fecha_inicial.split('/')[2]);
    $('#mes_hc_01').val(fecha_inicial.split('/')[1]);
    $('#dia_hc_01').val(fecha_inicial.split('/')[0]);
    $('#hora_hc_01').val(hora_inicial.split(':')[0]);
    $('#min_hc_01').val(hora_inicial.split(':')[1]);
    var profesional = $_REG_PROF.datos_prof.IDENTIFICACION.trim() + " - " + $_REG_PROF.datos_prof.DESCRIPCION.trim()
    $('#med_hc_01').val(profesional);
    var novedad = $_HC_01.HISTORIA.NOVEDAD;
    novedad = novedad = '7' ? "Creando" : "Actualizando";
    $('#act_hc_01').val(novedad);
    $('#descrip_hc_01').val('HOSPICASA');
    _llenarDatosPag1();
}

function _llenarDatosPag1() {
    _formHidden('1');
    $('#proced_hc_01').val($_HC_01.HISTORIA.PROCEDEN.trim());
    $('#motiv_hc_01').val($_HC_01.HISTORIA.MOTIVO.trim());
    var enferm_act = $_HC_01.DETALLES.filter(detalle => '1001' == detalle['COD-DETHC'])
    $('#enfer_act_hc_01').html(enferm_act[0].DETALLE.trim());
    validarProcedencia();
}

function validarProcedencia() {
    validarInputs({
        form: "#fase_procedencia_hc_01",
        orden: "1"
    },
        function () {
            _inputControl('disabled');
            _toggleNav();
        },
        on_validarProcedencia
    );
}

function on_validarProcedencia() {
    var fuente = $('#plantillaAcompañante').html();
    var acompa;
    var acompantePopup = bootbox.dialog({
        size: '',
        closeButton: false,
        title: 'Acompañante de consulta',
        message: fuente
    });

    acompantePopup.init(function () {
        validarPopupAcompañante();
        acompa = $(".acompañantehc_01");
        $(acompa[1]).val($_HC_01.HISTORIA.ACOMPA.trim());
    });

    acompantePopup.on('shown.bs.modal', function () {
        $(acompa[1]).focus();
    });
}

function validarPopupAcompañante() {
    validarInputs({
        form: ".bootbox #acompañantePopup",
        orden: "1"
    },
        function () {
            bootbox.hideAll();
            _llenarDatosPag1();
        },
        on_validarPopupAcompañante
    );
}
function on_validarPopupAcompañante() {
    var acompa = $(".acompañantehc_01");
    $_HC_01.HISTORIA.ACOMPA = $(acompa[1]).val().trim();
    bootbox.hideAll();
    validarMotivHc_01();
}

function validarMotivHc_01() {
    validarInputs({
        form: "#fase_motivo_hc_01",
        orden: '1'
    },
        validarProcedencia,
        validarEnfermActual
    );
}

function validarEnfermActual() {
    validarInputs({
        form: "#fase_enferActual_hc_01",
        orden: '1'
    },
        validarMotivHc_01,
        validarPag_01
    );
}

function validarPag_01() {
    $_HC_01.HISTORIA.PROCEDEN = $('#proced_hc_01').val().trim();
    $_HC_01.HISTORIA.MOTIVO = $('#motiv_hc_01').val().trim();
    if ($_HC_01.HISTORIA.NOVEDAD == '7') {
        guardarDatosPag_1();
    } else if ($_HC_01.HISTORIA.NOVEDAD == '8') {
        actualizarDatosPag_1();
    }
    actualizarDetalle('1001', $('#enfer_act_hc_01').val().trim());
    _llenarDatosPag2();
}

function guardarDatosPag_1() {
    var edad = calcularEdadUnidad($dtos_pacie['fecha_nacimiento_paci'].trim());
    var profesional = buscarProfesion($usuario.id_usu);
    $bd.transaction(function (tx) {
        var fecha = $('#ano_hc_01').val() + $('#mes_hc_01').val() + $('#dia_hc_01').val(), hora = $('#hora_hc_01').val() + $('#min_hc_01').val();
        var sql = '';
        sql = "Insert into hc_aper(cod_paci, llave_hc, fecha_hc, hora_hc, serv_hc, oper_elab_hc, med_hc, unid_edad_hc, vlr_edad_hc, proceden_hc, acompa_hc, motiv_hc, estado_hc, atiende_hc, temporal_hc, eps_hc, unserv_hc) VALUES('"
            + $id_paciente + "','"
            + $LLAVE_HC + "','"
            + fecha.toString() + "','"
            + CerosIzq(hora.toString(), 4) + "','"
            + "09" + "','"
            + $usuario.user_usu + "','"
            + $usuario.id_usu + "','"
            + edad.unid_edad.toString() + "','"
            + edad.edad.toString() + "','"
            + $DATOS_HC_TMP.proceden_hc + "','"
            + $DATOS_HC_TMP.acompa_hc + "','"
            + $DATOS_HC_TMP.motiv_hc + "','"
            + "0" + "','"
            + profesional.cod_atiend_pro + "','"
            + "1" + "','"
            + $dtos_pacie.eps_paci + "','"
            + "09" + "')";
        tx.executeSql(sql);
    }, errorGuardarDatosPag_1);
}

function actualizarDatosPag_1() {
    $bd.transaction(function (tx) {
        var sql = "UPDATE hc_aper set proceden_hc ='" + $DATOS_HC_TMP.proceden_hc
            + "',  acompa_hc ='" + $DATOS_HC_TMP.acompa_hc
            + "', motiv_hc ='" + $DATOS_HC_TMP.motiv_hc
            + "' where llave_hc = '" + $LLAVE_HC + "'";
        tx.executeSql(sql);
    }, errorGuardarDatosPag_1);
}


function errorGuardarDatosPag_1(err) {
    plantillaError('99', 'Error al guardar datos de la pag_1', 'BD.');
}

function _llenarDatosPag2() {
    _formHidden('2');
    var ant_famil = consultarHcDetalle($id_paciente, '2002');
    $('#ant_famil_hc_01').val(ant_famil.detalle.trim());

    var ant_medic = consultarHcDetalle($id_paciente, '2010');

    $('#ant_med_hc_01').val(ant_medic.detalle.trim());

    var ant_quirur = consultarHcDetalle($id_paciente, '2020');
    $('#ant_ant_quirur_hc_01').val(ant_quirur.detalle.trim());

    var ant_farmac = consultarHcDetalle($id_paciente, '2030');
    $('#ant_farmaco_hc_01').val(ant_farmac.detalle.trim());

    var toxic_alergi = consultarHcDetalle($id_paciente, '2035');
    $('#ant_alerg_hc_01').val(toxic_alergi.detalle.trim());

    var ant_trauma = consultarHcDetalle($id_paciente, '2040');
    $('#ant_traumat_hc_01').val(ant_trauma.detalle.trim());

    var ant_ocupa = consultarHcDetalle($id_paciente, '2050');
    $('#ant_ocup_hc_01').val(ant_ocupa.detalle.trim());

    var gineco = consultarHcDetalle($id_paciente, '2060');
    // var ginecoobstetricos = gineco.DETALLE; 
    $('#gineco_hc_01').val(gineco.detalle);

    var otros = consultarHcDetalle($id_paciente, '2070');
    $('#otr_ant_hc_01').val(otros.detalle.trim());

    var dato_2080 = consultarHcDetalle($id_paciente, '2080');
    // dato_2080 se divide en varias variables
    $('#padre_hc_01').val();
    $('#madre_hc_01').val();
    $('#herm1_hc_01').val();
    $('#herm2_hc_01').val();
    $('#herm3_hc_01').val();
    $('#herm4_hc_01').val();
    $('#herm5_hc_01').val();
    $('#herm6_hc_01').val();

    validarAntecedentesHc_01('1');
}

function validarAntecedentesHc_01(orden) {
    validarInputs({
        form: ".fase_antecedentes_hc_01",
        orden: orden
    },
        _llenarDatosPag1,
        function () {
            if ($dtos_pacie.sex_paci == 'M') {
                validarPag_02();
            } else {
                validarObstetricos();
            }
        }
    );
}

function validarObstetricos() {
    validarInputs({
        form: '#fase_obstetricos_hc_01',
        orden: "1"
    },
        function () {
            validarAntecedentesHc_01('8');
        },
        validarPag_02
    );
}

function validarPag_02() {
    var ant_famil = consultarHcDetalle($id_paciente, '2002');
    if (ant_famil.existe == 'S') {
        actualizarDetalle('2002', $('#ant_famil_hc_01').val().trim());
    } else {
        guardarDetalle('2002', $('#ant_famil_hc_01').val().trim());
    }

    var ant_medic = consultarHcDetalle($id_paciente, '2010');
    if (ant_medic.existe == 'S') {
        actualizarDetalle('2010', $('#ant_med_hc_01').val().trim());
    } else {
        guardarDetalle('2010', $('#ant_med_hc_01').val().trim());
    }


    var ant_quirur = consultarHcDetalle($id_paciente, '2020');
    if (ant_quirur.existe == 'S') {
        actualizarDetalle('2020', $('#ant_ant_quirur_hc_01').val().trim());
    } else {
        guardarDetalle('2020', $('#ant_ant_quirur_hc_01').val().trim());
    }

    var ant_farmac = consultarHcDetalle($id_paciente, '2030');
    if (ant_farmac.existe == 'S') {
        actualizarDetalle('2030', $('#ant_farmaco_hc_01').val().trim());
    } else {
        guardarDetalle('2030', $('#ant_farmaco_hc_01').val().trim());
    }

    var toxic_alergi = consultarHcDetalle($id_paciente, '2035');
    if (toxic_alergi.existe == 'S') {
        actualizarDetalle('2035', $('#ant_alerg_hc_01').val().trim());
    } else {
        guardarDetalle('2035', $('#ant_alerg_hc_01').val().trim());
    }

    var ant_trauma = consultarHcDetalle($id_paciente, '2040');
    if (ant_trauma.existe == 'S') {
        actualizarDetalle('2040', $('#ant_traumat_hc_01').val().trim());
    } else {
        guardarDetalle('2040', $('#ant_traumat_hc_01').val().trim());
    }

    var ant_ocupa = consultarHcDetalle($id_paciente, '2050');
    if (ant_ocupa.existe == 'S') {
        actualizarDetalle('2050', $('#ant_ocup_hc_01').val().trim());
    } else {
        guardarDetalle('2050', $('#ant_ocup_hc_01').val().trim());
    }

    var gineco = consultarHcDetalle($id_paciente, '2060');
    if (gineco.existe == 'S') {
        actualizarDetalle('2060', $('#gineco_hc_01').val().trim());
    } else {
        guardarDetalle('2060', $('#gineco_hc_01').val().trim());
    }

    var otros = consultarHcDetalle($id_paciente, '2070');
    if (otros.existe == 'S') {
        actualizarDetalle('2070', $('#otr_ant_hc_01').val().trim());
    } else {
        guardarDetalle('2070', $('#otr_ant_hc_01').val().trim());
    }

    // detella 2080 falta estructurar tanto en cobol como el fron...

    /*var itemDto2080 = consultarItemArray_dethc('2080');*/
    _llenarDatosPag3();
}

function _llenarDatosPag3() {
    _formHidden('3');
    var org_sent = consultarHcDetalle($id_paciente, '3010');
    $('#sis_sent_hc_01').val(org_sent.detalle.trim());

    var cardio_pulmo = consultarHcDetalle($id_paciente, '3020');
    $('#sis_card_hc_01').val(cardio_pulmo.detalle.trim());

    var sist_dig = consultarHcDetalle($id_paciente, '3030');
    $('#sis_dig_hc_01').val(sist_dig.detalle.trim());

    var sis_derm = consultarHcDetalle($id_paciente, '3040');
    $('#sis_derm_hc_01').val(sis_derm.detalle.trim());

    var sit_oste = consultarHcDetalle($id_paciente, '3050');
    $('#sist_oste_hc_01').val(sit_oste.detalle.trim());

    var sis_neur = consultarHcDetalle($id_paciente, '3060');
    $('#sis_neur_hc_01').val(sis_neur.detalle.trim());

    var sis_psiq = consultarHcDetalle($id_paciente, '3070');
    $('#sis_psiq_hc_01').val(sis_psiq.detalle.trim());

    var geni = consultarHcDetalle($id_paciente, '3080');
    $('#sis_gent_hc_01').val(geni.detalle.trim());

    var sis_gineco = consultarHcDetalle($id_paciente, '3090');
    $('#sis_geni_hc_01').val(sis_gineco.detalle.trim());

    var sis_obst = consultarHcDetalle($id_paciente, '3095');
    $('#sis_obst_hc_01').val(sis_obst.detalle.trim());

    validarRevisionSistemas('1');
}

function validarRevisionSistemas(orden) {
    validarInputs({
        form: ".revisionSistemas_hc_01",
        orden: orden
    },
        _llenarDatosPag2,
        validarPag_03
    );
}

function validarPag_03() {
    var org_sent = consultarHcDetalle($id_paciente, '3010');
    if (org_sent.existe == 'S') {
        actualizarDetalle('3010', $('#sis_sent_hc_01').val().trim());
    } else {
        guardarDetalle('3010', $('#sis_sent_hc_01').val().trim());
    }

    var cardio_pulmo = consultarHcDetalle($id_paciente, '3020');
    if (cardio_pulmo.existe == 'S') {
        actualizarDetalle('3020', $('#sis_card_hc_01').val().trim());
    } else {
        guardarDetalle('3020', $('#sis_card_hc_01').val().trim());
    }

    var sist_dig = consultarHcDetalle($id_paciente, '3030');
    if (sist_dig.existe == 'S') {
        actualizarDetalle('3030', $('#sis_dig_hc_01').val().trim());
    } else {
        guardarDetalle('3030', $('#sis_dig_hc_01').val().trim());
    }

    var sis_derm = consultarHcDetalle($id_paciente, '3040');
    if (sis_derm.existe == 'S') {
        actualizarDetalle('3040', $('#sis_derm_hc_01').val().trim());
    } else {
        guardarDetalle('3040', $('#sis_derm_hc_01').val().trim());
    }

    var sit_oste = consultarHcDetalle($id_paciente, '3050');
    if (sit_oste.existe == 'S') {
        actualizarDetalle('3050', $('#sist_oste_hc_01').val().trim());
    } else {
        guardarDetalle('3050', $('#sist_oste_hc_01').val().trim());
    }

    var sis_neur = consultarHcDetalle($id_paciente, '3060');
    if (sis_neur.existe == 'S') {
        actualizarDetalle('3060', $('#sis_neur_hc_01').val().trim());
    } else {
        guardarDetalle('3060', $('#sis_neur_hc_01').val().trim());
    }

    var sis_psiq = consultarHcDetalle($id_paciente, '3070');
    if (sis_psiq.existe == 'S') {
        actualizarDetalle('3070', $('#sis_psiq_hc_01').val().trim());
    } else {
        guardarDetalle('3070', $('#sis_psiq_hc_01').val().trim());
    }

    var geni = consultarHcDetalle($id_paciente, '3080');
    if (geni.existe == 'S') {
        actualizarDetalle('3080', $('#sis_gent_hc_01').val().trim());
    } else {
        guardarDetalle('3080', $('#sis_gent_hc_01').val().trim());
    }

    var sis_gineco = consultarHcDetalle($id_paciente, '3090');
    if (sis_gineco.existe == 'S') {
        actualizarDetalle('3090', $('#sis_geni_hc_01').val().trim());
    } else {
        guardarDetalle('3090', $('#sis_geni_hc_01').val().trim());
    }

    var sis_obst = consultarHcDetalle($id_paciente, '3095');
    if (sis_obst.existe == 'S') {
        actualizarDetalle('3095', $('#sis_obst_hc_01').val().trim());
    } else {
        guardarDetalle('3095', $('#sis_obst_hc_01').val().trim());
    }

    _llenarDatosPag5();
}

function _llenarDatosPag5() {
    _formHidden('5');
    pesoMask.unmaskedValue = $DATOS_HC_TMP.peso_hc ? $DATOS_HC_TMP.peso_hc : '000';
    $('#talla_hc_01').val($DATOS_HC_TMP.talla_hc);

    imcMask.unmaskedValue = $DATOS_HC_TMP.imc_hc ? $DATOS_HC_TMP.imc_hc : '0';
    supCMask.unmaskedValue = $DATOS_HC_TMP.sup_corp_hc ? $DATOS_HC_TMP.sup_corp_hc : '0';
    tempMask.unmaskedValue = $DATOS_HC_TMP.temp_hc ? $DATOS_HC_TMP.temp_hc : '';

    $('#fc_hc_01').val($DATOS_HC_TMP.fcard_hc);
    $('#fr_hc_01').val($DATOS_HC_TMP.fresp_hc);
    $('#t_hc_01').val($DATOS_HC_TMP.tens1_hc);
    $('#arte_hc_01').val($DATOS_HC_TMP.tens2_hc);
    $('#tam_hc_01').val($DATOS_HC_TMP.tens_media_hc);
    $('#glasgow_hc_01').val($DATOS_HC_TMP.glasg_hc);
    $('#pvc_hc_01').val($DATOS_HC_TMP.pvc_hc);

    var exam_gen = consultarHcDetalle($id_paciente, '4005');
    if (exam_gen.existe == 'S') {
        $('#examen_hc_01').val(exam_gen.detalle.trim());
    }
    validarPeso();
}

function validarPeso() {
    validarInputs({
        form: "#fase_peso_hc_01",
        orden: "1"
    },
        _llenarDatosPag3,
        function () {
            $("#peso_hc_01").unbind('keyup')
            if (($("#peso_hc_01").val().trim() == "") || ($("#peso_hc_01").val() == "0")) {
                plantillaToast('02', '02', null, 'error', 'error');
                $("#peso_hc_01").val("");
                validarPeso();
            } else {
                validarTalla();
            }
        }
    );
}

function validarTalla() {
    validarInputs({
        form: "#fase_talla_hc_01",
        orden: "1"
    },
        validarPeso,
        function () {
            var talla = $("#talla_hc_01").val();
            if (parseInt(talla) > 230) {
                plantillaToast("03", "03", null, 'error', 'error');
                $("#talla_hac_01").val("");
                validarTalla();
            } else if ((parseInt(talla) == 0) && (parseInt($("#peso_hc_01").val()) > 0)) {
                plantillaToast("02", "02", null, "error", "error");
                $("#talla_hac_01").val("");
                validarTalla();
            } else {
                _calcularindices();
            }
        }
    );
}

function _calcularindices() {
    var peso = $("#peso_hc_01").val();
    var talla = $("#talla_hc_01").val();
    if ((parseInt(peso) == 0) || (parseInt(talla) == 0)) {
        $IMCCORPHC = 0;
    } else {
        var resultado = parseInt(talla) / 100;
        var resultadop = Math.pow(resultado, 2);

        var imc = parseInt(peso) / resultadop;
        imcMask.unmaskedValue = cerosIzq(imc.toFixed(2), 5);

        var sup_cop = (parseInt(peso) + parseInt(talla) - 60) / 100;
        supCMask.unmaskedValue = cerosIzq(sup_cop.toFixed(2), 5);

        if (imc >= 30) {
            plantillaToast("BC", "BC", null, 'warning', 'warning');
        } else if (imc >= 25) {
            plantillaToast('BB', 'BB', null, 'warning', 'warning');
        } else if (imc < 18.5) {
            plantillaToast("H2", "H2", null, 'warning', 'warning');
        } else if (imc < 25) {
            plantillaToast("H1", "H1", null, 'warning', 'warning');
        }
        validarTemp();
    }
}

function validarTemp() {
    validarInputs({
        form: "#fase_temp_hc_01",
        orden: "1"
    },
        validarTalla,
        function () {
            var temp = $("#temp_hc_01").val();
            if (parseInt(temp) == 0) {
                plantillaToast("02", "02", null, 'error', 'error');
                $("#temp_hc_01").val("");
                validarTemp();
            } else if (parseInt(temp) > 45) {
                plantillaToast("03", "03", null, 'error', 'error');
                $("#temp_hc_01").val("");
                validarTemp();
            } else if ((parseInt(temp > 0)) && ((parseInt(temp) < 35.5) || parseInt(temp) > 38)) {
                plantillaToast('BM', 'BM', null, 'alert', 'alert');
                validarFcard();
            } else {
                validarFcard();
            }
        }
    );
}

function validarFcard() {
    validarInputs({
        form: "#fase_fcard_hc_01",
        orden: "1"
    },
        validarTemp,
        function () {
            var unid_edad = "A";
            var valor_edad = 35;
            var fcard = $("#fc_hc_01").val();
            if (parseInt(fcard) > 200) {
                plantillaToast('03', '03', null, 'warning', 'warning');
                $("#fc_hc_01").val("");
                validarFcard();
            } else if ((unid_edad == "A") && (valor_edad > 10)) {
                plantillaToast('BK', 'BK', null, 'warning', 'warning');
                validarFresp();
            } else {
                validarFresp();
            }
        }
    );
}

function validarFresp() {
    validarInputs({
        form: "#fase_resp_hc_01",
        orden: "1"
    },
        validarFcard,
        function () {
            var unid_edad = "A";
            var valor_edad = 35;
            var fresp = $("#fr_hc_01").val();
            if (parseInt(fresp) > 100) {
                plantillaToast('03', '03', null, 'error', 'error');
                $("#fr_hc_01").val("");
                validarFresp();
            } else if ((unid_edad == "A") && (valor_edad > 8)) {
                plantillaToast('BL', 'BL', null, 'warning', 'warning');
                validarTens1();
            } else {
                validarTens1();
            }
        }
    );
}

function validarTens1() {
    validarInputs({
        form: "#fase_tens1_hc_01",
        orden: "1"
    },
        validarFresp,
        function () {
            var tens1 = $("#t_hc_01").val();
            if (parseInt(tens1) > 300) {
                plantillaToast("03", "03", null, 'error', 'error');
                $("#t_hc_01").val("");
                validarTens1();
            } else if ((parseInt(tens1) == 0) || tens1.trim() == "") {
                plantillaToast("02", "02", null, "error", "error");
                $("#t_hc_01").val("");
                validarTens1();
            } else {
                validarTens2();
            }
        }
    );
}

function validarTens2() {
    validarInputs({
        form: "#fase_tens2_hc_01",
        orden: "1"
    },
        validarTens1,
        function () {
            var tens1 = $("#t_hc_01").val();
            var tens2 = $("#arte_hc_01").val();
            if ((parseInt(tens1) > 0) && (parseInt(tens2) == 0)) {
                plantillaToast("02", "02", null, "error", "error");
                $("#arte_hc_01").val("");
                validarTens2();
            } else if (parseInt(tens2) > 300) {
                plantillaToast("03", "03", null, 'error', 'error');
                $("#arte_hc_01").val("");
                validarTens2();
            } else {
                var tens_media = (parseInt(tens1) + (parseInt(tens2) * 2)) / 3;
                $('#tam_hc_01').val(tens_media);
                _ventanaglasgow();
            }
        }
    );
}

function _ventanaglasgow() {
    var fuente = $('#plantillaGlasgow').html();
    var aper_ocul, resp_verbal, resp_moto, glasgow;
    var glasgowPopup = bootbox.dialog({
        size: '',
        closeButton: false,
        title: 'Glasgow',
        message: fuente
    });

    glasgowPopup.init(function () {
        glasgow = $DATOS_HC_TMP.glasg_hc ? $DATOS_HC_TMP.glasg_hc : '';
        aper_ocul = $(".aper_ocul_hc_01");
        resp_verbal = $(".resp_verb_hc_01");
        resp_moto = $('.resp_moto_hc_01');

        $(aper_ocul[1]).val(glasgow.toString().substr(0, 1));
        $(resp_verbal[1]).val(glasgow.toString().substr(1, 1));
        $(resp_moto[1]).val(glasgow.toString().substr(2, 1));

        validarAperOcular('1');
    });

    glasgowPopup.on('shown.bs.modal', function () {
        $(aper_ocul[1]).focus();
    });

}

function validarAperOcular() {
    validarInputs({
        form: '.bootbox #fase_aper_ocu_hc_01',
        orden: '1'
    }, function () {
        validarTens2();
        bootbox.hideAll();
    }, function () {
        if ($('.bootbox .aper_ocul_hc_01').val()) {
            if ($('.bootbox .aper_ocul_hc_01').val() > 4 || $('.bootbox .aper_ocul_hc_01').val() < 1) {
                plantillaError('99', 'El valor ingresado no corresponde al rango.', 'HC-01.', validarAperOcular);
            } else {
                if (height < 780) {
                    $(".modal-body").animate({ scrollLeft: $('.modal-body')[0].scrollHeight }, 1000);
                }
                validarRespVerb();
            }
        } else {
            plantillaError('99', 'Debe ingresar un valor.', 'HC-01.', validarAperOcular);
        }
    });
}

function validarRespVerb() {
    validarInputs({
        form: '.bootbox #fase_resp_verb_hc_01',
        orden: '1'
    },
        validarAperOcular,
        function () {
            if ($('.bootbox .resp_verb_hc_01').val()) {
                if ($('.bootbox .resp_verb_hc_01').val() > 5 || $('.bootbox .resp_verb_hc_01').val() < 1) {
                    plantillaError('99', 'El valor ingresado no corresponde al rango.', 'HC-01.', validarRespVerb);
                } else {
                    validarRespMoto();
                }
            } else {
                plantillaError('99', 'Debe ingresar un valor.', 'HC-01.', validarRespVerb);
            }
        }
    );
}

function validarRespMoto() {
    validarInputs({
        form: '.bootbox #fase_resp_moto_hc_01',
        orden: '1'
    },
        validarRespVerb,
        function () {
            if ($('.bootbox .resp_moto_hc_01').val()) {
                if ($('.bootbox .resp_moto_hc_01').val() > 6 || $('.bootbox .resp_moto_hc_01').val() < 1) {
                    plantillaError('99', 'El valor ingresado no corresponde al rango.', 'HC-01.', validarRespMoto);
                } else {
                    validarGlasgow();
                }
            } else {
                plantillaError('99', 'Debe ingresar un valor.', 'HC-01.', validarRespMoto);
            }
        }
    );
}



function validarGlasgow() {
    var aper_ocul, resp_verbal, resp_moto, vlr_glasg, glasgow;
    aper_ocul = $(".aper_ocul_hc_01");
    resp_verbal = $(".resp_verb_hc_01");
    resp_moto = $('.resp_moto_hc_01');

    vlr_glasg = parseInt($(aper_ocul[1]).val()) + parseInt($(resp_verbal[1]).val()) + parseInt($(resp_moto[1]).val());
    glasgow = $(aper_ocul[1]).val() + $(resp_verbal[1]).val() + $(resp_moto[1]).val() + cerosIzq(vlr_glasg, 2);

    $('#glasgow_hc_01').val(vlr_glasg + " / 15");

    $DATOS_HC_TMP.glasg_hc = glasgow;
    bootbox.hideAll();
    validarPvc();

}

function validarPvc() {
    validarInputs({
        form: "#fase_pvc_hc_01",
        orden: "1"
    },
        validarTens1,
        complementosSignosPopup
    );
}

function complementosSignosPopup() {
    var fuente = $('#signosFaltantes').html();
    var signosPopup = bootbox.dialog({
        size: '',
        title: 'Signos',
        message: fuente
    });

    signosPopup.init(function () {
        validarSignosFaltantes1('1');
        ptorMask = IMask($('.bootbox .ptor_hc_01')[0], { mask: '{0}00.[0]' });
        ptorMask.unmaskedValue = $DATOS_HC_TMP.per_tora_hc ? $DATOS_HC_TMP.per_tora_hc : '0';

        p_abdoMask = IMask($('.bootbox .pabdo_hc_01')[0], { mask: '{0}00.0' });
        p_abdoMask.unmaskedValue = $DATOS_HC_TMP.perd_abdo_hc ? $DATOS_HC_TMP.perd_abdo_hc : '0';

        $('.bootbox .sv02_hc_01').val($DATOS_HC_TMP.oximetria_hc ? $DATOS_HC_TMP.oximetria_hc : '0');

        perim_cefalicoMask = IMask($('.bootbox .perim_cefalico_hc_01')[0], { mask: '{0}00.[0]' });
        perim_cefalicoMask.unmaskedValue = $DATOS_HC_TMP.per_cef_hc ? $DATOS_HC_TMP.per_cef_hc : '0';

        perim_braquialMask = IMask($('.bootbox .perim_braquial_hc_01')[0], { mask: '00.[0]' });
        perim_braquialMask.unmaskedValue = $DATOS_HC_TMP.per_braq_hc ? $DATOS_HC_TMP.per_braq_hc : '0';

        perim_mudecaMask = IMask($('.bootbox .perim_mudeca_hc_01')[0], { mask: '00.[0]' });
        perim_mudecaMask.unmaskedValue = $DATOS_HC_TMP.per_mune_hc ? $DATOS_HC_TMP.per_mune_hc : '0';

    });

    signosPopup.on('shown.bs.modal', function () {
        $('.bootbox .ptor_hc_01').focus();
    });
}

function validarSignosFaltantes1(orden) {
    validarInputs({
        form: ".bootbox #fase_signosF1_hc_01",
        orden: orden
    },
        function () {
            validarPvc();
            bootbox.hideAll();
        },
        function () {
            validarSignosFaltantes2('1');
        }
    );
}

function validarSignosFaltantes2(orden) {
    var ptor, p_abdo, oximetria, perim_cefalico, perim_braquial, perim_mudeca;
    validarInputs({
        form: ".bootbox #fase_signosF2_hc_01",
        orden: orden
    },
        function () {
            validarSignosFaltantes1('3');
        },
        function () {
            ptor = ptorMask.value ? ptorMask.value : '0';
            ptor = parseFloat(ptor).toFixed(1).replace(/\./g, '');
            $DATOS_HC_TMP.per_tora_hc = CerosIzq(ptor, 4);

            p_abdo = p_abdoMask.value ? p_abdoMask.value : '0';
            p_abdo = parseFloat(p_abdo).toFixed(1).replace(/\./g, '');
            $DATOS_HC_TMP.perd_abdo_hc = CerosIzq(p_abdo, 4);

            $DATOS_HC_TMP.oximetria_hc = CerosIzq($('.bootbox .sv02_hc_01').val(), 3);

            perim_cefalico = perim_cefalicoMask.value ? perim_cefalicoMask.value : '0';
            perim_cefalico = parseFloat(perim_cefalico).toFixed(1).replace(/\./g, '');
            $DATOS_HC_TMP.per_cef_hc = CerosIzq(perim_cefalico, 4);

            perim_braquial = perim_braquialMask.value ? perim_cefalicoMask.value : '0';
            perim_braquial = parseFloat(perim_braquial).toFixed(1).replace(/\./g, '');
            $DATOS_HC_TMP.per_braq_hc = CerosIzq(perim_braquial, 3);

            perim_mudeca = perim_mudecaMask.value ? perim_mudecaMask.value : '0';
            perim_mudeca = parseFloat(perim_mudeca).toFixed(1).replace(/\./g, '');
            $DATOS_HC_TMP.per_mune_hc = CerosIzq(perim_mudeca, 3);

            bootbox.hideAll();
            var nit = parseInt($datos_servidor[0].conf_nit);
            if (nit == 900541158) {
                validarExamenHc();
            } else {
                setTimeout(ventanaComplementoVisual, 500);
            }
        }
    );
}

function ventanaComplementoVisual() {
    var fuente = $('#agudezaVisual').html();
    var est_izq, agud_visual_oi_1, agud_visual_oi_2, est_der, agud_visual_od_1, agud_visual_od_2;
    var complementoVisual = bootbox.dialog({
        size: '',
        onEscape: function () {
            validarTens2();
            bootbox.hideAll();
        },
        title: 'Agudeza visual',
        message: fuente
    });

    complementoVisual.init(function () {

        $('.bootbox .est_izq_hc_01').val($DATOS_HC_TMP.estructuras_oculares_oi_hc);
        $('.bootbox .agud_visual_oi_1_hc_01').val($DATOS_HC_TMP.agud_visual_oi_1_hc);
        $('.bootbox .agud_visual_oi_2_hc_01').val($DATOS_HC_TMP.agud_visual_oi_2_hc);

        $('.bootbox .est_der_hc_01').val($DATOS_HC_TMP.estructuras_oculares_od_hc);
        $('.bootbox .agud_visual_od_1_hc_01').val($DATOS_HC_TMP.agud_visual_od_1_hc);
        $('.bootbox .agud_visual_od_2_hc_01').val($DATOS_HC_TMP.agud_visual_od_2_hc);

        ventanaEstructOcularesIO();

    });
}

function ventanaEstructOcularesIO() {
    var tiposestructuras = '[{"COD": "1","DESCRIP": "SIN ALTERACIONES"},{"COD": "2", "DESCRIP": "CON ALTERACIONES"},{"COD": "3","DESCRIP": "NO APLICA"}]'
    var estructuras = JSON.parse(tiposestructuras);
    POPUP({
        array: estructuras,
        titulo: 'ESTRUCTURAS OCULARES OJO IZQUIERDO'
    },
        validarEstructOcularIO
    );
}

function validarEstructOcularIO(data) {
    if (data.id == 'F') {
        validarPvc();
        bootbox.hideAll();
    } else {
        validarOjoIzquierdo();
        var est_izq = $('.est_izq_hc_01');
        $(est_izq[1]).val(data.id + " - " + data.descripcion);
    }
}

function validarOjoIzquierdo() {
    validarInputs({
        form: "#fase_ojoIzquierdo_hc_01",
        orden: "1"
    },
        validarPvc,
        ventanaEstructOcularesOD
    );
}

function ventanaEstructOcularesOD() {
    var tiposestructuras = '[{"COD": "1","DESCRIP": "SIN ALTERACIONES"},{"COD": "2", "DESCRIP": "CON ALTERACIONES"},{"COD": "3","DESCRIP": "NO APLICA"}]'
    var estructuras = JSON.parse(tiposestructuras);
    POPUP({
        array: estructuras,
        titulo: 'ESTRUCTURAS OCULARES OJO DERECHO'
    },
        validarEstructOcularOD
    );
}

function validarEstructOcularOD(data) {
    if (data.id == 'F') {
        validarOjoIzquierdo();
    } else {
        validarOjoDerecho();
        var est_der = $('.est_der_hc_01');
        $(est_der).val(data.id + " - " + data.descripcion);
    }
}

function validarOjoDerecho(orden) {
    var est_izq, agud_visual_oi_1, agud_visual_oi_2, est_der, agud_visual_od_1, agud_visual_od_2;
    validarInputs({
        form: "#fase_ojoDerecho_hc_01",
        orden: orden
    },
        ventanaEstructOcularesOD,
        function () {
            est_izq = $('.est_izq_hc_01');
            agud_visual_oi_1 = $('.agud_visual_oi_1_hc_01');
            agud_visual_oi_2 = $('.agud_visual_oi_2_hc_01');
            est_der = $('.est_der_hc_01');
            agud_visual_od_1 = $('.agud_visual_od_1_hc_01');
            agud_visual_od_2 = $('.agud_visual_od_2_hc_01');

            $DATOS_HC_TMP.estructuras_oculares_oi_hc = $(est_izq[1]).val().split('-')[0].trim();
            $DATOS_HC_TMP.agud_visual_oi_1_hc = CerosIzq($(agud_visual_oi_1[1]).val(), 3);
            $DATOS_HC_TMP.agud_visual_oi_2_hc = CerosIzq($(agud_visual_oi_2[1]).val(), 3);

            $DATOS_HC_TMP.estructuras_oculares_od_hc = $(est_der[1]).val().split('-')[0].trim();
            $DATOS_HC_TMP.agud_visual_od_1_hc = CerosIzq($(agud_visual_od_1[1]).val(), 3);
            $DATOS_HC_TMP.agud_visual_od_2_hc = CerosIzq($(agud_visual_od_2[1]).val(), 3);

            bootbox.hideAll();
            validarExamenHc();
        }
    );
}

function validarExamenHc() {
    validarInputs({
        form: "#fase_examen_hc_01",
        orden: "1"
    },
        validarPvc,
        validarPag_05
    );
}

function validarPag_05() {
    var peso = pesoMask.value ? pesoMask.value : '0';
    peso = parseFloat(peso).toFixed(1).replace(/\./g, '');
    $DATOS_HC_TMP.peso_hc = CerosIzq(peso, 6);

    $DATOS_HC_TMP.talla_hc = CerosIzq($('#talla_hc_01').val(), 3);

    var imc = imcMask.value ? imcMask.value : '0';
    imc = parseFloat(imc).toFixed(2).replace(/\./g, '');
    $DATOS_HC_TMP.imc_hc = CerosIzq(imc, 4);

    var supC = supCMask.value ? supCMask.value : '0';
    supC = parseFloat(supC).toFixed(2).replace(/\./g, '');
    $DATOS_HC_TMP.sup_corp_hc = CerosIzq(supC, 4);

    var temp = tempMask.value ? tempMask.value : '0';
    temp = parseFloat(temp).toFixed(2).replace(/\./g, '');
    $DATOS_HC_TMP.temp_hc = CerosIzq(temp, 4);

    $DATOS_HC_TMP.fcard_hc = CerosIzq($('#fc_hc_01').val(), 3);
    $DATOS_HC_TMP.fresp_hc = CerosIzq($('#fr_hc_01').val(), 3);
    $DATOS_HC_TMP.tens1_hc = CerosIzq($('#t_hc_01').val(), 3);
    $DATOS_HC_TMP.tens2_hc = CerosIzq($('#arte_hc_01').val(), 3);
    var tens_media = parseInt($('#tam_hc_01').val());
    $DATOS_HC_TMP.tens_media_hc = CerosIzq(tens_media.toString(), 3);
    $DATOS_HC_TMP.pvc_hc = CerosIzq($('#pvc_hc_01').val(), 2);

    guardarDatosPag_05();
    var exam_gen = consultarHcDetalle($id_paciente, '4005');
    if (exam_gen.existe == 'S') {
        actualizarDetalle('4005', $('#examen_hc_01').val().trim());
    } else {
        guardarDetalle('4005', $('#examen_hc_01').val().trim());
    }
    _llenarDatosPag8();
}

function guardarDatosPag_05() {
    $bd.transaction(function (tx) {
        var sql = "UPDATE hc_aper set peso_hc ='" + $DATOS_HC_TMP.peso_hc
            + "',  talla_hc ='" + $DATOS_HC_TMP.talla_hc
            + "', imc_hc ='" + $DATOS_HC_TMP.imc_hc
            + "', sup_corp_hc ='" + $DATOS_HC_TMP.sup_corp_hc
            + "', temp_hc ='" + $DATOS_HC_TMP.temp_hc
            + "', fcard_hc ='" + $DATOS_HC_TMP.fcard_hc
            + "', fresp_hc ='" + $DATOS_HC_TMP.fresp_hc
            + "', tens1_hc ='" + $DATOS_HC_TMP.tens1_hc
            + "', tens2_hc ='" + $DATOS_HC_TMP.tens2_hc
            + "', tens_media_hc ='" + $DATOS_HC_TMP.tens_media_hc
            + "', glasg_hc ='" + $DATOS_HC_TMP.glasg_hc
            + "', pvc_hc ='" + $DATOS_HC_TMP.pvc_hc
            + "', per_tora_hc ='" + $DATOS_HC_TMP.per_tora_hc
            + "', perd_abdo_hc ='" + $DATOS_HC_TMP.perd_abdo_hc
            + "', oximetria_hc ='" + $DATOS_HC_TMP.oximetria_hc
            + "', per_cef_hc ='" + $DATOS_HC_TMP.per_cef_hc
            + "', per_braq_hc ='" + $DATOS_HC_TMP.per_braq_hc
            + "', per_mune_hc ='" + $DATOS_HC_TMP.per_mune_hc
            + "', estructuras_oculares_oi_hc ='" + $DATOS_HC_TMP.estructuras_oculares_oi_hc
            + "', agud_visual_oi_1_hc ='" + $DATOS_HC_TMP.agud_visual_oi_1_hc
            + "', agud_visual_oi_2_hc ='" + $DATOS_HC_TMP.agud_visual_oi_2_hc
            + "', estructuras_oculares_od_hc ='" + $DATOS_HC_TMP.estructuras_oculares_od_hc
            + "', agud_visual_od_1_hc ='" + $DATOS_HC_TMP.agud_visual_od_1_hc
            + "', agud_visual_od_2_hc ='" + $DATOS_HC_TMP.agud_visual_od_2_hc
            + "' where llave_hc = '" + $LLAVE_HC + "'";
        tx.executeSql(sql);
    }, errorGuardarDatosPag_05);
}

function errorGuardarDatosPag_05(err) {
    plantillaError('99', 'Error al guardar datos de la pag_5', 'BD.');
}

function _llenarDatosPag8() {
    _formHidden('8');
    var diagnosticos = $DATOS_HC_TMP.tabla_diag;
    $('#table_diagnosticos tbody').html('');
    if (diagnosticos) {
        var cod = diagnosticos.split(',');
        for (var i = 0; i < cod.length; i++) {
            _llenarTablaDiag(cod[i], i + 1);
        }
    }
    var analisis = consultarHcDetalle($id_paciente, '7501');
    $('#analisis_hc_01').val(analisis.detalle);

    $('#diagnosticoBtn_hc_01').click(function () {
        _ventanaDatos({
            titulo: "VENTANA DE ENFERMEDADES",
            columnas: ["cod", "descript"],
            data: $enfermedades,
            callback_esc: console.log("nothing"),
            callback: function (data) {
                _llenarTablaDiag(data.cod);
            }
        });
    });
    var dat;
    var dato_9005 = consultarHcDetalle($id_paciente, '9005');
    if (dato_9005.existe == 'S' || dato_9005) {
        dat = dato_9005.detalle.split('$');
        $dato_9005.valoracion_9005 = dat[0];
        $dato_9005.revaloracion_9005 = dat[1];
        $dato_9005.comer_9005 = dat[2];
        $dato_9005.lavarse_9005 = dat[3];
        $dato_9005.vestirse_9005 = dat[4];
        $dato_9005.arreglarse_9005 = dat[5];
        $dato_9005.deposicion_9005 = dat[6];
        $dato_9005.miccion_9005 = dat[7];
        $dato_9005.baño_9005 = dat[8];
        $dato_9005.trasladarse_9005 = dat[9];
        $dato_9005.deambulacion_9005 = dat[10];
        $dato_9005.escaleras_9005 = dat[11];
        $dato_9005.dependencia_funcional_9005.nivel_secuelas_9005 = dat[12];
        $dato_9005.dependencia_funcional_9005.ayuda_actividades_9005 = dat[13];
        $dato_9005.dependencia_funcional_9005.depen_funcional_9005 = dat[14];
    }

    var dato_9006 = consultarHcDetalle($id_paciente, '9006');
    if (dato_9006.existe == 'S' || dato_9006) {
        dat = dato_9006.detalle.split('$');
        $dato_9006.valoracion_9006 = dat[0];
        $dato_9006.revaloracion_9006 = dat[1];
        $dato_9006.categoria_9006 = dat[2];
        $dato_9006.actividad_normal_9006 = dat[3];
        $dato_9006.incapaz_trabajar_9006 = dat[4];
        $dato_9006.incapaz_cuidarse_9006 = dat[5];
    }

    var dato_9009 = consultarHcDetalle($id_paciente, '9009');
    if (dato_9009.existe == 'S' || dato_9009) {
        dat = dato_9009.detalle.split('$');
        $dato_9009.clasificacion_9009 = dat[0];
        $dato_9009.dimension_9009 = dat[1];
        $dato_9009.profund_tejido_9009 = dat[2];
        $dato_9009.comorbilidad_9009 = dat[3];
        $dato_9009.estado_herida_9009 = dat[4];
        $dato_9009.infeccion_9009 = dat[5];
        $dato_9009.tiempo_evolu_9009 = dat[6];
        $dato_9009.registro_foto_909 = dat[7];
    }

    validarDiagnosticos();
}

function validarDiagnosticos() {
    $('#continuar_analisis_hc_01').unbind('click').removeAttr('disabled');
    $('#diagnosticoBtn_hc_01').removeAttr('disabled');
    $('#cod_diag_hc_01').removeAttr('disabled');


    $('#continuar_analisis_hc_01').on('click', function () {
        $(this).attr('disabled', true).off('click');
        $('#cod_diag_hc_01').unbind('keyup').attr('disabled', true);
        $('#diagnosticoBtn_hc_01').attr('disabled', true);
        var nit = parseInt($datos_servidor[0].conf_nit);
        if (nit == 900541158) {
            ventanaEscalaBarthel();
        } else {
            validarAnalisis();
        }
    });

    $('#cod_diag_hc_01').focus();

    $('#cod_diag_hc_01').keyup(function (e) {

        var maxlength = $(this).attr('maxlength');
        if ($(this).val().length >= parseInt(maxlength)) {
            _llenarTablaDiag($(this).val().toString().toUpperCase());
            $(this).val("");
        }

        if (e.which == 13) {
            if ($(this).val()) {
                _llenarTablaDiag($(this).val().toString().toUpperCase());
                $(this).val("");
            } else {
                plantillaToast('', '02', '', 'warning', '');
            }
        } else if (e.which == 27) {
            _llenarDatosPag5();
            $(this).blur();
        }
    });
}

function _llenarTablaDiag(cod) {
    var array = consultarEnfermedades(cod), conteo = $('#table_diagnosticos tbody').find('tr').length + 1;
    if (array) {
        if (conteo > 10) {
            plantillaToast('', 'Tabla en su limite', '', 'warning', '');
        } else {
            var fuente = '<tr id="' + conteo + '"><td>'
                + '<label style="padding: 2px;">' + conteo + '</label>'
                + '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline" style="margin-bottom: 15px !important;">'
                + '<input type="checkbox"  value="' + conteo + '" name="delete_diagnostico">'
                + '<span></span>'
                + '</label>'
                + '<td>' + array.cod + '</td><td>' + array.descript + '</td>'
                + '</tr>';
            $('#table_diagnosticos tbody').append(fuente);
            checkDelete();
        }
    }
}


function checkDelete() {
    $("input[name='delete_diagnostico']").on('change', function () {
        var contx = 0;
        var elemento;
        $.each($("input[name='delete_diagnostico']"), function () {

            if ($(this).is(":checked")) {
                contx++;
                if (contx > 1) {
                    $(this).prop('checked', false);
                } else {
                    elemento = $(this);
                }
            }
        });

        if (contx === 1) {
            CON850_P(function (e) {
                if (e.id == 'S') {
                    var item = $('#table_diagnosticos tbody').find('tr')[$(elemento).val() - 1];
                    $(item).remove();
                } else {
                    $(elemento).prop('checked', false);
                }
            }, {
                msj: 'Desea eliminar el registro'
            });
        }
    });
}

// inicia ws dato-9005 (detalle)

function ventanaEscalaBarthel() {
    var fuente = $('#barthel').html();
    var barthelPopup = bootbox.dialog({
        size: '',
        closeButton: false,
        title: 'Escala de Barthel',
        message: fuente
    });

    barthelPopup.init(function () {
        $('.bootbox .valoracion_hc_01').val($dato_9005.valoracion_9005);
        $('.bootbox .revaloracion_hc_01').val($dato_9005.revaloracion_9005);
        $('.bootbox .comer_hc_01').val($dato_9005.comer_9005);
        $('.bootbox .lavarse_hc_01').val($dato_9005.lavarse_9005);
        $('.bootbox .vestirse_hc_01').val($dato_9005.vestirse_9005);
        $('.bootbox .arreglarse_hc_01').val($dato_9005.arreglarse_9005);
        $('.bootbox .deposicion_hc_01').val($dato_9005.deposicion_9005);
        $('.bootbox .miccion_hc_01').val($dato_9005.miccion_9005);
        $('.bootbox .baño_hc_01').val($dato_9005.baño_9005);
        $('.bootbox .trasladarse_hc_01').val($dato_9005.trasladarse_9005);
        $('.bootbox .deambulacion_hc_01').val($dato_9005.deambulacion_9005);
        $('.bootbox .escaleras_hc_01').val($dato_9005.escaleras_9005);
        validar1EraValoracion();
    });

    barthelPopup.on('shown.bs.modal', function () {
        $('.bootbox .valoracion_hc_01').focus();
    });

}

function validar1EraValoracion() {
    validarInputs({
        form: ".bootbox #fase_1era_valoracion_hc_01",
        orden: "1"
    },
        function () {
            bootbox.hideAll();
            validarDiagnosticos();
            $('#cod_diag_hc_01').focus();
        },
        function () {
            var valoracion = $('.bootbox .valoracion_hc_01').val().toString().toUpperCase();
            if (valoracion == 'S' || valoracion == 'N') {
                $dato_9005.valoracion_9005 = valoracion;
                validarRevaloracion();
            } else {
                plantillaError('99', '03', 'HC-01', validar1EraValoracion);
            }
        }
    );
}

function validarRevaloracion() {
    validarInputs({
        form: ".bootbox #fase_revaloracion_hc_01",
        orden: "1"
    },
        validar1EraValoracion,
        function () {
            var revaloracion = $('.bootbox .revaloracion_hc_01').val().toString().toUpperCase();
            if (revaloracion == 'S' || revaloracion == 'N') {
                $dato_9005.revaloracion_9005 = revaloracion;
                validarComer();
            } else {
                plantillaError('99', '03', 'HC-01', validarRevaloracion);
            }
        }
    );
}

function validarComer() {
    var fuente = '[{"COD": "1","DESCRIP": "Independiente"},{"COD": "2", "DESCRIP": "Necesita ayuda"},{"COD": "3","DESCRIP": "Dependiente"}]';
    var envioVentana = {
        titulo: "Comer",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validar1EraValoracion();
        } else {
            $('.bootbox .comer_hc_01').val(data.id + '-' + data.descripcion).focus();
            $dato_9005.comer_9005 = parseInt(data.id);
            validarLavarse();
        }
    });
}

function validarLavarse() {
    var fuente = '[{"COD": "1","DESCRIP": "Independiente"},{"COD": "2","DESCRIP": "Dependiente"}]';
    var envioVentana = {
        titulo: "Lavarse/Bañarse",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarComer();
        } else {
            $('.bootbox .lavarse_hc_01').val(data.id + '-' + data.descripcion).focus();
            $dato_9005.lavarse_9005 = parseInt(data.id);
            validarVestirse();
        }
    });
}

function validarVestirse() {
    var fuente = '[{"COD": "1","DESCRIP": "Independiente"},{"COD": "2", "DESCRIP": "Necesita ayuda"},{"COD": "3","DESCRIP": "Dependiente"}]';
    var envioVentana = {
        titulo: "Vestirse",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarLavarse();
        } else {
            $('.bootbox .vestirse_hc_01').val(data.id + '-' + data.descripcion).focus();
            $dato_9005.vestirse_9005 = parseInt(data.id);
            validarArreglarse();
        }
    });
}

function validarArreglarse() {
    var fuente = '[{"COD": "1","DESCRIP": "Independiente"},{"COD": "2","DESCRIP": "Dependiente"}]';
    var envioVentana = {
        titulo: "Arreglarse",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            if (height < 780) {
                $(".modal-body").animate({ scrollTop: $('.modal-body')[0].scrollHeight }, 0);
            }
            validarVestirse();
        } else {
            if (height < 780) {
                $(".modal-body").animate({ scrollTop: $('.modal-body')[0].scrollHeight }, 1000);
            }
            $('.bootbox .arreglarse_hc_01').val(data.id + '-' + data.descripcion).focus();
            $dato_9005.arreglarse_9005 = parseInt(data.id);
            validarDeposicion();
        }
    });
}

function validarDeposicion() {
    var fuente = '[{"COD": "1","DESCRIP": "Continente"},{"COD": "2", "DESCRIP": "Accidental ocasional"},{"COD": "3","DESCRIP": "Incontinente"}]';
    var envioVentana = {
        titulo: "Deposicion",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarArreglarse();
        } else {
            $('.bootbox .deposicion_hc_01').val(data.id + '-' + data.descripcion).focus();
            $dato_9005.deposicion_9005 = parseInt(data.id);
            validarMiccion();
        }
    });
}

function validarMiccion() {
    var fuente = '[{"COD": "1","DESCRIP": "Continente"},{"COD": "2", "DESCRIP": "Accidental ocasional"},{"COD": "3","DESCRIP": "Incontinente"}]';
    var envioVentana = {
        titulo: "Miccion",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarDeposicion();
        } else {
            $('.bootbox .miccion_hc_01').val(data.id + '-' + data.descripcion).focus();
            $dato_9005.miccion_9005 = parseInt(data.id);
            validarBaño();
        }
    });
}

function validarBaño() {
    var fuente = '[{"COD": "1","DESCRIP": "Independiente"},{"COD": "2", "DESCRIP": "Necesita ayuda"},{"COD": "3","DESCRIP": "Dependiente"}]';
    var envioVentana = {
        titulo: "Ir al baño",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarMiccion();
        } else {
            $('.bootbox .baño_hc_01').val(data.id + '-' + data.descripcion).focus();
            $dato_9005.baño_9005 = parseInt(data.id);
            validarTrasladarse();
        }
    });
}

function validarTrasladarse() {
    var fuente = '[{"COD": "1","DESCRIP": "Independiente"},{"COD": "2", "DESCRIP": "Minima ayuda"},{"COD": "3","DESCRIP": "Gran ayuda"},{"COD": "4","DESCRIP": "Dependiente"}]';
    var envioVentana = {
        titulo: "Trasladarse del sillon a la cama",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarBaño();
        } else {
            $('.bootbox .trasladarse_hc_01').val(data.id + '-' + data.descripcion).focus();
            $dato_9005.trasladarse_9005 = parseInt(data.id);
            validarDeambulacion();
        }
    });
}

function validarDeambulacion() {
    var fuente = '[{"COD": "1","DESCRIP": "Independiente"},{"COD": "2", "DESCRIP": "Necesita ayuda"},{"COD": "3","DESCRIP": "Independiente en silla de ruedas"},{"COD": "4","DESCRIP": "Dependiente"}]';
    var envioVentana = {
        titulo: "Deambulacion",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarTrasladarse();
        } else {
            $('.bootbox .deambulacion_hc_01').val(data.id + '-' + data.descripcion).focus();
            $dato_9005.deambulacion_9005 = parseInt(data.id);
            validarEscaleras();
        }
    });
}

function validarEscaleras() {
    var fuente = '[{"COD": "1","DESCRIP": "Independiente"},{"COD": "2", "DESCRIP": "Necesita ayuda"},{"COD": "3","DESCRIP": "Dependiente"}]';
    var envioVentana = {
        titulo: "Subir y bajar escaleras",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarDeambulacion();
        } else {
            $('.bootbox .escaleras_hc_01').val(data.id + '-' + data.descripcion).focus();
            $dato_9005.escaleras_9005 = parseInt(data.id)
            totalPuntajeBarthel();
        }
    });
}

function totalPuntajeBarthel() {
    var barthel = calcularBarthel();
    $('.bootbox .puntaje_total_hc_01').val(barthel).focus();

    if (barthel > 60) {
        $('.bootbox .ttal_tipo_dependecia_hc_01').val('Level').attr('style', 'background-color: green; color: white;');
    }

    if (barthel >= 50 && barthel <= 60) {
        $('.bootbox .ttal_tipo_dependecia_hc_01').val('Moderada').attr('style', 'background-color: brown; color: black;');
    }

    if (barthel >= 25 && barthel <= 45) {
        $('.bootbox .ttal_tipo_dependecia_hc_01').val('Severa').attr('style', 'background-color: red; color: black;');
    }

    if (barthel >= 0 && barthel <= 20) {
        $('.bootbox .ttal_tipo_dependecia_hc_01').val('Total').attr('style', 'background-color: red; color: black;');
    }

    CON850_P(function (e) {
        if (e.id == 'S') {
            bootbox.hideAll();
            var nit = parseInt($datos_servidor[0].conf_nit);
            setTimeout(function () {
                if (nit == 900541158) {
                    ventanaEscalaKarnosfky();
                } else {
                    ventanaDependenciaFuncional();
                }
            }, 750);
        } else {
            validar1EraValoracion();
        }
    }, { msj: "04" });

}

function calcularBarthel() {
    var calculo = 0;
    switch ($dato_9005.comer_9005) {
        case 1:
            calculo = calculo + 10;
            break;
        case 2:
            calculo = calculo + 5;
            break;
    }

    if ($dato_9005.lavarse_9005 == 1) {
        calculo = calculo + 5;
    }

    switch ($dato_9005.vestirse_9005) {
        case 1:
            calculo = calculo + 10;
            break;
        case 2:
            calculo = calculo + 5;
            break;
    }

    if ($dato_9005.arreglarse_9005 == 1) {
        calculo = calculo + 5;
    }

    switch ($dato_9005.deposicion_9005) {
        case 1:
            calculo = calculo + 10;
            break;
        case 2:
            calculo = calculo + 5;
            break;
    }

    switch ($dato_9005.miccion_9005) {
        case 1:
            calculo = calculo + 10;
            break;
        case 2:
            calculo = calculo + 5;
            break;
    }

    switch ($dato_9005.baño_9005) {
        case 1:
            calculo = calculo + 10;
            break;
        case 2:
            calculo = calculo + 5;
            break;
    }

    switch ($dato_9005.trasladarse_9005) {
        case 1:
            calculo = calculo + 15;
            break;
        case 2:
            calculo = calculo + 10;
            break;
        case 3:
            calculo = calculo + 5;
            break;
    }

    switch ($dato_9005.deambulacion_9005) {
        case 1:
            calculo = calculo + 15;
            break;
        case 2:
            calculo = calculo + 10;
            break;
        case 3:
            calculo = calculo + 5;
            break;
    }

    switch ($dato_9005.escaleras_9005) {
        case 1:
            calculo = calculo + 10;
            break;
        case 2:
            calculo = calculo + 5;
            break;
    }

    return calculo;
}


// inicia ws dato-9006 (detalle)

function ventanaEscalaKarnosfky() {
    var fuente = $('#karnofsky').html();
    var karnofskyPopup = bootbox.dialog({
        size: '',
        closeButton: false,
        title: 'Escala de Karnofsky',
        message: fuente
    });

    karnofskyPopup.init(function () {
        $('.bootbox .valoracion_kar_hc_01').val($dato_9006.valoracion_9006);
        $('.bootbox .revaloracion_kar_hc_01').val($dato_9006.revaloracion_9006);
        $('.bootbox .categoria_kar_hc_01').val($dato_9006.categoria_9006);
        $('.bootbox #categoria1_hc_01').children('td:eq(1)').text($dato_9006.actividad_normal_9006);
        $('.bootbox #categoria2_hc_01').children('td:eq(1)').text($dato_9006.incapaz_trabajar_9006);
        $('.bootbox #categoria3_hc_01').children('td:eq(1)').text($dato_9006.incapaz_cuidarse_9006);
        validar1eraValoracionKar();
    });

    karnofskyPopup.on('shown.bs.modal', function () {
        $('.bootbox .valoracion_kar_hc_01').focus();
    });
}

function validar1eraValoracionKar() {
    validarInputs({
        form: ".bootbox #fase_1era_valoracion_kar_hc_01",
        orden: "1"
    },
        function () {
            validarDiagnosticos()
            bootbox.hideAll();
        },
        function () {
            var valoracion = $('.bootbox .valoracion_kar_hc_01').val().toString().toUpperCase();
            if (valoracion == 'S' || valoracion == 'N') {
                $dato_9006.valoracion_9006 = valoracion;
                validarRevaloracionKar();
            } else {
                plantillaError('99', '03', 'HC-01', validar1eraValoracionKar);
            }
        }
    );
}

function validarRevaloracionKar() {
    validarInputs({
        form: ".bootbox #fase_revaloracion_kar_hc_01",
        orden: "1"
    },
        validar1eraValoracionKar,
        function () {
            var revaloracion = $('.bootbox .revaloracion_kar_hc_01').val().toString().toUpperCase();
            if (revaloracion == 'S' || revaloracion == 'N') {
                $dato_9006.revaloracion_9006 = revaloracion;
                validarCategoriasKar();
            } else {
                plantillaError('99', '03', 'HC-01', validarRevaloracionKar);
            }
        }
    );
}

function validarCategoriasKar() {
    var fuente = '[{"COD": "1","DESCRIP": "Capaz de realizar actividades normales, no requiere cuidados especiales"},{"COD": "2", "DESCRIP": "Incapaz de trabajar, puede vivir en casa y auto cuidarse con ayuda variables"},{"COD": "3","DESCRIP": "Incapaz de auto cuidarse. Requiere cuidados especiales, susceptible de hospitalizacion, probable avance de enfermedad"}]';
    var envioVentana = {
        titulo: "Categorias generales",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarRevaloracionKar();
        } else {
            $('.bootbox .categoria_kar_hc_01').val(data.id + '-' + data.descripcion);
            $dato_9006.categoria_9006 = parseInt(data.id);
            switch (data.id) {
                case '1':
                    $dato_9006.incapaz_trabajar_9006 = 0;
                    $dato_9006.incapaz_cuidarse_9006 = 0;
                    validarActividadNormal();
                    break;
                case '2':
                    $dato_9006.actividad_normal_9006 = 0;
                    $dato_9006.incapaz_cuidarse_9006 = 0;
                    validarIncapazTrabajar();
                    break;
                case '3':
                    $dato_9006.actividad_normal_9006 = 0;
                    $dato_9006.incapaz_trabajar_9006 = 0;
                    validarIncapazCuidarse();
                    break;
            }
            if (height < 780) {
                $(".modal-body").animate({ scrollTop: $('.modal-body')[0].scrollHeight }, 1000);
            }
        }
    });
}

function validarActividadNormal() {
    var fuente = '[{"COD": "1","DESCRIP": "Actividad normal. Sin evidencia de enfermedad"},{"COD": "2", "DESCRIP": "Actividad normal con esfuerzo, sintomas de enfermedad."},{"COD": "3","DESCRIP": "Cuida de si mismo pero es incapaz de llevar a cabo una actividad o trabajo normal"}]';
    var envioVentana = {
        titulo: "Actividades Normales",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarCategoriasKar();
        } else {
            var html = $('.bootbox tbody #categoria1_hc_01').find('td');
            $(html[1]).html(data.id + '-' + data.descripcion);
            $dato_9006.actividad_normal_9006 = parseInt(data.id);
            totalPuntajeKarnofsky();
        }
    });
}

function validarIncapazTrabajar() {
    var fuente = '[{"COD": "1","DESCRIP": "Necesita ayuda de otros pero es capaz de cuidar de si mismo para mayor parte sus necesidades"},{"COD": "2", "DESCRIP": "Requiere ayuda considerable de otros y cuidados especiales frecuentes incapacitados"},{"COD": "3","DESCRIP": "Requiere cuidados especiales. Severamente incapacitado"}]';
    var envioVentana = {
        titulo: "Incapaz de trabajar",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarCategoriasKar();
        } else {
            var html = $('.bootbox tbody #categoria2_hc_01').find('td');
            $(html[1]).html(data.id + '-' + data.descripcion);
            $dato_9006.incapaz_trabajar_9006 = parseInt(data.id);
            totalPuntajeKarnofsky();
        }
    });
}

function validarIncapazCuidarse() {
    var fuente = '[{"COD": "1","DESCRIP": "Indicacion de hospitalizacion aunque no hay indicios de muerte."},{"COD": "2", "DESCRIP": "Gravemente enfermo. Necesita asistencia activa de soporte."},{"COD": "3","DESCRIP": "Moribundo."},{"COD": "4","DESCRIP": "Fallecio.."}]';
    var envioVentana = {
        titulo: "Incapaz de trabajar",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarCategoriasKar();
        } else {
            var html = $('.bootbox tbody #categoria3_hc_01').find('td');
            $(html[1]).html(data.id + '-' + data.descripcion);
            $dato_9006.incapaz_cuidarse_9006 = parseInt(data.id);
            totalPuntajeKarnofsky();
        }
    });
}

function totalPuntajeKarnofsky() {
    var karnofsky = totalCalcularKarnofsky();

    $('.bootbox .puntaje_total_kar_hc_01').val(karnofsky);

    if (karnofsky >= 51 && karnofsky <= 100) {
        $('.bootbox .ttal_tipo_dependecia_kar_hc_01').val('Expectativa de vida mayor a 6 meses').attr('style', 'background-color: brown; color: black;');
    }

    if (karnofsky >= 0 && karnofsky <= 50) {
        $('.bootbox .ttal_tipo_dependecia_kar_hc_01').val('Alto grado de muerte en los 6 meses siguientes').attr('style', 'background-color: red; color: black;');
    }

    CON850_P(function (e) {
        if (e.id == 'S') {
            bootbox.hideAll();
            var nit = parseInt($datos_servidor[0].conf_nit);
            setTimeout(function () {
                if (nit == 900541158) {
                    ventanaDependenciaFuncional();
                } else {
                    ventanaHeridasPaq();
                }
            }, 750);
        } else {
            validar1EraValoracion();
        }
    }, { msj: "04" });

}

function totalCalcularKarnofsky() {
    var calcular = 0;
    switch ($dato_9006.actividad_normal_9006) {
        case 1:
            calcular = 100;
            break;
        case 2:
            calcular = 90;
            break;
        case 3:
            calcular = 80;
            break;
    }

    switch ($dato_9006.incapaz_trabajar_9006) {
        case 1:
            calcular = 70;
            break;
        case 2:
            calcular = 60;
            break;
        case 3:
            calcular = 50;
            break;
    }

    switch ($dato_9006.incapaz_cuidarse_9006) {
        case 1:
            calcular = 40;
            break;
        case 2:
            calcular = 30;
            break;
        case 3:
            calcular = 20;
            break;
        case 4:
            calcular = 10;
            break;
    }
    return calcular;
}

function ventanaDependenciaFuncional() {
    var fuente = $('#dependenciafuncional').html();
    var dependenciafuncionalPopup = bootbox.dialog({
        size: '',
        closeButton: false,
        title: 'Dependencia Funcional',
        message: fuente
    });

    dependenciafuncionalPopup.init(function () {
        $('.bootbox #secuelas_hc_01').val($dato_9005.dependencia_funcional_9005.nivel_secuelas_9005);
        $('.bootbox #ayuda_act_hc_01').val($dato_9005.dependencia_funcional_9005.ayuda_actividades_9005);
        $('.bootbox #depend_funcional_hc_01').val($dato_9005.dependencia_funcional_9005.depen_funcional_9005);
        validarSecuelasDepend();
    });

    dependenciafuncionalPopup.on('shown.bs.modal', function () {
        $('.bootbox #secuelas_hc_01').focus();
    });
}

function validarSecuelasDepend() {
    validarInputs({
        form: '.bootbox #fase_secuelas_hc_01',
        orden: '1'
    },
        ventanaEscalaKarnosfky,
        validarAyudaAct
    );
}

function validarAyudaAct() {
    validarInputs({
        form: '.bootbox #fase_ayuda_act_hc_01',
        orden: '1'
    },
        validarSecuelasDepend,
        validarDependFuncional
    );
}

function validarDependFuncional() {
    validarInputs({
        form: "bootbox #fase_depend_funcional_hc_01",
        orden: "1"
    },
        validarAyudaAct,
        function () {
            $dato_9005.dependencia_funcional_9005.nivel_secuelas_9005 = $('.bootbox #secuelas_hc_01').val().trim();
            $dato_9005.dependencia_funcional_9005.ayuda_actividades_9005 = $('.bootbox #ayuda_act_hc_01').val().trim();
            $dato_9005.dependencia_funcional_9005.depen_funcional_9005 = $('.bootbox #depend_funcional_hc_01').val().trim();
            bootbox.hideAll();
            ventanaHeridasPaq();
        }
    );
}

function ventanaHeridasPaq() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            var fuente = $('#formatoHeridas').html();
            var heridasPopup = bootbox.dialog({
                size: '',
                closeButton: false,
                title: 'Escala de valoracion para determinacion de paquetes de atencion clinica de heridas',
                message: fuente
            });
            heridasPopup.init(function () {
                $('.bootbox #clasificacion_hc_01').children('td:eq(1)').text($dato_9009.clasificacion_9009);
                $('.bootbox #dimension_hc_01').children('td:eq(1)').text($dato_9009.dimension_9009);
                $('.bootbox #profundidad_hc_01').children('td:eq(1)').text($dato_9009.profund_tejido_9009);
                $('.bootbox #comorbilidad_hc_01').children('td:eq(1)').text($dato_9009.comorbilidad_9009);
                $('.bootbox #estado_her_hc_01').children('td:eq(1)').text($dato_9009.estado_herida_9009);
                $('.bootbox #infeccion_hc_01').children('td:eq(1)').text($dato_9009.infeccion_9009);
                $('.bootbox #tiempo_trat_hc_01').children('td:eq(1)').text($dato_9009.tiempo_evolu_9009);
                $('.bootbox #registro_foto_hc_01').children('td:eq(1)').text($dato_9009.registro_foto_909);
                validarClasifHerida();
            });
        } else {
            validarAnalisis();
        }
    }, {
        msj: 'Escala de valoracion para determinacion de paquetes de atencion clinica de heridas. <br/> Desea diligenciar formato de heridas ?'
    });
}

function validarClasifHerida() {
    var fuente = '[{"COD": "1","DESCRIP": "Heridas agudas."},{"COD": "2", "DESCRIP": "Heridas especiales."},{"COD": "3","DESCRIP": "Heridas cronicas."}]';
    var envioVentana = {
        titulo: "Clasificacion de la herida",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            bootbox.hideAll();
            setTimeout(ventanaEscalaBarthel, 500);
        } else {
            var html = $('.bootbox #clasificacion_hc_01').find('td');
            $(html[1]).html(data.id + '-' + data.descripcion);
            $dato_9009.clasificacion_9009 = parseInt(data.id);
            validarDimensionHerida();
        }
    });
}

function validarDimensionHerida() {
    var fuente = '[{"COD": "1","DESCRIP": "Superficie < 4 CM2."},{"COD": "2", "DESCRIP": "Superficie = 4 -< 16 CM2."},{"COD": "3","DESCRIP": "Superficie = 16 -< 36 CM2."}, {"COD": "4","DESCRIP": "Superficie = 36 -< 64 CM2."}, {"COD": "5","DESCRIP": "Superficie = 64 -< 100 CM2."}, {"COD": "3","DESCRIP": "Superficie = >= 100 CM2."}]';
    var envioVentana = {
        titulo: "Dimension de la herida",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarClasifHerida();
        } else {
            var html = $('.bootbox #dimension_hc_01').find('td');
            $(html[1]).html(data.id + '-' + data.descripcion);
            $dato_9009.dimension_9009 = parseInt(data.id);
            validarProfundTejido();
        }
    });
}

function validarProfundTejido() {
    var fuente = '[{"COD": "1","DESCRIP": "Piel intacta o cicatrizada."},{"COD": "2", "DESCRIP": "Afectacion de la Dermis-Epidermis."},{"COD": "3","DESCRIP": "Afectacion de tejido sucutaneo (tejido adiposo sin llegar a la fascia del musculo)."}, {"COD": "4","DESCRIP": "Afectacion del musculo."}, {"COD": "5","DESCRIP": "Afectacion del hueso y tejido anexos. (Tendones, ligamentos, capsula articular o escara negra que no permite ver los tejidos debajo de ella)."}, {"COD": "3","DESCRIP": "Superficie = >= 100 CM2."}]';
    var envioVentana = {
        titulo: "Profundidad/Tejidos afectados",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarDimensionHerida();
        } else {
            var html = $('.bootbox #profundidad_hc_01').find('td');
            $(html[1]).html(data.id + '-' + data.descripcion);
            $dato_9009.profund_tejido_9009 = parseInt(data.id);
            validarComorbilidad();
        }
    });
}

function validarComorbilidad() {
    var fuente = '[{"COD": "1","DESCRIP": "Sin patologias asociadas."},{"COD": "2", "DESCRIP": "Con 1 patologia como comorbilidad asociada."},{"COD": "3","DESCRIP": "Con 2 patologias como comorbilidad asociadas."}]';
    var envioVentana = {
        titulo: "Comorbilidad",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarProfundTejido();
        } else {
            var html = $('.bootbox #comorbilidad_hc_01').find('td');
            $(html[1]).html(data.id + '-' + data.descripcion);
            $dato_9009.comorbilidad_9009 = data.id;
            validarEstadioHerida();
            if (height < 780) {
                $(".modal-body").animate({ scrollTop: $('.modal-body')[0].scrollHeight }, 1000);
            }
        }
    });
}

function validarEstadioHerida() {
    var fuente = '[{"COD": "1","DESCRIP": "Estadio I."},{"COD": "2", "DESCRIP": "Estadio II."},{"COD": "3","DESCRIP": "Estadio III."}, {"COD": "4","DESCRIP": "Estadio IV."}]';
    var envioVentana = {
        titulo: "estadio de la herida",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarComorbilidad();
        } else {
            var html = $('.bootbox #estado_her_hc_01').find('td');
            $(html[1]).html(data.id + '-' + data.descripcion);
            $dato_9009.estado_herida_9009 = parseInt(data.id);
            validarInfecion();
        }
    });
}

function validarInfecion() {
    var fuente = '[{"COD": "1","DESCRIP": "No evidencia signos de infeccion."},{"COD": "2", "DESCRIP": "Si evidencia signos de infeccion."}]';
    var envioVentana = {
        titulo: "Infeccion",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarEstadioHerida();
        } else {
            var html = $('.bootbox #infeccion_hc_01').find('td');
            $(html[1]).html(data.id + '-' + data.descripcion);
            $dato_9009.infeccion_9009 = data.id;
            validarTiempoEvol();
        }
    });
}

function validarTiempoEvol() {
    var fuente = '[{"COD": "1","DESCRIP": "De 1 a 4 meses."},{"COD": "2", "DESCRIP": "De 5 a 8 meses."},{"COD": "3", "DESCRIP": "De 9 a 12 meses."}, {"COD": "4", "DESCRIP": "Mas de 12 meses."}]';
    var envioVentana = {
        titulo: "Tiempo de evoucion en tratamiento",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarInfecion();
        } else {
            var html = $('.bootbox #tiempo_trat_hc_01').find('td');
            $(html[1]).html(data.id + '-' + data.descripcion);
            $dato_9009.tiempo_evolu_9009 = data.id;
            validarRegistroFoto();
        }
    });
}

function validarRegistroFoto() {
    var fuente = '[{"COD": "1","DESCRIP": "Con evidente evolucion."},{"COD": "2", "DESCRIP": "Evolucion estancada."},{"COD": "3", "DESCRIP": "Con retroceso evidente en la evolucion."}]';
    var envioVentana = {
        titulo: "Registro fotografico",
        fuente: JSON.parse(fuente)
    };

    _ventanaSc_8x(envioVentana, function (data) {
        if (data.id == 'F') {
            validarTiempoEvol();
        } else {
            var html = $('.bootbox #registro_foto_hc_01').find('td');
            $(html[1]).html(data.id + '-' + data.descripcion);
            $dato_9009.registro_foto_909 = parseInt(data.id);
            puntajeTotalHeridas();
        }
    });
}

function puntajeTotalHeridas() {
    var heridas = calcularHeridas();

    $('.bootbox .puntaje_total_her_hc_01').val(heridas);

    if (heridas >= 0 && heridas <= 12) {
        $('.bootbox .ttal_tipo_dependecia_her_hc_01').val('Paquete de baja complejida').attr('style', 'background-color: green; color: white;');
    }

    if (heridas >= 12 && heridas <= 22) {
        $('.bootbox .ttal_tipo_dependecia_her_hc_01').val('Paquete de media complejida').attr('style', 'background-color: brown; color: black;');
    }

    if (heridas >= 0 && heridas <= 12) {
        $('.bootbox .ttal_tipo_dependecia_her_hc_01').val('Paquete de alta complejida').attr('style', 'background-color: red; color: white;');
    }

    CON850_P(function (e) {
        if (e.id == 'S') {
            bootbox.hideAll();
            validarAnalisis();
        } else {
            validar1EraValoracion();
        }
    }, { msj: "04" });
}

function calcularHeridas() {
    var calculo = 0;

    switch ($dato_9009.clasificacion_9009) {
        case 1:
            calculo = calculo + 1;
            break;
        case 2:
            calculo = calculo + 2;
            break;
        case 3:
            calculo = calculo + 3;
            break;
    }

    switch ($dato_9009.dimension_9009) {
        case 1:
            calculo = calculo + 0;
            break;
        case 2:
            calculo = calculo + 1;
            break;
        case 3:
            calculo = calculo + 2;
            break;
        case 4:
            calculo = calculo + 3;
            break;
        case 5:
            calculo = calculo + 4;
            break;
        case 6:
            calculo = calculo + 5;
            break;
    }

    switch ($dato_9009.profund_tejido_9009) {
        case 1:
            calculo = calculo + 0;
            break;
        case 2:
            calculo = calculo + 1;
            break;
        case 3:
            calculo = calculo + 2;
            break;
        case 4:
            calculo = calculo + 3;
            break;
        case 5:
            calculo = calculo + 4;
            break;
    }

    switch ($dato_9009.comorbilidad_9009) {
        case "1":
            calculo = calculo + 0;
            break;
        case "2":
            calculo = calculo + 2;
            break;
        case "3":
            calculo = calculo + 3;
            break;
    }

    switch ($dato_9009.estado_herida_9009) {
        case 1:
            calculo = calculo + 1;
            break;
        case 2:
            calculo = calculo + 2;
            break;
        case 3:
            calculo = calculo + 3;
            break;
        case 4:
            calculo = calculo + 4;
            break;
    }

    switch ($dato_9009.infeccion_9009) {
        case "1":
            calculo = calculo + 0;
            break;
        case "2":
            calculo = calculo + 3;
            break;
    }

    switch ($dato_9009.tiempo_evolu_9009) {
        case "1":
            calculo = calculo + 1;
            break;
        case "2":
            calculo = calculo + 2;
            break;
        case "3":
            calculo = calculo + 3;
            break;
        case "4":
            calculo = calculo + 4;
            break;
    }

    switch ($dato_9009.registro_foto_909) {
        case "1":
            calculo = calculo + 1;
            break;
        case "2":
            calculo = calculo + 2;
            break;
        case "3":
            calculo = calculo + 4;
            break;
    }
    return calculo;
}


function _ventanaSc_8x(parametros, callback) {
    POPUP({
        array: parametros.fuente,
        titulo: parametros.titulo
    },
        callback
    );
}


function validarAnalisis() {
    validarInputs({
        form: "#fase_analisis_hc_01",
        orden: "1"
    },
        validarDiagnosticos,
        validarPag_08
    );
}

function validarPag_08() {
    var array = new Array(), tabla_diag = '';
    $('#table_diagnosticos tbody tr').each(function (k, v) {
        array[k] = new Array();
        array[k] = $(v).find('td')[1].innerHTML;
        tabla_diag += $(v).find('td')[1].innerHTML + ",";
    });
    $DATOS_HC_TMP.tabla_diag = tabla_diag;
    guardarDatosPag_08(array);

    var string_dato_9005 = organizarArrayDetalle($dato_9005);

    var dato_9005 = consultarHcDetalle($id_paciente, '9005');
    if (dato_9005.existe == 'S') {
        actualizarDetalle('9005', string_dato_9005);
    } else {
        guardarDetalle('9005', string_dato_9005);
    }

    var string_dato_9006 = organizarArrayDetalle($dato_9006);

    var dato_9006 = consultarHcDetalle($id_paciente, '9006');
    if (dato_9006.existe == 'S') {
        actualizarDetalle('9006', string_dato_9006);
    } else {
        guardarDetalle('9006', string_dato_9006);
    }

    var string_dato_9009 = organizarArrayDetalle($dato_9009);

    var dato_9009 = consultarHcDetalle($id_paciente, '9009');
    if (dato_9009.existe == 'S') {
        actualizarDetalle('9009', string_dato_9009);
    } else {
        guardarDetalle('9009', string_dato_9009);
    }

    var analisis = consultarHcDetalle($id_paciente, '7501');
    if (analisis.existe == 'S') {
        actualizarDetalle('7501', $('#analisis_hc_01').val().trim());
    } else {
        guardarDetalle('7501', $('#analisis_hc_01').val().trim());
    }
    _llenarDatosPag10();
}

function organizarArrayDetalle(array) {
    var string = '';
    $.each(array, function (index, elem) {
        var newstring = '';
        if (typeof array[index] == 'object') {
            $.each(array[index], function (index2, elem2) {
                newstring += array[index][index2].trim() + "$";
            });
        } else {
            newstring = array[index] + "$";
        }
        string += newstring;
    });
    return string;
}



function guardarDatosPag_08(tabla) {
    $bd.transaction(function (tx) {
        var sql = "UPDATE hc_aper set tabla_diag ='" + tabla + "' where llave_hc = '" + $LLAVE_HC + "'";
        tx.executeSql(sql);
    }, errorGuardarDatosPag_08);
}

function errorGuardarDatosPag_08(err) {
    plantillaError('99', 'Error al guardar datos Pag_08.', 'BD.');
}

$('#volverPag_10').click(_llenarDatosPag8);

function _llenarDatosPag10() {
    _formHidden('10');

    var cod_profesional = $DATOS_HC_TMP.atiende_hc ? $DATOS_HC_TMP.atiende_hc : $usuario.id_usu;
    var profesional = consult_atiendProf(cod_profesional);;

    var embar = consult_embar($DATOS_HC_TMP.embarazo_hc);
    var causa = consult_causa($DATOS_HC_TMP.causa_hc);
    var tipo_diag = consult_tipoDiagn($DATOS_HC_TMP.tipo_diag_hc);
    var finalidad = consult_finalidad($DATOS_HC_TMP.finalidad_hc);
    var metodPlanif = consult_planifica($DATOS_HC_TMP.planifica_hc);
    var estad_salid = estad_salida($DATOS_HC_TMP.estado_sal_hc);

    $('#pers_atiend_hc_01').val(cod_profesional + " - " + profesional);
    $('#est_grav_hc_01').val($DATOS_HC_TMP.embarazo_hc ? $DATOS_HC_TMP.embarazo_hc : '' + " " + embar);
    $('#causa_hc_01').val($DATOS_HC_TMP.causa_hc ? $DATOS_HC_TMP.causa_hc : '' + " " + causa);
    $('#tipo_diagn_hc_01').val($DATOS_HC_TMP.tipo_diag_hc ? $DATOS_HC_TMP.tipo_diag_hc : '' + " " + tipo_diag);
    $('#pyp_hc_01').val();
    $('#final_hc_01').val($DATOS_HC_TMP.finalidad_hc ? $DATOS_HC_TMP.finalidad_hc : '' + " " + finalidad);

    $('#1eraVez_hc_01').val($DATOS_HC_TMP.primera_vez_hc ? $DATOS_HC_TMP.primera_vez_hc : '');
    $('#metodPlanFamil_hc_01').val($DATOS_HC_TMP.planifica_hc ? $DATOS_HC_TMP.planifica_hc : '' + " " + metodPlanif);
    $('#est_sal_hc_01').val($DATOS_HC_TMP.estado_sal_hc ? $DATOS_HC_TMP.estado_sal_hc : '' + " " + estad_salid);
    $('#remit_hc_01').val($DATOS_HC_TMP.remitido_hc ? $DATOS_HC_TMP.remitido_hc : '');
    $('#diagn_muert_hc_01').val($DATOS_HC_TMP.diag_muert_hc ? $DATOS_HC_TMP.diag_muert_hc : '');
    $('#pacien_observ_hc_01').val($DATOS_HC_TMP.observ_hc ? $DATOS_HC_TMP.observ_hc : '');
    $('#conf_triage_hc_01').val($DATOS_HC_TMP.triage_hc ? $DATOS_HC_TMP.triage_hc : '');
    $('#numer_acomp_hc_01').val($DATOS_HC_TMP.id_acompa_hc ? $DATOS_HC_TMP.id_acompa_hc : '');
    $('#nomb_acom_hc_01').val($DATOS_HC_TMP.acompa_hc);

    $DATOS_HC_TMP.embriaguez_hc = $DATOS_HC_TMP.embriaguez_hc ? $DATOS_HC_TMP.embriaguez_hc : 'N';
    if ($DATOS_HC_TMP.embriaguez_hc == 'S') {
        $('#estad_embriag_hc_01').val('Si');
    } else if ($DATOS_HC_TMP.embriaguez_hc == 'N') {
        $('#estad_embriag_hc_01').val('No');
    }
    evaluarEstadoEmbarazo();
}


function evaluarEstadoEmbarazo() {
    var sw_embar = 'N';
    var edad = calcularEdadUnidad($dtos_pacie['fecha_nacimiento_paci'].trim());
    var fuenteEmbarazo = '[{"COD": "1","DESCRIP": "1ER TRIM. EMBA"},{"COD": "2", "DESCRIP": "2DO TRIM. EMBA"},{"COD": "3","DESCRIP": "3ER TRIM. EMBA"},{"COD": "4","DESCRIP": "NO DECLARA"},{"COD": "9","DESCRIP": "NO APLICA"}]';

    $DATOS_HC_TMP.embarazo_hc = $DATOS_HC_TMP.embarazo_hc ? $DATOS_HC_TMP.embarazo_hc : '';
    if (sw_embar !== 'S' && ($DATOS_HC_TMP.embarazo_hc == '4' || $DATOS_HC_TMP.embarazo_hc == '9' || $DATOS_HC_TMP.embarazo_hc == '')) {
        if ($dtos_pacie.sex_paci == 'M') {
            leerEstadoEmbarazo('9');
        } else {
            if ((edad.unid_edad == 'D' || edad.unid_edad == 'M') || (edad.unid_edad == 'A' && edad.edad < 11)) {
                leerEstadoEmbarazo('9');
            } else {
                POPUP({
                    array: JSON.parse(fuenteEmbarazo),
                    titulo: 'ESTADO EMBARAZO'
                },
                    function (data) {
                        leerEstadoEmbarazo(data.id);
                    }
                );
            }
        }
    } else {
        leerEstadoEmbarazo($DATOS_HC_TMP.embarazo_hc);
    }
}

function leerEstadoEmbarazo(embarazo) {
    var edad = calcularEdadUnidad($dtos_pacie['fecha_nacimiento_paci'].trim()), data = consult_embar(embarazo);
    if (embarazo == '9') {
        if ($dtos_pacie.sex_paci == 'F' && (edad.unid_edad == 'A' && edad.edad > 10)) {
            evaluarEstadoEmbarazo();
        } else {
            evaluarCausa();
        }
    } else {
        evaluarCausa();
    }
    $DATOS_HC_TMP.embarazo_hc = embarazo;
    $('#est_grav_hc_01').val(embarazo + " - " + data);
}

function evaluarCausa() {
    var fuenteCausa = '[{"COD": "1","DESCRIP": "ACCIDENTE DE TRABAJO"},{"COD": "2", "DESCRIP": "ACCIDENTE DE TRANSITO"},{"COD": "3","DESCRIP": "ACCIDENTE RABICO"},{"COD": "4","DESCRIP": "ACCIDENTE OFIDICO"},{"COD": "5","DESCRIP": "OTRO TIPO ACCIDENTE"},{"COD": "6","DESCRIP": "EVENTO CATASTROFICO"},{"COD": "7","DESCRIP": "LESION POR AGRESION"},{"COD": "8","DESCRIP": "LESION AUTOINFLINGIDA"},{"COD": "9","DESCRIP": "SOSPECHA MALTRATO FISICO"},{"COD": "A","DESCRIP": "SOSPECHA ABUSO SEXUAL"},{"COD": "B","DESCRIP": "SOSPECHA VIOLENCIA SEXUAL"},{"COD": "C","DESCRIP": "SOSPECHA MALTRATO EMOCIONAL"},{"COD": "D","DESCRIP": "ENFERMEDAD GENERAL"},{"COD": "E","DESCRIP": "ENFERMEDAD PROFESIONAL"},{"COD": "G","DESCRIP": "NO APLICA"}]';
    POPUP({
        array: JSON.parse(fuenteCausa),
        titulo: 'CAUSA EXTERNA'
    },
        validarCausa
    );
}

function validarCausa(data) {
    if (data.id == 'F') {
        _llenarDatosPag8();
    } else {
        switch (data.id) {
            case 'A':
                data.id = '10'
                break;
            case 'B':
                data.id = '11'
                break;
            case 'C':
                data.id = '12'
                break;
            case 'D':
                data.id = '13'
                break;
            case 'E':
                data.id = '14'
                break;
            case 'G':
                data.id = '15'
                break;
        }
        var causa = consult_causa(data.id);
        $('#causa_hc_01').val(data.id + "  " + causa);
        $DATOS_HC_TMP.causa_hc = data.id;
        var diagnosticos = $DATOS_HC_TMP.tabla_diag, cod_diag1 = diagnosticos.split(',')[0];
        var nit = parseInt($datos_servidor[0].conf_nit);
        if ((cod_diag1 == 'T781' || cod_diag1 == 'T782' || cod_diag1 == 'T783' || cod_diag1 == 'T784' || cod_diag1 == 'T788' || cod_diag1 == 'T789') ||
            (nit == 900005594) && (cod_diag1.toString().substr(1, 1) == 'S' || cod_diag1.toString().substr(1, 1) == 'T')) {
            evaluarTipoDiagnostico();
        } else {
            if ((data.id == '13' || data.id == '15') && (cod_diag1.toString().substr(1, 1) == 'S' || cod_diag1.toString().substr(1, 1) == 'T')) {
                plantillaToast('', '7E', '', 'warning', '');
                evaluarCausa();
            } else {
                evaluarTipoDiagnostico();
            }
        }
    }
}

function evaluarTipoDiagnostico() {
    var fuenteTiposDiag = '[{"COD": "1","DESCRIP": "IMPRESION DIAGNOSTICA"},{"COD": "2", "DESCRIP": "CONFIRMADO NUEVO"},{"COD": "3","DESCRIP": "CONFIRMADO REPETIDO"},{"COD": "9","DESCRIP": "NO APLICA"}]';
    POPUP({
        array: JSON.parse(fuenteTiposDiag),
        titulo: 'TIPO DE DIAGNOSTICO'
    },
        validarTipoDiagnostico
    );
}

function validarTipoDiagnostico(data) {
    if (data.id == 'F') {
        evaluarCausa();
    } else {
        var tipodiag = consult_tipoDiagn(data.id);
        $DATOS_HC_TMP.tipo_diag_hc = data.id;
        $('#tipo_diagn_hc_01').val(data.id + " - " + tipodiag);

        $DATOS_HC_TMP.finalidad_hc = "10";
        var finalidad = consult_finalidad($DATOS_HC_TMP.finalidad_hc);
        $('#final_hc_01').val($DATOS_HC_TMP.finalidad_hc + " - " + finalidad);


        $DATOS_HC_TMP.primera_vez_hc = '';
        $DATOS_HC_TMP.nro_contr_hc = '0';
        $DATOS_HC_TMP.cronico_hc = '';
        evaluarDatoSalida();
    }
}

function evaluarDatoSalida() {
    var tipoestadosal = '[{"COD": "1","DESCRIP": "VIVO (a)"},{"COD": "2", "DESCRIP": "MUERTO (a)"},{"COD": "3","DESCRIP": "REMITIDO"},{"COD": "4","DESCRIP": "HOSPITALIZADO"},{"COD": "5","DESCRIP": "OBSERVACION"},{"COD": "6","DESCRIP": "NO APLICA"}]';
    var tiposestadosal = JSON.parse(tipoestadosal);
    POPUP({
        array: tiposestadosal,
        titulo: 'TIPO DE DIAGNOSTICO'
    },
        validarDatoSalida
    );
}

function validarDatoSalida(data) {
    if (data.id == 'F') {
        evaluarTipoDiagnostico();
    } else {
        var estadoSalida = estad_salida(data.id);
        $DATOS_HC_TMP.estado_sal_hc = data.id;
        $('#est_sal_hc_01').val(data.id + " - " + estadoSalida);
        if (data.id == '3') {
            evaluarDatoRemitido();
        } else {
            if (data.id == '2') {
                evaluarDiagMuerte();
            } else {
                validarDiagMueter('');
            }
        }
    }
}

function evaluarDatoRemitido() {
    validarInputs({
        form: "#fase_remitido_hc_01",
        orden: "1"
    },
        evaluarDatoSalida,
        function () {
            if ($('#remit_hc_01').val()) {
                $DATOS_HC_TMP.remitido_hc = $('#remit_hc_01').val();
                evaluarDiagMuerte();
            } else {
                $('#remit_hc_01').unbind('keyup');
                plantillaToast('', '02', null, 'warning', 'error');
                evaluarDatoRemitido();
            }
        }
    );
}

function evaluarDiagMuerte() {
    validarInputs({
        form: "#fase_diag_muerte_hc_01",
        orden: "1"
    },
        evaluarDatoSalida,
        function () {
            validarDiagMueter($('#diagn_muert_hc_01').val());
        }
    );
}

function validarDiagMueter(diagnostico) {
    diagnostico = diagnostico.toString().toUpperCase();
    $DATOS_HC_TMP.diag_muert_hc = diagnostico;
    if ($DATOS_HC_TMP.estado_sal_hc == '2' && diagnostico.trim() == '') {
        plantillaToast('', '02', null, 'warning', 'error');
        evaluarDiagMuerte();
    } else {
        var enfermedad = consultarEnfermedades(diagnostico);
        $('#diagn_muert_hc_01').val(diagnostico + " - " + enfermedad.descript);
        confirmar();
    }
}

function confirmar() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            finGuaradar();
        } else {
            evaluarCausa();
        }
    }, { msj: "01" });
}


function finGuaradar() {
    $bd.transaction(function (tx) {
        var sql = "UPDATE hc_aper set triage_hc ='" + $DATOS_HC_TMP.triage_hc
            + "',  causa_hc ='" + $DATOS_HC_TMP.causa_hc
            + "',  finalidad_hc ='" + $DATOS_HC_TMP.finalidad_hc
            + "',  embarazo_hc ='" + $DATOS_HC_TMP.embarazo_hc
            + "',  estado_sal_hc ='" + $DATOS_HC_TMP.estado_sal_hc
            + "',  remitido_hc ='" + $DATOS_HC_TMP.remitido_hc
            + "',  observ_hc ='" + $DATOS_HC_TMP.observ_hc
            + "',  cronico_hc ='" + $DATOS_HC_TMP.cronico_hc
            + "',  primera_vez_hc ='" + $DATOS_HC_TMP.primera_vez_hc
            + "',  nro_contr_hc ='" + $DATOS_HC_TMP.nro_contr_hc
            + "',  tipo_diag_hc ='" + $DATOS_HC_TMP.tipo_diag_hc
            + "', estado_hc ='" + "1"
            + "', temporal_hc ='" + "0"
            + "',  id_acompa_hc ='" + $DATOS_HC_TMP.id_acompa_hc
            + "',  embriaguez_hc ='" + $DATOS_HC_TMP.embriaguez_hc
            + "',  planifica_hc ='" + $DATOS_HC_TMP.planifica_hc
            + "',  diag_muert_hc ='" + $DATOS_HC_TMP.diag_muert_hc
            + "',  estado_servidor_web_hc ='" + 0
            + "' where llave_hc = '" + $LLAVE_HC + "'";
        tx.executeSql(sql);
    }, errorFinGuardar, hc002f);
}

function errorFinGuardar() {
    plantillaError('99', 'Error al finalizar el gaurdado de la apertura.', 'BD.');
}

function hc002f() {
    consultarHistoriasClinicas();
    plantillaError('', 'Proceso de apertura terminado correctamente.', 'HC', function () {
        $('#cuerpo_user').html('');
        $('#cuerpo_user').load('../paginas/hc002f.html');
    });
}

// detalles 
function guardarDetalle(cod, detalle) {
    $bd.transaction(function (tx) {
        var sql = "Insert into hc_detal VALUES('"
            + $LLAVE_HC + "','"
            + $id_paciente + "','"
            + cod + "','"
            + detalle + "','"
            + "0" + "')";
        tx.executeSql(sql);
    }, errorGuardarDetalle, function () {
        var element = { "cod": $LLAVE_HC, "cod_paci": $id_paciente, "cod_grpo": cod, "detalle": detalle }
        $hc_detalles.push(element);
    });
}

function actualizarDetalle(cod, detalle) {
    // var detalle_hc = $_HC_01.DETALLES.indexOf(index => item == {"COD-DETHC": cod});
    var item = { "LLAVE-HC": $_HC_01.HISTORIA.LLAVE, "COD-DETHC": cod, "DETALLE": detalle };
    var detalle_hc = $_HC_01.DETALLES.indexOf(index => item == index);
    console.log(detalle_hc);
}

function modificarArrayDetalle(cod, detalle) {
    $hc_detalles.map(function (element) {
        if (element.cod == $LLAVE_HC && element.cod_grpo == cod) {
            element.detalle = detalle;
        }
    });
}

function errorGuardarDetalle(err) {
    plantillaError('99', 'Error al grabar detalle', 'BD.');
}

function _formHidden(pag) {
    var forms = $("[id^='pag_']");
    for (var i = 0; i < forms.length; i++) {
        var num_pag = $(forms[i]).attr('id').split('_');
        if (num_pag[1] == pag)
            $(forms[i]).removeClass('hidden');
        else
            $(forms[i]).addClass('hidden');
    }
}