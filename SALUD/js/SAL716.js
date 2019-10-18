/* NOMBRE RM --> SER103D // NOMBRE ELECTR --> SAL716 */

$(document).ready(function () {
    _inputControl('disabled');
    _validarOrigen716();
});

function _validarOrigen716() {
    validarInputs(
        {
            form: "#origen716",
            orden: '1'
        },
        function () { _toggleNav },
        function () {
            $codigo715 = $('#codgOrig716').val();

            let datos_envio = datosEnvio()
            datos_envio += '|'
            datos_envio += $codigo715
            SolicitarDll({ datosh: datos_envio }, resptOrig716, get_url('/APP/SALUD/SAL712-01.DLL'));
        }
    )
}

function resptOrig716(data) {
    console.debug(data);
    var date = data.split('|');

    $_CODTR716 = date[1].trim();
    $_DESCRPTR716 = date[2].trim();

    if (date[0].trim() == '00') {
        _datosNomtr716();
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        _validarOrigen716();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _datosNomtr716() {
    $('#codgOrig716').val($_CODTR716);
    $('#decripOrg716').val($_DESCRPTR716);

    datoDesti716()
}

function datoDesti716() {
    validarInputs(
        {
            form: '#destino716',
            orden: '1'
        },
        function () { _validarOrigen716(); },
        function () {
            $codigoDst716 = $('#codgDest716').val();

            let datos_envio = datosEnvio()
            datos_envio += '|'
            datos_envio += $codigoDst716
            SolicitarDll({ datosh: datos_envio }, datoDestn716, get_url('/APP/SALUD/SAL712-01.DLL'));
        }
    )
}

function datoDestn716(data) {
    console.debug(data);
    var date = data.split('|');

    $_COD716 = date[1].trim();
    $_DESCRP716 = date[2].trim();

    if (date[0].trim() == '00') {
        if ($_COD716 == $_CODTR716) {
            console.debug('repetido')
            CON851('05', '05', null, 'error', 'Error');
            datoDesti716()
        } else {
            console.debug('diferente')
            $('#codgDest716').val($_COD716);
            $('#decripDest716').val($_DESCRP716);
            validacionCodigos716()
            // _datosDestino716();
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


function _datosDestino716() {
    $('#codgDest716').val($_COD716);
    $('#decripDest716').val($_DESCRP716);

    validacionCodigos716()
}


function validacionCodigos716() {
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_COD716
    SolicitarDll({ datosh: datos_envio }, validador716, get_url('/APP/SALUD/SAL716-TAB.DLL'));
}

function validador716(data) {
    console.debug(data);
    var date = data.split('|');

    $_CODTAB716 = date[1].trim();

    if (date[0].trim() == '00') {
        if ($codigoDst716 == $_CODTAB716) {
            console.debug('repetido 5F')
            CON851('5F', '5F', null, 'error', 'Error');
            CON851P('07', _validarOrigen716, envioDatos716)
        // } else {
        //     console.debug('diferente 5F')
        //     consoel();
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

// function consoel() {
//     console.debug('llego fin')
// }

function envioDatos716() {
    LLAMADO_DLL({
        dato: [$codigoDst716],
        callback: registroDatos716,
        nombredll: 'SAL716',
        carpeta: 'SALUD'
    })
}

function registroDatos716(data) {
    console.debug('registro')
    _inputControl('reset');
    _toggleNav();
    // CON851('39', '39', null, 'error', 'Error');
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        jAlert({ titulo: 'Mensaje 39', mensaje: "El proceso termino satisfactoriamente!" })
    } else {
        CON852(temp[0], temp[1], temp[2]);
    }
}