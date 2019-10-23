(function ($) {
    const { BrowserWindow } = require('electron').remote
    const fs = require('fs');
    const jquery = require('jquery');
    const PDFWindow = require('electron-pdf-window');
    const exec = require('child_process').exec;

    $.print = {
        nombre: 'FILE-PROSOFT',
        datos: null,
        formato: null,
        tipo: null,
        extra: null,
        callback: null,

        _init: function (params) {
            this.nombre = params.nombre || this.nombre;
            this.tipo = params.tipo || false;
            this.datos = params.datos || false;
            this.formato = params.formato || false;
            this.extra = params.extra || false;

            if (this.tipo) {
                if (this.tipo.toLowerCase() == 'pdf') this._sendPdf()
                else if (this.tipo.toLowerCase() == 'csv') this._sendPdf()
            } else {
                alert('Debes definir un tipo de impresión')
            }
        },

        _sendPdf: function () {
            const ventaPdf = path.join('file://', __dirname, '../pdf/' + this.formato);

            let winPdf = new BrowserWindow({
                width: 800,
                height: 800,
                title: 'Generando pdf',
                webPreferences: {
                    nodeIntegration: true
                },
                show: false
            })

            winPdf.loadURL(ventaPdf);

            var urlTmp = 'C:\\PROSOFT\\TEMP\\' + $.print.nombre;
            winPdf.webContents.on('did-finish-load', () => {
                winPdf.webContents.send(
                    'ping',
                    {
                        datos: $.print.datos,
                        extra: $.print.extra,
                        tipo: $.print.tipo,
                        url: urlTmp
                    }
                )

                if ($.print.tipo == 'pdf') {
                    setTimeout(function () {
                        winPdf.webContents.printToPDF({}, (error, data) => {
                            if (error) throw error
                            let filePdf = path.join(urlTmp + '.pdf');
                            fs.writeFile(filePdf, data, (error) => {
                                if (error) throw error
                                winPdf.destroy();
                            })
                        })
                    }, 100);
                }
            });

            winPdf.toggleDevTools();

            winPdf.on('closed', () => {
                if ($.print.tipo == 'csv') {
                    exec('"C:\\Program Files\\Microsoft Office\\Office15\\excel.exe" "' + urlTmp + '.csv"', (error, stdout, stderr) => { });
                    $.print._printEnd();
                } else if ($.print.tipo == 'pdf') {
                    winPdf = null;
                    const win = new BrowserWindow({
                        width: 800,
                        height: 600,
                        autoHideMenuBar: true,
                        webPreferences: {
                            nodeIntegration: true
                        }
                    })

                    win.maximize()
                    PDFWindow.addSupport(win);
                    var dir = path.join(urlTmp + '.pdf');
                    win.loadURL(dir)
                    win.webContents.on('did-finish-load', function () {
                        $.print._printEnd();
                        let path = urlTmp + '.pdf';
                        setTimeout(function () {
                            fs.unlink(path, (err) => {
                                if (err) {
                                    console.error(err)
                                    return
                                }
                            })
                        }, 500)
                    });
                }

            })
        },

        _printEnd: function () {
            if (this.callback) this.callback(this.callback);
        },
    }

    imprimir = function (params, callback) {
        $.print.callback = callback || false;
        $.print._init(params);
    }

})(jQuery);