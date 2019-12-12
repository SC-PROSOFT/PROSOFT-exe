/* NOMBRE RM --> SER11A // NOMBRE ELECTR --> SAL71A */
var SAL71A = [];
var $_NovedSer71A, $_Arraycups71A, $_fechaact71A, $id_fila71A, $_especialidades71A;

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    _toggleF8([{
        input: 'codcups',
        app: '71A',
        funct: _ventanCups71A
    }, {
        input: 'espec',
        app: '71A',
        funct: _ventanEspec71A
    }, {
        input: 'atiende',
        app: '71A',
        funct: ventanPersonal71A
    }]);
    // Cargar JSON CUPS
    obtenerDatosCompletos({
        nombreFd: 'CUPS'
    }, (data) => {
        $_Arraycups71A = data.CODIGOS
        obtenerDatosCompletos({
            nombreFd: 'ESPECIALIDAD'
        }, (data) => {
            $_especialidades71A = data.ESPECIALIDADES
            CON850(_evaluarCON850_SAL71A);
        })
    })
});
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
function ventanPersonal71A(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        SER830({ seleccion: SAL71A.ATIENDE_ESCUP }, validarSexoAplica71A, function (data) {
            SAL71A.ATIENDE_ESCUP = data.COD
            document.querySelector('#descrPer71A').val = data.DESCRIP;
            validarIdEspec71A();
        })
    }
}

function _evaluarCON850_SAL71A(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    SAL71A['NOVEDADW'] = novedad.id;
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
// let res = data.split('|');
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
                let res = data['SAL71A_01'][0];
                switch (parseInt(SAL71A['NOVEDADW'])) {
                    case 7:
                        // Existe el CodCups
                        if (res.INVALID_CUPS == '00') { if (res.INVALID_ESCUPS == '01') on_restriccionCups71A(res); else CON851('00', '00', validarCodCup71A(), 'error', 'error'); }
                        // No existe el CodEscups
                        else { CON851('01', '01', validarCodCup71A(), 'error', 'error'); }
                        break;
                    case 8:
                    case 9:
                        if (res.INVALID_ESCUPS == '00' && res.INVALID_CUPS == '00') on_restriccionCups71A(res); else CON851('01', '01', validarCodCup71A(), 'error', 'error');
                        break;
                    default:
                        _toggleNav();
                        break;
                }
            })
        // .catch((error) => {
        //     console.log(error)
        // });
    }
}
function on_restriccionCups71A(data) {
    SAL71A.ESPECIALIDADES = data.TAB_ESPECCUPS;
    SAL71A.COD_CUP = data.COD_CUPS;
    SAL71A.DESCRIP_CUP = data.DESCRIP_CUP;
    SAL71A.FECHA_ESPCUP = data.FECHA;
    SAL71A.FINALIDAD_ESCUP = data.FINALIDAD == undefined ? SAL71A.FINALIDAD_ESCUP = '' : SAL71A.FINALIDAD_ESCUP = data.FINALIDAD;
    SAL71A.OPER_CUP = data.OPER;
    SAL71A.SEXO_ESCUP = data.SEXO;
    SAL71A.ATIENDE_ESCUP = data.ATIENDE;
    SAL71A.PYP = data.PYP;
    SAL71A.PROCEDIMIENTO_ESCUP = data.TIP_PROC;

    if (SAL71A['NOVEDADW'] == '8' || SAL71A['NOVEDADW'] == '9') {
        document.querySelector('#codcups_71A').value = SAL71A.COD_CUP;
        document.querySelector('#descrip71A').value = SAL71A.DESCRIP_CUP;
        SAL71A.PYP == undefined ? document.querySelector('#pyp_71A').value = '' : document.querySelector('#pyp_71A').value = SAL71A.PYP;
        SAL71A.PROCEDIMIENTO_ESCUP == undefined ? document.querySelector('#proced71A').value = '' : document.querySelector('#proced71A').value = SAL71A.PROCEDIMIENTO_ESCUP;
        SAL71A.FINALIDAD_ESCUP == undefined ? document.querySelector('#finalidad71A').value = SAL71A.FINALIDAD_ESCUP = '' : document.querySelector('#finalidad71A').value = SAL71A.FINALIDAD_ESCUP;
        SAL71A.SEXO_ESCUP == undefined ? document.querySelector('#sexo71A').value = '' : document.querySelector('#sexo71A').value = SAL71A.SEXO_ESCUP;
        SAL71A.ATIENDE == undefined ? document.querySelector('#atiende_71A').value = '' : document.querySelector('#atiende_71A').value = SAL71A.ATIENDE_ESCUP;
        let fuente = [], especialidades = SAL71A.ESPECIALIDADES;
        for (var i = 0; i < especialidades.length; i++) {
            if (especialidades[i].COD_ESP != void 0 || especialidades[i].COD_ESP != null || especialidades[i].COD_ESP != undefined) {
                fuente += (`<tr><td>${i + 1}</td>` + `<td>${especialidades[i]['COD_ESP']}</td>` + `<td>${especialidades[i]['DESCRIP_ESP']}</td></tr>`)
            }
        }
        $('#tablaEspecialidades tbody').append(fuente);

    } else {
        document.getElementById('codcups_71A').value = SAL71A.COD_CUP;
        document.getElementById('descrip71A').value = SAL71A.DESCRIP_CUP;

    }
    validarPYP71A()
}

