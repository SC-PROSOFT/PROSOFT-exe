var $_MENU;
var $_ARRAY = [];
$(document).ready(function () {
    $.ajax({
        url: "../scripts/js/menu_bombas.json",
        type: "GET",
        dataType: 'json'
    }).done(function (data) {
        $_MENU = data.Menu;
        mostrar_menu($_MENU, '0')
        organizar_array($_MENU);
        _cargarEventos('on');
        // _addFocoEvent('nav');        
    });
});

function _cargarEventos(estado) {
    console.log('Menu: ' + estado)
    switch (estado) {
        case "on":
            $(document).on('click', '.opcion-menu', _eventoBotones)
            $(document).on('keydown', _eventoTeclas);
            $(document).on('click','#regresar', _eventoRegresar)
            $(document).on('click', '#salir', salir_modulo)
            // $('#body_bomb').html('');
            break;
        case "off":
            $(document).off('click', '.opcion-menu', _eventoBotones)
            $(document).off('keydown', _eventoTeclas);
            $('#regresar').off('click', _eventoRegresar)
            break;
    }
}

function _eventoBotones() {
    var idOpcion = $(this).data().id.toString();
    var nuevaLista = buscar_opcion(idOpcion);
    if (nuevaLista != false) {
        mostrar_menu(nuevaLista);
        set_titulo(idOpcion);
    } else {
        var href = validate_href(idOpcion);
        if (href == false) {
            console.error('Programa sin definir')
        } else {
            load_contenido(href);
        }
    }
}

function _eventoRegresar() {
        var idOpcion = $('#navegacion').find('li.opcion-menu');
        idOpcion = $(idOpcion).data().id.toString()
        idOpcion = idOpcion.substring(0, idOpcion.length - 2);
        if (idOpcion.length != 0) {
            var nuevaLista = buscar_opcion(idOpcion.toString());
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

function organizar_array(obj) {
    for (var i in obj) {
        if (obj[i].Href) {
            $_ARRAY.push({
                "Id": obj[i].Id,
                "Descripcion": obj[i].Descripcion,
                "Href": obj[i].Href
            });
        } else {
            $_ARRAY.push({
                "Id": obj[i].Id,
                "Descripcion": obj[i].Descripcion
            });
        }

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
    $('#body_bomb').load(url, function () {
        _toggleNav();
    })
}

function validate_href(idOpcion) {
    var tmp;
    for (var i in $_ARRAY) {
        let id_tmp = $_ARRAY[i].Id;
        if (id_tmp === idOpcion) tmp = $_ARRAY[i];
    }
    return tmp.Href ? tmp.Href : false;
}

// funcion que envia el nuevo titulo para el menu de subpaginas
function set_titulo(val) {
    
    var title;
    for (var i in $_ARRAY)
        if ($_ARRAY[i].Id == val) title = $_ARRAY[i].Descripcion;

    console.log(title)
    title = title ? title : 'PRINCIPAL'
    $('.titulo').html(title);
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
            $('#navegacion').append(''
                + '<li class="opcion-menu nav-item" id="' + index + '" data-id="' + this.Id + '">'
                + ' <a class="nav-link nav-toggle">'
                + id + ' - ' + this.Descripcion
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

function salir_modulo() {
    ipcRenderer.send('ping', { param: 'salir' })
}