let { ipcRenderer } = require("electron");
// window.$ = window.jQuery = require('jquery');
var $_MESSAGE = []; var $_PARENT;

ipcRenderer.on('finish', (event, message) => {
    $_MESSAGE = message;
    console.log(message);
    setTimeout(_Cargarhtml, 500);
});

function _Cargarhtml() {
    console.debug($_MESSAGE);
    $_PARENT = $_MESSAGE[1];
    $('#contenido').load($_MESSAGE[0]);
}