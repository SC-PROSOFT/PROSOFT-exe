$novedad = '';

var ptorMask, p_abdoMask, perim_cefalicoMask, perim_braquialMask, perim_mudecaMask;

var pesoMask = IMask($('#peso_hc_01')[0], {mask: '{000}00.[0]'});

var imcMask = IMask($("#imc_hc_01")[0], {mask: "00.00"});
var supCMask = IMask($("#supc_hc_01")[0], {mask: "00.00"});
var tempMask = IMask($("#temp_hc_01")[0], {mask: "00.00"});

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

$(document).ready(function () {
    _inputControl('disabled');
    _inputControl('reset');
    cargarEnferm();
    console.debug(document.getElementById('peso_hc_01'));
});

function cargarEnferm() {
    SolicitarDll2({ datosh: datosEnvio() },
        function (data) {
            var res = data.split('|');
            console.debug(res);
            if (res[0].trim() == '00') {
                SolicitarDatos2({},
                    function (enferm) {
                        $_ENFERMEDADES = enferm.ENFERM;
                        $_ENFERMEDADES.pop();
                        leer_historia();
                    },
                    { url: "SC-ARCHENF" });
            } else {
                plantillaError(res[0], res[1], res[2]);
            }
        }
        , { url: "app/HCENFER.Dll", modulo: "HICLIN" });
}

function leer_historia() {
    var data = dataSession();
    datos_envio = datosEnvio();
    datos_envio += $LLAVE_HC;
    datos_envio += "|";
    datos_envio += data.split('|')[1];
    datos_envio += "|";
    console.debug(datos_envio)
    SolicitarDll2({ datosh: datos_envio },
        function (data) {
            var res = data.split('|');
            console.debug(res)
            $novedad = res[1];
            if (res[0].trim() == '00') {
                SolicitarDatos2({}, function (HC_PAC) { $DATOS_HC = HC_PAC['HC-PAC']; }, { url: "SC-HCPAC" });
                _cargarHcDetal();
            } else {
                plantillaError(res[0], res[1], res[2]);
            }
        }
        , { url: "app/HC-01.Dll", modulo: "HICLIN" });
}

function _cargarHcDetal() {
    var data = dataSession();
    datos_envio = datosEnvio();
    datos_envio += $LLAVE_HC;
    datos_envio += "|";
    datos_envio += data.split('|')[1];
    datos_envio += "|";
    datos_envio += "1001";
    datos_envio += ";";
    datos_envio += "2002";
    datos_envio += ";";
    datos_envio += "2010";
    datos_envio += ";";
    datos_envio += "2020";
    datos_envio += ";";
    datos_envio += "2030";
    datos_envio += ";";
    datos_envio += "2035";
    datos_envio += ";";
    datos_envio += "2040";
    datos_envio += ";";
    datos_envio += "2050";
    datos_envio += ";";
    datos_envio += "2060";
    datos_envio += ";";
    datos_envio += "2070";
    datos_envio += ";";
    datos_envio += "2080";
    datos_envio += ";";
    datos_envio += "3010";
    datos_envio += ";";
    datos_envio += "3020";
    datos_envio += ";";
    datos_envio += "3030";
    datos_envio += ";";
    datos_envio += "3040";
    datos_envio += ";";
    datos_envio += "3050";
    datos_envio += ";"
    datos_envio += "3060";
    datos_envio += ";"
    datos_envio += "3070";
    datos_envio += ";"
    datos_envio += "3080";
    datos_envio += ";"
    datos_envio += "3090";
    datos_envio += ";"
    datos_envio += "3095";
    datos_envio += ";"
    datos_envio += "4040";
    datos_envio += ";"
    datos_envio += "9005";
    datos_envio += ";"
    datos_envio += "9006";
    datos_envio += ";"
    datos_envio += "9009";
    datos_envio += ";"
    datos_envio += "|";
    SolicitarDll2({ datosh: datos_envio },
        function (data) {
            var res = data.split('|');
            if (res[0].trim() == '00') {
                SolicitarDatos2({},
                    function (hcdetal) {
                        $DATOS_DETHC = hcdetal.DETHC;
                        $DATOS_DETHC.pop();
                        loader('hide');
                        console.debug($DATOS_DETHC);
                        montar_pantallas();
                    },
                    { url: "SC-HCDETAL-ANT" });

            } else {
                plantillaError(res[0], res[1], res[2]);
            }
        }
        , { url: "app/HCDETAL-ANT.Dll", modulo: "HICLIN" });
}

function montar_pantallas() {
    var fecha = $DATOS_HC[0].FECHA;
    var hora = $DATOS_HC[0].HORA;
    $('#ano_hc_01').val(fecha.substr(0, 4));
    $('#mes_hc_01').val(fecha.substr(4, 2));
    $('#dia_hc_01').val(fecha.substr(6, 2));
    $('#hora_hc_01').val(hora.substr(0, 2));
    $('#min_hc_01').val(hora.substr(2, 2));
    $('#med_hc_01').val(sessionStorage.getItem('Usuar'));
    if ($novedad == '8') {
        $('#act_hc_01').val('Actualizando');
    } else {
        $('#act_hc_01').val('Creando');
    }
    var retornar = _consultaSql({
        sql: 'SELECT * FROM sc_unser',
        callback: function (error, results, fields) {
            if (error) throw error;
            else {
                console.debug(fields)
            }
        }
    })
    $('#descrip_hc_01').val($DATOS_HC[0].SERV);
    _llenarDatosPag1();
    //_llenarDatosPag5();
}

function _llenarDatosPag1() {
    _formHidden('1');
    var procedencia = $DATOS_HC[0].PROCEDEN;
    var motivoconsulta = $DATOS_HC[0].MOTIVO;
    $('#proced_hc_01').val(procedencia.trim());
    $('#motiv_hc_01').val(motivoconsulta.trim());
    var enferm_act = consult_ultdethc('1001');
    $('#enfer_act_hc_01').html(enferm_act.DETALLE.trim());
    validarProcedencia();
}

function validarProcedencia() {
    validarInputs({
        form: "#fase_procedencia_hc_01",
        orden: "1"
    },
        _toggleNav,
        on_validarProcedencia
    );
}

function on_validarProcedencia() {
    var fuente = $('#plantillaAcompañante').html();
    var acompa;
    var acompantePopup = bootbox.dialog({
        size: '',
        onEscape: function () { _llenarDatosPag1() },
        title: 'Acompañante de consulta',
        message: fuente
    });
    
    acompantePopup.init(function () {
        validarPopupAcompañante();
        acompa = $(".acompañantehc_01");
        $(acompa[1]).val($DATOS_HC[0].ACOMPA.trim());
    });

    acompantePopup.on('shown.bs.modal', function () {
        $(acompa[1]).focus();
    });
}

function validarPopupAcompañante() {
    validarInputs({
        form: "#acompañantePopup",
        orden: "1"
    },
        function () {console.debug('debe volver');},
        on_validarPopupAcompañante
    );
}
function on_validarPopupAcompañante() {
    var acompa = $(".acompañantehc_01");
    $DATOS_HC[0].ACOMPA = $(acompa[1]).val().trim();
    bootbox.hideAll();
    validarMotivHc_01();
}

function validarMotivHc_01() {
    validarInputs({
        form: "#fase_motivo_hc_01",
        orden: '1'
    },
        function () { validarProcedencia(); },
        validarEnfermActual
    );
}

function validarEnfermActual(){
    validarInputs({
        form: "#fase_enferActual_hc_01",
        orden: '1'
    },
        function () { validarProcedencia(); },
        validarPag_01
    );
}

