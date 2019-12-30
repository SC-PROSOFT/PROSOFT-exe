var arrayCompleto_sal491 = []
var global_SAL491 = []

$(document).ready(function () {
    _inputControl("reset");
    _inputControl("disabled");
    _toggleF8([
        { input: 'claseservicio', app: 'SAL41', funct: _ventanaClases_41 },
    ]);
    global_SAL491['PREFIJOUSU'] = $_USUA_GLOBAL[0].PREFIJ;
    global_SAL491['ADMIN_W'] = localStorage.getItem('Usuario').trim() ? localStorage.getItem('Usuario').trim() : false;
    global_SAL491['NITUSU'] = $_USUA_GLOBAL[0].NIT.toString().padStart(10, '0');
    inicio_sal491()
})

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
            global_SAL491['NOMBREOPERW'] = date[0].trim();
            global_SAL491['IDENTOPERW'] = date[1].trim();
            global_SAL491['SUCOPERW'] = date[2].trim();
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
        _Datosucursal2_41();
    }
    else if ((global_SAL491.ADMIN_W == "GEBC") || (global_SAL491.ADMIN_W == "ADMI")) {
        _Datosucursal2_41();
    }
    else {
        switch (global_SAL491.NITUSU) {
           // ESE SALUD YOPAL
           case "0844003225":
            if ((global_SAL491['SUCOPERW'] == "JL") || (global_SAL491['SUCOPERW'] == "CA") || (global_SAL491['SUCOPERW'] == "CS") || (global_SAL491['SUCOPERW'] == "PV") || (global_SAL491['SUCOPERW'] == "BC") || (global_SAL491['SUCOPERW'] == "LC") || (global_SAL491['SUCOPERW'] == "CV") || (global_SAL491['SUCOPERW'] == "HT") || (global_SAL491['SUCOPERW'] == "EM") || (global_SAL491['SUCOPERW'] == "HY") || (global_SAL491['SUCOPERW'] == "TL") || (global_SAL491['SUCOPERW'] == "MR")) {
                global_SAL491.PREFIJOUSU = $_PREFIJOUSU;
                _Datosucursal2_41();
            }
            else {
                _inputControl("disabled");
                CON852("48", "Sucursal no permitida", "_infodatosucursal", _toggleNav);
            }
            break;
        }
    }
}