var $_TAX015 = {
    NOVEDAD: false,
    PLACAS: [],
    TERCEROS: [],
    MODALIDADES: [],
    COSTOS: []
};

var producidoEmpresa_tax015 = new IMask(
    document.getElementById('producEmpresa_tax015'),
    { mask: "00,00", min: 0, max: 9999, scale: 2, radix: ',' }
);

var fondoMantenim_tax015 = new IMask(
    document.getElementById('fondoMant_tax015'),
    { mask: "0,0", min: 0, max: 99, scale: 1, radix: ',' }
);

var fondoReposicion_tax015 = new IMask(
    document.getElementById('fondoReposicion_tax015'),
    { mask: "0,0", min: 0, max: 99, scale: 1, radix: ',' }
);

(() => {
    _inputControl('reset');
    _inputControl('disabled');
    placas_tax015();

    _toggleF8([
        { input: 'placa', app: 'tax015', funct: _ventanaVehiculos_tax015 },
        { input: 'propie', app: 'tax015', funct: _ventanaTerceros_tax015 },
        { input: 'modalidad', app: 'tax015', funct: _ventanaModalidades_tax015 },
        { input: 'costo', app: 'tax015', funct: _ventanaCostos_tax015 }
    ]);
})()

function _ventanaVehiculos_tax015(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de vehiculos',
            columnas: ["PLACA", "DESCRIP"],
            data: $_TAX015.PLACAS,
            callback_esc: function () {
                $("#placa_tax015").focus()
            },
            callback: function (data) {
                document.getElementById('placa_tax015').value = data.PLACA.trim()
                _enterInput('#placa_tax015');
            }
        });
    }
}

function _ventanaTerceros_tax015(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de terceros',
            columnas: ["COD", "NOMBRE"],
            data: $_TAX015.TERCEROS,
            callback_esc: function () {
                $("#propie_tax015").focus()
            },
            callback: function (data) {
                document.getElementById('propie_tax015').value = data.COD.trim()
                _enterInput("#propie_tax015");
            }
        });
    }
}

function _ventanaModalidades_tax015(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de modalidades',
            columnas: ["CODIGO", "DESCRIP"],
            data: $_TAX015.MODALIDADES,
            callback_esc: function () {
                $('#modalidad_tax015').focus();
            },
            callback: function (data) {
                document.getElementById('modalidad_tax015').value = data.CODIGO.trim()
                _enterInput('#modalidad_tax015');
            }
        });
    }
}

function _ventanaCostos_tax015(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de costos',
            columnas: ["CODIGO", "DESCRIP"],
            data: $_TAX015.COSTOS,
            callback_esc: function () {
                $("#costo_tax015").focus();
            },
            callback: function (data) {
                document.getElementById("costo_tax015").value = data.CODIGO.trim()
                _enterInput("#costo_tax015");
            }
        });
    }
}

function placas_tax015() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/TAX802.DLL"))
        .then(data => {
            $_TAX015.PLACAS = data.Carros;
            $_TAX015.PLACAS.pop();
            terceros_tax015();
        })
}

function terceros_tax015() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/CON802.DLL"))
        .then(data => {
            $_TAX015.TERCEROS = data.TERCEROS;
            $_TAX015.TERCEROS.pop();
            modalidades_tax015();
        })
}

function modalidades_tax015() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/TAX815.DLL"))
        .then(data => {
            $_TAX015.MODALIDADES = data.Modalidad;
            $_TAX015.MODALIDADES.pop()
            costos_tax015()
        })
}

function costos_tax015() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/CON803.DLL"))
        .then(data => {
            console.log(data)
            $_TAX015.COSTOS = data.COSTO;
            $_TAX015.COSTOS.pop();
            CON850(_evaluarNovedad_tax015);
        })
}

function _evaluarNovedad_tax015(data) {
    _inputControl('reset');
    _inputControl('disabled');

    if (data.id != 'F') {
        $_TAX015.NOVEDAD = data.id
        document.getElementById('novedad_tax015').value = data.id + ' - ' + data.descripcion
        evaluarPlaca_tax015()
    } else {
        _toggleNav();
    }
}

