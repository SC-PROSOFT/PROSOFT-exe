function obtenerDatosCompletos(data, callbackSucces) {
    var nombreFD = data.nombreFd.toUpperCase()
    var programa
    var objLocal = ''

    var ventanaimpresion = bootbox.dialog({
        message: '<div class="text-center"><div><i class="fa fa-spin fa-spinner"></i> Cargando ' + nombreFD + '...</div></div>',
        closeButton: false,
        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-success',
                callback: function () {

                }
            }
        }
    })
    ventanaimpresion.init($('.modal-footer').hide());
//REVISION PABLO
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
            // SI REQUIERE FILTRO
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
            programa = "SALUD/SER801"
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
//REVISION DIANA            
        case 'PREFIJOS':
            programa = "INVENT/INV109"
            // NO REQUIERE FILTRO
            break;
        case 'LOTES':
            programa = "CONTAB/CON110I"
            // NO REQUIERE FILTRO
            break;
        case 'GRUPOTAR':
            programa = "SALUD/SER803"
            // NO REQUIERE FILTRO
            break;
        case 'LOCALIZACION':
            programa = "INVENT/INV801"
            // NO REQUIERE FILTRO
            break;
        case 'GRNEGOCIO':
            programa = "CONTAB/CON818"
            // NO REQUIERE FILTRO
            break;
        case 'CLASC':
            programa = "CONTAB/CON810S"
            // NO REQUIERE FILTRO
            break;
        case 'VENDEDOR':
            programa = "CONTAB/CON805"
            // NO REQUIERE FILTRO
            break;
        case 'USO':
            programa = "INVENT/INV806"
            // SI REQUIERE FILTRO
            break;
        case 'POLIT':
            programa = "INVENT/INV807"
            // NO REQUIERE FILTRO
            break;
        case 'GRUPOS':
            programa = "INVENT/INV804"
            // SI REQUIERE FILTRO
            break;
        case 'COSTO':
            programa = "CONTAB/CON803-01"
            // NO REQUIERE FILTRO
            break;
        case 'ESPECIALIDAD':
            programa = "SALUD/SER855"
            // NO REQUIERE FILTRO
            break;
        case 'SUCURSALES':
            programa = "CONTAB/CON823"
            // NO REQUIERE FILTRO
            break;
        case 'OPERADOR':
            programa = "CONTAB/CON982"
            // NO REQUIERE FILTRO
            break;
        case 'PREMED':
            programa = "SALUD/SER103"
            // SI REQUIERE FILTRO
            break;
        case 'MEDATC':
            programa = "SALUD/SER857"
            // NO REQUIERE FILTRO
            break;
        case 'GRCAPITA':
            programa = "SALUD/SER871"
            // NO REQUIERE FILTRO
            break;
        case 'COMUNIDADES':
            programa = "SALUD/SER116A"
            // NO REQUIERE FILTRO
            break;
        case 'RESGUARDOS':
            programa = "SALUD/SER117A"
            // NO REQUIERE FILTRO
            break;
        case 'EQUIOPERADOR':
            programa = "SALUD/SER11V"
            // NO REQUIERE FILTRO
            break;
        case 'TARIFAS':
            programa = "SALUD/SER804"
            // NO REQUIERE FILTRO
            break;
        case 'DESPLAZADO':
            programa = "SALUD/SER810D"
            // NO REQUIERE FILTRO
            break;
        case 'PROFESION':
            objLocal = {
                'PROFESION': [
                    { 'COD': '1', 'DESCRIP': 'MEDICO ESPECIALISTA' },
                    { 'COD': '2', 'DESCRIP': 'MEDICO GENERAL' },
                    { 'COD': '3', 'DESCRIP': 'ENFERMERO(A) JEFE' },
                    { 'COD': '4', 'DESCRIP': 'AUXILIAR ENFERMERIA' },
                    { 'COD': '5', 'DESCRIP': 'TERAPEUTAS Y OTROS' },
                    { 'COD': '6', 'DESCRIP': 'ENFERMERA JEFE P Y P' },
                    { 'COD': '7', 'DESCRIP': 'PSICOLOGIA' },
                    { 'COD': '8', 'DESCRIP': 'NUTRICIONISTA' },
                    { 'COD': '9', 'DESCRIP': 'NO APLICA' },
                    { 'COD': 'A', 'DESCRIP': 'ODONTOLOGO' },
                    { 'COD': 'B', 'DESCRIP': 'AUDITOR MEDICO' },
                    { 'COD': 'H', 'DESCRIP': 'HIGIENE ORAL' },
                    { 'COD': 'I', 'DESCRIP': 'INSTRUMENTADOR(A)' },
                    { 'COD': 'O', 'DESCRIP': 'OPTOMETRA' },
                    { 'COD': 'T', 'DESCRIP': 'TRABAJO SOCIAL' },
                ]
            }
            break;
        case 'ESPCUPS':
            programa = "SALUD/SAL71A-C"
            // se puede filtrar por cod-cups
            break;
        case 'CUPS':
            programa = "SALUD/SER802C"
            break;
        default:
            $('.btn-success').click();
            jAlert(
                { titulo: 'Error', mensaje: 'Nombre de fd no válido' },
                _toggleNav
            );
            break;
      
    }

    if (objLocal == '') {
        var datos_envio_DC = datosEnvio();
        if (data.filtro) {
            datos_envio_DC += data.filtro
            datos_envio_DC += '|'
            if (data.campo) {
                datos_envio_DC += data.campo
                datos_envio_DC += '|'
            }
        }

        let URL = get_url("APP/" + programa + ".DLL");


        postData({
            datosh: datos_envio_DC
        }, URL)
            .then((data) => {
                callbackSucces(data);
                $('.btn-success').click();
            })
            .catch(error => {
                console.error(error)
                // _toggleNav()
            });
    } else {
        $('.btn-success').click();
        callbackSucces(objLocal);
        objLocal = ''
    }
}