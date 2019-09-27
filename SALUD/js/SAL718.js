/* NOMBRE RM --> SER102C // NOMBRE ELECTR --> SAL718 */


var $_NovedSer101, $_COD_SERV, $_COD_CUPS;

$(document).ready(function () {
    //  _codicontab101();
    crearJsonCups_102c();
});


// --> F8 GRUPO-SERVICIO //
$(document).on('keydown', '#grpSer102c', function (e) {
    if (e.which == 119) {
        _ventanaDatos({
            titulo: "GRUPOS DE SERVICIO",
            columnas: ["COD", "DESCRIP"],
            data: $_COD_SERV,
            callback: function (data) {
                console.debug(data);
                $('#grpSer102c').val(data.COD.trim())
                _enterInput('#grpSer102c');
            }
        });
    }
})


// F8 TABLA-CUPS //
$(document).on('keydown', '#codSer102c', function (e) {
    if (e.which == 119) {
        _ventanaDatos({
            titulo: "VENTANA PLAN DE CUENTAS",
            columnas: ["GRP", "COD", "DESCRIP"],
            data: $_COD_CUPS,
            callback: function (data) {
                console.debug(data);
                $('#codSer102c').val(data.GRP.trim() + data.COD.trim())
                _enterInput('#codSer102c');
            }
        });
    }
})

// DLL CUPS
function crearJsonCups_102c() {
    let datosEnvio101 = datosEnvio();

    var url = urlDll('SER802C', 'SALUD')

    SolicitarDll({ datosh: datosEnvio101 }, datagrpser_102c, url);
}

function datagrpser_102c(data) {
    var respt = data.split('|');
    if (respt[0].trim() == '00') {
        var url = urlJson('JSC-ARCHCUPS');
        console.debug(url);
        SolicitarDatos(
            null,
            function (data) {
                $_COD_CUPS = data.CODIGOS;
                $_COD_CUPS.pop()
                crearJsonServicio_102c();
            },
            url
        );
    } else {
        loader('hide');
        CON852(respt[0], respt[1], respt[2], _toggleNav);
    }
}




// llamado DLL GRUPO-SERVICIO

function crearJsonServicio_102c() {
    let datosEnvio101 = datosEnvio();

    var url = urlDll('SER801', 'SALUD')

    SolicitarDll({ datosh: datosEnvio101 }, datagrpser_101, url);
}


// Llamado DLL CUENTA-MAYOR

function datagrpser_101(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var url = urlJson('JSC-GRUPOSER-');
        console.debug(url);
        SolicitarDatos(
            null,
            function (data) {
                $_COD_SERV = data.CODIGOS
                $_COD_SERV.pop()
                var arrayEliminar = [];      /* FUNCION ELIMINAR JSON*/
                arrayEliminar.push('JSC-ARCHCUPS-' + localStorage.getItem('key_sesion'))
                arrayEliminar.push('JSC-GRUPOSER-' + localStorage.getItem('key_sesion'))
                _eliminarJson(arrayEliminar, on_eliminarJson);
            },
            url
        );
    } else {
        loader('hide');
        CON852(res[0], res[1], res[2], _toggleNav);
    }
}

function on_eliminarJson(data) {
    console.log(data);
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        CON850(_evaluarCON850);
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}



