($ => {
    $.F8NUME = {
        overlay_id: 'overlay-f8_nume',
        content_id: 'content-f8_nume',
        css_id: 'css_ventanaDatos_lite',
        tabla_id: 'datos',
        id_input: 'input_busquedaF8nume',
        id_select: 'select_busquedaF8nume',
        datatable: [],
        titulo: 'Ventana de búsqueda',
        valoresselect: '',
        columnas: '',
        f8data: '',
        table: null,

        _init: () => {
            if ($.F8NUME._open()) {
                var thead = $('<thead/>')
                    .append($('<tr/>'));

                $('#' + $.F8NUME.content_id + '_body').append(
                    $('<table/>', {
                        id: $.F8NUME.tabla_id,
                        class: 'display responsive nowrap'
                    })
                        .css({ width: '100%', })
                        .append(thead)
                );

                $('#' + $.F8NUME.id_input).focus();
            }
        },

        _open: () => {
            var wWindow = $(window).width();

            // Crear overlay F8
            $('<div/>', {
                id: $.F8NUME.overlay_id
            })
                .css({
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.2)',
                    position: 'absolute',
                    top: 0,
                    display: 'flex',
                    'z-index': '99999999',
                    'align-items': 'center'

                })
                .appendTo('body');
            // !End overlay F8

            // Box contenido F8
            $('<div/>', {
                id: $.F8NUME.content_id
            })
                .css({
                    width: wWindow < 426 ? '95%' : '600px',
                    background: '#FFF',
                    margin: '0 auto',
                    'border-radius': '3px'
                })
                .appendTo('#' + $.F8NUME.overlay_id);
            // !End contenido F8

            // Header 
            $('<div/>', {
                id: $.F8NUME.content_id + '_header'
            })
                .css({
                    width: '100%',
                    padding: '15px 0 15px 20px',
                    background: '#f1f1f1',
                    'text-align': 'center',
                    'border-bottom': '1px solid rgba(0,0,0,0.08)',
                    'box-sizing': 'border-box'
                })
                .html($.F8NUME.titulo)
                .appendTo('#' + $.F8NUME.content_id);


            // Body
            $('<div/>', {
                id: $.F8NUME.content_id + '_body'
            })
                .css({
                    width: '100%',
                    padding: '15px',
                    'overflow-x': 'auto',
                    'box-sizing': 'border-box'
                })
                .appendTo('#' + $.F8NUME.content_id);

            // Responsive            
            $(window).resize(function () {
                if ($(window).width() < 426) {
                    $('#' + $.F8NUME.content_id)
                        .css({ width: '95%' });
                } else {
                    $('#' + $.F8NUME.content_id)
                        .css({ width: '600px' });
                }
            });
            // End responsive

            // Insertar formulario
            $('<select />', {
                id: $.F8NUME.id_select
            })
                .css({
                    width: '40%',
                    background: '#f2fbff',
                    padding: '10px 8px',
                    border: '1px solid #becdda',
                    outline: 'none',
                    'border-radius': '2px 2px 0 0',
                })
                // .attr('disabled', true)
                .appendTo(`#${$.F8NUME.content_id}_body`);

            $('<input />', {
                id: $.F8NUME.id_input
            })
                .css({
                    width: '60%',
                    background: '#f2fbff',
                    padding: '10px 8px',
                    border: '1px solid #becdda',
                    outline: 'none',
                    'border-radius': '2px 2px 0 0',
                })
                // .attr('disabled', true)
                .appendTo(`#${$.F8NUME.content_id}_body`);

            $.F8NUME.valoresselect.forEach(data => {
                $(`#${$.F8NUME.id_select}`).append(new Option(data, data));
            })

            // Footer

            var objResultados = $('<div />', {
                id: 'labelResultadosLite'
            })
                .css({
                    color: '#666',
                    'font-size': '12px',
                    'display': 'flex',
                    'align-items': 'center'
                })

            var objBtnCerrar = $('<div />')
                .html('<button type="button" class="btn red btn-outline" style="width: 100%" onclick="$.F8NUME._close()">Cerrar</button>');

            var objBtnSeleccionar = $('<div />')
                .html('<button type="button" class="btn blue" style="width: 100%" onclick="$.F8NUME._sendData()">Buscar</button>');

            $('<div/>', {
                id: $.F8NUME.content_id + '_foot'
            })
                .css({
                    width: '100%',
                    padding: '15px',
                    background: '#f1f1f1',
                    'box-sizing': 'border-box',
                    'border-radius': '0 0 2px 2px',
                    'display': 'grid',
                    'grid-template-columns': '2fr .5fr .5fr',
                    'grid-gap': '5px'
                })
                .html(objResultados)
                .append(objBtnSeleccionar)
                .append(objBtnCerrar)
                .appendTo('#' + $.F8NUME.content_id);

            // $('<div/>', {
            //     id: $.F8NUME.content_id + '_footer'
            // })
            //     .css({
            //         width: '100%',
            //         padding: '15px 0 15px 20px',
            //         'text-align': 'center',
            //         'border-bottom': '1px solid rgba(0,0,0,0.08)',
            //         'box-sizing': 'border-box'
            //     })
            //     .appendTo('#' + $.F8NUME.content_id);

            $("<style/>", {
                id: $.F8NUME.css_id
            })
                .prop("type", "text/css")
                .html("\
                        table tbody tr.focus-table td.sorting_1, \
                        table tbody tr.focus-table td{\
                            background-color: #2196F3!important;\
                            color: #FFF;\
                        }")
                .appendTo("head");

            $.F8NUME._initenterinput('on');
            return true;

        },

        _initenterinput: estado => {
            switch (estado) {
                case 'on':
                    $('#' + $.F8NUME.id_input).on('keydown', e => {
                        switch (e.which) {
                            case 13:
                                $('.btn.blue').click();
                                break;
                            case 27:
                                $('.btn.red').click();
                                break;
                        }
                    })
                    break;
                case 'off':
                        $('#' + $.F8NUME.id_input).off('key');
                    break;
                default:
                    break;
            }
        },

        _sendData: () => {
            if ($(`#${$.F8NUME.id_input}`).val().length > 7) {
                alert('Ingresar menos de 10 caracteres');
                CON851('Ingresar menos de 10 caracteres', null, 'error')
            } else if ($(`#${$.F8NUME.id_input}`).val().length < 3) {
                alert('Ingresar minimo 3 caracteres');
                CON851('Ingresar minimo 3 caracteres', null, 'error')
            } else {
                let URL = get_url("APP/SALUD/SER808.DLL");

                postData({
                    datosh: datosEnvio() + '1' + '|' + $(`#${$.F8NUME.id_input}`).val().toUpperCase()
                }, URL)
                    .then(data => {
                        console.log(data, 'dataensa')
                        var array = data[$.F8NUME.f8data];
                        table = [];
                        $.F8NUME.datatable = array;
                        array.forEach(index => {
                            var datatotable = Object.values(index);
                            table.push(datatotable);
                        });
                        var columnas = $.F8NUME.columnas;
                        $.F8NUME.table = $(`#${$.F8NUME.tabla_id}`).DataTable({
                            data: table,
                            columns: columnas,
                            responsive: true,
                            scrollY: '50vh',
                            scrollCollapse: true,
                            createdRow: function (row, data, index) {
                                $(row)
                                    .css({ cursor: 'pointer' })
                                    .attr('data-index', index);
                            },
                            initComplete: function () {
                                var api = this.api();

                                // Evento click en fila
                                api.$('td').click(function () {
                                    var indx = $(this).hasClass('sorting_1');
                                    if (!indx) {
                                        var parent = $(this).closest('tr');
                                        var item = $(parent).data().index;
                                        $.F8NUME._selected(item);
                                    }
                                })

                                // Reset foco table
                                api.on('page search', function () {
                                    $(".focus-table").removeClass("focus-table");
                                })

                                // Set focus search
                                $('#' + $.F8NUME.content_id + '_table' + '_filter label input').focus();

                                // Init teclas
                                $.F8NUME._initControls(true);
                            },
                            language: {
                                lengthMenu: "Mostrar _MENU_ por página",
                                zeroRecords: "No hay datos disponibles",
                                info: "Página _PAGE_ de _PAGES_",
                                infoEmpty: "No hay datos disponibles",
                                infoFiltered: "(filtrado de  _MAX_ registros)",
                                loadingRecords: "Cargando...",
                                processing: "Procesando...",
                                sSearch: 'Buscar:',
                                paginate: {
                                    first: "Primera",
                                    last: "Final",
                                    next: "Siguiente",
                                    previous: "Anterior"
                                },
                            }
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        },

        _selected: data => {
            $.F8NUME._close();
            $.F8NUME.callback($.F8NUME.datatable[data]);
        },

        _initControls: estado => {
            switch (estado) {
                case true:
                    $(document).on('keydown', $.F8NUME._validarKey);
                    break;
                case false:
                    $(document).off('keydown', $.F8NUME._validarKey);
                    break;
            }
        },

        _validarKey: e => {
            var key = e.which;
            switch (key) {
                case 34:
                    $('#' + $.F8NUME.tabla_id + '_paginate li.next a').click();
                    break;
                case 33:
                    $('#' + $.F8NUME.tabla_id + '_paginate li.prev a').click();
                    break;
                case 37:
                case 38:
                    $.F8NUME._prev();
                    break;
                case 39:
                case 40:
                    $.F8NUME._next();
                    break;
                case 13:
                    if ($(".focus-table").length > 0) $(".focus-table td:nth-child(2)").click();
                    break;
                case 27:
                    // Esc
                    $.F8NUME._close();
                    break;
            }
        },

        _prev: () => {
            elementoActive = $(".focus-table");
            elemento = $("#" + $.F8NUME.tabla_id + " tbody tr:visible");
            if (elementoActive.length === 0) $(elemento[0]).addClass('focus-table');
            else if (elementoActive.prevAll('tr').length != 0) {
                let nextElement = elementoActive.prevAll('tr')[0];
                elementoActive.removeClass('focus-table');
                $(nextElement).addClass('focus-table');
            }
        },

        _next: () => {
            elementoActive = $(".focus-table");
            elemento = $("#" + $.F8NUME.tabla_id + " tbody tr:visible");
            if (elementoActive.length === 0) $(elemento[0]).addClass('focus-table');
            else if (elementoActive.nextAll('tr').length != 0) {
                let nextElement = elementoActive.nextAll('tr')[0];
                elementoActive.removeClass('focus-table');
                $(nextElement).addClass('focus-table');
            }
        },

        _close: function () {
            $('#' + $.F8NUME.overlay_id).remove();
            $.F8NUME._initenterinput('off');
            $.F8NUME.table.destroy();
            $.F8NUME._initControls(false);
        },

    }
    F8NUME = params => {
        if (!params.callback) {
            alert('Callback sin definir');
            console.error('Falta definir una función para retornar los datos');
        } if (!params.cancel) {
            alert('Cancelar sin definir');
            console.error('Falta definir una función para retornar los datos');
        } 
        // else if (!params.indice) {
        //     alert('Falta definir el indice para la consulta');
        //     console.error('Falta definir el indice para la consulta');
        // } else {
        // $.F8NUME.callback = params.callback;
        // $.F8NUME.data = params.data;
        $.F8NUME.valoresselect = params.valoresselect || ['Seleccionar'];
        $.F8NUME.f8data = params.f8data || null;
        $.F8NUME.columnas = params.columnas || ['DESCRIPCION', 'PACIENTE'];
        $.F8NUME.callback = params.callback || null;
        $.F8NUME.cancelcallback = params.cancel || null;
        $.F8NUME._init();
        // }
    }
})(jQuery)