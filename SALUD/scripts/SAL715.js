/* NOMBRE RM --> SER105 // NOMBRE ELECTR --> SAL715 */

var arraygrpser;

var vlrporcentaje_7411Mask = new IMask(document.getElementById('porcnt715'),
    { mask: Number, min: 0, max: 99, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);

$(document).ready(function () {
    _inputControl("reset");
    _inputControl('disabled');
    _toggleF8([
        { input: 'codigo', app: '715', funct: _ventanaConvenios715 }
    ]);
    _validarCodigo715();
});
////////F8//////////////////////////7
function _ventanaConvenios715(e) {
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
                        $("#codigo_715").focus();
                    },
                    callback: function (data) {
                        $('#codigo_715').val(data.COD);
                        $('#descrip715').val(data.DESCRIP.trim());
                        // document.getElementById('codigo_715').value = data.COD;
                        // document.getElementById('descrip715').value = data.DESCRIP;

                        _enterInput('#codigo_715');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _validarCodigo715() {
    validarInputs(
        {
            form: "#codincrem715",
            orden: '1'
        },
        function () { _toggleNav()},
        _validacionescodigotarifa
    )
}
function _validacionescodigotarifa() {
    $codigo715 = $('#codigo_715').val();
    if($codigo715.trim() == ''){
        DESCRIPTARIFW = 'TARIFA NO EXISTE - REPITA';
        $('#descrip715').val(DESCRIPTARIFW);
        _validarCodigo715(); 
    }else{
        LLAMADO_DLL({
            dato: [$codigo715],
            callback: _dataCONSULTANOMTAR_715,
            nombredll: 'SAL715_01',
            carpeta: 'SALUD'
        });
    }
}

function _dataCONSULTANOMTAR_715(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPNOMTAR_715 = date[1].trim();
    if (swinvalid == "00") {
        if ($codigo715 == '99') {
            $_DESCRIPNOMTAR_715 = 'PROCESO TOTAL';
            $('#descrip715').val($_DESCRIPNOMTAR_715);
            porcent715()

        } else {
            $('#descrip715').val($_DESCRIPNOMTAR_715);
            porcent715()
        }
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _validarCodigo715();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function porcent715() {
    validarInputs(
        {
            form: '#porcentaje715',
            orden: '1'
        },
        function () { _validarCodigo715(); },
        _validarporcentaje_715
    )
}

function _validarporcentaje_715(){
    $porcentj715 = vlrporcentaje_7411Mask.unmaskedValue;
    if ($porcentj715 == '') {
        vlrcopago_7411Mask.unmaskedValue = '0';
        porcent715();
    } else {
        if(($porcentj715< '1') || ($porcentj715 > '30')){
            porcent715(); 
        }else{
            grupo715();
        }
    }
    
}

function grupo715() {
    validarInputs(
        {
            form: '#grupo715',
            orden: '1'
        },
        function () { porcent715(); },
        _validargrupotar
    )
}

function _validargrupotar(){
    $grupo715 = $('#grupo715').val();
    if($grupo715.trim() == ''){
        $grupo715 = '**'; 
        $('#grupo715').val($grupo715);
        envioDatos715(); 
    }else{
        LLAMADO_DLL({
            dato: [$grupo715],
            callback: _dataCONSULTAGRUPO_715,
            nombredll: 'SAL715_02',
            carpeta: 'SALUD'
        });
        
    }  
}

function _dataCONSULTAGRUPO_715(data){
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPGRUPOTAR_715 = date[1].trim();
    if (swinvalid == "00") {
        envioDatos715(); 
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        grupo715(); 
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function envioDatos715() {
    LLAMADO_DLL({
        dato: [$codigo715, $porcentj715],
        callback: registroDatos715,
        nombredll: 'SAL715',
        carpeta: 'SALUD'
    })
}

function registroDatos715(data) {
    var temp = data.split('|')
    var swinvalid = datedate[0].trim();
    if (swinvalid == '00') {
        jAlert({ titulo: 'Notificacion', mensaje: "Guardado Correctamente" })
        _inputControl('reset');
        _validarCodigo715(); 
    } else{
        CON852(temp[0], temp[1], temp[2]);
    }
        
}




