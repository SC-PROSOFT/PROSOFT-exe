/* NOMBRE RM --> SER119 // NOMBRE ELECTR --> SAL719 */

// import { loadavg } from "os";

var arraySucur119, arrayDivis719, arrayMaest119, arrayTerceros119, arrayProfesionales119, $_NOVEDAD, arrayEspecial119, arrayDatosCompletos119, arrayProfes719, arrayOperad719, arrayHorProf_119 = [];
var arrayHorProfMoment_119, $novPopUp
var salas119;
var fechaActual119
var mayorRet_119, teclaFuncEspec_119;

var $nitUsuario119, $rangoBloqueo119, $contrato119, $estado119
var $impDvd119, $impMenBir119, $impMenNorm119, $asocRad119, $val_Tabla_119

var maskFechas = [];
var maskHora = [];
var maskFrec = [];

var $_fechaPopUp_119, $_fechaDeshabDesde_119, $_fechaDeshabHasta_119, $añoDeshabDesde
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

$("#desAgenDesde_ser119").each(function (index, element) {
    // console.log(element)
    var momentFormat = 'YYYY/MM/DD-HH:mm';
    var momentMask = IMask(element, {
        mask: Date,
        pattern: momentFormat,
        lazy: true,
        min: new Date(2009, 0, 1),
        max: new Date(2080, 0, 1),

        format: function (date) {
            console.log(date);
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
})

$("#desAgenHasta_ser119").each(function (index, element) {
    console.log(element)
    var momentFormat = 'YYYY/MM/DD-HH:mm';
    var momentMask = IMask(element, {
        mask: Date,
        pattern: momentFormat,
        lazy: true,
        min: new Date(2009, 0, 1),
        max: new Date(2080, 0, 1),

        format: function (date) {
            console.log(date);
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
    // $nitUsuario119 = $_USUA_GLOBAL[0].NIT
    $nitUsuario119 = 0830092718
    _inputControl('reset');
    _inputControl('disabled');

    _toggleF8([
        { input: 'fecha', app: '119', funct: _ventanaFecha719 },
        { input: 'identificacion', app: '119', funct: _ventanaTerceros719 },
        { input: 'division', app: '119', funct: _ventanaDivis719 },
        { input: 'sucursal', app: '119', funct: _ventanaSucursal719 },
        { input: 'cuentaRte', app: '119', funct: _ventanaCuentRte719 },
        { input: 'espec1', app: '119', funct: _Especialistas719 },
        { input: 'espec2', app: '119', funct: _Especialistas719 },
        { input: 'espec3', app: '119', funct: _Especialistas719 },
        { input: 'espec4', app: '119', funct: _Especialistas719 },
        { input: 'espec5', app: '119', funct: _Especialistas719 },
        { input: 'operAsig1', app: '119', funct: _ventanaOperador719 },
        { input: 'operAsig2', app: '119', funct: _ventanaOperador719 },
        { input: 'operAsig3', app: '119', funct: _ventanaOperador719 },
        { input: 'operAsig4', app: '119', funct: _ventanaOperador719 },
        { input: 'operAsig5', app: '119', funct: _ventanaOperador719 },
        { input: 'profesion', app: '119', funct: _ventanaProfesion719 }

    ]);
    crearJsonTerceros719();
});


function _ventanaFecha719(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana De Horario',
            columnas: ["FECHA", "OBSERVACION", "HORA_INGRESO1", "HORA_SALIDA1", "HORA_INGRESO2", "HORA_SALIDA2"],
            data: arrayHorProfMoment_119,
            callback_esc: function () {
                validarFechaAtencion_119()
            },
            callback: function (data) {
                var fechaFull = moment(data.FECHA_HOR.trim(), "YYYY-MM-DD")
                console.log(fechaFull)
                $("#fechaPopUp_119").val(fechaFull)
                _enterInput('.fechaPopUp_119');
            }
        });
    }
}

function _ventanaTerceros719(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        switch (parseInt($_NOVEDAD)) {
            case 7: f8Terceros719();
                break;
            case 8: f8Profesionales719();
                break;
            case 9: f8Profesionales719();
                break;
        }
    }
}

function f8Terceros119() {
    _ventanaDatos({
        titulo: 'Ventana De Terceros',
        tipo: 'mysql',
        db: $CONTROL,
        tablaSql: 'sc_archter',
        callback_esc: function () {
            modificar719()
        },
        callback: function (data) {
            var cedula = cerosIzq(data.codigo, 10)
            $("#identificacion_119").val(cedula)
            $("#nombre_119").val(data.descripcion);
            _enterInput('#identificacion_119');
        }
    });
}

function f8Profesionales719() {
    _ventanaDatos({
        titulo: 'Ventana De Profesionales',
        tipo: 'mysql',
        db: $CONTROL,
        tablaSql: 'sc_archprof',
        callback_esc: function () {
            modificar719()
        },
        callback: function (data) {
            var cedula = cerosIzq(data.codigo, 10)
            $("#identificacion_119").val(cedula)
            $("#nombre_119").val(data.descripcion);
            _enterInput('#identificacion_119');
        }
    });
}

function _ventanaCuentRte719(e) { // Habilitar F8
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA PLAN DE CUENTAS",
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_archmae',
            callback_esc: function () {
                ctaRetenfuente_119()
            },
            callback: function (data) {
                $("#cuentaRte_119").val(data.cuenta.trim() + data.nivel.trim())
                _enterInput('#cuentaRte_119');
            }
        });
    }
}

function _ventanaDivis719(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana De Divisiones',
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_divis',
            callback_esc: function () {
                divisionCups_119()
            },
            callback: function (data) {
                $("#division_119").val(data.codigo)
                $("#descDiv_119").val(data.descripcion)
                _enterInput('#division_119');
            }
        });
    }
}

function _ventanaSucursal719(e) { // Habilitar F8
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana De Sucursales',
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_sucur',
            callback_esc: function () {
                sucursal_719()
            },
            callback: function (data) {
                $("#sucursal_119").val(data.codigo)
                $("#descSuc_119").val(data.descripcion)
                _enterInput('#sucursal_119');
            }
        });
    }
}


