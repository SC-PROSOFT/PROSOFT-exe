/* NOMBRE RM --> SER116 // NOMBRE ELECTR --> SAL71H */

var $_NovedSer71H;

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    _toggleF8([
        { input: 'codigo', app: '71H', funct: _ventanaGrptar }
    ]);
    CON850(_evaluarCON850);

});

function _ventanaGrptar(e) {
    var $_COMUNIDADES_71I = [];
    let URL = get_url("APP/" + "SALUD/SER116A" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_COMUNIDADES_71I = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE COMUNIDADES',
                    columnas: ["COD", "DESCRIP"],
                    data: $_COMUNIDADES_71I.COMUNIDADES,
                    callback_esc: function () {
                        $("#codigo_71H").focus();
                    },
                    callback: function (data) {
                        document.getElementById('codigo_71H').value = data.COD;
                        document.getElementById('descripSer71H').value = data.DESCRIP;
                        _enterInput('#codigo_71H');

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
    $_NovedSer71H = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarDato71H();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer71H').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarDato71H() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        _validacionescod_71H
    )
}

function _validacionescod_71H(){
    $_COD71H = $('#codigo_71H').val();
    LLAMADO_DLL({
        dato: [$_COD71H],
        callback: _dataSAL71H_comu,
        nombredll: 'SAL71H-01',
        carpeta: 'SALUD'
    });
}

function _dataSAL71H_comu(data){
    
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_CODCOMU = date[1].trim();
    $_NOMCOMU = date[2].trim();
    if (($_NovedSer71H == '7') && (swinvalid == '01')) {
        
        detalle71H()
    }
    else if (($_NovedSer71H == '7') && (swinvalid == '00')) {
        
        CON851('00', '00', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }
    else if (($_NovedSer71H == '8') && (swinvalid == '00')) {
       
        _llenarDatSer71H(); 

    }
    else if (($_NovedSer71H == '8') && (swinvalid == '01')) {
        
        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850);

    }
    else if (($_NovedSer71H == '9') && (swinvalid == '00')) {
      
        _llenarDatSer71H(); 

    }
    else if (($_NovedSer71H == '9') && (swinvalid == '01')) {
       
        CON851('01', '01', null, 'error', 'Error');
        CON850(_evaluarCON850);
    }   
}

/// NOVEDAD 7 ////
function detalle71H() {
    
    validarInputs(
        {
            form: '#descrp',
            orden: '1'
        },
        function () { _validarDato71H(); },
        function () { envioDatSer71H() }
    )
}
////// NOVEDAD 8 Y 9 //////////////////
function _llenarDatSer71H() {
    // $('#codigo_71H').val($_CODCOMU);
    $('#descripSer71H').val($_NOMCOMU);

    switch (parseInt($_NovedSer71H)) {
        case 8:
            detalle71H()
            break;
        case 9:
            CON851P('54', _validarDato71H, _envDatos71H)
            break;
    }
}

///////// ELIMINAR REGISTRO ////////////////////
function _envDatos71H() {

    LLAMADO_DLL({
        dato: [$_NovedSer71H, $_COD71H],
        callback: _data71H_02,
        nombredll: 'SAL71H-02',
        carpeta: 'SALUD'
    })
}

///////////////GRABAR DATOS////////////////

function envioDatSer71H() {
    desc71H = $('#descripSer71H').val();

    LLAMADO_DLL({
        dato: [$_NovedSer71H, $_COD71H, desc71H],
        callback: _data71H_02,
        nombredll: 'SAL71H-02',
        carpeta: 'SALUD'
    })
}

function _data71H_02(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_NovedSer71H == '9') {
            toastr.success('Se ha retirado', 'MAESTRO COMUNIDADES');
            _inputControl('reset');
            _inputControl('disabled');
            CON850(_evaluarCON850);
        } else {
            toastr.success('Se ha guardado', 'MAESTRO COMUNIDADES');
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


