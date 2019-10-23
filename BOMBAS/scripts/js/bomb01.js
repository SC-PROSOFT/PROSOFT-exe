var $_NOVEDAD, $_TABLA_CLTANQUES, $_CONSULT_CL;
$(document).ready(function (){
    loader('hide');
    _solicitarAcceso();
});

$(document).on('keydown', '#med_01', function (e) { // f3 guardar
    if (e.which == 114) {
        _crearPlano();
    }
});

function _solicitarAcceso() {
    _inputControl('reset');
    _inputControl('disabled');
    var psw = $datosUsuar[5].trim();
    var fuente = ''
        + '<div style="width: 100%; height: 100%;text-align: center;">'
        + ' <input id="pwdAcceso" type="password" style="outline: none;padding: 5px 12px;box-sizing: border-box;" autofocus/>'
        + '</div>';

    jAlert({
        titulo: 'Clave de bloqueo',
        mensaje: fuente,
        autoclose: false,
        btnCancel: true
    }, function () {        
        let pwdIn = $('#pwdAcceso').val();
        if (pwdIn == psw) {
            jAlert_close();
            $('#claveAcceso_02').val(psw);
            CON850(_evaluarNovedad_01, { opcion9: false });
        } else {
            $('#pwdAcceso').val('').focus();
            alert('Clave de acceso invalida')
        }
    }, function () {
        jAlert_close();
        _toggleNav();
    });
}

function _evaluarNovedad_01(novedad){    
    $_NOVEDAD = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            modificar_01();
            break;
        default:
            _solicitarAcceso();
            break;
    }
    $('#novedad_01').val(novedad.id + ' - ' + novedad.descripcion);
}

function modificar_01(){
    _initBox_01();
    validarInputs(
        {
            form: '#consulta',
            orden: '1'
        },
        function () { CON850(_evaluarNovedad_01); },
        _infoClTanque
    )
}

function _infoClTanque(){
    let clTanque = $('#clTaan_01').val();

    var datos_envio = datosEnvio() + cerosIzq(clTanque,2) + '|';

    var url = get_url("app/BOMB01.DLL");
    SolicitarDll({ datosh: datos_envio }, _onInfoClTanque_01, url);
}

function _onInfoClTanque_01(data){
    var res = data.split('|');
    if (res[0].trim() == '00'){
        if ($_NOVEDAD == '8') {
            $('#Descrip_cl_01').val(res[1]);
            _eliminarJson_01();
        } else if ($_NOVEDAD == '7') {
            jAlert({
                titulo: 'Mensaje ',
                mensaje: 'Ya existe código digitado',
            }, function () {
                modificar_01();
            });
        } else if ($_NOVEDAD == '9') {
            _eliminarJson_01();
            CON850_P(function (e) {                
                if (e.id == 'S') {
                    _onDllBomb01_1();
                } else {
                    modificar_01();
                }
            }, {
                    msj: '02'
            });
        }
    }else{
        if ($_NOVEDAD == '8' || $_NOVEDAD == '9') {
            plantillaError(res[0], 'No existe codigo digitado',res[2], modificar_01);
        } else if ($_NOVEDAD == '7') {
            _montarArray();
            validarPrimeraFase('1')
        }
        
    }
}

function validarPrimeraFase(orden){
    validarInputs(
        {
            form: '#fase1',
            orden: orden
        },
        modificar_01,
        validarClTanq_01
    )
}

function validarClTanq_01(){
    var segundoItem = cerosIzq($('#cm_01').val(), 3)
    var itemsTabla = $('#tabla_cl_tanq tbody td').length + 1;
    if (segundoItem > itemsTabla || segundoItem == '000') {
        $('#cm_01').val(cerosIzq(itemsTabla, 3));
        validarPrimeraFase('2');
    } else {
        $_CONSULT_CL = _consultarItemArray_clTanques(segundoItem);
        if ($_CONSULT_CL) {
            $('#med_01').val(parseFloat($_CONSULT_CL.array.COMP));
            _validarSegundaFase();
        } else {
            $('#cm_01').val(cerosIzq(segundoItem, 3));
            validarPrimeraFase('2');
        }
    }
}

function _validarSegundaFase(){
    validarInputs(
        {
            form: '#fase2',
            orden: '1'
        },
        function(){validarPrimeraFase('2')},
        validarMedid
    )
}

