/* NOMBRE RM --> SER116 // NOMBRE ELECTR --> SAL71I */

var $_NovedSer71I, $arraygrpresgu;

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    _toggleF8([
        { input: 'codigo', app: '71I', funct: _ventanaResgard }
    ]);
    CON850(_evaluarCON850);

});


// --> F8 NOMBRE-RESG //
function _ventanaResgard(e) {
    var $_RESGUARDOS_71I = [];
    let URL = get_url("APP/" + "SALUD/SER117A" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_RESGUARDOS_71I = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE RESGUARDOS',
                    columnas: ["COD", "DESCRIP"],
                    data: $_RESGUARDOS_71I.RESGUARDOS,
                    callback_esc: function () {
                        $("#codigo_71I").focus();
                    },
                    callback: function (data) {
                    
                        document.getElementById('codigo_71I').value = data.COD;
                        document.getElementById('descripSer71I').value = data.DESCRIP;
                        _enterInput('#codigo_71I');

                    }
                });
            }

        })
        .catch((error) => {
            console.log(error)
        });
}


// NOVEDAD //
function _evaluarCON850(novedad) {

    $_NovedSer71I = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarDato71I();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer71I').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarDato71I() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        _validarcodigores_71I
    )
}
function _validarcodigores_71I() {
    $codigo_71I = $('#codigo_71I').val();
    LLAMADO_DLL({
        dato: [$codigo_71I],
        callback: _dataSAL71I_res,
        nombredll: 'SAL71I-01',
        carpeta: 'SALUD'
    });
}

function _dataSAL71I_res(data){
    console.log(data, 'consulta')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_CODRESGU = date[1];
    $_NOMRESGU = date[2];
    if (($_NovedSer71I == '7') && (swinvalid == '01')) {
        detalle71I()
    }
    else if (($_NovedSer71I == '7') && (swinvalid == '00')) {
        
        CON851('00', '00', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }
    else if (($_NovedSer71I == '8') && (swinvalid == '00')) {
       
        _llenarCampos71I(); 

    }
    else if (($_NovedSer71I == '8') && (swinvalid == '01')) {
        
        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850);

    }
    else if (($_NovedSer71I == '9') && (swinvalid == '00')) {
       
        _llenarCampos71I(); 

    }
    else if (($_NovedSer71I == '9') && (swinvalid == '01')) {
        
        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850);

    }
    
}
/// NOVEDAD 7 ////

function detalle71I() {
    validarInputs(
        {
            form: '#detalle',
            orden: '1'
        },
        function () { _validarDato71I(); },
        envioDatSer71I
    )
}

////////////////// 8 y  9 /////////////////
function _llenarCampos71I() {
    // $('#codigo_71I').val($_CODRESGU);
    $('#descripSer71I').val($_NOMRESGU);

    switch (parseInt($_NovedSer71I)) {
        case 8:
            detalle71I()
            break;
        case 9:
            CON851P('54', _validarDato71I, _eliminaDatos71I)
            break;
    }
}
//////////// ELIMINAR REGISTRO////////
function _eliminaDatos71I() {

    LLAMADO_DLL({
        dato: [$_NovedSer71I, $codigo_71I],
        callback: _data71I_02,
        nombredll: 'SAL71I-02',
        carpeta: 'SALUD'
    })
}


////// GRABAR DATOS //////////////////

function envioDatSer71I() {
    
    descpr71I= $('#descripSer71I').val();

    LLAMADO_DLL({
        dato: [$_NovedSer71I, $codigo_71I, descpr71I],
        callback: _data71I_02,
        nombredll: 'SAL71I-02',
        carpeta: 'SALUD'
    })
}

function _data71I_02(data) {
    console.log(data, 'grabar')
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_NovedSer71I == '9') {
            toastr.success('Se ha retirado', 'MAESTRO RESGUARDO');
            _inputControl('reset');
            _inputControl('disabled');
            CON850(_evaluarCON850);
        } else {
            toastr.success('Se ha guardado', 'MAESTRO RESGUARDO');
            _inputControl('reset');
            _inputControl('disabled');
            CON850(_evaluarCON850);
        }
    } else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');

    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


