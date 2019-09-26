$llave_hc = "";
$ip_servidor = "";
var $datos_9004 = [];
var dirContabilidad = "";
var san_hemorragias_hc9004 = "";
var antecedentes_hc9004 = "";
var detalles_hc9004 = "";
var plan_hc9004 = "";
var trat_act_hc9004 = "";
var observaciones_9004 = "";
var cod_cum, cod_pos, cod_nopos, cod_pos_otr, cod_nopos_otr;

$(document).ready(function () {
  // setTimeout("top.window.close()", 600000);
  inicio();
});

function inicio(data) {
  $ip_servidor = getParameterByName("a");
  $path_json = getParameterByName("b");

  dir = $path_json.split("\\");
  var url =
    "http://" + $ip_servidor + "/hiclin/progdatos/json/" + dir[dir.length - 1];
  console.log(url)
  SolicitarDatos({}, recibirJson, url);
  var URLX = window.location.href;
  _formatoInputs();
  validarFase1_9004('1');
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function recibirJson(datos_json) {
  $datos_9004 = datos_json["HC-9004"][0];
  $("#fecha_hc_9004").text($datos_9004["FECHA"]);
  $("#n_historia").text($datos_9004["LLAVE"]);
  var cods_cum = [];
  var cods_pos = [];
  var cods_nopos = [];
  $.getJSON('http://' + $ip_servidor + "/hiclin/progdatos/json/CODCUM.JSON", function (json) {

    cods_cum = json['Medicamentos'].map(function (arr) {
      let res = {
        id: arr['COD'],
        text: arr['DESCRIP'] + ' COD:   ' + arr['COD'],
        type: arr['TIPO-CUM']
      }
      return res;
    }).filter(ar => ar['type'] == 'NP' || ar['type'] == 'PO');
    cods_cum.push([{
      id: '9',
      text: 'NO RECIBIO MEDICAMENTO',
      type: 'NONE'
    }])

    cods_pos = cods_cum.filter(arr => arr['type'] == 'PO' || arr['type'] == 'NONE');
    cods_nopos = cods_cum.filter(arr => arr['type'] == 'NP' || arr['type'] == 'NONE');

  }).done(function () {
    $("#cum_causa_anafil_9004").select2({
      placeholder: "Seleccione un medicamento o farmaco",
      data: cods_cum,
      closeOnSelect: true,
      // minimumInputLength: 3,
      language: {
        inputTooShort: function () {
          return "Por favor ingrese minimo 3 caracteres...";
        },
        noResults: function () {

          return "No hay resultados";
        },
        searching: function () {

          return "Buscando..";
        }
      }

    })
    $("#cum_pos_9004,#cum_otros1_trat_9004").select2({
      placeholder: "Seleccione un medicamento o farmaco",
      data: cods_pos,
      closeOnSelect: true,
      // minimumInputLength: 3,
      language: {
        inputTooShort: function () {
          return "Por favor ingrese minimo 3 caracteres...";
        },
        noResults: function () {

          return "No hay resultados";
        },
        searching: function () {

          return "Buscando..";
        }
      }

    })
    $("#cum_nopos_9004,#cum_otros2_trat_9004").select2({
      placeholder: "Seleccione un medicamento o farmaco",
      data: cods_nopos,
      closeOnSelect: true,
      // minimumInputLength: 3,
      language: {
        inputTooShort: function () {
          return "Por favor ingrese minimo 3 caracteres...";
        },
        noResults: function () {

          return "No hay resultados";
        },
        searching: function () {

          return "Buscando..";
        }
      }

    })

    $("#cum_causa_anafil_9004").on('change', function (evt) {
      cod_cum = $('#cum_causa_anafil_9004 option:selected').val();
      console.log(cod_cum)
    })
    $("#cum_pos_9004").on('change', function (evt) {
      cod_pos = $('#cum_pos_9004 option:selected').val()
      console.log(cod_pos)
    })
    $("#cum_nopos_9004").on('change', function (evt) {
      cod_nopos = $('#cum_nopos_9004 option:selected').val()
      console.log(cod_nopos)
    })
    $("#cum_otros1_trat_9004").on('change', function (evt) {
      cod_pos_otr = $('#cum_otros1_trat_9004 option:selected').val()
      console.log(cod_pos_otr)
    })
    $("#cum_otros2_trat_9004").on('change', function (evt) {
      cod_nopos_otr = $('#cum_otros2_trat_9004 option:selected').val()
      console.log(cod_nopos_otr)
    })
  })
  document.querySelector('#motiv_hc').focus = 'true'


}


$('#llenar_form').click(function () {
  var f = new Date();
  hor = f.getHours() + " " + f.getMinutes();
  hor = hor.split(" ");
  var peso = 75;
  var talla = 172;
  var resultado = parseInt(talla) / 100;
  var resultadop = Math.pow(resultado, 2);
  var imc = parseInt(peso) / resultadop;
  imc = CerosIzq(imc.toFixed(2), 5);
  var sup_cop = (parseInt(peso) + parseInt(talla) - 60) / 100;
  sup_cop = CerosIzq(sup_cop.toFixed(2), 5);
  // Signos Vitales//
  $("#motiv_hc").val(f + "Motivo de consulta historia oncología");
  $("#enf_act_hc").val(f + "\nFiebre");
  $("#porc_act_factor_9004").val(2);
  $("#inhibidores_9004").val(2);
  $("#ha_recibido_iti_9004").val("S");
  $("#esta_recibiendo_iti_9004").val("S");
  $("#tiempo_en_iti_9004").val(5);
  $("#hemartrosis_9004").val("S");
  $("#vhc_9004").val("S");
  $("#vhb_9004").val("N");
  $("#vih_9004").val("S");
  $("#artropatia_hemo_cron_9004").val("N");
  $("#nro_art_compro_9004").val(12);
  $("#san_iliopsoas_9004").val("S");
  $("#san_tejidos_blandos_9004").val("S");
  $("#san_intracraneal_9004").val("N");
  $("#san_cuello_garganta_9004").val("N");
  $("#san_oral_9004").val("N");
  $("#san_otras_9004").val("N");
  $("#fecha_ult_repor_inhib_9004").val(19072019);
  $("#enf_act_hc").val(f + "\nFiebre");
  $("#imc_corp_hc").val(imc);
  $("#sup_corp_hc").val(sup_cop);
  $("#talla_hc").val(talla);
  $("#per_abdo_hc").val(23);
  $("#per_cef_hc").val(21);
  $("#per_tora_hc").val(24);
  $("#peso_hc_9004").val(peso);
  $("#ante_famil_9004").val(13);
  $("#famil_hc").val("hemofilia en visabuelo paterno");
  $("#plan_famil_9004").val(3);
  $("#nro_atencion_urg_hemo_9004").val(5);
  $("#nro_even_hospi_hemo_9004").val(15);
  $("#medic_hc").val("sintomas frecuentes: dolor bajo abdominal");
  $("#nro_hemar_espon_12mes_9004").val(3);
  $("#nro_hemar_traum_12mes_9004").val(3);
  $("#nro_otr_hemor_12mes_9004").val(1);
  $("#remplazos_articulares_9004").val("S");
  $("#remplazos_art_12mes_9004").val(12);
  $("#nro_hemor_proc_12mes_9004").val(5);
  $("#nro_otr_hemor_12mes_9004").val(1);
  $("#quiru_hc").val("Remoccion de quistes malignos en ovario en el año 2017");
  $("#factor_recibido_9004").val(1);
  $("#esquema_recibido_9004").val(3);
  $("#fecha_ini_prim_trat_9004").val("14/07/2019");
  $("#anafilaxis_9004").val("S");
  $("#toxic_hc").val("El paciente presenta alergias al diclofenalco");
  $("#fract_osteo_9004").val("N");
  $("#pseudotumores_9004").val("S");
  $("#traum_hc").val("El paciente no presenta traumas");
  $("#embarazo_hc").val(2);
  $("#ginec_hc").val("El paciente tuvo un embarazo prematuro hace aproximadamente 1 año");
  $("#vlr_edad_dx_9004").val(37);
  $("#unid_edad_dx_9004").val("A");
  $("#motivo_prueba_dx_9004").val(2);
  $("#fecha_dx_9004").val(01012000);
  $("#plan_famil_9004").val(1),
    $("#tipo_def_dx_9004").val(2);
  $("#prof_lider_atencion_9004").val(2);
  $("#nro_con_hematologia_9004").val(22);
  $("#nro_con_ortopedia_9004").val(2);
  $("#inter_prof_enfer_9004").val("S");
  $("#nro_con_odontologia_9004").val(21);
  $("#nro_con_psicologia_9004").val(21);
  $("#nro_con_nutricion_9004").val(2);
  $("#nro_con_t_social_9004").val(2);
  $("#nro_con_fisioterapia_9004").val(2);
  $("#nro_con_fisiatria_9004").val(21);
  $("#nro_com_quim_farma_9004").val(14);
  $("#factor_recibido_act_9004").val(2);
  $("#esquema_recibido_act_9004").val(4);
  $("#ult_dosis_act_9004").val(14);
  $("#frecuencia_semana_9004").val(3);
  $("#ui_dl_select_9004").val(23);
  $("#nro_apl_factor_9004").val(34);
  $("#modalidad_apl_trat_9004").val(0);
  $("#via_admin_9004").val(9);
  $("#uild_periodo_9004").val(6);
  $("#cum_causa_anafil_9004").val('POA012ACO4161').trigger('change');
  $("#cum_pos_9004").val('POA012ACO4161').trigger('change');
  $("#cum_nopos_9004").val('NP0002    461').trigger('change');
  $("#cum_otros1_trat_9004").val('POA01AA010101').trigger('change');
  $("#cum_otros2_trat_9004").val('NP00020001601').trigger('change');
  $("#analisis_hc").val("Se procede a ejecutar analisis completo al paciente");
  $("#novedades_9004").val(1);
  $("#observaciones_9004").val("sin observaciones adiccionales");
  $("#exa_general_hc").val("Sin problemas o complicaciones paciente deshidratado por perdida de electrolitos");
  // .val('2').trigger("change");

});
$("#btn_grabar").click(function () {
  v = $datos_9004.DIRECTORIO.split("$");
  a = $datos_9004.DIRECTORIO.split("$");
  a[a.length - 1] = null;
  paso = 1;
  dirContabilidad = "";

  while (paso < 99) {
    if (a[paso] == null) {
      paso = 99;
    } else {
      dirContabilidad = dirContabilidad + "\\" + a[paso];
      paso++;
    }
  }

  _enviarDatos_dll_();
});

function _enviarDatos_dll_() {
  var f = new Date();
  hor = f.getHours() + " " + f.getMinutes();
  hor = hor.split(" ");
  var peso = CerosIzq($('#peso_hc_9004').val(), 7);
  var talla = $('#talla_hc').val();
  var resultado = parseInt(talla) / 100;
  var resultadop = Math.pow(resultado, 2);
  var imc = parseInt(peso) / resultadop;
  imc = CerosIzq(imc.toFixed(2), 5);
  var sup_cop = (parseInt(peso) + parseInt(talla) - 60) / 100;
  datos_envio = {
    ip: $ip_servidor,
    dir: dirContabilidad,
    admin: $datos_9004.ADMIN,
    oper: $datos_9004["OPER-ELAB"],
    llave_hc: $datos_9004.LLAVE,
    serv: $datos_9004.SERV,
    fecha_hc: $datos_9004["FECHA"],
    hora_hc: hor[0] + hor[1],
    motiv_hc: $("#motiv_hc").val().trim(),
    peso: peso,
    talla: talla,
    imc: imc,
    per_cef_hc: CerosIzq($("#per_tora_hc").val(), 5),
    per_abdo_hc: CerosIzq($("#per_abdo_hc").val(), 5),
    per_tora_hc: CerosIzq($("#per_tora_hc").val(), 5),
    sup_corp_hc: sup_cop,
    porc_act_factor: $("#porc_act_factor_9004").val(),
    inhibidores: $("#inhibidores_9004").val(),
    // ano_ult_repor_inhib: fecha_inhib.unmaskedValue.substr(4, 8),
    // mes_ult_repor_inhib: fecha_inhib.unmaskedValue.substr(2, 2),
    // dia_ult_repor_inhib: fecha_inhib.unmaskedValue.substr(0, 2),
    ha_recibido_iti: $("#ha_recibido_iti_9004").val(),
    esta_recibiendo_iti: $("#esta_recibiendo_iti_9004").val(),
    tiempo_iti: $("#tiempo_en_iti_9004").val(),
    hemartrosis: $("#hemartrosis_9004").val(),
    artropatia: $("#artropatia_hemo_cron_9004").val(),
    nro_art_compro: $("#nro_art_compro_9004").val(),
    vhc: $("#vhc_9004").val(),
    vhb: $("#vhb_9004").val(),
    vih: $("#vih_9004").val(),
    vih: $("#vih_9004").val(),
    sancuello: $("#san_cuello_garganta_9004").val(),
    san_iliopsoas: $("#san_iliopsoas_9004").val(),
    sanintracra: $("#san_intracraneal_9004").val(),
    san_oral: $("#san_oral_9004").val(),
    san_otras: $("#san_otras_9004").val(),
    san_tejidos_blandos: $("#san_tejidos_blandos_9004").val(),
    ante_famil: $("#ante_famil_9004").val(),
    nro_atencion_urg_hemo: $("#nro_atencion_urg_hemo_9004").val(),
    nro_even_hospi_hemo: $("#nro_even_hospi_hemo_9004").val(),
    nro_hemar_espon_12mes: $("#nro_hemar_espon_12mes_9004").val(),
    nro_hemar_traum_12mes: $("#nro_hemar_traum_12mes_9004").val(),
    nro_otr_hemor_12mes: $("#nro_otr_hemor_12mes_9004").val(),
    planificacion: $("#plan_famil_9004").val(),
    embarazo_hc: $("#embarazo_hc").val(),
    factor_recibido: $("#factor_recibido_9004").val(),
    esquema_recibido: $("#esquema_recibido_9004").val(),
    remplazos_articulares: $("#remplazos_articulares_9004").val(),
    remplazos_art_12mes: $("#remplazos_art_12mes_9004").val(),
    nro_hemor_proc_12mes: $("#nro_hemor_proc_12mes_9004").val(),
    // ano_ini_1er_trat: fecha_ini_trat.unmaskedValue.substr(4, 8),
    // mes_ini_1er_trat: fecha_ini_trat.unmaskedValue.substr(2, 2),
    // dia_ini_1er_trat: fecha_ini_trat.unmaskedValue.substr(0, 2),
    anafilaxis: $("#anafilaxis_9004").val(),
    cum_causa_anafil: $("#cum_causa_anafil_9004").val(),
    fract_osteo: $("#fract_osteo_9004").val(),
    pseudotumores: $("#pseudotumores_9004").val(),
    unid_edad_dx: $("#unid_edad_dx_9004").val(),
    valor_edad_dx: $("#vlr_edad_dx_9004").val(),
    // ano_dx: fecha_dx.unmaskedValue.substr(4, 8),
    // mes_dx: fecha_dx.unmaskedValue.substr(2, 2),
    // dia_dx: fecha_dx.unmaskedValue.substr(0, 2),
    motivo_prueba_dx: $("#motivo_prueba_dx_9004").val(),
    tipo_def_dx: $("#tipo_def_dx_9004").val(),
    severidad_dx: $("#severidad_dx_9004").val(),
    prof_lider_atencion: $("#prof_lider_atencion_9004").val(),
    nro_con_hematologia: $("#nro_con_hematologia_9004").val(),
    nro_con_ortopedia: $("#nro_con_ortopedia_9004").val(),
    inter_prof_enfer: $("#inter_prof_enfer_9004").val(),
    nro_con_odontologia: $("#nro_con_odontologia_9004").val(),
    nro_con_nutricion: $("#nro_con_nutricion_9004").val(),
    nro_con_t_social: $("#nro_con_t_social_9004").val(),
    nro_con_fisiatria: $("#nro_con_fisiatria_9004").val(),
    nro_con_psicologia: $("#nro_con_psicologia_9004").val(),
    nro_com_quim_farma: $("#nro_com_quim_farma_9004").val(),
    nro_con_fisioterapia: $("#nro_con_fisioterapia_9004").val(),
    factor_recibido_act: $("#factor_recibido_act_9004").val(),
    esquema_recibido_act: $("#esquema_recibido_act_9004").val(),
    ult_dosis_act: $("#ult_dosis_act_9004").val(),
    frecuencia_semana: $("#frecuencia_semana_9004").val(),
    nro_ui_dl_unid: $("#uild_periodo_9004").val(),
    nro_apl_factor: $("#nro_apl_factor_9004").val(),
    modalidad_apl_trat: $("#modalidad_apl_trat_9004").val(),
    via_admin: $("#via_admin_9004").val(),
    cum_pos: $("#cum_pos_9004").val(),
    cum_nopos: $("#cum_nopos_9004").val(),
    cum_otr1: $("#cum_otros1_trat_9004").val(),
    cum_otr2: $("#cum_otros2_trat_9004").val(),
    novedades: $("#novedades_9004").val(),
    observaciones_hc: $('#observaciones_9004').val()

  };
  var datos = "";

  $.each(datos_envio, function (i, val) {
    datos += val + "|";
  });
  datos = datos.slice(0);
  console.log(datos)
  var detalles_envio = {
    llave: $datos_9004["LLAVE"],
    detalles_hc: {
      medic_hc: $("#medic_hc").val(),
      traum_hc: $("#traum_hc").val(),
      quiru_hc: $("#quiru_hc").val(),
      toxic_hc: $("#toxic_hc").val(),
      hemor_hc: $("#hemor_hc").val(),
      ginec_hc: $("#ginec_hc").val(),
      exa_general_hc: $("#exa_general_hc").val(),
      famil_hc: $("#famil_hc").val(),
      enf_act_hc: $("#enf_act_hc").val(),
      analisis_hc: $("#analisis_hc").val()
    }
  };

  $.ajax({
    data: {
      detalles_envio
    },
    type: "POST",
    url: "http://" + $ip_servidor + "/HICLIN/paginas/inc/_datos_9004.php"
  }).done(function (data) {
    var res = data.split("|");
    if (res[0].trim() == "00") {
      // SolicitarDll({
      //     datosh: datos
      //   },
      //   respuestaDll,
      //   "http://" + $ip_servidor + "/HICLIN/app/hc9004.dll"
      // );
      SolicitarDll({
          datosh: (arr =
            dirContabilidad + "|" + $datos_9004.LLAVE + "|" + $ip_servidor + "|")
        },
        _enviar_impresion,
        "http://" + $ip_servidor + "/HICLIN/app/hc9004-2.dll"
      );
    } else {
      plantillaError(res[0], res[1], res[2]);
    }
  });
}

function plantillaToast(err, code, dll, tipo, titulo) {
  var msj = msjError(cerosIzq(code.trim(), 2));
  var title = titulo ? titulo : 'Advertencia';
  toast(title + ' ' + err, msj, tipo);
}

function validarFase1_9004(orden) {
  validarInputs({
      form: '#fase-inicio',
      orden: orden
    },
    null,
    function () {
      validarFase2_9004('1');
    }

  )
}

function validarFase2_9004(orden) {
  validarInputs({
      form: '#fase-control1',
      orden: orden
    },
    function () {
      console.log('ir atras')
      validarInputs({
        form: '#fase-inicio',
        orden: '2'
      })
    },null
  )
}

function respuestaDll(datosh) {
  var rdll = datosh.split("|");
  if (rdll[0].trim() === "00") {
    console.log(rdll[0].trim());

    alert(rdll[0].trim());
    // SolicitarDll({
    //     datosh: (arr =
    //       dirContabilidad + "|" + $datos_9004.LLAVE + "|" + $ip_servidor + "|")
    //   },
    //   _enviar_impresion,
    //   "http://" + $ip_servidor + "/HICLIN/app/hc9004-2.dll"
    // );
  } else {
    console.log("error: " + rdll[0] + " " + rdll[1] + "\n" + "en: " + rdll[2]);
    alert("error: " + rdll[0] + " " + rdll[1] + "\n" + "en: " + rdll[2]);
  }
}

function _enviar_impresion(datosh) {
  var rdll = datosh.split("|");
  if (rdll[0].trim() === "00") {
    alert(rdll[0].trim());
    var url =
      "http://" + $ip_servidor + "/hiclin/progdatos/json/SC4-" + $datos_9004['LLAVE'] + "I.json";
    SolicitarDatos({}, llenar_impresion, url);
  } else {
    console.log("error: " + rdll[0] + " " + rdll[1] + "\n" + "en: " + rdll[2]);
    alert("error: " + rdll[0] + " " + rdll[1] + "\n" + "en: " + rdll[2]);
  }
}

function llenar_impresion(data_imp) {


  let datos_impresion = data_imp['IMPRESION'][0];
  //Ejecuta servicio de impresion
  imprimir({
    'estilo': '#estilo_impresion',
    'tipo': 'pdf',
    'formato': 'http://' + $ip_servidor + '/hiclin/pdf/hci9004.html',
    // 'datos': null
    'datos': datos_impresion
  })
}

function CerosIzq(obj, tam) {
  while (obj.length < tam) {
    obj = "0" + obj;
  }
  return obj;
}

function _formatoInputs() {
  f = new Date();
  var momentFormat = "DD/MM/YYYY";
  fecha_ini_trat = new IMask(
    document.getElementById("fecha_ini_prim_trat_9004"), {
      mask: Date,
      pattern: momentFormat,
      placeholderChar: "#",
      lazy: false,
      min: new Date(1970, 0, 01),
      max: new Date(f.getFullYear(), f.getMonth(), f.getDate()),
      format: function (date) {
        return moment(date).format(momentFormat);
      },
      parse: function (str) {
        return moment(str, momentFormat);
      },

      blocks: {
        YYYY: {
          mask: IMask.MaskedRange,
          from: 1970,
          to: 2030
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 01,
          to: 12
        },
        DD: {
          mask: IMask.MaskedRange,
          from: 01,
          to: 31
        }
      }
    }
  );
  fecha_dx = new IMask(document.querySelector("[id=fecha_dx_9004]"), {
    mask: Date,
    pattern: momentFormat,
    placeholderChar: "#",
    lazy: false,
    min: new Date(1970, 0, 01),
    max: new Date(f.getFullYear(), f.getMonth(), f.getDate()),
    format: function (date) {
      return moment(date).format(momentFormat);
    },
    parse: function (str) {
      return moment(str, momentFormat);
    },

    blocks: {
      YYYY: {
        mask: IMask.MaskedRange,
        from: 1970,
        to: 2030
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 01,
        to: 12
      },
      DD: {
        mask: IMask.MaskedRange,
        from: 01,
        to: 31
      }
    }
  });

  fecha_inhib = new IMask(
    document.getElementById("fecha_ult_repor_inhib_9004"), {
      mask: Date,
      pattern: momentFormat,
      placeholderChar: "#",
      lazy: false,
      min: new Date(1970, 0, 01),
      max: new Date(f.getFullYear(), f.getMonth(), f.getDate()),

      format: function (date) {
        return moment(date).format(momentFormat);
      },
      parse: function (str) {
        return moment(str, momentFormat);
      },

      blocks: {
        YYYY: {
          mask: IMask.MaskedRange,
          from: 1970,
          to: 2030
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 01,
          to: 12
        },
        DD: {
          mask: IMask.MaskedRange,
          from: 01,
          to: 31
        }
      }
    }
  );

}