var $_OTRSTAT = '00', $_APEL2TER2W = ' ', $_DESCRIPTER2W = ' ', $_NOMBRECLIW = ' ', $_ENTIDADTERCEW = '', $_CONVENIOTERCEW = '', $_NOMCOMERTERCEW = '',
    $_OTROSTERCEW = '', $_CONTACTTERCEW = '', $_WEBTERCEW = '', $_CARGOTERCEW = '', $_EMAILTERCEW = '', $_ASESORTERCEW = '', $_TIPOCUPOTERCEW = '', $_RUTTERCEW = '',
    $_PLAZOTERCEW = '', $_ORDENTERCEW = '', $_ACTIVICATERCEW = '', $_PORCICATERCEW = '', $_PORCRETTERCEW = '', $_GRANCONTRIBTERCEW = '', $_RETETERCEW = '',
    $_RETIVACOMPTERCEW = '', $_RETIVATERCEW = '', $_EXENTRETTERCEW = '', $_SEGUROTERCEW = '', $_DATACRETERCEW = '', $_ACUEPAGOTERCEW = '', $_CAPITADOTERCEW = '',
    $_NITCLITERCEW = '', $_RETICAVTERCEW = '', $_BLOQTERCEW = '', $_VLRBASERETTERCEW = '', $_EXIVATERCEW = '', $_EMPRESAVEHTERCEW = '', $_MARCATERCEW = '', $_NROVEHTERCEW = '', $_PLACAVEHTERCEW = '',
    $_IDREPRETERCEW = '', $_NOMREPRETERCEW = '', $_EMAILREPTERCEW = '', $_IDTESORTERCEW = '', $_NOMTESORTERCEW = '', $_EMAILTESOTERCEW = '', $_NOMREF1TERCEW = '', $_DIRREF1TERCEW = '',
    $_TELREF1TERCEW = '', $_RELREF1TERCEW = '', $_NOMREF2TERCEW = '', $_DIRREF2TERCEW = '', $_TELREF2TERCEW = '', $_RELREF2TERCEW = '', $_NOMREF3TERCEW = '',
    $_DIRREF3TERCEW = '', $_TELREF3TERCEW = '', $_RELREF3TERCEW = '', $_NOMTRABTERCEW = '', $_DIRTRABTERCEW = '', $_TELTRABTERCEW = '', $_CARTRABTERCEW = '',
    $_SUETRABTERCEW = '', $_ANTTRABTERCEW = '', $_FECHANACTERCEW = '', $_CIUEXPTERCEW = '', $_FECHAAFILTERCEW = '', $_EMBARGOTERCEW = '', $_ENTIDAFITERCEW = '', $_NOMBRETABLA = ''
    $_PAGOTERCEW = '00', $_CODZONAW = '', $_CODRUTAW = '', $_TIPOIDTERCEW = '', $_REGIVATERCEW = '', $_CALIFITERCEW = '', $_VENDTERCEW = '';
var $_CODTERCEROLNK, $_NOMTERCEROLNK = '', $_FPAGOLNK, swinvalid;
var CON110C = []; var tabla110C = [];

var porcentica_110cMask = new IMask(document.getElementById('porcetica_110c'),
    { mask: Number, min: 0, max: 99999, scale: 3, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var porcentreten_110cMask = new IMask(document.getElementById('porcentreten_110c'),
    { mask: Number, min: 0, max: 999, scale: 1, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);
var plazoUnitMask_110c = new IMask($('#plazo_110c')[0], { mask: Number, thousandsSeparator: ',' });

var factventas_110cMask = new IMask(document.getElementById('factventas_con110c'),
    { mask: Number, radix: '.', scale: 2, padFractionalZeros: true}
);

var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);

////////////////////////////////MAESTRO ARTICULOS///////////////////////////////7

$(document).ready(function () {
    $('.page-content-fixed-header').append('<ul class="page-breadcrumb">' +
        '<li>' +
        '<a href="#" id="nombreOpcion">1,3,1 - Maestro de Terceros  </a>' +
        '</li>' +
        '</ul>')
    _inputControl("reset");
    _inputControl("disabled");
    loader('hide');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;

    $_NOMUSU = $_USUA_GLOBAL[0].NOMBRE;
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_CONTADOUSU = $_USUA_GLOBAL[0].CONTADO;
    $_PUCUSU = $_USUA_GLOBAL[0].PUC;
    $_LOTEFARMUSU = $_USUA_GLOBAL[0].LOTE_FAMR;
    $_SALMINUSU = $_USUA_GLOBAL[0].SAL_MIN;
    $_BARRAS_USU = $_USUA_GLOBAL[0].BARRAS;
    $_IVA_USU = $_USUA_GLOBAL[0].IVA1;
    $_IVA_2_USU = $_USUA_GLOBAL[0].IVA2;
    $_IVA_3_USU = $_USUA_GLOBAL[0].IVA3;
    $_CLAVEINVUSU = $_USUA_GLOBAL[0].CLAVE_INV;
    $_BARRASUSULNK = ' ';
    $_LISTAPRECIOUSU = $_USUA_GLOBAL[0].LISTA_PRECIO;
    $_CARTERAUSU = $_USUA_GLOBAL[0].CARTERA;
    $_PLACAUSU = $_USUA_GLOBAL[0].PLACA;
    $_CUOTASUSU = $_USUA_GLOBAL[0].CUOTAS;
    $_TIPOEMPRESAUSU = $_USUA_GLOBAL[0].TIPO_EMPRE;
    $_RETENEDORUSU = $_USUA_GLOBAL[0].RETENEDOR;

    _toggleF8([
        { input: 'codclien', app: 'con110c', funct: _ventanatercerosCON110C },
        { input: 'ciudad', app: 'con110c', funct: _ventanaciudadesCON110C },
        { input: 'actividad', app: 'con110c', funct: _ventanaactividadCON110C },
        { input: 'entidad', app: 'con110c', funct: _ventanaentidadCON110C },
        { input: 'zona', app: '110c', funct: _ventanazonasCON110C },
        { input: 'ruta', app: '110c', funct: _ventanarutaCON110C },
        { input: 'grdnegocio', app: '110c', funct: _ventanagrdnegocioCON110C },
        { input: 'clasifclien', app: '110c', funct: _ventanaclasclienteCON110C },
        { input: 'convenio', app: '110c', funct: _ventanaconvenioCON110C }

    ]);
    obtenerDatosCompletos({
        nombreFd: 'TERCEROS'
    }, function (data) {
        $_TERCEROS_CON110C = data.TERCEROS
        $_TERCEROS_CON110C.pop()
        obtenerDatosCompletos({
            nombreFd: 'CIUDADES'
        }, function (data) {
            $_CIUDAD_CON110C = data.CIUDAD
            $_TERCEROS_CON110C.pop()
            _comenzaropccon110c();
        }, 'OFF')
    }, 'ON')
})


////////////////////////////////////F8////////////////////////////////

function _ventanatercerosCON110C(e) {

    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite_v2({
            titulo: 'VENTANA DE TERCEROS',
            data: $_TERCEROS_CON110C,
            indice: ["COD", "NOMBRE", "DIRREC", "TELEF", "CIUDAD", "FACTOR", "ACT"],
            mascara: [{
                "COD": 'Identificacion',
                "NOMBRE": 'Nombre',
                "DIRREC": "direccion",
                "TELEF": "telefono"
            }],
            minLength: 3,
            callback: function () {
                $("#codclien_con110c").focus();
            }, callback: function (data) {
                $_CODTERCEROW = data.COD.trim();
                $_CODTERCEROW = $_CODTERCEROW.padStart(10, "0");

                $('#codclien_con110c').val($_CODTERCEROW);
                // document.getElementById("codclien_con110c").value = data.COD;
                // document.getElementById("nitd_108").value = data.NOMBRE;
                _enterInput('#codclien_con110c');
            }
        });
    }
}

function _ventanaciudadesCON110C(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA DE CIUDADES",
            columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
            data: $_CIUDAD_CON110C,
            callback_esc: function () {
                $("#ciudad_con110c").focus();
            },
            callback: function (data) {
                document.getElementById('ciudad_con110c').value = data.COD.trim();
                document.getElementById('ciudadd_con110c').value = data.NOMBRE;
                _enterInput('#ciudad_con110c');
            }
        });
    }
}


