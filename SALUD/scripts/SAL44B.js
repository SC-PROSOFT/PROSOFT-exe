/* NOMBRE RM --> INV404B // NOMBRE ELECTR --> SAL44B */
var SAL44B = [];
var $_GRUPOS_SAL44B = [];

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_ANOLNK = 20 + $_ANOLNK;
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
    $_CODCIUUSU = $_USUA_GLOBAL[0].CONTROL_USU
    $_DPTCIUUSU = $_CODCIUUSU.substring(0, 1);
    $_CIUCIUUSU = $_CODCIUUSU.substring(1, 5);
    $_INVENTUSU = $_USUA_GLOBAL[0].INVENT;

    _toggleF8([
        { input: 'clase', app: 'SAL944B', funct: _ventanaclase_SAL944B },
        { input: 'grupo', app: 'SAL944B', funct: _ventanagrupos_SAL944B }
    ]);
    if ($_USUA_GLOBAL[0].NIT == '0800156469') {
        SAL44B.SERVICIOS = [
            { COD: '0', DESCRIPCION: 'DROGUERIA' },
            { COD: '1', DESCRIPCION: 'CIRUGIAS' },
            { COD: '2', DESCRIPCION: 'ECOGRAFIAS' },
            { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
            { COD: '4', DESCRIPCION: 'DOPPLER' },
            { COD: '5', DESCRIPCION: 'T.A.C.' },
            { COD: '6', DESCRIPCION: 'RESONANCIA NUCLEAR' },
            { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
        ]
    } else {
        SAL44B.SERVICIOS = [
            { COD: '0', DESCRIPCION: 'DROGUERIA' },
            { COD: '1', DESCRIPCION: 'CIRUGIAS' },
            { COD: '2', DESCRIPCION: 'LAB. Y OTROS DIAG.' },
            { COD: '3', DESCRIPCION: 'RX - IMAGENOLOGIA' },
            { COD: '4', DESCRIPCION: 'OTROS SERVICIOS' },
            { COD: '5', DESCRIPCION: 'CONSULTAS Y TERAPIAS' },
            { COD: '6', DESCRIPCION: 'PATOLOGIA' },
            { COD: '7', DESCRIPCION: 'PROMOCION Y PREVENCION' },
        ]
    }
    obtenerDatosCompletos({
        nombreFd: 'GRUPOS'
    }, function (data) {
        $_GRUPOS_SAL44B = data.GRUPOS;
        $_GRUPOS_SAL44B.pop();
        _evaluarcl_sal944B();
    })
});


function _ventanaclase_SAL944B(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "TIPO DE SERVICIO",
            columnas: ["COD", "DESCRIPCION"],
            data: SAL44B.SERVICIOS,
            callback_esc: function () {
                $("#clase_SAL944B").focus();
            },
            callback: function (data) {
                $('#clase_SAL944B').val(data.COD.trim());

                _enterInput('#clase_SAL944B');
            }
        });
    }
}

function _ventanagrupos_SAL944B(e) {
    TIPOGRUPOS = "0";
    filtrogrupos = $_GRUPOS_SAL44B.filter(clase => (clase.TIPO == TIPOGRUPOS))
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "GRUPOS DE SERVICIO",
            columnas: ["TIPO", "GRUPO", "DESCRIP"],
            data: filtrogrupos,
            callback_esc: function () {
                $("#grupo_SAL944B").focus();
            },
            callback: function (data) {
                $('#grupo_SAL944B').val(data.GRUPO.trim())
                _enterInput('#grupo_SAL944B');
            }
        });
    }

}

