$(document).ready(function () {
    loader("hide");
    _confirmar_medico_hc0003();
});

function _confirmar_medico_hc0003() {
    var admin = localStorage['Usuario'];
    if (admin != 'GEBC' || admin != '0101') {
        _consultaSql({
            sql: "Select detalle from sc_archprof where cedula =" + $_REG_PROF.cod_prof,
            callback: function (error, results, fields) {
                if (error) throw error;
                else {
                    if (JSON.parse(JSON.stringify(results))[0].length == 0) {
                        CON851("9X", "9X", null, "error", "error");
                    } else {
                        var atiende = $_REG_PROF.atiende_prof;
                        if (
                                atiende == "1" ||
                                atiende == "2" ||
                                atiende == "3" ||
                                atiende == "7" ||
                                atiende == "8" ||
                                atiende == "O" ||
                                atiende == "6") {
                            confirmarNovedad_menu_h03();
                        } else {
                            if ($_USUA_GLOBAL[0].NIT == 900565371 && atiende == "4") {
                                confirmarNovedad_menu_h03();
                            } else {
                                CON851("15", "15", null, "error", "error");
                                $("#body_hc").load("../paginas/menu_his.html");
                            }
                        }
                    }
                }
            }
        });
    } else {
        confirmarNovedad_menu_h03();
    }
}

function confirmarNovedad_menu_h03() {
    if ($_REG_HC.novedad_hc == '8') {
        if (localStorage['Usuario'] == 'GEBC' || $_REG_HC.temporal_hc == '1' ||
                ($_USUA_GLOBAL[0].NIT == 800037021 && localStorage['Usuario'] == 'ADMI')
                || ($_USUA_GLOBAL[0].NIT == 892000401 && localStorage['Usuario'] == 'ADMI')
                ) {
            datoUnidad();
        } else {
            console.debug('Se cancela el menu-h03');
            // $("#body_hc").load("../paginas/menu_his.html");
        }
    } else {
        $_REG_HC.fecha_hc = moment().format('YYYYMMDD');
        $_REG_HC.hora_hc = moment().format('hhmm');
        datoUnidad();
    }
}

function datoUnidad() {
    if ($_REG_PROF.atiende_prof == '3' || $_REG_PROF.atiende_prof == '6') {
        finValidarUnidad('08');
    } else {
        on_datoUnidad();
    }
}

function on_datoUnidad() {
    _consultaSql({
        sql: "Select codigo, descripcion from sc_unser where activ_serv='S'",
        callback: function (error, results, fields) {
            if (error)
                throw error;
            else {
                POPUP({
                    array: JSON.parse(JSON.stringify(results)),
                    titulo: "UNIDADES DE SERVICIO",
                    indices: [{
                            id: "codigo",
                            label: "descripcion"
                        }]
                },
                        validarDatoUnidad
                        );
            }
        }
    });
}

function validarDatoUnidad(unidad) {
    var sw = 0;
    if (unidad.codigo == "F") {
        console.debug('Salir de la unidad de servicio');
    } else {
        if (
                $_USUA_GLOBAL[0].NIT == 832002436 ||
                $_USUA_GLOBAL[0].NIT == 845000038 ||
                $_USUA_GLOBAL[0].NIT == 900005594 ||
                $_USUA_GLOBAL[0].NIT == 800037979 ||
                $_USUA_GLOBAL[0].NIT == 830511298 ||
                $_USUA_GLOBAL[0].NIT == 830515242 ||
                $_USUA_GLOBAL[0].NIT == 822001570
                ) {
            if ($_COMP.tipo == '5') {
                if (unidad.codigo != '02') {
                    if (localStorage['Usuario'] != 'GEBC' || localStorage['Usuario'] != 'ADMI') {
                        sw = 1;
                        plantillaToast('', 'B1', null, 'error', 'error');
                    }
                }
            }

            if ($_COMP.tipo == '7') {
                if (unidad.codigo != '08') {
                    if (localStorage['Usuario'] != 'GEBC' || localStorage['Usuario'] != 'ADMI') {
                        sw = 1;
                        plantillaToast('', 'B1', null, 'error', 'error');
                    }
                }
            }

            if (sw == 0) {
                finValidarUnidad(unidad);
            } else {
                datoUnidad();
            }
        }
    }
}

