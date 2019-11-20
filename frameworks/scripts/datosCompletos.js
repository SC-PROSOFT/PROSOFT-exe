datoscompletos = [];

function obtenerDatosCompletos(data, callbackSucces) {
    var nombreFD = data.nombreFd.toUpperCase()
    var programa

    var ventanaimpresion = bootbox.dialog({
        message: '<div class="text-center"><div><i class="fa fa-spin fa-spinner"></i> Cargando ' + nombreFD + '...</div></div>',
        closeButton: false,
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-success',
                callback: function () {
                    callbackSucces(datoscompletos);
                    datoscompletos = [];
                }
            }
        }
    })
    ventanaimpresion.init($('.modal-footer').hide());

    switch (nombreFD) {
        case 'ENFERMEDADES':
            programa = "SALUD/SER851"
            // no requiere filtro
            break;
        case 'PACIENTES':
            programa = "SALUD/SER810"
            break;
        case 'ENTIDADES':
            programa = "SALUD/SER853"
            break;
        case 'OCUPACIONES':
            programa = "SALUD/SER854"
            break;
        case 'CIUDADES':
            programa = "CONTAB/CON809"
            break;
        case 'PROFESIONALES':
            programa = "SALUD/SER819"
            break;
        case 'TERCEROS':
            programa = "CONTAB/CON802"
            break;
        case 'DIVISION':
            programa = "INVENT/INV809-03"
            break;
        case 'IPS':
            programa = "SALUD/SER813"
            break;
        case 'NUMERACION':
            programa = "SALUD/SER808"
            break;
        case 'SERV_HOSP':
            programa = "SALUD/SER812"
            break;
        case 'ZONAS_RUTAS':
            programa = "CONTAB/CON810"
            break;
        case 'PATOLOGIAS':
            programa = "SALUD/SER858"
            break;
        case 'PAISES_RIPS':
            programa = "SALUD/SER888"
            break;
        case 'UNSERV':
            programa = "SALUD/SER873"
            break;
        case 'COSTOS':
            programa = "CONTAB/CON803"
            break;
        case 'ARTICULOS':
            programa = "INVENT/INV803"
            break;
        case 'TABLAS':
            programa = "SALUD/SER802"
            break;
        case 'GRUPO-SER':
            programa = "SALUD/SAL711-01"
            break;
        case 'CTA-MAYOR':
            programa = "CONTAB/CON801"
            break;
        case 'NOM-TAR':
            programa = "SALUD/SAL712-01"
            break;
        case 'ETNIAS':
            programa = "SALUD/SER867"
            break;
        case 'PAIRIP':
            programa = "SALUD/SER888"
            break;
        case 'COLEGIOS':
            programa = "SALUD/SER902"
            break;
        case 'CLASIPACI':
            programa = "SALUD/SER868"
            break;
        default:
                jAlert(
                    { titulo: 'Error', mensaje: 'Nombre de fd no válido' },
                    _toggleNav
                );
            break;
        // pendiente por terminar de cuadrar
        // case 'MACRO-EVOL': programa = "HICLIN/HC107"
        //     break;
    }

    var datos_envio_DC = datosEnvio();
    if (data.filtro) {
        datos_envio_DC += data.filtro
        datos_envio_DC += '|'
        if (data.campo) {
            datos_envio_DC += data.campo
            datos_envio_DC += '|'
        }
    }
    console.log(datos_envio_DC)
    let URL = get_url("APP/" + programa + ".DLL");

    postData({
        datosh: datos_envio_DC
    }, URL)
        .then((data) => {
            datoscompletos = data;
            console.debug(datoscompletos);
            $('.btn-success').click();
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}