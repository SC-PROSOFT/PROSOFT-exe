(function ($) {
    // var $_ARRAYPOP;
    $.popup = {
        overlay_id: 'popup_overlay',
        container_id: 'popup_container',
        header_class: 'popup_header',
        body_class: 'popup_body',
        callback: null,
        autoclose: true,
        array_datos: false,
        titulo: 'Ventana nueva',
        indices: null,
        actual_opciones: [],
        callback_f: null,
        seleccion: null,

        window: function (params, callback) {
            this.array_datos = params.array || false;
            this.titulo = params.titulo || 'Ventana popup';
            this.indices = params.indices || null;
            this.callback_f = params.callback_f || false;
            this.callback = callback || false;
            this.seleccion = params.seleccion || false;

            $.popup._import_css();
            if ($.popup._show()) this._llenarLista();
        },

        _llenarLista: function () {
            // console.log(this.array_datos)
            var objNames = Object.getOwnPropertyNames(this.array_datos[0]),
                indices = this.indices[0],
                datos_array = this.array_datos;

            if (objNames.indexOf(indices.label) == -1) {
                this._hide();
                alert('Los indices enviados no coinciden con el array de datos.')
                console.error('Los indices enviados no coinciden con el array de datos.')
            } else {
                for (var i in datos_array) {
                    var clases = '';

                    var id = datos_array[i][indices.id];
                    if (this.seleccion == id) clases = 'active-popup';

                    let idOpcion = this._parseOpcion(parseInt(i) + 1);
                    this.actual_opciones.push(idOpcion.toString())
                    $(`<li data-id="${idOpcion}" data-index="${i}" class="${clases}"/>`)
                        .html(`${datos_array[i][indices.id] || idOpcion} - ${datos_array[i][indices.label]}`)
                        .appendTo(`.${$.popup.body_class}_container ol`)
                }

                this.actual_opciones.push("F")
                $(`<li data-id="F" data-index="F"/>`)
                    .html(`F - Salir`)
                    .appendTo(`.${$.popup.body_class}_container ol`)


                $('.' + $.popup.body_class + '_container > ol > li')
                    .css({
                        'padding': '12px 15px',
                        'text-align': 'left',
                        'font-size': '14px',
                        'cursor': 'pointer',
                        'border': '1px solid transparent',
                        'margin-bottom': '2px',
                        'background': 'rgba(0,0,0,.08)',
                        'cursor': 'pointer'
                    })
                    .hover(
                        function () {
                            $(this).addClass('active-popup')
                        },
                        function () {
                            $(this).removeClass('active-popup')
                        }
                    )
            }

            this._event('on');
        },

        _parseOpcion: function (idx) {
            if (idx > 9) {
                switch (idx) {
                    case 10: return 'A';
                    case 11: return 'B';
                    case 12: return 'C';
                    case 13: return 'D';
                    case 14: return 'E';
                    case 15: return 'G';
                    case 16: return 'H';
                    case 17: return 'I';
                    case 18: return 'J';
                }
            } else {
                return idx;
            }
        },

        _show: function () {
            $.popup._overlay('show');

            $('#' + $.popup.overlay_id).html('').append('<div id="' + $.popup.container_id + '"></div>');
            $('#' + $.popup.container_id).css({
                background: '#FFF',
                width: '18%',
                height: 'auto',
                margin: '0 auto',
                'min-width': '280px',
                'box-shadow': 'box-shadow: 0 25px 20px -20px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.06);',
                'border-radius': '3px',
                'padding': '2px 2px 0 2px'
            });

            $('#' + $.popup.container_id).append(''
                + '<div class="' + $.popup.header_class + '">'
                + ' <p style="padding: 15px 25px;margin: 0 auto;">'
                + $.popup.titulo
                + ' </p>'
                + '</div>'
                + '<div class="' + $.popup.body_class + '">'
                + ' <div class="' + $.popup.body_class + '_container">'
                + '     <ol>'

                + '     </ol>'
                + ' </div>'
                + '</div>'
            );

            $('.' + $.popup.header_class).css({
                width: '100%',
                height: 'auto',
                background: '#0e348e',
                'max-width': '100%',
                'text-transform': 'uppercase',
                'font-weight': '600',
                'font-size': '12px',
                'text-align': 'center',
                'color': '#FFF',
                'border-radius': '3px 3px 0 0 ',
                'margin-bottom': '2px',
                'letter-spacing': '.8px'
            });

            $('.' + $.popup.body_class + '_container > ol').css({
                'list-style': 'none',
                'margin': '0 auto',
                'padding': '0',
                'max-height': '400px',
                'height': 'auto',
                'overflow': 'auto'
            })

            $('.' + $.popup.body_class + '_container > ol > li').css({
                'padding': '12px 15px',
                'text-align': 'left',
                'font-size': '14px',
                'cursor': 'pointer',
                'border': '1px solid transparent',
                'margin-bottom': '2px',
                'background': 'rgba(0,0,0,.08)',
                'transition': 'all 300ms'
            })

            // $(`.${$.popup.body_class}_container > ol`).scroll(function () {
            //     var objActive = $('.active-popup').offset().top;
            //     console.log($('.active-popup').offset().top)
            //     console.log($(`.${$.popup.body_class}_container > ol`).offset().top)
            //     console.log($(this).scrollTop())                
            // })

            return true;
        },

        _event: function (estado) {
            switch (estado) {
                case 'on':
                    $('.' + $.popup.body_class + '_container > ol > li').on('click', $.popup._eventClick)
                    $(document).on('keydown', $.popup.__keyEvent)
                    break;
                case 'off':
                    $('.' + $.popup.body_class + '_container > ol > li').off('click', $.popup._eventClick)
                    $(document).off('keydown', $.popup.__keyEvent)
                    break;
            }
        },

        __keyEvent: function (e) {
            var key = e.which,
                obj = $('.active-popup'),
                active_obj = $(obj).length,
                val_key = e.key.toUpperCase();

            if ($.popup.actual_opciones.indexOf(val_key) != -1) {
                let index_array = $(`*[data-id="${val_key}"]`).data().index;
                $.popup._seleccion(index_array)
            } else {
                if (
                    active_obj == 0
                    || (active_obj == 0 && key == 13)
                    && (key == 40 || key == 38)
                ) {
                    let active_first = $('.' + $.popup.body_class + '_container > ol > li').first();
                    active_first.addClass('active-popup');
                } else {
                    $(".active-popup").get(0).scrollIntoView();

                    switch (key) {
                        case 40:
                            let count_next = obj.next().length;
                            if (count_next != 0)
                                obj
                                    .removeClass('active-popup')
                                    .next()
                                    .addClass('active-popup');
                            break;
                        case 38:
                            let count_prev = obj.prev().length;
                            if (count_prev != 0)
                                obj
                                    .removeClass('active-popup')
                                    .prev()
                                    .addClass('active-popup');
                            break;
                        case 13:
                            $.popup._seleccion($(obj).data().index)
                            break;
                    }
                }
            }
        },

        _eventClick: function () {
            let index_array = $(this).data().index
            $.popup._seleccion(index_array)
        },

        _seleccion: function (idx) {
            this._event('off');
            this._hide();
            if (idx == 'F') {
                if (this.callback_f) this.callback_f(this.callback_f)
            } else {
                var array = $.popup.array_datos;
                this.callback(array[idx]);
            }
        },

        _overlay: function (estado) {
            $('body').append('<div id="' + $.popup.overlay_id + '"></div>');
            $('#' + $.popup.overlay_id).css({
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                background: 'rgba(0,0,0,0.2)',
                'z-index': '999999',
                'align-items': 'center',
                'font-family': "'Roboto', sans-serif"
            }).css("display", "flex")
                .hide()
                .fadeIn();
        },

        _hide: function () {
            $('#' + $.popup.overlay_id).fadeOut('fast', function () {
                $(this).remove();
                $.popup._delete_css();
            });
        },

        _delete_css: function () {
            $('#style_popup').remove();
        },

        _import_css: function () {
            $(`<style type='text/css' id='style_popup'>
            .active-popup{
                background: #d6e8f7!important;
                border: 1px solid rgb(154,208,255)!important;
            }
            </style>`)
                .appendTo("head");
        }
    }

    POPUP = function (params, callback) {
        console.log(params)
        if (params.array.length < 1) console.log('error, array indefinido')
        else $.popup.window(params, callback);
        console.log('-> Popup on')

    }

})(jQuery);