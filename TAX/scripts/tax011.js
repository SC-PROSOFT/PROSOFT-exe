var $_TAX011 = {
    NOVEDAD: false,
    MODALIDADES: [],
    ARTICULOS: []
};

var sostenimiento_011 = new IMask(
    document.getElementById('sostenimiento_011'),
    { mask: Number, min: 0, max: 9999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);


(() => {
    // loader('show')
    _inputControl('reset');
    _inputControl('disabled');

    _toggleF8([
        { input: 'modalidad', app: '011', funct: _ventanaModalidades_tax011 },
        { input: 'codArticulo', app: '011', funct: _ventanaArticulos_tax011 }
    ]);

    modalidades_tax011();
    // prueba();

})();

function prueba() {
    var datos_envio = datosEnvio() + "1I|";
    var data = {
        "datosh": datos_envio,
        "LIN-001": "prueba123",
        "LIN-002": "prueba456",
        "LIN-003": "aasdaskdnhjkahsjkdhjaksdhjkasndjknasjkdnasjkdnjkasndjknasjdnajksdnjkasndjkasnjkdnasjkdnjkashdjkasndaskjdnasjkbfasgfhjagchjbaschjbashbcjasbjcabsckjbasjkcbjkasbcjkabsjkcbaskjcbkajsbcjkasbjanksdmklamsdklmaslkdmklasdnklashdjkasgjkbaskjdbhjasdaasdaskdnhjkahsjkdhjaksdhjkasndjknasjkdnasjkdnjkasndjknasjdnajksdnjkasndjkasnjkdnasjkdnjkashdjkasndaskjdnasjkbfasgfhjagchjbaschjbashbcjasbjcabsckjbasjkcbjkasbcjkabsjkcbaskjcbkajsbcjkasbjanksdmklamsdklmaslkdmklasdnklashdjkASDHASJKDGHJASGkjhazsdjkashdjkhasdnasdasdaasdaskdnhjkahsjkdhjaksdhjkasndjknasjkdnasjkdnjkasndjknasjdnajksdnjkasndjkasnjkdnasjkdnjkashdjkasndaskjdnasjkbfasgfhjagchjbaschjbashbcjasbjcabsckjbasjkcbjkasbcjkabsjkcbaskjcbkajsbcjkasbjanksdmklamsdklmaslkdmklasdnklashdjkasgjkbaskjdbhjasdaasdaskdnhjkahsjkdhjaksdhjkasndjknasjkdnasjkdnjkasndjknasjdnajksdnjkasndjkasnjkdnasjkdnjkashdjkasndaskjdnasjkbfasgfhjagchjbaschjbashbcjasbjcabsckjbasjkcbjkasbcjkabsjkcbaskjcbkajsbcjkasbjanksdmklamsdklmaslkdmklasdnklashdjkASDHASJKDGHJASGkjhazsdjkashdjkhasdnasdasd"
    };
    postData(data, get_url("app/TAX/TAX132-2.DLL"))
        .then(datos => {
            console.log(datos)
        })
}

function _ventanaModalidades_tax011(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de modalidades',
            columnas: ["CODIGO", "DESCRIP"],
            data: $_TAX011.MODALIDADES,
            callback_esc: function () {
                $('#modalidad_011').focus();
            },
            callback: function (data) {
                document.getElementById('modalidad_011').value = data.CODIGO.trim()
                _enterInput('#modalidad_011');
            }
        });
    }
}

function _ventanaArticulos_tax011(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de articulos',
            columnas: ["TIP", "GRP", "NUMERO", "DESCRIP"],
            data: $_TAX011.ARTICULOS,
            callback_esc: function () {
                $('#codArticulo_011').focus();
            },
            callback: function (e) {
                let cod = e.TIP.trim() || "0",
                    grp = e.GRP,
                    numero = e.NUMERO.trim(),
                    articulo = cod + grp + numero;

                document.getElementById('codArticulo_011').value = articulo.trim()
                _enterInput('#codArticulo_011');
            }
        });
    }
}

function modalidades_tax011() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/TAX815.DLL"))
        .then(data => {
            $_TAX011.MODALIDADES = data.Modalidad;
            $_TAX011.MODALIDADES.pop()
            articulos_tax011()
        })
}

