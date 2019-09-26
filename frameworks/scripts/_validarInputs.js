(function ($) {

    $.validar = {
        form: null,
        orden: null,
        back: null,
        next: null,
        event_f3: false,

        init: function () {
            $.validar._siguiente($.validar.orden);
            $.validar._keyEvent($.validar.form, 'on');
        },

        _keyEvent: function (form, estado) {
            switch (estado) {
                case 'on':
                    $(document).on('keyup', form + ' input.form-control', $.validar._validacionKey)
                    break;
                case 'off':
                    $(document).off('keyup', form + ' input.form-control', $.validar._validacionKey)
                    break;
            }
        },

        _validacionKey: function (e) {
            var sig_orden = parseInt($(this).data().orden) + 1
            var ant_orden = parseInt($(this).data().orden) - 1
            var max_longitud = parseInt($(this).attr('maxlength'));
            var requerido = $(this).attr('required') ? $(this).attr('required') : false;
            var act_longitud = $(this).val().length;
            

            if (
                e.which != 35 &&
                e.which != 36 &&
                e.which != 37 &&
                e.which != 38 &&
                e.which != 39 &&
                e.which != 40 &&
                e.which != 16 &&
                e.which != 17 &&
                e.which != 18
            ) {
                switch (e.which) {
                    case 13:
                        if (requerido) {
                            if (act_longitud > 0) $.validar._siguiente(sig_orden)
                            else plantillaToast('', 'Campo obligatorio', null, 'error','Error');
                        } else {
                            $.validar._siguiente(sig_orden)
                        }
                        break;
                    case 27:
                        $.validar._anterior(ant_orden);
                        break;
                    case 114:
                        if ($.validar.event_f3) {
                            $.validar._eventf3();
                        }
                        break;
                    default:
                        // if (requerido) {
                            if (act_longitud > 0) if (max_longitud == act_longitud) $.validar._siguiente(sig_orden);
                        // } else {
                        //     if (max_longitud == act_longitud) $.validar._siguiente(sig_orden);
                        // }
                        break;
                }
            }
        },
        
        _eventf3: function (){
            _fin_validar_form();
            $.validar.event_f3($.validar.event_f3);
        },

        _fin: function () {
            $.validar._keyEvent($.validar.form, 'off');
            $.validar.next($.validar.next);
        },

        _inicio: function () {
            $.validar._keyEvent($.validar.form, 'off');
            $.validar.back($.validar.back);
        },

        _siguiente: function (orden) {
            var form = $.validar.form;
            var siguiente = parseInt(orden);
            var anterior = parseInt(orden) - 1;
            var siguienteItm = $(form + ' [data-orden="' + siguiente + '"');
            var anteriorItm = $(form + ' [data-orden="' + anterior + '"');

            anteriorItm.attr('disabled', 'true');

            if (siguienteItm.length > 0) siguienteItm.removeAttr('disabled').focus().select();
            else $.validar._fin();
        },


        _anterior: function (orden) {
            var form = $.validar.form;
            var siguiente = parseInt(orden) + 1;
            var anterior = parseInt(orden);
            var siguienteItm = $(form + ' [data-orden="' + siguiente + '"');
            var anteriorItm = $(form + ' [data-orden="' + anterior + '"');

            siguienteItm.attr('disabled', 'true');

            if (anteriorItm.length > 0) anteriorItm.removeAttr('disabled').focus().select();
            else $.validar._inicio();
        }
    }

    validarInputs = function (params, back, next) {
        $.validar.form = params.form;
        $.validar.orden = params.orden ? params.orden : '1';
        $.validar.back = back;
        $.validar.next = next;
        $.validar.event_f3 = params.event_f3 ? params.event_f3 : false;
        setTimeout(function () { $.validar.init(); }, 100)
    }

    set_Event_validar = function (form, estado) {
        $.validar._keyEvent(form, estado);
    },
    
    _fin_validar_form = function (){
        var form = $.validar.form;
        var posicion = $.validar.orden;
        var item = $(form + ' [data-orden="' + posicion + '"');

        item.attr('disabled', 'true');

        $.validar._keyEvent($.validar.form, 'off');
    }

})(jQuery);