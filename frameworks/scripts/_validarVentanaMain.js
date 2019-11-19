(function ($) {
    $.ventanaMain = {
        id: null,
        descripcion: null,
        href: null,
        js: null,
        seg_w: [],
        opc_segu: null,
        tipo: null,
        params: [],
        lote: [],
        callback: null,
        datosRm: {
            params: []
        },

        _init: function () {
            switch ($.ventanaMain.tipo) {
                case 'HTML':
                    $.ventanaMain._ventana_html();
                    break;
                case 'JS':
                    $.ventanaMain._loadScript();
                    break;
                case 'F01':
                case 'POWER':
                    $.ventanaMain._ventana_power();
                    break;
                case 'RM':
                    $.ventanaMain._ventana_rm()
                    break;
                // default:
                //     break;
            }
        },
        _ventana_rm: function () {
            // var script_bat = _infoRm_bat(this.datosRm)
            var script_bat = _infoRm_bat($.ventanaMain)
            console.log(script_bat)
            if (script_bat) {
                fs.writeFile(
                    script_bat.nombre_bat,
                    script_bat.batch,
                    (err) => {
                        if (err) console.error('Error escribiendo bat: \n\n' + err);
                        else {
                            _cargarEventos('off');
                            jAlert({
                                mensaje: `<div style="text-align: center;">`
                                    + `Debe cerrar el siguiente programa: <br>`
                                    + `<b>${$.ventanaMain.id.substring(1, $.ventanaMain.id.length).split('').join('-')} - ${$.ventanaMain.descripcion}</b>`
                                    + `</div>`,
                                titulo: 'Esperando RM',
                                autoclose: false,
                                btnCancel: false,
                                footer: false
                            }, function () { });

                            exe(script_bat.nombre_bat, function (err, data) {
                                if (err) console.error('Error ejecutando bat: \n\n' + err);
                                else {
                                    fs.unlink(script_bat.nombre_bat, function (err) {
                                        if (err) console.error('Error eliminando bat: \n\n' + err);
                                        else {
                                            jAlert_close();
                                            if ($.ventanaMain.callback) {
                                                $.ventanaMain.callback();
                                            } else {
                                                _cargarEventos('on');
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                )
            }

        },
        _ventana_html: function () {
            $('#body_main').load($.ventanaMain.href, function () { _toggleNav(); })
        },
        _loadScript: function () {
            let elemento = document.createElement("script");
            elemento.src = $.ventanaMain.js;
            document.querySelector("head").appendChild(elemento);
        },
        _ventana_power: function () {
            let script_bat = _validarScript_bat($.ventanaMain);
            if (script_bat) {
                fs.writeFile(script_bat.nombre_bat, script_bat.batch, function (err) {
                    if (err) console.error('Error escribiendo bat: \n\n' + err);
                    else {
                        _cargarEventos('off');
                        jAlert({
                            mensaje: `<div style="text-align: center;">`
                                + `Debe cerrar el siguiente programa: <br>`
                                + `<b>${$.ventanaMain.id.substring(1, $.ventanaMain.id.length).split('').join('-')} - ${$.ventanaMain.descripcion}</b>`
                                + `</div>`,
                            titulo: 'Esperando power',
                            autoclose: false,
                            btnCancel: false,
                            footer: false
                        }, function () { });

                        exe(script_bat.nombre_bat, function (err, data) {
                            if (err) console.error('Error ejecutando bat: \n\n' + err);
                            else {
                                fs.unlink(script_bat.nombre_bat, function (err) {
                                    if (err) console.error('Error eliminando bat: \n\n' + err);
                                    else {
                                        jAlert_close();
                                        if ($.ventanaMain.callback) {
                                            $.ventanaMain.callback();
                                        } else {
                                            _cargarEventos('on');
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    }

    _validarVentanaMain = function (params, callback) {
        $.ventanaMain.id = params.Id;
        $.ventanaMain.descripcion = params.Descripcion;
        $.ventanaMain.href = params.Href;
        $.ventanaMain.js = params.JS;
        $.ventanaMain.seg_w = params['Seg-w'];
        $.ventanaMain.opc_segu = params['Opc-segu'];
        $.ventanaMain.tipo = params.Tipo;
        $.ventanaMain.params = params.Params;
        $.ventanaMain.lote = params.lote;
        $.ventanaMain.callback = callback ? callback : false;

        _validarSegu(params, function (data) {
            if (data) {
                if (data == '-1') CON851B($_USUA_GLOBAL[0]['SEG-MOV']); else $.ventanaMain._init();
            } else {
                jAlert({ titulo: 'Error', mensaje: `<b>Mensaje: </b> Opción restringida` })
            }
        });
    }
}(jQuery));