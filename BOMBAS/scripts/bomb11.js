var $_DATOS_BOMB11, $_FECHA_INI, $_FECHA_FIN, $_FECHA_NUM, $_FECHA_ACT, $_NIT, $_TERCEROS_11;
$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    $_FECHA_ACT = moment().format('YY-MM-DD');
    _crearJsonTerceros();

    _toggleF8([
        { input: 'nitBomb', app: '11', funct: _ventanatTerceros },
    ]);
});

// $(document).on('click', '#nitBtnBomb11', _ventanatTerceros);
// $(document).on('keydown', '#nitBomb11', _ventanatTerceros);

function _ventanatTerceros(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda terceros',
            columnas: ["COD", "NOMBRE"],
            data: $_TERCEROS_11,
            callback: function (data) {
                $('#nitBomb_11').val(data.COD);
                $('#nitBomb_11').focus();
            }
        });
    }
}

function _crearJsonTerceros() {
    SolicitarDll({ datosh: datosEnvio() }, on_crearJsonTerceros, get_url("app/bombas/CON802.DLL"));
}

function on_crearJsonTerceros(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('temp/SC-ARCHTER-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (data) {
                $_TERCEROS_11 = data.TERCEROS;
                $_TERCEROS_11.pop();
                var arrayEliminar = [];
                arrayEliminar.push('SC-ARCHTER-' + localStorage.Sesion + ".json")
                _eliminarJson(arrayEliminar, on_eliminarJsonTerce);
            },
            rutaJson
        );
    } else {
        plantillaError(res[0], res[1], res[2]);
    }
}

function on_eliminarJsonTerce(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        SolicitarDll({ datosh: datosEnvio() }, on_validarFecha_envio_bomb11, get_url('app/bombas/BOMB11.DLL'));
    } else {
        plantillaError('Error ', 'Ha ocurrido un error eliminando archivos <b>.JSON</b>', '');
    }
}

function on_validarFecha_envio_bomb11(data) {
    loader('hide');
    var res = data.split('|');
    if (res[0].trim() == '00') {
        $_DATOS_BOMB11 = res;
        $_FECHA_INI = res[1];
        $_FECHA_NUM = res[5];
        fechaInicial();
    } else {
        plantillaError(res[0], res[1], res[2]);
    }

}

function fechaInicial() {
    $('#añoInicial').val($_FECHA_INI.toString().substr(0, 2));
    $('#mesInicial').val($_FECHA_INI.toString().substr(2, 2));
    $('#diaInicial').val($_FECHA_INI.toString().substr(4, 2));
    validarInputs(
        {
            form: '#validarFechas',
            orden: '1'
        },
        _toggleNav,
        validarFechaInicial
    );
}

function validarFechaInicial() {
    ano = $('#añoInicial').val();
    mes = $('#mesInicial').val();
    dia = $('#diaInicial').val();
    if (mes < 1 || mes > 12 || dia < 1 || dia > 31) {
        fechaInicial();
    } else {
        $_FECHA_INI = ano + mes + dia;

        if ($_FECHA_NUM.toString().substr(0, 2) == $_FECHA_ACT.split('-')[0]
            && $_FECHA_NUM.toString().substr(2, 2) == $_FECHA_ACT.split('-')[1]) {
            dia = $_FECHA_ACT.split('-')[2];
        } else {
            dia = $_FECHA_NUM.toString().substr(4, 2);
        }
        $_FECHA_FIN = ano + mes + dia;
        fechaFinal();
    }

}

function fechaFinal() {
    $('#añoFinal').val($_FECHA_FIN.toString().substr(0, 2));
    $('#mesFinal').val($_FECHA_FIN.toString().substr(2, 2));
    $('#diaFinal').val(dia);
    validarInputs(
        {
            form: '#fase1',
            orden: '1'
        },
        _toggleNav,
        validarFechaFinal
    );
}

function validarFechaFinal() {
    ano = $('#añoFinal').val();
    mes = $('#mesFinal').val();
    dia = $('#diaFinal').val();
    if (mes < 1 || mes > 12) {
        fechaFinal();
    } else {
        mes_ini = $_FECHA_INI.toString().substr(2, 2);
        if (mes == mes_ini || mes == (mes_ini + 1)) {
            if ($_FECHA_FIN < $_FECHA_INI) {
                fechaFinal();
            } else {
                nitProcesar();
            }
        } else {
            fechaFinal();
        }
    }
}

function nitProcesar() {
    validarInputs(
        {
            form: '#fase2',
            orden: '1'
        },
        _toggleNav,
        _validarTercero_11
    );
}

function _validarTercero_11() {
    var descript = buscarTercero_11($('#nitBomb_11').val());
    if (descript || $('#nitBomb_11').val() == '99') {
        if ($('#nitBomb_11').val() == '99') {
            $('#descripBomb11').val('PROCESO TOTAL');
        } else {
            $('#descripBomb11').val(descript.NOMBRE);
        }
        CON850_P(function (data) {
            if (data.id == 'S') {
                loader('show');
                var datos_envio = datosEnvio();
                datos_envio += localStorage.Usuario;
                datos_envio += "|";
                datos_envio += $_FECHA_INI;
                datos_envio += "|";
                datos_envio += $_FECHA_FIN;
                datos_envio += "|";
                datos_envio += cerosIzq($('#nitBomb_11').val(), 10);
                datos_envio += "|";
                datos_envio += $_DATOS_BOMB11[2];
                datos_envio += "|";
                datos_envio += $_DATOS_BOMB11[4];
                datos_envio += "|";
                SolicitarDatos({ datosh: datos_envio }, resptDllBoomb11, get_url("app/bombas/BOMB11_1.DLL"));
            } else {
                nitProcesar();
            }
        }, { msj: '04' });
    } else {
        nitProcesar();
    }
}

function resptDllBoomb11(data) {
    var res = data.split('|');
    console.debug(res)
    if (res[0].trim() == '00') {
        loader('hide');
        _inputControl('reset');
        _inputControl('disabled');
        fechaInicial();
    } else {
        plantillaError(res[0], res[1], res[2]);
    }
}

function buscarTercero_11(codigo) {
    var retornar = false;
    for (var i in $_TERCEROS_11) {
        let code = $_TERCEROS_11[i].COD.trim().toLowerCase();
        if (code.trim() == codigo.toLowerCase()) {
            retornar = $_TERCEROS_11[i];
            break;
        }
    }
    return retornar;
}
