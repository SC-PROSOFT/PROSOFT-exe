/* NOMBRE RM --> SER119 // NOMBRE ELECTR --> SAL719 */

// import { loadavg } from "os";

var arraySucursal_119, arrayDivision_119, arrayMaestros_119, arrayTerceros119, arrayProfesionales119, $_NovedSal719, arrayDatosCompletos119, arrayProfesion_119, arrayOperador_119, arrayHorProf_119 = [];
var arrayHorProfMoment_119, $novPopUp
var salas119;
var fechaActual119
var mayorRet_119, teclaFuncEspec_119;

var $nitUsuario119, $rangoBloqueo119, $contrato119, $estado119
var $impDvd119, $impMenBir119, $impMenNorm119, $asocRad119, $val_Tabla_119

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

$("#desAgenDesde_ser119").each(function (index, element) {
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
        { input: 'operAsig5', app: '119', funct: _ventanaOperador719 }
        // { input: 'profesion', app: '119', funct: _ventanaProfesion719 }

    ]);
    datosTerceros719();
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
        switch (parseInt($_NovedSal719)) {
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
        titulo: "Ventana De Terceros",
        columnas: ["COD", "NOMBRE"],
        data: arrayTerceros119,
        callback_esc: function () {
            modificar719()
        },
        callback: function (data) {
            // var cedula = cerosIzq(data.codigo, 10)
            $("#identificacion_119").val(data.COD)
            $("#nombre_119").val(data.NOMBRE);
            _enterInput('#identificacion_119');
        }
    });
}

function f8Profesionales719() {
    _ventanaDatos({
        titulo: "Ventana De Terceros",
        columnas: ["NOMBRE", "IDENTIFICACION"],
        data: arrayProfesion_119,
        callback_esc: function () {
            modificar719()
        },
        callback: function (data) {
            var cedula = cerosIzq(data.IDENTIFICACION, 10)
            $("#identificacion_119").val(cedula)
            $("#nombre_119").val(data.NOMBRE);
            _enterInput('#identificacion_119');
        }
    });
}

function _ventanaCuentRte719(e) { // Habilitar F8
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA PLAN DE CUENTAS",
            columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "NOMBRE_MAE", "TIPO_MAE"],
            data: arrayMaestros_119,
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
            titulo: "Ventana De Divisiones",
            columnas: ["COD", "DESCRIP"],
            data: arrayDivision_119,
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


// DLLS

function crearJsonTerceros119() {
    let datosEnvio119 = datosEnvio();

    var url = urlDll('CON802', 'contab')

    SolicitarDll({ datosh: datosEnvio119 }, on_crearJsonTerceros_119, url);
}

// inicio json //
function datosTerceros719() {
    data = [];
    data.nombreFd = "TERCEROS";
    data.busqueda = '';
    obtenerDatosCompletos(data, function (data) {
        arrayTerceros119 = data.TERCEROS;
        arrayTerceros119.pop();
        datosMaestros719()
    });
}

function datosMaestros719() {
    data = [];
    data.nombreFd = "CTA-MAYOR";
    data.busqueda = '';
    obtenerDatosCompletos(data, function (data) {
        arrayMaestros_119 = data.MAESTROS;
        arrayMaestros_119.pop();
        datosProfesion719()
    });
}

function datosProfesion719() {
    data = [];
    data.nombreFd = "PROFESIONALES";
    data.busqueda = '';
    obtenerDatosCompletos(data, function (data) {
        arrayProfesion_119 = data.ARCHPROF;
        arrayProfesion_119.pop();
        datosDivision719()
    });
}

function datosDivision719() {
    data = [];
    data.nombreFd = "DIVISION";
    data.busqueda = '';
    obtenerDatosCompletos(data, function (data) {
        arrayDivision_119 = data.CODIGOS;
        arrayDivision_119.pop();
        // datosOperador719()
    });
    CON850(evaluarNovedad119);
}


// PDTE POR REALIZAR EN DATOSCOMPLETOS
// function datosDivision719() {
//     data = [];
//     data.nombreFd = "OPERADOR";
//     data.busqueda = '';
//     obtenerDatosCompletos(data, function (data) {
//         arrayOperador_119 = data.OPER;
//         arrayOperador_119.pop();
//     });
//     CON850(_evaluarCON850);
// }


/// FIN DLL /// 

