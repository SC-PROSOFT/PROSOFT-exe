/* NOMBRE RM --> SER11B // NOMBRE ELECTR --> SAL71B */


$encabezadojson = "SC-UNIATEN-";
$ip_servidor = '';
var flagjson = true;
var fs;
var contador = 0;
var datosEnvio, $_SESION = localStorage.getItem('key_sesion');
var arrayunidserv, arraycosto;


/*
var unidEdadMinima = '';
var unidEdadMaxima = '';
var edadMinima = '';
var edadMaxima = '';
var activarUni = 'N';*/

$(document).ready(function () {
    $('#codigo11B').attr("maxlength", "2");
    $('#edadMin11B').attr("maxlength", "3");
    $('#edadMax11B').attr("maxlength", "3");
    $('#cenCos11B').attr("maxlength", "4");
    
    $('#btn_grabar_11B-2').hide();
    
    focoinput();
    keyform();
    $('#codigo11B').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    
    datosEnvio = localStorage.getItem('key_sesion').trim();
    datosEnvio += '|'
    datosEnvio += localStorage.getItem('ip_server').trim();
    datosEnvio += '|'
    datosEnvio += localStorage.getItem('key_drcontab').trim();
    datosEnvio += '|'
    datosEnvio += localStorage.getItem('key_mescontab').trim();
    console.log('Cargando..')
    $('#F8Cod11b').click(primerF8);
    $('#F8Cen11b').click(costoF8);

    crearJsonUnidServ_11b();
    /*
        setTimeout(function () {
            nomjson = 'UNIATEN';
            modulo = 'salud';
            crearjsnglobal('ser11B-01', nomjson, modulo);
        }, 1000);
        setTimeout(function () {
            nomjson = 'ARCHCOS';
            modulo = 'salud';
            crearjsnglobal('ser11B-01', nomjson, modulo);
            contador++;
        }, 2000);
    
        f8Popup({
            title: "Ventana Unidades De Servicio",
            columns: ["COD", "DESCRIP"],
            array: arrayunidserv
        }, function (data) {
            console.log(data)
            mostrarDatos(data);
        });*/
        
    });
    
    function crearJsonUnidServ_11b() {
        var url = urlDll('ser11b-01','salud')
        console.log(url)
        SolicitarDll({ datosh: datosEnvio }, on_crearJsonUnidServ_11b, url);
}

function on_crearJsonUnidServ_11b(data) {
    console.log(data)
    var rdll = data.split('|');
    var nombrejs = 'UNIATEN-' + localStorage.getItem('key_sesion');
    
    if (rdll[0].trim() == '00') {
        var rutaJson = urlJson('JSC-UNIATEN-');
        // var rutaJson = '../progdatos/json/jSC-UNIATEN-' + $_SESION + '.JSON';
        SolicitarDatos(
            null,
            function (data) {
                console.log(data)
                arrayunidserv = data.UNIDSERV
                console.log('pare2')
                eliminarJson(nombrejs);
                on_crearJsonCosto_11b();
            },
            rutaJson
            );
    } else {
        alert(rdll[0], rdll[1], rdll[2]);
    }
}

function on_crearJsonCosto_11b() {
    var nombrejs = 'ARCHCOS-' + localStorage.getItem('key_sesion');
    // var rutaJson = '../progdatos/json/SC-ARCHCOS-' + $_SESION + '.JSON';
    var rutaJson = urlJson('JSC-ARCHCOS-');
    SolicitarDatos(
        null,
        function (data) {
            console.log(data)
            arraycosto = data.COSTO
            eliminarJson(nombrejs);
            console.log('Fin carga')
            primerF8();
        },
        rutaJson
        );
    }
