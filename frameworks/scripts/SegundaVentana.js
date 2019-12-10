let { ipcRenderer } = require("electron");
// window.$ = window.jQuery = require('jquery');

ipcRenderer.on('finish', (event, message) => {
    $_MESSAGE = message;
    console.log(message);
    $_CONTADOR = 0;
    setTimeout(_Cargarhtml, 500);
});

function _Cargarhtml() {
    console.debug($_MESSAGE);
    $('#contenido').load($_MESSAGE);
    setTimeout(_cargartoggle, 1000);
}

function _cargartoggle(){
    $(document).on('keypress click', () => {
        $.when(_toggleNav()).then( () => {
            console.debug('se ejecuto el toggle nav')
            var { ipcRenderer } = require('electron');
            let vector = ['salir', 'ejemplo']
            ipcRenderer.send('ventana2', { param: vector });
        })
    })
}