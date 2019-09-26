$_REG_PROF = [], $_REG_HC = [];
$_COMP = {
  suc: "",
  tipo: "",
  comprobante: ""
};
$(document).ready(function () {
    loader('show');
    _iniciar_menu_his();
    $('#busqpaci_his').val('94475639');
});

function _iniciar_menu_his() {
    var data = datosEnvio() + localStorage['Usuario'].trim();
    SolicitarDll({datosh: data}, on_iniciar_menu_his, get_url("APP/HICLIN/HC000.DLL"));
}

function on_iniciar_menu_his(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var especialidades_profesional = res[4].split(';');
        $_REG_PROF.tabla_esp_prof = new Array();
        $_REG_PROF.cod_prof = res[1], $_REG_PROF.descripcion = res[2],
                $_REG_PROF.atiende_prof = res[3], $_REG_PROF.tabla_esp_prof = especialidades_profesional;
        $_REG_PROF.tabla_esp_prof.pop();
        validarPaciente();
        _toggleF8([{
                input: 'busqpaci',
                app: 'his',
                funct: _ventanaPacientes
            }]);
        loader('hide');
    } else {
        plantillaError(res[0], res[1], res[2]);
    }
}

function _ventanaPacientes(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite({
            titulo: 'VENTANA DE PACIENTES',
            tablaSql: 'sc_pacie',
            indice: ['cedula', 'nombre'],
            mascara: [],
            minLength: 3,
            callback_esc: function () {
                $('#busqpaci_his').focus();
            },
            callback: function (data) {
                $('#busqpaci_his').val(data.cedula).focus();
            }
        });
    }
}
function ir_hc9004(){
    $("#body_main").load("../../HICLIN/paginas/hc9004-1.html");
 }
function validarPaciente() {
    validarInputs({
        form: '#formConsult_his',
        orden: "1"
    },
            function () {
                CON850_P(function (e) {
                    if (e.id == 'S') {
                        salir_modulo();
                    } else {
                        validarPaciente();
                    }
                }, {msj: "03"});
            },
            function () {
                if ($('#busqpaci_his').val()) {
                    var data = datosEnvio() + cerosIzq($('#busqpaci_his').val(), 15) + "|" + localStorage['Usuario'] + "|";

                    SolicitarDll({datosh: data}, cargarDatosPaci, get_url("APP/HICLIN/HC000-1.DLL"));
                } else {
                    jAlert({titulo: 'Error ', mensaje: 'Debe ingresar una identificacion'}, validarPaciente);
                }
            }
    );
}

function cargarDatosPaci(data) {
    var url = get_url("progdatos/json/SC-ARCHPA-" + localStorage['Sesion'].trim() + ".json");
    var res = data.split('|');
    SolicitarDatos({}, function (paci) {
        $DATOS_PACIE = paci['PACIENTE'];
        if (res[0].trim() == '00') {
            if (res[2].trim() == '0') {
                // no existe historia clinica 
                _consultHc(res[1]);
            } else {
                // existe historia clinica
                var data = datosEnvio() + res[1] + "|";
                SolicitarDll({datosh: data}, function (data) {
                    res = data.split('|');
                    if (res[0].trim() == '00') {
                        montarHc811();
                    } else {
                        plantillaError(res[0], res[1], res[2]);
                    }
                }, get_url("APP/HICLIN/HC811.DLL"));
            }
        } else {
            plantillaError(res[0], res[1], res[2]);
        }
    }, url);
}

function montarHc811() {
    var url = get_url("progdatos/json/SC-HC811-" + localStorage['Sesion'].trim() + ".json");
    SolicitarDatos({}, function (data) {
        var hc = data.HC, sw_open = 0;
        hc.pop();
        for (var i in hc) {
            if (hc[i].ESTADO == 1) {
                sw_open = 1;
            }
        }

        if (sw_open != 1) {
            var nuevahc = historiaNueva(hc);
            hc.push(nuevahc);
        }
        hc.reverse();

        _ventanaDatos({
            titulo: $DATOS_PACIE[0].DESCRIP,
            columnas: ["FOLIO-HC", "NOM-SERV", "FECHA-HC", "HORA-HC", "MOTIV-HC", "MED-HC", "ESTADO"],
            data: hc,
            orden: false,
            callback_esc: function () {
                $('#busqpaci_his').focus();
            },
            callback: function (data) {
                var llave = cerosIzq($DATOS_PACIE[0].COD, 15) + data['FOLIO-HC'].split('-')[0] + data['FOLIO-HC'].split('-')[1];
                _consultHc(llave);
            }
        });



    }, url);
}

