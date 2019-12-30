/* NOMBRE RM --> SER119 // NOMBRE ELECTR --> SAL719 */

// import { loadavg } from "os";

var arraySucursal_719, arrayDivision_719, arrayOperador_719, arrayMaestros_719, arrayTerceros719, arrayProfesionales719, arrayDatosCompletos719, arrayHorProf_119 = [];
var arrayHorProfMoment_119, $novPopUp
var salas119;
var fechaActual119
var teclaFuncEspec_119;
var $_NovedSal719

var $val_Tabla_119

var maskFechas = [];
var maskHora = [];
var maskFrec = [];

var $_fechaPopUp_119, $_fechaDeshabDesde_119, $_fechaDeshabHasta_119
var maskFechaPop = []
var maskHoraPop = [];
var maskFrecPop = [];


var tablaLunesEnvio = [];
var tablaMartesEnvio = [];
var tablaMiercolesEnvio = [];
var tablaJuevesEnvio = [];
var tablaViernesEnvio = [];
var tablaSabadoEnvio = [];
var tablaDomingoEnvio = [];

var datosTablaEnvio_119 = [];

$(".imaskFrec").each(function (index, element) {
    var blocksMaskFrec = IMask(element, {
        mask: 'VL',
        lazy: true,  // make placeholder always visible

        blocks: {
            VL: {
                mask: IMask.MaskedRange,
                from: 00,
                to: 60
            }
        }
    })
    maskFrec.push(blocksMaskFrec);
});


var momentFormat = 'YYYY/MM/DD-HH:mm';
var momentMaskFechaDesde = new IMask($("#desAgenDesde_ser119")[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(2009, 0, 1, 0, 0),
    max: new Date(2080, 0, 1, 0, 0),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        $_fechaDeshabDesde_119 = str;
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2009,
            to: 2080
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }

})

var momentMaskFechaHasta = new IMask($("#desAgenHasta_ser119")[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(2009, 0, 1),
    max: new Date(2080, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        $_fechaDeshabHasta_119 = str;
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2009,
            to: 2080
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }

})

$(".imaskHora").each(function (index, element) {
    var blocksMaskHora = IMask(element, {
        mask: 'HH:MM',
        lazy: true,  // make placeholder always visible


        blocks: {
            HH: {
                mask: IMask.MaskedRange,
                from: 0,
                to: 23,
                placeholder: '00'
            },
            MM: {
                mask: IMask.MaskedRange,
                from: 0,
                to: 59,
                placeholder: '00'
            }
        }
    });
    maskHora.push(blocksMaskHora);
})

// NUEVA FUNCION DEL F8
$(document).ready(function () {
    // $_USUA_GLOBAL[0].NIT = 0830092718
    _inputControl('reset');
    _inputControl('disabled');

    _toggleF8([
        { input: 'identificacion', app: '719', funct: _ventanaIdentificacion719 },
        { input: 'divCups', app: '719', funct: _ventanaDivis719 },
        { input: 'sucursal', app: '719', funct: _ventanaSucursal719 },
        { input: 'cuentaRte', app: '719', funct: _ventanaCuentRte719 },
        { input: 'espec1', app: '719', funct: _Especialistas719 },
        { input: 'espec2', app: '719', funct: _Especialistas719 },
        { input: 'espec3', app: '719', funct: _Especialistas719 },
        { input: 'espec4', app: '719', funct: _Especialistas719 },
        { input: 'espec5', app: '719', funct: _Especialistas719 },
        { input: 'operAsig1', app: '719', funct: _ventanaOperador719 },
        { input: 'operAsig2', app: '719', funct: _ventanaOperador719 },
        { input: 'operAsig3', app: '719', funct: _ventanaOperador719 },
        { input: 'operAsig4', app: '719', funct: _ventanaOperador719 },
        { input: 'operAsig5', app: '719', funct: _ventanaOperador719 }
    ]);
    datosTerceros719();
});

function _ventanaIdentificacion719(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        switch ($_NovedSal719) {
            case '7': f8Terceros719();
                break;
            case '8':
            case '9':
                f8Profesionales719();
                break;
        }
    }
}

function f8Terceros719() {
    _ventanaDatos({
        titulo: "Ventana De Terceros",
        columnas: ["COD", "NOMBRE"],
        data: arrayTerceros719,
        callback_esc: function () {
            $("#identificacion_719").focus()
        },
        callback: function (data) {
            $("#identificacion_719").val(data.COD)
            $("#nombre_119").val(data.NOMBRE);
            _enterInput('#identificacion_719');
        }
    });
}

function f8Profesionales719() {
    _ventanaDatos({
        titulo: "Ventana De Profesionales",
        columnas: ["NOMBRE", "IDENTIFICACION"],
        data: arrayProfesionales_719,
        callback_esc: function () {
            $("#identificacion_719").focus()
        },
        callback: function (data) {
            $("#nombre_119").val(data.NOMBRE);
            $("#identificacion_719").val(data.IDENTIFICACION)
            _enterInput('#identificacion_719');
        }
    });
}

function _ventanaCuentRte719(e) { // Habilitar F8
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var filtroMaestros
        var cta_ret = $('#cuentaRte_719').val().trim()

        if (cta_ret.length < 1) {
            cta_ret = arrayDatosCompletos719.MAYORRET
            filtroMaestros = arrayMaestros_719.filter(maestro => maestro.CTA_MAY == cta_ret)
        } else {
            var ctaMayor = cta_ret.substring(0, 4)
            if (ctaMayor) {
                filtroMaestros = arrayMaestros_719.filter(maestro => maestro.CTA_MAY == ctaMayor)
                var subCta = cta_ret.substring(4, 6)
                if (subCta) {
                    filtroMaestros = filtroMaestros.filter(maestro => maestro.SUB_CTA == subCta)
                    var aux = cta_ret.substring(6, 11)
                    if (aux) {
                        filtroMaestros = filtroMaestros.filter(maestro => maestro.AUX_MAE == aux)
                    }
                }
            } else {
                filtroMaestros = arrayMaestros_719
            }
        }
        // var filtroMaestros = arrayMaestros_719.filter(maestro => (maestro.CTA_MAY == ctaMayor) && (maestro.SUB_CTA == subCta) && (maestro.AUX_MAE == aux))
        _ventanaDatos({
            titulo: "VENTANA PLAN DE CUENTAS",
            columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "NOMBRE_MAE", "TIPO_MAE"],
            data: filtroMaestros,
            callback_esc: function () {
                $("#cuentaRte_719").focus()
            },
            callback: function (data) {
                $("#cuentaRte_719").val(data.CTA_MAY.trim() + data.SUB_CTA.trim() + data.AUX_MAE.trim())
                _enterInput('#cuentaRte_719');
            }
        });
    }
}

function _ventanaDivis719(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "Ventana De Divisiones",
            columnas: ["COD", "DESCRIP"],
            data: arrayDivision_719,
            callback_esc: function () {
                $("#divCups_719").focus()
            },
            callback: function (data) {
                $("#divCups_719").val(data.COD)
                $("#descDiv_119").val(data.DESCRIP)
                _enterInput('#divCups_719');
            }
        });
    }
}

function _ventanaSucursal719(e) { // Habilitar F8
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana De Sucursales',
            columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
            data: arraySucursal_719,
            callback_esc: function () {
                $("#sucursal_719").focus()
            },
            callback: function (data) {
                $("#sucursal_719").val(data.CODIGO)
                $("#descSuc_119").val(data.DESCRIPCION)
                _enterInput('#sucursal_719');
            }
        });
    }
}


$(document).on('keydown', '.f8sucursalTabla', function (e) { // Habilitar F8
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var atributo = $(this).attr("id");
        var numero = atributo.split('')
        var idSucursal = '#sucursal' + numero[8] + '_' + numero[10]
        _ventanaDatos({
            titulo: 'Ventana De Sucursales',
            columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
            data: arraySucursal_719,
            callback_esc: function () {
                $(idSucursal).focus();
            },
            callback: function (data) {
                $(idSucursal).val(data.CODIGO.trim())
                _enterInput(idSucursal);
            }
        });
    }
});

$(document).on('keydown', '.f8sucursalTablaPop', function (e) {
    if (e.which == 119) {
        var atributo = $(this).attr("class");
        atributo = atributo.split(' ')
        atributo = atributo[1]
        _ventanaDatos({
            titulo: 'Ventana De Sucursales',
            columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
            data: arraySucursal_719,
            callback: function (data) {
                $('.' + atributo).val(data.CODIGO.trim())
                _enterInput('.' + atributo);
            }
        });
    }
});


function _ventanaOperador719(e) {
    if (e.which == 119) {
        var nomInput = $(this).attr("id");
        var numero = nomInput.split('')
        var id = numero[8]
        _ventanaDatos({
            titulo: 'Ventana De Operadores',
            columnas: ["CODIGO", "DESCRIPCION"],
            data: arrayOperador_719,
            callback_esc: function () {
                $("#operAsig" + id + "_719").focus()
            },
            callback: function (data) {
                $("#operAsig" + id + "_719").val(data.CODIGO.trim())
                _enterInput('#operAsig' + id + '_719')
            }
        });
    }
}

function _Especialistas719(e) {
    var atributo = $(this).attr("id");
    var numero = atributo.split('')
    var idEspec71A = '#espec' + numero[5] + '_719'
    var idDescp71A = '#DescEspec' + numero[5] + '_719'

    switch (e.which) {
        case 119:
            _ventanaDatos({
                titulo: 'Ventana De Especialidades',
                columnas: ["CODIGO", "NOMBRE", "COSTO"],
                data: arrayeEspecialidades_719,
                callback_esc: function () {
                    $(idEspec71A).focus()
                },
                callback: function (data) {
                    $(idEspec71A).val(data.CODIGO)
                    $(idDescp71A).val(data.NOMBRE)
                    _enterInput(idEspec71A)
                }
            });
            break;
        case 116: //f5
            $(idEspec71A).attr('disabled', 'true')
            set_Event_validar('#validarEspec' + numero[5], 'off')
            detalle_119()
            break;
        case 114: //f3
            if (idEspec71A.trim().length < 0) {
                _enterInput(idEspec)
            } else {
                $(idEspec71A).attr('disabled', 'true')
                set_Event_validar('#validarEspec' + numero[5], 'off')
                validarOperador_119(1)
            }
            break;
    }
}

