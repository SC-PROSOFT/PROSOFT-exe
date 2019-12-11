/* NOMBRE RM --> SER102C // NOMBRE ELECTR --> SAL718 */

var $_NovSal718; var $nitterc718 = '0'; var $ingrTerc718 = '0'; var $_PUCUSU718; var $llavemae718 = '0', $_gruposer;
var SAL718 = [], $_cups, $_costos, $_ctamayor, $_terceros, $_cuentas, $_divisiones;


$(document).ready(function () {
    loader('hide');
    _toggleF8([
        { input: 'grupoSal', app: '718', funct: _ventanaGrupo718 },
        { input: 'codCup', app: '718', funct: _ventanaCups718 },
        { input: 'centrCost', app: '718', funct: _ventanaCentrCosto718 },
        { input: 'cuentaTerc', app: '718', funct: _ventanaContab718 },
        { input: 'nitTerc', app: '718', funct: ventanaTerceros718 },
        { input: 'codPuc', app: '718', funct: _ventanaPUC718 },
        { input: 'divSal1', app: '718', funct: _ventanaDivisUno718 },
        { input: 'divSal2', app: '718', funct: _ventanaDivisDos718 }

    ]);
    obtenerDatosCompletos({
        nombreFd: 'GRUPO-SER'
    }, (data) => {
        $_gruposer = data.CODIGOS
        obtenerDatosCompletos({
            nombreFd: 'CUPS'
        }, (data) => {
            $_cups = data.CODIGOS
            obtenerDatosCompletos({
                nombreFd: 'COSTOS'
            }, (data) => {
                $_costos = data.COSTO
                obtenerDatosCompletos({
                    nombreFd: 'CTA-MAYOR'
                }, (data) => {
                    $_cuentas = data.MAESTROS
                    obtenerDatosCompletos({
                        nombreFd: 'TERCEROS'
                    }, (data) => {
                        $_terceros = data.TERCEROS
                        obtenerDatosCompletos({
                            nombreFd: 'DIVISION'
                        }, (data) => {
                            $_divisiones = data.CODIGOS
                            // ocultCajas718();
                            setTimeout(CON850(_evaluarCON850), 250)

                        })
                    })
                })
            })
        })

    })
});
function on_datos718(){
    document.querySelector('#grupoSal_718').value
}
// F8 GRUPO-SERVICIO //
function _ventanaGrupo718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE GRUPOS DE SERVICIOS",
            columnas: ["COD", "DESCRIP"],
            data: $_gruposer,
            callback_esc: () => { _validarGrpo718() },
            callback: (data) => {
                console.debug(data,'data')
                SAL718.COD_SER = data.COD; SAL718.DESCRIP_SER = data.DESCRIP;
                document.querySelector('#grupoSal_718').value = data.COD;
                document.querySelector('#descrpGrupo718').value = data.DESCRIP;
                _enterInput('#grupoSal_718');
            }
        });
    }
}

// F8 CODCUPS //
function _ventanaCups718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CODIGOS CUPS",
            columnas: ["LLAVE", "DESCRIP", "INGR_CLIN", "INGR_TERC", "COD_CONTAB"],
            data: $_cups,
            callback_esc: () => { _validarCUPS718() },
            callback: (data) => {
                SAL718.COD_CUP = data.LLAVE; SAL718.DESCRIP_CUP = data.DESCRIP;
                document.querySelector('#codCup_718').value = data.COD_CUP;
                document.querySelector('#descrpCups718').value = data.DESCRIP_SER;
                _enterInput('#codCup_718');
            }
        });
    }
}

// F8 CENTRO-COSTO //
function _ventanaCentrCosto718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA CENTRO DE COSTO",
            columnas: ["COD", "NOMBRE"],
            data: $_costos,
            callback_esc: () => { _validaCentroCost718() },
            callback: (data) => {
                SAL718.COD_COSTO = data.COD; SAL718.DESCRIP_COSTO = data.NOMBRE;
                $('#centrCost_718').val(data.COD.trim())
                $('#descCosto718').val(data.NOMBRE.trim())
                _enterInput('#centrCost_718');
            }
        });
    }
}

