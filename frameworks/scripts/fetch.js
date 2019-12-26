function postData(datos, servicio) {
    return new Promise(
        (resolve, reject) => {
            var formData = new FormData();
            for (var [key, value] of Object.entries(datos)) formData.append(key, value);

            fetch(servicio, { method: 'POST', body: formData })
                .then(res => {
                    if (!res.ok) reject(res)
                    return res.text()
                })
                .then(res => {
                    let encode = encodeURI(res), decode, response;
                    encode = encode.replace(/%0D%0A/g, "")
                    decode = decodeURI(encode);
                    response = JSON.parse(decode)
                    if (response.STATUS == '00') {
                        resolve(response.MENSAJE)
                    } else {
                        let code = response.STATUS.split('-')[0],
                            tipo = response.STATUS.split('-')[1],
                            mensaje = response.MENSAJE,
                            app = response.PROGRAM,
                            msj = '';


                        if (code == 'SC') {
                            if (mensaje.length == 2) msj = msjError(mensaje.padStart(2, '0'));
                            else msj = mensaje;
                        } else {
                            msj = msjError_con852(code.padStart(2, '0'));
                            msj = msj.trim() + ': ' + mensaje;
                        }

                        if (!tipo || tipo == '2') {
                            jAlert(
                                { titulo: 'Error ' + code, mensaje: '<b>Mensaje: </b>' + msj + '<br> <b>App:</b> ' + app },
                                () => {
                                    reject(response)
                                }
                            );
                        } else {
                            toast(`Advertencia`, msj, 'warning');
                            reject(response)
                        }
                    }
                })
                .catch(error => reject(error))
        }
    )
}