// inicio json //
function datosTerceros719() {
    obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, function (data) {
        arrayTerceros719 = data.TERCEROS;
        arrayTerceros719.pop();
        datosMaestros719()
    });
}

function datosMaestros719() {
    obtenerDatosCompletos({ nombreFd: 'CTA-MAYOR' }, function (data) {
        arrayMaestros_719 = data.MAESTROS;
        arrayMaestros_719.pop();
        datosProfesionales719()
    });
}

function datosProfesionales719() {
    obtenerDatosCompletos({ nombreFd: 'PROFESIONALES' }, function (data) {
        arrayProfesionales_719 = data.ARCHPROF;
        arrayProfesionales_719.pop();
        datosDivision719()
    });
}

function datosDivision719() {
    obtenerDatosCompletos({ nombreFd: 'DIVISION' }, function (data) {
        arrayDivision_719 = data.CODIGOS;
        arrayDivision_719.pop();
        datosSucursales719();
    })
}

function datosSucursales719() {
    obtenerDatosCompletos({ nombreFd: 'SUCURSALES' }, function (data) {
        arraySucursal_719 = data.SUCURSAL;
        arraySucursal_719.pop();
        datosOperador719();
    })
}

function datosOperador719() {
    obtenerDatosCompletos({ nombreFd: 'OPERADOR' }, function (data) {
        arrayOperador_719 = data.ARCHREST;
        arrayOperador_719.pop();
        datosEspecialidad719();
    })
}

function datosEspecialidad719() {
    obtenerDatosCompletos({ nombreFd: 'ESPECIALIDAD' }, function (data) {
        arrayeEspecialidades_719 = data.ESPECIALIDADES;
        arrayeEspecialidades_719.pop();
        datosProfesiones719();
    })
}

function datosProfesiones719() {
    obtenerDatosCompletos({ nombreFd: 'PROFESION' }, function (data) {
        arrayProfesion_719 = data.PROFESION
        arrayProfesion_719.pop();
        CON850(evaluarNovedad_719);
    });
}

/// FIN DLL /// 

// NOVEDAD //
function evaluarNovedad_719(novedad) {
    $_NovedSal719 = novedad.id;
    switch (novedad.id) {

        case '7':
        case '8':
        case '9': identificacion_719();
            break;
        case 'F':
            salir_719()
            break;
    }
    $('#novedad_119').val(novedad.id + ' - ' + novedad.descripcion)
}

function salir_719() {
    limpiarInputs_719()
    arrayMaestros_719 = []
    arrayProfesionales719 = []
    arrayProfesion_719 = []
    arrayTerceros719 = []
    $_NovedSal719 = ''
    arrayDatosCompletos719 = []
    datosTablaEnvio_119 = []
    arrayOperador_719 = []
    _toggleNav()
}

function limpiarInputs_719() {
    _inputControl('reset');
    _inputControl('disabled');
    validarChecked('#Medicamentos_ser119', 'N')
    validarChecked('#procQuirur_ser119', 'N')
    validarChecked('#procDiag_ser119', 'N')
    validarChecked('#imagen_ser119', 'N')
    validarChecked('#serv_ser119', 'N')
    validarChecked('#consulter_ser119', 'N')
    validarChecked('#promPrev_ser119', 'N')
}

function identificacion_719() {

    validarInputs(
        {
            form: '#validarIdentificacion',
            orden: "1"
        },
        function () { CON850(evaluarNovedad_719); },
        function () {
            var Identificacion719 = espaciosIzq($('#identificacion_719').val(), 10)
            $('#identificacion_119').val(Identificacion719)
            var busquedaEnTerceros = arrayTerceros719.find(tercero => tercero.COD == Identificacion719)

            if (busquedaEnTerceros) {
                var busquedaEnProfe = arrayProfesionales_719.find(profesional => profesional.IDENTIFICACION == Identificacion719)

                if (busquedaEnProfe) {
                    switch ($_NovedSal719) {
                        case '7':
                            CON851('00', '00', null, 'error', 'error');
                            identificacion_719()
                            break;
                        case '8':
                        case '9':
                            $('#nombre_119').val(busquedaEnTerceros.NOMBRE.trim())
                            loader("show")
                            traerDatosCompletos_719(Identificacion719)
                            break;
                    }
                } else {
                    switch ($_NovedSal719) {
                        case '7':
                            $('#nombre_119').val(busquedaEnTerceros.NOMBRE.trim())
                            crearArrayCompleto_719(Identificacion719, busquedaEnTerceros.NOMBRE.trim())
                            break;
                        case '8':
                        case '9':
                            CON851('01', '01', null, 'error');
                            identificacion_719()
                            break;
                    }
                }
            } else {
                CON851('01', '01', null, 'error');
                identificacion_719()
            }
        }
    )

}

function crearArrayCompleto_719(identificacion, nombre) {
    var mayorRet
    if ($_USUA_GLOBAL.PUC_USU == '4' || $_USUA_GLOBAL.PUC_USU == '6') {
        mayorRet = '2436'
    } else {
        mayorRet = '2365'
    }

    arrayDatosCompletos719 = {
        'ANOFIN': '',
        'ANOINI': '',
        'ATIENDE': '',
        'CITAS': '',
        'CONTRATO': '',
        'CTARET': '',
        'DATO_ASOCI': '',
        'DESCRIP': nombre,
        'DATO_BIRAD': '',
        'DATO_DVD': '',
        'DATO_NORM': '',
        'DETALLE': '',
        'DIAFIN': '',
        'DIAINI': '',
        'DIVISION': '',
        'ESTADO': '',
        'FORMAGEN': '',
        'HRFIN': '',
        'HRINI': '',
        'IDENTIFICACION': identificacion,
        'INTMIN': '',
        'MAYORRET': mayorRet,
        'MESFIN': '',
        'MESINI': '',
        'PORCENT': '',
        'RANGO': '',
        'REGISTRO': '',
        'SOBREAGEN': '',
        'SUCURSAL': ''
    }

    $('#operAsig1_719').val('XXXX')
    $('#descAsig1_119').val('TODOS LOS OPERADORES')
    $('#operAsig2_719').val('XXXX')
    $('#descAsig2_119').val('TODOS LOS OPERADORES')
    $('#operAsig3_719').val('XXXX')
    $('#descAsig3_119').val('TODOS LOS OPERADORES')
    $('#operAsig4_719').val('XXXX')
    $('#descAsig4_119').val('TODOS LOS OPERADORES')
    $('#operAsig5_719').val('XXXX')
    $('#descAsig5_119').val('TODOS LOS OPERADORES')
    detalle_119()
}

function traerDatosCompletos_719(identificacion) {
    var datos_envio_719 = datosEnvio()
    datos_envio_719 += cerosIzq(identificacion.trim(), 10)
    datos_envio_719 += '|'

    let URL = get_url("APP/SALUD/SAL719-01.DLL");

    postData({
        datosh: datos_envio_719
    }, URL)
        .then((data) => {
            loader("hide")
            arrayDatosCompletos719 = data.PERSATI[0]
            mostrarDatosCompletos_719()
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });

}