function evaluarPlaca_tax015() {
    validarInputs(
        {
            form: "#fasePlaca",
            orden: "1"
        },
        () => { CON850(_evaluarNovedad_tax015) },
        _validarPlaca_tax015
    )
}

function _validarPlaca_tax015() {
    var idPlaca = document.getElementById('placa_tax015').value,
        busqueda = $_TAX015.PLACAS.find(e => {
            return e.PLACA == idPlaca.toUpperCase();
        })

    if (busqueda && $_TAX015.NOVEDAD != '7') {
        //  cargar datos vehiculo postData --> tax015-1.dll
        if ($_TAX015.NOVEDAD == '8') {
            evaluarPropietario_tax015();
        } else {
            CON850_P(function (e) {
                if (e.id == 'S') {
                    var datos_envio = datosEnvio();
                    datos_envio += $_TAX015.NOVEDAD;
                    datos_envio += "|";
                    datos_envio += idPlaca + "|";
                    postData({ datosh: datos_envio }, get_url("app/TAX/TAX015.DLL"))
                        .then(data => {
                            console.log(data)
                            jAlert({ titulo: 'Notificacion', mensaje: "Eliminado correctamente" }, finProceso_tax015);
                        })
                } else {
                    evaluarPlaca_tax015();
                }
            }, {
                msj: '02'
            })
        }
    } else {
        if ($_TAX015.NOVEDAD == '7' && !busqueda) {
            fondoReposicion_tax015.unmaskedValue = '0';
            fondoMantenim_tax015.unmaskedValue = '0';
            fondoReposicion_tax015.unmaskedValue = '0';
            evaluarPropietario_tax015();
        } else {
            plantillaToast('99', '01', null, 'warning');
            evaluarPlaca_tax015();
        }
    }
}

function evaluarPropietario_tax015() {
    validarInputs(
        {
            form: "#fasePropietario",
            orden: "1"
        },
        evaluarPlaca_tax015,
        _validarPropietario_tax015
    )
}

function _validarPropietario_tax015() {
    var idTercero = document.getElementById('propie_tax015').value,
        busqueda = $_TAX015.TERCEROS.find(e => {
            return e.COD == idTercero.toUpperCase();
        })
    if (busqueda) {
        document.getElementById("propieDescrip_tax015").value = busqueda.NOMBRE
        evaluarSegundaFase("1");
    } else {
        plantillaToast('99', '01', null, 'warning');
        evaluarPropietario_tax015();
    }
}

function evaluarSegundaFase(orden) {
    validarInputs(
        {
            form: "#segundaFase_tax015",
            orden: orden
        },
        evaluarPropietario_tax015,
        evaluarModalidad_tax015
    )
}

function evaluarModalidad_tax015() {
    validarInputs(
        {
            form: "#faseModalidad",
            orden: "1"
        },
        () => {
            evaluarSegundaFase("3");
        },
        _validarModalidad_tax015
    )
}

function _validarModalidad_tax015() {
    var idModalidad = document.getElementById("modalidad_tax015").value,
        busqueda = $_TAX015.MODALIDADES.find(e => {
            return e.CODIGO == idModalidad.toUpperCase();
        })
    if (busqueda) {
        document.getElementById("modaldidaDescrip_tax015").value = busqueda.DESCRIP;
        evaluarTerceraFase("1");
    } else {
        plantillaToast('99', '01', null, 'warning');
        evaluarModalidad_tax015();
    }
}

function evaluarTerceraFase(orden) {
    validarInputs(
        {
            form: "#terceraFase_tax015",
            orden: orden
        },
        evaluarModalidad_tax015,
        evaluarProducEmpresa_tax015
    )
}

function evaluarProducEmpresa_tax015() {
    validarInputs(
        {
            form: "#faseProducEmpresa",
            orden: "1"
        },
        () => {
            evaluarTerceraFase("2");
        },
        evaluarFondoMantenimiento_tax015
    )
}

