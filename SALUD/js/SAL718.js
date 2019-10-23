/* NOMBRE RM --> SER102C // NOMBRE ELECTR --> SAL718 */

var $_NovSal718, $_COD_SERV, $_COD_CUPS;

$(document).ready(function () {

    _toggleF8([
        { input: 'grupoSal', app: '718', funct: _ventanaGrupo718 },
        { input: 'codCup', app: '718', funct: _ventanaCups718 },
        { input: 'centrCost', app: '718', funct: _ventanaCentrCosto718 },
        { input: 'cuentaTerc', app: '718', funct: _ventanaContab718 },
        { input: 'nitTerc', app: '718', funct: ventanaTerceros718 },
        { input: 'codPuc', app: '718', funct: _ventanaPUC718 }

    ]);

    ocultCajas718();
});

// F8 GRUPO-SERVICIO //
function _ventanaGrupo718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "GRUPOS DE SERVICIO",
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_gruposer',
            callback_esc: function () {
                _validarGrpo718()
            },
            callback: function (data) {
                console.debug(data);
                $('#grupoSal_718').val(data.codigo_grser.trim())
                $('#descrpGrupo718').val(data.descrip_grser.trim())
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
            tipo: 'mysql',
            db: 'datos_pros',
            tablaSql: 'sc_archcups',
            callback_esc: function () {
                _validarCUPS718()
            },
            callback: function (data) {
                console.debug(data);
                var cup = data.codigo;
                $('#codCup_718').val(cup.substring(2, 11))
                $('#descrpCups718').val(data.descripcion.trim())
                _enterInput('#codCup_718');
            }
        });
    }
}


// F8 CENTRO-COSTO //
function _ventanaCentrCosto718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CENTROS DE COSTO",
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_archcos',
            callback_esc: function () {
                _validaCentroCost718()
            },
            callback: function (data) {
                console.debug(data);
                $('#centrCost_718').val(data.codigo.trim())
                $('#descCosto718').val(data.descripcion.trim())
                _enterInput('#centrCost_718');
            }
        });
    }
}

// F8 CUENTA-MAYOR //
function _ventanaContab718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA PLAN DE CUENTAS",
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_archmae',
            callback_esc: function () {
                cuentTercero718()
            },
            callback: function (data) {
                console.debug(data);
                $('#cuentaTerc_718').val(data.llave_mae)
                $('#descrCta718').val(data.nombre_mae)
                _enterInput('#cuentaTerc_718');
            }
        });
    }
}

// F8 TERCEROS //
function ventanaTerceros718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana De Terceros',
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_archter',
            callback_esc: function () {
                terceroNit718()
            },
            callback: function (data) {
                var cedula = cerosIzq(data.cod_ter)
                $("#nitTerc_718").val(cedula)
                $("#nombreTer718").val(data.descrip_ter);
                _enterInput('#nombreTer718');
            }
        });
    }
}


