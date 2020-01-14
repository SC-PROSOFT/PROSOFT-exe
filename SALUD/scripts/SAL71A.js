/* NOMBRE RM --> SER11A // NOMBRE ELECTR --> SAL71A */
/* PO - PABLO OLGUIN 16/12/2019 -> FINALIZADO*/
var SAL71A = [];
var $_NovedSer71A, $_Arraycups71A, $_fechaact71A, $id_fila71A, $_especialidades71A;

$(document).ready(function () {
    loader('hide');
    $('#guardar_sal71A').hide();
    _inputControl('reset'); _inputControl('disabled');
    _toggleF8([
        { input: 'codcups', app: '71A', funct: _ventanCups71A },
        { input: 'espec', app: '71A', funct: _ventanEspec71A }
    ]);
    iniciarObjetosFNF8();
});
function iniciarObjetosFNF8() {
    SAL71A = []; $_Arraycups71A = [], $_especialidades71A = [];
    obtenerDatosCompletos({ nombreFd: 'CUPS' }, (data) => {
        $_Arraycups71A = data.CODIGOS;
        obtenerDatosCompletos({ nombreFd: 'ESPECIALIDAD' }, (data) => {
            $_especialidades71A = data.ESPECIALIDADES;
            CON850(_evaluarCON850_SAL71A);
        }, 'OFF')
    }, 'ON')
}
// --> F8 CUPS //
function _ventanCups71A(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CODIGOS CUPS",
            columnas: ["LLAVE", "DESCRIP"],
            data: $_Arraycups71A,
            callback_esc: () => { CON850(_evaluarCON850_SAL71A) },
            callback: (data) => {
                SAL71A.COD_CUP = data.LLAVE; SAL71A.DESCRIP_CUP = data.DESCRIP;
                document.querySelector('#codcups_71A').value = SAL71A.COD_CUP;
                _enterInput('#codcups_71A');
            }
        });
    }
}
function _ventanEspec71A(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE ESPECIALIDADES",
            columnas: ["CODIGO", "NOMBRE"],
            data: $_especialidades71A,
            callback_esc: () => { CON850(_evaluarCON850_SAL71A) },
            callback: (data) => {
                SAL71A.ESPECSELEC_COD = data.CODIGO; SAL71A.ESPECSELEC_DESCRIP = data.NOMBRE;
                document.querySelector('#espec_71A').value = SAL71A.ESPECSELEC_COD;
                document.querySelector('#DescEsp_71A').value = SAL71A.ESPECSELEC_DESCRIP;
                _enterInput('#espec_71A');
            }
        });
    }
}

