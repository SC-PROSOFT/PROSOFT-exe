(function ($) {

    $.validar = {
        form: null,
        orden: null,
        back: null,
        next: null,

        init: function () {
            $.validar._siguiente($.validar.orden);
            $.validar._keyEvent($.validar.form, 'on');
        },

        _keyEvent: function (form, estado) {
            switch (estado) {
                case 'on':
                    $(document).on('keyup', form + ' input.form-control, ' + form +' textarea.form-control', $.validar._validacionKey)
                    break;
                case 'off':
                    $(document).off('keyup', form + ' input.form-control, ' + form +' textarea.form-control', $.validar._validacionKey)
                    break;
            }
        },
		
        _validacionKey: function (e) {
            var tipoElemento = e.currentTarget.localName;
            switch (tipoElemento) {
                case 'input':
                    $.validar._validarInput(e, this);
                    break;
                case 'textarea':
                    $.validar._validarTextarea(e, this);
                    break;
            }
        },

        _validarTextarea: function (e, el) {
            var ant_orden = parseInt($(el).data().orden) - 1;
            var sig_orden = parseInt($(el).data().orden) + 1;

            switch (e.which) {
                case 27:
                    $.validar._anterior(ant_orden);
                    break;
                case 13:
                    $.validar._siguiente(sig_orden);
                    break;
            }
        },
		
        _validarInput: function (e,el) {
            var sig_orden = parseInt($(el).data().orden) + 1
            var ant_orden = parseInt($(el).data().orden) - 1
            var max_longitud = parseInt($(el).attr('maxlength'));
            var requerido = $(el).attr('required') || false;
            var act_longitud = $(el).val().length;

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
                            else plantillaToast('', 'Campo obligatorio', null, 'error', 'Error');
                        } else {
                            $.validar._siguiente(sig_orden)
                        }
                        break;
                    case 27:
                        $.validar._anterior(ant_orden);
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
            $(anteriorItm)
                .parent('div')
                .next('button.f8-Btn')
                .attr('disabled', 'true');

            if (siguienteItm.length > 0) {
                $(siguienteItm)
                    .parent('div')
                    .next('button.f8-Btn')
                    .removeAttr('disabled');
                siguienteItm.removeAttr('disabled').focus().select();
            } else $.validar._fin();
        },


        _anterior: function (orden) {
            var form = $.validar.form;
            var siguiente = parseInt(orden) + 1;
            var anterior = parseInt(orden);
            var siguienteItm = $(form + ' [data-orden="' + siguiente + '"');
            var anteriorItm = $(form + ' [data-orden="' + anterior + '"');

            siguienteItm.attr('disabled', 'true');
            $(siguienteItm)
                .parent('div')
                .next('button.f8-Btn')
                .attr('disabled', 'true');

            if (anteriorItm.length > 0) {
                anteriorItm.removeAttr('disabled').focus().select();
                $(anteriorItm)
                    .parent('div')
                    .next('button.f8-Btn')
                    .removeAttr('disabled');
            }
            else $.validar._inicio();
        }
    }

    validarInputs = function (params, back, next) {
        $.validar.form = params.form;
        $.validar.orden = params.orden ? params.orden : '1';
        $.validar.back = back;
        $.validar.next = next;
        setTimeout(function () { $.validar.init(); }, 200)
    }

    set_Event_validar = function (form, estado) {
        $.validar._keyEvent(form, estado);
    }

})(jQuery);