function validarPag_01(){
    $DATOS_HC[0].PROCEDEN = $('#proced_hc_01').val().trim();
    $DATOS_HC[0].MOTIVO = $('#motiv_hc_01').val().trim();
    var itemEnfermActual = consultarItemArray_dethc('1001');
    modificarArrayDethc(itemEnfermActual, '1001', $('#enfer_act_hc_01').val());
    _llenarDatosPag2();
}

function _llenarDatosPag2() {
    _formHidden('2');
    var ant_famil = consult_ultdethc('2002');
    $('#ant_famil_hc_01').val(ant_famil.DETALLE.trim());

    var ant_medic = consult_ultdethc('2010');
    $('#ant_med_hc_01').val(ant_medic.DETALLE.trim());

    var ant_quirur = consult_ultdethc('2020');
    $('#ant_ant_quirur_hc_01').val(ant_quirur.DETALLE.trim());

    var ant_farmac = consult_ultdethc('2030');
    $('#ant_farmaco_hc_01').val(ant_farmac.DETALLE.trim());

    var toxic_alergi = consult_ultdethc('2035');
    $('#ant_alerg_hc_01').val(toxic_alergi.DETALLE.trim());

    var ant_trauma = consult_ultdethc('2040');
    $('#ant_traumat_hc_01').val(ant_trauma.DETALLE.trim());

    var ant_ocupa = consult_ultdethc('2050');
    $('#ant_ocup_hc_01').val(ant_ocupa.DETALLE.trim());

    var gineco = consult_ultdethc('2060');
    // var ginecoobstetricos = gineco.DETALLE; 
    $('#gineco_hc_01').val(gineco.DETALLE);

    var otros = consult_ultdethc('2070');
    $('#otr_ant_hc_01').val(otros.DETALLE.trim());

    var dato_2080 = consult_ultdethc('2080');
    console.debug(dato_2080);
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

function validarAntecedentesHc_01(orden){
    validarInputs({
        form: ".fase_antecedentes_hc_01",
        orden: orden
    },
        montar_pantallas,
        validarPag_02
    );
}

function validarPag_02(){
    var itemAntFamil = consultarItemArray_dethc('2002');
    modificarArrayDethc(itemAntFamil, '2002', $('#ant_famil_hc_01').val());
        
    var itemAntMedic = consultarItemArray_dethc('2010');
    modificarArrayDethc(itemAntMedic, '2010', $('#ant_med_hc_01').val());
    
    var itemAntQuirur = consultarItemArray_dethc('2020');
    modificarArrayDethc(itemAntQuirur, '2020', $('#ant_ant_quirur_hc_01').val());
    
    var itemAntFarmac = consultarItemArray_dethc('2030');
    modificarArrayDethc(itemAntFarmac, '2030', $('#ant_farmaco_hc_01').val());
    
    var itemAntToxicAlergi = consultarItemArray_dethc('2035');
    modificarArrayDethc(itemAntToxicAlergi, '2035', $('#ant_alerg_hc_01').val());
    
    var itemAntTrauma = consultarItemArray_dethc('2040');
    modificarArrayDethc(itemAntTrauma, '2040', $('#ant_traumat_hc_01').val());
    
    var itemAntOcupa = consultarItemArray_dethc('2050');
    modificarArrayDethc(itemAntOcupa, '2050', $('#ant_ocup_hc_01').val());
    
    var itemAntGineco = consultarItemArray_dethc('2060');
    modificarArrayDethc(itemAntGineco, '2060', $('#gineco_hc_01').val());
    
    var itemAntOtros = consultarItemArray_dethc('2070');
    modificarArrayDethc(itemAntOtros, '2070', $('#gineco_hc_01').val());
    
    // detella 2080 falta estructurar tanto en cobol como el fron...

    var itemDto2080 = consultarItemArray_dethc('2080');
    console.debug(itemDto2080);
    _llenarDatosPag3();
}

function _llenarDatosPag3() {
    _formHidden('3');
    console.debug('llenar datos pagina 3')
    var org_sent = consult_ultdethc('3010');
    $('#sis_sent_hc_01').val(org_sent.DETALLE.trim());

    var cardio_pulmo = consult_ultdethc('3020');
    $('#sis_card_hc_01').val(cardio_pulmo.DETALLE.trim());

    var sist_dig = consult_ultdethc('3030');
    $('#sis_dig_hc_01').val(sist_dig.DETALLE.trim());

    var sis_derm = consult_ultdethc('3040');
    $('#sis_derm_hc_01').val(sis_derm.DETALLE.trim());

    var sit_oste = consult_ultdethc('3050');
    $('#sist_oste_hc_01').val(sit_oste.DETALLE.trim());

    var sis_neur = consult_ultdethc('3060');
    $('#sis_neur_hc_01').val(sis_neur.DETALLE.trim());

    var sis_psiq = consult_ultdethc('3070');
    $('#sis_psiq_hc_01').val(sis_psiq.DETALLE.trim());

    var geni = consult_ultdethc('3080');
    $('#sis_gent_hc_01').val(geni.DETALLE.trim());

    var sis_gineco = consult_ultdethc('3090');
    $('#sis_geni_hc_01').val(sis_gineco.DETALLE);

    var sis_obst = consult_ultdethc('3095');
    $('#sis_obst_hc_01').val(sis_obst.DETALLE);
    
    validarRevisionSistemas('1');
}

function validarRevisionSistemas(orden){
    validarInputs({
        form: ".revisionSistemas_hc_01",
        orden: orden
    },
        _llenarDatosPag2,
        validarPag_03
    );
}

function validarPag_03(){
    var itemOrgSent = consultarItemArray_dethc('3010');
    modificarArrayDethc(itemOrgSent, '3010', $('#sis_sent_hc_01').val());
    
    var itemCardioPulmo = consultarItemArray_dethc('3020');
    modificarArrayDethc(itemCardioPulmo, '3020', $('#sis_card_hc_01').val());
    
    var itemSistdig = consultarItemArray_dethc('3030');
    modificarArrayDethc(itemSistdig, '3030', $('#sis_dig_hc_01').val());

    var itemSistDerm = consultarItemArray_dethc('3040');
    modificarArrayDethc(itemSistDerm, '3040', $('#sis_derm_hc_01').val());
    
    var itemSistOste = consultarItemArray_dethc('3050');
    modificarArrayDethc(itemSistOste, '3050', $('#sist_oste_hc_01').val());
    
    var itemSistNeu = consultarItemArray_dethc('3060');
    modificarArrayDethc(itemSistNeu, '3060', $('#sis_neur_hc_01').val());
    
    var itemSistpsiq = consultarItemArray_dethc('3070');
    modificarArrayDethc(itemSistpsiq, '3070', $('#sis_psiq_hc_01').val());
    
    var itemGeni = consultarItemArray_dethc('3080');
    modificarArrayDethc(itemGeni, '3080', $('#sis_gent_hc_01').val());
    
    var itemSistGineco = consultarItemArray_dethc('3090');
    modificarArrayDethc(itemSistGineco, '3090', $('#sis_geni_hc_01').val());
    
    var itemSistObst = consultarItemArray_dethc('3095');
    modificarArrayDethc(itemSistObst, '3095', $('#sis_obst_hc_01').val());
    
    _llenarDatosPag5();
}

function _llenarDatosPag5() {
    _formHidden('5');
    var signos = $DATOS_HC[0].SIGNOS[0];
    
    pesoMask.unmaskedValue = signos.PESO.trim();
    $('#talla_hc_01').val(signos.TALLA.trim());
    
    imcMask.unmaskedValue = cerosIzq(signos.IMC.trim(),5);
    supCMask.unmaskedValue = cerosIzq(signos.SUP.trim(),5);
    tempMask.unmaskedValue = cerosIzq(signos.TEMP.trim(),5);
    
    $('#fc_hc_01').val(signos.FCARD.trim());
    $('#fr_hc_01').val(signos.FRESP.trim());
    $('#t_hc_01').val(signos.TENS1.trim());
    $('#arte_hc_01').val(signos.TENS2.trim());
    $('#tam_hc_01').val(signos['TENS-M']);
    $('#glasgow_hc_01').val(signos.GLASG.trim());
    $('#pvc_hc_01').val(signos.PVC.trim());

    var exam_gen = consult_ultdethc('4005');
    if (exam_gen) {
        $('#examen_hc_01').val(exam_gen.DETALLE.trim());
    }
    validarPeso();
}

function validarPeso(){
    validarInputs({
        form: "#fase_peso_hc_01",
        orden: "1"
    },
        _llenarDatosPag3,
        function (){
            if (($("#peso_hc_01").val().trim() == "") || ($("#peso_hc_01").val() == "0")) {
                CON851("02", "02", null, 'error', 'error');
                $("#peso_hc_01").val("");
                _evaluarconsultahc_05("1");
            }else{
                validarTalla();
            }
        }
    );
}

function validarTalla(){
    validarInputs({
        form: "#fase_talla_hc_01",
        orden: "1"
    },
        validarPeso,
        function(){
            var talla = $("#talla_hc_01").val();
            if (parseInt(talla) > 230) {
                CON851("03", "03", null, 'error', 'error');
                $("#talla_hac_01").val("");
                validarTalla();
            }
            else if ((parseInt(talla) == 0) && (parseInt($("#peso_hc_01").val()) > 0)) {
                CON851("02", "02", null, "error", "error");
                $("#talla_hac_01").val("");
                validarTalla();
            }
            else {
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
    }
    else {
        var resultado = parseInt(talla) / 100;
        var resultadop = Math.pow(resultado, 2);
        
        var imc = parseInt(peso) / resultadop;
        imcMask.unmaskedValue = cerosIzq(imc.toFixed(2),5);
        
        var sup_cop = (parseInt(peso) + parseInt(talla) - 60) / 100;
        supCMask.unmaskedValue = cerosIzq(sup_cop.toFixed(2),5);
        
        if (imc >= 30) {
            CON851("BC", "BC", null, 'warning', 'warning');
        }
        else if (imc >= 25) {
            CON851('BB', 'BB', null, 'warning', 'warning');
        }
        else if (imc < 18.5) {
            CON851("H2", "H2", null, 'warning', 'warning');
        }
        else if (imc < 25) {
            CON851("H1", "H1", null, 'warning', 'warning');
        }
        validarTemp();
    }
}

function validarTemp(){
    validarInputs({
        form: "#fase_temp_hc_01",
        orden: "1"
    },
        validarTalla,
        function (){
            var temp = $("#temp_hc_01").val();
            if (parseInt(temp) == 0) {
                CON851("02", "02", null, 'error', 'error');
                $("#temp_hc_01").val("");
                validarTemp();
            }
            else if (parseInt(temp) > 45) {
                CON851("03", "03", null, 'error', 'error');
                $("#temp_hc_01").val("");
                validarTemp();
            }
            else if ((parseInt(temp > 0)) && ((parseInt(temp) < 35.5) || parseInt(temp) > 38)) {
                CON851('BM', 'BM', null, 'alert', 'alert');
                validarFcard();
            }
            else {
                validarFcard();
            }
        }
    );
}

function validarFcard(){
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
                CON851('03', '03', null, 'warning', 'warning');
                $("#fc_hc_01").val("");
                validarFcard();
            }
            else if ((unid_edad == "A") && (valor_edad > 10)) {
                CON851('BK', 'BK', null, 'warning', 'warning');
                validarFresp();
            }
            else {
                validarFresp();
            }
        }
    );
}