// NOVEDAD //
function evaluarNovedad119(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    $_NovedSal719 = novedad.id;
    switch (parseInt(novedad.id)) {

        case 7:
        case 8:
        case 9: modificar_119();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedad_119').val(novedad.id + ' - ' + novedad.descripcion)
}

function modificar_119() {

    validarInputs(
        {
            form: '#validarIdentificacion',
            orden: "1"
        },
        function () { CON850(evaluarNovedad119); },
        function () {
            var Identificacion119 = $('#identificacion_119').val();
            var busquedaArray = busquedaTerceros119(Identificacion119);

            $identificacion_global = Identificacion119

            switch (parseInt($_NovedSal719)) {
                case 7:
                    //console.log("pare novedad nuevo")
                    if (!busquedaArray) {
                        $("#nombre_119").val(busquedaArray.NOMBRE.trim());
                        detalle_119()
                    } else {
                        CON851('00', '00', null, 'error', 'error');
                        modificar_119()
                    }
                    break;
                case 8:
                case 9:
                    if (!busquedaArray) {
                        // $('#nombre_119').val(busquedaArray.NOMBRE.trim());
                        // crearJsonDatosCompletos(busquedaArray.IDENTIFICACION);
                        datosProfes719()
                        
                    } else {
                        CON851('01', '01', null, 'error');
                        modificar_119()
                        $('#nombre_119').val(busquedaArray.NOMBRE.trim());
                    }
                    break;
            }

        }
    )
}


// llamado DLL PROF-COMPLETOS
// function datosProfes719() {
//     data = [];
//     data.nombreFd = "PROFESIONAL_DOS";
//     data.busqueda = '';
//     obtenerDatosCompletos(data, function (data) {
//         arrayProfesionales119 = data.PERSATI;

//         // ctaMayor_711()
        
//     alert(arrayProfesionales119, 'datos llegada' )
//     });
//     alert(arrayProfesionales119, 'datos llegada' )

// }

function crearJsonDatosCompletos(identificacion) {

    loader('show');
    identificacion = cerosIzq(identificacion, 10)

    let datosEnvio119 = datosEnvio();
    datosEnvio119 += identificacion;

    //console.log(datosEnvio119)
    var url = urlDll('SAL719-01', 'salud')

    SolicitarDll({ datosh: datosEnvio119 }, on_crearJsonDatosCompletos, url);
}

function on_crearJsonDatosCompletos(data) {
    var rdll = data.split('|');
    //console.log(rdll[0]);
    var nombrejs = 'PERSATI-' + localStorage.getItem('key_sesion');
    if (rdll[0].trim() == '00') {
        var rutaJson = urlJson('JSC-PERSATI-');
        //console.log(rutaJson);
        SolicitarDatos(
            null,
            function (data) {
                //console.log(data)
                arrayDatosCompletos119 = data.PERSATI
                eliminarJson(nombrejs);
                mostrarDatosCompletos(arrayDatosCompletos119[0]);
            },
            rutaJson
        );
    } else {
        CON852(rdll[0], rdll[1], rdll[2]);
    }
}

function mostrarDatosCompletos(datos) {
    mayorRet_119 = datos.MAYORRET.trim();
    console.log(mayorRet_119)

    $("#nombre_119").val(datos.DESCRIP.trim());
    $('#oper_ser119').val(datos.OPER.trim());
    $('#fecha_ser119').val(datos.FECHA.trim());

    $('#detalle_119').val(datos.DETALLE.trim());
    $('#registro_ser119').val(datos.REGISTRO.trim());

    $('#profesion_119').val(datos.ATIENDE.trim());
    $('#descriprof_119').val(search_array_Profesion119(datos.ATIENDE.trim()));


    $('#cuentaRte_119').val(datos.CTARET.trim());
    $('#descRetenfuente_119').val(datos.NOMCTA.trim());

    $('#division_119').val(datos.DIVISION.trim());
    $('#descCUPS_119').val(datos.DESCDIV.trim());

    $('#sucursal_119').val(datos.SUCURSAL.trim());
    $('#descSuc_119').val(datos.DESCSUC.trim());

    validarChecked('#Medicamentos_119', datos.CL1.trim())
    validarChecked('#procQuirur_ser119', datos.CL2.trim())
    validarChecked('#procDiag_ser119', datos.CL3.trim())
    validarChecked('#imagen_ser119', datos.CL4.trim())
    validarChecked('#serv_ser119', datos.CL5.trim())
    validarChecked('#consulter_ser119', datos.CL6.trim())
    validarChecked('#promPrev_ser119', datos.CL7.trim())

    var contratacion_119 = datos.CONTRATO.trim();
    console.log(contratacion_119)
    switch (contratacion_119) {
        case "1": $('#contratacion_119').val('Valor Fijo');

            break;
        case "2":
            $('#contratacion_119').val('% Sobre Facturacion');
            $('#medico_119').val(datos.PORCENT.trim());
            break;
    }


    var estadoAct_119 = datos.ESTADO.trim();
    switch (estadoAct_119) {
        case "1": $('#estAct_119').val('Activo')

            break;
        case "2": $('#estAct_119').val('Inactivo')

            break;
    }

    $('#espec1_119').val(datos.ESP1.trim());
    $('#DescEspec1_119').val(datos.DESCESP1.trim());

    $('#espec2_119').val(datos.ESP2.trim());
    $('#DescEspec2_119').val(datos.DESCESP2.trim());
    $('#espec3_119').val(datos.ESP3.trim());
    $('#DescEspec3_119').val(datos.DESCESP3.trim());
    $('#espec4_119').val(datos.ESP4.trim());
    $('#DescEspec4_119').val(datos.DESCESP4.trim());
    $('#espec5_119').val(datos.ESP5.trim());
    $('#DescEspec5_119').val(datos.DESCESP5.trim());



    $('#operAsig1_119').val(datos.OPERAUT.trim());
    $('#descAsig1_119').val(search_operador_119(datos.OPERAUT.trim()));

    $('#operAsig2_119').val(datos.OPERCIRU.trim());
    $('#descAsig2_119').val(search_operador_119(datos.OPERCIRU.trim()));

    $('#operAsig3_119').val(datos.OPEROTR.trim());
    $('#descAsig3_119').val(search_operador_119(datos.OPEROTR.trim()));

    $('#operAsig4_119').val(datos.OPERAUT4.trim());
    $('#descAsig4_119').val(search_operador_119(datos.OPERAUT4.trim()));

    $('#operAsig5_119').val(datos.OPERAUT5.trim());
    $('#descAsig5_119').val(search_operador_119(datos.OPERAUT5.trim()));

    $('#asigCita_ser119').val(datos.INTMIN.trim());
    $('#cantMaxCitas_Ser119').val(datos.CITAS.trim());

    validarChecked('#agenExcep_ser119', datos.FORMAGEN.trim())
    validarChecked('#sobreAgen_ser119', datos.SOBREAGEN.trim())

    var fechaDesde_119 = datos.ANOINI.trim();
    fechaDesde_119 += datos.MESINI.trim();
    fechaDesde_119 += datos.DIAINI.trim();
    fechaDesde_119 += datos.HRINI.trim();

    var fechaHasta_119 = datos.ANOFIN.trim()
    fechaHasta_119 += datos.MESFIN.trim();
    fechaHasta_119 += datos.DIAFIN.trim();
    fechaHasta_119 += datos.HRFIN.trim();

    //console.log(fechaDesde_119)
    if (fechaDesde_119 != "0000000000") {
        var fechaDesdeMask_119 = buscarMaskFecha('desAgenDesde_ser119')
        fechaDesdeMask_119.unmaskedValue = fechaDesde_119

        var fechaHastaMask_119 = buscarMaskFecha('desAgenHasta_ser119')
        fechaHastaMask_119.unmaskedValue = fechaHasta_119
    }

    /*
        for (var i in datos.TABLA) {
            var suc1 = ('sucursal1_' + i)
            $('#' + suc1).val(datos.TABLA[i].SUCURSAL1);
        }*/

    for (var i in datos.TABLA) {
        var index = buscarMaskHora('horaIngreso1_' + i)
        // //console.log(i)
        // //console.log(index)
        maskHora[index].unmaskedValue = datos.TABLA[i].HORAING1
    }

    for (var i in datos.TABLA) {
        var index = buscarMaskHora('horaSalida1_' + i)
        // //console.log(i)
        // //console.log(index)
        maskHora[index].unmaskedValue = datos.TABLA[i].HORARET1
    }

    for (var i in datos.TABLA) {
        var fre1 = ('fre1_' + i)
        $('#' + fre1).val(datos.TABLA[i].INTMINTAB1);
    }

    ////////////////////////////////////////////////////////////

    /*
        for (var i in datos.TABLA) {
            var suc2 = ('sucursal2_' + i)
            $('#' + suc2).val(datos.TABLA[i].SUCURSAL2);
        }*/

    for (var i in datos.TABLA) {
        var index = buscarMaskHora('horaIngreso2_' + i)
        // //console.log(i)
        // //console.log(index)
        maskHora[index].unmaskedValue = datos.TABLA[i].HORAING2
    }

    for (var i in datos.TABLA) {
        var index = buscarMaskHora('horaSalida2_' + i)
        // //console.log(i)
        // //console.log(index)
        maskHora[index].unmaskedValue = datos.TABLA[i].HORARET2
    }

    for (var i in datos.TABLA) {
        var fre2 = ('fre2_' + i)
        $('#' + fre2).val(datos.TABLA[i].INTMINTAB2);
    }

    //////////////////////////////////////////////////

    /*
        for (var i in datos.TABLA) {
            var suc3 = ('sucursal3_' + i)
            $('#' + suc3).val(datos.TABLA[i].SUCURSAL3);
        }
    
        for (var i in datos.TABLA) {
            var index = buscarMaskHora('horaIngreso3_' + i)
            // //console.log(i)
            // //console.log(index)
            maskHora[index].unmaskedValue = datos.TABLA[i].HORAING3
        }
    
        for (var i in datos.TABLA) {
            var index = buscarMaskHora('horaSalida3_' + i)
            // //console.log(i)
            // //console.log(index)
            maskHora[index].unmaskedValue = datos.TABLA[i].HORARET3
        }
    
        for (var i in datos.TABLA) {
            var fre3 = ('fre3_' + i)
            $('#' + fre3).val(datos.TABLA[i].INTMINTAB3);
        }
    
    
    
        /////////////////////////////////////////////////
    
        for (var i in datos.TABLA) {
            var suc4 = ('sucursal4_' + i)
            $('#' + suc4).val(datos.TABLA[i].SUCURSAL4);
        }
    
        for (var i in datos.TABLA) {
            var index = buscarMaskHora('horaIngreso4_' + i)
            // //console.log(i)
            // //console.log(index)
            maskHora[index].unmaskedValue = datos.TABLA[i].HORAING4
        }
    
        for (var i in datos.TABLA) {
            var index = buscarMaskHora('horaSalida4_' + i)
            // //console.log(i)
            // //console.log(index)
            maskHora[index].unmaskedValue = datos.TABLA[i].HORARET4
        }
    
        for (var i in datos.TABLA) {
            var fre4 = ('fre4_' + i)
            $('#' + fre4).val(datos.TABLA[i].INTMINTAB4);
        }*/


    loader('hide');
    switch (parseInt($_NovedSal719)) {
        case 8:
            console.log('entro a cambiar datos')
            detalle_119();
            break;
        case 9:
            console.log('entro a eliminar datos')
            CON851P('54', modificar_119, eliminarRegistro_119)
            break;
    }
}


function eliminarRegistro_119() {
    console.log("Estoy eliminando el registro");
    var identificacion = cerosIzq($identificacion_global, 10)
    console.log(identificacion)
    LLAMADO_DLL({
        dato: [$_NovedSal719, identificacion],
        callback: validarEliminiarRegistro1_119,
        nombredll: 'SAL719-03',
        carpeta: 'SALUD'
    })
}

function validarEliminiarRegistro1_119(data) {
    console.log(data);
    console.log("elimnando");
    loader('hide');
    var rdll = data.split('|');

    if (rdll[0].trim() == '00') {
        jAlert({ titulo: 'Notificacion', mensaje: "Eliminado correctamente" }, function () { _toggleNav(); });
    } else {
        console.log(rdll)
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
            _ventanaProfesion_119();
        }
    )
}


