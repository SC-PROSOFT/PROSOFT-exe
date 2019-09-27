(function ($) {
    $.ventanaPower = {
        id: null,
        descripcion: null,
        opc_segu: null,
        tipo: null,
        formulario: null,
        dll: null,
        callback: null,

        _init: function (){
            $.ventanaPower.validarSe
        }
    }

    _validarOpcSegu = function (params){
        $.ventanaPower.id =  params.id;
        $.ventanaPower.descripcion =  params.descripcion;
        $.ventanaPower.opc_segu =  params.opc_segu;
        $.ventanaPower.tipo =  params.tipo;
        $.ventanaPower.formulario =  params.formulario;
        $.ventanaPower.dll =  params.dll;
        $.ventanaPower.callback =  params.callback;
        $.ventanaPower._init();
    }
});