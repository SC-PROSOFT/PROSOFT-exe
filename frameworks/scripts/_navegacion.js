const { ipcRenderer } = require('electron');
const exe = require('child_process').execFile,
    fs = require('fs');

var $_MENU,
    $_ARRAY = [];

function cargarMenu() {
    var modulo = localStorage['Modulo'], url = '';
    switch (modulo) {
        case 'NEW': url = "../scripts/menu/menu_new.json";
            break;
        case 'SAL': url = "../scripts/menu/menu_new.json";
            break;
        case 'HIC':
            _toggleNav();
            $('.menuToggle').attr('style', 'display: none;');
            $('#body_main').load('../../HICLIN/paginas/menu_his.html');
            url = "../scripts/menu/menu_hic.json";

            break;
        case 'NOM': url = "../scripts/menu/menu_nom.json";
            break;
        case 'CER': url = "../scripts/menu/menu_cer.json";
            break;
        case 'PRS': url = "../scripts/menu/menu_prs.json";
            break;
        case 'BOM': url = "../scripts/menu/menu_bom.json";
            break;
        case 'PRD': url = "../scripts/menu/menu_prd.json";
            break;
        case 'SEP': url = "../scripts/menu/menu_sep.json";
            break;
        case 'BAR': url = "../scripts/menu/menu_bar.json";
            break;
        case 'MIG': url = "../scripts/menu/menu_mig.json";
            break;
    }

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
    }).done(function (data) {
        $_MENU = data.Menu;
        mostrar_menu($_MENU, '0')
        organizar_array($_MENU);
        for (var i in $_ARRAY) delete $_ARRAY[i].Sub;
        if (modulo == 'HIC') _cargarEventos('off')
        else _cargarEventos('on');
    });
}

function _cargarEventos(estado) {
    console.debug('Menu: ' + estado)
    switch (estado) {
        case "on":
            $(document).on('click', '.opcion-menu', _eventoBotones)
            $(document).on('keydown', _eventoTeclas);
            $(document).on('click', '#regresar', _eventoRegresar)
            $(document).on('click', '#salir', salir_modulo)
            // $('#body_main').html('');
            break;
        case "off":
            $(document).off('click', '.opcion-menu', _eventoBotones)
            $(document).off('keydown', _eventoTeclas);
            $('#regresar').off('click', _eventoRegresar)
            break;
    }
}

function _eventoBotones() {
    var dataOpcion = $(this).data(),
        idOpcion = dataOpcion.id.toString(),
        nuevaLista = buscar_opcion(idOpcion),
        data = data_opc(idOpcion),
        TIPO_EMPRESA = $_USUA_GLOBAL[0].TIPO_EMPRE,
        modulo = localStorage['Modulo'];

    if (
        (modulo == 'NEW') &&
        (
            idOpcion == '0A1' ||
            idOpcion == '0A2' ||
            idOpcion == '0A3' ||
            idOpcion == '0A4' ||
            idOpcion == '0A5' ||
            idOpcion == '0A6'
        )
    ) {
        _toggleNav();
        _CON855A(data['Mask-lote'], '2')
    } else if (nuevaLista != false) {
        if (data.Tipo == 'MULTI') {
            let busqueda = _buscarArray(TIPO_EMPRESA, nuevaLista),
                lista = buscar_opcion(busqueda);
            mostrar_menu(lista);
            set_titulo(idOpcion);
        } else if (data.Tipo == 'VALIDAR') {
            ////////////
            if (data.Id == '0A') _validarOpcion_0A()
            ////////////
        } else if (idOpcion == '097' && data.Tipo == 'SALUD') {
            if (TIPO_EMPRESA == 'H') {
                mostrar_menu(nuevaLista);
                set_titulo(idOpcion);
            } else {
                var msj
                msj = msjError('15');
                jAlert({ titulo: 'Error', mensaje: `<b>Mensaje: </b> ${msj}` })
            }
        } else {
            mostrar_menu(nuevaLista);
            set_titulo(idOpcion);
        }
    } else {
        if (data.Tipo == 'F01') {
            console.log($_LOTE_MENUCHECK)
            if (data.Params[0]["dll-suc"][$_LOTE_MENUCHECK.lote2]) {
                data.lote = $_LOTE_MENUCHECK
                _validarSegu(data)
            } else console.error('Lote sin definir');
        } else if (data.Tipo == 'ERROR') {
            var msj
            msj = msjError(cerosIzq(data.Cod.trim(), 2));
            jAlert({ titulo: 'Error', mensaje: `<b>Mensaje: </b> ${msj}` })
        } else if (data.Tipo == 'POWER' || data.Href || data.Tipo == 'JS') {
            if (localStorage['Modulo'] == 'MIG') {
                if (data.Tipo == 'JS') {
                    loadScript(data.Js)
                } else {
                    load_contenido(data.Href);
                }
            } else {
                _validarSegu(data);
            }
        } else {
            console.error('Programa sin definir')
        }
    }
}

