function consult_ultdethc(codigo) {
    var retornar = false;
    for (var i in $DATOS_DETHC) {
        if ($DATOS_DETHC[i]['COD-DETHC'].trim().toLowerCase() == codigo.toLowerCase()) {
            retornar = $DATOS_DETHC[i];
            break;
        }
    }
    return retornar;
}

function consultarItemArray_dethc(COD_DETHC) {
    var retornar = false;
    for (var i in $DATOS_DETHC) {
        if (COD_DETHC == $DATOS_DETHC[i]['COD-DETHC'] && $LLAVE_HC == $DATOS_DETHC[i]['LLAVE-HC']) {
            retornar = {
                index: i,
                array: $DATOS_DETHC[i]
            }
            break;
        }
    }
    return retornar;
}


function consult_enfermedad(codigo) {
    var retornar = false;
    for (var i in $_ENFERMEDADES) {
        if ($_ENFERMEDADES[i].COD.trim().toLowerCase() == codigo.toLowerCase()) {
            retornar = $_ENFERMEDADES[i];
            break;
        }
    }
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
                    'descripcion': "Primera infanacia"
                });
            } else {
                datos_finalidad.push({
                    'codigo': '04',
                    'descripcion': "Infancia"
                });
            }
        }
        
        if ((edad.unid_edad == 'A') && (edad.vlr_edad > 11 && edad.vlr_edad < 29)) {
            if (edad.vlr_edad > 11 && edad.vlr_edad < 18){
                datos_finalidad.push({
                    'codigo': '05',
                    'descripcion': "Adolecencia"
                });
            }else{
                datos_finalidad.push({
                    'codigo': '05',
                    'descripcion': "Juventu"
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
            if (edad.vlr_edad > 28 && edad.vlr_edad < 60){
                datos_finalidad.push({
                    'codigo': '07',
                    'descripcion': "Adultez"
                });
            }
            
            if (edad.vlr_edad > 59) {
                datos_finalidad.push({
                    'codigo': '07',
                    'descripcion': "Vejez"
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