function finValidarUnidad(unidad) {
    var sw = 0;
    if ($_COMP.tipo == '7') {
        if (unidad != '08') {
            sw = 1;
            plantillaToast('', 'B1', null, 'error', 'error');
        }
    }

    if ($_USUA_GLOBAL[0].NIT == 822001570 && $_COMP.tipo == '5' && unidad == '08') {
        sw = 1;
        plantillaToast('', 'B1', null, 'error', 'error');
    }

    if (sw == 1) {
        datoUnidad();
    } else {
        $_REG_HC.serv_hc = unidad;
        datoFindalidad();
    }
}

function datoFindalidad() {
    if ($_REG_HC.serv_hc != '08') {
        $_REG_HC.finalid_hc = "10";
        //mostrarFinalidad
    } else {
        POPUP({
            array: datos_finalidad($_USUA_GLOBAL[0].NIT, $_REG_HC.sexo_hc, $_REG_HC.edad_hc),
            titulo: "FINALIDAD",
            indices: [{
                    id: "codigo",
                    label: "descripcion"
                }]
        },
                validarFinalidad
                );
    }

}

function validarFinalidad(data) {
    if (data.codigo == "F") {
        if ($_REG_PROF.atiende_prof == '3' || $_REG_PROF.atiende_prof == '6') {
            console.debug('con851p');
        } else {
            console.debug('salir');
        }
    } else {
        if (($_USUA_GLOBAL[0].NIT == 900005594 || $_USUA_GLOBAL[0].NIT == 800037979)
                && (data.codigo == '10' || data.codigo == '11') && ($_REG_PROF.atiende_prof == '3')) {
            plantillaToast('', '15', null, 'error', 'error');
            datoFindalidad();
        } else {
            $_REG_HC.finalid_hc = data.codigo;
            selecionarPrograma();
        }
    }
}

function selecionarPrograma() {
    var edad = $_REG_HC.edad_hc,
            atiende_prof = $_REG_PROF.atiende_prof,
            esp_prof = $_REG_PROF.tabla_esp_prof,
            serv = $_REG_HC.serv_hc,
            finalidad = $_REG_HC.finalid_hc,
            nit = $_USUA_GLOBAL[0].NIT,
            esquema = $_REG_HC.esquema_hc;


    if ($_REG_HC.novedad_hc == '7') {
        // validacion aiepi de 0 a 2 meses 
        if (
                (edad.unid_edad == 'D' || (edad.unid_edad == 'M' && edad.vlr_edad == "1"))
                && (atiende_prof == '2' || atiende_prof == '3' || atiende_prof == '6' || esp_prof[0] == '550')) {

            if (
                    (serv == '08' && finalidad == '08')
                    || (serv == '11' || serv == '12' || serv == '13' || serv == '01')
                    || (nit == 900005594 && serv == '01')) {
                buscar_programa('HC-01');
            } else {
                buscar_programa('AIEPI002');
            }
            // validacion de 2m a 5aÃ±os
        } else if (
                (edad.unid_edad == 'M' && edad.vlr_edad > 1)
                || (edad.unid_edad == 'A' && edad.vlr_edad < 5)
                && (atiende_prof == '2' || atiende_prof == '3' || atiende_prof == '6' || esp_prof[0] == '550')) {

            if (
                    (serv == '08' && finalidad == '08')
                    || (serv == '11' || serv == '12' || serv == '13' || serv == '01')
                    || (nit == 900005594 && serv == '01')) {
                buscar_programa('HC-01');
            } else {
                buscar_programa('AIEPI001');
            }
            // otorrinolaringologia
        } else if ((esp_prof[0] == '521' || esp_prof[0] == '522')
                || (esp_prof[1] == '521' || esp_prof[1] == '522')) {
            buscar_programa('HC-12');
            // oftalmologia y optometria
        } else if ((esp_prof[0] == '480' || esp_prof[0] == '481' || esp_prof[0] == '500')
                (esp_prof[1] == '480' || esp_prof[1] == '481' || esp_prof[1] == '500')
                ) {
            buscar_programa("HC-13");
            // oncologia oncooriente 
        } else if (
                (esp_prof[0] == '490' || esp_prof[0] == '491' || esp_prof[0] == '492')
                (esp_prof[1] == '490' || esp_prof[1] == '491' || esp_prof[1] == '492')
                && (nit == 900264583) && (localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'ADMI')
                ) {
            buscar_programa("HC9004");
            // historia mamografia
        } else if ((nit == 830092718) && (esp_prof[0] == '602')) {
            buscar_programa("HC-14");
            // historia resumida para albergue de sucurame
        } else if (nit == 900565371) {
            buscar_programa("HC-02");
        } else if (serv == '08') {
            if (
                    finalidad == '03' ||
                    finalidad == '05' ||
                    finalidad == '06' ||
                    finalidad == '10' ||
                    finalidad == '07'
                    ) {
                //finalidades que tengan formatos o apliquen para algun formato especial pyp 
                var array_finalidad = selecionPyp(finalidad, $_REG_HC.sexo_hc);
                console.debug(array_finalidad);
                
                if (esquema.trim() != '') {
                    switch (esquema) {
                        case '8001':
                            programa = "HC-8001";
                            break;
                        case '8002':
                            programa = "HC-8002";
                            break;
                        case '8031':
                            programa = "HC-8031";
                            break;
                        case '8051':
                            programa = "HC-8051";
                            break;
                        default :
                            programa = "HC-01";
                            break;
                    }
                }
            } else {
                programa = "HC-01";
            }
        }
    } else {

        if (validar_servicio_finalidad_hc0003()) {
            switch (esquema) {
                case "AI02": programa = "AIEPI002"; break;
                case "AI01": programa = "AIEPI001"; break;
                case "HC12": programa = "HC-12"; break;
                case "HC13": programa = "HC-13"; break;
                case "HC14": programa = "HC-14"; break;
                case "HC01": programa = "HC-01"; break;
                case "HC02": programa = "HC-02"; break;
                case "8001": programa = "HC-8001"; break;
                case "8002": programa = "HC-8002"; break;
                case "8031": programa = "HC-8031"; break;
                case "8051": programa = "HC-8051"; break;
                default: programa = ''; break;
            }
        }
    }
    
}