function mostrarDatosCompletos_719() {
    // $("#nombre_119").val(arrayDatosCompletos719.DESCRIP.trim());
    arrayDatosCompletos719.DESCRIP = $('#nombre_119').val()
    $('#oper_ser119').val(arrayDatosCompletos719.OPER.trim());
    $('#fecha_ser119').val(arrayDatosCompletos719.FECHA.trim());

    $('#detalle_119').val(arrayDatosCompletos719.DETALLE.trim());
    $('#registro_ser119').val(arrayDatosCompletos719.REGISTRO.trim());

    $('#profesion_119').val(arrayDatosCompletos719.ATIENDE.trim());

    var profesion_719 = arrayProfesion_719.find(profesion => profesion.COD == arrayDatosCompletos719.ATIENDE)
    if (profesion_719) {
        $('#descriprof_119').val(profesion_719.DESCRIP);
    }


    $('#cuentaRte_119').val(arrayDatosCompletos719.CTARET.trim());
    $('#descRetenfuente_119').val(arrayDatosCompletos719.NOMCTA.trim());

    if (arrayDatosCompletos719.DIVISION.trim() != '00') {
        $('#divCups_719').val(arrayDatosCompletos719.DIVISION.trim());
        $('#descCUPS_119').val(arrayDatosCompletos719.DESCDIV.trim());
    }

    if (arrayDatosCompletos719.SUCURSAL.trim() != '00') {
        $('#sucursal_719').val(arrayDatosCompletos719.SUCURSAL.trim());
        $('#descSuc_119').val(arrayDatosCompletos719.DESCSUC.trim());
    }

    validarChecked('#Medicamentos_ser119', arrayDatosCompletos719.CL1.trim())
    validarChecked('#procQuirur_ser119', arrayDatosCompletos719.CL2.trim())
    validarChecked('#procDiag_ser119', arrayDatosCompletos719.CL3.trim())
    validarChecked('#imagen_ser119', arrayDatosCompletos719.CL4.trim())
    validarChecked('#serv_ser119', arrayDatosCompletos719.CL5.trim())
    validarChecked('#consulter_ser119', arrayDatosCompletos719.CL6.trim())
    validarChecked('#promPrev_ser119', arrayDatosCompletos719.CL7.trim())

    var contratacion_119 = arrayDatosCompletos719.CONTRATO.trim();
    switch (contratacion_119) {
        case "1": $('#contratacion_119').val('Valor Fijo');
            $('#medico_119').val('000');
            break;
        case "2":
            $('#contratacion_119').val('% Sobre Facturacion');
            $('#medico_119').val(arrayDatosCompletos719.PORCENT.trim());
            break;
    }

    var estadoAct_119 = arrayDatosCompletos719.ESTADO.trim();
    switch (estadoAct_119) {
        case "1": $('#estAct_119').val('Activo')
            break;
        case "2": $('#estAct_119').val('Inactivo')
            break;
    }
    if (arrayDatosCompletos719.ESP1.trim() == '000') {
        $('#espec1_719').val('')
    } else {
        $('#espec1_719').val(arrayDatosCompletos719.ESP1.trim());
        $('#DescEspec1_119').val(arrayDatosCompletos719.DESCESP1.trim());
    }

    if (arrayDatosCompletos719.ESP2.trim() == '000') {
        $('#espec2_719').val('')
    } else {
        $('#espec2_719').val(arrayDatosCompletos719.ESP2.trim());
        $('#DescEspec2_119').val(arrayDatosCompletos719.DESCESP2.trim());
    }

    if (arrayDatosCompletos719.ESP3.trim() == '000') {
        $('#espec3_719').val('')
    } else {
        $('#espec3_719').val(arrayDatosCompletos719.ESP3.trim());
        $('#DescEspec3_119').val(arrayDatosCompletos719.DESCESP3.trim());
    }

    if (arrayDatosCompletos719.ESP4.trim() == '000') {
        $('#espec4_719').val('')
    } else {
        $('#espec4_719').val(arrayDatosCompletos719.ESP4.trim());
        $('#DescEspec4_119').val(arrayDatosCompletos719.DESCESP4.trim());
    }

    if (arrayDatosCompletos719.ESP5.trim() == '000') {
        $('#espec5_719').val('')
    } else {
        $('#espec5_719').val(arrayDatosCompletos719.ESP5.trim());
        $('#DescEspec5_119').val(arrayDatosCompletos719.DESCESP5.trim());
    }

    if (arrayDatosCompletos719.OPERAUT.trim() == '    ') {
        $('#operAsig1_719').val('XXXX')
        $('#descAsig1_119').val('TODOS LOS OPERADORES')
    } else {
        $('#operAsig1_719').val(arrayDatosCompletos719.OPERAUT.trim());
        $('#descAsig1_119').val(search_operador_119(arrayDatosCompletos719.OPERAUT.trim()));
    }

    if (arrayDatosCompletos719.OPERCIRU.trim() == '    ') {
        $('#operAsig2_719').val('XXXX')
        $('#descAsig2_119').val('TODOS LOS OPERADORES')
    } else {
        $('#operAsig2_719').val(arrayDatosCompletos719.OPERCIRU.trim());
        $('#descAsig2_119').val(search_operador_119(arrayDatosCompletos719.OPERCIRU.trim()));
    }

    if (arrayDatosCompletos719.OPEROTR.trim() == '    ') {
        $('#operAsig3_719').val('XXXX')
        $('#descAsig3_119').val('TODOS LOS OPERADORES')
    } else {
        $('#operAsig3_719').val(arrayDatosCompletos719.OPEROTR.trim());
        $('#descAsig3_119').val(search_operador_119(arrayDatosCompletos719.OPEROTR.trim()));
    }

    if (arrayDatosCompletos719.OPERAUT4.trim() == '    ') {
        $('#operAsig4_719').val('XXXX')
        $('#descAsig4_119').val('TODOS LOS OPERADORES')
    } else {
        $('#operAsig4_719').val(arrayDatosCompletos719.OPERAUT4.trim());
        $('#descAsig4_119').val(search_operador_119(arrayDatosCompletos719.OPERAUT4.trim()));
    }

    if (arrayDatosCompletos719.OPERAUT5.trim() == '    ') {
        $('#operAsig5_719').val('XXXX')
        $('#descAsig5_119').val('TODOS LOS OPERADORES')
    } else {
        $('#operAsig5_719').val(arrayDatosCompletos719.OPERAUT5.trim());
        $('#descAsig5_119').val(search_operador_119(arrayDatosCompletos719.OPERAUT5.trim()));
    }

    $('#asigCita_ser119').val(arrayDatosCompletos719.INTMIN);
    $('#cantMaxCitas_Ser119').val(arrayDatosCompletos719.CITAS);

    $('#agendaExcep719').val(arrayDatosCompletos719.FORMAGEN)
    $('#sobreAgenda719').val(arrayDatosCompletos719.SOBREAGEN)

    var fechaDesde_119 = arrayDatosCompletos719.FECHAINI.trim();
    fechaDesde_119 += ' ' + arrayDatosCompletos719.HORAINI.trim();
    var fechaHasta_119 = arrayDatosCompletos719.FECHAFIN.trim()
    fechaHasta_119 += ' ' + arrayDatosCompletos719.HORAFIN.trim();

    if (fechaDesde_119 != "00000000 0000") {
        momentMaskFechaDesde.typedValue = fechaDesde_119
        momentMaskFechaHasta.typedValue = fechaHasta_119
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var suc1 = ('sucursal1_' + i)
        $('#' + suc1).val(arrayDatosCompletos719.TABLA[i].SUCURSAL1);
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaIngreso1_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORAING1
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaSalida1_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORARET1
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var fre1 = ('fre1_' + i)
        $('#' + fre1).val(arrayDatosCompletos719.TABLA[i].INTMINTAB1);
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var suc2 = ('sucursal2_' + i)
        $('#' + suc2).val(arrayDatosCompletos719.TABLA[i].SUCURSAL2);
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaIngreso2_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORAING2
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaSalida2_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORARET2
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var fre2 = ('fre2_' + i)
        $('#' + fre2).val(arrayDatosCompletos719.TABLA[i].INTMINTAB2);
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var suc3 = ('sucursal3_' + i)
        $('#' + suc3).val(arrayDatosCompletos719.TABLA[i].SUCURSAL3);
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaIngreso3_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORAING3
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaSalida3_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORARET3
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var fre3 = ('fre3_' + i)
        $('#' + fre3).val(arrayDatosCompletos719.TABLA[i].INTMINTAB3);
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var suc4 = ('sucursal4_' + i)
        $('#' + suc4).val(arrayDatosCompletos719.TABLA[i].SUCURSAL4);
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaIngreso4_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORAING4
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaSalida4_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORARET4
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var fre4 = ('fre4_' + i)
        $('#' + fre4).val(arrayDatosCompletos719.TABLA[i].INTMINTAB4);
    }

    loader('hide');
    switch ($_NovedSal719) {
        case '8':
            detalle_119();
            break;
        case '9':
            CON851P('54', identificacion_719, eliminarRegistro_719)
            break;
    }
}


function eliminarRegistro_719() {
    var datos_envio_719 = datosEnvio()
    datos_envio_719 += $_NovedSal719
    datos_envio_719 += '|'
    datos_envio_719 += arrayDatosCompletos719.IDENTIFICACION
    datos_envio_719 += '|'

    let URL = get_url("APP/SALUD/SAL719-03.DLL");

    postData({
        datosh: datos_envio_719
    }, URL)
        .then((data) => {
            jAlert(
                { titulo: 'SAL719-03', mensaje: data },
                volverInicio_719
            );
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}

function volverInicio_719() {
    arrayDatosCompletos719 = []
    limpiarInputs_719()
    CON850(evaluarNovedad_719);
}

function buscarMaskFrecuencia(element) {
    var retornar = false;
    for (var i in maskFrec) {
        var input = maskFrec[i].el.input
        var id = $(input).attr('id');
        if (id == element) retornar = maskFrec[i];
    }
    return retornar;
}

function buscarMaskFecha(element) {
    var retornar = false;
    for (var i in maskFechas) {
        var input = maskFechas[i].el.input
        var id = $(input).attr('id');
        if (id == element) retornar = maskFechas[i];
    }
    return retornar;
}

function buscarMaskHora(element) {
    var retornar = false;
    for (var i in maskHora) {
        var input = maskHora[i].el.input
        var id = $(input).attr('id');
        //  if (id == element) retornar = maskHora[i];
        if (id == element) retornar = i;
    }

    return retornar;
}

function detalle_119() {

    validarInputs(
        {
            form: '#validarDetalle119',
            orden: "1"
        },
        function () { identificacion_719() },
        function () {
            arrayDatosCompletos719.DETALLE = $('#detalle_119').val().trim()

            registro_119();
        }
    )
}

function registro_119() {
    validarInputs(
        {
            form: '#validarRegistro119',
            orden: "1"
        },
        function () { detalle_119() },
        function () {
            arrayDatosCompletos719.REGISTRO = $('#registro_ser119').val().trim()

            _ventanaProfesion_119();
        }
    )
}


function _ventanaProfesion_119() {
    POPUP({
        titulo: "Personal que atiende",
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        array: arrayProfesion_719,
        callback_f: registro_119,
        seleccion: arrayDatosCompletos719.ATIENDE
    }, function (data) {
        arrayDatosCompletos719.ATIENDE = data.COD
        $("#profesion_119").val(data.COD.trim())
        $("#descriprof_119").val(data.DESCRIP.trim())
        ctaRetenfuente_119();

    })
}

function ctaRetenfuente_119() {
    validarInputs(
        {
            form: '#validarCtaRetenfuente119',
            orden: "1"
        },
        function () { registro_119(); },
        function () {
            var ctaRetFuente = $("#cuentaRte_719").val().trim()
            arrayDatosCompletos719.CTARET = ctaRetFuente

            if (ctaRetFuente.length > 0) {
                var mayor_Ret = ctaRetFuente.substring(0, 4)
                arrayDatosCompletos719.MAYORRET = '2436'//SOLO PARA PRUEBAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                if (arrayDatosCompletos719.MAYORRET == mayor_Ret) {

                    var busqueda = arrayMaestros_719.find(cuenta => ((cuenta.TIPO_MAE == '4') && (cuenta.CTA_MAY + cuenta.SUB_CTA + cuenta.AUX_MAE == ctaRetFuente)))

                    if (busqueda) {
                        if (busqueda.PORCENT_RET.trim().length < 1) {
                            CON851('04', '04', null, 'error', 'error');
                            ctaRetenfuente_119()
                        } else {
                            $('#descRetenfuente_119').val(busqueda.NOMBRE_MAE.trim())
                            divisionCups_119()
                        }
                    } else {
                        CON851('01', '01', null, 'error', 'error');
                        ctaRetenfuente_119()
                    }

                } else {
                    CON851('04', '04', null, 'error', 'error');
                    ctaRetenfuente_119()
                }
            } else {
                divisionCups_119()
            }
        }
    )
}

function divisionCups_119() {
    validarInputs(
        {
            form: '#validarDivCups119',
            orden: '1'
        },
        function () {
            ctaRetenfuente_119();
        },
        function () {
            var divCups = $("#divCups_719").val().trim()
            arrayDatosCompletos719.DIVISION = divCups

            if (divCups.length > 0) {
                var busqueda = arrayDivision_719.find(division => division.COD == divCups)

                if (busqueda) {
                    $("#descDiv_119").val(busqueda.DESCRIP)
                    sucursal_119()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    divisionCups_119()
                }

            } else {
                sucursal_119();
            }
        }
    )
}

function sucursal_119() {
    validarInputs(
        {
            form: '#validarSucursal_719',
            orden: '1'
        },
        function () {
            divisionCups_119();
        },
        function () {
            var sucur = $("#sucursal_719").val().trim()
            arrayDatosCompletos719.SUCURSAL = sucur

            if (sucur.length > 0) {
                var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == sucur)

                if (busqueda) {
                    $("#descSuc_119").val(busqueda.DESCRIPCION)
                    tipoContratacion_119()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    sucursal_119()
                }
            } else {
                tipoContratacion_119();
            }
        }
    )

}

