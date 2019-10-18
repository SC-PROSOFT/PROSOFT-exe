/* NOMBRE RM --> SER105 // NOMBRE ELECTR --> SAL715 */

var arraygrpser;

$(document).ready(function () {
    _inputControl('disabled');
    _validarCodigo715();
});

function _validarCodigo715() {
    validarInputs(
        {
            form: "#codincrem715",
            orden: '1'
        },
        function () { _toggleNav },
        function () {
            $codigo715 = $('#codigo715').val();

            let datos_envio = datosEnvio()
            datos_envio += '|'
            datos_envio += $codigo715
            SolicitarDll({ datosh: datos_envio }, datoNomtr715, get_url('/APP/SALUD/SAL712-01.DLL'));
        }
    )
}

function datoNomtr715(data) {
    console.debug(data);
    var date = data.split('|');

    $_CODTR715 = date[1].trim();
    $_DESCRPTR715 = date[2].trim();

    if (date[0].trim() == '00') {
        _datosNomtr715();
    }
    else if (date[0].trim() == '01') {
        CON851('01', '01', null, 'error', 'Error');
        _validarCodigo715();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _datosNomtr715() {
    $('#codigo715').val($_CODTR715);
    $('#descrip715').val($_DESCRPTR715);

    opcion1_715()
}

function opcion1_715() {
    validarInputs(
        {
            form: '#opcion715',
            orden: '1'
        },
        function () { _validarCodigo715(); },
        function () { porcent715() }
    )
}

function porcent715() {
    validarInputs(
        {
            form: '#porcentaje715',
            orden: '1'
        },
        function () { _validarCodigo715(); },
        function () { grupo715() }
    )
}

function grupo715() {
    validarInputs(
        {
            form: '#porcentaje715',
            orden: '2'
        },
        function () { porcent715(); },

        function () {
            envioDatos715()
            // $grupo715 = $('#grupo715').val();
            // let datos_envio = datosEnvio()
            // datos_envio += '|'
            // datos_envio += $grupo715
            // SolicitarDll({ datosh: datos_envio }, datoGrupo715, get_url('/APP/SALUD/SAL715-GR.DLL'));
        }
    )
}

// function datoGrupo715(data) {
//     console.debug(data);
//     var date = data.split('|');
//     $_GRUPOTAB715 = date[1].trim();

//     if (date[0].trim() == '00') {
//         if ($grupo715  === 'XX'){

//             envioDatos715()
//         } else {
//             if ($grupo715 != $_GRUPOTAB715 ){
//                 _toggleNav()
//             }
//         }
//         // _datosNomtr715();
//     }
//     else if (date[0].trim() == '01') {
//         _toggleNav()
//     }
//     // else {
//     //     CON852(date[0], date[1], date[2], _toggleNav);
//     // }
// }

function envioDatos715() {
    var porcentj715 = cerosIzq($('#porcnt715').val(), 5);
    // var grupo715 = cerosIzq($('#grupo715').val(), 2);

    LLAMADO_DLL({
        dato: [$codigo715, porcentj715],
        callback: registroDatos715,
        nombredll: 'SAL715',
        carpeta: 'SALUD'
    })
}

function registroDatos715(data) {
    console.debug('registro')
    _inputControl('reset');
    _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        jAlert({ titulo: 'Notificacion', mensaje: "Guardado Correctamente" })
    } else {
        CON852(temp[0], temp[1], temp[2]);
    }
}