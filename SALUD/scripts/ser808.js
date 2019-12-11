(function ($) {
    var $_ARRAYPOP;
    $.prefi = {
        overlay_id: 'popup_overlay',
        container_id: 'popup_container',
        header_class: 'popup_header',
        body_class: 'popup_body',
        callback: null,
        autoclose: null,

        window: function (params, callback) {
            $_ARRAYPOP = params.array;
            $.prefi.autoclose = true;
            $.prefi.callback = callback ? callback : false;
            params.array = params.array ? params.array : 'No tiene array';
            params.titulo = params.titulo ? params.titulo : 'Ventana Nueva';

            $.prefi._show(params);
            $.prefi._import_css();
            $.prefi._initEvent();

        },

        _show: function (params) {
            $.prefi._overlay('show');

            $('#' + $.prefi.overlay_id).html('').append('<div id="' + $.prefi.container_id + '"></div>');
            $('#' + $.prefi.container_id).css({
                background: '#FFF',
                width: '18%',
                height: 'auto',
                margin: '0 auto',
                'min-width': '280px',
                'box-shadow': 'box-shadow: 0 25px 20px -20px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.06);',
                'border-radius': '3px',
                'padding': '2px 2px 0 2px'
            });

            $('#' + $.prefi.container_id).append(''
                + '<div class="' + $.prefi.header_class + '">'
                + ' <p style="padding: 15px 25px;margin: 0 auto;">'
                + params.titulo
                + ' </p>'
                + '</div>'
                + '<div class="' + $.prefi.body_class + '">'
                + ' <div class="' + $.prefi.body_class + '_container">'
                + '     <ol>'

                + '     </ol>'
                + ' </div>'
                + '</div>'
            );
            var activa = 0;
            for (i = 0; i < params.array.length; i++) {
                var estado = params.array[i].estado;
                var comparar = params.array[i].codigo;
                console.debug(estado, comparar);
                if (estado == undefined) {
                    var identidad = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0','0','2A','2B','CC','CE','PA', 'RC', 'TI', 'ASI', 'MSI', 'NUI', 'CD', 'SC', 'PE', 'CN'];
                    for (x = 0; x < identidad.length; x++) {
                        if (identidad[x] == comparar) {
                            console.log(x);
                            $('.' + $.prefi.body_class + '_container ol').append('<li id= und' + identidad[x] + '>' + params.array[i].codigo.trim() + '. ' + params.array[i].descripcion.trim() + '</li>');
                            break;
                        }
                    }
                }
                else {
                    if (estado.trim() == 'ACTIVA') {
                        activa++;
                        console.log(activa);
                        if (activa <= 9) {
                            $('.' + $.prefi.body_class + '_container ol').append('<li id= und' + activa + '>' + params.array[i].codigo.trim() + '. ' + params.array[i].descripcion.trim() + '</li>'); // en lugar de activa $_UNDSERVICIO[i].COD
                            var $_UNDACTIVAS = $_UNDACTIVAS + "|und" + activa;
                        }
                        else {
                            if (activa == 10) { activa = "A"; $('.' + $.prefi.body_class + '_container ol').append('<li id= und' + activa + '>' + params.array[i].codigo.trim() + '. ' + params.array[i].descripcion.trim() + '</li>'); activa = 10; }
                            if (activa == 11) { activa = "B"; $('.' + $.prefi.body_class + '_container ol').append('<li id= und' + activa + '>' + params.array[i].codigo.trim() + '. ' + params.array[i].descripcion.trim() + '</li>'); activa = 11; }
                            if (activa == 12) { activa = "C"; $('.' + $.prefi.body_class + '_container ol').append('<li id= und' + activa + '>' + params.array[i].codigo.trim() + '. ' + params.array[i].descripcion.trim() + '</li>'); activa = 12; }
                            if (activa == 13) { activa = "D"; $('.' + $.prefi.body_class + '_container ol').append('<li id= und' + activa + '>' + params.array[i].codigo.trim() + '. ' + params.array[i].descripcion.trim() + '</li>'); activa = 13; }
                            if (activa == 14) { activa = "E"; $('.' + $.prefi.body_class + '_container ol').append('<li id= und' + activa + '>' + params.array[i].codigo.trim() + '. ' + params.array[i].descripcion.trim() + '</li>'); activa = 14; }
                            if (activa == 15) { activa = "G"; $('.' + $.prefi.body_class + '_container ol').append('<li id= und' + activa + '>' + params.array[i].codigo.trim() + '. ' + params.array[i].descripcion.trim() + '</li>'); activa = 15; }
                            if (activa == 16) { activa = "H"; $('.' + $.prefi.body_class + '_container ol').append('<li id= und' + activa + '>' + params.array[i].codigo.trim() + '. ' + params.array[i].descripcion.trim() + '</li>'); activa = 16; }
                            if (activa == 17) { activa = "I"; $('.' + $.prefi.body_class + '_container ol').append('<li id= und' + activa + '>' + params.array[i].codigo.trim() + '. ' + params.array[i].descripcion.trim() + '</li>'); activa = 17; }
                        }
                    }
                }

            }

            $('.' + $.prefi.body_class + '_container ol').append('<li id="und-0f">F. SALIR</li>')

            $('.' + $.prefi.header_class).css({
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

            $('.' + $.prefi.body_class + '_container > ol').css({
                'list-style': 'none',
                'margin': '0 auto',
                'padding': '0'
            })

            $('.' + $.prefi.body_class + '_container > ol > li').css({
                'padding': '12px 20px',
                'text-align': 'left',
                'font-size': '14px',
                'cursor': 'pointer',
                'border': '1px solid transparent',
                'margin-bottom': '2px',
                'background': 'rgba(0,0,0,.08)'
            })

        },

        _initEvent: function () {
            $(document).on('keydown', $.prefi._controls)
            $('.' + $.prefi.body_class + '_container > ol > li').hover(function () {
                $('.activePopup').removeClass('activePopup');
                $(this).addClass('activePopup');
            }).on('click', $.prefi._seleccion)
        },

        _endEvent: function () {
            $(document).off('keydown', $.prefi._controls)
            $('.' + $.prefi.body_class + '_container > ol > li').off('click', $.prefi._seleccion)
        },

        _seleccion: function () {
            let data_select = $(this).html().split('.')
            let data = {
                id: data_select[0],
                descripcion: data_select[1].trim()
            }

            $.prefi._sendCallback(data);
        },

        _controls: function (e) {
            var key = e.which;
            var active = $('.activePopup').length;
            var active_obj = $('.activePopup');
            if (active == 0
                && key != 13
                && key != 48
                && key != 97
                && key != 49
                && key != 98
                && key != 50
                && key != 99
                && key != 51
                && key != 100
                && key != 52
                && key != 101
                && key != 53
                && key != 102
                && key != 54
                && key != 103
                && key != 55
                && key != 104
                && key != 56
                && key != 105
                && key != 57
                && key != 65
                && key != 66
                && key != 67
                && key != 68
                && key != 69
                && key != 71
                && key != 72
                && key != 73
                && key != 74
                && key != 75
                && key != 76
                && key != 77
                && key != 78
                && key != 79
                && key != 80
                && key != 81
                && key != 82
                && key != 83
                && key != 84
                && key != 85
                && key != 86
                && key != 87
                && key != 88
                && key != 89
                && key != 90
                && key != 27
                && key != 70
            ) {
                let active_first = $('.' + $.prefi.body_class + '_container > ol > li').first();
                active_first.addClass('activePopup');
            } else {
                switch (key) {
                    case 40:
                        let count_next = active_obj.next().length;
                        if (count_next != 0) active_obj.removeClass('activePopup').next().addClass('activePopup');
                        break;
                    case 38:
                        let count_prev = active_obj.prev().length;
                        if (count_prev != 0) active_obj.removeClass('activePopup').prev().addClass('activePopup');
                        break;
                    case 13:
                        let selected_op = $('.activePopup');
                        if (selected_op.length != 0) selected_op.click();
                        else alert('Debes seleccionar una opción')
                        break;
                    case 97: case 49:
                        $('#' + 'und1').click();
                        break;
                    case 98: case 50:
                        $('#' + 'und2').click();
                        break;
                    case 99: case 51:
                        $('#' + 'und3').click();
                        break;
                    case 100: case 52:
                        $('#' + 'und4').click();
                        break;
                    case 101: case 53:
                        $('#' + 'und5').click();
                        break;
                    case 102: case 54:
                        $('#' + 'und6').click();
                        break;
                    case 103: case 55:
                        $('#' + 'und7').click();
                        break;
                    case 104: case 56:
                        $('#' + 'und8').click();
                        break;
                    case 105: case 57:
                        $('#' + 'und9').click();
                        break;
                    case 65:
                        $('#' + 'undA').click();
                        break;
                    case 66:
                        $('#' + 'undB').click();
                        break;
                    case 67:
                        $('#' + 'undC').click();
                        break;
                    case 68:
                        $('#' + 'undD').click();
                        break;
                    case 69:
                        $('#' + 'undE').click();
                        break;
                    case 71:
                        $('#' + 'undG').click();
                        break;
                    case 72:
                        $('#' + 'undH').click();
                        break;
                    case 73:
                        $('#' + 'undI').click();
                        break;
                    case 74:
                        $('#' + 'undJ').click();
                        break;
                    case 75:
                        $('#' + 'undK').click();
                        break;
                    case 76:
                        $('#' + 'undL').click();
                        break;
                    case 77:
                        $('#' + 'undM').click();
                        break;
                    case 78:
                        $('#' + 'undN').click();
                        break;
                    case 79:
                        $('#' + 'undO').click();
                        break;
                    case 80:
                        $('#' + 'undP').click();
                        break;
                    case 81:
                        $('#' + 'undQ').click();
                        break;
                    case 82:
                        $('#' + 'undR').click();
                        break;
                    case 83:
                        $('#' + 'undS').click();
                        break;
                    case 84:
                        $('#' + 'undT').click();
                        break;
                    case 85:
                        $('#' + 'undU').click();
                        break;
                    case 86:
                        $('#' + 'undV').click();
                        break;
                    case 87:
                        $('#' + 'undW').click();
                        break;
                    case 88:
                        $('#' + 'undX').click();
                        break;
                    case 89:
                        $('#' + 'undY').click();
                        break;
                    case 90:
                        $('#' + 'undZ').click();
                        break;
                    case 48:
                        $('#' + 'und0').click();
                        break;
                    case 70:
                    case 27:
                        let data = {
                            id: "F",
                            descripcion: 'Salir'
                        }
                        $.prefi._sendCallback(data);
                        break;

                }
            }
        },

        _overlay: function (estado) {
            $('body').append('<div id="' + $.prefi.overlay_id + '"></div>');
            $('#' + $.prefi.overlay_id).css({
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

        _sendCallback: function (data) {
            // var callback_function = $.prefi.callback;
            // callback_function(data);
            $.prefi._hide();
            setTimeout(function () {
                $.prefi.callback(data);
            }, 500)
        },

        _hide: function () {
            $.prefi._endEvent();
            $('#' + $.prefi.overlay_id).fadeOut('fast', function () {
                $(this).remove();
                $.prefi._delete_css();
                $.prefi._endEvent();
            });
        },

        _delete_css: function () {
            $('#style_popup').remove();
        },

        _import_css: function () {
            $(""
                + "<style type='text/css' id='style_popup'>\
            @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900');\
            .activePopup{\
                background: #d6e8f7!important;\
                border: 1px solid rgb(154,208,255)!important;\
            }"
                + "</style>"
            ).appendTo("head");
        }
    }

    SER808 = function (params, callback) {
        console.log("entre al popup");
        $.prefi.window(params, callback);

        // if (params.opcion9) if (params.opcion9 == false) $.prefi.opcion9 = params.opcion9;
    }

})(jQuery);