function validarFresp(){
    validarInputs({
        form: "#fase_resp_hc_01",
        orden: "1"
    },
        validarFcard,
        function (){
            var unid_edad = "A";
            var valor_edad = 35;
            var fresp = $("#fr_hc_01").val();
            if (parseInt(fresp) > 100) {
                CON851('03', '03', null, 'error', 'error');
                $("#fr_hc_01").val("");
                validarFresp();
            }
            else if ((unid_edad == "A") && (valor_edad > 8)) {
                CON851('BL', 'BL', null, 'warning', 'warning');
                validarTens1();
            }
            else {
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
                CON851("03", "03", null, 'error', 'error');
                $("#t_hc_01").val("");
                validarTens1();
            }
            else if ((parseInt(tens1) == 0) || tens1.trim() == "") {
                CON851("02", "02", null, "error", "error");
                $("#t_hc_01").val("");
                validarTens1();
            }
            else {
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
                CON851("02", "02", null, "error", "error");
                $("#arte_hc_01").val("");
                validarTens2();
            }
            else if (parseInt(tens2) > 300) {
                CON851("03", "03", null, 'error', 'error');
                $("#arte_hc_01").val("");
                validarTens2();
            }
            else {
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
        onEscape: function () { validarTens2(); bootbox.hideAll(); },
        title: 'Glasgow',
        message: fuente
    });
    
    glasgowPopup.init(function () {
        glasgow = $DATOS_HC[0].SIGNOS[0].GLASG;
        aper_ocul = $(".aper_ocul_hc_01");
        resp_verbal = $(".resp_verb_hc_01");
        resp_moto = $('.resp_moto_hc_01');
        
        $(aper_ocul[1]).val(glasgow.toString().substr(0,1));
        $(resp_verbal[1]).val(glasgow.toString().substr(1,1));
        $(resp_moto[1]).val(glasgow.toString().substr(2,1));
        
        validarGlasgow('1');
    });

    glasgowPopup.on('shown.bs.modal', function () {
        $(aper_ocul[1]).focus();
    });
    
    /*var aperoculhcMask = IMask($("#aper_ocul_hc_01")[0], { mask: Number, min: 0, max: 4 });
    var respverbhcMask = IMask($("#resp_verb_hc_01")[0], { mask: Number, min: 0, max: 5 });
    var respmotohcMask = IMask($("#resp_moto_hc_01")[0], { mask: Number, min: 0, max: 6 });*/
}
function validarGlasgow(orden) {
    var aper_ocul, resp_verbal, resp_moto, vlr_glasg, glasgow;
    validarInputs({
        form: '#glasgowPopup',
        orden: orden
    },
        function () { console.debug('cerrar popup');},
        function () {
            
            aper_ocul = $(".aper_ocul_hc_01");
            resp_verbal = $(".resp_verb_hc_01");
            resp_moto = $('.resp_moto_hc_01');
            
            vlr_glasg = parseInt($(aper_ocul[1]).val()) + parseInt($(resp_verbal[1]).val()) + parseInt($(resp_moto[1]).val());
            glasgow =  $(aper_ocul[1]).val() + $(resp_verbal[1]).val() + $(resp_moto[1]).val() + cerosIzq(vlr_glasg,2);
            
            $DATOS_HC[0].SIGNOS[0].GLASG = glasgow;
            bootbox.hideAll();
            validarPvc();
        }
    );
}

function validarPvc(){
    validarInputs({
        form: "#fase_pvc_hc_01",
        orden: "1"
    },
        validarTens1,
        complementosSignosPopup
    );
}

function complementosSignosPopup(){
    var fuente = $('#signosFaltantes').html();
    var signos = $DATOS_HC[0].SIGNOS[0];
    var ptor, p_abdo, oximetria, perim_cefalico, perim_braquial, perim_mudeca;
    var signosPopup = bootbox.dialog({
        size: '',
        onEscape: function () { validarTens2(); bootbox.hideAll(); },
        title: 'Signos',
        message: fuente
    });
    
    signosPopup.init(function () {
       validarSignosFaltantes1('1');
       ptor = $('.ptor_hc_01');
       p_abdo = $('.pabdo_hc_01');
       oximetria = $('.sv02_hc_01');
       
       perim_cefalico = $('.perim_cefalico_hc_01');
       perim_braquial = $('.perim_braquial_hc_01');
       perim_mudeca = $('.perim_mudeca_hc_01');
       
       $(ptor[1]).val(signos["PER-TORA"].trim());
       $(p_abdo[1]).val(signos["PER-ABDO"].trim());
       $(oximetria[1]).val(signos.OXIMETRIA.trim());
       
       $(perim_cefalico[1]).val(signos["PER-CEF"].trim());
       $(perim_braquial[1]).val(signos["PER-BRAQ"].trim());
       $(perim_mudeca[1]).val(signos["PER-MUNE"].trim());
       
    });
    
    signosPopup.on('shown.bs.modal', function () {
        $(ptor[1]).focus();
    });
}

function validarSignosFaltantes1(orden){
    validarInputs({
        form: "#fase_signosF1_hc_01",
        orden: orden
    },
    validarPvc,
    function () {validarSignosFaltantes2('1');}
    );
}

function validarSignosFaltantes2(orden){
    var ptor, p_abdo, oximetria, perim_cefalico, perim_braquial, perim_mudeca;
    validarInputs({
        form: "#fase_signosF2_hc_01",
        orden: orden
    },
        validarPvc,
        function () {
           ptor = $('.ptor_hc_01');
           p_abdo = $('.pabdo_hc_01');
           oximetria = $('.sv02_hc_01');

           perim_cefalico = $('.perim_cefalico_hc_01');
           perim_braquial = $('.perim_braquial_hc_01');
           perim_mudeca = $('.perim_mudeca_hc_01');
           
           $DATOS_HC[0].SIGNOS[0]["PER-TORA"] = $(ptor[1]).val().trim();
           $DATOS_HC[0].SIGNOS[0]["PER-ABDO"] = $(p_abdo[1]).val().trim();
           $DATOS_HC[0].SIGNOS[0].OXIMETRIA = $(oximetria[1]).val().trim();
           
           $DATOS_HC[0].SIGNOS[0]["PER-CEF"]  = $(perim_cefalico[1]).val().trim();
           $DATOS_HC[0].SIGNOS[0]["PER-BRAQ"] = $(perim_braquial[1]).val().trim();
           $DATOS_HC[0].SIGNOS[0]["PER-MUNE"] = $(perim_mudeca[1]).val().trim();
           bootbox.hideAll();
           setTimeout(ventanaComplementoVisual, 500);
        }
    );
}

function ventanaComplementoVisual(){
    var fuente = $('#agudezaVisual').html();
    var examne_visual = $DATOS_HC[0]["EXAMEN-VISUAL"];
    var est_izq, agud_visual_oi_1, agud_visual_oi_2, est_der, agud_visual_od_1, agud_visual_od_2;
    var complementoVisual = bootbox.dialog({
        size: '',
        onEscape: function () { validarTens2(); bootbox.hideAll(); },
        title: 'Agudeza visual',
        message: fuente
    });
    
    complementoVisual.init(function () {
        est_izq =  $('.est_izq_hc_01');
        agud_visual_oi_1 = $('.agud_visual_oi_1_hc_01');
        agud_visual_oi_2 = $('.agud_visual_oi_2_hc_01');
        est_der =  $('.est_der_hc_01');
        agud_visual_od_1 = $('.agud_visual_od_1_hc_01');
        agud_visual_od_2 = $('.agud_visual_od_2_hc_01');
        
        
        $(est_izq[1]).val(examne_visual[0]['ESTRUCTURAS-OCULARES-OI'].trim());
        $(agud_visual_oi_1[1]).val(examne_visual[0]['AGUDEZA-VISUAL-OI-1'].trim());
        $(agud_visual_oi_2[1]).val(examne_visual[0]['AGUDEZA-VISUAL-OI-2'].trim());
        $(est_der[1]).val(examne_visual[0]['ESTRUCTURAS-OCULARES-OD'].trim());
        $(agud_visual_od_1[1]).val(examne_visual[0]['AGUDEZA-VISUAL-OD-1'].trim());
        $(agud_visual_od_2[1]).val(examne_visual[0]['AGUDEZA-VISUAL-OD-2'].trim());
        
        ventanaEstructOcularesIO();
       
    });
}

function ventanaEstructOcularesIO(){
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
    switch (data.id) {
        case "1":
        case "2":
        case "3":
            validarOjoIzquierdo();
            break;
        default:
            bootbox.hideAll();
            //setTimeout(_ventanainputs, 500);
            break;
    }
    var est_izq =  $('.est_izq_hc_01');
    $(est_izq[1]).val(data.id + " - " + data.descripcion);
}

function validarOjoIzquierdo(){
    validarInputs({
        form: "#fase_ojoIzquierdo_hc_01",
        orden: "1"
    },
        validarPvc,
        function () {
            ventanaEstructOcularesOD();
        }
    );
}

function ventanaEstructOcularesOD(){
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
    switch (data.id) {
        case "1":
        case "2":
        case "3":
            validarOjoDerecho();
            break;
        default:
            ventanaEstructOcularesIO();
            break;
    }
    var est_der =  $('.est_der_hc_01');
    $(est_der).val(data.id + " - " + data.descripcion);
}

function validarOjoDerecho(orden){
    var est_izq, agud_visual_oi_1, agud_visual_oi_2, est_der, agud_visual_od_1, agud_visual_od_2;
    validarInputs({
        form: "#fase_ojoDerecho_hc_01",
        orden: orden
    },
        validarOjoIzquierdo,
        function () {
            est_izq =  $('.est_izq_hc_01');
            agud_visual_oi_1 = $('.agud_visual_oi_1_hc_01');
            agud_visual_oi_2 = $('.agud_visual_oi_2_hc_01');
            est_der =  $('.est_der_hc_01');
            agud_visual_od_1 = $('.agud_visual_od_1_hc_01');
            agud_visual_od_2 = $('.agud_visual_od_2_hc_01');
            
            $DATOS_HC[0]["EXAMEN-VISUAL"]['ESTRUCTURAS-OCULARES-OI'] = $(est_izq[1]).val().split('-')[0].trim();
            $DATOS_HC[0]["EXAMEN-VISUAL"]['AGUDEZA-VISUAL-OI-1'] = $(agud_visual_oi_1[1]).val();
            $DATOS_HC[0]["EXAMEN-VISUAL"]['AGUDEZA-VISUAL-OI-2'] = $(agud_visual_oi_2[1]).val();
            
            $DATOS_HC[0]["EXAMEN-VISUAL"]['ESTRUCTURAS-OCULARES-OD'] = $(est_der[1]).val().split('-')[0].trim();
            $DATOS_HC[0]["EXAMEN-VISUAL"]['AGUDEZA-VISUAL-OD-1'] = $(agud_visual_od_1[1]).val();
            $DATOS_HC[0]["EXAMEN-VISUAL"]['AGUDEZA-VISUAL-OD-2'] = $(agud_visual_od_2[1]).val();
            bootbox.hideAll();
            validarExamenHc();
        }
    );
}

function validarExamenHc(){
    validarInputs({
        form: "#fase_examen_hc_01",
        orden: "1"
    },
        validarPvc,
        validarPag_05
    );
}

function validarPag_05(){
    console.debug('capturar valores de la pag 5');
    
    var peso = pesoMask.unmaskedValue ? pesoMask.unmaskedValue : 0;
    peso = parseFloat(peso).toFixed(1).replace(/\./g, '');
    console.debug(cerosIzq(peso,6));
    
    
    
    var signos = $DATOS_HC[0].SIGNOS[0];
    $('#peso_hc_01').val(signos.PESO.trim());
    $('#talla_hc_01').val(signos.TALLA.trim());
    $('#imc_hc_01').val(signos.IMC.trim());
    $('#supc_hc_01').val(signos.SUP.trim());
    $('#temp_hc_01').val(signos.TEMP.trim());
    $('#fc_hc_01').val(signos.FCARD.trim());
    $('#fr_hc_01').val(signos.FRESP.trim());
    $('#t_hc_01').val(signos.TENS1.trim());
    $('#arte_hc_01').val(signos.TENS2.trim());
    $('#tam_hc_01').val(signos['TENS-M']);
    $('#glasgow_hc_01').val(signos.GLASG.trim());
    $('#pvc_hc_01').val(signos.PVC.trim());

    var exam_gen = consult_ultdethc('4005');
    if (exam_gen) {
        $('#examen_hc_01').val(exam_gen.DETALLE.trim());
    }
    
    
    
}








function _llenarDatosPag8() {
    $('#table_diagnosticos tbody').html('');
    var diagnosticos = "A000|A001|A009|A010|A011|A012|A013|A014|A020|A021";  //$DATOS_HC[0].RIPS[0].DIAG.trim();
    if (diagnosticos) {
        var cod = diagnosticos.split('|');
        for (var i = 0; i < cod.length; i++) {
            var consult = consult_enfermedad(cod[i].trim());
            if (consult) {
                _llenarTablaDiag(consult, i);
            }
        }
    }
    var analisis = consult_ultdethc('75001');
    $('#analisis_hc_01').val(analisis.DETALLE);
}

function _llenarDatosPag10() {
    var rips = $DATOS_HC[0].RIPS[0];
    var cierre = $DATOS_HC[0].CIERRE[0];
    var prof = consult_atiendProf(rips.ATIENDE);
    var embar = consult_embar(rips.EMBARAZO);
    var causa = consult_causa(rips.CAUSA);
    var tipo_diag = consult_tipoDiagn(rips['TIPO-DIAG']);
    var finalidad = consult_finalidad(rips.FINALIDAD);
    var metodPlanif = consult_planifica($DATOS_HC[0].PLANIFIC);
    var estad_salid = estad_salida(rips['ESTADO-SAL']);
    var descrip_enfer = consult_enfermedad(cierre["DIAG-MUER"]);

    $('#pers_atiend_hc_01').val(rips.ATIENDE + " " + prof);
    $('#est_grav_hc_01').val(rips.EMBARAZO + " " + embar);
    $('#causa_hc_01').val(rips.EMBARAZO + " " + causa);
    $('#tipo_diagn_hc_01').val(rips['TIPO-DIAG'] + " " + tipo_diag);
    $('#pyp_hc_01').val();
    $('#final_hc_01').val(rips.FINALIDAD + " " + finalidad);
    $FINALIDHC = rips.FINALIDAD;
    $('#1eraVez_hc_01').val(rips['1RA-VEZ'].trim());
    $('#metodPlanFamil_hc_01').val($DATOS_HC[0].PLANIFIC + " " + metodPlanif);
    $('#est_sal_hc_01').val(rips['ESTADO-SAL'] + " " + estad_salid);
    $('#remit_hc_01').val(rips.REMITIDO);
    $('#diagn_muert_hc_01').val(cierre["DIAG-MUER"] + " " + descrip_enfer);
    $('#pacien_observ_hc_01').val(rips.OBSERV);
    $('#conf_triage_hc_01').val(rips.TRIAGE);
    $('#numer_acomp_hc_01').val($DATOS_HC[0]['ID-ACOMPA']);
    $('#nomb_acom_hc_01').val($DATOS_HC[0]['ACOMPA']);
    if ($DATOS_HC[0]['EMBRIAGUEZ'].trim() == 'S') {
        $('#estad_embriag_hc_01').val('Si');
    } else if ($DATOS_HC[0]['EMBRIAGUEZ'].trim() == 'N') {
        $('#estad_embriag_hc_01').val('No');
    }
}

function _llenarTablaDiag(array, conteo) {
    var fuente = '<tr id="' + conteo + '"><td>' + conteo + "<td>" + array.COD + "</td><td>" + array.DESCRIP + "</td></tr>";
    $('#table_diagnosticos tbody').append(fuente);
}

////////////////////////////////////////////////////////////////// #INICIO 



// function _aceptaragudezavisual() {
//     $(".btn-info").click();
// }

function _evaluarexamenhc() {
    validarInputs({
        form: "#EXAMEN_HC_01",
        orden: "1"
    },
        function () { _ventanainputs() },
        _validarexamenhc
    )
}
function _validarexamenhc() {
    $("#tab5").hide();
    $("#tab8").show();
    _evaluarcoddiaghc();
    $conteocoddiag = 0;
    _llenarDatosPag8();
}

function _evaluarcoddiaghc() {
    validarInputs({
        form: "#COD_DIAG_HC_01",
        orden: "1"
    },
        function () { $("#tab8").hide(); $("#tab5").show(); _evaluarconsultahc_05("1"); },
        _validarcoddiaghc
    )
}
function _validarcoddiaghc() {
    var cod = $("#cod_diag_hc_01").val();
    for (i = 0; i < $_ENFERMEDADES.length; i++) {
        if (cod == $_ENFERMEDADES[i].COD) {
            var json = '[{"COD": "' + $_ENFERMEDADES[i].COD + '","DESCRIP": "' + $_ENFERMEDADES[i].DESCRIP + '"}]';
            var array = JSON.parse(json);
            var fuente = '<tr id="' + $conteocoddiag + '">' +
                "<td>" + $conteocoddiag + "</td>" +
                "<td>" + array[0].COD + '</td>' +
                '<td> ' + array[0].DESCRIP + '</td>' +
                '</tr>';
            $('#table_diagnosticos').find('#' + $conteocoddiag).replaceWith(fuente);
            $conteocoddiag++;
            if ($conteocoddiag == 10) {
                _evaluaranalisisyplanhc();
                break;
            }
            _evaluarcoddiaghc();
            break;
        }
        else if (cod.trim() == "") {
            var fuente = '<tr id="' + $conteocoddiag + '">' +
                "<td>" + $conteocoddiag + "</td>" +
                "<td>" + + '</td>' +
                '<td> ' + + '</td>' +
                '</tr>';
            $('#table_diagnosticos').find('#' + $conteocoddiag).replaceWith(fuente);
            $conteocoddiag++;
            if ($conteocoddiag == 10) {
                _evaluaranalisisyplanhc();
                break;
            }
            _evaluarcoddiaghc();
            break;
        }
        else if (($_ENFERMEDADES.length - 1 == i) && (cod != $_ENFERMEDADES[i].COD)) {
            CON851('01', '01', null, 'error', 'error');
            $("#cod_diag_hc_01").val("");
            _evaluarcoddiaghc();
            break;
        }
    }
    // }
}

function _evaluaranalisisyplanhc() {
    validarInputs({
        form: "#ANALISIS_HC_01",
        orden: "1"
    },
        function () { _evaluarcoddiaghc(); },
        _validaranalisisyplanhc
    )
}
function _validaranalisisyplanhc() {
    $("#tab8").hide();
    $("#tab10").show();
    _llenarDatosPag10();
    _aceptarestado();
    // _evaluarcausaexterna();
}

function _aceptarestado() {
    $SEXOPACI = "M";
    console.log("aceptarestado")
    if ($SEXOPACI == "M") {
        $EMBARAZOHC = "9 - NO APLICA"
        $("#est_grav_hc_01").val($EMBARAZOHC);
        _evaluarcausaexterna();
    }
    else {
        if (($UNIDEDADLNK == "D") || ($UNIDEDADLNK == "M") || (($UNIDEDADLNK == "A") && ($VLREDADLNK < 11))) {
            $EMBARAZOHC = "9 - NO APLICA"
            $("#est_grav_hc_01").val($EMBARAZOHC);
        }
        else {
            _evaluarestadoembarazo();
        }
    }
    function _evaluarestadoembarazo() {
        var estadodeembarazo = '[{"COD": "1","DESCRIP": "1ER TRIM. EMBA"},{"COD": "2", "DESCRIP": "2DO TRIM. EMBA"},{"COD": "3","DESCRIP": "3ER TRIM. EMBA"},{"COD": "4","DESCRIP": "NO DECLARA"},{"COD": "9","DESCRIP": "NO APLICA"}]';
        var estadoembarazo = JSON.parse(estadodeembarazo);
        POPUP({
            array: estadoembarazo,
            titulo: 'ESTADO EMBARAZO'
        },
            _evaluarestadodeembarazo
        );
    }
    function _evaluarestadodeembarazo() {
        $EMBARAZOHC = data.id;
        switch (data.id) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "9":
                _evaluarcausaexterna();
                break;
            default:
                _aceptarestado();
                break;
        }
    }

}
function _evaluarcausaexterna() {
    var causaexterna = '[{"COD": "1","DESCRIP": "ACCIDENTE DE TRABAJO"},{"COD": "2", "DESCRIP": "ACCIDENTE DE TRANSITO"},{"COD": "3","DESCRIP": "ACCIDENTE RABICO"},{"COD": "4","DESCRIP": "ACCIDENTE OFIDICO"},{"COD": "5","DESCRIP": "OTRO TIPO ACCIDENTE"},{"COD": "6","DESCRIP": "EVENTO CATASTROFICO"},{"COD": "7","DESCRIP": "LESION POR AGRESION"},{"COD": "8","DESCRIP": "LESION AUTOINFLINGIDA"},{"COD": "9","DESCRIP": "SOSPECHA MALTRATO FISICO"},{"COD": "A","DESCRIP": "SOSPECHA ABUSO SEXUAL"},{"COD": "B","DESCRIP": "SOSPECHA VIOLENCIA SEXUAL"},{"COD": "C","DESCRIP": "SOSPECHA MALTRATO EMOCIONAL"},{"COD": "D","DESCRIP": "ENFERMEDAD GENERAL"},{"COD": "E","DESCRIP": "ENFERMEDAD PROFESIONAL"},{"COD": "G","DESCRIP": "NO APLICA"}]';
    var causasexternas = JSON.parse(causaexterna);
    POPUP({
        array: causasexternas,
        titulo: 'CAUSA EXTERNA'
    },
        _evaluarcausasexternas
    );
}
function _evaluarcausasexternas(data) {
    $CAUSAHC = data.id;
    switch (data.id) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "A":
        case "B":
        case "C":
        case "D":
        case "E":
        case "G":
            _evaluardatotipodiag();
            break;
        default:
            _evaluarcausaexterna();
            break;
    }
    $("#causa_hc_01").val(data.id + " - " + data.descripcion);
}
function _evaluardatotipodiag() {
    var tiposdiag = '[{"COD": "1","DESCRIP": "IMPRESION DIAGNOSTICA"},{"COD": "2", "DESCRIP": "CONFIRMADO NUEVO"},{"COD": "3","DESCRIP": "CONFIRMADO REPETIDO"},{"COD": "9","DESCRIP": "NO APLICA"}]';
    var tipodiag = JSON.parse(tiposdiag);
    POPUP({
        array: tipodiag,
        titulo: 'TIPO DE DIAGNOSTICO'
    },
        _evaluartipodiag
    );
}
function _evaluartipodiag(data) {
    $CAUSAHC = data.id;
    switch (data.id) {
        case "1":
        case "2":
        case "3":
        case "9":
            _datofinalconsulta();
            break;
        default:
            _evaluarcausaexterna();
            break;
    }
}
function _datofinalconsulta() {
    $UNSERV = $("#descrip_hc_01").val();
    $SERVHC = $DATOS_HC[0].SERV;
    if ($UNSERV.trim() == "08") {
        _datoprimeravez();
    }
    else {
        $FINALIDHC = "10 - NO APLICA"
        _datoprimeravez();
    }
}
function _datoprimeravez() {
    if (($FINALIDHC == "00") || ($FINALIDHC == "10")) {
        $1RAVEZHC = "";
        $("#1eraVez_hc_01").val($1RAVEZHC);
        _datonrocontrol();
    }
    else {
        _evaluarprimeravez();
    }
}
function _evaluarprimeravez() {
    mascaraprimeravez();
    validarInputs({
        form: "#1ERAVEZ_HC_01",
        orden: "1"
    },
        function () { _evaluarcoddiaghc(); },
        _validarprimeravez
    )
}
function mascaraprimeravez() {
    var primeravezMask = IMask($("#1eraVez_hc_01")[0], {
        mask: 'a',
        definitions: {
            'a': /[N, S]/
        },
        prepare: function (str) {
            console.log(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
}
function _validarprimeravez() {
    $1RAVEZHC = $("#1eraVez_hc_01").val();
    if ($1RAVEZHC == "N") {
        _ventanafechaprimeravez();
    }
    else {
        _datonrocontrol();
    }
}

function _ventanafechaprimeravez() {
    mascarafechaprimeravez();
    var ventanafechaprimeravez = bootbox.dialog({
        size: 'small',
        onEscape: function () { _evaluarprimeravez() },
        title: 'FECHA DE ULTIMA VEZ',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-4 control-label">' + 'DIGITE LA FECHA' + '</label> ' +
            '<div class="col-md-6" id="FECHAPRIMERAVEZ_HC_01"> ' +
            '<input id="fechaprimeravez_hc_01" type="text" class="form-control input-md" data-orden="1" maxlength="16"> ' +
            '<span class="help-block">' + 'YYYY-MM-DD' + '</span> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
    });
    ventanafechaprimeravez.on('shown.bs.modal', function () {
        $("#fechaprimeravez_hc_01").focus();
    });
    ventanafechaprimeravez.init(_validarfechaprimeravez());
}

function mascarafechaprimeravez() {
    $ANO1RAVEZ = $("#ano_hc_01").val();
    var preanofact = $ANO1RAVEZ;
    var anofact = parseInt(preanofact);
    var fechaMask = IMask($("#fechaprimeravez_hc_01")[0], {
        mask: Date,
        pattern: 'Y-m-d',
        lazy: true,
        blocks: {
            Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 1900, to: anofact, maxLength: 4 },
            m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: 1, to: 12, maxLength: 2 },
            d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2 },
        },
        format: function (date) {
            return moment(date).format("YYYY-MM-DD");
        },
        parse: function (str) {
            var fecha = moment(str).format('YYYY-MM-DD');
            if (fecha == "Invalid date") {
                CON851('01', '01', null, 'error', 'error');
            }
            else {
                return str;
            }
        }
    });
    fechaMask.updateValue();
}
function _validarfechaprimeravez() {
    _inputControl("disabled");
    validarInputs({
        form: '#FECHAPRIMERAVEZ_HC_01',
        orden: "1"
    },
        function () { _evaluarfecha() },
        _validarfechaa
    )
}
function _validarfechaa() {
    $FECHA1RAVEZ = $("#fechaprimeravez_hc_01").val();
    bootbox.hideAll();
    _datonrocontrol();
}
function _datonrocontrol() {
    if ($FINALIDHC == "06") {
        if ($1RAVEZHC == "S") {
            $NROCONTRHC = "1";
            _datoplanfamil();
        }
        else {
            _ventananrocontrol();
        }
    }
    else {
        $NROCONTRHC = "0"
        _datoplanfamil();
    }
}

function _ventananrocontrol() {
    mascaraventananrocontrol();
    var ventananrocontrol = bootbox.dialog({
        size: 'small',
        onEscape: function () { _evaluarprimeravez() },
        title: 'CONTROLES PRENATALES',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-4 control-label">' + 'NRO CONTROLES QUE HA ASISTIDO (INCLUYENDO ESTE)' + '</label> ' +
            '<div class="col-md-6" id="CONTROLES_HC_01"> ' +
            '<input id="controles_hc_01" type="text" class="form-control input-md" data-orden="1" maxlength="2"> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
    });
    ventanafechaprimeravez.on('shown.bs.modal', function () {
        $("#controles_hc_01").focus();
    });
    ventanafechaprimeravez.init(_validarnrocontrol());
}
function mascaraventananrocontrol() {
    var nrocontrolMask = IMask($("#controles_hc_01")[0], { mask: 00, definitions: { '00': /[02-99]/ } });
}
function _validarnrocontrol() {
    _inputControl("disabled");
    validarInputs({
        form: '#CONTROLES_HC_01',
        orden: "1"
    },
        function () { _validarprimeravez() },
        _validarnrocontrol2
    )
}
function _validarnrocontrol2() {
    $NROCONTRHC = $("#controles_hc_01").val();
    bootbox.hideAll();
    _datoplanfamil();
}

function _datoplanfamil() {
    $ATIENDEPROF = $("#pers_atiend_hc_01").val();
    $ATIENDEPROF = $ATIENDEPROF.substring(0, 1);
    if (($ATIENDEPROF == "2") || ($ATIENDEPROF == "1")) {
        _datoplanfamil2();
    }
    else {
        _datocronico();
    }
}
function _datoplanfamil2() {
    if (($UNSERV == "01") || ($NITUSU == "0800175901")) {
        _datocronico();
    }
    else if ((($NITUSU == "0900541158") || ($NITUSU == "0900565371")) && ($SERVHC == "09")) {
        _datocronico();
    }
    else if (($UNIDEDADHC == "A") && (($VLREDADHC > 10) && ($VLREDADHC < 60))) {
        _evaluarplanfamiliar();
    }
    else {
        _datocronico();
    }
}
function _evaluarplanfamiliar() {
    var datosfamiliar = '[{"COD": "1","DESCRIP": "DIU"},{"COD": "2", "DESCRIP": "ORAL"},{"COD": "3","DESCRIP": "BARRERA"},{"COD": "4","DESCRIP": "OTRO"},{"COD": "5","DESCRIP": "NINGUNO"},{"COD": "6","DESCRIP": "DIU + BARRERA"},{"COD": "7","DESCRIP": "IMPL. SUBDERMICO"},{"COD": "8","DESCRIP": "I. SUBDERMICO + BARRERA"},{"COD": "9","DESCRIP": "ORAL + BARRERA"},{"COD": "A","DESCRIP": "INYECTABLE MENSUAL"},{"COD": "B","DESCRIP": "INYECTABLE + BARRERA"},{"COD": "C","DESCRIP": "INYECTABLE TRIMESTRAL"},{"COD": "D","DESCRIP": "TRIMESTRAL + BARRERA"},{"COD": "E","DESCRIP": "ESTERILIZACION"},{"COD": "G","DESCRIP": "ESTERILIZACION + BARRERA"},{"COD": "H","DESCRIP": "NO USA X TRADICION"},{"COD": "I","DESCRIP": "NO USA X SALUD"},{"COD": "J","DESCRIP": "NO USA X NEGACION"},{"COD": "K","DESCRIP": "COITUS INTERRPTUS"},{"COD": "L","DESCRIP": "METODO DEL RITMO"}]';
    var datofamiliar = JSON.parse(datosfamiliar);
    POPUP({
        array: datofamiliar,
        titulo: 'METODO DE PLANIFICACION'
    },
        _evaluarplanificacion
    );
}
function _evaluarplanificacion(data) {
    $PLANIFICHC = data.id;
    switch (data.id) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "A":
        case "B":
        case "C":
        case "D":
        case "E":
        case "G":
        case "H":
        case "I":
        case "J":
        case "K":
        case "L":
            if ($SEXOPACI == "M") {
                if ((data.id == "3") || (data.id == "4") || (data.id == "5") || (data.id == "G") || (data.id == "H") || (data.id == "I") || (data.id == "J") || (data.id == "K") || (data.id == "L")) {
                    _datocronico();
                }
                else {
                    CON851("73", "73", null, "error", "error");
                    _datoplanfamil();
                }
            }
            else {
                _datocronico();
            }
            break;
        default:
            _datoplanfamil();
            break;
    }
    $("#metodPlanFamil_hc_01").val(data.id + " - " + data.descripcion);
}
function _datocronico() {
    if ($FINALIDHC == "11") {
        _evaluardatocronico();
    }
    else {
        $CRONICOHC = "";
        _validardatocronico();
    }
}
function _evaluardatocronico() {
    validarInputs({
        form: '#CRONICO_HC_01',
        orden: "1"
    },
        function () { _datoplanfamil() },
        _validardatocronico
    )
}
function _validardatocronico() {
    console.log("datocronico");
    $CRONICOHC = $("#cronico_hc_01").val();
    if ($CRONICOHC.trim() == "") {
        if ($FINALIDHC == "11") {
            CON851("02", "02", null, "error", "error");
            _datocronico();
        }
        else {
            _datosalida();
        }
    }
    else {
        // CONSULTA PATOLOGIAS-CRONICAS
    }
}
function _datosalida() {
    var tipoestadosal = '[{"COD": "1","DESCRIP": "VIVO (a)"},{"COD": "2", "DESCRIP": "MUERTO (a)"},{"COD": "3","DESCRIP": "REMITIDO"},{"COD": "4","DESCRIP": "HOSPITALIZADO"},{"COD": "5","DESCRIP": "OBSERVACION"},{"COD": "6","DESCRIP": "NO APLICA"}]';
    var tiposestadosal = JSON.parse(tipoestadosal);
    POPUP({
        array: tiposestadosal,
        titulo: 'TIPO DE DIAGNOSTICO'
    },
        _evaluardatotipoestadosal
    );
}
function _evaluardatotipoestadosal(data) {
    $ESTADOSALHC = data.id;
    switch (data.id) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
            if ($SERVHC == "02") {
                if ($ESTADOSALHC == "4") {
                    $UNSERV == "03"
                    _datoremitido();
                }
            }
            else {
                _datoremitido();
            }
            break;
        default:
            _aceptarestado();
            break;
    }
}
function _datoremitido() {
    if ($ESTADOSALHC == "3") {
        _evaluarremitido();
    }
    else {
        $REMITIDOHC = "";
        _aceptardiagnmuerte();
    }
}
function _evaluarremitido() {
    validarInputs({
        form: '#REMITIDO_HC_01',
        orden: "1"
    },
        function () { _datosalida() },
        _validarremitido
    )
}
function _validarremitido() {
    $REMITIDOHC = $("#remitido_hc_01").val();
    if ($REMITIDOHC == "") {
        CON851("02", "02", null, "erro", "error");
        $("#remitido_hc_01").val("");
        _datoremitido();
    }
    else {
        _aceptardiagnmuerte();
    }
}
function _aceptardiagnmuerte() {
    if ($ESTADOSALHC == "2") {
        _evaluardiagmuerhc();
    }
    else {
        $DIAGMUERHC = "";
        _leerdiagnmuerte();
    }
}
function _evaluardiagmuerhc() {
    validarInputs({
        form: '#DIAGMUER_HC_01',
        orden: "1"
    },
        function () { _datosalida() },
        _leerdiagnmuerte
    )
}
function _leerdiagnmuerte() {
    $DIAGMUERHC = $("#diagmuer_hc_01").val();
    if (($ESTADOSALHC == "2") && ($DIAGMUERHC == "")) {
        CON851("02", "02", null, "erro", "error");
        $("#diagmuer_hc_01").val("");
        _evaluardiagmuerhc();
    }
    else {
        if ($DIAGMUERHC.trim() == "") {
            $OTROSENF = "";
            $NOMBREENF = "";
            _leerdiagnmuerte2();
        }
        for (i = 0; i < $_ENFERMEDADES.length; i++) {
            if ($DIAGMUERHC == $_ENFERMEDADES[i].COD) {
                _leerdiagnmuerte2();
            }
            else if (($_ENFERMEDADES.length - 1 == i) && (($DIAGMUERHC = !$_ENFERMEDADES[i].COD))) {
                CON851("01", "01", null, "error", "error");
                $("#diagmuer_hc_01").val("");
                _aceptardiagnmuerte();
            }
        }
    }
}
function _leerdiagnmuerte2() {
    // preguntar a jeison sexo-enf edad min enf edad max cod2 muer hc
    _datoobserv();
}
function _datoobserv() {
    if ($SERVHC == "01") {
        _evaluardatoobserv();
    }
    else {
        $OBSERVHC = "";
        _confirmar();
    }
}
function _evaluardatoobserv() {
    mascaradatoobserv();
    validarInputs({
        form: '#PACIEN_OBSERV_HC_01',
        orden: "1"
    },
        function () { _datosalida() },
        _validardatoobserv
    )
}
function mascaradatoobserv() {
    var datoobservMask = IMask($("#pacien_observ_hc_01")[0], {
        mask: 'a',
        definitions: {
            'a': /[N, S]/
        },
        prepare: function (str) {
            console.log(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
}
function _validardatoobserv() {
    $OBSERVHC = $("#pacien_observ_hc_01").val();
    _datotriage();
}
function _datotriage() {
    if ($SERVHC == "01") {
        _evaluartriage();
    }
    else {
        if (($TRIAGEHC == "1") || ($TRIAGEHC == "2") || ($TRIAGEHC == "3")) {
            _datoidacompa();
        }
        else {
            if (($NITUSU == "0800162035") && ($TRIAGEHC == "4")) {
                _datoidacompa();
            }
            else {
                console.log("bucle triage");
                _datotriage();
            }
        }
    }
}
function _evaluartriage() {
    validarInputs({
        form: '#CONF_TRIAGE_HC_01',
        orden: "1"
    },
        function () { _datosalida() },
        _validartriage
    )
}
function _validartriage() {
    $TRIAGEHC = $("#conf_triage_hc_01").val();
    _datoidacompa();
}
function _datoidacompa() {
    if (($SERVHC != "1") && ($CAUSAHC != "2")) {
        _confirmar();
    }
    else {
        _evaluaridacomp();
    }
}
function _evaluaridacomp() {
    validarInputs({
        form: '#IDACOMP_HC_01',
        orden: "1"
    },
        function () { _datotriage() },
        _validaridacomp
    )
}
function _validaridacomp() {
    $IDACOMPHC = $("#idacomp_hc_01").val();
    _evaluarnomacompaci();
}
function _evaluarnomacompaci() {
    validarInputs({
        form: '#NOMACOMP_HC_01',
        orden: "1"
    },
        function () { _datoidacompa() },
        _validarnomacompaci
    )
}
function mascaranomacom() {
    var nomacomMask = IMask($("#nomacomp_hc_01")[0], {
        mask: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        prepare: function (str) {
            console.log(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
}
function _validarnomacompaci() {
    $ACOMPAHC = $("#nomacomp_hc_01").val();
    _datoestadoembriag();
}
function _datoestadoembriag() {

}

function _datoestadoembriag() {
    var estadosembriaguez = '[{"COD": "S","DESCRIP": "SI"},{"COD": "N", "DESCRIP": "NO"}]';
    var estadoembriaguez = JSON.parse(estadosembriaguez);
    POPUP({
        array: estadoembriaguez,
        titulo: 'ESTADO EMBRIAGUEZ'
    },
        _evaluarestadoembriaguez
    );
}
function _evaluarestadoembriaguez(data) {
    $EMBRIAGUEZTRANSHC = data.id;
    switch (data.id) {
        case "S":
        case "N":
            _confirmar();
            break;
        default:
            _datoidacompa();
            break;
    }
    $("#estad_embriag_hc_01").val(data.id);
}

function _confirmar() {
    console.log("desar guardar datos?");
    var ventanaconfirmar = bootbox.dialog({
        size: 'small',
        onEscape: function () { _evaluarcausaexterna() },
        title: 'GUARDAR',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group" id="clavea_108"> ' +
            '<label class="col-md-4 control-label" for="name">' + 'DESEA GRABAR LOS DATOS?' + '</label> ' +
            '<div class="col-md-6" id="CON851P_HC_01"> ' +
            '<input id="con851p_hc_01" type="text" class="form-control input-md" data-orden="1"> ' +
            '<span class="help-block">' + "S / N" + '</span> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
    });
    ventanaconfirmar.init(_evaluarconfirmar());
    ventanaconfirmar.on('shown.bs.modal', function () {
        $("#con851p_hc_01").focus();
    });
}
function _evaluarconfirmar() {
    mascaraconfirmar();
    validarInputs({
        form: "#CON851P_HC_01",
        orden: "1"
    },
        function () { _aceptarestado(); bootbox.hideAll()},
        _validarconfirmar
    )
}
function _validarconfirmar() {
    $(".btn-primary").click();
}

function mascaraconfirmar() {
    var confirmarMask = IMask($("#con851p_hc_01")[0], {
        mask: 'a',
        definitions: {
            'a': /[N, S]/
        },
        prepare: function (str) {
            console.log(str);
            return str.toUpperCase();
        },
        commit: function (value, masked) {
            masked._value = value.toLowerCase()
        }
    });
}

function _formHidden(pag){
    var forms = $("[id^='pag_']");
    for (var i = 0; i < forms.length; i++) {
        var num_pag = $(forms[i]).attr('id').split('_');
        if (num_pag[1] == pag)$(forms[i]).removeClass('hidden'); else $(forms[i]).addClass('hidden');
    }
}

function modificarArrayDethc(array, cod_dethc, detalle){
    var itemArray = {"LLAVE-HC": $LLAVE_HC, "COD-DETHC": cod_dethc, "DETALLE": detalle};
    if (array){
        $DATOS_DETHC[array.index] = itemArray;
    }else{
        $DATOS_DETHC.push(itemArray);
    }
}