// F8 CUENTA-MAYOR //
function _ventanaContab718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA CUENTA MAYOR",
            columnas: ["COD", "NOMBRE"],
            data: $_cuentas,
            callback_esc: () => { cuentTercero718() },
            callback: (data) => {
                SAL718.COD_CTAMAYOR = data.COD; SAL718.DESCRIP_CTAMAYOR = data.NOMBRE;
                $('#centrCost_718').val(data.COD.trim())
                $('#descCosto718').val(data.NOMBRE.trim())
                _enterInput('#centrCost_718');
            }
        });
    }
}

// F8 TERCEROS //
function ventanaTerceros718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE TERCEROS",
            columnas: ["COD", "NOMBRE"],
            data: $_terceros,
            callback_esc: () => { terceroNit718() },
            callback: (data) => {
                $("#nitTerc_718").val(cedula)
                $("#nombreTer718").val(data.NOMBRE);
                _enterInput('#nombreTer718');
            }
        });
    }
}

// F8 PLAN DE CUENTAS //
function _ventanaPUC718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        let data = _ventanaContab718(e)
        $('#codPuc_718').val(data.CTA_MAY + ' - ' + data.NOMBRE_MAE)
        _enterInput('#codPuc_718');
    }
}

// F8 DIVISION //
function _ventanaDivisUno718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE DIVISIONES",
            columnas: ["COD", "NOMBRE"],
            data: $_divisiones,
            callback_esc: () => { _validarDato() },
            callback: (data) => {
                $('#divSal1_718').val(data.COD);
                $('#descpCups1_718').val(data.DESCRIP);
                _enterInput('#divSal1_718');
            }

        });
    }
}

function _ventanaDivisDos718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        data = _ventanaDivisUno718(e);
        $('#divSal2_718').val(data.COD);
        $('#descpCups2_718').val(data.DESCRIP);
        _enterInput('#divSal2_718');
    }
}


// CONDICION POR NIT PARA CAMBIO DE CAJAS //
function ocultCajas718() {
    if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
        document.getElementById('cis_718').style.display = 'none';
        document.getElementById('HL_718').style.display = '';

        document.getElementById('nitTerce718').style.display = 'none';
        document.getElementById('codgHeon718').style.display = '';
        CON850(_evaluarCON850);

    } else {
        document.getElementById('cis_718').style.display = '';
        document.getElementById('HL_718').style.display = 'none';

        document.getElementById('nitTerce718').style.display = '';
        document.getElementById('codgHeon718').style.display = 'none';
        CON850(_evaluarCON850);
    }
}

// NOVEDAD //
function _evaluarCON850(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    console.debug(novedad)

    $_NovSal718 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarGrpo718();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novedSal718').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarGrpo718() {
    validarInputs(
        {
            form: "#validarGrupo718",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        function () {
            $grupo718 = $('#grupoSal_718').val();

            if ($grupo718.trim().length > 0) {
                switch ($grupo718) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _validarCUPS718()
                        break;
                    default:
                        let datos = $_gruposer.filter(grupo => grupo.COD.trim() == $grupo718.trim());
                        if (datos.length > 0) {
                            $('#grupoSal_718').val(datos.COD)
                            $('#descrpGrupo718').val(datos.DESCRIP)
                            _validarCUPS718()
                        } else {
                            CON851('01', '01', null, 'error', 'Error');
                            _validarGrpo718()
                        }
                        break;
                }
            }
        })
}
function _validarCUPS718() {
    validarInputs(
        {
            form: "#validarCUPS718",
            orden: '1'
        },
        function () { _validarGrpo718(); },
        function () {
            $grupoCups718 = $('#codCup_718').val();

            $LLAVECUP = $grupo718 + $grupoCups718;

            if ($grupoCups718.trim().length > 0) {
                switch ($grupoCups718) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _validarCUPS718()
                        break;
                    default:
                        let datos = $_cups.filter(grupo => grupo.COD.trim() == $grupoCups718.trim());
                        if ($_NovSal718 == '7') {
                            registroNuevo718()
                        } else {
                            _validarCUPS718()
                        }
                        if ($_NovSal718 == '8' || $_NovSal718 == '8') {
                            if (datos.length > 0) {
                                consultDatos718()
                            } else {
                                CON851('01', '01', null, 'error', 'Error');
                                _validarCUPS718()
                            }
                            break;
                        }
                }
            }
        })
}