function _evaluarcl_sal944B() {
    validarInputs(
        {
            form: "#CLASE_SAL944B",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SAL44B.CLASEW = $('#clase_SAL944B').val();
            switch (SAL44B.CLASEW) {
                case "0":
                    $('#descripclase_SAL944B').val('DROGAS');
                    _evaluarfechaini_SAL944B();
                    break;
                case "1":
                    $('#descripclase_SAL944B').val('CIRUGIA');
                    _evaluarfechaini_SAL944B();
                    break;
                case "2":
                    $('#descripclase_SAL944B').val('LABORATORIO');
                    _evaluarfechaini_SAL944B();
                    break;
                case "3":
                    $('#descripclase_SAL944B').val('IMAGENOLOGIA');
                    _evaluarfechaini_SAL944B();
                    break;
                case "4":
                    $('#descripclase_SAL944B').val('OTROS SERVICIOS');
                    _evaluarfechaini_SAL944B();
                    break;
                case "5":
                    $('#descripclase_SAL944B').val('CONSULTAS');
                    _evaluarfechaini_SAL944B();
                    break;
                case "7":
                    $('#descripclase_SAL944B').val('P Y P');
                    _evaluarfechaini_SAL944B();
                    break;
                case "*":
                    $('#descripclase_SAL944B').val('TODOS');
                    _evaluarfechaini_SAL944B();
                    break;
                default:
                    _evaluarcl_sal944B();
                    break;
            }
        }
    )
}


function _evaluarfechaini_SAL944B() {
    $('#anoini_SAL944B').val($_ANOLNK);
    $('#mesini_SAL944B').val($_MESLNK);
    validarInputs(
        {
            form: "#DIAINIC_SAL944B",
            orden: '1'
        },
        () => { _evaluarcl_sal944B(); },
        () => {
            SAL44B.DIAINI = $('#diaini_SAL944B').val();
            SAL44B.DIAINI = SAL44B.DIAINI.padStart(2, '0');
            SAL44B.FECHAINICIAL = $_ANOLNK + $_MESLNK + SAL44B.DIAINI;
            _evaluarfechasal_sal944B();
        }
    )
}

function _evaluarfechasal_sal944B() {
    $('#anofin_SAL944B').val($_ANOLNK);
    $('#mesfin_SAL944B').val($_MESLNK);
    validarInputs(
        {
            form: "#DIAFINAL_SAL944B",
            orden: '1'
        },
        () => { _evaluarfechaini_SAL944B(); },
        () => {
            SAL44B.DIAFIN = $('#diafin_SAL944B').val();
            SAL44B.FECHAFINAL = $_ANOLNK + $_MESLNK + SAL44B.DIAFIN;
            if (parseInt(SAL44B.DIAFIN) < parseInt(SAL44B.DIAINI)) {
                _evaluarfechasal_sal944B();
            } else {
                if (SAL44B.CLASEW != '0') {
                    SAL44B.CODIGO = '**';
                    $('#grupo_SAL944B').val(SAL44B.CODIGO);
                    $('#descripgrupo_SAL944B').val('TODOS LOS GRUPOS');
                    CON851P('04', _toggleNav, _grabaropcion_sal944B)
                } else {
                    evaluargrupos_SAL44B();
                }
            }
        }
    )
}

function evaluargrupos_SAL44B() {
    validarInputs(
        {
            form: "#GRUPO_SAL944B",
            orden: '1'
        },
        () => { _evaluarfechasal_sal944B(); },
        () => {
            SAL44B.TIPOW = '0';
            SAL44B.CODIGO = $('#grupo_SAL944B').val();
            SAL44B.LLAVEGRUPO = SAL44B.TIPOW + SAL44B.CODIGO;
            if (SAL44B.LLAVEGRUPO.trim() == '') {
                CON851('01', '01', null, 'error', 'error');
                evaluargrupos_SAL44B();
            } else {
                LLAMADO_DLL({
                    dato: [SAL44B.LLAVEGRUPO],
                    callback: _consultaSAL44B_04,
                    nombredll: 'SAL44B-03',
                    carpeta: 'SALUD'
                });

            }
        }
    )
}