function _ventanaProfesion_119() {
    //console.log('entro al f8 de profesion')
    _ventanaDatos({
        titulo: "Personal que atiende",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: arrayProfesion_119,
        callback_esc: function () {
            registro_119()
        },
        callback: function (data) {
            $("#profesion_119").val(data.CODIGO.trim())
            $("#descriprof_119").val(data.DESCRIPCION.trim())
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

                //console.log(mayRet + ' ' + mayorRet_119)
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

    for (var i in arrayMaestros_119) {
        if (arrayMaestros_119[i].CTA_MAY.trim() == cuenta) {
            if (arrayMaestros_119[i].PORCENT_RET.trim().length > 0) {

                retornar = arrayMaestros_119[i].NOMBRE_MAE.trim();
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
            var busquedaDivCups = search_Division119(divCups)

            if (divCups.trim().length > 0) {
                if (!busquedaDivCups) {
                    CON851('01', '01', null, 'error', 'error');
                    divisionCups_119()
                } else {
                    $("#descDiv_119").val(busquedaDivCups)
                    sucursal_119()
                }
            } else {
                sucursal_119();
            }
        }
    )
}

function search_Division119(codigo) {

    var retornar = false;
    for (var i in arrayDivision_119) {
        if (arrayDivision_119[i].CODIGO.trim() == codigo) {
            retornar = arrayDivision_119[i].DESCRIPCION.trim();
            break;
        }
    }
    return retornar;
}



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
            var sucur = $("#sucursal_119").val()
            var busquedaSucursal = search_Sucursal_119(sucur)

            if (sucur.trim().length > 0) {
                switch (busquedaSucursal) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        sucursal_119()
                        break;
                    default:
                        $("#descSuc_119").val(busquedaSucursal)
                        tipoContratacion_119()
                }
            } else {
                tipoContratacion_119();
            }
        }
    )

}


