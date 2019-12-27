/* NOMBRE RM --> SER134 // NOMBRE ELECTR --> SAL714 */
var SAL9714 = [];
var $FECHAACT = new Date(),
    $ANOACT = parseInt($FECHAACT.getFullYear()),
    $MESACT = parseInt($FECHAACT.getMonth() + 1),
    $DIAACT = parseInt($FECHAACT.getDate()),
    $DIAMAX_APER, fechaAperMask;

/////////////////// MASCARAS //////////////////////
// var phoneMask = IMask($('#TELF_PACIW'), {
//     mask: '+{7}(000)000-00-00',
//     lazy: false, // make placeholder always visible
//     placeholderChar: '#' // defaults to '_'
// });
// d.getMonth() + false
function _MaskDate_9714() {
    fechaAperMask = IMask($("#FECHAPER_9714")[0], {
        mask: Date,
        pattern: 'YYYY/MM/DD',
        lazy: true,
        blocks: {
            YYYY: {
                mask: IMask.MaskedRange,
                placeholderChar: 'y',
                from: 2000,
                to: 2030,
                maxLength: 4
            },
            MM: {
                mask: IMask.MaskedRange,
                placeholderChar: 'M',
                from: 01,
                to: 12,
                maxLength: 2,
            },
            DD: {
                mask: IMask.MaskedRange,
                placeholderChar: 'd',
                from: 01,
                to: 31,
                maxLength: 2,
            },
        },
        format: function (date) {
            return moment(date).format("YYYY/MM/DD");
        },
        parse: function (str) {
            return str
        }
    });
}

$(document).ready(function () {
    loader('hide');
    _toggleF8([{
        input: 'CODPACI',
        app: '9714',
        funct: _ventanaPacientes_9714
    }, {
        input: 'PROGRAMA',
        app: '9714',
        funct: validarPrograma9714
    }]);
    CON850(_evaluarCON850_SAL9714);
});

// F8 PACIENTES
function _ventanaPacientes_9714(e) {
    loader('hide');
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            f8data: 'PACIENTES',
            columnas: [{title:'COD'}, {title:'NOMBRE'}, {title:'EPS'}, {title:'EDAD'}],
            callback: (data) => {
                document.querySelector("#CODPACI_9714").value = cerosIzq(data.COD, 15)
                _enterInput('#CODPACI_9714');
            },
            cancel: () => {
                document.querySelector("#CODPACI_9714").focus()
            }
        };
        F8LITE(parametros);
    }
}

function _evaluarCON850_SAL9714(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    SAL9714['NOVEDADW'] = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
            validarCodPaciente9714();
            break;
        case 8:
        case 9:
            validarCodPaciente9714();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#NOVSER_9714').val(novedad.id + ' - ' + novedad.descripcion)
}


function validarCodPaciente9714() {
    validarInputs({
        form: "#codpaciente",
        orden: '1'
    },
        function () {
            CON850(_evaluarCON850_SAL9714);
        },
        evaluarPaciente9714
    )
}


