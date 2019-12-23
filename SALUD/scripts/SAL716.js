/* NOMBRE RM --> SER103D // NOMBRE ELECTR --> SAL716 */

$(document).ready(function () {

    _inputControl("reset");
    _inputControl('disabled');
    _toggleF8([
        { input: 'codgOrig', app: '716', funct: _ventanaConvenios716 }
    ]);
    _validarOrigen716();
});


function _ventanaConvenios716(e) {
    var $_CONVENIO_715 = [];
    let URL = get_url("APP/" + "SALUD/SER803" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CONVENIO_715 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONVENIOS",
                    columnas: ["COD", "DESCRIP"],
                    data: $_CONVENIO_715.NOMTAR,
                    callback_esc: function () {
                        $("#codgOrig_716").focus();
                    },
                    callback: function (data) {
                        $('#codgOrig_716').val(data.COD);
                        $('#decripOrg716').val(data.DESCRIP.trim());
                        _enterInput('#codgOrig_716');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}




function _validarOrigen716() {
    validarInputs(
        {
            form: "#origen716",
            orden: '1'
        },
        function () { _toggleNav() },
        _validacionesorigen_716
    )
}

function _validacionesorigen_716() {
    $codigo716 = $('#codgOrig_716').val();

    if ($codigo716.trim() == '') {
        CON851('01', '01', null, 'error', 'error');
        _validarOrigen716();
    } else {
        LLAMADO_DLL({
            dato: [$codigo716],
            callback: _dataCONSULTANOMTAR_716,
            nombredll: 'SAL715_01',
            carpeta: 'SALUD'
        });
    }
}

function _dataCONSULTANOMTAR_716(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPNOMTAR_716 = date[1].trim();
    if (swinvalid == "00") {
        $('#decripOrg716').val($_DESCRIPNOMTAR_716);
        datoDesti716();

    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _validarOrigen716();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function datoDesti716() {
    validarInputs(
        {
            form: '#destino716',
            orden: '1'
        },
        function () { _validarOrigen716(); },
        _validaciondestino_716
    )
}

function _validaciondestino_716() {
    $codigoDst716 = $('#codgDest_716').val();
    if($codigoDst716.trim() == ''){
        CON851('02', '02', null, 'error', 'error');
        datoDesti716();
    }else{
        LLAMADO_DLL({
            dato: [$codigoDst716],
            callback: _dataCONSULTADESTINO_716,
            nombredll: 'SAL715_01',
            carpeta: 'SALUD'
        });
    }
   
}
function _dataCONSULTADESTINO_716(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPDESTINO_716 = date[1].trim();
    if (swinvalid == "00") {
        if($codigo716 == $codigoDst716){
            
            CON851('05', '05', null, 'error', 'error');
            datoDesti716(); 
        }else{
            $('#decripDest716').val($_DESCRIPDESTINO_716);
            validacionCodigos716();
        }
        
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        datoDesti716(); 
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function validacionCodigos716() {
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $codigoDst716
    SolicitarDll({ datosh: datos_envio }, validador716, get_url('/APP/SALUD/SAL716-TAB.DLL'));
}

function validador716(data) {
    var date = data.split('|');
    $_CODTAB716 = date[1];

    if (date[0].trim() == '00') {
        if ($codigoDst716 == $_CODTAB716) {
            CON851('5F', '5F', null, 'error', 'Error');
            CON851P('07', _validarOrigen716, envioDatos716)
        }
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        _validarOrigen716();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function envioDatos716() {
    LLAMADO_DLL({
        dato: [$codigoDst716],
        callback: registroDatos716,
        nombredll: 'SAL716-01',
        carpeta: 'SALUD'
    })
}

function registroDatos716(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    
    if (swinvalid == "39") {
        jAlert({ titulo: 'Mensaje 39', mensaje: "El proceso termino satisfactoriamente!" })
        _inputControl('reset');
        _validarOrigen716(); 
    } else {
        CON852(temp[0], temp[1], temp[2]);
    }
}