function tipoContratacion_119() {
    var codTipoContratacion = '[{"COD": "1","DESCRIP": "Valor Fijo"},{"COD": "2","DESCRIP": "% Sobre Facturacion"}]'
    var arrayContratacion_119 = JSON.parse(codTipoContratacion)

    POPUP({
        array: arrayContratacion_119,
        titulo: 'Tipo De Contratacion'
    }, function (data) {
        switch (data.id.trim()) {
            case '1':
                $('#contratacion_119').val(data.id.trim() + '. ' + data.descripcion.trim())
                $contrato119 = data.id.trim()
                estadoAct_119()
                break;
            case '2':
                $('#contratacion_119').val(data.id.trim() + '. ' + data.descripcion.trim())
                $contrato119 = data.id.trim()
                validarPorcentMed()
                break;
            case 'F':
                sucursal_119()
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
            var medico = $('#medico_119').val()

            if (medico > 100) {
                validarPorcentMed()
            } else if (medico == 0) {
                jAlert(
                    { titulo: 'Atencion ', mensaje: '<b>Mensaje: </b>' + 'Si el tipo de contratacion es 2 y el % asignado es 0, el sistema asume el % del grupo del cup' }, estadoAct_119);

            } else if (medico > 0 && medico <= 100) {
                estadoAct_119()
            }
        }

    )
}


function estadoAct_119() {
    console.log('entro a estado actual')
    var estadoActual = '[{"COD": "1","DESCRIP": "ACTIVO"},{"COD": "2","DESCRIP": "INACTIVO"}]'
    var arrayEstadoAct_119 = JSON.parse(estadoActual)

    POPUP({
        array: arrayEstadoAct_119,
        titulo: 'Estado Actual'
    }, function (data) {
        if (data.id.trim() == 'F') {
            tipoContratacion_119()
        } else {
            $('#estAct_119').val(data.id.trim() + '. ' + data.descripcion.trim())
            $estado119 = data.id.trim()
            validarEspecialidad_119(1);
        }
    })
}

function search_Sucursal_119(codigo) {

    var retornar = false;
    for (var i in arraySucursal_119) {
        if (arraySucursal_119[i].CODIGO.trim() == codigo) {
            retornar = arraySucursal_119[i].DESCRIPCION.trim();
            break;
        }
    }
    return retornar;
}


function search_Especialidad_119(codigo) {
    var retornar = false;

    //console.log(codigo + 'search operador')

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
            //console.log($('#operAsig' + id + '_119').val() + 'operAsig' + id + 'validar operador')
            var codigoEspec_119 = $('#espec' + id + '_119').val();
            var desEspec_119 = search_Especialidad_119(codigoEspec_119)

            if (codigoEspec_119.trim().length > 0) {
                switch (desEspec_119) {
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

    //console.log(codigo + 'search operador')
    if (codigo === 'XXXX') {
        retornar = 'TODOS LOS OPERADORES';
    } else {
        for (var i in arrayOperador_119) {
            if (arrayOperador_119[i].CODIGO.trim() == codigo) {
                retornar = arrayOperador_119[i].DESCRIPCION.trim();
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
            //console.log($('#operAsig' + id + '_119').val() + 'operAsig' + id + 'validar operador')

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
                        validarOperador_119(parseInt(id) + 1)
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
                fechaActual119 = fechaActualGlobal()
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
            if ($('#asigCita_ser119').val().length > 0) {
                agenExcep_119();
            } else {
                $('#agenExcep_ser119').prop('checked', false);
                validarDeshabilitarDesde()
            }

        }
    )

}

function agenExcep_119() {
    bootbox.confirm({
        size: "small",
        message: "Usar agendamiento por excepciones?",
        callback: function (result) { /* result is a boolean; true = OK, false = Cancel*/
            console.log(result)
            if (result == true) {
                $('#agenExcep_ser119').prop('checked', true);
                bootbox.hideAll()
                validarPopup_119();
            }
            else {
                $('#agenExcep_ser119').prop('checked', false);
                bootbox.hideAll()
                validarDeshabilitarDesde()
            }

        }
    })
}

function validarPopup_119() {
    console.log('va a abrir pop up de fehca y horario de atencion')
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
                //console.log(data)
                arrayHorProf_119 = data.AGENDA
                arrayHorProf_119.pop()
                console.log(arrayHorProf_119)
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
        console.error(rdll[1]);
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
        modificarArrayHorario_119()
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
                    validar_Confirmar_119()
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
        bajarDatosTabla_119()
    }
}


function popUpMensajeImpresion_119() {
    if ($_NovedSal719 == '7') {
        $("#impDVD_119").prop('checked', false)
        $("#impMenBir_119").prop('checked', false)
        $("#impMenNorm_119").prop('checked', false)
        $("#asocRad_119").prop('checked', false)
    } else {
        var data = arrayDatosCompletos119[0];

        if (data.DATO_DVD.trim() == 'S') { $("#impDVD_119").prop('checked', true) } else { $("#impDVD_119").prop('checked', false) }
        if (data.DATO_BIRAD.trim() == 'S') { $("#impMenBir_119").prop('checked', true) } else { $("#impMenBir_119").prop('checked', false) }
        if (data.DATO_NORM.trim() == 'S') { $("#impMenNorm_119").prop('checked', true) } else { $("#impMenNorm_119").prop('checked', false) }
        if (data.DATO_ASOCI.trim() == 'S') { $("#asocRad_119").prop('checked', true) } else { $("#asocRad_119").prop('checked', false) }
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
                    if ($("#impDVD_119").prop('checked')) { $impDvd119 = 'S' } else { $impDvd119 = 'N' }
                    if ($("#impMenBir_119").prop('checked')) { $impMenBir119 = 'S' } else { $impMenBir119 = 'N' }
                    if ($("#impMenNorm_119").prop('checked')) { $impMenNorm119 = 'S' } else { $impMenNorm119 = 'N' }
                    if ($("#asocRad_119").prop('checked')) { $asocRad119 = 'S' } else { $asocRad119 = 'N' }
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
        url: 'http://' + localStorage.ip_server.trim() + '/frameworks/inc/_datosTabla_SER119.php'
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

    var formaAgen
    if ($("#agenExcep_ser119").prop('checked')) { formaAgen = 'S' } else { formaAgen = 'N' }
    var sobreAgen
    if ($("#sobreAgen_ser119").prop('checked')) { sobreAgen = 'S' } else { sobreAgen = 'N' }

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




    var verificarTabla = $val_Tabla_119

    LLAMADO_DLL({
        dato: [$_NovedSal719, identificacion, detalle, registro, atiende, contrato, porcenMed, estado, ctaRet,
            divCup, sucursal, medicamentos, procQuir, procDiag, imagen, servicios, consultasTer, promPrev,
            espec1, espec2, espec3, espec4, espec5, oper1, oper2, oper3, oper4, oper5, intMin, cantMax,
            formaAgen, sobreAgen, rango, fechaDesde, fechaHasta, verificarTabla, $impDvd119, $impMenBir119, $impMenNorm119, $asocRad119],
        callback: validarEliminiarRegistro2_119,
        nombredll: 'SAL719-03',
        carpeta: 'SALUD'
    })
}

function validarEliminiarRegistro2_119(data) {
    console.debug(data)
    loader('hide');
    var rdll = data.split('|');

    if (rdll[0].trim() == '00') {
        var msj
        switch ($_NovedSal719) {
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
        //CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}


/*/ busqueda /*/
function busquedaTerceros119(data) {
    var retornar = false;
    for (var i in arrayTerceros119) {
        if (arrayTerceros119[i].IDENTIFICACION == data) {
            retornar = arrayTerceros119[i];
            break;
        }
    }
    return retornar;

}

function search_array_Profesion119(data) {
    var retornar = false;

    for (var i in arrayProfesion_119) {
        if (arrayProfesion_119[i].CODIGO.trim() == data) {
            retornar = arrayProfesion_119[i].DESCRIPCION.trim();
            break;
        }
    }
    return retornar;

}