function _validarSegu(datos) {
    console.log(datos)
    var segw = $_USUA_GLOBAL[0]['SEG-MOV'];

    // var segw = "8",
    validarSegw = datos["Seg-w"] ? datos["Seg-w"].find(element => element == segw) : false;

    if (validarSegw) {
        console.error('Bloqueado SEG-W')
        CON851B(segw)
    } else {
        var datosEnvio = localStorage.Sesion
            + '|' + localStorage.Contab
            + '|' + localStorage.Mes
            + '|' + localStorage.Usuario
            + '|' + datos["Opc-segu"] + '|';

        SolicitarDll({ datosh: datosEnvio },
            function (data) {
                on_validarSegu(data, datos)
            },
            get_url("app/CON904.DLL")
        );
    }
}

function on_validarSegu(data, datos) {
    var res = data.split('|');
    if (res[0] == '00') {
        if (datos.Href) {
            load_contenido(datos.Href);
        } else if (datos.Js) {
            loadScript(datos.Js)
        }
        else {
            _abrirPower(datos)
        }
    } else {
        jAlert({ titulo: 'Error', mensaje: `<b>Mensaje: </b> Opción restringida` })
    }
}

function _abrirPower(data) {
    var lote = data.lote;
    if (data.Tipo == 'F01') {
        if (data.Params[0]['dll-suc'][lote.lote2]) {
            data.Params[0].dll = data.Params[0]['dll-suc'][lote.lote2].dll;
            data.Params[0].formulario = data.Params[0]['dll-suc'][lote.lote2].formulario;
            data.Params[0].Sucursal = lote.lote1;
            data.Params[0]['Tipo-comp'] = lote.lote1 + lote.lote2;
        }
    }
    var modulo = localStorage.Modulo
    var contab = localStorage.Contab,
        mes = evaluarMes_min(localStorage.Mes),
        usuario = espaciosDer(localStorage.Usuario, 4),
        clave = espaciosDer(localStorage.Clave, 8),
        formulario = data.Params[0].formulario,
        dll = data.Params[0].dll,
        sucursal = data.Params[0].Sucursal ? espaciosDer(data.Params[0].Sucursal, 1) : ' ',
        tipoComp = data.Params[0]['Tipo-comp'] ? espaciosDer(data.Params[0]['Tipo-comp'], 2) : '  ',
        tipoOpcion = data.Params[0]['Tipo-Opcion'] ? espaciosDer(data.Params[0]['Tipo-Opcion'], 2) : '  ',
        tr_pre005 = data.Params[0]['tr_pre005'] ? cerosIzq(data.Params[0]['tr_pre005'], 2) : '  ';

    var params = usuario
        + "-" + clave
        + "-" + formulario
        + "-" + dll
        + "-" + sucursal
        + "-" + tipoOpcion
        + "-" + tipoComp
        + "-" + " "
        + "-" + "          "
        + "-" + modulo
        + "-\\" + contab
        + "-" + tr_pre005
        + "-";
    console.log(params)
    var titulo = contab + "\\"
        + mes
        + "     "
        + data.Id.substring(1, data.Id.length).split('').join(',') + " "
        + data.Descripcion
        + "     "
        + usuario;

    var nombre_bat = "C:\\PROSOFT\\TEMP\\MENU-" + localStorage.Sesion.trim() + ".BAT";
    // var nombre_bat = "C:\\PROSOFT\\TEMP\\MENU.BAT";

    var batch
    switch (modulo) {
        case 'NOM':
            batch = "ECHO OFF\r\n"
                + "P:\r\n"
                + "CD\\" + contab + "\\NOMINA\\" + localStorage.Nomina + "\r\n"
                + "START C:\\PWCOBOL\\MAIN.EXE " + params + titulo + "\r\n";
            break;
        case 'PRS':
            batch = "ECHO OFF\r\n"
                + "P:\r\n"
                + "CD\\" + contab + "\\PRE" + "\r\n"
                + "START C:\\PWCOBOL\\MAIN.EXE " + params + titulo + "\r\n";
            break;
        default:
            batch = "ECHO OFF\r\n"
                + "P:\r\n"
                + "CD\\" + contab + "\\" + mes + "\r\n"
                + "START C:\\PWCOBOL\\MAIN.EXE " + params + titulo + "\r\n";
            break;
    }

    console.log(nombre_bat);
    fs.writeFile(nombre_bat, batch, function (err) {
        if (err) console.error('Error escribiendo bat: \n\n' + err);
        else {
            // $('#body_main').html('')
            _cargarEventos('off');
            jAlert({
                mensaje: `<div style="text-align: center;">`
                    + `Debe cerrar el siguiente programa: <br>`
                    + `<b>${data.Id.substring(1, data.Id.length).split('').join('-')} - ${data.Descripcion}</b>`
                    + `</div>`,
                titulo: 'Esperando power',
                autoclose: false,
                btnCancel: false,
                footer: false
            }, function () { });

            exe(nombre_bat, function (err, data) {
                if (err) console.error('Error ejecutando bat: \n\n' + err);
                else {
                    fs.unlink(nombre_bat, function (err) {
                        if (err) console.error('Error eliminando bat: \n\n' + err);
                        else {
                            _cargarEventos('on');
                            jAlert_close();
                        }
                    });
                }
            });
        }
    });
}