function tipoContratacion_119() {
    var arrayContratacion_719 = [
        { "COD": "1", "DESCRIP": "Valor Fijo" },
        { "COD": "2", "DESCRIP": "% Sobre Facturacion" }
    ]

    POPUP({
        array: arrayContratacion_719,
        titulo: 'Tipo De Contratacion',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: sucursal_119,
        // callback_f: () => { setTimeout(sucursal_119()), 300 },
        seleccion: arrayDatosCompletos719.CONTRATO
    }, function (data) {
        arrayDatosCompletos719.CONTRATO = data.COD
        switch (data.COD) {
            case '1':
                $('#contratacion_119').val(data.COD + '. ' + data.DESCRIP)
                $('#medico_119').val('000')
                arrayDatosCompletos719.PORCENT = '000'
                estadoAct_119()
                break;
            case '2':
                $('#contratacion_119').val(data.COD + '. ' + data.DESCRIP)
                validarPorcentMed()
                break;
        }
    })
}



function validarPorcentMed() {
    validarInputs(
        {
            form: '#validarPorcMedico',
            orden: '1'
        },
        function () {
            tipoContratacion_119();
        },
        function () {
            var medico = $('#medico_119').val().trim()
            arrayDatosCompletos719.PORCENT = medico

            if (medico > 100) {
                validarPorcentMed()
            } else if (medico == 0) {
                jAlert(
                    { titulo: 'Atencion ', mensaje: '<b>Mensaje: </b>' + 'Si el tipo de contratacion es 2 y el % asignado es 0, el sistema asume el % del grupo del cup' }, estadoAct_119);
            } else if ((medico > 0) && (medico <= 100)) {
                estadoAct_119()
            }
        }

    )
}


function estadoAct_119() {
    var arrayEstadoAct_719 = [
        { "COD": "1", "DESCRIP": "ACTIVO" },
        { "COD": "2", "DESCRIP": "INACTIVO" }
    ]
    setTimeout(() => {
        POPUP({
            array: arrayEstadoAct_719,
            titulo: 'Estado Actual',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: () => { setTimeout(tipoContratacion_119, 300) },
            seleccion: arrayDatosCompletos719.ESTADO
        }, function (data) {
            arrayDatosCompletos719.ESTADO = data.COD
            $('#estAct_119').val(data.COD + '. ' + data.DESCRIP)
            validarEspecialidad_119(1);
        })
    }, 300)
}


function search_Especialidad_119(codigo) {
    var retornar = false;
    for (var i in arrayEspecialidad_119) {
        if (arrayEspecialidad_119[i].CODIGO.trim() == codigo) {
            retornar = arrayEspecialidad_119[i].NOMBRE.trim();
            break;
        }
    }
    return retornar;
}


function validarEspecialidad_119(id) {
    validarInputs(
        {
            form: '#validarEspec' + id,
            orden: "1"
        },
        function () {
            if (id == '1') {
                detalle_119()
            } else {
                validarEspecialidad_119(parseInt(id) - 1)
            }
        },
        function () {
            var codigoEspec_119 = $('#espec' + id + '_719').val().trim();

            if (codigoEspec_119.length > 0) {
                var busqueda = arrayeEspecialidades_719.find(espec => espec.CODIGO == cerosIzq(codigoEspec_119, 3))

                if (busqueda) {
                    $('#espec' + id + '_719').val(cerosIzq(codigoEspec_119, 3))
                    $('#DescEspec' + id + '_119').val(busqueda.NOMBRE);

                    if (id == '5') {
                        validarOperador_119(1)
                    } else {
                        validarEspecialidad_119(parseInt(id) + 1)
                    }
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    validarEspecialidad_119(id)
                }
            } else {
                $('#DescEspec' + id + '_119').val('')
                switch (id) {
                    case 5:
                        validarOperador_119(1)
                        break;
                    default:
                        validarEspecialidad_119(parseInt(id) + 1)
                }
            }
        }
    )

}

function search_operador_119(codigo) {
    var retornar = false;

    if (codigo === 'XXXX') {
        retornar = 'TODOS LOS OPERADORES';
    } else {
        var busqueda = arrayOperador_719.find(operador => operador.CODIGO == cerosIzq(codigo, 4))

        if (busqueda) {
            retornar = busqueda.DESCRIPCION
        } else {
            retornar = ''
        }
    }
    return retornar;
}

function validarOperador_119(id) {
    validarInputs(
        {
            form: '#validarOperAsig' + id,
            orden: "1"
        },
        function () {
            if (id == '1') {
                validarEspecialidad_119(5)
            } else {
                validarOperador_119(parseInt(id) - 1)
            }
        },
        function () {
            var codigoOper_119 = $('#operAsig' + id + '_719').val().trim().toUpperCase()

            var busqueda = arrayOperador_719.find(operador => operador.CODIGO == cerosIzq(codigoOper_119, 4))
            if (busqueda) {
                $('#operAsig' + id + '_719').val(cerosIzq(codigoOper_119, 4))
                $('#descAsig' + id + '_119').val(busqueda.DESCRIPCION);

                if (id == '5') {
                    validarFrecuencia_119()
                } else {
                    validarOperador_119(parseInt(id) + 1)
                }
            } else if (codigoOper_119 == 'XXXX') {
                $('#descAsig' + id + '_119').val('TODOS LOS OPERADORES');

                if (id == '5') {
                    validarFrecuencia_119()
                } else {
                    validarOperador_119(parseInt(id) + 1)
                }
            } else {
                CON851('01', '01', null, 'error', 'error');
                validarOperador_119(id)
            }
        }
    )
}

function validarFrecuencia_119() {
    validarInputs(
        {
            form: '#validarAsigCitas',
            orden: '1'
        },
        function () {
            validarOperador_119(5);
        },
        function () {
            var valorIntervalo = cerosIzq($('#asigCita_ser119').val(), 2)
            arrayDatosCompletos719.INTMIN = valorIntervalo

            switch (valorIntervalo) {
                case '00':
                case '01':
                case '02':
                case '05':
                case '07':
                case '10':
                case '12':
                case '15':
                case '20':
                case '25':
                case '30':
                case '40':
                case '60':
                    validarCantCitas_119()
                    // fechaActual119 = fechaActualGlobal() PENDIENTE
                    break;
                default:
                    CON851('03', '03', null, 'error');
                    validarFrecuencia_119()
                    break;
            }
        }
    )
}

function validarCantCitas_119() {
    validarInputs(
        {
            form: '#maxCitas_719',
            orden: '1'
        },
        function () {
            validarFrecuencia_119();
        },
        function () {
            var cantCitas = cerosIzq($('#cantMaxCitas_Ser119').val(), 2)
            arrayDatosCompletos719.CITAS = cantCitas

            if (arrayDatosCompletos719.INTMIN == '00') {
                arrayDatosCompletos719.FORMAGEN = 'N'
                $('#agendaExcep719').val('NO')
                arrayDatosCompletos719.SOBREAGEN = 'S'
                $('#sobreAgenda719').val('SI')
                sobreAgendar_719();
            } else {
                forma_Agendamiento_719()
            }

        }
    )
}

