let { ipcRenderer } = require("electron");

ipcRenderer.on('finish', (event, message) => {
    $_MESSAGE = message;
    console.log(message);
    setTimeout(_Cargarhtml, 500);
});

function _Cargarhtml() {
    console.debug($_MESSAGE);
    $('#contenido').load($_MESSAGE);
}