function consultDatos718() {
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $LLAVECUP
    SolicitarDll({ datosh: datos_envio }, mostrarDatos718, get_url('/APP/SALUD/SAL718C.DLL'));
}

function mostrarDatos718(data) {
    console.debug(data);
    var date = data.split('|');

    $DESCRP718 = date[2].trim();
    $TIPOSERV718 = date[3].trim();
    $CODABREV718 = date[4].trim();
    $DURACION718 = date[5].trim();
    $NIVE718 = date[6].trim();
    $COPAGO718 = date[7].trim();
    $NOPOS718 = date[8].trim();
    $CIS718 = date[9].trim();
    $EDADMIN718 = date[10].trim();
    $EDADMAX718 = date[11].trim();
    $UNIDMED718 = date[12].trim();
    $SEXO718 = date[13].trim();
    $DIAGN718 = date[14].trim();
    $COSTO718 = date[15].trim();
    $NOMCOSTO718 = date[16].trim();
    $MEDICO718 = date[17].trim();
    $PORC_CLIN718 = date[18].trim();
    $PORC_OTR718 = date[19].trim();
    $CTA_OTR718 = date[20].trim();
    $NIT_OTR718 = date[21].trim();
    $CTA_1CONT718 = date[22].trim();
    $CTA_2CONT718 = date[23].trim();
    $CTA_3CONT718 = date[24].trim();
    $DIVIS718 = date[25].trim();
    $DIVIS2718 = date[26].trim();
    $OPERAD718 = date[27].trim();
    $FECHA718 = date[28].trim();
    $_PUCUSU718 = date[29].trim();

    if (date[0].trim() == '00') {
        if ($_NovSal718 == '7') {
            CON851('00', '00', null, 'error', 'Error');
            _validarCUPS718();
        }
        else {
            datosCompl718()
        }
    }
    else if (date[0].trim() == '01') {
        if ($_NovSal718 == '7') {
            registroNuevo718();
        }
        else {
            CON851('01', '01', null, 'error', 'Error');
            _validarCUPS718();
        }
    }
    else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }

}


function datosCompl718() {
    $('#descrpCups718').val($DESCRP718);
    $('#tipoServ718').val($TIPOSERV718);
    $('#codAbrev718').val($CODABREV718);
    $('#duracion718').val($DURACION718);
    $('#nivelComple718').val($NIVE718);
    $('#pagoPacient718').val($COPAGO718);
    $('#procedNO718').val($NOPOS718);
    $('#cis718').val($CIS718);
    $('#centrCost_718').val($COSTO718);
    $('#descCosto718').val($NOMCOSTO718);
    $('#edadMin718').val($EDADMIN718);
    $('#edadMax718').val($EDADMAX718);
    $('#undEdad718').val($UNIDMED718);
    $('#sexo718').val($SEXO718);
    $('#diagnt718').val($DIAGN718);
    $('#distrib718').val($MEDICO718);
    $('#ingrClin718').val($PORC_CLIN718);
    $('#ingreTerc718').val($PORC_OTR718);
    $('#cuentaTerc_718').val($CTA_OTR718);

    if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
        var datosep = $FECHA718
        $('#codHeon_718').val($OPERAD718 + ' ' + datosep.substring(2, 8))
    } else {
        $('#nitTerc_718').val($NIT_OTR718);
    }

    $('#codPuc_718').val($CTA_1CONT718);
    $('#codCoop_718').val($CTA_3CONT718);
    $('#codOfic_718').val($CTA_2CONT718);
    $('#divSal1_718').val($DIVIS718);
    $('#divSal2_718').val($DIVIS2718);
    $('#operador718').val($OPERAD718);
    var fechac718 = $FECHA718
    $('#fecha718').val(fechac718.substring(2, 8))

    // tipoSer718()
    continuarRegistro718()
}


function continuarRegistro718() {
    switch (parseInt($_NovSal718)) {
        case 8:
            tipoSer718();
            break;
        case 9:
            CON851P('54', _validarCUPS718, eliminarReg718)
            break;
    }
}