function forma_Agendamiento_719() {
    var arrayForma_agend = [
        { "COD": "S", "DESCRIP": "SI" },
        { "COD": "N", "DESCRIP": "NO" }
    ]

    POPUP({
        array: arrayForma_agend,
        titulo: 'Usar Agendamiento Por Excepciones?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: () => { validarFrecuencia_119() },
        seleccion: arrayDatosCompletos719.FORMAGEN,
        teclaAlterna: true
    }, function (data) {
        arrayDatosCompletos719.FORMAGEN = data.COD
        $('#agendaExcep719').val(data.DESCRIP)
        switch (data.COD) {
            case 'S':
                validarPopup_119()
                break;
            case 'N':
                sobreAgendar_719()
                break;
        }
    })
}

function sobreAgendar_719() {
    var arraySobre_agend = [
        { "COD": "S", "DESCRIP": "SI" },
        { "COD": "N", "DESCRIP": "NO" }
    ]

    setTimeout(() => {
        POPUP({
            array: arraySobre_agend,
            titulo: 'Permitir sobre agendar?',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: () => { setTimeout(forma_Agendamiento_719, 300) },
            seleccion: arrayDatosCompletos719.SOBREAGEN,
            teclaAlterna: true
        }, function (data) {
            arrayDatosCompletos719.SOBREAGEN = data.COD
            $('#sobreAgenda719').val(data.DESCRIP)
            validarDeshabilitarDesde_719()
        })
    }, 300)
}

function validarPopup_119() {
    var fuente = $('#popUpHorarioAtencion_119').html();
    var dialogo = bootbox.dialog({
        title: "Fecha y Horario De Atencion",
        message: fuente,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue hidden",
                callback: function () {

                }
            }
        },
    });


    dialogo.init(function () {
        // Inicia validaci�n pop-up

        // var fechaPopUp = $('.fechaPopUp_119');
        $(".fechaPopUp_119").each(function (index, element) {
            var momentFormat = 'YYYY/MM/DD';
            var momentMask = IMask(element, {
                mask: Date,
                pattern: momentFormat,
                lazy: true,
                min: new Date(2009, 0, 1),
                max: new Date(2024, 0, 1),

                format: function (date) {
                    return moment(date).format(momentFormat);
                },
                parse: function (str) {
                    $_fechaPopUp_119 = str;
                    return moment(str, momentFormat);
                },

                blocks: {
                    YYYY: {
                        mask: IMask.MaskedRange,
                        from: 2009,
                        to: 2024
                    },
                    MM: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 12
                    },
                    DD: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 31
                    }
                }

            })
            maskFechaPop.push(momentMask);
        })


        $(".imaskHoraPop").each(function (index, element) {
            var blocksMaskHora = IMask(element, {
                mask: 'HH:MM',
                lazy: true,  // make placeholder always visible


                blocks: {
                    HH: {
                        mask: IMask.MaskedRange,
                        from: 0,
                        to: 23,
                    },
                    MM: {
                        mask: IMask.MaskedRange,
                        from: 0,
                        to: 59,
                    }
                }
            });
            maskHoraPop.push(blocksMaskHora);
        })

        $(".imaskFrecPop").each(function (index, element) {
            var blocksMaskFrec = IMask(element, {
                mask: 'VL',
                lazy: true,  // make placeholder always visible

                blocks: {
                    VL: {
                        mask: IMask.MaskedRange,
                        from: 00,
                        to: 60
                    }
                }
            })
            maskFrecPop.push(blocksMaskFrec);
        });
        setTimeout(function () { jsonHorarioProfesionales() }, 500);
    })
}

function jsonHorarioProfesionales() {
    loader('show')
    LLAMADO_DLL({
        dato: [$identificacion_global],
        callback: on_jsonHorarioProfesionales,
        nombredll: 'SER819H',
        carpeta: 'salud'
    })
}