function _consultaSAL44B_04(data) {
    var date = data.split("|");
    var swinvalid = date[0].trim();
    SAL44B.DESCRIPGRUPOS = date[1].trim();
    if (swinvalid == "00") {
        $('#descripgrupo_SAL944B').val(SAL44B.DESCRIPGRUPOS);
        CON851P('04', _toggleNav, _grabaropcion_sal944B)
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarfechasal_sal944B();
    }
}

function _grabaropcion_sal944B() {
    let URL = get_url("APP/SALUD/SAL44B-02.DLL");
    postData({ datosh: datosEnvio() + SAL44B.CLASEW + '|' + SAL44B.FECHAINICIAL + '|' + SAL44B.FECHAFINAL + '|' + SAL44B.CODIGO }, URL)
        .then(data => {
            SAL44B.COMPROBANTE = data.RECONSCOMPRO;
            swinvalid = SAL44B.COMPROBANTE[0].ESTADO;
            console.log(SAL44B.COMPROBANTE, 'SAL44.COMPROBANTE')
            loader("show");
            if (swinvalid == '00') {
                for (var i = 0; i < SAL44B.COMPROBANTE.length; i++) {
                    if (SAL44B.CLASEW == 'E' || SAL44B.CLASEW == 'C') {
                        let datos_envio = datosEnvio() + SAL44B.COMPROBANTE[i].LLAVEFACT + '|';
                        SolicitarDll({ datosh: datos_envio }, dato => {
                            console.log(dato, 'INV020');
                            if (dato[0].trim() == '00') {
                                _procesandofacturas_SAL44B(i); 
                            }
                            else {
                                CON852(dato[0], dato[1], dato[2], _toggleNav);
                            }
                        }, get_url('APP/SALUD/SAL020.DLL'));
                    } else if ($_NITUSU == '0830092718') {
                        let datos_envio = datosEnvio() + SAL44B.COMPROBANTE[i].LLAVEFACT + '|';
                        SolicitarDll({ datosh: datos_envio }, dato => {
                            console.log(dato, 'INV020');
                            dato = dato.split('|');
                            if (dato[0].trim() == '00') {
                                i=SAL44B.COMPROBANTE.length+1;
                            }
                            else {
                                CON852(dato[0], dato[1], dato[2], _toggleNav);
                            }
                        }, get_url('APP/SALUD/SAL020.DLL'));
                    }else{
                        _procesandofacturas_SAL44B(i); 
                    }
                }
                _borrarinput_SAL44B();
            } else {
                $('#clase_SAL944B').val('');
                $('#descripclase_SAL944B').val('');
                $('#anoini_SAL944B').val('');
                $('#mesini_SAL944B').val('');
                $('#diaini_SAL944B').val('');
                $('#anofin_SAL944B').val('');
                $('#mesfin_SAL944B').val('');
                $('#diafin_SAL944B').val('');
                $('#grupo_SAL944B').val('');
                $('#descripgrupo_SAL944B').val('');
                CON851('01', '01', null, 'error', 'error');
                _evaluarcl_sal944B();
            }
            loader("hide");
        })
        .catch(err => {
            console.debug(err);
        })
}
function _borrarinput_SAL44B() {
    _inputControl('reset');
    _inputControl('disabled');
    _evaluarcl_sal944B();
}

function _procesandofacturas_SAL44B(i){
    if (($_INVENTUSU == 'S') && ((SAL44B.COMPROBANTE[i].CLIND == '0') || (SAL44B.COMPROBANTE[i].MACROIND == '1'))) {
        SAL44B.SWRECAL = '0';
        let datos_envio = datosEnvio() + '|' + SAL44B.LLAVEFACT + '|' + SAL44B.SWRECAL + '|';
        SolicitarDll({ datosh: datos_envio }, data => {
            console.log(data, 'INV030');
            if (data.trim() != '00') { 
                CON852(data[0], data[1], data[2], _toggleNav);
            }
        }, get_url('APP/SALUD/SAL030.DLL'));
    } else {
        console.log('no coincide');

    }
}