function eliminarReg718() {

    LLAMADO_DLL({
        dato: [$_NovSal718, $LLAVECUP],
        callback: function (data) {
            actualBD718(data, $LLAVECUP)
        },
        nombredll: 'SAL718-G',
        carpeta: 'SALUD'
    })
}


// NOVEDAD 7 //
function registroNuevo718() {
    // $grpCps718 = $('#codCup_718').val()
    $dcpCps718 = $('#descrpCups718').val()

    tipoSer718();
}

// NOVEDAD 8 //
function tipoSer718() {

    if ($_USUA_GLOBAL[0].NIT == 800156469) {
        var datoTipoEcoNit718 = [
            { "COD": "1", "DESCRIP": "Cirugias" },
            { "COD": "2", "DESCRIP": "Ecografias" },
            { "COD": "3", "DESCRIP": "Doppler" },
            { "COD": "4", "DESCRIP": "T.A.C" },
            { "COD": "5", "DESCRIP": "Resonancia Nuclear" },
            { "COD": "6", "DESCRIP": "Patologia y Citologia" },
            { "COD": "7", "DESCRIP": "Promocion y Prevencion" }
        ]

        POPUP({
            array: datoTipoEcoNit718,
            titulo: 'Tipo de Servicio?',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: _validarCUPS718
        }, function (data) {
            switch (data.COD.trim()) {
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                    $('#tipoServ718').val(data.COD.trim() + ' - ' + data.DESCRIP.trim())
                    $_SERV718 = data.COD.trim()
                    _validarAbrev718()
                    break;
            }
        })
    } else {
        var datoTipoServ718 = [
            { "COD": "1", "DESCRIP": "Cirugias" },
            { "COD": "2", "DESCRIP": "Laboratorio y Otros diag." },
            { "COD": "3", "DESCRIP": "RX Imagenologia" },
            { "COD": "4", "DESCRIP": "Estancia y Otros" },
            { "COD": "5", "DESCRIP": "Consulta y Terapias" },
            { "COD": "6", "DESCRIP": "Patologia y Citologia" },
            { "COD": "7", "DESCRIP": "Promocion y Prevencion" }
        ]

        POPUP({
            array: datoTipoServ718,
            titulo: 'Tipo de Servicio?',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: _validarCUPS718
        }, function (data) {
            switch (data.COD.trim()) {
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                    $('#tipoServ718').val(data.COD.trim() + ' - ' + data.DESCRIP.trim())
                    $_SERV718 = data.COD.trim()
                    _validarAbrev718()
                    break;
            }
        })
    }
}

function _validarAbrev718() {
    validarInputs(
        {
            form: "#validarCodAbrev718",
            orden: '1'
        },
        function () { tipoSer718(); },
        function () {
            $ABREV718 = $('#codAbrev718').val()
            _nivelAcompl718();
        }
    )
}


function _nivelAcompl718() {
    validarInputs(
        {
            form: "#validarNivel718",
            orden: '1'
        },
        function () { tipoSer718(); },
        function () {
            $NIVELAC = $('#nivelComple718').val()

            if ($NIVELAC == 1 || $NIVELAC == 2 || $NIVELAC == 3 || $NIVELAC == 4 || $NIVELAC == 5) {
                pagoPacient718();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _nivelAcompl718()
            }

        }
    )
}


function pagoPacient718() {
    var datoPago718 = [
        { "COD": "1", "DESCRIP": "Co-Pago" },
        { "COD": "2", "DESCRIP": "Cuota Moderada" },
        { "COD": "3", "DESCRIP": "No Aplica" }
    ]

    POPUP({
        array: datoPago718,
        titulo: 'Tipo de Pago',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: _validarAbrev718
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
            case '3':
                $('#pagoPacient718').val(data.COD.trim() + ' - ' + data.DESCRIP.trim())
                $_PAGO718 = data.COD.trim()
                setTimeout(procedNOPOS718, 300);
                break;
        }
    })
}


