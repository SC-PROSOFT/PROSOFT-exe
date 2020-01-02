var SAL77621 = [];

$(document).ready(function () {

    _inputControl("reset");
    _inputControl('disabled');
    _toggleF8([
        { input: 'origendoc', app: '77621', funct: _ventanaorigpac },
        { input: 'destinodoc', app: '77621', funct: _ventanadestpac }
    ]);
    _validardocOrigen_77621();
});


function _ventanaorigpac(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            valoresselect: ['Descripcion', 'Identificacion'],
            f8data: 'PACIENTES',
            columnas: [{
                title: 'COD'
            }, { title: 'NOMBRE' }, { title: 'EPS' }],
            callback: (data) => {
                document.querySelector("#origendoc_77621").value = data.COD;
                _enterInput('#origendoc_77621');
            },
            cancel: () => {
                _enterInput('#origendoc_77621');
            }
        };
        F8LITE(parametros);
    }
}

function _ventanadestpac(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            valoresselect: ['Descripcion', 'Identificacion'],
            f8data: 'PACIENTES',
            columnas: [{
                title: 'COD'
            }, { title: 'NOMBRE' }, { title: 'EPS' }],
            callback: (data) => {
                document.querySelector("#destinodoc_77621").value = data.COD;
                _enterInput('#destinodoc_77621');
            },
            cancel: () => {
                _enterInput('#destinodoc_77621');
            }
        };
        F8LITE(parametros);
    }
}


function _validardocOrigen_77621() {
    validarInputs(
        {
            form: "#ORIGENDOC_77621",
            orden: '1'
        },
        function () { _toggleNav() },
        () => {
            SAL77621.DOCORIGEN = $('#origendoc_77621').val();
            LLAMADO_DLL({
                dato: [SAL77621.DOCORIGEN],
                callback: _dataorigendoc_77621,
                nombredll: 'SAL7621-01',
                carpeta: 'SALUD'
            });
        }
    )
}

function _dataorigendoc_77621(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    SAL77621.DESCRIPORIGEN = date[1].trim();
    if (swinvalid == "00") {
        console.log('bien doc')
        $('#decriporig_77621').val(SAL77621.DESCRIPORIGEN);
        _buscarpaciente_77621();

    } else if (swinvalid == "01") {
        $('#origendoc_77621').val('000000000000000');
        $('#decriporig_77621').val('******************');
        _buscarpaciente_77621();

    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _buscarpaciente_77621() {

    LLAMADO_DLL({
        dato: [SAL77621.DOCORIGEN],
        callback: _databuscarpaciente_77621,
        nombredll: 'SAL7621-03',
        carpeta: 'SALUD'
    });
}

function _databuscarpaciente_77621(data) {
    console.log('buscar paciente', data)
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == '08') {
        CON851('08', '08', null, 'error', 'error');
        _validardocdestino_77621();
    } else {
        _validardocdestino_77621();
    }
}
function _validardocdestino_77621() {
    validarInputs(
        {
            form: '#DESTINODOC_77621',
            orden: '1'
        },
        function () { _validardocOrigen_77621(); },
        () => {
            SAL77621.DOCDESTINO = $('#destinodoc_77621').val();
            if (SAL77621.DOCORIGEN == SAL77621.DOCDESTINO) {
                CON851('05', '05', null, 'error', 'error');
                _validardocdestino_77621()
            } else {
                LLAMADO_DLL({
                    dato: [SAL77621.DOCDESTINO],
                    callback: _datadestinodoc_77621,
                    nombredll: 'SAL7621-01',
                    carpeta: 'SALUD'
                });
            }
        }
    )
}

function _datadestinodoc_77621(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    SAL77621.DESCRIPDESTINO = date[1].trim();
    if (swinvalid == "00") {
        $('#decripdest_77621').val(SAL77621.DESCRIPDESTINO);

        CON851P('04', _validardocOrigen_77621, _modificacionesarchivos_77621)

    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _validardocdestino_77621();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _modificacionesarchivos_77621() {
    console.log('modificaciones archivo inf')
    
    LLAMADO_DLL({
        dato: [SAL77621.DOCORIGEN],
        callback: _leerdocorigen_77621,
        nombredll: 'SAL7621-01',
        carpeta: 'SALUD'
    });
}

function _leerdocorigen_77621(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _confirmarguardado_77621();
    }else{
        _validardocOrigen_77621();
    }
}

function _confirmarguardado_77621() {
    SAL77621.FECHACREAPACIW = moment().format('YYMMDD');
    SAL77621.HORACREAPACIW = moment().format('HH:mm');
    SAL77621.HORACREAPACIW = SAL77621.HORACREAPACIW.replace(/:/, '');

    LLAMADO_DLL({
        dato: [SAL77621.DOCORIGEN, SAL77621.DOCDESTINO, SAL77621.FECHACREAPACIW, SAL77621.HORACREAPACIW],
        callback: _leerconfirmacion_77621,
        nombredll: 'SAL7621-04',
        carpeta: 'SALUD'
    });
}
function _leerconfirmacion_77621(data){
    console.log(data, 'confirmacion')
}