function articulos_tax011() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/INV803.DLL"))
        .then(data => {
            // loader('hide')
            console.log(data)
            $_TAX011.ARTICULOS = data.Articulos;
            $_TAX011.ARTICULOS.pop()
            CON850(_evaluarNovedad_tax011);
        })
}

function _evaluarNovedad_tax011(data) {
    _inputControl('reset');
    _inputControl('disabled');

    if (data.id != 'F') {
        $_TAX011.NOVEDAD = data.id
        document.getElementById('novedad_tax011').value = data.id + ' - ' + data.descripcion
        evaluarModalidad_tax011();
    } else {
        _toggleNav();
    }
}

function evaluarModalidad_tax011() {
    validarInputs(
        {
            form: '#faseModalidad',
            orden: '1'
        },
        () => { CON850(_evaluarNovedad_tax011) },
        _validadModalidad_tax011
    )
}

function _validadModalidad_tax011() {
    var idModalidad = document.getElementById('modalidad_011').value,
        busqueda = $_TAX011.MODALIDADES.find(e => {
            return e.CODIGO == idModalidad.toUpperCase();
        })

    if (busqueda) {
        document.getElementById('modalidadDescrip_011').value = busqueda.DESCRIP.trim()
        sostenimiento_011.unmaskedValue = busqueda.SOSTENI
        document.getElementById('codArticulo_011').value = busqueda['COD-ART'].trim()
        var busquedaArticulo = buscarArticulo_011(busqueda['COD-ART'].trim());
        if (busquedaArticulo) document.getElementById('descripArticulo_011').value = busquedaArticulo.DESCRIP.trim()

        evaluarDescrp_011('1')
    } else {
        plantillaToast('99', '01', null, 'warning');
        evaluarModalidad_tax011()
    }
}

function evaluarDescrp_011(orden) {
    validarInputs(
        {
            form: '#faseDescripcion',
            orden: orden
        },
        evaluarModalidad_tax011,
        _evaluarCuota_011
    )
}


function _evaluarCuota_011() {
    validarInputs(
        {
            form: '#validarCuota',
            orden: '1'
        },
        () => { evaluarDescrp_011('1') },
        _evaluarArticulo_011
    )
}

function _evaluarArticulo_011() {
    validarInputs(
        {
            form: '#validarArticulo',
            orden: '1'
        },
        _evaluarCuota_011,
        () => {
            var codigo = document.getElementById('codArticulo_011').value,
                busquedaArticulo = buscarArticulo_011(codigo);

            if (busquedaArticulo) {
                document.getElementById('descripArticulo_011').value = busquedaArticulo.DESCRIP.trim();

                if ($_USUA_GLOBAL[0].NIT == 892000113) _validacionFinal_011()

            } else {
                plantillaToast('99', '01', null, 'warning');
                _evaluarArticulo_011()
            }

        }
    )
}

function _validacionFinal_011() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            console.log('Guardar datos')
            var codModalidad = document.getElementById('modalidad_011').value,
                descripModalidad = document.getElementById('modalidadDescrip_011').value.trim(),
                sostenimiento = sostenimiento_011.unmaskedValue || "0",
                cuentaCredito = document.getElementById('cuentaCredito').value,
                cuentaDebito = document.getElementById('cuentaDebito').value,
                articulo = document.getElementById('codArticulo_011').value;


            var datos = datosEnvio()
                + '|' + $_TAX011.NOVEDAD
                + '|' + codModalidad
                + '|' + descripModalidad
                + '|' + sostenimiento.padStart(10, "0")
                + '|' + cuentaCredito
                + '|' + cuentaDebito
                + '|' + articulo.padEnd(18, " ")
                + '|';

            console.log(datos)
            postData({ datosh: datos }, get_url("app/TAX/TAX011.DLL"))
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setTimeout(_evaluarArticulo_011, 500)
        }
        // setTimeout(_evaluarArticulo_011, 500)
    }, {})
}

function buscarArticulo_011(codigo) {
    var busqueda = $_TAX011.ARTICULOS.find(e => {
        let cod = e.TIP.trim() || "0",
            grp = e.GRP,
            numero = e.NUMERO.trim(),
            articulo = cod + grp + numero;

        return articulo == codigo;
    })

    return busqueda;
}