function _evaluarCON850_SAL71A(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    SAL71A.NOVEDADW = novedad.id;
    document.getElementById('oper_ser17A').value = localStorage.Usuario;
    document.getElementById('fecha_ser17A').value = moment().format('YYYY/MM/DD');
    switch (parseInt(novedad.id)) {
        case 7:
            validarCodCup71A();
            break;
        case 8:
        case 9:
            validarCodCup71A();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer71A').val(novedad.id + ' - ' + novedad.descripcion)
}

function validarCodCup71A() {
    validarInputs({
        form: "#codigoscups",
        orden: '1'
    },
        function () {
            CON850(_evaluarCON850_SAL71A);
        },
        evaluarCodCup71A
    )
}

function evaluarCodCup71A() {
    SAL71A.COD_CUP = document.getElementById('codcups_71A').value.trim();
    if (typeof SAL71A.COD_CUP == "undefined" || SAL71A.COD_CUP == void 0 || SAL71A.COD_CUP.length == 0) {
        CON851('03', '03', validarCodCup71A(), 'error', 'error');
    } else {
        datos_envio = datosEnvio() + SAL71A.COD_CUP.padEnd(15, ' ');
        postData({
            datosh: datos_envio
        }, get_url("APP/SALUD/SAL71A-01.DLL"))
            .then((data) => {
                console.log(data)
                let res = data['SAL71A_01'][0];
                switch (parseInt(SAL71A['NOVEDADW'])) {
                    case 7:
                        // Existe el CodCups
                        if (res.INVALID_CUPS == '00') { if (res.INVALID_ESCUPS == '01') on_restriccionCups71A(res); else CON851('00', '00', validarCodCup71A(), 'error', 'error'); }
                        // No existe el CodEscups
                        else { CON851('01', '01', validarCodCup71A(), 'error', 'error'); }
                        break;
                    case 8:
                        if (res.INVALID_ESCUPS == '00' && res.INVALID_CUPS == '00') on_restriccionCups71A(res); else CON851('01', '01', validarCodCup71A(), 'error', 'error');
                        break;
                    case 9:
                        if (res.INVALID_ESCUPS == '00' && res.INVALID_CUPS == '00') on_restriccionCups71A(res); else CON851('01', '01', validarCodCup71A(), 'error', 'error');
                        break;
                    default:
                        _toggleNav();
                        break;
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}
function on_restriccionCups71A(data) {
    SAL71A.ESPECIALIDADES = data.TAB_ESPECCUPS;
    SAL71A.COD_CUP = data.COD_CUPS;
    SAL71A.DESCRIP_CUP = data.DESCRIP_CUP;
    SAL71A.FECHA_ESPCUP = data.FECHA;
    SAL71A.FINALIDAD_ESCUP = data.FINALIDAD == undefined ? SAL71A.FINALIDAD_ESCUP = '' : SAL71A.FINALIDAD_ESCUP = data.FINALIDAD;
    SAL71A.OPER_ESCUP = data.OPER;
    SAL71A.SEXO_ESCUP = data.SEXO;
    SAL71A.ATIENDE_ESCUP = data.ATIENDE;
    SAL71A.PYP = data.PYP;
    SAL71A.PROCEDIMIENTO_ESCUP = data.TIP_PROC;

    if (SAL71A['NOVEDADW'] == '8') {
        document.querySelector('#codcups_71A').value = SAL71A.COD_CUP;
        document.querySelector('#descrip71A').value = SAL71A.DESCRIP_CUP;
        SAL71A.PYP == undefined ? document.querySelector('#pyp_71A').value = '' : document.querySelector('#pyp_71A').value = SAL71A.PYP;
        SAL71A.PROCEDIMIENTO_ESCUP == undefined ? document.querySelector('#proced71A').value = '' : document.querySelector('#proced71A').value = SAL71A.PROCEDIMIENTO_ESCUP;
        SAL71A.FINALIDAD_ESCUP == undefined ? document.querySelector('#finalidad71A').value = SAL71A.FINALIDAD_ESCUP = '' : document.querySelector('#finalidad71A').value = SAL71A.FINALIDAD_ESCUP;
        SAL71A.SEXO_ESCUP == undefined ? document.querySelector('#sexo71A').value = '' : document.querySelector('#sexo71A').value = SAL71A.SEXO_ESCUP;
        SAL71A.ATIENDE_ESCUP == undefined ? document.querySelector('#atiende_71A').value = '' : document.querySelector('#atiende_71A').value = SAL71A.ATIENDE_ESCUP;
        SAL71A.ATIENDE_ESCUP == undefined ? document.querySelector('#descrPer71A').value = '' : document.querySelector('#descrPer71A').value = consult_atiendProf(SAL71A.ATIENDE_ESCUP);

        let fuente = [], especialidades = SAL71A.ESPECIALIDADES;
        for (var i = 0; i < especialidades.length; i++) {
            if (especialidades[i].COD_ESP != void 0 || especialidades[i].COD_ESP != null || especialidades[i].COD_ESP != undefined) {
                fuente += (`<tr><td >${cerosIzq((i + 1), 2)}</td>` + `<td>${especialidades[i]['COD_ESP']}</td>` + `<td>${especialidades[i]['DESCRIP_ESP']}</td></tr>`)
            }
        }
        $('#tablaEspecialidades tbody').append(fuente);
        validarPYP71A();
    } else if (SAL71A['NOVEDADW'] == '9') {
        eliminar71A(validarCodCup71A);
    }
    else {
        document.getElementById('codcups_71A').value = SAL71A.COD_CUP;
        document.getElementById('descrip71A').value = SAL71A.DESCRIP_CUP;
        SAL71A.OPER_ESCUP = localStorage['Usuario'];
        validarPYP71A();
    }
}

function validarPYP71A() {
    validarInputs({
        form: "#pyp",
        orden: '1'
    },
        validarCodCup71A,
        function () {
            SAL71A.PYP = document.getElementById('pyp_71A').value;
            if (SAL71A.PYP == 0 || SAL71A.PYP.length == 0) { document.getElementById('pyp_71A').value = 'N'; SAL71A.PYP = document.getElementById('pyp_71A').value = 'N'; validarSexoAplica71A() }
            else if (SAL71A.PYP == 's' || SAL71A.PYP == 'S') { ventanaTipProced71A() } else {
                if (SAL71A.PYP == 'N' || SAL71A.PYP == 'n') { validarSexoAplica71A() } else { CON851('03', '03', validarPYP71A(), 'error', 'error'); }
            }
        }
    )
}

function ventanaTipProced71A() {
    SAL71A.PROCEDIMIENTO_ESCUP = document.getElementById('proced71A').value;
    SER829(SAL71A.PROCEDIMIENTO_ESCUP, validarPYP71A, (data) => { SAL71A.PROCEDIMIENTO_ESCUP = data.COD; document.getElementById('proced71A').value = data.COD + ' - ' + data.DESCRIP; ventanaFinalidad71A(); })
}

function ventanaFinalidad71A() {
    SAL71A.FINALIDAD_ESCUP = document.getElementById('finalidad71A').value;
    setTimeout(() => {
        (SER834({ seleccion: SAL71A.FINALIDAD_ESCUP }, validarPYP71A, (data) => {
            SAL71A.FINALIDAD_ESCUP = data.COD; document.getElementById('finalidad71A').value = SAL71A.FINALIDAD_ESCUP + ' - ' + data.DESCRIP; validarSexoAplica71A();
        }))
    }, 400)
}

function validarSexoAplica71A() {
    validarInputs({
        form: "#sexoaplica",
        orden: '1'
    },
        validarPYP71A,
        function () {
            SAL71A.SEXO_ESCUP = document.getElementById('sexo71A').value.trim();
            if (SAL71A.SEXO_ESCUP == void 0 || SAL71A.SEXO_ESCUP.length == 0) {
                SAL71A.SEXO_ESCUP = 'N'; document.getElementById('sexo71A').value = SAL71A.SEXO_ESCUP;
                validarPersonalatiende_71A();
            }
            else if (['M', 'm', 'F', 'f', 'N', 'n'].indexOf(SAL71A.SEXO_ESCUP) == -1) {
                CON851('03', '03', validarSexoAplica71A(), 'error', 'error');
            } else validarPersonalatiende_71A();
        }
    )
}

function validarPersonalatiende_71A() {
    SAL71A.ATIENDE_ESCUP = document.querySelector('#atiende_71A').value.trim();
    SER830({ seleccion: SAL71A.ATIENDE_ESCUP }, validarSexoAplica71A, (data) => {
        document.querySelector('#atiende_71A').value = data.COD;
        document.querySelector('#descrPer71A').value = data.DESCRIP;
        validarIdEspec71A();
    })
}

//--------------------------------Funcionalidad Tabla Especialidades x Cups-------------------------------------------------------///
function validarIdEspec71A() {
    validarInputs({
        form: "#idespecialidad_71A",
        orden: '1'
    }, validarPersonalatiende_71A, function () {
        SAL71A.ID_ESP = document.getElementById('especialidad_71A').value.trim()
        if (SAL71A.ID_ESP.trim() == '') {
            switch (SAL71A.NOVEDADW) {
                case '7': addfilaTablaEsp71A(); break;
                case '8': editfilaTabla71A(); break;
                default: break;
            }
        } else {
            SAL71A.ID_ESP = cerosIzq(document.getElementById('especialidad_71A').value, 2)
            document.getElementById('especialidad_71A').value = cerosIzq(SAL71A.ID_ESP, 2);
            if (SAL71A.ID_ESP > 0 && SAL71A.ID_ESP <= 50) {
                validarEspecialidad71A();
            } else { CON851('03', '03', validarIdEspec71A(), 'error', 'error') }
        }
    })
}

function validarEspecialidad71A() {
    validarInputs({
        form: "#numespecialidad",
        orden: '1'
    }, validarIdEspec71A, function () {
        SAL71A.ESPECSELEC_COD = $('#espec_71A').val();
        SAL71A.ID_ESP = document.getElementById('especialidad_71A').value.trim()
        if (SAL71A.ID_ESP.trim() == '') {
            validarIdEspec71A();
        } else {
            if (SAL71A.ESPECSELEC_COD == void 0) CON851('03', '03', validarEspecialidad71A(), 'error', 'error');
            else {
                let esp = $_especialidades71A.find(especialidad => especialidad.CODIGO == SAL71A.ESPECSELEC_COD);
                if (typeof (esp) != 'undefined') {
                    SAL71A.ESPECSELEC_COD = esp.CODIGO;
                    SAL71A.ESPECSELEC_DESCRIP = esp.NOMBRE;
                    document.getElementById('espec_71A').value = SAL71A.ESPECSELEC_COD;
                    document.getElementById('DescEsp_71A').value = SAL71A.ESPECSELEC_DESCRIP;
                    switch (SAL71A.NOVEDADW) {
                        case '7': addfilaTablaEsp71A(); break;
                        case '8': editfilaTabla71A(); break;
                        default: break;
                    }
                } else CON851('03', '03', validarEspecialidad71A(), 'error', 'error');
            }
        }
    })
}

function addfilaTablaEsp71A() {
    $('#guardar_sal71A').show();
    let existe_registro = validarExistenciaRegistro71A();
    if (!existe_registro) {
        var fuente = `<tr>` +
            `<td style="text-align:left">${cerosIzq($('#especialidad_71A').val(), 2)}</td>` +
            `<td style="text-align:left">${$('#espec_71A').val()}</td>` +
            `<td style="text-align:left">${$('#DescEsp_71A').val()}</td>` +
            `</tr>`;
        $('#tablaEspecialidades tbody').append(fuente);
        validarTablaEspec71A();
    } else {
        corregirEspecialidad71A(existe_registro);
    }
}
function validarExistenciaRegistro71A() {
    const tableReg = document.getElementById('tablaEspecialidades');
    let found = false;
    //Recorre las filas existentes de la tabla
    for (let i = 0; i < tableReg.rows.length; i++) {
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        //Recorre todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            // Busqueda de coincidencias en la tabla
            if (cellsOfRow[0].textContent.trim() == cerosIzq($('#especialidad_71A').val(), 2).trim()) {
                found = cellsOfRow
            }

        }
    }
    return found;
}
function editfilaTabla71A() {
    $('#guardar_sal71A').show();
    let existe_registro = validarExistenciaRegistro71A();
    if (!existe_registro) {
        var fuente = `<tr>` +
            `<td style="text-align:left">${cerosIzq($('#especialidad_71A').val(), 2)}</td>` +
            `<td style="text-align:left">${$('#espec_71A').val()}</td>` +
            `<td style="text-align:left">${$('#DescEsp_71A').val()}</td>` +
            `</tr>`;
        $('#tablaEspecialidades > tbody > tr .tablaActivo').append(fuente);
        validarTablaEspec71A();
    } else {
        corregirEspecialidad71A(existe_registro);
    }
}
function validarTablaEspec71A(orden) {
    validarTabla(
        {
            tabla: '#tablaEspecialidades',
            orden: orden,
            event_f3: llenarEspecialidades71A
        },
        _Especialidad71A,
        function () {
            validarEspecialidad71A();
        },
        llenarEspecialidades71A

    );
}
$('#guardar_sal71A').click(function () {
    llenarEspecialidades71A()
});

function _Especialidad71A(datos) {
    var tabla = datos;
    $id_fila71A = tabla.rowIndex;
    if (SAL71A.NOVEDADW == '7') {
        console.log('novedad 7')
        let aux = cerosIzq((parseInt($('#especialidad_71A').val()) + 1), 2)
        $('#especialidad_71A').val(aux); $('#espec_71A').val(''); $('#DescEsp_71A').val('');
        validarEspecialidad71A();
    } else {
        validarEspecialidad71A();
    }
}

//--------------------------Corregir fila de la tabla de especialidades------------------------------------------------//
function corregirEspecialidad71A(registro) {
    validarInputs({
        form: "#numespecialidad",
        orden: '1'
    }, validarIdEspec71A, function () {
        SAL71A.ESPECSELEC_COD = $('#espec_71A').val()
        if (SAL71A.ESPECSELEC_COD == void 0) CON851('03', '03', validarEspecialidad71A(), 'error', 'error');
        else {
            let esp = $_especialidades71A.find(especialidad => especialidad.CODIGO == SAL71A.ESPECSELEC_COD);
            if (typeof (esp) != 'undefined') {
                SAL71A.ESPECSELEC_COD = esp.CODIGO;
                SAL71A.ESPECSELEC_DESCRIP = esp.NOMBRE;
                document.getElementById('espec_71A').value = SAL71A.ESPECSELEC_COD;
                document.getElementById('DescEsp_71A').value = SAL71A.ESPECSELEC_DESCRIP;
                switch (SAL71A.NOVEDADW) {
                    case '7': case '8': corregirfilaTablaEsp71A(registro); break;
                    default: break;
                }
            } else CON851('03', '03', validarEspecialidad71A(), 'error', 'error');
        }
    })
}
function corregirfilaTablaEsp71A(registro) {
    let existe_registro = validarRegistroExistente71A(registro);
    if (!existe_registro) {
        registro[0].textContent = cerosIzq($('#especialidad_71A').val());
        registro[1].textContent = $('#espec_71A').val();
        registro[2].textContent = $('#DescEsp_71A').val();
        validarTablaEspec71A();
    } else {
        CON851P('55', validarIdEspec71A(), corregirEspecialidad71A(existe_registro))
    }
}
function validarRegistroExistente71A(registro) {
    let found = false;
    if (registro[0].InnerHTML == cerosIzq($('#especialidad_71A').val(), 2).trim()) { found = registro }
    return found
}
//------------------------------------------------------------------------------------------------------------------------------//

function llenarEspecialidades71A() {
    let especialidades_envio = [];
    const tableReg = document.getElementById('tablaEspecialidades');
    let found = false;
    //Recorre las filas existentes de la tabla
    for (let i = 0; i < tableReg.rows.length; i++) {
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        //Recorre todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            // almacena los codigos de las especialidades existentes en la tabla
            SAL71A.ESPECIALIDADES[cellsOfRow[0].textContent - 1].COD_ESP = cellsOfRow[1].textContent;
            SAL71A.ESPECIALIDADES[cellsOfRow[0].textContent - 1].DESCRIP_ESP = cellsOfRow[2].textContent;
        }
    }
    let especialidades = SAL71A.ESPECIALIDADES;
    for (especialidad in especialidades) { if (especialidades[especialidad].COD_ESP.trim() != void 0) { especialidades_envio += cerosIzq(especialidades[especialidad].COD_ESP, 2) + ';' } }
    on_guardar71A(especialidades_envio);
}
function on_guardar71A(especialidades_envio) {
    switch (SAL71A.NOVEDADW) {
        case '7':
            SAL71A.FECHA_ESPCUP = moment().format("YYYYMMDD");

            SAL71A.PARAMS =
                SAL71A.COD_CUP.padEnd(12, ' ') + '|' + SAL71A.FECHA_ESPCUP + '|' + SAL71A.SEXO_ESCUP +
                '|' + SAL71A.ATIENDE_ESCUP + '|' + SAL71A.PYP + '|' + SAL71A.OPER_ESCUP + '|' + SAL71A.PROCEDIMIENTO_ESCUP + '|' +
                SAL71A.FINALIDAD_ESCUP + '|' + especialidades_envio + '|'

            CON851P('01', validarEspecialidad71A, on_actualizar71A)
            break;
        case '8':
            $fecha = SAL71A.FECHA_ESPCUP;
            SAL71A.FECHA_ESPCUP = $fecha;

            SAL71A.PARAMS =
                SAL71A.COD_CUP.padEnd(12, ' ') + '|' + SAL71A.FECHA_ESPCUP + '|' + SAL71A.SEXO_ESCUP
                + '|' + SAL71A.ATIENDE_ESCUP + '|' + SAL71A.PYP + '|' + SAL71A.OPER_ESCUP + '|' + SAL71A.PROCEDIMIENTO_ESCUP + '|' +
                SAL71A.FINALIDAD_ESCUP + '|' + especialidades_envio + '|'

            CON851P('01', validarEspecialidad71A, on_actualizar71A)
            break;
        case '9':
            eliminar71A(validarEspecialidad71A);
            break;

        default:
            break;
    }
}
function eliminar71A(escCallback) {
    SAL71A.PARAMS = SAL71A.COD_CUP + '|'
    CON851P('54', escCallback, on_actualizar71A)
}
function on_actualizar71A() {
    let datos_envio = datosEnvio() + SAL71A.NOVEDADW + '|' + SAL71A.PARAMS;
    postData({
        datosh: datos_envio
    }, get_url("APP/SALUD/SAL71A-02.DLL"))
        .then((data) => {
            if (data.split('|')[0] == "00") {
                CON851(data.split('|')[0], data.split('|')[1], limpiarCajas71A, 'success', 'success');
                limpiarCajas71A()
            } else {
                CON851('ERROR', 'ERROR AL ACTUALIZAR', validarEspecialidad71A(), 'error', 'error');
            };

        })
        .catch((error) => {
            console.log(error)
        });
}

function limpiarCajas71A() {
    _inputControl('reset');
    _inputControl('disabled');
    $('#tablaEspecialidades tbody').html('');
    CON850(_evaluarCON850_SAL71A);
}