// F8 CUENTA-MAYOR //
function _ventanaPUC718(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA PLAN DE CUENTAS",
            tipo: 'mysql',
            db: $CONTROL,
            tablaSql: 'sc_archmae',
            callback_esc: function () {
                cuentTercero718()
            },
            callback: function (data) {
                console.debug(data);
                $('#codPuc_718').val(data.llave_mae + ' - ' + data.nombre_mae)
                _enterInput('#codPuc_718');
            }
        });
    }
}

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
                        _consultaSql({
                            sql: `SELECT * FROM sc_gruposer  WHERE codigo_grser = '${$grupo718}'`,
                            db: $CONTROL,
                            callback: function (error, results, fields) {
                                if (error) throw error;
                                else {
                                    var datos = results[0]
                                    console.log(datos)
                                    if (results.length = !results.length) {
                                        CON851('01', '01', null, 'error', 'Error');
                                        _validarGrpo718()
                                    } else {
                                        $('#grupoSal_718').val(datos.codigo_grser.trim())
                                        $('#descrpGrupo718').val(datos.descrip_grser.trim())
                                        _validarCUPS718()

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
                        _consultaSql({
                            sql: `SELECT * FROM sc_archcups  WHERE codigo = '${$LLAVECUP}'`,
                            // sql: 'SELECT * FROM sc_archcups WHERE CONCAT(grupo_cup, nro_cup) LIKE "' + $LLAVECUP + '"',
                            db: 'datos_pros',
                            callback: function (error, results, fields) {
                                if (error) throw error;
                                else {
                                    var datos = results[0]
                                    console.log(results);
                                    if ($_NovSal718 == '7') {
                                        if (results.length = !results.length) {
                                            registroNuevo718()
                                        } else {
                                            CON851('00', '00', null, 'error', 'Error');
                                            _validarCUPS718()
                                        }
                                    } else {
                                        if (results.length = !results.length) {
                                            CON851('01', '01', null, 'error', 'Error');
                                            _validarCUPS718()
                                        } else {
                                            // $('#codCup_718').val(datos.nro_cup.trim())
                                            // $('#descrpCups718').val(datos.descrip_cup.trim())
                                            // tipoSer718();
                                            consultDatos718()
                                        }
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


function consultDatos718() {

    console.debug('envio DLL  ' + $LLAVECUP)
    let datos_envio = datosEnvio()
    datos_envio += '|'
    datos_envio += $LLAVECUP
    SolicitarDll({ datosh: datos_envio }, mostrarDatos718, get_url('/APP/SALUD/SAL718C.DLL'));

}

function mostrarDatos718(data) {
    console.debug(data);
    var date = data.split('|');

    $TIPOSERV718 = date[2].trim();
    $CODABREV718 = date[3].trim();
    $DURACION718 = date[4].trim();
    $NIVE718 = date[5].trim();
    $COPAGO718 = date[6].trim();
    $NOPOS718 = date[7].trim();
    $CIS718 = date[8].trim();
    $EDADMIN718 = date[9].trim();
    $EDADMAX718 = date[10].trim();
    $UNIDMED718 = date[11].trim();
    $SEXO718 = date[12].trim();
    $DIAGN718 = date[13].trim();
    $COSTO718 = date[14].trim();
    $NOMCOSTO718 = date[15].trim();
    $MEDICO718 = date[16].trim();
    $PORC_CLIN718 = date[17].trim();
    $PORC_OTR718 = date[18].trim();
    $CTA_OTR718 = date[19].trim();
    $NIT_OTR718 = date[20].trim();
    $CTA_1CONT718 = date[21].trim();
    $CTA_2CONT718 = date[22].trim();
    $CTA_3CONT718 = date[23].trim();
    $DIVIS718 = date[24].trim();
    $DIVIS2718 = date[25].trim();
    $DESCRP718 = date[26].trim();
    $OPERAD718 = date[27].trim();
    $FECHA718 = date[28].trim();


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
    $('#nitTerc_718').val($NIT_OTR718);
    $('#codPuc_718').val($CTA_1CONT718);
    $('#codCoop_718').val($CTA_3CONT718);
    $('#codOfic_718').val($CTA_2CONT718);
    $('#divSal1_718').val($DIVIS718);
    $('#divSal2_718').val($DIVIS2718);
    $('#operador718').val($OPERAD718);


    var fechac718 = $FECHA718
    $('#fecha718').val(fechac718.substring(2, 8))


    psre()
}



function registroNuevo718() {
    $grpCps718 = $('#codCup_718').val()
    $dcpCps718 = $('#descrpCups718').val()

    tipoSer718();
}


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
        function () { _nivelAcompl718(); }
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
                $_PAGO718 = data.DESCRIP.trim()
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
                if ($_USUA_GLOBAL[0].NIT == 830092718) {
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
    var datoCIS718 = [
        { "COD": "1", "DESCRIP": "Si" },
        { "COD": "2", "DESCRIP": "No" }
    ]
    POPUP({
        array: datoCIS718,
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
            case '4':
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
        callback_f: unidadMedida718
    }, function (data) {
        switch (data.COD.trim()) {
            case '1':
            case '2':
                $('#sexo718').val(data.DESCRIP.trim())
                $_SEXOPAC718 = data.COD.trim()
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
        callback_f: sexoPaciente718
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
        validarIngTercer718
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
            if ($_USUA_GLOBAL[0].NIT == 830092718 && parseFloat($ingrTerc718) == 0 || parseFloat($ingrTerc718) == '') {
                codigoHeon718()
                // } else if (parseFloat($ingrTerc718) == 0 || parseFloat($ingrTerc718) == '') {
                //     console.debug('si')
                //     validarPUC718();
            } else if ($_USUA_GLOBAL[0].NIT == 830092718) {
                cuentTercero718();
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
                                        _validarGrpo718()
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
    $nitterc718 = $('#nitTerc_718').val();

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
                                _validarGrpo718()
                            } else {
                                $('#nitTerc_718').val(datos.cod_ter)
                                $('#nombreTer718').val(datos.descrip_ter)
                                psre()

                            }
                        }
                    }
                })
                break;
        }
    }
}


function codigoHeon718() {
    validarInputs(
        {
            form: "#codgHeon718",
            orden: '2'
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
        function () { psre(); }
    )
}









function psre() {
    console.debug('kfldfd')
}



function _limpiarDatos101(data) {
    _inputControl('reset');
    _toggleNav();
    var temp = data.split('|')
    console.log(temp)
    if (temp[0].trim() == '00') {
        var mensaje
        switch (parseInt($_NovSal718)) {
            case 7:
                mensaje = "Creado Correctamente"
                break;
            case 8:
                mensaje = "Modificado correctamente"
                break;
            case 9:
                mensaje = "Eliminado correctamente"
                break;
        }
        jAlert({ titulo: 'Notificacion', mensaje: mensaje })
    } else {
        CON852(temp[0], temp[1], temp[2]);
    }
}