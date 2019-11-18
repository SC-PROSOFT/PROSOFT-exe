const { ipcRenderer } = require("electron");

ipcRenderer.on('finish', (event, message) => {
    $_MESSAGE = message;
    console.debug(message);
    setTimeout(_Cargarhtml, 500);
});

function _Cargarhtml() {
    console.debug($_MESSAGE);
    $('#contenido').load($_MESSAGE[2]);
}