function procedNOPOS718() {
    var datoProcedm718 = [
        { "COD": "1", "DESCRIP": "Si" },
        { "COD": "2", "DESCRIP": "No" }
    ]
    POPUP({
        array: datoProcedm718,
        titulo: 'Procedimiento NO POS',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: pagoPacient718
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
                $('#procedNO718').val(data.DESCRIP.trim())
                $_NOPOS718 = data.DESCRIP.trim()
                if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
                    setTimeout(activarHL_718, 300);
                } else {
                    setTimeout(datoCIS718, 300);
                }
                break;
        }
    })
}

function activarHL_718() {
    var datoHL718 = [
        { "COD": "1", "DESCRIP": "Si" },
        { "COD": "2", "DESCRIP": "No" }
    ]
    POPUP({
        array: datoHL718,
        titulo: 'Activar HL7?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: procedNOPOS718
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
                $('#actHl718').val(data.DESCRIP.trim())
                $ACTHL = data.DESCRIP.trim()
                setTimeout(_validaCentroCost718, 300);
                break;
        }
    })
}

function datoCIS718() {
    var datCIS718 = [
        { "COD": "1", "DESCRIP": "Si" },
        { "COD": "2", "DESCRIP": "No" }
    ]
    POPUP({
        array: datCIS718,
        titulo: 'C.I.S?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: procedNOPOS718
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
                $('#cis718').val(data.DESCRIP.trim())
                $_CIS718 = data.DESCRIP.trim()
                setTimeout(_validaCentroCost718, 300);
                break;
        }
    })
}


function _validaCentroCost718() {
    validarInputs(
        {
            form: "#CentroCost718",
            orden: '1'
        },
        function () { datoCIS718(); },
        function () {

            $centroCosto718 = $('#centrCost_718').val();

            if ($centroCosto718.trim().length > 0) {
                switch ($centroCosto718) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _validaCentroCost718()
                        break;
                    default:
                        _consultaSql({
                            sql: `SELECT * FROM sc_archcos  WHERE codigo = '${$centroCosto718}'`,
                            db: $CONTROL,
                            callback: function (error, results, fields) {
                                if (error) throw error;
                                else {
                                    var datos = results[0]
                                    console.log(datos)
                                    if (results.length > 0) {
                                        $('#centrCost_718').val(datos.codigo.trim())
                                        $('#descCosto718').val(datos.descripcion.trim())
                                        datosEdad718()
                                    }
                                }
                            }
                        })
                        break;
                }
            }
        }
    )
}

function datosEdad718() {
    validarInputs(
        {
            form: "#edadMinim718",
            orden: '1'
        },
        function () { _validaCentroCost718(); },
        function () { unidadMedida718() }
    )
}

function unidadMedida718() {
    var unidadMed718 = [
        { "COD": "1", "DESCRIP": "Años" },
        { "COD": "2", "DESCRIP": "Meses" },
        { "COD": "3", "DESCRIP": "Dias" },
        { "COD": "4", "DESCRIP": "No aplica" }
    ]
    POPUP({
        array: unidadMed718,
        titulo: 'Unidad de Medida',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: datosEdad718
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
            case '3':
                $('#undEdad718').val(data.DESCRIP.trim())
                $UNIDMED718 = data.DESCRIP.trim()
                setTimeout(sexoPaciente718, 300);
                break;
        }
    })
}

function sexoPaciente718() {
    var datoSexo718 = [
        { "COD": "1", "DESCRIP": "Femenino" },
        { "COD": "2", "DESCRIP": "Masculino" }
    ]
    POPUP({
        array: datoSexo718,
        titulo: 'Sexo',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: datosEdad718
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
                $('#sexo718').val(data.DESCRIP.trim())
                $_SEXOPAC718 = data.DESCRIP.trim()
                setTimeout(diagnostRips718, 300);
                break;
        }
    })
}

function diagnostRips718() {
    var datoRips718 = [
        { "COD": "1", "DESCRIP": "Si" },
        { "COD": "2", "DESCRIP": "No" }
    ]
    POPUP({
        array: datoRips718,
        titulo: 'RIPS?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: datosEdad718
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
                $('#diagnt718').val(data.DESCRIP.trim())
                $DIAGNRIPS718 = data.DESCRIP.trim()
                setTimeout(ingresoMedico718, 300);
                break;
        }
    })
}

