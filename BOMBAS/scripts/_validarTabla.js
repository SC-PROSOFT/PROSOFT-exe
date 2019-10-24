(function ($) {
    $.validarTabla = {
        tabla: null,
        orden: null,
        select: null,
        back: null,
        end: null,
        event_f3: false,

        init: function () {
            this._insertCss();
            this._ordenar(this.orden);
            this._keyEvent('on');
        },

        _keyEvent: function (estado) {
            switch (estado) {
                case 'on':
                    $(document).on('keyup', this._validacionKey)
                    break;
                case 'off':
                    $(document).off('keyup', this._validacionKey)
                    break;
            }
        },

        _validacionKey: function (e) {
            var elementoActivo = $('.tablaActivo');
            var siguienteItm = elementoActivo.next('tr');
            var anteriorItm = elementoActivo.prev('tr');

            switch (e.which) {
                case 13:
                    $('.tablaActivo').removeClass('tablaActivo');
                    if ($.validarTabla.select) {
                        $.validarTabla.select(elementoActivo[0])
                    } else {
                        console.error('Acción de selección no definida');
                    }

                    $.validarTabla._fin();
                    break;
                case 40:
                    $('.tablaActivo').removeClass('tablaActivo');
                    if (siguienteItm.length > 0) {
                        $(siguienteItm).addClass('tablaActivo');
                    } else {
                        if ($.validarTabla.end) $.validarTabla.end($.validarTabla.end);
                        else console.error('Acción de finalización no definida');
                        $.validarTabla._fin();
                    }
                    break;
                case 27:
                case 38:
                    $('.tablaActivo').removeClass('tablaActivo');
                    if (anteriorItm.length > 0) {
                        $(anteriorItm).addClass('tablaActivo');
                    } else {
                        if ($.validarTabla.back) $.validarTabla.back($.validarTabla.back);
                        else console.error('Acción de salida no definida');
                        $.validarTabla._fin();
                    }
                    break;
                case 114:
                    if ($.validarTabla.event_f3) {
                        $('.tablaActivo').removeClass('tablaActivo');
                        $.validarTabla.event_f3($.validarTabla.event_f3);
                        $.validarTabla._fin();
                    }
                    break;

            }
        },

        _fin: function () {
            this._keyEvent('off');
        },

        _ordenar: function (orden) {
            var elementosTabla = $($.validarTabla.tabla + ' tbody tr');
            var siguienteItm = elementosTabla[orden] ? elementosTabla[orden] : false;

            $('.tablaActivo').removeClass('tablaActivo');
            if (siguienteItm) $(siguienteItm).addClass('tablaActivo');
        },

        _insertCss: function () {
            $(""
                + "<style type='text/css' id='style_validarTabla'>"
                + ".tablaActivo > td { background:  #2e76b5!important; color: #FFF!important;}"
                + "</style>"
            ).appendTo("head");
        }
    }

    validarTabla = function (params, select, back, end) {
        $.validarTabla.tabla = params.tabla || false;
        $.validarTabla.orden = params.orden || '0';
        $.validarTabla.select = select || false;
        $.validarTabla.back = back || false;
        $.validarTabla.end = end || false;
        $.validarTabla.event_f3 = params.event_f3 || false;
        if ($.validarTabla.tabla) setTimeout(function () { $.validarTabla.init(); }, 100)
        else alert('Ninguna tabla definida para validar.')

    }

})(jQuery);