function primerF8() {  
    console.log('entro al f8')  
    f8Popup({
        title: "Ventana Unidades De Servicio",
        columns: ["COD", "DESCRIP", "ESTADO"],
        array: arrayunidserv
    }, function (data) {
        console.log(data)
        mostrarDatos(data);       
        $('#edadMin11B').focus();
    });
}

    /*
    function datosJson(data) {
        data['CODIGOS'].pop();
        switch (contador) {
            case 1: arrayunidserv = data;
            break;
            case 2: arraycosto = data;
            break;
    }
    
    $nombrejs = nomjson + '-' + localStorage.getItem('key_sesion');
    console.log($ip_servidor)
    //  var file = 'D:\PSC\PROG\DATOS\JSON\SC-GRUPOTAR-' +$nombrejs+ '.JSON';
    
    $.ajax({
        type: 'POST',
        url: 'http://' + $ip_servidor + '/SALUD/script/php/eliminarjson.php',
        data: { nombrejs: $nombrejs },
        success: function (data) {
            console.log(data)
            flagjson = false;
        }
    });
    
}*/

function search_inarray(codigojson, nomarray) {
    switch (nomarray) {
        case 'unidadDeServicio': 
        var retornar = false;
        for (var i in arrayunidserv) {
            if (arrayunidserv[i].COD.trim() == codigojson) {
                retornar = arrayunidserv[i];
                break;
                }
            }
            return retornar;
        case 'costo': 
            var retornar = false;
            for (var i in arraycosto) {
                if (arraycosto[i].COD.trim() == codigojson) {
                    retornar = arraycosto[i];
                break;
                }
            }
            return retornar;
    }
    console.log(codigojson);
    
//    return false
}

function mostrarDatos(a) {
    $("#codigo11B").val(a.COD.trim())
    $('#descrip11B').val(a.DESCRIP.trim());
    
    var unidEdadMinima = a.UNIDEDADMIN.trim();
    console.log(unidEdadMinima)
    switch (unidEdadMinima) {
        case 'A':           
            $('#unidEdadMin11B option[value="A"]').attr('selected', 'true');
            break;
    
        case 'M':
            $('#unidEdadMin11B option[value="M"]').attr('selected', 'true');
            break;

        case 'D':
        $('#unidEdadMin11B  option[value="D"]').attr('selected', 'true');
            break;
        
        case '':
             console.log('MINIMA')
             unidEdadMinima = 'D';
             var edadMinima = '001';
             $('#unidEdadMin11B option[value="D"]').attr('selected', 'true');
             $('#edadMin11B').val(edadMinima);
        break;
    }
    $('#edadMin11B').val(a.EDADMIN.trim());

    var unidEdadMaxima = a.UNIDEDADMAX.trim();
    console.log(unidEdadMaxima)
    switch (unidEdadMaxima) {
        case 'A':           
            $('#unidEdadMax11B option[value="A"]').attr('selected', 'true');
            break;
    
        case 'M':
            $('#unidEdadMax11B option[value="M"]').attr('selected', 'true');
            break;

        case 'D':
            $('#unidEdadMax11B  option[value="D"]').attr('selected', 'true');
            break;
        
        case '':
            console.log('MAXIMA')
            unidEdadMaxima = 'A';
            var edadMaxima = '120';
            $('#unidEdadMax11B option[value="A"]').attr('selected', 'true');
            $('#edadMax11B').val(edadMaxima);
        break;
    }
    $('#edadMax11B').val(a.EDADMAX.trim());

    $('#cenCos11B').val(a.CENCOS.trim());
    var costoMostrar = search_inarray(a.CENCOS.trim(), 'costo');
    console.log(costoMostrar)

    if (!costoMostrar) {
        $('#descripCos11B').val('')
    } else {
        costoMostrar = costoMostrar.NOMBRE.trim();
        $('#descripCos11B').val(costoMostrar);
    }

    var estado = a.ESTADO.trim();
    switch (estado) {
        case 'ACTIVA':
             console.log('entro a activa')
             $("#actUniS").attr("checked", "true");      
            break;
    
        case 'INACTIVA':
             $("#actUniN").attr("checked", "true");
            break;
    }
    console.log(estado)
}

function mostrarBotonGuardar() {
    $('#btn_grabar_11B').hide();
    $('#btn_grabar_11B-2').show();
}

function ocultarBotonGuardar() {
    $('#btn_grabar_11B-2').hide();
    $('#btn_grabar_11B').show();
}

