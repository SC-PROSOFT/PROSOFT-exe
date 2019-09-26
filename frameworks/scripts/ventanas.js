(function ($) {
    $.windowbootbox = {
        callback: null,
        cancel: null,

        window: function (params, callback, cancel) {
            $.windowbootbox.callback = callback ? callback : false;
            $.windowbootbox.cancel = cancel ? cancel : false;
            params.source = params.source ? params.source : '<div class="col-md-12 col-sm-12 col-xs-12"><h1> SIN FUENTE </h1></div>';
            params.title = params.title ? params.title : 'Ventana Nueva';
            params.size = params.size ? params.size : 'small';
            params.escape = params.escape ? params.escape : 'true';
            params.executioninit = params.executioninit ? params.executioninit : console.debug('nothing');
            params.focus = params.focus ? params.focus : console.debug('sin foco');
            params.tipo = params.tipo ? params.tipo : 'dialog';
            params.form = params.form ? params.form : console.debug('i dont have form');
            params.order = params.order ? params.order : console.debug('i dont have order');
            params.global1 = params.global1 ? params.global1 : '$_GLOBAL1';
            params.inputglobal1 = params.inputglobal1 ? params.inputglobal1 : console.debug('i dont have input global');

            $.windowbootbox._init(params, callback, cancel);
            $.windowbootbox._evaluar(params, cancel);
        },
        _init: function (params, callback, cancel) {
            var ventanaunica = bootbox.dialog({
                size: params.size,
                title: params.title,
                closeButton: params.escape,
                message: "<div class='row'>" +
                    "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                    params.source +
                    "</div>" +
                    "</div>",
                buttons: {
                    aceptar: {
                        label: 'Aceptar',
                        callback: callback,
                        className: 'btn-primary'
                    },
                    cancelar: {
                        label: 'Cancelar',
                        callback: cancel,
                        className: 'btn-danger'
                    }
                }
            });
            ventanaunica.init($('.modal-footer').hide());
            ventanaunica.on('shown.bs.modal', function () {
                $(params.focus).focus();
                // $("'#" + params.focus + "'").focus();
            });
        },

        _evaluar: function (params) {
            _inputControl('disabled');
            validarInputs({
                form: params.form,
                orden: params.orden
            },
                function () { $('.btn-danger').click() },
                function () {
                    window[params.global1]= $(params.inputglobal1).val();
                    $('.btn-primary').click();
                }
            );
        },
    }

    _ventana = function (params, callback, cancel) {
        $.windowbootbox.window(params, callback, cancel);
    }

})(jQuery);