$(document).on('keydown', '.f8sucursalTabla', function (e) { // Habilitar F8
    if (e.which == 119) {
        var atributo = $(this).attr("id");
        var numero = atributo.split('')
        var idSucursal = '#sucursal' + numero[8] + '_' + numero[10]
        _ventanaDatos({
            titulo: 'Ventana De Sucursales',
            columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
            data: arraySucur119,
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
        console.log(atributo)
        _ventanaDatos({
            titulo: 'Ventana De Sucursales',
            columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
            data: arraySucur119,
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
            data: arrayOperad719,
            callback_esc: function () {
                validarOperador_119(id)
            },
            callback: function (data) {
                $("#operAsig" + id + "_119").val(data.CODIGO.trim())
                _enterInput('#operAsig' + id + '_119')
            }
        });
    }
}

function _Especialistas719(e) {
    var atributo = $(this).attr("id");
    var numero = atributo.split('')
    var idEspec71A = '#espec' + numero[5] + '_119'
    var idDescp71A = '#DescEspec' + numero[5] + '_119'

    switch (e.which) {
        case 119:
            _ventanaDatos({
                titulo: 'Ventana De Especialidades',
                tipo: 'mysql',
                db: 'datos_pros',
                tablaSql: 'sc_archesp',
                callback_esc: function () {
                    tipoContratacion_119()
                },
                callback: function (data) {
                    $(idEspec71A).val(data.codigo)
                    $(idDescp71A).val(data.nombre)
                    // _enterInput(idEspec71A)
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

function crearJsonTerceros719() {
    LLAMADO_DLL({
        dato: [],
        callback: on_jsonTerceros719,
        nombredll: 'CON802',
        carpeta: 'CONTAB'
    })
}

function on_jsonTerceros719(data) {
    console.debug(data + ' terce');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var json = date[1].trim();
    var rutaJson = get_url("temp/" + json);
    if (swinvalid == '00') {
        SolicitarDatos(
            null,
            function (data) {
                arrayTerceros119 = data.TERCEROS
                arrayTerceros119.pop()
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_eliminarJsonTerceros719);
            },
            rutaJson
        );
    }
    else {
        loader('hide');
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function on_eliminarJsonTerceros719(data) {
    console.log(data);
    var res = data.split('|');
    if (res[0].trim() == '00') {
        console.debug('json eliminado')
        // jsonSucur719();
        jsonMaestros719()
    } else {
        loader('hide');
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function jsonMaestros719() {
    LLAMADO_DLL({
        dato: [],
        callback: on_jsonMaest719,
        nombredll: 'CON801',
        carpeta: 'CONTAB'
    })
}

function on_jsonMaest719(data) {
    console.debug(data + ' maestros');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var json = date[1].trim();
    var rutaJson = get_url("temp/" + json);
    if (swinvalid == '00') {
        SolicitarDatos(
            null,
            function (data) {
                arrayMaest119 = data.MAESTROS
                arrayMaest119.pop()
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_elimJsonMstr719);
            },
            rutaJson
        );
    }
    else {
        loader('hide');
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function on_elimJsonMstr719(data) {
    console.log(data);
    var res = data.split('|');
    if (res[0].trim() == '00') {
        console.debug('json eliminado')
        // crearJsonDivision719()
        crearJsonOperad719()
    } else {
        loader('hide');
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

// function crearJsonDivision719() {
//     LLAMADO_DLL({
//         dato: [],
//         callback: on_jsonDivis719,
//         nombredll: 'INV809',
//         carpeta: 'INVENT'
//     })
// }

// function on_jsonDivis719(data) {
//     console.debug(data + ' division');
//     var date = data.split('|');
//     var swinvalid = date[0].trim();
//     var json = date[1].trim();
//     var rutaJson = get_url("temp/" + json);
//     if (swinvalid == '00') {
//         SolicitarDatos(
//             null,
//             function (data) {
//                 arrayDivis719 = data.DIVISION
//                 arrayDivis719.pop()
//                 var arrayEliminar = [];
//                 arrayEliminar.push(json)
//                 _eliminarJson(arrayEliminar, on_elimJsonDivis719);
//             },
//             rutaJson
//         );
//     }
//     else {
//         loader('hide');
//         CON852(date[0], date[1], date[2], _toggleNav);
//     }
// }
// function on_elimJsonDivis719(data) {
//     console.log(data);
//     var res = data.split('|');
//     if (res[0].trim() == '00') {
//         console.debug('json eliminado')
//         crearJsonOperad719()
//     } else {
//         loader('hide');
//         jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
//     }
// }

function crearJsonOperad719() {
    LLAMADO_DLL({
        dato: [],
        callback: on_jsonOperd719,
        nombredll: 'CON982',
        carpeta: 'CONTAB'
    })
}

function on_jsonOperd719(data) {
    console.debug(data + ' operador');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var json = date[1].trim();
    var rutaJson = get_url("temp/" + json);
    if (swinvalid == '00') {
        SolicitarDatos(
            null,
            function (data) {
                arrayOperad719 = data.ARCHREST
                arrayOperad719.pop()
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_elimJsonOperad719);
            },
            rutaJson
        );
    }
    else {
        loader('hide');
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function on_elimJsonOperad719(data) {
    console.log(data);
    var res = data.split('|');
    if (res[0].trim() == '00') {
        console.debug('json eliminado')
        llamarNovedad119()
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}
/// FIN JSON /// 



//NOVEDAD//
function llamarNovedad119() {
    CON850(evaluarNovedad119)
}

function evaluarNovedad119(novedad) {
    $_NOVEDAD = novedad.id;
    switch (parseInt(novedad.id)) {

        case 7:
        case 8:
        case 9: modificar719();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedad_119').val(novedad.id + ' - ' + novedad.descripcion)
}

function modificar719() {
    validarInputs(
        {
            form: '#validarIdentificacion',
            orden: "1"
        },
        function () { CON850(evaluarNovedad119); },
        function () {
            var Identificacion119 = $('#identificacion_119').val();
            $identificacion_global = Identificacion119

            let datos_envio = datosEnvio()
            datos_envio += '|'
            datos_envio += $identificacion_global
            SolicitarDll({ datosh: datos_envio }, on_datoProfes719, get_url('/APP/SALUD/SAL719C.DLL'));
        }
    )
}

function on_datoProfes719(data) {
    console.debug(data);
    var date = data.split('|');

    $_NOMPROF = date[1].trim();
    $_DESCRPROF = date[2].trim();
    $_REGPROF = date[3].trim();
    $_ATIENPROF = date[4].trim();
    $_CONTRPROF = date[5].trim();
    $_PORCPROF = date[6].trim();
    $_ESTADPROF = date[7].trim();

    $_CUENTAPROF = date[8].trim();
    $_DESCTAPROF = date[9].trim();
    $_DIVPROF = date[10].trim();
    $_DESCDIVPROF = date[11].trim();
    $_SUCURPROF = date[12].trim();
    $_DESCSUCPROF = date[13].trim();
    $_CL1PROF = date[14].trim();
    $_CL2PROF = date[15].trim();
    $_CL3PROF = date[16].trim();
    $_CL4PROF = date[17].trim();
    $_CL5PROF = date[18].trim();
    $_CL6PROF = date[19].trim();
    $_CL7PROF = date[20].trim();

    $_ESPC1PROF = date[21].trim();
    $_DESCESP1PROF = date[22].trim();
    $_ESPC2PROF = date[23].trim();
    $_DESCESP2PROF = date[24].trim();
    $_ESPC3PROF = date[25].trim();
    $_DESCESP3PROF = date[26].trim();
    $_ESPC4PROF = date[27].trim();
    $_DESCESP4PROF = date[28].trim();
    $_ESPC5PROF = date[29].trim();
    $_DESCESP5PROF = date[30].trim();

    $_OPER1PROF = date[31].trim();
    $_OPER2PROF = date[32].trim();
    $_OPER3PROF = date[33].trim();
    $_OPER4PROF = date[34].trim();
    $_OPER5PROF = date[35].trim();

    $_INTMINPROF = date[36].trim();
    $_CANTCITAPROF = date[37].trim();
    $_FORMAPROF = date[38].trim();
    $_SOBREAPROF = date[39].trim();

    $_OPERPROF = date[40].trim();
    $_FECHPROF = date[41].trim();

    $_FECINICPROF = date[42].trim();
    $_HORAINIPROF = date[43].trim();
    $_FECFINPROF = date[44].trim();
    $_HORAFINPROF = date[45].trim();
    $_IMPDVDPROF = date[46].trim();
    $_IMPBIRPROF = date[47].trim();
    $_IMPNOMRPROF = date[48].trim();
    $_ASOCPROF = date[49].trim();

    // $_LUNPROF = date[34].trim();
    // $_MARTPROF = date[35].trim();
    // $_MIERCPROF = date[36].trim();
    // $_JUEVPROF = date[37].trim();
    // $_VIERPROF = date[38].trim();
    // $_SABADPROF = date[39].trim();



    if (date[0].trim() == '00') {
        if ($_NOVEDAD == '7') {
            CON851('00', '00', null, 'error', 'Error');
            modificar_119();
        }
        else {
            datosProfs()
        }
    }
    else if (date[0].trim() == '01') {
        if ($_NOVEDAD == '7') {
            detalle_119();
        }
        else {
            CON851('01', '01', null, 'error', 'Error');
            modificar_119();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function datosProfs() {
    $("#nombre_119").val($_NOMPROF);
    $('#detalle_119').val($_DESCRPROF);
    $('#registro_ser119').val($_REGPROF);
    $('#profesion_119').val($_ATIENPROF);
    // $('#descriprof_119').val(search_array_Profesion119(datos.ATIENDE.trim()));

    switch ($_CONTRPROF) {
        case "1":
            $('#contratacion_119').val('Valor Fijo');
            break;
        case "2":
            $('#contratacion_119').val('% Sobre Facturacion');
            $('#medico_119').val($_PORCPROF);
            break;
    }

    switch ($_ESTADPROF) {
        case "1":
            $('#estAct_119').val('Activo')
            break;
        case "2":
            $('#estAct_119').val('Inactivo')
            break;
    }

    $('#cuentaRte_119').val($_CUENTAPROF);
    $('#descRetenfuente_119').val($_DESCTAPROF);
    $('#division_119').val($_DIVPROF);
    $('#descCUPS_119').val($_DESCDIVPROF);
    $('#sucursal_119').val($_SUCURPROF);
    $('#descSuc_119').val($_DESCSUCPROF);

    validarChecked('#Medicamentos_119', $_CL1PROF);
    validarChecked('#procQuirur_ser119', $_CL2PROF);
    validarChecked('#procDiag_ser119', $_CL3PROF);
    validarChecked('#imagen_ser119', $_CL4PROF);
    validarChecked('#serv_ser119', $_CL5PROF);
    validarChecked('#consulter_ser119', $_CL6PROF);
    validarChecked('#promPrev_ser119', $_CL7PROF);

    $('#espec1_119').val($_ESPC1PROF);
    $('#DescEspec1_119').val($_DESCESP1PROF);
    $('#espec2_119').val($_ESPC2PROF);
    $('#DescEspec2_119').val($_DESCESP2PROF);
    $('#espec3_119').val($_ESPC3PROF);
    $('#DescEspec3_119').val($_DESCESP3PROF);
    $('#espec4_119').val($_ESPC4PROF);
    $('#DescEspec4_119').val($_DESCESP4PROF);
    $('#espec5_119').val($_ESPC5PROF);
    $('#DescEspec5_119').val($_DESCESP5PROF);

    $('#operAsig1_119').val($_OPER1PROF);
    if ($_OPER1PROF === 'XXXX') {
        $('#descAsig1_119').val('TODOS LOS OPERADORES');
    }
    $('#operAsig2_119').val($_OPER2PROF);
    if ($_OPER2PROF === 'XXXX') {
        $('#descAsig2_119').val('TODOS LOS OPERADORES');
    }
    $('#operAsig3_119').val($_OPER3PROF);
    if ($_OPER3PROF === 'XXXX') {
        $('#descAsig3_119').val('TODOS LOS OPERADORES');
    }
    $('#operAsig4_119').val($_OPER4PROF);
    if ($_OPER4PROF === 'XXXX') {
        $('#descAsig4_119').val('TODOS LOS OPERADORES');
    }
    $('#operAsig5_119').val($_OPER5PROF);
    if ($_OPER5PROF === 'XXXX') {
        $('#descAsig5_119').val('TODOS LOS OPERADORES');
    }

    $('#asigCita_ser119').val($_INTMINPROF);
    $('#cantMaxCitas_Ser119').val($_CANTCITAPROF);

    validarChecked('#agendaExcep719', $_FORMAPROF);
    validarChecked('#sobreAgenda719', $_SOBREAPROF);


    $('#oper_ser119').val($_OPERPROF);
    $('#fecha_ser119').val($_FECHPROF);

    $FECDESDE = $_FECINICPROF
    $FECDESDE += $_HORAINIPROF;

    $FECHAST = $_FECFINPROF
    $FECHAST += $_HORAFINPROF;

    if ($FECHAST != "0000000000") {
        var fechaDesdeMask_119 = buscarMaskFecha('desAgenDesde_ser119')
        fechaDesdeMask_119.unmaskedValue = $FECHAST

        var fechaHastaMask_119 = buscarMaskFecha('desAgenHasta_ser119')
        fechaHastaMask_119.unmaskedValue = $FECHAST
    }

    validarChecked('#impDVD_119', $_IMPDVDPROF)
    validarChecked('#impMenBir_119', $_IMPBIRPROF)
    validarChecked('#impMenNorm_119', $_IMPNOMRPROF)
    validarChecked('#asocRad_119', $_ASOCPROF)

    continuar719()
    console.debug(' DATOS COMPLETOS');
}


function continuar719() {
    switch (parseInt($_NOVEDAD)) {
        case 8:
            detalle_119();
            break;
        case 9:
            CON851P('54', modificar_119, eliminarRegistro_119)
            break;
    }
}



function eliminarRegistro_119() {
    loader('show')
    console.log("Estoy eliminando el registro");
    var identificacion = cerosIzq($identificacion_global, 10)
    console.log(identificacion)
    LLAMADO_DLL({
        dato: [$_NOVEDAD, identificacion],
        callback: validarEliminiarRegistro1_119,
        nombredll: 'SAL719-03',
        carpeta: 'SALUD'
    })
}

function validarEliminiarRegistro1_119(data) {
    console.log(data);
    console.log("elimnando");
    var rdll = data.split('|');

    if (rdll[0].trim() == '00') {
        loader('hide');
        jAlert({ titulo: 'Notificacion', mensaje: "Eliminado correctamente" }, function () { _toggleNav(); });
    } else {
        console.log(rdll)
        loader('hide');
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
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
        function () { CON850(evaluarNovedad119); },
        function () {
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
        function () { CON850(evaluarNovedad119); },
        function () {
            _ventanaProfesion719();
        }
    )
}

function _ventanaProfesion719() {
    _ventanaDatos({
        titulo: "Personal que atiende",
        tipo: 'mysql',
        db: $CONTROL,
        tablaSql: 'sc_archatiend',
        callback_esc: function () {
            registro_119()
        },
        callback: function (data) {
            $("#profesion_119").val(data.codigo)
            $("#descriprof_119").val(data.nombre)
            ctaRetenfuente_119();
        }
    });
}

function ctaRetenfuente_119() {
    validarInputs(
        {
            form: '#validarCtaRetenfuente119',
            orden: "1"
        },
        function () { registro_119(); },
        function () {
            var ctaRetFuente = $("#cuentaRte_119").val()

            if (ctaRetFuente.trim().length > 0) {
                var descCta = search_Cta_Ret_Fuente_119(ctaRetFuente)
                var mayRet = ctaRetFuente.substring(0, 4);
                if (mayRet == mayorRet_119) {
                    switch (descCta) {
                        case false:
                            CON851('01', '01', null, 'error', 'error');
                            ctaRetenfuente_119()
                            break;
                        case 'error 04':
                            CON851('04', '04', null, 'error', 'error');
                            ctaRetenfuente_119()
                        default:
                            $("#descRetenfuente_119").val(descCta)
                            divisionCups_119()
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

function search_Cta_Ret_Fuente_119(cuenta) {
    var retornar = false;
    for (var i in arrayMaest119) {
        if (arrayMaest119[i].CTA_MAY.trim() == cuenta) {
            if (arrayMaest119[i].PORCENT_RET.trim().length > 0) {

                retornar = arrayMaest119[i].NOMBRE_MAE.trim();
            } else {
                retornar = 'error 04'
            }
            break;
        }
    }
    return retornar;
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
            var divCups = $("#division_119").val()
            var descrpCups = $("#descDiv_119").val()
            if (divCups.trim().length > 0) {
                switch (divCups) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        divisionCups_119()
                        break;
                    default:
                        $('#descDiv_119').val(descrpCups);
                        sucursal_119()
                        break;
                }
            } else {
                _consultaSql({
                    sql: `SELECT * FROM sc_divis SET descripcion ='${descrpCups}' WHERE codigo = '${divCups}' `,
                    // sql: `SELECT * FROM sc_divis WHERE codigo = '${divCups}'`,
                    db: $CONTROL,
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            var datos = results[0]
                            console.log(datos)
                            if (results.length > 0) {
                                $(divCups).val(data.codigo.trim())
                                $(descrpCups).val(data.descripcion.trim())
                                sucursal_119()
                            } else if (results.length == '') {
                                sucursal_119()
                            }
                        }
                    }
                })
            }
        }
    )
}

// function search_Division119(codigo) {
//     var retornar = false;
//     for (var i in arrayDivis719) {
//         if (arrayDivis719[i].CODIGO.trim() == codigo) {
//             retornar = arrayDivis719[i].DESCRIPCION.trim();
//             break;
//         }
//     }
//     return retornar;
// }

function sucursal_119() {
    validarInputs(
        {
            form: '#validarSucursal119',
            orden: '1'
        },
        function () {
            divisionCups_119();
        },
        function () {
            var sucur71A = $("#sucursal_119").val()
            var descrsucur71A = $("#descSuc_119").val()

            if (sucur71A.trim().length > 0) {
                switch (sucur71A) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        sucursal_119()
                        break;
                    default:
                        $('#descSuc_119').val(descrsucur71A);
                        tipoContratacion_119()
                        break;
                }
            } else {
                _consultaSql({
                    sql: `SELECT * FROM sc_sucur WHERE codigo = '${sucur71A}'`,
                    db: 'datos_pros',
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            var datos = results[0]
                            console.log(datos)
                            if (results.length > 0) {
                                $(sucur71A).val(data.codigo.trim())
                                $(descrsucur71A).val(data.descripcion.trim())
                                tipoContratacion_119()
                            } else if (results.length == '') {
                                tipoContratacion_119()
                            }
                        }
                    }
                })
            }
        }
    )
}


function tipoContratacion_119() {
    var datoContra = [
        { "COD": "1", "DESCRIP": "Valor Fijo" },
        { "COD": "2", "DESCRIP": "% Sobre Facturacion" }
    ]
    POPUP({
        array: datoContra,
        titulo: 'Tipo De Contratacion',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: sucursal_119
    }, function (data) {
        console.log(data);
        switch (data.COD) {
            case '1':
                $('#contratacion_119').val(data.DESCRIP.trim())
                $contrato119 = data.COD.trim()
                setTimeout(estadoAct_719, 300);
                break;
            case '2':
                $('#contratacion_119').val(data.DESCRIP.trim())
                $contrato119 = data.COD.trim()
                setTimeout(validarPorcentMed719, 300);
                break;
        }
    })
}

function validarPorcentMed719() {
    validarInputs(
        {
            form: '#validarPorcMedico',
            orden: '1'
        },
        function () {
            tipoContratacion_119();
        },
        function () {
            var medico = $('#medico_119').val()

            if (medico > 100) {
                validarPorcentMed719()
            } else if (medico == 0) {
                jAlert(
                    { titulo: 'Atencion ', mensaje: '<b>Mensaje: </b>' + 'Si el tipo de contratacion es 2 y el % asignado es 0, el sistema asume el % del grupo del cup' }, estadoAct_119);

            } else if (medico > 0 && medico <= 100) {
                estadoAct_719()
            }
        }

    )
}

function estadoAct_719() {
    var datoEstado = [
        { "COD": "1", "DESCRIP": "Activo" },
        { "COD": "2", "DESCRIP": "Inactivo" }
    ]
    POPUP({
        array: datoEstado,
        titulo: 'Estado Actual',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: tipoContratacion_119
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
                $('#estAct_119').val(data.DESCRIP.trim())
                $estado119 = data.COD.trim()
                // setTimeout(validarEspecialidad_119(1), 300);
                validarEspecialidad_119(1);
        }
    })
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
            var codigoEspec_119 = $('#espec' + id + '_119').val();
            var desEspec_119 = $('#DescEspec' + id + '_119').val();

            if (codigoEspec_119.trim().length > 0) {
                switch (codigoEspec_119) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        validarEspecialidad_119(id)
                        break;
                    default:
                        $('#DescEspec' + id + '_119').val(desEspec_119);
                        if (id == '5') {
                            validarOperador_119(1)
                        } else {
                            validarEspecialidad_119(parseInt(id) + 1)
                        }
                }
            } else {
                _consultaSql({
                    sql: `SELECT * FROM sc_archesp WHERE codigo = '${codigoEspec_119}'`,
                    db: 'datos_pros',
                    callback: function (error, results, fields) {
                        if (error) throw error;
                        else {
                            // var datos = results[0]
                            // console.log(datos)
                            if (results.length > 0) {
                                switch (id) {
                                    case 29:
                                        validarOperador_119(1)
                                        break;
                                    default:
                                        validarEspecialidad_71A(parseInt(id) + 1);
                                        break;
                                }
                                var consecutivo = cerosIzq(datos.codigo.toString().trim(), 3)
                                $(idDescp71A).val(data.nombre.trim())
                                $(idDescp71A).val(consecutivo)
                                validarOperador_119()
                            } else if (results.length == '') {
                                validarOperador_119()
                            }
                        }
                    }
                })
                // switch (id) {
                //     case 5:
                //         validarOperador_119(1)
                //         break;
                //     default:
                //         validarEspecialidad_119(parseInt(id) + 1)
                // }
            }
        }
    )
}

function search_operador_119(codigo) {
    var retornar = false;
    if (codigo === 'XXXX') {
        retornar = 'TODOS LOS OPERADORES';
    } else {
        for (var i in arrayOperad719) {
            if (arrayOperad719[i].CODIGO.trim() == codigo) {
                retornar = arrayOperad719[i].DESCRIPCION.trim();
                break;
            }
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
            var codigoOper_119 = $('#operAsig' + id + '_119').val();
            var desOper_119 = search_operador_119(codigoOper_119)

            switch (desOper_119) {
                case false:
                    CON851('01', '01', null, 'error', 'error');
                    validarOperador_119(id)
                    break;

                default:
                    $('#descAsig' + id + '_119').val(desOper_119);

                    if (id == '5') {
                        validarCitas_119()
                    } else {
                        _consultaSql({
                            sql: `SELECT * FROM sc_sucur WHERE codigo = '${sucur71A}'`,
                            db: 'datos_pros',
                            callback: function (error, results, fields) {
                                if (error) throw error;
                                else {
                                    var datos = results[0]
                                    console.log(datos)
                                    if (results.length > 0) {
                                        $(sucur71A).val(data.codigo.trim())
                                        $(descrsucur71A).val(data.descripcion.trim())
                                        tipoContratacion_119()
                                    } else if (results.length == '') {
                                        tipoContratacion_119()
                                    }
                                }
                            }
                        })
                        // validarOperador_119(parseInt(id) + 1)
                    }
            }
        }
    )

}

function validarCitas_119() {
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
            var intervalo = validarIntCitas_119(valorIntervalo)
            console.log(intervalo)
            if (!intervalo) {
                CON851('03', '03', null, 'error');
                validarCitas_119()
            } else {
                // fechaActual119 = fechaActualGlobal()
                validarMaxCitas_119()
            }

        }
    )

}

function validarIntCitas_119(intervalo) {
    retornar = false
    switch (parseInt(intervalo)) {
        case 00:
        case 01:
        case 02:
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
    return retornar;
}

function validarMaxCitas_119() {
    validarInputs(
        {
            form: '#maxCitas',
            orden: 1
        },
        function () {
            validarCitas_119();
        },
        function () {
            console.log('-> Sale popup')
            agendCitas719()
            // if ($('#asigCita_ser119').val().length > 0) {
            //     // agenExcep_119();
            //     agendCitas719()
            // } else {
            //     $('#agenExcep_ser119').prop('checked', false);
            //     validarDeshabilitarDesde()
            // }

        }
    )

}
function agendCitas719() {
    var datosAgenda = [
        { "COD": "1", "DESCRIP": "Si" },
        { "COD": "2", "DESCRIP": "No" }
    ]
    POPUP({
        array: datosAgenda,
        titulo: 'Usar agendamiento por excepciones?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: validarCitas_119
    }, function (data) {
        console.log(data);
        switch (data.COD) {
            case '1':
                $('#agendaExcep719').val(data.DESCRIP.trim())
                $AGENDA = data.DESCRIP.trim()
                setTimeout(validarPopup_119, 300);
                break;
            case '2':
                $('#agendaExcep719').val(data.DESCRIP.trim())
                $AGENDA = data.DESCRIP.trim()
                setTimeout(sobreAgnd719, 300);
                break;
        }
    })
}

function sobreAgnd719() {
    var datosSobreagnd = [
        { "COD": "1", "DESCRIP": "Si" },
        { "COD": "2", "DESCRIP": "No" }
    ]
    POPUP({
        array: datosSobreagnd,
        titulo: 'Permitir Sobre Agendar?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: agendCitas719
    }, function (data) {
        console.log(data);
        switch (data.COD) {
            case '1':
            case '2':
                $('#sobreAgenda719').val(data.DESCRIP.trim())
                $SOBREAGND = data.DESCRIP.trim()
                setTimeout(validarDeshabilitarDesde, 300);
                break;
        }
    })
}

function validarPopup_119() {
    console.log('va a abrir pop up de fehca y horario de atencion')
    var fuente = $('#popUpHorarioAtencion_119').html();
    var dialogo2 = bootbox.dialog({
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


    // dialogo.init(function () {
    dialogo2.on('shown.bs.modal', function () {
        // Inicia validación pop-up

        // var fechaPopUp = $('.fechaPopUp_119');
        console.log('Popup abierto')
        $(".fechaPopUp_119").each(function (index, element) {
            console.log(element)
            var momentFormat = 'YYYY/MM/DD';
            var momentMask = IMask(element, {
                mask: Date,
                pattern: momentFormat,
                lazy: true,
                min: new Date(2009, 0, 1),
                max: new Date(2024, 0, 1),

                format: function (date) {
                    console.log(date);
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
        console.log('termina mascara')
        setTimeout(function () { jsonHorarProfes719() }, 500);
    })
}

function jsonHorarProfes719() {
    LLAMADO_DLL({
        dato: [],
        callback: on_jsonHorarProfes719,
        nombredll: 'SER819H',
        carpeta: 'SALUD'
    })
}

function on_jsonHorarProfes719(data) {
    console.debug(data + ' horario profe');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    var json = date[1].trim();
    var rutaJson = get_url("temp/" + json);
    if (swinvalid == '00') {
        SolicitarDatos(
            null,
            function (data) {
                arrayHorProf_119 = data.AGENDA
                arrayHorProf_119.pop()
                var arrayEliminar = [];
                arrayEliminar.push(json)
                _eliminarJson(arrayEliminar, on_elimHorarioPrf719);
                modifArrayHorProf719();
            },
            rutaJson
        );
    }
    else {
        loader('hide');
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function on_elimHorarioPrf719(data) {
    console.log(data);
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        console.debug('json eliminado')
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function modifArrayHorProf719() {
    arrayHorProfMoment_119 = arrayHorProf_119
    for (var i in arrayHorProfMoment_119) {
        var fechaIni = arrayHorProfMoment_119[i].FECHA
        var fechaMoment = fechaIni.format("dddd, MMMM D ,YYYY")
        arrayHorProfMoment_119[i].FECHA = fechaMoment
    }
    console.log(arrayHorProfMoment_119)
    validarNovedadPopUp_119()
}

function validarNovedadPopUp_119() {
    console.log('ENTRA A NOVEDAD POP UP')
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

            console.log($novPopUp)
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
        // console.log(input)
        // console.log(element)
        var clase = $(input).hasClass(element);
        if (clase) retornar = maskFechaPop[i];
    }

    return retornar;
}

function buscarMaskHoraPopUp(element) {
    var retornar = false;
    for (var i in maskHoraPop) {
        var input = maskHoraPop[i].el.input
        // console.log(input)
        // console.log(element)
        var clase = $(input).hasClass(element);
        if (clase) retornar = maskHoraPop[i];
    }

    return retornar;
}

function buscarMaskFrecuenciaPopUp(element) {
    var retornar = false;
    for (var i in maskFrecPop) {
        var input = maskFrecPop[i].el.input
        // console.log(input)
        // console.log(element)
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
            console.log(fechaActual119)
            var fechaActualPopUp = moment(fechaActual119).format("YYYYMMDD")

            console.log(fechaMoment + '     ' + fechaActualPopUp)
            if (fechaMoment < fechaActualPopUp) {
                CON851('37', '37', null, 'error', 'error');
                validarFechaAtencion_119(novedad)
            } else {
                console.log(fechaMoment)
                var buscarHorario = moment(fechaMoment).format("YYMMDD")
                console.log(buscarHorario)
                var busquedaHorario = search_fechaPopUp_119(buscarHorario)

                var fechaConDia = moment(fechaActual119).format("dddd, MMMM D ,YYYY")
                var diaSemana = moment(fechaActual119).format("d")

                $(idFechaMoment[1]).val(fechaConDia)
                $(idDiaMmoment[1]).val(diaSemana)

                console.log(fechaMoment)
                var festivo = buscarFestivo(fechaMoment.toString())

                if (festivo == undefined) {
                    console.log(novedad)
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
    console.log('esta en el input' + a)
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
                            console.log('esta haciendo busqueda')
                            CON851('01', '01', null, 'error', 'error');
                            valPopUpEntraSalida_119(a)
                        } else {
                            console.log('deberia ir al input ' + (parseInt(a) + 1))
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
                    console.log(claseEntra1)

                    var entra1 = claseEntra1.unmaskedValue
                    console.log(entra1)

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            valPopUpEntraSalida_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'ingPop' + (parseInt(secuencia) - 1)
                            var saleAnterior = buscarMaskHoraPopUp(idAnt)
                            var saleAnt = maskHoraPop[saleAnterior].unmaskedValue
                            console.log(saleAnt + '      ' + entra1)

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
    console.log(Fecha)
    var observ = $('.observacionesPopUp_119')
    var observacion = espaciosDer($(observ[1]).val(), 50)
    console.log(observacion)

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
        modifArrayHorProf719()
    } else {
        console.error(rdll);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function validarDeshabilitarDesde(valorLlega) {
    // switch (valorLlega) {
    //     case 'atras':
    //         $_fechaDeshabDesde_119 = undefined
    //         break;
    //     case 'adelante':
    //         console.log('adelante')
    //         break;
    // }
    validarInputs(
        {
            form: '#validarDeshabilitarDesde',
            orden: "1"
        },
        function () { validarCitas_119(); },
        function () {
            console.log($_fechaDeshabDesde_119)


            if ($_fechaDeshabDesde_119 == undefined) {
                $_fechaDeshabDesde_119 = 0
                $_fechaDeshabDesde_119 = cerosIzq($_fechaDeshabDesde_119, 8)
                $('#desAgenHasta_ser119').val('             ')
                $_fechaDeshabHasta_119 = 0
                $_fechaDeshabHasta_119 = cerosIzq($_fechaDeshabHasta_119, 8)
                validarPopUpRango_119()
            } else {
                var fechaDeshabDesde = parseInt(moment($_fechaDeshabDesde_119).format("YYYYMMDDHHmm"))
                console.log(fechaDeshabDesde + '                   ' + fechaActual119)
                if (fechaDeshabDesde < fechaActual119) {
                    CON851('37', '37', null, 'error', 'error');
                    validarDeshabilitarDesde()
                } else {
                    validarDeshabilitarHasta();
                }
            }
        }
    )
}

function validarDeshabilitarHasta() {
    validarInputs(
        {
            form: '#validarDeshabilitarHasta',
            orden: "1"
        },
        function () {
            validarDeshabilitarDesde();
        },
        function () {
            console.log($_fechaDeshabHasta_119 + '      ' + $_fechaDeshabDesde_119)

            if ($_fechaDeshabHasta_119 <= $_fechaDeshabDesde_119) {
                CON851('37', '37', null, 'error', 'error');
                validarDeshabilitarHasta()
            } else {
                validarPopUpRango_119()
            }

        }
    )
}

function validarPopUpRango_119() {
    $rangoBloqueo119 = ''
    if ($nitUsuario119 == '0830092718' || $nitUsuario119 == '0830092719') {
        popUpRango_119()
    } else {
        $rangoBloqueo119 = '00'
        validar_Confirmar_119()
    }
}

function popUpRango_119() {
    console.log('deberia abrir popup rango')
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
                    $rangoBloqueo119 = result
                    guardarDatosCompletos_119()
                    break;
            }

            // if (result > '15') {
            //     CON851('03', '03', null, 'error', 'error');
            //     popUpRango_119()
            // } else {
            //     console.log(result)
            //     $rangoBloqueo119 = result
            //     validar_Confirmar_119()
            // }
        }
        /* result = String containing user input if OK clicked or null if Cancel clicked */

    });
}

// function validar_Confirmar_119() {
//     $val_Tabla_119 = '  '
//     if ($('#agendaExcep719').prop('checked') || ($('#asigCita_ser119').val().length == 0)) {
//         $val_Tabla_119 = 'NO'
//         guardarDatosCompletos_119()
//     } else {
//         $val_Tabla_119 = 'SI'
//         tabla(1)
//     }
// }


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
    console.log('esta en el input' + a)
    validarInputs(
        {
            form: '#valTablaLunes_' + a,
            orden: '1'
        },
        function () {
            if (a == '1') {
                validarDeshabilitarDesde()
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
                    var busqueda = search_Sucursal_119(nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            console.log('esta haciendo busqueda')
                            CON851('01', '01', null, 'error', 'error');
                            validarLunes_119(a)
                        } else {
                            console.log('deberia ir al input ' + (parseInt(a) + 1))
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
                    console.log('kvnibviuvbhdjkvb ')

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            validarLunes_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_0'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue
                            console.log(saleAnt + '      ' + entra1)

                            if (entra1 <= saleAnt) {
                                validarLunes_119(a)
                            } else {
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
                        console.log('vnfeiovndfklavnoerin')
                        validarLunes_119(a)
                    } else {
                        validarLunes_119(parseInt(a) + 1)
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

                    console.log('kvjndfkvjnkljvn iutvndfjklbvuiofnvikorj')
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
            orden: '1'
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
                    var busqueda = search_Sucursal_119(nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        switch (busqueda) {
                            case false:
                                CON851('01', '01', null, 'error', 'error');
                                validarMartes_119(a)
                                break;
                            default:
                                validarMartes_119(parseInt(a) + 1)
                                break;
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
                            validarMartes_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_1'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue
                            console.log(saleAnt + '      ' + entra1)

                            if (entra1 <= saleAnt) {
                                validarMartes_119(a)
                            } else {
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
                        validarMartes_119(parseInt(a) + 1)
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
            orden: '1'
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
            console.log(a)
            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = $('#sucursal' + secuencia + '_2').val()
                    var busqueda = search_Sucursal_119(nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        switch (busqueda) {
                            case false:
                                CON851('01', '01', null, 'error', 'error');
                                validarMiercoles_119(a)
                                break;
                            default:
                                validarMiercoles_119(parseInt(a) + 1)
                                break;
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
                            validarMiercoles_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_2'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue
                            console.log(saleAnt + '      ' + entra1)

                            if (entra1 <= saleAnt) {
                                validarMiercoles_119(a)
                            } else {
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
                        validarMiercoles_119(parseInt(a) + 1)
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
            orden: '1'
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
                    var busqueda = search_Sucursal_119(nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        switch (busqueda) {
                            case false:
                                CON851('01', '01', null, 'error', 'error');
                                validarJueves_119(a)
                                break;
                            default:
                                validarJueves_119(parseInt(a) + 1)
                                break;
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
                            validarJueves_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_3'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue
                            console.log(saleAnt + '      ' + entra1)

                            if (entra1 <= saleAnt) {
                                validarJueves_119(a)
                            } else {
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
                        validarJueves_119(parseInt(a) + 1)
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
            orden: '1'
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
                    var busqueda = search_Sucursal_119(nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        switch (busqueda) {
                            case false:
                                CON851('01', '01', null, 'error', 'error');
                                validarViernes_119(a)
                                break;
                            default:
                                validarViernes_119(parseInt(a) + 1)
                                break;
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
                            validarViernes_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_4'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue
                            console.log(saleAnt + '      ' + entra1)

                            if (entra1 <= saleAnt) {
                                validarViernes_119(a)
                            } else {
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
                        validarViernes_119(parseInt(a) + 1)
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
            orden: '1'
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
                    var busqueda = search_Sucursal_119(nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        switch (busqueda) {
                            case false:
                                CON851('01', '01', null, 'error', 'error');
                                validarSabado_119(a)
                                break;
                            default:
                                validarSabado_119(parseInt(a) + 1)
                                break;
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
                            validarSabado_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_5'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue
                            console.log(saleAnt + '      ' + entra1)

                            if (entra1 <= saleAnt) {
                                validarSabado_119(a)
                            } else {
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
                        validarSabado_119(parseInt(a) + 1)
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
            orden: '1'
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
                    var busqueda = search_Sucursal_119(nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        switch (busqueda) {
                            case false:
                                CON851('01', '01', null, 'error', 'error');
                                validarDomingo_119(a)
                                break;
                            default:
                                validarDomingo_119(parseInt(a) + 1)
                                break;
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
                            validarDomingo_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_6'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue
                            console.log(saleAnt + '      ' + entra1)

                            if (entra1 <= saleAnt) {
                                validarDomingo_119(a)
                            } else {
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
                        validarDomingo_119(parseInt(a) + 1)
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
    $impDvd119 = ' '
    $impMenBir119 = ' '
    $impMenNorm119 = ' '
    $asocRad119 = ' '

    if ($nitUsuario119 == '0830092718' || $nitUsuario119 == '0830092719') {
        popUpMensajeImpresion_119()
    } else {
        enviarDatosCompletos_119()
    }
}

function popUpMensajeImpresion_119() {
    if ($_NOVEDAD == '7') {
        $("#impDVD_119").prop('checked', false)
        $("#impMenBir_119").prop('checked', false)
        $("#impMenNorm_119").prop('checked', false)
        $("#asocRad_119").prop('checked', false)
    }
    //  else {
    // var data = arrayDatosCompletos119[0];

    // if ($_IMPDVDPROF == 'S') { $("#impDVD_119").prop('checked', true) } else { $("#impDVD_119").prop('checked', false) }
    // if ($_IMPBIRPROF == 'S') { $("#impMenBir_119").prop('checked', true) } else { $("#impMenBir_119").prop('checked', false) }
    // if ($_IMPNOMRPROF == 'S') { $("#impMenNorm_119").prop('checked', true) } else { $("#impMenNorm_119").prop('checked', false) }
    // if ($_ASOCPROF == 'S') { $("#asocRad_119").prop('checked', true) } else { $("#asocRad_119").prop('checked', false) }
    // }
    var fuente = $('#popUpMensajeImpresion_119').html();
    var configimpre = bootbox.dialog({
        title: "Config. Impresion Resultado",
        message: fuente,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue",
                callback: function () {
                    if ($_IMPDVDPROF == 'S') { $("#impDVD_119").prop('checked', true) } else { $("#impDVD_119").prop('checked', false) }
                    if ($_IMPBIRPROF == 'S') { $("#impMenBir_119").prop('checked', true) } else { $("#impMenBir_119").prop('checked', false) }
                    if ($_IMPNOMRPROF == 'S') { $("#impMenNorm_119").prop('checked', true) } else { $("#impMenNorm_119").prop('checked', false) }
                    if ($_ASOCPROF == 'S') { $("#asocRad_119").prop('checked', true) } else { $("#asocRad_119").prop('checked', false) }

                    // if ($("#impDVD_119").prop('md-checkbox')) { $impDvd119 = 'S' } else { $impDvd119 = 'N' }
                    // if ($("#impMenBir_119").prop('md-checkbox')) { $impMenBir119 = 'S' } else { $impMenBir119 = 'N' }
                    // if ($("#impMenNorm_119").prop('md-checkbox')) { $impMenNorm119 = 'S' } else { $impMenNorm119 = 'N' }
                    // if ($("#asocRad_119").prop('md-checkbox')) { $asocRad119 = 'S' } else { $asocRad119 = 'N' }
                    enviarDatosCompletos_119()

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
        y
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

// function tablaSucur719() {
//     _inputControl('reset');
//     validarInputs(
//         {
//             form: '#Sucursal719',
//             orden: "1"
//         },
//         function () { validarDeshabilitarDesde() },
//         function () {
//             $sucursal719 = $('#sucur719').val();
//             tablaEntrad719()

//         }
//     )
// }
// function tablaEntrad719() {
//     validarInputs(
//         {
//             form: '#Entrada719',
//             orden: "1"
//         },
//         function () { tablaSucur719() },
//         function () {
//             $entrad719 = $('#entra719').val();
//             tablaSalid719()

//         }
//     )
// }
// function tablaSalid719() {
//     validarInputs(
//         {
//             form: '#Salida719',
//             orden: "1"
//         },
//         function () { tablaEntrad719() },
//         function () {
//             $salida719 = $('#sale719').val();
//             tablaFrec719()

//         }
//     )
// }
// function tablaFrec719() {
//     validarInputs(
//         {
//             form: '#Frecuencia719',
//             orden: "1"
//         },
//         function () { tablaSalid719() },
//         function () {
//             $frecuencia719 = $('#frecue719').val();
//             datosTabla719()

//         }
//     )
// }

// function datosTabla719() {
//     if ($sucursal719 == '') {
//         $('#TABLAPROFES719 tbody').append(
//             '<tr>' +
//             '<td>' + $sucursal719 + '</td>' +
//             '<td>' + $entrad719 + '</td>' +
//             '<td>' + $salida719 + '</td>' +
//             '<td>' + $frecuencia719 + '</td>' +
//             '</tr>'
//         )
//         if ($sucursal719 == '') {
//             _inputControl('reset');
//             popUpMensajeImpresion_119()
//         } else {
//             console.debug('con datos')
//             _inputControl('reset');
//             datosTablaDos719()
//         }
//         // console.debug('sin datos')
//         // datosTablaDos719()
//     }
//     else {
//         $('#TABLAPROFES719 tbody').append(
//             '<tr>' +
//             '<td>' + $sucursal719 + '</td>' +
//             '<td>' + $entrad719 + '</td>' +
//             '<td>' + $salida719 + '</td>' +
//             '<td>' + $frecuencia719 + '</td>' +
//             '</tr>'
//         )
//         if ($sucursal719 == '') {
//             _inputControl('reset');
//             popUpMensajeImpresion_119()
//         } else {
//             console.debug('con datos')
//             _inputControl('reset');
//             tablaSucurDos719()
//         }

//         // console.debug('con datos')
//         // tablaSucurDos719()
//     }
// }


// function tablaSucurDos719() {
//     _inputControl('reset');
//     validarInputs(
//         {
//             form: '#Sucursal719',
//             orden: "1"
//         },
//         function () { validarDeshabilitarDesde() },
//         function () {
//             $sucursalDos719 = $('#sucur719').val();
//             tablaEntradDos719()

//         }
//     )
// }
// function tablaEntradDos719() {
//     validarInputs(
//         {
//             form: '#Entrada719',
//             orden: "1"
//         },
//         function () { tablaSucurDos719() },
//         function () {
//             $entradDos719 = $('#entra719').val();
//             tablaSalidDos719()

//         }
//     )
// }
// function tablaSalidDos719() {
//     validarInputs(
//         {
//             form: '#Salida719',
//             orden: "1"
//         },
//         function () { tablaEntradDos719() },
//         function () {
//             $salidaDos719 = $('#sale719').val();
//             tablaFrecDos719()

//         }
//     )
// }
// function tablaFrecDos719() {
//     validarInputs(
//         {
//             form: '#Frecuencia719',
//             orden: "1"
//         },
//         function () { tablaSalidDos719() },
//         function () {
//             $frecuenciaDos719 = $('#frecue719').val();
//             datosTablaDos719()

//         }
//     )
// }


// function datosTablaDos719() {
//     if ($sucursalDos719 == '') {
//         _inputControl('reset');
//         $('#TABLAPROFESUNO719 tbody').append(
//             '<tr>' +
//             '<td>' + $sucursalDos719 + '</td>' +
//             '<td>' + $entradDos719 + '</td>' +
//             '<td>' + $salidaDos719 + '</td>' +
//             '<td>' + $frecuenciaDos719 + '</td>' +
//             '</tr>'
//         )
//         console.debug('sin datos')
//         _inputControl('reset');
//         popUpMensajeImpresion_119()
//     }
//     else {
//         $('#TABLAPROFESUNO719 tbody').append(
//             '<tr>' +
//             '<td>' + $sucursalDos719 + '</td>' +
//             '<td>' + $entradDos719 + '</td>' +
//             '<td>' + $salidaDos719 + '</td>' +
//             '<td>' + $frecuenciaDos719 + '</td>' +
//             '</tr>'
//         )
//         if ($sucursal719 == '') {
//             _inputControl('reset');
//             popUpMensajeImpresion_119()
//         } else {
//             console.debug('con datos')
//             _inputControl('reset');
//             tablaSucur719()
//         }

//     }
// }




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
    CON851P('01', volverDeshab, temporalHorarios)
}

function volverDeshab() {

    validarDeshabilitarDesde();
}

function temporalHorarios() {
    $.ajax({
        data: { array: datosTablaEnvio_119, sesion: localStorage.key_sesion },
        type: 'POST',
        async: false,
        url: get_url('frameworks/scripts/php/_datosTabla_SAL719.php')
    }).done(function (data) {
        var res = data.split('|');
        if (res[0].trim() == '00') {
            enviarDatosCompletos_119();
        } else {
            plantillaError(res[0], res[1], res[2]);
        }

    })

}

function enviarDatosCompletos_119() {
    console.debug('enviar datos ')
    var identificacion = cerosIzq($identificacion_global.trim(), 10)
    var detalle = espaciosDer($("#detalle_119").val(), 30)
    var registro = espaciosDer($("#registro_ser119").val().trim(), 10)
    var atiende = $("#profesion_119").val()
    var contrato = cerosIzq($contrato119, 1)
    var porcenMed = cerosIzq($("#medico_119").val(), 3)
    var estado = cerosIzq($estado119, 1)
    var ctaRet = cerosIzq($("#cuentaRte_119").val().trim(), 12)
    var divCup = cerosIzq($("#division_119").val(), 2)
    var sucursal = cerosIzq($("#sucursal_119").val(), 2)

    var medicamentos
    if ($("#Medicamentos_119").prop('checked')) { medicamentos = 'S' } else { medicamentos = 'N' }
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

    var espec1 = cerosIzq($("#espec1_119").val(), 3)
    var espec2 = cerosIzq($("#espec2_119").val(), 3)
    var espec3 = cerosIzq($("#espec3_119").val(), 3)
    var espec4 = cerosIzq($("#espec4_119").val(), 3)
    var espec5 = cerosIzq($("#espec5_119").val(), 3)

    var oper1 = cerosIzq($("#operAsig1_119").val(), 4)
    var oper2 = cerosIzq($("#operAsig2_119").val(), 4)
    var oper3 = cerosIzq($("#operAsig3_119").val(), 4)
    var oper4 = cerosIzq($("#operAsig4_119").val(), 4)
    var oper5 = cerosIzq($("#operAsig5_119").val(), 4)

    var intMin = cerosIzq($("#asigCita_ser119").val(), 2)
    var cantMax = cerosIzq($("#cantMaxCitas_Ser119").val(), 3)

    // var formaAgen
    // if ($("#agenExcep_ser119").prop('checked')) { formaAgen = 'S' } else { formaAgen = 'N' }
    // var sobreAgen
    // if ($("#sobreAgen_ser119").prop('checked')) { sobreAgen = 'S' } else { sobreAgen = 'N' }

    var agenda = $AGENDA.substring(0, 1);
    var sobreagn = $SOBREAGND.substring(0, 1);
    var rango = cerosIzq($rangoBloqueo119, 2)


    var fechaDesde = parseInt(moment($_fechaDeshabDesde_119).format("YYYYMMDDHHmm"))
    if (isNaN(fechaDesde)) {
        fechaDesde = 0
        fechaDesde = cerosIzq(fechaDesde, 12)
    } else {
        fechaDesde = cerosIzq(fechaDesde, 12)
    }

    var fechaHasta = parseInt(moment($_fechaDeshabHasta_119).format("YYYYMMDDHHmm"));
    console.log(fechaHasta.length, fechaHasta == NaN, fechaHasta == "NaN");
    if (isNaN(fechaHasta)) {
        fechaHasta = 0
        fechaHasta = cerosIzq(fechaHasta, 12)
    } else {
        fechaHasta = cerosIzq(fechaHasta, 12)
    }
    var consultasTer;


    if ($("#impDVD_119").prop('checked')) { $impDvd119 = 'S' } else { $impDvd119 = 'N' }
    if ($("#impMenBir_119").prop('checked')) { $impMenBir119 = 'S' } else { $impMenBir119 = 'N' }
    if ($("#impMenNorm_119").prop('checked')) { $impMenNorm119 = 'S' } else { $impMenNorm119 = 'N' }
    if ($("#asocRad_119").prop('checked')) { $asocRad119 = 'S' } else { $asocRad119 = 'N' }

    var verificarTabla = $val_Tabla_119;

    LLAMADO_DLL({
        dato: [$_NOVEDAD, identificacion, registro, medicamentos, procQuir, procDiag, imagen, servicios,
            consultasTer, promPrev, espec1, espec2, espec3, espec4, espec5, intMin, oper1, oper2, oper3,
            rango, ctaRet, cantMax, divCup, fechaDesde, fechaHasta, sobreagn, $asocRad119, agenda,
            estado, divCup, atiende, contrato, porcenMed, $impMenBir119, $impMenNorm119,
            $impDvd119, oper4, oper5, detalle, sucursal],
        // callback: validarEliminiarRegistro2_719,
        // dato: [$_NOVEDAD, identificacion, detalle, registro, atiende, contrato, porcenMed, estado, ctaRet,
        //     divCup, sucursal, medicamentos, procQuir, procDiag, imagen, servicios, consultasTer, promPrev,
        //     espec1, espec2, espec3, espec4, espec5, oper1, oper2, oper3, oper4, oper5, intMin, cantMax,
        //     agenda, sobreagn, rango, fechaDesde, fechaHasta, verificarTabla, $impDvd119, $impMenBir119, $impMenNorm119, $asocRad119],
        callback: validarEliminiarRegistro2_719,
        nombredll: 'SAL719-03',
        carpeta: 'SALUD'
    })
}

function validarEliminiarRegistro2_719(data) {
    console.debug(data, 'respuesta dll')
    loader('hide');
    var rdll = data.split('|');

    if (rdll[0].trim() == '00') {
        var msj
        switch ($_NOVEDAD) {
            case '7': msj = 'Creado correctamente'
                break;
            case '8': msj = 'Modificado correctamente'

        }
        jAlert({ titulo: 'Notificacion', mensaje: msj },
            function () {
                _toggleNav();
                console.log('fin del programa')
            });
    } else {
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}