function _consultHc(llave) {
    $_REG_HC.llave_hc = llave;
    var data = datosEnvio() + llave + "|";
    SolicitarDll({datosh: data},
            function (data) {
                var res = data.split('|');
                if (res[0].trim() == '00') {
                    _mostrarDatosPaci(res);
                } else {
                    plantillaError(res[0], res[1], res[2]);
                }
            },
            get_url("APP/HICLIN/HC000-2.DLL")
            );
}

function _mostrarDatosPaci(resp) {
    $_REG_HC.unser_hc = resp[1];
    $_REG_HC.eps_hc = resp[3];
    $_REG_HC.sexo_hc = resp[8];
    $_REG_HC.ocup_v8_hc = resp[9];
    $_REG_HC.temporal_hc = resp[11];
    $_REG_HC.estado_hc = resp[12];
    
    var edad = calcular_edad(resp[13]);
    $_REG_HC.edad_hc = edad;
    
    $_REG_HC.finalid_hc = resp[14];
    $_REG_HC.serv_hc = resp[15];
    $_REG_HC.esquema_hc = resp[16].trim();
    $_REG_HC.novedad_hc = resp[17].trim();
    
    $('#doc_paci_his').val($DATOS_PACIE[0].COD);
    $('#cod_ent_his').val(resp[1]);
    $('#descrip_ent_his').val(resp[2]);
    $('#cod_ent_his').val(resp[3]);
    $('#descrip_ent_his').val(resp[4]);
    $('#suc_paci_his').val(resp[5]);
    $('#fol_paci_his').val(resp[6]);
    $('#nom_paci_his').val(resp[7]);
    $('#sex_paci_his').val(resp[8]);
    $('#cod_ocu_his').val(resp[9]);
    $('#descrip_ocu_his').val(resp[10]);
    $('#edad_paci_his').val(edad.vlr_edad + " " + edad.unid_edad);

    var descrip_hc;

    if ($_REG_HC.temporal_hc == '1') {
        descrip_hc = "TEMPORAL";
    } else {
        switch ($_REG_HC.estado_hc) {
            case '0':
                descrip_hc = "NO HAY H.C. ";
                break;
            case '1':
                descrip_hc = "H.C. ABIERTA";
                break;
            case '2':
                descrip_hc = "H.C. CERRADA";
                break;
        }
    }
    $('#descrip_hc_his').val(descrip_hc);
    _toggleNav();
    $('.menuToggle').attr('style', 'display: block;');
    $('#formConsult_his').attr('hidden', true);
    $('.footer').attr('hidden', true);
}

function historiaNueva(hc) {
    var date = new Date(), folio = parseInt(hc[hc.length - 1]['FOLIO-HC'].split('-')[1]);
    folio = cerosIzq(folio + 1, 6);
    var nueva = {
        'DETALLE': "1                   ",
        'DIAG-MUER-HC': "    ",
        'EGRESO-HC': "",
        'ESPECIALIDAD': "                                                                      ",
        'ESTADO': "01",
        'FACT-HC': " ",
        'FECHA-HC': date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
        'FECHA-ORD-SALIDA-HC': "00/00/0000",
        'FOLIO-HC': hc[hc.length - 1]['FOLIO-HC'].split('-')[0] + '-' + folio,
        'HAB-HC': "    ",
        'HORA-HC': date.getHours() + ":" + date.getMinutes(),
        'HORA-ORD-SALIDA-HC': "00:00",
        'ID-HC': $DATOS_PACIE[0]['COD'],
        'MED-HC': $_REG_PROF.cod_prof,
        'MOTIV-HC': "**ABRIR NUEVA HISTORIA**                            ",
        'NIT-FACT-HC': "0000000000",
        'NOM-SERV': "**NUEVA**",
        'OPER-CIE-HC': "",
        'OPER-ORD-SALIDA-HC': "    ",
        'SERV-HC': "",
        'UNSERV-HC': ""
    };
    return nueva;
}