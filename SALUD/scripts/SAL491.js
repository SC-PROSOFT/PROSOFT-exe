var f8comprob_sal491 = []
var f8pacientes_sal491 = []
var global_SAL491 = []
var claseServicio_491 = [
    { "codigo": "0", "descripcion": "DROGUERIA" },
    { "codigo": "1", "descripcion": "CIRUGIAS" },
    { "codigo": "2", "descripcion": "LAB. Y OTROS DIAG." },
    { "codigo": "3", "descripcion": "RX - IMAGENOLOGIA" },
    { "codigo": "4", "descripcion": "OTROS SERVICIOS" },
    { "codigo": "5", "descripcion": "CONSULTAS Y TERAPIAS" },
    { "codigo": "6", "descripcion": "PATOLOGIA" },
    { "codigo": "7", "descripcion": "PROMOCION Y PREVENCION" }]

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    _toggleF8([
        { input: 'claseservicio', app: 'SAL491', funct: _ventanaClases_491 },
        // { input: 'comprob', app: 'SAL491', funct: _ventanaIdHistoria_491 },
    ]);
    global_SAL491['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    global_SAL491['ADMIN_W'] = localStorage.getItem('Usuario').trim() ? localStorage.getItem('Usuario').trim() : false;
    global_SAL491['NITUSU'] = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0');
    inicio_sal491()
})

function _ventanaClases_491(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'TIPO DE SERVICIO',
            columnas: ["codigo", "descripcion"],
            data: claseServicio_491,
            callback_esc: function () {
                $('#claseservicio_SAL491').focus()
            },
            callback: function (data) {
                $('#claseservicio_SAL491').val(data.codigo)
                _enterInput('#claseservicio_SAL491');
            }
        });
    }
}

function _ventanaIdHistoria_491(e) {
    console.debug(e.which);
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        SER825(() => {$('#comprob_SAL491').focus()} , mostrarDatosCompletos_SAL491, '1')
    }
}

function mostrarDatosCompletos_SAL491(data) {
    console.log(data)
}

function cerrarArchivos_491() {
    _inputControl("reset");
    _inputControl("disabled");
    claseServicio_491 = []
    global_SAL491 = []
    f8comprob_sal491 = []
    _toggleNav()
}

function inicio_sal491() {
    var datos_envio_491 = datosEnvio()
    datos_envio_491 += global_SAL491.ADMIN_W
    datos_envio_491 += '|'

    let URL = get_url("app/CONTAB/CON003.DLL");

    postData({
        datosh: datos_envio_491
    }, URL)
        .then((data) => {
            loader("hide")
            var date = data.split('|');
            global_SAL491['NOMBRE_OPER'] = date[0].trim();
            global_SAL491['IDENT_OPER'] = date[1].trim();
            global_SAL491['SUC_OPER'] = date[2].trim();
            datoSucursal_491()
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}

function datoSucursal_491() {
    if (global_SAL491.PREFIJOUSU == "  ") {
        global_SAL491.PREFIJOUSU = "00";
        claseServicio_SAL491();
    }

    if ((global_SAL491.ADMIN_W == "GEBC") || (global_SAL491.ADMIN_W == "ADMI")) {
        $('#unidades_SAL491').val(global_SAL491.PREFIJOUSU)
        claseServicio_SAL491();
    }
    else {
        switch (global_SAL491.NITUSU) {
            // ESE SALUD YOPAL
            case "0844003225":
                if ((global_SAL491.SUC_OPER == "JL") || (global_SAL491.SUC_OPER == "CA") || (global_SAL491.SUC_OPER == "CS") || (global_SAL491.SUC_OPER == "PV") || (global_SAL491.SUC_OPER == "BC") || (global_SAL491.SUC_OPER == "LC") || (global_SAL491.SUC_OPER == "CV") || (global_SAL491.SUC_OPER == "HT") || (global_SAL491.SUC_OPER == "EM") || (global_SAL491.SUC_OPER == "HY") || (global_SAL491.SUC_OPER == "TL") || (global_SAL491.SUC_OPER == "MR")) {
                    global_SAL491.PREFIJOUSU = global_SAL491.SUC_OPER
                }
                else {
                    CON851('48', '48', null, 'error', 'error');
                    cerrarArchivos_491()
                }
                break;
            // SERVIMEDICOS
            case "0800162035":
                if ((global_SAL491.SUC_OPER == "01") || (global_SAL491.SUC_OPER == "03") || (global_SAL491.SUC_OPER == "05") || (global_SAL491.SUC_OPER == "06") || (global_SAL491.SUC_OPER == "07") || (global_SAL491.SUC_OPER == "08") || (global_SAL491.SUC_OPER == "10") || (global_SAL491.SUC_OPER == "11") || (global_SAL491.SUC_OPER == "12") || (global_SAL491.SUC_OPER == "14") || (global_SAL491.SUC_OPER == "15")) {
                    global_SAL491.PREFIJOUSU = global_SAL491.SUC_OPER
                }
                else {
                    CON851('48', '48', null, 'error', 'error');
                    cerrarArchivos_491()
                }
                break;
            // FAMEDIC
            case "0900405505":
                if ((global_SAL491.SUC_OPER == "01") || (global_SAL491.SUC_OPER == "02") || (global_SAL491.SUC_OPER == "03") || (global_SAL491.SUC_OPER == "04") || (global_SAL491.SUC_OPER == "05") || (global_SAL491.SUC_OPER == "06")) {
                    global_SAL491.PREFIJOUSU = global_SAL491.SUC_OPER
                }
                else {
                    CON851('48', '48', null, 'error', 'error');
                    cerrarArchivos_491()
                }
                break;
        }

    }
    $('#unidades_SAL491').val(global_SAL491.PREFIJOUSU)
    global_SAL491['SUC_W'] = global_SAL491.PREFIJOUSU
    claseServicio_SAL491();
}

function sucursal_SAL491() {
    validarInputs(
        {
            form: '#SU_491',
            orden: '1'
        },
        function () {
            cerrarArchivos_491();
        },
        function () {
            global_SAL491.SUC_W = $('#unidades_SAL491').val()
            claseServicio_SAL491()
        }
    )
}

function claseServicio_SAL491() {
    console.log('llega a clase servicio')
    validarInputs(
        {
            form: '#SERVICE_491',
            orden: '1'
        },
        function () {
            cerrarArchivos_491();
        },
        function () {
            global_SAL491['CL_W'] = $('#claseservicio_SAL491').val()

            if ((global_SAL491['CL_W'] == 0) && ($_USUA_GLOBAL[0]['SEG-MOV'] == "3")) {
                CON851B($_USUA_GLOBAL[0]['SEG-MOV']);
                sucursal_SAL491()
            } else {
                var Servicio = claseServicio_491.find(servicio => servicio.codigo == global_SAL491.CL_W)

                if (Servicio) {
                    $('#claseservicio_SAL491').val(Servicio.codigo + ' - ' + Servicio.descripcion)
                    nroComprob_491()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    claseServicio_SAL491()
                }
            }
        }
    )
}

function nroComprob_491() {
    validarInputs(
        {
            form: '#COMPR_491',
            orden: '1'
        },
        claseServicio_SAL491,
        function () {
            global_SAL491['NRO_W'] = $('#comprob_SAL491').val()

        }
    )
}