function mostrar_historiaPYP(array) {
    POPUP({
        array: array,
        titulo: "SELECCION HISTORIA PYP",
        indices: [{
                id: "esquema",
                label: "descripcion"
            }]
    },
        _data_hcPYP_hc0003
    );
}

function selecionPyp(finalidad, sexo) {
    var array_pyp = new Array();
    if (sexo == "F") {
        if (["03", "05", "06", "07", "10"].filter(arr => arr == finalidad)) {
            array_pyp.push({
                esquema: "8001",
                descripcion: "HISTORIA CLINICA DE CITOLOGIA TOMA Y CONTROL"
            }, {
                esquema: "8002",
                descripcion: "HISTORIA CLINICA DE CITOLOGIA BETHESDA       "
            });
        }
    }
    
    switch (finalidad) {
        case "03":
            array_pyp.push({
                esquema: "8031",
                descripcion: "HISTORIA CLINICA PLANIFICACION FAMILIAR"
            });
            break;
        case "05":
            array_pyp.push({
                esquema: "8031",
                descripcion: "HISTORIA CLINICA DEL JOVEN"
            });
            break;
        case "06":
        case "07":
        case "10":
            array_pyp.push({
                esquema: "HC01",
                descripcion: "HISTORIA CLINICA NORMAL"
            });
            break;
    }
    return array_pyp;
}

function _data_hcPYP_hc0003(data) {
    $ESQUEMA = data.esquema;
    if ($ESQUEMA.length == 0) {
        setTimeout(_unidadesdeservicio_hc0003, 500);
    } else {
        switch ($ESQUEMA) {
            case "8001":
                buscar_programa("HC-8001");
                break;
            case "8002":
                buscar_programa("HC-8002");
                break;
            case "8031":
                buscar_programa("HC-8031");
                break;
            case "8051":
                buscar_programa("HC-8051");
                break;
            default:
                buscar_programa("HC-01");
                break;
        }
    }
}

function validar_servicio_finalidad_hc0003() {
    var esquema = $_REG_HC.esquema_hc,
            retorno = false,
            serv = $_REG_HC.serv_hc,
            finalidad = $_REG_HC.finalid_hc;

    if (esquema == "AI01" || esquema == "AI02") {
        if (
                ["01", "02", "06", "07", "08"].filter(arr => arr == serv)
                && !finalidad == 08
                ) {
            retorno = true;
        }
    }


    if (["8001", "8002", "8031", "8051"].filter(arr => arr == esquema)) {
        if (
                serv == 08 && ["3", "5", "6", "10"].filter(arr => arr == finalidad)
                ) {
            retorno = true;
        }
    }

    if (["HC12", "HC13", "HC14"].filter(arr => arr == esquema)) {
        if (
                serv !== 08 && ["3", "5", "6", "10"].filter(arr => arr == finalidad)
                ) {
            retorno = true;
        }
    }

    return retorno;
}

function buscar_programa(programa) {
    if (programa){
        console.debug(programa)
    }else{
        jAlert({titulo: 'Error ', mensaje: 'Programa ha abrir no definido'});
    }
}