function ingresoMedico718() {
    var datoMedico718 = [
        { "COD": "1", "DESCRIP": "Si" },
        { "COD": "2", "DESCRIP": "No" }
    ]
    POPUP({
        array: datoMedico718,
        titulo: 'Ingreso 100% para el medico?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: diagnostRips718
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
                $('#distrib718').val(data.DESCRIP.trim())
                $INGRESMED718 = data.DESCRIP.trim()
                setTimeout(validarPUC718, 300);
                break;
            case '2':
                $('#distrib718').val(data.DESCRIP.trim())
                $INGRESMED718 = data.DESCRIP.trim()
                ingresoClinica718();
                break;
        }
    })
}

function ingresoClinica718() {
    validarInputs(
        {
            form: "#ingreClinco718",
            orden: '1'
        },
        function () { ingresoMedico718(); },
        function () { validarIngTercer718() }
    )
}

function validarIngTercer718() {
    $ingrClinc718 = $('#ingrClin718').val();
    validarInputs(
        {
            form: "#ingresoTercer718",
            orden: '1'
        },
        function () { ingresoClinica718(); },
        function () {
            $ingrTerc718 = $('#ingreTerc718').val();
            console.debug($ingrTerc718);
            if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162 && parseFloat($ingrTerc718) == 0 || parseFloat($ingrTerc718) == '') {
                codigoHeon718()
            } else if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
                cuentTercero718();
            }
            if (parseFloat($ingrTerc718) == 0 || parseFloat($ingrTerc718) == '') {
                validarPUC718()
            } else {
                cuentTercero718()
            }
        }
    )
}

function cuentTercero718() {
    validarInputs(
        {
            form: "#cuentaIngreso718",
            orden: '1'
        },
        function () { validarIngTercer718(); },
        function () {
            $llavemae718 = $('#cuentaTerc_718').val();

            if ($llavemae718.trim().length > 0) {
                switch ($llavemae718) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _validarCUPS718()
                        break;
                    default:
                        _consultaSql({
                            sql: `SELECT * FROM sc_archmae  WHERE llave_mae = '${$llavemae718}'`,
                            db: $CONTROL,
                            callback: function (error, results, fields) {
                                if (error) throw error;
                                else {
                                    var datos = results[0]
                                    console.log(datos)
                                    if (results.length = !results.length) {
                                        CON851('01', '01', null, 'error', 'Error');
                                        cuentTercero718()
                                    } else {
                                        $('#cuentaTerc_718').val(datos.llave_mae.trim())
                                        $('#descrCta718').val(datos.nombre_mae.trim())
                                        terceroNit718()
                                    }
                                }
                            }
                        })
                        break;
                }
            }
        }
    )
}

function terceroNit718() {
    validarInputs(
        {
            form: "#nitTerce718",
            orden: '1'
        },
        function () { cuentTercero718(); },
        function () {
            $nitterc718 = parseFloat($('#nitTerc_718').val())
            // parseFloat($ingrTerc718);
            if ($nitterc718.trim().length > 0) {
                switch ($nitterc718) {
                    case false:
                        CON851('01', '01', null, 'error', 'error');
                        _validarCUPS718()
                        break;
                    default:
                        _consultaSql({
                            sql: `SELECT * FROM sc_archter  WHERE cod_ter = '${$nitterc718}'`,
                            db: $CONTROL,
                            callback: function (error, results, fields) {
                                if (error) throw error;
                                else {
                                    var datos = results[0]
                                    console.log(datos)
                                    if (results.length = !results.length) {
                                        CON851('01', '01', null, 'error', 'Error');
                                        terceroNit718()
                                    } else {
                                        $('#nitTerc_718').val(datos.cod_ter)
                                        $('#nombreTer718').val(datos.descrip_ter)
                                        validarPUC718()
                                    }
                                }
                            }
                        })
                        break;
                }
            }
        }
    )
}

function codigoHeon718() {
    validarInputs(
        {
            form: "#codgHeon718",
            orden: '1'
        },
        function () { validarIngTercer718(); },
        function () { validarPUC718() }
    )
}


