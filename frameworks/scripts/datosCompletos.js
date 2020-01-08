(function ($) {
    $.datoscompletos = {
        dll: [],
        callback: null,
        callbackerror: null,
        objLocal: '',
        estado: null,

        _init: (dll, callbackSucces, estado, callbackError) => {
            dll == undefined ? $.datoscompletos.dll = console.error('No tiene ningún DLL') : $.datoscompletos.dll = dll;
            estado == undefined ? $.datoscompletos.estado = '' : $.datoscompletos.estado = estado.toUpperCase();
            $.datoscompletos.callback = callbackSucces;
            callbackError == undefined ? $.datoscompletos.callbackerror = _toggleNav : $.datoscompletos.callbackerror = callbackError;

            $.datoscompletos._consulta(dll);
            $.datoscompletos._cargando();
        },

        _consulta: (dll) => {
            DLLS = {
                'ENFERMEDADES':  'SALUD/SER851', 
                'PACIENTES':     'SALUD/SER810',
                'ENTIDADES':     'SALUD/SER853',
                'OCUPACIONES':   'SALUD/SER854',
                'CIUDADES':      'CONTAB/CON809',
                'PROFESIONALES': 'SALUD/SER819',
                'TERCEROS':      'CONTAB/CON802',
                'DIVISION':      'INVENT/INV809-03',
                'IPS':           'SALUD/SER813',
                'NUMERACION':    'SALUD/SER808',
                'SERV_HOSP':     'SALUD/SER812',
                'ZONAS_RUTAS':   'CONTAB/CON810', // SI REQUIERE FILTRO
                'PATOLOGIAS':    'SALUD/SER858',
                'PAISES_RIPS':   'SALUD/SER888',
                'UNSERV':        'SALUD/SER873',
                'COSTOS':        'CONTAB/CON803',
                'ARTICULOS':     'INVENT/INV803',
                'TABLAS':        'SALUD/SER802',
                'GRUPO-SER':     'SALUD/SER801',
                'CTA-MAYOR':     'CONTAB/CON801',
                'ETNIAS':        'SALUD/SER867',
                'COLEGIOS':      'SALUD/SER902',
                'CLASIPACI':     'SALUD/SER868',
                'PREFIJOS':      'INVENT/INV109',
                'LOTES':         'CONTAB/CON110I',
                'GRUPOTAR':      'SALUD/SER803',
                'LOCALIZACION':  'INVENT/INV801',
                'GRNEGOCIO':     'CONTAB/CON818',
                'CLASC':         'CONTAB/CON810S',
                'VENDEDOR':      'CONTAB/CON805',
                'USO':           'INVENT/INV806', // SI REQUIERE FILTRO
                'POLIT':         'INVENT/INV807',
                'GRUPOS':        'INVENT/INV804', // SI REQUIERE FILTRO
                'COSTO':         'CONTAB/CON803-01',
                'ESPECIALIDAD':  'SALUD/SER855',
                'SUCURSALES':    'CONTAB/CON823',
                'OPERADOR':      'CONTAB/CON982',
                'PREMED':        'SALUD/SER103', // SI REQUIERE FILTRO
                'MEDATC':        'SALUD/SER857',
                'GRCAPITA':      'SALUD/SER871',
                'COMUNIDADES':   'SALUD/SER116A',
                'RESGUARDOS':    'SALUD/SER117A',
                'EQUIOPERADOR':  'SALUD/SER11V',
                'TARIFAS':       'SALUD/SER804',
                'DESPLAZADO':    'SALUD/SER810D',
                'ESPCUPS':       'SALUD/SAL71A-C', // se puede filtrar por cod-cups
                'CUPS':          'SALUD/SER802C',
                'PROFESION' : {
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
                              ]},
            }
            let ruta = DLLS[dll.nombreFd.toUpperCase()];
            let datos_envio = datosEnvio();
            if (dll.filtro) {
                datos_envio += dll.filtro + '|';
                if (dll.campo) datos_envio += dll.campo + '|';
            }
            if (typeof ruta === 'object') {
                $.datoscompletos.callback(ruta);
            } else {
                let URL = get_url("APP/" + ruta + ".DLL");
                postData({
                    datosh: datos_envio
                }, URL)
                    .then(data => {
                        console.log(data)
                        $.datoscompletos.callback(data);
                        if ($.datoscompletos.estado == 'ONLY') {
                            loader('hide');
                        }
                    })
                    .catch(error => {
                        console.error(error)
                        $.datoscompletos.callbackerror();
                    });
            }
        },

        _cargando: () => {
            switch ($.datoscompletos.estado) {
                case 'ON':
                    loader('show');
                    break;
                case 'OFF':
                    loader('hide');
                    break;
                case 'ONLY':
                    loader('show');
                    break;
            }
        }

    },
        obtenerDatosCompletos = function (dll, callbackSucces, estado, callbackError) {
            $.datoscompletos._init(dll, callbackSucces, estado, callbackError);
        }
})(jQuery);