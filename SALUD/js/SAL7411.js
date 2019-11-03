var $_SECU1NUM, $_SECU2NUM, $_REDEXTER, NUM_FACT, $_FECHA_SIG_W, $_FECHA_ING_W, $_FECHA_CRE_W, FECHA_INI_W, $_NRO_W,
    $_DESCRIPW, $_NITNUM, $_ESTADONUM, $_CONVENIOTER, $_FACTURANUMW, $_ANONUM, $_IDPACW2, $_PACI2W, $_SEGRIPSW = ' ', $_OBSERVW,
    $_TIPOFACTW = ' ', $_ENTRAREMITW = ' ', $_REDEXTERW = ' ', $_OBSERAPERW = ' ', $_NROAUTORIZACIONW = ' ', $_TIPOEVENTOW = ' ',
    $_PRECAPITW = ' ', $_NROCAPITW = ' ', $_NITW = ' ', $_CONVENIOW = ' ', $_ESTADOW = ' ', $_PORCRETENCW = ' ', $_CTAPICW = ' ', $_IDPACW = ' ',
    $_DESCRIPPACIW = ' ', $_HABW = ' ', $_PORCENCOPAGOW = ' ', $_FECHAINGSISTEMA, $_HORAINGSISTEMA, $_FECHASALW, $_HORASALW, $_SERVICIOW,
    $_CONTRATOW, $_DIVISIONW, $_FORMACOPAGW, $_CCOSTOW, $_ENVIOW, $_CONTROLCAPW, $_TIPOPACIW, $_DETALLEW, $_CTLNROPACIW, $_CONTROLCL0 = '', $_CONTROLCL1 = '',
    $_CONTROLCL2 = '', $_CONTROLCL3 = '', $_CONTROLCL4 = '', $_CONTROLCL5 = '', $_CONTROLCL6 = '', $_CONTROLCL7 = '', $_CISW, $_MYTW, $_CONTROLXSERVW,
    $_ARTIVAW, $_NROPOLW, $_RUTAW, $_ESTW, $_CLASIFW, $_ENTRAREMITW, $_ORIGREMIT, $_TIPOEVENTOW, $_CIUDADW, $_DESCRIPCIUDADW, $_FUNCAUTORINGW,
    $_NROAUTORIZACIONW, $_OBSERAPERW, $_OPERBLOQNUM = '';;
var $_PACILNK;
var SAL7411 = [];


var vlrcopago_7411Mask = new IMask(document.getElementById('porcent_108'),
    { mask: Number, min: 0, max: 99999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);

function _devolvernovedad() {
    console.debug("no eres admin");
    var novedades = '[{"COD": "7","DESCRIP": "NUEVO"},{"COD": "8", "DESCRIP": "CAMBIO"},{"COD": "9","DESCRIP": "RETIRO"}]'
    var novedad = JSON.parse(novedades);
    POPUP({
        array: novedad,
        titulo: 'NOVEDAD'
    },
        _evaluarNovedad_108);
}



////////////////////////////////////  CODE  ///////////////////////////////////////////

$(document).ready(function () {
    console.log("empieza")
    _inputControl("reset");
    _inputControl("disabled");
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_PREFIJOUSU = $_USUA_GLOBAL[0].PREFIJ;
    $_CONTADOUSU = $_USUA_GLOBAL[0].CONTADO;
    $_PUCUSU = $_USUA_GLOBAL[0].PUC;
    $_CONTROLFORMUUSU = $_USUA_GLOBAL[0].CTRL_FORMU;
    // dataconvenios();
    _toggleF8([
        { input: 'factura', app: '108', funct: _ventanaFacturacion },
        { input: 'nit', app: '108', funct: _ventanaTerceros },
        { input: 'convenio', app: '108', funct: _ventanaConvenios },
        { input: 'idpaciente', app: '108', funct: _ventanaPacientes },
        { input: 'servicio', app: '108', funct: _ventanaServicio },
        { input: 'costos', app: '108', funct: _ventanaCostos },
        { input: 'division', app: '108', funct: _ventanaDivision },
        { input: 'ciudad', app: '108', funct: _ventanaCiudad },
        { input: 'origen', app: '108', funct: _ventanaOrigen }
    ]);
    CON850(_dato_novedad_SAL7411);
});

//////////////////////////////////////////// F8 //////////////////////////////////////////////////

function _ventanaFacturacion(e) {
    console.log("f8 fact")
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        F8LITE({
            variables: ["DESCRIP", "COD", "NIT_NUM", "NOM_PAC", "ID_PAC"],
            titulo: 'FACTURACION',
            nombrelabel: 'Digite el número a buscar',
            span: 'Número de factura',
            array: $_FACTURACION_108,
            callback: function (data) {
                console.debug(data);
                var date = data.split("|");
                var espacios = date[0].trim();
                var factura = espacios.padStart(6, "0")
                $("factura_108").val(factura);
                _enterInput("#factura_108");
            },
            consultaren: ["COD"],
            validar: ["COD", "DESCRIP"],
            size: 'extra-large'
        })
    }
}

function _ventanaTerceros(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        F8LITE({
            variables: ["NOMBRE", "IDENTIFICACION", "TELEFONO", "CIUDAD", "ACTIVIDAD"],
            titulo: 'VENTANA DE TERCEROS',
            nombrelabel: 'Digite el Nombre de la entidad',
            span: 'Entidad',
            array: $_TERCEROS_108,
            callback: function (data) {
                console.debug(data);
                var date = data.split("|");
                var espacios = date[0].trim();
                var nit = espacios.padStart(10, "0");
                $("#nit_108").val(nit);
                _enterInput("#nit_108");
            },
            consultaren: ["NOMBRE"],
            validar: ["IDENTIFICACION", "NOMBRE"],
            size: 'extra-large'
        })
    }
}

function _ventanaConvenios(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONVENIOS",
            columnas: ["ID", "DESCRIPCION"],
            data: $_CONVENIO_108,
            callback_esc: function () {
                $("#convenio_108").focus();
            },
            callback: function (data) {
                $('#convenio_108').val(data.ID.trim());
                $("#dconvenio_108").val(data.DESCRIPCION.trim());
                _enterInput('#convenio_108');
            }
        });
    }
}

function _ventanaPacientes(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        F8LITE({
            variables: ["COD", "NOMBRE", "EPS", "DERECHO", "NACIMIENTO", "CIVIL", "SEXO", "OCUPACION"],
            titulo: 'VENTANA DE PACIENTES',
            nombrelabel: 'Digite el Nombre del paciente',
            span: 'Nombre',
            array: $_PACIENTES_108,
            callback: function (data) {
                console.debug(data);
                var date = data.split("|");
                $("#idpaciente_108").val(date[0].trim());
                $("#nombrepac_108").val(date[1].trim());
                _enterInput("#idpaciente_108");
            },
            consultaren: ["NOMBRE"],
            validar: ["COD", "NOMBRE"],
            size: 'extra-large'
        });
    }
}

function _ventanaServicio(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE SERVICIOS HOSPITALARIOS",
            columnas: ["ID", "DESCRIPCION"],
            data: $_SERVIHOSP_108,
            callback_esc: function () {
                $("#servicio_108").focus();
            },
            callback: function (data) {
                $('#servicio_108').val(data.ID.trim() + "-" + data.DESCRIPCION.trim());
                _enterInput('#servicio_108');
            }
        });
    }
}

function _ventanaCostos(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
            columnas: ["COD", "NOMBRE"],
            data: $_COSTOS_108,
            callback_esc: function () {
                $("#costos_108").focus();
            },
            callback: function (data) {
                $('#costos_108').val(data.COD.trim() + "-" + data.NOMBRE.trim());
                _enterInput('#costos_108');
            }
        });
    }
}

function _ventanaDivision(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA DE DIVISION",
            columnas: ["CODIGO", "DESCRIPCION"],
            data: $_DIVISION_108,
            callback_esc: function () {
                $("#division_108").focus();
            },
            callback: function (data) {
                $('#division_108').val(data.CODIGO.trim() + "-" + data.DESCRIPCION.trim());
                _enterInput('#division_108');
            }
        });
    }
}

function _ventanaCiudad(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA DE CIUDADES",
            columnas: ["COD", "NOMBRE", "NOM_PAIS", "DEPART"],
            data: $_CIUDAD_108,
            callback_esc: function () {
                $("#ciudad_108").focus();
            },
            callback: function (data) {
                $('#ciudad_108').val(data.COD.trim() + "-" + data.NOMBRE.trim());
                _enterInput('#ciudad_108');
            }
        });
    }
}

function _ventanaOrigen(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA DE IPS",
            columnas: ["COD", "DESCRIP", "CIUDAD", "TEL"],
            data: $_IPS_108,
            callback_esc: function () {
                $("#origen_108").focus();
            },
            callback: function (data) {
                $('#origen_108').val(data.COD.trim() + "-" + data.DESCRIP.trim());
                _enterInput('#origen_108');
            }
        });
    }
}

//////////////////////////////////// MASCARAS //////////////////////////////////////////

var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUAL = $_FECHAACTUAL.substring(6, 8);

var momentFormatingresopac = moment().format("YYYY/MM/DD HH:mm");
var momentMaskfechaingreso = IMask($("#fechaing_108")[0], {
    mask: Date,
    pattern: momentFormatingresopac,
    lazy: true,
    min: new Date(2009, 0, 1),
    max: new Date(2080, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormatingresopac);
    },
    parse: function (str) {
        return moment(str, momentFormatingresopac);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2009,
            to: 2080
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }

});

var momentFormatsalidapac = ("YYYY/MM/DD HH:mm");

var momentMaskfechasalida = IMask($("#fechasal_108")[0], {
    mask: Date,
    pattern: momentFormatsalidapac,
    lazy: true,
    min: new Date(2000, 0, 1),
    max: new Date(2021, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormatsalidapac);
    },
    parse: function (str) {
        return moment(str, momentFormatsalidapac);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2000,
            to: 2021
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }

});

var momentFormatdos = 'YYYY/MM/DD HH:mm';
var momentMaskfechaing = IMask($("#fechaing_108")[0], {
    mask: Date,
    pattern: momentFormatdos,
    lazy: true,
    min: new Date(2009, 0, 1),
    max: new Date(2021, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormatdos);
    },
    parse: function (str) {
        return moment(str, momentFormatdos);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2009,
            to: 2021
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
});


function _dato_novedad_SAL7411(novedad) {
    _inputControl('reset');
    _inputControl('disabled');

    $_NOVEDAD = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            if (parseInt(novedad.id == 9)) {
                if (($_ADMINW == "ADMI") || ($_ADMINW == "GEBC") || ($_ADMINW == "0101")) {
                    /// SOLO PRUEBA PARA ELIMINAR Y REVISAR REGISTROS
                    // _infoSER108();
                    _infoCON007B_01();
                }
                else {
                    CON851('14', '14', null, 'error', 'error');
                    // _devolvernovedad();
                    CON850(_dato_novedad_SAL7411);
                }
            }
            else {
                // _infoSER108();
                _infoCON007B_01();
            }
            break;

        default:
            _toggleNav();
            break;
    }
    $('#novedad_108').val(novedad.id + ' - ' + novedad.descripcion)
}


function _infoCON007B_01() {
    LLAMADO_DLL({
        dato: [$_ADMINW],
        callback: _dataCON007B_01,
        nombredll: 'CON007B',
        carpeta: 'CONTAB'
    })
}

function _dataCON007B_01(data) {
    console.log(data, "CON007B")
    var date = data.split("|");
    var segw = date[1].substring(0, 1);
    if (segw == "0" || segw == "3" || segw == "5") {
        if ($_NOVEDAD == "7") {
            _infoCON904_01();
        }
        else {
            _prefijo();
        }
    }
    else {
        _toggleNav();
    }
}

function _infoCON904_01() {
    $_OPSEGU = "XXXXX";
    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904_01,
        nombredll: 'CON904',
        carpeta: 'CONTAB'
    })
}

function _dataCON904_01(data) {
    console.log(data, "CON904_01");
    var date = data.split("|");
    if (date[0] == "00") {
        _prefijo();
    }
    else {
        _toggleNav();
    }
}

function _prefijo() {
    var servicio = [
        { "COD": "A", "DESCRIP": "AMBULATORIO" },
        { "COD": "P", "DESCRIP": "PENSIONADO" },
        { "COD": "T", "DESCRIP": "T. ACCI. TRANSITO" }
    ]
    POPUP({
        array: servicio,
        titulo: 'SERVICIO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _devolvernovedad
    },
        _evaluarprefijo);
}



function _evaluarprefijo(servicio) {
    $_PREFIJOW = servicio.COD;
    switch (servicio.COD) {
        case 'A':
        case 'P':
        case 'T':
            _infoSER108_03();
            // _subfacturas();
            break;
        default:
            CON850(_dato_novedad_SAL7411);
            break;
    }
    $("#prefijo_108").val(servicio.COD + " - " + servicio.DESCRIP);
}

// function _subfacturas() {   ////FILTRO DE FACTURAS ///////////
//     $.each($_FACTURACION_108, function (key, value) {

//         if (value['COD'].substring(0, 1) == 'A') {
//             $_facturas_A.push(value);

//         }
//         else if (value['COD'].substring(0, 1) == 'P') {
//             $_facturas_P.push(value);

//         }
//         else if (value['COD'].substring(0, 1) == 'T') {
//             $_facturas_T.push(value);
//         }
//     });
// }


function _infoSER108_03() {
    console.log($_PREFIJOW);
    LLAMADO_DLL({
        dato: [$_PREFIJOW],
        callback: _dataSER108_03,
        nombredll: 'SER108-03',
        carpeta: 'SALUD'
    })
}

function _dataSER108_03(data) {
    console.log(data, "SER108-03");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        switch ($_PREFIJOW) {
            case "P":
                $_SWCLAVE = date[2];
                _infoCON904_02();
                break;
            case "T":
                $_SWCLAVE = date[2];
                _infoCON904_02();
                break;
            default:
                $_SWCLAVE = date[3];
                console.log($_SWCLAVE, '$_SWCLAVE')
                _infoCON904_02();
                break;
        }
    }
    else if (swinvalid == "01") {
        $_SWPARE = date[1];
        CON851('03', '03', null, 'error', 'error');
        setTimeout(_prefijo, 500);
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function _infoCON904_02() {
    $_OPSEGU = "IS41" + $_PREFIJOW;
    console.log($_OPSEGU, "_INFOCON90402");
    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904_02,
        nombredll: 'CON904',
        carpeta: 'CONTAB'
    })
}

function _dataCON904_02(data) {
    console.log(data, 'CON904_02');
    var date = data.split("|");
    var swinvalid = date[0];
    if (swinvalid == "00") {
        if ((($_NITUSU == "0844003225") || ($_NITUSU == "0800037021")) && ($_CONTROLFORMUUSU == 'S') && (($_PREFIJOW == "P") || ($_PREFIJOW == "T")) && ($_NOVEDAD == "7")) {
            console.log("CALL HC810T LINEA 672");
        }
        else {
            _infoCON003_01();
        }
    }
    else {
        _prefijo();
    }
}

function _infoCON003_01() {
    LLAMADO_DLL({
        dato: [$_ADMINW],
        callback: _dataCON003_01,
        nombredll: 'CON003',
        carpeta: 'CONTAB'
    })
}

function _dataCON003_01(data) {
    console.log(data, 'CON003_01')
    var date = data.split("|");
    $_SUCOPERW = date[1].substr(8, 10);
    console.log($_SUCOPERW);
    if (($_NOVEDAD == "7") || ($_NRO_W == "000000")) {
        BUSCARNUMERO(_infoCOON007_01);
    }
    else {
        _evaluarfactura();
    }
}

function _evaluarfactura() {
    console.log("evaluarfactura");
    validarInputs({
        form: '#FACTURASER_108',
        orden: "1"
    },
        function () { _prefijo() },
        _validarfactura
    )
}

function _validarfactura() {
    console.log("validarfactura");

    $_NROW = $("#factura_108").val();
    $_NROW = $_NROW.padStart(6, "0");

    console.log($_NROW);
    $_LLAVEW = $_PREFIJOW + $_NROW;
    $("#factura_108").val($_LLAVEW);
    if (($_NROW == " ") || (parseInt($_NROW) == 0)) {
        CON851('13', '13', null, 'error', 'error')
        _evaluarfactura();
    }
    else {
        LLAMADO_DLL({
            dato: [$_LLAVEW],
            callback: _dataSER108_04,
            nombredll: 'SER108-04',
            carpeta: 'SALUD'
        })
    }
}

