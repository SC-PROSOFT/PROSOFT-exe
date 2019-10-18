(function ($) {
    $.prefi = {
        overlay_id: 'prefi_overlay', 
        container_id: 'prefi_container',  
        header_class: 'prefi_header',  
        body_class: 'prefi_body',   
        callback: null,
        title: 'SERVICIO',
        opcion9: true,

        _show: function () {
            $.prefi._overlay();    
            $.prefi._import_css(); 
            $.prefi._popup();  
            $.prefi._initEvent();  
        },

        _popup: function () {
            $('#' + $.prefi.overlay_id).html('').append('<div id="' + $.prefi.container_id + '"></div>');
            $('#' + $.prefi.container_id).css({
                background: '#FFF',
                width: '16%',
                height: 'auto',
                margin: '0 auto',
                'min-width': '200px',
                'box-shadow': 'box-shadow: 0 25px 20px -20px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.06);',
                'border-radius': '3px',
                'padding': '2px 2px 0 2px'
            });

            $('#' + $.prefi.container_id).append(''
                + '<div class="' + $.prefi.header_class + '">'
                + ' <p style="padding: 15px 25px;margin: 0 auto;">'
                + $.prefi.title
                + ' </p>'
                + '</div>'
                + '<div class="' + $.prefi.body_class + '">'
                + ' <div class="' + $.prefi.body_class + '_container">'
                + '     <ol>'
                

                + '     </ol>'
                + ' </div>'
                + '</div>'
            );
           

            $('.' + $.prefi.body_class + '_container ol').append('<li id="A" >A. Ambulatorio</li><li id="P" >P. Pensionado</li><li id="T" >T. Acci.Transito</li>');
           
                              
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
                'padding': '12px 0px',
                'text-align': 'center',
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
                $('.active').removeClass('active');
                $(this).addClass('active');
            }).on('click', $.prefi._seleccion)
        },

        _endEvent: function () {
            $(document).off('keydown', $.prefi._controls)
            $('.' + $.prefi.body_class + '_container > ol > li').off('click', $.prefi._seleccion)
        },

        _seleccion: function () {
            let data_select = $(this).html().split('.')
            console.debug(data_select)
            let data = {
                id: data_select[0],
                descripcion: data_select[1].trim()
            }

            $.prefi._sendCallback(data);
        },

        _controls: function (e) {
            var key = e.which;
            var active = $('.active').length;
            var active_obj = $('.active');
            if (active == 0
                && key != 65
                && key != 80
                && key != 84
                
            ) {
                let active_first = $('.' + $.prefi.body_class + '_container > ol > li').first();
                active_first.addClass('active');
            } else {
                switch (key) {
                    case 40:
                        let count_next = active_obj.next().length;
                        if (count_next != 0) active_obj.removeClass('active').next().addClass('active');
                        break;
                    case 38:
                        let count_prev = active_obj.prev().length;
                        if (count_prev != 0) active_obj.removeClass('active').prev().addClass('active');
                        break;
                    case 13:
                        let selected_op = $('.active');
                        if (selected_op.length != 0) selected_op.click();
                        else alert('Debes seleccionar una opción')
                        break;
                    case 65:
                        $('#A').click();
                        break;
                    case 80:
                        $('#P').click();
                        break;
                    case 84:
                        $('#T').click();
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

        _sendCallback: function (data) {
            var callback_function = $.prefi.callback;
            callback_function(data);
            $.prefi._hide();
        },

        _hide: function () {
            $.prefi._endEvent();
            $('#' + $.prefi.overlay_id).fadeOut('fast', function () {
                $(this).remove();
                $.prefi._delete_css();
            });
        },

        _overlay: function () {
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

        _delete_css: function () {
            $('#style_prefi').remove();
        },

        _import_css: function () {
            $(""
                + "<style type='text/css' id='style_prefi'>\
            @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900');\
            .active{\
                background: #d6e8f7!important;\
                border: 1px solid rgb(154,208,255)!important;\
            }"
                + "</style>"
            ).appendTo("head");
        }
    }

    ser808 = function (callback, params) {

        $.prefi.callback = callback;
        // if (params.opcion9) if (params.opcion9 == false) $.prefi.opcion9 = params.opcion9;
        $.prefi._show();
    }

})(jQuery);