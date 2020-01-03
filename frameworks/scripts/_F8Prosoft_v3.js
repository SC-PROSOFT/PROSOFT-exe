(function ($) {
    $.ventanaDatos = {
        overlay_id: 'overlay-f8',
        content_id: 'content-f8',
        tabla_id: 'datos',
        css_id: 'css_ventanaDatos',
        titulo: 'Ventana de búsqueda',
        data_table: null,
        columnas: null,
        data: null,
        callback: null,
        orden: false,
        callback_esc: false,
        tipo: 'json',
        tablaSql: null,
        consultaSql: null,
        db: null,
        ancho_usuario: null,
        lenguaje: {
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
        },


        _init: function () {
            if (this._open()) {

                // Insertar tabla
                var thead = $('<thead/>')
                    .append($('<tr/>'));

                $('#' + this.content_id + '_body').html(
                    $('<table/>', {
                        id: $.ventanaDatos.tabla_id,
                        class: 'display responsive nowrap'
                    })
                        .css({ width: '100%', })
                        .append(thead)
                );

                if (this.tipo == 'mysql') {
                    this._initSql()
                } else {
                    if (this._addColumnas_head($.ventanaDatos.columnas)) this._initDataTable();
                }

            }
        },

        _initSql: function () {
            var db_tmp = $.parseJSON((JSON.stringify($CONEXION_BD)));
            db_tmp.database = $.ventanaDatos.db || db_tmp.database;
            var connection = mysql.createConnection(db_tmp);

            connection.connect(function (err) {
                if (err) {
                    errorSql(err.stack.substring(0, 100))
                } else {
                    var sentenciaSql = $.ventanaDatos.consultaSql || `SELECT * FROM ${$.ventanaDatos.tablaSql}`;
                    connection.query(sentenciaSql, function (error, results, fields) {
                        if (error) {
                            errorSql(error.stack.substring(0, 100))
                        } else {
                            var columnas_show = [],
                                columnas_table = [];
                            fields.forEach(function (val) {
                                columnas_show.push({ data: val.name })
                                columnas_table.push(val.name)
                            });

                            $.ventanaDatos.data = results;

                            console.log(results)

                            if ($.ventanaDatos._addColumnas_head(columnas_table)) {
                                $.ventanaDatos.data_table = $('#' + $.ventanaDatos.tabla_id).DataTable({
                                    data: results,
                                    columns: columnas_show,
                                    responsive: true,
                                    scrollY: '50vh',
                                    scrollCollapse: true,
                                    language: $.ventanaDatos.lenguaje,
                                    ordering: $.ventanaDatos.orden,
                                    createdRow: function (row, data, index) {
                                        $(row)
                                            .css({ cursor: 'pointer' })
                                            .attr('data-index', index);
                                    },
                                    initComplete: function () {
                                        var api = this.api();

                                        // Evento click en fila
                                        api.$('td').click(function () {
                                            var indx = $(this).attr('tabindex');
                                            if (typeof indx === typeof undefined) {
                                                var parent = $(this).closest('tr');
                                                var item = $(parent).data().index;
                                                $.ventanaDatos._sendData(item);
                                            }
                                        })

                                        // Reset foco table
                                        api.on('page search', function () {
                                            $(".focus-table").removeClass("focus-table");
                                        })

                                        // Set focus search
                                        $('#' + $.ventanaDatos.tabla_id + '_filter label input').focus();

                                        // Init teclas
                                        $.ventanaDatos._initControls(true);
                                    }
                                });

                            }
                        }
                    });

                    connection.end();
                }
            });
        },

        _initDataTable: function () {
            var columnas_show = [];
            $.ventanaDatos.columnas.forEach(function (val) {
                columnas_show.push({ data: val })
            });

            this.data_table = $('#' + $.ventanaDatos.tabla_id).DataTable({
                data: $.ventanaDatos.data,
                columns: columnas_show,
                responsive: true,
                scrollY: '50vh',                
                scrollCollapse: true,
                language: $.ventanaDatos.lenguaje,
                ordering: $.ventanaDatos.orden,
                createdRow: function (row, data, index) {
                    $(row)
                        .css({ cursor: 'pointer' })
                        .attr('data-index', index);
                },
                initComplete: function () {
                    var api = this.api();

                    // Evento click en fila
                    api.$('td').click(function () {
                        var indx = $(this).attr('tabindex');
                        if (typeof indx === typeof undefined) {
                            var parent = $(this).closest('tr');
                            var item = $(parent).data().index;
                            $.ventanaDatos._sendData(item);
                        }
                    })

                    // Reset foco table
                    api.on('page search', function () {
                        $(".focus-table").removeClass("focus-table");
                    })

                    // Set focus search
                    setTimeout(() => {
                        $('#' + $.ventanaDatos.tabla_id + '_filter label input').focus();
                    }, 500);

                    // Init teclas
                    $.ventanaDatos._initControls(true);
                }
            });
        },

        _sendData: function (idx) {
            $.ventanaDatos._close();
            $.ventanaDatos.callback($.ventanaDatos.data[idx]);
        },

        _close: function () {
            $('#' + $.ventanaDatos.overlay_id).remove();
            $('#' + $.ventanaDatos.css_id).remove();
            $.ventanaDatos._initControls(false);
            $.ventanaDatos.data_table.destroy();
        },

        _initControls: function (estado) {
            switch (estado) {
                case true:
                    $(document).on('keydown', this._validarKey);
                    break;
                case false:
                    $(document).off('keydown', this._validarKey);
                    break;
            }
        },

        _validarKey: function (e) {
            var key = e.which;
            switch (key) {
                case 34:
                    $('#' + $.ventanaDatos.tabla_id + '_paginate li.next a').click();
                    break;
                case 33:
                    $('#' + $.ventanaDatos.tabla_id + '_paginate li.prev a').click();
                    break;
                case 37:
                case 38:
                    $.ventanaDatos._prev();
                    break;
                case 39:
                case 40:
                    $.ventanaDatos._next();
                    break;
                case 13:
                    if ($(".focus-table").length > 0) $(".focus-table td:nth-child(2)").click();
                    break;
                case 27:
                    // Esc
                    if ($.ventanaDatos.callback_esc) {
                        setTimeout(function () {
                            $.ventanaDatos.callback_esc($.ventanaDatos.callback_esc);
                        }, 200)
                    }
                    $.ventanaDatos._close();
                    break;
            }
        },

        _prev: function () {
            elementoActive = $(".focus-table");
            elemento = $("#" + this.tabla_id + " tbody tr:visible");
            if (elementoActive.length === 0) $(elemento[0]).addClass('focus-table');
            else if (elementoActive.prevAll('tr').length != 0) {
                let nextElement = elementoActive.prevAll('tr')[0];
                elementoActive.removeClass('focus-table');
                $(nextElement).addClass('focus-table');
            }
        },

        _next: function () {
            elementoActive = $(".focus-table");
            elemento = $("#" + this.tabla_id + " tbody tr:visible");
            if (elementoActive.length === 0) $(elemento[0]).addClass('focus-table');
            else if (elementoActive.nextAll('tr').length != 0) {
                let nextElement = elementoActive.nextAll('tr')[0];
                elementoActive.removeClass('focus-table');
                $(nextElement).addClass('focus-table');
            }
        },

        _addColumnas_head: function (data) {
            var columnas = data;
            columnas.forEach(function (val) {
                var row_column = $('<th/>').html(val)
                $('table#' + $.ventanaDatos.tabla_id + ' thead tr')
                    .append(row_column);

            });

            return true;
        },

        _open: function () {
            var wWindow = $(window).width();

            // Crear overlay F8
            $('<div/>', {
                id: this.overlay_id
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

            var ancho_tmp = this.ancho_usuario || '800px';
            // Box contenido F8
            $('<div/>', {
                id: this.content_id
            })
                .css({
                    width: wWindow < 426 ? '95%' : ancho_tmp,
                    background: '#FFF',
                    margin: '0 auto',
                    'border-radius': '3px'
                })
                .appendTo('#' + this.overlay_id);
            // !End contenido F8

            // Header 
            $('<div/>', {
                id: this.content_id + '_header'
            })
                .css({
                    width: '100%',
                    padding: '15px 0 15px 20px',
                    'text-align': 'center',
                    'border-bottom': '1px solid rgba(0,0,0,0.08)',
                    'box-sizing': 'border-box'
                })
                .html($.ventanaDatos.titulo)
                .appendTo('#' + this.content_id);


            // Body
            $('<div/>', {
                id: this.content_id + '_body'
            })
                .css({
                    width: '100%',
                    padding: '15px',
                    'overflow-x': 'auto',
                    'box-sizing': 'border-box'
                })
                .html('Contenido')
                .appendTo('#' + this.content_id);

            // Responsive            
            $(window).resize(function () {
                if ($(window).width() < 426) {
                    $('#' + $.ventanaDatos.content_id)
                        .css({ width: '95%' });
                } else {
                    $('#' + $.ventanaDatos.content_id)
                        .css({ width: ancho_tmp });
                }
            });
            // End responsive


            //Crear clase
            $("<style/>", {
                id: $.ventanaDatos.css_id
            })
                .prop("type", "text/css")
                .html("\
                        table tbody tr.focus-table td.sorting_1, \
                        table tbody tr.focus-table td{\
                            background-color: #2196F3!important;\
                            color: #FFF;\
                        }")
                .appendTo("head");

            $('.modal').removeAttr('tabindex')

            return true;
        }
    }

    _ventanaDatos = function (params) {
        console.log(params)
        $.ventanaDatos.titulo = params.titulo || $.ventanaDatos.titulo;
        $.ventanaDatos.tipo = 'json';
        $.ventanaDatos.tipo = params.tipo || $.ventanaDatos.tipo;
        if ($.ventanaDatos.tipo == 'mysql') {
            if (!params.callback) {
                alert('Callback sin definir');
                console.error('Falta definir una función para retornar los datos');
            } else {
                $.ventanaDatos.callback = params.callback;
                $.ventanaDatos.tablaSql = params.tablaSql;
                $.ventanaDatos.callback_esc = params.callback_esc;
                $.ventanaDatos.consultaSql = params.consultaSql || false;
                $.ventanaDatos.db = params.db;
                $.ventanaDatos._init();
            }
        } else {
            if (!params.columnas) {
                alert('Columnas sin definir');
                console.error('Falta definir las columnas a mostrar');
            } else if (!params.data) {
                alert('Datos sin definir');
                console.error('Falta definir los datos de la ventana');
            } else if (!params.callback) {
                alert('Callback sin definir');
                console.error('Falta definir una función para retornar los datos');
            } else {
                $.ventanaDatos.columnas = params.columnas;
                $.ventanaDatos.data = params.data;
                $.ventanaDatos.callback = params.callback;
                $.ventanaDatos.orden = params.orden;
                $.ventanaDatos.callback_esc = params.callback_esc;
                $.ventanaDatos.db = params.db;
                $.ventanaDatos.ancho_usuario = params.ancho || null
                $.ventanaDatos._init();
            }
        }
    }
})(jQuery);