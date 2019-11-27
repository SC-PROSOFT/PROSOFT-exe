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
            console.log($_CONVENIO_715, '$_CONVENIO_715')
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONVENIOS",
                    columnas: ["COD", "DESCRIP"],
                    data: $_CONVENIO_715.NOMTAR,
                    callback_esc: function () {
                        $("#codigo_715").focus();
                    },
                    callback: function (data) {
                        console.log(data)
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
        function () { _toggleNav },
        _validacionescodigotarifa
    )
}
function _validacionescodigotarifa() {
    console.log('validaciones cod tar')
    $codigo715 = $('#codigo_715').val();
    if($codigo715.trim() == ''){
        DESCRIPTARIFW = 'TARIFA NO EXISTE - REPITA';
        console.log(DESCRIPTARIFW)
        $('#descrip715').val(DESCRIPTARIFW);
        _validarCodigo715(); 
    }else{
        console.log('evaluar dll')
        LLAMADO_DLL({
            dato: [$codigo715],
            callback: _dataCONSULTANOMTAR_715,
            nombredll: 'SAL715_01',
            carpeta: 'SALUD'
        });
    }
}

function _dataCONSULTANOMTAR_715(data) {
    console.log(data, 'SAL715-01')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    // $_CODNOMTAR_715 = date[1].trim();
    // console.log($_CODNOMTAR_715, '$_CODNOMTAR_715')
    $_DESCRIPNOMTAR_715 = date[1].trim();
    console.log($_DESCRIPNOMTAR_715, '$_DESCRIPNOMTAR_715')
    if (swinvalid == "00") {
        if ($codigo715 == '99') {
            $_DESCRIPNOMTAR_715 = 'PROCESO TOTAL';
            console.log($_DESCRIPNOMTAR_715)
            $('#descrip715').val($_DESCRIPNOMTAR_715);
            porcent715()

        } else {
            console.log($_DESCRIPNOMTAR_715, 'DESCRIPTARIFW')
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
    console.log('$porcentj715', $porcentj715)
    if ($porcentj715 == '') {
        console.log('vacio')
        vlrcopago_7411Mask.unmaskedValue = '0';
        porcent715();
    } else {
        console.log('lleno')
        if(($porcentj715< '1') || ($porcentj715 > '30')){
            console.log('mal')
            porcent715(); 
        }else{
            console.log('bien')
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
    console.log('validar grupo')
    $grupo715 = $('#grupo715').val();
    if($grupo715.trim() == ''){
        console.log('grupo en espacios')
        $grupo715 = '**'; 
        $('#grupo715').val($grupo715);
        envioDatos715(); 
    }else{
        LLAMADO_DLL({
            dato: [$codigo715],
            callback: _dataCONSULTAGRUPO_715,
            nombredll: 'SAL715_02',
            carpeta: 'SALUD'
        });
        
    }  
}

function _dataCONSULTAGRUPO_715(data){
    console.log(data, 'SAL715-02')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPGRUPOTAR_715 = date[1].trim();
    console.log($_DESCRIPGRUPOTAR_715, '($_DESCRIPGRUPOTAR_715')
    if (swinvalid == "00") {
        envioDatos715(); 
    } else if (swinvalid == "01") {
        grupo715(); 
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function envioDatos715() {
    console.log('incremento')
    LLAMADO_DLL({
        dato: [$codigo715, $porcentj715],
        callback: registroDatos715,
        nombredll: 'SAL715',
        carpeta: 'SALUD'
    })
}

function registroDatos715(data) {
    console.debug(data, 'registro')
    // _inputControl('reset');
    // _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        jAlert({ titulo: 'Notificacion', mensaje: "Guardado Correctamente" })
        _inputControl('reset');
        _validarCodigo715(); 
    } else{
        CON852(temp[0], temp[1], temp[2]);
    }
        
}