function on_jsonHorarioProfesionales(data) {
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {

        var rutaJson = urlJson('JSC-HORAR-');
        SolicitarDatos(
            null,
            function (data) {
                arrayHorProf_119 = data.AGENDA
                arrayHorProf_119.pop()
                var arrayEliminar = [];
                arrayEliminar.push('JSC-HORAR-' + localStorage.getItem('key_sesion'))
                _eliminarJson(arrayEliminar, on_eliminarJsonHorar_119);
            },
            rutaJson
        );
    } else {
        loader('hide');
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}

function on_eliminarJsonHorar_119() {
    loader('hide');
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        modificarArrayHorario_119()
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}


function modificarArrayHorario_119() {
    arrayHorProfMoment_119 = arrayHorProf_119
    for (var i in arrayHorProfMoment_119) {
        var fechaIni = arrayHorProfMoment_119[i].FECHA
        var fechaMoment = fechaIni.format("dddd, MMMM D ,YYYY")
        arrayHorProfMoment_119[i].FECHA = fechaMoment
    }
    validarNovedadPopUp_119()
}

function validarNovedadPopUp_119() {
    validarInputs(
        {
            form: '#NovedadPopUp',
            orden: 1
        },
        function () {
            $('[data-bb-handler="main"]').click()
            validarMaxCitas_119();
        },
        function () {
            var novPopUp1 = $('.inputNovedadPopUp_119');
            var $novPopUp = $(novPopUp1[1]).val();
            var descripNov = $('.descripNovedadPopUp_119');

            switch ($novPopUp) {
                case '7':
                    $(descripNov[1]).val('Nuevo')
                    validarFechaAtencion_119($novPopUp);
                    break;
                case '8':
                    $(descripNov[1]).val('Cambio')
                    validarFechaAtencion_119($novPopUp);
                    break;
                case '9':
                    $(descripNov[1]).val('Retiro')
                    validarFechaAtencion_119($novPopUp);
                    break;
                case 'f':
                case 'F':
                    $('[data-bb-handler="main"]').click()
                    bootbox.hideAll()
                    validarMaxCitas_119();
                    break;
                default: validarNovedadPopUp_119()
                    break;
            }

        }
    )
}

// function buscarMaskFechaPopUp(element) {
//     var retornar = false;
//     for (var i in maskFechas) {
//         var input = maskFechas[i].el.input
//         var clase = $(input).attr('class');
//         if (clase == element) retornar = maskFechas[i];
//     }

//     return retornar;
// }

function buscarMaskFechaPopUp(element) {
    var retornar = false;
    for (var i in maskFechaPop) {
        var input = maskFechaPop[i].el.input
        var clase = $(input).hasClass(element);
        if (clase) retornar = maskFechaPop[i];
    }

    return retornar;
}

function buscarMaskHoraPopUp(element) {
    var retornar = false;
    for (var i in maskHoraPop) {
        var input = maskHoraPop[i].el.input
        var clase = $(input).hasClass(element);
        if (clase) retornar = maskHoraPop[i];
    }

    return retornar;
}

function buscarMaskFrecuenciaPopUp(element) {
    var retornar = false;
    for (var i in maskFrecPop) {
        var input = maskFrecPop[i].el.input
        var clase = $(input).hasClass(element);
        if (clase) retornar = maskFrecPop[i];
    }

    return retornar;
}

function validarFechaAtencion_119(novedad) {
    validarInputs(
        {
            form: '#fechaPopUp',
            orden: 1
        },
        function () {
            validarNovedadPopUp_119();
        },
        function () {
            // arrayHorProf_119.push('190806')
            var idFechaMoment = $('.fechaMomentPopUp_119')
            var idDiaMmoment = $('.diaMomentPopUp_119')


            var fechaMoment = parseInt(moment($_fechaPopUp_119).format("YYYYMMDD"))
            var fechaActualPopUp = moment(fechaActual119).format("YYYYMMDD")

            if (fechaMoment < fechaActualPopUp) {
                CON851('37', '37', null, 'error', 'error');
                validarFechaAtencion_119(novedad)
            } else {
                var buscarHorario = moment(fechaMoment).format("YYMMDD")
                var busquedaHorario = search_fechaPopUp_119(buscarHorario)

                var fechaConDia = moment(fechaActual119).format("dddd, MMMM D ,YYYY")
                var diaSemana = moment(fechaActual119).format("d")

                $(idFechaMoment[1]).val(fechaConDia)
                $(idDiaMmoment[1]).val(diaSemana)

                var festivo = buscarFestivo(fechaMoment.toString())

                if (festivo == undefined) {
                    switch (novedad) {
                        case '7':
                            if (!busquedaHorario) {
                                observacionesPopUp_119()
                            } else {
                                CON851('00', '00', null, 'error', 'error');
                                validarFechaAtencion_119(novedad)
                            }
                            break;
                        case '8':
                            if (!busquedaHorario) {
                                CON851('01', '01', null, 'error', 'error');
                                validarFechaAtencion_119(novedad)
                            } else {
                                mostrarDatosPopUp_119(busquedaHorario)
                                observacionesPopUp_119()
                            }
                            break;
                        case '9':
                            if (!busquedaHorario) {
                                CON851('01', '01', null, 'error', 'error');
                                validarFechaAtencion_119(novedad)
                            } else {
                                mostrarDatosPopUp_119(busquedaHorario)
                                CON851P('01', validarNovedadPopUp_119, guardarPopUp_119, novedad)
                            }
                            break;

                    }
                } else {
                    CON851('9Q', '9Q', null, 'error', 'error');
                    jAlert(
                        { titulo: 'Atencion!,Dato fuera del horario establecido ', mensaje: fechaConDia + '           ' + '<b>Festivo: </b>' + festivo });
                    validarFechaAtencion_119()

                }
            }
        }
    )
}

function search_fechaPopUp_119(fecha) {
    var retornar = false;

    for (var i in arrayHorProf_119) {
        if (arrayHorProf_119[i].trim() == fecha) {
            retornar = arrayHorProf_119[i];
            break;
        }
    }
    return retornar;

}

function mostrarDatosPopUp_119(data) {
    var observaciones = $('.observacionesPopUp_119')
    $(observaciones[1]).val(data.OBSERVACION.trim())

    var sucur1 = $('.sucurPop1')
    $(sucur1[1]).val(data.SUCUR_UNO.trim())

    var ingreso1 = $('.ingPop1')
    $(ingreso1[1]).val(data.HORA_INGRESO1.trim())

    var salida1 = $('.salPop1')
    $(salida1[1]).val(data.HORA_SALIDA1.trim())

    var fre1 = $('.frePop1')
    $(fre1[1]).val(data.FRECU_UNO.trim())

    var sucur2 = $('.sucurPop2')
    $(sucur2[1]).val(data.SUCUR_DOS.trim())

    var ingreso2 = $('.ingPop2')
    $(ingreso2[1]).val(data.HORA_INGRESO2.trim())

    var salida2 = $('.salPop2')
    $(salida2[1]).val(data.HORA_SALIDA2.trim())

    var fre2 = $('.frePop2')
    $(fre2[1]).val(data.FRECU_DOS.trim())
}

function observacionesPopUp_119() {
    validarInputs(
        {
            form: '#observPopUp_119',
            orden: 1
        },
        function () {
            validarFechaAtencion_119();
        },
        function () {
            valPopUpEntraSalida_119(1)
        }
    )
}



function valPopUpEntraSalida_119(a) {
    validarInputs(
        {
            form: '#valTablaPopUp_' + a,
            orden: '1'
        },
        function () {
            if (a == '1') {
                observacionesPopUp_119(2)
            } else {
                valPopUpEntraSalida_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)

            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = $('.sucurPop' + secuencia)
                    var inputSuc = $(nomInputSuc[1]).val()

                    var busqueda = search_Sucursal_119(inputSuc)

                    if (inputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            valPopUpEntraSalida_119(a)
                        } else {
                            valPopUpEntraSalida_119(parseInt(a) + 1)
                        }
                    } else {
                        CON851P('01', valPopUpEntraSalida_119, guardarPopUp_119, a)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var claseEntra1 = buscarMaskHoraPopUp('ingPop' + secuencia)

                    var entra1 = claseEntra1.unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            valPopUpEntraSalida_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'ingPop' + (parseInt(secuencia) - 1)
                            var saleAnterior = buscarMaskHoraPopUp(idAnt)
                            var saleAnt = maskHoraPop[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                valPopUpEntraSalida_119(a)
                            } else {
                                valPopUpEntraSalida_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        valPopUpEntraSalida_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var claseEntra2 = buscarMaskHoraPopUp('ingPop' + secuencia)

                    var entra2 = claseEntra2.unmaskedValue

                    var claseSale = buscarMaskHoraPopUp('salPop' + secuencia)
                    var sale = claseSale.unmaskedValue

                    if (sale < entra2) {
                        valPopUpEntraSalida_119(a)
                    } else {
                        valPopUpEntraSalida_119(parseInt(a) + 1)
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var claseFrec = buscarMaskFrecuenciaPopUp('frePop' + secuencia)
                    var valMask = claseFrec.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            valPopUpEntraSalida_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                CON851P('01', valPopUpEntraSalida_119(a), guardarPopUp_119())
                            } else {
                                valPopUpEntraSalida_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function guardarPopUp_119() {
    loader('show')
    var Fecha = moment($_fechaPopUp_119).format("YYMMDD")
    var observ = $('.observacionesPopUp_119')
    var observacion = espaciosDer($(observ[1]).val(), 50)

    var sucur1 = $('.sucurPop1')
    var sucursal1 = espaciosDer($(sucur1[1]).val(), 2)

    var horaIng1 = $('.ingPop1')
    var horaIngreso1 = cerosDer($(horaIng1[1]).val(), 4)

    var horasal1 = $('.salPop1')
    var horaSalida1 = cerosDer($(horasal1[1]).val(), 4)

    var fre1 = $('.frePop1')
    var Frecuencia1 = espaciosDer($(fre1[1]).val(), 2)

    var sucur2 = $('.sucurPop2')
    var sucursal2 = espaciosDer($(sucur2[1]).val(), 2)

    var horaIng2 = $('.ingPop2')
    var horaIngreso2 = cerosDer($(horaIng2[1]).val(), 4)

    var horasal2 = $('.salPop2')
    var horaSalida2 = cerosDer($(horasal2[1]).val(), 4)

    var fre2 = $('.frePop2')
    var Frecuencia2 = espaciosDer($(fre2[1]).val(), 2)

    if ($novPopUp == 7 || 8) {
        LLAMADO_DLL({
            dato: [$novPopUp, $identificacion_global, Fecha, observacion, horaIngreso1, horaSalida1, Frecuencia1, horaIngreso2, horaSalida2, Frecuencia2],
            callback: on_jsonHorarioProfesionales,
            nombredll: 'SAL719-02',
            carpeta: 'salud'
        })
    } else if ($novPopUp == 9) {
        LLAMADO_DLL({
            dato: [$novPopUp, $identificacion_global, Fecha],
            callback: verificarGuardadoPopUp,
            nombredll: 'SAL719-02',
            carpeta: 'salud'
        })
    }
}

function verificarGuardadoPopUp(data) {
    loader('hide');
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        switch (parseInt($novPopUp)) {
            case 7:
                mensaje = "Creado Correctamente"
                break;
            case 8:
                mensaje = "Modificado correctamente"
                break;
            case 9:
                mensaje = "Eliminado correctamente"
                break;
        }
        jAlert({ titulo: 'Notificacion', mensaje: mensaje })
        validarNovedadPopUp_119()
    } else {
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}

function on_eliminarJsonHorar_119() {
    loader('hide');
    var rdll = data.split('|');
    if (rdll[0].trim() == '00') {
        modificarArrayHorario_119()
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function validarDeshabilitarDesde_719() {
    validarInputs(
        {
            form: '#validarDeshabilitarDesde_719',
            orden: "1"
        },
        function () { validarCantCitas_119(); },
        function () {
            var fechaDig = $('#desAgenDesde_ser119').val()

            if (fechaDig.trim().length < 1) {
                $('#desAgenDesde_ser119').val('')
                $('#desAgenHasta_ser119').val('')
                validarPopUpRango_119()
            } else {
                var fechaDeshabDesde = parseInt(moment($_fechaDeshabDesde_119).format("YYYYMMDDHHmm"))
                var fechaActual = moment().format("YYYYMMDDHHmm")
                if (fechaDeshabDesde < fechaActual) {
                    CON851('37', '37', null, 'error', 'error');
                    validarDeshabilitarDesde_719()
                } else {
                    validarDeshabilitarHasta_719();
                }
            }
        }
    )
}

function validarDeshabilitarHasta_719() {
    validarInputs(
        {
            form: '#validarDeshabilitarHasta_719',
            orden: "1"
        },
        function () {
            validarDeshabilitarDesde_719();
        },
        function () {
            if ($_fechaDeshabHasta_119 <= $_fechaDeshabDesde_119) {
                CON851('37', '37', null, 'error', 'error');
                validarDeshabilitarHasta_719()
            } else {
                validarPopUpRango_119()
            }

        }
    )
}

function validarPopUpRango_119() {
    if ($_USUA_GLOBAL[0].NIT == '0830092718' || $_USUA_GLOBAL[0].NIT == '0830092719') {
        popUpRango_119()
    } else {
        arrayDatosCompletos719.RANGO = '00'
        validar_Confirmar_119()
    }
}

function popUpRango_119() {
    bootbox.prompt({
        size: "small",
        title: "Rango de bloqueo",
        maxlength: 2,
        callback: function (result) {
            switch (result) {
                case result > 15:
                    CON851('03', '03', null, 'error', 'error');
                    popUpRango_119()
                    break;
                case null:
                    popUpRango_119()
                    break;
                default:
                    arrayDatosCompletos719.RANGO = cerosIzq(result, 2)
                    validar_Confirmar_119()
                    break;
            }
        }
    });
}

function validar_Confirmar_119() {
    $val_Tabla_119 = '  '
    if ($('#agenExcep_ser119').prop('checked') || ($('#asigCita_ser119').val().length == 0)) {
        $val_Tabla_119 = 'NO'
        guardarDatosCompletos_119()
    } else {
        $val_Tabla_119 = 'SI'
        validarLunes_119(1)
    }
}


function validarFrecuenciaTabla_119(valor) {
    var retornar = false
    switch (parseInt(valor)) {
        case 00:
        case 01:
        case 05:
        case 07:
        case 10:
        case 12:
        case 15:
        case 20:
        case 25:
        case 30:
        case 40:
        case 60:
            retornar = true
            break;
    }
    return retornar
}

function encontrarGrupo_119(a) {
    var retornar = false
    switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
            retornar = 1;
            break;
        case 5:
        case 6:
        case 7:
        case 8:
            retornar = 2;
            break;
        case 9:
        case 10:
        case 11:
        case 12:
            retornar = 3;
            break;
        case 13:
        case 14:
        case 15:
        case 16:
            retornar = 4;
            break;
    }
    return retornar;
}



function validarLunes_119(a) {
    validarInputs(
        {
            form: '#valTablaLunes_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    default:
                        validarLunes_119(a)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarDeshabilitarDesde_719()
            } else {
                validarLunes_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a);
            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = $('#sucursal' + secuencia + '_0').val()
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarLunes_119(a)
                        } else {
                            validarLunes_119(parseInt(a) + 1)
                        }
                    } else {
                        validarMartes_119(1)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_0')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarLunes_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_0'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                validarLunes_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarLunes_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarLunes_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_0')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_0')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale < entra2) {
                        validarLunes_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                var indexSig = buscarMaskFrecuencia('fre' + secuencia + '_0')
                                var valMaskSig = indexSig.unmaskedValue
                                if ((arrayDatosCompletos719.INTMIN != '00') && (valMaskSig == '')) {
                                    $('#fre' + secuencia + '_0').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarLunes_119(siguiente)
                                break;
                            default:
                                validarLunes_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_0')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarLunes_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarMartes_119(1)
                            } else {
                                validarLunes_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function validarMartes_119(a) {
    validarInputs(
        {
            form: '#valTablaMartes_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    default:
                        validarMartes_119(a)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarLunes_119(1)
            } else {
                validarMartes_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)

            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = $('#sucursal' + secuencia + '_1').val()
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarMartes_119(a)
                        } else {
                            validarMartes_119(parseInt(a) + 1)
                        }
                    } else {
                        validarMiercoles_119(1)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_1')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarMartes_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_1'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                validarMartes_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarMartes_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarMartes_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_1')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_1')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale < entra2) {
                        validarMartes_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                var indexSig = buscarMaskFrecuencia('fre' + secuencia + '_1')
                                var valMaskSig = indexSig.unmaskedValue
                                if ((arrayDatosCompletos719.INTMIN != '00') && (valMaskSig == '')) {
                                    $('#fre' + secuencia + '_1').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarMartes_119(siguiente)
                                break;
                            default:
                                validarMartes_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_1')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarMartes_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarMiercoles_119(1)
                            } else {
                                validarMartes_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function validarMiercoles_119(a) {
    validarInputs(
        {
            form: '#valTablaMiercoles_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    default:
                        validarMiercoles_119(a)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarMartes_119(1)
            } else {
                validarMiercoles_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)
            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = $('#sucursal' + secuencia + '_2').val()
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarMiercoles_119(a)
                        } else {
                            validarMiercoles_119(parseInt(a) + 1)
                        }
                    } else {
                        validarJueves_119(1)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_2')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarMiercoles_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_2'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                validarMiercoles_119(a)
                            } else {
                                console.log('entra')
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarMiercoles_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarMiercoles_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_2')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_2')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale < entra2) {
                        validarMiercoles_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                var indexSig = buscarMaskFrecuencia('fre' + secuencia + '_2')
                                var valMaskSig = indexSig.unmaskedValue
                                if ((arrayDatosCompletos719.INTMIN != '00') && (valMaskSig == '')) {
                                    $('#fre' + secuencia + '_2').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarMiercoles_119(siguiente)
                                break;
                            default:
                                validarMiercoles_119(siguiente)
                                break;
                        }
                    }
                    break;

                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_2')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarMiercoles_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarJueves_119(1)
                            } else {
                                validarMiercoles_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function validarJueves_119(a) {
    validarInputs(
        {
            form: '#valTablaJueves_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    default:
                        validarJueves_119(a)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarMiercoles_119(1)
            } else {
                validarJueves_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)

            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = $('#sucursal' + secuencia + '_3').val()
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarJueves_119(a)
                        } else {
                            validarJueves_119(parseInt(a) + 1)
                        }
                    } else {
                        validarViernes_119(1)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_3')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarJueves_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_3'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                validarJueves_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarJueves_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarJueves_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_3')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_3')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale < entra2) {
                        validarJueves_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                var indexSig = buscarMaskFrecuencia('fre' + secuencia + '_3')
                                var valMaskSig = indexSig.unmaskedValue
                                if ((arrayDatosCompletos719.INTMIN != '00') && (valMaskSig == '')) {
                                    $('#fre' + secuencia + '_3').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarJueves_119(siguiente)
                                break;
                            default:
                                validarJueves_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_3')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarJueves_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarViernes_119(1)
                            } else {
                                validarJueves_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function validarViernes_119(a) {
    validarInputs(
        {
            form: '#valTablaViernes_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    default:
                        validarViernes_119(a)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarJueves_119(1)
            } else {
                validarViernes_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)

            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = $('#sucursal' + secuencia + '_4').val()
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarViernes_119(a)
                        } else {
                            validarViernes_119(parseInt(a) + 1)
                        }
                    } else {
                        validarSabado_119(1)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_4')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarViernes_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_4'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                validarViernes_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarViernes_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarViernes_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_4')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_4')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale < entra2) {
                        validarViernes_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                var indexSig = buscarMaskFrecuencia('fre' + secuencia + '_4')
                                var valMaskSig = indexSig.unmaskedValue
                                if ((arrayDatosCompletos719.INTMIN != '00') && (valMaskSig == '')) {
                                    $('#fre' + secuencia + '_4').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarViernes_119(siguiente)
                                break;
                            default:
                                validarViernes_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_4')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarViernes_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarSabado_119(1)
                            } else {
                                validarViernes_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function validarSabado_119(a) {
    validarInputs(
        {
            form: '#valTablaSabado_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    default:
                        validarSabado_119(a)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarViernes_119(1)
            } else {
                validarSabado_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)

            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = $('#sucursal' + secuencia + '_5').val()
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarSabado_119(a)
                        } else {
                            validarSabado_119(parseInt(a) + 1)
                        }
                    } else {
                        validarDomingo_119(1)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_5')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarSabado_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_5'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                validarSabado_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarSabado_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarSabado_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_5')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_5')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale < entra2) {
                        validarSabado_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                var indexSig = buscarMaskFrecuencia('fre' + secuencia + '_5')
                                var valMaskSig = indexSig.unmaskedValue
                                if ((arrayDatosCompletos719.INTMIN != '00') && (valMaskSig == '')) {
                                    $('#fre' + secuencia + '_5').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarSabado_119(siguiente)
                                break;
                            default:
                                validarSabado_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_5')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarSabado_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarDomingo_119(1)
                            } else {
                                validarSabado_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function validarDomingo_119(a) {
    validarInputs(
        {
            form: '#valTablaDomingo_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    default:
                        validarDomingo_119(a)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarSabado_119(1)
            } else {
                validarDomingo_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)

            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = $('#sucursal' + secuencia + '_6').val()
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarDomingo_119(a)
                        } else {
                            validarDomingo_119(parseInt(a) + 1)
                        }
                    } else {
                        validarCerrarHorario()
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_6')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarDomingo_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_6'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                validarDomingo_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarDomingo_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarDomingo_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_6')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_6')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale < entra2) {
                        validarDomingo_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                var indexSig = buscarMaskFrecuencia('fre' + secuencia + '_6')
                                var valMaskSig = indexSig.unmaskedValue
                                if ((arrayDatosCompletos719.INTMIN != '00') && (valMaskSig == '')) {
                                    $('#fre' + secuencia + '_6').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarDomingo_119(siguiente)
                                break;
                            default:
                                validarDomingo_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_6')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarDomingo_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarCerrarHorario()
                            } else {
                                validarDomingo_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}


function validarCerrarHorario() {
    if ($_USUA_GLOBAL[0].NIT == '0830092718' || $_USUA_GLOBAL[0].NIT == '0830092719') {
        popUpMensajeImpresion_119()
    } else {
        arrayDatosCompletos719.DATO_DVD = 'N'
        arrayDatosCompletos719.DATO_BIRAD = 'N'
        arrayDatosCompletos719.DATO_NORM = 'N'
        arrayDatosCompletos719.DATO_ASOCI = 'N'
        bajarDatosTabla_119()
    }
}


function popUpMensajeImpresion_119() {
    if ($_NovedSal719 == '7') {
        validarChecked('#impDVD_119', 'N')
        validarChecked('#impMenBir_119', 'N')
        validarChecked('#impMenNorm_119', 'N')
        validarChecked('#asocRad_119', 'N')
    } else {
        validarChecked('#impDVD_119', arrayDatosCompletos719.DATO_DVD)
        validarChecked('#impMenBir_119', arrayDatosCompletos719.DATO_BIRAD)
        validarChecked('#impMenNorm_119', arrayDatosCompletos719.DATO_NORM)
        validarChecked('#asocRad_119', arrayDatosCompletos719.DATO_ASOCI)
    }
    var fuente = $('#popUpMensajeImpresion_119').html();
    var configimpre = bootbox.dialog({
        title: "Config. Impresion Resultado",
        message: fuente,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue",
                callback: function () {
                    if ($("#impDVD_119").prop('checked')) { arrayDatosCompletos719.DATO_DVD = 'S' } else { arrayDatosCompletos719.DATO_DVD = 'N' }
                    if ($("#impMenBir_119").prop('checked')) { arrayDatosCompletos719.DATO_BIRAD = 'S' } else { arrayDatosCompletos719.DATO_BIRAD = 'N' }
                    if ($("#impMenNorm_119").prop('checked')) { arrayDatosCompletos719.DATO_NORM = 'S' } else { arrayDatosCompletos719.DATO_NORM = 'N' }
                    if ($("#asocRad_119").prop('checked')) { arrayDatosCompletos719.DATO_ASOCI = 'S' } else { arrayDatosCompletos719.DATO_ASOCI = 'N' }
                    bajarDatosTabla_119()
                }
            }
        },
    });
}

function buscarSucursalTabla(grupo, posicion) {
    var retornar = false
    var nombreDato = '#sucursal' + grupo + '_' + posicion
    retornar = espaciosDer($(nombreDato).val(), 2)
    return retornar
}


function buscarHoraTabla_119(tipo, grupo, posicion) {
    var nombreDato;
    if (tipo == 'ing') {
        nombreDato = 'horaIngreso' + grupo + '_' + posicion
    } else if (tipo == 'sal') {
        nombreDato = 'horaSalida' + grupo + '_' + posicion
    }

    var retornar = false;
    for (var i in maskHora) {
        var input = maskHora[i].el.input
        var id = $(input).attr('id');
        if (id == nombreDato) retornar = cerosIzq(maskHora[i].unmaskedValue, 4);
    }

    return retornar;
}

function buscarFrecuenciaTabla_119(grupo, posicion) {
    var nombreDato = 'fre' + grupo + '_' + posicion
    var retornar = false;

    for (var i in maskFrec) {
        var input = maskFrec[i].el.input
        var id = $(input).attr('id');
        if (id == nombreDato) retornar = cerosIzq(maskFrec[i].unmaskedValue, 2);
    }

    return retornar;
}

function pushArrayTabla(arrayLlega, posicion) {

    let suc1 = buscarSucursalTabla('1', posicion)

    let ing1 = buscarHoraTabla_119('ing', '1', posicion)

    let ret1 = buscarHoraTabla_119('sal', '1', posicion)

    let frec1 = buscarFrecuenciaTabla_119('1', posicion)

    let suc2 = buscarSucursalTabla('2', posicion)
    let ing2 = buscarHoraTabla_119('ing', '2', posicion)
    let ret2 = buscarHoraTabla_119('sal', '2', posicion)
    let frec2 = buscarFrecuenciaTabla_119('2', posicion)

    let suc3 = buscarSucursalTabla('3', posicion)
    let ing3 = buscarHoraTabla_119('ing', '3', posicion)
    let ret3 = buscarHoraTabla_119('sal', '3', posicion)
    let frec3 = buscarFrecuenciaTabla_119('3', posicion)

    let suc4 = buscarSucursalTabla('4', posicion)
    let ing4 = buscarHoraTabla_119('ing', '4', posicion)
    let ret4 = buscarHoraTabla_119('sal', '4', posicion)
    let frec4 = buscarFrecuenciaTabla_119('4', posicion)

    arrayLlega.push({
        sucursal1: suc1,
        horaIng1: ing1,
        horaRet1: ret1,
        fre1: frec1,
        sucursal2: suc2,
        horaIng2: ing2,
        horaRet2: ret2,
        fre2: frec2,
        sucursal3: suc3,
        horaIng3: ing3,
        horaRet3: ret3,
        fre3: frec3,
        sucursal4: suc4,
        horaIng4: ing4,
        horaRet4: ret4,
        fre4: frec4,
    })
}


function bajarDatosTabla_119() {

    datosTablaEnvio_119 = []
    pushArrayTabla(tablaLunesEnvio, 0)
    datosTablaEnvio_119.push(tablaLunesEnvio)

    pushArrayTabla(tablaMartesEnvio, 1)
    datosTablaEnvio_119.push(tablaMartesEnvio)

    pushArrayTabla(tablaMiercolesEnvio, 2)
    datosTablaEnvio_119.push(tablaMiercolesEnvio)

    pushArrayTabla(tablaJuevesEnvio, 3)
    datosTablaEnvio_119.push(tablaJuevesEnvio)

    pushArrayTabla(tablaViernesEnvio, 4)
    datosTablaEnvio_119.push(tablaViernesEnvio)

    pushArrayTabla(tablaSabadoEnvio, 5)
    datosTablaEnvio_119.push(tablaSabadoEnvio)

    pushArrayTabla(tablaDomingoEnvio, 6)
    datosTablaEnvio_119.push(tablaDomingoEnvio)

    guardarDatosCompletos_119()

}

function guardarDatosCompletos_119() {
    CON851P('01', validarDeshabilitarDesde_719, temporalHorarios)
}

function temporalHorarios() {
    let URL = get_url("frameworks/scripts/php/_datosTabla_SAL719.php");
    $.ajax({
        data: { array: datosTablaEnvio_119, sesion: localStorage.Sesion },
        type: 'POST',
        async: false,
        url: URL
    }).done(function (data) {
        var res = data.split('|');
        if (res[0].trim() == '00') {
            enviarDatosCompletos_119();
        } else {
            CON852(res[0], res[1], res[2]);
        }

    })

}

function enviarDatosCompletos_119() {
    var identificacion = cerosIzq(arrayDatosCompletos719.IDENTIFICACION.trim(), 10)
    var nombre = espaciosDer(arrayDatosCompletos719.DESCRIP, 30)
    var detalle = espaciosDer(arrayDatosCompletos719.DETALLE, 30)
    var registro = espaciosDer(arrayDatosCompletos719.REGISTRO, 10)
    var atiende = arrayDatosCompletos719.ATIENDE
    var ctaRet = cerosIzq(arrayDatosCompletos719.CTARET, 12)
    var divCup = cerosIzq(arrayDatosCompletos719.DIVISION, 2)
    var sucursal = cerosIzq(arrayDatosCompletos719.SUCURSAL, 2)
    var contrato = cerosIzq(arrayDatosCompletos719.CONTRATO, 1)
    var porcenMed = cerosIzq(arrayDatosCompletos719.PORCENT, 3)
    var estado = cerosIzq(arrayDatosCompletos719.ESTADO, 1)

    var medicamentos
    if ($("#Medicamentos_ser119").prop('checked')) { medicamentos = 'S' } else { medicamentos = 'N' }
    var procQuir
    if ($("#procQuirur_ser119").prop('checked')) { procQuir = 'S' } else { procQuir = 'N' }
    var procDiag
    if ($("#procDiag_ser119").prop('checked')) { procDiag = 'S' } else { procDiag = 'N' }
    var imagen
    if ($("#imagen_ser119").prop('checked')) { imagen = 'S' } else { imagen = 'N' }
    var servicios
    if ($("#serv_ser119").prop('checked')) { servicios = 'S' } else { servicios = 'N' }
    var consultasTer
    if ($("#consulter_ser119").prop('checked')) { consultasTer = 'S' } else { consultasTer = 'N' }
    var promPrev
    if ($("#promPrev_ser119").prop('checked')) { promPrev = 'S' } else { promPrev = 'N' }

    var espec1 = cerosIzq($("#espec1_719").val(), 3)
    var espec2 = cerosIzq($("#espec2_719").val(), 3)
    var espec3 = cerosIzq($("#espec3_719").val(), 3)
    var espec4 = cerosIzq($("#espec4_719").val(), 3)
    var espec5 = cerosIzq($("#espec5_719").val(), 3)

    var oper1 = cerosIzq($("#operAsig1_719").val().toUpperCase(), 4)
    var oper2 = cerosIzq($("#operAsig2_719").val().toUpperCase(), 4)
    var oper3 = cerosIzq($("#operAsig3_719").val().toUpperCase(), 4)
    var oper4 = cerosIzq($("#operAsig4_719").val().toUpperCase(), 4)
    var oper5 = cerosIzq($("#operAsig5_719").val().toUpperCase(), 4)

    var intMin = arrayDatosCompletos719.INTMIN
    var cantMax = arrayDatosCompletos719.CITAS

    var formaAgen = arrayDatosCompletos719.FORMAGEN
    var sobreAgen = arrayDatosCompletos719.SOBREAGEN
    var rango = arrayDatosCompletos719.RANGO


    var fechaDesde, horaDesde
    var fechaDigDesde = $('#desAgenDesde_ser119').val().trim()
    if (fechaDigDesde.length < 1) {
        fechaDesde = '00000000'
        horaDesde = '0000'
        fechaHasta = '00000000'
        horaHasta = '0000'
    } else {
        fechaDesde = parseInt(moment($_fechaDeshabDesde_119).format("YYYYMMDD"))
        if (isNaN(fechaDesde)) {
            fechaDesde = 0
            fechaDesde = cerosIzq(fechaDesde, 8)
        } else {
            fechaDesde = cerosIzq(fechaDesde, 8)
        }
        horaDesde = parseInt(moment($_fechaDeshabDesde_119).format("HHmm"))
        if (isNaN(fechaDesde)) {
            horaDesde = 0
            horaDesde = cerosIzq(horaDesde, 4)
        } else {
            horaDesde = cerosIzq(horaDesde, 4)
        }
        fechaHasta = parseInt(moment($_fechaDeshabHasta_119).format("YYYYMMDD"));
        if (isNaN(fechaHasta)) {
            fechaHasta = 0
            fechaHasta = cerosIzq(fechaHasta, 8)
        } else {
            fechaHasta = cerosIzq(fechaHasta, 8)
        }

        horaHasta = parseInt(moment($_fechaDeshabHasta_119).format("HHmm"))
        if (isNaN(fechaDesde)) {
            horaHasta = 0
            horaHasta = cerosIzq(horaHasta, 4)
        } else {
            horaHasta = cerosIzq(horaHasta, 4)
        }
    }

    var impDvd = arrayDatosCompletos719.DATO_DVD
    var impBir = arrayDatosCompletos719.DATO_BIRAD
    var impNorm = arrayDatosCompletos719.DATO_NORM
    var impRad = arrayDatosCompletos719.DATO_ASOCI

    var verificarTabla = $val_Tabla_119

    var datos_EnvioComp_719 = datosEnvio()
    datos_EnvioComp_719 += $_NovedSal719
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += identificacion
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += nombre
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += detalle
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += registro
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += atiende
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += ctaRet
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += divCup
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += sucursal
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += contrato
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += porcenMed
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += estado
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += medicamentos
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += procQuir
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += procDiag
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += imagen
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += servicios
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += consultasTer
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += promPrev
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += espec1
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += espec2
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += espec3
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += espec4
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += espec5
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += oper1
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += oper2
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += oper3
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += oper4
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += oper5
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += intMin
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += cantMax
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += formaAgen
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += sobreAgen
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += rango
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += fechaDesde
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += horaDesde
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += fechaHasta
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += horaHasta
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += impDvd
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += impBir
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += impNorm
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += impRad
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += verificarTabla
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += localStorage.Usuario
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += moment().format('YYYYMMDD')
    datos_EnvioComp_719 += '|'

    let URL = get_url("APP/SALUD/SAL719-03.DLL");
    postData({
        datosh: datos_EnvioComp_719
    }, URL)
        .then((data) => {
            jAlert(
                { titulo: 'SAL719-03', mensaje: data },
                salir_719
            );
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}