function validarMedid(){
    var index = $_CONSULT_CL.index;
    if (index > 1 && parseFloat($('#med_01').val()) > 0 && parseFloat($('#med_01').val()) < $_TABLA_CLTANQUES[index - 2].COMP){
        plantillaError('','07','BOMB01',function(){
            _validarSegundaFase();
        });
    }else{
        if (index > 280){
            _crearPlano();
        }else{
            $_TABLA_CLTANQUES[index-1].COMP = cerosIzq($('#med_01').val(),6);
            _montarTabla();
            $('#cm_01').val(parseFloat($('#cm_01').val())+1);
            validarPrimeraFase('2');
        }
    }
}

function _crearPlano(){
    var datosEnvio = {
        sesion: localStorage.Sesion,
        datos_cl_tanqu: $_TABLA_CLTANQUES
    };
    
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('paginas/inc/_datos_bomb01.php')
    }).done(function (data) {
        var res = data.split('|');
        if (res[0].trim() == '00') {
            _dllBomb01_1();
        } else {
            plantillaError(res[0], res[1], res[2]);
        }
    });
    
}

function _dllBomb01_1(){
    set_Event_validar('#fase2','off');
    CON850_P(function (e) {        
        if (e.id == 'S') {
            _onDllBomb01_1();
        } else {
            _validarSegundaFase();
        }
    }, {});
}

function _onDllBomb01_1(){
    var datos_envio  = datosEnvio();
        datos_envio += $_NOVEDAD;
        datos_envio += "|";
        datos_envio += cerosIzq($('#clTaan_01').val(),2);
        datos_envio += "|";
        datos_envio += $('#Descrip_cl_01').val();
        datos_envio += "|";
    SolicitarDll({ datosh: datos_envio }, _respDllBomb01_1, get_url("app/BOMB01_1.DLL"));
}

function _respDllBomb01_1(data){
    var res = data.split('|');
    if (res[0].trim() == '00'){
        modificar_01();
    }else{
        plantillaError(res[0], res[1], res[2], _solicitarAcceso);
    }
}

function _eliminarJson_01(){
    var rutaJson = get_url('PROGDATOS/JSON/SC-CLTANQS-' + localStorage.Sesion + '.JSON');
    SolicitarDatos(
        null,
        function (data) {
            $_TABLA_CLTANQUES = data.LISTADO;
            var arrayEliminar = [];
            arrayEliminar.push('SC-CLTANQS-' + localStorage.Sesion)
            on_eliminarJson('00')
            //_eliminarJson(arrayEliminar, on_eliminarJson);
        },
        rutaJson
    );
}

function on_eliminarJson(data){
    var res = data.split('|');
    if (res[0].trim() == '00') {
        if ($_NOVEDAD == '8'){
            _montarTabla();
            validarPrimeraFase('1');
        }
    } else {
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function _montarArray(){
    $_TABLA_CLTANQUES = new Array();
    for (var i = 0; i < 300 ;i++){
        $_TABLA_CLTANQUES[i] = new Array();
        var item = {COMP: '000000'};
        $_TABLA_CLTANQUES[i] = item;
    };
    _montarTabla();
}

function _montarTabla(){    
    $('#fase3').removeAttr('hidden',true);
    $('#tabla_cl_tanq tbody').html('');
    var num = 1;
    for (var i = 1; i <= 12; i++) {
        var column = $('<tr/>', { id: 'columna-' + i });
        for (var j = 1; j <= 25; j++) {
            column.append(
                $('<td/>',
                    { id: 'fila-' + num })
                    .html(num + ' - ' ).append($('<span/>', { class: 'bold' }).html($_TABLA_CLTANQUES[num-1]['COMP']))
            );
            num++;
        }
        $('table tbody').append(column)
    }
}

function _initBox_01(){
    $('#clTaan_01').val('');
    $('#Descrip_cl_01').val('');
    $('#cm_01').val('');
    $('#med_01').val('');
    $('#galon_01').val('');
    $('#tabla_cl_tanq tbody').html('');
    $('#fase3').attr('hidden',true);
}

function _consultarItemArray_clTanques(item) {
    var retornar = false;
    for (var i in $_TABLA_CLTANQUES) {
        if (parseFloat(item) == parseFloat(i)+1) {
            retornar = {
                index: parseFloat(i)+1,
                array: $_TABLA_CLTANQUES[i]
            };
        }
    }
    return retornar;
}