function validarPYP71A() {
    validarInputs({
        form: "#pyp",
        orden: '1'
    },
        validarCodCup71A,
        function () {
            SAL71A.PYP = document.getElementById('pyp_71A').value;
            if (SAL71A.PYP == 0 || SAL71A.PYP.length == 0) { document.getElementById('pyp_71A').value = 'N'; validarSexoAplica71A() }
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

async function ventanaFinalidad71A() {
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
            SAL71A.SEXO_ESCUP = document.getElementById('sexo71A').value;
            if (SAL71A.SEXO_ESCUP == void 0) { SAL71A.SEXO_ESCUP = 'N'; document.getElementById('sexo71A').value = SAL71A.SEXO_ESCUP; }
            else if (['M', 'm', 'F', 'f', 'N', 'n'].indexOf(SAL71A.SEXO_ESCUP) == -1) {
                CON851('03', '03', validarSexoAplica71A(), 'error', 'error');
            } else validarPersonalatiende_71A();
        }
    )
}

function validarPersonalatiende_71A() {
    validarInputs({
        form: "#personal71A",
        orden: '1'
    }, validarSexoAplica71A, function () {
        SAL71A.ATIENDE_ESCUP = document.getElementById('atiende_71A').value; SAL71A.ATIENDE_ESCUP ? SAL71A.ATIENDE_ESCUP : false;
        let personal = consult_atiendProf(SAL71A.ATIENDE_ESCUP)
        if (personal) {
            document.querySelector('#descrPer71A').value = SAL71A.ATIENDE_ESCUP + ' - ' + personal;
            validarIdEspec71A();

        } else CON851('03', '03', validarPersonalatiende_71A(), 'error', 'error');
    })
}


function validarIdEspec71A() {
    validarInputs({
        form: "#idespecialidad_71A",
        orden: '1'
    }, validarPersonalatiende_71A, function () {
        SAL71A.ID_ESP = document.getElementById('especialidad_71A').value
        if (SAL71A.ID_ESP > 0 && SAL71A.ID_ESP <= 50) {
            validarEspecialidad71A();
        } else { CON851('03', '03', validarIdEspec71A(), 'error', 'error') }
    })
}

function validarEspecialidad71A() {
    console.log('validarespecialidad')
    validarInputs({
        form: "#numespecialidad",
        orden: '1'
    }, validarIdEspec71A, function () {
        if (SAL71A.ESPECSELEC_COD == void 0) CON851('03', '03', validarEspecialidad71A(), 'error', 'error');
        else {
            //REPARAR ESTO
            let esp = $_especialidades71A.filter(function (espec) {
                if (SAL71A.ESPECSELEC_COD == espec.CODIGO) {
                    SAL71A.ESPECSELEC_DESCRIP = espec.NOMBRE;
                    SAL71A.ESPECSELEC_COD = document.getElementById('espec_71A').value;
                    SAL71A.ESPECSELEC_DESCRIP = document.getElementById('DescEsp_71A').value;
                    return true
                } else {CON851('03', '03', validarIdEspec71A(), 'error', 'error') return false}

            });
            if (esp) {
                switch (SAL71A.NOVEDADW) {
                    case '7': addfilaTablaEsp71A(); break;
                    case '8': editfilaTabla71A(); break;
                    default: break;
                }
            } else CON851('03', '03', validarEspecialidad71A(), 'error', 'error');
        }
    })
}

function addfilaTablaEsp71A() {
    console.log('agregar fila')
    document.getElementById('espec_71A').value = SAL71A.ESPECSELEC_COD;
    document.getElementById('DescEsp_71A').value = SAL71A.ESPECSELEC_DESCRIP;
    $('#tablaEspecialidades tbody').append(
        '<tr>' +
        '<td style="width:47px">' + $('#especialidad_71A').val() + '</td>' +
        '<td style="width:96px">' + $('#espec_71A').val() + '</td>' +
        '<td class="tooltip" style="width:125px;" data-placement="right">' + SAL71A.ESPECSELEC_DESCRIP + '</td>' +
        '</tr>'
    );
    $('.tooltip').attr('data-original-title', SAL71A.ESPECSELEC_DESCRIP);
    validarTablaEspec71A();
}

function validarTablaEspec71A(orden) {
    console.log('validartabla')
    validarTabla(
        {
            tabla: '#tablaEspecialidades',
            orden: orden,
            event_f3: grabar71A
        },
        _Especialidad71A,
        function () {
            validarEspecialidad71A();
        },
        grabar71A

    );
}

function _Especialidad71A(datos) {
    console.log('mover dentro tabla')
    var tabla = datos;
    $id_fila71A = tabla.rowIndex;
    console.debug('posicion actual', tabla.rowIndex)
    $('#especialidad_71A').val(tabla.cells[0].textContent);
    document.getElementById('especialidad_71A').style.textAlign = 'left';
    $('#espec_71A').val(tabla.cells[1].textContent);
    document.getElementById('espec_71A').style.textAlign = 'left';
    $('#DescEsp_71A').val(tabla.cells[2].textContent);
    document.getElementById('DescEsp_71A').style.textAlign = 'left';

    if (SAL71A.NOVEDADW == '7') {
        console.log('novedad 7')
        $('#especialidad_71A').val(''); $('#espec_71A').val(''); $('#DescEsp_71A').val('');
        validarEspecialidad71A();
    } else {
        validarEspecialidad71A();
    }
}


function editfilaTabla71A() {
    console.log('editar tabla')
    let nfila = parseInt($id_fila71A) - 1;
    let fila = $('#tablaEspecialidades tbody tr:eq(' + nfila + ')');
    let html = '<td>' + $('#especialidad_71A').val() +
        '</td><td>' + $('#espec_71A').val() +
        '</td><td>' + $('#DescEsp_71A').val() +
        '</td>';
    fila.html(html);

    validarTablaEspec71A();
}


function grabar71A() {
    let especialidades_envio, datos_envio;
    $('#tablaEspecialidades tbody').parents("tr").find("td")[1].each(function () {
        especialidades_envio += $(this).html() + ",";
    });
    console.debug(especialidades_envio + '|');
    var parametros, msj, respuesta;
    switch (parseInt(SAL71A['NOVEDAW'])) {
        case 7:
            SAL714A.FECHA_ESPCUP = moment().format("YYYYMMDD");
            parametros = SAL71A.COD_CUP + '|' + SAL71A.FECHA_ESPCUP + '|' + SAL71A.SEXO_ESCUP
                + '|' + SAL71A.ATIENDE_ESCUP + '|' + SAL71A.PYP + '|' + SAL71A.PROCEDIMIENTO_ESCUP + '|' +
                SAL71A.FINALIDAD_ESCUP + '|' + especialidades_envio + '|'
            msj = '¿DESEA GRABAR LOS DATOS?'
            respuesta = "Datos grabados corectamente"
            break;
        case 8:
            SAL714A.FECHA_ESPCUP = moment(SAL714A.FECHA_ESPCUP).format("YYYYMMDD");
            parametros = SAL71A.COD_CUP + '|' + SAL71A.FECHA_ESPCUP + '|' + SAL71A.SEXO_ESCUP
                + '|' + SAL71A.ATIENDE_ESCUP + '|' + SAL71A.PYP + '|' + SAL71A.PROCEDIMIENTO_ESCUP + '|' +
                SAL71A.FINALIDAD_ESCUP + '|' + especialidades_envio + '|'
            msj = '¿DESEA MODIFICAR EL REGISTRO?'
            respuesta = "Datos modificados corectamente"
            break;
        case 9:
            parametros = SAL71A.COD_CUP + '|'
            msj = '¿DESEA ELIMINAR EL REGISTRO?'
            respuesta = "El registro se eliminó con exito"
            break;

        default:
            break;
    }
    bootbox.confirm({
        size: "small",
        onEscape: false,
        message: msj,
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
                on_actualizar71A(parametros, SAL9714['NOVEDADW'], respuesta);

            } else {
                validarEspecialidad71A();
            }
        }
    });


}
function on_actualizar71A(parametros, novedad, respuesta) {
    postData({
        datosh: novedad + '|' + parametros
    }, get_url("APP/SALUD/SAL71A-02.DLL"))
        .then((data) => {
            if (data[0] == "00") {
                Alert({ titulo: 'Notificacion', mensaje: respuesta })
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
    CON850(_evaluarCON850_SAL71A);
}