function evaluarPaciente9714() {

    SAL9714.COD_SISVAN = $('#CODPACI_9714').val();
    datos_envio = datosEnvio() + cerosIzq(SAL9714.COD_SISVAN, 15);
    postData({
        datosh: datos_envio
    }, get_url("APP/SALUD/SAL714-01.DLL"))
        .then((data) => {
            let res = data.split('|');
            console.debug('respuesta sal714-01', res)
            switch (parseInt(SAL9714['NOVEDADW'])) {
                case 7:
                    // Existe el paciente
                    if (res[0] == 00) {
                        if (res[1] == 01) validarEdadPaciente9714(res);
                        else CON851('00', '00', validarCodPaciente9714(), 'error', 'error');
                        break;
                    } else {
                        // No existe el paciente
                        if (res[1] == 01) CON851('01', '01', validarCodPaciente9714(), 'error', 'error');
                        else CON851('00', '00', validarCodPaciente9714(), 'error', 'error');
                        break;
                    }

                case 8:
                case 9:
                    if (res[1] == '00' && res[0] == '00') validarEdadPaciente9714(res);
                    else CON851('01', '01', validarCodPaciente9714(), 'error', 'error');
                    break;
                default:
                    _toggleNav();
                    break;
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function validarEdadPaciente9714(data) {
    var res = data;
    var fechaInicio = moment().format('YYYY-MM-DD');
    var nacimiento = moment(res[6].trim()).format('YYYY-MM-DD');
    var meses = moment(fechaInicio).diff(moment(nacimiento), 'months');
    var edad = calcular_edad(parseInt(res[6]));
    console.log(meses, "EDAD")
    SAL9714.EDAD_PACI = edad.vlr_edad + ' ' + edad.unid_edad;
    SAL9714.EDADMES_PACI = meses;
    if (SAL9714.NOVEDADW == '7') {
        if (SAL9714.EDADMES_PACI > 216 && (res[7].trim() == 'M' || res[7].trim() == 'm')) {
            CON851('74', '74', (CON850(_evaluarCON850_SAL9714), 'error', 'error'))
        } else {
            on_datoSisvan9714(res)
        }
    } else {
        on_datoSisvan9714(res)
    }
}

function on_datoSisvan9714(data) {
    console.log("data", data)
    var camposSisvan = ['SWINVALID_PACI', 'SWINVALID_SISVAN', 'COD_SISVAN', 'NOMBRE_SISVAN',
        'FICHA_SISVAN', 'FECHA_SISVAN', 'FECHANACI_PACI', 'SEXO_PACI', 'DIRECCION_PACI', 'CIUDAD_PACI', 'TELEFONO_PACI', 'ZONA_PACI', 'REGIMEN_PACI', 'ETNIA_PACI',
        'CNTSALUD_SISVAN', 'BARRIO_SISVAN', 'PROGRAM_SISVAN', 'LACT_SISVAN', 'EXCLUSIV_SISVAN', 'MESLACT_SISVAN', 'OPERCREA_SISVAN', 'FECHACREA_SISVAN', 'OPERMODIF_SISVAN',
        'FECHAMODIF_SISVAN'
    ];
    for (campo in camposSisvan) {
        if (data[campo].trim() == null || typeof data[campo].trim() == "undefined" || data[campo].trim() == void 0) SAL9714[camposSisvan[campo]] = " ";
        else SAL9714[camposSisvan[campo]] = data[campo].trim();
    };
    //llenar campos sisvan
    if (SAL9714.NOVEDADW == '8' || SAL9714.NOVEDADW == '9') {
        document.getElementById('CODPACI_9714').value = SAL9714.COD_SISVAN;
        document.getElementById('NOMBRE_9714').value = SAL9714.NOMBRE_SISVAN;
        document.getElementById('NUMEROFIC_9714').value = SAL9714.FICHA_SISVAN
        document.getElementById('FECHAPER_9714').value = SAL9714.FECHA_SISVAN
        document.getElementById('EDADSER_9714').value = SAL9714.EDAD_PACI;
        document.getElementById('EDADMES_9714').value = SAL9714.EDADMES_PACI
        document.getElementById('SEXOSER_9714').value = _validarSexo9714(SAL9714.SEXO_PACI)
        document.getElementById('DIRECCSER_9714').value = SAL9714.DIRECCION_PACI
        document.getElementById('CIUDADSER_9714').value = SAL9714.CIUDAD_PACI
        document.getElementById('TELEFSER_9714').value = SAL9714.TELEFONO_PACI
        document.getElementById('ZONASER_9714').value = _validarZona9714(SAL9714.ZONA_PACI)
        document.getElementById('REGMNSER_9714').value = _validarRegimen9714(SAL9714.REGIMEN_PACI)
        document.getElementById('ETNIASER_9714').value = _validarEtnia9714(SAL9714.ETNIA_PACI)
        document.getElementById('CENTROSER_9714').value = SAL9714.CNTSALUD_SISVAN
        document.getElementById('BARRIOSER_9714').value = SAL9714.BARRIO_SISVAN
        document.getElementById('PROGRAMA_9714').value = SAL9714.PROGRAM_SISVAN
        document.getElementById('LACTASER_9714').value = SAL9714.LACT_SISVAN
        document.getElementById('EXCLSER_9714').value = SAL9714.EXCLUSIV_SISVAN
        document.getElementById('MESLACTASER_9714').value = SAL9714.MESLACT_SISVAN
        document.getElementById('OPERDCREA_9714').value = SAL9714.OPERCREA_SISVAN
        document.getElementById('FECHACREA_9714').value = moment(SAL9714.FECHACREA_SISVAN, "YYYYMMDD").format("YYYY/MM/DD");
        document.getElementById('OPERMODF_9714').value = SAL9714.OPERMODIF_SISVAN
        document.getElementById('FECHAMODF_9714').value = SAL9714.FECHAMODIF_SISVAN
        if (SAL9714.NOVEDADW == '9') {
            actualizarSisvan9714()
        } else {
            consultarTablasSisvan9714();
        }
    } else {
        document.getElementById('NOMBRE_9714').value = SAL9714.NOMBRE_SISVAN;
        document.getElementById('EDADSER_9714').value = SAL9714.EDAD_PACI;
        document.getElementById('EDADMES_9714').value = SAL9714.EDADMES_PACI
        document.getElementById('SEXOSER_9714').value = _validarSexo9714(SAL9714.SEXO_PACI)
        document.getElementById('DIRECCSER_9714').value = SAL9714.DIRECCION_PACI
        document.getElementById('CIUDADSER_9714').value = SAL9714.CIUDAD_PACI
        document.getElementById('TELEFSER_9714').value = SAL9714.TELEFONO_PACI
        document.getElementById('ZONASER_9714').value = _validarZona9714(SAL9714.ZONA_PACI)
        document.getElementById('REGMNSER_9714').value = _validarRegimen9714(SAL9714.REGIMEN_PACI)
        document.getElementById('ETNIASER_9714').value = _validarEtnia9714(SAL9714.ETNIA_PACI)
        document.getElementById('OPERDCREA_9714').value = localStorage['Usuario'] + ' ' + localStorage['Nombre'];
        document.getElementById('FECHACREA_9714').value = moment().format('YYYY/MM/DD');

        _validarFechAper9714();
    }

}


function _validarFechAper9714() {
    _MaskDate_9714();

    validarInputs({
        form: "#fechaapertura",
        orden: '1'
    },
        function () {
            validarCodPaciente9714()
        },
        function () {
            if ($('#FECHAPER_9714').val().length == 0) {
                document.getElementById('FECHAPER_9714').value = moment().format('YYYY/MM/DD');
            }

            evaluarFechAper9714();
        }
    )
}

function evaluarFechAper9714() {
    let $fecha = fechaAperMask._value;
    $fecha = $fecha.split('/')[0] + $fecha.split('/')[1] + $fecha.split('/')[2];
    if ($fecha.length < 8) {
        CON851('03', '03', _validarFechAper9714(), 'error', 'error')
    } else {
        let $FECHA_CREAW = $fecha;
        var $ANOCREACW = $FECHA_CREAW.substring(0, 4);
        var $MESCREACW = cerosIzq($FECHA_CREAW.substring(4, 6), 2);
        var $DIACREACW = cerosIzq($FECHA_CREAW.substring(6, 8), 2);
        var $DIAMAX_APER;
        switch (parseInt($MESCREACW)) {
            case 01:
            case 03:
            case 05:
            case 07:
            case 08:
            case 10:
            case 12:
                $DIAMAX_APER = 31
                break;
            case 04:
            case 06:
            case 09:
            case 11:
                $DIAMAX_APER = 30
                break;
            case 02:
                (() => ['2012', '2016', '2020', '2024', '2028', '2032', '2036', '2040', '2044', '2048'].find($ANOCREACW)) == true ? $DIAMAX_APER = 29 : $DIAMAX_APER = 28;
                break;
        }
        if ($DIACREACW > $DIAMAX_APER) {
            CON851('37', '37', _validarFechAper9714(), 'error', 'error')
        } else {
            SAL9714.FECHA_SISVAN = $fecha;
            validarFicha9714()
        }
    }

}

function validarFicha9714() {
    validarInputs({
        form: "#numficha",
        orden: '1'
    },
        function () {
            _validarFechAper9714();
        },
        validarBarrio9714
    )
}

function _validarZona9714(zona) {
    var msj;
    switch (zona) {
        case "U":
            msj = "U - URBANA"
            break;
        case "R":
            msj = "R - RURAL"
            break;
        default:
            msj = "NO REGISTRA"
            break;
    }
    return msj;
}

function _validarSexo9714(sexo) {
    var msj;
    switch (sexo) {
        case "F":
            msj = "F - FEMENINO"
            break;
        case "M":
            msj = "M - MASCULINO";
            break;
        default:
            msj = "NO REGISTRA"
            break;
    }
    return msj;
}

function _validarRegimen9714(regimen) {
    var msj;
    switch (regimen) {
        case "C":
            msj = "C - CONTRIBUTIVO"
            break;
        case "S":
            msj = "S - SUBSIDIADO"
            break;
        case "V":
            msj = "V - VINCULADO"
            break;
        case "P":
            msj = "P - PARTICULAR"
            break;
        case "O":
            msj = "O - OTRO TIPO"
            break;
        case "D":
            msj = "D - DESPLAZ CONT"
            break;
        case "E":
            msj = "E - DESPLAZ SUBS"
            break;
        case "F":
            msj = "F - DESPLAZ VINC"
            break;
        default:
            msj = "NO REGISTRA"
            break;
    }
    return msj;
}

function _validarEtnia9714(etnia) {
    var msj;
    switch (etnia) {
        case "1":
            msj = "1 - INDIGENA"
            break;
        case "2":
            msj = "2 - RAIZAL"
            break;
        case "3":
            msj = "3 - GITANO"
            break;
        case "4":
            msj = "4 - AFROCOL"
            break;
        case "5":
            msj = "5 - ROM"
            break;
        case "6":
            msj = "6 - MESTIZO"
            break;
        case "9":
            msj = "9 - NO APLICA"
            break;
        default:
            msj = "NO REGISTRA"
            break;
    }
    return msj
}

function validarBarrio9714() {
    validarInputs({
        form: "#barrio",
        orden: '1'
    },
        function () {
            validarFicha9714();
        },
        _validarCntrSalud9714
    )
}

function _validarCntrSalud9714() {
    SAL9714.BARRIO_SISVAN = $('#BARRIOSER_9714').val();
    validarInputs({
        form: "#centrosalud",
        orden: '1'
    },
        validarBarrio9714,
        () => {
            SAL9714.CNTSALUD_SISVAN = $('#CENTROSER_9714').val();
            validarLactan9714()
        }

    )
}

function validarLactan9714() {
    validarInputs({
        form: "#lactsisvan",
        orden: '1'
    },
        _validarCntrSalud9714,
        function () {
            SAL9714.LACT_SISVAN = (document.getElementById('LACTASER_9714').value).toUpperCase();
            if (SAL9714.LACT_SISVAN == 'S' || SAL9714.LACT_SISVAN == 'N') {
                validarExclusiva9714();
            } else {
                CON851('03', '03', null, 'error', 'error');
                validarLactan9714();
            }
        }
    )
}

function validarExclusiva9714() {
    validarInputs({
        form: "#exclusivasisvan",
        orden: '1'
    },
        validarLactan9714,
        () => {
            SAL9714.EXCLUSIV_SISVAN = (document.getElementById('EXCLSER_9714').value).toUpperCase();
            if (SAL9714.EXCLUSIV_SISVAN.length == 0) {
                CON851('03', '03', validarExclusiva9714(), 'error', 'error');
            } else if (SAL9714.EXCLUSIV_SISVAN == 'S') {
                validarMesLac9714()
            } else {
                validarPrograma9714();
            }
        }
    )
}

function validarMesLac9714() {
    validarInputs({
        form: "#meslactancia",
        orden: '1'
    },
        validarExclusiva9714,
        () => {
            SAL9714.MESLACT_SISVAN = parseInt(document.getElementById('MESLACTASER_9714').value);
            SAL9714.MESLACT_SISVAN.length == 0 ? document.getElementById('MESLACTASER_9714').value = 0 : false;
            validarPrograma9714()
        }
    )
}

function validarPrograma9714() {
    validarInputs({
        form: "#programasisvan",
        orden: '1'
    },
        validarMesLac9714,
        () => {
            SAL9714.PROGRAM_SISVAN = (document.getElementById('PROGRAMA_9714').value).toUpperCase();
        }
    )
}

function validarPrograma9714() {

    var datoProgr = [{
        "COD": "1",
        "DESCRIP": "DESAYUNO INFANTIL"
    },
    {
        "COD": "2",
        "DESCRIP": "RESTAURANTE ESCOLAR"
    },
    {
        "COD": "3",
        "DESCRIP": "RECUPERACION NUTRICIONAL"
    },
    {
        "COD": "4",
        "DESCRIP": "REFRIGERIOS"
    },
    {
        "COD": "5",
        "DESCRIP": "FAMILIAS EN ACCION"
    },
    {
        "COD": "6",
        "DESCRIP": "HOGAR INFANTIL"
    },
    {
        "COD": "7",
        "DESCRIP": "RED UNIDOS"
    },
    {
        "COD": "8",
        "DESCRIP": "NO SABE"
    },
    {
        "COD": "9",
        "DESCRIP": "NINGUNO"
    }
    ]
    POPUP({
        array: datoProgr,
        titulo: 'SELECCIONAR PROGRAMA',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: SAL9714.PROGRAM_SISVAN,
        callback_f: validarExclusiva9714
    }, evaluarPrograma9714)

}

function evaluarPrograma9714(programa) {
    switch (programa.COD.trim()) {
        case '1':

            $("#PROGRAMA_9714").val('DI' + ' - ' + programa.DESCRIP.trim());
            break;
        case '2':
            $("#PROGRAMA_9714").val("RE" + ' - ' + programa.DESCRIP.trim());
            break;
        case '3':
            $("#PROGRAMA_9714").val("RN" + ' - ' + programa.DESCRIP.trim());

            break;
        case '4':
            $("#PROGRAMA_9714").val("RF" + ' - ' + programa.DESCRIP.trim());
            break;
        case '5':
            $("#PROGRAMA_9714").val("FA" + ' - ' + programa.DESCRIP.trim());
            break;
        case '6':
            $("#PROGRAMA_9714").val("HI" + ' - ' + programa.DESCRIP.trim());
            break;
        case '7':
            $("#PROGRAMA_9714").val("RU" + ' - ' + programa.DESCRIP.trim());
            break;
        case '8':
            $("#PROGRAMA_9714").val("NS" + ' - ' + programa.DESCRIP.trim());
            break;
        case '9':
            $("#PROGRAMA_9714").val("NI" + ' - ' + programa.DESCRIP.trim());
            break;
    }
    SAL9714.PROGRAM_SISVAN = programa.COD;
    // Escoger Paso-W segun NOVEDADW
    actualizarSisvan9714()
}

function consultarTablasSisvan9714() {
    let datos_envio = datosEnvio() + SAL9714.COD_SISVAN.padStart(15, '0')
    postData({
        datosh: datos_envio
    }, get_url("APP/SALUD/SAL714-03.DLL"))
        .then((data) => {
            $('#contenedortabla1').removeClass('hide')
            let tablacontrol = data.TABLA;
            let controlSisvan = [];
            tablacontrol.forEach(function (val, index, array) {
                controlSisvan.push(array[index])
            });
            $('#TABLASISVA_9714').DataTable({
                ajax: {
                    dataType: "JSON",
                    data: controlSisvan,
                    error: function (xhr, error, code) {
                        console.debug(xhr)
                        console.debug(code)
                    }
                },
                columns: [
                    { title: "FECHA" },
                    { title: "EDADMES" },
                    { title: "MESES" },
                    { title: "PESO" },
                    { title: "TALLA" },
                    { title: "IMC" },
                    { title: "PERCEF" },
                    { title: "FINALIDAD" },
                ]
            })

            if (SAL9714.SEXO_PACI == 'F' || SAL9714.SEXO_PACI == 'f') {
                if (tablacontrol.CONTROL_MATERNO !== null || typeof tablacontrol.CONTROL_MATERNO != 'undefined') {
                    $('#contenedortabla2').removeClass('hide')

                    $('#TABLASISVA2_9714').DataTable({
                        ajax: {
                            dataType: "JSON",
                            data: tablacontrol['CONTROL_MATERNO'],
                            error: function (xhr, error, code) {
                                console.debug(xhr)
                                console.debug(code)
                            }
                        },
                        columns: [
                            { title: "FECHA" },
                            { title: "PESO" },
                            { title: "IMC" },
                            { title: "EST-NUT" },
                            { title: "ALT-UTE" },
                            { title: "TENS-MEDIA" },
                            { title: "FECHA-FUR" },
                            { title: "TALLA" },
                            { title: "HEMOGLOB" },
                            { title: "TRIMESTRE" },
                            { title: "CALCIO" },
                            { title: "HIERRO" },
                            { title: "ACIDOF" }
                        ]
                    })
                }

            }
        }, _validarFechAper9714())
        .catch((error) => {
            console.log(error)
        });
}

function actualizarSisvan9714() {
    var parametros, msj, aperfecha, d, respuesta;
    switch (parseInt(SAL9714['NOVEDADW'])) {
        case 7:
            SAL9714.FICHA_SISVAN = document.getElementById('NUMEROFIC_9714').value;
            aperfecha = fechaAperMask._value;
            aperfecha = aperfecha.split('/')[0] + aperfecha.split('/')[1] + aperfecha.split('/')[2];
            SAL9714.FECHA_SISVAN = aperfecha
            d = new Date();
            SAL9714.FECHACREA_SISVAN = moment().format("YYYYMMDD");
            SAL9714.CNTSALUD_SISVA = document.getElementById('CENTROSER_9714').value;
            SAL9714.BARRIO_SISVAN = document.getElementById('BARRIOSER_9714').value;
            SAL9714.LACT_SISVAN = document.getElementById('LACTASER_9714').value;
            SAL9714.EXCLUSIV_SISVAN = document.getElementById('EXCLSER_9714').value;
            SAL9714.MESLACT_SISVAN = document.getElementById('MESLACTASER_9714').value
            SAL9714.OPERMODIF_SISVAN = '    ';
            SAL9714.FECHAMODIF_SISVAN = '        ';
            d = new Date();
            parametros = SAL9714.COD_SISVAN + '|' +
                SAL9714.FICHA_SISVAN + '|' +
                SAL9714.FECHA_SISVAN + '|' +
                SAL9714.CNTSALUD_SISVAN + '|' +
                SAL9714.BARRIO_SISVAN + '|' +
                SAL9714.PROGRAM_SISVAN + '|' +
                SAL9714.LACT_SISVAN + '|' +
                SAL9714.EXCLUSIV_SISVAN + '|' +
                SAL9714.MESLACT_SISVAN + '|' +
                SAL9714.OPERCREA_SISVAN + '|' +
                SAL9714.FECHACREA_SISVAN + '|'
            msj = '¿DESEA GRABAR LOS DATOS?'
            respuesta = "Datos grabados corectamente"

            break;
        case 8:
            SAL9714.FICHA_SISVAN = document.getElementById('NUMEROFIC_9714').value;
            aperfecha = fechaAperMask._value;
            aperfecha = aperfecha.split('/')[0] + aperfecha.split('/')[1] + aperfecha.split('/')[2];
            SAL9714.FECHA_SISVAN = aperfecha
            SAL9714.CNTSALUD_SISVA = document.getElementById('CENTROSER_9714').value;
            SAL9714.BARRIO_SISVAN = document.getElementById('BARRIOSER_9714').value;
            SAL9714.LACT_SISVAN = document.getElementById('LACTASER_9714').value;
            SAL9714.EXCLUSIV_SISVAN = document.getElementById('EXCLSER_9714').value;
            SAL9714.OPERMODIF_SISVAN = localStorage['Usuario'];
            d = new Date();
            SAL9714.FECHAMODIF_SISVAN = d.getFullYear() + (d.getMonth() + 1) + cerosIzq(d.getDate(), 2);
            parametros = SAL9714.COD_SISVAN + '|' +
                SAL9714.FICHA_SISVAN + '|' +
                SAL9714.FECHA_SISVAN + '|' +
                SAL9714.CNTSALUD_SISVAN + '|' +
                SAL9714.BARRIO_SISVAN + '|' +
                SAL9714.PROGRAM_SISVAN + '|' +
                SAL9714.LACT_SISVAN + '|' +
                SAL9714.EXCLUSIV_SISVAN + '|' +
                SAL9714.MESLACT_SISVAN + '|' +
                SAL9714.OPERCREA_SISVAN + '|' +
                SAL9714.FECHACREA_SISVAN + '|' +
                SAL9714.OPERMODIF_SISVAN + '|' +
                SAL9714.FECHAMODIF_SISVAN + '|';
            msj = '¿DESEA MODIFICAR EL REGISTRO?'
            respuesta = "Datos modificados corectamente"
            break;
        case 9:
            parametros = SAL9714.COD_SISVAN + '|'
            msj = '¿DESEA ELIMINAR EL REGISTRO?'
            respuesta = "El registro se eliminó con exito"
            break;
    }
    bootbox.confirm({
        size: "small",
        onEscape: false,
        message: msj,
        buttons: {
            confirm: {
                label: 'Si',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result == true) {
                on_actualizarSisvan9714(parametros, SAL9714['NOVEDADW'], respuesta);

            } else {
                validarPrograma9714();
            }
        }
    });
}

function on_actualizarSisvan9714(parametros, novedad, respuesta) {
    let datos_envio = datosEnvio() + novedad + "|" + parametros
    console.debug('Datos envio', datos_envio)
    postData({
        datosh: datos_envio
    }, get_url("APP/SALUD/SAL714-02.DLL"))
        .then((data) => {
            if (data[0] == "00") {
                Alert({ titulo: 'Notificacion', mensaje: respuesta })
                limpiarCajas_9714()
            } else {
                CON851('ERROR', 'ERROR AL ACTUALIZAR', limpiarCajas_9714(), 'error', 'error');
            };
        })

        .catch((error) => {
            console.log(error)
        })

}

function limpiarCajas_9714() {
    // _toggleNav();
    _inputControl('reset');
    CON850(_evaluarCON850_SAL9714);
}