function _eventoRegresar() {
    var idOpcion = $('#navegacion').find('li.opcion-menu');
    idOpcion = $(idOpcion).data().id.toString()
    idOpcion = idOpcion.substring(0, idOpcion.length - 2);
    if (idOpcion.length != 0) {
        var data = data_opc(idOpcion)
        if (data.Tipo == "MULTI") idOpcion = idOpcion.slice(0, -1);
        let nuevaLista = buscar_opcion(idOpcion.toString());
        console.log(idOpcion)
        mostrar_menu(nuevaLista, idOpcion);
    }
    set_titulo(idOpcion)
}

function _eventoTeclas(e) {
    var opcion;
    var key = e.which;
    if (key == "97" || key == "49") opcion = "1";
    else if (key == "98" || key == "50") opcion = "2";
    else if (key == "99" || key == "51") opcion = "3";
    else if (key == "100" || key == "52") opcion = "4";
    else if (key == "101" || key == "53") opcion = "5";
    else if (key == "102" || key == "54") opcion = "6";
    else if (key == "103" || key == "55") opcion = "7";
    else if (key == "104" || key == "56") opcion = "8";
    else if (key == "105" || key == "57") opcion = "9";
    else if (key == "65") opcion = "A";
    else if (key == "66") opcion = "B";
    else if (key == "67") opcion = "C";
    else if (key == "68") opcion = "D";
    else if (key == "69") opcion = "E";
    else if (key == "71") opcion = "G";
    else if (key == "72") opcion = "H";
    else if (key == "70" || key == "27") opcion = "regresar";
    else if (key == "83" || key == "87") salir_modulo()
    else { opcion = null; console.error('Tecla no definida'); }

    if (opcion) $('#' + opcion).click();
}

function _buscarArray(id, array) {
    var retornar = false;
    for (var i in array) {
        let temp = array[i].Id.slice(-1);
        if (temp == id) retornar = array[i].Id;
    }

    return retornar;
}

function organizar_array(obj) {
    for (var i in obj) {
        $_ARRAY.push(obj[i]);
        if (obj[i].Sub) organizar_array(obj[i].Sub)
    }
}

function buscar_opcion(idOpcion) {
    var retorno = [];
    for (var i in $_ARRAY) {
        let id_tmp = $_ARRAY[i].Id.substring(0, $_ARRAY[i].Id.length - 1);
        if (id_tmp === idOpcion) retorno.push($_ARRAY[i]);
    }

    if (retorno.length == 0) retorno = false;
    return retorno;
}

function load_contenido(url) {
    loader('show');
    $('#body_main').load(url, function () {
        console.log('entro a abrir programa')
        _toggleNav();
    })
}

function data_opc(idOpcion) {
    var tmp;
    for (var i in $_ARRAY) {
        let id_tmp = $_ARRAY[i].Id;
        if (id_tmp === idOpcion) tmp = $_ARRAY[i];
    }
    return tmp || false;
}

function set_titulo(val) {
    var title;
    for (var i in $_ARRAY)
        if ($_ARRAY[i].Id == val) title = $_ARRAY[i].Descripcion;

    $('.titulo').html(title || 'PRINCIPAL');
}

function mostrar_menu(list, idOpcion) {
    if (list.length != 0) {
        $('#navegacion').html('');
        jQuery.each(list, function (idx) {
            let index = idx + 1;

            if (index == 10) index = 'A';
            else if (index == 11) index = 'B';
            else if (index == 12) index = 'C';
            else if (index == 13) index = 'D';
            else if (index == 14) index = 'E';
            else if (index == 15) index = 'G';
            else if (index == 16) index = 'H';
            else if (index == 17) index = 'I';

            let id = this.Id.substring(1, this.Id.length);
            let temp = this.Id.substr(this.Id.length - 1, this.Id.length);
            if (this.Id != '0B')
                $('#navegacion').append(''
                    + '<li class="opcion-menu nav-item" id="' + index + '" data-id="' + this.Id + '">'
                    + ' <a class="nav-link nav-toggle">'
                    + temp + ' - ' + this.Descripcion
                    + ' </a>'
                    + '</li>'
                )
        });

        var idOpcion
        if (idOpcion == '0') {
            $('#navegacion').append(''
                + '<li class="nav-item" id="salir">'
                + ' <a class="nav-link nav-toggle">'
                + '  S - Salir del programa'
                + ' </a>'
                + '</li>'
            )
        } else {
            $('#navegacion').append(''
                + '<li class="nav-item" id="regresar">'
                + ' <a class="nav-link nav-toggle">'
                + '  F - Regresar'
                + ' </a>'
                + '</li>'
            )
        }



    } else {
        console.error('Sin opciones')
    }
}

function loadScript(script, callback) {
    var elemento = document.createElement("script");
    elemento.onload = callback;
    elemento.src = script;
    document.querySelector("head").appendChild(elemento);
}


function salir_modulo() {
    ipcRenderer.send('ping', { param: 'salir' })
}