function validarPUC718() {
    validarInputs(
        {
            form: "#codigoPUC718",
            orden: '1'
        },
        function () { ingresoClinica718(); },
        function () {
            if ($_SERV718 == 6) {
                $('#codPuc_718').val('41250400050');
                $('#codOfic_718').val('43124800001');
            }
            validarPucUsu718();
            // } else {
            //     division718()
            // }
        }
    )
}


function validarPucUsu718() {
    // alert($_PUCUSU718)
    switch ($_PUCUSU718) {
        case '1':
            $('#codPuc_718').val($CTA_1CONT718);
            division718();
            break;
        case '2':
            $('#codCoop_718').val($CTA_3CONT718);
            division718();
            break;
        case '3':
            $('#codPuc_718').val(CTA_1CONT718);
            division718();
            break;
        case '4':
            $('#codOfic_718').val(CTA_2CONT718);
            division718();
            break;
        case '6':
            $('#codOfic_718').val(CTA_2CONT718);
            division718();
            break;
    }
}



function division718() {
    validarInputs(
        {
            form: "#divis718",
            orden: '1'
        },
        function () { validarPUC718(); },
        function () {
            $divUno718 = $('#divSal1_718').val();
            divisionDos718();
        }
    )
}

function divisionDos718() {
    validarInputs(
        {
            form: "#divisDos718",
            orden: '1'
        },
        function () { division718(); },
        function () {
            $divDos718 = $('#divSal2_718').val();
            // psre();
            envioDatos718()
        }
    )
}


function envioDatos718() {

    var DESCRIP718 = espaciosDer($('#descrpCups718').val(), 80)
    var DURAC718 = cerosIzq($('#duracion718').val(), 3)
    var NOPOS718 = $_NOPOS718.substring(0, 1)
    var DATCIS718 = $_CIS718.substring(0, 1)
    var $EdadMin718 = cerosIzq($('#edadMin718').val(), 3)
    var $EdadMax718 = cerosIzq($('#edadMax718').val(), 3)
    var MEDIDA718 = $UNIDMED718.substring(0, 1)
    var SEXO718 = $_SEXOPAC718.substring(0, 1)
    var DIAGN718 = $DIAGNRIPS718.substring(0, 1)
    var INTRGMED718 = $INGRESMED718.substring(0, 1)
    var $INGCLIN718 = $('#ingrClin718').val();
    var NITTERC718 = cerosIzq($nitterc718.trim(), 10);
    var $CODPUC718 = cerosIzq($('#codPuc_718').val(), 11);
    var $CODCOOP718 = cerosIzq($('#codCoop_718').val(), 11);
    var $CODOFIC718 = cerosIzq($('#codOfic_718').val(), 11);

    LLAMADO_DLL({
        dato: [$_NovSal718, $LLAVECUP, DESCRIP718, $_SERV718, $ABREV718, DURAC718, $NIVELAC, $_PAGO718, NOPOS718, DATCIS718,
            $centroCosto718, $EdadMin718, $EdadMax718, MEDIDA718, SEXO718, DIAGN718, INTRGMED718, $INGCLIN718, $ingrTerc718,
            $llavemae718, NITTERC718, $CODPUC718, $CODCOOP718, $CODOFIC718, $divUno718, $divDos718],
        callback: function (data) {
            actualizar718(data)
        },
        nombredll: 'SAL718-G',
        carpeta: 'SALUD'
    })

}


function actualizar718(data) {
    loader('hide');
    var rdll = data.split('|');
    console.log(rdll[0])
    if (rdll[0].trim() == '00') {
        switch (parseInt($_NovSal718)) {
            case 7:
                jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
                    function () {
                        terminar718();
                    });
                // error
                terminar718();
                break;
            case 8:
                jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
                    function () {
                        terminar718();
                    });
                // error
                terminar718();
                break;
            case 9:
                jAlert({ titulo: 'Notificacion', mensaje: 'DATO CREADO CORRECTAMENTE' },
                    function () {
                        terminar718();
                    });
                // error
                terminar718();
                break;
        }
    } else {
        CON852(rdll[0], rdll[1], rdll[2], _toggleNav);
    }
}

function terminar718() {
    _toggleNav();
    _inputControl('reset');
    _inputControl('disabled');

}