function limpiarError() {
    $('#codigo11B').val('');
    $('#descrip11B').val('');
    $('#unidEdadMin11B option[value="D"]').attr('selected', 'true');
    $('#edadMin11B').val('');
    $('#unidEdadMax11B option[value="A"]').attr('selected', 'true');
    $('#edadMax11B').val('');
    $('#cenCos11B').val('');
    $("#actUniS").attr("checked", "true");
}

function keyform() {
    $('input.form-control').keydown(function (e) {
        document.getElementById('codigo11B').maxLength = 2;
        if ($("#codigo11B").val().length > 1) {

            var respuesta;

            switch (e.which) {
                case 13:
                    if ($("#codigo11B").is(':focus')) {
                        respuesta = search_inarray($("#codigo11B").val(),'unidadDeServicio');
                        console.log(respuesta)
                        if (!respuesta) {
                           msjErroresCon851('01', 'error');
                           limpiarError();
                           $('#codigo11B').focus();
                        } else {
                            mostrarDatos(respuesta);
                            $('#unidEdadMin11B').prop('disabled', false);
                            $('#edadMin11B').prop('disabled', false);
                            $('#edadMin11B').focus();
                        }

                    } else if ($("#edadMin11B").is(':focus')) {
                        var edadMin = $("#edadMin11B").val();
                        var unidEdadMinima = $( "#unidEdadMin11B option:selected" ).text();
                        console.log(unidEdadMinima)
                        switch (unidEdadMinima) {
                            case 'Dia': if (edadMin > 30) {
                                         msjErroresCon851('74', 'error');
                                         $('#edadMin11B').focus();    
                                      } else {
                                         $('#unidEdadMax11B').prop('disabled', false);
                                         $('#edadMax11B').prop('disabled', false);
                                         $('#edadMax11B').focus();
                                      }
                            break;

                            case 'Mes': if (edadMin > 11) {
                                         msjErroresCon851('74', 'error');
                                         $('#edadMin11B').focus();
                                        } else {
                                         $('#edadMax11B').prop('disabled', false);
                                         $('#edadMax11B').focus();
                                      }
                            break;

                            case 'Año': $('#unidEdadMax11B').prop('disabled', false);
                                      $('#edadMax11B').prop('disabled', false);
                                      $('#edadMax11B').focus();   
                            break;
                        }          

                    } else if ($("#edadMax11B").is(':focus')) { 
                        var edadMax = $("#edadMax11B").val();
                        var unidEdadMaxima = $( "#unidEdadMax11B option:selected" ).text();

                        switch (unidEdadMaxima) {
                            case 'Dia': if (edadMax > 30) {
                                         msjErroresCon851('74', 'error');
                                         $('#edadMax11B').focus();
                                      } else {
                                         $('#cenCos11B').prop('disabled', false);
                                         $('#cenCos11B').focus();
                                      }
                            break;
                        
                            case 'Mes': if (edadMax > 11) {
                                         msjErroresCon851('74', 'error');
                                         $('#edadMax11B').focus();
                                      } else {
                                         $('#cenCos11B').prop('disabled', false);
                                         $('#cenCos11B').focus();
                                      }
                            break;
                            
                            case 'Año': $('#cenCos11B').prop('disabled', false);
                                      $('#cenCos11B').focus();     
                            break;
                        }
                        
                    } else if ($("#cenCos11B").is(':focus')) { 
                       var cenCosto = $('#cenCos11B').val();                         
                       respuesta = search_inarray(cenCosto, 'costo');    
                       
                       switch (cenCosto) {
                           case '' || ' ' || '  ' :
                               mostrarBotonGuardar();     
                               break;
                       
                           default: if (!respuesta) {
                                       msjErroresCon851('01', 'error');
                                       $('#cenCos11B').focus();
                                    } else {
                                      console.log('kdsjbv isub')
                                      respuesta = respuesta.NOMBRE.trim();
                                      $('#descripCos11B').val(respuesta);
                                      mostrarBotonGuardar();   
                                    }
                               break;
                       }


                              
                    }
                    

                    break;

                case 119: if ($("#cenCos11B").is(':focus')) {
                    costoF8();
                    $('#cenCos11B').focus();
                } else if ($('#codigo11B').focus()){
                    primerF8();
                    $('#codigo11B').focus();
                }
                    break;

                case 27: 
                if ($("#edadMin11B").is(':focus')) {
                    primerF8();
                    $('#codigo11B').focus();
                    //$('#F8Cod11b').click();
                } else if ($("#edadMax11B").is(':focus')) {
                    $('#edadMin11B').focus();
                } else if ($("#cenCos11B").is(':focus')) {
                    $('#edadMax11B').focus();
                }

                    break;
                case 116:
                    $('#opcSalir').click();
                    break;
            }
        }
    });
}
function costoF8() {
   f8Popup({
       title: "Ventana Centro De Costos",
       columns: ["COD", "NOMBRE"],
       array: arraycosto
    }, function (data) {
       console.log(data)
       $("#descripCos11B").val(data.NOMBRE.trim())
    });
}


 function completarCerosIzq(x, L) {
    for (var i = 0; x.length < L; i++) {
            x = '0' + x;
        }
        return x;
    }

