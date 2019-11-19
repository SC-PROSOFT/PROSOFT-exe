function consult_enfermedad(codigo) {
    var retornar = false;
    obtenerDatosCompletos("ENFERMEDADES", function (data) {
        retornar = data.ENFERMEDADES.find(arr => arr.COD_ENF == codigo);
    })
    return retornar;
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

function consult_embar(codigo) {
    var msj = false;
    switch (codigo) {
        case '1':
            msj = "1ER TRIM. EMBA";
            break;
        case '2':
            msj = "2DO TRIM. EMBA";
            break;
        case '3':
            msj = "3ER TRIM. EMBA";
            break;
        case '4':
            msj = "NO ESTA EMBAR.";
            break;
        case '9':
            msj = "NO APLICA";
            break;
        default:
            msj = false;
    }
    return msj;
}

function consult_causa(codigo) {
    var msj = false;
    switch (codigo) {
        case '0':
            msj = "";
            break;
        case '1':
            msj = "ACCIDENTE TRABAJO";
            break;
        case '2':
            msj = "ACCIDENTE TRANSITO";
            break;
        case '3':
            msj = "ACCIDENTE RABICO";
            break;
        case '4':
            msj = "ACCIDENTE OFIDICO";
            break;
        case '5':
            msj = "OTRO ACCIDENTE";
            break;
        case '6':
            msj = "EVENTO CATASTROFIC";
            break;
        case '7':
            msj = "LESION AGRESION";
            break;
        case '8':
            msj = "LESION AUTO INFLIG"
            break;
        case '9':
            msj = "SOSP.MALTRATO FIS";
            break;
        case '10':
            msj = "SOSP.ABUSO SEXUAL";
            break;
        case '11':
            msj = "SOSP.VIOLENCIA SEX";
            break;
        case '12':
            msj = "SOSP.MALTRATO EMOC";
            break;
        case '13':
            msj = "ENFERMEDAD GENERAL";
            break;
        case '14':
            msj = "ENFERMEDAD PROFES";
            break;
        case '15':
            msj = "OTRA CAUSA";
            break;
        default:
            msj = false;
    }
    return msj;
}

function consult_tipoDiagn(codigo) {
    var msj = false;
    switch (codigo) {
        case '1':
            msj = "IMPRESION DIAGNOST";
            break;
        case '2':
            msj = "CONFIRMADO NUEVO"
            break;
        case '3':
            msj = "CONFIRMADO REPETID";
            break;
        default:
            msj = false;
    }
    return msj;
}

function consult_finalidad(codigo) {
    var msj = false;
    switch (codigo) {
        case '0':
            msj = ""
            break;
        case '1':
            msj = "ATENCION PARTO";
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

function consult_planifica(codigo) {
    var msj = false;
    switch (codigo) {
        case '1':
            msj = "DIU";
            break;
        case '2':
            msj = "ORAL";
            break;
        case '3':
            msj = "BARRERA";
            break;
        case '4':
            msj = "OTRO";
            break;
        case '5':
            msj = "NINGUNO";
            break;
        case '6':
            msj = "DIU + BARRERA";
            break;
        case '7':
            msj = "IMPL. SUBDERMICO";
            break;
        case '8':
            msj = "I.SUBDERM+BARRERA"
            break;
        case '9':
            msj = "ORAL + BARRERA";
            break;
        case 'A':
            msj = "INYECTABLE MENSUAL";
            break;
        case 'B':
            msj = "INYECTABLE+BARRERA";
            break;
        case 'C':
            msj = "INYECTABLE TRIMEST";
            break;
        case 'D':
            msj = "TRIMESTRAL+BERRERA";
            break;
        case 'E':
            msj = "EMERGENCIA";
            break;
        case 'F':
            msj = "EMERGENCIA+BARRERA";
            break;
        case 'G':
            msj = "ESTERILIZACION";
            break;
        case 'H':
            msj = "ESTERILIZA+BARRERA";
            break;
        case 'I':
            msj = "NO USA X TRADICION";
            break;
        case 'J':
            msj = "NO USA X SALUD";
            break;
        case 'K':
            msj = "NO USA X NEGACION";
            break;
        case 'L':
            msj = "COITUS INTERRUPTUS";
            break;
        case 'M':
            msj = "METODO DEL RITMO";
            break;
        default:
            msj = false;
    }
    return msj;
}

function estad_salida(codigo) {
    var msj = false;
    switch (codigo) {
        case ' ':
            msj = "";
            break;
        case '1':
            msj = "VIVO   (a)";
            break;
        case '2':
            msj = "MUERTO (a)";
            break;
        case '3':
            msj = "REMITIDO";
            break;
        case '4':
            msj = "HOSPITALIZAD";
            break;
        case '5':
            msj = "OBSERVACION";
            break;
    }
    return msj;
}

function calcular_edad(fecha) {
    //SC-EDAD
    var fechaNacimiento = moment(fecha, "YYYY-MM-DD"),
        dias = moment().diff(fechaNacimiento, 'days');
    var retornar = {
        vlr_edad: '',
        unid_edad: ''
    };

    if (dias < 30) {
        retornar.edad = dias;
        retornar.unid_edad = 'D';
    } else {
        if (dias < 365) {
            retornar.vlr_edad = moment().diff(fechaNacimiento, 'months');
            retornar.unid_edad = 'M';
        } else {
            retornar.vlr_edad = moment().diff(fechaNacimiento, 'years');
            retornar.unid_edad = 'A';
        }
    }
    return retornar;
}

function datos_finalidad(nit, sexo, edad) {
    // SER834-A
    var datos_finalidad = new Array();
    if (nit == 844003225) {
        if ((sexo == 'F') && (edad.unid_edad == 'A') && (edad.vlr_edad > 9 && edad.unid_edad < 51)) {
            datos_finalidad.push({
                'codigo': '01',
                'descripcion': consult_finalidad('1')
            });
        }

        if (edad.unid_edad == 'D') {
            datos_finalidad.push({
                'codigo': '02',
                'descripcion': consult_finalidad('2')
            });
        }

        if ((edad.unid_edad == 'A') && (edad.vlr_edad > 9 && edad.vlr_edad < 61)) {
            datos_finalidad.push({
                'codigo': '03',
                'descripcion': consult_finalidad('3')
            });
        }

        if ((edad.unid_edad == 'D' || edad.unid_edad == 'M') || (edad.unid_edad == 'A' && edad.vlr_edad < 10)) {
            datos_finalidad.push({
                'codigo': '04',
                'descripcion': consult_finalidad('4')
            });
        }

        if ((edad.unid_edad == 'A') && (edad.vlr_edad > 9 && edad.vlr_edad < 30)) {
            datos_finalidad.push({
                'codigo': '05',
                'descripcion': consult_finalidad('5')
            });
        }

        if ((sexo == 'F') && (edad.unid_edad == 'A') && (edad.vlr_edad > 9 && edad.vlr_edad < 51)) {
            datos_finalidad.push({
                'codigo': '06',
                'descripcion': consult_finalidad('6')
            });
        }

        if (edad.unid_edad == 'A' && edad.vlr_edad > 29) {
            datos_finalidad.push({
                'codigo': '07',
                'descripcion': consult_finalidad('7')
            });
        }

        datos_finalidad.push({
            'codigo': '08',
            'descripcion': consult_finalidad('8')
        });

        if (edad.unid_edad == 'A' && edad.vlr_edad > 17) {
            datos_finalidad.push({
                'codigo': '09',
                'descripcion': consult_finalidad('9')
            });
        }

        datos_finalidad.push({
            'codigo': '10',
            'descripcion': consult_finalidad('10')
        });

        datos_finalidad.push({
            'codigo': '11',
            'descripcion': consult_finalidad('11')
        });
    } else {
        if ((sexo == 'F') && (edad.unid_edad == 'A') && (edad.vlr_edad > 9 && edad.vlr_edad < 51)) {
            datos_finalidad.push({
                'codigo': '01',
                'descripcion': consult_finalidad('1')
            });
        }

        if (edad.unid_edad == 'D') {
            datos_finalidad.push({
                'codigo': '02',
                'descripcion': consult_finalidad('2')
            });
        }

        if ((edad.unid_edad == 'A') && (edad.vlr_edad > 9 && edad.vlr_edad < 61)) {
            datos_finalidad.push({
                'codigo': '03',
                'descripcion': consult_finalidad('3')
            });
        }

        if ((edad.unid_edad == 'D' || edad.unid_edad == 'M') || (edad.unid_edad == 'A' && edad.vlr_edad < 12)) {
            if ((edad.unid_edad == 'D' || edad.unid_edad == 'M') || (edad.unid_edad == 'A' && edad.vlr_edad < 6)) {
                datos_finalidad.push({
                    'codigo': '04',
                    'descripcion': "PRIMERA INFANCIA"
                });
            } else {
                datos_finalidad.push({
                    'codigo': '04',
                    'descripcion': "INFANCIA"
                });
            }
        }

        if ((edad.unid_edad == 'A') && (edad.vlr_edad > 11 && edad.vlr_edad < 29)) {
            if (edad.vlr_edad > 11 && edad.vlr_edad < 18) {
                datos_finalidad.push({
                    'codigo': '05',
                    'descripcion': "ADOLECENCIA"
                });
            } else {
                datos_finalidad.push({
                    'codigo': '05',
                    'descripcion': "JUVENTU"
                });
            }
        }

        if ((sexo == 'F') && (edad.unid_edad == 'A') && (edad.vlr_edad > 9 && edad.vlr_edad < 51)) {
            datos_finalidad.push({
                'codigo': '06',
                'descripcion': consult_finalidad('6')
            });
        }

        if (edad.unid_edad == 'A') {
            if (edad.vlr_edad > 28 && edad.vlr_edad < 60) {
                datos_finalidad.push({
                    'codigo': '07',
                    'descripcion': "ADULTEZ"
                });
            }

            if (edad.vlr_edad > 59) {
                datos_finalidad.push({
                    'codigo': '07',
                    'descripcion': "VEJEZ"
                });
            }
        }

        datos_finalidad.push({
            'codigo': '08',
            'descripcion': consult_finalidad('8')
        });

        if (edad.unid_edad == 'A' && edad.vlr_edad > 17) {
            datos_finalidad.push({
                'codigo': '09',
                'descripcion': consult_finalidad('9')
            });
        }

        datos_finalidad.push({
            'codigo': '10',
            'descripcion': consult_finalidad('10')
        });

        datos_finalidad.push({
            'codigo': '11',
            'descripcion': consult_finalidad('11')
        });
    }
    return datos_finalidad;
}

function buscar_consulta_externa() {
    //  HC811B    
    var retorno = '';

    var fecha_hc = new Array();
    fecha_hc['ano'] = $_REG_HC['fecha_hc'].substring(0, 4);
    fecha_hc['mes'] = $_REG_HC['fecha_hc'].substring(4, 6);
    fecha_hc['dia'] = $_REG_HC['fecha_hc'].substring(6, 8);

    var fecha_lim_consul = new Array();
    fecha_lim_consul['ano'] = fecha_hc.ano;
    fecha_lim_consul['mes'] = fecha_hc.mes;
    fecha_lim_consul['dia'] = '';

    if (fecha_hc.dia < 04) {
        fecha_lim_consul['mes']--;
        switch (fecha_lim_consul.mes) {
            case '01':
                fecha_lim_consul['ano']--;
                fecha_lim_consul['mes'] = 12;
                fecha_lim_consul['dia'] = 31;
                break;
            case '02':
                fecha_lim_consul['dia'] = 31;
                break;
            case '03':
                if (['00', '04', '08', '12', '16', '20'].filter(data => data == fecha_lim_consul['ano']).length > 0) fecha_lim_consul['dia'] = 29;
                else fecha_lim_consul['dia'] = 28;
                break;
            case '04', '06', '08', '11':
                fecha_lim_consul['dia'] = 31;
                break;
            case '05', '07', '09', '10', '12':
                fecha_lim_consul['dia'] = 30;
                break;
            default:
                break;
        }
        if (
            fecha_lim_consul['dia'] == 1 || fecha_lim_consul['dia'] == 2
        )
            fecha_lim_consul['dia'] - fecha_hc.dia;
    } else {
        fecha_lim_consul['dia'] - 3;
    }
    var datos_env = datosEnvio() + cerosIzq($_REG_PACI[0].cod_paci, 15) + '|' + fecha_lim_consul['ano'] + fecha_lim_consul['mes'] + fecha_lim_consul['dia'] + '|';
    SolicitarDll({
            datosh: datos_env
        },
        function (data) {

            var res = data.split("|"),
                admin = localStorage['Usuario'],
                nit = $_USUA_GLOBAL[0].NIT,
                serv = $_REG_HC.serv_hc,
                prefijo = $_USUA_GLOBAL[0].PREFIJ;
            if (res[0].trim() == "00") {
                var fecha_ult_consul = res[3];
                //Sin comprobante retorno=2, con comprobante retorno=1
                if (fecha_ult_consul < fecha_lim_consul) {
                    CON851("9A", "9A", null, "error", "error");
                    if (["ADMI", "GEBC", "YPBA"].filter(adm => adm == admin).length > 0) {
                        retorno = 1;
                    } else {
                        retorno = 2;
                        // * CLINICA META, SERVIMEDICOS PYP, ESE YOPAL, DR MEDINA,
                        // * CLINICA EMPERATRIZ, DR CASTRO, DR REYES, DRA FABIOLA
                        // * DOCTOR MENENDEZ=72200727
                        // * MOVISALUD
                        // * 900161116 sociedad cardiologica colombiana
                        // * 892000458 HOSPITAL SAN MARTIN
                        // * SI DEJAN EVOLUCIONAR SIN FACTURAR
                        // * 74858598 ALBER URIEL GALLEGO
                        // * 900988374 UNIMAFER(DOCTOR NAVARRO) ALBERT
                        // * 900565371 MAVESALUD
                        // * 900264583 ONCOORIENTE
                        // * 845000038 hospital de mitu
                        // * 900475095 ips san fernando

                        if (([
                                "892000401", "822007038", "900475095", "800175901", "19381427", "17306492",
                                "31841010", "79152952", "72200727", "900030814", "900161116", "900424844",
                                "74858598", "900988374", "19233740", "900264583", "900475095", "901146885",
                                "900450008"
                            ].filter(empresa => empresa == nit).length > 0) ||
                            (nit == "800162035" && prefijo == "08") ||
                            (nit == "892000458" && serv == "08") ||
                            (nit == "900565371" && serv == "09") ||
                            (nit == "844003225" && ["EM", "CH", "TL", "CS"].filter(pref => pref == prefijo).length > 0)
                        ) {
                            retorno = 1;
                        } else if (nit == "844003225" && fecha_ult_consul < 20190401) {
                            retorno = 1;
                        }
                    }
                }
            } else {
                plantillaError(res[0], res[1], res[2]);
            }
        },
        get_url("APP/HICLIN/HC836A.DLL")
    );

    if (retorno == 2) {
        _cargarEventos("on");
        _toggleNav();
    }
}

function recalcularCenso_hosp(callback,atiende_prof) {
    var f = new Date();
    if (f.getHours() > 04 && f.getHours() < 20) {
        let URL = get_url("APP/" + "HICLIN/HC904A" + ".DLL");
        postData({
                datosh: datosEnvio() + (f.getFullYear() + 1) + "|" + 7+"|"+atiende_prof+"|"
            }, URL)
            .then(() => {
                callback
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

function consultar_detalles_historia(folio_dethc, cods_dethc, llave_dethc, callback) {
    //HC-01 Consultar detalles historia
    /* if cods_dethc==** => trae todos los detalles
    if cods_dethc==[array] => selecciona solo esos detalles
       if folio.lenght==0 || llave_dethc==llave_hc => selecciona folio anterior a la nueva historia
       if folio.lenght!==0 => selecciona folio especifico
       callback: funcion que se ejecuta luego de consultar el json
    */

    var llave_dethc_env = '',
        sw_detalle = '  ',
        llave = $_REG_HC.llave_hc;

    if (llave_dethc.length == 0) llave_dethc = llave;

    if (folio_dethc !== '**') {
        llave_dethc_env = $_REG_PACI[0].cod_paci + folio_dethc;

    } else {
        var folio = $_REG_HC.suc_folio_hc + cerosIzq((parseInt($_REG_HC.nro_folio_hc) - 1), 6)
        llave_dethc_env = $_REG_PACI[0].cod_paci + folio;
    }
    if (cods_dethc !== '**') {
        if (Array.isArray(cods_dethc)) {
            cods_dethc = cods_dethc.toString();

        } else {
            sw_detalle = '**';
        }
    }
    datos_env = (
        datosEnvio() +
        llave_dethc_env + '|' +
        localStorage['Usuario'] + '|' +
        sw_detalle + '|' +
        folio_dethc + '|' +
        cods_dethc + '|');

    SolicitarDll({
        datosh: datos_env
    }, function (data) {
        var res = data.split('|')
        if (res[0] == '00') {
            if (res[1] == "99") {
                callback(res[1])
            } else {
                SolicitarDatos({}, callback, get_url("TEMP/" + res[3]))
            }
        } else {
            plantillaError(res[0], res[1], res[2]);
        }
    }, get_url("APP/HICLIN/HCDETAL-ANT.DLL"));
}