function _infoCOON007_01() {
    console.log('consulta CON007_01')
    LLAMADO_DLL({
        dato: [$_SECUNUM],
        callback: _dataCON007_01,
        nombredll: 'CON007',
        carpeta: 'CONTAB'
    })
}

function _dataCON007_01(data) {
    console.debug(data, "CON007_01");
    var date = data.split("|");
    swinvalid = date[0];
    $_ULTFECHA = date[2];
    $_NUMEROCTL = date[3];
    console.log($_ULTFECHA, $_NUMEROCTL);
    if (swinvalid == "00") {
        if ($_NOVEDAD == "7") {
            $_NROW = $_NUMEROCTL;
            console.log($_NROW, 'numero consecutivo')
            _validarCON007_01();
        }
        else {
            $_NROW = parseInt($_NUMEROCTL) - 1;
            console.debug($_NRO_W, 'falta poner siguiente');
            _validarCON007_01();
        }
    } else if (swinvalid == "01") {
        _infoCON904_01();
        console.log('swinvalid 01')
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _validarCON007_01() {
    console.log('validarCON007_01')
    if ($_NOVEDAD == "7") {
        $_ANOLNK = $_FECHA_LNK.substring(0, 2);
        $_AÑOPACI_ING7411 = $_FECHA_ING_W;
        if (parseInt($_AÑOPACI_ING7411) > parseInt($_ANOLNK)) {
            CON851('37', '37', null, 'error', 'error');
        }
        else {
            $("#factura_108").val($_NUMEROCTL);
            $_LLAVEW = $_PREFIJOW + $_NROW;
            console.log($_LLAVEW, 'numero de factura')
            LLAMADO_DLL({
                dato: [$_LLAVEW],
                callback: _dataSER108_04,
                nombredll: 'SER108-04',
                carpeta: 'SALUD'
            })
        }
    }
}

function _dataSER108_04(data) {
    console.log(data, "SER108-04");
    var date = data.split("|");
    var comparar = date[0].trim();
    if (($_NOVEDAD == "7") && (comparar == "01")) {
        $_ESTADOW = "0"
        _nuevoregistro();
    }
    else if (($_NOVEDAD == "7") && (comparar == "00")) {
        $("#factura_108").val("");
        CON851('00', '00', null, 'error', 'error');
        _evaluarfactura();
    }
    else if (($_NOVEDAD == "8") && (comparar == "00")) {
        setTimeout(consultamostrardatos_SAL7411, 100);
        _evaluarconvenio_SAL7411();

    }
    else if (($_NOVEDAD == "8") && (comparar == "01")) {
        CON851('01', '01', null, 'error', 'error');
        $("#factura_108").val("");
        _evaluarfactura();
    }
    else if (($_NOVEDAD == "9") && (comparar == "01")) {
        CON851('01', '01', null, 'error', 'error');
        $("#factura_108").val("");
        _evaluarfactura();
    }
    else if (($_NOVEDAD == "9") && (comparar == "00")) {
        setTimeout(_retirarfactura_SAL7411, 100);

    }
}

function _nuevoregistro() {
    $("#estado_108").val('0');

    $_NROW = $("#factura_108").val();
    $_SWCREAR = "1";
    $_FECHASIST = moment().format('L');
    console.log($_FECHASIST, 'fechasistema')
    $_FECHA_ACT = moment().format('YY/MM/DD');
    console.log($_FECHA_ACT, 'fecha actual')
    $_ANOACT = $_FECHA_ACT.substring(0, 2);
    $_MESLNK = $_FECHA_LNK.substring(2, 4)
    if ((parseInt($_ANOLNK) < parseInt($_ANOACT)) && $_MESLNK == "12") {
        _infoSER108F_01();
    }
    else {
        _infoSER108F_01();
    }
}

function _infoSER108F_01() {
    console.log($_ANOLNK, $_LLAVEW, parseInt($_ANOLNK));
    let datos_envio = datosEnvio()
    datos_envio += $_ADMINW + '|' + parseInt($_ANOLNK) + '|' + $_LLAVEW
    console.debug(datos_envio);
    SolicitarDll({ datosh: datos_envio }, _datainfoSER108F_01, get_url('app/SALUD/SER108F.DLL'));
}
function _datainfoSER108F_01(data) {
    console.log(data, "SER108F");
    var date = data.split("|");
    var swinvalid = date[0];
    if (swinvalid < "00") {
        CON851(swinvalid, swinvalid, null, 'error', 'error');
        _toggleNav();
    }
    else {
        if (($_ADMINW == "GEBC") || ($_ADMINW == "ADMI") || ($_ADMINW == "VSC1") || ($_ADMINW == "CCAY") || ($_ADMINW == "AMBA")) {
            _evaluarnit_SAL7411();
        }
        else {
            if (($_NITUSU == "0830092718") || ($_NITUSU == "0900193162")) {
                _evaluarnit_SAL7411();
            }
            else {
                if ($_ESTADOW == "1") {
                    _evaluarhabitacion_SAL7411();
                }
                else {
                    _evaluarnit_SAL7411();
                }
            }
        }
    }
}

function _evaluarnit_SAL7411() {
    validarInputs({
        form: "#NIT_108",
        orden: "1"
    }, function () { _evaluarfactura(); },
        _validarnit
    )
}

function _validarnit() {
    $_SWTER = '0';
    $_NITW = $("#nit_108").val();
    $_NITW = $_NITW.padStart(10, "0");
    $("#nit_108").val($_NITW);

    if ($_NITW == '0') {
        _evaluarnit_SAL7411();
    } else {
        LLAMADO_DLL({
            dato: [$_NITW],
            callback: _dataSER108_05,
            nombredll: 'SER108-05',
            carpeta: 'SALUD'
        })
    }
}

function _dataSER108_05(data) {
    console.log(data, "dataSER108_05");
    var date = data.split("|");
    var swinvalid = date[0];
    $_DESCRIPTER = date[2];
    $_ACTTER = date[3];
    $_DESCRIPTER2 = date[4];
    $_CONVENIOTER = date[5];
    console.log($_CONVENIOTER, '$_CONVENIOTER')
    $_ZONATER = date[6];
    console.log($_ZONATER, '$_ZONA')
    $_NITTER = date[7];
    $_ENTIDADTER = date[8];
    console.log($_ENTIDADTER, 'ENTIDAD')
    $_NITCONTW = $_NITTER;
    if (swinvalid == "00") {
        $("#descrip_ter").val($_DESCRIPTER);
        if (($_DESCRIPW == '') || ($_NITW != $_NITNUM) || ($_NOVEDAD == "7")) {
            $_DESCRIPW = $_DESCRIPTER;
            console.log($_DESCRIPW, 'terceros');
            // _validarfacturaparticular();
            if ($_CONVENIOTER.trim() != '') {
                var $_CONVENIOW = $_CONVENIOTER;
                $("#convenio_108").val($_CONVENIOW);
                console.log($_CONVENIOW, "condicion 1")
                _validarfacturaparticular();
            }
            else if (($_ACTTER == "01") || ($_ACTTER == "25") || ($_ACTTER == "27") || ($_ACTTER == "30")) {
                console.log("condicion 2")
                $_DESCRIPTER2 = $_DESCRIPTER;
                $("#descrip_ter").val($_DESCRIPTER2);
                _validarfacturaparticular();
            }
            else {
                console.log("condicion 3");
                $_DESCRIPW = $_DESCRIPTER2;
                $_NOMBUSCARW = $_DESCRIPTER2;
                _validarfacturaparticular();
            }

        } else {
            console.log("condicion 2 novedad 8");
            _evaluarconvenio_SAL7411()

        }
    } else if (swinvalid == "01") {
        console.log('no encuentra terceros');
        if ($_SWTER == '0') {
            console.log('LLAMA PROGRAMA MAESTRO DE TERCEROS')
        } else {
            $("#descrip_ter").val('NO EXISTE TERCERO');
            _evaluarnit_SAL7411();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _validarfacturaparticular() {
    console.log('validar factura particular')
    if (($_PUCUSU == "4") || ($_PUCUSU == "6")) {
        if ($_NITW == "9999") {
            $_OPSEGU = "IS41PA";
            LLAMADO_DLL({
                dato: [$_OPSEGU],
                callback: _dataCON904_03,
                nombredll: 'CON904',
                carpeta: 'CONTAB'
            })
        }
    }
    else {
        _evaluarconvenio_SAL7411();
    }
}

function _dataCON904_03(data) {
    console.log(data, "CON904_03");
    date = data.split("|");
    if (date[4] == "00") {
        _evaluarconvenio_SAL7411();
    }
    else {
        _evaluarnit_SAL7411();
    }
}

function _evaluarconvenio_SAL7411() {
    console.log('evaluar convenio')
    validarInputs({
        form: "#CONVENIO_108",
        orden: "1"
    },
        function () { _evaluarnit_SAL7411(); },
        _validarconvenio
    )
}

function _validarconvenio() {
    console.log('valida convenio')
    $_CONVENIOW = $("#convenio_108").val();


    if ($_CONVENIOTER != $_CONVENIOW) {
        console.log('diferente')
        $_OPSEGU = "IS41F"
        LLAMADO_DLL({
            dato: [$_ADMINW, $_OPSEGU],
            callback: _dataCON904_04,
            nombredll: 'CON904',
            carpeta: 'CONTAB'
        })
    } else {
        console.log('consulta')
        consultaconvenio_SAL7411();
    }
}
function consultaconvenio_SAL7411() {
    console.log('consulta convenioo')
    LLAMADO_DLL({
        dato: [$_CONVENIOW],
        callback: _dataSER108_06,
        nombredll: 'SER108-06',
        carpeta: 'SALUD'
    });
}
function _dataCON904_04(data) {
    console.log(data, "CON904_04");
    date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {

        console.log('consulta 2 con904_04')
        consultaconvenio_SAL7411();
    }
    else {
        console.log("no tiene permisos")
        _evaluarconvenio_SAL7411();
    }
}
function _dataSER108_06(data) {
    console.log(data, "SER108_06");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    $_DESCRIPTAR = date[1].trim();
    if (swinvalid == "00") {
        $("#dconvenio_108").val($_DESCRIPTAR);
        _datoestado();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarconvenio_SAL7411();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function _datoestado() {
    console.log('datoestado')
    if ($_NOVEDAD == "7") {
        console.log('novedad 7')
        $_ESTADOW = "0";
        $("#estado_108").val("0 - ACTIVO");
        _mostrarestado_SAL7411();
    }
    if ($_ADMINW == "GEBC") {
        console.log('admin')
        _cambiarestado_SAL7411();
    }
    else {
        console.log('otro usuario')
        if (parseInt($_AÑOPACI_ING7411) > 1999) {
            console.log('entra')
            ventanaclave();
        }
    }
}

function _cambiarestado_SAL7411() {
    var estados = [
        { "COD": "0", "DESCRIP": "ACTIVO" },
        { "COD": "1", "DESCRIP": "INACTIVO" },
        { "COD": "2", "DESCRIP": "ANULADO" },
        { "COD": "3", "DESCRIP": "BLOQUEO" }
    ]
    POPUP({
        array: estados,
        titulo: 'ESTADO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluarconvenio_SAL7411
    },
        _evaluarcambiarestado_SAL7411);
}

function _evaluarcambiarestado_SAL7411(estados, ) {

    $_ESTADOW = estados.COD;
    switch (estados.COD) {
        case '0':
        case '1':
        case '2':
        case '3':
            console.log("var ir evaluar estado");
            _evaluarestado_SAL7411()
            break;
        default:
            _evaluarconvenio_SAL7411();
            break;
    }
    $("#estado_108").val(estados.COD + " - " + estados.DESCRIP);
}

function _evaluarestado_SAL7411() {

    console.log($_ESTADOW, "evaluar estado");

    if (($_NOVEDAD == "8") && ($_ESTADOW == "0") && (($_PREFIJOW == "P") || ($_PREFIJOW == "T"))) {
        console.log("estoy en la primer condicion condicion")
        _ventanaipsante();
    }
    else if (($_NITUSU == "0900147959") && ($_NOVEDAD == "8") && ($_ESTADONUM == "0") && ($_ESTADOW == "1")) {
        $_FACTURANUMW = $_LLAVENUM;

        if ($_NRO1NUMW == "9") {
            console.log("estoy en la segunda condicion condicion")
            _mostrarestado_SAL7411();
        }
        else {
            console.log("estoy en la tercera condicion condicion")
            CON851('14', '14', null, 'error', 'error');
            $_ESTADOW = $_ESTADONUM;
            _cambiarestado_SAL7411();
        }
    }
    else if (($_NITUSU == "0844001287") && ($_NOVEDAD == "8")) {
        $_OPERBLOQNUM = "GEBC";
        console.log("estoy en la cuarta condicion")
        _mostrarestado_SAL7411();
    }
    else if (($_NOVEDAD == "8") && ($_ESTADONUM == "1") && ($_OPERBLOQNUM != $_ADMINW)) {
        console.log("estoy en la quinta condicion")
        $_OPSEGU = "IS41B";
        LLAMADO_DLL({
            dato: [$_ADMINW, $_OPSEGU],
            callback: _dataCON904_05,
            nombredll: 'CON904',
            carpeta: 'CONTAB'
        })
    }
    else if (($_NITUSU == "0900147959") && ($_NOVEDAD == "8") && ($_ESTADONUM == "0") && ($_ESTADOW == "1")) {
        $_FACTURANUMW = $_LLAVENUM;
        if ($_NRO1NUMW == "9") {
            console.log("estoy en la sexta condicion")
            _mostrarestado_SAL7411();
        }
        else {
            console.log("estoy en la septima condicion")
            CON851('14', '14', null, 'error', 'error');
            $_ESTADOW = $_ESTADONUM;
            _cambiarestado_SAL7411();
        }
    }
    else if (($_NITUSU == "0832002436") && ($_NOVEDAD == "8") && (($_ESTADONUM == "1") || ($_ESTADONUM == "0")) && ($_ESTADOW == "2")) {
        CON851('14', '14', null, 'error', 'error');
        $_ESTADOW = $_ESTADONUM;
        if (($_ADMINW == "GEBC") || ($_ADMINW == "ADMI")) {
            console.log("estoy en la octava condicion")
            _mostrarestado_SAL7411();
        }
        else {
            _cambiarestado_SAL7411();
        }
    }
    else if (($_NOVEDAD == "8") && ($_ESTADOW != $_ESTADONUM) && (parseInt($_AÑOPACI_RET7411) > 0)) {
        if (($_ANOALFA != $_AÑOPACI_RET7411) || ($_MESLNK != $_MESPACI_RET7411)) {
            CON851('91', '91', null, 'error', 'error');
            if (($_MESLNK == "01") || ($_ADMINW == "GEBC") || ($_ADMINW == "ADMIN") || (($_ADMINW == "JAPV"))) {
                console.log("estoy en la novena condicion")
                _mostrarestado_SAL7411();
            }
            else {
                $_ESTADOW = $_ESTADONUM;
                _cambiarestado_SAL7411()
            }
        }
    }
    else if (($_ESTADOW == "0") || ($_ESTADOW == "1") || ($_ESTADOW == "2") || ($_ESTADOW == "3")) {
        console.log("estoy en la decima condicion")
        _mostrarestado_SAL7411();
    }

    else if (($_ESTADONUM != "1") && ($_ESTADOW == "1")) {
        CON851('1B', '1B', null, 'error', 'error');
        if (($_ADMINW == "GEBC") || ($_ADMINW == "ADMI") || ($_ADMINW == "JAPV")) {
            console.log("estoy en la onceaba condicion")
            _cambiarestado_SAL7411();
        }
        else {
            $_ESTADOW = $_ESTADONUM;
            _evaluarfactura();
        }
    }
    else if (($_ESTADONUM == "1") && ($_ESTADOW != "1")) {
        console.log("estoy en la doceaba condicion")
        $_OPSEGU = "IS410";
        LLAMADO_DLL({
            dato: [$_ADMINW, $_OPSEGU],
            callback: _dataCON904_06,
            nombredll: 'CON904',
            carpeta: 'CONTAB'
        })
    }
    else {
        _mostrarestado_SAL7411();
        // if (($_NOVEDAD == '8') && ($_ESTADOW == '0') && (($_PREFIJOW == 'P') || ($_PREFIJOW == 'T'))) {
        //     _ventanaipsante();
        // } else {
        //     _mostrarestado_SAL7411();
        // }
        // if (($_NOVEDAD == "8") && ($_ESTADOW == "1") && (($_ESTADONUM == "0") || ($_ESTADONUM == "2"))) {
        //     if (($_ADMINW == "GEBC") || ($_ADMINW == "ADMI") || ($_ADMINW == "JAPV")) {
        //         console.log("estoy en la septima condicion")
        //         _mostrarestado_SAL7411();
        //     }
        //     else {
        //         CON851('14', '14', null, 'error', 'error');
        //         $_ESTADOW = $_ESTADONUM;
        //         _cambiarestado_SAL7411();
        //     }
        // }
        // else if ($_NITUSU != "0900147959") {
        //     ///REVISAR ESTA CONDICION 
        //     if (($_ESTADOW == "1") && ($_ESTADONUM != "1")) {
        //         if (($_ADMINW == "GEBC") || ($_ADMINW == "JAPV")) {
        //             console.log("estoy en la tercera condicion")
        //             _mostrarestado_SAL7411();
        //         }
        //         else {
        //             CON851('14', '14', null, 'error', 'error');
        //             $_ESTADOW = $_ESTADONUM;
        //             _cambiarestado_SAL7411();
        //         }
        //     }
        // }
        // else {
        //     _datoestado();
        // }
    }
}

function _dataCON904_05(data) {
    console.log(data, "CON904_05");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _mostrarestado_SAL7411();
    }
    else {
        _evaluarfactura();
    }
}
function _dataCON904_06(data) {
    console.log(data, "CON904_06");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _mostrarestado_SAL7411();
    }
    else {
        _evaluarfactura();
    }
}

function _mostrarestado_SAL7411() {
    console.log('mostrarestado', $_PREFIJOW)
    if (($_NOVEDAD == "7") && (($_PREFIJOW == 'P') || ($_PREFIJOW == 'T'))) {
        console.log('va ir venta ips')
        _ventanaipsante();
    }
    else {
        console.log('digue evaluar retencion')
        _evaluarretencion();
    }
}

function _evaluarretencion() {
    console.log('evalua retencion')
    if ($_NITUSU == "0844002258") {
        _evaluarretetncion();
    }
    else {
        $_PORCRETENCW = "00";
        $("#retencion_108").val($_PORCRETENCW);
        _datopic_SAL7411();
    }
}
function _evaluarretetncion() {
    validarInputs({
        form: "#RETENCION_108",
        orden: "1"
    }, function () { _evaluarconvenio_SAL7411(); },
        _validarretencion_SAL7411
    )
}

function _validarretencion_SAL7411() {
    $_PORCRETENCW = $("#retencion_108").val();
    _evaluarconvenio_SAL7411();
}
function _datopic_SAL7411() {
    console.log('datopic')
    if (($_NITUSU == "0844001287") && ($_ACTTER == "31")) {
        console.log('primera codicion')
        _evaluardatopic();
    }
    else {
        console.log('segunda condicion')
        $_CTAPICW = " ";
        _dato1p_SAL7411();
        // _evaluarpaciente_SAL7411();
    }
}
function _evaluardatopic() {
    validarInputs({
        form: "#PIC_108",
        orden: "1"
    }, function () { _evaluarconvenio_SAL7411(); },
        _validardatopic
    )
}
function _validardatopic() {
    $_CTAPICW = $("#pic_108").val();
    var numero = parseInt($_CTAPICW);

    if (numero == 0) {
        CON851('02', '02', null, 'error', 'error');
        _evaluardatopic();
    }
    else {
        _dato1p_SAL7411();
        // _evaluarpaciente_SAL7411();
    }
}
function _dato1p_SAL7411() {
    console.log('llega a dato1p', $_PREFIJOW, $_NITUSU)
    $_SWPAC = '0';
    if ($_NOVEDAD == '7') {
        console.log('primer codicion')
        if ((($_PREFIJOW == 'P') || ($_PREFIJOW == 'T')) || ($_NITUSU == '0800251482')) {
            console.log('primera primera')
            _evaluarpaciente_SAL7411();
        } else {
            $_IDPACW = '1';
            console.log('segunda primera')
            _evaluarpaciente_SAL7411();
        }
    } else if (($_NOVEDAD == '7') && ($_IDPACW.trim() == ' ') && ($_PACILNK != ' ')) {
        console.log('segundo codicion')
        $_IDPACW = $_PACILNK;
        _evaluarpaciente_SAL7411();
    } else if (($_NOVEDAD == '8') && (($_PREFIJOW == 'P') || ($_PREFIJOW == 'T'))) {
        console.log('tercero codicion')
        $_IDPACW2 = $_IDPACW;
        _evaluarpaciente_SAL7411();
    } else if (($_NITUSU == '0844003225') || ($_NITUSU == '0800037021') && (($_PREFIJOW == 'P') || ($_PREFIJOW == 'T')) && ($_NOVEDAD == '7') && ($_PACI2W != ' ')) {
        console.log('cuarta codicion')
        $_IDPACW = $_PACI2W;
        _evaluarpaciente_SAL7411();
    } else {
        console.log('quinta codicion')
        _evaluarpaciente_SAL7411();
    }
}

function _evaluarpaciente_SAL7411() {
    console.log('evaluar paciente')
    validarInputs({
        form: "#PACIENTE_108",
        orden: "1"
    }, function () { _evaluarconvenio_SAL7411(); },
        _validarpaciente_SAL7411
    )
}
function _validarpaciente_SAL7411() {
    console.log('validarpaciente')
    $_NROCOMP = ' ';
    $_IDPACW = $("#idpaciente_108").val();
    // $_IDPACW = $_IDPACW.padStart(15, "0");

    if (($_PREFIJOW == 'P') || ($_PREFIJOW == 'T')) {
        if ($_IDPACW == $_IDPACW2) {
            _leerpaciente_SAL7411();
        } else {
            LLAMADO_DLL({
                dato: [$_LLAVEW, $_NROCOMP],
                callback: _dataSER835MO_01,
                nombredll: 'SER835MO',
                carpeta: 'SALUD'
            })
        }
    } else {
        if (($_IDPACW == '000000000000000') || ($_IDPACW.trim() == ' ')) {
            _dato1p_SAL7411();
        } else {
            _leerpaciente_SAL7411();
        }
    }
}

function _dataSER835MO_01(data) {
    console.log(data, 'SER835MO');
    var date = data.split('|');
    $_NROCOMPW = date[1].trim();
    if ($_NROCOMPW > '0000') {
        CON851('7P', '7P', null, 'error', 'error');
        _leerpaciente_SAL7411();
    }
    else if ($_NROCOMPW < '0000') {
        _leerpaciente_SAL7411();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }

}

function _leerpaciente_SAL7411() {
    console.log('leerpaciente')
    if (($_PREFIJOW == "T") && ($_IDPACW == "000000000000001")) {
        console.log("T", "y 000000001");
        if ($_NITUSU == "0830092719") {

            LLAMADO_DLL({
                dato: [$_IDPACW],
                callback: _dataSER108_07,
                nombredll: 'SER108-07',
                carpeta: 'SALUD'
            })
        }
        else {
            CON851('03', '03', null, 'error', 'error');
            _evaluardatopic();
        }
    }
    else {

        LLAMADO_DLL({
            dato: [$_IDPACW],
            callback: _dataSER108_07,
            nombredll: 'SER108-07',
            carpeta: 'SALUD'
        })
    }
}

function _dataSER108_07(data) {
    console.log(data, "SER108-07");
    var date = data.split("|");
    var swinvalid = date[0];
    $_DERECHOPACI = date[1];
    $_NACIMPACI = date[2];
    console.log($_NACIMPACI, 'FECHA NAC')
    $_EPSPACI = date[3];
    $_DESCRIPPACIW = date[4].trim();
    if (swinvalid == "00") {
        if (($_NITUSU == '0800037021') && ($_PREFIJOW == 'A')) {
            $_OPSEGU = "IS767";
            LLAMADO_DLL({
                dato: [$_ADMINW, $_OPSEGU],
                callback: _dataCON904S_02,
                nombredll: 'CON904S',
                carpeta: 'CONTAB'
            })
        } else {
            _validandoleerpaciente();
        }
    }
    else if (swinvalid == "01") {
        if ($_SWPAC = '0') {
            $_SWPAC = '1';
            console.log('LLAMA OPC SER110C MAESTRO DE PACIENTES')
            _validandoleerpaciente();
        } else {
            CON851('01', '01', null, 'error', 'error');
            _dato1p_SAL7411();
        }
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _dataCON904S_02(data) {
    console.log(data, "CON904S_02");
    var date = data.split("|");
    var swinvalid = date[3];
    if (swinvalid == "00") {
        console.log('LLAMA OPC SER110C MAESTRO DE PACIENTES')
        _validandoleerpaciente();
    }
    else {
        // CON851(); VER QUE ERROR ENVIAR EN CASO DE .....
    }
}

function _validandoleerpaciente() {
    console.log("validandoleerpaciente", $_NITUSU);
    console.log('prefijo', $_PREFIJOUSU)
    // console.log('entidadter', $_ENTIDADTER)
    console.log('eps', $_EPSPACI)
    $("#nombrepac_108").val($_DESCRIPPACIW);
    _calcularedad_7411();
    $("#edad_108").val($_EDADPACW);

    if (($_NITUSU == "0800162035") && ($_DERECHOPACI == "2")) {
        CON851('80', '80', null, 'error', 'error');
        _buscarfacturarepetida();
    }
    else if (($_NITUSU == "0800162035") && ($_PREFIJOUSU == "01") && ($_PREFIJOW == "P") && (($_NITW != "222222222") || ($_NITW != "9999"))) {
        console.log('validaentidad prefijo p ')
        if ($_ENTIDADTER.trim() != $_EPSPACI.trim()) {
            if ($_ENTIDADTER == '9999') {
                _buscarfacturarepetida();
            } else {
                CON851('9S', '9S', null, 'error', 'error');
                if (($_ADMINW == "YPCL") || ($_ADMINW == "ADMI") || ($_ADMINW == "GEBC")) {
                    _buscarfacturarepetida();
                } else {
                    // _dato1p_SAL7411();
                    _buscarfacturarepetida();
                }
            }
        } else {
            _buscarfacturarepetida();
        }
    }
    else {
        _buscarfacturarepetida();
    }
}

function _buscarfacturarepetida() {
    console.log("buscarfacturarepetida")
    if (($_NITUSU == "0845000038") || ($_NITUSU == "0900541158")) {
        _datotipof();
    }
    else {
        if ((($_NITUSU == "0900471031") || ($_NITUSU == "900004059")) && ($_NOVEDAD == "7") && ($_PREFIJOW == "A")) {
            // $_FECHABUSQ = moment().format('L');
            // $_MESBUSQ = $_FECHABUSQ.substring(3, 5);
            // $_ANOBUSQ = $_FECHABUSQ.substring(6, 10);
            $_FECHABUSQ = moment().format('YYMMDD');
            console.log($_FECHABUSQ, '$_FECHABUSQ2');
            $_MESBUSQ = $_FECHABUSQ.substring(2, 4);
            $_ANOBUSQ = $_FECHABUSQ.substring(4, 6);
            if (parseInt($_MESBUSQ) > 1) {
                $_MESBUSQ = parseInt($_MESBUSQ) - 1;
                _datotipof();
            } else if ($_IDPACW != "000000000000001") {
                LLAMADO_DLL({
                    dato: [$_IDPACW, $_FECHABUSQ, $_LLAVEW],
                    callback: _dataSER836_01,
                    nombredll: 'SER836C',
                    carpeta: 'SALUD'
                })
            } else {
                if (parseInt($_MESBUSQ) == "01") {
                    _datotipof();
                }
                else {
                    $_MESBUSQ = "12";
                    $_ANOBUSQ = parseInt($_ANOBUSQ);
                    _datotipof();
                }
            }
        }
        else if (($_NOVEDAD == "7") && (($_PREFIJOW == "P") || ($_PREFIJOW == "T"))) {

            $_FECHABUSQ = moment().format('YYMMDD');
            console.log($_FECHABUSQ, '$_FECHABUSQ2');
            $_MESBUSQ = $_FECHABUSQ.substring(2, 4);
            $_ANOBUSQ = $_FECHABUSQ.substring(4, 6);
            if (parseInt($_MESBUSQ > 1)) {
                $_MESBUSQ = parseInt($_MESBUSQ) - 1;
                _datotipof();

            } else if ($_IDPACW != "000000000000001") {
                LLAMADO_DLL({
                    dato: [$_IDPACW, $_FECHABUSQ, $_LLAVEW],
                    callback: _dataSER836_02,
                    nombredll: 'SER836C',
                    carpeta: 'SALUD'
                })
            }
            else {
                if ($_MESBUSQ == "01") {
                    _datotipof();
                }
                else {
                    $_MESBUSQ = "12";
                    SUSTRAER = $_ANOBUSQ - 1;
                    _datotipof();
                }
            }

        }
        else if (($_NITUSU == "0800251482") && ($_NOVEDAD == "7") && (($_PREFIJOW == "A") || ($_PREFIJOW == "P"))) {
            // $_FECHABUSQ = moment().format('L');
            $_FECHABUSQ = moment().format('YYMMDD');
            _MESBUSQ = $_FECHABUSQ.substring(2, 4);
            // $_MESBUSQ = $_FECHABUSQ.substring(3, 5);
            $_DIABUSQ = "05";
            LLAMADO_DLL({
                dato: [$_IDPACW, $_FECHABUSQ, $_LLAVEW],
                callback: _dataSER836_03,
                nombredll: 'SER836C',
                carpeta: 'SALUD'
            })
        }
        else {
            _datotipof();
        }

    }
}

function _dataSER836_01(data) {
    console.log(data, "SER836-01");
    var date = data.split("|");
    var swinvalid = date[0];
    $_FACTP = date[1];
    if (swinvalid == "00") {
        if ($_FACTP.trim() == '') {
            console.log('imprime en pantalla')
            // DISPLAY SPACES LINE 32 POSITION 02
            _datotipof();
        }
        else {
            CON851('1K', '1K', null, 'error', 'error');
            console.log('imprime en pantalla')
            _datotipof();

        }
    } else if (swinvalid == "01") {
        console.log('01')
        _evaluarpaciente_SAL7411()
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _dataSER836_02(data) {
    console.log(data, "SER836C-02");
    var date = data.split("|");
    var swinvalid = date[0];
    console.log(swinvalid, 'swinvalid')
    $_FACTP = date[1];
    console.log($_FACTP, '$_FACTP')
    if (swinvalid == "00") {
        console.log('00')
        if ($_FACTP.trim() == '') {
            console.log('imprime en pantalla')
            // DISPLAY SPACES LINE 32 POSITION 02
            _datotipof();
        }
        else {
            CON851('1K', '1K', null, 'error', 'error');
            $_OPSEGU = "IS41Q";
            LLAMADO_DLL({
                dato: [$_ADMINW, $_OPSEGU],
                callback: _dataCON904_07,
                nombredll: 'CON904',
                carpeta: 'CONTAB'
            })
        }
    } else if (swinvalid == "01") {
        console.log('01')
        _evaluarpaciente_SAL7411()
    } else {
        console.log('error dll ')
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _dataSER836_03(data) {
    console.log(data, "SER836-03");
    var date = data.split("|");
    var swinvalid = date[0];
    $_FACTP = date[1];
    if (swinvalid == "00") {
        if ($_FACTP.trim() == "") {
            console.log('imprime en pantalla')
            // DISPLAY SPACES LINE 32 POSITION 02
        }
        else {
            // DISPLAY LINE 32 POSOTION 02 
            console.log('imprime en pantalla')
            CON851('1K', '1K', null, 'error', 'error');
            // _dato1p_SAL7411
            _evaluarpaciente_SAL7411();
        }
    } else if (swinvalid == "01") {
        console.log('01')
        _evaluarpaciente_SAL7411()
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
        // CON851() MIRAR QUE ERROR COLOCAR
    }
}
function _dataCON904_07(data) {
    console.log(data);
    var date = data.split("|");
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _datotipof();
    }
    else {
        if ((($_NITUSU == '0800162035') && ($_PREFIJOUSU == '08')) || ($_NITUSU == '0892000401')) {
            _datotipof();
        } else {
            // _dato1p_SAL7411
            _evaluarpaciente_SAL7411();
        }
    }
}


function _datotipof() {
    console.log('datotipofact')
    if ($_NITUSU != "0900004059") {
        _dato2p();
    }
    else {
        var tipofacw = [
            { "COD": "1", "DESCRIP": "EVENTO" },
            { "COD": "2", "DESCRIP": "CAPITA" }
        ]
        POPUP({
            array: tipofacw,
            titulo: 'CONSULTA TIPOS DE FACTURA',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: _evaluarpaciente_SAL7411
        },
            _evaluartipofacs);
    }
}
function _evaluartipofacs(tipofacw) {
    $_TIPOFACTW = tipofacw.COD;
    switch (tipofacw.COD) {
        case '1':
        case '2':
            _dato2p();
            break;
        default:
            $("#idpaciente_108").val("");
            $("#nombrepac_108").val("");
            _evaluarpaciente_SAL7411();
            break;
    }
}

function _dato2p() {
    console.log('dato2p')
    // LINEA 1355
    // $_TIPOFACTW = " ";
    _evaluarhabitacion_SAL7411();
}

function _evaluarhabitacion_SAL7411() {
    validarInputs({
        form: "#HABIT_108",
        orden: "1"
    },
        function () { _evaluarpaciente_SAL7411(); },
        _validarhabw
    )
}
function _validarhabw() {

    $_HABW = $("#habit_108").val();

    var habw = $_HABW.trim().toUpperCase();
    console.log('validarhabi', habw);

    if ((habw.trim() == '') && ($_PREFIJOW == "P")) {
        console.log('1');
        CON851('02', '02', null, 'error', 'error');
        _evaluarhabitacion_SAL7411();
    }
    else if (habw.trim() == '') {
        console.log('2');
        $_HABW = '';
        $_DESCRIPCAM = '';
        _evaluarporcent_SAL7411()
    } else if (habw.length > 000) {
        if (habw == 'SIN') {
            console.log('3');
            $_HABW = 'SIN';
            $_DESCRIPCAM = '';
            _evaluarporcent_SAL7411()
        }
        else {
            console.log('3-1');

            LLAMADO_DLL({
                dato: [$_HABW],
                callback: _dataSER108_08,
                nombredll: 'SER108-08',
                carpeta: 'SALUD'
            });
        }
    }
}
function _dataSER108_08(data) {
    console.log(data, "SER108-08");
    var date = data.split("|");
    var swinvalid = date[0].trim();
    $_ESTADOCAM = date[1];
    if (swinvalid == "00") {
        if (($_NOVEDAD == '7') && ($_ESTADOCAM > '0')) {
            CON851('1F', '1F', null, 'error', 'error');
            _evaluarhabitacion_SAL7411();
        } else {
            _evaluarporcent_SAL7411();
        }
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarhabitacion_SAL7411();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarporcent_SAL7411() {
    validarInputs({
        form: "#PORCENT_108",
        orden: "1"
    },
        function () { _evaluarhabitacion_SAL7411(); },
        _validarporcent_SAL7411
    )
}

function _validarporcent_SAL7411() {
    console.debug('validar porcentaje');
    $_PORCENCOPAGOW = vlrcopago_7411Mask.unmaskedValue;

    if ($_PORCENCOPAGOW == '') {
        console.debug('porcentaje 1');
        vlrcopago_7411Mask.unmaskedValue = '0';
        _evaluarfechaingw_SAL7411();
    } else if ($_NOVEDAD == '8') {

        _evaluarfechasalida_7411();

    } else {
        console.debug('porcentaje 2');
        _evaluarfechaingw_SAL7411();
    }
}

function _evaluarfechaingw_SAL7411() {
    momentMaskfechaingreso.updateValue();
    validarInputs({
        form: "#FECHAING_108",
        orden: "1"
    },
        function () { _evaluarporcent_SAL7411(); },
        validar_fechaing_7411
    )
}

function validar_fechaing_7411() {
    console.debug('validar_fecha');

    $_FECHAINGNUM = momentMaskfechaingreso.unmaskedValue;

    if (($_NOVEDAD == '7') && (($_FECHAINGNUM == '00000000') || ($_FECHAINGNUM.trim() == ''))) {
        console.debug('INGRESO 2 - 1');

        $_FECHAINGNUM = moment().format("YYYYMMDD");
        $_AÑOPACI_ING7411 = $_FECHAINGNUM.substring(0, 4);
        $_MESPACI_ING7411 = $_FECHAINGNUM.substring(4, 6);
        $_DIAPACI_ING7411 = $_FECHAINGNUM.substring(6, 8);
        $_HORAINGNUMW = moment().format('HHmm');
        $_HORAPACI_ING7411 = $_HORAINGNUMW.substring(0, 2);
        $_MINPACI_ING7411 = $_HORAINGNUMW.substring(2, 4);

        $_FECHAINGSISTEMA = $_AÑOPACI_ING7411 + '/' + $_MESPACI_ING7411 + '/' + $_DIAPACI_ING7411 + ' ' + $_HORAPACI_ING7411 + ':' + $_MINPACI_ING7411;
        $("#fechaing_108").val($_FECHAINGSISTEMA);
        _evaluarfechasalida_7411();

    } else if ($_ESTADONUM == "1") {
        console.debug('INGRESO 2-2');
        if (($_ADMINW == "GEBC") || ($_ADMINW == "ADMI")) {
            _evaluarfechaingw_SAL7411();
        } else {
            _evaluarservicio_SAL7411();
        }
    }
    // else {
    //     console.debug('INGRESO 3');
    //     _evaluarfechasalida_7411();
    // } 

}

function _evaluarfechasalida_7411() {

    momentMaskfechasalida.updateValue();
    validarInputs({
        form: "#FECHASAL_108",
        orden: "1"
    },
        function () { _evaluarfechaingw_SAL7411(); },
        _validarfechasalida_7411
    )
}
function _validarfechasalida_7411() {
    $_FECHASALNUME = momentMaskfechasalida.unmaskedValue;
    $_FECHASALNUM = $_FECHASALNUME.substring(0, 6);
    $_HORAPACI_RET7411 = $_FECHASALNUME.substring(6, 10);
    console.log($_FECHASALNUM, ' $_FECHASALNUM')
    if ($_FECHASALNUM.trim() == '') {
        $_FECHASALNUM = '0000/00/00';
        $_HORASALW = '00:00';
        $("#fechasal_108").val($_FECHASALNUM + ' ' + $_HORASALW);
        _evaluarservicio_SAL7411();
    } else {
        _evaluarservicio_SAL7411();
    }
}
function _evaluarservicio_SAL7411() {
    validarInputs({
        form: "#SERVICIO_108",
        orden: "1"
    },
        function () { _evaluarporcent_SAL7411(); },
        _validarservicio_SAL7411
    )
}
function _validarservicio_SAL7411() {

    $_SERVICIOW = $("#servicio_108").val();

    if ((($_PREFIJOW == "P") || ($_PREFIJOW == "T")) && (($_SERVICIOW == "00") || ($_SERVICIOW.trim() == ""))) {
        CON851('02', '02', null, 'error', 'error');
        $("#servicio_108").val("");
        _evaluarservicio_SAL7411();
    }
    else if (($_SERVICIOW == "00") || ($_SERVICIOW.trim() == "")) {
        if ($_SERVICIOW == "00") {
            $_SERVICIOW = "00";
            $_DESCRIPSERHO = "NO APLICA";
            $("#servicio_108").val($_SERVICIOW + "-" + $_DESCRIPSERHO);
            _evaluarcontrato();
        }
        else {
            $_SERVICIOW = "00";
            $_DESCRIPSERHO = "NO APLICA";
            $("#servicio_108").val($_SERVICIOW + "-" + $_DESCRIPSERHO);
            _evaluarcontrato();;
        }
    }
    else {
        console.log("llamando dll");

        LLAMADO_DLL({
            dato: [$_SERVICIOW],
            callback: _dataSER108_09,
            nombredll: 'SER108-09',
            carpeta: 'SALUD'
        });
    }
}


function _dataSER108_09(data) {
    console.log(data, "SER108-09");
    var date = data.split("|");
    var swinvalid = date[0];
    $_DESCRIPSERHO = date[1].trim();
    if (swinvalid == "00") {
        $("#servicio_108").val($_SERVICIOW + "-" + $_DESCRIPSERHO);
        if (($_NITUSU == "0800037979") && (($_PREFIJOW == "A") || ($_PREFIJOW == "B") || ($_PREFIJOW == "D") || ($_PREFIJOW == "F") || ($_PREFIJOW == "G") || ($_PREFIJOW == "H") || ($_PREFIJOW == "I") || ($_PREFIJOW == "J") || ($_PREFIJOW == "K") || ($_PREFIJOW == "L") || ($_PREFIJOW == "M") || ($_PREFIJOW == "O") || ($_PREFIJOW == "Q") || ($_PREFIJOW == "R") || ($_PREFIJOW == "S") || ($_PREFIJOW == "W") || ($_PREFIJOW == "X") || ($_PREFIJOW == "Y") || ($_PREFIJOW == "Z"))) {
            $_CONTRATOW = $_REFER1ATER;
            $("#contrato_108").val($_CONTRATOW);
            _evaluarcontrato()

        } else {
            _evaluarcontrato()

        }

    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarservicio_SAL7411();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluarcontrato() {
    validarInputs({
        form: "#CONTRATO_108",
        orden: "1"
    },
        function () { _evaluarservicio_SAL7411(); },
        _validarcontrato
    )
}
function _validarcontrato() {
    $_CONTRATOW = $("#contrato_108").val();
    if ((($_PUCUSU == "4") || ($_PUCUSU == "6")) && ($_ACTTER == "31") && ($_CONTRATOW.trim() == "")) {
        CON851('02', '02', null, 'error', 'error');
        _evaluarcontrato();
    }
    else {
        if ($_ZONATER == "01") {
            $_FACTCAPITW = "";
            _evaluarcosto_SAL7411();
        }
        else {
            _evaluarprecapit_SAL7411();
        }
    }
}

function _evaluarprecapit_SAL7411() {
    validarInputs({
        form: "#PRECAPIT_108",
        orden: "1"
    },
        function () { _evaluarcontrato(); },
        _validarprecapit
    )
}
function _validarprecapit() {

    $_PRECAPITW = $("#precapit_108").val();

    if ($_PRECAPITW == 'A') {
        _evaluarnrocapit_SAL7411();

    } else if ($_PRECAPITW.trim() == "") {
        $_NROCAPITW = "";
        $("#capit_108").val($_NROCAPITW);
        if (($_NITUSU == "000162035") && (($_NITW == "0830006405") || ($_NITUSU == "0830003565") || ($_NITUSU == "0860525150"))) {
            CON851('02', '02', null, 'error', 'error');
            // _evaluarprecapit_SAL7411();
            _evaluarprecapit_SAL7411();
        }
        else {
            _evaluarcosto_SAL7411();
        }
    }
    else if (($_ZONATER == "02") && ($_PRECAPITW.trim() == "")) {
        CON851('02', '02', null, 'error', 'error');
        _evaluarprecapit_SAL7411();
    } else {
        _evaluarprecapit_SAL7411();
    }
}

function _evaluarnrocapit_SAL7411() {
    validarInputs({
        form: "#CAPIT_108",
        orden: "1"
    },
        function () { _evaluarcontrato(); },
        _validarnrocapit
    )
}
function _validarnrocapit() {
    $_NROCAPITW = $("#capit_108").val();

    if (parseInt($_NROCAPITW) == 0) {
        $("#capit_108").val("");
        _evaluarnrocapit_SAL7411();
    }
    else if ($_NROCAPITW == $_LLAVEW) {
        _evaluardatored_SAL7411();
    }
    else {
        LLAMADO_DLL({
            dato: [$_SERVICIOW],
            callback: _dataSER108C_01,
            nombredll: 'SER108C',
            carpeta: 'SALUD'
        });
    }
}
function _dataSER108C_01(data) {
    console.log(data, "SER108C-01");
    var date = data.split("|");
    var swinvalid = date[0];
    if (swinvalid == "00") {
        if (($_PREFIJOW == "P") || ($_PREFIJOW == "T")) {
            $_REDEXTERW = "N";
            $("#redext_108").val($_REDEXTERW);
            _evaluardiv_SAL7411();
        }
        if (parseInt($_NROCAPITW) > 0) {
            _evaluardatored_SAL7411();
        }
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarnrocapit_SAL7411();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluardatored_SAL7411() {
    validarInputs({
        form: "#RED_108",
        orden: "1"
    },
        function () { _evaluarprecapit_SAL7411(); },
        _validarred
    )
}
function _validarred() {
    $_REDEXTERW = $("#redext_108").val();
    if (($_REDEXTERW == 'S') || ($_REDEXTERW == 'N')) {

        if (($_NITUSU == "0800162035") && (($_ADMINW == "MILE") || ($_NITUSU == "YPCL"))) {
            _evaluarcosto_SAL7411();

        }
        else {
            if (($_REDEXTERW == "S") && ($_NITUSU == "0800162035") && ($_NOVEDAD == "7")) {
                $_SECUNUM = "9x"
                LLAMADO_DLL({
                    dato: [$_SECUNUM],
                    callback: _dataCON007_02,
                    nombredll: 'CON007',
                    carpeta: 'CONTAB'
                });
            }
        }
    } else {
        _evaluardatored_SAL7411();
    }
}
function _dataCON007_02(data) {
    console.log(data, "CON007-02");
    var date = data.split("|");
    var NUMEROCTL = date[4];
    if ($_NOVEDAD == "7") {
        var $_NROW = NUMEROCTL;
        $("#capit_108").val($_NROW);
        _evaluarcosto_SAL7411();
    }
    else {
        var $_NROW = parseInt(NUMEROCTL) - 1;
        console.log($_NROW);
        $("#capit_108").val($_NROW);
        _evaluarcosto_SAL7411();
    }
}

function _evaluarcosto_SAL7411() {
    console.log('evaluarcosto')
    validarInputs({
        form: "#COSTOS_108",
        orden: "1"
    },
        function () { _evaluarcontrato(); },
        _validarcostos
    )
}

function _validarcostos() {
    console.log('validarcosto')
    $_CCOSTOW = $("#costos_108").val();
    if (($_NITUSU == "0844004197") || ($_NITUSU == "0900198903") || ($_NITUSU == "0892001990") || ($_NITUSU == "0845000038") || ($_NITUSU == "0800251482") || ($_NITUSU == "0900565371") || ($_NITUSU == "0900658867") || ($_NITUSU == "0900566047") || ($_NITUSU == "0900541158") || ($_NITUSU == "0900471031")) {
        _consultarcosto_SAL7411();
    }
    else {
        $_CCOSTOW = "0000";
        $("#costos_108").val($_CCOSTOW);
        _evaluardiv_SAL7411();
    }
}

function _consultarcosto_SAL7411() {
    LLAMADO_DLL({
        dato: [$_CCOSTOW],
        callback: _dataSER108_10,
        nombredll: 'SER108-10',
        carpeta: 'SALUD'
    });
}

function _dataSER108_10(data) {
    console.log(data, "SER108-10");
    var date = data.split("|");
    var swinvalid = date[0];
    $_DESCRIPCOSTOS = date[1].trim();
    if (swinvalid == "00") {
        $("#costos_108").val($_CCOSTOW + "-" + $_DESCRIPCOSTOS);
        _evaluardiv_SAL7411();

    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarcosto_SAL7411()
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluardiv_SAL7411() {
    console.log('evaluar division')
    validarInputs({
        form: "#DIVISION_108",
        orden: "1"
    },
        function () { _evaluarcontrato(); },
        _validardiv_SAL7411
    )
}
function _validardiv_SAL7411() {
    console.log('validar division')
    $_DIVISIONW = $("#division_108").val();
    if ($_DIVISIONW.trim() == "") {
        _formadepago();
    }
    else {
        LLAMADO_DLL({
            dato: [$_DIVISIONW],
            callback: _dataSER108_11,
            nombredll: 'SER108-11',
            carpeta: 'SALUD'
        });
    }
}
function _dataSER108_11(data) {
    console.log(data, "SER108-11");
    var date = data.split("|");
    var swinvalid = date[0];
    if (swinvalid == "00") {
        _formadepago();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluardiv_SAL7411();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _formadepago() {
    var formasdepago = [
        { "COD": "1", "DESCRIP": "ACEPTA COPAGO" },
        { "COD": "2", "DESCRIP": "NO ACEPT COPAGO" },
        { "COD": "3", "DESCRIP": "COPAGO INGRESO" },
        { "COD": "4", "DESCRIP": "COPAGO PGP" }
    ]
    POPUP({
        array: formasdepago,
        titulo: 'Forma de Pago',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluardiv_SAL7411
    },
        _evaluarformadepago_108);
}

function _evaluarformadepago_108(formasdepago) {
    $_FORMACOPAGW = formasdepago.COD;
    switch (formasdepago.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
            $("#envio_108").val('000000');
            _evaluarobservacion_SAL7411();
            break;
        default:
            _evaluardiv_SAL7411();
            break;
    }
    $('#formadepago_108').val(formasdepago.COD + ' - ' + formasdepago.DESCRIP);
}

function _evaluarenvio_SAL7411() {
    validarInputs({
        form: "#ENVIO_108",
        orden: "1"
    },
        function () { _evaluarobservacion_SAL7411(); },
        _evaluardiv_SAL7411
    )
}

function _evaluarobservacion_SAL7411() {
    console.log('evaluarobservacion')
    $_ENVIOW = $("#envio_108").val();

    validarInputs({
        form: "#OBSERVACION_108",
        orden: "1"
    },
        function () { _evaluarcontrato(); },
        _evaluarcontrolcap
    )
}

function _evaluarcontrolcap() {
    console.log('evaluar control cap')
    if ($_NOVEDAD == '7') {
        $("#ctrlcont_108").val('0');
        $_OBSERVW = $("#observacion_108").val();
    } else {
        $_OBSERVW = $("#observacion_108").val();
    }
    validarInputs({
        form: "#CTRLCONT_108",
        orden: "1"
    },
        function () { _evaluarcontrato(); },
        _validarcontrolcap
    )
}
function _validarcontrolcap() {
    console.log('validar control cap')
    $_CONTROLCAPW = $("#ctrlcont_108").val();
    if ($_CONTROLCAPW.trim() == '0') {
        console.log('control cap 1')
        CON851('02', '02', null, 'error', 'error');
        $("#ctrlcont_108").val("0");
        _evaluarcontrolcap();
    }
    else if ($_CONTROLCAPW == "9999") {
        _evaluardetalle();
    }
    else {
        consultacontrolcap_SAL7411();
    }
}

function consultacontrolcap_SAL7411() {
    LLAMADO_DLL({
        dato: [$_CONTROLCAPW],
        callback: _dataSER108_12,
        nombredll: 'SER108-12',
        carpeta: 'SALUD'
    });
}
function _dataSER108_12(data) {
    console.log(data, "SER108-12");
    var date = data.split("|");
    var swinvalid = date[0];
    var $_ESTADOCNCAP = date[1];
    var $_NITCNCAP = date[2];
    var $_FECHAINICNCAP = date[3];
    var $_FECHAFINCNCAP = date[4];
    if (swinvalid == "00") {
        if ($_ESTADOCNCAP == "1") {
            CON851('13', '13', null, 'error', 'error');
            _evaluarcontrolcap();
        }
        else if ($_NITUSU == "0800251482") {
            // _RELEERNIT_SAL7411(); 
            if ($_NITCNCAP != $_NITW) {
                if ($_NITCNCAP == $_NITCONTW) {
                    _evaluardetalle();
                }
                else {
                    CON851('06', '06', null, 'error', 'error');
                    _evaluarobservacion_SAL7411();
                }
            }
            else {
                _evaluardetalle();
            }
        }
        else if ($_NITUSU == "0900520317") {
            _evaluardetalle();
        }
        else {
            if ($_NITCNCAP != $_NITW) {
                if ($_NITCNCAP != $_NITCONTW) {
                    _evaluardetalle();
                }
                else {
                    CON851('06', '06', null, 'error', 'error');
                    _evaluarobservacion_SAL7411();
                }
            }
            else if ($_PRECAPITW.trim() == "") {
                var fechasigini = moment($_FECHAINICNCAP);
                var fechasigfin = moment($_FECHAFINCNCAP);
                var fechaingw = moment($_FECHAINGNUM);
                if ((fechasigini > fechaingw) || (fechasigfin < fechaingw)) {
                    CON851('37', '37', null, 'error', 'error');
                    if (($_ADMINW == "ADMI") || ($_ADMINW == "DAVI") || ($_ADMINW == "GEBC")) {
                        _evaluardetalle();
                    }
                    else {
                        _evaluarcontrolcap();
                    }
                }
            }
            else if ($_CONTRATOW.trim() == "") {
                $_CONTRATOW = $_NROCONTCNCAP;
                $("#contrato_108").val($_CONTRATOW);
                _evaluardetalle();
            }
            else {
                _evaluardetalle();
            }
        }
    } else if (swinvalid == "01") {

        CON851('01', '01', null, 'error', 'error');
        _evaluarobservacion_SAL7411();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function _evaluardetalle() {
    validarInputs({
        form: "#DETALLE_108",
        orden: "1"
    },
        function () { _evaluarobservacion_SAL7411(); },
        _dato19
    )
}

function _dato19() {
    $_DETALLEW = $("#detalle_108").val();
    $_OPSEGU = "IS41S";
    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904S_03,
        nombredll: 'CON904S',
        carpeta: 'CONTAB'
    })
}

function _dataCON904S_03(data) {
    console.log(data, "CON904S-03");
    var date = data.split("|");
    var swinvalid = date[1].substring(0, 2);
    if ((swinvalid == "00") && ($_NOVEDAD == "8")) {
        _evaluarbol();
    }
    else {
        _evaluarctlpaci_SAL7411();
    }
}

function _evaluarbol() {
    validarInputs({
        form: "#BOL_108",
        orden: "1"
    },
        function () { _evaluardetalle(); },
        _evaluarctlpaci_SAL7411
    )
}

function _evaluarctlpaci_SAL7411() {
    $_BOLW = $("#bol_108").val();
    validarInputs({
        form: "#COMPROBANTE_108",
        orden: "1"
    },
        function () { _evaluardetalle(); },
        _datoctlpaci_SAL7411
    )
}

function _datoctlpaci_SAL7411() {

    $_CTLNROPACIW = $("#mostrar_108").val();
    if (($_PREFIJOW == 'P') || ($_PREFIJOW == 'T')) {
        $_CTLNROPACIW = 'N';
        $("#mostrar_108").val($_CTLNROPACIW);
        _evaluarnivel_SAL7411();
    } else {
        if ($_CTLNROPACIW.trim() == '') {
            $_CTLNROPACIW = 'N';
            $("#mostrar_108").val($_CTLNROPACIW);
            _evaluarnivel_SAL7411()
        } else if (($_CTLNROPACIW == 'N') || ($_CTLNROPACIW == 'S')) {
            _evaluarnivel_SAL7411()
        } else {
            CON851('03', '03', null, 'error', 'error');
            _evaluarctlpaci_SAL7411();
        }
    }
}

function _evaluarnivel_SAL7411() {
    validarInputs({
        form: "#NIVEL_108",
        orden: "1"
    },
        function () { _evaluardetalle(); },
        _validarnivel
    )
}
function _validarnivel() {
    $_NIVELCUPSW = $("#nivel_108").val();

    if ($_NIVELCUPSW.trim() == '') {
        $_NIVELCUPSW = "*";
        $("#nivel_108").val($_NIVELCUPSW);
        _evaluardatocis_SAl7411();

    } else if (($_NIVELCUPSW == "*") || ($_NIVELCUPSW == "1") || ($_NIVELCUPSW == "2") || ($_NIVELCUPSW == "3") || ($_NIVELCUPSW == "4")) {
        console.log("datocodcis");
        _evaluardatocis_SAl7411();
    }
    else {
        CON851('03', '03', null, 'error', 'error');
        _evaluarnivel_SAL7411()
    }
}

function _evaluardatocis_SAl7411() {
    validarInputs({
        form: "#CIS_108",
        orden: "1"
    },
        function () { _evaluarnivel_SAL7411(); },
        _datocodcis_SAL7411
    )
}

function _datocodcis_SAL7411() {
    $_CISW = $("#codcis_108").val();

    if ($_CISW.trim() == '') {
        $_CISW = 'N';
        $("#codcis_108").val($_CISW);
        _datotipopaciente_SAL7411();
    } else if (($_CISW == 'N') || ($_CISW == 'S')) {
        _datotipopaciente_SAL7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluardatocis_SAl7411();
    }
}

function _datotipopaciente_SAL7411() {
    console.log("datotipopaciente");
    var datostipodepaciente = [
        { "COD": "T", "DESCRIP": "TODOS" },
        { "COD": "C", "DESCRIP": "CONTRIBUTIVO" },
        { "COD": "S", "DESCRIP": "SUBSIDIADO" },
        { "COD": "V", "DESCRIP": "VINCULADO" },
        { "COD": "P", "DESCRIP": "PARTICULAR" },
        { "COD": "O", "DESCRIP": "OTRO TIPO" },
        { "COD": "D", "DESCRIP": "DESP.CONT" },
        { "COD": "E", "DESCRIP": "DESP. SUBS" },
        { "COD": "F", "DESCRIP": "DESP. VINC" }
    ]
    POPUP({
        array: datostipodepaciente,
        titulo: 'Tipo Usuario',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluardetalle
    },
        _evaluardatotipodepaciente_108);
}
function _evaluardatotipodepaciente_108(datostipodepaciente) {
    $_TIPOPACIW = datostipodepaciente.COD;
    switch (datostipodepaciente.COD) {
        case 'T':
            $('#tipopaci_108').val("*");
            $_TIPOPACIW = "*";
            _evaluardatomyt_SAl7411();
            break;
        case 'C':
        case 'S':
        case 'V':
        case 'P':
        case 'O':
        case 'D':
        case 'E':
        case 'F':
            $('#tipopaci_108').val(datostipodepaciente.COD);
            _evaluardatomyt_SAl7411();
            break;
        default:
            _evaluardetalle();
            break;
    }
}

function _evaluardatomyt_SAl7411() {
    validarInputs({
        form: "#MYT_108",
        orden: "1"
    },
        function () { _evaluardatocis_SAl7411(); },
        _datomyt_SAL7411
    )
}

function _datomyt_SAL7411() {
    $_MYTW = $("#myt_108").val();

    if ($_MYTW.trim() == '') {
        $_MYTW = 'N';
        $("#myt_108").val($_MYTW);
        _evaluardatocontrolxserv_SAl7411();

    } else if (($_MYTW == 'N') || ($_MYTW == 'S')) {
        _evaluardatocontrolxserv_SAl7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluardatomyt_SAl7411();
    }
}

function _evaluardatocontrolxserv_SAl7411() {
    validarInputs({
        form: "#CTRLXSERV_108",
        orden: "1"
    },
        function () { _evaluardatomyt_SAl7411(); },
        _datocontrolxserv_SAL7411
    )
}
function _datocontrolxserv_SAL7411() {
    $_CONTROLXSERVW = $("#ctrlxserv_108").val();

    if ($_CONTROLXSERVW.trim() == '') {
        $_CONTROLXSERVW = 'N';
        $("#ctrlxserv_108").val($_CONTROLXSERVW);
        $_CONTROLCL0 = '';
        $_CONTROLCL1 = '';
        $_CONTROLCL2 = '';
        $_CONTROLCL3 = '';
        $_CONTROLCL4 = '';
        $_CONTROLCL5 = '';
        $_CONTROLCL6 = '';
        $_CONTROLCL7 = '';
        _evaluardatoiva_SAl7411();

    } else if ($_CONTROLXSERVW == 'N') {
        $_CONTROLCL0 = '';
        $_CONTROLCL1 = '';
        $_CONTROLCL2 = '';
        $_CONTROLCL3 = '';
        $_CONTROLCL4 = '';
        $_CONTROLCL5 = '';
        $_CONTROLCL6 = '';
        $_CONTROLCL7 = '';
        _evaluardatoiva_SAl7411();
    } else if ($_CONTROLXSERVW == 'S') {
        _evaluarcontrolcl0_SAl7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluardatocontrolxserv_SAl7411();
    }
}

function _evaluarcontrolcl0_SAl7411() {
    validarInputs({
        form: "#MED_108",
        orden: "1"
    },
        function () { _evaluardatocontrolxserv_SAl7411(); },
        _datocontrolcl0_SAL7411
    )
}

function _datocontrolcl0_SAL7411() {
    $_CONTROLCL0 = $("#controlcl0_108").val();

    if ($_CONTROLCL0.trim() == '') {
        $_CONTROLCL0 = 'N';
        $("#controlcl0_108").val($_CONTROLCL0);
        _evaluarcontrolcl1_SAl7411();
    } else if (($_CONTROLCL0 == 'N') || ($_CONTROLCL0 == 'S')) {
        _evaluarcontrolcl1_SAl7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluarcontrolcl0_SAl7411();
    }
}

function _evaluarcontrolcl1_SAl7411() {
    validarInputs({
        form: "#CIRUG_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl0_SAl7411(); },
        _datocontrolcl1_SAL7411
    )
}
function _datocontrolcl1_SAL7411() {
    $_CONTROLCL1 = $("#controlcl1_108").val();

    if ($_CONTROLCL1.trim() == '') {
        $_CONTROLCL1 = 'N';
        $("#controlcl1_108").val($_CONTROLCL1);
        _evaluarcontrolcl2_SAl7411();
    } else if (($_CONTROLCL1 == 'N') || ($_CONTROLCL1 == 'S')) {
        _evaluarcontrolcl2_SAl7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluarcontrolcl1_SAl7411();
    }
}

function _evaluarcontrolcl2_SAl7411() {
    validarInputs({
        form: "#LAB_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl0_SAl7411(); },
        _datocontrolcl2_SAL7411
    )
}
function _datocontrolcl2_SAL7411() {
    $_CONTROLCL2 = $("#controlcl2_108").val();

    if ($_CONTROLCL2.trim() == '') {
        $_CONTROLCL2 = 'N';
        $("#controlcl2_108").val($_CONTROLCL2);
        _evaluarcontrolcl3_SAl7411();
    } else if (($_CONTROLCL2 == 'N') || ($_CONTROLCL2 == 'S')) {
        _evaluarcontrolcl3_SAl7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluarcontrolcl2_SAl7411();
    }
}

function _evaluarcontrolcl3_SAl7411() {
    validarInputs({
        form: "#RX_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl2_SAl7411(); },
        _datocontrolcl3_SAL7411
    )
}
function _datocontrolcl3_SAL7411() {
    $_CONTROLCL3 = $("#controlcl3_108").val();

    if ($_CONTROLCL3.trim() == '') {
        $_CONTROLCL3 = 'N';
        $("#controlcl3_108").val($_CONTROLCL3);
        _evaluarcontrolcl4_SAl7411();
    } else if (($_CONTROLCL3 == 'N') || ($_CONTROLCL3 == 'S')) {
        _evaluarcontrolcl4_SAl7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluarcontrolcl3_SAl7411();
    }
}

function _evaluarcontrolcl4_SAl7411() {
    validarInputs({
        form: "#OTRO_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl3_SAl7411(); },
        _datocontrolcl4_SAL7411
    )
}
function _datocontrolcl4_SAL7411() {
    $_CONTROLCL4 = $("#controlcl4_108").val();

    if ($_CONTROLCL4.trim() == '') {
        $_CONTROLCL4 = 'N';
        $("#controlcl4_108").val($_CONTROLCL4);
        _evaluarcontrolcl5_SAl7411();
    } else if (($_CONTROLCL4 == 'N') || ($_CONTROLCL4 == 'S')) {
        _evaluarcontrolcl5_SAl7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluarcontrolcl4_SAl7411();
    }
}

function _evaluarcontrolcl5_SAl7411() {
    validarInputs({
        form: "#CONS_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl4_SAl7411(); },
        _datocontrolcl5_SAL7411
    )
}

function _datocontrolcl5_SAL7411() {
    $_CONTROLCL5 = $("#controlcl5_108").val();

    if ($_CONTROLCL5.trim() == '') {
        $_CONTROLCL5 = 'N';
        $("#controlcl5_108").val($_CONTROLCL5);
        _evaluarcontrolcl6_SAl7411();
    } else if (($_CONTROLCL5 == 'N') || ($_CONTROLCL5 == 'S')) {
        _evaluarcontrolcl6_SAl7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluarcontrolcl5_SAl7411();
    }
}

function _evaluarcontrolcl6_SAl7411() {
    validarInputs({
        form: "#PATO_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl5_SAl7411(); },
        _datocontrolcl6_SAL7411
    )
}
function _datocontrolcl6_SAL7411() {
    $_CONTROLCL6 = $("#controlcl6_108").val();

    if ($_CONTROLCL6.trim() == '') {
        $_CONTROLCL6 = 'N';
        $("#controlcl6_108").val($_CONTROLCL6);
        _evaluarcontrolcl7_SAl7411();
    } else if (($_CONTROLCL6 == 'N') || ($_CONTROLCL6 == 'S')) {
        _evaluarcontrolcl7_SAl7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluarcontrolcl6_SAl7411();
    }
}

function _evaluarcontrolcl7_SAl7411() {
    validarInputs({
        form: "#PYP_108",
        orden: "1"
    },
        function () { _evaluarcontrolcl6_SAl7411(); },
        _datocontrolcl7_SAL7411
    )
}

function _datocontrolcl7_SAL7411() {
    $_CONTROLCL7 = $("#controlcl7_108").val();

    if ($_CONTROLCL7.trim() == '') {
        $_CONTROLCL7 = 'N';
        $("#controlcl7_108").val($_CONTROLCL7);
        _evaluardatoiva_SAl7411();
    } else if (($_CONTROLCL7 == 'N') || ($_CONTROLCL7 == 'S')) {
        _evaluardatoiva_SAl7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluarcontrolcl7_SAl7411();
    }
}
function _evaluardatoiva_SAl7411() {
    console.log('evaluardatoiva');
    validarInputs({
        form: "#ARTCONIVA_108",
        orden: "1"
    },
        function () { _evaluardatocontrolxserv_SAl7411(); },
        _datoiva_SAL7411
    )
}
function _datoiva_SAL7411() {
    console.log('datoiva');
    $_ARTIVAW = $("#artconiva_108").val();

    if ($_ARTIVAW.trim() == '') {
        $_ARTIVAW = 'N';
        _evaluarnropol_SAL7411();
    } else if (($_ARTIVAW == 'N') || ($_ARTIVAW == 'S')) {
        _evaluarnropol_SAL7411();
    } else {
        CON851('03', '03', null, 'error', 'error');
        _evaluardatoiva_SAl7411();
    }
}

function _evaluarnropol_SAL7411() {
    console.log('evaluar pol');
    validarInputs({
        form: "#NROPOL_108",
        orden: "1"
    },
        function () { _evaluardatoiva_SAl7411(); },
        _datozona_SAL7411
    )
}
function _datozona_SAL7411() {
    console.log('dato zona');

    $_NROPOLW = $("#nropol_108").val();

    if (($_NITUSU == "0844001287") && ($_ACTTER == "31") && (parseInt($_AÑOPACI_ING7411) > 2011)) {
        // _ventanaDatos({
        //     titulo: "VENTANA DE CONSULTA DE ZONAS Y RUTAS",
        //     columnas: ["ZONA", "NOMBRE"],
        //     data: $_CONVENIO_108,
        //     callback: function (data) {
        //         if ($_NROPOLW.trim() == "") {
        //             $_NROPOLW = "                              ";
        //             $_RUTAW = "  ";
        //             $('#ruta_108').val(data.ZONA.trim() + "-" + data.NOMBRE.trim());
        //             $_RUTAW = $('#ruta_108').val();
        //             _evaluardiasest_SAL7411();
        //         }
        //         else {
        //             $_RUTAW = "  "
        //             $('#ruta_108').val(data.ZONA.trim() + "-" + data.NOMBRE.trim());
        //             $_RUTAW = $('#ruta_108').val();
        //             _evaluardiasest_SAL7411();
        //         }
        //     }
        // });
    } else if ($_NROPOLW.trim() == ' ') {
        $_RUTAW = '';
        _evaluardiasest_SAL7411();
    } else {
        $_RUTAW = '';
        _evaluardiasest_SAL7411();
    }
}

function _evaluardiasest_SAL7411() {
    console.log('evaluar est');
    validarInputs({
        form: "#DIASEST_108",
        orden: "1"
    },
        function () { _evaluarnropol_SAL7411(); },
        _validardiasest_SAL7411
    )
}
function _validardiasest_SAL7411() {
    console.log('validar est');
    $_ESTW = $("#est_108").val();

    if ($_ESTW.trim() == ' ') {
        $_ESTW = "000";
        $("#est_108").val($_ESTW);
        _validardatoclasif_SAL7411();
    }
    else {
        _validardatoclasif_SAL7411();
    }
}

function _validardatoclasif_SAL7411() {
    console.log('validardatoclasif');
    if (($_NITUSU == "0800037021") || ($_NITUSU == "0892000401") || ($_NITUSU == "0900648993") || ($_NITUSU == "0900755133") || ($_NITUSU == "0900870633")) {
        if ($_NOVEDAD == '7') {
            $("#clasificacion_108").val("3 - NO APLICA");
            $_CLASIFW = "3";
            _datoremitido_SAL7411();
        } else {
            _datoremitido_SAL7411();
        }
    }
    else if (($_PUCUSU == "3") || ($_PUCUSU == "4") || ($_PUCUSU == "6")) {
        _datoclasif_SAL7411();
    }
    else {
        if ($_NOVEDAD == '7') {
            $("#clasificacion_108").val("3 - NO APLICA");
            $_CLASIFW = "3";
            _datoremitido_SAL7411();
        } else {
            _datoremitido_SAL7411();
        }
    }
}
function _datoclasif_SAL7411() {
    var datoclasif = [
        { "COD": "1", "DESCRIP": "1 -POS" },
        { "COD": "2", "DESCRIP": "2 -NO POS" },
        { "COD": "3", "DESCRIP": "3 -NO APLICA" }
    ]
    POPUP({
        array: datoclasif,
        titulo: 'Clasificacion',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluardiasest_SAL7411
    },
        _evaluardatoclasif_108);
}
function _evaluardatoclasif_108(datoclasif) {
    $_CLASIFW = datoclasif.COD;
    switch (datoclasif.COD) {
        case '1':
        case '2':
        case '3':
            _datoremitido_SAL7411();
            break;
        default:
            _evaluardiasest_SAL7411();
            break;
    }
    $('#clasificacion_108').val(datoclasif.COD + " - " + datoclasif.DESCRIP);
}

function _datoremitido_SAL7411() {
    console.log('dato remite');
    validarInputs({
        form: "#REMITE_108",
        orden: "1"
    }, function () { _evaluardiasest_SAL7411(); },
        _evaluardatoremitido_108
    )
}
function _evaluardatoremitido_108() {
    console.log('evalua dato remite');
    $_ENTRAREMITW = $("#remitido_108").val();

    if ($_ENTRAREMITW.trim() == '') {
        $_ENTRAREMITW = 'N';
        $("#remitido_108").val($_ENTRAREMITW);
        _datotipodeevento();
    } else if ($_ENTRAREMITW == 'S') {
        _evaluarorigremit();
    } else {
        _datotipodeevento();
    }
}
function _evaluarorigremit() {
    console.log('evaluar origen remit');
    validarInputs({
        form: "#ORIGEN_108",
        orden: "1"
    },
        function () { _datocontrolxserv_SAL7411(); },
        _validarorigenremit
    )
}
function _validarorigenremit() {
    console.log('validar origen remit');
    $_ORIGREMIT = $("#origen_108").val();
    if (($_ENTRAREMITW == "S") && ($_ORIGREMIT.trim() == '')) {
        CON851('02', '02', null, 'error', 'error');
        _evaluarorigremit();
    }
    else {
        LLAMADO_DLL({
            dato: [$_ORIGREMIT],
            callback: _dataSER108_13,
            nombredll: 'SER108-13',
            carpeta: 'SALUD'
        })
    }
}
function _dataSER108_13(data) {
    console.log(data, "SER108-13");
    var date = data.split("|");
    var swinvalid = date[0];
    if (swinvalid == "00") {
        _datotipodeevento();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'Error');
        _evaluarorigremit();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _datotipodeevento() {
    console.log('datotipo evento');
    $_ORIGREMIT = $("#origen_108").val();

    if ($_PREFIJOW == "T") {
        if (($_TIPOEVENTOW > '00') && ($_TIPOEVENTOW < '18')) {
            _tipodeevento_SAL7411();
        } else {
            if ($_NOVEDAD == '7') {
                $_TIPOEVENTOW = '00';
                $("#tipoevento_108").val("00 - NO APLICA");
                $("#ciudad_108").val('50689');
                _evaluarciudad_SAL7411();
            } else {
                _evaluarciudad_SAL7411();
            }
        }
    }
    if (($_NITUSU == "0892000401") && (parseInt($_ANOLNK) < 16)) {
        _tipodeevento_SAL7411();
    }
    else {
        if ($_NOVEDAD == '7') {
            $_TIPOEVENTOW = '00';
            $("#tipoevento_108").val("00 - NO APLICA");
            $("#ciudad_108").val('50689');
            _evaluarciudad_SAL7411();
        } else {
            _evaluarciudad_SAL7411();
        }
    }
}

function _tipodeevento_SAL7411() {
    var datostipoeventow = [
        { "COD": "1", "DESCRIP": "00 - NO APLICA" },
        { "COD": "2", "DESCRIP": "01 - ACCIDENTE DE TRANSI" },
        { "COD": "3", "DESCRIP": "02 - SISMO" },
        { "COD": "4", "DESCRIP": "03 - MAREMOTO" },
        { "COD": "5", "DESCRIP": "04 - ERUPCIONES VOLCACNIC" },
        { "COD": "6", "DESCRIP": "05 - DESLIZAMIENTO TIERR" },
        { "COD": "7", "DESCRIP": "06 - INUNDACIONES" },
        { "COD": "8", "DESCRIP": "07 - AVALANCHA" },
        { "COD": "9", "DESCRIP": "08 - INCENDIO NATURA" },
        { "COD": "A", "DESCRIP": "09 - EXPLOSION TERRORIST" },
        { "COD": "B", "DESCRIP": "10 - INCENDIO TERRORISTA" },
        { "COD": "C", "DESCRIP": "11 - COMBATE" },
        { "COD": "D", "DESCRIP": "12 - ATAQUE A MUNICIPIOS" },
        { "COD": "E", "DESCRIP": "13 - MASACRE" },
        { "COD": "G", "DESCRIP": "14 - DESPLAZADOS" },
        { "COD": "H", "DESCRIP": "15 - OTRO" },
        { "COD": "I", "DESCRIP": "16 - HURACAN" },
        { "COD": "J", "DESCRIP": "18 - MINA ANTIPERSONAL" }
    ]
    POPUP({
        array: datostipoeventow,
        titulo: 'TIPO DE ENVENTO',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _evaluardiasest_SAL7411
    },
        _evaluardatotipoeventow_108);
}
function _evaluardatotipoeventow_108(datostipoeventow) {
    $_TIPOEVENTOW = datostipoeventow.COD;
    switch (datostipoeventow.COD) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'E':
        case 'G':
        case 'H':
        case 'I':
        case 'J':
            _evaluarciudad_SAL7411();
            break;
        default:
            _evaluardiasest_SAL7411();
            break;
    }
    $('#tipoevento_108').val(datostipoeventow.COD + " - " + datostipoeventow.DESCRIP);
}

function _evaluarciudad_SAL7411() {
    console.log('ingreso ciudad');
    validarInputs({
        form: "#CIUDAD_108",
        orden: "1"
    },
        function () { _datoremitido_SAL7411(); },
        _validarciudad
    )
}

function _validarciudad() {
    $_CIUDADW = $("#ciudad_108").val();
    console.log($_CIUDADW);
    LLAMADO_DLL({
        dato: [$_CIUDADW],
        callback: _dataSER108_14,
        nombredll: 'SER108-14',
        carpeta: 'SALUD'
    });
}
function _dataSER108_14(data) {
    console.log(data, "SER108-14");
    var date = data.split("|");
    var swinvalid = date[0];
    $_DESCRIPCIUDADW = date[1];
    if (swinvalid == "00") {
        $("#nomciudad_108").val($_DESCRIPCIUDADW);
        _evaluardatofunauto_SAL7411();
    }
    else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _evaluarciudad_SAL7411();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _evaluardatofunauto_SAL7411() {
    validarInputs({
        form: "#FUNCAUTO_108",
        orden: "1"
    },
        function () { _evaluarciudad_SAL7411(); },
        _validarfuncauto_SAL7411
    )
}
function _validarfuncauto_SAL7411() {

    $_FUNCAUTORINGW = $("#funauto_108").val();
    $_FUNCAUTORINGW = $_FUNCAUTORINGW.padStart(10, "0");
    if ($_FUNCAUTORINGW.trim() == '') {

        $_FUNCAUTORINGW = "0000000000";
        $_DESCRIPAUTORINGW = '';
        $("#funcauto_108").val($_FUNCAUTORINGW);
        $("#funautod_108").val($_DESCRIPAUTORINGW);
        _datoautorizacion();
    }
    else {
        LLAMADO_DLL({
            dato: [$_FUNCAUTORINGW],
            callback: _dataSER108_15,
            nombredll: 'SER108-05',
            carpeta: 'SALUD'
        });
    }
}
function _dataSER108_15(data) {
    console.log(data, "SER108-15");
    var date = data.split("|");
    var swinvalid = date[0];
    $_DESCRIPAUTORINGW = date[4];
    if (swinvalid == "00") {
        $("#funautod_108").val($_DESCRIPAUTORINGW);
        _datoautorizacion();
    } else if (swinvalid == "01") {
        $("#funautod_108").val("**********");
        _datoautorizacion();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _datoautorizacion() {
    if ($_PREFIJOW == "T") {
        _evaluarobservacionaper();
    }
    else {
        _evaluarnroautorizacion();
    }
}

function _evaluarnroautorizacion() {
    validarInputs({
        form: "#NROAUTO_108",
        orden: "1"
    },
        function () { _evaluardatofunauto_SAL7411(); },
        _evaluarautoriza_SAL7411
    )
}
function _evaluarautoriza_SAL7411() {
    $_NROAUTORIZACIONW = $("#nroauto_108").val();

    _validarobservacion_SAL7411()
}

function _validarobservacion_SAL7411() {

    if (($_NITUSU == '0800037021') && ($_PREFIJOW == 'P') && ($_NROAUTORIZACIONW != '')) {
        $_FECHABUSQ = moment().format('YYMMDD');
        $_MESBUSQ = $_FECHABUSQ.substring(2, 4);
        $_ANOBUSQ = $_FECHABUSQ.substring(4, 6);
        if (parseInt($_MESBUSQ) > 3) {
            $_MESBUSQ = parseInt($_MESBUSQ) - 3;
            _evaluarobservacionaper()
        } else {
            if (parseInt($_MESBUSQ) == 01) {
                _evaluarobservacionaper()
            } else {
                $_MESBUSQ == 12;
                $_ANOBUSQ = parseInt($_ANOBUSQ) - 1;
                _evaluarobservacionaper()
            }
        }
        if ($_IDPACW != "000000000000001") {
            $_FACTP = '';
            LLAMADO_DLL({
                dato: [$_IDPACW, $_FECHABUSQ, $_LLAVEW, $_NROAUTORIZACIONW],
                callback: _dataSER836AU,
                nombredll: 'SER836C',
                carpeta: 'SALUD'
            })
        }
    } else {
        _evaluarobservacionaper();
    }
}

function _dataSER836AU(data) {
    console.log(data, 'SER836AU');
    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_FACTP = date[1];
    if (swinvalid == '00') {
        if ($_FACTP.trim() == '') {
            console.log('imprime en pantalla')
            // DISPLAY SPACES LINE 32 POSITION 02
            _validarinformacion();
        }
        else {
            CON851('8U', '8U', null, 'error', 'error');
            _evaluarobservacionaper()
        }
    } else if (swinvalid == '01') {
        _evaluarnroautorizacion();

    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}


function _evaluarobservacionaper() {
    validarInputs({
        form: "#OBSERAPERTURA_108",
        orden: "1"
    },
        function () { _evaluardatofunauto_SAL7411(); },
        _validarinformacion
    )
}


/////////////////////////////////// GRABAR DATOS Y ELIMINAR ////////////////////////////////////////////

function _validarinformacion() {
    $_OBSERAPERW = $("#obserapertura_108").val();
    bootbox.confirm({
        size: "small",
        onEscape: false,
        message: "DESEA GRABAR LOS DATOS?",
        buttons: {
            confirm: {
                label: 'Si',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }

        },
        callback: function (result) {
            if (result == true) {
                _grabardatos();
            }
            else {
                _evaluardetalle();
            }
        }
    })
}

function _grabardatos() {

    if ($_NOVEDAD == '8') {
        $_FECHAMODNUM = moment().format('YYYYMMDD');
        $_OPERMODNUM = $_ADMINW;
        $_FECHACRENUM = $_ANOCRENUM + $_MESCRENUM + $_DIACRENUM;

        $_FECHAINGNUM = $_AÑOPACI_ING7411 + $_MESPACI_ING7411 + $_DIAPACI_ING7411;
        $_HORAINGNUMW = $_HORAPACI_ING7411 + $_MINPACI_ING7411;
        $_NITW = $_NITNUM;
        $_DESCRIPW = $_DESCRIPNUM;


    } else {
        $_FECHACRENUM = moment().format('YYYYMMDD');
        $_OPERNUM = $_ADMINW;
        $_FECHAMODNUM = ' ';
        $_OPERMODNUM = ' ';
    }
    $_FACTCAPITW = $_PRECAPITW + $_NROCAPITW;

    LLAMADO_DLL({
        dato: [$_NOVEDAD, $_LLAVEW, $_NITW, $_DESCRIPW, $_CONVENIOW, $_ESTADOW, $_PORCRETENCW, $_SEGRIPSW, $_CTAPICW, $_IDPACW, $_TIPOFACTW, $_HABW, $_PORCENCOPAGOW, $_FECHAINGNUM, $_FECHASALNUM, $_HORAINGNUMW, $_HORAPACI_RET7411, $_SERVICIOW, $_REDEXTERW, $_CONTRATOW, $_DIVISIONW, $_FACTCAPITW, $_FORMACOPAGW, $_CCOSTOW, $_ENVIOW, $_CONTROLCAPW, $_OBSERVW, $_TIPOPACIW, $_DETALLEW, $_CTLNROPACIW, $_CISW, $_MYTW, $_CONTROLXSERVW, $_CONTROLCL0, $_CONTROLCL1, $_CONTROLCL2, $_CONTROLCL3, $_CONTROLCL4, $_CONTROLCL5, $_CONTROLCL6, $_CONTROLCL7, $_ARTIVAW, $_NROPOLW, $_RUTAW, $_ESTW, $_CLASIFW, $_ENTRAREMITW, $_ORIGREMIT, $_TIPOEVENTOW, $_CIUDADW, $_FUNCAUTORINGW, $_NROAUTORIZACIONW, $_OBSERAPERW, $_OPERNUM, $_FECHACRENUM, $_FECHAMODNUM, $_OPERMODNUM, $_OPERBLOQNUM],
        callback: _dataSER108_02,
        nombredll: 'SER108-02',
        carpeta: 'SALUD'
    });
}
function _dataSER108_02(data) {
    console.log(data, "SER108-02");
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if ($_NOVEDAD == '7') {
            BUSCARNUMERO(_grabarnumero);
        } else {
            _validarimpresion();
        }
        // toastr.success('Se ha guardado', 'SER108');
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _grabarnumero() {
    var fechacre = moment().format('YYMMDD');
    var anoenvio = fechacre.substring(0, 2);
    var mesennvio = fechacre.substring(2, 4);
    var diaenvio = fechacre.substring(4, 6);
    console.log($_SECUNUM + '|' + $_NROW, 'variable envio')

    LLAMADO_DLL({
        dato: [$_SECUNUM, $_NROW, anoenvio + mesennvio + diaenvio],
        callback: _dataCON007X,
        nombredll: 'CON007X',
        carpeta: 'CONTAB'
    });
}

function _dataCON007X(data) {
    console.log(data, "CON007X");
    var date = data.split("|");
    var swinvalid = date[0].trim();

    if (swinvalid == "00") {
        toastr.success('Se ha guardado', 'SER108');
        // toastr('Finalizado', 'SER108', 'success');
        _validarimpresion();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _validarimpresion() {

    bootbox.confirm({
        size: "small",
        onEscape: false,
        message: "DESEA IMPRIMIR?",
        buttons: {
            confirm: {
                label: 'Si',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }

        },
        callback: function (result) {
            if (result == true) {
                _imprimirfactura_SAL7411();
            }
            else {
                _inputControl('reset');
                _toggleNav();
            }
        }
    })
}

function _imprimirfactura_SAL7411() {
    // setTimeout(function(){_cargandoimpresion('imprimiendo')}, 300);
    console.log('imprimirfactura')
    var datos_envio = datosEnvio();
    datos_envio += $_LLAVEW + '|' + $_ADMINW
    console.debug(datos_envio);
    let URL = get_url("APP/SALUD/SER108-15.DLL");
    postData({ datosh: datos_envio }, URL)
        .then(function (data) {
            console.debug(data);
            SAL7411.FACTURAS = data.FACTURAS[0];
            _impresion_SAL7411();
        })
        .catch(err => {
            console.debug(err);
        })
}

function _impresion_SAL7411(){
    console.log('impresion', SAL7411.FACTURAS);
    // $_NOMBREPDF = SAL7411.FACTURAS.
    
    opcinesImpresion_SAL7411= {
        datos: SAL7411.FACTURAS,
        tipo: 'pdf',
        formato: 'salud/SER108P.html',
        nombre: 'PRUEBA_APER'
    }
    imprimir(opcinesImpresion_SAL7411, finalizaimpresionSAL7411);
}

function finalizaimpresionSAL7411(){

    _cargandoimpresion('termino');
}
function _cargandoimpresion(estado) {
    switch (estado) {
        case 'imprimiendo':
            var ventanaimpresion = bootbox.dialog({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Imprimiendo...</div>',
                closeButton: false,
                buttons: {
                    confirm: {
                        label: 'Aceptar',
                        className: 'btn-primary',
                        callback: function () {
                            ventanaimpresion.off('show.bs.modal');
                            CON851('39', '39', null, 'success', 'Exito'); // MOMENTANEO MIENTRAS SE APLICA LA IMPRESION
                            _toggleNav();
                        }
                    }
                }
            })
            ventanaimpresion.init($('.modal-footer').hide());
            break;
        case 'termino':
            $('.btn-primary').click();
            break;
    }
}


// function _cambioregistro() {
//     console.log("cambioregistro");
//     _mostrardatos();
//     _leerconvenio();
//     $_ANOLNK = $_FECHA_LNK.substring(0, 2);
//     parseInt($_ANOLNK) > 90 ? $_ANOLNK = "19" + $_ANOLNK : $_ANOLNK = "20" + $_ANOLNK;
//     $_ANOALFA = $_ANOLNK;
//     $_MESLNK = $_FECHA_LNK.substring(3, 5);
// }

///////////////////// RETIRAR FACTURA /////////////////////////////

function _retirarfactura_SAL7411() {
    consultamostrardatos_SAL7411();
}

function _retiroregistro() {
    bootbox.confirm({
        size: "small",
        onEscape: false,
        message: "DESEA RETIRAR ESTOS DATOS?",
        buttons: {
            confirm: {
                label: 'Si',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }

        },
        callback: function (result) {
            if (result == true) {
                _grabarcorresponsalia();
            }
            else {
                _toggleNav();
            }
        }
    });
}

function _grabarcorresponsalia() {
    $_OPSEGU = "IS767C"
    LLAMADO_DLL({
        dato: [$_ADMINW, $_OPSEGU],
        callback: _dataCON904S_04,
        nombredll: 'CON904S',
        carpeta: 'CONTAB'
    })
}

function _dataCON904S_04(data) {
    console.log(data, "CON904S-04");
    var date = data.split("|");
    var swinvalid = date[2].trim();
    if (swinvalid == "00") {
        setTimeout(_ventanacorresponsalia, 500);
    }
    else {
        CON851(swinvalid, swinvalid, null, 'error', 'error');
        // NO TIENE PERMISOS
        _toggleNav();
    }
}

function _ventanacorresponsalia() {
    bootbox.confirm({
        size: "small",
        onEscape: false,
        message: "ACTUALIZAR CORRESPONSALIA?",
        buttons: {
            confirm: {
                label: 'Si',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }

        },
        callback: function (result) {
            if (result == true) {
                _ventanaactualizarcorresponsalia();
            }
            else {
                _eliminarregistro();
                // toastr('Finalizado', 'SER108', 'success');
            }
        }
    });
}

function _ventanaactualizarcorresponsalia() {
    console.log("VENTANA CORRESPONSALIA PREGUNTAR ESNEIDER COMO FUNCIONAR");
}

function _eliminarregistro() {

    if ($_NOVEDAD == '8') {
        $_FECHAMODNUM = moment().format('YYYYMMDD');
        $_OPERMODNUM = $_ADMINW;
        $_FECHACRENUM = $_ANOCRENUM + $_MESCRENUM + $_DIACRENUM;

        $_FECHAINGNUM = $_AÑOPACI_ING7411 + $_MESPACI_ING7411 + $_DIAPACI_ING7411;
        $_HORAINGNUMW = $_HORAPACI_ING7411 + $_MINPACI_ING7411;
        $_NITW = $_NITNUM;
        $_DESCRIPW = $_DESCRIPNUM;


    } else {
        $_FECHACRENUM = moment().format('YYYYMMDD');
        $_OPERNUM = $_ADMINW;
        $_FECHAMODNUM = ' ';
        $_OPERMODNUM = ' ';
    }
    $_FACTCAPITW = $_PRECAPITW + $_NROCAPITW;

    LLAMADO_DLL({
        dato: [$_NOVEDAD, $_LLAVEW, $_NITW, $_DESCRIPW, $_CONVENIOW, $_ESTADOW, $_PORCRETENCW, $_SEGRIPSW, $_CTAPICW, $_IDPACW, $_TIPOFACTW, $_HABW, $_PORCENCOPAGOW, $_FECHAINGNUM, $_FECHASALNUM, $_HORAINGNUMW, $_HORAPACI_RET7411, $_SERVICIOW, $_REDEXTERW, $_CONTRATOW, $_DIVISIONW, $_FACTCAPITW, $_FORMACOPAGW, $_CCOSTOW, $_ENVIOW, $_CONTROLCAPW, $_OBSERVW, $_TIPOPACIW, $_DETALLEW, $_CTLNROPACIW, $_CISW, $_MYTW, $_CONTROLXSERVW, $_CONTROLCL0, $_CONTROLCL1, $_CONTROLCL2, $_CONTROLCL3, $_CONTROLCL4, $_CONTROLCL5, $_CONTROLCL6, $_CONTROLCL7, $_ARTIVAW, $_NROPOLW, $_RUTAW, $_ESTW, $_CLASIFW, $_ENTRAREMITW, $_ORIGREMIT, $_TIPOEVENTOW, $_CIUDADW, $_FUNCAUTORINGW, $_NROAUTORIZACIONW, $_OBSERAPERW, $_OPERNUM, $_FECHACRENUM, $_FECHAMODNUM, $_OPERMODNUM, $_OPERBLOQNUM],
        callback: _dataSER108_02_02,
        nombredll: 'SER108-02',
        carpeta: 'SALUD'
    });
}

function _dataSER108_02_02(data) {
    console.log(data, "SER108-02_02");
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        // toastr('Finalizado', 'SER108', 'success');
        toastr.success('Se ha retirado', 'SER108');
        _inputControl('reset');
        _toggleNav();
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

//////////////////////////// NOVEDAD 8 Y 9 MOSTRAR DATOS /////////////////////////////////


function consultamostrardatos_SAL7411() {
    console.log('consultamostrar')
    LLAMADO_DLL({
        dato: [$_LLAVEW],
        callback: _dataSER108_01,
        nombredll: 'SER108-01',
        carpeta: 'SALUD'
    });
}

function _dataSER108_01(data) {
    console.log(data, 'SER108_01');

    var date = data.split('|');
    var swinvalid = date[0].trim();
    $_LLAVEW = date[1].trim();
    $_NITNUM = date[2].trim();
    $_DESCRIPNUM = date[3].trim();
    $_CONVENIONUM = date[4].trim();
    $_DESCRIPTAR = date[5].trim();
    $_ESTADONUM = date[6].trim();
    $_PORCRETENCNUM = date[7].trim();
    $_SEGRIPSNUMW = date[8].trim();
    $_CTAPICNUM = date[9].trim();
    $_IDPACNUM = date[10].trim();
    $_DESCRIPPACINUM = date[11].trim();
    $_TIPOFACTNUM = date[12].trim();
    $_HABNUM = date[13].trim();
    $_PORCENCOPAGONUM = date[14].trim();
    $_FECHAINGNUM = date[15].trim();
    console.log($_FECHAINGNUM, 'FECHA ING')
    $_FECHASALNUM = date[16].trim();
    console.log($_FECHASALNUM, 'FECHA SAL')
    $_HORAINGNUMW = date[17].trim();
    console.log($_HORAINGNUMW, 'HORA ING')
    $_HORARETNUMW = date[18].trim();
    console.log($_HORARETNUMW, 'HORA SAL')
    $_SERVICIONUM = date[19].trim();
    $_DESCRIPSERHO = date[20].trim();
    $_REDEXTERNUM = date[21].trim();
    $_CONTRATONUM = date[22].trim();
    $_DIVISIONNUM = date[23].trim();
    $_DESCRIPDIV = date[24].trim();
    $_FACTCAPITNUMW = date[25].trim();
    $_PRECAPITNUM = $_FACTCAPITNUMW.substring(0, 1);
    $_NROCAPITNUM = $_FACTCAPITNUMW.substring(1, 7);
    $_FORMACOPAGNUM = date[26].trim();
    $_CCOSTONUM = date[27].trim();
    $_NOMBRECOSTO = date[28].trim();
    $_ENVIONUM = date[29].trim();
    $_CONTROLCAPNUM = date[30].trim();
    $_OBSERVNUM = date[31].trim();
    $_TIPOPACINUM = date[32].trim();
    $_DETALLENUM = date[33].trim();
    $_CTLNROPACINUM = date[34].trim();
    $_CISNUM = date[35].trim();
    $_MYTNUM = date[36].trim();
    $_CONTROLXSERVNUM = date[37].trim();
    $_CONTROLCL0 = date[38].trim();
    $_CONTROLCL1 = date[39].trim();
    $_CONTROLCL2 = date[40].trim();
    $_CONTROLCL3 = date[41].trim();
    $_CONTROLCL4 = date[42].trim();
    $_CONTROLCL5 = date[43].trim();
    $_CONTROLCL6 = date[44].trim();
    $_CONTROLCL7 = date[45].trim();
    $_ARTIVANUM = date[46].trim();
    $_NROPOLNUM = date[47].trim();
    $_RUTANUM = date[48].trim();
    $_ESTNUM = date[49].trim();
    $_CLASIFNUM = date[50].trim();
    $_ENTRAREMITNUM = date[51].trim();
    $_ORIGREMIT = date[52].trim();
    $_NOMBREIPS = date[53].trim();
    $_TIPOEVENTONUM = date[54].trim();
    $_CIUDADNUM = date[55].trim();
    $_NOMBRECIUD = date[56].trim();
    $_FUNCAUTORINGNUM = date[57].trim();
    $_DESCRIPFUNCAUTO = date[58].trim();
    $_NROAUTORIZACIONNUM = date[59].trim();
    $_OBSERAPERNUM = date[60].trim();
    $_DATOOPERNUM = date[61].trim();
    $_OPERNUM = $_DATOOPERNUM.substring(0, 4);
    $_ANOCRENUM = $_DATOOPERNUM.substring(4, 8);
    $_MESCRENUM = $_DATOOPERNUM.substring(8, 10);
    $_DIACRENUM = $_DATOOPERNUM.substring(10, 12);
    $_OPERBLOQNUM = $_DATOOPERNUM.substring(12, 16);
    $_ANOMODNUM = $_DATOOPERNUM.substring(16, 18);
    console.log($_ANOMODNUM, '$_ANOMODNUM')
    $_MESMODNUM = $_DATOOPERNUM.substring(18, 20);
    console.log($_MESMODNUM, '$_MESMODNUM')
    $_DIAMODNUM = $_DATOOPERNUM.substring(20, 24);
    console.log($_DIAMODNUM, '$_DIAMODNUM')
    $_ZONATER = date[62].trim();
    // $_OPERMODNUM = date[63].trim();
    // $_FECHANACPAC = date[64].trim();
   

    if (swinvalid == '00') {
        _mostrardatos_SAL7411();
    }
    else {
        CON852(date[1], date[2], date[3], _toogleNav);
    }
}

function _mostrardatos_SAL7411() {


    $("#factura_108").val($_LLAVEW);
    $("#nit_108").val($_NITNUM);
    $("#descrip_ter").val($_DESCRIPNUM);
    $("#convenio_108").val($_CONVENIONUM);
    $("#dconvenio_108").val($_DESCRIPTAR);
    $("#estado_108").val($_ESTADONUM);
    $("#retencion_108").val($_PORCRETENCNUM);
    $("#bloq_108").val($_SEGRIPSNUMW);
    $("#pic_108").val($_CTAPICNUM);
    $("#idpaciente_108").val($_IDPACNUM);
    $("#nombrepac_108").val($_DESCRIPPACINUM);
    // $_EDADPACW = $_FECHANACPAC - $_ANOACTUALW; 
    // $("#edad_108").val($_EDADPACW); 
    $("#tipo_108").val($_TIPOFACTNUM);
    $("#habit_108").val($_HABNUM);
    $("#porcent_108").val($_PORCENCOPAGONUM);

    $_AÑOPACI_ING7411 = $_FECHAINGNUM.substring(0, 4);
    $_MESPACI_ING7411 = $_FECHAINGNUM.substring(4, 6);
    $_DIAPACI_ING7411 = $_FECHAINGNUM.substring(6, 8);
    $_HORAPACI_ING7411 = $_HORAINGNUMW.substring(0, 2)
    $_MINPACI_ING7411 = $_HORAINGNUMW.substring(2, 4)

    $_AÑOPACI_RET7411 = $_FECHASALNUM.substring(0, 4);
    $_MESPACI_RET7411 = $_FECHASALNUM.substring(4, 6);
    $_DIAPACI_RET7411 = $_FECHASALNUM.substring(6, 8);
    $_HORAPACI_RET7411 = $_HORARETNUMW.substring(0, 2)
    $_MINPACI_RET7411 = $_HORARETNUMW.substring(2, 4)

    $("#fechaing_108").val($_AÑOPACI_ING7411 + '/' + $_MESPACI_ING7411 + '/' + $_DIAPACI_ING7411 + ' ' + $_HORAPACI_ING7411 + ':' + $_MINPACI_ING7411);
    $("#fechasal_108").val($_AÑOPACI_RET7411 + '/' + $_MESPACI_RET7411 + '/' + $_DIAPACI_RET7411 + ' ' + $_HORAPACI_RET7411 + ':' + $_MINPACI_RET7411);
    $("#servicio_108").val($_SERVICIONUM);
    $("#redext_108").val($_REDEXTERNUM);
    $("#contrato_108").val($_CONTRATONUM);
    $("#precapit_108").val($_PRECAPITNUM);
    $("#capit_108").val($_NROCAPITNUM);
    $("#division_108").val($_DIVISIONNUM);
    $("#formadepago_108").val($_FORMACOPAGNUM);
    $("#envio_108").val($_ENVIONUM);
    $("#costos_108").val($_CCOSTONUM);
    $("#observacion_108").val($_OBSERVNUM);
    $("#ctrlcont_108").val($_CONTROLCAPNUM);
    // $("#cl_108").val()
    $("#detalle_108").val($_DETALLENUM);
    // $("#bol_108").val();      
    $("#tipopaci_108").val($_TIPOPACINUM);
    $("#mostrar_108").val($_CTLNROPACINUM);
    // $("#nivel_108").val()
    $("#codcis_108").val($_CISNUM);
    $("#myt_108").val($_MYTNUM);
    $("#ctrlxserv_108").val($_CONTROLXSERVNUM);
    $("#controlcl0_108").val($_CONTROLCL0);
    $("#controlcl1_108").val($_CONTROLCL1);
    $("#controlcl2_108").val($_CONTROLCL2);
    $("#controlcl3_108").val($_CONTROLCL3);
    $("#controlcl4_108").val($_CONTROLCL4);
    $("#controlcl5_108").val($_CONTROLCL5);
    $("#controlcl6_108").val($_CONTROLCL6)
    $("#controlcl7_108").val($_CONTROLCL7);
    $("#artconiva_108").val($_ARTIVANUM);
    $("#nropol_108").val($_NROPOLNUM);
    $("#ruta_108").val($_RUTANUM);
    $("#est_108").val($_ESTNUM);
    $("#clasificacion_108").val($_CLASIFNUM);
    $("#remitido_108").val($_ENTRAREMITNUM);
    $("#origen_108").val($_ORIGREMIT);
    $("#tipoevento_108").val($_TIPOEVENTONUM);
    $("#ciudad_108").val($_CIUDADNUM);
    $("#funauto_108").val($_FUNCAUTORINGNUM);
    $("#nroauto_108").val($_NROAUTORIZACIONNUM);
    $("#obserapertura_108").val($_OBSERAPERNUM);
    $("#creado_108").val($_OPERNUM);
    $("#creadod_108").val($_ANOCRENUM + '/' + $_MESCRENUM + '/' + $_DIACRENUM);
    // $("#modificado_108").val($_OPERMODNUM);
    $("#modificadod_108").val($_ANOMODNUM + '/' + $_MESMODNUM + '/' + $_DIAMODNUM);
    $("#bloqueo_108").val($_OPERBLOQNUM);

    if ($_NOVEDAD == '9') {
        _retiroregistro()
    }
}


/////////////////////////////////// VENTANAS O VALIDACIONES APARTE ////////////////////////////

function ventanaclave() {
    console.log('ventana clave')
    if ($_PREFIJOW == "A") {
        // CLAVE DE ACCESO 1 AMBULATORIO
        clavedeacceso({
            size: 'small',
            titulo: 'CLAVE DE ACCESO 1 AMBULATORIO',
            span: 'Digite la clave',
            nombrelabel: 'CLAVE',
        })
    }
    else {
        //CALVE DE ACCESO 2 P O T
        clavedeacceso({
            size: 'small',
            titulo: 'CLAVE DE ACCESO 2 P O T',
            span: 'Digite la clave',
            nombrelabel: 'CLAVE',
        })
    }
}

function clavedeacceso(parametros) {
    var ventanaacceso = bootbox.dialog({
        size: parametros.size,
        onEscape: false,
        title: parametros.titulo,
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group" id="clavea_108"> ' +
            '<label class="col-md-4 control-label" for="name">' + parametros.nombrelabel + '</label> ' +
            '<div class="col-md-6" id="search"> ' +
            '<input id="claveacceso_108" type="password" class="form-control input-md" data-orden="1"> ' +
            '<span class="help-block">' + parametros.span + '</span> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            confirm: {
                label: 'Aceptar',
                callback: function () {
                    $_SWCLAVEING = $("#claveacceso_108").val();
                    console.log($_SWCLAVEING, 'ver')
                    ventanaacceso.off('show.bs.modal');
                }
            }
        }
    });
    ventanaacceso.init(evaluarclave());
    ventanaacceso.on('shown.bs.modal', function () {
        $("#claveacceso_108").focus();
    });
}
function evaluarclave() {
    console.log('evaluarclave')
    _inputControl("disabled");
    validarInputs({
        form: '#clavea_108',
        orden: "1"
    },
        function () { _evaluarfactura() },
        _validarclave
    )
}
function _validarclave() {
    console.log('validarclave')
    $(".btn-primary").click();
    _validarcambioestado();
}

function _validarcambioestado() {
    console.log('validarcambiodeestado')
    if ($_SWCLAVEING.trim() == $_SWCLAVE.trim()) {
        console.log('$_SWCLAVEING')
        _cambiarestado_SAL7411();
    }
    else {
        console.log('ERROR')
        _volverventanaclave();

    }
}
function _volverventanaclave() {
    CON851('03', '03', null, 'error', 'error');
    setTimeout(ventanaclave, 500);
}







function _ventanaipsante() {
    var ventanaipsante = bootbox.dialog({
        size: 'xl',
        onEscape: false,
        title: 'VLR DE FACT Y COPAGO IPS ANT',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group" id= "ventaipsan_108"> ' +
            '<label class="col-md-4 control-label" for="name">' + 'NOMBRE IPS ANT:' + '</label> ' +
            '<div class="col-md-6"> ' +
            '<input id="nombreips_108" type="text" class="form-control input-md" data-orden="1"> ' +
            '</div> ' +
            '<label class="col-md-4 control-label" for="name">' + 'VLR FACT IPS ANT:' + '</label> ' +
            '<div class="col-md-6"> ' +
            '<input id="vlrfact_108" type="text" class="form-control input-md" data-orden="2"> ' +
            '</div> ' +
            '<label class="col-md-4 control-label" for="name">' + 'VLR COPA IPS ANT:' + '</label> ' +
            '<div class="col-md-6"> ' +
            '<input id="vlrcopa_108" type="text" class="form-control input-md" data-orden="3"> ' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '</div>',
        buttons: {
            main: {
                label: 'Aceptar',
                className: 'btn-info',
                callback: function () {
                    $_NOMBREANTIPS = $("#nombreips_108").val();
                    $_VLRFACTIPS = $("#vlrfact_108").val();
                    $_VLRCOPAIPS = $("#nombreips_108").val();
                    ventanaipsante.off('show.bs.modal');
                }
            }
        }
    });
    ventanaipsante.init(validaripsante("1"));
    ventanaipsante.on('shown.bs.modal', function () {
        $("#nombreips_108").focus();
    });
    var valorfactMask = IMask($("#vlrfact_108")[0], { mask: Number, thousandsSeparator: ",", min: 0, max: 999999999999 });
    var valorcopaMask = IMask($("#vlrcopa_108")[0], { mask: Number, thousandsSeparator: ",", min: 0, max: 999999999999 });
}
function validaripsante(orden) {
    _inputControl("disabled");
    validarInputs({
        form: '#ventaipsan_108',
        orden: orden
    },
        function () { validaripsante("1") },
        // _evaluarpaciente_SAL7411
        _aceptaripsante
    )
}
function _aceptaripsante() {
    $(".btn-info").click();
    $_PORCRETENCW = "00";
    $("#retencion_108").val($_PORCRETENCW);
    _datopic_SAL7411();
}

function BUSCARNUMERO(callback) {
    $_SECU1NUM = "9";
    $_SECU2NUM = $_PREFIJOW;

    if ($_NITUSU = "0800162035") {
        switch ($_SUCOPERW) {
            case "01":
                break;
            case "02":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "03":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "04":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "05":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "06":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "07":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "08":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "09":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "10":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "11":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "12":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "13":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "14":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "15":
                switch ($_PREFIJOW) {
                    case "A":
                        secu2 = "a";
                    case "P":
                        secu2 = "p";
                    case "T":
                        secu2 = "t";
                        break;
                }
            case "16":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
            case "09":
                switch ($_PREFIJOW) {
                    case "A":
                        $_SECU2NUM = "a";
                    case "P":
                        $_SECU2NUM = "p";
                    case "T":
                        $_SECU2NUM = "t";
                        break;
                }
                break;
            default:
                break;
        }
    }

    if (($_REDEXTER == "S") && ($_NITUSU == "0800162035")) {
        $_SECU2NUM = "X";
    }

    $_SECUNUM = $_SECU1NUM + $_SECU2NUM;
    callback();
}

function _calcularedad_7411() {

    console.log($_NACIMPACI, 'llega nac')
    $_FECHAINIW = $_NACIMPACI;
    $_FECHASISTEMA = moment().format('YYYYMMDD');
    $_FECHAACTW = $_FECHASISTEMA;
    $_ANOINIW = parseInt($_FECHAINIW.substring(0, 4));
    $_MESINIW = parseInt($_FECHAINIW.substring(4, 6));
    $_DIAINIW = parseInt($_FECHAINIW.substring(6, 8));
    $_ANOACTW = parseInt($_FECHAACTW.substring(0, 4));
    $_MESACTW = parseInt($_FECHAACTW.substring(4, 6));
    $_DIAACTW = parseInt($_FECHAACTW.substring(6, 8));
    // console.debug($_MESACTW, $_MESINIW);

    if (($_MESACTW == $_MESINIW) && ($_DIAACTW == $_DIAACTW) && ($_ANOACTW > $_ANOINIW)) {
        $_UNIDEDADW = 'A';
        $_VLREDADW = $_ANOACT - $_ANOINIW;
        $_VLREDADW = Math.round($_VLREDADW);
        $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
    }

    // console.debug($_MESACTW, $_MESINIW);
    // console.debug($_FECHAACTW, $_FECHAINIW);
    var mesesdias = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mesesmes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (var i = 0; i < mesesmes.length; i++) {
        if ($_MESACTW == mesesmes[i]) {
            $_NROMESW = mesesdias[i];
            // console.debug($_MESACTW, mesesdias[i]);
            break;
        }
    }

    // console.debug($_MESACTW, $_NROMESW);

    if (($_MESACTW > 2) && (($_ANOACTW == 1996) || ($_ANOACTW == 2000) || ($_ANOACTW == 2004) || ($_ANOACTW == 2008) || ($_ANOACTW == 2012) || ($_ANOACTW == 2016) || ($_ANOACTW == 2020) || ($_ANOACTW == 2024) || ($_ANOACTW == 2028) || ($_ANOACTW == 2032))) {
        $_NROMESW++;
    }
    // console.debug($_MESACTW, $_NROMESW);
    $_NRODIASACT = ($_ANOACTW * 365.25) + $_NROMESW + $_DIAACTW;
    $_NRODIASACT = Math.round($_NRODIASACT);


    for (var i = 0; i < mesesmes.length; i++) {
        if ($_MESINIW == mesesmes[i]) {
            $_NROMESW = mesesdias[i];
            // console.debug($_MESINIW, mesesdias[i]);
            break;
        }
    }

    if (($_MESINIW > 2) && (($_ANOINIW == 1996) || ($_ANOINIW == 2000) || ($_ANOINIW == 2004) || ($_ANOINIW == 2008) || ($_ANOINIW == 2012) || ($_ANOINIW == 2016) || ($_ANOINIW == 2020) || ($_ANOINIW == 2024) || ($_ANOINIW == 2028) || ($_ANOINIW == 2032))) {
        $_NROMESW = $_NROMESW + 1;
    }

    $_NRODIASINI = ($_ANOINIW * 365.25) + $_NROMESW + $_DIAINIW;
    $_NRODIASINI = Math.round($_NRODIASINI);

    // console.debug($_NRODIASACT, $_NRODIASINI);

    $_NRODIASEDAD = $_NRODIASACT - $_NRODIASINI;

    if ($_NRODIASEDAD == 0) {
        $_NRODIASEDAD = 1;
    }

    else if ($_NRODIASEDAD < 30) {
        $_UNIDEDADW = 'D';
        $_VLREDADW = $_NRODIASEDAD;
        $_VLREDADW = Math.round($_VLREDADW);
        $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
        _Calcularedad2_7767();
    }
    else {
        if ($_NRODIASEDAD < 365) {
            $_UNIDEDADW = 'M';
            $_VLREDADW = $_NRODIASEDAD / 30;
            $_VLREDADW = Math.round($_VLREDADW);
            $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
            _Calcularedad2_7767();
        }
        else {
            $_UNIDEDADW = 'A';
            $_VLREDADW = $_NRODIASEDAD / 365.25;
            _Calcularedad2_7767();
            $_VLREDADW = Math.round($_VLREDADW);
            $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
            if ($_VLREDADW == 0) {
                $_UNIDEDADW = 'M';
                $_VLREDADW = 11;
                $_VLREDADW = Math.round($_VLREDADW);
                $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
                _Calcularedad2_7767();
            }
        }
    }
}

function _Calcularedad2_7767() {
    if (($_UNIDEDADW == 'D') && ($_VLREDADW == 30)) {
        $_UNIDEDADW = 'M';
        $_VLREDADW = 1;
        $_EDADPACW = $_UNIDEDADW + $_VLREDADW;
    }
    if (($_UNIDEDADW == 'M') && ($_VLREDADW == 12)) {
        $_UNIDEDADW = 'A';
        $_VLREDADW = 1;
        $_EDADPACW = $_UNIDEDADW + $_VLREDADW;

    }
}