$('#btn_grabar_11B-2').click(function () {
    var datos;

    $codigo = $('#codigo11B').val();
    $DESCRIP = $('#descrip11B').val();
    $UNIDEDADMIN = $('#unidEdadMin11B').val();
    $EDADMIN = $('#edadMin11B').val();
    $UNIDEDADMAX = $('#unidEdadMax11B').val();
    $EDADMAX = $('#edadMax11B').val();
    $CENCOS = $('#cenCos11B').val();

    if ($("#actUniS").attr("checked", "true")) {
        $ESTADO = 'S';
    } else if ($("#actUniN").attr("checked", "true")) {
        $ESTADO = 'N';
    }


    $sesion = localStorage.getItem('key_sesion');
    $ip_servidor = localStorage.getItem('ip_server');
    $dir_contab = localStorage.getItem('key_drcontab');
    $mes_contab = localStorage.getItem('key_mescontab');
    
    //var url = urlDll('ser11b-02','salud')
    //var url = 'http://' + $ip_servidor + '../../SALUD/APP/SER11B-02.DLL';

    datos = $sesion  
    datos += '|'
    datos += $ip_servidor 
    datos += '|'
    datos += $dir_contab 
    datos += '|'
    datos += $mes_contab 
    datos += '|'
    datos += $codigo 
    datos += '|'
    datos += $DESCRIP 
    datos += '|'
    datos += $UNIDEDADMIN 
    datos += '|'
    datos += $EDADMIN 
    datos += '|'
    datos += $UNIDEDADMAX 
    datos += '|'
    datos += $EDADMAX 
    datos += '|'
    datos += $CENCOS 
    datos += '|'
    datos += $ESTADO;

    console.log(datos)
    SolicitarDll({ datosh: datos },  get_url('/APP/SALUD/SAL71B-02.DLL'));

    console.log('termino')
    limpiar();
})

function respuestaDll(datosh) {
    //alert('RESPUESTA DLL: ' + datosh);
    console.log(datosh)
    var rdll = datosh.split('|');
    if (rdll[0].trim() === '00') {
        msjErroresCon851('EXITOSO', 'success');
        crearJsonUnidServ_11b();
    } else {
        alert(rdll[0], rdll[1], rdll[2]);
    }
};


function limpiar() {
    $('#codigo11B').val('');
    $('#descrip11B').val('');
    $('#unidEdadMin11B option[value="A"]').attr('selected', 'true');
    $('#edadMin11B').val('');
    $('#unidEdadMax11B option[value="A"]').attr('selected', 'true');
    $('#edadMax11B').val('');
    $('#cenCos11B').val('');
    $('#descripCos11B').val('');
    $("#actUniS").attr("checked", "true");

    ocultarBotonGuardar();
    deshabilitarCajas();

    $('#codigo11B').is(':focus');
}

function deshabilitarCajas() {
    $('#descrip11B').prop('disabled', true);
    $('#edadMin11B').prop('disabled', true);
    $('#edadMax11B').prop('disabled', true);
    $('#cenCos11B').prop('disabled', true);
}