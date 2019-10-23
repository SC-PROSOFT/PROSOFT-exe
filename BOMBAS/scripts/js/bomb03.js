var $_TANQUES, $_CONSULT_TMP;

var medidaMask = new IMask(
        document.getElementById('medid_03'),
        {mask: Number, min: 0, max: 999, scale: 2, thousandsSeparator: ',', radix: '.'}
);


$(document).ready(function () {
    _cargarTanques();
});

function _cargarTanques() {
    _inputControl('reset');
    _inputControl('disabled');
    var datos_envio = datosEnvio()+ "00" + "|";
    SolicitarDll({datosh: datos_envio}, on_crearJsonTanques, get_url("app/BOMB03.DLL"));
}

function on_crearJsonTanques(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('PROGDATOS/JSON/SC-TANQUES-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
                null,
                function (data) {
                    $_TANQUES = data.LISTADO
                    $_TANQUES.pop();
                    var arrayEliminar = [];
                    arrayEliminar.push('SC-TANQUES-' + localStorage.Sesion)
                    _eliminarJson(arrayEliminar, on_eliminarJson_03);
                },
                rutaJson
                );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], _toggleNav);
    }
}

function on_eliminarJson_03(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        $('#tabla_cl_tanq_03 tbody').html('');
        for (var i in $_TANQUES) {
            $('#tabla_cl_tanq_03 tbody').append(''
                    + '<tr>'
                    + '   <td>' + $_TANQUES[i].COD + '</td>'
                    + '   <td>' + $_TANQUES[i].DESCRIP.trim() + '</td>'
                    + '   <td>' + $_TANQUES[i].DESCRIP_ART.trim() + '</td>'
                    + '   <td>' + $_TANQUES[i].MED.trim() + '</td>'
                    + '   <td>' + $_TANQUES[i].GAL + '</td>'
                    + '   <td>' + $_TANQUES[i].FECHA + '</td>'
                    + '   <td>' + $_TANQUES[i].HRA.trim() + '</td>'
                    + '   <td>' + $_TANQUES[i].OPER.trim() + '</td>'
                    + '</tr>'
                    );
        }
        modificar_03();
    } else {
        jAlert({titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>'}, _toggleNav);
    }
}

function modificar_03() {
    validarInputs(
            {
                form: '#consulta',
                orden: '1'
            },
            _toggleNav,
            on_validacionTabla
            );
}

function on_validacionTabla() {
    var segundoItem = cerosIzq($('#tanq_03').val(), 2)
    var itemsTabla = $('#tabla_cl_tanq_03 tbody tr').length + 1;
    if (segundoItem > itemsTabla || segundoItem == '00') {
        $('#tanq_03').val(cerosIzq(itemsTabla, 2));
        _initBoxTanque();
        modificar_03();
    } else {
        $_CONSULT_TMP = _consultarItemArray_tanques(segundoItem);
        if ($_CONSULT_TMP) {
            ano = $_CONSULT_TMP.array.FECHA.toString().substr(0, 2);
            mes = $_CONSULT_TMP.array.FECHA.toString().substr(2, 2);
            dia = $_CONSULT_TMP.array.FECHA.toString().substr(4, 2);
            hora = $_CONSULT_TMP.array.HRA.toString().substr(0, 2);
            mints = $_CONSULT_TMP.array.HRA.toString().substr(2, 2);
            medidaMask.unmaskedValue = $_CONSULT_TMP.array.MED.trim() || "0";
            $('#Descrip_03').val($_CONSULT_TMP.array.DESCRIP);
            $('#art_03').val($_CONSULT_TMP.array.DESCRIP_ART.trim());
            $('#galon_03').val($_CONSULT_TMP.array.GAL);
            $('#año_03').val(ano);
            $('#mes_03').val(mes);
            $('#dia_03').val(dia);
            $('#hora_03').val(hora);
            $('#mts_03').val(mints);
            $('#oper_03').val($_CONSULT_TMP.array.OPER);
            _validarSegundaFase('1');
        } else {
            $('#itemVales').val(cerosIzq(segundoItem, 2));
            _initBoxTanque();
            modificar_03();
        }
    }
}

function _validarSegundaFase(orden) {
    validarInputs(
            {
                form: '#fase1',
                orden: orden
            },
            modificar_03,
            _validarTerceraFase
            );
}

function _validarTerceraFase() {
    validarInputs(
            {
                form: '#fase2',
                orden: '1'
            },
            function (){_validarSegundaFase('5');},
            function () {
                $('#oper_03').val(localStorage.User);
                CON850_P(function (e) {
                    if (e.id == 'S') {
                        _dllBomb03_1();
                    } else {
                        _validarTerceraFase();
                    }
                }, {})
            }
    );
}

function _dllBomb03_1() {
    var data = bajarDatos_03();
    SolicitarDll({ datosh: data }, on_dllBomb03_01, get_url("app/BOMB03_1.DLL"));
}

function on_dllBomb03_01(data){
    var res = data.split('|');
    console.debug(res);
    if (res[0].trim() == '00') {
        _cargarTanques();
    } else {
        plantillaError(res[0], res[1], res[2], _validarTerceraFase);
    }
}

function bajarDatos_03() {
    var medida = medidaMask.unmaskedValue ? medidaMask.unmaskedValue : 0;
    medida = parseFloat(medida).toFixed(2).replace(/\./g, '');
    
    var fecha = $('#año_03').val() + $('#mes_03').val() + $('#dia_03').val();
    var hora = $('#hora_03').val() + $('#mts_03').val();

    var datos_envio = datosEnvio();
    datos_envio += cerosIzq($('#tanq_03').val().toString(),2);
    datos_envio += "|";
    datos_envio += $('#Descrip_03').val();
    datos_envio += "|";
    datos_envio += $_CONSULT_TMP.array.CLS;
    datos_envio += "|";
    datos_envio += $_CONSULT_TMP.array.ART.trim();
    datos_envio += "|";
    datos_envio += cerosIzq(medida.toString(), 5);
    datos_envio += "|";
    datos_envio += cerosIzq($('#galon_03').val(), 6);
    datos_envio += "|";
    datos_envio += fecha;
    datos_envio += "|";
    datos_envio += hora;
    datos_envio += "|";
    datos_envio += localStorage.User;
    datos_envio += "|";
    return datos_envio;
}

function _initBoxTanque() {
    $('#Descrip_03').val('');
    $('#art_03').val('');
    $('#medid_03').val('');
    $('#galon_03').val('');
    $('#año_03').val('');
    $('#mes_03').val('');
    $('#dia_03').val('');
    $('#hora_03').val('');
    $('#mts_03').val('');
    $('#oper_03').val('');
}

function _consultarItemArray_tanques(item) {
    var retornar = false;
    for (var i in $_TANQUES) {
        if (item == $_TANQUES[i].COD) {
            retornar = {
                index: i,
                array: $_TANQUES[i]
            };
        }
    }
    return retornar;
}