function evaluarFondoMantenimiento_tax015() {
    validarInputs(
        {
            form: "#faseFondoMant",
            orden: "1"
        },
        evaluarProducEmpresa_tax015,
        () => {
            // validar 
            evaluarFondoRepos_tax015()
        }
    )
}

function evaluarFondoRepos_tax015() {
    console.log('repos')
    validarInputs(
        {
            form: "#faseFondoRepos",
            orden: "1"
        },
        evaluarFondoMantenimiento_tax015,
        () => {
            // validar
            evaluarCombus_tax015()
        }
    )
}

function evaluarCombus_tax015() {
    $('#combu_tax015').removeAttr('disabled');
    $('#combu_tax015').select2().on('select2:select', _validarCombus_tax015);
    setTimeout(function () { $('#combu_tax015').select2('open') }, 500);
}

function _validarCombus_tax015(e) {
    var seleccionado = e.params.data.id;
    if (seleccionado != 'F') {
        evaluarNaturaleza_tax015()
    } else {
        $('#combu_tax015').attr('disabled', true);
        evaluarFondoRepos_tax015();
    }
}

function evaluarNaturaleza_tax015() {
    $("#Naturaleza_tax015").removeAttr('disabled');
    $("#Naturaleza_tax015").select2().on('select2:select', _validarNaturale_tax015)
    setTimeout(function () { $('#Naturaleza_tax015').select2('open') }, 500);
}

function _validarNaturale_tax015(e) {
    var seleccionado = e.params.data.id;
    if (seleccionado != 'F') {
        evaluarNroInterno_tax015()
    } else {
        $('#Naturaleza_tax015').attr('disabled', true);
        evaluarCombus_tax015();
    }
}

function evaluarNroInterno_tax015() {
    validarInputs(
        {
            form: "#faseNroInterno",
            orden: "1"
        },
        evaluarNaturaleza_tax015,
        evaluarCosto_tax015
    )
}

function evaluarCosto_tax015() {
    validarInputs(
        {
            form: "#faseCcosto_tax015",
            orden: "1"
        },
        evaluarNroInterno_tax015,
        _validarCosto_ta015
    )
}

function _validarCosto_ta015() {
    var idCosto = document.getElementById('costo_tax015').value,
        busqueda = $_TAX015.COSTOS.find(e => {
            return e.CODIGO == idCosto.toUpperCase();
        })

    if (busqueda) {
        document.getElementById("costoDescrip_tax015").value = busqueda.DESCRIP
        CON850_P(function (e) {
            if (e.id == 'S') {
                var datos_envio = datosEnvio();
                datos_envio += $_TAX015.NOVEDAD;
                datos_envio += "|";
                // postData({ datosh: datos_envio }, get_url("app/TAX/TAX015.DLL"))
                //     .then(data => {
                //         console.log(data)
                //         jAlert({ titulo: 'Notificacion', mensaje: "Modificado correctamente" }, finProceso_tax015);
                //     })
            } else {
                evaluarCosto_tax015();
            }
        }, { msj: '' })
    } else {
        plantillaToast('99', '01', null, 'warning');
        evaluarCosto_tax015();
    }
}

function bajarDatos_tax015(){
    return document.getElementById('placa_tax015').value
        + "|"
        + document.getElementById('propie_tax015').value
        + "|"
        + document.getElementById('nroInterno_tax015').value
        + "|"
        + document.getElementById('modelo_tax015').value
        + "|"
        + document.getElementById('pasajeros_tax015').value
        + "|"
        + document.getElementById('combu_tax015').value
        + "|"
        + document.getElementById('marca_tax015').value
        + "|"
        + document.getElementById('motor_tax015').value
        + "|"
        + document.getElementById('chasis_tax015').value
        + "|"
        + document.getElementById('marca_tax015').value
        + "|"
        + document.getElementById('marca_tax015').value
        + "|"
        + document.getElementById('marca_tax015').value
        + "|"
        + document.getElementById('marca_tax015').value
        + "|"
        
}

function finProceso_tax015() {
    _inputControl('reset');
    _inputControl('disabled');
    placas_tax015();
}