// NOVEDAD //
function _evaluarCON850(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    console.debug(novedad)
    $_NovedSer101 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarConsulta();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedad_102c').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarConsulta() {
    validarInputs(
        {
            form: "#fase1",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {
            var grupo102c = $('#grpSer102c').val();
            var busquedaArray = buscarDescrip_101(grupo102c)

            switch (grupo102c) {

                case grupo102c.trim().length == 0:
                case "PO":
                case "NP":
                case "MQ":
                    CON851('14', '14', null, 'error', 'error');
                    _validarConsulta()
                    break;
                default:
                    switch (parseInt($_NovedSer101)) {
                        case 7:
                            if (!busquedaArray) {
                                detalle101()
                            } else {
                                CON851('00', '00', null, 'error', 'error');
                                _validarConsulta()
                            }
                            break;
                        case 8:

                        case 9:
                            if (!busquedaArray) {
                                CON851('01', '01', null, 'error', 'error');
                                _validarConsulta()
                            } else {
                                _llenarDatSer101(busquedaArray)
                            }
                            break;
                    }
                    break;
            }
        }
    )

}

function _llenarDatSer101(data) {
    $('#grpSer102c').val(data.COD.trim());
    $('#descGrpSer102c').val(data.DESCRIP.trim());
    var codigoCont = data.COD_CUPS.trim()
    if (codigoCont.length > 0) {
        $('#codSer102c').val(codigoCont);
        $('#descCodSer102c').val(data.DESCRIP.trim());
    }

    switch (parseInt($_NovedSer101)) {
        case 8:
            console.log('novedad 8')
            detalle101()
            break;
        case 9:
            CON851P('54', _validarConsulta, llamarSer101_02_101)
            break;

    }
}

function llamarSer101_02_101() {
    let datosEnvio101 = datosEnvio();
    datosEnvio101 += $_NovedSer101;
    datosEnvio101 += '|'

    var ingTerc = parseFloat($('#ingr_terc101').val()) || 0
    ingTerc = ingTerc.toFixed(1).replace(/\./g, '');
    console.log(ingTerc)
    switch (parseInt($_NovedSer101)) {
        case 7:
        case 8:
            datosEnvio101 += cerosIzq($('#codigo101').val(), 2);
            datosEnvio101 += '|'
            datosEnvio101 += espaciosDer($('#descrip101').val(), 25)
            datosEnvio101 += '|'
            datosEnvio101 += cerosIzq($('#ingre_clin101').val(), 3);
            datosEnvio101 += '|'
            datosEnvio101 += cerosIzq(ingTerc, 3);
            console.log(datosEnvio101)
            datosEnvio101 += '|'
            datosEnvio101 += $('#cod_cont101').val();
            break;
        case 9:
            datosEnvio101 += cerosIzq($('#codigo101').val(), 2);
            break;
    }

    var url = urlDll('SER101-02', 'salud')
    console.debug(datosEnvio101)
    SolicitarDll({ datosh: datosEnvio101 }, _limpiarDatos101, url);
}

/// NOVEDAD 7 ////

function detalle101() {
    validarInputs(
        {
            form: '#detalle',
            orden: '1'
        },
        function () { _validarConsulta(); },
        function () { validarPorcen_101('1') }
    )
}

function validarPorcen_101(orden) {
    validarInputs(
        {
            form: '#porcentajes',
            orden: orden
        },
        function () { detalle101(); },
        function () {
            var otro = $('#ingre_clin101').val()
            var tercero = $('#ingr_terc101').val()

            console.log(tercero)
            if ($('#ingr_terc101').val().trim().length > 0) {
                console.log('entro GB')
                if (tercero + otro < 100) {
                    if ($('#cod_cont101').val().trim().length == 0) {
                        $('#cod_cont101').val('2815')
                    }
                    conContab_101()
                } else {
                    validarPorcen_101('2')
                }
            } else {
                llamarSer101_02_101()
            }
        }
    )
}

function conContab_101() {
    validarInputs(
        {
            form: '#contables',
            orden: '1'
        },
        function () { validarPorcen_101('2'); },
        function () {
            console.log('kjvbainaeio')
            var valor = $('#cod_cont101').val()

            var busqueda = buscarCodContb(valor)
            switch (busqueda) {
                case false || undefined:
                    CON851('01', '01', null, 'error', 'error');
                    conContab_101()
                    break;
                default:
                    llamarSer101_02_101()
                    break;
            }
        }

    )
}

function _limpiarDatos101(data) {
    _inputControl('reset');
    _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        var mensaje
        switch (parseInt($_NovedSer101)) {
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
    } else {
        CON852(temp[0], temp[1], temp[2]);
    }
}

// FUNCIONES PARA DATOS NUEVOS

function buscarDescrip_101(data) {
    var retornar = false;
    for (var i in $_COD_SERV) {
        if ($_COD_SERV[i].COD.trim() == data) {
            retornar = $_COD_SERV[i];
            break;
        }
    }

    return retornar;
}

function buscarCodContb(data) {
    var retornar = false;
    console.log(data)
    for (var i in $_COD_CONTAB) {
        var $CUENTA = $_COD_CONTAB[i].CTA_MAY
        $CUENTA += $_COD_CONTAB[i].SUB_CTA
        $CUENTA += $_COD_CONTAB[i].AUX_MAE
        if ($CUENTA == data) {
            retornar = $_COD_CONTAB[i];
            break;
        }
    }

    return retornar;
}


































// var $_DATOS_101, $_NOVEDAD, $_ARTICULOS, $_ALMACENES, $_COSTOS;

// $ip_servidor = '';
// var flagjson = true;
// var contador = 0;
// var nomjson = '';
// var contdato = 0;
// $f = new Date();
// $dia = $f.getDate();
// $mes = $f.getMonth() + 1;
// $anio = $f.getFullYear().toString().slice(2, 4);
// $hora = $f.getHours();
// $minuto = $f.getMinutes();

// $(document).ready(function () {

//     $("#guardar_btn1").hide();
//     $("#guardar_btn3").hide();
//     $("#guardar_btn2").hide();

//     /* MANEJAMOS EL TIMER PARA CONTROLAR LA CREACION DE LOS JSON 1 X 1*/
//     setTimeout(function () {
//         nomjson = 'GRUPOSER';
//         crearjsnglobal('ser101-01', nomjson, 'SALUD');
//         contador++;
//     }, 100);

//     if ($mes.toString().length < 2) $mes = "0" + $mes;
//     if ($dia.toString().length < 2) $dia = "0" + $dia;
//     if ($hora.toString().length < 2) $hora = "0" + $hora;
//     if ($minuto.toString().length < 2) $minuto = "0" + $minuto;



// });
// function _evaluarNovedad_102C(novedad) {
//     _inputControl('reset');
//     _inputControl('disabled');

//     $_NOVEDAD = novedad.id;
//     switch (parseInt(novedad.id)) {

//         case 7: setTimeout(function () {
//             $("#guardar_btn1").show()
//             $("#guardar_btn2").hide()
//             $("#guardar_btn3").hide()
//             validarPrimeraFase('1')
//         }, 100);
//             break;
//         case 8: setTimeout(function () {
//             $("#guardar_btn3").show()
//             $("#guardar_btn1").hide()
//             $("#guardar_btn2").hide()
//             validarPrimeraFase('1')
//         }, 100);
//             break;
//         case 9: setTimeout(function () {
//             $("#guardar_btn2").show()
//             $("#guardar_btn1").hide()
//             $("#guardar_btn3").hide()
//             validarPrimeraFase('1')
//         }, 100);
//             break;
//         default:
//             _toggleNav();
//             break;
//     }
//     $('#novedad_101').val(novedad.id + ' - ' + novedad.descripcion)
// }
// function activar_btn() {
//     console.log('activa btn')
//     $_NOVEDAD = novedad.id;
//     switch ($parseInt(novedad.id)) {
//         case '7':
//             $("#guardar_btn1").show()
//             $("#guardar_btn2").hide()
//             $("#guardar_btn3").hide()
//             $("#guardar_btn1").attr('disabled', false);
//             break;
//         case '8':
//             $("#guardar_btn3").show()
//             $("#guardar_btn1").hide()
//             $("#guardar_btn2").hide()
//             $("#guardar_btn3").attr('disabled', false);
//             break;
//         case '9':
//             $("#guardar_btn2").show()
//             $("#guardar_btn1").hide()
//             $("#guardar_btn3").hide()
//             $("#guardar_btn2").attr('disabled', false);
//             break;

//     }

// }

// function f8archcups() {
//     setTimeout(function () {
//         nomjson = 'ARCHCUPS';
//         crearjsnglobal('SER802C', nomjson, 'SALUD');
//         contador++;
//     }, 100);
// }
// function f8archmae() {
//     setTimeout(function () {
//         nomjson = 'ARCHMAE';
//         crearjsnglobal('CON801', nomjson, 'CONTAB');
//         contador++;
//     }, 100);

// }
// function f8archcosto() {
//     setTimeout(function () {
//         nomjson = 'ARCHCOSTO';
//         crearjsnglobal('CON803', nomjson, 'CONTAB');
//         contador++;
//     }, 100);
// }
// function f8divis() {
//     setTimeout(function () {
//         nomjson = 'DIVIS';
//         crearjsnglobal('INV809-01', nomjson, 'INVENT');
//         contador++;
//     }, 100);
// }


// function search_inarray($codigojson, $nomarray) {
//     switch ($nomarray) {
//         case '$arraygruposer':
//             var retornar = false;
//             for (var i in $arraygruposer.CODIGOS) {
//                 if ($arraygruposer.CODIGOS[i].COD.trim() == $codigojson) {
//                     retornar = $arraygruposer.CODIGOS[i];
//                     break;
//                 }
//             }
//             return retornar;
//         //break;
//         case '$arrayarchcups':
//             var retornar = false;
//             for (var i in $arrayarchcups.CODIGOS) {
//                 if ($arrayarchcups.CODIGOS[i].GRP.trim() + $arrayarchcups.CODIGOS[i].COD.trim() == $codigojson) {
//                     retornar = $arrayarchcups.CODIGOS[i];
//                     break;
//                 }
//             }
//             return retornar;
//         //    break;
//         case '$arraycosto':
//             var retornar = false;
//             for (var i in $arraycosto.CODIGOS) {
//                 if ($arraycosto.CODIGOS[i].COD.trim() == $codigojson) {
//                     retornar = $arraycosto.CODIGOS[i];
//                     break;
//                 }
//             }
//             return retornar;
//         //    break;
//         case '$arrayarchmae':
//             var retornar = false;
//             for (var i in $arrayarchmae.CODIGOS) {
//                 if ($arrayarchmae.CODIGOS[i].CTA_MAY.trim() + $arrayarchmae.CODIGOS[i].SUB_CTA.trim() + $arrayarchmae.CODIGOS[i].AUX_MAE.trim() == $codigojson) {
//                     retornar = $arrayarchmae.CODIGOS[i];
//                     break;
//                 }
//             }
//             return retornar;
//         case '$arraydivis':
//             var retornar = false;
//             for (var i in $arraydivis.CODIGOS) {
//                 if ($arraydivis.CODIGOS[i].COD.trim() == $codigojson) {
//                     retornar = $arraydivis.CODIGOS[i];
//                     break;
//                 }
//             }
//             return retornar;
//         //    break;
//     }

//     return false
// }
// function novedad() {
//     $('#nov_btn').click();

// }
// function validar_btn() {
//     $novedad2 = $('#nombre_nov').text().split(".");

//     switch ($novedad2[0]) {
//         case '7': $("#guardar_btn1").show();
//             $("#guardar_btn2").hide();
//             $("#guardar_btn3").hide();
//             $("#guardar_btn1").attr('disabled', 'disabled');
//             break;
//         case '8': $('#guardar_btn3').show();
//             $("#guardar_btn1").hide();
//             $("#guardar_btn2").hide();
//             $("#guardar_btn3").attr('disabled', 'disabled');
//             break;
//         case '9': $('#guardar_btn2').show();
//             $('#guardar_btn1').hide()
//             $('#guardar_btn3').hide()
//             $("#guardar_btn2").attr('disabled', 'disabled');
//             break;
//     }
// }
// function activar_btn() {
//     console.log('activa btn')
//     switch ($_NOVEDAD) {
//         case '7':
//             $("#guardar_btn1").attr('disabled', false);
//             break;
//         case '8':
//             $("#guardar_btn3").attr('disabled', false);
//             break;
//         case '9':
//             $("#guardar_btn2").attr('disabled', false);
//             break;
//     }
// }
// function validarPrimeraFase(orden) {
//     console.log('primera fase');
//     validarInputs(
//         {
//             form: '#fase1',
//             orden: orden
//         },
//         function () { CON850(_evaluarNovedad_102C); },
//         validargrupo
//     )
// }
// function validargrupo() {
//     //    validar_btn();
//     //    $novedad2 = $('#nombre_nov').text().split(".");
//     var codigojson = $('#grpServicio102c').val();
//     var validacion = search_inarray(codigojson, '$arraygruposer');
//     if (validacion != false) {
//         $('#descGrpSer102c').val(validacion.DESCRIP)
//         setTimeout(function () { validarSegundaFase('1'); }, 100)
//     } else {

//         jAlert({
//             titulo: 'Mensaje ',
//             mensaje: 'No existe código digitado',
//         }, function () {
//             setTimeout(function () { validarPrimeraFase('1'); }, 100)
//         });
//     }
// }
// function validarSegundaFase(orden) {
//     console.log('segunda fase');
//     validarInputs(
//         {
//             form: '#fase2',
//             orden: orden
//         },
//         function () { validarPrimeraFase('1') },
//         validarcodigo
//     )
// }
// function validarcodigo() {  //  funcion    revisar   - diana 
//     validar_btn();
//     //    $novedad2 = $('#nombre_nov').text().split(".");
//     var codigojson = $('#grpServicio102c').val() + $('#codSer102c').val();
//     var validacion = search_inarray(codigojson, '$arrayarchcups');
//     if ($_NOVEDAD == 7) {
//         setTimeout(function () { validarTerceraFase('1') }, 100);
//     } else {
//         if (validacion != false) {
//             $('#descCodSer102c').val(validacion.DESCRIP.trim() + validacion.DESCRIP2.trim())
//             $tipo = validacion.LLAVE_ALT.substring(0, 1);
//             console.log($tipo + '<-----')
//             switch ($tipo) {
//                 case '1':
//                     $("#tipoSer102c").val("1");
//                     break;
//                 case '2':
//                     $("#tipoSer102c").val("2");
//                     break;
//                 case '3':
//                     $("#tipoSer102c").val("3");
//                     break;
//                 case '4':
//                     $("#tipoSer102c").val("4");
//                     break;
//                 case '5':
//                     $("#tipoSer102c").val("5");
//                     break;
//                 case '6':
//                     $("#tipoSer102c").val("6");
//                     break;
//                 case '7':
//                     $("#tipoSer102c").val("7");
//                     break;
//             }
//             $('#codAbrSer102c').val(validacion.LLAVE_ALT.substring(1, 5))
//             $duracion = validacion.DURACION_CUP.trim();
//             if ($duracion == '000') {
//                 $('#duracSer102c').val('')
//             } else {
//                 $('#duracSer102c').val($duracion)
//             }
//             $('#nivelSer102c').val(validacion.NIVEL_CUP.trim())

//             $tipopago = validacion.COPAGO_MOD_CUP.trim();
//             switch ($tipopago) {
//                 case '1':
//                     $("#pagoPacSer102c").val("1");
//                     break;
//                 case '2':
//                     $("#pagoPacSer102c").val("2");
//                     break;
//                 case '3':
//                     $("#pagoPacSer102c").val("3");
//                     break;
//             }
//             $tipoprocnopos = validacion.NOPOS_CUP.trim();
//             switch ($tipoprocnopos) {
//                 case 'S':
//                     $("#procdSer102c").val("S");
//                     break;
//                 case 'N':
//                     $("#procdSer102c").val("N");
//                     break;
//             }
//             $tipocis = validacion.CIS_CUP.trim();
//             switch ($tipocis) {
//                 case 'S':
//                     $("#cisSer102c").val("S");
//                     break;
//                 case 'N':
//                     $("#cisSer102c").val("N");
//                     break;
//             }

//             $('#cenCstSer102c').val(validacion.COSTO_CUP.trim())
//             if ($('#cenCstSer102c').val != '' || $('#cenCstSer102c').val().length == 2) {
//                 var codigojson = '00' + $('#cenCstSer102c').val();
//                 var validacion2 = search_inarray(codigojson, '$arraycosto');
//                 if (validacion2 != false) {
//                     $('#descCostSer102c').val(validacion2.NOMBRE.trim())
//                 }
//             }
//             if ($('#cenCstSer102c').val != '' || $('#cenCstSer102c').val().length == 4) {
//                 var codigojson = $('#cenCstSer102c').val();
//                 var validacion2 = search_inarray(codigojson, '$arraycosto');
//                 if (validacion2 != false) {
//                     $('#descCostSer102c').val(validacion2.NOMBRE.trim())
//                 }
//             }
//             if (validacion.EDAD_MIN_CUP == '000') {
//                 $('#edadMnSer102c').val('');
//             } else {
//                 $('#edadMnSer102c').val(validacion.EDAD_MIN_CUP)
//             }
//             if (validacion.EDAD_MAX_CUP == '000') {
//                 $('#edadMxSer102c').val('');
//             } else {
//                 $('#edadMxSer102c').val(validacion.EDAD_MAX_CUP)
//             }

//             $('#undMedSer102c').val(validacion.UNID_EDAD_CUP)

//             $tiposexo = validacion.SEXO_CUP.trim();
//             switch ($tiposexo) {
//                 case 'F':
//                     $("#sexoPacSer102c").val("F");
//                     break;
//                 case 'M':
//                     $("#sexoPacSer102c").val("M");
//                     break;
//             }
//             $rips = validacion.DIAGN_CUP.trim();
//             switch ($rips) {
//                 case 'S':
//                     $("#ripsSer102c").val("S");
//                     break;
//                 case 'N':
//                     $("#ripsSer102c").val("N");
//                     break;
//             }
//             $distribucion = validacion.MED_CUP.trim();
//             switch ($distribucion) {
//                 case 'S':
//                     $("#distIngSer102c").val("S");
//                     break;
//                 case 'N':
//                     $("#distIngSer102c").val("N");
//                     break;
//             }

//             $('#ingrClnSer102c').val(validacion.PORC_CL_CUP.trim())
//             $('#ingTercSer102c').val(validacion.PORC_OTR_CUP.trim())
//             $('#cntIngSer102c').val(validacion.CTA_OTR_CUP.trim())
//             $('#nitTerSer102c').val(validacion.NIT_OTR_CUP.trim())
//             $('#divi1Ser102c').val(validacion.DIVISION_CUP.trim())
//             if ($('#divi1Ser102c').val != '' || $('#divi1Ser102c').val().length == 2) {
//                 var codigojson = $('#divi1Ser102c').val();
//                 var validaciondiv = search_inarray(codigojson, '$arraydivis');
//                 if (validaciondiv != false) {
//                     $('#descdivUSer102c').val(validaciondiv.DESCRIP.trim())
//                 }
//             }
//             $('#divi2Ser102c').val(validacion.DIV_CUP.trim())
//             if ($('#divi2Ser102c').val != '' || $('#divi2Ser102c').val().length == 2) {
//                 var codigojson = $('#divi2Ser102c').val();
//                 var validaciondiv = search_inarray(codigojson, '$arraydivis');
//                 if (validaciondiv != false) {
//                     $('#descdivDSer102c').val(validaciondiv.DESCRIP.trim())
//                 }
//             }

//             $('#codPucSer102c').val(validacion.TABLA_CTA_CUP[0].trim())

//             $('#codCoopSer102c').val(validacion.TABLA_CTA_CUP[1].trim())

//             $('#codOfcSer102c').val(validacion.TABLA_CTA_CUP[2].trim())

//             $('#divUnoSer102c').val(validacion.DIVISION)

//             $('#divDosSer102c').val(validacion.DIVISION)

//             if ($_NOVEDAD == 8) {

//                 $opercrea = validacion.OPER_ELAB_CUP.trim()
//                 $fecrea = validacion.FECHA_ELAB_CUP.trim()
//                 $horacrea = validacion.HORA_ELAB_CUP.trim()
//                 $opermodi = validacion.OPER_MOD_CUP.trim()
//                 $fecmodi = validacion.FECHA_MOD_CUP.trim()
//                 $horamodi = validacion.HORA_MOD_CUP.trim()
//             }
//             if ($_NOVEDAD == 7) {
//                 $horamodi = '';
//                 $horacrea = '';
//             }


//             setTimeout(function () { validarTerceraFase('1'); }, 100)
//         } else {

//             jAlert({
//                 titulo: 'Mensaje ',
//                 mensaje: 'No existe código digitado',
//             }, function () {
//                 setTimeout(function () { validarSegundaFase('1'); }, 100)
//             });
//         }
//     }
// }
// function validarTerceraFase(orden) {
//     console.log('tercera fase');
//     validarInputs(
//         {
//             form: '#fase3',
//             orden: orden
//         },
//         function () { validarSegundaFase('1') },
//         validarCuartaFase
//     )
// }
// function validarCuartaFase() {
//     console.log('cuarta fase')
//     $('#tipoSer102c').focus()
//     $("#tipoSer102c").change(function () {

//         validarQuintaFase('1');

//     });
// }
// function validarQuintaFase(orden) {
//     setTimeout(function () {
//         validarInputs(
//             {
//                 form: '#fase5',
//                 orden: orden
//             },
//             function () { validarCuartaFase() },
//             validarFasepago
//         )
//     }, 200)
// }
// function validarFasepago() {
//     if ($('#nivelSer102c').val() < 5) {
//         console.log('fase pago')
//         $('#pagoPacSer102c').focus()
//         $("#pagoPacSer102c").change(function () {
//             validarFaseprocedimiento()
//         });

//     }
//     else {
//         jAlert({
//             titulo: 'Mensaje ',
//             mensaje: 'Error Dato Invalido!',
//         }, function () {
//             setTimeout(function () { validarQuintaFase('3'); }, 100)
//         });

//     }


// }
// function validarFaseprocedimiento() {
//     console.log('fase procedimiento')
//     $('#procdSer102c').focus()
//     $("#procdSer102c").change(function () {
//         validarFasecis()
//     });
// }
// function validarFasecis() {
//     console.log('fase cis')
//     $('#cisSer102c').focus()
//     $("#cisSer102c").change(function () {

//         validarSextaFase('1')
//     });
// }
// function validarSextaFase(orden) {
//     setTimeout(function () {
//         validarInputs(
//             {
//                 form: '#fase6',
//                 orden: orden
//             },
//             function () { validarFasecis() },
//             validarCentroCosto
//         )
//     }, 200)

// }
// function validarCentroCosto() {
//     if ($('#cenCstSer102c').val().length == 2) {
//         var codigojson = '00' + $('#cenCstSer102c').val();
//     } else {
//         var codigojson = $('#cenCstSer102c').val();
//     }
//     var validacion = search_inarray(codigojson, '$arraycosto');
//     if (validacion != false) {
//         $('#descCostSer102c').val(validacion.NOMBRE)
//         setTimeout(function () { validarSeptimaFase('1'); }, 100)
//     } else {

//         jAlert({
//             titulo: 'Mensaje ',
//             mensaje: 'No existe código digitado',
//         }, function () {
//             setTimeout(function () { validarSextaFase('1'); }, 100)
//         });
//     }

// }
// function validarSeptimaFase(orden) {
//     console.log('fase7')
//     setTimeout(function () {
//         validarInputs(
//             {
//                 form: '#fase7',
//                 orden: orden
//             },
//             function () { validarCentroCosto() },
//             validarFaseSexo
//         )
//     }, 200)
// }
// function validarFaseSexo() {
//     console.log('fase sexo ')
//     $('#sexoPacSer102c').focus()
//     $("#sexoPacSer102c").change(function () {
//         validarFaseRips()
//     });
// }
// function validarFaseRips() {
//     console.log('fase rips ')
//     $('#ripsSer102c').focus()
//     $("#ripsSer102c").change(function () {
//         validarFaseSelecIng()
//     });
// }
// function validarFaseSelecIng() {
//     console.log('Fase SelecIng')
//     $('#distIngSer102c').focus()
//     $("#distIngSer102c").change(function () {
//         validarSeleccionIng()
//     });

// }
// function validarSeleccionIng() {
//     console.log('validar seleccion Ing 1')
//     if ($('#distIngSer102c').val() == 'S') {
//         validarNovenaFase('1')
//     } else {
//         validarFaseIngCli('1')
//     }

// }

// function validarFaseIngCli(orden) {
//     console.log('faseingcli')
//     setTimeout(function () {
//         validarInputs(
//             {
//                 form: '#faseIngCli',
//                 orden: orden
//             },
//             function () { validarFaseSelecIng() },
//             function () { validarFaseIngTerec('1') }
//         )
//     }, 200)

// }
// function validarFaseIngTerec(orden) {
//     console.log('faseIngTerec')
//     setTimeout(function () {
//         validarInputs(
//             {
//                 form: '#faseIngTerec',
//                 orden: orden
//             },
//             validarFaseIngCli,
//             function () { validarFaseCuentaTerc('1') }
//         )
//     }, 200)

// }

// function validarFaseCuentaTerc(orden) {
//     console.log('faseCtaTerec')
//     setTimeout(function () {
//         validarInputs(
//             {
//                 form: '#faseCuentaTerc',
//                 orden: orden
//             },
//             function () { validarFaseIngTerec() },
//             validarCtaIngresoTerceros
//         )
//     }, 200)


// }
// function validarCtaIngresoTerceros() {
//     console.log('validar cta_terceros')
//     var codigojson = $('#cntIngSer102c').val();
//     var validacion = search_inarray(codigojson, '$arrayarchmae');
//     if (validacion != false) {
//         $('#descntIngSer102c').val(validacion.NOMBRE_MAE)
//         setTimeout(function () { validarOctavaFase('1') }, 100);
//     } else {
//         jAlert({
//             titulo: 'Mensaje ',
//             mensaje: 'No existe código digitado',
//         }, function () {
//             setTimeout(function () { validarFaseCuentaTerc('1'); }, 100)
//         });
//     }

// }
// function validarOctavaFase(orden) {
//     console.log('fase8')
//     setTimeout(function () {
//         validarInputs(
//             {
//                 form: '#fase8',
//                 orden: orden
//             },
//             function () { validarCtaIngresoTerceros() },
//             validarNitTerceros
//         )
//     }, 200)

// }
// function validarNitTerceros() {
//     console.log('aqui validare nit terceros')
//     setTimeout(function () {
//         validarNovenaFase('1')
//     }, 200)
// }


// function validarNovenaFase(orden) {
//     console.log('fase9')
//     setTimeout(function () {
//         validarInputs(
//             {
//                 form: '#fase9',
//                 orden: orden
//             },
//             function () { validarOctavaFase('1') },
//             validarCup
//         )
//     }, 200)
// }
// function validarCup() {
//     setTimeout(function () {
//         console.log('validar cod_cup')
//         var codigojson = $('#codPucSer102c').val();
//         var validacion1 = search_inarray(codigojson, '$arrayarchmae');
//         if (validacion1 != false) {
//             $('#descPucSer102c').val(validacion1.NOMBRE_MAE)
//             setTimeout(function () { validarDecimaFase('1') }, 100);
//         } else {
//             jAlert({
//                 titulo: 'Mensaje ',
//                 mensaje: 'No existe código digitado',
//             }, function () {
//                 setTimeout(function () { validarNovenaFase('1'); }, 100)
//             });
//         }
//     }, 100);

// }
// function validarDecimaFase(orden) {
//     console.log('fase10')
//     setTimeout(function () {
//         validarInputs(
//             {
//                 form: '#fase10',
//                 orden: orden
//             },
//             function () { validarOctavaFase('1') },
//             validarCoop
//         )
//     }, 200)
// }
// function validarCoop() {
//     console.log('validar cod_coop')
//     var codigojson = $('#codCoopSer102c').val();
//     var validacion2 = search_inarray(codigojson, '$arrayarchmae');
//     if (validacion2 != false) {
//         $('#descCoopSer102c').val(validacion2.NOMBRE_MAE)
//         setTimeout(function () { validarOnceavaFase('1') }, 100);
//     } else {
//         jAlert({
//             titulo: 'Mensaje ',
//             mensaje: 'No existe código digitado',
//         }, function () {
//             setTimeout(function () { validarDecimaFase('1'); }, 100)
//         });
//     }

// }
// function validarOnceavaFase(orden) {
//     console.log('fase11')
//     setTimeout(function () {
//         validarInputs(
//             {
//                 form: '#fase11',
//                 orden: orden
//             },
//             function () { validarDecimaFase('1') },
//             validarCoofi
//         )
//     }, 200)

// }
// function validarCoofi() {
//     console.log('validar cod_coofi')
//     var codigojson = $('#codOfcSer102c').val();
//     var validacion3 = search_inarray(codigojson, '$arrayarchmae');
//     if (validacion3 != false) {
//         $('#descOfcSer102c').val(validacion3.NOMBRE_MAE)
//         setTimeout(function () { validarDoceavaFase('1') }, 100);
//     } else {
//         jAlert({
//             titulo: 'Mensaje ',
//             mensaje: 'No existe código digitado',
//         }, function () {
//             setTimeout(function () { validarOnceavaFase('1'); }, 100)
//         });
//     }

// }
// function validarDoceavaFase(orden) {
//     console.log('fase12')
//     setTimeout(function () {
//         validarInputs(
//             {
//                 form: '#fase12',
//                 orden: orden
//             },
//             function () { validarOnceavaFase('1') },
//             validarDiv1
//         )
//     }, 200)

// }
// function validarDiv1() {
//     console.log('validar Div1')
//     var codigojson = $('#divi1Ser102c').val();
//     var validacion = search_inarray(codigojson, '$arraydivis');
//     if (validacion != false) {
//         $('#descdivUSer102c').val(validacion.DESCRIP)
//         setTimeout(function () { validarTreceavaFase('1') }, 100);
//     } else {
//         jAlert({
//             titulo: 'Mensaje ',
//             mensaje: 'No existe código digitado',
//         }, function () {
//             setTimeout(function () { validarOnceavaFase('1'); }, 100)
//         });
//     }

// }
// function validarTreceavaFase(orden) {
//     console.log('fase13')
//     setTimeout(function () {
//         validarInputs(
//             {
//                 form: '#fase13',
//                 orden: orden
//             },
//             function () { validarDoceavaFase('1') },
//             validarDiv2
//         )
//     }, 200)

// }
// function validarDiv2() {
//     console.log('validar Div2')
//     var codigojson = $('#divi2Ser102c').val();
//     var validacion = search_inarray(codigojson, '$arraydivis');
//     if (validacion != false) {
//         $('#descdivDSer102c').val(validacion.DESCRIP)
//         //  setTimeout(function () { activar_btn() }, 100);
//     } else {
//         jAlert({
//             titulo: 'Mensaje ',
//             mensaje: 'No existe código digitado',
//         }, function () {
//             setTimeout(function () { validarOnceavaFase('1'); }, 100)
//         });
//     }

// }


// /* CONTROLA LA ELIMINACION DE LOS JSON 1 X 1*/
// function datosJson(data) {
//     data['CODIGOS'].pop();
//     switch (contador) {
//         case 1: $arraygruposer = data;
//             console.log(data)
//             f8archcups();
//             break;
//         case 2: $arrayarchcups = data;
//             console.log(data)
//             f8archmae();
//             break;
//         case 3: $arrayarchmae = data;
//             console.log(data)
//             f8archcosto();
//             break;
//         case 4: $arraycosto = data;
//             console.log(data)
//             f8divis();
//             break;
//         case 5: $arraydivis = data;
//             loader('hide');
//             console.log(data)
//             CON850(_evaluarNovedad_102C);
//             break;
//     }

//     $nombrejs = nomjson + '-' + localStorage.getItem('key_sesion');
//     $ip_publica = localStorage.getItem('ip_publica');
//     $url = 'http://' + $ip_publica + '/FRAMEWORKS/scripts/php/eliminarjson.php'
//     console.log($url + 'test antes')
//     // $.ajax({
//     //     type: 'POST',
//     //     url: 'http://' + $ip_publica + '/FRAMEWORKS/scripts/php/eliminarjson.php',
//     //     data: { nombrejs: $nombrejs, ip_publica: $ip_publica },
//     //     success: function (data) {
//     //         console.log(data)
//     //         flagjson = false;
//     //     }
//     // });


// }

// /* -------------------------------------*/
// $('#guardar_btn3').click(function () {
//     $nv = '8';
//     $grpo_cup = $('#grpServicio102c').val();
//     $cod_serv = $('#codSer102c').val();
//     $descip_cod_serv = $('#descCodSer102c').val();
//     $tipo_serv = $('#tipoSer102c').val();
//     $cod_abrev = $('#codAbrSer102c').val();
//     $duracion = $('#duracSer102c').val();
//     $nivel_complejidad = $('#nivelSer102c').val();
//     $pago_paci = $('#pagoPacSer102c').val();
//     $tipo_procedimiento = $('#procdSer102c').val();
//     $cis = $('#cisSer102c').val();
//     $centro_costo = $('#cenCstSer102c').val();
//     $edad_min = $('#edadMnSer102c').val();
//     $edad_max = $('#edadMxSer102c').val();
//     $unidad_medida = $('#undMedSer102c').val();
//     $sexo_paci = $('#sexoPacSer102c').val();
//     $requiere_rip = $('#ripsSer102c').val();
//     $100_medico = $('#distIngSer102c').val();
//     $ing_clinica = $('#ingrClnSer102c').val();
//     $ing_terceros = $('#ingTercSer102c').val();
//     $ctaing_terceros = $('#cntIngSer102c').val();
//     $nit_tercero = $('#nitTerSer102c').val();
//     $divone = $('#divi1Ser102c').val();
//     $divdos = $('#divi2Ser102c').val();
//     $fechamodi = $anio + $mes + $dia;
//     $fechas = $opercrea + '|' + $fecrea + '|' + $horacrea + '|' + '0101' + '|' + $fechamodi + '|' + $horamodi;


//     $sesion = localStorage.getItem('key_sesion');
//     $ip_servidor = localStorage.getItem('ip_server');
//     $ip_publica = localStorage.getItem('ip_publica');
//     $dir_contab = localStorage.getItem('key_drcontab');
//     $mes_contab = localStorage.getItem('key_mescontab');
//     $cod_oper = localStorage.getItem('cod_oper');
//     $arraytabla = $('#codPucSer102c').val() + '|' + $('#codCoopSer102c').val() + '|' + $('#codOfcSer102c').val();

//     //url para apuntar a donde se va a buscar el dll        
//     var url = 'http://' + $ip_publica + '/SALUD/APP/SER102C.DLL';

//     var datos = $sesion + '|' + $ip_servidor + '|' + $dir_contab + '|' + $mes_contab + '|' + $nv + '|' + $grpo_cup + '|' + $cod_serv + '|' + $descip_cod_serv.toUpperCase() + '|' +
//         $tipo_serv + '|' + $cod_abrev + '|' + $arraytabla + '|' + $divdos + '|' + $pago_paci + '|' + $tipo_procedimiento + '|' + $duracion + '|' + $nivel_complejidad + '|' + $divone + '|' +
//         $nit_tercero + '|' + $100_medico + '|' + $ctaing_terceros + '|' + $requiere_rip + '|' + $sexo_paci + '|' + $edad_min + '|' + $edad_max + '|' + $unidad_medida + '|' + $ing_clinica + '|' +
//         '00' + $centro_costo + '|' + $cis + '|' + $ing_terceros + '|' + $opercrea + '|' + $fecrea + '|' + $horacrea + '|' + $cod_oper.toString() + '|' + $fechamodi.toString() + '|' + $hora.toString() + $minuto.toString();



//     console.log(datos)
//     SolicitarDll({ datosh: datos }, respuestaDll, url);
// })
// $('#guardar_btn2').click(function () {
//     $nv = '9';
//     $grpo_cup = $('#grpServicio102c').val();
//     $cod_serv = $('#codSer102c').val();

//     $sesion = localStorage.getItem('key_sesion');
//     $ip_servidor = localStorage.getItem('ip_server');
//     $ip_publica = localStorage.getItem('ip_publica');
//     $dir_contab = localStorage.getItem('key_drcontab');
//     $mes_contab = localStorage.getItem('key_mescontab');

//     var url = 'http://' + $ip_publica + '/SALUD/APP/SER102C.DLL';

//     var datos = $sesion + '|' + $ip_servidor + '|' + $dir_contab + '|' + $mes_contab + '|' + $nv + '|' +
//         $grpo_cup + '|' + $cod_serv;


//     console.log(datos)
//     SolicitarDll({ datosh: datos }, respuestaDll, url);
// })
// $('#guardar_btn1').click(function () {
//     $nv = '7';
//     $grpo_cup = $('#grpServicio102c').val();
//     $cod_serv = $('#codSer102c').val();
//     $descip_cod_serv = $('#descCodSer102c').val();
//     $tipo_serv = $('#tipoSer102c').val();
//     $cod_abrev = $('#codAbrSer102c').val();
//     $duracion = $('#duracSer102c').val();
//     $nivel_complejidad = $('#nivelSer102c').val();
//     $pago_paci = $('#pagoPacSer102c').val();
//     $tipo_procedimiento = $('#procdSer102c').val();
//     $cis = $('#cisSer102c').val();
//     $centro_costo = $('#cenCstSer102c').val();
//     $edad_min = $('#edadMnSer102c').val();
//     $edad_max = $('#edadMxSer102c').val();
//     $unidad_medida = $('#undMedSer102c').val();
//     $sexo_paci = $('#sexoPacSer102c').val();
//     $requiere_rip = $('#ripsSer102c').val();
//     $100_medico = $('#distIngSer102c').val();
//     $ing_clinica = $('#ingrClnSer102c').val();
//     $ing_terceros = $('#ingTercSer102c').val();
//     $ctaing_terceros = $('#cntIngSer102c').val();
//     $nit_tercero = $('#nitTerSer102c').val();
//     $divone = $('#divi1Ser102c').val();
//     $divdos = $('#divi2Ser102c').val();
//     $fecrea = $anio + $mes + $dia;
//     $opermodi = '';
//     $fechamodi = '';
//     $horamodi = '';

//     $sesion = localStorage.getItem('key_sesion');
//     $ip_servidor = localStorage.getItem('ip_server');
//     $ip_publica = localStorage.getItem('ip_publica');
//     $dir_contab = localStorage.getItem('key_drcontab');
//     $mes_contab = localStorage.getItem('key_mescontab');
//     $cod_oper = localStorage.getItem('cod_oper');
//     $arraytabla = $('#codPucSer102c').val() + '|' + $('#codCoopSer102c').val() + '|' + $('#codOfcSer102c').val();

//     //url para apuntar a donde se va a buscar el dll        
//     var url = 'http://' + $ip_publica + '/SALUD/APP/SER102C.DLL';

//     var datos = $sesion + '|' + $ip_servidor + '|' + $dir_contab + '|' + $mes_contab + '|' + $nv + '|' + $grpo_cup + '|' + $cod_serv + '|' + $descip_cod_serv.toUpperCase() + '|' +
//         $tipo_serv + '|' + $cod_abrev + '|' + $arraytabla + '|' + $divdos + '|' + $pago_paci + '|' + $tipo_procedimiento + '|' + $duracion + '|' + $nivel_complejidad + '|' + $divone + '|' +
//         $nit_tercero + '|' + $100_medico + '|' + $ctaing_terceros + '|' + $requiere_rip + '|' + $sexo_paci + '|' + $edad_min + '|' + $edad_max + '|' + $unidad_medida + '|' + $ing_clinica + '|' +
//         '00' + $centro_costo + '|' + $cis + '|' + $ing_terceros + '|' + $cod_oper + '|' + ' ' + '|' + ' ' + '|' + $opermodi + '|' + $fechamodi + '|' + $horamodi;



//     console.log(datos)
//     SolicitarDll({ datosh: datos }, respuestaDll, url);
// })


// function limpiar() {
//     $('#codCostoCon110d').val('');
//     $('#detaCostCon110d').val('');
//     $('#descpCostoCon110d').val('');
//     $('#ctaCierCon110d').val('');
//     $('#desCtaCon110d').val('');
//     $('#divCon110d').val('');
//     $('#descDivCon110d').val('');
//     $('#codLstCon110d').val('');
//     $('#descLstCon110d').val('');
//     $('#listUnoCon110d').val('');
//     $('#desLstUnoCon110d').val('');
//     $('#listDosCon110d').val('');
//     $('#codCostoCon110d').val('');
//     $('#descDosCon110d').val('');
//     $('#listCuatCon110d').val('');
//     $('#descCuatCon110d').val('');
//     $('#listCincoCon110d').val('');
//     $('#descCincoCon110d').val('');
//     $('#lstSeisCon110d').val('');
//     $('#descSeisCon110d').val('');
//     $('#lstSietCon110d').val('');
//     $('#descSietCon110d').val('');
//     $('#operUno').val('');
//     $('#operDos').val('');
//     $arrayarchcosto = '';
//     setTimeout(function () {
//         nomjson = 'ARCHCOSTO';
//         crearjsnglobal('CON803', nomjson, 'CONTAB');
//         contador = 1;
//     }, 100);
//     novedad();


// }
// function limpiar2() {
//     $('#codCostoCon110d').val('');
//     $('#detaCostCon110d').val('');
//     $('#descpCostoCon110d').val('');
//     $('#ctaCierCon110d').val('');
//     $('#desCtaCon110d').val('');
//     $('#divCon110d').val('');
//     $('#descDivCon110d').val('');
//     $('#codLstCon110d').val('');
//     $('#descLstCon110d').val('');
//     $('#listUnoCon110d').val('');
//     $('#desLstUnoCon110d').val('');
//     $('#listDosCon110d').val('');
//     $('#codCostoCon110d').val('');
//     $('#descDosCon110d').val('');
//     $('#listCuatCon110d').val('');
//     $('#descCuatCon110d').val('');
//     $('#listCincoCon110d').val('');
//     $('#descCincoCon110d').val('');
//     $('#lstSeisCon110d').val('');
//     $('#descSeisCon110d').val('');
//     $('#lstSietCon110d').val('');
//     $('#descSietCon110d').val('');
//     $('#operUno').val('');
//     $('#operDos').val('');

// }
// function respuestaDll(datosh) {
//     //console.log(datosh + 'datosh')
//     var rdll = datosh.split('|');
//     if (rdll[0].trim() === '00') {
//         console.log(datosh);
//         limpiar();
//     } else {
//         console.log(datosh);
//         //msjProsoft.error(rdll[0], rdll[1], rdll[2]);
//     }
// };