function _ventanaactividadCON110C(e) {
    var $_ACT_CON110C = [];
    let URL = get_url("APP/" + "CONTAB/CON806" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_ACT_CON110C = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE ACTIVIDADES",
                    columnas: ["COD", "DESCRIP"],
                    data: $_ACT_CON110C.ACTIVIDADES,
                    callback_esc: function () {
                        $("#actividad_con110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('actividad_con110c').value = data.COD;
                        document.getElementById('actividadd_con110c').value = data.DESCRIP;

                        _enterInput('#actividad_con110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaentidadCON110C(e) {
    var $_ENTIDADES_CON110C = [];
    let URL = get_url("APP/" + "SALUD/SER853" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_ENTIDADES_CON110C = data;

            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE ENTIDADES',
                    columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
                    data: $_ENTIDADES_CON110C.ENTIDADES,
                    callback_esc: function () {
                        $("#entidad_con110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('entidad_con110c').value = data["COD-ENT"];
                        document.getElementById('entidadd_con110c').value = data['NOMBRE-ENT'];
                        _enterInput('#entidad_con110c');
                    }
                });

            }
        })
        .catch((error) => {
            console.log(error)
        });

}

function _ventanazonasCON110C(e) {
    var $_ZONA_7767 = [];
    let URL = get_url("APP/" + "CONTAB/CON810" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_ZONA_7767 = data.ZONAS;
            TIPOZONA = "1";
            filtrozonas = $_ZONA_7767.filter(zona => (zona.TIPO == TIPOZONA))

            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE ZONAS",
                    columnas: ["ZONA", "NOMBRE"],
                    data: filtrozonas,
                    callback_esc: function () {
                        $("#zona_110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('zona_110c').value = data.ZONA;

                        _enterInput('#zona_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanarutaCON110C(e) {
    var $_RUTA_7767 = [];
    let URL = get_url("APP/" + "CONTAB/CON810" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_RUTA_7767 = data.ZONAS;
            TIPORUTA = "2";
            filtrorutas = $_RUTA_7767.filter(ruta => (ruta.TIPO == TIPORUTA))
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE ZONAS",
                    columnas: ["ZONA", "NOMBRE"],
                    data: filtrorutas,
                    callback_esc: function () {
                        $("#ruta_110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('ruta_110c').value = data.ZONA;

                        _enterInput('#ruta_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanagrdnegocioCON110C(e) {
    var $_GRADONEG_7767 = [];
    let URL = get_url("APP/" + "CONTAB/CON818" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_GRADONEG_7767 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE GRADO DE NEGOCIOS',
                    columnas: ["TIPO", "NOMBRE"],
                    data: $_GRADONEG_7767.GRNEGOCIO,
                    callback_esc: function () {
                        $("#grdnegocio_110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('grdnegocio_110c').value = data.TIPO;
                        document.getElementById('grdnegociod_110c').value = data.NOMBRE;

                        _enterInput('#grdnegocio_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });

}

function _ventanaclasclienteCON110C(e) {
    var $_CLASC_110C = [];
    let URL = get_url("APP/" + "CONTAB/CON810S" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CLASC_110C = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: 'VENTANA DE CLASIFICACION CLIENTES',
                    columnas: ["COD", "DESCRIP"],
                    data: $_CLASC_110C.CLASC,
                    callback_esc: function () {
                        $("#clasifclien_110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('clasifclien_110c').value = data.COD;
                        document.getElementById('clasifcliend_110c').value = data.DESCRIP;
                        // $('#clasifclien_110c').val(data.llave_clasc);
                        // $('#clasifcliend_110c').val(data.descrip_clasc.trim());
                        _enterInput('#clasifclien_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

function _ventanaconvenioCON110C(e) {
    var $_CONVENIO_CON110C = [];
    let URL = get_url("APP/" + "SALUD/SER804" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CONVENIO_CON110C = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONVENIOS",
                    columnas: ["COD", "DESCRIP"],
                    data: $_CONVENIO_CON110C.TARIFAS,
                    callback_esc: function () {
                        $("#convenio_con110c").focus();
                    },
                    callback: function (data) {
                        document.getElementById('convenio_110c').value = data.COD;
                        document.getElementById('conveniod_con110c').value = data.DESCRIP;

                        _enterInput('#convenio_110c');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

/////////////////////////////// OPCION CON110C- MAESTRO DE TERCEROS //////////////////////////////////

function _comenzaropccon110c() {

    // ACCEPT FECHA-ACT-CTL FROM DATE.
    // MOVE 20 TO SIG-ACT-CTL.
    $_SW9CON110C = '0';
    $_NOVEDADCON110C = '7';
    if ($_OTRSTAT == '00') {
        //CONTINUE 
        if ($_CARTERAUSU = 'S') {
            CON850(_datonovedad_con110c);
        } else {
            _comenzaropccon110c();
        }
    } else {
        _toggleNav();
    }
}

function _datonovedad_con110c(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    $('#tabla1').click();
    $_SWCREAR = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _evaluardatonovedad_con110c()
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedad_CON110C').val(novedad.id + ' - ' + novedad.descripcion)
}

function _evaluardatonovedad_con110c() {
    if ($_SWCREAR > 0) {
        $_NOVEDADCON110C = $_SWCREAR;
        if ($_SWCREAR == '7') {
            // $_CODTERCEROW = $_CODTERCEROLNK;
            _evaluarcodcliente110c();
        }
        else if (($_SWCREAR == '8') || ($_SWCREAR == '9')) {
            _evaluarcodcliente110c();
        }
    } else {
        $_NOVEDADCON110C = 7;
        $('#novedad_CON110C').val($_NOVEDADCON110C);
        revisarpermisos_con110c();
    }
}

function revisarpermisos_con110c() {
    $_OPSEGU = 'C12' + $_NOVEDADCON110C;
    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904_01,
        nombredll: 'CON904',
        carpeta: 'CONTAB'
    });

}

function _dataCON904_01_110C(data) {

    var date = data.split('|');
    if (date[0].trim() == '01') {
        $_SW9CON110C = '1';
        _datonovedad_con110c();
    }
    else if (date[0].trim() == '00') {
        _datocodigo_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _datocodigo_con110c() {

    if ($_CODTERCEROLNK > 0) {
        $_CODTERCEROW = $_CODTERCEROLNK;
        _leertercero_con110c();
    }
    if (($_SWCREAR = 8) || ($_CODTERCEROLNK > 0)) {
        $_CODTERCEROW = $_CODTERCEROLNK;
        _leertercero_con110c();
    } else {
        _evaluarcodcliente110c();
    }
}

function _evaluarcodcliente110c() {
    validarInputs({
        form: '#CODCLIEN_CON110C',
        orden: "1"
    },
        function () { CON850(_datonovedad_con110c); },
        _codlcon110c
    )
}

function _codlcon110c() {

    $_CODTERCEROW = $('#codclien_con110c').val();
    // $_CODTERCEROW = codterUnitMask_110c.unmaskedValue;
    $_CODTERCEROW = $_CODTERCEROW.padStart(10, "0");
    $('#codclien_con110c').val($_CODTERCEROW);

    if (($_NOVEDADCON110C == '7') || ($_NOVEDADCON110C == '8')) {
        if ($_CODTERCEROW == '0') {
            $_CODTERCEROW = $_NITUSU;
            // $_NOMBRECLIW = $_NOMUSU;
            // console.log($_NOMBRECLIW);
            // $("#1erapellido_con110c").val($_NOMBRECLIW);
            _leertercero_con110c();
        } else {
            _leertercero_con110c();
        }
    }
    else {
        _leertercero_con110c();
    }
}

function _leertercero_con110c() {

    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_CODTERCEROW;
    SolicitarDll({ datosh: datos_envio }, _dataCON110C_02_110C, get_url("/APP/CONTAB/CON110C_01.DLL"));
}

function _dataCON110C_02_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (($_NOVEDADCON110C == '7') && (swinvalid == '01')) {
        _nuevoregistrocon110c();
    }
    else if (($_NOVEDADCON110C == '7') && (swinvalid == '00')) {
        _error1CON110C();
    }
    else if (($_NOVEDADCON110C == '8') && (swinvalid == '00')) {
        setTimeout(_consultadatos_con110c, 100);


    }
    else if (($_NOVEDADCON110C == '8') && (swinvalid == '01')) {

        _error1CON110C_02();

    }
    else if (($_NOVEDADCON110C == '9') && (swinvalid == '00')) {

        setTimeout(_retirar_con110c, 100);

    }
    else if (($_NOVEDADCON110C == '9') && (swinvalid == '01')) {

        _error1CON110C_02();

    }
}

function _error1CON110C() {

    $_SW9CON110C = '1';
    $_NOVEDADCON110C = 8;
    $("#novedad_CON110C").val('8 - Cambio');
    CON851('00', '00', null, 'error', 'Error');
    _evaluarcodcliente110c();

}
function _error1CON110C_02() {

    CON851('01', '01', null, 'error', 'Error');
    setTimeout(_evaluarcodcliente110c, 300);
}

function _nuevoregistrocon110c() {

    $_SW9CON110C = '1';
    $_NITCLIW = '';
    $_NOMBRECLIW = '';
    _evaluardatodv_con110c();
}

function _evaluardatodv_con110c() {

    validarInputs({
        form: '#DV_CON110C',
        orden: "1"
    },
        function () { _evaluarcodcliente110c(); },
        _datodv_con110c
    )
}

function _datodv_con110c() {

    $_DVTERCEROW = $('#dv_con110c').val();

    if ($_DVTERCEROW.trim() == '') {
        if ($_NITUSU == '0822006141') {
            CON851('9I', '9I', null, 'error', 'Error');
            _evaluardatodv_con110c();
        }
        else {
            _evaluarmescumpl_7767();
        }
    } else {
        _calculadigitoverificacion();
    }
}

function _calculadigitoverificacion() {

    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_CODTERCEROW.padStart(10, '0')
    datos_envio += '|'
    datos_envio += $_DVTERCEROW;
    SolicitarDll({ datosh: datos_envio }, _dataCON110C_04_110C, get_url("/APP/CONTAB/CON110C_04.DLL"));
}

function _dataCON110C_04_110C(data) {

    var date = data.split('|');
    var $_DVTERW = date[0].trim();
    if ($_DVTERW != $_DVTERCEROW) {
        CON851('9I', '9I', null, 'error', 'Error');
        _evaluardatodv_con110c();
    } else {
        _evaluarmescumpl_7767();
    }

}

// function _evaluaranocumpl_110C() {

//     validarInputs({
//         form: "#ANO_CON110C",
//         orden: "1"
//     },
//         () => { _evaluardatodv_con110c(); },
//         () => {
//             $_ANOCUMPTERC = $('#anocumpl_con110').val();
//             if (($_ANOCUMPTERC.trim() == '') || (parseInt($_ANOCUMPTERC) == 0000)) {
//                 _evaluarmescumpl_7767();
//             } else if (($_ANOCUMPTERC > $_ANOACTUALW) || (parseInt($_ANOCUMPTERC) < 1900)) {
//                 CON851('2D', '2D', null, 'error', 'error');
//                 _evaluaranocumpl_110C();
//             } else if ($.isNumeric($_ANOCUMPTERC)) {
//                 _evaluarmescumpl_7767();
//             } else {
//                 _evaluaranocumpl_110C();
//             }
//         }
//     )
// }

function _evaluarmescumpl_7767() {
    validarInputs({
        form: "#MES_CON110C",
        orden: "1"
    },
        () => { _evaluarmescumpl_7767(); },
        () => {
            $_MESCUMPTERC = $('#mescumpl_con110').val();
            if (($_MESCUMPTERC.trim() == '') || (parseInt($_MESCUMPTERC) == 0)) {
                _evaluardiacumpl_7767();
            } else if ((parseInt($_MESCUMPTERC) < 1) || (parseInt($_MESCUMPTERC) > 12)) {
                CON851('2D', '2D', null, 'error', 'error');
                _evaluarmescumpl_7767();

            } else if ($.isNumeric($_MESCUMPTERC)) {
                _evaluardiacumpl_7767();
            } else {
                _evaluarmescumpl_7767();
            }
        }
    )
}

function _evaluardiacumpl_7767() {
    validarInputs({
        form: "#DIA_CON110C",
        orden: "1"
    },
        () => { _evaluarmescumpl_7767(); },
        () => {
            $_DIACUMPTERC = $('#diacumpl_con110').val();
            if (($_DIACUMPTERC.trim() == '') || (parseInt($_DIACUMPTERC) == 0)) {
                validacionesnombres();
            } else if ((parseInt($_DIACUMPTERC) < 1) || (parseInt($_DIACUMPTERC) > 31)) {
                CON851('2D', '2D', null, 'error', 'error');
                _evaluardiacumpl_7767();
            } else if ($.isNumeric($_DIACUMPTERC)) {
                validacionesnombres();
            } else {
                _evaluardiacumpl_7767();
            }
        }
    )
}


function validacionesnombres() {
    // $('#anonac_con110c').val('');
    $_MESNACEMPL = $_MESCUMPTERC; 
    $('#mesnac_con110c').val($_MESNACEMPL);
    $_DIANACEMPL = $_DIACUMPTERC; 
    $('#dianac_con110c').val($_DIANACEMPL);
    ///VALIDACIONES DE SALUD 

    if ((($_CODTERCEROW > '1000') && ($_CODTERCEROW < '100000000')) || (($_CODTERCEROW > '700000000') && ($_CODTERCEROW < '799000000')) || ($_CODTERCEROW > '1000000000')) {

        if ($_NOVEDADCON110C == '7') {
            _ventanapersonanatural_con110c()
        } else {
            _evaluarnombreext_con110c();
        }

    } else if (($_NITUSU == '0830009610') || ($_NITUSU == '0830092718') || ($_NITUSU == '0830092719')) {

        _evaluarnombreext_con110c();

    } else {
        _evaluarnombreext_con110c();
    }

}
/////////////////// EMPRESA /////////////////////////
function _evaluarnombreext_con110c() {

    validarInputs({
        form: '#PRAPELLIDO_CON110C',
        orden: "1"
    },
        function () { _evaluarmescumpl_7767(); },
        _aceptarextensionnom_con110c
    )

}
function _aceptarextensionnom_con110c() {

    $_NOMBRECLIW = $('#nombres_con110c').val();
    $_DESCRIPTERW = $_NOMBRECLIW;

    if ($_DESCRIPTERW.trim() == '') {
        CON851('02', '02', null, 'error', 'error');
        _evaluarnombreext_con110c();
    } else {
        _evaluardireccion_con110c();
    }
}

///////// VENTANA DE PERSONA NATURAL
function _ventanapersonanatural_con110c() {
    var ventananombresp = bootbox.dialog({
        size: 'xl',
        onEscape: false,
        title: 'PERSONA NATURAL',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group" id= "PRAPELLIDOS_CON110C"> ' +

            '<label class="col-md-4 control-label" for="name">' + '1ER APELLIDO:' + '</label> ' +
            '<div class="col-md-6"> ' +
            '<input id="1erapellidos_con110c" type="text" class="form-control input-md" data-orden="1"> ' +
            '</div> ' +
            '<label class="col-md-4 control-label" for="name">' + '2DO APELLIDO:' + '</label> ' +
            '<div class="col-md-6"> ' +
            '<input id="2doapellido_con110c" type="text" class="form-control input-md" data-orden="2"> ' +
            '</div> ' +
            '<label class="col-md-4 control-label" for="name">' + 'NOMBRES:' + '</label> ' +
            '<div class="col-md-6"> ' +
            '<input id="nombre_con110c" type="text" class="form-control input-md" data-orden="3"> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            main: {
                label: 'Aceptar',
                className: 'btn-info',
                callback: function () {
                    ventananombresp.off('show.bs.modal');
                    // $_APEL1TER2W = $('#1erapellidos_con110c').val();
                    // $_APEL2TER2W = $('#2doapellido_con110c').val();
                    // $_NOMB1TER2W = $('#nombres_con110c').val();
                    // _evaluardato1apellido_con110c();

                }
            }
        }
    });
    ventananombresp.init(_evaluardato1apellido_con110c("1"));
    ventananombresp.on('shown.bs.modal', function () {
        $("#1erapellidos_con110c").focus();
    });

}


function _evaluardato1apellido_con110c(orden) {
    _inputControl("disabled");
    validarInputs({
        form: '#PRAPELLIDOS_CON110C',
        orden: orden
    },
        function () { _evaluarmescumpl_7767(); },
        _aceptarapellido1_con110c
    )
}

function _aceptarapellido1_con110c() {
    $_APEL1TER2W = $('#1erapellidos_con110c').val();
    $_APEL2TER2W = $('#2doapellido_con110c').val();
    $_NOMB1TER2W = $('#nombre_con110c').val();

    if (($_APEL1TER2W.trim() == '') && ($_NOMB1TER2W.trim() == '')) {
        CON851('02', '02', null, 'error', 'error');
        _ventanapersonanatural_con110c();
        // validaripsante("1");
    } else {

        $_DESCRIPTERW = $_APEL1TER2W + ' ' + $_APEL2TER2W + ' ' + $_NOMB1TER2W;

        $('#nombres_con110c').val($_DESCRIPTERW);
        $(".btn-info").click();
        _evaluardireccion_con110c()
    }
}


function _evaluardireccion_con110c() {

    validarInputs({
        form: '#DIRECC_CON110C',
        orden: "1"
    },
        function () { _evaluarnombreext_con110c(); },
        _datodireccion_con110c
    )
}

function _datodireccion_con110c() {
    $_DIRECCTERCEW = $('#direcc_con110c').val();
    if ($_DIRECCTERCEW.trim() == '') {
        CON851('84', '84', null, 'error', 'error');
        _evaluardireccion_con110c()
    } else {
        _evaluarciudad_con110c()
    }
}
function _evaluarciudad_con110c() {

    validarInputs({
        form: '#CIUDAD_CON110C',
        orden: "1"
    },
        function () { _evaluardireccion_con110c(); },
        _datociudad_con110c
    )
}

function _datociudad_con110c() {

    $_CODCIUTERCEW = $('#ciudad_con110c').val();
    if ($_CODCIUTERCEW.trim() == '') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarciudad_con110c();
    } else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_CODCIUTERCEW;
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_05_110C, get_url('/APP/CONTAB/CON110C_05.DLL'));
    }
}

function _dataCON110C_05_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCIUTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#ciudadd_con110c").val($_DESCRIPCIUTERW);
        _evaluartelind_con110c();
    }
    else if (swinvalid == '01') {
        _evaluarciudad_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluartelind_con110c() {

    validarInputs({
        form: '#IND_CON110C',
        orden: "1"
    },
        function () { _evaluarciudad_con110c(); },
        _datotelind_con110c
    )
}

function _datotelind_con110c() {
    $_INDICTERCEW = $('#ind_con110c').val();

    _evaluartelefonoterc_con110c();
}
function _evaluartelefonoterc_con110c() {
    validarInputs({
        form: '#TEL_CON110C',
        orden: "1"
    },
        function () { _evaluartelind_con110c(); },
        _datotelefonoterc_con110c
    )
}
function _datotelefonoterc_con110c() {
    $_TELTERCEW = $('#tel_con110c').val();

    if ($_NOVEDADCON110C == '7') {
        $('#cc_con110c').val('0');
        _evaluarcedula_con110c();
    } else {
        _evaluarcedula_con110c();
    }
}
function _evaluarcedula_con110c() {

    validarInputs({
        form: '#CC_CON110C',
        orden: "1"
    },
        function () { _evaluartelefonoterc_con110c(); },
        _datocedula_con110c
    )
}

function _datocedula_con110c() {
    $_NITTERCEW = $('#cc_con110c').val();
    if (($_NITTERCEW > 0) && ($_NITTERCEW < 100)) {
        CON851('03', '03', null, 'error', 'error');
        _evaluarcedula_con110c();
    } else {
        _validartipo_con110c();
    }
}

function _validartipo_con110c() {
    var documento = [
        { "COD": "CC", "DESCRIP": "1- Cedula de Ciudadania" },
        { "COD": "CE", "DESCRIP": "2- Cedula de Extranjeria" },
        { "COD": "PA", "DESCRIP": "3- Numero Pasaporte" },
        { "COD": "RC", "DESCRIP": "4- Registro Civil" },
        { "COD": "TI", "DESCRIP": "5- Tarjeta de Identidad" },
        { "COD": "NU", "DESCRIP": "6- Numero Unico de Identidad" },
        { "COD": "NI", "DESCRIP": "7- Numero Identidad Tributaria" }
    ]
    POPUP({
        array: documento,
        titulo: 'Tipo Identificacion',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_TIPOIDTERCEW,
        callback_f: _evaluarcedula_con110c
    },
        _evaluartipodoc_con110c);
}

function _evaluartipodoc_con110c(documento) {
    $_TIPOIDTERCEW = documento.COD;
    switch (documento.COD) {
        case "CC":
        case "CE":
        case "PA":
        case "RC":
        case "TI":
        case "NU":
        case "NI":
            validacionestipodoc_con110c();
            break;
        default:
            _evaluarcedula_con110c();
            break;
    }
    $("#tipoident_con110c").val(documento.COD + " - " + documento.DESCRIP);
}

function validacionestipodoc_con110c() {
    if (($_TIPOIDTERCEW.trim() == '') && (($_CODTERCEROW > '800000000') && ($_CODTERCEROW < '999000000'))) {
        $_TIPOIDTERCEW = 'NI - Numero Identidad Tributaria';
        $("#tipoident_con110c").val($_DESCRIPMARCAARTW);
        _evaluaractividades_con110c();
    } else {
        _evaluaractividades_con110c();
    }
}
function _evaluaractividades_con110c() {
    validarInputs({
        form: '#ACTIVI_CON110C',
        orden: "1"
    },
        function () { _validartipo_con110c(); },
        _datoactividad_con110c
    )
}
function _datoactividad_con110c() {
    $_ACTTERCEW = $("#actividad_con110c").val();
    if ($_ACTTERCEW == '00') {
        CON851('02', '02', null, 'error', 'error');
        _evaluaractividades_con110c()
    } else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_ACTTERCEW;
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_06_110C, get_url('/APP/CONTAB/CON110C_06.DLL'));
    }
}

function _dataCON110C_06_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPACTTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#actividadd_con110c").val($_DESCRIPACTTERW);
        if ($_TIPOEMPRESAUSU == "H") {
            _evaluarentidad_con110c();
        } else {
            _evaluarrut_con110c()
            // _evaluarcomercial_con110c();
        }
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluaractividades_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function _evaluarentidad_con110c() {
    validarInputs({
        form: '#ENTIDAD_CON110C',
        orden: "1"
    },
        function () { _evaluartipo_con110c(); },
        _datoentidad_con110c
    )
}
function _datoentidad_con110c() {
    $_ENTIDADTERCEW = $('#entidad_con110c').val();
    if ($_ENTIDADTERCEW.trim() == '') {
        $_ENTIDADTERCEW = '';
        if (($_ACTTERCEW < 05) || ($_ACTTERCEW > 90)) {
            $_CONVENIOTERCEW = '';
            $("#convenio_con110c").val($_CONVENIOTERCEW);
            _evaluarrut_con110c();

        } else {
            _evaluarconvenio_con110c();
        }
    } else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_ENTIDADTERCEW;
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_07_110C, get_url('/APP/CONTAB/CON110C_07.DLL'));
    }
}
function _dataCON110C_07_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPENTTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#entidadd_con110c").val($_DESCRIPENTTERW);
        if (($_ACTTERCEW < 05) || ($_ACTTERCEW > 90)) {
            $_CONVENIOTERCEW = '';
            $("#convenio_con110c").val($_CONVENIOTERCEW);
            _evaluarrut_con110c();

        } else {
            _evaluarconvenio_con110c();
        }
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarentidad_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarconvenio_con110c() {
    validarInputs({
        form: '#CONVENIO_CON110C',
        orden: "1"
    },
        function () { _evaluarentidad_con110c(); },
        _datoconvenio_con110c
    )
}
function _datoconvenio_con110c() {
    $_CONVENIOTERCEW = $('#convenio_110c').val();
    if ($_CONVENIOTERCEW.trim() == '') {
        $_CONVENIOTERCEW = '';
        _evaluarrut_con110c();
    } else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_CONVENIOTERCEW;
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_08_110C, get_url('/APP/CONTAB/CON110C_08.DLL'));
    }
}

function _dataCON110C_08_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPTARIFTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#conveniod_con110c").val($_DESCRIPTARIFTERW);
        _evaluarrut_con110c();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarconvenio_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarrut_con110c() {
    validarInputs({
        form: '#RUT_110C',
        orden: "1"
    },
        function () { _evaluarentidad_con110c(); },
        _datorut_con110c
    )
}
function _datorut_con110c() {
    $_RUTTERCEW = $('#rut_110c').val();
    if ($_RUTTERCEW.trim() == '') {
        $_RUTTERCEW = 'N';
        $('#rut_110c').val($_RUTTERCEW);
        if ($_TIPOEMPRESAUSU == "H") {
            _evaluarcomercial_con110c();
        } else {
            _evaluarfactorvent_con110c();
        }

    } else if (($_RUTTERCEW == 'N') || ($_RUTTERCEW == 'S')) {
        if ($_TIPOEMPRESAUSU == "H") {
            _evaluarcomercial_con110c();
        } else {
            _evaluarfactorvent_con110c();
        }
    } else {
        _evaluarrut_con110c();
    }

}
function _evaluarcomercial_con110c() {

    validarInputs({
        form: '#NOMCOM_CON110C',
        orden: "1"
    },
        function () { _evaluaractividades_con110c(); },
        _datocomercial_con110c
    )
}
function _datocomercial_con110c() {
    $_NOMCOMERTERCEW = $('#nomcom_con110c').val();
    _evaluarotrosdatos_con110c();
}
function _evaluarotrosdatos_con110c() {

    validarInputs({
        form: '#DATOS_CON110C',
        orden: "1"
    },
        function () { _evaluarcomercial_con110c(); },
        _datootros_con110c
    )
}
function _datootros_con110c() {
    $_OTROSTERCEW = $('#datos_con110c').val();
    _evaluarcontacto_con110c();
}
function _evaluarcontacto_con110c() {

    validarInputs({
        form: '#CONTACT_CON110C',
        orden: "1"
    },
        function () { _evaluarotrosdatos_con110c(); },
        _datocontacto_con110c
    )
}
function _datocontacto_con110c() {
    $_CONTACTTERCEW = $('#contact_con110c').val();
    _evaluarweb_con110c();
}
function _evaluarweb_con110c() {

    validarInputs({
        form: '#WEB_CON110C',
        orden: "1"
    },
        function () { _evaluarotrosdatos_con110c(); },
        _datoweb_con110c
    )
}
function _datoweb_con110c() {
    $_WEBTERCEW = $('#web_con110c').val();
    _evaluarcargocontac_con110c();
}
function _evaluarcargocontac_con110c() {

    validarInputs({
        form: '#CARGO_CON110C',
        orden: "1"
    },
        function () { _evaluarweb_con110c(); },
        _datocargocontac_con110c
    )
}
function _datocargocontac_con110c() {
    $_CARGOTERCEW = $('#cargo_con110c').val();
    _evaluaremail_con110c();
}
function _evaluaremail_con110c() {
    $('#tabla1').click();
    validarInputs({
        form: '#EMAIL_CON110C',
        orden: "1"
    },
        function () { _evaluarcargocontac_con110c(); },
        _datoemail_con110c
    )
}
function _datoemail_con110c() {
    $_EMAILTERCEW = $('#email_con110c').val();

    if ($_EMAILTERCEW.trim() == '') {
        CON851('2K', '2K', null, 'error', 'Error');
        _evaluarasesor_con110c();
    } else {
        _evaluarasesor_con110c();

    }
}
function _evaluarasesor_con110c() {
    validarInputs({
        form: '#ASESOR_CON110C',
        orden: "1"
    },
        function () { _evaluaremail_con110c(); },
        _datoasesor_con110c
    )
}
function _datoasesor_con110c() {
    $_ASESORTERCEW = $('#asesor_con110c').val();

    _evaluartipo_con110c();
}
function _evaluartipo_con110c() {
    validarInputs({
        form: '#CUPO_CON110C',
        orden: "1"
    },
        function () { _evaluarasesor_con110c(); },
        _datotipo_con110c
    )
}
function _datotipo_con110c() {
    $_TIPOCUPOTERCEW = $('#cupo_con110c').val();
   
    if ($_NOVEDADCON110C == '7') {
        $('#factventas_con110c').val(1);
        // $('#factventasd_con110c').val('00');
        _evaluarfactorvent_con110c();
    } else {
        _evaluarfactorvent_con110c();
    }
}

///////////////////////// SEGUNDA PAGINA ///////////////////////


function _evaluarfactorvent_con110c() {
    $('#tabla2').click();
    $('#imprimir_con110c').hide()
    validarInputs({
        form: '#FACTVENTAS_CON110C',
        orden: "1"
    },
        function () { _evaluaremail_con110c(); },
        _datofactorvent_con110c
    )
}
function _datofactorvent_con110c() {
    $_FACTORTERCEW = factventas_110cMask.unmaskedValue;
    if ((($_ACTTERCEW == '20') || ($_ACTTERCEW == '21')) && ($_FACTORTERCEW < '1')) {
        CON851('34', '34', null, 'error', 'error');
        _evaluarfactorvent_con110c();
    } else {
        _evaluarcuposmvm_con110c();
    }
}
// function _evaluarfactorvent2_con110c() {
//     validarInputs({
//         form: '#FACTPORCET_CON110C',
//         orden: "1"
//     },
//         function () { _evaluarfactorvent_con110c(); },
//         _datofactorvent2_con110c
//     )
// }
// function _datofactorvent2_con110c() {

//     $_PORCRETTER2W = $('#factventasd_con110c').val();
//     _evaluarcuposmvm_con110c();
// }
function _evaluarcuposmvm_con110c() {
    validarInputs({
        form: '#SMVM_CON110C',
        orden: "1"
    },
        function () { _evaluarfactorvent_con110c(); },
        _datcupossmvm_con110c
    )
}
function _datcupossmvm_con110c() {
    $_CUPOTERCEW = $('#smvm_con110c').val();
    if (($_CUOTASUSU == '2') && ($_ACTTERCEW == '01') && ($_CUPOTERCEW == '0')) {
        CON851('02', '02', null, 'error', 'error');
        _evaluarcuposmvm_con110c();
    } else {
        $_CUPOASIGW = $_CUPOTERCEW * $_SALMINUSU;
        $("#smvmd_con110c").val($_CUPOASIGW);

        if ($_TIPOEMPRESAUSU == 'H') {
            if ($_RETENEDORUSU == 'S') {
                _evaluarformapago_con110c();
            } else {
                _evaluarplazo_con110c();
            }
        } else {
            _evaluarvendedor_con110c();
        }
    }
}
function _evaluarvendedor_con110c() {
    validarInputs({
        form: '#VENDEDOR_CON110C',
        orden: "1"
    },
        function () { _evaluarcuposmvm_con110c(); },
        _datovendedor_con110c
    )
}
function _datovendedor_con110c() {
    if ($_CARTERAUSU != 'S') {
        $_VENDTERCEW = '';
        $("#vendedor_con110").val($_VENDTERCEW);
        _mostrarvendedro_con110c();
    } else {
        $_VENDTERCEW = $('#vendedor_con110').val();
        if ($_VENDTERCEW == '00000') {
            $_VENDTERCEW = '00000';
            $_DESCRIPVENDTERW = ''
            $("#vendedor_con110").val($_VENDTERCEW);
            $("#descripvendedor_con110c").val($_DESCRIPVENDTERW);
            _datopago_con110c();
        } else {
            _validacionesfpago_con110c();
        }
    }
}
function _mostrarvendedro_con110c() {
    if ($_VENDTERCEW.trim() == '') {
        if (($_CUOTASUSU == '2') && ($_ACTTERCEW == '01') && ($_CARTERAUSU == 'S')) {
            CON851('02', '02', null, 'error', 'error');
            _datovendedor_con110c();
        } else {
            $_PAGOTERCEW = '02';
            $("#formapago_110c").val($_PAGOTERCEW);
            _evaluarplazo_con110c();
        }
    } else {
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_VENDTERCEW;
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_09_110C, get_url('/APP/CONTAB/CON110C_09.DLL'));
    }
}

function _dataCON110C_09_110C() {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPVENDTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#descripvendedor_con110c").val($_DESCRIPVENDTERW);
        _datopago_con110c();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarvendedor_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _validacionesfpago_con110c() {
    if (($_CONTADOUSU == 'N') && ($_PAGOTERCEW == '01')) {
        $_PAGOTERCEW = '02';
        $("#formapago_110c").val($_PAGOTERCEW);
        _evaluarplazo_con110c();
    } else if (($_ACTTERCEW == '02') || ($_ACTTERCEW == '03') || ($_ACTTERCEW == '04') || ($_ACTTERCEW == '05') || ($_ACTTERCEW == '92')) {
        $_PAGOTERCEW = '02';
        $("#formapago_110c").val($_PAGOTERCEW);
        //    _datosvehiculo_con110c();
        _evaluarplazo_con110c();
    } else if (($_ACTTERCEW == '01') && ($_PAGOTERCEW == '00')) {
        $_PAGOTERCEW = '02';
        $("#formapago_110c").val($_PAGOTERCEW);
        _evaluarplazo_con110c();

    } else if (($_CUOTASUSU = '4') && ($_ACTTERCEW == '12')) {
        // INVOKE POW-SELF "CALLFORM" USING "CON820A" "C:\PROG\CONTAB\CON110C.DLL"
        _datopago_con110c();
    } else {
        _datopago_con110c();
    }
}

function _datopago_con110c() {
    if (($_CUOTASUSU == '4') && ($_ACTTERCEW == '12')) {
        var pago = [
            { "COD": "01", "DESCRIP": "Contado" },
            { "COD": "02", "DESCRIP": "Credito" }
        ]
        POPUP({
            array: pago,
            titulo: 'Forma de Pago',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            seleccion: $_PAGOTERCEW,
            callback_f: _evaluarcomercial_con110c
        },
            _evaluarformapago_con110c);
    } else {
        var pago = [
            { "COD": "00", "DESCRIP": "Anticipago" },
            { "COD": "01", "DESCRIP": "Contado" },
            { "COD": "02", "DESCRIP": "Credito" },
            { "COD": "03", "DESCRIP": "Ch. Posfechado" },
            { "COD": "04", "DESCRIP": "Letra" },
            { "COD": "05", "DESCRIP": "Credito US$" },
            { "COD": "06", "DESCRIP": "Empleados" },
            { "COD": "95", "DESCRIP": "Tarjeta. Credito" },
            { "COD": "96", "DESCRIP": "Tarjeta. Debito" },
            { "COD": "97", "DESCRIP": "Contado Cheque" }
        ]
        POPUP({
            array: pago,
            titulo: 'Forma de Pago',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            seleccion: $_PAGOTERCEW,
            callback_f: _evaluarcomercial_con110c
        },
            _evaluarformapago_con110c);
    }
}

function _evaluarformapago_con110c(pago) {
    $_PAGOTERCEW = pago.COD;
    switch (pago.COD) {
        case "00":
        case "01":
        case "02":
        case "03":
        case "04":
        case "05":
        case "06":
        case "95":
        case "96":
        case "97":
            if (($_CONTADOUSU == 'N') && ($_PAGOTERCEW == '01')) {
                CON851('02', '02', null, 'error', 'error');
                _validacionesfpago_con110c();
            } else {
                _evaluarplazo_con110c();
            }
            break;
        default:
            _evaluarcomercial_con110c();
            break;
    }
    $("#formapago_110c").val(pago.COD + " - " + pago.DESCRIP);
}

function _evaluarplazo_con110c() {
    validarInputs({
        form: '#PLAZO_CON110C',
        orden: "1"
    },
        function () { _evaluarcuposmvm_con110c(); },
        _datoplazo_con110c
    )
}
function _datoplazo_con110c() {

    $_PLAZOTERCEW = plazoUnitMask_110c.unmaskedValue;

    if (($_ACTTERCEW == '02') || ($_ACTTERCEW == '03') || ($_ACTTERCEW == '04') || ($_ACTTERCEW == '05') || ($_ACTTERCEW == '92')) {
        if ($_TIPOEMPRESAUSU == 'H') {
            _evaluarzona_con110c();
        } else {
            _evaluargrado_con110c();
        }
    } else {
        _evaluarzona_con110c();
    }
}
function _evaluarzona_con110c() {
    validarInputs({
        form: '#ZONA_CON110C',
        orden: "1"
    },
        function () { _evaluarplazo_con110c(); },
        _datozona_con110c
    )
}
function _datozona_con110c() {
    $_CODZONAW = $('#zona_110c').val();
    if (($_CODZONAW.trim() == '') || ($_CODZONAW == '00')) {
        $_ZONATERCEW = $_CODZONAW;
        $_PASOW = '9';
        _leerzonayrutas_con110c();
    } else {
        $_TIPOZONA = '1';
        $_ZONATERCEW = $_TIPOZONA + $_CODZONAW;
        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_ZONATERCEW;
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_10_110C, get_url('/APP/CONTAB/CON110C_10.DLL'));
    }
}

function _dataCON110C_10_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPZONAW = date[1].trim();
    if (swinvalid == '00') {
        $("#zonad_110c").val($_DESCRIPZONAW);
        _evaluarrutas_con110c();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarzona_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _leerzonayrutas_con110c() {
    if ((($_ZONATERCEW.trim() == '') || ($_ZONATERCEW == '00')) || (($_RUTATERCEW.trim() == '') || ($_RUTATERCEW == '00'))) {
        if ((($_NITUSU == '0830505217') || ($_NITUSU == '0822006141')) && ($_ACTTERCEW == '01')) {
            CON851('02', '02', null, 'error', 'error');
            _evaluarzona_con110c();

        } else {
            if ($_PASOW == '9') {
                $_DESCRIPZONAW = '';
                $("#zonad_110c").val($_DESCRIPZONAW);
                _evaluarrutas_con110c();
            } else {
                $_DESCRIPRUTAW = '';
                $("#rutad_110c").val($_DESCRIPRUTAW);
                _evaluarorden_con110c();
            }
        }
    }
}
function _evaluarrutas_con110c() {
    validarInputs({
        form: '#RUTA_110C',
        orden: "1"
    },
        function () { _evaluarzona_con110c(); },
        _datorutas_con110c
    )
}

function _datorutas_con110c() {
    $_CODRUTAW = $('#ruta_110c').val();
    if (($_CODRUTAW.trim() == '') || ($_CODRUTAW == '00')) {
        $_RUTATERCEW = $_CODRUTAW;
        $_PASOW = '10';
        _leerzonayrutas_con110c();
    } else {
        $_TIPOZONA = '2';
        $_RUTATERCEW = $_TIPOZONA + $_CODRUTAW;

        let datos_envio = datosEnvio();
        datos_envio += '|'
        datos_envio += $_RUTATERCEW;
        SolicitarDll({ datosh: datos_envio }, _dataCON110C_101_110C, get_url('/APP/CONTAB/CON110C_10.DLL'));
    }
}
function _dataCON110C_101_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPRUTAW = date[1].trim();
    if (swinvalid == '00') {
        $("#rutad_110c").val($_DESCRIPRUTAW);
        _evaluarorden_con110c();
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarrutas_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarorden_con110c() {
    validarInputs({
        form: '#ORDEN_110C',
        orden: "1"
    },
        function () { _evaluarrutas_con110c(); },
        _datoorden_con110c
    )
}

function _datoorden_con110c() {
    $_ORDENTERCEW = $('#orden_110c').val();
    if (($_NOVEDADCON110C == '8') && ($.isNumeric($_ACTIVICATERCEW))) {
        $_ACTIVICATERCEW = '000';
        $("#actica_110c").val($_ACTIVICATERCEW);
        _evaluaractica_con110c()
    } else {
        _evaluaractica_con110c();
    }
}

function _evaluaractica_con110c() {
    validarInputs({
        form: '#ACTICA_110C',
        orden: "1"
    },
        function () { _evaluarorden_con110c(); },
        _datoactica_con110c
    )
}
function _datoactica_con110c() {
    $_ACTIVICAW = $('#actica_110c').val();
    $_ACTIVICATERCEW = $_ACTIVICAW;
    if ($_ACTIVICATERCEW.trim() == '') {
        $_ACTIVICATERCEW = '';
        $("#actica_110c").val($_ACTIVICATERCEW);
        _evaluarporcentica_con110c();
    } else {
        if (Number.isNaN($_ACTIVICATERCEW)) {
            // ($.isNumeric($_ACTIVICATERCEW))
            CON851('57', '57', null, 'error', 'error');
            _evaluaractica_con110c()
        } else {
            _evaluarporcentica_con110c();
        }
    }
}
function _evaluarporcentica_con110c() {
    validarInputs({
        form: '#PORCENTICA_110C',
        orden: "1"
    },
        function () { _evaluaractica_con110c(); },
        _datoporcentica_con110c
    )
}
function _datoporcentica_con110c() {
    $_PORCICATERCEW = porcentica_110cMask.unmaskedValue;

    _evaluarporcentret_con110c();
}
function _evaluarporcentret_con110c() {
    validarInputs({
        form: '#PORCETRETEN_110C',
        orden: "1"
    },
        function () { _evaluarporcentica_con110c(); },
        _datoporcentret_con110c
    )
}
function _datoporcentret_con110c() {

    $_PORCRETTERCEW = porcentreten_110cMask.unmaskedValue;
    _evaluargrado_con110c();
}

function _evaluargrado_con110c() {
    $('#tabla2').click();
    validarInputs({
        form: '#GRDNEGOCIO_110C',
        orden: "1"
    },
        function () { _evaluarporcentica_con110c(); },
        _datogradonegocio_con110c
    )
}

function _datogradonegocio_con110c() {
    $_GRADOTERCEW = $('#grdnegocio_110c').val();
    if ($_NITUSU == '0800202522') {
        if ($_ACTTERCEW == '01') {
            if (($_GRADOTERCEW == '1') || ($_GRADOTERCEW == '2') || ($_GRADOTERCEW == '3') || ($_GRADOTERCEW == '4')) {
                ///// CONTINUE 
                consultagradonegocio_con110c();

            } else {
                CON851('02', '02', null, 'error', 'error');
                _evaluargrado_con110c();
            }
        } else {
            consultagradonegocio_con110c();
        }
    } else {
        if (($_GRADOTERCEW == '0') || ($_GRADOTERCEW.trim() == '')) {
            $_GRADOTERCEW = '9';
            $("#grdnegocio_110c").val($_GRADOTERCEW);
            // _evaluarIVA_con110c();
            _evaluarclasif_con110c()
        } else {
            consultagradonegocio_con110c();
        }
    }
}
function consultagradonegocio_con110c() {
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_GRADOTERCEW;
    SolicitarDll({ datosh: datos_envio }, _dataCON110C_11_110C, get_url('/APP/CONTAB/CON110C_11.DLL'));
}

function _dataCON110C_11_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPGRADTERW = date[1].trim();
    if (swinvalid == '00') {
        $("#grdnegociod_110c").val($_DESCRIPGRADTERW);
        _evaluarclasif_con110c();
    }
    else if (swinvalid == '01') {
        // $_GRADOTERCEW = '9';
        // $("#grdnegocio_110c").val($_GRADOTERCEW);
        _evaluarclasif_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _evaluarclasif_con110c() {
    validarInputs({
        form: '#CLASIFCLIEN_110C',
        orden: "1"
    },
        function () { _evaluarporcentica_con110c() },
        _datoclasifclien_con110c
    )
}
function _datoclasifclien_con110c() {
    $_CLASIFTERCEW = $("#clasifclien_110c").val();
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_CLASIFTERCEW;
    SolicitarDll({ datosh: datos_envio }, _dataCON110C_01_1_110C, get_url('/APP/CONTAB/CON110C_01_1.DLL'));
}
function _dataCON110C_01_1_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_DESCRIPCLASIFTERW = date[1];
    if (swinvalid == '00') {
        $("#clasifcliend_110c").val($_DESCRIPCLASIFTERW);
        _evaluarIVA_con110c();
    }
    else if (swinvalid == '01') {
        _evaluarIVA_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarIVA_con110c() {
    var iva = [
        { "COD": "1", "DESCRIP": "Regimen Comun" },
        { "COD": "2", "DESCRIP": "Regimen Simplificado" },
        { "COD": "3", "DESCRIP": "No Responsable" },
        { "COD": "9", "DESCRIP": "No Aplica" }
    ]
    POPUP({
        array: iva,
        titulo: 'I.V.A',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_REGIVATERCEW,
        callback_f: _evaluargrado_con110c,
        teclaAlterna: true
    },
        _validariva_con110c);
}

function _validariva_con110c(iva) {
    $_REGIVATERCEW = iva.COD;
    switch (iva.COD) {
        case "1":
        case "2":
        case "3":
        case "9":
            setTimeout(_evaluarcalificacion_con110c, 300);
            break;
        default:
            _evaluargrado_con110c();
            break;
    }
    $("#iva_110c").val(iva.COD + " - " + iva.DESCRIP);
}

function _evaluarcalificacion_con110c() {
    var calificacion = [
        { "COD": "1", "DESCRIP": "Excelente" },
        { "COD": "2", "DESCRIP": "Bueno" },
        { "COD": "3", "DESCRIP": "Regular" },
        { "COD": "4", "DESCRIP": "Malo" },
        { "COD": "9", "DESCRIP": "No Aplica" }
    ]
    POPUP({
        array: calificacion,
        titulo: 'Calificacion',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: $_CALIFITERCEW,
        callback_f: _evaluargrado_con110c,
        teclaAlterna: true
    },
        _validarcalificacion_con110c);
}

function _validarcalificacion_con110c(calificacion) {
    $_CALIFITERCEW = calificacion.COD;
    switch (calificacion.COD) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "9":
            if ($_NOVEDADCON110C == '7') {
                $('#baseret_con110c').val('0');
                _evaluarcontribuyente();
                // _evaluarbaseret_con110c();
            } else {
                _evaluarcontribuyente();
                // _evaluarbaseret_con110c();
            }
            break;
        default:
            _evaluargrado_con110c();
            break;
    }
    $("#calif_110c").val(calificacion.COD + " - " + calificacion.DESCRIP);
}

function _evaluarcontribuyente() {
    validarInputs({
        form: '#CONTRIBUYENTE_103',
        orden: "1",
    },
        function () { _evaluarclasif_con110c(); },
        _datocontribuyente_con110c
    )
}
function _datocontribuyente_con110c() {
    $_GRANCONTRIBTERCEW = $('#contribuyente_con110c').val();
    if ($_GRANCONTRIBTERCEW.trim() == '') {
        $_GRANCONTRIBTERCEW = 'N';
        $_VLRBASERETTERCEW = '0';
        $('#baseret_con110c').val($_VLRBASERETTERCEW);
        $('#contribuyente_con110c').val($_GRANCONTRIBTERCEW);
        _evaluaragenteret_110c();
    } else if ($_GRANCONTRIBTERCEW == 'S') {
        _evaluarbaseret_con110c();
    } else if ($_GRANCONTRIBTERCEW == 'N') {
        $_VLRBASERETTERCEW = '0';
        $('#baseret_con110c').val($_VLRBASERETTERCEW);
        _evaluaragenteret_110c();
    } else {
        _evaluarcontribuyente();
    }
}


function _evaluarbaseret_con110c() {
    // $('#imprimir_con110c').show()
    // $('#imprimir_con110c').hide()
    validarInputs({
        form: '#BASERET_110C',
        orden: "1",
    },
        function () { _evaluarcontribuyente(); },
        _datoagenteret_con110c
    )
}
function _datoagenteret_con110c() {

    $_VLRBASERETTERCEW = $('#baseret_con110c').val();
    _evaluaragenteret_110c();
}

function _evaluaragenteret_110c() {
    validarInputs({
        form: '#RETENEDOR_110C',
        orden: "1",
    },
        function () { _evaluarclasif_con110c(); },
        _datoagenteret_con110c
    )
}

function _datoagenteret_con110c() {
    $_RETETERCEW = $('#retenedor_con110c').val();
    if ($_RETETERCEW.trim() == '') {
        $_RETETERCEW = 'N';
        $('#retenedor_con110c').val($_RETETERCEW);
        _evaluarreteivacomp_con110();
    } else if (($_RETETERCEW == 'S') || ($_RETETERCEW == 'N')) {
        _evaluarreteivacomp_con110();
    } else {
        _evaluaragenteret_110c();
    }
}

function _evaluarreteivacomp_con110() {
    validarInputs({
        form: '#RETCOMP_110C',
        orden: "1",
    },
        function () { _evaluaragenteret_110c(); },
        _datoreteiva_con110c
    )
}
function _datoreteiva_con110c() {
    $_RETIVACOMPTERCEW = $('#reteivacompra_con110c').val();
    if ($_RETIVACOMPTERCEW.trim() == '') {
        $_RETIVACOMPTERCEW = 'N';
        $('#reteivacompra_con110c').val($_RETIVACOMPTERCEW);
        _evaluarreteivaventa_con110();
    } else if (($_RETIVACOMPTERCEW == 'S') || ($_RETIVACOMPTERCEW == 'N')) {
        _evaluarreteivaventa_con110();
    } else {
        _evaluarreteiva_con110();
    }
}

function _evaluarreteivaventa_con110() {
    validarInputs({
        form: '#RETVENTA_110C',
        orden: "1",
    },
        function () { _evaluaragenteret_110c(); },
        _datoreteivaventa_con110c
    )
}
function _datoreteivaventa_con110c() {
    $_RETIVATERCEW = $('#causareteiva_con110c').val();
    if ($_RETIVATERCEW.trim() == '') {
        $_RETIVATERCEW = 'N';
        $('#causareteiva_con110c').val($_RETIVATERCEW);
        _evaluarexento_110c()
    } else if (($_RETIVATERCEW == 'S') || ($_RETIVATERCEW == 'N')) {
        _evaluarexento_110c();
    } else {
        _evaluarreteivaventa_con110();
    }
}
function _evaluarexento_110c() {
    validarInputs({
        form: '#EXENTO_110C',
        orden: "1",
    },
        function () { _evaluarreteivaventa_con110(); },
        _datoexento_con110c
    )
}
function _datoexento_con110c() {
    $_EXENTRETTERCEW = $('#exento_con110c').val();
    if ($_EXENTRETTERCEW.trim() == '') {
        $_EXENTRETTERCEW = 'N';
        $('#exento_con110c').val($_EXENTRETTERCEW);
        _evaluarcobroseg_110c();
    } else if (($_EXENTRETTERCEW == 'S') || ($_EXENTRETTERCEW == 'N')) {
        _evaluarcobroseg_110c();
    } else {
        _evaluarexento_110c();
    }
}
function _evaluarcobroseg_110c() {
    validarInputs({
        form: '#COBROSEG_110C',
        orden: "1",
    },
        function () { _evaluarexento_110c(); },
        _datocobroseguro_con110c
    )
}
function _datocobroseguro_con110c() {
    $_SEGUROTERCEW = $('#cobroseg_con110c').val();
    if ($_SEGUROTERCEW.trim() == '') {
        $_SEGUROTERCEW = 'N';
        $('#cobroseg_con110c').val($_SEGUROTERCEW);
        _evaluardatacredito_110c();
    } else if (($_SEGUROTERCEW == 'S') || ($_SEGUROTERCEW == 'N')) {
        _evaluardatacredito_110c();
    } else {
        _evaluarcobroseg_110c();
    }
}
function _evaluardatacredito_110c() {
    validarInputs({
        form: '#DATACREDIT_110C',
        orden: "1",
    },
        function () { _evaluarexento_110c(); },
        _datocredito_con110c
    )
}
function _datocredito_con110c() {
    $_DATACRETERCEW = $('#datacredito_con110c').val();
    if ($_DATACRETERCEW.trim() == '') {
        $_DATACRETERCEW = 'N';
        $('#datacredito_con110c').val($_DATACRETERCEW);
        _evaluaracuerdopag_110c();
    } else if (($_DATACRETERCEW == 'S') || ($_DATACRETERCEW == 'N')) {
        _evaluaracuerdopag_110c();
    } else {
        _evaluardatacredito_110c();
    }
}
function _evaluaracuerdopag_110c() {
    validarInputs({
        form: '#ACUERDO_110C',
        orden: "1",
    },
        function () { _evaluardatacredito_110c(); },
        _datoacuerdopago_con110c
    )
}
function _datoacuerdopago_con110c() {
    $_ACUEPAGOTERCEW = $('#acuerdopago_con110c').val();
    if ($_ACUEPAGOTERCEW.trim() == '') {
        $_ACUEPAGOTERCEW = 'N';
        $('#acuerdopago_con110c').val($_ACUEPAGOTERCEW);
        _evaluarcapitado_110c();
    } else if (($_ACUEPAGOTERCEW == 'S') || ($_ACUEPAGOTERCEW == 'N')) {
        _evaluarcapitado_110c();
    } else {
        _evaluaracuerdopag_110c();
    }
}

function _evaluarcapitado_110c() {
    validarInputs({
        form: '#CAPITADO_110C',
        orden: "1",
    },
        function () { _evaluaracuerdopag_110c(); },
        _datocapitado_con110c
    )
}
function _datocapitado_con110c() {
    $_CAPITADOTERCEW = $('#capitado_con110c').val();
    if ($_CAPITADOTERCEW.trim() == '') {
        $_CAPITADOTERCEW = 'N';
        $('#capitado_con110c').val($_CAPITADOTERCEW);
        _evaluarnitcli_110c();
    } else if (($_CAPITADOTERCEW == 'S') || ($_CAPITADOTERCEW == 'N')) {
        _evaluarnitcli_110c();
    } else {
        _evaluarcapitado_110c();
    }
}
function _evaluarnitcli_110c() {
    validarInputs({
        form: '#NITCLIEN_110C',
        orden: "1",
    },
        function () { _evaluaracuerdopag_110c(); },
        _datonitcli_con110c
    )
}
function _datonitcli_con110c() {
    $_NITCLITERCEW = $('#nitcliente_con110c').val();
    if ($_NITCLITERCEW.trim() == '') {
        $_NITCLITERCEW = 'N';
        $('#nitcliente_con110c').val($_NITCLITERCEW);
        _evaluarcausaret_110c();
    } else if (($_NITCLITERCEW == 'S') || ($_NITCLITERCEW == 'N')) {
        _evaluarcausaret_110c();
    } else {
        _evaluarcapitado_110c();
    }
}

function _evaluarcausaret_110c() {
    validarInputs({
        form: '#RETIVA_110C',
        orden: "1",
    },
        function () { _evaluarnitcli_110c(); },
        _datocausaret_con110c
    )
}
function _datocausaret_con110c() {
    $_RETICAVTERCEW = $('#icav_con110c').val();
    if ($_RETICAVTERCEW.trim() == '') {
        $_RETICAVTERCEW = 'N';
        $('#icav_con110c').val($_RETICAVTERCEW);
        _evaluarbloqvende_110c();
    } else if (($_RETICAVTERCEW == 'S') || ($_RETICAVTERCEW == 'N')) {
        _evaluarbloqvende_110c();
    } else {
        _evaluarcapitado_110c();
    }
}
function _evaluarbloqvende_110c() {
    validarInputs({
        form: '#BLOQVEN_110C',
        orden: "1",
    },
        function () { _evaluarcausaret_110c(); },
        _datobloqvend_con110c
    )
}
function _datobloqvend_con110c() {
    $_BLOQTERCEW = $('#bloquearvend_con110c').val();
    if ($_BLOQTERCEW.trim() == '') {
        $_BLOQTERCEW = 'N';
        $('#bloquearvend_con110c').val($_BLOQTERCEW);
        _evaluarexcluiriva_110c();
    } else if (($_BLOQTERCEW == 'S') || ($_BLOQTERCEW == 'N')) {
        _evaluarexcluiriva_110c();
    } else {
        _evaluarbloqvende_110c();
    }
}
function _evaluarexcluiriva_110c() {
    validarInputs({
        form: '#EXCLUIRIVA_110C',
        orden: "1",
    },
        function () { _evaluarbloqvende_110c(); },
        _datoexcluiriva_con110c
    )
}
function _datoexcluiriva_con110c() {
    $_EXIVATERCEW = $('#excluiriva_con110c').val();
    if ($_EXIVATERCEW.trim() == '') {
        $_EXIVATERCEW = 'N';
        $('#excluiriva_con110c').val($_EXIVATERCEW);
        _evaluarnombreref1_con110c();
    } else if (($_EXIVATERCEW == 'S') || ($_EXIVATERCEW == 'N')) {
        _evaluarnombreref1_con110c();
    } else {
        _evaluarexcluiriva_110c();
    }
}

function _evaluarnombreref1_con110c() {
    $('#tabla3').click();
    validarInputs({
        form: '#NOMBRE1REF_CON110C',
        orden: "1"
    },
        function () { _evaluargrado_con110c(); },
        _evaluardirecciref1_con110c
    )
}

function _evaluardirecciref1_con110c() {
    validarInputs({
        form: '#DIRREF1_CON110C',
        orden: "1"
    },
        function () { _evaluarnombreref1_con110c(); },
        _evaluartelref1_con110c
    )
}

function _evaluartelref1_con110c() {
    validarInputs({
        form: '#TELREF1_CON110C',
        orden: "1"
    },
        function () { _evaluardirecciref1_con110c(); },
        _evaluarrelaref1_con110c
    )
}

function _evaluarrelaref1_con110c() {
    validarInputs({
        form: '#RELACIONREF1_CON110C',
        orden: "1"
    },
        function () { _evaluartelref1_con110c(); },
        _evaluarnombreref2_con110c
    )
}

function _evaluarnombreref2_con110c() {
    validarInputs({
        form: '#NOMBRE2REF_CON110C',
        orden: "1"
    },
        function () { _evaluarrelaref1_con110c(); },
        _evaluardirecciref2_con110c

    )
}
function _evaluardirecciref2_con110c() {
    validarInputs({
        form: '#DIRREF2_CON110C',
        orden: "1"
    },
        function () { _evaluarnombreref2_con110c(); },
        _evaluartelref2_con110c
    )
}
function _evaluartelref2_con110c() {
    validarInputs({
        form: '#TELREF2_CON110C',
        orden: "1"
    },
        function () { _evaluardirecciref2_con110c(); },
        _evaluarrelaref2_con110c
    )
}
function _evaluarrelaref2_con110c() {
    validarInputs({
        form: '#RELACIONREF2_CON110C',
        orden: "1"
    },
        function () { _evaluartelref2_con110c(); },
        _evaluarnombreref3_con110c
    )
}
function _evaluarnombreref3_con110c() {
    validarInputs({
        form: '#NOMBRE3REF_CON110C',
        orden: "1"
    },
        function () { _evaluarrelaref2_con110c(); },
        _evaluardirecciref3_con110c

    )
}
function _evaluardirecciref3_con110c() {
    validarInputs({
        form: '#DIRREF3_CON110C',
        orden: "1"
    },
        function () { _evaluarnombreref3_con110c(); },
        _evaluartelref3_con110c
    )
}
function _evaluartelref3_con110c() {
    validarInputs({
        form: '#TELREF3_CON110C',
        orden: "1"
    },
        function () { _evaluardirecciref3_con110c(); },
        _evaluarrelaref3_con110c
    )
}
function _evaluarrelaref3_con110c() {
    validarInputs({
        form: '#RELACIONREF3_CON110C',
        orden: "1"
    },
        function () { _evaluartelref3_con110c(); },
        _evaluarempleador_con110c
    )
}

function _evaluarempleador_con110c() {
    validarInputs({
        form: '#EMPLEADOR_110C',
        orden: "1"
    },
        function () { _evaluarrelaref3_con110c(); },
        _evaluardirempleador_con110c
    )
}
function _evaluardirempleador_con110c() {
    validarInputs({
        form: '#DIRECEMPLEADOR_110C',
        orden: "1"
    },
        function () { _evaluarempleador_con110c(); },
        _evaluartelempleador_con110c
    )
}

function _evaluartelempleador_con110c() {
    validarInputs({
        form: '#TELEMPLEADOR_110C',
        orden: "1"
    },
        function () { _evaluardirempleador_con110c(); },
        _evaluarcargoempleador_con110c
    )
}
function _evaluarcargoempleador_con110c() {
    validarInputs({
        form: '#CARGOEMPLEADOR_110C',
        orden: "1"
    },
        function () { _evaluartelempleador_con110c(); },
        _evaluarsueldoempleador_con110c
    )
}
function _evaluarsueldoempleador_con110c() {
    validarInputs({
        form: '#SUELDOEMPLEADOR_110C',
        orden: "1"
    },
        function () { _evaluarcargoempleador_con110c(); },
        _evaluarantigempleador_con110c
    )
}
function _evaluarantigempleador_con110c() {
    validarInputs({
        form: '#ANTIGEMPLEADOR_110C',
        orden: "1"
    },
        function () { _evaluarsueldoempleador_con110c(); },
        _evaluaranonacempl_con110c
    )
}


function _evaluaranonacempl_con110c() {
    validarInputs({
        form: "#ANONACIM_CON110C",
        orden: "1"
    },
        () => { _evaluarantigempleador_con110c(); },
        () => {
            $_ANONACEMPL = $('#anonac_con110c').val();
            if (($_ANONACEMPL.trim() == '') || (parseInt($_ANONACEMPL) == 0000)) {
                $_ANONACEMPL = '0000'; 
                $('#anonac_con110c').val($_ANONACEMPL);
                _evaluarmesnacempl_con110c()
            } else if (($_ANONACEMPL > $_ANOACTUALW) || (parseInt($_ANONACEMPL) < 1900)) {
                CON851('2D', '2D', null, 'error', 'error');
                _evaluaranonacempl_con110c()
            } else if ($.isNumeric($_ANONACEMPL)) {
                _evaluarmesnacempl_con110c()
            } else {
                _evaluaranonacempl_con110c();
            }
        }
    )
}

function _evaluarmesnacempl_con110c() {
    validarInputs({
        form: "#MESNACIM_CON110C",
        orden: "1"
    },
        () => { _evaluaranonacempl_con110c(); },
        () => {
            $_MESNACEMPL = $('#mesnac_con110c').val();
            if (($_MESNACEMPL.trim() == '') || (parseInt($_MESNACEMPL) == 0)) {
                _evaluardianacempl_7767();
            } else if ((parseInt($_MESNACEMPL) < 1) || (parseInt($_MESNACEMPL) > 12)) {
                CON851('2D', '2D', null, 'error', 'error');
                _evaluarmesnacempl_con110c();

            } else if ($.isNumeric($_MESNACEMPL)) {
                _evaluardianacempl_7767();
            } else {
                _evaluarmesnacempl_con110c();
            }
        }
    )
}

function _evaluardianacempl_7767() {
    validarInputs({
        form: "#DIANACIM_CON110C",
        orden: "1"
    },
        () => { _evaluarmesnacempl_con110c(); },
        () => {
            $_DIANACEMPL = $('#dianac_con110c').val();
            if (($_DIANACEMPL.trim() == '') || (parseInt($_DIANACEMPL) == 0)) {
                _evaluarembargosempl_con110c();
            } else if ((parseInt($_DIANACEMPL) < 1) || (parseInt($_DIANACEMPL) > 31)) {
                CON851('2D', '2D', null, 'error', 'error');
                _evaluardianacempl_7767();
            } else if ($.isNumeric($_DIANACEMPL)) {
                _evaluarembargosempl_con110c();
            } else {
                _evaluardianacempl_7767();
            }
        }
    )
}

function _evaluarembargosempl_con110c() {
    validarInputs({
        form: '#EMBARGOS_CON110C',
        orden: "1"
    },
        function () { _evaluardianacempl_7767(); },
        _datoembargosempl_con110c
    )
}
function _datoembargosempl_con110c() {
    $_EMBARGOTERCEW = $('#embargos_con110c').val();
    if (($_NITUSU == '0800224972') || ($_NITUSU == '0900165076') || ($_NITUSU == '0830138486')) {
        _evaluarcedulasempl_con110c()
    } else {
        if ($_TIPOEMPRESAUSU == 'H') {
            _ubicargrabar_con110c();
        } else {
            ultimapestaña_con110c();
        }
    }
}

function _evaluarcedulasempl_con110c() {
    validarInputs({
        form: 'CELMPLEADOR_CON110C',
        orden: "1"
    },
        function () { _evaluarembargosempl_con110c(); },
        _evaluarentidadempl_con110c
    )
}

function _evaluarentidadempl_con110c() {
    validarInputs({
        form: '#ENTIDADAFIL_CON110C',
        orden: "1"
    },
        function () { _evaluarembargosempl_con110c(); },
        _datoentidadafil_con110c
    )
}
function _datoentidadafil_con110c() {
    $_ENTIDAFITERCEW = $('#entidadafil_con110c').val();

    ///// PENDIENTE DLL CON110C_11 REFERENTE A LA CONSULTA DEL CON802D
    _evaluarfechaafil_con110c();
}
function _evaluarfechaafil_con110c() {
    validarInputs({
        form: '#FECHAAFIL_CON110C',
        orden: "1"
    },
        function () { _evaluarembargosempl_con110c(); },
        ultimapestaña_con110c
    )
}
///////////////////////////// TABLA PESTAÑA 4 ////////////////////////////////
function ultimapestaña_con110c() {
    $('#tabla4').click();
    if ($_NOVEDADCON110C == '7') {
        _evaluardirectabla_con110c();
    } else {
        _validaciontabla_con110c();
    }
}

function _evaluardirectabla_con110c() {
    $('#imprimir_con110c').show()
    validarInputs({
        form: '#DIRESUCU_CON103',
        orden: "1",
        event_f3: _ubicargrabar_con110c
    },
        function () { _evaluarnombreref1_con110c(); },
        _validardirecciontabla
    )
}
function _validardirecciontabla() {
    $('#imprimir_con110c').hide()
    $_DIRECCIONTABLA = $("#diresucu_con110c").val();

    _evaluarteltabla_con110c();
}
function _evaluarteltabla_con110c() {
    validarInputs({
        form: '#TELSUCU_CON110C',
        orden: "1"
    },
        function () { _evaluardirectabla_con110c(); },
        _validarteltabla
    )
}
function _validarteltabla() {
    $_TELTABLA = $("#telsucu_con110c").val();
    _evaluarciudadtabla_con110c();
}
function _evaluarciudadtabla_con110c() {
    validarInputs({
        form: '#CIUDADSUCU_CON110C',
        orden: "1"
    },
        function () { _evaluarteltabla_con110c(); },
        _validarciudadtabla
    )
}
function _validarciudadtabla() {
    $_CIUDADTABLA = $("#ciudadsucu_con110c").val();
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_CIUDADTABLA;
    SolicitarDll({ datosh: datos_envio }, _dataCON110C_05_01_110C, get_url('/APP/CONTAB/CON110C_05.DLL'));
}

function _dataCON110C_05_01_110C(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == '00') {
        _evaluarbarriotabla_con110c()
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        _evaluarciudadtabla_con110c();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _evaluarbarriotabla_con110c() {
    validarInputs({
        form: '#BARRIOSUCU_CON110C',
        orden: "1"
    },
        function () { _evaluarciudadtabla_con110c(); },
        _validarbarriotabla
    )
}
function _validarbarriotabla() {
    $_BARRIOTABLA = $("#barriosucu_110c").val();
    let datos_envio = datosEnvio();
    datos_envio += '|'
    datos_envio += $_BARRIOTABLA.padStart(8, '0');

    SolicitarDll({ datosh: datos_envio }, _dataCON110C_13_110C, get_url('/APP/CONTAB/CON110C_13.DLL'));
}

function _dataCON110C_13_110C(data) {

    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == '00') {
        if ($_NOVEDADCON110C == '7') {
            agregarFilaTabla_con110c();
        } else {
            editarfilatabla_con110c();
        }
    }
    else if (swinvalid == '01') {
        CON851('01', '01', null, 'error', 'error');
        $_BARRIOTABLA = '00000000'
        $('#barriosucu_110c').val($_BARRIOTABLA);
        if ($_NOVEDADCON110C == 7) {
            agregarFilaTabla_con110c();
        } else {
            editarfilatabla_con110c();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function editarfilatabla_con110c() {
    var tamañotabla = $('#TABLADIRECCION_CON110C tbody tr').length;
    let nfila = parseInt($_Nfila) - 1;
    // console.debug($_Nfila);
    var cambiar = $('#item_con110c').val();
    cambiar = parseInt(cambiar);
    let fila = $('#TABLADIRECCION_CON110C tbody tr:eq(' + nfila + ')');
    let html = '<td>' + $('#item_con110c').val() +
        '</td><td>' + $('#diresucu_con110c').val() +
        '</td><td>' + $('#telsucu_con110c').val() +
        '</td><td>' + $('#ciudadsucu_con110c').val() +
        '</td><td>' + $('#barriosucu_110c').val() +
        '</td>';
    fila.html(html);
    $('#imprimir_con110c').show()
    _validaciontabla_con110c();
}

function agregarFilaTabla_con110c() {

    $('#TABLADIRECCION_CON110C tbody').append(
        '<tr>' +
        '<td>' + $('#diresucu_con110c').val() + '</td>' +
        '<td>' + $('#telsucu_con110c').val() + '</td>' +
        '<td>' + $('#ciudadsucu_con110c').val() + '</td>' +
        '<td>' + $('#barriosucu_110c').val() + '</td>' +
        '</tr>'
    );

    _validaciontabla_con110c();
}

function _validaciontabla_con110c(orden) {
    // $('#imprimir_con110c').show()
    validarTabla(
        {
            tabla: '#TABLADIRECCION_CON110C',
            orden: orden,
            event_f3: _ubicargrabar_con110c
        },
        _direcciones,
        function () {
            _evaluarnombreref1_con110c()
        },
        _ubicargrabar_con110c

    );
}

function _direcciones(datos) {
    // tabla110C = datos;
    // console.log(tabla110C, 'datos tabla')
    $_Nfila = tabla2.rowIndex;
    $('#item_con110c').val(datos.cells[0].textContent);
    $('#diresucu_con110c').val(datos.cells[1].textContent);
    $('#telsucu_con110c').val(datos.cells[2].textContent);
    $('#ciudadsucu_con110c').val(datos.cells[3].textContent);
    $('#barriosucu_110c').val(datos.cells[4].textContent);
    CON110C.tabla110C = [];
    let a = {
        'item': datos.cells[0].textContent,
        'direccion': datos.cells[1].textContent,
        'telefono': datos.cells[2].textContent,
        'ciudad': datos.cells[3].textContent,
        'barrio': datos.cells[4].textContent
    }
    CON110C.tabla110C.push(a);

    if ($_NOVEDADCON110C == '7') {
        _limpiarcampos_con110c();
        _evaluardirectabla_con110c();
        // _evaluaralmacen();
    } else {
        _evaluardirectabla_con110c();
        // _evaluaralmacen();
    }
}
function _limpiarcampos_con110c() {

    $('#diresucu_con110c').val('');
    $('#telsucu_con110c').val('');
    $('#ciudadsucu_con110c').val('');
    $('#barriosucu_110c').val('');
}


///////////////////////////// GRABAR DATOS ///////////////////////////////
function _ubicargrabar_con110c() {

    CON851P('01', _evaluarnombreref1_con110c, _tabladiretxt)
}

function _tabladiretxt() {
    let fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    let nombretxt = $_ADMINW + '_' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20) + '.txt';
    CON110C['NOMBRETABLA'] = nombretxt;
    let datosEnvio = {
        nombre_archivo: CON110C.NOMBRETABLA,
        tabla: CON110C.tabla110C,
    };
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('SALUD/paginas/_datostablas_SAL71G.php')
    }).done(function (data) {
        if (data == '00') {
            // let mensaje = '01';
            if ($_NOVEDADCON110C == '9') {
                _eliminarregistro_con110c();
            }
            else {
                _grabardatos_con110c();
            }
        } else {
            console.debug('problemas para crear el txt');
        }
    });
}
////////////////////GRABAR REGISTRO///////////////////////
function _grabardatos_con110c() {

    $_NOMREF1TERCEW = $('#nombreref1_110c').val();
    $_DIRREF1TERCEW = $('#dirref1_110c').val();
    $_TELREF1TERCEW = $('#telref1_110c').val();
    $_RELREF1TERCEW = $('#relacionref1_110c').val();
    $_NOMREF2TERCEW = $('#nombreref2_110c').val();
    $_DIRREF2TERCEW = $('#dirref2_110c').val();
    $_TELREF2TERCEW = $('#telref2_110c').val();
    $_RELREF2TERCEW = $('#relacionref2_110c').val();
    $_NOMREF3TERCEW = $('#nombreref3_110c').val();
    $_DIRREF3TERCEW = $('#dirref3_110c').val();
    $_TELREF3TERCEW = $('#telref3_110c').val();
    $_RELREF3TERCEW = $('#relacionref3_110c').val();

    $_NOMTRABTERCEW = $('#empleador_110c').val();
    $_DIRTRABTERCEW = $('#direc_110c').val();
    $_TELTRABTERCEW = $('#telempleador_110c').val();
    $_CARTRABTERCEW = $('#cargoempleador_110c').val();
    $_SUETRABTERCEW = $('#sueldoempleador_110c').val();
    $_ANTTRABTERCEW = $('#antigempleador_110c').val();
    $_CIUEXPTERCEW = $('#celempleador_con110c').val();
    $_FECHAAFILTERCEW = $('#fechaafil_con110c').val();


    if ($_NOVEDADCON110C == '8') {
        $_FECHAMODARTW = moment().format('YYMMDD');
        $_OPERMODARTW = $_ADMINW;

    } else {
        $_FECHACRETERCEW = moment().format('YYMMDD');
        $_ADMINCRETERCEW = $_ADMINW;
        $_FECHAMODTERCEW = ' ';
        $_ADMINMODTERCEW = ' ';
    }
    $_FECHANACTERCEW = $_ANONACEMPL + $_MESNACEMPL + $_DIANACEMPL;  
    
    // $_FACTORTERCEW = $_PORCICATER2W.padStart(3, '') + $_PORCRETTER2W.padEnd(2, '0');
    LLAMADO_DLL({
        dato: [$_NOVEDADCON110C, $_CODTERCEROW.padStart(10, '0'), $_DVTERCEROW, $_MESCUMPTERC, $_DIACUMPTERC, $_DESCRIPTERW, $_DIRECCTERCEW, $_CODCIUTERCEW, $_INDICTERCEW, $_TELTERCEW, $_NITTERCEW, $_TIPOIDTERCEW, $_ENTIDADTERCEW, $_ACTTERCEW, $_CONVENIOTERCEW, $_RUTTERCEW, $_NOMCOMERTERCEW,
            $_OTROSTERCEW, $_CONTACTTERCEW, $_WEBTERCEW, $_CARGOTERCEW, $_EMAILTERCEW, $_ASESORTERCEW, $_TIPOCUPOTERCEW, $_FECHACRETERCEW, $_ADMINCRETERCEW, $_FECHAMODTERCEW, $_ADMINMODTERCEW, $_FACTORTERCEW, $_CUPOTERCEW, $_VENDTERCEW, $_PAGOTERCEW, $_PLAZOTERCEW, $_CODZONAW,
            $_CODRUTAW, $_ORDENTERCEW, $_ACTIVICATERCEW, $_PORCICATERCEW, $_PORCRETTERCEW, $_GRADOTERCEW, $_CLASIFTERCEW, $_REGIVATERCEW, $_CALIFITERCEW, $_GRANCONTRIBTERCEW, $_RETETERCEW, $_VLRBASERETTERCEW, $_RETIVACOMPTERCEW, $_RETIVATERCEW, $_EXENTRETTERCEW, $_SEGUROTERCEW, $_DATACRETERCEW,
            $_ACUEPAGOTERCEW, $_CAPITADOTERCEW, $_NITCLITERCEW, $_RETICAVTERCEW, $_BLOQTERCEW, $_EXIVATERCEW, $_MARCATERCEW, $_EMPRESAVEHTERCEW, $_NROVEHTERCEW, $_PLACAVEHTERCEW, $_IDREPRETERCEW, $_NOMREPRETERCEW, $_EMAILREPTERCEW, $_IDTESORTERCEW, $_NOMTESORTERCEW, $_EMAILTESOTERCEW,
            $_NOMREF1TERCEW, $_DIRREF1TERCEW, $_TELREF1TERCEW, $_RELREF1TERCEW, $_NOMREF2TERCEW, $_DIRREF2TERCEW, $_TELREF2TERCEW, $_RELREF2TERCEW, $_NOMREF3TERCEW, $_DIRREF3TERCEW, $_TELREF3TERCEW, $_RELREF3TERCEW, $_NOMTRABTERCEW, $_DIRTRABTERCEW, $_TELTRABTERCEW, $_CARTRABTERCEW,
            $_SUETRABTERCEW, $_ANTTRABTERCEW, $_FECHANACTERCEW, $_EMBARGOTERCEW, $_CIUEXPTERCEW, $_ENTIDAFITERCEW, $_FECHAAFILTERCEW, CON110C.NOMBRETABLA, $_TIPOEMPRESAUSU],
        callback: _dataCON110C_14,
        nombredll: 'CON110C_14',
        carpeta: 'CONTAB'
    });

}

function _eliminarregistro_con110c() {
    $_NOMREF1TERCEW = $('#nombreref1_110c').val();
    $_DIRREF1TERCEW = $('#dirref1_110c').val();
    $_TELREF1TERCEW = $('#telref1_110c').val();
    $_RELREF1TERCEW = $('#relacionref1_110c').val();
    $_NOMREF2TERCEW = $('#nombreref2_110c').val();
    $_DIRREF2TERCEW = $('#dirref2_110c').val();
    $_TELREF2TERCEW = $('#telref2_110c').val();
    $_RELREF2TERCEW = $('#relacionref2_110c').val();
    $_NOMREF3TERCEW = $('#nombreref3_110c').val();
    $_DIRREF3TERCEW = $('#dirref3_110c').val();
    $_TELREF3TERCEW = $('#telref3_110c').val();
    $_RELREF3TERCEW = $('#relacionref3_110c').val();

    $_NOMTRABTERCEW = $('#empleador_110c').val();
    $_DIRTRABTERCEW = $('#direc_110c').val();
    $_TELTRABTERCEW = $('#telempleador_110c').val();
    $_CARTRABTERCEW = $('#cargoempleador_110c').val();
    $_SUETRABTERCEW = $('#sueldoempleador_110c').val();
    $_ANTTRABTERCEW = $('#antigempleador_110c').val();
    $_FECHANACTERCEW = $('#fechanac_con110c').val();
    $_CIUEXPTERCEW = $('#celempleador_con110c').val();
    $_FECHAAFILTERCEW = $('#fechaafil_con110c').val();

    if ($_NOVEDADCON110C == '8') {
        $_FECHAMODARTW = moment().format('YYMMDD');
        $_OPERMODARTW = $_ADMINW;

    } else {
        $_FECHACRETERCEW = moment().format('YYMMDD');
        $_ADMINCRETERCEW = $_ADMINW;
        $_FECHAMODTERCEW = ' ';
        $_ADMINMODTERCEW = ' ';
    }
    // $_FACTORTERCEW = $_PORCICATER2W.padStart(3, '0') + $_PORCRETTER2W.padEnd(2, '0');
    $_FECHANACTERCEW = $_ANONACEMPL + $_MESNACEMPL + $_DIANACEMPL;  

    LLAMADO_DLL({
        dato: [$_NOVEDADCON110C, $_CODTERCEROW.padStart(10, '0'), $_DVTERCEROW, $_MESCUMPTERC, $_DIACUMPTERC, $_DESCRIPTERW, $_DIRECCTERCEW, $_CODCIUTERCEW, $_INDICTERCEW, $_TELTERCEW, $_NITTERCEW, $_TIPOIDTERCEW, $_ENTIDADTERCEW, $_ACTTERCEW, $_CONVENIOTERCEW, $_RUTTERCEW, $_NOMCOMERTERCEW,
            $_OTROSTERCEW, $_CONTACTTERCEW, $_WEBTERCEW, $_CARGOTERCEW, $_EMAILTERCEW, $_ASESORTERCEW, $_TIPOCUPOTERCEW, $_FECHACRETERCEW, $_ADMINCRETERCEW, $_FECHAMODTERCEW, $_ADMINMODTERCEW, $_FACTORTERCEW, $_CUPOTERCEW, $_VENDTERCEW, $_PAGOTERCEW, $_PLAZOTERCEW, $_CODZONAW,
            $_CODRUTAW, $_ORDENTERCEW, $_ACTIVICATERCEW, $_PORCICATERCEW, $_PORCRETTERCEW, $_GRADOTERCEW, $_CLASIFTERCEW, $_REGIVATERCEW, $_CALIFITERCEW, $_GRANCONTRIBTERCEW, $_RETETERCEW, $_VLRBASERETTERCEW, $_RETIVACOMPTERCEW, $_RETIVATERCEW, $_EXENTRETTERCEW, $_SEGUROTERCEW, $_DATACRETERCEW,
            $_ACUEPAGOTERCEW, $_CAPITADOTERCEW, $_NITCLITERCEW, $_RETICAVTERCEW, $_BLOQTERCEW, $_EXIVATERCEW, $_MARCATERCEW, $_EMPRESAVEHTERCEW, $_NROVEHTERCEW, $_PLACAVEHTERCEW, $_IDREPRETERCEW, $_NOMREPRETERCEW, $_EMAILREPTERCEW, $_IDTESORTERCEW, $_NOMTESORTERCEW, $_EMAILTESOTERCEW,
            $_NOMREF1TERCEW, $_DIRREF1TERCEW, $_TELREF1TERCEW, $_RELREF1TERCEW, $_NOMREF2TERCEW, $_DIRREF2TERCEW, $_TELREF2TERCEW, $_RELREF2TERCEW, $_NOMREF3TERCEW, $_DIRREF3TERCEW, $_TELREF3TERCEW, $_RELREF3TERCEW, $_NOMTRABTERCEW, $_DIRTRABTERCEW, $_TELTRABTERCEW, $_CARTRABTERCEW,
            $_SUETRABTERCEW, $_ANTTRABTERCEW, $_FECHANACTERCEW, $_EMBARGOTERCEW, $_CIUEXPTERCEW, $_ENTIDAFITERCEW, $_FECHAAFILTERCEW, CON110C.NOMBRETABLA, $_TIPOEMPRESAUSU],
        callback: _dataCON110C_14,
        nombredll: 'CON110C_14',
        carpeta: 'CONTAB'
    });
}
function _dataCON110C_14(data) {

    var date = data.split('|');
    swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_NOVEDADCON110C == '9') {
            toastr.success('Se ha retirado', 'MAESTRO TERCEROS');
            // validarChecked('#Medicamentos_ser119', 'N')
            CON850(_datonovedad_con110c);
            _inputControl('reset');
        } else {
            toastr.success('Se ha guardado', 'MAESTRO TERCEROS');
            CON850(_datonovedad_con110c);
            _inputControl('reset');
        }
    }
    else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');

    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


////////////////////////////// NOVEDAD 8 Y 9 ///////////////////////////////////
function _retirar_con110c() {
    _consultadatos_con110c();
}

function _consultadatos_con110c() {

    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $_CODTERCEROW

    SolicitarDll({ datosh: datos_envio }, _dataCON110C_02, get_url('/APP/CONTAB/CON110C_02.DLL'));
}

function _dataCON110C_02(data) {
  
    var date = data.split("|");
    var swinvalid = date[0].trim();
    $_CODTERCEROW = date[1].trim();
    $_DVTERCEROW = date[2].trim();
    $_FECHACUMPTERCEW = date[3].trim();
    $_DESCRIPTERW = date[4].trim();
    // $_APEL1TER2W = date[4].trim();
    $_APEL2TER2W = date[5].trim();
    $_NOMB1TER2W = date[6].trim();
    $_DIRECCTERCEW = date[7].trim();
    $_CODCIUTERCEW = date[8].trim();
    $_DESCRIPCIUTERW = date[9].trim();
    $_INDICTERCEW = date[10].trim();
    $_TELTERCEW = date[11].trim();
    $_NITTERCEW = date[12].trim();
    $_TIPOIDTERCEW = date[13].trim();
    $_ENTIDADTERCEW = date[14].trim();
    $_DESCRIPENTTERW = date[15].trim();
    $_ACTTERCEW = date[16].trim();
    $_DESCRIPACTTERW = date[17].trim();
    $_CONVENIOTERCEW = date[18].trim();
    $_RUTTERCEW = date[19].trim();
    $_NOMCOMERTERCEW = date[20].trim();
    $_OTROSTERCEW = date[21].trim();
    $_CONTACTTERCEW = date[22].trim();
    $_WEBTERCEW = date[23].trim();
    $_CARGOTERCEW = date[24].trim();
    $_EMAILTERCEW = date[25].trim();
    $_ASESORTERCEW = date[26].trim();
    $_TIPOCUPOTERCEW = date[27].trim();
    $_FECHACRETERCEW = date[28].trim();
    $_ADMINCRETERCEW = date[29].trim();
    $_FECHAMODTERCEW = date[30].trim();
    $_ADMINMODTERCEW = date[31].trim();
    $_FACTORTERCEW = date[32].trim();
    // $_PORCICATER2W = $_FACTORTERCEW.substring(0, 3);
    // $_PORCRETTER2W = $_FACTORTERCEW.substring(3, 5);
    $_CUPOTERCEW = date[33].trim();
    $_VENDTERCEW = date[34].trim();
    $_PAGOTERCEW = date[35].trim();
    $_PLAZOTERCEW = date[36].trim();
    $_CODZONAW = date[37].trim();
    $_DESCRIPZONAW = date[38].trim();
    $_CODRUTAW = date[39].trim();
    $_DESCRIPRUTAW = date[40].trim();
    $_ORDENTERCEW = date[41].trim();
    $_ACTIVICATERCEW = date[42].trim();
    $_PORCICATERCEW = date[43].trim();
    $_PORCRETTERCEW = date[44].trim();
    $_GRADOTERCEW = date[45].trim();
    $_DESCRIPGRADTERW = date[46].trim();
    $_REGIVATERCEW = date[47].trim();
    $_CALIFITERCEW = date[48].trim();
    $_GRANCONTRIBTERCEW = date[49].trim();
    $_RETETERCEW = date[50].trim();
    $_VLRBASERETTERCEW = date[51].trim();
    $_RETIVACOMPTERCEW = date[52].trim();
    $_RETIVATERCEW = date[53].trim();
    $_EXENTRETTERCEW = date[54].trim();
    $_SEGUROTERCEW = date[55].trim();
    $_DATACRETERCEW = date[56].trim();
    $_ACUEPAGOTERCEW = date[57].trim();
    $_CAPITADOTERCEW = date[58].trim();
    $_NITCLITERCEW = date[59].trim();
    $_RETICAVTERCEW = date[60].trim();
    $_BLOQTERCEW = date[61].trim();
    $_EXIVATERCEW = date[62].trim();
    $_MARCATERCEW = date[63].trim();
    $_EMPRESAVEHTERCEW = date[64].trim();

    if (swinvalid == '00') {

        let datos_envio = datosEnvio()
        datos_envio += localStorage.Usuario + '|'
        datos_envio += $_CODTERCEROW.padStart(10, '0');

        SolicitarDll({ datosh: datos_envio }, _dataCON110C_03, get_url('/APP/CONTAB/CON110C_03.DLL'));
    }
    else {
        CON852(date[1], date[2], date[3], _toogleNav);
    }

}

function _dataCON110C_03(data) {
   
    var date = data.split("|");
    var swinvalid = date[0].trim();
    $_NROVEHTERCEW = date[1].trim();
    $_PLACAVEHTERCEW = date[2].trim();
    $_REPRETERCEW = date[3].trim();
    $_IDREPRETERCEW = $_REPRETERCEW.substring(0, 10);
    $_NOMREPRETERCEW = $_REPRETERCEW.substring(10, 30);
    $_EMAILREPTERCEW = date[4].trim();
    $_TESORTERCEW = date[5].trim();
    $_IDTESORTERCEW = $_TESORTERCEW.substring(0, 10);
    $_NOMTESORTERCEW = $_TESORTERCEW.substring(10, 30);
    $_EMAILTESOTERCEW = date[6].trim();
    $_REF1TERCEW = date[7].trim();
    $_NOMREF1TERCEW = $_REF1TERCEW.substring(0, 30);
    $_DIRREF1TERCEW = $_REF1TERCEW.substring(30, 60);
    $_TELREF1TERCEW = $_REF1TERCEW.substring(60, 75);
    $_RELREF1TERCEW = $_REF1TERCEW.substring(75, 85);
    $_REF2TERCEW = date[8].trim();
    $_NOMREF2TERCEW = $_REF2TERCEW.substring(0, 30);
    $_DIRREF2TERCEW = $_REF2TERCEW.substring(30, 60);
    $_TELREF2TERCEW = $_REF2TERCEW.substring(60, 75);
    $_RELREF2TERCEW = $_REF2TERCEW.substring(75, 85);
    $_REF3TERCEW = date[9].trim();
    $_NOMREF3TERCEW = $_REF3TERCEW.substring(0, 30);
    $_DIRREF3TERCEW = $_REF3TERCEW.substring(30, 60);
    $_TELREF3TERCEW = $_REF3TERCEW.substring(60, 75);
    $_RELREF3TERCEW = $_REF3TERCEW.substring(75, 85);
    $_TRABTERCEW = date[10].trim();
    $_NOMTRABTERCEW = $_TRABTERCEW.substring(0, 30);
    $_DIRTRABTERCEW = $_TRABTERCEW.substring(30, 60);
    $_TELTRABTERCEW = $_TRABTERCEW.substring(60, 75);
    $_CARTRABTERCEW = $_TRABTERCEW.substring(75, 90);
    $_SUETRABTERCEW = $_TRABTERCEW.substring(90, 100);
    $_ANTTRABTERCEW = $_TRABTERCEW.substring(100, 110);
    $_FECHANACTERCEW = date[11].trim();
    $_EMBARGOTERCEW = date[12].trim();
    $_CIUEXPTERCEW = date[13].trim();
    $_ENTIDAFITERCEW = date[14].trim();
    $_FECHAAFILTERCEW = date[15].trim();
    $_CLASIFTERCEW = date[16].trim();

    if (date[0].trim() == '00') {
        var json = date[17].trim();
        var rutajson = get_url("temp/" + json);

        SolicitarDatos(
            null,
            function (data) {

                $_DIRECCI_CON110C = data.DIRECCIONES;
                // arraygrpser.pop();
                var arrayEliminar = [];
                arrayEliminar.push(json);
                _eliminarJson(arrayEliminar, on_eliminarJsoncon110c);
            },
            rutajson
        );

    } else {
        loader('hide');
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function on_eliminarJsoncon110c(data) {

    var date = data.split('|');
    if (date[0].trim() == '00') {

        _mostrardatos_con110c();
    } else {
        console.error(res[1]);
        jAlert({ titulo: 'Error ', mensaje: 'Ha ocurrido un error eliminando archivos <b>.JSON</b>' }, _toggleNav);
    }
}

function _mostrardatos_con110c() {

    $('#codclien_con110c').val($_CODTERCEROW);
    $('#dv_con110c').val($_DVTERCEROW);
    $_DIACUMPLETERCEW = $_FECHACUMPTERCEW.substring(4, 6);
    $_MESCUMPLETERCEW = $_FECHACUMPTERCEW.substring(6, 8);
    $('#mescumpl_con110').val($_DIACUMPLETERCEW);
    $('#diacumpl_con110').val($_MESCUMPLETERCEW);
    $('#nombres_con110c').val($_DESCRIPTERW);
    $('#direcc_con110c').val($_DIRECCTERCEW);
    $('#ciudad_con110c').val($_CODCIUTERCEW);
    $('#ciudadd_con110c').val($_DESCRIPCIUTERW);
    $('#ind_con110c').val($_INDICTERCEW);
    $_TELTERCEW = $_TELTERCEW.replace(/^0+/, ''); 
    $('#tel_con110c').val($_TELTERCEW);
    $('#cc_con110c').val($_NITTERCEW);
    $('#tipoident_con110c').val($_TIPOIDTERCEW);
    $('#entidad_con110c').val($_ENTIDADTERCEW);
    $('#entidadd_con110c').val($_DESCRIPENTTERW);
    $('#actividad_con110c').val($_ACTTERCEW);
    $('#actividadd_con110c').val($_DESCRIPACTTERW);
    $('#convenio_con110c').val($_CONVENIOTERCEW);
    // $('#conveniod_con110c').val();
    $('#rut_110c').val($_RUTTERCEW);
    $('#nomcom_con110c').val($_NOMCOMERTERCEW);
    $('#datos_con110c').val($_OTROSTERCEW);
    $('#contact_con110c').val($_CONTACTTERCEW);
    $('#web_con110c').val($_WEBTERCEW);
    $('#cargo_con110c').val($_CARGOTERCEW);
    // $('#ultfact_con110c').val();
    $('#email_con110c').val($_EMAILTERCEW);
    $('#asesor_con110c').val($_ASESORTERCEW);
    $('#cupo_con110c').val($_TIPOCUPOTERCEW);
    $_ANOCRETERCEW = $_FECHACRETERCEW.substring(0, 2);
    $_MESCRETERCEW = $_FECHACRETERCEW.substring(2, 4);
    $_DIACRETERCEW = $_FECHACRETERCEW.substring(4, 6);
    $('#creado_110c').val($_ANOCRETERCEW + '/' + $_MESCRETERCEW + '/' + $_DIACRETERCEW);
    $('#creadod_110c').val($_ADMINCRETERCEW);
    $_ANOMODTERCEW = $_FECHAMODTERCEW.substring(0, 2);
    $_MESMODTERCEW = $_FECHAMODTERCEW.substring(2, 4);
    $_DIAMODTERCEW = $_FECHAMODTERCEW.substring(4, 6);
    $('#modificado_110c').val($_ANOMODTERCEW + '/' + $_MESMODTERCEW + '/' + $_DIAMODTERCEW);
    $('#modificadod_103').val($_ADMINMODTERCEW);

    factventas_110cMask.typedValue = $_FACTORTERCEW;
    // $('#factventas_con110c').val($_FACTORTERCEW);
    // $('#factventasd_con110c').val($_PORCRETTER2W);
    $('#smvm_con110c').val($_CUPOTERCEW);

    $('#vendedor_con110').val($_VENDTERCEW);
    $('#formapago_110c').val($_PAGOTERCEW);
    plazoUnitMask_110c.typedValue = $_PLAZOTERCEW;
    $('#zona_110c').val($_CODZONAW);
    if ($_DESCRIPZONAW == '1') {
        $_DESCRIPZONAW = '';
        $('#zonad_110c').val($_DESCRIPZONAW);
    } else {
        $('#zonad_110c').val($_DESCRIPZONAW);
    }
    $('#ruta_110c').val($_CODRUTAW);
    if ($_DESCRIPRUTAW == '2') {
        $_DESCRIPRUTAW = '';
        $('#rutad_110c').val($_DESCRIPRUTAW);
    } else {
        $('#rutad_110c').val($_DESCRIPRUTAW);
    }
    $('#orden_110c').val($_ORDENTERCEW);
    $('#actica_110c').val($_ACTIVICATERCEW);
    porcentica_110cMask.typedValue = $_PORCICATERCEW;
    porcentreten_110cMask.typedValue = $_PORCRETTERCEW;
    $('#grdnegocio_110c').val($_GRADOTERCEW);
    $('#grdnegociod_110c').val($_DESCRIPGRADTERW);
    $('#clasifclien_110c').val($_CLASIFTERCEW);
    $('#iva_110c').val($_REGIVATERCEW);
    $('#calif_110c').val($_CALIFITERCEW);
    $('#contribuyente_con110c').val($_GRANCONTRIBTERCEW);
    $('#baseret_con110c').val($_VLRBASERETTERCEW);
    $('#retenedor_con110c').val($_RETETERCEW);
    $('#reteivacompra_con110c').val($_RETIVACOMPTERCEW);
    $('#causareteiva_con110c').val($_RETIVATERCEW);
    $('#exento_con110c').val($_EXENTRETTERCEW);
    $('#cobroseg_con110c').val($_SEGUROTERCEW);
    $('#datacredito_con110c').val($_DATACRETERCEW);
    $('#acuerdopago_con110c').val($_ACUEPAGOTERCEW);
    $('#capitado_con110c').val($_CAPITADOTERCEW);
    $('#nitcliente_con110c').val($_NITCLITERCEW);
    $('#icav_con110c').val($_RETICAVTERCEW);
    $('#bloquearvend_con110c').val($_BLOQTERCEW);
    $('#excluiriva_con110c').val($_EXIVATERCEW);
    $('#marca_con110c').val($_MARCATERCEW);
    $('#empresa_con110c').val($_EMPRESAVEHTERCEW);
    $('#numero_con110c').val($_NROVEHTERCEW);
    $('#placa_con110c').val($_PLACAVEHTERCEW);
    $('#replegal_con110c').val($_IDREPRETERCEW);
    $('#nombrelegal_con110c').val($_NOMREPRETERCEW);
    $('#emailemp_con110c').val($_EMAILREPTERCEW);
    $('#tesorero_con110c').val($_IDTESORTERCEW);
    $('#nombreteso_con110c').val($_NOMTESORTERCEW);
    $('#emailteso_con110c').val($_EMAILTESOTERCEW);
    $('#nombreref1_110c').val($_NOMREF1TERCEW);
    $('#dirref1_110c').val($_DIRREF1TERCEW);
    $('#telref1_110c').val($_TELREF1TERCEW);
    $('#relacionref1_110c').val($_RELREF1TERCEW);
    $('#nombreref2_110c').val($_NOMREF2TERCEW);
    $('#dirref2_110c').val($_DIRREF2TERCEW);
    $('#telref2_110c').val($_TELREF2TERCEW);
    $('#telref2_110c').val($_RELREF2TERCEW);
    $('#nombreref3_110c').val($_NOMREF3TERCEW);
    $('#dirref3_110c').val($_DIRREF3TERCEW);
    $('#telref3_110c').val($_TELREF3TERCEW);
    $('#relacionref3_110c').val($_RELREF3TERCEW);
    $('#empleador_110c').val($_NOMTRABTERCEW);
    $('#direc_110c').val($_DIRTRABTERCEW);
    $('#telempleador_110c').val($_TELTRABTERCEW);
    $('#cargoempleador_110c').val($_CARTRABTERCEW);
    $('#sueldoempleador_110c').val($_SUETRABTERCEW);
    $('#antigempleador_110c').val($_ANTTRABTERCEW);
    $_ANONACEMPL = $_FECHANACTERCEW.substring(0, 4);
    $_MESNACEMPL = $_FECHANACTERCEW.substring(4, 6);
    $_DIANACEMPL = $_FECHANACTERCEW.substring(6, 8);
    $('#anonac_con110c').val($_ANONACEMPL);
    $('#mesnac_con110c').val($_MESNACEMPL);
    $('#dianac_con110c').val($_DIANACEMPL);
    $('#embargos_con110c').val($_EMBARGOTERCEW);
    $('#celempleador_con110c').val($_CIUEXPTERCEW);
    $('#entidadafil_con110c').val($_ENTIDAFITERCEW);
    // $_ANOAFILTERCEW = $_FECHANACTERCEW.substring(0, 4);
    // $_MESAFILTERCEW = $_FECHANACTERCEW.substring(4, 6);
    // $_DIAAFILTERCEW = $_FECHANACTERCEW.substring(6, 8);
    // $('#fechaafil_con110c').val($_ANOAFILTERCEW + '/' + $_MESAFILTERCEW + '/' + $_DIAAFILTERCEW);

    var cont = 0;
    for (var i = 0; i < $_DIRECCI_CON110C.length; i++) {
        direcciontabla = $_DIRECCI_CON110C[i].DIRECCION;
        telefonotabla = $_DIRECCI_CON110C[i].TELEXT;
        ciudadtabla = $_DIRECCI_CON110C[i].CODCIU;
        barriotabla = $_DIRECCI_CON110C[i].BARRIOTER;
        var sumar = $_DIRECCI_CON110C[i].DIRECCION.trim();
        if (sumar.length > 1) {
            cont++;
            $('#TABLADIRECCION_CON110C tbody').append(''
                + '<tr>'
                + '<td>' + cont.toString().padStart(2, '0') + '</td>'
                + '<td>' + direcciontabla + '</td>'
                + '<td>' + telefonotabla + '</td>'
                + '<td>' + ciudadtabla + '</td>'
                + '<td>' + barriotabla + '</td>'
                + "</tr>"
            );
        }

    }
    if ($_NOVEDADCON110C == '9') {
        _retiroregistro_con110c();
    } else {
        _evaluardatodv_con110c();
    }
}

function _retiroregistro_con110c() {

    CON851P('54', _evaluarcodcliente110c, _tabladiretxt)
}



